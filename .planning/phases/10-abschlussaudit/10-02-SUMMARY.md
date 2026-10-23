---
phase: 10-abschlussaudit
plan: 02
subsystem: testing
tags: [paket-b, performance, lighthouse, pruefsuite, flakes, release-helfer]

requires:
  - phase: 09
    provides: PHASE-09-ROLLOUT.md (Startgate), tests/release-repos.ts, FeatureSnippet data-running/data-timer
provides:
  - "Lighthouse 13.5.0 als exakt gepinnte devDependency"
  - "scripts/lib/lighthouse-core.mjs (rein): median, slug, kennzahlen, hauptbefunde, bewerte, bewerteKategorie, zusammenfassung, optionen, Routenlisten"
  - "performance-audit.mjs --lighthouse (Median aus N Läufen, frischer Chrome je Lauf, Gate, Exit 1/2, summary[-block].json)"
  - "Bestandsmodus mit den acht Snippet-Detailseiten (CLS ohne reduzierte Bewegung)"
  - "Deterministische WebKit-Fälle Tab-Sichtbarkeit und Pause; Release-Tests über tests/release-repos.ts; K-1-Parität"
affects: [10-09, 10-12, 10-06]

tech-stack:
  added: [lighthouse@13.5.0]
  patterns:
    - "Reiner Kern + CLI-Zweig: Auswertung in scripts/lib/*.mjs, Browser/Netz nur im Skript"
    - "Zeitabhängige E2E-Fälle: Zustand per Attribut (data-running, data-timer) bzw. im Browser per MutationObserver/rAF beobachten, Stabilität per expect.poll statt waitForTimeout"

key-files:
  created:
    - craftos/scripts/lib/lighthouse-core.mjs
    - craftos/tests/lighthouse-core.test.ts
  modified:
    - craftos/package.json
    - craftos/package-lock.json
    - craftos/scripts/performance-audit.mjs
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/product-register.test.ts
    - craftos/tests/e2e/function-illustrations.pw.cjs

key-decisions:
  - "median(): bei gerader Anzahl gültiger Läufe gilt das untere Mittel (kleinerer der beiden mittleren Werte), wie im Vertrag „unteres Mittel“; tritt nur nach Ausfällen auf"
  - "Kennzeichnung folgt der tatsächlichen Laufzahl (Probe mit --runs=1: „Median aus 1 Lauf“); bei 3 Läufen exakt „Labordaten, mobil, lokal, Median aus 3 Läufen, URL“, bei https-Herkunft „live“"
  - "A11y-Gate greift nur, wenn Accessibility gemessen wurde (--kategorien=accessibility); ein gemessener, aber fehlender Wert zählt als Verstoß"
  - "LCP-Element in Lighthouse 13 aus dem Insight lcp-breakdown-insight (Audit largest-contentful-paint-element gibt es nicht mehr), Rückfall auf das alte Audit"
  - "Pause-Fall: Phasenwechsel in Phase 3 wird statt der Phasennummer '3' über die unveränderte Phase während der Pause geprüft, damit eine verspätete Tastatureingabe unter Last nicht rot macht"

patterns-established:
  - "Messblöcke: --block=<name> schreibt summary-<name>.json, damit Blöcke mit Sperrfreigabe dazwischen sich nicht überschreiben"

requirements-completed: []

duration: 27min
completed: 2026-10-23
---

# Phase 10 Plan 02: Lighthouse-Messwerkzeug und angepasste Prüfsuite Summary

**Lighthouse 13.5.0 misst lokal per `performance-audit.mjs --lighthouse` mit Median, Gate und Exitcode. Die WebKit-Zeitflakes sind deterministisch, und die Release-Tests überspringen nichts mehr still.**

## Performance

- **Duration:** ca. 27 min (10:53–11:20 UTC)
- **Started:** 2026-10-23T10:53:00Z
- **Completed:** 2026-10-23T11:20:03Z
- **Tasks:** 2/2
- **Files modified:** 8

## Accomplishments

- **Startgate:** `PHASE-09-ROLLOUT.md` vorhanden, `craftos/` sauber, Port 3102 frei. `node_modules` lag im Worktree bereits als echtes Verzeichnis vor (installiert 12:48 Ortszeit, kein Junction). Ein zusätzliches `npm ci` entfiel, weil die Installation unter Sperre ohnehin den Baum abgeglichen hat.
- **Installation (unter Sperre):** `npm install --save-dev --save-exact lighthouse@13.5.0`. `package.json` führt `"lighthouse": "13.5.0"`, im Paket ist kein `postinstall` hinterlegt.
  - **Lockfile-Befund:** 102 neue Einträge (Lighthouse und Abhängigkeiten), kein Eintrag entfernt. Einzige Änderung an einem Bestandseintrag ist `zod` 4.4.3 → 4.6.7, weil `chromium-bidi` (über `puppeteer-core`) `zod ^4.6.5` verlangt und `eslint-plugin-react-hooks` dieselbe Kopie teilt. Lint läuft danach grün.
  - **`npm ls axe-core`:** nur `axe-core@4.13.0` (3 Vorkommen, dedupliziert). Kein Override nötig.
- **lighthouse-core.mjs + Test:** 21 Unit-Fälle grün (Median, Slug, Kennzahlen inkl. runtimeError, Gate-Gründe, Kategorien, Hauptbefunde, Routenlisten, Zusammenfassung mit Info-, Gate- und A11y-Gate-Routen, Live-Kennzeichnung, CLI-Optionen inkl. MSYS-Hinweis).
- **Modus `--lighthouse`:** eigener Zweig vor dem Bestand. Er bietet die Optionen `--paths=`, `--runs=`, `--kategorien=` und `--block=`; Optionsfehler enden mit Exit 2 (geprüft). Jeder Lauf startet einen frischen Chrome über chrome-launcher mit `chromium.executablePath()`. Ungültige Läufe werden gezählt und je URL bis zu zweimal nachgeholt. `computeMedianRun`/`filterToValidRuns` stammen aus `lighthouse/core/lib/median-run.js`. Die Ergebnisse liegen unter `test-results/lighthouse/<slug>-<lauf>.json`, `<slug>-kategorien.json` und `summary.json` bzw. `summary-<block>.json`, jeweils mit Lighthouse-Version, Browser-UA, `benchmarkIndex` und Chrome-Pfad.
- **Funktionsprobe (unter Sperre, Build + `next start -p 3102`):**
  - Aufruf: `--lighthouse --paths=/ --runs=1 --kategorien=accessibility`.
  - Chrome stammt aus `ms-playwright/chromium-1243` (HeadlessChrome 153.0.0.0) und lief mit Lighthouse 13.5.0 fehlerfrei; ein Rückfall auf `chromium-1228` war nicht nötig.
  - `/` lieferte Score 92, LCP 3.328 ms, FCP 1.364 ms, SI 1.622 ms, TBT 50 ms, CLS 0 und Accessibility 100 bei 0 ungültigen Läufen.
  - LCP-Element: `h1#startseite-titel` im HomeHero.
  - Hauptbefunde: render-blocking (LCP −500 ms), legacy-javascript (−150 ms), network-dependency-tree.
  - Exit 1 wegen Gate-Verstoß; laut Plan in der Probe zulässig. Die Messschleife folgt in 10-09.
- **Bestandsmodus:** Die Routenliste enthält jetzt die acht Snippet-Seiten. Ein Probelauf nur mit diesen acht Seiten (`AUDIT_ROUTES`, je drei Läufe) ergab **CLS 0,0000 auf allen acht** (ohne reduzierte Bewegung; 07 IN-05 Teil 2) und LCP 1,23–1,72 s (Playwright-Messung, nicht Lighthouse). Die Klicks auf „Menü öffnen/schließen“ und „Personalkosten pro Jahr in Euro“ sind unverändert (K-11).
- **Prüfsuite:**
  - **Testkontext-Muster:** `/(?<!\p{L})test|kostenlos|ohne zahlungs/iu`. „Spätestens“ und „Bestandstest“ gelten nicht mehr als Testkontext, „Testtage“, „10 Tage kostenlos testen“ und „ohne Zahlungsdaten“ weiterhin. Der Fall war vorher rot und ist jetzt grün.
  - **Release-Helfer:** `pricing-parity.test.ts` (Snapshot-Suite) und `product-register.test.ts` (Tags IN-04, lokale Produkt-Repositories, Mobile-Quellen über `releaseDatei`) verwenden jetzt `tests/release-repos.ts`.
    - Mit Repos: 25/25 grün.
    - Ohne Repo und mit `CRAFTOS_REQUIRE_RELEASE=1`: 4 sichtbare Fehlschläge („Release-Belege: CRAFTOS_WEB_REPO → … nicht gefunden“).
    - Ohne Repo und ohne Pflicht: 5 sichtbar übersprungene Suiten, der Grund steht im Titel.
  - **K-1:** `toHaveLength(ZUSATZ_IDS.length)` mit Paritätskommentar, im selben Commit wie die Helferumstellung.
- **Flakes:**
  - **Tab-Sichtbarkeit:** wartet jetzt auf `data-timer="cleared"`, bevor die Phase gelesen und `runFor` aufgerufen wird.
  - **Pause:** enthält kein `waitForTimeout` mehr; die Zahl im File sank von 5 auf 1, der verbleibende Aufruf steckt im Helfer `advancePhase`. Eintritt in Phase 3 und Bewegung werden im Browser beobachtet (MutationObserver und Animationsframes). Die Pause ist über `data-running="false"` und `data-timer="cleared"` belegt, der Stillstand über zehn gleiche Abfragen per `expect.poll`, die Wiederaufnahme per `expect.poll` (15 s).
  - **05 Nr. 2:** Der Fall „außerhalb des Viewports“ ist durch die bestehende Bedingung abgedeckt und hier nur durch die Wiederholung belegt.
- **E2E (unter Sperre):** `function-illustrations.pw.cjs` vollständig: **110 bestanden, 0 fehlgeschlagen, 22 übersprungen**. Die 22 Skips sind bestehende `test.skip(hasTouch, …)` für Touch-Projekte. Die WebKit-Wiederholung (`webkit-1440`, `webkit-390-touch`, `--repeat-each=5`, Fälle :241, :262 Viewport, :281 Tab, :479 Pause) ergab **40/40 bestanden**.

## Task Commits

1. **Aufgabe 1: Installation** – `e5cf4f8` (build)
2. **Aufgabe 1: RED lighthouse-core** – `b84c74d` (test)
3. **Aufgabe 1: GREEN Lighthouse-Modus** – `0b67c9b` (feat)
4. **Aufgabe 2: RED Testkontext-Muster** – `1e83aa1` (test)
5. **Aufgabe 2: GREEN Prüfsuite, Release-Helfer, K-1, Flakes** – `9388865` (fix)

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `vitest run tests/lighthouse-core.test.ts tests/pricing-parity.test.ts tests/product-register.test.ts` | 46/46 grün |
| `npm run typecheck` | grün |
| `npm run lint` | grün (0 Befunde) |
| `npm run build` (zweimal, unter Sperre) | grün |
| Lighthouse-Probe `/` | vollständige summary.json, 0 ungültige Läufe, Exit 1 (Gate, zulässig) |
| `function-illustrations.pw.cjs` voll | 110 bestanden, 22 übersprungen (Touch, Bestand), 0 rot |
| WebKit `--repeat-each=5` | 40/40 |
| Bestandsmodus, 8 Snippet-Seiten | CLS 0 auf allen |
| Port 3102 nach jedem Lauf | frei |

## Decisions Made

Siehe `key-decisions` im Frontmatter. Context7 war in dieser Sitzung nicht als Werkzeug verfügbar (auch nicht als `ctx7`-CLI). Die Node-API ist daher aus der README laut 10-RESEARCH und aus dem installierten Quelltext belegt (`core/index.js`, `core/lib/median-run.js`, `core/audits/insights/lcp-breakdown-insight.js`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] LCP-Element-Quelle in Lighthouse 13**
- **Found during:** Aufgabe 1
- **Issue:** Der Vertrag nennt `largest-contentful-paint-element`. Dieses Audit existiert in 13.5.0 nicht mehr.
- **Fix:** `kennzahlen` sucht den Knoten zuerst in `lcp-breakdown-insight` und fällt auf das alte Audit zurück. Beides ist getestet.
- **Commit:** `0b67c9b`

**2. [Rule 3 – Blocking] Typcheck der .mjs-Rückgabe im TS-Test**
- **Issue:** `tsc` leitete `urls` als `{}` ab (TS7053).
- **Fix:** JSDoc-Typedefs (`UrlErgebnis`, `Zusammenfassung`) in `lighthouse-core.mjs`.
- **Commit:** `0b67c9b`

**3. [Rule 1 – Bug, Testrobustheit] Pause-Fall prüft „Phase unverändert“ statt fest „3“**
- **Issue:** Eine unter Last verspätete Tastatureingabe kann in Phase 4 landen. Das ist dieselbe Flake-Familie.
- **Fix:** Die Phase wird beim Pausieren gelesen, danach wird ihre Unveränderlichkeit geprüft. Eintritt in Phase 3 und Bewegung werden weiterhin streng geprüft.
- **Commit:** `9388865`

**4. Zusätzliche Exporte über den Vertrag hinaus:** `kennzeichnung`, `hauptbefunde`, `optionen`, `KATEGORIEN` und `GRENZEN`, damit Kennzeichnung, Befunde und Optionsprüfung testbar sind. Das ist eine Erweiterung und ändert keinen Vertragspunkt.

**5. Bedienfehler ohne Folgen:** Der erste Bestandsmodus-Lauf lief ohne `MSYS_NO_PATHCONV=1`; Git Bash schrieb `AUDIT_ROUTES` um, und der Lauf brach mit „invalid URL“ ab. Mit der Variable wurde er unter erneuter Sperre wiederholt und war grün. Es entstand kein Code-Einfluss.

**Total deviations:** 3 automatisch behoben, 1 Erweiterung, 1 Bedienfehler. **Impact:** keine Ausweitung des Umfangs.

## Issues Encountered

- Die lokale LCP der Startseite lag in der Einzelprobe bei 3,33 s, also deutlich über der Schätzung aus der Recherche (2,6–2,8 s). Grundlage ist ein Lauf direkt nach dem Build; aussagekräftig ist erst der Median aus 3 Läufen in 10-09. Der größte Befund ist render-blocking mit −500 ms.

## Übergaben

- **10-09 (Paket b, selber Worktree):** Messschleife mit `--lighthouse` (Standard 3 Läufe) und `--block=` für die Blockteilung. Ausgangswert `/` lokal: Score 92, LCP 3.328 ms (1 Lauf). Die Hebel nach Befund sind render-blocking CSS und Schriftlast (D-13), danach legacy-javascript.
- **10-06 / Paket d:** K-1 ist erledigt. `product-register.test.ts` prüft Parität mit `ZUSATZ_IDS.length` und bleibt grün, wenn (d) auf 10 Extras erhöht; die feste Zahl prüft `tests/funktionsgruppen.test.ts`.
- **Orchestrator (Merge):** Der Lockfile-Diff enthält `zod` 4.6.7 (siehe oben). Andere Worktrees mit eigenem `npm ci` erhalten nach dem Merge dieselbe Version.
- Sonst keine offenen Übergaben.

## Known Stubs

Keine.

## Next Phase Readiness

Das Werkzeug für das Lighthouse-Gate ist bereit, die Prüfsuite ist stabil, und 10-09 kann die Messschleife fahren.

## Self-Check: PASSED

- FOUND: craftos/scripts/lib/lighthouse-core.mjs, craftos/tests/lighthouse-core.test.ts, craftos/scripts/performance-audit.mjs
- FOUND: e5cf4f8, b84c74d, 0b67c9b, 1e83aa1, 9388865
