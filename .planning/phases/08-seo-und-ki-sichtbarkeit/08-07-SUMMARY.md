---
phase: 08-seo-und-ki-sichtbarkeit
plan: 07
subsystem: preisseite
tags: [preise, answer-first, preistabelle, marktspanne, faqpage, d-05, d-12, d-16]
requires:
  - phase: 08-03
    provides: FunktionsKopf mit answer/stand, SectionHeader-Frage-Leads, FaqList answerMax, ComparisonTable mit Quellen und Disclaimer
  - phase: 08-04
    provides: metaFor/zielwerte aus der Keyword-Map
  - phase: 08-05
    provides: OG-Bild je Seite (app/preise/opengraph-image.tsx, per Merge aus main)
  - phase: 08-06
    provides: lib/wettbewerber (Preise mit Quelle/Abrufdatum, monatAusJahr, quellenFuer, standVon, heroVariante A, UWG-Prüfung), vertrag
provides:
  - lib/seiten/preise.ts – PREISE_SECTION_IDS, PREISE_SURFACES, preiseKopf, preiseSections, lizenzTabelle, appLizenzKacheln, zusatzkostenFakten, marktspanne (inkl. spanne), preiseFaq
  - app/preise/page.tsx – Preisseite answer-first aus v2-Bausteinen mit BreadcrumbList, FAQPage und WebPage
  - tests/preise-seite.test.ts – Inhalts-, Budget-, Wortlisten-, Quelltext- und Renderprüfung
affects: [08-08, 08-09, 08-10, 08-11, 08-14]
tech-stack:
  added: []
  patterns:
    - "Seiteninhalte zentraler Seiten in lib/seiten/<seite>.ts, Seite rendert nur Bausteine; UWG-Prüfung aller Texte beim Laden des Moduls"
    - "Wettbewerberbeträge in Anbieterschreibweise aus Cent (ganze Euro ohne Nachkommastellen), CraftOS-Beträge immer mit Cent über euro()"
key-files:
  created:
    - craftos/lib/seiten/preise.ts
    - craftos/tests/preise-seite.test.ts
  modified:
    - craftos/app/preise/page.tsx
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/e2e/browser-functional.pw.cjs
    - craftos/scripts/performance-audit.mjs
    - craftos/app/sitemap.ts
    - craftos/docs/DESIGN-V2.md
  deleted:
    - craftos/components/preise/PricingTable.tsx
    - craftos/components/preise/PricingTable.module.css
key-decisions:
  - "08-07: Begriff sitewide „Extra-Speicher“ (PROD-03, site.ts, llms.txt, live-check); UI-SPEC-Stellen mit „Zusatzspeicher“ so umgesetzt"
  - "08-07: Lizenztabellen-Note ohne zahlung.jahresrabatt, weil dessen „günstiger als“ auf der UWG-Wortliste steht; stattdessen „Jährliches Abo: rund {annualSavingPercent} % weniger als 12 Monatszahlungen“"
  - "08-07: Credit-Umrechnung in KeyFacts-Note (Craft AI und KI-Belegscans (creditUmrechnung)) und FAQ „Was kosten Credit-Pakete?“ (einmalig startCredits Credits (creditUmrechnung)) statt doppelt in einem Satz; FAQPage trägt damit die Umrechnung"
  - "08-07: App-Lizenz-Raster lg, sm, sm, md wie /app; „Aufmaß vor Ort“ als kleine Kachel mit Icon Ruler (Text unverändert), sonst bliebe ab 1024 px eine Lücke"
requirements-completed: []
duration: 49min
completed: 2026-10-22
---

# Phase 8 Plan 07: /preise answer-first Summary

**Die Preisseite beginnt unter der H1 „Preise der Handwerkersoftware CraftOS“ mit einem Antwortsatz aus `tarife` (#antwort, 220 Zeichen) und der echten Preistabelle. Danach folgen App-Lizenz, Zusatzkosten, eine belegte Marktspanne (29,95 € bis 89 €, HERO Variante A) und eine FAQ mit 6 Fragen samt FAQPage. Alles ist aus v2-Bausteinen gebaut, PricingTable ist gelöscht.**

## Performance

- **Dauer:** 49 min (17:34–18:23 UTC, inklusive Wartezeiten auf die zentrale Sperre)
- **Tasks:** 2/2
- **Dateien:** 2 neu, 7 geändert, 2 gelöscht

## Accomplishments

- `lib/seiten/preise.ts`: Seitenvertrag nach 08-UI-SPEC § 4. Abschnitte `lizenzen`, `app-lizenz`, `zusatzkosten`, `was-kostet-handwerkersoftware`, `faq`; Flächen dunkel → Weiß → Warm → Weiß → Warm → Weiß → dunkel. Alle Werte stammen aus `tarife`/`site`/`format`/`monatAusJahr`, Wettbewerberwerte per Vorlage aus `lib/wettbewerber`. Es gibt kein Preis-, Tages- oder Euro-Literal im Quelltext.
- Lizenztabelle mit 12 Zeilen (Jahresabo je Monat rechnerisch 24,96 € bzw. 8,29 €); Note beginnt mit „Alle Preise netto zzgl. Umsatzsteuer, pro Person.“
- Marktspanne mit 5 Zeilen (CraftOS, Craftnote, HERO, plancraft, ToolTime) ohne Hervorhebung. Craftnote „nicht angegeben“ bzw. „49,90 € statt 69,90 €“, HERO „ab 79 €“/„ab 69 €“ (Variante A), ToolTime „69 € (1. Vertragsjahr)“. Dazu Pflichthinweis, Pakethinweis, Quellenliste aus `quellenFuer(w, ["preise"])` und Disclaimer. Die Spanne im Antwortsatz zählt nur Zeilen mit belegtem Monatspreis.
- `app/preise/page.tsx`: `FunktionsKopf` ohne Visual, `ComparisonTable` ×2, `BentoGrid`, `KeyFacts`, `FaqList answerMax={300}`, `CtaBand` („Alle Funktionen ansehen“ → /funktionen). JSON-LD: BreadcrumbList (Baustein), `faqSchema(preiseFaq)` und `webPageSchema`.
- Paritätstest auf `lib/seiten/preise.ts` umgestellt (Vorlagen, Literal-Liste, Netto/Umsatzsteuer, `faqSchema(preiseFaq)`); Sammeltest in `design-v2-budgets` um /preise ergänzt.
- E2E-Fall /preise prüft `#antwort` und die Lizenztabelle gegen `docs/product-pricing-snapshot.json`. Der Umschalter-Sonderfall im Performance-Audit ist entfernt; `visual-audit.mjs` hatte keinen Sonderfall. Sitemap: `/preise` → 2026-10-22.
- DESIGN-V2 § 17.5 mit Kaskadennachweis.

## Task Commits

1. **Task 1: Inhaltsmodul und Paritätstests:** `5bb0743` (test, RED), `991f070` (feat, GREEN)
2. **Task 2: Seite, JSON-LD, E2E/Audit:** `c0635cd` (test, RED), `4b98a38` (feat, GREEN), `613c585` (fix, E2E-Regex)
3. **Doku:** `19607d6` (DESIGN-V2 § 17.5, deferred-items)
4. Merges aus main: `4be57f6` (08-04), `73ce0d2` (08-05), `56acaa3` (DATANORM-Hotfix 2b6cc2f)

## Prüfergebnisse (Stand nach Merge von main inkl. 08-05 und DATANORM-Hotfix)

- Gezielt: preise-seite, pricing-parity, design-v2-budgets, wettbewerber, announcements sind grün; nur „Snapshot ist aktuell“ ist rot (extern, siehe unten).
- `npm test` (unter Sperre): 36 Dateien, 692/694 grün. Rot sind „Snapshot ist aktuell“ (extern) und `content.test.ts` (Zeitlimit 5 s unter Last, einzeln 10/10 grün; deferred).
- `npm run typecheck` grün, `npm run lint` grün, `npm run build` grün.
- `seo-audit --paths=/preise` (alle 12 Regeln, 1 URL): 0 Verstöße, inklusive antwort und prompts für `#app-lizenz` und `#was-kostet-handwerkersoftware`.
- `seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og` sitewide (131 URLs): 0 Verstöße. 08-05 ist enthalten, die og-Prüfung ist also aussagekräftig.
- `npm run test:e2e` (voller Lauf, Port 3101): 288 bestanden, 75 übersprungen, 5 rot. Davon waren 4 der neue /preise-Fall: ein Fehler im eigenen Test (`\s` in einem per Skript geschriebenen Template-Literal verloren), behoben in `613c585`. Einzelwiederholung nach dem Fix: 4/4 grün. Der 5. Fehler ist `home-navigation.pw.cjs:501` webkit-390-touch (/funktionen, bekannte `tab-size`-Animationen); er ist auch einzeln rot und als deferred eingetragen.
- `route-audit` gegen 3101: 131 Routen, 0 Fehler, 0 kaputte Links. `live-check` gegen 3101: „alle Prüfungen OK“, inklusive „/preise nennt Extra-Speicher und Start-Credits“.
- `visual-audit` (/preise, Chromium und WebKit 360/390/768/1024/1440): kein Statusfehler, kein Überlauf, keine JS-Fehler, keine axe-Befunde.
- Akzeptanz-greps: `PageHero|PricingTable|TrialCta|components/ui/Faq` in page.tsx 0; `faqSchema(` 1; `lib/seiten/preise.ts` in pricing-parity 3, `components/preise/PricingTable.tsx` 0; Preisliterale/„Zusatzspeicher“ in preise.ts 0. „Zusatzspeicher“ steht in app/components/lib außerhalb von Kommentaren 0-mal.

## Sichtprüfung

Screenshots: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-07/` (`chromium-360-preise.png`, `chromium-1440-preise.png`, `webkit-390-preise.png` sowie Ausschnitte `c360-fold.png`, `c360-tabelle.png`, `c1440-b.png`, `c1440-c.png`, `w390-markt.png`). Bei 360 × 640 sind Antwort und CTA ohne Scrollen sichtbar. Beide Tabellen scrollen unter 768 px nur im eigenen Bereich. Die Quellenliste ist lesbar, das Bento-Raster ab 1024 px lückenlos. Bei 1440 px trennt die H2 der Marktspanne „Handwer-kersoftware“ per Silbentrennung (Bausteinverhalten von SectionHeader, keine Änderung).

## Decisions Made

Siehe `key-decisions`. Kaskade: frontend-design read-only, `ui-ux-pro-max "pricing page answer table saas" --domain ux` (Table Handling übernommen); 21st.dev und Context7 standen nicht zur Verfügung.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Konflikt Plan/UWG] Jahresrabatt-Note ohne `zahlung.jahresrabatt`**
- **Found during:** Task 1
- **Issue:** Der Plan verlangt `zahlung.jahresrabatt` in der Note, dessen Text („rund 17 % günstiger als 12 Monatszahlungen“) enthält aber „günstiger als“ von der UWG-Wortliste. Das widerspricht der Behavior-Regel „alle Texte ohne Wort der UWG_WORTLISTE“.
- **Fix:** Die Note nutzt eine eigene Vorlage aus `annualSavingPercent` („weniger als“), wie die FAQ der UI-SPEC. `lib/site.ts` bleibt unverändert (llms.txt nutzt den Satz weiter).
- **Commit:** `991f070`

**2. [Auslegung] Credit-Umrechnung auf Note und FAQ verteilt**
- Beide Vorlagen des Paritätstests stehen im Modul, aber nicht doppelt im selben Satz. Die FAQ „Was kosten Credit-Pakete?“ endet deshalb mit „einmalig 150 Credits (entspricht 1,50 €; 1 Credit = 0,01 €)“, eine minimale Ergänzung gegenüber dem UI-SPEC-Wortlaut.

**3. [Rule 1 – Bug] E2E-Regex**
- Beim skriptgestützten Einfügen ging im Template-Literal ein Backslash verloren (`\s` → `s`). Behoben; außerdem prüfen Beträge im Fließtext jetzt ohne Teiltreffer (9,95 in 29,95) und Zellen als ganzer Inhalt. Commit `613c585`.

**4. [Rule 3] Port 3101 statt 3100** laut Auftrag (Parallelbetrieb); `seo-audit --paths=/preise` mit `MSYS_NO_PATHCONV=1`, weil Git Bash `/preise` sonst in einen Windows-Pfad umschreibt (der erste Lauf prüfte 0 URLs und wurde wiederholt).

**5. [Auftrag Koordinator] DATANORM-Vorgabe:** /preise enthält keine DATANORM-Aussage. Der Hotfix `2b6cc2f` wurde vor dem letzten Prüflauf per `git merge main` übernommen.

---

**Total deviations:** 5 (2 Bugs/Konflikte, 1 Auslegung, 1 Umgebung, 1 Koordinatorvorgabe). **Impact:** keine Ausweitung des Umfangs.

## Issues Encountered

- `pricing-parity.test.ts` „Snapshot ist aktuell“ ist weiter rot: `origin/release` des Web-Repos steht auf `a9319e5…`, der Snapshot auf `1e9c8bc…`. Bekannt (08-03/08-06); der Snapshot wurde laut Auftrag **nicht** aktualisiert, das übernimmt der Orchestrator vor dem Rollout.
- Wartezeiten auf die zentrale Sperre (08-12, DATANORM-Hotfix).

## Geteilte Dateien (für den Merge)

- `craftos/tests/pricing-parity.test.ts`: Credit-Vorlagen auf `lib/seiten/preise.ts`, `faqSchema(preiseFaq)`; Literal-Liste ersetzt `components/preise/PricingTable.tsx` durch `lib/seiten/preise.ts`; Netto-Prüfung liest `lib/seiten/preise.ts` + `app/preise/page.tsx`.
- `craftos/tests/design-v2-budgets.test.ts`: neuer describe-Block „Preisseite /preise im Budget (Phase 8)“ am Dateiende (bestehender Sammeltest mit 25 Seiten unverändert).
- `craftos/app/sitemap.ts`: nur `pageUpdated["/preise"]` auf 2026-10-22.
- `craftos/docs/DESIGN-V2.md`: neuer Abschnitt § 17.5 am Dateiende.
- `.planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md`: Abschnitt „Aus 08-07“ am Ende.
- `craftos/tests/e2e/browser-functional.pw.cjs`, `craftos/scripts/performance-audit.mjs`: nur der /preise-Fall.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. Externe Quellenlinks sind nur https mit `rel="nofollow"` (Baustein G3); T-08-19 bis T-08-21 sind wie geplant mitigiert.

## Self-Check: PASSED

Dateien `craftos/lib/seiten/preise.ts`, `craftos/app/preise/page.tsx` und `craftos/tests/preise-seite.test.ts` sind vorhanden; Commits 5bb0743, 991f070, c0635cd, 4b98a38, 613c585 und 19607d6 liegen im Branch phase08-spur-b.
