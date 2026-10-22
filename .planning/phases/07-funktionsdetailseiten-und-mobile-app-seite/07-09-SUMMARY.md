---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 09
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-pruefung, vercel, se-ranking]
requires:
  - phase: 07-08
    provides: Browserprüfungen, B10, scrollbar-gutter-Entscheidung D-14
  - phase: 07-review
    provides: 07-REVIEW.md und 07-REVIEW-FIX.md (bis c86d86d)
provides:
  - Phase 7 live auf craftos.eu (Vercel dpl_5xujdhv6bnYnxsHhzNpQUNHPdFyQ, READY)
  - scripts/live-check.mjs mit 29 Phase-7-Prüfungen (46 insgesamt)
  - craftos/docs/releases/PHASE-07-ROLLOUT.md
  - craftos/docs/seo/reports/2026-10-22-messbericht-rollout-phase07.md (+ 6 Rohdateien, Projektabgleich)
affects: [phase-08, phase-10]
tech-stack:
  added: []
  patterns:
    - "live-check leitet Detailpfade aus /sitemap.xml und die Sollmenge aus keyword-map.json (Status bestehend) ab, keine fest kodierte Seitenzahl"
key-files:
  created:
    - craftos/docs/releases/PHASE-07-ROLLOUT.md
    - craftos/docs/seo/reports/2026-10-22-messbericht-rollout-phase07.md
    - craftos/docs/seo/reports/2026-10-22-projektabgleich.json
  modified:
    - craftos/app/sitemap.ts
    - craftos/lib/funktionen.ts
    - craftos/scripts/live-check.mjs
key-decisions:
  - "Rollout-Datum 2026-10-22 als lastmod für /app, /funktionen und alle 22 Detailseiten"
  - "Ein Code-Push (126f807) nach ship-gate über origin/main...HEAD; Doku-Push danach getrennt"
  - "Analytics-Zählung bleibt Inhaberaktion (keine Vercel-MCP-Werkzeuge, CLI ohne Analytics-Befehl)"
requirements-completed: [FEAT-02, FEAT-03, MEDIA-01]
duration: 20min
completed: 2026-10-22
---

# Phase 7 Plan 09: Rollout Summary

**Phase 7 ist live: 22 Detailseiten und /app auf craftos.eu (Vercel READY, Commit 126f807), live-check 46/46 OK, IndexNow 131 URLs mit HTTP 200, SE-Ranking-Abgleich ohne Abweichung, Etappenmessung rollout-phase07 erstellt.**

## Performance

- **Dauer:** ca. 20 min (13:53–14:13 MESZ)
- **Tasks:** 2/2
- **Dateien:** 3 geändert, 10 neu (Nachweis, Messbericht, 6 Rohdateien, Projektabgleich, SUMMARY)

## Task 1: Phasen-Gate lokal

- `app/sitemap.ts`: `/app` und `/funktionen` auf 2026-10-22; `lib/funktionen.ts`: `checkedAt` aller 22 Funktionen auf 2026-10-22 (ein gemeinsamer Wert in der Abbildung, nach IN-03).
- `scripts/live-check.mjs`: Keyword-Map-Schleife über `/`, `/funktionen`, `/app` und alle Detailpfade aus der Sitemap; neue Prüfungen „Alle bestehenden Detailseiten in der Sitemap“, „JSON-LD der Detailseiten“, „JSON-LD der App-Seite: MobileApplication ohne Bewertungen …“, „Keine internen Belegpfade oder Modulnamen …“ (inkl. `data-source`), „Kennzeichnung der Darstellungen …“, „llms.txt nennt alle Detailseiten und /app“. Bestand unverändert.
- Koordinationsstatus 11:54 UTC: edgar und edgarspc offline/veraltet (Runner 1.9.9). Rezeptlücke: kein Website-Rezept (`website-unit`, `website-build`, `website-e2e`). Alles lokal nacheinander.

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 29 Dateien, 483/483 |
| Lint, Typcheck | grün |
| `sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.239 (535206b4).“ – kein Nachziehen nötig |
| `check-no-secrets.mjs app components lib tests scripts docs ../.planning` | OK |
| `npm run build` | grün, 139 statische Seiten |
| `npm run test:e2e` gegen `next start -p 3100` | 293 passed, 0 failed, 75 skipped (7,0 min) |
| `route-audit.mjs` | exitCode 0 (134 Links, 16 Assets) |
| `live-check.mjs` lokal | 46/46 OK |
| `visual-audit.mjs` (5 Routen, nicht blockierend) | 50 Aufnahmen, 0 Befunde |
| Port 3100 | vorher und nachher frei, Server über eigene PID beendet |

Acceptance-Greps: Phase-7-Begriffe in live-check 8 (≥ 4), `"/app"` vorhanden; `"2026-10-20"` in sitemap.ts nicht mehr bei `/app` (bereits seit IN-03), `checkedAt: "2026-10-20"` = 0.

Screenshots (nicht committet): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-09/visual/` (50 PNG). Stichprobe `chromium-1440-funktionen-mahnwesen.png` selbst angesehen: Vorlage vollständig, kein Darstellungsfehler.

## Task 2: Ship-Gate, Push, Live

- **ship-gate** nach SKILL.md (Skill-Tool nicht verfügbar) über `git diff origin/main...HEAD` (65 Commits, 104 Dateien, +14.836/−1.134, nichts unter `.github/`). Review = 07-REVIEW.md (0/1/6/8) mit 07-REVIEW-FIX.md (WR-01 bis WR-07, IN-02 bis IN-05 behoben); Delta seit c86d86d nur 126f807, selbst gesichtet, kein Befund. Kein Ultra-Review.
- **`gh workflow list --all` vor dem Code-Push** (14:05:25 MESZ):
  ```text
  Dependabot Updates	active	227711329
  ```
- **Push:** `3eb5736..126f807  main -> main` (14:05:33).
- **Vercel:** `dpl_5xujdhv6bnYnxsHhzNpQUNHPdFyQ`, https://craftos-2adu46jix-craft-os.vercel.app, READY (26 s), Aliase craftos.eu, www.craftos.eu u. a.
- **live-check gegen https://craftos.eu:** 46/46 OK. Sitemap live: 131 URLs, 24 mit lastmod 2026-10-22.
- **IndexNow:** „IndexNow: 131 URLs gemeldet, HTTP 200“ (= 125 + 6, wie erwartet).
- **SE Ranking `--check`:** Soll 126, Projekt 151, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Limits 0 → keine Inhaberaktion.
- **Messung:** `node scripts/seo-report.mjs --etappe rollout-phase07` einmal, 8 MCP-Aufrufe, 0 Units; danach `check-no-secrets.mjs docs/seo scripts` OK. Frühere Berichte unverändert.
- **Analytics:** `/_vercel/insights/script.js` HTTP 200; Zählung trial_click/ai_visit als Inhaberaktion (Anleitung PHASE-07-ROLLOUT §8).
- **`gh workflow list --all` vor dem Doku-Push** (14:09:29 MESZ, vor dem Push erneut bestätigt):
  ```text
  Dependabot Updates	active	227711329
  ```

## Anforderungsstatus

| Anforderung | Status |
|---|---|
| FEAT-02 | erledigt (22 Detailseiten nach fester Vorlage, sechs neue Seiten, Zusatzfunktionen als Kachel) |
| FEAT-03 | erledigt (/app mit allen App-Funktionen) |
| MEDIA-01 | erledigt (Kopf-Visual für 22 Funktionen, Szenen auf allen Karten, Phone-Kacheln auf /app) |
| DESIGN-02 | offen – Phase 7: Detailseiten und /app umgesetzt; Abschluss Phase 8 |
| SEO-02 | offen – Phase 7: Title/H1/Description der Detailseiten und /app nach Keyword-Map; Abschluss Phase 8 |

## Auslegungen

(a) H1 = Zielwert exakt, Keyword-Regel über das Kopfwort des Hauptkeywords (D-22); (b) Description-Grenze 155 Zeichen laut Test statt 158 (D-10); (c) Zusatzfunktionen ohne eigene Seite als Kachel mit `data-zusatz` auf ihrer Zielseite, „21 Sprachen“ verweist auf /app (D-21); (d) FeatureSnippet nur auf 8 Detailseiten als einziges animiertes Element (D-19); (e) Rollen = Release-Presets plus „Kunde“, „Büro“ ist Lizenzstufe (B2; „Kunde“ seit WR-03 als kundenHinweis); (f) Offline als Kennzahl mit Pflicht-Einschränkung (B6, D-23); (g) „höchstens eine Überschrift je Abschnitt“ = genau eine H2, Kachel- und FAQ-Titel H3; (h) Links von Gewerkeseiten auf die neuen Detailseiten folgen mit dem Gewerke-Umbau in Phase 8 (D-12 in Phase 7 über Menü, Übersicht, verwandte Funktionen und Hilfe/Ratgeber erfüllt).

## Task Commits

1. `126f807` feat(07-09): Phasen-Gate mit Rollout-lastmod und Phase-7-Prüfungen im live-check
2. `1e54c2d` docs(07-09): Rollout-Nachweis Phase 7, Messbericht rollout-phase07 und SE-Ranking-Abgleich

## Deviations from Plan

- **Skill-Tool nicht verfügbar:** ship-gate direkt nach SKILL.md umgesetzt (wie in 06-06).
- **Vercel-MCP nicht verfügbar:** Deployment über `vercel ls`/`vercel inspect` verfolgt; Analytics-Zählung als Inhaberaktion.
- **lastmod:** IN-03 hatte die Daten bereits auf 2026-10-21 gesetzt; der Plan-Grep „um mindestens 1 kleiner“ gegenüber `"2026-10-20"` war daher schon erfüllt. Gesetzt wurde das tatsächliche Rollout-Datum 2026-10-22.
- **SE-Ranking-Abgleich** schreibt seinen Lesebericht `2026-10-22-projektabgleich.json` nach `docs/seo/reports/` (im Plan unter `reports/*` abgedeckt) und wurde mit committet.

Sonst keine Abweichungen.

## Offene Punkte

Siehe PHASE-07-ROLLOUT.md §13/§14: Leerraum in Icon-Kacheln bei 1024 px, Dimmstufe FeatureSnippet, zurückgestellte Review-Lows (IN-01, IN-06, IN-07, IN-08, zweiter Teil IN-05), Entscheidung product-demo/MobileAppGallery/zwei übersprungene Specs (Phase 10), ältere Release-Tests ohne den neuen Helfer `tests/release-repos.ts`, Sichtung der Screenshots, Analytics nach 24 h, Koordinationsrezept-Lücke.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-07-28: Secret-Scans vor dem Push und nach der Messung OK. T-07-29: zwei `gh workflow list`-Prüfungen, kein `.github/`. T-07-30: READY abgewartet, live-check grün. T-07-31: DESIGN-02/SEO-02 offen. T-07-32: live-check „Keine internen Belegpfade oder Modulnamen“ grün. T-07-33: nur `--check`.

## Self-Check: PASSED

- Dateien vorhanden: PHASE-07-ROLLOUT.md, Messbericht rollout-phase07, Projektabgleich, live-check.mjs.
- Commits 126f807 und 1e54c2d im Log; 126f807 auf origin/main.
- Kein Server läuft, Port 3100 frei; `.planning/config.json` nie gestaged.
