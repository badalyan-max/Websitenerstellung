# Abschlussbericht Meilenstein v2.0 – craftos.eu (Entwurf)

Stand des Entwurfs: 23.10.2026 (Plan 10-11, Paket e), vor dem Rollout der Phase 10. Felder mit „Endwert 10-07“ füllt der Rollout-Plan 10-07 (Lighthouse- und A11y-Endwerte nach 10-12). Vergleichsbasis ist der Ausgangsstand vom 20.10.2026 (`docs/seo/SE-RANKING-BEFUND-2026-10-20.md`, Projektstart SE Ranking) bzw. der erste Messbericht `docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`. Jede Zahl nennt Quelle und Datum. Der Bericht enthält keine Tarifempfehlung; die Entscheidung über das SE-Ranking-Konto trifft der Orchestrator vor dem 03.11.2026.

Quellen (alle im Repository, sofern nicht anders angegeben):

| Kürzel | Datei | Datum |
|---|---|---|
| Befund | `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` | 20.10.2026 |
| MB-A | `docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md` | 21.10.2026 |
| MB-05 … MB-09 | `docs/seo/reports/2026-10-2x-messbericht-rollout-phase05.md` bis `…-phase09.md` | 21.–23.10.2026 |
| MS-10 | `docs/seo/reports/2026-10-23-messstand-phase10.md` mit `docs/seo/data/2026-10-23-*-phase10.json` | 23.10.2026, 08:34–08:42 UTC |
| Audit | `craftos/audit-report.md` (Vorab-Audit nach Repo-Skill, Plan 10-05) | 23.10.2026 |
| SEO-08 | `docs/seo/data/2026-10-23-seo08-messstand-phase10.json` | 23.10.2026 |
| Events | `docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json` | 23.10.2026, 11:36 UTC |
| SI | `docs/seo/data/2026-10-23-vercel-speed-insights-phase10.json` | 23.10.2026 |
| EN | `docs/releases/ETAPPEN-NACHWEIS-V2.md` | 23.10.2026 |

## 1. Ergebnis in Kürze

- **Etappen:** Phasen 5 bis 9 sind je einzeln nach Ship-Gate live gegangen, mit IndexNow, live-check und Etappenbericht (EN). Phase 10: Endwert 10-07.
- **Positionen:** 2 Keywords in den Top 10 (beide Marke, unverändert seit 20.10.2026) und 6 in den Top 100 (20.10.2026: 5); neu „shk software“ auf Platz 29 mit `/gewerke/shk` (MS-10 § 5.1). Kein generisches Hauptkeyword rankt bisher. Endwert 10-07.
- **KI-Sichtbarkeit:** Share of Voice CraftOS 0,02 % (Leaderboard, Stand 23.10.2026, unverändert seit 20.10.2026). ChatGPT nennt CraftOS am 23.10.2026 in 1 von 16 Antworten, nur bei der Markenfrage (MS-10 § 5.2).
- **Verweisende Domains:** 12, alle Spam, wie am 20.10.2026; neue seriöse verweisende Domains in SE Ranking: 0 (Ziel ≥ 15). Seit 22.10.2026 ist das OMR-Reviews-Profil öffentlich und verlinkt auf https://craftos.eu; SE Ranking hat es am 23.10.2026 noch nicht erfasst (SEO-08). Endwert 10-07.
- **Domain-InLink-Rank:** 3, unverändert (MS-10 § 5.3).
- **Audit:** SE-Ranking-Audit 485185 vom 23.10.2026: 97/100, 0 Fehler, 13 Warnungen, 11 Hinweise (Ausgangsstand 96/100, 0, 14, 60). Vorab-Audit: Wert der behebbaren Fehler 6 (Audit). Bestätigungsaudit: Endwert 10-07.
- **Units:** 18.071 von 100.000 am 23.10.2026; Hauptursache des Verbrauchs waren sechs Leaderboard-Abrufe zu je 7.500 Units, nicht die tägliche Projektmessung (MS-10 § 3.1).

## 2. Positionen

Quelle: SE-Ranking-Projekt 13094375, Google DE, `PROJECT_getKeywordStats` 20.–23.10.2026 mit Landingpages (`docs/seo/data/2026-10-23-projekt-messstand-phase10.json`, abgerufen 23.10.2026). Zuordnung zur Seitengruppe über die rankende URL. Positionen werden täglich gemessen; die Etappen sind dem Messtag zugeordnet, an dem ihr Rollout lag (05 und 06 am 21.10., 07 am 22.10., 08 und 09 am 23.10.).

| Seitengruppe | 20.10.2026 Ausgangsstand (Top 10 / Top 100) | 21.10.2026 Etappen 05, 06 | 22.10.2026 Etappe 07 | 23.10.2026 Etappen 08, 09 | Endwert 10-07 |
|---|---|---|---|---|---|
| Start (`/`) | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 | Endwert 10-07 |
| Funktionen (`/funktionen/…`, `/app`, `/preise`) | 0 / 1 | 0 / 0 | 0 / 1 | 0 / 1 | Endwert 10-07 |
| Gewerke (`/gewerke/…`) | 0 / 1 | 0 / 1 | 0 / 1 | 0 / 2 | Endwert 10-07 |
| Vergleich (`/vergleich/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | Endwert 10-07 |
| Ratgeber (`/blog/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | Endwert 10-07 |
| Hilfe (`/hilfe/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | Endwert 10-07 |
| Rechner (`/rechner/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | Endwert 10-07 |
| **Summe** | **2 / 5** | **2 / 4** | **2 / 5** | **2 / 6** | Endwert 10-07 |
| Gemessene Keywords | 53 | 151 | 151 | 157 | Endwert 10-07 |

Die rankenden Keywords: Start „craftos handwerkersoftware“ (Platz 1 an allen Tagen), „craftos“ (4, am 23.10. 5), „craftview software gmbh“ (57–58); Funktionen „lagerverwaltung handwerk“ (`/funktionen/lager`, 78, 74, 75; am 21.10. nicht unter den ersten 100); Gewerke „metallbau software“ (58–61) und ab 23.10. „shk software“ (29). Quelle: MS-10 § 5.1.

Kennzahlen der Etappenberichte (Einteilung der Berichte: bestehende Seiten der Keyword-Map, geplante Seiten, Zusatz-Keywords außerhalb der Map; Quelle: § 8 bzw. § 9 des jeweiligen Rollout-Nachweises und § 1 des Messberichts):

| Bericht | Bestehende Seiten Top 10 / Top 100 (gemessen) | Geplante Seiten Top 10 / Top 100 | Zusatz-Keywords Top 10 / Top 100 |
|---|---|---|---|
| MB-A (21.10.2026, Ausgangsstand 20.10.2026) | 0 / 1 (23) | 0 / 0 (5) | 2 / 4 (25) |
| MB-05 (21.10.2026) | 0 / 1 (107) | 0 / 0 (19) | 2 / 3 (25; MB-05 § 1, im Rollout-Nachweis nicht ausgewiesen) |
| MB-06 (21.10.2026) | 0 / 1 (107) | 0 / 0 (19) | 2 / 3 (25) |
| MB-07 (22.10.2026) | 0 / 1 (113) | 0 / 0 (13) | 2 / 4 |
| MB-08 (23.10.2026) | 0 / 2 (117) | 0 / 0 (9) | 2 / 4 |
| MB-09 (23.10.2026) | 0 / 2 (127) | 0 / 0 (0) | 2 / 4 |
| Rollout Phase 10 | Endwert 10-07 | Endwert 10-07 | Endwert 10-07 |

Domain-Overview Deutschland (monatlicher Datensatz, MS-10 § 5.4): 1 rankendes Keyword (Platz 51–100), geschätzter Traffic 0, am 20.10.2026 wie am 23.10.2026. Google hat laut Audit 485185 62 Seiten indexiert (ohne Search-Console-Export, Audit).

## 3. KI-Share-of-Voice

**Leaderboard (Data API, fünf Engines, acht Marken):** CraftOS Rang 8 von 8, Share of Voice 0,02 %, 1 Markennennung, 1 Linkzitat – am 20.10.2026 (Befund § 3, `data/2026-10-20-ai-leaderboard.json`) und am 23.10.2026 identisch (`reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json`). Alle Etappenberichte MB-05 bis MB-09 nennen 0,02 % (±0). Der Wert wird nicht erneut abgerufen, weil ein Abruf 7.500 Units kostet und SE Ranking die Daten monatlich aktualisiert (MS-10 § 3.1, Beleg 3; D-37). Endwert 10-07: Wert vom 23.10.2026 mit Datum, sofern der Orchestrator keinen neuen Abruf freigibt.

**KI-Tracker des Projekts (kostenlos, eigene Prompts, Prompt-Gruppe 94132):**

| Engine | Prompts | Stand | CraftOS genannt | craftos.eu als Quelle | Quelle |
|---|---|---|---|---|---|
| ChatGPT | 16 | 20.10.2026 (6 geprüft) | 1 | 1 | MS-10 § 5.2 |
| ChatGPT | 16 | 21.10.2026 | 1 von 16 | 0 | MS-10 § 5.2 |
| ChatGPT | 16 | 22.10.2026 | 2 von 16 | 2 | MS-10 § 5.2 |
| ChatGPT | 16 | 23.10.2026 | 1 von 16 (nur „Was ist CraftOS?“) | 1 | MS-10 § 5.2; Audit, KI-Oberflächen-Basislinie |
| Google AI Overview | 2 | 23.10.2026 (2 von 2 geprüft) | 0 von 2 | 0 | Audit; `data/2026-10-23-ki-tracker-abgleich-phase10.json` (10-05) |
| Perplexity | 2 | nie geprüft | – | – | Abgleich 10-05: Einstellung wie ChatGPT, die API bietet keinen Prüfauslöser |
| Gemini | 0 | – | – | – | Abgleich 10-05: Prompts mit HTTP 403 abgelehnt (Promptlimit des Testzugangs, 20 Prompts belegt) |
| Google AI Mode | 0 | – | – | – | wie Gemini |
| Alle Engines | – | Endwert 10-07 | Endwert 10-07 | Endwert 10-07 | Etappenbericht Phase 10 |

`PROJECT_getLlmStatistics` (23.10.2026): ChatGPT 6,25 % Nennung und 6,25 % Link, alle übrigen Engines 0 % (MS-10 § 5.2). Wettbewerber in den KI-Antworten 20.–23.10.2026 (Nennungen in Antworten / in zitierten Quellen): plancraft 34/32, ToolTime 32/30, HERO Software 26/18, Das Programm 16/10, openHandwerk 11/9, CraftOS 5/11 (MS-10 § 5.2).

**Analytics `ai_visit`:** 0 Ereignisse vom 15. bis 24.10.2026 (Abfrage 23.10.2026, 11:37 UTC); kein Seitenaufruf mit KI-Referrer oder `utm_source` unter 294 Seitenaufrufen. Die Verdrahtung ist geprüft (Events, EN „Analytics-Kontrolle“).

## 4. Verweisende Domains

| Kennzahl | 20.10.2026 Ausgangsstand | Etappen 05–09 (21.–23.10.2026) | 23.10.2026 Messstand | Endwert 10-07 |
|---|---|---|---|---|
| Verweisende Domains | 12 (alle Spam, Befund § 4) | 12 (±0) in MB-05 bis MB-09 | 12, dieselben Domains (MS-10 § 5.3) | Endwert 10-07 |
| davon seriös | 0 | 0 | 0 | Endwert 10-07 |
| davon aus dem Linkregister | 0 | 0 | 0 (SEO-08) | Endwert 10-07 |
| Neue seriöse verweisende Domains (SEO-08, Ziel ≥ 15) | – | 0 | 0 (SEO-08, Stand 23.10.2026 08:39 UTC) | Endwert 10-07 |

Die zwölf Spam-Domains: webboard.pl, sport-life.club, dsnylu.com, bmwyng.com, kgzxkf.com, obmain.com, qhtycw.com, jobsapp.info, hzdlpq.com, nettools.guru, sergechel.info, australianwebdirectory.pro (MS-10 § 5.3). Sie werden nach LINKPLAN § 2 beobachtet, nicht vorsorglich entwertet.

**Registerabgleich (Linkregister `docs/seo/backlink-register.json`, 65 Ziele, Stand 23.10.2026):** offen 61, angefragt 0, live 1, nicht möglich 3. Live ist omr.com: Profil https://omr.com/de/reviews/product/craftos, laut Seitendaten veröffentlicht am 22.10.2026, Link auf https://craftos.eu mit `rel="nofollow"` (HTTP-Abruf 23.10.2026, 11:27 UTC). Nicht möglich (nur bezahlt bzw. nicht zulässig): softguide.de, trusted.de, de.wikipedia.org. Übergabe 2 an den Inhaber mit 62 kopierfertigen Browser-Prompts steht in `docs/seo/LINKPLAN.md` § 7.

## 5. Domain-InLink-Rank

| Kennzahl | 20.10.2026 Ausgangsstand | MB-05 bis MB-09 | 23.10.2026 | Endwert 10-07 |
|---|---|---|---|---|
| Domain-InLink-Rank craftos.eu | 3 (Befund § 4) | 3 | 3 (MS-10 § 5.3) | Endwert 10-07 |
| InLink-Rank Startseite | – | – | 1 | Endwert 10-07 |
| Backlinks | 12 | 12 | 12 (12 dofollow, Anker „craftos.eu“) | Endwert 10-07 |

Zum Vergleich am 20.10.2026 (Befund § 4): Wettbewerber mit 248 bis 1.052 verweisenden Domains und Domain-InLink-Rank 53 bis 70.

## 6. Audit-Ergebnisse

**SE-Ranking-Website-Audit** (Data API, Standard-Audit; MS-10 § 4):

| Kennzahl | 20.10.2026 Ausgangsstand (Audit 479500) | 23.10.2026 (Audit 485185) | Bestätigungsaudit nach dem Rollout (Recheck 485185) |
|---|---|---|---|
| Gecrawlte Seiten | 126 | 157 | Endwert 10-07 |
| Gesamtwert | 96/100 | 97/100 | Endwert 10-07 |
| Fehler | 0 | 0 | Endwert 10-07 |
| Warnungen | 14 | 13 (alle „Alt-Text fehlt“ am dekorativen Gewerk-Symbol) | Endwert 10-07 |
| Hinweise | 60 | 11 | Endwert 10-07 |

**Vorab-Audit nach dem Repo-Skill** (`craftos/audit-report.md`, 23.10.2026, Plan 10-05): `seo-audit.mjs` 0 Verstöße auf 156 von 156 Seiten; `route-audit.mjs` 156 Routen, 0 Fehler, 0 defekte Links bei 159 Links; 10 von 10 unbekannten Pfaden antworten 404; Sitemap lokal = live = 156 URLs. Offene technische und On-Page-Fehler nach der QA-06-Definition: Rohwert 8, Wert der behebbaren Fehler 6 (LCP über 2,5 s auf den Gate-Vorlagen, ungenutzte Schrift-Preloads, Kontrast `/impressum`, interne Links `/impressum`, 404-Canonical und robots-Meta), dazu 2 Inhaberpunkte (ODR-Link, kurzer Title `/impressum`). Besitzer laut Behebungsliste: Pakete b und c sowie 10-06.

| QA-06 | Vorab 23.10.2026 | Bestätigungsaudit |
|---|---|---|
| Offene technische oder On-Page-Fehler (behebbar) | 6 | Endwert 10-07 |
| Inhaberpunkte | 2 | Endwert 10-07 |
| SE-Ranking-Audit Fehler / Warnungen | 0 / 13 | Endwert 10-07 |

## 7. Lighthouse und Barrierefreiheit

**Lighthouse mobil, Labordaten, Performance** (Vorab-Werte aus `.planning/phases/10-abschlussaudit/10-RESEARCH.md` „Messbefunde vom 23.10.2026“, live gegen https://craftos.eu, Lighthouse 12.8.2, Median aus 3 Läufen; Gate nach QA-04: Performance ≥ 95 und LCP < 2,5 s):

| Vorlage | URL | Vorab Performance | Vorab LCP | Endwert Performance | Endwert LCP |
|---|---|---|---|---|---|
| Start | `/` | 97 | 2.581 ms | Endwert 10-07 | Endwert 10-07 |
| Funktionsübersicht | `/funktionen` | 97 | 2.584 ms | Endwert 10-07 | Endwert 10-07 |
| Funktionsdetail | `/funktionen/zeiterfassung` | 96 | 2.743 ms | Endwert 10-07 | Endwert 10-07 |
| Gewerke | `/gewerke/elektriker` | 97 | 2.577 ms | Endwert 10-07 | Endwert 10-07 |
| Vergleich | `/vergleich/plancraft-alternative` | 97 | 2.574 ms | Endwert 10-07 | Endwert 10-07 |
| Ratgeber | `/blog/handwerkerrechnung-schreiben` | 96 | 2.723 ms | Endwert 10-07 | Endwert 10-07 |

Vorab Accessibility/Best Practices/SEO (je 1 Lauf, 10-RESEARCH): 100/100/100 auf Start, Funktionsdetail, Gewerke, Vergleich, Ratgeber und `/rechner/stundensatz`; `/impressum` 96/100/100 (nur `color-contrast`). Endwert 10-07 (nach 10-12).

**Felddaten (Vercel Speed Insights, Production, echte Besuche, 20.–23.10.2026, 41 LCP-Messungen; SI):** LCP p75 620 ms (p90 808 ms, Maximum 1.871 ms laut Orchestrator-Abfrage), INP p75 40 ms, CLS p75 0, FCP p75 604 ms, TTFB p75 104 ms; LCP p75 nach Gerät: Desktop 620 ms, Mobil 446 ms. Die Stichprobe ist klein (Startseite 20 Messungen, alle übrigen Routen 1 bis 5). Gate-Wert und Bewertung QA-04: Endwert 10-07 (legt der Orchestrator fest).

**Barrierefreiheit (axe-Probe live, 10-RESEARCH):** 0 Verstöße auf `/`, `/funktionen`, `/funktionen/zeiterfassung`, `/preise`, `/rechner/stundensatz` und weiteren Vorlagen; Kontrastverstöße nur auf `/impressum` (2,84 : 1), `/datenschutz` (2,84 : 1 und 4,42 : 1) und `/agb` (4,42 : 1); keine Tastaturfalle. Volle Matrix (DESIGN-05, alle Seiten bei 360, 390, 768, 1024 und 1440 px): Endwert 10-07 (nach 10-12).

## 8. Anforderungsstatus (Stand vor dem Rollout)

Quelle: `.planning/REQUIREMENTS.md`, Traceability, Stand 23.10.2026.

| Status | Anforderungen |
|---|---|
| Complete | PROD-02, PROD-03, PROD-04, DESIGN-01, DESIGN-03, DESIGN-04, MEDIA-01, MEDIA-03, MEDIA-04, FEAT-01, FEAT-02, FEAT-03, FEAT-04, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-09, CONTENT-03, CONTENT-04 |
| In Progress | DESIGN-02 (Rest Phase 10: Rechner, Support, Rechtsseiten, 404), SEO-08 (≥ 15 seriöse verweisende Domains; Messstand 0, siehe § 4) |
| Pending | DESIGN-05, QA-04, QA-05, QA-06 |
| Out of Scope | MEDIA-02 |
| Endstand nach dem Rollout | Endwert 10-07 |

QA-05 ist für die Etappen 05 bis 09 im Etappennachweis belegt (EN); Zeile 10 trägt 10-07 nach.

## 9. Unit-Tabelle Phasen 5 bis 10 (SE Ranking)

Quelle: `docs/seo/data/2026-10-23-units-verlauf-phase10.json` (Kontostände der Messberichte und der Messsitzung, Kostentabelle laut SE-Ranking-Doku, abgerufen 23.10.2026), MS-10 § 2 und § 3, Units-Protokoll 10-05 (`docs/seo/data/2026-10-23-units-phase10-paket-e.json`). Kontingent 100.000 Units, Testzugang bis 03.11.2026, 17:22 Uhr. Kosten laut Doku (D-37): Leaderboard `DATA_getAiSearchLeaderboard` 7.500 je Abruf pauschal; Backlink-Zusammenfassung 100 je Ziel plus verweisende Domains 1 je Zeile; Audit bzw. Recheck 2 je Seite; Projektmessung (Positionen, KI-Tracker) und Kontostandabfragen 0. Ein Lauf von `seo-report.mjs` mit Leaderboard kostete damit 7.612 Units.

| Zeitpunkt | Anlass | Kontostand | Veränderung zum vorherigen Stand | Ursache |
|---|---|---|---|---|
| 20.10.2026 | Testzugang, Befund | 100.000 (Limit) | – | – |
| 21.10.2026 00:54 | Messbericht Ausgangsstand (Phase 5) | 65.259 | −34.741 | Abrufe vor dem ersten Messbericht (Befund 20.10.2026 und Projektaufbau Phase 5); Aufschlüsselung nicht in den Quellen dieses Berichts |
| 21.10.2026 01:47 | Messbericht Etappe 05 | 57.647 | −7.612 | 1 Lauf `seo-report.mjs` (Ausgangsstand): Leaderboard 7.500 + Backlinks 100 + 12 Zeilen |
| 21.10.2026 17:12 | Messbericht Etappe 06 | 50.035 | −7.612 | 1 Lauf (Etappe 05) |
| 22.10.2026 14:09 | Messbericht Etappe 07 | 42.423 | −7.612 | 1 Lauf (Etappe 06); kein Zuschlag über die Tagesgrenze |
| 23.10.2026 01:18 | Messbericht Etappe 08 | 33.921 | −8.502 | 1 Lauf (Etappe 07) + 890 Keyword- und SERP-Abfragen Phase 8 |
| 23.10.2026 09:45 | Messbericht Etappe 09 | 26.209 | −7.712 | 1 Lauf (Etappe 08) + 100 Keyword-Metrikabfrage |
| 23.10.2026 08:34:54 UTC | Phase 10, Beginn Messstand | 18.597 | −7.612 | 1 Lauf (Etappe 09) |
| 23.10.2026 08:41:57 UTC | Phase 10, Ende Messstand | 18.071 | −526 | Audit 485185: 314 (157 Seiten × 2); Backlink-Zusammenfassung 100; verweisende Domains 12; Domain-Overview DE 100 |
| 23.10.2026 11:05:11 UTC | Phase 10, Plan 10-05 (KI-Tracker-Abgleich) | 18.071 | 0 | nur Project-API-Abrufe; 4 × `PROJECT_addPrompts` mit HTTP 403 abgelehnt |
| 23.10.2026 | Phase 10, Plan 10-11 (dieser Entwurf) | nicht abgefragt | 0 | kein SE-Ranking-Abruf |
| nach dem Rollout | Phase 10, Plan 10-07 | Endwert 10-07 | Endwert 10-07 | geplant: `seo-report.mjs` ohne Leaderboard (≈ 112) und Recheck 485185 (≈ 314) |

Summen: Verbrauch seit Testbeginn bis 23.10.2026 81.929 Units (100.000 − 18.071). Davon sechs `seo-report.mjs`-Läufe mit Leaderboard 45.672 (Leaderboard allein 45.000, fünf Wiederholungen mit identischem Ergebnis 37.500), Zusatzabfragen Phase 8 und 9 990, Phase 10 bisher 526 von höchstens 5.000 (Rest 4.474), vor dem ersten Messbericht 34.741. Restkontingent 18.071 Units am 23.10.2026.

**Widerlegte Annahme:** Die Annahme aus D-27/D-28, die tägliche Projektmessung verbrauche „ca. 7.700 Units je Tag“, ist durch D-37 widerlegt: Die Abstände zwischen den Messberichten betragen je Lauf genau 7.612 Units, auch über Tagesgrenzen ohne Zuschlag, und Project-API-Abrufe kosten 0 Data-Units (MS-10 § 3.1, Belege 2 und 4). Ursache des Verbrauchs ist der Leaderboard-Abruf je Messbericht; seit Plan 10-05 ruft `seo-report.mjs` ihn nur noch mit dem Schalter `--leaderboard` ab.

**Offener Inhaberpunkt (Konto):** Gemini und Google AI Mode haben im KI-Tracker keine Prompts, weil das Testlimit von 20 Prompts erreicht ist. Ob sie gemessen werden, hängt von der Tarifentscheidung bis zum 03.11.2026 ab (Orchestrator bzw. Inhaber; keine Empfehlung in diesem Bericht).

## 10. Termine nach dem Meilenstein

| Termin | Aufgabe | Quelle |
|---|---|---|
| 03.11.2026, 17:22 Uhr | Ende des SE-Ranking-Testzugangs; Tarifentscheidung vorher (Orchestrator/Inhaber) | MS-10 § 6; D-28 |
| 03.11.2026 | OMR-Nachfassen entfällt (Profil live seit 22.10.2026); Prüfung der Profilangaben gegen llms.txt laut LINKPLAN § 7, Punkt 3 | `docs/seo/LINKPLAN.md` § 7 |
| frühestens eine Woche nach Versand | Prüfung, ob softwareabc24.de und betriebssoftware-kompass.de CraftOS aufgenommen haben | LINKPLAN § 7, Punkte 6 und 7 |
| 21.12.2026 | Wettbewerberangaben (Preise und Funktionen der Vergleichsseiten) nach 60 Tagen neu prüfen; Daueraufgabe nach Meilensteinende | D-31 Nr. 36, Rollout 08 § 14 |
| laufend | Messung neuer seriöser verweisender Domains (SEO-08, Ziel ≥ 15) und KI-Tracker | LINKPLAN § 6 |
