// Abgleich des SE-Ranking-Projekts 13094375 mit der Keyword-Map (SEO-07, D-07a).
//   node scripts/se-ranking-sync.mjs --list-tools [PRÄFIX]  Toolnamen und Pflichtargumente des MCP-Servers
//   node scripts/se-ranking-sync.mjs --check                 Ist/Soll vergleichen → docs/seo/reports/<Datum>-projektabgleich.json
//   node scripts/se-ranking-sync.mjs --apply                 Fehlende Keywords hinzufügen, Zielseiten angleichen
//                                                            → docs/seo/reports/<Datum>-projektabgleich-apply.json
// Soll = alle Hauptkeywords der Keyword-Map (bestehende und geplante Seiten), Ziel-URL https://craftos.eu{path}.
// Löschregel: Das Skript entfernt nie Keywords, Wettbewerber oder Prompts; zusätzliche Projekt-Keywords
// (z. B. „craftview software gmbh“) bleiben unverändert und werden nur unter „zusaetzlich“ aufgeführt.
// Projektlimits (z. B. HTTP 403) werden je nicht übernommenem Soll-Eintrag in limits[] der apply-Datei
// persistiert; jeder spätere --check übernimmt sie (limitsQuelle) und wertet sie nicht als Prüffehler.
import fs from "node:fs";
import path from "node:path";
import { createClient, McpError } from "./lib/se-ranking-mcp.mjs";

const SITE_ID = 13094375;
const ORIGIN = "https://craftos.eu";
const ADD_CHUNK = 20;
const ROOT = path.resolve(import.meta.dirname, "..");
const MAP_FILE = path.join(ROOT, "docs/seo/keyword-map.json");
const REPORT_DIR = path.join(ROOT, "docs/seo/reports");

const mode = process.argv[2];
if (!["--list-tools", "--check", "--apply"].includes(mode)) {
  console.error("Aufruf: node scripts/se-ranking-sync.mjs <--list-tools [PRÄFIX] | --check | --apply>");
  process.exit(1);
}

const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, lokale Zeit
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");
const normUrl = (u) => {
  if (!u) return null;
  const s = String(u).trim().replace(/^http:\/\//, "https://");
  return s === `${ORIGIN}/` ? s : s.replace(/\/+$/, "");
};
const normKw = (k) => String(k).trim().toLowerCase();
const isLimitError = (err) =>
  err instanceof McpError &&
  (err.status === 403 || err.status === 402 || /\b403\b|limit|quota|exceed|not enough|insufficient/i.test(err.message));
const rows = (r) =>
  Array.isArray(r) ? r : Array.isArray(r?.data) ? r.data : Array.isArray(r?.items) ? r.items : [];

// Soll-Liste: jeder Map-Eintrag mit primary, dedupliziert nach primary.keyword (erster Eintrag gewinnt).
export function buildSoll(map) {
  const seen = new Map();
  for (const e of map) {
    if (!e.primary) continue;
    const keyword = normKw(e.primary.keyword);
    if (seen.has(keyword)) continue;
    seen.set(keyword, {
      keyword,
      url: normUrl(`${ORIGIN}${e.path === "/" ? "/" : e.path}`),
      status: e.status,
      phase: e.status === "geplant" ? (e.phase ?? null) : null,
    });
  }
  return [...seen.values()];
}
// Reihenfolge für --apply: bestehend vor geplant, geplant nach Phase aufsteigend (Limit trifft späteste Planseiten).
const applyOrder = (a, b) =>
  (a.status === "bestehend" ? 0 : 1) - (b.status === "bestehend" ? 0 : 1) || (a.phase ?? 0) - (b.phase ?? 0);

function latestApplyFile() {
  if (!fs.existsSync(REPORT_DIR)) return null;
  const f = fs
    .readdirSync(REPORT_DIR)
    .filter((x) => /^\d{4}-\d{2}-\d{2}-projektabgleich-apply\.json$/.test(x))
    .sort()
    .pop();
  return f ? path.join(REPORT_DIR, f) : null;
}

async function readProject(client) {
  const keywords = rows(await client.callTool("PROJECT_listKeywords", { site_id: SITE_ID })).map((k) => ({
    id: Number(k.id),
    keyword: normKw(k.name),
    url: normUrl(k.link),
  }));
  return { keywords };
}

async function readTracking(client) {
  const competitors = rows(await client.callTool("PROJECT_listCompetitors", { site_id: SITE_ID })).map((c) => ({
    name: c.name,
    url: c.url,
  }));
  const engines = rows(await client.callTool("PROJECT_listLlmEngines", { site_id: SITE_ID }));
  const aiPrompts = [];
  for (const eng of engines) {
    const prompts = rows(
      await client.callTool("PROJECT_listPrompts", { site_id: SITE_ID, llm_id: Number(eng.id), limit: 100 }),
    );
    for (const p of prompts)
      aiPrompts.push({
        engine: eng.base_name,
        llmId: Number(eng.id),
        groupId: p.group_id != null ? Number(p.group_id) : null,
        prompt: p.prompt ?? p.name ?? p.keyword ?? null,
      });
  }
  return { competitors, engines: engines.map((e) => ({ id: Number(e.id), name: e.base_name })), aiPrompts };
}

function diff(soll, ist) {
  const istBy = new Map(ist.keywords.map((k) => [k.keyword, k]));
  const sollSet = new Set(soll.map((s) => s.keyword));
  const fehlend = [];
  const zielseiteAbweichend = [];
  for (const s of soll) {
    const k = istBy.get(s.keyword);
    if (!k) fehlend.push({ keyword: s.keyword, url: s.url, status: s.status, phase: s.phase });
    else if (k.url !== s.url)
      zielseiteAbweichend.push({ keyword: s.keyword, url: s.url, istUrl: k.url, status: s.status, phase: s.phase, id: k.id });
  }
  const zusaetzlich = ist.keywords.filter((k) => !sollSet.has(k.keyword)).map((k) => ({ keyword: k.keyword, url: k.url }));
  return { fehlend, zielseiteAbweichend, zusaetzlich };
}

function writeJson(file, data) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`geschrieben: ${rel(file)}`);
}

async function listTools(client) {
  const prefix = process.argv[3] ?? "";
  const tools = (await client.listTools()).filter((t) => t.name.startsWith(prefix));
  for (const t of tools) console.log(`${t.name}(${(t.inputSchema?.required ?? []).join(", ")})`);
  console.log(`${tools.length} Tools`);
}

async function check(client, soll) {
  const ist = await readProject(client);
  const tracking = await readTracking(client);
  const d = diff(soll, ist);
  const applyFile = latestApplyFile();
  const limits = applyFile ? (JSON.parse(fs.readFileSync(applyFile, "utf8")).limits ?? []) : [];
  const limitKw = new Set(limits.map((l) => l.keyword));
  const strip = (e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== "id"));
  const offenOhneLimit = [...d.fehlend, ...d.zielseiteAbweichend.map(strip)].filter((e) => !limitKw.has(e.keyword));
  const report = {
    datum: today(),
    projekt: SITE_ID,
    soll: {
      gesamt: soll.length,
      bestehend: soll.filter((s) => s.status === "bestehend").length,
      geplant: soll.filter((s) => s.status === "geplant").length,
    },
    projektKeywords: ist.keywords.length,
    fehlend: d.fehlend,
    zielseiteAbweichend: d.zielseiteAbweichend.map(strip),
    zusaetzlich: d.zusaetzlich,
    wettbewerberAnzahl: tracking.competitors.length,
    wettbewerber: tracking.competitors,
    aiEngines: tracking.engines,
    aiPrompts: tracking.aiPrompts,
    limits,
    limitsQuelle: applyFile ? rel(applyFile) : null,
    offenOhneLimit,
  };
  writeJson(path.join(REPORT_DIR, `${today()}-projektabgleich.json`), report);
  console.log(
    `Soll ${report.soll.gesamt} (bestehend ${report.soll.bestehend}, geplant ${report.soll.geplant}), Projekt ${report.projektKeywords}, ` +
      `fehlend ${d.fehlend.length}, Zielseite abweichend ${d.zielseiteAbweichend.length}, zusätzlich ${d.zusaetzlich.length}, ` +
      `Wettbewerber ${report.wettbewerberAnzahl}, KI-Prompts ${report.aiPrompts.length}, Limits ${limits.length}, offen ohne Limit ${offenOhneLimit.length}`,
  );
  if (limits.length) console.log("Projektlimit dokumentiert – Entscheidung Inhaber (Tarif) nötig");
  return offenOhneLimit.length ? 1 : 0;
}

async function apply(client, soll) {
  const ist = await readProject(client);
  const d = diff(soll, ist);
  const hinzugefuegt = [];
  const zielseiteAngeglichen = [];
  const limits = [];
  let abbruch = null;

  // 1. Zielseiten bestehender Projekt-Keywords angleichen (verbraucht kein Keyword-Kontingent).
  const updates = [...d.zielseiteAbweichend].sort(applyOrder);
  for (let i = 0; i < updates.length; i++) {
    const u = updates[i];
    if (abbruch) {
      limits.push({ keyword: u.keyword, url: u.url, status: u.status, phase: u.phase, art: "zielseite", fehler: abbruch });
      continue;
    }
    try {
      await client.callTool("PROJECT_updateKeyword", {
        site_id: SITE_ID,
        keyword_id: u.id,
        keyword: u.keyword,
        target_url: u.url,
      });
      zielseiteAngeglichen.push({ keyword: u.keyword, vorher: u.istUrl, nachher: u.url, status: u.status, phase: u.phase });
    } catch (err) {
      if (!isLimitError(err)) throw err;
      abbruch = err.message;
      limits.push({ keyword: u.keyword, url: u.url, status: u.status, phase: u.phase, art: "zielseite", fehler: abbruch });
    }
  }

  // 2. Fehlende Keywords in Paketen hinzufügen: bestehend vor geplant, geplant nach Phase aufsteigend.
  const adds = [...d.fehlend].sort(applyOrder);
  for (let i = 0; i < adds.length; i += ADD_CHUNK) {
    const chunk = adds.slice(i, i + ADD_CHUNK);
    if (abbruch) {
      for (const a of chunk)
        limits.push({ keyword: a.keyword, url: a.url, status: a.status, phase: a.phase, art: "fehlend", fehler: abbruch });
      continue;
    }
    try {
      await client.callTool("PROJECT_addKeywords", {
        site_id: SITE_ID,
        keywords: chunk.map((a) => ({ keyword: a.keyword, target_url: a.url })),
      });
    } catch (err) {
      if (!isLimitError(err)) throw err;
      abbruch = err.message;
      for (const a of chunk)
        limits.push({ keyword: a.keyword, url: a.url, status: a.status, phase: a.phase, art: "fehlend", fehler: abbruch });
    }
  }

  // 3. Ergebnis gegen den tatsächlichen Projektstand prüfen (Teilübernahmen eines Pakets erkennen).
  const nachher = diff(soll, await readProject(client));
  const offenNachher = new Map([...nachher.fehlend, ...nachher.zielseiteAbweichend].map((e) => [e.keyword, e]));
  for (const a of adds)
    if (!offenNachher.has(a.keyword) && !limits.some((l) => l.keyword === a.keyword))
      hinzugefuegt.push({ keyword: a.keyword, url: a.url, status: a.status, phase: a.phase });
  // Bereits als Limit erfasste Einträge, die doch übernommen wurden, wieder austragen.
  for (let i = limits.length - 1; i >= 0; i--) {
    if (!offenNachher.has(limits[i].keyword)) {
      const l = limits.splice(i, 1)[0];
      if (l.art === "fehlend") hinzugefuegt.push({ keyword: l.keyword, url: l.url, status: l.status, phase: l.phase });
    }
  }
  for (const [kw, e] of offenNachher) {
    if (limits.some((l) => l.keyword === kw)) continue;
    limits.push({
      keyword: kw,
      url: e.url,
      status: e.status,
      phase: e.phase,
      art: e.istUrl === undefined ? "fehlend" : "zielseite",
      fehler: abbruch ?? "nach --apply nicht im Projekt übernommen (Server meldete keinen Fehler)",
    });
  }

  const order = (x) => soll.findIndex((s) => s.keyword === x.keyword);
  hinzugefuegt.sort((a, b) => order(a) - order(b));
  limits.sort((a, b) => applyOrder(a, b) || order(a) - order(b));
  writeJson(path.join(REPORT_DIR, `${today()}-projektabgleich-apply.json`), {
    datum: today(),
    projekt: SITE_ID,
    hinzugefuegt,
    zielseiteAngeglichen,
    limits,
  });
  console.log(
    `hinzugefügt ${hinzugefuegt.length}, Zielseite angeglichen ${zielseiteAngeglichen.length}, Limits ${limits.length}` +
      ` (bestehend ${limits.filter((l) => l.status === "bestehend").length}, geplant ${limits.filter((l) => l.status === "geplant").length})`,
  );
  if (limits.length) console.log("Projektlimit erreicht – Entscheidung Inhaber (Tarif) nötig");
  return 0;
}

const client = createClient({ log: (m) => console.log(m) });
try {
  let code = 0;
  if (mode === "--list-tools") await listTools(client);
  else {
    const soll = buildSoll(JSON.parse(fs.readFileSync(MAP_FILE, "utf8")));
    code = mode === "--check" ? await check(client, soll) : await apply(client, soll);
  }
  console.log(`MCP-Aufrufe: ${client.callCount}`);
  process.exit(code);
} catch (err) {
  console.error(`Fehler: ${err.message}`);
  process.exit(1);
}
