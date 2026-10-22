# Phase 8: SEO und KI-Sichtbarkeit – Pattern Map

**Mapped:** 2026-10-22
**Files analyzed:** 78 (31 neu, 47 geändert; die ~22 `opengraph-image.tsx` als eine Gruppe, Seiten-Metadaten der Bestandsrouten als eine Gruppe gezählt)
**Analogs found:** 74 / 78 (ohne direktes Vorbild: `scripts/lib/seo-audit-core.mjs` als reine Prüfbibliothek nur teilweise, `components/v2/FitPanels.tsx` teilweise, `docs/seo/ai-prompts-targets.json` teilweise, HERO-Screenshot-Beleg ohne Vorbild)

Alle Pfade relativ zu `C:/Projekte/Websitenerstellung/craftos/`. Zeilenangaben beziehen sich auf den Stand von Commit `cbc5f6a` (Code identisch mit `126f807`, Phase-7-Rollout). Muster, die bereits in `07-PATTERNS.md` beschrieben sind (Abschnitts-Wrapper `Abschnitt`, `SURFACE`, CTA/Tracking, Budgetprüfung beim Rendern, `renderToString`-Tests, Kurzform-Belege `site:`/`register:`, Server-Components-Regel, E2E-Kopf mit `severeAxe`/externer Request-Sperre), werden hier **nur referenziert**, nicht wiederholt.

**Leitgedanke:** Phase 7 hat für fast jede Rolle dieser Phase das direkte Vorbild geliefert. Jede neue Seite ist „`/app` ohne Visual“: `app/app/page.tsx` (Seite + `zielwerte()`-Metadaten) + `lib/app-content.ts` (Inhaltsmodul) + `FunktionsKopf` (Kopf, um G1 erweitert). Die Alternativen-Vorlage ist „`FunktionsDetail` für Wettbewerber“. Der Post-Build-Audit ist „`live-check.mjs` gegen `.next/server/app/**/*.html` statt gegen HTTP“. Die Wettbewerbermodule sind „`lib/comparison.ts` mit Provenienz je Angabe“.

---

## File Classification

### Neue Dateien

| Neue Datei | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `lib/wettbewerber/types.ts` | model (Typen) | – | `lib/funktionsdetails/types.ts:1–60` (JSDoc-Budget je Feld, clientneutral) | exact |
| `lib/wettbewerber/{plancraft,craftnote,hero,tooltime}.ts` | content/data-Modul | transform (Fakten + Quelle + Datum) | `lib/comparison.ts:1–70` (`comparisonSources`, Cent-Beträge), Kopf `lib/app-content.ts:1–39` | exact |
| `lib/wettbewerber/index.ts` | builder/utility | transform (Fakten → Tabellenzeilen, Stand, `monatAusJahr`, Prüfungen) | `lib/funktionsdetails/index.ts:1–33, 99–130` (`zielwerte`, Wortliste, `ersteDoppelung`) | exact |
| `lib/seo-meta.ts` (`metaFor(path)`) | utility (server-only) | transform (keyword-map → Metadata) | `lib/funktionsdetails/index.ts:102–120` (`zielwerte`, `MARKE`) | exact (Verschiebung + Verallgemeinerung) |
| `lib/breadcrumbs.ts` (`crumbsFor(path, current?)`) | utility | transform (Pfad → Kette) | Bestandsketten `ContentIndex.tsx:101–106`, `ArticlePage.tsx:170–175`, `FunktionsDetail.tsx:133–139`, `app/app/page.tsx:136–141`; Fehlermuster `zielwerte()` | exact |
| `components/v2/Breadcrumbs.tsx` + `.module.css` | component (RSC) | request-response (statisch) | `components/calculators/CalculatorPage.tsx:21–37` (sichtbare Kette, `aria-current`), Budget-Muster `SectionHeader.tsx:28–31` | role-match |
| `components/v2/FitPanels.tsx` + `.module.css` | component (RSC) | transform | `components/funktionen/PlattformRollen.tsx` (zwei Panels, Rahmen, Budget-Asserts; siehe 07-PATTERNS), `KeyFacts.tsx:27–45` (Assert-Reihenfolge) | partial |
| `components/v2/FactList.tsx` + `.module.css` | component (RSC) | transform | `components/v2/KeyFacts.tsx` (`<dl>` + `<dt>/<dd>`, Count-Assert) | exact |
| `components/vergleich/AlternativePage.tsx` | component (sync RSC, Vorlage) | request-response | `components/funktionen/FunktionsDetail.tsx` (ganze Datei) | exact |
| `app/vergleich/{plancraft,craftnote,hero,tooltime}-alternative/page.tsx` | route (dünn) | request-response | `app/app/page.tsx:34–36` (Metadaten) + `app/funktionen/[slug]/page.tsx:24–28` (dünne Seite) | exact |
| `app/vergleich/handwerkersoftware-kleine-betriebe/page.tsx` | page (RSC) | request-response | `app/app/page.tsx` (ganze Datei) | exact |
| Inhaltsmodule je Umbauseite (Name nach Ermessen, z. B. `lib/seiten/{preise,vergleich,kleine-betriebe,fakten,craft-ai,gobd}.ts`) | content-Modul | transform | `lib/app-content.ts` (Abschnitts-IDs, Flächen, FAQ, KeyFacts) | exact |
| `opengraph-image.tsx` je Segment (~22 Dateien) | route handler (Metadata Route) | file-I/O (Build-Zeit PNG) | `app/blog/[slug]/opengraph-image.tsx` (14 Zeilen) | exact |
| `docs/seo/ai-prompts-targets.json` | config/Daten | – | Eintragsform `docs/seo/keyword-map.json` (Pfad + Status/Phase); Prompt-IDs aus `docs/seo/data/2026-10-22-ai-tracker-prompts.json` | partial |
| `scripts/seo-audit.mjs` | script (CLI) | batch (Build-HTML lesen) | `scripts/live-check.mjs:36–52, 136–164` (`report`/`check`, `headTags`, `jsonLd`, `findType`), `scripts/route-audit.mjs` (Ergebnisdatei, `process.exitCode`) | exact |
| `scripts/lib/seo-audit-core.mjs` | utility (reine Funktionen) | transform | `scripts/lib/se-ranking-sync-core.mjs` (reine Kernfunktionen, von Vitest importiert), Helfer aus `live-check.mjs:126–164` | role-match |
| `tests/seo-audit-core.test.ts` | test (Vitest) | batch (Fixtures) | `tests/se-ranking-sync.test.ts:1–6` (Import aus `../scripts/lib/*.mjs`) | exact |
| `tests/wettbewerber.test.ts` | test (Vitest) | batch | `tests/announcements.test.ts` (Walk + Treffer-Liste), `tests/pricing-parity.test.ts:101–125` (Literal-Scan) | exact |
| `tests/ai-prompts.test.ts` | test (Vitest) | batch | `tests/keyword-map.test.ts:66–73, 142–155` (Sitemap-Abgleich) | exact |
| `tests/breadcrumbs.test.ts` | test (Vitest) | batch | `tests/funktionskopf.test.ts:1–60` (renderToString eines Bausteins, `decode`/`text`/`count`) | exact |
| `tests/vergleich-seiten.test.ts` (Alternativen, kleine Betriebe, `/vergleich`) | test (Vitest) | batch | `tests/app-seite.test.ts` + `tests/funktionsdetails.test.ts:1268–1290` | exact |
| `tests/e2e/vergleich.pw.cjs` | test (Playwright) | E2E | `tests/e2e/funktionsdetails.pw.cjs:41–160` (`severeAxe`, `measureKopf`, Fold, CLS) | exact |
| `docs/releases/PHASE-08-ROLLOUT.md` | Doku | – | `docs/releases/PHASE-07-ROLLOUT.md` | exact |

### Geänderte Dateien

| Geänderte Datei | Role | Data Flow | Analog / Muster | Match Quality |
|---|---|---|---|---|
| `components/funktionen/FunktionsKopf.tsx` + `.module.css` (G1) | component | – | Bestand `:12–58` (Props, Asserts), `.module.css` Klassen `.lead`, `.actions`, `.product` | exact |
| `components/v2/SectionHeader.tsx` (G2) | component | – | Bestand `:18–41` | exact |
| `components/v2/ComparisonTable.tsx` (G3) | component | – | Bestand `:20–98` | exact |
| `components/v2/FaqList.tsx` (`answerMax`) | component | – | Bestand `:20–30` | exact |
| `components/v2/KeyFacts.tsx` (Quellen-Kurzform für Wettbewerberwerte, C9) | component | – | Bestand `:16–17, 35–39` | exact |
| `components/v2/budgets.ts` | utility | – | Bestand `:7–40` | exact |
| `lib/og.tsx` (`pageOg`, `OG_SIZE`, `OgKind`) | utility | file-I/O | Bestand `articleOg` `:1–39` + Logo-Zeile `app/opengraph-image.tsx:26–47` | exact |
| `app/opengraph-image.tsx` | route handler | file-I/O | wird auf `pageOg({ title, kind: "Handwerkersoftware" })` reduziert (Muster Blog-OG) | exact |
| `app/{blog,hilfe}/[slug]/opengraph-image.tsx` | route handler | file-I/O | + `generateStaticParams` (Research Pattern 3) | exact |
| `lib/metadata.ts` | utility | – | Bestand `:3–33` (`imagePath`) | exact |
| `lib/schema.ts` (`organizationSchema`) | utility | transform | Bestand `:6–20`, `sameAs`-Muster `:35` | exact |
| `lib/site.ts` (`vertrag`, `monatAusJahr`) | model | – | Bestand `:18–30` (kommentierte Konstanten mit Quelle) | exact |
| `lib/llms.ts` | utility | transform | Bestand `:16–17, 63–68` (`link()`, Abschnitt „Preise und Vergleich“) | exact |
| `app/sitemap.ts` | config | – | Bestand `:8–17, 23–39` | exact |
| `components/layout/Footer.tsx` | component | – | Bestand `:4–32` (`columns`) | exact |
| `lib/funktionsgruppen.ts:285` (Mega-Menü-Link „Warum CraftOS?“) | model | – | Bestand | exact |
| `app/preise/page.tsx` | page | request-response | `app/app/page.tsx` | exact |
| `app/vergleich/page.tsx` (+ Löschen `Comparison.module.css`, `ProviderLogo.tsx`) | page | request-response | `app/app/page.tsx` | exact |
| `app/fakten-ueber-craftos/page.tsx`, `app/craft-ai/page.tsx`, `app/gobd/page.tsx` | page | request-response | `app/app/page.tsx` | exact |
| `lib/comparison.ts` (ablösen/löschen), `public/images/brands/{craftnote.png,plancraft.svg}` (löschen) | data/asset | – | – | – |
| `components/funktionen/FunktionsDetail.tsx`, `app/app/page.tsx`, `app/funktionen/page.tsx`, `app/gewerke/[slug]/page.tsx`, `components/content/{ArticlePage,ContentIndex}.tsx`, `components/calculators/CalculatorPage.tsx`, `app/rechner/{stundensatz,angebotskalkulation}/page.tsx` | component/page | – | `breadcrumbSchema`/Inline-`@graph` → `<Breadcrumbs>` | exact |
| Metadaten aller Bestandsrouten (`app/{gewerke,blog,hilfe,support,rechner,agb,datenschutz,impressum}/**`, `app/{blog,hilfe}/kategorie/[category]/page.tsx`, `app/{blog,hilfe}/[slug]/page.tsx`) | route | – | `app/funktionen/[slug]/page.tsx:16–22` (`zielwerte` → `pageMetadata`) | exact |
| `lib/gewerke.ts` (`heroTitle`/`seoTitle`/`seoDescription`, D-17) und Frontmatter `content/{blog,hilfe}/*.md` (nur H1-Fälle, D-17) | content | – | Bestand | exact |
| `docs/seo/keyword-map.json`, `docs/seo/KEYWORD-MAP.md`, `docs/seo/keyword-seeds.json` | config | – | Bestand (Eintrag `/vergleich/*-alternative` `:3860–3985`) | exact |
| `docs/DESIGN-V2.md` (§ 12 markieren, § 17 neu) | Doku | – | §§ 12–16 | exact |
| `scripts/route-audit.mjs`, `scripts/live-check.mjs`, `scripts/visual-audit.mjs`, `scripts/performance-audit.mjs` | script | request-response | jeweils Bestand | exact |
| Schutz- und Bestandstests (Tabelle „Hart kodierte Tests und Skripte“) | test | – | jeweils Bestand | exact |

---

## Pattern Assignments

### `lib/wettbewerber/types.ts` (model)

**Analog:** `lib/funktionsdetails/types.ts:1–60` – Kopfkommentar mit Vertragsverweis, nur `import type`, JSDoc-Budget je Feld, exportierte Konstanten-Budgets (`PANEL_BUDGET :31–37`).

```ts
/**
 * Inhaltstypen der Funktionsdetailseiten (07-UI-SPEC „Vorlage Detailseite“; D-02, D-03, D-04).
 * Inhalte sind Daten statt JSX-Texte; der Builder in lib/funktionsdetails/index.ts prüft alle Budgets, …
 * Typ-Importe aus server-only-Modulen werden beim Übersetzen entfernt; diese Datei bleibt clientneutral.
 */
import type { LucideIcon } from "lucide-react";
…
export const PANEL_BUDGET = { zusatz: 40, satz: 90, kundenHinweis: 90, rollen: { min: 0, max: 4 }, lizenzen: { min: 1, max: 2 } } as const;
```

**Inhalt laut Research Pattern 1 und UI-SPEC § 3.2/U3/U11:** `Quelle { label; url }`, `Fakt<T> { wert; quelle; abgerufenAm; zitat? }`, `Wettbewerber` mit `slug`-Union, `name` (Anbieterschreibweise U8), `stand`, `testphaseTage: Fakt<number>` (Zahl, kein Satz – Pitfall 1), `laufzeit`, `preise` (Cent-Felder wie `lib/comparison.ts:51–56` „Centbeträge vermeiden Rundungsunterschiede“), Preisfelder `stattPreis`/`ersterJahrespreis`/`regulaerDerzeit` (U3, P4), `kriterien`, `staerken: Fakt<string>[]` (U6), `hero.preiseBelegt = { screenshotMonatlich; screenshotJaehrlich; datum } | null` (U11/D-16). Typen clientneutral halten (kein `server-only`), weil `AlternativePage` sie nutzt.

---

### `lib/wettbewerber/{plancraft,craftnote,hero,tooltime}.ts` (data-Modul)

**Analog 1 – Quellenobjekte:** `lib/comparison.ts:6–49` (Label + https-URL je Quelle, `as const`, Schlüsseltyp):
```ts
export const comparisonSources = {
  craftnotePrices: {
    label: "Craftnote: Preise und Zusatzmodule",
    url: "https://craftnote.de/preise/",
  },
  …
} as const;
export type ComparisonSourceId = keyof typeof comparisonSources;
```
→ je Modul eine lokale `QUELLEN`-Konstante, jede `Fakt`-Instanz verweist darauf; `abgerufenAm` je Fakt (D-04). Hilfeartikel-Quellen (`craftnoteTerms`, `craftnoteLicenses`, HTTP 403) **nicht** übernehmen (Research Craftnote N2/N5).

**Analog 2 – Preise in Cent:** `lib/comparison.ts:51–68` (`monthlyEquivalentCents: 4990`, `note`). Statt freiem `note`-Text mit Zahlen („Aktionspreis statt 69,90 €“) die Felder `stattPreis`/`ersterJahrespreis` nutzen (U3, Wortliste „Aktionspreis“).

**Analog 3 – Kopfkommentar:** `lib/app-content.ts:1–10` (Quellen, Literalregel, Testdatei nennen). Hier: „Alle Angaben mit Quelle (offizielle Herstellerseite) und Abrufdatum; Zahlen nur als Felder, Sätze per Vorlage (Pitfalls 1, 2, 6); keine Ankündigungen (U9). Tests: tests/wettbewerber.test.ts.“

**Achtung Literal-Scans:** Testphasen-Scan `tests/pricing-parity.test.ts:137–139` erfasst `lib/**` – „7 Tage“, „14 Tage“, „30 Tage“ als Text im Modul schlagen an, sobald im selben Satz „test|kostenlos|ohne zahlungs“ steht; daher `testphaseTage: { wert: 7, … }` und Zitatfelder ohne Tageszahl. Entscheidung D-23: Ausnahme `lib/wettbewerber/` im Scan (siehe Tabelle Schutztests).

---

### `lib/wettbewerber/index.ts` (builder/utility)

**Analog:** `lib/funktionsdetails/index.ts`.

**Kopf** (`:1–16`): `import "server-only";` nur, wenn das Modul serverseitig bleibt – die Seiten sind Server Components, also möglich; Vitest löst `server-only` per Alias auf `tests/server-only.ts` auf (07-PATTERNS).

**Wortliste + Prüfung** (`:99–100`):
```ts
/** Überclaims (Pitfall 7/8, D-20, D-23); Vergleich ohne Groß-/Kleinschreibung. */
const VERBOTENE_WOERTER = ["lückenlos", "vollständig offline", "Online-Banking", "Bauphase"] as const;
```
→ `UWG_WORTLISTE` laut UI-SPEC U7 (mit Wortgrenzen `\b…\b`, damit „Umsatzsteuer“/„Steuerberatung“ nicht treffen) als **exportierte** Konstante, damit `tests/wettbewerber.test.ts` sie über alle Vergleichs-, Preis- und Kleine-Betriebe-Texte laufen lässt.

**Fehler mit Abhilfe** (`:105–112`):
```ts
if (!eintrag || !target?.title || !target.h1 || !target.description) {
  throw new Error(
    `Keyword-Map: ${path} hat keine Zielwerte – target.title, target.h1 und target.description ergänzen.`,
  );
}
```
→ Fehlertexte wörtlich aus UI-SPEC „Copywriting Contract“: „Wettbewerber {slug}: Angabe {feld} ohne quelle oder abgerufenAm – im Datenmodul ergänzen.“, „HERO-Preise ohne Screenshot-Beleg – Variante B ohne Zahlen rendern (D-16).“, „Vergleichstext enthält ‚{wort}‘ – sachlich formulieren (UWG-Wortliste).“; Altersprüfung nur `console.warn` mit „… ist älter als 60 Tage …“ (D-04).

**`monatAusJahr()`** (UI-SPEC § 3.4 F1): `Math.round(summeJahrCent / 12)` – gemeinsamer Helfer für Tabelle, KeyFacts, FAQ, Antwortsätze; Formatierung nur über `euro()` aus `lib/format.ts:7–9`.

**Doppelungsprüfung** `ersteDoppelung` (`:122–130`) für FAQ-Fragen/Tabellenzeilen wiederverwenden (exportieren statt kopieren).

---

### `lib/seo-meta.ts` – `metaFor(path)` (utility, server-only)

**Analog (direkt verschieben):** `zielwerte()` in `lib/funktionsdetails/index.ts:102–120`:
```ts
const MARKE = " | CraftOS";
export function zielwerte(path: string): Zielwerte {
  const eintrag = keywordMap.find((k) => k.path === path);
  const target = eintrag?.target;
  if (!eintrag || !target?.title || !target.h1 || !target.description) { throw new Error(…); }
  return {
    title: target.title,
    titleOhneMarke: target.title.endsWith(MARKE) ? target.title.slice(0, -MARKE.length) : target.title,
    h1: target.h1,
    description: target.description,
    keyword: eintrag.primary?.keyword ?? null,
  };
}
```
→ Nach `lib/seo-meta.ts` verschieben (Re-Export aus `lib/funktionsdetails` beibehalten, damit `app/app/page.tsx:23` und `app/funktionen/[slug]/page.tsx:4` nicht brechen) und um `metaFor(path, ogPath?)` ergänzen, das direkt `pageMetadata(z.titleOhneMarke, z.description, path, ogPath ?? path + "/opengraph-image")` liefert (Pitfall 8: `twitter:image` = Segmentbild). Für `primary: null`-Seiten (`/fakten-ueber-craftos`, kleine Betriebe, Rechtsseiten, `/support`) funktioniert `zielwerte` unverändert, sofern `target` gesetzt ist. Nur in Server-Modulen importieren (JSON 138 KB, 07-PATTERNS).

**Rechtsseiten/Rechner:** Heute eigene `Metadata`-Objekte ohne `images` (`app/rechner/stundensatz/page.tsx:17–34`, `app/agb/page.tsx:5–8`) → durch `metaFor` ersetzen; damit erhalten sie `og:image`/`twitter:image` (Research: drei Rechnerseiten ohne `og:image`).

**Blog/Hilfe-Artikel:** `app/blog/[slug]/page.tsx:16–31` behält die `openGraph.type: "article"`-Erweiterung, nur `pageMetadata(a.title, a.description, …)` → Werte aus `metaFor`, falls die Map einen Zielwert hat (Map ist Quelle, kein Frontmatter-`seoTitle` – Research Anti-Pattern).

---

### `lib/breadcrumbs.ts` – `crumbsFor(path, current?)` (utility)

**Analog – heutige Ketten** (genau diese Namen sind die Schema-Konvention „Start“):
- `components/funktionen/FunktionsDetail.tsx:133–139` → Start › Funktionen › `detail.name`
- `app/app/page.tsx:136–141` → Start › Mobile-App
- `components/content/ContentIndex.tsx:101–106`:
```tsx
data={breadcrumbSchema([
  { name: "Start", path: "/" },
  { name: kind === "blog" ? "Ratgeber" : "Hilfe", path: "/" + kind },
  ...(category
    ? [{ name: title, path: "/" + kind + "/kategorie/" + category }]
```
- `components/content/ArticlePage.tsx:170–175` → Start › Ratgeber/Hilfe › Artikel

**Abweichungen, die sich ändern (UI-SPEC § 1, C10):** Rechner-Inline-Schema nennt „CraftOS“ und „Kostenlose Rechner“ (`app/rechner/stundensatz/page.tsx:59–75`) → „Start“ und „Rechner“. Kette laut UI-SPEC-Tabelle § 1 (verbindlich, inkl. „Kontakt“ für `/support`, „Für kleine Betriebe“). Fehlertexte: „Breadcrumbs: Pfad {path} hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.“, „Breadcrumbs: {n} Glieder – 2 bis 4 erlaubt.“ (über `assertCount` aus `budgets.ts:69–81` mit `count.crumbs`).

---

### `components/v2/Breadcrumbs.tsx` + `.module.css` (component, RSC)

**Analog sichtbare Kette:** `components/calculators/CalculatorPage.tsx:21–37`:
```tsx
<nav aria-label="Brotkrümelnavigation" className={styles.breadcrumbs}>
  <Link href="/">CraftOS</Link>
  <span aria-hidden="true">/</span>
  …
  <span aria-current="page">Kostenlose Rechner</span>
</nav>
```
→ Neu (UI-SPEC § 1, C10): `aria-label="Brotkrumen"`, `<ol>`/`<li>`, Trenner `ChevronRight` 16 px `aria-hidden` (Import wie `ArrowUpRight` in `FunktionsKopf.tsx:3`), Prop `tone: "dark" | "light"` als `data-tone` (Muster `SectionHeader.tsx:34`), Prop `schema` (Standard `true`) rendert `<JsonLd data={breadcrumbSchema(items)} />` (Import `@/components/seo/JsonLd`, `@/lib/schema`). Budget: `assertTextBudget("crumb.name", …, TEXT_BUDGET.crumb.name)` nur für Zwischenglieder.

**Danach entfernen:** `CalculatorPage.tsx:21–37` (alte `nav`), Rücklink `ArticlePage.tsx:22–28` (C11), alle `breadcrumbSchema`-Aufrufe (Liste unter Shared Pattern „Eine BreadcrumbList je Seite“).

**CSS-Konventionen:** Farben/Fokus aus UI-SPEC-Tabelle „Brotkrumen-Farben“; Hover nur unter `@media (hover: hover)` wie `FunktionsKopf.module.css:71`; 44-px-Ziele wie `.secondary` (`FunktionsKopf.module.css:58–70`).

---

### `components/v2/FitPanels.tsx` + `.module.css` (component, partial)

**Analog Struktur:** `PlattformRollen` (zwei `article`-Panels mit Titel, Liste, Budget-Asserts – Beschreibung in `07-PATTERNS.md` „PlattformRollen“). **Analog Assert-Reihenfolge:** `components/v2/KeyFacts.tsx:27–45` (erst `assertCount`, dann je Element Pflichtfeld + Budget, dann Pflicht-Note):
```tsx
assertCount("KeyFacts", facts.length, TEXT_BUDGET.count.keyFacts, "Fakten");
for (const fact of facts) {
  if (!fact.source?.trim()) { throw new Error(`KeyFacts: Wert ‚${fact.value}‘ ohne Quelle – …`); }
  …
  assertTextBudget("keyFact.label", fact.label, TEXT_BUDGET.keyFact.label);
}
```
→ `assertCount("FitPanels", panel.points.length, TEXT_BUDGET.count.fitPoints, "Punkte")` mit Fehlertext UI-SPEC „FitPanels: Panel {titel} hat {n} Punkte – 2 bis 4 erforderlich.“; `assertOneSentence("FitPanels", …)` (`budgets.ts:61–66`) je Punkt; Wettbewerberpunkt ohne `quelle` → Fehler. Quellenlink `rel="nofollow"` (U10). `/gobd` nutzt die Panels ohne Quellen (UI-SPEC § 5.4).

---

### `components/v2/FactList.tsx` + `.module.css` (component)

**Analog:** `components/v2/KeyFacts.tsx:47–61` – `<dl>` mit `<div>`-Wrappern je Paar:
```tsx
<dl className={s.list} style={{ "--facts": facts.length } as CSSProperties}>
  {facts.map((fact) => (
    <div key={fact.source + fact.label} className={s.fact}>
      <dt className={s.label}>{fact.label}</dt>
      <dd className={s.value} data-source={fact.source}>{fact.value}</dd>
    </div>
  ))}
</dl>
```
→ `term`/`definition` mit Budgets `factList.term 32`, `factList.definition 200`, `count.factList {6,12}`; Fehlertext „FactList: mindestens 6 Einträge erforderlich – Inhalte in lib/… ergänzen.“ (Standardtext von `assertCount`).

---

### `components/funktionen/FunktionsKopf.tsx` + `.module.css` (G1, C4)

**Bestand** `:12–28` (Props) und `:41–58` (Asserts). Änderungen laut UI-SPEC G1:
- `visual?: KopfVisual` optional; ohne Visual kein `<div className={s.product}>` (`:114–116`) und einspaltig (neue Klasse, Textspalte max. 800 px).
- `answer?: string` statt `lead`: rendert `<p id="antwort" data-answer className={s.lead}>`; Assert `assertTextBudget("answer", answer, TEXT_BUDGET.answer)` und `sentenceCount ≤ 2`. Fehler, wenn `lead` und `answer` gleichzeitig gesetzt sind. Bestehende Lead-Prüfung `:48–52` bleibt für den `lead`-Zweig.
- `stand?: string` → Label-Zeile direkt unter der Antwort (8 px).
- Erste Zeile: `<Breadcrumbs items={crumbs} tone="dark" />` (neue Prop `crumbs` oder `path` → `crumbsFor`). Da `FunktionsKopf` auch `FunktionsDetail` und `/app` bedient, entfallen dort gleichzeitig die Schema-Aufrufe.
- Kopfwort-Logik `:44–57` (`indexOf(keyword)`, `vor`/`nach`) unverändert – HERO-Kopfwort „HERO-Software“, ToolTime „ToolTime-Alternative:“ (UI-SPEC § Typography).
- Tests: `tests/funktionskopf.test.ts:27–38` (`basis`, `kopf(props)`) um Fälle ohne Visual, mit `answer`, mit `answer`+`lead` (Fehler) und Brotkrumen-`nav` erweitern.

---

### `components/v2/SectionHeader.tsx` (G2, C2)

**Bestand** `:28–31`:
```tsx
const budget = TEXT_BUDGET.sectionHeader;
if (eyebrow !== undefined) assertTextBudget("sectionHeader.eyebrow", eyebrow, budget.eyebrow);
assertTextBudget("sectionHeader.title", title, budget.title);
assertTextBudget("sectionHeader.lead", lead, budget.lead);
```
→ `const frage = title.trim().endsWith("?")`; bei Frage `assertTextBudget("sectionHeader.answerLead", lead, budget.answerLead)` + `sentenceCount ≤ 2`, `<p … data-answer="">`; sonst unverändert. **Achtung:** Phase-7-Inhalte mit Frage-Titel (Detailseiten-FAQ-Köpfe sind keine Fragen; prüfen per Vitest-Sammeltest `design-v2-budgets.test.ts`).

---

### `components/v2/ComparisonTable.tsx` (G3, C5)

**Bestand** `:20–31` (Props) und `:95` (`<p className={s.note}>{note}</p>`). Ergänzen:
```ts
sources?: { anbieter: string; label: string; url: string; abgerufenAm: string }[];
disclaimer?: string;
```
→ unter `note`: `<ol aria-label="Quellen zur Tabelle">` mit „{Anbieter}: {Label}, abgerufen am {germanDate(abgerufenAm)}“ (`lib/format.ts:12–15`), Links `rel="nofollow"`; danach `disclaimer`. Zellbudget `:55–57` **unverändert 24** (Pitfall 4). Für Marktübersichten kein `highlight` (bestehende Prüfung `:42–44` genügt). Keine Rot/Grün-Darstellung (`CellValue :100–120` unverändert).

---

### `components/v2/FaqList.tsx` (`answerMax`, C3)

**Bestand** `:20–30`. Neue optionale Prop `answerMax?: 300`; wenn gesetzt, `assertTextBudget("faq.answerCentral", item.a, TEXT_BUDGET.faq.answerCentral)` zusätzlich zu `:28–29`. Markup `:43` (`<p className={s.answer}>`) bleibt – das ist genau das „erste `<p>` nach `<summary>`“, das `answerFirstViolations` misst.

---

### `components/v2/KeyFacts.tsx` (Quellen-Kurzform, C9) – **wichtiger Befund**

**Bestand** `:16–17, 35–39`:
```ts
export const KEY_FACT_SOURCE = /^(site|register):[A-Za-z0-9.-]+$/;
…
if (!KEY_FACT_SOURCE.test(fact.source)) {
  throw new Error(`KeyFacts: Quelle ‚${fact.source}‘ ist keine Kurzform site:… oder register:… – Schlüssel angeben.`);
}
```
UI-SPEC C9 erlaubt Wettbewerberwerte in `KeyFacts` (Rechenbeispiel „179,40 € plancraft Business, 5 Personen, Jahr“). Mit der heutigen Regex wirft der Baustein. → Regex um `wettbewerber:` erweitern (`/^(site|register|wettbewerber):[A-Za-z0-9.-]+$/`, Schlüssel z. B. `wettbewerber:plancraft-business-5p-jahr`), Fehlertext und JSDoc `:9–12` anpassen; Tests `tests/design-v2-components.test.ts:72–79` (KeyFacts-Quelle) mitziehen. CraftOS-Werte bleiben `site:`.

---

### `components/v2/budgets.ts`

**Bestand** `:7–40` – Erweiterung exakt laut UI-SPEC „`TEXT_BUDGET`-Erweiterung“: `answer: 300`, `sectionHeader.answerLead: 300`, `faq.answerCentral: 300`, `fitPanel: { title: 40, point: 100 }`, `factList: { term: 32, definition: 200 }`, `og: { title: 90 }`, `crumb: { name: 32 }`, `count.fitPoints {2,4}`, `count.factList {6,12}`, `count.crumbs {2,4}`. Kommentarzeile „Phase 8 (08-UI-SPEC G1–G7)“ im Stil von `:17–22`. Keine eigenen Längenprüfungen außerhalb (`charCount` ist Unicode-sicher, `:43–45`).

---

### `components/vergleich/AlternativePage.tsx` (Vorlage, sync RSC)

**Analog:** `components/funktionen/FunktionsDetail.tsx` (ganze Datei, 143 Zeilen).

**Imports** (`:1–16`, angepasst):
```tsx
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FitPanels } from "@/components/v2/FitPanels";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { faqSchema, webPageSchema } from "@/lib/schema";
```
**Abschnitts-Wrapper** (`:18–36`): `AbschnittId = "vergleich" | "kosten" | "fuer-wen" | "umstieg" | "faq"`, `SURFACE` white/warm, Flächenfolge laut UI-SPEC § 3.1 (Weiß, Warm, Weiß, Warm, Weiß). **Achtung ID-Konvention:** In `FunktionsDetail` trägt die H2 `id={`${id}-titel`}`; UI-SPEC § 8 verlangt Prompt-Anker an der Frage-H2 (`/preise#app-lizenz`, `/fakten-ueber-craftos#was-ist-craftos`) bzw. `#antwort` am Kopf-`<p>`. → Für Phase-8-Seiten `SectionHeader id={id}` (ohne `-titel`) und `aria-labelledby={id}` – im Plan einmal festlegen und in `vergleich-seiten.test.ts` prüfen.

**FAQ + Schema aus demselben Array** (`:102–108`):
```tsx
<Abschnitt id="faq" surface="warm">
  <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
    <SectionHeader id="faq-titel" title={faq.title} lead={faq.lead} />
    <FaqList items={faq.items} headingLevel={3} />
  </div>
  <JsonLd data={faqSchema(detail.faq.items)} />
</Abschnitt>
```
→ zusätzlich `answerMax={300}`. **CTA** (`:129–131`): `<div data-abschnitt="cta"><CtaBand … /></div>` mit Text „Testen Sie CraftOS mit Ihrem Auftrag“. **Schema** (`:133–140`): `breadcrumbSchema` entfällt hier (kommt aus `Breadcrumbs` im Kopf), `webPageSchema` (`lib/schema.ts:61–74`) bleibt. Kein `Product`/`Review`/`AggregateRating` (UI-SPEC § 8).

**Sync-Pflicht** wie 07-PATTERNS: nicht `async`, Daten als Prop (`wettbewerber`, Seiteninhalt), damit `renderToString` in Vitest funktioniert.

---

### `app/vergleich/{name}-alternative/page.tsx` (route, dünn)

**Analog Metadaten:** `app/app/page.tsx:34–36`:
```tsx
const z = zielwerte("/app");
export const metadata = pageMetadata(z.titleOhneMarke, z.description, "/app");
```
**Analog Seite:** `app/funktionen/[slug]/page.tsx:24–28` (eine Zeile `return <Vorlage …/>`). Vier statische Ordner (Research-Empfehlung: einfacher für Map-Pfade, OG und `dynamicParams`), je Ordner zusätzlich `opengraph-image.tsx`.

---

### `app/vergleich/handwerkersoftware-kleine-betriebe/page.tsx`, `app/preise/page.tsx`, `app/vergleich/page.tsx`, `app/fakten-ueber-craftos/page.tsx`, `app/craft-ai/page.tsx`, `app/gobd/page.tsx` (page, RSC)

**Analog:** `app/app/page.tsx` (145 Zeilen, vollständig gelesen) – Metadaten über `zielwerte` (`:34–36`), `Abschnitt`-Wrapper mit Flächentabelle aus dem Inhaltsmodul (`:43–51`, `APP_SURFACES`), `FunktionsKopf` (`:84–92`), `SectionHeader`+Baustein je Abschnitt (`:94–122`), FAQ + `faqSchema` (`:124–130`), `CtaBand` in `data-abschnitt="cta"` (`:132–134`).

**Inhaltsmodul je Seite:** `lib/app-content.ts` – `tarif()`-Helfer (`:32–39`), `*_SECTION_IDS` + `*_SURFACES` (`:45–57`), Kopfobjekt (`:63–73`), KeyFacts mit Kurzform-Quelle (`:257–264`), FAQ-Array mit Vorlagen aus `tarife`/`euro()` (`:281–293`).

**`/preise` – Paritäts-Fallen (Pitfall 6):**
- Bestand `app/preise/page.tsx:9–17` importiert `creditUmrechnung`, `startCredits`, `extraSpeicher` – die vom Test verlangten Template-Strings stehen heute in `:49` und `:109–110` (`einmalig ${startCredits} Credits (${creditUmrechnung})`, `Craft AI und KI-Belegscans ({creditUmrechnung})`) und `:154` (`faqSchema(faqs)`). Wandern Texte in ein Modul, Test `pricing-parity.test.ts:81–84` im selben Commit auf die neue Datei umstellen.
- Antwortsatz nach Research Pattern 4 nur aus `tarife` + `euro()`; Wettbewerberpreise der Marktspanne (§ 4 Abschnitt 4) nie in `app/preise/page.tsx` (Literal-Regex `9[,.]90` trifft 49,90/74,90).
- `live-check.mjs:77–82` verlangt das Wort **„Extra-Speicher“** im HTML; UI-SPEC § 4 nennt „Zusatzspeicher“. → Wort „Extra-Speicher“ in Note/KeyFacts-Label behalten **oder** Live-Check im selben Plan anpassen.
- Die FAQ „Was passiert nach den `${site.trialDays}` Testtagen?“ (`:60`) ist einer der ≥ 5 Treffer des Testphasen-Scans (`pricing-parity.test.ts:187`); nach Wegfall Trefferzahl prüfen.
- `SoftwareApplication`-Offers bleiben global (Layout); `/preise` gibt laut UI-SPEC § 8 BreadcrumbList (2), FAQPage, WebPage aus.

**`/vergleich`:** Bestand 613 Zeilen + `Comparison.module.css` + `ProviderLogo.tsx`; heute `@graph`-JSON-LD mit BreadcrumbList (`app/vergleich/page.tsx:591`). Komplett ersetzen; `lib/comparison.ts` ablösen (Abhängigkeit `tests/announcements.test.ts:5, 68–76`).

**`/gobd`:** Bestand gibt FAQPage ohne sichtbare Frage aus → FAQ-Array einmal definieren, `FaqList` + `faqSchema` daraus (Muster `app/app/page.tsx:124–130`). Quellenlinks (AO-Handbuch, BMF 14.07.2025) aus Bestand übernehmen.

**`/craft-ai`, `/gobd`:** `FeatureSnippet` unterhalb der Falz in `figure` mit Kennzeichnung – Muster `FunktionsDetail.tsx:63–70`:
```tsx
<figure data-figure="snippet" className="mt-12 max-w-[640px]">
  <FeatureSnippet variant={detail.snippet} headingLevel={3} />
  <figcaption className="mt-2"><IllustrationLabel kind="vereinfacht" /></figcaption>
</figure>
```
E2E-Bindung `function-illustrations.pw.cjs:8` (`['ki', '/craft-ai']`) bleibt erfüllt.

**`/fakten-ueber-craftos`:** Literal-Verbot (`pricing-parity.test.ts:110`) gilt weiter – KeyFact „29,95 €“ nur über `euro(voll.monat)`. Abgrenzungssatz als `<p data-abgrenzung>`.

---

### `lib/og.tsx` (`pageOg`, G7) und `opengraph-image.tsx` je Segment

**Analog Vorlage:** `lib/og.tsx:1–39` (`articleOg`):
```tsx
import { ImageResponse } from "next/og";
export function articleOg(title: string, kind: string) {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", background: "#101014", color: "#fff", padding: "65px",
                   display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
       <div style={{ display: "flex", fontSize: 32, color: "#f2af38" }}>CraftOS · {kind}</div>
       <div style={{ display: "flex", fontSize: title.length > 70 ? 52 : 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1040 }}>{title}</div>
       …
```
→ `pageOg({ title, kind })` laut UI-SPEC § 7: Padding 72, Titelstufen 72/64/52 px nach Länge (≤ 40 / 41–60 / 61–90), > 90 → Fehler „OG: Titel für {path} hat {n} Zeichen – höchstens 90 …“, **kein** `fontWeight` ≠ 400 (Geist Regular, C7), kein „·“, keine Versalien, Unterkante 12 px `#F2AF38`, `OG_SIZE` exportieren. Logo-Zeile aus `app/opengraph-image.tsx:26–47` übernehmen, aber Verlauf (`:36`, `:79–81`), Raster (`:19–21`), Pillen (`:90–107`) und `fontWeight: 800` entfernen. `articleOg` danach löschen (Aufrufer: `app/{blog,hilfe}/[slug]/opengraph-image.tsx`).

**Analog Segmentdatei:** `app/blog/[slug]/opengraph-image.tsx`:
```tsx
import { getContentArticle } from "@/lib/content";
import { articleOg } from "@/lib/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CraftOS Ratgeber";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getContentArticle("blog", slug);
  return articleOg(a?.title ?? "CraftOS Ratgeber", "Ratgeber");
}
```
→ Für **dynamische** Segmente (`funktionen/[slug]`, `gewerke/[slug]`, `blog/[slug]`, `hilfe/[slug]`, `{blog,hilfe}/kategorie/[category]`) zwingend `generateStaticParams` in der Bilddatei (Research Pattern 3; Re-Export aus `./page` ist laut Loader-Quelltext möglich, z. B. `export { generateStaticParams } from "./page";` – Bestand `app/blog/[slug]/page.tsx:5–7`, `app/funktionen/[slug]/page.tsx:12–14`). Titel = H1 der Seite aus derselben Quelle wie die Seite (`zielwerte(path).h1` bzw. Artikel-`title`), `alt = "{kind}: {title}"`. Statische Segmente: Dreizeiler ohne `params`.

**`pageMetadata`-Kopplung** (`lib/metadata.ts:3–12`): Default `imagePath = "/opengraph-image"` führt zu `twitter:image` = Root-Bild. Alle Seiten müssen `imagePath = path + "/opengraph-image"` übergeben (bzw. über `metaFor`); Root (`/`) behält den Default. Muster dafür existiert bereits in `app/blog/[slug]/page.tsx:16–21`.

---

### `lib/schema.ts` (`organizationSchema`, D-25)

**Bestand** `:6–20`. `disambiguatingDescription` (`:16–17`) um „…; nicht verbunden mit CraftOS-PC oder ComputerCraft.“ ergänzen; `sameAs: storeUrls` nach Muster `softwareApplicationSchema :35` (UI-SPEC § 5.2: nur geprüfte offizielle Profile). Test `tests/seo-brand.test.ts:12–17` prüft `toContain("craftos.eu")` und `"Anbieter"` – bleibt grün, wenn diese Wörter erhalten bleiben; um Erwartung „CraftOS-PC“ und `sameAs` ergänzen.

---

### `lib/site.ts` (`vertrag`, `monatAusJahr`)

**Analog:** kommentierte Konstanten mit Quelle `:18–30`:
```ts
/** Einmaliges KI-Startguthaben einer neuen Organisation (kein Monatskontingent). */
export const startCredits = 150;
```
→ `export const vertrag = { monat: "monatlich kündbar", jahr: "zum Ende der Laufzeit kündbar" } as const;` mit Kommentar „Quelle: AGB § 5 (app/agb/page.tsx), Rechtstext bleibt unverändert“ (Research CraftOS-Tabelle). `monatAusJahr(jahrEuro[])` in Cent (UI-SPEC F1); `site.checkedAt` (`:16`) bleibt Stand-Quelle aller CraftOS-Angaben – nie Literal (Pitfall 13).

---

### `lib/llms.ts`, `app/sitemap.ts`, `components/layout/Footer.tsx`

- **`lib/llms.ts:63–68`** – Abschnitt „Preise und Vergleich“ mit `link(name, path, note?)` (`:16–17`): Label „Vergleich mit Craftnote und plancraft“ (`:66`) ersetzen, vier Alternativen + kleine Betriebe ergänzen. `tests/llms.test.ts:14–15` (Links `/preise`, `/vergleich`) bleibt, um neue Links erweitern. Keine Wettbewerberzahlen in `llms.txt` (Paritäts-/Ankündigungstests lesen sie).
- **`app/sitemap.ts:8–17`** – `pageUpdated` je Kernseite auf Rollout-Datum; `pages` (`:23–39`) um fünf neue Pfade. **Pitfall 12:** im selben Commit `keyword-map.json`-Status `geplant → bestehend` (Test `keyword-map.test.ts:142–155`).
- **`components/layout/Footer.tsx:4–32`** – `columns`-Tupel: neue Spalte `["Vergleiche", [["Handwerkersoftware-Vergleich", "/vergleich"], ["plancraft-Alternative", …], …, ["Für kleine Betriebe", …]]]`; „Warum CraftOS?“ (`:12`) entfällt. Raster `md:grid-cols-[1.2fr_1fr_1fr_1fr]` (`:37`) hat 4 Spuren für Logo + 3 Spalten → auf 5 Spuren erweitern. Mega-Menü-Link „Warum CraftOS?“ in `lib/funktionsgruppen.ts:285` ist durch `tests/funktionsgruppen.test.ts:464` fixiert – nur ändern, wenn der Plan es ausdrücklich vorsieht (UI-SPEC nennt nur den Footer).

---

### `scripts/seo-audit.mjs` + `scripts/lib/seo-audit-core.mjs` (Post-Build-Prüfung)

**Analog Helfer (wörtlich in die Kernbibliothek ziehen):** `scripts/live-check.mjs:126–164`:
```js
const plain = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
function headTags(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => plain(m[1]));
  return { title: title ? plain(title[1]) : null, description: desc ? decode(desc[1]) : null, h1s };
}
/** Alle Objekte mit dem gesuchten @type (auch in @graph oder verschachtelt). */
function findType(node, type, acc = []) { … }
```
→ als `export` in `scripts/lib/seo-audit-core.mjs`; `live-check.mjs` importiert sie danach von dort (eine Implementierung). `answerFirstViolations(html, max)` aus Research „Code Examples“. Keyword-Normalisierung `norm()` aus `tests/keyword-map.test.ts:18–25` ebenfalls in die Kernbibliothek ziehen (Research „Don't Hand-Roll“) und im Test importieren.

**Analog Prüfrahmen/Ausgabe:** `live-check.mjs:36–50` (`report`, `check` mit `true | string`), `route-audit.mjs:77–102` (Ergebnis nach `test-results/*.json`, `process.exitCode = 1`). Eingabe statt HTTP: `.next/server/app/**/*.html`, `prerender-manifest.json`, `opengraph-image*.body`-Größen; URL-Liste aus der Sitemap (`app/sitemap.ts` ist TS – im Skript `.next/server/app/sitemap.xml.body` lesen). Vorlage für die Dateiwanderung: Research-Skript `…/scratchpad/p8/meta-audit.mjs`.

**Test:** `tests/seo-audit-core.test.ts` nach `tests/se-ranking-sync.test.ts:1–6` (Import `from '../scripts/lib/…mjs'`), Fixtures als kleine HTML-Strings (Titel 61 Zeichen, zwei H1, `@graph`-BreadcrumbList, Frage-H2 mit 301-Zeichen-Antwort).

---

### `docs/seo/ai-prompts-targets.json` + `tests/ai-prompts.test.ts`

**Datenform:** Research „Prompt-Mapping-Datei“ (`engine`, `promptLlmId`, `prompt`, `target` mit Anker, `phase`), 20 Einträge laut D-18. **Test-Analog:** `tests/keyword-map.test.ts:142–153`:
```ts
const sitemapPaths = new Set((await sitemap()).map((e) => toPath(e.url)));
…
expect(sitemapPaths.has(k.path), `${k.path} fehlt in der Sitemap`).toBe(true);
```
→ `target` ohne Anker ∈ Sitemap (oder Phase-8-Pfad mit Map-Status `geplant` bis zum Livegang); Prompt-IDs gegen `docs/seo/data/2026-10-22-ai-tracker-prompts.json` (Import wie `manifest.json` in `keyword-map.test.ts:11`); Anker-Existenz und Antwort ≤ 300 im Build über `seo-audit.mjs`.

---

### `tests/wettbewerber.test.ts`

**Analog Walk + Trefferliste:** `tests/announcements.test.ts:22–45` (`walk`, `findHits` mit `rel:zeile: text`), **Analog Literal-Scan:** `tests/pricing-parity.test.ts:101–125`. Prüfungen laut UI-SPEC-Prüfmatrix: jede `Fakt` mit `https://` + Herstellerdomain, gültiges `abgerufenAm` ≤ heute, Alter > 60 Tage → `console.warn` (Muster `console.info` in `pricing-parity.test.ts:185`), U3 Statt-Preis-Felder, U6 Stärken ≥ 2, U7 Wortliste über alle Texte (Module + gerenderte Seiten), U8 keine `<img>` mit Wettbewerberbezug, U11 HERO-Variante, Quellenliste ⊇ Zellenquellen, `monatAusJahr` → 58,13 € an allen Stellen.

---

### `tests/e2e/vergleich.pw.cjs`

**Analog:** `tests/e2e/funktionsdetails.pw.cjs` – Kopf/`severeAxe` (`:41`), `measureKopf` (`:48–55`, Selektor `[data-funktions-kopf]` bleibt, weil der Kopf derselbe Baustein ist), Fold-Test 360 × 640 (`:83`), Breiten (`:103`), axe (`:127, 143`), CLS (`:159`), ohne JS (`:241–252`). Testnamen-Präfix z. B. „Vergleich:“. Zusätzlich: Brotkrumen einzeilig bei 360 px ohne Seitenscroll, CTA-Unterkante ≤ 640 auf Alternativen, `/preise`, `/vergleich`, kleine Betriebe (UI-SPEC § 3.1). **In `tests/e2e/playwright.config.cjs:7` `testMatch` eintragen.**

---

### `docs/releases/PHASE-08-ROLLOUT.md`

**Analog:** `docs/releases/PHASE-07-ROLLOUT.md` (Abschnitt 1 „Ausgelieferter Stand“ mit Commit-Tabelle, Live-Check-Ausgabe, Anforderungsstatus). Zusätzlich: Klarstellung D-19 (korrigiert PHASE-07 §15h), IndexNow, `se-ranking-sync.mjs --check`, `seo-report.mjs --etappe rollout-phase08`, HERO-Variante (A/B) mit Screenshot-Pfad.

---

## Hart kodierte Tests und Skripte (D-23 Schutztests und weitere Bindungen)

Alle Stellen, die durch Phase 8 rot würden oder bewusst erweitert werden müssen. **D-23-Regel:** Ausnahmen nur für klar gekennzeichnete Wettbewerberdaten (`lib/wettbewerber/**`) bzw. Wettbewerber-Abschnitte/-Routen (`/vergleich/**`), CraftOS-eigene Texte bleiben unverändert streng.

### Schutztests (D-23, in Welle 1 vor den Inhalten)

| Datei:Zeile | Heute | Kollision in Phase 8 | Muster der Änderung |
|---|---|---|---|
| `tests/pricing-parity.test.ts:161–188` (Testphasen-Scan, `tagesLiteral :137`, `testKontext :139`) | scannt `app/`, `components/`, `lib/`, `content/`; jede Tagesangabe im Testkontext ≠ 10 → Fehler | „7 Tage“, „14 Tage“, „30 Tage“ der Wettbewerber | `lib/wettbewerber/` aus `sammleDateien` ausnehmen (Filter wie `EXCEPTIONS` in `announcements.test.ts:20, 37`); eigener Test: dort Tageszahlen nur als Feld `testphaseTage.wert`; Seiten-/Vorlagentexte nutzen `${w.testphaseTage.wert} Tage` (erfasst `tagesTemplate :138` nur `trialDays`). Trefferzahl ≥ 5 (`:187`) nach Wegfall der `/preise`-FAQ prüfen. |
| `tests/pricing-parity.test.ts:101–125` (Preisliteral-Verbot, Regex `:114`) | Dateiliste `:102–113` inkl. `app/preise/page.tsx`, `components/preise/PricingTable.tsx`, `app/fakten-ueber-craftos/page.tsx` | `PricingTable.tsx` wird gelöscht → `read()` wirft; neue Inhaltsmodule fehlen in der Liste; `9[,.]90` trifft 49,90/74,90/24,90 | Liste auf neue Dateien umstellen (Inhaltsmodule `/preise`, `/vergleich`, Fakten, kleine Betriebe, `AlternativePage.tsx`); `lib/wettbewerber/**` **nicht** aufnehmen (dort sind Wettbewerberpreise Pflicht), Wettbewerberpreise nie in den gelisteten Dateien. |
| `tests/pricing-parity.test.ts:81–84` | `app/preise/page.tsx` muss `Craft AI und KI-Belegscans ({creditUmrechnung})`, `einmalig ${startCredits} Credits (${creditUmrechnung})`, `faqSchema(faqs)` enthalten | Umbau verschiebt Texte/Variablennamen | Erwartung auf die Datei umstellen, in der Note/FAQ entstehen; `faqSchema(...)` mit tatsächlichem Arraynamen. |
| `tests/pricing-parity.test.ts:191–202` | `read("components/preise/PricingTable.tsx") + read("app/preise/page.tsx")` muss „Alle Preise netto“ und „Umsatzsteuer“ enthalten | `PricingTable.tsx` entfällt | Quelle auf neues `/preise`-Inhaltsmodul; Note „Preise netto zzgl. USt.“ enthält „Umsatzsteuer“ nicht → Wortlaut „Alle Preise netto … Umsatzsteuer“ in Note/FAQ beibehalten oder Erwartung bewusst ändern. |
| `scripts/route-audit.mjs:33` (`oldTrial: /14 Tage (kostenlos|testen)/i`) und Fehlerbedingung `:83–89, 102` | jede Seite mit „14 Tage kostenlos/testen“ → Exit 1 | HERO-Testphase (FAQ „…kostenlos testen?“ + „HERO nennt eine Testphase von 14 Tagen“) | Formulierungen ohne Muster („Testphase laut HERO: 14 Tage“) **und** `oldTrial` für Pfade unter `/vergleich/` bzw. innerhalb gekennzeichneter Wettbewerberabschnitte (`data-wettbewerber`) ausnehmen; für alle anderen Pfade unverändert. Gleiche Regel als Vitest-Fixture in `seo-audit-core.test.ts` spiegeln. |
| `components/v2/ComparisonTable.tsx:55–57` + `TEXT_BUDGET.comparison.cell 24` | Zellbudget 24 | lange Wettbewerberzellen (Pitfall 4) | **Budget bleibt 24** (UI-SPEC G3); Zellformate § 3.3 einhalten. Vitest-Sammeltest `tests/design-v2-budgets.test.ts:94–119` um alle Phase-8-Tabellen (Alternativen, `/preise`, `/vergleich`, kleine Betriebe) erweitern. |
| `tests/keyword-map.test.ts:91–109` (Provenienz/Manifest) | Volumen/KD eines `primary` nur aus `docs/seo/data/kwmap/` mit Manifesteintrag | Phase-8-Rohdaten (`2026-10-22-*.json`, MCP-Format `cells.volume`) haben kein Manifest | Neue Hauptkeywords nur aus `kwmap/export--*.json`; kleine Betriebe `primary: null` mit `reason` „…ohne Daten (export--candidates-1.json)“ (Pitfall 7). Kein Abschwächen des Tests. |
| `tests/keyword-map.test.ts:111–127` (`primary null`) | verlangt `pageCandidates[path]` in `docs/seo/keyword-seeds.json` und `is_data_found: false` im Export | neuer Pfad `/vergleich/handwerkersoftware-kleine-betriebe` | `keyword-seeds.json` `pageCandidates` um den Pfad mit „beste handwerkersoftware kleine betriebe“ ergänzen (Research). `tests/keyword-seeds.test.ts:37` prüft Alternativen-Kandidaten – unverändert. |
| `tests/keyword-map.test.ts:142–155` | Alternativen müssen `status: "geplant"`, `phase: 8` sein; `geplant ⇔ nicht in Sitemap` | Livegang | Im Commit der Seiten: Status → `bestehend`, Erwartung `:144–148` auf `bestehend` + in Sitemap ändern (Pitfall 12). |
| `tests/keyword-map.test.ts:157–167` | Zielwerte-Prüfung nur für Einträge **mit** `primary` | `/fakten-ueber-craftos`, kleine Betriebe, Rechtsseiten, `/support` bekommen `target` ohne `primary` | Schleife auf alle Einträge mit `target` erweitern (Titel ≤ 60, Description 120–155), Keyword-im-Titel nur bei `primary`. |
| `tests/keyword-map.test.ts:33–37, 256–279` (`PHASE6_SEITEN`) | statische Seiten `/`, `/funktionen`, `/app` rendern H1 = `target.h1` | neue/umgebaute statische Seiten | `/preise`, `/vergleich`, vier Alternativen, kleine Betriebe, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` in die Liste; Kopfwort-Prüfung `:277` gilt nur bei `primary`. |
| `tests/announcements.test.ts:5, 68–76` | importiert `featureComparisons` aus `lib/comparison.ts`, erwartet Zeile „KI-Telefonempfang“ mit CraftOS „Nein“ | `lib/comparison.ts` entfällt | Gleiche Absicht auf die neuen Daten: CraftOS-Zelle „KI-Telefonempfang/-assistent“ in plancraft-/HERO-/ToolTime-Tabellen ist `false` (neutral, `Minus`) ohne Detail/Link. `CODE_PATTERN :10–11` („Telefon-Agent“, „MCP-Server“) bleibt unverändert streng – auch für `lib/wettbewerber/**` (U9). |
| `scripts/live-check.mjs:20, 68–75` (Ankündigungsmuster, Routenliste) | `/funktionen`, `/craft-ai`, `/vergleich`, `/fakten-ueber-craftos` ohne Ankündigung | neue Routen | Routenliste um `/preise`, `/gobd`, vier Alternativen, kleine Betriebe erweitern; Muster unverändert. |
| `tests/media-budget.test.ts:17–25, 73–83` | `EXCEPTIONS["images/brands/craftnote.png"]`, Erwartung `images/brands/craftnote.png`, `plancraft.svg` in der geprüften Menge | Logos entfallen (C12, D-02) | Dateien `public/images/brands/*` löschen, Ausnahme `:23–24` und Einträge `:78–79` sowie Präfix `images/brands/` (`:74`) entfernen; Test `:98–103` erzwingt das (Ausnahme ohne ausgelieferte Datei → rot). |

### Weitere hart kodierte Bindungen

| Datei:Zeile | Heute | Änderung |
|---|---|---|
| `tests/e2e/browser-functional.pw.cjs:155–~180` | `/preise`: Gruppe „Abrechnung wählen“, Artikel „Voll-Lizenz“/„App-Lizenz“, Umschalter Jährlich/Monatlich (alles `PricingTable`) | Test ersetzen durch Prüfung von Antwortsatz `#antwort` (Werte aus Snapshot), `<table>` mit Caption „Voll-Lizenz und App-Lizenz im Vergleich“ und den Zeilen 29,95/299,50/24,96 bzw. 9,95/99,50/8,29 |
| `tests/e2e/design-v2.pw.cjs:16` (`BUDGET_ROUTES`) | enthält `/preise`, `/vergleich` | um eine Alternative (z. B. `/vergleich/hero-alternative`), kleine Betriebe, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` ergänzen |
| `tests/e2e/home-navigation.pw.cjs:466` | Mega-Menü-Panel enthält `/craft-ai`, `/gobd`, `/vergleich` | unverändert, solange `lib/funktionsgruppen.ts:280–286` bleibt |
| `tests/e2e/function-illustrations.pw.cjs:8` | `['ki', '/craft-ai']` | unverändert; `FeatureSnippet variant="ki"` auf `/craft-ai` erhalten |
| `tests/e2e/playwright.config.cjs:7` | `testMatch` | `'vergleich.pw.cjs'` ergänzen |
| `tests/funktionsgruppen.test.ts:462–464` | Mega-Menü „Warum CraftOS?“ → `/vergleich` | nur bei bewusster Umbenennung mitziehen |
| `tests/llms.test.ts:14–15` | Links `/preise`, `/vergleich` | um Alternativen + kleine Betriebe erweitern |
| `tests/seo-brand.test.ts:12–17` | `disambiguatingDescription` enthält „craftos.eu“, „Anbieter“ | erweitern um „CraftOS-PC“, `sameAs` |
| `tests/funktionsdetails.test.ts:1268–1280` | genau 1 BreadcrumbList mit 3 Ebenen im gerenderten `FunktionsDetail` | bleibt grün, wenn `FunktionsKopf` den `Breadcrumbs`-Baustein mit Schema rendert und `FunktionsDetail.tsx:133–139` entfällt |
| `tests/app-seite.test.ts:353–362` | 1 BreadcrumbList Start → Mobile-App | analog (Kopf rendert Schema, `app/app/page.tsx:136–141` entfällt) |
| `tests/funktionen-seite.test.ts:167–175` | BreadcrumbList Start → Funktionen | `app/funktionen/page.tsx:32` auf `Breadcrumbs` umstellen (Kopf `FunktionenHead` bekommt Brotkrumen-Zeile) |
| `tests/funktionskopf.test.ts:27–60` | Kopf mit Pflicht-Visual und `lead` | Fälle G1 ergänzen (siehe oben) |
| `tests/design-v2-components.test.ts:72–79` | KeyFacts-Quellenregex | `wettbewerber:`-Kurzform (C9) |
| `tests/product-register.test.ts:132–134` | erwartet `https://craftos.eu/blog/rechnung/opengraph-image` | prüfen, ob die URL-Form nach Vereinheitlichung gleich bleibt (Segmentpfad bleibt `/blog/<slug>/opengraph-image`) |
| `scripts/live-check.mjs:77–82` | `/preise` muss „Extra-Speicher“ und `150` enthalten | Wortlaut erhalten oder Prüfung anpassen (siehe `/preise`) |
| `scripts/live-check.mjs:182–195` | Title/H1/Description nach Map nur für `/`, `/funktionen`, `/app`, Detailseiten | alle Sitemap-URLs oder mindestens Phase-8-Seiten aufnehmen (D-14 „live-check erweitern“); `target(route)` funktioniert für `primary: null` mit `target` |
| `scripts/live-check.mjs:289–325` | BreadcrumbList 3 (Detail) / 2 (`/app`) | Zählung beibehalten; neue Prüfung: `nav[aria-label="Brotkrumen"]` vorhanden, BreadcrumbList 3 auf Alternativen/kleine Betriebe, 2 auf Umbauseiten, FAQPage = sichtbare Fragen, kein `Product`/`Review`/`AggregateRating` |
| `scripts/route-audit.mjs:61–68` (OG-Stichprobe) | 3 OG-Routen | um `/preise/opengraph-image`, `/vergleich/hero-alternative/opengraph-image`, `/funktionen/angebote/opengraph-image` ergänzen |
| `scripts/visual-audit.mjs:7–12`, `scripts/performance-audit.mjs:8–11, 57` | Routenlisten mit `/preise`; Sonderfall `route === "/preise"` | neue Routen ergänzen; Sonderfall `/preise` (PricingTable-Interaktion) prüfen und ggf. entfernen |
| `docs/DESIGN-V2.md:267–272` | „sichtbarer Breadcrumb verworfen“ | als „aufgehoben durch Phase 8 (C1)“ markieren, § 17 „Kaskade Phase 8“ ergänzen |

---

## Shared Patterns

### Eine BreadcrumbList je Seite, aus `crumbsFor`
**Quelle:** `lib/schema.ts:129–140` (`breadcrumbSchema`, absolute `item`-URLs über `site.url`).
**Gilt für:** alle indexierten Seiten außer `/`. Zu ersetzende Aufrufer (alle im selben Plan, Pitfall 10): `components/funktionen/FunktionsDetail.tsx:133–139`, `app/app/page.tsx:136–141`, `app/funktionen/page.tsx:32`, `app/gewerke/[slug]/page.tsx:92`, `components/content/ArticlePage.tsx:170`, `components/content/ContentIndex.tsx:101`, Inline-`@graph` in `app/rechner/stundensatz/page.tsx:46–75`, `app/rechner/angebotskalkulation/page.tsx:~46–75` (WebApplication-Knoten bleibt, nur BreadcrumbList raus) und `app/vergleich/page.tsx:591`. Rechtsseiten: `Breadcrumbs tone="light"` als erste Zeile des Inhaltscontainers (D-20, Rechtstext unverändert).

### Metadaten aus der Keyword-Map
**Quelle:** `zielwerte()` (`lib/funktionsdetails/index.ts:102–120`) → `lib/seo-meta.ts`; Anwendung `app/funktionen/[slug]/page.tsx:16–22`, `app/app/page.tsx:34–36`.
**Gilt für:** alle Routen (D-06, D-17). Title ohne Marke (Template hängt „ | CraftOS“ an), Root behält vollen Title (`keyword-map.test.ts:263–264`). H1 = `z.h1` im JSX bzw. über das Feld, aus dem die H1 kommt (Gewerke `heroTitle`, Frontmatter `title`, Kategorie-H1 „Ratgeber: …“/„Hilfe: …“ in `ContentIndex.tsx:16`).

### OG je Segment + `twitter:image` = `og:image`
**Quelle:** `app/blog/[slug]/opengraph-image.tsx`, `app/blog/[slug]/page.tsx:16–21` (Bildpfad an `pageMetadata`), `lib/metadata.ts:7–12`.
**Gilt für:** alle Segmente laut UI-SPEC § 7 „Seitentyp je Segment“; dynamische mit `generateStaticParams`; `/styleguide` ohne OG-Datei.

### Antwort zuerst (Kopf, Frage-H2, FAQ)
**Quelle:** neue Props G1/G2/C3; Messung `answerFirstViolations` (Research Code Examples).
**Gilt für:** zentrale Seiten laut D-09 inkl. Bestandsseiten `/`, `/app`, 22 Detailseiten (Bestand erfüllt es bereits, Research „Antwort zuerst – Ist“). Anker: `#antwort` am Kopf-`<p>`, Frage-H2-`id` an der H2.

### FAQPage nur aus dem sichtbaren Array
**Quelle:** `app/app/page.tsx:124–130`, `FunktionsDetail.tsx:102–108`.
**Gilt für:** alle neuen/umgebauten Seiten; behebt `/gobd`.

### Wettbewerberangaben nur aus `lib/wettbewerber/*`, CraftOS-Angaben nur aus `site`/`tarife`/Register
**Quelle:** `lib/app-content.ts:1–39` (Literalregel, `tarif()`), `lib/format.ts` (`euro`, `germanDate`), `site.checkedAt` als Stand.
**Gilt für:** Alternativen, `/preise` (Marktspanne), `/vergleich`, kleine Betriebe. Stand-Zeilen aus Daten (Pitfall 13), Zahlen nie als Literal in Seiten-/Komponentendateien.

### Keine Ankündigungen, keine Herabsetzung
**Quelle:** `tests/announcements.test.ts:10–15` (Muster), `lib/funktionsdetails/index.ts:99–100` (Wortliste-Muster) + UI-SPEC U7/U9.
**Gilt für:** alle Phase-8-Texte inkl. Wettbewerbermodule.

### Bestehende 07-Muster (nur Verweis)
Abschnitts-Wrapper/Flächen, CTA + `data-track="trial"`, Budgetprüfung im Baustein + Vitest-Sammeltest, Kurzform-Belege `data-source`, `renderToString`-Seitentests, E2E-Kopf (`severeAxe`, Request-Sperre, Fold-Messung), Server Components ohne neue Client-Insel → `07-PATTERNS.md` „Shared Patterns“.

---

## No Analog Found

| Datei | Role | Data Flow | Grund / Ersatzquelle |
|---|---|---|---|
| `scripts/lib/seo-audit-core.mjs` (Teil `answerFirstViolations`, OG-Größen, `prerender-manifest`-Abgleich) | utility | transform | Kein Build-HTML-Prüfer im Repo; Helfer `headTags`/`jsonLd`/`findType` aus `live-check.mjs` übernehmen, Rest nach Research „Code Examples“ und `…/scratchpad/p8/meta-audit.mjs` |
| `components/v2/FitPanels.tsx` | component | transform | Nur Teilmuster (`PlattformRollen`, `KeyFacts`-Asserts); Vertrag UI-SPEC § 3.5 |
| `docs/seo/ai-prompts-targets.json` | config | – | Kein Prompt-Mapping vorhanden; Form laut Research „Prompt-Mapping-Datei“, IDs aus `docs/seo/data/2026-10-22-ai-tracker-prompts.json` |
| HERO-Screenshot-Beleg (D-16, `checkpoint:human-verify`) | asset/Prozess | file-I/O | Kein Playwright-Screenshot-Beleg für Fremdseiten im Repo; Pfad + Datum im Datenmodul `hero.preiseBelegt`, ohne Beleg Variante B |

---

## Metadata

**Analog search scope:** `craftos/app/{app,funktionen/[slug],preise,blog/[slug],rechner/stundensatz,opengraph-image.tsx,sitemap.ts}`, `craftos/components/{funktionen,v2,calculators,content,layout}`, `craftos/lib/{schema,metadata,og,site,format,keyword-map,comparison,llms,app-content,funktionsdetails/{index,types}}.ts`, `craftos/scripts/{route-audit,live-check}.mjs`, `craftos/tests/{pricing-parity,announcements,keyword-map,llms,media-budget,seo-brand,funktionskopf,design-v2-budgets,se-ranking-sync}.test.ts`, `craftos/tests/e2e/{browser-functional,funktionsdetails,design-v2,playwright.config}.cjs`
**Files scanned:** 44
**Pattern extraction date:** 2026-10-22
