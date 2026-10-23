# Phase 10: Abschlussaudit – Pattern Map

**Mapped:** 2026-10-23
**Files analyzed:** 61 Einträge (22 neu, 39 geändert; die drei Rechnerseiten, die drei Rechtsseiten und die FeatureSnippet-Szenen-CSS jeweils als eine Gruppe gezählt)
**Analogs found:** 58 / 61 (ohne direktes Vorbild: Tastatur-Durchlauf mit Vorfahren-Fokusprüfung in `scripts/lib/a11y-audit-core.mjs`, Lighthouse-Node-Modus in `scripts/performance-audit.mjs`, Logo-Schriftzug als Glyphen-SVG – jeweils nur Teilmuster)

Alle Pfade sind relativ zu `C:/Projekte/Websitenerstellung/craftos/`, außer `.planning/…` und `.claude/…` (Repo-Wurzel). Die Zeilenangaben beziehen sich auf `main` @ `c3e9255` (Code-Stand nach dem Phase-9-Lückenschluss; seit `e853571` gab es nur Doku-Commits). Muster, die schon in `07-PATTERNS.md` bis `09-PATTERNS.md` stehen (Abschnitts-Wrapper, `SURFACE`, CTA mit `data-track="trial"`, Budgetprüfung beim Rendern, `renderToString`-Tests, Kurzform-Belege, E2E-Kopf mit `severeAxe`, `ContentKopf`/`LinkKarten`), werden hier nur referenziert.

**Leitgedanke:** Phase 10 baut fast nichts Neues. Jede Datei hat ein nahes Vorbild im Repo.
- **`a11y-audit.mjs`** ist „`visual-audit.mjs` (Breitenschleife, Kontext je Breite, Scrollen, axe) mit der CLI- und Exitcode-Disziplin von `seo-audit.mjs` und reinen Funktionen wie `scripts/lib/seo-audit-core.mjs`“. Die Sitemap kommt vom laufenden Server wie in `tests/e2e/funktionsdetails.pw.cjs:30–39`.
- **`a11y.pw.cjs`** ist „`funktionsdetails.pw.cjs` (Kopf, Request-Sperre, `severeAxe`, Breitenschleife per `setViewportSize`) plus Tastaturfälle“.
- **`--lighthouse`** ist „`performance-audit.mjs` (Routenliste, 3 Läufe, Ergebnisdatei) mit Lighthouse statt eigener CDP-Drosselung“, Median-Logik in `scripts/lib/lighthouse-core.mjs` nach demselben Kern-Muster.
- **Rechner, `/support`, Rechtsseiten, 404** sind „`app/gewerke/page.tsx` mit hellem `ContentKopf` statt dunklem `FunktionsKopf`“: Kopf → `Abschnitt` + `SectionHeader` + `LinkKarten` → `CtaBand` (`ContentIndex.tsx` zeigt `ContentKopf` + `LinkKarten` mit `iconFeld`/`meta`).
- **Zusatzkarten Kassenbuch/§ 13b** sind „zwei weitere Einträge in `ZUSATZ` (`lib/funktionsgruppen.ts:217–275`) plus `zusatz` an der Zielkachel“ wie `angebotsunterschrift` (Kachel in `lib/funktionsdetails/angebot.ts`, Erwartung `tests/funktionsdetails.test.ts:281–286`).
- **Berichte (e)** folgen `docs/seo/reports/2026-10-23-messstand-phase10.md` und `docs/releases/PHASE-09-ROLLOUT.md`; SE-Ranking-Zugriff nur über `scripts/lib/se-ranking-mcp.mjs`.

---

## Besitz je Datei und Welle (D-32/D-33, Parallel-Worktrees)

Pakete laut 10-CONTEXT `<specifics>`: Worktree `C:/Projekte/wt-10<x>`, Branch `phase10-spur-<x>`, Ports (a) 3101, (b) 3102, (c) 3103, (d) 3104, (e) 3105. **I** = 10-06 Integration und Phasen-Gate (Haupt-Arbeitsbaum, Port 3100), **R** = 10-07 Rollout. „Übergabe“ heißt: Eintrag in die Übergabeliste des eigenen SUMMARY, 10-06 setzt ihn um.

| Datei / Gruppe | W1 | W2 (I) | W3 (R) | Bemerkung |
|---|---|---|---|---|
| `scripts/a11y-audit.mjs` (neu), `scripts/lib/a11y-audit-core.mjs` (neu), `tests/a11y-audit-core.test.ts` (neu) | a | volle Matrix (Lauf, keine Änderung) | – | `scripts/lib/*-core.mjs` ist in D-33 nicht genannt → hier (a) zugewiesen |
| `tests/e2e/a11y.pw.cjs` (neu) | a | `testMatch`-Eintrag | – | (a) startet die Spec in W1 über eine Scratchpad-Konfiguration (K-9) |
| `scripts/visual-audit.mjs` | a | – | – | Routen ergänzen, axe bei 5 Breiten, erwartete 404 (K-10) |
| `app/globals.css`, `components/v2/**` (ohne BentoGrid/ComparisonTable), `components/layout/**` | a | Übergaben | – | `MegaMenu.tsx` bleibt unverändert (Open Question 3) |
| `components/feature-snippet/**` (D-10, § 7.3) | a | – | – | Mini-UI-Zeile `SupplementalScene.module.css:83` kommt als Übergabe von (b) |
| `scripts/performance-audit.mjs`, `scripts/lib/lighthouse-core.mjs` (neu), `tests/lighthouse-core.test.ts` (neu) | b | Endmessung (Lauf) | Kontrollmessung live | |
| `package.json`, `package-lock.json` (`lighthouse@13.5.0`) | b | – | – | npm-Skripte anderer Pakete nur per Übergabe |
| `app/layout.tsx` (Schriftschnitte), `components/CraftOSLogo.tsx` (SVG) | b | – | – | Logo-Besitz laut 10-UI-SPEC § Design System |
| `next.config.js`, `public/images/**`, `scripts/optimize-images.mjs` | b | – | – | nur bei Messbefund (`inlineCss`-A/B) |
| `tests/e2e/playwright.config.cjs` | b | I (`testMatch` für `a11y.pw.cjs`) | – | zwei Besitzer in verschiedenen Wellen |
| `tests/e2e/function-illustrations.pw.cjs` (Flakes `:262`, `:281`, `:476`) | b | – | – | |
| `tests/pricing-parity.test.ts`, `tests/product-register.test.ts` (Release-Helfer, Wortgrenze) | b | – | – | Zählstelle `product-register.test.ts:103` → K-1 |
| `app/rechner/**`, `components/calculators/**` | c | – | – | Logik, Feldnamen, Labels unverändert |
| `app/support/page.tsx` | c | – | – | |
| `app/{impressum,datenschutz,agb}/page.tsx`, `components/legal/Legal.tsx`, `components/legal/Legal.module.css` (neu) | c | – | – | erster Commit nur Schutztest (§ 3.3) |
| `app/not-found.tsx` | c | – | – | |
| `components/content/ContentKopf.{tsx,module.css}` (K1/K2) | c | – | – | Besitz laut 10-UI-SPEC § Design System |
| `components/v2/BentoGrid.{tsx,module.css}`, `components/v2/ComparisonTable.{tsx,module.css}` | c | Sichtprüfung 6 Kacheln | – | |
| `docs/DESIGN-V2.md` § 19 | c | Übergaben von (a)/(b) | – | |
| `tests/rechtstexte-wortlaut.test.ts` (neu), `tests/fixtures/rechtstexte/*.txt` (neu) | c | – | – | |
| `tests/kernseiten.test.ts` (Fälle für Phase-10-Seiten) oder neue Datei, neuer Gewichte-/Farbtest | c | – | – | `kernseiten.test.ts` ist in D-33 nicht genannt → (c) |
| `tests/breadcrumbs.test.ts` (Zeile `/support`) | c | – | – | nicht in D-33 → (c), siehe K-2 |
| `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/site.ts`, `lib/funktionsdetails/**` | d | – | – | |
| `lib/funktionen.ts` (`checkedAt` für `rechnungen`, `buchhaltung`) | d (Empfehlung) | – | – | nicht in D-33, steuert `lastModified` (K-5) |
| `tests/funktionsgruppen.test.ts`, `tests/funktionen-seite.test.ts`, `tests/navigation.test.ts`, `tests/funktionsdetails.test.ts`, `tests/demo.test.ts` (Schutztest), `tests/e2e/home-navigation.pw.cjs` (Z. 384, 435) | d | – | – | |
| `tests/credit-paritaet.test.ts` (neu, D-22) | d | – | – | statt Änderung an `pricing-parity.test.ts` (Research „Paketgrenzen“) |
| `docs/seo/**` (Map, Linkregister, LINKPLAN, Rohdaten, Berichte) | e | Statuspflege nur bei Bedarf | Etappenbericht Phase 10 | |
| `scripts/seo-report.mjs` (`--leaderboard`, D-37), `scripts/se-ranking-*`, `scripts/lib/se-ranking-mcp.mjs`, optional `scripts/lib/seo-report-core.mjs` (neu) + `tests/seo-report-core.test.ts` (neu) | e | – | Lauf | |
| `tests/keyword-map.test.ts`, `tests/backlink-plan.test.ts` | e | – | – | |
| `audit-report.md`, `audit-report.html` (Vorab) | e | – | Bestätigung (angehängt) | Skill hängt Wiederholungen an |
| `docs/releases/ETAPPEN-NACHWEIS-V2.md` (neu), optional `tests/etappen-nachweis.test.ts` (neu) | e (Zeilen 5–9) | – | R (Zeile 10) | |
| `docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` (neu) | e (Entwurf) | – | R (Endfassung) | |
| `app/sitemap.ts` (`pageUpdated`), `scripts/live-check.mjs` (Phase-10-Block), `tests/e2e/design-v2.pw.cjs` (Caption-Fall), Behebungen aus dem Vorab-Audit außerhalb `docs/seo/**` | – | I | – | |
| `docs/releases/PHASE-10-ROLLOUT.md` (neu) | – | – | R | |

**Regel für alle W1-Pakete:** Keine Datei außerhalb der eigenen Zeilen. Wünsche an fremde Dateien (z. B. `npm`-Skript für `a11y-audit`, `DESIGN-V2.md`-Absatz zu D-10 oder zum Logo, Menü-Präsenz der Zusatzkarten) kommen in die Übergabeliste des SUMMARY.

---

## File Classification

### Neue Dateien

| Neue Datei | Role | Data Flow | Closest Analog | Match Quality | Besitz |
|---|---|---|---|---|---|
| `scripts/a11y-audit.mjs` | script (CLI) | batch (Server → Browser → Bericht) | `scripts/visual-audit.mjs:1–155` (Schleifen, axe) + `scripts/seo-audit.mjs:17–45, 101–110` (Argumente, Exitcodes, Ergebnisdatei) | exact (Kombination) | a |
| `scripts/lib/a11y-audit-core.mjs` | utility (rein) | transform | `scripts/lib/seo-audit-core.mjs:1–4, 460–475` (reine Funktionen, `optionsFehler`) | role-match | a |
| `tests/a11y-audit-core.test.ts` | test (Vitest) | batch (Fixtures) | `tests/seo-audit-core.test.ts:1–12` | exact | a |
| `tests/e2e/a11y.pw.cjs` | test (E2E) | request-response | `tests/e2e/funktionsdetails.pw.cjs:1–46, 127–157` | exact | a |
| `scripts/lib/lighthouse-core.mjs` | utility (rein) | transform | `scripts/lib/seo-audit-core.mjs` (Form), Median-Logik aus 10-RESEARCH Pattern 1 | role-match | b |
| `tests/lighthouse-core.test.ts` | test (Vitest) | batch | `tests/seo-audit-core.test.ts` | exact | b |
| `tests/rechtstexte-wortlaut.test.ts` + `tests/fixtures/rechtstexte/{impressum,datenschutz,agb}.txt` | test (Vitest) | file-I/O + transform | `tests/breadcrumbs.test.ts:194–202` (Seiten per `import()` rendern), `tests/demo.test.ts:1–4` (`renderToStaticMarkup`) | role-match | c |
| `components/legal/Legal.module.css` | style | – | `components/content/ContentKopf.module.css` (v2-Werte), `app/globals.css` `.article-prose` (Prosa) | role-match | c |
| Gewichte-/Farbtest (z. B. `tests/phase10-darstellung.test.ts`) | test (Vitest) | batch (Dateiscan) | `tests/announcements.test.ts:7–45` (`walk`, `findHits`, Trefferliste) | exact | c |
| `tests/credit-paritaet.test.ts` | test (Vitest) | file-I/O (Release) | `tests/design-v2-components.test.ts:254–267` (`releaseSuite`, `releaseDatei`) | exact | d |
| `scripts/lib/seo-report-core.mjs` (optional) + `tests/seo-report-core.test.ts` | utility + test | transform | `scripts/lib/se-ranking-sync-core.mjs` + `tests/se-ranking-sync.test.ts:1–30` (`fakeProject`) | exact | e |
| `audit-report.md`, `audit-report.html` | Doku | – | `.claude/skills/audit/SKILL.md`, `.claude/skills/audit/references/audit-report-template.html` | exact (Skill-Vorgabe) | e |
| `docs/releases/ETAPPEN-NACHWEIS-V2.md` | Doku | – | `docs/releases/PHASE-09-ROLLOUT.md` §§ 2–9 (Quellen je Spalte) | role-match | e |
| `tests/etappen-nachweis.test.ts` (optional) | test | file-I/O | `tests/backlink-plan.test.ts:140–146` (Pflichtbegriffe in Markdown) | exact | e |
| `docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` | Doku | – | `docs/seo/reports/2026-10-23-messstand-phase10.md` (§§ 1–6), `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` | role-match | e / R |
| `docs/releases/PHASE-10-ROLLOUT.md` | Doku | – | `docs/releases/PHASE-09-ROLLOUT.md` §§ 1–15 | exact | R |

### Geänderte Dateien

| Geänderte Datei | Role | Data Flow | Analog / Muster | Match Quality | Besitz |
|---|---|---|---|---|---|
| `scripts/visual-audit.mjs` | script | batch | Bestand Z. 7–28 (Routen), Z. 84–99 (axe nur 390/1440), Z. 155 (Exit) | exact | a |
| `components/feature-snippet/IllustrationScene.module.css`, `ConnectedScene.module.css`, `SupplementalScene.module.css` | style | – | Bestand: Z. 15/22 bzw. Z. 58–59 (Deckkraft → Farbe), `SupplementalScene` Z. 83 | exact | a |
| `app/globals.css`, `components/v2/*.module.css`, `components/layout/*` (nur bei A11y-Befund) | style/component | – | `app/globals.css:110` (`:focus-visible`), Z. 64 (`scroll-padding-top`), Z. 722 (reduzierte Bewegung) | exact | a |
| `scripts/performance-audit.mjs` (`--lighthouse`) | script | batch | Bestand Z. 1–86 | partial (neuer Modus) | b |
| `app/layout.tsx` | layout (RSC) | – | Bestand Z. 12–52 (`localFont`-Listen) | exact | b |
| `components/CraftOSLogo.tsx` | component | – | `CraftOSMark` Z. 14–36 (Inline-SVG mit Pfaddaten, `role`/`aria`) | role-match | b |
| `tests/e2e/function-illustrations.pw.cjs` | test (E2E) | event-driven | Z. 262–279 (deterministische Wartebedingung `data-timer="cleared"`) | exact | b |
| `tests/pricing-parity.test.ts` | test | file-I/O | Z. 150 (`testKontext`), Z. 264–273 (`describe.skipIf`) → `releaseSuite` | exact | b |
| `tests/product-register.test.ts` | test | file-I/O | Z. 30, Z. 163 (`skipIf`) → `releaseSuite`; Z. 103 (Zählung) | exact | b |
| `package.json`, `package-lock.json` | config | – | – | – | b |
| `components/calculators/CalculatorPage.tsx` | component (RSC) | request-response | `app/gewerke/page.tsx:22–55`, `ContentKopf` | exact | c |
| `components/calculators/Calculators.module.css` | style | – | 10-UI-SPEC § 1.3 Token-Tabelle; Karten wie `components/v2/LinkKarten.module.css` | role-match | c |
| `app/rechner/page.tsx`, `app/rechner/stundensatz/page.tsx`, `app/rechner/angebotskalkulation/page.tsx` | page (RSC) | request-response | `app/gewerke/page.tsx`, `components/v2/Abschnitt.tsx:11–24` | exact | c |
| `app/support/page.tsx` | page (RSC) | request-response | `app/gewerke/page.tsx:22–55`, `components/content/ContentIndex.tsx:59–61, 132` | exact | c |
| `components/legal/Legal.tsx` | component (RSC) | – | Bestand Z. 8–61, Kopf `ContentKopf` | exact | c |
| `app/{impressum,datenschutz,agb}/page.tsx` | page (RSC) | – | Bestand (nur Klassen an Links/Hinweisabsätzen) | exact | c |
| `app/not-found.tsx` | page (RSC) | – | `app/gewerke/page.tsx` (Kopf + Abschnitt + `LinkKarten`) | exact | c |
| `components/content/ContentKopf.tsx` + `.module.css` | component (RSC) | – | Bestand Z. 8–106 (Props, Asserts, Markup) | exact | c |
| `components/v2/BentoGrid.module.css` | style | – | Bestand Z. 48 (`.body`), Z. 146 (`@media 768`) | exact | c |
| `components/v2/ComparisonTable.tsx` + `.module.css` | component | – | Bestand Z. 86–90 bzw. Z. 2, 8, 15, 41 | exact | c |
| `tests/kernseiten.test.ts` (oder neue Datei), `tests/breadcrumbs.test.ts` | test | batch | `tests/kernseiten.test.ts:485–500`, `tests/breadcrumbs.test.ts:194–202` | exact | c |
| `docs/DESIGN-V2.md` | Doku | – | § 18 (Phase 9) als Gliederungsvorbild | exact | c |
| `lib/product-register.ts` | data | – | Bestand Z. 348–367 (`advertised`) | exact | d |
| `lib/funktionsgruppen.ts` | data-Modul | transform | Bestand Z. 148–163, 182–191, 217–277 | exact | d |
| `lib/funktionsdetails/buchhaltung.ts`, `rechnung.ts` | data | – | `buchhaltung.ts:95–103`, `rechnung.ts:65–101` | exact | d |
| `lib/funktionsdetails/index.ts` (`INHALTE`) | utility | transform | Z. 46–57 (Spread), Z. 105–112 (`ersteDoppelung`) | exact | d |
| `lib/site.ts` (Credit-Wert, D-22) | data | – | Z. 19–29 (Belegkommentar, `startCredits`, `creditWertEuro`) | exact | d |
| `lib/funktionen.ts` (`checkedAt`) | data | – | Bestand Feld Z. 53 | exact | d (Empfehlung) |
| `tests/funktionsgruppen.test.ts`, `tests/funktionen-seite.test.ts`, `tests/navigation.test.ts`, `tests/funktionsdetails.test.ts`, `tests/demo.test.ts`, `tests/e2e/home-navigation.pw.cjs` | test | batch | Bestand (Zählstellen unten) | exact | d |
| `scripts/seo-report.mjs` | script | request-response (MCP) | Bestand Z. 1–28, 97–146 | exact | e |
| `docs/seo/backlink-register.json`, `LINKPLAN.md`, `keyword-map.json`, `KEYWORD-MAP.md` | config/Doku | – | LINKPLAN § 4 (Übergabe 1, Z. 109–170), § 5 (Statuspflege, Z. 171) | exact | e |
| `app/sitemap.ts` | config | – | Bestand Z. 8–24 (`pageUpdated`) | exact | I |
| `scripts/live-check.mjs` | script | request-response | Bestand Z. 56 (`check`), Z. 520–575 (Phase-9-Block) | exact | I |
| `tests/e2e/design-v2.pw.cjs` (Caption 360 px) | test (E2E) | – | Bestand (Breitenfälle, CLS-Messung Z. 338–368) | exact | I |

---

## Pattern Assignments

### `scripts/a11y-audit.mjs` + `scripts/lib/a11y-audit-core.mjs` (script + utility, Paket a)

**Analog 1 – Seitenlauf:** `scripts/visual-audit.mjs`. Die Import-, Kontext- und Scrollmuster werden übernommen, die Routenliste nicht (Sitemap statt Liste):
```js
import { chromium, webkit } from "@playwright/test";               // Z. 1
import AxeBuilder from "@axe-core/playwright";                       // Z. 2
const origin = process.env.AUDIT_ORIGIN || "http://localhost:3101"; // Z. 4 – Port 3101 passt zu wt-10a
…
const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", deviceScaleFactor: 1 }); // Z. 38–42
const response = await page.goto(origin + route, { waitUntil: "networkidle" });   // Z. 48–50
await page.evaluate(() => document.fonts.ready);                                   // Z. 51
for (let y = 0; y < (await page.locator("body").evaluate((el) => el.scrollHeight)); y += 800) { … }  // Z. 52–61
```
Ein `BrowserContext` je Engine und Breite, Seiten darin nacheinander bzw. mit `--concurrency=2` (10-RESEARCH „Laufzeit und Parallelisierung“). Browser je Shard neu starten (Pitfall 11).

**Analog 2 – Sitemap vom laufenden Server:** `tests/e2e/funktionsdetails.pw.cjs:30–39`:
```js
const response = await request.get('/sitemap.xml')
const xml = await response.text()
const details = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname) …)]
```
→ im Skript per `fetch(origin + "/sitemap.xml")`, dazu `/styleguide` und ein unbekannter Pfad (`/gibt-es-nicht-a11y`) = 158 Seiten (D-05). Für den 404-Pfad ist Status 404 **erwartet**, nicht ein Fehler.

**Analog 3 – Argumente, Exitcodes, Ergebnisdatei:** `scripts/seo-audit.mjs`:
```js
const args = process.argv.slice(2);
const liste = (name) => { const a = args.find((x) => x.startsWith(`--${name}=`)); return a ? a.slice(name.length + 3).split(",").map((s) => s.trim()).filter(Boolean) : null; };  // Z. 17–27
const optionen = optionsFehler({ only, paths: pfadFilter ?? null, alleRegeln: ALLE_REGELN, alleSeiten });  // Z. 41
if (optionen.length) { for (const f of optionen) console.error(`Fehler: ${f}`); process.exit(2); }         // Z. 42–45
fs.writeFileSync(path.join(root, "test-results/seo-audit.json"), JSON.stringify(ergebnis, null, 2));       // Z. 102
process.exitCode = !reportOnly && verstoesse.length > 0 ? 1 : 0;                                             // Z. 110
```
→ `--paths=`, `--widths=`, `--engines=`, `--shard=k/n`, `--concurrency=`, `--merge`; Teilberichte `test-results/a11y/report-<k>-of-<n>.json`, `--merge` schreibt `test-results/a11y/report.json` und bewertet das Gate (Exit 1). Unbekannte Optionen und Pfade außerhalb der Sitemap → Exit 2 mit MSYS-Hinweis wie `seo-audit-core.mjs:470–472`. Kopfkommentar mit Aufruf und Verweis auf die Kern-Datei wie `seo-audit.mjs:1–7`.

**Analog 4 – reine Funktionen:** `scripts/lib/seo-audit-core.mjs:1–4` („Kein Dateizugriff, kein Netz“). In `a11y-audit-core.mjs` liegen `matrix`, `teil`, `gate`, `grossText` (Filter `expectedContrastRatio === "4.5:1"`) und `mergeReports` (10-RESEARCH „Code Examples“). Die Tastatur-Auswertung (Kandidaten, Ruhezustand-Signatur, Zyklus) läuft im Seitenkontext; als reine Funktionen gehören in die Kern-Datei nur die Bewertung der gesammelten Daten (z. B. `tastaturFehler({ kandidaten, fokussiert, signaturen })`).

**axe-Aufruf (neu, Reihenfolge verbindlich):** 10-RESEARCH Pattern 2 – `.options({ rules: { "color-contrast-enhanced": { enabled: true } } })` **vor** `.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])`. Das Bestandsmuster `severeAxe` (`funktionsdetails.pw.cjs:41–46`) ruft nur `.withTags([...AA])` auf und bleibt in den alten Specs unverändert.

**Animationszustand (D-05/D-10):** zweiter Kontext ohne `reducedMotion` nur für die 22 Snippet-Seiten. Warten auf `[data-feature-illustration] [data-running="true"]` bzw. Attribut `data-running` am Snippet (`components/feature-snippet/FeatureSnippet.tsx:121` setzt `data-phase`, `data-stage`, `data-running`), dann `color-contrast` in drei `data-phase`-Zuständen.

**Test** `tests/a11y-audit-core.test.ts`: Muster `tests/seo-audit-core.test.ts:1–12` (benannte Importe aus `../scripts/lib/…mjs`, Fixtures als Objekte). Fälle: Shard-Teilung deckt die Matrix ohne Doppelung ab, Gate wertet `serious`/`critical` und `color-contrast` jeder Wirkung, ignoriert `color-contrast-enhanced` mit `7:1`, zählt `4.5:1`; Fokus am Vorfahren gilt als sichtbar (Fixture „Karte mit `:focus-within`“).

---

### `tests/e2e/a11y.pw.cjs` (E2E, Paket a)

**Analog:** `tests/e2e/funktionsdetails.pw.cjs`.

**Kopf** (Z. 1–3, 5–12, 24–27):
```js
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
/** … Testnamen-Präfixe („Tastatur:“, „Vorlage:“) erlauben das Filtern per -g. Läuft nur lokal gegen next start; externe Requests werden abgebrochen. */
test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})
```

**Breitenschleife ohne eigene Projekte** (Z. 143–157): `test.skip(testInfo.project.use.hasTouch, …)`, dann `for (const width of [360, 390, 768, 1024, 1440]) { await page.setViewportSize({ width, height: 900 }); … }` und Sammelliste `findings` mit `expect(findings).toEqual([])`.

**Tastaturfälle** (D-07, 10-UI-SPEC § 9.2): Sprunglink `a.skip-link[href="#inhalt"]` (`app/layout.tsx:127–128`); Menü/Drawer mit Enter/Leertaste, Esc und Rückfokus (Verhalten aus `components/layout/HeaderShell.tsx:133–158`, Buttons „Menü öffnen“/„Menü schließen“ wie `funktionsdetails.pw.cjs:394–401`); `summary` der `FaqList`; Rechnerfelder (Labels wörtlich, z. B. „Personalkosten pro Jahr in Euro“); Pause-Knopf „Animation pausieren“ nur ohne reduzierte Bewegung (Muster `function-illustrations.pw.cjs:476–479`); Tabellen-Scrollbereich `role="region"` mit `tabIndex={0}` (`components/v2/ComparisonTable.tsx:88`).

**404-Fall** (Übergabe von (c), 10-RESEARCH „Status und Noindex“):
```js
const res = await page.goto('/gibt-es-nicht-a11y')
expect(res.status()).toBe(404)
await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
```
Dazu: keine `nav[aria-label="Brotkrumen"]`, drei Karten mit `href` `/`, `/hilfe`, `/funktionen`.

---

### `scripts/visual-audit.mjs` (script, Paket a)

**Bestand ändern, nicht ersetzen:**
- Z. 7–28 Routen um `/rechner`, `/support`, `/impressum`, `/datenschutz`, `/agb`, `/gibt-es-nicht`, eine Gewerke-Detailseite (z. B. `/gewerke/elektriker`) und eine Hilfekategorie (`/hilfe/kategorie/einrichtung`) ergänzen (D-14).
- Z. 84–99: Bedingung `width === 390 || width === 1440` entfernen (axe bei allen fünf Breiten, D-08); Tags wie im Bestand lassen oder auf das Pattern-2-Set heben (dann `.options()` zuerst).
- Z. 155: `x.status !== 200` gilt nicht für den 404-Pfad (K-10).

---

### FeatureSnippet-Dimmstufe (style, Paket a, D-10)

**Bestand:**
```css
/* IllustrationScene.module.css */
… transition: outline-color .18s, background-color .3s, border-color .3s, opacity .3s; }          /* Z. 8 */
.stockMovement { … background: var(--color-ink-100); opacity: .5; }                                /* Z. 15 */
.stockMovement[data-active=true] { opacity: 1; background: var(--color-primary-50); }              /* Z. 22 */
/* ConnectedScene.module.css */
.opening { … opacity: .35; transition: opacity .3s; }                                             /* Z. 58 */
.opening[data-active=true] { opacity: 1; border-style: solid; }                                    /* Z. 59 */
```
→ laut 10-UI-SPEC § 8: `opacity: 1`, inaktiver Text `#62626E`, aktiver Text `#17171C`; Übergang über `color`/`background-color` (300 ms). Die bestehende Hervorhebung des aktiven Zustands (Fläche `--color-primary-50`, `border-style: solid`) bleibt. Gestrichelte Rahmen in `#D28A13` sind Nicht-Text und bleiben.

**Mini-UI-Gewichte (Übergabe von (b), 10-UI-SPEC § 7.3):** `SupplementalScene.module.css:83` `font-weight: 500` → `400`. Die Zeilen mit `700` (`SupplementalScene.module.css:55`, `DeviceFrame.module.css:26`) nutzen General Sans und damit schon heute den 600er-Schnitt; sie bleiben laut § 7.3 unverändert.

**Prüfung:** Keine Bestandstests prüfen diese Deckkraft (geprüft: `tests/**/*.ts`, `tests/e2e/*.cjs`). Nachweis über `a11y-audit.mjs` im Animationszustand.

---

### `scripts/performance-audit.mjs` `--lighthouse` + `scripts/lib/lighthouse-core.mjs` (Paket b)

**Analog – Bestand** (`scripts/performance-audit.mjs`): Herkunft per `AUDIT_ORIGIN` (Z. 3, Standard `http://localhost:3101` → im Worktree `wt-10b` auf 3102 setzen), Routen per `AUDIT_ROUTES` (Z. 6–20), drei Läufe je Route (Z. 21), Ergebnisdatei mit Umgebungsangabe (Z. 74–86):
```js
await fs.writeFile("test-results/performance.json", JSON.stringify({
  environment: "Local production server; Chromium; 390x844; cold cache; 4x CPU; 150ms latency; 1.6Mbit/s download. …",
  results,
}, null, 2));
```
→ Lighthouse-Modus als eigener Zweig (`if (process.argv.includes("--lighthouse"))`) vor dem Bestand, gleiche Umgebungsangabe-Konvention („Labordaten, mobil, lokal, Median aus 3 Läufen, URL“), Ausgabe `test-results/lighthouse/<route>-<lauf>.json` und `test-results/lighthouse/summary.json`, `process.exitCode = 1` bei Gate-Verstoß. Lauf-Code laut 10-RESEARCH Pattern 1 (`chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless=new"] })`, `lighthouse(url, { port, output: "json", logLevel: "error", onlyCategories: ["performance"] })`, `computeMedianRun`/`filterToValidRuns`).

**Bestandsmodus bleibt** (CLS ohne reduzierte Bewegung, 07 IN-05 Teil 2): die acht Snippet-Seiten (`SNIPPET_SLUGS` in `funktionsdetails.pw.cjs:15`) in die Routenliste Z. 6–20 aufnehmen. Bindungen an andere Pakete: Z. 57–58 klickt „Menü öffnen“/„Menü schließen“ ((a) darf die Namen nicht ändern), Z. 59–62 füllt „Personalkosten pro Jahr in Euro“ ((c) darf das Label nicht ändern).

**Kern + Test:** `lighthouse-core.mjs` mit `median`, `bewerte({ score, lcp })` (Score ≥ 95, LCP < 2.500 ms), `zusammenfassung`; `tests/lighthouse-core.test.ts` nach `tests/seo-audit-core.test.ts` (Fixtures mit `categories.performance.score` und `audits["largest-contentful-paint"].numericValue`, ein Lauf mit `runtimeError`).

**Installation** (unter Sperre): `npm install --save-dev --save-exact lighthouse@13.5.0`, danach `npm ls axe-core` (Soll nur 4.13.0, Pitfall 9).

---

### `app/layout.tsx` und `components/CraftOSLogo.tsx` (Paket b, 10-UI-SPEC § 7)

**`app/layout.tsx` Bestand Z. 12–32** (Clash) und **Z. 33 ff.** (General): Einträge `clash-display-500.woff2` (Z. 15–16), `clash-display-700.woff2` (Z. 25–26) und `general-sans-500.woff2` (Z. 41–42) aus den `src`-Listen entfernen; `display: "swap"`, `variable` und die übrigen Schnitte bleiben. Die Dateien in `public/fonts/` bleiben liegen (D-04).

**`CraftOSLogo.tsx` Analog im selben File:** `CraftOSMark` (Z. 14–36) zeigt das Muster „Inline-SVG mit Pfaddaten als Konstante“ (`LOGO_PATH` Z. 4–5). Der Schriftzug Z. 57–62:
```tsx
<div className={cn('flex flex-col', textSize)}>
  <span className="font-display font-bold leading-none tracking-tight text-current">CraftOS</span>
  <span className="text-xs font-medium text-zinc-400">Handwerkersoftware</span>
</div>
```
→ ein `<svg aria-hidden="true" focusable="false" width=… height=… viewBox=…>` mit zwei `<path>` (`fill="currentColor"` bzw. Literal aus `text-zinc-400` mit Kommentar), Pfaddaten als benannte Konstanten wie `LOGO_PATH`, Kommentar mit Skriptname, Schriftdatei, Größe und Laufweite. Die Größenvarianten `sm`/`md`/`lg` (Z. 46–51) gelten weiter; Header und Fußleiste nutzen nur eine Größe, die SVG-Maße je Variante messen oder per `viewBox` skalieren. Kein `font-bold`/`font-medium` mehr in der Datei.

**Abnahme:** Screenshot-Vergleich (Referenz vor der Änderung) und Request-Log laut § 7.4 als Skript im Scratchpad; Ergebnis im SUMMARY. Keine committeten Screenshot-Baselines (plattformabhängig).

---

### Flakes in `tests/e2e/function-illustrations.pw.cjs` (Paket b, D-14)

**Vorbild im selben File, Z. 268–271** (für „außerhalb des Viewports“ schon behoben):
```js
await expect(illustration).toHaveAttribute('data-running', 'false')
// Das Attribut wechselt beim Commit, die Effekt-Bereinigung (clearTimeout) läuft erst danach …
await expect(illustration).toHaveAttribute('data-timer', 'cleared')
```
- **Z. 281–302 (Tab-Sichtbarkeit):** Nach Z. 292 fehlt dieselbe Bedingung `data-timer="cleared"` vor `page.clock.runFor(25_000)` (Z. 294) → einfügen.
- **Z. 476–504 (Pause):** feste Wartezeiten `waitForTimeout(120/200/500/250)` und Poll-Fenster 20 s (Z. 480). Deterministisch: nach `toggle.press('Space')` auf `data-running="false"` **und** `data-timer="cleared"` warten, Transform-Vergleich per `expect.poll` statt fester Pause; für die Bewegung vorher bzw. nachher ein längeres Poll-Fenster mit „Wert ändert sich“.
- 05 Nr. 2 (WebKit „außerhalb des Viewports“) ist durch Z. 271 abgedeckt; im Plan nur Nachweis durch Einzelwiederholung.

---

### `tests/pricing-parity.test.ts` und `tests/product-register.test.ts` (Paket b, D-14)

**Wortgrenze** (`pricing-parity.test.ts:150`):
```ts
const testKontext = /test|kostenlos|ohne zahlungs/i;   // trifft „Spätestens“ (09-09)
```
→ `/\btest|kostenlos|ohne zahlungs/i` reicht nicht für Komposita wie „Testtage“ (Z. 147 „Komposita … zählen mit“); Muster daher als Wortanfang nach Nicht-Buchstabe: `/(?<!\p{L})test|kostenlos|ohne zahlungs/iu` (Unicode-Flag wie Z. 148). Fall „Spätestens“ als roter Test zuerst.

**Release-Helfer** (Vorbild `tests/design-v2-components.test.ts:254–267`):
```ts
import { pruefeReleaseStand, releaseDatei, releaseSuite } from "./release-repos";
const suite = releaseSuite("Snapshot ist aktuell", ["web"]);
describe.skipIf(suite.skip)(suite.titel, () => { it("…", () => { pruefeReleaseStand("web"); … }); });
```
Ersetzt `describe.skipIf(!fs.existsSync(WEB))` in `pricing-parity.test.ts:264–265` und `it.skipIf(…)`/`describe.skipIf(…)` in `product-register.test.ts:30, 163`. `RELEASE_PFLICHT` (`tests/release-repos.ts:21`) macht das Überspringen im Pflichtmodus sichtbar.

**Zählstelle `product-register.test.ts:103`** (`toHaveLength(8)`) → K-1.

---

### Rechner: `CalculatorPage.tsx`, `Calculators.module.css`, `app/rechner/**` (Paket c, D-15, 10-UI-SPEC § 1)

**Bestand `CalculatorPage.tsx`:** eigener Kopf mit Brotkrumen (Z. 19–36), Rechnernavigation (Z. 37–54), `CalculatorHelp` (Z. 61–74), `CalculatorCta` (Z. 76–91, wird nicht mehr gerendert, Funktion bleibt laut § 12 erhalten).

**Analog Seitenaufbau:** `app/gewerke/page.tsx:22–55` und `components/v2/Abschnitt.tsx:11–24`:
```tsx
<section data-abschnitt={id} aria-labelledby={id} className={`${ABSCHNITT_FLAECHE[surface]} py-12 md:py-16 lg:py-24`}>
  <div className="site-container">{children}</div>
</section>
…
<div data-abschnitt="cta"><CtaBand title={…} text={…} secondary={…} /></div>
```
**Kopf** (§ 1.1) über `ContentKopf` (Bestand `components/content/ContentKopf.tsx:65–106`):
```tsx
<ContentKopf crumbs={crumbsFor(current ? "/rechner/" + current : "/rechner")} eyebrow="Rechner" h1={zielwerte(pfad).h1}
  id="rechner-titel" lead={intro} hinweis={{ text: "Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.", icon: LockKeyhole }} />
```
`crumbsFor`-Aufruf wörtlich aus Z. 26. Rechnernavigation (`nav aria-label="Rechner auswählen"`, `aria-current="page"`) Z. 38–53 bleibt im Markup, nur unter den Kopf in den Abschnitt `rechner`. `CalculatorHelp` erhält `id` und Fläche (§ 1.2, J6); H2 mit `id={id}`, `aria-labelledby={id}` am `section` wie `Abschnitt`.

**Werkzeugkarten auf `/rechner`** (§ 1.4): seiteneigen in `Calculators.module.css`, Karte mit gestrecktem Link und Fokus über `:focus-within` nach `components/v2/LinkKarten.tsx:56–78` bzw. `FeatureCard.module.css` (Bestand `.card:focus-within`, `.link::after { inset: 0 }`, 09-PATTERNS G9).

**`FaqList`** für die Rechner-FAQ ohne neues FAQPage-Schema (A7); `answerMax` Standard. **`CtaBand`** mit Titel „Von der Kalkulation zum Angebot.“, Text „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“, Sekundärlink `/funktionen/angebote` (J8).

**CSS (§ 1.3):** Token-Tabelle abbilden; die fünf `font-weight: 500` (Z. 182, 216, 252, 273, 341) auf 400/600; eigene Fokusregeln entfallen (globale Regel `app/globals.css:110`). Umbruchgrenzen 1024/768.

**Unverändert lassen (harte Bindungen):** Feldnamen und Labels in `HourlyRateCalculator.tsx`/`OfferCalculator.tsx`/`CalculatorFields.tsx` (`tests/calculators.test.ts`, `tests/calculator-hydration.test.ts`, `browser-functional.pw.cjs:37–142`, `performance-audit.mjs:59–62`), JSON-LD `CollectionPage`/`WebApplication`, `noscript`-Hinweise. Die Rechnerseiten haben keine Antwortregel (`mitAntwortRegel`, `scripts/lib/seo-audit-core.mjs`), daher `lead` statt `answer`.

---

### `app/support/page.tsx` (Paket c, D-16, 10-UI-SPEC § 2)

**Bestand Z. 1–59:** `PageHero` (Z. 12–17), zwei Spalten mit Altklassen (Z. 18–55). Alle Sätze bleiben wörtlich und verteilen sich auf Bausteine.

**Analog:** `app/gewerke/page.tsx` (Kopf → Abschnitt mit `SectionHeader` + `LinkKarten` → `CtaBand`) und `components/content/ContentIndex.tsx:59–61` (Karten mit `meta` und `iconFeld: true`):
```tsx
<Abschnitt id="kontakt" surface="white">
  <SectionHeader id="kontakt" title="Direkt zum CraftOS Support." lead="Nennen Sie die betroffene Ansicht, …" />
  <LinkKarten label="Kontakt" surface="warm" columns={2}
    items={[{ href: "mailto:" + site.email, title: site.email, label: "E-Mail", text: "…", icon: <Mail size={24} />, iconFeld: true }]} />
</Abschnitt>
```
`LinkKarten` nutzt `next/link` (`LinkKarten.tsx:68`), `mailto:` ist erlaubt (10-RESEARCH Bausteintabelle). Meta „{n} Anleitungen“/„{n} Artikel“ aus `getContentList` macht die Seite `async` → K-2.

---

### Rechtsseiten: `components/legal/Legal.tsx`, neue `Legal.module.css`, `app/{impressum,datenschutz,agb}/page.tsx` (Paket c, D-09/D-17, 10-UI-SPEC § 3)

**Bestand `Legal.tsx`:**
```tsx
<p className="spec-label text-primary-600">{eyebrow}</p>                                        // Z. 29 → ContentKopf (.v2-eyebrow)
<h1 className="mt-3 font-display text-4xl font-extrabold text-ink-900">{title}</h1>             // Z. 30 → ContentKopf
{updated && <p className="mt-2 font-mono text-xs text-ink-400">Stand: {updated}</p>}            // Z. 31 → stand
<div className="legal space-y-8 text-[15px] leading-relaxed text-ink-700">{children}</div>     // Z. 35 → data-rechtstext
<h2 className="font-display text-xl font-bold text-ink-900">{heading}</h2>                      // Z. 44 → 32/600
<div className="rounded-xl border border-ink-200 bg-ink-50 p-5"> …                              // Z. 53 → DataBlock v2
```
**Reihenfolge der Commits (Pitfall 6, § 3.3):** 1. nur `data-rechtstext` an Z. 35, `tests/rechtstexte-wortlaut.test.ts` und die drei Referenzdateien aus dem unveränderten Stand; 2. Stile.

**Schutztest-Analog:** `tests/breadcrumbs.test.ts:194–202` lädt Seiten per `await import("@/app/…/page")` und rendert mit `renderToString(createElement(…default))`; `tests/demo.test.ts:1–4` zeigt `renderToStaticMarkup`. Textnormalisierung laut 10-RESEARCH Pattern 4 plus Entities (`&amp;`, `&nbsp;`, `&#x27;`, `&quot;`) und der Fehlertext aus § 3.3 wörtlich.

**Kontrastkorrekturen** nur über Klassen: `/impressum` Z. 76, `/datenschutz` Z. 77 (`font-semibold text-primary-600` entfernen, Linkregel aus `Legal.module.css`), `/datenschutz` Z. 84 und `/agb` Z. 90 (`text-ink-400` → Darstellung `#62626E`). Am Text ändert sich nichts.

---

### `app/not-found.tsx` (Paket c, D-18, 10-UI-SPEC § 4)

**Bestand Z. 1–27** (Altklassen `section-space`, `eyebrow`, `section-intro`, `btn-cta`, `btn-secondary`, `<br />` in der H1). **Analog:** `app/gewerke/page.tsx` mit `ContentKopf crumbs={null}` (K1) und `LinkKarten surface="warm" columns={3}` mit `iconFeld` (Icons `House`, `BookOpen`, `LayoutGrid`). Kein `CtaBand` (J10). Status 404 und `noindex` setzt Next selbst; Fall in `a11y.pw.cjs` per Übergabe an (a).

---

### `components/content/ContentKopf.tsx` + `.module.css` (Paket c, K1/K2)

**Bestand Z. 8–32 (Props), Z. 52–63 (Asserts), Z. 65–106 (Markup).**
- K1: `crumbs: Crumb[] | null`; Z. 72–74 nur rendern, wenn `crumbs !== null`. Bei `null` eigener Abstand oben (48/64/64). Der Grep-Test „`crumbs={null}` nur in `app/not-found.tsx`“ gehört in den neuen Darstellungstest von (c).
- K2: neue Prop `hinweis?: { text: string; icon: LucideIcon }`, lokale Konstante `HINWEIS_MAX = 80` (nicht in `components/v2/budgets.ts`, Besitz (a)), Assert nach Z. 63 mit dem Fehlertext „ContentKopf: hinweis hat {n} von 80 Zeichen – Satz kürzen.“ Muster: `charCount` aus `budgets.ts` wie Z. 52–53. Markup nach Z. 86: `<p data-hinweis className={s.hinweis}><Icon size={16} aria-hidden="true" />{text}</p>`.
- Bestehende Nutzer (`components/content/ArticlePage.tsx`, `ContentIndex.tsx:132`) bleiben typkompatibel. Bestandstests `tests/design-v2-components.test.ts:927–1006` und `tests/content-vorlage.test.ts:148, 403, 471` müssen grün bleiben.

---

### `components/v2/BentoGrid.module.css` und `ComparisonTable.{tsx,module.css}` (Paket c, D-19, 10-UI-SPEC § 6)

**Bento (J3):** Bestand `.tile` (Z. 15), `.tile:focus-within` (Z. 44), `.body` (Z. 48), `@media (min-width: 768px)` (Z. 146), Phone-Regeln (Z. 192–209). Neue Regel aus § 6.1 in den bestehenden 768er-Block. **Messung:** B10-Verfahren aus `tests/e2e/funktionsdetails.pw.cjs:264–329` (`measure(t)`: Innenhöhe minus Inhalt = `leer`) als Skript im Scratchpad, Ergebnis unter `test-results/bento-b10/`. Die Grenze `B10_MAX_LEER = 48` (Z. 267) im Bestandstest bleibt gültig.

**Caption (J4):** Bestand `ComparisonTable.tsx:86–90`:
```tsx
<div className={s.root}>
  <p className={s.hint}>Zum Vergleichen seitlich wischen</p>
  <div className={s.scroll} role="region" aria-label={caption} tabIndex={0}>
    <table …><caption className={s.caption}>{caption}</caption>
```
→ `<p data-caption aria-hidden="true" className={s.caption}>{caption}</p>` vor `.hint`, `<caption className="sr-only">`. Bindungen, die grün bleiben müssen: `tests/design-v2-frames.test.ts:128, 140` (`<caption>` mit Text, `aria-label` = Caption), `tests/preise-seite.test.ts:406` (`html.indexOf("<caption")` trifft das echte `<caption>`, nicht `data-caption`), `browser-functional.pw.cjs:167` (`table` mit `caption`-Kind). Der Caption-Text steht danach zweimal im HTML; Tests, die Textvorkommen zählen, vorher per Grep prüfen.

**Silbentrennung `/preise` (D-19 (3)):** erledigt (`app/globals.css`, 09-09 `7b1ed70`); nur Sichtnachweis.

---

### Zusatzkarten Kassenbuch und § 13b (Paket d, D-21, 10-UI-SPEC § 5)

**`lib/product-register.ts:348–367`:** `advertised: false` → `true` für „Kassenbuch“ und „Rechnung nach § 13b“; Kommentare Z. 349–350 und Z. 357–358 („im Mega-Menü“) an Open Question 3 anpassen (Menü zeigt keine Extras).

**`lib/funktionsgruppen.ts`:** `REGISTER_IDS` (Z. 182–191) um `Kassenbuch: "kassenbuch"` und `"Rechnung nach § 13b": "rechnung-13b"`; `ZUSATZ` (Z. 217–275) nach dem Muster:
```ts
angebotsunterschrift: {
  gruppe: "angebot",
  name: "Angebotsunterschrift online",
  icon: Signature,
  benefit: "Kunden nehmen Ihr Angebot online an und unterschreiben es oder senden eine Ablehnung.",
  target: { href: "/funktionen/angebote", kind: "funktion", label: "Angebote & Kalkulation" },
},
```
→ `"rechnung-13b"` (`gruppe: "rechnung"`, `ReceiptText`, Ziel `/funktionen/rechnungen`, Label „Rechnungen“) und `kassenbuch` (`gruppe: "buchhaltung"`, `Wallet`, Ziel `/funktionen/buchhaltung`, Label „Buchhaltung & DATEV“); Nutzensätze wörtlich aus 10-UI-SPEC § 5. Reihenfolge der Tabelle = Gruppenreihenfolge (Z. 216). Kommentar Z. 157–163 („Rechnung, Planung und Buchhaltung haben danach keine Zusatzfunktion mehr“) korrigieren.

**Kacheln am Ziel:** `lib/funktionsdetails/buchhaltung.ts:95–103` (Kassenbuch, `wide`) erhält `zusatz: "kassenbuch"`, `href` bleibt. `lib/funktionsdetails/rechnung.ts:68–101` erhält eine `wide`-Kachel (Muster der Nachbarn Z. 87–92) **zwischen „Zahlungen zuordnen“ (Z. 81–86) und „Berichte abrechnen“ (Z. 87–92)**, damit die Folge `md·sm·sm·wide·wide·wide` entsteht (die Formulierung „nach Kontrolliert fertigstellen“ in § 5 meint diese Stelle). Builder-Regeln, die greifen: `zusatz` muss in `ZUSATZ_IDS` liegen (`index.ts:323–327`), Zusatz-Kachel nicht `sm` (Z. 337–339), `textLarge`-Budget und ein Satz (Z. 340–344), höchstens eine `grenze` (Z. 330–335).

**Zähltests gleichziehen (gleicher Plan):**
- `tests/funktionsgruppen.test.ts:330–342`: `beworben` 8 → 10, `Set`-Größe 8 → 10, Gruppen mit Extras `["angebot", "rechnung", "buchhaltung", "baustelle", "team"]` in Gruppenreihenfolge, 30 → 32 Einstiege; `ERWARTETE_GRUPPEN` (ab Z. 47) für `rechnung`/`buchhaltung`.
- `tests/funktionen-seite.test.ts:99–101` (30 → 32), Z. 131–132 (Gruppen mit „Weitere Funktionen“), Z. 151–152 (8 → 10).
- `tests/navigation.test.ts:81–86` (8 → 10).
- `tests/e2e/home-navigation.pw.cjs:384` (`toHaveLength(30)` → 32) und Testname Z. 435.
- `tests/funktionsdetails.test.ts`: `ERWARTET.rechnungen` (ab Z. 417; `anordnung`, `zusatz: ["rechnung-13b"]`, `hrefs`) und `ERWARTET.buchhaltung` (ab Z. 478; `zusatz: ["kassenbuch"]`); Kommentar Z. 1432–1437 („§ 13b hat bewusst keine Detailseite“) anpassen.
- `tests/product-register.test.ts:103` → K-1 (nicht im Besitz von (d)).
- `lib/llms.ts` liest keine Extras (Grep ohne Treffer), `llms.txt` ändert sich nicht; `tests/llms.test.ts` bleibt unberührt.

---

### `INHALTE` mit Doppel-Schutz (Paket d, D-24)

**Bestand `lib/funktionsdetails/index.ts:50–57`** (Objekt-Spread, letzter gewinnt still) und `ersteDoppelung` (Z. 105–112). Muster:
```ts
const MODULE = [angebotInhalte, planungInhalte, baustelleInhalte, rechnungInhalte, buchhaltungInhalte, teamInhalte];
const doppelt = ersteDoppelung(MODULE.flatMap((m) => Object.keys(m)));
if (doppelt) throw new Error(`Funktionsdetail: Slug ${doppelt} steht in mehreren Inhaltsmodulen – …`);
export const INHALTE = Object.assign({}, ...MODULE);
```
`ersteDoppelung` ist eine Funktionsdeklaration und damit vor Z. 50 nutzbar. Roter Test zuerst in `tests/funktionsdetails.test.ts` (Fremdtabelle über `getFunktionsdetailAus`, Z. 439–471, bzw. eine exportierte Hilfsfunktion `vereinigeInhalte(module)`).

---

### ProductDemo-Schutztest (Paket d, D-23)

**Bestand `tests/funktionsdetails.test.ts:1424–1430`** prüft nur `components/funktionen/FunktionsDetail.tsx`. Ausweitung auf alle Dateien unter `app/` mit dem Dateiscan aus `tests/announcements.test.ts:7–45` (`walk`, Trefferliste `datei:zeile`, `expect(hits).toEqual([])`). Ort laut D-33: `tests/demo.test.ts` (nur Schutztest, Datei importiert die Demo selbst in Z. 4 – der neue `describe` darf das, die Prüfung gilt nur `app/**`).

---

### Credit-Wert Lagerfoto (Paket d, D-22)

**`lib/site.ts:19–29`** (Belegkommentar über den Konstanten, Werte als benannte Exporte):
```ts
// Preise, Speicher und Credits entsprechen src/lib/constants.ts und src/lib/… der Web-App (origin/release); geprüft durch tests/pricing-parity.test.ts …
export const startCredits = 150;
export const creditWertEuro = 0.01;
```
→ datierter Höchstwert, z. B. `export const lagerfotoCredits = [{ ab: null, max: 2 }, { ab: "2027-01-01", max: 3 }] as const;` mit Beleg `web:supabase/functions/_shared/aiPricing.ts` (`'analyze-inventory-photo'`). **Test** `tests/credit-paritaet.test.ts` mit `releaseSuite("Lagerfoto-Credits am Release-Commit", ["web"])` und `releaseDatei("web", "supabase/functions/_shared/aiPricing.ts")` (Muster `tests/design-v2-components.test.ts:254–267`). Anzeigeort → K-6.

---

### `scripts/seo-report.mjs` `--leaderboard` (Paket e, D-37)

**Bestand:** Argumente Z. 24–28, Kontostand `DATA_getSubscription` Z. 102 und Z. 144, Leaderboard Z. 121–132:
```js
const leaderboardRaw = await client.callTool("DATA_getAiSearchLeaderboard", { primary: …, competitors: …, source: meta.source, engines: meta.engines, scope: … });
raw["ai-leaderboard"] = leaderboardRaw;
```
→ nur mit `process.argv.includes("--leaderboard")`; ohne Schalter kein Aufruf, `raw["ai-leaderboard"]` fehlt und der Bericht nennt „KI-Leaderboard nicht abgerufen (Schalter --leaderboard, ca. 7.500 Units)“. Mit Schalter Kostenwarnung vor dem Abruf. Kontostand „nachher“ erst nach einer Wartezeit (10–60 s) lesen. Die Rohdateiliste `RAW` und der Überschreibschutz (Kopfkommentar Z. 6) müssen den fehlenden Leaderboard-Teil vertragen.

**Test:** Logik (Schalter → Aufrufliste, Berichtszeile) in `scripts/lib/seo-report-core.mjs` auslagern und mit einem gemockten Client nach `tests/se-ranking-sync.test.ts:17–30` (`fakeProject`, `calls`-Liste) prüfen: ohne `--leaderboard` kommt `DATA_getAiSearchLeaderboard` nicht in `calls` vor.

---

### `/audit`, SE-Ranking-Audit, Linkregister, Berichte (Paket e, D-25 bis D-30, D-38, D-39)

- **`audit-report.md`/`.html`:** Aufbau und Regeln aus `.claude/skills/audit/SKILL.md`, HTML aus `.claude/skills/audit/references/audit-report-template.html`; Vorab-Antworten 1–11 aus 10-RESEARCH „Eingaben für autonome Ausführung“ wörtlich in den Plan. Ebene 13: `py -3.12 .claude/skills/audit/code/check_page_similarity.py --base https://craftos.eu --pattern /gewerke/`.
- **SE-Ranking-Zugriff:** nur `createClient`/`callTool` aus `scripts/lib/se-ranking-mcp.mjs` (`createClient` Z. 134, `rowsOf` Z. 109, `redact` Z. 86); Kontostand vor/nach jedem Block wie `PHASE-09-ROLLOUT.md` § 7 (Tabelle „Block | Zeitpunkt vorher | Units vorher | …“); danach `node scripts/check-no-secrets.mjs docs/seo scripts`.
- **Vorab-Basis:** `docs/seo/reports/2026-10-23-messstand-phase10.md` und `docs/seo/data/2026-10-23-audit-*-phase10.json` (D-38). Waiver der 13 Alt-Text-Warnungen als „Crawler artifact“.
- **Linkregister:** `docs/seo/backlink-register.json` Statuspflege nach `LINKPLAN.md` § 5 (Z. 171 ff.); Übergabe 2 als neuer Abschnitt nach dem Muster § 4 (Z. 109–170, je Portal ein `###` mit kopierfertigem Prompt). `tests/backlink-plan.test.ts:140–146` prüft Pflichtbegriffe der LINKPLAN-Datei – bei neuen Pflichtbegriffen dort ergänzen.
- **`ETAPPEN-NACHWEIS-V2.md`:** Quellen je Spalte aus `PHASE-0x-ROLLOUT.md` (§ 2 ship-gate, § 3 Workflows, § 4 Push/Vercel, § 5 IndexNow, § 6 live-check, § 9 Messbericht, § 8 Analytics). Analytics-Zahlen aus `docs/seo/data/2026-10-23-vercel-events-phase10.json` (der Orchestrator hat sie dort abgelegt, nicht unter `docs/releases/data/`).
- **`MEILENSTEIN-V2-ABSCHLUSS.md`:** Gliederung nach `2026-10-23-messstand-phase10.md` §§ 1–6 (Ergebnis in Kürze, Unit-Verbrauch je Block, Verbrauchsanalyse, Website-Audit, Messstand gegen Ausgangsstand, Folgerungen) plus Lighthouse/A11y/Anforderungsstatus; keine Tarifempfehlung (D-28).

---

### `app/sitemap.ts` und `scripts/live-check.mjs` (10-06)

**Sitemap:** `pageUpdated` (Z. 8–24) um `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation`, `/support` ergänzen (fallen heute auf `"2026-09-09"`, Z. 61); `"/funktionen"` (Z. 10) auf das Datum von (d). Die Rechtsseiten (Z. 63–65) und die Detailseiten (`f.checkedAt`, Z. 66–68) haben eigene Quellen → K-5.

**live-check:** Block nach dem Muster Phase 9 (Z. 520–575): `await check("…", async () => { … return fehlerText | undefined })` (Z. 56) für ContentKopf auf Rechner/Support/Recht, 404-Status + `noindex`, Kassenbuch- und § 13b-Karte auf `/funktionen`, Kachel § 13b auf `/funktionen/rechnungen`, drei Schrift-Preloads.

---

## Konventionen

### Skripte
- ESM, `node:`-Importe, Kopfkommentar mit Aufruf, Optionen, Exitcodes und Ergebnisdatei (`scripts/seo-audit.mjs:1–7`). Reine Prüflogik in `scripts/lib/<name>-core.mjs` ohne Datei- und Netzzugriff, getestet mit Vitest (`tests/<name>-core.test.ts`).
- Herkunft über `AUDIT_ORIGIN` (Muster `visual-audit.mjs:4`, `performance-audit.mjs:3`); die Standardwerte zeigen auf 3101. Jeder Worktree setzt seinen Port ausdrücklich.
- Ergebnisse nach `test-results/<werkzeug>/…` (nicht committen). Exit 1 = Gate verletzt, Exit 2 = falsche Optionen.
- Texte mit Backticks oder `$` nur per Write/Edit, Ersetzungen mit `split/join` (EXECUTOR-RULES).

### Tests
- Vitest mit Alias `@/…`, Seiten per `renderToString(createElement(…))` bzw. `await Page()` bei `async`-Seiten (`tests/breadcrumbs.test.ts:197–200`). Fehlertexte wörtlich aus dem UI-SPEC. Sammelprüfung mit Trefferliste statt Abbruch beim ersten Fehler (`tests/announcements.test.ts:32–45`).
- Release-Tests nur über `tests/release-repos.ts` (`releaseSuite`, `releaseDatei`, `pruefeReleaseStand`), nie still `skipIf(!existsSync)`.
- E2E: Kopf und Request-Sperre aus `funktionsdetails.pw.cjs:1–27`; Breiten per `setViewportSize` im Desktop-Projekt (`test.skip(testInfo.project.use.hasTouch, …)`); deterministisch auf Attribute warten (`data-running`, `data-timer`), keine festen Pausen.
- Keine Tests abschwächen; Zählungen nur im selben Plan wie die Datenänderung gleichziehen.
- Läufe: gezielte Vitest-Dateien, Lint, Typecheck ohne Sperre; Build, `next start`, volle Suite, E2E, `visual-audit`, `a11y-audit` (je Shard), `performance-audit` (Lighthouse allein) und `npm ci` nur unter `C:/Projekte/Websitenerstellung/.heavy-lock`.

### Seiten (Paket c)
- Kopf `ContentKopf` (hell, Brotkrumen aus `crumbsFor`, H1 = `zielwerte(pfad).h1`), Abschnitte `section data-abschnitt={id} aria-labelledby={id}` mit H2-`id` = Abschnitts-`id` (`DESIGN-V2.md` § 17.1), Abschluss `<div data-abschnitt="cta"><CtaBand …/></div>`.
- Metadaten unverändert `export const metadata = metaFor(pfad)`; Schema unverändert.
- Nur Gewichte 400/600, Fokus global (`app/globals.css:110`) bzw. über `:focus-within` an Hüllen (10-UI-SPEC § 9.1).

### Daten (Paket d)
- Produktfakten nur aus Register/Site, Belegkommentar mit `web:`/`mobile:`-Pfad; Nutzensatz genau 1 Satz ≤ 100; Lizenz positiv im Satz (D-03, L-1).

---

## Hart kodierte Bindungen und Konflikte zwischen Paketen

Diese Stellen werden durch die Paketgrenzen aus D-33 rot oder bleiben ohne Besitzer, wenn der Planer sie nicht ausdrücklich zuweist.

| # | Datei:Zeile | Heute | Kollision in Phase 10 | Empfehlung |
|---|---|---|---|---|
| **K-1** | `tests/product-register.test.ts:103` | `expect(register.liveExtras.filter((x) => x.advertised)).toHaveLength(8)` | (d) setzt Kassenbuch und § 13b auf `advertised: true` (10) → rot in `wt-10d` und auf `main` nach dem Merge von (d). Die Datei gehört laut D-14 aber (b) (Release-Helfer). | (b) ersetzt im selben Commit wie die Helferumstellung die feste Zahl durch die Parität `toHaveLength(ZUSATZ_IDS.length)` (Import aus `@/lib/funktionsgruppen`); grün vor und nach (d). Die feste Zahl 10 prüft (d) in `tests/funktionsgruppen.test.ts:335`. Alternative: Zeile per Übergabe an 10-06, dann ist `main` zwischen dem Merge von (d) und 10-06 rot. |
| **K-2** | `tests/breadcrumbs.test.ts:202` | rendert `/support` synchron: `renderToString(createElement((await import("@/app/support/page")).default))` | 10-UI-SPEC § 2 verlangt Meta „{n} Anleitungen/Artikel“ aus `lib/content` – `getContentList` ist nur `async` (`lib/content.ts:173`) → Seite wird `async`, der Test bricht. Datei ohne D-33-Besitzer. | (c) übernimmt `tests/breadcrumbs.test.ts` in W1 und stellt Z. 202 auf das `await`-Muster aus Z. 197–200 um. |
| **K-3** | neuer Gewichte-/Farbtest (10-UI-SPEC § 11) | Geltungsbereich enthält `components/CraftOSLogo.tsx` | Das Logo gehört (b); in `wt-10c` steht dort noch `font-bold`/`font-medium` (Z. 57, 60) → Test in (c) rot. | (c) nimmt `CraftOSLogo.tsx` aus seinem Test; (b) prüft das Logo im eigenen Test (z. B. Fall in `tests/lighthouse-core.test.ts` oder eigener kleiner Test). 10-06 vereinigt den Geltungsbereich. |
| **K-4** | `app/layout.tsx:15–16, 25–26, 41–42` (b) vs. `components/legal/Legal.tsx:30, 44` (`font-extrabold`/`font-bold`), `Calculators.module.css:182, 216, 252, 273, 341` (`500`), `SupplementalScene.module.css:83` (`500`) | Clash 700/General 500 werden geladen | Merged (b) vor (a)/(c), zeigt `main` synthetischen Fettdruck auf den Rechtsseiten und 400 statt 500 in den Rechnern. Kein Testbruch, aber falsche Screenshots und ein verfälschter Lighthouse-Wert für `/impressum`. | Merge-Reihenfolge (c) → (a) → (b). Die Wirkung von § 7 prüft erst 10-06 (10-UI-SPEC § 7.3). (b) misst im Worktree nur die sechs Gate-Seiten. |
| **K-5** | `app/sitemap.ts:66–68` (`lastModified: f.checkedAt`) und `lib/funktionen.ts:53` | Datum je Detailseite aus `lib/funktionen.ts` | (d) ändert `/funktionen/rechnungen` (neue Kachel) und `/funktionen/buchhaltung`; `lib/funktionen.ts` hat keinen D-33-Besitzer, 10-06 besitzt nur `sitemap.ts`. | (d) übernimmt `lib/funktionen.ts` (nur `checkedAt` der zwei Slugs); alternativ Übergabe an 10-06. |
| **K-6** | Anzeige des Lagerfoto-Credit-Werts (D-22) | Foto-Erkennung steht in `lib/seiten/craft-ai.ts:14–15, 71` und `content/hilfe/lager-scan-app.md:42–47` | Beide Dateien haben keinen D-33-Besitzer; (d) besitzt nur `lib/site.ts` und `lib/funktionsdetails/**`. Ein Wert im Hilfetext wäre zudem eine Textänderung (D-04). | (d) legt Konstante und Paritätstest an und zeigt den Wert nur an einer eigenen Stelle (z. B. Kachel in `lib/funktionsdetails/baustelle.ts`, falls Budget und Satzregel passen). Jede Anzeige in `craft-ai.ts` oder im Hilfeartikel per Übergabe an 10-06. |
| **K-7** | `tests/design-v2-components.test.ts` | enthält Blöcke zu (a)-Bausteinen (SectionHeader Z. 45, CtaBand Z. 283, FeatureList Z. 480, LinkKarten Z. 851, `globals.css` Z. 807, FeatureCard-Raster Z. 826) und zu (c)-Bausteinen (BentoGrid Z. 371, ComparisonTable Z. 626, ContentKopf Z. 927) | Datei ohne D-33-Besitzer; zwei Pakete wollen dort Fälle ergänzen. | In W1 ändert niemand die Datei. Neue Fälle kommen in paketeigene neue Dateien ((c): z. B. `tests/phase10-darstellung.test.ts` für K1/K2, Caption, Gewichte). Wird ein Bestandsfall durch eine eigene Änderung rot, ist das ein Planfehler – Bestandsverhalten erhalten oder Übergabe an 10-06. |
| **K-8** | `components/v2/BentoGrid.module.css` (c) vs. neue sechste Kachel auf `/funktionen/rechnungen` (d) | 5 Kacheln | Die B10-Messung von (c) sieht die neue `wide`-Kachel nicht. | 10-06 wiederholt die Sichtprüfung bei 768/1024/1440 auf `/funktionen/rechnungen` (10-RESEARCH „Paketgrenzen“). |
| **K-9** | `tests/e2e/playwright.config.cjs:7` (`testMatch`) | `a11y.pw.cjs` fehlt; Eintrag laut D-33 erst in 10-06 | Playwright führt nur Dateien aus `testMatch` aus; ein Dateipfad in der CLI hebt das nicht auf. (a) kann die Spec in W1 sonst nicht laufen lassen. | (a) startet die Spec mit einer Konfiguration im Scratchpad, die die Repo-Konfiguration per `require` übernimmt und `testMatch: ['a11y.pw.cjs']` und `testDir` absolut setzt; nichts davon wird committet. |
| **K-10** | `scripts/visual-audit.mjs:155` | Exit 1 bei `x.status !== 200` | D-14 verlangt die 404-Seite in der Routenliste → das Skript wäre immer rot. Gleiches gilt für `a11y-audit.mjs`. | (a) führt die erwarteten Status je Route (`/gibt-es-nicht` → 404) und prüft sie ausdrücklich. |
| **K-11** | `performance-audit.mjs:57–62` (b) | klickt „Menü öffnen/schließen“, füllt „Personalkosten pro Jahr in Euro“ | (a) (Header) und (c) (Rechner) dürfen diese Namen nicht ändern, sonst bricht der Bestandsmodus. | Als harte Bindung in die Pläne 10-01 und 10-03 übernehmen. |
| **K-12** | `docs/DESIGN-V2.md` (c) | – | (a) (D-10, Fokusalgorithmus) und (b) (Logo-SVG, Schnitte) wollen Nachweise dort ablegen. | Übergabelisten; 10-06 ergänzt § 19. |
| **K-13** | `lib/product-register.ts:349–350, 357–358` (Kommentare) und D-21 „im Mega-Menü“ | Kommentar kündigt Menü-Präsenz an | `components/layout/MegaMenu.tsx` rendert nur `group.details` (Besitz (a)); laut 10-UI-SPEC § 5 bleibt das Menü unverändert. | (d) korrigiert die Kommentare; kein Test auf Menü-Einträge der Extras (Pitfall 7). |
| **K-14** | `lib/funktionsgruppen.ts` im Preis-Scan von `tests/pricing-parity.test.ts:100–160` (Dateiliste Z. 115) | – | (d) schreibt neue Nutzensätze; (b) ändert gleichzeitig `testKontext` (Z. 150). | (d) prüft die eigenen Sätze gegen den Scan (keine Preis-/Tageszahlen, kein „Volllizenz“ ohne Bindestrich, Z. 131); kein Eingriff in die Testdatei. |
| **K-15** | `app/sitemap.ts` (I) | – | (c) und (d) ändern Seiten, dürfen die Datei aber nicht anfassen. | Änderungsdaten je Seite in die Übergabeliste; 10-06 setzt `pageUpdated`. |

### Mögliche rote Zwischenstände

| Stand | Was rot ist | Ursache | Auflösung |
|---|---|---|---|
| `wt-10d` und `main` nach Merge von (d) | `tests/product-register.test.ts:103` | K-1 | (b) mit Paritätszeile vorher mergen oder Übergabe an 10-06 |
| `wt-10c` | `tests/breadcrumbs.test.ts:202`; Gewichte-Test mit Logo | K-2, K-3 | (c) übernimmt `breadcrumbs.test.ts`; Logo aus dem (c)-Test nehmen |
| `wt-10a` | `a11y-audit.mjs`-Gate auf Rechtsseiten (`color-contrast` 2,84 : 1 und 4,42 : 1) | Behebung gehört (c) | erwartet; Baseline-Bericht kennzeichnet sie als „Besitz (c)“, (a) behebt sie nicht. Gate grün erst in 10-06 |
| `wt-10a` | `visual-audit.mjs` Exit 1 | 404-Route (K-10) | erwartete Status je Route |
| `wt-10b` | Lighthouse-Gate (LCP 2,57–2,74 s live) | Hebel noch nicht wirksam | Messschleife mit Abbruchkriterium; Rest als offene Abweichung (D-13) |
| `main` nach Merge von (b) vor (a)/(c) | kein Test, aber Darstellung (synthetischer Fettdruck, 500 → 400) | K-4 | Merge-Reihenfolge (e) → (d) → (c) → (a) → (b) |
| `main` nach W1, vor 10-06 | `a11y.pw.cjs` läuft nicht in `npm run test:e2e` | `testMatch` erst in 10-06 | kein Fehler, nur fehlende Abdeckung bis 10-06 |
| (e) nach Umbau `seo-report.mjs` | Bericht ohne Leaderboard-Werte | D-37 | Bericht nennt „nicht abgerufen“ mit Grund; kein Schätzwert |

---

## Shared Patterns

### Playwright-Seitenlauf (Kontext je Breite, reduzierte Bewegung, Schriften, Lazy-Inhalte)
**Quelle:** `scripts/visual-audit.mjs:30–61`.
**Gilt für:** `a11y-audit.mjs`, `visual-audit.mjs`, B10-Messung (Scratchpad), Logo-Screenshot (Scratchpad).

### axe-Prüfung
**Quelle:** `tests/e2e/funktionsdetails.pw.cjs:41–46` (`severeAxe`) und 10-RESEARCH Pattern 2 (`.options()` vor `.withTags()`, `color-contrast-enhanced` nur bei `expectedContrastRatio === "4.5:1"`).
**Gilt für:** `a11y-audit.mjs`, `a11y.pw.cjs`, `visual-audit.mjs`.

### Sitemap als Seitenliste
**Quelle:** gebaut `scripts/seo-audit.mjs:34–39` (`.next/server/app/sitemap.xml.body`), laufender Server `funktionsdetails.pw.cjs:30–39`.
**Gilt für:** `a11y-audit.mjs` (Server), Audit-Seitenliste in (e) (beides, Abweichung = Befund).

### Reine Kern-Datei plus Vitest
**Quelle:** `scripts/lib/seo-audit-core.mjs` + `tests/seo-audit-core.test.ts`; `scripts/lib/se-ranking-sync-core.mjs` + `tests/se-ranking-sync.test.ts` (gemockter Client).
**Gilt für:** `a11y-audit-core.mjs`, `lighthouse-core.mjs`, `seo-report-core.mjs`.

### v2-Seitenaufbau mit hellem Kopf
**Quelle:** `app/gewerke/page.tsx:22–55`, `components/v2/Abschnitt.tsx:11–24`, `components/content/ContentIndex.tsx:1–13, 59–61, 132, 152`.
**Gilt für:** Rechner, `/support`, Rechtsseiten (nur Kopf), 404.

### Fokus an der Hülle
**Quelle:** `components/v2/BentoGrid.module.css:44` (`.tile:focus-within`), `LinkKarten` (Titel-Link mit `::after`), `FeatureCard` (`.card:focus-within`); globale Regel `app/globals.css:110`.
**Gilt für:** Werkzeugkarten `/rechner`, `.inputWrap` der Rechnerfelder, Tastaturprüfung in (a) (Vorfahren werten, 10-UI-SPEC § 9.1).

### Release-Belege in Tests
**Quelle:** `tests/release-repos.ts:17–21, 41–48, 55, 74`; Nutzung `tests/design-v2-components.test.ts:254–267`.
**Gilt für:** `pricing-parity.test.ts`, `product-register.test.ts` (b), `credit-paritaet.test.ts` (d).

### Dateiscan mit Trefferliste
**Quelle:** `tests/announcements.test.ts:7–45`.
**Gilt für:** ProductDemo-Schutztest (d), Gewichte-/Farbtest (c), `crumbs={null}`-Grep (c).

### SE-Ranking und Geheimnisse
**Quelle:** `scripts/lib/se-ranking-mcp.mjs` (`createClient`, `redact`), Kontostand vorher/nachher `scripts/seo-report.mjs:102, 144`, Tabelle `PHASE-09-ROLLOUT.md` § 7, `scripts/check-no-secrets.mjs`.
**Gilt für:** alle Abrufe in (e) und im Rollout; Schlüssel nie ausgeben.

### Rollout-Nachweis
**Quelle:** `docs/releases/PHASE-09-ROLLOUT.md` §§ 1–15 (Stand, ship-gate, Workflows, Push/Vercel, IndexNow, live-check, SE Ranking, Analytics, Messbericht, Abdeckung, Anforderungsstatus, neue Seiten, Inhaberpunkte, Auslegungen, Doku-Push).
**Gilt für:** `PHASE-10-ROLLOUT.md` (R), Spalten von `ETAPPEN-NACHWEIS-V2.md` (e).

### Bestehende 07/08/09-Muster (nur Verweis)
CTA mit `data-track="trial"`, Kurzform-Belege `data-source`, Budgetprüfung im Baustein plus Vitest, `ContentKopf`/`LinkKarten`, Antwort zuerst, eine BreadcrumbList je Seite → `07-PATTERNS.md`, `08-PATTERNS.md`, `09-PATTERNS.md` „Shared Patterns“.

---

## No Analog Found

| Datei | Role | Data Flow | Grund / Ersatzquelle |
|---|---|---|---|
| Tastatur-Durchlauf in `a11y-audit.mjs`/`a11y-audit-core.mjs` | utility | event-driven | Im Repo gibt es keine automatisierte Tab-Prüfung. Algorithmus aus 10-RESEARCH Pattern 3 und 10-UI-SPEC § 9.1 (Ruhezustand-Signatur über Element + 4 Vorfahren + `::before/::after`, Zykluserkennung, `elementFromPoint` für 2.4.11). |
| Lighthouse-Modus in `performance-audit.mjs` | script | batch | Lighthouse ist nicht installiert; nur das Gerüst des Bestands passt. Node-API und Median laut 10-RESEARCH Pattern 1 (Context7 war nicht verfügbar; Quelle README und Quelltext 13.5.0). |
| Logo-Schriftzug als Glyphen-SVG | component | – | `CraftOSMark` zeigt nur die Einbindung von Pfaddaten; die Umrisse entstehen einmalig per Scratchpad-Skript (`fontkit`, keine Repo-Abhängigkeit, 10-UI-SPEC § 7.1). |

---

## Metadata

**Analog search scope:** `craftos/scripts/{visual-audit,performance-audit,seo-audit,seo-report,live-check}.mjs`, `craftos/scripts/lib/{seo-audit-core,se-ranking-mcp}.mjs`, `craftos/tests/e2e/{playwright.config,funktionsdetails,function-illustrations,home-navigation,browser-functional,design-v2}.{cjs,pw.cjs}`, `craftos/components/{calculators,legal,content,v2,feature-snippet}/`, `craftos/components/CraftOSLogo.tsx`, `craftos/app/{layout.tsx,sitemap.ts,not-found.tsx,support,rechner,gewerke,impressum,datenschutz,agb}`, `craftos/lib/{funktionsgruppen,product-register,site,funktionen,content,llms,seiten/craft-ai}.ts`, `craftos/lib/funktionsdetails/{index,buchhaltung,rechnung}.ts`, `craftos/tests/{funktionsgruppen,funktionen-seite,navigation,funktionsdetails,demo,pricing-parity,product-register,release-repos,breadcrumbs,kernseiten,design-v2-components,design-v2-frames,preise-seite,app-seite,seo-audit-core,se-ranking-sync,backlink-plan}.ts`, `craftos/docs/{releases/PHASE-09-ROLLOUT.md,seo/LINKPLAN.md,seo/reports/2026-10-23-messstand-phase10.md,seo/data/}`, `.claude/skills/audit/`
**Files scanned:** 64
**Pattern extraction date:** 2026-10-23
