---
phase: 10-abschlussaudit
plan: 07
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-check, vercel, se-ranking, bestaetigungsaudit, abschlussbericht, anforderungsstatus, speed-insights]

requires:
  - phase: 10-12
    provides: "Phasen-Gate grün (PHASE-10-PRUEFUNGEN.md § 5), Review-Fix vollständig"
provides:
  - "Phase 10 live: Push e392762, Deployment dpl_TBDg23xnPvC9HmED3ArQA16Vida7 READY, live-check 77/77, IndexNow 156/HTTP 200"
  - "PHASE-10-ROLLOUT.md (§§ 1–15), Etappenzeile 10, Endfassung MEILENSTEIN-V2-ABSCHLUSS.md"
  - "Bestätigungsaudit (audit-report.md, audit-report-bestaetigung.html), Recheck 485185, Messbericht rollout-phase10"
  - "QA-04 an Vercel-Speed-Insights-Felddaten (D-44) bewertet"
affects: [meilenstein-v2-abschluss, orchestrator-nachtrag-analytics, qa-06-lueckenschluss]

tech-stack:
  added: []
  patterns:
    - "Vercel-Felddaten und Analytics über `vercel metrics` (CLI 65.2.0) statt MCP"
    - "Bestätigungsaudit mit Vorher (Vorab-Bewertung) und Nachher (Live-Bewertung) aus denselben Skripten"

key-files:
  created:
    - craftos/docs/releases/PHASE-10-ROLLOUT.md
    - craftos/audit-report-bestaetigung.html
    - craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase10.md
    - craftos/docs/seo/data/2026-10-23-audit-recheck-phase10.json
    - craftos/docs/seo/data/2026-10-23-audit-recheck-issues-phase10.json
    - craftos/docs/seo/data/2026-10-23-units-rollout-phase10.json
    - craftos/docs/seo/data/2026-10-23-lighthouse-live-phase10.json
    - craftos/docs/seo/data/2026-10-23-vercel-speed-insights-rollout-phase10.json
    - craftos/docs/seo/data/2026-10-23-vercel-events-rollout-phase10.json
  modified:
    - craftos/tests/keyword-map.test.ts
    - craftos/audit-report.md
    - craftos/docs/seo/backlink-register.json
    - craftos/docs/releases/ETAPPEN-NACHWEIS-V2.md
    - craftos/docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md
    - .planning/REQUIREMENTS.md
    - .planning/STATE.md
    - .planning/ROADMAP.md

key-decisions:
  - "QA-04 nach D-44 an Felddaten markiert: p75 LCP 564 ms (n = 58), INP 40 ms (n = 47), CLS 0 (n = 31), 30 Tage Produktion; Stichprobe < 100 als Grenze genannt"
  - "QA-06 bleibt In Progress: Bestätigungsaudit Rohwert 2, Inhaberpunkt offen 0, behebbar 2 (Impressum O2/O3, interne Links im Hauptteil); keine Behebung im Rollout, Lückenschluss in PHASE-10-ROLLOUT § 11"
  - "„Loads fast (Core Web Vitals in the green)“ im Bestätigungsaudit an Feldwerten bewertet (D-44), Labordaten nur Regressionsinformation"
  - "Neuer SE-Ranking-Hinweis links_no_anchor (156 Seiten, Logo-Link mit aria-label) als Crawler artifact mit Beleg gewaivt"
  - "Zeitlimit-Flake keyword-map.test.ts im ship-gate auf 60 s gesetzt (Muster 08-09/10-06)"

patterns-established:
  - "Rollout-Prüfung der Lighthouse-Werte live gegen craftos.eu mit AUDIT_ORIGIN, je Block unter .heavy-lock"

requirements-completed: [DESIGN-02, DESIGN-05, QA-04, QA-05]

duration: 62min
completed: 2026-10-23
---

# Phase 10 Plan 07: Rollout Summary

**Phase 10 ist live (`e392762`, Deployment `dpl_TBDg23xnPvC9HmED3ArQA16Vida7` READY 16:30:41 UTC, live-check 77/77 OK, IndexNow 156 URLs HTTP 200). SE Ranking kostete 426 Units (Phasensumme 952 von 5.000). Die Felddaten erfüllen QA-04 (p75 LCP 564 ms, INP 40 ms, CLS 0). Das Bestätigungsaudit zeigt noch 2 behebbare On-Page-Fehler auf `/impressum`, deshalb bleibt QA-06 offen. SEO-08 steht bei 0 von 15 neuen seriösen Domains.**

## Performance

- **Dauer:** rund 62 min (16:13–17:15 UTC)
- **Aufgaben:** 3/3
- **Geänderte Dateien:** 30 (ohne SUMMARY)

## Startgate und ship-gate (Aufgabe 1)

- **Startgate:** `10-12-SUMMARY.md` und `10-REVIEW.md` vorhanden, `craftos/` sauber, Port 3100 frei. Review-Prüfung: 6 IDs (HI-01, ME-01 bis ME-05), alle „behoben“ mit Commit → bestanden.
- **ship-gate:** nach SKILL.md, weil kein Skill-Tool verfügbar war. Koordinationsstatus gelesen: kein Website-Rezept, deshalb lokal unter `.heavy-lock`.

| Prüfung | Ergebnis |
|---|---|
| Vitest Lauf 1 | 1700/1701, ein Zeitlimit-Fall (`keyword-map.test.ts`, 5,6 s) |
| Vitest Lauf 2 nach `e392762` | 59 Dateien, 1701/1701 |
| Lint, Typcheck | jeweils 0 |
| Build, `sync:product:check`, `check-no-secrets` | grün, aktuell (v4.0.0-test.249), keine Schlüssel |

- **Übernommen aus 10-12:** E2E, seo-/route-/visual-audit, A11y-Matrix und Lighthouse lokal. Seit Block 3 kam kein Seitencode hinzu.
- **Review:** `10-REVIEW.md` und `10-REVIEW-FIX.md` dienen als Gate; dazu kam die eigene Sichtung des Code-Deltas `96388c4..HEAD` ohne Befund. Ein Ultra-Review wurde nicht gestartet.

## gh workflow list --all (beide Pushes)

Vor dem Code-Push (23.10.2026, 16:29:32 UTC):

```text
Dependabot Updates	active	227711329
```

Vor dem Doku-Push (23.10.2026, 17:06:25 UTC):

```text
Dependabot Updates	active	227711329
```

In beiden Fällen gab es kein `.github/` im Diff (Zähler 0) und kein Verzeichnis `.github` im Repository. Der Doku-Diff enthielt 20 Dateien unter `craftos/docs` bzw. `craftos/audit-report*`, dazu die `.planning`-Dateien dieses Commits.

## Push, Deployment, IndexNow, live-check

- **Code-Push:** `87b73ce..e392762` um 16:29:44 UTC, 113 Commits, Fast-Forward. `.planning/config.json` war nicht enthalten.
- **Vercel:** Deployment `dpl_TBDg23xnPvC9HmED3ArQA16Vida7` mit Commit `e392762`:
  - erstellt 16:29:54 UTC, Build 46 s, **READY 16:30:41 UTC**
  - Aliase: craftos.eu, www.craftos.eu, craftos-black, craftos-craft-os, craftos-git-main
  - per CLI ermittelt (`vercel ls/inspect/api`)
- **live-check** gegen https://craftos.eu: **77 OK, 0 FEHLER**, davon 8 im Phase-10-Block.
- **IndexNow:** 156 URLs gemeldet, HTTP 200. Die Sitemap hat 156 URLs, also keine neue und keine entfallene URL (D-01).

## Units je Block (SE Ranking)

| Block | vorher | nachher (≥ 60 s) | Verbrauch |
|---|---|---|---|
| A `se-ranking-sync --check` | 18.071 (16:36:05) | 18.071 (16:37:22) | 0 |
| B Recheck 485185 + Bericht + URLs | 18.071 (16:37:34) | 17.757 (16:46:33) | 314 |
| C `seo-report --etappe rollout-phase10` ohne `--leaderboard` | 17.757 (16:46:45) | 17.645 (16:49:18) | 112 |

**Verbrauch in 10-07: 426 Units.** Phasensumme: 526 + 0 + 0 + 426 = **952 ≤ 5.000**. Restkontingent 17.645. Es gab keinen Leaderboard-Abruf. `check-no-secrets` meldete „OK“.

## Fehlerzählung QA-06 (Bestätigungsaudit, ohne Behebungen)

- **Recheck 485185:** 97/100, 0 Fehler, 13 Warnungen (gewaivt, unverändert), 164 Hinweise.
  - **Behoben:** `title_short`, `same_title_h1`, `extlinks3xx`
  - **Neu:** 156 × `links_no_anchor` am Logo-Link mit `aria-label`, als Crawler artifact gewaivt
- **Live geprüft:**
  - `seo-audit` 0/156
  - `route-audit` live: 156 Routen, 0 Fehler, 0 defekte Links
  - Lighthouse A11y/BP/SEO 100 auf 15 URLs
  - 404 ohne Canonical
  - 3 Font-Preloads
  - robots.txt nennt 5 KI-Crawler
- **Rohwert 2 · Inhaberpunkt offen 0 · Wert der behebbaren Fehler 2:**
  - **O2:** `/impressum` hat nur 1 internen Link im Hauptteil.
  - **O3:** Der Hauptteil verlinkt weder Funktionen noch Preise.
  - Daraus folgt der Lückenschluss QA-06 in `PHASE-10-ROLLOUT.md` § 11. Besitz: Entscheidung des Orchestrators zur Darstellung der Rechtsseite, danach ein Folgeplan.
- **Stichprobe (14 Seiten):**
  - On-Page fixable Ø 89 → 91 %
  - GEO 71 → 74 %
  - Gesamtwert der HTML 86 → 88

## Lighthouse live (Labordaten, mobil, live, Median aus 3 Läufen, URL; kein Gate)

- **Gate-Seiten:** Score 97–98, LCP 2.421–2.569 ms. Nur `/funktionen` (2.569 ms) bekam eine Warnung.
- **Vorab-Vorlagen:** `/funktionen/zeiterfassung` 94 / 2.807 ms, `/gewerke/elektriker` 96 / 2.701 ms, `/vergleich/plancraft-alternative` 98 / 2.431 ms.
- **Rechts-, Support- und Rechnerseiten** (1 Lauf): Score 97–98.
- **Alle 15 URLs:** Accessibility, Best Practices und SEO 100, CLS 0.

## Felddaten (D-44) und Analytics

- **Speed Insights:** Produktion, `--since 30d` (23.09. 16:00 bis 23.10. 20:00 UTC), abgefragt 16:50 UTC.
  - LCP p75 **564 ms** (n = 58)
  - INP p75 **40 ms** (n = 47)
  - CLS p75 **0** (n = 31)
  - Grenze: Die Stichprobe liegt unter 100 und stammt überwiegend aus der Zeit vor dem Rollout.
- **Analytics ab Push** (16:29–16:52 UTC, abgefragt 16:51:12 UTC):
  - `trial_click` 1, `login_click` 1, `ai_visit` 0, 15 Seitenaufrufe
  - über 30 Tage: `ai_visit` 0
  - Das 24-Stunden-Fenster trägt der Orchestrator nach.

## Linkregister (SEO-08)

- **omr.com:** live bestätigt (HTTP 200, 16:52 UTC, nofollow-Link auf craftos.eu). In SE Ranking ist die Domain noch nicht erfasst.
- **Neue seriöse verweisende Domains:** 0. Ausgangsstand waren 12 Spam-Domains, aktuell sind es dieselben 12.
- `backlink-plan.test.ts` 14/14.

## Anforderungsstatus

| ID | Status | Begründung |
|---|---|---|
| DESIGN-02 | Complete | Phase-10-Seiten live auf v2 (live-check Köpfe, 404); Gate 10-12 grün |
| DESIGN-05 | Complete | A11y-Matrix 10-12 ohne Gate-Verstoß (158 Seiten, 890 Aufrufe); Lighthouse A11y 100 lokal und live |
| QA-04 | Complete | D-44-Felddaten unter allen drei Schwellen (Werte oben); Lab-Werte nur Regressionsinformation |
| QA-05 | Complete | Etappenzeilen 05–10 vollständig (Test grün), Phase-10-Abfrage mit Zeitpunkt dokumentiert |
| QA-06 | In Progress | 2 behebbare On-Page-Fehler (O2, O3) im Bestätigungsaudit |
| SEO-08 | In Progress | 0 von 15 neuen seriösen Domains; LINKPLAN § 7 |

`requirements.mark-complete` lief nur für DESIGN-02, DESIGN-05, QA-04 und QA-05. Den Traceability-Text für DESIGN-02, QA-06 und SEO-08 habe ich von Hand ergänzt.

## Offene Inhaberpunkte (Vorgabeliste)

1. Höhe des Mega-Menüs bei 900 px
2. weitere Altklassen (`.craft-page-hero`, `.craft-watermark`, `.section-title`, `.rule-list`, `.notice`)
3. App-Repo: Datenschutzerklärung von 12/2024 mit Cookie-Text und Brevo-Anschrift uneinheitlich
4. Mobile-App: Credits 2 → 3 ab 01.01.2027
5. R2 ohne EU-Jurisdiktion
6. SE-Ranking-Tarif bis 03.11.2026 (Promptlimit 20)
7. Linkaufbau (Übergabe 2 im LINKPLAN)

## Task Commits

1. **Aufgabe 1:**
   - `e392762` fix(10-07): Zeitlimit keyword-map.test.ts (ship-gate)
   - `4de4d2e` docs(10-07): Rollout-Nachweis §§ 1–6
2. **Aufgabe 2:** `420a987` docs(10-07): Messungen nach dem Rollout (SE Ranking, Audits, Lighthouse live, Linkregister)
3. **Aufgabe 3:**
   - `9582185` docs(10-07): Rollout-Nachweis §§ 7–15, Etappenzeile 10, Endfassung Abschlussbericht
   - Metadaten-Commit mit SUMMARY, STATE, ROADMAP und REQUIREMENTS

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Zeitlimit-Flake im ship-gate**
- **Gefunden in:** Aufgabe 1, Vitest Lauf 1
- **Problem:** `keyword-map.test.ts` „Phase-7-Detailseiten folgen den Zielwerten“ brauchte unter Volllast 5.613 ms, einzeln 960 ms.
- **Fix:** Zeitlimit des Falls auf 60 s gesetzt (Muster 08-09/10-06); die Prüfung selbst ist unverändert.
- **Commit:** `e392762`. Danach 1701/1701.

### Weitere Abweichungen

- **Vercel-MCP nicht aufrufbar:** Deployment, Felddaten und Analytics liefen über die Vercel-CLI 65.2.0 (`ls`, `inspect`, `api`, `metrics`).
- **Lighthouse live erweitert:** Neben den Gate-Seiten habe ich die Rechts-, Support- und Rechnerseiten (1 Lauf) und die drei Vorab-Vorlagen gemessen, damit das Bestätigungsaudit Vorher und Nachher vergleichen kann. Kein Gate.
- **route-audit live:** Der Lauf ging gegen https://craftos.eu statt gegen einen lokalen Server, weil das Bestätigungsaudit dem Live-Stand gilt.
- **Bestätigungs-HTML:** `audit-report-bestaetigung.html` entstand aus der Skill-Vorlage mit denselben Bewertungsskripten wie 10-05, kopiert und angepasst im Scratchpad. Vorher = Vorab-Bewertung, nachher = Live-Bewertung. Die Vorab-HTML ist unverändert.

## Screenshots

- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-07/bestaetigung-top.png` (selbst angesehen: 86 → 88, 249 → 220, 0 JS-Fehler)
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-07/bestaetigung-full.png`

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. Geändert wurden Dokumentation, Messdaten und ein Testzeitlimit. Schlüssel kommen nur als Variablennamen vor; `check-no-secrets` lief vor beiden Pushes.

## Prozesse

Jeder schwere Lauf lief einzeln unter `.heavy-lock`:
- ship-gate 2×
- Lighthouse live 3 Blöcke

Ich habe keinen Server gestartet, Port 3100 war durchgehend frei. Die Headless-Chrome-Prozesse von Lighthouse und Playwright sind mit ihren Läufen beendet. Die Sperre ist entfernt.

## Self-Check: PASSED
