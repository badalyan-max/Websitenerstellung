---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 08
subsystem: browserpruefungen
tags: [playwright, axe, cls, above-the-fold, reduced-motion, scrollbar-gutter, bento, b10]
requires:
  - phase: 07-06
    provides: alle 22 Detailseiten über die v2-Vorlage
  - phase: 07-07
    provides: /app aus v2-Bausteinen, Phone-Rahmen ohne gekürzte Zeilen
provides:
  - tests/e2e/funktionsdetails.pw.cjs (Detailseite:/App-Seite:/Gutter:-Fälle, Pfade aus /sitemap.xml)
  - testMatch-Eintrag funktionsdetails.pw.cjs
  - BUDGET_ROUTES und Audit-Standardrouten mit /funktionen/mahnwesen und /funktionen/terminplanung
  - B10 große Bento-Kachel mit höhengekoppeltem Phone (BentoGrid.module.css, data-phone-title)
  - scrollbar-gutter nur während des Drawer-Scroll-Locks (D-14 entschieden)
  - FeatureSnippet beendet Animationen bei reduzierter Bewegung statt sie anzuhalten
affects: [07-09, phase-10]
tech-stack:
  added: []
  patterns:
    - "Größenabhängiges Bento-Visual über zwei size-Container (Listenelement und Visual) und --phone-w aus cqh/cqw"
    - "Gutter-Messung mit eigenem Chromium ohne --hide-scrollbars; Rinne über innerWidth minus Body-Breite (clientWidth zeigt sie in Chromium nicht)"
    - "Animationsprüfung wartet per expect.poll auf die Bedingung und meldet Eigenschaft und playState"
key-files:
  created:
    - craftos/tests/e2e/funktionsdetails.pw.cjs
    - .planning/phases/07-funktionsdetailseiten-und-mobile-app-seite/deferred-items.md
  modified:
    - craftos/tests/e2e/playwright.config.cjs
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/scripts/visual-audit.mjs
    - craftos/scripts/performance-audit.mjs
    - craftos/components/v2/BentoGrid.module.css
    - craftos/components/v2/PhoneFrame.tsx
    - craftos/components/feature-snippet/FeatureSnippet.tsx
    - craftos/components/layout/HeaderShell.tsx
    - craftos/app/globals.css
    - craftos/docs/DESIGN-V2.md
    - .planning/phases/07-funktionsdetailseiten-und-mobile-app-seite/07-UI-SPEC.md
key-decisions:
  - "D-14 entschieden: globales scrollbar-gutter entfernt; HeaderShell setzt es nur während des Drawer-Scroll-Locks und nur, wenn eine klassische Scrollleiste Platz belegt (gemessen: 15 px leere Rinne auf der 404-Seite bei 1920 × 1080 in Chromium mit klassischen Leisten)"
  - "B10: Ab 1024 px folgt die Phone-Breite großer Bento-Kacheln der freien Höhe (160–320 px); ab Seitenverhältnis 4:5 Phone und Text nebeneinander, sonst Phone über dem Text; unter 1024 px unverändert"
  - "axe-Fälle prüfen den statischen Zustand (reduzierte Bewegung); gedimmte Zwischenstände der FeatureSnippet-Animation sind dekorativ und als Folgepunkt notiert"
  - "FeatureSnippet: Bei reduzierter Bewegung finish() statt pause(); Pause per Knopf und außerhalb des Sichtbereichs unverändert"
requirements-completed: []
duration: 61min
completed: 2026-10-21
---

# Phase 7 Plan 08: Browserprüfungen Detailseiten und /app, B10, scrollbar-gutter Summary

**Die 22 Detailseiten und /app haben eine eigene Browser-Suite. Sie prüft Above the fold, axe in fünf Breiten, CLS und reduzierte Bewegung, die Kennzeichnung und die Kurzform-Belege, die Snippet-Bindung, die Darstellung ohne JavaScript und die App-Seite. Den Leerraum in großen Phone-Kacheln (B10) habe ich im Baustein behoben: vorher bis 220 px, nachher höchstens 25 px. Die scrollbar-gutter-Frage ist gemessen und entschieden; der Gutter gilt jetzt nur noch während des Drawer-Scroll-Locks. Die volle lokale E2E-Suite ist grün: 293 bestanden, 0 fehlgeschlagen.**

## Performance

- **Dauer:** ca. 61 min (Start 20:15 UTC, Ende 21:17 UTC)
- **Tasks:** 2/2 plus der Nachtrag B10 vom Orchestrator
- **Commits:** 4 Task- bzw. Fix-Commits
- **Dateien:** 2 neu, 11 geändert

## Ergebnisse

### Task 1: funktionsdetails.pw.cjs, testMatch, Budgetrouten, Audit-Skripte
- **`tests/e2e/funktionsdetails.pw.cjs`** ist nach dem Vorbild von `home-navigation.pw.cjs` aufgebaut: externe Requests werden abgebrochen, `severeAxe` filtert, die Desktop-Projekte nutzen `setViewportSize`. Die 22 Detailpfade kommen zur Laufzeit aus `/sitemap.xml` (Prüfung: genau 22), dazu `/app`. Fälle:
  - **„Detailseite: Above the fold bei 360 × 640“** prüft alle 23 Pfade: H1, Lead und CTA liegen zwischen 0 und 640, die H1 hat 28 px, `[data-keyword]` ist genau ein Rechteck und nicht breiter als die H1, kein Querscroll.
  - **„Detailseite: Above the fold Breiten“** prüft angebote, mahnwesen, terminplanung und /app bei 390 × 844, 768 × 1024, 1024 × 768 und 1440 × 900, jeweils mit der Oberkante der Kopf-figure.
  - **axe:** einmal bei 390 für alle 23 Pfade (Touch-Projekt), einmal für die Stichprobe bei 360, 768, 1024 und 1440 (Desktop-Projekt). Beide prüfen den statischen Zustand mit reduzierter Bewegung.
  - **„Detailseite: CLS 0 und reduzierte Bewegung“** prüft alle 23 Pfade in allen vier Projekten. Gezählt wird die layout-shift-Summe ohne recent input (WebKit meldet keine Einträge, das steht als Annotation). `document.getAnimations()` muss leer sein; der Fall wartet per `expect.poll` auf diese Bedingung. Alle Abschnitte müssen sichtbar sein.
  - **„Detailseite: Kennzeichnung und Kurzform-Belege“:** Jede Rahmen- und Snippet-figure trägt die Kennzeichnung. Die Formate sind `data-evidence` `^(web|app):[^\s/]+$` und `data-source` `^(site|register):[A-Za-z0-9.-]+$`. Snippets erscheinen genau auf den 8 Seiten. Die Abschnittsfolge ist kopf … cta, für /app gilt die App-Folge.
  - **„Detailseite: ohne JavaScript“** prüft angebote, terminplanung und /app.
  - **„App-Seite: Store-Links und QR“:** Store-Links bei 390 und 1440, QR-Codes bei 390 und 768 verborgen, bei 1024 und 1440 sichtbar.
- **Weitere Dateien:**
  - `playwright.config.cjs`: `testMatch` enthält `funktionsdetails.pw.cjs`.
  - `design-v2.pw.cjs`: `BUDGET_ROUTES` enthält mahnwesen und terminplanung.
  - `visual-audit.mjs` und `performance-audit.mjs`: Die Standardrouten enthalten beide Seiten, die Bestandsrouten bleiben.

### Nachtrag B10 (Orchestrator-Entscheidung): große Kacheln mit Phone
- **Messung vorher** (`b10.mjs`, 23 Routen × 4 Breiten × 2 Engines, Leerraum = Innenhöhe − Inhalt):
  - /app: lg-Kacheln mit 220 px (1024) und 171–196 px (1440).
  - lager: Nachbarkacheln mit 72–104 px.
  - baudokumentation: Nachbarkacheln mit 73–81 px.
- **Umsetzung in `BentoGrid.module.css`** (nur ab 1024 px, nur bei lg-Kacheln mit Phone):
  - Das Listenelement ist ein size-Container mit 450 px Mindesthöhe und gibt die Rasterzeilen nicht mehr vor.
  - Das Visual ist ein zweiter size-Container. `--phone-w` = `clamp(160px, min(100cqw, (100cqh − Kennzeichnung) · 194/410), 320px)`; für die Kennzeichnung sind 44 px reserviert, nebeneinander 64 px (WebKit braucht 41 bzw. 61 px).
  - Ab Seitenverhältnis 4:5 der Kachel stehen Phone und Text nebeneinander (Text vertikal mittig), sonst steht das Phone über dem Text.
  - Ist das Phone schmaler als 194 px, gilt der Titel des 160-px-Phones. Dafür hat `PhoneFrame` den Haken `data-phone-title`, weil sonst „Abnahmeprotokoll…“ gekürzt würde.
- **Messung nachher:**
  - In den betroffenen Rastern höchstens 25 px (768/1024/1440, Chromium und WebKit), in den lg-Kacheln 0–23 px.
  - Phones: lager/baudokumentation 161–184 px, /app 267–297 px.
  - 0 abgeschnittene Rahmen, 0 Querscroll.
  - Unter 1024 px unverändert 194 px.
- **E2E „Detailseite: große Kacheln mit Phone ohne Leerstreifen (B10)“** prüft lager, baudokumentation und /app bei 768, 1024 und 1440 px: Leerraum ≤ 48 px in der lg-Kachel und ihren Zeilennachbarn, kein Überstand, Rahmen in der Kachel, Phone ≥ 160 px, keine gekürzten Texte im Phone, kein Querscroll.
- **Dokumentation:** B10 steht mit Begründung und Messwerten in der Abweichungstabelle der 07-UI-SPEC und in DESIGN-V2.md § 16 (B1–B10).
- **Design-Kaskade:** Die Lösung folgt der vom Orchestrator freigegebenen Option („Phone-Breite an die verfügbare Höhe koppeln“ bzw. „nebeneinander ab 1024 px“). Neue Gestaltungsmittel gibt es keine: Proportion, Kennzeichnung und Budgets bleiben unverändert.

### Task 2: scrollbar-gutter (D-14) und volle Suite
- **„Gutter: keine leere Rinne ohne Seitenüberlauf“:**
  - Gemessen auf /impressum, /datenschutz und /gibt-es-nicht bei 1440 × 900 und 390 × 844 (Plan), zusätzlich 1920 × 1080 (üblicher Windows-Desktop).
  - Chromium läuft mit eigenem `chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] })`, WebKit mit dem Projektbrowser.
  - Je Messung gibt es einen Screenshot und eine Annotation.
  - Die Rinne wird zweimal gemessen: als `innerWidth − clientWidth` (Plan) und als `innerWidth − Body-Breite`. Chromium meldet die reservierte Rinne nicht in `clientWidth`.
- **Messwerte vorher** (globales `scrollbar-gutter: stable`):

  | Engine | Viewport | /impressum | /datenschutz | /gibt-es-nicht |
  |---|---|---|---|---|
  | Chromium (klassische Leisten) | 1440 × 900 | 15 px, Überlauf ja | 15 px, Überlauf ja | 15 px, Überlauf ja (947 > 900) |
  | Chromium | 390 × 844 | 15 px, Überlauf ja | 15 px, Überlauf ja | 15 px, Überlauf ja |
  | Chromium | 1920 × 1080 | 15 px, Überlauf ja | 15 px, Überlauf ja | **clientWidth 0, Layout 15 px, kein Überlauf → leere Rinne** |
  | WebKit | alle drei | 0 px | 0 px | 0 px |

  Bei den vom Plan genannten Breiten wäre der Fall grün gewesen, weil die 404-Seite bei 900 px Höhe knapp überläuft. Der Screenshot bei 1920 × 1080 zeigt aber einen weißen 15-px-Streifen neben dunklem Header und Footer. Damit ist die Nebenwirkung aus IN-07 belegt, und nach der Entscheidungsregel aus 07-RESEARCH war die Korrektur fällig.
- **Korrektur:**
  - `globals.css` setzt kein globales `scrollbar-gutter` mehr.
  - `HeaderShell` setzt `scrollbarGutter = "stable"` beim Scroll-Lock des Drawers, und zwar nur, wenn `innerWidth − clientWidth > 0`, also eine klassische Leiste Platz belegt. Ohne diese Bedingung würde auf Seiten ohne Leiste eine Rinne entstehen und die Seite springen.
  - Beim Schließen und im Cleanup wird der vorherige Wert wiederhergestellt.
- **Messwerte nachher:**
  - 404 bei 1920 × 1080: Rinne 0 px (clientWidth und Layout).
  - Überlaufende Seiten: unverändert 15 px, das ist die echte Scrollleiste.
  - WebKit: unverändert 0 px.
- **Neuer Fall „Gutter: Drawer-Scroll-Lock ohne Seitensprung mit klassischen Scrollleisten“** (eigener Chromium, 390 × 844): /impressum und /gibt-es-nicht haben eine Body-Breite von 375 px vor dem Öffnen, im geöffneten Zustand (Gutter „stable“, overflow hidden) und nach dem Schließen; danach ist der Zustand identisch. Die Menü-CLS- und Scroll-Lock-Fälle in `home-navigation.pw.cjs` und `navigation.pw.cjs` bleiben grün.
- **Screenshots** (nicht committet):
  - vorher: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-08/gutter-vorher/`
  - nachher: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-08/gutter-nachher/`
  
  Dateinamen `gutter-<engine>-<breite>_<pfad>.png`, jeweils mit `messung.log`.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| Task 1 verify: Lint, testMatch-Check, `--list` | grün; 28 „Detailseite:“- und 4 „App-Seite:“-Einträge (32 Tests in der Datei vor B10/Gutter) |
| Akzeptanz-Greps | `funktionsdetails.pw.cjs` in der Config 1; `test('(Detailseite|App-Seite):` 9 (≥ 7); `sitemap.xml` 2; BUDGET_ROUTES mit mahnwesen 1; mahnwesen je Audit-Skript 1; `Gutter:` 4; `hide-scrollbars` 4; `scrollbar-gutter: stable` in globals.css 0; `scrollbarGutter` in HeaderShell 3 |
| Gutter-Fall vor der Korrektur | rot (Chromium 1920 × 1080, 404: Layout-Rinne 15 px ohne Überlauf) |
| `npm test` | 29 Dateien, 466/466 grün |
| `npm run lint`, `npm run typecheck` | grün |
| `npm run build` | grün, 139 statische Seiten |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | **293 passed, 0 failed, 75 skipped** (Projekt-Skips); 44 Fälle aus `funktionsdetails.pw.cjs` |
| B10-Messung (`b10.mjs`) | vorher max. 220 px (/app), 104 px (lager), 81 px (baudokumentation); nachher max. 25 px; 0 abgeschnitten, 0 Überlauf |
| Port 3100 | vor jedem Lauf frei; Server je Lauf mit eigener PID gestartet und beendet; am Ende frei |

**Koordination:** Vor den schweren Läufen habe ich den Status gelesen (20:15 und 21:08 UTC). edgar und edgarspc sind offline bzw. veraltet (Runner 1.9.9). Für die Website gibt es kein Rezept (Lücke: `website-unit`, `website-build`, `website-e2e`). Alle Läufe liefen deshalb lokal nacheinander, jeweils als einziger schwerer Prozess.

**WebKit-Flake aus 07-07** (/funktionen, Übergänge unter Last): Er trat im vollen Lauf nicht wieder auf. Ein verwandter, reproduzierbarer Befund im neuen Fall wurde an der Ursache behoben (siehe Abweichung 1). Der Fall wartet auf die Bedingung; eine Schwelle wurde nicht gesenkt.

## Sichtprüfung

- **B10:** Raster-Screenshots vorher und nachher für lager, baudokumentation und /app bei 768, 1024 und 1440 px in Chromium und WebKit unter `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-08/b10/shots-vorher/` und `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-08/b10/shots-nachher/`. Messdaten liegen in `b10-vorher.json` und `b10-nachher.json`, das Skript `b10.mjs` im selben Ordner.
  - lager und baudokumentation bei 1024 und 1440: Phone und Text stehen nebeneinander, die Nachbarkacheln schließen bündig ab.
  - /app: Das Phone füllt die Kachel. Der Bildschirm zeigt unter den Beispielzeilen mehr freie Fläche, wie bei den 160-px-Phones.
  - Den gekürzten Titel „Abnahmeprotoko…“ im 161-px-Phone (WebKit 1440) habe ich gefunden und behoben.
- **Gutter:** Der Screenshot bei 1920 × 1080 zeigt vorher den weißen Streifen rechts neben Header und Footer, nachher reicht der dunkle Header bis zum Rand.

## Task Commits

1. `3b023da` test(07-08): browser checks for 22 detail pages and /app, budget and audit routes
2. `7f3afa7` fix(07-08): FeatureSnippet finishes animations under reduced motion instead of pausing them
3. `57adc36` fix(07-08): large bento tiles size their phone to the free height (B10)
4. `e5e0582` fix(07-08): scrollbar-gutter only during the drawer scroll lock (D-14)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] FeatureSnippet hielt Übergänge bei reduzierter Bewegung dauerhaft an**
- **Found during:** Task 1, erster Lauf (WebKit-390-touch, reproduzierbar 3/3 mit `--repeat-each 3`)
- **Issue:** WebKit (mobil) startet bei der Hydration einen `tab-size`-Übergang auf der Snippet-section; die globale Regel macht ihn 0,01 ms lang. Der Effekt `getAnimations().forEach(pause)` hielt ihn an, deshalb stand er dauerhaft als „paused“ in `document.getAnimations()`.
- **Fix:** Bei reduzierter Bewegung `finish()` (bei endlosen Animationen `cancel()`). Die Pause per Knopf und das Anhalten außerhalb des Sichtbereichs bleiben unverändert, `function-illustrations.pw.cjs` ist vollständig grün.
- **Files modified:** craftos/components/feature-snippet/FeatureSnippet.tsx (außerhalb `files_modified`)
- **Commit:** 7f3afa7

**2. [Rule 1 – Testpräzision] axe auf Snippet-Seiten prüft den statischen Zustand**
- Ohne reduzierte Bewegung meldete axe auf 6 bzw. 2 Snippet-Seiten `color-contrast` in Animations-Zwischenständen. Gemeint sind eingefrorene Einblendungen, später gedimmte inaktive Schritte (50 % bzw. 35 % Deckkraft); der Befund hing vom Zeitpunkt ab. Beide axe-Fälle emulieren jetzt reduzierte Bewegung, wie „Startseite ruhig … axe in fünf Breiten“ in `home-navigation.pw.cjs`. Die Fläche ist `aria-hidden` und dekorativ. Die Dimmstufe steht als Folgepunkt in `deferred-items.md`. Commit 7f3afa7.

**3. [Rule 2 – Messlücke] Gutter-Messung um Layout-Breite und 1920 × 1080 ergänzt**
- `innerWidth − clientWidth` zeigt in Chromium die reservierte Rinne nicht an (gemessen 0 bei sichtbarem 15-px-Streifen). Bei den Plan-Breiten lief die 404-Seite knapp über, deshalb wäre die Nebenwirkung unentdeckt geblieben. Der Fall misst zusätzlich `innerWidth − Body-Breite` und den Viewport 1920 × 1080. Commit e5e0582.

**4. [Rule 1 – Korrektheit] Gutter beim Scroll-Lock nur mit klassischer Leiste**
- Würde der Gutter beim Öffnen des Drawers immer gesetzt, entstünde auf Seiten ohne Scrollleiste eine Rinne und ein seitlicher Sprung. HeaderShell setzt ihn daher nur, wenn `innerWidth − clientWidth > 0`. Commit e5e0582.

**5. [Nachtrag Orchestrator] B10 und gekürzter Titel im dynamischen Phone**
- Das freigegebene B10 ist umgesetzt. Bei Phone-Breiten unter 194 px kürzte WebKit den Titel. Behoben über den 160-px-Titelstil mit dem Haken `data-phone-title` in `PhoneFrame.tsx` (außerhalb `files_modified`). Commit 57adc36.

**Total deviations:** 4 Auto-Fixes (2 Fehler, 1 Messlücke, 1 Testpräzision) plus der Nachtrag B10.

## Deferred Issues

Siehe `deferred-items.md`: Leerraum in Icon-Rastern ohne Phone bei 1024 px (bis 122 px, vor und nach B10 identisch, nicht Teil von B10) und gedimmte Zwischenstände der FeatureSnippet-Animation.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche.
- **T-07-25:** Die Regex für `data-evidence` und `data-source` läuft auf allen 23 Seiten im Browser (grün).
- **T-07-26:** Nur lokal; externe Requests per `page.route` bzw. `context.route` abgebrochen; keine Workflows angelegt, nichts gepusht.
- **T-07-27:** Die Gutter-Korrektur gilt nur bei gemessener Rinne; Menü-CLS-, Scroll-Lock- und der neue Drawer-Fall mit klassischen Leisten sind grün.
- **T-07-SC:** keine Pakete installiert.

## Self-Check: PASSED

- Dateien vorhanden: craftos/tests/e2e/funktionsdetails.pw.cjs, deferred-items.md; Config, Budgetrouten, Audit-Skripte, BentoGrid-CSS, PhoneFrame, FeatureSnippet, HeaderShell, globals.css, DESIGN-V2.md und 07-UI-SPEC.md geändert.
- Commits 3b023da, 7f3afa7, 57adc36 und e5e0582 stehen im Log.
- Arbeitsbaum sauber bis auf `.planning/config.json` (bewusst nicht angefasst). Kein Server läuft, Port 3100 ist frei.
