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
   keine Rasterbilder im Hero, aktiver Navigationszustand; ~~sichtbarer Breadcrumb verworfen, nur
   BreadcrumbList-Schema~~).
   **Hinweis 22.10.2026: Die Verwerfung sichtbarer Breadcrumbs ist aufgehoben durch Phase 8 (C1, D-22).**
   Sichtbare Brotkrumen stehen seit Plan 08-02 auf allen indexierten Seiten außer `/` (SEO-05, D-07);
   Baustein, Ketten und Kaskade siehe § 17.3.
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

## 15. Kaskade Funktionsübersicht (Plan 06-05, 21.10.2026)

Verbindlich sind 05-UI-SPEC und 06-UI-SPEC, Abschnitt „Seite 3: Funktionsübersicht `/funktionen`“. Umsetzung:
`components/funktionen/FunktionenHead.tsx` (+ `.module.css`), `app/funktionen/page.tsx`, `itemListSchema` in
`lib/schema.ts`. Einzige Datenquelle ist `getFunktionsgruppen()`; die Seite ist ein dunkler Seitenkopf mit
Sprungnavigation, sechs Gruppenabschnitte (Kopf → `FeatureCard`-Raster → `FeatureList` „Weitere Funktionen“)
und das `CtaBand`. `PageHero`, `TrialCta`, die Lizenz-Hinweisbox und `.feature-grid`/`.feature-link` sind entfallen.

1. **frontend-design:** Kein Skill-Werkzeug in dieser Sitzung; gelesen (nicht kopiert):
   `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`.
   Angewendet:
   - *Struktur trägt Information:* Eyebrow nur als Gruppenname (Arbeitsablauf-Stufe), Sprunglinks mit dem
     Gruppen-Icon aus dem Gruppenmodell, keine Nummern (die Gruppen sind Bereiche, keine Schrittfolge).
   - *Hierarchie statt Einheitskarten:* Detailfunktionen als Karten mit Bühne, Zusatzfunktionen bewusst als
     flache Liste ohne Karte und Schatten.
   - *Kühnheit an einer Stelle:* Der Seitenkopf trägt die einzige Amber-Linie (3 px Unterkante) über dem
     72-px-Linienraster der Startseite; die Gruppen wechseln ruhig zwischen Weiß und Warm.
   - *Bewegung nur als Antwort:* nur Rahmenfarbe beim Hover der Sprunglinks (150 ms, bei reduzierter Bewegung aus).
2. **ui-ux-pro-max** (ausgeführt am 21.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "construction trades saas feature overview page" --design-system -p "CraftOS"
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "feature overview grouped anchor jump navigation sticky header" --domain ux
   ```
   Übernommen: „Sticky Navigation – fixed nav should not obscure content“ (Anker-H2 mit `scroll-margin-top: 100px`,
   per Playwright geprüft: H2-Oberkante ≥ Header-Unterkante für alle sechs Sprunglinks und die Menü-Gruppenlinks).
   Verworfen: „Smooth Scroll“ (würde unter reduzierter Bewegung Animationen erzeugen; die Seite hat bewusst keine),
   Stil „Exaggerated Minimalism“, Palette Blau/Orange und Plus Jakarta Sans – sie widersprechen den gesperrten Tokens.
3. **21st.dev:** `21st_magic_component_inspiration` stand nicht als Werkzeug zur Verfügung; keine Referenzen
   abgerufen oder behauptet, builder und refiner nicht verwendet.
4. **Context7:** MCP-Werkzeug nicht verfügbar; Title-Template-Verhalten wie in §14 belegt (Seitenwert ohne Marke,
   das Layout-Template hängt „ | CraftOS“ an).

**SEO-Prüfung:** Title „Software für Handwerksbetriebe: alle Funktionen | CraftOS“ (gerendert), H1 „Alle Funktionen
der Software für Handwerksbetriebe“ (Keyword-Span `nowrap`), Description 148 Zeichen – alle gleich `keyword-map.json`
(`tests/keyword-map.test.ts`, PHASE6_SEITEN). JSON-LD: `BreadcrumbList` (Start → Funktionen) und `ItemList`
„Funktionen von CraftOS“ mit den 16 Detailseiten in Gruppenreihenfolge; Zusatzfunktionen ohne eigene URL fehlen bewusst.

**Sichtprüfung (Playwright-Ganzseiten-Screenshots, nicht eingecheckt):** `/funktionen` in Chromium und WebKit bei
360, 390, 768, 1024 und 1440 px; kein horizontaler Scroll, Keyword in einer Zeile. Keine Korrekturen an der
Übersicht nötig. Bento-Kacheln der Startseite (Befund aus §14) im Baustein behoben:
- Große Kachel (`lg`) mit Browserrahmen: Der Rahmen füllt die Kachelbreite und wächst mit der freien Höhe der über
  zwei Zeilen gestreckten Kachel (mindestens 16:10); der Text sitzt am Kachelboden, kein leerer Streifen mehr. Das
  behebt auch den zu schmalen Rahmen in der dunklen Kachel auf `/styleguide`.
- Breite Kachel mit Visual am Ende: Gerät mittig in seiner Spalte statt am rechten Rand.

**Abweichungen:**

| # | Abweichung | Begründung |
|---|---|---|
| F1 | Raster und `FeatureList` stehen im selben Gruppenabschnitt (A6) | Eine Gruppe ist ein Anker und eine Landmarke; getrennte Abschnitte würden die Zwei-Klick-Zuordnung verdoppeln. |
| F2 | H1 des Seitenkopfs mit `max-width: 20ch` | Hält die H1 bei 1440 px auf zwei Zeilen mit dem Keyword in der zweiten Zeile, statt einer überlangen ersten Zeile. |

## 16. Kaskade Funktionsdetailseiten und /app (§ 16, Plan 07-04, 21.10.2026)

Verbindlich sind 05-UI-SPEC, 06-UI-SPEC und 07-UI-SPEC („Vorlage Detailseite“, F1–F5, Abweichungen B1–B10).
Umsetzung in Plan 07-04 (die Route `/funktionen/[slug]` wird erst in 07-06 umgestellt, `/app` in 07-07):

- `lib/funktionsdetails/types.ts` und `lib/funktionsdetails/index.ts` (server-only): Inhaltstypen, Builder
  `buildFunktionsdetail` mit den 07-UI-SPEC-Fehlertexten, `zielwerte(path)` aus `keyword-map.json`,
  `getFunktionsdetailAus`/`getFunktionsdetail`, `INHALTE` (bis 07-05/07-06 leer), `SNIPPET_VARIANTE` (D-19),
  `ERLAUBTE_ANORDNUNGEN`, `VERWANDT_KOPF`, `CTA_DETAIL`.
- `components/funktionen/FunktionsKopf.tsx` (+ `.module.css`, F1), `components/funktionen/PlattformRollen.tsx`
  (+ `.module.css`, F2), `components/funktionen/FunktionsDetail.tsx` (synchrone Server Component der Vorlage).
- `components/v2/BentoGrid.tsx`: `BentoTile` mit optionalem `zusatz` → `data-zusatz` (Muster `data-linked`).
- `components/feature-snippet/FeatureSnippet.tsx`: optionales `headingLevel` (Standard 2 wie bisher); die
  Detailvorlage rendert die Snippet-Überschrift als h3, damit der Ablauf-Abschnitt genau eine H2 behält.

1. **frontend-design:** Kein Skill-Werkzeug in dieser Sitzung; gelesen (nicht kopiert):
   `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`
   (per `cmp` byte-identisch mit den neun weiteren Cache-Ständen, darunter `a0b04d9ddcca`). Angewendet:
   - *Mit dem Charakteristischsten öffnen:* Der Kopf zeigt die vereinfachte Oberfläche der Funktion selbst
     (Browser, Phone oder Paar aus `kopfVisuals`), kein Kennzahlen-Hero und kein generisches Icon.
   - *Kühnheit an einer Stelle:* einziges markantes Element je Seite ist der Geräterahmen im dunklen Kopf mit
     3-px-Amber-Unterkante; das 72-px-Linienraster bleibt der Startseite vorbehalten; Ablauf `tone="light"`,
     Panels und Kacheln flach ohne Schatten.
   - *Struktur trägt Information:* Eyebrow nur im Kopf (echter Gruppenname), Abschnittsköpfe ohne Eyebrow;
     Nummern nur im StepFlow (echte Abfolge); Rollen als Textliste mit dekorativem Personen-Icon, nicht als Badges.
   - *Ein orchestrierter Moment:* höchstens ein animiertes Element je Seite (`FeatureSnippet`, nur 8 Seiten).
   - *Texte aus Nutzersicht:* CTA überall „{trialDays} Tage kostenlos testen“, Sekundärlink nur in zwei festen
     Formulierungen; Fehlertexte nennen Problem und Abhilfe.
2. **ui-ux-pro-max** (ausgeführt am 21.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas feature detail page product tour" --domain ux
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "role permissions panel list cards" --domain ux
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "text truncation overflow card content" --domain ux
   ```
   - „Image Optimization“ (High): übernommen – im Kopf keine Rasterbilder, die Produktoberfläche ist Code-UI;
     QR-Codes als SVG mit `width`/`height` 96 (CLS 0).
   - „Active State“ (Medium): bereits erfüllt durch die Navigation aus Phase 6 (Bereich „Funktionen“).
   - „role permissions panel“: keine Treffer; Vertrag ausschließlich aus 07-UI-SPEC Abschnitt 3.
   - „Overflow Hidden – Test all content fits within containers“ (Medium): übernommen für die Kartenrahmen auf
     `/funktionen` (Befund aus 07-03, Abschnitt „Kartenrahmen“ unten); „Truncate with ellipsis and expand option“
     verworfen – die Mini-UI ist Illustration (aria-hidden, inert), ein Aufklapp-Element wäre neue Client-Interaktion (D-15).
3. **21st.dev:** `21st_magic_component_inspiration` stand in dieser Sitzung nicht als Werkzeug zur Verfügung;
   keine Referenzen abgerufen oder behauptet, builder und refiner nicht verwendet.
4. **Context7:** weder MCP-Werkzeug noch `ctx7`-CLI verfügbar. Ersatz: `craftos/node_modules/next/dist/docs`
   (Title-Template, `params` als Promise) – für 07-04 keine neue API-Frage; `next/image` mit SVG-Quelle wie im
   Bestand `app/app/page.tsx`.
5. **SEO-Check:** H1 = `target.h1` aus `keyword-map.json` (der Builder wirft, wenn das Kopfwort fehlt), Kopfwort im
   `nowrap`-Span, genau eine H1; je Abschnitt höchstens eine H2; JSON-LD `BreadcrumbList` (Start → Funktionen →
   Name), `FAQPage` aus demselben Array wie die sichtbare `FaqList`, `WebPage` mit `@id …/funktionen/{slug}#webpage`;
   kein `HowTo`, kein `Organization`/`SoftwareApplication` im Seiten-HTML (kommen aus dem Layout).

**Neue Bausteine F1–F5:**

| # | Baustein | Stand |
|---|---|---|
| F1 | `FunktionsKopf` | Eyebrow, Keyword-H1, Kurznutzen (1 Satz ≤ 110), CTA + Sekundärlink, Kopf-Visual (Browser volle Spaltenbreite bzw. max. 640 px ab 768 px, Phone 240 zentriert, Paar `DevicePair compact`); `/app`-Variante mit `StoreLinks` 24 px unter dem CTA und QR-Codes 96 × 96 ab 1024 px; Budgets und Kopfwort beim Rendern geprüft. |
| F2 | `PlattformRollen` | `article` je belegter Plattform (Weiß, 1 px ink-200, Radius 16, Innenabstand 16/24), Icon-Feld 48 × 48, `PlatformBadge`, h3 „Im Büro“/„Auf der Baustelle“, `<ul aria-label="Rollen">`, Satz, Lizenzgruppe „Enthalten in“; Raster 1/2 Spalten, Web-only ab 1024 px eine Spalte (50 %). |
| F3 | `MiniStatusName` + Tonklassen | in 07-01 umgesetzt. |
| F4 | `TEXT_BUDGET.pageHead` + `count.detailSteps`/`count.related` | in 07-01 umgesetzt; Builder und FunktionsKopf nutzen sie. |
| F5 | `ZusatzZiel.kind` „seite“ | in 07-02 umgesetzt. |

**Abweichungen B1–B10 (aus 07-UI-SPEC, hier umgesetzt bzw. vorbereitet):**

| # | Abweichung | Begründung / Stand |
|---|---|---|
| B1 | H1 jedes `FunktionsKopf` unter 400 px 28 px | Gemessen „Eingangsrechnungen“ 328,0 px und „Auftragsverwaltung:“ 324,6 px bei 32 px gegen 324-px-Container; umgesetzt in `FunktionsKopf.module.css`. |
| B2 | Rollen als Textliste mit den fünf Release-Presets und „Kunde“ | D-02 (3); als Badge sprengten sie das 16-Zeichen-Budget; der Builder prüft jeden Namen gegen `RolleName`. |
| B3 | „Arbeitsabschnitte“ statt „Bauphasen“ | D-20; der Builder sperrt „Bauphase“ in allen Textfeldern außer der H1. |
| B4 | `ZusatzZiel.kind` „seite“ | D-21; 07-02. |
| B5 | Abschnittsfolge Kopf → Ablauf → Rollen → Kernpunkte → FAQ → Verwandt → CTA | D-02/D-09; kein Baustein zweimal hintereinander; `FunktionsDetail` rendert genau diese Folge. |
| B6 | KeyFacts-Wert „Offline“ mit Pflicht-Einschränkung | D-09/D-23; folgt in 07-07 (`/app`). |
| B7 | `FeatureSnippet` bleibt auf 8 Detailseiten im Ablauf | D-19; `SNIPPET_VARIANTE`, `figure data-figure="snippet"` mit Kennzeichnung, Überschrift als h3. |
| B8 | QR-Codes ab 1024 px | `hidden lg:flex` im FunktionsKopf; zwischen 768 und 1023 px würde der QR-Block das Phone unter die Falz schieben. |
| B9 | sechs H1-Zielwerte und eine Description in `keyword-map.json` | D-22, F4, Pitfall 8; in 07-02 umgesetzt. |
| B10 | Große Kachel mit Phone ab 1024 px: Phone-Breite folgt der freien Kachelhöhe (160–320 px), ab Seitenverhältnis 4:5 Phone und Text nebeneinander, sonst Phone über dem Text | Nachtrag 07-08. Vorher (Playwright, Chromium/WebKit, 1024/1440): /app 171–220 px Leerraum in den lg-Kacheln, lager bis 104 px und baudokumentation bis 81 px in den Nachbarkacheln. Umsetzung in `BentoGrid.module.css`: Das Listenelement der lg-Kachel ist ein size-Container (Mindesthöhe 450 px) und gibt die Rasterzeilen nicht mehr vor; das Visual ist ein zweiter size-Container, aus dessen Höhe `--phone-w` berechnet wird (abzüglich 44 px bzw. nebeneinander 64 px für die Kennzeichnung). Ist das Phone schmaler als 194 px, gilt der Titel des 160-px-Phones (12 px, 8 px Innenabstand; Haken `data-phone-title` in `PhoneFrame`). Nachher höchstens 25 px in den betroffenen Rastern bei 768, 1024 und 1440 px, Phones 161–297 px, kein Rahmen abgeschnitten, kein gekürzter Text; E2E „Detailseite: große Kacheln mit Phone ohne Leerstreifen (B10)“ prüft höchstens 48 px. Unter 1024 px unverändert. |

**D-13:** `data-source` und `data-evidence` tragen auf öffentlichen Seiten nur Kurzformen (`site:…`/`register:…`
bzw. `web:…`/`app:…`); die inhaltlich gleiche Prüfung gegen Register und Release läuft in Vitest über die vollen
Belege in `lib/scenes.ts` und `lib/product-register.ts`.

**D-19:** `FeatureSnippet` erscheint nur auf `dashboard`, `angebote`, `plantafel`, `rechnungen`,
`eingangsrechnungen`, `zeiterfassung`, `lager` und `aufmass` (Varianten `dashboard`, `angebot`, `planung`,
`rechnung`, `beleg`, `zeit`, `lager`, `aufmass`); alle übrigen Seiten zeigen nur statische v2-Szenen.

**Kartenrahmen auf `/funktionen` (Befund 07-03, behoben in 07-04):** Der Browser-Rahmen der `FeatureCard` ist in
allen Breiten 280 × 175 px (Mindestbreite) und bietet Platz für genau zwei Mini-UI-Zeilen; bei vier Zeilen war die
dritte angeschnitten und die vierte verdeckt (Angebot, Kundenportal, Buchhaltung, Kalkulation, Mahnwesen,
Mitarbeiter, Lager, Rechnungen u. a.). Lösung im Baustein, ohne die Kopf-Visuals auszudünnen: `Frame karte` rendert
bei Browser-Szenen nur die ersten `KARTEN_ZEILEN` (2) Zeilen; das Kopf-Visual der Detailseite zeigt weiter alle.
Zwischen 1024 und 1119 px (Dreispaltenraster, Bühne < 324 px) bricht die Kennzeichnung zweizeilig um und überdeckt
den Rahmenboden; dort blendet `FeatureCard.module.css` alles ab Zeile 2 aus. Die figure behält ihre Rahmenbreite,
damit der Rahmen bei schmaler Bühne mittig in den Innenabstand ragt statt rechts abgeschnitten zu werden.
Bankabgleich führt beide Status in den ersten zwei Zeilen. Gemessen (Playwright, Chromium) bei 360, 390, 768, 1024,
1100, 1120 und 1440 px: keine angeschnittene oder verdeckte Zeile in Browser-Karten; E2E-Fall in
`tests/e2e/home-navigation.pw.cjs`. Phone-Karten bleiben unverändert: Das Gerät ist dort bewusst unten
angeschnitten (06-UI-SPEC, Kennzeichnungsleiste an der Bühnenunterkante).

**Hinweis für 07-05:** Die Kacheltabelle für `angebote` im 07-UI-SPEC enthält keine Grenze-Kachel, obwohl
`funktionen.ts` eine Einschränkung nennt (keine pauschale DATANORM-v5-Zusage). Der Builder verlangt genau eine
Grenze-Kachel (D-04); das Inhaltsmodul muss daher eine Kachel als Grenze führen.

**Vermerk Phase 10:** `components/product-demo`, `MobileAppGallery` und die zwei übersprungenen Specs bleiben
unverändert bis zur Inhaberfreigabe; `FunktionsDetail` importiert `components/product-demo` nicht.

## 17. Phase 8 (Plan 08-01, 22.10.2026)

Kaskade Phase 8: siehe 08-02 und 08-03.

### 17.1 Anker-Konvention für Frage-Überschriften

Verbindlich ab Plan 08-01 für alle Seitenpläne; Grundlage für die Prompt-Ziele in `docs/seo/ai-prompts-targets.json` (08 D-10) und die Antwort-zuerst-Regel (08-UI-SPEC § 2). Geprüft wird sie vom Post-Build-Audit `node scripts/seo-audit.mjs` (Regeln `antwort` und `prompts`, Prüffunktion `anchorAnswer` in `scripts/lib/seo-audit-core.mjs`).

1. **Kopf-Antwort:** `<p id="antwort" data-answer>` steht direkt nach der H1 (Prompt-Ziel `#antwort`), höchstens 300 Zeichen, 1–2 Sätze.
2. **Phase-8-Abschnitte:** `section data-abschnitt={id} aria-labelledby={id}`; die Abschnitts-H2 trägt `id={id}` **ohne** Suffix (z. B. `app-lizenz`, `was-ist-craftos`, `was-kostet-handwerkersoftware`). `scroll-margin-top: 100px` aus `SectionHeader` bleibt.
3. **Bestandsseiten der Phasen 6/7** behalten `{id}-titel`; ihre Prompt-Ziele nutzen die vorhandene id (z. B. `/funktionen/zeiterfassung#faq-titel`, `/#faq-titel`, `/app#faq-titel`). Fehlt einer Bestandsseite eine passende id, wird sie am bestehenden Abschnitts-Wrapper ergänzt, ohne sichtbare Änderung.
4. **Prüfregel `anchorAnswer`:** Anker an `<p>` → dessen Text ≤ 300 Zeichen; Anker an einer Frage-H2 (Text mit „?“) → das erste folgende `<p>` vor der nächsten Überschrift ≤ 300 Zeichen; Anker an einer FAQ-H2 (ohne „?“) → alle `summary`-Fragen bis zur nächsten H2 erfüllen die Antwortregel; Anker an einem Wrapper → die erste H2/H3 darin wird wie oben geprüft.

Fehlertexte (08-UI-SPEC „Copywriting Contract“): „Antwort zuerst: Frage ‚{q}‘ auf {path} hat keine Antwort ≤ 300 Zeichen direkt darunter – ersten Absatz kürzen oder vorziehen.“; für Prompt-Ziele „Prompt-Ziel {target} fehlt im Build“ bzw. „Prompt-Ziel {target}: Anker #{id} fehlt – id laut DESIGN-V2.md § 17 ergänzen.“

### 17.2 Prüfinfrastruktur (Stand 08-01)

- `scripts/seo-audit.mjs [--only=<regel,…>] [--paths=<pfad,…>] [--report]` prüft jede Sitemap-URL im gebauten HTML (`.next/server/app`): `title`, `description`, `h1`, `duplikate`, `keyword`, `map`, `breadcrumbs`, `og`, `faq-schema`, `schema`, `antwort`, `prompts`. Ergebnis immer in `test-results/seo-audit.json` (inklusive Ist-Werte je Pfad).
- KeyFacts akzeptiert zusätzlich die Quellen-Kurzform `wettbewerber:<schlüssel>` für belegte Wettbewerberwerte; CraftOS-Werte bleiben `site:`/`register:`.
- Metadaten neuer und umgebauter Seiten über `metaFor(path)` aus `lib/seo-meta.ts` (Quelle `docs/seo/keyword-map.json`); H1 aus `zielwerte(path).h1`.

### 17.3 Brotkrumen (G6, Plan 08-02, 22.10.2026)

Abweichung **C1** zu § 12: Sichtbare Brotkrumen auf allen indexierten Seiten außer `/` (D-07, D-22, SEO-05). Verbindlich ist 08-UI-SPEC § 1 mit den Farben „Brotkrumen-Farben“ und den Abständen „Kopf mit Brotkrumen“; C10 (Rechner: `aria-label="Brotkrumen"`, Glied „Start“) und C11 (Ratgeber/Hilfe: Rücklink entfällt) sind umgesetzt.

**Kaskade:**

1. **frontend-design** (Leitlinie read-only gelesen, nichts kopiert): Strukturmittel tragen Information – die Brotkrumen sind eine dezente Ortsangabe in Label-Größe, kein Schmuck; kein Amber, keine Pillen oder Hintergründe, damit Eyebrow und H1 die Hierarchie behalten. Gestaltung aus dem Bestand abgeleitet (Unterstrich wie Textlinks, Fokusfarbe [05]).
2. **ui-ux-pro-max** (ausgeführt am 22.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "breadcrumb navigation seo" --domain ux
   ```
   Treffer: Sticky Navigation (Medium) – übernommen (Brotkrumen liegen im Seitenkopf unter dem Header, Anker behalten `scroll-margin-top`); **Breadcrumbs (Low): „Use for sites with 3+ levels of depth / Don't use for flat single-level sites“ – bewusst überstimmt**, weil D-07/D-22/SEO-05 sichtbare Brotkrumen auch auf Ebene 2 (`Start › Preise`) verlangen; genau dieser Treffer war die Grundlage der früheren Verwerfung in § 12. Back Button (High, mobil) – übernommen: Brotkrumen sind normale Links ohne `pushState`.
3. **21st.dev:** `21st_magic_component_inspiration` („breadcrumb“) stand in dieser Sitzung **nicht** als Werkzeug zur Verfügung; keine Referenzen abgerufen oder behauptet, builder/refiner nicht verwendet.
4. **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs` (`next/link` in Server Components). Keine offenen API-Fragen.

**Baustein und Quelle:**

- `lib/breadcrumbs.ts` – `crumbsFor(path, current?)` ist die einzige Kettenquelle (feste Tabelle für statische Pfade, Namen aus `lib/funktionen.ts`, `lib/gewerke.ts`, Kategorien aus `lib/content-types.ts`; Artikeltitel als `current`). Unbekannter Pfad → „Breadcrumbs: Pfad {path} hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.“; 1 oder ≥ 5 Glieder → „Breadcrumbs: {n} Glieder – 2 bis 4 erlaubt.“
- `components/v2/Breadcrumbs.tsx` (Server Component, kein Client-JS): `nav[aria-label="Brotkrumen"][data-tone]` › `ol` › `li`; Zwischenglieder `next/link` (Budget `crumb.name` ≤ 32), letztes Glied `span[aria-current="page"]`, Trenner `ChevronRight` 16 px `aria-hidden`, 8 px je Seite. `<ol>` und Links mindestens 44 px hoch, „Start“ mindestens 44 × 44 px. Unter 768 px eine Zeile, nur das letzte Glied mit Ellipse (voller Text bleibt im DOM und im Schema). Fokus `3px solid #BB7609`, Offset 4 px; Hover nur unter `@media (hover: hover)`.
- **Genau eine BreadcrumbList je Seite** entsteht im Baustein (`breadcrumbSchema(items)`); die neun früheren Stellen (FunktionsDetail, `/app`, `/funktionen`, Gewerke-Detail, ArticlePage, ContentIndex, beide Rechner-`@graph`, `/vergleich`-`@graph`) sind entfernt. `/styleguide` zeigt den Baustein nur als Muster mit `schema={false}`.
- **Position:** erste Zeile im Seitenkopf – dunkel in `FunktionsKopf` (Prop `crumbs`, optional `crumbsSchema`), `FunktionenHead` und `PageHero` (Prop `crumbs`); hell in `ArticlePage`, `CalculatorPage` und `LegalShell` (Rechtsseiten: erste Zeile des ersten Inhaltscontainers, Rechtstext unverändert). Abstände: oben 8/16/24 px, zur Eyebrow/H1 16/24/32 px (< 768 / 768–1023 / ≥ 1024).
- **Ketten für Artikel:** `Start › Ratgeber|Hilfe › {Artikeltitel}` (3 Glieder laut UI-SPEC-Tabelle); die frühere Schema-Zwischenstufe „Kategorie“ entfällt, die Kategorie steht weiter als Eyebrow über der H1.
- Geprüft durch `tests/breadcrumbs.test.ts` (Ketten aller Sitemap-Pfade, Markup, Schema-Gleichheit) und die Audit-Regel `node scripts/seo-audit.mjs --only=breadcrumbs` (sitewide streng).

### 17.4 Bausteinergänzungen G1–G5 (Plan 08-03, 22.10.2026)

Abweichungen **C2–C5** zu [05]/[07] laut 08-UI-SPEC „Ergänzungen“; alle Bausteine bleiben Server Components ohne Client-JavaScript, Farben, Abstände und Schriftgrößen ausschließlich aus den Tokens der UI-SPEC (keine neue Schriftgröße). Budgets in `components/v2/budgets.ts` (Phase-8-Felder seit 08-02).

**Kaskade:**

1. **frontend-design** (Leitlinie read-only gelesen, nichts kopiert): „Visual structure is information“ – die Panels, Quellenliste und Faktenliste tragen Struktur nur über Linien, Überschriften und Reihenfolge; keine Einzelwort-Hervorhebung, keine Großbuchstaben-Labels, kein „Empfohlen“. Beide Passt-Panels bewusst identisch, damit die Form keine Wertung transportiert.
2. **ui-ux-pro-max** (ausgeführt am 22.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas comparison alternative page pricing" --domain ux
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "comparison table pricing faq" --domain landing
   ```
   `ux`: Image Optimization (High) – nicht betroffen (die neuen Bausteine haben keine Bilder); Active State (Medium) – nicht betroffen. `landing`: „Comparison Table + CTA“ – Reihenfolge Kopf → Tabelle → … → CTA übernommen (Vorlage 08-UI-SPEC § 3.1); **Farbstrategie „Highlight your product row (light yellow/green)“ und „Recommend plan / most popular badge“ bewusst überstimmt**: keine Amber/Grün/Rot-Zellen und keine Empfehlungsmarke (D-02, UWG § 6, C5 – Marktübersichten ganz ohne Hervorhebung). „Pricing Page + CTA“: FAQ nach der Tabelle übernommen (C3 `answerMax`).
3. **21st.dev:** `21st_magic_component_inspiration` („comparison table competitor“, „pricing table answer“) stand in dieser Sitzung **nicht** als Werkzeug zur Verfügung; nichts abgerufen oder behauptet, builder/refiner nicht verwendet.
4. **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs`. Keine offenen API-Fragen (nur Server Components, `next/link` unverändert).

| # | Baustein | Zweck | Budget / Regel | Fundstelle |
|---|---|---|---|---|
| G1 | `FunktionsKopf` | Kopf ohne Visual (einspaltig, Textspalte ≤ 800 px, Kopf unten 48/64/64 px), Antwortsatz `<p id="antwort" data-answer>` direkt nach der H1 (16/400 < 768, 20/400 ≥ 768, `#F4F4F5`, max. 60ch), Stand-Zeile 14/400 `#BCBCC6` 8 px darunter, Stand → CTA 24 px | `answer` ≤ `TEXT_BUDGET.answer` (300), 1–2 Sätze; `lead` und `answer` gleichzeitig → „FunktionsKopf: lead und answer gleichzeitig gesetzt – nur answer verwenden.“; ohne beides → Fehler; Bestandsköpfe (Visual + Lead ≤ 110) unverändert | `components/funktionen/FunktionsKopf.tsx` (`data-layout="einspaltig"`, `data-stand`) |
| G2 | `SectionHeader` | Frage-Titel (endet auf „?“) → Lead ist die Antwort mit `data-answer`, `id` an der H2 (§ 17.1) | Frage: `sectionHeader.answerLead` ≤ 300, 1–2 Sätze; sonst ≤ 140 und genau 1 Satz (jetzt technisch erzwungen) | `components/v2/SectionHeader.tsx` |
| C3 | `FaqList` | `answerMax={300}` auf zentralen Seiten | zusätzlich `faq.answerCentral` ≤ 300; ohne Prop bleibt 600; Markup unverändert | `components/v2/FaqList.tsx` |
| G3 | `ComparisonTable` | Quellenliste `<ol aria-label="Quellen zur Tabelle">` 16 px unter der Note, nach Anbieter gruppiert, Einträge „{Anbieter}: {Label}, abgerufen am {TT.MM.JJJJ}“ (8 px Abstand, 14/400 ink-500, Links unterstrichen, `rel="nofollow"`, gleicher Tab); Disclaimer-Zeile darunter (`data-disclaimer`) | nur `https://`-Quellen (T-08-07), Abrufdatum ISO; Zellbudget 24 und `CellValue` unverändert; `highlight` optional (Marktübersicht ohne) | `components/v2/ComparisonTable.tsx` |
| G4 | `FitPanels` (neu) | zwei gleichrangige Panels „Wann {Anbieter} passt“ / „Wann CraftOS passt“ als zwei `article` in einer Liste; ≥ 768 px zwei gleich breite Spalten (24), darunter gestapelt (16); Weiß auf Warmfläche, 1 px `#E7DCC9`, Radius 16, Innenabstand 24/16; h3 20/600; Punkte 16/400 mit `Check` 16 px; Link „Quelle“ 14/400 ink-500 `rel="nofollow"` (sr-only Zusatz mit dem Quellen-Label) | `fitPanel.title` ≤ 40, `fitPanel.point` ≤ 100 und genau 1 Satz, 2–4 Punkte („FitPanels: Panel {titel} hat {n} Punkte – 2 bis 4 erforderlich.“); Quellenpflicht für Panel 1 (Standard, `/gobd` setzt `quellenPflicht={false}`): „FitPanels: Wettbewerberpunkt ‚{text}‘ ohne Quelle – im Datenmodul ergänzen.“ | `components/v2/FitPanels.tsx` |
| G5 | `FactList` (neu) | Begriff-/Definitionsliste `<dl>` mit je einem `div` pro Paar; Begriff 16/600, Definition 16/400; < 768 px untereinander (4 px), ≥ 768 px zwei Spalten 1 : 2 (Lücke 24); Zeilen 16 px Innenabstand mit 1-px-Linien `#E7DCC9`; optionale Label-Zeile | `factList.term` ≤ 32, `factList.definition` ≤ 200 und höchstens 2 Sätze, 6–12 Einträge („FactList: mindestens 6 Einträge erforderlich – Inhalte in lib/… ergänzen.“) | `components/v2/FactList.tsx` |

**Musterseite:** `/styleguide` zeigt in Block 0 einen `FunktionsKopf` ohne Visual mit Antwort und Stand (ersetzt den bisherigen `PageHero`-Kopf; Brotkrumen weiterhin mit `crumbsSchema={false}`, genau eine H1), im Block ComparisonTable zusätzlich eine Marktübersicht mit Quellen und Disclaimer sowie die neuen Blöcke FitPanels (Warmfläche) und FactList zwischen Badges und FaqList. Vergleichsmuster nutzen ausschließlich neutrale Beispieldaten („Anbieter A/B“, `https://example.com/…`); Werte der FactList kommen aus `lib/site.ts` und dem Produktregister.

**Prüfung:** `tests/funktionskopf.test.ts`, `tests/design-v2-components.test.ts`, `tests/design-v2-budgets.test.ts` (Sammeltest: Startseite, `/app`, `/funktionen` und 22 Detailseiten erfüllen die Antwort-zuerst-Regeln), `tests/styleguide.test.ts`.

### 17.5 Preisseite `/preise` answer-first (Plan 08-07, 22.10.2026)

Umsetzung von 08-UI-SPEC § 4 ausschließlich mit v2-Bausteinen: `FunktionsKopf` ohne Visual (Antwortsatz `#antwort`, Stand-Zeile, CTA, Sekundärlink „Lizenzen vergleichen“ → `#lizenzen`), `ComparisonTable` Lizenzen (Voll-Lizenz `highlight`, 12 Zeilen), `BentoGrid` App-Lizenz (vier belegte `/app`-Kacheln, Raster lg, sm, sm, md wie `/app`; Kacheln weiß auf Warmfläche, die Zeitkachel bleibt dunkel; „Aufmaß vor Ort“ als kleine Kachel mit Icon `Ruler`, Text unverändert), `KeyFacts` Zusatzkosten (nur `site:`-Quellen), `ComparisonTable` Marktspanne **ohne** Hervorhebung (C5) mit Quellenliste und Disclaimer, `FaqList answerMax={300}` und `CtaBand`. Flächen Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel; Abschnitte nach § 17.1 (`data-abschnitt` = `aria-labelledby` = H2-`id`). `PageHero`, `PricingTable` (gelöscht), `components/ui/Faq` und `TrialCta` sind nicht mehr eingebunden. Inhalte: `lib/seiten/preise.ts`.

**Kaskade:**

1. **frontend-design** (Leitlinie read-only gelesen, nichts kopiert): Die Seite beantwortet die Preisfrage im ersten Absatz; Struktur über Tabellen und Reihenfolge, keine Preis-Karten mit Schatten, kein Umschalter, keine Empfehlungsmarke in der Marktspanne.
2. **ui-ux-pro-max** (ausgeführt am 22.10.2026, lokal): `search.py "pricing page answer table saas" --domain ux` → „Table Handling“ (horizontales Scrollen statt Überlauf) übernommen – beide Tabellen scrollen unter 768 px im eigenen Bereich; „Image Optimization“ nicht betroffen (nur Phone-Szenen aus `/app`); „Active State“ nicht betroffen.
3. **21st.dev:** `21st_magic_component_inspiration` („pricing table answer“) stand in dieser Sitzung nicht als Werkzeug zur Verfügung; nichts abgerufen, builder/refiner nicht verwendet.
4. **Context7:** nicht verfügbar; keine offenen API-Fragen (Server Component, `metaFor`, JSON-LD über `JsonLd`).
5. **SEO-Check:** genau eine H1 (Keyword-Map), BreadcrumbList, FAQPage aus dem sichtbaren Array, WebPage; `seo-audit --paths=/preise` mit allen Regeln ohne Verstoß.

**Sichtprüfung** (`scripts/visual-audit.mjs`, Chromium und WebKit 360–1440): Antwort und CTA bei 360 × 640 ohne Scrollen sichtbar, Tabellen scrollen nur im eigenen Bereich, Quellenliste lesbar; kein Überlauf, keine JS-Fehler, keine axe-Befunde.

**Begriff:** sitewide „Extra-Speicher“ (PROD-03); die UI-SPEC-Stellen mit „Zusatzspeicher“ sind so umgesetzt.

### 17.6 Alternativen-Vorlage (Plan 08-08, 22.10.2026)

Vorlage `components/vergleich/AlternativePage.tsx` nach 08-UI-SPEC § 3.1 (C8) für `/vergleich/plancraft-alternative` und `/vergleich/craftnote-alternative`; HERO und ToolTime folgen mit derselben Vorlage (08-09). Keine neuen Bausteine, keine neuen Tokens, keine Client-Insel.

**Kaskade:**

1. **frontend-design** (Leitlinie read-only gelesen, nichts kopiert): „Spend your boldness in one place“ – der einzige betonte Ort ist die hervorgehobene CraftOS-Spalte der Vergleichstabelle (Amber-Oberkante, Punkt 4 der Amber-Liste); alles andere bleibt im ruhigen Flächenrhythmus Weiß/Warm. „Visual structure is information“ – Quellenliste, Stand-Zeile und Disclaimer sind Inhalt (Belege), keine Dekoration; keine Logos, keine Einzelwort-Hervorhebung außer dem Kopfwort-Span.
2. **ui-ux-pro-max** (ausgeführt am 22.10.2026, lokal):
   ```
   py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas comparison alternative page pricing" --domain ux
   ```
   Ergebnis: Image Optimization (High) – nicht betroffen, die Seiten enthalten kein Bild (Test: kein `<img`); Active State (Medium) – erfüllt über das aktuelle Brotkrumen-Glied (`aria-current`, 600).
3. **21st.dev:** `21st_magic_component_inspiration` („comparison table competitor“) stand in dieser Sitzung nicht als Werkzeug zur Verfügung; nichts abgerufen.
4. **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs`. Keine offenen API-Fragen (statische Route mit `export const metadata`, `opengraph-image.tsx` nach dem Muster aus 08-05).

**Aufbau:** Kopf (`FunktionsKopf` ohne Visual: Brotkrumen, Eyebrow „Vergleich“, H1 aus der Keyword-Map mit Kopfwort-Span, `#antwort`, Stand-Zeile, CTA + „Zur Vergleichstabelle“) → `vergleich` (Weiß, `ComparisonTable` mit CraftOS-`highlight`, Quellenliste, Disclaimer) → `kosten` (Warm, Frage-H2 + `KeyFacts` 4 mit Rechenweg-Note) → `fuer-wen` (Weiß, Frage-H2 + `FitPanels`, Wettbewerber zuerst) → `umstieg` (Warm, Frage-H2 + `StepFlow tone="light"` + Textlink „Mehr zur Datenübernahme“) → `faq` (Weiß, `FaqList answerMax={300}` + FAQPage aus demselben Array) → `CtaBand`. Abschnitte als `section data-abschnitt={id} aria-labelledby={id}`, H2-`id` = Abschnitts-id (§ 17.1).

**Inhalte und Prüfung:** Texte aus `lib/seiten/alternativen/{plancraft,craftnote}.ts`, Zahlen nur per Vorlage (CraftOS aus `lib/site.ts`, Wettbewerber aus `lib/wettbewerber/*`). Der Builder `baueAlternative` (`lib/seiten/alternativen/index.ts`) wirft bei Zellen > 24, mehr als 12 Zeilen, Zeilen ohne Quelle, UWG-Wort, weniger als 2 Stärken, fehlender Fairnesszeile und Antworten > 300. Tests: `tests/vergleich-seiten.test.ts`, `tests/design-v2-budgets.test.ts` (Sammeltest 27 Seiten), `tests/keyword-map.test.ts`, `tests/pricing-parity.test.ts`.

### 17.12 Kernseiten Fakten, Craft AI, GoBD (Plan 08-12, 22.10.2026)

`/fakten-ueber-craftos`, `/craft-ai` und `/gobd` sind nach 08-UI-SPEC §§ 5.2–5.4 aus v2-Bausteinen aufgebaut (D-12): Kopf `FunktionsKopf` G1 ohne Visual mit Brotkrumen, Lead ≤ 110 und Sekundärlink; Abschnitte `section data-abschnitt={id} aria-labelledby={id}` mit H2-`id` = Abschnitts-id (§ 17.1), Flächen Weiß/Warm abwechselnd, `CtaBand` mit dem Standardtext der Detailseiten (`CTA_DETAIL`). Inhalte stehen in `lib/seiten/{fakten,craft-ai,gobd}.ts`; Preise, Credits, Testtage und Sprachenzahl nur per Vorlage aus `lib/site.ts` und dem Produktregister. JSON-LD je Seite: BreadcrumbList (Kopf), FAQPage aus demselben Array wie die sichtbare `FaqList answerMax={300}`, WebPage (Fakten mit `about` → `#organization`, D-25). `PageHero`, `TrialCta` und `components/ui/Faq` entfallen auf diesen Seiten.

**Kaskade:**

1. **frontend-design** (Leitlinie read-only gelesen, nichts kopiert): „Visual structure is information“ – Faktenliste, Kennzahlen und Zuständigkeits-Panels tragen Struktur über Linien und Reihenfolge; keine Einzelwort-Hervorhebung, keine Großbuchstaben-Labels. Der Abgrenzungssatz bleibt ein ruhiger Hinweis (Body 16/400 ink-500, Icon `Info` 16 px), ohne Wertung und ohne Links auf die anderen Projekte.
2. **ui-ux-pro-max** (22.10.2026, lokal): `py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "product facts entity page ai assistant compliance" --domain ux` – Image Optimization (High): nicht betroffen (Köpfe ohne Bild, LCP = H1); Active State (Medium): Brotkrumen markieren das aktuelle Glied (§ 17.3).
3. **21st.dev:** `21st_magic_component_inspiration` stand in dieser Sitzung nicht als Werkzeug zur Verfügung; nichts abgerufen oder behauptet.
4. **Context7:** nicht verfügbar; Ersatz `craftos/node_modules/next/dist/docs`. Keine offenen API-Fragen (Server Components, `metaFor`).

**Abweichungen (begründet):**

- `/craft-ai` „Grenzen“: UI-SPEC nennt 3 × sm; `BentoGrid` verlangt mindestens zwei Kachelgrößen. Umgesetzt als wide + 2 × md – in schmalen sm-Kacheln trennte die globale Silbentrennung der h3 den Titel („Kein autono-mes Verbuchen“, Sichtprüfung 1440 px).
- `/gobd` Funktionskacheln: Größen md, sm, sm, md, md, wide, damit „Zugriffe und E-Rechnungsbezug schützen“ nicht in einer sm-Kachel getrennt wird („E-Rech-nungsbezug“); Reihenfolge bleibt in allen Breiten gleich.
- `/fakten-ueber-craftos` Stand-Zeile: eigene Label-Zeile unter der `FactList` (Text plus `mailto:`-Link „Korrektur melden“), weil `FactList.note` nur Text trägt.

**Prüfung:** `tests/kernseiten.test.ts` (Inhalte, Wortregeln, gerenderte Seiten), `tests/design-v2-budgets.test.ts` (Sammeltest 08-12), `tests/seo-brand.test.ts` (Organization-Abgrenzung, `sameAs`), `scripts/seo-audit.mjs --paths=/fakten-ueber-craftos,/craft-ai,/gobd`, `scripts/visual-audit.mjs` (5 Breiten × 2 Engines).
