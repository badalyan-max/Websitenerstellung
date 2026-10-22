# Phase 8 – zurückgestellte Befunde (außerhalb des jeweiligen Plans)

## Aus 08-02 (22.10.2026)

- **/impressum: Kontrast eines Textlinks im Rechtstext (axe `color-contrast`, serious).** `app/impressum/page.tsx` Z. 76, Klasse `font-semibold text-primary-600 hover:underline` (#d28a13 auf Weiß, 2,84 : 1, nötig 4,5 : 1). Gemessen mit `scripts/visual-audit.mjs` bei 390 und 1440 px in Chromium und WebKit. Bestand vor 08-02, nicht durch die Brotkrumen verursacht; 08-02 darf den Rechtsbereich nur um die Kopfzeile ergänzen (D-20). Vorschlag: Linkfarbe auf einen Ton mit ≥ 4,5 : 1 (z. B. `text-primary-800` #784b10) in einem Plan mit Freigabe für Rechtsseiten-Styling.
- **E2E-Zeitflakes in WebKit unter Volllast.** Drei volle Läufe (`npm run test:e2e` zweimal mit 2 Workern, einmal `--workers=1`) endeten mit 3, 2 bzw. 1 Fehlschlag; betroffen waren jeweils andere, zeitabhängige Fälle: `function-illustrations.pw.cjs:443` „Handyansicht dashboard/angebot“ (webkit-1440, kurzzeitiger Überlauf während der Snippet-Animation), `function-illustrations.pw.cjs:281` „emulierter Tab-Sichtbarkeitswechsel“ (webkit-1440, Phasenwechsel 1→2 zwischen Auslesen und Pause) und `home-navigation.pw.cjs:501` „Funktionsübersicht: Sprunglinks, reduzierte Bewegung …“ (webkit-390-touch; WebKit meldet nach der Hydration bis zu ~2 s lang mehrere hundert `tab-size`-Übergänge auf FeatureCards/MiniUi, unter Last länger als das 3-s-Poll-Fenster). Alle Fälle bestehen einzeln (Tab-Sichtbarkeit 5/5 mit `--repeat-each=5`). Keiner berührt die Brotkrumen. Vorschlag: Poll-Fenster auf 6 s anheben bzw. die Phase erst nach `data-running="false"` auslesen – in einem eigenen QA-Plan (Phase 10, QA-05).

## Aus 08-03 (22.10.2026)

- **Produkt-Snapshot veraltet: `tests/pricing-parity.test.ts` „Snapshot ist aktuell: Commit entspricht origin/release“.** Das Web-Repo `C:/Projekte/craft-connect-buddy` hat `origin/release` am 22.10.2026 um 17:56 (+02:00) auf `1e9c8bc288dc` vorgerückt; `product-source-snapshot.json` steht noch auf `535206b42aac`. Der Test war im Vitest-Lauf nach Task 1 noch grün und nach Task 2 rot – unabhängig von den Bausteinänderungen (08-03 ändert keine Produktdaten). Vorschlag: Snapshot-Abgleich (Preise, Testphase, Register) in einem eigenen Produktsync-Schritt prüfen und den Snapshot erst nach Faktenabgleich aktualisieren, nicht blind hochziehen.

## Aus 08-07 (22.10.2026)

- **`home-navigation.pw.cjs:501` (webkit-390-touch, /funktionen) jetzt auch einzeln rot.** Voller Lauf und Einzelwiederholung (`--project=webkit-390-touch`, Server auf 3101 nach Merge von main) melden jeweils 555 laufende Animationen nach 3 s (`document.getAnimations()`), also die in 08-02 beschriebenen `tab-size`-Übergänge. 08-07 berührt /funktionen nicht. Vorschlag wie unter 08-02 (Poll-Fenster bzw. Auslesen nach `data-running="false"`), eigener QA-Plan.
- **`tests/content.test.ts` „has valid categories, source metadata and feature links“ überschreitet unter der vollen Vitest-Suite das 5-s-Zeitlimit** (zweimal 5,0 bzw. 5,1 s), einzeln grün (10/10). Unabhängig von 08-07; Vorschlag: Testzeitlimit für diesen Fall anheben.

## Aus 08-08 (22.10.2026, Worktree wt-08d, Port 3103)

- **E2E-Zeitflake `home-navigation.pw.cjs:501` (webkit-390-touch) auch in der Einzelwiederholung rot.** Voller Lauf: 289 bestanden, 4 rot (3 × `function-illustrations.pw.cjs:443` webkit-1440 „Handyansicht rechnung/zeit/aufmass“, kurzzeitiger Überlauf; 1 × `home-navigation.pw.cjs:501`). Einzelwiederholung nach dem Merge von main: `function-illustrations.pw.cjs:443` 8/8 grün, `home-navigation.pw.cjs:501` erneut rot mit 875 statt 0 Übergängen (dasselbe `tab-size`-Muster wie aus 08-02 beschrieben). Betrifft `/funktionen`, nicht die Alternativen-Seiten; 08-08 ändert weder `/funktionen` noch FeatureCards/MiniUi. Vorschlag unverändert: Poll-Fenster anheben bzw. Übergänge erst nach Hydration zählen (QA-Plan Phase 10, QA-05).
- **`tests/content.test.ts` „has valid categories …“ Zeitüberschreitung (5 s) nur in der vollen Suite unter Last;** einzeln grün (108/108 zusammen mit vergleich-seiten und funktionsdetails). Vorschlag: Testzeitlimit der Datei anheben. → **Erledigt in 08-09** (Zeitlimit 60 s, Commit `1e1cbb6`).

## Aus 08-09 (22.10.2026, Worktree wt-08d, Port 3103)

- **E2E-Zeitflakes WebKit unter Volllast:** voller Lauf 291 bestanden, 2 rot – `function-illustrations.pw.cjs:476` „Pause friert auch gleitenden Cursor und Einsatzkarte ein“ (webkit-1440, neuer zeitabhängiger Fall derselben Familie) und `home-navigation.pw.cjs:501` (webkit-390-touch). Einzelwiederholung: 476 mit `--repeat-each=3` 3/3 grün, 501 1/1 grün. Beide betreffen Bestandsseiten, nicht die Alternativen. Vorschlag unverändert (QA-Plan Phase 10, QA-05).
- **Voller `seo-audit` (alle Regeln, alle Pfade) meldet Verstöße außerhalb von 08-09:** `faq-schema` auf `/gobd` („Wie unterstützt CraftOS GoBD-konforme Abläufe?“ nicht sichtbar) und `prompts` für `/vergleich#antwort`, `/fakten-ueber-craftos#was-ist-craftos` und `/vergleich/handwerkersoftware-kleine-betriebe#antwort`. Bestand bzw. Gegenstand von 08-10/08-11 und Spur C; unabhängig von der Änderung an `plain()` (mit der vorherigen Fassung identisch, dort zusätzlich die HERO-H1-Fehlmeldung). Die im Plan geforderten Audits (vier Alternativen; `--only=title,description,h1,duplikate,map,breadcrumbs,og`) sind 0.
- **Produkt-Snapshot weiterhin veraltet** („Snapshot ist aktuell“ rot, Vergleich `1e9c8bc…` gegen `13c72e0…`); laut Auftrag nicht angefasst.

## Aus 08-10 (22.10.2026, Haupt-Arbeitsbaum, Port 3100)

- **Prompt-Ziel `/vergleich/handwerkersoftware-kleine-betriebe#antwort` fehlt im Build** (`seo-audit --only=prompts`, 1 Verstoß). Gegenstand von 08-11 (Seite „kleine Betriebe“); `/vergleich#antwort` und `/fakten-ueber-craftos#was-ist-craftos` sind nach 08-10/08-12 erfüllt.
- **Tabellen-Caption scrollt mit der Tabelle** (Bestand `ComparisonTable`): Bei 360 px ist die Caption „Handwerkersoftware im Überblick“ wie auf `/preise` und den Alternativen-Seiten rechts angeschnitten, bis seitlich gewischt wird. Kein Überlauf der Seite (visual-audit 0). Vorschlag: Caption außerhalb des Scrollbereichs setzen, in einem Baustein-Plan (betrifft alle Tabellen).
- **Produkt-Snapshot weiterhin veraltet** („Snapshot ist aktuell“ rot); laut Auftrag nicht angefasst.

## Aus 08-11 (22.10.2026, Haupt-Arbeitsbaum, Port 3100)

- **Erledigt:** Prompt-Ziel `/vergleich/handwerkersoftware-kleine-betriebe#antwort` (Befund aus 08-09/08-10) – `seo-audit --only=prompts,antwort,faq-schema` sitewide 0 Verstöße (136 URLs).
- **Produkt-Snapshot weiterhin veraltet** („Snapshot ist aktuell“ rot); laut Auftrag nicht angefasst.
- **Hinweis Shell:** `seo-audit.mjs --paths=/…` unter Git Bash nur mit `MSYS_NO_PATHCONV=1` aufrufen; sonst wird `/vergleich` zu `C:/Program Files/Git/vergleich` umgeschrieben und still übersprungen (Ergebnis „1 von 136“ statt 2).

## Aus 08-13 (22.10.2026, Haupt-Arbeitsbaum, Port 3100)

- **Erledigt: `home-navigation.pw.cjs:501` (webkit-390-touch, /funktionen, „875 statt 0 Übergänge“).** Ursache: Die globale Reduced-Motion-Regel setzte `transition-duration: 0.01ms` auf jedes Element; mit dem Standardwert `transition-property: all` bekam damit jedes Element einen Übergang, und WebKit startete beim Laden von /funktionen 313 bzw. 696 `tab-size`-Übergänge (gemessen nach 0 s und 1 s, `startTime` null, erst nach rund 3 s beendet). Behoben in `app/globals.css` (Dauer und Verzögerung 0 s, Commit `ced8233`); danach 0 Übergänge zu jedem Messzeitpunkt. Kein Code wartet auf `transitionend`.
- **Erledigt: `function-illustrations.pw.cjs:443` (webkit-1440, „Handyansicht … bei fünf Breiten“).** Nach der Reduced-Motion-Korrektur deterministisch rot (7/7): WebKit behält nach einem Größenwechsel 1440 → 360 px die implizite `auto`-Spur der FeatureCard-Raster mit 410 px (Seitenüberlauf; vorher hat die Übergangsflut eine neue Layoutberechnung ausgelöst und den Fehler meist verdeckt – daher die früheren „kurzzeitigen Überläufe“). Behoben mit `grid-cols-1` (Commit `3dc5ecb`) und der Kartenregel „nur erste Rahmenzeile unter 362 px“ (Commit `85c293e`).
- **Offen (Inhalt außerhalb des Plans, Inhabervorgabe „nur Unterstütztes“):** `content/blog/ki-belegscan-pruefen.md` Z. 47 („kein autonomes Verbuchen … zu erwarten“) und `content/hilfe/ki-entwurf-pruefen-uebernehmen.md` Z. 44 („nicht … autonom festgeschrieben oder verbucht“) formulieren die KI-Zuständigkeit noch verneint. Vorschlag: positiv umschreiben („Sie prüfen und bestätigen jeden Schritt“) in einem Inhaltsplan; `/fakten-ueber-craftos` und `/craft-ai` sind umgestellt.
- **Offen (Überclaim-Schutz, bewusst belassen):** `/fakten-ueber-craftos` FAQ „Unterstützt CraftOS die GoBD?“ („eine behördliche Zertifizierung wird nicht behauptet“), „Zeichnet CraftOS Bewegungen … auf? – Nein“ sowie Faktenliste „Bewegungsverläufe werden nicht aufgezeichnet“/„Aktuelle Aufenthaltsorte … zeigt die Karte nicht“ sind Datenschutz- bzw. Überclaim-Aussagen, keine Listen fehlender Funktionen; wie `/gobd` „Ist CraftOS GoBD-zertifiziert? – Nein“ unverändert. Bei Bedarf Inhaberentscheidung.
- **Produkt-Snapshot weiterhin veraltet** („Snapshot ist aktuell“ rot); laut Auftrag nicht angefasst (Abgleich durch den Orchestrator vor 08-14).
