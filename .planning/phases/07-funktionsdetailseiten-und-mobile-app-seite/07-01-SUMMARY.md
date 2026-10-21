---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 01
subsystem: designsystem-v2
tags: [designsystem-v2, budgets, ministatus, keyfacts, schema]
requires:
  - phase: 05/06
    provides: v2-Bausteine (budgets.ts, MiniUi, KeyFacts, FeatureList), lib/schema.ts, Produktregister mit productBasis
provides:
  - TEXT_BUDGET.pageHead { lead 140, kopfLead 110, h1 60, eyebrow 24 } und count.detailSteps (3–5) / count.related (2–3) (F4)
  - MiniStatusName mit 22 Namen (16 neu), MINI_STATUS_BELEGE und MINI_STATUS_TON, data-tone in MiniStatus, drei Tonregeln im CSS (F3)
  - KeyFacts-Kurzform-Prüfung ^(site|register):[A-Za-z0-9.-]+$ und Kurzform-Quellen auf / und /styleguide (D-13)
  - Zielart "seite" in ZusatzZiel und FeatureListItem.target (F5, D-21)
  - webPageSchema und mobileApplicationSchema in lib/schema.ts (D-11), Tests in tests/schema.test.ts
affects: [07-02, 07-03, 07-04, 07-05, 07-06, 07-07]
tech-stack:
  added: []
  patterns:
    - "Statusnamen der Mini-UI nur mit Release-Beleg; Vitest prüft jeden neuen Namen per git show am gepinnten productBasis-Commit"
    - "Statusfarben über data-tone (neutral/positiv/hervorgehoben) statt Einzelselektor je Statusname"
    - "KeyFacts-Quellen sind öffentliche Kurzform-Schlüssel; Ableitung wird in den Inhaltstests je Schlüssel geprüft"
key-files:
  created:
    - craftos/tests/schema.test.ts
  modified:
    - craftos/components/v2/budgets.ts
    - craftos/components/v2/mini/MiniUi.tsx
    - craftos/components/v2/mini/MiniUi.module.css
    - craftos/components/v2/KeyFacts.tsx
    - craftos/components/v2/FeatureList.tsx
    - craftos/lib/funktionsgruppen.ts
    - craftos/lib/home-content.ts
    - craftos/lib/styleguide-content.ts
    - craftos/lib/schema.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/design-v2-components.test.ts
    - craftos/tests/home.test.ts
    - craftos/tests/styleguide.test.ts
key-decisions:
  - "Release-Belegtest für MiniStatus prüft am gepinnten productBasis-Commit (web 535206b, mobile 5610a06) statt am beweglichen origin/release; vorab bestätigt, dass alle 16 Namen an beiden Ständen vorkommen"
  - "MINI_STATUS_BELEGE führt je Name genau einen Beleg; die Projektstatus (Geplant, In Arbeit, Abgeschlossen) zeigen auf web:src/pages/Dashboard.tsx, die Mobile-Fundstelle projects.json prüft ein eigener Test"
  - "webPageSchema ohne isPartOf, weil app/layout.tsx keinen WebSite-Knoten ausgibt; ein Test koppelt das an das Layout"
  - "Objektschlüssel \"Geplant\" in MiniUi.tsx gequotet, damit der Ankündigungs-Wächter (Muster Geplant:) streng bleibt"
requirements-completed: []
duration: 25min
completed: 2026-10-21
---

# Phase 7 Plan 01: Bausteinergänzungen F3–F5, D-13 und Schema-Helfer Summary

**Die v2-Bausteine kennen jetzt die Phase-7-Budgets, 16 am Release belegte Statusnamen mit drei Tönen, KeyFacts-Quellen nur in der Kurzform site:/register:, die Zielart „seite“ und die JSON-LD-Helfer webPageSchema und mobileApplicationSchema (App-Lizenz netto, ohne Bewertungen).**

## Performance

- **Dauer:** ca. 25 min
- **Tasks:** 2/2 (je RED → GREEN)
- **Geänderte Dateien:** 14 (1 neu)

## Ergebnisse

### Task 1: Budgets F4 und Statusnamen F3
- `TEXT_BUDGET.pageHead = { lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 }`; `FunktionenHead` nutzt weiter `pageHead.lead` (140) unverändert. `count.detailSteps { 3, 5 }`, `count.related { 2, 3 }`.
- `MiniStatusName` um 16 Namen erweitert (Kommentar je Gruppe mit Beleg). `MINI_STATUS_BELEGE` (Form `web:<pfad>`/`mobile:<pfad>`) und `MINI_STATUS_TON` exportiert. `MiniStatus` rendert zusätzlich `data-tone`.
- Locale-Pfade per `git ls-tree` ermittelt: `src/shared/i18n/locales/de/{projects,defects,construction,vacation,acceptance}.json`.
- CSS: die zwei Einzelselektoren `[data-status="Bezahlt"]`/`[data-status="Überfällig"]` durch drei Tonregeln ersetzt.
  - Vorher gerendert: Standard `#ededf0`/`#393941` (Entwurf, Offen, Gesendet, Storniert), Bezahlt `#ffefcc`/`#784b10`, Überfällig `#17171c`/`#fff`.
  - Nachher: neutral `#ededf0`/`#393941`, positiv `#ffefcc`/`#784b10`, hervorgehoben `#17171c`/`#fff`. Die sechs Bestandsnamen behalten exakt ihre Farben (neutral ×4, Bezahlt positiv, Überfällig hervorgehoben).
  - Alle Hexwerte in `MiniUi.module.css`: #101014 #17171c #393941 #62626e #777782 #784b10 #bcbcc6 #ededf0 #f2af38 #f4f4f5 #f7f3eb #ffefcc #fff #fff4d9 – kein Rot, kein Grün.
- „Abgenommen mit Mängeln“ (22 Zeichen) liegt im Mini-Zeilenbudget (24); ein Test prüft alle 22 Namen.

### Task 2: KeyFacts-Kurzform, Zielart „seite“, Schema-Helfer
- `KeyFacts` prüft nach der Leerprüfung `KEY_FACT_SOURCE = /^(site|register):[A-Za-z0-9.-]+$/` mit dem Fehlertext aus dem Plan. JSDoc-Beispiel `site:tarif-app-monat`.
- Quellen auf `/` und `/styleguide`: `site:trialDays`, `site:tarif-voll-monat`, `site:tarif-app-monat`, `register:mobileLocales` (Werte unverändert abgeleitet). Neue Tests: gerendertes HTML von `/` und `/styleguide` enthält nur Kurzformen, kein `data-source="tarife…` oder `data-source="product-register…`.
- `ZusatzZiel.kind` und `FeatureListItem.target.kind` um `"seite"` erweitert; `hinweis()` gibt „Beschrieben unter {label}“ wie bei „funktion“ aus.
- `webPageSchema({ path, name, description })`: WebPage, `@id` `{url}#webpage`, `inLanguage` de-DE, `about` `#software`, `publisher` `#organization`, kein `isPartOf` (kein WebSite-Knoten im Layout).
- `mobileApplicationSchema()`: MobileApplication, `@id` `{site.url}/app#mobile-app`, „CraftOS Mobile-App“, `operatingSystem` „iOS, Android“, `sameAs`/`installUrl` = Store-URLs, Angebot App-Lizenz 9.95 EUR netto mit `UnitPriceSpecification` (1 MON, „pro Person und Monat“); wirft mit Modulnamen, wenn der Tarif `app` fehlt. Keine Bewertungsfelder.

## Prüfungen (lokal)

| Prüfung | Ergebnis |
|---|---|
| Task 1 Vitest (budgets, components, frames, styleguide) | 78/78 grün, Release-Belegblock lief (0 übersprungen) |
| Task 2 Vitest (schema, components, home, styleguide, funktionsgruppen, funktionen-seite, pricing-parity) | 102/102 grün |
| `npm test` (voll) | 26 Dateien, 346/346 grün |
| `npm run typecheck` | grün |
| `npm run lint` | grün (Exit 0) |
| Akzeptanz-Greps | kopfLead: 110 = 1; MINI_STATUS_BELEGE ≥ 1; data-tone="positiv" = 1; "seite" in funktionsgruppen.ts 2, FeatureList.tsx 3; Schema-Exporte = 2; aggregateRating = 0; alte Quellnamen in home/styleguide-content = 0 |

## Task Commits

1. `5c4c04d` test(07-01): add failing tests for pageHead budgets and MiniStatus names
2. `1eceb4c` feat(07-01): add pageHead budgets and evidenced MiniStatus names with tones
3. `28c000f` test(07-01): add failing tests for KeyFacts short sources, seite target and schema helpers
4. `47867fc` fix(07-01): quote Geplant status keys so the announcement guard does not flag them
5. `8e91783` feat(07-01): KeyFacts short sources, seite target and WebPage/MobileApplication schema

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Ankündigungs-Wächter schlug auf den Statusschlüssel „Geplant:“ an**
- **Found during:** Task 2 (volle Suite)
- **Issue:** `tests/announcements.test.ts` verbietet das Muster `Geplant:` in app/components/lib (Schutz vor Ankündigungen nicht-live Funktionen). Die unquotierten Objektschlüssel `Geplant:` in `MINI_STATUS_BELEGE` und `MINI_STATUS_TON` lösten ihn aus.
- **Fix:** Schlüssel als `"Geplant"` gequotet und kommentiert; der Wächter bleibt unverändert streng.
- **Files modified:** craftos/components/v2/mini/MiniUi.tsx
- **Commit:** 47867fc

**2. [Rule 1 - Testanpassung] Phase-6-Bestandstest erwartete `pageHead` exakt als `{ lead: 140 }`**
- **Found during:** Task 1 GREEN
- **Fix:** Bestandstest prüft jetzt `pageHead.lead === 140`; die vollständige Gleichheit `{ lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 }` prüft der neue Phase-7-Test. Keine Abschwächung.
- **Commit:** 1eceb4c

### Präzisierungen

- Release-Belegtest gegen den gepinnten `productBasis`-Commit statt `origin/release` (Muster `product-register.test.ts`, stabil gegen spätere Release-Bewegungen). Vorab manuell geprüft: alle 16 Namen kommen an beiden Ständen vor.
- RED-Hinweis Task 2: Der FeatureList-Fall „seite“ war zur Laufzeit schon grün (hinweis() behandelt alles außer „hilfe“ gleich); rot war er über den Typcheck (`kind: "seite"` nicht im Typ). Nach GREEN sind Laufzeit und Typ abgedeckt.
- Live-Check-Erweiterung „data-source="(tarife|product-register)“ (07-RESEARCH D-13) liegt nicht in den Dateien dieses Plans; sie gehört zum Rollout-Plan. Vermerk in DESIGN-V2.md § 16 folgt laut Plan in 07-04.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche über das Threat-Register hinaus (T-07-01 und T-07-02 umgesetzt, T-07-03: Werte nur aus site.ts/tarife, kein Bewertungsfeld).

## Self-Check: PASSED

- craftos/tests/schema.test.ts vorhanden; alle geänderten Dateien committet.
- Commits 5c4c04d, 1eceb4c, 28c000f, 47867fc, 8e91783 im Log vorhanden.
