# Phase 5: Produktwahrheit, Keyword-Map und Designbausteine – Pattern Map

**Erstellt:** 2026-10-20
**Analysierte Dateien (neu/geändert):** 44 (gruppiert in 33 Einträgen)
**Analoga gefunden:** 29 / 33 (4 ohne direktes Analogon, siehe Abschnitt „Kein Analogon“)

Alle Pfade relativ zu `craftos/`, sofern nicht anders angegeben. Code-Konventionen des Repos: TypeScript strict, Alias `@/` (= `craftos/`), `resolveJsonModule: true` ist in `tsconfig.json:11` **bereits gesetzt** (Wave-0-Punkt „resolveJsonModule prüfen“ ist erledigt). Vitest läuft in `node` und erfasst nur `tests/**/*.test.ts` (`vitest.config.ts:6`) – **neue Tests müssen `.ts` sein, kein `.tsx`; Komponenten werden mit `createElement` + `renderToString` gerendert**. `server-only` wird auf `tests/server-only.ts` gemappt (`vitest.config.ts:5`).

**Wichtige Abweichung CONTEXT ↔ RESEARCH:** D-12 (nach der Recherche) entscheidet: Ankündigungen (Telefon-Agent, MCP-Server, Weitere Agent-Aktionen) werden **vollständig entfernt**, nicht als „In Entwicklung“ ohne Datum weitergeführt. Die RESEARCH-Empfehlung `UpcomingFeature { status: "in-entwicklung" }` und „Überschrift ‚In Entwicklung‘“ ist damit überholt. UI-SPEC Copywriting bestätigt: in Vergleichstabellen nur neutrale „Nein“-Zelle ohne Entwicklungshinweis. D-11 entscheidet: Kundenportal ist live (`tier` → `"heute"`).

---

## File Classification

| Neue/geänderte Datei | Rolle | Datenfluss | Nächstes Analogon | Qualität |
|---|---|---|---|---|
| **Produktwahrheit (PROD-02/03/04)** |||||
| `scripts/sync-product-snapshot.mjs` (neu) | utility/Skript | file-I/O, batch (git show → JSON) | `scripts/indexnow-submit.mjs`, `scripts/route-audit.mjs` | role-match |
| `docs/product-pricing-snapshot.json` (neu) | config/Daten | – | `docs/product-source-snapshot.json` | exact (Form) |
| `lib/site.ts` (ändern: Speicher, Start-Credits) | model/Datenmodul | transform | sich selbst (`creditPakete`, `tarife`) | exact |
| `lib/llms.ts` (ändern) | utility | transform | sich selbst (`euro`, `lizenzen`) | exact |
| `lib/schema.ts` (ändern: Offer aus `tarife`) | utility | transform | sich selbst + `lib/llms.ts` | exact |
| `components/home/Hero.tsx`, `app/preise/page.tsx`, `app/page.tsx`, `app/fakten-ueber-craftos/page.tsx` (ändern: Preise ableiten) | component/page | request-response (SSG) | `components/preise/PricingTable.tsx:8-12` (`euro`) | exact |
| `lib/funktionen.ts` (ändern: `upcomingFeatures` entfernen, Kundenportal `tier`) | model | – | sich selbst | exact |
| `app/funktionen/page.tsx`, `app/craft-ai/page.tsx`, `app/fakten-ueber-craftos/page.tsx`, `app/vergleich/page.tsx`, `lib/comparison.ts:255-265`, `content/hilfe/craft-ai-betriebsdaten-fragen.md` (ändern) | page/content | – | – (Löschungen) | n/a |
| `lib/product-register.ts` (ändern: Basis `origin/release`, Belege, `upcoming` raus) | model (server-only) | transform | sich selbst | exact |
| `docs/PRODUCT-REGISTER.md` (ändern) | doc | – | sich selbst | exact |
| `components/feature-snippet/DeviceFrame.tsx` (ändern: „Zeit“ → „Zeiten“) | component | – | sich selbst Z. 11 | exact |
| `components/ui/MobileAppGallery.tsx` (ändern: Kennzeichnung, Original als WebP/AVIF) | component (client) | – | sich selbst | exact |
| `tests/pricing-parity.test.ts` (neu) | test | – | `tests/llms.test.ts`, `tests/seo-brand.test.ts` | exact |
| `tests/announcements.test.ts` (neu) | test | file-I/O | `tests/content.test.ts`, `tests/llms.test.ts` | role-match |
| `tests/product-register.test.ts` (ändern) | test | – | sich selbst | exact |
| `scripts/route-audit.mjs` (ändern: Ankündigungs-Check) | utility | request-response | sich selbst Z. 33 (`oldTrial`) | exact |
| **SEO (SEO-02/07/08)** |||||
| `scripts/keyword-research.mjs` (neu) | utility/Skript | request-response + file-I/O, batch | `scripts/indexnow-submit.mjs` | role-match |
| `docs/seo/data/<datum>/*.json` + `manifest.json` (neu) | Daten | – | `docs/seo/data/2026-10-20-*.json` | exact |
| `lib/keyword-map.ts` (neu, ggf. + `docs/seo/keyword-map.json`) | model/Datenmodul | – | `lib/comparison.ts` (Quellen + Prüfdatum), `lib/funktionen.ts` (Interfaces) | role-match |
| `docs/seo/KEYWORD-MAP.md` (neu) | doc | – | `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` | exact |
| `tests/keyword-map.test.ts` (neu) | test | – | `tests/content.test.ts` (Sitemap-Import) | exact |
| `scripts/se-ranking-sync.mjs` (neu, SEO-07) | utility/Skript | request-response (Project API/MCP) | `scripts/indexnow-submit.mjs` | partial |
| `docs/seo/BACKLINK-PLAN.md` + `docs/seo/backlink-register.json` (neu, SEO-08) | doc + Daten | – | `SE-RANKING-BEFUND` §4, `data/2026-10-20-backlink-gap.json` | role-match |
| `tests/backlink-plan.test.ts` (neu, SEO-08) | test | file-I/O | `tests/content.test.ts` (Metadatenprüfung) | role-match |
| **Designsystem v2 (DESIGN-02/04, MEDIA-03/04)** |||||
| `app/globals.css` (ändern: Tokens + `.v2-*`) | config/Style | – | sich selbst Z. 3-38 (`@theme`), 148-177 (`.btn-cta`) | exact |
| `components/v2/{SectionHeader,BentoGrid,StepFlow,KeyFacts,FeatureCard,ComparisonTable,FaqList,CtaBand,Badges,IllustrationLabel}.tsx` + `*.module.css` (neu) | component (RSC) | – | `components/ui/PageHero.tsx`, `TrialCta.tsx`, `Faq.tsx`, `app/vergleich/page.tsx:457-500` | role-match |
| `components/v2/{BrowserFrame,PhoneFrame,DevicePair}.tsx` + CSS (neu) | component (RSC) | – | `components/feature-snippet/DeviceFrame.tsx` + `.module.css` | exact |
| `components/v2/mini/*.tsx` (neu) | component | – | Szenen in `components/feature-snippet/IllustrationScene.tsx` | role-match |
| `components/v2/MediaFigure.tsx` (neu) | component | – | `app/gewerke/page.tsx:55-62`, `components/ui/GewerkIcon.tsx` | exact |
| `components/v2/budgets.ts` (neu) | config | – | `lib/site.ts` (`as const`-Konstanten) | role-match |
| `lib/styleguide-content.ts` (neu) | model/Datenmodul | – | `lib/snippet-examples.ts`, `lib/site.ts` | role-match |
| `app/styleguide/page.tsx` (neu) | page (RSC) | request-response (SSG) | `app/preise/page.tsx` | exact |
| `tests/styleguide.test.ts` (neu) | test | – | `tests/seo-brand.test.ts`, `tests/content.test.ts`, `tests/llms.test.ts` | exact |
| `tests/design-v2-budgets.test.ts` (neu) | test | – | `tests/calculator-hydration.test.ts` | exact |
| `tests/media-budget.test.ts` (neu) | test | file-I/O | – (RESEARCH-Beispiel) | none |
| `tests/e2e/design-v2.pw.cjs` (neu) | test e2e | – | `tests/e2e/function-illustrations.pw.cjs`, `scripts/visual-audit.mjs`, `scripts/performance-audit.mjs` | exact |
| `tests/e2e/playwright.config.cjs` (ändern: `testMatch`) | config | – | sich selbst Z. 7 | exact |
| `scripts/optimize-images.mjs` (neu) | utility | file-I/O, batch | – (Vorgehen dokumentiert in `docs/store-media-sources.md`) | none |
| `next.config.js` (optional: `X-Robots-Tag` für `/styleguide`) | config | – | sich selbst Z. 12-22 | exact |

---

## Pattern Assignments

### `scripts/sync-product-snapshot.mjs` (Skript, file-I/O)

**Analog:** `scripts/indexnow-submit.mjs` (ESM, Top-Level-`await`, deutsche Fehlermeldung + `process.exit(1)`), Ausgabe-Schreiben wie `scripts/route-audit.mjs:71-72`.

**Kopf-/Fehlermuster** (`indexnow-submit.mjs` Z. 1-3, 10-14):
```js
// Meldet alle Sitemap-URLs per IndexNow (Bing, Yandex u. a.). Nur nach einem erfolgreichen Deployment starten:
//   npm run indexnow
...
if (!keyFile.ok || (await keyFile.text()).trim() !== key) {
  console.error(`Schlüsseldatei ${keyLocation} fehlt oder stimmt nicht (HTTP ${keyFile.status}).`);
  process.exit(1);
}
```

**Datei schreiben** (`route-audit.mjs` Z. 71-72):
```js
await fs.mkdir("test-results", { recursive: true });
await fs.writeFile("test-results/routes.json", JSON.stringify(out, null, 2));
```

**Kernlogik:** RESEARCH „Code Examples → Snapshot-Skript“ (Z. 481-515) vollständig übernehmen: `execFileSync("git", ["-C", WEB, ...])`, ausschließlich `origin/release`, kein `git fetch`, Regex-Parser wirft bei fehlendem Feld. Optional zweiter Repo-Pfad `CRAFTOS_MOBILE_REPO` (`C:/Projekte/CraftOS - Mobile/craftos-mobile`) für Mobile-Commit/Tag. Als npm-Skript ergänzen analog `package.json` `"indexnow": "node scripts/indexnow-submit.mjs"` → `"sync:product": "node scripts/sync-product-snapshot.mjs"`.

---

### `docs/product-pricing-snapshot.json` (Daten)

**Analog:** `docs/product-source-snapshot.json` (Kopf `checkedAt`, dann Liste mit `repository`/`path`):
```json
{
  "checkedAt": "2026-09-09T01:17:21.654488+00:00",
  "files": [
    { "repository": "web", "path": "src/pages/Dashboard.tsx", "sha256": "dc5e…" },
```
Neues Format laut RESEARCH Z. 502-512: `source { repo, ref: "origin/release", tag, commit, readAt }`, `pricing {ADMIN_MONTHLY …}`, `vatRate`, `creditPackages[]`, `trialDays`, `netPrices`. Import in Tests per `import snapshot from "@/docs/product-pricing-snapshot.json"` (funktioniert, `resolveJsonModule: true`).

---

### `lib/site.ts` (Datenmodul, ändern)

**Analog: sich selbst.** Neue Felder im bestehenden Stil (`as const`, deutsche Bezeichner), Z. 26-27 und 66-71:
```ts
export const speicherPool = "50 GB Speicher-Pool pro Betrieb";
export const annualSavingPercent = 100 * (1 - 10 / 12);
...
export const creditPakete = [
  { preis: 10, bonus: 0, guthaben: 10 },
  { preis: 25, bonus: 10, guthaben: 27.5 },
  ...
] as const;
```
Ergänzen z. B. `export const extraSpeicher = { gb: 50, monat: 0.99, jahr: 9.9 } as const;` und `export const startCredits = 150;` (einmalig). `site.checkedAt` (Z. 17) auf `2026-10-20` setzen. Lizenzname vereinheitlichen („Voll-Lizenz“, „App-Lizenz“ – UI-SPEC „Begriffe“).

---

### `lib/llms.ts` (ändern) und `lib/schema.ts` (ändern)

**Analog `lib/llms.ts` Z. 6, 11-14, 25** – Formatierer und Ableitung aus `tarife`:
```ts
const euro = (value: number) => value.toFixed(2).replace(".", ",") + " €";
...
const lizenzen = tarife.map(
  (t) => `- ${t.name}: ${euro(t.monat)} netto pro Person und Monat oder ${euro(t.jahr)} im Jahr. ${t.fuer}.`,
);
...
`- Speicher: ${speicherPool}`,
```
Neue Zeilen für Extra-Speicher, Start-Credits und `creditPakete` im selben Stil **vor** dem ersten `## ` einfügen (Test `llms.test.ts:17-20` verlangt Fakten oberhalb der ersten Linksektion).

**`lib/schema.ts` Z. 34-42** – fester String ersetzen:
```ts
offers: {
  "@type": "Offer",
  name: "Voll-Lizenz inklusive Web-App und Mobile-App",
  price: "29.95",            // → tarife.find((t) => t.id === "voll")!.monat.toFixed(2)
  priceCurrency: "EUR",
```
Zusätzlich `priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", valueAddedTaxIncluded: false }` (RESEARCH Preis-Tabelle). Import `tarife` aus `./site` wie Z. 1.

---

### Preisstellen in Seiten (`components/home/Hero.tsx:40-41`, `app/preise/page.tsx:11,21,63-68`, `app/page.tsx:26`, `app/fakten-ueber-craftos/page.tsx:33,37`)

**Analog:** `components/preise/PricingTable.tsx` Z. 8-12 (Formatierer) und Z. 94 (Ableitung):
```ts
const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
...
{euro(annual ? tariff.jahr / 12 : tariff.monat)}
```
Bestand mit Literal (zu ersetzen), `Hero.tsx` Z. 40-41:
```tsx
Ab 24,96 € netto / Monat im Jahresabo (rund 17 % günstiger).
299,50 € jährlich.
```
`metadata`-Descriptions sind Strings (`pageMetadata(...)`) – Template-Literal mit `euro(voll.monat)` bauen. Hero-Text „Volllizenz inklusive Handy App“ (Z. 34) → „Voll-Lizenz“ (UI-SPEC Begriffe).

---

### Ankündigungen entfernen (PROD-04, D-12)

**Bestand `lib/funktionen.ts` Z. 666-683** (komplett entfernen, inkl. Alias `vision`):
```ts
export const upcomingFeatures = [
  { name: "Telefon-Agent", text: "…", when: "Geplant: September / Anfang Oktober 2026" },
  ...
];
export const vision = upcomingFeatures;
```
**Abhängige Stellen** (Imports/Renderings ebenfalls entfernen): `lib/product-register.ts:2` und `:142-147` (`upcoming: upcomingFeatures.map(...)`), `app/funktionen/page.tsx:63-84` (ganze `<section className="section-space bg-ink-100">` „Demnächst in CraftOS.“), `app/craft-ai/page.tsx:88-110`, `app/fakten-ueber-craftos/page.tsx:~98-104`, `app/vergleich/page.tsx:~525-545` (Roadmap-Raster, Anker `#ausblick`), `lib/comparison.ts:255-265`:
```ts
feature: "KI-Telefonempfang",
craftos: { text: "Angekündigt", detail: "Telefon-Agent geplant für September / Anfang Oktober 2026; …", href: "#ausblick" },
```
→ Zeile streichen oder CraftOS-Zelle neutral „Nein“ ohne `detail`/`href` (UI-SPEC Copywriting). `content/hilfe/craft-ai-betriebsdaten-fragen.md:43` Satz ohne Termin, `updatedAt` im Frontmatter anheben (`tests/content.test.ts:23` verlangt `updatedAt >= publishedAt`).
Typecheck (`npm run typecheck`) findet alle verbliebenen Importe von `upcomingFeatures`/`vision`.

---

### `lib/product-register.ts` (ändern)

**Analog: sich selbst.** `productBasis` Z. 4-19 auf Release-Struktur umstellen:
```ts
export const productBasis = {
  checkedAt: "2026-09-09",
  web: { branch: "main", head: "179cef55…", includesWorkingTree: true },
  mobile: { branch: "master", head: "9e6260d…", includesWorkingTree: true },
```
→ `{ ref: "origin/release", tag: "v4.0.0-test.238", commit: "07cf0645…" }` bzw. Mobile `mobile-v1.0.0-test.93` / `5610a064…`; Werte idealerweise aus `docs/product-pricing-snapshot.json` (`source`) lesen, damit Snapshot und Register nicht driften. Evidenz-Maps Z. 20-107 (`evidence`, `mobileEvidence`) um neue Belege aus RESEARCH Tabelle A/B ergänzen (z. B. `lager` Mobile `src/features/inventory/screens/InventoryScanScreen.tsx`). `availability` Z. 128 bleibt `tier`-gesteuert; `import "server-only"` (Z. 1) beibehalten.

---

### `components/feature-snippet/DeviceFrame.tsx` (ändern, MEDIA-03)

**Z. 11** – nur das Label ändern:
```tsx
<div className={s.tabs}>{[[CalendarDays, "Einsätze"], [Clock3, "Zeit"], [FolderOpen, "Projekte"], [MoreHorizontal, "Mehr"]].map(...
```
→ `"Zeiten"`. Danach `tests/e2e/function-illustrations.pw.cjs` auf „Zeit“-Erwartungen prüfen.

### `components/ui/MobileAppGallery.tsx` (ändern, MEDIA-03/04)

Z. 60-64 (Original-PNG 165/204 KB über Budget) und Z. 77-79 (Kennzeichnung):
```tsx
(original ? "-original.png" : "-display.webp")
...
{original ? "Originalaufnahme aus der aktuellen Mobile-App." : "Aktuelle Appaufnahme im Handy-Mockup."}{" "}
```
→ Original als `-original.webp`/`.avif` ≤ 150 KB (Ausgabe von `scripts/optimize-images.mjs`), Kennzeichnung „Darstellung“ + Aufnahmedatum statt „Aktuelle“. `width`/`height` (Z. 69-70) beibehalten.

---

### `tests/pricing-parity.test.ts` (neu)

**Analog:** `tests/llms.test.ts` (Import-Stil, `for … of` mit Fakten) und `tests/seo-brand.test.ts` (Schema-Prüfung).

**Imports/Struktur** (`llms.test.ts` Z. 1-16):
```ts
import { describe, it, expect } from "vitest";
import { buildLlmsTxt } from "@/lib/llms";
import { site } from "@/lib/site";

describe("llms.txt", () => {
  const text = buildLlmsTxt();
  it("states the brand and the core facts", () => {
    for (const fact of ["29,95 €", "9,95 €", "10 Tage"]) expect(text).toContain(fact);
```
**Schema-Prüfung** (`seo-brand.test.ts` Z. 18-23):
```ts
const app = softwareApplicationSchema();
expect(app.alternateName).toBe("CraftOS Handwerkersoftware");
```
Kernlogik: RESEARCH Z. 517-561 (inkl. `describe.skipIf(!fs.existsSync(WEB))` für den lokalen `origin/release`-Abgleich – im Repo noch nicht verwendet, ist aber Vitest-Standard). Testnamen dürfen deutsch sein (`tests/calculator-hydration.test.ts` nutzt deutsche `describe`/`it`).

---

### `tests/announcements.test.ts` (neu)

**Analog:** `tests/content.test.ts` (Node-`fs` im Test, Z. 2) und `tests/llms.test.ts` Z. 22-28 (Bedingung je Funktion):
```ts
it("lists available features but no announced ones", () => {
  for (const f of funktionen) {
    const url = `${site.url}/funktionen/${f.slug})`;
    if (f.tier === "heute") expect(text, f.slug).toContain(url);
    else expect(text, f.slug).not.toContain(url);
  }
});
```
Kernlogik: rekursiv `app/**`, `lib/**`, `content/**` (synchron `fs.readdirSync(…, { withFileTypes: true })` wie RESEARCH `walk` Z. 636-637) lesen und auf `/Geplant:|Demnächst|demnächst|(September|Oktober|November) 20\d\d/` sowie die Namen „Telefon-Agent“, „MCP-Server“, „Agent-Aktionen“ prüfen (Ausnahmen explizit begründen, z. B. Rechtstexte). Zweiter Fall: `buildLlmsTxt()` enthält keinen dieser Begriffe. Zweite Absicherung zur Laufzeit in `scripts/route-audit.mjs` (siehe unten).

---

### `tests/product-register.test.ts` (ändern)

**Analog: sich selbst** Z. 5-20:
```ts
const register = getProductRegister();
expect(register.features).toHaveLength(16);
for (const feature of register.features) {
  for (const platform of feature.platforms)
    expect(feature.evidence.some((item) => item.repository === platform), feature.slug + ": " + platform).toBe(true);
}
```
Ergänzen: `expect(register.basis.web.ref).toBe("origin/release")`, Tag/Commit-Format (`/^[0-9a-f]{40}$/`), und neuer `describe.skipIf(!fs.existsSync(WEB))("Belege …")` mit `execFileSync("git", ["-C", repo, "cat-file", "-e", `${commit}:${path}`])` je Evidenzpfad (Testname muss „Belege“ enthalten – VALIDATION nutzt `-t "Belege"`). `toHaveLength(16)` bleibt, solange keine Funktion dazukommt; `upcoming`-Feld entfällt.

---

### `scripts/route-audit.mjs` (ändern)

**Analog: sich selbst** Z. 27-34 und 78/91 (Prüfflag + Fehlerbedingung):
```js
results.push({ url, status: r.status, canonical, title, hasH1: /<h1\b/.test(body),
  oldTrial: /14 Tage (kostenlos|testen)/i.test(body),
});
...
if(results.some(x=>x.status!==200||!x.canonical||!x.hasH1||x.oldTrial)||badLinks.length||…)process.exitCode=1;
```
→ Flag `announcement: /Geplant:|Demnächst in CraftOS|(September|Oktober) 2026/.test(body)` analog `oldTrial` hinzufügen und in **beiden** Filterstellen (Z. 77-79 und Z. 91) aufnehmen. Optional Zusatzprüfung `/styleguide`: Status 200, `noindex` im HTML, nicht in `xml` enthalten (die Schleife iteriert nur Sitemap-URLs, RESEARCH Z. 346).

---

### `scripts/keyword-research.mjs` (neu, SEO-02)

**Analog:** `scripts/indexnow-submit.mjs` – `fetch` mit Timeout-Helfer, JSON-Body, Statusprüfung:
```js
const timeout = () => ({ signal: AbortSignal.timeout(15000) });
...
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
  ...timeout(),
});
console.log(`IndexNow: ${urlList.length} URLs gemeldet, HTTP ${res.status}`);
if (res.status >= 400) { console.error(await res.text()); process.exit(1); }
```
**Schlüssel laden (kein Analogon im Repo):** `.env` liegt im Repo-Root, Skript läuft in `craftos/` → `process.loadEnvFile("../.env")` (Node 24 eingebaut, kein `dotenv`), dann `process.env.SE_RANKING_API_KEY`; Header `Authorization: Token <Schlüssel>`; Basis `https://api.seranking.com/v1`. Schlüssel nie loggen, Request-Header nie in Rohdaten/Manifest schreiben.
**Muster aus RESEARCH:** Modi `plan` (nur Kostenschätzung, keine Aufrufe) und `run`; Seeds aus UTF-8-JSON-Datei mit `encodeURIComponent`; 1,6 s Pause, 429-Backoff (1/2/4 s); Cache „Datei existiert → kein Aufruf“; `limit` immer explizit; Filter in Klammernotation `filter[difficulty][to]=20`; vor großem Lauf `GET /v1/account/subscription`; Budget ≤ 30.000 Units (D-16).

---

### `docs/seo/data/<datum>/*.json` + `manifest.json` (neu)

**Analog:** bestehende Rohdaten `docs/seo/data/2026-10-20-*.json`. Struktur je Datei = unveränderte API-Antwort, z. B. `2026-10-20-keywords-seeds.json` (Array):
```json
{"is_data_found":true,"keyword":"hero software alternative","volume":10,"cpc":11.44,"difficulty":15,"intents":["I"],"competition":0.86,"history_trend":{…}}
```
und `2026-10-20-keyword-gap-plancraft.json` (Array, `keyword`, `volume`, `difficulty`, `intents`, `position`, `url`, `traffic`). Wichtig für den Map-Test: Reihenfolge `"keyword":…` vor `"volume":…` bleibt in Rohantworten erhalten (RESEARCH-Regex Z. 611 beruht darauf). Benennung: entweder Unterordner `data/2026-10-2x/` (RESEARCH) oder bestehendes Präfixschema `data/2026-10-2x-<endpunkt>-<seed>.json` – eines festlegen. `manifest.json`: je Datei Endpunkt, Parameter (ohne Schlüssel), Abrufzeit, geschätzte Units.

---

### `lib/keyword-map.ts` (neu)

**Analog:** `lib/comparison.ts` Z. 1-12 (Datenmodul mit Prüfdatum und Quellenobjekt) und `lib/funktionen.ts` Z. 21-53 (exportierte `type`/`interface`):
```ts
import { tarife } from "./site";

export const comparisonCheckedAt = "2026-09-09";
export const comparisonCheckedLabel = "9. September 2026";

export const comparisonSources = {
  craftnotePrices: { label: "Craftnote: Preise und Zusatzmodule", url: "https://craftnote.de/preise/" },
```
```ts
export type ProductPlatform = "web" | "mobile";
export interface Funktion { slug: string; name: string; tier: "heute" | "launch" | "vision"; … }
```
Typen und Feldnamen aus RESEARCH Z. 564-583 (`KeywordAssignment`, `KeywordMetric` mit `source { endpoint, file, fetchedAt }`, `primary: null` + `reason`, `target { title, h1, description }` als Zielwerte, D-14).
**Empfehlung (Ermessen):** Daten in `docs/seo/keyword-map.json` halten und in `lib/keyword-map.ts` typisiert importieren/exportieren. Grund: `scripts/se-ranking-sync.mjs` (reines Node-ESM) kann JSON direkt lesen; eine `.ts`-Datei mit `@/`-Imports wäre aus `.mjs` nicht ladbar. Alternativ `lib/keyword-map.ts` ohne Imports halten.

### `docs/seo/KEYWORD-MAP.md` (neu)

**Analog:** `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` – Kopfzeile „Quelle aller Zahlen: SE Ranking … Datenbank Deutschland (`source=de`), Stand …; Rohdaten unter `docs/seo/data/…`“, nummerierte `##`-Abschnitte, Tabellen `| Domain | Keywords | … |`. Inhalt: Methode, Tabelle je Pfad (Hauptkeyword, Vol./KD/Intent, Quelle), Lücken KD < 20 mit Zielphase 6–9 (D-07).

---

### `tests/keyword-map.test.ts` (neu)

**Analog:** `tests/content.test.ts` Z. 11, 37-39 – Sitemap direkt importieren und aufrufen:
```ts
import sitemap from "@/app/sitemap";
...
const list = await sitemap();
expect(list.every((x) => !(x.lastModified instanceof Date))).toBe(true);
```
Kernlogik: RESEARCH Z. 584-615 (Pfad-Normalisierung `new URL(e.url).pathname.replace(/\/$/, "") || "/"`, Keyword-Normalisierung ß/ä/ö/ü + Leerzeichen/Bindestriche, Rohdaten-Beleg je Zahl). Hinweis: `sitemap()` liest Content per `fs` – der Test läuft wie `content.test.ts` ohne Mock (cwd = `craftos/`). Erwartete URL-Zahl 125 (RESEARCH) – nicht hart kodieren, aus `sitemap()` ableiten.

---

### `scripts/se-ranking-sync.mjs` (neu, SEO-07; Name vom Planer zu bestätigen)

**Analog:** `scripts/indexnow-submit.mjs` (Fetch-/Fehlermuster, siehe oben) + Schlüssel-Laden wie `keyword-research.mjs`.
Modi: `--check` (nur lesen: Projekt-Keywords von Projekt 13094375 abrufen, mit Hauptkeywords + Zielseiten der Keyword-Map vergleichen, Abweichungen ausgeben, `process.exitCode = 1` bei Differenz – Stil `route-audit.mjs:91`) und `--apply` (fehlende hinzufügen/Zielseiten angleichen; nur nach ausdrücklicher Freigabe, Schreibzugriff auf Live-Konto). Zugang laut D-07a über `https://api.seranking.com/mcp` mit Header `X-Api-Key` aus `.env` oder MCP-Tools `mcp__se-ranking__*`. **Kein Analogon für MCP-JSON-RPC-Aufrufe im Repo** – Endpunkt-/Toolnamen vor der Umsetzung prüfen. Bestehender Fremdbegriff „craftview software gmbh“ bleibt unangetastet (Befund §6).

---

### `docs/seo/BACKLINK-PLAN.md` + `docs/seo/backlink-register.json` (neu, SEO-08)

**Analog:** `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` §4 (Z. 45-67, priorisierte Linkliste nach Art mit DR-Werten) und Rohdaten `data/2026-10-20-backlink-gap.json`:
```json
{"domain":"urls-shortener.eu","dr":66,"competitors":["plancraft.com","hero-software.de", …]}
```
Register-Eintrag (Ermessen): `{ domain, kategorie, dr, wettbewerberAnzahl, prioritaet, status: "offen"|"eingereicht"|"live"|"abgelehnt", browserPrompt, kosten, notiz, aktualisiert }`. Muss Grundsatz aus Befund Z. 67 übernehmen („Alle Einträge erfolgen durch den Inhaber … Keine gekauften Links, keine Linknetzwerke“). Browser-Prompts ohne Zugangsdaten.

### `tests/backlink-plan.test.ts` (neu, optional statt Doc-Check)

**Analog:** `tests/content.test.ts` Z. 18-35 (Metadaten jedes Eintrags prüfen):
```ts
for (const a of await getContentList(kind)) {
  expect(categories[kind][a.category]).toBeTruthy();
  expect(a.draft).toBe(false);
  expect(a.updatedAt >= a.publishedAt).toBe(true);
```
→ je Register-Eintrag: gültiger Status, nicht leerer `browserPrompt`, Domain eindeutig, keine Spam-Domains aus dem Gap-Rohsatz ohne Prüfvermerk.

---

### `app/globals.css` (ändern)

**Analog: sich selbst.** Tokens im **ersten** `@theme`-Block (Z. 3-38) anhängen, Namensschema `--color-*`, `--font-*`:
```css
@theme {
  --color-primary-50: #fff8e9;
  ...
  --font-display: var(--font-clash), system-ui, sans-serif;
  --font-sans: var(--font-general), system-ui, sans-serif;
```
Neue Tokens wörtlich aus UI-SPEC „Neue Tokens“ (`--radius-badge/tile/stage`, `--shadow-device(-dark)`, `--spacing-section(-md/-sm)`, `--color-line-warm`). `.v2-eyebrow` und `.v2-btn-cta` als eigener Block neben `.btn-cta` (Z. 148-169) – Bestandsklassen **nicht** ändern. Reduced-Motion-Regel Z. 370-381 bleibt Grundschutz:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```
Hinweis: Im ersten `@theme` ist `--color-ink-100: #f4f4f5`; RESEARCH nennt ein zweites `@theme`, das `ink-100` auf `#f7f3eb` überschreibt – Executor muss prüfen, welcher Wert gilt, bevor `ink-100` als „warm“ verwendet wird.

---

### `components/v2/*` – Abschnitts- und Inhaltsbausteine (neu, RSC)

**Analog Abschnittskopf/CTA:** `components/ui/PageHero.tsx` und `components/ui/TrialCta.tsx` (Server Component, benannter Export, Props inline typisiert, `site.ctaUrl`):
```tsx
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function TrialCta() {
  return (
    <section className="section-space dark-section">
      <div className="site-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        ...
        <a href={site.ctaUrl} className="btn-cta">
          Jetzt Ihren Betrieb anlegen <ArrowUpRight size={18} />
```
→ `CtaBand` gleiche Struktur, aber `.v2-btn-cta`, Props `title/text/secondary` (UI-SPEC §11). `href={site.ctaUrl}` beibehalten (Tracking über `classifyAppLink` in `components/Analytics.tsx`).

**Analog FAQ:** `components/ui/Faq.tsx` (native `details/summary`, `group-open:rotate-45`):
```tsx
<details key={item.q} className="group border-b border-ink-200">
  <summary className="flex list-none justify-between gap-6 py-6 font-semibold text-lg">
    <span>{item.q}</span>
    <span aria-hidden="true" className="group-open:rotate-45 text-primary-800 text-2xl">+</span>
```
→ `FaqList` mit Lucide `Plus` 20 px, 16/600, min. 48 px; `Faq.tsx` bleibt unverändert.

**Analog Vergleichstabelle:** `app/vergleich/page.tsx` Z. 457-475 + `Comparison.module.css` Z. 288-335:
```tsx
<div className={styles.tableScroll} role="region" aria-label="Funktionsvergleich …" aria-describedby="feature-scroll" tabIndex={0}>
  <table className={styles.featureTable}>
    <caption>Ausgewählte Funktionen · Stand {comparisonCheckedLabel}</caption>
    <thead><tr><th scope="col">Leistung</th> …</tr></thead>
    <tbody>{rows.map((row) => (<tr key={row.feature}><th scope="row">{row.feature}</th> …
```
```css
.tableScroll { max-width: 100%; overflow: auto; overscroll-behavior-x: contain; border: 1px solid #dedee3; border-radius: 12px; background: #fff; }
```
→ `ComparisonTable` generisch (UI-SPEC §7): Radius 16 px, `sticky` erste Spalte unter 768 px, `Check`/`Minus` mit `sr-only` „Ja“/„Nein“, kein „·“-Trenner in der Caption (UI-SPEC verbietet Mittelpunkt-Ketten).

**Analog Schrittfolge:** `.home-flow` in `globals.css` Z. 483-513 (Amber-Fläche, Linienfarbe `#77531155`, Text `#46381f`) – Farben übernehmen, Struktur neu als `<ol>` mit Sechseck-Knoten (UI-SPEC §3).

**Analog Datenableitung KeyFacts/Badges:** Werte aus `lib/site.ts` (`site.trialDays`, `tarife`) und `funktionen[].platforms` (Typ `ProductPlatform` aus `lib/funktionen.ts:21`); Formatierer wie `PricingTable.tsx:8-12`. Icons aus `lucide-react` wie in `lib/funktionen.ts:1-19`.

**CSS-Modul-Konvention:** Import `import s from "./X.module.css";` (Kurzname `s` in `feature-snippet/*`) bzw. `styles` (`MobileAppGallery`, `vergleich`) – einen Namen für `components/v2` festlegen.

---

### `components/v2/{BrowserFrame,PhoneFrame,DevicePair}.tsx` (neu, RSC)

**Analog:** `components/feature-snippet/DeviceFrame.tsx` + `DeviceFrame.module.css`.

**Phone-Struktur** (`DeviceFrame.tsx` Z. 5-18):
```tsx
export function PhoneFrame({ title, children, active = "Projekte", notification }: { … }) {
  return <div className={s.phone} data-illustration-platform="mobile" data-illustration-device="phone">
    <div className={s.screen} data-phone-screen>
      <div className={s.status}><span>09:41</span><i /><span><Signal size={10} /><Wifi size={10} /><BatteryFull size={13} /></span></div>
      <div className={s.mobileTitle}><ChevronLeft size={16} /><strong>{title}</strong><MoreHorizontal size={16} /></div>
      <div className={s.mobileContent}>{children}</div>
      <div className={s.tabs}>{[[CalendarDays, "Einsätze"], [Clock3, "Zeit"], …]}</div>
      <div className={s.homeIndicator} />
```
**Web-Struktur** (Z. 21-27): `windowBar` → `webTitle` (mit `.brand` „C“ – in v2 durch `CraftOSMark` aus `components/CraftOSLogo.tsx` ersetzen, wie `PageHero.tsx:1`) → `webContent`.
**CSS-Maße** (`DeviceFrame.module.css` Z. 4, 7, 14-17, 20):
```css
.phone { width: 194px; height: 410px; padding: 5px; border: 2px solid var(--color-ink-700); border-radius: 31px; background: var(--color-ink-950); … }
.screen { height: 100%; border-radius: 24px; overflow: hidden; background: var(--color-ink-50); display: flex; flex-direction: column; }
.tabs > span[data-active=true] { color: var(--color-primary-800); }
```
**Abweichungen für v2 (UI-SPEC §6):** Breite über `--phone-w` (160/194/240) mit `aspect-ratio: 194 / 410`; Browser `aspect-ratio: 16 / 10`; Tab „Zeiten“, Prop `activeTab` typisiert; `<figure>` + `<figcaption>` mit `sr-only`-Satz und `IllustrationLabel`; Mini-UI `aria-hidden="true"` + `inert`; `data-evidence={evidence}` statt nur `data-illustration-platform`; Schatten `var(--shadow-device)`. **Nicht übernehmen:** die Container-Query-Umschaltung mit `opacity: 0; visibility: hidden` (`DeviceFrame.module.css` Z. 32-46) – v2 ist statisch, `DevicePair` stapelt unter 768 px.

### `components/v2/mini/*` (neu)

**Analog:** Szenen-Inhalte in `components/feature-snippet/IllustrationScene.tsx` / `ConnectedScene.tsx` (fiktive Beispieldaten wie „Bäckerei Krause“, Schrift 8–13 px). Nur statische Elemente, keine `data-cursor-target`, keine Timeline (UI-SPEC §6 „Verboten“).

### `components/v2/MediaFigure.tsx` (neu)

**Analog:** `app/gewerke/page.tsx` Z. 55-62:
```tsx
<Image
  src="/images/werkstatt-2026.webp"
  alt="Tischlerin prüft ein Eichenbrett an einer Werkbank bei Tageslicht"
  width={1536}
  height={1024}
  className="rounded-2xl"
  sizes="(max-width:767px) 100vw, 50vw"
/>
```
→ Props `src/alt/width/height/sizes` Pflicht (UI-SPEC §9), `<figure>` + `<figcaption>` mit optionalem `IllustrationLabel kind="ki"`. `next.config.js:8-10` liefert bereits `formats: ['image/avif', 'image/webp']`.

### `components/v2/budgets.ts` (neu)

**Analog:** `lib/site.ts` – exportierte Konstante `as const`. Werte 1:1 aus UI-SPEC-Tabelle „Textbudgets“ (`TEXT_BUDGET.sectionHeader.title = 60` usw.).

### `lib/styleguide-content.ts` (neu)

**Analog:** `lib/snippet-examples.ts` (typisierte Beispieldaten, Interfaces + `export const`):
```ts
export interface OfferPosition { title: string; quantity: number; unit: string; unitPriceCents: number; }
...
export const defaultOfferPositions: OfferPositions = [
  { title: "Wand streichen", quantity: 35, unit: "m²", unitPriceCents: 1050 },
```
Inhalte der Blöcke 2–13 aus UI-SPEC „Musterseite“ und „Copywriting“; Zahlen nicht als Literal, sondern aus `site`/`tarife`/Snapshot ableiten (z. B. `value: euro(voll.monat)`, `source: "tarife.voll.monat"`).

---

### `app/styleguide/page.tsx` (neu)

**Analog:** `app/preise/page.tsx` Z. 1-13 (Imports, `pageMetadata`, `PageHero`):
```tsx
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Preise: Voll-Lizenz inklusive Mobile-App",
  "CraftOS Voll-Lizenz …",
  "/preise",
);
```
→ wie RESEARCH Z. 617-627: `export const metadata: Metadata = { ...pageMetadata("Designbausteine v2", "Interne Musterseite der CraftOS-Website.", "/styleguide"), robots: { index: false, follow: false } };`. `pageMetadata` (`lib/metadata.ts`) setzt `alternates.canonical` – bei noindex unschädlich. **Kein** `JsonLd` (Gegenbeispiel `app/preise/page.tsx` nutzt `JsonLd` + `faqSchema`). Nicht in `app/sitemap.ts` (`pages`-Liste Z. 12-28), nicht in `lib/llms.ts`, nicht in `app/robots.ts` (`disallow` bleibt nur `/api/`).

---

### `tests/styleguide.test.ts` (neu)

**Analog:** `tests/seo-brand.test.ts` Z. 2, 7-10 (Seitenmetadaten importieren):
```ts
import { metadata } from "@/app/page";
...
expect(metadata.title).toBe("CraftOS – Handwerkersoftware für Büro & Baustelle");
```
→ `import { metadata } from "@/app/styleguide/page"; expect(metadata.robots).toMatchObject({ index: false, follow: false });`
Plus `sitemap()` wie `content.test.ts:38` (`expect(list.some((e) => e.url.endsWith("/styleguide"))).toBe(false)`), `buildLlmsTxt()` wie `llms.test.ts:9` (kein `/styleguide`), `robots()` aus `@/app/robots` (kein Disallow für `/styleguide`). MEDIA-03-Fälle: `lib/styleguide-content.ts` nennt nur Slugs mit `tier === "heute"`; jede `evidence` kommt in `getProductRegister().features[].evidence` vor; KeyFacts-Werte = formatierte Quellwerte.

### `tests/design-v2-budgets.test.ts` (neu)

**Analog:** `tests/calculator-hydration.test.ts` Z. 1-23 – Server-Rendering ohne JSX in `.ts`:
```ts
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NumberField, VatFields } from "../components/calculators/CalculatorFields";
...
const html = renderToString(createElement(NumberField, { label: "…", value: "500", unit: "€", onChange: () => {} }));
const input = html.match(/<input\b[^>]*>/)?.[0];
```
→ Budgetprüfung der Strings aus `lib/styleguide-content.ts` gegen `TEXT_BUDGET` (Fehlermeldung wörtlich aus UI-SPEC „Textbudget überschritten: {Baustein}.{Feld} hat {n} von {max} Zeichen – Satz kürzen.“); per `renderToString` prüfen, dass Rahmen `data-evidence`, `aria-hidden`, `inert` und die Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“ rendern und Tab-Texte „Einsätze, Zeiten, Projekte, Mehr“ lauten. Achtung: CSS-Module-Importe in Komponenten – `calculator-hydration` beweist, dass Vitest Komponenten mit CSS-Modulen rendern kann, falls `CalculatorFields` eines nutzt; sonst `css.modules` in `vitest.config.ts` prüfen.

### `tests/media-budget.test.ts` (neu)

**Kein Analogon im Repo.** RESEARCH Z. 629-648 übernehmen (`walk("public")`, `LIMIT = 150 * 1024`, `EXCEPT` mit Begründung). Wegen D-15 (ungenutzte große Dateien bleiben in `public/`) **nicht** alle Dateien prüfen, sondern nur ausgelieferte: Liste aus Code-Referenzen ermitteln (Regex über `app/`, `components/`, `lib/`, `content/` auf `"/images/…"`/`"/icons/…"`) oder explizite Allowlist; PWA-Icon `icons/icon-1024x1024.png` als begründete Ausnahme.

---

### `tests/e2e/design-v2.pw.cjs` (neu)

**Analog Datei-Kopf:** `tests/e2e/browser-functional.pw.cjs` Z. 1-2 (CommonJS, eslint-Ausnahme, `CRAFTOS_PLAYWRIGHT_PATH`):
```js
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
```
**Netz-Isolation** (`function-illustrations.pw.cjs` Z. 162-165):
```js
test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})
```
**Reduced Motion + Breitenmatrix** (`function-illustrations.pw.cjs` Z. 417-433):
```js
test('…bei 360, 390, 768, 1024 und 1440 Pixeln', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, '…')
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    …
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
```
**Ohne JavaScript** (`function-illustrations.pw.cjs` Z. 455-469): `browser.newContext({ javaScriptEnabled: false, … })` – nutzen, um zu belegen, dass alle Bausteine im Server-HTML sichtbar sind.
**axe** (`scripts/visual-audit.mjs` Z. 2, 76-79):
```js
import AxeBuilder from "@axe-core/playwright";
...
(await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations
```
→ in `.cjs`: `const AxeBuilder = require('@axe-core/playwright').default`; nur `serious`/`critical` als Fehler werten.
**CLS** (`scripts/performance-audit.mjs` Z. 31-39) per `page.addInitScript` + `PerformanceObserver({ type: "layout-shift", buffered: true })`, Summe ohne `hadRecentInput` = 0.
Testnamen müssen die VALIDATION-Greps treffen: „styleguide“, „reduzierte Bewegung“, „Budget“. Animationsprüfung: `document.getAnimations().length === 0` nach Laden (UI-SPEC Bewegung).

### `tests/e2e/playwright.config.cjs` (ändern)

**Z. 7:**
```js
testMatch: ['browser-functional.pw.cjs', 'function-illustrations.pw.cjs', 'navigation.pw.cjs'],
```
→ `'design-v2.pw.cjs'` ergänzen (RESEARCH Pitfall 3). Projekte `*-1440` / `*-390-touch` (Z. 23-26) gelten automatisch.

---

### `scripts/optimize-images.mjs` (neu, MEDIA-04)

**Kein Code-Analogon im Repo** (frühere Sharp-Konvertierung ist nur dokumentiert: `docs/store-media-sources.md` „mit Sharp als WebP gespeichert: Qualität 92, effort 6, smartSubsample“). Skriptform wie `indexnow-submit.mjs` (ESM, Top-Level-`await`, Konsolenzusammenfassung). `import sharp from "sharp"` nutzt die transitive 0.35.4 (keine Installation). Ziel: AVIF (~q60) und WebP (~q75), Breite ≤ 1600 px, ≤ 150 KB; Ausgaben für `mobile/current/*-original.*`, `werkstatt-2026`, `team-baustelle-2026`. Herkunft in `docs/MEDIA.md` dokumentieren. D-15: Originale nicht löschen.

### `next.config.js` (optional)

**Z. 12-22** – zusätzlicher Eintrag im `headers()`-Array:
```js
async headers() {
  return [
    { source: '/(.*)', headers: [ { key: 'X-Content-Type-Options', value: 'nosniff' }, … ] },
  ]
},
```
→ `{ source: '/styleguide', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }`.

---

## Shared Patterns

### Daten aus Modulen, nie Literale
**Quelle:** `lib/llms.ts` Z. 1 („Erzeugt /llms.txt aus denselben Daten wie die Website, damit Preise und Seiten nie auseinanderlaufen.“), `lib/site.ts`, `components/preise/PricingTable.tsx:8-12`
**Gilt für:** alle Preis-, Credit-, Speicher- und Testphasenangaben in Seiten, Schema, llms.txt, `KeyFacts`, `ComparisonTable`, `FaqList`-Antworten der Musterseite.

### Lokale Skripte (Node 24 ESM)
**Quelle:** `scripts/indexnow-submit.mjs`, `scripts/route-audit.mjs`
**Gilt für:** `sync-product-snapshot.mjs`, `keyword-research.mjs`, `se-ranking-sync.mjs`, `optimize-images.mjs`
Muster: Kopfkommentar mit Aufruf, Top-Level-`await`, `fetch` + `AbortSignal.timeout`, deutsche Fehlermeldungen, `process.exit(1)` bzw. `process.exitCode = 1`, Ergebnis-JSON per `fs.writeFile(…, JSON.stringify(x, null, 2))`, Umgebungsvariablen mit Default (`process.env.AUDIT_ORIGIN || "http://localhost:3101"`). Für Repos: `process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy"`. Geheimnisse: nur `process.env.SE_RANKING_API_KEY`, nie ausgeben.

### Tests: Vitest in Node, nur `.ts`
**Quelle:** `vitest.config.ts`, `tests/llms.test.ts`, `tests/calculator-hydration.test.ts`
Imports über `@/…`; Assertion-Nachricht als zweites `expect`-Argument (`expect(x, f.slug)`); Komponenten via `createElement` + `renderToString`; lokale, repoabhängige Prüfungen mit `describe.skipIf(!fs.existsSync(repo))`. Keine Netzaufrufe (globale Regel 5).

### E2E: CommonJS, Netz-Isolation, Reduced Motion
**Quelle:** `tests/e2e/function-illustrations.pw.cjs` Z. 162-165, 417-433; `playwright.config.cjs`
Jede neue E2E-Datei: eslint-Kopf, `require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')`, `beforeEach` mit Origin-Filter, Eintrag in `testMatch`.

### Barrierefreiheit und Semantik
**Quelle:** `app/vergleich/page.tsx:457-475` (`role="region"`, `tabIndex={0}`, `caption`, `scope`), `components/ui/Faq.tsx` (`details/summary`, `aria-hidden` für Symbol), `Comparison.module.css:9-13` (Fokusring `3px solid`, `outline-offset`)
**Gilt für:** alle `components/v2/*`.

### Kennzeichnung von Darstellungen
**Quelle:** `components/feature-snippet/FeatureSnippet.tsx` Z. 111 („Animiertes Funktionsbeispiel mit fiktiven Daten. Die Darstellung ist vereinfacht …“), `MobileAppGallery.tsx` Z. 76-81 (`figcaption`)
**Gilt für:** `BrowserFrame`, `PhoneFrame`, `DevicePair`, `MediaFigure` (feste Texte aus UI-SPEC §9).

### Bewegung nur als Zusatz
**Quelle:** `FeatureSnippet.tsx` Z. 34 (`useState(true)` für `reduced` → SSR zeigt Endzustand), `globals.css` Z. 370-381
**Gilt für:** alle v2-Bausteine (in Phase 5 ausschließlich Hover-Übergänge 150–180 ms, keine Client-Komponenten nötig).

---

## Kein Analogon gefunden

| Datei | Rolle | Datenfluss | Grund / Ersatzquelle |
|---|---|---|---|
| `tests/media-budget.test.ts` | test | file-I/O | Kein Test liest bisher `public/`; RESEARCH Z. 629-648 verwenden, Allowlist wegen D-15 |
| `scripts/optimize-images.mjs` | utility | batch file-I/O | Sharp-Nutzung nur dokumentiert (`docs/store-media-sources.md`), kein Skript im Repo |
| `.env`-Laden in `keyword-research.mjs` / `se-ranking-sync.mjs` | utility | config | Kein Skript liest bisher `.env`; `process.loadEnvFile("../.env")` (Node 24) |
| MCP-/Project-API-Aufrufe in `scripts/se-ranking-sync.mjs` | utility | request-response | Kein SE-Ranking-Code im Repo; Endpunkte/Toolnamen vor Umsetzung gegen `https://api.seranking.com/mcp` bzw. MCP-Werkzeuge prüfen |

## Metadaten

**Durchsuchter Bereich:** `craftos/scripts`, `craftos/tests` (+ `e2e`), `craftos/lib`, `craftos/components/{ui,feature-snippet,preise,home}`, `craftos/app/{funktionen,preise,vergleich,gewerke,llms.txt}`, `craftos/app/{globals.css,sitemap.ts,robots.ts}`, `craftos/docs`, `craftos/docs/seo/data`, `craftos/{tsconfig.json,vitest.config.ts,next.config.js,package.json}`
**Gescannte Dateien:** ~45
**Datum:** 2026-10-20
