---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 04
subsystem: startseite
tags: [startseite, hero, above-the-fold, keyword-map, faq-schema, tdd, vitest, playwright, axe]

# Dependency graph
requires:
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-01: getFunktionsgruppen() (Label, Icon, anchorHref), TEXT_BUDGET.hero und count.homeSections, sentenceCount"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-02: lib/scenes.ts (Kurzform screen), SceneContent/Frame, lib/format.ts, DevicePair layout=compact"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-03: Header/HeaderShell und tests/e2e/home-navigation.pw.cjs"
provides:
  - "craftos/lib/home-content.ts: homeMetadata, hero, HOME_SECTION_IDS, homeSections, keyFactsContent, stepContent, bentoContent, appsContent, faqContent, comparisonContent (Re-Export)"
  - "craftos/components/home/HomeHero.tsx (+ .module.css): Keyword-H1 mit data-keyword, Lead, Test-CTA, Sekundärlink, DevicePair compact"
  - "craftos/app/page.tsx: Startseite aus Hero und sieben data-home-section-Abschnitten mit FAQPage-JSON-LD"
  - "craftos/tests/home.test.ts: describe „Startseiteninhalte“ und „Startseite gerendert“"
  - "craftos/tests/keyword-map.test.ts: Fall „Phase-6-Seiten folgen den Zielwerten (D-12)“ mit Liste PHASE6_SEITEN"
  - "craftos/tests/e2e/home-navigation.pw.cjs: „Above the fold:“-Tests (fünf Breiten, ruhige Seite, axe)"
  - "craftos/docs/DESIGN-V2.md §14: Kaskade Startseite mit Messwerten"
affects: [06-05 /funktionen (PHASE6_SEITEN ergänzen, .feature-grid entfernen), 06-06 Rollout und Abschluss DESIGN-01, Phase 10 QA]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Seiteninhalte als budgetgeprüftes Datenmodul (lib/home-content.ts) mit Quelltext-Literalprüfung"
    - "Anpassungen von v2-Bausteinen an die Abschnittsfläche als unlayered Regeln über data-home-section, weil Tailwind-Utilities in @layer utilities gegen CSS-Module verlieren"
    - "Above-the-fold-Messung per setViewportSize in einem Desktop-Projekt mit Messbericht als Annotation"

key-files:
  created:
    - craftos/lib/home-content.ts
    - craftos/components/home/HomeHero.tsx
    - craftos/components/home/HomeHero.module.css
    - craftos/tests/home.test.ts
  modified:
    - craftos/app/page.tsx
    - craftos/app/globals.css
    - craftos/tests/seo-brand.test.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/tests/e2e/function-illustrations.pw.cjs
    - craftos/docs/DESIGN-V2.md
  deleted:
    - craftos/components/home/Hero.tsx

key-decisions:
  - "06-04: Startseite = Hero + 7 Abschnitte aus v2-Bausteinen; Texte nur in lib/home-content.ts, Werte nur aus site/tarife/Register; FeatureSnippet, GoBD-Box, Ratgeber-Block und alte PricingTable entfallen auf / (Zielseiten bleiben)"
  - "06-04: H1 unter 400 px Fensterbreite 28 px (auch bei 390 px) – Plan-Grenze statt widersprüchlicher UI-SPEC-Notiz „390 nutzt 32 px“"
  - "06-04: Flächenanpassungen der Bausteine (Lead auf Amber #46381F, Amber-Bühne ohne Innenabstand) als unlayered CSS in globals.css über data-home-section"
  - "06-04: Abschluss-Abschnitt als div[data-home-section] um CtaBand, damit keine verschachtelten section-Landmarken entstehen"

patterns-established:
  - "Phase-6-Seiten: Title/H1/Description werden per PHASE6_SEITEN gegen keyword-map.json geprüft"
  - "Startseiten-Abschnitte: höchstens eine H2 je data-home-section, per renderToString geprüft"

requirements-completed: []

# Metrics
duration: 22min
completed: 2026-10-21
---

# Phase 6 Plan 04: Neue Startseite Summary

**Startseite mit Keyword-H1 „Handwerkersoftware, die Büro und Baustelle verbindet“, statischem Plantafel-/Einsätze-Paar oberhalb der Falz in fünf Breiten und sieben v2-Abschnitten (Kennzahlen, Amber-Ablauf, Bento, Apps, Lizenzvergleich, FAQ mit FAQPage-Schema, CTA-Band) – alle Werte aus site.ts, tarife und Produktregister.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-10-21T13:04:26Z
- **Completed:** 2026-10-21T13:26:10Z
- **Tasks:** 3
- **Files modified:** 13 (4 neu, 8 geändert, 1 gelöscht)

## Accomplishments

- `lib/home-content.ts` bündelt alle Startseitentexte wörtlich aus dem 06-UI-SPEC; Testtage nur über `site.trialDays`, Preise über `tarife.find` + `euro`, Sprachen über `mobileLocales`, Stand über `productBasis.checkedAt`; Schritte übernehmen Label, Icon und Anker aus `getFunktionsgruppen()`.
- `HomeHero` (Server Component, ohne Animation): Keyword-Span `nowrap`, `hyphens: manual`, 28 px unter 400 px, `clamp(32px, 4vw, 48px)` darüber; CTA `.v2-btn-cta` mit `data-track="trial"` auf `site.ctaUrl`; `DevicePair layout="compact" tone="dark"`.
- `app/page.tsx`: Metadaten nach Keyword-Map (Title ohne Template, Description 153 Zeichen), sieben `data-home-section` in fester Reihenfolge, FAQPage-JSON-LD aus demselben Array wie `FaqList`; alter Hero, FeatureSnippet-Szenen, `#produktdemo` und 115 Zeilen `.home-*`-CSS entfernt.
- Above-the-fold im Browser gemessen (Chromium und WebKit), D-12-Test für `/`, Animationsprüfung des Menütests wieder für die ganze Seite.

## Task Commits

1. **Task 1: Startseiteninhalte (TDD)** – `4a74c3c` (test, RED), `fd3edf2` (feat, GREEN)
2. **Task 2: HomeHero und neue Startseite** – `fce9ed1` (feat)
3. **Sichtprüfungs-Korrekturen** – `edd1116` (fix)
4. **Task 3: D-12-Test und Above-the-fold-Messung** – `81d1379` (test)
5. **Kaskaden-Nachweis** – `b018d04` (docs)

## Prüfergebnisse

- `npm test`: 24 Dateien, **318/318** grün (darin `tests/home.test.ts` 13 Fälle, `keyword-map.test.ts` 10 Fälle).
- `npm run lint`, `npm run typecheck`, `npm run build` (133 statische Seiten) grün.
- `npm run test:e2e` gegen eigenen `next start -p 3100`: **234 passed, 0 failed, 38 skipped** (projektbedingte Skips), 4,0 min; Port 3100 vorher frei, Server über eigene PID beendet, danach frei.
- Above-the-fold (Unterkante in px, Chromium; WebKit ±23 px):

| Viewport | H1 | Lead | CTA | Produkt ab | Browser bis | Phone | Kennzeichnung bis | H1-Größe |
|---|---|---|---|---|---|---|---|---|
| 360 × 640 | 191 | 279 | 351 | 435 (≤ 460) | 629 | 565–903 | 930 | 28 px, 3 Zeilen |
| 390 × 844 | 191 | 279 | 351 | 435 | 647 (≤ 844) | ab 583 | 949 | 28 px, 3 Zeilen |
| 768 × 1024 | 193 | 265 | 345 | 377 | 738 | 401–740 | 767 | 32 px, 2 Zeilen |
| 1024 × 768 | 285 | 385 | 465 | 139 | 349 | 163–501 | 529 | 40,96 px, 3 Zeilen |
| 1440 × 900 | 347 | 419 | 499 | 149 | 464 | 173–511 | 539 | 48 px, 3 Zeilen |

  In allen Breiten: Keyword in einem ClientRect und schmaler als die H1, `scrollWidth − innerWidth ≤ 1`, CTA auf `https://app.craftos.eu` mit `data-track="trial"`, `document.getAnimations()` leer, alle Rahmen gekennzeichnet, alle `data-evidence` in Kurzform, axe ohne serious/critical.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Tailwind-Arbitrary-Varianten wirkten nicht auf Bausteine**
- **Found during:** Sichtprüfung nach Task 2
- **Issue:** `[&_header>p]:text-[#46381f]` und `lg:[&>header]:mb-6` liegen in `@layer utilities` und verlieren gegen die unlayered CSS-Module; der Lead auf Amber blieb `#62626E` (≈ 3,7:1, unter AA).
- **Fix:** Unlayered Regeln über `[data-home-section="ablauf"|"apps"]` in `app/globals.css`; zusätzlich Amber-Bühne der `StepFlow` auf der Amber-Fläche ohne Innenabstand (Schritte fluchten mit dem Kopf).
- **Files modified:** craftos/app/globals.css, craftos/app/page.tsx
- **Commit:** edd1116

**2. [Rule 1 - Bug] Browserrahmen der dunklen Bento-Kachel zu schmal**
- **Found during:** Sichtprüfung nach Task 2
- **Issue:** Im zentrierenden Visual-Container schrumpfte der Rahmen auf 280 px und schnitt die dritte Rechnungszeile ab; große leere dunkle Fläche.
- **Fix:** Browser-Visual auf der Startseite in `div.w-full`; Hero-Lead zusätzlich `text-wrap: pretty`.
- **Files modified:** craftos/app/page.tsx, craftos/components/home/HomeHero.module.css
- **Commit:** edd1116

### Bewusste Abweichungen

- **H1 bei 390 px 28 px statt 32 px:** Das 06-UI-SPEC nennt „< 400 px: 28 px“ und zugleich „390 px nutzt 32 px“; umgesetzt ist die im Plan wörtlich verlangte Grenze 400 px (mehr Reserve für das ungetrennte Keyword). Alle 390-Kriterien sind erfüllt.
- **Kennzahl „10 Tage“ mit geschütztem Leerzeichen** (wie Musterseite); der Test vergleicht entsprechend. FAQ-Antwort 2, CTA und Description nutzen normale Leerzeichen.
- **Abschluss als `div[data-home-section="abschluss"]`** um `CtaBand`, weil `CtaBand` selbst die `section` mit `aria-labelledby` rendert.

## Issues Encountered

- Ein Python-Heredoc-Aufruf blieb auf stdin hängen; der eigene Prozess wurde per PID beendet, die beabsichtigte Änderung (next/link für den Sekundärlink) war korrekt angewendet.

## Deferred Issues

- `/styleguide` Block 3 zeigt denselben schmalen Browserrahmen in der dunklen Bento-Kachel (BentoGrid zentriert das Visual); außerhalb des Plans nicht geändert.

## Known Stubs

Keine.

## Threat Flags

Keine neuen Oberflächen; T-06-12 bis T-06-15 sind durch JsonLd-Escaping, Literalprüfung (pricing-parity + home.test), Kurzform-Belege und CTA-Attributprüfung abgedeckt.

## Next Phase Readiness

- Plan 06-05 ergänzt `PHASE6_SEITEN` um `/funktionen` und entfernt `.feature-grid/.feature-link`.
- Screenshots (nicht eingecheckt): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/home-<chromium|webkit>-<360|390|768|1024|1440>.png`.

## Self-Check: PASSED
