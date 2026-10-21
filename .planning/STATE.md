---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: – Überblick
status: executing
stopped_at: Completed 07-02-PLAN.md
last_updated: "2026-10-21T17:31:43.970Z"
last_activity: 2026-10-21 – 07-02 Funktionsmodell 22 + 8, Keyword-Map-Status und Zielwerte, interne Links, E2E 22/8 abgeschlossen
progress:
  total_phases: 6
  completed_phases: 2
  total_plans: 23
  completed_plans: 16
  percent: 33
---

# State

## Project Reference

See: .planning/PROJECT.md (updated 2026-10-20)

**Core value:** Besucher verstehen den Produktablauf anhand lesbarer Beispiele und direkter App-Aufnahmen und können die richtige Funktion und Anleitung schnell finden.
**Current focus:** Phase 7 — Funktionsdetailseiten und Mobile-App-Seite

## Vorheriger Milestone v1.0 (abgeschlossen)

Lokale Umsetzung, Abnahme und Übernahme in C:/Projekte/Websitenerstellung abgeschlossen; Veröffentlichung am 9. September 2026 über den Produktionsbranch main und das Vercel-Projekt craftos. Produktbasis damals: Website 142ab82; Web d442df68; Mobile 9e6260d (Quellen in craftos/docs/PRODUCT-REGISTER.md und product-source-snapshot.json). Umfang: 24 Ratgeber, 40 Hilfeartikel, zwei Rechner, sechs Beispieldemos, 16 Funktionsseiten, zwölf Gewerke, GoBD und belegter Vergleich. Abnahme: 81 Unit-Tests, 98 Browserfälle, Build/Lint/Typprüfung grün; Gesamtbericht craftos/docs/RELAUNCH-ABNAHME.md, Release-Abgleich craftos/docs/RELEASE-2026-09-09.md.

## Current Position

Phase: 7
Plan: 3 of 9 (07-01, 07-02 abgeschlossen)
Status: In progress
Last activity: 2026-10-21 – 07-02 Funktionsmodell 22 + 8, Keyword-Map-Status und Zielwerte, interne Links, E2E 22/8 abgeschlossen

Progress: [███████░░░] 70% (16/23 Pläne des Milestones; Phase 7: 2/9)

Last session: 2026-10-21T17:31:37.482Z
Stopped at: Completed 07-02-PLAN.md
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
