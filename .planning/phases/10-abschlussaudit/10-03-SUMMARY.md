---
phase: 10-abschlussaudit
plan: 03
subsystem: craftos-website (Paket c, Teil 1)
tags: [paket-c, design-02, design-05, rechtsseiten, wortlaut-schutz, contentkopf, 404, support, kontrast]
requires: []
provides:
  - "Wortlaut-Schutztest der Rechtsseiten (Blockfolge mit Tags und href, Referenzen vom unveränderten Stand)"
  - "Byte-Vergleich der Phase-9-Köpfe und der ContentKopf-Grundregeln"
  - "ContentKopf K1 (crumbs null, nur 404) und K2 (hinweis, HINWEIS_MAX = 80)"
  - "Rechtsseiten, 404 und /support auf v2-Bausteinen"
affects: [10-10, 10-06, "Paket (a) a11y/visual-audit"]
tech-stack:
  added: []
  patterns:
    - "Schutztest ohne Snapshot-API: reine Ausschnitt-/Blockfolge-Funktionen + readFileSync + toBe, Referenzen per einmaligem Erzeuger im Scratchpad"
    - "Referenzen zeilenendenunabhängig lesen (core.autocrlf)"
key-files:
  created:
    - craftos/tests/rechtstexte-wortlaut.test.ts
    - craftos/tests/fixtures/rechtstexte/impressum.txt
    - craftos/tests/fixtures/rechtstexte/datenschutz.txt
    - craftos/tests/fixtures/rechtstexte/agb.txt
    - craftos/tests/contentkopf-unveraendert.test.ts
    - craftos/tests/fixtures/contentkopf/hilfe-rechnung-fertigstellen.html
    - craftos/tests/fixtures/contentkopf/blog.html
    - craftos/tests/fixtures/contentkopf/hilfe-kategorie-rechnungen.html
    - craftos/tests/fixtures/contentkopf/ContentKopf.grundregeln.txt
    - craftos/components/legal/Legal.module.css
  modified:
    - craftos/components/legal/Legal.tsx
    - craftos/components/content/ContentKopf.tsx
    - craftos/components/content/ContentKopf.module.css
    - craftos/app/impressum/page.tsx
    - craftos/app/datenschutz/page.tsx
    - craftos/app/agb/page.tsx
    - craftos/app/not-found.tsx
    - craftos/app/support/page.tsx
    - craftos/tests/kernseiten.test.ts
    - craftos/tests/breadcrumbs.test.ts
decisions:
  - "Blockfolge der Rechtstexte ohne zusätzliches Leerzeichen an den Link-Markern ([a href=\"…\"]Text[/a]), damit auch Leerraum am Link geschützt ist"
  - "DataBlock-Zeilen bleiben <p> und erscheinen in der Referenz als [p]; Text direkt in einem div würde als [div] geführt"
  - "Hinweisabsätze (text-sm) laufen über die neue Komponente LegalHinweis (Legal.module.css, #62626E); „Angaben gemäß § 5 DDG“ behält text-ink-500 (= #62626E, 6,01 : 1)"
  - "Gewichte-/Farbtest vorerst nur über die 10-03-Dateien; Rechner-Dateien ergänzt 10-10"
requirements-completed: []
metrics:
  duration: "ca. 75 Min."
  completed: 2026-10-23
  tasks: 3
  commits: 5
---

# Phase 10 Plan 03: Rechtsseiten, 404 und Support auf v2 mit Wortlaut-Schutz Summary

Wortlaut-Schutz (Blockfolge mit Tags und `href`) und Byte-Vergleich der Phase-9-Köpfe zuerst, danach `ContentKopf` K1/K2, Rechtsprosa aus `Legal.module.css` mit Kontrast ≥ 4,5 : 1, die 404-Seite mit drei Einstiegen und `/support` auf `ContentKopf`, `LinkKarten` und `CtaBand`, ohne Wortänderung an den Rechtstexten.

## Startgate

Bestanden: `craftos/docs/releases/PHASE-09-ROLLOUT.md` vorhanden, `status: approved` im 10-UI-SPEC (1 Treffer), `git status --porcelain craftos` leer, Port 3103 frei. `craftos/node_modules` war im Worktree bereits vollständig vorhanden (echtes Verzeichnis, keine Junction); ein zusätzliches `npm ci` war nicht nötig.

## Commits

| Aufgabe | Commit | Betreff |
|---|---|---|
| 1 (erster Commit, Schutz Rechtstexte) | `9d573a0` | test(10-03): Wortlaut-Schutz der Rechtsseiten vor jeder Darstellungsänderung |
| 1 (Schutz Phase-9-Köpfe, K3) | `93b57d8` | test(10-03): Byte-Vergleich der Phase-9-Köpfe vor der Kopfänderung |
| 1/2 (Robustheit) | `8179d19` | test(10-03): Schutztests lesen Referenzen zeilenendenunabhängig |
| 2 | `5e9c8e9` | feat(10-03): ContentKopf K1/K2, Rechtsseiten und 404 auf v2 (D-09, D-17, D-18) |
| 3 | `600ff47` | feat(10-03): /support auf v2 (D-16, K-2) |

Der erste Branch-Commit enthält genau `Legal.tsx` (nur `data-rechtstext`), den Test und die drei Referenzdateien (per `git diff-tree` geprüft). Beide Schutztests waren ohne Referenzen rot („Referenz … fehlt – auf unverändertem Stand erzeugen.“) und mit den Referenzen vom unveränderten Stand grün. Eine Gegenprobe (ein Punkt an „Deutschland“ im Impressum) machte den Wortlaut-Test rot mit „Rechtstext impressum weicht vom Wortlaut ab (erste Abweichung bei Zeichen 116 …) – nur Darstellung ändern.“; danach wurde die Datei unverändert zurückgesetzt.

## Prüfergebnisse

- Vitest gezielt (kernseiten, breadcrumbs, rechtstexte-wortlaut, contentkopf-unveraendert, design-v2-components, content-vorlage): **216/216 grün**. Darin: Wortlaut-Test 11/11, Byte-Vergleich 6/6.
- `npm run typecheck` und `npm run lint`: 0 Fehler.
- Unter Sperre (11:31:47Z–11:33:45Z): `npm run build` grün; `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs --paths=/impressum,/datenschutz,/agb,/support`: **0 Verstöße** in allen 12 Regeln (4 von 156 Sitemap-URLs).
- `visual-audit.mjs` auf Port 3103, Routen `/impressum,/datenschutz,/agb,/support`: **Exit 0**, 40 Seitenläufe (Chromium und WebKit × 360/390/768/1024/1440), 0 Statusfehler, 0 Querscroll, 0 axe-Befunde, 0 JS-Fehler.
- 404-Probe `GET /gibt-es-nicht-c`: Status 404, `noindex`, „So geht es weiter“ vorhanden. Sichtprüfung 404 (Chromium, fünf Breiten): kein Querscroll, H1 ohne Überlauf, keine Brotkrumen; bei 360 × 640 Lead-Unterkante 324 px, H2 bei 420 px (über dem Falz).
- Port 3103 nach dem Lauf frei, Sperre freigegeben.
- Verify-Greps: kein `text-primary-600`/`text-ink-400` in Rechtsseiten und `Legal.tsx`; keine Altklassen in `not-found.tsx`; kein `PageHero`/Altklassen in `app/support/page.tsx`; keine Snapshot-APIs in den Schutztests.

## Screenshots (nicht committet)

- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-1440-impressum.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-360-impressum.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-1440-datenschutz.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/webkit-360-agb.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-390-support.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-1440-support.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-c/chromium-{360,390,768,1024,1440}-404.png`

Gesichtet: Kopf warm mit Eyebrow `#99600B`, Rechtsprosa max. 720 px linksbündig, Datenblöcke warm mit Linie, Links unterstrichen in `#784B10`, Karten der 404 und von `/support` in den geforderten Flächen; keine offensichtlichen Fehler.

## Design-Kaskade

frontend-design-Leitlinie read-only gelesen; keine weitere ui-ux-pro-max-Suche (D-20, im 10-UI-SPEC ausgeführt). 21st.dev und Context7 wurden nicht benötigt, da nur bestehende v2-Bausteine verwendet wurden; Next-Doku nicht abgefragt.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Referenzen bei CRLF-Auschecken rot**
- **Found during:** Aufgabe 2
- **Issue:** Das Repo nutzt `core.autocrlf=true`; die LF-Referenzen würden in einem anderen Arbeitsbaum als CRLF ausgecheckt und der `toBe`-Vergleich wäre grundlos rot. Zusätzlich lief der erste Seitenfall im Parallellauf wegen des kalten Imports in das 5-s-Zeitlimit.
- **Fix:** Referenz vor dem Vergleich `\r\n` → `\n`; Seitenfälle mit 60-s-Limit. Referenzen und Vergleichslogik unverändert.
- **Commit:** `8179d19`

**2. [Rule 2] Link-Marker exakt statt mit Leerzeichen**
- **Found during:** Aufgabe 1 (vor dem Commit)
- **Issue:** `[a href="…"] Text [/a]` mit Leerzeichen hätte ein entferntes oder zusätzliches Leerzeichen am Link nicht erkannt.
- **Fix:** Marker ohne zusätzlichen Leerraum; Referenzen danach (vor dem ersten Commit) aus dem unveränderten Stand erzeugt.

### Weitere Festlegungen

- Hinweisabsätze nutzen die neue Komponente `LegalHinweis` statt Tailwind-Klassen (Markup-Änderung ohne Wortänderung, vom Wortlaut-Test gedeckt). „Angaben gemäß § 5 DDG“ behält `text-ink-500` (= `#62626E`, 6,01 : 1).
- Der Gewichte-/Farbtest aus 10-UI-SPEC § 11 steht in `tests/kernseiten.test.ts` und deckt vorerst nur die Dateien dieses Plans (ohne `app/rechner/**`, `components/calculators/**`).
- Die Altklassen-Prüfung auf `/support` schließt das `CtaBand` aus, weil dessen Sekundärlink die Bestandsklasse `text-link` trägt (Baustein unverändert, Besitz (a)); die Quelle `app/support/page.tsx` ist frei davon.
- Neue Kopf- und Seitenfälle stehen laut Plan in `tests/kernseiten.test.ts` (nicht in einer eigenen Datei nach PATTERNS K-7); `tests/design-v2-components.test.ts` blieb unverändert und grün.

## Übergabeliste

| Punkt | Besitzer |
|---|---|
| `pageUpdated`/Änderungsdatum 2026-10-23 für `/support`, `/impressum`, `/datenschutz`, `/agb` in `app/sitemap.ts` (K-15) | 10-06 |
| `HINWEIS_MAX` aus `ContentKopf.tsx` nach `components/v2/budgets.ts` übernehmen | 10-06 |
| Routen für `scripts/visual-audit.mjs`/`a11y-audit.mjs`: `/support`, `/impressum`, `/datenschutz`, `/agb`, 404 (`/gibt-es-nicht…` mit erwartetem Status 404, K-10), später die Rechnerseiten | (a) |
| 404-Fälle für `tests/e2e/a11y.pw.cjs`: Status 404, `meta[name=robots]` mit `noindex`, keine Brotkrumen, drei Karten `/`, `/hilfe`, `/funktionen`; Tastatur: je Karte ein Tabstopp (Titel-Link), Fokus an der Karte | (a) |
| Gewichte-/Farbtest in `tests/kernseiten.test.ts` um `app/rechner/**` und `components/calculators/**` erweitern; `hinweis` im Rechnerkopf nutzen | 10-10 |
| `docs/DESIGN-V2.md` § 19 „Phase 10“ (Kaskade, J1–J12, Verweis auf 10-UI-SPEC) – in diesem Plan nicht Teil von `files_modified` | 10-10 bzw. 10-06 |
| Byte-Referenzen der Phase-9-Köpfe enthalten Mengen und Stand-Datum aus `content/`: kommen nach dem Merge neue Hilfe-/Blog-Artikel hinzu (z. B. Paket (d)), ändern sich `blog.html`/`hilfe-kategorie-rechnungen.html` inhaltlich. Dann Referenzen nur nach Prüfung, dass sich ausschließlich Mengen/Daten ändern, neu erzeugen | 10-06 |
| Lighthouse Accessibility `/impressum` (Gate 100) messen | (b) bzw. 10-06 |

## Inhaberliste „Freigabe zum Entfernen nötig“

| Kandidat | Grund | Status |
|---|---|---|
| `craftos/components/ui/PageHero.tsx` | wird nach dieser Umstellung nirgends mehr gerendert | bleibt bis zur Freigabe (D-04) |
| Altklassen `section-space`, `split-section`, `soft-panel`, `section-intro`, `btn-cta`, `btn-secondary`, `eyebrow`, `spec-label` in `app/globals.css` | auf `/support`, Rechtsseiten und 404 nicht mehr genutzt; weitere Nutzung anderswo vor dem Entfernen prüfen (Datei gehört (a)) | bleibt bis zur Freigabe |
| ODR-Link auf `/impressum` (Plattform 2025 eingestellt) und kurzer Title des Impressums | Inhaberpunkt D-38; Link und Text unverändert, nur die Darstellung (Kontrast) angepasst | Inhaberentscheidung |
| Hinweisabsätze „Vorlage …“ in `/datenschutz` und `/agb` | Inhaberpunkt (D-31 Nr. 37); Wortlaut unverändert | Inhaberentscheidung |

## Known Stubs

Keine.

## Self-Check: PASSED

- Dateien vorhanden: `tests/rechtstexte-wortlaut.test.ts`, drei Rechtstext-Referenzen, `tests/contentkopf-unveraendert.test.ts`, vier Kopf-Referenzen, `components/legal/Legal.module.css`, `components/ui/PageHero.tsx` (unverändert erhalten).
- Commits vorhanden: `9d573a0`, `93b57d8`, `8179d19`, `5e9c8e9`, `600ff47`.
