---
phase: 6
slug: startseite-navigation-und-funktions-bersicht
status: draft
nyquist_compliant: false
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

*Per-Task-Zuordnung wird nach der Planung ergänzt.*

---

## Wave 0 Requirements

- [ ] `craftos/tests/funktionsgruppen.test.ts` — DESIGN-03, FEAT-01
- [ ] `craftos/tests/home.test.ts` — DESIGN-01/02
- [ ] `craftos/tests/keyword-map.test.ts` — Fall „Phase-6-Seiten folgen den Zielwerten“
- [ ] `craftos/tests/e2e/home-navigation.pw.cjs` + `testMatch`-Eintrag
- [ ] Anpassungen `seo-brand.test.ts`, `pricing-parity.test.ts`, `navigation.pw.cjs`, `function-illustrations.pw.cjs` (Startseitenfall), `design-v2.pw.cjs`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gesamteindruck „strukturiert, schön, wenig Text“ | DESIGN-01 | ästhetisches Urteil | Screenshots 360/390/768/1024/1440 (Chromium/WebKit) von `/` und `/funktionen` sichten |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
