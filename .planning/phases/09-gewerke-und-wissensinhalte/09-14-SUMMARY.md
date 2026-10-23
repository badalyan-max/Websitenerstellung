---
phase: 09-gewerke-und-wissensinhalte
plan: 14
subsystem: content-funktionsdetails
tags: [paket-f, verlinkung, sekundaerlink, kachel-href, leitlinie-l1, gaeb, kundenportal, mahnwesen]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-07: zehn neue Hilfeartikel und Verdrahtungstabelle in docs/content-pruefung/09-f.md; 09-15: content-pruefen.mjs --l1, lib/leitlinie-l1.json; 09-06: plantafel-einsatz-planen mit Release-Begriffen"
provides:
  - "Sekundärlink „Anleitung in der Hilfe“ auf kundenportal, mahnwesen, bankabgleich, datenuebernahme (D-21)"
  - "Kachel-hrefs auf angebote, aufmass, gaeb, lager, projektverwaltung, team (Sprachen und neue Projekt-Chat-Kachel, W13)"
  - "/app: Projekt-Chat-Kachel und Sprachen-Textlink auf die Anleitungen"
  - "L-1-konforme Produktdaten in lib/funktionen.ts, lib/funktionsdetails/*.ts, lib/app-content.ts (0 Befunde)"
  - "Kundenportal-Detailseite und Stammtexte nach Release-Stand (nur Angebote und Rechnungen, Online-Unterschrift, Überweisung)"
affects: [09-09, 09-10, 09-16]

tech-stack:
  added: []
  patterns:
    - "L-1-Regressionstest über INHALTE (JSON) und lib/funktionen.ts-Stammtexte mit l1Treffer"
    - "Hilfe-Ziele auf /app-Kacheln werden für die Lizenzprüfung (WR-01) im Test einer Detailseite zugeordnet"

key-files:
  created:
    - .planning/phases/09-gewerke-und-wissensinhalte/09-14-SUMMARY.md
  modified:
    - craftos/lib/funktionsdetails/angebot.ts
    - craftos/lib/funktionsdetails/baustelle.ts
    - craftos/lib/funktionsdetails/buchhaltung.ts
    - craftos/lib/funktionsdetails/planung.ts
    - craftos/lib/funktionsdetails/rechnung.ts
    - craftos/lib/funktionsdetails/team.ts
    - craftos/lib/funktionen.ts
    - craftos/lib/app-content.ts
    - craftos/app/app/page.tsx
    - craftos/tests/funktionsdetails.test.ts
    - craftos/tests/app-seite.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/docs/content-pruefung/09-f.md

key-decisions:
  - "Phase 9: Kundenportal-Pflichtfrage lautet „Was können Kunden im Kundenportal erledigen?“ (Orchestrator-Vorgabe 09-14 statt Planvorschlag „Wie bezahlen …“); die Zahlungsfrage bleibt als zusätzliche FAQ mit „Per Überweisung …“"
  - "Phase 9: Kundenportal-Seite und funktionen.ts nennen keine Termine und Nachrichten mehr, weil der Release nur /portal/quotes/:id und /portal/invoices/:id routet (09-f.md Befund 1)"
  - "Phase 9: DATANORM auf gaeb über href der vorhandenen Kachel „DATANORM-Kataloge“, keine neue Kachel; Projekt-Chat auf team als neue md-Kachel mit Anordnung md·sm·sm·md·sm·sm"
  - "Phase 9: Mahnwesen-Grenze positiv „Auf Wunsch mahnt die Automatik normale Rechnungen nach Ihren Fristen.“ (note = Kachel, Wortregel „automatisch“ nur mit „auf Wunsch“ eingehalten)"

requirements-completed: []

duration: 75min
completed: 2026-10-23
---

# Phase 9 Plan 14: Verdrahtung der neuen Anleitungen und L-1 in den Produktdaten (Paket f, Teil 2) Summary

**Detailseiten und /app verlinken alle zehn neuen Anleitungen (Sekundärlinks, Kachel-hrefs, Projekt-Chat auch auf team); die Produktdaten sind L-1-konform – GAEB positiv mit GAEB DA XML 3.2/3.3, Kundenportal nur mit Release-Inhalten, Mahnwesen positiv, Release-Begriffe für Plantafel und Lizenzen.**

## Performance

- **Duration:** ca. 75 min
- **Started:** 2026-10-23T02:45Z (Startgate: `git merge main` → bereits aktuell `d6b7e2a`)
- **Completed:** 2026-10-23T03:58Z
- **Tasks:** 2 von 2 (je TDD rot → grün)
- **Files modified:** 13

## Accomplishments

- **Aufgabe 1 (`6991e29` rot, `dead493` grün):** Sekundärlink „Anleitung in der Hilfe“ auf kundenportal, mahnwesen, bankabgleich, datenuebernahme; Kachel-hrefs Angebotsunterschrift und „DATANORM 4 und 5“ (angebote), „DATANORM-Kataloge“ (gaeb), Besichtigung (aufmass), „Lager-Scan und Wareneingang“ (lager), „Projekt-Chat und Nachrichten“ (projektverwaltung), Sprachen-Kachel (team, vorher `/app`); neue md-Kachel Projekt-Chat auf team (W13); /app: Projekt-Chat-Kachel auf `/hilfe/projekt-chat-nachrichten`, Textlink „Sprache der Mobile-App einstellen“ unter den Kennzahlen.
- **Aufgabe 2 (`c2c7bc8` rot, `4c3fe10` grün):** GAEB-Note = Grenze-Kachel positiv, GAEB-FAQ ohne Negativliste; Kundenportal-Seite (Lead, Ablauf, Rollen-Satz, Kacheln, FAQ) und funktionen.ts-Stammtexte nach Release; Mahnwesen-Grenze, -Note und -FAQ positiv; plantafel-FAQ mit „Hinweis zur Planung“/„Trotzdem einplanen“; team „Voll-Lizenz (Admin oder Büro)“; `help` für mahnwesen, bankabgleich, datenuebernahme, kundenportal auf die neuen Slugs; 09-f.md abgeschlossen (umgesetzte Verdrahtung, L-1-Tabelle alt → neu, Befund 7, Paketende, Übergabeliste).

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --l1` über die acht lib-Dateien | vorher 6 Befunde, danach 0 Befunde, 0 Hinweise, Exitcode 0 |
| RED Aufgabe 1 (funktionsdetails, app-seite) | 6 rot / 94 grün (erwartet) |
| GREEN Aufgabe 1 (funktionsdetails, app-seite, funktionsgruppen) | 126 von 126 grün |
| RED Aufgabe 2 (funktionsdetails, design-v2-budgets) | 7 rot / 94 grün (erwartet) |
| GREEN Aufgabe 2 (funktionsdetails, app-seite, funktionen-seite, funktionsgruppen, content-produktwahrheit, design-v2-budgets, gewerke, product-register) | 8 Dateien, 228 von 228 grün |
| `tests/content.test.ts` unter `.heavy-lock` (je Aufgabe) | 34 von 34 grün |
| `npm run typecheck`, `npm run lint` (je Aufgabe) | Exitcode 0 |
| Paketende unter Sperre: `npm run build` | Exitcode 0 |
| `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs --paths=<10 Detailseiten>,/app,/funktionen/plantafel` | 12 von 146 URLs, alle 12 Regeln 0 Verstöße |
| Akzeptanz-greps | „nicht unterstützt“ in funktionen.ts/angebot.ts je 0; alte Pflichtfrage im Test 0; „Konflikt erkannt“ in planung.ts 0; „Admin- und Büro-Lizenz“ in team.ts 0; „projekt-chat-nachrichten“ in team.ts, planung.ts, app-content.ts je ≥ 1; Hilfe-Sekundärlinks im Test ≥ 4 |

## Task Commits

1. **Aufgabe 1 RED:** `6991e29` test(09-14): Erwartungen für Hilfe-Verlinkung der neuen Anleitungen (rot)
2. **Aufgabe 1 GREEN:** `dead493` feat(09-14): Detailseiten und /app verlinken die neuen Hilfe-Anleitungen (D-21, W13)
3. **Aufgabe 2 RED:** `c2c7bc8` test(09-14): L-1-Erwartungen für Produktdaten, GAEB-Note, Kundenportal und Mahnwesen (rot)
4. **Aufgabe 2 GREEN:** `4c3fe10` feat(09-14): Produktdaten L-1-konform – GAEB, Kundenportal, Mahnwesen, Plantafel, Lizenzen

## Decisions Made

Siehe `key-decisions`. Verdrahtung und L-1-Korrekturen stehen mit alt → neu und Belegpfaden in `craftos/docs/content-pruefung/09-f.md`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Orchestrator-Vorgabe / Rule 1 – Produktwahrheit] Kundenportal-Seite vollständig auf Release-Stand**
- **Found during:** Aufgabe 2
- **Issue:** Neben der Pflichtfrage nannten Lead, Ablauf, Rollen-Satz, Kacheln, FAQ sowie `benefit` und `intro` in `lib/funktionen.ts` Termine, Nachrichten und „freigegebene Projekte“; am Release sind nur Angebots- und Rechnungsseiten geroutet (09-f.md Befund 1). Inhabervorgabe: nur nennen, was unterstützt wird.
- **Fix:** Texte nach Release-Belegen neu gefasst; Pflichtfrage nach Orchestrator „Was können Kunden im Kundenportal erledigen?“ (Plan nannte „Wie bezahlen …“ – bleibt als eigene FAQ). Nutzensatz in `tests/design-v2-budgets.test.ts` gleichgezogen (Datei nicht im Plan, Rule 3).
- **Commit:** `c2c7bc8`, `4c3fe10`

**2. [Rule 3 – blockierend] Sprachen-Link auf /app braucht Darstellung in `app/app/page.tsx`**
- **Found during:** Aufgabe 1
- **Issue:** `lib/app-content.ts` hat keinen Ort, an dem ein Link zur Sprachen-Aussage gerendert wird.
- **Fix:** `appSections.kennzahlen.link` in app-content.ts und ein Textlink unter den KeyFacts in `app/app/page.tsx`, nach dem Muster des Offline-Textlinks.
- **Commit:** `dead493`

**3. [Rule 3 – Test gleichgezogen] /app-Lizenzprüfung (WR-01) für Hilfe-Ziele**
- **Issue:** `tests/app-seite.test.ts` verlangte für jede Kachel ein `/funktionen/…`-Ziel.
- **Fix:** Hilfe-Ziele werden über eine Zuordnung im Test (`/hilfe/projekt-chat-nachrichten` → projektverwaltung) weiter gegen Plattform und Lizenz der Detailseite geprüft.
- **Commit:** `6991e29`

**4. [Plan-Abweichung, begründet] team-Anordnung und Grenze-Kachel**
- Für die W13-Kachel Projekt-Chat wechselt team von `md·sm·sm·wide·wide` zu `md·sm·sm·md·sm·sm`; die Grenze-Kachel wird sm und ihr Text gekürzt („Die Lizenz bestimmt Zugang und Preis, die Rolle die Rechte des Mitglieds.“). „Rollen und Sitze vergibt nur der Inhaber“ steht weiter im Admin-Zusatz und in der FAQ.

**5. [Plan-Abweichung, begründet] DATANORM auf gaeb ohne neue Kachel**
- Vorhandene Kachel „DATANORM-Kataloge“ erhält das href; Anordnung unverändert. Besichtigung auf aufmass und Projekt-Chat auf projektverwaltung (statt baudokumentation bzw. nur team) wie in 09-RESEARCH bestätigt.

**6. [Zusatz] seo-audit zusätzlich über /funktionen/plantafel** (geänderte FAQ), 12 statt 11 Pfade.

---

**Total deviations:** 6 (1 Produktwahrheit nach Orchestrator-Vorgabe, 2 blockierend gelöst, 3 begründete Plan-Abweichungen). **Impact:** keine Regel abgeschwächt; Wortregeln, Budgets und Builder-Mengen eingehalten.

## Geteilte Dateien

- Geändert außerhalb der Plan-Dateiliste: `craftos/app/app/page.tsx` (Textlink), `craftos/tests/design-v2-budgets.test.ts` (Nutzensatz kundenportal).
- Nicht angefasst: `lib/seiten/craft-ai.ts`, `lib/seiten/fakten.ts`, Keyword-Map, Demo-/Snippet-Szenen (Hotfix-Agent Craft AI); `lib/gewerke.ts`, `docs/seo/keyword-map.json`, `lib/product-register.ts`, `docs/PRODUCT-REGISTER.md`, `tests/content-produktwahrheit.test.ts`. Die Funktionsdetails nennen keinen Betriebsdaten-Chat.
- Kein Server gestartet; Port 3107 frei, `.heavy-lock` freigegeben.

## Issues Encountered

- Befund 7 (09-f.md): Am Release erzeugt keine E-Mail einen Link auf die Portal-Belegseiten; Angebots-Mails tragen den Unterschriftslink (öffentliche Signaturseite), Rechnungs-Mails das PDF. Die Website folgt der Orchestrator-Formulierung und nennt nur, was die gerouteten Portalseiten können. Hinweis an Orchestrator und Web-Produkt.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche: nur interne Links auf vorhandene Hilfeartikel (T-09-22: Test „jeder Hilfe-Link hat einen Artikel“, Sitemap-Prüfung, `pruefeKachelLink`) und Produkttexte aus Release-Belegen (T-09-38: GAEB-Note = Grenze, Pflichtfrage positiv, L-1-Prüfung).

## Next Phase Readiness

- 09-09: Übergabeliste in 09-f.md – Kundenportal-Termine/Nachrichten in `lib/gewerke.ts`, Keyword-Map-Descriptions, Produktregister-Doku und -Belegen; `TS_DATEIEN` in content-produktwahrheit erweitern; Kassenbuch-Map-Eintrag, `draft: false` und Verdrahtung auf buchhaltung (aus 09-07).
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel); kein Merge, kein Push.

## Self-Check: PASSED

Alle 13 geänderten Dateien vorhanden; Commits 6991e29, dead493, c2c7bc8, 4c3fe10 im Branch phase09-spur-f.
