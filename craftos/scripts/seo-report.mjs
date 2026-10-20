// Messbericht gegen den Ausgangsstand vom 20.10.2026 (SEO-07, D-07a).
//   node scripts/seo-report.mjs --etappe <name>     z. B. ausgangsstand, rollout-phase05
// Ruft über den SE-Ranking-MCP-Client ab: Projektpositionen (Projekt 13094375), KI-Leaderboard (gleiche
// Wettbewerber/Engines wie die Ausgangsdatei) und Backlinks (Zusammenfassung und verweisende Domains von craftos.eu).
// Schreibt docs/seo/reports/<Datum>-messbericht-<etappe>.md und <Datum>-raw-<etappe>-*.json (nur API-Antworten).
// Existiert eine Zieldatei bereits, bricht das Skript vor jedem Netzaufruf mit exitCode 1 ab (kein Überschreiben).
import fs from "node:fs";
import path from "node:path";
import { createClient, rowsOf } from "./lib/se-ranking-mcp.mjs";

const SITE_ID = 13094375;
const BASE_DATE = "2026-10-20";
const ROOT = path.resolve(import.meta.dirname, "..");
const SEO = path.join(ROOT, "docs/seo");
const REPORT_DIR = path.join(SEO, "reports");
const BASE_LEADERBOARD = path.join(SEO, "data/2026-10-20-ai-leaderboard.json");
const BASE_BACKLINKS = path.join(SEO, "data/2026-10-20-backlinks-summary.json");
// Ausgangswerte laut SE-RANKING-BEFUND-2026-10-20.md §2–§4.
const BEFUND = { rankendeKeywords: 1, refdomainsSpam: 12, sovPrimary: 0.0002 };
const REFDOMAIN_LIMIT = 1000;
const MILESTONE_NEW_REFDOMAINS = 15;

// ---------- Argumente und Überschreibschutz (vor jedem Netzaufruf) ----------
const i = process.argv.indexOf("--etappe");
const etappe = i > -1 ? process.argv[i + 1] : undefined;
if (!etappe || !/^[a-z0-9-]+$/.test(etappe)) {
  console.error("Aufruf: node scripts/seo-report.mjs --etappe <name>   (Name: Kleinbuchstaben, Ziffern, Bindestrich)");
  process.exit(1);
}
const today = new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, lokale Zeit
const RAW = ["keywords", "positionen", "ai-leaderboard", "backlinks-summary", "refdomains", "subscription"];
const rawFile = (name) => path.join(REPORT_DIR, `${today}-raw-${etappe}-${name}.json`);
const reportFile = path.join(REPORT_DIR, `${today}-messbericht-${etappe}.md`);
const targets = [reportFile, ...RAW.map(rawFile)];
const existing = targets.filter((f) => fs.existsSync(f));
if (existing.length) {
  console.error(
    `Abbruch: Bericht der Etappe „${etappe}“ vom ${today} existiert bereits (${existing
      .map((f) => path.basename(f))
      .join(", ")}). Frühere Berichte werden nicht überschrieben – andere Etappe wählen.`,
  );
  process.exit(1);
}

// ---------- Hilfsfunktionen ----------
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
// Listenantworten fail closed lesen (MD-04): unbekanntes Format bricht ab, statt als leere Liste zu zählen.
const rows = (r, label = "Antwort") => rowsOf(r, label);
const normKw = (k) => String(k).trim().toLowerCase();
const toPath = (u) => {
  if (!u) return "–";
  try {
    const p = new URL(u).pathname;
    return p === "/" ? "/" : p.replace(/\/+$/, "");
  } catch {
    return String(u);
  }
};
const fmtInt = (n) => (n === null || n === undefined ? "–" : Number(n).toLocaleString("de-DE"));
const fmtPct = (x) =>
  x === null || x === undefined ? "–" : `${(x * 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
const fmtDelta = (a, b) => {
  if (a === null || a === undefined || b === null || b === undefined) return "–";
  const d = b - a;
  return d === 0 ? "±0" : `${d > 0 ? "+" : "−"}${fmtInt(Math.abs(d))}`;
};
const fmtDeltaPp = (a, b) => {
  if (a === null || a === undefined || b === null || b === undefined) return "–";
  const d = (b - a) * 100;
  if (Math.abs(d) < 0.005) return "±0,00 pp";
  return `${d > 0 ? "+" : "−"}${Math.abs(d).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pp`;
};
const fmtPos = (p) => (p === null || p === undefined ? "noch nicht gemessen" : p === 0 ? "> 100" : String(p));
const cell = (s) => String(s ?? "–").replace(/\|/g, "\\|");
const bare = (d) => String(d).toLowerCase().replace(/^www\./, "");

function writeRaw(name, data) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(rawFile(name), JSON.stringify(data, null, 2) + "\n", { flag: "wx" });
}

// ---------- Soll-Liste aus der Keyword-Map ----------
const map = readJson(path.join(SEO, "keyword-map.json"));
const soll = new Map();
for (const e of map) {
  if (!e.primary) continue;
  const kw = normKw(e.primary.keyword);
  if (!soll.has(kw)) soll.set(kw, { keyword: kw, path: e.path, status: e.status, phase: e.status === "geplant" ? (e.phase ?? null) : null });
}
const statusLabel = (s) => (s.status === "geplant" ? `geplant (Phase ${s.phase ?? "?"})` : "bestehend");

const register = readJson(path.join(SEO, "backlink-register.json"));
const baseLb = readJson(BASE_LEADERBOARD);
const baseBl = rows(readJson(BASE_BACKLINKS).summary).find((r) => r.target === "craftos.eu");

// ---------- Abruf ----------
const client = createClient({ log: (m) => console.log(m) });
let subBefore = null;
let subAfter = null;
const raw = {};
try {
  subBefore = await client.callTool("DATA_getSubscription", {});

  const keywordsRaw = await client.callTool("PROJECT_listKeywords", { site_id: SITE_ID });
  if (!rows(keywordsRaw, "PROJECT_listKeywords").length) throw new Error("PROJECT_listKeywords meldet 0 Keywords – Abbruch");
  raw["keywords"] = keywordsRaw;
  const engines = rows(await client.callTool("PROJECT_getSearchEngines", { site_id: SITE_ID }), "PROJECT_getSearchEngines");
  const siteEngineId = Number(engines[0]?.site_engine_id);
  if (!Number.isInteger(siteEngineId) || siteEngineId <= 0)
    throw new Error("PROJECT_getSearchEngines liefert keine site_engine_id – Abbruch vor dem Positionsabruf");
  const positionenRaw = await client.callTool("PROJECT_getKeywordStats", {
    site_id: SITE_ID,
    date_from: BASE_DATE,
    date_to: today,
    site_engine_id: siteEngineId,
    with_landing_pages: "1",
  });
  rows(positionenRaw, "PROJECT_getKeywordStats");
  raw["positionen"] = positionenRaw;

  // KI-Leaderboard mit denselben Parametern wie die Ausgangsdatei (request_metadata).
  const meta = baseLb.request_metadata;
  const brandOf = new Map(baseLb.leaderboard.map((l) => [l.domain, l.brand]));
  const leaderboardRaw = await client.callTool("DATA_getAiSearchLeaderboard", {
    primary: { target: meta.primary, brand: brandOf.get(meta.primary) ?? "CraftOS" },
    competitors: meta.competitors.map((d) => ({ target: d, brand: brandOf.get(d) ?? d })),
    source: meta.source,
    engines: meta.engines,
    scope: meta.scope_requested ?? meta.scope_applied ?? "base_domain",
  });
  raw["ai-leaderboard"] = leaderboardRaw;

  const backlinksRaw = await client.callTool("DATA_getBacklinksSummary", { target: ["craftos.eu"] });
  rows(backlinksRaw?.summary ?? backlinksRaw, "DATA_getBacklinksSummary");
  raw["backlinks-summary"] = backlinksRaw;
  const refdomainsRaw = await client.callTool("DATA_getBacklinksRefDomains", {
    target: "craftos.eu",
    order_by: "domain_inlink_rank",
    limit: REFDOMAIN_LIMIT,
  });
  rows(refdomainsRaw?.refdomains ?? refdomainsRaw, "DATA_getBacklinksRefDomains");
  raw["refdomains"] = refdomainsRaw;

  subAfter = await client.callTool("DATA_getSubscription", {});
  raw["subscription"] = { vorher: subBefore, nachher: subAfter };
  // Rohdateien erst nach vollständigem Abruf schreiben, damit ein Fehlerlauf keine Teilstände hinterlässt.
  for (const name of RAW) writeRaw(name, raw[name]);

  // ---------- Auswertung Positionen ----------
  const projectKw = rows(keywordsRaw).map((k) => ({ id: String(k.id), keyword: normKw(k.name), url: k.link }));
  const statsById = new Map();
  for (const eng of rows(positionenRaw))
    for (const k of eng.keywords ?? []) statsById.set(String(k.id), k);
  const posAt = (k, pick) => {
    const ps = (k?.positions ?? []).filter((p) => typeof p.pos === "number");
    if (!ps.length) return { pos: null, date: null };
    const p = pick === "first" ? ps.find((x) => x.date === BASE_DATE) : ps[ps.length - 1];
    return p ? { pos: p.pos, date: p.date } : { pos: null, date: null };
  };
  const rowsPos = [];
  const tracked = new Set();
  for (const k of projectKw) {
    tracked.add(k.keyword);
    const s = soll.get(k.keyword);
    const st = statsById.get(k.id);
    const basis = posAt(st, "first");
    const aktuell = posAt(st, "last");
    rowsPos.push({
      keyword: k.keyword,
      ziel: toPath(k.url),
      art: s ? s.status : "zusätzlich",
      label: s ? statusLabel(s) : "zusätzlich (nicht in der Keyword-Map)",
      phase: s?.phase ?? null,
      basis: basis.pos,
      aktuell: aktuell.pos,
      datum: aktuell.date,
      ranking: (st?.landing_pages ?? []).map((l) => toPath(l.url)).pop() ?? null,
    });
  }
  for (const s of soll.values())
    if (!tracked.has(s.keyword))
      rowsPos.push({ keyword: s.keyword, ziel: s.path, art: s.status, label: `${statusLabel(s)} – nicht getrackt (Projektlimit)`, phase: s.phase, basis: null, aktuell: null, datum: null, ranking: null, untracked: true });
  const latestDate = rowsPos.map((r) => r.datum).filter(Boolean).sort().pop() ?? null;
  const count = (art, field, top) =>
    rowsPos.filter((r) => r.art === art && typeof r[field] === "number" && r[field] > 0 && r[field] <= top).length;
  const measured = (art, field) => rowsPos.filter((r) => r.art === art && typeof r[field] === "number").length;

  // ---------- Auswertung KI ----------
  const lbNow = leaderboardRaw?.leaderboard ?? [];
  const lbBase = new Map(baseLb.leaderboard.map((l) => [l.domain, l]));
  const primaryNow = lbNow.find((l) => l.domain === meta.primary);

  // ---------- Auswertung Backlinks ----------
  const blNow = rows(backlinksRaw?.summary ?? backlinksRaw).find((r) => r.target === "craftos.eu") ?? null;
  const refdomains = rows(refdomainsRaw?.refdomains ?? refdomainsRaw).map((r) => ({
    domain: bare(r.domain ?? r.refdomain ?? r.domain_from ?? ""),
    dr: r.domain_inlink_rank ?? r.dr ?? null,
    firstSeen: r.first_seen ?? r.date_found ?? null,
  }));
  const refSet = new Set(refdomains.map((r) => r.domain));
  const live = register.filter((e) => e.status === "live");
  const liveFound = live.filter((e) => refSet.has(bare(e.domain)));
  const registerFound = register.filter((e) => refSet.has(bare(e.domain)));
  const neueRefdomains = blNow ? Math.max(0, blNow.refdomains - BEFUND.refdomainsSpam) : null;

  // ---------- Bericht ----------
  const L = [];
  L.push(`# Messbericht craftos.eu – Etappe ${etappe}`);
  L.push("");
  L.push(`Quelle: SE Ranking (Project API, AI Search, Backlinks), Abruf ${today}, Etappe ${etappe}`);
  L.push("");
  L.push(
    `Vergleichsbasis: Ausgangsstand 20.10.2026 laut \`SE-RANKING-BEFUND-2026-10-20.md\` §2–§4, \`data/2026-10-20-ai-leaderboard.json\`, \`data/2026-10-20-backlinks-summary.json\` und Projekt-Erstmessung vom 20.10.2026 (Projekt ${SITE_ID}). Letzte Positionsmessung im Projekt: ${latestDate ?? "keine"}. Rohantworten: \`reports/${today}-raw-${etappe}-*.json\`.`,
  );
  L.push("");
  L.push("## 1. Überblick");
  L.push("");
  L.push("| Kennzahl | Ausgangsstand 20.10.2026 | Aktuell | Veränderung |");
  L.push("|---|---|---|---|");
  L.push(
    `| Rankende Suchbegriffe (Befund §2, Data API) | ${BEFUND.rankendeKeywords} in Top 100 | siehe Projektzeilen | – |`,
  );
  for (const [art, name] of [
    ["bestehend", "bestehende Seiten"],
    ["geplant", "geplante Seiten"],
    ["zusätzlich", "Zusatz-Keywords (nicht in der Map, u. a. Marke)"],
  ]) {
    for (const top of [10, 100]) {
      const b = count(art, "basis", top);
      const a = count(art, "aktuell", top);
      L.push(
        `| Projekt-Keywords ${name} in Top ${top} | ${b} (gemessen ${measured(art, "basis")}) | ${a} (gemessen ${measured(art, "aktuell")}) | ${fmtDelta(b, a)} |`,
      );
    }
  }
  L.push(
    `| Share of Voice CraftOS (KI-Suche) | ${fmtPct(lbBase.get(meta.primary)?.share_of_voice ?? BEFUND.sovPrimary)} | ${fmtPct(primaryNow?.share_of_voice)} | ${fmtDeltaPp(lbBase.get(meta.primary)?.share_of_voice ?? BEFUND.sovPrimary, primaryNow?.share_of_voice)} |`,
  );
  L.push(
    `| Verweisende Domains craftos.eu | ${fmtInt(baseBl?.refdomains ?? BEFUND.refdomainsSpam)} (alle Spam) | ${fmtInt(blNow?.refdomains)} | ${fmtDelta(baseBl?.refdomains ?? BEFUND.refdomainsSpam, blNow?.refdomains)} |`,
  );
  L.push(
    `| Domain InLink Rank craftos.eu | ${fmtInt(baseBl?.domain_inlink_rank)} | ${fmtInt(blNow?.domain_inlink_rank)} | ${fmtDelta(baseBl?.domain_inlink_rank, blNow?.domain_inlink_rank)} |`,
  );
  L.push("");
  L.push(
    "Geplante Keywords werden getrennt gezählt, damit ihre noch fehlende Zielseite die Werte der bestehenden Seiten nicht verwässert. „gemessen“ = Anzahl Keywords mit Positionswert am jeweiligen Datum; neu ins Projekt aufgenommene Keywords erhalten ihre erste Messung mit der nächsten täglichen Prüfung.",
  );
  L.push("");

  L.push("## 2. Share of Voice in KI-Suchen");
  L.push("");
  L.push(`Engines: ${meta.engines.join(", ")} · Datenbank: ${meta.source} · Scope: ${meta.scope_requested ?? meta.scope_applied}. Werte gelten für den laufenden Monat (SE Ranking AI Search).`);
  L.push("");
  L.push("| Marke | Domain | Share of Voice Ausgangsstand 20.10.2026 | Share of Voice aktuell | Veränderung | Markennennungen (aktuell) | Linkzitate (aktuell) |");
  L.push("|---|---|---|---|---|---|---|");
  const domains = [meta.primary, ...meta.competitors];
  const sorted = domains
    .map((d) => ({ d, now: lbNow.find((l) => l.domain === d), base: lbBase.get(d) }))
    .sort((a, b) => (b.now?.share_of_voice ?? -1) - (a.now?.share_of_voice ?? -1));
  for (const { d, now, base } of sorted) {
    const name = now?.brand ?? base?.brand ?? d;
    const strong = d === meta.primary ? "**" : "";
    L.push(
      `| ${strong}${cell(name)}${strong} | ${d} | ${fmtPct(base?.share_of_voice)} | ${fmtPct(now?.share_of_voice)} | ${fmtDeltaPp(base?.share_of_voice, now?.share_of_voice)} | ${fmtInt(now?.brand_presence)} | ${fmtInt(now?.link_presence)} |`,
    );
  }
  L.push("");
  const resNow = leaderboardRaw?.results?.[meta.primary] ?? {};
  const resBase = baseLb.results?.[meta.primary] ?? {};
  L.push("CraftOS je Engine (Markennennungen / Linkzitate; „–“ = keine Daten):");
  L.push("");
  L.push("| Engine | Ausgangsstand 20.10.2026 | Aktuell |");
  L.push("|---|---|---|");
  for (const eng of meta.engines)
    L.push(
      `| ${eng} | ${fmtInt(resBase[eng]?.brand_presence)} / ${fmtInt(resBase[eng]?.link_presence)} | ${fmtInt(resNow[eng]?.brand_presence)} / ${fmtInt(resNow[eng]?.link_presence)} |`,
    );
  L.push("");

  L.push("## 3. Verweisende Domains");
  L.push("");
  L.push("| Kennzahl | Ausgangsstand 20.10.2026 | Aktuell | Veränderung |");
  L.push("|---|---|---|---|");
  for (const [key, label] of [
    ["refdomains", "Verweisende Domains"],
    ["dofollow_refdomains", "davon dofollow"],
    ["backlinks", "Backlinks"],
    ["domain_inlink_rank", "Domain InLink Rank"],
  ])
    L.push(`| ${label} | ${fmtInt(baseBl?.[key])} | ${fmtInt(blNow?.[key])} | ${fmtDelta(baseBl?.[key], blNow?.[key])} |`);
  L.push("");
  L.push(
    `Ausgangsstand: ${BEFUND.refdomainsSpam} verweisende Domains, alle Spam (Befund §4). Meilensteinziel: mindestens ${MILESTONE_NEW_REFDOMAINS} neue seriöse verweisende Domains (LINKPLAN.md §1). Rechnerischer Zuwachs gegenüber dem Ausgangsstand: ${fmtInt(neueRefdomains)}; seriös sind davon nur Domains aus dem Register bzw. nach Sichtprüfung.`,
  );
  L.push("");
  L.push(
    `Abgleich mit \`backlink-register.json\`: ${live.length} Einträge mit Status „live“, davon ${liveFound.length} unter den verweisenden Domains gefunden${liveFound.length ? ` (${liveFound.map((e) => e.domain).join(", ")})` : ""}. Register-Domains (alle Status) unter den verweisenden Domains: ${registerFound.length ? registerFound.map((e) => `${e.domain} (${e.status})`).join(", ") : "keine"}.`,
  );
  L.push("");
  if (refdomains.length) {
    L.push(`Aktuelle verweisende Domains (${refdomains.length}, nach Domain InLink Rank):`);
    L.push("");
    L.push("| Domain | Domain InLink Rank | Erstmals gefunden | Im Register |");
    L.push("|---|---|---|---|");
    for (const r of refdomains) {
      const reg = register.find((e) => bare(e.domain) === r.domain);
      L.push(`| ${r.domain} | ${fmtInt(r.dr)} | ${r.firstSeen ?? "–"} | ${reg ? reg.status : "nein"} |`);
    }
    L.push("");
  }

  L.push("## 4. Positionen je Keyword");
  L.push("");
  L.push(
    `Position „> 100“ = nicht unter den ersten 100 Treffern; „noch nicht gemessen“ = im Projekt, aber noch ohne Prüfung; „nicht getrackt (Projektlimit)“ = Soll-Keyword der Keyword-Map ohne Projekteintrag. Status „geplant (Phase N)“ = Zielseite entsteht erst in Phase N.`,
  );
  L.push("");
  L.push("| Keyword | Ziel-URL | Status | Position 20.10.2026 | Position aktuell | Rankende URL |");
  L.push("|---|---|---|---|---|---|");
  const artOrder = { bestehend: 0, geplant: 1, "zusätzlich": 2 };
  rowsPos.sort(
    (a, b) =>
      artOrder[a.art] - artOrder[b.art] ||
      (a.phase ?? 0) - (b.phase ?? 0) ||
      ((a.aktuell || 999) - (b.aktuell || 999)) ||
      a.keyword.localeCompare(b.keyword, "de"),
  );
  for (const r of rowsPos)
    L.push(
      `| ${cell(r.keyword)} | ${cell(r.ziel)} | ${cell(r.label)} | ${r.untracked ? "–" : fmtPos(r.basis)} | ${r.untracked ? "nicht getrackt (Projektlimit)" : fmtPos(r.aktuell)} | ${cell(r.ranking ?? "–")} |`,
    );
  L.push("");

  const used =
    subBefore?.subscription_info && subAfter?.subscription_info
      ? subBefore.subscription_info.units_left - subAfter.subscription_info.units_left
      : null;
  L.push("## 5. Abruf");
  L.push("");
  L.push(
    `MCP-Aufrufe: ${client.callCount}; verbrauchte Units: ${fmtInt(used)} (Rest ${fmtInt(subAfter?.subscription_info?.units_left)} von ${fmtInt(subAfter?.subscription_info?.units_limit)}, Testzugang bis ${String(subAfter?.subscription_info?.expiraton_date ?? "–").slice(0, 10)}). Wiederholung: \`node scripts/seo-report.mjs --etappe <name>\` mit neuer Etappe; vorhandene Berichte bleiben unverändert.`,
  );
  L.push("");
  fs.writeFileSync(reportFile, L.join("\n"), { flag: "wx" });
  console.log(`geschrieben: ${path.relative(ROOT, reportFile).replace(/\\/g, "/")}`);
  console.log(`MCP-Aufrufe ${client.callCount}, Units verbraucht ${used ?? "unbekannt"}`);
} catch (err) {
  console.error(`Fehler: ${err.message}`);
  process.exit(1);
}
