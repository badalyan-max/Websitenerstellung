---
phase: 09-gewerke-und-wissensinhalte
plan: 03
subsystem: content-ratgeber
tags: [inhalt, paket-b, ratgeber, rechnungen, kalkulation, softwareauswahl, schlussrechnung, leitlinie-l1]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: Frontmatter answer/faq, prosaProbleme, Antwortregel /blog/*; 09-15: eingefrorene Basis Web 6686d05e / Mobile 837aab4f, scripts/content-pruefen.mjs"
provides:
  - "12 Ratgeber (rechnungen 4, kalkulation 4, softwareauswahl 4) answer-first nach D-13, gegen Release 6686d05e/837aab4f belegt, L-1-konform"
  - "/blog/abschlagsrechnung-schlussrechnung mit sichtbarer FAQ (5 Fragen) und FAQPage (SEO-09, D-22)"
  - "craftos/docs/content-pruefung/09-b.md mit Belegpfaden je Artikel, Pflichtquellen, Zitatprüfung und Übergabeliste"
affects: [09-09, 09-16, 09-07, 09-14]

tech-stack:
  added: []
  patterns:
    - "Beispielsätze und fiktive Projektnamen nicht in „…“ setzen – jedes Zitat ist ein Bedienbegriff mit Release-Beleg (keine Zitat-Ausnahmen nötig)"
    - "Antwort-Frontmatter ohne Abkürzungspunkte (sentenceCount zählt „1. Mahnung“ und „Abs. 5“ als Satzende)"

key-files:
  created:
    - craftos/docs/content-pruefung/09-b.md
  modified:
    - craftos/content/blog/abschlagsrechnung-schlussrechnung.md
    - craftos/content/blog/handwerkerrechnung-schreiben.md
    - craftos/content/blog/xrechnung-zugferd-pdf-unterschiede.md
    - craftos/content/blog/zahlungserinnerung-mahnung-handwerk.md
    - craftos/content/blog/aufmass-angebot-mengen-abzuege.md
    - craftos/content/blog/handwerkerangebot-erstellen.md
    - craftos/content/blog/stundenverrechnungssatz-berechnen.md
    - craftos/content/blog/tiefenkalkulation-handwerk.md
    - craftos/content/blog/handwerkersoftware-auswaehlen.md
    - craftos/content/blog/handwerkersoftware-einzelunternehmen.md
    - craftos/content/blog/handwerkersoftware-wechseln.md
    - craftos/content/blog/web-app-baustellen-app.md

key-decisions:
  - "Phase 9 (b): Beispielzitate ohne Bedienbezug aus „…“ genommen statt als Zitat-Ausnahmen geführt – 09-b.md hat keine Ausnahmen"
  - "Phase 9 (b): BMF-FAQ E-Rechnung war erreichbar (Stand März 2026); zusätzlich § 27 Abs. 38 UStG als Primärquelle"
  - "Phase 9 (b): Nicht belegte „Leistungsvorlagen“/„Angebotsvorlagen“ durch belegte Stammdaten („Leistungen“, „Artikel“, DATANORM-Kataloge) ersetzt"
  - "Phase 9 (b): Map-Description von /blog/handwerkerrechnung-schreiben („Lohnanteil“) passt nicht zum Inhalt – Übergabe an 09-09"

requirements-completed: []

duration: 50min
completed: 2026-10-23
---

# Phase 9 Plan 03: Paket (b) Ratgeber 1 Summary

**Zwölf Ratgeber zu Rechnungen, Kalkulation und Softwareauswahl answer-first neu gegliedert, gegen Web 6686d05e / Mobile 837aab4f belegt und nach L-1 formuliert; die Schlussrechnung hat jetzt eine sichtbare FAQ mit FAQPage (SEO-09), alle Rechtsquellen sind am 23.10.2026 neu abgerufen.**

## Performance

- **Duration:** ca. 50 min
- **Started:** 2026-10-22T23:55Z (Worktree frisch von main 682d86b, `git merge main` bereits aktuell, Basisdateien vorhanden)
- **Completed:** 2026-10-23T00:45Z
- **Tasks:** 3 von 3
- **Files:** 1 neu, 12 geändert

## Accomplishments

- **Rechnungen (`35c94b0`):** `abschlagsrechnung-schlussrechnung` mit `answer`, FAQ (Fälligkeit nach § 650g BGB, Inhalt nach § 14 Abs. 5 UStG, Prüffähigkeit, Abschlagshöhe nach § 632a BGB, Abschlag nach Teilabnahme) und neuem CraftOS-Abschnitt (Rechnungstypen, „Abschlagsrechnung vorschlagen“ aus der Teilabnahme mit „Betrag (Vorschlag, netto)“, „Abnahme übernehmen“, „Erst nach Abnahme möglich“). `handwerkerrechnung-schreiben` mit Leistungszeitraum, § 13b-Schalter (D-32) und Links auf die Wissensseiten. `xrechnung-zugferd-pdf-unterschiede`: Überschrift „im September 2026“ ersetzt durch zeitlose Frage zu den Übergangsfristen; Fristen aus BMF-FAQ (neu abgerufen) und § 27 Abs. 38 UStG. `zahlungserinnerung-mahnung-handwerk`: Negativsatz „Die Website verspricht keine …“ gestrichen, Schrittliste „Einstellungen → Mahnwesen“, „Mahnverlauf“, positiv „Automatische Mahnungen gelten für normale Rechnungen.“, § 288 BGB ergänzt.
- **Kalkulation (`033b8f5`):** Aufmaß auch in der Mobile-App („Räume vermessen“) und Besichtigung als Vorstufe; Angebot mit „Senden“, persönlichem Link zum Online-Unterschreiben (30 Tage, QR-Code), Stand unter „Online-Unterschrift“, DATANORM-Kataloge in der Positionssuche, GAEB X83; Stundensatz mit HWK-Quelle neu datiert und Lohngruppen; Tiefenkalkulation mit „Zuschläge & Margen“, „Preiskalkulation“, „Kostenzeilen (EK)“.
- **Softwareauswahl (`c92343a`):** Lizenzbegriffe nach `site.ts` (Voll-Lizenz Admin oder Büro mit Web-App und Mobile-App, App-Lizenz), 10 Testtage ohne Zahlungsdaten, Datenübernahme mit Formaten, Größen, Rolle, Dubletten und Rücknahme, DATANORM 4 und 5, fünf Rollen als Tabelle, Projekt-Chat und Direktnachrichten, 21 Sprachen, Offline-Absatz nach L-1-Muster. D-03-Links auf `/vergleich/handwerkersoftware-kleine-betriebe` unverändert.
- **Prüfdatei `09-b.md`:** 12 Zeilen `| blog/<slug> |` mit Status, Commits, Änderungen und Belegpfaden; Pflichtquellen mit geprüfter Aussage; Zitatprüfung (Ausgang 42 Befunde → 0); keine Zitat-Ausnahmen; Übergabeliste.

## Task Commits

1. **Aufgabe 1: Rechnungen** – `35c94b0` `feat(09-03): Rechnungs-Ratgeber answer-first, belegt und nach L-1`
2. **Aufgabe 2: Kalkulation** – `033b8f5` `feat(09-03): Kalkulations-Ratgeber answer-first und mit Release-Belegen`
3. **Aufgabe 3: Softwareauswahl, Prüfdatei, Paketende** – `c92343a` `feat(09-03): Softwareauswahl-Ratgeber mit Lizenzbegriffen, Datenübernahme und Rollen; Prüfdatei 09-b abgeschlossen`

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-b.md --zitate --l1 --antwort` (12 Dateien) | 0 Befunde, 0 Hinweise, Exit 0 (Ausgang vor der Überarbeitung: 42 Befunde) |
| `tests/content-produktwahrheit.test.ts` (je Aufgabe) | 10 von 10 grün |
| `tests/content.test.ts` unter Sperre (je Aufgabe) | 34 von 34 grün |
| `npm run typecheck`, `npm run lint` (je Aufgabe) | Exit 0 |
| Paketende unter Sperre: `npm run build` | grün |
| Paketende unter Sperre: `seo-audit.mjs --paths=<12 Pfade>` (alle 12 Regeln, inkl. `antwort`, `faq-schema`) | 0 Verstöße |
| Akzeptanz-Greps | `answer:` 12/12; `^faq:` = 1; „verspricht keine/Onlinezahlung/nicht unterstützt“ = 0; „Einstellungen → Mahnwesen“ = 2; „September 2026“ = 0; „Online-Unterschrift“ ≥ 1, „DATANORM“ ≥ 1; „kleine-betriebe“ je 1; „Admin-Lizenz|Büro-Lizenz“ je 0; 12 Zeilen `| blog/` und „Übergabeliste“ in 09-b.md |

## Decisions Made

- Beispielformulierungen (fiktive Räume, Projektnamen, Musterzitate) stehen nicht mehr in „…“. Damit ist jedes Zitat ein Bedienbegriff mit Release-Beleg, und 09-b.md braucht keine Zitat-Ausnahmen.
- Die BMF-FAQ zur E-Rechnung war am 23.10.2026 erreichbar (HTTP 200, Stand März 2026). Zusätzlich steht § 27 Abs. 38 UStG als Primärquelle im Artikel (Orchestrator-Entscheidung 4).
- Alle `checkedAt` der geänderten Quellen sind 2026-10-23. Neu sind § 650g BGB, § 632a BGB, § 288 BGB und § 27 UStG.
- `relatedFeatures`: `abschlagsrechnung-schlussrechnung` + `baudokumentation`, `zahlungserinnerung-mahnung-handwerk` `buchhaltung` → `bankabgleich`, `handwerkerangebot-erstellen` + `gaeb` (jeweils ≤ 3). `relatedArticles` nur auf bestehende Dateien (≤ 4); Wünsche auf neue Slugs stehen in der Übergabeliste. Die von 09-01 gekürzten Listen in `handwerkersoftware-wechseln` blieben unverändert.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Produktwahrheit] Nicht belegte „Leistungsvorlagen“ und „Angebotsvorlagen“**
- **Found during:** Aufgabe 2 und 3
- **Issue:** `handwerkerangebot-erstellen` („Bestehende Leistungsvorlagen sparen …“) und `handwerkersoftware-wechseln` („überprüften Angebotsvorlagen“) beschrieben Vorlagen, die am Release nicht als Nutzerfunktion belegt sind (vgl. Orchestrator-Entscheidung 5).
- **Fix:** Ersetzt durch Belegtes: „Stammdaten“ mit den Reitern „Leistungen“ und „Artikel“ (`src/pages/Stammdaten.tsx`) sowie DATANORM-Kataloge in der Positionssuche.
- **Commits:** `033b8f5`, `c92343a`

**2. [Rule 1 – L-1] Weitere Negativsätze außerhalb der Wortliste**
- **Found during:** Aufgabe 1 und 3
- **Issue:** Diese Sätze trafen kein Listenwort, verstießen aber gegen die Inhabervorgabe: „eine pauschale Zertifizierung … wird daraus nicht abgeleitet“ (handwerkerrechnung), „ohne ein pauschales Vollständigkeitsversprechen“ und „ersetzt aber keine strukturierte Rechnung“ (web-app-baustellen-app).
- **Fix:** Jeweils positiv formuliert.
- **Commits:** `35c94b0`, `c92343a`

**3. [Rule 1 – Beleg] § 13b und Leistungszeitraum in `handwerkerrechnung-schreiben`**
- Der Schalter „Rechnung nach § 13b (ohne USt.)“ ist seit test.242 live (D-32). Er ist in den Artikel aufgenommen, weil der Artikel den Steuerfall Reverse Charge behandelt. Der Hilfeartikel selbst bleibt bei 09-17.

### Abweichungen

- **Prüfdatei-Zeilenzählung:** Die Pflichtquellen-Tabelle führt den Artikel als Code (`` `slug` ``). Dadurch zählt `grep -c "^| blog/"` genau die 12 Prüfzeilen.

---

**Total deviations:** 3 Auto-Korrekturen (Produktwahrheit, L-1), 1 Formatentscheidung. **Impact:** Es wurde keine Regel abgeschwächt, und es gibt keine fremden Dateien im Diff.

## Geteilte Dateien

Es wurden keine geteilten Dateien angefasst: keine Map, keine Tests, keine `lib/**`, keine Vorlagen. Geändert sind nur die 12 Artikel aus `files_modified` und `docs/content-pruefung/09-b.md`.

## Übergabeliste (Kurzform, Details in 09-b.md)

- **09-09:** gewünschte `relatedArticles` auf neue Slugs (leistungszeitraum-rechnung, reverse-charge-bauleistungen, mahnwesen-einrichten, besichtigung-durchfuehren, angebot-online-unterschreiben-lassen, daten-importieren, datanorm-katalog-importieren, projekt-chat-nachrichten, app-sprache-einstellen).
- **09-09 (Map):** `/blog/handwerkerrechnung-schreiben` Description „Lohnanteil richtig darstellen“ passt nicht zum Inhalt.
- **09-07/09-14 (f):** Mahnwesen-Notiz in `lib/funktionen.ts` Z. 355 und `lib/funktionsdetails/rechnung.ts` Z. 287/319 positiv fassen („Automatische Mahnungen gelten für normale Rechnungen.“).

## Deferred Issues

Keine aus diesem Paket. Die bekannte rote `announcements.test.ts` (Paket a) wurde nicht berührt; die volle Suite lief nicht, laut Plan reichen die gezielten Dateien.

## Known Stubs

Keine.

## Threat Flags

Es gibt keine neue Angriffsfläche. T-09-13: Jeder Bedienbegriff hat einen Belegpfad in 09-b.md, die Quellen sind https mit neuem `checkedAt`, es gibt keinen Rechtsrat (Hinweise auf Steuerberatung bzw. rechtliche Prüfung) und L-1 ist geprüft. T-09-14: kein Roh-HTML, nur Markdown mit Tabellen, Listen und Zitatblöcken.

## Next Phase Readiness

- Paket (b) ist bereit für den Merge durch den Orchestrator. Der Branch `phase09-spur-b` hat 3 Task-Commits und 1 Doku-Commit.
- STATE.md und ROADMAP.md sind nicht geändert (Worktree-Regel). Es gab keinen Merge nach main und keinen Push.

## Self-Check: PASSED

Dateien `craftos/docs/content-pruefung/09-b.md` und `09-03-SUMMARY.md` vorhanden; Commits `35c94b0`, `033b8f5`, `c92343a` im Branch `phase09-spur-b`.
