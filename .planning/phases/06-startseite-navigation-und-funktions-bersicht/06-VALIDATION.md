---
phase: 6
slug: startseite-navigation-und-funktions-bersicht
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-21
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Quelle: 06-RESEARCH.md „Validation Architecture“.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 5.0.0 (node, Alias `@`), Playwright 1.63.0 + axe 4.13.0 |
| **Config file** | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch` – neue Specs eintragen) |
| **Quick run command** | `cd craftos && npx vitest run tests/funktionsgruppen.test.ts tests/home.test.ts tests/keyword-map.test.ts && npm run typecheck` |
| **Full suite command** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build`, danach `node node_modules/next/dist/bin/next start -p 3100 & SRV=$!` → `npm run test:e2e` → `kill $SRV` |
| **Estimated runtime** | Quick ~30 s; Full ~10–15 min |

---

## Sampling Rate

- **After every task commit:** Quick run command (betroffene Vitest-Dateien + typecheck)
- **After every plan wave:** Full suite command (ein schwerer Prozess, Koordinationsstatus vorher lesen; Server nur über eigene PID beenden)
- **Before `/gsd-verify-work`:** Full suite + `route-audit` + `live-check` lokal + Sichtprüfung `/`, `/funktionen` (Chromium/WebKit, 360–1440)
- **Max feedback latency:** 60 s (Quick)

---

## Requirement → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists |
|--------|----------|-----------|-------------------|-------------|
| DESIGN-01 | H1 mit „Handwerkersoftware“, CTA „10 Tage kostenlos testen“ → `site.ctaUrl`, Produktdarstellung sichtbar ohne Scrollen bei 360×640, 390×844, 768×1024, 1024×768, 1440×900 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs home-navigation.pw.cjs -g "Above the fold"` | ❌ W0 |
| DESIGN-01 | 6–8 Abschnitte nach Hero, je ≤ 1 h2, Lead genau 1 Satz, Budgets | unit | `npx vitest run tests/home.test.ts` | ❌ W0 |
| DESIGN-01/D-13 | CLS 0, Bildbudget, keine Animationen bei reduced motion auf `/`, `/funktionen` | e2e | `design-v2.pw.cjs` (Routen ergänzen) | ✅ erweitern |
| DESIGN-02 | v2-Bausteine auf `/` und `/funktionen` | unit | `npx vitest run tests/home.test.ts tests/funktionsgruppen.test.ts` | ❌ W0 |
| DESIGN-03 | Menümodell = Gruppenmodell = Register; jede href existiert | unit | `npx vitest run tests/funktionsgruppen.test.ts` | ❌ W0 |
| DESIGN-03 | Zwei-Klick für jede Live-Funktion (Desktop + Mobil), Ziele HTTP 200 | e2e | `… home-navigation.pw.cjs -g "Zwei Klicks"` | ❌ W0 |
| DESIGN-03 | Tastatur (Enter/Esc/Fokus), Touch, Außenklick, Breakpoint-Reset, Scroll-Lock | e2e | `navigation.pw.cjs` (umgeschrieben) | ✅ anpassen |
| DESIGN-03 | Ohne JavaScript nutzbar (1440, 390) | e2e | `… -g "ohne JavaScript"` | ❌ W0 |
| DESIGN-03 | axe ohne serious/critical, Menü offen und zu | e2e | `… -g "axe"` | ❌ W0 |
| FEAT-01 | 30 Einträge in 6 Gruppen, feste Reihenfolge, je Visual + 1 Satz ≤ 100 Z., Badges belegt, Gruppenanker | unit | `npx vitest run tests/funktionsgruppen.test.ts` | ❌ W0 |
| FEAT-01/D-10 | JSON-LD `/funktionen`: BreadcrumbList + ItemList | unit | dto. | ❌ W0 |
| SEO-02/D-12/D-19 | ausgegebener Title, H1, Description von `/`, `/funktionen` = Keyword-Map-Ziel | unit | `npx vitest run tests/keyword-map.test.ts tests/seo-brand.test.ts` | ✅ erweitern |
| Tracking | Login `data-track="login"`, CTAs auf `site.ctaUrl` | unit + e2e | `npx vitest run tests/tracking.test.ts` + E2E-DOM-Prüfung | ✅ / ❌ |
| D-16 | `data-evidence` nur Kurzform `web:`/`app:` | unit + e2e | `design-v2-frames.test.ts`, `design-v2.pw.cjs` | ✅ anpassen |
| Bestand | Literal-/Ankündigungs-/Paritäts-Scans mit neuen Dateien grün | unit | `npx vitest run tests/pricing-parity.test.ts tests/announcements.test.ts` | ✅ anpassen |
| Rollout | Status/H1/Canonical aller Sitemap-URLs, Live-Prüfungen | script | `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`; `node scripts/live-check.mjs` | ✅ |

*Per-Task-Zuordnung siehe unten.*

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-T1 | 01 | 1 | FEAT-01 | unit (TDD) | `cd craftos && npx vitest run tests/design-v2-budgets.test.ts tests/content.test.ts tests/product-register.test.ts && npm run typecheck` | ✅ erweitern | ⬜ pending |
| 06-01-T2 | 01 | 1 | FEAT-01, DESIGN-03 | unit (TDD) | `cd craftos && npx vitest run tests/funktionsgruppen.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts && npm run typecheck && npm run lint` | ❌ W0 (im Task angelegt) | ⬜ pending |
| 06-02-T1 | 02 | 2 | DESIGN-02 | unit (Regression) | `cd craftos && npx vitest run tests/styleguide.test.ts tests/design-v2-budgets.test.ts tests/design-v2-frames.test.ts tests/design-v2-components.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ pending |
| 06-02-T2 | 02 | 2 | DESIGN-02 (D-16) | unit (TDD) | `cd craftos && npx vitest run tests/design-v2-frames.test.ts tests/styleguide.test.ts && npm run typecheck` | ✅ anpassen | ⬜ pending |
| 06-02-T3 | 02 | 2 | DESIGN-02 (E1/E2, D-18, D-20) | unit (TDD) + e2e | Vitest components/frames, Build, dann `npx playwright test --config tests/e2e/playwright.config.cjs design-v2.pw.cjs` gegen 3100 | ✅ erweitern | ⬜ pending |
| 06-03-T1 | 03 | 3 | DESIGN-03 | unit (TDD) | `cd craftos && npx vitest run tests/navigation.test.ts tests/funktionsgruppen.test.ts && npm run typecheck && npm run lint` | ❌ W0 (im Task angelegt) | ⬜ pending |
| 06-03-T2 | 03 | 3 | DESIGN-03 (D-06, D-13, D-17) | unit + build | `cd craftos && npx vitest run tests/navigation.test.ts tests/tracking.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint && npm run build` | ✅ | ⬜ pending |
| 06-03-T3 | 03 | 3 | DESIGN-03 | e2e | volle Suite, dann `npm run test:e2e` gegen 3100 (navigation.pw.cjs, home-navigation.pw.cjs „Menü:“, „ohne JavaScript:“, „axe:“) | ❌ W0 (home-navigation.pw.cjs + testMatch) | ⬜ pending |
| 06-04-T1 | 04 | 4 | DESIGN-01 | unit (TDD) | `cd craftos && npx vitest run tests/home.test.ts tests/announcements.test.ts && npm run typecheck` | ❌ W0 (im Task angelegt) | ⬜ pending |
| 06-04-T2 | 04 | 4 | DESIGN-01, DESIGN-02, SEO-02 | unit | `cd craftos && npx vitest run tests/home.test.ts tests/seo-brand.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts tests/design-v2-budgets.test.ts && npm run typecheck && npm run lint` | ✅ anpassen | ⬜ pending |
| 06-04-T3 | 04 | 4 | DESIGN-01, SEO-02 (D-12, D-20) | unit + e2e | volle Suite, dann `npm run test:e2e` gegen 3100 („Above the fold:“, design-v2 Budget/CLS für /) | ✅ erweitern | ⬜ pending |
| 06-05-T1 | 05 | 5 | FEAT-01, DESIGN-02, SEO-02 | unit (TDD) | `cd craftos && npx vitest run tests/funktionen-seite.test.ts tests/funktionsgruppen.test.ts tests/announcements.test.ts tests/content.test.ts && npm run typecheck && npm run lint` | ❌ W0 (im Task angelegt) | ⬜ pending |
| 06-05-T2 | 05 | 5 | DESIGN-03, FEAT-01, SEO-02 | unit + e2e + script | volle Suite, dann `npm run test:e2e` („Zwei Klicks:“, „Funktionsübersicht:“, design-v2 /funktionen) und `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | ✅ erweitern | ⬜ pending |
| 06-06-T1 | 06 | 6 | alle | gate (unit + e2e + script) | volle Suite, `npm run test:e2e`, `route-audit.mjs` und `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` gegen 3100 | ✅ erweitern | ⬜ pending |
| 06-06-T2 | 06 | 6 | alle (ROADMAP-Kriterium 4) | script (live) | `cd craftos && node scripts/live-check.mjs` gegen https://craftos.eu plus Inhaltsprüfung von docs/releases/PHASE-06-ROLLOUT.md | ✅ | ⬜ pending |

Sampling-Kontinuität: Jeder Task hat einen automatisierten Verify-Befehl; es gibt keine drei aufeinanderfolgenden Tasks ohne automatisierte Prüfung. Wave-0-Dateien werden jeweils im ersten Task ihres Plans per TDD (rot → grün) angelegt.

---

## Wave 0 Requirements

- [ ] `craftos/tests/navigation.test.ts` — DESIGN-03 Menümodell/Zielprüfung (06-03-T1)
- [ ] `craftos/tests/funktionen-seite.test.ts` — FEAT-01 Seite/Schema (06-05-T1)

- [ ] `craftos/tests/funktionsgruppen.test.ts` — DESIGN-03, FEAT-01 (06-01-T2)
- [ ] `craftos/tests/home.test.ts` — DESIGN-01/02 (06-04-T1/T2)
- [ ] `craftos/tests/keyword-map.test.ts` — Fall „Phase-6-Seiten folgen den Zielwerten“ (06-04-T3, 06-05-T2)
- [ ] `craftos/tests/e2e/home-navigation.pw.cjs` + `testMatch`-Eintrag (06-03-T3; erweitert in 06-04-T3, 06-05-T2)
- [ ] Anpassungen `seo-brand.test.ts`, `pricing-parity.test.ts`, `navigation.pw.cjs`, `function-illustrations.pw.cjs` (Startseitenfall), `design-v2.pw.cjs`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gesamteindruck „strukturiert, schön, wenig Text“ | DESIGN-01 | ästhetisches Urteil | Screenshots 360/390/768/1024/1440 (Chromium/WebKit) von `/` und `/funktionen` sichten |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** planned 2026-10-21 (Wave-0-Dateien werden in 06-01-T2, 06-03-T1/T3, 06-04-T1, 06-05-T1 angelegt)
