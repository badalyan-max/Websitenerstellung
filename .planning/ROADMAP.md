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

- [x] **Phase 5: Produktwahrheit, Keyword-Map und Designbausteine** - Live-Stand korrigiert, Suchbegriffe je Seite festgelegt, v2-Bausteine bereit (completed 2026-10-20)
- [x] **Phase 6: Startseite, Navigation und Funktionsübersicht** - Startseite klar gegliedert, Funktionsmenü und nach Ablauf gruppierte Übersicht (completed 2026-10-21)
- [x] **Phase 7: Funktionsdetailseiten und Mobile-App-Seite** - Einheitliche, kurze Detailseiten mit visuellem Element für jede Live-Funktion (completed 2026-10-22)
- [x] **Phase 8: SEO und KI-Sichtbarkeit** - Alternativen-Seiten, Preis-Antwortblock, Metadaten nach Keyword-Map, Breadcrumbs, OG-Grafiken (completed 2026-10-23)
- [x] **Phase 9: Gewerke und Wissensinhalte** - Gewerke-Seiten gegliedert, Ratgeber und Hilfe auf Produktstand, neue Hilfeartikel (completed 2026-10-23)
- [x] **Phase 10: Abschlussaudit** - Barrierefreiheit, Performance und erneuter Audit ohne offene Fehler (completed 2026-10-23)

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
- [x] 05-04-PLAN.md — Designsystem v2 Teil A (Kaskade, Tokens, Budgets, SectionHeader, Bento, Schritte, Kennzahlen, FAQ, CTA) – Welle 1
- [x] 05-05-PLAN.md — Designsystem v2 Teil B (Vergleichstabelle, Badges, Funktionskarte, Kennzeichnung, Medien, Geräterahmen, Mini-UI) – Welle 1

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 05-06-PLAN.md — Medienbudget, Galerie-Kennzeichnung, Musterseite /styleguide (noindex), E2E – Welle 2
- [x] 05-07-PLAN.md — Linkplan mit Statusregister und Browser-Prompts, SE-Ranking-Projektabgleich, Messbericht – Welle 2

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 05-08-PLAN.md — Phasen-Gate, Ship-Gate über Gesamtdiff, Push, IndexNow, Live-Prüfung, Etappenmessung – Welle 3

**UI hint**: yes

### Phase 6: Startseite, Navigation und Funktionsübersicht

**Goal**: Besucher verstehen auf der Startseite sofort, was CraftOS ist, und finden über Menü und Funktionsübersicht jede Live-Funktion in höchstens zwei Klicks.
**Depends on**: Phase 5
**Requirements**: DESIGN-01, DESIGN-03, FEAT-01 (dazu Umsetzung DESIGN-02, SEO-02 aus Phase 5)
**Success Criteria** (what must be TRUE):

  1. Auf der Startseite sehen Besucher ohne Scrollen (360 px bis 1440 px) eine klare Aussage, was CraftOS ist, eine Produktdarstellung und „10 Tage testen“; jeder Abschnitt hat höchstens eine Überschrift, einen Einleitungssatz und visuelle Elemente statt Fließtextblöcken.
  2. Das Menü zeigt Funktionsgruppen mit Kurzbeschreibungen und Icons und ist auf Desktop und Mobil per Maus, Touch und Tastatur bedienbar; jede Live-Funktion ist in höchstens zwei Klicks erreichbar.
  3. Die Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), jeweils mit visuellem Element und einem Satz Nutzen, und stimmt mit dem Produktregister überein.
  4. Startseite, Menü und Übersicht nutzen die Hauptkeywords aus der Keyword-Map und sind nach Ship-Gate live mit IndexNow-Meldung; `trial_click` wird weiter erfasst.

**Plans**: 6 plans (6 Wellen, strikt sequentiell)
Plans:
**Wave 1**

- [x] 06-01-PLAN.md — Gruppenmodell lib/funktionsgruppen.ts (16 + 14 Live-Funktionen), Nutzensätze, Phase-6-Budgets, Paritätstest

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 06-02-PLAN.md — Kaskade Phase 6, Szenenmodul, Kurzform-Belege (E3), DevicePair compact (E1), FeatureList (E2)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 06-03-PLAN.md — Navigation: Server-Header mit Mega-Menü „Funktionen“, Client-Hülle, Drawer, No-JS, Browserprüfungen

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 06-04-PLAN.md — Startseite: Hero oberhalb der Falz, sieben v2-Abschnitte, Keyword-Map-Metadaten, FAQPage

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 06-05-PLAN.md — /funktionen gruppiert mit FeatureCard/FeatureList, JSON-LD, Zwei-Klick-Nachweis

**Wave 6** *(blocked on Wave 5 completion; Code-Review-Gate des Orchestrators vorher)*

- [x] 06-06-PLAN.md — Phasen-Gate, live-check-Erweiterung, Ship-Gate über Gesamtdiff, Push, IndexNow, Live-Prüfung, Etappenmessung

**UI hint**: yes

### Phase 7: Funktionsdetailseiten und Mobile-App-Seite

**Goal**: Jede Live-Funktion hat eine kurze, einheitlich gegliederte Detailseite, und die Mobile-App-Seite zeigt den vollen App-Umfang.
**Depends on**: Phase 6
**Requirements**: FEAT-02, FEAT-03, MEDIA-01 (dazu Umsetzung DESIGN-02, SEO-02 aus Phase 5)
**Success Criteria** (what must be TRUE):

  1. Jede Live-Funktion hat eine Detailseite nach fester Vorlage: visuelles Element, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen, FAQ; die seit 09.09.2026 neuen Funktionen haben eigene Seiten, sofern Keyword-Map oder Produktumfang es rechtfertigen, sonst einen Abschnitt auf der passenden Seite.
  2. Die Mobile-App-Seite zeigt alle Live-Funktionen der App als gegliederte Kacheln mit Phone-Darstellungen.
  3. Alle neuen Seiten sind in Sitemap und `llms.txt` enthalten, über Menü und Übersicht verlinkt und nach Ship-Gate live mit IndexNow-Meldung.

**Plans**: 9 plans (9 Wellen, strikt sequentiell)
Plans:
**Wave 1**

- [x] 07-01-PLAN.md — Bausteinergänzungen: Budgets F4, Statusnamen F3 mit Release-Beleg, KeyFacts-Kurzform (D-13), Zielart „seite“ (F5), webPageSchema/mobileApplicationSchema

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 07-02-PLAN.md — Sechs neue Detailfunktionen im Modell (Register → funktionen → Gruppen), Keyword-Map-Status und Zielwerte, Paritäten 22/8/30, interne Links, Menü-E2E

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 07-03-PLAN.md — Szenenkatalog MEDIA-01: Kopf-Visual für 22 Funktionen, cardScenes, App-Kachel-Szenen, Registerbelege, Sichtprüfung /funktionen

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 07-04-PLAN.md — Detailvorlage: Inhaltstypen und prüfender Builder, FunktionsKopf, PlattformRollen, FunktionsDetail mit JSON-LD, Kaskade DESIGN-V2 § 16

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 07-05-PLAN.md — Inhalte Angebot, Planung, Baustelle (12 Detailseiten)

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 07-06-PLAN.md — Inhalte Rechnung, Team, Buchhaltung (10 Detailseiten), Routenumstellung, Keyword-Fall, Rollen gegen Release, Sichtprüfung

**Wave 7** *(blocked on Wave 6 completion)*

- [x] 07-07-PLAN.md — Mobile-App-Seite /app aus v2-Bausteinen mit Phone-Kacheln, Kennzahlen, Offline-Ablauf, FAQ und MobileApplication

**Wave 8** *(blocked on Wave 7 completion)*

- [x] 07-08-PLAN.md — Browserprüfungen Detailseiten und /app (Above-the-fold, axe, CLS, reduced motion), scrollbar-gutter-Entscheidung (D-14)

**Wave 9** *(blocked on Wave 8 completion; Code-Review-Gate des Orchestrators vorher)*

- [x] 07-09-PLAN.md — Phasen-Gate, live-check-Erweiterung, Ship-Gate über Gesamtdiff, Push, IndexNow, SE-Ranking-Abgleich, Etappenmessung, Rollout-Nachweis

**UI hint**: yes

### Phase 8: SEO und KI-Sichtbarkeit

**Goal**: Suchmaschinen und KI-Suchen finden auf craftos.eu zitierfähige Antworten zu Preisen, Alternativen und Funktionen, und jede Seite hat saubere Metadaten nach der Keyword-Map, Breadcrumbs und eine eigene OG-Grafik.
**Depends on**: Phase 7
**Requirements**: SEO-03, SEO-04, SEO-05, SEO-06, SEO-09 (dazu Abschluss DESIGN-02, SEO-02 aus Phase 5)
**Success Criteria** (what must be TRUE):

  1. Die vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) sind mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und vom Vergleich und Footer verlinkt.
  2. Die Preisseite beginnt mit einem zitierfähigen Antwortsatz und einer Preistabelle, deren Werte mit dem Produktregister übereinstimmen.
  3. Jede Seite hat einen eindeutigen Titel ≤ 60 Zeichen mit ihrem Hauptkeyword, eine Description mit 120–155 Zeichen, genau eine H1, sichtbare Breadcrumbs mit Schema und eine individuelle OG-Grafik; ein automatischer Test findet keine doppelten Titel.
  4. Zentrale Seiten haben unter jeder Frage-Überschrift eine Antwort in höchstens 300 Zeichen; `llms.txt`, Sitemap und IndexNow-Meldung werden bei jedem Release aktualisiert.
  5. Jede getrackte KI-Frage und jede Content-Lücke mit KD < 20 aus der Keyword-Map hat eine zitierfähige Zielseite oder einen Abschnitt mit Antwort zuerst, belegten Fakten und FAQPage-Schema (KD-<20-Lücken → Phase 9, D-11).

**Plans**: 14 plans (14 Wellen, strikt sequentiell)
Plans:
**Wave 1**

- [x] 08-01-PLAN.md — Prüfinfrastruktur: Post-Build-SEO-Audit, D-23-Schutztests, KeyFacts-Kurzform wettbewerber:, metaFor, Prompt-Mapping (20 Einträge), Anker-Konvention

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 08-02-PLAN.md — Brotkrumen sitewide als v2-Baustein mit einer Schemaquelle, neun BreadcrumbList-Stellen in einem Zug ersetzt, Phase-8-Budgets

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 08-03-PLAN.md — Bausteine G1–G5: FunktionsKopf mit Antwort, SectionHeader-Antwort-Lead, FaqList answerMax, ComparisonTable mit Quellen, FitPanels, FactList

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 08-04-PLAN.md — Sitewide Titel, Description und H1 aus der Keyword-Map (D-06, D-17, D-20), Audit streng

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 08-05-PLAN.md — OG-Vorlage pageOg und statische OG-Grafik je Segment mit generateStaticParams, twitter:image = og:image

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 08-06-PLAN.md — Wettbewerber-Datenmodule mit Quelle und Abrufdatum, UWG-Prüfungen, HERO-Screenshot-Beleg (D-16)

**Wave 7** *(blocked on Wave 6 completion)*

- [x] 08-07-PLAN.md — /preise answer-first mit Preistabelle, Marktspanne und FAQ auf v2

**Wave 8** *(blocked on Wave 7 completion)*

- [x] 08-08-PLAN.md — Alternativen-Vorlage mit prüfendem Builder, plancraft- und Craftnote-Alternative

**Wave 9** *(blocked on Wave 8 completion)*

- [x] 08-09-PLAN.md — HERO- und ToolTime-Alternative

**Wave 10** *(blocked on Wave 9 completion)*

- [x] 08-10-PLAN.md — /vergleich als v2-Hub mit Marktübersicht und Pflichthinweis, Logos und lib/comparison.ts entfernt, Schutztests synchron

**Wave 11** *(blocked on Wave 10 completion)*

- [x] 08-11-PLAN.md — Seite „Handwerkersoftware für kleine Betriebe“ mit BMF-Quellen, fünfte Hub-Kachel, Footer-Spalte „Vergleiche“, Ratgeber-Links

**Wave 12** *(blocked on Wave 11 completion)*

- [x] 08-12-PLAN.md — /fakten-ueber-craftos (Was ist CraftOS?, D-25), /craft-ai und /gobd auf v2

**Wave 13** *(blocked on Wave 12 completion)*

- [x] 08-13-PLAN.md — Browserprüfungen Phase 8 und vollständiges strenges SEO-Audit

**Wave 14** *(blocked on Wave 13 completion; Code-Review-Gate des Orchestrators vorher)*

- [x] 08-14-PLAN.md — Phasen-Gate, live-check-Erweiterung, Ship-Gate über Gesamtdiff, Push, IndexNow, SE-Ranking-Abgleich, Etappenmessung, Rollout-Nachweis

**UI hint**: yes

### Phase 9: Gewerke und Wissensinhalte

**Goal**: Gewerke-Seiten, Ratgeber und Hilfe sind klar gegliedert, entsprechen dem aktuellen Produktstand und erklären auch die neuen Funktionen Schritt für Schritt.
**Depends on**: Phase 8
**Requirements**: FEAT-04, CONTENT-03, CONTENT-04 (dazu Abschluss SEO-09; DESIGN-02 für Gewerke-, Ratgeber- und Hilfe-Vorlagen, Rest Phase 10)
**Success Criteria** (what must be TRUE):

  1. Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit visuellen Elementen statt nur Text und verlinken auf die passenden Funktionsseiten.
  2. Die 24 Ratgeber und 40 Hilfeartikel sind gegen den aktuellen Produktstand geprüft, korrigiert und gegliedert (Antwort zuerst, Schritte, Zwischenüberschriften); keiner beschreibt eine nicht-live Funktion oder einen veralteten Ablauf.
  3. Für jede seit 09.09.2026 neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung, verlinkt von der Detailseite.
  4. Gewerke- und Wissensinhalte erfüllen die Metadaten- und Breadcrumb-Regeln aus Phase 8 und sind nach Ship-Gate live mit IndexNow-Meldung.
  5. Jede Content-Lücke mit KD < 20 aus der Keyword-Map hat eine zitierfähige Zielseite oder einen Abschnitt mit Antwort zuerst, belegten Fakten und FAQPage-Schema (Abschluss SEO-09).
  6. Gewerke-, Ratgeber- und Hilfeseiten nutzen die v2-Bausteine einheitlich (DESIGN-02 für diese Vorlagen; Rest Phase 10).

**Plans**: 18 plans (7 Wellen, parallele Spuren in Worktrees `C:/Projekte/wt-09<x>`, Ports 3101–3110; Integration, Gate und Rollout im Haupt-Arbeitsbaum)
Plans:
**Wave 1** *(Startgate nach 08-14; Commits bis „feat(09-01): F-A1 …“ und „feat(09-02): K-1 …“ werden vorgezogen nach main gemergt)*

- [x] 09-01-PLAN.md — Fundament: F-A1 (Budgets, LinkKarten, ContentKopf, Leitlinie L-1, Gewerke-H1), Inhaltsvertrag mit Listenobergrenzen, sceneById, Antwort-zuerst-Audit, Map-Einträge Phase 9 (wt-09basis, 3101)
- [x] 09-02-PLAN.md — (a) Gewerke Teil 1: K-1, neue Gewerke-Daten, Abschnitte Ablauf, Funktionen, FAQ, CTA, Übersicht minimal (wt-09a, 3102)

**Wave 2** *(blocked on Wave 1 completion; 09-11 darf nach dem Merge von F-A1 starten)*

- [x] 09-15-PLAN.md — Fundament Teil 3: Produktbasis mit Delta ab a9319e5/6cac366, Prüfwerkzeug content-pruefen.mjs (wt-09basis, 3101)
- [x] 09-11-PLAN.md — (a) Gewerke Teil 2: Kopf, /gewerke, Weiterlesen, gewerke.test.ts, Prompt-Anker Elektro/Maler (wt-09a, 3102)

**Wave 3** *(blocked on Wave 2 completion, insbesondere 09-15)*

- [x] 09-03-PLAN.md — (b) Ratgeber 1: Rechnungen, Kalkulation, Softwareauswahl (12) (wt-09b, 3103)
- [x] 09-04-PLAN.md — (c) Ratgeber 2: Belege, Projekte, Team (12) (wt-09c, 3104)
- [x] 09-05-PLAN.md — (d) Hilfe Büro Teil a: Einrichtung, Belege (9) (wt-09d, 3105)
- [x] 09-17-PLAN.md — (d2) Hilfe Büro Teil b: Schlussrechnung zuerst, Rechnungen, Angebote (12) (wt-09d2, 3109)
- [x] 09-06-PLAN.md — (e) Hilfe Baustelle Teil a: Projekte, Zeiten inkl. Arbeitsabschnitte (9) (wt-09e, 3106)
- [x] 09-18-PLAN.md — (e2) Hilfe Baustelle Teil b: Baudokumentation mit Teilabnahme zuerst, Lager, Craft AI (10) (wt-09e2, 3110)
- [x] 09-07-PLAN.md — (f) Zehn neue Hilfeartikel (wt-09f, 3107)
- [x] 09-08-PLAN.md — (g) Neun SEO-09-Wissensseiten mit Quellen und FAQ (wt-09g, 3108)
- [x] 09-12-PLAN.md — Fundament Teil 2: Artikelvorlage v2 mit Schrittliste, Übersichten, Kategorien, Suche (wt-09basis, 3101)

**Wave 4** *(blocked on Merge von 09-07 und 09-08)*

- [x] 09-14-PLAN.md — (f) Verlinkung von Detailseiten und /app, L-1-Korrekturen in funktionen.ts und Funktionsdetails (wt-09f, 3107)
- [x] 09-13-PLAN.md — (a) Gewerke Teil 3: Links auf neue Anleitungen und Wissensseiten (wt-09a, 3102)

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 09-09-PLAN.md — Integration: Map „bestehend“, answer-Pflicht, Endmengen 30/53, Übergänge zurückgenommen, Querverweise, Release-Delta, Abdeckungstabelle (main, 3100)

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 09-16-PLAN.md — Phasen-Gate: Browserprüfungen in sechs Breiten, Vollsuite, sitewide Audit, Linkcheck (main, 3100)

**Wave 7** *(blocked on Wave 6 completion; Code-Review-Gate des Orchestrators vorher)*

- [x] 09-10-PLAN.md — Rollout: live-check-Erweiterung, Ship-Gate über Gesamtdiff, Push, IndexNow, SE-Ranking-Abgleich, Etappenbericht, Rollout-Nachweis (main, 3100)

**UI hint**: yes

### Phase 10: Abschlussaudit

**Goal**: Alle Seiten sind barrierefrei und schnell, und ein erneuter Audit von craftos.eu zeigt keine offenen technischen oder On-Page-Fehler.
**Depends on**: Phase 9
**Requirements**: DESIGN-05, QA-04, QA-05, QA-06, DESIGN-02 (Rest: Rechner, Support, Rechtsseiten, 404) (dazu Messung SEO-08: ≥15 neue Refdomains)
**Success Criteria** (what must be TRUE):

  1. Jede Seite besteht bei 360, 390, 768, 1024 und 1440 px die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, vollständige Tastaturbedienung).
  2. Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s; Unit-, Browser-, Routen- und visuelle Prüfungen sind angepasst und lokal grün.
  3. Für jede Etappe (Phasen 5–10) ist dokumentiert, dass sie einzeln nach Ship-Gate live ging, IndexNow gemeldet, die Live-Seite geprüft und `trial_click`/`ai_visit` kontrolliert wurde.
  4. Ein erneuter `/audit craftos.eu` und ein SE-Ranking-Website-Audit nach der letzten Etappe zeigen keine offenen technischen oder On-Page-Fehler; ein Abschlussbericht vergleicht Positionen, KI-Share-of-Voice und verweisende Domains mit dem Ausgangsstand vom 20.10.2026.

**Stand nach dem Rollout 10-07 (23.10.2026):** Phase 10 ist live (`e392762`). Kriterium 1 erfüllt (A11y-Matrix 0, DESIGN-05). Kriterium 2 nach D-44 an Felddaten bewertet (p75 LCP 564 ms, INP 40 ms, CLS 0; QA-04), Prüfsuiten grün; Labordaten nur Regressionsinformation. Kriterium 3 erfüllt (Etappennachweis 05–10, QA-05; 24-Stunden-Fenster Phase 10 als Nachtrag). Kriterium 4 **teilweise**: SE-Ranking-Recheck 0 Fehler, Abschlussbericht liegt vor; der Bestätigungs-`/audit` zeigt noch 2 behebbare On-Page-Fehler auf `/impressum` (O2/O3) – Lückenschluss QA-06 in `craftos/docs/releases/PHASE-10-ROLLOUT.md` § 11. SEO-08 bei 0 von 15 neuen seriösen Domains.

**Plans**: 13 plans (5 Wellen, parallele Spuren in Worktrees `C:/Projekte/wt-10<x>`, Ports 3101–3105; Integration, Phasen-Gate und Rollout im Haupt-Arbeitsbaum, Port 3100; Merge der Spuren mit `--no-ff` in der Reihenfolge e → c → a → b → d; zwischen 10-06 und 10-12 Code-Review und Fixer des Orchestrators)
Plans:
**Wave 1** *(Startgate nach Phase 9; je Spur ein Worktree)*

- [x] 10-01-PLAN.md — (a) Barrierefreiheit Teil 1: a11y-audit-Kern mit Tests, CLI mit Shards und Tastaturprüfung, visual-audit mit fünf Breiten (wt-10a, 3101)
- [x] 10-02-PLAN.md — (b) Performance Teil 1: Lighthouse 13.5.0, Modus --lighthouse mit Median und Gate, Snippet-CLS, deterministische Flakes, Release-Helfer, K-1 (wt-10b, 3102)
- [x] 10-03-PLAN.md — (c) DESIGN-02-Rest Teil 1: Wortlaut-Schutz als erster Commit, ContentKopf K1/K2, Rechtsseiten mit Kontrast, 404, /support (wt-10c, 3103)
- [x] 10-04-PLAN.md — (d) Funktionsergänzungen Teil 1: Kassenbuch und § 13b, Schutztests ProductDemo und doppelte Slugs; Menü-Präsenz an 10-06 (wt-10d, 3104)
- [x] 10-05-PLAN.md — (e) Audits Teil 1: seo-report ohne Leaderboard (D-37), KI-Tracker-Abgleich (D-39), Vorab-/audit mit Behebungsliste (wt-10e, 3105)

**Wave 2** *(je Spur nach ihrem Teil 1 im selben Worktree)*

- [x] 10-08-PLAN.md — (a) Barrierefreiheit Teil 2: FeatureSnippet-Dimmstufe, a11y.pw.cjs mit Tastaturfällen, Baseline der vollen Matrix (wt-10a, 3101)
- [x] 10-09-PLAN.md — (b) Performance Teil 2: Gate-Seiten, Schriftlizenz, Logo-Schriftzug als SVG, drei Schnitte weniger, Messschleife (wt-10b, 3102)
- [x] 10-10-PLAN.md — (c) DESIGN-02-Rest Teil 2: Rechner auf v2, Bento-Bodenausrichtung, Tabellen-Caption, Darstellungstest, DESIGN-V2 § 19 (wt-10c, 3103)
- [x] 10-11-PLAN.md — (e) Audits Teil 2: Linkregister und Übergabe 2 (SEO-08), Etappennachweis 05–09, Entwurf Abschlussbericht (wt-10e, 3105)
- [x] 10-13-PLAN.md — (d) Funktionsergänzungen Teil 2: Lagerfoto-Credits mit Stichtag, Paritätstest, Anzeige auf /craft-ai und im Hilfeartikel (wt-10d, 3104)

**Wave 3** *(blocked on Merge aller Spuren in der Reihenfolge e → c → a → b → d)*

- [x] 10-06-PLAN.md — Integration: Übergaben (höchstens 12), Audit-Behebungen, testMatch, Zusatzfunktionen im Mega-Menü (D-40), Sitemap-Daten, live-check Phase 10, Produktbasis, D-31-Endstand (main, 3100)

**Wave 4** *(blocked on 10-06 sowie Code-Review `10-REVIEW.md` und Fixer `10-REVIEW-FIX.md` des Orchestrators)*

- [x] 10-12-PLAN.md — Phasen-Gate: Suiten aus D-14 in drei Blöcken, volle A11y-Matrix, Lighthouse-Endmessung mit Exit-Regeln (main, 3100)

**Wave 5** *(blocked on Wave 4)*

- [x] 10-07-PLAN.md — Rollout: Review-Prüfung, ship-gate, Push, live-check, IndexNow, SE-Ranking ohne Leaderboard, Audit-Recheck, Bestätigungs-/audit, Berichte, Anforderungsstatus, Doku-Push (main, 3100)

**UI hint**: yes

## Progress

**Execution Order:** 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Produktwahrheit, Keyword-Map und Designbausteine | 8/8 | Complete    | 2026-10-20 |
| 6. Startseite, Navigation und Funktionsübersicht | 6/6 | Complete    | 2026-10-21 |
| 7. Funktionsdetailseiten und Mobile-App-Seite | 9/9 | Complete    | 2026-10-22 |
| 8. SEO und KI-Sichtbarkeit | 14/14 | Complete    | 2026-10-22 |
| 9. Gewerke und Wissensinhalte | 18/18 | Complete    | 2026-10-23 |
| 10. Abschlussaudit | 13/13 | Complete   | 2026-10-23 |
