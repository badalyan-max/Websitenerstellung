---
phase: 08-seo-und-ki-sichtbarkeit
plan: 03
subsystem: v2-bausteine
tags: [v2-bausteine, antwort-zuerst, comparison-table, fitpanels, factlist, g1-g5, c2-c5]
requires:
  - phase: 08-02
    provides: TEXT_BUDGET-Phase-8-Felder (answer, sectionHeader.answerLead, faq.answerCentral, fitPanel, factList, count.fitPoints/factList), FunktionsKopf mit Brotkrumen-Zeile
provides:
  - FunktionsKopf G1 – visual optional (einspaltig), answer als <p id="antwort" data-answer>, stand-Zeile, Fehler bei lead + answer
  - SectionHeader G2 – Frage-Titel → Antwort-Lead ≤ 300, 1–2 Sätze, data-answer; Nicht-Frage-Lead ≤ 140 und genau 1 Satz jetzt erzwungen
  - FaqList C3 – answerMax={300} prüft faq.answerCentral
  - ComparisonTable G3 – sources (ol „Quellen zur Tabelle“, https-Pflicht, rel=nofollow, nach Anbieter gruppiert, germanDate) und disclaimer
  - FitPanels G4 (neu) – zwei gleichrangige Panels, Quellenpflicht Panel 1 (abschaltbar), Budgets
  - FactList G5 (neu) – dl mit 6–12 Paaren, Budgets, optionale Note
  - /styleguide-Muster für G1, G3, G4, G5 mit neutralen Beispieldaten; DESIGN-V2.md § 17.4
affects: [08-07, 08-08, 08-09, 08-10, 08-11, 08-12, 08-13]
tech-stack:
  added: []
  patterns:
    - "Antwort-zuerst technisch erzwungen: Kopf (answer), Frage-H2 (SectionHeader), FAQ (answerMax) werfen beim Rendern"
    - "Externe Quellenlinks nur https, rel=nofollow, gleicher Tab, Linktext = Quellen-Label (T-08-07)"
    - "Vergleichsmuster auf der Musterseite nur mit „Anbieter A/B“ und https://example.com"
key-files:
  created:
    - craftos/components/v2/FitPanels.tsx
    - craftos/components/v2/FitPanels.module.css
    - craftos/components/v2/FactList.tsx
    - craftos/components/v2/FactList.module.css
  modified:
    - craftos/components/funktionen/FunktionsKopf.tsx
    - craftos/components/funktionen/FunktionsKopf.module.css
    - craftos/components/v2/SectionHeader.tsx
    - craftos/components/v2/FaqList.tsx
    - craftos/components/v2/ComparisonTable.tsx
    - craftos/components/v2/ComparisonTable.module.css
    - craftos/lib/styleguide-content.ts
    - craftos/app/styleguide/page.tsx
    - craftos/tests/funktionskopf.test.ts
    - craftos/tests/design-v2-components.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/styleguide.test.ts
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "08-03: /styleguide Block 0 ist jetzt ein FunktionsKopf ohne Visual mit answer und stand (ersetzt PageHero), damit die Musterseite genau eine H1 behält; Brotkrumen weiter mit crumbsSchema={false}"
  - "08-03: FitPanels-Quellenlink zeigt „Quelle“ (UI-SPEC § 3.5) und trägt das Quellen-Label als sr-only-Zusatz (U10: Linktext = Quelle-Label für Screenreader)"
  - "08-03: FactList ab 768 px Begriff | Definition im Verhältnis 1 : 2 (Lücke 24), Zeilen mit 1-px-Linien #E7DCC9"
  - "08-03: ComparisonTable prüft zusätzlich das ISO-Format von abgerufenAm; FunktionsKopf ohne lead und answer wirft „FunktionsKopf: lead oder answer angeben.“"
requirements-completed: []
duration: 33min
completed: 2026-10-22
---

# Phase 8 Plan 03: Bausteinergänzungen G1–G5 Summary

**Antwort-zuerst ist jetzt in FunktionsKopf (`#antwort`, Stand-Zeile, Kopf ohne Visual), Frage-SectionHeadern (`data-answer`, ≤ 300) und FaqList (`answerMax={300}`) technisch erzwungen; ComparisonTable belegt Angaben mit Quellenliste und Disclaimer, die neuen Server Components FitPanels und FactList stehen budgetgeprüft auf /styleguide.**

## Performance

- **Duration:** ca. 33 min
- **Started:** 2026-10-22T15:55Z
- **Completed:** 2026-10-22T16:28Z
- **Tasks:** 2 (je RED- und GREEN-Commit)
- **Files modified:** 18 (4 neu, 14 geändert)

## Accomplishments

- **G1 FunktionsKopf:** `visual?` optional – ohne Visual kein Produktbereich, `data-layout="einspaltig"`, Textspalte ≤ 800 px, Kopf unten 48/64/64 px; `answer?` (≤ 300, 1–2 Sätze) rendert `<p id="antwort" data-answer>` direkt nach der H1 (16/400 bzw. 20/400 ab 768 px, `#F4F4F5`, 60ch); `stand?` als Label-Zeile 14/400 `#BCBCC6` 8 px darunter, Stand → CTA 24 px. Fehlertext bei `lead` + `answer` wörtlich aus dem UI-SPEC. Bestandsköpfe (22 Detailseiten, `/app`) unverändert.
- **G2 SectionHeader:** Titel auf „?“ → Lead ist Antwort (`sectionHeader.answerLead` ≤ 300, 1–2 Sätze, `data-answer`); sonst ≤ 140 und genau ein Satz (bisher nur dokumentiert, jetzt geprüft). Sammeltest über 25 Bestandsseiten grün.
- **C3 FaqList:** `answerMax?: 300` prüft zusätzlich `faq.answerCentral`; Markup identisch.
- **G3 ComparisonTable:** `sources` als `<ol aria-label="Quellen zur Tabelle">` 16 px unter der Note, gruppiert nach Anbieter, „{Anbieter}: {Label}, abgerufen am TT.MM.JJJJ“ (`germanDate`), Links `rel="nofollow"`, gleicher Tab, nur `https://`; `disclaimer` als Zeile darunter (`data-disclaimer`). Zellbudget 24 und `CellValue` unverändert; ohne `sources` identisches Markup.
- **G4 FitPanels (neu):** zwei identisch gestaltete `article` in einer Liste (Wettbewerber zuerst), ab 768 px 2 × gleich breit mit 24 px Lücke, darunter 16 px; Titel h3 20/600, Punkte 16/400 mit `Check` 16 px, Link „Quelle“ 14/400 ink-500. Budgets 40/100, 2–4 Punkte, genau ein Satz, Quellenpflicht für Panel 1 (`quellenPflicht={false}` für `/gobd`), https-Pflicht. Keine Amber/Grün/Rot-Markierung.
- **G5 FactList (neu):** `<dl>` mit `div` je Paar, Begriff 16/600, Definition 16/400, < 768 px untereinander (4 px), ab 768 px 1 : 2 (24 px Lücke); Budgets 32/200, höchstens 2 Sätze, 6–12 Einträge.
- **/styleguide:** Block 0 = FunktionsKopf ohne Visual mit Antwort und Stand; Marktübersicht mit Quellen und Disclaimer im ComparisonTable-Block; neue Blöcke FitPanels (Warmfläche) und FactList (Werte aus `lib/site.ts`/Register); noindex, kein JSON-LD, genau eine H1.
- **DESIGN-V2.md § 17.4** mit Kaskade, Tabelle G1–G5 (Zweck, Budget, Fundstelle), Musterseite und Prüfung.

## Kaskade (Projekt-CLAUDE.md)

- **frontend-design:** Leitlinie read-only gelesen – Struktur trägt Information, keine Einzelwort-Hervorhebung, keine Empfehlungsmarke; beide Passt-Panels bewusst identisch.
- **ui-ux-pro-max** `"saas comparison alternative page pricing" --domain ux`: Image Optimization (High) und Active State (Medium) nicht betroffen. `"comparison table pricing faq" --domain landing`: Reihenfolge Tabelle → FAQ → CTA übernommen; **Produkt-Hervorhebung in Gelb/Grün und „most popular“-Badge bewusst überstimmt** (D-02, UWG § 6, C5).
- **21st.dev:** `21st_magic_component_inspiration` in dieser Sitzung nicht verfügbar – nicht abgerufen, nichts behauptet.
- **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs`, keine offenen API-Fragen.

## Prüfergebnisse

- Vitest gesamt nach Task 1: **33 Dateien, 581 Tests grün**. Nach Task 2: **598 von 599 grün**; einziger Fehlschlag `pricing-parity.test.ts` „Snapshot ist aktuell“ (Web-Repo `origin/release` um 17:56 auf `1e9c8bc288dc` vorgerückt, Snapshot `535206b42aac`) – unabhängig von 08-03, in `deferred-items.md` eingetragen.
- Plan-Verify-Dateien (`funktionskopf`, `design-v2-components`, `design-v2-budgets`, `funktionsdetails`, `app-seite`, `home`, `styleguide`, `design-v2-frames`): grün.
- `npm run typecheck`, `npm run lint`: grün (nach jedem Task).
- `npm run build`: grün (Koordinationsstatus vorher gelesen – kein Website-Rezept → lokal, einzeln).
- `npm run test:e2e` (voller Lauf, 2 Worker): **285 bestanden, 8 fehlgeschlagen, 75 übersprungen**. Davon 2 neu und behoben (`design-v2.pw.cjs:144` ohne JavaScript, Chromium und WebKit: Strict-Mode-Verletzung durch die zweite Tabelle) – danach `design-v2.pw.cjs` komplett **60 bestanden, 0 fehlgeschlagen**. Die übrigen 6 sind die bekannten zeitabhängigen WebKit-Fälle aus 08-02 (`function-illustrations.pw.cjs:443` webkit-1440 ×5, `home-navigation.pw.cjs:501` webkit-390-touch); Einzelwiederholung **8/8 und 1/1 bestanden**.
- Sichtprüfung `scripts/visual-audit.mjs` für `/styleguide` (5 Breiten × 2 Engines): Status 200, Seitenbreite = Viewport in allen 10 Läufen, 0 JS-Fehler, **axe 0 Befunde**; gemeldeter Element-Überlauf bei 360/390 betrifft nur die Bestandstabelle innerhalb ihres eigenen Scrollbereichs. Messung: H1 → Antwort 16 px, Antwort → Stand 8 px, Stand → CTA 24 px, Antwort 16 px (360/390) bzw. 20 px (1440) in `#F4F4F5`, Textspalte 800 px bei 1440, Kopf unten 48/64 px, kein Produktbereich; Panels 628 + 24 + 628 px (1440) bzw. gestapelt mit 16 px Innenabstand; FactList 4 px untereinander bzw. 24 px nebeneinander; Note → Quellenliste 16 px.
- Screenshots: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-03/` (ganzseitig Chromium 360/1440 und WebKit 390 sowie Ausschnitte `ausschnitt-*-{kopf,tabelle,fitpanels,factlist}.png`); keine PNG im Git-Status.
- Server mit eigener PID 2148 gestartet (Kommandozeile geprüft) und beendet; Port 3100 danach frei, keine eigenen Prozesse mehr aktiv.

## Task Commits

1. **Task 1: Antwort-zuerst-Bausteine** – `1691319` (test, RED), `bdd8327` (feat, GREEN)
2. **Task 2: ComparisonTable G3, FitPanels G4, FactList G5, Styleguide, Läufe** – `7cab5a4` (test, RED), `c0f7938` (feat, GREEN)

## Decisions Made

- Block 0 der Musterseite ist jetzt der FunktionsKopf ohne Visual (statt PageHero), damit G1 sichtbar ist und die Seite genau eine H1 behält; PageHero bleibt auf den Bestandsseiten unverändert.
- FitPanels-Link „Quelle“ mit sr-only-Zusatz „: {Label}“ verbindet § 3.5 (sichtbarer Text „Quelle“) mit U10 (Linktext = Quelle-Label).
- FactList-Spaltenverhältnis 1 : 2 ab 768 px (UI-SPEC nennt nur „zwei Spalten, Lücke 24“).
- Zusätzliche Prüfungen: ISO-Format von `abgerufenAm` (ComparisonTable), Fehler bei FunktionsKopf ohne `lead` und `answer`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] E2E-Fall „ohne JavaScript sind alle Bausteine im HTML sichtbar“ an zweite Tabelle angepasst**
- **Found during:** Task 2 (voller E2E-Lauf)
- **Issue:** `page.locator('[data-block="ComparisonTable"] table')` fand nach dem neuen Muster zwei Tabellen (Playwright-Strict-Mode).
- **Fix:** `toHaveCount(2)` plus Sichtbarkeit beider Tabellen; zusätzlich 3 Quelleneinträge, 2 Panels und 6 Begriffe geprüft; `FitPanels` und `FactList` in `BLOCKS` aufgenommen (auch für den Reduced-Motion-Fall).
- **Files modified:** `craftos/tests/e2e/design-v2.pw.cjs` (nicht in `files_modified` des Plans)
- **Commit:** `c0f7938`

**2. [Rule 1 - Bug] Testregex für Links traf `<article>`**
- **Found during:** Task 2 GREEN
- **Issue:** `/<a[^>]*>…<\/a>/` erfasste auch `<article …>`; präzisiert auf `/<a\s[^>]*>…/`.
- **Files modified:** `craftos/tests/design-v2-components.test.ts`
- **Commit:** `c0f7938`

**3. Abweichung von der Dateiliste:** `SectionHeader.module.css` blieb unverändert – die Typo des Antwort-Leads (20/400) entspricht bereits dem Bestands-Lead, der Plan sah die Änderung nur „falls abweichend“ vor.

---

**Total deviations:** 2 auto-fixed (2 × Rule 1), 1 dokumentierte Auslassung.
**Impact on plan:** Keine Erweiterung des Umfangs; nur Testanpassungen an die geplante zweite Mustertabelle.

## Issues Encountered

- `pricing-parity.test.ts` „Snapshot ist aktuell“ wurde während der Ausführung rot, weil das Web-Repo `origin/release` vorrückte (siehe deferred-items.md, Abschnitt 08-03). Nicht behoben (außerhalb des Plans, Produktsync nötig).

## Known Stubs

Keine. Die Beispieldaten der Musterseite (Anbieter A/B, example.com) sind beabsichtigt (Plan: neutrale Beispieldaten auf der noindex-Seite).

## Threat Flags

Keine neuen Flächen über das Threat-Register hinaus; T-08-07 (nur https, `rel="nofollow"`, Linktext = Quellen-Label) und T-08-08 (nur React-Textknoten, kein `dangerouslySetInnerHTML`, Budgets) sind in ComparisonTable und FitPanels umgesetzt und getestet.

## Next Phase Readiness

- 08-07 bis 08-13 können Köpfe ohne Visual (`answer`, `stand`), Frage-Abschnitte, `answerMax`, belegte Tabellen, FitPanels und FactList direkt nutzen.
- Offen für den Produktsync: Snapshot-Abgleich gegen `origin/release` `1e9c8bc288dc`.

## Self-Check: PASSED

- Dateien vorhanden: FitPanels.tsx, FitPanels.module.css, FactList.tsx, FactList.module.css, 08-03-SUMMARY.md.
- Commits vorhanden: 1691319, bdd8327, 7cab5a4, c0f7938.
