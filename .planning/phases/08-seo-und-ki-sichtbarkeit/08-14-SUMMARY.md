---
phase: 08-seo-und-ki-sichtbarkeit
plan: 14
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-pruefung, vercel, se-ranking]
requires:
  - phase: 08-seo-und-ki-sichtbarkeit
    provides: "08-01 bis 08-13, 08-REVIEW.md, 08-REVIEW-FIX.md, Produktabgleich 62f4478"
provides:
  - "Phase 8 live auf craftos.eu (dpl_2avyo678E2VrDE9GTFMc3WL9yTS6, Commit f029bc6)"
  - "scripts/live-check.mjs mit Phase-8-Prüfungen (62 Prüfungen)"
  - "docs/releases/PHASE-08-ROLLOUT.md, Messbericht rollout-phase08, Projektabgleich 2026-10-23"
affects: [phase-09, phase-10]
tech-stack:
  added: []
  patterns:
    - "live-check prüft sitewide aus /sitemap.xml gegen keyword-map.json und ai-prompts-targets.json, ohne feste Seitenzahl"
key-files:
  created:
    - craftos/docs/releases/PHASE-08-ROLLOUT.md
    - craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase08.md
    - craftos/docs/seo/reports/2026-10-23-projektabgleich.json
    - craftos/docs/seo/reports/2026-10-23-raw-rollout-phase08-*.json (6 Dateien)
  modified:
    - craftos/app/sitemap.ts
    - craftos/content/blog/handwerkersoftware-auswaehlen.md
    - craftos/content/blog/handwerkersoftware-einzelunternehmen.md
    - craftos/scripts/live-check.mjs
    - craftos/lib/product-register.ts
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
key-decisions:
  - "08-14: Rollout-Datum 2026-10-23 (Europe/Berlin) als lastmod der zehn Phase-8-Seiten und updatedAt der zwei Ratgeber mit Vergleichslink"
  - "08-14: Prompt-Anker-Prüfung im live-check über alle Ziele bis Phase 8 (inkl. Phase-6/7-Ziele) mit promptVerstoesse aus der Kernbibliothek"
  - "08-14: Silbentrennung in der /preise-H2 (Prompt-Ziel) nicht kurz vor dem Push geändert, sondern als offener UI-Punkt dokumentiert"
requirements-completed: [SEO-02, SEO-03, SEO-04, SEO-05, SEO-06]
duration: 28min
completed: 2026-10-23
---

# Phase 8 Plan 14: Rollout Phase 8 Summary

**Phase 8 ist nach lokalem Phasen-Gate und ship-gate über den Gesamtdiff live auf craftos.eu (Vercel READY, live-check 62/62 OK), per IndexNow mit 136 URLs gemeldet, mit SE Ranking abgeglichen und gemessen (0 Units); SEO-02 bis SEO-06 sind erledigt, SEO-09 und DESIGN-02 bleiben bis Phase 9 offen.**

## Performance

- **Duration:** ca. 28 min (22.10.2026 22:49 UTC bis 23:17 UTC, zuzüglich Doku-Push)
- **Tasks:** 2/2
- **Files modified:** 5 Code-/Inhaltsdateien, 1 Rollout-Nachweis, 8 Berichtsdateien, 2 Planungsdateien

## Accomplishments

- Phasen-Gate lokal grün: Vitest 863/863, Lint, Typcheck, sync:product:check (v4.0.0-test.245), check-no-secrets, Build, seo-audit 136/136 URLs mit 0 Verstößen, E2E 333 bestanden/0 fehlgeschlagen/91 übersprungen (11,2 min), route-audit Exit 0, live-check lokal 62/62, visual-audit 100 Aufnahmen ohne Befund.
- Code-Push `f22ee78..f029bc6` (156 Commits, 246 Dateien), Vercel `dpl_2avyo678E2VrDE9GTFMc3WL9yTS6` READY nach 50 s, Aliase craftos.eu und www.craftos.eu.
- Live: live-check gegen https://craftos.eu 62/62 OK; Sitemap 136 URLs, 13 mit lastmod 2026-10-23; IndexNow „136 URLs gemeldet, HTTP 200“.
- SE Ranking: `--check` „Soll 126 (bestehend 117, geplant 9), Projekt 151, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0“; Messbericht rollout-phase08 (8 Aufrufe, 0 Units); Units vorher 33.921, nachher 33.921 (Limit 100.000, Test bis 03.11.2026).
- Traceability: SEO-02 bis SEO-06 Complete; SEO-09 und DESIGN-02 „In Progress“ mit Abschluss in Phase 9; ROADMAP Phase 9 um Abschlusskriterien ergänzt.

## Task Commits

1. **Task 1: Phasen-Gate, lastmod, live-check** – `33a5e00` (feat)
2. **Ship-gate-Befund (Delta seit Review):** Kommentar im Produktregister – `f029bc6` (fix)
3. **Task 2: Rollout-Nachweis, Berichte, Traceability** – Doku-Commit dieses Plans (docs)

## Protokoll `gh workflow list --all`

Vor dem Code-Push (23.10.2026, 01:10:37 MESZ):

```text
Dependabot Updates	active	227711329
```

Vor dem Doku-Push (23.10.2026, 01:18:38 MESZ; Vorprüfung 01:17:06 mit gleichem Ergebnis):

```text
Dependabot Updates	active	227711329
```

Kein `.github`-Verzeichnis im Repo, keine Datei unter `.github/` im Diff; der dynamische Dependabot-Workflow hat keinen Push-Trigger. Kein CI-Lauf ausgelöst oder als Beleg genutzt.

## Anforderungsstatus

| Anforderung | Status |
|---|---|
| SEO-02 | erledigt (Title/H1/Description aller 136 Sitemap-URLs nach Keyword-Map, live geprüft) |
| SEO-03 | erledigt (vier Alternativen live, belegt, FAQPage/BreadcrumbList, verlinkt von /vergleich und Footer) |
| SEO-04 | erledigt (/preise beginnt mit #antwort und Lizenztabelle) |
| SEO-05 | erledigt (Titel ≤ 60, Description 120–155, eine H1, keine Duplikate, Brotkrumen mit Schema, eigene OG-Grafik) |
| SEO-06 | erledigt (Antwort ≤ 300 auf zentralen Seiten, llms.txt, Sitemap, IndexNow) |
| SEO-09 | In Progress – Phase 8 kommerzielle KI-Prompts erledigt; Abschluss Phase 9 (KD-<20-Lücken, D-11) |
| DESIGN-02 | In Progress – Phase 8 Umbau- und Vergleichsseiten; Abschluss Phase 9 (Gewerke, Wissen) |

`requirements mark-complete` wurde ausschließlich mit SEO-02 SEO-03 SEO-04 SEO-05 SEO-06 aufgerufen. Das Werkzeug hakte die fünf Checkboxen ab, setzte aber die Traceability-Zeile von SEO-02 nicht auf Complete (abweichender Zeilentext); von Hand korrigiert. SEO-08, SEO-09 und DESIGN-02 blieben unberührt; SEO-09 und DESIGN-02 bekamen von Hand den Planwortlaut.

## Auslegungen

(a) „Welle 1“ auf 08-01 und 08-02 verteilt; (b) „Extra-Speicher“ statt „Zusatzspeicher“; (c) Anker-Konvention DESIGN-V2 § 17; (d) H1 nach D-17 mechanisch-minimal, Liste in KEYWORD-MAP.md § 6; (e) „Alle Preise netto zzgl. Umsatzsteuer“ statt „zzgl. USt.“; (f) Rechtsseiten mit Standard-OG „Rechtliches“, Rechtstexte unverändert (D-20); (g) 20 Tracker-Einträge / 18 Texte (D-18), KD-<20-Lücken als Phase 9 (D-11); (h) **D-19:** Gewerke-Links auf die Detailseiten folgen in Phase 9 und korrigieren PHASE-07-ROLLOUT § 15h; (i) Inhabervorgabe 22.10.2026 „nur Unterstütztes“ geht UI-SPEC U6/§ 5.2 vor. Ausführlich in PHASE-08-ROLLOUT.md § 15.

## HERO-Variante

Variante A, Beleg `craftos/docs/seo/belege/2026-10-22-hero-preise-monatlich.png` und `…-jaehrlich.png`.

## Decisions Made

Siehe key-decisions. Koordination: Für die Website gibt es kein Rezept (Lücke, wie Phase 7); alle schweren Läufe lokal unter `.heavy-lock`, nacheinander.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Verfälschter IN-04-Kommentar im Produktregister**
- **Found during:** Task 2 (ship-gate, Sichtung des Deltas seit 08-REVIEW-FIX)
- **Issue:** Der Produktabgleich `62f4478` hatte im Kommentar die frühere `git describe`-Ausgabe durch den neuen Tag ersetzt.
- **Fix:** Kommentar wiederhergestellt; Lint, Typcheck, `product-register.test.ts` 9/9 grün.
- **Files modified:** craftos/lib/product-register.ts
- **Commit:** f029bc6

### Weitere Abweichungen

- **ship-gate ohne Skill-Tool:** Das Skill-Werkzeug stand nicht zur Verfügung; das Gate lief direkt nach `C:/Users/badal/.claude/skills/ship-gate/SKILL.md` (wie 07-09). Build, Lint, Typcheck und Tests aus Task 1 übernommen, weil danach nur ein Kommentar geändert wurde (gezielt geprüft).
- **gsd-tools:** Der Befehl `gsd-tools` ist nicht im PATH; verwendet wurde `node C:/Users/badal/.claude/gsd-core/bin/gsd-tools.cjs`.
- **Vercel/Analytics:** Vercel-MCP nicht verfügbar; Status per `vercel ls`/`vercel inspect`; Analytics-Zählung als Inhaberaktion (PHASE-08-ROLLOUT § 8).
- **visual-audit** schreibt fest nach `test-results/visual/`; die 100 Aufnahmen wurden in den Scratchpad-Ordner `08-14` kopiert.

**Total deviations:** 1 Auto-Fix (Kommentar), 4 Umgebungsabweichungen. **Impact:** keine Umfangsänderung.

## Issues Encountered

- Sichtbefund: H2 „Was kostet eine Handwer-kersoftware pro Monat?“ auf /preise bei 1440 px getrennt (offener UI-Punkt, PHASE-08-ROLLOUT § 13).
- Keine E2E-Fehlschläge im Phasen-Gate.

## Known Stubs

Keine.

## Offene Inhaberaktionen

Screenshots sichten (`C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\08-14\`), HERO-Beleg vergleichen, Analytics nach 24 h, Wortlaut der Review-Fixes abnehmen, Wettbewerberangaben bis 21.12.2026 neu prüfen, Datenschutzabschnitt Webanalyse und Impressum „§ 5 DDG“, Koordinationsrezept für die Website.

## Next Phase Readiness

Phase 9 kann starten (Startgate nach 08-14 laut ROADMAP). Phase 9 schließt SEO-09 und DESIGN-02 ab und übernimmt die offenen Inhaltspunkte (verneinte KI-Formulierungen in Wissensinhalten, „teilweise“ in /app und llms.txt, Gewerke-Links D-19).

---
*Phase: 08-seo-und-ki-sichtbarkeit*
*Completed: 2026-10-23*

## Self-Check: PASSED

- FOUND: craftos/docs/releases/PHASE-08-ROLLOUT.md, craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase08.md, craftos/docs/seo/reports/2026-10-23-projektabgleich.json, craftos/scripts/live-check.mjs
- FOUND: Commits 33a5e00, f029bc6 (auf origin/main)
- Plan-Verify (Begriffe im Nachweis, Messbericht vorhanden): ok; check-no-secrets docs und ../.planning: OK
