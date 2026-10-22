---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: – Überblick
status: executing
stopped_at: Completed 08-04-PLAN.md
last_updated: "2026-10-22T17:09:09.026Z"
last_activity: 2026-10-22 – 08-04 Sitewide Titel, Description und H1 aus der Keyword-Map (18 Zielwerte ergänzt, 62 H1 nach D-17, alle Routen über metaFor/zielwerte, Audit title/description/h1/duplikate/keyword/map 0 Verstöße)
progress:
  total_phases: 6
  completed_phases: 3
  total_plans: 37
  completed_plans: 27
  percent: 73
---

# State

## Project Reference

See: .planning/PROJECT.md (updated 2026-10-20)

**Core value:** Besucher verstehen den Produktablauf anhand lesbarer Beispiele und direkter App-Aufnahmen und können die richtige Funktion und Anleitung schnell finden.
**Current focus:** Phase 8 — SEO und KI-Sichtbarkeit

## Vorheriger Milestone v1.0 (abgeschlossen)

Lokale Umsetzung, Abnahme und Übernahme in C:/Projekte/Websitenerstellung abgeschlossen; Veröffentlichung am 9. September 2026 über den Produktionsbranch main und das Vercel-Projekt craftos. Produktbasis damals: Website 142ab82; Web d442df68; Mobile 9e6260d (Quellen in craftos/docs/PRODUCT-REGISTER.md und product-source-snapshot.json). Umfang: 24 Ratgeber, 40 Hilfeartikel, zwei Rechner, sechs Beispieldemos, 16 Funktionsseiten, zwölf Gewerke, GoBD und belegter Vergleich. Abnahme: 81 Unit-Tests, 98 Browserfälle, Build/Lint/Typprüfung grün; Gesamtbericht craftos/docs/RELAUNCH-ABNAHME.md, Release-Abgleich craftos/docs/RELEASE-2026-09-09.md.

## Current Position

Phase: 8 (SEO und KI-Sichtbarkeit)
Plan: 5 of 14 (08-01 bis 08-04 abgeschlossen)
Status: Ready to execute
Last activity: 2026-10-22 – 08-04 Sitewide Titel, Description und H1 aus der Keyword-Map (18 Zielwerte ergänzt, 62 H1 nach D-17, alle Routen über metaFor/zielwerte, Audit title/description/h1/duplikate/keyword/map 0 Verstöße)

Progress: [███████░░░] 73% (27/37 Pläne des Milestones; Phase 8: 4/14)

Last session: 2026-10-22T17:09:09.013Z
Stopped at: Completed 08-04-PLAN.md
Resume file: None

## Accumulated Context

### Decisions

- Milestone v2.0: Schrittweiser Rollout, jede Phase endet live nach Ship-Gate, IndexNow und Analytics-Kontrolle (Inhaberentscheidung 20.10.2026).
- Milestone v2.0: Produktfakten nur aus `origin/release` (Web v4.0.0-test.238, Mobile mobile-v1.0.0-test.93).
- 20.10.2026 Umfangsänderung (Inhaber): keine detailgetreuen Screenshots, kein Demo-Betrieb, keine Videos (MEDIA-02 Out of Scope); Seite strukturierter und schöner mit vereinfachten Darstellungen; SEO-02 (Keyword-Map) nach Phase 5 vorgezogen, Quelle SE Ranking Data API.
- Roadmap v2.0: Übergreifende QA (DESIGN-05, QA-04, QA-05, QA-06) wird in Phase 10 abschließend nachgewiesen; jede Phase hält die Seite grün.
- [Phase 05]: 05-01: Keyword-Auswahlregel – höchstes Volumen unter pageCandidates mit KD ≤ 30, Abweichungen nur mit reason; Zahlen nur aus Exportobjekt (SE Ranking DE)
- [Phase 05]: 05-01: 15 Seiten ohne belegtes Suchvolumen bleiben ohne Hauptkeyword statt geschätzter Begriffe; Kannibalisierungsschutz über Begriffe statt Intent-Codes (DE fast nur I)
- [Phase 05]: 05-02: Produktregister bezieht sich ausschließlich auf origin/release (Web 07cf0645 / v4.0.0-test.238, Mobile 5610a064 / mobile-v1.0.0-test.93)
- [Phase 05]: 05-02: Kundenportal live (D-11); Ankündigungen nicht-live Funktionen vollständig entfernt, durch announcements.test.ts und route-audit-Flag announcement gesperrt
- [Phase 05]: 05-02: Vorhersagen nur intern als liveExtra mit advertised false (Umfang ungeprüft)
- [Phase 05]: 05-03: Lizenznamen einheitlich Voll-Lizenz (Admin oder Büro) und App-Lizenz; Preise nur aus site.ts, geprüft gegen docs/product-pricing-snapshot.json (origin/release 07cf0645)
- [Phase 05]: 05-03: KI-Credits als einmaliges Startguthaben (150) plus im Voraus gekaufte Pakete; Schema-Offer mit valueAddedTaxIncluded false
- [Phase 05-04]: TEXT_BUDGET enthält Mengen unter count; Bausteine erzwingen Text- und Mengenbudgets beim Rendern mit UI-SPEC-Fehlertexten
- [Phase 05-04]: StepFlow als Maßkette (Sechseck-Knoten + Maßlinie mit Endstrichen); tone=amber mit dunklem Knoten
- [Phase 05-04]: Wirksames ink-100 ist #f7f3eb; v2-Module nutzen UI-SPEC-Hexwerte und var()-Fallbacks
- [Phase 05]: 05-05: FeatureCard hat genau einen gestreckten Link „Mehr zu {name}“ und prüft tier heute plus belegte Plattformen gegen lib/funktionen.ts
- [Phase 05]: 05-05: MediaFigure übersetzt priority in loading=eager + fetchPriority=high (next/image priority in Next.js 16 abgekündigt)
- [Phase 05]: 05-05: Geräterahmen komplett aria-hidden + inert, Bedeutung über Pflicht-Prop description (sr-only); DevicePair trägt genau eine Kennzeichnung
- [Phase 05]: 05-05: Mini-UI-Statusnamen nur Entwurf, Offen, Gesendet, Bezahlt, Überfällig, Storniert (Beleg web:src/pages/Dokumente.tsx)
- [Phase 05]: 05-06: werkstatt-2026 ist KI-generiert und wird auf /styleguide als „Darstellung, KI-gestaltet“ gekennzeichnet; Kennzeichnung auf /gewerke folgt in Phase 6–8
- [Phase 05]: 05-06: Bildbudget prüft nur referenzierte Dateien inkl. per Verzeichnis aufgelöster dynamischer Pfade; Formatausnahmen icon-192/512 und craftnote.png begründet
- [Phase 05]: 05-06: CLS-Ursachen in FeatureSnippet (Pause-Knopf) und SupplementalScene (Statuspille) per CSS-Platzreserve behoben, Animation unverändert
- [Phase 05]: 05-07: Projekt 13094375 trackt alle 126 Hauptkeywords der Keyword-Map (19 geplante mit geplantem Pfad); limits[] leer, SEO-07 erledigt
- [Phase 05]: 05-07: SEO-08 in REQUIREMENTS offen bis Plan 05-08; mindestens 15 neue seriöse Refdomains bleibt Meilensteinziel
- [Phase 05]: 05-07: Portal-Mailtexte nicht neu formuliert; Register und LINKPLAN nennen Empfänger, Absender und Betreffvorschlag
- [Phase 06]: 06-01: lib/funktionsgruppen.ts ist einzige Quelle für Menü, Startseite und /funktionen (6 Gruppen, 16 Detail- + 14 Zusatzfunktionen); Grenzfälle Dashboard→Buchhaltung, Kundenportal→Angebot, Projekt-Chat→Team, Datenübernahme→Team; Craft AI nur Fußleistenlink
- [Phase 06]: 06-02: data-evidence nur als Kurzform web:/app: (components/v2/evidence.ts erzwingt sie); voller Beleg nur in lib/scenes.ts; Szenen/Rahmen über lib/scenes.ts und components/v2/SceneContent.tsx; cardScenes nur für aufmass, plantafel, zeiterfassung, baudokumentation, rechnungen
- [Phase 06]: 06-03: Nur das Mega-Menü „Funktionen“ ist breit und am Header zentriert; Gewerke-Panel (570 px) hängt am Hauptpunkt (WCAG 1.4.13)
- [Phase 06]: 06-03: onBlur schließt nur bei bekanntem Fokusziel außerhalb; WebKit-Linkklick nach Tastaturöffnung bleibt funktionsfähig
- [Phase 06]: 06-03: Navigationslinks mit tabIndex 0 (WebKit-Tab); Logo in Inhaltsbreite, 12-px-Lücken zwischen 1121 und 1250 px
- [Phase 06]: 06-04: Startseite = Hero + 7 v2-Abschnitte, Texte nur in lib/home-content.ts, Werte aus site/tarife/Register; FeatureSnippet, GoBD-Box, Ratgeber-Block und alte PricingTable entfallen auf / (Zielseiten bleiben)
- [Phase 06]: 06-04: H1 der Startseite unter 400 px 28 px (auch 390 px); Flaechenanpassungen der Bausteine als unlayered CSS ueber data-home-section (Tailwind-Utilities verlieren gegen CSS-Module)
- [Phase 06]: 06-05: /funktionen = FunktionenHead + 6 Gruppenabschnitte (FeatureCard-Raster + FeatureList je Gruppe) + CtaBand; ItemList nur mit den 16 Detailseiten; PageHero, TrialCta und .feature-grid entfallen
- [Phase 06]: 06-05: BentoTile lg mit Browserrahmen füllt Breite und freie Höhe (mind. 16:10), Text am Kachelboden; wide-Visual mittig in seiner Spalte
- [Phase 06]: Phase 6 live (dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq): live-check prueft Title/H1/Description aus keyword-map.json und Detail-Slugs aus der Sitemap; DESIGN-02 und SEO-02 bleiben bis Phasen 7–8 offen
- [Phase 07]: 07-01: MiniStatusName um 16 am Release belegte Namen erweitert (MINI_STATUS_BELEGE, MINI_STATUS_TON); Farben nur über data-tone neutral/positiv/hervorgehoben, Bestandsfarben unverändert; Belegtest am gepinnten productBasis-Commit
- [Phase 07]: 07-01: KeyFacts-Quellen nur als Kurzform site:/register: (Laufzeitprüfung), keine internen Modulnamen in data-source
- [Phase 07]: 07-01: webPageSchema ohne isPartOf (Layout hat keinen WebSite-Knoten); mobileApplicationSchema mit eigener @id /app#mobile-app, App-Lizenz netto, ohne Bewertungen
- [Phase 07]: 07-02: Sechs live Funktionen (gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement) sind Detailfunktionen; Belege in evidence/mobileEvidence, liveExtras mit 8 beworbenen Einträgen
- [Phase 07]: 07-02: Alle 8 Zusatzfunktionen haben ein Ziel (7 Detailseiten mit Funktionsname als label, 21 Sprachen -> /app kind seite); ZUSATZ_IDS gegen beworbene Registereinträge getestet
- [Phase 07]: 07-02: Keyword-Map: sechs Pfade bestehend im selben Commit wie Sitemap; H1/Description laut 07-UI-SPEC SEO-Vertrag bereinigt (KEYWORD-MAP.md § 6); pageCandidates für datenuebernahme und maengelmanagement ergänzt
- [Phase 07]: 07-03: cardScenes wird aus kopfVisuals abgeleitet (Paar → Browser-Szene) und bleibt FrameVisual { kind, scene }; ein Katalog für Kopf, Karten und /app
- [Phase 07]: 07-03: Kundenportal-Szene zeigt die Portal-Rechnungsansicht (CustomerInvoice.tsx, Rechnungsdetails), weil die Startansicht am Release keine Belegliste hat; Belegscan mit Release-Feldname Nettobetrag (€)
- [Phase 07]: 07-04: Builder lib/funktionsdetails (server-only) prüft Inhalte gegen alle 07-UI-SPEC-Regeln; genau eine Grenze-Kachel je Seite – angebote braucht in 07-05 eine Grenze-Kachel (fehlt in UI-SPEC-Tabelle)
- [Phase 07]: 07-04: FeatureSnippet mit optionalem headingLevel (Standard 2), Detailvorlage nutzt h3 – eine H2 je Abschnitt
- [Phase 07]: 07-04: Kartenrahmen auf /funktionen: Frame karte zeigt höchstens 2 Zeilen je Browser-Szene, 1024–1119 px nur 1 (umbrechende Kennzeichnung); Kopf-Visual unverändert
- [Phase 07]: 07-05: angebote führt die Grenze-Kachel „DATANORM v5 nicht pauschal zugesagt“ statt „Dokumente ausgeben“ (Anordnung md·sm·sm·wide·wide bleibt)
- [Phase 07]: 07-05: Wortregel erlaubt „automatisch“ in einer FAQ-Frage, deren Antwort mit „Nein“ beginnt
- [Phase 07]: 07-06: Route /funktionen/[slug] dünn (zielwerte + FunktionsDetail); synthetische faq/seoTitle/seoDescription aus lib/funktionen.ts entfernt
- [Phase 07]: 07-06: Browserrahmen im FunktionsKopf wächst mit seinen Zeilen (mind. 16:10), keine angeschnittenen Zeilen bei 360 px; Terminplanung-Beispielnamen gekürzt
- [Phase 07]: 07-07: mobileOffline ist eigener Registereintrag mit 4 Mobile-Release-Belegen und der Limitation „Keine vollständige Offline-Zusage“; Offline auf /app nur als Kennzahl mit Einschränkung, Hinweis, Ablauf und FAQ „Teilweise:“
- [Phase 07]: 07-07: In Phone-Rahmen bricht Statuspille bzw. Wert unter den Text statt Ellipse; 160-px-Titel 12 px; Leerraum der lg-Kacheln mit Phone 194 (165–189 px) geht an 07-08
- [Phase 07]: 07-08: D-14 entschieden – globales scrollbar-gutter entfernt; HeaderShell setzt es nur während des Drawer-Scroll-Locks mit klassischer Scrollleiste (gemessen: 15-px-Leerrinne auf der 404-Seite bei 1920 × 1080 in Chromium)
- [Phase 07]: 07-08: B10 – große Bento-Kachel mit Phone ab 1024 px mit höhengekoppelter Phone-Breite (160–320 px), ab Seitenverhältnis 4:5 Phone und Text nebeneinander; Leerraum vorher bis 220 px, nachher höchstens 25 px
- [Phase 07]: 07-08: FeatureSnippet beendet Animationen bei reduzierter Bewegung (finish statt pause); axe-Fälle prüfen den statischen Zustand
- [Phase 07]: 07-09: Phase 7 live (126f807, Vercel dpl_5xujdhv6bnYnxsHhzNpQUNHPdFyQ READY), live-check 46/46, IndexNow 131 URLs HTTP 200; FEAT-02/FEAT-03/MEDIA-01 erledigt, DESIGN-02/SEO-02 offen bis Phase 8
- [Phase 08]: 08-01: Post-Build-Audit scripts/seo-audit.mjs (12 Regeln, Ergebnis test-results/seo-audit.json mit Ist-Werten); Baseline 711 Verstöße (title 41, description 65, keyword 75, map 248/88 Seiten, breadcrumbs 140/130, og 130, faq-schema 1, antwort 1, duplikate 2, prompts 8)
- [Phase 08]: 08-01: D-23 – Testphasen-Scan nimmt nur lib/wettbewerber/ aus (dort Tageszahlen nur in testphaseTage/zitat); route-audit erlaubt 14 Tage nur unter /vergleich, dafür prüft ctaTestphaseFehler jeden CraftOS-CTA gegen trialDays
- [Phase 08]: 08-01: KeyFacts-Quelle wettbewerber:<schlüssel> zulässig; metaFor/zielwerte in lib/seo-meta.ts (Re-Export in lib/funktionsdetails)
- [Phase 08]: 08-01: Prompt-Mapping docs/seo/ai-prompts-targets.json (20 Einträge aus Rohdaten, Bestandsziele #faq-titel, Gewerke Phase 9, 9 luecken); Anker-Konvention DESIGN-V2 § 17
- [Phase 08]: 08-02: crumbsFor(path, current?) ist die einzige Brotkrumen-Quelle; Seiten rufen breadcrumbSchema nie direkt auf, Köpfe nehmen crumbs entgegen (FunktionsKopf, FunktionenHead, PageHero, ArticlePage, CalculatorPage, LegalShell)
- [Phase 08]: 08-02: Artikelketten mit 3 Gliedern (Start › Ratgeber|Hilfe › Titel) laut UI-SPEC; Kategorie-Zwischenstufe der alten BreadcrumbList entfällt
- [Phase 08]: 08-03: /styleguide Block 0 ist ein FunktionsKopf ohne Visual mit answer und stand (ersetzt PageHero), damit die Musterseite genau eine H1 behaelt
- [Phase 08]: 08-03: FitPanels-Quellenlink zeigt Quelle und traegt das Quellen-Label als sr-only-Zusatz (UI-SPEC 3.5 und U10)
- [Phase 08]: 08-03: SectionHeader erzwingt jetzt auch fuer Nicht-Frage-Titel genau einen Satz; Frage-Titel bekommen Antwort-Lead mit data-answer bis 300 Zeichen
- [Phase 08]: 08-04: Keyword-Map ist einzige Metadatenquelle – alle indexierten Routen rendern metaFor(pfad) und zielwerte(pfad).h1; Titel ohne Markenzusatz als title.absolute; Gewerke-Felder seoTitle/seoDescription entfallen
- [Phase 08]: 08-04: H1-Regel D-17 wörtlich – bisher gerenderte H1 bleibt, wenn sie das Kopfwort enthält; sonst Kopfwort vorangestellt oder Synonym ersetzt (62 H1, Tabelle KEYWORD-MAP.md § 6)
- [Phase 08]: 08-04: Kategorien einheitlich „Ratgeber: …“/„Hilfe: …“ (mit Hauptkeyword per Synonym-Ersatz); Gewerke-H1 = Gewerk-Software-Bezeichnung + bisheriger Slogan; Descriptions ohne Superlative (Überclaim-Test)

### Pending Todos

None yet.

### Blockers/Concerns

- SE-Ranking-Test endet am 03.11.2026 – Keyword-Map und Rohdatenabzug vorher abschließen. MCP `se-ranking` braucht OAuth-Anmeldung des Inhabers (`/mcp`).
- Offen beim Inhaber: Datenschutzabschnitt Webanalyse, Portale/Bewertungen, Search-Console-Exporte.

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| Phase 05 P01 | 27min | 3 tasks | 90 files |
| Phase 05 P02 | 35min | 2 tasks | 17 files |
| Phase 05 P03 | 10 min | 3 tasks | 12 files |
| Phase 05 P04 | 20 min | 2 tasks | 16 files |
| Phase 05 P05 | 17 min | 2 tasks | 21 files |
| Phase 05 P06 | 36 min | 3 tasks | 24 files |
| Phase 05 P07 | 17min | 3 tasks | 16 files |
| Phase 06 P01 | 7min | 2 tasks | 6 files |
| Phase 06 P02 | 14min | 3 tasks | 16 files |
| Phase 06 P03 | 25min | 3 tasks | 15 files |
| Phase 06 P04 | 22min | 3 tasks | 13 files |
| Phase 06 P05 | 32min | 2 tasks | 12 files |
| Phase 06 P06 | 35min | 2 tasks | 10 files |
| Phase 07 P01 | 25min | 2 tasks | 14 files |
| Phase 07 P02 | 19min | 3 tasks | 21 files |
| Phase 07 P03 | 55min | 2 tasks | 7 files |
| Phase 07 P04 | 45min | 3 tasks | 19 files |
| Phase 07 P05 | 15min | 3 tasks | 5 files |
| Phase 07 P06 | 36min | 3 tasks | 10 files |
| Phase 07 P07 | 32min | 2 tasks | 8 files |
| Phase 07 P08 | 61min | 2 tasks | 13 files |
| Phase 07 P09 | 20min | 2 tasks | 13 files |
| Phase 08 P01 | 58min | 3 tasks | 19 files |
| Phase 08 P02 | 62min | 3 tasks | 39 files |
| Phase 08 P03 | 33min | 2 tasks | 18 files |
| Phase 08 P04 | 33min | 3 tasks | 29 files |
