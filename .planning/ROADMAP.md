# Roadmap

## Milestones

- [x] **v1.0 Relaunch** – Phasen 1–4 (abgeschlossen, veröffentlicht am 09.09.2026)
- [ ] **v2.0 Produktstand, Redesign und Sichtbarkeit** – Phasen 5–10 (aktiv)

## Vorheriger Milestone v1.0 (abgeschlossen)

Phasen 1–4 (Produktgrundlage und Gestaltung, Produkterlebnis, Wissen und Werkzeuge, Abnahme) sind lokal umgesetzt, geprüft und am 09.09.2026 veröffentlicht. Validierte Anforderungen: UI-01, PROD-01, DEMO-01, CONTENT-01, CONTENT-02, CALC-01, SEO-01, QA-01, QA-02, QA-03. Nachweise: `craftos/docs/RELAUNCH-ABNAHME.md`, `craftos/docs/RELEASE-2026-09-09.md`.

## Milestone v2.0 – Überblick

craftos.eu zeigt den kompletten aktuellen Funktionsumfang mit echten Bildern und kurzen Videos statt langer Texte, wirkt markant und ist für Google und KI-Suchen auf die richtigen Suchbegriffe ausgerichtet.

**Rollout-Regel (Inhaberentscheidung 20.10.2026):** Jede Phase endet in einem auslieferbaren Live-Stand: Ship-Gate → Push auf `main` → IndexNow-Meldung → Live-Prüfung → Kontrolle von `trial_click`/`ai_visit` in Vercel Analytics. Prüfungen laufen ausschließlich lokal (Docker/Zentrale), nie über GitHub Actions. Die übergreifenden Qualitätsanforderungen (QA-04, QA-05, QA-06, DESIGN-05) werden in Phase 10 abschließend nachgewiesen; jede Phase hält die Seite dennoch grün (Build, Lint, Typprüfung, Unit- und Browserfälle).

**Produktquellen:** ausschließlich `origin/release` der Produkt-Repos (Web v4.0.0-test.238, Mobile mobile-v1.0.0-test.93); lokale `main`/`master` sind veraltet.

## Phases

- [ ] **Phase 5: Produktwahrheit, Designsystem v2 und Medienpipeline** - Live-Stand korrigiert, v2-Bausteine und reproduzierbare echte Screenshots stehen bereit
- [ ] **Phase 6: Startseite, Navigation und Funktionsübersicht** - Erste sichtbare Redesign-Etappe mit Produktbild, Funktionsmenü und gruppierter Übersicht
- [ ] **Phase 7: Funktionsdetailseiten und Mobile-App-Seite mit Videos** - Jede Live-Funktion hat eine bebilderte Detailseite, die App-Seite zeigt den vollen App-Umfang
- [ ] **Phase 8: SEO und KI-Sichtbarkeit** - Alternativen-Seiten, Preis-Antwortblock, Metadaten, Breadcrumbs, OG-Grafiken und Antwortblöcke live
- [ ] **Phase 9: Gewerke und Wissensinhalte** - Gewerke-Seiten bebildert, 24 Ratgeber und 40 Hilfeartikel aktualisiert, neue Hilfeartikel
- [ ] **Phase 10: Keyword-Ausrichtung und Abschlussaudit** - DataForSEO-Keyword-Map umgesetzt, Barrierefreiheit, Performance und erneuter Audit ohne offene Fehler

## Phase Details

### Phase 5: Produktwahrheit, Designsystem v2 und Medienpipeline
**Goal**: Besucher sehen ausschließlich live verfügbare Funktionen mit korrekten Preisen, und für alle folgenden Etappen stehen das Designsystem v2 sowie aktuelle echte Screenshots aus einem Demo-Betrieb bereit.
**Depends on**: Phase 4 (v1.0 abgeschlossen)
**Requirements**: PROD-02, PROD-03, PROD-04, DESIGN-02, DESIGN-04, MEDIA-01, MEDIA-03, MEDIA-04
**Success Criteria** (what must be TRUE):
  1. Das Produktregister nennt für jede beworbene Funktion Release-Tag, Commit und Belegpfad aus `origin/release` von Web und Mobile; keine Seite, `llms.txt` oder kein Schema stellt eine nicht-live Funktion (Telefon-Agent, MCP-Server, KI-Agent-Chat, Videoanalyse im Web, Subunternehmer-Portal, volles Büro in der App, vollständiger Web-Offline-Betrieb) als verfügbar dar, und keine Ankündigung trägt ein vergangenes Datum.
  2. Preise, Lizenzarten (Voll-Lizenz = Admin/Büro, App, Extra-Speicher), Netto-Hinweis, 10-Tage-Test und Credits sind auf allen Seiten, in `llms.txt` und im Schema identisch mit `src/lib/constants.ts` der Web-App; ein automatischer Test schlägt bei Abweichung fehl.
  3. Die v2-Bausteine (Tokens, Desktop- und Phone-Bildrahmen, Videoplayer, Kachel-/Bento-Raster, Kennzahlen, Funktionskarte mit Bild) sind mit Amber, Clash Display, General Sans und Logo umgesetzt, auf einer nicht indexierten Musterseite prüfbar, und die bestehenden Seiten laufen ohne sichtbare Regression; bei „reduzierte Bewegung“ bleiben alle Inhalte statisch sichtbar, eine globale Scroll-Animation gibt es nicht.
  4. Ein Aufnahmeskript erzeugt aus einem Demo-Betrieb ohne echte Kundendaten für jede Live-Funktion mindestens einen aktuellen Web- und/oder Mobile-Screenshot; aufbereitete Bilder (Rahmen, Hintergründe, KI-Kompositionen) lassen UI-Inhalte unverändert und gestellte Darstellungen sind erkennbar gekennzeichnet.
  5. Eine Budgetprüfung lehnt Bilder über 150 KB (AVIF/WebP je Ansicht) und Videos über 1,5 MB ab, alle Medien haben feste Abmessungen ohne Layout-Shift, und der korrigierte Stand ist nach Ship-Gate live mit IndexNow-Meldung.
**Plans**: TBD
**UI hint**: yes

### Phase 6: Startseite, Navigation und Funktionsübersicht
**Goal**: Besucher verstehen auf der neuen Startseite sofort, was CraftOS ist, und finden über Menü und Funktionsübersicht jede Live-Funktion in höchstens zwei Klicks.
**Depends on**: Phase 5
**Requirements**: DESIGN-01, DESIGN-03, FEAT-01
**Success Criteria** (what must be TRUE):
  1. Auf der Startseite sehen Besucher ohne Scrollen (360 px bis 1440 px) eine klare Aussage, was CraftOS ist, ein echtes Produktbild und „10 Tage testen“; jeder Abschnitt hat höchstens eine Überschrift, einen Einleitungssatz und visuelle Elemente statt Fließtextblöcken.
  2. Das Menü zeigt Funktionsgruppen mit Kurzbeschreibungen und Vorschaubildern und ist auf Desktop und Mobil per Maus, Touch und Tastatur bedienbar; jede Live-Funktion ist von jeder Seite in höchstens zwei Klicks erreichbar.
  3. Die Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), jeweils mit Bild und einem Satz Nutzen, und stimmt mit dem Produktregister überein.
  4. Startseite, Menü und Übersicht sind nach Ship-Gate live, IndexNow ist gemeldet, und `trial_click` wird in Vercel Analytics weiterhin erfasst.
**Plans**: TBD
**UI hint**: yes

### Phase 7: Funktionsdetailseiten und Mobile-App-Seite mit Videos
**Goal**: Besucher können jede Live-Funktion auf einer eigenen bebilderten Seite nachvollziehen, sehen die wichtigsten Abläufe als kurze Videos und erkennen den vollen Umfang der Mobile-App.
**Depends on**: Phase 6
**Requirements**: FEAT-02, FEAT-03, MEDIA-02
**Success Criteria** (what must be TRUE):
  1. Jede Live-Funktion hat eine Detailseite mit Bild oder Video, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen und FAQ; die seit 09.09.2026 neuen Funktionen (u. a. Bauphasen/Terminplanung, Abnahme/Teilabnahme, Mahnwesen, Bankabgleich, GAEB/DATANORM, Datenübernahme, Angebotsunterschrift, Lager-Scan/Wareneingang, Besichtigung, Bautagesbericht, Mängel, Chat, 21 Sprachen) haben eigene Seiten.
  2. Für mindestens Angebot erstellen, Plantafel, Zeiterfassung mobil, Rechnung/E-Rechnung, Belegscan, Abnahme mit Unterschrift und Lager-Scan gibt es 5–15 s lange stumme Bildschirmvideos mit Posterbild, die erst bei Sichtbarkeit laden und bei „reduzierte Bewegung“ nicht automatisch abspielen.
  3. Die Mobile-App-Seite zeigt alle Live-Funktionen der App (u. a. Zeiterfassung mit Standort, Einsätze mit Navigation, Aufmaß, Baudoku, Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift, Arbeitsschritte, Urlaub, Lager-Scan, Belegscan, Chat, Offline, 21 Sprachen) mit aktuellen Phone-Screenshots.
  4. Alle neuen Seiten sind in Sitemap und `llms.txt` enthalten, über Menü und Übersicht verlinkt und nach Ship-Gate live mit IndexNow-Meldung.
**Plans**: TBD
**UI hint**: yes

### Phase 8: SEO und KI-Sichtbarkeit
**Goal**: Suchmaschinen und KI-Suchen finden auf craftos.eu zitierfähige Antworten zu Preisen, Alternativen und Funktionen, und jede Seite hat saubere Metadaten, Breadcrumbs und eine eigene OG-Grafik.
**Depends on**: Phase 7
**Requirements**: SEO-03, SEO-04, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Die vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) sind mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und vom Vergleich und Footer verlinkt.
  2. Die Preisseite beginnt mit einem zitierfähigen Antwortsatz und einer Preistabelle, deren Werte mit dem Produktregister übereinstimmen.
  3. Jede Seite hat einen eindeutigen Titel ≤ 60 Zeichen, eine Description mit 120–155 Zeichen, genau eine H1, sichtbare Breadcrumbs mit Schema und eine individuelle OG-Grafik; ein automatischer Test findet keine doppelten Titel.
  4. Zentrale Seiten haben unter jeder Frage-Überschrift eine Antwort in höchstens 300 Zeichen; `llms.txt`, Sitemap und IndexNow-Meldung werden beim Release automatisch bzw. per festem Schritt aktualisiert.
**Plans**: TBD
**UI hint**: yes

### Phase 9: Gewerke und Wissensinhalte
**Goal**: Besucher finden für ihr Gewerk typische Abläufe mit echten Bildern sowie Ratgeber und Hilfeartikel, die dem aktuellen Produktstand entsprechen und auch die neuen Funktionen Schritt für Schritt erklären.
**Depends on**: Phase 8
**Requirements**: FEAT-04, CONTENT-03, CONTENT-04
**Success Criteria** (what must be TRUE):
  1. Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit echten Bildern statt nur Text und verlinken auf die passenden Funktionsseiten.
  2. Die 24 Ratgeber und 40 Hilfeartikel sind gegen den aktuellen Produktstand geprüft, korrigiert, mit realem Aktualisierungsdatum und passenden Bildern versehen; keiner beschreibt eine nicht-live Funktion oder einen veralteten Ablauf.
  3. Für jede seit 09.09.2026 neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung und Screenshot, verlinkt von der jeweiligen Detailseite.
  4. Gewerke- und Wissensinhalte erfüllen die Metadaten- und Breadcrumb-Regeln aus Phase 8 und sind nach Ship-Gate live mit IndexNow-Meldung.
**Plans**: TBD
**UI hint**: yes

### Phase 10: Keyword-Ausrichtung und Abschlussaudit
**Goal**: Alle Seiten sind auf ein datenbasiertes Hauptkeyword ausgerichtet, barrierefrei und schnell, und ein erneuter Audit von craftos.eu zeigt keine offenen technischen oder On-Page-Fehler.
**Depends on**: Phase 9; SEO-02 zusätzlich auf den DataForSEO-Zugang des Inhabers
**Requirements**: SEO-02, DESIGN-05, QA-04, QA-05, QA-06
**Externe Abhängigkeit**: SEO-02 setzt voraus, dass der Inhaber die DataForSEO-Zugangsdaten (`DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD` in `.env`) bereitstellt. Die Anforderung liegt bewusst in der letzten Phase, damit Phasen 5–9 nicht blockiert werden; liegt der Zugang früher vor, kann die Keyword-Map per `/gsd-phase --insert` vorgezogen werden. Ohne Zugang bleibt SEO-02 offen und wird nicht geschätzt; die übrigen Anforderungen dieser Phase werden unabhängig davon abgeschlossen.
**Success Criteria** (what must be TRUE):
  1. Eine Keyword-Map aus DataForSEO-Daten (Suchvolumen DE, Schwierigkeit, Intent, Wettbewerber) ordnet jeder Seite genau ein Hauptkeyword zu, und Titel, H1 und Description aller Seiten folgen ihr (nur mit Zugang; sonst als offen dokumentiert).
  2. Jede Seite besteht bei 360, 390, 768, 1024 und 1440 px die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, vollständige Tastaturbedienung).
  3. Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s; Unit-, Browser-, Routen- und visuelle Prüfungen sind an den neuen Stand angepasst und lokal grün.
  4. Für jede Etappe (Phasen 5–10) ist dokumentiert, dass sie einzeln nach Ship-Gate live ging, IndexNow gemeldet, die Live-Seite geprüft und `trial_click`/`ai_visit` in Vercel Analytics kontrolliert wurde.
  5. Ein erneuter `/audit craftos.eu` nach der letzten Etappe zeigt keine offenen technischen oder On-Page-Fehler.
**Plans**: TBD

## Progress

**Execution Order:** 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Produktwahrheit, Designsystem v2 und Medienpipeline | 0/TBD | Not started | - |
| 6. Startseite, Navigation und Funktionsübersicht | 0/TBD | Not started | - |
| 7. Funktionsdetailseiten und Mobile-App-Seite mit Videos | 0/TBD | Not started | - |
| 8. SEO und KI-Sichtbarkeit | 0/TBD | Not started | - |
| 9. Gewerke und Wissensinhalte | 0/TBD | Not started | - |
| 10. Keyword-Ausrichtung und Abschlussaudit | 0/TBD | Not started | - |
