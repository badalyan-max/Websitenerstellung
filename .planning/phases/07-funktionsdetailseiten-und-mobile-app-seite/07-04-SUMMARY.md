---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 04
subsystem: funktionsdetails
tags: [detailvorlage, server-components, builder, funktionskopf, plattformrollen, jsonld, kartenrahmen]
requires:
  - phase: 07-01
    provides: TEXT_BUDGET.pageHead, count.detailSteps/related, webPageSchema
  - phase: 07-02
    provides: 22 Detailfunktionen, Gruppenzuordnung, Keyword-Map-Zielwerte
  - phase: 07-03
    provides: kopfVisuals (22 Slugs), cardScenes, KopfVisual
provides:
  - lib/funktionsdetails/types.ts (RolleName, ROLLEN, PANEL_BUDGET, PlattformPanel, Kernpunkt, FunktionsdetailInhalt, Funktionsdetail, Zielwerte)
  - lib/funktionsdetails/index.ts (server-only; zielwerte, buildFunktionsdetail, getFunktionsdetailAus, getFunktionsdetail, INHALTE leer, SNIPPET_VARIANTE, ERLAUBTE_ANORDNUNGEN, VERWANDT_KOPF, CTA_DETAIL)
  - components/funktionen/FunktionsKopf (F1 inkl. /app-Variante mit StoreLinks und QR)
  - components/funktionen/PlattformRollen (F2)
  - components/funktionen/FunktionsDetail (synchrone Server Component der Vorlage mit JSON-LD)
  - BentoTile zusatz → data-zusatz; FeatureSnippet headingLevel; Frame karte + KARTEN_ZEILEN
  - tests/funktionsdetails.test.ts mit leerer ERWARTET-Tabelle für 07-05/07-06
affects: [07-05, 07-06, 07-07, 07-09]
tech-stack:
  added: []
  patterns:
    - "Detailseite = geprüftes Datenobjekt (buildFunktionsdetail) + eine synchrone Vorlage; Inhalte injizierbar (getFunktionsdetailAus)"
    - "Kartenvariante der Geräterahmen kürzt nur die Darstellung, nie die Szene (KARTEN_ZEILEN)"
key-files:
  created:
    - craftos/lib/funktionsdetails/types.ts
    - craftos/lib/funktionsdetails/index.ts
    - craftos/components/funktionen/FunktionsKopf.tsx
    - craftos/components/funktionen/FunktionsKopf.module.css
    - craftos/components/funktionen/PlattformRollen.tsx
    - craftos/components/funktionen/PlattformRollen.module.css
    - craftos/components/funktionen/FunktionsDetail.tsx
    - craftos/tests/funktionsdetails.test.ts
    - craftos/tests/funktionskopf.test.ts
  modified:
    - craftos/components/v2/BentoGrid.tsx
    - craftos/components/v2/SceneContent.tsx
    - craftos/components/v2/FeatureCard.module.css
    - craftos/components/feature-snippet/FeatureSnippet.tsx
    - craftos/components/feature-snippet/FeatureSnippet.module.css
    - craftos/app/funktionen/page.tsx
    - craftos/lib/scenes.ts
    - craftos/tests/funktionen-seite.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "Builder verlangt genau eine Grenze-Kachel je Seite (D-04); die 07-UI-SPEC-Kacheltabelle für angebote hat keine – 07-05 muss eine Kachel als Grenze führen"
  - "FeatureSnippet bekommt optionales headingLevel (Standard 2); die Detailvorlage nutzt h3, damit der Ablauf-Abschnitt genau eine H2 hat"
  - "VerwandtEintrag trägt zusätzlich rahmen (browser|phone) aus cardScenes, damit die Karte die richtige Rahmenart rendert"
  - "Kartenrahmen: Frame karte rendert höchstens 2 Zeilen je Browser-Szene, zwischen 1024 und 1119 px nur 1 (umbrechende Kennzeichnung); Container-Abfrage verworfen, weil die Größeneindämmung die Kartenbreite unter 768 px veränderte"
  - "Sekundärlink nur „Anleitung in der Hilfe“ → /hilfe/{slug} oder „Alle Funktionen ansehen“ → /funktionen (Builder-Prüfung)"
requirements-completed: []
duration: 45min
completed: 2026-10-21
---

# Phase 7 Plan 04: Detailvorlage (FunktionsKopf, PlattformRollen, FunktionsDetail) Summary

**Die feste Detailseiten-Vorlage steht: Ein server-only Builder prüft typisierte Inhalte gegen alle 07-UI-SPEC-Regeln (Budgets, Sätze, Mengen, Rollen, Plattformen, Nachbargruppen, Anordnungen, Wortregeln), und die synchrone Server Component `FunktionsDetail` rendert daraus sieben Abschnitte mit BreadcrumbList-, FAQPage- und WebPage-JSON-LD. Dazu kommen die Bausteine `FunktionsKopf` (inklusive /app-Variante) und `PlattformRollen`. Außerdem ist der offene Befund aus 07-03 behoben: Die Browser-Rahmen der Karten auf `/funktionen` zeigen keine angeschnittenen Zeilen mehr.**

## Performance

- **Dauer:** ca. 45 min (Start 17:57 UTC, Ende 18:43 UTC)
- **Tasks:** 3/3 plus Zusatzauftrag des Orchestrators (Kartenrahmen)
- **Dateien:** 9 neu, 10 geändert

## Ergebnisse

### Task 1: Inhaltstypen und prüfender Builder
- In `types.ts` stehen `RolleName`/`ROLLEN` (fünf Release-Presets plus „Kunde“), `PANEL_BUDGET` (Zusatz ≤ 40, Satz ≤ 90, 0–4 Rollen, 1–2 Lizenzen), `PlattformPanel`, `Abschnittskopf`, `Kernpunkt`, `FunktionsdetailInhalt`, `Funktionsdetail`, `VerwandtEintrag` und `Zielwerte`.
- `index.ts` beginnt mit `import "server-only";`. `zielwerte(path)` liest die Keyword-Map und liefert `titleOhneMarke`. `buildFunktionsdetail` prüft in der Reihenfolge des Plans und nutzt dafür nur die Bestandshelfer aus `budgets.ts`. Die Fehlertexte stammen wörtlich aus 07-UI-SPEC: Kopfwort, Lead, Rolle, Plattform, Nachbargruppe, „kein Inhaltsmodul“ und die Wortregeln. `getFunktionsdetailAus` nimmt die Inhaltstabelle injiziert entgegen, `INHALTE` ist leer.
- Die Tests verwenden Fremddaten-Fixtures für `angebote` und `gaeb`. Abgedeckt sind ein Gutfall und 21 `toThrow`-Fälle, außerdem `zielwerte`, `SNIPPET_VARIANTE`, eine leere `ERWARTET`-Tabelle samt Schleife über `INHALTE` und eine Quelltextprüfung ohne `€`/„10 Tage“.

### Task 2: FunktionsKopf, PlattformRollen, data-zusatz
- **Design-Kaskade:** Die frontend-design-Leitlinie wurde nur gelesen. ui-ux-pro-max lief mit drei Abfragen. 21st.dev und Context7 standen nicht zur Verfügung. Nachweis in `docs/DESIGN-V2.md` § 16.
- **FunktionsKopf:** Section mit `data-funktions-kopf`, `data-abschnitt="kopf"`, `data-tone="dark"` und aria-labelledby, dazu die Eyebrow `v2-eyebrow`. Die H1 ist in vor/Kopfwort/nach zerlegt, das Kopfwort steht im nowrap-Span. Der CTA nutzt `site.trialDays`/`site.ctaUrl` mit `data-track="trial"`, daneben der Sekundärlink. Visual: Browser in voller Spaltenbreite (ab 768 px höchstens 640 px), Phone mit 240 px oder Paar im Layout `compact`. Die /app-Variante zeigt StoreLinks und zwei QR-Codes (96 × 96, `hidden lg:flex`). Das CSS ist ohne Linienraster, hat eine 3-px-Amber-Unterkante und setzt die H1 unter 400 px auf 28 px.
- **PlattformRollen:** Ein `article` je Plattform mit Icon-Feld, PlatformBadge, h3 „Im Büro“ bzw. „Auf der Baustelle“, `<ul aria-label="Rollen">`, einem Satz und der Lizenzgruppe „Enthalten in“. Ein Web-only-Panel nimmt ab 1024 px eine von zwei Spalten ein. Die Plattformprüfung folgt dem Muster der FeatureCard.
- **BentoTile:** Das optionale `zusatz` wird als `data-zusatz` ausgegeben.

### Task 3: FunktionsDetail und § 16
- `data-abschnitt` folgt der Reihenfolge kopf, ablauf, rollen, kernpunkte, faq, verwandt, cta. Die Flächen wechseln Weiß/Warm, eine Amber-Fläche gibt es nicht. Jeder Abschnitt hat höchstens eine H2, die H2-ids lauten `<abschnitt>-titel`.
- Ein FeatureSnippet erscheint nur bei `detail.snippet`, eingebettet in `figure data-figure="snippet"` mit Kennzeichnung. Die Grenze-Kachel liegt auf weißer Fläche, alle übrigen auf warmer. „Passende Funktionen“ besteht aus `li data-verwandt` mit FeatureCard und Kartenrahmen.
- JSON-LD: `faqSchema(detail.faq.items)`, eine BreadcrumbList mit drei Ebenen und eine WebPage mit `#webpage`. Es gibt kein Schritt-Schema, und `product-demo` wird nicht importiert.
- `DESIGN-V2.md` § 16 dokumentiert die Kaskade, F1–F5, B1–B9, D-13, D-19, den Vermerk für Phase 10 und einen Hinweis für 07-05.

### Zusatzauftrag: Kartenrahmen auf /funktionen
- **Messung vorher (Chromium):** Der Browser-Rahmen ist in allen Breiten 280 × 175 px groß und hat Platz für zwei Zeilen. Bei 1440 px waren 13 Browser-Karten betroffen, bei 360/390/768 px je 16 und bei 1024 px 20. Bei 1024 px bricht die Kennzeichnung (292 px Text plus 32 px Innenabstand) bei einer Bühne von 297 px zweizeilig um und verdeckt zusätzlich den Rahmenboden.
- **Lösung im Baustein:**
  - `Frame karte` rendert bei Browser-Szenen nur die ersten `KARTEN_ZEILEN` = 2 Zeilen. Das Kopf-Visual zeigt weiterhin alle Zeilen.
  - Zwischen 1024 und 1119 px blendet `FeatureCard.module.css` alles ab Zeile 2 aus.
  - Die figure behält ihre Rahmenbreite. Bei 1024 px wird der Rahmen dadurch mittig gesetzt und rechts nicht mehr abgeschnitten (Bestandsfehler).
  - `bankScene` zeigt beide Status in den ersten zwei Zeilen.
- **Verworfen:** Eine Container-Abfrage auf der Bühne. Die Größeneindämmung hätte die Kartenbreite bei 360 px von 330 auf 309 px verändert, dadurch wäre die Kennzeichnung auch dort umgebrochen und die Phone-Karten wären stärker verdeckt worden.
- **Messung nachher bei 360, 390, 768, 1024, 1100, 1120 und 1440 px:** 0 Browser-Karten mit angeschnittener oder verdeckter Zeile. Die Kartenbreiten sind unverändert gegenüber dem Bestand.
- **Tests:** Vitest prüft, dass jede Browser-Karte höchstens `KARTEN_ZEILEN` Zeilen hat und dies die ersten Zeilen der Szene sind. Ein neuer E2E-Fall misst die Zeilen in 7 Breiten (Chromium und WebKit).

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED Task 1 / 2 / 3 / Zusatz | jeweils rot (Modul fehlt bzw. 1 Vitest- und 1 E2E-Fall rot) |
| `vitest tests/funktionsdetails.test.ts tests/funktionsgruppen.test.ts tests/keyword-map.test.ts` | 71/71 grün (nach Task 1) |
| `vitest tests/funktionskopf.test.ts tests/design-v2-components.test.ts tests/home.test.ts tests/styleguide.test.ts` | 77/77 grün |
| `npm test` (voll) | 28 Dateien, 425/425 grün |
| `npm run typecheck`, `npm run lint` | grün |
| `npm run build` | grün, 139 statische Seiten, keine Warnungen |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | **262 passed, 0 failed**, 54 skipped (Projekt-Skips), 4,7 min |
| Akzeptanz-Greps | `import "server-only";` in Zeile 1; Fehlertexte je 1; `toThrow(` 23 (≥ 17); `€`/„10 Tage“ 0; kein `use client`; `hyphens: manual` 1; `#f2af38` 1; Linienraster/72px 0; `aria-label="Rollen"` 1; `data-zusatz` 2; `data-track="trial"` 1, `login` 0; `faqSchema(detail.faq.items)` 1; `webPageSchema` 2; `howto` 0; `product-demo` 0; „§ 16“ 1; B1/B9 ≥ 2 |
| Port 3100 | vorher frei; Server je Lauf mit eigener PID beendet; am Ende frei |

Koordination: Vor den schweren Läufen wurde der Status gelesen (edgar bereit, edgarspc offline/veraltet). Für das Website-Repo gibt es kein Rezept (Lücke: `website-unit`, `website-build`, `website-e2e`). Build und E2E liefen deshalb lokal nacheinander, jeweils als einziger schwerer Prozess.

## Sichtprüfung /funktionen (Zusatzauftrag)

Screenshots (nicht committet):
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-04/chromium-1440-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-04/chromium-390-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-04/chromium-1024-funktionen.png
- Gruppenausschnitte: C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-04/chromium-{1440,390,1024}-gruppe-{angebot,rechnung,buchhaltung}.png

Befunde:
- **1440 und 390:** Jede Browser-Karte zeigt zwei vollständige Zeilen, darunter liegt Luft vor der Kennzeichnungsleiste.
- **1024:** Der Rahmen ist vollständig und mittig, es ist eine vollständige Zeile sichtbar.
- **Bestand, nicht geändert:** Phone-Karten bleiben unten bewusst angeschnitten (Gerät endet an der Kennzeichnungsleiste). Bei einzelnen Phones (Zeiterfassung, Baudokumentation, Eingangsrechnungen; bei 1024 px zusätzlich Aufmaß, Projektverwaltung, Arbeitsanweisungen, Mängelmanagement) läuft die letzte sichtbare Zeile in diese Kante. Das entspricht dem Stand aus Phase 6 und 07-03.
- Den Seitenkopf der Detailseiten (`FunktionsKopf`) kann ich erst sichten, wenn die Route umgestellt ist (07-06). Das Kopf-Visual zeigt weiterhin alle Zeilen der Szene.

## Task Commits

1. `64d76c0` test(07-04): add failing tests for funktionsdetail builder with foreign data
2. `7317a6c` feat(07-04): typed funktionsdetail content model and checking builder (server-only)
3. `5d325f5` test(07-04): add failing tests for FunktionsKopf, PlattformRollen and data-zusatz
4. `b0b7327` feat(07-04): FunktionsKopf (F1 incl. /app variant), PlattformRollen (F2) and BentoTile data-zusatz
5. `6797768` test(07-04): add failing render tests for FunktionsDetail template
6. `c3e588a` feat(07-04): FunktionsDetail template with section order, FeatureSnippet on 8 pages, JSON-LD and cascade 16
7. `e1d7bec` test(07-04): card frames on /funktionen must not cut mini-ui rows
8. `acb59d1` fix(07-04): card frames on /funktionen show only complete mini-ui rows

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 – Überschriftenstruktur] FeatureSnippet hatte eine eigene H2**
- **Found during:** Task 3
- **Issue:** `FeatureSnippet` rendert seinen Titel als `<h2>`. Im Ablauf-Abschnitt stünden damit zwei H2, was die Pflichtregel „höchstens eine H2 je Abschnitt“ (D-02) verletzt.
- **Fix:** Neues optionales Prop `headingLevel?: 2 | 3`, Standard 2. Alle Bestandsnutzungen (craft-ai, gobd, gewerke, app, alte Detailroute) bleiben unverändert. Die Detailvorlage übergibt 3, und das CSS greift über `.header :is(h2, h3)`.
- **Files modified:** craftos/components/feature-snippet/FeatureSnippet.tsx, FeatureSnippet.module.css
- **Commit:** c3e588a

**2. [Rule 3 – Blocking] Rahmenart der verwandten Karten**
- **Found during:** Task 3
- **Issue:** `VerwandtEintrag` enthält laut Vertrag nur `scene`. Die FeatureCard braucht aber die Rahmenart (Browser oder Phone).
- **Fix:** Zusatzfeld `rahmen` aus `cardScenes[slug].kind`, zugehöriger Test ergänzt.
- **Commit:** c3e588a

**3. [Zusatzauftrag Orchestrator] Kartenrahmen auf /funktionen**
- Siehe oben. Geänderte Dateien außerhalb von `files_modified`: SceneContent.tsx, FeatureCard.module.css, app/funktionen/page.tsx, lib/scenes.ts (Zeilenfolge bankScene), tests/funktionen-seite.test.ts, tests/e2e/home-navigation.pw.cjs.
- **Commits:** e1d7bec, acb59d1

### Präzisierungen

- **Grenze-Kachel bei angebote:** Die Kacheltabelle des 07-UI-SPEC für `angebote` enthält keine Grenze-Kachel, obwohl `funktionen.ts` mit der fehlenden pauschalen DATANORM-v5-Zusage eine Einschränkung nennt. Der Builder verlangt laut Plan genau eine Grenze-Kachel. Das Testfixture führt deshalb „DATANORM nicht pauschal zugesagt“ als Grenze; 07-05 muss das im echten Inhaltsmodul ebenso lösen. Der Hinweis steht auch in DESIGN-V2 § 16.
- **Zusätzliche Builder-Prüfungen**, jeweils mit Abhilfetext: Inhalt und Funktion haben denselben Slug; Panels decken genau die belegten Plattformen in der Reihenfolge web, mobile ab; Sekundärlink nur in den zwei festen Formen; keine doppelten Rollen, Kacheltitel oder verwandten Slugs; jede verwandte Funktion hat eine Karten-Szene.
- **`getFunktionsdetail("gibt-es-nicht")`** wirft „Funktionsdetail: gibt-es-nicht ist keine Funktion aus lib/funktionen.ts – Slug prüfen.“
- **Panel-Budgets** (Zusatz 40, Satz 90) liegen als `PANEL_BUDGET` in `types.ts`, weil `TEXT_BUDGET` sie nicht kennt und `budgets.ts` nicht zu den Plan-Dateien gehört. Geprüft wird mit `assertTextBudget`/`assertCount`.

## TDD Gate Compliance

- Task 1: RED `64d76c0` → GREEN `7317a6c`
- Task 2: RED `5d325f5` → GREEN `b0b7327`
- Task 3: RED `6797768` → GREEN `c3e588a`
- Zusatzauftrag: RED `e1d7bec` → fix `acb59d1`

## Known Stubs

- `INHALTE` in `lib/funktionsdetails/index.ts` ist absichtlich leer. Die Gruppenmodule folgen in 07-05/07-06, die Route wird in 07-06 umgestellt.
- `ERWARTET` in `tests/funktionsdetails.test.ts` ist absichtlich leer; 07-05/07-06 tragen die Werte je Slug ein.

## Threat Flags

Es gibt keine neue Angriffsfläche.
- **T-07-10:** `import "server-only"` in `lib/funktionsdetails/index.ts`, keine neuen Client-Komponenten.
- **T-07-11:** JSON-LD läuft nur über `JsonLd` und wird aus demselben FAQ-Array erzeugt (Test vorhanden).
- **T-07-12:** Der Builder prüft Wortregeln, Rollen und Plattformen.
- **T-07-13:** Im HTML stehen nur Kurzform-Belege (Test vorhanden).

## Self-Check: PASSED

- Neue Dateien vorhanden: lib/funktionsdetails/types.ts, lib/funktionsdetails/index.ts, components/funktionen/FunktionsKopf.tsx (+ css), PlattformRollen.tsx (+ css), FunktionsDetail.tsx, tests/funktionsdetails.test.ts, tests/funktionskopf.test.ts.
- Die Commits 64d76c0, 7317a6c, 5d325f5, b0b7327, 6797768, c3e588a, e1d7bec und acb59d1 stehen im Log.
- Der Arbeitsbaum ist sauber, abgesehen von `.planning/config.json` (bewusst nicht angefasst). Es läuft kein Server mehr, Port 3100 ist frei.
