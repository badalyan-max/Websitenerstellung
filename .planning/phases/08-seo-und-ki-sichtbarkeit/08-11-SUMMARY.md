---
phase: 08-seo-und-ki-sichtbarkeit
plan: 11
subsystem: vergleich-kleine-betriebe
tags: [kleine-betriebe, footer, bmf-quellen, uwg, pflichthinweis, d-10, inhaber-22-10]
requires:
  - phase: 08-06
    provides: lib/wettbewerber (Datenmodule, heroVariante, monatAusJahr, craftosRechenbeispiel)
  - phase: 08-10
    provides: baueMarktuebersicht, UEBERSICHT_SPALTEN, monatlichKuendbar, Hub /vergleich mit vier Einzelvergleichen
provides:
  - lib/seiten/kleine-betriebe.ts – Inhalte der Seite „kleine Betriebe“ mit amtlichen Quellen (AMTLICH, abgerufenAm)
  - /vergleich/handwerkersoftware-kleine-betriebe mit OG-Bild, BreadcrumbList (3), FAQPage, WebPage
  - fünfte Hub-Kachel auf /vergleich (wide, md·sm·sm·wide·wide)
  - Footer-Spalte „Vergleiche“ (Hub, vier Alternativen, kleine Betriebe) – ROADMAP-Kriterium 1 vollständig
  - Ratgeber-Sätze in /blog/handwerkersoftware-auswaehlen und /blog/handwerkersoftware-einzelunternehmen
affects: [08-13, 08-14]
tech-stack:
  added: []
  patterns:
    - "Rechtsangaben nur aus einem AMTLICH-Objekt mit Quelle, Abrufdatum und von Hand übernommenen Werten; Sätze per Vorlage"
    - "Marktübersicht-Helfer mit noteZusatz für spaltenspezifische Ergänzungen des Pflichthinweises"
    - "Spannen (Testphase, Laufzeit) aus Moduldaten berechnet und per Fixture getestet"
key-files:
  created:
    - craftos/lib/seiten/kleine-betriebe.ts
    - craftos/app/vergleich/handwerkersoftware-kleine-betriebe/page.tsx
    - craftos/app/vergleich/handwerkersoftware-kleine-betriebe/opengraph-image.tsx
  modified:
    - craftos/lib/seiten/vergleich.ts
    - craftos/components/layout/Footer.tsx
    - craftos/content/blog/handwerkersoftware-auswaehlen.md
    - craftos/content/blog/handwerkersoftware-einzelunternehmen.md
    - craftos/app/sitemap.ts
    - craftos/lib/llms.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/DESIGN-V2.md
    - craftos/tests/vergleich-seiten.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/navigation.test.ts
    - craftos/tests/llms.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/ai-prompts.test.ts
    - craftos/tests/e2e/design-v2.pw.cjs
    - .planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md
key-decisions:
  - "08-11: Inhabervorgabe 22.10.2026 auf der Seite „kleine Betriebe“ umgesetzt – keine CraftOS-Negativaussage, keine Kriterien, die CraftOS nicht hat; Fairness über belegte Anbieterangaben in der neutralen Tabelle (ohne highlight), Builder wirft bei Negativsätzen und Nein-FAQ"
  - "08-11: Spalte „Weitere mobile Person“ aus den Moduldaten: CraftOS App-Lizenz (Monatsabo), Craftnote Paket Baustelle (Jahresabo), HERO App-Lizenz (monatlich, Variante A; B „laut hero-software.de“), plancraft Mobilzugang (Monatsabo), ToolTime „im Paket, bis 5 Personen“ (Zahl aus Team-Paket)"
  - "08-11: GoBD-Kachel mit zwei amtlichen Quellen (BMF-Schreiben 14.07.2025 als geltende Fassung, AO-Handbuch Anhang 33 mit Rz. 64/107 f.), weil das Änderungsschreiben die zitierte Aussage allein nicht enthält"
  - "08-11: H2 „testen“ ohne Kopfwort („Wie testen Sie eine Software mit einem Auftrag?“) wegen Silbentrennung im Kopfwort bei 360 und 1440 px"
  - "08-11: Footer-Raster ab 768 px drei Spuren, ab 1024 px Logo plus vier Linkspalten; Mega-Menü-Link unverändert"
requirements-completed: []
duration: 40min
completed: 2026-10-22
---

# Phase 8 Plan 11: Handwerkersoftware für kleine Betriebe Summary

**`/vergleich/handwerkersoftware-kleine-betriebe` beantwortet Prompt #1 neutral (Antwort ≤ 300, sechs belegte Kriterien mit BMF-Quellen und Abrufdatum, fünf Anbieter ohne Hervorhebung mit Pflichthinweis und Disclaimer wörtlich); der Hub hat die fünfte Kachel, der Footer die Spalte „Vergleiche“ mit allen Vergleichsseiten, und beide Ratgeber zur Softwareauswahl verlinken die Seite mit genau einem Satz.**

## Performance

- **Dauer:** ca. 40 min (Start ca. 19:55 UTC, Ende ca. 20:35 UTC), davon schwerer Lauf unter der Sperre 20:11–20:28 UTC
- **Tasks:** 2/2 (je RED- und GREEN-Commit)
- **Dateien:** 3 neu, 18 geändert

## Accomplishments

- **Inhaltsmodul** `lib/seiten/kleine-betriebe.ts`: Kopf (Eyebrow „Vergleich“, Kopfwort „Handwerkersoftware“, Antwort wörtlich UI-SPEC § 6, Stand-Zeile „Anbieterangaben Stand 22.10.2026, Quellen unter der Tabelle“, „Zu den Kriterien“ → `#kriterien`); sechs Kriterienkacheln (md·sm·sm·md·sm·sm) mit Testphasen-Spanne „von 7 bis 30 Tagen“ und Laufzeit-Spanne „von monatlich kündbar bis zwölf Monate Laufzeit“ aus den Daten; amtliche Quellenliste (BMF-FAQ E-Rechnung, GoBD BMF-Schreiben 14.07.2025, AO-Handbuch Anhang 33, je „abgerufen am 22.10.2026“).
- **Anbietertabelle** über `baueMarktuebersicht` (kein Kopieren): CraftOS „9,95 € (Monatsabo)“, Craftnote „14,90 € (Jahresabo)“, HERO „25 € (monatlich)“, plancraft „24,90 € (Monatsabo)“, ToolTime „im Paket, bis 5 Personen“; übrige Spalten identisch mit `/vergleich`. Note: „Angaben ohne Gewähr, Stand 22.10.2026, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand 20.10.2026. Weitere mobile Person: netto je Person und Monat, Zahlweise in Klammern.“; Disclaimer für Marktübersichten wörtlich; 7 Anbieterquellen, jede genau einmal.
- **FAQ (4, ≤ 300):** E-Rechnung laut BMF (Empfang seit dem 1. Januar 2025, Ausstellen ab 2028 grundsätzlich, Ausnahmen Kleinbetragsrechnungen bis 250 € brutto und Kleinunternehmer); fünf Personen = 58,13 € über `craftosRechenbeispiel`/`monatAusJahr`; Kündigung aus `monatlichKuendbar`; App-Lizenz mit `euro(app.monat)`.
- **Route und OG** (`metaFor`, `pageOg` kind „Vergleich“), Abschnitte `kriterien`/`anbieter`/`testen`/`faq`/`cta`, BreadcrumbList (Start, Vergleich, Für kleine Betriebe), FAQPage aus der sichtbaren FAQ, WebPage; kein Product/Review/AggregateRating, kein `@graph`, kein Bild.
- **Hub:** fünfte Kachel „Handwerkersoftware für kleine Betriebe“ (wide, Icon `Users`, Text mit Zahlwort aus der Anbieterzahl); gemeinsame Helfer `UEBERSICHT_SPALTEN`, `monatlichKuendbar`, `zahlwort` (+ „zwölf“), `gross`, `VERGLEICHS_CTA`, `NEGATIVSATZ` exportiert; `baueMarktuebersicht` mit `noteZusatz`.
- **Footer:** Spalte „Vergleiche“ mit sechs Links; „Warum CraftOS?“ nicht mehr im Footer.
- **Verbreitung (Pitfall 12, ein Commit `a1de3ee`):** Route, `keyword-map.json` (bestehend), `KEYWORD-MAP.md` (Tabellen 23/9, Änderungshinweis), `app/sitemap.ts` (pages + `pageUpdated`), `lib/llms.ts` (Link ohne Wettbewerberzahlen), Ratgeber-Sätze.

## Design-Kaskade

- frontend-design-Leitlinie read-only gelesen („Visual structure is information“: Quellen und Stand sind Belege; keine Hervorhebung einzelner Anbieter).
- `py -3.12 -X utf8 …/search.py "small business software criteria comparison" --domain ux`: „Touch Target Size“ (High) – Bestandsgrößen der Vergleichsseiten beibehalten.
- 21st.dev und Context7 nicht verfügbar bzw. nicht benötigt (keine neuen Bausteine, Muster `/vergleich`). Nachweis: `craftos/docs/DESIGN-V2.md` § 17.11.

## Amtliche Quellen (WebFetch per curl, 22.10.2026)

- **BMF-FAQ E-Rechnung** (`bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html`, Stand März 2026): Frage 8/12 „seit dem 1. Januar 2025 den Empfang einer E-Rechnung sicherstellen“; Frage 11 Übergangsfristen bis Ende 2026 bzw. 2027 (Vorjahresumsatz bis 800.000 Euro), danach Pflicht; Frage 4 Ausnahmen u. a. „Kleinbeträgen (bis 250 Euro Bruttobetrag)“ und Kleinunternehmer. Plan-Aussagen bestätigt; Wortlaut „bis 250 € brutto“ an die Quelle angepasst.
- **GoBD:** BMF-Schreiben vom 14.07.2025 (2. Änderung, anzuwenden ab 14.07.2025) behandelt v. a. E-Rechnungs-Aufbewahrung; die Kachelaussage „Festgeschriebene Rechnungen und nachvollziehbare Korrekturen gehören zur Buchführung“ stützt sich auf GoBD Rz. 64 („Korrektur- bzw. Stornobuchungen müssen auf die ursprüngliche Buchung rückbeziehbar sein“) und Rz. 58 ff./107 f. (Unveränderbarkeit, Festschreibung) im AO-Handbuch Anhang 33 → beide Quellen genannt.

## Task Commits

1. **Task 1: Inhaltsmodul, fünfte Hub-Kachel** – `2f38d99` (test, RED), `2561d63` (feat, GREEN)
2. **Task 2: Route, OG, Footer, Ratgeber, Sitemap/llms/Map** – `323875d` (test, RED), `a1de3ee` (feat, GREEN)

## Prüfergebnisse

**Gezielt (ohne Sperre):** vergleich-seiten, design-v2-budgets, pricing-parity, wettbewerber, navigation, llms, keyword-map, ai-prompts, breadcrumbs, content, announcements, seo-meta – 222 von 223 grün, einziger Fehlschlag „Snapshot ist aktuell“ (bekannt, nicht angefasst). Nach der H2-Korrektur vergleich-seiten + design-v2-budgets erneut 79/79.

**Schwerer Lauf unter der Sperre (20:11–20:28 UTC, Port 3100; Koordinationsstatus gelesen, kein Website-Rezept → lokal):**
- `npm test`: 38 Dateien, 810 von 811 grün (nur „Snapshot ist aktuell“ rot).
- `npm run lint`, `npm run typecheck`, `npm run build` grün (Build nach der H2-Korrektur erneut grün).
- `seo-audit --paths=/vergleich,/vergleich/handwerkersoftware-kleine-betriebe` (2 von 136 URLs, alle 12 Regeln inkl. prompts #1–#3): **0 Verstöße**; `seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og` (136 URLs): **0 Verstöße**; zusätzlich `--only=prompts,antwort,faq-schema` sitewide: **0** – beide Plan-Audits nach dem zweiten Build erneut 0.
- `npm run test:e2e`: **297 bestanden, 0 rot** (75 übersprungen); nach der H2-Korrektur `design-v2.pw.cjs` erneut 64 bestanden, 0 rot.
- `route-audit` Exit 0 (`failures: []`, `badLinks: []`), zweimal; `live-check` lokal „Ergebnis: alle Prüfungen OK“ (46 × OK), zweimal.
- `visual-audit` (/vergleich, kleine Betriebe, / – Chromium und WebKit, 360/390/768/1024/1440): 30 Seiten, keine Statusfehler, kein Überlauf, keine JS-Fehler, keine a11y-Befunde (zweimal).
- Port 3100 nach beiden Serverläufen frei (eigene PID per Kommandozeile geprüft und beendet), Sperre freigegeben.

**Akzeptanz-greps:** `bundesfinanzministerium.de` in kleine-betriebe.ts 3, `abgerufenAm` 3, `\bbeste\b|testsieger` 0; `lib/seiten/kleine-betriebe.ts` in pricing-parity 1; `handwerkersoftware-kleine-betriebe` in vergleich.ts 1; Footer-Muster 5, „Warum CraftOS?“ im Footer 0; Ratgeber je 1; sitemap.ts 2, llms.ts 1; OG-Datei vorhanden; Map-Status „bestehend“.

**Sichtprüfung** (`C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-11/`, Chromium 360/768/1024/1440, WebKit 390): Kopf bei 360 mit H1 dreizeilig, Antwort, Stand und CTA im ersten Bildschirm (CTA-Unterkante ca. 590 px); Kriterienkacheln in zwei Reihen (1440) bzw. einspaltig (360), Titel ohne Silbentrennung; amtliche Quellenliste direkt unter den Kacheln; Tabelle ohne Hervorhebung, Note, 7 Quellen, Disclaimer; Footer-Spalte „Vergleiche“ bei 360 einspaltig, bei 768 in drei Spuren, bei 1024/1440 fünf Spuren ohne Überlauf; fünfte Hub-Kachel wide unter ToolTime. **Befund behoben:** H2 „Wie testen Sie Handwerkersoftware mit einem Auftrag?“ trennte das Kopfwort („Hand-werkersoftware“ bei 360, „Handwerker-software“ bei 1440) → „Wie testen Sie eine Software mit einem Auftrag?“.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Inhabervorgabe (22.10.2026, geht UI-SPEC und Plan vor)

**1. Nur Unterstütztes:** Keine CraftOS-Negativzelle, keine Kriterien, die CraftOS nicht hat, keine Negativlisten; FAQ „Brauchen Mitarbeitende … eine eigene Lizenz?“ nennt die CraftOS-App-Lizenz positiv. Der Builder wirft bei Nein-FAQ und Negativsätzen (`NEGATIVSATZ` aus `lib/seiten/vergleich.ts`), `baueMarktuebersicht` bei verneinter CraftOS-Zelle; Test „Inhaber 22.10.2026 und UWG“.

### Auto-fixed / Anpassungen

**2. [Rule 1 – Sichtbefund] H2 `testen` ohne Kopfwort** (Silbentrennung im Kopfwort, wie 08-10 bei der FAQ-H2). Commit `a1de3ee`.

**3. [Quelle] Wortlaut an die BMF-FAQ angepasst:** „Kleinbetragsrechnungen bis 250 € brutto“; GoBD-Kachel mit zweiter amtlicher Quelle (AO-Handbuch), siehe „Amtliche Quellen“.

**4. Laufzeit-FAQ aus Daten** über `monatlichKuendbar` („Das hängt vom Anbieter ab: von den fünf verglichenen Anbietern sind CraftOS und plancraft monatlich kündbar; …“) statt freiem UI-SPEC-Wortlaut, damit die Antwort mit `/vergleich` übereinstimmt und Datenänderungen folgt.

**5. [Rule 3] Tests außerhalb der Plan-Dateiliste angepasst:** `tests/ai-prompts.test.ts` (Status der neuen Seite `bestehend` statt `geplant`) und `tests/keyword-map.test.ts` (statische Seiten ohne `primary` prüfen nur Zielwerte, Keyword-Prüfung nur mit `primary`, wie 08-PATTERNS vorsieht).

**6. [Rule 2] Schutz erweitert:** `tests/e2e/design-v2.pw.cjs` prüft die neue Seite im Bild-/CLS-Budget (08-PATTERNS); `baueMarktuebersicht` mit `noteZusatz` statt Nachbearbeitung der Note.

**7. Footer-Raster** ab 768 px drei Spuren statt fünf, damit Linktexte in schmalen Spuren nicht brechen; ab 1024 px fünf Spuren.

---

**Total deviations:** 1 aus der Inhabervorgabe, 6 kleine Form-/Prüfanpassungen. **Impact:** Keine neuen Bausteine; keine Datei gelöscht.

## Issues Encountered

- „Snapshot ist aktuell“ weiterhin rot (bekannt, laut Auftrag nicht angefasst).
- `seo-audit --paths=/…` unter Git Bash wird ohne `MSYS_NO_PATHCONV=1` zu einem Windows-Pfad umgeschrieben und still übersprungen (erster Lauf „1 von 136“); mit der Variable 2 von 136 → `deferred-items.md`.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche (statische Seite, keine Endpunkte). Externe Links (BMF, Anbieter) `rel="nofollow"`, gleicher Tab. T-08-42 (amtliche Quellen mit Abrufdatum, „grundsätzlich“ und Ausnahmen), T-08-43 (keine Superlative/Rangfolge, keine Hervorhebung, Pflichthinweis/Disclaimer per Test), T-08-44 (Route, Map, Sitemap, llms in Commit `a1de3ee`) umgesetzt.

## Next Phase Readiness

- 08-13/08-14: alle Vergleichsseiten sind verlinkt (Hub, Footer, Ratgeber); `/vergleich` und kleine Betriebe sind sitemap-aktuell (22.10.2026). Vor dem Rollout Snapshot-Abgleich durch den Orchestrator.
- `live-check.mjs` prüft die Ankündigungsfreiheit bisher nur für `/vergleich`, nicht für Alternativen und kleine Betriebe (08-PATTERNS-Vorschlag, Rollout-Plan).

## Self-Check: PASSED
