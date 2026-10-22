---
phase: 9
slug: gewerke-und-wissensinhalte
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-22
planned: 2026-10-22
revised: 2026-10-22
---

# Phase 9 — Validierungsstrategie

> Validierungsvertrag dieser Phase für die Rückmeldung während der Ausführung. Quellen: 09-RESEARCH.md „Validation Architecture“, 09-UI-SPEC.md § 8 „Prüfkriterien für Tests und seo-audit“, 09-CONTEXT.md (D-04, D-24, D-26 bis D-30) und die Checker-Entscheidungen des Orchestrators vom 22.10.2026 (B1–B4, W1–W13). Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions und andere Cloud-Runner sind kein Beleg, es wird nie zum Testen gepusht. Schwere Läufe nur einzeln unter der gemeinsamen Sperre. Die Aufgaben-IDs der Aufgabenmatrix entsprechen den PLAN-Dateien 09-01 bis 09-18 (18 Pläne, 40 Aufgaben, 7 Wellen); `wave_0_complete` setzt der Orchestrator, sobald die Wave-0-Dateien entstanden sind.

---

## Testinfrastruktur

| Eigenschaft | Wert |
|-------------|------|
| **Framework** | Vitest ^5 im Node-Modus (`environment: 'node'`, Komponenten per `renderToString` aus `react-dom/server` geprüft, kein jsdom), Alias `@` und `server-only` → `tests/server-only.ts`; Playwright ^1.63 mit `@axe-core/playwright` (Regeln `wcag2a`, `wcag2aa`, `wcag21aa`), Chromium und WebKit; Post-Build-Audits `scripts/seo-audit.mjs` und `scripts/route-audit.mjs`; Paket-Prüfwerkzeug `scripts/content-pruefen.mjs` (`--zitate`, `--l1` inkl. Altbegriffe, `--antwort`, `--ausnahmen`; aus 09-15) |
| **Konfiguration** | `craftos/vitest.config.ts` (`include: tests/**/*.test.ts`); `craftos/tests/e2e/playwright.config.cjs` mit **explizitem `testMatch`**; Basis-URL über `CRAFTOS_BASE_URL` (Worktrees setzen ihren Port). Phase 9 legt keine neue E2E-Datei an; neue Fälle kommen in `design-v2.pw.cjs` (09-16) und bleiben in `function-illustrations.pw.cjs` (09-02). |
| **Schnelllauf (ohne Sperre)** | `cd craftos && npx vitest run <betroffene tests/*.test.ts> && npm run typecheck && npm run lint`; Inhaltspakete zusätzlich `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate --l1 --antwort <eigene Dateien>` |
| **Volllauf (unter Sperre)** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build && node scripts/seo-audit.mjs [--paths=<eigene Pfade> \| --only=…] && AUDIT_ORIGIN=http://localhost:<port> node scripts/route-audit.mjs`; für E2E Port prüfen, Server starten, `CRAFTOS_BASE_URL=http://localhost:<port> npx playwright test -c tests/e2e/playwright.config.cjs <datei> [-g …]`, `kill $SRV`, danach per netstat prüfen, dass der Port frei ist (sonst nur die eigene PID beenden). Lock-Befehle stehen hinter `|| exit 1`, damit ein früher Fehlschlag nie in die Warteschleife führt. |
| **Geschätzte Laufzeit** | Schnelllauf ca. 30–60 s; Paketende (Build + Audit `--paths`) ca. 6–10 min; Volllauf mit E2E ca. 15–25 min |

---

## Abtastrate

- **Nach jedem Aufgaben-Commit:** Schnelllauf mit den im `<verify>` genannten Vitest-Dateien, dazu Lint und Typcheck (ohne Sperre, D-28); Inhaltspakete zusätzlich das Prüfwerkzeug über die eigenen Dateien.
- **Am Paketende (einmal je Plan, D-28):** unter Sperre Build und `node scripts/seo-audit.mjs --paths=<eigene Pfade>` mit 0 Verstößen; Gewerke (09-02, 09-11) zusätzlich `function-illustrations.pw.cjs -g Gewerke` auf Port 3102; 09-01 ohne pricing-parity (Produktbasis in 09-15).
- **Nach jeder Welle (Orchestrator nach dem Merge auf `main`):** volle Vitest-Suite und Build unter Sperre (nach Welle 1 ist pricing-parity erst mit 09-15 sicher grün, wenn origin/release nach 08-14 weitergelaufen ist).
- **Phasen-Gate 09-16 (Welle 6):** volle Vitest-Suite, Build, `seo-audit.mjs` sitewide **0**, `route-audit.mjs` **0/0**, E2E-Auswahl in 360/390/768/1024/1280/1440.
- **Vor `/gsd-verify-work` und vor dem Rollout 09-10:** Volllauf grün, `npm run sync:product:check`, `node scripts/check-no-secrets.mjs`, manuelle Durchsicht abgeschlossen, Screenshots nur im Sitzungs-Scratchpad.
- **Maximale Rückmeldelatenz:** 60 s (Schnelllauf).

---

## Sperre, Ports und Worktrees (`.planning/EXECUTOR-RULES.md`, D-26, D-28)

- **Schwer und nur unter Sperre:** Build, `next start`, Playwright-E2E, volle Vitest-Suite, Audits nach dem Build, visual/performance-audit, `npm ci`. **Ohne Sperre:** gezielte Vitest-Dateien, Lint, Typcheck, `content-pruefen.mjs`.
- **Vorher:** `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status` (kein Website-Rezept → lokal, einzeln).
- **Sperre:** `until mkdir C:/Projekte/Websitenerstellung/.heavy-lock 2>/dev/null; do sleep 20; done; echo "<plan> $(date -u +%FT%TZ)" > …/owner`; sofort danach `rm -rf …/.heavy-lock`; nie eine fremde Sperre löschen (älter als 90 min → Orchestrator).
- **Worktrees und Ports:** wt-09basis 3101 (09-01 → 09-15 → 09-12), wt-09a 3102 (09-02 → 09-11 → 09-13), wt-09b 3103 (09-03), wt-09c 3104 (09-04), wt-09d 3105 (09-05), wt-09d2 3109 (09-17), wt-09e 3106 (09-06), wt-09e2 3110 (09-18), wt-09f 3107 (09-07 → 09-14), wt-09g 3108 (09-08); Haupt-Arbeitsbaum 3100 (09-09, 09-16, 09-10).
- **Startgate (W7) in 09-01 und 09-02:** 08-14-SUMMARY.md und PHASE-08-ROLLOUT.md vorhanden, `git status --porcelain craftos` im Haupt-Arbeitsbaum leer, keine wt-08*-Worktrees, Port frei; sonst CHECKPOINT.
- **Synchronisationspunkte (W1, W2):** Der Orchestrator merged die Commits bis einschließlich „feat(09-01): F-A1 …“ und „feat(09-02): K-1 …“ vorgezogen. 09-01 Aufgabe 3 prüft K-1, 09-11 prüft beim Start F-A1 und vor dem Audit K-2 (`mitAntwortRegel`); fehlt etwas → CHECKPOINT, Fortsetzung im selben Worktree ab der genannten Aufgabe bzw. dem genannten Schritt.
- **E2E-Flakes:** zeitabhängige WebKit-Fälle, die einzeln bestehen, sind bekannte Flakes; höchstens ein voller Lauf plus Einzelwiederholung.

---

## Anforderung → Testzuordnung

| Anf.-ID | Verhalten | Testart | Automatisierter Befehl | Datei vorhanden |
|---------|-----------|---------|------------------------|-----------------|
| FEAT-04 | 12 Gewerke: Ablauf 4–5 (Titel ≤ 28, Text ≤ 80), `ablauf[].funktion` ∈ `funktionen`; 4–6 Funktionen mit ≥ 1 Phase-7-Slug; 3–4 FAQ, höchstens 1 gemeinsame Frage; `answer` ≤ 300, `teaser` ≤ 100; keine `heroTitle`/`heroIntro`/`hatVorlagen`; H1 = Map; `kopfwort` im H1; „zwölf“ = `gewerke.length`; `artikel`-Ziele existieren | unit | `npx vitest run tests/gewerke.test.ts` | ❌ W0 (09-11-T1; vorher Prüfungen beim Laden, 09-02-T2) |
| FEAT-04 | FeatureSnippet je Gewerk behält passende Projekte, 360–1440, reduzierte Bewegung, CLS 0 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs function-illustrations.pw.cjs -g Gewerke` | ✅ (09-02-T3, 09-11-T2) |
| FEAT-04 / SEO-09 | Prompt-Anker `/gewerke/elektriker#antwort`, `/gewerke/maler#antwort` ≤ 300 mit Gewerk, `phase: 9`; Prompt-Lücken als feste Liste (K-1) | unit + build | `npx vitest run tests/ai-prompts.test.ts`; `node scripts/seo-audit.mjs --only=prompts` | ✅ (K-1 09-02-T1; Anker 09-11-T2; K-2 09-01-T2) |
| FEAT-04 / DESIGN-02 | Gewerke-Seiten und Übersicht ohne Rasterbild in `<main>`, keine Vorlagen-Zusage (B1) | unit | `npx vitest run tests/media-ki-label.test.ts tests/gewerke.test.ts` | ✅ anpassen (09-02-T2, 09-11-T1) |
| CONTENT-03 | Map-Bezug statt fester Mengen; RSS = Ratgeberzahl; Endmengen 30/53 ab Integration | unit | `npx vitest run tests/content.test.ts` | ✅ umstellen (09-01-T2; Endwerte 09-09-T1) |
| CONTENT-03 | Frontmatter `answer`/`faq`/`scene`, `relatedFeatures` ≤ 3, `relatedArticles` ≤ 4 (B2), `sources` https + `checkedAt`; Prosa-Regeln (kein `<img`, kein `ol[start]`, Schritt ≤ 160, 2–10 je Liste, Überschrift ≤ 80, reservierte ids, FAQ-Frage nicht Überschrift) | unit | `npx vitest run tests/content.test.ts` | ❌ W0 (09-01-T2; Übergangsliste Datei + Regel bis 09-09) |
| CONTENT-03 | L-1-Wörter und Altbegriffe in 0 Dateien (content/, lib/gewerke.ts; ab 09-09 zusätzlich lib/funktionen.ts, lib/funktionsdetails/*.ts, lib/app-content.ts; `.ts` nur String-Literale über `scripts/lib/ts-literale.mjs`, W6); Ausnahmen abschließend | unit + script | `npx vitest run tests/content-produktwahrheit.test.ts`; `node scripts/content-pruefen.mjs --l1 <dateien>` | ❌ W0 (Wortliste 09-01-T1, Test 09-01-T2, Skript 09-15-T2; streng 09-09-T1) |
| CONTENT-03 | Prüfdateien 09-a, b, c, d, d2, e, e2, f, g nennen je Paketartikel genau einmal, mit „Übergabeliste“ | unit | `npx vitest run tests/content-pruefung.test.ts` | ❌ W0 (09-09-T1) |
| CONTENT-03 / CONTENT-04 | Bedienbegriffe in „…“ im eingefrorenen Release-Commit belegt | script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate <dateien>` | ❌ W0 (09-15-T2) |
| CONTENT-03 / SEO-09 | Antwort zuerst auf `/gewerke*`, `/blog/*`, `/hilfe/*` (`mitAntwortRegel`) | unit + build | `npx vitest run tests/seo-audit-core.test.ts`; `node scripts/seo-audit.mjs --only=antwort [--paths=…]` | ✅ umstellen (09-01-T2) |
| CONTENT-04 | Sekundärlinks bei kundenportal, mahnwesen, bankabgleich, datenuebernahme; Kachel-hrefs (angebote, aufmass, lager, projektverwaltung, team inkl. Projekt-Chat W13, gaeb); /app-Links; Ziel existiert | unit | `npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts` | ✅ erweitern (09-14-T1) |
| CONTENT-04 | 10 neue Anleitungen mit belegten Schritten; Erweiterungen Arbeitsabschnitte (09-06) und Teilabnahme (09-18) | unit + script | `npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts`; Prüfwerkzeug | ✅ (über 09-01/09-15) |
| SEO-09 (Rest) | Map: 10 neue Einträge nach sitewide Regeln (Kopfwort, Überclaim, W5), 9 Phase-9-Einträge mit `target`; Herkunft (K-4); Status ab 09-09 „bestehend“ | unit | `npx vitest run tests/keyword-map.test.ts tests/keyword-seeds.test.ts` | ✅ erweitern (09-01-T1/T3, 09-09-T1) |
| SEO-09 (Rest) | 9 Wissensseiten answer-first mit Quelle, FAQ = FAQPage, kein HowTo; Gewerke-Software und Schlussrechnung answer-first; Abdeckungstabelle „Thema → Zielseite/Anker → Audit“ (W11) | unit + build + doc | `npx vitest run tests/content.test.ts`; `node scripts/seo-audit.mjs --paths=<Wissensseiten>`; Node-Prüfung von 09-integration.md | ✅ (09-03, 09-08, 09-11, 09-17; Tabelle 09-09-T2, Ergebnisse 09-16-T2, live 09-10-T2) |
| SEO-09 / D-24 | Metadaten, Brotkrumen, OG, Schema; Sitemap und llms.txt mit neuen URLs | unit + build | `npx vitest run tests/breadcrumbs.test.ts tests/llms.test.ts tests/content-vorlage.test.ts`; `node scripts/seo-audit.mjs` | ✅ (Vorlagentest 09-12) |
| SEO-09 / D-24 | Interne Links 0 defekt | build | `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | ✅ (09-16-T2) |
| DESIGN-02 (Vorlagen) | Bausteine im Budget, Fehlertexte wörtlich | unit | `npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/content-vorlage.test.ts tests/gewerke.test.ts` | ✅ erweitern (09-01-T1, 09-12, 09-11) |
| DESIGN-02 (Vorlagen) | Darstellung, A11y, reduzierte Bewegung, CLS für sieben Routen in sechs Breiten | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs design-v2.pw.cjs` | ❌ W0 neue Fälle (09-16-T1) |
| Alle (D-04) | Produkt-Snapshot aktuell gegen die eingefrorene Basis, Delta ab a9319e5/6cac366 (W8) | unit + script | `npx vitest run tests/pricing-parity.test.ts`; `npm run sync:product:check` | ✅ (09-15-T1) |

---

## Aufgabenmatrix

Bedrohungs-IDs aus den `<threat_model>`-Abschnitten der Pläne. „Paketende“ = einmal unter Sperre Build + `seo-audit.mjs --paths=<eigene Pfade>` (D-28). Alle Befehle aus `craftos/`.

| Aufgaben-ID | Plan / Spur / Port | Welle | Anforderung | Bedrohung | Sicheres Verhalten | Testart | Automatisierter Befehl (Kurzform) | Datei vorhanden | Status |
|---|---|---|---|---|---|---|---|---|---|
| 09-01-T1 | 01 Fundament / basis / 3101 | 1 | DESIGN-02, SEO-09 | T-09-04 | Startgate; F-A1 mit festem Betreff, Budgets additiv | unit (TDD) | `npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/keyword-map.test.ts tests/funktionskopf.test.ts tests/breadcrumbs.test.ts` + Typcheck, Lint, Betreffprüfung | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 09-01-T2 | 01 Fundament / basis / 3101 | 1 | CONTENT-03, SEO-09 | T-09-01, T-09-04 | Rehype hinter Sanitize; Listenobergrenzen; Übergangslisten ohne Zeilennummer | unit (TDD) | `npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/seo-audit-core.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts` + Typcheck, Lint | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 09-01-T3 | 01 Fundament / basis / 3101 | 1 | CONTENT-04, SEO-09 | T-09-03 | K-1 vor dem Map-Commit; sitewide Map-Regeln | unit + build | `npx vitest run tests/keyword-map.test.ts tests/keyword-seeds.test.ts tests/ai-prompts.test.ts`; Sperre: Suite ohne pricing-parity, Build, `seo-audit.mjs --report` | ✅ | ⬜ offen |
| 09-02-T1 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04 | – | Startgate; K-1 mit festem Betreff, ohne Lockerung | unit | `npx vitest run tests/ai-prompts.test.ts tests/keyword-map.test.ts` + Typcheck, Lint, Betreffprüfung | ✅ | ⬜ offen |
| 09-02-T2 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04 | T-09-05 | keine unbelegten Zusagen in Detail und Übersicht (B1) | unit + script | `npx vitest run tests/content.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts tests/navigation.test.ts` + Wort-/Artikelprobe | ✅ | ⬜ offen |
| 09-02-T3 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04, DESIGN-02 | T-09-06 | FAQPage aus dem sichtbaren Array | unit + build + e2e | Sperre: Build, `seo-audit.mjs --only=… --paths=<12 Gewerke>`, Gewerke-E2E auf 3102, netstat nach kill | ✅ | ⬜ offen |
| 09-15-T1 | 15 Produktbasis / basis / 3101 | 2 | CONTENT-03 | T-09-02 | Sync nur nach Delta-Abgleich ab a9319e5/6cac366 | unit + script | `npx vitest run tests/pricing-parity.test.ts tests/product-register.test.ts && npm run sync:product:check` + 09-basis-Prüfung | ✅ | ⬜ offen |
| 09-15-T2 | 15 Prüfwerkzeug / basis / 3101 | 2 | CONTENT-03, CONTENT-04 | T-09-36 | Ausnahmen nur mit Begründung | script + build | Funktionsprobe `content-pruefen.mjs --zitate` (Exit 1 erwartet); Sperre: `npm test`, Build | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 09-11-T1 | 11 (a) Gewerke 2 / a / 3102 | 2 | FEAT-04, DESIGN-02 | T-09-07, T-09-08 | Kopf mit belegter Antwort; keine Rasterbilder | unit (TDD) | `npx vitest run tests/gewerke.test.ts tests/media-ki-label.test.ts tests/content.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts tests/funktionskopf.test.ts` | ❌ W0 (`gewerke.test.ts`) | ⬜ offen |
| 09-11-T2 | 11 (a) Gewerke 2 / a / 3102 | 2 | FEAT-04, SEO-09 | T-09-07 | K-2 vor dem Audit (W2); Prompt-Anker ≤ 300 | unit + build + e2e | K-2-grep, `npx vitest run tests/gewerke.test.ts tests/ai-prompts.test.ts tests/content.test.ts tests/content-produktwahrheit.test.ts`; Sperre: Build, seo-audit 13 Pfade, `--only=prompts`, Gewerke-E2E, netstat | ✅ | ⬜ offen |
| 09-03-T1 | 03 (b) Ratgeber 1 / b / 3103 | 3 | CONTENT-03, SEO-09 | T-09-13, T-09-14 | Pflichtquelle, kein Rechtsrat | unit + script | `content-pruefen.mjs --ausnahmen 09-b.md --zitate --l1 --antwort <4>` + content/produktwahrheit-Tests | ✅ | ⬜ offen |
| 09-03-T2 | 03 (b) Ratgeber 1 / b / 3103 | 3 | CONTENT-03 | T-09-13 | Bedienbegriffe belegt | unit + script | wie 09-03-T1 (4 Kalkulationsartikel) | ✅ | ⬜ offen |
| 09-03-T3 | 03 (b) Ratgeber 1 / b / 3103 | 3 | CONTENT-03 | T-09-13 | D-03-Links bleiben | unit + script + build | wie T1 (12) + Paketende | ✅ | ⬜ offen |
| 09-04-T1 | 04 (c) Ratgeber 2 / c / 3104 | 3 | CONTENT-03 | T-09-15, T-09-16 | Bankabgleich nie „automatisch“, Pflichtquelle GoBD | unit + script | `content-pruefen.mjs --ausnahmen 09-c.md …` (4) + Tests | ✅ | ⬜ offen |
| 09-04-T2 | 04 (c) Ratgeber 2 / c / 3104 | 3 | CONTENT-03 | T-09-15 | Release-Reiter wörtlich | unit + script | wie 09-04-T1 (4 Projektartikel) | ✅ | ⬜ offen |
| 09-04-T3 | 04 (c) Ratgeber 2 / c / 3104 | 3 | CONTENT-03 | T-09-15 | Offline positiv, Pflichtquelle Arbeitszeit | unit + script + build | wie T1 (12) + Paketende | ✅ | ⬜ offen |
| 09-05-T1 | 05 (d) Hilfe Einrichtung / d / 3105 | 3 | CONTENT-03 | T-09-17, T-09-18 | Rollen und Schalter wörtlich | unit + script | `content-pruefen.mjs --ausnahmen 09-d.md …` (5) + Tests | ✅ | ⬜ offen |
| 09-05-T2 | 05 (d) Hilfe Belege / d / 3105 | 3 | CONTENT-03 | T-09-17 | Bankabgleich verlinkt, positiv | unit + script + build | wie T1 (9) + Paketende | ✅ | ⬜ offen |
| 09-17-T1 | 17 (d2) Schlussrechnung + Rechnungen / d2 / 3109 | 3 | CONTENT-03, SEO-09 | T-09-17, T-09-37 | Schlussrechnung zuerst, answer-first mit FAQ und Quelle | unit + script | `content-pruefen.mjs --ausnahmen 09-d2.md …` (7) + Tests | ✅ | ⬜ offen |
| 09-17-T2 | 17 (d2) Angebote / d2 / 3109 | 3 | CONTENT-03 | T-09-17 | GAEB-Formate nur positiv | unit + script + build | wie T1 (12) + Paketende | ✅ | ⬜ offen |
| 09-06-T1 | 06 (e) Projekte / e / 3106 | 3 | CONTENT-03, CONTENT-04 | T-09-19, T-09-20 | Arbeitsabschnitte belegt | unit + script | `content-pruefen.mjs --ausnahmen 09-e.md …` (4) + Tests | ✅ | ⬜ offen |
| 09-06-T2 | 06 (e) Zeiten / e / 3106 | 3 | CONTENT-03 | T-09-19 | Release-Delta eingearbeitet, Pflichtquelle | unit + script + build | wie T1 (9) + Paketende | ✅ | ⬜ offen |
| 09-18-T1 | 18 (e2) Baudokumentation / e2 / 3110 | 3 | CONTENT-03, CONTENT-04 | T-09-19, T-09-20 | Teilabnahme zuerst, Pflichtquelle Abnahme | unit + script | `content-pruefen.mjs --ausnahmen 09-e2.md …` (3) + Tests | ✅ | ⬜ offen |
| 09-18-T2 | 18 (e2) Lager + Craft AI / e2 / 3110 | 3 | CONTENT-03 | T-09-19 | KI-/Credit-Aussagen aus Register | unit + script + build | wie T1 (10) + Paketende | ✅ | ⬜ offen |
| 09-07-T1 | 07 (f) neue Hilfe Büro / f / 3107 | 3 | CONTENT-04 | T-09-21, T-09-23 | Portal per Überweisung; Listenobergrenzen | unit + script | `content-pruefen.mjs --ausnahmen 09-f.md …` (5) + content/produktwahrheit/keyword-map-Tests | ✅ | ⬜ offen |
| 09-07-T2 | 07 (f) neue Hilfe Baustelle / f / 3107 | 3 | CONTENT-04 | T-09-21 | keine Videoauswertung, DATANORM positiv | unit + script + build | wie T1 (10) + Paketende | ✅ | ⬜ offen |
| 09-08-T1 | 08 (g) Wissensseiten Hilfe / g / 3108 | 3 | SEO-09 | T-09-24, T-09-25 | amtliche Quellen datiert | unit + script | `content-pruefen.mjs --ausnahmen 09-g.md …` (3) + Tests | ✅ | ⬜ offen |
| 09-08-T2 | 08 (g) Wissensseiten Ratgeber 1 / g / 3108 | 3 | SEO-09 | T-09-26 | Mängelanzeige ohne Dokumentzusage; GAEB nur X83/X84 | unit + script | wie T1 (3 Ratgeber) | ✅ | ⬜ offen |
| 09-08-T3 | 08 (g) Wissensseiten Ratgeber 2 / g / 3108 | 3 | SEO-09 | T-09-24 | Vorlagen als Tabelle, Listenobergrenzen | unit + script + build | wie T1 (9) + `tests/ai-prompts.test.ts` + Paketende | ✅ | ⬜ offen |
| 09-12-T1 | 12 Artikelvorlage / basis / 3101 | 3 | DESIGN-02, CONTENT-03 | T-09-10, T-09-12 | HTML nur sanitisiert; kein HowTo | unit (TDD) | `npx vitest run tests/content-vorlage.test.ts tests/content.test.ts tests/breadcrumbs.test.ts tests/schema.test.ts tests/design-v2-components.test.ts` | ❌ W0 (`content-vorlage.test.ts`) | ⬜ offen |
| 09-12-T2 | 12 Übersichten / basis / 3101 | 3 | DESIGN-02 | T-09-11 | Suche funktionsgleich | unit (TDD) + build | `npx vitest run tests/content-vorlage.test.ts tests/content.test.ts tests/breadcrumbs.test.ts`; Sperre: Build, seo-audit 6 Pfade | ✅ | ⬜ offen |
| 09-14-T1 | 14 (f) Verdrahtung / f / 3107 | 4 | CONTENT-04 | T-09-22 | Links nur auf existierende Ziele, Projekt-Chat auch auf team | unit (TDD) | `npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts tests/funktionsgruppen.test.ts tests/content.test.ts` | ✅ erweitern | ⬜ offen |
| 09-14-T2 | 14 (f) L-1 in Produktdaten / f / 3107 | 4 | CONTENT-04 | T-09-38 | GAEB-Note = Grenze-Kachel, Pflichtfrage positiv | unit (TDD) + script + build | `content-pruefen.mjs --l1 <8 lib-Dateien>` + Tests; Paketende (11 Pfade) | ✅ | ⬜ offen |
| 09-13-T1 | 13 (a) Gewerke 3 / a / 3102 | 4 | FEAT-04 | T-09-09 | Links nur auf existierende Ziele | unit (TDD) + build | `npx vitest run tests/gewerke.test.ts tests/content.test.ts`; Sperre: Build, seo-audit 13 Pfade | ✅ | ⬜ offen |
| 09-09-T1 | 09 Integration / main / 3100 | 5 | CONTENT-03, CONTENT-04, SEO-09 | T-09-27 | Übergänge entfernt, `answer`-Pflicht, Listenobergrenzen | unit (TDD) | `npx vitest run tests/keyword-map.test.ts tests/content.test.ts tests/content-produktwahrheit.test.ts tests/content-pruefung.test.ts tests/ai-prompts.test.ts tests/gewerke.test.ts tests/funktionsdetails.test.ts` + Restmarker-Probe | ❌ W0 (`content-pruefung.test.ts`) | ⬜ offen |
| 09-09-T2 | 09 Integration / main / 3100 | 5 | CONTENT-03, SEO-09 | T-09-28 | Release-Delta nach Faktenabgleich; Abdeckungstabelle (W11) | unit + script + doc | `content-pruefen.mjs --l1 --antwort <83 Artikel>` + Tests + `sync:product:check` + Tabellenprüfung | ✅ | ⬜ offen |
| 09-16-T1 | 16 Phasen-Gate / main / 3100 | 6 | DESIGN-02, FEAT-04 | T-09-30, T-09-39 | axe ohne serious/critical, CLS 0, netstat nach kill | e2e (TDD) | Sperre: Build, Server 3100, `design-v2.pw.cjs` | ❌ W0 (neue Fälle) | ⬜ offen |
| 09-16-T2 | 16 Phasen-Gate / main / 3100 | 6 | FEAT-04, DESIGN-02, SEO-09 | T-09-29, T-09-39 | sitewide 0 Verstöße, 0 defekte Links | unit + build + e2e + Sichtprüfung | Sperre: `npm test`, Lint, Typcheck, sync:product:check, check-no-secrets, Build, seo-audit sitewide, E2E-Auswahl, route-audit | ✅ | ⬜ offen |
| 09-10-T1 | 10 (h) Rollout / main / 3100 | 7 | FEAT-04, CONTENT-03, CONTENT-04, SEO-09 | T-09-33 | volle Suite vor dem Push | gate + e2e + script | Sperre: Volllauf + `npm run test:e2e` + live-check lokal, netstat | ✅ erweitern (`live-check.mjs`) | ⬜ offen |
| 09-10-T2 | 10 (h) Rollout / main / 3100 | 7 | FEAT-04, CONTENT-03, CONTENT-04, SEO-09 | T-09-31, T-09-32, T-09-34, T-09-35 | `gh workflow list --all` vor jedem Push, keine Geheimnisse, Units ≤ 4.000, ehrlicher Status, Abdeckungstabelle live | gate + script (live) | `node scripts/live-check.mjs` gegen https://craftos.eu, `check-no-secrets.mjs docs/seo`, Nachweisprüfung PHASE-09-ROLLOUT.md | ✅ | ⬜ offen |

*Status: ⬜ offen · ✅ grün · ❌ rot · ⚠️ wackelig*

Abtastkontinuität: Jede der 40 Aufgaben hat einen automatisierten Verify-Befehl; keine drei aufeinanderfolgenden Aufgaben ohne automatisierte Prüfung. Wave-0-Dateien entstehen in der Aufgabe, die sie prüft (TDD). DESIGN-02 bleibt nach dem Rollout „In Progress“ (D-30).

---

## Wave-0-Anforderungen (Lücken)

- [ ] `craftos/lib/leitlinie-l1.json` + `lib/leitlinie.ts` (nur Wortliste und `l1Treffer`) — 09-01-T1
- [ ] `craftos/scripts/lib/ts-literale.mjs` (`stringLiterale` mit TypeScript-Import, W6) — 09-01-T2
- [ ] `craftos/tests/content-produktwahrheit.test.ts` mit Übergangsliste (Schlüssel Datei + Wort) — 09-01-T2; streng 09-09-T1
- [ ] Map-Bezug, Frontmatter-, Listen- und Prosa-Fälle in `craftos/tests/content.test.ts` (Übergangsliste Datei + Regel) — 09-01-T2
- [ ] `craftos/scripts/content-pruefen.mjs` — 09-15-T2
- [ ] `craftos/tests/gewerke.test.ts` — 09-11-T1
- [ ] `craftos/tests/content-vorlage.test.ts` — 09-12-T1
- [ ] `craftos/tests/content-pruefung.test.ts` (Prüfdateien 09-a, b, c, d, d2, e, e2, f, g) — 09-09-T1
- [ ] Neue Fälle in `craftos/tests/e2e/design-v2.pw.cjs` — 09-16-T1
- [ ] Anpassungen im Bestand: `seo-audit-core.*` (09-01-T2), `keyword-map.test.ts` (09-01, streng 09-09), `design-v2-budgets.test.ts` (nur 09-01-T1), `ai-prompts.test.ts` (09-02-T1, 09-11-T2) + `ai-prompts-targets.json` (09-11-T2), `media-ki-label.test.ts` (09-11-T1), `funktionsdetails.test.ts` (09-14), `pricing-parity.test.ts` (Sync 09-15-T1), `live-check.mjs` (09-10-T1)

---

## Manuelle Prüfungen

| Verhalten | Anforderung | Warum manuell | Prüfanleitung |
|-----------|-------------|---------------|---------------|
| Gewerke-Ablauf fachlich passend je Gewerk | FEAT-04 | fachliche Zuordnung (RESEARCH A1) | Schritte gegen belegte Funktionen und Gewerkalltag lesen; Ergebnis in `09-a.md` (09-02-T2, 09-11-T2) |
| Beispielkachel und FeatureSnippet erzählen denselben Auftrag | FEAT-04 | inhaltliche Stimmigkeit | je Gewerk `example` mit `tradeSnippetExamples` vergleichen |
| Erster Satz jeder Antwort beantwortet direkt | CONTENT-03, SEO-09 | Sprachurteil | Durchsicht je Paket bzw. Code-Review-Gate; Befund in `09-<paket>.md` |
| Schritte enthalten genau eine Handlung im Sie-Imperativ | CONTENT-03, CONTENT-04 | Satzbau | Stichprobe je Artikel im Paket, vollständig im Review-Gate |
| L-1-Umformulierungen sachlich richtig | CONTENT-03, CONTENT-04 | Wortliste fängt nur Formulierungen | jede Umformulierung gegen Register bzw. Release-Pfad prüfen |
| Bedienbegriffe tragen einen Release-Beleg | CONTENT-03, CONTENT-04 | Beleg in fremden Repos | Prüfwerkzeug `--zitate` plus Belegpfad je Begriff; Zitat-Ausnahmen nur mit Begründung |
| Rechts- und Steuerfakten aktuell (Pflichtquelle) | SEO-09, CONTENT-03 | fremde Seiten ändern sich | Quellen öffnen, Aussage und `checkedAt` vergleichen; [ASSUMED]-Paragraphen nur mit bestätigter Quelle (09-08) |
| Echte Silbentrennung in H1 und Prosa-H2 | DESIGN-02 | Wörterbuch je Browser ungeprüft | Stichprobe in Safari/WebKit und Chrome bei 360 und 390 |
| Gesamteindruck der drei Vorlagen | DESIGN-02 | ästhetisches Urteil | Screenshots aus 09-11, 09-12, 09-16 im Sitzungs-Scratchpad sichten |
| Analytics und SE-Ranking nach dem Rollout | Rollout (D-29) | Daten erst nach Stunden bzw. mit Inhaberzugang | Anleitung in `craftos/docs/releases/PHASE-09-ROLLOUT.md` |

---

## Validierungsfreigabe

- [x] Alle Aufgaben haben einen `<automated>`-Verify oder Wave-0-Abhängigkeiten (40 Aufgaben in 18 Plänen)
- [x] Abtastkontinuität: keine drei aufeinanderfolgenden Aufgaben ohne automatisierten Verify
- [x] Wave 0 deckt alle fehlenden Referenzen ab
- [x] Keine Watch-Mode-Flags (`vitest run`, Playwright ohne `--ui`)
- [x] Rückmeldelatenz < 60 s
- [x] `nyquist_compliant: true` im Frontmatter gesetzt

**Freigabe:** geplant 2026-10-22, nach Plan-Checker überarbeitet (B1–B4, W1–W13, Hinweise)
