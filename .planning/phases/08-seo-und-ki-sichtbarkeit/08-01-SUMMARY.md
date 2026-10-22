---
phase: 08-seo-und-ki-sichtbarkeit
plan: 01
subsystem: seo-pruefinfrastruktur
tags: [seo-audit, schutztests, d-23, metafor, ai-prompts, anker-konvention]
requires:
  - phase: 07-09
    provides: Phase-7-Stand live, live-check.mjs mit 46 Prüfungen, Keyword-Map mit Zielwerten
provides:
  - craftos/scripts/seo-audit.mjs (Post-Build-Audit, --only/--paths/--report, test-results/seo-audit.json mit Ist-Werten)
  - craftos/scripts/lib/seo-audit-core.mjs (reine Prüffunktionen, von live-check und route-audit mitgenutzt)
  - craftos/lib/seo-meta.ts (zielwerte, metaFor)
  - craftos/docs/seo/ai-prompts-targets.json (20 Tracker-Einträge → Ziel#Anker, Phase; luecken Phase 9)
  - DESIGN-V2.md § 17 Anker-Konvention
  - Keyword-Map-Eintrag /vergleich/handwerkersoftware-kleine-betriebe (geplant, Phase 8)
affects: [08-02, 08-03, 08-04, 08-05, 08-06, 08-07, 08-08, 08-09, 08-10, 08-11, 08-12, 08-13, 08-14, phase-09, phase-10]
tech-stack:
  added: []
  patterns:
    - "Post-Build-Audit über .next/server/app (Sitemap-Body, prerender-manifest, OG-.body-Dateien) statt Server-Lauf"
    - "Eine Implementierung der HTML-Helfer (headTags, jsonLd, findType, plain) für Audit, live-check und route-audit"
    - "Schutztest-Ausnahmen nur pfadgebunden (lib/wettbewerber/, /vergleich) mit Gegenprüfung (tageAusserhalbFeld, ctaTestphaseFehler)"
    - "Prompt-Mapping wird aus den Rohdaten erzeugt (IDs nie abgetippt)"
key-files:
  created:
    - craftos/scripts/lib/seo-audit-core.mjs
    - craftos/scripts/seo-audit.mjs
    - craftos/tests/seo-audit-core.test.ts
    - craftos/lib/seo-meta.ts
    - craftos/tests/seo-meta.test.ts
    - craftos/docs/seo/ai-prompts-targets.json
    - craftos/tests/ai-prompts.test.ts
  modified:
    - craftos/scripts/live-check.mjs
    - craftos/scripts/route-audit.mjs
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/components/v2/KeyFacts.tsx
    - craftos/tests/design-v2-components.test.ts
    - craftos/lib/funktionsdetails/index.ts
    - craftos/lib/funktionsdetails/types.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/keyword-seeds.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "08-01: Audit-Regel keyword verlangt das vollständige normalisierte Hauptkeyword im gerenderten Titel (wie keyword-map.test für target.title)"
  - "08-01: aria-hidden-Elemente zählen nicht zum Fragetext (FAQ-Symbol „+“ in summary); sonst falsche faq-schema-Treffer auf /preise und Gewerken"
  - "08-01: Prompt-Ziele bis Phase 8 werden voll geprüft (Anker + Antwort ≤ 300), Phase 9 nur Existenz; Bestandsziele nutzen faq-titel (/, /app, fünf Funktionsseiten)"
  - "08-01: OG-Regel verlangt og:image = <pfad>/opengraph-image im prerender-manifest und .body ≤ 300 KB (Pfad aus dem og:image-Tag, daher robust gegen Hash-Suffixe)"
requirements-completed: []
duration: 58min
completed: 2026-10-22
---

# Phase 8 Plan 01: Prüf- und Dateninfrastruktur Summary

**Post-Build-SEO-Audit über das echte Build-HTML (12 Regeln, Baseline 711 Verstöße), eng gefasste D-23-Ausnahmen mit Gegenprüfung, KeyFacts-Kurzform `wettbewerber:`, `metaFor()` aus der Keyword-Map, Prompt-Mapping aller 20 AI-Tracker-Einträge und Anker-Konvention in DESIGN-V2 § 17.**

## Performance

- **Duration:** ca. 58 min
- **Started:** 2026-10-22T13:48Z (Lesen der Pläne), erster Commit 14:27Z
- **Completed:** 2026-10-22T14:46Z
- **Tasks:** 3 (je RED- und GREEN-Commit)
- **Files modified:** 19 (7 neu, 12 geändert)

## Accomplishments

- `scripts/seo-audit.mjs` misst jede Phase-8-Regel am Build: `title`, `description`, `h1`, `duplikate` (sitewide, mit `--paths` nur beteiligte Gruppen), `keyword`, `map`, `breadcrumbs`, `og`, `faq-schema`, `schema`, `antwort`, `prompts`; Ergebnis mit Ist-Werten je Pfad in `test-results/seo-audit.json`.
- `live-check.mjs` und `tests/keyword-map.test.ts` nutzen die gemeinsamen Helfer (`headTags`, `jsonLd`, `findType`, `plain`, `norm`); `route-audit.mjs` nutzt `istAlteTestphase` und `ctaTestphaseFehler`.
- D-23: Testphasen-Scan nimmt nur `lib/wettbewerber/` aus (negative Fixtures für `app/preise/page.tsx`, `lib/seiten/preise.ts`, `lib/wettbewerber-alt.ts`, `app/vergleich/page.tsx`, `components/x.tsx` schlagen an); `tageAusserhalbFeld` erlaubt dort Tageszahlen nur im Feld `testphaseTage` oder in `zitat`; route-audit erlaubt „14 Tage“ nur unter `/vergleich`, verlangt dort aber, dass jeder CraftOS-CTA (`data-track="trial"`) genau `trialDays` aus dem Snapshot nennt. Ankündigungsmuster und ComparisonTable-Zellbudget unverändert.
- `lib/seo-meta.ts`: `zielwerte()`, Typ `Zielwerte`, `MARKE` aus `lib/funktionsdetails` verschoben, `metaFor(path, { imagePath })`; Re-Export in `lib/funktionsdetails` (alle Aufrufer unverändert).
- `docs/seo/ai-prompts-targets.json` aus den Rohdaten erzeugt (16 ChatGPT, 2 Perplexity, 2 Google AI Overview), 9 `luecken` (Phase 9); Map-/Seeds-Eintrag für kleine Betriebe; DESIGN-V2 § 17.

## Baseline (Build 22.10.2026, Phase-7-Stand, 131 Sitemap-URLs)

`node scripts/seo-audit.mjs --report` – Verstöße je Regel (betroffene Seiten in Klammern):

| Regel | Verstöße | Seiten | Bemerkung |
|---|---:|---:|---|
| title | 41 | 41 | deckt sich mit Research (41) |
| description | 65 | 65 | Research 64 < 120 + 1 > 155 |
| h1 | 0 | 0 | genau eine H1 überall |
| keyword | 75 | 75 | Hauptkeyword fehlt im Titel (Research 75) |
| map | 248 | 88 | Title/H1/Description ≠ Zielwert (Research 88 Seiten) |
| breadcrumbs | 140 | 130 | keine sichtbare Brotkrumen-nav; 10 Seiten zusätzlich ohne BreadcrumbList |
| og | 130 | 130 | kein eigenes, statisch erzeugtes OG-Bild (Blog/Hilfe-Bilder fehlen im prerender-manifest) |
| faq-schema | 1 | 1 | `/gobd`: FAQPage-Frage nicht sichtbar |
| schema | 0 | 0 | kein Product/Review/AggregateRating unter /vergleich |
| antwort | 1 | 1 | `/preise` „Welche Funktionen kosten zusätzlich?“ 402 Zeichen |
| duplikate | 2 | 2 | H1 „Rechnungen“ auf `/blog/kategorie/rechnungen` und `/hilfe/kategorie/rechnungen` |
| prompts | 8 | 7 | erwartet: vier Alternativen-Seiten und kleine Betriebe fehlen im Build; `/vergleich#antwort`, `/preise#app-lizenz`, `/preise#was-kostet-handwerkersoftware`, `/fakten-ueber-craftos#was-ist-craftos` ohne Anker. Alle Bestandsziele (`/#faq-titel`, `/app#faq-titel`, fünf Funktionsseiten `#faq-titel`, zwei Gewerke) bestehen. |
| **Summe** | **711** | | `--only=breadcrumbs` endet mit Exitcode 1 (Regel greift) |

## Prüfergebnisse

- Vitest gesamt (`npm test`): 32 Dateien, 547 Tests grün; gezielt `seo-audit-core` 50, `ai-prompts` + `keyword-map` + `keyword-seeds` 73, Task-2-Satz (8 Dateien) 213.
- `npm run typecheck`, `npm run lint`: grün (nach jedem Task).
- `npm run build`: grün (Koordinationsstatus vorher gelesen; kein Website-Rezept → lokal, einzeln).
- `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs`: 46 OK, Exit 0 (nach Umstellung auf die gemeinsamen Helfer).
- `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`: 131 Routen, 0 Fehler, 0 defekte Links, OG 200/200/200 (nach D-23-Umbau).
- Server jeweils mit eigener PID gestartet und beendet; Port 3100 am Ende frei.

## Task Commits

1. **Task 1: Post-Build-SEO-Audit** – `7f21c9d` (test, RED), `1f9cce3` (feat, GREEN)
2. **Task 2: D-23-Schutztests, KeyFacts wettbewerber:, metaFor** – `52600ea` (test, RED), `cc1f481` (feat, GREEN)
3. **Task 3: Prompt-Mapping, Regel prompts, Map-Eintrag, Anker-Konvention** – `466a90d` (test, RED), `4891dd9` (feat, GREEN)

## Decisions Made

- Regel `keyword`: vollständiges normalisiertes Hauptkeyword im gerenderten Titel (konsistent mit `keyword-map.test`, das dasselbe für `target.title` verlangt; die Regel `map` hält Titel = Zielwert).
- Fragetext ohne `aria-hidden`-Elemente (FAQ-Symbol „+“ in `summary`), damit `faq-schema` und `antwort` den sichtbaren Fragetext vergleichen.
- Prompt-Ziele: Phase ≤ 8 voll geprüft, Phase 9 nur Existenz; Bestandsziele mit vorhandener `faq-titel`-id (Konvention Punkt 3); `phase` = Phase, in der das Ziel entstand (Startseite 6, Funktionsseiten/App 7).
- Die Antwort-zuerst-Prüfung sucht das erste `<p>` bis zur nächsten Überschrift ohne feste Fenstergröße (Research-Beispiel nutzte 4000 Zeichen; lange Inline-SVGs hätten Fehlalarme erzeugt).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] FAQ-Symbol im Fragetext**
- **Found during:** Task 1 (erster Audit-Lauf)
- **Issue:** `faq-schema` meldete 31 Fragen auf `/preise` und allen Gewerken als unsichtbar, weil das `aria-hidden`-Symbol „+“ in der `summary` zum Text zählte.
- **Fix:** `ohneVersteckt()` entfernt `aria-hidden`-Elemente vor dem Textvergleich; Fixture ergänzt. Ergebnis: nur der echte Befund `/gobd`.
- **Files modified:** craftos/scripts/lib/seo-audit-core.mjs, craftos/tests/seo-audit-core.test.ts
- **Commit:** 1f9cce3

**2. [Rule 3 - Lint] Ungenutzter Import `decode` in live-check**
- **Issue:** Der Plan nennt `decode` in der Importliste von live-check; live-check nutzt es nach der Umstellung nicht mehr direkt (nur über `plain`/`headTags`).
- **Fix:** Import ohne `decode`, damit Lint ohne Warnung bleibt; `decode` ist in der Kernbibliothek exportiert.
- **Commit:** 1f9cce3

**3. [Rule 3 - Blocking] `keywordMap`-Import in lib/funktionsdetails/index.ts**
- **Issue:** Nach dem Verschieben von `zielwerte()` war der Import ungenutzt (Lint).
- **Fix:** Import entfernt; `zielwerte` und `Zielwerte` werden aus `lib/seo-meta` importiert und re-exportiert, `types.ts` re-exportiert den Typ.
- **Commit:** cc1f481

### Abweichungen von Akzeptanzkriterien (begründet)

- `grep -c "handwerkersoftware-kleine-betriebe#antwort" docs/seo/ai-prompts-targets.json` ergibt **2** statt 1: Der Prompt „Welche Handwerkersoftware ist die beste für kleine Betriebe?“ wird in ChatGPT **und** Perplexity getrackt (eigene Prompt-IDs 1528441 und 1528465); beide Einträge führen laut Research-Tabelle (#1 „ChatGPT, Perplexity“) und Behavior (20 Einträge) auf dasselbe Ziel. Die Regel `prompts` prüft jedes Ziel nur einmal.
- `reason` des neuen Map-Eintrags nennt den exakten Exportbegriff „beste handwerkersoftware für kleine betriebe“ (mit „für“) statt der Kurzform aus dem Plan, damit `reason`, `pageCandidates` und Rohdaten übereinstimmen.

## Issues Encountered

- Der erste Hintergrundstart des Servers lief in einer Subshell (cd im Hintergrund-Teil); `kill $SRV` beendete nur die Subshell. Der eigene `next start` (Startzeit und Kommandozeile geprüft) wurde danach gezielt per PID beendet; Folgeläufe starten `node` direkt mit `& SRV=$!`.

## Known Stubs

Keine. Die Regel `prompts` meldet die acht Phase-8-Ziele bewusst als fehlend; sie entstehen in 08-07 bis 08-13.

## Lücken / Hinweise für Folgepläne

- Koordination: Für die Website gibt es kein Rezept (Build, Audit, live-check, route-audit liefen lokal und einzeln) – Lücke wie in Phase 7.
- Folgepläne schalten die Regeln schrittweise streng: `node scripts/seo-audit.mjs --only=<regel> [--paths=…]` endet ohne `--report` mit Exitcode 1.
- Keine SE-Ranking-Abrufe in diesem Plan (D-24); das Mapping nutzt nur die vorhandene Rohdatei vom 22.10.2026.

## User Setup Required

None – no external service configuration required.

## Next Phase Readiness

08-02 (Brotkrumen in einem Zug) kann gegen `--only=breadcrumbs` bauen; 08-04/08-05 nutzen `metaFor` und die Ist-Werte aus `test-results/seo-audit.json`; Seitenpläne folgen der Anker-Konvention § 17.

---
*Phase: 08-seo-und-ki-sichtbarkeit*
*Completed: 2026-10-22*

## Self-Check: PASSED

Alle sieben neuen Dateien vorhanden; Commits 7f21c9d, 1f9cce3, 52600ea, cc1f481, 466a90d, 4891dd9 im Verlauf.
