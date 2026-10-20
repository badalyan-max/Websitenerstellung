---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 08
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-pruefung, vercel, se-ranking]
requires:
  - phase: 05-01
    provides: "keyword-map, check-no-secrets.mjs"
  - phase: 05-02
    provides: "product-register.ts mit productBasis, Faktenseite"
  - phase: 05-03
    provides: "Preis-Snapshot und Paritätstest"
  - phase: 05-07
    provides: "seo-report.mjs, Ausgangsbericht, Projektabgleich (limits leer)"
provides:
  - "scripts/live-check.mjs: wiederverwendbare Live-/Lokalprüfung (LIVE_ORIGIN) für Preise, Ankündigungen, Styleguide-Schutz, Sitemap, JSON-LD"
  - "Paritätsfall Register ↔ Preis-Snapshot (gleicher Web-Commit) und Faktenseite im Preisliteral-Scan"
  - "docs/releases/PHASE-05-ROLLOUT.md: Etappennachweis inkl. Anforderungsstatus (Grundlage QA-05)"
  - "Messbericht rollout-phase05 (SE Ranking) neben dem Ausgangsstand"
  - "Phase-5-Stand live auf craftos.eu (dpl_3aQdr36jCqzeWzRVQABWnQFxbW49), per IndexNow gemeldet"
affects: [06, 07, 08, 09, 10]
tech-stack:
  added: []
  patterns:
    - "Live-Prüfung nach jedem Deployment: node scripts/live-check.mjs (lokal mit LIVE_ORIGIN=http://localhost:3100)"
    - "Ein Code-Push je Phase nach ship-gate über git diff origin/main...HEAD"
key-files:
  created:
    - craftos/scripts/live-check.mjs
    - craftos/docs/releases/PHASE-05-ROLLOUT.md
    - craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase05.md
    - craftos/docs/seo/reports/2026-10-21-raw-rollout-phase05-*.json (6 Dateien)
  modified:
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/product-register.test.ts
    - craftos/lib/product-register.ts
    - craftos/docs/PRODUCT-REGISTER.md
    - craftos/docs/product-pricing-snapshot.json
key-decisions:
  - "05-08: Web-Produktbasis vor dem Rollout auf origin/release v4.0.0-test.239 (535206b4) nachgezogen; Delta betrifft nur interne Analytics, keine Preise oder beworbenen Funktionen"
  - "05-08: SEO-08 bleibt in REQUIREMENTS offen (Phase-5-Anteil erledigt, Meilensteinziel ≥ 15 Refdomains Stand 0); DESIGN-02 und SEO-02 als Phase 5 Grundlage, Umsetzung Phasen 6–8"
  - "05-08: Analytics-Zählung trial_click/ai_visit als Inhaberprüfung geführt, da weder Vercel-CLI noch MCP Analytics-Zugriff boten"
requirements-completed: [PROD-02, PROD-03, PROD-04, DESIGN-04, MEDIA-03, MEDIA-04, SEO-07]
duration: 25min
completed: 2026-10-21
---

# Phase 5 Plan 08: Phasen-Gate, Ship-Gate und Rollout Summary

**Phase 5 ist nach einem ship-gate über den Gesamtdiff live auf craftos.eu (Deployment dpl_3aQdr36jCqzeWzRVQABWnQFxbW49 READY), per IndexNow gemeldet (125 URLs, HTTP 200), mit live-check 10/10 OK geprüft, mit dem Messbericht rollout-phase05 gemessen und mit ehrlichem Anforderungsstatus dokumentiert.**

## Performance

- **Dauer:** ca. 25 Minuten
- **Gestartet:** 2026-10-21 01:28 (lokal)
- **Abgeschlossen:** 2026-10-21 01:53 (lokal)
- **Tasks:** 2 von 2
- **Dateien:** 9 neu (inkl. 6 Rohdateien), 5 geändert

## Ergebnisse

- **Querprüfungen (PROD-02/03):** Der neue Fall „Register und Preis-Snapshot nutzen denselben Web-Commit“ und die Aufnahme von `app/fakten-ueber-craftos/page.tsx` in den Literal-Scan sind grün. Beim Gate war `origin/release` der Web-App von `v4.0.0-test.238` auf `v4.0.0-test.239` (535206b4) weitergelaufen. Die zwei neuen Commits betreffen nur die Telefonspalte in internen Analytics-Listen. Daraufhin wurden `npm run sync:product` ausgeführt, Register und Doku angeglichen und `checkedAt` auf 2026-10-21 gesetzt (Test angepasst). Die Belegpfadprüfung ist grün.
- **live-check.mjs:** Prüft per Node-fetch `/llms.txt` (0,99 €, 150 Credits, einmalig, alle Paketpreise aus dem Snapshot), die Ankündigungsfreiheit von vier Seiten (Muster identisch mit route-audit/announcements-Test), `/preise`, `/styleguide` (200, meta noindex, X-Robots-Tag), die Sitemap ohne `/styleguide`, JSON-LD (29.95, valueAddedTaxIncluded false) und `/funktionen/kundenportal` ohne „In Prüfung“.
- **Rollout:** Nach `gh workflow list --all` (nur „Dependabot Updates“, GitHub-dynamisch, kein Push-Trigger, keine Workflow-Dateien im Repo) folgte der Push `782d947..0480e06`. Das Vercel-Deployment wurde READY und auf craftos.eu aliasiert. Danach liefen live-check (alle OK), IndexNow und die Etappenmessung.

## Prüfergebnisse (lokal, vor dem Push)

Koordinationsstatus vor den schweren Läufen: Edgar bereit, EdgarsPC offline/veraltet. **Rezeptlücke:** Für das Website-Repo gibt es kein Koordinationsrezept, daher liefen alle Prüfungen lokal und strikt nacheinander.

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 21 Dateien, 249/249 grün |
| `npm run lint` / `npm run typecheck` | grün / grün |
| `npm run sync:product:check` | aktuell (v4.0.0-test.239, 535206b4) |
| `check-no-secrets.mjs docs/seo scripts lib tests` (zusätzlich app, components, content, docs, public, ../.planning) | OK |
| `npm run build` | grün |
| `npm run test:e2e` gegen `next start -p 3100` | 220 bestanden, 0 fehlgeschlagen, 28 übersprungen (projektgebundene Skips) |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 10/10 OK |
| `visual-audit.mjs` (/styleguide, /funktionen, /preise) | 30 Aufnahmen, 0 Befunde |
| Port 3100/3101 danach | frei |

Screenshots /styleguide zur Sichtung durch den Inhaber (nicht blockierend): `C:/Projekte/Websitenerstellung/craftos/test-results/visual/chromium-1440-styleguide.png`, `.../chromium-390-styleguide.png`, `.../webkit-1440-styleguide.png` sowie die WebKit-390-Variante (gitignoriert, lokal).

## Prüfergebnisse (live, nach dem Push)

| Prüfung | Ergebnis |
|---|---|
| Vercel Production | `dpl_3aQdr36jCqzeWzRVQABWnQFxbW49`, https://craftos-b9xmxut48-craft-os.vercel.app, READY, Aliase craftos.eu und www.craftos.eu |
| `node scripts/live-check.mjs` gegen https://craftos.eu | 10/10 OK |
| /gewerke KI-Kennzeichnung | „Darstellung, KI-gestaltet“ vorhanden |
| /preise Credits-Hinweis | „einmalig 150 Credits (entspricht 1,50 €; 1 Credit = 0,01 €)“ |
| `npm run indexnow` | 125 URLs, HTTP 200 |
| `seo-report.mjs --etappe rollout-phase05` | geschrieben, 8 MCP-Aufrufe, 0 Units; Ausgangsbericht unverändert |
| Analytics `trial_click`/`ai_visit` | Code verdrahtet, `/_vercel/insights/script.js` live 200; Zählung der letzten 24 Stunden als Inhaberprüfung (siehe Nachweis §7) |

## Ship-Gate und Review

Das ship-gate lief einmal über `git diff origin/main...HEAD` (50 Commits, 233 Dateien) unmittelbar vor dem einzigen Code-Push. Build, Lint, Typcheck und Tests sind oben aufgeführt. Als Review dient der offizielle GSD-Phasenreview (05-REVIEW.md: 0/3/6/13; alle High- und Medium-Befunde behoben laut 05-REVIEW-FIX.md, 7 Low begründet zurückgestellt). Das einzige neue Delta seit dem Review, Commit `0480e06`, hat der Executor selbst gesichtet, ohne Befund; eine unabhängige Zweitprüfung des Deltas gab es nicht. Kein Ultra-Review. Das Ship-Gate-Skill wurde mangels Skill-Tool in dieser Agentenlaufzeit direkt nach `SKILL.md` und `references/runtime.md` umgesetzt.

## Anforderungsstatus

| Anforderung | Status |
|---|---|
| PROD-02, PROD-03, PROD-04 | erledigt |
| DESIGN-04, MEDIA-03, MEDIA-04 | erledigt |
| SEO-07 | erledigt (limits[] leer, Etappenmessung liegt vor) |
| SEO-08 | offen. Der Phase-5-Anteil (Linkplan, Register, Übergabe 1) ist erledigt; das Meilensteinziel von mindestens 15 neuen Refdomains steht bei 0 |
| DESIGN-02 | Phase 5 Grundlage, Umsetzung Phasen 6–8 |
| SEO-02 | Phase 5 Grundlage, Umsetzung Phasen 6–8 |

## Task-Commits

1. **Task 1:** `0480e06` – feat(05-08): Phasen-Gate mit Register-Snapshot-Abgleich und live-check
2. **Task 2:** `80c90a8` – docs(05-08): Rollout-Nachweis Phase 5 und Messbericht rollout-phase05

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Web-Produktbasis war weitergelaufen**
- **Found during:** Task 1
- **Issue:** `sync:product:check` meldete einen veralteten Snapshot (07cf0645 statt 535206b4); damit wären der Snapshot-Aktualitätstest und das Gate rot gewesen.
- **Fix:** Wie im Plan vorgesehen `npm run sync:product`, `productBasis.web` und `checkedAt` in `lib/product-register.ts` angeglichen, `tests/product-register.test.ts` (checkedAt) und `docs/PRODUCT-REGISTER.md` nachgezogen.
- **Commit:** `0480e06`

**2. [Rule 3 - Blocking] visual-audit scheiterte an der MSYS-Pfadumwandlung**
- **Found during:** Task 1
- **Issue:** Git Bash wandelte `AUDIT_ROUTES=/styleguide,…` in einen Windows-Pfad um (`http://localhost:3100C:/Program Files/Git/styleguide`).
- **Fix:** Erneuter Lauf mit `MSYS2_ENV_CONV_EXCL=AUDIT_ROUTES`, kein Codeeingriff.

**3. [Abweichung Tooling] ship-gate und Analytics**
- Ship-gate ohne Skill-Tool direkt nach der Skill-Datei umgesetzt. Die Analytics-Zählung war ohne Vercel-MCP/CLI-Zugriff nicht abrufbar und ist als Inhaberprüfung dokumentiert.

## Offene Inhaberaktionen

1. Linkplan Übergabe 1 ausführen (`craftos/docs/seo/LINKPLAN.md` §4).
2. /styleguide-Screenshots sichten.
3. Zehn themenfremde ChatGPT-Prompts im SE-Ranking-AI-Tracker: Löschen oder Ersetzen nur nach Freigabe (nicht angefasst).
4. Analytics `trial_click`/`ai_visit` nach 24 Stunden im Vercel-Dashboard prüfen.
5. Optional ein Koordinationsrezept für das Website-Repo bauen lassen.

## Known Stubs

Keine.

## Self-Check: PASSED

- FOUND: craftos/scripts/live-check.mjs, craftos/docs/releases/PHASE-05-ROLLOUT.md, craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase05.md
- FOUND: Commits 0480e06, 80c90a8
