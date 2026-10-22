# Rollout-Nachweis Phase 8 – SEO und KI-Sichtbarkeit

Stand: 23. Oktober 2026, 00:48–01:30 (MESZ). Freigabe des Inhabers für die Fertigstellung aller restlichen Phasen ohne Rückfragen am 21.10.2026 („ja mach einfach bis du sie alle fertig hast“). Grundlage: Plan 08-14 (D-13, D-14, D-15, D-19, D-24), globale Regel 5 (Tests nur lokal).

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `f029bc60c44b53305209fabdae54c20bed879324` (`f029bc6`) |
| Vorheriger Stand origin/main | `f22ee781f47f33a47d042830ad291d7b8cc2916e` (`f22ee78`, DATANORM-Hotfix vom 22.10.2026) |
| Umfang des Pushs | 156 lokale Commits: Pläne 08-01 bis 08-13, Code-Review (`08-REVIEW.md`) mit 20 Fix-Commits (`08-REVIEW-FIX.md`), Produktabgleich `62f4478`, Planungsdokumente Phase 9 (nur `.planning/`), Task 1 von 08-14 (`33a5e00`) und eine Kommentarkorrektur aus dem ship-gate (`f029bc6`). `git diff origin/main...HEAD`: 246 Dateien, 38.484 Einfügungen, 3.553 Löschungen (183 Dateien außerhalb von `.planning/`); keine Datei unter `.github/` |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.245`, Commit `6686d05e0aed9d9ed1a9959ddc2142928e874e84` |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.96`, Commit `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` |

`npm run sync:product:check` meldete beim Phasen-Gate „Snapshot ist aktuell: v4.0.0-test.245 (6686d05e).“ Der Abgleich von Snapshot und Register hatte der Orchestrator unmittelbar vor diesem Plan mit `62f4478` erledigt (vorher v4.0.0-test.244 bzw. test.239 zu Phasenbeginn). Preise, Testphase und Credit-Werte blieben dabei unverändert; geändert haben sich nur Tag, Commit und Prüfdatum.

Inhalt des Stands: vier Alternativen-Seiten (`/vergleich/plancraft-alternative`, `/vergleich/craftnote-alternative`, `/vergleich/hero-alternative`, `/vergleich/tooltime-alternative`) mit datierten, belegten Wettbewerberangaben; neue Seite `/vergleich/handwerkersoftware-kleine-betriebe`; `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai` und `/gobd` auf v2-Bausteinen mit Antwort zuerst; sitewide Title, H1 und Description nach der Keyword-Map; sichtbare Brotkrumen mit genau einer BreadcrumbList auf allen Seiten außer der Startseite; eigene OG-Grafik je Seite (`<pfad>/opengraph-image`, statisch erzeugt); Footer-Spalte „Vergleiche“; `llms.txt` mit allen Vergleichsseiten; `lastmod` der zehn Phase-8-Seiten und der zwei Ratgeber mit neuem Vergleichslink in der Sitemap auf 2026-10-23.

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-8-Commits). Das ship-gate lief direkt nach dessen SKILL.md (`C:/Users/badal/.claude/skills/ship-gate/SKILL.md`), weil das Skill-Tool in dieser Ausführung nicht zur Verfügung stand. Es lief einmal unmittelbar vor dem einzigen Code-Push. Vorher wurde der Koordinationsstatus gelesen (22.10.2026, 22:52 UTC): `edgar` bereit (Runner 1.9.9), `edgarspc` offline bzw. veraltet. Für das Website-Repo gibt es kein Koordinationsrezept (Lücke). Die Prüfungen liefen daher lokal unter der Sperre `.heavy-lock` nacheinander mit jeweils genau einem schweren Prozess.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest) | 39 Dateien, 863/863 bestanden |
| `npm run lint` | grün (0 Befunde) |
| `npm run typecheck` | grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.245 (6686d05e).“ |
| `node scripts/check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `npm run build` | grün, alle Seiten und OG-Bilder statisch |
| `node scripts/seo-audit.mjs` (vollständig, streng) | 136 von 136 Sitemap-URLs, 12 Regeln (title, description, h1, keyword, map, breadcrumbs, og, faq-schema, schema, antwort, duplikate, prompts), 0 Verstöße |
| `npm run test:e2e` gegen `next start -p 3100` (Chromium/WebKit, alle testMatch-Dateien inkl. `vergleich.pw.cjs`) | 424 Fälle: 333 bestanden, 0 fehlgeschlagen, 91 übersprungen (projektgebundene Skips), Laufzeit 11,2 min |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 (136 Routen, 139 Links, 14 Assets, 10 unbekannte Pfade 404, 6 OG-Bilder 200 image/png) |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 62/62 OK (Phase 5 bis Phase 8) |
| `visual-audit.mjs` für die zehn Phase-8-Seiten (nicht blockierend) | 100 Aufnahmen (Chromium/WebKit, 360/390/768/1024/1440), 0 Status-, Overflow-, JS- und A11y-Befunde |
| Port 3100 nach den Läufen | frei (Server über die eigene PID beendet), Sperre entfernt |

Review: Als Standard-Review der Phase gilt der offizielle GSD-Phasenreview `08-REVIEW.md` (Tiefe deep, 162 Dateien; 3 High, 6 Medium, 8 Low, 4 Info). Laut `08-REVIEW-FIX.md` sind alle 20 Befunde mit Handlungsbedarf behoben (HI-01 bis HI-03, ME-01 bis ME-06, LO-01 bis LO-08, IN-02 bis IN-04), jeder mit eigenem Commit; IN-01 ist eine Bestätigung ohne Änderungsbedarf. Seit dem Review-Fix (`b1ab0bb`) kamen hinzu: `62f4478` (Produktabgleich), `33a5e00` (Task 1: Sitemap-Daten, Ratgeber-`updatedAt`, Phase-8-Prüfungen in `scripts/live-check.mjs`) und `f029bc6`. Der ausführende Agent hat dieses Delta selbst gesichtet. Befund: Der Produktsync hatte im IN-04-Kommentar von `lib/product-register.ts` die frühere `git describe`-Ausgabe durch den neuen Tag ersetzt; korrigiert in `f029bc6` (nur Kommentar; Lint, Typcheck und `product-register.test.ts` 9/9 danach grün). Eine unabhängige Zweitprüfung dieses kleinen Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all` vor dem Code-Push (23.10.2026, 01:10:37 MESZ):

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github`, und der Diff ändert nichts unter `.github`. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus. Es wurde kein Workflow angelegt oder aktiviert, und kein CI-Lauf dient als Beleg. Vor dem Doku-Push mit diesem Nachweis wurde die Liste erneut geprüft (Abschnitt 15 und SUMMARY 08-14).

## 4. Push und Vercel-Deployment

- `git push origin main`: `f22ee78..f029bc6  main -> main` (01:10:42 MESZ, einziger Code-Push der Phase).
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment `dpl_2avyo678E2VrDE9GTFMc3WL9yTS6`, URL https://craftos-gfbq7n18l-craft-os.vercel.app, Status **READY** (Build 50 s, erstellt 23.10.2026 01:10:55 MESZ, 13 Sekunden nach dem Push).
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Ermittelt mit `vercel ls craftos --scope craft-os` und `vercel inspect` (Vercel-CLI 50.1.3, ohne `vercel link` im Repo). Die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach bestätigtem Live-Stand ausgeführt. Bestätigt wurde der Live-Stand durch den live-check (Abschnitt 6) und durch https://craftos.eu/sitemap.xml: 136 URLs, davon 13 mit `lastmod` 2026-10-23 (die zehn Phase-8-Seiten, die Ratgeber `handwerkersoftware-auswaehlen` und `handwerkersoftware-einzelunternehmen` sowie die daraus abgeleitete Kategorie `/blog/kategorie/softwareauswahl`). Ergebnis von `npm run indexnow` (01:12:58 MESZ): „IndexNow: 136 URLs gemeldet, HTTP 200“. Die Anzahl entspricht der Erwartung (131 URLs nach Phase 7 plus vier Alternativen-Seiten und die Seite für kleine Betriebe).

## 6. live-check gegen https://craftos.eu

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
OK     Keyword-Map aller Sitemap-URLs (136): Title, einzige H1 und Description = target
OK     Brotkrumen und BreadcrumbList: genau eine Navigation und ein Schema je URL außer /
OK     OG je Seite: og:image = <url>/opengraph-image und twitter:image = og:image (außer /)
OK     OG je Seite: Stichprobe Alternative, Ratgeber, Rechtsseite → 200, image/png, ≤ 300 KB
OK     FAQPage = sichtbare Fragen auf den 10 Phase-8-Seiten
OK     Kein Product/Review/AggregateRating unter /vergleich
OK     /preise beginnt mit Antwort und Tabelle (#antwort vor der ersten Tabelle, Voll- und App-Lizenz)
OK     Prompt-Anker live: jedes Ziel bis Phase 8 mit Anker und Antwort ≤ 300
OK     llms.txt nennt die neuen Seiten (vier Alternativen und kleine Betriebe)
Ergebnis: alle Prüfungen OK
```

62 Prüfungen (die 22 Detailseitenzeilen sind oben zu einer Zeile zusammengefasst), davon 16 neu in Phase 8: sieben zusätzliche Routen in der Ankündigungsprüfung und neun Phase-8-Prüfungen. Pfade stammen aus `/sitemap.xml`, Zielwerte für Title, H1 und Description aus `docs/seo/keyword-map.json`, Prompt-Ziele aus `docs/seo/ai-prompts-targets.json` (alle Ziele bis Phase 8; die Antwortprüfung nutzt `promptVerstoesse` und die Anker-Konvention aus `scripts/lib/seo-audit-core.mjs`). Keine Seitenzahl ist fest kodiert. Die Brotkrumenprüfung verlangt auf jeder URL außer `/` genau eine `nav[aria-label="Brotkrumen"]` und genau eine BreadcrumbList mit derselben Gliederzahl; auf den Alternativen und der Seite für kleine Betriebe 3 Glieder, auf `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai` und `/gobd` 2 Glieder. Die OG-Prüfung vergleicht den Pfad des `og:image` (ohne den Cache-Parameter `?v=`) mit `<url>/opengraph-image` und lädt die Bilder von `/vergleich/plancraft-alternative`, dem ersten Ratgeber der Sitemap und `/impressum`.

## 7. SE-Ranking-Abgleich (D-13) und Unit-Budget (D-24)

Units vorher und nachher wurden mit einem kleinen Skript im Sitzungs-Scratchpad über `DATA_getSubscription` gelesen (nutzt `createClient`/`callTool` aus `scripts/lib/se-ranking-mcp.mjs`, gibt keinen Schlüssel aus, nicht committet):

| Zeitpunkt | Units übrig | Limit | Testzugang bis |
|---|---|---|---|
| vorher (23.10.2026, 01:13:07 MESZ) | 33.921 | 100.000 | 03.11.2026 |
| nachher (23.10.2026, 01:14:01 MESZ) | 33.921 | 100.000 | 03.11.2026 |

Verbrauch dieses Plans: 0 Units (Abgleich, Etappenmessung und beide Kontostandabfragen). Der Kontostand liegt unter dem Phase-7-Stand (42.423), weil die Recherche zu Phase 9 Rohdaten abgerufen hat; Phase 8 hat ihr Budget nicht überschritten.

`node scripts/se-ranking-sync.mjs --check` (nur lesend, 8 MCP-Aufrufe), Bericht `craftos/docs/seo/reports/2026-10-23-projektabgleich.json`:

```text
Soll 126 (bestehend 117, geplant 9), Projekt 151, fehlend 0, Zielseite abweichend 0, zusätzlich 25, Wettbewerber 5, KI-Prompts 20, Limits 0, offen ohne Limit 0
```

Die Hauptkeywords der vier Alternativen-Seiten („plancraft alternative“, „craftnote alternative“, „hero software alternative“, „tooltime“) sind mit ihren Ziel-URLs im Projekt hinterlegt (bestehend 117 = 113 nach Phase 7 plus vier Alternativen; Zielseite abweichend 0). Die Seite für kleine Betriebe hat kein Hauptkeyword und wird deshalb nicht als Keyword getrackt; ihre KI-Prompts stehen im AI Result Tracker. Am Projekt wurde nichts geändert; es gibt keine offene Inhaberaktion aus dem Abgleich.

## 8. Analytics (trial_click, ai_visit)

Die Ereignisse sind im Code verdrahtet: `trial_click` und `login_click` über `lib/tracking.ts` (`classifyAppLink`), `ai_visit` in `components/Analytics.tsx`. Der live-check bestätigt `data-track="login"` am Link „Anmelden“ und CTA-Links auf app.craftos.eu ohne dieses Attribut. Live liefert `/_vercel/insights/script.js` HTTP 200 (`application/javascript`), Web Analytics ist also aktiv. Eine Zählung der letzten 24 Stunden war nicht möglich: Die Vercel-CLI 50.1.3 hat keinen Analytics-Befehl, und die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung. Diese Prüfung ist daher eine Inhaberaktion:

1. Vercel-Dashboard → Projekt `craftos` → Analytics → Reiter „Events“ öffnen.
2. Zeitraum „Last 24 hours“ wählen (frühestens 24 Stunden nach 01:11 MESZ am 23.10.2026 aussagekräftig).
3. Prüfen, dass `trial_click` und `ai_visit` weiterhin in der Ereignisliste erscheinen. Zahlen bei Bedarf in diesem Abschnitt nachtragen.

## 9. Messbericht nach dem Rollout (SEO-07)

- Frühere Berichte (alle unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`, `2026-10-21-messbericht-rollout-phase05.md`, `2026-10-21-messbericht-rollout-phase06.md`, `2026-10-22-messbericht-rollout-phase07.md`
- Etappe Phase 8: `craftos/docs/seo/reports/2026-10-23-messbericht-rollout-phase08.md`, Rohdaten `2026-10-23-raw-rollout-phase08-*.json` (6 Dateien). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase08`, einmal ausgeführt, 8 MCP-Aufrufe, 0 Units. Danach meldete `node scripts/check-no-secrets.mjs docs/seo scripts` „OK: Schlüssel in keiner Datei“.
- Kernzahlen (Vergleich mit dem Ausgangsstand 20.10.2026): bestehende Seiten 0 Keywords in den Top 10 und 2 in den Top 100 (117 gemessen; +1 in den Top 100); geplante Seiten 0/0 (9 gemessen); Zusatz-Keywords 2 in den Top 10 und 4 in den Top 100 (±0); Share of Voice CraftOS in KI-Suchen 0,02 % (±0); 12 verweisende Domains (±0, alle Spam laut Befund); Domain InLink Rank 3. Die Phase-8-Seiten sind erst wenige Minuten live; neu aufgenommene Keywords erhalten ihre erste Messung mit der nächsten täglichen Prüfung. Ranking- und KI-Effekte zeigen frühestens die Etappenmessungen der Phasen 9 und 10.

## 10. Anforderungsstatus

| Anforderung | Status nach Phase 8 |
|---|---|
| SEO-02 | erledigt (Keyword-Map aus Phase 5; Title, H1 und Description aller 136 Sitemap-URLs nach der Map, sitewide durch seo-audit und live-check geprüft) |
| SEO-03 | erledigt (vier Alternativen-Seiten live mit belegten, datierten Wettbewerberangaben, FAQPage und BreadcrumbList, verlinkt von `/vergleich` und der Footer-Spalte „Vergleiche“) |
| SEO-04 | erledigt (`/preise` beginnt mit Antwortsatz `#antwort` und der Lizenztabelle; Werte aus `lib/site.ts`, geprüft gegen den Snapshot) |
| SEO-05 | erledigt (Titel ≤ 60, Description 120–155, genau eine H1, keine Duplikate, sichtbare Brotkrumen mit Schema, eigene OG-Grafik auf allen Seiten) |
| SEO-06 | erledigt (Antwort ≤ 300 Zeichen unter jeder Frage-Überschrift der zentralen Seiten; `llms.txt`, Sitemap und IndexNow mit diesem Release aktualisiert) |
| SEO-09 | In Progress – Phase 8: alle getrackten kommerziellen KI-Prompts mit Zielseite und Anker (Antwort zuerst, FAQPage) erledigt; Abschluss Phase 9 mit den Wissenslücken KD < 20 (D-11) |
| DESIGN-02 | In Progress – Phase 8: `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`, die vier Alternativen und die Seite für kleine Betriebe auf v2; Abschluss Phase 9 mit Gewerken und Wissensinhalten (D-12) |

In `REQUIREMENTS.md` werden ausschließlich SEO-02, SEO-03, SEO-04, SEO-05 und SEO-06 als erledigt markiert. SEO-09 steht auf „In Progress“ mit dem Text „Phase 8 (kommerzielle KI-Prompts, erledigt), Phase 9 (Wissenslücken KD < 20, Abschluss)“, DESIGN-02 bleibt „In Progress“ mit „Phase 5 (Grundlage), Phasen 6–9 (Umsetzung; Abschluss Phase 9)“. In `ROADMAP.md` nennt die Requirements-Zeile von Phase 9 jetzt „(dazu Abschluss SEO-09, DESIGN-02 aus Phase 8)“, Phase 9 hat die Erfolgskriterien 5 (Abschluss SEO-09) und 6 (Abschluss DESIGN-02), und Kriterium 5 von Phase 8 trägt den Hinweis „(KD-<20-Lücken → Phase 9, D-11)“.

## 11. Neue Seiten und entfallene Altinhalte

Neue Seiten: `/vergleich/plancraft-alternative`, `/vergleich/craftnote-alternative`, `/vergleich/hero-alternative`, `/vergleich/tooltime-alternative`, `/vergleich/handwerkersoftware-kleine-betriebe`. `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai` und `/gobd` sind inhaltlich neu aufgebaut. Keine URL wurde gelöscht.

| Früherer Inhalt | Jetzt zu finden unter |
|---|---|
| Anbieterlogos auf `/vergleich` (`app/vergleich/ProviderLogo.tsx`, `public/images/brands/plancraft.svg`, `craftnote.png`, `Comparison.module.css`) | entfernt (Plan 08-10); Anbieter erscheinen als Text mit Quelle und Abrufdatum |
| Vergleichsdaten `lib/comparison.ts` | ersetzt durch die Datenmodule `lib/wettbewerber/*` (Fakt mit Quelle und `abgerufenAm`, UWG-Prüfungen) |
| `components/preise/PricingTable` | ersetzt durch die Lizenztabelle `ComparisonTable` auf `/preise` (Werte aus `lib/site.ts`) |
| PageHero, TrialCta und `ui/Faq` auf `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` | FunktionsKopf mit Antwort, CtaBand und FaqList (v2) |
| Rücklink in Artikeln (`ArticlePage`, C11) und die alte „Brotkrümelnavigation“ der Rechner | sichtbare Brotkrumen (Start › Ratgeber bzw. Hilfe › Artikeltitel) mit genau einer BreadcrumbList |
| Negativ-Eintrag „Nicht zugesagt“ (UI-SPEC § 5.2) und CraftOS-„Nein“-Zellen | entfallen nach Inhabervorgabe vom 22.10.2026 („Nur, was unterstützt wird“); Schutz über `lib/nur-unterstuetzt.ts` |

Gelöschte Dateien: nur die oben genannten, im Plan 08-10 bzw. 08-07 ausdrücklich freigegebenen (`app/vergleich/Comparison.module.css`, `app/vergleich/ProviderLogo.tsx`, `components/preise/PricingTable.tsx` und `.module.css`, `lib/comparison.ts`, zwei Logo-Dateien).

## 12. HERO-Variante (D-16)

Auf `/vergleich/hero-alternative` rendert **Variante A** (Preise mit Zahlweise). Beleg: zwei Playwright-Screenshots der HERO-Preisseite vom 22.10.2026 (Chromium 1440 × 900, „Nur notwendige Cookies“), `craftos/docs/seo/belege/2026-10-22-hero-preise-monatlich.png` und `craftos/docs/seo/belege/2026-10-22-hero-preise-jaehrlich.png`: monatlich 79/135/345 €, jährlich 69/119/299 €, App-Lizenz 25/22 €, weitere Standard-Lizenz 79/69 €. Variante B (ohne HERO-Zahl, „laut hero-software.de“) ist per Fixture getestet und greift, falls der Beleg entfällt. HERO wird mit „Grundlaufzeit laut AGB, soweit nicht abweichend vereinbart“ geführt (HI-02).

## 13. Vermerk Phase 9/10 und offene Punkte

- **Silbentrennung in einer H2 auf `/preise`:** Bei 1440 px trennt „Was kostet eine Handwer-kersoftware pro Monat?“ das Kopfwort (Screenshot `chromium-1440-preise.png`). Die Überschrift trägt das Prompt-Ziel `#was-kostet-handwerkersoftware`; eine Textänderung so kurz vor dem Push wurde bewusst unterlassen. Vorschlag: `hyphens: manual` für H2 bzw. Kurzform ohne Kopfwortbruch in einem UI-Plan (Phase 9 oder 10), wie in 08-10/08-11 bei anderen Überschriften gelöst.
- **Tabellen-Caption scrollt mit** (`ComparisonTable`, deferred-items 08-10): bei 360 px rechts angeschnitten, bis seitlich gewischt wird; kein Seitenüberlauf.
- **Kontrast eines Textlinks im Impressum** (deferred-items 08-02, #d28a13 auf Weiß 2,84 : 1); Rechtsseiten-Styling braucht Freigabe.
- **Verneinte KI-Formulierungen in Wissensinhalten** (deferred-items 08-13): `content/blog/ki-belegscan-pruefen.md` und `content/hilfe/ki-entwurf-pruefen-uebernehmen.md`; dazu „Teilweise“ bzw. „ohne Empfang nur teilweise nutzbar“ in `lib/app-content.ts` und `lib/llms.ts` (08-REVIEW-FIX Hinweis 2). Gehört zum Inhaltsumbau in Phase 9.
- **Bewusst belassene Überclaim- und Datenschutzaussagen:** `/gobd` „Ist CraftOS GoBD-zertifiziert? – Nein“ sowie die Standort-/Bewegungsaussagen auf `/fakten-ueber-craftos` (deferred-items 08-13); bei Bedarf Inhaberentscheidung.
- **Snapshot-Feld `tag`** speichert für Mobile weiterhin die Ausgabe des Sync-Skripts; das Register nennt den echten Tag (08-REVIEW-FIX Hinweis 3).
- **E2E-Zeitflakes:** Im Phasen-Gate trat kein Fehlschlag auf (333/0). Die in deferred-items 08-02 bis 08-09 beschriebenen WebKit-Flakes sind durch 08-13 (Reduced Motion, Kartenraster) behoben; Beobachtung in Phase 10 (QA-05).

## 14. Offene Inhaberaktionen

1. **Sichtung der Screenshots** (08-VALIDATION „Manual-Only“): 100 Aufnahmen der zehn Phase-8-Seiten im Sitzungs-Scratchpad `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\08-14\` (zum Beispiel `chromium-1440-preise.png`, `chromium-390-vergleich-hero-alternative.png`, `webkit-390-vergleich-handwerkersoftware-kleine-betriebe.png`) bzw. lokal `craftos\test-results\visual\` (gitignoriert), oder live https://craftos.eu/preise und https://craftos.eu/vergleich.
2. **HERO-Preiszuordnung** (Variante A): die zwei Screenshots unter `craftos/docs/seo/belege/` mit https://craftos.eu/vergleich/hero-alternative vergleichen.
3. **Analytics-Kontrolle** `trial_click`/`ai_visit` nach 24 Stunden (Anleitung in Abschnitt 8).
4. **Inhaltliche Abnahme der Review-Fixes:** HI-01, HI-02, HI-03, ME-01 und ME-04 haben sichtbare Aussagen über CraftOS und Mitbewerber geändert (belegt in Datenmodulen, Register und Release-Code); Wortlaut bitte sichten (08-REVIEW-FIX Hinweis 6).
5. **Wettbewerberangaben spätestens nach 60 Tagen neu prüfen:** Abrufdatum 22.10.2026 → spätestens am 21.12.2026 Quellen neu prüfen und `abgerufenAm` aktualisieren; der Testbericht zeigt dann „NEU PRÜFEN: …“ (LO-08).
6. **Datenschutzabschnitt Webanalyse** weiter offen (Vercel Web Analytics im Datenschutztext; Rechtstexte nur mit Freigabe, D-20). Ebenso der Impressum-Hinweis „§ 5 DDG“ statt „§ 5 TMG“.
7. **Koordinationsrezept:** Für das Website-Repo fehlt weiterhin ein Rezept (zum Beispiel `website-unit`, `website-build`, `website-e2e`). Bei Bedarf kann es gebaut werden, damit schwere Website-Läufe künftig ohne `--host` vergeben werden können.
8. **Offene Punkte aus 08-REVIEW** und deferred-items (Abschnitt 13) bei der Planung der Phasen 9 und 10 berücksichtigen.

## 15. Auslegungen

a. **„Welle 1“-Umfang:** Der in CONTEXT als eine Welle beschriebene Grundlagenumfang ist auf 08-01 (Schutztests, `metaFor`, Anker-Konvention, KeyFacts-Kurzform `wettbewerber:`, Post-Build-SEO-Audit) und 08-02 (Brotkrumen sitewide in einem Zug) verteilt.
b. **Begriff „Extra-Speicher“** statt „Zusatzspeicher“ sitewide (PROD-03, `lib/site.ts`, `llms.txt`, live-check); UI-SPEC-Stellen mit „Zusatzspeicher“ sind so umgesetzt.
c. **Anker-Konvention** (DESIGN-V2 § 17): Prompt-Ziele zeigen auf einen Absatz, eine Frage-Überschrift oder eine FAQ-H2; die Antwort darunter hat höchstens 300 Zeichen. seo-audit und live-check nutzen dieselbe Funktion.
d. **H1 nach D-17 mechanisch-minimal:** Enthält die bisher gerenderte H1 das Kopfwort des Hauptkeywords, bleibt sie; sonst wird das Kopfwort vorangestellt oder ein Synonym ersetzt (62 geänderte H1, Änderungsliste in `docs/seo/KEYWORD-MAP.md` § 6).
e. **Preisnote** „Alle Preise netto zzgl. Umsatzsteuer“ statt „zzgl. USt.“, damit die Paritätsprüfung den Wortlaut eindeutig findet.
f. **Rechtsseiten** (`/agb`, `/datenschutz`, `/impressum`) erhalten Brotkrumen und die Standard-OG des Seitentyps „Rechtliches“ mit Seitennamen; die Rechtstexte selbst sind unverändert (D-20).
g. **Tracker-Umfang:** Das Prompt-Mapping führt alle 20 Tracker-Einträge mit 18 unterschiedlichen Texten (16 ChatGPT, 2 Perplexity, 2 AI Overview; D-18); Wissenslücken mit KD < 20 sind als Phase 9 gemappt (D-11).
h. **Klarstellung D-19:** Links von den Gewerkeseiten auf die neuen Funktionsdetailseiten folgen in Phase 9 mit dem Gewerke-Umbau. Dies korrigiert PHASE-07-ROLLOUT.md § 15h („Gewerke-Umbau in Phase 8“); Gewerke waren in Phase 8 außerhalb des Umfangs (CONTEXT „Deferred Ideas“).
i. **Inhabervorgabe 22.10.2026** („Nur, was unterstützt wird, nicht, was nicht unterstützt wird“) geht UI-SPEC U6 und § 5.2 vor: keine CraftOS-Negativzeilen, keine Nein-FAQ zu CraftOS-Funktionen, DATANORM nur positiv als „DATANORM 4 und 5“; Fairness über belegte Stärken der Wettbewerber. Einzige Ausnahme ist die GoBD-Zertifizierungsantwort (Überclaim-Schutz).

## 16. Doku-Push

Vor dem zweiten Push (nur dieser Nachweis, Messbericht mit Rohdaten, Projektabgleich, SUMMARY 08-14, STATE, ROADMAP, REQUIREMENTS) lief das ship-gate über den reinen Doku-Diff (`check-no-secrets` für `docs`, `../.planning`; Prüfbefehl des Plans) und erneut `gh workflow list --all`; die Ausgabe steht im SUMMARY 08-14.
