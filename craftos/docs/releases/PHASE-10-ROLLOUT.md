# Rollout-Nachweis Phase 10 – Abschlussaudit (Meilenstein v2.0)

Stand: 23. Oktober 2026, ab 18:13 MESZ (16:13 UTC). Grundlage: Plan 10-07 mit Orchestrator-Nachtrag D-44 (QA-04 an Vercel-Speed-Insights-Felddaten), `10-CONTEXT.md` D-01 bis D-44, globale Regel 5 (Tests nur lokal, GitHub Actions sind kein Beleg), Inhaberregel „nur nennen, was unterstützt wird“ (L-1). Zeiten in MESZ, in Klammern UTC, wo Werkzeuge UTC ausgeben.

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `e392762db18459dd850ef75cfbe96b74f7a31b4e` (`e392762`) |
| Vorheriger Stand origin/main | `87b73cee129613e691e65da3d4aa33e943349427` (`87b73ce`, Nachtrag Phase 9 vom 23.10.2026 10:19 MESZ) |
| Umfang des Pushs | 113 lokale Commits: Spuren e, c, a, b, d, f per `git merge --no-ff` (Pläne 10-01 bis 10-05, 10-08 bis 10-11, 10-13, Einrichtungsservice D-41), Integration 10-06 (inkl. D-42 und D-43), Code-Review (`10-REVIEW.md`) mit Fix-Commits (`10-REVIEW-FIX.md`), Phasen-Gate 10-12 und der Testfix dieses Plans (`e392762`). `git diff origin/main...HEAD`: 199 Dateien, 39.865 Einfügungen, 10.680 Löschungen (165 Dateien außerhalb von `.planning/`); keine Datei unter `.github/` |
| Gelöschte Dateien | 19, alle aus der Inhaberfreigabe D-42 (`0033220`): ProductDemo (`components/product-demo/**`, `lib/demo/**`), `components/ui/PageHero.tsx`, `components/ui/TrialCta.tsx`, drei nicht geladene Schriftdateien, die zugehörigen übersprungenen bzw. archivierten Demo-Specs und `tests/demo.test.ts`. Keine Seite, keine URL und kein Slug entfiel (D-01) |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.249`, Commit `bfe165e90` (`sync:product:check`: „Snapshot ist aktuell: v4.0.0-test.249 (bfe165e9)“) |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.96`, Commit `837aab4f` |

Die Produktbasis ist gegenüber `PHASE-10-PRUEFUNGEN.md` § 2.6 unverändert (kein Delta, keine Übernahme nötig).

Inhalt des Stands (Einzelheiten in `PHASE-10-PRUEFUNGEN.md` §§ 1–4): Rechner, `/support`, Rechtsseiten und 404 auf v2 (ContentKopf K1/K2, Rechner-Bento J3, Tabellen-Caption J4); FeatureSnippet-Dimmstufe und Fokusindikatoren (10-08); Gate-Seiten mit drei Schriftschnitten und Logo als SVG (10-09); Zusatzfunktionen Kassenbuch und § 13b auf `/funktionen`, als Zielkachel und im Mega-Menü (D-21, D-40); Lagerfoto-Credits mit Code-Beleg (10-13, D-22); Einrichtungsservice „kostenlos“ und Datenstandort (D-41); Aufräumen und Impressum ohne OS-Plattform mit längerem Title (D-42); GoBD-Aussage „CraftOS ist GoBD-konform“ (D-43); AGB mit „Stand: 23. Oktober 2026“ statt Vorlagenhinweis (Inhaberfreigabe, LO-06); 404 ohne geerbten Canonical, KI-Crawler in `robots.txt` ausdrücklich erlaubt; Prüfwerkzeuge `a11y-audit.mjs`, Lighthouse-Modus in `performance-audit.mjs`, `seo-report.mjs` mit Leaderboard nur auf Schalter (D-37).

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-10-Commits). Das ship-gate lief direkt nach dessen SKILL.md (`C:/Users/badal/.claude/skills/ship-gate/SKILL.md` mit `references/runtime.md`), weil das Skill-Tool in dieser Ausführung nicht zur Verfügung stand. Es lief unmittelbar vor dem einzigen Code-Push. Vorher wurde der Koordinationsstatus gelesen (23.10.2026, 16:14 UTC): `edgar` bereit (Runner 1.9.9), `edgarspc` offline bzw. veraltet. Für das Website-Repo gibt es kein Koordinationsrezept; alle Läufe lokal, nacheinander, unter `.heavy-lock`.

**Startgate (W1):** `10-12-SUMMARY.md` und `10-REVIEW.md` vorhanden, `git status --porcelain craftos` leer, Port 3100 frei. Review-Prüfung (Skript nach 10-12 Aufgabe 1): `10-REVIEW.md` enthält 6 IDs der Stufen CR/HI/ME/WR (HI-01, ME-01 bis ME-05); jede steht in `10-REVIEW-FIX.md` als „behoben“ mit Commit → bestanden.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest), Lauf 1 (16:14 UTC) | 59 Dateien, 1700/1701 – 1 Zeitlimit: `keyword-map.test.ts` „Phase-7-Detailseiten folgen den Zielwerten“ 5.613 ms > 5.000 ms (einzeln 960 ms) |
| Behebung | `e392762`: Zeitlimit dieses Falls 60 s (Muster 08-09 und 10-06 Nr. 11, dynamische Importe unter Volllast) |
| `npm test` (Vitest), Lauf 2 (16:28 UTC) | **59 Dateien, 1701/1701 bestanden** |
| `npm run lint` | 0 Probleme (beide Läufe) |
| `npm run typecheck` | 0 Fehler (beide Läufe) |
| `npm run build` | grün (Lauf 1; der Fix betrifft nur eine Testdatei) |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.249 (bfe165e9).“ |
| `node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `seo-audit.mjs`, E2E, route-/visual-audit, A11y-Matrix, Lighthouse | aus dem Phasen-Gate 10-12 übernommen (`PHASE-10-PRUEFUNGEN.md` § 5): seit Block 3 von 10-12 änderten sich nur `scripts/lib/a11y-audit-core.mjs` (Prüfwerkzeug, `5670097`), dessen Test, Dokumentation und die Testdatei dieses Plans; kein Seiten- oder Komponentencode |
| Port 3100 und Sperre | Port frei (kein Server gestartet), Sperre nach jedem Block entfernt |

**Review:** Als Standard-Review der Phase gilt der offizielle GSD-Phasenreview `10-REVIEW.md` (Tiefe standard, 107 Dateien, Bereich `87b73ce..1a355f0`; 1 High, 5 Medium, 8 Low, 3 Info). Laut `10-REVIEW-FIX.md` sind 15 Befunde behoben (HI-01, ME-01 bis ME-05, LO-01 bis LO-08, IN-01; LO-06 in 10-12 mit Inhaberfreigabe, `19dd8ed`), IN-02 und IN-03 sind begründet nicht anwendbar. Seit dem Review kamen die Fix-Commits, die Commits von 10-12 und `e392762` hinzu. Der ausführende Agent hat das Code-Delta seit dem Review (`96388c4..HEAD`, Seiten-, Komponenten-, Bibliotheks- und Prüfskriptcode) selbst gesichtet: AGB-Stand statt Vorlagenhinweis, Kommentare in Impressum/Layout/Support, `aiVisitOnce` ohne Browserspeicher (ME-04), Logo-Farbe als Hex (LO-05), Zertifikatsprüfung je Aussagesatz (LO-02), Fokus-Sichtbarkeit mit Outline-Farbe und Schattenlänge (ME-02), `pruefeGesamtlauf` am Kennzeichen (HI-01, `5670097`), `leaderboardStand` ohne Hauptdomain (LO-07), live-check-Text ohne Skript/Template (LO-03) und Kernaussagen-Block D-41/D-42/D-43. Befunde: keine. Eine unabhängige Zweitprüfung dieses Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all` unmittelbar vor dem Code-Push (23.10.2026, 18:29:32 MESZ / 16:29:32 UTC):

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github`; `git diff --name-only origin/main...HEAD | grep -c "^\.github/"` = 0. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus; kein Workflow wurde angelegt oder aktiviert, kein CI-Lauf dient als Beleg. Vor dem Doku-Push wird die Liste erneut geprüft (§ 15, SUMMARY 10-07).

## 4. Push und Vercel-Deployment

- `git fetch` vorher: origin/main ohne neue Commits (0 voraus).
- `git push origin main`: `87b73ce..e392762  main -> main` (18:29:44 MESZ, Fast-Forward, einziger Code-Push der Phase).
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment **`dpl_TBDg23xnPvC9HmED3ArQA16Vida7`**, URL https://craftos-26ipmzha4-craft-os.vercel.app, `githubCommitSha` `e392762db18459dd850ef75cfbe96b74f7a31b4e`, Branch `main`.
- Zeiten: erstellt 18:29:54 MESZ (16:29:54 UTC, 10 Sekunden nach dem Push), Build ab 16:29:55 UTC, Build-Dauer 46 s, **READY 18:30:41 MESZ (16:30:41 UTC)**.
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Ermittelt mit `vercel ls craftos --environment production`, `vercel inspect <url>` und `vercel api /v13/deployments/<id>` (Vercel-CLI 65.2.0 über `npx -y vercel@latest`, ohne `vercel link` im Repo). Die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht als aufrufbare Werkzeuge zur Verfügung.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach READY und bestandenem live-check (§ 6) ausgeführt. https://craftos.eu/sitemap.xml enthält **156 URLs**, davon 136 mit `lastmod` 2026-10-23. Ergebnis von `npm run indexnow` (18:32:30 MESZ): „IndexNow: 156 URLs gemeldet, HTTP 200“. Die Zahl entspricht der Erwartung nach D-01: Phase 10 legt keine neue Seite und keine neue URL an und lässt keinen Slug entfallen; die Sitemap hat wie nach Phase 9 genau 156 URLs (gleich `seo-audit.mjs` und `route-audit.mjs` in 10-12). Darin enthalten sind die D-41-Zielorte (`/preise`, Alternativen, `/vergleich`, `/fakten-ueber-craftos`, `/funktionen/team`, `/hilfe/daten-importieren`) und die D-43-Zielorte, deren Inhalt sich geändert hat (Restpunkt aus `PHASE-10-PRUEFUNGEN.md` § 2.2).

## 6. live-check gegen https://craftos.eu

Ausgeführt von 18:31:21 bis 18:32:14 MESZ, Exit 0:

```text
Live-Prüfung gegen https://craftos.eu
OK     /llms.txt nennt Extra-Speicher, Start-Credits, einmalig und alle Paketpreise
OK     /funktionen ohne Ankündigung
OK     /craft-ai ohne Ankündigung
OK     /vergleich ohne Ankündigung
OK     /fakten-ueber-craftos ohne Ankündigung
OK     /preise ohne Ankündigung
OK     /gobd ohne Ankündigung
OK     /vergleich/plancraft-alternative ohne Ankündigung
OK     /vergleich/craftnote-alternative ohne Ankündigung
OK     /vergleich/hero-alternative ohne Ankündigung
OK     /vergleich/tooltime-alternative ohne Ankündigung
OK     /vergleich/handwerkersoftware-kleine-betriebe ohne Ankündigung
OK     /preise nennt Extra-Speicher und Start-Credits
OK     /styleguide 200 mit meta robots noindex und X-Robots-Tag
OK     /sitemap.xml enthält /styleguide nicht
OK     JSON-LD Startseite: Offer 29.95 ohne Umsatzsteuer
OK     /funktionen/kundenportal ohne „In Prüfung“
OK     / Title, H1 und Description nach Keyword-Map
OK     /funktionen Title, H1 und Description nach Keyword-Map
OK     /app Title, H1 und Description nach Keyword-Map
OK     /funktionen/<slug> Title, H1 und Description nach Keyword-Map (22 Zeilen, je Detailseite eine)
OK     /funktionen zeigt 32 Funktionen in 6 Gruppen mit BreadcrumbList und ItemList
OK     Mega-Menü im HTML (Detaillinks, Gruppenlinks, kein role=menu)
OK     Tracking-Attribute: Anmelden mit data-track=login, CTA auf app.craftos.eu ohne
OK     Keine internen Belegpfade auf / und /funktionen
OK     FAQPage der Startseite mit genau 5 Fragen
OK     Alle bestehenden Detailseiten in der Sitemap
OK     JSON-LD der Detailseiten (BreadcrumbList 3, FAQPage ≥ 3, WebPage #webpage, kein HowTo)
OK     JSON-LD der App-Seite: MobileApplication ohne Bewertungen, FAQPage, BreadcrumbList 2
OK     Keine internen Belegpfade oder Modulnamen auf /, /funktionen, /app und allen Detailseiten
OK     Kennzeichnung der Darstellungen auf /app und allen Detailseiten („Vereinfachte Darstellung mit Beispieldaten“)
OK     llms.txt nennt alle Detailseiten und /app
OK     Keyword-Map aller Sitemap-URLs (156): Title, einzige H1 und Description = target
OK     Brotkrumen und BreadcrumbList: genau eine Navigation und ein Schema je URL außer /
OK     OG je Seite: og:image = <url>/opengraph-image und twitter:image = og:image (außer /)
OK     OG je Seite: Stichprobe Alternative, Ratgeber, Rechtsseite → 200, image/png, ≤ 300 KB
OK     FAQPage = sichtbare Fragen auf den 10 Phase-8-Seiten
OK     Kein Product/Review/AggregateRating unter /vergleich
OK     /preise beginnt mit Antwort und Tabelle (#antwort vor der ersten Tabelle, Voll- und App-Lizenz)
OK     Prompt-Anker live: jedes Ziel bis Phase 8 mit Anker und Antwort ≤ 300
OK     llms.txt nennt die neuen Seiten (vier Alternativen und kleine Betriebe)
OK     Phase-9-Pfade der Keyword-Map (20) = Wissensseiten + Anleitungen in llms.txt, alle in der Sitemap
OK     Phase-9-Seiten ohne Ankündigung (13 Gewerke-URLs und 20 Artikel)
OK     Gewerke: Antwort und Ablauf (13 URLs: #antwort ≤ 300; je Gewerk Ablauf mit Funktionslinks und FAQPage = sichtbare Fragen)
OK     Neue Anleitungen (11): 200, H1 = Map, #antwort ≤ 300, Schrittliste, kein HowTo
OK     Wissensseiten (9): #antwort ≤ 300, FAQPage = sichtbare Fragen, Quellenliste (8 mit Quellen), kein HowTo
OK     Detailseiten verlinken Anleitungen (14 Seiten, 17 Links, 15 Anleitungen)
OK     Prompt-Anker live: jedes Phase-9-Ziel mit Anker und Antwort ≤ 300
OK     Phase-10-Köpfe (7 Seiten): heller Kopf, eine BreadcrumbList, H1 = Map; Rechner mit Hinweis
OK     404: Status 404, genau ein robots-Meta mit noindex, kein Canonical, keine Brotkrumen, drei Einstiegskarten
OK     Zusatzfunktionen (D-21, D-40): /funktionen, Mega-Menü der Startseite und Zielkachel nennen Kassenbuch und § 13b
OK     Lagerfoto-Credits (D-22, 10-13): /craft-ai und /hilfe/lager-scan-app nennen die Stufen aus lib/site.ts
OK     Schriften (10-09, D-42): /impressum und 6 Gate-Seiten mit genau drei Font-Preloads, nur die drei geladenen Schnitte
OK     Analytics-Verdrahtung: Startseite mit CTA data-track="trial" und Vercel-Insights-Einbindung
OK     Einrichtungsservice und Datenstandort (D-41): Texte aus lib/einrichtung.ts und lib/datenstandort.ts an allen Zielorten
OK     Kernaussagen Phase 10 (D-41, D-42, D-43): GoBD auf /gobd, /, /fakten-ueber-craftos und in /llms.txt; Impressum ohne OS-Plattform; Einrichtung kostenlos auf /preise; Datenstandort auf /fakten-ueber-craftos
Ergebnis: alle Prüfungen OK
```

**77 Prüfungen OK, 0 FEHLER** (die 22 Detailseitenzeilen sind oben zu einer Zeile zusammengefasst), davon 8 im Phase-10-Block (Köpfe, 404, Zusatzfunktionen, Lagerfoto-Credits, Schriften, Analytics-Verdrahtung, Einrichtungsservice, Kernaussagen D-41/D-42/D-43). Gleiche Zahl wie lokal im Phasen-Gate 10-12 (77 OK). Die Phase-10-Seiten (Rechner, `/support`, Rechtsseiten, 404) sind damit live auf v2.

## 7. SE Ranking und Unit-Budget (D-26, D-27, D-37)

Kontostände über `DATA_getSubscription` mit einem Scratchpad-Skript (nutzt `createClient`/`callTool` aus `scripts/lib/se-ranking-mcp.mjs`, gibt keinen Schlüssel aus, nicht committet); „nachher“ jeweils frühestens 60 s nach dem letzten Abruf des Blocks. Protokoll: `craftos/docs/seo/data/2026-10-23-units-rollout-phase10.json`.

| Block | Inhalt | vorher (UTC) | Units vorher | nachher (UTC) | Units nachher | Verbrauch |
|---|---|---|---|---|---|---|
| A | `node scripts/se-ranking-sync.mjs --check` (Project API, 8 Aufrufe) | 16:36:05 | 18.071 | 16:37:22 | 18.071 | **0** |
| B | `DATA_recheckAudit` 485185 (standard), Status bis „finished“, `DATA_getAuditReport`, `DATA_getAuditPagesByIssue` für 3 Hinweise | 16:37:34 | 18.071 | 16:46:33 | 17.757 | **314** |
| C | `node scripts/seo-report.mjs --etappe rollout-phase10` **ohne** `--leaderboard`, genau einmal (18 MCP-Aufrufe, Skript wartet selbst 60 s) | 16:46:45 | 17.757 | 16:49:18 | 17.645 | **112** |

**Units 10-07: 426. Phasensumme Phase 10: 526 (Messstand) + 0 (10-05) + 0 (10-11) + 426 = 952 von höchstens 5.000** (Rest 4.048). Kontostand nach dem Rollout 17.645 von 100.000, Testzugang bis 03.11.2026 17:22. Kein `DATA_getAiSearchLeaderboard`, kein Lauf mit `--leaderboard`.

**Block A** (Bericht `craftos/docs/seo/reports/2026-10-23-projektabgleich-4.json`): „Soll 132 (bestehend 132, geplant 0), Projekt 157, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0, offen ohne Limit 0“ – wie erwartet keine Lücke, kein `--apply` nötig.

**Block B** (Rohdaten `craftos/docs/seo/data/2026-10-23-audit-recheck-phase10.json` und `…-audit-recheck-issues-phase10.json`): Recheck 16:37:39–16:38:14 UTC, 157 Seiten, **97/100, 0 Fehler, 13 Warnungen, 164 Hinweise, 120 bestandene Prüfpunkte**, Google-Index 62, 12 verweisende Domains. Gegen die Vorab-Basis (D-38, 0 Fehler, 13 Warnungen, 11 Hinweise): behoben `title_short` (Impressum-Title, D-42), `same_title_h1` (Map-Korrektur 10-05), `extlinks3xx` (OS-Plattform-Link entfernt, D-42); unverändert 13 × `image_no_alt` (dieselben Gewerke-URLs, Waiver D-38) und 8 × `extlinks_nofollow` (Owner decision); **neu 156 × `links_no_anchor`**: Der Logo-Link im Kopf und Fuß enthält seit 10-09 nur das SVG-Logo und trägt den Namen über `aria-label="CraftOS Startseite"`; SE Ranking wertet nur Textinhalt. Einordnung als Crawler artifact mit Beleg im Bestätigungsaudit (§ 11 und `audit-report.md`).

Danach meldete `node scripts/check-no-secrets.mjs docs/seo scripts` „OK: Schlüssel in keiner Datei“.

## 8. Analytics (trial_click, ai_visit)

Abfrage durch diesen Plan über die Vercel-CLI 65.2.0 (`vercel metrics vercel.analytics.event.count --aggregation count --group-by eventName -p prj_Vk35IwxD0U3Qtoez5a0OaKhRdlN4 -e production`, Team `craft-os`), weil die Vercel-MCP-Werkzeuge in dieser Ausführung nicht aufrufbar waren. Abfragezeitpunkt **23.10.2026, 16:51:12 UTC (18:51 MESZ)**; Rohdaten `craftos/docs/seo/data/2026-10-23-vercel-events-rollout-phase10.json`.

| Fenster | trial_click | ai_visit | login_click | Seitenaufrufe |
|---|---|---|---|---|
| ab Push 16:29 bis 16:52 UTC (Teilfenster, rund 23 Minuten) | 1 | 0 | 1 | 15 |
| 30 Tage (23.09. 16:00 bis 23.10. 17:00 UTC) | 9 | 0 | 8 | – |

`ai_visit` ist verdrahtet (`components/Analytics.tsx` mit `aiVisitOnce` aus `lib/tracking.ts`, ME-04) und trat in 30 Tagen nicht auf; Befund und Verdrahtungsprüfung wie in `ETAPPEN-NACHWEIS-V2.md` „Analytics-Kontrolle“. Live-check „Analytics-Verdrahtung“ ist OK (§ 6). **Das volle 24-Stunden-Fenster ab 23.10.2026 16:29 UTC folgt als Nachtrag des Orchestrators** in `ETAPPEN-NACHWEIS-V2.md`.

## 9. Messbericht nach dem Rollout (SEO-07)

- Frühere Berichte (alle unverändert): `2026-10-21-messbericht-ausgangsstand.md`, `…-rollout-phase05.md`, `…-rollout-phase06.md`, `2026-10-22-messbericht-rollout-phase07.md`, `2026-10-23-messbericht-rollout-phase08.md`, `2026-10-23-messbericht-rollout-phase09.md` sowie der Messstand `2026-10-23-messstand-phase10.md`.
- Etappe Phase 10: `craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase10.md` (messbericht-rollout-phase10), Rohdaten `2026-10-23-raw-rollout-phase10-*.json` (6 Dateien, **keine Leaderboard-Rohdatei**). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase10`, genau einmal, 18 MCP-Aufrufe, 112 Units.
- Kernzahlen (Vergleich mit dem Ausgangsstand 20.10.2026): bestehende Seiten 0 in den Top 10 und 2 in den Top 100 (132 gemessen; +1); Zusatz-Keywords 2 / 4 (±0); Share of Voice nicht abgerufen, letzter Wert 0,02 % vom 23.10.2026; KI-Tracker ChatGPT 6,25 % Nennung und Link, AI Overview 0 %, Perplexity nie geprüft, Gemini und AI Mode ohne Prompts; **12 verweisende Domains (±0, alle Spam), 0 aus dem Register, 0 neue seriöse**; Domain-InLink-Rank 3. Die Phase-10-Seiten sind erst seit 16:30 UTC live; Ranking- und KI-Effekte zeigen frühestens spätere Messungen.

## 10. Prüfzahlen (Phasen-Gate 10-12 und live)

Quelle lokal: `PHASE-10-PRUEFUNGEN.md` § 5 (10-12, 23.10.2026, unter `.heavy-lock`); live: dieser Plan.

| Prüfung | lokal (10-12) | live bzw. ship-gate (10-07) |
|---|---|---|
| Vitest | 59 Dateien, 1699/1699 | 59 Dateien, 1701/1701 (§ 2) |
| Lint, Typcheck | 0 / 0 | 0 / 0 |
| `seo-audit.mjs` | 156/156, 12 Regeln, 0 Verstöße | 156/156, 0 Verstöße (Build des ship-gate) |
| E2E | 467 bestanden, 0 fehlgeschlagen, 0 flaky, 161 übersprungen | übernommen (kein Seitencode seitdem) |
| `route-audit.mjs` | 156 Routen, 0 Fehler, 0 defekte Links | **live:** 156 Routen, 0 Fehler, 0 defekte Links (159 Links, 14 Assets), 10/10 unbekannte Pfade 404, 6/6 OG 200 |
| `visual-audit.mjs` | 290 Aufnahmen, 0 Status, 0 Überlauf, 0 JS, 0 A11y | – |
| live-check | 77 OK lokal | **77 OK live** (§ 6) |
| **A11y-Matrix** (DESIGN-05) | 158 Seiten, 890 Aufrufe (Chromium 790, WebKit 100) bei 360/390/768/1024/1440 px; Gate 0, Großtext 0, Tastatur 0, Status 0; keine Regel mit Befund | – |
| **Lighthouse** Accessibility | 100 auf 16 Seiten (B1–B3) | **100 auf 15 Live-URLs**, Best Practices und SEO ebenfalls 100 |
| **Lighthouse** Performance (Labordaten, mobil, Median aus 3 Läufen; nach D-44 nur Regressionsinformation) | Gate-Seiten Score 90–95, LCP 2.830–3.467 ms (lokal) | Gate-Seiten **live** Score 97–98, LCP 2.421–2.569 ms; Warnung nur `/funktionen` (LCP 2.569 ms) |
| CLS | 0 auf 21 Routen und 8 Snippet-Seiten | 0 auf allen 15 Live-URLs |
| **Felddaten (D-44)** | Stand 23.10.: n = 41, LCP p75 620 ms | **p75 LCP 564 ms (n = 58), INP 40 ms (n = 47), CLS 0 (n = 31)** |

**Lighthouse-Kontrollmessung live (D-11, kein Gate)** – Kennzeichnung: *Labordaten, mobil, live, Median aus 3 Läufen, URL* (Rechts-, Support- und Rechnerseiten: 1 Lauf), Lighthouse 13.5.0, `AUDIT_ORIGIN=https://craftos.eu`, je Block allein unter `.heavy-lock`, 16:40–16:57 UTC; Rohdaten `craftos/docs/seo/data/2026-10-23-lighthouse-live-phase10.json`:

| URL | Score | LCP (ms) | FCP (ms) | TBT (ms) | CLS | LCP-Element | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|
| `/` | 98 | 2.425 | 1.076 | 31 | 0 | `h1#startseite-titel` | 100 / 100 / 100 |
| `/funktionen` | 97 | 2.569 | 1.519 | 56 | 0 | `h1#funktionen-titel` | 100 / 100 / 100 |
| `/funktionen/angebote` | 97 | 2.432 | 1.076 | 66 | 0 | `h1#funktion-titel` | 100 / 100 / 100 |
| `/gewerke/shk` | 98 | 2.430 | 1.074 | 22 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/vergleich/handwerkersoftware-kleine-betriebe` | 98 | 2.421 | 1.071 | 64 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/blog/handwerkerrechnung-schreiben` | 97 | 2.436 | 1.076 | 64 | 0 | `h1#artikel-titel` | 100 / 100 / 100 |
| `/funktionen/zeiterfassung` | 94 | 2.807 | 1.713 | 124 | 0 | `h1#funktion-titel` | 100 / 100 / 100 |
| `/gewerke/elektriker` | 96 | 2.701 | 1.365 | 64 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/vergleich/plancraft-alternative` | 98 | 2.431 | 1.072 | 61 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/impressum` (1 Lauf) | 97 | 2.439 | 1.229 | 89 | 0 | `h1#rechtstext-titel` | 100 / 100 / 100 |
| `/datenschutz` (1 Lauf) | 97 | 2.587 | 1.524 | 16 | 0 | `p` | 100 / 100 / 100 |
| `/agb` (1 Lauf) | 98 | 2.431 | 1.072 | 32 | 0 | `p` | 100 / 100 / 100 |
| `/support` (1 Lauf) | 98 | 2.422 | 1.064 | 39 | 0 | `p.lead` | 100 / 100 / 100 |
| `/rechner` (1 Lauf) | 97 | 2.433 | 1.073 | 80 | 0 | `p.lead` | 100 / 100 / 100 |
| `/rechner/stundensatz` (1 Lauf) | 97 | 2.446 | 1.071 | 67 | 0 | `h1#rechner-titel` | 100 / 100 / 100 |

Regressionsinformation: Live liegen die sechs Gate-Seiten 409–1.035 ms unter den lokalen Laborwerten aus 10-12 (lokal `next start` mit gzip, Benchmark-Index lokal 2978, live 2822). `/funktionen/angebote` (lokal 3.467 ms, Kandidat aus 10-12) liegt live bei 2.432 ms; keine Regression erkennbar. `/funktionen/zeiterfassung` und `/gewerke/elektriker` liegen live über 2,5 s (Labordaten, kein Gate nach D-44).

## 11. Anforderungsstatus

| Anforderung | Status nach Phase 10 | Nachweis bzw. Grund |
|---|---|---|
| DESIGN-02 | **erledigt** | Phase-10-Seiten (Rechner, `/support`, Rechtsseiten, 404) live auf v2: live-check „Phase-10-Köpfe (7 Seiten)“ und „404“ OK (§ 6); Phasen-Gate 10-12 grün (§ 10); alle übrigen Vorlagen seit den Phasen 6–9 auf v2 |
| DESIGN-05 | **erledigt** | A11y-Matrix in 10-12 ohne Gate-Verstoß (158 Seiten, 890 Aufrufe, 5 Breiten, Großtext 0, Tastatur 0); Lighthouse Accessibility 100 auf 16 Seiten lokal und 15 Live-URLs |
| QA-04 | **erledigt** | D-44: Vercel Speed Insights Produktion, `--since 30d` (23.09.2026 16:00 bis 23.10.2026 20:00 UTC, Messungen ab 20.10.), abgefragt 23.10.2026 16:50 UTC: **p75 LCP 564 ms (n = 58) < 2.500, INP 40 ms (n = 47) < 200, CLS 0 (n = 31) < 0,1**. Grenze nach D-44: Stichprobe unter 100 Messungen und überwiegend vor dem Rollout erhoben; blockiert nicht. Unit-, Browser-, Routen- und visuelle Prüfungen grün (10-12). Lab-Werte aus 10-12 nur als Regressionsinformation (§ 10); kein Lückenschluss QA-04 nötig, weil keine Felddaten-Schwelle verfehlt ist |
| QA-05 | **erledigt** | `ETAPPEN-NACHWEIS-V2.md` Zeilen 05 bis 10 vollständig (Test `etappen-nachweis.test.ts` grün); Phase-10-Abfrage `trial_click`/`ai_visit` mit Zeitpunkt dokumentiert (§ 8); 24-Stunden-Fenster als Nachtrag des Orchestrators gekennzeichnet |
| QA-06 | **erledigt** (Nachtrag 23.10.2026, siehe „Nachtrag QA-06“ unten; vorher In Progress) | Bestätigungsaudit (`craftos/audit-report.md`, `audit-report-bestaetigung.html`) und Recheck 485185: **Rohwert 2, Inhaberpunkt offen 0, Wert der behebbaren Fehler 2** (O2, O3). Siehe Lückenschluss unten |
| SEO-08 | **In Progress** | Messstand 23.10.2026 16:48 UTC (MB-10): 12 verweisende Domains, alle Spam, **0 neue seriöse** (Ziel ≥ 15); omr.com live (nofollow), in SE Ranking noch nicht erfasst. Weg: `LINKPLAN.md` § 7 (Übergabe 2) |

In `.planning/REQUIREMENTS.md` werden ausschließlich DESIGN-02, DESIGN-05, QA-04 und QA-05 als erledigt markiert. QA-06 und SEO-08 bleiben „In Progress“ mit dem Grund in der Traceability. Nachtrag: QA-06 ist nach dem Hotfix unten ebenfalls als erledigt markiert; SEO-08 bleibt „In Progress“.

### Lückenschluss QA-06

| Befund | Seite | Regel (80-Punkte-Liste, Gruppe 7) | Ist (live 23.10.2026) | Soll | Besitz |
|---|---|---|---|---|---|
| O2 | `/impressum` | „3 to 5 internal links in the body“ | 1 interner Link im `<main>` (Brotkrumen „Start“) | ≥ 3 interne Links im Hauptteil | Orchestrator (Entscheidung zur Darstellung der Rechtsseite), danach Folgeplan |
| O3 | `/impressum` | „Links point at the money pages“ | kein Link auf Funktionen oder Preise | mindestens ein Link auf `/funktionen` oder `/preise` | wie O2 |

- **Herkunft:** Vorab-Audit 10-05 (Behebungsliste Nr. 5, Besitz Paket c bzw. 10-06). 10-06 hat den Punkt als Darstellungsänderung der Rechtsseite an Orchestrator/10-12 verwiesen (`PHASE-10-PRUEFUNGEN.md` § 2.2); eine Entscheidung ist nicht dokumentiert. Es ist kein Inhaberpunkt im Sinne von W4.
- **Möglicher Schluss (nicht umgesetzt, D-35):** ein Baustein unter dem Rechtstext, z. B. `LinkKarten` auf `/funktionen`, `/preise` und `/support`, in `components/legal/Legal.tsx` bzw. `app/impressum/page.tsx`. Der Rechtstext bleibt wörtlich; der Wortlaut-Test bleibt grün. Danach Bestätigung mit live-check bzw. erneutem `/audit` und erst dann QA-06 markieren.
- **Alle übrigen Vorab-Fehler sind geschlossen:** T4 (Accessibility `/impressum` 100 live), T5 (drei Font-Preloads), T6 (404 ohne Canonical, nur `noindex`), O1 (Core Web Vitals an Feldwerten grün, D-44); Inhaberpunkte I1 (ODR) und I2 (Title) mit D-42 erledigt.

### Nachtrag QA-06 (Hotfix, 23.10.2026)

Darstellungsentscheidung vom Orchestrator nach Freigabe des Inhabers („mach was du richtig findest“), umgesetzt nach dem Vorschlag oben.

- **Umsetzung:** `LegalShell` (`components/legal/Legal.tsx`) rendert unter dem Rechtstext und außerhalb von `data-rechtstext` den Abschnitt „Mehr über CraftOS“ (Fläche Warm, `SectionHeader`, `LinkKarten` Weiß, drei Spalten) mit Karten auf `/funktionen`, `/preise` und `/support`. Weil `/datenschutz` und `/agb` dieselbe Vorlage nutzen und im Hauptteil ebenfalls nur den Brotkrumen-Link hatten (dieselbe Regel verletzt, im Audit nur wegen der Stichprobe „eine Seite je Vorlage“ nicht gemeldet), gilt der Abschnitt für alle drei Rechtsseiten. Kartentexte nennen nur Unterstütztes (Quellen `lib/site.ts`, `lib/seiten/preise.ts`, `/support`).
- **Tests:** neu `tests/rechtsseiten-links.test.ts` (je Rechtsseite ≥ 3 interne Linkziele außerhalb von Brotkrumen und Rechtstext, darunter `/funktionen` und `/preise`), vor der Änderung rot (3 von 3 Fällen), danach grün. `tests/rechtstexte-wortlaut.test.ts` unverändert grün, Referenzen nicht neu erzeugt.
- **Lokal unter der Sperre:** Vitest 60 Dateien, 1.704 Tests grün; `tsc --noEmit` 0; ESLint 0; `next build` grün; `seo-audit.mjs --paths=/impressum,/datenschutz,/agb` 0 Verstöße; `a11y-audit.mjs` gezielt für die drei Seiten (Chromium und WebKit, 5 Breiten, 30 Aufrufe) 0 Gate-Verstöße, Großtext 0, Tastatur 0. Lokaler Review (superpowers-Reviewer): keine kritischen oder wichtigen Befunde; drei kleine Hinweise zum Kartentext übernommen.
- **Ship:** Commit `f9cd7f2` (`fix(qa-06): …`), `gh workflow list --all` nur „Dependabot Updates“, Push `b770f73..f9cd7f2  main -> main`. Vercel Production-Deployment **`dpl_4mocbo1txgWCzCJJSAxXapNmEMnq`** (https://craftos-b3gsyx77c-craft-os.vercel.app, `githubCommitSha` `f9cd7f2…`), erstellt 17:24:02 UTC, **READY 17:24:39 UTC**, Aliase craftos.eu und www.craftos.eu.
- **Live:** `LIVE_ORIGIN=https://craftos.eu node scripts/live-check.mjs` → „alle Prüfungen OK“. Live-HTML `<main>` von `/impressum`, `/datenschutz` und `/agb`: je **4 interne Links** (`/`, `/funktionen`, `/preise`, `/support`) statt 1 → O2 und O3 geschlossen.
- **SE Ranking, Recheck 485185 (standard):** gestartet 17:26:17 UTC, fertig 17:26:53 UTC, 157 Seiten, **97/100, 0 Fehler**, 13 Warnungen (`image_no_alt`, Waiver D-38), 164 Hinweise, 120 bestandene Prüfpunkte – unverändert gegenüber Block B in § 7. Kontostand vorher 17.645 (17:26 UTC), 60 s nach dem Abschluss (17:28:20 UTC) 17.331: **Verbrauch 314 Units**. Phasensumme Phase 10 damit 952 + 314 = **1.266 von höchstens 5.000** (Rest 3.734). Kein Leaderboard-Abruf.
- **Ergebnis:** Rohwert der behebbaren Fehler **0** (O2 und O3 live geschlossen, SE Ranking 0 Fehler, Inhaberpunkte 0). **QA-06 erledigt**, in `.planning/REQUIREMENTS.md` markiert (Traceability mit diesem Beleg).

## 12. Umgestellte Seiten, neue Bausteinvarianten und Menü-Präsenz

**Umgestellte Seiten (keine neue URL, kein entfallener Slug, D-01):**

| Seite | Früher | Jetzt |
|---|---|---|
| `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation` | dunkler Seitenkopf, `CalculatorCta` | ContentKopf K1 (hell, Antwort zuerst, Hinweis ≤ 80 Zeichen), Rechner-Bento J3 mit Bodenausrichtung, CtaBand; `CalculatorCta` entfernt (D-42) |
| `/support` | `PageHero` aus `components/ui` | ContentKopf, Kontaktweg, Hilfe und Ratgeber als Karten, CtaBand; `PageHero` entfernt (D-42) |
| `/impressum`, `/datenschutz`, `/agb` | Rechtsseiten-Kopf mit schwachem Linkkontrast | ContentKopf K2, Prosa-Fläche mit Kontrast ≥ 4,5 : 1; Impressum ohne OS-Plattform, Title „Impressum – CraftOS Handwerkersoftware“ (D-42); AGB mit „Stand: 23. Oktober 2026“ statt Vorlagenhinweis; Datenschutzerklärung überarbeitet (`476c1a0`) |
| 404 | erbte Root-Canonical und zwei robots-Metas | eigene Metadaten: kein Canonical, nur `noindex`, drei Einstiegskarten `/`, `/hilfe`, `/funktionen` |

**Neue Bausteinvarianten:** ContentKopf K1/K2 mit `TEXT_BUDGET.contentKopf.hinweis = 80` (`components/v2/budgets.ts`), Rechner-Bento J3 (Bodenausrichtung, neue Kachelhöhen als Sollwert für `/funktionen/rechnungen`, K-8), Tabellen-Caption J4 bei 360 px, FeatureSnippet-Dimmstufe (10-08), Fokusindikator-Prüfung (`a11y-audit.mjs`), Logo als SVG ohne Clash 700/General 500 (10-09). Nachweis in `docs/DESIGN-V2.md` § 19.5–§ 19.9.

**Menü-Präsenz der Zusatzfunktionen (D-21, D-40):** Kassenbuch und Rechnung nach § 13b erscheinen auf `/funktionen`, als Kachel an der Zielseite und im Mega-Menü („Weitere Funktionen“ je Gruppe, zehn Links; `2a8936d`). Live geprüft: live-check „Zusatzfunktionen (D-21, D-40)“ OK.

**Weitere Inhalte:** Einrichtungsservice „kostenlos“ und Datenstandort an allen D-41-Zielorten, GoBD-Aussage „CraftOS ist GoBD-konform“ (D-43), Lagerfoto-Credits mit Code-Beleg (10-13); alle live-check-Blöcke OK.

## 13. Offene Inhaberpunkte

1. **Höhe des Mega-Menüs bei 900 px:** Das Panel ist mit den Zusatzfunktionen höher als ein 900-px-Viewport (986 px Inhalt bei 795 px sichtbarer Höhe) und scrollt intern; Option bei Bedarf: kompaktere Zusatzliste.
2. **Weitere Altklassen** in `app/globals.css` (`.craft-page-hero`, `.craft-watermark`, `.section-title`, `.rule-list`, `.notice`): nach D-42 ungenutzt, nicht auf der Freigabeliste – „Freigabe zum Entfernen nötig“ (`PHASE-10-PRUEFUNGEN.md` § 4.1). Gelöscht wurde nichts.
3. **App-Repo:** Die Datenschutzerklärung von 12/2024 mit Cookie-Text und Brevo-Anschrift ist uneinheitlich (Produkt-Repo, kein Website-Auftrag).
4. **Mobile-App:** Lagerfoto-Credits 2 → 3 ab 01.01.2027; die Anzeige in der Mobile-App vorher nachziehen (10-13).
5. **R2 ohne EU-Jurisdiktion** (Produkt-Repo; Bezug zum Satz „Server in der EU“, ausdrücklich nicht Teil von D-42).
6. **SE-Ranking-Tarif** bis 03.11.2026 (Testzugang; Promptlimit 20, Gemini und AI Mode ohne Prompts).
7. **Linkaufbau:** Übergabe 2 im `docs/seo/LINKPLAN.md` § 7 (Portal-Anmeldungen und Bewertungen, SEO-08).

Erledigt und deshalb nicht mehr in der Liste: **ProductDemo** „archivieren oder löschen?“ (D-42, gelöscht nach Freigabe in `0033220`, im Git-Verlauf abrufbar); **ODR-Satz und kurzer Title im Impressum** (D-42; die Zeile „Inhaberpunkt offen“ der QA-06-Zählung ist damit 0); Datenschutzerklärung und AGB-Vorlagenhinweis (Inhaberanweisung, `476c1a0`, `19dd8ed`). Die übrigen Inhaberpunkte aus `PHASE-10-PRUEFUNGEN.md` § 4.2 (**Kundenportal**-Befunde, „§ 5 DDG“, Silbentrennung in Safari, UWG- und Rechtsfakten, Sichtung der Screenshots) sind nicht in der Vorgabeliste des Orchestrators vom 23.10.2026 enthalten und stehen dort unverändert.

**Inhaberliste „Freigabe zum Entfernen nötig“ – Endstand** (`PHASE-10-PRUEFUNGEN.md` § 4.1): `PageHero`, `CalculatorCta`, acht Altklassen samt `TrialCta`, Schriftdateien Clash 500/700 und General 500, ProductDemo samt `lib/demo` – entfernt mit D-42 (`0033220`); offen nur die fünf weiteren Altklassen (Punkt 2).

## 14. Auslegungen

a. **Paketzuschnitt:** Phase 10 lief in 13 Plänen und 5 Wellen: Teilpläne 10-01 bis 10-05 und 10-08 bis 10-11 sowie 10-13 in den Spuren a–e (Worktrees `wt-10<x>`), Zusatzspur f (Einrichtungsservice, D-41), Integration 10-06, Phasen-Gate 10-12, Rollout 10-07. Zwischen 10-06 und 10-12 liefen Code-Review (`10-REVIEW.md`) und Fixer (`10-REVIEW-FIX.md`) des Orchestrators.
b. **D-37 ersetzt die Verbrauchsannahme aus D-27:** Der Verbrauch stammte aus dem Leaderboard (7.500 je Abruf), nicht aus der täglichen Projektmessung; der Rollout lief ohne Leaderboard (426 statt geplant ≈ 640 Units, weil Block A 0 kostete und der Recheck genau 314).
c. **D-38 als Vorab-Basis** statt eines neuen Vorab-Audits: Messstand und Audit 485185 vom 23.10.2026 (0 Fehler) sind die Basis des Rechecks.
d. **Menü-Präsenz der Zusatzfunktionen nach D-21/D-40 in 10-06 umgesetzt** (Dateieigentum Spur a); Paket d ließ `MegaMenu.tsx` unverändert und übergab den Punkt.
e. **Credit-Wert mit Code-Beleg angezeigt (D-22, 10-13):** Werte aus `aiPricing.ts` in `lib/site.ts`; der Satz im Hilfeartikel `lager-scan-app` ist eine ausdrücklich beauftragte Ausnahme von D-04 (Kopierregel).
f. **QA-06-Fehlerdefinition mit Zeile „Inhaberpunkt offen“ (W4):** Inhaberpunkte zählen nur im Rohwert. Im Bestätigungsaudit ist diese Zeile 0. „Loads fast (Core Web Vitals in the green)“ wird nach D-44 an Feldwerten bewertet; Labordaten sind nur Regressionsinformation. Der neue SE-Ranking-Hinweis `links_no_anchor` ist ein Hinweis (kein Audit-Fehler) und betrifft keinen Link im Hauptteil; er ist als Crawler artifact mit Beleg gewaivt.
g. **Konfliktentscheidungen K-1 bis K-15** (10-PATTERNS): K-1 Paritätstest `product-register` in Paket b vor d; K-2 `/support` als async Seite; K-3 Logo im eigenen Test von b; K-4 Schrift-Merge-Reihenfolge; K-5 `checkedAt` über `lib/funktionen.ts`; K-6 Lagerfoto-Credit-Wert als Plan 10-13; K-7 gemeinsame Komponententests; K-8 B10-Neumessung in 10-06; K-9 `a11y.pw.cjs` in `testMatch`; K-10 erwartete 404-Status in den Audits; K-11 feste Namen für den Bestandsmodus; K-12 Nachweise in `DESIGN-V2.md` § 19; K-13 Kommentare zur Menü-Präsenz; K-14 Preis-Scan der neuen Nutzensätze; K-15 Sitemap-Daten durch 10-06. Merge-Reihenfolge **e → c → a → b → d** (B1, K-4, K-1), f nach d (`PHASE-10-PRUEFUNGEN.md` § 1).
h. **D-31-Tabelle mit Endstand** (`PHASE-10-PRUEFUNGEN.md` § 3, 40 Punkte, unverändert übernommen): erledigt 23 (Nr. 1, 2, 4, 5, 7, 8, 9, 11–17, 19, 20, 22–27, 40; darunter Nr. 25 ProductDemo mit D-42), Nr. 39 Ursache erledigt und Tarif offen, teilweise erledigt 2 (Nr. 32 Analytics, Nr. 37 Datenschutz/„§ 5 DDG“), Inhaber 7 (Nr. 18, 21, 31, 33, 34, 35, 38), nicht in diesem Meilenstein 7 (Nr. 3, 6, 10, 28, 29, 30, 36; Nr. 36 als Termin 21.12.2026). Nr. 32 für Phase 10: Abfrage nach dem Rollout in § 8 dokumentiert; das 24-Stunden-Fenster folgt als Nachtrag, der Punkt bleibt deshalb „teilweise erledigt“.
i. **Testfix im ship-gate:** Der Zeitlimit-Fall in `keyword-map.test.ts` (5,6 s unter Volllast) wurde nach dem Muster 08-09/10-06 auf 60 s gesetzt (`e392762`); die Prüfung selbst ist unverändert.
j. **Bestätigungsaudit mit Live-Routenprüfung:** `route-audit.mjs` lief gegen https://craftos.eu statt gegen einen lokalen Server; `seo-audit.mjs` liest den Build des ship-gate (gleicher Seitencode wie live).

## 15. Doku-Push

Vor dem zweiten Push (dieser Nachweis, Messbericht `rollout-phase10` mit Rohdaten, Projektabgleich, Recheck- und Lighthouse-Rohdaten, Speed-Insights- und Analytics-Abfrage, Bestätigungsaudit in `audit-report.md` und `audit-report-bestaetigung.html`, Linkregister, Etappenzeile 10, Endfassung `MEILENSTEIN-V2-ABSCHLUSS.md`, SUMMARY 10-07, STATE, ROADMAP, REQUIREMENTS) laufen das ship-gate über den reinen Doku-Diff (`check-no-secrets` für `docs` und `../.planning`, Prüfbefehl des Plans, `etappen-nachweis.test.ts`, `backlink-plan.test.ts`) und erneut `gh workflow list --all` mit derselben Abbruchregel; beide Ausgaben stehen im SUMMARY 10-07. Es gibt genau zwei Pushes (Code und Doku), keinen dritten.
