---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 02
subsystem: funktionsmodell
tags: [funktionsmodell, produktregister, keyword-map, paritaet, mega-menue]
requires:
  - phase: 07-01
    provides: Zielart "seite" in ZusatzZiel, pageHead-Budgets, Schema-Helfer
provides:
  - 22 Detailfunktionen in lib/funktionen.ts (neu gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement)
  - Produktregister mit Belegen der sechs Funktionen in evidence/mobileEvidence; liveExtras mit 8 beworbenen Einträgen
  - Gruppenmodell 22 + 8 = 30, alle 8 Zusatzfunktionen mit Ziel (7 Detailseiten, „21 Sprachen“ → /app, kind „seite“); Export ZUSATZ_IDS
  - Keyword-Map mit den sechs Pfaden als „bestehend“ und bereinigten Zielwerten (D-22), Änderungshinweis in KEYWORD-MAP.md § 6
  - relatedFeatures-Links aus fünf Hilfe- und drei Ratgeberartikeln auf die neuen Seiten (D-12)
  - E2E-Paritäten 22/8/30 und Mega-Menü-Fall 1121/1250 px
affects: [07-03, 07-04, 07-05, 07-06, 07-07, 07-08, 07-09]
tech-stack:
  added: []
  patterns:
    - "Zusatzfunktionen mit eigener Seite wandern aus liveExtras in evidence/mobileEvidence (Pattern 4); ZUSATZ_IDS wird gegen die beworbenen Registereinträge geprüft"
    - "Keyword-Map-Status und Sitemap-Aufnahme im selben Commit (Pitfall 2)"
key-files:
  created: []
  modified:
    - craftos/lib/product-register.ts
    - craftos/lib/funktionen.ts
    - craftos/lib/funktionsgruppen.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/seo/keyword-seeds.json
    - craftos/tests/funktionsgruppen.test.ts
    - craftos/tests/funktionen-seite.test.ts
    - craftos/tests/navigation.test.ts
    - craftos/tests/product-register.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
    - craftos/content/hilfe/gaeb-importieren.md
    - craftos/content/hilfe/mangel-erfassen-bearbeiten.md
    - craftos/content/hilfe/projekt-phasen-anlegen.md
    - craftos/content/hilfe/zahlungen-erfassen.md
    - craftos/content/hilfe/abnahme-dokumentieren.md
    - craftos/content/blog/offene-posten-liquiditaet.md
    - craftos/content/blog/zahlungserinnerung-mahnung-handwerk.md
    - craftos/content/blog/handwerkersoftware-wechseln.md
key-decisions:
  - "Die sechs neuen Funktionen stehen am Ende von lib/funktionen.ts; die Anzeigereihenfolge kommt allein aus DETAIL_ZUORDNUNG"
  - "Zusatzziele tragen als label den Funktionsnamen der Zielseite (z. B. „Angebote & Kalkulation“, „Lager & Material“); der Test vergleicht mit getFunktion(slug).name"
  - "datenuebernahme.help = artikel-stammdaten-anlegen (der Artikel erwähnt den Import, Z. 44); mahnwesen und bankabgleich → zahlungen-erfassen"
  - "pageCandidates für /funktionen/datenuebernahme und /funktionen/maengelmanagement = Haupt- und Nebenbegriff der Map (beide schon im Export), weil keyword-seeds.test.ts Kandidaten für jeden Sitemap-Pfad verlangt"
  - "Task 1 in einem Commit (Plananweisung „Ein Commit für (1)–(4) samt Tests“, Pitfall 2); RED vorher lokal nachgewiesen (19 rote Fälle)"
requirements-completed: []
duration: 19min
completed: 2026-10-21
---

# Phase 7 Plan 02: Funktionsmodell 22 + 8 Summary

**Sechs live und beworbene Funktionen (GAEB und DATANORM, Mahnwesen, Terminplanung, Bankabgleich, Datenübernahme, Mängelmanagement) sind jetzt Detailfunktionen mit Release-Belegen im Register. Menü, /funktionen, ItemList, Sitemap und llms.txt führen 22 Detail- und 8 Zusatzfunktionen. Die Keyword-Map führt die sechs Pfade im selben Commit als „bestehend“, und die H1-/Description-Zielwerte sind laut 07-UI-SPEC bereinigt.**

## Performance

- **Dauer:** ca. 19 min (17:10–17:30 UTC)
- **Tasks:** 3/3
- **Geänderte Dateien:** 21 (0 neu)

## Ergebnisse

### Task 1: Modell, Register, Gruppen, Keyword-Map
- **Produktregister:** Die Belege der sechs ehemaligen `liveExtras` stehen jetzt unter den neuen Slugs in `evidence`. Terminplanung und Mängelmanagement haben zusätzlich `mobileEvidence` (`ProjectPhaseSummary.tsx`, `AssignmentPhaseLine.tsx` bzw. `DefectsScreen.tsx`, `DefectDetailScreen.tsx`); Mängelmanagement hat außerdem den Web-Beleg `src/api/defects.ts`. Jeder Pfad wurde vorher per `git cat-file -e` an `origin/release` und am gepinnten `productBasis`-Commit geprüft (Web 535206b, Mobile 5610a06), und `origin/release` ist unverändert. `liveExtras` enthält danach 8 beworbene Einträge plus „Vorhersagen“ (nicht beworben); `limitations` ist unverändert.
- **funktionen.ts:** Sechs `Definition`-Einträge nach dem Muster `dashboard`. Name, Nutzensatz und Icon kommen aus den bisherigen ZUSATZ-Einträgen bzw. aus 07-UI-SPEC. `title` ist der H1-Zielwert der Keyword-Map, `intro` der Kurznutzen. `points` sind die Kernpunkt-Kacheln ohne Grenze-Kachel, `steps` die Ablaufschritte und `note` der Text der Grenze-Kachel. `related` stammt aus 07-UI-SPEC „Abschnitt 6“. Plattformen: Terminplanung und Mängelmanagement haben `["web", "mobile"]` (D-20), die übrigen vier `["web"]`. `demo` war bereits optional; die Altvorlage rendert ohne Variante keinen Snippet. `checkedAt` bleibt 2026-10-20.
- **funktionsgruppen.ts:** `DETAIL_ZUORDNUNG` ist auf 22 Einträge erweitert (angebot 4, planung 4, baustelle 4, rechnung 3, buchhaltung 5, team 2). `REGISTER_IDS` und `ZUSATZ` haben je 8 Einträge, jeder mit Ziel. Neu exportiert ist `ZUSATZ_IDS`. Der Grenzfall-Kommentar ist um die Phase-7-Zuordnung ergänzt. Gruppentexte mit „Bauphasen“ sind unverändert (B3), und Icons ohne Verwendung wurden entfernt.
- **Keyword-Map:** Die sechs Pfade sind von `geplant` auf `bestehend` umgestellt, das Feld `phase` ist entfernt. Die H1-Werte für team, terminplanung, bankabgleich, datenuebernahme, buchhaltung und baudokumentation sowie die Description von maengelmanagement sind wörtlich laut SEO-Vertrag gesetzt. In KEYWORD-MAP.md sind der Stand (131 bestehend, 13 geplant), die Tabelle „Funktionsseiten (22)“, „Geplante Seiten (13)“, die Zielwerte in § 5, ein Umsetzungsvermerk in § 3 und der neue § 6 „Änderungshinweise“ (21.10.2026, Grund je Wert) angepasst.
- **Tests:** Paritäten 22/8/30. Neue Fälle:
  - Die sechs neuen Funktionen haben Name, Nutzensatz, Plattformen, Gruppe und tier „heute“.
  - Die Altnamen stehen in keinem der Bereiche liveExtras, REGISTER_IDS und ZUSATZ.
  - Jeder ZUSATZ-Schlüssel hat einen beworbenen Registereintrag, und umgekehrt hat jeder beworbene Eintrag einen ZUSATZ-Schlüssel.
  - Jedes `help` ist ein Hilfeartikel der Sitemap.
  - Die Release-Belege der neuen Funktionen (inklusive Mobile) sind vorhanden.
  - Phase-7-Zielwerte: Kopfwort-Regel, H1 ≤ 60, und weder „automatisch“ noch „lückenlos“ in Zielwerten von Funktionsseiten.

  Angepasste Fälle:
  - Der Duplikat-Fall nutzt jetzt „Besichtigung“.
  - „ignoriert nicht beworbene“ erwartet 8.
  - Im Leergruppen-Fall wird zusätzlich `mahnwesen` gefiltert.

### Task 2: Interne Links (D-12)
- Ergänzte Paare, jeweils vorne in `relatedFeatures`:
  - gaeb-importieren → gaeb
  - mangel-erfassen-bearbeiten → maengelmanagement
  - projekt-phasen-anlegen → terminplanung
  - zahlungen-erfassen → bankabgleich
  - abnahme-dokumentieren → maengelmanagement
  - offene-posten-liquiditaet → bankabgleich
  - zahlungserinnerung-mahnung-handwerk → mahnwesen
  - handwerkersoftware-wechseln → datenuebernahme

  Bestehende Einträge und Fließtext sind unverändert.

### Task 3: E2E 22/8 und Mega-Menü
- `DETAIL_SLUGS` enthält jetzt 22 Slugs in Gruppenreihenfolge.
- Die Zählungen für Drawer, Zuordnung und „Mehr zu“ ohne JS sind von 16 auf 22 erhöht.
- `entryLinks` = 22 + 8 = 30 (enthält `/app`).
- `[data-funktion="maengelmanagement"]` ersetzt `[data-funktion="maengel"]`.
- Neuer Fall „Menü: 22 Detaillinks ohne horizontales Überlaufen bei 1121 und 1250 px“ (Desktop-Projekte Chromium und WebKit): Alle 22 Links sind sichtbar, das Panel erfüllt `scrollWidth ≤ clientWidth + 1`, es gibt keinen horizontalen Seiten-Scroll, und kein Link liegt außerhalb des Panels.
- Bestandsfälle in `browser-functional.pw.cjs` und `function-illustrations.pw.cjs` sind nicht an die Zahl 16 gebunden (per Grep geprüft) und blieben unverändert.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED (Task 1, vor der Umsetzung) | 6 Dateien, 19 von 76 Fällen rot wie erwartet |
| Task-1-Vitest (10 Dateien laut Plan) | 103/103 grün, Release-Belegblock lief (nicht übersprungen) |
| Task-2-Vitest (content, llms, announcements) | 17/17 grün |
| `npm test` (voll, nach Task 3) | 26 Dateien, 352/352 grün |
| `npm run typecheck`, `npm run lint` | grün |
| `npm run build` | grün, keine Warnungen im Log |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | 260 passed, 0 failed, 52 skipped (Projekt-Skips Desktop/Touch), 4,7 min |
| `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 17/17 OK (u. a. 30 Funktionen in 6 Gruppen mit ItemList, Mega-Menü im HTML) |
| Port 3100 | vorher frei, Server per PID beendet, danach frei |
| Akzeptanz-Greps | Statusprüfung exit 0; „Zahlungsabgleich: Bankumsätze …“ in KEYWORD-MAP.md 2×; „Bauzeitenplan mit Arbeitsabschnitten …“ in keyword-map.json 1×; alte Registernamen in funktionsgruppen.ts 0; neue Slugs in funktionen.ts 6; „maengelmanagement“ in home-navigation ≥ 2, `data-funktion="maengel"` 0 |

Koordination: Status vor den schweren Läufen gelesen (edgar bereit, edgarspc offline/veraltet). Für das Website-Repo gibt es kein Rezept (Lücke: kein `website-unit`/`website-build`/`website-e2e`). Deshalb liefen Build und E2E lokal nacheinander, jeweils nur ein schwerer Prozess.

## Task Commits

1. `bc5eab1` feat(07-02): move six live functions to detail pages, keyword map 22/8
2. `9d10e42` feat(07-02): link help and guide articles to the new detail pages
3. `9f56ad1` test(07-02): e2e parity 22/8 and mega menu with 22 links at 1121/1250 px

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] keyword-seeds.test.ts verlangt pageCandidates für jeden Sitemap-Pfad**
- **Found during:** Task 1 (volle Suite)
- **Issue:** `/funktionen/datenuebernahme` und `/funktionen/maengelmanagement` hatten keine `pageCandidates`, weil ihre Keywords aus der Lückenanalyse stammen. Sobald sie in der Sitemap stehen, schlug der Bestandstest fehl.
- **Fix:** In `docs/seo/keyword-seeds.json` jeweils Haupt- und Nebenbegriff der Map eingetragen („datenimport“, „daten importieren“ bzw. „mängelmanagement“, „mängelmanagement app“). Alle vier Begriffe stehen bereits im Export, daher war kein API-Abruf nötig. Die Änderung ist in KEYWORD-MAP.md § 6 vermerkt.
- **Files modified:** craftos/docs/seo/keyword-seeds.json, craftos/docs/seo/KEYWORD-MAP.md
- **Commit:** bc5eab1

**2. [Rule 1 - Testanpassung] navigation.test.ts erwartete ≥ 6 Hilfe-Ziele der Zusatzfunktionen**
- **Found during:** Task 1 GREEN
- **Issue:** Laut Plan zeigen die Zusatzziele jetzt auf Funktionsseiten bzw. `/app`; der Bestandsfall war an das alte Zielbild gebunden.
- **Fix:** Erwartet jetzt genau 8 Ziele: 7 auf `/funktionen/…` und 1 auf `/app`. Die Routenprüfung gegen die Sitemap bleibt unverändert. Die Prüfung ist dadurch nicht schwächer, sondern auf das neue Zielbild festgelegt.
- **Files modified:** craftos/tests/navigation.test.ts
- **Commit:** bc5eab1

### Präzisierungen

- **Commit-Schnitt Task 1:** Laut Plan landeten Modell, Keyword-Map und Tests in einem Commit (Pitfall 2), daher gibt es keinen getrennten RED-Commit. RED wurde vorher lokal nachgewiesen (19 rote Fälle in 6 Dateien).
- **access-Texte der sechs neuen Funktionen:** Sie folgen der 07-RESEARCH-Zugriffstabelle, zum Beispiel „Datenimport: Admin oder Büro-Leitung.“ und „Finanzbereich: Admin; Büro-Zugänge nur mit Finanzfreigabe (Rolle Büro-Leitung).“.
- **Altvorlage:** Die sechs neuen URLs rendern vorübergehend mit der Altvorlage. Dort gilt noch `seoTitle` = Name + „für Handwerksbetriebe“, bis 07-04 bis 07-06 die v2-Vorlage mit Keyword-Map-Titeln einführen. Das Datenmodell ist nur lokal geändert und nicht gepusht.

## TDD Gate Compliance

Task 1 (`tdd="true"`): RED wurde lokal nachgewiesen (19 Fehlschläge), GREEN folgte im Commit `bc5eab1`. Einen getrennten `test(...)`-Commit gibt es nicht, weil der Plan ausdrücklich einen Commit für Modell, Keyword-Map und Tests verlangt (Pitfall 2: Status und Sitemap gemeinsam).

## Known Stubs

Keine im Datenmodell. Die sechs neuen Detailseiten nutzen bis 07-06 bewusst die Altvorlage von `app/funktionen/[slug]/page.tsx` (Plan-Objective).

## Threat Flags

Keine neue Angriffsfläche. Umgesetzt sind T-07-04 (Release-Belege per cat-file und Belegtest), T-07-05 (Paritätstest ZUSATZ ↔ Register, Summe 30) und T-07-06 (Überclaims „automatisch“/„lückenlos“ entfernt und per Test gesperrt).

## Self-Check: PASSED

- Alle 21 geänderten Dateien sind committet; der Arbeitsbaum ist sauber, abgesehen von `.planning/config.json` (bewusst nicht angefasst).
- Die Commits bc5eab1, 9d10e42 und 9f56ad1 sind im Log vorhanden.
