---
phase: 09-gewerke-und-wissensinhalte
plan: 12
subsystem: content-vorlagen
tags: [fundament, artikelvorlage, contentkopf, schrittliste, article-prose, inhaltsverzeichnis, contentsearch, linkkarten]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: ContentKopf (G8), LinkKarten (G9), Rehype-Schritt (ol role=list, Tabellenhülle), answer/faq/scene im Inhaltsvertrag, sceneById/sceneFrame, categoryIcons"
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-11 (über main): Gewerke-Kopf und Abschnittsmuster (Abschnitt + SectionHeader id = Anker)"
provides:
  - "Artikelvorlage v2 für /blog/[slug] und /hilfe/[slug] (ContentKopf, Inhaltsverzeichnis sticky/details, Szene, FAQ mit FAQPage, Quellen, Passende Funktionen, Weiterlesen, CTA-Band)"
  - ".article-prose v2 mit Schrittliste (Sechseck-Knoten, Maßlinie) und Tabellen-Scrollbereich als reines CSS"
  - "Übersichten /blog, /hilfe und Kategorieseiten auf v2 (ContentKopf, Themen-LinkKarten mit Icons, #alle mit Suche, CTA-Band)"
  - "ContentSearch v2 (LinkKarten-Ergebnisse, leerer Zustand § 5), CONTENT_CTA als gemeinsame CTA-Quelle"
  - "tests/content-vorlage.test.ts als Vorlagenvertrag; DESIGN-V2.md § 18 Phase 9"
affects: [09-03, 09-04, 09-05, 09-06, 09-07, 09-08, 09-14, 09-17, 09-18, 09-09, 09-16]

tech-stack:
  added: []
  patterns:
    - "Vorlagentest mit Fixtures über parseContent + renderMarkdown auf echten Map-Pfaden (H1 aus zielwerte)"
    - "Inhaltsverzeichnis doppelt im DOM (nav sticky ≥ 1024, details < 1024), per CSS genau eines sichtbar"
    - "CSS-Vertrag per Test: Regeln in globals.css werden als Text geprüft (Ausweichzeile vor counter(...) / \"\")"

key-files:
  created:
    - craftos/tests/content-vorlage.test.ts
  modified:
    - craftos/components/content/ArticlePage.tsx
    - craftos/components/content/ContentIndex.tsx
    - craftos/components/content/ContentSearch.tsx
    - craftos/app/globals.css
    - craftos/docs/DESIGN-V2.md

key-decisions:
  - "Phase 9: CTA-Copy der Wissensseiten als CONTENT_CTA in ArticlePage.tsx; ContentIndex importiert sie (keine neue lib-Datei außerhalb des Dateibesitzes)"
  - "Phase 9: Inhaltsverzeichnis als zwei Elemente (nav sticky ab 1024 px, details darunter); geschlossenes details lässt sich per CSS nicht zuverlässig öffnen"
  - "Phase 9: Kategorieseiten mit Eyebrow „Ratgeber“/„Hilfe“ laut 09-UI-SPEC § 3 (nicht Kategoriename)"
  - "Phase 9: Weiterlesen in Frontmatter-Reihenfolge; nicht (noch nicht) veröffentlichte Ziele entfallen still wie im Bestand, Integration prüft Links (route-audit)"
  - "Phase 9: Auswahlfeld der Suche mit appearance-none und eigenem Chevron, weil WebKit die native Auswahl grau malt"

requirements-completed: []

duration: ca. 95 min
completed: 2026-10-23
---

# Phase 9 Plan 12: Fundament Teil 2 – Artikelvorlage v2, Übersichten, Suche Summary

**Ratgeber- und Hilfeartikel rendern in der v2-Vorlage (heller ContentKopf mit Map-H1 und #antwort bzw. Übergangs-Lead, Inhaltsverzeichnis sticky/eingeklappt, Szene, FAQ mit FAQPage, Quellen, FeatureCard- und LinkKarten-Abschnitte, CTA-Band); die oberste nummerierte Liste der Prosa ist eine Schrittliste mit Sechseck-Knoten als reines CSS; /blog, /hilfe und die Kategorieseiten zeigen Themen-Karten mit Icons und die Suche mit LinkKarten-Ergebnissen.**

## Performance

- **Duration:** ca. 95 min
- **Started:** 2026-10-23 nach `git merge main` (Fast-Forward auf `682d86b`, enthält 09-11)
- **Completed:** 2026-10-23
- **Tasks:** 2 von 2
- **Files:** 1 neu, 5 geändert

## Accomplishments

- **Artikelvorlage (`2f3831f`):** `<article aria-labelledby="artikel-titel">` mit `ContentKopf` (Eyebrow = Kategoriename, H1 aus `zielwerte`, `answer` → `#antwort`, sonst `description` als Lead ohne id; Metazeile „Stand TT.MM.JJJJ“, „Veröffentlicht …“ nur bei abweichendem Datum, „{n} Min. Lesezeit“, Autor; Plattform-Badges; kein CTA). Textabschnitt Weiß mit Raster `minmax(0, 720px) 280px`, Inhaltsverzeichnis ab 3 Einträgen (Label „In diesem Artikel“ als `<p>`, sticky `top: 100px`; < 1024 px `details` „Inhalt dieses Artikels“ mit Plus-Symbol), Szene aus `sceneById` im `Frame` mit Kennzeichnung, Prosa, FAQ (`#faq`, `FaqList zentral`, FAQPage aus demselben Array), Quellen (`#quellen`, `ol[aria-label="Quellen"]`, „{label}, geprüft am TT.MM.JJJJ“). Danach „Passende Funktionen“ (`#funktionen`, FeatureCard mit Karten-Szene), „Weiterlesen“ (`#weiterlesen`, `LinkKarten columns={2}`), Flächen abwechselnd, CTA-Band Ratgeber bzw. Hilfe. Schema Article/TechArticle unverändert, kein Schritt-Schema.
- **Prosa v2 (`2f3831f`):** `.article-prose` 16/1.5, H2 32 mit Silbentrennung und `scroll-margin-top: 100px`, H3 20, Punktliste mit Marker `#777782`, Links `#784B10`, Zitat ohne Amber, Inline-Code, `hr` 48; Schrittliste `.article-prose > ol` mit `counter(schritt)` (Ausweichzeile vor `counter(schritt) / ""`, beide Zeilen überleben die Minifizierung), Knoten 40 × 40 per `clip-path` in `#F2AF38`, Maßlinie `li:not(:last-child)::after`; Tabellenhülle Radius 16, Kopf `#F7F3EB`, Zeilenlinien.
- **Übersichten, Kategorien, Suche (`8acab83`):** `/blog`, `/hilfe`: Kopf mit Antwort § 5 und „{n} Artikel/Anleitungen, zuletzt aktualisiert am {d}“ → `#themen` (Weiß, Karten warm, Lucide-Icon im Icon-Feld, „{n} Artikel“ / „{n} Anleitungen“ / „1 Anleitung“) → `#alle` (Warm, Suche, Karten weiß) → CTA. Kategorie: Kopf ohne Antwort, „{n} … in diesem Thema, …“ → `#alle` (Weiß, vorgefiltert) → `#themen` „Weitere Themen …“ (Warm, übrige Kategorien) → CTA. Hinweisboxen entfallen (H9). `ContentSearch` mit unveränderter Logik, Feldern 48 px, Statuszeile, LinkKarten mit `h3`, leerem Zustand (h3, Text, Hilfe mit Link „Support“, Text-Button „Suche zurücksetzen“). DESIGN-V2.md § 18 „Phase 9“.

## Task Commits

1. **Aufgabe 1** – RED `59699bb` `test(09-12): Artikelvorlage v2 RED – …` (14 von 19 rot), GREEN `2f3831f` `feat(09-12): Artikelvorlage v2 – …`
2. **Aufgabe 2** – RED `966e87e` `test(09-12): Übersichten, Kategorien und ContentSearch v2 RED` (8 neue Fälle rot), GREEN `8acab83` `feat(09-12): Übersichten, Kategorien und ContentSearch auf v2, DESIGN-V2 § 18 Phase 9`

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| Aufgabe 1: `content-vorlage`, `breadcrumbs`, `schema`, `design-v2-components` | 4 Dateien, 117 von 117 grün |
| Aufgabe 2: `content-vorlage`, `breadcrumbs`, `design-v2-components`, `design-v2-budgets` | 140 von 140 grün; Endstand `content-vorlage` + `breadcrumbs` 40 von 40 |
| `content.test.ts` unter Sperre (dreimal: nach Aufgabe 1, nach Aufgabe 2, nach der WebKit-Korrektur) | je 34 von 34 grün |
| `npm run typecheck`, `npm run lint` | 0 Fehler (Exitcode 0) |
| Unter Sperre: `npm run build` (zweimal) | grün |
| `seo-audit --only=title,description,h1,map,breadcrumbs,og,faq-schema` für die sechs Pfade | 0 Verstöße, Exitcode 0 (zweimal) |
| `visual-audit` auf Port 3101, 5 Pfade × 360/390/1440 × Chromium/WebKit | 30 Seiten: 0 Status-, 0 Überlauf-, 0 JS-, 0 axe-Befunde |
| Eigene Messung 360/768/1024/1440 Chromium, 390 WebKit | kein Seitenscroll, H1 `scrollWidth ≤ clientWidth` überall, keine Prosa-H2 mit Überlauf; Knoten 40 × 40, `content: counter(schritt) / ""`, `#F2AF38`; Inhaltsverzeichnis `details` < 1024, `nav` sticky ≥ 1024 (nach Scroll `top` = 100); Tabellen-Scrollbereich 360 px: 322 sichtbar / 479 Inhalt, ab 768 ohne Scroll |
| Leerer Zustand (WebKit 390, Chromium 1440) | Suche „zzzz“ → „0 Artikel gefunden“ und h3 sichtbar; „Suche zurücksetzen“ → 40 Treffer, Thema leer; Auswahlfeld weiß |
| Abnahme-Greps | ContentKopf 3, PageHero 0/0, HowTo 0, use client 0 (ArticlePage); `counter(schritt)` 2, `clip-path` 1; LinkKarten 4/3; Hinweisbox 0; „Suche zurücksetzen“ 1; „Phase 9“ 1 |

Port 3101 nach jedem Lauf per netstat frei; Sperre jeweils sofort freigegeben (einmal auf die Sperre von 09-03 gewartet).

**Screenshots (nur Scratchpad, nicht committet):** `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/09-12/` mit `chromium-360-*.png`, `chromium-768-*.png`, `chromium-1024-*.png`, `chromium-1440-*.png`, `webkit-390-*.png` je `/blog`, `/hilfe`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen`, dazu `webkit-390-leerer-zustand.png`, `chromium-1440-leerer-zustand.png` und Ausschnitte unter `ansicht/`. Selbst angesehen: Schrittknoten, H1 bei 360 mit Trennung („Materialentnahme-schein“), Inhaltsverzeichnis, Tabellen-Scrollbereich, Themen-Karten, CTA-Band. Einziger Befund (graues Auswahlfeld in WebKit) behoben.

## Decisions Made

- `CONTENT_CTA` liegt in `ArticlePage.tsx` und wird von `ContentIndex` importiert, damit Artikel, Übersichten und Kategorien dieselbe CTA-Quelle nutzen, ohne eine Datei außerhalb des Dateibesitzes anzulegen.
- Inhaltsverzeichnis zweimal im DOM (Seitenspalte und `details`), per CSS nur eines sichtbar; die Seitenspalte steht im DOM vor dem Text, damit Tastaturnutzer ab 1024 px zuerst das Verzeichnis erreichen.
- Kategorieseiten-Eyebrow „Ratgeber“/„Hilfe“ nach der Tabelle in 09-UI-SPEC § 3.
- Statuszeile der Suche bleibt „{n} Artikel gefunden“ (funktionsgleich).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Darstellung] Auswahlfeld „Themenbereich“ in WebKit grau**
- **Found during:** Sichtprüfung Aufgabe 2 (WebKit 390)
- **Issue:** WebKit malt die native Auswahl trotz `bg-white` grau; 09-UI-SPEC § 3 verlangt Weiß.
- **Fix:** `appearance-none` mit eigenem `ChevronDown` 20 px `#62626E`; nachgemessen `rgb(255, 255, 255)` in WebKit und Chromium.
- **Commit:** `8acab83`

**2. [Rule 3 – blockierend] Zweiter Block `prefers-reduced-motion` in globals.css**
- **Issue:** `design-v2-components.test.ts` liest den ersten Block `@media (prefers-reduced-motion: reduce)`; ein eigener Block für das Plus-Symbol stand davor und brach zwei Fälle.
- **Fix:** Eigener Block entfernt; die globale Regel setzt Übergänge ohnehin auf 0 s.
- **Commit:** `2f3831f`

**3. Kommentar ohne „HowTo“**
- Die Abnahmeprobe `grep -c "HowTo"` = 0 gilt auch für Kommentare; der Kommentar nennt „kein Schritt-Schema (D-16)“.

### Hinweise

- `tests/content.test.ts` und `tests/breadcrumbs.test.ts` blieben unverändert: Sie prüfen H1, Metadaten, Brotkrumen und Schema, kein altes Markup.
- Die vier Seiten unter `app/blog` und `app/hilfe` blieben unverändert, weil sich die Props von `ContentIndex` nicht geändert haben.
- Maßlinie bei einzeiligen Schritten: Mit den Werten aus § 2.4 (Knoten 40, Abstand 24, Linie `top: 48px; bottom: 8px`) bleibt zwischen zwei einzeiligen Schritten nur die Endmarke sichtbar; bei mehrzeiligen Schritten zieht sich die Linie wie bei `StepFlow`. Vertragsgemäß, kein Eingriff.
- Design-Kaskade: frontend-design-Leitlinie gelesen, ui-ux-pro-max zweimal (`--domain ux`) ausgeführt, 21st.dev und Context7 in dieser Sitzung nicht verfügbar (vermerkt in DESIGN-V2.md § 18.3).

---

**Total deviations:** 2 Auto-Fixes, 1 Anpassung an die Abnahmeprobe. **Impact:** keine Erwartung gelockert, kein Inhalt geändert.

## Geteilte Dateien

- `craftos/app/globals.css`: alter `.article-prose`-Block und die alte `.table-scroll`-Regel ersetzt (nur von `ArticlePage` und `lib/content.ts` genutzt).
- `craftos/docs/DESIGN-V2.md`: § 18 angehängt; spätere Phase-9-Pläne ergänzen dort.
- Keine Datei unter `content/`, `lib/` oder `components/v2/` geändert.

## Übergaben

- An die Inhaltspakete: `answer` erscheint sofort als `#antwort` im Kopf, `faq` als Abschnitt „Häufige Fragen“ mit FAQPage, `scene` als gekennzeichnete Szene über der Prosa; die oberste nummerierte Liste wird zur Schrittliste. Nicht veröffentlichte `relatedArticles` entfallen in „Weiterlesen“ still (Integration 09-09 prüft Links).
- An 09-09: In `components/v2/**` fehlte nichts.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-09-10: Prosa-HTML nur aus `renderMarkdown` (rehype-sanitize), keine weitere `dangerouslySetInnerHTML`-Quelle. T-09-11: Suche filtert weiter nur clientseitig, Eingaben erscheinen nicht als HTML. T-09-12: FAQPage nur aus sichtbarer Frontmatter-FAQ, kein Schritt-Schema (Test über alle realen Artikel).

## Next Phase Readiness

- Die Vorlage ist für die Integration bereit; STATE.md und ROADMAP.md bewusst nicht geändert (Worktree-Regel), kein Merge nach main, kein Push.

## Self-Check: PASSED

Dateien vorhanden (content-vorlage.test.ts, ArticlePage.tsx, ContentIndex.tsx, ContentSearch.tsx); Commits 59699bb, 2f3831f, 966e87e, 8acab83 im Branch phase09-spur-basis.
