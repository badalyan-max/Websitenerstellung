---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 04
subsystem: designsystem
tags: [design-system, components, ui, tokens]
requires:
  - "05-UI-SPEC.md (freigegeben, Richtung „Werkbank-Präzision“)"
  - "lib/site.ts: site.ctaUrl, site.trialDays"
provides:
  - "app/globals.css: v2-Tokens (--radius-badge/tile/stage, --shadow-device(-dark), --spacing-section(-md/-sm), --color-line-warm), .v2-eyebrow, .v2-btn-cta"
  - "components/v2/budgets.ts: TEXT_BUDGET (Textbudgets + count-Mengen), charCount, assertTextBudget, assertCount"
  - "components/v2/{SectionHeader, BentoGrid/BentoTile/TileIcon, StepFlow, KeyFacts, FaqList, CtaBand} als Server Components"
  - "tests/design-v2-components.test.ts (17 Fälle)"
  - "docs/DESIGN-V2.md: Kaskadennachweis, Abweichungen, leerer Abschnitt für Teil B/Musterseite"
affects: [05-05, 05-06, 05-08, phase-06, phase-07, phase-08, phase-09]
tech-stack:
  added: []
  patterns:
    - "v2-Bausteine erzwingen Mengen- und Textbudgets beim Rendern (Entwicklerfehler statt leerer Fläche)"
    - "CSS-Module mit Importname s, Tokens per var() mit UI-SPEC-Fallback, Zustände per data-Attribut (data-tone, data-surface, data-size)"
    - "Bewegung nur als Antwort auf Nutzeraktion: Hover unter @media (hover: hover) 150–180 ms, FAQ-Drehung 150 ms; keine Keyframes"
    - "Komponententests per createElement + renderToString; Kinder als createElement-Argumente über typisierte Hülle (react/no-children-prop)"
key-files:
  created:
    - craftos/docs/DESIGN-V2.md
    - craftos/components/v2/budgets.ts
    - craftos/components/v2/SectionHeader.tsx
    - craftos/components/v2/SectionHeader.module.css
    - craftos/components/v2/KeyFacts.tsx
    - craftos/components/v2/KeyFacts.module.css
    - craftos/components/v2/CtaBand.tsx
    - craftos/components/v2/CtaBand.module.css
    - craftos/components/v2/BentoGrid.tsx
    - craftos/components/v2/BentoGrid.module.css
    - craftos/components/v2/StepFlow.tsx
    - craftos/components/v2/StepFlow.module.css
    - craftos/components/v2/FaqList.tsx
    - craftos/components/v2/FaqList.module.css
    - craftos/tests/design-v2-components.test.ts
  modified:
    - craftos/app/globals.css
key-decisions:
  - "TEXT_BUDGET enthält die Mengen unter TEXT_BUDGET.count (bento 3–7, steps 3–6, keyFacts 3–4, faq 3–8, comparison 4/12); Mini-UI-Budget bleibt bei Plan 05-05"
  - "Bausteine werfen bei Textbudget-Überschreitung den UI-SPEC-Fehlertext, nicht erst der Budget-Test aus 05-06"
  - "StepFlow tone=amber: Knoten #101014 mit Amber-Ziffer (Amber auf Amber wäre unsichtbar); Baustein rendert die Amber-Fläche selbst als Bühne mit Radius 24 px"
  - "StepFlow als Maßkette: 2-px-Maßlinie mit Endstrichen zwischen Sechseck-Knoten – die eine markante Stelle in Teil A"
  - "BentoGrid verweigert zusätzlich gleichförmige Raster (< 2 Größen) und mehr als eine dunkle Kachel"
  - "Wirksames ink-100 ist #f7f3eb (zweites @theme überschreibt); v2-Module nutzen die UI-SPEC-Hexwerte direkt"
requirements-completed: []
metrics:
  duration: "ca. 20 min"
  completed: "2026-10-20"
---

# Phase 5 Plan 04: Designsystem v2, Teil A – Summary

**Sechs flache Abschnittsbausteine als Server Components (Abschnittskopf, Bento-Raster, Maßketten-Schrittfolge, belegte Kennzahlen, FAQ, CTA-Band) mit v2-Tokens, im Code erzwungenen Textbudgets und Mengenregeln, ohne jede Einblendung.**

## Ergebnis

- **Tokens:** Die neun Tokens aus dem UI-SPEC stehen wörtlich im ersten `@theme`-Block von `craftos/app/globals.css`. Der Klassenblock `.v2-eyebrow` (14/600, Satzschreibung, 22-px-Haarstrich, Amber auf dunklen Flächen) und `.v2-btn-cta` (16/600, 48 px Mindesthöhe, 12 × 24 px, flaches Amber, Hover `translateY(-2px)` 180 ms nur bei `hover: hover`) steht neben den Bestandsbuttons. `.btn-cta`, `.eyebrow` und die Reduced-Motion-Regel sind unverändert. Ein Tailwind-4.3-Kompilierlauf bestätigt, dass alle Tokens ausgegeben werden und `ink-100` wirksam `#f7f3eb` ist.
- **Textbudgets:** `TEXT_BUDGET` bildet die UI-SPEC-Tabelle 1:1 ab (inkl. `sectionHeader.eyebrow` 24) und enthält unter `count` die Mengenregeln. Die Helfer `assertTextBudget` und `assertCount` erzeugen die Fehlertexte des UI-SPEC wörtlich.
- **Bausteine:**
  - `SectionHeader`: `header` mit optionaler `.v2-eyebrow`, genau einer `h2` (`as="h1"` nur für die Musterseite), Lead 20/400 max. 60ch.
  - `BentoGrid`/`BentoTile`/`TileIcon`: `ul role="list"` → `li` → `article` → `h3`; 1/2/4 Spalten mit `grid-auto-flow: dense`; Flächen warm/weiß/dunkel; Radien 16/24 px; `visual` ist Pflicht im Typ; gestreckter Link am Titel, Hover nur über Rahmenfarbe `primary-700` und Unterstreichung; Fokusring 3 px `#BB7609` über `:focus-within`.
  - `StepFlow`: `ol` mit 3–6 Schritten, Sechseck-Knoten (`clip-path` mit Logo-Proportion) `aria-hidden`, Maßlinie 2 px mit Endstrichen; vertikal unter 1024 px und horizontal ab 1024 px; `tone="amber"` mit Fokusring `#101014`.
  - `KeyFacts`: `dl` mit `dt`/`dd`, der Wert steht per CSS-Reihenfolge oben, `tabular-nums`, `data-source` je Wert; Quelle und `note` sind Pflicht; 2 Spalten unter 1024 px, ab 1024 px eine Spalte je Fakt.
  - `FaqList`: `details`/`summary`, 3–8 Fragen mit Pflicht-„?“, optional `h3` in `summary`; das Plus-Symbol auf `primary-50` in `primary-800` dreht sich in 150 ms; außerdem gelten die Budgets für Frage, ersten Satz und Antwort.
  - `CtaBand`: dunkles Band, `h2`, `.v2-btn-cta` → `site.ctaUrl` mit aus `site.trialDays` abgeleitetem Text „10 Tage kostenlos testen“ und `ArrowUpRight` 16 px; Sekundärlink „Preise ansehen“ → `/preise`.
- **Tests:** `craftos/tests/design-v2-components.test.ts` mit 17 Fällen (Plan verlangt ≥ 8) ist grün; `npm run typecheck` und `npm run lint` sind grün.

## Design-Kaskade (Nachweis in `craftos/docs/DESIGN-V2.md`)

1. **frontend-design:** Die neueste Leitlinie (`a0b04d9ddcca`, 20.10.2026) wurde gelesen, aber nicht kopiert, weil kein Skill-Werkzeug verfügbar war. Es gab zwei Durchgänge (Tokenplan, danach Abgleich mit generischen Mustern und Korrekturen). Bei konkreten Werten galt der UI-SPEC.
2. **ui-ux-pro-max:** Gelaufen sind `--design-system -p "CraftOS"` sowie die Domänen `style "bento grid"`, `landing` und `ux`. Übernommen wurden Flat Design, das Bento-Raster, Übergänge von 150–200 ms, Reduced Motion, Fokus und Kontrast. Verworfen wurden die Palette `#3B82F6`/`#F97316`, Satoshi/Outfit/Rubik/Nunito, „hover scale 1.02“ und Schatten, „Product Review/Ratings“ sowie „Horizontal Scroll Journey“.
3. **21st.dev:** `21st_magic_component_inspiration` war nicht verfügbar. Das ist vermerkt; es wurden keine Ergebnisse erfunden und kein builder/refiner eingesetzt.
4. **Context7:** Weder MCP noch `ctx7`-CLI waren verfügbar. Ersatzweise wurde die offizielle Next.js-16.3.4-Doku aus `node_modules/next/dist/docs` geprüft (`metadata.robots`, `next/image` `sizes`/`width`/`height`).

## Aufgaben und Commits

| Aufgabe | Commit | Inhalt |
|---|---|---|
| 1 RED | `e64adb0` | Test SectionHeader, KeyFacts, CtaBand, Bewegungsfreiheit (rot) |
| 1 GREEN | `e3b1a1c` | Tokens, `.v2-eyebrow`/`.v2-btn-cta`, budgets.ts, drei Bausteine, DESIGN-V2.md |
| 2 RED | `b95db41` | Testfälle BentoGrid, StepFlow, FaqList (rot) |
| 2 GREEN | `bb2dbc0` | BentoGrid/BentoTile/TileIcon, StepFlow, FaqList; Testhülle für Kinderargumente |

## Abweichungen vom Plan

### Automatisch behoben

**1. [Rule 1 – Bug] Regex im eigenen Test traf `v2-btn-cta` als Altklasse**
- **Gefunden in:** Aufgabe 1 (GREEN)
- **Problem:** `\bbtn-cta\b` matcht nach dem Bindestrich in `v2-btn-cta`.
- **Behebung:** Die Klassengrenze wird jetzt über Leerzeichen oder Anführungszeichen geprüft (`/class="(?:[^"]*\s)?btn-cta[\s"]/`).
- **Commit:** `e3b1a1c`

**2. [Rule 3 – Blockierend] TypeScript und ESLint widersprachen sich bei `createElement(BentoGrid, …, ...kinder)`**
- **Gefunden in:** Aufgabe 2
- **Problem:** TS verlangt die Pflicht-Prop `children`, ESLint (`react/no-children-prop`) verbietet sie als Prop.
- **Behebung:** Der Test nutzt eine typisierte Hülle `Grid = BentoGrid as FunctionComponent<Omit<BentoGridProps, "children">>`. Der öffentliche Vertrag `children: ReactNode` bleibt wie im UI-SPEC.
- **Commit:** `bb2dbc0`

### Ergänzungen im Rahmen von Rule 2 (Korrektheit nach UI-SPEC)

- Die Bausteine prüfen die Textbudgets bereits beim Rendern mit dem UI-SPEC-Fehlertext „Textbudget überschritten: …“.
- `BentoGrid` erzwingt zusätzlich „mindestens zwei verschiedene Größen“ und „höchstens eine dunkle Kachel“ (UI-SPEC §2).
- `KeyFacts` verlangt eine nicht leere `note`, `FaqList` den ersten Satz ≤ 300 und die Antwort ≤ 600 Zeichen.
- Eigene Fehlertexte, die der UI-SPEC nicht vorgibt, wurden gleichartig formuliert: „FaqList: Frage ‚…‘ endet nicht mit „?“ – als direkte Frage formulieren.“, „BentoGrid: mindestens zwei verschiedene Kachelgrößen erforderlich – size variieren.“, „BentoGrid: höchstens 1 dunkle Kachel je Raster erlaubt – surface anpassen.“, „KeyFacts: note fehlt – Netto-Hinweis oder Stand-Datum angeben.“ sowie die Obergrenzen „{Baustein}: höchstens {n} {Einheit} erlaubt – Inhalte in lib/… kürzen.“

### Werkzeugbedingte Abweichungen der Kaskade

- frontend-design wurde gelesen statt über das Skill-Werkzeug aufgerufen; 21st.dev und Context7 waren nicht verfügbar. Alles ist in DESIGN-V2.md vermerkt.

## Nicht geprüft in diesem Plan

- Es gab keine visuelle Browserprüfung (Screenshots, 5 Breiten, axe, CLS). Sie erfolgt mit der Musterseite `/styleguide` in Plan 05-06 und im Gesamt-ship-gate in Plan 05-08. Build und volle Testsuite liefen hier bewusst nicht (schwere Läufe nach Koordinationsregel; Plan verlangt nur Einzeltest, Typcheck und Lint).

## Anforderungen

- DESIGN-02: Teil A der Grundlage steht. Die Anforderung ist **nicht** als erledigt markiert (Phase 5 liefert die Grundlage, die Umsetzung folgt in den Phasen 6–8).
- DESIGN-04: Im Code erzwungen (keine Keyframes, kein `opacity: 0`/`visibility: hidden`, nur Hover und FAQ-Drehung; Tests 4 und 8, grep-Kriterien leer). Die Anforderung wurde nicht separat abgehakt, weil sie phasenübergreifend gilt (Playwright-Prüfung Reduced Motion in 05-06/05-08).

## Known Stubs

Keine. Der leere Abschnitt „Teil B (Plan 05-05) und Musterseite (Plan 05-06)“ in DESIGN-V2.md ist laut Plan absichtlich leer und wird von Plan 05-06 gefüllt.

## Self-Check: PASSED

- Alle 16 Dateien aus `key-files` sind vorhanden.
- Die Commits `e64adb0`, `e3b1a1c`, `b95db41` und `bb2dbc0` sind in `git log` vorhanden.
- TDD-Gates: Auf beide `test(05-04)`-Commits folgt jeweils ein `feat(05-04)`-Commit.
