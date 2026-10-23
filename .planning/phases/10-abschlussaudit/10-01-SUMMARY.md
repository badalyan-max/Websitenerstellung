---
phase: 10-abschlussaudit
plan: 01
subsystem: prüfwerkzeuge/barrierefreiheit
tags: [paket-a, barrierefreiheit, axe, tastatur, a11y-audit, visual-audit, werkzeug]
requires: []
provides:
  - "craftos/scripts/lib/a11y-audit-core.mjs (reine Gate-, Shard-, Merge- und Tastaturbewertung)"
  - "craftos/scripts/a11y-audit.mjs (CLI mit --paths, --widths, --engines, --shard, --concurrency, --animation, --merge)"
  - "craftos/scripts/visual-audit.mjs mit axe bei fünf Breiten und ergänzten Routen"
affects: [10-08, 10-12]
tech-stack:
  added: []
  patterns:
    - "axe: .options({ rules: { color-contrast-enhanced } }) vor .withTags(AXE_TAGS); Großtext = expectedContrastRatio 4.5:1"
    - "Fokus-Signatur Element + 4 Vorfahren inkl. ::before/::after gegen Ruhezustand"
    - "Teilberichte report-<k>-of-<n>.json, Merge prüft Abdeckung 1..n"
key-files:
  created:
    - craftos/scripts/lib/a11y-audit-core.mjs
    - craftos/scripts/a11y-audit.mjs
    - craftos/tests/a11y-audit-core.test.ts
  modified:
    - craftos/scripts/visual-audit.mjs
decisions:
  - "Ausdrückliche --paths gelten für beide Engines; ohne --paths prüft WebKit nur WEBKIT_VORLAGEN (fehlt eine Vorlage in der Sitemap, Exit 2)."
  - "WebKit unter Windows fokussiert Links per Tab nicht (auch nicht mit Alt+Tab, gemessen); dort zählen Links ohne tabindex nicht als Tab-Kandidaten, Fokus an Links prüft Chromium."
  - "WebKit scrollt das fokussierte Element erst im nächsten Frame in den Sichtbereich; außerhalb liegende Elemente werden bis zu zehn Frames nachgemessen (bedingungsbasiert, keine feste Pause)."
  - "Radiogruppen zählen als ein Tab-Kandidat; summary nur als erstes summary-Kind von details; tabindex=-1 ausgenommen."
  - "visual-audit wertet axe jetzt wie D-06 (Gate + Großtext 4.5:1); moderate/minor stehen als accessibilityUebrige im Bericht, nicht mehr im Exitcode."
  - "Animationszustand, der nicht startet (data-running nie true), ist ein Befund (statusFehler, regel animation) statt still zu bestehen."
requirements-completed: []
metrics:
  duration: "ca. 20 min"
  completed: 2026-10-23
  tasks: 2
  files: 4
---

# Phase 10 Plan 01: A11y-Prüfwerkzeug (a11y-audit) und visual-audit mit fünf Breiten – Summary

Neues Werkzeug `scripts/a11y-audit.mjs` prüft gegen den laufenden lokalen Server alle Sitemap-Seiten plus `/styleguide` und `/gibt-es-nicht-a11y` mit axe 4.13.0 (AA-Tags plus `color-contrast-enhanced` für Großtext) und einem Tab-Durchlauf. Der Durchlauf erkennt den Fokusindikator auch an Vorfahren, Shards und Merge ergeben das Gesamtgate. `visual-audit.mjs` prüft axe jetzt bei allen fünf Breiten und erwartet für die 404-Probe den Status 404.

## Startgate (vor Aufgabe 1, 2026-10-23 ca. 10:52 UTC)

| Bedingung | Ergebnis |
|---|---|
| `craftos/docs/releases/PHASE-09-ROLLOUT.md` vorhanden | erfüllt |
| `.planning/phases/10-abschlussaudit/10-UI-SPEC.md` vorhanden | erfüllt |
| `git status --porcelain craftos` leer | erfüllt |
| Port 3101 nicht belegt | erfüllt |

`node_modules` war im Worktree bereits per `npm ci` installiert (Stand 12:47 Ortszeit, kein Junction, `npm ls --depth=0` ohne Fehler). Ein zweites `npm ci` war daher nicht nötig. Koordinationsstatus gelesen: Es gibt kein Website-Rezept, deshalb liefen die Proben lokal und einzeln unter `.heavy-lock`.

## Aufgaben

| Aufgabe | Inhalt | Commits |
|---|---|---|
| 1 | Kern-Datei `a11y-audit-core.mjs` mit Tests (TDD) | `18597e8` (test, RED), `0c43393` (feat, GREEN) |
| 2 | CLI `a11y-audit.mjs`, `visual-audit.mjs` umgestellt, Funktionsprobe | `f4a7970` |

## Prüfergebnisse

- `tests/a11y-audit-core.test.ts`: 32/32 grün. `npm run typecheck` und `npm run lint` grün.
- Exitcodes ohne Server: `--widths=500` → 2, `--shard=x --foo` → 2, nicht erreichbarer Server → 3, `--merge` ohne Teilberichte → 3.
- Akzeptanz-Greps: 11 Exporte, 0 Datei-/Netzzugriffe in der Kern-Datei; `4.5:1` und `7:1` je 2-mal im Test; `.options(` steht vor `.withTags(`; `width === 390 || width === 1440` kommt 0-mal vor, die ergänzten Routen 4-mal.

### Funktionsprobe unter Sperre (zweiter, maßgeblicher Lauf 11:08–11:09 UTC)

| Schritt | Laufzeit | Freier RAM | Ergebnis |
|---|---|---|---|
| Sperre geholt | – | 3,00 GiB | – |
| `npm run build` | 28 s | 3,78 GiB | grün |
| Probe (a): 4 Pfade × 360/1440 × Chromium/WebKit, 16 Aufrufe + 2 Animationsprüfungen | 28 s | 3,50 → 3,80 GiB | Teillauf Exit 0, Merge **Exit 0**; alle Pflichtfelder vorhanden; `/gibt-es-nicht-a11y` Status 404 ohne Statusfehler; 0 Gate, 0 Großtext, 0 Tastatur |
| Probe (b): `/impressum` @1440 Chromium | 2 s | 3,70 GiB | Teillauf Exit 0, Merge **Exit 1** über `color-contrast` (2,84 : 1, `#d28a13` auf Weiß, Selektor `.hover\:underline`); damit ist belegt, dass das Gate greift |
| Probe (c): visual-audit `/`, `/gibt-es-nicht`, `/rechner`, `/support` @360/768 | 30 s | 3,82 GiB | **Exit 0**; `/gibt-es-nicht` Status 404 ohne Statusbefund; 0 axe-Befunde, 0 JS-Fehler |
| Server gestoppt, Port 3101 frei, Sperre frei | – | 4,72 GiB | erfüllt |

Je Aufruf dauerte es in Chromium 1,8–3,7 s und in WebKit 2,2–3,6 s, jeweils inklusive Scrollen, axe und Tab-Durchlauf. Der Tab-Durchlauf erreichte alle Kandidaten: Chromium 28–77 je Seite, WebKit 1–15 ohne Links. Die Animationsprüfung auf `/funktionen/zeiterfassung` lief bei beiden Breiten durch die Phasen 0, 1 und 2 ohne Befund. Unvollständige Kontrastprüfungen (nur Bericht, Sichtprüfung): 236 Knoten in Probe (a), überwiegend Text auf Verläufen oder Bildern.

Der erste Probelauf (11:04–11:06 UTC, Build 41 s) meldete 4 WebKit-Fehlalarme „Fokus auf unsichtbarem Element“ an FAQ-`summary` und am Scrollbereich der ComparisonTable. Die Diagnose unter Sperre (eigener Serverstart mit eigener PID, danach Port frei) zeigte, dass WebKit das fokussierte Element erst einen Frame später in den Sichtbereich scrollt. Das ist behoben (siehe Abweichungen).

## Befunde der Probe außerhalb der Rechtsseiten (für 10-08)

Keine. Auf `/`, `/funktionen`, `/funktionen/zeiterfassung` und der 404-Seite (360/1440, beide Engines) sowie auf `/rechner` und `/support` (visual-audit 360/768) gab es 0 Gate-Verstöße, 0 Großtext-Knoten und 0 Tastaturfehler. Der einzige Befund ist der bekannte Altfehler auf `/impressum`, der zu Paket (c) gehört (D-09).

## Abweichungen vom Plan

### Automatisch behoben

**1. [Regel 1 – Fehler] WebKit-Fehlalarm „Fokus auf unsichtbarem Element“**
- **Gefunden in:** Aufgabe 2, erster Probelauf
- **Problem:** WebKit scrollt nach dem Tab erst im nächsten Frame. Die sofortige Messung lag deshalb außerhalb des Viewports.
- **Behebung:** Liegt ein Element außerhalb, wird bis zu zehn Frames nachgemessen. Die Wartezeit hängt an dieser Bedingung, es gibt keine feste Pause.
- **Datei:** `craftos/scripts/a11y-audit.mjs`; Commit `f4a7970`

**2. [Regel 2 – fehlende Absicherung] Nicht gestarteter Animationszustand**
- **Problem:** Wenn `data-running` nie `true` wird, wäre die Animationsprüfung ohne Befund geblieben, also stillschweigend bestanden.
- **Behebung:** `mergeReports` meldet in diesem Fall einen `statusFehler` mit `regel: "animation"` und `zustand: "animation"`. Ein Test ist ergänzt.
- **Dateien:** Kern-Datei und Test; Commit `f4a7970`

**3. [Regel 3 – Plattformverhalten] WebKit fokussiert Links per Tab nicht**
- Gemessen mit einer `setContent`-Probe ohne Server: `Tab` und `Alt+Tab` überspringen in WebKit unter Windows alle Links. Ohne Ausnahme wäre jede WebKit-Seite mit „nie fokussiert“ fehlgeschlagen. Deshalb zählen in WebKit Links ohne `tabindex` nicht als Kandidaten. Der Fokus an Links wird vollständig im Chromium-Lauf geprüft. Das steht im Kopfkommentar des CLI.

**4. Präzisierungen des Vertrags (keine Verhaltensänderung des Gates)**
- `parseOptionen` liefert zusätzlich `webkitPfade`. Mit `sitemapPfade: null` werden nur die sitemapfreien Optionen geprüft, das ist die Prüfung vor dem Netzaufruf. Erlaubt sind `--concurrency` 1–3 und `--animation` `an`/`aus`.
- `tastaturFehler` nimmt zusätzlich `pfad`, `breite` und `falle` an. `kandidaten` hat die Form `{ id, selektor }`.
- `bewerteAxe` liefert zusätzlich `unvollstaendigStellen`. `mergeReports` liefert zusätzlich `animationsAufrufe`, `unvollstaendigStellen` und `snippetPfade`.
- Ergänzung des Orchestrators umgesetzt: Alle Einzelbefunde (`gateVerstoesse`, `grossText`, `tastatur`, `statusFehler`, `unvollstaendigStellen`) tragen wörtlich die Felder `regel` und `zustand` (`stabil` oder `animation`). Befunde im Animationszustand tragen zusätzlich `phase`.

## Übergaben an spätere Pläne

| Punkt | Besitzer |
|---|---|
| Voller Lauf: 158 Seiten × 5 Breiten Chromium plus WebKit-Vorlagen, Empfehlung `--shard=k/4` und WebKit als eigener Shard, je Shard Sperre neu holen; Zahl der Snippet-Seiten (erwartet ≥ 22) aus `report.json` | 10-08 (Baseline), 10-12 (Schlussnachweis) |
| `/impressum` `color-contrast` 2,84 : 1 (Link OS-Plattform); laut RESEARCH zusätzlich `/datenschutz` und `/agb` | Paket (c) |
| Filter in 10-08 auf `regel` und `zustand` (Feldnamen wie vereinbart) | 10-08 |
| Lücke: kein Koordinationsrezept für Website-Audits (Build, `next start`, Playwright); Läufe lokal unter `.heavy-lock` | Orchestrator, Rezeptbau vorschlagen |

## Known Stubs

Keine.

## Self-Check: PASSED

- Dateien vorhanden: `craftos/scripts/lib/a11y-audit-core.mjs`, `craftos/scripts/a11y-audit.mjs`, `craftos/tests/a11y-audit-core.test.ts`, `craftos/scripts/visual-audit.mjs`.
- Commits vorhanden: `18597e8`, `0c43393`, `f4a7970`.
- TDD-Gate: Der `test(10-01)`-Commit (RED) liegt vor dem `feat(10-01)`-Commit (GREEN).
