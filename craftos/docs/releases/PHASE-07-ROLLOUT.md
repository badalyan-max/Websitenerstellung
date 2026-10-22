# Rollout-Nachweis Phase 7 – Funktionsdetailseiten und Mobile-App-Seite

Stand: 22. Oktober 2026, 13:53–14:20 (MESZ). Freigabe des Inhabers für die Fertigstellung aller restlichen Phasen ohne Rückfragen am 21.10.2026 („ja mach einfach bis du sie alle fertig hast“). Grundlage: Plan 07-09 (D-16, D-17), globale Regel 5 (Tests nur lokal).

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `126f807e59c488c8e1310bc651cccd7c38b55da6` (`126f807`) |
| Vorheriger Stand origin/main | `3eb573671aa0d0d7fd759f7216c730c6716246f7` (`3eb5736`, Doku-Push Phase 6) |
| Umfang des Pushs | 65 lokale Commits der Pläne 07-01 bis 07-08, Code-Review und Review-Fixes (bis `c86d86d`) sowie Task 1 von 07-09 (`126f807`); `git diff origin/main...HEAD`: 104 Dateien, 14.836 Einfügungen, 1.134 Löschungen (rund 75 Dateien außerhalb von `.planning/`); keine Datei unter `.github/` |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.239`, Commit `535206b42aace73bb53b2796c5072cea78ac10fd` (unverändert seit Phase 5) |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.93`, Commit `5610a06415361f5c5a01c90258352ed7f49b7bab` (unverändert seit Phase 5) |

`npm run sync:product:check` meldete beim Phasen-Gate „Snapshot ist aktuell: v4.0.0-test.239 (535206b4).“ Snapshot und Register mussten nicht nachgezogen werden.

Inhalt des Stands: 22 Funktionsdetailseiten nach einer festen Vorlage (Kopf mit Visual, Schrittfolge, Plattformen und Rollen, Kacheln, FAQ, passende Funktionen, CTA), darunter sechs neue Seiten (`/funktionen/gaeb`, `/funktionen/mahnwesen`, `/funktionen/terminplanung`, `/funktionen/bankabgleich`, `/funktionen/datenuebernahme`, `/funktionen/maengelmanagement`); `/app` neu aus den v2-Bausteinen mit allen App-Funktionen, Phone-Kacheln, Store-Links und QR-Codes; Szenen auf allen Funktionskarten; JSON-LD je Detailseite (BreadcrumbList, FAQPage, WebPage) und auf `/app` (MobileApplication ohne Bewertungen, FAQPage, BreadcrumbList); `llms.txt` mit allen Detailseiten und `/app`; `lastmod` von `/app`, `/funktionen` und allen 22 Detailseiten in der Sitemap auf 2026-10-22.

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-7-Commits). Das ship-gate lief direkt nach dessen SKILL.md, weil das Skill-Tool in dieser Ausführung nicht zur Verfügung stand. Es lief einmal unmittelbar vor dem einzigen Code-Push. Vorher wurde der Koordinationsstatus gelesen (22.10.2026, 11:54 UTC): edgar und edgarspc waren offline bzw. veraltet (Runner 1.9.9). Für das Website-Repo gibt es kein Koordinationsrezept (Lücke). Die Prüfungen liefen daher lokal nacheinander mit jeweils genau einem schweren Prozess.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest) | 29 Dateien, 483/483 bestanden |
| `npm run lint` | grün (0 Befunde) |
| `npm run typecheck` | grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.239 (535206b4).“ |
| `node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `npm run build` | grün, 139 statische Seiten |
| `npm run test:e2e` gegen `next start -p 3100` (Chromium/WebKit, 1440/390, alle testMatch-Dateien inkl. `funktionsdetails.pw.cjs`) | 293 bestanden, 0 fehlgeschlagen, 75 übersprungen (projektgebundene Skips), Laufzeit 7,0 min |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 (134 Links, 16 Assets) |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 46/46 OK (Phase 5, Phase 6 und Phase 7) |
| `visual-audit.mjs` für `/app,/funktionen,/funktionen/mahnwesen,/funktionen/terminplanung,/funktionen/gaeb` (nicht blockierend) | 50 Aufnahmen (Chromium/WebKit, 360/390/768/1024/1440), 0 Status-, Overflow-, JS- und A11y-Befunde |
| Port 3100 nach den Läufen | frei (Server über die eigene PID beendet) |

Review: Als Standard-Review der Phase gilt der offizielle GSD-Phasenreview `07-REVIEW.md` (0 critical, 1 high, 6 medium, 8 low). Der High-Befund WR-01, alle Medium-Befunde WR-02 bis WR-07 und vier Low-Befunde (IN-02 per Messung, IN-03, IN-04, IN-05) sind laut `07-REVIEW-FIX.md` behoben. Stand nach dem Fix (`c86d86d`): Vitest 483/483, Typcheck, Lint und Build grün, betroffene E2E-Dateien ohne Fehlschlag. Zurückgestellt bzw. außerhalb des Fix-Auftrags: IN-01 (Gutter-Entscheidung D-14 bleibt, nur dokumentiert), IN-06, IN-07 und IN-08 (siehe Abschnitt 13). Seit `c86d86d` kam nur `126f807` hinzu (Sitemap-Datum, `checkedAt` und Phase-7-Prüfungen in `scripts/live-check.mjs`). Der ausführende Agent hat dieses Delta selbst gesichtet und keinen Befund gefunden. Eine unabhängige Zweitprüfung dieses kleinen Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all` vor dem Code-Push (22.10.2026, 14:05:25 MESZ):

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github`, und der Diff ändert nichts unter `.github`. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus. Es wurde kein Workflow angelegt oder aktiviert, und kein CI-Lauf dient als Beleg. Vor dem Doku-Push mit diesem Nachweis wurde die Liste erneut geprüft (Ergebnis im SUMMARY 07-09).

## 4. Push und Vercel-Deployment

- `git push origin main`: `3eb5736..126f807  main -> main` (14:05:33 MESZ, einziger Code-Push der Phase).
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment `dpl_5xujdhv6bnYnxsHhzNpQUNHPdFyQ`, URL https://craftos-2adu46jix-craft-os.vercel.app, Status **READY** (Build 26 s, erstellt 22.10.2026 14:05:39 MESZ, sechs Sekunden nach dem Push).
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Ermittelt mit `vercel ls craftos --scope craft-os` und `vercel inspect` (Vercel-CLI 50.1.3). Die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach bestätigtem Live-Stand ausgeführt. Bestätigt wurde der Live-Stand durch den live-check (Abschnitt 6) und durch https://craftos.eu/sitemap.xml: 131 URLs, davon 24 mit `lastmod` 2026-10-22 (`/app`, `/funktionen` und die 22 Detailseiten). Ergebnis von `npm run indexnow`: „IndexNow: 131 URLs gemeldet, HTTP 200“. Die Anzahl entspricht der Erwartung aus 07-RESEARCH (125 URLs nach Phase 6 plus sechs neue Detailseiten).

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
OK     /app Title, H1 und Description nach Keyword-Map
OK     /funktionen/dashboard Title, H1 und Description nach Keyword-Map
OK     /funktionen/projektverwaltung Title, H1 und Description nach Keyword-Map
OK     /funktionen/angebote Title, H1 und Description nach Keyword-Map
OK     /funktionen/rechnungen Title, H1 und Description nach Keyword-Map
OK     /funktionen/e-rechnung Title, H1 und Description nach Keyword-Map
OK     /funktionen/buchhaltung Title, H1 und Description nach Keyword-Map
OK     /funktionen/eingangsrechnungen Title, H1 und Description nach Keyword-Map
OK     /funktionen/plantafel Title, H1 und Description nach Keyword-Map
OK     /funktionen/zeiterfassung Title, H1 und Description nach Keyword-Map
OK     /funktionen/lager Title, H1 und Description nach Keyword-Map
OK     /funktionen/baudokumentation Title, H1 und Description nach Keyword-Map
OK     /funktionen/aufmass Title, H1 und Description nach Keyword-Map
OK     /funktionen/arbeitsanweisungen Title, H1 und Description nach Keyword-Map
OK     /funktionen/team Title, H1 und Description nach Keyword-Map
OK     /funktionen/nachkalkulation Title, H1 und Description nach Keyword-Map
OK     /funktionen/kundenportal Title, H1 und Description nach Keyword-Map
OK     /funktionen/gaeb Title, H1 und Description nach Keyword-Map
OK     /funktionen/mahnwesen Title, H1 und Description nach Keyword-Map
OK     /funktionen/terminplanung Title, H1 und Description nach Keyword-Map
OK     /funktionen/bankabgleich Title, H1 und Description nach Keyword-Map
OK     /funktionen/datenuebernahme Title, H1 und Description nach Keyword-Map
OK     /funktionen/maengelmanagement Title, H1 und Description nach Keyword-Map
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
Ergebnis: alle Prüfungen OK
```

46 Prüfungen, davon 29 neu in Phase 7. Die Zielwerte für Title, H1 und Description stammen aus `docs/seo/keyword-map.json`, die Detailpfade aus `/sitemap.xml`. Die Sitemap-Prüfung vergleicht die Menge der Detailpfade mit den Keyword-Map-Einträgen `/funktionen/<slug>` mit Status „bestehend“ (keine fest kodierte Zahl). „Keine internen Belegpfade oder Modulnamen“ sucht nach `data-evidence="web:src`, `data-evidence="mobile:`, `data-source="tarife`, `data-source="product-register` und `data-source="site.`.

## 7. SE-Ranking-Abgleich (D-08)

`node scripts/se-ranking-sync.mjs --check` (nur lesend, 8 MCP-Aufrufe), Bericht `craftos/docs/seo/reports/2026-10-22-projektabgleich.json`:

```text
Soll 126 (bestehend 113, geplant 13), Projekt 151, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0, offen ohne Limit 0
```

Die Ziel-URLs der sechs neuen Detailseiten sind im Projekt hinterlegt. Es fehlt kein Soll-Keyword, und keine Zielseite weicht ab. Am Projekt wurde nichts geändert, es gibt keine offene Inhaberaktion aus dem Abgleich.

## 8. Analytics (trial_click, ai_visit)

Die Ereignisse sind im Code verdrahtet: `trial_click` und `login_click` über `lib/tracking.ts` (`classifyAppLink`), `ai_visit` in `components/Analytics.tsx`. Der live-check bestätigt `data-track="login"` am Link „Anmelden“ und CTA-Links auf app.craftos.eu ohne dieses Attribut. Live liefert `/_vercel/insights/script.js` HTTP 200, Web Analytics ist also aktiv. Eine Zählung der letzten 24 Stunden war nicht möglich: Die Vercel-CLI 50.1.3 hat keinen Analytics-Befehl, und die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung. Diese Prüfung ist daher eine Inhaberaktion:

1. Vercel-Dashboard → Projekt `craftos` → Analytics → Reiter „Events“ öffnen.
2. Zeitraum „Last 24 hours“ wählen (frühestens 24 Stunden nach 14:06 MESZ am 22.10.2026 aussagekräftig).
3. Prüfen, dass `trial_click` und `ai_visit` weiterhin in der Ereignisliste erscheinen. Zahlen bei Bedarf in diesem Abschnitt nachtragen.

## 9. Messbericht nach dem Rollout (SEO-07)

- Ausgangsstand, Etappe Phase 5 und Etappe Phase 6 (alle unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`, `2026-10-21-messbericht-rollout-phase05.md`, `2026-10-21-messbericht-rollout-phase06.md`
- Etappe Phase 7: `craftos/docs/seo/reports/2026-10-22-messbericht-rollout-phase07.md`, Rohdaten `2026-10-22-raw-rollout-phase07-*.json` (6 Dateien). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase07`, einmal ausgeführt, 8 MCP-Aufrufe, 0 Units. Danach meldete `node scripts/check-no-secrets.mjs docs/seo scripts` „OK: Schlüssel in keiner Datei“.
- Kernzahlen: bestehende Seiten 0 Keywords in den Top 10 und 1 in den Top 100 (113 gemessen); geplante Seiten 0/0 (13 gemessen); Zusatz-Keywords 2 in den Top 10 und 4 in den Top 100 (±0); Share of Voice CraftOS 0,02 % (±0); 12 verweisende Domains (±0); Domain InLink Rank 3. Die Detailseiten sind erst wenige Minuten live. Der Bericht dokumentiert damit den Stand am Rollouttag; Ranking-Effekte zeigen frühestens die Etappenmessungen der Phasen 8 bis 10.

## 10. Anforderungsstatus

| Anforderung | Status nach Phase 7 |
|---|---|
| FEAT-02 | erledigt (22 Detailseiten nach fester Vorlage; neue Seiten gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement; Zusatzfunktionen als Abschnitt bzw. Kachel; live geprüft) |
| FEAT-03 | erledigt (`/app` mit allen App-Funktionen, MobileApplication ohne Bewertungen, live geprüft) |
| MEDIA-01 | erledigt (Kopf-Visual für 22 Funktionen, Szenen auf allen Karten, Phone-Kacheln auf `/app`; Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“ live geprüft) |
| DESIGN-02 | offen – Phase 7: Detailseiten und /app umgesetzt; Abschluss Phase 8 |
| SEO-02 | offen – Phase 7: Title/H1/Description der Detailseiten und /app nach Keyword-Map; Abschluss Phase 8 |

In `REQUIREMENTS.md` werden ausschließlich FEAT-02, FEAT-03 und MEDIA-01 als erledigt markiert. DESIGN-02 und SEO-02 bleiben „In Progress“ mit unverändertem Traceability-Text.

## 11. Neue Seiten und entfallene Altinhalte

Neue Seiten: `/funktionen/gaeb`, `/funktionen/mahnwesen`, `/funktionen/terminplanung`, `/funktionen/bankabgleich`, `/funktionen/datenuebernahme`, `/funktionen/maengelmanagement`; `/app` ist inhaltlich neu aufgebaut. Keine URL wurde gelöscht, keine Datei der Website entfernt.

| Früherer Inhalt | Jetzt zu finden unter |
|---|---|
| PageHero und Fließtext der 16 alten Detailseiten | Kopf mit Visual, Kacheln „Was … leistet“ und FAQ der Detailseite |
| Alte Schrittlisten | StepFlow („… in vier Schritten“) |
| Absatz zu Zugriff und Lizenzen | Abschnitt Plattformen und Rollen (Panels „Im Büro“/„Unterwegs“ mit Lizenzbadge) |
| MobileAppGallery und FeatureSnippet auf `/app` | entfernt; ersetzt durch Phone-Kacheln im Bento-Raster. Die Komponentendateien bleiben bis zur Entscheidung in Phase 10 |

## 12. scrollbar-gutter (D-14) mit Messwerten

Aus 07-08: Das globale `scrollbar-gutter: stable` erzeugte auf kurzen Seiten mit klassischen Scrollleisten eine leere Rinne. Gemessen in Chromium mit klassischen Leisten auf der 404-Seite bei 1920 × 1080: 15 px Layout-Rinne ohne Seitenüberlauf (weißer Streifen neben dunklem Header und Footer). Überlaufende Seiten (/impressum, /datenschutz bei 1440 × 900 und 390 × 844) zeigten 15 px echte Scrollleiste, WebKit 0 px. Entscheidung: Der Gutter gilt nur noch während des Drawer-Scroll-Locks und nur, wenn eine klassische Leiste Platz belegt (`HeaderShell`). Nachher: 404 bei 1920 × 1080 0 px Rinne, überlaufende Seiten unverändert 15 px, WebKit 0 px; Drawer-Fall mit klassischen Leisten ohne Seitensprung (Body-Breite 375 px vor, während und nach dem Öffnen). Bekannte, bewusst in Kauf genommene Nebenwirkung (07-REVIEW IN-01): seitlicher Versatz um die Leistenbreite beim Wechsel zwischen kurzer und langer Seite.

## 13. Vermerk Phase 10 und offene Punkte

- **Phase 10:** `components/product-demo/*`, `MobileAppGallery` und die zwei auf Dateiebene übersprungenen Specs (`demo-planning.pw.cjs`, `mobile-step-flow.pw.cjs`) bleiben bis zur Inhaberfreigabe unverändert erhalten (wieder einbinden oder archivieren).
- **Leerraum in Icon-Kacheln ohne Phone** (deferred-items 07-08): Bei 1024 px bis 122 px Leerraum in md-Kacheln von Rastern ohne große Phone-Kachel (unter anderem plantafel, angebote, dashboard, kundenportal, gaeb, mahnwesen), bei 1440 px höchstens 49 px; vor und nach B10 identisch. Vorschlag: Text der md-Kachel unten ausrichten oder Raster zwischen 1024 und 1279 px dreispaltig; braucht eine UI-SPEC-Abweichung.
- **Dimmstufe FeatureSnippet** (deferred-items 07-08): Inaktive Schritte mit 50 % bzw. 35 % Deckkraft lösen in Animations-Zwischenständen axe `color-contrast` aus; die Fläche ist `aria-hidden` und dekorativ, der statische Endzustand ist axe-frei. Entscheidung zusammen mit `components/product-demo` in Phase 10.
- **Zurückgestellte Review-Lows:** IN-01 (Gutter, siehe Abschnitt 12), IN-06 (`INHALTE` überschreibt doppelte Slugs stillschweigend), IN-07 (`zielwerte` nach `lib/keyword-map.ts` verschieben), IN-08 (doppelte Validierung und Hilfsfunktionen) sowie der zweite Teil von IN-05 (CLS zusätzlich ohne reduzierte Bewegung auf den 8 Snippet-Seiten).
- **Release-Belegtests ohne neuen Helfer:** `pricing-parity.test.ts` und `product-register.test.ts` (Phase 5/6) nutzen den in WR-07 eingeführten Helfer `tests/release-repos.ts` noch nicht und werden auf Hosts ohne Release-Repos weiterhin ohne sichtbaren Grund übersprungen.

## 14. Offene Inhaberaktionen

1. **Sichtung der Screenshots** (07-VALIDATION „Manual-Only“): `C:\Projekte\Websitenerstellung\craftos\test-results\visual\` (lokal, gitignoriert), zum Beispiel `chromium-1440-app.png`, `chromium-390-app.png`, `webkit-1440-app.png`, `chromium-1440-funktionen-mahnwesen.png`, `chromium-390-funktionen-terminplanung.png`, `chromium-1440-funktionen-gaeb.png` (alle Breiten 360–1440), oder live https://craftos.eu/app und https://craftos.eu/funktionen/mahnwesen.
2. **Analytics-Kontrolle** `trial_click`/`ai_visit` nach 24 Stunden (Anleitung in Abschnitt 8).
3. **Koordinationsrezept:** Für das Website-Repo fehlt weiterhin ein Rezept (zum Beispiel `website-unit`, `website-build`, `website-e2e`). Bei Bedarf kann es gebaut werden, damit schwere Website-Läufe künftig ohne `--host` vergeben werden können.
4. **Offene Punkte aus 07-REVIEW** und deferred-items (Abschnitt 13) bei der Planung der Phasen 8 bis 10 berücksichtigen.

## 15. Auslegungen

a. **H1 und Keyword-Regel (D-22):** Die H1 entspricht exakt dem Zielwert der Keyword-Map. Die Keyword-Regel gilt über das Kopfwort des Hauptkeywords, nicht über die wörtliche Keyword-Phrase.
b. **Description-Grenze (D-10):** Es gilt die Grenze von 155 Zeichen laut Test statt 158.
c. **Zusatzfunktionen ohne eigene Seite (D-21):** Sie erscheinen als Kachel mit `data-zusatz` auf ihrer Zielseite. „21 Sprachen“ verweist auf `/app`.
d. **FeatureSnippet (D-19):** Nur auf 8 Detailseiten und dort als einziges animiertes Element.
e. **Rollen (B2):** Rollen sind die Release-Presets plus „Kunde“. „Büro“ ist eine Lizenzstufe, keine Rolle. Seit WR-03 erscheint „Kunde“ nicht mehr unter einem Lizenzbadge, sondern als `kundenHinweis` („keine Lizenz“) im Web-Panel.
f. **Offline (B6, D-23):** Offline steht als Kennzahl nur mit der Pflicht-Einschränkung („ohne Empfang nur teilweise nutzbar“).
g. **„Höchstens eine Überschrift je Abschnitt“:** Ausgelegt als genau eine H2 je Abschnitt. Kachel- und FAQ-Titel sind H3.
h. **Links von Gewerkeseiten (D-12):** Links von den Gewerkeseiten auf die neuen Detailseiten folgen mit dem Gewerke-Umbau in Phase 8 (Deferred). D-12 ist in Phase 7 über Menü, Übersicht `/funktionen`, verwandte Funktionen und Hilfe/Ratgeber erfüllt.
