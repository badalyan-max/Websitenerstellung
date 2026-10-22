---
phase: 09
slug: gewerke-und-wissensinhalte
status: draft
shadcn_initialized: false
preset: none
created: 2026-10-22
---

# Phase 09 — UI-Designvertrag: Gewerke und Wissensinhalte

> Schlanker Vertrag für die Gewerke-Vorlage `/gewerke/[slug]`, die Übersicht `/gewerke`, die Artikelvorlage v2 für Ratgeber und Hilfe (`/blog/[slug]`, `/hilfe/[slug]`) inklusive Schrittliste sowie die Übersichten `/blog`, `/hilfe` und ihre Kategorieseiten. Erstellt vom gsd-ui-researcher am 22.10.2026 ohne Rückfragen („mach einfach“), Prüfung durch gsd-ui-checker.

**Grundsatz:** Die genehmigten Verträge **[05]** („Werkbank-Präzision“), **[06]**, **[07]** und **[08]** gelten **unverändert**: Gestaltungsrichtung, Tokens, Typoskala inkl. 28-px-H1 unter 400 px ([07] B1), Farben und Amber-Liste, Fokusring, Abstände inkl. 96-px-Ausnahme, Bausteinverträge, Bewegungsregeln, Brotkrumen ([08] § 1), Antwort-zuerst-Regel ([08] § 2), Anker-Konvention (`DESIGN-V2.md` § 17.1), `FunktionsKopf` mit G1. Dieser Vertrag legt nur Phase-9-Spezifisches fest; jede Abweichung steht in § „Abweichungen“ (H1–H10).

**Quellenkennzeichnung:** [D-xx] = `09-CONTEXT.md` (verbindlich), [R] = `09-RESEARCH.md` inkl. Leitlinie L-1 und Orchestrator-Entscheidungen, [05]–[08] = genehmigte Verträge, [BESTAND] = Code auf `main`, [KASKADE] = Design-Kaskade, [ERMESSEN] = Entscheidung im Rahmen von „Claude's Discretion“ bzw. Annahme ohne Inhaberrückfrage (Liste A1–A10 am Ende).

**Mess- und Zählnachweis (22.10.2026):** 45 feste Texte dieses Vertrags per Node gezählt (`Array.from(s).length`, Satzregel `sentenceCount` aus `components/v2/budgets.ts`), alle im Budget. H1-Zeilen und Kopfwort-Spans per Playwright-Chromium (`setContent`, Clash Display 600 aus `public/fonts`, kein Server) für alle 73 Artikel-H1 der Keyword-Map und alle 13 Gewerke-H1 in sechs Breiten gemessen. Skripte (nicht versioniert, die Tests im Plan ersetzen sie): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/p9ui/count09.cjs` und `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/p9ui/measure09.cjs`.

---

## Design-Kaskade (Projekt-CLAUDE.md, laut D-31 einmal für die ganze Phase)

### 1. frontend-design (Leitlinie gelesen, nicht kopiert)

Gelesen: `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/af59ee3a1051/skills/frontend-design/SKILL.md`; alle acht Cache-Stände sind per MD5 `7d6df6b2…6afd0` byte-identisch mit dem in [05]–[08] gelesenen Stand.

| Leitlinie | Anwendung Phase 9 |
|---|---|
| „Ground your designs in the subject matter“ | Gewerke-Seiten zeigen den Auftrag des Gewerks (Zählerschrank, Badsanierung, Dachsanierung) als Maßkette mit Funktionslinks, nicht als Funktionsaufzählung. |
| „Numbered markers only if the content actually is a sequence“ | Nummern gibt es nur im Gewerke-Ablauf (`StepFlow`) und in den nummerierten Anleitungsschritten der Artikel; Aufzählungen ohne Reihenfolge bleiben Punktlisten. |
| „Spend your boldness in one place“ | Gewerke: einziges bewegtes und markantes Element ist der bestehende `FeatureSnippet` im Ablauf. Artikel: die Schrittliste in Maßketten-Optik; Köpfe, Karten und Prosa bleiben ruhig. |
| „Meta strings joined with middle dots“, „→ an Links“ | Die Artikel-Metazeile verliert „·“-Ketten (Liste mit Abstand statt Trenner); Karten verlieren „Artikel lesen ↗“. „→“ bleibt nur innerhalb zitierter Menüpfade („Einstellungen → Mahnwesen“), nie an Links oder Buttons. |
| „Line lengths of less than 80 characters“ | Prosa max. 68ch, Antwortsatz max. 60ch, Kartentext max. 45ch. |
| „Treat failure and emptiness as moments for direction“ | Leere Suche nennt den nächsten Schritt und bietet „Suche zurücksetzen“; Build-Fehler nennen Problem und Abhilfe. |

### 2. ui-ux-pro-max (ausgeführt am 22.10.2026, lokal)

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas knowledge base article step by step trade workflow" --domain ux
# ergänzend:
py -3.12 -X utf8 .../search.py "long article readability table of contents" --domain ux
py -3.12 -X utf8 .../search.py "card grid navigation hub" --domain ux
py -3.12 -X utf8 .../search.py "numbered list instructions accessibility" --domain ux
```

| Treffer | Übernommen? | Umsetzung |
|---|---|---|
| Progress Indicators (Medium): „Step indicators for multi-step processes“ | Ja | Hilfe-Schritte als nummerierte Schrittliste mit Sechseck-Knoten (§ 2.4); Gewerke-Ablauf als `StepFlow`. Keine Fortschrittsleiste (statische Seiten ohne Zustand). |
| Line Length (Medium): 65–75 Zeichen | Ja | Prosa `max-width: 68ch`. |
| Table Handling (Medium): horizontales Scrollen statt Überlauf | Ja | Markdown-Tabellen in einem eigenen Scrollbereich mit `role="region"` (§ 2.3). |
| Truncation (Medium) | Teilweise | Nur das letzte Brotkrumen-Glied kürzt mit Ellipse ([08]); Kartentitel und H1 werden nie gekürzt. |
| Sticky Navigation (Medium) | Ja | Inhaltsverzeichnis ab 1024 px `position: sticky; top: 100px`; Anker behalten `scroll-margin-top: 100px`. |
| Breadcrumbs „erst ab 3 Ebenen“ (Low) | Nein, wie [08] C1 überstimmt | Sichtbare Brotkrumen auf allen Phase-9-Seiten (SEO-05). |
| Back Button (High), Alt Text (High), Color Contrast (High) | Ja | Normale Links; keine Rasterbilder (nur dekorative Gewerke-SVG mit `alt=""`); Kontrastwerte § Color. |

### 3. 21st.dev

**Nicht verfügbar** – `21st_magic_component_inspiration` steht in dieser Sitzung nicht als Werkzeug bereit; nichts abgerufen oder behauptet. Executor: falls verfügbar, nur `21st_magic_component_inspiration` mit „knowledge base article“, „step list instructions“, „industry landing page“, „article card grid“; nie `_builder`/`_refiner`; Ergebnis in `craftos/docs/DESIGN-V2.md` § 18 vermerken.

### 4. Context7

Nicht verfügbar. Ersatz wie [06]–[08]: `craftos/node_modules/next/dist/docs` (Server Components, `generateStaticParams`, Metadata). Keine offenen API-Fragen: alle Vorlagen sind Server Components; einzige Client-Insel bleibt `ContentSearch` [BESTAND], einziges animiertes Element der `FeatureSnippet` [BESTAND].

### 5. SEO-Check

§ 8 „Prüfkriterien“ (Map-Werte, Schema, Anker, Audit-Ausweitung D-24).

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System `craftos/app/globals.css` + CSS-Module [05]–[08] |
| Preset | not applicable |
| Component library | none – v2-Bausteine `craftos/components/v2/*` (React Server Components) |
| Icon library | `lucide-react` 0.475.0 [BESTAND]; Gewerke-Piktogramme `public/icons/gewerke/*.svg` über `GewerkIcon` [BESTAND] |
| Font | Clash Display 600 (H1, H2, h3-Titel) + General Sans 400/600 (Text, Labels) über `next/font/local` [05] |

**Wiederverwendet ohne Änderung:** `FunktionsKopf` (G1, ohne Visual), `Breadcrumbs`, `SectionHeader` (G2), `StepFlow`, `FeatureCard` + `Frame karte` mit `cardScenes`, `FaqList answerMax={300}`, `CtaBand`, `IllustrationLabel`, `PlatformBadges`, `FeatureSnippet` + `tradeSnippetExamples`, Szenen aus `lib/scenes.ts`.

### Ergänzungen (nur diese drei, Lücke jeweils belegt)

| # | Baustein | Inhalt | Belegte Lücke |
|---|---|---|---|
| G8 | `ContentKopf` (neu, `components/content/ContentKopf.tsx` + `.module.css`) | Heller Seitenkopf für Artikel, Übersichten und Kategorien (Vertrag § 2.1). | `FunktionsKopf` ist nur dunkel, verlangt H1 ≤ 60 und ein Kopfwort; Artikel-H1 aus der Map sind bis 98 Zeichen lang und der helle Kopf ist für Ratgeber/Hilfe festgelegt ([08] Color). |
| G9 | `LinkKarten` (neu, `components/v2/LinkKarten.tsx` + `.module.css`) | Raster verlinkter Karten für Artikel, Kategorien und Gewerke (Vertrag unten). | `BentoGrid` erlaubt höchstens 7 Kacheln (12 Gewerke, 9 Hilfe-Kategorien, bis 53 Suchergebnisse); `FeatureCard` nur für Funktionen; `FeatureList` verlangt Lucide-Icon, Plattformen und genau einen Nutzensatz ≤ 100, Artikeltitel sind bis 91 Zeichen lang. |
| G10 | Artikel-Prosa v2 (`.article-prose` in `app/globals.css` + Rehype-Schritt in `lib/content.ts`) | v2-Typografie und Schrittliste in Maßketten-Optik als reines CSS auf Markdown-HTML (D-17), Tabellen-Scrollbereich (§ 2.3, § 2.4). | Bestand nutzt 17/29/23 px außerhalb der v2-Skala und Amber als Zitat-Kante; D-17 verlangt Schrittliste ohne Client-Insel. |

**G9 `LinkKarten` – Vertrag:**

```ts
interface LinkKarte {
  href: string;
  title: string;        // ≤ 100 (Artikeltitel bis 91, Gewerkname, Kategoriename)
  text?: string;        // ≤ 160, 1–2 Sätze (Artikel: description; Gewerk: teaser ≤ 100, 1 Satz)
  label?: string;       // ≤ 24 (Kategorie bzw. „Ratgeber“/„Hilfe“)
  meta?: string;        // ≤ 32 („6 Min. Lesezeit“, „7 Anleitungen“)
  icon?: ReactNode;     // GewerkIcon 48 px oder Lucide 24 px im Icon-Feld
}
interface LinkKartenProps {
  items: LinkKarte[];          // 1–60
  label: string;               // aria-label der Liste
  surface: "white" | "warm";   // Kartenfläche; immer Gegenfläche zum Abschnitt
  columns?: 2 | 3;             // Spalten ab 1024 px, Standard 3
}
```

- Markup: `<ul role="list" aria-label>` › `<li>` › `<article>`; Reihenfolge im DOM: Icon (dekorativ, `aria-hidden`), Label (14/600 `#784B10`), `<h3>` mit Link (20/600 Clash, gestreckter Link `::after { inset: 0 }`, ein Tabstopp je Karte), Text (16/400 `#62626E`, max. 45ch), Meta (14/400 `#62626E`).
- Karte: Radius 16, Innenabstand 24 (16 < 768), kein Schatten. `surface="warm"`: `#F7F3EB` + 1 px `#E7DCC9`; `surface="white"`: Weiß + 1 px `#E7DCC9` (auf Warmfläche) – identisch zu [05] Bento-Flächen.
- Icon-Feld (Lucide): 48 × 48, Radius 12, `primary-100 #FFEFCC`, Icon 24 px `#784B10`. `GewerkIcon`: 48 × 48 ohne Feld (Piktogramm, `alt=""`). Icon → Label/Titel 16.
- Abstände in der Karte: Label → Titel 8, Titel → Text 8, Text → Meta 16.
- Raster: 1 / 2 / `columns` Spalten (< 768 / 768–1023 / ≥ 1024), Lücke 16 / 24 / 24; Karten einer Zeile gleich hoch (`align-items: stretch`); unvollständige letzte Zeile linksbündig.
- Hover (nur `@media (hover: hover)`): Rahmen `#99600B`, Titel unterstrichen (Offset 5 px), 150 ms; Fokus über `:focus-within` 3 px `#BB7609`, Offset 4 px. Keine Pfeilglyphe, kein „Weiterlesen“-Text, keine Skalierung.
- Fehlertexte: „LinkKarten: mindestens 1 Einträge erforderlich – Inhalte in lib/… ergänzen.“ (Muster `assertCount`), „Textbudget überschritten: linkKarte.title hat {n} von 100 Zeichen – Satz kürzen.“
- Wird in der Client-Insel `ContentSearch` als reine Darstellungskomponente (ohne Hooks) wiederverwendet; `ContentSearch` bleibt funktionsgleich.

**`TEXT_BUDGET`-Erweiterung (`components/v2/budgets.ts`, additiv):** `linkKarte: { label: 24, title: 100, text: 160, meta: 32 }`, `gewerk: { teaser: 100, exampleTitle: 40, example: 200 }`, `artikel: { h1: 100, heading: 80, step: 160 }`; Mengen `count.linkKarten: { min: 1, max: 60 }`, `count.gewerkSteps: { min: 4, max: 5 }`, `count.gewerkFunktionen: { min: 4, max: 6 }`, `count.gewerkFaq: { min: 3, max: 4 }`, `count.gewerkArtikel: { min: 2, max: 3 }`, `count.artikelSchritte: { min: 2, max: 10 }`, `count.artikelVerwandt: { min: 1, max: 4 }`.

**Besitz (D-27) und Reihenfolge:** Fundament (09-01) baut G8, G9, G10, `sceneById`, alle Budgetfelder oben, die Audit-Ausweitung und die Map-H1-Korrekturen (§ 1.3) als **erste** Aufgaben in einem Commit; (a) setzt die Abschnitte 1–5 der Gewerke-Vorlage sofort um und die Abschnitte, die `LinkKarten` brauchen (Gewerke-„Weiterlesen“, `/gewerke`-Raster), erst nach dem Merge dieses Commits (D-26: „(a) darf in Welle 2 weiterlaufen“). Fundament ergänzt `craftos/docs/DESIGN-V2.md` § 18 „Phase 9“ mit Verweis auf diesen Vertrag.

---

## Abweichungen zu [05]–[08] (ausdrücklich gekennzeichnet und begründet)

| # | Stelle | [05]–[08] sagt | Phase 9 legt fest | Begründung |
|---|---|---|---|---|
| H1 | [05] Amber-Liste Punkt 2 | Sechseck-Knoten und Maßlinie nur in `StepFlow` | Auch die **oberste nummerierte Liste der Artikel-Prosa** (§ 2.4) trägt Sechseck-Knoten 40 px und Maßlinie 2 px in `#F2AF38` | D-17 verlangt die Maßketten-Optik von `StepFlow` als reines CSS; gleiche Funktion (echter Ablauf), keine Fläche. |
| H2 | [05 §1] Seitenkopf | Köpfe dunkel bzw. Bestand-`PageHero` | Heller Kopf `ContentKopf` (G8) für Artikel, `/blog`, `/hilfe`, Kategorien | [08] Color nennt den hellen Kopf für Ratgeber/Hilfe; `PageHero` entfällt auf diesen Seiten. |
| H3 | [05 §2] Bento max. 7 | Kachelraster mit Hierarchie | `LinkKarten` (G9) gleichförmig in 1/2/3 Spalten | Listen gleichrangiger Ziele (12 Gewerke, Kategorien, Artikel) haben keine Rangfolge; Bento würde eine erfinden. |
| H4 | D-05 (4) eigener Abschnitt „Gewerkbeispiel“ | Abschnitt 4 als Kachel oder FactList | Beispiel als **Beispielkachel im Ablauf-Abschnitt** direkt neben dem `FeatureSnippet` (§ 1.2) | Der Snippet zeigt denselben Auftrag (`trade-snippet-examples.ts`: „The project and work match the adjacent trade story“); ein Abschnitt mit einer einzigen Textkachel verstieße gegen „jeder Abschnitt = SectionHeader + ein visueller Baustein“ [05]; `FactList` braucht 6 Einträge. |
| H5 | [07 F4] `pageHead.h1` ≤ 60 | gilt für Köpfe | Artikel-H1 (G8) ≤ 100 (`artikel.h1`), neue Map-Einträge ≤ 70; `hyphens: auto` + `overflow-wrap: break-word` statt Kopfwort-Span | Map-H1 bis 98 Zeichen [BESTAND]; Messung: „Stundenverrechnungssatz“ (364 > 324 px), „Materialentnahmeschein:“ (339), „Synchronisierungsstatus“ (340) laufen bei 360 px über. |
| H6 | Bestand `.article-prose` | 17/1.8, H2 29, H3 23, Zitat mit Amber-Kante | v2-Skala: 16/1.5, H2 32 (Display-Mindeststufe), H3 20; Zitat ohne Amber (§ 2.3) | Vier Größen [05]; Amber nicht als Dekoration. |
| H7 | [08] C3 `answerMax` | zentrale Seiten | FAQ auf Gewerke- und Artikelseiten ebenfalls `answerMax={300}` | D-24 dehnt die Antwort-zuerst-Prüfung auf `/gewerke`, `/blog/*`, `/hilfe/*` aus. |
| H8 | `/gewerke` Bild `werkstatt-2026` | KI-Bild mit Kennzeichnung [BESTAND] | **entfällt** [ERMESSEN A1]; Datei bleibt in `public/images` | D-02 (nur Code-Visuals); Gewerke-Piktogramme tragen die Seite; spart LCP-Gewicht. (a) passt `tests/media-ki-label.test.ts` Z. 42 an. |
| H9 | Bestand `ContentIndex` Hinweisboxen | „Vom Lesen ins Machen“ / „Ihre Frage ist noch offen?“ | Ersetzt durch den Sekundärlink im `CtaBand`: Ratgeber „Stundensatz berechnen“ → `/rechner/stundensatz`, Hilfe „Support kontaktieren“ → `/support` | „höchstens ein CTA-Band, immer letzter Abschnitt“ [05]; kein zweiter Hinweisblock. |
| H10 | Bestand Artikel-Aside | Inhaltsverzeichnis und „Passende Funktionen“ in der Seitenspalte, mobil vor dem Text | Seitenspalte nur Inhaltsverzeichnis (≥ 1024 px sticky); < 1024 px eingeklapptes `details`; „Passende Funktionen“ als eigener Abschnitt mit `FeatureCard` | Lange Inhaltsverzeichnisse schoben mobil den Text weg; Funktionen bekommen Szene statt Textlink. |

---

## Spacing Scale

Unverändert aus [05]–[08] (alle Werte Vielfache von 4):

| Token | Value | Usage in Phase 9 |
|-------|-------|-------|
| xs | 4px | Zeilenabstand der Metazeile bei Umbruch |
| sm | 8px | Label → Kartentitel, Titel → Kartentext, Schrittknoten-Ausrichtung (Text-Oberkante 8 px), H3 → Absatz in der Prosa, Rahmen → Kennzeichnung |
| md | 16px | Absatzabstand Prosa, H2 → erster Absatz, H1 → Antwort, Antwort → Metazeile, Kartenlücke < 768 px, Karteninnenabstand < 768 px, Text → Meta in Karten, Suchfeld-Lücke |
| lg | 24px | Karteninnenabstand ≥ 768 px, Kartenlücke ≥ 768 px, Abstand zwischen zwei Schritten, Listenabstand oben/unten, Eyebrow → H1 |
| xl | 32px | H3-Abstand oben in der Prosa, Beispielkachel → Snippet gestapelt |
| 2xl | 48px | H2-Abstand oben in der Prosa, `StepFlow` → Beispiel/Snippet, Text → FAQ/Quellen, Abschnittsabstand < 768 px, Spaltenlücke Beispiel/Snippet und Artikel/Inhaltsverzeichnis ≥ 1024 px |
| 3xl | 64px | Kopf unten ≥ 768 px, Abschnittsabstand 768–1023 px |

Exceptions: unverändert aus [05]–[08] – 96 px Abschnittsabstand ≥ 1024 px (`--spacing-section`), Touch-Ziele ≥ 44 × 44 px, Header 74/84 px, 18-px-Containerrand < 768 px [BESTAND], 12 px nur in `.v2-btn-cta`, Mini-UI und Icon-Feld-Radius. **Keine neuen Ausnahmen.** Raster je Breite: § 6.

---

## Typography

Unverändert aus [05]–[08]: vier Größen (14/16/20/Display), zwei Gewichte (400/600).

| Role | Size | Weight | Line Height | Einsatz in Phase 9 |
|------|------|--------|-------------|-------------------|
| Label | 14px | 400 / 600 | 1.4 | 400: Brotkrumen, Metazeile, Stand-Zeile, Kartenmeta, Quellenliste, Kennzeichnung. 600: Eyebrow, Kartenlabel, Tabellenkopf, Schrittziffer, Suchfeld-Label |
| Body | 16px | 400 / 600 | 1.5 | 400: Prosa, Schritttexte, Kartentext, FAQ-Antwort, Antwortsatz < 768 px, Suchfeld. 600: FAQ-Frage, `summary` des Inhaltsverzeichnisses, CTA, `strong` |
| Heading | 20px | 600 (Clash) / 400 (General Sans) | 1.25 / 1.4 | 600: h3 in Prosa, Karten, Schritten, Beispielkachel, „Quellen“. 400: Antwortsatz ≥ 768 px, Lead der Abschnittsköpfe |
| Display | `clamp(32px, 4vw, 48px)`, 32 px < 768 px, **H1 < 400 px: 28 px**; **Prosa-H2 fest 32 px** | 600 | 1.1 | H1 (alle Köpfe), H2 der Abschnittsköpfe, Prosa-H2 und „Häufige Fragen“ im Artikel, CTA-Band |

**Regeln:** Gewerke-H1 im `FunktionsKopf`: `hyphens: manual`, Kopfwort-Span `nowrap` [07]. Artikel-, Übersichts- und Kategorie-H1 im `ContentKopf`: `hyphens: auto` (`lang="de"` [BESTAND]) und `overflow-wrap: break-word` (H5), max. 800 px breit. Prosa-H2 `hyphens: auto`, `scroll-margin-top: 100px`. Zahlen `tabular-nums`. Keine Großbuchstaben, keine Einzelwort-Hervorhebung, keine Monospace (Inline-`code` in General Sans).

**Gemessen (Clash Display 600, `letter-spacing: -0.025em`, `text-wrap: balance`; Container 324 @ 28 px bei 360, 354 @ 32 bei 390, 704 @ 32 bei 768, Textspalte 800 @ 40,96 bei 1024 und @ 48 bei 1280/1440):**
- **Gewerke-H1 (§ 1.3):** höchstens 4 Zeilen bei 360/390, 2–3 Zeilen ab 768; alle Spans ≤ Container.
- **Artikel-H1 (73 Map-Einträge):** höchstens 6 Zeilen (184,8 px) bei 360, 6 Zeilen (211,1 px) bei 390, 3 bei 768, 4 bei 1024/1280/1440; ohne Silbentrennung laufen drei Wörter bei 360/390 über (H5) → Prüfung `scrollWidth ≤ clientWidth` für jede H1.

---

## Color

Unverändert aus [05]–[08]:

| Role | Value | Usage in Phase 9 |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` | Seitenhintergrund, Artikeltext-Abschnitt, Ablauf, Gewerke-FAQ, weiße Karten auf Warmflächen |
| Secondary (30%) | `#F7F3EB` (warm), `#101014` (dunkel) | Warm: `ContentKopf`, abwechselnde Abschnitte, Beispielkachel, Karten auf weißen Abschnitten, Tabellenkopf, Hinweis-Zitat. Dunkel: Gewerke-Köpfe (`FunktionsKopf`), CTA-Band |
| Accent (10%) | `#F2AF38` | nur die Liste unten |
| Destructive | `#B32F28` | nicht verwendet (keine destruktiven Aktionen) |

**Accent reserved for** (Teilmenge [05]; einzige Erweiterung H1):
1. Hintergrund des Haupt-CTA „10 Tage kostenlos testen“ (Gewerke-Köpfe, CTA-Band) bzw. „10 Tage testen“ (Header).
2. Sechseck-Knoten und Maßlinie der `StepFlow` (`tone="light"`) im Gewerke-Ablauf **und** der Schrittliste der Artikel-Prosa (H1).
3. `CraftOSMark` und aktiver Phone-Tab in Szenen; Bestandsakzente innerhalb des `FeatureSnippet`.
4. Eyebrow-Text „Gewerke“ im dunklen Kopf.
5. Untere Kante (3 px) des dunklen `FunktionsKopf` auf `/gewerke` und `/gewerke/[slug]`.

Nicht erlaubt: Amber im hellen `ContentKopf`, an Links, Zitat-Kanten, Karten, Tabellen und Kategorie-Icons; `StepFlow tone="amber"` (bleibt der Startseite vorbehalten).

**Abgeleitete Farben Phase 9 (gemessen):** Eyebrow hell `#99600B` auf `#F7F3EB` 4,71:1; Kartenlabel und Prosa-Links `#784B10` 7,47:1 auf Weiß, 6,75:1 auf `#F7F3EB`; Antwortsatz und Prosa `#17171C` 16,1:1 auf `#F7F3EB`; Sekundärtext `#62626E` 6,01:1 / 5,43:1; Suchfeldrahmen `#777782` 4,43:1 (Nicht-Text ≥ 3:1); Fokusring `#BB7609` 3,32:1 auf `#F7F3EB`.

**Flächenrhythmus (verbindlich):**
- `/gewerke/[slug]`: Kopf dunkel → Ablauf Weiß → Funktionen Warm → FAQ Weiß → Weiterlesen Warm → CTA dunkel.
- `/gewerke`: Kopf dunkel → Gewerke Weiß → CTA dunkel.
- Artikel: Kopf Warm → Text Weiß → ab hier abwechselnd Warm/Weiß für die vorhandenen Abschnitte „Passende Funktionen“ und „Weiterlesen“ → CTA dunkel.
- `/blog`, `/hilfe`: Kopf Warm → Themen Weiß → Alle Artikel Warm → CTA dunkel. Kategorie: Kopf Warm → Artikel Weiß → Weitere Themen Warm → CTA dunkel.

---

## 1. Gewerke-Vorlage `/gewerke/[slug]` (FEAT-04, D-05–D-10)

### 1.1 Abschnittsfolge (verbindlich, für alle 12 Gewerke gleich)

Abschnitte = `section data-abschnitt={id} aria-labelledby={id}`, H2-`id` = Abschnitts-id (`DESIGN-V2.md` § 17.1), `SectionHeader` ohne Eyebrow + genau ein Hauptbaustein.

| # | Abschnitt | Fläche | Baustein | `id` | Inhalt |
|---|---|---|---|---|---|
| 0 | Kopf | `#101014`, Unterkante 3 px Amber | `FunktionsKopf` ohne Visual (G1), `id="gewerk-titel"` | – | Brotkrumen „Start › Gewerke › {name}“, Eyebrow „Gewerke“, H1 = `zielwerte(pfad).h1` mit Kopfwort-Span (§ 1.3), `answer` → `<p id="antwort" data-answer>`, CTA „10 Tage kostenlos testen“, Sekundärlink „So läuft ein Auftrag“ → `#ablauf` |
| 1 | Ablauf | Weiß | `StepFlow tone="light"` (4–5) + Beispielkachel + `FeatureSnippet` (§ 1.2) | `ablauf` | H2 „So läuft ein Auftrag in Ihrem Gewerk“ (36), Lead „Jeder Schritt führt zur Funktion, mit der Sie ihn in CraftOS erledigen.“ (71) |
| 2 | Funktionen | `#F7F3EB` | `FeatureCard`-Raster (4–6, Ziel 6) mit Karten-Szene aus `cardScenes` – Darstellung wie [07] Abschnitt 6 | `funktionen` | H2 „Passende Funktionen“ (19), Lead „Mit diesen Funktionen erledigen Sie den Ablauf im Büro und auf der Baustelle.“ (77) |
| 3 | FAQ | Weiß | `FaqList answerMax={300}` (3–4) + `JsonLd(faqSchema(dasselbeArray))` | `faq` | H2 „Häufige Fragen: {name}“ (≤ 47), Lead „Kurze Antworten zu Ablauf, Funktionen und Mobile-App für Ihr Gewerk.“ (68) |
| 4 | Weiterlesen | `#F7F3EB` | `LinkKarten surface="white"` (2–3) | `weiterlesen` | H2 „Weiterlesen“ (11), Lead „Anleitungen und Ratgeber zu den Schritten dieses Ablaufs.“ (57); Karten: Label „Ratgeber“/„Hilfe“, Titel = Frontmatter-`title`, Text = `description`, Meta „{n} Min. Lesezeit“ |
| 5 | Abschluss | `#101014` | `CtaBand` | – | „Testen Sie CraftOS mit Ihrem Auftrag“ (36) / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ (51) / „Preise ansehen“ → `/preise` |

Entfällt (URL bleibt): `PageHero`, alte Klassen `section-space`/`section-title`/`eyebrow`/`notice`, `components/ui/Faq`, `TrialCta`, Vorlagen-Hinweis (`hatVorlagen`), die zwei für alle Gewerke gleichen FAQ als alleinige FAQ.

### 1.2 Abschnitt Ablauf im Detail

```
SectionHeader (H2 #ablauf, Lead)
↓ 48 / 32 (< 768)
StepFlow tone="light", label = H2, 4–5 Schritte, jeder Schritttitel verlinkt /funktionen/{funktion}
↓ 48
≥ 1024: [Beispielkachel  minmax(0,1fr)] 48 [figure FeatureSnippet  minmax(0,640px)]  align-items: center
< 1024: Beispielkachel → 32 → figure (max. 640 px, linksbündig)
```

- **Beispielkachel** (seiteneigenes `<article>`, kein neuer Baustein): `#F7F3EB` + 1 px `#E7DCC9`, Radius 16, Innenabstand 24 (16 < 768); `GewerkIcon` 48 × 48 (`alt=""`) → 16 → `<h3>` „Beispiel: {exampleTitle}“ (20/600 Clash) → 8 → `<p>` `example` (16/400 `#62626E`, max. 45ch). Beispiel und Snippet erzählen denselben Auftrag (Projekt/Arbeit aus `tradeSnippetExamples[slug]`).
- **Snippet:** `<figure data-figure="snippet">` mit `FeatureSnippet variant={example.variant}` und darunter (8 px) `IllustrationLabel kind="vereinfacht"` („Vereinfachte Darstellung mit Beispieldaten“). Einziges animiertes Element der Seite; reduzierte Bewegung zeigt den Endzustand; CLS 0. Die Gewerke-Fälle in `tests/e2e/function-illustrations.pw.cjs` (ab Z. 341) bleiben unverändert grün.
- `StepFlow` ohne Icons (Standard [07]); bei 5 Schritten ab 1024 px fünf gleich breite Spalten.

### 1.3 Daten `lib/gewerke.ts` (Besitz (a)) und H1

```ts
interface Gewerk {
  slug: string; name: string; kurz: string;
  answer: string;                       // ≤ 300, 1–2 Sätze, nennt Gewerk + belegte Funktionen (ersetzt heroIntro)
  teaser: string;                       // ≤ 100, genau 1 Satz (Karte auf /gewerke)
  ablauf: { title: string; text: string; funktion: string }[]; // 4–5; title ≤ 28, text ≤ 80 und 1 Satz
  exampleTitle: string; example: string; // ≤ 40 / ≤ 200, höchstens 2 Sätze
  funktionen: string[];                 // 4–6 (Ziel 6), ≥ 1 Phase-7-Slug, enthält jedes ablauf[].funktion
  faq: { q: string; a: string }[];      // 3–4; q ≤ 90 mit „?“, a ≤ 300; über alle 12 höchstens 1 gemeinsame Frage
  artikel: string[];                    // 2–3 Pfade /blog/… oder /hilfe/…, Ziel muss existieren
}
// entfallen: heroTitle, heroIntro, hatVorlagen
```

Ablauf-, Funktions- und FAQ-Auswahl je Gewerk: Tabelle [R] „Ablauf je Gewerk“ (jede Funktion am Release belegt; Zuordnung [ASSUMED], im Plan je Gewerk prüfen). **Muster Elektriker** (gezählt): `answer` „CraftOS verbindet für Elektrobetriebe Angebote mit Artikeln aus DATANORM-Katalogen, die Einsatzplanung, die Zeiterfassung per App, den Lager-Scan und die Rechnung mit Mahnwesen in einer Software für Büro und Baustelle.“ (218, 1 Satz); `teaser` „Material aus DATANORM-Katalogen kalkulieren, Einsätze planen und Zeiten am Auftrag erfassen.“ (92). Bestandsbeispiele sind im Budget (Titel 22–31, Text 139–168, 1–2 Sätze); SHK-Text ersetzt „Projektphasen“ durch „Arbeitsabschnitte“.

**H1 und Kopfwort-Span (Map = einzige Quelle; drei H1 > 60 korrigiert das Fundament, H8-Muster [08]):**

| Pfad | H1 (Länge) | Kopfwort-Span | Span 360 / 390 px |
|---|---|---|---|
| `/gewerke` | **neu** „Branchensoftware fürs Handwerk: Software für zwölf Gewerke“ (58), bisher 68 | „Branchensoftware“ | 255 / 291 |
| elektriker | unverändert (54) | „Elektriker-Software:“ | 276 / 316 |
| shk | unverändert (53) | „SHK-Software:“ | 201 / 230 |
| maler | unverändert (52) | „Maler:“ | 83 / 95 |
| tischler-schreiner | unverändert (56) | „Schreiner:“ | 141 / 161 |
| dachdecker | unverändert (51) | „Dachdecker-“ | 177 / 202 |
| fliesenleger | unverändert (50) | „Fliesenleger-“ | 173 / 198 |
| zimmerer | unverändert (50) | „Zimmerer-Software:“ | 283 / 323 |
| galabau | unverändert (59) | „GaLaBau-Software:“ | 264 / 302 |
| trockenbau | unverändert (60) | „Trockenbau-“ | 176 / 201 |
| metallbau | unverändert (52) | „Metallbau-Software:“ | 273 / 313 |
| bauunternehmen | **neu** „Software für Bauunternehmen: vom LV bis zur Schlussrechnung“ (59), bisher 69 | „Bauunternehmen:“ | 243 / 278 |
| allrounder | **neu** „Hausmeister-Software: vom kleinen Einsatz bis zur Rechnung“ (58), bisher 66 | „Hausmeister-“ | 184 / 210 |

Spans ≥ 340 px bei 390 px (Dachdecker 353,5, Fliesenleger 349,5, Trockenbau 352,5, Hausmeister 361,4 > 354) enden nach dem Bindestrich; der Umbruch nach „-“ ist zulässig und gemessen ohne Überlauf. Die Zahl „zwölf“ muss `gewerke.length` entsprechen (Test).

**Above-the-fold 360 × 640 (ungünstigster Fall):** 74 Header + 8 + 44 Brotkrumen + 16 + 20 Eyebrow + 24 + H1 124 (4 × 30,8) + 16 + Antwort 192 (8 × 24) + 24 + CTA 48 = **590 px** ≤ 640.

**Prompt-Anker (D-10):** `/gewerke/elektriker#antwort`, `/gewerke/maler#antwort`.

---

## 1b. Übersicht `/gewerke` (D-09)

| # | Abschnitt | Fläche | Baustein | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | `#101014` + 3 px Amber | `FunktionsKopf` ohne Visual | Brotkrumen „Start › Gewerke“, Eyebrow „Gewerke“, H1 (§ 1.3), `answer` „Eine Branchensoftware fürs Handwerk verbindet Angebot, Planung, Baustelle und Rechnung in einem Ablauf. CraftOS fragt Ihr Gewerk bei der Einrichtung ab; für zwölf Gewerke sehen Sie hier einen typischen Auftrag in Web-App und Mobile-App.“ (236, 2 Sätze; Beleg Einrichtung: [R] `SetupWizard.tsx`), CTA, Sekundärlink „Zu den Gewerken“ → `#gewerke` |
| 1 | Gewerke | Weiß | `LinkKarten surface="warm" columns={3}`, 12 Karten | `id="gewerke"`, H2 „Zwölf Gewerke im Überblick“ (26), Lead „Jede Seite zeigt einen typischen Auftrag mit den Funktionen, die Sie dafür nutzen.“ (82); Karte: `GewerkIcon`, Titel `name`, Text `teaser` |
| 2 | Abschluss | `#101014` | `CtaBand` | wie § 1.1 Abschnitt 5 |

Kein Bild, kein Vorlagen-Hinweis, keine Pfeilglyphe. Schema: `BreadcrumbList` (2) über `Breadcrumbs`, keine FAQ.

---

## 2. Artikelvorlage v2 (Ratgeber und Hilfe, D-13–D-18)

Eine Vorlage `components/content/ArticlePage.tsx` für `/blog/[slug]` und `/hilfe/[slug]`.

### 2.1 Kopf `ContentKopf` (G8)

```ts
interface ContentKopfProps {
  crumbs: Crumb[];            // crumbsFor(pfad, title) – einzige BreadcrumbList
  eyebrow: string;            // ≤ 24: Kategoriename (Artikel/Kategorie) bzw. „Ratgeber“/„Hilfe“ (Übersicht)
  h1: string;                 // === zielwerte(pfad).h1, ≤ 100
  answer?: string;            // ≤ 300, 1–2 Sätze → <p id="antwort" data-answer>
  lead?: string;              // Übergang Welle 1–2: Artikel ohne answer zeigen description als Lead (ohne id); nie zusammen mit answer
  meta?: string[];            // Artikel: Angaben der Metazeile
  stand?: string;             // Übersicht/Kategorie: Stand-Zeile
  platforms?: ("web" | "mobile")[];
}
```

```
#F7F3EB, einspaltig, Textspalte max. 800 px
oben 8/16/24 → Brotkrumen (tone="light", 44) → 16/24/32
Eyebrow .v2-eyebrow (#99600B) → 24 → H1 (Display, #17171C) → 16
Antwort 16/400 (< 768) bzw. 20/400 (≥ 768), #17171C, max. 60ch → 16
Metazeile <ul aria-label="Angaben zum Artikel"> 14/400 #62626E, flex-wrap, Lücke 16 (Zeile 4) → 16
PlatformBadges (Gruppe „Plattformen“)
unten 48 / 64 / 64
```

- **Metazeile Artikel (Reihenfolge, ohne Trennzeichen):** „Stand {updatedAt TT.MM.JJJJ}“, „Veröffentlicht {publishedAt}“ (nur wenn ≠ `updatedAt`), „{n} Min. Lesezeit“, „{author}“. Kein CTA im Artikelkopf [ERMESSEN A5].
- Fehlertexte: „ContentKopf: lead und answer gleichzeitig gesetzt – nur answer verwenden.“; „Textbudget überschritten: answer hat {n} von 300 Zeichen – Satz kürzen.“
- **Above-the-fold 360 × 640:** 74 + 8 + 44 + 16 + 20 + 24 + H1 185 (6 × 30,8) + 16 + Antwort 192 = **579 px** → Antwort vollständig sichtbar.

### 2.2 Inhalt, Seitenspalte und Reihenfolge

| Breite | Raster des Text-Abschnitts (Weiß) |
|---|---|
| < 1024 | eine Spalte (max. 720 px): `details` „Inhalt dieses Artikels“ → Szene → Prosa → FAQ → Quellen |
| ≥ 1024 | `grid-template-columns: minmax(0, 720px) 280px; column-gap: 48px; justify-content: space-between` – links Szene → Prosa → FAQ → Quellen, rechts `nav aria-label="Inhaltsverzeichnis"` sticky `top: 100px` |

- **Inhaltsverzeichnis:** nur bei ≥ 3 Einträgen; H2 und H3 (H3 16 px eingerückt); Label „In diesem Artikel“ 14/600 als `<p>` (keine Überschrift); Links 14/400 `#62626E`, `min-height: 44px`, Hover `#17171C`. Mobil `<details>` geschlossen, `summary` 16/600 min. 48 px mit `Plus` 20 px wie `FaqList`.
- **Szene (optional, D-15):** Frontmatter `scene: <id>` ∈ `sceneById`; `figure` mit `Frame` (Browser: Breite 100 %, max. 560 px; Phone: `width={194}`, linksbündig), darunter `IllustrationLabel kind="vereinfacht"`; 48 px Abstand zur Prosa; statisch, kein `FeatureSnippet` in Artikeln.
- **FAQ (optional, D-16):** H2 „Häufige Fragen“ (`id="faq"`, Prosa-H2-Stil), `FaqList answerMax={300}` (3–8) + FAQPage aus demselben Array; 48 px über der H2. Keine FAQ-Frage darf zusätzlich als Überschrift in der Prosa stehen.
- **Quellen:** H2 „Quellen“ (`id="quellen"`, 20/600 Clash), 1 px `#DEDEE3` oben, 24 Innenabstand, 48 Abstand; `<ol aria-label="Quellen">`, Einträge 14/400 `#62626E`: „{label}, geprüft am {TT.MM.JJJJ}“, Label als Link (`#17171C`, unterstrichen), gleicher Tab.
- **Reservierte ids:** `antwort`, `faq`, `quellen`, `funktionen`, `weiterlesen` – keine Prosa-Überschrift darf per `rehype-slug` eine davon erzeugen (Test).
- **Danach** (außerhalb von `<article>`): „Passende Funktionen“ (`id="funktionen"`, nur bei `relatedFeatures` ≥ 1): `FeatureCard`-Raster 1–3 mit Karten-Szene, Lead „Diese Funktionen setzen das Thema des Artikels in CraftOS um.“ (61) → „Weiterlesen“ (`id="weiterlesen"`, nur bei `relatedArticles` ≥ 1): `LinkKarten columns={2}` 1–4, Label „Ratgeber“/„Hilfe“, Lead „Diese Artikel führen das Thema weiter.“ (38) → `CtaBand` (Copy § 5).
- Semantik: `<article aria-labelledby="artikel-titel">` umfasst Kopf, Prosa, FAQ und Quellen; Schema unverändert `Article` (Ratgeber) bzw. `TechArticle` (Hilfe), FAQPage nur für sichtbare Frontmatter-FAQ, **kein HowTo** (D-16).

### 2.3 Prosa v2 (`.article-prose`, G10)

| Element | Festlegung |
|---|---|
| Absatz | 16/400/1.5, `#17171C`, `max-width: 68ch`, Abstand 16 |
| H2 | 32/600 Clash, Zeilenhöhe 1.1, `#17171C`, oben 48 (erste H2 0), unten 16, `hyphens: auto` |
| H3 | 20/600 Clash, Zeilenhöhe 1.25, oben 32, unten 8 |
| Punktliste | `disc`, Marker `#777782`, Einzug 24, Eintragsabstand 8 |
| Nummerierte Liste | oberste Ebene = Schrittliste (§ 2.4); verschachtelt `decimal`, Einzug 24 |
| Tabelle | Rehype umhüllt jede Tabelle mit `<div class="table-scroll" role="region" tabindex="0" aria-label="Tabelle: {Text der vorhergehenden H2}">`; Rahmen 1 px `#DEDEE3`, Radius 16, `overflow-x: auto`; `th` 14/600 auf `#F7F3EB`, `td` 16/400, Zellinnenabstand 16, Zeilenlinien 1 px `#DEDEE3`; volle Spaltenbreite |
| Zitat (Hinweis) | `#F7F3EB`, linke Kante 3 px `#E7DCC9`, Innenabstand 16/24, Text 16/400 `#17171C` |
| Link | `#784B10`, Unterstrich 1 px, Offset 4 px; Hover `#17171C`; Fokus 3 px `#BB7609` |
| `strong` / Inline-`code` | 600 / 16 px General Sans auf `#F7F3EB`, Radius 6, Innenabstand 0 4 |
| `hr` | 1 px `#DEDEE3`, Abstand 48 |
| Bilder | keine (Test: kein `<img` in der Prosa; Visual nur über `scene`) |

### 2.4 Schrittliste (Maßketten-Optik, H1, reines CSS)

- Gilt für `.article-prose > ol` (oberste Ebene). Rehype setzt `role="list"` (WebKit entfernt sonst die Listensemantik bei `list-style: none`).
- `ol`: `list-style: none; counter-reset: schritt; padding: 0; margin: 24px 0`.
- `li`: `position: relative; counter-increment: schritt; padding: 8px 0 24px 56px; min-height: 40px` (letzter Eintrag `padding-bottom: 0`); Text 16/400/1.5, max. 68ch.
- Knoten `li::before`: `content: counter(schritt) / ""` (für Screenreader stumm, die Liste nennt die Position), 40 × 40 px, `clip-path: polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)`, Fläche `#F2AF38`, Ziffer 14/600 `#17171C`, `tabular-nums`, links oben.
- Maßlinie `li:not(:last-child)::after`: `left: 15px; top: 48px; bottom: 8px; width: 10px; border-block: 2px solid #F2AF38;` senkrechte 2-px-Linie mittig – identisch zu `StepFlow` < 1024 px. In allen Breiten senkrecht.
- Jede Liste beginnt bei 1 (kein `start`-Attribut, Test); 2–10 Schritte; längere Abläufe unter Zwischenüberschriften teilen („… in der Web-App“, „… in der Mobile-App“).

### 2.5 Gliederung der Inhalte (D-13, Vorgabe für die Inhaltspakete)

| Typ | Reihenfolge der H2 (wörtlich, wo angegeben) |
|---|---|
| Hilfe | Frontmatter `answer` → „Voraussetzungen“ (Punktliste: Rolle/Lizenz, Plattform) → „Schritt für Schritt“ bzw. „Schritt für Schritt in der Web-App“ / „Schritt für Schritt in der Mobile-App“ (Schrittliste) → „Ergebnis prüfen“ → „Häufige Probleme“ mit H3-Fragen und Antwort ≤ 300 direkt darunter |
| Ratgeber | Frontmatter `answer` → Frage-H2 mit Antwort ≤ 300 direkt darunter → Beispiel/Tabelle → wo sinnvoll Schrittliste → „So unterstützt CraftOS“ (nur Belegtes, Link auf Detailseite bzw. Hilfeartikel) → Quellen aus Frontmatter `sources` |
| Wissensseiten (Paket g) | wie Ratgeber; „Vorlage“-Keywords als sichtbare Tabelle bzw. Checkliste in der Prosa, keine Downloads (D-23) |

---

## 3. Übersichten `/blog`, `/hilfe` und Kategorieseiten (D-17)

| Seite | # | Abschnitt | Fläche | Baustein | Inhalt |
|---|---|---|---|---|---|
| `/blog`, `/hilfe` | 0 | Kopf | Warm | `ContentKopf` | Eyebrow „Ratgeber“/„Hilfe“, H1 (Map), `answer` (§ 5), Stand-Zeile „{n} Artikel, zuletzt aktualisiert am {d}“ bzw. „{n} Anleitungen, …“ |
| | 1 | Themen (`id="themen"`) | Weiß | `LinkKarten surface="warm" columns={3}` | H2 „Themen im Ratgeber“ / „Themen der Hilfe“; Lead § 5; je Kategorie: Icon-Feld (Tabelle unten), Titel = Kategoriename, Meta „{n} Artikel“ bzw. „{n} Anleitungen“ („1 Anleitung“) |
| | 2 | Alle (`id="alle"`) | Warm | `ContentSearch` (Ergebnisse als `LinkKarten surface="white"`) | H2 „Alle Ratgeber“ / „Alle Anleitungen“, Lead „Suchen Sie nach einem Begriff oder filtern Sie nach Thema.“; Karte: Label = Kategorie, Titel, `description`, Meta „{n} Min. Lesezeit“ |
| | 3 | Abschluss | dunkel | `CtaBand` | § 5 |
| Kategorie | 0 | Kopf | Warm | `ContentKopf` ohne `answer` | Eyebrow „Ratgeber“/„Hilfe“, H1 (Map, z. B. „Hilfe: Rechnungen“), Stand-Zeile „{n} Anleitungen in diesem Thema, zuletzt aktualisiert am {d}“ [ERMESSEN A7] |
| | 1 | Artikel (`id="alle"`) | Weiß | `ContentSearch initialCategory` (Karten `surface="warm"`) | H2 „Alle Ratgeber zu {Kategorie}“ / „Alle Anleitungen zu {Kategorie}“ (≤ 39), Lead „Suchen Sie nach einem Begriff oder wechseln Sie das Thema.“ |
| | 2 | Weitere Themen (`id="themen"`) | Warm | `LinkKarten surface="white"` (übrige Kategorien) | H2 „Weitere Themen im Ratgeber“ / „Weitere Themen der Hilfe“, Lead „Wählen Sie ein anderes Thema.“ |
| | 3 | Abschluss | dunkel | `CtaBand` | § 5 |

**`ContentSearch` v2 (funktionsgleich):** Felder „Artikel suchen“ und „Themenbereich“ (Labels 14/600, 8 darüber); ≥ 768 px `grid-template-columns: 1fr 280px`, Lücke 16; Eingabe und Auswahl `min-height: 48px`, Weiß, 1 px `#777782`, Radius 6, Innenabstand 0 16 (Suchfeld links 48 für Icon `Search` 20 px `#62626E`); Statuszeile `role="status"` 14/400 `#62626E`, 24 darüber und darunter; Kartentitel sind `h3` (bisher `h2`). Leerer Zustand: Karte im Kartenstil mit `<h3>` und Text-Button „Suche zurücksetzen“ (16/600, unterstrichen, `min-height: 44px`); `btn-secondary` entfällt.

**Kategorie-Icons (Lucide, in 0.475.0 geprüft):** Ratgeber – rechnungen `Receipt`, kalkulation `Calculator`, softwareauswahl `ListChecks`, belege `Wallet`, projekte `FolderKanban`, team `Users`. Hilfe – einrichtung `Settings2`, angebote `FileText`, rechnungen `Receipt`, belege `Wallet`, projekte `FolderKanban`, zeiten `Clock`, lager `Warehouse`, baudokumentation `Camera`, craft-ai `Sparkles`. Ablage als Feld neben `categories` in `lib/content-types.ts` (Fundament).

---

## 4. Textbudgets (Zeichen inkl. Leerzeichen; Prüfung beim Rendern bzw. per Vitest)

| Ort | Feld | Budget |
|---|---|---|
| Gewerk | `answer` | ≤ 300, 1–2 Sätze |
| | `teaser` | ≤ 100, genau 1 Satz |
| | Ablauf | 4–5 Schritte; Titel ≤ 28, Text ≤ 80 und 1 Satz |
| | Beispiel | Titel ≤ 40, Text ≤ 200, ≤ 2 Sätze |
| | Funktionen | 4–6 (Ziel 6), ≥ 1 Phase-7-Slug |
| | FAQ | 3–4; Frage ≤ 90 mit „?“, Antwort gesamt ≤ 300 |
| | Weiterlesen | 2–3 bestehende Artikel |
| Köpfe | H1 | Gewerke ≤ 60 (`pageHead.h1`); Artikel/Übersicht/Kategorie ≤ 100 (`artikel.h1`), neue Map-Einträge ≤ 70 |
| | Antwort `#antwort` | ≤ 300, 1–2 Sätze; Ziel ≤ 240 |
| | Eyebrow | ≤ 24 |
| Artikel | Frontmatter `answer` | ≤ 300, 1–2 Sätze (Welle 1–2 optional, ab Integration Pflicht, D-18) |
| | Frontmatter `faq` | 3–8; Frage ≤ 90 mit „?“, Antwort ≤ 300 |
| | Prosa-Überschrift H2/H3 | ≤ 80 (heute max. 73, 10 von 310 H2 > 60); neue Überschriften ≤ 70 |
| | Antwort unter Frage-Überschrift | erster Absatz direkt darunter ≤ 300, beantwortet im ersten Satz |
| | Schritt (Listeneintrag oberste Ebene) | ≤ 160 (heute max. 154), eine Handlung |
| | Schrittliste | 2–10 Einträge (heute max. 8) |
| | Passende Funktionen / Weiterlesen | 1–3 / 1–4 |
| Karten | `LinkKarten` | Label ≤ 24, Titel ≤ 100, Text ≤ 160, Meta ≤ 32 |
| Abschnittsköpfe | H2 / Lead / Antwort-Lead | ≤ 60 / ≤ 140, 1 Satz / ≤ 300, 1–2 Sätze [05, 08] |
| CTA-Band | Titel / Satz / Button | ≤ 40 / ≤ 80 / ≤ 28 [05] |

---

## 5. Copywriting Contract

Unverändert aus [05]–[08]: „Sie“, Satzschreibung, aktive Verben, keine Ausrufezeichen, keine Füllwörter, keine Superlative, nicht-live Funktionen nirgends angekündigt; Preise, Testtage und Credits nur per Vorlage aus `lib/site.ts`.

**Leitlinie L-1 (Inhaber, 22.10.2026, verbindlich für alle Phase-9-Texte):** Die Website nennt nur, was unterstützt wird. Keine Negativlisten nicht unterstützter Formate, Versionen oder Funktionen. Was der Nutzer für die Bedienung wissen muss, steht positiv als Voraussetzung oder Ablauf:

| Statt (verboten) | So (Muster aus [R]) |
|---|---|
| „keine Onlinezahlung im Portal“ | „Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto auf dem Rechnungs-PDF.“ |
| „keine vollständige Offline-Zusage“ | „Fotos laden Sie mit Internetverbindung hoch; Zeiten und Berichte werden ohne Netz vorgemerkt und später übertragen.“ |
| „Abschlags- und Schlussrechnungen mahnt die Automatik nicht“ | „Automatische Mahnungen gelten für normale Rechnungen.“ |
| „keine autonom verbuchende KI“ | „KI-Vorschläge holen Sie auf Anforderung; die Zuordnung bestätigen Sie selbst.“ |
| „GAEB 90 und GAEB 2000 werden nicht unterstützt“ / „DATANORM v5 nicht zugesagt“ | „Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 und 3.3 einlesen, Angebote als X84 abgeben.“ / „DATANORM 4 und DATANORM 5 einlesen.“ |

- **Wortliste (Test, Wortgrenzen, alle Phase-9-Texte inkl. `lib/gewerke.ts` und Markdown):** „nicht unterstützt“, „verspricht keine“, „verspricht nicht“, „nicht zugesagt“, „nicht pauschal“, „keine Onlinezahlung“, „keine vollständige“, „DATANORM v5“, „vorbereitete Leistungsvorlagen“, „Mit vorbereiteten Leistungsvorlagen“. Fachneutrale Wissensabschnitte (z. B. GAEB-Formatübersicht auf `/blog/gaeb-formate`) dürfen D83/GAEB 90 erklären; der CraftOS-Abschnitt nennt nur X83/X84 (Orchestrator-Entscheidung 1).
- **FAQ-Fragen** so wählen, dass die Antwort Unterstütztes nennt („Wie bezahlen Kunden Rechnungen aus dem Portal?“ statt „Können Kunden online bezahlen?“); erster Satz beantwortet direkt mit Wert, Name oder „Ja.“.
- **Begriffe:** „Web-App“, „Mobile-App“, „Voll-Lizenz“ (Admin oder Büro), „App-Lizenz“, „Credits“; Rollen nur „Admin“, „Büro-Leitung“, „Büro-Projektleitung“, „Mobil-Teamleitung“, „Mobil-Teammitglied“; „Arbeitsabschnitte“ als Produktbegriff, „Bauphasen“ nur als Suchbegriff („Bauphasen, in CraftOS Arbeitsabschnitte“); „Geräte & Fahrzeuge“ statt „Ressourcen“; Bankabgleich nie „automatisch“.
- **Bedienbegriffe** in „…“ exakt wie im Release (Belegpfad in `docs/content-pruefung/09-<paket>.md`); Menüpfade „Buchhaltung → Belege → Eingangsbelege“ – „→“ nur in zitierten Pfaden.
- **Schritte:** je Schritt eine Handlung im Sie-Imperativ („Öffnen Sie …“, „Tippen Sie …“ mobil, „Klicken Sie …“ Web); das Ergebnis steht unter „Ergebnis prüfen“, nicht im Schritt.
- **Gewerke-Texte:** nur am Release belegte Funktionen; Beispieldaten fiktiv („Familie Weber“); kein „vorbereitete Leistungsvorlagen“ (Orchestrator-Entscheidung 5); Beleg für Gewerke-Abfrage: Einrichtung [R].

| Element | Copy |
|---------|------|
| Primary CTA | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta`, Icon `ArrowUpRight` – Gewerke-Köpfe und alle CTA-Bänder |
| Sekundärlink Kopf | Gewerk: „So läuft ein Auftrag“ → `#ablauf` · `/gewerke`: „Zu den Gewerken“ → `#gewerke` · Artikel/Übersichten: keiner |
| CTA-Band Gewerke | „Testen Sie CraftOS mit Ihrem Auftrag“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ / „Preise ansehen“ → `/preise` |
| CTA-Band Ratgeber (Artikel, `/blog`, Kategorien) | „Machen Sie Platz für Ihr Handwerk.“ / Satz wie oben / „Stundensatz berechnen“ → `/rechner/stundensatz` |
| CTA-Band Hilfe (Artikel, `/hilfe`, Kategorien) | „Machen Sie Platz für Ihr Handwerk.“ / Satz wie oben / „Support kontaktieren“ → `/support` |
| Antwort `/blog` | „Der CraftOS-Ratgeber erklärt Rechnungen, Kalkulation, Belege, Projekte und Teamarbeit im Handwerk mit Beispielen und Quellen. Jeder Artikel beantwortet seine Frage zuerst und zeigt dann das Vorgehen.“ (199) |
| Antwort `/hilfe` | „Die CraftOS-Hilfe führt Schritt für Schritt durch Web-App und Mobile-App, von der Einrichtung über Angebote und Rechnungen bis zu Zeiten, Lager und Baudokumentation. Suchen Sie nach einer Aufgabe oder wählen Sie ein Thema.“ (222) |
| Lead Themen | Ratgeber „Wählen Sie ein Thema, um nur die passenden Artikel zu sehen.“ (60) · Hilfe „Wählen Sie ein Thema, um nur die passenden Anleitungen zu sehen.“ (64) |
| Inhaltsverzeichnis | Label „In diesem Artikel“; mobil `summary` „Inhalt dieses Artikels“; `nav aria-label` „Inhaltsverzeichnis“ |
| Szene/Snippet-Kennzeichnung | „Vereinfachte Darstellung mit Beispieldaten“ [05] |
| Quellen | H2 „Quellen“; Eintrag „{label}, geprüft am {TT.MM.JJJJ}“ |
| Empty state heading | „Kein passender Artikel gefunden.“ (Suche ohne Treffer, `ContentSearch`) |
| Empty state body | „Versuchen Sie einen kürzeren Suchbegriff oder wählen Sie alle Themen.“ + Text-Button „Suche zurücksetzen“ (setzt Suchbegriff und Thema zurück) |
| Error state | Keine Laufzeitfehler für Besucher (statisch; unbekannter Pfad → bestehende 404). Build-/Testfehler nennen Problem und Abhilfe: „Gewerk {slug}: Ablauf hat {n} Schritte – 4 bis 5 erforderlich.“; „Gewerk {slug}: Schritt ‚{titel}‘ verlinkt {funktion}, das nicht unter funktionen steht – Slug ergänzen oder Schritt ändern.“; „Gewerk {slug}: {n} Funktionen – 4 bis 6 erforderlich, davon mindestens eine Phase-7-Detailseite.“; „Gewerk {slug}: Artikel {pfad} fehlt – nur bestehende Artikel verlinken.“; „Artikel {slug}: Szene ‚{id}‘ ist unbekannt – nur IDs aus sceneById verwenden.“; „Artikel {slug}: Bild im Text gefunden – Screenshots sind nicht erlaubt, Szene per Frontmatter nutzen.“; „Artikel {slug}: Schritt {n} hat {m} Zeichen – höchstens 160, Schritt teilen.“; „Artikel {slug}: Schrittliste mit {n} Einträgen – 2 bis 10, unter Zwischenüberschriften aufteilen.“; „Artikel {slug}: Überschrift ‚{h}‘ hat {n} Zeichen – höchstens 80.“; „Artikel {slug}: FAQ-Frage ‚{q}‘ steht auch als Überschrift im Text – nur an einer Stelle beantworten.“; „Artikel {slug}: Überschrift erzeugt die reservierte id ‚{id}‘ – Überschrift umbenennen.“; „Text {pfad} enthält ‚{wort}‘ – nur Unterstütztes nennen (Leitlinie L-1).“; Antwort-zuerst-Fehlertext wörtlich aus [08] § 2 |
| Destructive confirmation | Keine destruktiven Aktionen in dieser Phase (statische Marketing- und Wissensseiten ohne Konten, Formulare oder Löschfunktionen). |

---

## 6. Abstände und Raster je Breite

Container [BESTAND]: < 768 px `calc(100% - 36px)`, sonst `min(1280px, calc(100% - 64px))`.

| Breite | Container | Abschnitt oben/unten | Kopf: oben → Brotkrumen → Eyebrow; unten | `LinkKarten` / `FeatureCard` | Gewerke-Ablauf | Artikel |
|---|---|---|---|---|---|---|
| 360 | 324 | 48 | 8 → 44 → 16; 48 | 1 Spalte, Lücke 16, Innen 16 | `StepFlow` senkrecht; Beispiel → 32 → Snippet (324) | eine Spalte 324; Inhaltsverzeichnis `details`; H1 28 px |
| 390 | 354 | 48 | wie 360 | wie 360 | wie 360 | eine Spalte 354; H1 32 px |
| 768 | 704 | 64 | 16 → 44 → 24; 64 | 2 Spalten, Lücke 24, Innen 24 | senkrecht; Beispiel → 32 → Snippet (max. 640) | eine Spalte max. 704; `details` |
| 1024 | 960 | 96 | 24 → 44 → 32; 64 | 3 Spalten (`columns={2}`: 2), Lücke 24 | `StepFlow` waagerecht (4–5 gleich breite Spalten); Beispiel `1fr` (272) + 48 + Snippet 640 | Artikel 632 + 48 + Inhaltsverzeichnis 280 sticky |
| 1280 | 1216 | 96 | wie 1024 | wie 1024 | Beispiel 528 + 48 + Snippet 640 | Artikel 720, Inhaltsverzeichnis 280 rechtsbündig |
| 1440 | 1280 | 96 | wie 1024 | wie 1024 | Beispiel 592 + 48 + Snippet 640 | wie 1280 |

Abschnittskopf → Inhalt 48 ab 768, 32 darunter [05]. Kein horizontaler Seitenscroll in keiner Breite; einziger eigener Scrollbereich sind Markdown-Tabellen.

---

## 7. Barrierefreiheit

- **Überschriften:** genau eine H1 je Seite (Map); Abschnitte und Prosa-Abschnitte H2; Karten, Schritte, Beispielkachel, Prosa-Unterabschnitte H3; „In diesem Artikel“ ist keine Überschrift; keine Ebene übersprungen (Artikel ohne H2 mit H3 → Test).
- **Landmarks:** `nav[aria-label="Brotkrumen"]` ([08]), `nav[aria-label="Inhaltsverzeichnis"]`, `section[aria-labelledby]` je Abschnitt, `<article>` für den Artikel, `ul[role="list"][aria-label]` für `LinkKarten`.
- **Listen:** Schrittliste `ol[role="list"]`, Ziffern per `content: counter(schritt) / ""` stumm (Position liefert die Liste); `StepFlow` wie [05].
- **Tabellen:** Scrollbereich `role="region"`, `tabindex="0"`, `aria-label="Tabelle: {H2}"`, Fokusring sichtbar; `th` als Spaltenköpfe (GFM).
- **Visuals:** Szenen und Snippet als `figure` mit Kennzeichnung; Mini-UI `aria-hidden` + `inert` [05]; `GewerkIcon` und Kategorie-Icons dekorativ (`alt=""` bzw. `aria-hidden`). Keine Fotos, keine Screenshots, keine Videos (D-02).
- **Tastatur/Touch:** ein Tabstopp je Karte (gestreckter Link); Brotkrumen, Inhaltsverzeichnis-Links, Text-Button und `summary` ≥ 44 px hoch; Fokusring 3 px `#BB7609`, Offset 4 px; Reihenfolge Skip-Link → Header → Brotkrumen → Kopf → Inhalt.
- **Kontrast:** alle Textpaare ≥ 4,5:1 (Werte § Color), Rahmen von Eingabefeldern ≥ 3:1; `#777782` nie für Text.
- **Bewegung:** einzig `FeatureSnippet` auf Gewerke-Seiten (reduziert: Endzustand, keine laufende Animation); sonst nur Hover 150 ms und FAQ-Symbol [05]; `prefers-reduced-motion` ohne laufende Animationen.
- **Sprache:** `lang="de"` [BESTAND]; Silbentrennung nur in Artikel-H1 und Prosa-H2.
- **Stabilität:** CLS = 0 (Rahmen mit fester `aspect-ratio`, Piktogramme mit `width`/`height`); LCP = H1 (keine Bilder im Kopf).

---

## 8. Prüfkriterien für Tests und seo-audit (nur lokal, globale Regel 5)

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Gewerke-Daten | Vitest `tests/gewerke.test.ts` (neu, (a)) | Budgets § 4; `ablauf[].funktion` ∈ `funktionen`; ≥ 1 Phase-7-Slug; höchstens 1 gemeinsame FAQ-Frage über 12 Gewerke; `heroTitle`, `heroIntro`, `hatVorlagen` existieren nicht; H1 === `zielwerte(pfad).h1` und enthält den Kopfwort-Span § 1.3; „zwölf“ = `gewerke.length`; `artikel`-Ziele existieren |
| Inhalte | Vitest `tests/content.test.ts` (Fundament, Integration) | Frontmatter `answer`/`faq`/`scene` gemäß § 4 (`answer` ab Integration Pflicht); `scene` ∈ `sceneById`; kein `<img` und kein `ol[start]` in der Prosa; Schritt ≤ 160, 2–10 je Liste; Überschriften ≤ 80; reservierte ids frei; FAQ-Frage nicht zugleich Überschrift; Map-H1 ≤ 100 |
| Produktwahrheit und L-1 | Vitest `tests/content-produktwahrheit.test.ts` (neu, Fundament) | Wortliste § 5 und Altbegriffe aus [R] (u. a. „Neue Phase“, „Ressourcen verwalten“, „Finanzen sichtbar“, „Admin-Lizenz“, „Büro-Lizenz“) in 0 Dateien unter `content/`, `lib/gewerke.ts` |
| Bausteinbudgets | Vitest `tests/design-v2-budgets.test.ts` (Sammeltest erweitert) | `LinkKarten`, `ContentKopf`, 12 Gewerke-Seiten, `/gewerke`, `/blog`, `/hilfe` im Budget; Fehlertexte § 5 |
| Antwort zuerst | `node scripts/seo-audit.mjs --only=antwort` (Regel auf `/gewerke*`, `/blog/*`, `/hilfe/*` ausgedehnt, `tests/seo-audit-core.test.ts` Z. 361–366) | Pakete: 0 Verstöße für eigene `--paths`; Integration: sitewide 0 |
| Metadaten, Brotkrumen, OG, Schema | `node scripts/seo-audit.mjs` | Title ≤ 60, Description 120–155, genau 1 H1 = Map, keine Duplikate; genau 1 `nav[aria-label="Brotkrumen"]` + 1 BreadcrumbList; FAQPage nur und genau mit sichtbarer FAQ (Gewerke, Artikel mit `faq`); `Article`/`TechArticle` unverändert; kein `HowTo`; eigenes `og:image` je Seite |
| Prompt-Anker | Vitest `tests/ai-prompts.test.ts` + Audit-Regel `prompts` | `/gewerke/elektriker#antwort`, `/gewerke/maler#antwort` vorhanden, Text ≤ 300 und nennt das Gewerk |
| Links | `node scripts/route-audit.mjs` | 0 Fehler, 0 defekte Links (Gewerke-„Weiterlesen“, Artikel-Querverweise, Kategorie-Karten) |
| Gewerke-Snippet | Playwright `function-illustrations.pw.cjs` (Gewerke-Fälle ab Z. 341, unverändert) | grün in 360/390/768/1024/1440 |
| Darstellung | Playwright `design-v2.pw.cjs` (neue Fälle, Integration) für `/gewerke`, `/gewerke/elektriker`, `/gewerke/allrounder`, `/blog`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen` in **360, 390, 768, 1024, 1280, 1440** | kein horizontaler Seitenscroll; H1 `scrollWidth ≤ clientWidth`; Kopfwort-Span ≤ Container; 360 × 640: Gewerke-CTA-Unterkante ≤ 640, Artikel-Antwort-Unterkante ≤ 640; `StepFlow` waagerecht ab 1024, darunter senkrecht; Inhaltsverzeichnis `details` < 1024, sticky ≥ 1024; Schrittliste zeigt Knoten 40 × 40 |
| A11y, Bewegung, CLS | axe (`wcag2a`, `wcag2aa`, `wcag21aa`), `emulateMedia({ reducedMotion: "reduce" })`, `PerformanceObserver` | keine serious/critical in allen sechs Breiten; reduziert keine laufende Animation; CLS 0 |
| Medien | Vitest/Audit | Gewerke-, Übersichts- und Artikelseiten ohne Rasterbild; einzige `img` sind `/icons/gewerke/*.svg` mit `alt=""`; `/gewerke` ohne `werkstatt-2026` (`tests/media-ki-label.test.ts` angepasst) |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; nur Inspiration über `21st_magic_component_inspiration` (in dieser Sitzung nicht verfügbar), kein übernommener Code | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten: keine [R]. Rehype-Schritte (`role="list"`, Tabellen-Hülle) als eigene Funktion in `lib/content.ts` nach `rehype-sanitize`, ohne neues Paket.

---

## Annahmen ohne Inhaberrückfrage ([ERMESSEN], Inhaber „mach einfach“)

| # | Entscheidung | Begründung |
|---|---|---|
| A1 | `werkstatt-2026` entfällt auf `/gewerke` | D-02 (nur Code-Visuals), D-09 überlässt die Wahl; Datei bleibt erhalten. |
| A2 | Gewerkbeispiel sitzt im Ablauf neben dem Snippet (H4) | Gleicher Auftrag wie der Snippet; kein Text-only-Abschnitt. |
| A3 | Drei Map-H1 gekürzt (§ 1.3) | `FunktionsKopf` verlangt ≤ 60 für Above-the-fold; Hauptkeyword bleibt im H1. |
| A4 | Eyebrow „Gewerke“ statt Gewerkname | Namen bis 31 Zeichen > Eyebrow-Budget 24; Name steht in H1 und Brotkrumen. |
| A5 | Kein CTA im Artikelkopf | Leser kommen mit einer Frage; CTA steht im CTA-Band am Ende. |
| A6 | Inhaltsverzeichnis mobil eingeklappt | Text und Antwort zuerst, Navigation auf Wunsch. |
| A7 | Kategorieseiten ohne eigene Antwort, mit Stand-Zeile | Keine Frage-Überschriften; datengetrieben ohne 15 neue Texte. |
| A8 | Prosa 16/1.5 statt 17/1.8 | Vier Größen [05]; 1.5 erfüllt WCAG 1.4.12. |
| A9 | Hilfe-CTA-Band mit „Support kontaktieren“ | Leser der Hilfe sind meist Kunden; ersetzt den bisherigen Hinweisblock. |
| A10 | Ziel 6 Funktionen je Gewerk | [R]-Tabelle liefert 6 je Gewerk; volles 3×2/2×3-Raster. |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
