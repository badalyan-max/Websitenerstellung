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

---

## 12. Kaskade Phase 6 (Plan 06-02, 21.10.2026)

Verbindliche Vorgabe ist der freigegebene UI-Designvertrag
`.planning/phases/06-startseite-navigation-und-funktions-bersicht/06-UI-SPEC.md` (aufbauend auf
05-UI-SPEC). Dieser Abschnitt weist nach, dass die Kaskade vor den neuen Bausteinen der Phase 6
(E1 `DevicePair` compact, E2 `FeatureList`, E3 Kurzform-Belege) gelaufen ist. Konkrete Werte stehen
ausschließlich im UI-SPEC; hier werden keine neuen Werte festgelegt.

1. **frontend-design:** Kein Skill-Werkzeug in dieser Sitzung. Gelesen (nicht kopiert):
   `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`
   (byte-identisch mit dem Phase-5-Stand `a0b04d9ddcca`, per `cmp` geprüft). Angewendet auf die freien
   Achsen der Bausteine:
   - *Kühnheit an einer Stelle:* Die Kompaktlage des Geräterahmens (E1) bleibt das einzige markante
     Element im Hero; `FeatureList` ist bewusst flach (Liste mit 1-px-Linien, keine Karte, kein Schatten,
     keine Bühne), damit sie sich klar von den Detailkarten abhebt.
   - *Strukturmittel tragen Information:* Plattform-Badges nur bei belegten Plattformen, Zielhinweis nur
     bei echtem Ziel; ohne Ziel kein Link und kein Platzhalter.
   - *Bewegung nur als Antwort auf Nutzeraktion:* Hover-Unterstrich 150 ms unter `@media (hover: hover)`,
     unter `prefers-reduced-motion: reduce` ohne Übergang; keine Einblendungen.
   - *Schreiben aus Nutzersicht:* Zielhinweise „Anleitung in der Hilfe“ bzw. „Beschrieben unter {Name}“
     benennen, was hinter dem Link liegt.
2. **ui-ux-pro-max** (ausgeführt am 21.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas mega menu navigation feature overview" --domain ux
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas landing page hero handwerk software" --domain ux
   ```
   Treffer: Sticky Navigation (Medium), Breadcrumbs (Low), Back Button (High, mobil) bzw. Image
   Optimization (High), Active State (Medium). Sie decken sich mit der Tabelle in 06-UI-SPEC.md,
   Abschnitt „2. ui-ux-pro-max“; Übernahmen und Verwerfungen gelten unverändert von dort
   (übernommen: Sticky-Ausgleich über `scroll-margin-top`, vorhersagbare Zurück-Taste ohne `pushState`,
   keine Rasterbilder im Hero, aktiver Navigationszustand; sichtbarer Breadcrumb verworfen, nur
   BreadcrumbList-Schema).
3. **21st.dev:** `21st_magic_component_inspiration` stand dem Ausführenden in dieser Sitzung **nicht**
   als Werkzeug zur Verfügung; die Suchen „mega menu“, „saas hero device mockup“ und „feature list
   compact“ wurden deshalb nicht ausgeführt. Es wurden keine Referenzen abgerufen oder behauptet; builder
   und refiner wurden nicht verwendet.
4. **Context7:** MCP-Werkzeug in dieser Sitzung nicht verfügbar, `ctx7`-CLI nicht installiert. Ersatz ist
   die mitgelieferte Doku `craftos/node_modules/next/dist/docs`:
   `01-app/03-api-reference/04-functions/generate-metadata.md` (Title-Template gilt nicht für die
   Root-Seite), `01-app/03-api-reference/02-components/link.md` (`next/link`, `prefetch`) und
   `01-app/01-getting-started/05-server-and-client-components.md` (Server Components als Kinder einer
   Client-Hülle; `SceneContent`, `Frame` und `FeatureList` bleiben Server Components ohne `"use client"`).

**Ergänzungen (je ein Satz Begründung):**

| # | Ergänzung | Begründung |
|---|---|---|
| E1 | `DevicePair layout="compact"` mit Phone 160 px, unter 768 px rechts unten über dem Browser | Bei 360 × 640 muss die Produktdarstellung oberhalb der Falz beginnen, was der bisherige Stapel nicht schafft (D-20). |
| E2 | `FeatureList` für die Zusatzfunktionen ohne Detailseite | `FeatureCard` verlinkt immer auf eine Detailseite und wäre für Zusatzfunktionen irreführend (D-18). |
| E3 | `data-evidence` nur noch als Kurzform `web:<Bildschirm>` bzw. `app:<Bildschirm>` | Interne Quellpfade gehören nicht ins öffentliche HTML; der volle Beleg bleibt in `lib/scenes.ts` (D-16, LO-05). |

**Abweichungen zu 05-UI-SPEC (je ein Satz Begründung, Details in 06-UI-SPEC.md):**

| # | Abweichung | Begründung |
|---|---|---|
| A1 | Display 48 px erst ab 1200 px (Formel unverändert) | Die Formel `clamp(32px, 4vw, 48px)` ergibt bei 1024 px nur 40,96 px, die alte Beschreibung war in sich widersprüchlich. |
| A2 | H1 der Startseite unter 400 px 28 px | „Handwerkersoftware,“ ist bei 32 px breiter als der 324-px-Container und darf nicht getrennt werden. |
| A3 | Amber-Liste umfasst das Header-Logo | Das Logo mit Amber-Sechseck steht seit vor Phase 5 auf jeder Seite und ist als Marke gesperrt. |
| A4 | Header und mobiler Drawer dunkel `#101014` | Beide sind Navigationsebenen über dem Inhalt und verletzen den Flächenrhythmus der Inhaltsabschnitte nicht. |
| A5 | Icon-Feld 40 × 40 mit 20-px-Icon in Menü und `FeatureList` | Listen- und Navigationszeilen sind dichter als Kacheln, und 40 px liegt weiter auf dem 8-px-Raster. |
| A6 | `FeatureCard`-Raster und `FeatureList` in einem Abschnitt je Gruppe | Eine Trennung würde je Gruppe eine zweite H2 erzeugen und die Gruppenanker zerreißen. |
| A7 | Schatten zusätzlich an Navigationspanels | Die Panels sind eine funktionale Überlagerungsebene und kein dekoratives Element. |

**Extraktion ohne Sichtänderung:** `euro`/`germanDate` liegen jetzt in `lib/format.ts`, die sechs Szenen
samt Typen in `lib/scenes.ts` (neues Pflichtfeld `screen` mit der Kurzform, dazu `cardScenes` für
/funktionen), `SceneContent` und `Frame` in `components/v2/SceneContent.tsx`. `lib/styleguide-content.ts`
re-exportiert die bisherigen Namen, die Musterseite bleibt unverändert.

## 13. Kaskade Hauptnavigation (Plan 06-03, 21.10.2026)

Verbindlich sind 05-UI-SPEC und 06-UI-SPEC, Abschnitt „Seite 2: Hauptnavigation“ (WAI-APG „Disclosure
Navigation Menu with Top-Level Links“, Esc mit Fokusrückgabe, Hover nur per Maus ab 1121 px, Klick nach
Hover hält offen, Pfeil runter fokussiert den ersten Panel-Link, 44-px-Ziele, Drawer-Maße). Hier werden keine
neuen Werte festgelegt; die Umsetzung steht in `components/layout/HeaderShell.tsx`, `Header.tsx`,
`MegaMenu.tsx` und den zugehörigen CSS-Modulen.

1. **frontend-design:** Kein Skill-Werkzeug in dieser Sitzung. Gelesen (nicht kopiert):
   `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`
   (byte-identisch mit `a0b04d9ddcca`, per `cmp` geprüft). Angewendet:
   - *Strukturmittel tragen Information:* Icon-Feld nur am Gruppenkopf (eine Bildsprache mit `StepFlow`),
     Trennlinien nur zwischen Hauptpunkten im Drawer, warme Fußleiste markiert die übergreifenden Links;
     keine Überschriften, Nummern oder Vorschaubilder im Panel (D-17).
   - *Bewegung nur als Antwort auf Nutzeraktion:* einzig die Chevron-Drehung (150 ms) und Hover-Flächen
     unter `@media (hover: hover)`; Panels und Drawer erscheinen ohne Ein-/Ausblendung, unter
     `prefers-reduced-motion: reduce` ganz ohne Übergang.
   - *Schreiben aus Nutzersicht:* Schalter heißen zustandsunabhängig „Untermenü {Hauptpunkt}“, Linktexte
     der Funktionen sind die Funktionsnamen (D-11).
2. **ui-ux-pro-max** (ausgeführt am 21.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "mega menu disclosure navigation keyboard mobile drawer" --domain ux
   ```
   Treffer: Keyboard Navigation (High: Tab-Reihenfolge = Sichtreihenfolge, keine Fallen), Mobile Keyboards
   (Medium, für Navigation ohne Belang), Skip Links (Medium). Übernommen: DOM-Reihenfolge Link → Schalter →
   Panel → nächster Hauptpunkt, Esc ohne Fokusfalle; der bestehende Sprunglink „Zum Inhalt“
   (`app/layout.tsx`) bleibt vor dem Header und überspringt das Mega-Menü.
3. **21st.dev:** `21st_magic_component_inspiration` stand in dieser Sitzung **nicht** als Werkzeug zur
   Verfügung; es wurden keine Referenzen abgerufen oder behauptet, builder und refiner nicht verwendet.
4. **Context7:** MCP-Werkzeug in dieser Sitzung nicht verfügbar. Ersatz: mitgelieferte Doku
   `craftos/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
   (Server Components als Slot einer Client-Hülle) und `…/02-components/link.md` (`prefetch={false}` an
   Panel-Links).

**Sichtprüfung (Playwright-Screenshots, nicht eingecheckt):** Mega-Menü offen bei 1440 und 1121 px,
Gewerke- und Hilfe-Panel bei 1440 px, Drawer bei 390 und 768 px (zweispaltige Gruppen), ohne JavaScript bei
390 und 1440 px. Befund und Korrektur: Bei 1121 px lief der Logo-Schriftzug unter „Funktionen“, und mit
Windows-Scrollleiste brachen die Store-Links um; das Logo nimmt jetzt seine Inhaltsbreite ein, und zwischen
1121 und 1250 px betragen die Lücken der Hauptpunkte 12 px statt 16 px (CTA-Innenabstand 16 px).

**Abweichungen (je ein Satz Begründung):**

| # | Abweichung | Begründung |
|---|---|---|
| N1 | Nur das Mega-Menü ist am Header zentriert, das Gewerke-Panel (570 px) hängt wie im Bestand an seinem Hauptpunkt | Ein zentriertes Gewerke-Panel läge nicht unter dem Hauptpunkt, sodass die Maus beim Weg ins Panel das `<li>` verließe und es schlösse (WCAG 1.4.13). |
| N2 | Hauptpunkt-Lücke 12 px statt 16 px zwischen 1121 und 1250 px | Mit klassischer Scrollleiste (15 px, `scrollbar-gutter: stable`) reichte die Breite sonst nicht für eine Kopfzeile ohne Umbruch. |
| N3 | Gruppentitel- und Fußleistenlinks im weißen Panel mit 8 px Innenabstand und −8 px Außenabstand | So erhalten sie die Hover-Fläche `#F7F3EB` aus dem UI-SPEC, ohne dass der Text aus der Flucht rückt. |

## 14. Kaskade Startseite (Plan 06-04, 21.10.2026)

Verbindlich sind 05-UI-SPEC und 06-UI-SPEC, Abschnitt „Seite 1: Startseite“ (Hero mit Keyword-H1 und
`DevicePair` compact, danach genau sieben Abschnitte: Kennzahlen, Arbeitsablauf, Kernfunktionen,
Web-App + Mobile-App, Preis-Kurzfassung, FAQ, Abschluss). Hier werden keine neuen Werte festgelegt; die
Umsetzung steht in `components/home/HomeHero.tsx` (+ `.module.css`), `app/page.tsx` und
`lib/home-content.ts`. Inhaberwunsch „viel strukturierter, viel schöner, wenig Text“: jeder Abschnitt ist
ein Kopf mit einem Satz plus genau ein Baustein; Fließtext, GoBD-Box, Ratgeber-Block, alte Preistabelle
und beide animierten Szenen sind entfallen (Inhalte bleiben auf `/gobd`, `/blog`, `/preise`, Hilfe).

1. **frontend-design:** Kein Skill-Werkzeug in dieser Sitzung. Gelesen (nicht kopiert):
   `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`
   (byte-identisch mit `054417d0fc68`, per `cmp` geprüft). Angewendet:
   - *Hero zeigt das Charakteristische:* die Produktdarstellung (Plantafel im Browser, Einsätze im Phone)
     statt Kennzahl-mit-Verlauf; der 72-px-Linienraster bleibt als Bauplan-Motiv, der Amber-Verlauf entfällt.
   - *Kühnheit an einer Stelle:* einzige vollflächige Amber-Fläche ist der Arbeitsablauf; alle übrigen
     Abschnitte wechseln ruhig zwischen Weiß und Warm.
   - *Struktur trägt Information:* Nummern nur in der echten Abfolge (`StepFlow`), Plattform-Badges nur aus
     `funktionen[].platforms`, keine Eyebrows, keine angehängten Pfeile an Textlinks.
   - *Bewegung nur als Antwort:* keine Einblendungen, keine Szenenanimation; einzige Bewegung bleiben
     Hover-Unterstrich, CTA-Anhebung und die FAQ-Plusdrehung.
2. **ui-ux-pro-max** (ausgeführt am 21.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "construction trades saas software homepage" --design-system -p "CraftOS"
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas landing page homepage sections bento key facts faq" --domain ux
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "above the fold hero cta layout shift" --domain ux
   ```
   Übernommen: Muster „Hero + Features + CTA, CTA above fold“, Content Jumping (High: Platz reservieren →
   statische Rahmen mit festen Seitenverhältnissen, CLS 0), Image Optimization (keine Rasterbilder im Hero).
   Verworfen: vorgeschlagener Stil Glassmorphism, Palette Blau/Orange und Plus Jakarta Sans – sie
   widersprechen den gesperrten Tokens aus 05-UI-SPEC (Clash Display/General Sans, Amber `#F2AF38`).
3. **21st.dev:** `21st_magic_component_inspiration` stand in dieser Sitzung **nicht** als Werkzeug zur
   Verfügung; es wurden keine Referenzen abgerufen oder behauptet, builder und refiner nicht verwendet.
4. **Context7:** MCP-Werkzeug nicht verfügbar, `ctx7`-CLI nicht installiert. Ersatz:
   `craftos/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
   („`title.template` defined in `layout.js` will not apply to a `title` defined in a `page.js` of the same
   route segment“) – deshalb trägt `/` den vollständigen Title „Handwerkersoftware für Büro und Baustelle |
   CraftOS“.

**SEO-Prüfung:** Title, H1 („Handwerkersoftware, die Büro und Baustelle verbindet“) und Description
(153 Zeichen) entsprechen der Keyword-Map (`tests/keyword-map.test.ts`, Fall „Phase-6-Seiten folgen den
Zielwerten“); FAQPage-JSON-LD enthält genau die fünf sichtbaren Fragen (dasselbe Array wie `FaqList`);
Organization/SoftwareApplication mit Netto-Preis kommen unverändert aus `app/layout.tsx`.

**Sichtprüfung (Playwright-Screenshots, nicht eingecheckt):** Ganzseite in Chromium und WebKit bei 360,
390, 768, 1024 und 1440 px sowie abschnittsweise. Befunde und Korrekturen:
- Der Lead auf der Amber-Fläche war `#62626E` (≈ 3,7:1), weil Tailwind-Utilities in `@layer utilities` gegen
  die unlayered CSS-Module verlieren; jetzt `#46381F` per unlayered Regel in `app/globals.css`.
- Die Amber-Bühne der `StepFlow` lag mit eigenem Innenabstand auf der Amber-Fläche, die Schritte rückten
  32 px aus der Flucht des Kopfs; auf der Startseite jetzt ohne Innenabstand.
- Der Browserrahmen der dunklen Bento-Kachel schrumpfte auf seine Mindestbreite (280 px) und schnitt die
  dritte Rechnungszeile ab; er füllt jetzt die Kachelbreite. (Die Musterseite `/styleguide` zeigt dasselbe
  Verhalten in Block 3; dort unverändert gelassen.)
- Hero-Lead mit `text-wrap: pretty` gegen einzelne Zeilenreste.

**Above-the-fold-Messung (E2E „Above the fold:“, Chromium, Unterkante in px):**

| Viewport | H1 | Lead | CTA | Produkt ab | Browser bis | Phone | Kennzeichnung bis |
|---|---|---|---|---|---|---|---|
| 360 × 640 | 191 | 279 | 351 | 435 | 629 | 565–903 | 930 |
| 390 × 844 | 191 | 279 | 351 | 435 | 647 | 583–921 | 949 |
| 768 × 1024 | 193 | 265 | 345 | 377 | 738 | 401–740 | 767 |
| 1024 × 768 | 285 | 385 | 465 | 139 | 349 | 163–501 | 529 |
| 1440 × 900 | 347 | 419 | 499 | 149 | 464 | 173–511 | 539 |

WebKit weicht um höchstens 23 px ab (Phone-Höhe), alle Kriterien erfüllt.

**Abweichungen (je ein Satz Begründung):**

| # | Abweichung | Begründung |
|---|---|---|
| H1 | Bei 390 px gilt 28 px statt 32 px für das H1 | Das UI-SPEC widerspricht sich („< 400 px: 28 px“ vs. „390 px nutzt 32 px“); umgesetzt ist die im Plan verbindlich genannte Grenze 400 px, die bei 390 px 10 px mehr Reserve für das ungetrennte Keyword lässt. |
| H2 | Abschnitt „Abschluss“ ist ein `div[data-home-section]` um das `CtaBand` | `CtaBand` rendert selbst die `section` mit `aria-labelledby`; eine zweite `section` darum würde verschachtelte Landmarken erzeugen. |
| H3 | Kennzahl „10 Tage“ mit geschütztem Leerzeichen | Wie auf der Musterseite, damit Zahl und Einheit in der Kennzahlen-Leiste nie umbrechen. |
