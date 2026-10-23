# Abschlussbericht Meilenstein v2.0 – craftos.eu

Stand: 23.10.2026, Endfassung nach dem Rollout der Phase 10 (Plan 10-07; Entwurf aus Plan 10-11). Vergleichsbasis ist der Ausgangsstand vom 20.10.2026 (`docs/seo/SE-RANKING-BEFUND-2026-10-20.md`, Projektstart SE Ranking) bzw. der erste Messbericht `docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`. Jede Zahl nennt Quelle und Datum. Der Bericht enthält keine Tarifempfehlung; die Entscheidung über das SE-Ranking-Konto trifft der Orchestrator bzw. Inhaber vor dem 03.11.2026.

Quellen (alle im Repository, sofern nicht anders angegeben):

| Kürzel | Datei | Datum |
|---|---|---|
| Befund | `docs/seo/SE-RANKING-BEFUND-2026-10-20.md` | 20.10.2026 |
| MB-A | `docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md` | 21.10.2026 |
| MB-05 … MB-09 | `docs/seo/reports/2026-10-2x-messbericht-rollout-phase05.md` bis `…-phase09.md` | 21.–23.10.2026 |
| MS-10 | `docs/seo/reports/2026-10-23-messstand-phase10.md` mit `docs/seo/data/2026-10-23-*-phase10.json` | 23.10.2026, 08:34–08:42 UTC |
| MB-10 | `docs/seo/reports/2026-10-23-messbericht-rollout-phase10.md` mit `2026-10-23-raw-rollout-phase10-*.json` (ohne Leaderboard) | 23.10.2026, 16:46–16:49 UTC |
| Audit | `craftos/audit-report.md` (Vorab-Audit 10-05 und Bestätigungsaudit 10-07 nach Repo-Skill), `craftos/audit-report-bestaetigung.html` | 23.10.2026 |
| Recheck | `docs/seo/data/2026-10-23-audit-recheck-phase10.json`, `…-audit-recheck-issues-phase10.json` | 23.10.2026, 16:37–16:38 UTC |
| SEO-08 | `docs/seo/data/2026-10-23-seo08-messstand-phase10.json`; MB-10 § 3 | 23.10.2026 |
| Events | `docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json`; `…-vercel-events-rollout-phase10.json` | 23.10.2026, 11:36 und 16:51 UTC |
| SI | `docs/seo/data/2026-10-23-vercel-speed-insights-phase10.json`; `…-vercel-speed-insights-rollout-phase10.json` | 23.10.2026; 16:50 UTC |
| LH | `docs/releases/PHASE-10-PRUEFUNGEN.md` § 5.3 (lokal); `docs/seo/data/2026-10-23-lighthouse-live-phase10.json` (live) | 23.10.2026 |
| EN | `docs/releases/ETAPPEN-NACHWEIS-V2.md` | 23.10.2026 |
| RO-10 | `docs/releases/PHASE-10-ROLLOUT.md` | 23.10.2026 |

## 1. Ergebnis in Kürze

- **Etappen:** Phasen 5 bis 10 sind je einzeln nach Ship-Gate live gegangen, mit IndexNow, live-check und Etappenbericht (EN, Zeilen 05 bis 10). Phase 10: Push `e392762` um 18:29:44 MESZ, Deployment `dpl_TBDg23xnPvC9HmED3ArQA16Vida7` READY 18:30:41 MESZ, live-check 77/77 OK, IndexNow 156 URLs HTTP 200 (RO-10 §§ 4–6).
- **Positionen:** 2 Keywords in den Top 10 (beide Marke, unverändert seit 20.10.2026) und 6 in den Top 100 (20.10.2026: 5); „shk software“ Platz 29 mit `/gewerke/shk` (MB-10 § 4). Kein generisches Hauptkeyword rankt bisher. Die Phase-10-Seiten sind erst seit 23.10.2026 16:30 UTC live; die letzte Positionsmessung im Projekt ist vom selben Tag.
- **KI-Sichtbarkeit:** Share of Voice CraftOS 0,02 % (Leaderboard, letzter Abruf 23.10.2026, unverändert seit 20.10.2026; nach D-37 nicht erneut abgerufen). ChatGPT nennt CraftOS in 1 von 16 Antworten (6,25 %, nur Markenfrage); AI Overview 0 von 2 (MB-10 § 2).
- **Verweisende Domains:** 12, alle Spam, wie am 20.10.2026; neue seriöse verweisende Domains in SE Ranking: **0** (Ziel ≥ 15). Das OMR-Reviews-Profil (live seit 22.10.2026, nofollow) ist in SE Ranking am 23.10.2026 16:48 UTC noch nicht erfasst (MB-10 § 3). SEO-08 bleibt offen.
- **Domain-InLink-Rank:** 3, unverändert (MB-10 § 3).
- **Audit:** Recheck 485185 nach dem Rollout: 97/100, 0 Fehler, 13 Warnungen (gewaivt), 164 Hinweise (156 davon neu: Logo-Link ohne Textanker, gewaivt). Bestätigungsaudit: Wert der behebbaren Fehler **2** (Vorab 6), offene Inhaberpunkte 0 (Vorab 2). Offen sind nur die internen Links im Hauptteil von `/impressum` (O2, O3); QA-06 bleibt offen (Audit, RO-10 § 11).
- **Ladezeit (D-44):** Felddaten Vercel Speed Insights, Produktion, 30 Tage: p75 LCP 564 ms (n = 58), INP 40 ms (n = 47), CLS 0 (n = 31) – alle drei Schwellen eingehalten (SI). Labordaten live nur als Regressionsinformation: Performance 94–98, LCP 2.421–2.807 ms (LH).
- **Barrierefreiheit:** A11y-Matrix 158 Seiten, 890 Aufrufe, 0 Gate-Verstöße (10-12); Lighthouse Accessibility 100 auf 16 Seiten lokal und 15 Seiten live (LH).
- **Units:** 17.645 von 100.000 nach dem Rollout am 23.10.2026; Phase 10 verbrauchte 952 Units (Grenze 5.000).

## 2. Positionen

Quelle: SE-Ranking-Projekt 13094375, Google DE, `PROJECT_getKeywordStats` mit Landingpages (bis 23.10.2026: `docs/seo/data/2026-10-23-projekt-messstand-phase10.json`; Rollout: MB-10 § 4, Rohdaten `reports/2026-10-23-raw-rollout-phase10-positionen.json`). Zuordnung zur Seitengruppe über die rankende URL. Positionen werden täglich gemessen; die Etappen sind dem Messtag zugeordnet, an dem ihr Rollout lag (05 und 06 am 21.10., 07 am 22.10., 08, 09 und 10 am 23.10.).

| Seitengruppe | 20.10.2026 Ausgangsstand (Top 10 / Top 100) | 21.10.2026 Etappen 05, 06 | 22.10.2026 Etappe 07 | 23.10.2026 Etappen 08, 09 | 23.10.2026 nach dem Rollout Phase 10 (MB-10) |
|---|---|---|---|---|---|
| Start (`/`) | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 |
| Funktionen (`/funktionen/…`, `/app`, `/preise`) | 0 / 1 | 0 / 0 | 0 / 1 | 0 / 1 | 0 / 1 |
| Gewerke (`/gewerke/…`) | 0 / 1 | 0 / 1 | 0 / 1 | 0 / 2 | 0 / 2 |
| Vergleich (`/vergleich/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Ratgeber (`/blog/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Hilfe (`/hilfe/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Rechner (`/rechner/…`) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| **Summe** | **2 / 5** | **2 / 4** | **2 / 5** | **2 / 6** | **2 / 6** |
| Gemessene Keywords | 53 | 151 | 151 | 157 | 157 (132 Map-Keywords, 25 Zusatz-Keywords) |

Die rankenden Keywords nach dem Rollout (MB-10 § 4): Start „craftos handwerkersoftware“ (1), „craftos“ (5), „craftview software gmbh“ (57); Funktionen „lagerverwaltung handwerk“ (`/funktionen/lager`, 75); Gewerke „shk software“ (`/gewerke/shk`, 29) und „metallbau software“ (`/gewerke/metallbau`, 59). Alle übrigen 151 gemessenen Keywords stehen nicht unter den ersten 100.

Kennzahlen der Etappenberichte (Einteilung der Berichte: bestehende Seiten der Keyword-Map, geplante Seiten, Zusatz-Keywords außerhalb der Map; Quelle: § 8 bzw. § 9 des jeweiligen Rollout-Nachweises und § 1 des Messberichts):

| Bericht | Bestehende Seiten Top 10 / Top 100 (gemessen) | Geplante Seiten Top 10 / Top 100 | Zusatz-Keywords Top 10 / Top 100 |
|---|---|---|---|
| MB-A (21.10.2026, Ausgangsstand 20.10.2026) | 0 / 1 (23) | 0 / 0 (5) | 2 / 4 (25) |
| MB-05 (21.10.2026) | 0 / 1 (107) | 0 / 0 (19) | 2 / 3 (25; MB-05 § 1, im Rollout-Nachweis nicht ausgewiesen) |
| MB-06 (21.10.2026) | 0 / 1 (107) | 0 / 0 (19) | 2 / 3 (25) |
| MB-07 (22.10.2026) | 0 / 1 (113) | 0 / 0 (13) | 2 / 4 |
| MB-08 (23.10.2026) | 0 / 2 (117) | 0 / 0 (9) | 2 / 4 |
| MB-09 (23.10.2026) | 0 / 2 (127) | 0 / 0 (0) | 2 / 4 |
| MB-10 Rollout Phase 10 (23.10.2026) | 0 / 2 (132) | 0 / 0 (0) | 2 / 4 (25) |

Domain-Overview Deutschland (monatlicher Datensatz, MS-10 § 5.4): 1 rankendes Keyword (Platz 51–100), geschätzter Traffic 0, am 20.10.2026 wie am 23.10.2026; nach dem Rollout nicht erneut abgerufen (Units). Google hat laut Recheck 485185 weiterhin 62 Seiten indexiert (ohne Search-Console-Export).

## 3. KI-Share-of-Voice

**Leaderboard (Data API, fünf Engines, acht Marken):** CraftOS Rang 8 von 8, Share of Voice 0,02 %, 1 Markennennung, 1 Linkzitat – am 20.10.2026 (Befund § 3, `data/2026-10-20-ai-leaderboard.json`) und am 23.10.2026 identisch (`reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json`). Alle Etappenberichte MB-05 bis MB-09 nennen 0,02 % (±0). **Endwert:** der Wert vom 23.10.2026 mit diesem Datum. MB-10 hat das Leaderboard nach D-37 nicht abgerufen (ein Abruf kostet 7.500 Units, SE Ranking aktualisiert die Daten monatlich); ein neuer Abruf war nicht freigegeben.

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
| Alle Engines nach dem Rollout | 20 | 20.–23.10.2026, letzte Prüfung 23.10.2026 | ChatGPT 6,25 %, AI Overview 0 %, Perplexity/Gemini/AI Mode nicht geprüft bzw. ohne Prompts | ChatGPT 6,25 %, übrige 0 % | MB-10 § 2 (`PROJECT_getLlmStatistics`) |

`PROJECT_getLlmStatistics` (23.10.2026): ChatGPT 6,25 % Nennung und 6,25 % Link, alle übrigen Engines 0 % (MS-10 § 5.2, MB-10 § 2). Wettbewerber in den KI-Antworten 20.–23.10.2026 (Nennungen in Antworten / in zitierten Quellen): plancraft 34/32, ToolTime 32/30, HERO Software 26/18, Das Programm 16/10, openHandwerk 11/9, CraftOS 5/11 (MS-10 § 5.2).

**Analytics `ai_visit`:** 0 Ereignisse vom 15. bis 24.10.2026 (Abfrage 23.10.2026, 11:37 UTC; kein Seitenaufruf mit KI-Referrer oder `utm_source` unter 294 Seitenaufrufen) und 0 in den 30 Tagen bis zur Abfrage nach dem Rollout (23.10.2026, 16:51 UTC; Events). Die Verdrahtung ist geprüft (EN „Analytics-Kontrolle“).

## 4. Verweisende Domains

| Kennzahl | 20.10.2026 Ausgangsstand | Etappen 05–09 (21.–23.10.2026) | 23.10.2026 Messstand | 23.10.2026 nach dem Rollout (MB-10) |
|---|---|---|---|---|
| Verweisende Domains | 12 (alle Spam, Befund § 4) | 12 (±0) in MB-05 bis MB-09 | 12, dieselben Domains (MS-10 § 5.3) | 12, dieselben Domains (±0) |
| davon seriös | 0 | 0 | 0 | 0 |
| davon aus dem Linkregister | 0 | 0 | 0 (SEO-08) | 0 (Register-Domains unter den verweisenden Domains: keine) |
| Neue seriöse verweisende Domains (SEO-08, Ziel ≥ 15) | – | 0 | 0 (SEO-08, Stand 23.10.2026 08:39 UTC) | **0** (Stand 23.10.2026 16:48 UTC) |

Die zwölf Spam-Domains: webboard.pl, sport-life.club, dsnylu.com, bmwyng.com, kgzxkf.com, obmain.com, qhtycw.com, jobsapp.info, hzdlpq.com, nettools.guru, sergechel.info, australianwebdirectory.pro (MB-10 § 3). Sie werden nach LINKPLAN § 2 beobachtet, nicht vorsorglich entwertet.

**Registerabgleich (Linkregister `docs/seo/backlink-register.json`, 65 Ziele, Stand 23.10.2026 nach dem Rollout):** offen 61, angefragt 0, live 1, nicht möglich 3. Live ist omr.com: Profil https://omr.com/de/reviews/product/craftos, laut Seitendaten veröffentlicht am 22.10.2026; erneut abgerufen am 23.10.2026 16:52 UTC (HTTP 200, Link auf https://craftos.eu mit `rel="noopener noreferrer nofollow"`); in MB-10 nicht unter den verweisenden Domains. Nicht möglich (nur bezahlt bzw. nicht zulässig): softguide.de, trusted.de, de.wikipedia.org. Übergabe 2 an den Inhaber mit 62 kopierfertigen Browser-Prompts steht in `docs/seo/LINKPLAN.md` § 7.

## 5. Domain-InLink-Rank

| Kennzahl | 20.10.2026 Ausgangsstand | MB-05 bis MB-09 | 23.10.2026 Messstand | 23.10.2026 nach dem Rollout (MB-10) |
|---|---|---|---|---|
| Domain-InLink-Rank craftos.eu | 3 (Befund § 4) | 3 | 3 (MS-10 § 5.3) | 3 |
| InLink-Rank Startseite | – | – | 1 | nicht erneut abgerufen (MB-10 enthält nur den Domainwert) |
| Backlinks | 12 | 12 | 12 (12 dofollow, Anker „craftos.eu“) | 12 (12 dofollow) |

Zum Vergleich am 20.10.2026 (Befund § 4): Wettbewerber mit 248 bis 1.052 verweisenden Domains und Domain-InLink-Rank 53 bis 70.

## 6. Audit-Ergebnisse

**SE-Ranking-Website-Audit** (Data API, Standard-Audit):

| Kennzahl | 20.10.2026 Ausgangsstand (Audit 479500) | 23.10.2026 Vorab (Audit 485185) | Bestätigung nach dem Rollout (Recheck 485185, 23.10.2026 16:37–16:38 UTC) |
|---|---|---|---|
| Gecrawlte Seiten | 126 | 157 | 157 |
| Gesamtwert | 96/100 | 97/100 | 97/100 |
| Fehler | 0 | 0 | 0 |
| Warnungen | 14 | 13 (alle „Alt-Text fehlt“ am dekorativen Gewerk-Symbol) | 13 (dieselben, gewaivt) |
| Hinweise | 60 | 11 | 164 (behoben: `title_short`, `same_title_h1`, `extlinks3xx`; unverändert: 8 nofollow; neu: 156 × `links_no_anchor` am Logo-Link mit `aria-label`, gewaivt als Crawler artifact) |

**Vorab-Audit nach dem Repo-Skill** (`craftos/audit-report.md`, Plan 10-05): `seo-audit.mjs` 0 Verstöße auf 156 von 156 Seiten; `route-audit.mjs` 156 Routen, 0 Fehler, 0 defekte Links bei 159 Links; Rohwert 8, Wert der behebbaren Fehler 6, dazu 2 Inhaberpunkte.

**Bestätigungsaudit nach dem Rollout** (`craftos/audit-report.md` § „Bestätigungsaudit 2026-10-23“, `audit-report-bestaetigung.html`, ohne Behebungen): `seo-audit.mjs` 0 von 156; `route-audit.mjs` **live** gegen https://craftos.eu 156 Routen, 0 Fehler, 0 defekte Links (159 Links, 14 Assets), 10 von 10 unbekannten Pfaden 404; Lighthouse Accessibility/Best Practices/SEO 100 auf 15 Live-URLs; 404 ohne geerbten Canonical; drei Font-Preloads; robots.txt nennt fünf KI-Crawler. Stichprobe (14 Seiten): On-Page fixable Ø 91 % (Vorab 89 %), GEO fixable Ø 74 % (Vorab 71 %); Gesamtwert der HTML-Ansicht 86 → 88.

| QA-06 | Vorab 23.10.2026 | Bestätigungsaudit 23.10.2026 |
|---|---|---|
| Offene technische oder On-Page-Fehler (behebbar) | 6 (T4, T5, T6, O1, O2, O3) | **2** (O2, O3: `/impressum` mit 1 internem Link im Hauptteil, ohne Link auf Funktionen oder Preise) |
| Inhaberpunkte offen | 2 (ODR-Link, kurzer Title) | 0 (beide mit D-42 erledigt) |
| Rohwert | 8 | 2 |
| SE-Ranking-Audit Fehler / Warnungen | 0 / 13 | 0 / 13 |

## 7. Lighthouse und Barrierefreiheit

**Lighthouse mobil, Labordaten, Performance** (nach D-44 nur Regressionsinformation, kein Gate). Vorab: 10-RESEARCH „Messbefunde vom 23.10.2026“, live, Lighthouse 12.8.2, Median aus 3 Läufen. Endwert: live gegen https://craftos.eu nach dem Rollout, Lighthouse 13.5.0, Median aus 3 Läufen (LH):

| Vorlage | URL | Vorab Performance | Vorab LCP | Endwert Performance | Endwert LCP |
|---|---|---|---|---|---|
| Start | `/` | 97 | 2.581 ms | 98 | 2.425 ms |
| Funktionsübersicht | `/funktionen` | 97 | 2.584 ms | 97 | 2.569 ms |
| Funktionsdetail | `/funktionen/zeiterfassung` | 96 | 2.743 ms | 94 | 2.807 ms |
| Gewerke | `/gewerke/elektriker` | 97 | 2.577 ms | 96 | 2.701 ms |
| Vergleich | `/vergleich/plancraft-alternative` | 97 | 2.574 ms | 98 | 2.431 ms |
| Ratgeber | `/blog/handwerkerrechnung-schreiben` | 96 | 2.723 ms | 97 | 2.436 ms |

Weitere Live-Werte (LH): Gate-Seiten `/funktionen/angebote` 97 / 2.432 ms, `/gewerke/shk` 98 / 2.430 ms, `/vergleich/handwerkersoftware-kleine-betriebe` 98 / 2.421 ms; `/impressum` 97, `/datenschutz` 97, `/agb` 98, `/support` 98, `/rechner` 97, `/rechner/stundensatz` 97 (je 1 Lauf). CLS 0 auf allen 15 URLs. Lokal im Phasen-Gate 10-12 (PHASE-10-PRUEFUNGEN § 5.3): Score 90–96, LCP 2.668–3.467 ms, Accessibility 100 auf 16 Seiten.

**Accessibility/Best Practices/SEO:** Vorab 100/100/100 auf den gemessenen Vorlagen, `/impressum` 96/100/100. Endwert: **100/100/100 auf allen 15 Live-URLs**, darunter `/impressum`, `/datenschutz` und `/agb` (LH), und Accessibility 100 auf allen 16 lokal gemessenen Seiten (10-12).

**Felddaten (D-44, Maßstab für QA-04; SI):** Vercel Speed Insights, Production, echte Besuche, `--since 30d` (Zeitraum 23.09.2026 16:00 UTC bis 23.10.2026 20:00 UTC, Messungen ab 20.10.2026), abgefragt am 23.10.2026 um 16:50 UTC: **p75 LCP 564 ms (n = 58), INP 40 ms (n = 47), CLS 0 (n = 31)**. Schwellen LCP < 2.500 ms, INP < 200 ms, CLS < 0,1: eingehalten. Grenze: Die Stichprobe liegt unter 100 Messungen und stammt überwiegend aus der Zeit vor dem Rollout (bis zur Abfrage höchstens 3 LCP-Messungen im Zeitfenster des Rollouts). Vorab (23.10.2026, n = 41): LCP p75 620 ms, INP p75 40 ms, CLS p75 0.

**Barrierefreiheit (DESIGN-05):** Volle A11y-Matrix im Phasen-Gate 10-12 (PHASE-10-PRUEFUNGEN § 5.2): 158 Seiten (156 Sitemap-URLs, `/styleguide`, 404), 890 Aufrufe bei 360, 390, 768, 1024 und 1440 px (Chromium alle Seiten, WebKit 20 Vorlagen), Gate-Verstöße 0, Großtext unter 4,5 : 1 0, Tastaturfehler 0, Statusfehler 0. Vorab hatten `/impressum`, `/datenschutz` und `/agb` Kontrastverstöße; diese sind behoben.

## 8. Anforderungsstatus (Endstand nach dem Rollout)

Quelle: `.planning/REQUIREMENTS.md`, Traceability, Stand 23.10.2026 nach Plan 10-07; Begründungen je ID in RO-10 § 11.

| Status | Anforderungen |
|---|---|
| Complete | PROD-02, PROD-03, PROD-04, DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, DESIGN-05, MEDIA-01, MEDIA-03, MEDIA-04, FEAT-01, FEAT-02, FEAT-03, FEAT-04, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-09, CONTENT-03, CONTENT-04, QA-04, QA-05 |
| In Progress | QA-06 (Bestätigungsaudit: 2 behebbare On-Page-Fehler auf `/impressum`, Lückenschluss in RO-10 § 11), SEO-08 (≥ 15 seriöse verweisende Domains; Messstand 0, LINKPLAN § 7) |
| Out of Scope | MEDIA-02 |

QA-05 ist für die Etappen 05 bis 10 im Etappennachweis belegt (EN); das 24-Stunden-Analytics-Fenster der Etappe 10 folgt als Nachtrag des Orchestrators.

## 9. Unit-Tabelle Phasen 5 bis 10 (SE Ranking)

Quelle: `docs/seo/data/2026-10-23-units-verlauf-phase10.json` (Kontostände der Messberichte und der Messsitzung, Kostentabelle laut SE-Ranking-Doku, abgerufen 23.10.2026), MS-10 § 2 und § 3, Units-Protokoll 10-05 (`docs/seo/data/2026-10-23-units-phase10-paket-e.json`), Units-Protokoll 10-07 (`docs/seo/data/2026-10-23-units-rollout-phase10.json`). Kontingent 100.000 Units, Testzugang bis 03.11.2026, 17:22 Uhr. Kosten laut Doku (D-37): Leaderboard `DATA_getAiSearchLeaderboard` 7.500 je Abruf pauschal; Backlink-Zusammenfassung 100 je Ziel plus verweisende Domains 1 je Zeile; Audit bzw. Recheck 2 je Seite; Projektmessung (Positionen, KI-Tracker) und Kontostandabfragen 0. Ein Lauf von `seo-report.mjs` mit Leaderboard kostete damit 7.612 Units, ohne Leaderboard 112.

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
| 23.10.2026 | Phase 10, Plan 10-11 (Entwurf) | nicht abgefragt | 0 | kein SE-Ranking-Abruf |
| 23.10.2026 16:37:22 UTC | Phase 10, 10-07 Block A (`se-ranking-sync.mjs --check`) | 18.071 | 0 | Project API (8 Aufrufe); vorher 16:36:05 UTC 18.071 |
| 23.10.2026 16:46:33 UTC | Phase 10, 10-07 Block B (Recheck 485185, Bericht, betroffene URLs) | 17.757 | −314 | Recheck 157 Seiten × 2; Bericht und URL-Listen kostenlos |
| 23.10.2026 16:49:18 UTC | Phase 10, 10-07 Block C (`seo-report.mjs --etappe rollout-phase10`, ohne Leaderboard) | 17.645 | −112 | Backlink-Zusammenfassung 100 + 12 Zeilen; 18 MCP-Aufrufe; Kontostand 60 s nach dem letzten Abruf |

Summen: Verbrauch seit Testbeginn bis 23.10.2026 nach dem Rollout 82.355 Units (100.000 − 17.645). Davon sechs `seo-report.mjs`-Läufe mit Leaderboard 45.672 (Leaderboard allein 45.000, fünf Wiederholungen mit identischem Ergebnis 37.500), Zusatzabfragen Phase 8 und 9 990, **Phase 10 insgesamt 952 von höchstens 5.000** (Messstand 526, 10-05 und 10-11 je 0, 10-07 426), vor dem ersten Messbericht 34.741. **Restkontingent 17.645 Units** am 23.10.2026, 16:49 UTC.

**Widerlegte Annahme:** Die Annahme aus D-27/D-28, die tägliche Projektmessung verbrauche „ca. 7.700 Units je Tag“, ist durch D-37 widerlegt: Die Abstände zwischen den Messberichten betragen je Lauf genau 7.612 Units, auch über Tagesgrenzen ohne Zuschlag, und Project-API-Abrufe kosten 0 Data-Units (MS-10 § 3.1, Belege 2 und 4). Der Lauf ohne Leaderboard in 10-07 kostete wie erwartet 112 Units. Ursache des früheren Verbrauchs war der Leaderboard-Abruf je Messbericht; seit Plan 10-05 ruft `seo-report.mjs` ihn nur noch mit dem Schalter `--leaderboard` ab.

**Offener Inhaberpunkt (Konto):** Gemini und Google AI Mode haben im KI-Tracker keine Prompts, weil das Testlimit von 20 Prompts erreicht ist. Ob sie gemessen werden, hängt von der Tarifentscheidung bis zum 03.11.2026 ab (Orchestrator bzw. Inhaber; keine Empfehlung in diesem Bericht).

## 10. Termine nach dem Meilenstein

| Termin | Aufgabe | Quelle |
|---|---|---|
| 24.10.2026 ab 16:30 UTC | 24-Stunden-Fenster `trial_click`/`ai_visit` der Etappe 10 und Endwerte der Fenster 08 und 09 nachtragen (Orchestrator) | EN „Nachtrag Etappe 10“ |
| 03.11.2026, 17:22 Uhr | Ende des SE-Ranking-Testzugangs; Tarifentscheidung vorher (Orchestrator/Inhaber), Promptlimit 20 | MS-10 § 6; D-28 |
| 03.11.2026 | OMR-Nachfassen entfällt (Profil live seit 22.10.2026); Prüfung der Profilangaben gegen llms.txt laut LINKPLAN § 7, Punkt 3 | `docs/seo/LINKPLAN.md` § 7 |
| frühestens eine Woche nach Versand | Prüfung, ob softwareabc24.de und betriebssoftware-kompass.de CraftOS aufgenommen haben | LINKPLAN § 7, Punkte 6 und 7 |
| nach Entscheidung des Orchestrators | Lückenschluss QA-06: interne Links im Hauptteil von `/impressum` (O2, O3) | RO-10 § 11 |
| 21.12.2026 | Wettbewerberangaben (Preise und Funktionen der Vergleichsseiten) nach 60 Tagen neu prüfen; Daueraufgabe nach Meilensteinende | D-31 Nr. 36, Rollout 08 § 14 |
| 01.01.2027 | Lagerfoto-Credits 2 → 3; Mobile-App-Anzeige vorher nachziehen (Inhaber, Mobile-Repo) | 10-13, PHASE-10-PRUEFUNGEN § 4.2 |
| laufend | Messung neuer seriöser verweisender Domains (SEO-08, Ziel ≥ 15) und KI-Tracker | LINKPLAN § 6 |
