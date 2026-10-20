// Schlanker MCP-Client für SE Ranking (D-07a): JSON-RPC 2.0 über HTTP an https://api.seranking.com/mcp.
// Der Schlüssel SE_RANKING_API_KEY kommt aus ENV_FILE (CRAFTOS_ENV_FILE oder absoluter Standardpfad im
// Repo-Root, gitignoriert). Er wird nie ausgegeben, nie gespeichert und nie in Fehlermeldungen übernommen.
const KEY_NAME = "SE_RANKING_API_KEY";
export const ENV_FILE = process.env.CRAFTOS_ENV_FILE || "C:/Projekte/Websitenerstellung/.env";
export const MCP_URL = "https://api.seranking.com/mcp";
const PAUSE_MS = 1600;
const BACKOFF_MS = [1000, 2000, 4000];
const TIMEOUT_MS = 180000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class McpError extends Error {
  /** @param {string} message @param {{ status?: number | null, code?: number | null, tool?: string | null }} [opts] */
  constructor(message, { status = null, code = null, tool = null } = {}) {
    super(message);
    this.name = "McpError";
    this.status = status;
    this.code = code;
    this.tool = tool;
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

// Optionen für Tests: apiKey (statt .env) und fetch (gemockt).
export function createClient({ log = () => {}, apiKey: injectedKey = null, fetch: fetchFn = globalThis.fetch } = {}) {
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

  async function post(body) {
    const wait = lastCall + PAUSE_MS - Date.now();
    if (wait > 0) await sleep(wait);
    for (let attempt = 0; ; attempt++) {
      lastCall = Date.now();
      const headers = {
        "content-type": "application/json",
        accept: "application/json, text/event-stream",
        "X-Api-Key": apiKey,
      };
      if (sessionId) headers["Mcp-Session-Id"] = sessionId;
      let res;
      try {
        res = await fetchFn(MCP_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
      } catch (err) {
        throw new McpError(`Netzwerkfehler bei ${body.method}: ${redact(err?.message, apiKey)}`);
      }
      if (res.status === 429 && attempt < BACKOFF_MS.length) {
        log(`429 – Backoff ${BACKOFF_MS[attempt]} ms`);
        await sleep(BACKOFF_MS[attempt]);
        continue;
      }
      const sid = res.headers.get("mcp-session-id");
      if (sid) sessionId = sid;
      const text = await res.text();
      if (!res.ok)
        throw new McpError(`HTTP ${res.status} bei ${body.method}: ${redact(text, apiKey).slice(0, 400)}`, {
          status: res.status,
        });
      return text;
    }
  }

  async function rpc(method, params) {
    const id = nextId++;
    const text = await post({ jsonrpc: "2.0", id, method, params });
    let msg;
    try {
      msg = parseRpc(text, id);
    } catch {
      throw new McpError(`Antwort auf ${method} nicht lesbar: ${redact(text, apiKey).slice(0, 200)}`);
    }
    if (!msg) throw new McpError(`Leere Antwort auf ${method}`);
    if (msg.error)
      throw new McpError(`JSON-RPC-Fehler ${msg.error.code} bei ${method}: ${redact(msg.error.message, apiKey)}`, {
        code: msg.error.code,
      });
    return msg.result;
  }

  async function init() {
    if (initialized) return;
    await rpc("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "craftos-seo-scripts", version: "1.0.0" },
    });
    // Benachrichtigung ohne id; Antwortinhalt ist leer bzw. 202.
    await post({ jsonrpc: "2.0", method: "notifications/initialized" });
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
    const r = await rpc("tools/call", { name, arguments: args });
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
      throw new McpError(`Tool ${name} meldet Fehler: ${msg.slice(0, 400)}`, {
        status: errorStatus(data, msg),
        tool: name,
      });
    }
    return data;
  }

  return { listTools, callTool, get callCount() { return callCount; } };
}
