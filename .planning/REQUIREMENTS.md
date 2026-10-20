# Requirements – Milestone v2.0 Produktstand, Redesign und Sichtbarkeit

Stand: 20.10.2026. Quelle: Audit craftos.eu, Bestandsaufnahmen Web-App (`origin/release` v4.0.0-test.238), Mobile (`origin/release` mobile-v1.0.0-test.93) und Website, Inhaberentscheidungen vom 20.10.2026.

## v2.0 Requirements

### Produktstand (PROD)
- [ ] **PROD-02**: Besucher sehen nur Funktionen, die in den aktuellen Produktions-Releases von Web und Mobile live sind; das Produktregister nennt Release-Tag, Commit und Belegpfade je Funktion.
- [ ] **PROD-03**: Preise, Lizenzarten (Admin/Büro als „Voll-Lizenz“, App, Extra-Speicher), Netto-Hinweis, Testphase und Credits stimmen auf allen Seiten, in `llms.txt` und im Schema mit `src/lib/constants.ts` der Web-App überein.
- [ ] **PROD-04**: Veraltete Ankündigungen (Telefon-Agent, MCP-Server, Agent-Aktionen mit vergangenen Terminen) sind entfernt oder ohne Datum als „in Entwicklung“ gekennzeichnet; nicht-live Funktionen werden nirgends als verfügbar dargestellt.

### Design (DESIGN)
- [ ] **DESIGN-01**: Besucher erfassen auf der Startseite ohne Scrollen, was CraftOS ist, sehen ein echtes Produktbild und finden „10 Tage testen“; jeder Abschnitt hat höchstens eine Überschrift, einen Satz Einleitung und visuelle Elemente statt Fließtextblöcke.
- [ ] **DESIGN-02**: Ein Designsystem v2 (Tokens, Bildrahmen für Desktop und Phone, Videoplayer, Kachel-/Bento-Raster, Kennzahlen, Funktionskarte mit Bild) wird auf allen Seiten einheitlich genutzt; Marke (Amber, Clash Display, General Sans, Logo) bleibt.
- [ ] **DESIGN-03**: Besucher finden über ein Menü mit Funktionsgruppen, Kurzbeschreibungen und Vorschaubildern jede Funktion in höchstens zwei Klicks, auf Desktop und Mobil.
- [ ] **DESIGN-04**: Bewegung ist dezent (Hover, Einblenden einzelner Elemente, Videos), es gibt keine globale Scroll-Animation, und bei „reduzierte Bewegung“ bleiben alle Inhalte statisch sichtbar.
- [ ] **DESIGN-05**: Jede Seite besteht die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, Tastaturbedienung) bei 360, 390, 768, 1024 und 1440 px.

### Medien (MEDIA)
- [ ] **MEDIA-01**: Für jede Live-Funktion gibt es mindestens einen aktuellen echten Screenshot (Web und/oder Mobile) aus einem Demo-Betrieb ohne echte Kundendaten, reproduzierbar per Aufnahmeskript.
- [ ] **MEDIA-02**: Für die wichtigsten Abläufe (mindestens Angebot erstellen, Plantafel, Zeiterfassung mobil, Rechnung/E-Rechnung, Belegscan, Abnahme mit Unterschrift, Lager-Scan) gibt es 5–15 s lange stumme Bildschirmvideos mit Posterbild, die erst bei Sichtbarkeit laden.
- [ ] **MEDIA-03**: Aufbereitete Bilder (Geräterahmen, Hintergründe, Kompositionen, auch mit KI-Bildgenerierung über ChatGPT/Codex) verändern keine UI-Inhalte; gestellte Darstellungen sind als solche erkennbar.
- [ ] **MEDIA-04**: Bilder und Videos halten ein Budget ein (Bild ≤ 150 KB AVIF/WebP je Ansicht, Video ≤ 1,5 MB je Clip) und verursachen keinen Layout-Shift.

### Funktionen (FEAT)
- [ ] **FEAT-01**: Eine Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), jeweils mit Bild und einem Satz Nutzen.
- [ ] **FEAT-02**: Jede Live-Funktion hat eine Detailseite mit Bild oder Video, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen und FAQ; neue Seiten für die seit 09.09.2026 hinzugekommenen Funktionen.
- [ ] **FEAT-03**: Die Mobile-App-Seite zeigt alle Live-Funktionen der App (u. a. Zeiterfassung mit Standort, Einsätze mit Navigation, Aufmaß, Baudoku, Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift, Arbeitsschritte, Urlaub, Lager-Scan, Belegscan, Chat, Offline, 21 Sprachen) mit aktuellen Phone-Screenshots.
- [ ] **FEAT-04**: Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit echten Bildern statt nur Text.

### SEO und KI-Sichtbarkeit (SEO)
- [ ] **SEO-02**: Eine Keyword-Map aus DataForSEO-Daten (Suchvolumen DE, Schwierigkeit, Intent, Wettbewerber) ordnet jeder Seite genau ein Hauptkeyword zu; Titel, H1 und Description folgen ihr. Ohne Zugang bleibt diese Anforderung offen und wird nicht geschätzt.
- [ ] **SEO-03**: Die vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) sind mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und vom Vergleich und Footer verlinkt.
- [ ] **SEO-04**: Die Preisseite beginnt mit einem zitierfähigen Antwortsatz und einer Preistabelle.
- [ ] **SEO-05**: Alle Seiten haben Titel ≤ 60 Zeichen, Descriptions 120–155 Zeichen, sichtbare Breadcrumbs mit Schema, eine individuelle OG-Grafik und genau eine H1; keine doppelten Titel.
- [ ] **SEO-06**: Zentrale Seiten haben unter jeder Frage-Überschrift eine Antwort in höchstens 300 Zeichen; `llms.txt`, Sitemap und IndexNow-Meldung werden mit jedem Release aktualisiert.

### Inhalte (CONTENT)
- [ ] **CONTENT-03**: Die 24 Ratgeber und 40 Hilfeartikel sind gegen den aktuellen Produktstand geprüft, korrigiert und mit passenden Bildern versehen.
- [ ] **CONTENT-04**: Für jede neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung und Screenshot.

### Qualität und Rollout (QA)
- [ ] **QA-04**: Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s; Unit-, Browser-, Routen- und visuelle Prüfungen sind an den neuen Stand angepasst und grün.
- [ ] **QA-05**: Jede Etappe geht einzeln nach Ship-Gate live; danach werden IndexNow gemeldet, die Live-Seite geprüft und `trial_click`/`ai_visit` in Vercel Analytics kontrolliert.
- [ ] **QA-06**: Nach der letzten Etappe zeigt ein erneuter `/audit craftos.eu` keine offenen technischen oder On-Page-Fehler.

## Future Requirements
- Interaktive Klick-Demo (`components/product-demo`) auf neuen Stand bringen und wieder einbinden.
- Englische Sprachversion der Website.
- Kundenstimmen und Referenzen, sobald freigegebene Zitate vorliegen.

## Out of Scope
- Änderungen an Web- oder Mobile-App (z. B. Registrieren-Reiter per Link) – eigenes Paket im App-Repo.
- Bezahlte Tools oder Add-ons ohne Freigabe (Semrush-Abo, Web Analytics Plus, Speed Insights Plus).
- Funktionen bewerben, die nicht live sind (siehe PROJECT.md).
- Rechtstexte ohne Inhaberfreigabe ändern (Datenschutzabschnitt liegt als Entwurf vor).

## Traceability
| Requirement | Phase | Status |
|-------------|-------|--------|
| PROD-02 | Phase 5 | Pending |
| PROD-03 | Phase 5 | Pending |
| PROD-04 | Phase 5 | Pending |
| DESIGN-01 | Phase 6 | Pending |
| DESIGN-02 | Phase 5 | Pending |
| DESIGN-03 | Phase 6 | Pending |
| DESIGN-04 | Phase 5 | Pending |
| DESIGN-05 | Phase 10 | Pending |
| MEDIA-01 | Phase 5 | Pending |
| MEDIA-02 | Phase 7 | Pending |
| MEDIA-03 | Phase 5 | Pending |
| MEDIA-04 | Phase 5 | Pending |
| FEAT-01 | Phase 6 | Pending |
| FEAT-02 | Phase 7 | Pending |
| FEAT-03 | Phase 7 | Pending |
| FEAT-04 | Phase 9 | Pending |
| SEO-02 | Phase 10 | Pending |
| SEO-03 | Phase 8 | Pending |
| SEO-04 | Phase 8 | Pending |
| SEO-05 | Phase 8 | Pending |
| SEO-06 | Phase 8 | Pending |
| CONTENT-03 | Phase 9 | Pending |
| CONTENT-04 | Phase 9 | Pending |
| QA-04 | Phase 10 | Pending |
| QA-05 | Phase 10 | Pending |
| QA-06 | Phase 10 | Pending |

**Coverage:** 26/26 v2.0-Anforderungen zugeordnet, keine ohne Phase, keine doppelt.

Hinweis: SEO-02 hängt vom DataForSEO-Zugang des Inhabers ab (Phase 10).

## Validated (v1.0, Relaunch 09.09.2026)
UI-01, PROD-01, DEMO-01, CONTENT-01, CONTENT-02, CALC-01, SEO-01, QA-01, QA-02, QA-03 – siehe `craftos/docs/RELAUNCH-ABNAHME.md`.
