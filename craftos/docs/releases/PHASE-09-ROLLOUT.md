# Rollout-Nachweis Phase 9 – Gewerke und Wissensinhalte

Stand: 23. Oktober 2026, 08:55–09:50 (MESZ). Freigabe des Inhabers für die Fertigstellung aller restlichen Phasen ohne Rückfragen am 21.10.2026 („ja mach einfach bis du sie alle fertig hast“). Grundlage: Plan 09-10 (D-24, D-25, D-29, D-30), globale Regel 5 (Tests nur lokal), Inhaberregel „nur nennen, was unterstützt wird“ (L-1).

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `25bad34f7f787bac891ef157b6e0fac2219caf40` (`25bad34`) |
| Vorheriger Stand origin/main | `d778c3140cf5ef078036b76835e966bbdef05f18` (`d778c31`, Craft-AI-Hotfix vom 23.10.2026) |
| Umfang des Pushs | 130 lokale Commits: Pläne 09-01 bis 09-09 und 09-11 bis 09-18 (sieben Wellen, Spuren aus den Worktrees `wt-09<x>` per Merge übernommen), Code-Review (`09-REVIEW.md`) mit 22 Fix-Commits (`09-REVIEW-FIX.md`), Phasen-Gate 09-16 und fünf Commits dieses Plans (Produktabgleich `60e7eab`, Offline-Formulierung `a31c1a8`, `47b3483`, `3202cb4`, live-check `25bad34`). `git diff origin/main...HEAD`: 190 Dateien, 15.669 Einfügungen, 2.395 Löschungen (167 Dateien außerhalb von `.planning/`); keine Datei unter `.github/`, keine gelöschte Datei |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.248`, Commit `1f704236ed5493e3fbd3f181ce17f704ee29e627` |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.96`, Commit `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` |

**Produktbasis im Verlauf der Phase:** Recherchebasis Web `a9319e5` (test.241) und Mobile `6cac366`; in 09-15 eingefroren auf Web `6686d05e` (test.245) und Mobile `837aab4f` (test.96), siehe `docs/content-pruefung/09-basis.md`; in 09-09 nach Delta-Prüfung auf Web `a0e27c42` (test.246) gehoben, siehe `docs/content-pruefung/09-integration.md` § 3; in diesem Plan auf Web `1f704236` (test.248).

**Produktabgleich in diesem Plan (`60e7eab`):** Delta `a0e27c42..1f704236` (vier Commits): Status „Fertiggestellt“ im Editorkopf und im Statusfeld der Dokumentansicht, gefilterte Dokumentliste lädt bei leerem Ergebnis nach, Nachladen bei der Suche entprellt. `src/lib` und `supabase` sind unverändert, keine der 43 Belegdateien aus `product-source-snapshot.json` hat sich geändert. `npm run sync:product` ergab identische Preise, Credits und Testphase; geändert haben sich nur Tag, Commit und Lesezeitpunkt. `productBasis.web`, `product-source-snapshot.json` und `PRODUCT-REGISTER.md` sind angehoben. Damit ist der in `09-REVIEW-FIX.md` (Produktbefund 2) gemeldete rote Test „Snapshot ist aktuell“ wieder grün. Der Tag `v4.0.0-test.248` lag lokal zunächst nicht vor und wurde gezielt vom Remote geholt (nur Tag-Refs). Mobile `origin/release` ist unverändert. **Für Phase 10:** Das Delta bringt keine neue Live-Funktion und berührt keine Website-Aussage. Der Angebotsstatus „Fertiggestellt“ ist jetzt auch im Editorkopf sichtbar; die Mini-UI-Statusnamen der Website (`MINI_STATUS_BELEGE`) führen ihn bisher nicht, eine Aufnahme ist optional.

**Positive Offline-Formulierung in diesem Plan (`a31c1a8`, `47b3483`, `3202cb4`):** Die Startseiten-FAQ („Teilweise: …“), die `/app`-Kennzahl und -Note („Offline teilweise nutzbar“), die `/app`-FAQ, die FAQ auf `/funktionen/zeiterfassung` und der `/app`-Eintrag in `llms.txt` („nur teilweise nutzbar“) zählen jetzt auf, was die Mobile-App ohne Empfang erfasst und danach überträgt: „Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge“, dazu „bis zu 24 Stunden“ Offline-Bereitschaft geladener Projekte (09-REVIEW ME-02). Quelle ist der neue Registereintrag `mobileOffline.erfassung` mit je einem Beleg am Mobile-Release (`useOfflineMutation` in `useTimeEntries`, `useConstructionReports`, `useDefects`, `useRoomMeasurements`, `useVacationRequests`; Test liest die Dateien am gepinnten Commit). `/fakten-ueber-craftos` nutzt dieselbe Quelle statt einer eigenen Kopie. Tests: Startseiten- und `/app`-FAQ ohne „Teilweise“, mit Aufzählung und Frist; keine Detailseiten-FAQ beginnt mit „Nein“ oder „Teilweise“ (rot mit der Zeiterfassungs-FAQ, danach grün).

Inhalt des Stands: zwölf Gewerke-Seiten und `/gewerke` auf der neuen Vorlage (Antwort zuerst, Ablauf als StepFlow mit Links auf die Funktionsseiten, Beispielkachel, FAQ); 84 Artikel (30 Ratgeber, 54 Hilfeartikel) auf der neuen Artikelvorlage (Kopf mit Antwort, Inhaltsverzeichnis, Schrittlisten, Funktionskarten, Weiterlesen), davon 20 neu: neun Wissensseiten (SEO-09) und elf Anleitungen zu neuen Live-Funktionen inklusive Kassenbuch (CONTENT-04, D-32); alle 64 Bestandsartikel gegen den Release geprüft und korrigiert (CONTENT-03, Prüfdateien `docs/content-pruefung/09-a.md` bis `09-g.md`); Übersichten `/blog`, `/hilfe` und Kategorien neu gegliedert; Detailseiten verlinken ihre Anleitungen; `llms.txt` mit den Abschnitten „Wissensseiten“ und „Anleitungen zu neuen Funktionen“; Sitemap-`lastmod` aus `updatedAt` bzw. `GEWERKE_STAND` (2026-10-23).

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-9-Commits). Das ship-gate lief direkt nach dessen SKILL.md (`C:/Users/badal/.claude/skills/ship-gate/SKILL.md` mit `references/runtime.md`), weil das Skill-Tool in dieser Ausführung nicht zur Verfügung stand. Es lief einmal unmittelbar vor dem einzigen Code-Push. Vorher wurde der Koordinationsstatus gelesen (23.10.2026, 07:08 UTC): `edgar` belegt (Runner 1.9.9, Web-Aufträge des Produkts), `edgarspc` offline bzw. veraltet. Für das Website-Repo gibt es kein Koordinationsrezept (Lücke). Die Prüfungen liefen daher lokal unter der Sperre `.heavy-lock` nacheinander mit genau einem schweren Prozess.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest) | 45 Dateien, 1347/1347 bestanden |
| `npm run lint` | grün (0 Befunde) |
| `npm run typecheck` | grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.248 (1f704236).“ |
| `node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `npm run build` | grün, alle Seiten und OG-Bilder statisch |
| `node scripts/seo-audit.mjs` (vollständig, streng, `MSYS_NO_PATHCONV=1`) | 156 von 156 Sitemap-URLs, 12 Regeln, 0 Verstöße |
| `npm run test:e2e` gegen `next start -p 3100` (Chromium/WebKit, alle testMatch-Dateien) | 488 Fälle: 393 bestanden, 0 fehlgeschlagen, 0 flaky, 95 übersprungen (projektgebundene Skips), Laufzeit 11,6 min; keine Einzelwiederholung nötig |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 (156 Routen, 0 Fehler, 0 defekte Links bei 159 Links, 14 Assets, unbekannte Pfade 404) |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 69/69 OK (Phase 5 bis Phase 9) |
| Abdeckungstabelle (§ 10) gegen `localhost:3100` | 34 von 34 Ankern vorhanden, Antwort ≤ 300 |
| Port 3100 nach den Läufen | frei (Server über die eigene PID beendet), Sperre entfernt |

Der erste Gate-Lauf brach vor dem Build ab: Die neue `/app`-Offline-Antwort hatte 358 von 300 zulässigen Zeichen (`faq.answerCentral`). Korrigiert in `3202cb4`, danach lief das Gate vollständig. Der erste lokale live-check meldete `/blog/materialliste-vorlage` ohne Quellenliste. Der Artikel führt laut `09-g.md` bewusst `sources: []` (keine Rechtsfakten). Die Prüfung verlangt die Quellenliste deshalb nur bei Artikeln mit Quellen im Frontmatter; danach 69/69 (`25bad34`, betrifft nur das Prüfskript, nicht den Build).

Review: Als Standard-Review der Phase gilt der offizielle GSD-Phasenreview `09-REVIEW.md` (Tiefe deep, 56 Dateien, Basis `d778c31`; 1 High, 4 Medium, 10 Low, 9 Info). Laut `09-REVIEW-FIX.md` sind alle 23 Befunde mit Handlungsbedarf behoben (HI-01, ME-01 bis ME-04, LO-01 bis LO-10, IN-01 bis IN-08), IN-09 ist eine Bestätigung ohne Befund. Seit dem Review-Fix (`5cd34e3`) kamen die fünf Commits dieses Plans hinzu (15 Dateien, 240 Einfügungen, 41 Löschungen). Der ausführende Agent hat dieses Delta selbst gesichtet: Register-Pins und Hashes gegen den Release, Offline-Aussagen gegen die Hilfe `mobile-offline-synchronisierung` und ME-02 (Frist), neue live-check-Blöcke gegen die Keyword-Map und `llms.txt`. Befunde nach dem Gate-Lauf: keine. Eine unabhängige Zweitprüfung dieses kleinen Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all` beim Vorbereiten (23.10.2026, 09:08:47 MESZ) und unmittelbar vor dem Code-Push (09:25:14 MESZ), beide gleich:

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github`, und der Diff ändert nichts unter `.github`. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus. Es wurde kein Workflow angelegt oder aktiviert, und kein CI-Lauf dient als Beleg. Vor dem Doku-Push mit diesem Nachweis wurde die Liste erneut geprüft (SUMMARY 09-10).

## 4. Push und Vercel-Deployment

- `git push origin main`: `d778c31..25bad34  main -> main` (09:25:21 MESZ, Fast-Forward, einziger Code-Push der Phase).
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment `dpl_HxdXfEzGz7jUw8rcdQFFj2Pvvu7F`, URL https://craftos-nkymc22dj-craft-os.vercel.app, Status **READY** (Build-Log: „Cloning … Branch: main, Commit: 25bad34“, Build 21 s, Deployment 31 s, erstellt 23.10.2026 09:25:32 MESZ, 11 Sekunden nach dem Push).
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Ermittelt mit `vercel ls craftos --scope craft-os -m githubCommitSha=…` und `vercel inspect … --logs` (Vercel-CLI 50.1.3, ohne `vercel link` im Repo). Die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach bestätigtem Live-Stand ausgeführt (live-check § 6, Sitemap). https://craftos.eu/sitemap.xml enthält 156 URLs, davon 124 mit `lastmod` 2026-10-23 (Artikel mit `updatedAt` vom Tag, Gewerke, Übersichten und Kategorien). Ergebnis von `npm run indexnow` (09:36:38 MESZ): „IndexNow: 156 URLs gemeldet, HTTP 200“. Die Anzahl entspricht der Erwartung: 136 URLs nach Phase 8 plus 19 neue Artikel-URLs laut Plan plus `/hilfe/kassenbuch-fuehren` (D-32, in 09-09 veröffentlicht) = 156.

## 6. live-check gegen https://craftos.eu

Ausgeführt um 09:35:16 MESZ:

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
OK     /funktionen zeigt 30 Funktionen in 6 Gruppen mit BreadcrumbList und ItemList
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
OK     Detailseiten verlinken Anleitungen (kundenportal, mahnwesen, bankabgleich, datenuebernahme)
OK     Prompt-Anker live: jedes Phase-9-Ziel mit Anker und Antwort ≤ 300
Ergebnis: alle Prüfungen OK
```

69 Prüfungen (die 22 Detailseitenzeilen sind oben zu einer Zeile zusammengefasst), davon 7 neu in Phase 9. Die Bestandsprüfungen sind unverändert. Pfade stammen aus `/sitemap.xml` (Gewerke), aus `docs/seo/keyword-map.json` (`phase: 9`) und aus den Abschnitten „### Wissensseiten“ und „### Anleitungen zu neuen Funktionen“ der ausgelieferten `/llms.txt`. Die erste Phase-9-Prüfung verlangt, dass beide Quellen übereinstimmen. Keine Seitenzahl ist fest kodiert. Antworten prüft `anchorAnswer` aus `scripts/lib/seo-audit-core.mjs` (dieselbe Funktion wie seo-audit). Die Ablaufprüfung verlangt auf jeder Gewerke-Detailseite einen Abschnitt `data-abschnitt="ablauf"` mit Links auf `/funktionen/…`, die in der Sitemap stehen. `/gewerke` selbst hat laut 09-UI-SPEC keinen Ablauf und keine FAQ; dort gilt nur die Antwortregel. Die Schrittliste ist eine geordnete Liste im Artikeltext. Die Quellenliste ist `<ol aria-label="Quellen">`. Ob ein Artikel Quellen führt, liest die Prüfung aus dem Frontmatter (`sources`).

## 7. SE-Ranking-Abgleich und Unit-Budget (D-25)

Units vorher und nachher wurden mit einem kleinen Skript im Sitzungs-Scratchpad über `DATA_getSubscription` gelesen (nutzt `createClient`/`callTool` aus `scripts/lib/se-ranking-mcp.mjs`, gibt keinen Schlüssel aus, nicht committet):

| Block | Zeitpunkt vorher (MESZ) | Units vorher | Zeitpunkt nachher (MESZ) | Units nachher | Verbrauch |
|---|---|---|---|---|---|
| A `node scripts/se-ranking-sync.mjs --check` | 09:36:50 | 26.209 | 09:37:08 | 26.209 | 0 |
| B `--apply` (ohne `--retarget`) und erneutes `--check` | 09:37:53 | 26.209 | 09:38:18 | 26.209 | 0 |
| C `node scripts/seo-report.mjs --etappe rollout-phase09` (einmal) | 09:38:28 | 26.209 | 09:38:46 | 26.209 | 0 |

Limit 100.000 Units, Testzugang bis 03.11.2026.

**Block A** (8 MCP-Aufrufe, Bericht `craftos/docs/seo/reports/2026-10-23-projektabgleich-2.json`):

```text
Soll 132 (bestehend 132, geplant 0), Projekt 151, fehlend 6, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0, offen ohne Limit 6
```

Fehlend waren genau die neuen Hauptkeywords „mahnstufen“ (`/hilfe/mahnwesen-einrichten`), „camt 053“ (`/hilfe/bankumsaetze-abgleichen`), „datenübernahme“ (`/hilfe/daten-importieren`), „datanorm“ (`/hilfe/datanorm-katalog-importieren`), „lager app“ (`/hilfe/lager-scan-app`) und „digitales kassenbuch“ (`/hilfe/kassenbuch-fuehren`, D-32).

**Block B** (Bedingung des Plans erfüllt: die genannten Hauptkeywords fehlten, und der Phasenverbrauch blieb unter 4.000; das Hinzufügen kostete schon in 05-07 kein Unit-Kontingent): `--apply` (3 MCP-Aufrufe, Protokoll `2026-10-23-projektabgleich-apply.json`): „hinzugefügt 6, Zielseite angeglichen 0, Limits 0, fehlgeschlagen 0“. Danach `--check` (8 Aufrufe, `2026-10-23-projektabgleich-3.json`): „Soll 132 (bestehend 132, geplant 0), Projekt 157, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0, offen ohne Limit 0“. Am Projekt wurde sonst nichts geändert (kein `--retarget`, keine Löschung).

**Phasensumme:** Recherche 750 Units (34.671 → 33.921, vor dem Phase-8-Rollout), 09-01 0, 09-09 0 (Kassenbuch-Kennzahlen), 09-10 0, zusammen **750 Units ≤ 4.000**. **Hinweis zum Kontostand:** Zwischen dem Phase-8-Rollout (33.921 um 01:14 MESZ) und 09-09 (26.309 um etwa 06:00 MESZ) sank der Kontostand um 7.612 Units und bis zu diesem Plan um weitere 100 auf 26.209. In diesem Zeitraum lief laut den SUMMARY-Dateien kein Abruf eines Phase-9-Skripts. Annahme: Die Units verbraucht die tägliche Positionsprüfung und KI-Suche des Projekts 13094375 im SE-Ranking-Konto selbst. Belegt ist das nicht; Inhaberaktion in § 13.

Danach meldete `node scripts/check-no-secrets.mjs docs/seo scripts` „OK: Schlüssel in keiner Datei“.

## 8. Analytics (trial_click, ai_visit)

Die Ereignisse sind im Code verdrahtet: `trial_click` und `login_click` über `lib/tracking.ts` (`classifyAppLink`), `ai_visit` in `components/Analytics.tsx`. Der live-check bestätigt `data-track="login"` am Link „Anmelden“ und CTA-Links auf app.craftos.eu ohne dieses Attribut. Live liefert `/_vercel/insights/script.js` HTTP 200 (`application/javascript`); Web Analytics ist also aktiv. Eine Zählung der letzten 24 Stunden war nicht möglich: Die Vercel-CLI 50.1.3 hat keinen Analytics-Befehl, und die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung. Diese Prüfung ist daher eine Inhaberaktion:

1. Vercel-Dashboard → Projekt `craftos` → Analytics → Reiter „Events“ öffnen.
2. Zeitraum „Last 24 hours“ wählen (frühestens 24 Stunden nach 09:26 MESZ am 23.10.2026 aussagekräftig).
3. Prüfen, dass `trial_click` und `ai_visit` weiterhin in der Ereignisliste erscheinen. Zahlen bei Bedarf in diesem Abschnitt nachtragen.

## 9. Messbericht nach dem Rollout (SEO-07)

- Frühere Berichte (alle unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`, `2026-10-21-messbericht-rollout-phase05.md`, `2026-10-21-messbericht-rollout-phase06.md`, `2026-10-22-messbericht-rollout-phase07.md`, `2026-10-23-messbericht-rollout-phase08.md`
- Etappe Phase 9: `craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase09.md`, Rohdaten `2026-10-23-raw-rollout-phase09-*.json` (6 Dateien). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase09`, genau einmal ausgeführt, 8 MCP-Aufrufe, 0 Units.
- Kernzahlen (Vergleich mit dem Ausgangsstand 20.10.2026): bestehende Seiten 0 Keywords in den Top 10 und 2 in den Top 100 (127 gemessen; +1 in den Top 100); geplante Seiten 0/0 (0 gemessen, keine geplanten Seiten mehr); Zusatz-Keywords 2 in den Top 10 und 4 in den Top 100 (±0); Share of Voice CraftOS in KI-Suchen 0,02 % (±0); 12 verweisende Domains (±0, alle Spam laut Befund); Domain InLink Rank 3. Die Phase-9-Seiten sind erst wenige Minuten live; die sechs neu aufgenommenen Keywords erhalten ihre erste Messung mit der nächsten täglichen Prüfung. Ranking- und KI-Effekte zeigt frühestens die Etappenmessung der Phase 10.

## 10. Abdeckungstabelle „Thema → Zielseite/Anker → Audit“ mit Live-Ergebnis (W11)

Quelle der Zeilen: `docs/content-pruefung/09-integration.md` § 7. Audit-Kürzel: **SA** = `scripts/seo-audit.mjs`, **RA** = `scripts/route-audit.mjs`, **CT** = `tests/content.test.ts`, **FD** = `tests/funktionsdetails.test.ts`, **AP** = `tests/ai-prompts.test.ts`, **GW** = `tests/gewerke.test.ts`, **APP** = `tests/app-seite.test.ts`. Lokal (Phasen-Gate 09-16 und dieser Plan) waren alle Zeilen grün: SA 0 Verstöße über 156 URLs, RA 0 Fehler, Anker im Build, Tests grün. Live geprüft um 09:35 MESZ mit einem Scratchpad-Skript: HTTP-Status, Anker vorhanden, Antwort nach der Anker-Konvention (`anchorAnswer`, ≤ 300 Zeichen), FAQPage = sichtbare Fragen, falls die Seite FAQPage führt. Ergebnis: **34 von 34 Ankern live OK**.

#### SEO-09-Themen

| Thema | Zielseite/Anker | Audit | Live-Ergebnis (craftos.eu, 23.10.2026) |
|---|---|---|---|
| Leistungszeitraum auf der Rechnung | `/hilfe/leistungszeitraum-rechnung#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 282, FAQPage = sichtbar |
| Regiebericht | `/hilfe/regiebericht#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 257, FAQPage = sichtbar |
| Bedenkenanzeige | `/hilfe/bedenkenanzeige#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 295, FAQPage = sichtbar |
| Mängelanzeige | `/blog/maengelanzeige#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 282, FAQPage = sichtbar |
| Reverse Charge bei Bauleistungen | `/blog/reverse-charge-bauleistungen#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 269, FAQPage = sichtbar |
| GAEB-Formate | `/blog/gaeb-formate#antwort` | SA antwort, faq-schema; L-1 Fachteil-Ausnahme (`content-produktwahrheit`) | live OK: HTTP 200, Anker, Antwort 251, FAQPage = sichtbar |
| Materialliste-Vorlage | `/blog/materialliste-vorlage#antwort` | SA antwort; CT | live OK: HTTP 200, Anker, Antwort 256, FAQPage = sichtbar |
| Bauablaufplan | `/blog/bauablaufplan#antwort` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 272, FAQPage = sichtbar |
| Arbeitszeitnachweis-Vorlage | `/blog/arbeitszeitnachweis-vorlage#antwort` | SA antwort; CT | live OK: HTTP 200, Anker, Antwort 274, FAQPage = sichtbar |
| Gewerke-Software | `/gewerke#antwort` | SA antwort, h1, map; GW | live OK: HTTP 200, Anker, Antwort 236 |
| Prompt Elektro | `/gewerke/elektriker#antwort` | SA prompts (Anker voll geprüft, K-2); AP | live OK: HTTP 200, Anker, Antwort 218, FAQPage = sichtbar |
| Prompt Maler | `/gewerke/maler#antwort` | SA prompts; AP | live OK: HTTP 200, Anker, Antwort 184, FAQPage = sichtbar |
| Schlussrechnung (Hilfe) | `/hilfe/schlussrechnung-erstellen#faq` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 253, FAQPage = sichtbar |
| Schlussrechnung (Ratgeber) | `/blog/abschlagsrechnung-schlussrechnung#faq` | SA antwort, faq-schema; CT | live OK: HTTP 200, Anker, Antwort 267, FAQPage = sichtbar |
| Aufmaß-App | `/funktionen/aufmass#faq-titel` | SA prompts, faq-schema; FD | live OK: HTTP 200, Anker, Antwort 215, FAQPage = sichtbar |
| Bautagebuch-App | `/funktionen/baudokumentation#faq-titel` | SA prompts, faq-schema; FD | live OK: HTTP 200, Anker, Antwort 284, FAQPage = sichtbar |
| Zeiterfassung Handwerk | `/funktionen/zeiterfassung#faq-titel` | SA prompts, faq-schema; FD | live OK: HTTP 200, Anker, Antwort 265, FAQPage = sichtbar |
| Handwerkersoftware für kleine Betriebe (Phase 8) | `/vergleich/handwerkersoftware-kleine-betriebe#antwort` | SA prompts, antwort | live OK: HTTP 200, Anker, Antwort 258, FAQPage = sichtbar |

#### Neue Live-Funktionen (14) und D-32

| Funktion | Anleitung (Anker) | Verlinkende Detailseite bzw. /app | Audit | Live-Ergebnis (craftos.eu, 23.10.2026) |
|---|---|---|---|---|
| Terminplanung / Arbeitsabschnitte | `/hilfe/projekt-phasen-anlegen#antwort` | `/funktionen/terminplanung` | SA; FD; RA | live OK: HTTP 200, Anker, Antwort 244 |
| Abnahme und Teilabnahme | `/hilfe/abnahme-dokumentieren#antwort` | `/funktionen/baudokumentation` (Kachel „Abnahme und Teilabnahme“, seit Korrektur `6921340`) | SA; FD CONTENT-04; LC; RA | Anleitung live OK: HTTP 200, Anker, Antwort 251. Korrigiert 23.10.2026: Der Link von der Detailseite fehlte bis `6921340` (09-VERIFICATION); Live-Nachweis nach dem Push siehe unten |
| Bautagesbericht | `/hilfe/bautagesbericht-erstellen#antwort` | `/funktionen/baudokumentation` | SA; FD; RA | live OK: HTTP 200, Anker, Antwort 269 |
| Mängel | `/hilfe/mangel-erfassen-bearbeiten#antwort` | `/funktionen/maengelmanagement` | SA; FD; RA | live OK: HTTP 200, Anker, Antwort 241 |
| Mahnwesen | `/hilfe/mahnwesen-einrichten#antwort` | `/funktionen/mahnwesen` (Sekundärlink) | SA; FD Sekundärlink; RA | live OK: HTTP 200, Anker, Antwort 286 |
| Bankabgleich | `/hilfe/bankumsaetze-abgleichen#antwort` | `/funktionen/bankabgleich` (Sekundärlink) | SA; FD Sekundärlink; RA | live OK: HTTP 200, Anker, Antwort 256 |
| DATANORM | `/hilfe/datanorm-katalog-importieren#antwort` | `/funktionen/gaeb`, `/funktionen/angebote` (Kacheln) | SA; FD hrefs; RA | live OK: HTTP 200, Anker, Antwort 229 |
| Datenübernahme | `/hilfe/daten-importieren#antwort` | `/funktionen/datenuebernahme` (Sekundärlink) | SA; FD Sekundärlink; RA | live OK: HTTP 200, Anker, Antwort 265 |
| Angebotsunterschrift online | `/hilfe/angebot-online-unterschreiben-lassen#antwort` | `/funktionen/angebote` (Kachel) | SA; FD hrefs; RA | live OK: HTTP 200, Anker, Antwort 255 |
| Kundenportal | `/hilfe/kundenportal-kunden-einladen#antwort` | `/funktionen/kundenportal` (Sekundärlink) | SA; FD (Portal nach Release); RA | live OK: HTTP 200, Anker, Antwort 267 |
| Lager-Scan | `/hilfe/lager-scan-app#antwort` | `/funktionen/lager` (Kachel) | SA; FD hrefs; RA | live OK: HTTP 200, Anker, Antwort 259 |
| Besichtigung | `/hilfe/besichtigung-durchfuehren#antwort` | `/funktionen/aufmass` (Kachel) | SA; FD hrefs; RA | live OK: HTTP 200, Anker, Antwort 294 |
| Projekt-Chat und Nachrichten | `/hilfe/projekt-chat-nachrichten#antwort` | `/funktionen/team`, `/funktionen/projektverwaltung`, `/app` | SA; FD; APP; RA | live OK: HTTP 200, Anker, Antwort 220 |
| 21 Sprachen der Mobile-App | `/hilfe/app-sprache-einstellen#antwort` | `/funktionen/team` (Kachel), `/app` (Textlink) | SA; FD; APP; RA | live OK: HTTP 200, Anker, Antwort 233 |
| Kassenbuch (D-32) | `/hilfe/kassenbuch-fuehren#antwort` | `/funktionen/buchhaltung` (Kachel „Kassenbuch“) | SA; FD hrefs; CT; RA | live OK: HTTP 200, Anker, Antwort 280 |
| Rechnung nach § 13b (D-32) | `/hilfe/rechnung-fertigstellen#antwort`, `/blog/reverse-charge-bauleistungen#antwort` | – (Hilfe- und Ratgeberartikel) | SA; CT | live OK: HTTP 200, Anker, Antwort 234; HTTP 200, Anker, Antwort 269, FAQPage = sichtbar |

**Korrektur 23.10.2026 (Lückenschluss nach `09-VERIFICATION.md`):** Die Live-Prüfung um 09:35 MESZ prüfte nur Status, Anker und Antwort der Anleitungen, nicht den Link von der Detailseite. Die Zeile „Abnahme und Teilabnahme“ war deshalb fälschlich grün: Keine Funktionsdetailseite verlinkte `/hilfe/abnahme-dokumentieren`. Behoben mit Commit `6921340` (href an der Kachel „Abnahme und Teilabnahme“). Neue Prüfungen: **FD CONTENT-04** in `tests/funktionsdetails.test.ts` (alle 15 Anleitungen, Commit `f6144bb`) und **LC** = `scripts/live-check.mjs` „Detailseiten verlinken Anleitungen“ für alle 14 Detailseiten mit 17 Links (Commit `937fa13`).

## 11. Anforderungsstatus

| Anforderung | Status nach Phase 9 |
|---|---|
| FEAT-04 | erledigt (12 Gewerke-Seiten mit Ablauf als StepFlow, Visual, Funktionslinks und FAQ; live-check „Gewerke: Antwort und Ablauf“) |
| CONTENT-03 | erledigt (24 Bestandsratgeber und 40 Bestandshilfeartikel geprüft, korrigiert und gegliedert; Prüfnachweise `docs/content-pruefung/09-a.md` bis `09-g.md`, `content-pruefen --zitate --l1 --antwort` über 84 Artikel 0 Befunde) |
| CONTENT-04 | erledigt (10 neue Anleitungen plus Kassenbuch (D-32) und 2 Erweiterungen, von den Detailseiten verlinkt; live-check „Neue Anleitungen“ und „Detailseiten verlinken Anleitungen“, Abdeckungstabelle § 10) |
| SEO-09 | erledigt – Phase 8: kommerzielle KI-Fragen; Phase 9: Wissenslücken mit KD ≤ 12 (neun Wissensseiten), Gewerke-Software, Schlussrechnung; alle 34 Anker live OK |
| DESIGN-02 | In Progress – Phase 9: Gewerke-, Ratgeber- und Hilfe-Vorlagen auf v2; Rest in Phase 10 (Rechner, `/support`, Rechtsseiten, 404) |

In `REQUIREMENTS.md` werden ausschließlich FEAT-04, CONTENT-03, CONTENT-04 und SEO-09 als erledigt markiert. SEO-09 trägt den Text „Phase 8 (kommerzielle KI-Prompts), Phase 9 (Wissenslücken, Abschluss)“. DESIGN-02 bleibt „In Progress“ mit „Phase 5 (Grundlage), Phasen 6–9 (Umsetzung), Rest Phase 10 (Rechner, Support, Rechtsseiten, 404)“. In `ROADMAP.md` heißt das Erfolgskriterium 6 von Phase 9 jetzt „(DESIGN-02 für diese Vorlagen; Rest Phase 10)“, die Requirements-Zeile von Phase 9 nennt „DESIGN-02 für Gewerke-, Ratgeber- und Hilfe-Vorlagen, Rest Phase 10“, und Phase 10 führt zusätzlich „DESIGN-02 (Rest: Rechner, Support, Rechtsseiten, 404)“.

## 12. Neue Seiten und entfallene Altinhalte

Neue Seiten (20): neun Wissensseiten `/hilfe/leistungszeitraum-rechnung`, `/hilfe/regiebericht`, `/hilfe/bedenkenanzeige`, `/blog/maengelanzeige`, `/blog/reverse-charge-bauleistungen`, `/blog/gaeb-formate`, `/blog/materialliste-vorlage`, `/blog/bauablaufplan`, `/blog/arbeitszeitnachweis-vorlage`; zehn Anleitungen `/hilfe/kundenportal-kunden-einladen`, `/hilfe/angebot-online-unterschreiben-lassen`, `/hilfe/mahnwesen-einrichten`, `/hilfe/bankumsaetze-abgleichen`, `/hilfe/daten-importieren`, `/hilfe/datanorm-katalog-importieren`, `/hilfe/lager-scan-app`, `/hilfe/besichtigung-durchfuehren`, `/hilfe/projekt-chat-nachrichten`, `/hilfe/app-sprache-einstellen`; dazu `/hilfe/kassenbuch-fuehren` (D-32). Erweitert: `/hilfe/projekt-phasen-anlegen` (Terminplanung) und `/hilfe/abnahme-dokumentieren` (Teilabnahme). Keine URL und keine Datei wurde gelöscht.

| Früherer Inhalt | Jetzt zu finden unter |
|---|---|
| PageHero, TrialCta und `ui/Faq` auf den Gewerke-Seiten, `/gewerke`, allen Artikeln und den Übersichten `/blog`, `/hilfe` samt Kategorien | ContentKopf bzw. Gewerke-Kopf mit Antwort, CtaBand und FaqList (v2); Inhaltsverzeichnis, LinkKarten und Funktionskarten |
| Bild `werkstatt-2026` auf `/gewerke` | entfällt auf `/gewerke`; die Datei bleibt (weiter auf `/styleguide` mit Kennzeichnung „Darstellung, KI-gestaltet“) |
| Vorlagen-Hinweise (`hatVorlagen`, „Leistungsvorlagen“) auf Gewerke-Detailseiten und `/gewerke` | entfallen (09-02, T-09-05); Gewerke nennen nur Funktionen mit Beleg je Pfad (`09-a.md`) und nur Unterstütztes (L-1) |
| Kundenportal als Ort für Termine, Nachrichten und Unterlagen | Online-Unterschrift aus der Angebotsmail und Rechnung als PDF per E-Mail (09-09, 09-REVIEW ME-03) |
| „Teilweise“-Formulierungen zur Offline-Nutzung | Aufzählung des offline Erfassbaren mit Frist (§ 1, dieser Plan) |

## 13. Offene Inhaberpunkte

1. **Kundenportal für Kunden praktisch leer (Produktbefund, 09-REVIEW-FIX).** Ein angemeldeter Portalkunde sieht am Web-Release nur „Ihre Unterlagen“ mit dem Hinweis auf den Link in der E-Mail (`src/pages/portal/CustomerPortalHome.tsx`). Es gibt keine Belegliste, und das Menü hat nur „Startseite“. Keine E-Mail verlinkt die vorhandenen Portalseiten `/portal/quotes/:id` und `/portal/invoices/:id`. Die Website beschreibt das Portal deshalb nur noch über Online-Unterschrift und PDF per E-Mail. Für eine echte Portal-Leistung fehlt im Produkt die Belegliste oder ein Portal-Link in den Beleg-Mails.
2. **Einladungsmail verspricht Termine und Nachrichten (Produktbefund).** Die Einladungsmail (`supabase/functions/_shared/customerInvite.ts`) schreibt: „Dort sehen Sie alles, was wir für Sie freigeben – Angebote, Rechnungen, Termine und Nachrichten – und können Angebote online annehmen und unterschreiben.“ Termine und Nachrichten sind im Portal nicht erreichbar. Ebenso nennt die Karte `CustomerPortalAccessCard.tsx` nicht geroutete Portalbereiche, und die „Portal-Vorschau“ im Büro (`CustomerPortalPreview.tsx`) zeigt Belege, die der Kunde so nicht erreicht. Mailtext und Karte sollten an den Release angepasst werden (Produkt-Repo, kein Website-Auftrag).
3. **Sichtung der Screenshots** (09-VALIDATION „Manual-Only“): visual-audit aus 09-16 im Sitzungs-Scratchpad `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\09-16\` bzw. lokal `craftos\test-results\visual\` (gitignoriert), oder live https://craftos.eu/gewerke, https://craftos.eu/blog und https://craftos.eu/hilfe.
4. **Analytics-Kontrolle** `trial_click`/`ai_visit` nach 24 Stunden (Anleitung in § 8).
5. **Silbentrennung in Safari stichprobenhaft prüfen:** Playwright-WebKit unter Windows hat kein deutsches Trennwörterbuch („Materialentnahmeschei|n“ auf `/hilfe/material-entnehmen-zurueckbuchen` bei 360 px, ohne Querscroll); Chromium trennt richtig. Stichprobe auf einem iPhone bei 360/390 px (09-integration.md § 8).
6. **Quellen mit [ASSUMED] aus `09-g.md`** (Wissensseiten) bei Gelegenheit gegenlesen; die Rechts- und Steuerfakten stehen auf dem Stand der Pakete (`checkedAt` 23.10.2026).
7. **Inhaltliche Sichtung der Review-Fixes und dieses Plans:** ME-02 (Offline-Frist), ME-03 (Kundenportal-Aussagen) und die positive Offline-Aufzählung dieses Plans haben sichtbare Aussagen geändert (belegt am Release).
8. **SE-Ranking-Verbrauch des Kontos prüfen:** 7.712 Units zwischen 01:14 und 09:36 MESZ ohne Skriptabruf (§ 7). Im SE-Ranking-Konto den Verbrauchsverlauf ansehen und bei Bedarf die Häufigkeit der Positionsprüfung des Projekts 13094375 bis zum Ende des Testzugangs (03.11.2026) anpassen.
9. **Koordinationsrezept:** Für das Website-Repo fehlt weiterhin ein Rezept (zum Beispiel `website-unit`, `website-build`, `website-e2e`). Bei Bedarf kann es gebaut werden, damit schwere Website-Läufe künftig ohne `--host` vergeben werden können.
10. **Offene Punkte aus 09-REVIEW und deferred-items** für Phase 10: Zusatzkarten „Kassenbuch“ und „Rechnung nach § 13b“ auf `/funktionen` und im Mega-Menü; `components/product-demo` (nicht gerendert) wiederverwenden oder archivieren; Credit-Wert der Lager-Foto-KI erst nach Aufnahme in `lib/site.ts` nennen; Testkontext-Muster in `tests/pricing-parity.test.ts` (Teilwörter); Grenzen aus 09-REVIEW-FIX (HI-01 prüft Oberflächentexte, nicht Rollen und Lizenzen; Inhaltsverzeichnis steht im DOM vor dem Text).

## 14. Auslegungen

a. **Paketzuschnitt:** Phase 9 lief in 18 Plänen und 7 Wellen. Die Zusatzpläne 09-11 bis 09-18 entstanden aus den Checker-Entscheidungen B3, B4, W9, W10 und W12: Vorlagen (09-11 Gewerke, 09-12 Artikel), Querverweise (09-13 Gewerke, 09-14 Detailseiten), Basis-Einfrierung (09-15), Phasen-Gate (09-16), dazu die Teilung der Hilfepakete: „09-05a/b“ = 09-05/09-17, „09-06a/b“ = 09-06/09-18. Spuren arbeiteten parallel in Worktrees `C:/Projekte/wt-09<x>` (Ports 3101–3110); Integration, Gate und Rollout liefen im Haupt-Arbeitsbaum.
b. **Leitlinie L-1 statt der Negativgrenzen aus D-11/D-20:** Nach der Inhabervorgabe vom 22.10.2026 („Nur, was unterstützt wird, nicht, was nicht unterstützt wird“) nennen Gewerke, Artikel und Funktionsdaten nur Unterstütztes. Geprüft wird das über `lib/leitlinie*`, `lib/nur-unterstuetzt.ts`, `tests/content-produktwahrheit.test.ts` und `scripts/content-pruefen.mjs --l1`. Einzige Ausnahme ist die GoBD-Zertifizierungsfrage auf `/gobd` (Überclaim-Schutz).
c. **Kachel-Abweichungen von D-21:** „Besichtigung“ auf `aufmass`, „Projekt-Chat“ auf `projektverwaltung` und `team`, „DATANORM“ auf `angebote` und `gaeb`. Die Funktionen sind dort im Release verortet und haben dort Nutzen.
d. **Ermessen in F-A1:** gemeinsame Leitlinien-Module `lib/leitlinie*` und das Prüfskript `scripts/content-pruefen.mjs` (`--zitate`, `--l1`, `--antwort`) als Werkzeug für alle Pakete; seit 09-REVIEW-FIX HI-01 zählen Zitate nur aus Nutzer-Oberflächentexten.
e. **Übergangsregeln K-3 und Übergangslisten** (`UEBERGANG_PHASE9`, `L1_UEBERGANG_PHASE9`, optionale `answer`) erlaubten den Spuren, parallel zu arbeiten. 09-09 hat sie vollständig zurückgenommen: alle Phase-9-Pfade „bestehend“, `answer` Pflicht, 0 Bestandstreffer (09-integration.md § 1).
f. **Neutraler GAEB-Fachteil (Orchestrator-Entscheidung 1):** `/blog/gaeb-formate` erklärt die Formate ohne Produktbezug; nur Frage-Abschnitte ohne Produktbezug sind von L-1 ausgenommen (`produktbezug` in `leitlinie-l1.json`, 09-REVIEW LO-10).
g. **Abweichung Endmenge Hilfe:** Der Plan nennt 83 Artikel bzw. 53 Hilfeartikel. Mit `/hilfe/kassenbuch-fuehren` (D-32) sind es 84 bzw. 54, die Sitemap hat 156 statt 155 URLs.
h. **live-check-Auslegung:** `/gewerke` prüft nur die Antwortregel, weil die Übersicht laut 09-UI-SPEC keinen Ablauf und keine FAQ hat. Die Quellenliste ist nur bei Artikeln mit `sources` im Frontmatter Pflicht (`/blog/materialliste-vorlage` führt laut `09-g.md` bewusst keine Rechtsquelle).
i. **Produktbasis über das Freeze hinaus angehoben:** Die in 09-15 eingefrorene Basis wurde in 09-09 (test.246) und hier (test.248) nach Delta-Prüfung angehoben, weil `sync:product:check` Teil des Gates ist und beide Deltas nur Fehlerbehebungen ohne Preis- oder Funktionsänderung enthielten.

## 15. Doku-Push

Vor dem zweiten Push (nur dieser Nachweis, Messbericht mit Rohdaten, drei Projektabgleich-Berichte, SUMMARY 09-10, STATE, ROADMAP, REQUIREMENTS) lief das ship-gate über den reinen Doku-Diff (`check-no-secrets` für `docs` und `../.planning`, Prüfbefehl des Plans) und erneut `gh workflow list --all`; die Ausgabe steht im SUMMARY 09-10.
