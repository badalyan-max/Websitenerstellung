---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 01
subsystem: datenmodell
tags: [datenmodell, produktregister, funktionsgruppen, budgets, tdd, vitest]

# Dependency graph
requires:
  - phase: 05-designsystem
    provides: components/v2/budgets.ts (TEXT_BUDGET, charCount, assertTextBudget, assertCount)
  - phase: 04-produktwahrheit
    provides: lib/product-register.ts (liveExtras mit advertised, mobileLocales), lib/funktionen.ts
provides:
  - "lib/funktionsgruppen.ts: server-only Gruppenmodell (getFunktionsgruppen, buildFunktionsgruppen, GRUPPEN_REIHENFOLGE, REGISTER_IDS, menuFooterLinks, Typen)"
  - "lib/funktionen.ts: Pflichtfeld benefit (genau ein Satz, ≤ 100 Zeichen) je Detailfunktion"
  - "components/v2/budgets.ts: Phase-6-Budgets (hero, pageHead, menuGroup, featureList, count.featureList, count.homeSections), sentenceCount, assertOneSentence"
  - "tests/funktionsgruppen.test.ts: Paritätstest Register ↔ Gruppen ↔ Ziele ↔ Sitemap"
affects: [06-03 Mega-Menü/Header, 06-04 Startseite, 06-05 /funktionen, Phase 7 Detailseiten]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reiner Builder mit Fremddaten-Eingabe (buildFunktionsgruppen) plus dünner Live-Wrapper (getFunktionsgruppen)"
    - "Entwicklerfehler mit UI-SPEC-Fehlertext beim Modulaufbau statt leerer Flächen"
    - "Hilfeartikel-Labels wörtlich im Modul, im Test gegen das Frontmatter geprüft"

key-files:
  created:
    - craftos/lib/funktionsgruppen.ts
    - craftos/tests/funktionsgruppen.test.ts
  modified:
    - craftos/components/v2/budgets.ts
    - craftos/lib/funktionen.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/pricing-parity.test.ts

key-decisions:
  - "Gruppenmodell: Grenzfälle Dashboard → Buchhaltung, Kundenportal → Angebot, Projekt-Chat → Team, Datenübernahme → Team; Craft AI nur als Fußleistenlink (D-15), im Modul begründet"
  - "Leere Gruppe wird vor fehlendem Slug geprüft: fehlen alle Detail- und Zusatzfunktionen einer Gruppe, wirft der Builder den Leere-Gruppe-Text, sonst den Fehlt-Text; so sind beide UI-SPEC-Fehler mit dem festen Interface erreichbar"
  - "Zusätzliche Paritätsprüfung: eine Detailfunktion aus lib/funktionen.ts ohne Gruppenzuordnung bricht den Aufbau ab (neue Detailseiten können nicht unsichtbar bleiben)"
  - "Hilfe-Labels wörtlich übernommen, weil lib/content.ts nur asynchrone Leser hat; der Test vergleicht sie mit dem Frontmatter-Titel"

patterns-established:
  - "Funktionsdaten für Menü, Startseite und /funktionen nur aus lib/funktionsgruppen.ts lesen"
  - "Nutzensätze: genau ein Satz, geprüft mit sentenceCount (/[.!?](?=\\s|$)/g)"

requirements-completed: []

# Metrics
duration: 7min
completed: 2026-10-21
---

# Phase 6 Plan 01: Gruppenmodell, Nutzensätze und Phase-6-Budgets Summary

**Server-only Gruppenmodell `lib/funktionsgruppen.ts` ordnet alle 30 Live-Funktionen (16 Detailseiten aus `lib/funktionen.ts`, 14 beworbene `liveExtras` des Produktregisters) sechs Arbeitsablauf-Gruppen mit Nutzensatz, Icon, Plattformen und sitemap-geprüften Linkzielen zu; dazu Phase-6-Textbudgets und Satzprüfung.**

## Performance

- **Duration:** ca. 7 min
- **Started:** 2026-10-21T12:12:02Z
- **Completed:** 2026-10-21T12:18:37Z
- **Tasks:** 2
- **Files modified:** 6 (2 neu, 4 geändert)

## Accomplishments

- `TEXT_BUDGET` um `hero`, `pageHead`, `menuGroup`, `featureList`, `count.featureList` und `count.homeSections` ergänzt; Bestandswerte unverändert. Neue Helfer `sentenceCount` und `assertOneSentence` mit dem wörtlichen UI-SPEC-Fehlertext.
- Alle 16 Detailfunktionen tragen das Pflichtfeld `benefit` (wörtlich UI-SPEC „FeatureCard-Raster“); `kurz`, `intro` und `seoDescription` unverändert.
- `lib/funktionsgruppen.ts` setzt den Zielvertrag exakt um: Typen `GruppenId`, `DetailEintrag`, `ZusatzZiel`, `ZusatzEintrag`, `Funktionsgruppe`; `GRUPPEN_REIHENFOLGE`, `REGISTER_IDS` (inkl. Sprachen-Schlüssel per `mobileLocales.length`), `buildFunktionsgruppen`, `getFunktionsgruppen`, `menuFooterLinks`. Der Builder liest Detailwerte nur aus `input.funktionen`, filtert `advertised === true` und prüft beim Aufbau alle Budgets und Satzregeln.
- Paritätstest (20 Fälle): Gruppenreihenfolge und Köpfe, 16 Detail- und 14 Zusatzeinträge, Plattformen deep-equal zum Register, „Vorhersagen“ fehlt, Craft AI/KI-Agent in keiner Gruppe, 7 Ziele (6 Hilfeartikel mit Frontmatter-Titel, 1 Funktionsseite), alle Ziele und Fußleistenlinks sind Sitemap-Routen, beide UI-SPEC-Fehlertexte.
- `tests/pricing-parity.test.ts` scannt zusätzlich `lib/funktionsgruppen.ts` auf Preisliterale.

## Task Commits

1. **Task 1: Phase-6-Budgets, Satzprüfung und Nutzensätze**
   - RED `babafe8` (test), GREEN `ce7151f` (feat)
2. **Task 2: Gruppenmodell mit Paritätstest**
   - RED `72d9e8f` (test), GREEN `26d3b1b` (feat)

## Verification

- `npx vitest run tests/funktionsgruppen.test.ts tests/design-v2-budgets.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts tests/content.test.ts tests/product-register.test.ts` → 6 Dateien, 56 Tests grün.
- `npm run typecheck` → Exit 0; `npm run lint` → Exit 0.
- Akzeptanz-Greps: erste Zeile `import "server-only";`; `advertised` außerhalb von Kommentaren 2×; Ankündigungsformulierungen 0; `getFunktion(` 0; `input.funktionen` 5; `lib/funktionsgruppen.ts` in pricing-parity 1; `homeSections` 1; `export function assertOneSentence` 1; `benefit:` in lib/funktionen.ts 19; `kurz: d.intro` 1; Testdatei 397 Zeilen.
- RED-Phasen belegt: Task 1 mit 4 fehlschlagenden Fällen, Task 2 mit fehlendem Modul.
- `.planning/config.json` blieb ungestaged.

## Files Created/Modified

- `craftos/lib/funktionsgruppen.ts` – Gruppenmodell (einzige Quelle für Menü, Startseite, /funktionen)
- `craftos/tests/funktionsgruppen.test.ts` – Paritätstest
- `craftos/components/v2/budgets.ts` – Phase-6-Budgets, `sentenceCount`, `assertOneSentence`
- `craftos/lib/funktionen.ts` – Feld `benefit` in Typen, Definitionen und Abbildung
- `craftos/tests/design-v2-budgets.test.ts` – describe-Block „Phase-6-Budgets und Satzprüfung“
- `craftos/tests/pricing-parity.test.ts` – Literal-Scan um `lib/funktionsgruppen.ts` erweitert

## Decisions Made

- Siehe `key-decisions` im Frontmatter. Die 16 Nutzensätze wurden vor dem Eintragen gegen `intro`, `points`, `steps` und `access` der jeweiligen Definition gegengelesen; alle Aussagen sind belegt (z. B. „Belege fotografieren“ aus den Schritten von Eingangsrechnungen, „PDF mit Briefpapier“ aus den Punkten der Angebote). Keine Abweichung von den UI-SPEC-Sätzen nötig.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Kritische Prüfung] Detailfunktion ohne Gruppe bricht den Aufbau ab**
- **Found during:** Task 2
- **Issue:** Der Plan prüfte nur fehlende zugeordnete Slugs, nicht den umgekehrten Fall (neuer Slug in `lib/funktionen.ts` ohne Gruppenzuordnung wäre im Menü unsichtbar, Verstoß gegen DESIGN-03).
- **Fix:** Builder wirft „Funktionsgruppen: Funktion {slug} aus lib/funktionen.ts ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.“; eigener Testfall.
- **Files modified:** craftos/lib/funktionsgruppen.ts, craftos/tests/funktionsgruppen.test.ts
- **Commit:** 26d3b1b

**2. [Rule 2 - Kritische Prüfung] Kurzbeschreibung ohne Satzende und Lead genau ein Satz im Builder**
- **Found during:** Task 2
- **Issue:** UI-SPEC verlangt „kein Satzende-Punkt“ bzw. „genau 1 Satz“; der Plan nannte im Builder nur die Zeichenbudgets.
- **Fix:** `pruefeKopf` prüft zusätzlich `sentenceCount(description) === 0` und `assertOneSentence` für den Lead.
- **Commit:** 26d3b1b

Sonst wie geplant ausgeführt.

## Issues Encountered

- Das RTK-Werkzeug verfälschte einzelne `grep -v`-Ketten; die Zählung „advertised außerhalb von Kommentaren“ wurde deshalb per Node nachgeprüft (2 Treffer).

## Known Stubs

Keine. Die sieben Zusatzfunktionen ohne `target` sind bewusst ohne Link (UI-SPEC: kein toter Link, kein Platzhalter); Phase 7 kann Ziele ergänzen.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Pläne 06-03 bis 06-05 können `getFunktionsgruppen()` und `menuFooterLinks` direkt verwenden; Import nur in Server-Komponenten (server-only).
- Plan 06-02 kann die neuen Budgets (`hero`, `pageHead`, `featureList`) und `assertOneSentence` nutzen.

## TDD Gate Compliance

RED-Commits `babafe8`, `72d9e8f` (test) liegen jeweils vor den GREEN-Commits `ce7151f`, `26d3b1b` (feat). Kein Refactor-Commit nötig.

## Self-Check: PASSED
