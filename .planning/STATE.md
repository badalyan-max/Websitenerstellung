---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: – Überblick
status: executing
last_updated: "2026-10-20T21:05:14.679Z"
last_activity: 2026-10-20 -- Phase 5 execution started
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 8
  completed_plans: 1
  percent: 0
---

# State

## Project Reference

See: .planning/PROJECT.md (updated 2026-10-20)

**Core value:** Besucher verstehen den Produktablauf anhand lesbarer Beispiele und direkter App-Aufnahmen und können die richtige Funktion und Anleitung schnell finden.
**Current focus:** Phase 5 — Produktwahrheit, Keyword-Map und Designbausteine

## Vorheriger Milestone v1.0 (abgeschlossen)

Lokale Umsetzung, Abnahme und Übernahme in C:/Projekte/Websitenerstellung abgeschlossen; Veröffentlichung am 9. September 2026 über den Produktionsbranch main und das Vercel-Projekt craftos. Produktbasis damals: Website 142ab82; Web d442df68; Mobile 9e6260d (Quellen in craftos/docs/PRODUCT-REGISTER.md und product-source-snapshot.json). Umfang: 24 Ratgeber, 40 Hilfeartikel, zwei Rechner, sechs Beispieldemos, 16 Funktionsseiten, zwölf Gewerke, GoBD und belegter Vergleich. Abnahme: 81 Unit-Tests, 98 Browserfälle, Build/Lint/Typprüfung grün; Gesamtbericht craftos/docs/RELAUNCH-ABNAHME.md, Release-Abgleich craftos/docs/RELEASE-2026-09-09.md.

## Current Position

Phase: 5 (Produktwahrheit, Keyword-Map und Designbausteine) — EXECUTING
Plan: 2 of 8
Status: Ready to execute
Last activity: 2026-10-20 -- Phase 5 execution started

Progress: [░░░░░░░░░░] 0%

## Accumulated Context

### Decisions

- Milestone v2.0: Schrittweiser Rollout, jede Phase endet live nach Ship-Gate, IndexNow und Analytics-Kontrolle (Inhaberentscheidung 20.10.2026).
- Milestone v2.0: Produktfakten nur aus `origin/release` (Web v4.0.0-test.238, Mobile mobile-v1.0.0-test.93).
- 20.10.2026 Umfangsänderung (Inhaber): keine detailgetreuen Screenshots, kein Demo-Betrieb, keine Videos (MEDIA-02 Out of Scope); Seite strukturierter und schöner mit vereinfachten Darstellungen; SEO-02 (Keyword-Map) nach Phase 5 vorgezogen, Quelle SE Ranking Data API.
- Roadmap v2.0: Übergreifende QA (DESIGN-05, QA-04, QA-05, QA-06) wird in Phase 10 abschließend nachgewiesen; jede Phase hält die Seite grün.
- [Phase 05]: 05-01: Keyword-Auswahlregel – höchstes Volumen unter pageCandidates mit KD ≤ 30, Abweichungen nur mit reason; Zahlen nur aus Exportobjekt (SE Ranking DE)
- [Phase 05]: 05-01: 15 Seiten ohne belegtes Suchvolumen bleiben ohne Hauptkeyword statt geschätzter Begriffe; Kannibalisierungsschutz über Begriffe statt Intent-Codes (DE fast nur I)

### Pending Todos

None yet.

### Blockers/Concerns

- SE-Ranking-Test endet am 03.11.2026 – Keyword-Map und Rohdatenabzug vorher abschließen. MCP `se-ranking` braucht OAuth-Anmeldung des Inhabers (`/mcp`).
- Offen beim Inhaber: Datenschutzabschnitt Webanalyse, Portale/Bewertungen, Search-Console-Exporte.

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| Phase 05 P01 | 27min | 3 tasks | 90 files |
