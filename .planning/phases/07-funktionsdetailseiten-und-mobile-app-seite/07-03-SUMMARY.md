---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 03
subsystem: szenen
tags: [szenen, media-01, miniui, cardscenes, funktionsuebersicht]
requires:
  - phase: 07-01
    provides: MiniStatusName mit 22 Namen und MINI_STATUS_BELEGE, Budgets
  - phase: 07-02
    provides: 22 Detailfunktionen, Registerbelege der sechs neuen Funktionen
provides:
  - lib/scenes.ts mit 22 neuen Szenen (19 Kopf-Szenen, 3 App-Kachel-Szenen), allScenes = 28
  - Typ KopfVisual (browser | phone | pair) und kopfVisuals für alle 22 Slugs
  - cardScenes aus kopfVisuals abgeleitet (Paar → Browser-Szene), 22 Slugs, Typ FrameVisual
  - Registerbelege für EInvoiceDownloadDialog, roles.ts, ProjectControllingTab, ProjectsScreen, ConstructionReportsScreen
  - /funktionen zeigt auf allen 22 Detailkarten eine Szene im Rahmen (keine Icon-Karte mehr)
affects: [07-04, 07-05, 07-06, 07-07, 07-09]
tech-stack:
  added: []
  patterns:
    - "Karten-Szene ist eine Ableitung des Kopf-Visuals; kein zweiter Katalog"
    - "Labelprüfung (A3) per Skript gegen git show am gepinnten productBasis-Commit, nur lesend"
key-files:
  created: []
  modified:
    - craftos/lib/scenes.ts
    - craftos/lib/product-register.ts
    - craftos/tests/design-v2-frames.test.ts
    - craftos/tests/styleguide.test.ts
    - craftos/tests/funktionen-seite.test.ts
    - craftos/tests/product-register.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
key-decisions:
  - "cardScenes bleibt Record<string, FrameVisual> (kind + scene) statt FrameScene, weil die Karte die Rahmenart braucht; card.scene ist exakt die Kopf-Szene bzw. bei Paar die Browser-Szene"
  - "Kundenportal-Szene zeigt die Rechnungsansicht des Portals (web:src/pages/portal/CustomerInvoice.tsx, Titel „Rechnungsdetails“), weil die Startansicht CustomerPortalHome am Release keine Belegliste hat"
  - "Belegscan nutzt den Release-Feldnamen „Nettobetrag (€)“ des Scan-Formulars statt „Nettobetrag“"
  - "maengelScene und maengelStatusScene teilen bewusst Bildschirm und Titel (app:Mängel); der Eindeutigkeitstest lässt genau dieses Paar zu"
requirements-completed: []
duration: 55min
completed: 2026-10-21
---

# Phase 7 Plan 03: Szenenkatalog (MEDIA-01) Summary

**Alle 22 Detailfunktionen haben jetzt eine am Release belegte Kopf-Szene in `kopfVisuals` (Browser, Phone oder Paar). `cardScenes` wird daraus abgeleitet, sodass `/funktionen` auf allen 22 Karten eine vereinfachte Produktoberfläche statt eines Icons zeigt. Dazu kommen die drei Phone-Szenen für die `/app`-Kacheln (Urlaub, Abnahme, Lager).**

## Performance

- **Dauer:** ca. 55 min (inklusive zwei E2E-Läufen von je 4,7 min)
- **Tasks:** 2/2
- **Geänderte Dateien:** 7 (0 neu)

## Ergebnisse

### Task 1: Szenenkatalog, kopfVisuals, cardScenes, Registerbelege
- **Neue Szenen:** 19 Kopf-Szenen laut 07-UI-SPEC (`dashboardScene`, `projekteScene`, `angebotScene`, `eRechnungScene`, `buchhaltungScene`, `belegScene`, `lagerScene`, `bautagesberichteScene`, `arbeitsschritteScene`, `mitarbeiterScene`, `kalkulationScene`, `portalScene`, `gaebScene`, `mahnwesenScene`, `projektplanScene`, `arbeitsabschnitteScene`, `bankScene`, `importScene`, `maengelStatusScene`) und 3 App-Kachel-Szenen (`urlaubScene`, `abnahmeScene`, `lagerAppScene`). `allScenes` enthält 28 Einträge. `maengelScene` ist unverändert, was ein Test als Literal absichert.
- **Kopf-Visuals:** `kopfVisuals` deckt alle 22 Slugs ab. Plantafel ist ein Paar (Plantafel und Einsätze), die Beschreibung stammt aus dem Bestand der Startseite. Terminplanung ist ein Paar (Projektplan und Arbeitsabschnitte) mit der Beschreibung aus dem Plan.
- **cardScenes:** Wird mit `Object.fromEntries` aus `kopfVisuals` abgeleitet und nicht separat gepflegt.
- **Labelprüfung (A3):** Ein Skript prüft gegen den gepinnten Commit (Web 535206b, Mobile 5610a06), der identisch mit `origin/release` ist. Alle Titel, Feld- und Spaltennamen wurden wörtlich gefunden, darunter „Fällig am“, „Einnahmen (netto)“, „Gesamtkosten“, „Marge“, „Budgetverbrauch“, „XRechnung“, „ZUGFeRD“, „XML (UBL 2.1)“, „PDF/A-3 (hybrid)“, „Zeitraum“, „Prüfung“, „Festschreiben“, „Übergabe“, „SKR03“, „Zahlungserinnerung“, „1. Mahnung“, „2. Mahnung“, „Mahngebühr“, „Positionsvorschau“, „Projektplan“, „Bankumsätze“, „Daten übernehmen“, „Kunden/Projekte/Stammdaten importieren“, „Lieferant“, „Rechnungsdatum“, „Arbeitsschritte“, „erledigt“, „Arbeitsabschnitte“, „Meine Urlaubsanträge“, „Abnahmeprotokolle“, „Teilabnahme“, „Werkzeuge“ und die Rollen aus `roles.ts`. Nicht am Release stehen nur fiktive Beispieldaten (z. B. Lagerort „Hauptlager“ sowie die Abschnittsnamen „Rohinstallation“, „Abdichtung“ und „Fliesenarbeiten“).
- **Ersetzungen (A3):**
  1. **Kundenportal:** Die Startansicht `CustomerPortalHome.tsx` enthält nur „Ihre Unterlagen“ und einen Hinweistext. Es gibt dort keine Belegliste, und „Angebot …“ bzw. „Rechnung …“ als Zeilen kommen nicht vor; der Release-Test `CustomerPortal.release.test.tsx` schließt Links auf Angebote und Rechnungen sogar aus. Die Szene zeigt deshalb die Portal-Rechnungsansicht `web:src/pages/portal/CustomerInvoice.tsx` (bereits im Register) mit dem Titel „Rechnungsdetails“ und den Zeilen Rechnungsdatum, Fällig am, MwSt.-Satz und Zahlungsstatus (Offen). Die Kurzform `web:Kundenportal` bleibt.
  2. **Belegscan:** Das Scan-Formular (`ExpenseFields`, `de/invoices.json` `fields.netAmount`) heißt am Release „Nettobetrag (€)“. Die Szene übernimmt diesen Feldnamen und zeigt den Wert „184,20“ ohne Eurozeichen.
- **Register:** Neu eingetragen sind `evidence["e-rechnung"]` mit `EInvoiceDownloadDialog.tsx`, `evidence.team` mit `src/lib/subscription/roles.ts`, `evidence.nachkalkulation` mit `ProjectControllingTab.tsx`, `mobileEvidence.projektverwaltung` mit `ProjectsScreen.tsx` und `mobileEvidence.baudokumentation` mit `ConstructionReportsScreen.tsx`. Jeder Pfad wurde vorher per `git cat-file -e` an `origin/release` und am productBasis-Commit geprüft. AcceptanceProtocolsScreen, VacationTab und InventoryScreen standen bereits im Register.
- **Tests (design-v2-frames):**
  - 28 Szenen mit passender Kurzform
  - Eindeutigkeit: einzige Doppelung ist `app:Mängel|Mängel`, alle Beschreibungen sind verschieden
  - Budgets: Titel und Zeilen ≤ 24, ≤ 5 Zeilen, `day + span ≤ 5`, Beschreibung ≤ 140 Zeichen und genau 1 Satz
  - Statusnamen ausschließlich aus `MINI_STATUS_BELEGE`
  - Phone-Szenen mit `activeTab`, Browser-Szenen ohne
  - Jede Szene rendert über `Frame` und gibt nur die Kurzform aus
  - kopfVisuals: 22 Schlüssel, Paarregeln eingehalten
  - cardScenes: Ableitung für alle 22 Slugs bestätigt
  - Die App-Kachel-Szenen stehen in `allScenes`
- **Tests (styleguide):** Jeder volle Beleg in `allScenes` steht im Register; außerdem gilt „Bauphase“ in Szenen = 0.

### Task 2: Funktionsübersicht
- `funktionen-seite.test.ts` prüft jetzt für alle 22 Detailkarten `data-visual="scene"`. Ein neuer Fall verlangt je Karte genau eine `figure` mit der Kurzform aus `cardScenes`, der passenden Rahmenart und der Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“; `data-visual="icon"` kommt im HTML nicht mehr vor.
- `app/funktionen/page.tsx` brauchte keine Änderung, weil die Seite `cardScenes[slug]` schon nutzt.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED Task 1 | 6 rote Fälle in 2 Dateien (allScenes 6 statt 28, kopfVisuals fehlt, cardScenes 5) |
| Task-1-Vitest (frames, styleguide, product-register, components, home) | 101/101 grün; der Release-Belegtest lief und wurde nicht übersprungen |
| `npx vitest run tests/funktionen-seite.test.ts` | 10/10 grün |
| `npm test` (voll) | 26 Dateien, 361/361 grün |
| `npm run typecheck`, `npm run lint` | grün |
| `npm run build` | grün, 139 statische Seiten, keine Warnungen |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | 1. Lauf: 256 passed, 4 failed (E2E erwartete 5 Rahmen; behoben). 2. Lauf: **260 passed, 0 failed**, 52 skipped (Projekt-Skips), 4,7 min |
| Visuelles Audit `/funktionen` (Chromium und WebKit, 360/390/768/1024/1440) | statusErrors 0, overflow 0, jsErrors 0, a11y 0 |
| Port 3100 | vorher frei; Server per eigener PID beendet; danach frei |
| Akzeptanz-Greps | `export const kopfVisuals` 1, `export type KopfVisual` 1, Kurzform mit Leerzeichen 0, „Bauphase“ in scenes.ts 0; `git status --porcelain` ohne PNG |

Koordination: Der Status wurde vor den schweren Läufen gelesen (edgar bereit, edgarspc offline/veraltet). Für das Website-Repo gibt es kein Rezept (Lücke: `website-unit`, `website-build`, `website-e2e`). Deshalb liefen Build und E2E lokal nacheinander, jeweils nur ein schwerer Prozess.

## Sichtprüfung /funktionen

Screenshots (nicht committet), ganzseitig:
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/chromium-360-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/chromium-390-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/chromium-768-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/chromium-1024-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/chromium-1440-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/webkit-360-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/webkit-390-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/webkit-768-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/webkit-1024-funktionen.png
- C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/webkit-1440-funktionen.png
- Ausschnitte zum Sichten: C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-03/slices/

Befunde:
- **In Ordnung:** Karten innerhalb einer Zeile sind gleich hoch (1440 drei Spalten, 768/1024 zwei, 360/390 eine). Rahmen und Kennzeichnungsleiste sind vollständig sichtbar, und es gibt keinen horizontalen Überlauf.
- **Hinweis, nicht behoben (Bestandsverhalten):** Der Browser-Bildschirm hat ein festes Format von 16:10 mit `overflow: hidden`. In den kleinen Karten sind deshalb nur etwa drei einzeilige oder zwei zweizeilige Zeilen sichtbar. Bei vier Zeilen ist die letzte unten angeschnitten oder ausgeblendet: Angebot, Kundenportal (Zahlungsstatus nicht sichtbar), Buchhaltung, Kalkulation, Mahnwesen, Mitarbeiter und Lager. Das galt in Phase 6 schon für `rechnungenScene` (zwei von drei Zeilen sichtbar). Eine Kürzung der Szenen würde auch das Kopf-Visual (07-04, größerer Rahmen mit Platz für 4–5 Zeilen) ausdünnen, weil `cardScenes` bewusst aus `kopfVisuals` abgeleitet ist. Empfehlung für 07-04: die Kopf-Darstellung zuerst sichten und danach bei Bedarf die wichtigste Zeile nach oben stellen.
- **Hinweis, nicht behoben (Bestandsverhalten):** Im 160-px-Phone werden lange Primärtexte neben Statuspillen mit Auslassungspunkten gekürzt, z. B. „Fliese g…“, „Praxis …“ oder „20.10.2…“. Dasselbe gilt für das Wochenraster mit 1-Tages-Einträgen („Abdicht…“, im Bestand „Aufmaß We…“). Das entspricht dem Verhalten von `zeitenScene`/`plantafelScene` aus Phase 5/6, und das Audit meldet keinen Überlauf.

## Task Commits

1. `cf1c618` test(07-03): add failing tests for kopfVisuals, derived cardScenes and scene evidence
2. `9313ae1` feat(07-03): scene catalog with kopfVisuals for 22 functions and derived cardScenes
3. `b37ee14` test(07-03): overview shows 22 scene cards, e2e frame count 22

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Produktwahrheit] Kundenportal-Szene ohne Belegliste am Release**
- **Found during:** Task 1 (Labelprüfung A3)
- **Issue:** Die Szene aus 07-UI-SPEC (Titel „Ihre Unterlagen“ mit einer Liste von Angeboten und Rechnungen) hätte eine Liste gezeigt, die es in der Portal-Startansicht am Release nicht gibt.
- **Fix:** Die Szene nutzt jetzt die belegte Rechnungsansicht des Portals mit deren Feldnamen (siehe Ersetzungen).
- **Files modified:** craftos/lib/scenes.ts
- **Commit:** 9313ae1

**2. [Rule 3 – Blocking] Release-Belegtest überschritt unter Volllast 5 s**
- **Found during:** Task 2 (`npm test` voll)
- **Issue:** `product-register.test.ts` „Belege existieren am Release-Commit“ startet einen git-Aufruf je Beleg. Mit den fünf neuen Belegen brauchte der Test in der parallelen Suite mehr als 5 s; einzeln lief er in 4,1 s.
- **Fix:** Zeitlimit für diesen einen Fall auf 30 s gesetzt; die Prüfung selbst ist unverändert.
- **Files modified:** craftos/tests/product-register.test.ts
- **Commit:** b37ee14

**3. [Rule 1 – Testanpassung] E2E erwartete 5 Rahmen auf /funktionen**
- **Found during:** Task 2 (1. E2E-Lauf, 4 Projekte rot)
- **Fix:** `home-navigation.pw.cjs` erwartet jetzt 22 Rahmen mit Kennzeichnung und 0 Icon-Visuals. Die Datei stand nicht in `files_modified`, die Prüfung ist dieselbe, nur auf das neue Zielbild festgelegt.
- **Commit:** b37ee14

### Präzisierungen

- **Typ von cardScenes:** Der Plan nennt `Record<string, FrameScene>`. Umgesetzt ist `Readonly<Partial<Record<string, FrameVisual>>>`, also `{ kind, scene }`, weil `app/funktionen/page.tsx` und `Frame` die Rahmenart brauchen. `cardScenes[slug].scene` ist exakt die Kopf-Szene bzw. die Browser-Szene des Paars; der Test prüft das per Identität (`toBe`). Für 07-04 (`verwandt.scene`) reicht `cardScenes[slug]!.scene`.
- **Eindeutigkeit in allScenes:** Die Plan-Regel „keine doppelten screen+title“ kollidiert mit der Vorgabe, dass `maengelStatusScene` dieselbe App-Ansicht „Mängel“ zeigt wie `maengelScene`. Der Test lässt genau dieses eine Paar zu und verlangt sonst Eindeutigkeit (Objekt, Bildschirm+Titel, Beschreibung).
- **Design-Kaskade:** Dieser Plan enthält keine neue Komponente und keinen `ui-ux-pro-max`-Auftrag. Es gibt keine Stiländerung; die Sichtprüfung lief laut Plan über `scripts/visual-audit.mjs`.

## TDD Gate Compliance

Task 1: RED-Commit `cf1c618` (6 Fehlschläge), GREEN-Commit `9313ae1`. Ein Refactor war nicht nötig.

## Known Stubs

Keine. `kopfVisuals` wird erst ab 07-04 im FunktionsKopf gerendert; das war so geplant.

## Threat Flags

Keine neue Angriffsfläche. T-07-07: Ins HTML gelangt nur die Kurzform; Regex- und Rendertest prüfen das je Szene, der volle Pfad erscheint nicht im HTML. T-07-08: Labels wurden am Release geprüft, Ersetzungen sind oben genannt, und der Registerbeleg-Test läuft über `allScenes`. T-07-09: Es gibt nur fiktive Beispieldaten.

## Self-Check: PASSED

- Alle 7 geänderten Dateien sind committet; der Arbeitsbaum ist sauber, abgesehen von `.planning/config.json` (bewusst nicht angefasst).
- Die Commits cf1c618, 9313ae1 und b37ee14 sind im Log vorhanden.
- Die Screenshots liegen im Scratchpad-Ordner 07-03 (10 PNG + report.json).
