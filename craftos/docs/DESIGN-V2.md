# Designsystem v2 – Kaskadennachweis und Abweichungen

Stand: 20.10.2026 · Phase 5, Plan 05-04 (Teil A: Tokens, Textbudgets, Abschnittsbausteine)

Verbindliche Vorgabe ist der freigegebene UI-Designvertrag
`.planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-UI-SPEC.md`
(Richtung „Werkbank-Präzision“). Dieses Dokument weist nach, dass die Design-Kaskade aus der
Projekt-`CLAUDE.md` („Automatische Kette: Frontend-Arbeit“) vor dem Code gelaufen ist, welche
Empfehlungen übernommen wurden und welche bewusst verworfen wurden.

Ausgangslage laut Inhaber (20.10.2026): Die Seite wirkt „langweilig, nur Schrift“. Jeder Baustein
existiert, um einen Textblock durch Struktur oder Bild zu ersetzen.

---

## 1. frontend-design

**Ausführung:** Die offizielle Leitlinie des Plugins `frontend-design`
(`claude-plugins-official/frontend-design/a0b04d9ddcca/skills/frontend-design/SKILL.md`, neuester
Stand vom 20.10.2026) wurde gelesen und zusammen mit dem UI-SPEC als Vorgabe angewendet. Der
Ausführende hatte in dieser Sitzung kein Skill-Werkzeug; die Leitlinie wurde deshalb gelesen statt
über das Skill-Werkzeug aufgerufen. Es wurde kein Text der Leitlinie in das Repository übernommen.
Bei konkreten Werten gilt der UI-SPEC.

**Erster Durchgang – kompaktes Tokensystem:**

| Bereich | Entscheidung |
|---|---|
| Farbe | Weiß `#FFFFFF` (Fläche), Warm `#F7F3EB` (Kacheln, Bühnen), Ink `#101014` (Hero, CTA-Band, max. eine Kachel), Amber `#F2AF38` (Haupt-CTA, Sechseck-Knoten, Maßlinie), Akzenttext `#99600B`, Sekundärtext `#62626E` |
| Schrift | Clash Display für Überschriften und Kennzahlen, General Sans für alles andere; nur 400/600; vier Größen 14/16/20/48 |
| Layout | Linksbündig; Abschnittskopf über genau einem visuellen Baustein; Raster mit Größen- und Flächenwechsel statt Kartenreihen |
| Prinzip | Kühnheit an einer Stelle (Geräterahmen in Teil B); alles andere flach, ruhig und eindeutig gegliedert |

**Zweiter Durchgang – Abgleich mit generischen Mustern und Korrekturen:**

| Generisches Muster | Korrektur in Teil A |
|---|---|
| Identische, gleich gerundete Karten mit gleichem Schatten | `BentoGrid`: vier Größen, drei Flächen, zwei Radien (16/24 px), keinerlei Kachelschatten; das Raster verweigert gleichförmige Inhalte (mindestens zwei Größen, höchstens eine dunkle Kachel). |
| Eyebrow in Großbuchstaben über jeder Überschrift | `.v2-eyebrow` ist optional, Satzschreibung, ohne Sperrung, ohne Pille; 22-px-Haarstrich davor. |
| Nummerierte Marker „01 / 02 / 03“ als Dekoration | Nummern ausschließlich in `StepFlow`, weil dort wirklich eine Abfolge vorliegt; der Knoten ist das Sechseck des Logos. |
| Große Zahl mit Verlaufsakzent | `KeyFacts`: Zahl in Clash Display, tabellarische Ziffern, getrennt nur durch 1-px-Linien, kein Verlauf, kein Akzent unter der Zahl; jede Zahl mit Quellenpflicht. |
| Pfeil „→“ an Linktext | Kein Pfeil an Textlinks; nur der Haupt-CTA behält `ArrowUpRight` (Wechsel in die Web-App). |
| Einblendungen beim Scrollen | Keine. Bewegung nur als Antwort auf Nutzeraktion: Hover 150–180 ms, Drehung des FAQ-Symbols 150 ms. |

**Die eine markante Stelle in Teil A:** Die Schrittfolge wird als **Maßkette** gezeichnet – Sechseck-Knoten
aus der Logo-Geometrie, verbunden durch eine 2-px-Maßlinie mit Endstrichen, wie eine Bemaßung auf
einer Werkzeichnung. Das ist ein Motiv aus der Welt des Handwerks (Aufmaß, Bemaßung) und kommt
sonst auf der Seite nicht vor.

## 2. ui-ux-pro-max

**Ausführung (20.10.2026, lokal):**

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas construction trades software bold product-focused" --design-system -p "CraftOS"
py -3.12 -X utf8 .../search.py "bento grid" --domain style
py -3.12 -X utf8 .../search.py "saas construction landing" --domain landing
py -3.12 -X utf8 .../search.py "animation reduced motion hover" --domain ux
```

**Ergebnis und Bewertung:**

| Empfehlung | Übernommen? | Begründung |
|---|---|---|
| Stil „Flat Design“: keine Verläufe, keine Schatten, Übergänge 150–200 ms ease | Ja | Deckt sich mit „Kühnheit an einer Stelle“; Schatten nur an Geräterahmen (Teil B). |
| Bento-Raster mit variierenden Spannweiten über CSS Grid | Ja | Kernbaustein `BentoGrid` (`grid-auto-flow: dense`, 1/2/4 Spalten). |
| Swiss-Modernism-Raster (rationale Abstände, ein Akzent) | Teilweise | Strenge Abstandsskala 4–64 px übernommen; 12-Spalten-Raster nicht, weil 1/2/4 Spalten genügen. |
| Typografie Clash Display / Satoshi (Google-Fonts-Alternativen Outfit/Rubik) | Nur Clash Display | Clash ist bereits Marke; Satoshi, Outfit und Rubik (auch Nunito aus früheren Läufen) verworfen – General Sans bleibt (D-08). Keine externen Schriftquellen. |
| Palette `#3B82F6` / `#60A5FA` / CTA `#F97316` / Fläche `#F8FAFC` | Nein | Widerspricht der gesperrten Marke Ink + Amber (D-08). |
| Bento-Effekte „hover scale 1.02“, „subtle shadows“, „soft shadow expansion“, „content reveal“ | Nein | Generisch und teils inhaltsverbergend (DESIGN-04); stattdessen Rahmenfarbe `primary-700` und Titelunterstreichung, kein Schatten, keine Einblendung. |
| Muster „Product Review/Ratings Focused“ | Nein | Keine verifizierten Bewertungen vorhanden; erfundene Bewertungen verletzen MEDIA-03. |
| Landing-Muster „Pricing-Focused“ (Hero → Preise → Vergleich → FAQ → CTA) | Als Seitenrezept vorgemerkt | Entspricht den Seitenrezepten für Phase 6/8 im UI-SPEC; in Phase 5 keine Seitenumgestaltung (D-03). |
| „Horizontal Scroll Journey“ (in den Rechercheläufen der Phase genannt, im Lauf vom 20.10.2026 nicht erneut ausgegeben) | Nein | Erzwingt Scrollbewegung und versteckt Inhalte außerhalb des Sichtbereichs; Abläufe werden als statische `StepFlow` gezeigt (D-08, DESIGN-04). |
| UX: `prefers-reduced-motion` beachten, höchstens 1–2 bewegte Elemente je Ansicht, Hover nicht als einzige Interaktion | Ja | Globale Reduced-Motion-Regel bleibt; Hover-Effekte nur unter `@media (hover: hover)`; alle Inhalte ohne Hover vollständig erreichbar. |
| Checkliste: keine Emojis als Icons, sichtbarer Fokus, Kontrast ≥ 4,5:1, Prüfbreiten 375/768/1024/1440 | Ja | Lucide-Icons, Fokusring 3 px `#BB7609` (auf Amber `#101014`); Prüfbreiten des Projekts sind 360/390/768/1024/1440. |

## 3. 21st.dev

**Nicht verfügbar.** Das Werkzeug `21st_magic_component_inspiration` stand dem Ausführenden dieses
Plans (Executor ohne MCP-Zugriff auf 21st.dev) nicht zur Verfügung. Es wurden daher **keine**
Referenzen für „bento grid“, „step timeline“, „stats bar“, „faq accordion“ und „cta banner“
abgerufen, und es werden hier keine Ergebnisse behauptet. `21st_magic_component_builder` und
`_refiner` wurden nicht verwendet. Der Code entstand ausschließlich aus dem UI-SPEC und der
frontend-design-Leitlinie. Nachholen ist optional; Ergebnisse würden nur als Inspiration in diesen
Abschnitt eingetragen.

## 4. Context7

**Context7 nicht verfügbar** (weder MCP-Werkzeug noch `ctx7`-CLI in der Ausführungsumgebung; kein
Webabruf-Werkzeug). Ersatz: die mit dem installierten Paket ausgelieferte offizielle Next.js-Doku
(`craftos/node_modules/next/dist/docs`, Next.js **16.3.4**, Tailwind **4.3.0**):

| Frage | Quelle | Ergebnis |
|---|---|---|
| `metadata.robots` für `/styleguide` (Plan 05-06) | `01-app/03-api-reference/04-functions/generate-metadata.md` § `robots` | `export const metadata: Metadata = { robots: { index: false, follow: false } }` erzeugt `<meta name="robots" content="noindex, nofollow">`. |
| `next/image` `sizes`, `width`/`height` (`MediaFigure`, Plan 05-05) | `01-app/03-api-reference/02-components/image.md` § `sizes` | `sizes` steuert die Auswahl aus `srcset`; ohne `fill` sind `width`/`height` Pflicht und verhindern Layout-Shift. |
| Tailwind-4-Tokens in `@theme` | Bestand `app/globals.css` | Mehrere `@theme`-Blöcke werden zusammengeführt, spätere Werte gewinnen (siehe Abschnitt 5). Namensräume `--radius-*`, `--shadow-*`, `--spacing-*`, `--color-*` erzeugen gleichnamige Hilfsklassen. CSS-Module referenzieren Tokens immer mit Fallback (`var(--radius-tile, 16px)`), damit sie unabhängig davon funktionieren, ob Tailwind die Variable ausgibt. |

## 5. Tokens und Bestandsprüfung

- Neue Tokens stehen wörtlich aus dem UI-SPEC im **ersten** `@theme`-Block von `app/globals.css`:
  `--radius-badge` 6 px, `--radius-tile` 16 px, `--radius-stage` 24 px, `--shadow-device`,
  `--shadow-device-dark`, `--spacing-section` 96 px, `--spacing-section-md` 64 px,
  `--spacing-section-sm` 48 px, `--color-line-warm` `#e7dcc9`.
- **`ink-100` geprüft:** Der erste `@theme`-Block setzt `--color-ink-100: #f4f4f5`, der zweite
  (`/* CraftOS: warmer Werkstattcharakter … */`) überschreibt auf **`#f7f3eb`**. Wirksam ist
  `#f7f3eb` (warm). Ebenso `--color-primary-50`: wirksam `#fff4d9`. Die v2-Module verwenden die
  Hexwerte des UI-SPEC direkt, damit eine spätere Bereinigung der doppelten Blöcke nichts verschiebt.
- Neuer Klassenblock `.v2-eyebrow` und `.v2-btn-cta` direkt nach den Bestandsbuttons
  (`.btn-cta`, `.btn-secondary`) des ersten Abschnitts. `.btn-cta`, `.eyebrow` und die Reduced-Motion-Regel sind unverändert.

## 6. Bausteine Teil A (Plan 05-04)

Alle Bausteine liegen in `craftos/components/v2/`, sind React Server Components ohne
`"use client"`, nutzen CSS-Module mit dem einheitlichen Importnamen `s` und rendern ihren
Endzustand vollständig im HTML.

| Baustein | Semantik | Regeln im Code |
|---|---|---|
| `SectionHeader` | `header` mit optionaler `.v2-eyebrow`, genau einer `h2` (`as="h1"` nur Musterseite), Lead `p` | Textbudget Eyebrow 24, Titel 60, Lead 140 |
| `BentoGrid` / `BentoTile` / `TileIcon` | `ul role="list"` → `li` → `article` → `h3` | 3–7 Kacheln, mindestens zwei Größen, höchstens eine dunkle Kachel, `visual` Pflicht, gestreckter Link am Titel |
| `StepFlow` | `ol` mit 3–6 `li`, Knoten `aria-hidden` | Sechseck-Knoten, Maßlinie mit Endstrichen, horizontal ab 1024 px |
| `KeyFacts` | `dl` mit `dt` (Beschriftung) und `dd` (Wert, `data-source`) | 3–4 Fakten, `source` und `note` Pflicht |
| `FaqList` | `details`/`summary` | 3–8 Fragen, jede endet mit „?“, Antwort ≤ 600 Zeichen, erster Satz ≤ 300 |
| `CtaBand` | `section` mit `h2`, Haupt-CTA `.v2-btn-cta` → `site.ctaUrl`, Sekundärlink „Preise ansehen“ → `/preise` | Titel 40, Satz 80; Buttontext aus `site.trialDays` abgeleitet |

Fehlertexte folgen dem UI-SPEC („BentoGrid: mindestens 3 Kacheln erforderlich – Inhalte in lib/…
ergänzen.“, „KeyFacts: Wert ‚{value}‘ ohne Quelle – …“, „Textbudget überschritten: {Baustein}.{Feld}
hat {n} von {max} Zeichen – Satz kürzen.“).

### Ermessensentscheidungen innerhalb des UI-SPEC

- **StepFlow `tone="amber"`:** Auf der Amber-Fläche wäre ein Amber-Knoten unsichtbar. Der Knoten wird
  dort mit `#101014` gefüllt und trägt die Ziffer in Amber (≈ 10:1); die Maßlinie nutzt `#77531155`
  wie im UI-SPEC. Die Amber-Fläche rendert der Baustein selbst als Bühne (Radius 24 px), damit sie
  auf der Musterseite sichtbar ist; Seiten in Phase 6 können sie vollflächig setzen.
- **Sechseck-Geometrie:** Spitze oben wie das Logo (Proportion Breite/Höhe ≈ 0,86); im 40 × 40-px-Feld
  als `polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)`.
- **Hover auf dunkler Bento-Kachel:** Die dunkle Kachel hat einen transparenten 1-px-Rahmen, der beim
  Hover wie alle Kacheln auf `primary-700` wechselt – keine Größenänderung, kein Layout-Sprung.
- **Sekundärlink im CTA-Band:** Hover verstärkt nur die Unterstreichung (2 px), damit auf Dunkel kein
  Akzenttext entsteht.

---

## Teil B (Plan 05-05) und Musterseite (Plan 05-06)

### 7. Kaskade Teil B (Plan 05-05, 20.10.2026)

1. **frontend-design:** Es gab kein Skill-Werkzeug. Deshalb wurde die neueste Leitlinie
   (`a0b04d9ddcca`) nur gelesen und nicht kopiert. Der UI-SPEC legt die Richtung fest, daher wurden
   die zwei Durchgänge nur auf die freien Achsen angewendet. Der erste Durchgang verteilte die
   Gewichte: Geräterahmen als einzige Stelle mit Schatten, alles andere flach. Der zweite Durchgang
   war ein Abgleich mit generischen Mustern:
   - **Verworfen:** ein zweiter Link im Kartentitel, damit es nur einen Tabstopp je Karte gibt;
     „→“ an Kartenlinks; „·“-Ketten in Tabellenunterschriften (die Altseite `/vergleich` nutzt sie
     noch); farbige Ja/Nein-Symbole; Monospace in der Mini-UI.
   - **Beibehalten:** Das Sechseck erscheint als Umriss nur im Icon-Motiv der Funktionskarte ohne
     Szene. Es wird nicht als Dekor verwendet.
2. **ui-ux-pro-max** (`search.py "saas comparison table device mockup trust" --domain ux`, zusätzlich
   `"accessibility screen reader table"`, `"images layout shift"`, `"feature card badge"` mit
   `--domain ux`):
   - **Übernommen:**
     - „Table Handling“: horizontaler Scrollbereich statt überlaufender Tabelle, als `role="region"`
       mit `tabindex="0"` und fester erster Spalte unter 768 px.
     - „Screen Reader“ und „Heading Hierarchy“: echte `table`/`caption`/`th scope`, Karten-`h3`.
     - „Content Jumping“: feste `aspect-ratio` für Bühne, Browser und Phone sowie `width`/`height`
       an Bildern.
     - „Alt Text“: `alt` ist Pflicht in `MediaFigure`.
   - **Verworfen:** die alternative „Card layout“ für Tabellen. Sie verliert den Spaltenvergleich und
     widerspricht dem UI-SPEC.
   - **Ohne Treffer:** `"feature card badge"`.
3. **21st.dev:** `21st_magic_component_inspiration` war für „comparison table“, „device mockup“,
   „feature card“ und „badge“ nicht verfügbar. Es wurden keine Ergebnisse erfunden und kein
   builder/refiner eingesetzt.
4. **Context7:** Weder MCP-Werkzeug noch `ctx7`-CLI waren verfügbar. Ersatzweise wurde die
   offizielle Next.js-16-Doku in `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`
   geprüft:
   - `width`/`height` reservieren das Seitenverhältnis.
   - `sizes` erzeugt ein volles `srcset`.
   - **`priority` ist seit Next.js 16 abgekündigt.** `MediaFigure` behält die UI-SPEC-Prop
     `priority`, übersetzt sie aber in `loading="eager"` und `fetchPriority="high"`, wie die Doku
     empfiehlt.

### 8. Bausteine Teil B (Plan 05-05)

| Baustein | Semantik | Regeln im Code |
|---|---|---|
| `ComparisonTable` | `div role="region"` (aria-label = Caption, `tabindex="0"`) → `table` mit `caption`, `th scope="col"`/`"row"` | max. 4 Wertspalten / 12 Zeilen, höchstens 1 hervorgehobene Spalte, `note` Pflicht, Zeilenbeschriftung ≤ 48 und Zelltext ≤ 24 Zeichen; Ja/Nein als `Check`/`Minus` mit `sr-only`-Text |
| `PlatformBadge` / `LicenseBadge` / `BadgeGroup` / `PlatformBadges` | `ul aria-label` → `li` → `span` | feste Texte „Web-App“, „Mobile-App“, „Voll-Lizenz“, „App-Lizenz“; dunkel über `data-tone`/`data-surface="dark"` am Vorfahren |
| `FeatureCard` | `article` → Bühne 4:3, Badges, `h3`, `p`, ein gestreckter Link „Mehr zu {name}“ | nur `tier === "heute"` und nur in `funktionen[].platforms` belegte Plattformen; Titel 32, Nutzen 100 |
| `IllustrationLabel` / `FrameCaption` | `span` mit `Info`-Icon; `figcaption` mit `sr-only`-Satz + Kennzeichnung | Texte wörtlich; Beschreibung ≤ 140 Zeichen |
| `MediaFigure` | `figure` → `next/image` → optional `figcaption` | `src`/`alt`/`width`/`height`/`sizes` Pflicht, Bildunterschrift ≤ 90 Zeichen |
| `BrowserFrame` / `PhoneFrame` / `DevicePair` | `figure` mit `data-evidence`; Gerät `aria-hidden="true"` + `inert`; `figcaption` | Beleg Pflicht (Fehlertext „… evidence fehlt – Belegpfad aus origin/release angeben.“), Tabs exakt „Einsätze, Zeiten, Projekte, Mehr“, `DevicePair` mit genau einer Kennzeichnung und Beleg je Gerät |
| Mini-UI (`MiniList`, `MiniRow`, `MiniStat`, `MiniStatus`, `MiniWeek`, `MiniTimer`) | `ul`/`li` bzw. `div`/`span`, keine fokussierbaren Elemente | `MINI_BUDGET` = 24 Zeichen je Zeile, 5 Zeilen je Liste; Statusnamen nur „Entwurf“, „Offen“, „Gesendet“, „Bezahlt“, „Überfällig“, „Storniert“ (Beleg `web:src/pages/Dokumente.tsx`) |

### 9. Übertrag „Design-Kaskade Teil B“ und Vermerk /preise

- **Design-Kaskade Teil B:** Der Nachweis aus `05-05-SUMMARY.md` (Abschnitt „Design-Kaskade Teil B“) steht vollständig in §7 oben. Plan 05-06 übernimmt ihn unverändert und trifft für die Musterseite keine neuen Stilentscheidungen.
- **Design-Kaskade /preise (Übertrag aus `05-03-SUMMARY.md`):** Plan 05-03 ergänzte auf der bestehenden Preisseite ohne Redesign (D-03) einen kompakten Block für Credit-Pakete.
  - *frontend-design:* Leitlinie gelesen (kein Skill-Werkzeug). Flacher Block im KeyFacts-Muster: Raster aus 1-px-Linien `ink-200`, Beträge in `tabular-nums`, keine Eyebrow, keine Pfeile, keine Animation; `section` mit `aria-labelledby` und `h2`, Paketliste als `ul`, Netto-Hinweis darunter.
  - *ui-ux-pro-max:* `"saas pricing credits add-on" --domain ux` ohne Treffer; `"pricing table list" --domain ux` übernommen (2 × 2 unter 768 px, 4 Spalten ab 768 px); `"pricing" --domain landing` (Karten mit Schatten, farbige Tarife) verworfen.
  - *21st.dev:* nicht verfügbar, nicht aufgerufen.
  - *Sichtprüfung:* Dev-Server, 390 und 1440 px, kein Überlauf.

### 10. Kaskade MobileAppGallery (Plan 05-06, Task 1, 21.10.2026)

Auftrag: nur Pfade und Kennzeichnung ändern, kein Redesign (D-03).

1. **frontend-design:** Kein Skill-Werkzeug verfügbar. Die Leitlinie (`claude-plugins-official/frontend-design/*/skills/frontend-design/SKILL.md`, alle Cache-Stände inhaltsgleich) wurde gelesen und nicht kopiert. Angewendet wurde der Abschnitt zum Schreiben: Benennung aus Nutzersicht, ein Satz je Aufgabe, Satzschreibung. **Ergebnis:** „Aktuelle Appaufnahme“ ersetzt durch die Kennzeichnung „Darstellung, KI-gestaltet: App-Aufnahme vom 9. September 2026 im Handy-Mockup.“ bzw. „Originalaufnahme der Mobile-App vom 9. September 2026.“ (UI-SPEC §9, D-04). Layout, Farben und Umschalter bleiben unverändert.
2. **ui-ux-pro-max** (`search.py "image gallery caption label" --domain ux`): **Übernommen:** „Image Optimization“ (WebP/AVIF in passender Größe statt Original-PNG), „Image Scaling“ (Bestand `width: min(100%, 360px)` bleibt). **Nicht relevant:** „Input Labels“ (Formulare).
3. **21st.dev:** `21st_magic_component_inspiration` („image gallery toggle“) stand nicht als Werkzeug zur Verfügung. Nichts erfunden, kein builder/refiner.
4. **Context7:** nicht verfügbar; keine neue API genutzt (`next/image` mit `unoptimized` im `picture` wie bisher).

### 11. Kaskade /styleguide (Plan 05-06, Task 2, 21.10.2026)

1. **frontend-design:** Leitlinie gelesen (wie §10). Die Richtung legt der UI-SPEC fest („Werkbank-Präzision“, Blöcke 0–13). Der Durchgang betraf nur die freien Achsen der Musterseite:
   - Blockköpfe als Label 14/600 General Sans in `ink-500`, ohne Sperrung und Großbuchstaben. Die globale h1–h4-Regel setzt sonst Clash Display mit −0,025 em; deshalb setzen die Blockköpfe die Schrift ausdrücklich.
   - Flächenrhythmus Weiß / `#F7F3EB`, dunkle Varianten nur als eingefasste Fläche (Radius 24 px), Blockabstand 64 px ab 768 px (48 px darunter).
   - Tokens als Muster (Farbfelder mit Hex und Rolle, vier Schriftgrößen, Abstandsleiste 4–64 px, Ausnahme 96 px gestrichelt in `primary-700`, Radien 6/16/24 px).
   - **Verworfen:** Nummerierung der Blöcke („01 / 02“) – die Blöcke sind kein Ablauf; Eyebrows über den Blockköpfen; Amber für die Abstandsleisten (Amber ist reserviert).
2. **ui-ux-pro-max / 21st.dev:** keine neuen Stilentscheidungen; es gelten die Ergebnisse aus §2/§3 und §7.
3. **Context7:** MCP-Werkzeug und `ctx7`-CLI nicht verfügbar. Ersatzweise wurde die mitgelieferte Next.js-16-Doku geprüft: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` (`robots: { index: false, follow: false }` rendert `<meta name="robots" content="noindex, nofollow">`; Metadaten werden je Schlüssel flach zusammengeführt, deshalb ersetzt das Seiten-`robots` die `googleBot`-Angaben des Root-Layouts vollständig) und `05-config/01-next-config-js/headers.md` (zusätzlicher Eintrag `source: "/styleguide"` mit `X-Robots-Tag`).
4. **DataForSEO / Keyword-Schritte:** entfallen begründet – interne noindex-Seite ohne Suchziel.

**Kein JSON-LD auf /styleguide:** noindex/nofollow, nicht in Sitemap und llms.txt, kein Suchziel; Schema-Pflicht der Projekt-CLAUDE.md gilt für indexierbare Seiten. Die Seite ist zusätzlich nicht verlinkt und nicht per `robots.txt` gesperrt, damit Suchmaschinen das `noindex` lesen können.

**Inhalte:** ausschließlich in `lib/styleguide-content.ts`. Preise über `Intl.NumberFormat` aus `tarife`, Testphase aus `site.trialDays`, Credits aus `startCredits`, „21“ aus `mobileLocales.length`, Stand aus `productBasis.checkedAt`. Rahmenbelege stammen aus dem Produktregister (`tests/styleguide.test.ts`). Das Werkstattfoto ist laut `docs/MEDIA.md` KI-generiert und trägt auf der Musterseite deshalb „Darstellung, KI-gestaltet“ statt der UI-SPEC-Platzhalterzeile „Kein KI-Bild hinterlegt …“.

**Korrekturen an Bausteinen aus der Sichtprüfung:**

| Baustein | Befund | Behebung |
|---|---|---|
| `ComparisonTable` | 360–390 px: Seite 51 px breiter als das Fenster, weil die absolut positionierten `sr-only`-Texte („Ja“/„Nein“) dem nicht positionierten Scrollbereich entkamen | `.scroll { position: relative; }` |
| `FeatureCard` | Die 4:3-Bühne schnitt die `figcaption` des Geräterahmens ab, die Kennzeichnung war unsichtbar (MEDIA-03) | Kennzeichnung als Leiste an der Bühnenunterkante (`position: absolute`, warme Fläche, `pointer-events: none`) |

**Sichtprüfung** (Dev-Server, Chromium, `reducedMotion: "reduce"`): Breiten 360, 375, 390, 768, 1024 und 1440 px ohne horizontalen Seitenscroll (einziger Scrollbereich ist die Vergleichstabelle), `document.getAnimations()` = 0, axe (wcag2a/2aa/21aa) ohne Verstöße, `sr-only` kommt im ausgelieferten CSS an (`position: absolute`, 1 px).
