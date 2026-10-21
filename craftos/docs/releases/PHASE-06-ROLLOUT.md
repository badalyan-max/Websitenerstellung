# Rollout-Nachweis Phase 6 – Startseite, Navigation und Funktionsübersicht

Stand: 21. Oktober 2026, 16:48–17:20 (MESZ). Freigabe des Inhabers für die Fertigstellung aller restlichen Phasen ohne Rückfragen am 21.10.2026 („ja mach einfach bis du sie alle fertig hast“). Grundlage: Plan 06-06 (D-14), globale Regel 5 (Tests nur lokal).

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `33dea41775d83ee41b0e8a5e9df96e0615a4ecfa` (`33dea41`) |
| Vorheriger Stand origin/main | `658776875acfeb6bd46b169e21b20cb3a61293bb` (`6587768`, Doku-Push Phase 5) |
| Umfang des Pushs | 55 lokale Commits der Pläne 06-01 bis 06-06 (Task 1) inklusive Code-Review und Review-Fixes; `git diff origin/main...HEAD`: 77 Dateien, 10.060 Einfügungen, 1.086 Löschungen (60 Dateien außerhalb von `.planning/`) |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.239`, Commit `535206b42aace73bb53b2796c5072cea78ac10fd` (unverändert seit Phase 5) |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.93`, Commit `5610a06415361f5c5a01c90258352ed7f49b7bab` (unverändert seit Phase 5) |

`npm run sync:product:check` meldete beim Phasen-Gate „Snapshot ist aktuell: v4.0.0-test.239 (535206b4)“. Ein Nachziehen von Snapshot und Register war deshalb nicht nötig.

Inhalt des Stands: neue Startseite mit Hero, Kennzahlen, Funktionsgruppen, Ablauf, Preisanker und fünf FAQ-Fragen (FAQPage); Header mit Mega-Menü „Funktionen“ (Detailseiten und Gruppenlinks), Menü „Wissen“ und mobilem Drawer; `/funktionen` als Übersicht mit 30 Funktionen in sechs Gruppen (angebot, planung, baustelle, rechnung, buchhaltung, team), BreadcrumbList und ItemList; Title, H1 und Description von `/` und `/funktionen` nach `docs/seo/keyword-map.json`; `lastmod` von `/` und `/funktionen` in der Sitemap auf 2026-10-21.

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-6-Commits). Das ship-gate lief direkt nach dessen SKILL.md, weil das Skill-Tool in dieser Ausführung nicht zur Verfügung stand. Es lief einmal unmittelbar vor dem einzigen Code-Push. Der Koordinationsstatus wurde vorher gelesen: Edgar war bereit (Runner 1.9.9), EdgarsPC offline/veraltet. Für das Website-Repo gibt es kein Koordinationsrezept (Lücke). Die Prüfungen liefen daher lokal nacheinander mit jeweils genau einem schweren Prozess.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest) | 25 Dateien, 330/330 bestanden |
| `npm run lint` | grün (0 Befunde) |
| `npm run typecheck` | grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.239 (535206b4)“ |
| `node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `npm run build` | grün |
| `npm run test:e2e` gegen `next start -p 3100` (Chromium/WebKit, 1440/390, alle testMatch-Dateien inkl. `home-navigation.pw.cjs`) | 258 bestanden, 0 fehlgeschlagen, 50 übersprungen (projektgebundene Skips) |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 (129 Links, 18 Assets) |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 17/17 OK (10 Phase-5- und 7 Phase-6-Prüfungen) |
| `visual-audit.mjs` für `/,/funktionen` (nicht blockierend) | 20 Aufnahmen (Chromium/WebKit, 360/390/768/1024/1440), 0 Status-, Overflow-, JS- und A11y-Befunde; Ablage `craftos/test-results/visual/` (lokal, gitignoriert) |
| Port 3100 nach den Läufen | frei (Server über die eigene PID beendet) |

Review: Als Standard-Review der Phase gilt der offizielle GSD-Phasenreview `06-REVIEW.md` (0 critical, 0 high, 4 medium, 10 low). Alle Medium-Befunde (WR-01 bis WR-04) und acht Low-Befunde sind behoben (`06-REVIEW-FIX.md`). Zwei Low-Befunde sind begründet zurückgestellt: IN-05 (`data-source` mit internen Quellbezeichnern, festgelegt in 05-UI-SPEC) und IN-07 (globales `scrollbar-gutter: stable`, Sichtung ausstehend). Seit dem Review-Fix-Stand (`d5bd8ac`) kamen zwei Commits hinzu: `708f8b5` (nur der Review-Bericht) und `33dea41` (Sitemap-Datum und Phase-6-Prüfungen in `scripts/live-check.mjs`). Der ausführende Agent hat dieses Delta selbst gesichtet und keinen Befund gefunden. Eine unabhängige Zweitprüfung dieses kleinen Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all` vor dem Code-Push:

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github`. Der Diff ändert nichts unter `.github`. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus. Es wurde kein Workflow angelegt oder aktiviert, und kein CI-Lauf dient als Beleg. Vor dem Doku-Push mit diesem Nachweis wurde die Liste erneut geprüft (Ergebnis im SUMMARY 06-06).

## 4. Push und Vercel-Deployment

- `git push origin main`: `6587768..33dea41  main -> main` (16:55:55 MESZ, einziger Code-Push der Phase).
- GitHub meldete zu diesem Zeitpunkt „Webhooks: degraded performance“. Das Deployment startete deshalb erst rund 14 Minuten nach dem Push. Es wurde nicht erneut gepusht und nichts manuell deployt.
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment `dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq`, URL https://craftos-l7p60ysyi-craft-os.vercel.app, Status **READY** (Build 34 s, erstellt 21.10.2026 17:10:17 MESZ), Commit `33dea41`.
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach bestätigtem Live-Stand ausgeführt. Bestätigt wurde der Live-Stand durch den live-check und durch `lastmod` 2026-10-21 für `/` und `/funktionen` in https://craftos.eu/sitemap.xml. Ergebnis von `npm run indexnow`: „IndexNow: 125 URLs gemeldet, HTTP 200“.

## 6. live-check gegen https://craftos.eu

```text
Live-Prüfung gegen https://craftos.eu
OK     /llms.txt nennt Extra-Speicher, Start-Credits, einmalig und alle Paketpreise
OK     /funktionen ohne Ankündigung
OK     /craft-ai ohne Ankündigung
OK     /vergleich ohne Ankündigung
OK     /fakten-ueber-craftos ohne Ankündigung
OK     /preise nennt Extra-Speicher und Start-Credits
OK     /styleguide 200 mit meta robots noindex und X-Robots-Tag
OK     /sitemap.xml enthält /styleguide nicht
OK     JSON-LD Startseite: Offer 29.95 ohne Umsatzsteuer
OK     /funktionen/kundenportal ohne „In Prüfung“
OK     / Title, H1 und Description nach Keyword-Map
OK     /funktionen Title, H1 und Description nach Keyword-Map
OK     /funktionen zeigt 30 Funktionen in 6 Gruppen mit BreadcrumbList und ItemList
OK     Mega-Menü im HTML (Detaillinks, Gruppenlinks, kein role=menu)
OK     Tracking-Attribute: Anmelden mit data-track=login, CTA auf app.craftos.eu ohne
OK     Keine internen Belegpfade auf / und /funktionen
OK     FAQPage der Startseite mit genau 5 Fragen
Ergebnis: alle Prüfungen OK
```

Die Phase-6-Prüfungen lesen die Zielwerte für Title, H1 und Description aus `docs/seo/keyword-map.json`. Die Detail-Slugs leiten sie aus `/sitemap.xml` ab. HTML-Entities dekodieren sie vor dem Vergleich.

## 7. Analytics (trial_click, ai_visit)

Die Ereignisse sind im Code verdrahtet: `trial_click` und `login_click` über `lib/tracking.ts` (`classifyAppLink`), `ai_visit` in `components/Analytics.tsx`. Seit Phase 6 tragen der Hero-CTA, der Header-CTA und das CtaBand `data-track="trial"`, der Link „Anmelden“ trägt `data-track="login"` (live geprüft, siehe Abschnitt 6). Live liefert `/_vercel/insights/script.js` HTTP 200, Web Analytics ist also aktiv. Eine Zählung der letzten 24 Stunden war nicht möglich: Die Vercel-CLI 50.1.3 hat keinen Analytics-Befehl, und die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung. Diese Prüfung ist daher eine Inhaberaktion:

1. Vercel-Dashboard → Projekt `craftos` → Analytics → Reiter „Events“ öffnen.
2. Zeitraum „Last 24 hours“ wählen (frühestens 24 Stunden nach 17:10 MESZ am 21.10.2026 aussagekräftig).
3. Prüfen, dass `trial_click` und `ai_visit` weiterhin in der Ereignisliste erscheinen. Zahlen bei Bedarf in diesem Abschnitt nachtragen.

## 8. Messbericht nach dem Rollout (SEO-07)

- Ausgangsstand (Plan 05-07, unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`
- Etappe Phase 5 (unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase05.md`
- Etappe Phase 6: `craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase06.md`, Rohdaten `2026-10-21-raw-rollout-phase06-*.json` (6 Dateien). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase06`, einmal ausgeführt, 8 MCP-Aufrufe, 0 Units. Danach meldete `check-no-secrets.mjs docs/seo scripts` „OK: Schlüssel in keiner Datei“.
- Kernzahlen: bestehende Seiten 1 Keyword in den Top 100 und 0 in den Top 10 (107 gemessen); geplante Seiten 0/0 (19 gemessen); Zusatz-Keywords 2 in den Top 10 und 3 in den Top 100 (−1 gegenüber dem Ausgangsstand); Share of Voice CraftOS 0,02 % (±0); 12 verweisende Domains (±0); Domain InLink Rank 3. Der Rollout ist erst wenige Minuten alt. Der Bericht dokumentiert damit den Stand am Rollouttag. Ranking-Effekte der neuen Startseite und von `/funktionen` zeigen frühestens die Etappenmessungen der Phasen 7 bis 10.

## 9. Anforderungsstatus

| Anforderung | Status nach Phase 6 |
|---|---|
| DESIGN-01 | erledigt (neue Startseite live, Abschnittsfolge nach UI-SPEC, FAQPage mit 5 Fragen) |
| DESIGN-03 | erledigt (Header mit Mega-Menü, Menü „Wissen“ und mobilem Drawer; Detail- und Gruppenlinks live im HTML, kein `role="menu"`) |
| FEAT-01 | erledigt (`/funktionen` mit 30 Funktionen in 6 Gruppen, BreadcrumbList und ItemList, live geprüft) |
| DESIGN-02 | offen – Phase 6: /, Menü und /funktionen umgesetzt; Abschluss Phasen 7–8 |
| SEO-02 | offen – Phase 6: /, /funktionen und Menü-Ankertexte nach Keyword-Map; Abschluss Phasen 7–8 |

In `REQUIREMENTS.md` werden ausschließlich DESIGN-01, DESIGN-03 und FEAT-01 als erledigt markiert. DESIGN-02 und SEO-02 bleiben „In Progress“ mit unverändertem Traceability-Text.

## 10. Entfernte Startseiteninhalte und ihre Zielseiten (D-03)

Von der Startseite wurde kein Inhalt ersatzlos gestrichen, und keine URL wurde gelöscht. Die Inhalte stehen jetzt an diesen Stellen:

| Früherer Startseiteninhalt | Jetzt zu finden unter |
|---|---|
| GoBD-Box | `/gobd` sowie Kurzantwort in der FAQ der Startseite |
| Ratgeber-Block | Menü „Wissen“ im Header |
| Alte Preistabelle | `/preise` (die Startseite zeigt nur noch den Preisanker) |
| Lange FAQ-Antworten | `/gobd` und `/hilfe/mobile-offline-synchronisierung` |

## 11. Auslegungen

1. **Zusatzfunktionen ohne Detailseite im Menü:** Sie erscheinen im Mega-Menü nicht einzeln, sondern über die Gruppenlinks `/funktionen#<gruppe>` (UI-SPEC Z. 361). Die Zwei-Klick-Definition aus 06-RESEARCH ist damit erfüllt: Menü öffnen und Gruppenlink wählen. Auf `/funktionen` stehen diese Funktionen in ihrer Gruppe, teils mit Link auf einen Hilfeartikel.
2. **„Höchstens eine Überschrift je Abschnitt“:** Diese Vorgabe wird als genau eine H2 je Abschnitt ausgelegt. Die FAQ-Fragen sind H3 innerhalb des FAQ-Abschnitts.

## 12. Offene Inhaberaktionen und offene Punkte für Phase 7

1. **Sichtung der Screenshots** von `/` und `/funktionen` (Gesamteindruck laut 06-VALIDATION „Manual-Only“): `C:\Projekte\Websitenerstellung\craftos\test-results\visual\chromium-1440-home.png`, `chromium-390-home.png`, `webkit-1440-home.png`, `chromium-1440-funktionen.png`, `chromium-390-funktionen.png`, `webkit-1440-funktionen.png` (alle Breiten 360–1440 im selben Ordner) oder live https://craftos.eu und https://craftos.eu/funktionen.
2. **Analytics-Kontrolle** `trial_click`/`ai_visit` nach 24 Stunden (Anleitung in Abschnitt 7).
3. **Koordinationsrezept:** Für das Website-Repo fehlt weiterhin ein Rezept (zum Beispiel `website-build`/`website-e2e`). Bei Bedarf kann es gebaut werden, damit schwere Website-Läufe künftig ohne `--host` vergeben werden können.
4. **Entscheidung `components/product-demo/*`** (06-REVIEW WR-03): wieder einbinden (Specs `demo-planning.pw.cjs` und `mobile-step-flow.pw.cjs` umstellen, Skip entfernen) oder mit Freigabe archivieren. Bis dahin sind beide Specs auf Dateiebene übersprungen.
5. **IN-05 `data-source`:** Kurzform statt interner Quellbezeichner (`site.trialDays`, `tarife.voll.monat`, `product-register: mobileLocales`) mit UI-SPEC-Verantwortung entscheiden und Spec samt Test gemeinsam anpassen.
6. **IN-07 `scrollbar-gutter`:** `/impressum`, `/datenschutz` und die 404-Seite unter Windows mit klassischen Scrollleisten sichten. Bei störender Rinne den Gutter nur während des Scroll-Locks setzen.
7. **Funktionskarten ohne Szene:** 11 der Funktionskarten auf `/funktionen` zeigen nur ein Icon. Die Szenen werden in Phase 7 ergänzt.
8. **Sichtprüfung WR-02/IN-01** (Esc-Verhalten und Schließen bei Fokusverlust im Header): Laut 06-REVIEW-FIX wird eine menschliche Prüfung des Verhaltens empfohlen.
