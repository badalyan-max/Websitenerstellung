// Kern des Abgleichs SE-Ranking-Projekt 13094375 ↔ Keyword-Map (SEO-07, D-07a), ohne CLI-Seiteneffekte,
// damit Vitest ihn mit einem gemockten Client prüfen kann. Aufruf über scripts/se-ranking-sync.mjs.
// Berichte werden nie überschrieben (D-15/D-07a): ein zweiter Lauf am selben Tag erhält die Laufnummer -2, -3, …
import fs from "node:fs";
import path from "node:path";
import { McpError, rowsOf } from "./se-ranking-mcp.mjs";

export const SITE_ID = 13094375;
export const ORIGIN = "https://craftos.eu";
const ADD_CHUNK = 20;
const PROMPT_PAGE = 100; // PROJECT_listPrompts: limit 1–1000, offset
const MAX_PAGES = 50;

export const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, lokale Zeit
export const normUrl = (u) => {
  if (!u) return null;
  const s = String(u).trim().replace(/^http:\/\//, "https://");
  return s === `${ORIGIN}/` ? s : s.replace(/\/+$/, "");
};
export const normKw = (k) => String(k).trim().toLowerCase();
// Nur eindeutige Kontingent-/Tarifantworten gelten als Projektlimit (HTTP 402 oder ein klarer Limit-Text).
// Ein nacktes 403 oder Validierungsfehler („parameter 'limit' must be …“, „keyword length exceeds …“) sind Fehler.
const LIMIT_RE =
  /\b(?:quota|keywords? limit|(?:limit|quota) (?:is |has been |was )?(?:reached|exceeded)|exceed(?:s|ed)? (?:the |your )?(?:\w+ )?(?:limit|quota)|not enough (?:units|keywords|credits|balance|funds)|insufficient (?:units|credits|balance|funds)|upgrade your (?:plan|subscription|tariff))\b/i;
export const isLimitError = (err) => err instanceof McpError && (err.status === 402 || LIMIT_RE.test(err.message));
// Limits aus apply-Dateien, die älter als diese Frist sind, nimmt --check nicht mehr aus (Tarifentscheidung erneut fällig).
export const LIMIT_MAX_AGE_DAYS = 30;

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

// ---------- Projektstand lesen (fail closed, MD-04) ----------
// PROJECT_listKeywords hat laut Tool-Schema keine Paginierung (nur site_id, site_engine_id) und liefert alle
// Keywords. Unbekanntes Antwortformat, ungültige Einträge oder ein leeres Projekt brechen ab: Projekt 13094375
// ist nie leer, eine leere Liste hieße „alle Soll-Keywords fehlen“ und würde Kontingent und Duplikate kosten.
export async function readProject(client) {
  const liste = rowsOf(await client.callTool("PROJECT_listKeywords", { site_id: SITE_ID }), "PROJECT_listKeywords");
  if (!liste.length) throw new Error("PROJECT_listKeywords meldet 0 Keywords – Abbruch (Projekt ist nie leer)");
  const keywords = liste.map((k, i) => {
    const id = Number(k?.id);
    if (!Number.isInteger(id) || id <= 0 || typeof k?.name !== "string" || !k.name.trim())
      throw new Error(`PROJECT_listKeywords: Eintrag ${i + 1} ohne gültige id/name – Abbruch`);
    return {
      id,
      keyword: normKw(k.name), // nur zum Vergleich mit der Soll-Liste
      name: k.name, // Original-Schreibweise im Projekt, wird beim Angleichen unverändert gesendet
      url: normUrl(k.link),
    };
  });
  if (new Set(keywords.map((k) => k.id)).size !== keywords.length)
    throw new Error("PROJECT_listKeywords: doppelte Keyword-IDs (Teil- oder Mehrfachantwort) – Abbruch");
  return { keywords };
}

// Alle Prompts einer Engine seitenweise lesen (limit/offset laut Tool-Schema), statt bei 100 abzuschneiden.
async function listAllPrompts(client, llmId) {
  const alle = [];
  for (let seite = 0; seite < MAX_PAGES; seite++) {
    const teil = rowsOf(
      await client.callTool("PROJECT_listPrompts", { site_id: SITE_ID, llm_id: llmId, limit: PROMPT_PAGE, offset: seite * PROMPT_PAGE }),
      "PROJECT_listPrompts",
    );
    alle.push(...teil);
    if (teil.length < PROMPT_PAGE) return alle;
  }
  throw new Error(`PROJECT_listPrompts: mehr als ${MAX_PAGES} Seiten – Abbruch`);
}

export async function readTracking(client) {
  const competitors = rowsOf(await client.callTool("PROJECT_listCompetitors", { site_id: SITE_ID }), "PROJECT_listCompetitors").map((c) => ({
    name: c.name,
    url: c.url,
  }));
  const engines = rowsOf(await client.callTool("PROJECT_listLlmEngines", { site_id: SITE_ID }), "PROJECT_listLlmEngines");
  const aiPrompts = [];
  for (const eng of engines) {
    if (!Number.isInteger(Number(eng?.id))) throw new Error("PROJECT_listLlmEngines: Engine ohne gültige id – Abbruch");
    const prompts = await listAllPrompts(client, Number(eng.id));
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
      zielseiteAbweichend.push({ keyword: s.keyword, url: s.url, istUrl: k.url, status: s.status, phase: s.phase, id: k.id, name: k.name });
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
  let limits = [];
  let limitsHinweis = null;
  if (applyFile) {
    const alterTage = (Date.parse(datum) - Date.parse(path.basename(applyFile).slice(0, 10))) / 86400000;
    // Nur ausdrücklich als Limit geführte Einträge ausnehmen; stille Fehlschläge bleiben Prüffehler (HI-03).
    const alle = (JSON.parse(fs.readFileSync(applyFile, "utf8")).limits ?? []).filter((l) => l.grund === "limit");
    if (alterTage > LIMIT_MAX_AGE_DAYS)
      limitsHinweis = `${alle.length} Limits aus ${path.basename(applyFile)} älter als ${LIMIT_MAX_AGE_DAYS} Tage – nicht berücksichtigt`;
    else limits = alle;
  }
  const limitKw = new Set(limits.map((l) => l.keyword));
  const strip = (e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== "id" && k !== "name"));
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
    limitsHinweis,
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
  if (limitsHinweis) log(limitsHinweis);
  return { code: offenOhneLimit.length ? 1 : 0, file, report };
}

// ---------- --apply ----------
// Eigene Protokolldatei dieses Laufs atomar aktualisieren (Temp-Datei + rename), nie eine fremde überschreiben.
function rewriteJson(file, data) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + "\n");
  fs.renameSync(tmp, file);
}
const entry = (e, extra = {}) => ({ keyword: e.keyword, url: e.url, status: e.status, phase: e.phase, ...extra });

// Das Protokoll wird vor der ersten Änderung angelegt und nach jeder Mutation fortgeschrieben. Bricht der Lauf
// ab (Netzwerk, Timeout, 5xx, JSON-RPC-Fehler), wird der Projektstand neu gelesen und der Abbruch protokolliert,
// damit die bereits geänderten Einträge samt vorher-URLs im Repo nachvollziehbar bleiben (HI-02).
// Zielseiten bestehender Projekt-Keywords (ggf. vom Inhaber gesetzt) werden nur mit retarget (--retarget)
// geändert; sonst stehen die Abweichungen unter zielseiteNichtAngeglichen. Beim Angleichen wird der
// Keyword-Text in der Original-Schreibweise des Projekts gesendet, damit nichts umbenannt wird (MD-03).
/** @param {any} client @param {any[]} soll @param {RunOptions & { retarget?: boolean }} opts */
export async function apply(client, soll, { reportDir, datum = today(), log = console.log, retarget = false }) {
  const ist = await readProject(client);
  const d = diff(soll, ist);
  const protokoll = {
    datum,
    projekt: SITE_ID,
    status: "laufend",
    retarget,
    abgebrochen: null,
    hinzugefuegt: [],
    zielseiteAngeglichen: [],
    zielseiteNichtAngeglichen: retarget
      ? []
      : d.zielseiteAbweichend.map((u) => ({ keyword: u.keyword, istUrl: u.istUrl, sollUrl: u.url, status: u.status, phase: u.phase })),
    schreibweiseGeaendert: [],
    limits: [],
    fehlgeschlagen: [],
    unbestaetigt: [], // an PROJECT_addKeywords übergeben, Übernahme noch nicht durch Neulesen bestätigt
    verifikation: null,
  };
  const { hinzugefuegt, zielseiteAngeglichen, limits, fehlgeschlagen } = protokoll;
  const file = writeJsonUnique(reportDir, `${datum}-projektabgleich-apply`, protokoll);
  const save = () => rewriteJson(file, protokoll);
  log(`Protokoll: ${path.basename(file)}`);
  let abbruch = null; // Projektlimit: restliche Einträge werden als Limit geführt
  let fehler = null; // jeder andere Fehler: Lauf stoppt, restliche Einträge bleiben offen

  const updates = retarget ? [...d.zielseiteAbweichend].sort(applyOrder) : [];
  const nichtAngeglichen = new Set(protokoll.zielseiteNichtAngeglichen.map((z) => z.keyword));
  const adds = [...d.fehlend].sort(applyOrder);
  try {
    // 1. Zielseiten bestehender Projekt-Keywords angleichen (verbraucht kein Keyword-Kontingent).
    for (const u of updates) {
      if (fehler) break;
      if (abbruch) {
        limits.push(entry(u, { art: "zielseite", grund: "limit", fehler: abbruch }));
        continue;
      }
      try {
        await client.callTool("PROJECT_updateKeyword", {
          site_id: SITE_ID,
          keyword_id: u.id,
          keyword: u.name, // Pflichtfeld beim Ändern der target_url; unverändert in Original-Schreibweise
          target_url: u.url,
        });
        zielseiteAngeglichen.push({ keyword: u.keyword, vorher: u.istUrl, nachher: u.url, status: u.status, phase: u.phase });
      } catch (err) {
        if (isLimitError(err)) {
          abbruch = err.message;
          limits.push(entry(u, { art: "zielseite", grund: "limit", fehler: abbruch }));
        } else fehler = err;
      }
      save();
    }

    // 2. Fehlende Keywords in Paketen hinzufügen: bestehend vor geplant, geplant nach Phase aufsteigend.
    for (let i = 0; i < adds.length && !fehler; i += ADD_CHUNK) {
      const chunk = adds.slice(i, i + ADD_CHUNK);
      if (abbruch) {
        for (const a of chunk) limits.push(entry(a, { art: "fehlend", grund: "limit", fehler: abbruch }));
        continue;
      }
      try {
        await client.callTool("PROJECT_addKeywords", {
          site_id: SITE_ID,
          keywords: chunk.map((a) => ({ keyword: a.keyword, target_url: a.url })),
        });
        protokoll.unbestaetigt.push(...chunk.map((a) => entry(a)));
      } catch (err) {
        if (isLimitError(err)) {
          abbruch = err.message;
          for (const a of chunk) limits.push(entry(a, { art: "fehlend", grund: "limit", fehler: abbruch }));
        } else {
          fehler = err;
          // Ein Timeout kann trotzdem übernommen worden sein: Paket bis zur Verifikation als unbestätigt führen.
          protokoll.unbestaetigt.push(...chunk.map((a) => entry(a)));
        }
      }
      save();
    }
  } catch (err) {
    fehler = err; // unerwarteter Fehler (z. B. Dateisystem) – trotzdem verifizieren und protokollieren
  }
  if (fehler) {
    protokoll.status = "abgebrochen";
    protokoll.abgebrochen = fehler.message;
    save();
  }

  // 3. Ergebnis gegen den tatsächlichen Projektstand prüfen (Teilübernahmen eines Pakets erkennen) –
  //    auch nach einem Abbruch, damit der tatsächliche Stand im Protokoll steht.
  let nachherIst = null;
  try {
    nachherIst = await readProject(client);
  } catch (err) {
    protokoll.verifikation = `Projektstand nach dem Lauf nicht lesbar: ${err.message}`;
  }
  if (nachherIst) {
    const nachher = diff(soll, nachherIst);
    const offenNachher = new Map([...nachher.fehlend, ...nachher.zielseiteAbweichend].map((e) => [e.keyword, e]));
    protokoll.unbestaetigt = [];
    for (const a of adds)
      if (!offenNachher.has(a.keyword) && !limits.some((l) => l.keyword === a.keyword)) hinzugefuegt.push(entry(a));
    // Bereits als Limit erfasste Einträge, die doch übernommen wurden, wieder austragen.
    for (let i = limits.length - 1; i >= 0; i--) {
      if (!offenNachher.has(limits[i].keyword)) {
        const l = limits.splice(i, 1)[0];
        if (l.art === "fehlend") hinzugefuegt.push(entry(l));
      }
    }
    // Als angeglichen gemeldete Zielseiten, die doch noch abweichen, sind fehlgeschlagen.
    for (let i = zielseiteAngeglichen.length - 1; i >= 0; i--)
      if (offenNachher.has(zielseiteAngeglichen[i].keyword)) zielseiteAngeglichen.splice(i, 1);
    // Schreibweise der angeglichenen Keywords darf sich nicht geändert haben (Positionshistorie, MD-03).
    const nameNachher = new Map(nachherIst.keywords.map((k) => [k.id, k.name]));
    for (const u of updates) {
      const n = nameNachher.get(u.id);
      if (n !== undefined && n !== u.name) protokoll.schreibweiseGeaendert.push({ id: u.id, vorher: u.name, nachher: n });
    }
    for (const [kw, e] of offenNachher) {
      if (limits.some((l) => l.keyword === kw) || nichtAngeglichen.has(kw)) continue;
      const art = e.istUrl === undefined ? "fehlend" : "zielseite";
      // Ohne Limit-Antwort offen geblieben: Fehlschlag, nie stillschweigend als Tarifentscheidung führen (HI-03).
      fehlgeschlagen.push(
        entry(e, {
          art,
          fehler: fehler
            ? `Lauf abgebrochen: ${fehler.message}`
            : "nach --apply nicht im Projekt übernommen (Server meldete keinen Fehler)",
        }),
      );
    }
    protokoll.verifikation = `Projektstand neu gelesen: ${nachherIst.keywords.length} Keywords, ${offenNachher.size} Soll-Einträge offen`;
  }

  const order = (x) => soll.findIndex((s) => s.keyword === x.keyword);
  hinzugefuegt.sort((a, b) => order(a) - order(b));
  limits.sort((a, b) => applyOrder(a, b) || order(a) - order(b));
  fehlgeschlagen.sort((a, b) => applyOrder(a, b) || order(a) - order(b));
  if (!fehler) protokoll.status = nachherIst ? "abgeschlossen" : "unvollstaendig";
  save();
  log(`geschrieben: ${path.basename(file)}`);
  log(
    `hinzugefügt ${hinzugefuegt.length}, Zielseite angeglichen ${zielseiteAngeglichen.length}, Limits ${limits.length}` +
      ` (bestehend ${limits.filter((l) => l.status === "bestehend").length}, geplant ${limits.filter((l) => l.status === "geplant").length})` +
      `, fehlgeschlagen ${fehlgeschlagen.length}`,
  );
  if (limits.length) log("Projektlimit erreicht – Entscheidung Inhaber (Tarif) nötig");
  if (fehler) log(`Abbruch: ${fehler.message} – Teilprotokoll in ${path.basename(file)}`);
  if (!nachherIst) log(protokoll.verifikation);
  if (fehlgeschlagen.length) log("Fehlgeschlagene Einträge prüfen – kein Projektlimit");
  if (protokoll.zielseiteNichtAngeglichen.length)
    log(
      `Zielseite abweichend, nicht geändert: ${protokoll.zielseiteNichtAngeglichen.length} – Liste im Protokoll prüfen,` +
        " angleichen nur ausdrücklich mit --apply --retarget",
    );
  if (protokoll.schreibweiseGeaendert.length)
    log(`WARNUNG: Schreibweise von ${protokoll.schreibweiseGeaendert.length} Keywords nach dem Angleichen geändert`);
  return { code: fehler || !nachherIst || fehlgeschlagen.length ? 1 : 0, file, protokoll };
}
