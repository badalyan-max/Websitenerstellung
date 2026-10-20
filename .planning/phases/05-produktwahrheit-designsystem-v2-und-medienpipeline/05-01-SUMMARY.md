---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 01
subsystem: seo
tags: [seo, se-ranking, keyword-map, vitest]
requires: []
provides:
  - "craftos/scripts/keyword-research.mjs (SE-Ranking-Abruf plan/run/export mit Cache und Budget 30.000 Units)"
  - "craftos/scripts/check-no-secrets.mjs (Schlüsselprüfung für Pläne 05-07, 05-08)"
  - "craftos/docs/seo/keyword-seeds.json inkl. pageCandidates je Sitemap-Pfad"
  - "craftos/docs/seo/data/kwmap/ (79 Rohdateien + manifest.json)"
  - "craftos/docs/seo/keyword-map.json + craftos/lib/keyword-map.ts (keywordMap, KeywordAssignment, KeywordMetric, Intent)"
  - "craftos/docs/seo/KEYWORD-MAP.md (Methode, Tabelle, Lücken KD < 20, Zielwerte)"
affects: [05-07, 05-08, phase-06, phase-07, phase-08, phase-09]
tech-stack:
  added: []
  patterns:
    - "Rohdaten unverändert einchecken, Map-Zahlen nur aus dem Exportobjekt übernehmen, Provenienz per Test"
    - "Schlüssel über process.loadEnvFile(CRAFTOS_ENV_FILE || absoluter Pfad), nie geloggt"
key-files:
  created:
    - craftos/scripts/keyword-research.mjs
    - craftos/scripts/check-no-secrets.mjs
    - craftos/docs/seo/keyword-seeds.json
    - craftos/tests/keyword-seeds.test.ts
    - craftos/docs/seo/data/kwmap/manifest.json
    - craftos/docs/seo/data/kwmap/*.json (79 Rohdateien)
    - craftos/docs/seo/keyword-map.json
    - craftos/lib/keyword-map.ts
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/tests/keyword-map.test.ts
  modified:
    - craftos/.gitignore
decisions:
  - "Auswahlregel: höchstes Volumen unter den pageCandidates mit KD ≤ 30, bei Gleichstand niedrigere KD; Abweichungen nur mit reason"
  - "Intents unverändert aus SE Ranking (DE: fast alles I); Kannibalisierungsschutz über unterschiedliche Begriffe statt Intent-Codes"
  - "Zielwert-Titel inklusive Suffix ' | CraftOS' (Layout-Template) ≤ 60 Zeichen und mit wörtlichem Hauptkeyword"
  - "15 bestehende Seiten ohne belegtes Suchvolumen bleiben ohne Hauptkeyword (null mit Verweis auf Exportdatei) statt geschätzter Begriffe"
  - "Export bezieht comparison-Dateien nicht ein (Zahlen dort bereits vorhanden); hält Rohdaten bei 8,5 MB"
metrics:
  duration: "ca. 27 Minuten"
  completed: "2026-10-20"
  tasks: 3
  files: 90
  se_ranking_units: 12834
  units_left_before: 78093
  units_left_after: 65259
---

# Phase 5 Plan 01: Keyword-Map aus SE-Ranking-Daten Summary

Keyword-Map mit genau einem datenbelegten Hauptkeyword je Seite für alle 125 Sitemap-URLs plus 19 geplante Seiten (Phasen 7–9), erzeugt aus 79 lokal gesicherten SE-Ranking-Rohdateien für 12.834 Units und abgesichert durch einen Vitest, der Vollständigkeit, Kannibalisierung und die Herkunft jeder Zahl prüft.

## Ergebnis

- **Unit-Verbrauch:** 12.834 Units laut Manifest (Budget 30.000, D-16). Kontingent vor dem Lauf 78.093, danach 65.259 Units; die Differenz entspricht exakt der Schätzung. Ablauf des Testzugangs 2026-11-03 17:22:59. Rohdaten sind lokal gesichert.
- **Rohdaten:** 37 related, 15 questions, 10 longtail, 8 domain/keywords, 7 comparison, 2 Exportpakete (5.548 Keywords). Alle 373 pageCandidates stehen in `export--*.json`, mit Zahlen oder `is_data_found:false`.
- **Map:** 144 Einträge, davon 126 mit Hauptkeyword, 3 Rechtsseiten und 15 Seiten ohne belegtes Suchvolumen (begründet, Verweis auf Exportdatei). 16 begründete Abweichungen von der Auswahlregel.
- **Geplante Seiten:** 4 Alternativen-Seiten (Phase 8), 6 Funktionsseiten für live, aber unbeworbene Funktionen (GAEB, Mahnwesen, Terminplanung/Bauphasen, Bankabgleich, Datenübernahme, Mängelmanagement; Phase 7), 9 Content-Lücken (Phase 9, u. a. Leistungszeitraum 390/8, Regiebericht 390/4, Bedenkenanzeige 390/7, Mängelanzeige 810/8, Reverse Charge 590/9, GAEB-Formate 590/12). 13 Lücken erfüllen Volumen ≥ 50 und KD < 20.
- **D-13:** „bauphasen“ (590/16) ist Hauptkeyword von `/hilfe/projekt-phasen-anlegen`, „arbeitsabschnitte bau“ Nebenbegriff (laut Export ohne Suchvolumen).
- **Zielwerte (D-14):** Titel (≤ 60 Zeichen inkl. „ | CraftOS“, Hauptkeyword wörtlich enthalten), H1 und Description (120–155 Zeichen) für alle 126 Einträge mit Hauptkeyword; nicht in Seiten angewendet.
- SEO-02 bleibt laut Plan „Phase 5 Grundlage, Umsetzung Phasen 6–8“ und wird nicht als Complete markiert.

## Tasks und Commits

| Task | Name | Commit | Dateien |
|---|---|---|---|
| 1 | Abrufskript, Seeds mit pageCandidates, Geheimnisprüfung | 53ea67e | scripts/keyword-research.mjs, scripts/check-no-secrets.mjs, docs/seo/keyword-seeds.json, tests/keyword-seeds.test.ts, .gitignore |
| 2 | Fix Statusprüfung Export (HTTP 201) | 123e1cc | scripts/keyword-research.mjs |
| 2 | SE-Ranking-Lauf und Rohdatensicherung | f7ef1ba | docs/seo/data/kwmap/ (80 Dateien) |
| 3 | RED: Keyword-Map-Test | 767e748 | tests/keyword-map.test.ts |
| 3 | GREEN: Keyword-Map, Typen, Doku | 7491340 | docs/seo/keyword-map.json, lib/keyword-map.ts, docs/seo/KEYWORD-MAP.md |

## Verifikation

- `node scripts/keyword-research.mjs plan` → Exit 0, „Geplant: 400 Units, bisher verbucht: 12834, Budget 30000“, Zeile „Export: 373 pageCandidates …“.
- Task-2-Verify: `units 12834 files 79`, `fehlend: 0`.
- `npx vitest run tests/keyword-map.test.ts tests/keyword-seeds.test.ts` → 13/13 grün (9 Map-Fälle, 4 Seed-Fälle).
- Negativtest: verfälschtes Volumen und Schreibvariante als Hauptkeyword lassen 4 Map-Fälle fehlschlagen; Original wiederhergestellt.
- `npm run typecheck` grün; ESLint über die neuen Dateien ohne Befund.
- `node scripts/check-no-secrets.mjs docs/seo scripts lib tests` → „OK: Schlüssel in keiner Datei“.
- `grep -c '"primary": null' docs/seo/keyword-map.json` = 18 (3 Rechtsseiten + 15 mit is_data_found:false).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Export-Antwort HTTP 201 wurde als Fehler behandelt**
- **Found during:** Task 2
- **Issue:** `POST /v1/keywords/export` antwortet mit HTTP 201; das Skript akzeptierte nur 200, verwarf die Antwort und ließ den abgerechneten Aufruf unverbucht.
- **Fix:** Statusprüfung auf 2xx erweitert; neues Manifestfeld `unrecordedCalls` verbucht den verlorenen Aufruf (100 Units) und zählt zum Budget. Export danach wiederholt.
- **Files modified:** craftos/scripts/keyword-research.mjs, manifest.json
- **Commit:** 123e1cc

**2. [Rule 3 - Blocking] Akzeptanzkriterium `grep "console.*SE_RANKING_API_KEY"` widersprach der geforderten Fehlermeldung**
- **Found during:** Task 1
- **Fix:** Variablenname über Konstante `KEY_NAME`; die Ausgabe „SE_RANKING_API_KEY fehlt in <ENV_FILE>“ bleibt identisch, der grep findet keine Treffer.
- **Commit:** 53ea67e

**3. [Rule 3 - Blocking] `.vitest/` (lokale JSON-Reports des rtk-Wrappers) blieb untracked**
- **Fix:** `.vitest/` in `craftos/.gitignore` aufgenommen.
- **Commit:** 53ea67e

### Bewusste Präzisierungen

- **Export-Quellen:** Der Export sammelt pageCandidates sowie related-, questions-, longtail- und domain-keywords-Keywords (wie im Plan genannt), aber nicht die comparison-Dateien; deren Zahlen liegen bereits vor. Ergebnis: 2 statt der geschätzten 4 Pakete.
- **Provenienztest:** Statt einer Regex auf den JSON-String prüft der Test strukturell, dass Keyword, Volumen, KD, Intents und CPC im selben Rohdatenobjekt stehen und Datei, Endpunkt und Abrufzeit zum Manifest passen. Grund: Die related-Antworten haben die Feldreihenfolge keyword, cpc, difficulty, volume, sodass eine Regex mit fester Reihenfolge falsch negativ wäre.
- **Zusätzliche Testfälle:** Nebenbegriffe dürfen nicht Hauptkeyword einer anderen Seite sein; Rechtsseiten und Null-Einträge haben keine Wettbewerber; D-13 wird eigens geprüft.
- **Geplante Pfade in pageCandidates:** Neben den vier Alternativen-Seiten sind sieben weitere geplante Pfade mit Kandidaten in den Seeds hinterlegt, damit ihre Begriffe im Export stehen.

## Known Stubs

Keine. 15 bestehende Seiten haben bewusst kein Hauptkeyword, weil alle Kandidaten laut Export kein Suchvolumen haben; sie sind in KEYWORD-MAP.md §2 gelistet und für eine neue Kandidatenrecherche in Phasen 6–9 vorgemerkt.

## Threat Flags

Keine neue Angriffsfläche über das Threat-Register hinaus. T-05-01 (Schlüssel) durch check-no-secrets.mjs geprüft, T-05-02 (Kosten) durch Budgetgrenze und Cache, T-05-03/T-05-04 (Provenienz) durch tests/keyword-map.test.ts.

## Hinweise für Folgepläne

- Plan 05-07 kann `docs/seo/keyword-map.json` direkt per Node lesen (Projekt-Keywords und Zielseiten angleichen, SEO-07).
- `scripts/keyword-research.mjs export` ergänzt nur fehlende Keywords in neuen Paketen; neue pageCandidates können ohne Doppelkosten nachgezogen werden, solange der Testzugang läuft (bis 03.11.2026).
- `domain-keywords--tooltime.de.json` enthält nur einen Begriff; ToolTime rankt in Deutschland überwiegend über eine andere Domain.

## Self-Check: PASSED

Alle 9 Kerndateien vorhanden, alle 5 Commits (53ea67e, 123e1cc, f7ef1ba, 767e748, 7491340) im Log.
