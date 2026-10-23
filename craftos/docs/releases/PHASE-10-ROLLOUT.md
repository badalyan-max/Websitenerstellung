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

<!-- Entwurf §§ 1–6 (Aufgabe 1). §§ 7–15 folgen in Aufgabe 3. -->
