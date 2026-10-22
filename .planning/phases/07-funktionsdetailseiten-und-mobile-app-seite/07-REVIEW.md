---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
reviewed: 2026-10-21T00:00:00Z
depth: deep
files_reviewed: 34
files_reviewed_list:
  - craftos/app/funktionen/[slug]/page.tsx
  - craftos/app/app/page.tsx
  - craftos/app/funktionen/page.tsx
  - craftos/app/globals.css
  - craftos/app/sitemap.ts
  - craftos/components/funktionen/FunktionsDetail.tsx
  - craftos/components/funktionen/FunktionsKopf.tsx
  - craftos/components/funktionen/FunktionsKopf.module.css
  - craftos/components/funktionen/PlattformRollen.tsx
  - craftos/components/funktionen/PlattformRollen.module.css
  - craftos/components/feature-snippet/FeatureSnippet.tsx
  - craftos/components/feature-snippet/FeatureSnippet.module.css
  - craftos/components/layout/HeaderShell.tsx
  - craftos/components/v2/BentoGrid.tsx
  - craftos/components/v2/BentoGrid.module.css
  - craftos/components/v2/FeatureCard.module.css
  - craftos/components/v2/FeatureList.tsx
  - craftos/components/v2/Frames.module.css
  - craftos/components/v2/KeyFacts.tsx
  - craftos/components/v2/PhoneFrame.tsx
  - craftos/components/v2/SceneContent.tsx
  - craftos/components/v2/budgets.ts
  - craftos/components/v2/mini/MiniUi.tsx
  - craftos/components/v2/mini/MiniUi.module.css
  - craftos/lib/app-content.ts
  - craftos/lib/funktionen.ts
  - craftos/lib/funktionsdetails/index.ts
  - craftos/lib/funktionsdetails/types.ts
  - craftos/lib/funktionsdetails/angebot.ts
  - craftos/lib/funktionsdetails/planung.ts
  - craftos/lib/funktionsgruppen.ts
  - craftos/lib/product-register.ts
  - craftos/lib/schema.ts
  - craftos/lib/llms.ts
findings:
  critical: 0
  warning: 7
  info: 8
  total: 15
status: issues_found
---

# Phase 7: Code-Review-Bericht

**Geprüft:** 2026-10-21
**Tiefe:** deep (Querverweise gegen `product-register.ts`, `site.ts`, `keyword-map.json`, Web-Release `origin/release` und Mobile-Release `origin/release`, nur lesend)
**Dateien:** 34 Quellcode-Dateien plus Stichproben in `lib/funktionsdetails/{baustelle,buchhaltung,rechnung,team}.ts` und den Tests
**Status:** issues_found

Schwere-Zuordnung: **critical** = BLOCKER, **high/medium** = WARNING, **low** = INFO (Frontmatter `warning` = high + medium).

| Schwere | Anzahl |
|---|---|
| critical | 0 |
| high | 1 |
| medium | 6 |
| low | 8 |

## Zusammenfassung

Die Vorlage selbst ist solide: Die server-only-Grenze hält (kein `"use client"`-Modul importiert `lib/funktionsdetails`, `lib/app-content`, `lib/scenes` oder `product-register`). `generateStaticParams` deckt alle 22 Slugs ab, `generateMetadata` liefert für unbekannte Slugs `{}`, und die Seite ruft `notFound()` auf. Jede Seite hat genau eine H1, jeder Abschnitt eine H2 mit passendem `aria-labelledby`. FAQPage-JSON-LD kommt aus demselben Array wie die sichtbare FAQ, MobileApplication enthält kein `aggregateRating`, der Preis ist netto und stammt aus `tarife`. Alle Hilfe-Ziele (`/hilfe/*`) existieren, die QR-Assets sind vorhanden, und die neuen Statustöne erreichen mindestens 6,5:1 Kontrast. Der FeatureSnippet-Fix für reduzierte Bewegung ist korrekt: Bei `reduced=true` setzt die Szene `animation: none`, `finish()` oder `cancel()` trifft nur Übergänge aus der Hydration. Bei den Tests gibt es keine abgeschwächten Prüfungen; entfernte Assertions wurden durch strengere Zählungen ersetzt.

Die Befunde betreffen vor allem die **Produktwahrheit auf `/app`**: Belegscan und Kundenbearbeitung stehen dort ohne Einschränkung neben dem Preis der App-Lizenz, obwohl Register, Detailseite und Release das nicht pauschal belegen. Dazu kommen Lücken in der Builder-Validierung, doppelte Produktdaten ohne Verwendung, ein fehlender `/app`-Eintrag in `llms.txt` und Release-Tests, die auf anderen Hosts stillschweigend übersprungen werden.

## Warnings

### WR-01 (high): `/app` bewirbt den Belegscan ohne Lizenz- und Rechtehinweis, obwohl die App-Lizenz ihn nicht abdeckt

**Datei:** `craftos/lib/app-content.ts:97-100`, `craftos/lib/app-content.ts:237-244`
**Problem:** Der Abschnitt „Material, Belege und Kommunikation“ verspricht „Artikel scannen, Belege fotografieren …“, und die Kachel „Beleg scannen“ beschreibt den Ablauf vorbehaltlos. Unmittelbar daneben steht die Kennzahl „App-Lizenz pro Monat“. Das widerspricht drei eigenen Quellen der Website:
- `lib/funktionen.ts:310`: „eine App-Lizenz allein gibt keinen pauschalen Zugriff auf Belege“
- Detailseite `eingangsrechnungen`, Mobile-Panel: `lizenzen: ["voll"]`, Satz „nur mit der Finanzfreigabe Ihrer Rolle“
- `lib/site.ts` `tarife.app.highlights`: Belege fehlen, bei der Voll-Lizenz sind sie aufgeführt

Im Web-Release gilt außerdem `FEATURE_ACCESS.finanzen = { admin: true, buero: false, app: false }` (`src/types/license.ts:143`), und alle Mobil-Presets haben `finanzen_sichtbar: false`. Der Text folgt zwar dem 07-UI-SPEC (Z. 468), bleibt aber eine unbelegte Zusage gegenüber App-Lizenz-Käufern.
**Fix:**
```ts
// app-content.ts
material: {
  title: "Material, Belege und Kommunikation",
  lead: "Artikel scannen, Belege mit Finanzfreigabe fotografieren und Rückfragen im Projekt-Chat klären.",
},
…
{ size: "md", surface: "warm", title: "Beleg scannen",
  text: "Mit Finanzfreigabe Belege fotografieren, Angaben prüfen und einem Projekt zuordnen.", … }
```
Zusätzlich einen Vitest ergänzen, der `/app`-Kacheln mit `href` auf eine Detailseite gegen deren Mobile-Panel prüft: Hat die Detailseite mobil nur `["voll"]`, muss der Kacheltext eine Einschränkung nennen.

### WR-02 (medium): „Kunden in der App … bearbeiten“ ohne Rechtevorbehalt

**Datei:** `craftos/lib/app-content.ts:221-228` (gleicher Text als Zusatzkachel `kunden-app` in `lib/funktionsdetails/planung.ts:~200`)
**Problem:** Die Kachel sagt allen App-Nutzern zu, Kundendaten „nachschlagen und bearbeiten“ zu können. Im Mobile-Release ist die Kundenanlage über `useCustomerCreationAllowed()` gesperrt (`CustomersScreen.tsx:57,97,133`), und es gibt einen eigenen Nur-Lesen-Zustand („Kunden erscheinen hier, sobald sie für dich freigegeben sind“). Im Web-Release gilt `FEATURE_ACCESS.kunden.app = false`. Der Registereintrag „Kunden in der App“ belegt nur, dass die Bildschirme existieren, nicht die Rechte.
**Fix:** „Kundendaten unterwegs nachschlagen und je nach Rechten bearbeiten.“ Den Text zentral halten, damit `/app` und `projektverwaltung` nicht auseinanderlaufen.

### WR-03 (medium): Rolle „Kunde“ steht im Panel „Im Büro“ mit dem Lizenzbadge „Enthalten in Voll-Lizenz“

**Datei:** `craftos/lib/funktionsdetails/angebot.ts:268-276`, `craftos/components/funktionen/PlattformRollen.tsx:14-17,46,61-67`
**Problem:** Das Web-Panel der Kundenportal-Seite zeigt die feste Überschrift „Im Büro“, listet darunter „Kunde – eigener Zugang im Browser“ und schließt mit „Enthalten in: Voll-Lizenz“. Lesbar ist das so, als säße der Kunde im Büro und bräuchte eine Voll-Lizenz. Beides stimmt nicht: Der Kunde hat einen separaten Login ohne Lizenz (`funktionen.ts:651`). Die Überschrift wird pro Plattform hart gesetzt, und der Builder erlaubt „Kunde“ in jedem Panel.
**Fix:** Den Kunden aus dem Rollen-Array herausnehmen und als eigene Zeile oder `hinweis` ohne Lizenz rendern, zum Beispiel „Ihre Kunden: eigener Zugang im Browser, keine Lizenz nötig“. Alternativ im Builder „Kunde“ nur mit `zusatz` zulassen, der „ohne Lizenz“ enthält, und `PlattformRollen` das Lizenzbadge ausdrücklich auf Betriebsrollen beziehen lassen („Für Ihr Team enthalten in“).

### WR-04 (medium): `llms.txt` verlinkt die Mobile-App-Seite `/app` nicht

**Datei:** `craftos/lib/llms.ts:40`, `craftos/lib/llms.ts:44-70`
**Problem:** Die 22 Detailseiten kommen über `funktionen` automatisch hinein. `/app`, die neu gebaute Phase-7-Seite mit eigenem Keyword („handwerker app“), fehlt dagegen. Es gibt nur Store-URLs. In der Sitemap ist `/app` enthalten, für KI-Crawler (GEO) ist die Seite aber nicht verlinkt.
**Fix:**
```ts
"## Mobile-App",
"",
link("Handwerker-App für die Baustelle", "/app", "Zeiten, Einsätze, Fotos, Mängel und Unterschriften; offline nur teilweise nutzbar"),
"",
```
Dazu einen Test in `tests/llms.test.ts`, dass jede Seite der Sitemap außer Rechtstexten in `llms.txt` vorkommt.

### WR-05 (medium): Lücken in der Builder-Validierung (Wortregeln, Zusatz-IDs, Linkziele, Kopf-Szene)

**Datei:** `craftos/lib/funktionsdetails/index.ts:155-173`, `:231-238`, `:296-303`, `:310-313`
**Problem:** Der Builder soll laut Kopfkommentar „jeden Regelverstoß“ abfangen. Folgendes prüft er nicht:
1. `textfelder()` lässt `ziel.description`, `ziel.title`, `kopfwort` und die `benefit`-Texte der verwandten Karten aus. Für die Keyword-Map-Werte deckt `tests/keyword-map.test.ts:217-221` nur `automatisch|lückenlos` ab, aber nicht „vollständig offline“ und „Online-Banking“.
2. `tile.zusatz` wird nicht gegen `ZUSATZ_IDS` geprüft (der Typkommentar in `types.ts:74` verlangt das). Ein Tippfehler erzeugt ein falsches `data-zusatz`, und die Paritätsprüfung greift dann ins Leere.
3. `secondary.href` wird nur per Regex `^/hilfe/[a-z0-9-]+$` geprüft, nicht gegen `content/hilfe/*.md`. `tile.href` wird gar nicht geprüft. Ein umbenannter Hilfeartikel fällt erst im E2E-Lauf auf.
4. `kopf.includes(tile.visual.scene)` vergleicht Objektidentität. Eine kopierte oder abgeleitete Szene mit gleichem `screen` umgeht die Regel „nie die Kopf-Szene“.
**Fix:**
```ts
if (tile.zusatz !== undefined && !ZUSATZ_IDS.includes(tile.zusatz)) throw new Error(`… Zusatz ${tile.zusatz} unbekannt …`);
const kopfScreens = new Set(kopfSzenen(visual).map((s) => s.screen));
if (tile.visual.kind === "phone" && kopfScreens.has(tile.visual.scene.screen)) throw …;
pruefeWortregeln(slug, [...textfelder(inhalt), { text: ziel.description }, { text: ziel.title }]);
```
Die Existenzprüfung der Hilfeartikel als Vitest über alle `INHALTE` laufen lassen, weil der Builder kein `fs` nutzen soll.

### WR-06 (medium): Rund 250 Zeilen doppelte, ungenutzte Produktdaten in `lib/funktionen.ts`

**Datei:** `craftos/lib/funktionen.ts:675-925` (sechs neue `definitions`), `:927-937`
**Problem:** Für GAEB, Mahnwesen, Terminplanung, Bankabgleich, Datenübernahme und Mängelmanagement wurden `title`, `points`, `steps`, `access` und `note` vollständig neu geschrieben. Die Detailseiten rendern aber ausschließlich `lib/funktionsdetails/*`. `heroTitle`, `heroIntro` und `bullets` liest im Repo niemand mehr (grep: keine Treffer außer der Zuordnung), `steps` und `notes` nur das nicht gerenderte Register. Damit gibt es zwei Wahrheiten, die schon jetzt auseinanderlaufen: Zum Beispiel sagt `funktionen.ts:755` „Überfällige Rechnungen werden täglich … gemahnt“ ohne „auf Wunsch“, während die Detailseite die Bedingung nennt. Diese Felder unterliegen keiner Wortregel.
**Fix:** Das `Funktion`-Interface auf die tatsächlich gelesenen Felder reduzieren (`slug`, `name`, `icon`, `tier`, `kurz`, `benefit`, `platforms`, `helpSlug`, `related`, `checkedAt`, ggf. `access`). Die übrigen Texte entfernen oder per Typ aus `FunktionsdetailInhalt` ableiten. Alternativ die Wortregeln auch auf `funktionen.ts` anwenden.

### WR-07 (medium): Release-Belegtests werden auf anderen Hosts stillschweigend übersprungen

**Datei:** `craftos/tests/funktionsdetails.test.ts:1008-1013`, `craftos/tests/design-v2-components.test.ts:20-21,189`
**Problem:** Die einzigen Tests, die Rollen- und Statusangaben gegen den Release prüfen (D-02 (3), F3), hängen an festen Windows-Pfaden. `funktionsdetails.test.ts` liest `WEB_REPO` sogar ohne Umgebungsvariable. `describe.skipIf(!exists)` macht daraus auf Edgar, EdgarsPC mit anderem Layout oder im Docker-Runner ein grünes Ergebnis ohne Prüfung. Außerdem prüft `git show origin/release:` den lokal zuletzt geholten Stand; ein veralteter Fetch führt zu falschen Ergebnissen.
**Fix:** `process.env.CRAFTOS_WEB_REPO ?? …` wie in `design-v2-components.test.ts` verwenden. Bei `CI` oder `CRAFTOS_REQUIRE_RELEASE=1` hart fehlschlagen statt überspringen. Den geprüften Release-Commit (`git rev-parse origin/release`) gegen `productBasis` vergleichen, damit ein veralteter Stand auffällt.

## Info

### IN-01 (low): Globales `scrollbar-gutter` entfernt: seitlicher Sprung beim Wechsel zwischen kurzen und langen Seiten

**Datei:** `craftos/app/globals.css:65-66`, `craftos/components/layout/HeaderShell.tsx:94-98`
**Problem:** D-14 verlangte, den Gutter „nur bei sichtbarer Nebenwirkung auf Header/Menü-Bereich zu begrenzen“. Umgesetzt wurde die vollständige Entfernung. Bei klassischen Scrollleisten (Windows-Desktop) springt jetzt der ganze Inhalt um die Scrollleistenbreite, wenn per Client-Navigation zwischen einer kurzen Seite (404, bei 1920 × 1080 laut 07-08 kürzer als das Fenster) und einer langen Seite gewechselt wird oder wenn aufklappende FAQ eine Scrollleiste erzeugen. Der Scroll-Lock im Drawer ist korrekt gelöst (Gutter nur bei belegter Scrollleiste, Wiederherstellung im Cleanup).
**Fix:** Die Entscheidung bewusst dokumentieren oder `scrollbar-gutter: stable` nur ab `(min-width: 1024px) and (pointer: fine)` setzen und die 404-Seite mit `min-height: 100dvh` füllen, statt den Gutter global zu entfernen.

### IN-02 (low): B10-Mindesthöhe 450 px reicht rechnerisch nicht für die Nebeneinander-Variante

**Datei:** `craftos/components/v2/BentoGrid.module.css:192-195`, `:210-218`
**Problem:** In der Variante ab Seitenverhältnis 4:5 gilt `--phone-caption: 64px`. Das Phone hat mindestens 160 px Breite, also 160 × 410 / 194 ≈ 338 px Höhe. Mit 2 × 32 px Innenabstand ergibt sich ein Bedarf von 338 + 64 + 64 = 466 px > `min-height: 450px`. Liegen die beiden Nachbarzeilen zusammen unter 466 px, ragt das Phone wegen des `clamp`-Minimums aus dem Visual-Container (keine Überlaufprüfung in `funktionsdetails.pw.cjs`, nur Leerstreifen). Das ist nicht gemessen, sondern rechnerisch hergeleitet.
**Fix:** `min-height: 470px` setzen (oder `calc(64px + 160px * 410 / 194 + 64px)`) und im B10-Test zusätzlich `phone.bottom <= tile.bottom - padding` prüfen.

### IN-03 (low): Veraltetes `lastModified` in der Sitemap für `/app` und alle 22 Detailseiten

**Datei:** `craftos/app/sitemap.ts:15`, `craftos/lib/funktionen.ts:939`
**Problem:** `/app` und alle Detailseiten wurden am 2026-10-21 neu gebaut (Commits `a96b0de`, `c3e588a` … `f6b046c`). Die Sitemap meldet aber `2026-10-20` (`pageUpdated["/app"]`, `checkedAt` aller Funktionen). Crawler bekommen dadurch ein schwächeres Recrawl-Signal.
**Fix:** Beide Werte auf `2026-10-21` setzen. Für die Detailseiten besser ein eigenes `aktualisiert` je Inhaltsmodul statt des Prüfdatums der Funktionsliste verwenden.

### IN-04 (low): MobileApplication-Schema: `inLanguage` und Angebotsname ungenau

**Datei:** `craftos/lib/schema.ts:85-110`
**Problem:** `inLanguage: "de-DE"` beschreibt eine App mit 21 Locales (`mobileLocales`) nur als deutsch. `name: \`${app.name} (${app.produktlizenz})\`` ergibt „App-Lizenz (App)“. Das Offer verschweigt außerdem, dass mindestens eine Voll-Lizenz pro Betrieb nötig ist (sichtbar in der FAQ).
**Fix:** `inLanguage: mobileLocales` (BCP-47-Liste) oder das Feld weglassen. `name: app.name`. Zusätzlich `description: "Ergänzt die Voll-Lizenz; mindestens eine Voll-Lizenz pro Betrieb"` am Offer.

### IN-05 (low): CLS-Test mit festen Wartezeiten und nur unter reduzierter Bewegung

**Datei:** `craftos/tests/e2e/funktionsdetails.pw.cjs:175-183`
**Problem:** Das Scrollen nutzt feste Pausen von 40 ms pro Schritt und 150 ms am Ende, bevor CLS ausgelesen wird. Spätere Verschiebungen, etwa durch nachgeladene Bilder unter Last, entgehen der Messung. Gemessen wird außerdem nur mit `reducedMotion: 'reduce'`; der Normalfall mit laufendem FeatureSnippet auf acht Seiten bleibt ungeprüft.
**Fix:** Nach dem Scrollen auf `document.fonts.ready`, alle `img.complete` und zwei `requestAnimationFrame` warten statt fester Zeiten. Den CLS-Teil zusätzlich ohne `reducedMotion` auf den acht Snippet-Seiten laufen lassen.

### IN-06 (low): `INHALTE` überschreibt doppelte Slugs stillschweigend

**Datei:** `craftos/lib/funktionsdetails/index.ts:47-54`
**Problem:** Das Objekt-Spread über sechs Gruppenmodule lässt bei gleichem Schlüssel das spätere Modul gewinnen, ohne Fehler. Die Tests prüfen nur die Anzahl 22 bzw. den Slug-Abgleich und würden eine verdeckte Doppelung mit fehlendem Slug nicht immer erkennen.
**Fix:** Die Module in einer Schleife zusammenführen und bei `Object.hasOwn(ziel, slug)` werfen.

### IN-07 (low): `/app` importiert `zielwerte` aus dem Funktionsdetail-Builder

**Datei:** `craftos/app/app/page.tsx:23,34`
**Problem:** Für eine einzige Keyword-Map-Abfrage lädt `/app` alle 22 Inhaltsmodule samt Builder. Das ist eine unnötige Kopplung: Ein Builder-Fehler in einem Detailmodul bricht auch den Build von `/app`.
**Fix:** `zielwerte` nach `lib/keyword-map.ts` verschieben (oder in ein eigenes server-only-Modul) und aus beiden Stellen importieren.

### IN-08 (low): Doppelte Validierung und Hilfsfunktionen

**Datei:** `craftos/lib/funktionsdetails/index.ts:141-143` und `craftos/components/v2/FaqList.tsx:11-13`; `craftos/components/funktionen/FunktionsKopf.tsx:42-55` und `index.ts:218-238`; `PlattformRollen.tsx:25-32` und `index.ts:255-261`
**Problem:** `firstSentence` ist zweimal implementiert. H1-, Kopfwort-, Lead- und Plattformprüfungen laufen zweimal, mit identischen, von Hand gepflegten Fehlertexten. Ändert sich eine Regel, laufen die Kopien auseinander.
**Fix:** `firstSentence` aus `budgets.ts` exportieren. Die Komponenten-Prüfungen auf eine gemeinsame Funktion `assertKopf(…)` zurückführen, die Builder und Komponente aufrufen.

---

_Geprüft: 2026-10-21_
_Prüfer: Claude (gsd-code-reviewer)_
_Tiefe: deep_
