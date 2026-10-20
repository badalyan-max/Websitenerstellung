# Keyword-Map craftos.eu

Quelle aller Zahlen: SE Ranking Data API, Datenbank Deutschland (`source=de`), Abruf 20.10.2026; Rohdaten docs/seo/data/kwmap/ (Manifest `docs/seo/data/kwmap/manifest.json`).

Maschinenlesbare Fassung: `docs/seo/keyword-map.json`, typisiert über `lib/keyword-map.ts`. Dauerhafter Schutz: `tests/keyword-map.test.ts` (Vollständigkeit, Kannibalisierung, Provenienz). Diese Datei wird aus der JSON-Datei abgeleitet; bei Änderungen zuerst die JSON-Datei anpassen und den Test laufen lassen.

**Stand:** 125 bestehende Pfade (alle URLs aus `app/sitemap.ts`) und 19 geplante Seiten; 126 Einträge mit Hauptkeyword, 18 begründete Ausnahmen ohne Hauptkeyword.

## 1. Methode

**Ablauf.** `scripts/keyword-research.mjs` liest die Seeds aus `docs/seo/keyword-seeds.json`, ruft die SE Ranking Data API mit 1,6 s Pause und 429-Backoff auf und speichert jede Antwort unverändert unter `docs/seo/data/kwmap/<endpunkt>--<seed>.json`. Vorhandene Dateien werden nicht erneut abgerufen (Cache). Der Modus `plan` rechnet vorab den Worst Case, `run` bricht ab, wenn verbuchte und geplante Units zusammen das Budget von 30.000 Units (D-16) übersteigen würden. Der Schlüssel `SE_RANKING_API_KEY` kommt aus der gitignorierten `.env` im Repo-Root; `scripts/check-no-secrets.mjs` prüft, dass er in keiner Datei steht.

**Seeds.** 37 Seeds für `related` (je Seite oder Cluster, inklusive „bauphasen planen“ und „arbeitsabschnitte bau“ nach D-13 und je Gewerk „<gewerk> software“), 15 Themen-Seeds für `questions`, 10 Seeds für `longtail`, 8 Wettbewerberdomains für `domain/keywords` und 7 Domains für `domain/keywords/comparison` gegen craftos.eu (plancraft.com liegt bereits als `data/2026-10-20-keyword-gap-plancraft.json` vor). Zusätzlich hat jeder Sitemap-Pfad 1–3 seitenspezifische Kandidaten (`pageCandidates`), abgeleitet aus Titel und Slug; Rechtsseiten haben keine.

**Endpunkte und Filter.**

| Endpunkt | Aufrufe | Parameter | Units (geschätzt) |
|---|---|---|---|
| `GET /v1/keywords/related` | 37 | `source=de`, `limit=30`, `filter[volume][from]=20` | 9.490 |
| `GET /v1/keywords/questions` | 15 | `source=de`, `limit=20` | 730 |
| `GET /v1/keywords/longtail` | 10 | `source=de`, `limit=100` | 814 |
| `GET /v1/domain/keywords` | 8 | `source=de`, `limit=1000`, `filter[volume][from]=20` | 800 |
| `GET /v1/domain/keywords/comparison` | 7 | `source=de`, `compare=craftos.eu`, `diff=1`, `limit=1000` | 700 |
| `POST /v1/keywords/export` | 2 | `source=de` | 200 |
| Fehlbehandelter Exportaufruf (HTTP 201, wiederholt) | 1 | – | 100 |
| **Summe** | 80 | | **12.834** |

Kontingent laut `/v1/account/subscription`: vor dem Lauf 78.093 Units, danach 65.459 Units (Differenz 12.634 Units, Ablauf des Testzugangs 2026-11-03 17:22:59). Der Verbrauch liegt damit unter dem Budget von 30.000 Units.

**Export.** Alle 373 pageCandidates sowie alle Keywords aus den related-, questions-, longtail- und domain-keywords-Dateien mit Volumen ≥ 10 wurden per `POST /v1/keywords/export` mit einheitlichen Kennzahlen abgefragt (`export--candidates-1.json`, `export--candidates-2.json`). Jede pageCandidate steht dort entweder mit Zahlen oder mit `is_data_found:false`.

**Auswahlregel je Seite.**
1. Hauptkeyword ist bevorzugt eine pageCandidate des Pfads mit Daten: höchstes Volumen unter den Kandidaten mit KD ≤ 30; hat kein Kandidat KD ≤ 30, der Kandidat mit dem höchsten Volumen. Bei gleichem Volumen gewinnt die niedrigere KD. Ist der Begriff schon Hauptkeyword einer anderen Seite, gilt der nächste Kandidat; vergeben wird in der Reihenfolge Kern-, Funktions- und Gewerkeseiten vor Kategorien, Ratgebern und Hilfeartikeln.
2. Passt der Kandidat mit dem höchsten Volumen nicht zur Suchabsicht der Seite (zum Beispiel „handwerker app kostenlos“ für ein kostenpflichtiges Produkt oder „dashboard software“ für allgemeine BI-Werkzeuge), wird der nächstpassende Kandidat gewählt und die Abweichung in `reason` begründet.
3. Hat kein Kandidat Daten, wird ein passendes Keyword aus einer related-, questions- oder domain-keywords-Datei gewählt und die Datei in `reason` genannt; gibt es keines, bleibt `primary` null mit Verweis auf die Exportdatei.
4. Zahlen (Volumen, KD, Intent, CPC) stammen immer aus dem Exportobjekt des Keywords; `source` nennt Datei, Endpunkt und Abrufzeit laut Manifest.
5. Wettbewerber sind alle Domains, die das Hauptkeyword in ihren `domain-keywords--*.json`- oder `comparison--*.json`-Daten führen, mit Position und URL.

**Intent.** SE Ranking ordnet in der deutschen Datenbank fast alle Begriffe als informational ein (Verteilung in der Map: I 122×, L 4×, C 4×). Die Intents werden unverändert übernommen. Die Trennung nach Suchabsicht (Pitfall 5) erfolgt deshalb über unterschiedliche Begriffe: Produkt- und Softwarebegriffe für Kern-, Funktions- und Gewerkeseiten, Erklär-, Vorlage- und Muster-Begriffe für Ratgeber und Hilfe.

**Beobachtung.** `domain-keywords--tooltime.de.json` enthält nur einen Begriff („tooltime.de“); ToolTime rankt in Deutschland überwiegend mit einer anderen Domain. Für die geplante Alternativen-Seite reicht das Markenkeyword aus dem Export.

## 2. Zuordnung je Pfad

### Kernseiten und Rechtsseiten (18)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/` | bestehend | handwerkersoftware | 1.300 | 55 | I | hero-software.de (1) | `export--candidates-1.json` |
| `/funktionen` | bestehend | software für handwerksbetriebe | 110 | 35 | I | hero-software.de (3), das-programm.io (6), openhandwerk.de (23) +1 | `export--candidates-1.json` |
| `/gewerke` | bestehend | branchensoftware handwerk | 20 | 30 | I | craftnote.de (8), das-programm.io (16), openhandwerk.de (31) | `export--candidates-1.json` |
| `/app` | bestehend | handwerker app | 20 | 21 | I | craftnote.de (9), das-programm.io (11), label-software.de (36) +2 | `export--candidates-1.json` |
| `/craft-ai` | bestehend | ki im handwerk | 390 | 27 | L, C | hero-software.de (2), streit-software.de (3) | `export--candidates-1.json` |
| `/preise` | bestehend | handwerkersoftware preise | 50 | 21 | I | hero-software.de (2) | `export--candidates-1.json` |
| `/gobd` | bestehend | gobd konforme software | 40 | 22 | I | – | `export--candidates-1.json` |
| `/vergleich` | bestehend | handwerkersoftware vergleich | 90 | 22 | I | das-programm.io (13), plancraft.com (21) | `export--candidates-1.json` |
| `/fakten-ueber-craftos` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/support` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog` | bestehend | handwerk blog | 40 | 11 | I | craftnote.de (3) | `export--candidates-1.json` |
| `/hilfe` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/rechner` | bestehend | kalkulationsrechner | 40 | 18 | I | – | `export--candidates-1.json` |
| `/rechner/stundensatz` | bestehend | handwerker stundensatz | 320 | 6 | I | – | `export--candidates-1.json` |
| `/rechner/angebotskalkulation` | bestehend | angebotskalkulation | 590 | 9 | I | – | `export--candidates-1.json` |
| `/agb` | bestehend | – (Rechtsseite) | – | – | – | – | – |
| `/datenschutz` | bestehend | – (Rechtsseite) | – | – | – | – | – |
| `/impressum` | bestehend | – (Rechtsseite) | – | – | – | – | – |

### Funktionsseiten (16)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/funktionen/dashboard` | bestehend | kennzahlen handwerksbetrieb | 10 | 26 | I | – | `export--candidates-1.json` |
| `/funktionen/projektverwaltung` | bestehend | auftragsverwaltung software | 170 | 9 | I | hero-software.de (1), openhandwerk.de (1), das-programm.io (31) | `export--candidates-1.json` |
| `/funktionen/angebote` | bestehend | angebotssoftware | 210 | 8 | I | das-programm.io (19) | `export--candidates-1.json` |
| `/funktionen/rechnungen` | bestehend | rechnungssoftware handwerker | 210 | 18 | I | hero-software.de (1) | `export--candidates-1.json` |
| `/funktionen/e-rechnung` | bestehend | e-rechnung handwerk | 50 | 17 | I | – | `export--candidates-1.json` |
| `/funktionen/buchhaltung` | bestehend | buchhaltung handwerk | 210 | 8 | I | streit-software.de (4) | `export--candidates-1.json` |
| `/funktionen/eingangsrechnungen` | bestehend | eingangsrechnungen digitalisieren | 90 | 8 | I | – | `export--candidates-1.json` |
| `/funktionen/plantafel` | bestehend | plantafel software | 90 | 24 | L, C | hero-software.de (4), openhandwerk.de (36), craftnote.de (45) +1 | `export--candidates-1.json` |
| `/funktionen/zeiterfassung` | bestehend | zeiterfassung handwerk | 390 | 12 | I | streit-software.de (1), plancraft.com (1), hero-software.de (5) +1 | `export--candidates-1.json` |
| `/funktionen/lager` | bestehend | lagerverwaltung app | 210 | 14 | I | hero-software.de (1), streit-software.de (1) | `export--candidates-1.json` |
| `/funktionen/baudokumentation` | bestehend | bautagebuch app | 590 | 7 | I | – | `export--candidates-1.json` |
| `/funktionen/aufmass` | bestehend | aufmaß app | 590 | 12 | I | streit-software.de (7), hero-software.de (12), plancraft.com (14) +1 | `export--candidates-1.json` |
| `/funktionen/arbeitsanweisungen` | bestehend | arbeitsanweisung erstellen | 90 | 8 | I | – | `export--candidates-1.json` |
| `/funktionen/team` | bestehend | mitarbeiter app handwerk | 10 | 24 | I | openhandwerk.de (32), label-software.de (56) | `export--candidates-1.json` |
| `/funktionen/nachkalkulation` | bestehend | nachkalkulation handwerk | 40 | 7 | I | streit-software.de (1), plancraft.com (11), openhandwerk.de (25) +2 | `export--candidates-1.json` |
| `/funktionen/kundenportal` | bestehend | kundenportal software | 110 | 13 | I | – | `export--candidates-1.json` |

### Gewerkeseiten (12)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/gewerke/elektriker` | bestehend | elektriker software | 70 | 8 | I | plancraft.com (17), das-programm.io (20) | `export--candidates-1.json` |
| `/gewerke/shk` | bestehend | shk software | 210 | 7 | I | hero-software.de (8), plancraft.com (17), label-software.de (21) +3 | `export--candidates-1.json` |
| `/gewerke/maler` | bestehend | software für maler | 170 | 7 | I | hero-software.de (1), plancraft.com (1), das-programm.io (24) +1 | `export--candidates-1.json` |
| `/gewerke/tischler-schreiner` | bestehend | software für schreiner | 210 | 19 | I | streit-software.de (1), hero-software.de (7), plancraft.com (12) +2 | `export--candidates-1.json` |
| `/gewerke/dachdecker` | bestehend | dachdecker software | 320 | 12 | I | plancraft.com (7), hero-software.de (8), das-programm.io (91) | `export--candidates-1.json` |
| `/gewerke/fliesenleger` | bestehend | fliesenleger software | 170 | 7 | I | hero-software.de (1), das-programm.io (8), craftnote.de (30) +1 | `export--candidates-1.json` |
| `/gewerke/zimmerer` | bestehend | zimmerer software | 140 | 7 | I | hero-software.de (1), streit-software.de (1), plancraft.com (7) | `export--candidates-1.json` |
| `/gewerke/galabau` | bestehend | galabau software | 210 | 16 | I | hero-software.de (6), plancraft.com (19), das-programm.io (47) | `export--candidates-1.json` |
| `/gewerke/trockenbau` | bestehend | trockenbau software | 140 | 6 | I | hero-software.de (1), das-programm.io (8), openhandwerk.de (55) +1 | `export--candidates-1.json` |
| `/gewerke/metallbau` | bestehend | metallbau software | 140 | 13 | I | das-programm.io (1), hero-software.de (1), openhandwerk.de (11) +2 | `export--candidates-1.json` |
| `/gewerke/bauunternehmen` | bestehend | bauunternehmen software | 210 | 13 | I | hero-software.de (3), plancraft.com (33) | `export--candidates-1.json` |
| `/gewerke/allrounder` | bestehend | hausmeister software | 260 | 12 | I | hero-software.de (1), das-programm.io (16) | `export--candidates-1.json` |

### Kategorieseiten (15)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/blog/kategorie/rechnungen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog/kategorie/kalkulation` | bestehend | kalkulation handwerk | 90 | 8 | I | plancraft.com (26), craftnote.de (31) | `export--candidates-1.json` |
| `/blog/kategorie/softwareauswahl` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog/kategorie/belege` | bestehend | belege digitalisieren | 90 | 8 | I | – | `export--candidates-1.json` |
| `/blog/kategorie/projekte` | bestehend | projektmanagement bau | 480 | 15 | L, C | – | `export--candidates-1.json` |
| `/blog/kategorie/team` | bestehend | baustellenkommunikation | 50 | 7 | I | – | `export--candidates-1.json` |
| `/hilfe/kategorie/einrichtung` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/kategorie/angebote` | bestehend | angebot erstellen software | 50 | 9 | I | das-programm.io (13) | `export--candidates-1.json` |
| `/hilfe/kategorie/rechnungen` | bestehend | rechnung erstellen software | 90 | 49 | I | – | `export--candidates-1.json` |
| `/hilfe/kategorie/belege` | bestehend | belege erfassen | 30 | 13 | I | – | `export--candidates-1.json` |
| `/hilfe/kategorie/projekte` | bestehend | bauprojekt planen | 50 | 7 | I | – | `export--candidates-1.json` |
| `/hilfe/kategorie/zeiten` | bestehend | zeiterfassung app | 3.100 | 87 | I | craftnote.de (44), streit-software.de (86) | `export--candidates-1.json` |
| `/hilfe/kategorie/lager` | bestehend | lagerbestand verwalten | 10 | 10 | I | – | `export--candidates-1.json` |
| `/hilfe/kategorie/baudokumentation` | bestehend | baustellendokumentation | 210 | 10 | I | craftnote.de (57), plancraft.com (70) | `export--candidates-1.json` |
| `/hilfe/kategorie/craft-ai` | bestehend | – (keine Daten) | – | – | – | – | – |

### Ratgeber (Blog) (24)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/blog/abschlagsrechnung-schlussrechnung` | bestehend | abschlagsrechnung schlussrechnung | 70 | 6 | I | plancraft.com (32) | `export--candidates-1.json` |
| `/blog/aufmass-angebot-mengen-abzuege` | bestehend | aufmaß erstellen | 210 | 8 | I | plancraft.com (1), hero-software.de (7), craftnote.de (17) +1 | `export--candidates-1.json` |
| `/blog/baustellen-einsatzplanung` | bestehend | baustellenplanung | 70 | 8 | I | craftnote.de (40) | `export--candidates-1.json` |
| `/blog/datev-export-vorbereiten` | bestehend | belege für steuerberater vorbereiten | 10 | 8 | I | – | `export--candidates-1.json` |
| `/blog/digitale-bautagesberichte` | bestehend | bautagesbericht | 320 | 11 | I | plancraft.com (30) | `export--candidates-1.json` |
| `/blog/digitale-projektakte` | bestehend | digitale projektakte | 30 | 7 | I | – | `export--candidates-1.json` |
| `/blog/eingangsrechnungen-digital-organisieren` | bestehend | eingangsrechnungen verwalten | 70 | 9 | I | plancraft.com (6) | `export--candidates-1.json` |
| `/blog/handwerkerangebot-erstellen` | bestehend | angebot handwerker | 170 | 6 | I | streit-software.de (3), das-programm.io (7), openhandwerk.de (14) +2 | `export--candidates-1.json` |
| `/blog/handwerkerrechnung-schreiben` | bestehend | handwerkerrechnung | 590 | 13 | I | streit-software.de (4) | `export--candidates-1.json` |
| `/blog/handwerkersoftware-auswaehlen` | bestehend | beste handwerkersoftware | 90 | 24 | I | das-programm.io (18), plancraft.com (23) | `export--candidates-1.json` |
| `/blog/handwerkersoftware-einzelunternehmen` | bestehend | software für kleine handwerksbetriebe | 50 | 36 | I | hero-software.de (3), das-programm.io (20), openhandwerk.de (48) | `export--candidates-1.json` |
| `/blog/handwerkersoftware-wechseln` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog/ki-belegscan-pruefen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog/materialverbrauch-baustelle-zuordnen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/blog/nachkalkulation-handwerk` | bestehend | nachkalkulation | 590 | 7 | I | hero-software.de (1), openhandwerk.de (11) | `export--candidates-1.json` |
| `/blog/offene-posten-liquiditaet` | bestehend | offene posten | 390 | 9 | I | – | `export--candidates-1.json` |
| `/blog/offline-baustellen-app` | bestehend | offline zeiterfassung | 10 | 0 | I | – | `export--candidates-1.json` |
| `/blog/projektbezogene-zeiterfassung` | bestehend | projektzeiterfassung | 320 | 17 | I | – | `export--candidates-1.json` |
| `/blog/stundenverrechnungssatz-berechnen` | bestehend | stundenverrechnungssatz berechnen | 480 | 6 | I | – | `export--candidates-1.json` |
| `/blog/tiefenkalkulation-handwerk` | bestehend | zuschlagskalkulation handwerk | 10 | 8 | I | streit-software.de (4), craftnote.de (12), das-programm.io (77) +1 | `export--candidates-1.json` |
| `/blog/urlaub-abwesenheiten-einsatzplanung` | bestehend | urlaubsplanung mitarbeiter | 480 | 8 | I | – | `export--candidates-1.json` |
| `/blog/web-app-baustellen-app` | bestehend | baustellen app | 260 | 15 | I | streit-software.de (5), craftnote.de (44) | `export--candidates-1.json` |
| `/blog/xrechnung-zugferd-pdf-unterschiede` | bestehend | xrechnung zugferd unterschied | 70 | 17 | I | – | `export--candidates-1.json` |
| `/blog/zahlungserinnerung-mahnung-handwerk` | bestehend | zahlungserinnerung muster | 260 | 21 | I | streit-software.de (27) | `export--candidates-1.json` |

### Hilfeartikel (40)

| Pfad | Status | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/hilfe/abnahme-dokumentieren` | bestehend | bauabnahme protokoll | 110 | 7 | I | – | `export--candidates-1.json` |
| `/hilfe/abschlagsrechnung-erstellen` | bestehend | abschlagsrechnung muster | 480 | 8 | I | streit-software.de (1) | `export--candidates-1.json` |
| `/hilfe/angebot-entwurf-anlegen` | bestehend | angebot erstellen | 480 | 10 | I | – | `export--candidates-1.json` |
| `/hilfe/angebot-in-rechnung-uebernehmen` | bestehend | handwerker angebot in rechnung stellen | 20 | 9 | I | openhandwerk.de (27) | `export--candidates-1.json` |
| `/hilfe/angebotspositionen-leistungsvorlagen` | bestehend | leistungsverzeichnis vorlage | 210 | 6 | I | streit-software.de (2) | `export--candidates-1.json` |
| `/hilfe/anmelden-web-mobile` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/artikel-stammdaten-anlegen` | bestehend | artikelstammdaten | 110 | 8 | I | – | `export--candidates-1.json` |
| `/hilfe/bautagesbericht-erstellen` | bestehend | bautagesbericht vorlage | 320 | 10 | I | streit-software.de (3), plancraft.com (28) | `export--candidates-1.json` |
| `/hilfe/beleg-kontieren-zuordnen` | bestehend | beleg kontieren | 170 | 8 | I | – | `export--candidates-1.json` |
| `/hilfe/beleg-scannen-pruefen` | bestehend | beleg hochladen | 10 | 22 | I | – | `export--candidates-1.json` |
| `/hilfe/berichte-abrechnen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/craft-ai-betriebsdaten-fragen` | bestehend | ki fragen stellen | 4.400 | 82 | I | – | `export--candidates-1.json` |
| `/hilfe/datev-export-erstellen` | bestehend | datev export | 210 | 10 | I | – | `export--candidates-1.json` |
| `/hilfe/e-rechnung-herunterladen` | bestehend | zugferd rechnung erstellen | 10 | 26 | I | das-programm.io (18), streit-software.de (23), hero-software.de (32) | `export--candidates-1.json` |
| `/hilfe/firmenprofil-einrichten` | bestehend | briefpapier rechnung | 20 | 8 | I | – | `export--candidates-1.json` |
| `/hilfe/gaeb-importieren` | bestehend | gaeb datei öffnen | 390 | 21 | I | streit-software.de (6) | `export--candidates-1.json` |
| `/hilfe/inventur-durchfuehren` | bestehend | inventur lager | 70 | 9 | I | – | `export--candidates-1.json` |
| `/hilfe/ki-entwurf-pruefen-uebernehmen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/kunden-ansprechpartner-anlegen` | bestehend | kundenverwaltung | 140 | 8 | I | – | `export--candidates-1.json` |
| `/hilfe/lagerorte-lagerplaetze-einrichten` | bestehend | lagerplatzverwaltung | 20 | 6 | I | – | `export--candidates-1.json` |
| `/hilfe/mangel-erfassen-bearbeiten` | bestehend | mängelliste | 480 | 9 | I | – | `export--candidates-1.json` |
| `/hilfe/material-entnehmen-zurueckbuchen` | bestehend | materialentnahmeschein | 170 | 7 | I | – | `export--candidates-1.json` |
| `/hilfe/mitarbeiter-einladen-lizenz-zuweisen` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/mobile-offline-synchronisierung` | bestehend | offline synchronisierung | 10 | 9 | I | – | `export--candidates-1.json` |
| `/hilfe/mobilen-timer-bedienen` | bestehend | stempeluhr app | 10 | 19 | I | – | `export--candidates-1.json` |
| `/hilfe/plantafel-einsatz-planen` | bestehend | einsatzplanung | 390 | 12 | I | – | `export--candidates-1.json` |
| `/hilfe/planung-mitarbeiter-ressourcen` | bestehend | ressourcenplanung | 440 | 9 | I | – | `export--candidates-1.json` |
| `/hilfe/position-tiefenkalkulieren` | bestehend | preise kalkulieren | 140 | 12 | I | – | `export--candidates-2.json` |
| `/hilfe/projekt-phasen-anlegen` | bestehend | bauphasen | 590 | 16 | I | – | `export--candidates-1.json` |
| `/hilfe/projektdateien-ordner` | bestehend | ordnerstruktur projekte | 30 | 12 | I | – | `export--candidates-1.json` |
| `/hilfe/raumaufmass-angebot-uebernehmen` | bestehend | aufmaß raum | 10 | 7 | I | – | `export--candidates-1.json` |
| `/hilfe/rechnung-fertigstellen` | bestehend | rechnung korrigieren | 170 | 9 | I | das-programm.io (6) | `export--candidates-1.json` |
| `/hilfe/rechnung-stornieren` | bestehend | storno rechnung | 590 | 9 | I | openhandwerk.de (60) | `export--candidates-1.json` |
| `/hilfe/rollen-zugriffsrechte-einstellen` | bestehend | zugriffsrechte | 260 | 19 | I | – | `export--candidates-1.json` |
| `/hilfe/schlussrechnung-erstellen` | bestehend | schlussrechnung muster | 480 | 7 | I | plancraft.com (62) | `export--candidates-1.json` |
| `/hilfe/urlaub-beantragen-bearbeiten` | bestehend | urlaub beantragen | 390 | 12 | I | – | `export--candidates-1.json` |
| `/hilfe/wareneingang-buchen` | bestehend | wareneingang buchen | 110 | 11 | I | – | `export--candidates-1.json` |
| `/hilfe/zahlungen-erfassen` | bestehend | zahlungseingang | 660 | 8 | I | – | `export--candidates-1.json` |
| `/hilfe/zeiteintrag-erfassen-korrigieren` | bestehend | – (keine Daten) | – | – | – | – | – |
| `/hilfe/zeiten-pruefen-exportieren` | bestehend | stundenzettel excel | 320 | 9 | I | – | `export--candidates-1.json` |

### Geplante Seiten (19)

| Pfad | Zielphase | Hauptkeyword | Volumen | KD | Intent | Wettbewerber (Position) | Quelle |
|---|---|---|---|---|---|---|---|
| `/vergleich/plancraft-alternative` | 8 | plancraft alternative | 30 | 11 | I | – | `export--candidates-1.json` |
| `/vergleich/craftnote-alternative` | 8 | craftnote alternative | 30 | 6 | I | craftnote.de (5), openhandwerk.de (36) | `export--candidates-1.json` |
| `/vergleich/hero-alternative` | 8 | hero software alternative | 10 | 15 | I | – | `export--candidates-1.json` |
| `/vergleich/tooltime-alternative` | 8 | tooltime | 4.400 | 78 | L, C | – | `export--candidates-1.json` |
| `/funktionen/gaeb` | 7 | gaeb software | 140 | 18 | I | das-programm.io (30) | `export--candidates-1.json` |
| `/funktionen/mahnwesen` | 7 | mahnwesen software | 40 | 8 | I | openhandwerk.de (27) | `export--candidates-1.json` |
| `/funktionen/terminplanung` | 7 | bauzeitenplan software | 140 | 12 | I | streit-software.de (3), craftnote.de (37) | `export--candidates-1.json` |
| `/funktionen/bankabgleich` | 7 | zahlungsabgleich | 20 | 8 | I | – | `export--candidates-1.json` |
| `/funktionen/datenuebernahme` | 7 | datenimport | 90 | 8 | I | das-programm.io (8) | `export--candidates-1.json` |
| `/funktionen/maengelmanagement` | 7 | mängelmanagement | 140 | 8 | I | – | `export--candidates-2.json` |
| `/hilfe/leistungszeitraum-rechnung` | 9 | leistungszeitraum rechnung | 390 | 8 | I | plancraft.com (24) | `export--candidates-1.json` |
| `/hilfe/regiebericht` | 9 | regiebericht | 390 | 4 | I | plancraft.com (8), openhandwerk.de (26), craftnote.de (33) | `export--candidates-1.json` |
| `/hilfe/bedenkenanzeige` | 9 | bedenkenanzeige | 390 | 7 | I | plancraft.com (24) | `export--candidates-1.json` |
| `/blog/maengelanzeige` | 9 | mängelanzeige | 810 | 8 | I | craftnote.de (9) | `export--candidates-1.json` |
| `/blog/reverse-charge-bauleistungen` | 9 | reverse charge rechnungsstellung | 590 | 9 | I | hero-software.de (1) | `export--candidates-1.json` |
| `/blog/materialliste-vorlage` | 9 | materialliste vorlage | 210 | 8 | I | craftnote.de (39) | `export--candidates-1.json` |
| `/blog/gaeb-formate` | 9 | gaeb formate | 590 | 12 | I | streit-software.de (6), hero-software.de (10), das-programm.io (48) | `export--candidates-1.json` |
| `/blog/bauablaufplan` | 9 | bauablaufplan | 390 | 10 | I | craftnote.de (50) | `export--candidates-1.json` |
| `/blog/arbeitszeitnachweis-vorlage` | 9 | arbeitszeitnachweis vorlagen | 480 | 8 | I | streit-software.de (19) | `export--candidates-1.json` |

### Seiten ohne belegtes Hauptkeyword (15)

Für diese Seiten hat keine pageCandidate Suchvolumen in der Exportdatei (`is_data_found:false`). Sie bleiben ohne Hauptkeyword, bis in Phasen 6–9 neue Kandidaten recherchiert sind; Titel und Inhalte richten sich bis dahin nach dem Seitenthema.

| Pfad | geprüfte Kandidaten |
|---|---|
| `/fakten-ueber-craftos` | craftos, craftos software, craftos erfahrungen |
| `/support` | craftos support, craftos kontakt |
| `/hilfe` | craftos hilfe, craftos anleitung |
| `/blog/kategorie/rechnungen` | rechnungsstellung handwerk, rechnungen handwerk |
| `/blog/kategorie/softwareauswahl` | handwerkersoftware auswahl, software auswahl handwerk |
| `/hilfe/kategorie/einrichtung` | handwerkersoftware einrichten, craftos einrichten |
| `/hilfe/kategorie/craft-ai` | ki assistent handwerk, ki software handwerk |
| `/blog/handwerkersoftware-wechseln` | handwerkersoftware wechseln, software wechseln, datenübernahme software |
| `/blog/ki-belegscan-pruefen` | belegscan, ki belegerkennung, beleg scannen app |
| `/blog/materialverbrauch-baustelle-zuordnen` | materialverbrauch baustelle, materialerfassung baustelle, materialverbrauch erfassen |
| `/hilfe/anmelden-web-mobile` | craftos login, craftos anmelden |
| `/hilfe/berichte-abrechnen` | stundenlohnarbeiten abrechnen, regiebericht abrechnen, leistungen abrechnen |
| `/hilfe/ki-entwurf-pruefen-uebernehmen` | ki entwurf prüfen, ki texte prüfen |
| `/hilfe/mitarbeiter-einladen-lizenz-zuweisen` | mitarbeiter einladen, lizenz zuweisen |
| `/hilfe/zeiteintrag-erfassen-korrigieren` | arbeitszeit nachtragen, zeiteintrag korrigieren, arbeitszeit korrigieren |

Die Rechtsseiten `/agb`, `/datenschutz` und `/impressum` haben bewusst kein Keyword (begründete Ausnahme nach D-07).

### Begründete Abweichungen von der Auswahlregel (16)

| Pfad | Hauptkeyword | Begründung |
|---|---|---|
| `/app` | handwerker app | Kandidat „handwerker app kostenlos“ hat mehr Volumen, passt aber nicht: CraftOS ist nach der Testphase kostenpflichtig. Gewählt ist der passende Kandidat. |
| `/funktionen/dashboard` | kennzahlen handwerksbetrieb | Kandidat „dashboard software“ hat mehr Volumen, zielt aber auf allgemeine BI-Werkzeuge; gewählt ist der passende Kandidat. |
| `/funktionen/arbeitsanweisungen` | arbeitsanweisung erstellen | Kandidat „arbeitsanweisung vorlage“ hat mehr Volumen, sucht aber Vorlagen zum Herunterladen; gewählt ist der passende Kandidat. |
| `/hilfe/angebot-in-rechnung-uebernehmen` | handwerker angebot in rechnung stellen | Alle pageCandidates ohne Daten (export--candidates-1.json); Hauptkeyword aus domain-keywords--openhandwerk.de.json, passt zur Übernahme eines Angebots in die Rechnung. |
| `/hilfe/craft-ai-betriebsdaten-fragen` | ki fragen stellen | Einziger Kandidat mit Daten; hohe Schwierigkeit, aber passend zur Anleitung, Craft AI Fragen zu Betriebsdaten zu stellen. |
| `/hilfe/position-tiefenkalkulieren` | preise kalkulieren | Alle pageCandidates ohne Daten (export--candidates-1.json); Hauptkeyword aus related--angebotskalkulation.json, passt zur detaillierten Kalkulation einer Position. |
| `/hilfe/rechnung-fertigstellen` | rechnung korrigieren | Einziger Kandidat mit Daten („schlussrechnung erstellen“) gehört inhaltlich zu /hilfe/schlussrechnung-erstellen; Hauptkeyword aus domain-keywords--das-programm.io.json beschreibt den Prüf- und Korrekturschritt vor dem Fertigstellen. |
| `/vergleich/tooltime-alternative` | tooltime | Kandidat „tooltime alternative“ ohne Daten (export--candidates-1.json); Markenbegriff „tooltime“ als einziger Kandidat mit Daten, Seite vergleicht sachlich. |
| `/funktionen/datenuebernahme` | datenimport | Lücke aus domain-keywords--das-programm.io.json; Datenübernahme ist live (Web-Route /daten-uebernehmen). |
| `/funktionen/maengelmanagement` | mängelmanagement | Lücke aus related--maengelmanagement-app.json; Mängel sind live (Web und Mobile). |
| `/blog/maengelanzeige` | mängelanzeige | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |
| `/blog/reverse-charge-bauleistungen` | reverse charge rechnungsstellung | Lücke aus domain-keywords--hero-software.de.json (KD < 20). |
| `/blog/materialliste-vorlage` | materialliste vorlage | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |
| `/blog/gaeb-formate` | gaeb formate | Lücke aus domain-keywords--das-programm.io.json (KD < 20). |
| `/blog/bauablaufplan` | bauablaufplan | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |
| `/blog/arbeitszeitnachweis-vorlage` | arbeitszeitnachweis vorlagen | Lücke aus domain-keywords--streit-software.de.json (KD < 20). |

## 3. Lücken mit Nachfrage und KD < 20 (Zielphase)

Lücken sind Suchbegriffe mit mindestens 50 Suchanfragen im Monat und KD < 20, für die keine bestehende Seite passt (D-07). Sie stammen aus den Wettbewerber- und Vergleichsdaten (`domain-keywords--*`, `comparison--*`) und den related-/questions-Abfragen und sind in der Map als `geplant` mit Zielphase eingetragen.

| Zielphase | Pfad (Vorschlag) | Hauptkeyword | Volumen | KD | Nebenbegriffe | Herkunft |
|---|---|---|---|---|---|---|
| 7 | `/funktionen/gaeb` | gaeb software | 140 | 18 | gaeb programm, datanorm import | pageCandidates des Pfads |
| 7 | `/funktionen/terminplanung` | bauzeitenplan software | 140 | 12 | terminplanung handwerk, bauablaufplan software | pageCandidates des Pfads |
| 7 | `/funktionen/maengelmanagement` | mängelmanagement | 140 | 8 | mängelmanagement app | Lücke aus related--maengelmanagement-app.json; Mängel sind live (Web und Mobile). |
| 7 | `/funktionen/datenuebernahme` | datenimport | 90 | 8 | daten importieren | Lücke aus domain-keywords--das-programm.io.json; Datenübernahme ist live (Web-Route /daten-uebernehmen). |
| 9 | `/blog/maengelanzeige` | mängelanzeige | 810 | 8 | mängelanzeige vob, mängelrüge frist | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |
| 9 | `/blog/reverse-charge-bauleistungen` | reverse charge rechnungsstellung | 590 | 9 | – | Lücke aus domain-keywords--hero-software.de.json (KD < 20). |
| 9 | `/blog/gaeb-formate` | gaeb formate | 590 | 12 | gaeb format, gaeb datei | Lücke aus domain-keywords--das-programm.io.json (KD < 20). |
| 9 | `/blog/arbeitszeitnachweis-vorlage` | arbeitszeitnachweis vorlagen | 480 | 8 | stundenzettel vorlage | Lücke aus domain-keywords--streit-software.de.json (KD < 20). |
| 9 | `/hilfe/leistungszeitraum-rechnung` | leistungszeitraum rechnung | 390 | 8 | leistungszeitraum, leistungsdatum rechnung, leistungszeitraum auf rechnung | pageCandidates des Pfads |
| 9 | `/hilfe/regiebericht` | regiebericht | 390 | 4 | regiebericht vorlage, regiearbeiten | pageCandidates des Pfads |
| 9 | `/hilfe/bedenkenanzeige` | bedenkenanzeige | 390 | 7 | bedenkenanzeige vob, bedenkenanzeige muster | pageCandidates des Pfads |
| 9 | `/blog/bauablaufplan` | bauablaufplan | 390 | 10 | bauzeitenplan excel vorlage, bauzeitenplan | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |
| 9 | `/blog/materialliste-vorlage` | materialliste vorlage | 210 | 8 | materialliste erstellen | Lücke aus domain-keywords--craftnote.de.json (KD < 20). |

Weitere geplante Einträge unterhalb der Lückenschwelle, aber als Seite vorgemerkt:

| Zielphase | Pfad | Hauptkeyword | Volumen | KD | Grund |
|---|---|---|---|---|---|
| 8 | `/vergleich/plancraft-alternative` | plancraft alternative | 30 | 11 | Alternativen-Seite (Markenbegriff, D-06) |
| 8 | `/vergleich/craftnote-alternative` | craftnote alternative | 30 | 6 | Alternativen-Seite (Markenbegriff, D-06) |
| 8 | `/vergleich/hero-alternative` | hero software alternative | 10 | 15 | Alternativen-Seite (Markenbegriff, D-06) |
| 8 | `/vergleich/tooltime-alternative` | tooltime | 4.400 | 78 | Alternativen-Seite (Markenbegriff, D-06) |
| 7 | `/funktionen/mahnwesen` | mahnwesen software | 40 | 8 | live, aber noch ohne Seite (RESEARCH Tabelle B) |
| 7 | `/funktionen/bankabgleich` | zahlungsabgleich | 20 | 8 | live, aber noch ohne Seite (RESEARCH Tabelle B) |

**Bewusst nicht vorgemerkt:** „ki telefonassistent handwerk“ (140/5, `domain-keywords--hero-software.de.json`) – ein Telefon-Agent ist in CraftOS nicht live und wird nicht angekündigt (D-12). Begriffe mit hoher Schwierigkeit wie „stundenzettel vorlage“ (6.600/79), „rechnung schreiben“ (8.000/90) oder „zuschlagskalkulation“ (910/13) werden nicht als eigene Seiten vorgemerkt; „zuschlagskalkulation“ ist Nebenbegriff von `/blog/tiefenkalkulation-handwerk`, „stundenzettel vorlage“ von `/blog/arbeitszeitnachweis-vorlage`.

## 4. Regeln gegen Kannibalisierung

1. Jede Seite hat genau ein Hauptkeyword; nach Normalisierung (Kleinschreibung, ß→ss, ä/ö/ü→ae/oe/ue, Leerzeichen und Bindestriche entfernt) ist kein Hauptkeyword doppelt. Der Test prüft das bei jedem Lauf.
2. Schreibvarianten („handwerker software“, „malersoftware“, „storno rechnung“/„stornorechnung“) sind nur Nebenbegriffe derselben Seite. Ein Nebenbegriff darf nicht Hauptkeyword einer anderen Seite sein (ebenfalls getestet).
3. Produkt- und Softwarebegriffe gehören zu Kern-, Funktions- und Gewerkeseiten („bautagebuch app“ → `/funktionen/baudokumentation`), Erklär-, Vorlage- und Muster-Begriffe zu Ratgebern und Hilfeartikeln („bautagesbericht“ → `/blog/digitale-bautagesberichte`, „bautagesbericht vorlage“ → `/hilfe/bautagesbericht-erstellen`).
4. Funktions- und Ratgeberseite zum selben Thema teilen sich das Thema über unterschiedliche Keywords: „nachkalkulation handwerk“ (Funktion) und „nachkalkulation“ (Ratgeber), „eingangsrechnungen digitalisieren“ (Funktion) und „eingangsrechnungen verwalten“ (Ratgeber), „schlussrechnung muster“ (Hilfe) und „abschlagsrechnung schlussrechnung“ (Ratgeber).
5. „Bauphasen“ ist Hauptbegriff (`/hilfe/projekt-phasen-anlegen`, 590/16), „Arbeitsabschnitte“ wird als Synonym und Nebenbegriff geführt (D-13); „arbeitsabschnitte bau“ hat laut `export--candidates-1.json` kein Suchvolumen (`is_data_found:false`), `related--arbeitsabschnitte-bau.json` und `related--bauphasen-planen.json` liefern keine verwandten Begriffe.
6. Neue Seiten erhalten ihr Hauptkeyword zuerst in `docs/seo/keyword-map.json`; der Test verhindert Doppelungen, bevor Inhalte entstehen.

## 5. Zielwerte für Titel, H1 und Description (Umsetzung Phasen 6–8, D-14)

Die Zielwerte werden in Phase 5 nur festgelegt, nicht in die Seiten übernommen. Titel enthalten das Hauptkeyword (nach Normalisierung) und sind inklusive Marken-Suffix „ | CraftOS“ aus dem Layout-Template höchstens 60 Zeichen lang; Descriptions haben 120–155 Zeichen. Produktaussagen beschränken sich auf live verfügbare Funktionen; Phasen 6–8 prüfen jede Aussage beim Übernehmen erneut gegen das Produktregister.

| Pfad | Titel | H1 | Description |
|---|---|---|---|
| `/` | Handwerkersoftware für Büro und Baustelle \| CraftOS | Handwerkersoftware, die Büro und Baustelle verbindet | CraftOS ist die Handwerkersoftware für Angebote, Rechnungen, Plantafel, Zeiterfassung und Lager – Web-App und Mobile-App in einer Lizenz. 10 Tage testen. |
| `/funktionen` | Software für Handwerksbetriebe: alle Funktionen \| CraftOS | Alle Funktionen der Software für Handwerksbetriebe | Angebote, Rechnungen, Plantafel, Zeiterfassung, Aufmaß, Lager und Baudokumentation: alle Funktionen der Software für Handwerksbetriebe im Überblick. |
| `/gewerke` | Branchensoftware Handwerk nach Gewerk \| CraftOS | Branchensoftware fürs Handwerk – passend zu Ihrem Gewerk | CraftOS als Branchensoftware fürs Handwerk: passende Abläufe für Elektro, SHK, Maler, Tischler und weitere Gewerke – vom Angebot bis zur Rechnung. |
| `/app` | Handwerker-App für die Baustelle \| CraftOS | Die Handwerker-App für Ihr Team auf der Baustelle | Die Handwerker-App von CraftOS: Zeiten mit Projektbezug erfassen, Einsätze sehen, Fotos und Unterschriften aufnehmen. In der Voll-Lizenz inklusive. |
| `/craft-ai` | KI im Handwerk: Craft AI für Ihre Betriebsdaten \| CraftOS | KI im Handwerk: Craft AI beantwortet Fragen zu Ihrem Betrieb | Craft AI bringt KI ins Handwerk: Fragen zu Projekten, Rechnungen und Zeiten stellen und Entwürfe vorbereiten lassen. Sie prüfen und übernehmen selbst. |
| `/preise` | Handwerkersoftware Preise und Lizenzen \| CraftOS | Preise der Handwerkersoftware CraftOS | Handwerkersoftware-Preise transparent: Voll-Lizenz mit Web-App und Mobile-App, günstigere App-Lizenz fürs Team und Jahresabo mit Rabatt. 10 Tage testen. |
| `/gobd` | GoBD-konforme Software fürs Handwerk \| CraftOS | GoBD-konforme Software: wie CraftOS Ihre Abläufe unterstützt | Festschreibung, geschützte Rechnungen, Versionen und Protokolle: So unterstützt CraftOS als GoBD-konforme Software die Abläufe in Ihrem Handwerksbetrieb. |
| `/vergleich` | Handwerkersoftware-Vergleich mit Quellen \| CraftOS | Handwerkersoftware im Vergleich: CraftOS, Craftnote und plancraft | Handwerkersoftware-Vergleich mit Quellen: Preise, Mobile-App, E-Rechnung und Funktionen von CraftOS, Craftnote und plancraft nebeneinander geprüft. |
| `/blog` | Handwerk-Blog: Ratgeber für Ihren Betrieb \| CraftOS | Handwerk-Blog: Ratgeber für Büro und Baustelle | Der Handwerk-Blog von CraftOS: Ratgeber zu Rechnungen, Kalkulation, Projekten und Teamplanung – mit Beispielen, Quellen und kostenlosen Rechnern. |
| `/rechner` | Kalkulationsrechner fürs Handwerk – kostenlos \| CraftOS | Kostenlose Kalkulationsrechner fürs Handwerk | Kostenlose Kalkulationsrechner fürs Handwerk: Stundenverrechnungssatz und Angebotspreis mit Ihren eigenen Zahlen berechnen – direkt im Browser. |
| `/rechner/stundensatz` | Handwerker-Stundensatz berechnen: Rechner \| CraftOS | Handwerker-Stundensatz berechnen | Mit dem kostenlosen Rechner Ihren Handwerker-Stundensatz berechnen: Jahreskosten, produktive Stunden und Gewinnzuschlag ergeben einen tragfähigen Preis. |
| `/rechner/angebotskalkulation` | Angebotskalkulation: kostenloser Rechner \| CraftOS | Angebotskalkulation mit Material, Lohn und Zuschlag | Angebotskalkulation online: Material, Lohnstunden und Zuschläge eingeben und einen nachvollziehbaren Angebotspreis für Ihren Handwerksauftrag berechnen. |
| `/funktionen/dashboard` | Kennzahlen Handwerksbetrieb: das Dashboard \| CraftOS | Die Kennzahlen Ihres Handwerksbetriebs auf einen Blick | Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick: Das Dashboard zeigt die Kennzahlen Ihres Handwerksbetriebs mit der nächsten Aufgabe. |
| `/funktionen/projektverwaltung` | Auftragsverwaltung-Software fürs Handwerk \| CraftOS | Auftragsverwaltung: alle Informationen beim Projekt | Auftragsverwaltung-Software für Handwerker: Kunden, Phasen, Aufgaben, Dokumente und Projektchat bleiben beim Auftrag – vom Angebot bis zur Abnahme. |
| `/funktionen/angebote` | Angebotssoftware mit Kalkulation fürs Handwerk \| CraftOS | Angebotssoftware, die bis zur letzten Position passt | Angebotssoftware für Handwerker: Leistungen beschreiben, Mengen aus dem Aufmaß übernehmen und Material, Lohn und Zuschläge nachvollziehbar kalkulieren. |
| `/funktionen/rechnungen` | Rechnungssoftware Handwerker: prüfbar abrechnen \| CraftOS | Rechnungssoftware: von der Arbeit zur prüfbaren Rechnung | Rechnungssoftware für Handwerker: Rechnungen, Abschläge und Schlussrechnungen erstellen, Zahlungen zuordnen und jeden Entwurf vor dem Fertigstellen prüfen. |
| `/funktionen/e-rechnung` | E-Rechnung Handwerk: XRechnung und ZUGFeRD \| CraftOS | E-Rechnung im Handwerk mit XRechnung und ZUGFeRD | E-Rechnung im Handwerk: XRechnung und ZUGFeRD aus CraftOS erzeugen und elektronische Eingangsrechnungen einlesen – strukturiert und im Dokumentablauf. |
| `/funktionen/buchhaltung` | Buchhaltung Handwerk: vorbereitet für DATEV \| CraftOS | Buchhaltung im Handwerk: sauber vorbereitet für die Steuerberatung | Buchhaltung im Handwerk vorbereiten: Belege prüfen, Buchungen nachvollziehen und Daten mit Belegbezug für DATEV und Ihre Steuerberatung exportieren. |
| `/funktionen/eingangsrechnungen` | Eingangsrechnungen digitalisieren mit Belegscan \| CraftOS | Eingangsrechnungen digitalisieren und prüfen | Eingangsrechnungen digitalisieren: Belege aufnehmen, erkannte Angaben kontrollieren und Ausgaben einem Projekt zuordnen. Gespeichert wird nach Prüfung. |
| `/funktionen/plantafel` | Plantafel-Software für die Einsatzplanung \| CraftOS | Plantafel-Software: wer macht was und wann | Plantafel-Software für Handwerksbetriebe: Team und Einsätze planen, Einsatzorte auf der Karte sehen und Änderungen direkt in die Mobile-App übertragen. |
| `/funktionen/zeiterfassung` | Zeiterfassung Handwerk: App mit Projektbezug \| CraftOS | Zeiterfassung im Handwerk: die Zeit landet beim Projekt | Zeiterfassung im Handwerk per App: Timer starten, Projekt in der Nähe zuordnen und die Stunden im Büro für Auswertung und Nachkalkulation nutzen. |
| `/funktionen/lager` | Lagerverwaltung-App für Handwerker \| CraftOS | Lagerverwaltung per App: wissen, was da ist | Lagerverwaltung-App für Handwerksbetriebe: Bestände, Lagerorte und Bewegungen nachvollziehen und Entnahmen direkt den Kosten des Projekts zuordnen. |
| `/funktionen/baudokumentation` | Bautagebuch-App für die Baudokumentation \| CraftOS | Bautagebuch-App: was auf der Baustelle passiert, bleibt im Projekt | Bautagebuch-App für Handwerker: Arbeiten, Fotos und Mängel beim Projekt festhalten, Berichte mobil unterschreiben lassen und im Büro wiederfinden. |
| `/funktionen/aufmass` | Aufmaß-App: Räume erfassen, Angebot erstellen \| CraftOS | Aufmaß-App: aus Maßen werden Positionen | Aufmaß-App für Handwerker: Räume, Flächen und Abzüge erfassen und geprüfte Mengen für Boden, Wand und Decke direkt ins Angebot übernehmen. |
| `/funktionen/arbeitsanweisungen` | Arbeitsanweisung erstellen fürs Team \| CraftOS | Arbeitsanweisungen erstellen: das Team weiß, was zu tun ist | Arbeitsanweisung erstellen aus Angebot oder Auftrag: Leistungen und Materialbedarf ohne Verkaufspreise und mit Projektbezug an das Team weitergeben. |
| `/funktionen/team` | Mitarbeiter-App Handwerk: Team und Rechte \| CraftOS | Team und Rechte: jeder Zugang passt zur Aufgabe | Mitarbeiter-App im Handwerk: Mitarbeitende einladen, Zugänge zuweisen und Rechte passend zur Arbeit vergeben – Büro und Baustelle auf einer Grundlage. |
| `/funktionen/nachkalkulation` | Nachkalkulation Handwerk: Ist-Kosten im Blick \| CraftOS | Nachkalkulation: was hat der Auftrag wirklich gekostet? | Nachkalkulation im Handwerk: geplante und tatsächliche Kosten für Lohn, Material und Leistungen vergleichen und Abweichungen je Auftrag sichtbar machen. |
| `/funktionen/kundenportal` | Kundenportal-Software für Handwerksbetriebe \| CraftOS | Kundenportal: ein gemeinsamer Ort für Ihre Kunden | Kundenportal-Software für Handwerker: Angebote, Dokumente und Kommunikation für Ihre Kunden im Browser bereitstellen – mit Einladung und eigenem Zugang. |
| `/gewerke/elektriker` | Elektriker-Software für Elektrobetriebe \| CraftOS | Elektriker-Software für Angebot, Einsatz und Abrechnung | Elektriker-Software von CraftOS: Angebote kalkulieren, Einsätze planen, Zeiten und Material erfassen und Rechnungen erstellen – für Elektrobetriebe. |
| `/gewerke/shk` | SHK-Software für Sanitär, Heizung, Klima \| CraftOS | SHK-Software für Sanitär, Heizung und Klima | SHK-Software von CraftOS: Angebote, Einsatzplanung, Zeiterfassung und Rechnungen für Betriebe in Sanitär, Heizung und Klima in einem System. |
| `/gewerke/maler` | Software für Maler und Lackierer \| CraftOS | Software für Maler: vom Aufmaß bis zur Rechnung | Software für Maler und Lackierer: Räume aufmessen, Flächen ins Angebot übernehmen, Einsätze planen und Arbeitszeiten projektbezogen erfassen. |
| `/gewerke/tischler-schreiner` | Software für Schreiner und Tischler \| CraftOS | Software für Schreiner und Tischler | Software für Schreiner und Tischler: Angebote mit Material und Lohn kalkulieren, Aufträge planen, Montagezeiten erfassen und sauber abrechnen. |
| `/gewerke/dachdecker` | Dachdecker-Software für Büro und Dach \| CraftOS | Dachdecker-Software für Angebot, Baustelle und Rechnung | Dachdecker-Software von CraftOS: Aufmaß und Angebot, Einsatzplanung, Baustellenfotos, Zeiten und Rechnungen – im Büro und auf dem Dach per App. |
| `/gewerke/fliesenleger` | Fliesenleger-Software mit Raumaufmaß \| CraftOS | Fliesenleger-Software: Flächen erfassen, Angebot erstellen | Fliesenleger-Software von CraftOS: Räume und Flächen aufmessen, Abzüge berücksichtigen, Angebote kalkulieren und Arbeitszeiten je Projekt erfassen. |
| `/gewerke/zimmerer` | Zimmerer-Software für Holzbaubetriebe \| CraftOS | Zimmerer-Software für Zimmerei und Holzbau | Zimmerer-Software von CraftOS: Angebote kalkulieren, Montageeinsätze planen, Zeiten und Material auf der Baustelle erfassen und Projekte abrechnen. |
| `/gewerke/galabau` | GaLaBau-Software für Garten- und Landschaftsbau \| CraftOS | GaLaBau-Software für Garten- und Landschaftsbau | GaLaBau-Software von CraftOS: Projekte und Pflege planen, Kolonnen einteilen, Zeiten und Material erfassen und Leistungen im GaLaBau abrechnen. |
| `/gewerke/trockenbau` | Trockenbau-Software für den Innenausbau \| CraftOS | Trockenbau-Software für Aufmaß, Angebot und Ausführung | Trockenbau-Software von CraftOS: Wand- und Deckenflächen aufmessen, Angebote kalkulieren, Einsätze planen und Zeiten im Innenausbau erfassen. |
| `/gewerke/metallbau` | Metallbau-Software für Schlossereien \| CraftOS | Metallbau-Software für Werkstatt und Montage | Metallbau-Software von CraftOS: Angebote mit Material und Lohn kalkulieren, Montagen planen, Zeiten und Material erfassen und Aufträge sauber abrechnen. |
| `/gewerke/bauunternehmen` | Bauunternehmen-Software für Baubetriebe \| CraftOS | Software für Bauunternehmen: Projekte, Team und Abrechnung | Bauunternehmen-Software: Projekte mit Phasen führen, Kolonnen planen, Bautagesberichte erfassen und Abschläge sowie Schlussrechnungen erstellen. |
| `/gewerke/allrounder` | Hausmeister-Software für Hausmeisterservice \| CraftOS | Hausmeister-Software für wiederkehrende Einsätze | Hausmeister-Software von CraftOS: wiederkehrende Leistungen vorbereiten, Einsätze einteilen, Arbeit dokumentieren und erbrachte Leistungen abrechnen. |
| `/blog/kategorie/kalkulation` | Kalkulation Handwerk: Ratgeber und Rechner \| CraftOS | Kalkulation im Handwerk: Angebote und Preise | Ratgeber zur Kalkulation im Handwerk: Stundenverrechnungssatz, Tiefenkalkulation, Aufmaß und Angebot – mit Beispielen, Quellen und kostenlosen Rechnern. |
| `/blog/kategorie/belege` | Belege digitalisieren im Handwerk: Ratgeber \| CraftOS | Belege digitalisieren und den Überblick behalten | Ratgeber: Belege digitalisieren, Eingangsrechnungen organisieren, offene Posten im Blick behalten und den DATEV-Export für die Steuerkanzlei vorbereiten. |
| `/blog/kategorie/projekte` | Projektmanagement Bau: Ratgeber \| CraftOS | Projektmanagement am Bau für Handwerksbetriebe | Ratgeber zu Projektmanagement am Bau: Einsatzplanung, digitale Projektakte, Materialverbrauch und Nachkalkulation für Handwerksbetriebe erklärt. |
| `/blog/kategorie/team` | Baustellenkommunikation und Team: Ratgeber \| CraftOS | Baustellenkommunikation und Teamarbeit | Ratgeber zu Baustellenkommunikation: Bautagesberichte, Zeiterfassung, Urlaubsplanung und Offline-Arbeit auf der Baustelle – praxisnah für Ihr Team. |
| `/hilfe/kategorie/angebote` | Angebot erstellen Software-gestützt: Anleitungen \| CraftOS | Anleitungen: Angebote in CraftOS erstellen | Angebot erstellen mit Software: Anleitungen für Entwürfe, Leistungsvorlagen, Positionskalkulation, Raumaufmaß und GAEB-Import in der CraftOS Web-App. |
| `/hilfe/kategorie/rechnungen` | Rechnung erstellen Software-gestützt: Anleitungen \| CraftOS | Anleitungen: Rechnungen in CraftOS erstellen | Rechnung erstellen mit Software: Anleitungen für Abschläge, Schlussrechnung, E-Rechnung, Storno und das Fertigstellen von Rechnungen in CraftOS. |
| `/hilfe/kategorie/belege` | Belege erfassen und Zahlungen buchen: Hilfe \| CraftOS | Anleitungen: Belege erfassen und Zahlungen zuordnen | Belege erfassen, scannen und kontieren, Zahlungen zu Rechnungen buchen und den DATEV-Export erstellen: Schritt-für-Schritt-Anleitungen für CraftOS. |
| `/hilfe/kategorie/projekte` | Bauprojekt planen mit CraftOS: Anleitungen \| CraftOS | Anleitungen: Projekte und Einsätze planen | Bauprojekt planen in CraftOS: Anleitungen für Projektphasen, Plantafel, Ressourcen und Projektdateien – damit Büro und Baustelle denselben Stand haben. |
| `/hilfe/kategorie/zeiten` | Zeiterfassung-App: Anleitungen für CraftOS \| CraftOS | Anleitungen: Zeiten und Mobile-App | Zeiterfassung per App: Anleitungen zum Timer, zum Nachtragen und Exportieren von Zeiten, zu Urlaubsanträgen und zur Offline-Synchronisierung in CraftOS. |
| `/hilfe/kategorie/lager` | Lagerbestand verwalten: Anleitungen \| CraftOS | Anleitungen: Lager und Material | Lagerbestand verwalten in CraftOS: Anleitungen für Artikelstammdaten, Lagerorte, Wareneingang, Materialentnahme und Inventur mit Bestandsdifferenzen. |
| `/hilfe/kategorie/baudokumentation` | Baustellendokumentation: Anleitungen \| CraftOS | Anleitungen: Baustellendokumentation | Baustellendokumentation in CraftOS: Anleitungen für Bautagesberichte, Mängel und Abnahmen mit Prüfpunkten – auf der Baustelle erfasst, im Büro auffindbar. |
| `/blog/abschlagsrechnung-schlussrechnung` | Abschlagsrechnung Schlussrechnung: Unterschied \| CraftOS | Abschlagsrechnung und Schlussrechnung sauber trennen | Abschlagsrechnung und Schlussrechnung im Handwerk: wie Sie Leistungen, Teilzahlungen und Restforderung sauber auseinanderhalten und prüfbar abrechnen. |
| `/blog/aufmass-angebot-mengen-abzuege` | Aufmaß erstellen: Mengen und Abzüge prüfen \| CraftOS | Aufmaß erstellen und ins Angebot übernehmen | Aufmaß erstellen und ins Angebot übernehmen: wie Sie Mengen, Einheiten und Abzüge richtig prüfen, bevor daraus Positionen und Preise werden. |
| `/blog/baustellen-einsatzplanung` | Baustellenplanung: Kapazität und Einsätze \| CraftOS | Baustellenplanung mit Kapazität, Abwesenheiten und Übergaben | Baustellenplanung: Kapazitäten, Abwesenheiten und Übergaben verbinden, damit Team, Fahrzeuge und Material zur richtigen Zeit am Einsatzort sind. |
| `/blog/datev-export-vorbereiten` | Belege für Steuerberater vorbereiten \| CraftOS | DATEV-Export vorbereiten: Belege für den Steuerberater | Belege für den Steuerberater vorbereiten: Vollständigkeit prüfen, Zeitraum abstimmen und den DATEV-Export übergeben, mit dem die Kanzlei weiterarbeitet. |
| `/blog/digitale-bautagesberichte` | Bautagesbericht digital: so hilft er wirklich \| CraftOS | Digitale Bautagesberichte, die wirklich helfen | Bautagesbericht digital führen: Leistungen, Abweichungen, Wetter und Behinderungen so dokumentieren, dass sie für Abrechnung und Nachweis wirklich helfen. |
| `/blog/digitale-projektakte` | Digitale Projektakte im Handwerk \| CraftOS | Digitale Projektakte: alles zum Auftrag an einem Ort | Digitale Projektakte im Handwerk: Angebote, Dateien, Zeiten und Entscheidungen zusammenführen, damit jeder im Team den aktuellen Stand des Auftrags kennt. |
| `/blog/eingangsrechnungen-digital-organisieren` | Eingangsrechnungen verwalten: digital und geprüft \| CraftOS | Eingangsrechnungen digital verwalten | Eingangsrechnungen verwalten im Handwerk: vom Posteingang über Prüfung und Projektzuordnung bis zur geprüften Übergabe an Buchhaltung und Steuerkanzlei. |
| `/blog/handwerkerangebot-erstellen` | Angebot Handwerker erstellen: Leistung und Preis \| CraftOS | Handwerkerangebot erstellen: Leistung, Annahmen und Preis | Ein gutes Angebot als Handwerker erstellen: Leistungen klar beschreiben, Annahmen offenlegen und den Preis so begründen, dass Kunden ihn nachvollziehen. |
| `/blog/handwerkerrechnung-schreiben` | Handwerkerrechnung schreiben: Pflichtangaben \| CraftOS | Handwerkerrechnung schreiben: vom Nachweis zum Dokument | Handwerkerrechnung schreiben: Pflichtangaben, Leistungsnachweis und Lohnanteil richtig darstellen, damit Ihre Rechnung prüfbar ist und bezahlt wird. |
| `/blog/handwerkersoftware-auswaehlen` | Beste Handwerkersoftware finden: mit Testauftrag \| CraftOS | Die beste Handwerkersoftware für Ihren Betrieb auswählen | Die beste Handwerkersoftware finden Sie mit einem echten Auftrag statt einer Funktionsliste: Kriterien, Testablauf und Fragen für Ihre Auswahl. |
| `/blog/handwerkersoftware-einzelunternehmen` | Software für kleine Handwerksbetriebe \| CraftOS | Software für kleine Handwerksbetriebe und Einzelunternehmer | Software für kleine Handwerksbetriebe und Einzelunternehmer: wenig Verwaltung, vollständige Aufträge – worauf es bei Auswahl, Preis und Mobile-App ankommt. |
| `/blog/nachkalkulation-handwerk` | Nachkalkulation: Abweichungen erkennen \| CraftOS | Nachkalkulation im Handwerk: aus Abweichungen lernen | Nachkalkulation: geplante und tatsächliche Kosten vergleichen, Abweichungen erkennen und die nächsten Angebote im Handwerk gezielt verbessern. |
| `/blog/offene-posten-liquiditaet` | Offene Posten und Liquidität im Handwerk \| CraftOS | Offene Posten und Liquidität richtig lesen | Offene Posten im Handwerk verstehen: warum Rechnungsbeträge kein verfügbares Geld sind und wie Sie Forderungen und Liquidität getrennt im Blick behalten. |
| `/blog/offline-baustellen-app` | Offline-Zeiterfassung auf der Baustelle \| CraftOS | Offline auf der Baustelle arbeiten | Offline-Zeiterfassung und Baustellen-App ohne Netz: Arbeit vorbereiten, Daten lokal erfassen und die Synchronisierung danach zuverlässig prüfen. |
| `/blog/projektbezogene-zeiterfassung` | Projektzeiterfassung im Handwerk \| CraftOS | Projektbezogene Zeiterfassung: Stunden mit Auftragsbezug | Projektzeiterfassung im Handwerk: wie aus erfassten Stunden brauchbare Auftragsdaten für Abrechnung, Nachkalkulation und bessere Angebote werden. |
| `/blog/stundenverrechnungssatz-berechnen` | Stundenverrechnungssatz berechnen: Anleitung \| CraftOS | Stundenverrechnungssatz berechnen: von Kosten zum Preis | Stundenverrechnungssatz berechnen: von Jahreskosten und produktiven Stunden zum tragfähigen Preis – mit Beispiel und kostenlosem Rechner. |
| `/blog/tiefenkalkulation-handwerk` | Zuschlagskalkulation Handwerk: Tiefenkalkulation \| CraftOS | Tiefenkalkulation: Material, Lohn und Zuschläge verbinden | Zuschlagskalkulation im Handwerk als Tiefenkalkulation: Material, Lohn, Gemeinkosten und Marge je Position nachvollziehbar zu einem Preis verbinden. |
| `/blog/urlaub-abwesenheiten-einsatzplanung` | Urlaubsplanung Mitarbeiter in der Einsatzplanung \| CraftOS | Urlaub und Abwesenheiten in der Einsatzplanung | Urlaubsplanung für Mitarbeiter im Handwerk: Urlaub und Abwesenheiten früh in der Einsatzplanung berücksichtigen, damit Baustellen besetzt bleiben. |
| `/blog/web-app-baustellen-app` | Baustellen-App und Web-App: Aufgaben verteilen \| CraftOS | Web-App und Baustellen-App sinnvoll aufteilen | Baustellen-App und Web-App im Handwerk: welche Aufgaben ins Büro gehören, was das Team mobil erledigt und wie beide auf denselben Daten arbeiten. |
| `/blog/xrechnung-zugferd-pdf-unterschiede` | XRechnung ZUGFeRD Unterschied einfach erklärt \| CraftOS | XRechnung, ZUGFeRD oder PDF: welches Format passt? | XRechnung und ZUGFeRD im Unterschied zur PDF-Rechnung: was die Formate leisten, wer welches verlangt und welches Format für Ihren Handwerksbetrieb passt. |
| `/blog/zahlungserinnerung-mahnung-handwerk` | Zahlungserinnerung Muster und Ablauf \| CraftOS | Zahlungserinnerung und Mahnung: offene Rechnungen nachfassen | Zahlungserinnerung mit Muster und klarem Ablauf: offene Rechnungen im Handwerk freundlich, aber konsequent nachfassen – bis zur Mahnung mit Frist. |
| `/hilfe/abnahme-dokumentieren` | Bauabnahme-Protokoll in CraftOS erstellen \| CraftOS | Eine Abnahme mit Prüfpunkten dokumentieren | Bauabnahme-Protokoll in CraftOS: Prüfpunkte festhalten, Ergebnis und Vorbehalte dokumentieren und die Abnahme mobil unterschreiben lassen. |
| `/hilfe/abschlagsrechnung-erstellen` | Abschlagsrechnung Muster und Anleitung \| CraftOS | Eine Abschlagsrechnung aus dem Projekt erstellen | Abschlagsrechnung mit Muster erstellen: so legen Sie in CraftOS eine Abschlagsrechnung aus dem Projekt an, prüfen Beträge und stellen sie fertig. |
| `/hilfe/angebot-entwurf-anlegen` | Angebot erstellen: Entwurf anlegen \| CraftOS | Einen Angebotsentwurf anlegen | Angebot erstellen in CraftOS: Entwurf anlegen, Kunde und Projekt wählen, Positionen ergänzen und das Angebot vor dem Versand gründlich prüfen. |
| `/hilfe/angebot-in-rechnung-uebernehmen` | Handwerker-Angebot in Rechnung stellen \| CraftOS | Ein Angebot in eine Rechnung übernehmen | Handwerker-Angebot in Rechnung stellen: Positionen aus dem angenommenen Angebot übernehmen, Mengen anpassen und die Rechnung in CraftOS fertigstellen. |
| `/hilfe/angebotspositionen-leistungsvorlagen` | Leistungsverzeichnis-Vorlage für Angebote \| CraftOS | Angebotspositionen und Leistungsvorlagen verwenden | Leistungsverzeichnis-Vorlage in CraftOS: wiederkehrende Angebotspositionen als Leistungsvorlagen speichern und in neuen Angeboten schnell wiederverwenden. |
| `/hilfe/artikel-stammdaten-anlegen` | Artikelstammdaten anlegen \| CraftOS | Einen Artikel in den Stammdaten anlegen | Artikelstammdaten in CraftOS anlegen: Bezeichnung, Einheit, Einkaufs- und Verkaufspreis sowie Lagerangaben pflegen, damit Angebote und Lager stimmen. |
| `/hilfe/bautagesbericht-erstellen` | Bautagesbericht Vorlage und Anleitung \| CraftOS | Einen Bautagesbericht erstellen | Bautagesbericht mit Vorlage in CraftOS erstellen: Leistungen, Team und Besonderheiten erfassen und den Bericht mobil unterschreiben lassen. |
| `/hilfe/beleg-kontieren-zuordnen` | Beleg kontieren und Projekten zuordnen \| CraftOS | Einen Beleg kontieren und zuordnen | Beleg kontieren in CraftOS: Konto und Steuersatz prüfen, Ausgaben einem Projekt zuordnen und den Beleg für Buchhaltung und DATEV-Export vorbereiten. |
| `/hilfe/beleg-scannen-pruefen` | Beleg hochladen, auslesen und prüfen \| CraftOS | Einen Beleg hochladen und prüfen | Beleg hochladen oder scannen: wie CraftOS Angaben ausliest, welche Felder Sie vor dem Speichern prüfen sollten und wie Sie Fehler korrigieren. |
| `/hilfe/craft-ai-betriebsdaten-fragen` | KI Fragen stellen zu Betriebsdaten \| CraftOS | Craft AI zu Ihren Betriebsdaten befragen | KI Fragen stellen zu Ihren Betriebsdaten: wie Sie Craft AI zu Projekten, Rechnungen und Zeiten befragen und Antworten mit den Quelldaten abgleichen. |
| `/hilfe/datev-export-erstellen` | DATEV-Export für die Steuerkanzlei \| CraftOS | Einen DATEV-Export erstellen | DATEV-Export in CraftOS erstellen: Zeitraum wählen, Belege prüfen und die Exportdatei mit Belegbezug an Ihre Steuerkanzlei übergeben. |
| `/hilfe/e-rechnung-herunterladen` | ZUGFeRD-Rechnung erstellen und laden \| CraftOS | Eine XRechnung oder ZUGFeRD-Rechnung herunterladen | ZUGFeRD-Rechnung erstellen und herunterladen: so laden Sie in CraftOS eine fertiggestellte Rechnung als ZUGFeRD oder XRechnung für Ihren Kunden herunter. |
| `/hilfe/firmenprofil-einrichten` | Briefpapier Rechnung und Firmenprofil einrichten \| CraftOS | Firmenprofil und Rechnungsgrundlagen einrichten | Firmenprofil einrichten: Logo, Briefpapier für Rechnung und Angebot, Bankverbindung und Steuerangaben in CraftOS einmal hinterlegen und überall nutzen. |
| `/hilfe/gaeb-importieren` | GAEB-Datei öffnen und importieren \| CraftOS | Ein GAEB-Leistungsverzeichnis importieren | GAEB-Datei öffnen und als Angebot importieren: so übernehmen Sie ein GAEB-Leistungsverzeichnis in CraftOS und prüfen Positionen, Mengen und Einheiten. |
| `/hilfe/inventur-durchfuehren` | Inventur Lager durchführen und buchen \| CraftOS | Eine Inventur durchführen | Inventur im Lager mit CraftOS: Bestände zählen, Differenzen nachvollziehbar buchen und die Bestände nach der Inventur sauber dokumentieren. |
| `/hilfe/kunden-ansprechpartner-anlegen` | Kundenverwaltung: Kunden anlegen \| CraftOS | Kunden und Ansprechpartner anlegen | Kundenverwaltung in CraftOS: Kunden und Ansprechpartner anlegen, Adressen und Kontaktdaten pflegen und Kunden direkt mit Projekten verbinden. |
| `/hilfe/lagerorte-lagerplaetze-einrichten` | Lagerplatzverwaltung: Lagerorte einrichten \| CraftOS | Lagerorte und Lagerplätze einrichten | Lagerplatzverwaltung in CraftOS: Lagerorte und Lagerplätze übersichtlich anlegen, damit Bestände und Entnahmen eindeutig zugeordnet sind. |
| `/hilfe/mangel-erfassen-bearbeiten` | Mängelliste: Mangel erfassen und prüfen \| CraftOS | Einen Mangel erfassen und bearbeiten | Mängelliste in CraftOS führen: Mangel mit Foto und Ort erfassen, Zuständigkeit und Frist festlegen und die Behebung bis zur Prüfung nachverfolgen. |
| `/hilfe/material-entnehmen-zurueckbuchen` | Materialentnahmeschein digital buchen \| CraftOS | Material entnehmen und zurückbuchen | Materialentnahmeschein digital: Material für einen Auftrag aus dem Lager entnehmen, Rückgaben buchen und die Kosten dem Projekt zuordnen. |
| `/hilfe/mobile-offline-synchronisierung` | Offline-Synchronisierung der Mobile-App \| CraftOS | Offline- und Synchronisierungsstatus verstehen | Offline-Synchronisierung der CraftOS Mobile-App: was ohne Netz gespeichert wird, wie Sie den Status erkennen und offene Änderungen sicher übertragen. |
| `/hilfe/mobilen-timer-bedienen` | Stempeluhr-App: Timer starten und stoppen \| CraftOS | Den Timer in der Mobile-App bedienen | Die Stempeluhr-App in CraftOS: Timer starten, Projekt zuordnen und wieder stoppen – so landen Ihre Arbeitszeiten direkt beim richtigen Auftrag. |
| `/hilfe/plantafel-einsatz-planen` | Einsatzplanung auf der Plantafel \| CraftOS | Einen Einsatz auf der Plantafel planen | Einsatzplanung auf der Plantafel: so planen oder verschieben Sie einen Einsatz in CraftOS und Ihr Team sieht die Änderung sofort in der Mobile-App. |
| `/hilfe/planung-mitarbeiter-ressourcen` | Ressourcenplanung: Team, Fahrzeuge, Geräte \| CraftOS | Mitarbeiter, Fahrzeuge und Geräte zuordnen | Ressourcenplanung in CraftOS: Mitarbeiter, Fahrzeuge und Geräte einem Einsatz zuordnen, Überschneidungen erkennen und Kapazitäten realistisch planen. |
| `/hilfe/position-tiefenkalkulieren` | Preise kalkulieren: Position im Detail \| CraftOS | Eine Angebotsposition detailliert kalkulieren | Preise kalkulieren je Position: Material, Lohnzeit, Geräte und Zuschläge in CraftOS erfassen und den Einheitspreis nachvollziehbar berechnen. |
| `/hilfe/projekt-phasen-anlegen` | Bauphasen im Projekt anlegen \| CraftOS | Ein Projekt mit Bauphasen anlegen | Bauphasen (Arbeitsabschnitte) im Projekt anlegen: Phasen benennen, Zeiträume setzen und Aufgaben zuordnen, damit Planung und Abrechnung zusammenpassen. |
| `/hilfe/projektdateien-ordner` | Ordnerstruktur Projekte: Dateien ablegen \| CraftOS | Projektdateien in Ordnern ablegen | Ordnerstruktur für Projekte in CraftOS: Pläne, Fotos und Dokumente in Ordnern ablegen, sinnvoll benennen und auf der Baustelle schnell wiederfinden. |
| `/hilfe/raumaufmass-angebot-uebernehmen` | Aufmaß Raum erfassen und übernehmen \| CraftOS | Raumaufmaß erfassen und ins Angebot übernehmen | Aufmaß je Raum erfassen: Boden-, Wand- und Deckenflächen mit Abzügen in CraftOS aufnehmen und als geprüfte Angebotspositionen übernehmen. |
| `/hilfe/rechnung-fertigstellen` | Rechnung korrigieren und fertigstellen \| CraftOS | Eine Rechnung prüfen und fertigstellen | Rechnung korrigieren, solange sie ein Entwurf ist: in CraftOS Angaben prüfen, Fehler beheben und die Rechnung danach GoBD-gerecht fertigstellen. |
| `/hilfe/rechnung-stornieren` | Storno-Rechnung: Rechnung stornieren \| CraftOS | Eine fertige Rechnung nachvollziehbar stornieren | Storno-Rechnung in CraftOS erstellen: eine fertiggestellte Rechnung nachvollziehbar stornieren, Gründe dokumentieren und bei Bedarf neu abrechnen. |
| `/hilfe/rollen-zugriffsrechte-einstellen` | Zugriffsrechte und Rollen einstellen \| CraftOS | Rollen und Zugriffsrechte einstellen | Zugriffsrechte in CraftOS einstellen: Rollen für Büro und Baustelle vergeben und festlegen, wer Preise, Rechnungen und Auswertungen sehen darf. |
| `/hilfe/schlussrechnung-erstellen` | Schlussrechnung Muster und Anleitung \| CraftOS | Eine Schlussrechnung mit Abschlägen erstellen | Schlussrechnung mit Muster: so erstellen Sie in CraftOS eine Schlussrechnung, verrechnen bisherige Abschlagsrechnungen und prüfen die Restforderung. |
| `/hilfe/urlaub-beantragen-bearbeiten` | Urlaub beantragen per App \| CraftOS | Urlaub beantragen und Anträge bearbeiten | Urlaub beantragen per App: Mitarbeitende stellen Anträge in der Mobile-App, das Büro genehmigt sie und die Plantafel berücksichtigt die Abwesenheit. |
| `/hilfe/wareneingang-buchen` | Wareneingang buchen ins Lager \| CraftOS | Einen Wareneingang ins Lager buchen | Wareneingang buchen in CraftOS: gelieferte Artikel prüfen, Mengen und Lagerort erfassen und den Lagerbestand nachvollziehbar aktualisieren. |
| `/hilfe/zahlungen-erfassen` | Zahlungseingang zur Rechnung erfassen \| CraftOS | Eine Zahlung zu einer Rechnung erfassen | Zahlungseingang erfassen: in CraftOS Teil- und Vollzahlungen einer Rechnung zuordnen, Zahlungsdatum festhalten und offene Posten aktuell halten. |
| `/hilfe/zeiten-pruefen-exportieren` | Stundenzettel Excel: Zeiten exportieren \| CraftOS | Zeiten prüfen und exportieren | Stundenzettel als Excel oder CSV: Arbeitszeiten in CraftOS prüfen, nach Mitarbeiter oder Projekt filtern und für Lohnabrechnung und Auswertung exportieren. |
| `/vergleich/plancraft-alternative` | plancraft-Alternative: CraftOS im Vergleich \| CraftOS | Die plancraft-Alternative für Büro und Baustelle | plancraft-Alternative gesucht? CraftOS im sachlichen Vergleich: Funktionen, Mobile-App, E-Rechnung und Preise mit Quellen und Prüfdatum gegenübergestellt. |
| `/vergleich/craftnote-alternative` | Craftnote-Alternative: CraftOS im Vergleich \| CraftOS | Die Craftnote-Alternative mit Angebot und Rechnung | Craftnote-Alternative gesucht? CraftOS im Vergleich: Baustellendoku, Angebote, Rechnungen und Preise mit Quellen und Prüfdatum gegenübergestellt. |
| `/vergleich/hero-alternative` | HERO Software Alternative: CraftOS \| CraftOS | Die HERO-Software-Alternative im Vergleich | HERO Software Alternative gesucht? CraftOS im Vergleich: Funktionen, Mobile-App, Lizenzen und Preise mit Quellen und Prüfdatum gegenübergestellt. |
| `/vergleich/tooltime-alternative` | ToolTime oder CraftOS? Der Vergleich \| CraftOS | ToolTime-Alternative: CraftOS im Vergleich | ToolTime oder CraftOS? Der sachliche Vergleich von Funktionen, Mobile-App, E-Rechnung und Preisen – mit Quellen, Prüfdatum und Hinweisen zum Umstieg. |
| `/funktionen/gaeb` | GAEB-Software: Import, Export, DATANORM \| CraftOS | GAEB-Software für Ausschreibung und Angebot | GAEB-Software in CraftOS: Leistungsverzeichnisse importieren, Angebote kalkulieren und als GAEB exportieren sowie Artikel per DATANORM übernehmen. |
| `/funktionen/mahnwesen` | Mahnwesen-Software für Handwerker \| CraftOS | Mahnwesen: offene Rechnungen konsequent nachfassen | Mahnwesen-Software für Handwerker: Zahlungserinnerungen und Mahnstufen einstellen, Mahnhistorie je Rechnung sehen und offene Posten im Blick behalten. |
| `/funktionen/terminplanung` | Bauzeitenplan-Software mit Bauphasen \| CraftOS | Terminplanung mit Bauphasen und Abhängigkeiten | Bauzeitenplan-Software in CraftOS: Bauphasen und Arbeitsabschnitte im Gantt-Plan terminieren, Abhängigkeiten setzen und mit der Plantafel verbinden. |
| `/funktionen/bankabgleich` | Zahlungsabgleich mit Bankumsätzen \| CraftOS | Bankabgleich: Zahlungen automatisch zuordnen | Zahlungsabgleich in CraftOS: Bankumsätze einlesen, Zahlungseingänge Rechnungen zuordnen und Ausgaben mit Eingangsrechnungen abgleichen. |
| `/funktionen/datenuebernahme` | Datenimport beim Umstieg auf CraftOS \| CraftOS | Datenübernahme beim Umstieg auf CraftOS | Datenimport beim Wechsel zu CraftOS: vorhandene Stammdaten aus Ihrer bisherigen Software übernehmen und vor dem Start des Echtbetriebs in Ruhe prüfen. |
| `/funktionen/maengelmanagement` | Mängelmanagement für Handwerk und Bau \| CraftOS | Mängelmanagement von der Erfassung bis zur Prüfung | Mängelmanagement in CraftOS: Mängel mit Foto und Ort erfassen, Fristen und Zuständige festlegen und die Behebung bis zur Abnahme lückenlos nachverfolgen. |
| `/hilfe/leistungszeitraum-rechnung` | Leistungszeitraum Rechnung: richtig angeben \| CraftOS | Leistungszeitraum und Leistungsdatum auf der Rechnung | Leistungszeitraum auf der Rechnung richtig angeben: wann ein Leistungsdatum genügt, wann ein Zeitraum nötig ist und welche Pflichtangaben gelten. |
| `/hilfe/regiebericht` | Regiebericht: Vorlage und Abrechnung \| CraftOS | Regiebericht schreiben und abrechnen | Regiebericht im Handwerk: Stundenlohnarbeiten und Material nachvollziehbar dokumentieren, vom Auftraggeber bestätigen lassen und sauber abrechnen. |
| `/hilfe/bedenkenanzeige` | Bedenkenanzeige nach VOB: Muster und Ablauf \| CraftOS | Bedenkenanzeige schreiben und dokumentieren | Bedenkenanzeige nach VOB/B: wann Handwerker sie schreiben sollten, was hineingehört und wie Sie Versand und Antwort im Projekt dokumentieren. |
| `/blog/maengelanzeige` | Mängelanzeige im Handwerk: Fristen und Ablauf \| CraftOS | Mängelanzeige: richtig reagieren als Handwerksbetrieb | Mängelanzeige erhalten oder schreiben: Fristen nach BGB und VOB, notwendige Inhalte und wie Handwerksbetriebe Mängel nachvollziehbar dokumentieren. |
| `/blog/reverse-charge-bauleistungen` | Reverse Charge Rechnungsstellung am Bau \| CraftOS | Reverse Charge bei Bauleistungen richtig abrechnen | Reverse-Charge-Rechnungsstellung bei Bauleistungen nach § 13b UStG: wann sie gilt, welche Angaben auf die Rechnung gehören und typische Fehler. |
| `/blog/materialliste-vorlage` | Materialliste-Vorlage für die Baustelle \| CraftOS | Materialliste für Baustelle und Auftrag erstellen | Materialliste-Vorlage fürs Handwerk: welche Angaben hineingehören, wie Sie Mengen aus dem Angebot ableiten und Entnahmen später dem Projekt zuordnen. |
| `/blog/gaeb-formate` | GAEB-Formate erklärt: X81 bis X86 \| CraftOS | GAEB-Formate verstehen: welche Datei wofür? | GAEB-Formate einfach erklärt: was X81, X83, X84 und X86 bedeuten, welche Phase der Ausschreibung sie abbilden und wie Sie GAEB-Dateien öffnen. |
| `/blog/bauablaufplan` | Bauablaufplan erstellen: Phasen und Termine \| CraftOS | Bauablaufplan und Bauzeitenplan erstellen | Bauablaufplan erstellen: Bauphasen festlegen, Abhängigkeiten und Puffer planen und den Bauzeitenplan im Handwerksbetrieb aktuell halten. |
| `/blog/arbeitszeitnachweis-vorlage` | Arbeitszeitnachweis-Vorlagen fürs Handwerk \| CraftOS | Arbeitszeitnachweis: Vorlage oder App? | Arbeitszeitnachweis-Vorlagen im Handwerk: welche Angaben Pflicht sind, wann Papier reicht und wie eine App den Nachweis mit Projektbezug erstellt. |
