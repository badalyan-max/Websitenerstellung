---
phase: 08-seo-und-ki-sichtbarkeit
plan: 13
subsystem: qa-e2e-seo-audit
tags: [e2e, playwright, axe, above-the-fold, seo-audit-gesamt, antwort-zuerst, reduced-motion, webkit]
requires: ["08-12"]
provides:
  - "tests/e2e/vergleich.pw.cjs – Browserprüfungen aller zehn Phase-8-Seiten (36 Fälle, 20 aktiv je Lauf)"
  - "Strenges Post-Build-Audit sitewide 0 Verstöße (136 URLs, 12 Regeln)"
  - "FaqList answerMax={300} auf /, /app und allen Funktionsdetailseiten (C3)"
  - "Reduzierte Bewegung ohne Übergänge (WebKit-Fall home-navigation:501 an der Ursache behoben)"
affects: ["08-14"]
tech-stack:
  added: []
  patterns:
    - "Phase-8-E2E nach Muster funktionsdetails.pw.cjs: externe Request-Sperre, severeAxe, Kopfmessung über [data-funktions-kopf]"
    - "Längster Hilfe-/Ratgeberartikel für die Brotkrumen-Stichprobe wird zur Laufzeit aus Sitemap und Server-HTML ermittelt"
    - "FeatureCard-Raster mit grid-cols-1 statt impliziter auto-Spur"
key-files:
  created:
    - craftos/tests/e2e/vergleich.pw.cjs
  modified:
    - craftos/tests/e2e/playwright.config.cjs
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/app/page.tsx
    - craftos/app/app/page.tsx
    - craftos/components/funktionen/FunktionsDetail.tsx
    - craftos/scripts/visual-audit.mjs
    - craftos/scripts/performance-audit.mjs
    - craftos/lib/seiten/craft-ai.ts
    - craftos/lib/seiten/fakten.ts
    - craftos/app/craft-ai/page.tsx
    - craftos/app/gobd/page.tsx
    - craftos/app/globals.css
    - craftos/app/funktionen/page.tsx
    - craftos/app/styleguide/page.tsx
    - craftos/components/v2/FeatureCard.module.css
    - craftos/eslint.config.mjs
    - craftos/tests/kernseiten.test.ts
    - craftos/tests/design-v2-components.test.ts
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "08-13: /craft-ai „Wer entscheidet bei Craft AI?“ (id wer-entscheidet) und Kachel „Sie bestätigen jede Buchung“ statt Verneinungen; Fakten-KI-Eintrag positiv; GoBD-Zertifizierungsfrage bleibt als Überclaim-Schutz"
  - "08-13: Globale Reduced-Motion-Regel mit transition-duration und transition-delay 0s statt 0.01ms (WebKit erzeugte Hunderte tab-size-Übergänge)"
  - "08-13: FeatureCard-Raster grid-cols-1 unter 768 px; Kartenrahmen unter 362 px nur erste Zeile (wie 1024–1119 px)"
  - "08-13: ESLint ignoriert tests/e2e/reports/** und tests/e2e/artifacts/** (erzeugte Playwright-Berichte)"
requirements-completed: []
metrics:
  duration: 59min
  completed: 2026-10-22
  tasks: 2
  files: 22
---

# Phase 8 Plan 13: Browserprüfungen Phase 8 und strenges Gesamt-Audit Summary

Alle zehn Phase-8-Seiten sind im Browser abgesichert (Fold, Brotkrumen, axe, CLS, Antwort zuerst, ohne JS, Quellenlinks), das ungefilterte Post-Build-Audit meldet sitewide 0 Verstöße in allen zwölf Regeln, und die Inhabervorgabe „nur Unterstütztes“ ist auf /craft-ai und /fakten-ueber-craftos umgesetzt. Der WebKit-Fall `home-navigation.pw.cjs:501` ist an der Ursache behoben.

## Ergebnisse

**Post-Build-Audit** `node scripts/seo-audit.mjs` (ohne Optionen, 136 von 136 Sitemap-URLs, Exit 0): title 0, description 0, h1 0, keyword 0, map 0, breadcrumbs 0, og 0, faq-schema 0, schema 0, antwort 0, duplikate 0, prompts 0. Prompt-Ziele: 18 Ziele der Phasen 6–8 im Build mit Anker und Antwort ≤ 300; die zwei Phase-9-Ziele (`/gewerke/elektriker`, `/gewerke/maler`) stehen als Pfade in der Keyword-Map.

**Vitest** `npm test`: 816 bestanden, 1 rot – nur der bekannte Fall „Snapshot ist aktuell“ (laut Auftrag nicht angefasst). Lint und Typcheck grün, Build grün.

**E2E** (Port 3100, `next start`):
- Voller Lauf `npm run test:e2e`: 424 Fälle – 326 bestanden, 91 übersprungen (Projektaufteilung), 7 rot (alle `function-illustrations.pw.cjs:443` webkit-1440, siehe Abweichung 3).
- Nach den Fixes wiederholt: function-illustrations, home-navigation, funktionsdetails, design-v2 → 253 bestanden, 71 übersprungen, 0 rot; vergleich, browser-functional, navigation (inkl. home-navigation erneut) → 120 bestanden, 44 übersprungen, 0 rot. Damit alle 424 Fälle im Endstand grün, `home-navigation.pw.cjs:501` in beiden Läufen grün.
- `vergleich.pw.cjs`: 36 gelistete Fälle (9 Tests × 4 Projekte), 20 aktiv, 0 rot. Messwerte 360 × 640: CTA-Unterkante /preise 546, /vergleich 590, plancraft 590, Craftnote 621, HERO 559, ToolTime 535, kleine Betriebe 590 (alle ≤ 640, Chromium und WebKit identisch). Brotkrumen-`ol` 44 px auf allen zehn Seiten sowie auf dem längsten Hilfeartikel (`/hilfe/mobile-offline-synchronisierung`) und Ratgeberartikel (`/blog/offline-baustellen-app`). axe: 0 serious/critical (390 alle Seiten, fünf Breiten Stichprobe). CLS 0 (Chromium; WebKit meldet keine layout-shift-Einträge).

**route-audit** (136 Routen, 0 Fehler, 0 fehlerhafte Links), **live-check** lokal 46 × OK („alle Prüfungen OK“). **visual-audit** der zehn Seiten: 100 Aufnahmen, 0 Statusfehler, 0 Überlauf, 0 JS-Fehler, 0 A11y-Befunde.

## Task Commits

1. **Zusatzauftrag Inhabervorgabe (TDD)** – `057d63c` (test, RED), `0847c69` (feat, GREEN)
2. **Task 1: vergleich.pw.cjs, testMatch, Routenlisten, answerMax** – `a4c80f1`
3. **Task 2: Audit, Browsersuite, Ursachen beheben** – Fix-Commits:
   - `4760af7` (test, RED) / `8458919` (fix) GoBD-Grundlage: BMF-Quellenlinks mit `rel="nofollow"`
   - `8ceed90` (test, RED) / `ced8233` (fix) reduzierte Bewegung ohne Übergänge
   - `ee383d1` (test, RED) / `3dc5ecb` (fix) FeatureCard-Raster `grid-cols-1`
   - `85c293e` (fix) Kartenrahmen unter 362 px nur erste Zeile
   - `6a2b382` (chore) ESLint ignoriert erzeugte Playwright-Berichte
   - `8714919` (docs) DESIGN-V2 § 17.13, deferred-items

## Zusatzaufträge des Orchestrators

1. **fakten.ts / craft-ai.ts positiv:** KI-Eintrag „Craft AI macht Vorschläge und bereitet unterstützte Entwürfe vor; Sie prüfen und bestätigen jede Übernahme.“; Kachel „Sie bestätigen jede Buchung“ – „Craft AI macht Vorschläge; Sie prüfen und bestätigen jede Buchung.“
2. **/craft-ai:** Abschnitt „Wer entscheidet bei Craft AI?“ (`id="wer-entscheidet"`, keine Prompt-Ziele betroffen) mit „Sie entscheiden: Craft AI macht Vorschläge und bereitet Entwürfe vor, Sie prüfen jedes Ergebnis auf Vollständigkeit und Richtigkeit und bestätigen jede Übernahme selbst.“ – der Überclaim-Schutz (Ergebnisse prüfen) bleibt positiv formuliert. Test verbietet „nicht/kein/Nein“ in allen Craft-AI-Texten und „autonom“ in allen drei Kernseiten-Modulen.
3. **/gobd „Ist CraftOS GoBD-zertifiziert? – Nein“** unverändert.
4. **WebKit-Fall `home-navigation.pw.cjs:501`:** Ursache gefunden und behoben (globale Reduced-Motion-Regel, siehe Abweichung 2); Messung danach 0 Übergänge zu jedem Zeitpunkt.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Test] Wortregel-Filter in kernseiten.test.ts**
- `/s/` prüfte den Buchstaben s statt Leerraum (Kommentar: „nur Fließtexte mit Leerzeichen“); korrigiert auf `/\s/`. Dadurch wurde der FactList-Begriff „GAEB und DATANORM“ geprüft; als Überschrift ohne Versionsaussage ausdrücklich zugelassen. Commit `057d63c`.

**2. [Rule 1 – Bug] Reduzierte Bewegung erzeugte Übergänge auf jedem Element**
- **Found during:** Zusatzauftrag 4 (Diagnose /funktionen in WebKit 390)
- **Issue:** `transition-duration: 0.01ms !important` für `*` plus Standard `transition-property: all` → WebKit startete 313 (0 s) bzw. 696 (1 s) `tab-size`-Übergänge mit `startTime` null, erst nach ~3 s beendet; unter Last länger als das Poll-Fenster.
- **Fix:** `transition-duration: 0s !important; transition-delay: 0s !important` (Gesamtdauer 0 → kein Übergang). Animationen unverändert 0,01 ms. Kein Code nutzt `transitionend`.
- **Files:** `app/globals.css`, Kommentar in `tests/e2e/home-navigation.pw.cjs`, Test in `tests/design-v2-components.test.ts`. Commits `8ceed90`, `ced8233`.

**3. [Rule 1 – Bug, durch Fix 2 aufgedeckt] WebKit-Seitenüberlauf nach Größenwechsel**
- **Issue:** `function-illustrations.pw.cjs:443` (webkit-1440) danach 7/7 rot: WebKit behält nach 1440 → 360 px die implizite `auto`-Spur der FeatureCard-Raster mit 410 px (unabhängig von reduzierter Bewegung, Chromium nicht betroffen). Die frühere Übergangsflut hatte den Fehler meist verdeckt (bekannte „kurzzeitige Überläufe“ aus 08-02/08-08).
- **Fix:** `grid-cols-1` auf den drei FeatureCard-Rastern (`/funktionen`, FunktionsDetail „Verwandt“, `/styleguide`). Die Karte ist bei 360 px damit 324 px (Containerbreite) statt 330 px (vorher 6 px über den Container). Folge: Kennzeichnung bricht in der Bühne < 324 px um und schnitt die zweite Rahmenzeile an (`home-navigation.pw.cjs:534`); daher unter 362 px nur die erste Zeile, dieselbe Regel wie 1024–1119 px. Nachmessung 320–390 px auf /funktionen und allen 22 Detailseiten in Chromium und WebKit: 0 angeschnittene Zeilen, kein Überlauf nach Größenwechsel.
- **Commits:** `ee383d1`, `3dc5ecb`, `85c293e`.

**4. [Rule 2 – Prüfmatrix] GoBD-Quellenlinks ohne nofollow**
- Die beiden BMF-Links der Grundlage-Zeile auf `/gobd` hatten kein `rel="nofollow"` (alle übrigen Quellenlinks schon). Ergänzt, Vitest prüft es. Commits `4760af7`, `8458919`.

**5. [Rule 3 – Blocking] ESLint scheiterte an erzeugtem Trace-Viewer**
- Nach dem Lauf mit Fehlschlägen lag `tests/e2e/reports/html/trace` (gitignoriert) vor; `eslint .` meldete 259 Fehler in Fremdcode (Befund aus 08-12). `tests/e2e/reports/**` und `tests/e2e/artifacts/**` in `globalIgnores`. Commit `6a2b382`.

**6. Zusätzliche Abdeckung:** `vergleich.pw.cjs` enthält außer der Prüfmatrix einen Antwort-zuerst-Fall im Browser (`#antwort` direkt nach der H1, FAQ-Antworten ≤ 300) und Fold-Prüfungen in 390/768/1024/1440.

---

**Total deviations:** 4 Auto-Fixes (Rule 1/2), 1 blockierendes Werkzeugproblem, 1 Zusatzabdeckung. **Impact:** Keine neuen Seiten oder Bausteine; zwei globale Korrekturen (Reduced Motion, Kartenraster) mit Tests; keine Datei gelöscht.

## Issues Encountered

- „Snapshot ist aktuell“ weiterhin rot (bekannt; Abgleich durch den Orchestrator vor 08-14).
- Positionsfilter von Playwright sind Regex: `navigation.pw.cjs` trifft auch `home-navigation.pw.cjs` (Wiederholungslauf 2 enthielt die Datei daher erneut, grün).

## Sichtprüfung

Screenshots (nicht im Repo) unter `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-13/`: je Seite `chromium-360-*`, `chromium-1440-*`, `webkit-390-*` (30 Dateien) sowie `fold-*` (360 × 640 bzw. 390 × 844 für HERO-Alternative, /preise, /funktionen-Lagerkarte). Geprüft: /craft-ai 1440 (neuer Abschnitt, Kacheln ohne Silbentrennung), HERO-Alternative 360 (CTA im Fold), /funktionen 360 (Karte bündig im Container, eine Rahmenzeile, Kennzeichnung zweizeilig ohne Überdeckung). Keine offensichtlichen Fehler.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-08-34 (externe Request-Sperre, Quellenlinks nur über Attribute), T-08-35 (Audit ohne Optionen 0, Ursachen behoben, keine Regel abgeschwächt), T-08-36 (alles lokal, kein Push) umgesetzt.

## Next Phase Readiness

- 08-14 (Rollout): Build, Audit, E2E und Paritätstests lokal grün bis auf den Snapshot-Abgleich. Offene Inhaltspunkte (Blog/Hilfe mit verneinter KI-Formulierung) in `deferred-items.md`.

## Self-Check: PASSED
