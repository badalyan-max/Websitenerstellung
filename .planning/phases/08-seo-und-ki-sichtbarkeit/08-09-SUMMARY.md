---
phase: 08-seo-und-ki-sichtbarkeit
plan: 09
subsystem: alternativen-seiten
tags: [alternativen, hero, tooltime, d-16, uwg, faqpage, inhaber-22-10]
requires:
  - phase: 08-06
    provides: lib/wettbewerber (hero, tooltime, heroVariante, heroPreise, Screenshot-Beleg)
  - phase: 08-08
    provides: AlternativePage, Builder alternativeAusModul/baueAlternative, Muster plancraft/craftnote
provides:
  - lib/seiten/alternativen/hero.ts – HERO-Seiteninhalt, Variante A/B per heroVariante
  - lib/seiten/alternativen/tooltime.ts – ToolTime-Seiteninhalt mit Erstjahr-/„regulär derzeit“-Regel
  - Routen /vergleich/{hero,tooltime}-alternative mit OG-Bild; alle vier Alternativen in Sitemap, llms.txt und Map (bestehend)
  - Builder-Regel „Nur, was unterstützt wird“ (Inhaber 22.10.2026) statt Pflicht-Fairnesszeile U6
affects: [08-10, 08-11, 08-14]
tech-stack:
  added: []
  patterns:
    - "Builder wirft bei verneinter CraftOS-Zelle, Kriterien aus CRAFTOS_OHNE, Nein-FAQ zu CraftOS-Funktionen und Negativsätzen"
    - "Fairness nur positiv über belegte Wettbewerber-Stärken im Panel „Wann {Name} passt“"
    - "Wettbewerberpreise in Anbieterschreibweise ganzer Euro über Kontext.euroKurz"
key-files:
  created:
    - craftos/lib/seiten/alternativen/hero.ts
    - craftos/lib/seiten/alternativen/tooltime.ts
    - craftos/app/vergleich/hero-alternative/page.tsx
    - craftos/app/vergleich/hero-alternative/opengraph-image.tsx
    - craftos/app/vergleich/tooltime-alternative/page.tsx
    - craftos/app/vergleich/tooltime-alternative/opengraph-image.tsx
  modified:
    - craftos/lib/seiten/alternativen/index.ts
    - craftos/lib/seiten/alternativen/types.ts
    - craftos/lib/seiten/alternativen/plancraft.ts
    - craftos/lib/seiten/alternativen/craftnote.ts
    - craftos/lib/wettbewerber/index.ts
    - craftos/scripts/lib/seo-audit-core.mjs
    - craftos/app/sitemap.ts
    - craftos/lib/llms.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/DESIGN-V2.md
    - craftos/tests/vergleich-seiten.test.ts
    - craftos/tests/wettbewerber.test.ts
    - craftos/tests/design-v2-budgets.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/tests/llms.test.ts
    - craftos/tests/seo-audit-core.test.ts
    - craftos/tests/content.test.ts
    - .planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md
key-decisions:
  - "08-09: Inhabervorgabe 22.10.2026 „Nur, was unterstützt wird, nicht, was nicht unterstützt wird“ geht UI-SPEC U6 vor: keine CraftOS-Negativzeile, keine Nein-FAQ zu CraftOS-Funktionen; Fairness nur über belegte Stärken des Wettbewerbers (DESIGN-V2.md § 17.6)"
  - "08-09: Rückwirkend entfallen plancraft „KI-Telefonempfang“, Craftnote „Fahrzeugortung per GPS“ und FAQ „Kann ich mit CraftOS Fahrzeuge orten?“; neu ohne „KI-Telefonassistent“ bei HERO und ToolTime"
  - "08-09: pruefeWettbewerber verlangt kein Kriterium mehr, das CraftOS nicht anbietet; CRAFTOS_OHNE bleibt als Sperrliste für Vergleichszeilen"
  - "08-09: HERO rendert Variante A (Screenshot-Beleg vorhanden): „ab“-Preise mit Zahlweise, Rechenbeispiel Select + 4 App-Lizenzen (ab 157 €/ab 179 €); Variante B per Fixture getestet (keine HERO-Zahl, „laut hero-software.de“, KeyFacts nur CraftOS)"
  - "08-09: Wettbewerberpreise in ganzer-Euro-Schreibweise des Anbieters („69 €“) über Kontext.euroKurz; „Erweiterung, 19 €/Monat“ passt so ins Zellbudget 24"
  - "08-09: seo-audit plain() entfernt Inline-Tags ohne Leerzeichen (wie der Browser), sonst meldete der Audit die HERO-H1 als „HERO-Software -Alternative“"
requirements-completed: []
duration: 85min
completed: 2026-10-22
---

# Phase 8 Plan 09: HERO- und ToolTime-Alternative Summary

**`/vergleich/hero-alternative` (Variante A laut Screenshot-Beleg, B per Fixture abgesichert) und `/vergleich/tooltime-alternative` (Jahresabo nur „1. Jahr“, spätere Preise nur „regulär derzeit“) mit derselben Vorlage wie 08-08; dazu die Inhaberregel „Nur, was unterstützt wird“ im Builder, rückwirkend auf plancraft und Craftnote angewandt. Alle vier Alternativen stehen in Sitemap, llms.txt und Keyword-Map (bestehend).**

## Performance

- **Dauer:** ca. 85 min (Start ca. 17:45 UTC, Ende ca. 19:15 UTC), davon schwerer Lauf 18:53–19:06 UTC und Einzelwiederholung bis 19:12 UTC
- **Tasks:** 2/2 plus Inhaberregel und Zeitlimit-Auftrag
- **Dateien:** 6 neu, 19 geändert

## Accomplishments

- **Inhaberregel (Abweichung von U6, Quelle: Inhaber 22.10.2026):** Der Builder (`lib/seiten/alternativen/index.ts`) wirft bei einer verneinten CraftOS-Zelle (`false`, „Nein“, Strich, „nicht …“), bei Kriterien aus `CRAFTOS_OHNE` (`kiTelefon`, `fahrzeugortung`), bei einer FAQ-Funktionsfrage zu CraftOS mit „Nein“-Antwort und bei Sätzen wie „CraftOS bietet kein …“/„nicht verfügbar“. Die Pflicht-Fairnesszeile entfällt; die Stärken-Pflicht (≥ 2 belegte Punkte) bleibt. Rückwirkend: plancraft 10 statt 11 Zeilen, Craftnote 9 statt 10 Zeilen und 4 statt 5 FAQ. Vermerkt in `docs/DESIGN-V2.md` § 17.6.
- **HERO** (`hero.ts`): H1 aus der Map mit Kopfwort „HERO-Software“; Variante A mit Tabelle (10 Zeilen: drei Preiszeilen „ab 79 € (Select)“, „ab 69 € (Select)“, „22 € (App-Lizenz)“, Grundlaufzeit „12 Monate laut AGB“, Testphase, Mobile-App, Plantafel „Ja, ab Select“, „E-Rechnung erstellen“, Zeiterfassung, Lager „ab HERO OS“), Rechenbeispiel ab 157 €/ab 179 €, FAQ (4). Variante B (Fixture): 8 Zeilen mit „laut hero-software.de“, KeyFacts nur CraftOS (58,13 €, 69,75 €, Voll- und App-Lizenz pro Monat), keine HERO-Zahl in Text oder Zelle. Kein „Empfangen“ von E-Rechnungen.
- **ToolTime** (`tooltime.ts`): 10 Zeilen (Abrechnung, Preis je Person monatlich „34 € (Team-Paket)“ und Jahresabo „29 € (Team, 1. Jahr)“, Laufzeit, Testphase, Mobile-App, Plantafel, E-Rechnung, DATEV „Erweiterung, 19 €/Monat“, GAEB); Kosten-Antwort „145 € … im ersten Vertragsjahr, regulär derzeit 149 €“, Note mit P4-Satz „… Preise späterer Jahre sind nicht zugesagt.“; FAQ (4) mit „regulär derzeit“. Das Modul wirft, wenn ein Paket ohne `ersterJahrespreis`/`regulaerDerzeitCents` vorliegt.
- **Routen und Verbreitung (Pitfall 12, ein Commit):** zwei Routen mit OG-Bild nach 08-05/08-08-Muster, `app/sitemap.ts` (pages + pageUpdated), `lib/llms.ts` (zwei Links ohne Wettbewerberzahlen), `keyword-map.json` und `KEYWORD-MAP.md` (Zeilen in „Kernseiten“ 22, „Geplante Seiten“ 10, Änderungshinweis).
- **`tests/content.test.ts`:** „has valid categories, source metadata and feature links“ mit Zeitlimit 60 s (wie 08-04).
- **Audit-Korrektur:** `scripts/lib/seo-audit-core.mjs` `plain()` trennt an Inline-Tags keine Wörter mehr.

## Design-Kaskade

Dieselbe Vorlage und Kaskade wie 08-08 (DESIGN-V2.md § 17.6); kein neuer Baustein, keine neue Fläche. 21st.dev und Context7 wurden nicht benötigt (keine offenen API-Fragen; statische Routen nach vorhandenem Muster).

## Task Commits

0. **Zeitlimit content-Test** – `1e1cbb6` (test)
1. **Inhaberregel „Nur, was unterstützt wird“** – `7e2f31d` (test, RED), `ccae3b0` (fix, GREEN)
2. **Task 1: Inhaltsmodule HERO (A/B) und ToolTime** – `0a3fb83` (test, RED), `e840a9f` (feat, GREEN)
3. **Task 2: Routen, OG, Sitemap, llms.txt, Map-Status** – `82fe86d` (test, RED), `5ec90a8` (feat, GREEN)
4. **Audit-Korrektur Inline-Tags** – `a0b6826` (test, RED), `bb776c8` (fix, GREEN)
5. **Doku** – `fe6a0ae` (DESIGN-V2 § 17.6, deferred-items)

Merge in den Spur-Branch: `git merge main` (Fast-Forward auf `d016dee`, enthält 08-07, 08-08 und den DATANORM-Hotfix).

## Prüfergebnisse

**Lauf unter der zentralen Sperre (18:53–19:06 UTC, Port 3103; Koordinationsstatus gelesen, kein Website-Rezept → lokal):**
- `npm test`: 37 Dateien, 727 von 728 grün; einziger Fehlschlag „Snapshot ist aktuell“ (bekannt, nicht angefasst). Der content-Test lief mit dem neuen Zeitlimit grün.
- `npm run lint` grün (nach Entfernen des generierten, ignorierten Playwright-Berichts `tests/e2e/reports/`), `npm run typecheck` grün, `npm run build` grün.
- `seo-audit --paths=` (vier Alternativen, alle Regeln inkl. map, og, antwort, prompts, faq-schema, schema, breadcrumbs): im Lauf 1 Verstoß (HERO-H1 durch Audit-Fehler bei Inline-Span) → nach `bb776c8` **0 Verstöße**; `seo-audit --only=title,description,h1,duplikate,map,breadcrumbs,og` (135 URLs): **0 Verstöße**. Prompt-Ziele #4, #9, #10 erfüllt (Regel prompts 0 auf den Alternativen).
- `npm run test:e2e`: 291 bestanden, 2 rot (bekannte WebKit-Zeitflakes auf Bestandsseiten: `function-illustrations.pw.cjs:476` webkit-1440, `home-navigation.pw.cjs:501` webkit-390-touch); Einzelwiederholung 3/3 bzw. 1/1 grün.
- `route-audit` Exit 0; `live-check` lokal „Ergebnis: alle Prüfungen OK“.
- `visual-audit` (vier Alternativen, Chromium und WebKit, 360/390/768/1024/1440): 40 Seiten, keine Statusfehler, kein Überlauf, keine JS-Fehler, keine a11y-Befunde.
- Port 3103 nach Lauf und Wiederholung frei; Sperre jeweils freigegeben.

**Gezielt (ohne Sperre):** vergleich-seiten, design-v2-budgets (29 Seiten), wettbewerber, pricing-parity, llms, keyword-map, seo-meta, seo-audit-core – alle grün außer „Snapshot ist aktuell“.

**Akzeptanz-greps:** `heroVariante` in hero.ts 3; `empfangen` in hero.ts 0; `ab Jahr 2|danach [0-9]` in tooltime.ts 0; „nicht zugesagt“ in tooltime.ts; `[0-9]+ Tage|[0-9]+,[0-9]{2} €` in hero.ts/tooltime.ts je 0; keyword-map `bestehend` für die vier Alternativen = 4; `hero-alternative|tooltime-alternative` in sitemap.ts 4, in llms.ts 2; OG-Dateien vorhanden.

**Sichtprüfung** (Screenshots: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-09/`): Chromium 360 HERO – H1 „Die HERO-Software-/Alternative im Vergleich“ in zwei Zeilen ohne Überlauf, Kopfwort-Span nicht gebrochen, CTA-Unterkante ca. 560 px; Chromium 1024 HERO – H1 zweizeilig, Antwort und CTA im ersten Bildschirm; WebKit 390 HERO – wie Chromium 360; Chromium 360 ToolTime – H1 zweizeilig, Tabelle im Bestands-Scrollbereich mit Wischhinweis; Chromium 1440 HERO/ToolTime – Tabellen mit CraftOS-Hervorhebung, ohne Negativzeile, Note, Quellenliste (je 3 Einträge) und Disclaimer, KeyFacts in einer Reihe, Panels gleich breit. Kein Befund zu beheben.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Inhabervorgabe

**1. Abweichung von UI-SPEC U6 (Quelle: Inhaber 22.10.2026)** – Plan und UI-SPEC verlangten ≥ 1 Zeile „Wettbewerber ✓ / CraftOS –“ und für HERO/ToolTime die Zeile „KI-Telefonassistent: –“. Nach der Inhabervorgabe entfallen diese Zeilen (auch rückwirkend bei plancraft und Craftnote) und die Craftnote-FAQ zur Fahrzeugortung; der Builder setzt die neue Regel durch. Commits `7e2f31d`, `ccae3b0`; DESIGN-V2.md § 17.6.

### Auto-fixed Issues

**2. [Rule 1 – Bug] seo-audit setzte an Inline-Tags ein Leerzeichen**
- **Found during:** Task 2 (Lauf)
- **Issue:** `plain()` ersetzte jedes Tag durch ein Leerzeichen; die H1 „Die <span>HERO-Software</span>-Alternative im Vergleich“ wurde als „HERO-Software -Alternative“ gelesen (Map-Verstoß), obwohl der Browser sie ohne Leerzeichen zeigt.
- **Fix:** Inline-Tags ohne Leerzeichen entfernen, andere Tags weiter als Trenner; Test in `seo-audit-core.test.ts`.
- **Files modified:** `craftos/scripts/lib/seo-audit-core.mjs`, `craftos/tests/seo-audit-core.test.ts`
- **Commit:** `a0b6826`, `bb776c8`

**3. [Rule 2] Anbieterschreibweise ganzer Euro** – `euro()` liefert „69,00 €“; UI-SPEC nennt „ab 69 €“, und „Erweiterung, 19,00 €/Monat“ hätte 26 > 24 Zeichen. Neuer Kontext-Helfer `euroKurz` im Builder (CraftOS-Werte unverändert über `euro`).

**4. [Rule 2] KeyFacts nur mit CraftOS-Werten für HERO Variante B** – `SeitenTexte.kosten.craftosLizenzen` lässt den Builder die Voll- und App-Lizenz pro Monat ergänzen, damit CraftOS-Werte weiterhin nur der Builder aus `lib/site.ts` setzt.

**5. Tabellenumfang** – HERO 10 Zeilen (A) bzw. 8 (B), ToolTime 10 statt 11 Zeilen (ohne KI-Telefonassistent, Inhabervorgabe). DATEV bei ToolTime als „DATEV-Export“ mit CraftOS-✓ aus der zentralen Kriterienliste statt Freitext „Export inklusive“.

---

**Total deviations:** 1 Inhabervorgabe, 1 Bugfix (Audit), 3 kleine Korrektheits-/Formanpassungen. **Impact:** Keine neuen Seiten außer den geplanten; Audit-Korrektur verbessert auch live-check (gleicher Parser).

## Issues Encountered

- **Produkt-Snapshot veraltet** („Snapshot ist aktuell“ rot), laut Auftrag nicht angefasst.
- **Voller seo-audit ohne Filter** meldet Bestandsverstöße auf `/gobd`, `/vergleich`, `/fakten-ueber-craftos` und `/vergleich/handwerkersoftware-kleine-betriebe` (Gegenstand anderer Pläne) → `deferred-items.md`.
- Ein Hilfsbefehl (Heredoc-Ersetzung) schrieb ein Backspace-Zeichen statt `\b` in eine Regex; vor dem Commit erkannt und korrigiert.

## Geteilte Dateien (für den Merge)

- `craftos/app/sitemap.ts`: zwei Einträge in `pageUpdated`, zwei Pfade in `pages` nach Craftnote (Spur C ändert dieselbe Datei).
- `craftos/lib/llms.ts`: zwei Links nach dem Craftnote-Link im Abschnitt „Preise und Vergleich“.
- `craftos/docs/DESIGN-V2.md`: zwei Absätze am Ende von § 17.6 (Spur C ergänzt eigene Abschnitte).
- `craftos/tests/design-v2-budgets.test.ts`: Alternativen-Liste um hero/tooltime, Zahl 27 → 29 (Spur C ergänzt ebenfalls Seiten; Zahl beim Merge addieren).
- `craftos/tests/keyword-map.test.ts`: `PHASE6_SEITEN` +2, Statusschleife für alle vier.
- `craftos/docs/seo/keyword-map.json`, `craftos/docs/seo/KEYWORD-MAP.md` (Tabellen 22/10, Änderungshinweis am Ende).
- `craftos/lib/wettbewerber/index.ts` (U6-Datenprüfung entfernt, Kommentar zu `CRAFTOS_OHNE`), `craftos/scripts/lib/seo-audit-core.mjs` (`plain()`), `craftos/tests/content.test.ts`, `craftos/tests/wettbewerber.test.ts`, `craftos/tests/seo-audit-core.test.ts`, `craftos/tests/llms.test.ts`.
- `.planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md`: Abschnitt „Aus 08-09“.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche (statische Seiten, keine Endpunkte; externe Quellenlinks `rel="nofollow"`).

## Next Phase Readiness

- 08-10/08-11: Verlinkung von `/vergleich` (Bento „Einzelvergleiche“) und Footer auf alle vier Alternativen; die Inhaberregel gilt sinngemäß für die Marktübersicht unter `/vergleich` (keine CraftOS-„Nein“-Zellen).
- 08-14: Vor dem Rollout die HERO-Variante (Screenshot-Beleg, Datum 22.10.2026) und die Alterswarnung (60 Tage) beachten.

## Self-Check: PASSED

Sechs neue Dateien vorhanden; Commits 1e1cbb6, 7e2f31d, ccae3b0, 0a3fb83, e840a9f, 82fe86d, 5ec90a8, a0b6826, bb776c8, fe6a0ae im Branch phase08-spur-d gefunden.
