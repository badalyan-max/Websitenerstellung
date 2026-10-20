---
phase: 5
slug: produktwahrheit-designsystem-v2-und-medienpipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-10-20
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Alle Prüfungen ausschließlich lokal (keine GitHub Actions, keine Cloud-Runner).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 5.0.0 (node), Playwright 1.63.0 (Chromium/WebKit, Projekte `*-1440`, `*-390-touch`) |
| **Config file** | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch` – neue E2E-Dateien dort eintragen) |
| **Quick run command** | `cd craftos && npx vitest run <betroffene tests/*.test.ts>` |
| **Full suite command** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build` |
| **Estimated runtime** | ~90 Sekunden Unit/Lint/Typcheck, Build ~120 Sekunden, E2E ~5 Minuten |

---

## Sampling Rate

- **After every task commit:** Schnelllauf der betroffenen Vitest-Dateien
- **After every plan wave:** `npm test`, `npm run lint`, `npm run typecheck`
- **Before `/gsd-verify-work`:** Volle Suite + Build + E2E (`npx next start -p 3100`, `npm run test:e2e`) + Routen-Audit (`next start -p 3101`, `node scripts/route-audit.mjs`) + visuelle Prüfung der Musterseite, alles grün
- **Max feedback latency:** 120 Sekunden

---

## Per-Task Verification Map

Wird vom Planer je Task ergänzt. Anforderungs-Abdeckung aus der Recherche:

| Requirement | Verhalten | Test Type | Automated Command | File Exists | Status |
|-------------|-----------|-----------|-------------------|-------------|--------|
| PROD-02 | Register nennt Release-Tag/Commit/Belegpfade je Plattform | unit | `npx vitest run tests/product-register.test.ts` | ✅ anpassen | ⬜ pending |
| PROD-02 | Belegpfade existieren am Release-Commit (lokal, skip ohne Produkt-Repo) | unit | `npx vitest run tests/product-register.test.ts -t "Belege"` | ❌ W0 | ⬜ pending |
| PROD-02 | `llms.txt` listet nur Live-Funktionen | unit | `npx vitest run tests/llms.test.ts` | ✅ | ⬜ pending |
| PROD-03 | `site.ts` = Preis-Snapshot; llms.txt/Schema abgeleitet; Snapshot = `origin/release` | unit | `npx vitest run tests/pricing-parity.test.ts` | ❌ W0 | ⬜ pending |
| PROD-04 | Keine datierten Ankündigungen / kein „Demnächst“ mit Terminen | unit + Routen-Audit | `npx vitest run tests/announcements.test.ts`; `node scripts/route-audit.mjs` | ❌ W0 | ⬜ pending |
| SEO-02 | Jede Sitemap-URL genau ein Hauptkeyword, keine Duplikate, Zahlen mit Quelle | unit | `npx vitest run tests/keyword-map.test.ts` | ❌ W0 | ⬜ pending |
| SEO-07 | SE-Ranking-Projekt-Keywords = Hauptkeywords der Keyword-Map (Abgleich per Skript) | Skript | `node scripts/se-ranking-sync.mjs --check` (Name vom Planer festzulegen) | ❌ W0 | ⬜ pending |
| SEO-08 | Linkliste mit Status und Browser-Prompts vollständig | unit/doc | `npx vitest run tests/backlink-plan.test.ts` oder Doc-Check | ❌ W0 | ⬜ pending |
| DESIGN-02 | Musterseite `noindex`, nicht in Sitemap/llms | unit | `npx vitest run tests/styleguide.test.ts` | ❌ W0 | ⬜ pending |
| DESIGN-02 | Bausteine rendern bei 1440/390, axe ohne ernsthafte Verstöße | e2e | `npm run test:e2e -- --grep styleguide` | ❌ W0 | ⬜ pending |
| DESIGN-04 | Reduced Motion: alles sichtbar, keine globale Scroll-Animation | e2e | `npm run test:e2e -- --grep "reduzierte Bewegung"` | ❌ W0 | ⬜ pending |
| MEDIA-03 | Darstellungen gekennzeichnet, nur Live-Funktionen | unit + e2e | `npx vitest run tests/styleguide.test.ts`; `npm run test:e2e` | ❌ W0 | ⬜ pending |
| MEDIA-04 | Ausgelieferte Bilder AVIF/WebP ≤ 150 KB, width/height, CLS 0 | unit + e2e | `npx vitest run tests/media-budget.test.ts`; `npm run test:e2e -- --grep Budget` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `craftos/scripts/sync-product-snapshot.mjs` + `craftos/docs/product-pricing-snapshot.json` – PROD-03
- [ ] `craftos/tests/pricing-parity.test.ts` – PROD-03
- [ ] `craftos/tests/announcements.test.ts` – PROD-04
- [ ] Erweiterung `craftos/tests/product-register.test.ts` – PROD-02
- [ ] `craftos/scripts/keyword-research.mjs`, `craftos/lib/keyword-map.ts`, `craftos/tests/keyword-map.test.ts` – SEO-02
- [ ] SE-Ranking-Abgleichskript für Projekt-Keywords – SEO-07
- [ ] `craftos/tests/styleguide.test.ts`, `craftos/tests/media-budget.test.ts` – DESIGN-02, MEDIA-04
- [ ] `craftos/tests/e2e/design-v2.pw.cjs` **und** Eintrag in `playwright.config.cjs` `testMatch`
- [ ] `resolveJsonModule` in `craftos/tsconfig.json` prüfen

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Portal-/Fachmedien-Einträge angelegt | SEO-08 | Konten und Firmenangaben liegen beim Inhaber | Inhaber führt Browser-Prompts aus, Statusregister wird nachgetragen; Erfolg in SE Ranking (verweisende Domains) sichtbar |
| Gestalterische Qualität der Musterseite | DESIGN-02 | Ästhetik nicht vollautomatisch prüfbar | Screenshots 1440/390 der `/styleguide` sichten (visual-audit), Inhaber-Feedback |
| Live-Stand nach Push | D-10 | Produktion | Node-`fetch` gegen craftos.eu (llms.txt, /funktionen, /preise, /styleguide noindex, Sitemap), `npm run indexnow` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
