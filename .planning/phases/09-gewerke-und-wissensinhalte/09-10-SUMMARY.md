---
phase: 09-gewerke-und-wissensinhalte
plan: 10
subsystem: rollout
tags: [rollout, ship-gate, indexnow, live-check, vercel, se-ranking, messbericht, anforderungsstatus, produktabgleich, offline]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "Phasen-Gate 09-16, Code-Review 09-REVIEW und 09-REVIEW-FIX, Integration 09-09"
provides:
  - "Phase 9 live auf craftos.eu (25bad34, dpl_HxdXfEzGz7jUw8rcdQFFj2Pvvu7F READY)"
  - "live-check mit sieben Phase-9-Prüfungen (Gewerke, Anleitungen, Wissensseiten, Verlinkung, Prompt-Anker)"
  - "Produktbasis Web v4.0.0-test.248 (1f704236), Mobile test.96 unverändert"
  - "Offline-Aussagen positiv aus Registereintrag mobileOffline.erfassung"
  - "Rollout-Nachweis craftos/docs/releases/PHASE-09-ROLLOUT.md, Messbericht rollout-phase09"
affects: [10-abschlussaudit]

tech-stack:
  added: []
  patterns:
    - "live-check liest Phase-9-Pfade aus keyword-map.json (phase: 9) und den llms.txt-Abschnitten und verlangt Übereinstimmung"
    - "Offline-Aufzählung als Registerfeld mit Hook-Belegen am Mobile-Release"

key-files:
  created:
    - craftos/docs/releases/PHASE-09-ROLLOUT.md
    - craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase09.md
    - craftos/docs/seo/reports/2026-10-23-projektabgleich-2.json
    - craftos/docs/seo/reports/2026-10-23-projektabgleich-apply.json
    - craftos/docs/seo/reports/2026-10-23-projektabgleich-3.json
  modified:
    - craftos/scripts/live-check.mjs
    - craftos/lib/product-register.ts
    - craftos/lib/home-content.ts
    - craftos/lib/app-content.ts
    - craftos/lib/llms.ts
    - craftos/lib/seiten/fakten.ts
    - craftos/lib/funktionsdetails/baustelle.ts
    - craftos/docs/product-pricing-snapshot.json
    - craftos/docs/product-source-snapshot.json
    - craftos/docs/PRODUCT-REGISTER.md
    - craftos/tests/app-seite.test.ts
    - craftos/tests/home.test.ts
    - craftos/tests/llms.test.ts
    - craftos/tests/product-register.test.ts
    - craftos/tests/funktionsdetails.test.ts
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md

key-decisions:
  - "Phase 9: Produktbasis auf Web v4.0.0-test.248 (1f704236) angehoben; Delta nur Fehlerbehebungen, Preise identisch, keine neue Live-Funktion"
  - "Phase 9: Offline positiv aus mobileOffline.erfassung („Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge“, bis zu 24 Stunden) auf Startseite, /app, /funktionen/zeiterfassung, llms.txt und /fakten"
  - "Phase 9: live-check verlangt die Quellenliste nur bei Artikeln mit sources im Frontmatter; /gewerke prüft nur die Antwortregel"
  - "Phase 9 live (25bad34, dpl_HxdXfEzGz7jUw8rcdQFFj2Pvvu7F): live-check 69/69, IndexNow 156, SE Ranking 0 Units, sechs Hauptkeywords ergänzt; FEAT-04, CONTENT-03, CONTENT-04, SEO-09 erledigt, DESIGN-02 Rest Phase 10"

requirements-completed: [FEAT-04, CONTENT-03, CONTENT-04, SEO-09]

duration: ca. 50 min
completed: 2026-10-23
---

# Phase 9 Plan 10: Rollout Summary

**Phase 9 ist live auf craftos.eu (Code-Push `25bad34`, Vercel `dpl_HxdXfEzGz7jUw8rcdQFFj2Pvvu7F` READY). Vorher wurde die Produktbasis auf Web test.248 angehoben, und die Offline-Aussagen nennen jetzt positiv, was die App ohne Empfang erfasst. Prüfungen: live-check 69/69 OK lokal und live, Abdeckungstabelle 34/34 live, IndexNow 156 URLs mit HTTP 200, SE Ranking 0 Units bei sechs ergänzten Hauptkeywords, Messbericht rollout-phase09 einmal erzeugt.**

## Performance

- **Duration:** ca. 50 min
- **Started:** 2026-10-23T06:55Z
- **Completed:** 2026-10-23T07:45Z
- **Tasks:** 2 von 2 plus zwei Vorab-Aufträge (Produktabgleich, positive Offline-Formulierung)
- **Files modified:** 22 (davon 10 neue Berichtsdateien)

## Accomplishments

- **Produktabgleich (Auftrag):** Web `origin/release` stand bei der Ausführung schon auf `1f704236` (v4.0.0-test.248, ein Commit nach dem genannten `c5b5135`/test.247). Das Delta `a0e27c42..1f704236` umfasst vier Commits, die nur Fehler beheben (Status „Fertiggestellt“ im Editorkopf und in der Dokumentansicht, Nachladen der Dokumentliste); `src/lib` und `supabase` sind unverändert. Preise, Credits und Testphase sind identisch, keine der 43 Belegdateien hat sich geändert. Ausgeführt: `npm run sync:product`; `productBasis.web`, Quell-Snapshot und `PRODUCT-REGISTER.md` sind angehoben. Mobile ist unverändert (test.96). Für Phase 10 gibt es keine neue Live-Funktion mit Website-Bezug; optional kann „Fertiggestellt“ in die Mini-UI-Status aufgenommen werden.
- **Positiv formulieren (Auftrag):** Die Startseiten-FAQ, die `/app`-Kennzahl, -Note und -FAQ, die FAQ auf `/funktionen/zeiterfassung` (dritte Fundstelle, zusätzlich gefunden) und `llms.txt` zählen auf, was offline erfasst und danach übertragen wird. Die Frist „bis zu 24 Stunden“ stammt aus ME-02. Quelle ist `mobileOffline.erfassung` mit fünf Hook-Belegen am Mobile-Release; `/fakten-ueber-craftos` nutzt dieselbe Quelle.
- **Aufgabe 1:** live-check um sieben Phase-9-Prüfungen erweitert. `lastmod` war bereits richtig: `GEWERKE_STAND` steht auf 2026-10-23, `/blog` und `/hilfe` leiten ihr Datum aus `updatedAt` ab (LO-08). Volle lokale Suite unter Sperre grün.
- **Aufgabe 2:** ship-gate über den Gesamtdiff, Fast-Forward-Push, Vercel READY, live-check gegen craftos.eu, IndexNow, SE-Ranking-Blöcke A–C, Rollout-Nachweis, Traceability.

## Task Commits

1. `60e7eab` chore(09-10): Produktbasis auf Web v4.0.0-test.248 (1f704236) angehoben
2. `a31c1a8` test(09-10): Offline-Aussagen positiv aufzählen statt „Teilweise“ (RED)
3. `47b3483` feat(09-10): Offline positiv – Aufzählung dessen, was die App ohne Empfang erfasst
4. `3202cb4` fix(09-10): /app-Offline-FAQ im Antwortbudget (300 Zeichen)
5. `25bad34` feat(09-10): Phasen-Gate – live-check um Phase-9-Prüfungen erweitert (Aufgabe 1, Code-Push)
6. Doku-Commit (dieses SUMMARY, Rollout-Nachweis, Berichte, STATE, ROADMAP, REQUIREMENTS): siehe Abschluss

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| Koordinationsstatus (07:08 UTC) | edgar belegt (Runner 1.9.9), edgarspc offline; kein Website-Rezept (Lücke) → lokal unter `.heavy-lock` |
| `npm test` | 45 Dateien, 1347/1347 |
| Lint, Typcheck | grün |
| `sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.248 (1f704236).“ |
| `check-no-secrets` (app components lib tests scripts docs ../.planning) | OK |
| Build | grün |
| `seo-audit.mjs` (`MSYS_NO_PATHCONV=1`) | 156/156 URLs, 12 Regeln, 0 Verstöße |
| `npm run test:e2e` (voll, Port 3100) | 393 bestanden, 0 fehlgeschlagen, 0 flaky, 95 übersprungen (11,6 min) |
| `route-audit.mjs` | 156 Routen, 0 Fehler, 0 defekte Links (159 Links) |
| live-check lokal / live | 69/69 OK / 69/69 OK |
| Abdeckungstabelle lokal / live | 34/34 / 34/34 |
| IndexNow | 156 URLs, HTTP 200 (erwartet 136 + 20) |
| Sitemap live | 156 URLs, 124 mit lastmod 2026-10-23 |
| Port 3100 / `.heavy-lock` | nach jedem Fenster frei bzw. entfernt |

### `gh workflow list --all`

Vor dem Code-Push (09:08:47 und 09:25:14 MESZ):

```text
Dependabot Updates	active	227711329
```

Vor dem Doku-Push: siehe Abschnitt „Doku-Push“ unten.

### SE Ranking (Units je Block)

| Block | vorher | nachher | Verbrauch |
|---|---|---|---|
| A `se-ranking-sync.mjs --check` (fehlend 6) | 26.209 | 26.209 | 0 |
| B `--apply` ohne `--retarget` (hinzugefügt 6) + `--check` (fehlend 0, Projekt 157) | 26.209 | 26.209 | 0 |
| C `seo-report.mjs --etappe rollout-phase09` (einmal) | 26.209 | 26.209 | 0 |

Phasensumme durch Skripte: 750 (Recherche) + 0 + 0 = 750 ≤ 4.000. Kontostand seit 08-14 um 7.712 gesunken, ohne Skriptabruf der Phase (Annahme: automatische Tagesprüfung des Projekts; Inhaberaktion).

## Anforderungsstatus

- FEAT-04, CONTENT-03, CONTENT-04, SEO-09: Complete (REQUIREMENTS.md, Checkbox und Traceability; SEO-09-Text „Phase 8 (kommerzielle KI-Prompts), Phase 9 (Wissenslücken, Abschluss)“).
- DESIGN-02: In Progress, „Phase 5 (Grundlage), Phasen 6–9 (Umsetzung), Rest Phase 10 (Rechner, Support, Rechtsseiten, 404)“. ROADMAP: Phase-9-Kriterium 6 „(DESIGN-02 für diese Vorlagen; Rest Phase 10)“, Phase 10 führt „DESIGN-02 (Rest: Rechner, Support, Rechtsseiten, 404)“.
- `gsd-tools requirements.mark-complete FEAT-04 CONTENT-03 CONTENT-04 SEO-09` setzte die Checkboxen und drei Tabellenzeilen. Die Tabellenzeile von SEO-09 blieb „In Progress“ und wurde von Hand auf Complete gesetzt. Sonst wurde nichts zusätzlich markiert.

## Auslegungen

Wie PHASE-09-ROLLOUT.md § 14: (a) Paketzuschnitt mit Zusatzplänen 09-11 bis 09-18 (B3, B4, W9, W10, W12; „09-05a/b“ = 09-05/09-17, „09-06a/b“ = 09-06/09-18) in 7 Wellen; (b) Leitlinie L-1 statt der Negativgrenzen aus D-11/D-20; (c) Kachel-Abweichungen von D-21 (Besichtigung auf aufmass, Projekt-Chat auf projektverwaltung und team, DATANORM auf angebote und gaeb); (d) Ermessen lib/leitlinie* in F-A1 und Prüfskript content-pruefen.mjs; (e) Übergangsregeln K-3 und Übergangslisten, in 09-09 zurückgenommen; (f) neutraler GAEB-Fachteil (Orchestrator-Entscheidung 1); zusätzlich (g) 84 statt 83 Artikel und 156 statt 155 URLs durch Kassenbuch (D-32), (h) live-check-Auslegung für `/gewerke` und Quellenliste, (i) Anhebung der eingefrorenen Produktbasis nach Delta-Prüfung.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Budget] /app-Offline-FAQ zu lang**
- **Found during:** Gate-Lauf 1 (Vitest-Dateifehler in `app-seite.test.ts`: `faq.answerCentral` 358 von 300)
- **Fix:** Satz zum Sync-Status gestrichen (steht im Offline-Ablauf); `3202cb4`
- **Hinweis:** Die gezielte Testauswertung nach 47b3483 wertete nur Assertions aus und übersah den Dateifehler; danach immer Dateistatus mitgeprüft.

**2. [Rule 1 – Prüfskript] Quellenliste auf `/blog/materialliste-vorlage`**
- **Found during:** live-check lokal (Gate-Lauf 2)
- **Issue:** Die neue Prüfung verlangte eine Quellenliste auch bei `sources: []`; 09-g.md belegt, dass dieser Artikel bewusst keine Rechtsquelle führt.
- **Fix:** Quellenliste nur bei Quellen im Frontmatter Pflicht, umgekehrt keine Liste ohne Quellen; `25bad34`

**3. [Rule 1 – Test] Steuerzeichen im Testregex**
- In `a31c1a8` stand durch die Ersetzung im Skript ein Backspace statt `\b` in zwei Regexen; in `47b3483` korrigiert.

**4. [Rule 2 – Inhaberregel] Dritte „Teilweise“-Antwort auf `/funktionen/zeiterfassung`**
- Nicht im Auftrag genannt, aber dieselbe Regel; positiv umformuliert und durch einen Test über alle Detailseiten-FAQs abgesichert (`47b3483`).

**5. [Rule 3 – Blocker] Tag test.248 lokal nicht vorhanden**
- `origin/release` stand auf einem Commit, dessen Tag lokal fehlte (der IN-04-Test verlangt einen echten Tag). Nur die Tags `v4.0.0-test.247` und `v4.0.0-test.248` gezielt geholt.

**Total deviations:** 5 (alle automatisch behoben). **Impact:** keine Regel abgeschwächt; die live-check-Anpassung bildet eine dokumentierte Inhaltsentscheidung ab.

## Doku-Push

ship-gate über den reinen Doku-Diff (Rollout-Nachweis, Messbericht mit sechs Rohdateien, drei Projektabgleich-Berichte, dieses SUMMARY, STATE, ROADMAP, REQUIREMENTS): `check-no-secrets.mjs docs ../.planning` „OK: Schlüssel in keiner Datei“, Prüfbefehl des Plans „ok“, live-check live 69/69. Kein Code geändert, daher keine erneuten Build- und Testläufe. Ausgabe von `gh workflow list --all` vor dem Doku-Push (23.10.2026, 09:45:23 MESZ):

```text
Dependabot Updates	active	227711329
```

Keine Datei unter `.github/`; `.planning/config.json` nicht gestaged.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-09-31: `check-no-secrets` vor dem Push und nach der Messung grün, Units-Skript nur im Scratchpad. T-09-32: `gh workflow list --all` vor jedem Push, keine `.github`-Dateien, ein Code-Push. T-09-33: volle lokale Suite, READY abgewartet, live-check live. T-09-34: DESIGN-02 offen, nur vier IDs. T-09-35: ein `--apply` ohne `--retarget`, ein Messbericht, 0 Units.

## Self-Check: PASSED

- FOUND: craftos/docs/releases/PHASE-09-ROLLOUT.md, craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase09.md, craftos/scripts/live-check.mjs
- FOUND: 60e7eab, a31c1a8, 47b3483, 3202cb4, 25bad34 (auf origin/main)
