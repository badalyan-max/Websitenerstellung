---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 06
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-pruefung, vercel]
requires:
  - phase: 06-01..06-05
    provides: Startseite, Header mit Mega-Menü und Drawer, /funktionen, Keyword-Map-Metadaten, Review-Fixes
provides:
  - Phase-6-Stand live auf craftos.eu (dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq, READY)
  - scripts/live-check.mjs mit 7 Phase-6-Prüfungen (Keyword-Map, 30 Funktionen/6 Gruppen, Mega-Menü, Tracking, Belegpfade, FAQPage)
  - docs/releases/PHASE-06-ROLLOUT.md (Etappennachweis, Grundlage QA-05)
  - Messbericht rollout-phase06
affects: [07, 08, 10]
tech-stack:
  added: []
  patterns: ["live-check liest Zielwerte per JSON aus keyword-map.json und Detail-Slugs aus /sitemap.xml"]
key-files:
  created:
    - craftos/docs/releases/PHASE-06-ROLLOUT.md
    - craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase06.md
    - craftos/docs/seo/reports/2026-10-21-raw-rollout-phase06-*.json (6 Dateien)
  modified:
    - craftos/scripts/live-check.mjs
    - craftos/app/sitemap.ts
key-decisions:
  - "live-check vergleicht Title/H1/Description gegen keyword-map.json und leitet Detail-Slugs aus der Sitemap ab, damit künftige Phasen keine Listen doppelt pflegen"
  - "Verzögertes Vercel-Deployment (GitHub-Webhooks degradiert) abgewartet statt erneut zu pushen oder manuell zu deployen"
requirements-completed: [DESIGN-01, DESIGN-03, FEAT-01]
duration: 35min
completed: 2026-10-21
---

# Phase 6 Plan 06: Rollout Phase 6 Summary

**Phase 6 ist nach einem lokalen Gate über den Gesamtdiff live auf craftos.eu. Das Deployment `dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq` ist READY, der live-check meldet 17/17 OK, IndexNow hat 125 URLs mit HTTP 200 gemeldet, und die Etappenmessung rollout-phase06 liegt vor.**

## Performance

- **Dauer:** ca. 35 min (16:48–17:25 MESZ)
- **Tasks:** 2/2
- **Geänderte Dateien:** 2 (Code), 8 (Doku und Messdaten)

## Ergebnisse

### Task 1: Lokales Phasen-Gate (Commit `33dea41`)

- `app/sitemap.ts`: `pageUpdated` für `""` und `/funktionen` steht auf `2026-10-21`. Die anderen Einträge sind unverändert.
- `scripts/live-check.mjs` enthält jetzt sieben neue Prüfungen. Die zehn Phase-5-Prüfungen sind unverändert.
- Koordinationsstatus vorher gelesen: Edgar bereit (Runner 1.9.9), EdgarsPC offline/veraltet. **Für das Website-Repo gibt es kein Rezept (Lücke)**, die Läufe fanden deshalb lokal nacheinander statt.

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 25 Dateien, 330/330 |
| `npm run lint` / `typecheck` | grün / grün |
| `npm run sync:product:check` | aktuell (v4.0.0-test.239, 535206b4); kein Nachziehen nötig |
| `check-no-secrets.mjs app components lib tests scripts docs ../.planning` | OK |
| `npm run build` | grün |
| `npm run test:e2e` (gegen `next start -p 3100`, eigene PID 1670) | 258 bestanden, 0 fehlgeschlagen, 50 übersprungen (4,6 min) |
| `route-audit.mjs` | exitCode 0 (129 Links, 18 Assets) |
| `LIVE_ORIGIN=http://localhost:3100 live-check.mjs` | 17/17 OK |
| `visual-audit.mjs` `/,/funktionen` (nicht blockierend) | 20 Aufnahmen, 0 Befunde |
| Port 3100 danach | frei |

Screenshots (Sichtung durch den Inhaber, nicht blockierend): `C:\Projekte\Websitenerstellung\craftos\test-results\visual\` mit `chromium-{360,390,768,1024,1440}-home.png`, `chromium-{360,390,768,1024,1440}-funktionen.png`, `webkit-{360,390,768,1024,1440}-home.png` und `webkit-{360,390,768,1024,1440}-funktionen.png`, zum Beispiel `C:\Projekte\Websitenerstellung\craftos\test-results\visual\chromium-1440-home.png` und `C:\Projekte\Websitenerstellung\craftos\test-results\visual\webkit-390-funktionen.png`.

### Task 2: ship-gate, Push, Deployment, Live-Prüfung, IndexNow, Messung (Commit `f644391`)

- **ship-gate** über `git diff origin/main...HEAD` (55 Commits, 77 Dateien, 60 außerhalb von `.planning/`). Das Skill-Tool stand nicht zur Verfügung, deshalb wurde das Gate direkt nach SKILL.md umgesetzt. Die Prüfergebnisse stammen aus Task 1, danach kam nur der Task-1-Commit selbst hinzu. Review: `06-REVIEW.md` (0/0/4/10). Alle Medium- und acht Low-Befunde sind laut `06-REVIEW-FIX.md` behoben, IN-05 und IN-07 sind begründet zurückgestellt. Das Delta seit `d5bd8ac` (`708f8b5` nur Doku, `33dea41`) wurde selbst gesichtet, ohne Befund. Kein Ultra-Review.
- **`gh workflow list --all` vor dem Code-Push:**
  ```text
  Dependabot Updates	active	227711329
  ```
  Kein `.github` im Repo und im Diff.
- **Push:** `6587768..33dea41  main -> main`, 16:55:55 MESZ.
- **Vercel:** Wegen „Webhooks: degraded performance“ bei GitHub startete das Deployment erst nach rund 14 Minuten. Production `dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq`, https://craftos-l7p60ysyi-craft-os.vercel.app, **READY** (34 s, 17:10:17 MESZ), Aliase craftos.eu und www.craftos.eu.
- **live-check gegen https://craftos.eu:** 17/17 OK. Live-`lastmod` für `/` und `/funktionen` ist 2026-10-21, `/_vercel/insights/script.js` liefert HTTP 200.
- **IndexNow:** „125 URLs gemeldet, HTTP 200“.
- **Messbericht:** `craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase06.md` und 6 Rohdateien, einmal ausgeführt, 8 MCP-Aufrufe, 0 Units. Danach meldete `check-no-secrets.mjs docs/seo scripts` „OK“. Die Berichte ausgangsstand und rollout-phase05 sind unverändert.
- **Analytics:** Die Zählung von `trial_click`/`ai_visit` ist eine Inhaberaktion nach 24 Stunden, weil Vercel MCP nicht verfügbar war und die CLI keinen Analytics-Befehl hat. Die Anleitung steht in PHASE-06-ROLLOUT §7.
- **`gh workflow list --all` vor dem Doku-Push:**
  ```text
  Dependabot Updates	active	227711329
  ```
  Der Diff des Doku-Pushs enthält nur `craftos/docs/releases/PHASE-06-ROLLOUT.md`, die Messdaten und die `.planning`-Dokumente (SUMMARY, STATE, ROADMAP, REQUIREMENTS), aber nichts unter `.github`.

## Anforderungsstatus

| Anforderung | Status |
|---|---|
| DESIGN-01 | erledigt |
| DESIGN-03 | erledigt |
| FEAT-01 | erledigt |
| DESIGN-02 | offen: Phase 6 hat /, Menü und /funktionen umgesetzt; Abschluss in Phasen 7–8 (In Progress, Traceability-Text unverändert) |
| SEO-02 | offen: Phase 6 hat /, /funktionen und die Menü-Ankertexte nach Keyword-Map umgesetzt; Abschluss in Phasen 7–8 (In Progress, Traceability-Text unverändert) |

Aufgerufen wurde ausschließlich `requirements.mark-complete DESIGN-01 DESIGN-03 FEAT-01`.

## Auslegungen

1. Zusatzfunktionen ohne Detailseite erscheinen im Menü nicht einzeln, sondern über die Gruppenlinks `/funktionen#<gruppe>` (UI-SPEC Z. 361). Die Zwei-Klick-Definition aus 06-RESEARCH ist erfüllt: Menü öffnen und Gruppenlink wählen.
2. „Höchstens eine Überschrift je Abschnitt“ wird als genau eine H2 je Abschnitt ausgelegt. Die FAQ-Fragen sind H3 innerhalb des FAQ-Abschnitts.

## Abweichungen vom Plan

1. **[Ausführung] ship-gate ohne Skill-Tool:** Das Skill-Tool war in dieser Laufzeit nicht verfügbar. Das Gate wurde direkt nach `ship-gate/SKILL.md` umgesetzt, wie es der Plan für diesen Fall vorsieht.
2. **[Ausführung] Verzögertes Deployment:** GitHub-Webhooks waren degradiert. Das Deployment wurde abgewartet, ohne erneuten Push und ohne manuelles `vercel deploy`.
3. **[Ausführung] gsd-tools nicht im PATH:** Die Statusbefehle liefen über `node ~/.claude/gsd-core/bin/gsd-tools.cjs`.

Sonst wurde der Plan wie geschrieben ausgeführt. Es waren keine Fehlerbehebungen am Code nötig.

## Offene Punkte (Phase 7 / Inhaber)

- Entscheidung über `components/product-demo/*`: Die Specs `demo-planning.pw.cjs` und `mobile-step-flow.pw.cjs` werden derzeit übersprungen (WR-03).
- IN-05: Bei `data-source` mit internen Quellbezeichnern auf `/` ist eine Kurzform mit UI-SPEC-Verantwortung zu entscheiden.
- IN-07: Bei `scrollbar-gutter: stable` sind `/impressum`, `/datenschutz` und die 404-Seite unter Windows zu sichten.
- 11 Funktionskarten auf `/funktionen` zeigen nur ein Icon. Die Szenen werden in Phase 7 ergänzt.
- Sichtung der Screenshots `/` und `/funktionen`, Analytics-Kontrolle nach 24 Stunden, menschliche Prüfung des Esc- und Fokusverhaltens (WR-02/IN-01).
- Koordinationsrezept für das Website-Repo fehlt (zum Beispiel `website-build`/`website-e2e`).

## Known Stubs

Keine. Die neuen Prüfungen lesen echte Live- bzw. Lokaldaten.

## Self-Check: PASSED

- FOUND: craftos/docs/releases/PHASE-06-ROLLOUT.md
- FOUND: craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase06.md
- FOUND: Commit 33dea41 (auf origin/main), Commit f644391
- `.planning/config.json` wurde nie gestaged.
