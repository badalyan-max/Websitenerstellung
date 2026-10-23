---
phase: 10-abschlussaudit
plan: 06
subsystem: integration
tags: [integration, uebergaben, testmatch, mega-menue, live-check, sitemap, deferred-tabelle, audit-behebungen, d-42]
requirements-completed: []

requires:
  - phase: 10-abschlussaudit
    provides: "Spuren e, c, a, b, d, f gemergt (b34f9fe, 4a995ed, 18a3a95, a214897, f20417b, 919b037); Übergabelisten 10-01 bis 10-05, 10-08 bis 10-11, 10-13, 10-F-NOTIZ; Inhaberfreigabe D-42"
provides:
  - "a11y.pw.cjs in testMatch; 404-Fall mit Karten, einem robots-Meta, ohne Canonical; Caption-Fall 360 px in design-v2.pw.cjs"
  - "TEXT_BUDGET.contentKopf.hinweis = 80; Darstellungstest mit CraftOSLogo.tsx"
  - "Zusatzfunktionen im Mega-Menü (Desktop und Drawer) mit data-menu-zusatz"
  - "404 ohne geerbten Canonical/robots; robots.txt mit GPTBot, ClaudeBot, PerplexityBot, Google-Extended"
  - "D-42: PageHero, TrialCta, CalculatorCta, Altklassen, drei Schriftschnitte, ProductDemo und lib/demo entfernt; Impressum ohne OS-Plattform, Title verlängert"
  - "Sitemap-Daten 2026-10-23 für alle Phase-10-Seiten inkl. Rechtsseiten; live-check Phase-10-Block (7 Prüfungen)"
  - "docs/releases/PHASE-10-PRUEFUNGEN.md mit Merge-Stand, 12 Übergaben, Restliste, D-31-Endstand (40), Inhaberliste"
affects: [10-12, 10-07, code-review-phase10]

tech-stack:
  added: []
  patterns:
    - "Zwischenfassungen einer Datei per git hash-object --path und update-index in den Index, damit mehrere Aufgaben in einer Datei atomar committet werden"
    - "live-check liest TS-Quellen (lib/einrichtung.ts, lib/site.ts, lib/funktionsgruppen.ts) als Text statt zu importieren"
    - "Schriftprüfung per Inhalts-Hash gegen die erlaubten Schnitte statt gegen Dateinamen (next/font benennt um)"

key-files:
  created:
    - craftos/tests/robots.test.ts
    - craftos/tests/aufraeumen-d42.test.ts
    - craftos/tests/sitemap-phase10.test.ts
    - craftos/docs/releases/PHASE-10-PRUEFUNGEN.md
  modified:
    - craftos/tests/e2e/playwright.config.cjs
    - craftos/tests/e2e/a11y.pw.cjs
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/tests/e2e/logo-schriftzug.pw.cjs
    - craftos/components/v2/budgets.ts
    - craftos/components/content/ContentKopf.tsx
    - craftos/components/layout/MegaMenu.tsx
    - craftos/components/layout/MegaMenu.module.css
    - craftos/app/not-found.tsx
    - craftos/app/robots.ts
    - craftos/app/sitemap.ts
    - craftos/app/globals.css
    - craftos/app/impressum/page.tsx
    - craftos/lib/funktionen.ts
    - craftos/scripts/live-check.mjs
    - craftos/docs/DESIGN-V2.md
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md

key-decisions:
  - "Menülinks der Zusatzfunktionen tragen data-menu-zusatz statt data-zusatz, damit Kachel-Selektoren auf den Zielseiten nicht die Header-Links treffen; nie aria-current"
  - "D-42 umfasst auch components/ui/TrialCta.tsx: einziger Nutzer der Altklassen, selbst ungenutzt"
  - "404: metadata mit alternates.canonical null und robots null; noindex setzt Next selbst (genau ein robots-Meta)"
  - "Impressum-Title ohne „ | CraftOS“ (title.absolute), damit die Marke nicht doppelt erscheint"
  - "live-check prüft die Vercel-Insights-Einbindung lokal nur bei NEXT_PUBLIC_ANALYTICS_ENABLED=true, live immer"

patterns-established:
  - "Phase-10-Block im live-check mit Werten aus den Quelldateien statt fester Zahlen"

duration: 64min
completed: 2026-10-23
---

# Phase 10 Plan 06: Integration nach dem Merge – Summary

**Die zwölf Übergabe- und Behebungspunkte sind umgesetzt. Neu sind die Zusatzfunktionen im Mega-Menü, die D-42-Bereinigung (rund 9.500 Zeilen ungenutzter Code), Sitemap-Daten und ein Phase-10-Block im live-check. Lokal ist alles grün: Vitest 1523/1523, E2E ohne Fehlschlag, live-check 76 OK.**

## Performance

- **Duration:** ca. 64 min
- **Started:** 2026-10-23T13:11Z
- **Completed:** 2026-10-23T14:15Z
- **Tasks:** 3 (plus D-42 und Orchestrator-Zusatzpunkte)
- **Commits:** 5 Code-/Doku-Commits und dieses SUMMARY

## Startgate

- Die Merge-Reihenfolge ist per `git log --first-parent --merges` geprüft: `phase10-spur-e phase10-spur-c phase10-spur-a phase10-spur-b phase10-spur-d`, f danach (`919b037`). Das Startgate akzeptiert f nach d laut Auftrag.
- Alle zehn SUMMARYs und `10-F-NOTIZ.md` lagen vor, `craftos/` war sauber, Port 3100 frei.
- Während der Arbeit kam auf `main` der Orchestrator-Commit `acc1719` (D-44) hinzu. Meine Commits liegen darüber, es gab keine Überschneidung.

## Task Commits

1. **Übergaben der Spuren:** `8849960` (fix). Enthält `testMatch`, die Fälle für 404 und Caption, `HINWEIS_MAX` in den Budgets, K-3, DESIGN-V2 § 19.6/19.7 und das Zeitlimit.
2. **Behebungen aus dem Vorab-Audit:** `fdf70d0` (fix). Betrifft 404-Metadaten und `robots.ts`.
3. **D-42:** `0033220` (chore). Ungenutzter Code entfernt, Impressum ohne OS-Plattform, Title verlängert.
4. **Aufgabe 2, Mega-Menü:** `2a8936d` (feat). Zusatzfunktionen D-21/D-40.
5. **Aufgabe 3:** `a19eef3` (feat). Sitemap-Daten, live-check Phase 10, `PHASE-10-PRUEFUNGEN.md`.

## Übergabetabelle (Kurzform, 12 von höchstens 12)

| Nr. | Punkt | Commit |
|---|---|---|
| 1 | `a11y.pw.cjs` in `testMatch`, 404-Kartenfall, `/impressum` ohne Ausnahme | `8849960` |
| 2 | Caption-Fall 360 px (fünf Seiten) | `8849960` |
| 3 | `HINWEIS_MAX` → `TEXT_BUDGET.contentKopf.hinweis` | `8849960` |
| 4 | Darstellungstest mit `CraftOSLogo.tsx` | `8849960` |
| 5 | DESIGN-V2 § 19.6–19.9 | `8849960`, `0033220`, `2a8936d` |
| 6 | B10-Neumessung `/funktionen/rechnungen` | Messung, siehe unten |
| 7 | Zusatzfunktionen im Mega-Menü | `2a8936d` |
| 8 | Sitemap-Daten 2026-10-23 | `a19eef3` |
| 9 | live-check Phase-10-Block | `a19eef3` |
| 10 | 404-Canonical/robots, KI-Crawler in `robots.txt` | `fdf70d0` |
| 11 | Zeitlimit `content-produktwahrheit.test.ts` | `8849960` |
| 12 | D-42 | `0033220` |

Die Restliste mit Besitz steht in `PHASE-10-PRUEFUNGEN.md` § 2.2. Wichtigster offener Punkt: Das Impressum hat im `<main>` nur einen internen Link (Behebungsliste 10-05 Nr. 5). Nach Plan war dafür (c) bzw. 10-06 zuständig. Der Punkt liegt über der Obergrenze und geht an den Orchestrator.

## D-42: entfernte Dateien mit Nachweis

Vorgehen bei jedem Element:
- Vorher per Node-Suche über `app/`, `components/`, `lib/`, `scripts/`, `tests/`, `content/` geprüft (Importe, `className`, Dateinamen).
- Danach liefen `next build` und die volle Vitest-Suite grün.
- `tests/aufraeumen-d42.test.ts` sichert den Stand und ersetzt den D-23-Schutztest.

Entfernt wurden:

- **Komponenten:**
  - `components/ui/PageHero.tsx`. Der einzige Importeur liegt in `_seo-referenz/` und ist vom Build ausgeschlossen.
  - `components/ui/TrialCta.tsx`. Es war ungenutzt und der einzige Nutzer der Altklassen.
- **Rechner:** `CalculatorCta` samt `.ctaSection`/`.primaryLink`.
- **`app/globals.css`:** 27 Regelblöcke der acht Altklassen (`section-space`, `split-section`, `soft-panel`, `section-intro`, `btn-cta`, `btn-secondary`, `eyebrow`, `spec-label`).
- **Schriften:** `public/fonts/clash-display-500.woff2`, `clash-display-700.woff2`, `general-sans-500.woff2`.
  - Die Logo-Spec prüft jetzt per Hash die drei erlaubten Schnitte.
  - Der Netzfall ist grün.
- **ProductDemo:** `components/product-demo/**` (5 Dateien) und `lib/demo/**` (2 Dateien), dazu die Specs, die nur sie prüften:
  - `tests/demo.test.ts`
  - `demo-planning.pw.cjs`
  - `mobile-step-flow.pw.cjs`
  - `browser-product-demo.archive.cjs`
- **Impressum:**
  - Der OS-Satz mit Link ist entfernt. Der VSBG-Satz steht wörtlich weiter da.
  - Die Referenz `tests/fixtures/rechtstexte/impressum.txt` ist bewusst aktualisiert.
  - Der Title lautet jetzt „Impressum – CraftOS Handwerkersoftware“ (Map, `KEYWORD-MAP.md`, Map-Test).
  - Die Datenschutzerklärung ist unverändert.

## Audit-Behebungen

- Geänderte Dateien: `app/not-found.tsx` (nur Metadaten) und `app/robots.ts`.
- Geänderte Fließtextsätze: **0**.

## Menü-Screenshots

Die Screenshots liegen im Scratchpad und wurden selbst angesehen. Der Fokusring ist sichtbar, es gibt keine Überläufe.
- `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\10-06\menue-1440-chromium.png`
- `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\10-06\menue-1440-webkit.png`
- `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\10-06\drawer-390-chromium.png`
- `C:\Users\badal\AppData\Local\Temp\claude\c--Projekte-Websitenerstellung\8faeabcc-263d-4f29-8287-1406748c2152\scratchpad\10-06\drawer-390-webkit.png`

**Befund:** Bei 1440 × 900 ist der Panelinhalt 986 px hoch, sichtbar sind 795 px. Das Panel scrollt deshalb intern (`max-height` aus dem Bestand). Das ist als Sichtungspunkt für den Inhaber vermerkt, die Option wäre eine kompaktere Zusatzliste.

## B10 `/funktionen/rechnungen`

- Größenfolge `md·sm·sm·wide·wide·wide` in Chromium und WebKit. Es gibt keine leere Rasterzelle und keinen Leerraum unter dem Text.
- Kachelhöhen als neuer Sollwert:
  - 768 px: alle 211
  - 1024 px: 260/260/260/227/227/227
  - 1440 px: 235/235/235/227/227/227

## Release-Delta

- `sync:product:check` meldet „Snapshot ist aktuell: v4.0.0-test.249 (bfe165e9)“.
- Der lokale Mobile-Stand `origin/release` ist `837aab4f` (`mobile-v1.0.0-test.96`).
- **Kein Delta.** Ein Fetch in den Produkt-Repos fand nicht statt.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| Vitest voll | 58 Dateien, 1523/1523 grün |
| `tsc`, `eslint .` | 0 Fehler, 0 Warnungen; Lint nach dem E2E-Lauf mit Fehlschlägen ebenfalls 0 (D-31 Nr. 19) |
| `next build` | grün |
| E2E Lauf 1 (`a11y`, `design-v2`, `navigation`, `home-navigation`, `logo-schriftzug`) | 274 bestanden, 4 fehlgeschlagen, 102 übersprungen |
| E2E Lauf 2 (`home-navigation`) | 40 bestanden, 0 fehlgeschlagen |
| live-check lokal | 76 OK, 0 FEHLER |

Die 4 Fehlschläge in Lauf 1 waren strikte Selektoren und sind behoben.

Im Phase-10-Block des live-check meldet jede der sieben Prüfungen „OK“. Lokal ist dabei die Analytics-Insights-Einbindung ohne `NEXT_PUBLIC_ANALYTICS_ENABLED` nicht geprüft, der Trial-CTA schon.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] E2E-Selektoren trafen nach der Menüänderung zwei Links**
- **Found during:** Aufgabe 2 (E2E Lauf 1)
- **Issue:** `panel.locator('a[href="/funktionen/<slug>"]')` traf auch den Zusatzlink mit derselben Detailseite. Das ergab eine Strict-Mode-Verletzung in 4 Fällen.
- **Fix:** Selektor auf `:not([data-menu-zusatz])` geschärft. Die Menülinks heißen `data-menu-zusatz` statt `data-zusatz`, damit Kachel-Selektoren auf Zielseiten unberührt bleiben.
- **Files:** `tests/e2e/home-navigation.pw.cjs`, `components/layout/MegaMenu.tsx`, `tests/navigation.test.ts`
- **Commit:** `2a8936d`

**2. [Rule 1 – Bug] live-check-Bestandsprüfung zählte 30 statt 32 Funktionen; Schriftprüfung löste relative URLs falsch auf**
- **Found during:** Aufgabe 3 (live-check Lauf 1)
- **Fix:** Der Sollwert ist jetzt 32 (22 Detail- plus 10 Zusatzfunktionen seit D-21). `../media/…` wird relativ zur CSS-Datei aufgelöst, die Schnittnamen werden auch mit Unterstrich geprüft.
- **Commit:** `a19eef3`

**3. [Rule 2] Weitere Dateien außerhalb von `files_modified`**
Diese Dateien wurden zusätzlich geändert, jeweils durch D-42 oder die Orchestrator-Zusatzpunkte begründet:
- `app/not-found.tsx`, `app/robots.ts`
- `app/impressum/page.tsx`, `app/globals.css`
- `components/calculators/*`, `components/CraftOSLogo.tsx`
- `lib/funktionen.ts` (`checkedAt` für `/funktionen/datenuebernahme`)
- `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`
- Tests: `kernseiten`, `keyword-map`, `content-produktwahrheit`, `logo-schriftzug`, `robots`, `aufraeumen-d42`, `sitemap-phase10`

**4. TrialCta mit entfernt**
Die Datei stand nicht auf der D-42-Liste. Sie war aber ungenutzt, und ohne ihre Entfernung hätten die freigegebenen Altklassen nicht entfallen können.

**5. `PHASE-10-PRUEFUNGEN.md` erst mit Aufgabe 3 committet**
Das Dokument entstand vollständig in einem Commit, statt § 1/§ 2 schon mit Aufgabe 1 anzulegen. Grund: Die Commit-Hashes der Übergaben sollten darin stehen.

**6. Zwischenstand C1**
Im Commit `8849960` prüft die 404-Spec bereits ein einzelnes robots-Meta, das erst `fdf70d0` liefert. Die E2E-Läufe liefen auf dem Endstand.

## Known Stubs

Keine.

## Threat Flags

Keine. `robots.txt` öffnet keine neuen Pfade, `/api/` bleibt gesperrt.

## Restliste an den Orchestrator (über der Obergrenze)

- Interne Links `/impressum` (≥ 3 im `<main>`, 10-05 Nr. 5): Darstellungsänderung der Rechtsseite.
- Weitere ungenutzte Altklassen außerhalb der D-42-Liste (`.craft-page-hero`, `.craft-watermark`, `.section-title`, `.rule-list`, `.notice`): Freigabe nötig.
- Volle A11y-Matrix `--shard=k/5`, `incomplete`-Kontrastknoten, Lighthouse A11y `/impressum` und Rechner: 10-12.
- Optionales npm-Skript `a11y:audit`; Koordinationsrezept für Website-Läufe.
- Höhe des Mega-Menüs (Panel scrollt bei 900 px): Inhaber-Sichtung.
- Konflikthinweis Spur g (D-43): `app/sitemap.ts` und `lib/funktionen.ts` habe ich geändert. Neue Daten für `/gobd` usw. trägt nach dem Merge von g der Besitzer der Sitemap nach.

## Self-Check: PASSED

- Dateien vorhanden: `tests/robots.test.ts`, `tests/aufraeumen-d42.test.ts`, `tests/sitemap-phase10.test.ts`, `docs/releases/PHASE-10-PRUEFUNGEN.md` und vier Screenshots.
- Commits vorhanden: `8849960`, `fdf70d0`, `0033220`, `2a8936d`, `a19eef3`.
- Nach dem letzten Lauf ist Port 3100 frei, die Sperre ist freigegeben, und es läuft kein eigener Prozess mehr.
