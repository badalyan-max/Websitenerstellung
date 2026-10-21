# SE-Ranking-Befund craftos.eu – 20.10.2026

Quelle aller Zahlen: SE Ranking (Data API und Project API über den MCP-Server `se-ranking`), Datenbank Deutschland (`source=de`), Stand 20.10.2026. Rohdaten liegen unter `docs/seo/data/2026-10-20-*.json`. Testzugang bis 03.11.2026 (100.000 Units); bis dahin müssen Keyword-Map und Ausgangswerte vollständig gesichert sein.

## 1. Ausgangslage in einem Satz

craftos.eu ist für Google und KI-Suchen praktisch unsichtbar: 1 rankender Suchbegriff (Platz 51–100), 0 echte Backlinks (12 verweisende Domains, alle Spam), Domain-InLink-Rank 3 und 0,02 % Share of Voice in KI-Antworten, während die Wettbewerber 1.385–38.873 Suchbegriffe, 248–1.052 verweisende Domains und bis zu 42 % KI-Share-of-Voice haben.

## 2. Organische Sichtbarkeit (Google DE)

| Domain | Keywords | Traffic/Monat (geschätzt) |
|---|---|---|
| craftos.eu | 1 | 0 |
| streit-software.de | 38.873 | 14.516 |
| hero-software.de | 17.805 | 8.555 |
| plancraft.com | 4.607 | 2.868 |
| craftnote.de | 4.376 | 916 |
| das-programm.io | 3.400 | 2.074 |
| openhandwerk.de | 2.590 | 347 |
| label-software.de | 1.385 | 930 |

Erreichbare Suchbegriffe (Volumen/Monat, Keyword Difficulty 0–100): handwerkersoftware 1.300/55, bautagebuch app 590/7, aufmaß app 590/12, handwerker software 410/33, zeiterfassung handwerk 390/12, handwerker stundensatz 320/6, baustellen app 260/15, rechnungssoftware handwerker 210/18, shk software 210/7, digitale bauakte 170/7, auftragsverwaltung software 170/9, gaeb software 140/18, maler software 140/10, trockenbau software 140/6, mobile zeiterfassung handwerker 140/12. Wettbewerbermarken: plancraft 9.900, hero software 5.400, tooltime 4.400, craftnote 3.100 (Grundlage der Alternativen-Seiten). Vollständige Liste: `data/2026-10-20-keywords-seeds.json`.

**Content-Muster der Wettbewerber:** plancraft holt viel Volumen über Hilfe- und Wissensartikel zu Fachbegriffen (Schlussrechnung 1.800, Berichtsheft, Leistungszeitraum auf Rechnungen ~390 je Variante, Regiebericht 390, Bautagesbericht 320, Bedenkenanzeige 390, Storno-Rechnung 590) und über Funktionsseiten mit klarem Keyword (Aufmaß-App, Zeiterfassung Handwerk). Diese Lücken stehen in `data/2026-10-20-keyword-gap-plancraft.json` und fließen in Keyword-Map (Phase 5) und Wissensinhalte (Phase 9) ein.

## 3. KI-Sichtbarkeit (ChatGPT, Gemini, Google AI Overview, AI Mode, Perplexity)

| Marke | Share of Voice | Markennennungen | Linkzitate |
|---|---|---|---|
| Streit | 41,9 % | 484 | 6.281 |
| HERO | 31,9 % | 1.095 | 2.165 |
| ToolTime | 9,5 % | 503 | 1 |
| Das Programm | 6,7 % | 293 | 229 |
| Plancraft | 5,1 % | 161 | 395 |
| Craftnote | 3,6 % | 97 | 342 |
| openHandwerk | 1,3 % | 23 | 171 |
| **CraftOS** | **0,02 %** | **1** | **1** |

SE Ranking ordnet craftos.eu noch keiner Marke zu (`getAiSearchBrand` leer). Für Perplexity und AI Mode liegen für craftos.eu keine Daten vor.

**Welche Quellen KIs bei Handwerkersoftware-Fragen zitieren** (Antworten, in denen HERO, Plancraft, Streit oder ToolTime genannt werden): Herstellerseiten (hero-software.de 111, streit-software.de 38, plancraft.com 33, tooltime.app 27), **youtube.com 67**, gesetze-im-internet.de 47, betriebssoftware-kompass.de 16, handwerk-digitalisieren.de 9, softwareabc24.de 8, omr.com 7, getapp.de 6, de.wikipedia.org 8. Folgerung: Neben eigenen, klar strukturierten Seiten wirken Einträge in Vergleichsportalen, YouTube-Videos und rechtliche Fakten (GoBD, E-Rechnung) mit Quellenangaben.

Typische Fragen, bei denen Wettbewerber genannt werden (Auszug aus 219): „zeiterfassung handwerk“, „mobile zeiterfassung“, „rechnungssoftware handwerk“, „software für schreiner/maler/zimmerer/fensterbau/galabau“, „app lagerverwaltung“, „angebote software“, „kalkulationssoftware bau“, „buchhaltungssoftware handwerker“, „software für auftragsbearbeitung“, „hero software alternative“, „hero software preise“. Rohdaten: `data/2026-10-20-ai-prompts-wettbewerber.json`.

## 4. Backlinks und Autorität

| Domain | Verweisende Domains | Backlinks | Domain InLink Rank |
|---|---|---|---|
| craftos.eu | 12 (alle Spam) | 12 | 3 |
| hero-software.de | 1.052 | 6.936 | 70 |
| craftnote.de | 622 | 89.465 | 63 |
| openhandwerk.de | 441 | 2.369 | 58 |
| streit-software.de | 423 | 2.872 | 69 |
| plancraft.com | 350 | 1.800 | 58 |
| das-programm.io | 297 | 7.359 | 57 |
| tooltime.de | 248 | 805 | 53 |

**Backlink-Lücke:** 548 Domains verlinken mindestens zwei Wettbewerber, aber nicht craftos.eu; nach Spam-Filter bleiben 163 seriöse Quellen (`data/2026-10-20-backlink-gap.json`). Priorisierte Linkliste nach Art:

- **Bewertungs- und Vergleichsportale** (wirken auch auf KI-Antworten): ProvenExpert (verlinkt 6 von 7 Wettbewerbern, DR 91), OMR Reviews (90), SoftwareWorld (85), Softguide (69), kennstdueinen.de (84), Capterra/GetApp, softwareabc24.de, betriebssoftware-kompass.de, trusted.de.
- **Fachmedien der Gewerke** (Pressemitteilung, Gastbeitrag, Produktmeldung): handwerksblatt.de (82), handwerk-magazin.de (76), deutsche-handwerks-zeitung.de (83), si-shk.de (67), sbz-online.de (73), ikz.de (74), heizungsjournal.de (63), shk-profi.de (56), haustechnikdialog.de (75), malerblatt.de (62), bauhandwerk.de (67), metallbau-magazin.de (59), belektro.de (71), glaswelt.de (71), bm-online.de (73), dds-online.de (71), fliesenundplatten.de (60).
- **Gründer-, Mittelstands- und Softwareverzeichnisse:** fuer-gruender.de (86), gruenderkueche.de (75), digital-affin.de (71), deutsche-startups.de (91), software-journal.de (54), mittelstandcafe.de (69), immittelstand.de (69).
- **Digitalisierungsstellen und Kammern:** handwerk-digitalisieren.de (62, wird von KIs zitiert), digitalzentrumbau.de (63), Handwerkskammern (z. B. hwk-muenster.de 76).
- **Großhandel und Partner** (DATANORM-/Partnerseiten): unielektro.de (72), kluxen.de (65), wuerth.de (84), gc-gruppe.de (83), raabkarcher.de (73).
- **Kostenlose Presseportale** (geringerer Wert, aber schnell): deutscherpresseindex.de, presseradar.de, fair-news.de, portalderwirtschaft.de, neue-pressemitteilungen.de, pr-echo.de, presse-board.de.

Alle Einträge erfolgen durch den Inhaber oder mit seiner Freigabe (Konto, Firmenangaben, ggf. Kosten). Keine gekauften Links, keine Linknetzwerke.

## 5. Website-Audit (SE Ranking, 126 Seiten)

Gesamtwert 96/100, 0 Fehler, 14 Warnungen, 60 Hinweise:

- 14 × Alt-Text fehlt (Warnung)
- 34 × Title zu lang, 1 × Title zu kurz, 4 × Meta-Description zu lang
- 2 × doppelter H1-Tag
- 18 × „JavaScript nicht komprimiert“ (vermutlich Crawler-Artefakt, da Vercel Brotli/Gzip ausliefert – live gegenprüfen)
- 1 × externer Link auf 3XX-Weiterleitung

Diese Punkte sind Teil von SEO-05 (Phase 8); Alt-Texte und doppelte H1 können früher mitbehoben werden.

## 6. Einrichtung im SE-Ranking-Konto (erledigt am 20.10.2026)

- Projekt „craftos.eu“ (ID 13094375), Google Deutschland, tägliche Prüfung.
- 52 Suchbegriffe mit Zielseite hinzugefügt (Marke, Hauptbegriffe, Funktionen, Gewerke, Vergleich, Ratgeber); erste Positionsprüfung gestartet. Ein früher automatisch angelegter Begriff („craftview software gmbh“) ist unverändert geblieben.
- Wettbewerber (Limit 5 im Test): Plancraft, ToolTime, openHandwerk, Meisterwerk, HERO Software (ersetzt HandwerkManager.de mit Domain-Stärke 0).
- AI Result Tracker: Marke „CraftOS“; Engines ChatGPT, Perplexity, Gemini, Google AI Overview, Google AI Mode (DE); 10 Prompts (Testlimit): ChatGPT 6 (beste Handwerkersoftware für kleine Betriebe, beste Handwerkersoftware 2026, Handwerkersoftware Vergleich, Alternative zu Plancraft, günstige Handwerkersoftware mit App für Mitarbeiter, Was ist CraftOS?), Google AI Overview 2 (handwerkersoftware, handwerker app), Perplexity 2 (beste für kleine Betriebe, Alternative zu HERO Software).
- Nachtrag 21.10.2026 (Freigabe Inhaber): Zehn von SE Ranking automatisch angelegte, themenfremde ChatGPT-Prompts (DIY-Mode, Möbel, Geschenke u. a.) gelöscht und durch zehn Handwerkersoftware-Fragen ersetzt (Zeiterfassung Handwerk, Rechnungssoftware mit E-Rechnung, Alternative zu HERO Software, Alternative zu ToolTime, Aufmaß-App, Bautagebuch-App, Kosten pro Monat, Plantafel/Einsatzplanung, Software für Elektro- und Malerbetriebe). ChatGPT trackt damit 16 Prompts, alle zum Thema.
- Nicht verfügbar im Test: SE Visible (eigenes KI-Sichtbarkeitsprodukt, 401), Local Marketing (keine Standorte; craftos.eu ist kein lokales Geschäft).

## 7. Folgerungen für den Meilenstein v2.0

1. **On-Page reicht nicht.** Ohne Backlinks und Portalpräsenz bleibt CraftOS auch mit perfekter Seite unsichtbar. Portal- und Fachmedien-Arbeit startet sofort parallel (Inhaberaufgaben mit Browser-Prompts), nicht erst am Ende.
2. **KI-Sichtbarkeit** entsteht über zitierfähige eigene Seiten (Preise, Alternativen, „beste Handwerkersoftware für kleine Betriebe“, Fakten) und über die Quellen, die KIs zitieren (Vergleichsportale, YouTube, Fachportale).
3. **Content-Lücken** mit niedriger Schwierigkeit (Aufmaß-App, Bautagebuch-App, Zeiterfassung Handwerk, Gewerke-Software, Schlussrechnung, Leistungszeitraum, Regiebericht, Bedenkenanzeige) bekommen je eine Zielseite.
4. **Messung:** Positionen und KI-Prompts werden täglich von SE Ranking geprüft; nach jeder Etappe werden Positionen, Share of Voice und verweisende Domains gegen diesen Ausgangsstand verglichen.
