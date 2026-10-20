---
phase: 05
slug: produktwahrheit-designsystem-v2-und-medienpipeline
status: draft
shadcn_initialized: false
preset: none
created: 2026-10-20
---

# Phase 05 — UI-Designvertrag: Designbausteine v2 und Musterseite

> Visueller und interaktiver Vertrag für die Designbausteine v2 der CraftOS-Website (`craftos/`, Next.js 16 App Router, React 19, Tailwind 4 CSS-first). Erstellt vom gsd-ui-researcher, geprüft vom gsd-ui-checker. Phase 5 baut ausschließlich die wiederverwendbaren Bausteine und die nicht indexierte Musterseite `/styleguide`; Startseite, Menü und Funktionsseiten werden erst in den Phasen 6–9 mit diesen Bausteinen neu zusammengesetzt. Sichtbar korrigiert werden in Phase 5 nur Produktfakten (Ankündigungen, Preise, Tab-Beschriftung „Zeiten“).

**Leitfrage des Inhabers (20.10.2026):** Die Seite ist „langweilig, nur Schrift, hässlich … man versteht da fast nichts“. Ziel: „viel strukturierter, viel schöner“, weniger Text, visuelle Elemente, „nicht Rom neu erfinden“. Jeder Baustein in diesem Vertrag existiert, um einen Textblock durch Struktur oder Bild zu ersetzen.

**Quellenkennzeichnung:** [CONTEXT D-xx] = gesperrte Inhaberentscheidung, [RESEARCH] = 05-RESEARCH.md, [BESTAND] = vorhandener Code, [ERMESSEN] = Entscheidung des UI-Researchers im Rahmen von „Claude's Discretion“, [STANDARD] = Standardwert.

---

## Gestaltungsrichtung

**Name:** „Werkbank-Präzision“ [ERMESSEN]

**Ein Satz:** Das Produkt steht groß im Bild, alles andere ist ruhig, flach und eindeutig gegliedert – wie eine aufgeräumte Werkbank, auf der das Werkstück liegt.

| Prinzip | Umsetzung |
|---|---|
| Kühnheit an genau einer Stelle | Nur die Geräterahmen (Browser und Phone mit vereinfachter CraftOS-Oberfläche) tragen Schatten, Tiefe und Kontrast. Kacheln, Karten, Tabellen und Schritte bleiben flach (kein Schatten, keine Verläufe). |
| Struktur ist Information | Nummerierung nur in der Schrittfolge (echter Ablauf). Eyebrows nur, wenn sie eine Kategorie benennen (Arbeitsablauf-Stufe, Gewerk, Seitenbereich), nie als Dekoration. Trennlinien gliedern Kennzahlen und Tabellen, nicht Fließtext. |
| Markenmotiv sparsam | Das Sechseck aus dem CraftOS-Logo (C im Hexagon) erscheint als Knotenform der Schrittfolge – sonst nirgends. Das vorhandene 72-px-Linienraster des Starthero bleibt auf den Hero beschränkt. |
| Hierarchie statt Einheitskarten | Bento-Kacheln unterscheiden sich in Größe, Fläche (weiß, warm, dunkel) und Radius; nicht jede Fläche ist eine gleich gerundete Karte mit gleichem Schatten. |
| Bild vor Wort | Kein Abschnitt besteht nur aus Text. Jede Kachel, jede Funktionskarte und jeder Abschnitt hat ein visuelles Element (Gerätedarstellung, Icon, Kennzahl, Foto oder Ablauf). |
| Ehrlichkeit | Vereinfachte Darstellungen zeigen nur Live-Funktionen, nur echte Bedienelemente und sind gekennzeichnet [CONTEXT D-02, D-04; MEDIA-03]. |

**Abgleich mit den „generischen KI-Mustern“ der frontend-design-Leitlinie** (gelesen: `claude-plugins-official/frontend-design/a0b04d9ddcca/skills/frontend-design/SKILL.md`):

| Muster | Bewertung für CraftOS | Entscheidung |
|---|---|---|
| Fast-Schwarz mit einem grellen Akzent | Marke ist gesperrt (Ink #101014 + Amber) [CONTEXT D-08] | Beibehalten, aber Dunkel nur für Hero, CTA-Band und höchstens eine Kachel je Raster; Hauptfläche ist Weiß. |
| Warmer Cremeton als Fläche | `ink-100 #f7f3eb` ist bestehendes Token [BESTAND] | Nur als Sekundärfläche (Kacheln, Bühnen, Tabellenkopf), nie als Seitenhintergrund. |
| SaaS-Kartenbaukasten (identische Karten, gleicher Schatten) | Genau der heutige Zustand von `/funktionen` (16 gleiche Textkacheln) | Verboten: Kacheln flach, Größen- und Flächenvariation, Schatten nur an Geräterahmen. |
| Eyebrow über jeder Überschrift, Großbuchstaben | Heute fast überall gesetzt [BESTAND] | Eyebrow optional, nur mit Kategorie-Inhalt, Satzschreibung, keine Großbuchstaben. |
| Meta-Ketten mit Mittelpunkt „A · B · C“, Pfeil „→“ an Linktext | – | Nicht verwenden. Links in Karten ohne Pfeilglyphe; nur der Haupt-CTA behält das vorhandene Icon `ArrowUpRight` (signalisiert Wechsel in die Web-App). |
| Ein Wort in der Überschrift farbig hervorheben | Starthero „Weniger Büro.“ in Amber [BESTAND] | In v2-Bausteinen nicht verwenden; der Starthero wird in Phase 6 neu bewertet. |
| Monospace für kleine Datenlabels | `--font-mono` existiert | In v2 nicht verwenden; Zahlen mit `font-variant-numeric: tabular-nums` in General Sans. |

**ui-ux-pro-max** (ausgeführt 20.10.2026: `search.py "saas construction trades software bold product-focused" --design-system -p "CraftOS"`, zusätzlich `--domain style "bento grid"` und `--domain ux`):

| Empfehlung | Übernommen? | Begründung |
|---|---|---|
| Stil „Flat Design“, keine Verläufe/Schatten, Übergänge 150–200 ms ease | Ja | Passt zu „Kühnheit an einer Stelle“; Schatten nur am Geräterahmen. |
| Bento-Raster mit variierenden Spannweiten, CSS Grid | Ja | Kernbaustein. |
| Clash Display als Display-Schrift | Ja (bereits Marke) | Satoshi/Outfit/Rubik **nicht** übernommen – General Sans bleibt [CONTEXT D-08]. |
| Palette #3B82F6 / #F97316 / #F8FAFC | Nein | Widerspricht der gesperrten Marke Amber. |
| Hover-Skalierung 1.02 bei Bento-Kacheln | Nein | Generischer Effekt; stattdessen Rahmenfarbe und Titelunterstreichung. |
| Muster „Product Review/Ratings Focused“ | Nein | Keine verifizierten Bewertungen vorhanden; erfundene Bewertungen verletzen MEDIA-03. |
| Keine Emojis als Icons, sichtbarer Fokus, Kontrast ≥ 4,5:1, `prefers-reduced-motion`, Prüfbreiten 375/768/1024/1440 | Ja | Deckt sich mit DESIGN-04/DESIGN-05; Prüfbreiten des Projekts sind 360/390/768/1024/1440. |

**21st.dev:** Steht dem UI-Researcher nicht als Werkzeug zur Verfügung. Der Executor holt gemäß Projekt-CLAUDE.md vor dem Bau ausschließlich mit `21st_magic_component_inspiration` Referenzen für die Suchbegriffe „bento grid“, „step timeline“, „comparison table“, „stats bar“, „device mockup“ – nur als Inspiration, nie `21st_magic_component_builder`/`_refiner`. Code entsteht über `/frontend-design` nach diesem Vertrag.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System in `craftos/app/globals.css` (`@theme`), Tailwind 4 CSS-first plus CSS-Module [BESTAND]. shadcn wird nicht eingeführt: keine neuen Laufzeitabhängigkeiten [RESEARCH Standard Stack], „nicht Rom neu erfinden“ [CONTEXT D-03]. |
| Preset | not applicable |
| Component library | none (eigene React Server Components in `craftos/components/v2/`) |
| Icon library | `lucide-react` 0.475.0 [BESTAND]; Gewerke-Icons `public/icons/gewerke/*.svg` über `GewerkIcon` [BESTAND] |
| Font | Clash Display (Überschriften, Kennzahlen; `next/font/local`, Variable `--font-clash`) und General Sans (Fließtext, Labels, Mini-UI; `--font-general`) [BESTAND, CONTEXT D-08] |
| Logo | `CraftOSMark` / `CraftOSLogo` aus `components/CraftOSLogo.tsx` (C im Hexagon, Amber) – unverändert [CONTEXT D-08] |
| Ablageort | `craftos/components/v2/*.tsx` + `*.module.css`; Mini-UI-Grundelemente in `craftos/components/v2/mini/*`; Textbudgets in `craftos/components/v2/budgets.ts`; Musterseite `craftos/app/styleguide/page.tsx`; Musterinhalte in `craftos/lib/styleguide-content.ts` [ERMESSEN, RESEARCH Empfohlene Struktur] |

### Neue Tokens (Erweiterung, kein Ersatz)

Ergänzt im ersten `@theme`-Block von `app/globals.css`. Bestehende Tokens bleiben unverändert [ERMESSEN].

```css
@theme {
  /* Radien – Hierarchie statt Einheitsradius */
  --radius-badge: 6px;     /* Plattform-/Lizenz-Badges */
  --radius-tile: 16px;     /* Bento-Kacheln sm/md, Funktionskarten, Tabellenrahmen */
  --radius-stage: 24px;    /* große Kacheln lg/wide, Gerätebühnen */
  /* Schatten – ausschließlich Geräterahmen */
  --shadow-device: 0 24px 48px -24px #10101466, 0 0 0 1px #10101414;
  --shadow-device-dark: 0 24px 64px -16px #000000a6, 0 0 0 4px #f2af381f;
  /* Abschnittsrhythmus */
  --spacing-section: 96px;     /* ≥ 1024 px – Ausnahme „Abschnittsabstand Desktop“, siehe Spacing Scale → Ausnahmen */
  --spacing-section-md: 64px;  /* 768–1023 px */
  --spacing-section-sm: 48px;  /* < 768 px */
  /* Warme Kachelkante (bisher nur als Literal in .soft-panel) */
  --color-line-warm: #e7dcc9;
}
```

---

## Spacing Scale

Deklarierte Werte (alle Vielfache von 4) [STANDARD, an Bestand angepasst]:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Abstand Icon–Text in Badges, Haarlinien-Abstände, Mini-UI-Innenabstand |
| sm | 8px | Badge-Gruppen, Abstand Titel–Text in Mini-UI, Icon–Label in Buttons |
| md | 16px | Abstand Titel–Text in Kacheln/Karten, Bento-Lücke unter 768 px, Innenabstand kleiner Kacheln mobil |
| lg | 24px | Innenabstand Kacheln/Karten ab 768 px, Bento-Lücke ab 768 px, Abstand Eyebrow–H2 |
| xl | 32px | Innenabstand großer Kacheln (lg/wide) ab 1024 px, Abstand Lead–Bausteininhalt mobil |
| 2xl | 48px | Abstand Abschnittskopf → Bausteininhalt ab 768 px, Abschnittsabstand mobil (`--spacing-section-sm`) |
| 3xl | 64px | Abschnittsabstand Tablet (`--spacing-section-md`), Abstand zwischen Musterseiten-Blöcken |

**Regeln:**
- Vertikaler Abschnittsabstand v2: `padding-block` 96 / 64 / 48 px (≥ 1024 / 768–1023 / < 768); der Desktopwert 96 px ist die unten deklarierte Ausnahme. Gilt für neue v2-Abschnitte; die bestehende Klasse `.section-space` (72/44 px) bleibt für noch nicht migrierte Seiten unverändert.
- Abschnittskopf → Inhalt: 48 px ab 768 px, 32 px darunter.
- Kachel-/Karteninnenabstand: 24 px ab 768 px, 16 px darunter; große Kacheln (lg/wide) 32 px ab 1024 px.
- Zeilenlänge: Lead max. `60ch`, Kachel-/Kartentext max. `45ch`, FAQ-Antwort max. `68ch`.

**Ausnahmen:**
- Abschnittsabstand Desktop 96 px (= 2 × 48, 8-px-Raster): nur `padding-block` von v2-Abschnitten ab 1024 px (Token `--spacing-section`); Begründung: ruhiger Abschnittsrhythmus bei großen Produktdarstellungen. Für keinen anderen Abstand zulässig.
- Touch-Ziele: mindestens 44 × 44 px (Buttons bleiben bei `min-height: 48px` [BESTAND]; FAQ-`summary` min. 48 px; Tabellen-Scrollbereich und Textlinks in Karten durch gestreckten Klickbereich der Karte).
- Mini-UI innerhalb der Geräterahmen ist eine verkleinerte Illustration: Innenabstände 4/8/12/16 px, Haarlinien 1–2 px; 12 px ist nur dort erlaubt.
- Bestand bleibt unverändert und gilt als Altlast bis zur Migration: `.site-container` mobil `calc(100% - 36px)` (18 px Rand), `.btn-cta` Innenabstand 13/22 px (nur Altseiten; v2 nutzt `.v2-btn-cta` mit 12/24 px, siehe Typography).

---

## Typography

Vier Größen, zwei Gewichte [ERMESSEN, abgeleitet aus Bestand; Bestand nutzt deutlich mehr Größen – v2 reduziert bewusst].

| Role | Size | Weight | Line Height | Schrift / Einsatz |
|------|------|--------|-------------|-------------------|
| Label | 14px | 600 (Badges, Eyebrow, Tabellenkopf, Schrittnummer) bzw. 400 (Bildunterschrift, Kennzeichnung, Fußnote, Kennzahl-Beschriftung) | 1.4 | General Sans |
| Body | 16px | 400 (Kachel-/Kartentext, FAQ-Antwort, Tabellenzellen) bzw. 600 (FAQ-Frage, Textlinks, Buttons) | 1.5 | General Sans |
| Heading | 20px | 600 | 1.25 | Clash Display – Kachel-, Karten- und Schritttitel (h3); ebenfalls General Sans 400 für den Lead-Satz des Abschnittskopfs (Lead: Zeilenhöhe 1.4) |
| Display | 48px (≥ 1024 px), fließend `clamp(32px, 4vw, 48px)`, 32px unter 768 px | 600 | 1.1 | Clash Display – H2 des Abschnittskopfs, Werte der Kennzahlen-Leiste, Überschrift CTA-Band, H1 der Musterseite |

**Regeln:**
- Gewichte nur 400 und 600. Geladene Schnitte Clash 500/700 und General Sans 500 werden in v2 nicht verwendet.
- Überschriften: `letter-spacing: -0.025em`, `text-wrap: balance`, `hyphens: auto` [BESTAND global].
- Zahlen in Kennzahlen, Tabellen und Mini-UI: `font-variant-numeric: tabular-nums`.
- Keine Großbuchstaben-Labels, keine Kursivhervorhebung einzelner Wörter, keine farbige Einzelwort-Hervorhebung in Überschriften.
- Deutsche Typografie: geschütztes Leerzeichen zwischen Zahl und Einheit (`29,95 €`, `10 Tage`, `50 GB`); Anführungszeichen „…“; Preise über `Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })` aus `tarife` – nie als Literal [RESEARCH Anti-Patterns].
- **Keine Vererbung der Altklassen in v2:** v2-Bausteine verwenden weder `.btn-cta` (15 px) noch `.eyebrow` (13 px, Sperrung, Pille unter `.dark-section`). Stattdessen eigene Klassen in `components/v2/*.module.css` bzw. einem v2-Block in `globals.css`:
  - `.v2-eyebrow`: 14 px / 600, Zeilenhöhe 1.4, Satzschreibung, `letter-spacing: 0`, `text-transform: none`, keine Pille/kein Hintergrund – auch nicht auf dunklen Flächen; Farbe `primary-700` hell bzw. Amber dunkel; 22-px-Strich (1 px) davor, 8 px Abstand.
  - `.v2-btn-cta`: 16 px / 600, Zeilenhöhe 1.5, `min-height: 48px`, Innenabstand 12 × 24 px, Radius 6 px (Wert von `--radius-badge`, kein weiterer Radius), Fläche Amber `#F2AF38` flach (kein Verlauf, kein Unterkantenschatten wie Bestand), Text `#101014`, Icon `ArrowUpRight` 16 px mit 8 px Abstand. Hover (nur `hover: hover`): `translateY(-2px)`, 180 ms, kein Schattenwechsel.
  - Bestand-Ausnahme: `.btn-cta` und `.eyebrow` bleiben für noch nicht migrierte Altseiten unverändert und werden erst mit der Migration der jeweiligen Seite (Phasen 6–9) ersetzt. Sie gelten nicht als Teil dieser Typoskala.
- Mini-UI in Geräterahmen ist Illustration und von dieser Skala ausgenommen (verkleinerte Produktschrift 8–13 px wie im Bestand `DeviceFrame.module.css`); sie zählt nicht als lesbarer Fließtext und wird nicht für Inhalte verwendet, die nur dort stehen.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` (`ink-50`) | Seitenhintergrund, Standardabschnitte, weiße Kacheln mit Rahmen, Gerätebildschirme |
| Secondary (30%) | `#F7F3EB` (`ink-100`, warm) und `#101014` (`ink-950`) | Warm: Kachelflächen, Gerätebühne in Funktionskarten, Tabellenkopf, CraftOS-Spalte der Vergleichstabelle, abwechselnde Abschnitte. Dunkel: nur Hero (Bestand), CTA-Band und höchstens eine Kachel je Bento-Raster |
| Accent (10%) | `#F2AF38` (`primary-500`) | ausschließlich die Liste unten |
| Destructive | `#B32F28` (`destructive`) | In Phase 5 nicht verwendet (Marketingseite ohne destruktive Aktionen). In Vergleichstabellen wird „nicht enthalten“ bewusst **nicht** rot dargestellt. |

**Accent `#F2AF38` reserviert für:**
1. Hintergrund des Haupt-CTA-Buttons („10 Tage kostenlos testen“): in v2 `.v2-btn-cta`, auf Altseiten `.btn-cta` [BESTAND].
2. Sechseck-Knoten der Schrittfolge (Füllung) und die verbindende Maßlinie (2 px).
3. Markenzeichen und aktiver Tab innerhalb der Geräterahmen (`CraftOSMark`, aktiver Phone-Tab in `primary-800 #784b10` als Text, Amber-Unterstrich 2 px).
4. Obere Kantenmarkierung (3 px) der CraftOS-Spalte in der Vergleichstabelle.
5. Eyebrow-Text und Icon-Farbe **auf dunklen Flächen** (Amber auf #101014, Kontrast ≈ 10:1).
6. Untere Kante des Seitenheros (`border-bottom: 3px`) [BESTAND].
7. Abschnittsfläche `#F2AF38` der Schrittfolge mit `tone="amber"` – höchstens einmal je Seite, einzige erlaubte vollflächige Amber-Fläche.
8. Amber-Tönung `#F2AF381F` (Amber mit 12 % Deckkraft) **nur auf dunklen Flächen**: Icon-Felder (48 × 48 px) in dunklen Bento-Kacheln und Fläche des Lizenz-Badges.
9. Text des Lizenz-Badges auf dunklen Flächen: `#FFD06A` (helles Amber, Kontrast ≈ 12:1 auf #101014).

Nicht erlaubt: Amber `#F2AF38` als Text auf hellem Grund (Kontrast ≈ 1,9:1), Amber für Kachelflächen, Amber-Verläufe als Dekoration, Amber für alle Links, Amber-Tönungen auf hellen Flächen (dort `primary-50`/`primary-100`, die nicht zum Akzentbudget zählen, sondern als helle Hinterlegung gelten).

**Abgeleitete Farben (Text, Linien, Zustände):**

| Zweck | Wert | Kontrast / Hinweis |
|---|---|---|
| Haupttext hell | `#17171C` (`ink-900`) | ≈ 17:1 auf Weiß |
| Sekundärtext hell (Lead, Kartentext, Labels) | `#62626E` (`ink-500`) | ≈ 6,1:1 auf Weiß, ≈ 5,5:1 auf `#F7F3EB` |
| Akzenttext auf Weiß (Eyebrow hell, Link-Hover) | `#99600B` (`primary-700`) | ≈ 5,0:1 auf Weiß (AA erfüllt). Auf `primary-50 #FFF4D9` nur ≈ 4,5:1 (grenzwertig) – deshalb **nicht** auf hellem Amber verwenden. |
| Text auf hellem Amber (`primary-50`/`primary-100`: Lizenz-Badge, FAQ-Symbol, aktiver Mini-UI-Tab) | `#784B10` (`primary-800`) | ≈ 6,6:1 auf `primary-50`, ≈ 7,3:1 auf Weiß. Verbindlich: Text auf heller Amber-Fläche ausschließlich `primary-800`. |
| Text dunkel | `#F4F4F5` Überschriften, `#BCBCC6` Fließtext [BESTAND] | ≥ 9:1 auf #101014 |
| `ink-400 #777782` | nur Icons und Dekor, **nie Text** | ≈ 4,4:1 – unter Grenzwert |
| Neutrale Linie | `#DEDEE3` (`ink-200`) | Tabellenzeilen, weiße Kacheln |
| Warme Linie | `#E7DCC9` (`--color-line-warm`) | Kacheln auf Warmfläche |
| Fokusring | `3px solid #BB7609`, `outline-offset: 4px` [BESTAND] | auf hell und dunkel sichtbar |
| Haken in Tabellen | Icon `Check` in `ink-900`, Kreis `primary-100 #FFEFCC` nur in CraftOS-Spalte | „Nein“ = Icon `Minus` in `ink-400` + Screenreadertext |

**Flächenrhythmus einer Seite (Vorgabe für Phasen 6–9):** Hero dunkel → Abschnitte abwechselnd Weiß / `#F7F3EB` → CTA-Band dunkel. Zwischen Hero und CTA-Band keine weiteren vollflächig dunklen Abschnitte; Dunkel innerhalb des Inhalts nur als einzelne Bento-Kachel.

---

## Bausteinkatalog v2

Alle Bausteine sind React Server Components ohne Client-JavaScript, rendern im HTML ihren vollständigen Endzustand und hängen nicht von Animation ab [RESEARCH Muster 3]. Texteigenschaften, für die ein Budget gilt, sind als `string` typisiert (nicht `ReactNode`), damit Budgets maschinell prüfbar sind.

### Textbudgets (verbindlich, „weniger Text“)

Zeichen inklusive Leerzeichen. Hinterlegt als Konstante `TEXT_BUDGET` in `components/v2/budgets.ts`; ein Vitest (`tests/design-v2-budgets.test.ts`) prüft alle Inhalte der Musterseite (`lib/styleguide-content.ts`) und wird in Phasen 6–9 auf die Seitendaten erweitert. Überschreitung = Test rot.

| Baustein | Feld | Budget |
|---|---|---|
| Abschnittskopf | Eyebrow (optional) | ≤ 24 Zeichen, 1–3 Wörter |
| | H2 | ≤ 60 Zeichen |
| | Lead | genau 1 Satz, ≤ 140 Zeichen |
| Bento-Kachel | Titel | ≤ 40 Zeichen |
| | Text | `sm`/`md`: ≤ 90 Zeichen; `lg`/`wide`: ≤ 120 Zeichen; je 1 Satz |
| Funktionskarte | Titel | ≤ 32 Zeichen (Funktionsname) |
| | Nutzen | genau 1 Satz, ≤ 100 Zeichen |
| Schrittfolge | Anzahl Schritte | 3–6 |
| | Schritttitel / Schritttext | ≤ 28 / ≤ 80 Zeichen |
| Kennzahlen-Leiste | Anzahl | 3–4 |
| | Wert / Beschriftung | ≤ 10 / ≤ 40 Zeichen |
| Vergleichstabelle | Spalten / Zeilen | max. 4 Wertspalten / max. 12 Zeilen |
| | Zeilenbeschriftung / Zelltext | ≤ 48 / ≤ 24 Zeichen (sonst Icon) |
| Badge | Text | ≤ 16 Zeichen |
| FAQ | Frage | ≤ 90 Zeichen, endet mit „?“ |
| | Antwort | erster Satz ≤ 300 Zeichen beantwortet die Frage direkt (300-Zeichen-Regel aus CLAUDE.md), gesamt ≤ 600 Zeichen; 3–8 Fragen je Block |
| CTA-Band | Überschrift / Satz / Button | ≤ 40 / ≤ 80 / ≤ 28 Zeichen |
| Mini-UI | Zeilentext | ≤ 24 Zeichen, max. 5 Zeilen je Ansicht |
| Abschnitt gesamt | Fließtext außerhalb von FAQ | kein Absatz mit mehr als 1 Satz; Fließtext gehört nur in `.article-prose` (Ratgeber/Hilfe) |

### 1. Abschnittskopf `SectionHeader`

**Zweck:** Jeder v2-Abschnitt beginnt mit genau einer Überschrift und einem Satz (DESIGN-01-Vorgabe für Phase 6).

```ts
interface SectionHeaderProps {
  eyebrow?: string;            // nur Kategorie: Arbeitsablauf-Stufe, Gewerk, Seitenbereich
  title: string;               // rendert <h2> (Prop as?: "h1" | "h2" nur für die Musterseite)
  lead: string;                // genau ein Satz
  align?: "start" | "center";  // Standard "start"; "center" nur über Kennzahlen-Leiste und CTA-Band
  tone?: "light" | "dark";
  id?: string;                 // Ankerziel
}
```

```
Eyebrow .v2-eyebrow (14/600, primary-700 hell | Amber dunkel, 22-px-Strich davor, keine Pille, keine Sperrung – nicht [BESTAND .eyebrow])
H2 Display 48/600 Clash, max. 800 px breit
Lead 20/400 General Sans, ink-500, max. 60ch
↓ 48 px (≥768) / 32 px
[Bausteininhalt]
```

- Linksbündig ist Standard (Leserichtung, Ruhe); zentriert nur in den zwei genannten Fällen.
- Eyebrow-Abstand zur H2: 24 px; H2 → Lead: 16 px.
- Verboten: Eyebrows wie „Warum CraftOS“, „Features“, „Unsere Lösung“ (tragen keine Kategorie).

### 2. Kachel-/Bento-Raster `BentoGrid` + `BentoTile`

**Zweck:** Ersetzt die 16 gleichförmigen Textkacheln durch ein gegliedertes Raster mit Hierarchie.

```ts
interface BentoGridProps { children: ReactNode; label?: string } // label → aria-label der <section>/<ul>
interface BentoTileProps {
  size: "sm" | "md" | "lg" | "wide";
  surface?: "white" | "warm" | "dark";      // Standard "warm"; "dark" max. 1 je Raster
  title: string;
  text: string;
  visual: ReactNode;                         // Pflicht: DeviceFrame | Icon | KeyFact | MediaFigure | GewerkIcon
  visualPosition?: "top" | "end";            // "end" nur bei lg/wide ab 1024 px
  href?: string;                             // ganze Kachel klickbar (gestreckter Link am Titel)
  badges?: ReactNode;                        // PlatformBadge/LicenseBadge
}
```

**Raster:** CSS Grid, `grid-auto-flow: dense`.

| Breite | Spalten | Lücke | sm | md | lg | wide |
|---|---|---|---|---|---|---|
| < 768 px | 1 | 16 px | 1 | 1 | 1 | 1 |
| 768–1023 px | 2 | 24 px | 1 | 2 | 2 × 2 Zeilen | 2 |
| ≥ 1024 px | 4 | 24 px | 1 | 2 | 2 × 2 Zeilen | 4 |

```
≥1024 px
┌───────────────────────┬───────────┬───────────┐
│ lg (dunkel)           │ sm        │ sm        │
│ Titel                 │ [Icon]    │ [Icon]    │
│ Text                  │ Titel     │ Titel     │
│ [Browserrahmen]       ├───────────┴───────────┤
│                       │ md  Titel  [Phone]    │
├───────────────────────┴───────────────────────┤
│ wide  Titel · Text                [Foto/Rahmen]│
└───────────────────────────────────────────────┘
```

- Semantik: Raster als `<ul role="list">`, Kachel als `<li><article>` mit `<h3>`.
- Radius: `sm`/`md` 16 px (`--radius-tile`), `lg`/`wide` 24 px (`--radius-stage`).
- Flächen: `warm` = `#F7F3EB` + 1 px `--color-line-warm`; `white` = Weiß + 1 px `ink-200`; `dark` = `#101014` ohne Rahmen. Kein Schatten auf Kacheln.
- Sichtbares Element ist Pflicht (`visual` nicht optional). Reine Textkacheln sind unzulässig.
- Icon-Visual: Lucide 24 px in 48 × 48-px-Feld, Radius 12 px, Fläche `primary-100` (hell) bzw. `#F2AF381F` mit Amber-Icon (dunkel).
- Verlinkte Kachel: Titel trägt den Link, `::after { inset: 0 }` macht die ganze Kachel klickbar; keine weiteren interaktiven Elemente in verlinkten Kacheln.
- Hover (nur bei `href`, nur `@media (hover: hover)`): Rahmenfarbe → `primary-700`, Titel unterstrichen (`text-underline-offset: 5px`), 150 ms. Keine Skalierung, kein Schattenwechsel.
- Fokus: Fokusring am Link, durch `:focus-within` an der Kachel sichtbar (3 px `#BB7609`).
- Mindestens 3, höchstens 7 Kacheln je Raster; mindestens zwei verschiedene Größen.

### 3. Schrittfolge `StepFlow`

**Zweck:** Abläufe (Arbeitsablauf Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team; Ablauf je Funktion für FEAT-02) als Maßkette statt Aufzählung.

```ts
interface Step { title: string; text: string; icon?: LucideIcon; href?: string }
interface StepFlowProps { steps: Step[]; tone?: "light" | "amber"; label: string } // 3–6 Schritte
```

```
≥1024 px (horizontal)
 ⬡1 ──────────── ⬡2 ──────────── ⬡3 ──────────── ⬡4
 Titel           Titel           Titel           Titel
 Text            Text            Text            Text

<1024 px (vertikal)
 ⬡1  Titel
 │   Text
 ⬡2  Titel
 │   Text
```

- Semantik: `<ol>`; Nummer ist Teil des Knotens und für Screenreader über die Liste ausgedrückt (Knoten `aria-hidden`).
- Knoten: Sechseck 40 × 40 px (`clip-path: polygon(...)` aus Logo-Geometrie, flach), Füllung Amber, Ziffer 14/600 `ink-900`. Verbindungslinie 2 px Amber (`tone="light"`) bzw. 2 px `#77531155` (`tone="amber"`).
- Horizontal ab 1024 px mit gleich breiten Spalten (`grid-template-columns: repeat(n, 1fr)`), darunter vertikal mit Linie links. Nicht das heutige 2-Spalten-Raster unter 768 px [BESTAND `.home-flow`] – vertikal ist bei Abläufen eindeutiger.
- `tone="amber"`: Abschnittsfläche `#F2AF38`, Text `#17171C`/`#46381F` [BESTAND `.home-flow`]; höchstens einmal je Seite (Startseite „So arbeitet Ihr Betrieb mit CraftOS“ in Phase 6). Dies ist die einzige erlaubte Amber-Fläche und zählt zum 10-%-Budget.
- Optionales Icon (20 px) unter dem Titel nur, wenn alle Schritte eines hat.
- Keine Nummerierung in anderen Bausteinen.

### 4. Kennzahlen-Leiste `KeyFacts`

**Zweck:** Harte, belegte Zahlen statt Werbesätzen.

```ts
interface KeyFact {
  value: string;       // aus Datenmodul abgeleitet, nie Literal im JSX
  label: string;
  source: string;      // Pflicht: z. B. "site.trialDays", "tarife.voll.monat", "product-register: mobile i18n (21 Locales)"
}
interface KeyFactsProps { facts: KeyFact[]; note: string; tone?: "light" | "dark" } // 3–4 Fakten
```

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 10 Tage      │ 29,95 €      │ 9,95 €       │ 21           │  Display 48/600, tabular
│ kostenlos    │ Voll-Lizenz  │ App-Lizenz   │ Sprachen in  │  Label 14/400 ink-500
│ testen       │ pro Monat    │ pro Monat    │ der Mobile-  │
│              │              │              │ App          │
└──────────────┴──────────────┴──────────────┴──────────────┘
Preise netto zzgl. USt. Stand: 20.10.2026.                      Label 14/400
```

- Semantik: `<dl>`; `<dt>` = Beschriftung, `<dd>` = Wert (visuell Wert oben über CSS-Reihenfolge).
- Trennung durch 1-px-Linien `ink-200` (dunkel: `#FFFFFF25`), kein Kartenrahmen, kein Verlauf, kein Akzent unter der Zahl.
- 4 Spalten ab 1024 px, 2 × 2 ab 768 px, unter 768 px 2 Spalten (Werte bleiben ≥ 32 px).
- `note` ist Pflicht und nennt Netto-Hinweis bzw. Stand-Datum.
- `source` wird als `data-source` gerendert; Vitest prüft, dass jeder Wert aus dem genannten Modul stammt (z. B. Gleichheit mit formatiertem `tarife`-Wert). Fehlt `source` oder ist der Wert nicht ableitbar, schlägt der Build/Test fehl (siehe Copywriting „Fehlertexte“). Nicht verwenden: Kundenzahlen, Zeitersparnis-Prozente, Bewertungen – dafür gibt es keine belegten Daten [MEDIA-03].

### 5. Funktionskarte `FeatureCard`

**Zweck:** Eine Live-Funktion auf einen Blick: Bild, Name, ein Satz Nutzen, Plattformen, Link.

```ts
interface FeatureCardProps {
  slug: string;                 // nur Funktionen mit tier === "heute" (Typprüfung über Register)
  name: string;
  icon: LucideIcon;
  benefit: string;              // ein Satz
  platforms: ProductPlatform[]; // aus lib/funktionen.ts
  visual?: ReactNode;           // vereinfachte Szene im Rahmen; ohne visual → großes Icon-Motiv
  href: string;                 // /funktionen/{slug}
}
```

```
┌──────────────────────────────┐
│  Bühne 4:3, #F7F3EB          │  ← Mini-Szene im Phone-/Browserrahmen (zugeschnitten)
│        [ Rahmen ]            │     oder Icon 48 px im Sechseck-Umriss
├──────────────────────────────┤
│ [Web-App] [Mobile-App]       │  Badges 14/600
│ Aufmaß                       │  Heading 20/600 Clash
│ Räume vor Ort messen und …   │  Body 16/400 ink-500, max. 45ch
│ Mehr zu Aufmaß               │  Textlink 16/600, unterstrichen
└──────────────────────────────┘
```

- Bühne mit fester `aspect-ratio: 4 / 3`, `overflow: hidden`, Rahmen ragt unten angeschnitten aus der Bühne (Produkt im Fokus, ruhige Fläche). Kein Layout-Shift.
- Kartenfläche Weiß, 1 px `ink-200`, Radius 16 px, kein Schatten; Gesamtklickfläche über gestreckten Link am Titel.
- Linktext immer „Mehr zu {Funktionsname}“ (eindeutig für Screenreader, keine Pfeilglyphe).
- Raster für Karten: 1 / 2 / 3 Spalten (< 768 / 768–1023 / ≥ 1024 px), Lücke 24 px (mobil 16 px).
- Hover wie Bento-Kachel (Rahmen `primary-700`, Titel unterstrichen, 150 ms).

### 6. Geräterahmen `BrowserFrame` und `PhoneFrame` (statisch) mit Mini-UI

**Zweck:** Das Produkt sichtbar machen – vereinfacht, im Code gebaut, ohne Screenshots [CONTEXT D-01, D-02].

```ts
interface BrowserFrameProps {
  title: string;               // Seitentitel der Web-App, z. B. "Plantafel" (Name wie in AppSidebar)
  children: ReactNode;         // Mini-UI
  evidence: string;            // Pflicht: Belegpfad @origin/release, z. B. "web:src/pages/Plantafel.tsx"
  tone?: "light" | "dark";     // Bühnenumgebung
}
interface PhoneFrameProps {
  title: string;
  children: ReactNode;
  evidence: string;            // z. B. "mobile:src/features/time-tracking/screens/TimeTrackingScreen.tsx"
  activeTab?: "Einsätze" | "Zeiten" | "Projekte" | "Mehr";
  width?: 160 | 194 | 240;     // CSS-Variable --phone-w, Seitenverhältnis 194/410 bleibt
}
```

**BrowserFrame:**
- `aspect-ratio: 16 / 10`, Mindestbreite 280 px, Radius 12 px, Fensterleiste 32 px (`#F7F3EB`, drei 6-px-Punkte `ink-300`, Text „CraftOS Web-App“ 12 px), Titelzeile mit `CraftOSMark` 20 px statt „C“-Platzhalter, Titel 13 px/600.
- Schatten `--shadow-device` (auf dunkler Fläche `--shadow-device-dark`).

**PhoneFrame:**
- Proportion 194 × 410 (2,11) aus Bestand, skalierbar über `--phone-w`; Radius außen 31 px, Bildschirm 24 px, Statusleiste „09:41“, Kameraaussparung, Seitentasten, Homeindikator [BESTAND `DeviceFrame.module.css`].
- Tab-Leiste exakt wie Mobile-Release für Mitarbeitende: **„Einsätze“, „Zeiten“, „Projekte“, „Mehr“** (Reihenfolge `assignments, time, projects, more`; Quelle Mobile `src/shared/lib/navigation.ts`, `de/common.json` `nav.time`) [RESEARCH MEDIA-03]. Der Bestand „Zeit“ in `components/feature-snippet/DeviceFrame.tsx:10` wird in Phase 5 ebenfalls auf „Zeiten“ korrigiert.
- Schatten `--shadow-device`.

**Mini-UI-Grundelemente** (`components/v2/mini/`): `MiniList`, `MiniRow` (Icon 16 px, Primärtext, Sekundärtext, rechter Wert oder Status), `MiniStat` (Beschriftung + Wert), `MiniStatus` (Statuspille, z. B. „Entwurf“, „Offen“, „Bezahlt“ – nur Statusnamen, die im Produkt existieren), `MiniWeek` (Plantafel-Wochenraster mit Einsatzblöcken), `MiniTimer` (laufende Zeiterfassung, statischer Wert).
- Schrift General Sans, 8–13 px, Farben aus `ink-*`, aktive Elemente `primary-800`/Amber.
- Inhalte: fiktive Beispieldaten im Stil des Bestands („Bäckerei Krause“, „Wandfarbe, 10 Liter“). Beträge und Mengen sind Beispieldaten, keine Produktkennzahlen.
- Verboten [MEDIA-03, CONTEXT D-02]: Bedienelemente, Felder, Menüpunkte oder Statusnamen, die im Release nicht existieren; nicht-live Funktionen (Telefon-Agent, MCP-Server, KI-Agent-Aktionen, Web-Videoanalyse, Subunternehmer-Portaleinladung, Portal-Onlinezahlung); erfundene Auswertungszahlen („+38 % Umsatz“); Cursor, Timeline oder Klickanimation (das bleibt dem Bestand `FeatureSnippet` vorbehalten).
- Barrierefreiheit: Rahmen ist `<figure>`; die Mini-UI ist `aria-hidden="true"` und `inert` (keine fokussierbaren Elemente); `<figcaption>` enthält einen Screenreadersatz (`sr-only`, ≤ 140 Zeichen, beschreibt, was die Ansicht zeigt) und die sichtbare Kennzeichnung (Baustein 9).
- `evidence` wird als `data-evidence` gerendert; ein Vitest prüft auf der Musterseite, dass jeder Rahmen einen nicht leeren Beleg hat und der Pfad im Produktregister vorkommt.

**Kombination `DevicePair`** [ERMESSEN]: Browser und Phone überlappend, Phone vorne rechts um 24 px nach unten versetzt; ab 768 px nebeneinander mit Überlappung 48 px, unter 768 px Phone unter dem Browser zentriert (keine wechselnde Bühne, kein Umschalten – statisch, damit Reduced Motion identisch aussieht).

### 7. Vergleichstabelle `ComparisonTable`

**Zweck:** Lizenzvergleich (Phase 5 Musterseite), später Wettbewerbervergleich (Phase 8) – nur mit belegten Daten.

```ts
type Cell = boolean | "teilweise" | string;   // string ≤ 24 Zeichen
interface ComparisonTableProps {
  caption: string;                              // sichtbar, Heading 20/600
  columns: { key: string; label: string; highlight?: boolean }[]; // max. 4; highlight = CraftOS
  rows: { label: string; cells: Record<string, Cell> }[];         // max. 12
  note: string;                                 // Pflicht: Quelle und Stand
}
```

- Semantik: `<table>` mit `<caption>`, Spaltenköpfe `<th scope="col">`, Zeilenbeschriftung `<th scope="row">` [RESEARCH].
- `true` → Icon `Check` 20 px `ink-900` + `<span class="sr-only">Ja</span>`; `false` → Icon `Minus` 20 px `ink-400` + „Nein“; `"teilweise"` → Text „Teilweise“ 14/600 `ink-500`.
- Hervorgehobene Spalte: Fläche `#F7F3EB`, Oberkante 3 px Amber, Kopf 14/600; Haken in dieser Spalte auf `primary-100`-Kreis 28 px.
- Zeilen: 1 px `ink-200`, Zeilenhöhe min. 56 px, Zellinnenabstand 16 px; Tabellenrahmen Radius 16 px.
- Unter 768 px: Scrollcontainer `role="region"`, `aria-label` = Caption, `tabindex="0"`, erste Spalte `position: sticky; left: 0` mit Weiß-Hintergrund; Hinweis „Zum Vergleichen seitlich wischen“ 14/400 nur unter 768 px.
- Keine roten Kreuze, keine grünen Haken – neutrale Darstellung, damit Wettbewerbervergleiche fair bleiben.

### 8. Plattform- und Lizenz-Badges `PlatformBadge`, `LicenseBadge`

```ts
type PlatformBadgeProps = { platform: "web" | "mobile" };      // Text "Web-App" | "Mobile-App"
type LicenseBadgeProps  = { license: "voll" | "app" };          // Text "Voll-Lizenz" | "App-Lizenz"
```

- Höhe 28 px, Innenabstand 4 × 8 px, Radius 6 px, Text 14/600, Icon 16 px (`Monitor` für Web-App, `Smartphone` für Mobile-App, `KeyRound` für Lizenzen) mit 4 px Abstand.
- Plattform: Weiß, 1 px `ink-200`, Text `ink-700`. Lizenz: Fläche `primary-50 #FFF4D9`, Text `primary-800 #784B10`.
- Auf dunkler Fläche: Plattform `#FFFFFF14` mit Text `#F4F4F5`; Lizenz `#F2AF381F` mit Text `#FFD06A`.
- Gruppen als `<ul aria-label="Plattformen">` bzw. „Enthalten in“, Abstand 8 px.
- „Rollen“ werden als Lizenzen ausgedrückt, weil nur diese im Produkt belegt sind (Admin/Büro = „Voll-Lizenz“, App = „App-Lizenz“) [CONTEXT Specifics, RESEARCH Preis-Wahrheitstabelle]. Keine freien Rollenbezeichnungen wie „Bauleiter“ als Badge.
- Plattformwerte kommen ausschließlich aus `funktionen[].platforms` (Register-geprüft).

### 9. Kennzeichnung `IllustrationLabel` und Bild `MediaFigure`

```ts
type IllustrationLabelProps = { kind: "vereinfacht" | "ki" };
interface MediaFigureProps {
  src: string; alt: string; width: number; height: number; sizes: string; // alles Pflicht
  label?: "ki";                     // KI-gestaltete Szene → sichtbare Kennzeichnung
  caption?: string;                 // ≤ 90 Zeichen
  priority?: boolean;               // nur oberhalb der Falz
}
```

- Feste Texte (Label 14/400, `ink-500` hell, `#BCBCC6` dunkel, Icon `Info` 16 px davor):
  - `vereinfacht`: „Vereinfachte Darstellung mit Beispieldaten“
  - `ki`: „Darstellung, KI-gestaltet“
- Position: in der `<figcaption>` direkt unter Rahmen bzw. Bild, linksbündig, 8 px Abstand. Pflicht an jedem `BrowserFrame`, `PhoneFrame`, `DevicePair` und jedem KI-Bild [MEDIA-03, CONTEXT D-04].
- `MediaFigure` umhüllt `next/image`; Bilder liegen als AVIF/WebP ≤ 150 KB je ausgelieferter Variante vor, `width`/`height` verhindern Layout-Shift [MEDIA-04]. Fotos nur aus `public/images` (z. B. `werkstatt-2026.webp`, `team-baustelle-2026.webp` nach Optimierung) [CONTEXT D-02, D-15].
- Videoplayer wird **nicht** gebaut (Videos Out of Scope); die Musterseite vermerkt dies in einer Zeile.

### 10. FAQ `FaqList`

```ts
interface FaqListProps { items: { q: string; a: string }[]; headingLevel?: 3 } // 3–8 Fragen
```

- Natives `<details>/<summary>` [BESTAND `Faq`]; neue v2-Komponente, das bestehende `components/ui/Faq.tsx` bleibt bis zur Migration unverändert.
- Frage: Body 16/600 `ink-900`, Zeile min. 48 px, Innenabstand 16 px vertikal; Symbol `Plus` 20 px in `primary-800`, dreht sich beim Öffnen um 45° (150 ms, einzige Bewegung des Bausteins).
- Antwort: Body 16/400 `ink-500`, max. 68ch, 16 px unter der Frage, 24 px Abstand nach unten.
- Trennlinien 1 px `ink-200` oben und zwischen Einträgen.
- Indexierte Seiten, die `FaqList` nutzen, binden FAQPage-JSON-LD über `lib/schema.ts` mit identischem Text ein (Seitenaufgabe, nicht Bausteinaufgabe); die Musterseite nicht (noindex).

### 11. CTA-Band `CtaBand`

```ts
interface CtaBandProps {
  title: string;        // ≤ 40
  text: string;         // ≤ 80, ein Satz
  secondary?: { label: string; href: string }; // Standard: "Preise ansehen" → /preise
}
```

```
dunkel #101014, padding-block 64 px (mobil 48 px)
┌──────────────────────────────────────────────────────────────┐
│ Machen Sie Platz für Ihr Handwerk.        [10 Tage kostenlos testen ↗] │
│ 10 Tage kostenlos testen, ohne Zahlungsdaten.   Preise ansehen          │
└──────────────────────────────────────────────────────────────┘
```

- Überschrift Display 48/600 (mobil 32), Satz Body 16/400 `#BCBCC6`.
- Primärbutton `.v2-btn-cta` (16/600, nicht `.btn-cta`) mit `href={site.ctaUrl}` (damit `trial_click` über `classifyAppLink` in `components/Analytics.tsx` weiter erfasst wird) [BESTAND]; Sekundärlink als `.text-link` in `#F4F4F5`.
- Ab 768 px Text links, Aktionen rechts (vertikal zentriert); darunter gestapelt, Button volle Breite.
- Höchstens ein CTA-Band je Seite, immer als letzter Inhaltsabschnitt vor dem Footer.

---

## Bewegung und Reduced Motion (DESIGN-04)

| Element | Bewegung | Dauer | Reduced Motion |
|---|---|---|---|
| Verlinkte Kacheln/Karten | Rahmenfarbe, Unterstreichung des Titels (nur `hover: hover`) | 150 ms ease | sofort (globale Regel `app/globals.css` setzt 0,01 ms) |
| `.v2-btn-cta` | Hover `translateY(-2px)`, kein Schattenwechsel (Altklasse `.btn-cta` behält ihren Bestands-Hover) | 180 ms | sofort |
| FAQ-Symbol | Drehung 45° beim Öffnen | 150 ms | sofort |
| Alle übrigen v2-Bausteine | keine | – | – |

- Keine Einblend-, Scroll-, Parallax- oder Zähleranimationen in Phase 5; keine globale Scroll-Animation [CONTEXT D-08].
- Kein Inhalt startet unsichtbar (`opacity: 0`, `visibility: hidden`, `transform` außerhalb des Bildes) und wartet auf JavaScript oder einen Observer [RESEARCH Anti-Patterns].
- Spätere „Einblenden einzelner Elemente“ (DESIGN-04) nur nach `FeatureSnippet`-Muster: Server-HTML zeigt den Endzustand, Client-Hülle mit `reduced` initial `true`, höchstens ein orchestrierter Moment je Seite. Nicht Teil von Phase 5.
- Der bestehende `FeatureSnippet` (animierte Szenen mit Cursor) bleibt unverändert nutzbar; v2-Rahmen sind seine statische Ergänzung.
- Prüfung: Playwright mit `emulateMedia({ reducedMotion: "reduce" })` auf `/styleguide` – alle Bausteine sichtbar, keine laufenden Animationen (`document.getAnimations()` leer nach Laden).

---

## Interaktion, Barrierefreiheit und Responsivität

- Prüfbreiten: 360, 390, 768, 1024, 1440 px; Chromium und WebKit; Touch-Emulation bei 390 px [BESTAND RELAUNCH-ABNAHME].
- Kein horizontaler Seitenscroll bei 360 px; einzig erlaubter Scrollbereich ist die Vergleichstabelle.
- Tastatur: alle Links und `summary` per Tab erreichbar; Mini-UI per `inert` aus der Tab-Reihenfolge genommen; Fokusring 3 px `#BB7609` überall sichtbar, auch auf dunklen Flächen.
- Überschriftenhierarchie: Seite h1 → Abschnittskopf h2 → Kachel/Karte/Schritt/Tabelle h3; keine Ebenen überspringen.
- Kontrast: Text ≥ 4,5:1, große Display-Texte ≥ 3:1, Icons mit Bedeutung ≥ 3:1. `ink-400` nie für Text.
- axe (`@axe-core/playwright`) auf `/styleguide` ohne „serious“/„critical“-Verstöße in allen fünf Breiten.
- Layout-Shift: alle visuellen Slots mit fester `aspect-ratio` (Bühne 4:3, Browser 16:10, Phone 194:410) bzw. `width`/`height` bei Bildern; CLS auf `/styleguide` = 0 (Playwright `PerformanceObserver`).
- Semantik: Bausteine rendern `section`, `ul/li`, `article`, `ol`, `dl`, `table`, `figure/figcaption`, `details/summary` – keine `div`-Listen.

---

## Musterseite `/styleguide`

**Route:** `craftos/app/styleguide/page.tsx`, Server Component, statisch [RESEARCH].
**Indexierung:** `metadata.robots = { index: false, follow: false }`; nicht in `app/sitemap.ts`, nicht in `lib/llms.ts`, nicht in Header/Footer verlinkt, **nicht** per `robots.ts` gesperrt (sonst wird `noindex` nicht gelesen) [RESEARCH]. Kein JSON-LD.
**Inhalt:** ausschließlich realistische CraftOS-Inhalte mit Live-Funktionen und Werten aus Datenmodulen, abgelegt in `lib/styleguide-content.ts` (damit Budget- und Faktentests greifen).

**Aufbau (Reihenfolge verbindlich):**

| # | Block | Inhalt (Muster, verbindlich in Struktur, Text innerhalb Budget anpassbar) |
|---|---|---|
| 0 | Kopf (dunkel, `PageHero` Bestand) | H1 „Designbausteine v2“, Satz „Interne Musterseite: alle Bausteine für die Neugestaltung der CraftOS-Website mit echten Inhalten.“ |
| 1 | Tokens | Farbfelder (Weiß, `#F7F3EB`, `#101014`, Amber, `primary-700`, `ink-500`) mit Hex und Rolle; Schriftmuster der vier Größen; Abstandsleiste 4–64 px plus gesondert markierte Ausnahme 96 px (Abschnittsabstand Desktop); Radien 6/16/24 px |
| 2 | `SectionHeader` | Eyebrow „Angebot“, H2 „Vom Aufmaß zum unterschriebenen Angebot“, Lead „Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.“ – hell und dunkel |
| 3 | `BentoGrid` | `lg` dunkel „Plantafel“ mit `BrowserFrame` (Wochenansicht, `evidence: web:src/pages/Plantafel.tsx`); `md` „Zeiterfassung“ mit `PhoneFrame` (Tab „Zeiten“); `sm` „E-Rechnung“ (Icon `FileCheck2`); `sm` „Belege scannen“ (Icon `ScanLine`); `wide` „Mängel und Abnahme“ mit Foto oder Phone |
| 4 | `StepFlow` | 6 Schritte Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team, jeweils hell und `tone="amber"` |
| 5 | `KeyFacts` | „10 Tage“ (`site.trialDays`), „29,95 €“ (`tarife` voll), „9,95 €“ (`tarife` app), Wert „21“ mit Beschriftung „Sprachen in der Mobile-App“ (Register Mobile-Locales); Note „Preise netto zzgl. USt. Stand: 20.10.2026.“ |
| 6 | `FeatureCard` ×3 | Aufmaß (Web-App, Mobile-App), Zeiterfassung (Web-App, Mobile-App), E-Rechnung (Web-App) – jeweils mit Szene |
| 7 | Geräterahmen | `BrowserFrame`, `PhoneFrame` in drei Breiten (160/194/240), `DevicePair`, jeweils mit `IllustrationLabel` |
| 8 | `ComparisonTable` | Caption „Voll-Lizenz und App-Lizenz im Vergleich“; Spalten Voll-Lizenz (highlight), App-Lizenz; Zeilen u. a. Web-App, Mobile-App, Angebote und Rechnungen, Plantafel, Zeiterfassung, Aufmaß und Baudokumentation, Urlaub und Abwesenheiten, Preis pro Monat (aus `tarife`); Note „Preise netto zzgl. USt. Quelle: Preisliste CraftOS, Stand 20.10.2026.“ |
| 9 | Badges | alle Plattform- und Lizenz-Badges hell und dunkel |
| 10 | `FaqList` | 3 Fragen (siehe Copywriting) |
| 11 | `MediaFigure` + Kennzeichnung | `werkstatt-2026` (optimiert ≤ 150 KB) ohne Label; ein Beispiel mit „Darstellung, KI-gestaltet“ nur, falls ein KI-Bild vorliegt, sonst Platzhalterzeile „Kein KI-Bild hinterlegt – Bild mit Kennzeichnung in public/images ablegen.“ ausschließlich auf der Musterseite |
| 12 | Hinweis | „Videoplayer: entfällt (Videos sind nicht Teil des Meilensteins).“ |
| 13 | `CtaBand` | wie Copywriting |

Jeder Block trägt eine kleine Kopfzeile mit Komponentenname (Label 14/600, `ink-500`), damit Planer und Prüfer Bausteine eindeutig zuordnen.

---

## Seitenrezepte für Phasen 6–9 (Vorgabe, keine Phase-5-Umsetzung)

| Seite | Abfolge der Bausteine |
|---|---|
| Startseite (Phase 6) | Hero (Bestand, mit `DevicePair` statt kleinem Mock) → `KeyFacts` → `StepFlow tone="amber"` (Arbeitsablauf) → `BentoGrid` (Kernfunktionen, max. 7) → `ComparisonTable` oder Preisteaser → `FaqList` → `CtaBand` |
| Funktionsübersicht (Phase 6, FEAT-01) | `SectionHeader` je Arbeitsablauf-Gruppe (Eyebrow = Gruppe) + `FeatureCard`-Raster je Gruppe; Reihenfolge Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team |
| Funktionsdetail (Phase 7, FEAT-02) | `PageHero` + `DevicePair` → Badges (Plattform, Lizenz) → `StepFlow` (Ablauf, 3–5 Schritte) → `BentoGrid` (Teilfunktionen) → `FaqList` → `CtaBand` |
| Mobile-App (Phase 7, FEAT-03) | `PhoneFrame`-Reihe je App-Funktion im `BentoGrid` → `KeyFacts` (u. a. Wert „21“, Beschriftung „Sprachen in der Mobile-App“) → `CtaBand` |
| Alternativen/Vergleich (Phase 8) | `SectionHeader` → `ComparisonTable` (nur belegte Wettbewerberdaten mit Quelle/Stand) → `FaqList` → `CtaBand` |

Regeln: zwei aufeinanderfolgende Abschnitte nutzen nie denselben Baustein; jeder Abschnitt = `SectionHeader` + genau ein visueller Baustein; höchstens ein `StepFlow tone="amber"` und ein `CtaBand` je Seite.

---

## Copywriting Contract

Ansprache „Sie“, Satzschreibung, aktive Verben, keine Füllwörter, keine Ausrufezeichen [PROJECT]. Nicht-live Funktionen werden nirgends angekündigt – weder Abschnitt, Hinweis, Termin noch „demnächst“/„in Entwicklung“ [CONTEXT D-12]. In Vergleichstabellen erscheint eine fehlende Funktion ausschließlich als neutrale „Nein“-Zelle (Icon `Minus` + Screenreadertext „Nein“) ohne Entwicklungshinweis.

| Element | Copy |
|---------|------|
| Primary CTA | „10 Tage kostenlos testen“ (Button `.v2-btn-cta` 16/600, auf Altseiten `.btn-cta`, Ziel `site.ctaUrl`, Icon `ArrowUpRight`) [BESTAND Hero; DESIGN-01 „10 Tage testen“] |
| Sekundäre Aktion CTA-Band | „Preise ansehen“ → `/preise` |
| Kartenlink | „Mehr zu {Funktionsname}“ (z. B. „Mehr zu Aufmaß“) |
| CTA-Band Überschrift / Satz | „Machen Sie Platz für Ihr Handwerk.“ / „10 Tage kostenlos testen, ohne Zahlungsdaten.“ [BESTAND TrialCta, gekürzt] |
| Kennzeichnung Code-Darstellung | „Vereinfachte Darstellung mit Beispieldaten“ |
| Kennzeichnung KI-Bild | „Darstellung, KI-gestaltet“ |
| Kennzahlen-Hinweis | „Preise netto zzgl. USt. Stand: {Datum aus Produkt-Snapshot}.“ |
| Tabellenhinweis mobil | „Zum Vergleichen seitlich wischen“ |
| FAQ-Muster 1 | „Brauche ich für den Test eine Zahlungsmethode?“ – „Nein. Sie testen CraftOS 10 Tage kostenlos, eine Zahlungsmethode ist dafür nicht erforderlich.“ |
| FAQ-Muster 2 | „Was kostet die App-Lizenz?“ – „Die App-Lizenz kostet 9,95 € netto im Monat oder 99,50 € netto im Jahr und ergänzt die Voll-Lizenz Ihres Betriebs.“ (Werte aus `tarife`) |
| FAQ-Muster 3 | „Wie werden KI-Funktionen abgerechnet?“ – „Über im Voraus gekaufte Credits; jeder Betrieb erhält einmalig 150 Credits Startguthaben.“ [RESEARCH Preis-Wahrheitstabelle] |
| Empty state heading | Entfällt als Oberfläche: Die Website rendert statisch aus Datenmodulen, ein Baustein ohne Inhalte wird nicht ausgeliefert. Musterseite Block 11 ohne KI-Bild: „Kein KI-Bild hinterlegt – Bild mit Kennzeichnung in public/images ablegen.“ (nur `/styleguide`). |
| Empty state body | Entwicklerfehler beim Build statt leerer Fläche: „BentoGrid: mindestens 3 Kacheln erforderlich – Inhalte in lib/… ergänzen.“ (analog für `StepFlow` 3–6 Schritte, `KeyFacts` 3–4 Fakten, `FaqList` 3–8 Fragen) |
| Error state | Laufzeitfehler gibt es in den Bausteinen nicht (keine Datenabfrage). Build-/Testfehler nennen Problem und Abhilfe: „KeyFacts: Wert ‚{value}‘ ohne Quelle – source aus site.ts, tarife oder Produktregister angeben.“; „Textbudget überschritten: {Baustein}.{Feld} hat {n} von {max} Zeichen – Satz kürzen.“; „PhoneFrame: evidence fehlt – Belegpfad aus origin/release angeben.“ Für Besucher gilt die bestehende 404-Seite (`app/not-found.tsx`). |
| Destructive confirmation | Keine destruktiven Aktionen in dieser Phase (Marketingseite ohne Konten, Formulare oder Löschfunktionen). |

**Begriffe (verbindlich):** „Web-App“, „Mobile-App“, „Voll-Lizenz“, „App-Lizenz“, „Credits“, „Bauphasen“ (Synonym „Arbeitsabschnitte“ nur erläuternd) [CONTEXT D-13, RESEARCH Lizenzname]. Nicht: „Volllizenz“, „Mobile Lizenz“, „Handy App“ als Lizenzname, „Features“.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; nur Inspiration über `21st_magic_component_inspiration`, kein übernommener Code | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten: keine [RESEARCH Standard Stack]. `sharp` 0.35.4 wird nur transitiv über `next` genutzt (Bildkonvertierung), nicht neu installiert.

---

## Abnahmeprüfungen für diesen Vertrag (Hinweis für Planer)

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Textbudgets | Vitest `tests/design-v2-budgets.test.ts` | alle Felder in `lib/styleguide-content.ts` im Budget |
| Kennzahlen-Herkunft | Vitest | jeder `KeyFact.value` gleich formatiertem Wert der genannten Quelle |
| Geräterahmen-Belege, Tab „Zeiten“ | Vitest + Playwright | `data-evidence` nicht leer und im Register; Tab-Texte „Einsätze, Zeiten, Projekte, Mehr“ |
| noindex | Vitest/Playwright | `<meta name="robots" content="noindex, nofollow">`, nicht in `/sitemap.xml`, HTTP 200 |
| Reduced Motion | Playwright `emulateMedia` | alles sichtbar, keine laufenden Animationen |
| Barrierefreiheit | `@axe-core/playwright`, 5 Breiten | keine serious/critical |
| Layout-Shift, Bildbudget | Playwright + Vitest Budget | CLS 0, jede ausgelieferte Bildvariante ≤ 150 KB |
| Kennzeichnung | Playwright | jede `figure` mit Rahmen enthält „Vereinfachte Darstellung mit Beispieldaten“ oder „Darstellung, KI-gestaltet“ |

E2E-Datei `tests/e2e/design-v2.pw.cjs` muss in `playwright.config.cjs` `testMatch` eingetragen werden [RESEARCH Pitfall 3]. Alle Prüfungen lokal (globale Regel 5).

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
