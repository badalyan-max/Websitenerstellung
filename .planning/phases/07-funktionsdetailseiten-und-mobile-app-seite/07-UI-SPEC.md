---
phase: 07
slug: funktionsdetailseiten-und-mobile-app-seite
status: approved
reviewed_at: 2026-10-21
shadcn_initialized: false
preset: none
created: 2026-10-21
---

# Phase 07 — UI-Designvertrag: Funktionsdetailseiten und Mobile-App-Seite

> Schlanker Vertrag für die feste Detailseiten-Vorlage `/funktionen/[slug]` (16 bestehende + 6 neue Seiten), die neue Mobile-App-Seite `/app`, den Szenenkatalog (MEDIA-01) und die Seitentexte (SEO-02). Erstellt vom gsd-ui-researcher am 21.10.2026, Prüfung durch gsd-ui-checker (D-18).

**Grundsatz:** Die genehmigten Verträge **[05]** (`05-UI-SPEC.md`, „Werkbank-Präzision“) und **[06]** (`06-UI-SPEC.md`) gelten **unverändert** – Gestaltungsrichtung, Tokens, Typoskala inkl. Ausnahme A2, Farben und Amber-Liste, Fokusring, Abstände inkl. 96-px-Ausnahme, Textbudgets, Bausteinverträge, Bewegungsregeln, Barrierefreiheit, Kurzform-Belege (E3), `DevicePair compact` (E1), `FeatureList` (E2). Dieser Vertrag legt nur fest, **wie** die vorhandenen Bausteine auf 23 Seiten zusammengesetzt werden, welche Texte und Szenen sie tragen und wo Ergänzungen nötig sind. Jede Abweichung steht in § „Abweichungen“ mit Begründung.

**Quellenkennzeichnung:** [D-xx] = `07-CONTEXT.md` (verbindlich), [R] = `07-RESEARCH.md`, [05]/[06] = genehmigte Verträge, [REL-W]/[REL-M] = am 21.10.2026 lesend geprüft am Web-Release `535206b4` bzw. Mobile-Release `5610a064` (`git show origin/release:…`), [ERMESSEN] = Entscheidung im Rahmen von „Claude's Discretion“.

**Faktenquellen (ausschließlich):** `lib/funktionen.ts`, `lib/product-register.ts`, `lib/site.ts` (`site.trialDays`, `site.ctaUrl`, `site.iosUrl`, `site.androidUrl`, `tarife`), `docs/product-pricing-snapshot.json`, `docs/seo/keyword-map.json`, Hilfeartikel, Release-Belege [REL-W]/[REL-M]. Zahlen, Preise und Testtage nie als Literal im JSX [05].

---

## Design-Kaskade (Projekt-CLAUDE.md)

### 1. frontend-design (Leitlinie gelesen, nicht kopiert)

Gelesen: `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md` (byte-identisch mit `a0b04d9ddcca`, per `cmp` geprüft; Stand wie Phase 5/6). Kein Skill-Werkzeug in dieser Sitzung; Anwendung auf die freien Achsen dieser Phase:

| Leitlinie | Anwendung Phase 7 |
|---|---|
| „Open with the most characteristic thing in the subject's world“ | Jeder Seitenkopf zeigt den **echten Bildschirm der Funktion** (vereinfacht, belegt) – nicht ein generisches Icon oder Kennzahlen-Hero. |
| „Spend your boldness in one place“ | Einziges markantes Element je Seite: Geräterahmen im Kopf. Ablauf ohne Amber-Fläche (`StepFlow tone="light"`), Kacheln flach. |
| Numbered markers nur bei echter Abfolge | Nummern nur im `StepFlow` (Ablauf je Funktion, Offline-Vorbereitung auf `/app`); Kernpunkte und Kacheln ohne Nummern. |
| Default-Muster vermeiden (SaaS-Kartenbaukasten, Eyebrow über jeder Überschrift, „→“ an Links) | Eyebrow nur im Kopf (Gruppenname = echte Kategorie), Abschnittsköpfe ohne Eyebrow; Kacheln in Größen- und Flächenvariation; keine Pfeilglyphen. |
| „Single orchestrated moment“ statt verstreuter Effekte | Höchstens **ein** animiertes Element je Seite (`FeatureSnippet`, nur auf 8 Seiten, D-19); alle anderen Seiten statisch. |
| Texte aus Nutzersicht, gleiche Aktion = gleicher Name | CTA überall „10 Tage kostenlos testen“; Sekundärlink je Seite nur zwei feste Formulierungen (siehe Copywriting). |

### 2. ui-ux-pro-max (ausgeführt am 21.10.2026, lokal)

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas feature detail page product tour" --domain ux
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "mobile app landing page features phone mockup" --domain ux
# ergänzend:
py -3.12 -X utf8 .../search.py "feature page hero above the fold mobile cta" --domain ux
py -3.12 -X utf8 .../search.py "app showcase phone mockup feature grid" --domain landing
```

| Treffer | Übernommen? | Begründung |
|---|---|---|
| Image Optimization (High) | Ja, implizit | Keine Rasterbilder im Kopf; Produkt als Code-UI, LCP = H1. QR-Codes bleiben SVG mit `width`/`height`. |
| Active State der Navigation (Medium) | Bereits erfüllt | `aria-current` + Unterstrich aus [06]; Detailseiten markieren den Bereich „Funktionen“. |
| Mobile Keyboards (Medium) | Nicht anwendbar | Keine Formulare. |
| Error Placement (Medium) | Nicht anwendbar | Keine Formulare. |
| Landing-Muster „Product Demo + Features“ (Hero mit Mockup → Funktionsaufschlüsselung → CTA) | Ja | Deckt sich mit D-02 und D-09. |
| Landing-Muster „App Store Style Landing“: Device-Mockup, Feature-Icons, Store-Buttons, QR | Teilweise | Übernommen: Phone im Kopf, Store-Links, QR (≥ 1024 px). **Verworfen:** Screenshot-Karussell (Client-JS, D-15), Sternebewertungen „4.5+“ (nicht belegt, [05] MEDIA-03). |
| „Use interactive mockup / auto-play video“ | Nein | Videos außerhalb des Meilensteins; Interaktion wäre neue Client-Insel (D-15). |

### 3. 21st.dev

**Nicht verfügbar** – `21st_magic_component_inspiration` steht in dieser Sitzung nicht als Werkzeug bereit; keine Referenzen abgerufen oder behauptet. Executor: falls verfügbar, nur `21st_magic_component_inspiration` mit „feature detail page“, „app feature grid phone“, „role permissions panel“; nie `_builder`/`_refiner`; Ergebnis in `craftos/docs/DESIGN-V2.md` § 16 vermerken.

### 4. Context7

**Nicht als Werkzeug verfügbar.** Ersatz wie Phase 6: mitgelieferte Doku `craftos/node_modules/next/dist/docs` (`generate-metadata.md`: Title-Template `%s | CraftOS` gilt für Detailseiten → Seitenwert ohne Suffix; `params` ist ein `Promise`). Keine weiteren API-Fragen offen.

### 5. SEO-Check

Siehe § „SEO-Vertrag“ (Title/H1/Description je Seite, Kopfwort-Regel, JSON-LD). Nachweis der Kaskade im Plan: `craftos/docs/DESIGN-V2.md` § 16 „Kaskade Funktionsdetailseiten und /app“ [R].

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System `craftos/app/globals.css` + CSS-Module [05, 06] |
| Preset | not applicable |
| Component library | none – v2-Bausteine `craftos/components/v2/*` (React Server Components) |
| Icon library | `lucide-react` 0.475.0 [BESTAND] |
| Font | Clash Display (H1, H2, Kachel-/Schritttitel, Kennzahlen) + General Sans (Text, Labels) über `next/font/local` [05] |
| Neue Dateien | `components/funktionen/FunktionsKopf.tsx` (+ `.module.css`), `components/funktionen/FunktionsDetail.tsx` (sync Server Component), `components/funktionen/PlattformRollen.tsx` (+ `.module.css`), `lib/funktionsdetails/*.ts` (server-only, je Gruppe), `lib/app-content.ts` [R Empfohlene Struktur] |

### Ergänzungen (nur diese fünf, budgetgeprüft)

| # | Ergänzung | Inhalt | Begründung |
|---|---|---|---|
| F1 | `FunktionsKopf` (neu) | Seitenkopf aller 22 Detailseiten und `/app` (Vertrag unten). Gleich aufgebaut wie `HomeHero` [06], aber parametrisiert; `HomeHero` bleibt unverändert. | D-02 (1); `HomeHero` liest fest aus `home-content.ts`, `FunktionenHead` hat kein CTA/Visual [R Alternatives]. |
| F2 | `PlattformRollen` (neu) | Abschnitt 3: je Plattform ein flaches Panel mit Badge, Rollenliste, einem Satz und Lizenz-Badges. | D-02 (3); kein v2-Baustein bildet Rollen ab; Rollennamen sprengen das Badge-Budget (16). |
| F3 | `MiniStatusName` + Tonklassen | 16 neue Namen mit Release-Beleg (14 Status + 2 GAEB-Kennzeichen, Tabelle unten), drei Töne im `MiniUi.module.css`. | MEDIA-01, D-05; Pitfall 6 [R]. |
| F4 | `TEXT_BUDGET.pageHead` | **`pageHead: { lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 }`** – `lead` (140) bleibt unverändert für den Seitenkopf von `/funktionen`; `kopfLead` (110) gilt für den Kurznutzen im `FunktionsKopf` (Fehlertext „pageHead.kopfLead“); `h1` und `eyebrow` für den `FunktionsKopf`. Mengen: `count.detailSteps: { min: 3, max: 5 }`, `count.related: { min: 2, max: 3 }`. | Above-the-fold 360 × 640 (D-15); D-02 „3–5 Schritte“, „2–3 Links“. |
| F5 | `ZusatzZiel.kind` + `"seite"` | Zielhinweis „Beschrieben unter {label}“ wie `funktion`. | D-21: „21 Sprachen“ verlinkt auf `/app`. |

---

## Spacing Scale

Unverändert aus [05]/[06] (alle Werte Vielfache von 4):

| Token | Value | Usage in Phase 7 |
|-------|-------|-------|
| xs | 4px | Icon ↔ Text in Badges, Rollen-Zusatz ↔ Name |
| sm | 8px | CTA ↔ Sekundärlink gestapelt (< 768 px), Badge-Gruppen, Abstand Rahmen ↔ Kennzeichnung |
| md | 16px | H1 → Lead, Zeilen der Rollenliste, Panel-Innenabstand < 768 px, Kartenlücke mobil |
| lg | 24px | Kopf oben < 768 px, Eyebrow → H1, Lead → CTA < 768 px, Panel-Innenabstand ≥ 768 px, Panel-Lücke, CTA → StoreLinks (`/app`) |
| xl | 32px | Lead → CTA ≥ 768 px, Text → Produkt gestapelt, Panel-Lücke ≥ 1024 px |
| 2xl | 48px | Spaltenlücke Kopf ≥ 1024 px, Abschnittskopf → Inhalt ≥ 768 px, `StepFlow` → `FeatureSnippet`, Abschnittsabstand < 768 px |
| 3xl | 64px | Kopf oben ≥ 1024 px, Abschnittsabstand 768–1023 px |

Exceptions: unverändert aus [05]/[06] – 96 px Abschnittsabstand ≥ 1024 px (`--spacing-section`), Touch-Ziele ≥ 44 × 44 px, Header 74/84 px und 18-px-Containerrand (Bestand), 12 px nur in `.v2-btn-cta` und Mini-UI. **Keine neuen Ausnahmen.**

---

## Typography

Unverändert aus [05]/[06]: vier Größen, zwei Gewichte (400/600).

| Role | Size | Weight | Line Height | Einsatz in Phase 7 |
|------|------|--------|-------------|-------------------|
| Label | 14px | 600 / 400 | 1.4 | 600: Eyebrow im Kopf, Badges, Schrittnummer. 400: Kennzeichnung, Kennzahlen-Hinweis, QR-Beschriftung |
| Body | 16px | 400 / 600 | 1.5 | 400: Kachel-, Schritt-, Panel- und FAQ-Text, Kopf-Lead < 768 px. 600: Rollenname, FAQ-Frage, CTA, Textlinks |
| Heading | 20px | 600 (Clash) / 400 (General Sans, Lead) | 1.25 / Lead 1.4 | h3 in Kacheln, Schritten, Panels, Karten; Lead der Abschnittsköpfe; Kopf-Lead ≥ 768 px |
| Display | `clamp(32px, 4vw, 48px)` (48 px ab 1200 px), 32 px unter 768 px; **H1 im `FunktionsKopf` < 400 px Fensterbreite: 28 px** | 600 | 1.1 | H1 (Kopf), H2 der Abschnittsköpfe, KeyFacts-Werte, CTA-Band-Überschrift |

**Regeln:**
- **H1 ohne Silbentrennung** wie [06] Pitfall 7: `hyphens: manual`; das **Kopfwort-Token** (Spalte „Kopfwort-Span“ im SEO-Vertrag) steht in `<span data-keyword>` mit `white-space: nowrap; overflow-wrap: normal`.
- **28 px unter 400 px** gilt für den H1 jedes `FunktionsKopf` (Abweichung B1). Begründung (gemessen, Clash Display 600, `letter-spacing: -0.025em`, 32 px, Container 324 px bei 360 px Fensterbreite): „Eingangsrechnungen“ **328,0 px** und „Auftragsverwaltung:“ **324,6 px** sind zu breit; „Plantafel-Software:“ passt mit **295,3 px**. Eine Regel für alle Detailseiten statt Sonderfällen je Slug. Ab 400 px gilt die Display-Stufe.
- Überschriften `letter-spacing: -0.025em`, `text-wrap: balance`; Zahlen `tabular-nums`; keine Großbuchstaben-Labels, keine Einzelwort-Hervorhebung [05].
- Mini-UI in Rahmen von der Skala ausgenommen [05].

---

## Color

Unverändert aus [05]/[06]:

| Role | Value | Usage in Phase 7 |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` | Seitenhintergrund, Abschnitte Ablauf, Kernpunkte, Verwandte; Karten |
| Secondary (30%) | `#F7F3EB` (warm), `#101014` (dunkel) | Warm: Abschnitte Plattformen/Rollen und FAQ, Kachel- und Panelflächen. Dunkel: Kopf, CTA-Band, höchstens eine Bento-Kachel je Raster |
| Accent (10%) | `#F2AF38` | nur die Liste unten |
| Destructive | `#B32F28` | nicht verwendet (keine destruktiven Aktionen) |

**Accent reserved for** (Teilmenge der Liste aus [05]; keine neue Verwendung):
1. Hintergrund des Haupt-CTA „10 Tage kostenlos testen“ (Kopf, CTA-Band) bzw. „10 Tage testen“ (Header).
2. Sechseck-Knoten und Maßlinie der `StepFlow` (`tone="light"`).
3. `CraftOSMark` in Geräterahmen, aktiver Phone-Tab, Header-Logo ([06] A3).
4. Eyebrow-Text im dunklen Kopf (Gruppenname bzw. „Mobile-App“) und Icon-Feld der dunklen Bento-Kachel (Tönung `#F2AF381F`).
5. Untere Kante (3 px) des `FunktionsKopf` ([05] Punkt 6).

**Keine** vollflächige Amber-Fläche auf Detailseiten und `/app` (`StepFlow tone="amber"` bleibt der Startseite vorbehalten). Mini-Status-Töne nutzen ausschließlich `primary-100`/`primary-800` (helle Hinterlegung, nicht Akzentbudget) und Ink-Werte.

---

## Vorlage Detailseite `/funktionen/[slug]` (FEAT-02, D-02)

### Abschnittsfolge (verbindlich, für alle 22 Seiten gleich)

Flächenrhythmus [05]: Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel. Jeder Abschnitt 2–6 = `<section aria-labelledby>` mit `SectionHeader` (genau 1 H2 ≤ 60, genau 1 Satz Lead ≤ 140, **ohne Eyebrow**) + genau ein Baustein; zwei aufeinanderfolgende Abschnitte nutzen nie denselben Baustein [05]. H2 und Lead je Seite im Datenmodul (Pflichtfelder; H2 nennt Funktion oder Wortstamm des Keywords, keine generischen H2 wie „Features“).

| # | Abschnitt | Fläche | Baustein | `data-abschnitt` | Inhalt |
|---|---|---|---|---|---|
| 1 | Seitenkopf | `#101014`, Unterkante 3 px Amber | `FunktionsKopf` (F1) | `kopf` | Eyebrow (Gruppe), H1, Kurznutzen, CTA + Sekundärlink, Visual |
| 2 | Ablauf | Weiß | `StepFlow tone="light"` (3–5 Schritte) [+ `FeatureSnippet` auf 8 Seiten] | `ablauf` | Schritte aus dem Datenmodul; Icons nur, wenn alle Schritte eins haben (Standard: keine) |
| 3 | Plattformen und Rollen | `#F7F3EB` | `PlattformRollen` (F2) | `rollen` | 1 Panel je Plattform aus `funktionen[].platforms` |
| 4 | Kernpunkte | Weiß | `BentoGrid` (3–7 Kacheln) | `kernpunkte` | Kernpunkte + Grenze-Kachel + Zusatzfunktions-Kacheln |
| 5 | FAQ | `#F7F3EB` | `FaqList` (3–8) + `JsonLd(faqSchema(dasselbeArray))` | `faq` | nur belegte Antworten |
| 6 | Verwandte Funktionen | Weiß | `FeatureCard`-Raster (2–3) | `verwandt` | gleiche oder benachbarte Gruppe |
| 7 | Abschluss | `#101014` | `CtaBand` (ersetzt `TrialCta`) | `cta` | fester Text (Copywriting) |

Entfällt (URLs bleiben, D-04): `PageHero`, Fließtext-Bullets mit H2 je Punkt, `<ol>`-Fließtextschritte, Zugriffsabsatz, alte `Faq`, `TrialCta`, synthetische FAQ, Hilfe-Sonderfälle je Slug (→ Sekundärlink). Der GoBD-Link für 4 Slugs bleibt als Link in der Grenze-Kachel (Kachel-`href` = `/gobd`).

### Abschnitt 1 – `FunktionsKopf` (F1)

```ts
type KopfVisual =
  | { kind: "browser" | "phone"; scene: FrameScene }
  | { kind: "pair"; browser: FrameScene; phone: FrameScene; description: string }; // description ≤ 140
interface FunktionsKopfProps {
  id: string;                                  // H1-id, z. B. "funktion-titel"
  eyebrow: string;                             // Gruppenname (≤ 24) bzw. "Mobile-App"
  h1: string;                                  // === keyword-map target.h1 (≤ 60)
  keyword: string;                             // Kopfwort-Token, muss wörtlich in h1 vorkommen → nowrap-Span
  lead: string;                                // Kurznutzen, genau 1 Satz, ≤ 110
  secondary?: { label: string; href: string }; // Detailseiten: Pflicht; /app: entfällt
  visual: KopfVisual;
  stores?: boolean;                            // nur /app: StoreLinks + QR (≥ 1024 px)
}
```

Fehlertexte (werfen beim Rendern, Muster [05]): „FunktionsKopf: H1 enthält das Kopfwort ‚{keyword}‘ nicht – keyword-map.json oder Datenmodul prüfen.“; „Textbudget überschritten: pageHead.kopfLead hat {n} von 110 Zeichen – Satz kürzen.“; „FunktionsKopf: Lead hat {n} Sätze – genau einen Satz schreiben.“

**Aufbau:** `<section data-funktions-kopf aria-labelledby={id}>` → `.site-container` → Textspalte (Eyebrow `.v2-eyebrow` dunkel, `<h1>`, `<p>` Lead, Aktionsgruppe) → Produktspalte (`figure`). DOM-Reihenfolge Text vor Visual (CTA vor dem Visual, Pitfall 9).

| Breite | Raster | Abstände | Visual |
|---|---|---|---|
| 360 / 390 (< 768) | 1 Spalte: Eyebrow → H1 → Lead → CTA (volle Breite) → 8 px → Sekundärlink (44 px hoch) → 32 px → Visual | oben 24, unten 48; Eyebrow → H1 24; H1 → Lead 16; Lead → CTA 24 | Browser: 100 % Breite (16:10). Phone: `width={240}`, zentriert. Paar: `DevicePair layout="compact" tone="dark"` [06 E1] |
| 768 | 1 Spalte, CTA und Sekundärlink nebeneinander (Lücke 24) | oben 48, unten 64; Lead → CTA 32 | Browser max. 640 px, linksbündig; Phone 240 zentriert; Paar nebeneinander |
| 1024 | 2 Spalten `minmax(0,1fr) minmax(0,1fr)`, Lücke 48, `align-items: center` | oben 64, unten 96 | Visual füllt die Produktspalte (456 px); Phone 240 zentriert |
| 1440 | wie 1024 (Container 1280, Spalten 616 px) | wie 1024 | Browser 616 × 385 px; Paar wie Startseite [06] |

- Fläche `#101014` **ohne** 72-px-Linienraster (bleibt Startseiten-Motiv [05]); `border-bottom: 3px solid #F2AF38`.
- Lead: 16/400 `#BCBCC6` < 768 px, 20/400 ab 768 px, max. 60ch.
- CTA `.v2-btn-cta` „10 Tage kostenlos testen“ → `site.ctaUrl`, `data-track="trial"`, Icon `ArrowUpRight`. Sekundärlink 16/600 `#F4F4F5`, unterstrichen (Offset 5 px), min. 44 px hoch, keine Pfeilglyphe – Stil wie `HomeHero` `.secondary`.
- Visual ist **kein** LCP-Element und nicht lazy; Rahmen mit Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“ in der `figcaption` [05 §9]; Rahmen-`tone="dark"`.
- `/app` (`stores`): Aktionsgruppe = CTA, darunter 24 px `StoreLinks` [BESTAND]; ab 1024 px rechts neben den StoreLinks die zwei QR-Codes (`/images/mobile/qr-ios.svg`, `qr-android.svg`, je 96 × 96 px, `width`/`height` gesetzt, Beschriftung 14/400 „iPhone und iPad“ bzw. „Android“). Kein Sekundärlink.

**Above-the-fold-Kriterien (Playwright, `reducedMotion: "reduce"`, alle 22 Seiten + `/app`):**

| Viewport | Rechnung (ungünstigster Fall: H1 4 Zeilen à 30,8 px, Lead 4 Zeilen à 24 px) | Prüfkriterium |
|---|---|---|
| 360 × 640 | 74 Header + 24 + Eyebrow 20 + 24 + H1 124 + 16 + Lead 96 + 24 + CTA 48 = **450 px** | H1, Lead und CTA vollständig sichtbar (`getBoundingClientRect().bottom ≤ 640`); kein horizontaler Scroll; Kopfwort-Span ≤ Containerbreite |
| 390 × 844 | wie oben mit 32 px (H1 4 Zeilen à 35,2) ≈ 466 px | wie oben + Oberkante `figure` < 844 |
| 768 × 1024 | einspaltig | H1, Lead, CTA sichtbar; Oberkante `figure` < 1024 |
| 1024 × 768 / 1440 × 900 | zweispaltig | H1, Lead, CTA und Oberkante `figure` sichtbar; CLS = 0 |

### Abschnitt 2 – Ablauf

- `StepFlow tone="light"` mit 3–5 Schritten (F4), `label` = H2. Texte siehe § „Seitentexte“.
- **`FeatureSnippet` (D-19)** nur auf `dashboard`, `angebote`, `plantafel`, `rechnungen`, `eingangsrechnungen`, `zeiterfassung`, `lager`, `aufmass` mit der bisherigen Variante (`dashboard`, `angebot`, `planung`, `rechnung`, `beleg`, `zeit`, `lager`, `aufmass`). Platz: 48 px unter dem `StepFlow`, `max-width: 640px`, linksbündig, umhüllt von `<figure data-figure="snippet">` mit `IllustrationLabel kind="vereinfacht"` darunter (8 px). Einziges animiertes Element der Seite, unterhalb der Falz; Reduced Motion zeigt den Endzustand [05]. Auf allen anderen 14 Seiten und auf `/app` kein `FeatureSnippet`.

### Abschnitt 3 – `PlattformRollen` (F2)

```ts
type RolleName = "Admin" | "Büro-Leitung" | "Büro-Projektleitung"
  | "Mobil-Teamleitung" | "Mobil-Teammitglied" | "Kunde"; // „Büro“ ist Lizenzstufe, keine Rolle
interface PlattformPanel {
  platform: "web" | "mobile";          // nur Werte aus funktionen[].platforms
  rollen: { name: RolleName; zusatz?: string }[]; // 0–4; zusatz ≤ 40; leer → nur Satz
  satz: string;                        // genau 1 Satz, ≤ 90: was auf dieser Plattform passiert
  lizenzen: ("voll" | "app")[];        // LicenseBadge
}
```

```
≥ 768 px (2 Plattformen)                       Web-only: 1 Panel, max. 50 % ab 1024 px
┌ [▣] Web-App (Badge) ─────────────┐ ┌ [▯] Mobile-App (Badge) ──────────┐
│ h3 „Im Büro“                     │ │ h3 „Auf der Baustelle“            │
│ • Admin                          │ │ • Mobil-Teammitglied  eigene Zeiten│
│ • Büro-Leitung  Finanzfreigabe   │ │ • Mobil-Teamleitung   auch fremde │
│ Satz (16/400 ink-500)            │ │ Satz                              │
│ Enthalten in: [Voll-Lizenz]      │ │ Enthalten in: [Voll-Lizenz][App-…]│
└──────────────────────────────────┘ └───────────────────────────────────┘
```

- Panel = `<article>` auf Weiß, 1 px `ink-200`, Radius 16 px, Innenabstand 24 px (16 px < 768), kein Schatten. Kopf: Icon-Feld 48 × 48 (Radius 12, `primary-100`, Icon 24 px `primary-800`: `Monitor` bzw. `Smartphone`) + `PlatformBadge`; h3 „Im Büro“ (web) bzw. „Auf der Baustelle“ (mobile), 20/600 Clash.
- Rollenliste `<ul aria-label="Rollen">`: Name 16/600 `ink-900`, Zusatz 16/400 `ink-500` mit 4 px Abstand; Zeilen 8 px Abstand; Icon `UserRound` 16 px `ink-400` (Dekor) davor.
- `LicenseBadge`-Gruppe `aria-label="Enthalten in"`, 16 px über dem Panelende.
- Raster: < 768 eine Spalte, ≥ 768 zwei Spalten (Lücke 24, ab 1024 32).
- **Rollenwerte (verbindlich, nur aus [R] „Rollenmodell“ / [REL-W] `roles.ts` `ROLES`):** „Admin“, „Büro-Leitung“, „Büro-Projektleitung“, „Mobil-Teamleitung“, „Mobil-Teammitglied“ und „Kunde“ (nur Kundenportal). **„Büro“ ist eine Lizenzstufe (`getLicenseLabel`), keine Rolle** und erscheint nie in der Rollenliste; wo alle Büro-Zugänge gemeint sind, stehen beide Büro-Presets, die Lizenz zeigt das Badge „Voll-Lizenz“. Keine freien Bezeichnungen („Bauleiter“, „Monteur“). Vitest: jeder Name ∈ `RolleName`. Zusätze nach den Preset-Beschreibungen des Releases: Büro-Leitung „Büro voll, alle Projekte, globale Finanzen – Einstellungen nur lesen“; Büro-Projektleitung „zugewiesene und selbst angelegte Projekte, keine globalen Finanzbereiche“.

| Seite | Web-Panel: Rollen (Zusatz) | Mobile-Panel: Rollen (Zusatz) | Lizenzen Web / Mobile |
|---|---|---|---|
| dashboard | Admin, Büro-Leitung, Büro-Projektleitung (Zahlen nach Rechten) | – | voll / – |
| projektverwaltung | Admin, Büro-Leitung (alle Projekte), Büro-Projektleitung (eigene und zugewiesene) | Mobil-Teamleitung, Mobil-Teammitglied (zugewiesene Projekte) | voll / voll, app |
| angebote | Admin, Büro-Leitung, Büro-Projektleitung (eigene Projekte) | – (Satz: „Dokumente unterschreiben Sie je nach Rolle und Freigabe in der App.“) | voll / voll |
| rechnungen, e-rechnung, gaeb | Admin, Büro-Leitung, Büro-Projektleitung (eigene Projekte) | – | voll / – |
| buchhaltung, bankabgleich, nachkalkulation | Admin, Büro-Leitung (globale Finanzen) | – | voll / – |
| eingangsrechnungen | Admin, Büro-Leitung (globale Finanzen) | – (Satz: Belegscan nur mit Finanzfreigabe) | voll / voll |
| mahnwesen | Admin, Büro-Leitung (Einstellungen nur lesen); Satz: Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs | – | voll / – |
| plantafel | Admin, Büro-Leitung, Büro-Projektleitung | Mobil-Teamleitung, Mobil-Teammitglied (eigene Einsätze) | voll / voll, app |
| terminplanung (D-20) | Admin, Büro-Leitung, Büro-Projektleitung (Satz: geplant wird im Web) | Mobil-Teamleitung, Mobil-Teammitglied (Satz: Arbeitsabschnitte im Projekt und am Einsatz sehen) | voll / voll, app |
| zeiterfassung | Admin, Büro-Leitung, Büro-Projektleitung (Auswertung) | Mobil-Teammitglied (eigene Zeiten), Mobil-Teamleitung (auch Zeiten anderer) | voll / voll, app |
| lager | Admin, Büro-Leitung, Büro-Projektleitung | – (Satz: berechtigte Mitarbeitende scannen und sehen freigegebene Lager) | voll / voll, app |
| baudokumentation, maengelmanagement, aufmass, arbeitsanweisungen | Admin, Büro-Leitung, Büro-Projektleitung | Mobil-Teamleitung, Mobil-Teammitglied (mit Projektzugriff) | voll / voll, app |
| team | Admin (Rollen und Sitze vergibt nur der Inhaber) | Mobil-Teamleitung, Mobil-Teammitglied (Urlaub beantragen) | voll / voll, app |
| kundenportal | Admin, Büro-Leitung, Büro-Projektleitung (laden ein), Kunde (eigener Zugang im Browser) | – | voll / – |
| datenuebernahme | Admin, Büro-Leitung | – | voll / – |

Planer-Pflicht: Die Zuordnung je Seite wird im Test gegen `FEATURE_ACCESS` und die Preset-Schalter am Release geprüft (`git show origin/release:src/types/license.ts`); bei Abweichung gilt der Release.

### Abschnitt 4 – Kernpunkte (`BentoGrid`)

**Kachelregeln:**
- 3–7 Kacheln, ≥ 2 Größen, ≤ 1 dunkle Kachel [05]; Text genau 1 Satz (sm/md ≤ 90, lg/wide ≤ 120), Titel ≤ 40.
- Visual je Kachel: Lucide-Icon (Standard) oder **eine** zweite Szene (nur Zusatzfunktion mit belegtem Bildschirm, nie die Kopf-Szene). Kacheln auf weißem Abschnitt `surface="warm"`.
- **Grenze-Kachel Pflicht**, wenn `funktionen[].note` bzw. Register-Limitation eine Einschränkung nennt (D-04, Pitfall 8): Icon `Info`, Titel nennt die Einschränkung sachlich (z. B. „Standort nur bei Start und Stopp“), `surface="white"`. Bei `buchhaltung`, `rechnungen`, `e-rechnung`, `eingangsrechnungen` verlinkt sie auf `/gobd` (Bestand).
- **Zusatzfunktions-Kachel** (D-02 (4), Zuordnung unten): Größe `lg` (nur mit belegter Phone-Szene), sonst `wide` oder `md` – **nie `sm`**; Titel = Anzeigename aus [06] E2, `data-zusatz="<id>"`, Text belegt.
- **Zulässige Anordnungen** (lückenlos bei 4 Spalten; Vitest prüft die Größenfolge gegen diese Liste): mit `lg` (nur mit Rahmen-Visual): 4 = lg·sm·sm·md · 5 = lg·sm·sm·md·wide · 6 = lg·sm·sm·md·md·md · 7 = lg·sm·sm·md·md·sm·sm. Ohne `lg`: 3 = md·sm·sm · 4 = md·sm·sm·wide · 5 = md·sm·sm·wide·wide **oder** sm·sm·sm·sm·wide **oder** md·sm·sm·md·md · 6 = md·sm·sm·md·sm·sm · 7 = md·sm·sm·md·sm·sm·wide. Unter 1024 px gelten die Raster aus [05] (2 bzw. 1 Spalte).

**Inhalt je Seite (verbindlich):** Reihenfolge = Rasterreihenfolge; je Kachel **Größe**, Titel (≤ 40) – Text (genau 1 Satz, sm/md ≤ 90, lg/wide ≤ 120), Zeichenzahl in Klammern, Visual in eckigen Klammern (Lucide-Name, in `lucide-react` 0.475 als Export geprüft, bzw. Phone-Szene). Quelle: `funktionen.ts` `points`/`note`, [R] „Neue Detailseiten“, [REL-W]/[REL-M]. 107 Kacheln, per Node gezählt: alle im Budget, alle Anordnungen zulässig. Der Zusatz-Titel „{n} Sprachen in der Mobile-App“ und die Zahl im Text kommen aus `mobileLocales.length`. „Grenze“-Kacheln von `rechnungen`, `e-rechnung`, `buchhaltung`, `eingangsrechnungen` verlinken auf `/gobd`.

| Seite | Anordnung | Kacheln |
|---|---|---|
| dashboard | md·sm·sm·wide | **md** „Zahlen mit Zusammenhang“ (23) – „Aktive Projekte, offene Angebote, offene Beträge und Stunden führen direkt in die Arbeit.“ (89) [LayoutDashboard]<br>**sm** „Umsatz im Verlauf“ (17) – „Die Entwicklung über die Zeit mit dem Vorjahr vergleichen.“ (58) [TrendingUp]<br>**sm** „Ihre Arbeitsfläche“ (18) – „Widgets verschieben, vergrößern, ausblenden oder sensible Zahlen weichzeichnen.“ (79) [LayoutGrid]<br>**wide Grenze** „Nur erfasste Daten zählen“ (25) – „Die Auswertung berücksichtigt ausschließlich Daten, die in Ihrem Betrieb tatsächlich erfasst sind.“ (98) [Info] |
| projektverwaltung | md·sm·sm·wide·wide | **md Zusatz** „Kunden in der App“ (17) – „Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.“ (68) [Contact]<br>**sm** „Klare Projektbereiche“ (21) – „Übersicht, Terminplanung, Dokumente und weitere Bereiche liegen in Reitern.“ (75) [PanelsTopLeft]<br>**sm** „Dateien wiederfinden“ (20) – „Ordner, Unterordner und Filter ordnen Pläne, Bilder und Unterlagen.“ (67) [FolderOpen]<br>**wide Zusatz** „Projekt-Chat und Nachrichten“ (28) – „Rückfragen im Projekt-Chat beim Auftrag klären und Direktnachrichten im Posteingang der App lesen.“ (98) [MessagesSquare]<br>**wide Grenze** „Zugriff nach Rolle“ (18) – „Die Büro-Projektleitung sieht nur zugewiesene und eigene Projekte, globale Finanzbereiche bleiben gesperrt.“ (107) [Info] |
| angebote | md·sm·sm·wide·wide | **md** „Kosten nachvollziehen“ (21) – „Lohn, Material, Geräte, Fremdleistungen und weitere Kosten je Position kalkulieren.“ (83) [Calculator]<br>**sm** „Positionen wiederverwenden“ (26) – „Eigene Artikel und Leistungsvorlagen sparen wiederholte Eingaben.“ (65) [Copy]<br>**sm** „Mengen übernehmen“ (17) – „Geprüfte Aufmaßmengen als Angebotspositionen verwenden.“ (55) [Ruler]<br>**wide** „Dokumente ausgeben“ (18) – „Das Angebot als PDF mit Ihren Firmenangaben und Ihrem Briefpapier erstellen.“ (76) [FileDown]<br>**wide Zusatz** „Angebotsunterschrift online“ (27) – „Ihr Kunde nimmt das Angebot online an und unterschreibt es oder sendet eine Ablehnung.“ (86) [Signature] |
| rechnungen | md·sm·sm·wide·wide | **md** „Passender Belegtyp“ (18) – „Rechnung, Abschlag, Teil- und Schlussrechnung sowie Storno und Korrektur stehen bereit.“ (87) [Files]<br>**sm** „Kontrolliert fertigstellen“ (26) – „Die Rechnungsnummer entsteht erst beim Fertigstellen.“ (53) [Lock]<br>**sm** „Zahlungen zuordnen“ (18) – „Zahlungseingänge und Teilzahlungen an der Rechnung erfassen.“ (60) [Wallet]<br>**wide** „Berichte abrechnen“ (18) – „Geeignete Leistungen aus Berichten in eine Einzel- oder Sammelrechnung übernehmen.“ (82) [NotebookPen]<br>**wide Grenze** „Korrektur nur über Folgebelege“ (30) – „Fertige Rechnungen korrigieren Sie über Folgebelege, und eine erfasste Zahlung ist keine Bankbestätigung.“ (105) [Info] |
| e-rechnung | md·sm·sm·wide | **md** „XRechnung“ (9) – „Strukturierte XML-Daten im Format UBL 2.1 für entsprechende Empfangsprozesse erzeugen.“ (86) [FileCode]<br>**sm** „ZUGFeRD“ (7) – „Die lesbare PDF/A-3 enthält zusätzlich die strukturierten Rechnungsdaten.“ (73) [FileCheck2]<br>**sm** „Strukturierter Eingang“ (22) – „E-Rechnungsdaten werden direkt gelesen, ohne OCR.“ (49) [FileInput]<br>**wide Grenze** „Eine PDF ist keine E-Rechnung“ (29) – „Eine gewöhnliche PDF enthält keine strukturierten Daten, und nötige Referenzen hängen vom Empfänger ab.“ (103) [Info] |
| buchhaltung | md·sm·sm·wide | **md** „Buchungsjournal“ (15) – „Buchungen und Belegbezüge bleiben in einem gemeinsamen Ablauf nachvollziehbar.“ (78) [BookOpen]<br>**sm** „Geprüfte Belege“ (15) – „Zuordnung, Kontierung und Festschreibung bereiten die Übergabe vor.“ (67) [ClipboardCheck]<br>**sm** „DATEV-Ausgabe“ (13) – „Ein Assistent erstellt CSV- oder ZIP-Dateien zur Weiterverarbeitung.“ (68) [FileOutput]<br>**wide Grenze** „Keine ELSTER-Einreichung“ (24) – „Der Export ersetzt weder die fachliche Prüfung noch die Steuererklärung, eine ELSTER-Einreichung erfolgt nicht.“ (111) [Info] |
| eingangsrechnungen | md·sm·sm·wide | **md** „Vom Foto zur Prüfung“ (20) – „Die App führt über Upload und Erkennung zu Feldern, die Sie bearbeiten können.“ (78) [ScanLine]<br>**sm** „Doppelte Belege erkennen“ (24) – „Hinweise auf mögliche Dubletten helfen vor der Übernahme.“ (57) [CopyCheck]<br>**sm** „Kosten zuordnen“ (15) – „Projektzuordnungen stellen den Bezug zur Nachkalkulation her.“ (61) [FolderKanban]<br>**wide Grenze** „KI-Auslesen mit Verbindung und Credits“ (38) – „Das KI-Auslesen braucht eine Verbindung und verbraucht Credits, strukturierte E-Rechnungen werden ohne OCR gelesen.“ (115) [Info] |
| plantafel | md·sm·sm·md·sm·sm | **md** „Einsatzorte auf der Karte“ (25) – „Sehen, wo Ihr Team eingeplant ist, und Einsätze nach Tag und Mitarbeiter filtern.“ (81) [MapPin]<br>**sm** „Mehrtägige Einsätze“ (19) – „Einsätze über mehrere Tage mit Bezug zum Projekt planen.“ (56) [CalendarRange]<br>**sm** „Änderungen direkt vornehmen“ (27) – „Einsätze verschieben, kopieren und zeitlich anpassen.“ (53) [Move]<br>**md** „Über Änderungen informiert“ (26) – „Verknüpfte Teammitglieder werden über neue und geänderte Einsätze benachrichtigt.“ (81) [BellRing]<br>**sm** „Kapazitäten berücksichtigen“ (27) – „Mitarbeiter, Abwesenheiten und Ressourcen bilden den Rahmen der Planung.“ (72) [Users]<br>**sm Grenze** „Geplante Orte, keine Live-Standorte“ (35) – „Die Karte zeigt geplante Einsatzorte, Karten und Routen in der App brauchen Verbindung.“ (87) [Info] |
| zeiterfassung | md·sm·sm·wide·wide | **md** „Arbeitszeit mit Standort“ (24) – „Beim Starten und Stoppen hält die App den Standort fest, im Büro sehen Sie ihn am Eintrag.“ (90) [MapPin]<br>**sm** „Das Projekt findet sich mit“ (27) – „Liegt ein Projektort im Radius, wählt die App beim Start dieses Projekt.“ (72) [Crosshair]<br>**sm** „Nachtragen und korrigieren“ (26) – „Manuelle Einträge ergänzen die Erfassung im Rahmen der Rechte.“ (62) [PencilLine]<br>**wide** „Stunden weiterverwenden“ (23) – „Projekt- und Monatsansichten unterstützen die Auswertung und die Nachkalkulation.“ (81) [ChartColumn]<br>**wide Grenze** „Standort nur bei Start und Stopp“ (32) – „Die App erfasst einzelne Standortpunkte und keine Bewegungsverläufe, dafür ist eine GPS-Freigabe nötig.“ (103) [Info] |
| lager | lg·sm·sm·md·wide | **lg Zusatz** „Lager-Scan und Wareneingang“ (27) – „In der App Artikel per Barcode scannen, den Bestand freigegebener Lager sehen und Ware zubuchen.“ (96) [Phone `app:Lager`, 194]<br>**sm** „Lagerorte abbilden“ (18) – „Bestände nach Lagerorten und Lagerplätzen ordnen.“ (49) [Warehouse]<br>**sm** „Bestände prüfen“ (15) – „Inventur und Bestandskorrektur gleichen mit dem tatsächlichen Material ab.“ (74) [ClipboardList]<br>**md** „Bewegungen nachvollziehen“ (25) – „Wareneingang, Entnahme, Umlagerung und Rückbuchung bilden den Materialfluss ab.“ (79) [ArrowLeftRight]<br>**wide Grenze** „Werte nur mit gebuchten Bewegungen“ (34) – „Bestands- und Kostenwerte stimmen nur, wenn die tatsächlichen Bewegungen gebucht werden.“ (88) [Info] |
| baudokumentation | lg·sm·sm·md·md·md | **lg Zusatz** „Abnahme und Teilabnahme“ (23) – „Abnahmen vor Ort protokollieren, Auftraggeber und Auftragnehmer unterschreiben in der App.“ (90) [Phone `app:Abnahme`, 194]<br>**sm** „Berichte abrechnen“ (18) – „Geeignete Leistungen in einen prüfbaren Rechnungsentwurf übernehmen.“ (68) [Receipt]<br>**sm** „Mängel“ (6) – „Mängel verfolgen Sie im Mängelmanagement bis zur Prüfung.“ (57) [TriangleAlert, `href` `/funktionen/maengelmanagement`]<br>**md Zusatz** „Bautagesbericht“ (15) – „Wetter, ausgeführte Arbeiten und Materialverbrauch in der App festhalten.“ (73) [NotebookPen]<br>**md** „Unterschriften mit Ort und Zeit“ (31) – „Beim Unterschreiben in der App werden Standort und Zeitpunkt mit erfasst.“ (73) [Signature]<br>**md Grenze** „Unterschrift braucht Standortfreigabe“ (37) – „Die mobile Unterschrift braucht Standortfreigabe, Foto-Uploads eine Verbindung.“ (79) [Info] |
| aufmass | md·sm·sm·wide·wide | **md** „Raumweise erfassen“ (18) – „Boden-, Wand- und Deckenflächen passend zu den Räumen gliedern.“ (63) [LayoutGrid]<br>**sm** „Abzüge berücksichtigen“ (22) – „Türen, Fenster und weitere Öffnungen fließen in die Mengen ein.“ (63) [Minus]<br>**sm** „Mengen übernehmen“ (17) – „Geprüfte Mengen im Angebot mit Leistung und Preis ergänzen.“ (59) [FileText]<br>**wide Zusatz** „Besichtigung“ (12) – „Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen, bevor Sie das Angebot schreiben.“ (111) [Camera]<br>**wide Grenze** „Maße werden eingegeben“ (22) – „Sie geben Maße ein und prüfen sie, eine Laseranbindung oder Fotogrammetrie wird nicht vorausgesetzt.“ (100) [Info] |
| arbeitsanweisungen | md·sm·sm·wide·wide | **md** „Arbeitsschritte in der App“ (26) – „Das Team sieht Anleitung, Material und Werkzeug je Schritt und hakt Erledigtes ab.“ (82) [ListChecks]<br>**sm** „Leistungen weitergeben“ (22) – „Der fachliche Inhalt des Quelldokuments wird übernommen.“ (56) [FileText]<br>**sm** „Preise schützen“ (15) – „Informationen für die Ausführung erscheinen ohne Verkaufspreise.“ (64) [EyeOff]<br>**wide** „Material zusammenführen“ (23) – „Eine gesammelte Materialliste unterstützt die Vorbereitung des Einsatzes.“ (73) [Package]<br>**wide Grenze** „Materialliste bucht keine Entnahme“ (34) – „Die Materialliste plant den Bedarf, die Entnahme buchen Sie im Lager.“ (69) [Info] |
| team | md·sm·sm·wide·wide | **md Zusatz** „{n} Sprachen in der Mobile-App“ (29) – „Mitarbeitende nutzen die Mobile-App in einer von {n} Sprachen.“ (61) [Languages, `href` `/app`]<br>**sm** „Passende Zugänge“ (16) – „Admin- und Büro-Lizenz arbeiten im Web, die App-Lizenz auf der Baustelle.“ (73) [KeyRound]<br>**sm** „Fünf Rollen-Presets“ (19) – „Vorgegebene Rollen erleichtern die Einrichtung, einzelne Rechte bleiben prüfbar.“ (80) [ShieldCheck]<br>**wide** „Abwesenheiten berücksichtigen“ (29) – „Urlaubsanträge und ihre Bearbeitung ergänzen die Team- und Einsatzplanung.“ (74) [CalendarOff]<br>**wide Grenze** „Lizenz und Rolle sind getrennt“ (30) – „Die Lizenz bestimmt Zugang und Preis, die Rolle die Rechte, und Rollen und Sitze vergibt nur der Inhaber.“ (105) [Info] |
| nachkalkulation | md·sm·sm·wide | **md** „Kostenarten getrennt sehen“ (26) – „Lohn, Material, Geräte, Fremdleistungen und weitere Kosten gegenüberstellen.“ (76) [ChartPie]<br>**sm** „Fortschritt einordnen“ (21) – „Kosten gemeinsam mit dem erfassten Projektfortschritt bewerten.“ (63) [Gauge]<br>**sm** „Besser kalkulieren“ (18) – „Abgeschlossene Aufträge als Grundlage für neue Angebote nutzen.“ (63) [TrendingUp]<br>**wide Grenze** „Prognosen sind Einschätzungen“ (29) – „Prognosen werden aus vorhandenen Daten berechnet und sagen kein künftiges Ergebnis zu.“ (86) [Info] |
| kundenportal | md·sm·sm·wide | **md** „Projekte, Termine und Nachrichten“ (33) – „Kunden sehen ihre Projekte und Termine und schreiben Ihnen direkt zum Projekt.“ (78) [MessageSquare]<br>**sm** „Dokumente im Browser“ (20) – „Freigegebene Angebote und Rechnungen erscheinen im Kundenbereich.“ (65) [Globe]<br>**sm** „Angebote beantworten“ (20) – „Kunden nehmen Angebote an oder lehnen sie mit Rückmeldung ab.“ (61) [CheckCheck]<br>**wide Grenze** „Zahlung per Überweisung“ (23) – „Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto im Rechnungs-PDF.“ (93) [Info] |
| gaeb | md·sm·sm·wide·wide | **md** „X83 mit Positionsvorschau“ (25) – „Leistungsverzeichnisse einlesen und Positionen in der Vorschau gezielt auswählen.“ (81) [FileInput]<br>**sm** „X84 Angebotsabgabe“ (18) – „Der Export setzt eine vollständig importierte Original-X83 voraus.“ (66) [FileOutput]<br>**sm** „DATANORM-Kataloge“ (17) – „Kataloge einlesen und fehlerhafte Zeilen prüfen; DATANORM v5 ist nicht pauschal zugesagt.“ (89) [BookOpen]<br>**wide** „Universalimport erkennt GAEB“ (28) – „Der Universalimport erkennt GAEB-Dateien an ihrer Dateiendung.“ (62) [Import]<br>**wide Grenze** „Nur GAEB DA XML“ (15) – „GAEB 90 und GAEB 2000 werden nicht unterstützt, Dateien sind bis 5 MiB in UTF-8 möglich.“ (88) [Info] |
| mahnwesen | md·sm·sm·md·sm·sm | **md** „Drei Stufen“ (11) – „Auf die Zahlungserinnerung folgen die erste und die zweite Mahnung.“ (67) [ListOrdered]<br>**sm** „Fristen in Tagen“ (16) – „Je Stufe legen Sie fest, ab wie vielen Tagen überfällig gemahnt wird.“ (69) [CalendarClock]<br>**sm** „Gebühr und Verzugszins“ (22) – „Mahngebühr und jährlichen Verzugszinssatz hinterlegen.“ (54) [Percent]<br>**md** „Vorlagen mit Platzhaltern“ (25) – „Betreff und Text je Stufe mit elf Platzhaltern vorbereiten.“ (59) [FileText]<br>**sm** „Mahnverlauf je Rechnung“ (23) – „An jeder Rechnung sehen, welche Stufe wann verschickt wurde.“ (60) [History]<br>**sm Grenze** „Nur Rechnungen“ (14) – „Abschlags- und Schlussrechnungen mahnt die Automatik nicht.“ (59) [Info] |
| terminplanung | md·sm·sm·wide·wide | **md** „Arbeitsabschnitte mit Zeitraum“ (30) – „Abschnitte für jedes Projekt mit Zeitraum anlegen und benennen.“ (63) [CalendarRange]<br>**sm** „Abhängigkeiten mit Versatz“ (26) – „Pfeile zeigen, welcher Abschnitt folgt, auch mit Versatz in Arbeitstagen.“ (73) [GitBranch]<br>**sm** „Projektplan in der Plantafel“ (28) – „Die Ansicht Projektplan zeigt alle Projekte über die Zeit.“ (58) [ChartGantt]<br>**wide** „Warnung bei Überschreitung“ (26) – „Ragt ein Arbeitsabschnitt über den Projektzeitraum hinaus, weist CraftOS darauf hin.“ (84) [TriangleAlert]<br>**wide Grenze** „Geplant wird im Web“ (19) – „Die Mobile-App zeigt Arbeitsabschnitte mit Status an, geändert wird die Planung in der Web-App.“ (95) [Info] |
| bankabgleich | md·sm·sm·wide·wide | **md** „Bankdatei importieren“ (21) – „CSV oder camt.053 bis 2 MiB und PDF-Kontoauszüge bis 10 MiB einlesen.“ (69) [Upload]<br>**sm** „Zuordnungsstatus“ (16) – „Jeder Umsatz zeigt, ob er zugeordnet ist oder noch offen.“ (57) [CircleCheck]<br>**sm** „Dubletten-Hinweis“ (17) – „Mögliche Dubletten werden zur Prüfung markiert.“ (47) [CopyCheck]<br>**wide** „Zahlungen an Rechnungen“ (23) – „Zahlungseingänge erfassen Sie direkt an der Rechnung und verbinden sie mit dem Umsatz.“ (86) [Receipt]<br>**wide Grenze** „Vorschläge nur auf Anforderung“ (30) – „KI-Vorschläge kommen nur auf Ihre Anforderung und kosten Credits, die Zuordnung entscheiden Sie selbst.“ (103) [Info] |
| datenuebernahme | md·sm·sm·wide | **md** „Anleitungen für 10 Anbieter“ (27) – „Exportanleitungen etwa für Craftnote, plancraft, HERO und TAIFUN erleichtern den Umstieg.“ (89) [BookOpen]<br>**sm** „Gängige Dateiformate“ (20) – „CSV, TSV, TXT und XLSX lassen sich einlesen.“ (44) [FileSpreadsheet]<br>**sm** „Kostenlose Import-KI“ (20) – „Für die Import-KI hinterlegen Sie keine Zahlungsdaten.“ (54) [Sparkles]<br>**wide Grenze** „Bis 10 MiB und 25.000 Zeilen“ (28) – „Je Datei gelten höchstens 10 MiB und 25.000 Zeilen, den Import starten Admin oder Büro-Leitung.“ (95) [Info] |
| maengelmanagement | md·sm·sm·md·sm·sm | **md** „Ort, Priorität und Frist“ (24) – „Jeder Mangel erhält Ort, Priorität von niedrig bis kritisch und ein Datum zum Erledigen.“ (88) [MapPin]<br>**sm** „Zuständige festlegen“ (20) – „Mitarbeiter oder Nachunternehmer als zuständig eintragen.“ (57) [UserCheck]<br>**sm** „Vorher und Nachher“ (18) – „Fotos vor und nach der Behebung am Mangel ablegen.“ (50) [Images]<br>**md** „Erinnerung bei Fälligkeit“ (25) – „Die App erinnert mit „Mangel fällig“ und listet überfällige Mängel gesondert.“ (77) [BellRing]<br>**sm** „Offene Mängel in der Abnahme“ (28) – „Das Abnahmeprotokoll zeigt die Zahl offener Mängel.“ (51) [ClipboardCheck]<br>**sm Grenze** „Fotos brauchen Verbindung“ (25) – „Foto-Uploads benötigen eine Verbindung zum Internet.“ (52) [Info] |

Satzregel-Hinweis: Ordinalzahlen wie „1. Mahnung“ zählt `sentenceCount` als Satzende; in Kachel-, Schritt- und Lead-Texten deshalb ausschreiben („erste Mahnung“). In Mini-UI-Zeilen (kein Satzbudget) bleibt „1. Mahnung“ wie im Release.

Verboten in Kacheln, FAQ und Panels: „automatisch“ ohne belegte Bedingung, „lückenlos“, „vollständig offline“, Online-Banking-Anbindung, „Bauphasen“ als UI-Begriff (Pitfall 7/8 [R], D-20, D-23).

### Abschnitt 5 – FAQ

- `FaqList` 3–8 Fragen (Standard 3–4), Frage ≤ 90 mit „?“, erster Satz ≤ 300 beantwortet direkt, gesamt ≤ 600 [05]; FAQPage-JSON-LD aus **demselben Array** (D-11).
- Quellen: SE-Ranking-Fragen (`docs/seo/data/kwmap/questions--*.json`), Hilfeartikel, `funktionen[].note`. Keine Rechtsberatung, keine Zusagen außerhalb des Registers.
- **Pflichtfrage je Seite** (gezählt, ≤ 58 Zeichen):

| Seite | Pflichtfrage | Kern der Antwort (Beleg) |
|---|---|---|
| dashboard | „Welche Kennzahlen zeigt das Dashboard?“ | aktive Projekte, offene Angebote/Beträge, Stunden, Umsatzverlauf (points) |
| projektverwaltung | „Sehen Mitarbeitende in der App alle Projekte?“ | nein, zugewiesene bzw. freigegebene (access, Rollenmodell) |
| angebote | „Kann mein Kunde das Angebot online unterschreiben?“ | ja, Annahme mit Unterschrift oder Ablehnung (QuoteSigning) |
| rechnungen | „Kann ich eine fertiggestellte Rechnung noch ändern?“ | nur über Folgebelege wie Storno/Korrektur (note) |
| e-rechnung | „Ist eine PDF-Rechnung eine E-Rechnung?“ | nein, gewöhnliche PDF nicht strukturiert (note) |
| buchhaltung | „Reicht CraftOS die Steuererklärung bei ELSTER ein?“ | nein (note) |
| eingangsrechnungen | „Verbraucht das Auslesen von Belegen Credits?“ | KI-Auslesen ja und braucht Verbindung; E-Rechnungsdaten ohne OCR (note) |
| plantafel | „Zeigt die Karte, wo meine Mitarbeitenden gerade sind?“ | nein, geplante Einsatzorte (note) |
| zeiterfassung | „Erfasst die App dauerhaft den Standort?“ | nein, Start und Stopp (note, Limitation) |
| lager | „Kann mein Team Artikel in der App per Barcode buchen?“ | ja, berechtigte Mitarbeitende, freigegebene Lager (access) |
| baudokumentation | „Was gehört in ein Bautagebuch?“ | produktbezogen: Wetter, ausgeführte Arbeiten, Material, Unterschrift mit Ort/Zeit [REL-M] |
| aufmass | „Werden Maße automatisch gemessen?“ | nein, Eingabe und Prüfung (note) |
| arbeitsanweisungen | „Sieht das Team in der Arbeitsanweisung die Verkaufspreise?“ | nein (points) |
| team | „Was ist der Unterschied zwischen Lizenz und Rolle?“ | Lizenz = Zugang/Preis, Rolle = Rechte (note, roles.ts) |
| nachkalkulation | „Woher kommen die Ist-Kosten in der Nachkalkulation?“ | Stunden, Material, Belege (steps) |
| kundenportal | „Können Kunden Rechnungen im Portal online bezahlen?“ | nein, Überweisung (note, Limitation) |
| gaeb | „Welche GAEB-Formate unterstützt CraftOS?“ | X83-Import, X83/X84-Export, nicht GAEB 90/2000 [REL-W] |
| mahnwesen | „Wann kommt die Mahnung nach der Zahlungserinnerung?“ | Fristen in „Tage überfällig“ selbst festlegen [REL-W] |
| terminplanung | „Kann mein Team den Bauzeitenplan in der App sehen?“ | ja, Arbeitsabschnitte im Projekt und am Einsatz, geplant wird im Web (D-20) |
| bankabgleich | „Brauche ich für den Zahlungsabgleich eine Bankverbindung?“ | Import per Datei (CSV, camt.053, PDF); keine Online-Anbindung behaupten [R] |
| datenuebernahme | „Aus welcher Software kann ich Daten übernehmen?“ | Anleitungen für 10 Anbieter, Dateien CSV/XLSX [REL-W] |
| maengelmanagement | „Wie erinnert CraftOS an fällige Mängel?“ | Erinnerung „Mangel fällig“, Liste „Überfällig“ [REL-M] |

### Abschnitt 6 – Verwandte Funktionen

- `FeatureCard`-Raster [05 §5] mit 2–3 Karten (Visual = Karten-Szene der Zielseite, siehe Szenenkatalog), nur **gleiche oder benachbarte Gruppe** (Reihenfolge Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team). Raster 1 / 2 / 3 Spalten; bei 2 Karten bleibt die dritte Spalte leer (linksbündig).
- H2 fest „Passende Funktionen“, Lead fest „Diese Funktionen arbeiten mit denselben Projektdaten weiter.“ (identisch auf allen Seiten, Navigation).

| Seite | Verwandt | Seite | Verwandt |
|---|---|---|---|
| angebote | aufmass, gaeb, projektverwaltung | rechnungen | e-rechnung, mahnwesen, bankabgleich |
| aufmass | angebote, gaeb, arbeitsanweisungen | e-rechnung | rechnungen, eingangsrechnungen |
| kundenportal | angebote, projektverwaltung | mahnwesen | rechnungen, bankabgleich |
| gaeb | angebote, aufmass | buchhaltung | bankabgleich, eingangsrechnungen, rechnungen |
| plantafel | terminplanung, projektverwaltung, zeiterfassung | eingangsrechnungen | buchhaltung, e-rechnung, nachkalkulation |
| projektverwaltung | terminplanung, arbeitsanweisungen, baudokumentation | nachkalkulation | dashboard, eingangsrechnungen |
| arbeitsanweisungen | projektverwaltung, angebote, lager | dashboard | nachkalkulation, buchhaltung |
| terminplanung | plantafel, projektverwaltung | bankabgleich | buchhaltung, rechnungen, mahnwesen |
| zeiterfassung | plantafel, baudokumentation | team | datenuebernahme, dashboard |
| baudokumentation | maengelmanagement, projektverwaltung, rechnungen | datenuebernahme | team, buchhaltung |
| lager | arbeitsanweisungen, zeiterfassung | maengelmanagement | baudokumentation, projektverwaltung |

Jede neue Seite hat damit mindestens einen Rücklink von einer bestehenden Detailseite (D-12, [R] Interne Links).

### Abschnitt 7 – `CtaBand`

Titel „Machen Sie Platz für Ihr Handwerk.“, Satz „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“, Button „10 Tage kostenlos testen“, Sekundär „Preise ansehen“ → `/preise` [05].

---

## Szenenkatalog (MEDIA-01, D-05)

**Regeln:** Jede der 22 Detailfunktionen hat genau eine **Kopf-Szene**; sie ist zugleich die Karten-Szene auf `/funktionen` und in „Passende Funktionen“ (`cardScenes` = Kopf-Visual; bei Paar die Browser-Szene). Kurzform `screen` erfüllt `^(web|app):[^\s/]+$`; voller `evidence`-Pfad muss im Register stehen (Spalte „Register-Ergänzung“). Zeilen ≤ 24 Zeichen, ≤ 5 Zeilen [05]; Beispieldaten fiktiv im Stil des Bestands („Bad Bergmann“, „Bäckerei Krause“, „Dach Schulte“); **Labels, Titel und Status nur aus dem Release**. Szene je Plattform mit deren Begriff: Mängel-Status am einzelnen Mangel heißt in der App „In Bearbeitung“ (`defects.json` `in_progress`), in der App-Zusammenfassung und im Web „In Arbeit“ (`defects.json` `inProgress`, Web `defectMeta.ts`); die Phone-Mängelliste zeigt deshalb „In Bearbeitung“, Fließtexte nennen keinen der beiden Statusnamen. Eine Szene erscheint je Seite höchstens einmal. Alle 22 Funktionen haben einen belegten Bildschirm → **keine Ablauf-/Icon-Grafik** im Kopf nötig; Icon-Visual bleibt nur für Kacheln.

### Detailseiten (Kopf-Visual)

| Seite | Rahmen | Konstante (`lib/scenes.ts`) | Kurzform | Titel | Voller Beleg | Zeilen (Beispiel) / Status | Register-Ergänzung |
|---|---|---|---|---|---|---|---|
| dashboard | Browser | `dashboardScene` | `web:Übersicht` | Übersicht | `web:src/pages/Dashboard.tsx` | „Bad Bergmann“ · „Fällig am 31.10.“ · In Arbeit; „Dach Schulte“ · „Fällig am 14.11.“ · Geplant; „Bäckerei Krause“ · „Fällig am 07.11.“ · In Arbeit | – |
| projektverwaltung | Phone (Projekte) | `projekteScene` | `app:Projekte` | Projekte | `mobile:src/features/projects/screens/ProjectsScreen.tsx` | Bad Bergmann · In Arbeit; Dach Schulte · Geplant; Praxis Yilmaz · Abgeschlossen | `mobileEvidence.projektverwaltung` + ProjectsScreen |
| angebote | Browser | `angebotScene` | `web:Angebot` | Angebot | `web:src/pages/DocumentEditorPage.tsx` | „AN-2026-018“ · Bad Bergmann · Entwurf; „Wandfliesen verlegen“ 1.104,00 €; „Abdichtung Dusche“ 286,00 €; „Fliesen verfugen“ 312,80 € | – |
| rechnungen | Browser | `rechnungenScene` (Bestand) | `web:Rechnungen` | Rechnungen | Bestand | Bestand | – |
| e-rechnung | Browser | `eRechnungScene` | `web:E-Rechnung` | E-Rechnung | `web:src/components/documents/EInvoiceDownloadDialog.tsx` | „RE-2026-041“ · Bäckerei Krause · Gesendet; „XRechnung“ · „XML (UBL 2.1)“; „ZUGFeRD“ · „PDF/A-3 (hybrid)“ | `evidence["e-rechnung"]` + Dialog |
| buchhaltung | Browser | `buchhaltungScene` | `web:Steuerberater-Export` | Buchhaltung | `web:src/pages/SteuerberaterExport.tsx` | „Zeitraum“ · „01.07.–30.09.2026“; „Prüfung“; „Festschreiben“; „Übergabe“ · „SKR03“ | – |
| eingangsrechnungen | Phone (Mehr) | `belegScene` | `app:Belegscan` | Beleg scannen | `mobile:src/features/supplier-invoices/screens/ScanReceiptScreen.tsx` | „Lieferant“ Baustoff Weber; „Rechnungsdatum“ 14.10.2026; „Nettobetrag“ 184,20 €; „Projekt“ Bad Bergmann | – |
| plantafel | Paar | `plantafelScene` + `einsaetzeScene` (Bestand) | `web:Plantafel` + `app:Einsätze` | Plantafel / Einsätze | Bestand | Bestand | – |
| zeiterfassung | Phone (Zeiten) | `zeitenScene` (Bestand) | `app:Zeiterfassung` | Zeiterfassung | Bestand | Bestand | – |
| lager | Browser | `lagerScene` | `web:Lager` | Lager | `web:src/pages/Lager.tsx` | „Wandfarbe, 10 Liter“ · Hauptlager · 24 Stk.; „Silikon transparent“ · Fahrzeug 2 · 36 Stk.; „Fliesenkleber 25 kg“ · Hauptlager · 12 Sack | – |
| baudokumentation | Phone (Projekte) | `bautagesberichteScene` | `app:Bautagesberichte` | Bautagesberichte | `mobile:src/features/construction-reports/screens/ConstructionReportsScreen.tsx` | 21.10.2026 · Bad Bergmann · Entwurf; 20.10.2026 · Bad Bergmann · Unterschrieben; 17.10.2026 · Dach Schulte · Abgeschlossen | `mobileEvidence.baudokumentation` + Screen |
| aufmass | Phone (Projekte) | `aufmassScene` (Bestand) | `app:Aufmaß` | Aufmaß | Bestand | Bestand | – |
| arbeitsanweisungen | Phone (Projekte) | `arbeitsschritteScene` | `app:Arbeitsschritte` | Arbeitsschritte | `mobile:src/features/work-steps/components/WorkStepsSection.tsx` | „Untergrund prüfen“ · erledigt; „Abdichtung auftragen“ · erledigt; „Fliesen verlegen“ | – |
| team | Browser | `mitarbeiterScene` | `web:Mitarbeiter` | Mitarbeiter | `web:src/pages/Mitarbeiter.tsx` | Anna Weber · Admin; Jonas Krüger · Büro-Leitung; Mehmet Aydin · Mobil-Teamleitung; Lena Schulz · Mobil-Teammitglied (Rollen als `value`) | `evidence.team` + `src/lib/subscription/roles.ts` |
| nachkalkulation | Browser | `kalkulationScene` | `web:Kalkulation` | Kalkulation | `web:src/components/projects/ProjectControllingTab.tsx` | „Einnahmen (netto)“ 18.400 €; „Gesamtkosten“ 14.950 €; „Marge“ 18,8 %; „Budgetverbrauch“ 81 % | `evidence.nachkalkulation` + Tab |
| kundenportal | Browser | `portalScene` | `web:Kundenportal` | Ihre Unterlagen | `web:src/pages/portal/CustomerPortalHome.tsx` | „Angebot AN-2026-018“ · Bad Bergmann; „Rechnung RE-2026-040“; „Rechnung RE-2026-033“ | – |
| gaeb | Browser | `gaebScene` | `web:GAEB-Import` | Positionsvorschau | `web:src/components/DocumentEditor/GAEBImportDialog.tsx` | „Wandfliesen verlegen“ · 42,5 m² (normale Position, ohne Kennzeichen); „Hinweis Fliesenformat“ · Kennzeichen **Text**; „Mehrfläche Abdichtung“ · Kennzeichen **Bedarf** (Kennzeichen als `MiniStatus`, Release-Badges `GAEBImportDialog.tsx` Z. 258–262) | Belege aus `liveExtras` nach `evidence.gaeb` (Pattern 4 [R]) |
| mahnwesen | Browser | `mahnwesenScene` | `web:Mahnwesen` | Mahnwesen | `web:src/pages/settings/MahnwesenSettings.tsx` | „Zahlungserinnerung“ 7 Tage; „1. Mahnung“ 21 Tage; „2. Mahnung“ 35 Tage; „Mahngebühr“ 5,00 € | wie gaeb |
| terminplanung | Paar | `projektplanScene` + `arbeitsabschnitteScene` | `web:Projektplan` + `app:Arbeitsabschnitte` | Projektplan / Arbeitsabschnitte | `web:src/components/plantafel/ProjectGanttView.tsx`; `mobile:src/features/projects/components/ProjectPhaseSummary.tsx` | Browser `MiniWeek`: Rohinstallation (Mo, 2 T.), Abdichtung (Mi, Zeile 2), Fliesenarbeiten (Do, 2 T., Zeile 3); Phone: Rohinstallation · Abgeschlossen; Abdichtung · In Arbeit; Fliesenarbeiten · Geplant | wie gaeb + `mobileEvidence.terminplanung` (ProjectPhaseSummary, AssignmentPhaseLine) |
| bankabgleich | Browser | `bankScene` | `web:Bankumsätze` | Bankumsätze | `web:src/pages/Bankumsaetze.tsx` | „+ 2.380,00 €“ · Bäckerei Krause · Zugeordnet; „− 184,20 €“ · Baustoff Weber · Zugeordnet; „+ 960,00 €“ · Bad Bergmann · Noch nicht zugeordnet | wie gaeb |
| datenuebernahme | Browser | `importScene` | `web:Datenübernahme` | Daten übernehmen | `web:src/pages/Datenimport.tsx` | „Kunden importieren“ · kunden.csv; „Projekte importieren“ · projekte.xlsx; „Stammdaten importieren“ · artikel.csv | wie gaeb |
| maengelmanagement | Phone (Projekte) | `maengelStatusScene` (neu; Bestand `maengelScene` bleibt für `/` unverändert) | `app:Mängel` | Mängel | `mobile:src/features/defects/screens/DefectsScreen.tsx` | Silikonfuge Dusche · Offen; Fliese gesprungen · In Bearbeitung; Türzarge beschädigt · Behoben | wie gaeb |

Kopf-Paare tragen je eine `description` (≤ 140), z. B. Terminplanung: „Projektplan der Web-App mit drei Arbeitsabschnitten und daneben dieselben Abschnitte mit Status in der Mobile-App.“

### `/app`-Kacheln (Phone-Szenen)

| Kachel | Größe / Breite | Konstante | Kurzform | Titel | `activeTab` | Zeilen / Status | Voller Beleg |
|---|---|---|---|---|---|---|---|
| Kopf | Phone 240 | `einsaetzeScene` (Bestand) | `app:Einsätze` | Einsätze | Einsätze | Bestand | Bestand |
| Zeiterfassung mit Standort | lg (dunkel) · 194 | `zeitenScene` | `app:Zeiterfassung` | Zeiterfassung | Zeiten | Bestand | Bestand |
| Urlaub beantragen | md · 160 | `urlaubScene` | `app:Urlaub` | Meine Urlaubsanträge | Zeiten | „27.–31.10.2026“ · 5 Tage · Genehmigt; „22.–23.12.2026“ · 2 Tage · Ausstehend | `mobile:src/features/vacation/components/VacationTab.tsx` |
| Mängel mit Foto und Frist | lg · 194 | `maengelStatusScene` | `app:Mängel` | Mängel | Projekte | siehe oben | siehe oben |
| Aufmaß vor Ort | md · 160 | `aufmassScene` | `app:Aufmaß` | Aufmaß | Projekte | Bestand | Bestand |
| Bautagesbericht | md · 160 | `bautagesberichteScene` | `app:Bautagesberichte` | Bautagesberichte | Projekte | siehe oben | siehe oben |
| Abnahme mit Unterschrift | md · 160 | `abnahmeScene` | `app:Abnahme` | Abnahmeprotokolle | Projekte | Bad Bergmann · Teilabnahme · Abgenommen; Bäckerei Krause · 21.10.2026 · Abgenommen mit Mängeln | `mobile:src/features/acceptance/screens/AcceptanceProtocolsScreen.tsx` |
| Lager-Scan | lg · 194 | `lagerAppScene` | `app:Lager` | Lager | Mehr | „Wandfarbe, 10 Liter“ · Hauptlager · 24; „Silikon transparent“ · Fahrzeug 2 · 36; „Akku-Bohrhammer“ · Werkzeuge · 1 | `mobile:src/features/inventory/screens/InventoryScreen.tsx` |
| Beleg scannen | md · 160 | `belegScene` | `app:Belegscan` | Beleg scannen | Mehr | siehe oben | siehe oben |

Icon-Kacheln `/app` (kein belegter Einzelbildschirm nötig): Einsätze mit Navigation (`Navigation`), Arbeitsschritte abhaken (`ListChecks`), Besichtigung (`Camera`), Fotos und Projektdateien (`FolderOpen`), Kunden in der App (`Contact`), Projekt-Chat und Nachrichten (`MessagesSquare`). Offline und 21 Sprachen als `KeyFacts` (D-09), nicht als Phone.

### `MiniStatusName`-Erweiterung (F3)

Bestand: Entwurf, Offen, Gesendet, Bezahlt, Überfällig, Storniert. Neu (je Name ein Kommentar mit Beleg; Vitest: Name kommt in der genannten Release-Datei vor):

| Status | Beleg | Ton |
|---|---|---|
| Geplant, In Arbeit, Abgeschlossen | [REL-W] `src/pages/Dashboard.tsx` Z. 83–87; [REL-M] `locales/de/projects.json` | neutral; Abgeschlossen = positiv |
| In Bearbeitung, Behoben, Geprüft | [REL-M] `locales/de/defects.json` | neutral; Behoben, Geprüft = positiv |
| Unterschrieben | [REL-M] `locales/de/construction.json` | positiv |
| Ausstehend, Genehmigt, Abgelehnt | [REL-M] `locales/de/vacation.json` | neutral; Genehmigt = positiv; Abgelehnt = hervorgehoben |
| Abgenommen, Abgenommen mit Mängeln | [REL-M] `locales/de/acceptance.json` | positiv; mit Mängeln = neutral |
| Zugeordnet, Noch nicht zugeordnet | [REL-W] `src/pages/Bankumsaetze.tsx` | positiv; neutral |
| Text, Bedarf (GAEB-Positionskennzeichen, keine Status) | [REL-W] `src/components/DocumentEditor/GAEBImportDialog.tsx` Z. 258–262 (`getTypeBadge`) | neutral |

Töne in `MiniUi.module.css`: **neutral** `#EDEDF0`/`#393941` (Standard), **positiv** `#FFEFCC`/`#784B10` (wie Bestand „Bezahlt“), **hervorgehoben** `#17171C`/`#FFFFFF` (wie Bestand „Überfällig“). Kein Rot, kein Grün [05]. Längster Name „Abgenommen mit Mängeln“ = 22 Zeichen.

---

## Mobile-App-Seite `/app` (FEAT-03, D-09)

Flächenrhythmus: Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → Warm → CTA dunkel. Kein Baustein zweimal hintereinander [05]; die Funktionsgruppen sind durch Kennzahlen und Offline-Ablauf getrennt. Alle Texte in `lib/app-content.ts`, budgetgeprüft. Entfällt: `MobileAppGallery` (Datei bleibt, Vermerk Phase 10), `FeatureSnippet variant="zeit"`, Alt-Kacheln, `TrialCta`.

| # | Abschnitt | Fläche | Baustein | H2 | Lead (1 Satz) |
|---|---|---|---|---|---|
| 0 | Kopf | dunkel | `FunktionsKopf stores` + `PhoneFrame width={240}` `app:Einsätze` | – (H1 siehe SEO) | – |
| 1 | Zeit und Einsätze | Weiß | `BentoGrid` (4: lg·sm·sm·md) | „Zeiten, Einsätze und Urlaub“ | „Ihr Team startet den Timer, findet den nächsten Einsatz und beantragt Urlaub in derselben App.“ |
| 2 | Kennzahlen | Warm | `KeyFacts` (3), `SectionHeader align="center"` | „Das Wichtigste zur Mobile-App“ | „Die App gibt es für iPhone, iPad und Android, in der Voll-Lizenz ist sie für dieselbe Person enthalten.“ |
| 3 | Vor Ort dokumentieren | Weiß | `BentoGrid` (6: lg·sm·sm·md·md·md) | „Die Baustelle in der App dokumentieren“ | „Aufmaß, Fotos, Berichte, Mängel und Abnahmen landen im richtigen Projekt.“ |
| 4 | Offline vorbereiten | Warm | `StepFlow tone="light"` (4) + Textlink „Offline-Nutzung vorbereiten“ → `/hilfe/mobile-offline-synchronisierung` | „Vorbereitet bei schwachem Empfang“ | „Geladene Daten bleiben verfügbar; Karten, Routen, Fotos, KI und neue Downloads brauchen eine Verbindung.“ |
| 5 | Material, Belege, Team | Weiß | `BentoGrid` (4: lg·sm·sm·md) | „Material, Belege und Kommunikation“ | „Artikel scannen, Belege mit Finanzfreigabe fotografieren und Rückfragen im Projekt-Chat klären, ohne ins Büro zu fahren.“ (B11) |
| 6 | FAQ | Warm | `FaqList` (5) + FAQPage | „Häufige Fragen zur Handwerker-App“ | „Kurze Antworten zu Lizenz, Arbeit ohne Empfang, Sprachen und Geräten.“ |
| 7 | Abschluss | dunkel | `CtaBand` | Titel „Ihr Team auf der Baustelle verbinden“ | Satz „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ |

**Kacheln** (Titel ≤ 40, Text 1 Satz; alle Kacheln verlinkt; keine Plattform-Badges, weil alle Mobile-App):

| Gruppe | Größe | Titel | Text | Visual | `href` |
|---|---|---|---|---|---|
| 1 | lg dunkel | Zeiterfassung mit Standort | „Timer starten und stoppen, die App hält jeweils den Standort fest und ordnet das Projekt in der Nähe zu.“ | Phone `app:Zeiterfassung` 194 | `/funktionen/zeiterfassung` |
| 1 | sm | Einsätze mit Navigation | „Den Einsatz öffnen, den Zielort sehen und die Navigation zur Baustelle starten.“ | `Navigation` | `/funktionen/plantafel` |
| 1 | sm | Arbeitsschritte abhaken | „Anleitung, Material und Werkzeug je Schritt sehen und Erledigtes abhaken.“ | `ListChecks` | `/funktionen/arbeitsanweisungen` |
| 1 | md | Urlaub beantragen | „Urlaub in der App beantragen und sehen, ob der Antrag ausstehend oder genehmigt ist.“ | Phone `app:Urlaub` 160 | `/funktionen/team` |
| 3 | lg | Mängel mit Foto und Frist | „Mangel mit Ort, Priorität und Frist anlegen, Vorher- und Nachher-Foto ergänzen und den Status verfolgen.“ | Phone `app:Mängel` 194 | `/funktionen/maengelmanagement` |
| 3 | sm | Besichtigung | „Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen.“ | `Camera` | `/funktionen/aufmass` |
| 3 | sm | Fotos und Projektdateien | „Pläne, Bilder und Unterlagen des Projekts unterwegs öffnen und ergänzen.“ | `FolderOpen` | `/funktionen/baudokumentation` |
| 3 | md | Aufmaß vor Ort | „Räume, Flächen und Abzüge erfassen und die Mengen für das Angebot bereitstellen.“ | Phone `app:Aufmaß` 160 | `/funktionen/aufmass` |
| 3 | md | Bautagesbericht | „Wetter, ausgeführte Arbeiten und Materialverbrauch festhalten und unterschreiben lassen.“ | Phone `app:Bautagesberichte` 160 | `/funktionen/baudokumentation` |
| 3 | md | Abnahme mit Unterschrift | „Abnahme oder Teilabnahme protokollieren und vor Ort von beiden Seiten unterschreiben.“ | Phone `app:Abnahme` 160 | `/funktionen/baudokumentation` |
| 5 | lg | Lager-Scan | „Artikel per Barcode scannen, den Bestand freigegebener Lager sehen und Ausgabe oder Rücknahme buchen.“ | Phone `app:Lager` 194 | `/funktionen/lager` |
| 5 | sm | Kunden in der App | „Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.“ | `Contact` | `/funktionen/projektverwaltung` |
| 5 | sm | Projekt-Chat und Nachrichten | „Rückfragen im Projekt-Chat klären und Direktnachrichten im Posteingang lesen.“ | `MessagesSquare` | `/funktionen/projektverwaltung` |
| 5 | md | Beleg scannen | „Mit Voll-Lizenz und Finanzfreigabe Belege fotografieren, prüfen und Projekten zuordnen.“ (B11) | Phone `app:Belegscan` 160 | `/funktionen/eingangsrechnungen` |

Abdeckung FEAT-03 (15 Punkte + Kunden): Zeiterfassung, Einsätze/Navigation, Aufmaß, Baudoku (Fotos und Projektdateien), Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift, Arbeitsschritte, Urlaub, Lager-Scan, Belegscan, Chat, Kunden als Kacheln; Offline als Kennzahl + Abschnitt 4; 21 Sprachen als Kennzahl. Vitest `tests/app-seite.test.ts` prüft die Liste gegen das Register.

**Kennzahlen (`KeyFacts`, Kurzform-Quellen nach D-13, `^(site|register):[A-Za-z0-9.-]+$`):**

| Wert | Beschriftung (≤ 40) | `source` | Ableitung |
|---|---|---|---|
| `String(mobileLocales.length)` („21“) | „Sprachen in der Mobile-App“ | `register:mobileLocales` | wie Startseite |
| „Offline“ | „teilweise nutzbar, später synchronisiert“ | `register:mobileOffline` | neuer Registereintrag mit Mobile-Belegen (`useOfflineQueueSync.ts`, `useOfflineMutation.ts`, `SyncStatusBadge.tsx`, `OfflineIndicator.tsx`) **und** Limitation „Keine vollständige Offline-Zusage“ (D-23) |
| `euro(app.monat)` („9,95 €“) | „App-Lizenz pro Monat“ | `site:tarif-app-monat` | `tarife.find((t) => t.id === "app")` |

Note: „Preis netto zzgl. USt. Offline nur mit Einschränkungen, siehe unten. Stand: {germanDate(productBasis.checkedAt)}.“

**Offline-Schritte (`StepFlow`, 4):** „Projekte vorab laden“ – „Relevante Projekte mit Verbindung öffnen, damit sie bereitliegen.“ · „Standort freigeben“ – „Standortfreigabe für Timer und Unterschriften vor dem Einsatz prüfen.“ · „Ohne Empfang erfassen“ – „Zeiten und ausgewählte Eingaben werden vorgemerkt und später gesendet.“ · „Übertragung prüfen“ – „Der Sync-Status zeigt ausstehende Einträge, bis alles übertragen ist.“ (Belege: Bestand `/app` Z. 162–202, [REL-M] Offline-Queue „Offline · {n} ausstehend“.)

**FAQ (5 Fragen):** „Ist die Mobile-App in der Voll-Lizenz enthalten?“ · „Was kostet die App-Lizenz für Mitarbeitende?“ · „Funktioniert die App ohne Internet?“ (Antwort beginnt mit „Teilweise:“ wie [06] FAQ 5) · „In welchen Sprachen gibt es die App?“ (Zahl aus `mobileLocales`) · „Auf welchen Geräten läuft die App?“ (iPhone, iPad, Android; Store-Links). Werte aus `tarife`/`site`, nie Literal.

**Zusatzliste `/funktionen` (D-21, F5):** Eintrag „{n} Sprachen in der Mobile-App“ erhält `target { href: "/app", kind: "seite", label: "Mobile-App" }` → Zielhinweis „Beschrieben unter Mobile-App“. Die übrigen 7 Zusatzfunktionen erhalten das Ziel der Detailseite, auf der ihre Kachel steht (angebotsunterschrift → angebote, besichtigung → aufmass, kunden-app und projekt-chat → projektverwaltung, abnahme und bautagesbericht → baudokumentation, lager-scan → lager); damit 22 + 8 = 30 Einstiegslinks [R].

---

## SEO-Vertrag (D-10, D-11, D-22)

Title = `target.title` (gerendert mit Template-Suffix, Seitenwert ohne „ | CraftOS“), H1 === `target.h1`, Description === `target.description` (120–155, Testgrenze [R]). Kopfwort-Regel: `norm(h1)` enthält `norm(primary.keyword.split(" ")[0])` (Normierung `tests/keyword-map.test.ts` Z. 18–25). Alle Werte am 21.10.2026 per Node gezählt (`Array.from(s).length`, Satzregel `sentenceCount`), Zählskripte im Sitzungs-Scratchpad (nicht versioniert; der Budget-Test im Plan ersetzt sie), zuletzt nach Einarbeitung der Checker-Empfehlungen am 21.10.2026 ausgeführt: **alle Budgets eingehalten** – H1, Kurznutzen, Title, Description und Ablaufschritte aller 23 Seiten, alle `/app`-Texte, 107 Kernpunkt-Kacheln (Titel ≤ 40, Text 1 Satz ≤ 90/120, zulässige Anordnung), Nutzensätze und FAQ-Pflichtfragen.

**Änderungen an `keyword-map.json` und `KEYWORD-MAP.md` (vor der Umsetzung, im selben Commit wie Statuswechsel/Sitemap der 6 neuen Seiten):**

| Pfad | Feld | Bisher | Neu (Länge) | Grund |
|---|---|---|---|---|
| /funktionen/team | h1 | Team und Rechte: jeder Zugang passt zur Aufgabe | **Mitarbeiter-App und Rechte: jeder Zugang passt zur Aufgabe** (58) | D-22 Kopfwort „mitarbeiter“ |
| /funktionen/terminplanung | h1 | Terminplanung mit Bauphasen und Abhängigkeiten | **Bauzeitenplan mit Arbeitsabschnitten und Abhängigkeiten** (55) | D-22 Kopfwort, D-20 Begriff |
| /funktionen/bankabgleich | h1 | Bankabgleich: Zahlungen automatisch zuordnen | **Zahlungsabgleich: Bankumsätze nachvollziehbar zuordnen** (54) | D-22 Kopfwort, „automatisch“ unbelegt |
| /funktionen/datenuebernahme | h1 | Datenübernahme beim Umstieg auf CraftOS | **Datenimport beim Umstieg auf CraftOS** (36) | D-22 Kopfwort |
| /funktionen/buchhaltung | h1 | … sauber vorbereitet für die Steuerberatung (66) | **Buchhaltung im Handwerk: vorbereitet für die Steuerberatung** (59) | H1 ≤ 60 (F4) |
| /funktionen/baudokumentation | h1 | Bautagebuch-App: was auf der Baustelle passiert, bleibt im Projekt (66) | **Bautagebuch-App: Berichte, Fotos und Abnahmen im Projekt** (56) | H1 ≤ 60; Mängel haben eigene Seite |
| /funktionen/maengelmanagement | description | … bis zur Abnahme lückenlos nachverfolgen. | **Mängelmanagement in CraftOS: Mängel mit Foto und Ort erfassen, Fristen und Zuständige festlegen und die Behebung bis zur Prüfung nachverfolgen.** (143) | „lückenlos“ ist Überclaim (Pitfall 8) |

Alle übrigen Title, H1 und Descriptions bleiben wie in `keyword-map.json` (Längen in § „Seitentexte“). „Bauphasen“ bleibt im Title/Description von `/funktionen/terminplanung` als Suchbegriff (Pitfall 7).

**Strukturierte Daten:** Detailseite: `BreadcrumbList` (Start → Funktionen → Name), `FAQPage` (dasselbe Array wie `FaqList`), `WebPage` (neu `webPageSchema` [R]); kein HowTo. `/app`: `BreadcrumbList` (Start → Mobile-App), `FAQPage`, `MobileApplication` `@id {site.url}/app#mobile-app` (iOS, Android, `offers` App-Lizenz netto aus `tarife`, ohne Bewertungen). Alles über `components/seo/JsonLd`.

---

## Seitentexte (Entwürfe, nur belegte Fakten; Budgets geprüft)

Spalten: **Kopfwort-Span** = Token im H1 mit `nowrap`; **Kurznutzen** = Kopf-Lead (1 Satz ≤ 110); **Sekundärlink** = „Anleitung in der Hilfe“ → `/hilfe/{slug}` oder „Alle Funktionen ansehen“ → `/funktionen`; Längen H1 / Lead / Title / Description.

| Seite | H1 (Kopfwort-Span fett) | Kurznutzen | Sekundärlink | Längen |
|---|---|---|---|---|
| dashboard | Die **Kennzahlen** Ihres Handwerksbetriebs auf einen Blick | Projekte, offene Beträge, Angebote und Aufgaben sehen Sie beim Start der Web-App auf einen Blick. | Alle Funktionen | 54/97/52/149 |
| projektverwaltung | **Auftragsverwaltung:** alle Informationen beim Projekt | Kunden, Aufgaben, Termine, Dokumente und Projekt-Chat bleiben beim Auftrag, im Büro und in der App. | Hilfe `projektdateien-ordner` | 51/99/51/147 |
| angebote | **Angebotssoftware,** die bis zur letzten Position passt | Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Ihrem Briefpapier ausgeben. | Hilfe `angebot-entwurf-anlegen` | 52/100/56/151 |
| rechnungen | **Rechnungssoftware:** von der Arbeit zur prüfbaren Rechnung | Abschlags-, Teil- und Schlussrechnungen erstellen, vor dem Fertigstellen prüfen und Zahlungen zuordnen. | Hilfe `rechnung-fertigstellen` | 56/103/57/155 |
| e-rechnung | **E-Rechnung** im Handwerk mit XRechnung und ZUGFeRD | Rechnungen als XRechnung oder ZUGFeRD ausgeben und elektronische Eingangsrechnungen ohne OCR einlesen. | Hilfe `e-rechnung-herunterladen` | 48/102/52/150 |
| buchhaltung | **Buchhaltung** im Handwerk: vorbereitet für die Steuerberatung | Belege prüfen, Zeiträume festschreiben und Buchungsdaten mit Belegbezug für DATEV übergeben. | Hilfe `datev-export-erstellen` | 59/92/53/148 |
| eingangsrechnungen | **Eingangsrechnungen** digitalisieren und prüfen | Belege mit der Mobile-App fotografieren, erkannte Angaben prüfen und Ausgaben einem Projekt zuordnen. | Hilfe `beleg-scannen-pruefen` | 44/101/57/151 |
| plantafel | **Plantafel-Software:** wer macht was und wann | Einsätze für Ihr Team planen, Einsatzorte auf der Karte sehen und Änderungen in der Mobile-App anzeigen. | Hilfe `plantafel-einsatz-planen` | 42/104/51/151 |
| zeiterfassung | **Zeiterfassung** im Handwerk: die Zeit landet beim Projekt | Zeit per Timer starten und stoppen, Standort und Projekt mit erfassen und die Stunden im Büro auswerten. | Hilfe `mobilen-timer-bedienen` | 55/104/54/145 |
| lager | **Lagerverwaltung** per App: wissen, was da ist | Bestände, Lagerorte und Bewegungen verwalten und Artikel in der Mobile-App per Barcode buchen. | Hilfe `material-entnehmen-zurueckbuchen` | 43/94/44/147 |
| baudokumentation | **Bautagebuch-App:** Berichte, Fotos und Abnahmen im Projekt | Bautagesberichte, Fotos und Abnahmen beim Projekt festhalten und in der App unterschreiben lassen. | Hilfe `bautagesbericht-erstellen` | 56/98/50/146 |
| aufmass | **Aufmaß-App:** aus Maßen werden Positionen | Räume, Flächen und Abzüge vor Ort erfassen und die geprüften Mengen ins Angebot übernehmen. | Hilfe `raumaufmass-angebot-uebernehmen` | 39/91/55/138 |
| arbeitsanweisungen | **Arbeitsanweisungen** erstellen: das Team weiß, was zu tun ist | Leistungen und Material ohne Verkaufspreise an das Team geben, das erledigte Schritte in der App abhakt. | Alle Funktionen | 59/104/46/148 |
| team | **Mitarbeiter-App** und Rechte: jeder Zugang passt zur Aufgabe | Mitarbeitende einladen, Lizenz und Rolle zuweisen und Urlaubsanträge aus der App bearbeiten. | Hilfe `rollen-zugriffsrechte-einstellen` | 58/92/51/150 |
| nachkalkulation | **Nachkalkulation:** was hat der Auftrag wirklich gekostet? | Geplante und tatsächliche Kosten für Lohn, Material und Leistungen je Auftrag vergleichen. | Alle Funktionen | 55/90/55/152 |
| kundenportal | **Kundenportal:** ein gemeinsamer Ort für Ihre Kunden | Ihre Kunden sehen freigegebene Angebote, Rechnungen und Termine im Browser und schreiben Ihnen direkt. | Alle Funktionen | 49/102/53/152 |
| gaeb | **GAEB-Software** für Ausschreibung und Angebot | Leistungsverzeichnisse als GAEB X83 importieren, Angebote als X84 abgeben und Artikel per DATANORM einlesen. | Hilfe `gaeb-importieren` | 43/108/49/146 |
| mahnwesen | **Mahnwesen:** offene Rechnungen konsequent nachfassen | Fristen, Gebühren und Vorlagen je Stufe festlegen und überfällige Rechnungen auf Wunsch automatisch mahnen. | Alle Funktionen | 50/107/43/150 |
| terminplanung | **Bauzeitenplan** mit Arbeitsabschnitten und Abhängigkeiten | Arbeitsabschnitte im Projektplan terminieren, Abhängigkeiten setzen und den Stand in der Mobile-App zeigen. | Hilfe `projekt-phasen-anlegen` | 55/107/46/148 |
| bankabgleich | **Zahlungsabgleich:** Bankumsätze nachvollziehbar zuordnen | Bankdatei als CSV, camt.053 oder PDF importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden. | Alle Funktionen | 54/107/43/135 |
| datenuebernahme | **Datenimport** beim Umstieg auf CraftOS | Kunden, Projekte und Stammdaten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen. | Alle Funktionen | 36/100/46/150 |
| maengelmanagement | **Mängelmanagement** von der Erfassung bis zur Prüfung | Mängel mit Foto, Ort und Frist erfassen, Zuständige festlegen und den Status bis zur Prüfung verfolgen. | Hilfe `mangel-erfassen-bearbeiten` | 50/103/47/143 |
| /app | Die **Handwerker-App** für Ihr Team auf der Baustelle | Zeiten, Einsätze, Fotos, Mängel und Unterschriften erfasst Ihr Team direkt auf der Baustelle. | – (StoreLinks) | 49/93/42/147 |

Eyebrow im Kopf = Gruppenname aus `lib/funktionsgruppen.ts` („Angebot“, „Planung“, „Baustelle“, „Rechnung“, „Buchhaltung“, „Team“), auf `/app` „Mobile-App“.

**Namen und Nutzensätze der neuen Funktionen** (`funktionen.ts` `name` ≤ 32 = Menü-/Kartentext, `benefit` 1 Satz ≤ 100; aus [06] E2 übernommen, Terminplanung ohne „Bauphasen“): GAEB und DATANORM (Anzeigename wie `lib/funktionsgruppen.ts` Z. 212; die Kurzform „GAEB & DATANORM“ aus [R] wird nicht verwendet) – „Leistungsverzeichnisse per GAEB importieren und exportieren, Artikel per DATANORM einlesen.“ (91) · Mahnwesen – „Zahlungserinnerungen mit Fristen, Stufen und Vorlagen einrichten, auf Wunsch automatisch.“ (89) · Terminplanung – „Arbeitsabschnitte im Projektplan terminieren und Abhängigkeiten zwischen ihnen sehen.“ (85) · Bankabgleich – „Bankdatei importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.“ (80) · Datenübernahme – „Bestehende Daten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.“ (85) · Mängelmanagement – „Mängel mit Foto erfassen und über Status und Zuständigkeit bis zur Erledigung verfolgen.“ (88). Gruppen nach [R] Zuordnung (gaeb → angebot, terminplanung → planung, maengelmanagement → baustelle, mahnwesen → rechnung, bankabgleich → buchhaltung, datenuebernahme → team).

### Ablaufschritte (`StepFlow`, Titel ≤ 28 / Text ≤ 80, je 1 Satz)

| Seite | Schritte (Titel – Text) |
|---|---|
| dashboard | Web-App öffnen – Das Dashboard zeigt Kennzahlen, Aufgaben und aktuelle Projekte. · Kennzahlen prüfen – Aktive Projekte, offene Angebote und offene Beträge führen in die Details. · Arbeitsfläche anpassen – Widgets verschieben, vergrößern, ausblenden oder sensible Zahlen weichzeichnen. |
| projektverwaltung | Projekt anlegen – Projekt anlegen und den Kunden zuordnen. · Aufgaben und Termine pflegen – Aufgaben, Termine und Zuständigkeiten im Projekt festhalten. · Dateien ablegen – Pläne, Bilder und Unterlagen in Ordnern und Unterordnern sortieren. · Im Projekt-Chat klären – Rückfragen von der Baustelle bleiben im Chat beim Auftrag. |
| angebote | Entwurf anlegen – Angebotsentwurf mit Kunde und Projektbezug anlegen. · Positionen kalkulieren – Lohn, Material, Geräte und Zuschläge je Position kalkulieren. · Mengen übernehmen – Geprüfte Mengen aus dem Aufmaß als Positionen verwenden. · PDF ausgeben – Angebot prüfen und als PDF mit Ihrem Briefpapier ausgeben. · Online unterschreiben lassen – Ihr Kunde nimmt das Angebot online an und unterschreibt es. |
| rechnungen | Entwurf erstellen – Rechnungsentwurf aus einem Angebot oder Bericht erstellen. · Entwurf prüfen – Empfänger, Leistungen, Beträge und Anrechnungen kontrollieren. · Fertigstellen – Beim Fertigstellen entsteht die Rechnungsnummer, danach geben Sie sie aus. · Zahlungen zuordnen – Zahlungseingänge und Teilzahlungen an der Rechnung erfassen. |
| e-rechnung | Rechnung vorbereiten – Absender, Empfänger und Positionen der Rechnung vollständig ergänzen. · Format wählen – XRechnung oder ZUGFeRD wählen und empfängerbezogene Referenzen prüfen. · Ausgabe prüfen – E-Rechnung erzeugen und das Validierungsergebnis kontrollieren. |
| buchhaltung | Zeitraum wählen – Im Steuerberater-Export den Zeitraum für die Übergabe festlegen. · Vollständigkeit prüfen – Der Vollständigkeits-Check zeigt fehlende Angaben mit Link zur Korrektur. · Festschreiben – Den geprüften Zeitraum festschreiben, damit Buchungen unverändert bleiben. · Übergeben – CSV- oder ZIP-Ausgabe erzeugen und den Import mit der Steuerberatung abstimmen. |
| eingangsrechnungen | Beleg aufnehmen – Beleg in der App scannen, fotografieren oder als PDF auswählen. · Angaben prüfen – Erkannte Angaben wie Lieferant, Datum und Betrag kontrollieren. · Dubletten beachten – Hinweise auf mögliche Dubletten vor dem Speichern prüfen. · Zuordnen und speichern – Ausgabe einem Projekt zuordnen und erst nach Ihrer Prüfung speichern. |
| plantafel | Zeitraum wählen – Projekt, Zeitraum und Mitarbeiter in der Plantafel auswählen. · Einsatz planen – Einsatz anlegen, verschieben oder kopieren und die Dauer anpassen. · Kapazität prüfen – Abwesenheiten und Ressourcen bei der Planung im Blick behalten. · Team informieren – Das Team sieht den Einsatz in der App und startet die Navigation. |
| zeiterfassung | Timer starten – In der App starten, die App hält dabei den Standort fest. · Projekt zuordnen – Liegt ein Projektort im Radius, ordnet die App den Timer diesem Projekt zu. · Timer stoppen – Beim Stoppen hält die App erneut den Standort fest. · Im Büro auswerten – Stunden in Projekt- und Monatsansichten prüfen und weiterverwenden. |
| lager | Lager einrichten – Artikel, Lagerorte und Lagerplätze mit Bestand anlegen. · Bewegung buchen – Wareneingang, Entnahme, Umlagerung oder Rückbuchung mit Bezug buchen. · Per Barcode scannen – In der App Artikel scannen und Ausgabe oder Rücknahme buchen. · Inventur durchführen – Bestände zählen und Abweichungen per Bestandskorrektur ausgleichen. |
| baudokumentation | Bericht anlegen – Bautagesbericht in der App mit Wetter, Arbeiten und Material anlegen. · Fotos ergänzen – Fotos und Dateien direkt im Projekt ablegen. · Unterschreiben lassen – In der App unterschreiben, Ort und Zeitpunkt werden mit erfasst. · Im Büro wiederfinden – Berichte und Protokolle in der Bauakte des Projekts öffnen und ausgeben. |
| aufmass | Raum anlegen – Im Aufmaß des Projekts einen Raum anlegen. · Maße erfassen – Abmessungen für Boden, Wand und Decke eingeben. · Abzüge berücksichtigen – Türen, Fenster und weitere Öffnungen von den Flächen abziehen. · Ins Angebot übernehmen – Geprüfte Mengen als Angebotspositionen verwenden. |
| arbeitsanweisungen | Quelldokument wählen – Ein geeignetes Dokument des Projekts als Grundlage wählen. · Inhalt prüfen – Abgeleitete Leistungen und den gesammelten Materialbedarf kontrollieren. · Bereitstellen – Die Arbeitsanweisung ohne Verkaufspreise für die Ausführung bereitstellen. · In der App abhaken – Das Team sieht die Arbeitsschritte und hakt erledigte Schritte ab. |
| team | Mitglied einladen – Mitarbeitende einladen und den passenden Lizenztyp zuweisen. · Rolle wählen – Eines von fünf Rollen-Presets wählen und die Rechte prüfen. · Aufgaben zuordnen – Projekte und Einsätze dem Aufgabenbereich zuordnen. · Urlaub bearbeiten – Urlaubsanträge aus der App genehmigen oder ablehnen. |
| nachkalkulation | Reiter Kalkulation öffnen – Im Projekt den Reiter Kalkulation mit Plan und Ist öffnen. · Plan und Ist vergleichen – Planwerte mit Stunden, Material und Belegen vergleichen. · Abweichungen prüfen – Abweichungen erkennen und fehlende Zuordnungen ergänzen. · Besser kalkulieren – Abgeschlossene Aufträge als Grundlage für neue Angebote nutzen. |
| kundenportal | Kunden einladen – E-Mail-Adresse im Kundenstamm hinterlegen und den Kunden einladen. · Unterlagen freigeben – Angebote, Rechnungen und Termine für den Kunden bereitstellen. · Kunde meldet sich an – Der Kunde sieht nur seine freigegebenen Projekte und Dokumente. · Angebot beantworten – Der Kunde nimmt Angebote an oder lehnt sie mit Rückmeldung ab. |
| gaeb | X83 importieren – Leistungsverzeichnis als X83 einlesen und Positionen in der Vorschau wählen. · Angebot kalkulieren – Die übernommenen Positionen wie gewohnt mit Preisen kalkulieren. · X84 exportieren – Nach Preisbestätigung die Angebotsabgabe als X84 erzeugen. · Artikel per DATANORM – Lieferantenkatalog per DATANORM einlesen und fehlerhafte Zeilen prüfen. |
| mahnwesen | Fristen festlegen – Je Stufe festlegen, nach wie vielen Tagen überfällig gemahnt wird. · Vorlagen anpassen – Betreff und Text je Stufe mit Platzhaltern vorbereiten. · Automatik einschalten – Überfällige Rechnungen werden täglich eine Stufe nach der anderen gemahnt. · Verlauf prüfen – Im Mahnverlauf jeder Rechnung sehen, wann welche Stufe verschickt wurde. |
| terminplanung | Abschnitte anlegen – Im Projektreiter Terminplanung Arbeitsabschnitte mit Zeitraum anlegen. · Abhängigkeiten setzen – Festlegen, welcher Abschnitt folgt, auch mit Versatz in Arbeitstagen. · Projektplan prüfen – In der Plantafel-Ansicht Projektplan alle Projekte über die Zeit sehen. · In der App zeigen – Das Team sieht die Arbeitsabschnitte im Projekt und am Einsatz. |
| bankabgleich | Bankdatei importieren – Kontoauszug als CSV, camt.053 oder PDF hochladen. · Umsätze prüfen – Mögliche Dubletten werden zur Prüfung markiert. · Zuordnen – Jeden Umsatz mit Belegen und erfassten Zahlungen verbinden. · Vorschläge anfordern – Auf Wunsch Zuordnungsvorschläge der KI gegen Credits anfordern. |
| datenuebernahme | Export vorbereiten – Daten aus der bisherigen Software nach Anleitung exportieren. · Datei hochladen – CSV- oder Excel-Datei im Assistenten hochladen. · Spalten zuordnen – Die kostenlose Import-KI schlägt Zuordnungen vor, Sie prüfen sie. · Kontrolliert übernehmen – Kunden, Projekte oder Stammdaten nach Ihrer Prüfung übernehmen. |
| maengelmanagement | Mangel erfassen – Mangel mit Titel, Ort und Vorher-Foto in der App oder im Web anlegen. · Frist und Zuständige – Priorität, Frist und zuständige Person oder Nachunternehmer festlegen. · Behebung dokumentieren – Nachher-Foto ergänzen und den Status auf Behoben setzen. · Prüfen und abschließen – Behobene Mängel prüfen; offene Mängel zeigt das Abnahmeprotokoll. |

Belege der Schrittbegriffe, die über `funktionen.ts` hinausgehen [REL-W]: Steuerberater-Export-Schritte „Zeitraum, Prüfung, Festschreiben, Übergabe“ (`SteuerberaterExport.tsx` Z. 117), Projektreiter „Terminplanung“ und „Kalkulation“ (`projectTabs.ts`), „Projektplan – Projekte über die Zeit“ (`PlantafelToolbar.tsx`), Mahnwesen-Labels (`MahnwesenSettings.tsx`), Bankimport-Formate und -Status (`Bankumsaetze.tsx`), „Positionsvorschau“ (`GAEBImportDialog.tsx`); [REL-M] Beleg-Felder „Lieferant“, „Rechnungsdatum“, „Nettobetrag“ (`locales/de/invoices.json`).

---

## Copywriting Contract

Unverändert aus [05]/[06]: „Sie“, Satzschreibung, aktive Verben, keine Ausrufezeichen, keine Füllwörter, nicht-live Funktionen nirgends angekündigt; Begriffe „Web-App“, „Mobile-App“, „Voll-Lizenz“, „App-Lizenz“, „Credits“. **Neu (Abweichung B3):** UI-Begriff „Arbeitsabschnitte“ statt „Bauphasen“ in neuen Texten (D-20).

| Element | Copy |
|---------|------|
| Primary CTA | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta`, Icon `ArrowUpRight` – Kopf und CTA-Band aller 23 Seiten |
| Sekundärlink Kopf | „Anleitung in der Hilfe“ → `/hilfe/{slug}` (15 Seiten, Tabelle oben) bzw. „Alle Funktionen ansehen“ → `/funktionen` (7 Seiten ohne passenden Hilfeartikel: dashboard, arbeitsanweisungen, nachkalkulation, kundenportal, mahnwesen, bankabgleich, datenuebernahme) |
| CTA-Band Detailseiten | „Machen Sie Platz für Ihr Handwerk.“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ / Sekundär „Preise ansehen“ → `/preise` |
| CTA-Band `/app` | „Ihr Team auf der Baustelle verbinden“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ / Sekundär „Preise ansehen“ |
| Verwandte Funktionen | H2 „Passende Funktionen“, Lead „Diese Funktionen arbeiten mit denselben Projektdaten weiter.“, Kartenlink „Mehr zu {Funktionsname}“ [05] |
| Panel-Überschriften | „Im Büro“ (Web-App), „Auf der Baustelle“ (Mobile-App); Liste `aria-label` „Rollen“; Badges „Enthalten in“ |
| Kennzeichnung | „Vereinfachte Darstellung mit Beispieldaten“ (jeder Rahmen und der `FeatureSnippet`-Rahmen) |
| Kennzahlen-Hinweis `/app` | „Preis netto zzgl. USt. Offline nur mit Einschränkungen, siehe unten. Stand: {Datum}.“ |
| QR-Beschriftung | „iPhone und iPad“, „Android“; `alt` „QR-Code zum App Store“ bzw. „QR-Code zum Google Play Store“ [BESTAND] |
| Empty state heading | Entfällt als Oberfläche: Seiten rendern statisch aus Datenmodulen; eine Seite ohne Zusatzfunktion rendert keine Zusatz-Kachel, eine Web-only-Funktion kein Mobile-Panel (kein Platzhalter). |
| Empty state body | Entwicklerfehler statt leerer Fläche: „Funktionsdetail: {slug} hat kein Inhaltsmodul – Eintrag in lib/funktionsdetails/{gruppe}.ts ergänzen.“; „StepFlow: mindestens 3 Schritte erforderlich – Inhalte in lib/… ergänzen.“ [05] |
| Error state | Keine Laufzeitfehler für Besucher (statisch; unbekannter Slug → bestehende 404 über `notFound()`). Build-/Testfehler nennen Problem und Abhilfe: „Funktionsdetail: Rolle ‚{name}‘ ist keine belegte Rolle – Wert aus RolleName wählen.“; „Funktionsdetail: verwandte Funktion {slug} liegt nicht in derselben oder einer benachbarten Gruppe – Auswahl ändern.“; „Szene {screen}: Status ‚{status}‘ fehlt in MiniStatusName – Release-Beleg ergänzen.“; „FunktionsKopf: H1 enthält das Kopfwort ‚{keyword}‘ nicht – keyword-map.json oder Datenmodul prüfen.“; „KeyFacts: Quelle ‚{source}‘ ist keine Kurzform site:… oder register:… – Schlüssel angeben.“ |
| Destructive confirmation | Keine destruktiven Aktionen in dieser Phase (Marketingseiten ohne Konten, Formulare oder Löschfunktionen). |

---

## Bewegung, Barrierefreiheit, Stabilität

- **Bewegung:** unverändert [05]/[06]; einziges animiertes Element ist `FeatureSnippet` auf 8 Detailseiten (D-19). Prüfung je Seite: `emulateMedia({ reducedMotion: "reduce" })` → `document.getAnimations()` leer, alles sichtbar.
- **Überschriften:** genau eine H1 (Kopf); Abschnitte H2; Schritte, Kacheln, Panels, Karten H3; keine Ebene übersprungen.
- **Landmarks:** Kopf `<section aria-labelledby>`; jede Abschnitt-`section` `aria-labelledby` auf ihre H2; Rahmen `figure` mit `inert`/`aria-hidden`-Mini-UI und Screenreadersatz [05].
- **Tastatur/Touch:** CTA, Sekundärlink, StoreLinks, QR-Links, Kachel- und Kartenlinks ≥ 44 px, Fokusring 3 px `#BB7609` [05].
- **axe** (`wcag2a`, `wcag2aa`, `wcag21aa`) ohne serious/critical auf allen 22 Detailseiten (Schleife, 390) und Stichprobe `angebote`, `mahnwesen`, `terminplanung`, `/app` in allen fünf Breiten.
- **CLS = 0** (feste Seitenverhältnisse 16:10, 194:410, 4:3; QR mit `width`/`height`); **LCP = H1**, kein Lazy-Load im Kopf; Client-JS nur `HeaderShell` + `FeatureSnippet` (8 Seiten) (D-15).

---

## Abweichungen zu [05]/[06] (ausdrücklich gekennzeichnet und begründet)

| # | Stelle | [05]/[06] sagt | Phase 7 legt fest | Begründung |
|---|---|---|---|---|
| B1 | [06] A2 | 28 px nur für H1 der Startseite < 400 px | 28 px auch für H1 jedes `FunktionsKopf` < 400 px | Gemessen bei 32 px gegen 324-px-Container (360 px): „Eingangsrechnungen“ 328,0 px und „Auftragsverwaltung:“ 324,6 px zu breit, „Plantafel-Software:“ 295,3 px passt; Trennung verboten. Eine Regel für alle Detailseiten; weiterhin vier Größen, nur dieser Elementtyp. Playwright misst Span ≤ Container. |
| B2 | [05] §8 | „Rollen werden als Lizenzen ausgedrückt … keine freien Rollenbezeichnungen als Badge“ | Rollen als **Textliste** mit den fünf Release-Presets (Admin, Büro-Leitung, Büro-Projektleitung, Mobil-Teamleitung, Mobil-Teammitglied) und „Kunde“ im Panel `PlattformRollen`; die Lizenzstufe „Büro“ ist keine Rolle; Lizenzen weiter als Badge | D-02 (3) verlangt belegte Rollen aus dem Web-Release; die Namen sind Produktbegriffe, keine freien Bezeichnungen; als Badge würden sie das 16-Zeichen-Budget sprengen. |
| B3 | [05]/[06] Copywriting | „Bauphasen“ verbindlich, „Arbeitsabschnitte“ nur erläuternd | „Arbeitsabschnitte“ ist UI-Begriff in allen neuen Texten; „Bauphasen“ nur in Title/Description als Suchbegriff | D-20; Web- und Mobile-Release verwenden „Arbeitsabschnitte“ [R]. Abgenommene Texte auf `/` und `/funktionen` (#planung) bleiben in dieser Phase unverändert. |
| B4 | [06] E2 | `target.kind`: „hilfe“ \| „funktion“ | zusätzlich „seite“ (F5) | D-21: Ziel `/app` ist keine Funktionsseite. |
| B5 | [05] Seitenrezepte | Detail: `PageHero` + `DevicePair` → Badges → StepFlow → BentoGrid → FaqList → CtaBand; Mobile-App: Bento → KeyFacts → CtaBand | Detail: Abschnittsfolge D-02 mit `FunktionsKopf`, `PlattformRollen`, „Passende Funktionen“; `/app`: Kopf → Bento → KeyFacts → Bento → StepFlow → Bento → FAQ → CtaBand | D-02/D-09 sind gesperrte Inhaberentscheidungen; die Regel „kein Baustein zweimal hintereinander“ bleibt erfüllt. |
| B6 | [05] §4 | KeyFacts = „harte, belegte Zahlen“ | Wert „Offline“ (Wort) mit Pflicht-Einschränkung in Beschriftung und Note | D-09 verlangt Offline als Kennzahl; Ableitung aus Registereintrag inkl. Limitation (D-23). |
| B7 | [06] Bewegung | `FeatureSnippet` auf `/` und `/funktionen` entfernt | bleibt auf 8 Detailseiten im Ablauf-Abschnitt, mit Kennzeichnung | D-19 (E2E-Bindung); unterhalb der Falz, nicht LCP. |
| B8 | Bestand `/app` | QR-Codes ab 768 px | QR-Codes ab 1024 px | Zwischen 768 und 1023 px ist der Kopf einspaltig; QR würde das Phone unter die Falz schieben. |
| B9 | `keyword-map.json` | 6 H1-Zielwerte, 1 Description | wie Tabelle im SEO-Vertrag | D-22 (4 Werte) plus zwei H1 > 60 Zeichen (F4) und „lückenlos“ (Pitfall 8). |
| B10 | Abschnitt 4 und /app-Kacheln (lg · Phone 194) | `lg`-Kachel mit Phone fest 194 px, Visual oben | ab 1024 px: Phone-Breite folgt der freien Kachelhöhe (160–320 px, Proportion 194:410); Kachel mit Seitenverhältnis ab 4:5 zeigt Phone und Text nebeneinander, hohe Kachel Phone über dem Text; die Kachel übernimmt die Höhe ihrer zwei Rasterzeilen (Mindesthöhe 450 px). Unter 1024 px unverändert 194 px | Nachtrag 07-08 (Freigabe Orchestrator). Gemessen vorher (Playwright, Chromium/WebKit): /app 171–220 px Leerraum in den lg-Kacheln, lager bis 104 px und baudokumentation bis 81 px in den Nachbarkacheln, weil das feste Phone die Rasterzeilen vorgab bzw. nicht füllte. Nachher höchstens 25 px in den betroffenen Rastern (768/1024/1440), kein Rahmen abgeschnitten, kein gekürzter Titel; E2E „Detailseite: große Kacheln mit Phone ohne Leerstreifen (B10)“ sichert höchstens 48 px. Budgets und Kennzeichnung unverändert. |
| B11 | /app Abschnitt 5 (Lead und Kachel „Beleg scannen“) | Lead „Artikel scannen, Belege fotografieren …“; Kachel „Beleg fotografieren, erkannte Angaben prüfen und die Ausgabe einem Projekt zuordnen.“ | Lead „Artikel scannen, Belege mit Finanzfreigabe fotografieren …“; Kachel „Mit Voll-Lizenz und Finanzfreigabe Belege fotografieren, prüfen und Projekten zuordnen.“ (87 Zeichen) | Nachtrag Code-Review 07 (WR-01): Neben der Kennzahl „App-Lizenz pro Monat“ war der Belegscan vorbehaltlos zugesagt. Belege: Detailseite `eingangsrechnungen` Mobile-Panel `lizenzen: ["voll"]` mit Satz „nur mit der Finanzfreigabe Ihrer Rolle“, `funktionen.ts` access „eine App-Lizenz allein gibt keinen pauschalen Zugriff auf Belege“, `tarife` (Belege nur bei der Voll-Lizenz), Web-Release `FEATURE_ACCESS.finanzen.app = false`. Vitest `tests/app-seite.test.ts` prüft jede /app-Kachel gegen das Mobile-Panel ihrer Detailseite. |

---

## Prüfmatrix für Planer und Auditor (nur lokal, globale Regel 5)

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Inhalte, Budgets, Satzregel | Vitest `tests/funktionsdetails.test.ts`, `tests/app-seite.test.ts` | alle Felder aus diesem Vertrag im Budget; 3–5 Schritte, 3–8 FAQ, 2–3 verwandte in gleicher/benachbarter Gruppe; Rollen ∈ `RolleName`; Plattform-Panels = `funktionen[].platforms` |
| Abschnittsfolge | Vitest (`renderToString(FunktionsDetail)`) | `data-abschnitt` in Reihenfolge kopf, ablauf, rollen, kernpunkte, faq, verwandt, cta; je Abschnitt ≤ 1 H2 |
| SEO | Vitest `keyword-map.test.ts` (Phase-7-Fall) | Title/H1/Description = Ziel; Kopfwort-Regel für 22 + `/app` |
| Szenen | Vitest `design-v2-frames.test.ts`, `styleguide.test.ts` | jede Kopf-/Kachel-Szene: Kurzform-Regex, voller Beleg im Register, Status ∈ `MiniStatusName` mit Release-Beleg; `cardScenes` = Kopf-Visual für alle 22 |
| JSON-LD | Vitest | Breadcrumb 3 Ebenen, FAQPage = sichtbare FAQ, WebPage; `/app` MobileApplication ohne Bewertung |
| Above the fold, H1-Span, CLS, Reduced Motion, axe | Playwright `tests/e2e/funktionsdetails.pw.cjs` (in `testMatch` eintragen) | Kriterien § Abschnitt 1; `/app` analog |
| Kennzeichnung, Belege im HTML | Playwright | jede Rahmen-`figure` und `figure[data-figure="snippet"]` mit Kennzeichnung; `data-evidence` `^(web\|app):[^\s/]+$`; `data-source` `^(site\|register):…` |
| FeatureSnippet-Bindung | Playwright `function-illustrations.pw.cjs` | unverändert grün auf den 8 Seiten |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; höchstens Inspiration über `21st_magic_component_inspiration` (in dieser Sitzung nicht verfügbar) | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten: keine [R Package Legitimacy Audit].

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

Geprüft: 2026-10-21, gsd-ui-checker (freigegeben ohne BLOCK; 5 Empfehlungen eingearbeitet: Kacheln mit getrenntem Titel/Text und Budgets, Produktbegriffe GAEB/Mängel/Rollen/„GAEB und DATANORM“, Anordnungsmuster und Zusatzgrößen, gemessene B1-Werte, eindeutiges `pageHead`-Budget)

**Approval:** approved 2026-10-21
