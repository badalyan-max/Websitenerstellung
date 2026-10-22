---
phase: 8
slug: seo-und-ki-sichtbarkeit
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-22
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Quelle: 08-RESEARCH.md „Validation Architecture“, 08-UI-SPEC.md „Prüfmatrix“. Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions sind kein Beleg. Schwere Läufe einzeln (Koordinationsstatus vorher, kein Website-Rezept → lokal), Produktionsserver nur auf Port 3100 mit eigener PID.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest ^5 (node, Alias `@`, `server-only` → `tests/server-only.ts`), Playwright 1.63 + @axe-core/playwright ^4.13 (Chromium/WebKit, 1440 und 390-touch), Post-Build-Audit `scripts/seo-audit.mjs` (neu in 08-01) |
| **Config file** | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch` – `vergleich.pw.cjs` wird in 08-13 eingetragen) |
| **Quick run command** | `cd craftos && npx vitest run <betroffene tests/*.test.ts> && npm run typecheck && npm run lint` |
| **Full suite command** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build && node scripts/seo-audit.mjs [--only=… / --paths=…]`, danach Port 3100 prüfen, `node node_modules/next/dist/bin/next start -p 3100 & SRV=$!` → `kill -0 $SRV` → `npm run test:e2e` → `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` → `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` → `kill $SRV` |
| **Estimated runtime** | Quick ~30–60 s; Full ~15–22 min (Build mit ~140 OG-Bildern, E2E) |

---

## Sampling Rate

- **After every task commit:** Quick run command mit den im Task-`<verify>` genannten Vitest-Dateien + Typcheck + Lint.
- **After every plan wave:** `npm test` vollständig und `npm run build`; ab 08-02 in jeder Welle mit Seitenänderung zusätzlich das Audit mit den bis dahin streng geschalteten Regeln, `npm run test:e2e`, route-audit und live-check gegen den eigenen Produktionsserver.
- **Audit-Regeln werden schrittweise streng:** 08-01 `--report` (Baseline), 08-02 `breadcrumbs`, 08-04 `title,description,h1,duplikate,keyword,map`, 08-05 `og`, 08-07 bis 08-12 `--paths` der neuen/umgebauten Seiten (alle Regeln) + `faq-schema` ab 08-12, 08-13 und 08-14 vollständig ohne Optionen.
- **Before `/gsd-verify-work`:** Full suite + vollständiges `node scripts/seo-audit.mjs` + Sichtprüfung (Screenshots im Sitzungs-Scratchpad, nicht committet).
- **Max feedback latency:** 60 s (Quick).

---

## Requirement → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists |
|--------|----------|-----------|-------------------|-------------|
| SEO-03 | Jede Wettbewerberangabe mit Quelle (https, Herstellerdomain) und Abrufdatum; > 60 Tage = Warnung; UWG-Wortliste, Statt-/Erstjahrespreise, Stärken ≥ 2, HERO-Variante | unit | `npx vitest run tests/wettbewerber.test.ts` | ❌ W0 (08-06-T1) |
| SEO-03 | Alternativen: H1, Antwort ≤ 300, Tabelle mit Quellen/Disclaimer, FitPanels, Umstieg, FAQPage = sichtbare FAQ, BreadcrumbList 3, keine Logos/Ankündigungen | unit + build | `npx vitest run tests/vergleich-seiten.test.ts`; `node scripts/seo-audit.mjs --paths=/vergleich/…` | ❌ W0 (08-08-T1) |
| SEO-03 | Verlinkung von /vergleich und Footer | unit + live | `npx vitest run tests/vergleich-seiten.test.ts tests/navigation.test.ts`; live-check | ✅ erweitern (08-10, 08-11) |
| SEO-04 | /preise beginnt mit `#antwort` und `<table>`, Werte aus tarife, Parität gegen Snapshot | unit + build + e2e | `npx vitest run tests/preise-seite.test.ts tests/pricing-parity.test.ts`; `node scripts/seo-audit.mjs --paths=/preise`; `browser-functional.pw.cjs` | ❌ W0 (08-07-T1) |
| SEO-05 | Alle Sitemap-URLs: Titel ≤ 60, Description 120–155, 1 H1, keine Duplikate, Map-Werte, Keyword im Titel | build | `node scripts/seo-audit.mjs --only=title,description,h1,duplikate,keyword,map` | ❌ W0 (08-01-T1) |
| SEO-05 | Sichtbare Brotkrumen + genau eine passende BreadcrumbList (außer `/`) | unit + build + e2e | `npx vitest run tests/breadcrumbs.test.ts`; `node scripts/seo-audit.mjs --only=breadcrumbs`; `vergleich.pw.cjs` (360 px) | ❌ W0 (08-02-T1) |
| SEO-05 | Eigenes OG je Seite im prerender-manifest, ≤ 300 KB, twitter:image = og:image | unit + build | `npx vitest run tests/og.test.ts`; `node scripts/seo-audit.mjs --only=og` | ❌ W0 (08-05-T1) |
| SEO-05 | Map-Zielwerte vollständig für alle indexierten Pfade (auch ohne Hauptkeyword) | unit | `npx vitest run tests/keyword-map.test.ts tests/seo-meta.test.ts` | ✅ erweitern (08-01, 08-04) |
| SEO-06 | Zentrale Seiten: Antwort ≤ 300 unter jeder Frage | unit + build | `npx vitest run tests/funktionskopf.test.ts tests/design-v2-components.test.ts`; `node scripts/seo-audit.mjs --only=antwort` | ✅ erweitern (08-03), Audit ❌ W0 (08-01) |
| SEO-06 | llms.txt und Sitemap enthalten neue Seiten; IndexNow je Release | unit + live | `npx vitest run tests/llms.test.ts tests/keyword-map.test.ts`; live-check; `npm run indexnow` | ✅ erweitern (08-08 bis 08-11, 08-14) |
| SEO-09 | `ai-prompts-targets.json`: 20 Tracker-Einträge, Ziele existieren, Phase-8-Anker mit Antwort ≤ 300, KD-<20-Lücken als Phase 9 | unit + build + live | `npx vitest run tests/ai-prompts.test.ts`; `node scripts/seo-audit.mjs --only=prompts`; live-check | ❌ W0 (08-01-T3) |
| SEO-09 / D-25 | „Was ist CraftOS?“ mit Abgrenzung; Organization disambiguatingDescription + sameAs | unit | `npx vitest run tests/kernseiten.test.ts tests/seo-brand.test.ts` | ❌ W0 (08-12-T1) |
| SEO-02 | Title, H1, Description aller Seiten = Map (D-17) | unit + build + live | `npx vitest run tests/keyword-map.test.ts`; `node scripts/seo-audit.mjs --only=map`; live-check | ✅ erweitern (08-04) |
| DESIGN-02 | Umbauseiten nur v2-Bausteine (kein PageHero/TrialCta/ui/Faq/PricingTable), Budgets G1–G7 | unit | `npx vitest run tests/design-v2-budgets.test.ts tests/preise-seite.test.ts tests/vergleich-seiten.test.ts tests/kernseiten.test.ts` | ✅ erweitern |
| DESIGN-02 | A11y (axe), Overflow 360–1440, CLS 0, Above-the-fold, ohne JS | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs vergleich.pw.cjs` | ❌ W0 (08-13-T1) |
| D-23 | Ausnahmen nur für lib/wettbewerber/** bzw. /vergleich; CraftOS-Texte streng | unit | `npx vitest run tests/pricing-parity.test.ts tests/seo-audit-core.test.ts tests/announcements.test.ts` | ✅ erweitern (08-01-T2) |
| D-14 | Live-Stand, IndexNow, SE-Ranking-Abgleich, Messung, Units | live/script | `node scripts/live-check.mjs`; `npm run indexnow`; `node scripts/se-ranking-sync.mjs --check`; `node scripts/seo-report.mjs --etappe rollout-phase08` | ✅ erweitern (08-14) |

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 08-01-T1 | 01 | 1 | SEO-05, SEO-06 | T-08-03 | Audit liest nur lokale Build-Dateien | unit (TDD) + build | `cd craftos && npx vitest run tests/seo-audit-core.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint && npm run build && node scripts/seo-audit.mjs --report` | ❌ W0 (im Task) | ⬜ pending |
| 08-01-T2 | 01 | 1 | SEO-03, SEO-05 | T-08-01 | Ausnahmen eng; CraftOS-Texte schlagen weiter an | unit (TDD) | `cd craftos && npx vitest run tests/pricing-parity.test.ts tests/seo-audit-core.test.ts tests/design-v2-components.test.ts tests/seo-meta.test.ts tests/keyword-map.test.ts tests/announcements.test.ts tests/funktionsdetails.test.ts tests/app-seite.test.ts && npm run typecheck && npm run lint` | ❌ W0 (seo-meta.test.ts im Task) | ⬜ pending |
| 08-01-T3 | 01 | 1 | SEO-09 | T-08-02 | Prompt-IDs gegen Rohdaten, keine geratenen Ziele | unit (TDD) | `cd craftos && npx vitest run tests/ai-prompts.test.ts tests/seo-audit-core.test.ts tests/keyword-map.test.ts tests/keyword-seeds.test.ts && npm test && npm run typecheck && npm run lint` | ❌ W0 (ai-prompts.test.ts im Task) | ⬜ pending |
| 08-02-T1 | 02 | 2 | SEO-05, DESIGN-02 | T-08-04, T-08-05 | JSON-LD nur über JsonLd; nur interne Pfade | unit (TDD) | `cd craftos && npx vitest run tests/breadcrumbs.test.ts tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts && npm run typecheck && npm run lint` | ❌ W0 (breadcrumbs.test.ts im Task) | ⬜ pending |
| 08-02-T2 | 02 | 2 | SEO-05 | T-08-04 | genau eine BreadcrumbList je Seite | unit (TDD) | `cd craftos && npx vitest run tests/funktionskopf.test.ts tests/funktionsdetails.test.ts tests/app-seite.test.ts tests/funktionen-seite.test.ts tests/breadcrumbs.test.ts && npm run typecheck && npm run lint` | ✅ erweitern | ⬜ pending |
| 08-02-T3 | 02 | 2 | SEO-05, DESIGN-02 | T-08-06 | Rechtstexte unverändert | build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --only=breadcrumbs`, E2E, route-audit, live-check gegen 3100, visual-audit Stichprobe | ✅ | ⬜ pending |
| 08-03-T1 | 03 | 3 | SEO-06, DESIGN-02 | T-08-08 | keine HTML-Injektion, Budgets | unit (TDD) | `cd craftos && npx vitest run tests/funktionskopf.test.ts tests/design-v2-components.test.ts tests/design-v2-budgets.test.ts tests/funktionsdetails.test.ts tests/app-seite.test.ts tests/home.test.ts && npm run typecheck && npm run lint` | ✅ erweitern | ⬜ pending |
| 08-03-T2 | 03 | 3 | SEO-03, SEO-04, DESIGN-02 | T-08-07 | Quellenlinks https + nofollow | unit (TDD) + e2e + Sichtprüfung | volle Suite (Build, E2E gegen 3100), visual-audit /styleguide | ✅ erweitern | ⬜ pending |
| 08-04-T1 | 04 | 4 | SEO-02, SEO-05 | T-08-09, T-08-11 | keine Überclaims, Provenienz unverändert | unit (TDD) | `cd craftos && npx vitest run tests/keyword-map.test.ts tests/seo-meta.test.ts tests/keyword-seeds.test.ts tests/ai-prompts.test.ts && npm run typecheck && npm run lint` | ✅ erweitern | ⬜ pending |
| 08-04-T2 | 04 | 4 | SEO-02, SEO-05 | T-08-09 | Map als einzige Quelle | unit | `cd craftos && npx vitest run tests/content.test.ts tests/keyword-map.test.ts tests/breadcrumbs.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 08-04-T3 | 04 | 4 | SEO-02, SEO-05 | T-08-10 | Rechtstexte unverändert | build + e2e | volle Suite, `node scripts/seo-audit.mjs --only=title,description,h1,duplikate,keyword,map,breadcrumbs`, E2E, route-audit, live-check gegen 3100 | ✅ | ⬜ pending |
| 08-05-T1 | 05 | 5 | SEO-05 | T-08-13 | OG ohne Preise/Daten | unit (TDD) | `cd craftos && npx vitest run tests/og.test.ts tests/seo-meta.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint` | ❌ W0 (og.test.ts im Task) | ⬜ pending |
| 08-05-T2 | 05 | 5 | SEO-05 | T-08-12 | kein On-Demand-Rendern | build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --only=og,…`, E2E, route-audit, live-check gegen 3100, OG-PNGs ansehen | ✅ | ⬜ pending |
| 08-06-T1 | 06 | 6 | SEO-03, SEO-04 | T-08-15 | Provenienz-, Wort- und Preisregeln als Test | unit (TDD) | `cd craftos && npx vitest run tests/wettbewerber.test.ts tests/pricing-parity.test.ts tests/funktionsdetails.test.ts && npm run typecheck && npm run lint` | ❌ W0 (wettbewerber.test.ts im Task) | ⬜ pending |
| 08-06-T2 | 06 | 6 | SEO-03, SEO-09 | T-08-15, T-08-16, T-08-17, T-08-18 | Neuprüfung je Quelle, HERO nur mit Screenshot | unit (TDD) + script | `cd craftos && npx vitest run tests/wettbewerber.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts && npm test && npm run typecheck && npm run lint && node scripts/check-no-secrets.mjs lib docs/seo` | ✅ (aus T1) | ⬜ pending |
| 08-07-T1 | 07 | 7 | SEO-04, SEO-06, SEO-09 | T-08-19, T-08-20 | Preise nur aus tarife, Marktspanne belegt | unit (TDD) | `cd craftos && npx vitest run tests/preise-seite.test.ts tests/pricing-parity.test.ts tests/design-v2-budgets.test.ts tests/wettbewerber.test.ts tests/announcements.test.ts && npm run typecheck && npm run lint` | ❌ W0 (preise-seite.test.ts im Task) | ⬜ pending |
| 08-07-T2 | 07 | 7 | SEO-04, DESIGN-02 | T-08-21 | Quellenlinks nofollow | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=/preise`, E2E, route-audit, live-check gegen 3100, visual-audit /preise | ✅ (aus T1) | ⬜ pending |
| 08-08-T1 | 08 | 8 | SEO-03, DESIGN-02 | T-08-22, T-08-23, T-08-24 | Builder erzwingt UWG-Regeln, keine Logos | unit (TDD) | `cd craftos && npx vitest run tests/vergleich-seiten.test.ts tests/pricing-parity.test.ts tests/wettbewerber.test.ts && npm run typecheck && npm run lint` | ❌ W0 (vergleich-seiten.test.ts im Task) | ⬜ pending |
| 08-08-T2 | 08 | 8 | SEO-03, SEO-06, SEO-09 | T-08-22 | Map/Sitemap/llms im selben Commit | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=/vergleich/plancraft-alternative,/vergleich/craftnote-alternative`, E2E, route-audit, live-check gegen 3100, visual-audit | ✅ (aus T1) | ⬜ pending |
| 08-09-T1 | 09 | 9 | SEO-03 | T-08-25, T-08-26 | HERO-Variante datenbasiert, Erstjahrespreise gekennzeichnet | unit (TDD) | `cd craftos && npx vitest run tests/vergleich-seiten.test.ts tests/design-v2-budgets.test.ts tests/wettbewerber.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 08-09-T2 | 09 | 9 | SEO-03, SEO-06, SEO-09 | T-08-27 | Stand-Zeile aus Daten | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=` alle vier Alternativen, E2E, route-audit, live-check gegen 3100, visual-audit | ✅ | ⬜ pending |
| 08-10-T1 | 10 | 10 | SEO-09, DESIGN-02 | T-08-28 | Pflichthinweis wörtlich, keine Superlative, keine Hervorhebung | unit (TDD) | `cd craftos && npx vitest run tests/vergleich-seiten.test.ts tests/design-v2-budgets.test.ts tests/pricing-parity.test.ts tests/wettbewerber.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 08-10-T2 | 10 | 10 | SEO-03, SEO-06, DESIGN-02 | T-08-29, T-08-30 | Logos gelöscht, Schutztests (announcements, media-budget, design-v2 PNG_EXCEPTIONS) synchron | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=/vergleich`, E2E, route-audit, live-check gegen 3100, visual-audit /vergleich | ✅ anpassen | ⬜ pending |
| 08-11-T1 | 11 | 11 | SEO-09, DESIGN-02 | T-08-42, T-08-43 | amtliche Quellen datiert, Pflichthinweis wörtlich, keine Superlative | unit (TDD) | `cd craftos && npx vitest run tests/vergleich-seiten.test.ts tests/design-v2-budgets.test.ts tests/pricing-parity.test.ts tests/wettbewerber.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 08-11-T2 | 11 | 11 | SEO-03, SEO-06, SEO-09 | T-08-44 | Route, Map, Sitemap, llms im selben Commit; Footer-/Ratgeber-Links | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=/vergleich,/vergleich/handwerkersoftware-kleine-betriebe`, E2E, route-audit, live-check gegen 3100, visual-audit | ✅ | ⬜ pending |
| 08-12-T1 | 12 | 12 | SEO-09, DESIGN-02 | T-08-31, T-08-32 | sameAs nur offizielle Profile; keine Überclaims | unit (TDD) | `cd craftos && npx vitest run tests/kernseiten.test.ts tests/seo-brand.test.ts tests/design-v2-budgets.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts tests/product-register.test.ts && npm run typecheck && npm run lint` | ❌ W0 (kernseiten.test.ts im Task) | ⬜ pending |
| 08-12-T2 | 12 | 12 | SEO-06, DESIGN-02 | T-08-33 | FAQPage nur sichtbar | unit (TDD) + build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs --paths=/fakten-ueber-craftos,/craft-ai,/gobd` und `--only=…,faq-schema`, E2E, route-audit, live-check gegen 3100, visual-audit | ✅ (aus T1) | ⬜ pending |
| 08-13-T1 | 13 | 13 | SEO-05, SEO-06, DESIGN-02 | T-08-34 | externe Requests im E2E gesperrt | e2e (Sammlung) + unit | `cd craftos && npm run lint && npm run typecheck && npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts tests/home.test.ts tests/design-v2-budgets.test.ts && npx playwright test -c tests/e2e/playwright.config.cjs --list vergleich.pw.cjs` | ❌ W0 (vergleich.pw.cjs + testMatch im Task) | ⬜ pending |
| 08-13-T2 | 13 | 13 | SEO-05, SEO-06, SEO-09 | T-08-35, T-08-36 | Regeln nie abschwächen; nur lokal | build + e2e + Sichtprüfung | volle Suite, `node scripts/seo-audit.mjs` (vollständig), E2E inkl. vergleich.pw.cjs, route-audit, live-check gegen 3100, visual-audit zehn Seiten | ✅ (aus T1) | ⬜ pending |
| 08-14-T1 | 14 | 14 | alle | T-08-37, T-08-39 | keine Geheimnisse, Suite grün vor Push | gate (unit + build + e2e + script) | volle Suite, `sync:product:check`, `check-no-secrets.mjs`, `node scripts/seo-audit.mjs`, E2E, route-audit, `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | ✅ erweitern | ⬜ pending |
| 08-14-T2 | 14 | 14 | SEO-02, SEO-03, SEO-04, SEO-05, SEO-06 | T-08-38, T-08-40, T-08-41 | kein Cloud-CI, Deployment geprüft, ehrlicher Status, Units dokumentiert | script (live) | `cd craftos && node scripts/live-check.mjs` gegen https://craftos.eu plus Inhaltsprüfung von docs/releases/PHASE-08-ROLLOUT.md | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

Sampling-Kontinuität: Jeder Task hat einen automatisierten Verify-Befehl; es gibt keine drei aufeinanderfolgenden Tasks ohne automatisierte Prüfung. Wave-0-Dateien werden jeweils im ersten Task ihres Plans per TDD (rot → grün) angelegt.

---

## Wave 0 Requirements

- [ ] `craftos/scripts/lib/seo-audit-core.mjs`, `craftos/scripts/seo-audit.mjs`, `craftos/tests/seo-audit-core.test.ts` — Post-Build-Prüfung SEO-05/06/09 (08-01-T1)
- [ ] `craftos/tests/seo-meta.test.ts` — metaFor/zielwerte (08-01-T2)
- [ ] `craftos/tests/ai-prompts.test.ts` + `craftos/docs/seo/ai-prompts-targets.json` — SEO-09 (08-01-T3)
- [ ] `craftos/tests/breadcrumbs.test.ts` — Brotkrumen G6 (08-02-T1)
- [ ] `craftos/tests/og.test.ts` — OG-Vorlage G7 (08-05-T1)
- [ ] `craftos/tests/wettbewerber.test.ts` — Provenienz, UWG, HERO (08-06-T1)
- [ ] `craftos/tests/preise-seite.test.ts` — /preise (08-07-T1)
- [ ] `craftos/tests/vergleich-seiten.test.ts` — Alternativen, /vergleich, kleine Betriebe (08-08-T1, erweitert 08-09, 08-10, 08-11)
- [ ] `craftos/tests/kernseiten.test.ts` — Fakten, Craft AI, GoBD (08-12-T1)
- [ ] `craftos/tests/e2e/vergleich.pw.cjs` + `testMatch`-Eintrag (08-13-T1)
- [ ] Anpassungen Bestand (D-23 und Bindungen): `pricing-parity.test.ts`, `route-audit.mjs`, `keyword-map.test.ts`, `design-v2-components.test.ts`, `design-v2-budgets.test.ts`, `announcements.test.ts`, `media-budget.test.ts`, `llms.test.ts`, `seo-brand.test.ts`, `funktionskopf.test.ts`, `funktionsdetails.test.ts`, `app-seite.test.ts`, `funktionen-seite.test.ts`, `content.test.ts`, `navigation.test.ts`, `browser-functional.pw.cjs`, `design-v2.pw.cjs`, `home-navigation.pw.cjs`, `live-check.mjs`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gesamteindruck der Umbau- und Neuseiten (strukturiert, ruhig, gleichrangige Panels, lesbare Quellen) | DESIGN-02, SEO-03 | ästhetisches Urteil | Screenshots 360/1440 (Chromium) und 390 (WebKit) aus dem Sitzungs-Scratchpad (Ordner 08-02, 08-03, 08-07 bis 08-14) sichten; Befunde an den Executor zurückgeben |
| HERO-Preiszuordnung (nur Variante A) | SEO-03 (D-16) | Bildbeleg einer JavaScript-Umschalterseite | Die zwei Screenshots unter craftos/docs/seo/belege/ öffnen und Zahl ↔ Zahlweise mit /vergleich/hero-alternative vergleichen |
| Analytics `trial_click`/`ai_visit` nach Rollout | Rollout-Regel | Vercel Web Analytics nur mit Inhaberzugang zuverlässig nach 24 h | Anleitung in PHASE-08-ROLLOUT.md (Abschnitt Analytics) |
| Aktualität der Wettbewerberangaben nach 60 Tagen | SEO-03 (D-04) | fachliche Neuprüfung fremder Seiten | Test-Warnung „älter als 60 Tage“ beachten; Quellen neu prüfen und abgerufenAm aktualisieren |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** planned 2026-10-22 (Wave-0-Dateien werden in 08-01-T1/T2/T3, 08-02-T1, 08-05-T1, 08-06-T1, 08-07-T1, 08-08-T1, 08-12-T1, 08-13-T1 angelegt)
