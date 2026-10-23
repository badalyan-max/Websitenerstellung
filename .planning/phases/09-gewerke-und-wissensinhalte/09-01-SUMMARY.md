---
phase: 09-gewerke-und-wissensinhalte
plan: 01
subsystem: content-fundament
tags: [fundament, f-a1, linkkarten, contentkopf, leitlinie-l1, frontmatter, rehype, scene-registry, seo-audit, keyword-map]

requires:
  - phase: 08-seo-und-ki-sichtbarkeit
    provides: "FunktionsKopf G1, Breadcrumbs, Keyword-Map als einzige Quelle (metaFor/zielwerte), seo-audit-core mit answerFirstViolations/promptVerstoesse"
provides:
  - "TEXT_BUDGET Phase 9 (linkKarte, gewerk, artikel, acht Mengen) – additiv"
  - "LinkKarten (G9) und ContentKopf (G8) als Bausteine für Gewerke-, Artikel- und Übersichtsvorlagen"
  - "lib/leitlinie-l1.json + lib/leitlinie.ts (l1Woerter, l1Treffer) als einzige L-1-Quelle"
  - "Inhaltsvertrag: Frontmatter answer/faq/scene, relatedFeatures ≤ 3, relatedArticles ≤ 4, prosaProbleme, Rehype-Schritt (ol role=list, Tabellenhülle)"
  - "sceneById + sceneFrame in lib/scenes.ts, categoryIcons in lib/content-types.ts"
  - "scripts/lib/ts-literale.mjs (stringLiterale) und tests/content-produktwahrheit.test.ts"
  - "mitAntwortRegel (Antwort zuerst auf /gewerke*, /blog/*, /hilfe/*), Prompt-Ziele Phase 9 mit Anker voll geprüft (K-2)"
  - "Keyword-Map: 10 neue Hilfe-Pfade (geplant, Phase 9), teilabnahme vob, Herkunft K-4, Übergang K-3"
affects: [09-02, 09-11, 09-12, 09-13, 09-15, 09-03, 09-04, 09-05, 09-06, 09-07, 09-08, 09-14, 09-17, 09-18, 09-09]

tech-stack:
  added: []
  patterns:
    - "Übergangslisten mit Schlüssel Datei + Regel bzw. Datei + Wort (ohne Zeilennummer), Kommentar „Übergang bis 09-09“"
    - "L-1-Prüfung von .ts-Dateien nur über String-Literale (TypeScript-Parser), Kommentare bleiben unberührt"
    - "Eigener Rehype-Schritt nach rehype-sanitize und rehype-slug statt String-Ersatz"
    - "Rohdaten mit Herkunftskopf (source/fetchedAt) gelten neben dem kwmap-Manifest als Herkunft"

key-files:
  created:
    - craftos/components/v2/LinkKarten.tsx
    - craftos/components/v2/LinkKarten.module.css
    - craftos/components/content/ContentKopf.tsx
    - craftos/components/content/ContentKopf.module.css
    - craftos/lib/leitlinie-l1.json
    - craftos/lib/leitlinie.ts
    - craftos/scripts/lib/ts-literale.mjs
    - craftos/tests/content-produktwahrheit.test.ts
  modified:
    - craftos/components/v2/budgets.ts
    - craftos/lib/content.ts
    - craftos/lib/content-types.ts
    - craftos/lib/scenes.ts
    - craftos/scripts/lib/seo-audit-core.mjs
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/seo/keyword-seeds.json
    - craftos/content/blog/handwerkersoftware-wechseln.md
    - craftos/content/blog/offene-posten-liquiditaet.md
    - craftos/content/hilfe/ki-entwurf-pruefen-uebernehmen.md
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/design-v2-components.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/content.test.ts
    - craftos/tests/seo-audit-core.test.ts

key-decisions:
  - "Phase 9: F-A1 (Budgets, LinkKarten, ContentKopf, Leitlinie L-1, drei Gewerke-H1) als eigener Commit 81f4456 mit festem Betreff, vorgezogen gemergt"
  - "Phase 9: L-1-Wortliste liegt nur in lib/leitlinie-l1.json; lib/leitlinie.ts sucht Unicode-sicher mit Wortgrenzen (Lookarounds statt \\b)"
  - "Phase 9: Prosa-Regeln als prosaProbleme(slug, body, faq) in lib/content.ts – Messung am Bestand 0 Treffer, Übergangsliste leer"
  - "Phase 9: L-1-Übergangsliste mit 24 Bestandstreffern (23 Artikel-Treffer, 1 lib/gewerke.ts), wird in 09-09 entfernt"
  - "Phase 9: Herkunft K-4 über Herkunftskopf der Rohdatei statt Manifest-Eintrag; kwmap/manifest.json unverändert"
  - "Phase 9: Kategorieseiten (/blog/kategorie/*, /hilfe/kategorie/*) bleiben außerhalb der Antwortregel"

patterns-established:
  - "Bausteine ohne Hooks, ohne Client-Direktive und ohne server-only, damit Server- und Client-Inseln sie teilen (LinkKarten)"
  - "Map-Bearbeitung nur per Scratchpad-Skript mit Regelprüfung vor dem Schreiben"

requirements-completed: []

duration: 35min
completed: 2026-10-23
---

# Phase 9 Plan 01: Fundament Teil 1 Summary

**Bausteine G8/G9 mit Phase-9-Budgets, L-1-Wortliste als JSON-Quelle, erweiterter Inhaltsvertrag (answer/faq/scene, Listenobergrenzen, Rehype-Schritt, Prosa-Regeln), Antwortregel für /gewerke, /blog, /hilfe und zehn neue Hilfe-Pfade in der Keyword-Map – alles mit Tests, F-A1 als vorgezogener Commit `81f4456`.**

## Performance

- **Duration:** ca. 35 min
- **Started:** 2026-10-22T23:21Z (Startgate)
- **Completed:** 2026-10-22T23:56Z
- **Tasks:** 3 von 3
- **Files:** 8 neu, 16 geändert (plus `deferred-items.md`)

## Startgate (W7)

| Bedingung | Ergebnis |
|---|---|
| `08-14-SUMMARY.md` vorhanden | ok |
| `craftos/docs/releases/PHASE-08-ROLLOUT.md` vorhanden | ok |
| `git -C C:/Projekte/Websitenerstellung status --porcelain craftos` leer | ok (nur `.planning/config.json` lokal geändert, außerhalb `craftos/`) |
| keine `wt-08*`-Worktrees | ok (nur `wt-09a`, `wt-09basis` und Codex-Worktrees) |
| Port 3101 frei | ok |

## Accomplishments

- **F-A1 (`81f4456`, fester Betreff, vorgezogen gemergt als `fb241c3`):** `TEXT_BUDGET` additiv um `linkKarte`, `gewerk`, `artikel` und acht Mengen; `LinkKarten` (G9, hookfrei, `ul[role=list][aria-label] › li › article`, Link im `h3` gestreckt, kein „Weiterlesen“, keine Pfeilglyphe); `ContentKopf` (G8, hell, `#antwort`, Metazeile als Liste ohne „·“, `stand`, Plattformen, Silbentrennung der H1); `lib/leitlinie-l1.json` (19 Wörter, 10 Altbegriffe, 3 Ausnahmen mit Begründung) und `lib/leitlinie.ts` (`l1Woerter`, `l1Treffer`); drei Gewerke-H1 auf ≤ 60 gekürzt (`/gewerke` 58, `/gewerke/bauunternehmen` 59, `/gewerke/allrounder` 58).
- **Inhaltsvertrag (`1aa2fb1`):** `parseContent` prüft `answer` (≤ 300, 1–2 Sätze, optional bis 09-09), `faq` (3–8, Frage ≤ 90 mit „?“, Antwort ≤ 300), `scene` (∈ `sceneById`), `relatedFeatures` ≤ 3, `relatedArticles` ≤ 4 mit den Fehlertexten aus 09-UI-SPEC § 5 bzw. dem Plan. Rehype-Schritt nach `rehype-sanitize`/`rehype-slug`: oberste `ol` mit `role="list"`, jede Tabelle in `div.table-scroll[role=region][tabindex=0][aria-label="Tabelle: {H2}"]` (String-Ersatz abgelöst). `prosaProbleme(slug, body, faq)` sammelt Bild, Startnummer, Schritt > 160, Schrittliste außerhalb 2–10, Überschrift > 80, reservierte id, FAQ-Frage als Überschrift. `sceneById` (28 Szenen) und `sceneFrame` in `lib/scenes.ts`; `categoryIcons` in `lib/content-types.ts`; `stringLiterale` in `scripts/lib/ts-literale.mjs`; `mitAntwortRegel` und K-2 in `scripts/lib/seo-audit-core.mjs`.
- **Keyword-Map (`ca04c65`):** zehn neue Hilfe-Pfade `geplant`/Phase 9 mit vollständigem `target`; Hauptkeywords nur für mahnstufen (170/8), camt 053 (390/13), datenübernahme (110/9), datanorm (390/18), lager app (90/14), die übrigen fünf `primary: null` mit `reason` und Rohdatei; „teilabnahme vob“ (110/9) als Nebenbegriff an `/hilfe/abnahme-dokumentieren`; `pageCandidates` für alle zehn; Map 145 → 155 Einträge. Herkunftstest (K-4) und Übergangsregel (K-3) angepasst; KEYWORD-MAP.md § 2, § 3, § 6.

## Map-Skript: Regeln und Ergebnis (W5)

Skript im Scratchpad (nicht committet), Prüfung vor dem Schreiben – dieselben sitewide Regeln wie 08-04: Titel ≤ 60 inklusive „ | CraftOS“, Description 120–155, H1 ≤ 70, Hauptkeyword im Titel, **Kopfwort** des Hauptkeywords in Titel und H1, **Überclaim**-Wörter (lückenlos, vollständig offline, beste, Testsieger, Nr. 1, Marktführer, automatisch), L-1-Wortliste, Kategorie-Präfix, Eindeutigkeit von Titel/H1/Description über alle Einträge, Kannibalisierung (Haupt- gegen Haupt- und Nebenbegriffe), Herkunft (Daten bzw. `dataFound: false` in der Rohdatei). Ergebnis für alle zehn Einträge: **0 Fehler** (Titel 38–57, H1 37–65, Description 144–155 Zeichen; Kopfwort ok bei allen fünf mit Hauptkeyword; 0 Überclaims; 0 L-1-Treffer). Die neun vorhandenen Phase-9-Einträge hatten bereits vollständige `target` (nur geprüft). **SE Ranking: 0 Units** (kein Abruf; Daten aus `docs/seo/data/2026-10-22-keyword-*-phase09.json`).

## Task Commits

1. **Aufgabe 1 (F-A1)** – RED `3444828` `test(09-01): F-A1 RED – …`, GREEN `81f4456` `feat(09-01): F-A1 Budgets, LinkKarten, ContentKopf, Leitlinie L-1, Gewerke-H1`
2. **Aufgabe 2 (Inhaltsvertrag)** – RED `f49179e` `test(09-01): Inhaltsvertrag RED – …`, GREEN `1aa2fb1` `feat(09-01): Inhaltsvertrag – …`
3. **Aufgabe 3 (Keyword-Map)** – Merge von `main` `b95554a` (K-1 vorhanden), Fix `5f191b9` `fix(09-01): L-1-Test – reine Wortlisten-Einträge …`, `ca04c65` `feat(09-01): Keyword-Map Phase 9 – …`

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| Aufgabe 1: `design-v2-budgets`, `design-v2-components`, `keyword-map`, `funktionskopf`, `breadcrumbs` | 5 Dateien, 166 Tests grün |
| Aufgabe 2: `content-produktwahrheit`, `seo-audit-core`, `breadcrumbs`, `llms`; `content.test.ts` unter Sperre | 71 + 20 Tests grün; `content.test.ts` 34 grün |
| Aufgabe 3: `keyword-map`, `keyword-seeds`, `ai-prompts` | 3 Dateien, 35 Tests grün |
| Typcheck, Lint (nach jeder Aufgabe) | 0 Fehler |
| Paketende unter Sperre: volle Suite ohne `pricing-parity` | 39 Dateien, 915 von 916 grün – 1 rot: `announcements.test.ts` (fremd, siehe Deferred) |
| `pricing-parity.test.ts` einzeln | 12 grün (Produktbasis aus 09-15 trotzdem ausgewiesen) |
| `npm run build` | grün |
| `node scripts/seo-audit.mjs --report` (136 Seiten) | alle Regeln 0 außer `antwort` (Arbeitsvorrat unten) |

**Antwortregel-Verstöße je Bereich (Arbeitsvorrat, erwartet):** `/blog/*` **21** auf 15 Ratgebern (Paket b 17, Paket c 4); `/hilfe/*` **0**; `/gewerke*` **0**; zentrale Seiten 0. Alle sind erste Absätze unter Frage-H2 mit 302–385 Zeichen.

## Decisions Made

- Prosa-Regeln als exportierte Funktion `prosaProbleme` in `lib/content.ts` (wiederverwendbar für 09-12/09-15), Regelschlüssel `bild`, `ol-start`, `schritt`, `schrittliste`, `ueberschrift`, `reservierte-id`, `faq-ueberschrift`. Messung am Bestand: 0 Treffer, `UEBERGANG_PHASE9` ist leer.
- L-1-Übergangsliste `L1_UEBERGANG_PHASE9` mit 24 Bestandstreffern (23 in Artikeln, 1 `lib/gewerke.ts|vorbereitete Leistungsvorlagen` vom Stand `0b84201`), Schlüssel Datei + Wort.
- Herkunft K-4 über den Herkunftskopf der Rohdatei (`source.endpoint` = Kopf `source`, `fetchedAt` = Kopf `fetchedAt`); `kwmap/manifest.json` blieb unverändert (der Plan erlaubte Manifest **oder** Kopf).
- `mitAntwortRegel`: Kategorieseiten bleiben außen vor (keine Frage-Überschriften, 09-UI-SPEC A7); `/blog` und `/hilfe` selbst ebenfalls (keine Frage-H2).
- `stringLiterale` nutzt den TypeScript-Parser (`createSourceFile`) statt eines reinen Token-Scans, damit Regex-Literale und Template-Teile sicher erkannt werden.

## Deviations from Plan

### Ermessens- und Auto-Ergänzungen

**1. [Ermessen, laut Plan zu vermerken] `lib/leitlinie-l1.json` und `lib/leitlinie.ts` in F-A1**
- Gemeinsamer Vertrag für 09-11, die Inhaltspakete und den L-1-Test; Wortgrenzen Unicode-sicher über Lookarounds (JavaScript-`\b` kennt keine Umlaute), RegExp-Konstruktor wegen `target: ES2017`.
- Commit: `81f4456`

**2. [D-27-Ausnahme B2, laut Plan zu vermerken] Drei Frontmatter-Listen gekürzt**
- `blog/handwerkersoftware-wechseln.md` (ohne `angebote`), `blog/offene-posten-liquiditaet.md` (ohne `buchhaltung`), `hilfe/ki-entwurf-pruefen-uebernehmen.md` (ohne `baudokumentation`): je nur `relatedFeatures` 4 → 3, `relatedArticles` lagen schon bei 2; `updatedAt` unverändert, keine Prosazeile im Diff. Die Pakete 09-03, 09-04 und 09-18 übernehmen den Stand per Merge.
- Commit: `1aa2fb1`

**3. [Rule 2 – additiv] Optionale Props `LinkKarte.iconFeld` und `ContentKopf.id`**
- `iconFeld` unterscheidet Lucide im Icon-Feld (48 × 48, `#FFEFCC`) von `GewerkIcon` ohne Feld (09-UI-SPEC G9); `id` (Standard `artikel-titel`) passt zu `<article aria-labelledby="artikel-titel">` (§ 2.2). Vertrag sonst unverändert.
- Commit: `81f4456`

**4. [Rule 1 – Bug] TOC-Titel mit „&“**
- `hast-util-to-html` schreibt „&“ als `&#x26;`; die TOC-Regex dekodiert das jetzt mit. Im Bestand hat keine Überschrift ein „&“ (keine Ausgabeänderung).
- Commit: `1aa2fb1`

**5. [Rule 3 – blockierend nach dem Merge] L-1-Test und lokale Wortliste aus 09-02**
- Nach `git merge main` traf `content-produktwahrheit.test.ts` die Einträge der lokalen `L1_WOERTER`-Liste in `lib/gewerke.ts` (09-02). String-Literale, die **genau** aus einem Leitlinienwort bestehen, gelten jetzt als Prüf-Listeneintrag, nicht als Seitentext (Begründung im Test, 09-UI-SPEC § 5 „weitere Ausnahmen nur mit eigener Begründung im Test“); Literale mit weiterem Text bleiben voll geprüft (Fixture).
- Commit: `5f191b9`

**6. [Test umgestellt laut D-24] `seo-audit-core.test.ts` „Antwort > 300 … nicht zentral ignoriert“**
- `/blog/x` fällt jetzt unter die Antwortregel; der Negativfall nutzt `/support`.
- Commit: `1aa2fb1`

**7. Design-Kaskade**
- Keine eigene Kaskade ausgeführt: D-31 legt sie einmal im 09-UI-SPEC fest (dort dokumentiert); die Bausteine folgen dem genehmigten Vertrag G8/G9. 21st.dev/Context7 nicht genutzt.

---

**Total deviations:** 2 laut Plan zu vermerken, 4 Auto-Fixes/Ergänzungen, 1 Hinweis. **Impact:** keine Regel abgeschwächt; alle Übergänge benannt und bis 09-09 befristet.

## Deferred Issues

- `tests/announcements.test.ts` rot durch `lib/gewerke.ts:569 "Bald verfügbar",` (lokale Wortliste aus 09-02, auf `main` ebenso rot). Zuständig Paket (a) / 09-11 (Umstellung auf `lib/leitlinie.ts`). Eingetragen in `deferred-items.md`.
- Antwortregel `/blog/*`: 21 Verstöße als Arbeitsvorrat für 09-03 (17) und 09-04 (4).

## Threat Flags

Keine neue Angriffsfläche: Der Rehype-Schritt läuft hinter `rehype-sanitize` (T-09-01, Test „role/tabindex aus Markdown-HTML kommen nicht durch“, `script`/`javascript:` bleiben entfernt); keine neuen Pakete (T-09-SC); keine SE-Ranking-Abrufe und keine Schlüssel in Dateien (T-09-03); Übergangslisten eingefroren und benannt (T-09-04).

## Known Stubs

Keine. `answer` ist laut D-18 bis zur Integration optional (Welle 1–2), die Pflicht setzt 09-09.

## Next Phase Readiness

- Paket (a) 09-11 findet F-A1, `mitAntwortRegel` (K-2) und die Map-H1 auf `main`, sobald dieser Branch gemergt ist; die Umstellung der lokalen Wortliste auf `lib/leitlinie.ts` macht `announcements.test.ts` wieder grün.
- Inhaltspakete (Welle 3) nutzen `prosaProbleme`, `l1Treffer`, `sceneById` und die neuen Slugs; 09-15 (Produktbasis, Prüfwerkzeug) und 09-12 (Artikelvorlage mit `ContentKopf`, `LinkKarten`, `categoryIcons`) folgen im selben Worktree.
- STATE.md und ROADMAP.md bewusst nicht geändert (Worktree-Regel).

## Self-Check: PASSED

Alle 8 neuen Dateien vorhanden; Commits 3444828, 81f4456, f49179e, 1aa2fb1, b95554a, 5f191b9, ca04c65 im Branch phase09-spur-basis.
