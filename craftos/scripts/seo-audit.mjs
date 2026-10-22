// Post-Build-SEO-Audit (Phase 8, D-06 bis D-10): prüft jede Sitemap-URL im gebauten HTML unter
// .next/server/app gegen die Regeln aus 08-UI-SPEC „Prüfmatrix“ – ohne Server und ohne Netz.
//   npm run build && node scripts/seo-audit.mjs [--only=<regel,…>] [--paths=<pfad,…>] [--report]
// Ohne --report endet das Skript mit Exitcode 1, sobald eine Regel verletzt ist. Ergebnis immer nach
// test-results/seo-audit.json (Verstöße, Zusammenfassung je Regel, Ist-Werte je Pfad).
// Reine Prüffunktionen: scripts/lib/seo-audit-core.mjs (Vitest: tests/seo-audit-core.test.ts).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SEITEN_REGELN, duplikate, headTags, pfadVonUrl, promptVerstoesse, pruefeSeite } from "./lib/seo-audit-core.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, ".next/server/app");
const ALLE_REGELN = [...SEITEN_REGELN, "duplikate", "prompts"];

const args = process.argv.slice(2);
const liste = (name) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a
    ? a
        .slice(name.length + 3)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
};
const reportOnly = args.includes("--report");
const only = liste("only");
const pfadFilter = liste("paths")?.map((p) => pfadVonUrl(p.startsWith("/") ? p : `/${p}`));

let regeln = ALLE_REGELN;
if (only) {
  const unbekannt = only.filter((r) => !ALLE_REGELN.includes(r));
  for (const r of unbekannt) console.log(`Hinweis: Regel ‚${r}‘ ist unbekannt und wird übersprungen (bekannt: ${ALLE_REGELN.join(", ")}).`);
  regeln = only.filter((r) => ALLE_REGELN.includes(r));
}

const sitemapFile = path.join(appDir, "sitemap.xml.body");
if (!fs.existsSync(sitemapFile)) {
  console.error("Kein Build gefunden (.next/server/app/sitemap.xml.body fehlt) – zuerst npm run build ausführen.");
  process.exit(1);
}
const alleSeiten = [...new Set([...fs.readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pfadVonUrl(m[1].trim())))];
const keywordMap = JSON.parse(fs.readFileSync(path.join(root, "docs/seo/keyword-map.json"), "utf8"));
const mapBy = new Map(keywordMap.map((e) => [e.path, e]));
const manifest = JSON.parse(fs.readFileSync(path.join(root, ".next/prerender-manifest.json"), "utf8"));

const htmlDatei = (p) => path.join(appDir, p === "/" ? "index.html" : `${p.slice(1)}.html`);
function ogInfo(ogImage) {
  const ogPfad = pfadVonUrl(ogImage);
  if (!ogPfad) return { imInManifest: false, bytes: null };
  const body = path.join(appDir, `${ogPfad.slice(1)}.body`);
  return { imInManifest: Boolean(manifest.routes?.[ogPfad]), bytes: fs.existsSync(body) ? fs.statSync(body).size : null };
}

const verstoesse = [];
const seiten = [];
const geprueft = pfadFilter ? alleSeiten.filter((p) => pfadFilter.includes(p)) : alleSeiten;
if (pfadFilter)
  for (const p of pfadFilter.filter((x) => !alleSeiten.includes(x)))
    console.log(`Hinweis: ${p} steht nicht in der Sitemap und wird nicht geprüft.`);

const seitenRegeln = regeln.filter((r) => SEITEN_REGELN.includes(r));
for (const p of alleSeiten) {
  const datei = htmlDatei(p);
  if (!fs.existsSync(datei)) {
    if (geprueft.includes(p)) verstoesse.push({ regel: "build", path: p, problem: `Build: ${p} steht in der Sitemap, hat aber keine HTML-Datei.` });
    continue;
  }
  const html = fs.readFileSync(datei, "utf8");
  const ist = headTags(html);
  seiten.push({ path: p, title: ist.title, description: ist.description, h1s: ist.h1s });
  if (!geprueft.includes(p) || seitenRegeln.length === 0) continue;
  verstoesse.push(...pruefeSeite({ path: p, html, mapEntry: mapBy.get(p) ?? null, og: ogInfo(ist.ogImage) }, seitenRegeln));
}
if (regeln.includes("duplikate")) verstoesse.push(...duplikate(seiten, pfadFilter));
if (regeln.includes("prompts")) {
  // Prompt-Mapping (D-10): Ziele bis Phase 8 mit Anker und Antwort, Phase 9 nur Existenz.
  const mapping = JSON.parse(fs.readFileSync(path.join(root, "docs/seo/ai-prompts-targets.json"), "utf8"));
  const getHtml = (p) => (fs.existsSync(htmlDatei(p)) ? fs.readFileSync(htmlDatei(p), "utf8") : null);
  verstoesse.push(...promptVerstoesse(mapping, getHtml, pfadFilter));
}

const zusammenfassung = Object.fromEntries([...regeln, "build"].map((r) => [r, verstoesse.filter((v) => v.regel === r).length]));
if (zusammenfassung.build === 0) delete zusammenfassung.build;

const ergebnis = {
  erstellt: new Date().toISOString(),
  optionen: { only, paths: pfadFilter, report: reportOnly },
  seitenGesamt: alleSeiten.length,
  seitenGeprueft: geprueft.length,
  zusammenfassung,
  verstoesse,
  seiten: seiten
    .filter((s) => geprueft.includes(s.path))
    .map((s) => ({
      path: s.path,
      ist: { title: s.title, description: s.description, h1s: s.h1s },
      verstoesse: verstoesse.filter((v) => v.path === s.path).map((v) => v.regel),
    })),
};
fs.mkdirSync(path.join(root, "test-results"), { recursive: true });
fs.writeFileSync(path.join(root, "test-results/seo-audit.json"), JSON.stringify(ergebnis, null, 2));

console.log(`SEO-Audit über ${geprueft.length} von ${alleSeiten.length} Sitemap-URLs (Regeln: ${regeln.join(", ") || "keine"})`);
for (const [regel, n] of Object.entries(zusammenfassung)) {
  console.log(`${n === 0 ? "OK    " : "FEHLER"} ${regel}: ${n} Verstöße`);
  for (const v of verstoesse.filter((x) => x.regel === regel).slice(0, 10)) console.log(`         ${v.problem}${v.detail ? ` [${v.detail}]` : ""}`);
}
console.log(`Ergebnis: ${verstoesse.length} Verstöße – Details in test-results/seo-audit.json${reportOnly ? " (nur Bericht, Exitcode 0)" : ""}`);
process.exitCode = !reportOnly && verstoesse.length > 0 ? 1 : 0;
