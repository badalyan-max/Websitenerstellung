---
phase: 5
slug: produktwahrheit-designsystem-v2-und-medienpipeline
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-20
updated: 2026-10-20
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

- **After every task commit:** Schnelllauf der betroffenen Vitest-Dateien (siehe Per-Task Map); Commits bleiben lokal
- **After every plan wave:** `npm test`, `npm run lint`, `npm run typecheck`
- **Before `/gsd-verify-work`:** Volle Suite + Build + E2E (`npx next start -p 3100`, `npm run test:e2e`) + Routen-Audit (`next start -p 3101`, `node scripts/route-audit.mjs`) + visuelle Prüfung der Musterseite, alles grün (Plan 05-08 Task 1)
- **Before push:** ship-gate einmal über `git diff origin/main...HEAD` (Plan 05-08 Task 2)
- **Max feedback latency:** 120 Sekunden (Ausnahmen: Build-gebundene Prüfungen in 05-02 T2 Routen-Audit, 05-06 T3 und 05-08 T1 – je ein schwerer Prozess)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Verhalten | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-----------|-------------------|-------------|--------|
| 05-01-T1 | 05-01 | 1 | SEO-02 | Seeds inkl. pageCandidates je Sitemap-Pfad, Kostenplan ≤ 30.000 Units, kein Schlüssel im Repo | unit + Skript | `npx vitest run tests/keyword-seeds.test.ts && node scripts/keyword-research.mjs plan && node scripts/check-no-secrets.mjs` | ❌ wird in T1 angelegt | ⬜ pending |
| 05-01-T2 | 05-01 | 1 | SEO-02 | Rohdaten + Manifest ≤ 30.000 Units, jede pageCandidate in export-Rohdatei | Skript | `node -e "<Manifest-/Kandidatenprüfung aus Plan>" && node scripts/check-no-secrets.mjs docs/seo` | ❌ entsteht in T2 | ⬜ pending |
| 05-01-T3 | 05-01 | 1 | SEO-02 | Jede Sitemap-URL genau 1 Eintrag, keine Duplikate, Zahlen belegt, null nur mit is_data_found:false | unit | `npx vitest run tests/keyword-map.test.ts && npm run typecheck` | ❌ wird in T3 angelegt (RED zuerst) | ⬜ pending |
| 05-02-T1 | 05-02 | 1 | PROD-02 | Register auf origin/release mit Tag/Commit/Belegen; Belegpfade existieren am Release-Commit; Kundenportal live | unit | `npx vitest run tests/product-register.test.ts tests/llms.test.ts` | ✅ erweitern (RED zuerst) | ⬜ pending |
| 05-02-T2 | 05-02 | 1 | PROD-04 | Keine Ankündigungen in Quelltext, Hilfe, llms.txt; gerenderte Seiten ohne datierte Ankündigung | unit + Routen-Audit | `npx vitest run tests/announcements.test.ts tests/product-register.test.ts tests/llms.test.ts tests/content.test.ts && npm run typecheck && npm run lint`; zusätzlich `node scripts/route-audit.mjs` gegen Build auf 3101 | ❌ announcements.test.ts in T2; route-audit.mjs ✅ erweitern | ⬜ pending |
| 05-03-T1 | 05-03 | 1 | PROD-03 | Snapshot = origin/release; Paritätstest angelegt | unit + Skript | `npm run sync:product:check && npx vitest run tests/pricing-parity.test.ts -t "Snapshot ist aktuell"` | ❌ wird in T1 angelegt | ⬜ pending |
| 05-03-T2 | 05-03 | 1 | PROD-03 | site.ts/llms.txt/Schema aus Snapshot-Werten | unit | `npx vitest run tests/pricing-parity.test.ts -t "Lizenzen\|Credits\|llms\|Schema" && npx vitest run tests/llms.test.ts tests/seo-brand.test.ts && npm run typecheck` | ✅ nach T1 | ⬜ pending |
| 05-03-T3 | 05-03 | 1 | PROD-03 | Preisanzeigen ohne Literale; Credits/Extra-Speicher auf /preise | unit | `npx vitest run tests/pricing-parity.test.ts tests/llms.test.ts tests/content.test.ts && npm run typecheck && npm run lint` | ✅ nach T1 | ⬜ pending |
| 05-04-T1 | 05-04 | 1 | DESIGN-02, DESIGN-04 | Kaskadennachweis, Tokens, SectionHeader/KeyFacts/CtaBand semantisch, ohne Einblendung | unit | `npx vitest run tests/design-v2-components.test.ts && npm run typecheck && npm run lint` | ❌ wird in T1 angelegt (RED zuerst) | ⬜ pending |
| 05-04-T2 | 05-04 | 1 | DESIGN-02, DESIGN-04 | BentoGrid/StepFlow/FaqList mit Mengenregeln, ohne Keyframes | unit | `npx vitest run tests/design-v2-components.test.ts && npm run typecheck && npm run lint` | ✅ nach T1 | ⬜ pending |
| 05-05-T1 | 05-05 | 1 | DESIGN-02, MEDIA-03 | ComparisonTable/Badges/FeatureCard (nur tier heute)/IllustrationLabel/MediaFigure | unit | `npx vitest run tests/design-v2-frames.test.ts && npm run typecheck && npm run lint` | ❌ wird in T1 angelegt (RED zuerst) | ⬜ pending |
| 05-05-T2 | 05-05 | 1 | MEDIA-03, DESIGN-04 | Rahmen mit evidence + Kennzeichnung, Tabs „Einsätze, Zeiten, Projekte, Mehr“, Mini-UI inert, Budget | unit | `npx vitest run tests/design-v2-frames.test.ts && npm run typecheck && npm run lint` | ✅ nach T1 | ⬜ pending |
| 05-06-T1 | 05-06 | 2 | MEDIA-04, MEDIA-03 | Ausgelieferte Bilder (inkl. dynamischer Pfade) AVIF/WebP/SVG ≤ 150 KB; Galerie gekennzeichnet | unit + Skript | `node scripts/optimize-images.mjs && npx vitest run tests/media-budget.test.ts && npm run typecheck` | ❌ wird in T1 angelegt (RED zuerst) | ⬜ pending |
| 05-06-T2 | 05-06 | 2 | DESIGN-02, MEDIA-03 | /styleguide noindex, nicht in Sitemap/llms; Fakten aus Datenmodulen; Textbudgets | unit | `npx vitest run tests/styleguide.test.ts tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/design-v2-frames.test.ts && npm run typecheck && npm run lint` | ❌ wird in T2 angelegt (RED zuerst) | ⬜ pending |
| 05-06-T3 | 05-06 | 2 | DESIGN-02, DESIGN-04, MEDIA-04 | styleguide 1440/390 + axe; reduzierte Bewegung (getAnimations 0); Budget/CLS auf 7 Routen | e2e | `npm run build` + `next start -p 3100` + `npm run test:e2e -- --grep "styleguide\|reduzierte Bewegung\|Budget"` | ❌ design-v2.pw.cjs + testMatch in T3 | ⬜ pending |
| 05-07-T1 | 05-07 | 2 | SEO-08 | Linkliste mit Status, Browser-Prompts mit Pflichtsätzen, bekannter Stand | unit | `npx vitest run tests/backlink-plan.test.ts` | ❌ wird in T1 angelegt (RED zuerst) | ⬜ pending |
| 05-07-T2 | 05-07 | 2 | SEO-07 | Projekt-Keywords = Hauptkeywords der Map; Limits dokumentiert (sonst SEO-07 offen) | Skript | `node scripts/se-ranking-sync.mjs --check` + Berichtsprüfung + `node scripts/check-no-secrets.mjs docs/seo scripts` | ❌ entsteht in T2 | ⬜ pending |
| 05-07-T3 | 05-07 | 2 | SEO-07 | Messbericht gegen Ausgangsstand 20.10.2026 | Skript | `node scripts/seo-report.mjs` + Inhaltsprüfung des Berichts | ❌ entsteht in T3 | ⬜ pending |
| 05-08-T1 | 05-08 | 3 | PROD-02, PROD-03, PROD-04, MEDIA-04 | Volle Suite, E2E, Routen-Audit, live-check lokal; Register-Commit = Snapshot-Commit | unit + e2e + Skript | `npm test && npm run lint && npm run typecheck && npm run build && npm run sync:product:check && node scripts/check-no-secrets.mjs docs/seo scripts lib tests` | ✅ nach Wellen 1–2 | ⬜ pending |
| 05-08-T2 | 05-08 | 3 | PROD-02, PROD-04, SEO-07 | ship-gate über Gesamtdiff, Push, READY, IndexNow, live-check gegen craftos.eu, Messbericht, Anforderungsstatus | Skript + Live | `node scripts/live-check.mjs && node scripts/check-no-secrets.mjs docs/seo && node -e "<Nachweisprüfung>"` | ✅ nach T1 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

Sampling-Kontinuität: Jeder Task hat einen automatischen Befehl; es gibt keine drei aufeinanderfolgenden Tasks ohne automatische Prüfung.

### Anforderungsstatus nach Phase 5 (Vorgabe für SUMMARY und Rollout-Nachweis)

- Erledigt bei grünen Prüfungen: PROD-02, PROD-03, PROD-04, DESIGN-04, MEDIA-03, MEDIA-04, SEO-08
- „Phase 5 Grundlage, Umsetzung Phasen 6–8“ (nicht Complete): DESIGN-02, SEO-02
- SEO-07: erledigt nur bei leerem `limits[]` im Projektabgleich (Plan 05-07), sonst offen bis zur Inhaberentscheidung zum Tarif

---

## Wave 0 Requirements

Kein separater Wave-0-Plan: Jede fehlende Testdatei wird im ersten Schritt des zuständigen Tasks angelegt und rot ausgeführt, bevor implementiert wird.

- [ ] `craftos/scripts/sync-product-snapshot.mjs` + `craftos/docs/product-pricing-snapshot.json` – PROD-03 (05-03-T1)
- [ ] `craftos/tests/pricing-parity.test.ts` – PROD-03 (05-03-T1)
- [ ] `craftos/tests/announcements.test.ts` – PROD-04 (05-02-T2)
- [ ] Erweiterung `craftos/tests/product-register.test.ts` – PROD-02 (05-02-T1)
- [ ] `craftos/scripts/keyword-research.mjs`, `craftos/tests/keyword-seeds.test.ts` – SEO-02 (05-01-T1); `craftos/lib/keyword-map.ts`, `craftos/tests/keyword-map.test.ts` – SEO-02 (05-01-T3)
- [ ] `craftos/scripts/se-ranking-sync.mjs` – SEO-07 (05-07-T2)
- [ ] `craftos/tests/backlink-plan.test.ts` – SEO-08 (05-07-T1)
- [ ] `craftos/tests/design-v2-components.test.ts` (05-04-T1), `craftos/tests/design-v2-frames.test.ts` (05-05-T1) – DESIGN-02, DESIGN-04, MEDIA-03
- [ ] `craftos/tests/styleguide.test.ts`, `craftos/tests/design-v2-budgets.test.ts` (05-06-T2), `craftos/tests/media-budget.test.ts` (05-06-T1) – DESIGN-02, MEDIA-04
- [ ] `craftos/tests/e2e/design-v2.pw.cjs` **und** Eintrag in `playwright.config.cjs` `testMatch` (05-06-T3)
- [x] `resolveJsonModule` in `craftos/tsconfig.json` – laut Recherche gesetzt (05-03 Interfaces); wird beim ersten JSON-Import geprüft

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Portal-/Fachmedien-Einträge angelegt | SEO-08 | Konten und Firmenangaben liegen beim Inhaber | Inhaber führt Browser-Prompts aus, Statusregister wird nachgetragen; Erfolg in SE Ranking (verweisende Domains) sichtbar |
| Gestalterische Qualität der Musterseite | DESIGN-02 | Ästhetik nicht vollautomatisch prüfbar | Screenshots 1440/390 der `/styleguide` sichten (visual-audit), Inhaber-Feedback |
| Live-Stand nach Push | D-10 | Produktion | `node scripts/live-check.mjs` gegen craftos.eu (llms.txt, /funktionen, /preise, /styleguide noindex, Sitemap), `npm run indexnow` |
| SE-Ranking-Tarif bei Projektlimit | SEO-07 | Kostenentscheidung des Inhabers | Nur falls 05-07 `limits[]` meldet: Inhaber entscheidet über Tarif, danach `se-ranking-sync.mjs --apply` erneut |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 120s (Build-gebundene Ausnahmen benannt)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** planned (Ausführung ausstehend)
