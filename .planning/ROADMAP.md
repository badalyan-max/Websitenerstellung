# Roadmap

## Milestones

- [x] **v1.0 Relaunch** – Phasen 1–4 (abgeschlossen, veröffentlicht am 09.09.2026)
- [ ] **v2.0 Produktstand, Redesign und Sichtbarkeit** – Phasen 5–10 (aktiv)

## Vorheriger Milestone v1.0 (abgeschlossen)

Phasen 1–4 (Produktgrundlage und Gestaltung, Produkterlebnis, Wissen und Werkzeuge, Abnahme) sind lokal umgesetzt, geprüft und am 09.09.2026 veröffentlicht. Validierte Anforderungen: UI-01, PROD-01, DEMO-01, CONTENT-01, CONTENT-02, CALC-01, SEO-01, QA-01, QA-02, QA-03. Nachweise: `craftos/docs/RELAUNCH-ABNAHME.md`, `craftos/docs/RELEASE-2026-09-09.md`.

## Milestone v2.0 – Überblick

craftos.eu wird klar gegliedert und optisch ansprechend: weniger Fließtext, Kacheln, Schritte, Kennzahlen und vereinfachte Produktdarstellungen statt Textwänden; dazu korrekter Produktstand und SEO/GEO auf Basis echter Keyword-Daten.

**Umfangsänderung (Inhaberentscheidung 20.10.2026):** Keine detailgetreuen Screenshots, kein Demo-Betrieb, keine Aufnahme-Pipeline, keine Bildschirmvideos. „Rom nicht neu erfinden“: bestehende Seiten und Bausteine (Geräterahmen und Szenen aus `components/feature-snippet`, Icons, vorhandene Fotos) werden strukturierter und schöner eingesetzt. SEO bleibt voller Bestandteil und nutzt SE Ranking vollständig (Keyword-Recherche, Ranking- und KI-Tracking, Backlink-Lücke, Website-Audit; Befund: `craftos/docs/seo/SE-RANKING-BEFUND-2026-10-20.md`); die Keyword-Map kommt nach vorn, weil der Inhaber einen SEO-Tool-Zugang (SE Ranking API, `SE_RANKING_API_KEY` in `.env`) bereitgestellt hat; DataForSEO bleibt optional.

**Rollout-Regel (Inhaberentscheidung 20.10.2026):** Jede Phase endet in einem auslieferbaren Live-Stand: Ship-Gate → Push auf `main` → IndexNow-Meldung → Live-Prüfung → Kontrolle von `trial_click`/`ai_visit` in Vercel Analytics. Prüfungen laufen ausschließlich lokal, nie über GitHub Actions. Übergreifende Qualität (QA-04, QA-05, QA-06, DESIGN-05) wird in Phase 10 abschließend nachgewiesen; jede Phase hält die Seite grün.

**Produktquellen:** ausschließlich `origin/release` der Produkt-Repos (Web v4.0.0-test.238, Mobile mobile-v1.0.0-test.93); lokale `main`/`master` sind veraltet.

## Phases

- [ ] **Phase 5: Produktwahrheit, Keyword-Map und Designbausteine** - Live-Stand korrigiert, Suchbegriffe je Seite festgelegt, v2-Bausteine bereit
- [ ] **Phase 6: Startseite, Navigation und Funktionsübersicht** - Startseite klar gegliedert, Funktionsmenü und nach Ablauf gruppierte Übersicht
- [ ] **Phase 7: Funktionsdetailseiten und Mobile-App-Seite** - Einheitliche, kurze Detailseiten mit visuellem Element für jede Live-Funktion
- [ ] **Phase 8: SEO und KI-Sichtbarkeit** - Alternativen-Seiten, Preis-Antwortblock, Metadaten nach Keyword-Map, Breadcrumbs, OG-Grafiken
- [ ] **Phase 9: Gewerke und Wissensinhalte** - Gewerke-Seiten gegliedert, Ratgeber und Hilfe auf Produktstand, neue Hilfeartikel
- [ ] **Phase 10: Abschlussaudit** - Barrierefreiheit, Performance und erneuter Audit ohne offene Fehler

## Phase Details

### Phase 5: Produktwahrheit, Keyword-Map und Designbausteine

**Goal**: Besucher sehen ausschließlich live verfügbare Funktionen mit korrekten Preisen, jede Seite hat ein datenbasiertes Hauptkeyword, und die Bausteine für die strukturierte Neugestaltung stehen bereit.
**Depends on**: Phase 4 (v1.0 abgeschlossen); SEO-02 auf den SEO-Tool-Zugang in `.env`
**Requirements**: PROD-02, PROD-03, PROD-04, SEO-02, SEO-07, SEO-08, DESIGN-02, DESIGN-04, MEDIA-03, MEDIA-04
**Success Criteria** (what must be TRUE):

  1. Das Produktregister nennt für jede beworbene Funktion Release-Tag, Commit und Belegpfad aus `origin/release`; keine Seite, `llms.txt` oder kein Schema stellt eine nicht-live Funktion als verfügbar dar, und der Abschnitt „Demnächst“ trägt keine vergangenen Termine mehr.
  2. Preise, Lizenzarten, Netto-Hinweis, 10-Tage-Test und Credits sind überall identisch mit `src/lib/constants.ts` der Web-App; ein automatischer Test schlägt bei Abweichung fehl.
  3. Eine Keyword-Map aus echten Tooldaten (Suchvolumen DE, Schwierigkeit, Intent, rankende Wettbewerber; Quelle je Zahl genannt) ordnet jeder bestehenden und geplanten Seite genau ein Hauptkeyword zu und nennt Lücken (neue Seiten mit Nachfrage); ohne Zugang bleibt das Kriterium offen und wird nicht geschätzt.
  4. Die v2-Bausteine (Kachel-/Bento-Raster, Schrittfolge, Kennzahlen, Funktionskarte mit visuellem Element, Geräterahmen Desktop/Phone mit vereinfachter UI, Vergleichstabelle) nutzen Amber, Clash Display, General Sans und Logo, sind auf einer nicht indexierten Musterseite prüfbar und bewegen sich nur dezent; bei „reduzierte Bewegung“ bleibt alles statisch sichtbar.
  5. Eine Budgetprüfung lehnt Bilder über 150 KB ab, alle Medien haben feste Abmessungen ohne Layout-Shift, und der korrigierte Stand ist nach Ship-Gate live mit IndexNow-Meldung.
  6. Das SE-Ranking-Projekt trackt alle Hauptkeywords der Keyword-Map mit Zielseite plus die KI-Prompts; ein Messbericht-Skript bzw. eine feste Abfrage vergleicht Positionen, KI-Share-of-Voice und verweisende Domains mit dem Ausgangsstand vom 20.10.2026.
  7. Eine priorisierte Linkliste mit Statusregister und kopierfertigen Browser-Prompts für Portale, Fachmedien und Verzeichnisse liegt vor; die ersten Einträge (Bewertungs- und Vergleichsportale) sind an den Inhaber übergeben.

**Plans**: 8 plans (3 Wellen)
Plans:
**Wave 1**

- [x] 05-01-PLAN.md — Keyword-Map aus SE-Ranking-Daten (Skript, seitenspezifische Kandidaten, Rohdaten ≤ 30.000 Units, Map, Test) – Welle 1
- [x] 05-02-PLAN.md — Produktregister auf origin/release, Kundenportal live, Ankündigungen entfernt, Routen-Audit-Flag – Welle 1
- [x] 05-03-PLAN.md — Preis-Snapshot, Paritätstest, Extra-Speicher und Credits überall abgeleitet – Welle 1
- [ ] 05-04-PLAN.md — Designsystem v2 Teil A (Kaskade, Tokens, Budgets, SectionHeader, Bento, Schritte, Kennzahlen, FAQ, CTA) – Welle 1
- [ ] 05-05-PLAN.md — Designsystem v2 Teil B (Vergleichstabelle, Badges, Funktionskarte, Kennzeichnung, Medien, Geräterahmen, Mini-UI) – Welle 1

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 05-06-PLAN.md — Medienbudget, Galerie-Kennzeichnung, Musterseite /styleguide (noindex), E2E – Welle 2
- [ ] 05-07-PLAN.md — Linkplan mit Statusregister und Browser-Prompts, SE-Ranking-Projektabgleich, Messbericht – Welle 2

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 05-08-PLAN.md — Phasen-Gate, Ship-Gate über Gesamtdiff, Push, IndexNow, Live-Prüfung, Etappenmessung – Welle 3

**UI hint**: yes

### Phase 6: Startseite, Navigation und Funktionsübersicht

**Goal**: Besucher verstehen auf der Startseite sofort, was CraftOS ist, und finden über Menü und Funktionsübersicht jede Live-Funktion in höchstens zwei Klicks.
**Depends on**: Phase 5
**Requirements**: DESIGN-01, DESIGN-03, FEAT-01
**Success Criteria** (what must be TRUE):

  1. Auf der Startseite sehen Besucher ohne Scrollen (360 px bis 1440 px) eine klare Aussage, was CraftOS ist, eine Produktdarstellung und „10 Tage testen“; jeder Abschnitt hat höchstens eine Überschrift, einen Einleitungssatz und visuelle Elemente statt Fließtextblöcken.
  2. Das Menü zeigt Funktionsgruppen mit Kurzbeschreibungen und Icons und ist auf Desktop und Mobil per Maus, Touch und Tastatur bedienbar; jede Live-Funktion ist in höchstens zwei Klicks erreichbar.
  3. Die Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), jeweils mit visuellem Element und einem Satz Nutzen, und stimmt mit dem Produktregister überein.
  4. Startseite, Menü und Übersicht nutzen die Hauptkeywords aus der Keyword-Map und sind nach Ship-Gate live mit IndexNow-Meldung; `trial_click` wird weiter erfasst.

**Plans**: TBD
**UI hint**: yes

### Phase 7: Funktionsdetailseiten und Mobile-App-Seite

**Goal**: Jede Live-Funktion hat eine kurze, einheitlich gegliederte Detailseite, und die Mobile-App-Seite zeigt den vollen App-Umfang.
**Depends on**: Phase 6
**Requirements**: FEAT-02, FEAT-03, MEDIA-01
**Success Criteria** (what must be TRUE):

  1. Jede Live-Funktion hat eine Detailseite nach fester Vorlage: visuelles Element, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen, FAQ; die seit 09.09.2026 neuen Funktionen haben eigene Seiten, sofern Keyword-Map oder Produktumfang es rechtfertigen, sonst einen Abschnitt auf der passenden Seite.
  2. Die Mobile-App-Seite zeigt alle Live-Funktionen der App als gegliederte Kacheln mit Phone-Darstellungen.
  3. Alle neuen Seiten sind in Sitemap und `llms.txt` enthalten, über Menü und Übersicht verlinkt und nach Ship-Gate live mit IndexNow-Meldung.

**Plans**: TBD
**UI hint**: yes

### Phase 8: SEO und KI-Sichtbarkeit

**Goal**: Suchmaschinen und KI-Suchen finden auf craftos.eu zitierfähige Antworten zu Preisen, Alternativen und Funktionen, und jede Seite hat saubere Metadaten nach der Keyword-Map, Breadcrumbs und eine eigene OG-Grafik.
**Depends on**: Phase 7
**Requirements**: SEO-03, SEO-04, SEO-05, SEO-06, SEO-09
**Success Criteria** (what must be TRUE):

  1. Die vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) sind mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und vom Vergleich und Footer verlinkt.
  2. Die Preisseite beginnt mit einem zitierfähigen Antwortsatz und einer Preistabelle, deren Werte mit dem Produktregister übereinstimmen.
  3. Jede Seite hat einen eindeutigen Titel ≤ 60 Zeichen mit ihrem Hauptkeyword, eine Description mit 120–155 Zeichen, genau eine H1, sichtbare Breadcrumbs mit Schema und eine individuelle OG-Grafik; ein automatischer Test findet keine doppelten Titel.
  4. Zentrale Seiten haben unter jeder Frage-Überschrift eine Antwort in höchstens 300 Zeichen; `llms.txt`, Sitemap und IndexNow-Meldung werden bei jedem Release aktualisiert.
  5. Jede getrackte KI-Frage und jede Content-Lücke mit KD < 20 aus der Keyword-Map hat eine zitierfähige Zielseite oder einen Abschnitt mit Antwort zuerst, belegten Fakten und FAQPage-Schema.

**Plans**: TBD
**UI hint**: yes

### Phase 9: Gewerke und Wissensinhalte

**Goal**: Gewerke-Seiten, Ratgeber und Hilfe sind klar gegliedert, entsprechen dem aktuellen Produktstand und erklären auch die neuen Funktionen Schritt für Schritt.
**Depends on**: Phase 8
**Requirements**: FEAT-04, CONTENT-03, CONTENT-04
**Success Criteria** (what must be TRUE):

  1. Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit visuellen Elementen statt nur Text und verlinken auf die passenden Funktionsseiten.
  2. Die 24 Ratgeber und 40 Hilfeartikel sind gegen den aktuellen Produktstand geprüft, korrigiert und gegliedert (Antwort zuerst, Schritte, Zwischenüberschriften); keiner beschreibt eine nicht-live Funktion oder einen veralteten Ablauf.
  3. Für jede seit 09.09.2026 neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung, verlinkt von der Detailseite.
  4. Gewerke- und Wissensinhalte erfüllen die Metadaten- und Breadcrumb-Regeln aus Phase 8 und sind nach Ship-Gate live mit IndexNow-Meldung.

**Plans**: TBD
**UI hint**: yes

### Phase 10: Abschlussaudit

**Goal**: Alle Seiten sind barrierefrei und schnell, und ein erneuter Audit von craftos.eu zeigt keine offenen technischen oder On-Page-Fehler.
**Depends on**: Phase 9
**Requirements**: DESIGN-05, QA-04, QA-05, QA-06
**Success Criteria** (what must be TRUE):

  1. Jede Seite besteht bei 360, 390, 768, 1024 und 1440 px die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, vollständige Tastaturbedienung).
  2. Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s; Unit-, Browser-, Routen- und visuelle Prüfungen sind angepasst und lokal grün.
  3. Für jede Etappe (Phasen 5–10) ist dokumentiert, dass sie einzeln nach Ship-Gate live ging, IndexNow gemeldet, die Live-Seite geprüft und `trial_click`/`ai_visit` kontrolliert wurde.
  4. Ein erneuter `/audit craftos.eu` und ein SE-Ranking-Website-Audit nach der letzten Etappe zeigen keine offenen technischen oder On-Page-Fehler; ein Abschlussbericht vergleicht Positionen, KI-Share-of-Voice und verweisende Domains mit dem Ausgangsstand vom 20.10.2026.

**Plans**: TBD

## Progress

**Execution Order:** 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Produktwahrheit, Keyword-Map und Designbausteine | 3/8 | In Progress|  |
| 6. Startseite, Navigation und Funktionsübersicht | 0/TBD | Not started | - |
| 7. Funktionsdetailseiten und Mobile-App-Seite | 0/TBD | Not started | - |
| 8. SEO und KI-Sichtbarkeit | 0/TBD | Not started | - |
| 9. Gewerke und Wissensinhalte | 0/TBD | Not started | - |
| 10. Abschlussaudit | 0/TBD | Not started | - |
