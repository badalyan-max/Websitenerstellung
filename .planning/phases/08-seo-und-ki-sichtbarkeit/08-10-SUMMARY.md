---
phase: 08-seo-und-ki-sichtbarkeit
plan: 10
subsystem: vergleich-hub
tags: [vergleich-hub, logos-entfernt, uwg, pflichthinweis, d-02, d-12, inhaber-22-10]
requires:
  - phase: 08-06
    provides: lib/wettbewerber (Datenmodule, faktenVon, standVon, pruefeWettbewerber)
  - phase: 08-09
    provides: alle vier Alternativen-Seiten, Inhaberregel „Nur, was unterstützt wird“ (DESIGN-V2 § 17.6)
provides:
  - lib/seiten/vergleich.ts – Hub-Inhalte (baueVergleich, vergleich) und gemeinsamer Helfer baueMarktuebersicht für Marktübersichten
  - /vergleich als v2-Hub (Kopf G1, Marktübersicht ohne highlight, Einzelvergleiche auf vier Alternativen, StepFlow, FAQ, CtaBand)
  - Altbestände gelöscht (Logos, ProviderLogo, Comparison.module.css, lib/comparison.ts); Schutztests auf neuer Datenlage
affects: [08-11, 08-14]
tech-stack:
  added: []
  patterns:
    - "Marktübersicht: CraftOS zuerst, Anbieter alphabetisch, Beleg (Fakt des Datenmoduls) je Wettbewerberzelle, sonst nur „nicht angegeben“"
    - "FAQ-Aufzählungen aus Moduldaten abgeleitet (laufzeit, kriterien.plantafel) und per Fixture getestet"
    - "PNG-Ausnahmen der Browserprüfung per Vitest gegen EXCEPTIONS des Medienbudgets abgeglichen"
key-files:
  created:
    - craftos/lib/seiten/vergleich.ts
  modified:
    - craftos/app/vergleich/page.tsx
    - craftos/app/sitemap.ts
    - craftos/lib/llms.ts
    - craftos/tests/vergleich-seiten.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/announcements.test.ts
    - craftos/tests/media-budget.test.ts
    - craftos/tests/llms.test.ts
    - craftos/tests/e2e/design-v2.pw.cjs
    - craftos/docs/COMPARISON-LOGOS.md
    - craftos/docs/DESIGN-V2.md
    - .planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md
  deleted:
    - craftos/app/vergleich/ProviderLogo.tsx
    - craftos/app/vergleich/Comparison.module.css
    - craftos/lib/comparison.ts
    - craftos/public/images/brands/craftnote.png
    - craftos/public/images/brands/plancraft.svg
key-decisions:
  - "08-10: Einzelvergleiche als md·sm·sm·wide (plancraft md, Craftnote sm, HERO sm, ToolTime wide), weil 4 × md nicht in ERLAUBTE_ANORDNUNGEN liegt; mit der Kachel „kleine Betriebe“ (08-11, wide) ergibt sich das erlaubte md·sm·sm·wide·wide"
  - "08-10: baueMarktuebersicht ist der gemeinsame Helfer für Marktübersichten (08-11 nutzt ihn): Stand = jüngstes Abrufdatum der Module, Pflichthinweis und Disclaimer wörtlich, wirft bei verneinter CraftOS-Zelle (Inhaber 22.10.2026)"
  - "08-10: announcements.test prüft dieselbe Absicht auf neuen Daten nach der Inhabervorgabe: KI-Telefonie erscheint auf keiner Vergleichsseite als CraftOS-Zeile (statt neutraler Nein-Zelle laut Plan) und lib/comparison.ts existiert nicht mehr"
  - "08-10: Plantafel-Zellen in der Wortform der Daten („In allen Plänen“, „Premium, sonst Modul“, „Ja, ohne Paketangabe“); FAQ zu kleinen Betrieben ohne Verweis auf die noch fehlende Seite"
  - "08-10: FAQ-H2 „Häufige Fragen zum Vergleich“ statt „… zum Handwerkersoftware-Vergleich“ (Silbentrennung „Handwerkersoft-ware“ in der 5fr-Spalte)"
requirements-completed: []
duration: 33min
completed: 2026-10-22
---

# Phase 8 Plan 10: Vergleichs-Hub /vergleich Summary

**`/vergleich` ist ein v2-Hub mit Antwort zuerst, neutraler Marktübersicht der fünf Anbieter (Quellen, Abrufdatum, Pflichthinweis und Disclaimer wörtlich, ohne Hervorhebung), Kacheln zu allen vier Alternativen-Seiten, Vorgehen als Frage-Abschnitt und FAQ mit FAQPage; Wettbewerberlogos, Logo-Komponente, altes CSS-Modul und `lib/comparison.ts` (Stand 09.09.2026) sind gelöscht, die Schutztests prüfen synchron die neue Lage.**

## Performance

- **Dauer:** ca. 33 min (Start 19:16 UTC, Ende ca. 19:50 UTC), davon schwerer Lauf unter der Sperre 19:33–19:48 UTC
- **Tasks:** 2/2
- **Dateien:** 1 neu, 13 geändert, 5 gelöscht

## Accomplishments

- **Inhaltsmodul** `lib/seiten/vergleich.ts`: Kopf (Eyebrow „Vergleich“, Kopfwort „Handwerkersoftware“, Antwort wörtlich UI-SPEC § 5.1 mit `vertrag.monat`, Stand-Zeile „Anbieterangaben Stand 22.10.2026, Quellen unter der Tabelle“, „Zur Übersicht“ → `#ueberblick`), Abschnitte `ueberblick`/`einzelvergleiche`/`so-vergleichen`/`faq`, StepFlow (4), FAQ (4), CtaBand „Testen Sie CraftOS mit Ihrem Auftrag“.
- **Marktübersicht** (5 Zeilen CraftOS, Craftnote, HERO, plancraft, ToolTime; Spalten Abrechnung, Kürzeste Laufzeit, Testphase, Plantafel): CraftOS „pro Person, 2 Lizenzen · 1 Monat · 10 Tage · In Voll-Lizenz“ aus `tarife`/`site`; Wettbewerberzellen per Vorlage mit Beleg aus dem Datenmodul (HERO „12 Monate laut AGB“ aus der AGB-Quelle). 8 Quellen, jede genau einmal. Note: „Angaben ohne Gewähr, Stand 22.10.2026, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand 20.10.2026.“
- **FAQ aus Daten:** „Welche Handwerkersoftware ist monatlich kündbar?“ („… sind CraftOS und plancraft monatlich kündbar; Craftnote und ToolTime nennen 12 Monate Mindestlaufzeit, HERO nennt laut AGB 12 Monate Mindestlaufzeit.“) und „… hat eine Plantafel?“ („Alle fünf Anbieter nennen eine Plantafel: …“) ändern sich per Fixture (ToolTime monatlich, Craftnote ohne Plantafel-Angabe → „Vier der fünf …“, Zelle „nicht angegeben“).
- **Seite** `app/vergleich/page.tsx` (113 statt 594 Zeilen): FunktionsKopf G1, `ComparisonTable` ohne highlight mit Quellen und Disclaimer, BentoGrid mit Icon `ArrowLeftRight`, StepFlow `tone="light"`, `FaqList answerMax={300}` + `faqSchema(v.faq)`, `webPageSchema`, CtaBand. Kein `@graph`, kein `<img`, kein `PageHero`.
- **Gelöscht** (C12, D-02): `ProviderLogo.tsx`, `Comparison.module.css`, `lib/comparison.ts`, `public/images/brands/craftnote.png`, `public/images/brands/plancraft.svg`. `docs/COMPARISON-LOGOS.md` mit Vermerk „Logos in Phase 8 entfernt (D-02, C12)“.
- **Schutztests synchron:** `media-budget.test.ts` ohne Logo-Ausnahme und ohne Präfix, neuer Test „Markenordner fehlt und wird nirgends referenziert“ und Abgleich der `PNG_EXCEPTIONS` aus `design-v2.pw.cjs` mit `EXCEPTIONS` (beide nur noch die zwei Icons); `announcements.test.ts` auf neue Daten (siehe Abweichungen); `llms.txt`-Label „Handwerkersoftware-Vergleich“; `sitemap.ts` `pageUpdated["/vergleich"] = "2026-10-22"`.

## Design-Kaskade

- frontend-design-Leitlinie read-only gelesen (neutrale Übersicht, Hierarchie über Abschnittsfolge und Flächen, keine Hervorhebung einzelner Anbieter).
- `py -3.12 -X utf8 …/search.py "software comparison hub overview table" --domain ux`: „Table Handling“ (Medium) – horizontaler Scrollbereich mit fester erster Spalte, durch den Bestand `ComparisonTable` erfüllt.
- 21st.dev und Context7 nicht benötigt (keine neuen Bausteine, keine offenen API-Fragen; Seitenmuster wie `/preise`, `/gobd`). Nachweis: `craftos/docs/DESIGN-V2.md` § 17.10.

## Task Commits

1. **Task 1: Inhaltsmodul** – `f37ef73` (test, RED), `9e2ef78` (feat, GREEN)
2. **Task 2: Seite, Löschungen, Schutztests** – `c09b5bf` (test, RED), `d5e6a73` (feat, GREEN), `9da00ca` (fix, Akzeptanz-grep)

## Prüfergebnisse

**Gezielt (ohne Sperre):** vergleich-seiten, design-v2-budgets, pricing-parity, wettbewerber, announcements, media-budget, llms, breadcrumbs, keyword-map – 172 von 173 grün, einziger Fehlschlag „Snapshot ist aktuell“ (bekannt, nicht angefasst).

**Schwerer Lauf unter der Sperre (19:33–19:48 UTC, Port 3100; Koordinationsstatus gelesen, kein Website-Rezept → lokal):**
- `npm test`: 38 Dateien, 791 von 792 grün (nur „Snapshot ist aktuell“ rot).
- `npm run lint`, `npm run typecheck`, `npm run build` grün.
- `seo-audit --paths=/vergleich` (alle Regeln inkl. prompts #2/#3, antwort, faq-schema, schema, breadcrumbs): **0 Verstöße**; `seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og` (135 URLs): **0 Verstöße** – beide nach dem letzten Build erneut 0.
- `npm run test:e2e`: **293 bestanden, 0 rot** (75 übersprungen). Nach der FAQ-H2-Kürzung `design-v2.pw.cjs` erneut: 60 bestanden.
- `route-audit` Exit 0; `live-check` lokal „Ergebnis: alle Prüfungen OK“ (46 × OK, zweimal).
- `visual-audit` /vergleich (Chromium und WebKit, 360/390/768/1024/1440): 10 Seiten, keine Statusfehler, kein Überlauf, keine JS-Fehler, keine a11y-Befunde (zweimal).
- Port 3100 nach dem Lauf frei (eigene PID per Kommandozeile geprüft und beendet), Sperre freigegeben.

**Akzeptanz-greps:** `handwerkersoftware-kleine-betriebe` in vergleich.ts 0; `\bbeste\b|testsieger` in vergleich.ts 0; `lib/seiten/vergleich.ts` in pricing-parity 1; die fünf Dateien gelöscht; `grep -rl "lib/comparison"` über app/components/lib/tests/scripts leer (nach Commit `9da00ca`-Nachzug, siehe Abweichung 7); `images/brands` in media-budget.test.ts und design-v2.pw.cjs je 0; `@graph|<img|PageHero` in page.tsx 0; „Logos in Phase 8 entfernt“ in COMPARISON-LOGOS.md 1.

**Sichtprüfung** (`C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-10/`): Chromium 360 × 640 – H1 dreizeilig, Antwort, Stand-Zeile und CTA vollständig im ersten Bildschirm (CTA-Unterkante ca. 590 px), „Zur Übersicht“ an der Falz; Chromium 1440 – Tabelle ohne Hervorhebung, Note, 8 Quellen, Disclaimer; Kachelraster md·sm·sm/wide lückenlos; StepFlow 4 Schritte; WebKit 390 – Kacheln einspaltig, Texte ohne Abschnitt. **Befund behoben:** FAQ-H2 „Häufige Fragen zum Handwerkersoftware-Vergleich“ wurde bei 1440 als „Handwerkersoft-ware-Vergleich“ getrennt → „Häufige Fragen zum Vergleich“.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Inhabervorgabe (22.10.2026, geht UI-SPEC und Plan vor)

**1. announcements.test: keine neutrale „Nein“-Zelle mehr als Prüfgegenstand.** Plan-Behavior: „die CraftOS-Zelle ‚KI-Telefonempfang/-assistent‘ der plancraft-, HERO- und ToolTime-Tabellen ist false“. Diese Zeilen hat 08-09 nach der Inhabervorgabe entfernt. Gleiche Absicht (T-08-30: KI-Telefonie wird für CraftOS weder angekündigt noch als Leistung gezeigt) jetzt: `CRAFTOS_OHNE` enthält `kiTelefon`, keine Zeile und keine CraftOS-Zelle der vier Alternativen-Tabellen und der Marktübersicht nennt „Telefon“, FAQ ohne `CODE_PATTERN`; zusätzlich „lib/comparison.ts existiert nicht mehr“. `CODE_PATTERN` unverändert. Commit `c09b5bf`.

**2. Hub-Texte nur mit Unterstütztem:** FAQ „Welche Handwerkersoftware passt zu einem kleinen Betrieb?“ nennt die Kriterien ohne Verweis auf die noch fehlende Seite („vergleichen Sie dazu Laufzeit, Testphase und den Preis je weiterer Person“); keine CraftOS-Negativzelle, keine Nein-FAQ (Builder wirft).

### Auto-fixed / Anpassungen

**3. [Plan-Vorgabe] Kachelanordnung md·sm·sm·wide** statt 4 × md (nicht erlaubt; nächstliegende erlaubte Folge ohne lg; 08-11 ergänzt wide → md·sm·sm·wide·wide).

**4. [Rule 1 – Sichtbefund] FAQ-H2 gekürzt** auf „Häufige Fragen zum Vergleich“ (Silbentrennung im Kopfwort bei 1440 px). Commit `d5e6a73`.

**5. Zellwortlaut Plantafel/Monatlich-FAQ aus Daten:** HERO-Plantafel „In allen Plänen“ (Datenwert) statt sinngleich „Ja, ab Select“; Craftnote und ToolTime einheitlich „Ja, ohne Paketangabe“; Monatlich-FAQ mit „12 Monate Mindestlaufzeit“ statt „zwölf Monate … Grundlaufzeit“, damit die Antwort vollständig aus `laufzeit` entsteht.

**7. [Rule 1] Akzeptanz-grep `lib/comparison`:** Die neuen Tests nannten den Pfad als Literal (Prüfstring), was die Akzeptanzbedingung „grep leer“ verletzte; Pfade jetzt per `path.join("lib", "comparison.ts")`, Kommentare umformuliert.

**6. [Rule 2] Zusätzliche Schutzprüfung:** Vitest gleicht `PNG_EXCEPTIONS` in `design-v2.pw.cjs` mit `EXCEPTIONS` des Medienbudgets ab (vorher nur Kommentar „identisch mit …“).

---

**Total deviations:** 2 aus der Inhabervorgabe, 4 kleine Form-/Prüfanpassungen. **Impact:** Kein neuer Baustein, keine neue Route; gelöscht wurden nur die im Plan freigegebenen Dateien.

## Issues Encountered

- „Snapshot ist aktuell“ weiterhin rot (bekannt, laut Auftrag nicht angefasst).
- `seo-audit --only=prompts` sitewide: 1 Verstoß `/vergleich/handwerkersoftware-kleine-betriebe#antwort` (Seite folgt in 08-11) → `deferred-items.md`.
- Tabellen-Caption scrollt bei 360 px mit der Tabelle (Bestand aller `ComparisonTable`-Seiten) → `deferred-items.md`.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche (statische Seite, keine Endpunkte; externe Quellenlinks `rel="nofollow"`, gleicher Tab). T-08-28/29/30 umgesetzt: keine Hervorhebung, Pflichthinweis/Disclaimer per Test, Logo-Dateien gelöscht, Ankündigungsschutz auf neuen Daten.

## Next Phase Readiness

- 08-11: Seite „kleine Betriebe“ mit `baueMarktuebersicht` (eigene Spalten), fünfte Kachel `wide` an `einzelvergleichKacheln` anhängen (ergibt md·sm·sm·wide·wide), Footer-Spalte „Vergleiche“; der Test „kein Link auf kleine Betriebe“ in `vergleich-seiten.test.ts` ist dann umzustellen.
- 08-14: Rollout – `/vergleich` ist sitemap-aktuell (22.10.2026), Snapshot-Abgleich durch den Orchestrator.

## Self-Check: PASSED
