---
phase: 10-abschlussaudit
reviewed: 2026-10-23T14:35:04Z
depth: standard
range: origin/main (87b73ce)..HEAD (1a355f0)
files_reviewed: 107
files_reviewed_list:
  - craftos/app/agb/page.tsx
  - craftos/app/datenschutz/page.tsx
  - craftos/app/globals.css
  - craftos/app/impressum/page.tsx
  - craftos/app/layout.tsx
  - craftos/app/not-found.tsx
  - craftos/app/rechner/angebotskalkulation/page.tsx
  - craftos/app/rechner/page.tsx
  - craftos/app/rechner/stundensatz/page.tsx
  - craftos/app/robots.ts
  - craftos/app/sitemap.ts
  - craftos/app/support/page.tsx
  - craftos/components/CraftOSLogo.tsx
  - craftos/components/calculators/CalculatorPage.tsx
  - craftos/components/calculators/Calculators.module.css
  - craftos/components/content/ContentKopf.module.css
  - craftos/components/content/ContentKopf.tsx
  - craftos/components/feature-snippet/ConnectedScene.module.css
  - craftos/components/feature-snippet/IllustrationScene.module.css
  - craftos/components/feature-snippet/SupplementalScene.module.css
  - craftos/components/layout/MegaMenu.module.css
  - craftos/components/layout/MegaMenu.tsx
  - craftos/components/legal/Legal.module.css
  - craftos/components/legal/Legal.tsx
  - craftos/components/product-demo/PlanningBoard.module.css
  - craftos/components/product-demo/PlanningBoard.tsx
  - craftos/components/product-demo/ProductDemo.module.css
  - craftos/components/product-demo/ProductDemo.tsx
  - craftos/components/ui/PageHero.tsx
  - craftos/components/ui/TrialCta.tsx
  - craftos/components/v2/BentoGrid.module.css
  - craftos/components/v2/ComparisonTable.module.css
  - craftos/components/v2/ComparisonTable.tsx
  - craftos/components/v2/budgets.ts
  - craftos/lib/datenstandort.ts
  - craftos/lib/demo/data.ts
  - craftos/lib/demo/machine.ts
  - craftos/lib/einrichtung.ts
  - craftos/lib/funktionen.ts
  - craftos/lib/funktionsdetails/buchhaltung.ts
  - craftos/lib/funktionsdetails/index.ts
  - craftos/lib/funktionsdetails/rechnung.ts
  - craftos/lib/funktionsdetails/team.ts
  - craftos/lib/funktionsgruppen.ts
  - craftos/lib/gobd-konform.ts
  - craftos/lib/home-content.ts
  - craftos/lib/llms.ts
  - craftos/lib/nur-unterstuetzt.ts
  - craftos/lib/product-register.ts
  - craftos/lib/seiten/alternativen/index.ts
  - craftos/lib/seiten/alternativen/plancraft.ts
  - craftos/lib/seiten/craft-ai.ts
  - craftos/lib/seiten/fakten.ts
  - craftos/lib/seiten/gobd.ts
  - craftos/lib/seiten/kleine-betriebe.ts
  - craftos/lib/seiten/preise.ts
  - craftos/lib/seiten/vergleich.ts
  - craftos/lib/site.ts
  - craftos/scripts/a11y-audit.mjs
  - craftos/scripts/lib/a11y-audit-core.mjs
  - craftos/scripts/lib/lighthouse-core.mjs
  - craftos/scripts/lib/seo-report-core.mjs
  - craftos/scripts/live-check.mjs
  - craftos/scripts/performance-audit.mjs
  - craftos/scripts/seo-report.mjs
  - craftos/scripts/visual-audit.mjs
  - craftos/tests/a11y-audit-core.test.ts
  - craftos/tests/aufraeumen-d42.test.ts
  - craftos/tests/backlink-plan.test.ts
  - craftos/tests/breadcrumbs.test.ts
  - craftos/tests/content-produktwahrheit.test.ts
  - craftos/tests/contentkopf-unveraendert.test.ts
  - craftos/tests/craftos-logo.test.ts
  - craftos/tests/credit-paritaet.test.ts
  - craftos/tests/datenstandort.test.ts
  - craftos/tests/demo.test.ts
  - craftos/tests/design-v2-budgets.test.ts
  - craftos/tests/e2e/a11y.pw.cjs
  - craftos/tests/e2e/browser-product-demo.archive.cjs
  - craftos/tests/e2e/demo-planning.pw.cjs
  - craftos/tests/e2e/design-v2.pw.cjs
  - craftos/tests/e2e/function-illustrations.pw.cjs
  - craftos/tests/e2e/home-navigation.pw.cjs
  - craftos/tests/e2e/logo-schriftzug.pw.cjs
  - craftos/tests/e2e/mobile-step-flow.pw.cjs
  - craftos/tests/e2e/playwright.config.cjs
  - craftos/tests/einrichtung.test.ts
  - craftos/tests/etappen-nachweis.test.ts
  - craftos/tests/funktionen-seite.test.ts
  - craftos/tests/funktionsdetails.test.ts
  - craftos/tests/funktionsgruppen.test.ts
  - craftos/tests/gobd-aussage.test.ts
  - craftos/tests/kernseiten.test.ts
  - craftos/tests/keyword-map.test.ts
  - craftos/tests/lighthouse-core.test.ts
  - craftos/tests/navigation.test.ts
  - craftos/tests/nur-unterstuetzt.test.ts
  - craftos/tests/phase10-darstellung.test.ts
  - craftos/tests/preise-seite.test.ts
  - craftos/tests/pricing-parity.test.ts
  - craftos/tests/product-register.test.ts
  - craftos/tests/rechtstexte-wortlaut.test.ts
  - craftos/tests/robots.test.ts
  - craftos/tests/seo-meta.test.ts
  - craftos/tests/seo-report-core.test.ts
  - craftos/tests/sitemap-phase10.test.ts
  - craftos/tests/vergleich-seiten.test.ts
findings:
  critical: 0
  high: 1
  medium: 5
  low: 8
  info: 3
  total: 17
status: issues_found
---

# Phase 10: Code-Review-Bericht

**Geprüft:** 23.10.2026, 14:35 UTC
**Bereich:** `origin/main` (87b73ce) bis `HEAD` (1a355f0)
**Tiefe:** standard, mit gezielter Querprüfung (Aufrufer, Produkt-Repo `craft-connect-buddy` origin/release, Keyword-Map)
**Dateien:** 107 (davon 13 gelöscht; geprüft wurde, dass nichts mehr auf sie verweist)
**Status:** Befunde vorhanden

## Zusammenfassung

Es gibt keinen kritischen Befund. Sicherheitsrelevante Pfade sind unverändert sauber: `JsonLd` maskiert `<`, neue Texte kommen nur aus statischen Modulen, und es gibt keine neuen `dangerouslySetInnerHTML`-Stellen. Die externen Links in `/datenschutz` (`app.craftos.eu/avv`, `/datenschutz`) existieren als Routen im Release-Stand.

Die Schwerpunkte liegen bei den Prüfwerkzeugen. Am schwersten wiegt `a11y-audit --merge`: Es kann nach einem gezielten Teillauf „Gate bestanden“ melden, obwohl nur eine Seite geprüft wurde (HI-01). `performance-audit --lighthouse` prüft das Pflicht-Gate „Accessibility 100“ im Standardaufruf gar nicht und vermischt es im Exitcode mit dem nach D-44 nicht mehr blockierenden Performance-Gate (ME-01). Die Fokusbewertung zählt eine transparente Outline als sichtbaren Fokus (ME-02).

Zu den Inhaltsregeln gibt es drei Befunde:
- Die Meta-Description von `/fakten-ueber-craftos` verspricht weiter „benannte Grenzen“. Sie wurde in dieser Phase angefasst, das Wort blieb aber stehen (ME-03).
- Die überarbeitete Datenschutzerklärung verschweigt den `sessionStorage`-Eintrag der KI-Besuchserkennung (ME-04).
- `live-check.mjs` prüft weder die GoBD-Aussage (D-43) noch die Impressumsänderung (D-42), obwohl die Übergabe der Spur g genau das verlangt (ME-05).

Die Prüfungen, die ohne Befund blieben, stehen unter „Geprüft ohne Befund“ am Ende.

## Hohe Befunde

### HI-01: `a11y-audit --merge` meldet „Gate bestanden“ auch für Teil- und Altberichte

**Dateien:**
- `craftos/scripts/a11y-audit.mjs:54-82` (`zusammenfuehren`)
- `craftos/scripts/a11y-audit.mjs:425-436` (Teilbericht)
- `craftos/scripts/lib/a11y-audit-core.mjs:295-306` (`mergeReports`)

**Beschreibung:** `zusammenfuehren()` liest jede Datei `report-<k>-of-<n>.json` im Ordner. `mergeReports()` prüft dabei nur, ob die Teile 1..n lückenlos und ohne Doppel vorliegen. Nicht geprüft werden:
- der Prüfumfang (`optionen.pfade`, `breiten`, `engines`),
- der Zeitpunkt (`erstellt`),
- die Herkunft (`origin`).

Ein Lauf ohne `--shard` schreibt immer `report-1-of-1.json`, auch mit `--paths=…` oder `--widths=…`.

**Fehlerfall:**
1. Der volle Lauf findet Verstöße und schreibt `report-1-of-1.json`.
2. Zur Nachprüfung eines Fixes läuft danach `MSYS_NO_PATHCONV=1 node scripts/a11y-audit.mjs --paths=/gobd --widths=1440`. Er überschreibt dieselbe Datei.
3. `--merge` meldet „1 Seiten, 1 Aufrufe … Ergebnis: Gate bestanden“ mit Exit 0.

Im Gate-Nachweis (DESIGN-05) erscheint damit ein grünes Gesamtgate für eine einzige Seite.

Ein zweiter Weg: Teilberichte aus einem älteren Build (z. B. `report-2-of-2.json` von gestern) werden still mit neuen zusammengeführt.

**Fix:**
- Teilläufe mit ausdrücklichem `--paths`, `--widths` oder `--engines` in einen eigenen Dateinamen schreiben, z. B. `report-gezielt-<zeit>.json`, den `--merge` ignoriert. Alternativ `--merge` mit Exit 3 abbrechen, sobald ein Teil `optionen.pfade > 0` trägt oder die Teile verschiedene Optionen haben.
- In `mergeReports` gleiche `origin`, gleiche `optionen` und einen Zeitabstand unter z. B. 12 Stunden zwischen den Teilen verlangen.
- Die erwartete Aufrufzahl im Teilbericht speichern (`liste.length` vor dem Sharding) und in `--merge` mit `aufrufe` vergleichen. Bei Abweichung gilt das Gate als verletzt.

```js
// mergeReports
const optKey = (t) => JSON.stringify({ o: t.origin, b: t.optionen?.breiten, e: t.optionen?.engines, p: t.optionen?.pfade });
if (new Set(teile.map(optKey)).size > 1) throw new Error("a11y-audit: Teilberichte mit verschiedenen Optionen");
if (teile.some((t) => (t.optionen?.pfade ?? 0) > 0)) throw new Error("a11y-audit: gezielter Lauf (--paths) ist kein Gesamtgate");
```

## Mittlere Befunde

### ME-01: Lighthouse-Modus prüft Accessibility 100 standardmäßig nicht und vermischt die Gates im Exitcode

**Dateien:**
- `craftos/scripts/lib/lighthouse-core.mjs:34`, `:172-176` und `:195`
- `craftos/scripts/performance-audit.mjs:21-22` und `:156`

**Beschreibung:** Drei Lücken wirken zusammen:
1. `optionen()` setzt als Standardpfade `GATE_ROUTEN + INFO_ROUTEN`. `/impressum` gehört zu `A11Y_GATE`, steht aber nicht darin.
2. `zusammenfassung()` bewertet Accessibility nur, wenn `kategorien.accessibility !== undefined`. Das ist nur mit `--kategorien=accessibility` der Fall. Ohne den Schalter wird das Pflicht-Gate (D-44: „Accessibility 100 bleibt Pflicht“) still übersprungen, und der Lauf endet mit Exit 0.
3. Seit D-44 blockieren Score und Lab-LCP nicht mehr. Das Skript liefert für sie aber weiter Exit 1, genau wie für einen Accessibility-Verstoß.

**Fehlerfall:**
- `node scripts/performance-audit.mjs --lighthouse` mit Score 100 überall und einem Accessibility-Fehler auf `/impressum` endet mit Exit 0, weil Accessibility nicht gemessen wird.
- Mit `--kategorien=accessibility`, Score 90 (nach D-44 erlaubt) und Accessibility 96 endet der Lauf mit Exit 1. Wer gelernt hat, dass Exit 1 jetzt „nur Performance“ bedeutet, übersieht den echten Accessibility-Verstoß.

**Fix:**
- Im Lighthouse-Modus `--kategorien=accessibility` zum Standard machen und `/impressum` in die Standardpfade aufnehmen.
- `bewerte()` für Score und LCP nur noch als Warnung führen (`warnung: true`, kein `gateVerletzt`), wie in D-44 beschlossen.
- Getrennte Exitcodes verwenden, z. B. 1 für eine Accessibility-Verletzung und 0 mit Warnzeile für Performance.
- Fehlt die Accessibility-Messung auf einer `A11Y_GATE`-Seite, gilt das als Verstoß („Accessibility nicht gemessen“).

### ME-02: Die Fokusbewertung zählt eine transparente Outline als sichtbaren Fokus

**Datei:** `craftos/scripts/lib/a11y-audit-core.mjs:42` (`FOKUS_STIL`) und `:248` (`fokusSichtbar`)

**Beschreibung:** Die Signatur erfasst `outlineStyle` und `outlineWidth`, aber weder `outlineColor` noch `outlineOffset`. `fokusSichtbar` gibt `true` zurück, sobald im Fokus `outline-style ≠ none` und die Breite größer als 0 ist.

**Fehlerfall:** Ein Element mit `focus-visible:outline-hidden` (Tailwind v4: `outline: 2px solid transparent`) oder `outline: 1px solid transparent` hat im Fokus `outlineStyle: "solid"` und `outlineWidth: "2px"`. Der Tab-Durchlauf meldet „Fokus sichtbar“, obwohl nichts zu sehen ist. Das Muster steht schon im Repo (`components/feature-snippet/IllustrationScene.module.css:8`, `outline: 1px solid transparent`). Auch der umgekehrte Fall wird übersehen: Bleibt die Outline-Form gleich und ändert sich nur die Farbe von transparent auf Amber, meldet die Prüfung fälschlich „kein sichtbarer Fokus“.

**Fix:** `outlineColor` (und `outlineOffset`) in `FOKUS_STIL` aufnehmen. Eine Outline zählt nur, wenn die Farbe nicht transparent ist:

```js
const transparent = (c) => !c || c === "transparent" || /rgba?\([^)]*,\s*0\)$/.test(c);
const outline = a.outlineStyle !== "none" && breitePx(a.outlineWidth) > 0 && !transparent(a.outlineColor);
```

Für `boxShadow` gilt dasselbe: Schatten mit Alpha 0 (`rgba(0, 0, 0, 0) 0px 0px 0px 0px`, Tailwind-Ring-Standard) nicht als Indikator zählen. Dazu einen Testfall in `tests/a11y-audit-core.test.ts` ergänzen.

### ME-03: Die Meta-Description von `/fakten-ueber-craftos` verspricht „benannte Grenzen“ (Negativliste, L-1)

**Datei:** `craftos/docs/seo/keyword-map.json:330`. Sie wird über `metaFor("/fakten-ueber-craftos")` als `<meta name="description">` und `og:description` ausgeliefert.

**Beschreibung:** Die Description lautet „… Testphase, GoBD-Konformität und benannte Grenzen.“ Spur g hat in genau diesem Satz „GoBD-Unterstützung“ ersetzt (10-G-NOTIZ), „benannte Grenzen“ aber stehen lassen. Das widerspricht in drei Punkten:
- der Inhabervorgabe „nur Unterstütztes nennen, keine Negativlisten“,
- `NEGATIVSATZ` in `lib/nur-unterstuetzt.ts:38`, das „Grenzen“ ausdrücklich verbietet,
- dem Seiteninhalt selbst: Die Seite hat keinen Abschnitt „Grenzen“ mehr (`lib/seiten/fakten.ts` enthält das Wort nur im Kommentar).

Die Keyword-Map wird von `pruefeNurUnterstuetzt` nicht erfasst, deshalb fällt der Verstoß in keinem Test auf.

**Fehlerfall:** Google und KI-Antworten zeigen „… und benannte Grenzen“ als Snippet. Das ist eine Negativankündigung, die der Seiteninhalt nicht einlöst.

**Fix:** Die Description per Keyword-Map-Skript positiv fassen, z. B. „Überprüfbare Fakten über CraftOS: was die Handwerkersoftware ist, Plattformen, Lizenzen und Preise, Testphase, GoBD-Konformität und Datenstandort.“ (Länge prüfen). Außerdem `nurUnterstuetztVerstoesse` in `tests/keyword-map.test.ts` über alle `target.title/h1/description` laufen lassen.

### ME-04: Die Datenschutzerklärung nennt den `sessionStorage`-Eintrag der KI-Besuchserkennung nicht

**Dateien:**
- `craftos/app/datenschutz/page.tsx:74-100`
- `craftos/components/Analytics.tsx:21-24`

**Beschreibung:** Der neue Abschnitt „Webanalyse und Ladezeitmessung“ sagt: „Beide Dienste setzen keine Cookies.“ Das stimmt für Vercel. Die Website schreibt aber selbst bei jedem Besuch über einen KI-Dienst (Referrer oder `utm_source`) den Schlüssel `craftos_ai_visit` in den `sessionStorage` des Browsers und liest ihn wieder aus. Das ist ein Zugriff auf das Endgerät im Sinne von § 25 TDDDG. Die Erklärung erwähnt ihn nicht. Sie stützt die gesamte Zählung auf Art. 6 Abs. 1 lit. f DSGVO, ohne den Endgerätezugriff einzuordnen.

Die Erklärung wurde in dieser Phase als „korrekt beschrieben“ neu gefasst (Commit 476c1a0), und der Vorlagenhinweis wurde entfernt. Damit ist sie jetzt eine sachliche Aussage über die Verarbeitung.

**Fehlerfall:** Ein Besucher kommt über chatgpt.com. In den DevTools steht dann `sessionStorage.craftos_ai_visit = "chatgpt"`, und dieser Speicherzugriff fehlt in der Erklärung.

**Fix:** Eine von zwei Varianten. Die rechtliche Bewertung liegt beim Inhaber.
- **Variante a:** Im Code auf den Speicher verzichten und `ai_visit` je Seitenaufruf zählen. Der Codepfad ohne Speicher existiert schon im `catch`.
- **Variante b:** Einen Satz ergänzen, z. B. „Um einen Besuch über einen KI-Dienst nur einmal zu zählen, legt die Website für die Dauer der Sitzung den Eintrag ‚craftos_ai_visit' im Sitzungsspeicher Ihres Browsers ab; er enthält nur den Namen des Dienstes und wird beim Schließen des Tabs gelöscht.“ Dazu die Einordnung nach § 25 Abs. 2 TDDDG vom Inhaber prüfen lassen.

### ME-05: `live-check.mjs` prüft die GoBD-Aussage (D-43) und das Impressum (D-42) nicht

**Datei:** `craftos/scripts/live-check.mjs:687-897` (Phase-10-Block)

**Beschreibung:** Der Phase-10-Block deckt diese Punkte ab: Köpfe, 404, Zusatzfunktionen, Lagerfoto-Credits, Schriften, Analytics und D-41. Die Übergabe der Spur g (10-G-NOTIZ, „live-check nach dem Rollout“) verlangt außerdem:
- H1 und Kopf-Lead von `/gobd`,
- die Zertifizierungsantwort ohne „Nein.“,
- die FAQ „Ist CraftOS GoBD-konform?“ auf `/` und `/fakten-ueber-craftos`, im sichtbaren Text und im FAQPage-JSON-LD,
- die Zeile `- GoBD: CraftOS ist GoBD-konform: …` in `/llms.txt`.

Für D-42 fehlt eine Prüfung, dass `/impressum` keinen Verweis auf `ec.europa.eu/consumers/odr` mehr enthält. Keiner dieser Punkte wird geprüft. Der Rollout-Nachweis 10-07 („live-check grün“) würde auch mit einem veralteten Deployment ohne D-43 grün.

Die H1 von `/gobd` prüft nur der allgemeine Keyword-Map-Abgleich. Ein Rückfall auf den alten FAQ-Text oder die alte Zertifizierungsantwort bleibt unbemerkt.

**Fehlerfall:** Vercel liefert noch einen Build vor `e6c3030` aus (z. B. ein Promote-Fehler oder ein Cache). `live-check.mjs` meldet „alle Prüfungen OK“, obwohl `/gobd` weiter „Nein. CraftOS behauptet keine …“ zeigt.

**Fix:** Einen Block „GoBD-Aussage (D-43)“ ergänzen. Er liest wie `textFeld()` die Werte `kern`, `zertifizierung` und `faq.q` aus `lib/gobd-konform.ts` und prüft:
1. `/gobd` enthält `zertifizierung` und kein `>Nein.`.
2. `/` und `/fakten-ueber-craftos` haben `faq.q` im FAQPage-JSON-LD und als sichtbare Frage (`faqFragenSichtbar`).
3. `/llms.txt` enthält `- GoBD: ${kern}`.
4. `/impressum` enthält weder `consumers/odr` noch „Online-Streitbeilegung“.

## Niedrige Befunde

### LO-01: Der Median bei zwei gültigen Läufen ist für LCP und CLS das günstigere Ergebnis

**Datei:** `craftos/scripts/lib/lighthouse-core.mjs:57-61`

**Beschreibung:** `median()` nimmt bei gerader Anzahl das untere Mittel. Für den Score ist das streng, für LCP und CLS das Gegenteil: Bei zwei gültigen Läufen gilt der bessere LCP.

**Fehlerfall:** Die Läufe ergeben LCP 2.300 ms, 2.700 ms und einen ungültigen Lauf (Nachholversuche erschöpft). Der Median ist 2.300 ms, das Gate „LCP < 2.500“ ist bestanden.

**Fix:** Bei gerader Anzahl je Kennzahl den ungünstigeren Wert nehmen (für `lcp`/`fcp`/`si`/`tbt`/`cls` den oberen, für `score` den unteren) oder bei weniger als `runs` gültigen Läufen das Gate als „unvollständig“ werten.

### LO-02: `ZERTIFIKATSBEHAUPTUNG` lässt Mehrsatztexte mit Fragezeichen am Ende und die Nomen „Zertifikat“/„Testat“ durch

**Datei:** `craftos/lib/nur-unterstuetzt.ts:50-51` und `:90`

**Beschreibung:** Die Ausnahme für Fragesätze prüft nur, ob der gesamte String auf „?“ endet. Die Regex erfasst außerdem nur Partizipien und nicht die Nomen.

**Fehlerfall:**
- Der Lead „CraftOS ist GoBD-zertifiziert. Was heißt das für Sie?“ wird nicht gemeldet.
- „CraftOS hat ein GoBD-Testat“ wird nicht gemeldet.
- „mit GoBD-Zertifikat“ wird nicht gemeldet.

**Fix:** Den Text mit derselben Satztrennung wie `artikelAussagen` in Sätze teilen und die Prüfung je Aussagesatz anwenden. Die Regex um `(?<![\p{L}])(GoBD-)?(Zertifikat|Testat)(?![\p{L}])` erweitern. „Zertifizierung“ bleibt als Nomen der Frage erlaubt.

### LO-03: Die Textprüfungen in `live-check.mjs` werten auch JSON-LD und den RSC-Payload als „sichtbar“

**Datei:** `craftos/scripts/live-check.mjs:695`, `:745-747`, `:771` und `:883`. Dazu `plain()` in `scripts/lib/seo-audit-core.mjs:39`.

**Beschreibung:** `textVon(html)` entfernt nur Tags. Die Inhalte von `<script type="application/ld+json">` und `self.__next_f.push(...)` bleiben stehen.

**Fehlerfall:** Kürzt die FAQ-Liste auf `/funktionen/datenuebernahme` die Antwort sichtbar oder blendet sie aus, während das FAQPage-JSON-LD den vollen Text trägt, besteht die Prüfung auf `importSatz` trotzdem. Dasselbe gilt für die Lagerfoto-Stufen auf `/craft-ai`, deren FAQ-Antwort im JSON-LD steht.

**Fix:** Vor `plain()` alle `<script …>…</script>`- und `<template>`-Blöcke entfernen:

```js
const textVon = (html) => plain(html.replace(/<(script|template)\b[\s\S]*?<\/\1>/gi, " ")).replace(/\s+/g, " ");
```

### LO-04: Der Netzfall der Logo-Spec verschluckt Lesefehler und prüft nicht, dass die erlaubten Schnitte geladen werden

**Datei:** `craftos/tests/e2e/logo-schriftzug.pw.cjs:68-80`

**Beschreibung:** `antwort.body().then(…).catch(() => {})` zählt eine Schriftantwort, deren Body nicht lesbar ist, weder als erlaubt noch als fremd. Lädt die Seite gar keine Schrift (z. B. weil `next/font` die Preloads verloren hat und die Fonts erst bei Bedarf laden), ist `geladen` leer und der Fall grün.

**Fehlerfall:** Ein fremder Schnitt kommt über eine Weiterleitung oder als 304 ohne Body. `body()` wirft, die Antwort wird ignoriert, und der Fall ist grün.

**Fix:**
- Im `catch` die URL als „nicht prüfbar“ in `geladen` aufnehmen.
- Zusätzlich verlangen, dass je Route mindestens ein erlaubter Hash beobachtet wurde. Die drei Preloads allein belegen nicht, welche Datei kam.

### LO-05: Die Unterzeile des Logos wird in Browsern ohne `lab()` unsichtbar

**Datei:** `craftos/components/CraftOSLogo.tsx:24` und `:85-94`

**Beschreibung:** Das Schriftzug-SVG setzt `fill="none"` am Wurzelelement und an der Unterzeile `fill="lab(65.6464 1.53494 -5.42429)"`. Ein Browser ohne `lab()`-Unterstützung (Safari < 15, Chrome < 111, Firefox < 113) verwirft das Präsentationsattribut, und der Pfad erbt `fill="none"`.

**Fehlerfall:** „Handwerkersoftware“ fehlt im Logo in Header und Fußleiste. Früher fiel der HTML-Text zumindest auf eine Standardfarbe zurück.

**Fix:** Einen sRGB-Wert verwenden (`#a1a1aa`, berechnetes Äquivalent von zinc-400) oder `fill="currentColor"` mit einer `color`-Angabe samt Fallback setzen.

### LO-06: Die AGB zeigen live weiter „Vorlage … sollten vor Veröffentlichung rechtlich geprüft werden“

**Datei:** `craftos/app/agb/page.tsx:90-94`

**Beschreibung:** Die Phase hat den Hinweis nur neu gestaltet (`LegalHinweis`). In `/datenschutz` wurde der entsprechende Vorlagenhinweis auf Inhaberanweisung entfernt, in den AGB steht er weiter sichtbar. Damit erklärt die Seite ihre eigenen Vertragsbedingungen öffentlich für ungeprüft.

**Fehlerfall:** Ein Kunde liest unter den AGB, dass sie nur eine ungeprüfte Vorlage sind. Das schwächt die Einbeziehung und das Vertrauen.

**Fix:** Inhaberentscheidung einholen: die AGB prüfen lassen und den Hinweis entfernen, oder den Stand wie in `/datenschutz` mit Datum angeben. Den Wortlaut-Schutztest bewusst nachziehen.

### LO-07: Der Bericht ohne Leaderboard meldet „keine Rohdatei vorhanden“, obwohl eine existiert

**Datei:**
- `craftos/scripts/lib/seo-report-core.mjs:92-94` und `:130-133`
- `craftos/scripts/seo-report.mjs:127-128`

**Beschreibung:** `leaderboardStand()` liefert `null`, wenn die Hauptdomain in der jüngsten Rohdatei fehlt (Rang außerhalb der Liste). `berichtszeileOhneLeaderboard(null)` schreibt dann „letzter Wert: keine Rohdatei vorhanden“. In der Überblickstabelle steht „letzter Wert –“.

**Fehlerfall:** CraftOS taucht in der Leaderboard-Antwort vom 23.10. nicht auf. Der Messbericht behauptet, es gebe keine Rohdatei, und verschweigt Datum und Quelle der letzten Messung.

**Fix:** Für diesen Fall `{ datum, datei, rang: null, anzahl: lb.length, … }` liefern. Den Text „nicht unter N Einträgen“ gibt es dafür schon in `berichtszeileOhneLeaderboard`.

### LO-08: Der D-42-Schutztest findet Altklassen nur in Klassen-Literalen

**Datei:** `craftos/tests/aufraeumen-d42.test.ts:54-66`

**Beschreibung:** Gesucht wird nur in `className="…"` und `` className={`…`} ``. Nicht erkannt werden `className={cn("eyebrow", …)}`, `clsx(…)`, Bedingungen (`cond ? "btn-cta" : ""`) und HTML in `content/**/*.md`.

**Fehlerfall:** `className={cn("section-space", x)}` rendert eine Klasse, für die es kein CSS mehr gibt. Abstände fehlen sichtbar, und der Test bleibt grün.

**Fix:** In `app`, `components`, `lib` und `content` nach den Klassennamen als String-Token suchen (`/["'\`\s]section-space["'\`\s]/`), oder den gebauten HTML-Ausgang (`.next/server/app/**/*.html`) auf `class="…"` prüfen.

## Info

### IN-01: Veraltete Kommentare nach D-42

**Dateien:**
- `craftos/app/layout.tsx:13`: „Die Dateien bleiben in public/fonts (D-04)“. Sie sind seit `0033220` entfernt.
- `craftos/app/support/page.tsx:14`: „(die Datei bleibt, D-04)“. `components/ui/PageHero.tsx` ist gelöscht.
- `craftos/app/impressum/page.tsx:7`: „der Rechtstext bleibt unverändert“. Der Satz zur OS-Plattform wurde entfernt.

**Fix:** Die Kommentare auf den Stand nach D-42 bringen.

### IN-02: Die Zusatzlinks im Mega-Menü führen auf den Seitenanfang der Detailseite

**Datei:** `craftos/components/layout/MegaMenu.tsx:52-71` mit `lib/funktionsgruppen.ts` (`ZUSATZ[*].target.href`)

**Beschreibung:** „Kassenbuch“ zeigt auf `/funktionen/buchhaltung` und „Rechnung nach § 13b“ auf `/funktionen/rechnungen`. Das sind dieselben Ziele wie die Detaillinks direkt darüber. Die Kachel mit `data-zusatz` liegt weiter unten auf der Seite.

**Fix (optional):** Der Kachel eine `id` geben und auf `#kassenbuch` bzw. `#rechnung-13b` verlinken. `live-check.mjs:748` müsste dann das Fragment akzeptieren.

### IN-03: Der Zeitlimit-Ausgleich für dynamische Importe verdeckt die Ursache

**Dateien:**
- `craftos/tests/content-produktwahrheit.test.ts:213-221` (60 s)
- weitere `60_000`-Fälle in den Testdiffs (u. a. `tests/kernseiten.test.ts`, `tests/funktionsdetails.test.ts`)

**Beschreibung:** Das Limit wurde angehoben, weil der erste Import von `@/lib/gewerke` unter Volllast länger als 5 s braucht. Das ist kein verdeckter Fachfehler. Es zeigt aber, dass die Modulprüfungen beim Laden (`pruefeNurUnterstuetzt`, Budgets) teuer sind und mit jedem neuen Inhalt weiter wachsen.

**Fix (optional):** Die Importe in `beforeAll` vorwärmen oder die Ladeprüfungen messen. So bleibt das Testlimit aussagekräftig.

## Geprüft ohne Befund

- **XSS und Skripte:** `JsonLd` maskiert `<`. Die neuen Inhalte aus `lib/einrichtung.ts`, `lib/datenstandort.ts` und `lib/gobd-konform.ts` sind statisch. Es gibt keine neuen `dangerouslySetInnerHTML`-Stellen und keine externen Skripte.
- **Links und Routen:**
  - `app.craftos.eu/avv` und `/datenschutz` sind im Release-Stand von `craft-connect-buddy` als Routen vorhanden.
  - Alle `ZUSATZ`-Einträge haben ein `target`, deshalb ist keine Liste „Weitere Funktionen“ leer.
  - Die Sitemap führt die Phase-10-Seiten mit Datum.
- **D-42 Aufräumen:**
  - PageHero, TrialCta, ProductDemo, `lib/demo`, die Altklassen und die drei Schriftschnitte werden von keiner Datei unter `app`, `components` oder `lib` mehr referenziert. Der einzige Importeur von PageHero ist `_seo-referenz/app-blog/page.tsx`, das nicht gebaut wird.
  - Die Bestandssätze der Rechner- und Supportseiten (FAQ, Formeln, Beispiele, Notiz) stehen weiter im Quelltext. Sichtbarer Inhalt ist nicht verloren gegangen.
- **Logo:**
  - Header und Fußleiste tragen am Link `aria-label="CraftOS Startseite"`. Die Wortmarke ist `aria-hidden`/`focusable="false"`, das Zeichen `role="img"` mit Namen.
  - Die Farbe von „CraftOS“ folgt `currentColor`.
- **Inhaltsregeln:**
  - Im gerenderten Inhalt steht kein „Server in Deutschland“, kein „ausschließlich in …“ und keine kostenpflichtige Einrichtung.
  - „zertifiziert“ kommt nur in der Zertifizierungsfrage vor, sonst nur in `/datenschutz` für Vercel/DPF.
  - Die Einrichtung heißt überall „kostenlos“.
- **Datenschutz:** Die Anschrift von Vercel, die DPF-Grundlage, die Erfassung ohne Suchparameter (`stripQuery` in `beforeSend` für Analytics, Speed Insights und die Warteschlange) und die Angabe „keine Cookies“ für die Vercel-Dienste stimmen mit dem Code überein. Die Ausnahme ist ME-04.

---

_Geprüft: 23.10.2026_
_Prüfer: Claude (gsd-code-reviewer)_
_Tiefe: standard_
