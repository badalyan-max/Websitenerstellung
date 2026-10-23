# Requirements – Milestone v2.0 Produktstand, Redesign und Sichtbarkeit

Stand: 20.10.2026, Umfang am selben Tag vom Inhaber reduziert: keine detailgetreuen Screenshots, kein Demo-Betrieb, keine Videos; Ziel ist eine strukturiertere, schönere Seite mit weniger Fließtext plus SEO. Quelle: Audit craftos.eu, Bestandsaufnahmen Web-App (`origin/release` v4.0.0-test.238), Mobile (`origin/release` mobile-v1.0.0-test.93) und Website, Inhaberentscheidungen vom 20.10.2026.

## v2.0 Requirements

### Produktstand (PROD)

- [x] **PROD-02**: Besucher sehen nur Funktionen, die in den aktuellen Produktions-Releases von Web und Mobile live sind; das Produktregister nennt Release-Tag, Commit und Belegpfade je Funktion.
- [x] **PROD-03**: Preise, Lizenzarten (Admin/Büro als „Voll-Lizenz“, App, Extra-Speicher), Netto-Hinweis, Testphase und Credits stimmen auf allen Seiten, in `llms.txt` und im Schema mit `src/lib/constants.ts` der Web-App überein.
- [x] **PROD-04**: Veraltete Ankündigungen (Telefon-Agent, MCP-Server, Agent-Aktionen mit vergangenen Terminen) sind entfernt oder ohne Datum als „in Entwicklung“ gekennzeichnet; nicht-live Funktionen werden nirgends als verfügbar dargestellt.

### Design (DESIGN)

- [x] **DESIGN-01**: Besucher erfassen auf der Startseite ohne Scrollen, was CraftOS ist, sehen eine Produktdarstellung und finden „10 Tage testen“; jeder Abschnitt hat höchstens eine Überschrift, einen Satz Einleitung und visuelle Elemente statt Fließtextblöcke.
- [ ] **DESIGN-02**: Ein Designsystem v2 (Tokens, Bildrahmen für Desktop und Phone mit vereinfachter UI, Kachel-/Bento-Raster, Schrittfolge, Kennzahlen, Funktionskarte mit visuellem Element, Vergleichstabelle) wird auf allen Seiten einheitlich genutzt; Marke (Amber, Clash Display, General Sans, Logo) bleibt.
- [x] **DESIGN-03**: Besucher finden über ein Menü mit Funktionsgruppen, Kurzbeschreibungen und Vorschaubildern jede Funktion in höchstens zwei Klicks, auf Desktop und Mobil.
- [x] **DESIGN-04**: Bewegung ist dezent (Hover, Einblenden einzelner Elemente, Videos), es gibt keine globale Scroll-Animation, und bei „reduzierte Bewegung“ bleiben alle Inhalte statisch sichtbar.
- [ ] **DESIGN-05**: Jede Seite besteht die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, Tastaturbedienung) bei 360, 390, 768, 1024 und 1440 px.

### Medien (MEDIA)

- [x] **MEDIA-01**: Jede Live-Funktion hat ein visuelles Element (vereinfachte, im Code gebaute UI-Darstellung im Geräterahmen, Icon-Grafik, Ablaufdiagramm oder vorhandenes Foto); detailgetreue Screenshots sind nicht nötig.
- [x] **MEDIA-03**: Vereinfachte Darstellungen zeigen nur Funktionen, die live sind, und erfinden keine Bedienelemente oder Zahlen, die das Produkt nicht hat; KI-generierte Szenen sind als „Darstellung“ gekennzeichnet.
- [x] **MEDIA-04**: Bilder halten ein Budget ein (Bild ≤ 150 KB AVIF/WebP je Ansicht) und verursachen keinen Layout-Shift.

### Funktionen (FEAT)

- [x] **FEAT-01**: Eine Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), jeweils mit visuellem Element und einem Satz Nutzen.
- [x] **FEAT-02**: Jede Live-Funktion hat eine Detailseite mit visuellem Element, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen und FAQ; neue Seiten für die seit 09.09.2026 hinzugekommenen Funktionen.
- [x] **FEAT-03**: Die Mobile-App-Seite zeigt alle Live-Funktionen der App (u. a. Zeiterfassung mit Standort, Einsätze mit Navigation, Aufmaß, Baudoku, Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift, Arbeitsschritte, Urlaub, Lager-Scan, Belegscan, Chat, Offline, 21 Sprachen) mit Phone-Darstellungen.
- [x] **FEAT-04**: Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit visuellen Elementen statt nur Text.

### SEO und KI-Sichtbarkeit (SEO)

- [x] **SEO-02**: Eine Keyword-Map aus SE-Ranking-Daten (Suchvolumen DE, Schwierigkeit, Intent, Wettbewerber) ordnet jeder Seite genau ein Hauptkeyword zu; Titel, H1 und Description folgen ihr. Ohne Zugang bleibt diese Anforderung offen und wird nicht geschätzt.
- [x] **SEO-03**: Die vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) sind mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und vom Vergleich und Footer verlinkt.
- [x] **SEO-04**: Die Preisseite beginnt mit einem zitierfähigen Antwortsatz und einer Preistabelle.
- [x] **SEO-05**: Alle Seiten haben Titel ≤ 60 Zeichen, Descriptions 120–155 Zeichen, sichtbare Breadcrumbs mit Schema, eine individuelle OG-Grafik und genau eine H1; keine doppelten Titel.
- [x] **SEO-06**: Zentrale Seiten haben unter jeder Frage-Überschrift eine Antwort in höchstens 300 Zeichen; `llms.txt`, Sitemap und IndexNow-Meldung werden mit jedem Release aktualisiert.
- [x] **SEO-07**: SE Ranking misst den Fortschritt: Projekt craftos.eu mit allen Hauptkeywords der Keyword-Map und Zielseiten, 5 Wettbewerbern und AI Result Tracker (ChatGPT, Perplexity, Gemini, Google AI Overview/AI Mode); Ausgangswerte vom 20.10.2026 sind dokumentiert (`craftos/docs/seo/SE-RANKING-BEFUND-2026-10-20.md`), nach jeder Etappe werden Positionen, KI-Share-of-Voice und verweisende Domains verglichen.
- [ ] **SEO-08**: CraftOS gewinnt echte Verweise und Portalpräsenz: priorisierte Linkliste aus der SE-Ranking-Backlink-Lücke (Bewertungsportale, Fachmedien, Verzeichnisse, Kammern, Großhandel), je Eintrag ein kopierfertiger Browser-Prompt für den Inhaber und ein Statusregister; Ziel bis Meilensteinende: mindestens 15 neue seriöse verweisende Domains, sichtbar in SE Ranking. Spam-Backlinks werden beobachtet, Disavow nur bei nachweisbarem Schaden.
- [x] **SEO-09**: Für jede getrackte KI-Frage und jede Content-Lücke mit KD < 20 gibt es eine zitierfähige Zielseite oder einen Abschnitt (Antwort zuerst, Fakten mit Quelle und Datum, FAQPage-Schema), u. a. „beste Handwerkersoftware für kleine Betriebe“, Aufmaß-App, Bautagebuch-App, Zeiterfassung Handwerk, Gewerke-Software, Schlussrechnung, Leistungszeitraum, Regiebericht.

### Inhalte (CONTENT)

- [x] **CONTENT-03**: Die 24 Ratgeber und 40 Hilfeartikel sind gegen den aktuellen Produktstand geprüft, korrigiert und klar gegliedert (Antwort zuerst, Schritte, Zwischenüberschriften).
- [x] **CONTENT-04**: Für jede neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung.

### Qualität und Rollout (QA)

- [ ] **QA-04**: Echte Besucherdaten in Produktion (Vercel Speed Insights, p75 über alle Seiten, Stichprobengröße angegeben) erreichen LCP < 2,5 s, INP < 200 ms und CLS < 0,1 (Inhaberentscheidung 23.10.2026, D-44; Lighthouse-Labordaten nur noch als nicht blockierende Regressionswarnung); Unit-, Browser-, Routen- und visuelle Prüfungen sind an den neuen Stand angepasst und grün.
- [ ] **QA-05**: Jede Etappe geht einzeln nach Ship-Gate live; danach werden IndexNow gemeldet, die Live-Seite geprüft und `trial_click`/`ai_visit` in Vercel Analytics kontrolliert.
- [ ] **QA-06**: Nach der letzten Etappe zeigt ein erneuter `/audit craftos.eu` keine offenen technischen oder On-Page-Fehler.

## Future Requirements

- Interaktive Klick-Demo (`components/product-demo`) auf neuen Stand bringen und wieder einbinden.
- Englische Sprachversion der Website.
- Kundenstimmen und Referenzen, sobald freigegebene Zitate vorliegen.

## Out of Scope

- Änderungen an Web- oder Mobile-App (z. B. Registrieren-Reiter per Link) – eigenes Paket im App-Repo.
- Detailgetreue App-Screenshots, Demo-Betrieb und Aufnahme-Pipeline sowie Bildschirmvideos (ehemals MEDIA-02) – Inhaberentscheidung 20.10.2026, nicht nötig.
- Bezahlte Tools oder Add-ons ohne Freigabe (Semrush-Abo, Web Analytics Plus, Speed Insights Plus).
- Funktionen bewerben, die nicht live sind (siehe PROJECT.md).
- Rechtstexte ohne Inhaberfreigabe ändern (Datenschutzabschnitt liegt als Entwurf vor).

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PROD-02 | Phase 5 | Complete |
| PROD-03 | Phase 5 | Complete |
| PROD-04 | Phase 5 | Complete |
| DESIGN-01 | Phase 6 | Complete |
| DESIGN-02 | Phase 5 (Grundlage), Phasen 6–9 (Umsetzung), Rest Phase 10 (Rechner, Support, Rechtsseiten, 404) | In Progress |
| DESIGN-03 | Phase 6 | Complete |
| DESIGN-04 | Phase 5 | Complete |
| DESIGN-05 | Phase 10 | Pending |
| MEDIA-01 | Phase 7 | Complete |
| MEDIA-02 | – | Out of Scope |
| MEDIA-03 | Phase 5 | Complete |
| MEDIA-04 | Phase 5 | Complete |
| FEAT-01 | Phase 6 | Complete |
| FEAT-02 | Phase 7 | Complete |
| FEAT-03 | Phase 7 | Complete |
| FEAT-04 | Phase 9 | Complete |
| SEO-02 | Phase 5 (Keyword-Map), Phasen 6–8 (Titel/H1/Description) | Complete |
| SEO-03 | Phase 8 | Complete |
| SEO-04 | Phase 8 | Complete |
| SEO-05 | Phase 8 | Complete |
| SEO-06 | Phase 8 | Complete |
| SEO-07 | Phase 5 | Complete |
| SEO-08 | Phase 5 (Linkplan), laufend bis Phase 10 (≥15 Refdomains) | In Progress |
| SEO-09 | Phase 8 (kommerzielle KI-Prompts), Phase 9 (Wissenslücken, Abschluss) | Complete |
| CONTENT-03 | Phase 9 | Complete |
| CONTENT-04 | Phase 9 | Complete |
| QA-04 | Phase 10 | Pending |
| QA-05 | Phase 10 | Pending |
| QA-06 | Phase 10 | Pending |

**Coverage:** 28/28 aktive v2.0-Anforderungen zugeordnet (MEDIA-02 Out of Scope), keine doppelt.

Hinweis: SEO-02, DESIGN-02 und SEO-08 haben in Phase 5 ihre Grundlage (Keyword-Map aus SE Ranking, Designbausteine, Linkplan) und werden in den Phasen 6–8 auf den Seiten umgesetzt bzw. bis Phase 10 gemessen; sie bleiben bis dahin offen. Stand nach Phase 8 (23.10.2026): SEO-02 erledigt. Stand nach Phase 9 (23.10.2026): SEO-09 erledigt; DESIGN-02 für Gewerke-, Ratgeber- und Hilfe-Vorlagen umgesetzt, Rest (Rechner, Support, Rechtsseiten, 404) in Phase 10; SEO-08 in Phase 10.

## Validated (v1.0, Relaunch 09.09.2026)

UI-01, PROD-01, DEMO-01, CONTENT-01, CONTENT-02, CALC-01, SEO-01, QA-01, QA-02, QA-03 – siehe `craftos/docs/RELAUNCH-ABNAHME.md`.
