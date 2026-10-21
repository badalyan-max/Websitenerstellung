---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 05
subsystem: funktionsuebersicht
tags: [funktionsuebersicht, featurecard, featurelist, jsonld, itemlist, zwei-klicks, bento, tdd, vitest, playwright, axe]

# Dependency graph
requires:
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-01: getFunktionsgruppen() (heading, lead, label, icon, anchorHref, details, extras), TEXT_BUDGET.pageHead"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-02: FeatureList, Frame, cardScenes, Kurzform-Belege"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-03: Mega-Menü/Drawer (#navigation-funktionen), home-navigation.pw.cjs"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-04: PHASE6_SEITEN in keyword-map.test.ts, FOLD_VIEWPORTS, HomeHero-H1-Muster"
provides:
  - "craftos/app/funktionen/page.tsx: gruppierte Übersicht (Seitenkopf, 6 data-gruppe, 30 data-funktion, CtaBand, BreadcrumbList + ItemList)"
  - "craftos/components/funktionen/FunktionenHead.tsx (+ .module.css): v2-Seitenkopf mit Keyword-H1 und nav „Funktionsgruppen“"
  - "craftos/lib/schema.ts: itemListSchema(name, items)"
  - "craftos/tests/funktionen-seite.test.ts: Struktur, Parität, Schema, Altmarkup"
  - "craftos/tests/e2e/home-navigation.pw.cjs: „Zwei Klicks:“ (4 Tests) und „Funktionsübersicht:“ (3 Tests)"
  - "craftos/components/v2/BentoGrid.module.css: lg-Kachel mit wachsendem Browserrahmen, wide-Visual mittig"
affects: [06-06 Rollout und Abschluss DESIGN-01/DESIGN-03/FEAT-01, Phase 7 Funktionsseiten (FunktionenHead als Vorlage), Phase 8 (itemListSchema), Phase 10 QA]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Übersichtsseite rendert ausschließlich aus getFunktionsgruppen(); Unit-Test vergleicht data-funktion-Reihenfolge mit dem Modell"
    - "Zwei-Klick-Nachweis: Detail-Slugs per Seitenabruf gesammelt, Sichtbarkeit nach genau einer Menü-Aktivierung, Zuordnung data-funktion → data-gruppe, alle Ziele per request.get 200"
    - "Baustein-übergreifende Anpassung per Attributselektor ([data-figure], [data-frame]) und :has() im CSS-Modul"

key-files:
  created:
    - craftos/components/funktionen/FunktionenHead.tsx
    - craftos/components/funktionen/FunktionenHead.module.css
    - craftos/tests/funktionen-seite.test.ts
  modified:
    - craftos/app/funktionen/page.tsx
    - craftos/lib/schema.ts
    - craftos/app/globals.css
    - craftos/components/v2/BentoGrid.module.css
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/tests/e2e/function-illustrations.pw.cjs
    - craftos/docs/DESIGN-V2.md

key-decisions:
  - "06-05: /funktionen = FunktionenHead + 6 Gruppenabschnitte (SectionHeader → FeatureCard-Raster → FeatureList im selben Abschnitt, A6) + CtaBand; PageHero, TrialCta, Lizenz-Hinweisbox und .feature-grid/.feature-link entfallen"
  - "06-05: ItemList enthält nur die 16 Detailseiten in Gruppenreihenfolge; Zusatzfunktionen ohne eigene URL fehlen bewusst"
  - "06-05: BentoTile lg mit Browserrahmen – Rahmen füllt Breite und freie Höhe (mind. 16:10), Text am Kachelboden; wide mit Visual am Ende – Gerät mittig in seiner Spalte"

patterns-established:
  - "Seitenköpfe v2 für Übersichtsseiten: dunkle Fläche, 3-px-Amber-Unterkante, Keyword-Span nowrap, Sprungnavigation als nav mit ul"

requirements-completed: []

# Metrics
duration: 32min
completed: 2026-10-21
---

# Phase 6 Plan 05: Funktionsübersicht /funktionen Summary

**Gruppierte Funktionsübersicht aus getFunktionsgruppen() mit dunklem Keyword-Seitenkopf und Sprungnavigation, 16 FeatureCards (5 mit Szene im Rahmen) und 14 Zusatzfunktionen in sechs Gruppen, BreadcrumbList + ItemList – und im Browser belegt: alle 30 Funktionen nach einer Menü-Aktivierung erreichbar (Desktop und Mobil, Chromium und WebKit).**

## Performance

- **Duration:** ca. 32 min
- **Started:** 2026-10-21T13:28:00Z
- **Completed:** 2026-10-21T14:00:00Z
- **Tasks:** 2 (+ Zusatzauftrag Bento-Fix)
- **Files modified:** 12 (3 neu, 9 geändert)

## Accomplishments

- `itemListSchema(name, items)` nach Zielvertrag; `/funktionen` liefert `BreadcrumbList` (Start → `https://craftos.eu/`, Funktionen → `/funktionen`) und `ItemList` „Funktionen von CraftOS“ mit 16 `ListItem` – beides über `JsonLd` (escapt `<`).
- `FunktionenHead`: `#101014`, 3 px `#F2AF38` unten, H1 Display-Stufe (32 px unter 768 px, `clamp(32px, 4vw, 48px)` darüber, `hyphens: manual`), Keyword-Span „Handwerksbetriebe“ `nowrap`, Lead per `assertTextBudget("pageHead.lead")` und Satzprüfung, `<nav aria-label="Funktionsgruppen">` mit sechs 44-px-Links (Icon Amber, Rahmen `#FFFFFF25`, Fokusring 3 px `#BB7609`).
- `app/funktionen/page.tsx`: Metadaten nach Keyword-Map, sechs `section[aria-labelledby][data-gruppe]` abwechselnd Weiß/`#F7F3EB`, Raster 1/2/3 Spalten, Szene für aufmass, plantafel, zeiterfassung, baudokumentation, rechnungen, sonst Sechseck-Icon; `FeatureList` „Weitere Funktionen“ in allen sechs Gruppen (7 Einträge mit Link auf Hilfe bzw. Projektverwaltung, 7 ohne Link); `CtaBand` „Alle Funktionen selbst ausprobieren“.
- 37 Zeilen unbenutztes Alt-CSS (`.feature-grid`, `.feature-link`) aus `globals.css` entfernt (grep: keine Nutzer mehr).
- Bento-Befund aus 06-04 im Baustein behoben (Startseite und `/styleguide`).

## Task Commits

1. **Task 1 (TDD):** `87d3f76` (test, RED – 9 Fälle rot), `18af823` (feat, GREEN)
2. **Zusatz Bento-Fix:** `457791f` (fix)
3. **Task 2:** `af2eaef` (test)
4. **Test-Race in function-illustrations:** `36167a3` (fix)
5. **Kaskaden-Nachweis:** `6d52be5` (docs)

## Prüfergebnisse

- Task-1-Verify: `vitest run tests/funktionen-seite.test.ts tests/funktionsgruppen.test.ts tests/announcements.test.ts tests/content.test.ts` → **41/41**; typecheck und lint grün.
- `npm test`: **25 Dateien, 327/327** grün (darin `funktionen-seite.test.ts` 9 Fälle, `keyword-map.test.ts` mit `/funktionen`).
- `npm run lint`, `npm run typecheck`, `npm run build` grün.
- `npm run test:e2e` gegen eigenen `next start -p 3100` (Port vorher frei, `kill -0` bestätigt, über eigene PID beendet, danach frei): **256 passed, 0 failed, 48 skipped** (projektbedingte Skips), 4,6 min.
- `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`: Exit 0, 125 Routen, 0 failures, 0 badLinks, 129 Links, 18 Assets (7 „unknown“ sind die beabsichtigten 404-Proben).
- **Zwei-Klick-Nachweis** (Annotationen aus `reports/results.json`):
  - Desktop 1440 (Chromium, WebKit): nach **1 Klick** auf „Untermenü Funktionen“ **16 Funktionslinks + 6 Gruppenlinks** sichtbar; Gruppenlink „Rechnung“ → `/funktionen#rechnung`, H2 unter dem Header, `mahnwesen` sichtbar.
  - Mobil 390-Touch (Chromium, WebKit): nach **1 Tap** auf „Menü öffnen“ **16 + 6** Links sichtbar; „Baustelle“ → `/funktionen#baustelle`, `maengel` sichtbar.
  - Zuordnung in allen vier Projekten: **30 Funktionen erreichbar (16 Detail + 14 Zusatz)**, jede in einer Gruppe mit sichtbarem Gruppenlink.
  - Ziele: 23 Eintragslinks (16 + 7) und alle Panel-Links inkl. Fußleiste (Alle Funktionen, Mobile-App, Craft AI, GoBD, Warum CraftOS?) → 200.
- Funktionsübersicht: axe (wcag2a/2aa/21aa) ohne serious/critical bei 360/390/768/1024/1440, `scrollWidth − innerWidth ≤ 1`, Keyword ein ClientRect und ≤ H1-Breite; alle 6 Sprunglinks landen unter dem Header; reduzierte Bewegung ohne Animationen; 5 Rahmen gekennzeichnet; `data-evidence` nur Kurzform; ohne JavaScript 30 `[data-funktion]`, 6 Gruppen, 16 „Mehr zu“. design-v2 Budget `/funktionen`: Bildbudget, feste Maße, CLS 0.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Flake „Funktionsillustration: außerhalb des Viewports bleibt der automatische Ablauf stehen“ (WebKit)**
- **Found during:** Task 2 (voller E2E-Lauf, 2 von 8 Wiederholungen auch isoliert rot)
- **Issue:** Der Test liest `data-running="false"` nach dem Commit, die Effekt-Bereinigung (`clearTimeout`) läuft aber erst in einer späteren Browser-Aufgabe; `page.clock.runFor(25_000)` löste den alten Phasen-Timer noch aus (Phase 1 → 2). Seite und Komponente sind von diesem Plan unberührt.
- **Fix:** 50 ms Wartezeit nach dem Zustandswechsel, wie im bestehenden Helfer `advancePhase`; gleiche Absicherung im Pause-Test. Danach 24/24 isoliert grün und voller Lauf 0 failed.
- **Files modified:** craftos/tests/e2e/function-illustrations.pw.cjs
- **Commit:** 36167a3

**2. [Rule 1 - Bug] Reduced-Motion-Prüfung in WebKit sah kurzzeitige 0,01-ms-Übergänge**
- **Found during:** Task 2
- **Issue:** WebKit meldet direkt nach `networkidle` bis zu 374 `CSSTransition tab-size` aus der globalen Regel `transition-duration: 0.01ms` (Standard `transition-property: all`); keine echte Bewegung.
- **Fix:** Prüfung als `expect.poll(...).toBe(0)` (3 s) statt Momentaufnahme.
- **Files modified:** craftos/tests/e2e/home-navigation.pw.cjs
- **Commit:** af2eaef

### Zusatzauftrag (Sichtprüfung 06-04) – erledigt

- **Bento-Kacheln:** In `BentoGrid.module.css` füllt der Browserrahmen einer `lg`-Kachel die Breite und wächst mit der freien Höhe (mind. 16:10), der Text sitzt am Kachelboden – kein Leerstreifen mehr zwischen Visual und Text; auf `/styleguide` ist der Rahmen der dunklen Kachel nicht mehr schmal. Bei `wide` mit Visual am Ende steht das Gerät mittig in seiner Spalte (Abstand Text–Gerät bei 1440 px ca. 350 statt 500 px). Nur CSS im Baustein, keine Budgets oder Tokens berührt. Commit `457791f`.

### Bewusste Abweichungen

- **A6:** Raster und `FeatureList` im selben Gruppenabschnitt (wie im Plan vorgesehen).
- **H1-Breite `max-width: 20ch`:** zwei Zeilen bei 1440 px statt einer überlangen ersten Zeile.

## Issues Encountered

- Ein Vergleichsbuild des Basis-Commits in einem temporären Worktree scheiterte an Turbopack (verlinktes `node_modules`); Worktree und Verknüpfung wurden entfernt, `node_modules` des Hauptbaums ist unverändert. Die Flake-Ursache wurde stattdessen am Code belegt (siehe Abweichung 1).
- Git-Bash wandelt Pfadargumente wie `/funktionen` für Node-Skripte um; Screenshot-Skripte laufen mit `MSYS_NO_PATHCONV=1`.

## Deferred Issues

Keine.

## Known Stubs

Keine.

## Threat Flags

Keine neuen Oberflächen; T-06-16 (JSON-LD nur über `JsonLd`, Daten aus Gruppenmodell und `site.url`), T-06-17 („Vorhersagen“/Craft AI per Unit-Test ausgeschlossen, announcements.test.ts grün), T-06-18 (alle Ziele 200, route-audit 0 badLinks), T-06-19 (Kurzform-Belege in Unit und E2E) sind abgedeckt.

## Next Phase Readiness

- Plan 06-06 kann Rollout und den Abschluss von DESIGN-01, DESIGN-03 und FEAT-01 vornehmen; DESIGN-02 und SEO-02 bleiben „In Progress“.
- Screenshots (nicht eingecheckt): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/funktionen-<chromium|webkit>-<360|390|768|1024|1440>.png` und `.../scratchpad/home-fix-<chromium|webkit>-<360|390|768|1024|1440>.png`.

## Self-Check: PASSED
