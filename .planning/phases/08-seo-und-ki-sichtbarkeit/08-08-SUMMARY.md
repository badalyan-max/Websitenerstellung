---
phase: 08-seo-und-ki-sichtbarkeit
plan: 08
subsystem: alternativen-seiten
tags: [alternativen, plancraft, craftnote, uwg, comparison-table, faqpage, d-01, d-03]
requires:
  - phase: 08-03
    provides: FunktionsKopf G1, SectionHeader G2, FaqList answerMax, ComparisonTable-Quellen G3, FitPanels G4
  - phase: 08-04
    provides: Zielwerte der Alternativen in keyword-map.json, metaFor/zielwerte
  - phase: 08-05
    provides: lib/og.tsx pageOg, ogTitel, Segmentbild als metaFor-Standard
  - phase: 08-06
    provides: lib/wettbewerber (plancraft, craftnote, monatAusJahr, quellenFuer, standVon, UWG_WORTLISTE, pruefeWettbewerber)
provides:
  - components/vergleich/AlternativePage.tsx – Vorlage der vier Alternativen-Seiten (sync RSC, UI-SPEC § 3.1)
  - lib/seiten/alternativen/types.ts – AlternativeInhalt, Kontext, Seitenmodul, SeitenTexte (clientneutral)
  - lib/seiten/alternativen/index.ts – alternativeAusModul (prüfend), baueAlternative(slug), Registrierung plancraft/craftnote
  - Seitenmodule plancraft.ts, craftnote.ts; Routen /vergleich/{plancraft,craftnote}-alternative mit OG-Bild
affects: [08-09, 08-10, 08-11, 08-14]
tech-stack:
  added: []
  patterns:
    - "Seitenmodul = Funktion (Kontext) → SeitenTexte; Zahlen nur über Kontext (CraftOS aus site.ts, Wettbewerber aus lib/wettbewerber)"
    - "Pflichthinweis, Rechenweg-Note, Disclaimer, Panels, Umstieg-Schritte 2–4, FAQ-Lead und CTA setzt nur der Builder"
    - "Quellenliste = Quellen aller Tabellenzeilen und Kosten-Belege, in Reihenfolge von quellenFuer(w), je URL einmal"
key-files:
  created:
    - craftos/lib/seiten/alternativen/types.ts
    - craftos/lib/seiten/alternativen/index.ts
    - craftos/lib/seiten/alternativen/plancraft.ts
    - craftos/lib/seiten/alternativen/craftnote.ts
    - craftos/components/vergleich/AlternativePage.tsx
    - craftos/app/vergleich/plancraft-alternative/page.tsx
    - craftos/app/vergleich/plancraft-alternative/opengraph-image.tsx
    - craftos/app/vergleich/craftnote-alternative/page.tsx
    - craftos/app/vergleich/craftnote-alternative/opengraph-image.tsx
    - craftos/tests/vergleich-seiten.test.ts
  modified:
    - craftos/app/sitemap.ts
    - craftos/lib/llms.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/DESIGN-V2.md
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/llms.test.ts
    - craftos/tests/design-v2-budgets.test.ts
key-decisions:
  - "08-08: Builder-Einstieg für Fixtures heißt alternativeAusModul(w, seitenmodul, path); baueAlternative(slug) bleibt die einzige exportierte baueAlternative-Funktion (Akzeptanz-grep = 1)"
  - "08-08: F1-Hinweis „rechnerisch, auf Cent gerundet“ für die Tabelle als Satz in der Tabellen-Note („CraftOS-Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet.“) statt in der Zeilenbeschriftung – „Weitere mobile Person, Jahresabo je Monat, rechnerisch“ hätte 54 > 48 Zeichen"
  - "08-08: Panel „Wann CraftOS passt“: plancraft = pro Person, Plantafel, GAEB/DATEV; Craftnote = pro Person, monatlich kündbar, GAEB/DATEV"
  - "08-08: CraftOS-Kriterienzellen zentral in CRAFTOS_KRITERIEN (index.ts); Kriterien ohne belegte CraftOS-Angabe (lexware) werfen statt eine Nein-Zelle zu erfinden"
  - "08-08: Kosten-Noten mit „Extra-Speicher“ (Begriffsentscheidung 08-07); Craftnote-Note wörtlich laut UI-SPEC, Fahrzeug-Modul-Preis per Vorlage"
requirements-completed: []
duration: 52min
completed: 2026-10-22
---

# Phase 8 Plan 08: plancraft- und Craftnote-Alternative Summary

**Prüfende Alternativen-Vorlage (`AlternativePage` + Builder `baueAlternative`) nach UI-SPEC § 3.1 und die veröffentlichungsfertigen Seiten `/vergleich/plancraft-alternative` und `/vergleich/craftnote-alternative`: belegte Vergleichstabelle mit Quellenliste und Disclaimer, Rechenbeispiel 58,13 €/69,75 € gegen 179,40 €/224,40 € (plancraft) bzw. 109,50 €/129,50 € (Craftnote), gleichrangige Passt-Panels, Umstieg, FAQ mit FAQPage, eigenes OG-Bild, Sitemap, llms.txt und Map-Status „bestehend“.**

## Performance

- **Dauer:** ca. 52 min (Start 17:29 UTC, inklusive rund 12 min Wartezeit auf die zentrale Sperre)
- **Tasks:** 2/2
- **Dateien:** 10 neu, 9 geändert (plus `deferred-items.md`)

## Accomplishments

- **Builder** (`lib/seiten/alternativen/index.ts`): setzt CraftOS-Werte ausschließlich aus `lib/site.ts` (`euro`, `monatAusJahr`, `craftosRechenbeispiel`, `vertrag`, `site.trialDays`, `annualSavingPercent`) und Wettbewerberwerte per Vorlage aus `lib/wettbewerber`. Wirft bei Zellen > 24, Beschriftung > 48, > 12 Zeilen, Zeile ohne Quelle oder mit Quelle außerhalb des Datenmoduls, fehlender Fairnesszeile (Wettbewerber ✓ / CraftOS –), < 2 Stärken, UWG-Wort in irgendeinem Seitentext, Antworten > 300 und Kopfwort außerhalb der H1; ruft zusätzlich `pruefeWettbewerber` und `alterWarnung`.
- **Pflichttexte nur im Builder:** Tabellen-Note „Angaben ohne Gewähr, Stand {standVon}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand {site.checkedAt}. CraftOS-Monatswerte rechnerisch …“; Kosten-Note nach § 3.4 mit „Die Pakete unterscheiden sich im Funktionsumfang.“ und „Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet.“; Disclaimer wörtlich; Umstieg-Antwort und Schritte 2–4; FAQ-Lead; CTA „Testen Sie CraftOS mit Ihrem Auftrag“.
- **Vorlage** (`components/vergleich/AlternativePage.tsx`): synchron, ohne Client-Insel, ohne `<img>`; Abschnitte `vergleich`/`kosten`/`fuer-wen`/`umstieg`/`faq` als `section data-abschnitt aria-labelledby` mit H2-`id` = Abschnitts-id; Kopf über `FunktionsKopf` ohne Visual (Brotkrumen mit BreadcrumbList, `#antwort`, Stand-Zeile, „Zur Vergleichstabelle“ → `#vergleich`); FAQPage aus demselben Array; WebPage-Schema; kein Product/Review/AggregateRating.
- **Seiten:** plancraft (11 Zeilen, Fairnesszeile KI-Telefonempfang), Craftnote (10 Zeilen, Fairnesszeile Fahrzeugortung per GPS); Texte laut UI-SPEC § 3.6, alle Zahlen per Vorlage (Akzeptanz-grep `[0-9]+ Tage|[0-9]+,[0-9]{2} €` je 0).
- **Im selben Commit wie die Routen (Pitfall 12):** `keyword-map.json` Status `bestehend` (2), `KEYWORD-MAP.md` (Zeilen verschoben, Änderungshinweis), `app/sitemap.ts` (`pages` + `pageUpdated` 2026-10-22), `lib/llms.ts` (zwei Links ohne Wettbewerberzahlen), OG-Dateien nach dem 08-05-Muster (`pageOg`, `ogTitel`, Seitentyp „Vergleich“).
- `docs/DESIGN-V2.md` § 17.6: Kaskade und Aufbau der Vorlage.

## Design-Kaskade

- frontend-design-Leitlinie read-only gelesen (nichts kopiert): einziger betonter Ort ist die CraftOS-Spalte; Quellen und Stand sind Inhalt, keine Dekoration.
- `py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas comparison alternative page pricing" --domain ux`: Image Optimization (nicht betroffen, keine Bilder), Active State (erfüllt über `aria-current` der Brotkrumen).
- 21st.dev und Context7 standen nicht zur Verfügung (vermerkt); Ersatz `craftos/node_modules/next/dist/docs`, keine offenen API-Fragen.

## Task Commits

1. **Task 1: Inhalts-Builder, Vorlage, Vorlagentests** – `0e7592b` (test, RED), `24549db` (feat, GREEN)
2. **Task 2: plancraft- und Craftnote-Seite, Routen, OG, Sitemap, llms.txt, Map-Status** – `ca00bd5` (test, RED), `ac46ab9` (feat, GREEN)

Merges in den Spur-Branch: `d068f2a` (08-04-Stand `67dfac0`), `a76148b` (main mit 08-05), `9a5298f` (main mit DATANORM-Korrektur `2b6cc2f`).

## Prüfergebnisse

**Lauf 1 (vor dem DATANORM-Merge, unter der Sperre 18:00–18:12 UTC, Port 3103):**
- `npm test`: 36 Dateien, 695 von 696 grün; einziger Fehlschlag „Snapshot ist aktuell“ (extern, siehe unten).
- `npm run build`: grün. `seo-audit --paths=/vergleich/plancraft-alternative,/vergleich/craftnote-alternative`: 0 Verstöße (alle Regeln inkl. og, antwort, prompts, schema, faq-schema, breadcrumbs). `seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og`: 0 Verstöße.
- `npm run test:e2e` (gegen 3103): 289 bestanden, 4 rot – ausschließlich bekannte WebKit-Zeitflakes auf Bestandsseiten (3 × `function-illustrations.pw.cjs:443` webkit-1440, 1 × `home-navigation.pw.cjs:501` webkit-390-touch).
- `route-audit`: Exit 0. `live-check` lokal: „Ergebnis: alle Prüfungen OK“.
- `visual-audit` (beide Pfade, Chromium und WebKit, 360/390/768/1440): 16 Seiten, keine Statusfehler, kein Überlauf, keine JS-Fehler, keine a11y-Befunde.

**Lauf 2 (nach `git merge main` mit 2b6cc2f, 18:15–18:18 UTC):**
- `npm test`: 695 von 697 grün; rot: „Snapshot ist aktuell“ (extern) und `content.test.ts` Zeitüberschreitung 5 s unter Last – einzeln grün (`content`, `vergleich-seiten`, `funktionsdetails`: 108/108).
- Build grün, beide seo-audits 0 Verstöße, route-audit Exit 0, live-check alle OK.
- E2E-Einzelwiederholung: `function-illustrations.pw.cjs:443` webkit-1440 8/8 grün; `home-navigation.pw.cjs:501` webkit-390-touch erneut rot (875 statt 0 Übergänge, `/funktionen`, bekanntes `tab-size`-Muster) → `deferred-items.md`.
- `npm run typecheck` grün, `npm run lint` „No issues found“ (nach Entfernen des generierten, ignorierten Playwright-HTML-Berichts).
- Port 3103 nach beiden Läufen frei; Sperre jeweils freigegeben.

**Akzeptanz-greps:** `export function baueAlternative` = 1; `"use client"` = 0; `async function` = 0; `Product|AggregateRating|<img` in der Vorlage = 0; `lib/seiten/alternativen/index.ts` in pricing-parity ≥ 1; `plancraft-alternative`/`craftnote-alternative` in sitemap.ts je 2, in llms.ts je 1; keyword-map `bestehend` = 2; beide OG-Dateien vorhanden; Zahlenliterale in den Seitenmodulen 0.

**Sichtprüfung** (Screenshots: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-08/`): Chromium 360 – Kopfwort ohne Überlauf, H1 3 Zeilen, Antwort und CTA oberhalb 640 px (CTA-Unterkante ca. 590 px); WebKit 390 Craftnote – H1 3 Zeilen, CTA im ersten Bildschirm, Tabelle im Bestands-Scrollbereich mit Wischhinweis; Chromium 1440 – Tabelle mit CraftOS-Hervorhebung, Note, Quellenliste (3 Einträge) und Disclaimer, KeyFacts in einer Reihe, Panels gleich breit und identisch gestaltet. Kein Befund zu beheben.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 – Blocking] Merge-Reihenfolge: zuerst nur der abgeschlossene 08-04-Stand**
- **Found during:** Start
- **Issue:** Beim Start lag auf main 08-05 nur halb (Tests und erster feat-Commit, SUMMARY fehlte).
- **Fix:** Zuerst `67dfac0` (08-04 abgeschlossen) gemergt, nach dem Erscheinen der 08-05-SUMMARY `git merge main`; Endstand identisch mit dem Auftrag.
- **Commit:** `d068f2a`, `a76148b`

**2. [Rule 3 – Blocking] keyword-map.json vor dem Merge kurz zurückgesetzt**
- **Issue:** main (08-05) änderte `keyword-map.json`; der Merge verweigerte sich wegen der lokalen Statusänderung.
- **Fix:** Nur diese Datei zurückgesetzt (`git checkout -- <datei>`), main gemergt, die zwei Statuswechsel neu eingetragen. Kein `git stash`.

**3. [Rule 2] F1-Hinweis in der Tabellen-Note statt in der Zeilenbeschriftung** (siehe key-decisions; Budget 48).

**4. [Rule 2] Panel-Quellen-Label** „{Anbieter}: {Label}“, damit der versteckte Linktext den Anbieter nennt.

**5. Zusätzliche Testabdeckung:** Die beiden Seiten stehen auch in `PHASE6_SEITEN` (`keyword-map.test.ts`, gerenderte H1 = `target.h1`) und im Antwort-zuerst-Sammeltest (`design-v2-budgets.test.ts`, 27 Seiten); `pricing-parity` prüft Builder und Vorlage auf Preisliterale.

---

**Total deviations:** 5 (2 blocking, 2 kleine Korrektheitsergänzungen, 1 zusätzliche Abdeckung). **Impact:** Kein Mehrumfang an Seiten oder Daten.

## Issues Encountered

- **Produkt-Snapshot veraltet (nicht angefasst):** `pricing-parity.test.ts` „Snapshot ist aktuell“ rot – `origin/release` des Web-Repos `a9319e5…`, Snapshot `1e9c8bc…`. Laut Auftrag nur gemeldet, Snapshot nicht aktualisiert.
- **Inhaber-Vorgabe DATANORM (22.10.):** Die Alternativen-Seiten erwähnen DATANORM nicht; keine CraftOS-Negativaussage zu Formaten oder Versionen. Die neutralen „Nein“-Zellen „KI-Telefonempfang“ (plancraft) und „Fahrzeugortung per GPS“ (Craftnote) sowie die FAQ „Kann ich mit CraftOS Fahrzeuge orten? – Nein …“ sind Funktionszeilen, die UI-SPEC U6 als Fairnesszeile verlangt (Wettbewerber bietet etwas, das CraftOS nicht anbietet); sie sind keine Format-/Versionsliste. Falls die Vorgabe auch diese Funktionszeilen erfassen soll, bitte entscheiden – die Builder-Pflicht U6 müsste dann angepasst werden.
- Wartezeit auf die zentrale Sperre (08-07 in wt-08b) für Lauf 1.

## Geteilte Dateien (für den Merge)

- `craftos/app/sitemap.ts`: zwei Einträge in `pageUpdated`, zwei Pfade in `pages` nach `/vergleich`.
- `craftos/lib/llms.ts`: zwei Links im Abschnitt „Preise und Vergleich“ nach dem `/vergleich`-Link.
- `craftos/docs/seo/keyword-map.json`, `craftos/docs/seo/KEYWORD-MAP.md` (Tabellen „Kernseiten“ 20 / „Geplante Seiten“ 12, Änderungshinweis am Ende).
- `craftos/tests/pricing-parity.test.ts`: zwei Dateien am Ende der Literal-Liste (08-07 ändert in derselben Liste `app/preise`/`PricingTable` – beide Seiten erhalten).
- `craftos/tests/keyword-map.test.ts`: `PHASE6_SEITEN` um zwei Einträge; Statusschleife getrennt (plancraft/craftnote bestehend, hero/tooltime geplant).
- `craftos/tests/design-v2-budgets.test.ts`: Sammeltest um zwei Seiten (Zahl 25 → 27; kommt 08-07 mit `/preise` dazu, Zahl entsprechend erhöhen).
- `craftos/tests/llms.test.ts`: ein neuer Fall.
- `craftos/docs/DESIGN-V2.md`: neuer Abschnitt § 17.6 am Ende (§ 17.5 frei für 08-07).
- `.planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md`: Abschnitt „Aus 08-08“.

## Known Stubs

Keine. `baueAlternative("hero" | "tooltime")` wirft bewusst „kein Seitenmodul registriert“, bis 08-09 die Module einträgt.

## Threat Flags

Keine neue Angriffsfläche (statische Seiten, keine Endpunkte; externe Links nur `rel="nofollow"` auf Herstellerquellen).

## Next Phase Readiness

- 08-09 (HERO, ToolTime): Seitenmodul nach dem Muster `plancraft.ts` schreiben und in `SEITEN` registrieren; `kosten.zusatz` nimmt den P4-Satz für ToolTime auf; für HERO Variante A gelten `heroPreise`. Kriterium `lexware` braucht vorher eine belegte CraftOS-Zelle oder bleibt aus der Tabelle.
- 08-10/08-11: Verlinkung von `/vergleich` und Footer.

## Self-Check: PASSED

Alle zehn neu angelegten Dateien vorhanden; Commits 0e7592b, 24549db, ca00bd5, ac46ab9 im Branch phase08-spur-d gefunden.
