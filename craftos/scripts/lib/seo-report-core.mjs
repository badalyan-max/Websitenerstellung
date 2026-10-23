// Reine Logik für scripts/seo-report.mjs (D-37): Aufrufplanung, Rohdateinamen, Warn- und Berichtstexte,
// Unit-Differenz und der Abruf selbst über einen übergebenen Client (im Test gemockt). Kein Datei- und kein
// eigener Netzzugriff; der Schlüssel bleibt im Client (scripts/lib/se-ranking-mcp.mjs).
//
// Kosten (SE-Ranking-Doku, abgerufen 23.10.2026, docs/seo/reports/2026-10-23-messstand-phase10.md § 3.1):
// DATA_getAiSearchLeaderboard pauschal 7.500 Units je Aufruf; DATA_getBacklinksSummary 100 je Ziel;
// DATA_getBacklinksRefDomains 1 je Zeile; DATA_getSubscription und alle PROJECT_*-Abrufe 0 Units.
// Deshalb ist das Leaderboard nur mit dem Schalter --leaderboard aktiv.

export const LEADERBOARD_TOOL = "DATA_getAiSearchLeaderboard";
export const LEADERBOARD_UNITS_TEXT = "ca. 7.500 Units";
export const WARTE_SEK_STANDARD = 60;

/**
 * Argumente lesen. Fehler werden als Text geliefert, damit das Skript vor jedem Netzaufruf abbrechen kann.
 * @param {string[]} argv
 * @returns {{ etappe: string | undefined, leaderboard: boolean, warteSek: number, fehler: string | null }}
 */
export function parseArgs(argv) {
  const i = argv.indexOf("--etappe");
  const etappe = i > -1 ? argv[i + 1] : undefined;
  const leaderboard = argv.includes("--leaderboard");
  let warteSek = WARTE_SEK_STANDARD;
  let fehler = null;
  const w = argv.find((a) => a.startsWith("--warte="));
  if (w !== undefined) {
    const v = w.slice("--warte=".length);
    if (!/^\d+$/.test(v)) fehler = `--warte erwartet ganze Sekunden ≥ 0 (erhalten: „${v}“)`;
    else warteSek = Number(v);
  }
  if (!etappe || !/^[a-z0-9-]+$/.test(etappe))
    fehler = "Aufruf: node scripts/seo-report.mjs --etappe <name> [--leaderboard] [--warte=<sekunden>]   (Name: Kleinbuchstaben, Ziffern, Bindestrich)";
  return { etappe, leaderboard, warteSek, fehler };
}

/**
 * Geplante Tool-Aufrufe in Reihenfolge. Der KI-Tracker ruft PROJECT_getLlmStatus und PROJECT_getLlmStatistics
 * je Engine auf (hier je einmal als Platzhalter für „je Engine“ geführt).
 * @param {{ leaderboard: boolean }} opts
 * @returns {string[]}
 */
export function planeAbrufe({ leaderboard }) {
  return [
    "DATA_getSubscription",
    "PROJECT_listKeywords",
    "PROJECT_getSearchEngines",
    "PROJECT_getKeywordStats",
    "PROJECT_listLlmEngines",
    "PROJECT_getLlmStatus",
    "PROJECT_getLlmStatistics",
    ...(leaderboard ? [LEADERBOARD_TOOL] : []),
    "DATA_getBacklinksSummary",
    "DATA_getBacklinksRefDomains",
    "DATA_getSubscription",
  ];
}

/**
 * Namen der Rohdateien (`<Datum>-raw-<etappe>-<name>.json`); der Überschreibschutz prüft nur diese.
 * @param {{ leaderboard: boolean }} opts
 * @returns {string[]}
 */
export function rawNamen({ leaderboard }) {
  return [
    "keywords",
    "positionen",
    "ki-tracker",
    ...(leaderboard ? ["ai-leaderboard"] : []),
    "backlinks-summary",
    "refdomains",
    "subscription",
  ];
}

export function kostenwarnung() {
  return `Achtung: --leaderboard ruft ${LEADERBOARD_TOOL} ab – pauschal ${LEADERBOARD_UNITS_TEXT} je Aufruf.`;
}

const deDatum = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ""));
  return m ? `${m[3]}.${m[2]}.${m[1]}` : String(iso ?? "–");
};
const dePct = (x, digits = 2) =>
  `${Number(x).toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits })} %`;

/**
 * Berichtszeile, wenn das Leaderboard nicht abgerufen wurde: Grund, Kosten und der letzte gemessene Wert mit
 * Datum und Quelle. Kein Schätzwert.
 * @param {{ datum: string, datei: string, rang: number | null, anzahl: number, shareOfVoice: number | null,
 *   markennennungen: number | null, linkzitate: number | null } | null} letzterStand
 */
export function berichtszeileOhneLeaderboard(letzterStand) {
  const kopf = `KI-Leaderboard nicht abgerufen (Schalter --leaderboard, ${LEADERBOARD_UNITS_TEXT})`;
  if (!letzterStand) return `${kopf}; letzter Wert: keine Rohdatei vorhanden.`;
  const s = letzterStand;
  const teile = [
    s.rang != null ? `Rang ${s.rang} von ${s.anzahl}` : `nicht unter ${s.anzahl} Einträgen`,
    s.shareOfVoice != null ? `Share of Voice ${dePct(s.shareOfVoice * 100)}` : "Share of Voice –",
    `Markennennungen ${s.markennennungen ?? "–"}`,
    `Linkzitate ${s.linkzitate ?? "–"}`,
  ];
  return `${kopf}; letzter Wert vom ${deDatum(s.datum)}: ${teile.join(", ")} (Quelle \`${s.datei}\`).`;
}

/**
 * Jüngste Leaderboard-Rohdatei aus einer Liste relativer Pfade (Datumspräfix YYYY-MM-DD im Dateinamen,
 * bei gleichem Datum die letzte nach Name).
 * @param {string[]} pfade
 * @returns {{ datum: string, datei: string } | null}
 */
export function letzteLeaderboardDatei(pfade) {
  const treffer = pfade
    .map((p) => {
      const name = String(p).split(/[\\/]/).pop() ?? "";
      const m = /^(\d{4}-\d{2}-\d{2})-.*ai-leaderboard\.json$/.exec(name);
      return m ? { datum: m[1], datei: String(p).replace(/\\/g, "/"), name } : null;
    })
    .filter((x) => x !== null)
    .sort((a, b) => a.datum.localeCompare(b.datum) || a.name.localeCompare(b.name));
  const t = treffer.pop();
  return t ? { datum: t.datum, datei: t.datei } : null;
}

/**
 * Eintrag der Hauptdomain aus einer Leaderboard-Antwort.
 * @param {any} json
 * @param {{ datum: string, datei: string }} quelle
 * @param {string} primary
 */
export function leaderboardStand(json, quelle, primary) {
  const lb = Array.isArray(json?.leaderboard) ? json.leaderboard : [];
  const e = lb.find((l) => l.domain === primary);
  if (!e) return null;
  return {
    datum: quelle.datum,
    datei: quelle.datei,
    rang: e.rank ?? null,
    anzahl: lb.length,
    shareOfVoice: e.share_of_voice ?? null,
    markennennungen: e.brand_presence ?? null,
    linkzitate: e.link_presence ?? null,
  };
}

/**
 * Verbrauchte Units zwischen zwei DATA_getSubscription-Antworten.
 * @param {any} vorher
 * @param {any} nachher
 * @returns {number | null}
 */
export function unitDifferenz(vorher, nachher) {
  const a = vorher?.subscription_info?.units_left;
  const b = nachher?.subscription_info?.units_left;
  return typeof a === "number" && typeof b === "number" ? a - b : null;
}

const ENGINE_NAMEN = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Gemini",
  google_ai_overview: "Google AI Overview",
  google_ai_mode: "Google AI Mode",
};
export const engineName = (base) => ENGINE_NAMEN[base] ?? String(base);

const kachel = (statistik, key) => {
  const t = Array.isArray(statistik?.tiles) ? statistik.tiles.find((x) => x.key === key) : undefined;
  return typeof t?.value === "number" ? t.value : null;
};

/**
 * Tabellenzeilen „Engine | Prompts | geprüft | letzte Prüfung | Nennung | Link“ aus der KI-Tracker-Rohantwort.
 * @param {{ engines: { id: number, name: string, status: any, statistik: any }[] }} kiTracker
 * @returns {string[]}
 */
export function kiTrackerZeilen(kiTracker) {
  return (kiTracker?.engines ?? []).map((e) => {
    const nennung = kachel(e.statistik, "mention");
    const link = kachel(e.statistik, "link");
    const letzte = e.status?.last_update_date ? deDatum(e.status.last_update_date) : "nie geprüft";
    return `| ${engineName(e.name)} | ${e.status?.prompts_count ?? "–"} | ${e.status?.prompts_checked ?? "–"} | ${letzte} | ${
      nennung === null ? "–" : dePct(nennung)
    } | ${link === null ? "–" : dePct(link)} |`;
  });
}

// Listenantwort: Array, { data } oder { items }; sonst Fehler (fail closed wie rowsOf).
const liste = (r, label) => {
  if (Array.isArray(r)) return r;
  if (Array.isArray(r?.data)) return r.data;
  if (Array.isArray(r?.items)) return r.items;
  throw new Error(`Antwortformat von ${label} unbekannt – Abbruch statt leerer Liste`);
};

const schlaf = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Führt die Abrufe in der Reihenfolge von planeAbrufe aus. Ohne `leaderboard` gibt es keine Leaderboard-Anfrage;
 * mit Schalter steht die Kostenwarnung unmittelbar davor. Der Kontostand „nachher“ wird erst nach `warteMs`
 * gelesen, weil SE Ranking die Kosten 10–60 s verzögert bucht.
 * @param {{ callTool: (name: string, args: Record<string, unknown>) => Promise<any> }} client
 * @param {{ siteId: number, baseDate: string, today: string, leaderboard: boolean, warteMs: number,
 *   leaderboardParams?: Record<string, unknown>, sleep?: (ms: number) => Promise<void>,
 *   warn?: (m: string) => void, log?: (m: string) => void, refdomainLimit?: number }} opts
 */
export async function fuehreAbrufeAus(client, opts) {
  const { siteId, baseDate, today, leaderboard, warteMs, leaderboardParams } = opts;
  const sleep = opts.sleep ?? schlaf;
  const warn = opts.warn ?? ((m) => console.error(m));
  const log = opts.log ?? (() => {});
  /** @type {Record<string, any>} */
  const raw = {};

  const subBefore = await client.callTool("DATA_getSubscription", {});

  const keywordsRaw = await client.callTool("PROJECT_listKeywords", { site_id: siteId });
  if (!liste(keywordsRaw, "PROJECT_listKeywords").length) throw new Error("PROJECT_listKeywords meldet 0 Keywords – Abbruch");
  raw["keywords"] = keywordsRaw;
  const engines = liste(await client.callTool("PROJECT_getSearchEngines", { site_id: siteId }), "PROJECT_getSearchEngines");
  const siteEngineId = Number(engines[0]?.site_engine_id);
  if (!Number.isInteger(siteEngineId) || siteEngineId <= 0)
    throw new Error("PROJECT_getSearchEngines liefert keine site_engine_id – Abbruch vor dem Positionsabruf");
  const positionenRaw = await client.callTool("PROJECT_getKeywordStats", {
    site_id: siteId,
    date_from: baseDate,
    date_to: today,
    site_engine_id: siteEngineId,
    with_landing_pages: "1",
  });
  liste(positionenRaw, "PROJECT_getKeywordStats");
  raw["positionen"] = positionenRaw;

  // KI-Tracker des Projekts (Project API, 0 Units): Status und Statistik je Engine.
  const llm = liste(await client.callTool("PROJECT_listLlmEngines", { site_id: siteId }), "PROJECT_listLlmEngines");
  const kiEngines = [];
  for (const e of llm) {
    const status = await client.callTool("PROJECT_getLlmStatus", { site_id: siteId, llm_id: e.id });
    const statistik = await client.callTool("PROJECT_getLlmStatistics", {
      site_id: siteId,
      llm_id: e.id,
      from: baseDate,
      to: today,
      top: 0,
    });
    kiEngines.push({ id: e.id, name: e.base_name, status, statistik });
  }
  raw["ki-tracker"] = { zeitraum: { from: baseDate, to: today }, engines: kiEngines };

  if (leaderboard) {
    warn(kostenwarnung());
    raw["ai-leaderboard"] = await client.callTool(LEADERBOARD_TOOL, leaderboardParams ?? {});
  }

  const backlinksRaw = await client.callTool("DATA_getBacklinksSummary", { target: ["craftos.eu"] });
  liste(backlinksRaw?.summary ?? backlinksRaw, "DATA_getBacklinksSummary");
  raw["backlinks-summary"] = backlinksRaw;
  const refdomainsRaw = await client.callTool("DATA_getBacklinksRefDomains", {
    target: "craftos.eu",
    order_by: "domain_inlink_rank",
    limit: opts.refdomainLimit ?? 1000,
  });
  liste(refdomainsRaw?.refdomains ?? refdomainsRaw, "DATA_getBacklinksRefDomains");
  raw["refdomains"] = refdomainsRaw;

  if (warteMs > 0) log(`Warte ${Math.round(warteMs / 1000)} s auf die Buchung, dann Kontostand „nachher“ …`);
  await sleep(warteMs);
  const subAfter = await client.callTool("DATA_getSubscription", {});
  raw["subscription"] = { vorher: subBefore, nachher: subAfter, warteSek: Math.round(warteMs / 1000) };

  return { raw, subBefore, subAfter, verbraucht: unitDifferenz(subBefore, subAfter) };
}
