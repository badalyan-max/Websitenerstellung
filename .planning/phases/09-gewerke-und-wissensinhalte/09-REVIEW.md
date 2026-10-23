---
phase: 09-gewerke-und-wissensinhalte
reviewed: 2026-10-23T05:51:00Z
depth: deep
base: origin/main (d778c31)
head: d9bdd6c
files_reviewed: 56
files_reviewed_list:
  - craftos/app/app/page.tsx
  - craftos/app/gewerke/[slug]/page.tsx
  - craftos/app/gewerke/page.tsx
  - craftos/app/globals.css
  - craftos/app/sitemap.ts
  - craftos/components/content/ArticlePage.tsx
  - craftos/components/content/ContentIndex.tsx
  - craftos/components/content/ContentKopf.module.css
  - craftos/components/content/ContentKopf.tsx
  - craftos/components/content/ContentSearch.tsx
  - craftos/components/v2/FeatureCard.module.css
  - craftos/components/v2/LinkKarten.module.css
  - craftos/components/v2/LinkKarten.tsx
  - craftos/components/v2/budgets.ts
  - craftos/lib/app-content.ts
  - craftos/lib/content-types.ts
  - craftos/lib/content.ts
  - craftos/lib/funktionen.ts
  - craftos/lib/funktionsdetails/angebot.ts
  - craftos/lib/funktionsdetails/baustelle.ts
  - craftos/lib/funktionsdetails/buchhaltung.ts
  - craftos/lib/funktionsdetails/planung.ts
  - craftos/lib/funktionsdetails/rechnung.ts
  - craftos/lib/funktionsdetails/team.ts
  - craftos/lib/gewerke.ts
  - craftos/lib/leitlinie-l1.json
  - craftos/lib/leitlinie.ts
  - craftos/lib/llms.ts
  - craftos/lib/product-register.ts
  - craftos/lib/scenes.ts
  - craftos/scripts/content-pruefen.mjs
  - craftos/scripts/lib/seo-audit-core.mjs
  - craftos/scripts/lib/ts-literale.mjs
  - craftos/tests/ai-prompts.test.ts
  - craftos/tests/app-seite.test.ts
  - craftos/tests/content-produktwahrheit.test.ts
  - craftos/tests/content-pruefung.test.ts
  - craftos/tests/content-vorlage.test.ts
  - craftos/tests/content.test.ts
  - craftos/tests/design-v2-budgets.test.ts
  - craftos/tests/design-v2-components.test.ts
  - craftos/tests/e2e/design-v2.pw.cjs
  - craftos/tests/funktionsdetails.test.ts
  - craftos/tests/gewerke.test.ts
  - craftos/tests/keyword-map.test.ts
  - craftos/tests/llms.test.ts
  - craftos/tests/media-ki-label.test.ts
  - craftos/tests/seo-audit-core.test.ts
  - craftos/content/hilfe/kassenbuch-fuehren.md
  - craftos/content/hilfe/schlussrechnung-erstellen.md
  - craftos/content/hilfe/zeiteintrag-erfassen-korrigieren.md
  - craftos/content/hilfe/kundenportal-kunden-einladen.md
  - craftos/content/hilfe/craft-ai-betriebsdaten-fragen.md
  - craftos/content/blog/reverse-charge-bauleistungen.md
  - craftos/content/blog/offline-baustellen-app.md
  - craftos/content/blog/handwerkersoftware-wechseln.md
findings:
  critical: 0
  high: 1
  medium: 4
  low: 10
  info: 9
  total: 24
status: issues_found
---

# Phase 9: Code-Review-Bericht

**Geprüft:** 23.10.2026, 05:51 UTC
**Tiefe:** deep (dateiübergreifend: Aufrufketten Artikelvorlage → `lib/content.ts` → `scenes`/`funktionsgruppen`, Prüfskripte ↔ Tests, Inhalte ↔ Release)
**Umfang:** Code-Diff `origin/main..HEAD` ohne `content`, `docs`, `public` und E2E-Berichte (48 Dateien) sowie eine Stichprobe von 8 Artikeln
**Release-Abgleich (nur lesend):** Web `origin/release` = `c5b5135` (23.10.2026), Mobile `origin/release` = `837aab4f` (22.10.2026)
**Status:** issues_found

## Zusammenfassung

Die Vorlagen sind solide gebaut. Artikel, Übersichten und Gewerke rendern als Server Components. `ContentSearch` bleibt die einzige Client-Insel. Die Prosa kommt aus `rehype-sanitize`, und der Artikel-Schritt (`role="list"`, Tabellen-Scrollbereich) läuft erst danach, sodass Markdown keine Attribute einschleusen kann. FAQPage entsteht auf Artikeln und Gewerken aus demselben Array wie die sichtbare FAQ. Es gibt genau eine BreadcrumbList (über `Breadcrumbs` im Kopf). `JsonLd` maskiert `<`. In der Stichprobe sind die zitierten Bedienbegriffe fast ausnahmslos wörtlich im Release belegt (über 60 Begriffe einzeln geprüft), und nichts davon hängt hinter `isDeveloper`. Rechtsangaben (§ 13b, § 14, § 14a UStG, § 650g BGB) und die Beispielrechnung (23.800 € − 14.280 € = 9.520 €) stimmen.

Die Schwachstellen liegen an drei Stellen:

1. **Prüfwerkzeug:** `content-pruefen.mjs --zitate` kann falsches Grün liefern. Es weist nur nach, dass ein Text irgendwo im Quellbaum steht, auch in Kommentaren oder Mocks. Ob der Kunde die Stelle erreichen kann, prüft es nicht.
2. **Produktwahrheit:** Zwei Aussagen gehen über das hinaus, was Kunden tatsächlich erreichen: Offline-Lesen „dauerhaft“ und „Kundenportal für Bauherren“.
3. **Barrierefreiheit:** Das sticky Inhaltsverzeichnis wird auf Laptop-Höhen abgeschnitten.

Kritische Befunde gibt es keine. Keine Secrets im Diff. Externe Links öffnen im selben Tab, daher besteht kein Tabnabbing-Risiko.

---

## Critical

Keine.

---

## High

### HI-01: `content-pruefen --zitate` belegt Existenz statt Erreichbarkeit – falsches Grün möglich

**Datei:** `craftos/scripts/content-pruefen.mjs:38`, `:123-127`, `:134-156`, `:178-186`

**Fehlerszenario:**
- **Pfadfilter zu grob:** Die Suche läuft per `git grep -F` über ganz `src` (Web zusätzlich `supabase/functions`). Ausgeschlossen sind nur `*.test.*`, `*.spec.*` und `__tests__`. Ein Begriff gilt damit auch dann als „belegt“, wenn er nur in einem Code-Kommentar, einem Mock (`__mocks__`, `fixtures`, `*.stories.*`) oder einer Typdefinition steht.
  - Konkretes Beispiel am Mobile-Release: „Zeiteintrag speichern“ steht in `src/shared/i18n/locales/de/time.json` (echt), aber auch im JSDoc von `src/shared/components/SheetActions.tsx:7`. Würde der Text in der Sprachdatei umbenannt, bliebe die Prüfung grün.
- **Erreichbarkeit ungeprüft:** Ein Text hinter `isDeveloper`, einem Feature-Flag oder einer Rollen-Sperre gilt als belegt. Am Web-Release steht z. B. „KI-Agent“ in `src/components/layout/MobileHeader.tsx:71-72` nur für Entwickler, ein Zitat davon käme trotzdem grün durch. Die Inhaberregel („nur nennen, was Kunden erreichen können“) deckt das Skript damit nicht ab, obwohl D-11 es als Belegnachweis verwendet.
- **Menüpfade zerlegt:** `zitateAus` teilt jedes Zitat an „→“ und prüft die Teile einzeln. Bei „Bank → Kasse“ (Kassenbuch) werden nur „Bank“ und „Kasse“ gesucht, beide trivial vorhanden. Ein falsch geschriebenes Label mit Pfeil fällt also nie auf. Dass ein Menüpfad in dieser Reihenfolge existiert, prüft das Skript ebenfalls nicht.

**Korrektur:**
```js
// 1) Nur sichtbare Texte: Sprachdateien + String-Literale (ts-literale) statt Rohtext
//    und zusätzliche Ausschlüsse:
const OHNE_TESTS = [":(exclude,glob)**/*.test.*", ":(exclude,glob)**/*.spec.*", ":(exclude,glob)**/__tests__/**",
  ":(exclude,glob)**/__mocks__/**", ":(exclude,glob)**/fixtures/**", ":(exclude,glob)**/*.stories.*"];
// 2) Treffer erst gelten lassen, wenn die Fundstelle ein String-Literal/JSX-Text ist
//    (Datei per git show laden, stringLiterale() bzw. JSX-Text extrahieren).
// 3) Zitate mit „→“ zusätzlich als Ganzes prüfen, wenn das Ganze selbst ein Label ist
//    (z. B. „Bank → Kasse“), und nur reine Menüpfade zerlegen.
// 4) Ausgabe „belegt, aber gated“ als Befund: Fundstellen in Dateien, die isDeveloper/
//    usePlatformDeveloper/Feature-Flags lesen, mit --belege ausweisen und manuell bestätigen lassen.
```
Zusätzlich im Kopf des Skripts festhalten, dass grün nur „Text existiert“ bedeutet. Die Erreichbarkeit bleibt Teil der manuellen Prüfdatei (`docs/content-pruefung/09-*.md`).

---

## Medium

### ME-01: Sticky-Inhaltsverzeichnis ohne Höhenbegrenzung – untere Einträge auf Laptops nicht erreichbar

**Datei:** `craftos/app/globals.css:663-670` (`.artikel-toc` mit `position: sticky; top: 100px`), `:593-597` (Links `min-height: 44px`)

**Fehlerszenario:** Jeder TOC-Eintrag ist mindestens 44 px hoch. `hilfe/zeiteintrag-erfassen-korrigieren` hat 15 Einträge, sechs weitere Artikel haben 12. Das ergibt ≥ 660 px plus Label und Zeilenumbrüche in der 280-px-Spalte. Ein 1366 × 768-Laptop hat rund 620 px Fensterhöhe, abzüglich `top: 100px` bleiben etwa 520 px. Ein sticky Element, das höher ist als der Viewport, bleibt oben kleben. Die unteren Einträge („Häufige Probleme“ und die H3-Fragen darunter) erscheinen erst am Artikelende und lassen sich vorher weder mit der Maus noch per Scrollen erreichen. Die E2E-Prüfung misst bei 900 px Höhe und mit Artikeln, die nur wenige Einträge haben, und erkennt das deshalb nicht (`tests/e2e/design-v2.pw.cjs`, `PHASE9_ROUTES`).

**Korrektur:**
```css
@media (min-width: 1024px) {
  .artikel-toc {
    max-height: calc(100vh - 116px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
}
```
Den E2E-Fall um `/hilfe/zeiteintrag-erfassen-korrigieren` bei 1280 × 640 ergänzen: Der letzte TOC-Link muss sichtbar oder per Scrollen im TOC erreichbar sein.

### ME-02: Offline-Ratgeber verspricht dauerhaftes Offline-Lesen – der Release verwirft den Cache nach 24 Stunden

**Datei:** `craftos/content/blog/offline-baustellen-app.md:18` („Jede einmal geöffnete Ansicht steht danach auch offline zur Verfügung.“), ebenso `answer` in Z. 9

**Fehlerszenario:** Am Mobile-Release `837aab4f` verwirft `src/AppRoot.tsx:209-212` den gespeicherten Abfrage-Cache nach 24 Stunden (`maxAge: 1000 * 60 * 60 * 24`, „Persistierten Cache nach 24h verwerfen“). Ein Monteur öffnet das Projekt am Montag mit Netz und steht am Mittwoch im Keller ohne Netz. Er sieht dann „Offline, noch nicht geladen“, obwohl der Ratgeber ihm das Gegenteil zugesagt hat. Das widerspricht der Inhaberregel, nur Erreichbares zu nennen.

**Korrektur:** Die Aussage positiv und mit Frist formulieren, z. B.:
> „Öffnen Sie die Projekte und Ansichten, die Sie brauchen, am Tag des Einsatzes einmal mit Verbindung; die App hält den geladenen Stand bis zu 24 Stunden für die Arbeit ohne Netz bereit.“

Dieselbe Frist in `hilfe/mobile-offline-synchronisierung.md:22` und `blog/web-app-baustellen-app.md:62` nachziehen und in `docs/content-pruefung/09-c.md` mit Belegpfad `app:src/AppRoot.tsx` vermerken.

### ME-03: „Kundenportal für Bauherren“ als Leistung, obwohl Kunden im Portal nichts erreichen

**Datei:** `craftos/lib/gewerke.ts:475` (Antwort Bauunternehmen), `:497-499` (FAQ „Im Kundenportal meldet er sich mit eigenem Zugang an.“), `:487` (`kundenportal` unter `funktionen`); `craftos/content/hilfe/kundenportal-kunden-einladen.md:63` („Wie bezahlen Kunden Rechnungen aus dem Portal?“)

**Fehlerszenario:** Am Web-Release zeigt `src/pages/portal/CustomerPortalHome.tsx` nach der Anmeldung nur „Ihre Unterlagen“ und den Satz „Ihre Unterlagen öffnen Sie über den Link in der E-Mail Ihres Handwerksbetriebs.“ Es gibt keine Liste und keinen Link. Laut eigener Recherche (Kommentar `lib/scenes.ts:275-278`, `lib/funktionsdetails` 09-09) verlinkt keine Mail die Portal-Belegseiten `/portal/invoices/:id` und `/portal/quotes/:id`. Die Angebotsmail führt auf die öffentliche Unterschriftsseite. Der Bauherr eines Bauunternehmens meldet sich also an und findet nichts.

Trotzdem gilt Folgendes:
- Die Gewerke-Antwort (`#antwort`, Prompt-nahes Ziel) nennt „das Kundenportal für Bauherren“ als Bestandteil.
- Der Hilfeartikel stellt eine FAQ zu „Rechnungen aus dem Portal“, die es für Kunden nicht gibt.

Die Funktionsdetailseite wurde dagegen schon korrekt umgestellt („Rechnungen begleicht der Kunde per Überweisung …“).

**Korrektur:**
- `gewerke.ts:475`: „… Abschlags- und Schlussrechnungen und die Online-Unterschrift von Angeboten für Bauherren.“
- FAQ Z. 497–499: Den letzten Satz streichen oder ersetzen durch „Für den eigenen Portal-Zugang laden Sie ihn über die Karte „Kundenportal“ ein.“
- `kundenportal-kunden-einladen.md:63`: Die Frage zu „Wie bezahlen Kunden Ihre Rechnungen?“ umbenennen, wie auf der Funktionsdetailseite.
- Prüfen, ob `kundenportal` als Funktionskarte für Bauunternehmen gebraucht wird oder ob `angebote` (Online-Unterschrift) passender ist.

### ME-04: L-1-Prüfung hat Lücken – Inhalte nur gegen die enge Wortliste, Listenwort-Literale werden übersprungen

**Datei:** `craftos/tests/content-produktwahrheit.test.ts:59-60`, `:63-70`; `craftos/scripts/content-pruefen.mjs:259-265`; `craftos/lib/nur-unterstuetzt.ts` (`NEGATIVSATZ`)

**Fehlerszenario:**
1. **Wortgleiche Literale fallen durch:** Ein String-Literal, das *genau* einem Leitlinienwort entspricht, gilt als „Prüf-Wortliste“ und wird übersprungen (`istListeneintrag`, Skript Z. 265). Die Begründung (Wortliste in `lib/gewerke.ts` bis 09-11) gibt es nicht mehr. Ein sichtbarer UI-Text wie `label: "Onlinezahlung"` in `lib/funktionsdetails/*.ts` würde trotzdem grün durchgehen.
2. **Satzprüfung nur in TS-Modulen:** Die breitere Satzprüfung `NEGATIVSATZ` (z. B. „nicht verfügbar“, „nicht möglich“, „CraftOS kann nicht“, FAQ-Antworten mit „Nein“ am Anfang) läuft nur für TS-Module (`pruefeNurUnterstuetzt`, u. a. `gewerke.ts`), nicht für die 84 Markdown-Artikel. Eine Artikel-FAQ „Kann CraftOS X? – Nein. …“ bliebe grün. In der Stichprobe gibt es dafür keine echten Treffer, die Lücke ist aber strukturell.

**Korrektur:**
- Die Listenwort-Ausnahme entfernen (die eigene Wortliste ist zentral in `leitlinie-l1.json`) oder auf ausdrücklich benannte Dateien beschränken.
- `nurUnterstuetztVerstoesse` zusätzlich auf Frontmatter (`answer`, `faq[].a`) und Prosa-Absätze der Artikel anwenden, mit denselben drei Ausnahmen aus `leitlinie-l1.json`:
```ts
for (const a of alleArtikel) {
  expect(nurUnterstuetztVerstoesse({ answer: a.answer, faq: a.faq }), a.slug).toEqual([]);
}
```

---

## Low

### LO-01: Reservierte ids unvollständig – Prosa-Überschrift kann Seiten-ids doppeln

**Datei:** `craftos/lib/content.ts:256`

**Fehlerszenario:** `RESERVIERTE_IDS` deckt nur `antwort`, `faq`, `quellen`, `funktionen` und `weiterlesen` ab. Ein Artikel mit der Überschrift „Inhalt“ erzeugt per `rehype-slug` die id `inhalt`. Die gibt es schon als Ziel des Skip-Links (`app/layout.tsx:131`, `<main id="inhalt">`). Ebenso können `artikel-titel` (das `aria-labelledby` von `<article>`) und `hauptnavigation` doppelt entstehen. Folge: doppelte ids, und Sprungmarke bzw. Landmark-Name werden unzuverlässig.

**Korrektur:** `["antwort", "faq", "quellen", "funktionen", "weiterlesen", "inhalt", "artikel-titel", "seiten-titel", "hauptnavigation"]` verwenden, besser noch die Liste aus einer gemeinsamen Konstante der Layout-ids ableiten.

### LO-02: TOC-Titel dekodiert nur drei Entities

**Datei:** `craftos/lib/content.ts:241-251`

**Fehlerszenario:** `hast-util-to-html` kodiert `<` im Text als `&#x3C;`. Die Regex-Extraktion ersetzt nur `&amp;`, `&#x26;` und `&quot;`. Eine Überschrift wie „Gilt die Grenze < 250 €?“ erscheint im Inhaltsverzeichnis als „Gilt die Grenze &#x3C; 250 €?“, weil React den Text maskiert. Heute enthält keine Überschrift `<`, der Fehler ist also latent.

**Korrektur:** Den TOC aus dem hast-Baum erzeugen statt aus dem HTML-String. Die Überschriften im `rehypeArtikel`-Schritt einsammeln (`textOf(kind)` für `h2`/`h3` mit `properties.id`) und über `file.data` zurückgeben. Damit entfällt auch die Abhängigkeit von „`<h2 id>` ohne weitere Attribute“.

### LO-03: Inhaltsverzeichnis – Listensemantik, flache Hierarchie, doppelte Linktexte, Fokusreihenfolge

**Datei:** `craftos/components/content/ArticlePage.tsx:65-75`, `:145-150`; `craftos/app/globals.css:588-592`, `:653-670`

**Fehlerszenario:**
- **Listensemantik:** `.artikel-toc-liste` ist ein `<ol>` mit `list-style: none`, aber ohne `role="list"`. Genau das wird bei der Schrittliste mit dem WebKit-Hinweis begründet und ergänzt, hier fehlt es. VoiceOver verliert die Liste.
- **Hierarchie:** H3-Einträge stehen flach neben den H2-Einträgen, nur eingerückt. In `zeiteintrag-erfassen-korrigieren` hören Screenreader-Nutzer zweimal „Eine Zeit nachtragen“ (Z. 26/52) und zweimal „Einen Eintrag korrigieren“ (Z. 37/63), ohne Bezug zu Web oder Mobile (WCAG 2.4.4).
- **Fokusreihenfolge:** Ab 1024 px steht das `nav` im DOM vor dem Inhalt, wird aber rechts angezeigt. Die Tab-Reihenfolge springt zuerst in die rechte Spalte.

**Korrektur:** `role="list"` an beide TOC-Listen setzen. H3-Einträge als verschachteltes `<ol>` unter dem zugehörigen H2-Eintrag rendern. Das `nav` im DOM hinter `.artikel-haupt` setzen (die Grid-Platzierung bleibt per `grid-column: 2`) oder bewusst als „Sprung zum Inhalt“ dokumentieren.

### LO-04: `LinkKarten` begrenzt auf 60 Einträge – `/hilfe` bricht nach 6 weiteren Anleitungen im Build

**Datei:** `craftos/components/v2/budgets.ts:62`; `craftos/components/content/ContentSearch.tsx:128-138`

**Fehlerszenario:** `/hilfe` übergibt bei leerer Suche alle 54 Anleitungen an `LinkKarten`, und `assertCount` wirft ab 61. Ein Folgepaket mit 7 neuen Hilfeartikeln lässt den Build von `/hilfe` scheitern. Der Fehler sieht dann nach einem Budget-Problem aus, nicht nach Wachstum.

**Korrektur:** Für die Suchergebnisse das Maximum aufheben (`LinkKarten` mit Option `ohneMaximum` bzw. eigenes Budget `count.suchErgebnisse`) oder das Maximum aus der Artikelzahl ableiten. Dazu einen Test, der den aktuellen Abstand zum Maximum nennt.

### LO-05: `content-pruefen --antwort` meldet fehlende Antwort nur als Hinweis (Exitcode 0)

**Datei:** `craftos/scripts/content-pruefen.mjs:341-344`, `:324-328`

**Fehlerszenario:** Seit 09-09 ist `answer` Pflicht (`lib/content.ts:35-45`). Das Skript meldet eine fehlende Antwort trotzdem nur als „Hinweis“ und endet mit 0. Die Satzanzahl (1–2) prüft es gar nicht. Steht unter einer Frage-Überschrift zuerst eine Liste und danach ein Absatz, misst `ersterAbsatz` den späteren Absatz. Das Build-Audit (`antwortDanach`) zählt das anders. Ein Paket kann also mit dem Skript grün sein und erst im Build bzw. im Audit rot werden.

**Korrektur:** Eine fehlende Antwort als `befund` melden und `sentenceCount` aus `components/v2/budgets` nachbilden. Für „erste Antwort nach der Frage“ dieselbe Logik wie `seo-audit-core.mjs` verwenden: Eine Liste direkt unter einer Frage-Überschrift zählt als „keine Antwort direkt darunter“.

### LO-06: `relatedArticles` – unbekannte Ziele verschwinden still

**Datei:** `craftos/components/content/ArticlePage.tsx:104-107`; `craftos/tests/content.test.ts:65-68`

**Fehlerszenario:** Die Artikelvorlage filtert nicht auflösbare Ziele mit `.filter((x) => x !== undefined)` weg. Der Test prüft nur Ziele mit dem Präfix `/blog/` oder `/hilfe/`. Ein Tippfehler wie `"/hilf/kassenbuch-fuehren"` oder ein `"/funktionen/…"`-Eintrag besteht den Test und fehlt dann still im Abschnitt „Weiterlesen“. Die Gewerke-Vorlage wirft im selben Fall (`app/gewerke/[slug]/page.tsx:69`). Das Verhalten ist also uneinheitlich.

**Korrektur:**
```ts
for (const url of a.relatedArticles) {
  expect(url, a.slug).toMatch(/^\/(blog|hilfe)\/[a-z0-9-]+$/);
  expect(url, a.slug).not.toBe(`/${kind}/${a.slug}`);
  const [, k, s] = url.split("/");
  expect(await getContentArticle(k as ContentKind, s), url).not.toBeNull();
}
```

### LO-07: Veralteter Test sperrt den Kassenbuch-Artikel für Gewerke-Seiten

**Datei:** `craftos/tests/gewerke.test.ts:221-223`

**Fehlerszenario:** Der Test „der Entwurf /hilfe/kassenbuch-fuehren wird auf keiner Gewerke-Seite verlinkt (erst 09-09)“ beruht auf einer überholten Annahme. Der Artikel ist seit 09-09 veröffentlicht (`draft: false`, `publishedAt: 2026-10-23`) und steht in `LLMS_ANLEITUNGEN`. Der Test verhindert jetzt eine fachlich sinnvolle Verlinkung (z. B. Allrounder → Kassenbuch) und beschreibt einen Zustand, den es nicht mehr gibt.

**Korrektur:** Den Test entfernen. Der allgemeine Test „kein Artikelziel ist ein Entwurf“ (Z. 192-204) deckt den Zweck ab.

### LO-08: Sitemap-Daten fest eingetragen und doppelt gepflegt

**Datei:** `craftos/app/sitemap.ts:16`, `:24-25`, `:70`; `craftos/lib/gewerke.ts:73`

**Fehlerszenario:** `/blog` und `/hilfe` tragen fest „2026-10-23“. Ein späterer Artikel ändert die Übersicht, aber `lastModified` bleibt stehen, während die Kategorieseiten korrekt aus `updatedAt` rechnen. `/gewerke` steht zusätzlich zu `GEWERKE_STAND` noch einmal fest im Code. Ändert jemand nur eine der beiden Stellen, weichen sie auseinander.

**Korrektur:** Für `/blog` und `/hilfe` das Maximum aus `updatedAt` verwenden (wie bei den Kategorien). Für `/gewerke` gilt `pageUpdated["/gewerke"] = GEWERKE_STAND`.

### LO-09: Kassenbuch – Voraussetzung nennt Rollen statt Finanzfreigabe

**Datei:** `craftos/content/hilfe/kassenbuch-fuehren.md:20`

**Fehlerszenario:** Der Artikel nennt „Finanzrechten (Admin oder Büro-Leitung)“. Am Web-Release gilt aber `canSeeFinance = isAdmin || (isBuero && toggles.finanzen_sichtbar)` (`src/hooks/useLicense.ts:85`, `useCashBook.ts:24`). Daraus folgen zwei Fehler:
- Eine Büro-Leitung ohne die Freigabe sieht „Kein Zugriff – Für das Kassenbuch brauchst du Finanzrechte.“
- Eine Büro-Projektleitung mit der Freigabe darf das Kassenbuch nutzen, laut Text aber nicht.

**Korrektur:** „Sie arbeiten in der Web-App als Admin oder mit einer Voll-Lizenz (Büro), für die die Finanzfreigabe aktiv ist.“ Den Belegpfad in `09-f.md` ergänzen.

### LO-10: Ausnahme für den GAEB-Fachteil hängt am Wort „CraftOS“

**Datei:** `craftos/scripts/content-pruefen.mjs:239-255`; `craftos/tests/content-produktwahrheit.test.ts:49-52`

**Fehlerszenario:** Ein H2-Abschnitt in `blog/gaeb-formate.md`, der „CraftOS“ nicht wörtlich nennt (z. B. „Welche Formate liest die Software?“ oder „in der Web-App …“), ist komplett von L-1 ausgenommen. Gilt auch für „Craftos“, weil die Regex `/CraftOS/` Groß-/Kleinschreibung beachtet. UI-SPEC § 5 begrenzt die Ausnahme dagegen auf „Abschnitte unter Frage-Überschriften ohne CraftOS-Bezug“.

**Korrektur:** Nur Abschnitte ausnehmen, deren H2 mit „?“ endet und die weder `/craftos|web-app|mobile-app|in der app/i` enthalten. Einen Fixture-Test mit „Web-App“ ergänzen.

---

## Info

### IN-01: Doppelter Vorlagen-Code

`Abschnitt`, `SURFACE` und `funktionsKarten` existieren nahezu identisch in `components/content/ArticlePage.tsx:46-62/78-90`, `app/gewerke/[slug]/page.tsx:35-58` und `components/content/ContentIndex.tsx:37-45`. Die TT.MM.JJJJ-Formatierung gibt es zweimal (`ArticlePage.tsx:44`, `ContentIndex.tsx:48-51`). `ContentIndex.tsx:4` importiert `CONTENT_CTA` aus `ArticlePage` und zieht damit das ganze Artikelmodul (Szenen, Funktionsgruppen) in die Übersichten.
**Vorschlag:** `components/v2/Abschnitt.tsx`, `lib/funktionskarten.ts` und `lib/content-cta.ts` auslagern.

### IN-02: `content-types.ts` mischt Client-neutrale Daten und Icon-Komponenten

`ContentSearch` (Client) importiert `categories` aus `lib/content-types.ts`, das auch die 12 Lucide-Icons für `categoryIcons` importiert (Z. 1-15, 76-96). Dass die Icons nicht im Client-Bundle landen, hängt allein am Tree-Shaking.
**Vorschlag:** `categoryIcons` nach `lib/content-icons.ts` (nur Server) verschieben.

### IN-03: Falscher Modulkommentar in `lib/gewerke.ts`

`lib/gewerke.ts:15-17` behauptet, das Modul werde „auch clientseitig geladen“, und begründet damit, dass die Artikelziele nicht im Modul geprüft werden. Keine Client-Komponente importiert `@/lib/gewerke`, und das Modul führt `pruefeGewerke` beim Import aus.
**Vorschlag:** Den Kommentar korrigieren und als Schutz `import "server-only"` setzen, falls die Prüfung beim Import serverseitig bleiben soll.

### IN-04: `ContentSearch` – Statustext und Feldtyp

`ContentSearch.tsx:124-126` meldet auf `/hilfe` „{n} Artikel gefunden“, obwohl der Bereich überall „Anleitungen“ sagt. `:81-91`: Das Suchfeld hat kein `type="search"` (Löschen-Schaltfläche, Tastatur-Enter auf Mobilgeräten).
**Vorschlag:** `kind === "hilfe" ? COPY.menge(n) + " gefunden" : …`; `type="search"` und `autoComplete="off"` setzen.

### IN-05: Zwei Regionen mit demselben Namen

Sowohl `<article aria-labelledby="artikel-titel">` (`ArticlePage.tsx:133`) als auch die Kopf-`<section aria-labelledby={id}>` (`ContentKopf.tsx:60`) heißen nach der H1. Screenreader zeigen zwei Landmarken mit identischem Namen.
**Vorschlag:** Die Kopf-`section` ohne `aria-labelledby` lassen (dann ist sie keine Region) oder `<header>` verwenden.

### IN-06: Karte „Kundenportal“ zeigt die öffentliche Unterschriftsseite

`lib/scenes.ts:279-289` (`portalScene`, Beleg `web:src/pages/QuoteSigning.tsx`) wird über `cardScenes.kundenportal` (Z. 530) als Bild des Kundenportals gezeigt. Die Seite gehört aber nicht zum Portal-Login. Der Kommentar begründet das, die Karte suggeriert trotzdem Portal-Inhalte (siehe ME-03).
**Vorschlag:** Den Szenentitel bzw. `screen` auf „Online-Unterschrift“ setzen oder die Karte bei `angebote` führen.

### IN-07: Tabellen-Regionen mit gleichem Namen

`lib/content.ts:203-214` benennt jede Tabelle nach der vorhergehenden H2. Zwei Tabellen unter einer H2 erhalten dadurch identische Region-Labels.
**Vorschlag:** Bei Wiederholung „Tabelle 2: {H2}“ verwenden oder die `<caption>` bzw. die erste Kopfzeile einbeziehen.

### IN-08: Literal-Prüfung umgehbar durch zusammengesetzte Strings

`scripts/lib/ts-literale.mjs:14-31` prüft jedes Literal einzeln. `"Online" + "zahlung"` oder `` `nicht ${x}unterstützt` `` umgehen L-1. Kein aktueller Treffer.
**Vorschlag:** Für `BinaryExpression(+)` aus Literalen und `TemplateExpression` zusätzlich den zusammengesetzten Text prüfen.

### IN-09: Sicherheit und JSON-LD geprüft, ohne Befund

- **Prosa-HTML:** nur über `remark-rehype` ohne `allowDangerousHtml` und `rehype-sanitize`. `javascript:`-Links und Roh-HTML entfallen.
- **JSON-LD:** `JsonLd` maskiert `<`.
- **Links:** Externe Quellen tragen `rel="noopener noreferrer"`. Prosa-Links öffnen im selben Tab (kein `target`), daher besteht kein Tabnabbing.
- **Secrets:** keine im Diff (Musterprüfung auf `key|secret|token|password|Bearer`).
- **FAQPage:** auf Artikeln und Gewerken genau einmal und aus demselben Array wie die sichtbare FAQ.
- **BreadcrumbList:** genau einmal, aus `crumbsFor`.
- **Artikel-Schema:** `Article` bzw. `TechArticle`, kein HowTo.

---

## Stichprobe Inhalte (Release-Abgleich)

| Artikel | Ergebnis |
|---|---|
| `hilfe/kassenbuch-fuehren` | Alle stichprobenartig geprüften Labels (rund 25, u. a. „Kasse eröffnen“, „Zählprotokoll (Stückzahl)“, „Mehr als in der Kasse ist.“) am Web-Release belegt (`Kassenbuch.tsx`, `CashBookDialogs.tsx`, `lib/cashBook.ts`, `datevSettings.ts`). Route `/buchhaltung/kasse` über die Buchhaltungs-Navigation erreichbar, nicht entwicklergesperrt. `minDate` = letzter Kassensturz (Z. 94) stimmt mit der FAQ überein. Abweichung bei der Rolle: LO-09. |
| `hilfe/schlussrechnung-erstellen` | 13 Labels belegt. § 13b-Schalter (`DocumentCanvas.tsx:1792-1800`) nur ohne Kleinunternehmerregelung, Text „Die Steuerart ist seit der ersten festgeschriebenen Rechnung festgelegt.“ belegt. Rechenbeispiel und § 14 Abs. 4/5, § 14a Abs. 5 UStG, § 650g BGB korrekt. |
| `hilfe/zeiteintrag-erfassen-korrigieren` | 15 Web- und 8 Mobile-Labels belegt. Offline-Bearbeitung über `replayUpdateTimeEntry` (`time-tracking/lib/offlineReplays.ts:30, :109`) belegt. TOC-Doppelungen: LO-03; Länge des TOC: ME-01. |
| `hilfe/kundenportal-kunden-einladen` | Labels, Status und 14 Tage (`kundenportal_einladung.sql:315`) belegt. Portal-Startseite leer: ME-03. |
| `hilfe/craft-ai-betriebsdaten-fragen` (Teil) | „Angebotschat öffnen“ über `useAiGate('offer')` erreichbar, nicht `isDeveloper`. Der entwicklergesperrte KI-Agent wird nicht beworben. |
| `blog/reverse-charge-bauleistungen` | Rechtsaussagen zu § 13b Abs. 2 Nr. 4, Abs. 5, § 14a Abs. 3/5 korrekt. Produktlabels „Bauleister nach § 13b“ und Druckhinweis belegt. |
| `blog/offline-baustellen-app` | Statuslabels belegt. Offline-Replays für Zeiten, Berichte, Mängel, Nachrichten, Lager und Raumaufmaß belegt. 24-h-Grenze fehlt: ME-02. |
| `blog/handwerkersoftware-wechseln` (Teil) | „Daten importieren mit KI“ über `canUseUniversalImport` (Admin oder Büro mit „alle Projekte“) erreichbar. DATANORM 4/5 im Parser belegt. |

---

_Geprüft: 23.10.2026, 05:51 UTC_
_Prüfer: Claude (gsd-code-reviewer)_
_Tiefe: deep_
