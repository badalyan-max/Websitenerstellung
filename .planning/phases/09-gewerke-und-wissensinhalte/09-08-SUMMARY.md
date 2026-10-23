---
phase: 09-gewerke-und-wissensinhalte
plan: 08
subsystem: inhalte-wissensseiten
tags: [inhalt, paket-g, seo-09, wissensseiten, answer-first, faqpage, quellen, vob, ustg, gaeb-formate]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01 Inhaltsvertrag (answer, faq, Listenobergrenzen, Prosa-Regeln, L-1-Wortliste, Antwortregel /blog/* und /hilfe/*), Map-Einträge der neun Pfade; 09-15 eingefrorene Basis (Web 6686d05, Mobile 837aab4f) und scripts/content-pruefen.mjs"
provides:
  - "Neun SEO-09-Wissensseiten (3 Hilfe, 6 Ratgeber) mit answer, 4 FAQ je Seite, Frage-Überschriften mit Antwort ≤ 300 und Quellen mit Abrufdatum 23.10.2026"
  - "Sichtbare Vorlagen als GFM-Tabellen (Regiebericht, Bedenkenanzeige, Materialliste, Arbeitszeitnachweis) ohne Downloads"
  - "Prüfdatei docs/content-pruefung/09-g.md mit neun Artikelzeilen, Quellenliste, Vermerken zu A2/A3 und Übergabeliste"
affects: [09-09, 09-10, 09-12, 09-17]

tech-stack:
  added: []
  patterns:
    - "VOB/B nur unter „Bei vereinbarter VOB/B“ mit Quelle (VOB/B 2016, Fachinformation Bundesbau/BMWSB) plus Hinweis auf Prüfung im Einzelfall"
    - "Quellen-PDF nur in Frontmatter sources, nicht als Inline-Link in der Prosa"
    - "In answer keine Abkürzungen mit Punkt (Abs., Nr.), weil sentenceCount jeden Punkt vor Leerraum zählt – „Absatz“, „Nummer“ ausgeschrieben"

key-files:
  created:
    - craftos/content/hilfe/leistungszeitraum-rechnung.md
    - craftos/content/hilfe/regiebericht.md
    - craftos/content/hilfe/bedenkenanzeige.md
    - craftos/content/blog/maengelanzeige.md
    - craftos/content/blog/reverse-charge-bauleistungen.md
    - craftos/content/blog/gaeb-formate.md
    - craftos/content/blog/materialliste-vorlage.md
    - craftos/content/blog/bauablaufplan.md
    - craftos/content/blog/arbeitszeitnachweis-vorlage.md
    - craftos/docs/content-pruefung/09-g.md
  modified: []

key-decisions:
  - "Phase 9 (09-08): VOB/B-Paragraphen (§ 4 Abs. 3, § 5 Abs. 1, § 13 Abs. 3–5, § 15 Abs. 3–4) am Volltext der VOB/B 2016 auf fib-bund.de (Herausgeber u. a. BMWSB als DVA-Geschäftsstelle) bestätigt und nur für vereinbarte VOB/B verwendet"
  - "Phase 9 (09-08): BAG 1 ABR 22/21 an der Entscheidungsseite des Bundesarbeitsgerichts bestätigt; nur Leitsatz 1 verwendet"
  - "Phase 9 (09-08): ÖNORM B 2110 nicht abgerufen, daher nur „für Österreich“ ohne Normstelle"
  - "Phase 9 (09-08): Mängelanzeige ohne Produktzusage, CraftOS-Abschnitt nur Mängelmanagement mit Links"
  - "Phase 9 (09-08): materialliste-vorlage ohne Rechtsquelle (sources: []), Vermerk in 09-g.md"

requirements-completed: []

duration: 95min
completed: 2026-10-23
---

# Phase 9 Plan 08: SEO-09-Wissensseiten Summary

**Neun neue Wissensseiten mit Antwort zuerst, Frage-Überschriften, je vier FAQ und amtlichen Quellen mit Abrufdatum (UStG, UStDV, BGB, MiLoG, ArbZG, SchwarzArbG, VOB/B 2016, BAG, gaeb.de). Produktbezug nur mit Beleg aus Web 6686d05 und Mobile 837aab4f. GAEB nennt im CraftOS-Abschnitt nur X83 und X84, die Mängelanzeige verweist nur auf das Mängelmanagement.**

## Performance

- **Duration:** ca. 95 min (inkl. Wartezeit auf die Sperre)
- **Started:** 2026-10-23T00:13Z
- **Completed:** 2026-10-23T01:45Z
- **Tasks:** 3 von 3
- **Files:** 10 neu, keine fremde Datei geändert

## Startgate

| Bedingung | Ergebnis |
|---|---|
| Worktree `C:/Projekte/wt-09g`, Branch `phase09-spur-g`, auf `main` 682d86b | ok (kein Merge nötig) |
| `craftos/docs/content-pruefung/09-basis.md` und `craftos/scripts/content-pruefen.mjs` in HEAD | ok |
| `npm ci --prefer-offline` in `craftos/` unter der Sperre | ok (Exit 0; Wartezeit hinter 09-17) |
| Koordinationsstatus gelesen | ok; kein Website-Rezept, daher lokal und einzeln |

## Accomplishments

- **Aufgabe 1 (`07e04ae`): Hilfe-Wissensseiten.** In `leistungszeitraum-rechnung` stehen § 14 Abs. 4 Nr. 6 UStG, der Kalendermonat nach § 31 Abs. 4 UStDV, die Anzahlung und die Steuerentstehung nach § 13 Abs. 1 Nr. 1 UStG, dazu eine Beispieltabelle. Belegt sind die Felder „Leistung“, „Zeitraum“ und „Einzelner Tag“, die Prüfung „Pflichtangaben fehlen“ sowie die Vorbelegung aus den Berichtstagen. `regiebericht` enthält eine Vorlage als Tabelle und VOB/B § 15 Abs. 3 und 4. Beschrieben sind die Web-Vorlage „Regiebericht“ und der mobile „Stundenbericht“ mit „Erfasste Zeiten übernehmen“ und „Bauherr unterschreibt“, außerdem „Rechnung aus Bericht erstellen“. `bedenkenanzeige` behandelt VOB/B § 4 Abs. 3 und § 13 Abs. 3 und bietet Muster und Checkliste als Tabelle. Beschrieben sind „Rechtsgrundlage“, „Sachverhalt“, „Adressat / Auftraggeber“ und das PDF.
- **Aufgabe 2 (`125e47e`): Ratgeber.** `maengelanzeige` enthält eine Checkliste, eine Fristentabelle nach § 634a BGB und § 13 Abs. 4 VOB/B, die schriftliche Rüge nach § 13 Abs. 5 VOB/B, sieben Reaktionsschritte und die Selbstvornahme nach § 637 BGB. Produktbezug gibt es nur über das Mängelmanagement. `reverse-charge-bauleistungen` behandelt § 13b Abs. 2 Nr. 4 und Abs. 5, § 14a Abs. 5 und § 14 UStG mit einer Beispielrechnung, grenzt sie nach § 6a und § 14a Abs. 3 von der innergemeinschaftlichen Lieferung ab und enthält eine Prüfliste. Belegt sind „Bauleister nach § 13b“, „Rechnung nach § 13b (ohne USt.)“ und der Pflichthinweis (D-32). `gaeb-formate` ist eine neutrale Fachübersicht nach gaeb.de: Generationen und Endungen, D83, Phasen X80–X87 sowie X89 und X89B, X83 und das Öffnen der Dateien. Der CraftOS-Abschnitt nennt nur den Import X83 (DA XML 3.2/3.3, 5 MiB, UTF-8) und den Export X83 und X84.
- **Aufgabe 3 (`fe5ea5b`): Ratgeber und Prüfdatei.** `materialliste-vorlage` bietet Kopf- und Positionsvorlage als Tabellen, eine Mengenableitung und eine Checkliste. Belegt sind „Materialliste drucken (ohne Preise)“, „Material je Position“ und „Gesamtmengen“. `bauablaufplan` beantwortet die Fragen aus den Fragen-Daten, zeigt einen Beispielablauf als Tabelle und nennt VOB/B § 5 Abs. 1. Belegt sind „Terminplanung“, „Abschnitt anlegen“, „Reihenfolge“ und „Zeitleiste“; „Bauphasen“ steht nur als Suchbegriff. `arbeitszeitnachweis-vorlage` enthält eine Vorlage als Tabelle und nennt § 17 MiLoG mit § 2a SchwarzArbG, § 16 Abs. 2 ArbZG und BAG 1 ABR 22/21. Belegt sind der Export aus „Zeiten“ und der „Zeiten-Nachweis (CSV)“. Die Prüfdatei 09-g.md ist mit neun Zeilen, Quellenliste, Vermerken und Übergabeliste abgeschlossen.

## Task Commits

1. **Aufgabe 1:** `07e04ae` feat(09-08): Hilfe-Wissensseiten Leistungszeitraum, Regiebericht, Bedenkenanzeige
2. **Aufgabe 2:** `125e47e` feat(09-08): Ratgeber-Wissensseiten Maengelanzeige, Reverse Charge, GAEB-Formate
3. **Aufgabe 3:** `fe5ea5b` feat(09-08): Wissensseiten Materialliste, Bauablaufplan, Arbeitszeitnachweis; Pruefdatei abgeschlossen

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen docs/content-pruefung/09-g.md --zitate --l1 --antwort` (je Aufgabe, am Ende über alle 9 Dateien) | 9 Dateien, 0 Befunde, 0 Hinweise, Exit 0; Zitat-Ausnahmen: keine |
| `content-produktwahrheit`, `keyword-map`, `ai-prompts` (Aufgabe 3) | 3 Dateien, 41 von 41 grün |
| `tests/content.test.ts` unter Sperre (je Aufgabe) | 34 von 34 grün (letzter Lauf mit Standardreporter bestätigt) |
| `npm run typecheck`, `npm run lint` (je Aufgabe) | 0 Fehler |
| Paketende unter Sperre: `npm run build` | grün |
| Paketende unter Sperre: `seo-audit.mjs --paths=<9 Pfade>` (MSYS_NO_PATHCONV=1) | alle 12 Regeln 0 Verstöße, Exit 0 |
| gaeb-formate, Abschnitt „So unterstützt CraftOS“ (Node-Einzeiler) | D83 = 0, GAEB 90 = 0, GAEB 2000 = 0 |
| `grep -ciE "Mängelanzeige (erstellen\|schreiben) in CraftOS\|Vorlage für Mängelanzeigen" blog/maengelanzeige.md` | 0 |
| `grep -c "gesetze-im-internet.de" hilfe/leistungszeitraum-rechnung.md` | ≥ 1 (3 Quellen plus Inline-Links) |
| `grep -c "\|"` materialliste-vorlage / arbeitszeitnachweis-vorlage | 18 / 10 Zeilen (sichtbare Tabellen); keine Links auf .docx, .xlsx oder .pdf |
| relatedFeatures / relatedArticles je Datei | höchstens 3 / höchstens 4 (alle neun) |

## Decisions Made

- **VOB/B-Quelle:** Für die VOB/B gibt es keine Seite auf gesetze-im-internet.de, weil sie kein Gesetz ist. Bestätigt wurde sie am Volltext der VOB/B 2016 auf fib-bund.de. Die Fachinformation Bundesbau wird von BMWSB, BMVg und BImA herausgegeben, das BMWSB ist Vorsitz und Geschäftsstelle des DVA. Die amtliche Bekanntmachung ist BAnz AT 19.01.2016 B3 / 01.04.2016 B1. Verwendet wurden nur wörtlich geprüfte Absätze, jeweils mit „bei vereinbarter VOB/B“.
- **BAG 1 ABR 22/21:** An der Primärquelle bestätigt: Seite des Bundesarbeitsgerichts mit ECLI, Datum und Leitsatz. Verwendet wurde nur Leitsatz 1, ohne Aussage zur Form der Erfassung.
- **Kein Rechtsrat:** Einzelfälle laufen über „Lassen Sie im Einzelfall … prüfen“. Ohne vereinbarte VOB/B wird keine Hinweispflicht mit Paragraph behauptet.
- **L-1:** Keine Negativlisten. Die Grenze für Privatkunden bei § 13b steht positiv („weisen die Umsatzsteuer wie gewohnt aus“). Die preisfreie Materialliste ist als Zweck beschrieben („Für das Team …“).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] Antwortlänge Bedenkenanzeige**
- **Found during:** Aufgabe 1 (content-pruefen `--antwort`)
- **Issue:** `answer` hatte 316 Zeichen und lag damit über der Grenze von 300.
- **Fix:** Die Antwort ist auf 295 Zeichen gekürzt, der Inhalt bleibt gleich.
- **Files modified:** craftos/content/hilfe/bedenkenanzeige.md
- **Commit:** `07e04ae`

**2. [Rule 3 – blockierend] relatedArticles auf noch nicht vorhandene Ratgeber**
- **Found during:** Aufgabe 1
- **Issue:** `tests/content.test.ts` verlangt, dass jedes Ziel in `relatedArticles` existiert. `/blog/maengelanzeige` und `/blog/reverse-charge-bauleistungen` entstanden erst in Aufgabe 2.
- **Fix:** In Aufgabe 1 standen vorübergehend Bestandsartikel in der Liste, in Aufgabe 2 wurden sie durch die neuen Ratgeber ersetzt.
- **Commits:** `07e04ae`, `125e47e`

**3. [Präzisierung] Inline-Links auf das VOB/B-PDF entfernt**
- **Found during:** Aufgabe 3 (Akzeptanzprüfung „kein Link auf .docx, .xlsx oder .pdf“)
- **Issue:** Drei Seiten verlinkten in der Prosa das PDF der VOB/B. Das ist keine Vorlage, ähnelt aber den untersagten Download-Links.
- **Fix:** Das PDF steht nur noch in Frontmatter `sources` (Quellenliste), die Prosa nennt den Paragraphen ohne Link.
- **Files modified:** hilfe/regiebericht.md, hilfe/bedenkenanzeige.md, blog/bauablaufplan.md
- **Commit:** `fe5ea5b`

**4. [Präzisierung] Plan-Leitfaden „Regiebericht – Zusatzarbeiten & Stunden“**
- Im Release sind Name („Regiebericht“) und Hinweis („Zusatzarbeiten & Stunden“) zwei getrennte Texte (`reportTypeMeta.ts`). Beide werden einzeln zitiert, damit die Zitatprüfung sie wörtlich findet. Das gilt ebenso für „Bedenkenanzeige“ und „Rechtliche Bedenkenmeldung“.

**5. [Präzisierung] Leistungszeitraum-Beleg**
- Der im Plan genannte Hinweis „Pflichtangaben im Belegtext …“ (`DocumentCanvas.tsx` Z. 1597) gilt nur für Pauschal-Abschläge. Für Rechnungen allgemein tragen die Feldgruppe `ServicePeriodFields.tsx` und die Prüfung `invoiceMandatoryFields.ts` („Leistungszeitpunkt bzw. -zeitraum fehlt“). Darauf stützt sich der Artikel.

---

**Total deviations:** 2 Auto-Fixes, 3 Präzisierungen. **Impact:** keine Regel abgeschwächt, kein fremder Dateibesitz berührt.

## Issues Encountered

- Vitest schreibt beim gezielten Einzellauf von `tests/content.test.ts` keinen neuen JSON-Bericht nach `.vitest/json/output.json`. Die Auswertung der JSON-Datei zeigte deshalb den vorherigen Lauf. Maßgeblich waren Exitcode 0 und zur Bestätigung ein Lauf mit `--reporter=default`: 34 von 34 grün.
- Die Sperre war zu Beginn durch 09-17 (npm ci) belegt. Gewartet wurde mit der Warteschleife, eine fremde Sperre wurde nicht angefasst.

## Known Stubs

Keine in den Inhalten. Ein Hinweis zur Darstellung: Die Vorlage `components/content/ArticlePage.tsx` auf `main` rendert `answer` (`#antwort`) und die Frontmatter-FAQ (FAQPage) noch nicht. Das liefert die v2-Artikelvorlage aus 09-12 (D-17). Im aktuellen Build sind deshalb Tabellen (`table-scroll`) und die Quellenliste sichtbar, Antwort-Kasten und FAQ aber noch nicht. Die Inhalte sind vollständig im Frontmatter hinterlegt, `seo-audit` ist mit 0 Verstößen grün.

## Threat Flags

Keine neue Angriffsfläche. Zu T-09-24: Rechtsaussagen stammen nur aus abgerufenen https-Quellen mit Datum, nicht bestätigte Normen wie die ÖNORM entfallen, und es gibt keinen Rechtsrat. Zu T-09-25: Alle Quellen nutzen https und sind amtlich oder halbamtlich (gesetze-im-internet.de, bundesarbeitsgericht.de, fib-bund.de, gaeb.de); die Validierung in `lib/content.ts` ist grün. Zu T-09-26: Die Mängelanzeige enthält keine Dokumentzusage, GAEB nennt nur X83 und X84, die Belege stehen in 09-g.md.

## Next Phase Readiness

- 09-09 (Integration) bekommt die Übergabeliste in `craftos/docs/content-pruefung/09-g.md`. Sie enthält den Map-Status der neun Pfade (Wechsel auf „bestehend“), gewünschte `relatedArticles` in Bestandsartikeln, optionale Weiterlesen-Links von `/funktionen/gaeb` und `/funktionen/maengelmanagement` sowie den Hinweis an 09-17 zu § 13b.
- Sitewide-Audit und Linkcheck macht 09-09 bzw. 09-16. Die neun Pfade sind mit `--paths` bereits ohne Verstoß.
- STATE.md und ROADMAP.md sind bewusst nicht geändert (Worktree-Regel). Es gibt keinen Merge in main und keinen Push.

## Self-Check: PASSED

Alle 10 neuen Dateien sind vorhanden. Die Commits `07e04ae`, `125e47e` und `fe5ea5b` liegen im Branch `phase09-spur-g`.
