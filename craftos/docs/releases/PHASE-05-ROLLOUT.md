# Rollout-Nachweis Phase 5 – Produktwahrheit, Designsystem v2 und Medienpipeline

Stand: 21. Oktober 2026, 01:43–01:50 (MESZ). Freigabe des Inhabers für Ausführung und Rollout von Phase 5: „Los, macht das allerallerbeste draus“. Grundlage: Plan 05-08 (D-10), globale Regel 5 (Tests nur lokal).

## 1. Ausgelieferter Stand

| Angabe | Wert |
|---|---|
| Website-Repository | `badalyan-max/Websitenerstellung`, Branch `main` |
| Website-Commit (Code-Push) | `0480e0632a265e3ee4e918ce5a17a79942b8937d` (`0480e06`) |
| Vorheriger Stand origin/main | `782d94768c2cf9dc8f0481b7c9d8021c9566dd13` |
| Umfang des Pushs | 50 lokale Commits der Pläne 05-01 bis 05-08 inklusive Review-Fixes; `git diff origin/main...HEAD`: 233 Dateien (208 außerhalb von `.planning/`) |
| Produktbasis Web-App | `craft-connect-buddy`, `origin/release`, Tag `v4.0.0-test.239`, Commit `535206b42aace73bb53b2796c5072cea78ac10fd` |
| Produktbasis Mobile-App | `craftos-mobile`, `origin/release`, Tag `mobile-v1.0.0-test.93`, Commit `5610a06415361f5c5a01c90258352ed7f49b7bab` |

Die Web-Basis war beim Phasen-Gate um zwei Commits weitergelaufen (`v4.0.0-test.238` → `v4.0.0-test.239`: Telefonspalte in internen Analytics-Listen und die zugehörige Migration). Die Änderung betrifft weder Preise noch beworbene Funktionen. Snapshot (`npm run sync:product`), `lib/product-register.ts` und `docs/PRODUCT-REGISTER.md` wurden nachgezogen. Der neue Paritätsfall „Register und Preis-Snapshot nutzen denselben Web-Commit“ ist grün, ebenso die Belegpfadprüfung des Registers gegen den neuen Commit.

## 2. ship-gate über den Gesamtdiff

Umfang: `git diff origin/main...HEAD` (alle Phase-5-Commits). Das Gate lief einmal unmittelbar vor dem einzigen Code-Push. Der Koordinationsstatus wurde vorher gelesen: Edgar war bereit, EdgarsPC offline/veraltet. Für das Website-Repo gibt es kein Koordinationsrezept (Lücke), daher liefen die Prüfungen lokal nacheinander mit jeweils genau einem schweren Prozess.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (Vitest) | 21 Dateien, 249/249 bestanden |
| `npm run lint` | grün (0 Befunde) |
| `npm run typecheck` | grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.239 (535206b4)“ |
| `node scripts/check-no-secrets.mjs` über `app components content docs public scripts lib tests ../.planning` | „OK: Schlüssel in keiner Datei“; zusätzlicher Muster-Scan der hinzugefügten Diff-Zeilen ohne Treffer |
| `npm run build` | grün |
| `npm run test:e2e` gegen `next start -p 3100` (Chromium/WebKit, 1440/390, alle testMatch-Dateien inkl. `design-v2.pw.cjs`) | 220 bestanden, 0 fehlgeschlagen, 28 übersprungen (projektgebundene Skips: 14 Fälle laufen je nur in einer Viewport-Konfiguration) |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | exitCode 0 (inkl. Flag announcement) |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 10/10 OK |
| `visual-audit.mjs` für `/styleguide,/funktionen,/preise` | 30 Aufnahmen (Chromium/WebKit, 360–1440), 0 Befunde; Ablage `craftos/test-results/visual/` (lokal, gitignoriert) |
| Port 3100/3101 nach den Läufen | frei (Server über die eigene PID beendet) |

Review: Der Standard-Review der Phase lief als offizieller GSD-Phasenreview (`05-REVIEW.md`: 0 critical, 3 high, 6 medium, 13 low). Alle High- und Medium-Befunde sowie sechs Low-Befunde sind behoben (`05-REVIEW-FIX.md`, 16 Commits). Sieben Low-Befunde sind begründet zurückgestellt (LO-03, LO-05, LO-06, LO-07, LO-10, LO-11, LO-13). Seit dem Review (`6b6e9dd`) kam nur Commit `0480e06` hinzu (Paritätsfall, Register-Basis, `scripts/live-check.mjs`). Ihn hat der ausführende Agent selbst gesichtet, ohne Befund; eine unabhängige Zweitprüfung dieses kleinen Deltas fand nicht statt. Ein Ultra-Review wurde nicht gestartet.

## 3. GitHub-Workflows vor dem Push

Ausgabe von `gh workflow list --all`:

```text
Dependabot Updates	active	227711329
```

Das Repository enthält kein Verzeichnis `.github/workflows`; der Diff ändert nichts unter `.github`. „Dependabot Updates“ ist der von GitHub verwaltete dynamische Dependabot-Workflow und reagiert nicht auf einen Push nach `main`. Der Push löste damit keine Test- oder CI-Läufe aus. Kein Workflow wurde angelegt oder aktiviert, und kein CI-Lauf dient als Beleg.

## 4. Push und Vercel-Deployment

- `git push origin main`: `782d947..0480e06  main -> main` (einziger Code-Push der Phase).
- Vercel-Projekt `craftos` (Team `craft-os`), Production-Deployment `dpl_3aQdr36jCqzeWzRVQABWnQFxbW49`, URL https://craftos-b9xmxut48-craft-os.vercel.app, Status **READY** (Build 28 s, erstellt 21.10.2026 01:43:47 MESZ).
- Aliase: https://craftos.eu, https://www.craftos.eu, craftos-black.vercel.app, craftos-craft-os.vercel.app, craftos-git-main-craft-os.vercel.app.
- Die uncommittete lokale Datei `.planning/config.json` war nicht Teil des Pushs.

## 5. IndexNow

Erst nach bestätigtem Live-Stand ausgeführt: `npm run indexnow` → „IndexNow: 125 URLs gemeldet, HTTP 200“.

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
Ergebnis: alle Prüfungen OK
```

Zusätzliche Live-Stichproben: `/gewerke` zeigt die sichtbare Kennzeichnung „Darstellung, KI-gestaltet“ (MEDIA-03/04). `/preise` enthält den Satz „…zum Start gibt es einmalig 150 Credits (entspricht 1,50 €; 1 Credit = 0,01 €)“.

## 7. Analytics (trial_click, ai_visit)

Die Ereignisse sind im Code verdrahtet: `trial_click` und `login_click` über `lib/tracking.ts` (`classifyAppLink`), `ai_visit` in `components/Analytics.tsx`. Live liefert `/_vercel/insights/script.js` HTTP 200, Web Analytics ist also aktiv. Eine Zählung der letzten 24 Stunden war nicht möglich: Die Vercel-CLI 50.1.3 hat keinen Analytics-Befehl, und die Vercel-MCP-Werkzeuge standen dieser Ausführung nicht zur Verfügung. Diese Prüfung ist daher eine Inhaberaktion:

1. Vercel-Dashboard → Projekt `craftos` → Analytics → Reiter „Events“ öffnen.
2. Zeitraum „Last 24 hours“ wählen (frühestens 24 Stunden nach 01:43 MESZ am 21.10.2026 aussagekräftig).
3. Prüfen, dass `trial_click` und `ai_visit` in der Ereignisliste erscheinen; Zahlen bei Bedarf in diesem Abschnitt nachtragen.

## 8. Messbericht nach dem Rollout (SEO-07)

- Ausgangsstand (Plan 05-07, unverändert): `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md`
- Etappe Rollout: `craftos/docs/seo/reports/2026-10-21-messbericht-rollout-phase05.md`, Rohdaten `2026-10-21-raw-rollout-phase05-*.json` (6 Dateien). Erzeugt mit `node scripts/seo-report.mjs --etappe rollout-phase05`, einmal ausgeführt, 8 MCP-Aufrufe, 0 Units. Danach meldete `check-no-secrets.mjs docs/seo scripts` „OK“.
- Kernzahlen: bestehende Seiten 1 Keyword in den Top 100 und 0 in den Top 10 (107 gemessen); geplante Seiten 0/0 (19 gemessen); Share of Voice CraftOS 0,02 % (±0); 12 verweisende Domains (±0); Domain InLink Rank 3. Der Rollout ist erst wenige Minuten alt. Der Bericht dokumentiert damit den Stand am Rollouttag; Ranking-Effekte zeigen frühestens die Etappenmessungen der Phasen 6 bis 10.

## 9. Anforderungsstatus

| Anforderung | Status nach Phase 5 |
|---|---|
| PROD-02 | erledigt (Preis-Snapshot, Paritätstest, Register und Snapshot auf demselben Web-Commit) |
| PROD-03 | erledigt (Faktenseite und abgeleitete Preise, Literal-Scan inklusive Faktenseite) |
| PROD-04 | erledigt (keine Ankündigungen; live geprüft auf /funktionen, /craft-ai, /vergleich, /fakten-ueber-craftos) |
| DESIGN-04 | erledigt (Styleguide mit noindex, X-Robots-Tag, nicht in Sitemap) |
| MEDIA-03 | erledigt (sichtbare KI-Kennzeichnung, live auf /gewerke) |
| MEDIA-04 | erledigt (Medienpipeline und Kennzeichnung ausgeliefert) |
| SEO-07 | erledigt (Projektabgleich 126/126 Hauptkeywords, limits[] leer; Etappenmessung rollout-phase05 liegt vor) |
| SEO-08 | Phase-5-Anteil erledigt (Linkplan, Statusregister mit 65 Zielen, Übergabe 1). Das Meilensteinziel von mindestens 15 neuen seriösen verweisenden Domains bleibt offen (Stand 0) |
| DESIGN-02 | Phase 5 Grundlage, Umsetzung Phasen 6–8 |
| SEO-02 | Phase 5 Grundlage, Umsetzung Phasen 6–8 |

## 10. Offene Inhaberaktionen

1. **Linkplan Übergabe 1** ausführen (`craftos/docs/seo/LINKPLAN.md` §4: ProvenExpert, G2/Capterra/GetApp/Software Advice, OMR-Nachfassen, kennstdueinen.de, SoftwareWorld, zwei Portal-E-Mails).
2. **Sichtung /styleguide**: Screenshots unter `craftos/test-results/visual/` (zum Beispiel `chromium-1440-styleguide.png`, `chromium-390-styleguide.png`, `webkit-1440-styleguide.png`) oder live https://craftos.eu/styleguide (noindex).
3. **SE-Ranking-AI-Tracker**: Zehn themenfremde ChatGPT-Prompts wurden automatisch angelegt. Löschen oder Ersetzen nur nach Freigabe durch den Inhaber; bis dahin bleiben sie unverändert.
4. **Analytics-Kontrolle** `trial_click`/`ai_visit` nach 24 Stunden (Anleitung in Abschnitt 7).
5. **Koordinationsrezept**: Für das Website-Repo fehlt ein Rezept (zum Beispiel `website-build`/`website-e2e`). Bei Bedarf kann es gebaut werden, damit schwere Website-Läufe künftig ohne `--host` vergeben werden können.
