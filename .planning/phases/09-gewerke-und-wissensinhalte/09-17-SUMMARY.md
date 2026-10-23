---
phase: 09-gewerke-und-wissensinhalte
plan: 17
subsystem: inhalte-hilfe-buero
tags: [inhalt, paket-d2, hilfe, rechnungen, angebote, schlussrechnung, gaeb, paragraf-13b, leitlinie-l1]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: Artikelvorlage mit answer/faq, Antwortregel, L-1-Liste; 09-15: eingefrorene Basis (Web 6686d05e, Mobile 837aab4f) und scripts/content-pruefen.mjs"
provides:
  - "/hilfe/schlussrechnung-erstellen answer-first mit sichtbarer FAQ (5) und Muster-Tabelle der Pflichtangaben (SEO-09)"
  - "12 Hilfeartikel Rechnungen/Angebote in Hilfe-Gliederung (answer, Voraussetzungen, Schritt für Schritt, Ergebnis prüfen, Häufige Probleme mit H3-Fragen)"
  - "Rechnung nach § 13b in rechnung-fertigstellen, e-rechnung-herunterladen (plus Hinweise in schlussrechnung, abschlag, angebot-in-rechnung)"
  - "gaeb-importieren berichtigt: X83 GAEB DA XML 3.2/3.3 Import, X83/X84 Export, nur positiv"
  - "craftos/docs/content-pruefung/09-d2.md mit 12 Prüfzeilen, Pflichtquellen, Zitatprüfung und Übergabeliste"
affects: [09-09, 09-16, 09-08]

tech-stack:
  added: []
  patterns:
    - "Muster-Tabelle als GFM-Tabelle unter einer Frage-H2 in Hilfeartikeln (Keyword „… muster“)"
    - "Beispielwerte ohne Anführungszeichen, damit --zitate nur Bedienbegriffe prüft"

key-files:
  created:
    - craftos/docs/content-pruefung/09-d2.md
  modified:
    - craftos/content/hilfe/schlussrechnung-erstellen.md
    - craftos/content/hilfe/abschlagsrechnung-erstellen.md
    - craftos/content/hilfe/angebot-in-rechnung-uebernehmen.md
    - craftos/content/hilfe/berichte-abrechnen.md
    - craftos/content/hilfe/e-rechnung-herunterladen.md
    - craftos/content/hilfe/rechnung-fertigstellen.md
    - craftos/content/hilfe/rechnung-stornieren.md
    - craftos/content/hilfe/angebot-entwurf-anlegen.md
    - craftos/content/hilfe/angebotspositionen-leistungsvorlagen.md
    - craftos/content/hilfe/position-tiefenkalkulieren.md
    - craftos/content/hilfe/raumaufmass-angebot-uebernehmen.md
    - craftos/content/hilfe/gaeb-importieren.md

key-decisions:
  - "Phase 9 (09-17): Hilfeartikel mit Muster-Keyword (Schluss- und Abschlagsrechnung) bekommen eine zusätzliche Frage-H2 mit GFM-Muster-Tabelle zwischen „Ergebnis prüfen“ und „Häufige Probleme“"
  - "Phase 9 (09-17): Fertigstellen wird als Editor-Menü „Weitere Aktionen“ → „Dokument fertigstellen“ beschrieben (Detail-Schaltfläche „Fertigstellen“ erscheint nur außerhalb des Entwurfsstatus)"
  - "Phase 9 (09-17): § 13b positiv als Schalter für umsatzsteuerpflichtige Betriebe, Steuerart je Rechnungsfolge; E-Rechnung-Artikel nennt nur belegte Belegarten (pauschale Abschläge ohne Negativsatz ausgelassen)"
  - "Phase 9 (09-17): Frontmatter-description von gaeb-importieren sachlich berichtigt („Preisübernahme“ war im GAEB-Dialog nicht belegt); Map-Description bleibt bei 09-09"

requirements-completed: []

duration: 95min
completed: 2026-10-23
---

# Phase 9 Plan 17: Paket d2 – Hilfe Büro (Schlussrechnung, Rechnungen, Angebote) Summary

**Zwölf Büro-Hilfeartikel gegen Web test.245 / Mobile test.96 neu geschrieben: Schlussrechnung answer-first mit FAQ und Muster-Tabelle (SEO-09), Rechnung nach § 13b eingearbeitet, GAEB-Import auf X83 (GAEB DA XML 3.2/3.3) und X84-Export berichtigt – alle Bedienbegriffe am Release belegt, L-1 ohne Negativlisten.**

## Performance

- **Duration:** ca. 95 min (inkl. Wartezeiten auf die gemeinsame Sperre)
- **Started:** 2026-10-23T00:12Z (npm ci unter Sperre)
- **Completed:** 2026-10-23T01:50Z
- **Tasks:** 2 von 2
- **Files:** 1 neu, 12 geändert

## Accomplishments

- **Schlussrechnung zuerst (`d3a00b5`):** `answer` (Weg „Rechnung erstellen“ → „Schlussrechnung“), fünf sichtbare FAQ, Voraussetzung „Erst nach Abnahme möglich“, Abnahme per „Abnahme durchführen“ („Schlussabnahme“) oder „Abnahme übernehmen“ durch Büro-Leitung/Inhaber bei „Beauftragt“/„In Ausführung“, Verrechnung „Verrechnung der Abschläge“ → „Restbetrag“, Muster-Tabelle der Pflichtangaben nach § 14 Abs. 4/5 UStG, Quellen § 14 und § 14a UStG sowie § 650g BGB (neu abgerufen 23.10.2026). Einzelprüfung vor den übrigen Artikeln: 0 Befunde.
- **Rechnungen (6):** Abschlag mit zweitem Einstieg „Abschlagsrechnung vorschlagen“ aus der Teilabnahme (Betragsvorschlag, „Vertragsgrundlage wählen“) und Muster-Tabelle; Berichte mit „Rechnung aus Bericht erstellen“/„Sammelabrechnung“ und wörtlichen Sperrgründen; Storno mit „Stornogrund (Pflicht)“, „Rechnung neu ausstellen“ und Korrekturweg abgerechneter Zeiten; E-Rechnung mit Menüweg, Pflichtangaben und § 13b-Abschnitt; Fertigstellen über „Dokument fertigstellen“, Dialoge „Pflichtangaben fehlen“/„Vor dem Festschreiben prüfen“, „Zahlungsziel“ und Mahnwesen positiv.
- **§ 13b (D-32):** Kundenschalter „Bauleister nach § 13b“, Rechnungsschalter „Rechnung nach § 13b (ohne USt.)“, Hinweistext, Steuerart je Rechnungsfolge, USt-IdNr. für die E-Rechnung – in rechnung-fertigstellen und e-rechnung-herunterladen ausführlich, in schlussrechnung, abschlag und angebot-in-rechnung als Querverweis.
- **Angebote (5, `8038545`):** gaeb-importieren von „falsch“ auf belegt (Formate nur positiv, „.x84 und .d83“, „Preise übernehmen“, „pauschale Unterstützung“ gestrichen, X84-Abgabe mit „Bieteradresse prüfen“ ergänzt, Inline /blog/gaeb-formate); Angebotsentwurf mit Versand und Online-Unterschrift (30 Tage, QR-Code); Positionssuche mit DATANORM-Katalogartikeln und „In Stammdaten übernehmen“; Raumaufmaß in Web und Mobile („Aufmaß“-Kachel, gleiche Daten).

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-d2.md --zitate --l1 --antwort` (Aufgabe 1: 7 Dateien) | 0 Befunde, 0 Hinweise |
| dto. (Paketende: 12 Dateien) | 0 Befunde, 1 Hinweis (kurzer Begriff „EP“, belegt als „EP (€)“ in `PositionCalculator.tsx` Z. 1518) |
| `npx vitest run tests/content-produktwahrheit.test.ts` (je Aufgabe) | 10 von 10 grün |
| `npx vitest run tests/content.test.ts` unter Sperre (je Aufgabe) | 34 von 34 grün |
| `npm run typecheck`, `npm run lint` (je Aufgabe) | 0 Fehler |
| Paketende unter Sperre: `npm run build` | grün |
| `seo-audit.mjs --paths=<12 Pfade>` (alle 12 Regeln) | 0 Verstöße |
| Akzeptanz-Greps | faq 1, „Erst nach Abnahme möglich“ 2, `answer:` und „## Häufige Probleme“ je 1 in allen 12; gaeb „.x84 und .d83|Preise übernehmen|pauschale“ 0, „3.3“ 3, „X84“ 7; „vorbereitete Leistungsvorlagen“ 0; 09-d2.md 12 Zeilen `| hilfe/` und „Übergabeliste“ |

## Task Commits

1. **Aufgabe 1: Schlussrechnung und Rechnungen (7)** – `d3a00b5`
2. **Aufgabe 2: Angebote (5), Prüfdatei, Paketende** – `8038545`

## Decisions Made

Siehe `key-decisions` oben. Zusätzlich: Inline-Links auf noch anzulegende Slugs (`/hilfe/regiebericht`, `/hilfe/mahnwesen-einrichten`, `/hilfe/angebot-online-unterschreiben-lassen`, `/hilfe/datanorm-katalog-importieren`, `/blog/gaeb-formate`) nur in der Prosa; `relatedArticles` verweisen ausschließlich auf vorhandene Dateien, gewünschte Ergänzungen in der Übergabeliste.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – sachlicher Fehler] Frontmatter-`description` von `hilfe/gaeb-importieren`**
- **Befund:** „Preisübernahme vor dem Import“ beschreibt einen Schritt, den der GAEB-Dialog nicht hat (09-15 Pitfall 2).
- **Fix:** „… Positionsauswahl und Mengen vor dem Import … und geben Angebote als X84 ab.“ Map-Description bleibt unverändert (D-12).
- **Commit:** `8038545`

**2. [Rule 2 – SEO-Keyword] Muster-Tabelle in `hilfe/abschlagsrechnung-erstellen`**
- **Befund:** Map-Keyword „abschlagsrechnung muster“ und Map-Description „mit Muster“, Artikel ohne Muster.
- **Fix:** Frage-H2 „Welche Angaben gehören in eine Abschlagsrechnung?“ mit GFM-Tabelle (Pflichtangaben laut Feldhinweis in `PauschalAbschlagFields.tsx`). In Aufgabe 2 committet, obwohl die Datei zu Aufgabe 1 gehört.
- **Commit:** `8038545`

**3. [Release-Befund] Fertigstellen-Weg**
- **Befund:** Die Schaltfläche „Fertigstellen“ in den Dokumentdetails erscheint nicht im Entwurfsstatus (`DocumentDetail.tsx` Z. 701); der Entwurf wird im Editor über „Weitere Aktionen“ → „Dokument fertigstellen“ festgeschrieben.
- **Fix:** Schrittlisten in rechnung-fertigstellen danach ausgerichtet.

**4. [Prozess] Hängender Hilfsprozess**
- Ein Shell-Aufruf mit `python` (Windows-Platzhalter) blieb hängen; nur der eigene Prozess (PID per Elternprozess und Startzeit geprüft) wurde beendet. Die Ersetzung lief danach korrekt; keine Auswirkung auf Inhalte.

---

**Total deviations:** 2 Auto-Fixes, 1 Release-Befund, 1 Prozessvorfall. **Impact:** keine Regel abgeschwächt; Map, Tests und `lib/**` nicht angefasst (D-27).

## Deferred Issues

- Map-Korrekturen (Description rechnung-fertigstellen „GoBD-gerecht“, Hauptkeyword für berichte-abrechnen) und `relatedArticles` auf neue Slugs: Übergabeliste in `09-d2.md` an 09-09.
- `liveExtras` für § 13b weiterhin bei 09-09.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche (nur Markdown, keine Roh-HTML-Blöcke). T-09-17: jeder Bedienbegriff mit Belegpfad am eingefrorenen Release, GAEB-Formate nur positiv laut `GAEBImportDialog.tsx`. T-09-37: Rechts- und Steuerquellen nur https mit `checkedAt` 2026-10-23, Hinweis auf Steuerberatung statt Rechtsrat. T-09-18: Sanitizing aus 09-01 unverändert, content.test grün.

## Next Phase Readiness

- Kein Merge nach main, kein Push; STATE.md und ROADMAP.md unverändert (Worktree-Regel).
- Sperre frei, Port 3109 frei, kein Server und kein Hintergrundprozess aktiv.

## Self-Check: PASSED

Dateien `craftos/docs/content-pruefung/09-d2.md` und die 12 Artikel vorhanden; Commits `d3a00b5`, `8038545` im Branch `phase09-spur-d2`.
