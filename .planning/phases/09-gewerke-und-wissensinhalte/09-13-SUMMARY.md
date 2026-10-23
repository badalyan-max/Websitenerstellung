---
phase: 09-gewerke-und-wissensinhalte
plan: 13
subsystem: gewerke
tags: [gewerke, paket-a, weiterlesen, neue-artikel, links]
requires:
  - "09-11: Gewerke Teil 2 mit Abschnitt „Weiterlesen“ aus g.artikel und tests/gewerke.test.ts"
  - "09-07 (f): neue Hilfeartikel DATANORM-Katalog, Lager-Scan-App (Kassenbuch nur als Entwurf)"
  - "09-08 (g): Wissensseite /blog/bauablaufplan, Regiebericht-Anleitung"
  - "09-17 (d2): /hilfe/angebot-online-unterschreiben-lassen, /hilfe/mahnwesen-einrichten im geprüften Stand"
provides:
  - "Gewerke-„Weiterlesen“ verlinkt die neuen Anleitungen und Wissensseiten (sechs Gewerke geändert, je drei Ziele)"
  - "Testschutz: kein Artikelziel mit draft: true, Kassenbuch-Entwurf nicht verlinkt, Zielliste je geändertem Gewerk"
  - "Paket (a) Gewerke abgeschlossen (Übergabeliste 09-a erledigt)"
affects: [09-09, 09-16]
tech-stack:
  added: []
  patterns:
    - "Entwurfsschutz im Datentest: Frontmatter der Artikelziele muss draft: false enthalten (die Seite würde sonst beim Build werfen)"
key-files:
  created: []
  modified:
    - craftos/lib/gewerke.ts
    - craftos/tests/gewerke.test.ts
    - craftos/docs/content-pruefung/09-a.md
decisions:
  - "Zuordnung nach 09-RESEARCH „Ablauf je Gewerk“, Spalte „Artikel-Links“; zusätzlich zur Übergabeliste Metallbau → /hilfe/lager-scan-app (Research-Spalte, passt wörtlich zur Barcode-FAQ)."
  - "Reihenfolge der Ziele folgt dem Ablauf der Gewerke-Seite; je Gewerk bleiben drei Ziele, ersetzt wurde das am wenigsten passende bisherige."
  - "/hilfe/kassenbuch-fuehren (draft: true) bleibt unverlinkt bis 09-09; ein neuer Test verhindert Entwürfe als Ziel."
metrics:
  duration: "ca. 20 Min."
  completed: 2026-10-23
requirements-completed: []
---

# Phase 9 Plan 13: Gewerke Teil 3 (Links auf die neuen Artikel) Summary

Sechs Gewerke-Seiten verlinken unter „Weiterlesen“ jetzt die neuen Anleitungen und Wissensseiten aus (f), (g) und (d2): DATANORM-Katalog und Lager-Scan-App beim Elektriker, Online-Unterschrift bei SHK, Regiebericht beim Dachdecker, Lager-Scan-App beim Metallbau, Ratgeber Bauablaufplan beim Bauunternehmen und Mahnwesen einrichten beim Allrounder. Jedes Gewerk hat weiterhin drei veröffentlichte Ziele; der Kassenbuch-Entwurf ist nicht verlinkt.

## Ausführung

- Start: `git merge --no-edit main` in `phase09-spur-a` (bringt 09-03 bis 09-08, 09-12, 09-17, 09-18); Startprüfung: alle fünf Plan-Zieldateien vorhanden, dazu `/hilfe/angebot-online-unterschreiben-lassen` (`draft: false`).
- **RED** (`a1281a8`): `tests/gewerke.test.ts` um Zielliste je geändertem Gewerk, Entwurfsschutz (`draft: false` je Ziel) und „Kassenbuch nicht verlinkt“ ergänzt; 6 von 55 Fällen rot (genau die sechs Ziellisten).
- **GREEN** (`688a397`): `artikel` in `lib/gewerke.ts` für sechs Gewerke gesetzt, Prüfdatei `docs/content-pruefung/09-a.md` nachgeführt (Artikelspalte, Übergabeliste erledigt, neuer Abschnitt „Durchsicht 09-13“ mit Begründung je Gewerk).

| Gewerk | Ziele nach 09-13 | Ersetzt |
|---|---|---|
| elektriker | /hilfe/datanorm-katalog-importieren, /hilfe/plantafel-einsatz-planen, /hilfe/lager-scan-app | material-entnehmen-zurueckbuchen, blog/projektbezogene-zeiterfassung |
| shk | /hilfe/angebot-online-unterschreiben-lassen, /hilfe/abnahme-dokumentieren, /hilfe/abschlagsrechnung-erstellen | projekt-phasen-anlegen |
| dachdecker | /hilfe/gaeb-importieren, /hilfe/regiebericht, /hilfe/schlussrechnung-erstellen | bautagesbericht-erstellen |
| metallbau | /hilfe/projektdateien-ordner, /hilfe/lager-scan-app, /blog/projektbezogene-zeiterfassung | material-entnehmen-zurueckbuchen |
| bauunternehmen | /hilfe/projekt-phasen-anlegen, /blog/bauablaufplan, /hilfe/abnahme-dokumentieren | blog/digitale-bautagesberichte |
| allrounder | /hilfe/plantafel-einsatz-planen, /hilfe/berichte-abrechnen, /hilfe/mahnwesen-einrichten | blog/zahlungserinnerung-mahnung-handwerk |

Unverändert: maler, tischler-schreiner, fliesenleger, zimmerer, galabau, trockenbau. Keine Seite und kein Artikel gelöscht.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `tests/gewerke.test.ts` | 55/55 grün (RED vorher 49/55) |
| `tests/content.test.ts` (unter Sperre) | 34/34 grün |
| `npm run typecheck` / `npm run lint` | Exitcode 0 / 0 |
| `npm run build` (unter Sperre) | Exitcode 0 |
| `seo-audit.mjs` der 13 Gewerke-Pfade (unter Sperre, `MSYS_NO_PATHCONV=1`) | Exitcode 0, 0 Verstöße |
| Akzeptanz-grep neue Ziele in `lib/gewerke.ts` | 6 (gefordert ≥ 4) |
| Build-HTML `#weiterlesen` der sechs Gewerke | Links in der Reihenfolge von `g.artikel`; kein `kassenbuch` in `/gewerke/*.html` |

Sperre nur für content.test sowie Build und Audit gehalten und jeweils sofort freigegeben; kein Server gestartet, Port 3102 frei.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Fehlende Absicherung] Entwurfsschutz für Artikelziele**
- **Found during:** Aufgabe 1 (RED)
- **Issue:** Der bestehende Test prüfte nur die Existenz der Datei. Ein Entwurf (z. B. `kassenbuch-fuehren`, `draft: true`) hätte ihn bestanden, die Seite aber beim Build werfen lassen (`getContentList` filtert Entwürfe).
- **Fix:** Test „kein Artikelziel ist ein Entwurf“ (Frontmatter `draft: false`) und „Kassenbuch nicht verlinkt“.
- **Files modified:** craftos/tests/gewerke.test.ts
- **Commit:** a1281a8

**2. Metallbau zusätzlich geändert**
- Die Übergabeliste nannte Metallbau nicht, 09-RESEARCH (Spalte „Artikel-Links“) aber `lager-scan-app`; die Metallbau-FAQ beschreibt genau diesen Barcode-Ablauf. Begründung in 09-a.md festgehalten.

## Known Stubs

Keine.

## Hinweise für Folgepläne

- **09-09:** Nach Veröffentlichung von `/hilfe/kassenbuch-fuehren` ist kein Gewerke-Link vorgesehen; der Test „Kassenbuch nicht verlinkt“ müsste bei einer späteren Verlinkung bewusst angepasst werden.
- **09-16:** sitewide route-audit prüft die neuen Gewerke-Links zusätzlich.
- `/blog/zahlungserinnerung-mahnung-handwerk` und `/blog/digitale-bautagesberichte` sind jetzt von keiner Gewerke-Seite mehr verlinkt (weiter über Blog-Übersicht und Querverweise erreichbar).

## Self-Check: PASSED

- FOUND: craftos/lib/gewerke.ts, craftos/tests/gewerke.test.ts, craftos/docs/content-pruefung/09-a.md
- FOUND: a1281a8, 688a397
