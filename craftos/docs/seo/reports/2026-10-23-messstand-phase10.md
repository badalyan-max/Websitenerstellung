# SE-Ranking-Messstand Phase 10 – craftos.eu (vorgezogen, 23.10.2026)

Quelle: SE Ranking über den MCP-Client `scripts/lib/se-ranking-mcp.mjs` (Data API und Project API), Abruf 23.10.2026 zwischen 08:34 und 08:42 UTC, Projekt 13094375, Google Deutschland. Vorgezogen aus Phase 10 (Paket e, D-26 bis D-29), weil das Unit-Kontingent knapp ist. Vergleichsbasis ist der Ausgangsstand vom 20.10.2026 (`docs/seo/SE-RANKING-BEFUND-2026-10-20.md`, `data/2026-10-20-*.json`) und, wo dort nichts gesichert wurde, der jeweils erste Projektmesstag.

Rohdaten:

| Datei | Inhalt |
|---|---|
| `data/2026-10-23-verbrauch-phase10.json` | Block 1: Projekteinstellungen, Suchmaschinen, LLM-Engines und deren Prüfstatus, Prompt-Gruppen, Audit-Liste, Prüftermine |
| `data/2026-10-23-units-verlauf-phase10.json` | Kontostände dieser Sitzung und aller bisherigen Messberichte, Kostentabelle laut SE-Ranking-Doku, Unit-Verbrauch je Block |
| `data/2026-10-23-audit-report-phase10.json` | Block 2: Status und vollständiger Bericht des Website-Audits 485185 |
| `data/2026-10-23-audit-issues-phase10.json` | Block 2: betroffene URLs je beanstandetem Prüfpunkt |
| `data/2026-10-23-projekt-messstand-phase10.json` | Block 3a: 157 Keywords, Positionen 20.–23.10., Projektübersicht, KI-Tracker-Statistik je Engine, KI-Quellenübersicht |
| `data/2026-10-23-ki-prompts-phase10.json` | Block 3a: Prompts je Engine und die in jeder KI-Antwort genannten Marken und zitierten Quellen (20.–23.10.) |
| `data/2026-10-23-data-messstand-phase10.json` | Block 3b: Backlink-Zusammenfassung, verweisende Domains, Domain-Overview DE |

## 1. Ergebnis in Kürze

- **Units:** 18.597 vor der Messung, 18.071 danach; verbraucht 526 Units (Audit 314, Data-API-Abrufe 212) bei einem Budget von 4.000.
- **Verbrauchsursache:** Nicht die tägliche Projektmessung, sondern der KI-Leaderboard-Abruf `DATA_getAiSearchLeaderboard` in `scripts/seo-report.mjs`. Er kostet laut SE-Ranking-Doku pauschal 7.500 Units je Aufruf; jeder Etappenbericht kostete damit 7.612 Units. Die Projektmessung (Positionen und KI-Tracker) belastet das Data-API-Guthaben nicht.
- **Website-Audit:** 157 Seiten, Wert 97/100 (Ausgangsstand 96), 0 Fehler, 13 Warnungen (alle „Alt-Text fehlt“), 11 Hinweise.
- **Positionen:** 2 Keywords in den Top 10 (beide Marke, unverändert), 6 in den Top 100 (Ausgangsstand 5). Neu: „shk software“ auf Platz 29 mit `/gewerke/shk`. Keins der generischen Hauptkeywords rankt.
- **KI-Sichtbarkeit:** ChatGPT nennt CraftOS am 23.10. in 1 von 16 Antworten, und zwar nur bei der Markenfrage „Was ist CraftOS?“. Google AI Overview: 0 von 2. Perplexity, Gemini und AI Mode liefern keine Daten.
- **Backlinks:** Wie am Ausgangsstand 12 verweisende Domains, alle Spam, Domain-InLink-Rank 3.

## 2. Unit-Verbrauch je Block

| Block | Inhalt | Kontostand vorher | Kontostand nachher | Verbrauch |
|---|---|---|---|---|
| Start | `DATA_getSubscription` 08:34:54 UTC | – | 18.597 | – |
| 1 | Verbrauchsanalyse, nur lesend (13 Project-/Listen-Abrufe) | 18.597 | 18.597 | 0 |
| 2 | Standard-Audit 485185 anlegen, Status, Bericht, betroffene URLs | 18.597 | 18.283 | 314 (157 Seiten × 2) |
| 3a | Positionen, Projektübersicht, KI-Tracker je Engine, Prompts, Marken je Antwort | 18.283 | 18.283 | 0 |
| 3b | Backlink-Zusammenfassung (100), verweisende Domains (12 Zeilen × 1), Domain-Overview DE (100) | 18.283 | 18.071 | 212 |
| Ende | `DATA_getSubscription` 08:41:57 UTC | – | 18.071 | **Summe 526** |

SE Ranking bucht die Kosten mit einer Verzögerung von etwa 10 bis 60 Sekunden; das Audit wird erst nach Abschluss des Crawls nach der tatsächlichen Seitenzahl abgerechnet. Deshalb zeigte der Nachher-Wert eines Blocks teilweise erst im folgenden Block die Abbuchung (Audit sichtbar um 08:38:28, Data-Abrufe um 08:40:37). Die Tabelle ordnet die Beträge dem verursachenden Block zu. Zwischen den Blöcken gab es keine weitere Abbuchung.

## 3. Verbrauchsanalyse und Empfehlung

### 3.1 Was verbraucht die Units?

**Antwort:** Fast der gesamte Verbrauch seit dem 21.10. stammt aus dem Leaderboard-Abruf in `seo-report.mjs` (7.500 Units je Lauf). Positionsprüfung, KI-Tracker, Audits und laufende Abfragen verbrauchen täglich keine Data-Units.

**Beleg 1: Kostentabelle von SE Ranking** (https://seranking.com/api/data/getting-started/, Abschnitt „Endpoint credit costs“, und https://seranking.com/api/data/ai-search/, abgerufen am 23.10.2026):

| Endpunkt (MCP-Tool) | Kosten |
|---|---|
| `ai-search POST overview/leaderboard` (`DATA_getAiSearchLeaderboard`) | **7.500 je Anfrage, pauschal** |
| `ai-search GET overview/by-engine/time-series` | 800 je Anfrage |
| `ai-search GET prompts-by-target` / `prompts-by-brand` | 200 je Datensatz |
| `backlinks GET summary` (`DATA_getBacklinksSummary`) | 100 je Ziel |
| `backlinks GET refdomains` (`DATA_getBacklinksRefDomains`) | 1 je Datensatz |
| `domain GET overview/db` (`DATA_getDomainOverviewByCountry`) | 100 je Anfrage |
| `audit POST audits/standard` bzw. `recheck/standard` | 2 je Seite |
| Audit-Status, -Bericht, -Liste, betroffene URLs; `account GET subscription` | 0 |

`seo-report.mjs` ruft je Lauf Leaderboard (7.500), Backlink-Zusammenfassung (100) und verweisende Domains (12 Zeilen × 1 = 12) ab; das ergibt **7.612 Units**. Die Project-API-Abrufe des Skripts (`PROJECT_listKeywords`, `PROJECT_getSearchEngines`, `PROJECT_getKeywordStats`) kosten keine Data-Units.

**Beleg 2: Die Kontostände der Messberichte fallen in Schritten von genau 7.612 Units, und zwar je Lauf, nicht je Tag:**

| Messbericht | Commit-Zeit | Kontostand (vorher = nachher im Bericht) | Abstand zum vorherigen Bericht |
|---|---|---|---|
| Ausgangsstand | 21.10. 00:54 | 65.259 | – |
| Rollout Phase 5 | 21.10. 01:47 | 57.647 | −7.612 innerhalb von 53 Minuten |
| Rollout Phase 6 | 21.10. 17:12 | 50.035 | −7.612 |
| Rollout Phase 7 | 22.10. 14:09 | 42.423 | −7.612 (über eine Tagesgrenze, kein Zuschlag) |
| Rollout Phase 8 | 23.10. 01:18 | 33.921 | −8.502 (7.612 plus 890 aus den separaten Keyword- und SERP-Abfragen der Phase 8) |
| Rollout Phase 9 | 23.10. 09:45 | 26.209 | −7.712 (7.612 plus 100 aus einer weiteren Keyword-Metrikabfrage) |
| Diese Messung, Start | 23.10. 10:34 MESZ | 18.597 | −7.612 innerhalb von etwa 45 Minuten nach dem Phase-9-Lauf |

Jeder Abstand enthält genau einen vorherigen Lauf von `seo-report.mjs`. Die Berichte zeigten „verbrauchte Units: 0“, weil der Nachher-Wert sofort nach dem Leaderboard gelesen wurde und die Buchung erst Sekunden später folgte (siehe § 2). Ein Tagesverbrauch durch die Projektmessung müsste in den Abständen über eine Tagesgrenze (Phase 6 nach 7) als Zuschlag erscheinen; dort steht genau 7.612. Die Annahme in D-27 („ca. 7.700 Units je Tag durch die tägliche Projektmessung“) ist damit widerlegt. Die tatsächliche Ursache sind 6 Leaderboard-Abrufe zu je 7.500 Units, zusammen 45.000 Units oder 45 % des gesamten Testkontingents.

**Beleg 3: Das Leaderboard liefert seit dem 20.10. dasselbe Ergebnis.** Die SE-Ranking-Doku nennt für AI Search eine monatliche Aktualisierung („Data is refreshed on a monthly basis“). Der Eintrag für craftos.eu ist am 20.10. (`data/2026-10-20-ai-leaderboard.json`) und am 23.10. (`reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json`) identisch: Rang 8, Share of Voice 0,0002 (0,02 %), Markennennungen 1, Linkzitate 1. Die fünf Wiederholungen haben 37.500 Units gekostet und keine neue Information gebracht.

**Beleg 4: Die Project API belastet das Data-Guthaben nicht.** Die SE-Ranking-Doku (https://seranking.com/api/project/getting-started/) sagt: „Project API requests use your subscription limits, while Data API requests draw on your credit balance.“ In dieser Sitzung kosteten 35 Project-Abrufe, darunter 157 Keyword-Verläufe und alle KI-Antworten, 0 Units. Die Projekt-Einstellungen im Einzelnen (`data/2026-10-23-verbrauch-phase10.json`):

| Prüfpunkt | Stand | Wirkung auf Data-Units |
|---|---|---|
| Positionsprüfung | `check_freq: check_daily`, 157 Keywords, Tiefe 100, Google DE; Prüftage 20.–23.10. vorhanden | 0 (Abo-Limit des Projekts) |
| KI-Tracker ChatGPT (203632) | 16 Prompts, täglich geprüft, letzte Prüfung 23.10. | 0 |
| KI-Tracker Google AI Overview (204133) | 2 Prompts, letzte Prüfung 22.10., Fortschritt 0 % | 0 |
| KI-Tracker Perplexity (204127) | 2 Prompts, noch nie geprüft | 0 |
| KI-Tracker Gemini (204130), AI Mode (204136) | 0 Prompts | 0 |
| Laufende Audits | nur das Projekt-Audit 479500 vom 20.10. (abgeschlossen) und das neue Audit 485185 (abgeschlossen) | 0 (Audits kosten nur beim Start bzw. Recheck) |
| Laufende Data-API-Abfragen | keine; das Konto hat nur Abrufe, keine Daueraufträge | 0 |

Kontrollen des Kontostands ohne kostenpflichtige Abrufe (08:40:37 bis 08:44:32 UTC) blieben unverändert bei 18.071.

### 3.2 Optionen bis zum 03.11.2026

Restkontingent: 18.071 Units. Bei unverändertem Vorgehen fallen Units nur an, wenn jemand Data-API-Abrufe auslöst. Das Kontingent ist also nicht „am 26./27.10. aufgebraucht“, solange niemand weitere Leaderboard-Abrufe startet.

| Option | Was ändert sich | Unit-Wirkung | Bewertung |
|---|---|---|---|
| A. Leaderboard nicht mehr je Etappenbericht abrufen (Skriptänderung in `seo-report.mjs`, z. B. Schalter `--ohne-leaderboard`, oder letzten Wert aus der Rohdatei übernehmen) | Etappenbericht kostet 112 statt 7.612 Units | **−7.500 je Lauf** | Empfohlen. Die Daten ändern sich nur monatlich; die Share of Voice je Engine liefert der KI-Tracker des Projekts ohne Kosten (§ 5). |
| B. Leaderboard genau einmal für den Abschlussbericht abrufen, frühestens wenn SE Ranking die Novemberdaten bereitstellt (Prüfung am 01.–03.11.) | Ein Endwert für die Vergleichstabelle | 7.500 einmalig | Optional. Nur sinnvoll, wenn die Monatsdaten neu sind; sonst steht im Bericht der Wert vom 23.10. mit Datum. |
| C. Positionsprüfung von täglich auf wöchentlich (`check_freq`) | weniger Messpunkte | **0 Data-Units** | Nicht nötig, spart keine Units. Würde den Abschlussbericht um tägliche Werte bringen. |
| D. KI-Tracker pausieren oder Engines entfernen | weniger KI-Daten | **0 Data-Units** | Nicht nötig. Der Tracker ist die einzige kostenlose KI-Messung. |
| E. Audit-Recheck vor dem Rollout | Bestätigungsaudit für QA-06 | ca. 314 je Lauf (2 × 157 Seiten) | Vertretbar; einmal nach dem Rollout reicht. |
| F. Backlinks und Domain-Overview je Etappe | Refdomains, InLink Rank, DE-Overview | 212 je Lauf | Vertretbar. |

**Empfehlung:** Option A umsetzen, bevor `seo-report.mjs` erneut läuft (Entscheidung des Orchestrators, die Skriptänderung liegt im Besitz von Paket e). Die Projekteinstellungen (täglich, KI-Tracker) unverändert lassen. Für den Rollout 10-07 reichen damit Audit-Recheck (≈ 314), Backlinks und Domain-Overview (212) und Etappenbericht ohne Leaderboard (112), zusammen etwa 640 Units. Danach bleiben rund 17.400 Units, genug für Option B (7.500) und Reserve. Ohne Option A kostet jeder weitere Etappen- oder Abschlussbericht 7.612 Units; das Kontingent reicht dann für höchstens zwei Läufe.

Hinweis für D-27 und die offenen Punkte (Nr. 39): Die Ursache ist der Leaderboard-Abruf, nicht die tägliche Projektmessung. Eine Änderung der Prüfhäufigkeit im SE-Ranking-Projekt ist für das Unit-Budget nicht erforderlich.

Nebenbefund: Die KI-Tracker-Engines Perplexity (2 Prompts) und Google AI Overview (2 Prompts) zeigen Fortschritt 0 %; Perplexity wurde seit dem 20.10. nie geprüft, AI Overview zuletzt am 22.10. Gemini und AI Mode haben keine Prompts. Das liegt an den Projekt- bzw. Testlimits, nicht an den Data-Units. Eine Änderung ist nicht Teil dieses Auftrags.

## 4. Website-Audit (Standard-Audit 485185)

Einstellungen: Data API `DATA_createStandardAudit`, Domain `craftos.eu`, Sitemap und interne Links (`source_sitemap: 1`, `source_site: 1`), robots.txt beachten, höchstens 250 Seiten, Standardgrenzen für Title (20–65 Zeichen) und Description (bis 158 Zeichen). Gestartet 08:37:40 UTC, fertig 08:38:19 UTC. Die Sitemap enthält 156 URLs; gecrawlt wurden 157 Seiten. Kosten 314 Units.

| Kennzahl | Ausgangsstand 20.10.2026 (Audit 479500) | 23.10.2026 (Audit 485185) | Veränderung |
|---|---|---|---|
| Gecrawlte Seiten | 126 | 157 | +31 |
| Gesamtwert | 96/100 | 97/100 | +1 |
| Fehler | 0 | 0 | 0 |
| Warnungen | 14 | 13 | −1 |
| Hinweise | 60 | 11 | −49 |
| Domain Trust laut Audit | – | 3 | – |
| Indexierte Seiten (Google, laut Audit) | – | 62 | – |

**Befunde nach Typ:**

| Typ | Prüfpunkt | Anzahl 20.10. | Anzahl 23.10. | Betroffene URLs (23.10.) |
|---|---|---|---|---|
| Warnung | Alt-Text fehlt (`image_no_alt`) | 14 | 13 | `/gewerke` und die 12 Gewerkseiten (`/gewerke/elektriker`, `shk`, `maler`, `tischler-schreiner`, `dachdecker`, `fliesenleger`, `zimmerer`, `galabau`, `trockenbau`, `metallbau`, `bauunternehmen`, `allrounder`) |
| Hinweis | Title zu lang | 34 | 0 | – |
| Hinweis | Title zu kurz (`title_short`) | 1 | 1 | `/impressum` („Impressum \| CraftOS“, 18 Zeichen) |
| Hinweis | Meta-Description zu lang | 4 | 0 | – |
| Hinweis | Doppelter H1-Tag | 2 | 0 | – |
| Hinweis | JavaScript nicht komprimiert | 18 | 0 | – |
| Hinweis | Externer Link auf 3XX (`extlinks3xx`) | 1 | 1 | `/impressum` |
| Hinweis | Title und H1 identisch (`same_title_h1`) | – | 1 | `/hilfe/mitarbeiter-einladen-lizenz-zuweisen` |
| Hinweis | Externe nofollow-Links (`extlinks_nofollow`) | – | 8 | `/gobd`, `/vergleich`, `/preise`, `/vergleich/plancraft-alternative`, `/vergleich/craftnote-alternative`, `/vergleich/hero-alternative`, `/vergleich/tooltime-alternative`, `/vergleich/handwerkersoftware-kleine-betriebe` |

Alle Prüfpunkte zu Sicherheit, Crawling, Weiterleitungen, Sitemap, Canonical, hreflang, Ladezeit, JavaScript, CSS und Mobilgeräten sind ohne Befund.

**Top-Befunde und Einordnung:**

1. **13 × „Alt-Text fehlt“:** Auf jeder Gewerkseite und auf `/gewerke` hat das Gewerk-Symbol (`/icons/gewerke/<gewerk>.svg`) ein leeres `alt=""`. Für ein rein dekoratives Symbol neben einer Überschrift ist das nach WCAG richtig; SE Ranking zählt leere Alt-Texte trotzdem als Warnung. Für „0 offene Warnungen“ im Bestätigungsaudit (QA-06) müsste das Symbol einen kurzen Alt-Text bekommen (z. B. „Symbol Elektriker“) oder die Warnung im Abschlussbericht als begründete Ausnahme stehen. Entscheidung durch Paket a (Barrierefreiheit) bzw. den Orchestrator.
2. **Externer 3XX-Link auf `/impressum`:** `https://ec.europa.eu/consumers/odr` antwortet mit 301. Die EU-Plattform zur Online-Streitbeilegung wurde am 20.07.2025 eingestellt; der Hinweis samt Link ist rechtlich vermutlich entbehrlich. Fachliche Freigabe durch den Inhaber nötig, da Rechtstext.
3. **Title `/impressum` zu kurz** (18 statt mindestens 20 Zeichen) und **Title gleich H1** auf einer Hilfeseite: reine Hinweise ohne Wirkung auf das Ranking; optional.
4. **8 externe nofollow-Links** auf Vergleichs-, Preis- und GoBD-Seiten: gewollt (Wettbewerber- und Quellenlinks), kein Handlungsbedarf.

## 5. Messstand gegen den Ausgangsstand 20.10.2026

### 5.1 Positionen (Projekt 13094375, Google DE)

Basis: `PROJECT_getKeywordStats` 20.–23.10. Am 20.10. waren erst 53 Keywords angelegt und gemessen, am 23.10. alle 157.

| Kennzahl | 20.10.2026 | 23.10.2026 | Veränderung |
|---|---|---|---|
| Gemessene Keywords | 53 | 157 | +104 |
| Top 3 | 1 | 1 | 0 |
| Top 10 | 2 | 2 | 0 |
| Top 30 | 2 | 3 | +1 |
| Top 100 | 5 | 6 | +1 |
| Sichtbarkeit laut Projektübersicht | – | 0,15 % | – |
| Domain-Overview DE: rankende Keywords | 1 (Platz 51–100) | 1 (Platz 51–100; 1 neu, 2 verloren) | 0 |
| Domain-Overview DE: geschätzter Traffic | 0 | 0 | 0 |

**Hauptkeywords (Volumen laut SE Ranking):**

| Keyword | Volumen | 20.10. | 21.10. | 22.10. | 23.10. | Zielseite |
|---|---|---|---|---|---|---|
| craftos handwerkersoftware | 0 | 1 | 1 | 1 | 1 | `/` |
| craftos | 110 | 4 | 4 | 4 | 5 | `/` |
| shk software | 210 | – | – | – | **29** | `/gewerke/shk` |
| craftview software gmbh | 110 | 58 | 57 | 58 | 57 | `/` |
| metallbau software | 140 | 58 | 61 | 58 | 59 | `/gewerke/metallbau` |
| lagerverwaltung handwerk | 20 | 78 | – | 74 | 75 | `/funktionen/lager` |
| handwerkersoftware | 1.300 | – | – | – | – | – |
| bautagebuch app | 590 | – | – | – | – | – |
| aufmaß app | 590 | – | – | – | – | – |
| handwerker software | 410 | – | – | – | – | – |
| zeiterfassung handwerk | 390 | – | – | – | – | – |
| handwerker stundensatz | 320 | – | – | – | – | – |
| baustellen app | 260 | – | – | – | – | – |
| rechnungssoftware handwerker | 210 | – | – | – | – | – |
| digitale bauakte | 170 | – | – | – | – | – |
| auftragsverwaltung software | 170 | – | – | – | – | – |
| gaeb software | 140 | – | – | – | – | – |
| maler software | 140 | – | – | – | – | – |
| trockenbau software | 140 | – | – | – | – | – |
| mobile zeiterfassung handwerker | 140 | – | – | – | – | – |

„–“ heißt: nicht unter den ersten 100 Ergebnissen. Die neuen Seiten der Phasen 5 bis 9 sind seit höchstens drei Tagen live; Google hat laut Audit 62 Seiten indexiert. Eine Bewegung bei den generischen Begriffen ist in diesem Zeitraum nicht zu erwarten.

### 5.2 KI-Sichtbarkeit

**a) Leaderboard (Data API, alle fünf Engines, Marktvergleich mit sieben Wettbewerbern):** In dieser Messung nicht erneut abgerufen, weil ein Abruf 7.500 Units kostet und damit das Budget von 4.000 Units übersteigt. Letzter Wert vom 23.10.2026 (Phase-9-Bericht), identisch mit dem 20.10.: CraftOS Rang 8 von 8, Share of Voice 0,02 %, 1 Markennennung, 1 Linkzitat. Die Daten werden monatlich aktualisiert (§ 3.1, Beleg 3).

**b) KI-Tracker des Projekts (kostenlos, eigene Prompts, Auswertung aller Antworten 20.–23.10.):**

| Engine | Prompts | Datum | Geprüfte Antworten | CraftOS genannt | craftos.eu als Quelle | Markennennungen gesamt | davon CraftOS (Anteil) |
|---|---|---|---|---|---|---|---|
| ChatGPT | 16 | 20.10. | 6 | 1 | 1 | 28 | 2 (7,1 %) |
| ChatGPT | 16 | 21.10. | 16 | 1 | 0 | 87 | 2 (2,3 %) |
| ChatGPT | 16 | 22.10. | 16 | 2 | 2 | 74 | 2 (2,7 %) |
| ChatGPT | 16 | 23.10. | 16 | 1 | 1 | 83 | 3 (3,6 %) |
| Google AI Overview | 2 | 20.10. | 2 | 0 | 0 | 15 | 0 |
| Google AI Overview | 2 | 22.10. (letzte Prüfung) | 2 | 0 | 0 | 11 | 0 |
| Perplexity | 2 | – | 0 (nie geprüft) | – | – | – | – |
| Gemini | 0 | – | – | – | – | – | – |
| Google AI Mode | 0 | – | – | – | – | – | – |

Laut `PROJECT_getLlmStatistics` (Stand 23.10.) liegt die ChatGPT-Präsenz bei 6,25 % Nennung und 6,25 % Link (1 von 16 Prompts), 10,42 Prozentpunkte unter dem Vorzeitraum. Alle anderen Engines stehen bei 0 %. Google AI Overview: 30 % organische Überschneidung (6 Keywords).

**Wo CraftOS genannt wird:**

- „Was ist CraftOS?“ (ChatGPT): an allen vier Tagen Marke auf Position 1; craftos.eu als Quelle am 20.10. (Position 1), 22.10. (5) und 23.10. (2).
- „günstige Handwerkersoftware mit App für Mitarbeiter“ (ChatGPT): einmal am 22.10., Marke auf Position 3, craftos.eu als Quelle auf Position 5. Am 23.10. nicht mehr.
- Bei allen anderen 14 ChatGPT-Prompts und beiden AI-Overview-Prompts wird CraftOS nicht genannt. Ohne die Markenfrage ist CraftOS am 23.10. in 0 von 15 Antworten vertreten.

**Wettbewerber in den KI-Antworten** (`PROJECT_getAirtSourcesSummary`, alle Engines, 20.–23.10.; Nennungen in Antworten / in zitierten Quellen): plancraft 34/32, ToolTime 32/30, HERO Software 26/18 (zusätzlich „HERO“ 12/17), Das Programm 16/10, openHandwerk 11/9, Craftboxx 11/7, Hawepro 10/6, Bosch OfficeOn 10/4, Lexware Office 9/10, STREIT V.1 7/0, Meisterwerk 6/7, **CraftOS 5/11**. Chancen laut SE Ranking: 65 Nennungschancen, 38 Antworten nur mit Wettbewerbern, 7 Nennungen ohne Backlink.

### 5.3 Backlinks und Autorität

| Kennzahl | 20.10.2026 | 23.10.2026 | Veränderung |
|---|---|---|---|
| Verweisende Domains | 12 (alle Spam) | 12 (dieselben 12 Domains) | 0 |
| Backlinks | 12 | 12 (12 dofollow, alle Textlinks, Anker „craftos.eu“) | 0 |
| Domain-InLink-Rank | 3 | 3 | 0 |
| InLink-Rank Startseite | – | 1 | – |
| Subnetze / IPs | – | 5 / 7 | – |

Die verweisenden Domains sind unverändert: webboard.pl, sport-life.club, dsnylu.com, bmwyng.com, kgzxkf.com, obmain.com, qhtycw.com, jobsapp.info, hzdlpq.com, nettools.guru, sergechel.info, australianwebdirectory.pro. Keine Domain aus dem Linkplan (`backlink-register.json`) erscheint bisher in SE Ranking. Portal- und Fachmedieneinträge brauchen erfahrungsgemäß Tage bis Wochen, bis der Backlink-Index sie erfasst.

### 5.4 Domain-Overview Deutschland

| Kennzahl | 20.10.2026 | 23.10.2026 |
|---|---|---|
| Organische Keywords | 1 | 1 |
| Davon Platz 1–10 / 11–50 / 51–100 | 0 / 0 / 1 | 0 / 0 / 1 |
| Geschätzter Traffic pro Monat | 0 | 0 |
| Neu / verloren (Monatsvergleich) | – | 1 / 2 |
| Bezahlte Anzeigen | – | keine |

Die Domain-Datenbank wird ebenfalls monatlich aktualisiert (Datensatz Oktober 2026). Die Projektmessung in § 5.1 ist deshalb die aktuellere Quelle.

## 6. Folgerungen für Paket e und Rollout 10-07

1. `seo-report.mjs` vor dem nächsten Lauf ohne Leaderboard betreiben (Option A); sonst kostet jeder Lauf 7.612 Units.
2. Bestätigungsaudit nach dem Rollout als Recheck von Audit 485185 (≈ 314 Units). Für 0 Warnungen die 13 Gewerk-Symbole klären (Alt-Text oder begründete Ausnahme) und über den ODR-Link im Impressum entscheiden.
3. Für die KI-Share-of-Voice im Abschlussbericht den kostenlosen KI-Tracker (je Engine, je Prompt) als laufende Messung verwenden und den Leaderboard-Wert mit Datum angeben; ein neuer Leaderboard-Abruf (7.500) lohnt nur nach einer Monatsaktualisierung.
4. Units-Stand nach dieser Messung: 18.071 von 100.000, Testzugang bis 03.11.2026, 17:22 Uhr.
