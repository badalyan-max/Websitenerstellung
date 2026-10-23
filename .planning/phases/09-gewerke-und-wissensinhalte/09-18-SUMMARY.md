---
phase: 09-gewerke-und-wissensinhalte
plan: 18
subsystem: inhalte-hilfe
tags: [inhalt, paket-e2, hilfe, baustelle, baudokumentation, teilabnahme, lager, craft-ai]
requires:
  - phase: 09-01
    provides: Artikelvorlage v2, Frontmatter answer/faq/scene, Listenobergrenzen, content-produktwahrheit-Test
  - phase: 09-15
    provides: eingefrorene Basis Web 6686d05 / Mobile 837aab4f, Prüfwerkzeug content-pruefen.mjs, Format der Prüfdateien
provides:
  - Zehn geprüfte und gegliederte Hilfeartikel (Baudokumentation 3, Lager 5, Craft AI 2)
  - Teilabnahme-Erweiterung in hilfe/abnahme-dokumentieren (CONTENT-04, D-19)
  - Prüfdatei docs/content-pruefung/09-e2.md mit Belegpfaden, Pflichtquellen und Übergabeliste
affects: [09-09 Integration, Keyword-Map, /craft-ai, /fakten]
tech-stack:
  added: []
  patterns: [Hilfe-Gliederung D-13 mit Plattformabschnitten, Bedienbegriffe wörtlich aus Release mit Belegpfad, L-1 positiv]
key-files:
  created:
    - craftos/docs/content-pruefung/09-e2.md
  modified:
    - craftos/content/hilfe/abnahme-dokumentieren.md
    - craftos/content/hilfe/bautagesbericht-erstellen.md
    - craftos/content/hilfe/mangel-erfassen-bearbeiten.md
    - craftos/content/hilfe/artikel-stammdaten-anlegen.md
    - craftos/content/hilfe/inventur-durchfuehren.md
    - craftos/content/hilfe/lagerorte-lagerplaetze-einrichten.md
    - craftos/content/hilfe/material-entnehmen-zurueckbuchen.md
    - craftos/content/hilfe/wareneingang-buchen.md
    - craftos/content/hilfe/craft-ai-betriebsdaten-fragen.md
    - craftos/content/hilfe/ki-entwurf-pruefen-uebernehmen.md
key-decisions:
  - "Craft-AI-Hilfe nach Option A (Orchestrator 23.10.2026): ki-entwurf-pruefen-uebernehmen beschreibt den Angebotschat; craft-ai-betriebsdaten-fragen heißt „KI-Funktionen auf Anforderung nutzen“ (Slug bleibt); das Chat-Panel (am Release nur für Plattform-Entwickler, Register notLive „KI-Agent“) erscheint in keinem Artikel"
  - "Teilabnahme mit Pflichtquellen § 640 BGB, § 641 BGB und § 12 VOB/B; Bedenkenanzeige mit § 4 VOB/B (alle am 23.10.2026 abgerufen)"
  - "Lagerbuchungen: Menü „Buchen“ nur Admin/Büro-Leitung (can_see_finance) – als positive Voraussetzung formuliert"
requirements-completed: []
duration: 3h 25min (inkl. Wartezeit am Checkpoint und auf die Sperre)
completed: 2026-10-23
---

# Phase 9 Plan 18: Paket e2 Hilfe Baustelle Summary

**Zehn Baustellen-Hilfeartikel gegen Web 6686d05 / Mobile 837aab4f geprüft und neu gegliedert: Teilabnahme mobil und Abschlag daraus im Web, Lager mit Katalogübernahme, Belegscan und Mobile-Buchungen, Craft AI auf die live erreichbaren KI-Funktionen umgestellt.**

## Performance

- **Dauer:** rund 3 h 25 min, darin die Wartezeit am Checkpoint (Entscheidung Craft AI) und auf die Sperre
- **Start:** 2026-10-23T00:13Z
- **Ende:** 2026-10-23T03:40Z
- **Aufgaben:** 2 (Aufgabe 2 in zwei Commits wegen Checkpoint)
- **Dateien:** 11 (10 Artikel, 1 Prüfdatei)

## Ergebnisse

- `abnahme-dokumentieren` ist um die Teilabnahme erweitert. In der Mobile-App: „Teilabnahme“/„Endabnahme“, „Abgenommene Arbeitsabschnitte“, „Arbeitsschritte & Prüfpunkte“, „Allgemeine Abnahme-Vorlage verwenden“ und die Sperre nach beidseitiger Unterschrift. In der Web-App: „Abnahme durchführen“ (Schlussabnahme), „Abschlagsrechnung vorschlagen“ → „Umfang der Teilabnahme“ → „Pauschalen Abschlag öffnen“ und „Abnahme übernehmen“, das die Schlussrechnung freigibt. Die Plattformbegriffe stehen ausdrücklich im Text (Endabnahme mobil = Schlussabnahme web).
- In `bautagesbericht-erstellen` stehen die Berichtsarten je Plattform in einer Tabelle. Dazu kommen die belegten Felder, das Diktat mit KI-Credits auf Anforderung, die Abrechnung und Inline-Links auf `/hilfe/regiebericht` und `/hilfe/bedenkenanzeige`. In `mangel-erfassen-bearbeiten` stehen die Statusnamen je Plattform, die Board-Ansicht und der Inline-Link `/blog/maengelanzeige`.
- Lager:
  - „Einkaufspreis (EK, optional)“, „Beleg scannen“ und „Zubuchen“ (mobil).
  - „Kunde“ und „Auftrag / Projekt“ im Warenausgang, „Ursprüngliche Materialentnahme“ bei der Rückbuchung und der Mobile-Ablauf „Ausgabe, Rücknahme oder Bewegung“.
  - DATANORM 4 und DATANORM 5 positiv über „Kataloge“ → „Artikel ansehen“ → „In eigene Artikel übernehmen“.
- Craft AI: Beide Artikel beschreiben nur Live-Funktionen (Angebotschat, „Mit KI auslesen“, „Beleg scannen“, „Diktieren“, „Foto mit KI erkennen“) und sind positiv formuliert: „Craft AI macht Vorschläge; Sie prüfen und bestätigen jede Übernahme.“
- Alle zehn Artikel haben `answer`, die Abschnitte „Voraussetzungen“, „Schritt für Schritt …“, „Ergebnis prüfen“ und „Häufige Probleme“ mit H3-Fragen sowie `updatedAt` 2026-10-23. Keiner enthält L-1-Wörter oder Altbegriffe.

## Task-Commits

1. **Aufgabe 1: Baudokumentation (3)** – `544808c` (feat)
2. **Aufgabe 2: Lager (5)** – `577ab2c` (feat)
3. **Aufgabe 2b: Craft AI (2), Prüfdatei abgeschlossen** – `dffcb11` (feat)

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-e2.md --zitate --l1 --antwort` über 10 Dateien | 0 Befunde, 5 Hinweise (kurze Begriffe „OK“, „Ort“, „Art“, zweimal „KI“, alle am Bildschirm nachgelesen), Exitcode 0 |
| `tests/content-produktwahrheit.test.ts` | 10/10 bestanden |
| `tests/content.test.ts` (unter Sperre) | 34/34 bestanden |
| `npm run typecheck`, `npm run lint` | Exitcode 0 |
| `npm run build` (unter Sperre) | Exitcode 0 |
| `seo-audit.mjs --paths=<10 Pfade>` (alle Regeln) | 0 Verstöße in 12 Regeln |
| Abnahmekriterien | `Teilabnahme` ≥ 3, `Abgenommene Arbeitsabschnitte` ≥ 1, https-Quellen mit `checkedAt` 2026-10-23; „Einkaufspreis (EK, optional)“ ≥ 1; „nicht autonom“ = 0; „Ursprüngliche Materialentnahme“ ≥ 1; 10 Zeilen `| hilfe/…|`, Pflichtquellen-Liste, Übergabeliste |

## Getroffene Entscheidungen

- **Craft AI (Option A, Orchestrator):** Das Chat-Panel „KI-Assistent“ bindet `MainLayout.tsx` Z. 127 nur für Plattform-Entwickler ein. Seitenleiste und mobiler Kopf zeigen für alle anderen „KI-Agent – Bald verfügbar“ (seit test.220), und das Register führt „KI-Agent“ unter `notLive`. Beide Artikel wurden deshalb auf die live erreichbaren KI-Funktionen umgestellt; der Slug bleibt, und der Frontmatter-`title` von `craft-ai-betriebsdaten-fragen` ist sachlich korrigiert (D-12).
- **Pflichtquellen:** § 640 und § 641 BGB (gesetze-im-internet.de) sowie § 12 und § 4 VOB/B (dejure.org), jeweils mit Wortlautprüfung und ohne Rechtsberatung.

## Abweichungen vom Plan

### Automatisch behobene Punkte

**1. [Regel 1 – Bug] Altbegriffe und unbelegte Bedienwege korrigiert**
- **Gefunden in:** Aufgaben 1 und 2
- **Problem:** Mehrere alte Formulierungen stimmten nicht mit dem Release überein:
  - „Checkliste“: In der Mobile-App heißt der Abschnitt „Arbeitsschritte & Prüfpunkte“.
  - „Projekte → gewünschtes Projekt → Baudokumentation → Abnahme“: Richtig ist der Reiter „Baudokumentation“ mit dem Bereich „Abnahme“.
  - „Lager → Buchen → Rückbuchung vom Auftrag“ ohne Kundenschritt: Der Kundenschritt fehlte.
  - Prüfpunktstatus im Web: Er heißt „In Ordnung“ statt „OK“.
- **Lösung:** Wörtliche Release-Begriffe je Plattform mit Belegpfad in `09-e2.md`.
- **Commits:** `544808c`, `577ab2c`

**2. [Regel 4 – Checkpoint] Craft-AI-Artikel beschrieben eine nicht live erreichbare Funktion**
- **Gefunden in:** Aufgabe 2
- **Problem:** Laut Recherche waren beide Artikel „ok“. Das Chat-Panel ist am eingefrorenen Release aber nur für Plattform-Entwickler erreichbar (Register `notLive`).
- **Lösung:** CHECKPOINT an den Orchestrator. Er entschied Option A; danach habe ich beide Artikel umgewidmet und die Folgen für Map, `/craft-ai` und `/fakten` in die Übergabeliste geschrieben.
- **Commit:** `dffcb11`

**3. [Regel 2] Plattform `mobile` ergänzt**
- In `material-entnehmen-zurueckbuchen`, `wareneingang-buchen` und `craft-ai-betriebsdaten-fragen`, weil diese Artikel jetzt belegte Mobile-Abläufe beschreiben.

**Gesamt:** zwei automatische Korrekturen und eine Orchestrator-Entscheidung. Der Umfang blieb in den Dateien aus `files_modified`.

## Übergabeliste (Auszug, vollständig in `09-e2.md`)

- An 09-09 (Keyword-Map):
  - `/hilfe/craft-ai-betriebsdaten-fragen`: Title, H1, Description und Hauptkeyword an „KI-Funktionen auf Anforderung nutzen“ angleichen.
  - `/hilfe/ki-entwurf-pruefen-uebernehmen`: Description anpassen.
  - `/hilfe/kategorie/craft-ai`: Description anpassen.
  - `/hilfe/abnahme-dokumentieren`: Teilabnahme in die Description aufnehmen.
- An 09-09 (Integration):
  - `relatedArticles` um `/hilfe/regiebericht`, `/hilfe/bedenkenanzeige` und `/blog/maengelanzeige` ergänzen, sobald die Dateien existieren.
  - `relatedFeatures` von `ki-entwurf-pruefen-uebernehmen` anpassen.
- An den Orchestrator: `/craft-ai` (`lib/seiten/craft-ai.ts` und Map) und `/fakten` beschreiben noch den Chat zu Betriebsdaten; an die Live-KI-Funktionen angleichen.

## Bekannte Platzhalter

Keine. Die Inline-Links auf `/hilfe/regiebericht`, `/hilfe/bedenkenanzeige`, `/hilfe/lager-scan-app`, `/hilfe/datanorm-katalog-importieren` und `/blog/maengelanzeige` zeigen auf festgelegte neue Slugs aus anderen Paketen; der Linkcheck läuft in 09-16.

## Bedrohungsmodell

T-09-19 ist umgesetzt: Die Bedienbegriffe je Plattform sind belegt, und für Abnahme und Bedenkenanzeige gibt es Pflichtquellen. T-09-20 ist umgesetzt: Die Artikel enthalten kein Roh-HTML. Neue Angriffsfläche ist nicht entstanden.

## Nächste Schritte

Merge der Spur `phase09-spur-e2` durch den Orchestrator; danach setzt 09-09 die Übergabeliste um.

## Self-Check: PASSED

- Alle 11 Dateien sind vorhanden, und die Commits `544808c`, `577ab2c` und `dffcb11` stehen im Branch `phase09-spur-e2`.
