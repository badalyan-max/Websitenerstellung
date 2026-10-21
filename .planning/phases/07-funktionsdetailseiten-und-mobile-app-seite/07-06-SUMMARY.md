---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 06
subsystem: funktionsdetails
tags: [inhalte, rechnung, buchhaltung, team, route, keyword-map, sichtpruefung]
requires:
  - phase: 07-04
    provides: Builder, FunktionsDetail-Vorlage, FunktionsKopf
  - phase: 07-05
    provides: 12 Inhaltsmodule (Angebot, Planung, Baustelle), ERWARTET-Struktur
provides:
  - lib/funktionsdetails/rechnung.ts (rechnungen, e-rechnung, mahnwesen)
  - lib/funktionsdetails/team.ts (team, datenuebernahme)
  - lib/funktionsdetails/buchhaltung.ts (buchhaltung, eingangsrechnungen, nachkalkulation, dashboard, bankabgleich)
  - INHALTE mit allen 22 Detailfunktionen
  - dünne Route app/funktionen/[slug]/page.tsx (Keyword-Map-Metadaten + FunktionsDetail)
  - Keyword-Map-Fall „Phase-7-Detailseiten folgen den Zielwerten“ (22 Seiten)
  - Release-Rollentest (roles.ts, FEATURE_ACCESS, Datenimport.tsx)
affects: [07-07, 07-08, 07-09]
tech-stack:
  added: []
  patterns:
    - "Route = generateMetadata aus zielwerte() + synchrone Vorlage; Tests rendern die async Page über await Page({ params })"
    - "Rollenaussagen werden nur lesend gegen origin/release geprüft (git show), skipIf nur ohne Web-Repo"
key-files:
  created:
    - craftos/lib/funktionsdetails/rechnung.ts
    - craftos/lib/funktionsdetails/team.ts
    - craftos/lib/funktionsdetails/buchhaltung.ts
  modified:
    - craftos/lib/funktionsdetails/index.ts
    - craftos/app/funktionen/[slug]/page.tsx
    - craftos/lib/funktionen.ts
    - craftos/lib/scenes.ts
    - craftos/components/funktionen/FunktionsKopf.module.css
    - craftos/tests/funktionsdetails.test.ts
    - craftos/tests/keyword-map.test.ts
key-decisions:
  - "Synthetische Felder faq, seoTitle, seoDescription aus lib/funktionen.ts entfernt: nach der Routenumstellung keine Nutzer außerhalb der Datei (grep über app, lib, components, tests, scripts)"
  - "Kopf-Visual: Der Browserrahmen im FunktionsKopf wächst mit seinen Zeilen (mindestens 16:10 über Container-Einheit), statt bei 360 px die letzte Zeile anzuschneiden; Kartenvariante unverändert"
  - "Terminplanung-Szenen: Beispielnamen Rohbau/Abdichtung/Fliesen statt Rohinstallation/Fliesenarbeiten, damit das Phone im Paar keine Namen mit Auslassungspunkten zeigt"
  - "Mahnwesen-Texte ohne Ordinalzahlen („erste/zweite Mahnung“); „automatisch“ nur zusammen mit „auf Wunsch“; Grenze „Nur Rechnungen“"
  - "Bankabgleich: Pflichtantwort beginnt mit „Nein, Sie importieren Kontoauszüge als Datei im Format CSV, camt.053 oder PDF“; kein „automatisch“ im gesamten Modul"
requirements-completed: []
duration: 36min
completed: 2026-10-21
---

# Phase 7 Plan 06: Inhalte Rechnung, Team, Buchhaltung, Route und Sichtprüfung Summary

**Alle 22 Detailseiten laufen jetzt über die v2-Vorlage. Die zehn fehlenden Inhaltsmodule (Rechnung, Team, Buchhaltung) sind am Web-Release belegt, Title/H1/Description kommen aus der Keyword-Map (Vitest über alle 22 Seiten), die Rollenangaben sind gegen `roles.ts`, `FEATURE_ACCESS` und `Datenimport.tsx` geprüft. Build, 445 Unit-Tests, 262 Browserfälle, route-audit und live-check sind lokal grün; die Sichtprüfung hat zwei Kopf-Befunde gefunden und an der Ursache behoben.**

## Performance

- **Dauer:** ca. 36 min (Start 19:03 UTC, Ende 19:39 UTC)
- **Tasks:** 3/3, jeweils RED → GREEN
- **Dateien:** 3 neu, 7 geändert

## Ergebnisse

### Task 1: Gruppen Rechnung und Team
- **rechnungen:** Grenze „Korrektur nur über Folgebelege“ → `/gobd`. FAQ zu Folgebelegen, Rechnungsarten, Zahlung ≠ Bankbestätigung, Berichten.
- **e-rechnung:** XRechnung (UBL 2.1), ZUGFeRD (PDF/A-3), Eingang ohne OCR. Grenze „Eine PDF ist keine E-Rechnung“ → `/gobd`. Pflichtantwort „Nein“. Keine Zusage zur Empfängerakzeptanz (eigene FAQ: Download bestätigt die Annahme nicht).
- **mahnwesen:** Web-Panel Admin und Büro-Leitung („Einstellungen nur lesen“), Satz „Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs.“. Drei Stufen, Fristen in Tagen überfällig, Mahngebühr und Verzugszinssatz (optional, Standard 0), elf Platzhalter (`reminderTemplateVariables.ts`), täglicher Versand per E-Mail auf Wunsch, mindestens 7 Tage Abstand, Mahnverlauf, Grenze „Nur Rechnungen“.
- **team:** Kachel „{n} Sprachen in der Mobile-App“ aus `mobileLocales.length`, `zusatz: "sprachen"`, `href: "/app"` (D-21). Web-Panel nur Admin („Rollen und Sitze vergibt nur der Inhaber“). FAQ zu Lizenz vs. Rolle, fünf Presets, Sitzvergabe, Urlaub.
- **datenuebernahme:** Nur Web-Panel mit Admin und Büro-Leitung. 10 Anbieter aus `vendorSources.json`, Formate CSV/TSV/TXT/XLSX, 10 MiB / 25.000 Zeilen, kostenlose Import-KI ohne Zahlungsdaten.

### Task 2: Gruppe Buchhaltung
- **buchhaltung:** Grenze „Keine ELSTER-Einreichung“ → `/gobd`; Steuerberater-Paket (DATEV-Stapel, Belege, Journal, Offene Posten, Zeiten-Nachweis) laut `SteuerberaterExport.tsx`.
- **eingangsrechnungen:** Web Admin/Büro-Leitung, Mobile-Panel ohne Rollen mit Satz „nur mit der Finanzfreigabe Ihrer Rolle“. Grenze „KI-Auslesen mit Verbindung und Credits“ → `/gobd`.
- **nachkalkulation:** Grenze „Prognosen sind Einschätzungen“.
- **dashboard:** Kennzahlen laut `StatsOverviewWidget.tsx` (aktive Projekte, offene Angebote und Wert, offene Beträge, Monatsstunden, Wocheneinsätze) und Umsatzverlauf mit Vorjahr.
- **bankabgleich:** Dateiimport (CSV/camt.053 bis 2 MiB ohne Credits, PDF bis 10 MiB per KI gegen Credits, höchstens 2.000 Umsätze), Zuordnungsstatus, Dublettenhinweis, kostenlose Hervorhebung, KI-Vorschläge nur auf Anforderung.
- Alle 10 Seiten dieses Plans haben in der 07-UI-SPEC-Kacheltabelle genau eine Grenze-Kachel; eine Ergänzung wie bei `angebote` (07-05) war nicht nötig.

### Task 3: Route, Keyword-Map, Rollen gegen Release, Browserlauf, Sichtprüfung
- `app/funktionen/[slug]/page.tsx` ist eine dünne Route nach dem Routenvertrag (PageHero, Fließtext-Bullets, alte Faq, TrialCta und Hilfe-Sonderfälle entfallen, alle URLs bleiben).
- `lib/funktionen.ts`: `faq`, `seoTitle`, `seoDescription` entfernt (keine Nutzer mehr; `gewerke` hat eigene gleichnamige Felder).
- Neue Tests: Keyword-Map-Fall über 22 Seiten (Title mit Suffix, Description, Canonical, genau eine H1 = target.h1, Kopfwort-Regel, `{}` für unbekannten Slug); Routen-Render über `await Page({ params })` (feste Abschnittsfolge, kein `craft-page-hero`/TrialCta-Markup, FeatureSnippet genau auf den 8 Seiten mit derselben Variante); „Rollen gegen Release“ (5 Preset-Labels, Büro-Leitung mit/Büro-Projektleitung ohne `finanzen_sichtbar`, `finanzen` und `team_verwaltung` nur admin, Finanz-/Team-/Import-Panels, „Admin oder Büro-Leitung“). Der Release-Test lief, er wurde nicht übersprungen.
- **E2E-Anpassungen:** keine nötig. `function-illustrations.pw.cjs` und `browser-functional.pw.cjs` hängen nicht am Altmarkup der Detailseite; die 8 Snippet-Seiten und Varianten sind unverändert.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED Task 1 / 2 / 3 | rot: 5 / 4 / 2 Fälle |
| `vitest funktionsdetails + announcements + pricing-parity` (Task 1) | 71/71 grün |
| `vitest funktionsdetails + keyword-map` (Task 3) | 75/75 grün, 0 übersprungen |
| `npm test` (voll) | 28 Dateien, 445/445 grün |
| `npm run typecheck`, `npm run lint` | grün nach jedem Task |
| `npm run build` | grün, 139 statische Seiten |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | 262 passed, 0 failed, 54 skipped (Projekt-Skips); zweimal (vor und nach den Sicht-Korrekturen) |
| `route-audit.mjs` (lokal 3100) | Exit 0 |
| `live-check.mjs` (lokal 3100) | 17 × OK, „alle Prüfungen OK“ |
| `visual-audit.mjs` Stichprobe (5 Seiten × 5 Breiten × Chromium/WebKit) | 50 Seiten, 0 Statusfehler, 0 Überlauf, 0 JS-Fehler, 0 axe-Verstöße |
| Akzeptanz-Greps | Pflichtfragen je 1; `mobileLocales` 3; `zusatz: "sprachen"` 1; „lückenlos/Online-Banking“ 0 (rechnung.ts, team.ts); „automatisch/online-banking“ 0 (buchhaltung.ts); `"/gobd"` je 2 (rechnung.ts, buchhaltung.ts); PageHero/TrialCta/FeatureSnippet in der Route 0; `getFunktionsdetail`/`zielwerte` in der Route ≥ 1 |
| Port 3100 | vorher frei; Server je Lauf mit eigener PID gestartet und beendet; danach frei |

Koordination: Vor den schweren Läufen wurde der Status gelesen (edgar und edgarspc offline/veraltet). Für das Website-Repo gibt es weiterhin kein Rezept (Lücke: `website-unit`, `website-build`, `website-e2e`). Alle Läufe liefen deshalb lokal nacheinander, jeweils als einziger schwerer Prozess.

## Sichtprüfung

Screenshots (nicht committet, `git status` zeigt keine PNG):
- Alle 22 Detailseiten, Chromium, ganzseitig bei 360 und 1440 sowie 360 × 640 ohne Scrollen: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-06/alle/` (`chromium-{360,1440}-<slug>.png`, `chromium-360x640-falz-<slug>.png`)
- Kopf- und Kachelausschnitte: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-06/abschnitte/` (`kopf-{360,1440}-<slug>.png`, `kern-{360,1440}-<slug>.png`)
- Volles Raster (360–1440, Chromium/WebKit) für angebote, baudokumentation, mahnwesen, terminplanung, team: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-06/raster/`
- Messbericht: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-06/sicht-report.json` (Skript `sicht.mjs` im selben Ordner)

Gemessen und gesichtet:
- **Kopf über der Falz bei 360 × 640:** Auf allen 22 Seiten sind H1, Kurznutzen und CTA vollständig sichtbar (Beispiel dashboard: CTA-Unterkante 403 px). Bei 1440 × 900 sind H1, Lead, CTA und die Visual-Oberkante sichtbar.
- **Kopfwort:** nie umbrochen, nie breiter als der Container. Kein horizontaler Überlauf, keine JS-Fehler, alle Status 200.
- **Snippet:** genau auf dashboard, angebote, rechnungen, eingangsrechnungen, plantafel, zeiterfassung, lager, aufmass.

Befunde und Behebung:
1. **Angeschnittene letzte Zeile im Browser-Kopf-Visual bei 360 px** (13 Seiten, 13–26 px Überstand, z. B. dashboard „Bäckerei Krause“). Ursache: fester 16:10-Rahmen bei 328 px Breite. Behebung in `FunktionsKopf.module.css`: Der Browserrahmen im Kopf behält mindestens 16:10 (`min-height: calc(100cqw * 10 / 16)`), wächst aber mit den Zeilen. Danach 0 Befunde; die Kartenvariante auf /funktionen bleibt unberührt.
2. **Auslassungspunkte im Terminplanung-Phone** („Rohins…“, „Fliesenarbei…“, alle Breiten). Ursache: zu lange Beispielnamen neben der Statuspille „Abgeschlossen“. Behebung am Inhalt: Beispielnamen „Rohbau“, „Abdichtung“, „Fliesen“ in beiden Terminplanung-Szenen. Danach 0 Befunde.
3. **Offen, nicht geändert:** lager bei 1440 – die sm-Kacheln neben der lg-Kachel mit Phone (194 px laut 07-UI-SPEC) sind 308 px hoch bei 146 px Inhalt (ca. 100 px Leerraum über dem Innenabstand), baudokumentation ähnlich (ca. 73 px). Ursache ist die verbindliche Anordnung lg·sm·sm·md·… mit Phone 194 aus 07-05; eine Änderung (Phone 160 oder andere Anordnung) wäre eine Abweichung vom genehmigten UI-SPEC. Vorschlag für 07-08: Phone-Breite 160 in den lg-Kacheln prüfen. Alle übrigen Kacheln liegen bei höchstens rund 60 px Leerraum über dem Innenabstand.

## Task Commits

1. `63984d4` test(07-06): add failing expectations for Rechnung and Team group detail content
2. `f7f2787` feat(07-06): content for Rechnung and Team group detail pages (rechnungen, e-rechnung, mahnwesen, team, datenuebernahme)
3. `abc86dc` test(07-06): add failing expectations for Buchhaltung group detail content
4. `f6b046c` feat(07-06): content for Buchhaltung group detail pages (buchhaltung, eingangsrechnungen, nachkalkulation, dashboard, bankabgleich)
5. `c5f2b91` test(07-06): add failing route and keyword-map cases for 22 detail pages, release role checks
6. `bd74f25` feat(07-06): detail route renders v2 template with keyword-map metadata for all 22 pages

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] Angeschnittene Zeilen im Kopf-Visual bei 360 px**
- **Found during:** Task 3 (Sichtprüfung)
- **Fix:** Browserrahmen im FunktionsKopf mit Mindesthöhe 16:10 statt fester Proportion (Container-Einheit auf `.product[data-visual="browser"]`).
- **Files modified:** craftos/components/funktionen/FunktionsKopf.module.css (außerhalb `files_modified`)
- **Commit:** bd74f25

**2. [Rule 1 – Bug] Auslassungspunkte im Terminplanung-Phone**
- **Found during:** Task 3 (Sichtprüfung)
- **Fix:** Kürzere fiktive Beispielnamen in `projektplanScene` und `arbeitsabschnitteScene`; Statusnamen unverändert.
- **Files modified:** craftos/lib/scenes.ts (außerhalb `files_modified`)
- **Commit:** bd74f25

**3. [Rule 1 – Testpräzision] Ordinalzahl-Regel im Mahnwesen-Test**
- Die erste Fassung (`\d+\.` vor Leerraum) traf auch das Satzende „auf 0.“. Die Regel prüft jetzt Ziffer, Punkt, Leerraum, Wort („1. Mahnung“). Commit f7f2787.

### Hinweise
- `git fetch origin release` im Web-Repo (nur Remote-Referenz, keine Änderung am Arbeitsbaum) vor den lesenden `git show`-Aufrufen; origin/release steht jetzt auf 535206b42 (2 Commits nach dem Register-Stand 07cf0645). Die genutzten Release-Aussagen (Rollen, Mahnwesen, Import, Bank) sind dort unverändert gültig; der Register-Pin bleibt unberührt.
- Design-Kaskade: Dieser Plan enthält keine neue UI-Komponente; die zwei Sicht-Korrekturen folgen den genehmigten 07-UI-SPEC-Regeln (Kopf-Visual zeigt alle Zeilen, Beispieldaten fiktiv).

**Total deviations:** 3 Auto-Fixes (2 Sichtbefunde, 1 Testpräzision).

## TDD Gate Compliance

- Task 1: RED `63984d4` → GREEN `f7f2787`
- Task 2: RED `abc86dc` → GREEN `f6b046c`
- Task 3: RED `c5f2b91` → GREEN `bd74f25`

## Known Stubs

Keine. INHALTE deckt alle 22 Slugs ab (Test), jede Detailseite rendert Inhalte aus belegten Modulen.

## Threat Flags

Keine neue Angriffsfläche. Der Release-Rollentest liest nur per `git show` (keine Schreibzugriffe auf das Web-Repo).
- **T-07-17:** Release-Test gegen FEATURE_ACCESS, Presets und Datenimport-Hinweis, im Lauf ausgeführt (0 übersprungen).
- **T-07-18:** Wortregeln im Builder plus Tests für Bankabgleich/Mahnwesen und Grep-Gates.
- **T-07-19:** Genau eine Grenze-Kachel je Seite; `/gobd` an den Grenzen von rechnungen, e-rechnung, buchhaltung, eingangsrechnungen (Test).
- **T-07-20:** FeatureSnippet nur auf den 8 Seiten (Routen-Test), keine neue Client-Insel.
- **T-07-SC:** keine Pakete installiert.

## Self-Check: PASSED

- Dateien vorhanden: lib/funktionsdetails/rechnung.ts, team.ts, buchhaltung.ts; Route geändert.
- Commits 63984d4, f7f2787, abc86dc, f6b046c, c5f2b91, bd74f25 stehen im Log.
- Arbeitsbaum sauber bis auf `.planning/config.json` (bewusst nicht angefasst); kein Server läuft, Port 3100 frei.
