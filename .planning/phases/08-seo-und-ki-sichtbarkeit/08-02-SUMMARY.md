---
phase: 08-seo-und-ki-sichtbarkeit
plan: 02
subsystem: brotkrumen-und-schema
tags: [brotkrumen, breadcrumblist, json-ld, v2-baustein, d-07, d-22, c1, c10, c11]
requires:
  - phase: 08-01
    provides: seo-audit.mjs mit Regel breadcrumbs, breadcrumbNav-Prüfung nav[aria-label="Brotkrumen"]
provides:
  - craftos/lib/breadcrumbs.ts (crumbsFor(path, current?) – einzige Kettenquelle, assertCrumbCount)
  - craftos/components/v2/Breadcrumbs.tsx (+ .module.css) – sichtbare Brotkrumen und genau eine BreadcrumbList
  - TEXT_BUDGET Phase 8 (answer, sectionHeader.answerLead, faq.answerCentral, fitPanel, factList, og, crumb, count.fitPoints/factList/crumbs)
  - FunktionsKopf-Props crumbs/crumbsSchema, FunktionenHead-Prop crumbs, PageHero-Props crumbs?/crumbsSchema?, LegalShell-Prop crumbs
  - DESIGN-V2.md § 12 aufgehoben (C1), § 17.3 Brotkrumen mit Kaskade
affects: [08-03, 08-04, 08-05, 08-06, 08-07, 08-08, 08-09, 08-10, 08-11, 08-12, 08-13, 08-14, phase-09, phase-10]
tech-stack:
  added: []
  patterns:
    - "Eine Kettenquelle crumbsFor(path) für sichtbare Brotkrumen und BreadcrumbList; Seiten rufen breadcrumbSchema nie mehr direkt auf"
    - "Kopf-Bausteine nehmen crumbs entgegen und setzen die Zeile selbst (Abstände 8/16/24 oben, 16/24/32 zur Eyebrow/H1)"
    - "noindex-Musterseiten zeigen Bausteine mit schema={false} bzw. crumbsSchema={false}"
key-files:
  created:
    - craftos/lib/breadcrumbs.ts
    - craftos/components/v2/Breadcrumbs.tsx
    - craftos/components/v2/Breadcrumbs.module.css
    - craftos/tests/breadcrumbs.test.ts
  modified:
    - craftos/components/v2/budgets.ts
    - craftos/components/funktionen/FunktionsKopf.tsx
    - craftos/components/funktionen/FunktionsKopf.module.css
    - craftos/components/funktionen/FunktionsDetail.tsx
    - craftos/components/funktionen/FunktionenHead.tsx
    - craftos/components/funktionen/FunktionenHead.module.css
    - craftos/components/ui/PageHero.tsx
    - craftos/components/content/ContentIndex.tsx
    - craftos/components/content/ArticlePage.tsx
    - craftos/components/calculators/CalculatorPage.tsx
    - craftos/components/calculators/Calculators.module.css
    - craftos/components/legal/Legal.tsx
    - craftos/app/app/page.tsx
    - craftos/app/funktionen/page.tsx
    - craftos/app/gewerke/page.tsx
    - craftos/app/gewerke/[slug]/page.tsx
    - craftos/app/support/page.tsx
    - craftos/app/preise/page.tsx
    - craftos/app/vergleich/page.tsx
    - craftos/app/fakten-ueber-craftos/page.tsx
    - craftos/app/craft-ai/page.tsx
    - craftos/app/gobd/page.tsx
    - craftos/app/rechner/stundensatz/page.tsx
    - craftos/app/rechner/angebotskalkulation/page.tsx
    - craftos/app/agb/page.tsx
    - craftos/app/datenschutz/page.tsx
    - craftos/app/impressum/page.tsx
    - craftos/app/styleguide/page.tsx
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/funktionskopf.test.ts
    - craftos/tests/funktionsdetails.test.ts
    - craftos/tests/app-seite.test.ts
    - craftos/tests/funktionen-seite.test.ts
    - craftos/tests/styleguide.test.ts
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "08-02: Artikelketten haben 3 Glieder (Start › Ratgeber|Hilfe › Artikeltitel) laut UI-SPEC-Tabelle § 1; die frühere Schema-Zwischenstufe Kategorie entfällt, die Kategorie bleibt als Eyebrow sichtbar"
  - "08-02: crumbsFor verlangt für /blog/[slug] und /hilfe/[slug] den Artikeltitel als current (sonst Fehler); alle anderen Namen kommen aus Tabelle, lib/funktionen, lib/gewerke und content-types"
  - "08-02: Mengenfehler über eigenes assertCrumbCount mit dem UI-SPEC-Text „Breadcrumbs: {n} Glieder – 2 bis 4 erlaubt.“ (assertCount hätte einen anderen Wortlaut), Grenzen aus TEXT_BUDGET.count.crumbs"
  - "08-02: PageHero und /styleguide – Muster-Brotkrumen mit crumbsSchema={false}; FunktionsKopf/FunktionenHead/LegalShell verlangen crumbs als Pflicht-Prop"
requirements-completed: []
duration: 62min
completed: 2026-10-22
---

# Phase 8 Plan 02: Brotkrumen sitewide Summary

**Sichtbare Brotkrumen als v2-Baustein mit einer Kettenquelle (`crumbsFor`) auf allen 130 indexierten Seiten außer `/`, jede mit genau einer daraus erzeugten BreadcrumbList; alle neun alten Schema-Stellen ersetzt, Phase-8-Textbudgets definiert, `seo-audit --only=breadcrumbs` sitewide 0 Verstöße.**

## Performance

- **Duration:** ca. 62 min
- **Started:** 2026-10-22T14:48Z
- **Completed:** 2026-10-22T15:51Z
- **Tasks:** 3 (Task 1 und 2 mit RED- und GREEN-Commit)
- **Files modified:** 39 (4 neu, 35 geändert)

## Accomplishments

- `lib/breadcrumbs.ts`: feste Tabelle der statischen Ketten (UI-SPEC § 1, inkl. der künftigen vier Alternativen-Seiten und „Für kleine Betriebe“), Namen dynamischer Segmente aus `lib/funktionen.ts`, `lib/gewerke.ts` und den Kategorien; Fehlertexte wörtlich aus dem UI-SPEC.
- `components/v2/Breadcrumbs.tsx`: Server Component, `nav[aria-label="Brotkrumen"][data-tone]` › `ol` › `li`, Zwischenglieder `next/link`, letztes Glied `span[aria-current="page"]`, `ChevronRight` 16 px `aria-hidden`, `<JsonLd data={breadcrumbSchema(items)} />` nur bei `schema !== false`; Budget `crumb.name` ≤ 32 für Zwischenglieder.
- Dunkle Köpfe: `FunktionsKopf` (22 Detailseiten, `/app`), `FunktionenHead` (`/funktionen`), `PageHero` (Gewerke, Support, Preise, Vergleich, Fakten, Craft AI, GoBD, Blog/Hilfe-Übersichten und Kategorien). Helle Köpfe: `ArticlePage` (Rücklink entfällt, C11), `CalculatorPage` (alte „Brotkrümelnavigation“ entfällt, C10), `LegalShell` (Rechtsseiten, Rechtstext unverändert).
- Entfernte Schema-Stellen (9): `FunktionsDetail`, `app/app`, `app/funktionen`, `app/gewerke/[slug]`, `ContentIndex`, `/vergleich`-`@graph`, `ArticlePage`, beide Rechner-`@graph` (WebApplication bleibt).
- `TEXT_BUDGET` um die Phase-8-Felder G1–G7 erweitert (einmalig für 08-03 bis 08-12).
- DESIGN-V2.md: § 12 „aufgehoben durch Phase 8 (C1, D-22)“, neuer § 17.3 mit Kaskade, Baustein, Positionen und Artikelketten.

## Kaskade (Projekt-CLAUDE.md)

- **frontend-design:** Leitlinie read-only gelesen (Strukturmittel tragen Information; dezente Ortsangabe, kein Amber, keine Pillen).
- **ui-ux-pro-max** `"breadcrumb navigation seo" --domain ux`: Sticky Navigation (Medium) übernommen, **Breadcrumbs „erst ab 3 Ebenen“ (Low) bewusst überstimmt** (D-07/D-22/SEO-05), Back Button (High) übernommen.
- **21st.dev:** `21st_magic_component_inspiration` in dieser Sitzung nicht verfügbar – nicht abgerufen, nichts behauptet.
- **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs`, keine offenen API-Fragen.

## Prüfergebnisse

- Vitest gesamt (`npx vitest run`): **33 Dateien, 564 Tests grün** (vorher 547; neu u. a. `breadcrumbs.test.ts` mit Ketten aller Sitemap-Pfade, Markup, Schema-Gleichheit, PageHero-/ContentIndex-Seiten).
- `npm run typecheck`, `npm run lint`: grün (nach jedem Task).
- `npm run build`: grün (zweimal; Koordinationsstatus vorher gelesen – kein Website-Rezept → lokal, einzeln).
- `node scripts/seo-audit.mjs --only=breadcrumbs`: **131 von 131 Sitemap-URLs, 0 Verstöße, Exit 0** (Baseline 08-01: 140 Verstöße auf 130 Seiten).
- `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`: 131 Routen, 0 Fehler, 0 defekte Links, OG 200/200/200.
- `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs`: 46 OK, Exit 0 (BreadcrumbList 3 auf Detailseiten, 2 auf `/app`).
- `npm run test:e2e`: Lauf 1 (2 Worker) 290 bestanden / 3 fehlgeschlagen, Lauf 2 (2 Worker, nach CSS-Korrektur) 291 / 2, Lauf 3 (`--workers=1`) **292 bestanden / 1 fehlgeschlagen**, je 75 übersprungen. Die Fehlschläge sind zeitabhängige WebKit-Fälle ohne Bezug zu den Brotkrumen (siehe Abweichungen); jeder besteht einzeln.
- Sichtprüfung (`scripts/visual-audit.mjs`, 8 Routen × 5 Breiten × 2 Engines = 80 Seiten): 0 Statusfehler, 0 Überlauf, 0 JS-Fehler; axe nur ein Bestandsbefund auf `/impressum` (Textlink im Rechtstext, siehe deferred-items). Messung der Kopfzeile: `<ol>` 44 px hoch, „Start“ 44 × 44 px, alle Links 44 px hoch, eine Zeile bei 360/390 px mit Ellipse nur am letzten Glied, kein horizontaler Scroll; Farben dunkel #BCBCC6/#F4F4F5, hell #62626E/#17171C; Abstand Brotkrumen → H1 auf den Rechnern exakt 16 (360) bzw. 32 px (1440).
- Screenshots: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-02/` (24 ganzseitige Aufnahmen Chromium 360/1440 und WebKit 390 plus Kopfausschnitte `kopf-*.png`); keine PNG im Git-Status.
- Server jeweils mit eigener PID gestartet und beendet; Port 3100 am Ende frei, keine eigenen Prozesse mehr aktiv.

## Task Commits

1. **Task 1: crumbsFor, Breadcrumbs-Baustein, Phase-8-Budgets** – `2b0a8f1` (test, RED), `4a956d3` (feat, GREEN)
2. **Task 2: Dunkle Köpfe verdrahten, Schema-Stellen ersetzen** – `c4a3c0f` (test, RED), `3180dc6` (feat, GREEN)
3. **Task 3: Helle Köpfe, Rechtsseiten, Rechner-@graph, DESIGN-V2, Läufe** – `abf0b1a` (feat)

## Decisions Made

- Artikelketten mit 3 Gliedern laut UI-SPEC-Tabelle; die Kategorie-Zwischenstufe der alten Artikel-BreadcrumbList (4 Glieder) entfällt bewusst, damit sichtbare Kette und Schema identisch sind und die Zeile bei 360 px einzeilig bleibt.
- `crumbsFor` verlangt den Artikeltitel als `current`; `ArticlePage` übergibt `a.title`, Tests lesen die Titel per `getContentList`.
- Eigenes `assertCrumbCount` statt `assertCount`, weil der UI-SPEC-Fehlertext („{n} Glieder – 2 bis 4 erlaubt.“) vom generischen Mengenfehler abweicht; Grenzen aus `TEXT_BUDGET.count.crumbs`.
- `/styleguide` zeigt den Baustein als Muster im PageHero mit `crumbsSchema={false}` (weiterhin kein JSON-LD).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Rechner-Kopf: Bestandsregel überschrieb den Abstand oben**
- **Found during:** Task 3 (Sichtprüfung, Messung Brotkrumen-Oberkante 101 statt 83 px bei 360 px)
- **Issue:** In `Calculators.module.css` setzte `@media (max-width: 640px) { .hero { padding-top: 1.6rem } }` den UI-SPEC-Abstand (8 px) außer Kraft; daneben stand die tote Regel `.breadcrumbs`.
- **Fix:** Beide Altregeln entfernt; oberer Abstand jetzt 8/16/24 px wie auf allen Köpfen (gemessen).
- **Files modified:** craftos/components/calculators/Calculators.module.css (nicht in der Dateiliste des Plans, aber für C10 nötig)
- **Commit:** abf0b1a

**2. [Rule 1 - Bug] Fokusfarbe der Brotkrumen auf Rechnerseiten**
- **Issue:** `.page a:focus-visible` der Rechner (höhere Spezifität) hätte die Fokusfarbe #BB7609 durch die Rechner-Tintenfarbe ersetzt.
- **Fix:** Fokusregel im Baustein als `.nav .link:focus-visible`.
- **Commit:** abf0b1a

**3. [Rule 2 - Test] Zusätzliche Abdeckung der PageHero-/ContentIndex-Seiten**
- Behavior von Task 2 verlangt Brotkrumen und genau eine BreadcrumbList für alle PageHero-Aufrufer und ContentIndex; dafür rendert `breadcrumbs.test.ts` zehn Seiten (Gewerke, Gewerk-Detail, Support, Preise, Vergleich inkl. `@graph`, Fakten, Craft AI, GoBD, `/blog`, `/hilfe/kategorie/rechnungen`) und vergleicht mit `crumbsFor`. `styleguide.test.ts` prüft das Muster ohne JSON-LD.
- **Commit:** c4a3c0f

### Abweichungen von Akzeptanzkriterien (begründet)

- **`npm run test:e2e` 0 failed nicht erreicht.** Drei volle Läufe mit 3, 2 und 1 Fehlschlag in jeweils anderen zeitabhängigen WebKit-Fällen (`function-illustrations.pw.cjs:443` Handyansicht dashboard/angebot, `:281` Tab-Sichtbarkeitswechsel, `home-navigation.pw.cjs:501` Animationsprüfung auf `/funktionen`). Ursachen gemessen: WebKit startet nach der Hydration mehrere hundert `tab-size`-Übergänge auf FeatureCards/MiniUi (ca. 2 s, unter Last länger als das 3-s-Poll-Fenster) bzw. Phasenrennen der Snippet-Animation. Alle Fälle bestehen einzeln (Tab-Sichtbarkeit 5/5 mit `--repeat-each=5`), keiner berührt Brotkrumen. Nach dem Grenzwert für Wiederholungen nicht weiter gelaufen; in `deferred-items.md` mit Vorschlag für Phase 10 (QA-05) festgehalten.
- Commit-Text `3180dc6` nennt „sieben Schema-Stellen“; tatsächlich ersetzt Task 2 sechs (FunktionsDetail, `/app`, `/funktionen`, Gewerk-Detail, ContentIndex, `/vergleich`), Task 3 die übrigen drei (ArticlePage, zwei Rechner). Summe neun wie geplant.
- E2E-Specs mussten nicht geändert werden: Keine Spec referenziert den alten Rücklink oder „Brotkrümelnavigation“ (grep bestätigt), `browser-functional.pw.cjs` unverändert.

## Issues Encountered

- Ein Hilfsbefehl mit `cat > Datei` wartete auf Eingabe und lief in den Hintergrund; der eigene `cat`-Prozess wurde per PID beendet, die zugehörige Bearbeitung danach mit dem Edit-Werkzeug erledigt.

## Known Stubs

Keine. Die Ketten für die vier Alternativen-Seiten und „Für kleine Betriebe“ stehen bereits in der Tabelle; die Seiten entstehen in späteren Plänen und nutzen dann `crumbsFor`.

## Threat Flags

Keine neue Angriffsfläche: JSON-LD nur über `components/seo/JsonLd` (escaped `<`, T-08-04), Brotkrumen-Pfade nur aus fester Tabelle bzw. Repo-Daten, unbekannter Pfad bricht den Build ab (T-08-05), Rechtsseiten nur Import- und crumbs-Zeile (T-08-06, Diff geprüft).

## User Setup Required

None – no external service configuration required.

## Next Phase Readiness

Folgepläne bauen Köpfe mit `crumbs={crumbsFor(pfad)}` (FunktionsKopf G1, PageHero bis zur Migration) und rufen `breadcrumbSchema` nie direkt auf; die Audit-Regel `breadcrumbs` ist sitewide streng grün und kann in jedem Plan als Gate laufen. Die Phase-8-Budgets stehen in `TEXT_BUDGET`.

---
*Phase: 08-seo-und-ki-sichtbarkeit*
*Completed: 2026-10-22*

## Self-Check: PASSED

Alle vier neuen Dateien und die SUMMARY vorhanden; Commits 2b0a8f1, 4a956d3, c4a3c0f, 3180dc6, abf0b1a im Verlauf.
