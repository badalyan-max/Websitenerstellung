---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 02
subsystem: designsystem-v2
tags: [designsystem-v2, bausteine, devicepair, featurelist, evidence, kaskade, tdd, vitest, playwright]

# Dependency graph
requires:
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-01: TEXT_BUDGET.featureList, count.featureList, assertOneSentence, sentenceCount (components/v2/budgets.ts)"
  - phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
    provides: "v2-Bausteine BrowserFrame, PhoneFrame, DevicePair, FeatureCard, Badges, Musterseite /styleguide"
provides:
  - "craftos/lib/scenes.ts: FrameScene/Visual/FrameVisual, sechs Szenen mit evidence (voll) und screen (Kurzform), allScenes, cardScenes"
  - "craftos/lib/format.ts: euro(), germanDate()"
  - "craftos/components/v2/SceneContent.tsx: SceneContent, Frame (Server Components, übergeben scene.screen)"
  - "craftos/components/v2/evidence.ts: SCREEN_EVIDENCE, assertScreenEvidence (Kurzform-Pflicht)"
  - "craftos/components/v2/DevicePair.tsx: layout default|compact (E1), data-layout"
  - "craftos/components/v2/FeatureList.tsx (+ .module.css): Kompaktliste Zusatzfunktionen (E2)"
  - "craftos/docs/DESIGN-V2.md §12: Kaskade Phase 6"
affects: [06-04 Startseite (Hero compact, Szenen, euro), 06-05 /funktionen (cardScenes, FeatureList), Phase 7 Detailseiten]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zwei Belege je Szene: voller Release-Pfad intern (evidence), Kurzform öffentlich (screen)"
    - "Laufzeitprüfung der Kurzform im Gerät (BrowserDevice/PhoneDevice) mit owner-spezifischem Fehlertext"
    - "Gestreckter Namenslink je Listenzeile mit aria-describedby auf den Zielhinweis"

key-files:
  created:
    - craftos/lib/scenes.ts
    - craftos/lib/format.ts
    - craftos/components/v2/SceneContent.tsx
    - craftos/components/v2/evidence.ts
    - craftos/components/v2/FeatureList.tsx
    - craftos/components/v2/FeatureList.module.css
  modified:
    - craftos/docs/DESIGN-V2.md
    - craftos/lib/styleguide-content.ts
    - craftos/app/styleguide/page.tsx
    - craftos/components/v2/BrowserFrame.tsx
    - craftos/components/v2/PhoneFrame.tsx
    - craftos/components/v2/DevicePair.tsx
    - craftos/components/v2/Frames.module.css
    - craftos/tests/design-v2-frames.test.ts
    - craftos/tests/design-v2-components.test.ts
    - craftos/tests/e2e/design-v2.pw.cjs

key-decisions:
  - "06-02: data-evidence nur noch als Kurzform web:<Bildschirm>/app:<Bildschirm>; voller Pfad oder altes Präfix mobile: bricht das Rendern ab (gemeinsame Prüfung components/v2/evidence.ts)"
  - "06-02: cardScenes ordnet nur aufmass, plantafel, zeiterfassung, baudokumentation, rechnungen eine Szene zu; alle übrigen Funktionskarten zeigen bewusst das Icon-Visual"
  - "06-02: FeatureList leitet die Zielhinweis-ID aus der Eintrags-id ab (funktion-<id>-ziel) und importiert lib/funktionen.ts nicht (Plattformtyp über PlatformBadgeProps)"

patterns-established:
  - "Szenen für Rahmen nur aus lib/scenes.ts; Rahmen nur über Frame/SceneContent aus components/v2/SceneContent.tsx"
  - "Öffentliche Rahmenbelege immer scene.screen, nie scene.evidence"

requirements-completed: []

# Metrics
duration: 14min
completed: 2026-10-21
---

# Phase 6 Plan 02: Bausteinergänzungen E1–E3 und Szenen-Extraktion Summary

**DevicePair-Kompaktlage mit 160-px-Phone, budgetgeprüfte FeatureList für Zusatzfunktionen und erzwungene Kurzform-Belege web:/app: im öffentlichen HTML, dazu wiederverwendbare Szenen (lib/scenes.ts) und Rahmen-Helfer bei unveränderter Musterseite.**

## Performance

- **Duration:** ca. 14 min
- **Started:** 2026-10-21T12:20:26Z
- **Completed:** 2026-10-21T12:34:04Z
- **Tasks:** 3
- **Files modified:** 16 (6 neu, 10 geändert)

## Accomplishments

- Design-Kaskade Phase 6 in `craftos/docs/DESIGN-V2.md` §12 nachgewiesen: frontend-design-Leitlinie gelesen (Cache `e68e375d2286`, byte-identisch mit `a0b04d9ddcca`), beide ui-ux-pro-max-Befehle ausgeführt (Treffer decken sich mit der 06-UI-SPEC-Tabelle), 21st.dev und Context7 als nicht verfügbar vermerkt, Ersatz über `node_modules/next/dist/docs`; E1–E3 und A1–A7 mit je einem Satz begründet.
- Reine Extraktion: Szenen und Typen nach `lib/scenes.ts` (neues Pflichtfeld `screen`, `allScenes`, `cardScenes`), Formatierer nach `lib/format.ts`, `SceneContent`/`Frame` nach `components/v2/SceneContent.tsx`; `lib/styleguide-content.ts` re-exportiert die alten Namen.
- E3: `BrowserDevice`/`PhoneDevice` prüfen evidence gegen `^(web|app):[^\s/]+$`; `Frame` und die DevicePair-Props der Musterseite übergeben `scene.screen`; E2E-Regex angepasst.
- E1: `DevicePair layout="compact"` (data-layout an der figure, Phone 160 px, unter 768 px rechts unten über dem Browser mit −64 px, ab 768 px nebeneinander mit 48 px Überlappung und 24 px Versatz), default unverändert.
- E2: `FeatureList` als Server Component mit h3 + ul, `data-funktion`, Icon-Feld 40 × 40, Badges nur bei belegten Plattformen, Namenslink mit gestrecktem Klickbereich und aria-describedby auf „Anleitung in der Hilfe“ bzw. „Beschrieben unter {label}“, ohne Ziel kein Link und kein Hinweis.

## Task Commits

1. **Task 1: Kaskade dokumentieren, Szenen/Rahmen-Helfer extrahieren** – `d26a8b5` (refactor)
2. **Task 2: E3 Kurzform-Belege** – RED `56c9e82` (test), GREEN `4a3e98a` (feat)
3. **Task 3: E1 DevicePair compact und E2 FeatureList** – RED `f747a29` (test), GREEN `b3959a7` (feat)

## Prüfergebnisse (Plan-Verify, alle lokal)

| Prüfung | Ergebnis |
|---|---|
| Task 1: `vitest run styleguide, design-v2-budgets, design-v2-frames, design-v2-components` | 53/53 grün |
| Task 1: `npm run typecheck`, `npm run lint` | grün, ESLint ohne Befund |
| Task 2 RED | 4 erwartete Fehlschläge (Vollpfad wirft nicht ×3, Musterseiten-HTML mit Vollpfad) |
| Task 2 GREEN: `vitest run design-v2-frames, styleguide, design-v2-budgets` + typecheck + lint | 43/43 grün |
| Task 3 RED | design-v2-components: FeatureList fehlt (Importfehler); design-v2-frames: 3 compact-Fälle rot |
| Task 3 GREEN: `vitest run design-v2-components, design-v2-frames, announcements, styleguide, design-v2-budgets` | 76/76 grün |
| Gesamte Unit-Suite `vitest run` | 22 Dateien, 291/291 grün |
| `npm run typecheck`, `npm run lint`, `npm run build` | grün |
| E2E `design-v2.pw.cjs` gegen `next start -p 3100` (Chromium/WebKit, 1440/390) | 48 passed, 4 skipped (Tastaturfälle im Touch-Projekt, Bestand), 0 failed |
| Serverende | eigener Server per PID beendet (`kill -0` danach negativ), Port 3100 danach frei |

Akzeptanz-Greps: „Kaskade Phase 6“ in DESIGN-V2.md vorhanden; `screen:` in lib/scenes.ts 7×; `export const cardScenes` 1×; keine `function SceneContent|Frame` mehr in der Musterseite, Import aus `@/components/v2/SceneContent` vorhanden; kein `use client` in SceneContent.tsx; `scene.screen` in SceneContent.tsx; `(web|mobile)` in der E2E-Datei 0×; `data-layout` in DevicePair.tsx und `data-layout="compact"` in Frames.module.css vorhanden; `assertOneSentence` in FeatureList.tsx, kein `@/lib/funktionen`.

Koordination: `cli.mjs status` vor dem schweren Lauf gelesen (edgar bereit, edgarspc offline); für das Website-Repo gibt es kein Rezept, daher Build und E2E lokal als einziger schwerer Prozess.

## Decisions Made

- Gemeinsame Belegprüfung in `components/v2/evidence.ts` statt doppelter Regex in BrowserFrame und PhoneFrame; der Bestandstext für leeres evidence bleibt wörtlich erhalten.
- `cardScenes` als `Partial<Record<string, FrameVisual>>`, damit fehlende Slugs typseitig als „Icon-Visual“ erkennbar sind.
- Zielhinweis-IDs deterministisch aus der Eintrags-id (`funktion-<id>-ziel`), weil die ids registerweit eindeutig sind und Server-HTML stabil bleibt.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Kritische Funktion] Gemeinsames Prüfmodul `components/v2/evidence.ts`**
- **Found during:** Task 2
- **Issue:** Der Plan sah die Formatprüfung getrennt in BrowserFrame.tsx und PhoneFrame.tsx vor; zwei Kopien der Regex könnten auseinanderlaufen und die Informationsfreigabe (T-06-04) aufweichen.
- **Fix:** `assertScreenEvidence(owner, evidence)` und `SCREEN_EVIDENCE` in einer neuen Datei, von beiden Geräten genutzt; Fehlertexte exakt wie im Plan.
- **Files modified:** craftos/components/v2/evidence.ts (neu), BrowserFrame.tsx, PhoneFrame.tsx
- **Commit:** 4a3e98a

**2. [Rule 3 - Blockierend] Zusätzlicher Export `allScenes` und Typ `FrameVisual` in lib/scenes.ts**
- **Found during:** Task 1/2
- **Issue:** Der Test „jede Szene hat eine passende Kurzform“ braucht eine vollständige Szenenliste; `cardScenes` braucht einen benannten Rahmen-Visual-Typ.
- **Fix:** `allScenes` (sechs Szenen) und `FrameVisual = Extract<Visual, …>` exportiert; die Szenen selbst sind ebenfalls benannt exportiert (für 06-04/06-05).
- **Commit:** d26a8b5

**3. [Rule 1 - Typfehler] Testzugriff `links[0]` unter `noUncheckedIndexedAccess`**
- **Found during:** Task 3 (typecheck)
- **Fix:** `(links[0] ?? "")` vor dem Match.
- **Commit:** b3959a7

---

**Total deviations:** 3 auto-fixed (je 1× Rule 1, 2, 3). **Impact:** keine Umfangsänderung; Musterseite sichtbar unverändert (Unit- und E2E-Prüfungen grün).

## Issues Encountered

- `vitest --reporter=json` schreibt bei Importfehlern einer Testdatei kein neues JSON; der RED-Nachweis für Task 3 wurde deshalb mit der Textausgabe geführt.

## Known Stubs

Keine. FeatureList und DevicePair compact sind fertig, aber noch auf keiner öffentlichen Seite eingebunden; das ist laut Plan Aufgabe von 06-04 (Startseite) und 06-05 (/funktionen).

## Threat Flags

Keine neue Angriffsfläche. T-06-04 ist durch Laufzeitprüfung, Vitest (Musterseiten-HTML) und E2E-Regex umgesetzt; T-06-06: FeatureList rendert nur übergebene `target.href`, ohne Ziel kein Link.

## User Setup Required

None – no external service configuration required.

## Next Phase Readiness

- 06-03 (Header/Mega-Menü) kann parallel weiterarbeiten; Icon-Feld-Maße (A5) stehen in FeatureList als Referenz.
- 06-04 nutzt `DevicePair layout="compact"` mit `plantafelScene`/`einsaetzeScene` (`scene.screen` als evidence) und `euro()` aus lib/format.ts.
- 06-05 nutzt `cardScenes` mit `Frame` und `FeatureList` mit `ZusatzEintrag` aus lib/funktionsgruppen.ts.

## Self-Check: PASSED

Alle sechs neuen Dateien und die SUMMARY existieren; Commits d26a8b5, 56c9e82, 4a3e98a, f747a29, b3959a7 vorhanden; keine Dateilöschungen seit b261950.
