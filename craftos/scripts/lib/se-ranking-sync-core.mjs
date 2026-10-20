// Kern des Abgleichs SE-Ranking-Projekt 13094375 ↔ Keyword-Map (SEO-07, D-07a), ohne CLI-Seiteneffekte,
// damit Vitest ihn mit einem gemockten Client prüfen kann. Aufruf über scripts/se-ranking-sync.mjs.
// Berichte werden nie überschrieben (D-15/D-07a): ein zweiter Lauf am selben Tag erhält die Laufnummer -2, -3, …
import fs from "node:fs";
import path from "node:path";
import { McpError } from "./se-ranking-mcp.mjs";

export const SITE_ID = 13094375;
export const ORIGIN = "https://craftos.eu";
const ADD_CHUNK = 20;

export const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, lokale Zeit
export const normUrl = (u) => {
  if (!u) return null;
  const s = String(u).trim().replace(/^http:\/\//, "https://");
  return s === `${ORIGIN}/` ? s : s.replace(/\/+$/, "");
};
export const normKw = (k) => String(k).trim().toLowerCase();
export const isLimitError = (err) =>
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
export const applyOrder = (a, b) =>
  (a.status === "bestehend" ? 0 : 1) - (b.status === "bestehend" ? 0 : 1) || (a.phase ?? 0) - (b.phase ?? 0);

// ---------- Berichtsdateien ohne Überschreiben ----------
const APPLY_RE = /^(\d{4}-\d{2}-\d{2})-projektabgleich-apply(?:-(\d+))?\.json$/;

// Schreibt <base>.json, bei Kollision <base>-2.json, <base>-3.json … (flag "wx": nie überschreiben).
export function writeJsonUnique(reportDir, base, data) {
  fs.mkdirSync(reportDir, { recursive: true });
  for (let n = 1; ; n++) {
    const file = path.join(reportDir, n === 1 ? `${base}.json` : `${base}-${n}.json`);
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", { flag: "wx" });
      return file;
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
  }
}

// Jüngste apply-Datei: nach Datum, dann nach Laufnummer (ohne Nummer = Lauf 1) sortiert.
export function latestApplyFile(reportDir) {
  if (!fs.existsSync(reportDir)) return null;
  const files = fs
    .readdirSync(reportDir)
    .map((name) => ({ name, m: APPLY_RE.exec(name) }))
    .filter((x) => x.m)
    .sort((a, b) => a.m[1].localeCompare(b.m[1]) || Number(a.m[2] ?? 1) - Number(b.m[2] ?? 1));
  const last = files.pop();
  return last ? path.join(reportDir, last.name) : null;
}

// ---------- Projektstand lesen ----------
export async function readProject(client) {
  const keywords = rows(await client.callTool("PROJECT_listKeywords", { site_id: SITE_ID })).map((k) => ({
    id: Number(k.id),
    keyword: normKw(k.name),
    url: normUrl(k.link),
  }));
  return { keywords };
}

export async function readTracking(client) {
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

export function diff(soll, ist) {
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

// ---------- --check ----------
/** @typedef {{ reportDir: string, datum?: string, log?: (m: string) => void }} RunOptions */
/** @param {any} client @param {any[]} soll @param {RunOptions} opts */
export async function check(client, soll, { reportDir, datum = today(), log = console.log }) {
  const ist = await readProject(client);
  const tracking = await readTracking(client);
  const d = diff(soll, ist);
  const applyFile = latestApplyFile(reportDir);
  const limits = applyFile ? (JSON.parse(fs.readFileSync(applyFile, "utf8")).limits ?? []) : [];
  const limitKw = new Set(limits.map((l) => l.keyword));
  const strip = (e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== "id"));
  const offenOhneLimit = [...d.fehlend, ...d.zielseiteAbweichend.map(strip)].filter((e) => !limitKw.has(e.keyword));
  const report = {
    datum,
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
    limitsQuelle: applyFile ? path.basename(applyFile) : null,
    offenOhneLimit,
  };
  const file = writeJsonUnique(reportDir, `${datum}-projektabgleich`, report);
  log(`geschrieben: ${path.basename(file)}`);
  log(
    `Soll ${report.soll.gesamt} (bestehend ${report.soll.bestehend}, geplant ${report.soll.geplant}), Projekt ${report.projektKeywords}, ` +
      `fehlend ${d.fehlend.length}, Zielseite abweichend ${d.zielseiteAbweichend.length}, zusätzlich ${d.zusaetzlich.length}, ` +
      `Wettbewerber ${report.wettbewerberAnzahl}, KI-Prompts ${report.aiPrompts.length}, Limits ${limits.length}, offen ohne Limit ${offenOhneLimit.length}`,
  );
  if (limits.length) log("Projektlimit dokumentiert – Entscheidung Inhaber (Tarif) nötig");
  return { code: offenOhneLimit.length ? 1 : 0, file, report };
}

// ---------- --apply ----------
/** @param {any} client @param {any[]} soll @param {RunOptions} opts */
export async function apply(client, soll, { reportDir, datum = today(), log = console.log }) {
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
  const protokoll = { datum, projekt: SITE_ID, hinzugefuegt, zielseiteAngeglichen, limits };
  const file = writeJsonUnique(reportDir, `${datum}-projektabgleich-apply`, protokoll);
  log(`geschrieben: ${path.basename(file)}`);
  log(
    `hinzugefügt ${hinzugefuegt.length}, Zielseite angeglichen ${zielseiteAngeglichen.length}, Limits ${limits.length}` +
      ` (bestehend ${limits.filter((l) => l.status === "bestehend").length}, geplant ${limits.filter((l) => l.status === "geplant").length})`,
  );
  if (limits.length) log("Projektlimit erreicht – Entscheidung Inhaber (Tarif) nötig");
  return { code: 0, file, protokoll };
}
