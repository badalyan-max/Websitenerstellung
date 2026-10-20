// Schlanker MCP-Client für SE Ranking (D-07a): JSON-RPC 2.0 über HTTP an https://api.seranking.com/mcp.
// Der Schlüssel SE_RANKING_API_KEY kommt aus ENV_FILE (CRAFTOS_ENV_FILE oder absoluter Standardpfad im
// Repo-Root, gitignoriert). Er wird nie ausgegeben, nie gespeichert und nie in Fehlermeldungen übernommen.
//
// Wiederholungen (MD-01, CLAUDE.md „50000 Server-Fehler → Exponential Backoff“):
// - HTTP 429: immer wiederholen (Anfrage wurde nicht verarbeitet), Retry-After hat Vorrang.
// - HTTP 500/502/503/504, JSON-RPC-Code 50000, Tool-Fehler mit 5xx, Netzwerkfehler, Timeout: nur bei
//   idempotenten Tools (lesend: DATA_*, PROJECT_list*, PROJECT_get*; dazu PROJECT_updateKeyword laut
//   Tool-Annotation idempotentHint). Mutierende, nicht idempotente Tools (z. B. PROJECT_addKeywords) werden
//   nicht wiederholt; der Fehler trägt ambiguous=true („Ergebnis unklar“), der Aufrufer liest den Stand neu.
// - Wartezeiten 1, 2, 4, 8 s plus Jitter bis 250 ms; Retry-After über 60 s bricht ab statt zu warten.
const KEY_NAME = "SE_RANKING_API_KEY";
export const ENV_FILE = process.env.CRAFTOS_ENV_FILE || "C:/Projekte/Websitenerstellung/.env";
export const MCP_URL = "https://api.seranking.com/mcp";
const PAUSE_MS = 1600;
export const BACKOFF_MS = [1000, 2000, 4000, 8000];
const JITTER_MS = 250;
const RETRY_AFTER_MAX_MS = 60000;
const TIMEOUT_MS = 180000;
const RETRY_HTTP = new Set([500, 502, 503, 504]);
const SERVER_ERROR_CODE = 50000;
const IDEMPOTENT_MUTATIONS = new Set(["PROJECT_updateKeyword"]);

export const isReadOnlyTool = (name) => /^(?:DATA_|PROJECT_(?:list|get))/.test(name);
export const isIdempotentTool = (name) => isReadOnlyTool(name) || IDEMPOTENT_MUTATIONS.has(name);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class McpError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number | null, code?: number | null, tool?: string | null, kind?: string | null,
   *   retryable?: boolean, unprocessed?: boolean, retryAfterMs?: number | null, ambiguous?: boolean }} [opts]
   */
  constructor(
    message,
    {
      status = null,
      code = null,
      tool = null,
      kind = null,
      retryable = false,
      unprocessed = false,
      retryAfterMs = null,
      ambiguous = false,
    } = {},
  ) {
    super(message);
    this.name = "McpError";
    this.status = status;
    this.code = code;
    this.tool = tool;
    this.kind = kind; // network | timeout | http | rpc | tool | parse
    this.retryable = retryable; // vorübergehender Fehler
    this.unprocessed = unprocessed; // Server hat die Anfrage sicher nicht verarbeitet (429)
    this.retryAfterMs = retryAfterMs;
    this.ambiguous = ambiguous; // mutierender Aufruf, Ergebnis unklar
  }
}

// Antwort als JSON oder als text/event-stream (data:-Zeilen) parsen; liefert die JSON-RPC-Nachricht mit passender id.
function parseRpc(text, id) {
  const trimmed = text.trim();
  const candidates = [];
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    const j = JSON.parse(trimmed);
    candidates.push(...(Array.isArray(j) ? j : [j]));
  } else {
    let buf = [];
    for (const line of text.split(/\r?\n/)) {
      if (line.startsWith("data:")) buf.push(line.slice(5).trimStart());
      else if (line.trim() === "" && buf.length) {
        candidates.push(JSON.parse(buf.join("\n")));
        buf = [];
      }
    }
    if (buf.length) candidates.push(JSON.parse(buf.join("\n")));
  }
  return candidates.find((c) => c && c.id === id) ?? candidates.find((c) => c && ("result" in c || "error" in c));
}

// Entfernt den Schlüssel aus beliebigem Text (Fehlermeldungen des Servers), damit er nie im Log landet.
function redact(text, secret) {
  const s = String(text ?? "");
  return secret ? s.split(secret).join("[entfernt]") : s;
}

// HTTP-Status eines Tool-Fehlers nur aus eindeutigen Stellen übernehmen (Statusfeld der Antwort oder „HTTP 403“,
// „status: 403“, „403 Forbidden“ am Textanfang) – nicht aus der ersten beliebigen Zahl im Text (HI-03).
export function errorStatus(data, msg) {
  if (data && typeof data === "object") {
    for (const v of [data.status, data.status_code, data.statusCode, data.code, data.error?.status, data.error?.code]) {
      const n = Number(v);
      if (Number.isInteger(n) && n >= 400 && n <= 599) return n;
    }
  }
  const m = /(?:^|\bHTTP(?:\s+status)?\s*|\bstatus(?:\s*code)?\s*[:=]?\s*)([45]\d\d)\b/i.exec(String(msg ?? "").trim());
  return m ? Number(m[1]) : null;
}

const hasServerErrorCode = (data) =>
  !!data && typeof data === "object" && (data.code === SERVER_ERROR_CODE || data.error?.code === SERVER_ERROR_CODE);

// Retry-After als Sekunden oder HTTP-Datum; null bei fehlendem oder ungültigem Wert.
export function parseRetryAfter(value, now = Date.now()) {
  if (value == null || String(value).trim() === "") return null;
  const v = String(value).trim();
  if (/^\d+(?:\.\d+)?$/.test(v)) return Math.round(Number(v) * 1000);
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : Math.max(0, t - now);
}

// Optionen für Tests: apiKey (statt .env), fetch (gemockt), sleep, random (Jitter) und pauseMs.
/**
 * @param {{ log?: (m: string) => void, apiKey?: string | null, fetch?: typeof globalThis.fetch,
 *   sleep?: (ms: number) => Promise<void>, random?: () => number, pauseMs?: number }} [options]
 */
export function createClient({
  log = () => {},
  apiKey: injectedKey = null,
  fetch: fetchFn = globalThis.fetch,
  sleep: sleepFn = sleep,
  random = Math.random,
  pauseMs = PAUSE_MS,
} = {}) {
  if (!injectedKey) {
    try {
      process.loadEnvFile(ENV_FILE);
    } catch {
      // Fehlende Datei wird unten als fehlender Schlüssel gemeldet.
    }
  }
  const apiKey = injectedKey || process.env[KEY_NAME];
  if (!apiKey) throw new McpError(`${KEY_NAME} fehlt in ${ENV_FILE}`);

  let sessionId = null;
  let nextId = 1;
  let lastCall = 0;
  let initialized = false;
  let callCount = 0;

  // Ein einzelner HTTP-Versuch ohne Wiederholung; Fehler tragen retryable/unprocessed/retryAfterMs.
  async function send(body, label) {
    const wait = lastCall + pauseMs - Date.now();
    if (wait > 0) await sleepFn(wait);
    lastCall = Date.now();
    const headers = {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "X-Api-Key": apiKey,
    };
    if (sessionId) headers["Mcp-Session-Id"] = sessionId;
    let res;
    let text;
    try {
      res = await fetchFn(MCP_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      text = await res.text();
    } catch (err) {
      const timeout = err?.name === "TimeoutError" || err?.name === "AbortError";
      throw new McpError(`${timeout ? "Zeitüberschreitung" : "Netzwerkfehler"} bei ${label}: ${redact(err?.message, apiKey)}`, {
        kind: timeout ? "timeout" : "network",
        retryable: true,
      });
    }
    const sid = res.headers.get("mcp-session-id");
    if (sid) sessionId = sid;
    if (!res.ok)
      throw new McpError(`HTTP ${res.status} bei ${label}: ${redact(text, apiKey).slice(0, 400)}`, {
        status: res.status,
        kind: "http",
        retryable: res.status === 429 || RETRY_HTTP.has(res.status),
        unprocessed: res.status === 429,
        retryAfterMs: parseRetryAfter(res.headers.get("retry-after")),
      });
    return text;
  }

  // Wiederholt fn() bei vorübergehenden Fehlern; nicht idempotente Aufrufe nur, wenn der Server sie sicher
  // nicht verarbeitet hat (429). Sonst wird der Fehler als ambiguous markiert weitergereicht.
  async function withRetry(label, idempotent, fn) {
    for (let attempt = 0; ; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (!(err instanceof McpError) || !err.retryable) throw err;
        if (!idempotent && !err.unprocessed) {
          err.ambiguous = true;
          err.message += " (Ergebnis unklar: mutierender Aufruf wird nicht wiederholt, Projektstand neu lesen)";
          throw err;
        }
        if (attempt >= BACKOFF_MS.length) throw err;
        if (err.retryAfterMs != null && err.retryAfterMs > RETRY_AFTER_MAX_MS) {
          err.message += ` (Retry-After ${Math.round(err.retryAfterMs / 1000)} s – Abbruch statt Warten)`;
          throw err;
        }
        const delay = err.retryAfterMs ?? BACKOFF_MS[attempt] + Math.floor(random() * JITTER_MS);
        log(`${err.status ?? err.code ?? err.kind} bei ${label} – Wiederholung ${attempt + 1}/${BACKOFF_MS.length} in ${delay} ms`);
        await sleepFn(delay);
      }
    }
  }

  // Ein JSON-RPC-Aufruf (ein Versuch, neue id); JSON-RPC-Code 50000 gilt als vorübergehender Serverfehler.
  async function rpcOnce(method, params, label = method) {
    const id = nextId++;
    const text = await send({ jsonrpc: "2.0", id, method, params }, label);
    let msg;
    try {
      msg = parseRpc(text, id);
    } catch {
      throw new McpError(`Antwort auf ${label} nicht lesbar: ${redact(text, apiKey).slice(0, 200)}`, { kind: "parse" });
    }
    if (!msg) throw new McpError(`Leere Antwort auf ${label}`, { kind: "parse" });
    if (msg.error)
      throw new McpError(`JSON-RPC-Fehler ${msg.error.code} bei ${label}: ${redact(msg.error.message, apiKey)}`, {
        code: msg.error.code,
        kind: "rpc",
        retryable: msg.error.code === SERVER_ERROR_CODE,
      });
    return msg.result;
  }
  const rpc = (method, params) => withRetry(method, true, () => rpcOnce(method, params));

  async function init() {
    if (initialized) return;
    await rpc("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "craftos-seo-scripts", version: "1.0.0" },
    });
    // Benachrichtigung ohne id; Antwortinhalt ist leer bzw. 202.
    await withRetry("notifications/initialized", true, () =>
      send({ jsonrpc: "2.0", method: "notifications/initialized" }, "notifications/initialized"),
    );
    initialized = true;
  }

  async function listTools() {
    await init();
    const tools = [];
    let cursor;
    do {
      const r = await rpc("tools/list", cursor ? { cursor } : {});
      tools.push(...(r.tools ?? []));
      cursor = r.nextCursor;
    } while (cursor);
    return tools;
  }

  // Ruft ein Tool auf und liefert den geparsten Inhalt (JSON, sonst Text). Tool-Fehler (isError) werden als
  // McpError geworfen; status wird nur aus eindeutigen Stellen übernommen (errorStatus).
  async function callTool(name, args = {}) {
    await init();
    callCount++;
    return withRetry(name, isIdempotentTool(name), async () => {
      const r = await rpcOnce("tools/call", { name, arguments: args }, name);
      const text = (r.content ?? [])
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("");
      let data = r.structuredContent ?? null;
      if (data === null) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }
      if (r.isError) {
        const msg = redact(typeof data === "string" ? data : JSON.stringify(data), apiKey);
        const status = errorStatus(data, msg);
        throw new McpError(`Tool ${name} meldet Fehler: ${msg.slice(0, 400)}`, {
          status,
          tool: name,
          kind: "tool",
          retryable: status === 429 || (status !== null && status >= 500) || hasServerErrorCode(data),
          unprocessed: status === 429,
        });
      }
      return data;
    });
  }

  return { listTools, callTool, get callCount() { return callCount; } };
}
