---
phase: 7
slug: funktionsdetailseiten-und-mobile-app-seite
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-21
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Quelle: 07-RESEARCH.md „Validation Architecture“, 07-UI-SPEC.md „Prüfmatrix“. Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions sind kein Beleg.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest ^5 (node, Alias `@`, `server-only` → `tests/server-only.ts`), Playwright ^1.63 + @axe-core/playwright ^4.13 (Chromium/WebKit, 1440 und 390-touch) |
| **Config file** | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch` – `funktionsdetails.pw.cjs` wird in 07-08 eingetragen) |
| **Quick run command** | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/funktionsgruppen.test.ts tests/keyword-map.test.ts tests/app-seite.test.ts && npm run typecheck` |
| **Full suite command** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build`, danach Port 3100 prüfen, `node node_modules/next/dist/bin/next start -p 3100 & SRV=$!` → `kill -0 $SRV` → `npm run test:e2e` → `kill $SRV` |
| **Estimated runtime** | Quick ~30–45 s; Full ~12–18 min (E2E mit 23 neuen Seiten) |

---

## Sampling Rate

- **After every task commit:** Quick run command bzw. die im Task-`<verify>` genannten Vitest-Dateien + `npm run typecheck` + `npm run lint`
- **After every plan wave:** `npm test` vollständig und `npm run build`; ab 07-02 in jeder Welle mit Seitenänderung zusätzlich `npm run test:e2e` gegen eigenen Produktionsserver (Koordinationsstatus vorher lesen, kein Website-Rezept → lokal, ein schwerer Prozess; Server nur über eigene PID beenden)
- **Before `/gsd-verify-work`:** Full suite + `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` + `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` + Sichtprüfung (Screenshots im Sitzungs-Scratchpad, nicht committet)
- **Max feedback latency:** 60 s (Quick)

---

## Requirement → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists |
|--------|----------|-----------|-------------------|-------------|
| FEAT-02 | 22 Detailseiten mit 7 Abschnitten in fester Folge, je ≤ 1 H2, Lead 1 Satz | unit (renderToString) | `npx vitest run tests/funktionsdetails.test.ts` | ❌ W0 (07-04-T1) |
| FEAT-02 | Inhalte: Budgets, 3–5 Schritte, 3–8 FAQ mit Pflichtfrage, 2–3 verwandte (gleiche/benachbarte Gruppe), Rollen ∈ RolleName, Plattformen = funktionen.ts, Grenze-Kachel, Zusatzfunktions-Kacheln | unit | dto. | ❌ W0 (07-04/05/06) |
| FEAT-02 | 6 neue Slugs: Gruppe, Menü, Übersicht, ItemList, Sitemap, llms.txt; 22 + 8 = 30 | unit | `npx vitest run tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts tests/llms.test.ts tests/product-register.test.ts` | ✅ anpassen (07-02) |
| FEAT-02 | Zwei Klicks, Menü mit 22 Links ohne Überlauf | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs home-navigation.pw.cjs` | ✅ anpassen (07-02) |
| FEAT-02 | Rollen gegen FEATURE_ACCESS/Presets am Web-Release | unit + git | `npx vitest run tests/funktionsdetails.test.ts -t "Rollen gegen Release"` | ❌ W0 (07-06-T3) |
| FEAT-03 | /app: 14 Kacheln (15 FEAT-03-Punkte inkl. Kennzahlen + Kunden), ≥ 6 Phones, Store-Links, KeyFacts, FAQ, Abschnittsfolge | unit | `npx vitest run tests/app-seite.test.ts` | ❌ W0 (07-07-T1) |
| MEDIA-01 | Kopf-Visual für 22 Funktionen, cardScenes = Kopf-Visual, Szenen mit Kurzform + Registerbeleg, Status ∈ MiniStatusName mit Release-Beleg | unit | `npx vitest run tests/design-v2-frames.test.ts tests/styleguide.test.ts tests/design-v2-components.test.ts` | ✅ erweitern (07-01, 07-03) |
| SEO-02 | Title/H1/Description = Keyword-Map für 22 Detailseiten + /app; Kopfwort-Regel | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ Phase-7-Fall neu (07-06-T3, 07-07-T2) |
| SEO-02/D-11 | JSON-LD: Breadcrumb 3 Ebenen, FAQPage = sichtbare FAQ, WebPage; /app MobileApplication ohne Bewertungen | unit | `npx vitest run tests/schema.test.ts tests/funktionsdetails.test.ts tests/app-seite.test.ts` | ❌ W0 (07-01-T2, 07-04-T3, 07-07-T2) |
| DESIGN-02 | nur v2-Bausteine + F1/F2; Server Components; Snippet nur 8 Seiten | unit + e2e | `npx vitest run tests/funktionskopf.test.ts tests/funktionsdetails.test.ts`; `… funktionsdetails.pw.cjs -g "Kennzeichnung"` | ❌ W0 (07-04, 07-08) |
| D-13 | data-source nur Kurzform | unit + e2e + live | `npx vitest run tests/design-v2-components.test.ts tests/home.test.ts tests/styleguide.test.ts`; live-check | ✅ anpassen (07-01), live (07-09) |
| D-14 | keine leere Scrollbar-Rinne ohne Überlauf auf /impressum, /datenschutz, 404 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs funktionsdetails.pw.cjs -g "Gutter:"` | ❌ W0 (07-08-T2) |
| D-15 | Above-the-fold 360×640 (alle 23), axe 5 Breiten, CLS 0, reduced motion, ohne JS | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs funktionsdetails.pw.cjs -g "Detailseite:\|App-Seite:"` | ❌ W0 (07-08-T1) |
| D-16 | Live-Stand, IndexNow, SE-Ranking-Abgleich, Messung | live/script | `node scripts/live-check.mjs`; `npm run indexnow`; `node scripts/se-ranking-sync.mjs --check`; `node scripts/seo-report.mjs --etappe rollout-phase07` | ✅ erweitern (07-09) |

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 07-01-T1 | 01 | 1 | MEDIA-01, DESIGN-02 | T-07-02 | Statusnamen nur mit Release-Beleg | unit (TDD) | `cd craftos && npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/design-v2-frames.test.ts tests/styleguide.test.ts && npm run typecheck && npm run lint` | ✅ erweitern | ⬜ pending |
| 07-01-T2 | 01 | 1 | DESIGN-02, SEO-02 | T-07-01, T-07-03 | data-source nur Kurzform; JSON-LD ohne erfundene Bewertungen | unit (TDD) | `cd craftos && npx vitest run tests/schema.test.ts tests/design-v2-components.test.ts tests/home.test.ts tests/styleguide.test.ts tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint` | ❌ W0 (schema.test.ts im Task) | ⬜ pending |
| 07-02-T1 | 02 | 2 | FEAT-02, SEO-02 | T-07-04, T-07-05, T-07-06 | neue Funktionen nur mit Release-Beleg; keine Doppelungen; keine Überclaims in Zielwerten | unit (TDD) | `cd craftos && npx vitest run tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts tests/product-register.test.ts tests/design-v2-budgets.test.ts tests/keyword-map.test.ts tests/content.test.ts tests/llms.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint` | ✅ anpassen | ⬜ pending |
| 07-02-T2 | 02 | 2 | FEAT-02 (D-12) | T-07-05 | Links nur auf gültige Slugs | unit | `cd craftos && npx vitest run tests/content.test.ts tests/llms.test.ts tests/announcements.test.ts && npm run typecheck` | ✅ | ⬜ pending |
| 07-02-T3 | 02 | 2 | FEAT-02 | T-07-05 | Menü/Zwei-Klick ohne tote Links | unit + e2e + live (lokal) | volle Suite, `npm run test:e2e` und `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` gegen 3100 | ✅ anpassen | ⬜ pending |
| 07-03-T1 | 03 | 3 | MEDIA-01 | T-07-07, T-07-08 | Kurzform im HTML, Labels nur aus Release | unit (TDD) | `cd craftos && npx vitest run tests/design-v2-frames.test.ts tests/styleguide.test.ts tests/product-register.test.ts tests/design-v2-components.test.ts tests/home.test.ts && npm run typecheck && npm run lint` | ✅ erweitern | ⬜ pending |
| 07-03-T2 | 03 | 3 | MEDIA-01, DESIGN-02 | T-07-07 | Kennzeichnung je Rahmen | unit + e2e + Sichtprüfung | volle Suite, `npm run test:e2e` gegen 3100, visual-audit /funktionen | ✅ anpassen | ⬜ pending |
| 07-04-T1 | 04 | 4 | FEAT-02, SEO-02 | T-07-10, T-07-12 | server-only Builder; Wortregeln gegen Überclaims | unit (TDD) | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/funktionsgruppen.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint` | ❌ W0 (funktionsdetails.test.ts im Task) | ⬜ pending |
| 07-04-T2 | 04 | 4 | FEAT-02, DESIGN-02, MEDIA-01 | T-07-13 | keine Client-Insel; CTA ohne Login-Tracking | unit (TDD) | `cd craftos && npx vitest run tests/funktionskopf.test.ts tests/design-v2-components.test.ts tests/home.test.ts tests/styleguide.test.ts && npm run typecheck && npm run lint` | ❌ W0 (funktionskopf.test.ts im Task) | ⬜ pending |
| 07-04-T3 | 04 | 4 | FEAT-02, SEO-02, DESIGN-02 | T-07-11 | FAQPage = sichtbare FAQ, JsonLd-Escaping | unit (TDD) + build | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/funktionskopf.test.ts tests/home.test.ts && npm test && npm run typecheck && npm run lint && npm run build` | ✅ (aus T1) | ⬜ pending |
| 07-05-T1 | 05 | 5 | FEAT-02, MEDIA-01 | T-07-14, T-07-16 | belegte FAQ, keine Preisliterale | unit (TDD) | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 07-05-T2 | 05 | 5 | FEAT-02 | T-07-14 | Terminplanung ohne Überclaim (Planung im Web) | unit (TDD) | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/announcements.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 07-05-T3 | 05 | 5 | FEAT-02, MEDIA-01 | T-07-14, T-07-15 | keine Rechtsberatung, keine Offline-Zusage | unit (TDD) + build | `cd craftos && npx vitest run tests/funktionsdetails.test.ts && npm test && npm run typecheck && npm run lint && npm run build` | ✅ | ⬜ pending |
| 07-06-T1 | 06 | 6 | FEAT-02 | T-07-18 | Mahnen nur auf Wunsch; Rollen belegt | unit (TDD) | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 07-06-T2 | 06 | 6 | FEAT-02 | T-07-18 | Bankabgleich ohne „automatisch“/Online-Banking | unit (TDD) | `cd craftos && npx vitest run tests/funktionsdetails.test.ts && npm test && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 07-06-T3 | 06 | 6 | FEAT-02, SEO-02, MEDIA-01 | T-07-17, T-07-19, T-07-20 | Rollen gegen Release; Grenzen erhalten; Client-JS nur 8 Seiten | unit + e2e + script + Sichtprüfung | volle Suite, `npm run test:e2e`, `route-audit.mjs`, `live-check.mjs` gegen 3100, visual-audit 22 Detailseiten | ✅ erweitern | ⬜ pending |
| 07-07-T1 | 07 | 7 | FEAT-03, MEDIA-01 | T-07-21, T-07-23 | Offline nur mit Einschränkung; Preise nur aus tarife | unit (TDD) | `cd craftos && npx vitest run tests/app-seite.test.ts tests/product-register.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts && npm run typecheck && npm run lint` | ❌ W0 (app-seite.test.ts im Task) | ⬜ pending |
| 07-07-T2 | 07 | 7 | FEAT-03, SEO-02, DESIGN-02 | T-07-22, T-07-24 | MobileApplication ohne Bewertungen; Kurzformen | unit + e2e + live (lokal) + Sichtprüfung | volle Suite, `npm run test:e2e`, `live-check.mjs` gegen 3100, visual-audit /app | ✅ (aus T1) | ⬜ pending |
| 07-08-T1 | 08 | 8 | FEAT-02, FEAT-03, DESIGN-02 | T-07-25 | Kurzform-Belege im Browser geprüft | e2e (Sammlung) | `cd craftos && npm run lint && npx playwright test -c tests/e2e/playwright.config.cjs --list funktionsdetails.pw.cjs` | ❌ W0 (funktionsdetails.pw.cjs + testMatch im Task) | ⬜ pending |
| 07-08-T2 | 08 | 8 | FEAT-02, FEAT-03 (D-14, D-15) | T-07-26, T-07-27 | nur lokal; Scroll-Lock ohne Regression | e2e | volle Suite, `npm run test:e2e` gegen 3100 (inkl. „Gutter:“, „Detailseite:“, „App-Seite:“) | ✅ (aus T1) | ⬜ pending |
| 07-09-T1 | 09 | 9 | alle | T-07-28, T-07-32 | keine Geheimnisse, keine internen Pfade | gate (unit + e2e + script) | volle Suite, `sync:product:check`, `check-no-secrets.mjs`, `npm run test:e2e`, `route-audit.mjs`, `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | ✅ erweitern | ⬜ pending |
| 07-09-T2 | 09 | 9 | FEAT-02, FEAT-03, MEDIA-01 (ROADMAP-Kriterium 3) | T-07-29, T-07-30, T-07-31, T-07-33 | kein Cloud-CI, Deployment geprüft, ehrlicher Status | script (live) | `cd craftos && node scripts/live-check.mjs` gegen https://craftos.eu plus Inhaltsprüfung von docs/releases/PHASE-07-ROLLOUT.md | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

Sampling-Kontinuität: Jeder Task hat einen automatisierten Verify-Befehl; es gibt keine drei aufeinanderfolgenden Tasks ohne automatisierte Prüfung. Wave-0-Dateien werden jeweils im ersten Task ihres Plans per TDD (rot → grün) angelegt.

---

## Wave 0 Requirements

- [ ] `craftos/tests/schema.test.ts` — webPageSchema, mobileApplicationSchema (07-01-T2)
- [ ] `craftos/tests/funktionsdetails.test.ts` — Builder, Vorlage, Inhalte, ERWARTET, Rollen gegen Release (07-04-T1; erweitert 07-04-T3, 07-05, 07-06)
- [ ] `craftos/tests/funktionskopf.test.ts` — FunktionsKopf, PlattformRollen, BentoTile data-zusatz (07-04-T2)
- [ ] `craftos/tests/app-seite.test.ts` — /app Inhalte, Abdeckung, Struktur, Schema (07-07-T1/T2)
- [ ] Phase-7-Fälle in `craftos/tests/keyword-map.test.ts` (07-06-T3 Detailseiten, 07-07-T2 /app)
- [ ] `craftos/tests/e2e/funktionsdetails.pw.cjs` + `testMatch`-Eintrag (07-08-T1; Gutter-Fall 07-08-T2)
- [ ] Anpassungen Bestand: `funktionsgruppen.test.ts`, `funktionen-seite.test.ts`, `navigation.test.ts`, `product-register.test.ts`, `design-v2-budgets.test.ts`, `design-v2-frames.test.ts`, `design-v2-components.test.ts`, `home.test.ts`, `styleguide.test.ts`, `home-navigation.pw.cjs`, `design-v2.pw.cjs` (07-01 bis 07-08)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gesamteindruck „strukturiert, schön, wenig Text“ der Detailseiten und /app | FEAT-02, FEAT-03, DESIGN-02 | ästhetisches Urteil | Screenshots 360/390/768/1024/1440 (Chromium/WebKit) aus dem Sitzungs-Scratchpad (Ordner 07-03, 07-06 (alle 22 Seiten Chromium 360/1440, Stichprobe volles Raster), 07-07, 07-09) sichten; Befunde an den Executor zurückgeben |
| Analytics `trial_click`/`ai_visit` nach Rollout | Rollout-Regel | Vercel Web Analytics nur mit Inhaberzugang zuverlässig nach 24 h | Anleitung in PHASE-07-ROLLOUT.md §7 |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** planned 2026-10-21 (Wave-0-Dateien werden in 07-01-T2, 07-04-T1/T2, 07-07-T1, 07-08-T1 angelegt)
