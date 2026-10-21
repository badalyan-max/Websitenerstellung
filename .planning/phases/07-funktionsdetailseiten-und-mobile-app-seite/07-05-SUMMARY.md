---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 05
subsystem: funktionsdetails
tags: [inhalte, detailseiten, angebot, planung, baustelle, faq, zusatzfunktionen]
requires:
  - phase: 07-04
    provides: FunktionsdetailInhalt-Typen, buildFunktionsdetail, INHALTE, ERWARTET-Tabelle, FunktionsDetail-Vorlage
provides:
  - lib/funktionsdetails/angebot.ts (angebote, aufmass, kundenportal, gaeb)
  - lib/funktionsdetails/planung.ts (plantafel, projektverwaltung, arbeitsanweisungen, terminplanung)
  - lib/funktionsdetails/baustelle.ts (zeiterfassung, baudokumentation, lager, maengelmanagement)
  - INHALTE mit 12 Einträgen; ERWARTET mit 12 Slugs und allgemeinen Inhaltsregeln
  - Wortregel-Ausnahme „automatisch“ in einer FAQ-Frage, deren Antwort mit „Nein“ beginnt
affects: [07-06, 07-09]
tech-stack:
  added: []
  patterns:
    - "Gruppenmodul je Funktionsgruppe (Record<slug, FunktionsdetailInhalt>), zusammengeführt in INHALTE; Quelle je Zusatz-FAQ als Kommentar"
key-files:
  created:
    - craftos/lib/funktionsdetails/angebot.ts
    - craftos/lib/funktionsdetails/planung.ts
    - craftos/lib/funktionsdetails/baustelle.ts
  modified:
    - craftos/lib/funktionsdetails/index.ts
    - craftos/tests/funktionsdetails.test.ts
key-decisions:
  - "angebote: Grenze-Kachel „DATANORM v5 nicht pauschal zugesagt“ (Beleg funktionen.ts note und Register-Limitation) ersetzt die Kachel „Dokumente ausgeben“; Anordnung md·sm·sm·wide·wide bleibt, die PDF-Ausgabe steht weiter in Kurznutzen, Ablauf, Web-Panel"
  - "Wortregel: „automatisch“ ist in einer FAQ-Frage erlaubt, wenn die Antwort mit „Nein“ beginnt; die Antwort selbst braucht weiter „auf Wunsch“"
  - "H2-Prüfung: normierte H2 enthält das erste Wort des Funktionsnamens oder das erste Wort des Hauptkeywords; generische H2 sind verboten"
  - "Terminplanung: Web-Panel-Satz beginnt mit „Geplant wird im Web“, Mobile-Panel nennt Arbeitsabschnitte; FAQ belegt, dass Abhängigkeiten die Termine nicht verschieben (PhaseDependencyEditor.tsx)"
requirements-completed: []
duration: 15min
completed: 2026-10-21
---

# Phase 7 Plan 05: Inhalte der Gruppen Angebot, Planung und Baustelle Summary

**Zwölf Detailseiten haben jetzt geprüfte, belegte Inhaltsmodule: Kopfwort, Kurznutzen, Sekundärlink, 4–5 Ablaufschritte, Plattform- und Rollen-Panels, Kernpunkt-Kacheln mit genau einer Grenze-Kachel, je 3–4 FAQ mit Pflichtfrage und 2–3 verwandte Funktionen. Alle sieben Zusatzfunktionen dieser Gruppen stehen als `data-zusatz`-Kachel auf ihrer Zielseite. Der Builder baut alle 12 Einträge fehlerfrei, und Vitest prüft sie gegen die 07-UI-SPEC-Erwartungen.**

## Performance

- **Dauer:** ca. 15 min (Start 18:48 UTC, Ende 19:03 UTC; davor Kontextlektüre)
- **Tasks:** 3/3, jeweils RED → GREEN
- **Dateien:** 3 neu, 2 geändert

## Ergebnisse

### Task 1: Gruppe Angebot
- `angebot.ts` mit `angebotInhalte` für angebote, aufmass, kundenportal und gaeb. Die Texte stammen wörtlich aus 07-UI-SPEC (Seitentexte, Ablaufschritte, Abschnitte 3–6). Die zusätzlichen FAQ tragen jeweils ihre Quelle im Kommentar.
- **Zusatz-Kacheln:** `angebotsunterschrift` (wide) auf angebote und `besichtigung` (wide) auf aufmass.
- **gaeb:** Belegt sind X83-Import und X83/X84-Export in GAEB DA XML; GAEB 90/2000 wird ausdrücklich nicht unterstützt. Beim X84-Export gilt der Vorbehalt der vollständig importierten Original-X83, bei DATANORM der v5-Vorbehalt.
- **kundenportal:** Die Rolle „Kunde“ (eigener Zugang im Browser) steht im Web-Panel. Grenze und Pflichtantwort lauten auf Zahlung per Überweisung.
- In `index.ts` ist die Wortregel um die Frage-Ausnahme erweitert (`frageMitNein`), und `INHALTE` übernimmt `...angebotInhalte`.
- **Neue allgemeine Tests:**
  - H2 nennt den Funktionsnamen oder das erste Keyword-Wort und ist nicht generisch.
  - Sekundärlink und Kachel-`href` stehen in der Sitemap.
  - Jede Zusatzfunktion mit Ziel auf einer Detailseite mit Inhalt steht dort als Kachel, nicht in Größe sm.
  - Quelltext ohne `€`, „10 Tage“ und „Tage kostenlos“.
  - Drei Fälle zur Wortregel „automatisch“.

### Task 2: Gruppe Planung
- `planung.ts` mit `planungInhalte` für plantafel, projektverwaltung, arbeitsanweisungen und terminplanung.
- **plantafel:** Grenze „Geplante Orte, keine Live-Standorte“. Die Pflichtantwort beginnt mit „Nein“. Weitere FAQ zu Benachrichtigungen, Navigation und „Konflikt erkannt“.
- **projektverwaltung:** Zusatz-Kacheln „Kunden in der App“ (md, `kunden-app`) und „Projekt-Chat und Nachrichten“ (wide, `projekt-chat`). Grenze „Zugriff nach Rolle“.
- **arbeitsanweisungen:** Grenze „Materialliste bucht keine Entnahme“. Die Pflichtantwort „Nein“ bezieht sich auf die Verkaufspreise.
- **terminplanung (D-20):** Durchgehend wird „Arbeitsabschnitte“ verwendet (19 Treffer, 0 × „Bauphase“). Das Web-Panel sagt „Geplant wird im Web: …“, das Mobile-Panel nennt die Arbeitsabschnitte mit Status. Grenze „Geplant wird im Web“. Die FAQ zu Abhängigkeiten mit Arbeitstagen ist am Release belegt: Die Termine bleiben dabei unverändert.

### Task 3: Gruppe Baustelle
- `baustelle.ts` mit `baustelleInhalte` für zeiterfassung, baudokumentation, lager und maengelmanagement.
- **zeiterfassung:**
  - Mobile-Panel mit Mobil-Teammitglied (eigene Zeiten) und Mobil-Teamleitung (auch Zeiten anderer).
  - Grenze „Standort nur bei Start und Stopp“; die Pflichtantwort beginnt mit „Nein“.
  - Die Empfangs-FAQ beginnt mit „Teilweise:“ und gibt kein Offline-Versprechen (D-23).
- **baudokumentation:**
  - lg-Zusatz „Abnahme und Teilabnahme“ mit `abnahmeScene` (194) und md-Zusatz „Bautagesbericht“.
  - Kachel „Mängel“ → `/funktionen/maengelmanagement` als Rücklink (D-12).
  - Grenze „Unterschrift braucht Standortfreigabe“.
  - Die FAQ zu Bautagebuch und Abnahme bleiben produktbezogen (T-07-15).
- **lager:** lg-Zusatz „Lager-Scan und Wareneingang“ mit `lagerAppScene` (194). Grenze „Werte nur mit gebuchten Bewegungen“.
- **maengelmanagement:**
  - Die Pflichtantwort ist am Mobile-Release belegt (`reminder.ts`: lokale Mitteilung „Mangel fällig“ am Fälligkeitstag, nur bei erlaubten Push-Mitteilungen; Liste „Überfällig“).
  - „In Arbeit“ und „In Bearbeitung“ kommen nicht vor; ein eigener Test prüft das.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED Task 1 / 2 / 3 | jeweils rot: 2 / 1 / 2 Fälle (fehlende INHALTE-Einträge, Wortregel-Ausnahme, Statusnamen-Fall) |
| `vitest tests/funktionsdetails.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts` (Task 1) | 66/66 grün |
| `vitest tests/funktionsdetails.test.ts tests/announcements.test.ts` (Task 2) | 56/56 grün |
| `vitest tests/funktionsdetails.test.ts` (Task 3, INHALTE-Fall über 12 Einträge) | 52/52 grün |
| `npm test` (voll) | 28 Dateien, 433/433 grün |
| `npm run typecheck`, `npm run lint` | grün (nach jedem Task) |
| `npm run build` | grün, 139 statische Seiten |
| Akzeptanz-Greps angebot.ts | Pflichtfragen je 1; Zusatz 2; Verbotswörter 0; `€` 0 |
| Akzeptanz-Greps planung.ts | Pflichtfrage 1; „Arbeitsabschnitt“ 19 (≥ 3); „Bauphase“ 0; Zusatz 2 |
| Akzeptanz-Greps baustelle.ts | Pflichtfragen je 1; Zusatz 3; Szenen 4 (≥ 2); Verbotswörter 0 |

Koordination: Vor `npm test` und Build wurde der Status gelesen (edgar bereit, edgarspc offline/veraltet). Für das Website-Repo gibt es weiterhin kein Rezept (Lücke: `website-unit`, `website-build`). Beide Läufe liefen deshalb lokal nacheinander, jeweils als einziger schwerer Prozess. Es wurde kein Server gestartet, und kein Prozess läuft mehr.

## Task Commits

1. `b3da99f` test(07-05): add failing expectations for Angebot group detail content
2. `f3ae676` feat(07-05): content for Angebot group detail pages (angebote, aufmass, kundenportal, gaeb)
3. `18313c9` test(07-05): add failing expectations for Planung group detail content
4. `9a5fea3` feat(07-05): content for Planung group detail pages (plantafel, projektverwaltung, arbeitsanweisungen, terminplanung)
5. `a965f3b` test(07-05): add failing expectations for Baustelle group detail content
6. `d4046e8` feat(07-05): content for Baustelle group detail pages (zeiterfassung, baudokumentation, lager, maengelmanagement)

## Deviations from Plan

### Auftrag des Orchestrators (aus 07-04)

**1. Grenze-Kachel für angebote ergänzt**
- **Befund:** Die 07-UI-SPEC-Kacheltabelle für `angebote` enthält keine Grenze-Kachel. Der Builder verlangt genau eine (D-04), und ERWARTET legt die Anordnung md·sm·sm·wide·wide fest.
- **Lösung:** Die Kachel „Dokumente ausgeben“ (wide) wird ersetzt durch die Grenze **„DATANORM v5 nicht pauschal zugesagt“** – „Prüfen Sie Ihre konkrete Lieferantendatei, eine pauschale Kompatibilität mit DATANORM v5 wird nicht zugesagt.“ (Icon `Info`, `grenze: true`).
- **Beleg:** `funktionen.ts` angebote `note` und Register-Limitation „DATANORM v5 nicht als geprüft zugesagt“.
- **Was erhalten bleibt:** Die PDF-Ausgabe steht weiter im Kurznutzen, im Ablaufschritt „PDF ausgeben“ und im Web-Panel. Zusätzlich gibt es eine FAQ zu DATANORM im Angebot.
- **Weitere Seiten:** Alle anderen elf Seiten dieses Plans haben in der Tabelle genau eine Grenze-Kachel; dort war keine Ergänzung nötig.
- **Commit:** f3ae676

### Präzisierungen

- **Rollen-Zusätze, wo die UI-SPEC-Tabelle den Bezug offenlässt:**
  - „mit Projektzugriff“ bzw. „zugewiesene Projekte“ bzw. „eigene Einsätze“ steht an beiden Mobile-Rollen.
  - zeiterfassung: Der Hinweis „Auswertung“ steht im Satz des Web-Panels statt als Rollenzusatz.
  - kundenportal: „laden ein“ steht im Satz des Web-Panels; der Kunde trägt den Zusatz „eigener Zugang im Browser“.
- **ERWARTET-Struktur erweitert** um `snippet`, `zusatz`, `phone`, `hrefs`, `panelSatz` und `pflichtAntwort`. Damit prüft Vitest die Plan-Erwartungen (Snippet, Zusatz-ids, lg-Phone-Szene, Kachel-Link, D-20-Sätze, „Nein“-Antwort) direkt. Ein zusätzlicher Fall verlangt, dass jede ERWARTET-Zeile ein Inhaltsmodul hat (RED-Treiber).

**Total deviations:** 1 Orchestrator-Auftrag (dokumentiert), keine Auto-Fixes nötig.

## TDD Gate Compliance

- Task 1: RED `b3da99f` → GREEN `f3ae676`
- Task 2: RED `18313c9` → GREEN `9a5fea3`
- Task 3: RED `a965f3b` → GREEN `d4046e8`

## Known Stubs

- `INHALTE` enthält 12 von 22 Slugs; rechnung, buchhaltung und team folgen in 07-06. Die Route nutzt die Inhalte erst ab 07-06, eine Sichtprüfung aller 22 Seiten ist dort vorgesehen.

## Threat Flags

Es gibt keine neue Angriffsfläche; es handelt sich um reine Datenmodule ohne Netz-, Datei- oder Auth-Pfade.
- **T-07-14:** Quelle je Zusatz-FAQ im Kommentar, Builder-Wortregeln, genau eine Grenze-Kachel und Pflichtfragen aus 07-UI-SPEC.
- **T-07-15:** Bautagebuch- und Abnahme-FAQ nur produktbezogen.
- **T-07-16:** Quelltexttest ohne `€`, „10 Tage“ und „Tage kostenlos“.
- **T-07-SC:** Es wurden keine Pakete installiert.

## Self-Check: PASSED

- Die Dateien lib/funktionsdetails/angebot.ts, planung.ts und baustelle.ts sind vorhanden. index.ts und tests/funktionsdetails.test.ts wurden geändert.
- Die Commits b3da99f, f3ae676, 18313c9, 9a5fea3, a965f3b und d4046e8 stehen im Log.
- Der Arbeitsbaum ist sauber, abgesehen von `.planning/config.json` (bewusst nicht angefasst). Es läuft kein Server.
