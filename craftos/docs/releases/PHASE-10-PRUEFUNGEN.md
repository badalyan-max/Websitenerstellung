# Phase 10 – Integration und Prüfungen (Plan 10-06)

Stand: 23.10.2026, Haupt-Arbeitsbaum `C:/Projekte/Websitenerstellung`, Branch `main`, Port 3100. Verbindlich: `.planning/phases/10-abschlussaudit/10-CONTEXT.md` (D-01 bis D-43), `10-06-PLAN.md`, `10-UI-SPEC.md`. Dieses Dokument hält den Merge-Stand, die Übergaben aus den Spuren, den Endstand der zurückgestellten Punkte (D-31), die Inhaberliste und den Platz für das Phasen-Gate (10-12) fest. 10-07 überträgt die D-31-Tabelle in `PHASE-10-ROLLOUT.md`.

## 1. Merge-Stand

Der Orchestrator hat jede Spur mit `git merge --no-ff phase10-spur-<x>` nach `main` geführt (Standardbetreff). Spur f (Einrichtungsservice und Datenstandort, D-41) kam als Zusatzspur nach d.

| Reihenfolge | Spur | Merge-Commit | Zeit (Commit) | Inhalt |
|---|---|---|---|---|
| 1 | phase10-spur-e | `b34f9fe` | 23.10.2026 13:49 | 10-05 Vorab-Audit und SE Ranking, 10-11 Linkregister, Etappennachweis, Berichtsentwurf |
| 2 | phase10-spur-c | `4a995ed` | 23.10.2026 14:37 | 10-03 Support, Rechtsseiten, 404, ContentKopf K1/K2; 10-10 Rechner, Bento J3, Caption J4 |
| 3 | phase10-spur-a | `18a3a95` | 23.10.2026 14:37 | 10-01 a11y-audit-Werkzeug; 10-08 Dimmstufe, `a11y.pw.cjs`, Baseline |
| 4 | phase10-spur-b | `a214897` | 23.10.2026 15:06 | 10-02 Lighthouse-Modus, Prüfsuite; 10-09 Gate-Seiten, Logo als SVG |
| 5 | phase10-spur-d | `f20417b` | 23.10.2026 15:06 | 10-04 Kassenbuch und § 13b, Schutztests; 10-13 Lagerfoto-Credits |
| 6 | phase10-spur-f | `919b037` | 23.10.2026 15:06 | Einrichtungsservice (D-41) und Datenstandort |

Zusätzlich auf `main` vor 10-06: `f8b3158` (seo-meta-Test auf die Map-Korrektur aus 10-05), `476c1a0` (Datenschutzerklärung überarbeitet, Referenz aktualisiert), `51ba246` und `cbc9f81` (CONTEXT-Nachträge D-42, D-43).

**Startgate (B1)** – Ausgabe der Prüfung `git log --first-parent --merges --reverse --format=%s main | grep -oE 'phase10-spur-[a-e]' | awk '!s[$0]++'`:

```
phase10-spur-e phase10-spur-c phase10-spur-a phase10-spur-b phase10-spur-d
```

Ergebnis: Reihenfolge e → c → a → b → d belegt; f folgt nach d (mit `[a-f]`: `… phase10-spur-d phase10-spur-f`). Alle zehn SUMMARYs (10-01 bis 10-05, 10-08 bis 10-11, 10-13) und `10-F-NOTIZ.md` liegen vor; `git status --porcelain craftos` war leer; Port 3100 war frei.

## 2. Übergaben

Quellen: Abschnitte „Übergaben“/„Übergabeliste“ der SUMMARYs 10-01 bis 10-05, 10-08 bis 10-11, 10-13, „Behebungsliste“ aus 10-05, `10-F-NOTIZ.md` sowie der Auftrag des Orchestrators (D-42, Sitemap-Daten, Zeitlimit, `robots.ts`, 404). Gleichartige Punkte sind zusammengefasst; Menü-Präsenz, live-check-Block, Sitemap-Daten und D-42 zählen je als ein Punkt. **Obergrenze W10: 12 Punkte – eingehalten (12 umgesetzt).** Weitere Punkte stehen unter § 2.2 als Restliste mit Besitz.

### 2.1 Umgesetzte Punkte

| Nr. | Punkt | von Plan | Datei | Umsetzung | Commit/Status |
|---|---|---|---|---|---|
| 1 | `a11y.pw.cjs` in `testMatch` (K-9); 404-Fall mit drei Karten `/`, `/hilfe`, `/funktionen`, genau einem robots-Meta und ohne Canonical; Rechtsseite `/impressum` ohne Ausnahme | 10-08 Nr. 1–2, 10-03, 10-10 | `tests/e2e/playwright.config.cjs`, `tests/e2e/a11y.pw.cjs` | Spec läuft in der regulären Suite | `8849960` |
| 2 | Caption-Fall bei 360 px auf fünf Seiten (J4) | 10-10 | `tests/e2e/design-v2.pw.cjs` | rechte Kante ≤ `clientWidth − 18`, nicht angeschnitten, kein Seitenquerscroll, `<caption>` mit Text | `8849960` |
| 3 | `HINWEIS_MAX` nach `components/v2/budgets.ts` (K2) | 10-03, 10-10 | `components/v2/budgets.ts`, `components/content/ContentKopf.tsx`, `tests/design-v2-budgets.test.ts`, `tests/kernseiten.test.ts` | `TEXT_BUDGET.contentKopf.hinweis = 80`; Fehlertext unverändert | `8849960` |
| 4 | Darstellungstest um `components/CraftOSLogo.tsx` (K-3) | 10-10 | `tests/phase10-darstellung.test.ts` | Logo im Geltungsbereich, 0 Treffer | `8849960` |
| 5 | `docs/DESIGN-V2.md` § 19.6 (Dimmstufe, Fokusalgorithmus), § 19.7 (Logo-SVG, Schnitte, `inlineCss`), § 19.8 (Menü), § 19.9 (D-42) (K-12) | 10-08 Nr. 3, 10-09, 10-10 | `docs/DESIGN-V2.md` | eingetragen | `8849960`, `0033220`, `2a8936d` |
| 6 | B10-Neumessung `/funktionen/rechnungen` (K-8) | 10-04, 10-10 | – (Messung) | Ergebnis unten in § 2.3, Kachelhöhen als Sollwert | gemessen 23.10.2026, kein Code nötig |
| 7 | Zusatzfunktionen im Mega-Menü (D-21, D-40) | 10-04 | `components/layout/MegaMenu.tsx`, `MegaMenu.module.css`, `tests/navigation.test.ts`, `tests/e2e/home-navigation.pw.cjs` | „Weitere Funktionen“ je Gruppe mit Extras, zehn Links | `2a8936d` |
| 8 | Sitemap-Änderungsdaten 2026-10-23 (K-15, K-5) | 10-03, 10-04, 10-10, 10-13, 10-F, Orchestrator | `app/sitemap.ts`, `lib/funktionen.ts`, `tests/sitemap-phase10.test.ts` | `/`, `/funktionen`, Rechner, `/support`, Rechtsseiten (jetzt mit Datum), `/funktionen/datenuebernahme` (`checkedAt`); übrige Phase-10-Seiten waren bereits datiert | Commit „feat(10-06): live-check Phase 10, Sitemap-Daten, D-31-Endstand“ |
| 9 | live-check Phase-10-Block | 10-04, 10-13, 10-F, Plan | `scripts/live-check.mjs` | sieben Prüfungen (Köpfe, 404, Zusatzfunktionen, Lagerfoto-Credits, Schriften, Analytics-Verdrahtung, Einrichtungsservice) | Commit „feat(10-06): live-check Phase 10, Sitemap-Daten, D-31-Endstand“ |
| 10 | Vorab-Audit: 404 ohne geerbten Canonical und mit nur einem robots-Meta; KI-Crawler ausdrücklich erlaubt | 10-05 Behebungsliste Nr. 6–7 | `app/not-found.tsx`, `app/robots.ts`, `tests/robots.test.ts`, `tests/kernseiten.test.ts` | `metadata` mit `canonical: null`, `robots: null`; GPTBot, ClaudeBot, PerplexityBot, Google-Extended mit `Allow: /` | `fdf70d0` |
| 11 | Zeitlimit-Flake `content-produktwahrheit.test.ts` Z. 213 | 10-04, 10-10, 10-13 | `tests/content-produktwahrheit.test.ts` | Zeitlimit 60 s wie 08-09 | `8849960` |
| 12 | D-42: ungenutzten Code entfernen, Impressum ohne OS-Plattform, längerer Title | Inhaber (D-42) | siehe § 2.4 | entfernt nach Such- und Build-Nachweis | `0033220` |

### 2.2 Restliste (nicht in den 12 Punkten, mit Besitz)

| Punkt | Herkunft | Datei | Besitz |
|---|---|---|---|
| Volle A11y-Matrix als `--shard=k/5` über beide Engines im Schlussnachweis | 10-08 Nr. 4, 10-01 | `scripts/a11y-audit.mjs` | 10-12 |
| Sichtprüfung der `incomplete`-Kontrastknoten (Badges, `MediaFigure`, Tabellenzeilen) | 10-08 Nr. 5 | – | 10-12 |
| Lighthouse Accessibility `/impressum` (Gate 100) und Rechnerseiten (Soll 100) | 10-03, 10-10 | `scripts/performance-audit.mjs` | 10-12 |
| Optionales npm-Skript `a11y:audit` | 10-08 Nr. 6 | `package.json` | offen, kein Gate |
| Interne Links `/impressum` (≥ 3 im `<main>` über Bausteine, Rechtstext unverändert) | 10-05 Behebungsliste Nr. 5 | `components/legal/Legal.tsx` | offen: lokal 1 interner Link im `<main>` (Brotkrumen „/“); eine Ergänzung über Bausteine (z. B. LinkKarten unter dem Rechtstext) ist eine Darstellungsänderung der Rechtsseite → Orchestrator/10-12 entscheidet |
| Byte-Referenzen der Phase-9-Köpfe nach neuen Artikeln | 10-03 | `tests/contentkopf-unveraendert.test.ts` | kein Handlungsbedarf: volle Suite grün |
| Weitere ungenutzte Altklassen außerhalb der D-42-Liste: `.craft-page-hero`, `.craft-watermark`, `.section-title`, `.rule-list`, `.notice` | 10-06 (Suche) | `app/globals.css` | Inhaber/Orchestrator, Freigabe nötig |
| Koordinationsrezept für Website-Läufe | 10-01, 10-08 Nr. 7 | CraftOS-Workspace | Orchestrator |
| Stichtag 01.01.2027 Lagerfoto-Credits, Mobile-Anzeige „2 Betriebscredits“ | 10-13 | Mobile-Repo | Inhaber |
| `ETAPPEN-NACHWEIS-V2.md` Zeile 10, Abschlussbericht-Endwerte, seo-report ohne `--leaderboard`, IndexNow der D-41-Pfade | 10-05, 10-11, 10-F | Berichte | 10-07 |

### 2.3 B10-Neumessung `/funktionen/rechnungen` (K-8)

Skript `scratchpad/10-06/b10-rechnungen.cjs` (Verfahren `scratchpad/10-10/b10.cjs` plus Größenfolge und Prüfung leerer Rasterzellen je Zeile), lokaler Produktionsserver 3100, reduzierte Bewegung, zweimal gemessen (Lauf 1 und 2 identisch).

| Engine | Breite | Spalten | Folge | Kachelhöhen (px, Sollwert) | Leerraum unter Text | leere Rasterzellen |
|---|---|---|---|---|---|---|
| Chromium | 768 | 2 | md·sm·sm·wide·wide·wide | 211 / 211 / 211 / 211 / 211 / 211 | 0 | 0 |
| Chromium | 1024 | 4 | md·sm·sm·wide·wide·wide | 260 / 260 / 260 / 227 / 227 / 227 | 0 | 0 |
| Chromium | 1440 | 4 | md·sm·sm·wide·wide·wide | 235 / 235 / 235 / 227 / 227 / 227 | 0 | 0 |
| WebKit | 768 | 2 | md·sm·sm·wide·wide·wide | 211 / 211 / 211 / 211 / 211 / 211 | 0 | 0 |
| WebKit | 1024 | 4 | md·sm·sm·wide·wide·wide | 260 / 260 / 260 / 227 / 227 / 227 | 0 | 0 |
| WebKit | 1440 | 4 | md·sm·sm·wide·wide·wide | 235 / 235 / 235 / 227 / 227 / 227 | 0 | 0 |

Die Kachelhöhen gelten als neuer Sollwert für `/funktionen/rechnungen` (K-8). Chromium und WebKit stimmen pixelgenau überein; die Bodenausrichtung J3 lässt keinen Leerraum unter dem Text.

### 2.4 D-42: entfernte Elemente mit Nachweis

Nachweis je Element vor dem Entfernen: Suche über `app/`, `components/`, `lib/`, `scripts/`, `tests/`, `content/` (Node-Skript, Importe, `className`, Dateinamen), danach `next build` grün (Lauf 1, 23.10.2026) und volle Vitest-Suite grün. Commit `0033220`.

| Element | Nachweis vorher | Folgeanpassung |
|---|---|---|
| `components/ui/PageHero.tsx` | einziger Importeur `_seo-referenz/app-blog/page.tsx` (von `tsconfig` ausgeschlossen, nicht gebaut); Tests erwähnen PageHero nur als Verbot | – |
| `components/ui/TrialCta.tsx` | nirgends importiert; einziger Nutzer von `.section-space`, `.btn-cta`, `.eyebrow` | mitentfernt, damit die Altklassen entfallen können (Abweichung, nicht auf der Liste) |
| `CalculatorCta`, `.ctaSection`, `.primaryLink` | nur Definition in `CalculatorPage.tsx`, kein Aufruf | `tests/kernseiten.test.ts` erwartet jetzt 0 Vorkommen |
| Altklassen in `app/globals.css` (acht Klassen, 27 Regelblöcke inkl. Media-Regeln und `.dark-section .eyebrow`/`.btn-secondary`) | außer in PageHero/TrialCta kein `className` mit diesen Klassen; `v2-eyebrow`/`v2-btn-cta` bleiben | `tests/aufraeumen-d42.test.ts` |
| `public/fonts/clash-display-500.woff2`, `clash-display-700.woff2`, `general-sans-500.woff2` | `app/layout.tsx` lädt sie seit 10-09 nicht; Verweise nur im Herkunftskommentar von `CraftOSLogo.tsx` und im Netzfall der Logo-Spec | Kommentar angepasst; `logo-schriftzug.pw.cjs` prüft jetzt die drei erlaubten Schnitte per Hash (grün) |
| `components/product-demo/**` (5 Dateien), `lib/demo/**` (2 Dateien) | Importe nur innerhalb der Demo und in `tests/demo.test.ts`; keine Datei unter `app/` | `tests/demo.test.ts`, `demo-planning.pw.cjs`, `mobile-step-flow.pw.cjs` (übersprungen, nicht in `testMatch`) und `browser-product-demo.archive.cjs` entfernt; D-23-Schutztest ersetzt durch `tests/aufraeumen-d42.test.ts` |
| Impressum: Satz und Link zur OS-Plattform | – | VSBG-Satz wörtlich; `tests/fixtures/rechtstexte/impressum.txt` bewusst aktualisiert; Title „Impressum – CraftOS Handwerkersoftware“ über `docs/seo/keyword-map.json` (`KEYWORD-MAP.md` mit Änderungsnotiz, `tests/keyword-map.test.ts`) |

Die Datenschutzerklärung ist unverändert.

### 2.5 Audit-Behebungen

Mechanisch, ohne Fließtext: Zahl geänderter Fließtextsätze **0**. Geänderte Dateien: `app/not-found.tsx` (nur Metadaten), `app/robots.ts`. Die Impressum-Änderung ist keine Audit-Behebung, sondern die Inhaberfreigabe D-42 (Rechtstext-Referenz `tests/fixtures/rechtstexte/impressum.txt` bewusst aktualisiert, VSBG-Satz wörtlich).

### 2.6 Produktbasis

`npm run sync:product:check`: „Snapshot ist aktuell: v4.0.0-test.249 (bfe165e9)“. Lokale Remote-Refs: Web `origin/release` = `bfe165e90` (Tag `v4.0.0-test.249`), Mobile `origin/release` = `837aab4f` (Tag `mobile-v1.0.0-test.96`). **Kein Delta**, keine Übernahme nötig (ohne `git fetch` in den Produkt-Repos, die andere Agenten nutzen).

### 2.7 Prüfergebnisse 10-06 (lokal, unter `.heavy-lock`, Port 3100)

| Prüfung | Ergebnis |
|---|---|
| Vitest voll | 58 Dateien, 1523/1523 grün (vorher 1546 in 56 Dateien; weniger durch das entfernte `tests/demo.test.ts`, neu `robots.test.ts`, `aufraeumen-d42.test.ts`, `sitemap-phase10.test.ts` und Einzelfälle) |
| `tsc --noEmit`, `eslint .` | 0 Fehler, 0 Warnungen (die bisherige Warnung „`rel` ungenutzt“ in `phase10-darstellung.test.ts` ist mit entfernt) |
| `next build` | grün |
| E2E Lauf 1 (`a11y`, `design-v2`, `navigation`, `home-navigation`, `logo-schriftzug`) | 274 bestanden, 4 fehlgeschlagen, 102 übersprungen; die 4 Fehlschläge („Zwei Klicks“ Desktop/Mobil, beide Engines) waren strikte Selektoren, die nach der Menüänderung auch den gleichnamigen Zusatzlink trafen – Selektor auf `:not([data-menu-zusatz])` geschärft |
| E2E Lauf 2 (`home-navigation`) | 40 bestanden, 0 fehlgeschlagen, 24 übersprungen |
| `a11y.pw.cjs` (jetzt in `testMatch`) | 67 bestanden, 0 fehlgeschlagen; „Vorlage: Rechtsseite /impressum“ ohne Ausnahme grün, „Vorlage: 404“ mit Karten, einem robots-Meta und ohne Canonical grün, „Tastatur: Menü und Drawer“ grün |
| `design-v2.pw.cjs` | 142 bestanden, 0 fehlgeschlagen, Caption-Fall grün |
| live-check lokal | 76 OK, 0 FEHLER (Lauf 2; Lauf 1 deckte zwei Fehler im Skript auf: Bestandsprüfung zählte noch 30 statt 32 Funktionen, Schriftprüfung löste `../media/…` gegen den Ursprung statt gegen die CSS-Datei auf) |
| `sync:product:check` | aktuell, kein Delta |
| Menü-Messung (`scratchpad/10-06/screens.cjs`) | 1440 px: zehn Zusatzlinks, fünf Beschriftungen, Zielhöhe ≥ 44 px, Fokusring 3 px sichtbar, kein Querüberlauf; Panelinhalt 986 px bei 795 px sichtbarer Höhe (Viewport 900) – das Panel scrollt intern (`max-height: calc(100dvh − 104px)`, Bestand), die Fußleiste „Alle Funktionen …“ liegt erst nach dem Scrollen im Blick. 390 px: Drawer ohne Querüberlauf, Zielhöhe 48 px, `main` inert |

## 3. Zurückgestellte Punkte (D-31, Endstand)

| # | Punkt | Zuordnung | Endstand | Beleg |
|---|---|---|---|---|
| 1 | KI-Bild `werkstatt-2026` ohne Kennzeichnung | erledigt (09-11) | erledigt | 09-11; Alt und Kennzeichnung geprüft in `a11y.pw.cjs` „Vorlage: Styleguide-Bild“ |
| 2 | WebKit-Flake „außerhalb des Viewports“ | 10-02 | erledigt | `9388865`, Bedingung statt Pause |
| 3 | Kein Koordinationsrezept für die Website | nicht in diesem Meilenstein | nicht in diesem Meilenstein | Änderung am CraftOS-Workspace; Läufe lokal unter `.heavy-lock` |
| 4 | Icon-Kachel-Weißraum bei 1024 px | 10-03 (c) | erledigt | `093f49b` (J3), B10 vorher/nachher in DESIGN-V2 § 19.5 |
| 5 | FeatureSnippet-Dimmstufe | 10-01 (a) | erledigt | `f04fcf8` (10-08), DESIGN-V2 § 19.6 |
| 6 | Review-Low 07 IN-01 (Gutter) | nicht in diesem Meilenstein | nicht in diesem Meilenstein | Entscheidung D-14 aus Phase 7 bleibt |
| 7 | 07 IN-05 Teil 2 (CLS ohne reduzierte Bewegung) | 10-02 (b) | erledigt | 10-02: CLS 0 auf allen acht Snippet-Seiten |
| 8 | 07 IN-06 (doppelte Slugs in `INHALTE`) | 10-04 (d) | erledigt | `a25fd76`/`77bb4ed`, `af3c59f` (wirft bei doppeltem Slug) |
| 9 | 07 IN-07 (`zielwerte` verschieben) | erledigt (08-01) | erledigt | `lib/seo-meta.ts` |
| 10 | 07 IN-08 (doppelte Validierung) | nicht in diesem Meilenstein | nicht in diesem Meilenstein | Codepflege ohne Nutzerwirkung |
| 11 | Ältere Release-Tests ohne Helfer | 10-02 (b) | erledigt | `9388865`, `tests/release-repos.ts` |
| 12 | Impressum-Linkkontrast 2,84 : 1 | 10-03 (c) | erledigt | `5e9c8e9`; seit D-42 entfällt der Link ganz |
| 13 | E2E-Zeitflakes WebKit | 10-02 (b) | erledigt | `9388865` |
| 14 | `content.test.ts` Zeitlimit | erledigt (08-09) | erledigt | `1e1cbb6`; analog 10-06 für `content-produktwahrheit.test.ts` |
| 15 | Produkt-Snapshot veraltet | erledigt (09-10) | erledigt | `sync:product:check` am 23.10.2026 grün (§ 2.6) |
| 16 | Tabellen-Caption bei 360 px | 10-03 (c) | erledigt | `093f49b` (J4); Fall in `design-v2.pw.cjs` (10-06) |
| 17 | Verneinte KI-Formulierungen | erledigt (Phase 9) | erledigt | `content-pruefen --l1` 0 Befunde |
| 18 | Überclaim-/Datenschutzaussagen `/gobd`, `/fakten` | Inhaber (optional) | Inhaber | GoBD-Aussage folgt mit D-43 (Spur g) |
| 19 | Lint-Konfiguration (Playwright-Berichte) | erledigt (08-13) | erledigt | 10-06: `npm run lint` nach einem E2E-Lauf mit 4 Fehlschlägen (Artefakte in `tests/e2e/artifacts`) 0 Probleme |
| 20 | Silbentrennung H2 `/preise` | 10-03 (c) | erledigt | 10-10 Messung, Regel `hyphens: manual` aus 09-09 |
| 21 | Silbentrennung WebKit ohne Wörterbuch | Inhaber | Inhaber | Prüfung nur in echtem Safari; kein Querscroll gesichert in `a11y.pw.cjs` |
| 22 | `announcements.test.ts` rot | erledigt (09-11) | erledigt | volle Vitest-Suite 10-06 grün (1523/1523, 58 Dateien) |
| 23 | Antwortregel-Verstöße 15 Ratgeber | erledigt (09-16) | erledigt | seo-audit sitewide 0 |
| 24 | Zusatzkarten Kassenbuch und § 13b auf `/funktionen` und im Menü | 10-04 (d) + 10-06 (D-40) | erledigt | `af3c59f` (Seite und Kacheln), `2a8936d` (Mega-Menü, D-40) |
| 25 | `components/product-demo` und `lib/demo` | Inhaber + Schutztest | erledigt (D-42) | entfernt in `0033220`; Schutz `tests/aufraeumen-d42.test.ts` |
| 26 | Lager-Foto-KI ohne Credit-Wert | 10-04 (d) | erledigt | `7a60fd8` (10-13): Code-Beleg `aiPricing.ts`, Werte in `lib/site.ts` |
| 27 | Testkontext-Muster `pricing-parity` | 10-02 (b) | erledigt | `1e83aa1`, `9388865` |
| 28 | Mini-UI-Status „Fertiggestellt“ | nicht in diesem Meilenstein | nicht in diesem Meilenstein | keine Szene braucht ihn |
| 29 | Snapshot-Feld `tag` (Mobile) | nicht in diesem Meilenstein | nicht in diesem Meilenstein | nur interne JSON |
| 30 | Grenzen 09-REVIEW-FIX (HI-01, LO-03) | nicht in diesem Meilenstein | nicht in diesem Meilenstein | bewusst begründet |
| 31 | Kundenportal-Befunde (leeres Portal, Einladungsmail) | Inhaber | Inhaber | Produkt-Repo |
| 32 | Analytics-Kontrolle `trial_click`/`ai_visit` 05–09 | Orchestrator → 10-05/10-07 | teilweise erledigt | 10-11 (`ae2b1c3`): Fenster 05–07 vollständig, 08/09 als Teilwerte; Phase 10 im Rollout |
| 33 | Sichtung Screenshots/Gesamteindruck | Inhaber | Inhaber | ästhetisches Urteil |
| 34 | Wettbewerberaussagen (UWG) | Inhaber | Inhaber | fachlich-rechtliches Urteil |
| 35 | Rechts-/Steuerfakten, `[ASSUMED]`-Quellen | Inhaber | Inhaber | juristisches Urteil |
| 36 | Wettbewerberangaben nach 60 Tagen prüfen (bis 21.12.2026) | nicht in diesem Meilenstein | nicht in diesem Meilenstein | Termin im Abschlussbericht |
| 37 | Datenschutzabschnitt Webanalyse, Impressum „§ 5 DDG“ | Inhaber | teilweise erledigt | Datenschutzerklärung überarbeitet (`476c1a0`, Orchestrator/Inhaber); „§ 5 DDG“ bleibt Inhaberpunkt |
| 38 | Portale, Bewertungen, Portal-Mails (SEO-08) | Inhaber; Messung 10-05/10-11 | Inhaber | `caa4931`, LINKPLAN § „Übergabe 2“; omr.com live |
| 39 | SE-Ranking-Kontoverbrauch | Orchestrator/Inhaber | erledigt (Ursache), Tarif offen | D-37: Leaderboard nur mit `--leaderboard` (`fa0ab7b`) |
| 40 | Sichtprüfung Esc/Fokusverlust im Header | 10-01 (a) | erledigt | `89f6313` „Tastatur: Menü und Drawer“; nach der Menüänderung grün (`a11y.pw.cjs` 67 bestanden, 0 fehlgeschlagen) |

## 4. Inhaberliste

### 4.1 „Freigabe zum Entfernen nötig“ – Endstand

| Kandidat | Grund | Status |
|---|---|---|
| `components/ui/PageHero.tsx` | nach 10-03 nirgends gerendert | entfernt (D-42, `0033220`) |
| `CalculatorCta` in `components/calculators/CalculatorPage.tsx` samt `.ctaSection`, `.primaryLink` | seit 10-10 nicht gerendert | entfernt (D-42, `0033220`) |
| Altklassen `section-space`, `split-section`, `soft-panel`, `section-intro`, `btn-cta`, `btn-secondary`, `eyebrow`, `spec-label` in `app/globals.css` | außer im ungenutzten `TrialCta` nirgends genutzt | entfernt samt `components/ui/TrialCta.tsx` (D-42, `0033220`) |
| Schriftdateien Clash 500/700, General 500 | seit 10-09 nicht geladen | entfernt (D-42, `0033220`) |
| `components/product-demo/**` samt `lib/demo/**` (ProductDemo) | ungerendert; Szene `ki` zeigt den nicht freigeschalteten KI-Agenten | entfernt (D-42, `0033220`); Folgen: übersprungene Specs `demo-planning.pw.cjs`, `mobile-step-flow.pw.cjs`, `browser-product-demo.archive.cjs` und `tests/demo.test.ts` entfernt; `components/ui/MobileAppGallery.tsx` bleibt (eigenständig, von `media-budget.test.ts` geprüft) |
| `.craft-page-hero`, `.craft-watermark`, `.section-title`, `.rule-list`, `.notice` in `app/globals.css` | nach D-42 ungenutzt, aber nicht auf der Freigabeliste | **Freigabe nötig** (neu) |

### 4.2 Inhaberpunkte

- **ProductDemo „archivieren oder löschen?“:** entschieden mit D-42 („mach was du richtig findest“), umgesetzt als Löschen; die Demo bleibt im Git-Verlauf abrufbar (letzter Stand vor ``0033220``).
- **ODR-Satz und kurzer Title im Impressum:** entschieden mit D-42; Satz und Link zur OS-Plattform entfernt, VSBG-Erklärung wörtlich, Title „Impressum – CraftOS Handwerkersoftware“.
- **Datenschutzabschnitt Webanalyse und „§ 5 DDG“:** Datenschutzerklärung mit `476c1a0` überarbeitet; „Angaben gemäß § 5 DDG“ im Impressum bleibt zur Bestätigung beim Inhaber. Offen aus 10-F: Satz „Server in der EU“ in `/datenschutz` gegen die R2-Jurisdiktion „default“ prüfen (ausdrücklich nicht Teil von D-42).
- **Hinweisabsätze „Vorlage …“ in `/datenschutz` und `/agb`:** Wortlaut unverändert, Entscheidung beim Inhaber.
- **Kundenportal-Befunde** (leeres Portal, Einladungsmail): Produkt-Repo, kein Website-Auftrag.
- **Portal-Anmeldungen und Bewertungen:** nach `docs/seo/LINKPLAN.md` § 7 „Übergabe 2 an den Inhaber“ (ProvenExpert, G2, kennstdueinen.de, SoftwareWorld, Portal-Mails).
- **Sichtung der Screenshots** der Phasen 5–10 (Gesamteindruck), Menü-Screenshots 10-06 im Scratchpad. Neu zu bewerten: Das Mega-Menü ist mit den Zusatzfunktionen höher als ein 900-px-Viewport und scrollt intern; Option bei Bedarf: kompaktere Zusatzliste (14 px, Zielhöhe 32 px) statt des Bestandsstils.
- **UWG- und Rechtsfakten** der Vergleichs- und Wissensseiten.
- **Silbentrennung in echtem Safari** (`/hilfe/material-entnehmen-zurueckbuchen`).
- **Lagerfoto-Credits:** Mobile-Anzeige vor dem 01.01.2027 nachziehen (10-13).

## 5. Phasen-Gate

Plan 10-12, 23.10.2026, Haupt-Arbeitsbaum `main`, lokal unter `.heavy-lock`, Port 3100. Für die Website gibt es kein Koordinationsrezept (§ 3 Nr. 3); alle Läufe lokal und einzeln, keine CI.

### 5.1 Startgate und Prüfsuiten (D-14, W1, W8)

**Startgate:** `10-06-SUMMARY.md` und `10-REVIEW.md` vorhanden, `craftos/` sauber, Port 3100 frei. Review-Prüfung: 6 IDs der Stufen CR/HI/ME/WR in `10-REVIEW.md` (HI-01, ME-01 bis ME-05), alle in `10-REVIEW-FIX.md` als „behoben“ mit Commit geführt → bestanden.

**Zusatzauftrag Rechtsseiten (Inhaberfreigabe 23.10.2026, über den Orchestrator):** Der sichtbare Vorlagenhinweis unter den AGB („Diese AGB sind eine Vorlage und sollten vor Veröffentlichung rechtlich geprüft …“) ist durch den Absatz „Stand: 23. Oktober 2026“ ersetzt, wie in `/datenschutz` (`19dd8ed`). Der übrige AGB-Text ist wörtlich unverändert; `tests/fixtures/rechtstexte/agb.txt` wurde bewusst mit den exportierten Hilfsfunktionen aus `tests/rechtstexte-wortlaut.test.ts` neu erzeugt (Diff: genau eine Zeile). `/impressum` enthält keinen gleichartigen Hinweis („Einzelunternehmer · CraftOS“ ist eine Angabe, kein Vorlagenhinweis); `LegalHinweis` bleibt dort in Gebrauch. Review-Befund LO-06 damit behoben. Block 3 lief auf diesem Stand (Neubau), dazu gezielt Wortlaut-Test, A11y und live-check für `/agb` und `/impressum`.

| Block | Prüfung | Ergebnis |
|---|---|---|
| 1 (15:00–15:01 UTC) | `npm test` (Vitest voll) | 59 Dateien, 1699/1699 grün |
| 1 | `npm run lint` | 0 Probleme |
| 1 | `npm run typecheck` (`tsc --noEmit`) | 0 Fehler |
| 1 | `npm run sync:product:check` | aktuell, v4.0.0-test.249 (`bfe165e9`) |
| 1 | `check-no-secrets.mjs` (app, components, lib, tests, scripts, docs, .planning) | „Schlüssel in keiner Datei“ |
| 2 (15:01–15:18 UTC) | `next build` | grün |
| 2 | `seo-audit.mjs` sitewide | 156/156 Sitemap-URLs, 12 Regeln, 0 Verstöße |
| 2 | `npm run test:e2e` (ein voller Lauf, 15,7 min) | 467 bestanden, 0 fehlgeschlagen, 0 flaky, 161 übersprungen; keine Einzelwiederholung nötig |
| 2 | davon `chromium-1440` | 152 bestanden, 0 fehlgeschlagen, 5 übersprungen |
| 2 | davon `chromium-390-touch` | 84 bestanden, 0 fehlgeschlagen, 73 übersprungen |
| 2 | davon `webkit-1440` | 148 bestanden, 0 fehlgeschlagen, 9 übersprungen |
| 2 | davon `webkit-390-touch` | 83 bestanden, 0 fehlgeschlagen, 74 übersprungen |
| 3 (15:18–15:30 UTC) | Neubau nach `19dd8ed`, Vitest voll | Build grün; 59 Dateien, 1699/1699 grün |
| 3 | `route-audit.mjs` | 156 Routen, 0 Fehler, 0 defekte Links (159 interne Links, 14 Assets, 6 OG-Bilder); 10 gewollte 404-Proben |
| 3 | `visual-audit.mjs` | 290 Aufnahmen (29 Routen × 5 Breiten × 2 Engines), 0 Statusfehler, 0 Überlauf, 0 JS-Fehler, 0 A11y-Befunde |
| 3 | `live-check.mjs` lokal | 77 OK, 0 FEHLER („alle Prüfungen OK“), inkl. Kernaussagen D-41/D-42/D-43 |
| 3 | gezielt `a11y.pw.cjs` „Rechtsseite“ | 2 bestanden, 0 fehlgeschlagen (2 übersprungen, mobil) |
| 3 | gezielt `a11y-audit.mjs --paths=/agb,/impressum` | 20 Aufrufe, Gate 0, Großtext 0, Tastatur 0, Status 0 |
| nach Block 3 | `npm run lint` erneut (D-31 Nr. 19) | 0 Probleme |

Port 3100 war nach jedem Block frei; die Sperre wurde zwischen den Blöcken freigegeben.

**Sichtprüfung (visual-audit, selbst angesehen):** Rechner-Übersicht, Support, Impressum, AGB (Ende mit „Stand: 23. Oktober 2026“), 404, Gewerke-Detail `/gewerke/elektriker` (WebKit 360), Hilfekategorie `/hilfe/kategorie/einrichtung`, `/preise` bei 360 px (Tabellen scrollen seitlich wie vorgesehen) – ohne Befund. Ablage: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-12/visual/` (Ausschnitte eine Ebene höher). Mega-Menü siehe § 5.2.

### 5.2 A11y-Matrix (D-05 bis D-08, HI-01)

Ein Build (15:33 UTC, Laufkennung `build-ud54z7zXV3Fj0XPptQaFd`), danach fünf Teile `a11y-audit.mjs --shard=k/5` ohne `--engines`, je Teil eigene Sperre und eigener Serverstart auf 3100, anschließend `--merge`.

| Teil | Aufrufe | Laufzeit | Gate | Großtext | Tastatur | Status |
|---|---|---|---|---|---|---|
| 1/5 | 178 | 224 s | 0 | 0 | 0 | 0 |
| 2/5 | 178 | 224 s | 0 | 0 | 0 | 0 |
| 3/5 | 178 | 228 s | 0 | 0 | 0 | 0 |
| 4/5 | 178 | 247 s | 0 | 0 | 0 | 0 |
| 5/5 | 178 | 229 s | 0 | 0 | 0 | 0 |

**Merge (Exit 0, „Gate bestanden“):** 158 Seiten (156 Sitemap-URLs, `/styleguide`, 404), **890 Aufrufe** – Chromium 790 (158 × 5 Breiten), WebKit 100 (20 Vorlagen × 5 Breiten); je Breite 360/390/768/1024/1440 jeweils 178 Aufrufe. Animationszustand: 110 Prüfungen auf 22 Snippet-Seiten.

| Zähler | Ergebnis |
|---|---|
| Gate-Verstöße (`serious`/`critical`, `color-contrast`, `target-size`) | **0** (je Engine und je Breite 0) |
| Verstöße je Regel (`jeRegel`) | keine Regel mit Befund – auch keine `moderate`/`minor` |
| Großtext-Knoten < 4,5 : 1 | **0** |
| Tastaturfehler (inkl. 2.4.11) | **0** |
| Statusfehler | **0** |
| Unvollständige Kontrastknoten (axe `incomplete`, nur Bericht) | 4594 (Baseline 10-08: 4661) |

Gegenüber der Baseline 10-08 (25 `color-contrast` auf den Rechtsseiten) ist die Matrix jetzt auch auf `/impressum`, `/datenschutz` und `/agb` bei 0.

**Unvollständige Kontrastknoten – Sichtprüfung:** Es sind dieselben Bausteine wie in der Baseline 10-08 (axe kann den Hintergrund wegen gestreckter Kartenlinks, Verläufen, Überlagerungen oder Sticky-Spalten nicht bestimmen): `StepFlow`-Ziffernknoten (`aria-hidden`, 910) und -Titel (226), Plattform-Badges in `FeatureCard` (652), `small`-Texte in `DeviceFrame` (545), `MediaFigure`-Kennzeichnung (508), Tabellenzellen der Vergleichs-/Preistabellen (242), `FeatureCard`-Titel und -Nutzen (351), `DeviceFrame`-Caption (125), `ConnectedScene`-Pills (55) und Einzelknoten. Stichproben in den visual-audit-Aufnahmen (`/funktionen` Karten mit Badges und Kennzeichnung, `/gewerke/elektriker` StepFlow bei 360 px, `/preise`-Tabellen bei 360 px, Hilfekategorie-Karten): dunkler Text auf hellen, vollflächigen Flächen bzw. dunkle Ziffern auf Bernstein, kein sichtbar schwacher Kontrast.

**Mega-Menü und Drawer** (gemessen während Teil 1 mit `scratchpad/10-06/screens.cjs`, Aufnahmen in `…/scratchpad/10-12/menue/`): 1440 px Chromium – zehn Zusatzlinks, fünf Beschriftungen, kleinste Zielhöhe 44 px, Fokusring 3 px auf „Kassenbuch“ sichtbar, kein Querüberlauf; das Panel scrollt bei 900 px Viewport intern (986 px Inhalt bei 795 px, Bestand, Inhaberpunkt § 4.2). 390 px (beide Engines) – Drawer ohne Querüberlauf, Zielhöhe 48 px, `main` inert. WebKit setzt per Tab keinen Fokus auf Links (Standardverhalten von Safari ohne „Tab hebt alle Steuerelemente hervor“); die Tastaturprüfung der Matrix ist davon unberührt.

**Korrektur während des Gates:** Der erste `--merge` brach mit Exit 3 ab („Teilbericht aus einem gezielten Lauf“), obwohl alle Teile ohne `--paths/--widths/--engines` liefen. Ursache: `pruefeGesamtlauf()` (aus HI-01) wertete `optionen.pfade > 0` als gezielt, der reguläre Lauf trägt dort aber die Zahl aller 158 Sitemap-Pfade. Maßgeblich ist jetzt nur das Kennzeichen `gezielt === false` (`5670097`, zwei neue Vitest-Fälle). Die Teilberichte blieben unverändert; der Merge über dieselben fünf Teile ergab danach Exit 0.

### 5.3 Lighthouse-Endmessung (D-11, D-13, D-44, ME-01)

Lighthouse 13.5.0, `next start` lokal (gzip), Port 3100, jeder Block allein unter Sperre. Kennzeichnung je Wert: **Labordaten, mobil, lokal, Median aus 3 Läufen (B3: 1 Lauf), URL.** Benchmark-Index 2978 (B1), 3471 (B2), 3396 (B3). 0 ungültige Läufe.

| Block | Aufruf | Exit | Ergebnis |
|---|---|---|---|
| B1 Gate | `--block=gate --paths=<GATE_ROUTEN> --runs=3` | **0** | Accessibility-Gate eingehalten, 11 Performance-Warnungen (nicht blockierend) |
| B2 Info | `--block=info --paths=<INFO_ROUTEN> --runs=3` | **0** | Accessibility-Gate eingehalten, 0 Warnungen |
| B3 A11y | `--block=a11y --paths=/impressum,/datenschutz,/agb,/support,/rechner,/rechner/angebotskalkulation --runs=1` | **0** | Accessibility-Gate eingehalten |
| Bestandsmodus | `performance-audit.mjs` | **0** | 21 Routen × 3 Läufe, CLS max. 0 |

**Gate-Seiten (B1)** – Score, LCP/FCP/SI in ms, TBT in ms, CLS, LCP-Element, Accessibility / Best Practices / SEO:

| URL | Score | LCP | FCP | SI | TBT | CLS | LCP-Element | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|---|
| `/` | 93 | 3.014 | 1.506 | 1.506 | 93 | 0 | `h1#startseite-titel` | 100 / 100 / 100 |
| `/funktionen` | 94 | 2.983 | 1.356 | 1.356 | 71 | 0 | `h1#funktionen-titel` | 100 / 100 / 100 |
| `/funktionen/angebote` | 90 | 3.467 | 1.808 | 1.808 | 62 | 0 | `h1#funktion-titel` | 100 / 100 / 100 |
| `/gewerke/shk` | 93 | 3.152 | 1.358 | 1.358 | 38 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/vergleich/handwerkersoftware-kleine-betriebe` | 95 | 2.830 | 1.206 | 1.206 | 35 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/blog/handwerkerrechnung-schreiben` | 94 | 2.997 | 1.355 | 1.355 | 86 | 0 | `h1#artikel-titel` | 100 / 100 / 100 |

**Info-Seiten (B2):**

| URL | Score | LCP | FCP | SI | TBT | CLS | LCP-Element | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|---|
| `/preise` | 95 | 2.833 | 1.208 | 1.208 | 60 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/app` | 94 | 2.986 | 1.356 | 1.356 | 65 | 0 | `h1#app-titel` | 100 / 100 / 100 |
| `/hilfe/rechnung-fertigstellen` | 95 | 2.826 | 1.204 | 1.204 | 68 | 0 | `p#antwort` | 100 / 100 / 100 |
| `/rechner/stundensatz` | 95 | 2.837 | 1.208 | 1.208 | 37 | 0 | `h1#rechner-titel` | 100 / 100 / 100 |

**A11y-Gate-Seiten (B3, 1 Lauf):**

| URL | Score | LCP | FCP | SI | TBT | CLS | LCP-Element | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|---|
| `/impressum` | 96 | 2.722 | 1.214 | 1.214 | 94 | 0 | `h1#rechtstext-titel` | **100** / 100 / 100 |
| `/datenschutz` | 95 | 2.748 | 1.213 | 1.213 | 122 | 0 | `p` | 100 / 100 / 100 |
| `/agb` | 95 | 2.738 | 1.207 | 1.207 | 136 | 0 | `p` | 100 / 100 / 100 |
| `/support` | 96 | 2.677 | 1.205 | 1.205 | 66 | 0 | `p.lead` | 100 / 100 / 100 |
| `/rechner` | 96 | 2.668 | 1.205 | 1.205 | 59 | 0 | `p.lead` | 100 / 100 / 100 |
| `/rechner/angebotskalkulation` | 95 | 2.835 | 1.206 | 1.206 | 37 | 0 | `h1#rechner-titel` | 100 / 100 / 100 |

**Accessibility:** 100 auf allen 16 gemessenen Seiten, darunter alle sechs Gate-Seiten und `/impressum` (10-09: 96). DESIGN-05 ist damit auch in Lighthouse belegt.

**Snippet-CLS (Bestandsmodus, ohne reduzierte Bewegung, 3 Läufe je Route):** CLS 0 / 0 / 0 auf allen acht Snippet-Seiten (`/funktionen/dashboard`, `/angebote`, `/plantafel`, `/rechnungen`, `/eingangsrechnungen`, `/zeiterfassung`, `/lager`, `/aufmass`) und auf allen 21 Routen; Playwright-LCP der Snippet-Seiten 1.164–1.412 ms.

**Performance-Warnungen (D-44, nicht blockierend; `warnungen` in `summary-gate.json`):**

| Gate-Seite | Score | LCP (ms) | Warnung | 10-09 Endstand (Score / LCP) |
|---|---|---|---|---|
| `/` | 93 | 3.014 | Score < 95, LCP ≥ 2.500 | 94 / 2.972 |
| `/funktionen` | 94 | 2.983 | Score < 95, LCP ≥ 2.500 | 94 / 2.999 |
| `/funktionen/angebote` | 90 | 3.467 | Score < 95, LCP ≥ 2.500 | 94 / 3.033 |
| `/gewerke/shk` | 93 | 3.152 | Score < 95, LCP ≥ 2.500 | 93 / 3.205 |
| `/vergleich/handwerkersoftware-kleine-betriebe` | 95 | 2.830 | LCP ≥ 2.500 | 95 / 2.823 |
| `/blog/handwerkerrechnung-schreiben` | 94 | 2.997 | Score < 95, LCP ≥ 2.500 | 95 / 2.855 |

#### Offene Abweichung (Labordaten, D-13/W3, nach D-44 nicht blockierend)

- **Befund:** Alle sechs Gate-Seiten verfehlen lokal LCP < 2.500 ms (2.830–3.467 ms), fünf davon Score ≥ 95 (90–94). Das LCP-Element ist immer Text (H1 in Clash 600 oder `p#antwort`), kein Bild. Gegenüber 10-09 liegen fünf Seiten innerhalb von ±150 ms; `/funktionen/angebote` liegt 434 ms höher (FCP 1.808 ms gegenüber rund 1.350 ms auf den übrigen Seiten; Ursache nicht weiter untersucht, weil nach D-44 nicht blockierend – Kandidat für eine Regressionsprüfung in 10-07 an den Felddaten).
- **Geprüfte unsichtbare Hebel (10-09):** Schrifthebel übernommen; `inlineCss` verworfen (schlechter); JavaScript ohne dokumentierten, funktionsneutralen Hebel. Lighthouse nennt weiterhin `render-blocking-insight` (bis 550 ms) und `legacy-javascript-insight` (Next.js-Polyfill-Chunk).
- **Felddaten (D-44, Maßstab für QA-04):** Vercel Speed Insights, Produktion, Stand 23.10.2026: n = 41, LCP p75 620 ms, INP p75 40 ms, CLS p75 0. 10-07 fragt nach dem Rollout erneut ab und bewertet QA-04 daran; in 10-12 wurden keine Vercel-Abrufe gemacht.
- **Inhaberfrage (nur falls die Laborwerte selbst Ziel werden sollen, jeweils sichtbare Änderung, UI-SPEC § 7.2):** (a) `font-display: optional` für die verbliebenen Schnitte, (b) General 600 nicht mehr laden, (c) Systemschrift statt Clash 600 für die H1 im ersten Bildschirm, (d) Funktionen oder Skripte entfernen bzw. verzögern. Nichts davon ist umgesetzt.
