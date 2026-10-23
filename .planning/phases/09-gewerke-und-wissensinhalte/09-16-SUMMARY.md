---
phase: 09-gewerke-und-wissensinhalte
plan: 16
subsystem: phasen-gate
tags: [phasen-gate, e2e, axe, cls, reduced-motion, seo-audit, route-audit, live-check, visual-audit, kundenportal, sichtpruefung]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "Integration 09-09 (Strenge, Map, Querverweise, Abdeckungstabelle), Vorlagen 09-11/09-12"
provides:
  - "Phase-9-Browserprüfungen in design-v2.pw.cjs: sieben Routen in sechs Breiten (Darstellung, axe, reduzierte Bewegung, CLS, Fold 360 × 640, Kartenrahmen)"
  - "Kundenportal-Szene zeigt die Unterschriftsseite aus der Angebotsmail (Release a0e27c42), testgesichert"
  - "Kartenrahmen der Funktionskarten höchstens so breit wie die Bühne (Plantafel-Wochenansicht ragte über die Karte)"
  - "Phasen-Gate lokal grün; Ergebnisse und Abdeckungstabelle in 09-integration.md § 7 und § 9"
affects: [09-10]

tech-stack:
  added: []
  patterns:
    - "Serverfenster-Skript im Scratchpad: Sperre, optional Build, next start 3100, Befehle, kill, netstat-Prüfung, Sperre frei"
    - "Szenen-Feldnamen wörtlich gegen den Release (`>${label}</Label>` in QuoteSigning.tsx)"

key-files:
  created:
    - .planning/phases/09-gewerke-und-wissensinhalte/09-16-SUMMARY.md
  modified:
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/tests/funktionsdetails.test.ts
    - craftos/lib/scenes.ts
    - craftos/components/v2/FeatureCard.module.css
    - craftos/docs/content-pruefung/09-integration.md
    - craftos/docs/DESIGN-V2.md
    - .planning/phases/09-gewerke-und-wissensinhalte/deferred-items.md

key-decisions:
  - "Phase 9: Kundenportal-Szene zeigt die Unterschriftsseite (QuoteSigning.tsx, „Angebot AN-2026-018“, Vor- und Nachname, Unterschrift, Kommentar (optional)) statt der Portal-Rechnungsansicht, die keine Mail verlinkt"
  - "Phase 9: Kartenbühne begrenzt die figure auf max(280px, 100%); Rahmen schmaler als die Bühne bleiben unverändert"
  - "Phase 9: Silbentrennung in echtem Safari bleibt Inhaberprüfung; Playwright-WebKit unter Windows hat kein deutsches Trennwörterbuch"

requirements-completed: []

duration: ca. 51 min
completed: 2026-10-23
---

# Phase 9 Plan 16: Phasen-Gate (E2E und volles Gate) Summary

**Phasen-Gate lokal grün: neue Phase-9-Browserprüfungen in sechs Breiten, Kundenportal-Szene auf „Angebot online ansehen und unterschreiben“ umgestellt, überstehender Plantafel-Kartenrahmen behoben – Vitest 1304/1304, seo-audit sitewide 0 Verstöße (156 URLs), E2E 348 bestanden/0 fehlgeschlagen, route-audit 0/0, live-check lokal 62 OK, visual-audit 96 Seiten ohne Befund.**

## Performance

- **Duration:** ca. 51 min
- **Started:** 2026-10-23T04:45Z
- **Completed:** 2026-10-23T05:36Z
- **Tasks:** 2 von 2 plus Orchestrator-Zusatzauftrag (Kundenportal-Szene)
- **Files modified:** 7

## Accomplishments

- **Kundenportal-Szene (Zusatzauftrag):** frontend-design-Leitlinie gelesen (Zurückhaltung: nur Inhalt und Beleg wechseln). `portalScene` belegt jetzt `web:src/pages/QuoteSigning.tsx` mit Titel „Angebot AN-2026-018“ und den Formularfeldern „Vor- und Nachname“ (Petra Bergmann), „Unterschrift“, „Kommentar (optional)“; Kurzform `web:Angebotsunterschrift`. Zwei neue Tests: Kopf- und Kartenszene ohne Rechnungsbezug, Feldnamen wörtlich am Web-Release. Sichtprüfung Chromium/WebKit 360/768/1024/1440: kein Überlauf, Kopf und Karte sauber.
- **Aufgabe 1:** sieben Routen (`/gewerke`, `/gewerke/elektriker`, `/gewerke/allrounder`, `/blog`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen`) in 360/390/768/1024/1280/1440: Querscroll, eine H1 ohne Überlauf, Kopfwort-Span, StepFlow-Ausrichtung, Inhaltsverzeichnis `details`/sticky, Schrittknoten 40 × 40, axe ohne serious/critical, reduzierte Bewegung (FeatureSnippet `data-stage=3`, `data-running=false`, keine Animation), CLS 0, Fold 360 × 640 (Unterkanten 495–556 px).
- **Aufgabe 2:** volles Gate zweimal unter Sperre; nach dem Kartenrahmen-Fix vollständig wiederholt. Ergebnisse, Abdeckungstabelle (34 Zeilen) und manuelle Prüfungen in `docs/content-pruefung/09-integration.md`.

## Task Commits

1. `376c404` test(09-16): Kundenportal-Szene zeigt die Unterschriftsseite (RED)
2. `5ddaca5` fix(09-16): Kundenportal-Szene zeigt Angebot online ansehen und unterschreiben
3. `74d01b2` test(09-16): Browserprüfungen der Phase-9-Vorlagen in sechs Breiten (Aufgabe 1)
4. `bc23839` test(09-16): Kartenrahmen der Funktionskarten bleiben in der Bühne (RED)
5. `3d3be63` fix(09-16): Kartenrahmen höchstens so breit wie die Bühne
6. `96dd651` docs(09-16): Phasen-Gate-Ergebnisse in 09-integration.md und Abdeckungstabelle (Aufgabe 2)

## Prüfergebnisse (zweiter, maßgeblicher Lauf)

| Prüfung | Ergebnis |
|---|---|
| RED Kundenportal | 2 rot (Beleg CustomerInvoice, Feld „Rechnungsdatum“), danach 195/195 in sechs betroffenen Dateien |
| RED Kartenrahmen | `/gewerke/elektriker` und `/gewerke/allrounder` 360 px: Rahmen 26,4 px über der Bühne; danach grün |
| Phase-9-Fälle `design-v2.pw.cjs` | 58 bestanden, 2 übersprungen (Fold nur Desktop), vor und nach dem Fix |
| `npm test` | 43 Dateien, 1304 von 1304 |
| Lint, Typcheck | Exitcode 0 |
| `sync:product:check` | aktuell v4.0.0-test.246 (a0e27c42) |
| `check-no-secrets.mjs app components lib tests scripts docs ../.planning` | OK |
| Build | Exitcode 0 |
| `seo-audit.mjs` ohne Optionen (`MSYS_NO_PATHCONV=1`) | 156 von 156 URLs, 12 Regeln, 0 Verstöße |
| E2E-Auswahl (design-v2, function-illustrations, navigation inkl. home-navigation, browser-functional; 4 Projekte) | 348 bestanden, 0 fehlgeschlagen, 0 flaky, 56 übersprungen; keine Einzelwiederholung nötig |
| `route-audit.mjs` (3100) | 156 Routen, 0 Fehler, 0 defekte Links (159 Links) |
| `live-check.mjs` mit `LIVE_ORIGIN=http://localhost:3100` | 62 OK, 0 FEHLER |
| `visual-audit.mjs` (8 Routen × 6 Breiten × Chromium/WebKit) | 96 Seiten, 0 Status-, Überlauf-, Bild-, JS-, axe-Befunde |
| Anker der Abdeckungstabelle im Build | 34 von 34 |
| Port 3100 / `.heavy-lock` | nach jedem Fenster frei bzw. entfernt |

Screenshots (nur Scratchpad, nicht committet): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/09-16/` – `chromium-*-kundenportal-kopf.png`, `webkit-*-kundenportal-kopf.png`, `karte-*.png` (Plantafel und Kundenportal nach dem Fix), `crop-*.png`, `test-results/visual/*.png` (visual-audit, 96 Seiten).

## Decisions Made

Siehe `key-decisions`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Darstellung] Plantafel-Kartenrahmen ragte über die Funktionskarte**
- **Found during:** Aufgabe 2 (visual-audit-Elementmeldung, Sichtprüfung)
- **Issue:** Die figure in der Kartenbühne nahm die max-content-Breite der Wochenansicht (375 px) an; bei 360 und 1024 px ragte der Rahmen beidseitig 26 px über die Karte (`/funktionen`, Gewerke-Seiten), linker Rand abgeschnitten.
- **Fix:** `max-width: max(280px, 100%)` auf `.stage[data-visual="scene"] > figure`; neuer E2E-Fall „Kartenrahmen ragen über die Bühne“.
- **Files modified:** `craftos/components/v2/FeatureCard.module.css` (zusätzliche Datei außerhalb des Plans, Besitz in dieser Welle beim Gate-Plan), `craftos/tests/e2e/design-v2.pw.cjs`
- **Commits:** `bc23839`, `3d3be63`

**2. [Auftrag] Kundenportal-Szene**
- Zusatzauftrag des Orchestrators; `craftos/lib/scenes.ts` und `craftos/tests/funktionsdetails.test.ts` als zusätzliche Dateien. Commits `376c404`, `5ddaca5`.

**3. [Plan-Abweichung, Auftrag] STATE/ROADMAP**
- Der Plan überlässt sie dem Orchestrator; laut Auftrag hier aktualisiert.

**4. [Hinweis] Aufgabe 1 ohne roten Lauf**
- Die neuen Darstellungsfälle bestanden beim ersten Lauf (Vorlagen aus 09-11/09-12 waren bereits regelkonform); rot wurde erst der nachträglich ergänzte Kartenrahmen-Fall, der den Befund aus der Sichtprüfung festhält.

**Total deviations:** 1 Auto-Fix, 2 Auftragsvermerke, 1 Hinweis. **Impact:** keine Regel abgeschwächt.

## Deferred Issues

- Echte Silbentrennung in Safari: Playwright-WebKit unter Windows trennt ohne Wörterbuch („Materialentnahmeschei|n“ bei 360 px, kein Querscroll); Chromium trennt richtig. Stichprobe auf einem iPhone beim Inhaber (09-integration.md § 8).
- Übrige Punkte unverändert in `deferred-items.md` (ProductDemo, Zusatzkarten Kassenbuch/§ 13b, Lager-KI-Credit, Testkontext-Muster).

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-09-29: `check-no-secrets` grün über alle genannten Verzeichnisse. T-09-30: axe ohne serious/critical in sechs Breiten, CLS 0, reduzierte Bewegung geprüft. T-09-39: Port 3100 vor jedem Start frei, nach jedem `kill` per netstat frei, Sperre sofort freigegeben; keine fremden Prozesse beendet.

## Next Phase Readiness

- Rollout 09-10 kann folgen (Push dort). Kein Push in 09-16.
- `.heavy-lock` entfernt, Port 3100 frei, kein Server und kein Hintergrundprozess aktiv.

## Self-Check: PASSED

- FOUND: craftos/tests/e2e/design-v2.pw.cjs, craftos/lib/scenes.ts, craftos/components/v2/FeatureCard.module.css, craftos/docs/content-pruefung/09-integration.md
- FOUND: 376c404, 5ddaca5, 74d01b2, bc23839, 3d3be63, 96dd651
