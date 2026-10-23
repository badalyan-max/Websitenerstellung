---
phase: 09-gewerke-und-wissensinhalte
plan: 06
subsystem: content-hilfe
tags: [inhalt, paket-e, hilfe, baustelle, projekte, zeiten, arbeitsabschnitte, release-delta, leitlinie-l1]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: answer-Frontmatter, prosaProbleme, L-1-Wortliste; 09-15: eingefrorene Basis Web 6686d05 / Mobile 837aab4f, content-pruefen.mjs"
provides:
  - "9 Hilfeartikel Projekte und Zeiten gegen den Release korrigiert und nach D-13 gegliedert (answer, Voraussetzungen, Schritt für Schritt je Plattform, Ergebnis prüfen, Häufige Probleme mit Frage-H3)"
  - "Release-Delta Zeitkorrektur (Beginn, Ende, Pause im Web) und Sperre abgerechneter Zeiten (Web + Mobile) in hilfe/zeiteintrag-erfassen-korrigieren"
  - "CONTENT-04-Erweiterung: Arbeitsabschnitte in der Mobile-App (Projektinfos, Einsatz, Projektort) in hilfe/projekt-phasen-anlegen"
  - "Prüfdatei craftos/docs/content-pruefung/09-e.md mit 9 Zeilen, Zitatprüfung, Pflichtquellen, Abweichungen von der Korrekturtabelle, Übergabeliste"
affects: [09-09, 09-16, 09-04, 09-10]

tech-stack:
  added: []
  patterns:
    - "Bedienbegriffe je Plattformabschnitt getrennt (Web „Beginn/Ende/Pause (Minuten)“, mobil „Von/Bis/Pause/Summe“)"
    - "Mobile-Navigation lizenzabhängig benennen (App-Lizenz untere Leiste, Voll-Lizenz unter „Mehr“)"

key-files:
  created:
    - craftos/docs/content-pruefung/09-e.md
  modified:
    - craftos/content/hilfe/plantafel-einsatz-planen.md
    - craftos/content/hilfe/planung-mitarbeiter-ressourcen.md
    - craftos/content/hilfe/projekt-phasen-anlegen.md
    - craftos/content/hilfe/projektdateien-ordner.md
    - craftos/content/hilfe/mobile-offline-synchronisierung.md
    - craftos/content/hilfe/mobilen-timer-bedienen.md
    - craftos/content/hilfe/urlaub-beantragen-bearbeiten.md
    - craftos/content/hilfe/zeiteintrag-erfassen-korrigieren.md
    - craftos/content/hilfe/zeiten-pruefen-exportieren.md

key-decisions:
  - "Phase 9 (09-06): Plantafel-Button „Einplanen“ öffnet am Release den einheitlichen Dialog „Einplanen“, nicht „Neuer Einsatz“ – Artikel folgen dem Release, Abweichung von der Korrekturtabelle in 09-e.md dokumentiert"
  - "Phase 9 (09-06): Geräteeinsätze entstehen über „Einplanen“ mit Art „Gerät/Fahrzeug“; „Gerät/Fahrzeug einplanen“ ist am Release nur Bearbeitungsweg („Geräte-Einsatz bearbeiten“) und wird nicht als Anlageweg genannt"
  - "Phase 9 (09-06): Pflichtquelle § 4 ArbZG nur in hilfe/zeiten-pruefen-exportieren (Pausenhinweis „Pflichtpause fehlt“); übrige acht Artikel ohne Rechtsangaben"
  - "Phase 9 (09-06): Frontmatter-title „Ein Projekt mit Phasen anlegen“ bleibt (kein sachlicher Fehler); Angleichung als optionaler Punkt an 09-09"

requirements-completed: []

duration: 35min
completed: 2026-10-23
---

# Phase 9 Plan 06: Hilfe Baustelle (Projekte und Zeiten) Summary

**Neun Hilfeartikel aus Projekte und Zeiten gegen Web test.245 / Mobile test.96 korrigiert und nach D-13 gegliedert; die Web-Zeitkorrektur mit Beginn, Ende und Pause sowie die Sperre abgerechneter Zeiten (Korrektur über Storno) stehen jetzt richtig im Artikel, und projekt-phasen-anlegen erklärt die Arbeitsabschnitte in der Mobile-App Schritt für Schritt.**

## Performance

- **Duration:** ca. 35 min Arbeitszeit (plus Wartezeit auf die Sperre für npm ci)
- **Started:** 2026-10-23T00:14Z
- **Completed:** 2026-10-23T00:50Z
- **Tasks:** 2 von 2 (plus vorgezogener Commit für den Vorrangartikel)
- **Files:** 1 neu, 9 geändert

## Accomplishments

- **Vorrang (`e104fc6`):** `zeiteintrag-erfassen-korrigieren` beschrieb das Gegenteil des Releases („Der Web-Dialog arbeitet mit einer Stundenzahl“). Neu: Web „Zeit erfassen“ und „Zeiteintrag bearbeiten“ mit „Beginn“, „Ende“, „Pause (Minuten)“, berechneter Arbeitszeit, „Ende am Folgetag“, „Stunden“ nur ohne Uhrzeiten; Sperrtexte Web („Diese Zeit ist bereits abgerechnet. Bitte zuerst die Rechnung korrigieren.“, „Läuft noch. Bitte erst stoppen.“) und Mobile („Diese Zeit ist bereits abgerechnet. Änderungen nur nach Storno der Rechnung.“) wörtlich; Abschnitt „Abgerechnete Zeiten korrigieren“ mit Storno-Weg (Storno und Löschen nie ausgestellter Entwürfe geben die Zeiten frei, Migration `zeit_sperre_abgerechnet_sz`).
- **Projekte (`724dd7b`):** Plantafel mit „Einplanen“, „Hinweis zur Planung“/„Trotzdem einplanen“, „Einsatz hier nicht möglich“, „Ohne Kartenposition“, nur „Einsatz verschoben“ (+ „Mitarbeiter benachrichtigen“), „Jetzt einplanen“ am Arbeitsabschnitt; Geräte & Fahrzeuge statt Ressourcen; `projekt-phasen-anlegen` mit „Abschnitt anlegen“, „Mehr Einstellungen“, „Startet nach“, „Speichern und einplanen“, „Abschnitte aus Angebot vorschlagen“ (kostenlos aus dem Angebot oder „Mit KI vorschlagen“ auf Anforderung), „Liste“/„Zeitleiste“ und neuem Abschnitt „Schritt für Schritt in der Mobile-App“ (Projektinfos → Arbeitsabschnitte mit Status, Zeile „Arbeitsabschnitt“ am Einsatz, „Aktuellen Standort als Projektort setzen“); `projektdateien-ordner` mit „Dateien hochladen“, Sichtbarkeit, Ordner „Besichtigung“.
- **Zeiten (`5d0ddef`):** Offline-Status positiv formuliert (ausstehende Änderungen bleiben beim Abmelden erhalten, Chat und Lager vorgemerkt, Fotos mit Verbindung); Timer unter „Zeiten“; Urlaub mobil und Web mit belegten Aktionen; Export mit „Pausen des Tages“, „Pflichtpause fehlt“ und Pflichtquelle § 4 ArbZG; Prüfdatei 09-e.md abgeschlossen.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-e.md --zitate --l1 --antwort` (9 Dateien) | 0 Befunde, 6 Hinweise (nur Kurzbegriffe „Typ“, „Von“, „Bis“, „CSV“, gezielt nachgelesen); Ausgangsstand 19 Befunde |
| `vitest tests/content-produktwahrheit.test.ts` | 10 von 10 grün (je Aufgabe) |
| `vitest tests/content.test.ts` (unter Sperre) | 34 von 34 grün (je Aufgabe) |
| `npm run typecheck`, `npm run lint` | Exitcode 0 |
| Paketende unter Sperre: `npm run build` | grün |
| `seo-audit.mjs --paths=<9 Pfade>` | 0 Verstöße in allen 12 Regeln (title, description, h1, keyword, map, breadcrumbs, og, faq-schema, schema, antwort, duplikate, prompts) |
| Akzeptanz-Greps | Altbegriffe je 0; „Abschnitt anlegen“ 2, „in der Mobile-App“ 2; „Pause (Minuten)“ 1, „mit einer Stundenzahl“ 0; 9 Zeilen `| hilfe/…|`; alle 9 mit `answer:` und „## Häufige Probleme“ |

## Task Commits

1. **Vorrang: Zeitkorrektur und Sperre** – `e104fc6` `fix(09-06): Zeitkorrektur im Web und Sperre abgerechneter Zeiten im Hilfeartikel`
2. **Aufgabe 1: Projekte (4)** – `724dd7b` `feat(09-06): Projekt-Hilfeartikel gegen Release korrigiert, Arbeitsabschnitte in der Mobile-App`
3. **Aufgabe 2: Zeiten (5), Prüfdatei, Paketende** – `5d0ddef` `feat(09-06): Zeiten-Hilfeartikel gegliedert, Prüfdatei 09-e abgeschlossen`

## Decisions Made

Siehe `key-decisions` im Frontmatter. Grundlage für alle Begriffe ist ausschließlich der eingefrorene Release (Web `6686d05`, Mobile `837aab4f`), nur lesend per `git show`/`git grep`.

## Deviations from Plan

### Abweichungen von der Korrekturtabelle (09-RESEARCH) – am Release geprüft

**1. [Rule 1 – falsche Vorlage] Dialog „Neuer Einsatz“ wird am Release nicht mehr gerendert**
- Der Kopfzeilen-Button „Einplanen“ setzt eine Vorbelegung für den einheitlichen `PlanAssignmentDialog` (Titel „Einplanen“, Felder „Bis einschließlich (optional)“, „Uhrzeit von/bis“, „Mehr Einstellungen“, „Notiz (optional)“). Der Artikel beschreibt diesen Dialog; Belege in 09-e.md, Abschnitt „Abweichungen“.
- Commit: `724dd7b`

**2. [Rule 1] „Gerät/Fahrzeug einplanen“ ist kein Anlageweg**
- `ResourceAssignmentDialog` erscheint nur für bestehende Geräteeinsätze („Geräte-Einsatz bearbeiten“); neue entstehen über „Einplanen“ mit Art „Gerät/Fahrzeug“ oder Klick in die Gerätezeile.
- Commit: `724dd7b`

**3. [Rule 1] Mobile-Navigation lizenzabhängig**
- „Zeiten“ und „Einsätze“ liegen mit App-Lizenz in der unteren Leiste, mit Voll-Lizenz unter „Mehr“ (`src/shared/lib/navigation.ts`). In zeiteintrag, plantafel, timer und urlaub so formuliert.
- Commits: `724dd7b`, `5d0ddef` (Nachbesserung im Vorrangartikel mit Aufgabe 2 committet)

**4. Vorgezogener Commit**
- Auf Wunsch des Auftrags wurde `zeiteintrag-erfassen-korrigieren` zuerst und mit eigenem Commit (`e104fc6`) korrigiert; die Zeile in 09-e.md folgte mit Aufgabe 2.

**5. „Einsatz geändert“** steht nur in der Datenbankmigration (`notify_assignment_change`), nicht in `src`/`supabase/functions`; laut Plan nur „Einsatz verschoben“ genannt.

---

**Total deviations:** 3 Release-Korrekturen gegenüber der Research-Tabelle, 2 Ablaufhinweise. **Impact:** Artikel beschreiben die tatsächlich erreichbaren Bildschirme; keine Regel abgeschwächt.

## Geteilte Dateien

Keine fremden Dateien geändert. Nur die 9 Artikel aus `files_modified`, `docs/content-pruefung/09-e.md` und dieses SUMMARY. Keyword-Map, Tests, `lib/**`, STATE.md und ROADMAP.md unverändert; Wünsche stehen in der Übergabeliste von 09-e.md (Map-Descriptions für zeiteintrag und plantafel, optionale Titelangleichung projekt-phasen-anlegen, Linkcheck neuer Slugs, relatedArticles-Wünsche, Hinweise an 09-04).

## Known Stubs

Keine. Inline-Links auf `/blog/bauablaufplan`, `/hilfe/besichtigung-durchfuehren` und `/hilfe/kundenportal-kunden-einladen` sind laut 09-03-Regeln erlaubt und lösen sich nach dem Merge von 09-07/09-08 auf (Linkcheck 09-16).

## Threat Flags

Keine neue Angriffsfläche: nur Markdown ohne Roh-HTML (T-09-20); T-09-19 durch belegte Bedienbegriffe, Release-Delta und Pflichtquelle mitigiert.

## Betrieb

- `npm ci --prefer-offline` im Worktree unter der Sperre (nach Wartezeit auf 09-17), Exitcode 0.
- Sperre `.heavy-lock` nach jedem Lauf freigegeben (geprüft: frei). Kein Server gestartet; Port 3106 frei.

## Self-Check: PASSED

- Dateien vorhanden: 9 Artikel und `craftos/docs/content-pruefung/09-e.md`.
- Commits `e104fc6`, `724dd7b`, `5d0ddef` im Branch `phase09-spur-e`.
