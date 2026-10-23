---
phase: 10-abschlussaudit
plan: 12
subsystem: qa
tags: [phasen-gate, vollsuite, e2e, a11y-matrix, lighthouse-endmessung, visual-audit, route-audit]

requires:
  - phase: 10-06
    provides: "integrierter Stand aller Spuren, PHASE-10-PRUEFUNGEN.md § 1–4"
  - phase: 10-REVIEW-FIX
    provides: "HI-01 (Laufkennung/Gesamtlauf im A11y-Merge), ME-01 (Lighthouse-Exitcodes, Performance nur Warnung)"
provides:
  - "PHASE-10-PRUEFUNGEN.md § 5 Phasen-Gate mit Zahlen je Prüfung (5.1 Suiten, 5.2 A11y-Matrix, 5.3 Lighthouse)"
  - "Rechtsseite /agb ohne Vorlagenhinweis, Absatz „Stand: 23. Oktober 2026“ (Inhaberfreigabe, LO-06 behoben)"
  - "a11y-audit --merge akzeptiert reguläre Gesamtläufe wieder (gezielt nur noch am Kennzeichen)"
affects: [10-07]

tech-stack:
  added: []
  patterns:
    - "Gesamtlauf-Prüfung an ausdrücklichem Kennzeichen (gezielt === false) statt an abgeleiteten Zählern"

key-files:
  created:
    - .planning/phases/10-abschlussaudit/10-12-SUMMARY.md
  modified:
    - craftos/docs/releases/PHASE-10-PRUEFUNGEN.md
    - craftos/app/agb/page.tsx
    - craftos/tests/fixtures/rechtstexte/agb.txt
    - craftos/scripts/lib/a11y-audit-core.mjs
    - craftos/tests/a11y-audit-core.test.ts
    - .planning/phases/10-abschlussaudit/10-REVIEW-FIX.md

key-decisions:
  - "Vorlagenhinweis /agb durch „Stand: 23. Oktober 2026“ ersetzt (Inhaberfreigabe über den Orchestrator); /impressum hat keinen gleichartigen Hinweis, LegalHinweis bleibt dort in Gebrauch und wird nicht gelöscht"
  - "Block 3 auf einem Neubau nach dem Rechtsfix statt auf dem Build aus Block 2, damit route-/visual-audit und live-check den freigegebenen Stand prüfen"
  - "pruefeGesamtlauf(): gezielt nur noch über das Kennzeichen; fehlendes Kennzeichen gilt als gezielt (strenger als vorher)"
  - "Performance-Abweichung (Labordaten) nach D-44 nur berichtet, keine sichtbare Änderung, kein Checkpoint"

patterns-established: []

requirements-completed: []

duration: 72min
completed: 2026-10-23
---

# Phase 10 Plan 12: Phasen-Gate Summary

**Phasen-Gate lokal grün: Vitest 1699/1699, E2E 467/0, seo-/route-/visual-audit ohne Befund, live-check 77 OK. Die A11y-Matrix besteht mit 158 Seiten, 890 Aufrufen und überall 0. Lighthouse B1–B3 enden mit Exit 0 und Accessibility 100 auf allen 16 Seiten; dazu kommen 11 nicht blockierende Performance-Warnungen (Lab-LCP 2,8–3,5 s). /agb trägt jetzt „Stand: 23. Oktober 2026“ statt des Vorlagenhinweises.**

## Performance

- **Dauer:** rund 72 min (15:00–16:12 UTC)
- **Aufgaben:** 2/2 plus Zusatzauftrag Rechtsseiten
- **Geänderte Dateien:** 7 (ohne SUMMARY)

## Startgate und Review-Prüfung

- `10-06-SUMMARY.md` und `10-REVIEW.md` sind vorhanden, `craftos/` war sauber und Port 3100 frei.
- Die Review-Prüfung fand 6 IDs (HI-01, ME-01 bis ME-05). Alle stehen in `10-REVIEW-FIX.md` als „behoben“ mit Commit; das Startgate ist bestanden.
- Koordinationsstatus gelesen: Für die Website gibt es kein Rezept, deshalb lief alles lokal, einzeln und unter `.heavy-lock`.

## Zahlen je Prüfung

| Prüfung | Ergebnis |
|---|---|
| Vitest voll (Block 1 und erneut in Block 3) | 59 Dateien, 1699/1699 |
| `tsc --noEmit` | 0 Fehler |
| ESLint (Block 1, nach Block 3, am Ende) | 0 Probleme |
| `sync:product:check` | aktuell, v4.0.0-test.249 |
| `check-no-secrets` | keine Schlüssel |
| `next build` | grün (Block 2, Block 3 Neubau, Aufgabe 2) |
| `seo-audit.mjs` sitewide | 156/156 URLs, 12 Regeln, 0 Verstöße |
| E2E (ein voller Lauf, 15,7 min) | 467 bestanden, 0 fehlgeschlagen, 0 flaky, 161 übersprungen |
| – chromium-1440 / chromium-390-touch | 152/0/5 bzw. 84/0/73 (bestanden/fehlgeschlagen/übersprungen) |
| – webkit-1440 / webkit-390-touch | 148/0/9 bzw. 83/0/74 |
| `route-audit.mjs` | 156 Routen, 0 Fehler, 0 defekte Links (159 Links, 14 Assets, 6 OG) |
| `visual-audit.mjs` | 290 Aufnahmen, 0 Status, 0 Überlauf, 0 JS-Fehler, 0 A11y |
| `live-check.mjs` lokal | 77 OK, 0 FEHLER |
| A11y-Matrix (5 Teile + Merge) | 158 Seiten, 890 Aufrufe (Chromium 790, WebKit 100), 110 Animationsprüfungen auf 22 Snippet-Seiten; Gate 0, Großtext 0, Tastatur 0, Status 0, keine Regel mit Befund; 4594 unvollständige Kontrastknoten (Sichtprüfung ohne Befund) |
| Lighthouse B1 Gate | Exit 0, Accessibility 100 auf 6/6, 11 Performance-Warnungen |
| Lighthouse B2 Info | Exit 0, Accessibility 100 auf 4/4, 0 Warnungen |
| Lighthouse B3 A11y (inkl. `/impressum`) | Exit 0, Accessibility 100 auf 6/6 (`/impressum` vorher 96) |
| Bestandsmodus | Exit 0, CLS 0 auf allen 21 Routen und allen acht Snippet-Seiten |

Die Einzelwerte je URL (Score, LCP, FCP, SI, TBT, CLS, LCP-Element, A11y/BP/SEO) stehen in `craftos/docs/releases/PHASE-10-PRUEFUNGEN.md` § 5.3.

## Lighthouse-Endwerte und Performance-Abweichung (D-44, nicht blockierend)

| Gate-Seite | Score | Median-LCP (ms) | LCP-Element |
|---|---|---|---|
| `/` | 93 | 3.014 | `h1#startseite-titel` |
| `/funktionen` | 94 | 2.983 | `h1#funktionen-titel` |
| `/funktionen/angebote` | 90 | 3.467 | `h1#funktion-titel` |
| `/gewerke/shk` | 93 | 3.152 | `p#antwort` |
| `/vergleich/handwerkersoftware-kleine-betriebe` | 95 | 2.830 | `p#antwort` |
| `/blog/handwerkerrechnung-schreiben` | 94 | 2.997 | `h1#artikel-titel` |

Die Werte sind Labordaten (mobil, lokal, Median aus 3 Läufen).

- **Abweichung:** Alle sechs Seiten verfehlen LCP < 2.500 ms. Fünf liegen innerhalb von ±150 ms des Endstands aus 10-09. `/funktionen/angebote` liegt 434 ms höher (FCP 1.808 ms); die Ursache ist nicht untersucht, weil der Wert nach D-44 nicht blockiert.
- **Geprüfte Hebel aus 10-09:** Schrifthebel übernommen, `inlineCss` verworfen, kein JavaScript-Hebel.
- **Inhaberfrage zu sichtbaren Optionen** (UI-SPEC § 7.2, nichts umgesetzt):
  - (a) `font-display: optional`
  - (b) General 600 nicht mehr laden
  - (c) Systemschrift für die H1
  - (d) Skripte verzögern oder entfernen
- **QA-04:** wird in 10-07 an den Vercel-Felddaten bewertet (Stand 23.10.: n = 41, LCP p75 620 ms). In 10-12 gab es keine Vercel-Abrufe.

## Task Commits

1. **Zusatzauftrag Rechtsseiten:** `19dd8ed` fix(recht): Vorlagenhinweis durch Stand ersetzt (Inhaber); `e4a3a70` und `5a5bf49` LO-06 in 10-REVIEW-FIX.md auf „behoben 19dd8ed“
2. **Aufgabe 1 – Prüfsuiten:** `d5b3494` test(10-12): Phasen-Gate Prüfsuiten
3. **Korrektur Merge:** `5670097` fix(10-12): a11y-audit --merge erkennt gezielte Läufe am Kennzeichen statt an der Pfadzahl
4. **Aufgabe 2 – Matrix und Lighthouse:** `a6c03c4` test(10-12): A11y-Matrix und Lighthouse-Endmessung

## Deviations from Plan

### Zusatzauftrag des Orchestrators (Inhaberfreigabe 23.10.2026)

**Vorlagenhinweis auf den Rechtsseiten** – außerhalb von `<files>`, auf Anweisung umgesetzt:
- **Datei:** `craftos/app/agb/page.tsx`. Der `LegalHinweis` „Diese AGB sind eine Vorlage …“ ist durch `<p>Stand: 23. Oktober 2026</p>` ersetzt. Die nicht mehr genutzten Importe `LegalHinweis` und `site` sind entfernt; sonst hat sich kein Wort geändert.
- **Referenz:** `tests/fixtures/rechtstexte/agb.txt` wurde bewusst neu erzeugt, mit einem einmaligen Erzeuger auf Basis der exportierten Hilfsfunktionen aus `tests/rechtstexte-wortlaut.test.ts`. Der Erzeuger ist wieder entfernt. Der Diff umfasst genau eine Zeile.
- **Test:** Der Wortlaut-Test war vor der Neuerzeugung rot (Abweichung nur in der letzten Zeile) und ist danach grün (11/11).
- **`/impressum`:** Dort steht kein gleichartiger Hinweis („Einzelunternehmer · CraftOS“ ist eine Angabe). **`LegalHinweis` wird im Impressum weiter genutzt** und bleibt bestehen.
- **Nachprüfung für `/agb` und `/impressum` auf dem neuen Stand:**
  - Wortlaut-Test grün
  - `a11y-audit --paths=/agb,/impressum` mit 20 Aufrufen, alle Zähler 0
  - `a11y.pw.cjs` „Rechtsseite“: 2 bestanden
  - live-check 77 OK
  - volle Matrix 0 und Lighthouse Accessibility 100 auf beiden Seiten
- **Commits:** `19dd8ed`; in `10-REVIEW-FIX.md` ist LO-06 jetzt „behoben 19dd8ed“ (`e4a3a70`, `5a5bf49`).

### Auto-fixed Issues

**1. [Rule 1 - Bug] `a11y-audit --merge` lehnte jeden regulären Gesamtlauf ab**
- **Gefunden in:** Aufgabe 2, erster Merge (Exit 3, „Teilbericht aus einem gezielten Lauf“).
- **Ursache:** Der HI-01-Fix in `pruefeGesamtlauf()` wertete `optionen.pfade > 0` als gezielten Lauf. `parseOptionen` füllt `pfade` aber auch ohne `--paths` mit allen 158 Sitemap-Pfaden. Die Testattrappe nutzte unrealistisch `pfade: 0`.
- **Fix:** Maßgeblich ist nur noch `gezielt === false`; ein fehlendes Kennzeichen gilt als gezielt. Dazu kommen zwei neue Vitest-Fälle: ein regulärer Lauf mit `pfade: 158` und ein Bericht ohne Kennzeichen. Beide waren vorher rot und sind jetzt grün (42/42).
- **Dateien:** `craftos/scripts/lib/a11y-audit-core.mjs`, `craftos/tests/a11y-audit-core.test.ts` (außerhalb von `<files>`, Ursachenbehebung im Gate)
- **Commit:** `5670097`. Der Merge über dieselben fünf Teilberichte ergab danach Exit 0.

### Ablaufanpassung

- **Block 3:** Er lief auf einem Neubau mit anschließender voller Vitest-Suite, weil der Rechtsfix nach dem Build aus Block 2 kam. Ergänzt wurden die gezielte `a11y.pw.cjs`-Prüfung „Rechtsseite“ und `a11y-audit --paths=/agb,/impressum`.
- **E2E:** Der volle Lauf (Block 2) prüfte noch den Stand vor dem Rechtsfix. Für `/agb` gibt es keinen eigenen E2E-Fall; `/agb` ist durch Matrix, visual-audit, route-audit und Lighthouse auf dem neuen Stand abgedeckt.
- **Mega-Menü-Messung:** `scratchpad/10-06/screens.cjs` lief während Matrix-Teil 1 auf demselben Server (wiederverwendetes Skript aus 10-06).

## Screenshots

- **visual-audit:** 290 Aufnahmen unter `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-12/visual/`, Ausschnitte unter `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-12/`.
- **Menü:** `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-12/menue/`
- **Selbst angesehen, ohne Befund:**
  - AGB (Ende mit Stand), Impressum, Support, Rechner, 404
  - `/gewerke/elektriker` (360), Hilfekategorie Einrichtung
  - `/preise` bei 360 px, `/funktionen`-Karten
  - Mega-Menü 1440 und Drawer 390
- **Mega-Menü:** Es scrollt bei 900 px Viewport weiterhin intern (Bestand, Inhaberpunkt § 4.2).

## Issues Encountered

- **Fremde Prozesse:** Zwei Chrome-Renderer mit Startzeit in meinem Zeitraum gehören zum Playwright-MCP-Browser einer anderen Sitzung (Elternprozess 15:34 Ortszeit, Profil `ms-playwright-mcp`). Sie sind nicht aus meinen Läufen und bleiben unberührt.

## Offene Punkte

- **Labor-Performance:** Siehe oben (nicht blockierend). `/funktionen/angebote` ist Kandidat für eine Regressionsprüfung an den Felddaten in 10-07.
- **Inhaberpunkte aus § 4.2 unverändert:**
  - Altklassen-Freigabe
  - „§ 5 DDG“
  - „Server in der EU“
  - Mega-Menü-Höhe
- **Review:** IN-02 und IN-03 bleiben nicht anwendbar.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche; Änderungen betreffen Rechtsseitentext (freigegeben), Prüfwerkzeug und Dokumentation.

## Next Phase Readiness

- Die ROADMAP-Kriterien 1 und 2 der Phase 10 sind lokal erfüllt; die Performance-Abweichung bei den Labordaten ist dokumentiert und blockiert nach D-44 nicht. 10-07 (Rollout) kann folgen.
- Kein Server, keine Sperre und kein eigener Browser laufen mehr.

## Self-Check: PASSED
