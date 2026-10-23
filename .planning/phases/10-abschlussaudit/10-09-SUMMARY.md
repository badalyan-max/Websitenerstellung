---
phase: 10-abschlussaudit
plan: 09
subsystem: performance
tags: [paket-b, performance, lighthouse, lcp, schriften, logo-svg, messschleife]

requires:
  - phase: 10-02
    provides: "Lighthouse-Modus in performance-audit.mjs (--lighthouse, --block, Median, Gate), lighthouse-core.mjs"
provides:
  - "GATE_ROUTEN je Vorlage nach Ausgangsmessung: /, /funktionen, /funktionen/angebote, /gewerke/shk, /vergleich/handwerkersoftware-kleine-betriebe, /blog/handwerkerrechnung-schreiben"
  - "Logo-Schriftzug als Inline-SVG mit Glyphen-Umrissen (components/CraftOSLogo.tsx), Box 117,421875 × 34 px wie vorher"
  - "app/layout.tsx lädt nur Clash 600, General 400, General 600 (drei Preloads, display swap)"
  - "tests/e2e/logo-schriftzug.pw.cjs mit Referenzen vor der Änderung, tests/craftos-logo.test.ts"
  - "Messprotokoll vorher / Schrifthebel / inlineCss-A/B / Endstand und offene LCP-Abweichung nach D-13"
affects: [10-06, 10-07, 10-12]

tech-stack:
  added: []
  patterns:
    - "Glyphen-Umrisse einmalig per Scratchpad-Skript (fontkit) erzeugen, Pfaddaten als benannte Konstanten mit Herkunftskommentar"
    - "Screenshot-Vergleich von Text gegen SVG mit Graustufen-Glättung (--disable-lcd-text) und scale: 'device'"
    - "Netzprüfung umbenannter next/font-Dateien per Inhalts-Hash statt Dateiname"

key-files:
  created:
    - craftos/tests/craftos-logo.test.ts
    - craftos/tests/e2e/logo-schriftzug.pw.cjs
    - craftos/tests/e2e/logo-schriftzug.pw.cjs-snapshots/header-chromium-1440-win32.png
    - craftos/tests/e2e/logo-schriftzug.pw.cjs-snapshots/header-chromium-390-touch-win32.png
    - craftos/tests/e2e/logo-schriftzug.pw.cjs-snapshots/footer-chromium-1440-win32.png
    - craftos/tests/e2e/logo-schriftzug.pw.cjs-snapshots/footer-chromium-390-touch-win32.png
  modified:
    - craftos/scripts/lib/lighthouse-core.mjs
    - craftos/tests/lighthouse-core.test.ts
    - craftos/components/CraftOSLogo.tsx
    - craftos/app/layout.tsx
    - craftos/tests/e2e/playwright.config.cjs

key-decisions:
  - "Schriftlizenz ITF FFL 2.0 erlaubt Logos und Vektordateien ausdrücklich und verbietet Subsetting: Variante SVG, die Subset-Alternative ist lizenzrechtlich ausgeschlossen"
  - "Gate-Seite je Vorlage = schlechtester Median-LCP der Ausgangsmessung (14 Kandidaten)"
  - "experimental.inlineCss verworfen: LCP auf allen sechs Gate-Seiten schlechter (+32 bis +755 ms), HTML von / rund 750 KB"
  - "Kein JavaScript-Hebel übernommen: legacy-javascript ist Next.js' festes Polyfill-Modul im Laufzeit-Chunk, unused-javascript liegt im selben Chunk (react-dom/Router); kein dokumentierter, funktionsneutraler Schalter"
  - "Logo-Spec vergleicht mit Graustufen-Glättung (--disable-lcd-text) für Referenz und Vergleich, weil Pfade nie LCD-geglättet werden"
  - "Offene Abweichung QA-04 (LCP) nach D-13; Bewertung durch den Orchestrator in 10-07"

patterns-established:
  - "Logo-Schriftzug: Maße zusätzlich als Inline-Stil, weil Header.module.css „.logo svg“ auf 36 × 36 px setzt"

requirements-completed: []

duration: 105min
completed: 2026-10-23
---

# Phase 10 Plan 09: Messschleife LCP, Gate-Seiten und Logo-Schriftzug als SVG Summary

**Der Logo-Schriftzug ist jetzt ein SVG mit Glyphen-Umrissen, damit entfallen drei Schriftschnitte und drei Preloads. Das senkt den Median-LCP der Gate-Seiten um 287 bis 805 ms und hebt den Score auf 93–95. Das LCP-Ziel unter 2.500 ms bleibt lokal verfehlt (2.823–3.205 ms). Das ist als offene Abweichung nach D-13 mit Zahlen belegt.**

## Performance

- **Duration:** ca. 105 min (11:21–13:06 UTC)
- **Started:** 2026-10-23T11:21:00Z
- **Completed:** 2026-10-23T13:06:00Z
- **Tasks:** 3/3
- **Files modified:** 11 (davon 4 Referenzbilder)

## Rahmen der Messungen

- Alle Werte: **Labordaten, mobil, lokal, Median aus 3 Läufen, URL** `http://localhost:3102`. Lighthouse 13.5.0, HeadlessChrome 153 (`chromium-1243`), `next start` aus dem Worktree `wt-10b`, gzip.
- Jeder Block lief allein unter `.heavy-lock`. Vorher wurden Koordinationsstatus (Website ohne Rezept, lokal) und freier RAM (2,45–3,88 GiB von 15,93 GiB) protokolliert. Zwischen den Blöcken war die Sperre frei.
- Blöcke (UTC):
  - B1 Ausgangsmessung Kandidaten: 11:50–11:57
  - B2 Info-Seiten und Referenzen: 12:17–12:20, B2b 12:21
  - B3 Build nach Logo-Umstellung: 12:35–12:36
  - B4 nach Schrifthebel: 12:37–12:43
  - B5 inlineCss-A/B: 12:43–12:50
  - B6 Endstand und Bestandsmodus: 12:50–13:01
- **Streuung:** Die simulierte FCP springt zwischen den Läufen in Stufen von etwa 150 ms (1.204/1.355/1.505/1.656 ms). Deshalb schwanken einzelne Mediane zwischen Blöcken um bis zu ±150 ms, obwohl derselbe Code gemessen wird (vgl. `/` B4 2.977 ms gegenüber B6 2.972 ms, `/gewerke/shk` 3.127 gegenüber 3.205 ms).

## Aufgabe 1: Ausgangsmessung und Gate-Seiten

### Kandidaten (Block B1, Stand vor 10-09, nur `data-logo-schriftzug` ergänzt, keine Darstellungsänderung)

| Vorlage | URL | Score | LCP | FCP | SI | TBT | CLS | LCP-Element |
|---|---|---|---|---|---|---|---|---|
| Start | `/` | 92 | 3.276 | 1.355 | 1.355 | 32 | 0 | `h1#startseite-titel` |
| Funktionsübersicht | `/funktionen` | 92 | 3.286 | 1.206 | 1.206 | 64 | 0 | `h1#funktionen-titel` |
| Funktionsdetail | `/funktionen/zeiterfassung` | 91 | 3.436 | 1.206 | 1.573 | 56 | 0 | `h1#funktion-titel` |
| Funktionsdetail | **`/funktionen/angebote`** | 90 | **3.476** | 1.207 | 1.365 | 72 | 0 | `h1#funktion-titel` |
| Funktionsdetail | `/funktionen/lager` | 92 | 3.272 | 1.205 | 1.205 | 61 | 0 | `h1#funktion-titel` |
| Gewerke | `/gewerke/elektriker` | 88 | 3.764 | 1.656 | 1.656 | 57 | 0 | `p#antwort` |
| Gewerke | `/gewerke/bauunternehmen` | 91 | 3.454 | 1.205 | 1.205 | 47 | 0 | `p#antwort` |
| Gewerke | **`/gewerke/shk`** | 87 | **3.970** | 1.656 | 1.656 | 68 | 0 | `p#antwort` |
| Vergleich | `/vergleich/plancraft-alternative` | 92 | 3.303 | 1.206 | 1.206 | 45 | 0 | `p#antwort` |
| Vergleich | `/vergleich/hero-alternative` | 92 | 3.284 | 1.205 | 1.205 | 38 | 0 | `p#antwort` |
| Vergleich | **`/vergleich/handwerkersoftware-kleine-betriebe`** | 89 | **3.617** | 1.605 | 1.605 | 97 | 0 | `p#antwort` |
| Ratgeber | **`/blog/handwerkerrechnung-schreiben`** | 88 | **3.660** | 1.602 | 1.602 | 137 | 0 | `h1#artikel-titel` |
| Ratgeber | `/blog/abschlagsrechnung-schlussrechnung` | 91 | 3.340 | 1.207 | 1.207 | 80 | 0 | `h1#artikel-titel` |
| Ratgeber | `/blog/zahlungserinnerung-mahnung-handwerk` | 89 | 3.617 | 1.638 | 1.638 | 86 | 0 | `p#antwort` |

- Werte in ms, 0 ungültige Läufe. Die zwei größten Ratgeber-Dateien nach Bytegröße sind `craftos/content/blog/abschlagsrechnung-schlussrechnung.md` (8.052 B) und `craftos/content/blog/zahlungserinnerung-mahnung-handwerk.md` (7.575 B); `handwerkerrechnung-schreiben.md` hat 7.314 B.
- Insights im Median-Lauf überall gleich: `render-blocking-insight` 300–550 ms, `legacy-javascript-insight` 0–150 ms, `network-dependency-tree-insight`.
- **Gate-Auswahl (schlechtester Median-LCP je Vorlage):** `/` und `/funktionen` (jeweils einzeln), `/funktionen/angebote` (3.476 vor 3.436 und 3.272), `/gewerke/shk` (3.970 vor 3.764 und 3.454), `/vergleich/handwerkersoftware-kleine-betriebe` (3.617 vor 3.303 und 3.284), `/blog/handwerkerrechnung-schreiben` (3.660 vor 3.617 und 3.340). Es gab keinen Gleichstand. `A11Y_GATE` ist `/impressum` plus diese Liste.

### Info-Seiten (Block B2, gleicher Stand)

| URL | Score | LCP | FCP | TBT | CLS | LCP-Element | Accessibility / Best Practices / SEO |
|---|---|---|---|---|---|---|---|
| `/preise` | 89 | 3.617 | 1.604 | 76 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/app` | 90 | 3.586 | 1.657 | 76 | 0 | `h1#app-titel` | 100 / 100 / 100 |
| `/hilfe/rechnung-fertigstellen` | 90 | 3.383 | 1.207 | 71 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/rechner/stundensatz` | 92 | 3.298 | 1.207 | 66 | 0 | `h1` | 100 / 100 / 100 |

### Lizenzbefund (Clash Display, General Sans)

- **Quelle:** Offizielles Download-Paket von Fontshare (Indian Type Foundry), abgerufen am **23.10.2026** über `https://api.fontshare.com/v2/fonts/download/clash-display` und `…/general-sans`, jeweils Datei `License/FFL.txt`. Beide Texte sind bytegleich (SHA-256 `145e7fe2…f554`). Die Fontshare-API (`https://api.fontshare.com/v2/fonts?q=clash`, `?q=general`) führt für beide Familien `"license_type": "itf_ffl"`. Die Lizenzseite `https://www.fontshare.com/licenses/itf-ffl` ist eine Single-Page-App ohne Text im HTML, deshalb gilt der Text aus dem Paket.
- **Fassung:** „ITF Free Font License (FFL) Version 2.0 - 17 Aug 2026“.
- **Frage „Ist die Umwandlung von Glyphen in Pfade für ein Logo erlaubt?“ – Ja.** Abschnitt 01: „You may use the Font Software to create logos, wordmarks, graphic elements, images, vector files, scalable drawings and other creative works. Logos and wordmarks created using the Font Software may be registered as trademarks.“ Die Definitionen nehmen Logos ausdrücklich aus: „Derivative Work does not include any logo, document, graphic, image, website, application or other creative work created through the normal use of the Font Software“.
- **Frage „Ist Subsetting erlaubt?“ – Nein.** Abschnitt 02: „You may not modify, edit, adapt, translate, reverse engineer, decompile, disassemble or otherwise alter the Font Software … This includes modifying or replacing glyphs, subsetting, format conversion, or altering font names …“. Zusätzlich zählt die Definition „Derivative Work“ ausdrücklich „subsetting, format conversion“ auf.
- **Entscheidung: SVG.** Die Subset-Alternative aus 10-UI-SPEC § 7.1 wäre lizenzwidrig. Das Self-Hosting der unveränderten Dateien erlaubt Abschnitt 01 („You may self-host the Font Software on your own servers …“).

## Aufgabe 2: Logo-Schriftzug als SVG

- **Referenz vor der Änderung** (Commit `106a83b`): Der Bestandswrapper erhielt nur `data-logo-schriftzug`. Die Spec `tests/e2e/logo-schriftzug.pw.cjs` lief gegen den Bestands-Build mit `--update-snapshots` und danach ohne Update stabil (4/4). Der Netzfall war in diesem Commit `test.fixme`, weil die Schnitte noch geladen wurden.
- **Gemessene Box vorher:** 117,421875 × 34 px in Header und Fußleiste bei 1440 und 390 px. „CraftOS“ hat Grundlinie 14 px, Zeilenbox 18 px und Laufweite −0,45 px; „Handwerkersoftware“ hat Grundlinie 30 px (12 + 18) und Zeilenbox 16 px. Beide Zeilen sind gleich breit, weil der Flex-Container die Spans auf die Breite der längeren Zeile streckt.
- **Berechneter Farbwert von `text-zinc-400`** (Build vorher, `getComputedStyle`, Chromium): `lab(65.6464 1.53494 -5.42429)`. Er steht als Literal in `FARBE_UNTERZEILE`. „CraftOS“ hat `fill="currentColor"` (erbt `rgb(244, 244, 245)`).
- **Erzeugung:** Die Skripte liegen im Scratchpad `…/scratchpad/10-b/gen/` mit eigener `package.json` (`fontkit` 2.0.4, `pngjs`, `pixelmatch`); im Repo gibt es keine neue Abhängigkeit (`git diff main -- craftos/package.json` zeigt nur `lighthouse` aus 10-02).
  - „CraftOS“ entsteht ohne Ligaturen, weil Chrome sie bei Laufweite abschaltet, aber mit dem Kerning der Schrift.
  - Die Glyphenlagen sind auf 1/8 px gerastert und je Glyphe um höchstens 3/16 px an Chromes Textplatzierung angeglichen (`optimiere.mjs`). Ein Offline-Nachbau des Bestands-Textes mit denselben Schriftdateien war bitgleich zur Referenz und diente als Maßstab.
- **Umsetzung** (Commit `79e51ab`): ein `<svg aria-hidden="true" focusable="false" data-logo-schriftzug>` mit zwei `<path>`. Die Pfaddaten stehen als `SCHRIFTZUG_PATH_CRAFTOS` und `SCHRIFTZUG_PATH_UNTERZEILE` mit Herkunftskommentar im Code. `viewBox="0 0 117.421875 34"`. `sm`/`lg` skalieren `width`/`height` mit 16/18 bzw. 20/18. Kein `font-bold`/`font-medium` mehr in der Datei, der Linkname `aria-label="CraftOS Startseite"` ist unverändert.
- **Schriftlisten:** `app/layout.tsx` lädt Clash 600, General 400 und General 600 mit `display: "swap"`; Variablen unverändert. `public/fonts/` enthält weiterhin alle sechs Dateien (D-04).
- **Abnahme** (Block B3, ohne `--update-snapshots`):
  - `logo-schriftzug.pw.cjs`: 5 bestanden, 7 übersprungen (WebKit; Netzfall nur einmal in `chromium-1440`).
  - Header und Footer bei 1440 und 390: innerhalb `maxDiffPixels: 40`, `threshold: 0.1`; die Offline-Probe ergab 34 abweichende Pixel je Aufnahme.
  - Box 117,421875 × 34 px, Abweichung 0.
  - Netz: Auf `/impressum` und den sechs Gate-Seiten gibt es keine Anfrage an die drei entfallenen Schnitte (Prüfung per Inhalts-Hash) und genau drei Schrift-Preloads.
  - Unit-Test 4/4.
  - `git log -- craftos/tests/e2e/logo-schriftzug.pw.cjs-snapshots` zeigt nur `106a83b`.
- **Sichtprüfung:** Ganzseiten-Screenshots `/` und `/funktionen` bei 1440 und 390 px liegen vorher/nachher unter `…/scratchpad/10-b/vorher/` und `…/nachher/`. Die Seitenhöhen sind identisch. Abweichende Pixel gibt es nur in den beiden Schriftzug-Flächen (je 198 + 2 Pixel), nirgends sonst. Der Ausschnitt `…/scratchpad/10-b/gen/crop-header-vorher-nachher.png` zeigt gleiche Form und Lage; es entfallen nur die Farbsäume der LCD-Glättung.

## Aufgabe 3: Messprotokoll je Gate-Seite

Score / Median-LCP in ms, Kennzeichnung wie oben.

| Gate-Seite | Vorher (B1) | Nach Schrifthebel (B4) | A/B `inlineCss` (B5, verworfen) | Endstand (B6, Commit `79e51ab`) | LCP-Element |
|---|---|---|---|---|---|
| `/` | 92 / 3.276 | 94 / 2.977 | 93 / 3.125 | **94 / 2.972** | `h1#startseite-titel` |
| `/funktionen` | 92 / 3.286 | 94 / 2.980 | 94 / 3.012 | **94 / 2.999** | `h1#funktionen-titel` |
| `/funktionen/angebote` | 90 / 3.476 | 94 / 3.003 | 92 / 3.302 | **94 / 3.033** | `h1#funktion-titel` |
| `/gewerke/shk` | 87 / 3.970 | 93 / 3.127 | 92 / 3.269 | **93 / 3.205** | `p#antwort` |
| `/vergleich/handwerkersoftware-kleine-betriebe` | 89 / 3.617 | 95 / 2.855 | 90 / 3.610 | **95 / 2.823** | `p#antwort` |
| `/blog/handwerkerrechnung-schreiben` | 88 / 3.660 | 96 / 2.816 | 94 / 3.119 | **95 / 2.855** | `h1#artikel-titel` |
| `/impressum` (nur A11y-Gate) | – | 96 / 2.707 | 92 / 3.316 | – | `h1.mt-3` |

- **Wirkung Schrifthebel** (B1 → B6): LCP −287 bis −805 ms, Score +2 bis +7. Drei der sechs Gate-Seiten erreichen im Endstand Score ≥ 95, alle sechs verfehlen LCP < 2.500 ms.
- **Entscheid `inlineCss`:** verworfen.
  - Gegenüber dem Schrifthebel steigt der LCP auf allen sechs Gate-Seiten: `/` +148, `/funktionen` +32, `/funktionen/angebote` +299, `/gewerke/shk` +142, `/vergleich/…` +755 und `/blog/…` +303 ms.
  - Der Score fällt auf fünf Seiten.
  - Das HTML von `/` wächst auf 750.012 Byte mit 2 `<style>`-Tags.
  - Der render-blocking-Befund verschwindet zwar, die größere HTML-Übertragung kostet aber mehr.
  - `next.config.js` ist unverändert. Die Sicherheitsheader (nosniff, SAMEORIGIN, Referrer-Policy) waren auch im A/B-Build vorhanden.
- **JavaScript geprüft, kein Hebel übernommen:**
  - `legacy-javascript-insight` (14 KiB, bis 150 ms) betrifft ausschließlich Next.js' eingebautes Polyfill-Modul im Laufzeit-Chunk (`Array.prototype.at/flat/flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimStart/trimEnd`). Laut `node_modules/next/dist/docs/03-architecture/supported-browsers.md` steuert `browserslist` diese Polyfills nicht, und es gibt keinen dokumentierten Schalter.
  - `unused-javascript` (26 KiB) liegt im selben Chunk (react-dom, Router).
  - Ein Eingriff über interne Modulpfade wäre undokumentiert und brächte laut Lighthouse höchstens 150 ms. Damit käme keine Gate-Seite unter 2.500 ms (beste Seite 2.823 ms).
  - Analytics und Speed Insights bleiben (D-13).
- **Accessibility (Endstand):** 100 auf allen sechs Gate-Seiten und den vier Info-Seiten. `/impressum` hat 96 (nur `color-contrast`, Rechtsseite aus Paket (c), siehe K-4).
- **Info-Seiten Endstand (B6):**

  | URL | Score / LCP |
  |---|---|
  | `/preise` | 96 / 2.817 |
  | `/app` | 93 / 3.009 |
  | `/hilfe/rechnung-fertigstellen` | 96 / 2.814 |
  | `/rechner/stundensatz` | 95 / 2.822 |

  Im Endstand gilt: 0 ungültige Läufe, Lighthouse-Exit 1 (Gate-Verstoß LCP, als offene Abweichung dokumentiert).

### CLS der acht Snippet-Seiten (Bestandsmodus, Block B6, ohne reduzierte Bewegung)

| Seite | CLS (3 Läufe) | LCP Playwright (ms) |
|---|---|---|
| `/funktionen/dashboard` | 0 / 0 / 0 | 1.148 / 1.220 / 1.240 |
| `/funktionen/angebote` | 0 / 0 / 0 | 1.200 / 1.292 / 1.276 |
| `/funktionen/plantafel` | 0 / 0 / 0 | 1.208 / 1.264 / 1.260 |
| `/funktionen/rechnungen` | 0 / 0 / 0 | 1.176 / 1.140 / 1.236 |
| `/funktionen/eingangsrechnungen` | 0 / 0 / 0 | 1.316 / 1.356 / 1.304 |
| `/funktionen/zeiterfassung` | 0 / 0 / 0 | 1.264 / 1.280 / 1.176 |
| `/funktionen/lager` | 0 / 0 / 0 | 1.220 / 1.204 / 1.184 |
| `/funktionen/aufmass` | 0 / 0 / 0 | 1.240 / 1.264 / 1.280 |

Der Bestandsmodus endete mit Exit 0 und maximalem CLS 0 über alle 21 Routen.

### Felddaten (Vercel Speed Insights, Produktion, vom Orchestrator bereitgestellt)

- **Zeitraum und Umfang:** 20.–23.10.2026, 41 LCP-Messungen. Abfrage `vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 -e production --since 30d`, Rohdaten im Scratchpad (`si-*.json`, `d.json`).
- **LCP:** gesamt p75 620 ms, p90 808 ms, Maximum 1.871 ms. Nach Gerät: Desktop p75 620 ms, Mobil p75 446 ms. Nach Seite: `/` p75 699 ms (n = 20), `/support` 1.048 ms (n = 2).
- **Weitere Werte:** INP p75 40 ms, CLS p75 0, FCP p75 604 ms, TTFB p75 104 ms.
- **Grenze:** Die Stichprobe ist klein (41 Messungen, wenige Tage, überwiegend Startseite), und die Felddaten stammen aus Produktion (Vercel, Brotli, Stand vor 10-09). Sie sind ein Beleg, dass echte Besuche weit unter 2,5 s liegen, aber kein Ersatz für das Labor-Gate. Die Gate-Schwellen sind unverändert.

## Offene Abweichung nach D-13 (QA-04, LCP)

- **Gate:** Median-LCP < 2.500 ms auf allen sechs Gate-Seiten (Labordaten, mobil, lokal). **Endstand:** 2.823–3.205 ms. Der Score liegt bei 93–95 (Gate ≥ 95 auf drei Seiten erreicht).
- **LCP-Elemente:** Es handelt sich immer um Text, entweder die H1 in Clash 600 oder den Antwortabsatz `p#antwort` in General 400/600. Ein LCP-Bild gibt es nicht.
- **Geprüfte Hebel:**
  1. Schrifthebel nach § 7: übernommen, −287 bis −805 ms.
  2. `inlineCss`-A/B: verworfen, schlechter.
  3. JavaScript: kein funktionsneutraler, dokumentierter Hebel.
- **Ursache (Pitfall 1 und 2):** Lantern rechnet die drei verbliebenen Schrift-Preloads (zusammen etwa 60 KB) und den Laufzeit-Chunk vor dem Text-LCP ein. Lokal liefert `next start` gzip statt Brotli. Die Recherche hatte live mit „nur Clash 600 + General 400“ 2.131 ms gemessen; lokal liegt das Niveau etwa 500–700 ms höher.
- **Nicht umgesetzt, weil sichtbar (nur als Inhaberfrage, 10-UI-SPEC § 7.2):**
  - (a) `font-display: optional` für die verbliebenen Schnitte (Ersatzschrift beim ersten Besuch sichtbar);
  - (b) General 600 nicht mehr laden (synthetischer Fettdruck auf über 100 Elementen);
  - (c) Systemschrift statt Clash 600 für H1 im ersten Bildschirm;
  - (d) Funktionen oder Skripte entfernen bzw. verzögern (Funktionsverlust).
- **Bewertung:** Der Orchestrator bewertet QA-04 in 10-07. Die Endmessung auf dem zusammengeführten Stand folgt in 10-12.

## Task Commits

1. **Aufgabe 1: Gate-Seiten** – `fd2beb7` (feat)
2. **Aufgabe 2: Referenzen vorher** – `106a83b` (test)
3. **Aufgabe 2: RED Logo-Test** – `8454af6` (test)
4. **Aufgabe 2: GREEN SVG und Schriftlisten** – `79e51ab` (perf)
5. **Aufgabe 3:** keine Codeänderung übernommen (`inlineCss` zurückgenommen), daher nur dieses SUMMARY (`docs(10-09): SUMMARY`)

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `vitest run tests/lighthouse-core.test.ts tests/craftos-logo.test.ts` | 25/25 grün |
| `npm run lint` / `npm run typecheck` | grün |
| `npm run build` (B1, B3, B5, B6 unter Sperre) | grün |
| `logo-schriftzug.pw.cjs` ohne Update | 5 bestanden, 7 übersprungen, 0 rot |
| GATE_ROUTEN-Prüfung, `summary-kandidaten.json`, `summary-info.json` | vorhanden |
| Lighthouse Endstand | Exit 1 (LCP, offene Abweichung), 0 ungültige Läufe |
| Bestandsmodus | Exit 0, CLS 0 auf allen Routen |
| Port 3102 nach jedem Block | frei |

## Decisions Made

Siehe `key-decisions`. Context7 war in dieser Sitzung nicht als Werkzeug verfügbar. Für `next/font` und `inlineCss` wurden die lokalen Docs unter `craftos/node_modules/next/dist/docs/` genutzt (`inlineCss.md`, `supported-browsers.md`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 – Blocking] Graustufen-Glättung im Screenshot-Vergleich**
- **Found during:** Aufgabe 2
- **Issue:** Chromium glättet Text unter Windows per LCD-Subpixel (1.740 farbige Kantenpixel in der Referenz), SVG-Pfade immer in Graustufen. Selbst bei bester Lage blieben mindestens 142 Pixel Abweichung bei erlaubten 40. Der Vergleich hätte die Glättungsart gemessen statt der Form.
- **Fix:** `test.use({ launchOptions: { args: ['--disable-lcd-text'] } })` für Referenz und Vergleich. Die Referenzen entstanden vor der Änderung neu, also vor dem Referenz-Commit. Toleranzen, Ausschnitt, `deviceScaleFactor` und Box-Regel sind unverändert. Mit Graustufen lagen alle vier Aufnahmen bei 34 Pixeln.
- **Folge für den Inhaber:** Unter Windows mit ClearType fehlen am Schriftzug die Farbsäume; Form, Lage und Farbe sind gleich. macOS, iOS und Android glätten Text ohnehin in Graustufen.
- **Commit:** `106a83b`

**2. [Rule 1 – Bug] `toHaveScreenshot` nahm CSS-Pixel auf**
- **Issue:** Standard `scale: 'css'` verkleinert die dsf-2-Aufnahme auf 118 × 34 Pixel, sodass `deviceScaleFactor: 2` wirkungslos wäre.
- **Fix:** `scale: 'device'` (236 × 68/70 Pixel), vor dem Referenz-Commit.
- **Commit:** `106a83b`

**3. [Rule 1 – Bug] `.logo svg` im Header zwang den Schriftzug auf 36 × 36 px**
- **Found during:** Aufgabe 2, erster Lauf nach der Umstellung (Box-Prüfung rot)
- **Fix:** Maße zusätzlich als Inline-Stil am Schriftzug-SVG. `Header.module.css` blieb unverändert, weil es nicht im Dateibesitz des Plans liegt.
- **Commit:** `79e51ab`

**4. Netzfall per Inhalts-Hash:** next/font benennt die Dateien um. Die Spec vergleicht deshalb den SHA-256 jeder geladenen `.woff2` mit den drei Dateien in `public/fonts/` statt mit dem Namen. Das ist robuster als ein Namensvergleich; der Vertragspunkt bleibt unverändert.

**5. Bedienfehler ohne Folgen:**
- Der erste Build von B1 scheiterte am Typcheck des damals noch nicht committeten Testentwurfs (`noUncheckedIndexedAccess`). Die Typen wurden korrigiert und B1 wiederholt.
- Ein noch wartender Lauf (eigene PID 365214, ohne Sperre) wurde gezielt beendet, um die Referenzen gleich mit Graustufen aufzunehmen.
- Zwei durch Shell-Quoting hängende eigene `grep`-Prozesse wurden per eigener PID beendet.

**Total deviations:** 3 automatisch behoben, 1 Robustheitsentscheidung, Bedienfehler ohne Code-Einfluss. **Impact:** keine Ausweitung des Umfangs, keine sichtbare Designänderung.

## Issues Encountered

- Das LCP-Gate wird lokal nicht erreicht (siehe offene Abweichung).
- `/impressum` hat Accessibility 96 (`color-contrast`). Das liegt bei Paket (c) und ist wie im Plan erwartet.

## Übergaben

- **10-06 / DESIGN-V2 § 19 (K-12):** Absatz „Logo als SVG, entfallene Schnitte“.
  - Der Schriftzug ist ein SVG aus Clash 700 und General 500 (Lizenz ITF FFL 2.0, Logos und Vektordateien erlaubt, Subsetting verboten).
  - Geladen werden nur noch Clash 600 sowie General 400 und 600.
  - Die Dateien bleiben im Repo.
  - Die Spec vergleicht in Graustufen.
- **10-06 / Paket (a):** Nach § 7.3 fällt `SupplementalScene.module.css` Z. 83 (`font-weight: 500`) jetzt sichtbar auf General 400 zurück. Paket (a) setzt dort `400`.
- **10-12 (Endmessung):**
  - Gate-Liste `/`, `/funktionen`, `/funktionen/angebote`, `/gewerke/shk`, `/vergleich/handwerkersoftware-kleine-betriebe`, `/blog/handwerkerrechnung-schreiben`.
  - `inlineCss` ist verworfen (Zahlen oben).
  - Offene LCP-Abweichung mit den Inhaberoptionen (a)–(d).
  - Wegen ±150 ms Laufstreuung den Median aus 3 Läufen nicht als Punktwert überinterpretieren.
- **K-4, Merge-Reihenfolge:**
  - Auf dem Stand von Paket (b) zeigen die Rechtsseiten ohne Clash 700 synthetischen Fettdruck, bis Paket (c) sie auf 600 umstellt. Paket (c) sollte vor oder mit (b) gemergt werden; sonst ist der synthetische Fettdruck auf `/impressum`, `/datenschutz` und `/agb` kurzzeitig live.
  - Die Logo-Referenzbilder sind an `chromium-1243` und Windows gebunden (Dateisuffix `-win32`).
- **Orchestrator (10-07):** QA-04 bewerten, mit Labordaten (oben) und Felddaten (p75 446–699 ms, n = 41, kleine Stichprobe).

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. Die Sicherheitsheader in `next.config.js` sind unverändert (die Datei ist am Ende nicht geändert). Die Erzeugungsskripte und ihre Abhängigkeiten liegen nur im Scratchpad.

## Next Phase Readiness

Der Schrifthebel ist designneutral umgesetzt und abgesichert. QA-04 ist auf dem Stand von Paket (b) beim Score teilweise und beim LCP nicht erfüllt; die Abweichung ist mit Zahlen belegt. 10-12 misst auf dem zusammengeführten Stand nach.

## Self-Check: PASSED

- FOUND: craftos/tests/craftos-logo.test.ts, craftos/tests/e2e/logo-schriftzug.pw.cjs, craftos/components/CraftOSLogo.tsx, vier Referenzbilder, sechs Schriftdateien in public/fonts
- FOUND: fd2beb7, 106a83b, 8454af6, 79e51ab
