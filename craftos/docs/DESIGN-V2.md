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

<!-- Plan 05-06 trägt hier die Kaskadenergebnisse aus Plan 05-05 (FeatureCard, ComparisonTable,
Badges, IllustrationLabel, MediaFigure, BrowserFrame, PhoneFrame, DevicePair, Mini-UI) sowie für
/styleguide und MobileAppGallery ein. -->
