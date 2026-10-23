---
phase: 10
slug: abschlussaudit
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-23
planned: 2026-10-23
---

# Phase 10 — Validierungsstrategie

> Validierungsvertrag dieser Phase für die Rückmeldung während der Ausführung. Quellen: 10-RESEARCH.md „Validation Architecture“, 10-UI-SPEC.md § 11 „Prüfkriterien“, 10-CONTEXT.md (D-04 bis D-39) und die Vorgaben des Orchestrators vom 23.10.2026 (Pakete, K-1 bis K-15, D-37 bis D-39). Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions und andere Cloud-Runner sind kein Beleg, es wird nie zum Testen gepusht. Schwere Läufe nur einzeln unter der gemeinsamen Sperre. Die Aufgaben-IDs der Aufgabenmatrix entsprechen den PLAN-Dateien 10-01 bis 10-12 (12 Pläne, 32 Aufgaben, 5 Wellen); `wave_0_complete` setzt der Orchestrator, sobald die Wave-0-Dateien entstanden sind.

---

## Testinfrastruktur

| Eigenschaft | Wert |
|-------------|------|
| **Framework** | Vitest ^5 im Node-Modus (`environment: 'node'`, Seiten per `renderToString`/`renderToStaticMarkup`, kein jsdom), Alias `@`; Playwright 1.63 mit `@axe-core/playwright` 4.13.0 (Chromium und WebKit); Lighthouse 13.5.0 als devDependency (neu, 10-02) über die Node-API mit Chrome aus Playwright; Post-Build-Audits `scripts/seo-audit.mjs`, `scripts/route-audit.mjs`, `scripts/visual-audit.mjs`, neues `scripts/a11y-audit.mjs` (10-01), `scripts/performance-audit.mjs --lighthouse` (10-02), `scripts/live-check.mjs` |
| **Konfiguration** | `craftos/vitest.config.ts` (`tests/**/*.test.ts`); `craftos/tests/e2e/playwright.config.cjs` mit **explizitem `testMatch`** (Projekte `{chromium,webkit}-1440` und `-390-touch`); `logo-schriftzug.pw.cjs` trägt 10-09 ein, `a11y.pw.cjs` trägt 10-06 ein (bis dahin Scratchpad-Konfiguration in 10-08, K-9); Basis-URL über `CRAFTOS_BASE_URL`, Skripte über `AUDIT_ORIGIN`/`LIVE_ORIGIN` |
| **Schnelllauf (ohne Sperre)** | `cd craftos && npx vitest run <betroffene tests/*.test.ts> && npm run typecheck && npm run lint` |
| **Volllauf (unter Sperre)** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run sync:product:check && node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning && npm run build && node scripts/seo-audit.mjs`; Port prüfen, `next start -p <port>`, `npm run test:e2e`, `route-audit.mjs`, `visual-audit.mjs`, `live-check.mjs`; `a11y-audit.mjs --shard=k/4` (k = 1..4) + `--engines=webkit` + `--merge` mit Sperrfreigabe zwischen den Teilen; `performance-audit.mjs --lighthouse --block=<name>` allein je Block; danach `kill $SRV` und Port per netstat prüfen |
| **Geschätzte Laufzeit** | Schnelllauf 30–60 s; Paketende (Build + paketeigene schwere Prüfung) 8–15 min; A11y-Matrix 25–35 min in fünf Teilen; Lighthouse-Endmessung 30–45 min in drei Blöcken; Volllauf mit E2E 20–30 min |

---

## Abtastrate

- **Nach jedem Aufgaben-Commit:** Schnelllauf mit den im `<verify>` genannten Vitest-Dateien, dazu Lint und Typcheck (ohne Sperre).
- **Am Paketende (einmal je Spur):** unter Sperre Build und die paketeigene schwere Prüfung – (a) Funktionsprobe und volle Matrix auf dem Spurstand (10-01, 10-08), (b) Lighthouse-Messschleife allein und Snippet-CLS (10-02, 10-09), (c) `seo-audit.mjs --paths=<eigene Pfade>`, visual-audit und `browser-functional`/`navigation` (10-03, 10-10), (d) `home-navigation.pw.cjs`, `funktionsdetails.pw.cjs` und seo-audit (10-04), (e) seo-audit sitewide und route-audit (10-05).
- **Nach Welle 1+2 (Orchestrator nach dem Merge in der Reihenfolge e → d → c → a → b, K-4):** volle Vitest-Suite und Build unter Sperre.
- **Integration 10-06 und Phasen-Gate 10-12:** Übergaben, live-check-Block Phase 10, dann alle Suiten aus D-14, volle A11y-Matrix, Lighthouse-Endmessung.
- **Vor `/gsd-verify-work` und vor dem Rollout 10-07:** Volllauf grün, `npm run sync:product:check`, `node scripts/check-no-secrets.mjs`, Code-Review-Gate des Orchestrators (10-REVIEW.md), Screenshots nur im Sitzungs-Scratchpad.
- **Maximale Rückmeldelatenz:** 60 s (Schnelllauf).

---

## Sperre, Ports und Worktrees (`.planning/EXECUTOR-RULES.md`, D-32 bis D-34)

- **Schwer und nur unter Sperre:** Build, `next start`, Playwright-E2E, volle Vitest-Suite, `tests/content.test.ts`, `a11y-audit.mjs` (je Teil), `visual-audit.mjs`, `performance-audit.mjs` (Lighthouse immer allein), `npm ci`, `npm install`. **Ohne Sperre:** gezielte Vitest-Dateien, Lint, Typcheck, Prüfskripte ohne Server.
- **Vorher:** `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status` (kein Website-Rezept → lokal, einzeln; Lücke benennen).
- **Sperre:** `until mkdir C:/Projekte/Websitenerstellung/.heavy-lock 2>/dev/null; do sleep 20; done; echo "<plan> $(date -u +%FT%TZ)" > …/owner`; sofort danach `rm -rf …/.heavy-lock`; nie eine fremde Sperre löschen (älter als 90 min → Orchestrator).
- **Worktrees und Ports:** wt-10a 3101 (10-01 → 10-08), wt-10b 3102 (10-02 → 10-09), wt-10c 3103 (10-03 → 10-10), wt-10d 3104 (10-04), wt-10e 3105 (10-05 → 10-11); Haupt-Arbeitsbaum 3100 (10-06, 10-12, 10-07).
- **E2E-Flakes:** zeitabhängige WebKit-Fälle, die einzeln bestehen, gelten nur bis 10-02 als bekannte Flakes; danach sind `function-illustrations.pw.cjs` Tab-Sichtbarkeit und Pause deterministisch. Höchstens ein voller Lauf plus Einzelwiederholung.
- **SE Ranking:** nur Paket (e) und Rollout; Phase-10-Budget 5.000 Units (526 verbraucht), Leaderboard nur mit `--leaderboard` (Rollout ohne), Kontostand vor/nach jedem Block mit Wartezeit.

---

## Anforderung → Testzuordnung

| Anf.-ID | Verhalten | Testart | Automatisierter Befehl | Datei vorhanden |
|---------|-----------|---------|------------------------|-----------------|
| DESIGN-05 | Gate-Logik (serious/critical, `color-contrast`, `target-size`, Großtext 4,5 : 1), Shard-Teilung, Merge, Fokus am Vorfahren, Tastaturfehler | unit | `npx vitest run tests/a11y-audit-core.test.ts` | ❌ W0 (10-01-T1) |
| DESIGN-05 | 158 Seiten × 5 Breiten Chromium, 20 WebKit-Vorlagen × 5 Breiten, Animationszustand ≥ 22 Snippet-Seiten | Skript (schwer) | `node scripts/a11y-audit.mjs --shard=k/4` (k = 1..4), `--engines=webkit`, `--merge` | ❌ W0 (10-01-T2; Baseline 10-08-T3; Gate 10-12-T2) |
| DESIGN-05 | Tastatur: Sprunglink, Menü/Drawer Enter/Esc/Rückfokus, FAQ, Rechner, Suche, Pause, Tabellen-Scroll, 404, Styleguide-Bild, WebKit 360 ohne Querscroll | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs a11y.pw.cjs` | ❌ W0 (10-08-T2; `testMatch` 10-06-T1) |
| DESIGN-05 | FeatureSnippet-Dimmstufe ≥ 4,5 : 1 in Zwischenständen | Skript | `node scripts/a11y-audit.mjs --paths=<Snippet-Seiten> --engines=chromium --animation=an` + `--merge` | ✅ nach 10-01 (10-08-T1) |
| DESIGN-05 / DESIGN-02 | axe bei fünf Breiten in `visual-audit.mjs`, ergänzte Routen, 404 erwartet | Skript | `node scripts/visual-audit.mjs` | ✅ umstellen (10-01-T2) |
| QA-04 | Median je Kennzahl, Gate Score ≥ 95 / LCP < 2.500 ms, Accessibility 100, Zusammenfassung | unit | `npx vitest run tests/lighthouse-core.test.ts` | ❌ W0 (10-02-T1) |
| QA-04 | Lighthouse mobil lokal, 3 Läufe, Gate-Seiten je Vorlage, Info-Seiten | Skript (schwer, allein) | `node scripts/performance-audit.mjs --lighthouse --block=<name> --paths=… --runs=3 --kategorien=…` | ❌ Modus neu (10-02-T1; Messschleife 10-09; Endmessung 10-12-T2) |
| QA-04 | CLS ohne reduzierte Bewegung auf den acht Snippet-Detailseiten | Skript | `node scripts/performance-audit.mjs` | ✅ erweitern (10-02-T1) |
| QA-04 | Logo-Schriftzug gleich (Screenshot), drei Schrift-Preloads, keine Anfragen an entfallene Schnitte | e2e + unit | `npx playwright test -c tests/e2e/playwright.config.cjs logo-schriftzug.pw.cjs`; `npx vitest run tests/craftos-logo.test.ts` | ❌ W0 (10-09-T2) |
| QA-04 | Flakes deterministisch, Release-Helfer, Wortgrenze, Parität beworbener Extras (K-1) | unit + e2e | `npx vitest run tests/pricing-parity.test.ts tests/product-register.test.ts`; `function-illustrations.pw.cjs --repeat-each=5` (WebKit) | ✅ ändern (10-02-T2) |
| QA-04 | Alle Suiten aus D-14 grün auf dem integrierten Stand | gate | Volllauf (siehe Testinfrastruktur) | ✅ (10-12-T1) |
| DESIGN-02 | Rechtstexte wörtlich (Blockfolge mit `href`, Referenz vor der Änderung, keine Snapshot-API) | unit | `npx vitest run tests/rechtstexte-wortlaut.test.ts` | ❌ W0 (10-03-T1, erster Commit) |
| DESIGN-02 | Phase-9-Köpfe Byte für Byte unverändert | unit | `npx vitest run tests/contentkopf-unveraendert.test.ts` | ❌ W0 (10-03-T1) |
| DESIGN-02 | Rechner, Support, Rechtsseiten, 404 auf `ContentKopf`/v2-Abschnitten, Brotkrumen, H1 = Map, keine Altklassen | unit | `npx vitest run tests/kernseiten.test.ts tests/breadcrumbs.test.ts` | ✅ erweitern (10-03-T2/T3, 10-10-T1) |
| DESIGN-02 | Rechner-Logik, Felder, Labels unverändert | unit + e2e | `npx vitest run tests/calculators.test.ts tests/calculator-hydration.test.ts`; `browser-functional.pw.cjs`, `navigation.pw.cjs` | ✅ (10-10-T1/T3) |
| DESIGN-02 | Gewichte nur 400/600, keine `text-primary-600`/`text-ink-400`, `crumbs={null}` nur 404 | unit | `npx vitest run tests/phase10-darstellung.test.ts` | ❌ W0 (10-10-T3; Logo in den Geltungsbereich 10-06-T1) |
| DESIGN-02 | Bento-Bodenausrichtung (B10), Caption bei 360 px, Silbentrennung `/preise` | Skript + e2e | B10-Scratchpad-Skript → `test-results/bento-b10/`; `design-v2.pw.cjs` (Caption-Fall) | ❌ W0 (10-10-T2; Caption-Fall 10-06-T1) |
| D-21 | 10 beworbene Extras, 32 Einträge, Kacheln mit `zusatz`, Mega-Menü unverändert | unit + e2e | `npx vitest run tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts tests/funktionsdetails.test.ts`; `home-navigation.pw.cjs` | ✅ ändern (10-04-T1) |
| D-22 | Lagerfoto-Credits = `aiPricing.ts` am Release mit Stichtag, angezeigt auf `/craft-ai` und im Hilfeartikel | unit | `RELEASE_PFLICHT=1 npx vitest run tests/credit-paritaet.test.ts` | ❌ W0 (10-04-T2) |
| D-23 / D-24 | keine Datei unter `app/` importiert die Demo; doppelter Slug wirft | unit | `npx vitest run tests/demo.test.ts tests/funktionsdetails.test.ts` | ✅ erweitern (10-04-T3) |
| QA-06 / D-37 | Leaderboard nur mit Schalter, Kostenwarnung, verzögerter Kontostand | unit | `npx vitest run tests/seo-report-core.test.ts` | ❌ W0 (10-05-T1) |
| QA-06 | Vorab- und Bestätigungsaudit mit Pflichtabschnitten, Fehlerdefinition, Waivern, Zähler geänderter Sätze 0 | Doku + script | Node-Pflichtbegriffprüfung von `audit-report.md`; `seo-audit.mjs` sitewide 0; `route-audit.mjs` 0/0 | ❌ (10-05-T3, 10-07-T2) |
| QA-06 | SE-Ranking-Audit-Recheck 0 Fehler, Warnungen nur gewaivt | script (SE Ranking) | Recheck 485185 → Rohdaten `docs/seo/data/*-audit-recheck-phase10.json` | ❌ (10-07-T2) |
| QA-05 | Etappenzeilen 05–10 vollständig (Commit, Push, Ship-Gate, Workflows, Deployment, IndexNow, live-check, Etappenbericht, Analytics) | unit | `npx vitest run tests/etappen-nachweis.test.ts` | ❌ W0 (10-11-T2; Zeile 10 in 10-07-T3) |
| QA-05 | live-check Phase 10 (Köpfe, 404, Zusatzkarten, Credits, Schriften, Analytics-Verdrahtung) | script | `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs`; live gegen https://craftos.eu | ✅ erweitern (10-06-T2; live 10-07-T1) |
| SEO-08 | Register/Prompts konsistent, „live“ nur mit datiertem Beleg, Übergabe 2 | unit | `npx vitest run tests/backlink-plan.test.ts` | ✅ erweitern (10-11-T1) |

---

## Aufgabenmatrix

Bedrohungs-IDs aus den `<threat_model>`-Abschnitten der Pläne. Alle Befehle aus `craftos/` des jeweiligen Arbeitsbaums.

| Aufgaben-ID | Plan / Spur / Port | Welle | Anforderung | Bedrohung | Sicheres Verhalten | Testart | Automatisierter Befehl (Kurzform) | Datei vorhanden | Status |
|---|---|---|---|---|---|---|---|---|---|
| 10-01-T1 | 01 (a) Werkzeug / a / 3101 | 1 | DESIGN-05 | T-10-01 | Startgate; Gate-Regeln rein und getestet | unit (TDD) | `npx vitest run tests/a11y-audit-core.test.ts` + Typcheck, Lint | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-01-T2 | 01 (a) Werkzeug / a / 3101 | 1 | DESIGN-05 | T-10-01, T-10-02, T-10-03 | `.options()` vor `.withTags()`; externe Anfragen gesperrt; 404 erwartet | script + build | Exit 2 bei Optionsfehler; Sperre: Build, Server 3101, drei Funktionsproben (Exit 0 / 1 / 0) | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-02-T1 | 02 (b) Lighthouse / b / 3102 | 1 | QA-04 | T-10-SC, T-10-07 | exakte Version, `npm ls axe-core` 4.13.0; Kennzeichnung je Wert | unit (TDD) + script | `npx vitest run tests/lighthouse-core.test.ts`; Sperre: Build, Server 3102, Lighthouse-Probe `/` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-02-T2 | 02 (b) Prüfsuite / b / 3102 | 1 | QA-04 | T-10-06 | keine stillen Skips, keine festen Pausen | unit (TDD) + e2e | `npx vitest run tests/pricing-parity.test.ts tests/product-register.test.ts`; Sperre: `function-illustrations.pw.cjs` voll + WebKit `--repeat-each=5` | ✅ ändern | ⬜ offen |
| 10-03-T1 | 03 (c) Schutztests / c / 3103 | 1 | DESIGN-02 | T-10-11, T-10-12 | erster Commit nur Wortlaut-Schutz; Referenzen vom unveränderten Stand | unit (TDD) | `npx vitest run tests/rechtstexte-wortlaut.test.ts tests/contentkopf-unveraendert.test.ts` + Dateiliste des ersten Commits | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-03-T2 | 03 (c) Kopf, Recht, 404 / c / 3103 | 1 | DESIGN-02, DESIGN-05 | T-10-11, T-10-12 | Wortlaut unverändert; Kontrast ≥ 4,5 : 1 | unit (TDD) | `npx vitest run tests/rechtstexte-wortlaut.test.ts tests/contentkopf-unveraendert.test.ts tests/kernseiten.test.ts tests/design-v2-components.test.ts tests/content-vorlage.test.ts tests/breadcrumbs.test.ts` + Greps | ✅ erweitern | ⬜ offen |
| 10-03-T3 | 03 (c) Support / c / 3103 | 1 | DESIGN-02 | T-10-13 | `mailto` nur aus `site.email` | unit (TDD) + build | Vitest wie T2; Sperre: Build, `seo-audit.mjs --paths=…`, visual-audit, 404-Probe | ✅ erweitern | ⬜ offen |
| 10-04-T1 | 04 (d) Zusatzkarten / d / 3104 | 1 | DESIGN-02 | T-10-16 | Lizenz im Satz, L-1, Preis-Scan grün, Menü unverändert | unit (TDD) | `npx vitest run tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts tests/funktionsdetails.test.ts tests/llms.test.ts tests/pricing-parity.test.ts tests/content-produktwahrheit.test.ts tests/announcements.test.ts` + Diff-Prüfung | ✅ ändern | ⬜ offen |
| 10-04-T2 | 04 (d) Credits / d / 3104 | 1 | QA-04 | T-10-17 | Wert nur aus `aiPricing.ts`, Pflichtmodus | unit (TDD) | `npx vitest run tests/credit-paritaet.test.ts …`; Sperre: `RELEASE_PFLICHT=1` + `content.test.ts` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-04-T3 | 04 (d) Schutztests / d / 3104 | 1 | DESIGN-02, QA-04 | T-10-18, T-10-19 | keine Demo unter `app/`; nichts gelöscht | unit (TDD) + build + e2e | `npx vitest run tests/funktionsdetails.test.ts tests/demo.test.ts`; Sperre: Suite, Build, seo-audit, `home-navigation`/`funktionsdetails` auf 3104 | ✅ erweitern | ⬜ offen |
| 10-05-T1 | 05 (e) Messbericht / e / 3105 | 1 | QA-06 | T-10-21 | Leaderboard nur mit Schalter und Warnung | unit (TDD) | `npx vitest run tests/seo-report-core.test.ts tests/se-ranking-sync.test.ts` + `check-no-secrets` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-05-T2 | 05 (e) KI-Tracker / e / 3105 | 1 | SEO-08, QA-06 | T-10-20, T-10-21, T-10-22 | 0 Units, nichts gelöscht, Schlüssel nie ausgegeben | script (SE Ranking) | Rohdateien vorhanden, Kontostand vorher/nachher; `check-no-secrets` | ❌ (in der Aufgabe) | ⬜ offen |
| 10-05-T3 | 05 (e) Vorab-Audit / e / 3105 | 1 | QA-06 | T-10-23 | Quelle je Zahl, Waiver mit Beleg, Zähler 0 | doc + unit + build | Pflichtbegriffe `audit-report.md`; `keyword-map.test.ts`; Sperre: Build, seo-audit sitewide, route-audit | ❌ (in der Aufgabe) | ⬜ offen |
| 10-08-T1 | 08 (a) Dimmstufe / a / 3101 | 2 | DESIGN-05 | T-10-05 | Farbton statt Deckkraft | script + build | Sperre: Build, Server 3101, `a11y-audit.mjs --animation=an` über die Snippet-Seiten + `--merge` | ✅ | ⬜ offen |
| 10-08-T2 | 08 (a) E2E-Spec / a / 3101 | 2 | DESIGN-05 | T-10-04 | keine festen Pausen, Fremdbefunde benannt | e2e (TDD) | Sperre: `npx playwright test -c <Scratchpad-Konfiguration>` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-08-T3 | 08 (a) Baseline / a / 3101 | 2 | DESIGN-05 | T-10-03, T-10-04 | Shards mit Sperrfreigabe; außerhalb der Rechtsseiten 0 Gate-Verstöße | script (schwer) | fünf Teile + `--merge` + Auswertung je Seite | ✅ | ⬜ offen |
| 10-09-T1 | 09 (b) Ausgangsmessung / b / 3102 | 2 | QA-04 | T-10-07, T-10-08 | Lizenz belegt; Messung allein | unit + script | `npx vitest run tests/lighthouse-core.test.ts` + `GATE_ROUTEN`-Prüfung + Blockdateien | ✅ | ⬜ offen |
| 10-09-T2 | 09 (b) Logo-SVG / b / 3102 | 2 | QA-04 | T-10-09, T-10-SC | Referenz vor der Änderung, keine Repo-Abhängigkeit | unit (TDD) + e2e | `npx vitest run tests/craftos-logo.test.ts`; Sperre: `logo-schriftzug.pw.cjs` ohne `--update-snapshots` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-09-T3 | 09 (b) Messschleife / b / 3102 | 2 | QA-04 | T-10-07, T-10-10 | offene Abweichung statt Schönung; Header unverändert | script (schwer, allein) | Sperre: `--lighthouse --runs=3 --kategorien=accessibility`, Bestandsmodus | ✅ | ⬜ offen |
| 10-10-T1 | 10 (c) Rechner / c / 3103 | 2 | DESIGN-02 | T-10-14 | Rechner-Komponenten unverändert (Diff), keine Speicherung | unit (TDD) | `npx vitest run tests/kernseiten.test.ts tests/calculators.test.ts tests/calculator-hydration.test.ts tests/breadcrumbs.test.ts tests/contentkopf-unveraendert.test.ts` + Diff | ✅ erweitern | ⬜ offen |
| 10-10-T2 | 10 (c) Bento, Caption / c / 3103 | 2 | DESIGN-02, DESIGN-05 | T-10-15 | B10 vorher/nachher, Caption-Semantik bleibt | unit + script + e2e | `npx vitest run tests/design-v2-frames.test.ts tests/preise-seite.test.ts tests/design-v2-components.test.ts`; Sperre: `funktionsdetails.pw.cjs`, `browser-functional.pw.cjs` | ✅ | ⬜ offen |
| 10-10-T3 | 10 (c) Darstellungstest, Paketende / c / 3103 | 2 | DESIGN-02 | T-10-04 | Gewichte/Farben dauerhaft geprüft | unit (TDD) + build + e2e | `npx vitest run tests/phase10-darstellung.test.ts`; Sperre: Suite, Build, seo-audit 7 Pfade, E2E-Auswahl, visual-audit | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-11-T1 | 11 (e) Linkregister / e / 3105 | 2 | SEO-08 | T-10-24, T-10-25 | Prompts mit Regeln aus § 2; „live“ nur mit Beleg | unit (TDD) | `npx vitest run tests/backlink-plan.test.ts` + Registerprüfung + `check-no-secrets` | ✅ erweitern | ⬜ offen |
| 10-11-T2 | 11 (e) Etappennachweis / e / 3105 | 2 | QA-05 | T-10-25 | nur Quellen aus Rollout-Nachweisen, Lücken benannt | unit (TDD) + doc | `npx vitest run tests/etappen-nachweis.test.ts` + Pflichtbegriffe | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 10-11-T3 | 11 (e) Abschlussbericht / e / 3105 | 2 | QA-06, SEO-08 | T-10-20 | keine Tarifempfehlung, Quelle je Zahl | doc + unit | gezielte Tests + Pflichtbegriffe `MEILENSTEIN-V2-ABSCHLUSS.md` + `check-no-secrets` | ✅ | ⬜ offen |
| 10-06-T1 | 06 Integration / main / 3100 | 3 | DESIGN-02, DESIGN-05, QA-06 | T-10-26, T-10-28 | Übergaben mit Status; Kopierregel bei Audit-Behebungen | unit (TDD) + e2e | `npx vitest run tests/design-v2-budgets.test.ts tests/phase10-darstellung.test.ts …`; Sperre: Build, `a11y.pw.cjs`, `design-v2.pw.cjs` | ✅ | ⬜ offen |
| 10-06-T2 | 06 Integration / main / 3100 | 3 | DESIGN-02, QA-04 | T-10-27 | Release-Delta nur nach Prüfung | unit + script | `sync:product:check`, D-31-Tabellenprüfung; Sperre: Build, live-check lokal | ✅ erweitern (`live-check.mjs`) | ⬜ offen |
| 10-12-T1 | 12 Phasen-Gate / main / 3100 | 4 | DESIGN-02, QA-04 | T-10-29, T-10-03 | Volllauf grün, Lint nach E2E | gate + e2e | Sperre: Vollsuite, Build, seo-audit, `test:e2e`, route-audit, visual-audit, live-check | ✅ | ⬜ offen |
| 10-12-T2 | 12 Phasen-Gate / main / 3100 | 4 | DESIGN-05, QA-04 | T-10-30, T-10-07 | Matrix-Gate 0; Lighthouse allein, Abweichung dokumentiert | script (schwer) | A11y fünf Teile + Merge; Lighthouse B1–B3; Bestandsmodus | ✅ | ⬜ offen |
| 10-07-T1 | 07 Rollout / main / 3100 | 5 | DESIGN-02, DESIGN-05, QA-04, QA-05 | T-10-32, T-10-33 | `gh workflow list --all` vor jedem Push, READY, live-check vor IndexNow | gate + script (live) | `node scripts/live-check.mjs` gegen https://craftos.eu + Nachweisprüfung | ✅ | ⬜ offen |
| 10-07-T2 | 07 Rollout / main / 3100 | 5 | QA-06, SEO-08 | T-10-31, T-10-35 | kein Leaderboard, Units ≤ 5.000, keine Schlüssel | script (live) | Messbericht ohne Leaderboard, Recheck-Rohdaten, Bestätigungsaudit, `check-no-secrets`, `backlink-plan.test.ts` | ✅ | ⬜ offen |
| 10-07-T3 | 07 Rollout / main / 3100 | 5 | DESIGN-02, DESIGN-05, QA-04, QA-05, QA-06, SEO-08 | T-10-34 | Complete nur mit Nachweis je ID | unit + doc | `npx vitest run tests/etappen-nachweis.test.ts tests/backlink-plan.test.ts` + Pflichtbegriffe + HEAD = origin/main | ✅ | ⬜ offen |

*Status: ⬜ offen · ✅ grün · ❌ rot · ⚠️ wackelig*

Abtastkontinuität: Jede der 32 Aufgaben hat einen automatisierten Verify-Befehl; keine drei aufeinanderfolgenden Aufgaben ohne automatisierte Prüfung. Wave-0-Dateien entstehen in der Aufgabe, die sie prüft (TDD). Requirements werden nur in 10-07 markiert, jeweils nur mit erfülltem Nachweis (D-36).

---

## Wave-0-Anforderungen (Lücken)

- [ ] `craftos/scripts/lib/a11y-audit-core.mjs` + `craftos/tests/a11y-audit-core.test.ts` — 10-01-T1
- [ ] `craftos/scripts/a11y-audit.mjs` — 10-01-T2
- [ ] `lighthouse@13.5.0` (devDependency, exakt) + `craftos/scripts/lib/lighthouse-core.mjs` + `craftos/tests/lighthouse-core.test.ts` — 10-02-T1
- [ ] `craftos/tests/rechtstexte-wortlaut.test.ts` + `tests/fixtures/rechtstexte/*.txt` **vor** jeder Änderung an den Rechtsseiten — 10-03-T1
- [ ] `craftos/tests/contentkopf-unveraendert.test.ts` + `tests/fixtures/contentkopf/` **vor** der ersten Kopfänderung — 10-03-T1
- [ ] `craftos/tests/credit-paritaet.test.ts` — 10-04-T2
- [ ] `craftos/scripts/lib/seo-report-core.mjs` + `craftos/tests/seo-report-core.test.ts` — 10-05-T1
- [ ] `craftos/tests/e2e/a11y.pw.cjs` — 10-08-T2 (`testMatch` in 10-06-T1)
- [ ] `craftos/tests/e2e/logo-schriftzug.pw.cjs` + Referenzen (eigener Commit vor der Änderung) + `craftos/tests/craftos-logo.test.ts` — 10-09-T2
- [ ] `craftos/tests/phase10-darstellung.test.ts` — 10-10-T3
- [ ] `craftos/tests/etappen-nachweis.test.ts` — 10-11-T2
- [ ] Anpassungen im Bestand: `visual-audit.mjs` (10-01-T2), `performance-audit.mjs` (10-02-T1), `function-illustrations.pw.cjs`, `pricing-parity.test.ts`, `product-register.test.ts` (10-02-T2), `kernseiten.test.ts`, `breadcrumbs.test.ts` (10-03, 10-10), Zähltests D-21 und `demo.test.ts` (10-04), `backlink-plan.test.ts` (10-11-T1), `design-v2.pw.cjs`, `design-v2-budgets.test.ts`, `live-check.mjs` (10-06)

---

## Manuelle Prüfungen

| Verhalten | Anforderung | Warum manuell | Prüfanleitung |
|-----------|-------------|---------------|---------------|
| Aktiver Schritt der FeatureSnippets bleibt nach der Dimmstufe klar erkennbar | DESIGN-05 | Wahrnehmungsurteil | Screenshots `/funktionen/lager` und `/funktionen/aufmass` bei 390/1440 in mehreren Phasen (10-08-T1) |
| `incomplete`-Kontrastknoten (Text auf Verläufen, Bildern, Pseudo-Elementen) | DESIGN-05 | axe meldet sie nicht als Verstoß | Liste aus `test-results/a11y/report.json` sichten, Befund in `PHASE-10-PRUEFUNGEN.md` § 5.2 (10-12-T2) |
| Logo-Schriftzug wirkt gleich wie vorher | QA-04 | Feinheiten jenseits der Pixeltoleranz | Vorher/Nachher-Ausschnitte im Scratchpad ansehen (10-09-T2) |
| Gesamteindruck Rechner, Support, Rechtsseiten, 404 bei 360–1440 px | DESIGN-02 | ästhetisches Urteil | Screenshots aus 10-03, 10-10, 10-12 im Sitzungs-Scratchpad; endgültig Inhaber |
| Schriftlizenz erlaubt Umwandlung bzw. Subsetting | QA-04 | Rechtsauslegung eines Lizenztexts | Lizenztext an der Quelle mit URL und Datum im SUMMARY 10-09; Inhaber kann widersprechen |
| Browser-Prompts der Übergabe 2 sind sachlich richtig | SEO-08 | Inhalt Dritter | Fakten gegen `llms.txt` und Impressum (10-11-T1); Ausführung nur durch den Inhaber |
| Analytics-Fenster je Etappe (24 h) | QA-05 | Vercel-MCP liegt beim Orchestrator | Abfrage mit Zeitpunkt in `ETAPPEN-NACHWEIS-V2.md`; Phase-10-Fenster als Nachtrag |
| Silbentrennung in echtem Safari | DESIGN-02 | WebKit ohne Wörterbuch weicht ab | Stichprobe durch den Inhaber (D-31 Nr. 21) |

---

## Validierungsfreigabe

- [x] Alle Aufgaben haben einen `<automated>`-Verify oder Wave-0-Abhängigkeiten (32 Aufgaben in 12 Plänen)
- [x] Abtastkontinuität: keine drei aufeinanderfolgenden Aufgaben ohne automatisierten Verify
- [x] Wave 0 deckt alle fehlenden Referenzen ab
- [x] Keine Watch-Mode-Flags (`vitest run`, Playwright ohne `--ui`)
- [x] Rückmeldelatenz < 60 s
- [x] `nyquist_compliant: true` im Frontmatter gesetzt

**Freigabe:** geplant 2026-10-23
