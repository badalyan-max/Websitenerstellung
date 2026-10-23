---
phase: 10-abschlussaudit
fixed_at: 2026-10-23T17:10:00Z
review_path: .planning/phases/10-abschlussaudit/10-REVIEW.md
iteration: 1
findings_in_scope: 17
fixed: 14
skipped: 3
status: partial
---

# Phase 10: Bericht zur Behebung der Review-Befunde

**Behoben am:** 23.10.2026
**Quelle:** `.planning/phases/10-abschlussaudit/10-REVIEW.md`
**Durchlauf:** 1
**Arbeitsbaum:** Haupt-Arbeitsbaum `C:/Projekte/Websitenerstellung`, Branch `main`, auf Vorgabe des Orchestrators und ohne separaten Worktree. Grund: Die Prüfläufe benötigen die installierten `node_modules` und die gemeinsame Sperre `.heavy-lock`.

**Zusammenfassung:**
- Befunde im Umfang: 17 (HI-01, ME-01 bis ME-05, LO-01 bis LO-08, IN-01 bis IN-03)
- Behoben: 14
- Nicht anwendbar: 3 (LO-06, IN-02, IN-03)

## Status je ID

- HI-01: behoben – 89a7ac8
- ME-01: behoben – 24df2bf (enthält die Anpassung von 10-12-PLAN.md)
- ME-02: behoben – 32d6969
- ME-03: behoben – 5b4a9e2
- ME-04: behoben – 7098052
- ME-05: behoben – d957a02
- LO-01: behoben – 90c3170
- LO-02: behoben – dc0daa7
- LO-03: behoben – 29a88c3
- LO-04: behoben – bb19770
- LO-05: behoben – d61de11
- LO-06: nicht anwendbar – Rechtstext (AGB-Vorlagenhinweis). Rechtstexte werden laut Vorgabe nicht geändert; die Entscheidung liegt beim Inhaber (prüfen lassen oder Stand mit Datum).
- LO-07: behoben – 81a8c4f
- LO-08: behoben – b9b8fb6
- IN-01: behoben – 20c5f79, Nachbesserung 73da90d
- IN-02: nicht anwendbar – Der Befund ist optional und nicht trivial. Er betrifft Kachel-IDs, die Mega-Menü-Ziele und den Fragmentabgleich in `live-check.mjs:748`.
- IN-03: nicht anwendbar – Der Befund ist optional und nicht trivial. Nötig wären Vorwärm-Importe bzw. eine Messung der Ladeprüfungen über mehrere Testdateien; ein Fachfehler liegt nicht vor.

## Behobene Befunde

### HI-01: `a11y-audit --merge` meldet „Gate bestanden“ auch für Teil- und Altberichte

**Dateien:** `craftos/scripts/a11y-audit.mjs`, `craftos/scripts/lib/a11y-audit-core.mjs`, `craftos/tests/a11y-audit-core.test.ts`
**Commit:** 89a7ac8
**Umsetzung:** Jeder Teilbericht trägt jetzt:
- die Laufkennung `lauf` (`AUDIT_LAUF`, sonst `build-<.next/BUILD_ID>`),
- die Sollmenge vor dem Sharding (`soll.aufrufe`, `soll.seiten`),
- das Kennzeichen `gezielt`.

Läufe mit `--paths`, `--widths` oder `--engines` gelten als gezielt und schreiben nach `test-results/a11y/gezielt/`, den `--merge` nicht liest. Die neue Funktion `pruefeGesamtlauf()` lässt `--merge` mit Exit 3 abbrechen, wenn einer dieser Fälle vorliegt:
- ein Teilbericht im Altformat,
- ein gezielter Teilbericht,
- abweichende Laufkennung, Herkunft, Optionen oder Sollmenge,
- mehr als 12 Stunden Abstand zwischen den Teilen,
- Aufruf- oder Seitenzahl ungleich der Sollmenge.

Fünf neue Vitest-Fälle decken das ab.

### ME-01: Lighthouse-Modus prüft Accessibility 100 standardmäßig nicht und vermischt die Gates im Exitcode

**Dateien:** `craftos/scripts/lib/lighthouse-core.mjs`, `craftos/scripts/performance-audit.mjs`, `craftos/tests/lighthouse-core.test.ts`, `.planning/phases/10-abschlussaudit/10-12-PLAN.md`
**Commit:** 24df2bf
**Umsetzung:**
- Standardpfade: `GATE_ROUTEN`, `INFO_ROUTEN` und `/impressum`.
- Accessibility wird immer gemessen; `--kategorien=` ergänzt nur weitere Kategorien.
- Pro URL ist `gate` das Accessibility-Urteil. Eine fehlende Messung auf einer A11y-Gate-Seite gilt als Verstoß („Accessibility nicht gemessen“).
- Score und LCP stehen als `warnung` je URL und in der Liste `warnungen` (D-44).
- Exitcodes: 1 nur bei einem Accessibility-Verstoß. Eine reine Performance-Abweichung endet mit Exit 0 und einer Zeile „WARNUNG Performance (D-44, nicht blockierend)“.

**10-12-PLAN.md:** Angepasst wurde nur der Prüfschritt Lighthouse/A11y (must_have-Zeile, D-44-Nachtrag, Exit-Regeln W2, Aufgabe 2 action/verify/acceptance):
- B1, B2 und B3 müssen jetzt genau Exit 0 liefern (bisher B1/B2 „0 oder 1“).
- Die Pflicht zum Abschnitt „offene Abweichung“ bei B1 = 1 entfällt; Performance-Warnungen werden in § 5.3 berichtet.
- Die A11y-Matrix läuft als `--shard=k/5` ohne `--engines`. Der alte Ablauf (Chromium `k/4` plus WebKit ohne Shard) ließ sich schon vorher nicht zusammenführen (siehe 10-08-SUMMARY) und wäre nach HI-01 als gezielter Lauf abgelehnt worden.

### ME-02: Die Fokusbewertung zählt eine transparente Outline als sichtbaren Fokus

**Dateien:** `craftos/scripts/lib/a11y-audit-core.mjs`, `craftos/tests/a11y-audit-core.test.ts`
**Commit:** 32d6969
**Umsetzung:** `FOKUS_STIL` erfasst `outlineColor` und `outlineOffset`. Bewertet wird so:
- Eine Outline zählt nur mit nicht transparenter Farbe (`transparent`, `rgba(…, 0)` und `rgb(… / 0)` gelten als unsichtbar).
- Ein Schatten zählt nur mit sichtbarer Farbe und einer Länge ungleich 0 (der Tailwind-Ring-Standard zählt nicht).
- Ein Farbwechsel von transparent auf sichtbar bei gleicher Outline-Form wird erkannt.

Dazu kommen drei neue Testfälle.

### ME-03: Die Meta-Description von `/fakten-ueber-craftos` verspricht „benannte Grenzen“

**Dateien:** `craftos/docs/seo/keyword-map.json`, `craftos/tests/keyword-map.test.ts`
**Commit:** 5b4a9e2
**Umsetzung:** Neue Description (146 Zeichen, Regel 120–155): „Überprüfbare Fakten über CraftOS: was die Handwerkersoftware ist, Plattformen, Lizenzen und Preise, Testphase, GoBD-Konformität und Datenstandort.“ Der Datenstandort steht auf der Seite (`datenstandort.faqFakten`). Ein neuer Test prüft alle Keyword-Map-Zielwerte (title, h1, description) mit `nurUnterstuetztVerstoesse`.

### ME-04: Die Datenschutzerklärung nennt den `sessionStorage`-Eintrag der KI-Besuchserkennung nicht

**Dateien:** `craftos/lib/tracking.ts`, `craftos/components/Analytics.tsx`, `craftos/tests/tracking.test.ts`, `craftos/docs/ANALYTICS.md`
**Commit:** 7098052
**Umsetzung:** Umgesetzt ist Variante a, wie vom Orchestrator vorgegeben:
- `aiVisitOnce()` schützt das Ereignis über eine Modulvariable im Arbeitsspeicher. `ai_visit` geht so höchstens einmal je Seitenladevorgang hinaus.
- Es gibt keinen Zugriff auf `sessionStorage` oder `localStorage` und keine Cookies.
- Tests sichern das ab: Einmaligkeit, Besuche ohne KI-Quelle verbrauchen den Schutz nicht, Speicher- und Cookie-Attrappen werden nie aufgerufen, `Analytics.tsx` enthält keinen Speicherzugriff.
- `docs/ANALYTICS.md` ist angepasst.

Die Datenschutzerklärung bleibt unverändert und stimmt damit wieder („setzen keine Cookies“, erfasste Daten).

### ME-05: `live-check.mjs` prüft die GoBD-Aussage (D-43) und das Impressum (D-42) nicht

**Datei:** `craftos/scripts/live-check.mjs`
**Commit:** d957a02
**Umsetzung:** Der neue Block „Kernaussagen Phase 10 (D-41, D-42, D-43)“ liest die Werte als Text aus `lib/gobd-konform.ts`, `lib/einrichtung.ts` und `lib/datenstandort.ts`. Er prüft:
- `/gobd`: „CraftOS ist GoBD-konform:“ und die Zertifizierungsantwort, kein „Nein.“.
- `/` und `/fakten-ueber-craftos`: die Frage „Ist CraftOS GoBD-konform?“ im FAQPage-JSON-LD und sichtbar, dazu den Kernsatz im Text.
- `/llms.txt`: die Zeile `- GoBD: <Kernsatz>`.
- `/impressum`: kein `consumers/odr`, keine OS-Plattform, keine Online-Streitbeilegung.
- `/preise`: Einrichtungs-Kernsatz und „Einrichtung und Datenübernahme kostenlos.“.
- `/fakten-ueber-craftos`: den Datenstandort-Kernsatz.

Lokal gegen den frischen Build auf Port 3100 geprüft: „alle Prüfungen OK“.

### LO-01: Der Median bei zwei gültigen Läufen ist für LCP und CLS das günstigere Ergebnis

**Dateien:** `craftos/scripts/lib/lighthouse-core.mjs`, `craftos/tests/lighthouse-core.test.ts`
**Commit:** 90c3170
**Umsetzung:** `median(xs, richtung)`: Der Score nimmt das untere Mittel, LCP, FCP, SI, TBT und CLS nehmen das obere. Bei gerader Laufzahl gilt damit je Kennzahl der ungünstigere Wert.

### LO-02: `ZERTIFIKATSBEHAUPTUNG` lässt Mehrsatztexte mit Fragezeichen am Ende und die Nomen durch

**Dateien:** `craftos/lib/nur-unterstuetzt.ts`, `craftos/tests/gobd-aussage.test.ts`
**Commit:** dc0daa7
**Umsetzung:**
- Die Prüfung läuft je Aussagesatz, mit derselben Satztrennung wie `artikelAussagen`; Fragesätze entfallen.
- Die Regex erfasst zusätzlich `(GoBD-)Zertifikat(e|en|s)` und `(GoBD-)Testat(e|en|s)`.
- „Zertifizierung“ bleibt erlaubt.

### LO-03: Die Textprüfungen in `live-check.mjs` werten auch JSON-LD und den RSC-Payload als „sichtbar“

**Datei:** `craftos/scripts/live-check.mjs`
**Commit:** 29a88c3
**Umsetzung:** `textVon()` entfernt vor `plain()` alle `<script>`- und `<template>`-Blöcke. Der live-check gegen den lokalen Build ist danach weiter vollständig grün.

### LO-04: Der Netzfall der Logo-Spec verschluckt Lesefehler und prüft nicht, dass erlaubte Schnitte geladen werden

**Datei:** `craftos/tests/e2e/logo-schriftzug.pw.cjs`
**Commit:** bb19770
**Umsetzung:**
- Der Browser-Cache ist per CDP abgeschaltet.
- Eine nicht lesbare Antwort zählt als „nicht prüfbar“ (fremd).
- Je Route muss mindestens ein erlaubter Schnitt tatsächlich geladen werden.

Die Spec lief lokal auf `chromium-1440` mit 3 von 3 grün.

### LO-05: Die Unterzeile des Logos wird in Browsern ohne `lab()` unsichtbar

**Dateien:** `craftos/components/CraftOSLogo.tsx`, `craftos/tests/craftos-logo.test.ts`
**Commit:** d61de11
**Umsetzung:** `#9f9fa9` ist die exakte sRGB-Umrechnung von `lab(65.6464 1.53494 -5.42429)`; der Test schließt `lab(`/`oklch(` aus. Der Logo-Screenshot-Vergleich (`chromium-1440`) blieb grün.

### LO-07: Der Bericht ohne Leaderboard meldet „keine Rohdatei vorhanden“, obwohl eine existiert

**Dateien:** `craftos/scripts/lib/seo-report-core.mjs`, `craftos/tests/seo-report-core.test.ts`
**Commit:** 81a8c4f
**Umsetzung:**
- Fehlt die Hauptdomain in der Liste, liefert `leaderboardStand()` Datum, Quelle und `anzahl` mit `rang: null`. Die Berichtszeile lautet dann „nicht unter N Einträgen“ mit Datum und Quelle.
- `null` kommt nur noch, wenn die Antwort gar keine Leaderboard-Liste enthält.

### LO-08: Der D-42-Schutztest findet Altklassen nur in Klassen-Literalen

**Datei:** `craftos/tests/aufraeumen-d42.test.ts`
**Commit:** b9b8fb6
**Umsetzung:** `altklassenIn()` sucht Altklassen als eigenständiges Token in jedem String-Literal und `class`-Attribut, Kommentare ausgenommen. Erfasst werden damit `cn()`, `clsx()` und Bedingungen. Geprüft werden `app`, `components` und `lib` sowie `content/**/*.md`. Ein Selbsttest belegt die Erkennung und die Abgrenzung zu `v2-`-Klassen.

### IN-01: Veraltete Kommentare nach D-42

**Dateien:** `craftos/app/layout.tsx`, `craftos/app/support/page.tsx`, `craftos/app/impressum/page.tsx`
**Commits:** 20c5f79, 73da90d
**Umsetzung:** Die drei Kommentare sind auf den Stand nach D-42 gebracht; es sind nur Kommentare, der Rechtstext ist unverändert. Die Nachbesserung entfernt das Wort „PageHero“ aus dem Kommentar in `/support`, weil `tests/kernseiten.test.ts` es im Quelltext verbietet.

## Nicht angewendete Befunde

### LO-06: Die AGB zeigen live weiter „Vorlage … sollten vor Veröffentlichung rechtlich geprüft werden“

**Datei:** `craftos/app/agb/page.tsx:90-94`
**Grund:** Es handelt sich um einen Rechtstext. Laut Vorgabe werden Rechtstexte nicht geändert; nötig ist eine Inhaberentscheidung (AGB prüfen lassen oder den Stand mit Datum angeben).
**Ursprünglicher Befund:** Der Vorlagenhinweis steht weiter sichtbar unter den AGB.

### IN-02: Die Zusatzlinks im Mega-Menü führen auf den Seitenanfang der Detailseite

**Datei:** `craftos/components/layout/MegaMenu.tsx:52-71`
**Grund:** Der Befund ist optional und nicht trivial. Er betrifft Kachel-IDs, Menüziele mit Fragment und den Zielabgleich in `live-check.mjs`.
**Ursprünglicher Befund:** „Kassenbuch“ und „Rechnung nach § 13b“ verlinken auf den Seitenanfang statt auf die Kachel.

### IN-03: Der Zeitlimit-Ausgleich für dynamische Importe verdeckt die Ursache

**Datei:** `craftos/tests/content-produktwahrheit.test.ts:213-221`
**Grund:** Der Befund ist optional und nicht trivial. Nötig wären Vorwärm-Importe bzw. eine Messung der Ladeprüfungen über mehrere Testdateien; ein Fachfehler liegt nicht vor.
**Ursprünglicher Befund:** Das 60-s-Limit verdeckt wachsende Ladekosten der Modulprüfungen.

## Prüfnachweis

Alles lief lokal, schwere Läufe unter `.heavy-lock`:
- **Build und Server:** `npm run build` mit Exit 0, danach `next start -p 3100`. Der Server wurde über die eigene PID beendet, Port 3100 ist danach frei.
- **live-check:** `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` → „Ergebnis: alle Prüfungen OK“, einschließlich des neuen Blocks aus ME-05.
- **E2E:** `logo-schriftzug` auf `chromium-1440` → 3 von 3 bestanden (LO-04, LO-05).
- **Schlussprüfung:** volle Vitest-Suite mit 59 von 59 Dateien und 1699 von 1699 Tests bestanden; `tsc --noEmit` mit Exit 0; `eslint .` mit Exit 0.

Ein erster Suite-Lauf hatte 1 Fehler (`kernseiten`, Wort „PageHero“ im IN-01-Kommentar). Nach 73da90d war er grün.

---

_Behoben: 23.10.2026_
_Bearbeiter: Claude (gsd-code-fixer)_
_Durchlauf: 1_
