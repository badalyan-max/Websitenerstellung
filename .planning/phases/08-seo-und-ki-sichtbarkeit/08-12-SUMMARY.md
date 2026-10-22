---
phase: 08-seo-und-ki-sichtbarkeit
plan: 12
subsystem: kernseiten-v2
tags: [fakten, craft-ai, gobd, entitaet, organization-schema, d-12, d-25, faq-schema]
requires:
  - phase: 08-01
    provides: seo-audit.mjs (Regeln inkl. faq-schema, antwort, prompts), metaFor/zielwerte, Anker-Konvention § 17.1
  - phase: 08-02
    provides: crumbsFor, Breadcrumbs im FunktionsKopf (BreadcrumbList aus einer Quelle)
  - phase: 08-03
    provides: FunktionsKopf G1 ohne Visual, SectionHeader G2, FaqList answerMax, FitPanels G4, FactList G5
provides:
  - craftos/lib/seiten/fakten.ts, craft-ai.ts, gobd.ts (budgetgeprüfte Inhaltsmodule, Werte aus site/Register)
  - /fakten-ueber-craftos, /craft-ai, /gobd auf v2-Bausteinen mit Schema-Trio BreadcrumbList/FAQPage/WebPage
  - organizationSchema mit Abgrenzung CraftOS-PC/ComputerCraft und sameAs (App Store, Google Play)
  - webPageSchema mit optionalem about (Standard #software)
  - tests/kernseiten.test.ts (Inhalte, Wortregeln, gerenderte Seiten)
  - DESIGN-V2.md § 17.12
affects: [08-13, 08-14, phase-09, phase-10]
tech-stack:
  added: []
  patterns:
    - "Seiteninhalte in lib/seiten/<seite>.ts mit *_SECTION_IDS/*_SURFACES, Seite nur Komposition (wie lib/app-content.ts)"
    - "Abschnitt-Wrapper section data-abschnitt={id} aria-labelledby={id}, H2-id = Abschnitts-id (§ 17.1)"
    - "FAQPage-JSON-LD immer aus demselben Array wie FaqList"
    - "Sammeltest in design-v2-budgets mit dynamischen Imports (stabile Importliste für parallele Pläne)"
key-files:
  created:
    - craftos/lib/seiten/fakten.ts
    - craftos/lib/seiten/craft-ai.ts
    - craftos/lib/seiten/gobd.ts
    - craftos/tests/kernseiten.test.ts
  modified:
    - craftos/app/fakten-ueber-craftos/page.tsx
    - craftos/app/craft-ai/page.tsx
    - craftos/app/gobd/page.tsx
    - craftos/lib/schema.ts
    - craftos/app/sitemap.ts
    - craftos/tests/seo-brand.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "08-12: Inhabervorgabe 22.10.2026 umgesetzt – Faktenseite nennt nur Unterstütztes; FactList-Eintrag „Nicht zugesagt“ (UI-SPEC § 5.2) ersetzt durch „GAEB und DATANORM“ mit „DATANORM 4 und 5“ (Beleg lib/funktionen.ts); Einschränkungen unterstützter Funktionen (Offline teilweise, kein autonomes Verbuchen, keine GoBD-Zertifizierung) bleiben als Überclaim-Schutz"
  - "08-12: /craft-ai Grenzen als wide + 2 × md statt 3 × sm (BentoGrid verlangt ≥ 2 Größen; sm-Kacheln trennten „autono-mes“); /gobd Kacheln md, sm, sm, md, md, wide (kein „E-Rech-nungsbezug“)"
  - "08-12: CtaBand nutzt CTA_DETAIL (Standardtext der Detailseiten) statt eines dritten Literals"
  - "08-12: Fakten-Stand-Zeile als eigene Label-Zeile mit mailto-Link, weil FactList.note nur Text trägt"
requirements-completed: []
duration: 105min
completed: 2026-10-22
---

# Phase 8 Plan 12: Fakten, Craft AI und GoBD auf v2 Summary

**Die drei Kernseiten /fakten-ueber-craftos, /craft-ai und /gobd sind aus v2-Bausteinen aufgebaut, beantworten jede Frage-Überschrift in ≤ 300 Zeichen, /gobd gibt die FAQPage nur noch aus sichtbaren Fragen aus, und die Organization grenzt CraftOS sachlich von CraftOS-PC/ComputerCraft ab (sameAs nur App Store und Google Play).**

## Performance

- **Duration:** ca. 105 min (inklusive Wartezeiten auf die zentrale Sperre)
- **Started:** 2026-10-22T16:55Z
- **Completed:** 2026-10-22T18:40Z
- **Tasks:** 2 (je RED- und GREEN-Commit) plus Merge von main und Inhaber-Korrektur
- **Files modified:** 13 (4 neu, 9 geändert)

## Accomplishments

- **Fakten (§ 5.2, D-25):** Kopf G1 („Fakten über CraftOS“, Kopfwort „CraftOS“), Abschnitt `#was-ist-craftos` mit Antwort (214 Zeichen, Wortlaut UI-SPEC), KeyFacts 3 / `mobileLocales.length` / `site.trialDays` Tage / `euro(voll.monat)` mit `site:`/`register:`-Quellen, Abgrenzungssatz `<p data-abgrenzung>` mit Icon `Info` ohne Links; FactList mit 12 Einträgen (≤ 200 Zeichen, ≤ 2 Sätze, Preise per Vorlage) und Stand-Zeile „Stand 20.10.2026. Fehler gefunden? Korrektur melden“ (`mailto:`); sechs Gruppenkacheln aus `getFunktionsgruppen()` mit `/funktionen#{gruppe}`; FAQ 4 (Offline „Teilweise.“). WebPage `about` → `https://craftos.eu/#organization`.
- **Craft AI (§ 5.3):** Ablauf in drei Schritten, darunter `FeatureSnippet variant="ki"` in `figure` mit Kennzeichnung (wie FunktionsDetail); Kosten aus `startCredits`, `creditWertEuro`, kleinstem `creditPakete`-Preis („ab 10 €“); Grenzen-Kacheln ohne Autonomie-Zusage; FAQ 3.
- **GoBD (§ 5.4):** sechs Bestandspunkte mit unveränderten Titeln und Zielen, Text je ein Satz; Ablauf 5 Schritte mit `FeatureSnippet variant="rechnung"`; „Ist CraftOS GoBD-zertifiziert?“ → „Nein. …“ plus FitPanels (`quellenPflicht={false}`); FAQ 3 und Grundlage-Zeile mit AO-Handbuch- und BMF-Link; **FAQPage aus demselben Array** (behebt den Baseline-Befund `faq-schema` aus 08-01).
- **Schema:** `organizationSchema` mit „…; nicht verbunden mit CraftOS-PC oder ComputerCraft.“ und `sameAs: [site.iosUrl, site.androidUrl]`; `webPageSchema` mit optionalem `about`.
- `PageHero`, `TrialCta`, `components/ui/Faq` auf den drei Seiten entfernt; Sitemap `pageUpdated` für `/craft-ai`, `/fakten-ueber-craftos`, `/gobd` auf 22.10.2026.

## Kaskade (Projekt-CLAUDE.md)

- **frontend-design:** Leitlinie read-only gelesen (Struktur trägt Information, keine Einzelwort-Hervorhebung, keine Versal-Labels).
- **ui-ux-pro-max** `"product facts entity page ai assistant compliance" --domain ux`: Image Optimization (High) nicht betroffen (Köpfe ohne Bild), Active State (Medium) durch Brotkrumen erfüllt.
- **21st.dev / Context7:** in dieser Sitzung nicht verfügbar; nichts abgerufen oder behauptet. Nachweis in `craftos/docs/DESIGN-V2.md` § 17.12.

## Prüfergebnisse (finaler Lauf nach Merge von main, Stand 3864d62 + 4bdefde)

- **Gezielt:** `kernseiten` 43, `seo-brand`, `design-v2-budgets`, `pricing-parity`, `announcements`, `product-register` – alle grün außer dem bekannten „Snapshot ist aktuell“ (siehe Issues).
- **Vitest gesamt (`npx vitest run`, unter der Sperre):** 36 Dateien, **717 bestanden, 2 fehlgeschlagen**: `pricing-parity` „Snapshot ist aktuell“ (vorbestehend, Web-Repo `origin/release` steht auf `a9319e5db925`, Snapshot auf `1e9c8bc288dc`) und `content.test.ts` „has valid categories …“ mit 5-s-Timeout unter Volllast – einzeln wiederholt **10/10 grün** (37 s).
- **`npm run typecheck`, `npm run lint`:** grün.
- **`npm run build`:** grün.
- **`seo-audit --paths=/fakten-ueber-craftos,/craft-ai,/gobd`:** 3 von 131 URLs, **alle 12 Regeln 0 Verstöße** (inkl. `og` dank der nach dem Merge vorhandenen Segmentbilder aus 08-05 und `prompts` für `/fakten-ueber-craftos#was-ist-craftos`), Exit 0.
- **`seo-audit --only=faq-schema` sitewide:** 131 URLs, 0 Verstöße, Exit 0.
- **`seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og,faq-schema` sitewide:** **0 Verstöße**, Exit 0 (vor dem Merge von main: title 2, description 4, map 19, og 130 – alle auf fremden Seiten bzw. fehlende OG-Bilder aus 08-05; nach dem Merge erledigt).
- **`npm run test:e2e`** gegen Port 3102 (`CRAFTOS_BASE_URL`): **293 bestanden, 0 fehlgeschlagen, 75 übersprungen** (inkl. `function-illustrations` `['ki', '/craft-ai']` und `home-navigation` Mega-Menü-Links). Ein zwischenzeitlicher Teillauf (nur `function-illustrations` + `home-navigation`) zeigte die bekannten WebKit-Zeitflakes (`function-illustrations.pw.cjs:443` rechnung/beleg webkit-1440, `home-navigation.pw.cjs:501` webkit-390-touch) auf Seiten außerhalb dieses Plans; der finale Volllauf war fehlerfrei.
- **`route-audit`** (Port 3102): 131 Routen, `failures: []`, `badLinks: []`. **`live-check`** lokal: alle Prüfungen OK.
- **Sichtprüfung `visual-audit.mjs`** für die drei Seiten, 5 Breiten × 2 Engines = 30 Läufe: Status 200, kein Überlauf, 0 JS-Fehler, **axe 0 Befunde**. Gesehen und behoben: Silbentrennung in sm-Kacheln („Kein autono-mes Verbuchen“, „E-Rech-nungsbezug“) → Kachelgrößen angepasst, danach erneut geprüft.
- **Screenshots:** `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-12/` (Chromium 360/1440, WebKit 390 je Seite); keine PNG im Git-Status.
- Server jeweils mit eigener PID auf Port 3102 gestartet und beendet; Port 3102 danach frei, Sperre freigegeben.

## Task Commits

1. **Task 1: Inhaltsmodule und organizationSchema** – `8812662` (test, RED), `b7f6e3b` (feat, GREEN)
2. **Task 2: Drei Seiten aus v2-Bausteinen** – `0045eca` (test, RED), `952f5dd` (feat, GREEN)
3. **Merge main** (Koordinator-Vorgabe, DATANORM-Hotfix 2b6cc2f, 08-04/05/06) – `3864d62`
4. **Inhabervorgabe „nur Unterstütztes nennen“** – `ef744a2` (test, RED), `4bdefde` (fix, GREEN)

## Geänderte geteilte Dateien (minimal gehalten)

- `craftos/lib/schema.ts`: `organizationSchema` (2 Felder) und `webPageSchema` (optionales `about`).
- `craftos/app/sitemap.ts`: `pageUpdated` für drei Pfade (2 Werte geändert, `/gobd` ergänzt).
- `craftos/tests/design-v2-budgets.test.ts`: neuer `describe` am Dateiende, dynamische Imports (keine Änderung der Importliste).
- `craftos/tests/pricing-parity.test.ts`: drei Einträge in der Literal-Dateiliste.
- `craftos/tests/seo-brand.test.ts`: Abgrenzung und `sameAs`.
- `craftos/docs/DESIGN-V2.md`: neuer Abschnitt § 17.12 am Ende.
- Merge-Konflikte (nur die drei Seiten, 08-04 hatte dort `metaFor` gesetzt) zugunsten der v2-Fassung gelöst; `metaFor` bleibt, das OG-Segmentbild aus 08-05 greift über `metaFor`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Test] Wortregel traf die Abschnitts-id „zertifizierung“**
- **Found during:** Task 1 GREEN
- **Fix:** Die Wortregeln prüfen nur Fließtexte (Zeichenketten mit Leerzeichen).
- **Commit:** `b7f6e3b`

**2. [Rule 1 - Budget] GoBD-Kachel „Eingangsbelege prüfen und sperren“ 95 > 90 Zeichen**
- **Fix:** Satz gekürzt („Nach bestätigter Prüfung sperrt CraftOS die Belegangaben und protokolliert Änderungen.“).
- **Commit:** `b7f6e3b`

**3. [Rule 1 - Sichtprüfung] Silbentrennung in schmalen Kacheln**
- **Issue:** Globale `hyphens: auto` der h3 trennte „Kein autono-mes Verbuchen“ und „E-Rech-nungsbezug“ in sm-Kacheln (1440 px).
- **Fix:** `/craft-ai` Grenzen wide + 2 × md (UI-SPEC nannte 3 × sm, BentoGrid verlangt ohnehin ≥ 2 Größen), `/gobd` md, sm, sm, md, md, wide; Reihenfolge in allen Breiten unverändert.
- **Commit:** `952f5dd`

**4. [Inhabervorgabe 22.10.2026] Keine Negativlisten**
- **Issue:** UI-SPEC § 5.2 sah den FactList-Eintrag „Nicht zugesagt“ (Portal-Onlinezahlung, DATANORM-v5, ELSTER, autonome Buchhaltung) vor; der Inhaber hat am 22.10. festgelegt, dass die Website nur Unterstütztes nennt und DATANORM nur positiv als „DATANORM 4 und 5“ erscheint.
- **Fix:** Eintrag ersetzt durch „GAEB und DATANORM“ („Leistungsverzeichnisse als GAEB X83 importieren und Angebote als X84 abgeben. Großhändlerkataloge lesen Sie in DATANORM 4 und 5 ein.“, Beleg `lib/funktionen.ts`); Test verlangt „DATANORM 4 und 5“ bei jeder Nennung und verbietet „nicht zugesagt“/„DATANORM-v5“. Die Plan-Behavior „Eintrag ‚Nicht zugesagt‘ nennt die notLive-Punkte“ ist damit bewusst aufgehoben.
- **Commits:** `ef744a2`, `4bdefde`
- **Hinweis für den Orchestrator:** `/craft-ai` „Was übernimmt Craft AI nicht?“ und `/gobd` „Ist CraftOS GoBD-zertifiziert? – Nein.“ bleiben (UI-SPEC-Pflicht und Überclaim-Schutz T-08-32; sie begrenzen unterstützte Funktionen und listen keine fehlenden Funktionen). Falls der Inhaber auch diese Formulierungen streichen will, betrifft das nur `lib/seiten/craft-ai.ts` bzw. `gobd.ts`.

**5. [Rule 3 - Lint] Erzeugter Playwright-HTML-Bericht**
- Nach einem E2E-Lauf mit Fehlschlag lag ein Trace-Viewer unter `tests/e2e/reports/html/trace/` (gitignoriert), den `eslint .` mitprüfte (259 Fehler in Fremdcode). Den erzeugten, ignorierten Bericht entfernt; kein Repo-Inhalt betroffen. Vorschlag: `tests/e2e/reports/**` in die ESLint-Ignores (eigener Plan).

### Ausgelassen / vorgezogen

- **Abhängigkeit 08-11:** Plan formal nach 08-11; fachlich nur 08-01 bis 08-03 benötigt (Orchestrator-Entscheidung). Muster `app/preise/page.tsx`/`lib/seiten/preise.ts` (08-07) lagen noch nicht vor; Aufbau stattdessen nach `app/app/page.tsx`/`lib/app-content.ts`.
- **OG-Bilder:** nicht in diesem Plan angelegt; nach dem Merge von main liefert 08-05 die Segmentbilder `app/{fakten-ueber-craftos,craft-ai,gobd}/opengraph-image.tsx`, Regel `og` ist für die drei Pfade grün.
- STATE.md/ROADMAP.md nicht geändert (Worktree-Regel); `requirements.mark-complete` nicht aufgerufen.

## Issues Encountered

- `pricing-parity` „Snapshot ist aktuell“ rot (vorbestehend, nicht Teil dieses Plans): Web-Repo `origin/release` = `a9319e5db925`, Snapshot = `1e9c8bc288dc`. Produktsync nötig (wie deferred-items 08-03).
- `content.test.ts` 5-s-Timeout nur im Volllauf parallel zu anderer Last; einzeln grün.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-08-31 (sameAs nur Store-Profile, keine Links auf CraftOS-PC/ComputerCraft) und T-08-33 (FAQPage aus dem sichtbaren Array, `faq-schema` sitewide 0) sind getestet; T-08-32 über Wortregeln in `tests/kernseiten.test.ts`. JSON-LD nur über `components/seo/JsonLd`; externe Links nur die zwei amtlichen Bestandsquellen auf `/gobd`.

## Next Phase Readiness

Alle fünf kommerziellen Umbauseiten (mit 08-07/08-10) folgen demselben Muster; nach dem Merge in main bitte `seo-audit` sitewide und den E2E-Lauf erneut prüfen (Konflikte erwartet höchstens in `design-v2-budgets.test.ts`/`DESIGN-V2.md` am Dateiende und in `sitemap.ts` `pageUpdated`).

## Self-Check: PASSED

- Dateien vorhanden: `lib/seiten/fakten.ts`, `lib/seiten/craft-ai.ts`, `lib/seiten/gobd.ts`, `tests/kernseiten.test.ts`, `08-12-SUMMARY.md`.
- Commits vorhanden: `8812662`, `b7f6e3b`, `0045eca`, `952f5dd`, `3864d62`, `ef744a2`, `4bdefde`.
