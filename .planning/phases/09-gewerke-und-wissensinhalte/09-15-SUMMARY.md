---
phase: 09-gewerke-und-wissensinhalte
plan: 15
subsystem: content-fundament
tags: [fundament, produktbasis, release-delta, pruefwerkzeug, zitate, leitlinie-l1]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: lib/leitlinie-l1.json, scripts/lib/ts-literale.mjs (stringLiterale), Antwortregel"
provides:
  - "Eingefrorene Produktbasis Web v4.0.0-test.245 (6686d05e…) und Mobile test.96 (837aab4f…), dokumentiert in docs/content-pruefung/09-basis.md"
  - "Delta ab a9319e5/6cac366 mit Wirkung und Paketzuordnung (Kassenbuch 09-07/09-14, § 13b 09-17, Zeitkorrektur und Zeitsperre 09-06, DATEV-Einstellungen 09-05/09-04)"
  - "docs/product-source-snapshot.json mit basis-Block und SHA-256 der 37 Belegdateien am Basis-Commit"
  - "scripts/content-pruefen.mjs: --zitate, --ausnahmen, --l1, --antwort, --belege"
  - "Format der Paket-Prüfdateien (Zeilen | hilfe/<slug> |, Abschnitte Zitat-Ausnahmen und Übergabeliste) und Zuordnung Prüfdatei → Plan"
affects: [09-12, 09-03, 09-04, 09-05, 09-06, 09-07, 09-08, 09-14, 09-17, 09-18, 09-09, 09-16]

tech-stack:
  added: []
  patterns:
    - "Release-Zitate per git grep -F am eingefrorenen Commit (Sammelsuche mit -o, Fehlende einzeln nachgeprüft), Testdateien und fremde Sprachordner ausgeschlossen"
    - "Prüfskript liest nur Dateien und Git-Objekte, schreibt nichts, Exit 1 bei Befund, 2 bei Bedienfehler"

key-files:
  created:
    - craftos/docs/content-pruefung/09-basis.md
    - craftos/scripts/content-pruefen.mjs
  modified:
    - craftos/docs/product-source-snapshot.json
    - craftos/docs/PRODUCT-REGISTER.md
    - .planning/phases/09-gewerke-und-wissensinhalte/deferred-items.md

key-decisions:
  - "Phase 9: Produktbasis eingefroren auf Web v4.0.0-test.245 (6686d05e) und Mobile test.96 (837aab4f); Register und Preis-Snapshot standen schon dort (82c82e6, 62f4478), 09-15 dokumentiert nur"
  - "Phase 9: product-source-snapshot.json trägt die eingefrorenen Commits (basis) – content-pruefen.mjs liest sie dort"
  - "Phase 9: --zitate sucht ohne Testdateien und in der Mobile-App nur im Sprachordner de; Begriffe unter 4 Zeichen nur Hinweis"
  - "Phase 9: Zusatzschalter --belege liefert Release-Dateien je Begriff für die Spalte Belegpfade (D-11)"
  - "Phase 9: Kassenbuch und § 13b vorerst ohne liveExtras-Eintrag (würde /funktionen ändern); Übergabe an 09-09"

requirements-completed: []

duration: 15min
completed: 2026-10-23
---

# Phase 9 Plan 15: Produktbasis und Prüfwerkzeug Summary

**Produktbasis auf Web v4.0.0-test.245 / Mobile test.96 eingefroren und mit Delta ab a9319e5/6cac366 dokumentiert (Preise unverändert, vier neue Live-Funktionen den Paketen zugeordnet); Prüfwerkzeug `scripts/content-pruefen.mjs` prüft Zitate gegen den Release, Leitlinie L-1 und Antwortlängen.**

## Performance

- **Duration:** ca. 15 min
- **Started:** 2026-10-22T23:56Z (nach `git merge main`, Fast-Forward auf `02945f8`)
- **Completed:** 2026-10-23T00:12Z
- **Tasks:** 2 von 2
- **Files:** 2 neu, 3 geändert

## Accomplishments

- **Basis (`682ba88`):** `origin/release` lokal gelesen (kein Fetch): Web `6686d05e0aed9d9ed1a9959ddc2142928e874e84` (v4.0.0-test.245), Mobile `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` (mobile-v1.0.0-test.96) – identisch mit `productBasis` und Preis-Snapshot. Daher nur dokumentiert, kein `sync:product`. `product-source-snapshot.json` bekam einen `basis`-Block und neu berechnete SHA-256 der 37 Belegdateien am Basis-Commit (alle Pfade vorhanden; der Altstand vom 9. September war CRLF-gehasht und 35-fach veraltet). `PRODUCT-REGISTER.md`: Tabelle von test.239/test.93 auf test.245/test.96, Hinweis auf die neuen Funktionen, DATANORM-Satz nach L-1 berichtigt (DATANORM 4 und 5 belegt).
- **Faktenabgleich:** `git diff a9319e5 origin/release` für `src/lib/constants.ts`, `src/lib/subscription`, `src/lib/featureFlags.ts`, `src/lib/ai` leer (auch ab test.240) → Preise, Testtage, Credits, Flags unverändert. Sieben neue Migrationen, keine zu Preisen, Test oder Lizenzen.
- **Prüfwerkzeug (`af8bf80`):** `--zitate` (git grep -F am eingefrorenen Commit, Web `src` + `supabase/functions`, Mobile `src` mit Sprachdateien nur `de`, ohne Testdateien), `--ausnahmen` (Abschnitt „Zitat-Ausnahmen“, nur mit Begründung), `--l1` (Wörter und Altbegriffe ohne Übergangsliste, Markdown zeilenweise plus zeilenübergreifend, `.ts` über `stringLiterale`, JSON-Ausnahmen GAEB-Fachteil und Pflichthinweis, Listeneintrag-Regel wie im Test), `--antwort` (answer ≤ 300, erster Absatz unter Frage-H2/H3 ≤ 300, Listen/Tabellen/Code übersprungen wie im Audit), `--belege`.

## Delta ab a9319e5 / 6cac366 (Kurzform)

| Release | Inhalt | Paket |
|---|---|---|
| Web test.242 (`6164ea4`, `e0cabae`) | Rechnung nach § 13b (Kundenschalter „Bauleister nach § 13b“, Rechnungsschalter „Rechnung nach § 13b (ohne USt.)“, Steuerart je Rechnungsfolge) | 09-17 (d2); 09-08 darf verlinken |
| Web test.242–244 (`3ae0cae` … `b6ea3ec`) | GoBD-Kassenbuch Stufe 1 mit DATEV-Export (Buchhaltung → „Kasse“) | 09-07 bzw. 09-14 (f), neuer Hilfeartikel |
| Web test.243 (`59ad84a` … `f03f825`), Mobile test.96 (`ea2fcdf`, `837aab4`) | Sperre abgerechneter Zeiten, Korrektur über Storno der Rechnung; Hinweis in der App | 09-06 (e) |
| Web test.243 (`bf08314`, `c4d4945`, `142732d`) | DATEV-Export verlangt hinterlegte DATEV-Einstellungen | 09-05 (d); Hinweis 09-04 (c) |
| Web test.245 (`6686d05`) | nur Fehlertexte, Toasts, Kalender | – |
| Vorgeschichte test.241 (`437808a`, `a9319e5`) | Zeitkorrektur Beginn, Ende, Pause im Web | 09-06 (e); 09-04 (c) |

## Funktionsproben (Task 2)

| Probe | Ausgabe | Exit |
|---|---|---|
| `--zitate content/hilfe/gaeb-importieren.md` | `content-pruefen: 1 Datei(en), Prüfungen zitate: 0 Befund(e), 0 Hinweis(e)` | 0 (Plan erwartete 1, siehe Abweichung 1) |
| `--belege content/hilfe/gaeb-importieren.md` | u. a. `Beleg „Preise übernehmen“ → web:src/api/datanormCatalogs.ts, web:src/components/documents/DatanormImportDialog.tsx, web:src/components/stammdaten/BulkPriceAdjustDialog.tsx` (nicht der GAEB-Dialog) | 0 |
| `--zitate --l1 content/hilfe/gaeb-importieren.md` | `content/hilfe/gaeb-importieren.md: L-1 „.x84 und .d83“ (Z. 17)` | 1 |
| `--l1 lib/gewerke.ts` | `0 Befund(e)` (läuft ohne Absturz; Listeneintrag „Bald verfügbar“ korrekt übergangen) | 0 |
| Fixture ohne Ausnahmen | `Zitat „Gibt es nicht im Release 4711“ nicht im Release (Web 6686d05e, Mobile 837aab4f)`; „Buchhaltung → Kasse“ geteilt und belegt; „OK“ nur Hinweis | 1 |
| Fixture mit `--ausnahmen 09-x.md` | Begriff ausgenommen → `0 Befund(e)`; Zeile `- „Ohne Begründung“` → Hinweis „Ausnahme ohne Begründung gilt nicht“; „Positionsvorschau“ unter „Übergabeliste“ zählt nicht | 0 |
| Fixture `--ausnahmen fehlt.md` | Hinweis „Prüfdatei fehlt – keine Zitat-Ausnahmen“, Befund bleibt | 1 |
| Fixture `--antwort` | `„Was fehlt hier?“: keine Antwort direkt darunter` (nur Liste) | 1 |
| Fixture `--l1 daten.ts` | nur `L-1 „Admin-Lizenz“ (Z. 4)`; Kommentar „Onlinezahlung“, Listeneintrag, „Preise netto zzgl. USt.“ übergangen | 1 |
| `--antwort content/blog/*.md content/hilfe/*.md` | 21 Befunde auf 15 Ratgebern, Hilfe 0 – deckungsgleich mit `seo-audit.mjs` (09-01) | 1 |
| unbekannter Schalter | Bedienhinweis | 2 |

Fixtures lagen nur im Scratchpad (nicht committet).

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run tests/pricing-parity.test.ts tests/product-register.test.ts` | 2 Dateien, 21 von 21 grün |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.245 (6686d05e).“ |
| `npm run typecheck`, `npm run lint` | 0 Fehler |
| 09-basis.md-Prüfung aus dem Plan | ok |
| Akzeptanz-Greps: Schalter 14, `altbegriffe` 1, `ts-literale` 2, `product-source-snapshot` 3 | erfüllt |
| Unter Sperre: `npm test` (inkl. pricing-parity) | 40 Dateien, 927 von 928 grün; rot nur `announcements.test.ts` (fremd, bekannt seit 09-01, Paket a / 09-11) |
| Unter Sperre: `npm run build` | grün |

## Task Commits

1. **Aufgabe 1: Produktbasis einfrieren** – `682ba88` `docs(09-15): Produktbasis eingefroren – …`
2. **Aufgabe 2: Prüfwerkzeug** – `af8bf80` `feat(09-15): Prüfwerkzeug content-pruefen.mjs – …`

## Decisions Made

- Register und Preis-Snapshot nicht angefasst: Sie standen schon auf `origin/release` (Abgleiche `82c82e6`, `62f4478` nach 08-13/08-14). `checkedAt` bleibt 2026-10-23 (öffentliches „Stand“-Datum).
- Die eingefrorenen Commits stehen zusätzlich als `basis` in `product-source-snapshot.json`, weil das Prüfskript sie laut Plan dort liest; Hash-Konvention jetzt Git-Blob statt ausgecheckter Datei (reproduzierbar ohne Checkout).
- `--zitate` schließt Testdateien und fremde Sprachordner der App aus: Ein Begriff, der nur in einem Test oder einer anderen Sprache steht, ist kein Bildschirmbeleg.
- Kassenbuch und § 13b bekommen in 09-15 keinen `liveExtras`-Eintrag: Ein beworbener Eintrag ändert die Funktionsübersicht (`lib/funktionsgruppen.ts`, fremder Besitz); Übergabe an 09-09.

## Deviations from Plan

### Abweichungen

**1. [Plan-Annahme widerlegt] `--zitate content/hilfe/gaeb-importieren.md` endet mit Exit 0 statt 1**
- **Befund:** Die fünf Zitate des Artikels („GAEB importieren“, „Hinweise“, „Positionsvorschau“, „Alle auswählen“, „Preise übernehmen“) stehen alle wörtlich im Web-Release. „Preise übernehmen“ steht aber im DATANORM-Import und in der Preisanpassung, nicht im GAEB-Importdialog (Pitfall 2, Substring ohne Kontext). „.x84 und .d83“ ist kein Zitat in „…“, sondern ein L-1-Altbegriff.
- **Umgang:** Keine künstliche Verschärfung. Die L-1-Prüfung meldet „.x84 und .d83“ mit Exit 1 (`--zitate --l1`); der neue Schalter `--belege` zeigt die Fundorte, sodass der falsche Ablauf bei „Preise übernehmen“ in der Prüfdatei auffällt. Die Zitat-Erkennung selbst ist per Fixture mit Exit 1 nachgewiesen.
- **Commit:** `af8bf80`

**2. [Rule 2 – Belegpfade D-11] Zusatzschalter `--belege`**
- Nennt je belegtem Begriff bis zu drei Release-Dateien; ohne den Schalter unverändertes Verhalten.
- **Commit:** `af8bf80`

**3. [Rule 1 – veraltete Doku] `PRODUCT-REGISTER.md`**
- Produktstände standen noch auf test.239/test.93; Entscheidungskorrektur 8 nannte DATANORM v5 als nicht zugesagt (seit 22.10. gestrichen, L-1). Beides berichtigt.
- **Commit:** `682ba88`

**4. Ergänzung Delta-Darstellung**
- Die Zeitkorrektur (Auftrag: „neu seit a9319e5“) kam mit `437808a`/`a9319e5` selbst, liegt also auf der Recherchebasis und nicht im Bereich `a9319e5..origin/release`. Sie steht deshalb als „Vorgeschichte“ in 09-basis.md; im eigentlichen Delta liegt die Sperre abgerechneter Zeiten (test.243). Beide gehen an 09-06.

---

**Total deviations:** 1 widerlegte Plan-Annahme, 2 Auto-Ergänzungen, 1 Präzisierung. **Impact:** keine Regel abgeschwächt, Preise gleich.

## Deferred Issues

- `tests/announcements.test.ts` weiterhin rot (Paket a / 09-11), siehe `deferred-items.md`.
- 21 Antwortregel-Befunde auf 15 Ratgebern (Pakete b/c).
- `liveExtras` für Kassenbuch und § 13b an 09-09.

## Threat Flags

Keine neue Angriffsfläche. T-09-02: Basis nur nach dokumentiertem Delta-Abgleich, kein Fetch, `sync:product:check` grün. T-09-36: Skript liest nur Dateien und Git-Objekte (`execFileSync` ohne Shell, Begriffe als `-e`-Argumente), schreibt nichts; Ausnahmen nur mit Begründung. T-09-SC: keine neuen Pakete (`gray-matter`, `typescript` vorhanden).

## Known Stubs

Keine.

## Next Phase Readiness

- Inhaltspakete (Welle 3) prüfen mit `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate --l1 --antwort <dateien>` gegen `6686d05e`/`837aab4f`.
- 09-12 folgt in diesem Worktree.
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel); kein Merge nach main, kein Push.

## Self-Check: PASSED

Dateien `craftos/docs/content-pruefung/09-basis.md`, `craftos/scripts/content-pruefen.mjs`, `craftos/docs/product-source-snapshot.json` vorhanden; Commits `682ba88`, `af8bf80` im Branch `phase09-spur-basis`.
