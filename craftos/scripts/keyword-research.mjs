// Reproduzierbarer Abruf der SE Ranking Data API für die Keyword-Map (SEO-02, D-05, D-16).
//   node scripts/keyword-research.mjs plan    Kostenplan (Worst Case), nur /account/subscription (kostenlos)
//   node scripts/keyword-research.mjs run     related, questions, longtail, domain/keywords, comparison
//   node scripts/keyword-research.mjs export  POST /keywords/export für pageCandidates + gefundene Keywords
// Der Schlüssel kommt aus der .env im Repo-Root (gitignored) bzw. aus CRAFTOS_ENV_FILE.
// Er wird nie ausgegeben und nie gespeichert; Rohdateien enthalten nur die API-Antwort.
import fs from "node:fs";
import path from "node:path";

const KEY_NAME = "SE_RANKING_API_KEY";
const ENV_FILE = process.env.CRAFTOS_ENV_FILE || "C:/Projekte/Websitenerstellung/.env";
const BASE = "https://api.seranking.com/v1";
const BUDGET = 30000;
const PAUSE_MS = 1600;
const BACKOFF_MS = [1000, 2000, 4000];
const EXPORT_CHUNK = 5000;
const EXPORT_MIN_VOLUME = 10;

const ROOT = path.resolve(import.meta.dirname, "..");
const SEEDS_FILE = path.join(ROOT, "docs/seo/keyword-seeds.json");
const DATA_DIR = path.join(ROOT, "docs/seo/data/kwmap");
const MANIFEST_FILE = path.join(DATA_DIR, "manifest.json");

const PARAMS = {
  related: { limit: 30, "filter[volume][from]": 20 },
  questions: { limit: 20 },
  longtail: { limit: 100 },
  domainKeywords: { limit: 1000, "filter[volume][from]": 20 },
  comparison: { compare: "craftos.eu", diff: 1, limit: 1000 },
};

const mode = process.argv[2];
if (!["plan", "run", "export"].includes(mode)) {
  console.error("Aufruf: node scripts/keyword-research.mjs <plan|run|export>");
  process.exit(1);
}

try {
  process.loadEnvFile(ENV_FILE);
} catch {
  // Fehlende Datei wird unten als fehlender Schlüssel gemeldet.
}
const apiKey = process.env[KEY_NAME];
if (!apiKey) {
  console.error(`${KEY_NAME} fehlt in ${ENV_FILE}`);
  process.exit(1);
}
const authHeaders = () => ({ Authorization: `Token ${apiKey}` });

const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, "utf8"));
fs.mkdirSync(DATA_DIR, { recursive: true });

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const domainSlug = (d) => d.toLowerCase().replace(/[^a-z0-9.]+/g, "-");

function loadManifest() {
  if (!fs.existsSync(MANIFEST_FILE))
    return { budget: BUDGET, unitsEstimatedTotal: 0, subscriptionBefore: null, subscriptionAfter: null, files: [] };
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
}
function saveManifest(m) {
  m.budget = BUDGET;
  // unrecordedCalls: abgerechnete Aufrufe ohne gespeicherte Datei (z. B. Fehlbehandlung), zählen zum Budget.
  m.unitsEstimatedTotal =
    m.files.reduce((s, f) => s + (f.unitsEstimated || 0), 0) +
    (m.unrecordedCalls || []).reduce((s, c) => s + (c.unitsEstimated || 0), 0);
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(m, null, 2) + "\n");
}

// Geplante GET-Aufrufe mit Worst-Case-Kosten.
function plannedCalls() {
  const calls = [];
  for (const keyword of seeds.related)
    calls.push({ endpoint: "keywords/related", prefix: "related", slug: slugify(keyword), params: { source: "de", keyword, ...PARAMS.related }, worst: PARAMS.related.limit * 10 });
  for (const keyword of seeds.questions)
    calls.push({ endpoint: "keywords/questions", prefix: "questions", slug: slugify(keyword), params: { source: "de", keyword, ...PARAMS.questions }, worst: PARAMS.questions.limit * 10 });
  for (const keyword of seeds.longtail)
    calls.push({ endpoint: "keywords/longtail", prefix: "longtail", slug: slugify(keyword), params: { source: "de", keyword, ...PARAMS.longtail }, worst: PARAMS.longtail.limit * 1 });
  for (const domain of seeds.competitorDomains)
    calls.push({ endpoint: "domain/keywords", prefix: "domain-keywords", slug: domainSlug(domain), params: { source: "de", domain, ...PARAMS.domainKeywords }, worst: 100 });
  for (const domain of seeds.comparisonDomains)
    calls.push({ endpoint: "domain/keywords/comparison", prefix: "comparison", slug: domainSlug(domain), params: { source: "de", domain, ...PARAMS.comparison }, worst: 100 });
  return calls.map((c) => ({ ...c, file: `${c.prefix}--${c.slug}.json` }));
}

const allPageCandidates = () => [...new Set(Object.values(seeds.pageCandidates).flat())];

function exportWorstCase() {
  const candidates = allPageCandidates().length;
  const domains = seeds.competitorDomains.length + seeds.comparisonDomains.length;
  const estimated =
    candidates +
    seeds.related.length * PARAMS.related.limit +
    seeds.questions.length * PARAMS.questions.limit +
    seeds.longtail.length * PARAMS.longtail.limit +
    PARAMS.domainKeywords.limit * domains;
  const packages = Math.ceil(estimated / EXPORT_CHUNK);
  return { candidates, estimated, packages, units: packages * 100 };
}

function buildQuery(params) {
  // Klammernotation der Filter bleibt lesbar, Werte werden kodiert (Umlaute, Pitfall 8).
  return Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastCall = 0;
async function request(method, endpoint, query, body) {
  const wait = lastCall + PAUSE_MS - Date.now();
  if (wait > 0) await sleep(wait);
  for (let attempt = 0; ; attempt++) {
    lastCall = Date.now();
    const res = await fetch(`${BASE}/${endpoint}${query ? "?" + query : ""}`, {
      method,
      headers: { ...authHeaders(), ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(120000),
    });
    if (res.status !== 429) {
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
      return { status: res.status, body: json };
    }
    if (attempt >= BACKOFF_MS.length) {
      console.error(`Abbruch: HTTP 429 (Ratenlimit) bei ${endpoint} auch nach ${BACKOFF_MS.length} Wiederholungen.`);
      process.exit(1);
    }
    await sleep(BACKOFF_MS[attempt]);
  }
}

async function subscription() {
  const { status, body } = await request("GET", "account/subscription");
  if (status < 200 || status >= 300) {
    console.error(`Kontingent nicht abrufbar (HTTP ${status}).`);
    return null;
  }
  const info = body.subscription_info || {};
  return {
    units_left: Number(info.units_left),
    units_limit: Number(info.units_limit),
    expiration: info.expiraton_date ?? info.expiration_date ?? null,
    checkedAt: new Date().toISOString(),
  };
}

function writeRaw(file, body) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(body, null, 2) + "\n");
}
function record(m, entry) {
  m.files = m.files.filter((f) => f.file !== entry.file);
  m.files.push(entry);
  saveManifest(m);
}

function unitsFor(call, body) {
  if (call.prefix === "related" || call.prefix === "questions")
    return (Array.isArray(body?.keywords) ? body.keywords.length : 0) * 10;
  if (call.prefix === "longtail") return Array.isArray(body?.keywords) ? body.keywords.length : 0;
  return 100;
}

// Keywords aus vorhandenen Rohdateien für den Export.
function collectExportKeywords() {
  const out = new Set(allPageCandidates());
  for (const f of fs.readdirSync(DATA_DIR)) {
    // Quellen laut Plan: related, questions, longtail, domain-keywords (comparison enthält dieselben Zahlen bereits).
    if (!/^(related|questions|longtail|domain-keywords)--.*\.json$/.test(f)) continue;
    const body = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
    if (f.startsWith("longtail--")) {
      for (const k of body.keywords ?? []) if (typeof k === "string") out.add(k);
      continue;
    }
    const rows = Array.isArray(body) ? body : Array.isArray(body?.keywords) ? body.keywords : [];
    for (const r of rows)
      if (r && typeof r.keyword === "string" && Number(r.volume) >= EXPORT_MIN_VOLUME) out.add(r.keyword);
  }
  return [...out];
}
function exportedKeywords() {
  const have = new Set();
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.startsWith("export--") && f.endsWith(".json"));
  for (const f of files) {
    const body = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
    for (const r of Array.isArray(body) ? body : []) if (r && typeof r.keyword === "string") have.add(r.keyword.toLowerCase());
  }
  return { have, count: files.length };
}

const manifest = loadManifest();
const booked =
  manifest.files.reduce((s, f) => s + (f.unitsEstimated || 0), 0) +
  (manifest.unrecordedCalls || []).reduce((s, c) => s + (c.unitsEstimated || 0), 0);
const calls = plannedCalls();
const open = calls.filter((c) => !fs.existsSync(path.join(DATA_DIR, c.file)));
const exp = exportWorstCase();
const exportDone = fs.readdirSync(DATA_DIR).some((f) => f.startsWith("export--"));

if (mode === "plan") {
  const groups = new Map();
  for (const c of calls) {
    const cached = !open.includes(c);
    console.log(`${cached ? "[Cache] " : ""}${c.endpoint} ${c.slug}: bis ${c.worst} Units`);
    const g = groups.get(c.endpoint) || { n: 0, worst: 0 };
    g.n += cached ? 0 : 1;
    g.worst += cached ? 0 : c.worst;
    groups.set(c.endpoint, g);
  }
  console.log("");
  for (const [ep, g] of groups) console.log(`${ep}: ${g.n} offene Aufrufe, Worst Case ${g.worst} Units`);
  console.log(`Export: ${exp.candidates} pageCandidates, geschätzt ${exp.estimated} Keywords, ${exp.packages} Pakete à 100 Units${exportDone ? " (teilweise im Cache)" : ""}`);
  const planned = open.reduce((s, c) => s + c.worst, 0) + exp.units;
  console.log(`Geplant: ${planned} Units, bisher verbucht: ${booked}, Budget ${BUDGET}`);
  const sub = await subscription();
  if (sub) console.log(`Kontingent laut SE Ranking: ${sub.units_left} von ${sub.units_limit} Units, Ablauf ${sub.expiration}`);
  if (booked + planned > BUDGET) {
    console.error(`Budget überschritten: ${booked + planned} > ${BUDGET}. Seeds kürzen.`);
    process.exitCode = 1;
  }
}

if (mode === "run") {
  const planned = open.reduce((s, c) => s + c.worst, 0) + (exportDone ? 0 : exp.units);
  if (booked + planned > BUDGET) {
    console.error(`Abbruch vor dem ersten Aufruf: verbucht ${booked} + geplant ${planned} > Budget ${BUDGET} (D-16).`);
    process.exit(1);
  }
  const before = await subscription();
  if (before && !manifest.subscriptionBefore) manifest.subscriptionBefore = before;
  saveManifest(manifest);
  let failed = 0;
  for (const [i, c] of open.entries()) {
    const { status, body } = await request("GET", c.endpoint, buildQuery(c.params));
    if (status < 200 || status >= 300) {
      failed++;
      const msg = body?.message || body?.error || JSON.stringify(body).slice(0, 200);
      console.error(`FEHLER ${c.file}: HTTP ${status} ${msg}`);
      continue;
    }
    writeRaw(c.file, body);
    const units = unitsFor(c, body);
    record(manifest, { file: c.file, endpoint: `GET /v1/${c.endpoint}`, params: c.params, fetchedAt: new Date().toISOString(), unitsEstimated: units, httpStatus: status });
    console.log(`[${i + 1}/${open.length}] ${c.file}: ${units} Units`);
  }
  const after = await subscription();
  if (after) manifest.subscriptionAfter = after;
  saveManifest(manifest);
  console.log(`Fertig: ${open.length - failed} Dateien, ${failed} Fehler, verbucht gesamt ${manifest.unitsEstimatedTotal} Units, Kontingent ${after?.units_left ?? "?"}`);
  if (failed) process.exitCode = 1;
}

if (mode === "export") {
  const wanted = collectExportKeywords();
  const { have, count } = exportedKeywords();
  const missing = wanted.filter((k) => !have.has(k.toLowerCase()));
  const packages = Math.ceil(missing.length / EXPORT_CHUNK);
  console.log(`Export: ${allPageCandidates().length} pageCandidates, ${wanted.length} Keywords gesamt, ${missing.length} offen, ${packages} Pakete à 100 Units`);
  if (booked + packages * 100 > BUDGET) {
    console.error(`Abbruch: verbucht ${booked} + Export ${packages * 100} > Budget ${BUDGET} (D-16).`);
    process.exit(1);
  }
  if (packages > 0) {
    const before = await subscription();
    if (before && !manifest.subscriptionBefore) manifest.subscriptionBefore = before;
  }
  for (let p = 0; p < packages; p++) {
    const keywords = missing.slice(p * EXPORT_CHUNK, (p + 1) * EXPORT_CHUNK);
    const file = `export--candidates-${count + p + 1}.json`;
    const { status, body } = await request("POST", "keywords/export", "source=de", { keywords });
    if (status < 200 || status >= 300) {
      const msg = body?.message || body?.error || JSON.stringify(body).slice(0, 200);
      console.error(`FEHLER ${file}: HTTP ${status} ${msg}`);
      process.exitCode = 1;
      break;
    }
    writeRaw(file, body);
    record(manifest, { file, endpoint: "POST /v1/keywords/export", params: { source: "de", keywordCount: keywords.length }, fetchedAt: new Date().toISOString(), unitsEstimated: 100, httpStatus: status });
    console.log(`${file}: ${keywords.length} Keywords, 100 Units`);
  }
  if (packages > 0) {
    const after = await subscription();
    if (after) manifest.subscriptionAfter = after;
  }
  saveManifest(manifest);
  console.log(`Verbucht gesamt ${manifest.unitsEstimatedTotal} Units, Kontingent ${manifest.subscriptionAfter?.units_left ?? "?"}`);
}
