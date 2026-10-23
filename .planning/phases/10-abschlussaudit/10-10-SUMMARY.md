---
phase: 10-abschlussaudit
plan: 10
subsystem: craftos-website (Paket c, Teil 2)
tags: [paket-c, design-02, rechner, bento, comparison-table, caption, feinschliff, design-v2-doku]
requires: ["10-03"]
provides:
  - "Rechnerseiten /rechner, /rechner/stundensatz, /rechner/angebotskalkulation auf v2 (ContentKopf mit Hinweis, Abschnitte, Notiz, CtaBand)"
  - "Bento-Bodenausrichtung sm/md ohne Phone ab 768 px (J3) mit B10-Messung vorher/nachher"
  - "ComparisonTable: sichtbare Caption außerhalb des Scrollbereichs (J4)"
  - "tests/phase10-darstellung.test.ts (Gewichte, Farben, crumbs={null})"
  - "docs/DESIGN-V2.md § 19 Phase 10"
affects: [10-06, "Paket (a) visual-audit/a11y", "Paket (b) Logo-Test"]
tech-stack:
  added: []
  patterns:
    - "Rechnerseite = ContentKopf + Abschnitt rechner (werkzeug-Prop) + CalculatorHelp(id, surface, notiz) + CtaBand"
    - "Sichtbare Caption aria-hidden über dem Scrollbereich, Semantik per caption.sr-only und aria-label"
    - "Messskripte im Scratchpad, Ergebnisse unter test-results/ (gitignoriert)"
key-files:
  created:
    - craftos/tests/phase10-darstellung.test.ts
  modified:
    - craftos/components/calculators/CalculatorPage.tsx
    - craftos/components/calculators/Calculators.module.css
    - craftos/app/rechner/page.tsx
    - craftos/app/rechner/stundensatz/page.tsx
    - craftos/app/rechner/angebotskalkulation/page.tsx
    - craftos/components/v2/BentoGrid.module.css
    - craftos/components/v2/ComparisonTable.tsx
    - craftos/components/v2/ComparisonTable.module.css
    - craftos/tests/kernseiten.test.ts
    - craftos/docs/DESIGN-V2.md
decisions:
  - "CalculatorPage behält title/intro/current und erhält die Prop werkzeug (noscript + Rechner); das CTA-Band rendert CalculatorPage selbst, die Notiz hängt CalculatorHelp per notiz bzw. /rechner per CalculatorNotiz an"
  - "Formelkasten und Vergleichsblöcke als Gegenfläche zur Abschnittsfläche (data-surface an der Inhaltsspalte)"
  - "Caption-Abstand: < 768 px Caption → Wischhinweis 8 px, ab 768 px Caption → Tabelle 16 px (Spacing-Tabelle und § 6.2 zusammen erfüllt)"
  - "Rechner-Legenden fließen (float), damit die 1-px-Linie zwischen Fieldsets sichtbar ist"
  - "Gewichte-/Farbtest der Rechnerdateien (Übergabe aus 10-03) steht in tests/phase10-darstellung.test.ts statt in kernseiten.test.ts"
requirements-completed: []
metrics:
  duration: "ca. 60 Min. (davon ca. 30 Min. Warten auf die Sperre)"
  completed: 2026-10-23
  tasks: 3
  commits: 5
---

# Phase 10 Plan 10: Rechner auf v2, Bento-Bodenausrichtung, Tabellen-Caption und DESIGN-V2 § 19 Summary

Die drei Rechnerseiten laufen auf `ContentKopf` (Brotkrumen, Map-H1, Bestands-Intro, Hinweis „Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.“), v2-Abschnitten nach dem Flächenrhythmus und `CtaBand` mit der wörtlichen Bestandsnotiz darüber. Die Rechner selbst sind unverändert. Bento-Texte sitzen ab 768 px am Kachelboden (Leerraum unter Text 98 → 0 px, Höhen unverändert), die Tabellen-Caption steht lesbar über dem Scrollbereich, die Silbentrennung auf `/preise` ist belegt. Darstellungstest und `DESIGN-V2.md` § 19 schließen Paket (c) ab.

## Commits

| Aufgabe | Commit | Betreff |
|---|---|---|
| 1 (RED) | `b546fd7` | test(10-10): Rechnerseiten v2 – Kopf, Abschnitte, Notiz und CtaBand (rot) |
| 1 (GREEN) | `73170a8` | feat(10-10): Rechnerseiten auf v2 (D-15) |
| 2 | `093f49b` | fix(10-10): Bento-Bodenausrichtung und Tabellen-Caption (D-19) |
| 1 (Nachtrag aus Sichtprüfung) | `ba74d37` | fix(10-10): Rechner-Legenden fließen, Fieldset-Linie sichtbar |
| 3 | `cdd5074` | test(10-10): Darstellungstest und DESIGN-V2 § 19 |

## Prüfergebnisse

- **Aufgabe 1:** RED 14 neue Fälle rot, GREEN `kernseiten`, `calculators`, `calculator-hydration`, `breadcrumbs`, `contentkopf-unveraendert`: **153/153**. Typcheck und Lint 0 Fehler. `git diff main` an `HourlyRateCalculator.tsx`, `OfferCalculator.tsx`, `CalculatorFields.tsx`, `calculators.test.ts`, `calculator-hydration.test.ts`: leer. Kein `font-weight: 500` mehr in `Calculators.module.css` (vorher 5). `function CalculatorCta` = 1, Hinweistext und `data-notiz` in `CalculatorPage.tsx` vorhanden.
- **Aufgabe 2:** `design-v2-frames`, `preise-seite`, `design-v2-components` (+ `vergleich-seiten`): **207/207**, nach der Bento-Regel 135/135. Unter Sperre (12:21:49Z–12:26:13Z): Build grün, `funktionsdetails.pw.cjs` + `browser-functional.pw.cjs` **59 passed, 21 skipped, 0 failed** (B10-Grenze 48 px grün); `seo-audit.mjs` für `/preise`, `/vergleich`, vier Alternativen, kleine Betriebe, `/` und die drei Rechner: **0 Verstöße** (12 Regeln, 11 URLs).
- **Aufgabe 3 / Paketende** (Sperre 12:30:21Z–12:35:20Z): Build grün; volle Vitest-Suite **1429/1430**, der eine Fehlschlag war ein Zeitlimit (5 s) beim kalten Import in `tests/content-produktwahrheit.test.ts` (Datei auf dieser Spur unverändert), Einzelwiederholung **20/20 grün**; `seo-audit.mjs --paths=/rechner,/rechner/stundensatz,/rechner/angebotskalkulation,/support,/impressum,/datenschutz,/agb`: **0 Verstöße**; `browser-functional.pw.cjs` + `navigation.pw.cjs`: **100 passed, 28 skipped, 0 failed**; `visual-audit.mjs` (8 Routen inkl. `/preise`, Chromium + WebKit, fünf Breiten): **Exit 0, 80 Seitenläufe, 0 Statusfehler, 0 Querscroll, 0 JS-Fehler, 0 axe-Befunde**. `phase10-darstellung` 5/5; Wortlaut-Schutztests aus 10-03 in der vollen Suite grün.
- Port 3103 nach jedem Lauf frei, Sperre jeweils sofort freigegeben.

## B10 vorher/nachher (§ 6.1)

Dateien: `craftos/test-results/bento-b10/vorher.json`, `nachher.json`, `vergleich.json` (gitignoriert). 25 Seiten (22 Detailseiten, `/app`, `/`, `/styleguide`), Chromium und WebKit, 768/1024/1440 → 150 Läufe, 798 Kacheln, davon **540 `sm`/`md` ohne Phone**.

| Kriterium | vorher | nachher |
|---|---|---|
| Leerraum unter dem Text (max.) | 768: 25 px, 1024: **98 px**, 1440: 49 px | **0 px** überall |
| Kachelhöhen | – | 0 Abweichungen > 1 px (auch `/funktionen/rechnungen`) |
| Visual → Titel (min.) | 24 px | **24 px** |
| B10-`leer` je Kachel | – | unverändert (nur der Ort wandert) |

**Größte verlagerte Lücke:** 98 px, `/funktionen/angebote`, Kachel „Kosten nachvollziehen“ (md), 1024 px, Chromium; Visual → Titel 24 → 122 px.

## Caption bei 360 px (§ 6.2)

Chromium und WebKit auf `/preise` (2 Tabellen), `/vergleich/plancraft-alternative`, `/vergleich/handwerkersoftware-kleine-betriebe`, `/`, `/styleguide` (2 Tabellen): 10 Seitenprüfungen, **0 Fehler**. Rechte Kante 342 px = `clientWidth − 18` (342), `scrollWidth` 324 = `clientWidth` 324, Seitenquerscroll 0, `aria-hidden="true"`, `aria-label` des Scrollbereichs = Caption, `<caption class="sr-only">` mit gleichem Text. Vorab per Grep geprüft: kein Test zählt Textvorkommen der Caption; `preise-seite.test.ts` Z. 406 trifft weiter das echte `<caption`.

## Silbentrennung `/preise` (§ 6.3)

`h2#was-kostet-handwerkersoftware` „Was kostet eine Handwerkersoftware pro Monat?“ bei 1440 px: `Range.getClientRects()` für „Handwerkersoftware“ = **1 Zeile** (Chromium und WebKit), `hyphens: manual`. Keine Codeänderung.

## Sichtprüfung Rechner

30 Läufe (3 Seiten × 5 Breiten × 2 Engines): 0 Querscroll, 0 H1-Überlauf; Hinweis-Unterkante bei 360 × 640: 454–485 px. Formular/Ergebnis nebeneinander ab 1024 px, Feldpaare zweispaltig ab 768 px, Werkzeugkarten 1/2 Spalten. Fokus: Eingabefeld-Ring an `.inputWrap` (3 px `#BB7609`), ungültiges Feld 1 px + `inset 0 0 0 1px #B32F28`, Höhe 50 px (48 + Rahmen); Werkzeugkarte trägt den Ring, Link `outline: none`. Gesichtet und gefunden: Die Legenden verdeckten die Fieldset-Linie (Bestandsverhalten) → behoben in `ba74d37`, im Paketende-Lauf erneut gesichtet.

## Screenshots (nicht committet)

- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/chromium-1440-preise-h2.png` (Silbentrennung)
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/webkit-1440-preise-h2.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/chromium-360-preise-caption.png` (Caption 360 px)
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/chromium-1440-rechner.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/chromium-1440-angebotskalkulation.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots/chromium-360-stundensatz.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots-T3/chromium-1440-angebot-fehler-fokus.png` (Fehler, Fokus, Fieldset-Linie)
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots-T3/webkit-390-stundensatz.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-10/shots-T3/` (alle fünf Breiten, beide Engines) sowie `craftos/test-results/visual/` aus `visual-audit.mjs`
- Messdaten: `.../scratchpad/10-10/shots/sicht.json`, `.../scratchpad/10-10/shots-T3/sicht.json`

## Design-Kaskade

frontend-design-Leitlinie read-only gelesen (nichts kopiert); ui-ux-pro-max nicht erneut ausgeführt (D-20, Ergebnis im 10-UI-SPEC); 21st.dev und Context7 nicht benötigt (nur bestehende v2-Bausteine, keine API-Frage). Nachweis in `docs/DESIGN-V2.md` § 19.1.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fieldset-Linie vom Legend verdeckt**
- **Found during:** Aufgabe 2 (Sichtprüfung der Rechner-Screenshots)
- **Issue:** `legend` mit `width: 100%` sitzt in der Rahmenlinie des Fieldsets; die laut § 1.3 geforderte 1-px-Linie zwischen den Fieldsets war unsichtbar (auch im Bestand).
- **Fix:** `float: left` am Legend, `clear: both` am Folgeelement. Markup unverändert.
- **Files modified:** `craftos/components/calculators/Calculators.module.css`
- **Commit:** `ba74d37`

### Weitere Festlegungen

- TDD-Commit für Aufgabe 1 getrennt (`test(…)` rot, dann `feat(…)`); Aufgabe 3 als ein Commit, weil der Darstellungstest auf dem Stand nach Aufgabe 1 sofort grün ist. RED-Gegenprobe: Auf `main` hätte `Calculators.module.css` 5 Treffer `font-weight: 500` (Test rot); die Fixture-Fälle prüfen die Fehlertexte wörtlich.
- Bindungen aus 10-UI-SPEC § 6.2 und Spacing-Tabelle zusammen umgesetzt (Caption → Wischhinweis 8 px unter 768 px, Caption → Tabelle 16 px ab 768 px).
- `test-results/bento-b10/vergleich.json` zusätzlich als Zusammenfassung abgelegt.
- Die volle Suite hatte einen Zeitlimit-Fehlschlag in fremder Datei (`content-produktwahrheit.test.ts`, kalter Import parallel zum laufenden Server); einzeln grün. Kein Eingriff (Scope). Kandidat für `deferred-items.md` durch 10-06 (Timeout-Flake der vollen Suite).

## Übergabeliste

| Punkt | Besitzer |
|---|---|
| `pageUpdated`/Änderungsdatum 2026-10-23 für `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation` in `app/sitemap.ts` (K-15); zusätzlich Seiten mit geänderter `ComparisonTable`-Darstellung (`/preise`, `/vergleich`, vier Alternativen, `/vergleich/handwerkersoftware-kleine-betriebe`, `/`) nur, falls 10-06 Darstellungsänderungen datiert | 10-06 |
| Aus 10-03 weiter offen: Änderungsdaten `/support`, `/impressum`, `/datenschutz`, `/agb` | 10-06 |
| `HINWEIS_MAX` aus `ContentKopf.tsx` nach `components/v2/budgets.ts` | 10-06 |
| B10-Neumessung `/funktionen/rechnungen` auf dem zusammengeführten Stand (neue § 13b-Kachel aus Paket d, K-8), Kachelhöhen als neuen Sollwert festlegen; Skript-Vorlage `scratchpad/10-10/b10.cjs` (Verfahren `funktionsdetails.pw.cjs` Z. 264–329 plus `unterText`/`visualZuTitel`) | 10-06 |
| Caption-Fall 360 px in `tests/e2e/design-v2.pw.cjs` (fünf Seiten, Kriterium `right ≤ clientWidth − 18`, `scrollWidth ≤ clientWidth`, kein Seitenquerscroll) | 10-06 |
| 404-Kartenfall in `tests/e2e/a11y.pw.cjs` (Status 404, `noindex`, keine Brotkrumen, Karten `/`, `/hilfe`, `/funktionen`, ein Tabstopp je Karte) | (a) |
| Rechner-Tastaturfälle für `a11y.pw.cjs`: Werkzeugkarten ein Tabstopp, Ring an `article`; Felder mit Ring an `.inputWrap`; Rechnernavigation `aria-current` | (a) |
| Geltungsbereich von `tests/phase10-darstellung.test.ts` um `components/CraftOSLogo.tsx` erweitern, sobald Paket (b) gemergt ist (K-3) | 10-06 |
| Neue Routen in `scripts/visual-audit.mjs`/`a11y-audit.mjs` (Rechner, `/support`, Rechtsseiten, 404) setzt Paket (a) bereits | (a) |
| `docs/DESIGN-V2.md` § 19.6 (Dimmstufe, Fokusalgorithmus) und § 19.7 (Logo-SVG, Schnitte) mit Inhalt füllen | 10-06 |
| Zeitlimit-Flake `content-produktwahrheit.test.ts` (kalter Import in der vollen Suite) prüfen | 10-06 |
| Lighthouse Accessibility für die drei Rechnerseiten berichten (Soll 100, kein Gate) | (b) bzw. 10-06 |

## Inhaberliste „Freigabe zum Entfernen nötig“

| Kandidat | Grund | Status |
|---|---|---|
| `craftos/components/ui/PageHero.tsx` | nirgends mehr gerendert | bleibt bis zur Freigabe (D-04) |
| Funktion `CalculatorCta` in `components/calculators/CalculatorPage.tsx` (samt CSS `.ctaSection`, `.primaryLink`) | seit 10-10 nicht mehr gerendert (CtaBand + Notiz) | bleibt bis zur Freigabe |
| Altklassen `section-space`, `section-intro`, `btn-secondary`, `soft-panel`, `split-section`, `.eyebrow`/`.spec-label` (soweit ungenutzt) in `app/globals.css` | auf Rechnern, `/support`, Rechtsseiten und 404 nicht mehr genutzt; Nutzung anderswo vor dem Entfernen prüfen (Datei gehört (a)) | bleibt bis zur Freigabe |
| Schriftdateien Clash 500/700 und General 500 | nach § 7 nicht mehr geladen (Paket b) | bleibt bis zur Freigabe |

## Known Stubs

Keine. § 19.6/§ 19.7 in `DESIGN-V2.md` sind bewusst als Übergabeabschnitte mit dem Vermerk „Inhalt ergänzt 10-06 nach dem Merge“ angelegt (Plan, K-12).

## Threat Flags

Keine neue Angriffsfläche: keine Netzaufrufe, keine Speicherung, Rechner-Komponenten unverändert (T-10-14), Bausteinänderungen per B10 und Bindungstests abgesichert (T-10-15), Rechner-Tests ohne Anpassung grün (T-10-04).

## Self-Check: PASSED

- Dateien vorhanden: `craftos/tests/phase10-darstellung.test.ts`, `craftos/docs/DESIGN-V2.md` (§ 19), `craftos/test-results/bento-b10/vorher.json`, `nachher.json`, `vergleich.json`.
- Commits vorhanden: `b546fd7`, `73170a8`, `093f49b`, `ba74d37`, `cdd5074`.
