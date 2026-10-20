# CraftOS Website-Relaunch

## What This Is
Umsetzung des am 9. September 2026 freigegebenen Relaunch-Plans für die CraftOS-Marketingwebsite. Zielgruppe sind deutsche Handwerksbetriebe im Büro und auf der Baustelle.

## Core Value
Besucher verstehen den Produktablauf anhand lesbarer, ausdrücklich vereinfachter Beispieldemos und direkter App-Aufnahmen und können die richtige Funktion und Anleitung schnell finden.

## Active Requirements
- Vollständige Produktdarstellung aus Web-main d442df68 inklusive lokaler Änderungen und abschließendem Mobile-master 9e6260d (sauber); Ausgangsbasis Mobile f274e00.
- Helle Inhaltsbereiche, dunkler Produkteinstieg, CraftOS Amber, bestehende Markenschriften.
- Sechs interaktive, deterministische Beispieldemos mit gemeinsamem Musterprojekt.
- 24 eigenständige Ratgeber und 40 gegen die Apps geprüfte Hilfeartikel.
- Lokale Stundensatz- und Angebots-/Margenrechner ohne Speicherung der Eingaben.
- Crawlbare Inhalte, individuelle Metadaten, reale Datumsangaben und gezielte automatisierte sowie visuelle Prüfung.

## Constraints
Die Apps selbst bleiben unverändert. Öffentliche Marke CraftOS; Ansprache Sie. Vorhandene uncommittete Änderungen erhalten. Keine Portal-Onlinezahlungen, pauschalen Offline-Fotoversprechen oder unbelegte DATANORM-v5-Kompatibilität bewerben. Kein automatisches Verbuchen durch KI. Next.js 16 / React 19 / Tailwind 4 bleiben bestehen.

## Current Milestone: v2.0 Produktstand, Redesign und Sichtbarkeit

**Goal:** craftos.eu ist klar gegliedert und optisch ansprechend (Kacheln, Schritte, vereinfachte Produktdarstellungen statt Textwänden), zeigt den aktuellen Funktionsumfang korrekt und ist für Google und KI-Suchen auf datenbasierte Suchbegriffe ausgerichtet.

**Target features:**
- Produktregister auf den aktuellen Release-Stand (Web `origin/release` v4.0.0-test.238, Mobile `origin/release` mobile-v1.0.0-test.93); nur Live-Funktionen bewerben
- Designsystem v2 „markant, Produkt im Fokus“: Marke (Amber, Clash Display/General Sans, Logo) bleibt, große echte App-Bilder, Kachel-Layouts, kurze Texte, dezente Bewegung
- Vereinfachte, im Code gebaute Produktdarstellungen, Icons und vorhandene Fotos statt detailgetreuer Screenshots (Inhaberentscheidung 20.10.2026: kein Demo-Betrieb, keine Videos, „nicht Rom neu erfinden“)
- Funktionsübersicht und Detailseiten für alle Live-Funktionen inklusive der seit 09.09.2026 neuen (Bauphasen/Terminplanung, Abnahme/Teilabnahme, Mahnwesen, Bankabgleich, GAEB/DATANORM, Datenübernahme, Angebotsunterschrift, Lager-Scan/Wareneingang, Besichtigung, Bautagesbericht, Mängel, Chat, 21 Sprachen)
- SEO/GEO: Keyword-Map mit SE Ranking (Data API, Test bis 03.11.2026), Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime), Preis-Antwortblock, Titel/Descriptions, sichtbare Breadcrumbs, OG-Bilder je Seite, llms.txt, IndexNow je Release
- Ratgeber (24) und Hilfe (40) auf neuen Produktstand inklusive Bildern, neue Hilfeartikel für neue Funktionen
- Schrittweiser Rollout: jede Etappe nach Ship-Gate live, danach IndexNow und Analytics-Kontrolle

**Milestone context (20.10.2026):**
- Anlass: Audit `/audit craftos.eu`; Inhaber findet die Seite textlastig und unattraktiv, Anfragen über KI-Suchen sind eingebrochen. ChatGPT/Perplexity nennen CraftOS bei allgemeinen Fragen nicht; sie zitieren Preisseiten und Vergleichsseiten wie `/vergleich/plancraft-alternative` sowie Portale.
- Vorhandene ungenutzte Assets: 17 Screenshots (Juli, veraltet) in `craftos/public/images/screenshots/`, App-Store-Bilder; `components/product-demo` (interaktive Demo) wird bewusst nicht wieder eingesetzt, aber nicht gelöscht.
- Produktfakten immer aus den Produkt-Repos (`git show origin/release:…`): Web `C:/Projekte/craft-connect-buddy` (Preise `src/lib/constants.ts`, Flags `src/lib/featureFlags.ts`, `src/lib/ai/availability.ts`, Routen `src/App.tsx`), Mobile `C:/Projekte/CraftOS - Mobile/craftos-mobile` (`src/AppRoot.tsx`, `src/features/`). Lokale `main`/`master` sind veraltet.
- Lizenzen im Produkt: Admin (Pflicht, 1 je Betrieb) und Büro je 29,95 €/Monat bzw. 299,50 €/Jahr, App 9,95 €/99,50 €, Extra-Speicher 50 GB 0,99 €; alle netto zzgl. 19 % USt.; 10 Tage Test ohne Zahlungsdaten. Website-Begriff „Voll-Lizenz“ = Admin oder Büro.
- Nicht live, nicht bewerben: Telefon-Agent, MCP-Server, KI-Agent-Chat, Videoanalyse im Web, Subunternehmer-Portal, vollständiges Büro in der Mobile-App, vollständiger Offline-Betrieb der Web-App.
- SEO-Tool: SE Ranking Data API (`SE_RANKING_API_KEY` in `.env`) seit 20.10.2026; MCP-Server `se-ranking` eingetragen, OAuth-Anmeldung über `/mcp` steht beim Inhaber aus. DataForSEO optional.
- Offen beim Inhaber: Datenschutzabschnitt Webanalyse, Portale/Bewertungen, Search-Console-Exporte.

## Key Decisions
User hat Plan, vier Etappen, parallele isolierte Arbeit, 24+40 Inhalte, zwei Rechner sowie bestehende und neue Medien ausdrücklich freigegeben. Vorherige Recherche und Entscheidungen werden verwendet; keine erneute Grundlagenplanung. Veröffentlichung erst nach Ship-Gate und geprüftem Produktstand.

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

*Last updated: 2026-10-20 (Umfang v2.0 reduziert: strukturierter und schöner statt Screenshot-Pipeline; SE Ranking als SEO-Quelle)*
