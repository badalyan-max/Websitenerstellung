---
phase: 08
slug: seo-und-ki-sichtbarkeit
status: approved
reviewed_at: 2026-10-22
shadcn_initialized: false
preset: none
created: 2026-10-22
---

# Phase 08 — UI-Designvertrag: SEO und KI-Sichtbarkeit

> Schlanker Vertrag für den Brotkrumen-Baustein (sitewide), die Antwort-zuerst-Regel, die Vorlage der vier Alternativen-Seiten, `/preise` answer-first, den v2-Umbau von `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`, die neue Seite `/vergleich/handwerkersoftware-kleine-betriebe` und die einheitliche OG-Grafik. Erstellt vom gsd-ui-researcher am 22.10.2026, Prüfung durch gsd-ui-checker.

**Grundsatz:** Die genehmigten Verträge **[05]** (`05-UI-SPEC.md`, „Werkbank-Präzision“), **[06]** und **[07]** gelten **unverändert**: Gestaltungsrichtung, Tokens, Typoskala inkl. 28-px-Ausnahme (A2/B1), Farben und Amber-Liste, Fokusring, Abstände inkl. 96-px-Ausnahme, Textbudgets, Bausteinverträge, Bewegungsregeln, Barrierefreiheit, Header 74/84 px, `FunktionsKopf` [07 F1]. Dieser Vertrag legt nur Phase-8-Spezifisches fest. Jede Abweichung steht in § „Abweichungen“ (C1–C12) mit Begründung.

**Quellenkennzeichnung:** [D-xx] = `08-CONTEXT.md` (verbindlich), [R] = `08-RESEARCH.md`, [05]/[06]/[07] = genehmigte Verträge, [BESTAND] = vorhandener Code, [ENTWURF] = `craftos/docs/entwuerfe/*`, [KASKADE] = Design-Kaskade unten, [ERMESSEN] = Entscheidung im Rahmen von „Claude's Discretion“.

**Faktenquellen (ausschließlich):** CraftOS: `lib/site.ts` (`site.trialDays`, `site.checkedAt`, `site.ctaUrl`, `tarife`, `zahlung`, `speicherPool`, `extraSpeicher`, `startCredits`, `creditUmrechnung`, `creditPakete`), `lib/funktionen.ts`, `lib/product-register.ts`, `docs/product-pricing-snapshot.json`, neue Konstante `vertrag` (Quelle AGB § 5) [R]. Wettbewerber: **nur** `lib/wettbewerber/{plancraft,craftnote,hero,tooltime}.ts` mit `quelle` + `abgerufenAm` je Angabe [D-01, D-04]. Alle Zahlen, Daten, Testtage und Preise in diesem Dokument sind **Lesehilfe** (Stand Wettbewerber 22.10.2026, CraftOS 20.10.2026) und werden im Code aus diesen Modulen per Vorlage eingesetzt, nie als Literal (Pitfalls 1, 2, 6 [R]).

**Zählnachweis:** Alle Titel, Descriptions, H1, Antworten, Leads, Tabellenzeilen/-zellen, Kennzahlen, Schritte, Kacheln, Passt-Punkte, FAQ und CTA-Texte dieses Vertrags wurden am 22.10.2026 per Node gezählt (`Array.from(s).length`, Satzregel `sentenceCount` aus `components/v2/budgets.ts`): **544 Prüfungen, alle im Budget**; nach Einarbeitung der Checker-Hinweise P1–P5/F1–F6 am selben Tag **55 weitere Prüfungen** der geänderten und neu ausgeschriebenen Texte, alle im Budget. Skripte (nicht versioniert, der Budget-Test im Plan ersetzt sie): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/p8ui/count.cjs` und `count2.cjs`; Kopfwort-Messung `measure08.cjs` (Playwright-Chromium, `setContent`, kein Server). Längen stehen in Klammern; das vollständige Überschriften- und Lead-Verzeichnis steht in § 9.

---

## Design-Kaskade (Projekt-CLAUDE.md)

### 1. frontend-design (Leitlinie gelesen, nicht kopiert)

Gelesen: `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/f359d43b4060/skills/frontend-design/SKILL.md`; alle sieben Cache-Stände (`315c4e48967d`, `8bd00f08f0b0`, `a0b04d9ddcca`, `b78ac49cdc6b`, `e68e375d2286`, `ea10b213686c`, `f359d43b4060`) sind per MD5 `7d6df6b2…6afd0` byte-identisch mit dem in [05]–[07] gelesenen Stand. Kein Skill-Werkzeug in dieser Sitzung; Anwendung auf die freien Achsen von Phase 8:

| Leitlinie | Anwendung Phase 8 |
|---|---|
| „Visual structure is information“ | Brotkrumen sind reine Ortsangabe: eine Zeile, kleinste Schriftstufe, keine Fläche, kein Rahmen. Vergleichstabellen tragen Quellen und Stand als Pflichtteil, nicht als Fußnotendekor. |
| „Spend your boldness in one place“ | Auf Vergleichs- und Preisseiten ist das markante Element die **Tabelle mit belegten Zahlen**; Köpfe ohne Geräterahmen, keine Amber-Fläche, keine Verläufe. |
| „Meta strings joined with middle dots“, „→ an Links“, „ALL-CAPS-Labels“ | Bestands-OG („Handwerkersoftware · Made in Germany“ in Versalien, „Angebot → Rechnung“-Pillen, Amber-Verlaufswort) wird ersetzt; Brotkrumen-Trenner ist ein Icon, kein „·“/„>“/„/“-Text. |
| „Accenting a single word in a headline“ | OG-Titel einfarbig; kein Verlaufswort mehr (Bestand `app/opengraph-image.tsx`). |
| „Write from the end user's perspective … describe what something is“ | Jede Frage-Überschrift wird im ersten Satz direkt beantwortet (Antwort-zuerst); Vergleichstexte nennen Wortlaut und Zahlweise der Anbieter statt Wertungen. |
| „Treat failure and emptiness as moments for direction“ | Fehlende Wettbewerberbelege führen nicht zu „k. A.“-Zellen, sondern die Zeile entfällt; Build-Fehler nennen Problem und Abhilfe (Copywriting). |

### 2. ui-ux-pro-max (ausgeführt am 22.10.2026, lokal)

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas comparison alternative page pricing" --domain ux
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "breadcrumb navigation seo" --domain ux
# ergänzend:
py -3.12 -X utf8 .../search.py "comparison table pricing faq" --domain landing
```

| Treffer | Übernommen? | Umsetzung / Begründung |
|---|---|---|
| Image Optimization (High) | Ja | Keine Rasterbilder auf den Umbauseiten; Wettbewerberlogos entfallen (D-02); OG-PNG ≤ 300 KB, Ziel < 100 KB. |
| Active State (Medium) | Ja | Letztes Brotkrumen-Glied `aria-current="page"`, Gewicht 600, ohne Unterstreichung; Header-Bereich bleibt wie [06]. |
| Sticky Navigation darf Inhalt nicht verdecken (Medium) | Ja | Anker-H2 behalten `scroll-margin-top: 100px` [BESTAND `SectionHeader.module.css`]; In-Page-Links `#vergleich`, `#kriterien`, `#lizenzen`. |
| Breadcrumbs „nur ab 3+ Ebenen, nicht für flache Seiten“ (Low) | **Nein, bewusst überstimmt** | D-07/D-22/SEO-05 verlangen sichtbare Brotkrumen auf allen indexierten Seiten außer `/`, also auch auf Ebene 2 (`Start › Preise`). Abweichung C1. Die frühere Verwerfung in [06] beruhte genau auf diesem Treffer. |
| Back Button vorhersagbar (High, mobil) | Ja | Brotkrumen sind normale Links, kein `pushState`; In-Page-Anker ändern nur den Hash. |
| Landing-Muster „Comparison Table + CTA“: Tabelle Produkt vs. Wettbewerber, eigene Spalte hervorheben (#FFFACD/grün), „Free trial“ in Preiszeile | Teilweise | Übernommen: Tabelle früh auf der Seite, CraftOS-Spalte warm mit 3-px-Amber-Oberkante [05 §7]. **Verworfen:** Gelb/Grün-Hervorhebung (gesperrte Marke, neutral ohne Rot/Grün [D-03]), Testhinweis in Tabellenzellen (Testphase ist eigene, belegte Zeile). |
| Landing-Muster „Pricing Page + CTA“: Preiskarten mit CTA je Karte, „Most popular“-Badge, Jahresrabatt 20–30 % | Teilweise | Übernommen: Reihenfolge Antwort → Preise → Vergleich → FAQ → CTA. **Verworfen:** CTA je Karte und „Beliebt“-Badge (unbelegt), Rabattzahl außer den belegten „rund 17 %“ aus `zahlung`. |

### 3. 21st.dev

**Nicht verfügbar** – `21st_magic_component_inspiration` steht in dieser Sitzung nicht als Werkzeug bereit; keine Referenzen abgerufen oder behauptet. Executor: falls verfügbar, nur `21st_magic_component_inspiration` mit „breadcrumb“, „comparison table competitor“, „pricing table answer“, „og image template“; nie `_builder`/`_refiner`; Ergebnis in `craftos/docs/DESIGN-V2.md` § 17 „Kaskade Phase 8“ vermerken.

### 4. Context7

Nicht aufgerufen. Ersatz wie [06]/[07]: mitgelieferte Doku `craftos/node_modules/next/dist/docs` (Next 16.3.4), bereits in [R] ausgewertet: `opengraph-image.md` (statisch bei `generateStaticParams`, `params` als Promise, Schriften per `readFile`), `generate-metadata.md` (Datei-OG hat Vorrang vor `metadata.openGraph`, `twitter:image` nicht). Keine offenen API-Fragen.

### 5. SEO-Check

Siehe § 8 „SEO-Vertrag“ (Map-Änderungen, Schema je Seite, Anker) und § 2 „Antwort zuerst“.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System `craftos/app/globals.css` + CSS-Module [05, 06, 07] |
| Preset | not applicable |
| Component library | none – v2-Bausteine `craftos/components/v2/*` (React Server Components, kein Client-JS) |
| Icon library | `lucide-react` 0.475.0 [BESTAND] |
| Font | Seiten: Clash Display + General Sans über `next/font/local` [05]. OG-Grafiken: gebündelte `Geist-Regular.ttf` (400) aus `next/dist/compiled/@vercel/og`, keine Markenschrift [D-21] |
| Neue Dateien | `components/v2/Breadcrumbs.tsx` (+ `.module.css`), `lib/breadcrumbs.ts`, `components/v2/FitPanels.tsx` (+ `.module.css`), `components/v2/FactList.tsx` (+ `.module.css`), `components/vergleich/AlternativePage.tsx`, `lib/wettbewerber/*`, `lib/og.tsx` (vereinheitlicht `pageOg`), `opengraph-image.tsx` je Segment [R Empfohlene Struktur] |

### Ergänzungen (nur diese sieben, budgetgeprüft)

| # | Baustein | Ergänzung | Begründung |
|---|---|---|---|
| G1 | `FunktionsKopf` [07 F1] | (a) `visual?` optional – ohne Visual einspaltig, Textspalte max. 800 px; (b) `answer?: string` (≤ 300, 1–2 Sätze) ersetzt `lead`, rendert `<p id="antwort" data-answer>`; (c) `stand?: string` (Label-Zeile); (d) rendert `Breadcrumbs` als erste Zeile (G6). Fehler, wenn `lead` und `answer` gleichzeitig gesetzt sind. | D-03/D-05: Antwortsatz direkt unter der H1; Vergleichs-/Preisseiten haben keine belegte Produktszene im Kopf. Ein Kopf-Baustein statt eines zweiten. |
| G2 | `SectionHeader` [05 §1] | Endet `title` mit „?“, ist `lead` die Antwort: Budget **≤ 300 Zeichen, 1–2 Sätze**, Attribut `data-answer`; sonst unverändert ≤ 140, genau 1 Satz. | D-09/SEO-06: Antwort ≤ 300 direkt unter jeder Frage-H2; 140 reicht für Preis- und Vergleichsantworten nicht. |
| G3 | `ComparisonTable` [05 §7] | Neue Props `sources: { anbieter: string; label: string; url: string; abgerufenAm: string }[]` (gerendert als `<ol aria-label="Quellen zur Tabelle">` unter `note`) und `disclaimer?: string` (Zeile unter der Quellenliste). Marktübersichten ohne `highlight`. Zellbudget **unverändert 24** auch für Wettbewerberzellen. | D-02/D-04: Quelle und Abrufdatum je Angabe sichtbar; Zellbudget bleibt Prüfanker (Pitfall 4 [R]). |
| G4 | `FitPanels` (neu) | Zwei gleichrangige Panels „Wann {Anbieter} passt“ / „Wann CraftOS passt“ (Vertrag § 3.5). | D-02 Fairness, D-03 „Für wen passt was“; kein Bestandsbaustein stellt zwei gleichwertige Listen nebeneinander. Wiederverwendet auf `/gobd` (Zuständigkeiten). |
| G5 | `FactList` (neu) | Begriff-/Definitionsliste `<dl>` für `/fakten-ueber-craftos` (Vertrag § 5.2). | Ersetzt die Altliste mit gekürzten Texten; Bento würde 12 Fakten auf 7 Kacheln zwingen. |
| G6 | `Breadcrumbs` (neu) | Sichtbare Brotkrumen + BreadcrumbList aus einer Quelle (§ 1). | D-07, D-22, SEO-05. |
| G7 | `pageOg` (`lib/og.tsx`) | Eine OG-Vorlage für alle Seitentypen (§ 7); ersetzt `articleOg` und die Root-Sondergrafik. | D-08, D-21. |

**`TEXT_BUDGET`-Erweiterung (`components/v2/budgets.ts`):** `answer: 300`, `sectionHeader.answerLead: 300`, `faq.answerCentral: 300`, `fitPanel: { title: 40, point: 100 }`, `factList: { term: 32, definition: 200 }`, `og: { title: 90 }`, `crumb: { name: 32 }` (nur Zwischenglieder); Mengen `count.fitPoints: { min: 2, max: 4 }`, `count.factList: { min: 6, max: 12 }`, `count.crumbs: { min: 2, max: 4 }`.

---

## Spacing Scale

Unverändert aus [05]/[06]/[07] (alle Werte Vielfache von 4):

| Token | Value | Usage in Phase 8 |
|-------|-------|-------|
| xs | 4px | Begriff → Definition in `FactList` < 768 px |
| sm | 8px | Abstand Brotkrumen-Glied ↔ Trenner (je Seite), Antwort → Stand-Zeile, Abstand Quellen-Einträge, Icon ↔ Text in Passt-Punkten |
| md | 16px | Panel-Innenabstand < 768 px, Panel-Lücke < 768 px, Passt-Punkte untereinander, Titel → Liste im Panel, Zeilen-Innenabstand `FactList`, Note → Quellenliste |
| lg | 24px | Panel-Innenabstand und Panel-Lücke ≥ 768 px, Spaltenlücke `FactList` ≥ 768 px, Brotkrumen → Eyebrow/H1 768–1023 px, Stand-Zeile → CTA |
| xl | 32px | Brotkrumen → Eyebrow/H1 ≥ 1024 px |
| 2xl | 48px | Abschnittskopf → Inhalt ≥ 768 px, Abschnittsabstand < 768 px [05] |
| 3xl | 64px | Kopf unten ohne Visual ≥ 768 px, Abschnittsabstand 768–1023 px [05] |

**Kopf mit Brotkrumen (G1/G6, verbindlich):**

| Breite | Kopf oben → Brotkrumen-Zeile (44 px) → Eyebrow/H1 | Kopf unten ohne Visual |
|---|---|---|
| < 768 | 8 → 44 → 16 | 48 |
| 768–1023 | 16 → 44 → 24 | 64 |
| ≥ 1024 | 24 → 44 → 32 | 64 (mit Visual unverändert 96 [07]) |

Exceptions: unverändert aus [05]/[06]/[07]. **OG-Grafik** ist ein Bild, keine Seitenfläche: Innenabstand 72 px, Logo 56 px, Amber-Kante 12 px (alle Vielfache von 4) gelten nur dort. **Keine neuen Ausnahmen** für Seiten.

---

## Typography

Unverändert aus [05]/[06]/[07]: vier Größen (14/16/20/Display), zwei Gewichte (400/600). Keine neue Größe auf Seiten.

| Role | Size | Weight | Line Height | Einsatz in Phase 8 |
|------|------|--------|-------------|-------------------|
| Label | 14px | 400 / 600 | 1.4 | 400: Brotkrumen-Links, Stand-Zeile, Tabellen-Note, Quellenliste, Disclaimer, Quellen-Link in Passt-Punkten. 600: aktuelles Brotkrumen-Glied, Eyebrow „Vergleich“/„Preise“/„Fakten“/„Craft AI“/„GoBD“ |
| Body | 16px | 400 / 600 | 1.5 | 400: Antwortsatz < 768 px, Passt-Punkte, `FactList`-Definition, FAQ-Antwort. 600: `FactList`-Begriff, FAQ-Frage, CTA, Textlinks |
| Heading | 20px | 600 (Clash) / 400 (General Sans, Lead/Antwort) | 1.25 / 1.4 | 600: Panel-Titel (h3), Tabellen-Caption. 400: Lead bzw. Antwort-Lead der Abschnittsköpfe, Antwortsatz im Kopf ≥ 768 px |
| Display | `clamp(32px, 4vw, 48px)`, 32 px < 768 px, **H1 im Kopf < 400 px: 28 px** ([07] B1, gilt für G1 ohne Visual ebenso) | 600 | 1.1 | H1, H2, KeyFacts-Werte, CTA-Band |

**Regeln:** H1 `hyphens: manual`, Kopfwort-Span `nowrap` wie [07].

**Kopfwort-Messung (22.10.2026, Clash Display 600, `letter-spacing: -0.025em`, `text-wrap: balance`, `public/fonts/clash-display-600.woff2`; Span-Breite in px / Zeilen; Container 324 @ 28 px bei 360, 354 @ 32 px bei 390, 732 @ 32 px bei 768, 456 @ 40,96 px bei 1024, 616 @ 48 px bei 1440 – ohne Visual ist die Textspalte bis 800 px breit, die Werte sind also der ungünstigste Fall):**

| Seite | Kopfwort-Span | 360 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|---|
| plancraft | „plancraft-Alternative“ | 284,7 / 3 | 325,4 / 3 | 325,4 / 1 | 416,5 / 3 | 488,0 / 2 |
| Craftnote | „Craftnote-Alternative“ | 293,3 / 4 | 335,2 / 4 | 335,2 / 2 | 429,1 / 4 | 502,8 / 2 |
| HERO (verworfen, P1) | „HERO-Software-Alternative“ | **375,9 > 324** | **429,6 > 354** | 429,6 / 1 | **549,9 > 456** | **644,4 > 616** |
| HERO (verbindlich) | „HERO-Software“ | 214,0 / 2 | 244,5 / 3 | 244,5 / 1 | 313,0 / 3 | 366,8 / 2 |
| ToolTime | „ToolTime-Alternative:“ | 292,3 / 2 | 334,1 / 2 | 334,1 / 1 | 427,6 / 2 | 501,1 / 2 |
| `/vergleich`, kleine Betriebe, `/preise` | „Handwerkersoftware“ | 294,5 / 3 | 336,6 / 3 | 336,6 / 1–2 | 430,9 / 3 | 504,9 / 3 |
| Fakten | „CraftOS“ | 109,9 / 1 | 125,6 / 1 | 125,6 / 1 | 160,8 / 1 | 188,5 / 1 |
| Craft AI | „Handwerk:“ | 147,5 / 3 | 168,5 / 3 | 168,5 / 2 | 215,8 / 3 | 252,8 / 3 |
| GoBD | „GoBD-konforme“ | 221,6 / 3 | 253,2 / 4 | 253,2 / 2 | 324,1 / 4 | 379,8 / 3 |

Alle verbindlichen Spans passen in jeder Breite, `scrollWidth` = Containerbreite. Bei HERO folgt auf den Span „-Alternative im Vergleich“ ohne Leerzeichen; der Umbruch nach dem Bindestrich von „Software-“ ist zulässig und gemessen ohne Überlauf. Höchstens 4 H1-Zeilen bei 360 px (Craftnote). Antwortsatz max. 60ch. Zahlen `tabular-nums`. Keine Großbuchstaben, keine Einzelwort-Hervorhebung. **OG-Typografie** (Bild, nicht Seitenskala, Geist 400): Seitentyp 28 px, Titel 72/64/52 px (Zeilenhöhe 1.1), Wortmarke 40 px, Fußzeile 24 px (§ 7).

---

## Color

Unverändert aus [05]/[06]/[07]:

| Role | Value | Usage in Phase 8 |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` | Seitenhintergrund, weiße Abschnitte, Passt-Panels auf Warmfläche, Tabellen |
| Secondary (30%) | `#F7F3EB` (warm), `#101014` (dunkel) | Warm: abwechselnde Abschnitte, CraftOS-Tabellenspalte, `FactList`-Abschnitt, heller Kopf von Ratgeber/Hilfe/Rechner. Dunkel: Seitenköpfe, CTA-Band, OG-Fläche |
| Accent (10%) | `#F2AF38` | nur die Liste unten |
| Destructive | `#B32F28` | nicht verwendet (keine destruktiven Aktionen; „Nein“ in Tabellen neutral `Minus` [05]) |

**Accent reserved for** (Teilmenge [05]; einzige Erweiterung C6):
1. Hintergrund des Haupt-CTA „10 Tage kostenlos testen“ (Kopf, CTA-Band) bzw. „10 Tage testen“ (Header).
2. Sechseck-Knoten und Maßlinie der `StepFlow` (`tone="light"`; keine Amber-Fläche in Phase 8).
3. `CraftOSMark`/Header-Logo ([06] A3) und Markenzeichen in der OG-Grafik.
4. Obere Kante (3 px) der CraftOS-Spalte in Vergleichstabellen mit `highlight` (Alternativen-Seiten, `/preise` Voll-Lizenz).
5. Eyebrow-Text auf dunklen Köpfen und **Seitentyp-Label der OG-Grafik** (Amber auf `#101014`, ≈ 10:1).
6. Untere Kante (3 px) des Seitenkopfs [05 Punkt 6] und **untere Kante (12 px) der OG-Grafik** (C6).

**Brotkrumen-Farben:**

| Zustand | dunkler Kopf (`#101014`) | heller Kopf (`#F7F3EB` / Weiß) |
|---|---|---|
| Link | `#BCBCC6`, Unterstrich 1 px, Offset 4 px (≈ 9:1) | `#62626E`, Unterstrich 1 px, Offset 4 px (≈ 5,5:1 / 6,1:1) |
| Hover (`hover: hover`) | `#F4F4F5` | `#17171C` |
| Aktuell (`aria-current`) | `#F4F4F5`, 600, kein Unterstrich | `#17171C`, 600, kein Unterstrich |
| Trenner `ChevronRight` 16 px | `#777782` (Dekor, `aria-hidden`) | `#777782` (Dekor) |
| Fokus | `3px solid #BB7609`, Offset 4 px [05] | wie links |

Nicht erlaubt: Amber für Brotkrumen, Amber/Grün/Rot in Tabellenzellen, Wettbewerberfarben oder -logos, Verläufe in OG-Grafiken.

---

## Abweichungen zu [05]/[06]/[07] (ausdrücklich gekennzeichnet und begründet)

| # | Stelle | [05]/[06]/[07] sagt | Phase 8 legt fest | Begründung |
|---|---|---|---|---|
| C1 | [06] Kaskade Z. 61, `DESIGN-V2.md` § 12 (Z. 267–272) | Sichtbarer Breadcrumb verworfen, nur BreadcrumbList-Schema | **Sichtbare Brotkrumen auf allen indexierten Seiten außer `/`** (§ 1), dezent als erste Zeile im Seitenkopf, v2-Stil | D-07/D-22, SEO-05 („sichtbare Breadcrumbs“). Die Verwerfung stützte sich auf ui-ux-pro-max „erst ab 3 Ebenen“; SEO-05 ist eine gesperrte Anforderung. `DESIGN-V2.md` erhält § 17 mit Verweis auf C1, § 12 wird als „aufgehoben durch Phase 8“ markiert. |
| C2 | [05 §1] Lead | genau 1 Satz, ≤ 140 | Bei Frage-H2: Antwort-Lead ≤ 300, 1–2 Sätze (G2) | D-09/SEO-06; die 300-Zeichen-Regel stammt aus der Projekt-CLAUDE.md. |
| C3 | [05 §10] FAQ-Antwort | erster Satz ≤ 300, gesamt ≤ 600 | Auf zentralen Seiten (D-09: Start, Preise, Vergleich, Alternativen, kleine Betriebe, Funktionen, Fakten, App, Craft AI, GoBD, Detailseiten) **gesamt ≤ 300** (`answerMax`) | Das Post-Build-Audit misst das erste `<p>` nach der Frage; `FaqList` rendert die ganze Antwort in einem `<p>` [R]. Bestand erfüllt das bereits (150–272 Zeichen). |
| C4 | [07 F1] `FunktionsKopf` | Visual Pflicht, Lead ≤ 110 | Visual optional, `answer` ≤ 300 statt Lead, `stand`, Brotkrumen (G1) | D-03/D-05; Kopf bleibt ein Baustein. Above-the-fold-Rechnung § 3.1. |
| C5 | [05 §7] `ComparisonTable` | CraftOS-Spalte hervorgehoben | Marktübersichten (Zeilen = Anbieter) **ohne** Hervorhebung; Quellenliste und Disclaimer als Teil des Bausteins (G3) | Neutraler Marktüberblick (UWG § 6, D-02); Hervorhebung nur, wo CraftOS als Spalte gegenübersteht. |
| C6 | [05] Amber-Liste | Punkte 1–9 | Ergänzt Punkt 5/6 um Seitentyp-Label und 12-px-Unterkante der **OG-Grafik** | Die OG-Grafik ist die Abbildung des Seitenkopfs; gleiche Funktion wie Eyebrow (Punkt 5) und Kopf-Unterkante (Punkt 6). Keine neue Verwendung auf Seiten. |
| C7 | [05] Font | Clash Display + General Sans | OG-Grafiken nur Geist Regular 400 (gebündelt), Hierarchie über Größe und Farbe | D-21; Markenschriften liegen nur als WOFF2 vor, Satori liest kein WOFF2 [R Pitfall 9]; keine Konvertierung. |
| C8 | [05] Seitenrezept „Alternativen/Vergleich“ | `SectionHeader` → `ComparisonTable` → `FaqList` → `CtaBand` | Kopf (Antwort) → Tabelle → Kosten (`KeyFacts`) → Für wen (`FitPanels`) → Umstieg (`StepFlow`) → FAQ → `CtaBand` | D-03 (gesperrt). Regel „kein Baustein zweimal hintereinander“ bleibt erfüllt. |
| C9 | [05 §4] `KeyFacts` | Werte aus CraftOS-Quellen | Auf Alternativen-Seiten auch Wettbewerberwerte (Rechenbeispiel), nur aus `lib/wettbewerber/*`, Annahmen in der Note | D-01/D-04; § 5 UWG verlangt offengelegte Rechenwege [R]. |
| C10 | Bestand `CalculatorPage` / [R] Pattern 2 | `aria-label="Brotkrümelnavigation"`, Glied „CraftOS“ | `aria-label="Brotkrumen"`, Glied „Start“, sitewide ein Baustein | Auftrag des Orchestrators; „Start“ ist bereits Schema-Konvention in `breadcrumbSchema`-Aufrufen [BESTAND]. Audit (`seo-audit.mjs`) und Live-Check prüfen `nav[aria-label="Brotkrumen"]`. |
| C11 | Bestand `ArticlePage` | Rücklink oberhalb der Eyebrow | entfällt, ersetzt durch Brotkrumen (`tone="light"`) | Doppelte Navigation an derselben Stelle. |
| C12 | Bestand `/vergleich` | `ProviderLogo` (Craftnote-PNG, plancraft-SVG), `lib/comparison.ts` Stand 09.09.2026 | Keine Logos; Daten aus `lib/wettbewerber/*` | D-02 (keine Logos ohne Recht), Pitfalls 5/13 [R]. `media-budget`-Ausnahme und `announcements.test.ts` werden im selben Plan angepasst. |

---

## 1. Brotkrumen-Baustein `Breadcrumbs` (G6, D-07, D-22)

```ts
interface Crumb { name: string; path: string }             // path ohne Origin
interface BreadcrumbsProps { items: Crumb[]; tone: "dark" | "light"; schema?: boolean } // schema Standard true
// lib/breadcrumbs.ts: crumbsFor(path, current?: string): Crumb[] – einzige Quelle für UI und JSON-LD
```

**Aufbau (Server Component, kein Client-JS):**
```
<nav aria-label="Brotkrumen" data-tone="dark">
  <ol>
    <li><a href="/">Start</a><ChevronRight 16 aria-hidden/></li>
    <li><a href="/vergleich">Vergleich</a><ChevronRight 16 aria-hidden/></li>
    <li><span aria-current="page">plancraft-Alternative</span></li>
  </ol>
</nav>
<JsonLd data={breadcrumbSchema(items)} />   ← dieselben items, nur wenn schema !== false
```

| Eigenschaft | Festlegung |
|---|---|
| Position | **Erste Zeile im Seitenkopf**, vor Eyebrow und H1, innerhalb `.site-container` (dunkle Köpfe: `FunktionsKopf`, `HomeHero` nicht, `PageHero` [BESTAND] bis zur Migration; helle Köpfe: `ArticlePage`, `ContentIndex`, `CalculatorPage`). Seiten ohne Kopf (Rechtsseiten): erste Zeile des ersten Inhaltscontainers, `tone="light"`. Nie im Layout/Header. |
| Typo | Label 14 px, 400 (Links) / 600 (aktuell), Zeilenhöhe 1.4, General Sans |
| Trenner | `ChevronRight` 16 px, `#777782`, `aria-hidden="true"`, 8 px Abstand je Seite; kein Text-Trenner |
| Zeilenhöhe/Touch | `<ol>` `display: flex; align-items: center; min-height: 44px`; jeder Link `inline-flex`, `min-height: 44px`; das kurze Glied „Start“ zusätzlich `min-width: 44px; justify-content: center` (F6), damit das Touch-Ziel ≥ 44 × 44 px auch ohne Trenner-Abstand erreicht wird |
| Mobil (< 768 px) | **eine Zeile, kein Umbruch**: Zwischenglieder `flex: none`; nur das letzte Glied `min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap` (voller Text bleibt im DOM und im Schema). Kein horizontaler Scroll bei 360 px. |
| Fokus | `3px solid #BB7609`, Offset 4 px; Tab-Reihenfolge: Skip-Link → Header → Brotkrumen → Kopf |
| Schema | **Genau eine BreadcrumbList je Seite**, erzeugt vom Baustein. Alle bisherigen `breadcrumbSchema`-Aufrufe (`FunktionsDetail`, `ArticlePage`, `ContentIndex`, `app/app`, `app/funktionen`, `app/gewerke/[slug]`) und Inline-Varianten (Rechner, `/vergleich` `@graph`) entfallen im selben Plan [R Pitfall 10]. Gliederzahlen bleiben (Detailseite 3, `/app` 2). |
| Namen | Zwischenglieder ≤ 32 Zeichen (Tabelle unten). Letztes Glied: Kurzname laut Tabelle bzw. Datenname (`funktion.name`, `gewerk.name`, Artikel-`title`, Kategoriename). |
| Ausnahmen | `/` (kein Baustein, keine BreadcrumbList), `/styleguide` (noindex, kein JSON-LD [05]; zeigt den Baustein nur als Muster mit `schema={false}`), `app/not-found.tsx` (404). |
| Fehler | „Breadcrumbs: Pfad {path} hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.“; „Breadcrumbs: {n} Glieder – 2 bis 4 erlaubt.“ |

**Ketten (verbindlich, `lib/breadcrumbs.ts`):**

| Pfad | Kette |
|---|---|
| `/funktionen`, `/funktionen/[slug]` | Start › Funktionen (› {Funktionsname}) |
| `/app` | Start › Mobile-App |
| `/preise` | Start › Preise |
| `/vergleich` | Start › Vergleich |
| `/vergleich/{plancraft,craftnote,hero,tooltime}-alternative` | Start › Vergleich › plancraft-Alternative / Craftnote-Alternative / HERO-Alternative / ToolTime-Alternative |
| `/vergleich/handwerkersoftware-kleine-betriebe` | Start › Vergleich › Für kleine Betriebe |
| `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` | Start › Fakten zu CraftOS / Craft AI / GoBD |
| `/gewerke`, `/gewerke/[slug]` | Start › Gewerke (› {Gewerk}) |
| `/blog`, `/blog/kategorie/[c]`, `/blog/[slug]` | Start › Ratgeber (› {Kategorie} bzw. › {Artikeltitel}) |
| `/hilfe`, `/hilfe/kategorie/[c]`, `/hilfe/[slug]` | Start › Hilfe (› {Kategorie} bzw. › {Artikeltitel}) |
| `/rechner`, `/rechner/{stundensatz,angebotskalkulation}` | Start › Rechner (› Stundensatz / Angebotskalkulation) |
| `/support`, `/impressum`, `/datenschutz`, `/agb` | Start › Kontakt / Impressum / Datenschutz / AGB |

---

## 2. Antwort-zuerst-Regel (D-09, SEO-06, Projekt-CLAUDE.md)

**Inhaltsregel:** Jede Überschrift, die eine Frage ist (H2/H3 oder FAQ-`summary` mit „?“), hat **unmittelbar danach** ein `<p>` mit **≤ 300 Zeichen**, das die Frage im ersten Satz direkt beantwortet: beginnt mit „Ja.“/„Nein.“/„Teilweise.“, dem gesuchten Wert oder dem Namen; kein „siehe unten“, keine Gegenfrage, kein Marketingsatz davor. Erst danach folgen Tabelle, Kacheln oder Details.

**Bausteinregel:**

| Ort | Umsetzung | Budget |
|---|---|---|
| Seitenkopf | `FunktionsKopf answer` → `<p id="antwort" data-answer>` direkt nach `<h1>` (Prompt-Ziel `#antwort`) | ≤ 300, 1–2 Sätze |
| Frage-H2 | `SectionHeader` mit `title` auf „?“ → `lead` ist die Antwort (`data-answer`), `id` an der H2 | ≤ 300, 1–2 Sätze (G2) |
| FAQ | `FaqList answerMax={300}` auf zentralen Seiten; FAQPage-JSON-LD aus **demselben Array** | Frage ≤ 90, Antwort gesamt ≤ 300 (C3) |
| Nicht-Frage-H2 | unverändert [05] | Lead ≤ 140, 1 Satz |

**Prüfung:** `scripts/lib/seo-audit-core.mjs` `answerFirstViolations(html, 300)` [R Code-Beispiel] über alle zentralen Seiten im Build-HTML; Prompt-Mapping-Test prüft je Phase-8-Ziel die Anker-`id` und die Antwort darunter. Fehlertext: „Antwort zuerst: Frage ‚{q}‘ auf {path} hat keine Antwort ≤ 300 Zeichen direkt darunter – ersten Absatz kürzen oder vorziehen.“

---

## 3. Vorlage Alternativen-Seiten (SEO-03, D-01–D-04, D-16)

`components/vergleich/AlternativePage.tsx`, vier statische Ordner `app/vergleich/{slug}-alternative/` (+ `opengraph-image.tsx`). Alle Wettbewerberwerte aus `lib/wettbewerber/{slug}.ts`.

### 3.1 Abschnittsfolge (verbindlich, für alle vier gleich)

Flächenrhythmus: Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel. Abschnitte 1–5 = `<section aria-labelledby>` + `SectionHeader` (ohne Eyebrow) + genau ein Baustein.

| # | Abschnitt | Fläche | Baustein | H2-`id` | Inhalt |
|---|---|---|---|---|---|
| 0 | Kopf | `#101014`, Unterkante 3 px Amber | `FunktionsKopf` ohne Visual (G1) | – | Brotkrumen, Eyebrow „Vergleich“, H1 (Map), `answer` (`#antwort`), Stand-Zeile, CTA + Sekundärlink „Zur Vergleichstabelle“ → `#vergleich` |
| 1 | Vergleich | Weiß | `ComparisonTable` (CraftOS `highlight`, Wettbewerber) + Quellen + Disclaimer (G3) | `vergleich` | Tabelle § 3.6 |
| 2 | Kosten | `#F7F3EB` | `KeyFacts` (4) | `kosten` | Frage-H2 „Was kostet {Name} im Vergleich zu CraftOS?“ + Antwort; Rechenbeispiel 1 Person Büro + 4 Baustelle |
| 3 | Für wen | Weiß | `FitPanels` (G4) | `fuer-wen` | Frage-H2 „Für wen passt {Name}, für wen CraftOS?“ + Antwort |
| 4 | Umstieg | `#F7F3EB` | `StepFlow tone="light"` (4 Schritte) + Textlink „Mehr zur Datenübernahme“ → `/funktionen/datenuebernahme` | `umstieg` | Frage-H2 „Wie wechseln Sie von {Name} zu CraftOS?“ + Antwort |
| 5 | FAQ | Weiß | `FaqList answerMax={300}` (4–5) + FAQPage | `faq` | H2 „Häufige Fragen zur {Name}-Alternative“ |
| 6 | Abschluss | `#101014` | `CtaBand` | – | „Testen Sie CraftOS mit Ihrem Auftrag“ (36) |

**Kopf, Stand-Zeile:** Label 14/400 `#BCBCC6`, 8 px unter der Antwort: „Anbieterangaben Stand {stand}, Quellen unter der Tabelle“ (59). Antwort im Kopf: 16/400 < 768, 20/400 ≥ 768, Farbe `#F4F4F5`, max. 60ch.

**Above-the-fold 360 × 640 (ungünstigster Fall, gemessen höchstens 4 H1-Zeilen):** 74 Header + 8 + 44 Brotkrumen + 16 + 20 Eyebrow + 24 + H1 124 (4 Zeilen × 30,8) + 16 + Antwort 192 (8 Zeilen × 24) + 8 + Stand 20 + 24 + CTA 48 = **618 px** ≤ 640 → Prüfung: CTA-Unterkante ≤ 640, kein horizontaler Scroll (Playwright, 360/390/768/1024/1440).

**Verlinkung:** von `/vergleich` (Bento „Einzelvergleiche“) und Footer (neue Spalte „Vergleiche“, § 8). Seiten untereinander nicht verlinkt (vermeidet Linkkette ohne Nutzen).

### 3.2 UWG-sichere Formulierungsregeln (D-02, § 5/§ 6 UWG [R])

| # | Regel | Prüfung |
|---|---|---|
| U1 | Nur Angaben mit `quelle.url` (https, Herstellerdomain) und `abgerufenAm`; unbelegt = Zeile/Satz entfällt (kein „k. A.“, kein „Nein“ für Wettbewerber ohne Quellenaussage) | Vitest `wettbewerber.test.ts` |
| U2 | Jede Zahl mit Bezug: netto, je Monat/Jahr, Zahlweise, Paket („74,90 € (Business)“) | Review + Zellformat § 3.3 |
| U3 | Statt-Preise nur im Wortlaut des Anbieters („49,90 € statt 69,90 €“), ohne eigene Deutung als „Aktion“ oder „Rabatt“ (F4); Erstjahrespreise mit „1. Vertragsjahr“; Preise späterer Jahre nur als „regulär derzeit …“, nie als Zusage (Formulierungen „danach {Preis}“ und „ab Jahr 2 {Preis}“ verboten, P4); „ab“-Preise nur, wo der Anbieter „ab“ schreibt (P3) | Vitest: Felder `stattPreis`/`ersterJahrespreis`/`regulaerDerzeit` erzwingen den Zusatz; Wortliste ergänzt um „Aktionspreis“; Preisfelder mit Folgejahrbezug nur über `regulaerDerzeit` |
| U4 | Interpretationsbedürftiges als Wortlaut in „…“ („E-Rechnungsfähig“) | Review |
| U5 | Rechenbeispiele nennen Annahmen, Rechenweg, nicht enthaltene Posten und „Die Pakete unterscheiden sich im Funktionsumfang.“ | Note-Pflichtsatz, Vitest |
| U6 | Stärken des Wettbewerbers: mindestens 2 belegte Punkte im Panel „Wann {Name} passt“ und mindestens 1 Tabellenzeile, in der der Wettbewerber etwas bietet, das CraftOS nicht anbietet | Vitest (Zählung) |
| U7 | Verbotene Wortliste (Wortgrenzen `\b…\b`, damit „Umsatzsteuer“/„Steuerberatung“ nicht anschlagen): „besser als“, „billiger als“, „günstiger als“, „die beste“, „Testsieger“, „Nr. 1“, „führend“, „Marktführer“, „veraltet“, „teuer“, „versteckte Kosten“, „Abzocke“, „fehlt“, „im Gegensatz zu“, „schlechter“, „umständlich“ – in allen Vergleichs-, Preis- und Kleine-Betriebe-Texten | Vitest |
| U8 | Keine Logos/Bildmarken; Namen in Anbieterschreibweise: „plancraft“, „Craftnote“, „HERO“, „ToolTime“ | Vitest + Media-Budget |
| U9 | Keine nicht-live CraftOS-Funktionen und keine Ankündigungen (PROD-04): „Telefon-Agent“, „MCP-Server“, „angekündigt“, „geplant“ entfallen ersatzlos [R Pitfall 3]; neutrale „Nein“-Zelle für CraftOS ist zulässig | `announcements.test.ts`, `route-audit.mjs`, `live-check.mjs` |
| U10 | Externe Quellenlinks `rel="nofollow"`, gleicher Tab, Linktext = Quelle-Label | Vitest |
| U11 | HERO-Preise nur mit Screenshot-Beleg beider Umschalterstellungen (D-16): Feld `hero.preiseBelegt = { screenshotMonatlich, screenshotJaehrlich, datum } | null`; `null` → überall **Variante B** (ohne HERO-Zahlen) | Vitest + `checkpoint:human-verify` |
| U12 | Wettbewerbertage, -preise und -fristen nur per Vorlage aus Datenfeldern (Testphasen-Scan, `oldTrial`, Preisliteral-Test [R Pitfalls 1, 2, 6]); Ausnahme `lib/wettbewerber/` im Scan, CraftOS-Texte bleiben streng geprüft (D-23) | `pricing-parity.test.ts`, `route-audit.mjs` |

**Pflichthinweis (Note der Tabelle, wörtlich):** „Angaben ohne Gewähr, Stand {stand}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand {site.checkedAt}.“
**Disclaimer (Zeile unter der Quellenliste, wörtlich):** „Die Nennung von {Name} dient der Zuordnung; es besteht keine Geschäftsbeziehung.“ (Marktübersichten: „Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.“)

### 3.3 Zellformate (Wettbewerber- und CraftOS-Zellen)

| Typ | Format | Beispiel |
|---|---|---|
| belegt enthalten / nicht enthalten | `true` / `false` → `Check` / `Minus` + sr-only „Ja“/„Nein“ [05]; `false` beim Wettbewerber nur, wenn die Quelle das ausdrücklich sagt | – |
| Preis | „{Betrag} €“ + optional „({Paket/Lizenz})“ | „74,90 € (Business)“ (18) |
| „ab“-Preis | „ab {Betrag} €“ + optional „({Plan})“ | „ab 69 € (Select)“ (16) |
| Statt-Preis / Erstjahr | Wortlaut „{Preis} statt {Preis}“ bzw. „{Betrag} € (1. Jahr)“ | „49,90 € statt 69,90 €“ (21) |
| Zusatzmodul | „Zusatzmodul“; Preis mit Bezug („je Tracker und Monat, im ersten Jahr, jährliche Abrechnung“) nur in Note oder Panel (P2) | „Zusatzmodul“ (11) |
| Wortlaut | „„{Zitat}““ | „„E-Rechnungsfähig““ (18) |
| Kurzangabe | Satzschreibung, ohne Schlusspunkt | „Premium, sonst Modul“ (20) |
| Keine Angabe beim Anbieter (nur Marktübersicht) | „nicht angegeben“ (einzige erlaubte Platzhalterform) | – |
| HERO Variante B | „laut hero-software.de“ (21) | – |

**Zellbudget:** jede Zelle ≤ 24 Zeichen (unverändert [05], auch Wettbewerber); Zeilenbeschriftung ≤ 48; max. 12 Zeilen; Zusatz, der nicht passt, gehört in die Zeilenbeschriftung („Bürozugang, Jahresabo je Monat“), nicht in eine Fußnote.
**Quellenliste (G3):** gruppiert nach Anbieter, je Eintrag „{Anbieter}: {Label}, abgerufen am {TT.MM.JJJJ}“ mit Link auf `quelle.url`; Label 14/400 `ink-500`, Links unterstrichen, 8 px Abstand, 16 px unter der Note. Jede `quelle` einer gerenderten Zelle muss in der Liste stehen (Vitest).

### 3.4 Kosten-Abschnitt (`KeyFacts`, C9)

4 Werte; Note (Pflicht, wörtlich nach Muster): „Annahme: 1 Person im Büro, 4 auf der Baustelle. CraftOS: 1 Voll-Lizenz + 4 App-Lizenzen. {Name}: {Zusammenstellung}. Nicht enthalten: {Posten}. Die Pakete unterscheiden sich im Funktionsumfang. Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet. Netto, Stand {stand}.“ Werte im Datenmodul berechnet.

**Rundungsregel (F1, verbindlich):** Alle Monatswerte aus Jahresbeträgen werden **exakt in Cent aus der Summe der Jahresbeträge** berechnet und erst am Ende kaufmännisch auf Cent gerundet (`Math.round(summeJahrCent / 12)`), nie als Summe bereits gerundeter Einzelwerte. Beispiel: (299,50 € + 4 × 99,50 €) ÷ 12 = 697,50 € ÷ 12 = 58,125 € → **58,13 €** (die Summe der gerundeten Tabellenwerte 24,96 € + 4 × 8,29 € ergäbe 58,12 €). Jede Stelle mit einem so berechneten Wert trägt den Hinweis „rechnerisch, auf Cent gerundet“ (Tabellenzeile „Jahresabo je Monat, rechnerisch“, KeyFacts-Note „Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet.“). Ein gemeinsamer Helfer `monatAusJahr()` in `lib/site.ts` bzw. `lib/wettbewerber/` wird für Tabelle, KeyFacts, FAQ und Antwortsätze genutzt; Vitest prüft 58,13 € an allen Stellen.

### 3.5 `FitPanels` (G4)

```ts
interface FitPoint { text: string; quelle?: Quelle }      // genau 1 Satz ≤ 100; Wettbewerberpunkte: quelle Pflicht
interface FitPanel { title: string; points: FitPoint[] }  // title ≤ 40; 2–4 Punkte
interface FitPanelsProps { label: string; panels: [FitPanel, FitPanel] } // [Wettbewerber, CraftOS]
```
- Zwei `<article>` in einer Liste; ≥ 768 px zwei gleich breite Spalten (Lücke 24), darunter gestapelt (Lücke 16). **Wettbewerber links/zuerst**, beide Panels identisch gestaltet (Fairness): Weiß auf Warmfläche, 1 px `#E7DCC9`, Radius 16, Innenabstand 24 / 16.
- Titel h3 Heading 20/600 `ink-900`; Liste 16 px darunter; Punkte Body 16/400 `ink-900`, Icon `Check` 16 px `ink-900` davor (8 px), 16 px zwischen Punkten; Quellen-Link „Quelle“ Label 14/400 `ink-500` hinter dem Satz, `rel="nofollow"`.
- Keine Amber-, Grün- oder Rotmarkierung, kein „Empfohlen“.

### 3.6 Texte je Seite (Lesehilfe; Werte aus Modulen)

**Gemeinsam:** Eyebrow „Vergleich“; CTA „10 Tage kostenlos testen“; Sekundärlink „Zur Vergleichstabelle“; Tabellen-Caption „{Name} und CraftOS im Vergleich“, Spalten „CraftOS“ (`highlight`) / „{Name}“, `rowHeader` „Kriterium“; H2 Abschnitt 1 „{Name} und CraftOS im Überblick“ (≤ 34), Lead „Belegte Angaben aus den Preis- und Produktseiten beider Anbieter, mit Quelle und Abrufdatum je Zeile.“ (101); Umstieg-Schritte 2–4: „Parallel testen“ – „CraftOS {trialDays} Tage ohne Zahlungsdaten mit einem laufenden Auftrag ausprobieren.“ (78), „Daten übernehmen“ – „Kunden, Projekte und Stammdaten aus Dateien prüfen und zuordnen.“ (64), „Team einladen“ – „Mitarbeitende mit der App-Lizenz in die Mobile-App holen.“ (56); FAQ-H2-Lead „Kurze Antworten zu Preisen, Plantafel, Testphase und Wechsel, belegt mit Quelle und Stand.“ (90); CtaBand „Testen Sie CraftOS mit Ihrem Auftrag“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ / Sekundär „Preise ansehen“ → `/preise`.
**Panel „Wann CraftOS passt“** (je Seite 3 passende aus): „Sie möchten pro Person abrechnen und Mitarbeitende mit einer App-Lizenz ausstatten.“ (83) · „Sie möchten die Plantafel ohne Modulgebühr in der Voll-Lizenz nutzen.“ (68) · „Sie möchten monatlich kündbar bleiben.“ (38) · „Sie brauchen GAEB, DATEV-Export und Nachkalkulation in derselben Lizenz.“ (72).

#### plancraft – `/vergleich/plancraft-alternative`

- **H1:** „Die plancraft-Alternative für Büro und Baustelle“ (48) · **Kopfwort-Span:** „plancraft-Alternative“
- **Antwort (256):** „CraftOS ist eine plancraft-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet 29,95 € netto im Monat. plancraft Business kostet 74,90 € netto im Monat mit einem Bürozugang, die Plantafel ist dort ein Zusatzmodul.“
- **Tabelle (11 Zeilen):** Bürozugang, monatliche Zahlung: 29,95 € | 74,90 € (Business) · Bürozugang, Jahresabo je Monat: 24,96 € | 59,90 € (Business) · Weitere mobile Person, Jahresabo je Monat: 8,29 € (App-Lizenz) | 19,90 € (Mobilzugang) · Kürzeste Laufzeit: 1 Monat | 1 Monat · Testphase: 10 Tage | 7 Tage · Mobile-App für iOS und Android: ✓ | ✓ · Plantafel: In Voll-Lizenz | Premium, sonst Modul · E-Rechnung: XRechnung und ZUGFeRD | XRechnung-Format · DATEV-Export: ✓ | In allen Paketen · GAEB-Schnittstelle: Import X83, Export X84 | ab Pro · KI-Telefonempfang: – | In allen Paketen
- **Kosten-Antwort (210):** „Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo 58,13 € netto im Monat bei CraftOS und 179,40 € bei plancraft Business mit Plantafel; die Pakete unterscheiden sich im Funktionsumfang.“ · **KeyFacts:** 58,13 € „CraftOS, 5 Personen, Jahresabo je Monat“ · 69,75 € „CraftOS, 5 Personen, Monatsabo“ · 179,40 € „plancraft Business, 5 Personen, Jahr“ · 224,40 € „plancraft Business, 5 Personen, Monat“ · Zusammenstellung „Business + 4 Mobilzugänge + Plantafel-Modul“, nicht enthalten „KI-Verbrauch, Zusatzspeicher, Schulungen“; Note-Muster § 3.4 inkl. Rundungshinweis.
- **Für wen – Antwort (201):** „plancraft passt zu Betrieben, die Pakete mit KI-Empfang oder eine Zweijahresvorauszahlung nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und die Plantafel ohne Modulgebühr wollen.“ · **Wann plancraft passt:** „Sie möchten einen KI-Empfang am Telefon nutzen; plancraft nennt ihn in allen Paketen.“ · „Sie möchten zwei Jahre im Voraus zahlen und dafür den niedrigsten Monatspreis nutzen.“ · „Sie brauchen unbegrenzte Scans von Eingangsrechnungen, wie im Paket Premium.“
- **Umstieg – Antwort (169):** „Prüfen Sie die Kündigungsfrist Ihres plancraft-Abos, testen Sie CraftOS 10 Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.“ · Schritt 1 „Laufzeit prüfen“ – „plancraft nennt als Frist einen Tag vor Ende der Mindestlaufzeit.“
- **FAQ:** „Was kostet plancraft pro Monat?“ – „plancraft Business kostet 74,90 € netto im Monatsabo, 59,90 € im Jahresabo und 47,92 € im Zweijahresabo, jeweils pro Monat mit einem Bürozugang; Pro kostet 139,90 €, 109,90 € oder 87,92 €, Premium 249,90 €, 199,90 € oder 159,92 €.“ · „Ist die Plantafel bei CraftOS im Preis enthalten?“ – „Ja. Die Plantafel gehört zur Voll-Lizenz für 29,95 € netto im Monat oder 299,50 € im Jahr; zusätzlich kosten nur KI-Credits und erweiterter Speicher.“ · „Wie lange kann ich plancraft und CraftOS kostenlos testen?“ – „CraftOS testen Sie 10 Tage ohne Zahlungsdaten. plancraft nennt 7 Tage ohne Kreditkarte und ohne automatische Verlängerung, danach einen 0-€-Tarif mit eingeschränkten Funktionen.“ · „Kann ich von plancraft zu CraftOS wechseln?“ – „Ja. Prüfen Sie die Frist Ihres plancraft-Abos, laut plancraft bis einen Tag vor Ende der Mindestlaufzeit, und übernehmen Sie Kunden, Projekte und Stammdaten per Datei in CraftOS.“ · „Unterstützen plancraft und CraftOS E-Rechnungen?“ – „Ja. CraftOS erzeugt XRechnung und ZUGFeRD und liest strukturierte E-Rechnungen im Eingang ein; plancraft beschreibt E-Rechnungen im XRechnung-Format in allen Paketen.“
- **Gestrichen gegenüber [ENTWURF]:** Telefon-Agent-Absatz und [PRÜFEN]-Vermerk (U9); „Prüfdatum 09.09.2026“ → `site.checkedAt`.

#### Craftnote – `/vergleich/craftnote-alternative`

- **H1:** „Die Craftnote-Alternative mit Angebot und Rechnung“ (50) · **Kopfwort-Span:** „Craftnote-Alternative“
- **Antwort (268):** „CraftOS ist eine Craftnote-Alternative mit Angeboten, Rechnungen, Plantafel und Mobile-App in der Voll-Lizenz für 29,95 € netto pro Person und Monat. Craftnote Büro Plus kostet laut Preisseite 49,90 € statt 69,90 € netto pro Nutzer und Monat bei jährlicher Abrechnung.“
- **Tabelle (10 Zeilen):** Bürozugang mit Rechnungen, Jahresabo je Monat: 24,96 € | 49,90 € statt 69,90 € · Weitere mobile Person, Jahresabo je Monat: 8,29 € (App-Lizenz) | 14,90 € (Baustelle) · Kürzeste Laufzeit: 1 Monat | 12 Monate · Testphase: 10 Tage | 30 Tage · Mobile-App für iOS und Android: ✓ | ✓ · Plantafel: In Voll-Lizenz | Ja, ohne Preisangabe · E-Rechnung: XRechnung und ZUGFeRD | „E-Rechnungsfähig“ · DATEV-Export: ✓ | Nur Büro Plus · Zeiterfassung: ✓ | In allen Paketen · Fahrzeugortung per GPS: – | Zusatzmodul (P2)
- **Kosten-Antwort (245):** „Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo 58,13 € netto im Monat bei CraftOS und 109,50 € bei Craftnote mit 49,90 € für Büro Plus, mit 69,90 € gerechnet 129,50 €; die Pakete unterscheiden sich im Funktionsumfang.“ · **KeyFacts:** 58,13 € / 69,75 € (wie oben) · 109,50 € „Craftnote, 5 Personen, mit 49,90 €“ (34) · 129,50 € „Craftnote, 5 Personen, mit 69,90 €“ (34) · **Note (wörtlich):** „Annahme: 1 Person im Büro, 4 auf der Baustelle. CraftOS: 1 Voll-Lizenz + 4 App-Lizenzen. Craftnote: 1 Büro Plus + 4 Baustelle, jährliche Abrechnung. Nicht enthalten: KI-Verbrauch und Zusatzspeicher bei CraftOS; Fahrzeug-Modul (24,90 € je Tracker und Monat im ersten Jahr, jährliche Abrechnung) und Formularpakete bei Craftnote. Die Pakete unterscheiden sich im Funktionsumfang. Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet. Netto, Stand {stand}.“ Einen gesonderten Plantafelpreis nennt Craftnote nicht.
- **Für wen – Antwort (193):** „Craftnote passt zu Betrieben, die Fahrzeuge orten oder länger testen möchten; CraftOS passt zu Betrieben, die monatlich kündbar bleiben und Mitarbeitende mit einer App-Lizenz ausstatten wollen.“ · **Wann Craftnote passt:** „Sie möchten Firmenfahrzeuge per GPS orten; Craftnote bietet dafür ein Zusatzmodul an.“ (85, Quelle Preisseite; Preis steht in der Kosten-Note) · „Sie möchten länger testen: Craftnote nennt 30 Tage mit dem Umfang von Büro Plus.“ · „Sie möchten Großhändlerartikel per IDS-Connect übernehmen, wie in Büro Plus.“
- **Umstieg – Antwort (173):** „Prüfen Sie die Kündigungsfrist Ihres Craftnote-Vertrags, testen Sie CraftOS 10 Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.“ · Schritt 1 „Laufzeit prüfen“ – „Craftnote nennt drei Monate Frist vor Ende des Vertragsjahres.“
- **FAQ:** „Was kostet Craftnote pro Monat?“ – „Craftnote kostet pro Nutzer und Monat 29,90 € (Büro), 49,90 € statt 69,90 € (Büro Plus) und 14,90 € (Baustelle), jeweils netto bei jährlicher Abrechnung; mindestens ein Büropaket ist nötig.“ (189) · „Kann ich CraftOS monatlich kündigen?“ – „Ja. Das Monatsabo ist monatlich kündbar; das Jahresabo kostet rund 17 % weniger als zwölf Monatszahlungen und ist zum Ende der Laufzeit kündbar.“ · „Wie lange kann ich Craftnote und CraftOS kostenlos testen?“ – „CraftOS testen Sie 10 Tage ohne Zahlungsdaten. Craftnote nennt 30 Tage mit dem Funktionsumfang von Büro Plus, ohne hinterlegte Zahlungsmethode.“ · „Kann ich mit CraftOS Fahrzeuge orten?“ – „Nein. CraftOS speichert nur beim Start und Stopp der Zeiterfassung und bei Unterschriften je einen Standortpunkt, ohne Bewegungsverläufe.“ · „Brauche ich bei CraftOS für jede Person eine Voll-Lizenz?“ – „Nein. Büro und Bauleitung arbeiten mit der Voll-Lizenz, Mitarbeitende auf der Baustelle mit der App-Lizenz für 9,95 € netto im Monat.“
- **Gestrichen gegenüber [ENTWURF]:** Quellen N2/N5 (Hilfeartikel, 403) → Preisseite; Plantafel-Rechteangabe „Stand 09.09.2026“ (nicht neu belegt).

#### HERO – `/vergleich/hero-alternative` (D-16)

- **H1:** „Die HERO-Software-Alternative im Vergleich“ (42) · **Kopfwort-Span:** „HERO-Software“ (P1: „HERO-Software-Alternative“ läuft bei 360 px mit 375,9 px über den 324-px-Container; „HERO-Software“ misst 214,0 px, Messwerte in § Typography)
- **Antwort Variante B – Standard (293):** „CraftOS ist eine HERO-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet 29,95 € netto im Monat. HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; laut AGB gilt eine Grundlaufzeit von zwölf Monaten, soweit nicht anders vereinbart.“
- **Antwort Variante A – nur mit Screenshot-Beleg (271):** „CraftOS ist eine HERO-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet 29,95 € netto im Monat. HERO Select kostet ab 69 € netto im Monat bei jährlicher und ab 79 € bei monatlicher Zahlweise, jeweils mit einer Standard-Lizenz.“
- **Tabelle:** Variante B Zeile 1: Preise je Plan und Zahlweise: 24,96 € (Voll, jährlich) | laut hero-software.de (F3) · Variante A statt Zeile 1 drei Zeilen: Bürozugang, monatliche Zahlung: 29,95 € | ab 79 € (Select) · Bürozugang, jährliche Zahlung je Monat: 24,96 € | ab 69 € (Select) · Weitere mobile Person, jährlich je Monat: 8,29 € (App-Lizenz) | 22 € (App-Lizenz) · dann: Grundlaufzeit: 1 Monat | 12 Monate laut AGB · Testphase: 10 Tage | 14 Tage · Mobile-App für iOS und Android: ✓ | ✓ · Plantafel: In Voll-Lizenz | Ja, ab Select · E-Rechnung erstellen: XRechnung und ZUGFeRD | ZUGFeRD und XRechnung · Zeiterfassung: ✓ | ✓ · Lager: ✓ | ab HERO OS · KI-Telefonassistent: – | ab HERO OS
- **Kosten:** Variante B – Antwort (171): „HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; bei CraftOS zahlen eine Person im Büro und vier auf der Baustelle im Jahresabo 58,13 € netto im Monat.“ · KeyFacts nur CraftOS: 58,13 € · 69,75 € · 29,95 € „CraftOS Voll-Lizenz pro Monat“ · 9,95 € „CraftOS App-Lizenz pro Monat“. Variante A – Antwort (200): „Für eine Person im Büro und vier auf der Baustelle zahlen Sie bei jährlicher Zahlweise 58,13 € netto im Monat bei CraftOS und ab 157 € bei HERO Select; die Pläne unterscheiden sich im Funktionsumfang.“ · KeyFacts 58,13 € · 69,75 € · ab 157 € „HERO Select, 5 Personen, jährlich“ · ab 179 € „HERO Select, 5 Personen, monatlich“.
- **Für wen – Antwort (205):** „HERO passt zu Betrieben, die KI-Telefonie, Online-Zahlungen oder einen API-Zugang im selben System nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.“ · **Wann HERO passt:** „Sie möchten KI-Telefonie mit HERO Voice nutzen, enthalten ab HERO OS.“ · „Sie möchten Zahlungen über HERO Wallet abwickeln oder einen API-Zugang nutzen.“ · „Sie möchten länger testen: HERO nennt 14 Tage.“
- **Umstieg – Antwort (168):** „Prüfen Sie die Kündigungsfrist Ihres HERO-Vertrags, testen Sie CraftOS 10 Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.“ · Schritt 1 „Laufzeit prüfen“ – „HERO nennt in den AGB einen Monat Frist zum Ende der Laufzeit.“
- **FAQ:** „Was kostet HERO pro Monat?“ – B (162): „HERO nennt Preise je Plan (Select, HERO OS, HERO OS Plus) und Zahlweise auf hero-software.de/preise, jeweils zuzüglich Umsatzsteuer und mit einer Standard-Lizenz.“ / A: „HERO Select kostet ab 69 € netto im Monat bei jährlicher und ab 79 € bei monatlicher Zahlweise, HERO OS ab 119 € bzw. 135 €, HERO OS Plus ab 299 € bzw. 345 €, jeweils mit einer Standard-Lizenz.“ · „Welche Laufzeit hat HERO?“ – „Laut HERO-AGB beträgt die Grundlaufzeit zwölf Monate, soweit in der Bestellung nichts anderes vereinbart ist, mit einem Monat Kündigungsfrist und automatischer Verlängerung.“ · „Wie lange kann ich HERO und CraftOS kostenlos testen?“ – „CraftOS testen Sie 10 Tage ohne Zahlungsdaten. HERO nennt eine Testphase von 14 Tagen.“ · „Welche Lizenz brauchen Mitarbeitende auf der Baustelle bei CraftOS?“ – „Die App-Lizenz für 9,95 € netto im Monat oder 99,50 € im Jahr mit Zeiten, Einsätzen, Aufmaß, Fotos, Baudokumentation und Urlaub in der Mobile-App.“
- **Gestrichen gegenüber [ENTWURF]:** „Empfangen“ von E-Rechnungen (XRechnung-Import laut HERO noch nicht verfügbar – Zeile heißt „E-Rechnung erstellen“), Telefon-Agent/MCP-Absatz, Kundenportal-Onlinezahlung-Satz, Einführungsangebot (nur Drittquelle).

#### ToolTime – `/vergleich/tooltime-alternative`

- **H1:** „ToolTime-Alternative: CraftOS im Vergleich“ (42) · **Kopfwort-Span:** „ToolTime-Alternative:“
- **Antwort (242):** „CraftOS ist eine ToolTime-Alternative mit Preis pro Person und monatlich kündbarem Abo: Die Voll-Lizenz kostet 29,95 € netto im Monat. ToolTime rechnet in Paketen für 1, bis zu 5 oder bis zu 10 Mitarbeitende mit 12 Monaten Mindestlaufzeit ab.“
- **Tabelle (11 Zeilen):** Abrechnung: pro Person | Paket nach Teamgröße · Preis je Person, monatliche Zahlung: 29,95 € Voll, 9,95 € App | 34 € (Team-Paket) · Preis je Person, Jahresabo je Monat: 24,96 € Voll, 8,29 € App | 29 € (Team, 1. Jahr) · Kürzeste Laufzeit: 1 Monat | 12 Monate · Testphase: 10 Tage | 7 Tage · Mobile-App für iOS und Android: ✓ | ✓ · Plantafel: In Voll-Lizenz | Ja, ohne Paketangabe · E-Rechnung: XRechnung und ZUGFeRD | XRechnung und ZUGFeRD · DATEV: Export inklusive | Erweiterung, 19 €/Monat · GAEB: Import X83, Export X84 | Import und Export · KI-Telefonassistent: – | Erweiterung, 59 €/Monat
- **Kosten-Antwort (189):** „Für fünf Personen zahlen Sie im Jahresabo 58,13 € netto im Monat bei CraftOS mit einer Voll- und vier App-Lizenzen und 145 € bei ToolTime Team im ersten Vertragsjahr, regulär derzeit 149 €.“ · **KeyFacts:** 58,13 € · 69,75 € · 145 € „ToolTime Team, 1. Vertragsjahr je Monat“ · 169 € „ToolTime Team, monatliche Zahlung“ · Note ergänzt „Die Jahresabo-Preise gelten laut ToolTime nur im ersten Vertragsjahr; regulär nennt ToolTime derzeit 149 € (Team). Preise späterer Jahre sind nicht zugesagt.“ (P4)
- **Für wen – Antwort (220):** „ToolTime passt zu Betrieben, die einen festen Paketpreis je Teamgröße, Lexware Office oder offline sichtbare Einsatzpläne wollen; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.“ · **Wann ToolTime passt:** „Sie möchten einen festen Paketpreis für eine feste Zahl an Mitarbeitenden.“ · „Sie arbeiten mit Lexware Office; ToolTime nennt die Anbindung in Team und Max.“ · „Ihr Team soll Einsatzpläne in der App auch ohne Internetverbindung sehen.“
- **Umstieg – Antwort (172):** „Prüfen Sie die Kündigungsfrist Ihres ToolTime-Vertrags, testen Sie CraftOS 10 Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.“ · Schritt 1 „Laufzeit prüfen“ – „ToolTime nennt 30 Tage Frist zum Laufzeitende, in Textform.“
- **FAQ:** „Was kostet ToolTime pro Monat?“ – „ToolTime kostet bei monatlicher Zahlung 89 € (Solo), 169 € (Team, bis zu 5) oder 329 € (Max, bis zu 10); im Jahresabo im ersten Vertragsjahr 69 €, 145 € oder 279 €, regulär derzeit 79 €, 149 € oder 299 € pro Monat.“ (214, P4) · „Kann ich CraftOS ohne lange Vertragsbindung nutzen?“ – „Ja. Das Monatsabo ist monatlich kündbar; das Jahresabo kostet rund 17 % weniger als zwölf Monatszahlungen und ist zum Ende der Laufzeit kündbar.“ · „Wie lange kann ich ToolTime und CraftOS kostenlos testen?“ – „CraftOS testen Sie 10 Tage ohne Zahlungsdaten. ToolTime nennt eine 7-tägige Testversion ohne Zahlungsinformationen.“ · „Hat CraftOS eine DATEV-Schnittstelle?“ – „Ja. CraftOS erstellt in der Voll-Lizenz einen DATEV-Export für die Steuerberatung; bei ToolTime ist der DATEV Rechnungsdatenservice eine Erweiterung für 19 € im Monat.“
- **Korrigiert gegenüber [ENTWURF]:** E-Rechnung „XRechnung/ZUGFeRD“ laut Startseite (statt „Formate nicht genannt“); „Weitere Mitarbeitende“ (29/35 €/29,90 € widersprüchlich) entfällt; Telefon-Agent-Satz entfällt.

---

## 4. `/preise` answer-first (SEO-04, D-05, D-12)

| # | Abschnitt | Fläche | Baustein | `id` | Inhalt |
|---|---|---|---|---|---|
| 0 | Kopf | dunkel | `FunktionsKopf` ohne Visual (G1) | – | Brotkrumen, Eyebrow „Preise“, H1 „Preise der Handwerkersoftware CraftOS“ (37, Kopfwort „Handwerkersoftware“), `answer` (220): „CraftOS kostet 29,95 € netto pro Person und Monat für die Voll-Lizenz mit Web-App und Mobile-App oder 299,50 € im Jahresabo; die App-Lizenz für Mitarbeitende auf der Baustelle kostet 9,95 € im Monat oder 99,50 € im Jahr.“ (aus `tarife`, Muster [R Pattern 4]); Stand-Zeile „Preise netto zzgl. USt., Stand {site.checkedAt}“; CTA + Sekundärlink „Lizenzen vergleichen“ → `#lizenzen` |
| 1 | Preistabelle + Lizenzvergleich | Weiß | `ComparisonTable` (Voll-Lizenz `highlight`, App-Lizenz), 12 Zeilen | `lizenzen` | H2 „Preise und Lizenzen im Überblick“, Lead „Die Voll-Lizenz deckt Büro und Baustelle ab, die App-Lizenz ergänzt sie für Ihr Team auf der Baustelle.“ (103) |
| 2 | App-Lizenz | Warm | `BentoGrid` (4 Kacheln = belegte `/app`-Kacheln Zeiten, Einsätze, Aufmaß/Fotos, Urlaub aus `lib/app-content.ts`, Texte unverändert [07]) | `app-lizenz` | H2 „Was kostet die App-Lizenz für Mitarbeitende?“ + Antwort (Prompt „günstige Handwerkersoftware mit App für Mitarbeiter“) |
| 3 | Zusatzkosten | Weiß | `KeyFacts` (4) | `zusatzkosten` | H2 „Welche Kosten kommen zur Lizenz hinzu?“ + Antwort |
| 4 | Marktspanne | Warm | `ComparisonTable` Zeilen = Anbieter, **ohne** `highlight` (C5) | `was-kostet-handwerkersoftware` | H2 „Was kostet eine Handwerkersoftware pro Monat?“ + Antwort (Prompt #13) |
| 5 | FAQ | Weiß | `FaqList answerMax={300}` (6) + FAQPage | `faq` | H2 „Häufige Fragen zu den Preisen“ (29), Lead „Kurze Antworten zu Test, Abo, Jahresrabatt und Credits.“ (55) |
| 6 | Abschluss | dunkel | `CtaBand` | – | „Machen Sie Platz für Ihr Handwerk.“ / Satz [05] / Sekundär „Alle Funktionen ansehen“ → `/funktionen` (statt Selbstlink) |

**Tabelle Abschnitt 1** (Caption „Voll-Lizenz und App-Lizenz im Vergleich“, `rowHeader` „Leistung“): Monatsabo, netto: 29,95 € | 9,95 € · Jahresabo, netto: 299,50 € | 99,50 € · Jahresabo je Monat, rechnerisch: 24,96 € | 8,29 € · Für wen: Büro und Bauleitung | Team auf der Baustelle · Web-App ✓|– · Mobile-App ✓|✓ · Angebote, Rechnungen und E-Rechnung ✓|– · Plantafel und Projekte ✓|– · Zeiten und zugewiesene Einsätze ✓|✓ · Aufmaß, Fotos und Baudokumentation ✓|✓ · Urlaub und Abwesenheiten ✓|✓ · Belege, DATEV und Nachkalkulation ✓|– (Werte aus `tarife.highlights`/`funktionen`; Belege nur Voll-Lizenz [07 B11]). Note: „Preise netto zzgl. USt., pro Person. {zahlung.jahresrabatt}. Quelle: Preisliste CraftOS, Stand {site.checkedAt}.“

**Abschnitt 2 Antwort (179):** „Die App-Lizenz kostet 9,95 € netto pro Person im Monat oder 99,50 € im Jahr und gibt Mitarbeitenden auf der Baustelle Zeiten, Einsätze, Aufmaß, Fotos und Urlaub in der Mobile-App.“

**Abschnitt 3 Antwort (153):** „Hinzu kommen nur Credits für Craft AI und KI-Belegscans sowie Speicher über den 50-GB-Pool Ihres Betriebs hinaus; die Kernmodule gehören zur Voll-Lizenz.“ · **KeyFacts:** 50 GB „Speicher-Pool pro Betrieb“ · 0,99 € „je 50 GB Zusatzspeicher im Monat“ · 150 „Credits Startguthaben, einmalig“ · 0,01 € „Wert eines Credits“ · Note enthält die vom Paritätstest verlangten Vorlagen: „Zum Start erhält Ihr Betrieb einmalig {startCredits} Credits ({creditUmrechnung}) für Craft AI und KI-Belegscans ({creditUmrechnung}) …“ – Planer passt `pricing-parity.test.ts` im selben Commit an, falls der Wortlaut in ein Datenmodul wandert [R Pitfall 6]; Zusatzspeicher {extraSpeicher.monat} im Monat oder {extraSpeicher.jahr} im Jahr je {gb} GB.

**Abschnitt 4 Antwort (213):** „Das kleinste Paket mit Angeboten und Rechnungen kostet bei den Anbietern mit Monatspreis zwischen 29,95 € und 89 € netto im Monat; Jahresabos senken den Monatspreis, weitere Personen kosten je nach Anbieter extra.“ (F3; Min/Max nur aus Zeilen mit belegtem Monatspreis in Spalte „Monatlich“ – Craftnote ohne Monatspreis und HERO in Variante B zählen nicht mit.) · **Tabelle** (Caption „Einstiegspakete im Vergleich“, `rowHeader` „Anbieter“, Spalten „Kleinstes Paket“, „Monatlich“, „Jahresabo je Monat“): CraftOS: Voll-Lizenz | 29,95 € | 24,96 € · Craftnote: Büro Plus | nicht angegeben | 49,90 € statt 69,90 € · HERO: Select | B: laut hero-software.de (A: ab 79 €) | B: laut hero-software.de (A: ab 69 €) · plancraft: Business | 74,90 € | 59,90 € · ToolTime: Solo (1 Person) | 89 € | 69 € (1. Vertragsjahr). Note = Pflichthinweis + „Die Pakete unterscheiden sich im Funktionsumfang und in der Zahl der enthaltenen Personen.“ Wettbewerberpreise nur aus `lib/wettbewerber/*`, nie in `app/preise/page.tsx` (Literal-Muster `9[,.]90` trifft 49,90/74,90 [R]).

**FAQ (6, alle ≤ 300):** „Brauche ich für den Test eine Zahlungsmethode?“ – „Nein. Sie testen CraftOS 10 Tage kostenlos, eine Zahlungsmethode ist dafür nicht erforderlich.“ · „Ist die Mobile-App in der Voll-Lizenz enthalten?“ – „Ja. Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe Person; wer nur auf der Baustelle arbeitet, erhält die App-Lizenz.“ · „Wie berechnet sich der Jahresrabatt?“ – „Das Jahresabo kostet zehn Monatsbeiträge, also 299,50 € statt 359,40 € für die Voll-Lizenz, rund 17 % weniger als zwölf Monatszahlungen.“ · „Welche Lizenz braucht mein Betrieb mindestens?“ – „Mindestens eine Voll-Lizenz; App-Lizenzen ergänzen sie für Mitarbeitende auf der Baustelle.“ · „Ist CraftOS ein einmaliger Kauf?“ – „Nein. CraftOS ist ein Abo, im Monatsabo monatlich und im Jahresabo zum Ende der Laufzeit kündbar, bezahlt per SEPA-Lastschrift oder Kreditkarte.“ · „Was kosten Credit-Pakete?“ – „Credit-Pakete kosten 10 €, 25 €, 50 € oder 100 € netto und enthalten 10 €, 27,50 €, 57,50 € oder 120 € Guthaben; zum Start erhält jeder Betrieb einmalig 150 Credits.“

**Entfällt:** `PageHero`, `components/preise/PricingTable` (Karten), `components/ui/Faq`, `TrialCta`, FAQ „Welche Funktionen kosten zusätzlich?“ (402 Zeichen → Abschnitt 3). Paritätsprüfungen („Alle Preise netto“, „Umsatzsteuer“, Template-Strings, `faqSchema(faqs)`), `live-check` „/preise nennt Extra-Speicher und Start-Credits“ und E2E `browser-functional.pw.cjs:156` werden im selben Plan auf die neuen Dateien umgestellt.

---

## 5. Umbau auf v2: `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` (D-12)

Alle: Kopf `FunktionsKopf` (G1) mit Brotkrumen, Abschnitte nach [05]-Regeln, Flächen Weiß/Warm abwechselnd, `CtaBand` am Ende, Schema-Trio BreadcrumbList/FAQPage/WebPage. Entfällt jeweils: `PageHero`, Altlisten, `TrialCta`, `components/ui/Faq`.

### 5.1 `/vergleich` (Hub, Prompts „Handwerkersoftware Vergleich“, „beste Handwerkersoftware 2026“)

| # | Abschnitt | Baustein | `id` | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | G1 ohne Visual | – | Eyebrow „Vergleich“; H1 „Handwerkersoftware im Vergleich: fünf Anbieter mit Quellen“ (58, Kopfwort „Handwerkersoftware“); `answer` (255): „Handwerkersoftware unterscheidet sich vor allem in Abrechnung, Laufzeit und Plantafel: CraftOS rechnet pro Person ab und ist monatlich kündbar, plancraft und ToolTime arbeiten mit Paketen, Craftnote mit Paketen pro Nutzer und HERO mit Plänen und Lizenzen.“; Stand-Zeile; CTA + „Zur Übersicht“ → `#ueberblick` |
| 1 | Überblick (Weiß) | `ComparisonTable` Zeilen = Anbieter, ohne `highlight` (C5) | `ueberblick` | H2 „Fünf Anbieter im Überblick“, Lead „Abrechnung, kürzeste Laufzeit, Testphase und Plantafel laut den Seiten der Anbieter, mit Quelle je Zeile.“ (105). Spalten „Abrechnung“, „Kürzeste Laufzeit“, „Testphase“, „Plantafel“: CraftOS: pro Person, 2 Lizenzen · 1 Monat · 10 Tage · In Voll-Lizenz / Craftnote: pro Nutzer, 3 Pakete · 12 Monate · 30 Tage · Ja, ohne Preisangabe / HERO: Plan plus Lizenzen · 12 Monate laut AGB · 14 Tage · Ja, ab Select / plancraft: Paket plus Zugänge · 1 Monat · 7 Tage · Premium, sonst Modul / ToolTime: Paket nach Teamgröße · 12 Monate · 7 Tage · Ja, ohne Paketangabe. Reihenfolge CraftOS, dann alphabetisch. |
| 2 | Einzelvergleiche (Warm) | `BentoGrid` 5 Kacheln mit `href`, Icon `ArrowLeftRight` (4×) bzw. `Users` | `einzelvergleiche` | H2 „Einzelvergleiche mit Quellen“, Lead „Jeder Vergleich stellt CraftOS einem Anbieter mit Preisen, Laufzeiten und Stärken gegenüber.“ (92). Kacheln (md): „plancraft-Alternative“ – „Pakete mit Zusatzzugängen und Plantafel-Modul neben Voll- und App-Lizenz.“ · „Craftnote-Alternative“ – „Pakete pro Nutzer mit jährlicher Abrechnung neben Voll- und App-Lizenz.“ · „HERO-Alternative“ – „Pläne mit Standard- und App-Lizenzen neben dem Preis pro Person.“ · „ToolTime-Alternative“ – „Pakete nach Teamgröße mit 12 Monaten Laufzeit neben dem Monatsabo.“ · (wide) „Handwerkersoftware für kleine Betriebe“ – „Belegte Kriterien und fünf Anbieter für Betriebe mit wenigen Personen im Überblick.“ |
| 3 | So vergleichen (Weiß) | `StepFlow tone="light"` (4) | `so-vergleichen` | H2 „Wie vergleichen Sie Handwerkersoftware?“ + Antwort (146): „Notieren Sie Ihre Abläufe, rechnen Sie Preise für Ihre Teamgröße, prüfen Sie Laufzeit und Kündigungsfrist und testen Sie mit einem echten Auftrag.“ Schritte: „Abläufe notieren“ – „Angebot, Planung, Baustelle, Rechnung: was muss die Software abdecken?“ · „Teamgröße rechnen“ – „Büro- und Baustellenzugänge für Ihre Personenzahl zusammenrechnen.“ · „Laufzeit prüfen“ – „Mindestlaufzeit, Kündigungsfrist und Preise nach dem ersten Jahr vergleichen.“ · „Mit Auftrag testen“ – „Einen echten Auftrag vom Angebot bis zur Rechnung durchspielen.“ |
| 4 | FAQ (Warm) | `FaqList` (4) | `faq` | H2 „Häufige Fragen zum Handwerkersoftware-Vergleich“ (47), Lead „Kurze Antworten mit Quelle und Stand der Anbieterangaben.“ (57). FAQ: „Welche Handwerkersoftware passt zu einem kleinen Betrieb?“ – „Eine Software, die Angebote, Rechnungen mit E-Rechnung, Einsatzplanung und eine Mobile-App fürs Team abdeckt und für Ihre Personenzahl bezahlbar bleibt; die Kriterien zeigt der Vergleich für kleine Betriebe.“ · „Welche Handwerkersoftware ist monatlich kündbar?“ – „Von den fünf verglichenen Anbietern bieten CraftOS und plancraft ein monatlich kündbares Abo an; Craftnote und ToolTime nennen zwölf Monate, HERO laut AGB zwölf Monate Grundlaufzeit.“ · „Welche Handwerkersoftware hat eine Plantafel?“ – „Alle fünf nennen eine Plantafel: bei CraftOS in der Voll-Lizenz, bei HERO ab Select, bei plancraft in Premium oder als Modul; Craftnote und ToolTime nennen dafür keinen Paketpreis.“ · „Woher stammen die Angaben im Vergleich?“ – „Aus den Preisseiten, Produktseiten und AGB der Anbieter, jeweils mit Quelle und Abrufdatum; CraftOS-Angaben stammen aus der Preisliste und dem Produktregister.“ |
| 5 | CtaBand | – | – | „Testen Sie CraftOS mit Ihrem Auftrag“ |

**Entfällt:** Logos (C12), Gründe-Karten, Kostenbeispiele (→ Alternativen-Seiten), `lib/comparison.ts` (Stand 09.09.2026). `llms.test.ts`-Link `/vergleich` bleibt.

### 5.2 `/fakten-ueber-craftos` (Prompt „Was ist CraftOS?“, D-25)

| # | Abschnitt | Baustein | `id` | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | G1 ohne Visual | – | Eyebrow „Fakten“; H1 „Fakten über CraftOS“ (19); Lead (98): „Überprüfbare Angaben zu Produkt, Plattformen, Lizenzen und Grenzen der Handwerkersoftware CraftOS.“; CTA + „Preise ansehen“ |
| 1 | Was ist CraftOS? (Weiß) | `KeyFacts` (4) + Abgrenzungssatz | `was-ist-craftos` | H2 „Was ist CraftOS?“ (16) + Antwort (214): „CraftOS ist eine Handwerkersoftware von craftos.eu für Betriebe in Deutschland: Angebote, Plantafel, Zeiterfassung, Rechnungen und Buchhaltungsvorbereitung in einer Web-App und einer Mobile-App für iOS und Android.“ · KeyFacts: 3 „Plattformen: Web, iOS und Android“ · 21 „Sprachen in der Mobile-App“ · 10 Tage „Testphase ohne Zahlungsdaten“ · 29,95 € „Voll-Lizenz pro Person und Monat, netto“ · **Abgrenzung** (`<p data-abgrenzung>`, Body 16/400 `ink-500`, Icon `Info` 16 px, 24 px unter KeyFacts, 183): „Nicht zu verwechseln: CraftOS-PC und das CraftOS der Minecraft-Erweiterung ComputerCraft sind eigenständige Projekte mit gleichem Namen und gehören nicht zu dieser Handwerkersoftware.“ – sachlich, ohne Wertung, keine Links auf diese Projekte. |
| 2 | Produktfakten (Warm) | `FactList` (G5, 10–12 Einträge) | `produktfakten` | H2 „Produktfakten im Überblick“, Lead „Jede Angabe beschreibt den freigegebenen Funktionsstand mit seinen Grenzen.“ (75). Begriffe: Plattformen, Voll-Lizenz, App-Lizenz, Testphase, Module, GoBD-Unterstützung, Offline-Nutzung, Standort bei der Zeiterfassung, Einsatzkarte, Unterschriften mit Standort, KI, Nicht zugesagt (Portal-Onlinezahlung, DATANORM-v5-Kompatibilität, automatische ELSTER-Übermittlung, autonome Buchhaltung). Definitionen aus Bestand auf ≤ 200 Zeichen / ≤ 2 Sätze kürzen, Werte aus `tarife`/`site`. Darunter Label-Zeile: „Stand {site.checkedAt}. Fehler gefunden? Korrektur melden“ (`mailto:{site.email}`). |
| 3 | Funktionen (Weiß) | `BentoGrid` 6 Kacheln = 6 Gruppen aus `lib/funktionsgruppen.ts` (Titel = Gruppenname, Text = Gruppenbeschreibung, `href` `/funktionen#{gruppe}`) | `funktionen` | H2 „Welche Funktionen hat CraftOS?“ (30) + Antwort (132): „CraftOS bündelt 22 Funktionsseiten in sechs Arbeitsabläufen von Angebot bis Team; jede Seite nennt Plattformen, Rollen und Lizenzen.“ (Zahlen aus `funktionen.length`/Gruppenzahl) |
| 4 | FAQ (Warm) | `FaqList` (4) | `faq` | H2 „Häufige Fragen zu CraftOS“ (25), Lead „Kurze Antworten zu Anbieter, Offline-Nutzung, GoBD und Standort.“ (64). FAQ: „Wer bietet CraftOS an?“ – „CraftOS wird von einem Einzelunternehmen angeboten; Name, Anschrift und Kontakt stehen im Impressum.“ · „Funktioniert CraftOS offline?“ – „Teilweise. Die Mobile-App zeigt bereits geladene Daten und nimmt ausgewählte Eingaben offline an; Fotos, KI und neue Downloads brauchen eine Verbindung.“ · „Unterstützt CraftOS die GoBD?“ – „CraftOS unterstützt GoBD-konforme Abläufe mit Festschreibung, Dokumentversionen und Protokollen; eine behördliche Zertifizierung wird nicht behauptet.“ · „Zeichnet CraftOS Bewegungen meiner Mitarbeitenden auf?“ – „Nein. Die Mobile-App speichert nur beim Start und Stopp der Zeiterfassung je einen Standortpunkt; Bewegungsverläufe werden nicht aufgezeichnet.“ |
| 5 | CtaBand | – | – | Standardtext [05] |

**Schema:** `WebPage` mit `about: {"@id": "https://craftos.eu/#organization"}`; `Organization.disambiguatingDescription` ergänzt um „…; nicht verbunden mit CraftOS-PC oder ComputerCraft.“; `sameAs` nur geprüfte offizielle Profile (heute App Store, Google Play) [D-25].

### 5.3 `/craft-ai`

| # | Abschnitt | Baustein | `id` | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | G1 ohne Visual | – | Eyebrow „Craft AI“; H1 „KI im Handwerk: Craft AI beantwortet Fragen zu Ihrem Betrieb“ (60, Kopfwort „Handwerk:“); Lead (98): „Fragen zu Projekten, Rechnungen und Zeiten stellen, Entwürfe vorbereiten lassen und selbst prüfen.“; CTA + „Anleitung in der Hilfe“ → `/hilfe/ki-entwurf-pruefen-uebernehmen` |
| 1 | So arbeitet Craft AI (Weiß) | `StepFlow tone="light"` (3) + `FeatureSnippet variant="ki"` darunter (48 px, `figure` mit Kennzeichnung, wie [07] B7) | `so-arbeitet-craft-ai` | H2 „Wie arbeitet Craft AI?“ (22) + Antwort (190): „Sie stellen eine Frage per Text oder Sprache, Craft AI antwortet aus den Betriebsdaten, auf die Ihre Rolle Zugriff hat, und bereitet unterstützte Entwürfe vor, die Sie prüfen und bestätigen.“ Schritte: „Frage stellen“ – „Betriebsdaten per Text oder Sprache abfragen, im Rahmen Ihrer Rechte.“ · „Entwurf erhalten“ – „Angebots-, Zeit-, Einsatz- oder Berichtsentwürfe als Ausgangspunkt nutzen.“ · „Prüfen und bestätigen“ – „Inhalt und Zuordnung kontrollieren; erst Ihre Bestätigung übernimmt.“ |
| 2 | Kosten (Warm) | `KeyFacts` (3) | `kosten` | H2 „Was kostet Craft AI?“ (20) + Antwort (164): „Craft AI verbraucht Credits: Jeder Betrieb erhält einmalig 150 Credits Startguthaben, danach kaufen Sie Credit-Pakete ab 10 € netto, und 1 Credit entspricht 0,01 €.“ · 150 „Credits Startguthaben, einmalig“ · 0,01 € „Wert eines Credits“ · ab 10 € „Credit-Paket, netto“ · Note: „KI-Belegscans werden ebenfalls über Credits abgerechnet; die strukturierte Verarbeitung von E-Rechnungen ist davon getrennt. Stand {site.checkedAt}.“ |
| 3 | Grenzen (Weiß) | `BentoGrid` (3, sm) | `grenzen` | H2 „Was übernimmt Craft AI nicht?“ (29) + Antwort (153): „Craft AI bucht nicht selbstständig und ersetzt keine Prüfung: Ergebnisse können unvollständig oder falsch sein, und jede Übernahme bestätigen Sie selbst.“ Kacheln: „Mengen und Preise prüfen“ – „KI-Ergebnisse vor der Übernahme auf Mengen, Preise, Zeiten und Projektbezug prüfen.“ · „Kein autonomes Verbuchen“ – „Craft AI wird nicht als selbstständig verbuchendes Buchhaltungssystem angeboten.“ · „Zugriff nach Rolle“ – „Antworten richten sich nach den Daten, auf die Ihre Rolle Zugriff hat.“ |
| 4 | FAQ (Warm) | `FaqList` (3) | `faq` | H2 „Häufige Fragen zu Craft AI“ (26), Lead „Kurze Antworten zu Entwürfen, Daten und Sprache.“ (48). FAQ: „Kann Craft AI Angebote erstellen?“ – „Craft AI bereitet unterstützte Angebotsentwürfe vor; Sie prüfen Positionen, Mengen und Preise und übernehmen den Entwurf erst nach Ihrer Bestätigung.“ · „Welche Daten nutzt Craft AI?“ – „Craft AI nutzt die Betriebsdaten in CraftOS, auf die Ihre Rolle Zugriff hat, etwa Projekte, Rechnungen und Zeiten.“ · „Kann ich Craft AI per Sprache nutzen?“ – „Ja. Fragen stellen Sie per Text oder per Sprache.“ |
| 5 | CtaBand | – | – | Standardtext [05] |

E2E-Bindungen bleiben: `function-illustrations.pw.cjs` (`['ki', '/craft-ai']`), `home-navigation.pw.cjs:466`.

### 5.4 `/gobd`

| # | Abschnitt | Baustein | `id` | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | G1 ohne Visual | – | Eyebrow „GoBD“; H1 „GoBD-konforme Software: wie CraftOS Ihre Abläufe unterstützt“ (60, Kopfwort „GoBD-konforme“); Lead (104): „Festschreibung, geschützte Rechnungen, Versionen und Protokolle für nachvollziehbare Abläufe im Betrieb.“; CTA + „Anleitung in der Hilfe“ → `/hilfe/rechnung-fertigstellen` |
| 1 | Funktionen (Weiß) | `BentoGrid` 6 Kacheln = 6 Bestandspunkte (Titel unverändert, Text auf 1 Satz ≤ 90/120 kürzen, `href` wie Bestand) | `funktionen` | H2 „Wie unterstützt CraftOS GoBD-konforme Abläufe?“ (46) + Antwort (157): „Mit festgeschriebenen Rechnungen, geschützten Inhalten, Dokumentversionen, nachvollziehbaren Stornos sowie Prüfung, Sperre und Protokoll von Eingangsbelegen.“ |
| 2 | Ablauf (Warm) | `StepFlow tone="light"` (5) + `FeatureSnippet variant="rechnung"` darunter | `ablauf` | H2 „Ein typischer Ablauf bis zur Übergabe“ (37, keine Frage), Lead „Vom gepflegten Stammsatz bis zur abgestimmten Übergabe an die Steuerberatung in fünf Schritten.“ (95, ≤ 140). Schritte: „Stammdaten pflegen“ – „Firmen- und Kundenangaben vollständig pflegen.“ (46) · „Belege prüfen“ – „Belege erfassen, Inhalte prüfen und korrekt zuordnen.“ (53) · „Rechnung festschreiben“ – „Rechnungen nach Prüfung fertigstellen und festschreiben.“ (56) · „Korrektur per Storno“ – „Korrekturen über nachvollziehbare Stornovorgänge bearbeiten.“ (60) · „Übergabe abstimmen“ – „Zahlungen nachführen, Unterlagen aufbewahren und Übergabe abstimmen.“ (68) |
| 3 | Zertifizierung (Weiß) | `FitPanels` (G4): „Was CraftOS unterstützt“ / „Was Ihr Betrieb organisiert“ (je 3 Punkte, ohne Quellenlinks) | `zertifizierung` | H2 „Ist CraftOS GoBD-zertifiziert?“ (30) + Antwort (190, 2 Sätze): „Nein. CraftOS behauptet keine behördliche GoBD-Zertifizierung: GoBD-Konformität betrifft das gesamte Verfahren in Ihrem Betrieb, und die Funktionen von CraftOS unterstützen dieses Verfahren.“ Punkte: „Rechnungen werden nach der Prüfung festgeschrieben und bleiben geschützt.“ · „Dokumentversionen und Protokolle machen Änderungen nachvollziehbar.“ · „Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor.“ / „Sie führen eine Verfahrensdokumentation mit klaren Zuständigkeiten.“ · „Sie erfassen alle Belege vollständig und zeitnah.“ · „Sie bewahren Originaldaten auf und klären den Datenzugriff mit Ihrer Steuerberatung.“ |
| 4 | FAQ (Warm) | `FaqList` (3) + FAQPage **aus demselben Array** (behebt unsichtbares FAQ-Schema [R]) | `faq` | H2 „Häufige Fragen zur GoBD“ (23), Lead „Kurze Antworten zu Verfahrensdokumentation, Festschreibung und DATEV-Export.“ (76). FAQ: „Ersetzt CraftOS die Verfahrensdokumentation?“ – „Nein. Die Verfahrensdokumentation erstellt Ihr Betrieb; CraftOS liefert dafür nachvollziehbare Funktionen wie Festschreibung, Versionen und Protokolle.“ · „Kann ich eine festgeschriebene Rechnung ändern?“ – „Nein. Eine festgeschriebene Rechnung bleibt geschützt; Korrekturen laufen über einen Storno mit Bezug zum Original.“ · „Reicht ein DATEV-Export für die GoBD?“ – „Nein. Ein DATEV-Export allein belegt nicht, dass alle Prüfungs- und Aufbewahrungsanforderungen erfüllt sind; stimmen Sie die Übergabe mit Ihrer Steuerberatung ab.“ · Darunter Label-Zeile „Grundlage: GoBD im amtlichen AO-Handbuch und BMF-Schreiben vom 14. Juli 2025. Funktionsstand {site.checkedAt}.“ mit beiden Bestandslinks |
| 5 | CtaBand | – | – | Standardtext [05] |

---

## 6. Neue Seite `/vergleich/handwerkersoftware-kleine-betriebe` (D-10, Prompt #1)

Keine Selbstüberhöhung: weder „beste“, „Testsieger“, „Nr. 1“ noch Rangfolge; CraftOS steht nur als eine von fünf Zeilen in der Tabelle und im Rechenbeispiel-FAQ. U1–U12 gelten.

| # | Abschnitt | Baustein | `id` | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | G1 ohne Visual | – | Brotkrumen „Start › Vergleich › Für kleine Betriebe“; Eyebrow „Vergleich“; H1 „Handwerkersoftware für kleine Betriebe im Vergleich“ (51, Kopfwort „Handwerkersoftware“); `answer` (258): „Für einen kleinen Handwerksbetrieb eignet sich eine Software, die Angebote, Rechnungen mit E-Rechnung, Einsatzplanung und eine Mobile-App fürs Team abdeckt, für Ihre Personenzahl bezahlbar bleibt und kurz kündbar ist; prüfen Sie das mit einem echten Auftrag.“; Stand-Zeile; CTA + „Zu den Kriterien“ → `#kriterien` |
| 1 | Kriterien (Weiß) | `BentoGrid` 6 Kacheln (sm/md) + Quellenliste darunter (Label 14/400) | `kriterien` | H2 „Welche Kriterien zählen für kleine Betriebe?“ (44) + Antwort (146): „Wichtig sind E-Rechnung, Kosten für Ihre Personenzahl, Laufzeit, eine Mobile-App fürs Team, GoBD-gerechte Abläufe und ein Test mit echtem Auftrag.“ Kacheln (Titel – Text, je belegt): „E-Rechnung empfangen und erstellen“ – „Zwischen Unternehmen: Empfang seit 2025 Pflicht, Ausstellen ab 2028 grundsätzlich.“ (82; BMF-FAQ E-Rechnung; Ausnahmen nennt die FAQ unten, F2) · „Kosten für Ihre Personenzahl“ – „Rechnen Sie Büro- und Baustellenzugänge für Ihr Team, nicht nur den Einstiegspreis.“ (Anbieter-Module) · „Laufzeit und Kündigungsfrist“ – „Die verglichenen Anbieter reichen von monatlich kündbar bis zwölf Monate Laufzeit.“ (Module) · „Mobile-App fürs Team“ – „Zeiten, Einsätze und Fotos gehören aufs Handy, oft mit eigener, günstigerer Lizenz.“ (Module) · „GoBD-gerechte Abläufe“ – „Festgeschriebene Rechnungen und nachvollziehbare Korrekturen gehören zur Buchführung.“ (BMF-Schreiben 14.07.2025) · „Test mit echtem Auftrag“ – „Die Testphasen der verglichenen Anbieter reichen von {min} bis {max} Tagen.“ (Module; Min/Max per Vorlage, U12) |
| 2 | Anbieter (Warm) | `ComparisonTable` Zeilen = Anbieter, ohne `highlight` (C5) | `anbieter` | H2 „Fünf Anbieter für kleine Betriebe im Überblick“, Lead „Abrechnung, Laufzeit, Preis für weitere Personen und Testphase laut den Seiten der Anbieter.“ (92). Spalten „Abrechnung“, „Kürzeste Laufzeit“, „Weitere mobile Person“, „Testphase“; Spalte 3 (P3, Zahlweise in jeder Zelle, Beträge netto je Person und Monat laut Note): CraftOS „9,95 € (Monatsabo)“ (18) · Craftnote „14,90 € (Jahresabo)“ (19) · HERO B „laut hero-software.de“ (21), A „25 € (monatlich)“ (16, ohne „ab“) · plancraft „24,90 € (Monatsabo)“ (19) · ToolTime „im Paket, bis 5 Personen“ (24); Note ergänzt „Weitere mobile Person: netto je Person und Monat, Zahlweise in Klammern.“; übrige Spalten wie `/vergleich`. |
| 3 | Testen (Weiß) | `StepFlow tone="light"` (4) + Textlink „Ratgeber: Handwerkersoftware auswählen“ → `/blog/handwerkersoftware-auswaehlen` | `testen` | Antwort (122): „Spielen Sie einen echten Auftrag vom Aufmaß bis zur Rechnung durch und beziehen Sie eine Person von der Baustelle mit ein.“ (H2 „Wie testen Sie Handwerkersoftware mit einem Auftrag?“, 52). Schritte: „Auftrag auswählen“ – „Einen laufenden, typischen Auftrag mit Aufmaß und Material nehmen.“ · „Angebot schreiben“ – „Positionen anlegen, Angebot versenden und Freigabe einholen.“ · „Baustelle einbinden“ – „Eine Person erfasst Zeiten und Fotos in der Mobile-App.“ · „Rechnung stellen“ – „Rechnung als E-Rechnung erzeugen und den Export prüfen.“ |
| 4 | FAQ (Warm) | `FaqList` (4) | `faq` | H2 „Häufige Fragen zu Software für kleine Betriebe“ (46), Lead „Kurze Antworten zu E-Rechnung, Kosten, Laufzeit und Lizenzen für das Team.“ (74). FAQ: „Ab wann muss ein kleiner Betrieb E-Rechnungen ausstellen?“ – „Für Rechnungen zwischen Unternehmen im Inland gilt: Empfangen müssen Betriebe E-Rechnungen seit dem 1. Januar 2025; das Ausstellen wird nach Übergangsfristen ab 2028 grundsätzlich für alle Pflicht, ausgenommen etwa Kleinbetragsrechnungen bis 250 € und Rechnungen von Kleinunternehmern.“ (285, F2; Quelle BMF-FAQ E-Rechnung) · „Was kostet Handwerkersoftware für fünf Personen?“ – „Bei CraftOS zahlen eine Person im Büro und vier auf der Baustelle im Jahresabo 58,13 € netto im Monat; die Preise der anderen Anbieter stehen in den Einzelvergleichen.“ · „Kann ich Handwerkersoftware monatlich kündigen?“ – „Das hängt vom Anbieter ab: CraftOS und plancraft bieten ein Monatsabo, Craftnote und ToolTime nennen zwölf Monate Laufzeit, HERO laut AGB zwölf Monate Grundlaufzeit.“ · „Brauchen Mitarbeitende auf der Baustelle eine eigene Lizenz?“ – „Bei den meisten verglichenen Anbietern ja; bei CraftOS ist das die App-Lizenz für 9,95 € netto im Monat, bei ToolTime sind Mitarbeitende im Paketpreis enthalten.“ |
| 5 | CtaBand | – | – | „Testen Sie CraftOS mit Ihrem Auftrag“ |

Verlinkt von `/vergleich` (Bento), Footer und je einem Satz am Ende von `/blog/handwerkersoftware-auswaehlen` und `/blog/handwerkersoftware-einzelunternehmen` („Anbieter und Kriterien im Vergleich: Handwerkersoftware für kleine Betriebe“) [R].

---

## 7. OG-Grafik-Vorlage `pageOg` (D-08, D-20, D-21)

```ts
// lib/og.tsx
export const OG_SIZE = { width: 1200, height: 630 } as const;
export type OgKind = "Handwerkersoftware" | "Funktion" | "Funktionen" | "Mobile-App" | "Preise" | "Vergleich"
  | "Fakten" | "Craft AI" | "GoBD" | "Gewerk" | "Gewerke" | "Ratgeber" | "Hilfe" | "Rechner" | "Kontakt" | "Rechtliches";
export function pageOg(input: { title: string; kind: OgKind }): ImageResponse;
```

```
1200 × 630, Fläche #101014 (flach, kein Raster, kein Verlauf)
┌──────────────────────────────────────────────────────────────┐  Innenabstand 72 px
│ [Mark 56] CraftOS                                             │  Wortmarke 40 px #F4F4F5
│                                                               │
│                                                               │
│ Vergleich                                                     │  Seitentyp 28 px #F2AF38, Satzschreibung
│ Die plancraft-Alternative für Büro                            │  ↓ 24 px
│ und Baustelle                                                 │  Titel 64 px / 1.1 #F4F4F5, max. 1056 px, ≤ 3 Zeilen
│                                                               │  ↓ 48 px
│ craftos.eu                                                    │  24 px #BCBCC6
└███████████████████████████████████████████████████████████████┘  Unterkante 12 px #F2AF38 (C6)
```

| Eigenschaft | Festlegung |
|---|---|
| Format | PNG 1200 × 630, `contentType = "image/png"`, statisch beim Build (`generateStaticParams` in jeder dynamischen `opengraph-image.tsx` [R Pattern 3]) |
| Schrift | Keine `fonts`-Option → gebündelte Geist Regular 400; **kein** `fontWeight` ≠ 400, kein `letterSpacing` außer Titel `-0.02em` (C7) |
| Logo | `CraftOSMark` als Inline-SVG 56 × 56 (Amber-Hexagon, Bestand), 16 px Abstand zur Wortmarke „CraftOS“ |
| Titel | = H1 der Seite (Rechtsseiten: Seitenname). Stufen: ≤ 40 Zeichen **72 px**, 41–60 **64 px**, 61–90 **52 px**; > 90 → Build-Fehler „OG: Titel für {path} hat {n} Zeichen – höchstens 90, Kurztitel in den Daten angeben.“ Kein Silbentrennen, kein Kürzen mit „…“. Beispiele: „Preise der Handwerkersoftware CraftOS“ (37 → 72 px), „Die plancraft-Alternative für Büro und Baustelle“ (48 → 64 px), „KI-Belegscan prüfen: welche Angaben Sie vor dem Speichern vergleichen sollten“ (77 → 52 px) |
| Seitentyp | 28 px Amber, Satzschreibung, ohne Pille/Rahmen, ohne Versalien, ohne „·“ |
| Verboten | Preise, Testtage, Daten (veralten in Social-Caches), Wettbewerberlogos, Verlaufswort, Raster, Pillen, Versalien, Mittelpunkt-Ketten, „→“ |
| Größe | ≤ 300 KB je Bild (Audit über `.next/server/app/**/opengraph-image*.body`), Ziel < 100 KB |
| `alt` | „{kind}: {title}“ |
| Meta | `og:image` aus der Segmentdatei; `twitter:image` **= derselbe Pfad** (über `pageMetadata(…, imagePath)`) [R Pitfall 8] |

**Seitentyp je Segment:** `/` Handwerkersoftware · `/funktionen` Funktionen · `/funktionen/[slug]` Funktion · `/app` Mobile-App · `/preise` Preise · `/vergleich`, `/vergleich/*` Vergleich · `/fakten-ueber-craftos` Fakten · `/craft-ai` Craft AI · `/gobd` GoBD · `/gewerke` Gewerke · `/gewerke/[slug]` Gewerk · `/blog/**` Ratgeber · `/hilfe/**` Hilfe · `/rechner/**` Rechner · `/support` Kontakt · `/impressum`, `/datenschutz`, `/agb` Rechtliches (Standardgrafik des Seitentyps mit Seitenname, D-20). `/styleguide`: keine OG-Datei.

---

## 8. SEO-Vertrag (D-06, D-17)

Title = `target.title` (gerendert mit Template-Suffix), H1 === `target.h1`, Description === `target.description` (120–155). Alle übrigen Map-Werte bleiben unverändert.

**Änderungen an `keyword-map.json`/`KEYWORD-MAP.md` (im selben Commit wie Seite, Sitemap, Map-Status, `llms.txt` [R Pitfall 12]):**

| Pfad | Feld | Bisher | Neu (Länge) | Grund |
|---|---|---|---|---|
| /vergleich/plancraft-alternative | title | plancraft-Alternative: CraftOS im Vergleich \| CraftOS | plancraft-Alternative: Preise im Vergleich \| CraftOS (52) | Preissuchen („was kostet plancraft“ 50) übertreffen Alternativsuchen (30) [R]; doppeltes „CraftOS“ entfällt; [ENTWURF]-Titel |
| /vergleich/craftnote-alternative | title | Craftnote-Alternative: CraftOS im Vergleich \| CraftOS | Craftnote-Alternative: Preise im Vergleich \| CraftOS (52) | „craftnote preise“ 110 [R] |
| /vergleich/hero-alternative | title | HERO Software Alternative: CraftOS \| CraftOS | HERO Software Alternative im Vergleich \| CraftOS (48) | Doppeltes „CraftOS“; kein „Preise“, solange D-16 Variante B gilt |
| /vergleich/tooltime-alternative | title | ToolTime oder CraftOS? Der Vergleich \| CraftOS | ToolTime-Alternative: Preise im Vergleich \| CraftOS (51) | „tooltime preise“ 140 [R]; Hauptkeyword „tooltime“ bleibt im Titel |
| /vergleich | h1 | Handwerkersoftware im Vergleich: CraftOS, Craftnote und plancraft | Handwerkersoftware im Vergleich: fünf Anbieter mit Quellen (58) | Hub deckt fünf Anbieter ab |
| /vergleich | description | … von CraftOS, Craftnote und plancraft nebeneinander geprüft. | Handwerkersoftware-Vergleich mit Quellen: Abrechnung, Laufzeit, Testphase und Plantafel von CraftOS, plancraft, Craftnote, HERO und ToolTime im Überblick. (154) | wie oben |
| /vergleich/handwerkersoftware-kleine-betriebe | neu, `primary: null`, `reason` „ohne Daten (export--candidates-1.json)“, Status `geplant` → `bestehend` beim Livegang | – | title „Handwerkersoftware für kleine Betriebe: Kriterien \| CraftOS“ (59); h1 „Handwerkersoftware für kleine Betriebe im Vergleich“ (51); description „Handwerkersoftware für kleine Betriebe: belegte Kriterien zu E-Rechnung, Laufzeit, Kosten pro Person und Mobile-App, fünf Anbieter mit Quellen und Stand.“ (153) | D-10, [R] Pfad-Empfehlung; keine Kannibalisierung der Ratgeber-Keywords |
| /fakten-ueber-craftos | target (`primary: null`) | Titel 69 Zeichen, keine H1-Vorgabe | title „Fakten über CraftOS: Funktionen und Lizenzen \| CraftOS“ (54); h1 „Fakten über CraftOS“ (19); description „Überprüfbare Fakten über CraftOS: was die Handwerkersoftware ist, Plattformen, Lizenzen und Preise, Testphase, GoBD-Unterstützung und benannte Grenzen.“ (151) | D-06 (eindeutig, beschreibend), Titel ≤ 60 |

Unverändert (gezählt): `/preise` title 48, description 152; `/craft-ai` title 57, description 150; `/gobd` title 46, description 153; Alternativen-H1 42–50 und Descriptions 145–154.

**Strukturierte Daten:** Alternativen und kleine Betriebe: `BreadcrumbList` (3), `FAQPage` (= sichtbare FAQ), `WebPage`; **kein** `Product`, `Review`, `AggregateRating` und kein Schema für Wettbewerber. `/vergleich`, `/preise`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`: `BreadcrumbList` (2), `FAQPage`, `WebPage` (`/preise` behält `SoftwareApplication`-`offers` aus `tarife`). Ein JSON-LD-Block je Typ, kein `@graph`-Sonderweg.

**Footer:** neue Spalte „Vergleiche“ (Bestandsstil, nicht v2): „Handwerkersoftware-Vergleich“ → `/vergleich` (ersetzt „Warum CraftOS?“), „plancraft-Alternative“, „Craftnote-Alternative“, „HERO-Alternative“, „ToolTime-Alternative“, „Für kleine Betriebe“.

**Prompt-Anker (für `docs/seo/ai-prompts-targets.json`):** `/vergleich/handwerkersoftware-kleine-betriebe#antwort`, `/vergleich#antwort`, `/vergleich/{name}-alternative#antwort`, `/preise#app-lizenz`, `/preise#was-kostet-handwerkersoftware`, `/fakten-ueber-craftos#was-ist-craftos`. `id` sitzt am Antwort-`<p>` (Kopf) bzw. an der Frage-H2 (`scroll-margin-top: 100px`).

---

## 9. Überschriften- und Lead-Verzeichnis (P5, F5; alle Werte per Node gezählt)

Budgetklasse: **F** = Frage-H2, `lead` ist die Antwort (≤ 300 Zeichen, 1–2 Sätze, G2); **L** = Nicht-Frage-H2, Lead ≤ 140 Zeichen, genau 1 Satz [05]. H2 immer ≤ 60. Kopf-Antworten (`answer`, ≤ 300) und Kopf-Leads (≤ 110) stehen in §§ 3–6.

| Seite | `id` | H2 (Länge) | Klasse | Lead / Antwort (Länge) |
|---|---|---|---|---|
| Alternativen (je Name) | `vergleich` | „{Name} und CraftOS im Überblick“ (plancraft 34, Craftnote 34, HERO 29, ToolTime 33) | L | „Belegte Angaben aus den Preis- und Produktseiten beider Anbieter, mit Quelle und Abrufdatum je Zeile.“ (101) |
| plancraft | `kosten` | „Was kostet plancraft im Vergleich zu CraftOS?“ (45) | F | § 3.6 (210) |
| Craftnote | `kosten` | „Was kostet Craftnote im Vergleich zu CraftOS?“ (45) | F | § 3.6 (245) |
| HERO | `kosten` | „Was kostet HERO im Vergleich zu CraftOS?“ (40) | F | § 3.6 (B 171, A 200) |
| ToolTime | `kosten` | „Was kostet ToolTime im Vergleich zu CraftOS?“ (44) | F | § 3.6 (189) |
| plancraft / Craftnote / HERO / ToolTime | `fuer-wen` | „Für wen passt {Name}, für wen CraftOS?“ (41 / 41 / 36 / 40) | F | § 3.6 (201 / 193 / 205 / 220) |
| plancraft / Craftnote / HERO / ToolTime | `umstieg` | „Wie wechseln Sie von {Name} zu CraftOS?“ (42 / 42 / 37 / 41) | F | § 3.6 (169 / 173 / 168 / 172) |
| plancraft / Craftnote / HERO / ToolTime | `faq` | „Häufige Fragen zur {Name}-Alternative“ (40 / 40 / 35 / 39) | L | „Kurze Antworten zu Preisen, Plantafel, Testphase und Wechsel, belegt mit Quelle und Stand.“ (90) |
| `/vergleich` | `ueberblick` | „Fünf Anbieter im Überblick“ (26) | L | „Abrechnung, kürzeste Laufzeit, Testphase und Plantafel laut den Seiten der Anbieter, mit Quelle je Zeile.“ (105) |
| `/vergleich` | `einzelvergleiche` | „Einzelvergleiche mit Quellen“ (28) | L | „Jeder Vergleich stellt CraftOS einem Anbieter mit Preisen, Laufzeiten und Stärken gegenüber.“ (92) |
| `/vergleich` | `so-vergleichen` | „Wie vergleichen Sie Handwerkersoftware?“ (39) | F | „Notieren Sie Ihre Abläufe, rechnen Sie Preise für Ihre Teamgröße, prüfen Sie Laufzeit und Kündigungsfrist und testen Sie mit einem echten Auftrag.“ (146) |
| `/vergleich` | `faq` | „Häufige Fragen zum Handwerkersoftware-Vergleich“ (47) | L | „Kurze Antworten mit Quelle und Stand der Anbieterangaben.“ (57) |
| kleine Betriebe | `kriterien` | „Welche Kriterien zählen für kleine Betriebe?“ (44) | F | „Wichtig sind E-Rechnung, Kosten für Ihre Personenzahl, Laufzeit, eine Mobile-App fürs Team, GoBD-gerechte Abläufe und ein Test mit echtem Auftrag.“ (146) |
| kleine Betriebe | `anbieter` | „Fünf Anbieter für kleine Betriebe im Überblick“ (46) | L | „Abrechnung, Laufzeit, Preis für weitere Personen und Testphase laut den Seiten der Anbieter.“ (92) |
| kleine Betriebe | `testen` | „Wie testen Sie Handwerkersoftware mit einem Auftrag?“ (52) | F | „Spielen Sie einen echten Auftrag vom Aufmaß bis zur Rechnung durch und beziehen Sie eine Person von der Baustelle mit ein.“ (122) |
| kleine Betriebe | `faq` | „Häufige Fragen zu Software für kleine Betriebe“ (46) | L | „Kurze Antworten zu E-Rechnung, Kosten, Laufzeit und Lizenzen für das Team.“ (74) |
| `/preise` | `lizenzen` | „Preise und Lizenzen im Überblick“ (32) | L | „Die Voll-Lizenz deckt Büro und Baustelle ab, die App-Lizenz ergänzt sie für Ihr Team auf der Baustelle.“ (103) |
| `/preise` | `app-lizenz` | „Was kostet die App-Lizenz für Mitarbeitende?“ (44) | F | § 4 (179) |
| `/preise` | `zusatzkosten` | „Welche Kosten kommen zur Lizenz hinzu?“ (38) | F | § 4 (153) |
| `/preise` | `was-kostet-handwerkersoftware` | „Was kostet eine Handwerkersoftware pro Monat?“ (45) | F | § 4 (213) |
| `/preise` | `faq` | „Häufige Fragen zu den Preisen“ (29) | L | „Kurze Antworten zu Test, Abo, Jahresrabatt und Credits.“ (55) |
| Fakten | `was-ist-craftos` | „Was ist CraftOS?“ (16) | F | § 5.2 (214) |
| Fakten | `produktfakten` | „Produktfakten im Überblick“ (26) | L | „Jede Angabe beschreibt den freigegebenen Funktionsstand mit seinen Grenzen.“ (75) |
| Fakten | `funktionen` | „Welche Funktionen hat CraftOS?“ (30) | F | § 5.2 (132) |
| Fakten | `faq` | „Häufige Fragen zu CraftOS“ (25) | L | „Kurze Antworten zu Anbieter, Offline-Nutzung, GoBD und Standort.“ (64) |
| Craft AI | `so-arbeitet-craft-ai` | „Wie arbeitet Craft AI?“ (22) | F | § 5.3 (190) |
| Craft AI | `kosten` | „Was kostet Craft AI?“ (20) | F | § 5.3 (164) |
| Craft AI | `grenzen` | „Was übernimmt Craft AI nicht?“ (29) | F | § 5.3 (153) |
| Craft AI | `faq` | „Häufige Fragen zu Craft AI“ (26) | L | „Kurze Antworten zu Entwürfen, Daten und Sprache.“ (48) |
| GoBD | `funktionen` | „Wie unterstützt CraftOS GoBD-konforme Abläufe?“ (46) | F | § 5.4 (157) |
| GoBD | `ablauf` | „Ein typischer Ablauf bis zur Übergabe“ (37) | L | „Vom gepflegten Stammsatz bis zur abgestimmten Übergabe an die Steuerberatung in fünf Schritten.“ (95) |
| GoBD | `zertifizierung` | „Ist CraftOS GoBD-zertifiziert?“ (30) | F | § 5.4 (190, 2 Sätze) |
| GoBD | `faq` | „Häufige Fragen zur GoBD“ (23) | L | „Kurze Antworten zu Verfahrensdokumentation, Festschreibung und DATEV-Export.“ (76) |

---

## Copywriting Contract

Unverändert aus [05]/[06]/[07]: „Sie“, Satzschreibung, aktive Verben, keine Ausrufezeichen, keine Füllwörter, nicht-live Funktionen nirgends angekündigt; Begriffe „Web-App“, „Mobile-App“, „Voll-Lizenz“, „App-Lizenz“, „Credits“, „Arbeitsabschnitte“ [07 B3]. **Neu:** UWG-Regeln U1–U12 (§ 3.2) für alle Vergleichs-, Preis- und Kleine-Betriebe-Texte; Anbieternamen in Anbieterschreibweise.

| Element | Copy |
|---------|------|
| Primary CTA | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta`, Icon `ArrowUpRight` – Kopf und CTA-Band aller Phase-8-Seiten |
| Sekundärlink Kopf | Alternativen: „Zur Vergleichstabelle“ → `#vergleich` · `/vergleich`: „Zur Übersicht“ → `#ueberblick` · `/preise`: „Lizenzen vergleichen“ → `#lizenzen` · kleine Betriebe: „Zu den Kriterien“ → `#kriterien` · Fakten: „Preise ansehen“ → `/preise` · Craft AI: „Anleitung in der Hilfe“ → `/hilfe/ki-entwurf-pruefen-uebernehmen` · GoBD: „Anleitung in der Hilfe“ → `/hilfe/rechnung-fertigstellen` |
| CTA-Band Vergleichsseiten | „Testen Sie CraftOS mit Ihrem Auftrag“ (36) / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ / „Preise ansehen“ → `/preise` |
| CTA-Band übrige | „Machen Sie Platz für Ihr Handwerk.“ / Satz wie oben / „Preise ansehen“ (auf `/preise`: „Alle Funktionen ansehen“ → `/funktionen`) |
| Brotkrumen | `aria-label` „Brotkrumen“; erstes Glied „Start“; Namen laut § 1 |
| Stand-Zeile | Vergleichsseiten: „Anbieterangaben Stand {stand}, Quellen unter der Tabelle“ · `/preise`: „Preise netto zzgl. USt., Stand {site.checkedAt}“ |
| Pflichthinweis / Disclaimer | wörtlich § 3.2 |
| Tabellenhinweis mobil | „Zum Vergleichen seitlich wischen“ [05] |
| Quellenliste | `aria-label` „Quellen zur Tabelle“; Eintrag „{Anbieter}: {Label}, abgerufen am {TT.MM.JJJJ}“ |
| Abgrenzung (Fakten) | „Nicht zu verwechseln: CraftOS-PC und das CraftOS der Minecraft-Erweiterung ComputerCraft sind eigenständige Projekte mit gleichem Namen und gehören nicht zu dieser Handwerkersoftware.“ |
| Empty state heading | Entfällt als Oberfläche: Seiten rendern statisch aus Datenmodulen. Fehlt ein Wettbewerberbeleg, entfällt die Zeile bzw. der Satz (kein Platzhalter außer „nicht angegeben“ in Marktübersichten); HERO ohne Screenshot-Beleg rendert Variante B. |
| Empty state body | Entwicklerfehler statt leerer Fläche: „Wettbewerber {slug}: keine belegte Angabe für {feld} – Zeile entfernen oder Quelle ergänzen.“; „FitPanels: Panel {titel} hat {n} Punkte – 2 bis 4 erforderlich.“; „FactList: mindestens 6 Einträge erforderlich – Inhalte in lib/… ergänzen.“ [05-Muster] |
| Error state | Keine Laufzeitfehler für Besucher (statisch; unbekannter Pfad → bestehende 404). Build-/Testfehler nennen Problem und Abhilfe: „Wettbewerber {slug}: Angabe {feld} ohne quelle oder abgerufenAm – im Datenmodul ergänzen.“; Warnung „Wettbewerber {slug}: Stand {datum} ist älter als 60 Tage – Angaben neu prüfen und abgerufenAm aktualisieren.“ (D-04, kein Abbruch); „HERO-Preise ohne Screenshot-Beleg – Variante B ohne Zahlen rendern (D-16).“; „Vergleichstext enthält ‚{wort}‘ – sachlich formulieren (UWG-Wortliste).“; „Antwort zuerst: Frage ‚{q}‘ auf {path} hat keine Antwort ≤ 300 Zeichen direkt darunter – ersten Absatz kürzen oder vorziehen.“; „Breadcrumbs: Pfad {path} hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.“; „OG: Titel für {path} hat {n} Zeichen – höchstens 90, Kurztitel in den Daten angeben.“; „OG: {path} ist {n} KB – höchstens 300 KB.“ |
| Destructive confirmation | Keine destruktiven Aktionen in dieser Phase (Marketingseiten ohne Konten, Formulare oder Löschfunktionen). |

---

## Bewegung, Barrierefreiheit, Stabilität

- **Bewegung:** unverändert [05]/[06]/[07]; neu animiert ist nichts. `FeatureSnippet` nur auf `/craft-ai` (`ki`) und `/gobd` (`rechnung`), unterhalb der Falz, mit Kennzeichnung. Brotkrumen-Hover 150 ms nur unter `hover: hover`.
- **Überschriften:** genau eine H1 je Seite; Abschnitte H2; Panels, Kacheln, Schritte, FAQ-Fragen H3; Tabellen-Caption ist keine Überschrift. Doppelte H1 sitewide verboten (Kategorien „Ratgeber: Rechnungen“/„Hilfe: Rechnungen“ [R Pitfall 11]).
- **Landmarks:** Brotkrumen `nav[aria-label="Brotkrumen"]` mit `ol`; Abschnitte `section[aria-labelledby]`; Tabellen-Scrollbereich `role="region"` mit Caption als Name [05].
- **Tastatur/Touch:** Brotkrumen-Links, Sekundärlinks, Quellenlinks, Kachel-Links ≥ 44 px Zielhöhe; Fokusring 3 px `#BB7609`.
- **axe** (`wcag2a`, `wcag2aa`, `wcag21aa`) ohne serious/critical auf allen Phase-8-Seiten (390) und Stichprobe `/preise`, `/vergleich/hero-alternative`, `/fakten-ueber-craftos` in allen fünf Breiten.
- **CLS = 0**, **LCP = H1** (Köpfe ohne Bild), kein horizontaler Scroll bei 360 px außer Tabellen-Scrollbereich.

---

## Prüfmatrix für Planer und Auditor (nur lokal, globale Regel 5)

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Textbudgets inkl. G1–G5, C2, C3 | Vitest `design-v2-budgets.test.ts` (erweitert) | alle Phase-8-Inhalte im Budget |
| Wettbewerberbelege, Alter, Wortliste, Stärken, HERO-Variante | Vitest `wettbewerber.test.ts` | U1, U3, U6, U7, U11; > 60 Tage = Warnung |
| Brotkrumen | `seo-audit.mjs` + Playwright | alle Sitemap-URLs außer `/`: genau ein `nav[aria-label="Brotkrumen"]` und genau eine BreadcrumbList (auch in `@graph` gesucht), Namen/Pfade identisch; 360 px ohne Umbruch und ohne Seitenscroll |
| Antwort zuerst | `seo-audit.mjs` `answerFirstViolations` | 0 Verstöße auf zentralen Seiten; Prompt-Anker vorhanden |
| Metadaten | `seo-audit.mjs` | Title ≤ 60, Description 120–155, 1 H1, keine Duplikate (Titel, Description, H1), Map-Werte angewandt |
| OG | `seo-audit.mjs` | je Seite eigenes `og:image` im `prerender-manifest.json`, `.body` ≤ 300 KB, `twitter:image` = `og:image` |
| Paritäts-/Schutztests | `pricing-parity.test.ts`, `announcements.test.ts`, `route-audit.mjs`, `live-check.mjs` | grün nach D-23-Anpassung; CraftOS-Texte unverändert streng |
| Above-the-fold | Playwright 360 × 640 | CTA-Unterkante ≤ 640 auf Alternativen, `/preise`, `/vergleich`, kleine Betriebe |
| A11y, CLS | axe, `PerformanceObserver` | keine serious/critical, CLS 0 |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; nur Inspiration über `21st_magic_component_inspiration` (in dieser Sitzung nicht verfügbar), kein übernommener Code | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten: keine [R]. Schrift für OG: gebündelte `Geist-Regular.ttf` aus `next` (OFL), keine neue Datei.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

Geprüft: 2026-10-22, gsd-ui-checker. Hinweise P1–P5 und F1–F6 am selben Tag eingearbeitet (P1 Kopfwort HERO mit Messwerten, P2 Craftnote-Zusatzmodul, P3 Zahlweise je Zelle ohne „ab“, P4 „regulär derzeit“, P5 Verzeichnis § 9, F1 Rundungsregel, F2 E-Rechnungs-Ausnahmen, F3 HERO Variante B und Marktspanne, F4 Statt-Preis im Wortlaut, F5 Längen, F6 „Start“ 44 px).

**Approval:** approved 2026-10-22
