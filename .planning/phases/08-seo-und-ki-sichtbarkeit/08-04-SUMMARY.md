---
phase: 08-seo-und-ki-sichtbarkeit
plan: 04
subsystem: seo-metadaten
tags: [metadaten, keyword-map, titel, description, h1, d-06, d-17, d-20]
requires:
  - phase: 08-01
    provides: seo-audit.mjs (Regeln title, description, h1, duplikate, keyword, map), lib/seo-meta.ts (zielwerte, metaFor)
  - phase: 08-02
    provides: crumbsFor/Brotkrumen in allen Köpfen (Regel breadcrumbs streng grün)
provides:
  - craftos/docs/seo/keyword-map.json mit vollständigen targets für alle 136 bestehenden und geplanten Phase-8-Einträge
  - metaFor mit Titelvariante ohne Markenzusatz (title.absolute)
  - KEYWORD-MAP.md § 6 „Phase 8 – sitewide Zielwerte“ mit allen 62 H1-Änderungen (alt → neu, Grund)
  - Alle indexierten Routen beziehen Title, Description und H1 aus der Map (Gewerke, Ratgeber, Hilfe, Kategorien, Übersichten, Rechner, Support, Rechtsseiten, fünf Kernseiten)
affects: [08-05, 08-07, 08-08, 08-09, 08-10, 08-11, 08-12, 08-13, 08-14, phase-09]
tech-stack:
  added: []
  patterns:
    - "Map als einzige Metadatenquelle: export const metadata = metaFor(pfad) bzw. generateMetadata → metaFor; H1 = zielwerte(pfad).h1"
    - "Map-Bearbeitung nur per Node-Skriptdatei mit eingebauter Regelprüfung (Längen, Eindeutigkeit, Kopfwort, Kategorie-Präfix, Überclaims) vor dem Schreiben"
key-files:
  created: []
  modified:
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/lib/seo-meta.ts
    - craftos/tests/seo-meta.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/content.test.ts
    - craftos/lib/gewerke.ts
    - craftos/app/gewerke/page.tsx
    - craftos/app/gewerke/[slug]/page.tsx
    - craftos/app/blog/page.tsx
    - craftos/app/hilfe/page.tsx
    - craftos/app/blog/[slug]/page.tsx
    - craftos/app/hilfe/[slug]/page.tsx
    - craftos/app/blog/kategorie/[category]/page.tsx
    - craftos/app/hilfe/kategorie/[category]/page.tsx
    - craftos/components/content/ArticlePage.tsx
    - craftos/components/content/ContentIndex.tsx
    - craftos/app/rechner/page.tsx
    - craftos/app/rechner/stundensatz/page.tsx
    - craftos/app/rechner/angebotskalkulation/page.tsx
    - craftos/app/support/page.tsx
    - craftos/app/agb/page.tsx
    - craftos/app/datenschutz/page.tsx
    - craftos/app/impressum/page.tsx
    - craftos/app/preise/page.tsx
    - craftos/app/vergleich/page.tsx
    - craftos/app/fakten-ueber-craftos/page.tsx
    - craftos/app/craft-ai/page.tsx
    - craftos/app/gobd/page.tsx
key-decisions:
  - "08-04: H1-Regel D-17 wörtlich angewandt – enthält die bisher gerenderte H1 das Kopfwort, bleibt sie unverändert (frühere Phase-5-H1-Vorschläge entfallen); sonst Kopfwort vorangestellt oder Synonym ersetzt (62 geänderte H1, Tabelle in KEYWORD-MAP.md § 6)"
  - "08-04: Kategorien mit Hauptkeyword erhalten Präfix plus Kopfwort per Synonym-Ersatz (z. B. „Hilfe: Zeiterfassung & Mobile“, „Ratgeber: Projektmanagement & Material“)"
  - "08-04: Gewerke-H1 = Gewerk-Bezeichnung mit Kopfwort + bisheriger Slogan (z. B. „Elektriker-Software: vom Zählerschrank bis zur Wallbox“); heroTitle bleibt als Slogan-Datenfeld, wird aber nicht mehr als H1 gerendert"
  - "08-04: Überclaim-Wortliste für Descriptions (lückenlos, vollständig offline, beste, Testsieger, Nr. 1, Marktführer); „Bauphase“ aus der funktionsdetails-Liste bewusst nicht sitewide, weil „bauphasen“ Hauptkeyword einer Hilfeseite ist"
  - "08-04: Titel ohne Markenzusatz nur dort, wo die Entwurfsregel Hilfe greift (/hilfe/mitarbeiter-einladen-lizenz-zuweisen); metaFor rendert dann title.absolute"
requirements-completed: []
duration: 33min
completed: 2026-10-22
---

# Phase 8 Plan 04: Sitewide Metadaten aus der Keyword-Map Summary

**Title, Description und H1 aller 131 indexierten Seiten kommen jetzt ausschließlich aus `docs/seo/keyword-map.json` (`metaFor`/`zielwerte`); 18 fehlende Zielwerte ergänzt, 62 H1 nach D-17 mechanisch angepasst, doppelte H1 „Rechnungen“ aufgelöst – `seo-audit --only=title,description,h1,duplikate,keyword,map,breadcrumbs` meldet 0 Verstöße (Baseline 08-01: 431 in diesen Regeln ohne Brotkrumen).**

## Performance

- **Duration:** ca. 33 min
- **Started:** 2026-10-22T16:35Z
- **Completed:** 2026-10-22T17:08Z
- **Tasks:** 3 (Task 1 mit RED- und GREEN-Commit)
- **Files modified:** 29

## Accomplishments

- **Map vollständig (Task 1):** Alle 136 Einträge mit Status `bestehend` bzw. geplant in Phase 8 haben `target.title`, `target.h1`, `target.description`; Phase-9-Einträge unverändert. Neu: `/fakten-ueber-craftos` (UI-SPEC § 8), `/support`, `/hilfe`, `/agb`, `/datenschutz`, `/impressum` (Description ohne „§ 5 DDG/TMG“, Open Question 5), 4 Kategorien, 3 Ratgeber, 5 Hilfeartikel. UI-SPEC § 8: vier Alternativen-Titel, `/vergleich` H1 und Description. Description von `/blog/handwerkersoftware-auswaehlen` ohne „beste“.
- **H1 nach D-17:** 62 geänderte H1 (alt → neu, Grund) in KEYWORD-MAP.md § 6 „Phase 8 – sitewide Zielwerte“; die fünf Umbauseiten tragen bereits die UI-SPEC-H1 im Bestandskopf; alle 15 Kategorien heißen „Ratgeber: …“ bzw. „Hilfe: …“.
- **metaFor:** Titel ohne „ | CraftOS“ → `title: { absolute }`, og/twitter-Titel gleich; sonst unverändert Template.
- **Verdrahtung (Tasks 2–3):** Gewerke (Übersicht + 12 Detailseiten; `seoTitle`/`seoDescription` entfernt), Ratgeber/Hilfe-Artikel (`metaFor` mit eigenem OG-Bild plus `openGraph.type: "article"`, Veröffentlichungsdaten, Autor), ArticlePage-H1 aus der Map (Frontmatter-Titel bleibt für Brotkrumen, Listen, Feed, Schema), Kategorien und Übersichten (ContentIndex-H1 aus der Map), drei Rechner (jetzt mit og/twitter-Bild über `pageMetadata`), `/support`, Rechtsseiten (nur Metadaten und LegalShell-Titel, Rechtstext unverändert), `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`.

## Prüfergebnisse

- Vitest gezielt Task 1 (keyword-map, seo-meta, keyword-seeds, ai-prompts): 37/37; Task 2 (content, keyword-map, breadcrumbs): 44/44.
- `npm test` (volle Suite): **33 Dateien, 612 Tests grün** (vorher 599). Erster Lauf: 2 Zeitüberschreitungen (5 s) in `content.test.ts` unter Volllast; die neuen Render-Prüfungen haben jetzt ein Zeitlimit von 60 s, zweiter Lauf grün.
- `npm run typecheck`, `npm run lint`: grün nach jedem Task.
- `npm run build`: grün (zweimal; Koordinationsstatus vorher gelesen, kein Website-Rezept → lokal, einzeln).
- `node scripts/seo-audit.mjs --only=title,description,h1,duplikate,keyword,map,breadcrumbs`: **131/131 URLs, 0 Verstöße, Exit 0**.
- Volles Audit (`--report`) nach 08-04: title 0, description 0, h1 0, keyword 0, map 0, breadcrumbs 0, duplikate 0, schema 0; offen nur og 130 (08-05), faq-schema 1 (`/gobd`), antwort 1 (`/preise`), prompts 8 (Seiten aus 08-07 bis 08-13) – **140 Verstöße** (08-01-Baseline 711).
- `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`: 131 Routen, 0 Fehler, 0 defekte Links, Exit 0.
- `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs`: 46 OK, „alle Prüfungen OK“.
- `npm run test:e2e`: **292 bestanden, 1 fehlgeschlagen, 75 übersprungen** (9,6 min). Der Fehlschlag ist der bekannte zeitabhängige WebKit-Fall `home-navigation.pw.cjs:501` (webkit-390-touch, `/funktionen`, deferred-items.md 08-02); Einzelwiederholung: erst rot, dann grün. `/funktionen` ist von 08-04 nicht betroffen.
- Server mit eigener PID 43736 gestartet (Kommandozeile geprüft) und beendet; Port 3100 danach frei, Prozess beendet, Sperre `.heavy-lock` freigegeben.

## Task Commits

1. **Task 1: Zielwerte, H1 nach D-17, metaFor absolute, Map-Tests** – `352e99c` (test, RED), `5da9cea` (feat, GREEN)
2. **Task 2: Gewerke, Ratgeber, Hilfe, Kategorien, Übersichten** – `7081a3e` (feat)
3. **Task 3: Rechner, Support, Rechtsseiten, Kernseiten; Läufe** – `9cc57b0` (feat)

## Decisions Made

Siehe `key-decisions` im Frontmatter. Ergänzend: Bei Hilfeartikeln wurde das Kopfwort bevorzugt durch Ersatz des bisherigen Begriffs eingefügt („Phasen“ → „Bauphasen“, „Zahlung“ → „Zahlungseingang“), sonst vorangestellt („Storno: …“, „Stundenzettel: …“). Kleinschreibung nach Doppelpunkt, wenn kein vollständiger Satz folgt (Gewerke, Hilfe).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Zeitüberschreitung der neuen Render-Prüfungen unter Volllast**
- **Found during:** Task 3 (voller Vitest-Lauf)
- **Issue:** Die Prüfung aller 64 Artikel-Renderings in `content.test.ts` und ein Bestandsfall derselben Datei überschritten unter Volllast das Standardlimit von 5 s (einzeln 2,7 s bzw. 1,3 s).
- **Fix:** Explizite Zeitlimits (60 s) für die drei neuen Render-Prüfungen; Bestandsfall unverändert (im zweiten Lauf grün).
- **Files modified:** craftos/tests/content.test.ts
- **Commit:** 9cc57b0

**2. [Rule 3 - Lint] Unbenutzte `title`-Konstanten in zwei Rechnerseiten**
- **Fix:** entfernt (JSON-LD nutzt dort eigene Namen); `/rechner` behält `title` für das CollectionPage-Schema.
- **Commit:** 9cc57b0

### Abweichungen und Hinweise

- **Übergangsstand `/vergleich` und `/fakten-ueber-craftos`:** H1 und Description folgen bereits den UI-SPEC-Werten („fünf Anbieter mit Quellen“), der Bestandsinhalt nennt bis zum Umbau in einem späteren Phase-8-Plan nur drei Anbieter. So im Plan vorgesehen; nichts geht vor dem Rollout (08-14) live.
- **Sichtbare Zeilenumbrüche:** Die bisherigen `<br />`-Umbrüche in den PageHero-Titeln (Support, Gewerke, Preise, Craft AI, GoBD, Vergleich) entfallen, weil die H1 jetzt eine Zeichenkette aus der Map ist. Die E2E-Läufe zeigen keine Überläufe; eine Sichtprüfung verlangt der Plan nicht.
- **Kein E2E-Spec und kein `home-navigation.pw.cjs` geändert:** Keine Spec erwartet alte Titel oder H1 (grep bestätigt). Abweichend von der Dateiliste wurde `content.test.ts` um drei Verdrahtungsprüfungen ergänzt (statt angepasst).
- **`heroTitle` in `lib/gewerke.ts`** bleibt als Datenfeld (Slogan) bestehen, wird aber nicht mehr gerendert; die Entfernung oder Neuverwendung gehört zum Gewerke-Umbau in Phase 9.
- **Parallelbetrieb:** Die Orchestrator-Regel zur Sperre `.heavy-lock` kam während des E2E-Laufs; die Sperre wurde sofort für den laufenden E2E-Lauf und den Server geholt und direkt danach freigegeben. Build und volle Vitest-Suite liefen vorher noch ohne Sperre (vor Einführung der Regel).

**Total deviations:** 2 auto-fixed (Rule 1, Rule 3). **Impact:** keine Umfangserweiterung.

## Issues Encountered

- `home-navigation.pw.cjs:501` (webkit-390-touch) erneut zeitabhängig rot im vollen Lauf; bekannt und bereits in deferred-items.md (08-02) mit Vorschlag für Phase 10 geführt.

## Known Stubs

Keine. Die Map-Werte für `/vergleich` und `/fakten-ueber-craftos` beschreiben den Zielinhalt der Umbaupläne (siehe oben).

## Threat Flags

Keine neue Angriffsfläche. T-08-09: Überclaim-Test über alle Descriptions; Preise/Testtage nur in bestehenden, vom Paritätstest gedeckten Map-Werten. T-08-10: Rechtsseiten-Diff nur Metadaten/H1-Quelle (geprüft). T-08-11: Map ausschließlich per Skriptdatei mit Regelprüfung bearbeitet; Provenienz- und primary-null-Tests grün.

## User Setup Required

None – keine externe Konfiguration.

## Next Phase Readiness

- Folgepläne (Alternativen, kleine Betriebe, Umbauseiten) rendern `metaFor(pfad)` und `zielwerte(pfad).h1`; die Zielwerte stehen schon in der Map. Beim Livegang neuer Seiten Status `geplant` → `bestehend` im selben Commit wie Sitemap.
- 08-05 kann die Regel `og` angehen; alle Seiten haben jetzt og/twitter-Felder (auch Rechner und Rechtsseiten).
- Offen für den Inhaber: Impressum-Hinweis „§ 5 DDG“ statt „§ 5 TMG“ im Rechtstext (unverändert gelassen, D-20).

## Self-Check: PASSED

Commits 352e99c, 5da9cea, 7081a3e, 9cc57b0 im Verlauf; SUMMARY vorhanden; Akzeptanz-Greps erfüllt (0 Einträge ohne target, „Phase 8 – sitewide Zielwerte“ = 1, „absolute“ in seo-meta.ts, seoTitle/seoDescription = 0, metaFor in allen genannten Routen, zielwerte in ArticlePage und ContentIndex).
