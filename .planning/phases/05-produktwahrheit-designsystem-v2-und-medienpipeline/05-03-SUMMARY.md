---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 03
subsystem: produktwahrheit
tags: [preise, snapshot, paritaetstest]
requires:
  - "05-02: productBasis auf origin/release, Faktenseite mit abgeleiteten Preisen"
provides:
  - "scripts/sync-product-snapshot.mjs mit npm sync:product und sync:product:check (nur origin/release, kein fetch)"
  - "docs/product-pricing-snapshot.json (Web v4.0.0-test.238 / 07cf0645, Mobile mobile-v1.0.0-test.93 / 5610a064)"
  - "tests/pricing-parity.test.ts (Lizenzen, Credits, llms, Schema, Literale, Testphase, Netto-Hinweis, Snapshot-Aktualität)"
  - "lib/site.ts: extraSpeicher, startCredits, produktlizenz je Tarif, zahlung.trial aus site.trialDays"
  - "/preise: Block KI-Credits und konkreter Extra-Speicher-Preis"
affects: [05-06, 05-08, phase-06, phase-07]
tech-stack:
  added: []
  patterns:
    - "Preis-Snapshot aus fremdem Repo per git show origin/release, eingecheckt und per Vitest gegen site.ts, llms.txt, Schema und Seiten geprüft"
    - "Testphasen-Scan über app/, components/, lib/, content/ mit Kontextfenster (Satz, 60 Zeichen) und Mindesttrefferzahl"
    - "Preise in JSX/Metadata/FAQ nur über Intl.NumberFormat aus tarife, extraSpeicher, creditPakete"
key-files:
  created:
    - craftos/scripts/sync-product-snapshot.mjs
    - craftos/docs/product-pricing-snapshot.json
    - craftos/tests/pricing-parity.test.ts
  modified:
    - craftos/package.json
    - craftos/lib/site.ts
    - craftos/lib/llms.ts
    - craftos/lib/schema.ts
    - craftos/components/home/Hero.tsx
    - craftos/app/preise/page.tsx
    - craftos/app/page.tsx
    - craftos/components/preise/PricingTable.tsx
    - craftos/tests/e2e/browser-functional.pw.cjs
decisions:
  - "Lizenznamen einheitlich „Voll-Lizenz“ (Produktlizenz Admin oder Büro) und „App-Lizenz“; PricingTable ersetzt sie nicht mehr durch „Volllizenz“/„Mobile Lizenz“"
  - "KI-Abrechnung wird als einmaliges Startguthaben (150 Credits) plus im Voraus gekaufte Pakete beschrieben; „nach Verbrauch abgerechnet“ entfällt"
  - "Schema-Offer trägt priceSpecification (UnitPriceSpecification) mit valueAddedTaxIncluded false"
  - "Snapshot-Skript liest zusätzlich Tag und Commit des Mobile-Repos (mobileSource), falls lokal vorhanden"
metrics:
  duration: "ca. 10 min"
  completed: "2026-10-20"
  tasks: 3
  files: 12
---

# Phase 5 Plan 03: Preiswahrheit mit Snapshot und Paritätstest – Summary

Preise, Lizenznamen, Netto-Hinweis, Testphase, Extra-Speicher und KI-Credits werden auf Startseite, Hero, /preise, PricingTable, in llms.txt und im Schema aus `lib/site.ts` abgeleitet. Ein Vitest gleicht diese Werte mit einem eingecheckten Snapshot von `src/lib/constants.ts`, `src/lib/subscription/pricing.ts` und `src/pages/AGB.tsx` aus `origin/release` der Web-App ab (v4.0.0-test.238, 07cf0645).

## Ergebnis

- **Snapshot:** `npm run sync:product` schreibt `docs/product-pricing-snapshot.json` mit `ref: origin/release`, 40-stelligem Commit und Tag. Enthalten sind 29,95/299,50 € (Admin = Büro), 9,95/99,50 € (App), 17 % Jahresrabatt, 150 einmalige Start-Credits, 50 GB Pool, 50 GB Extra-Speicher für 0,99 €/9,90 €, USt 0,19, vier Pakete 10/25/50/100 € mit 0/10/15/20 % Bonus, `trialDays: 10` und `netPrices: true`. Die Werte stimmen mit der Preis-Wahrheitstabelle der Recherche überein. `npm run sync:product:check` vergleicht nur den gespeicherten Commit mit `origin/release` und endet bei Abweichung mit Exitcode 1. Kein `git fetch`, kein Netz.
- **Paritätstest** (`tests/pricing-parity.test.ts`, 8 Fälle, alle grün): Lizenzen, Credits/Extra-Speicher/Testtage (inkl. Paketguthaben), llms.txt (Preise, „150 Credits“, „einmalig“, „im Voraus gekauft“, Pakete, „netto“, nicht „nach Verbrauch“), Schema (Preis und `valueAddedTaxIncluded: false`), Literal-Scan der sechs geprüften Dateien, Testphasen-Scan (9 Fundstellen, Mindestwert 5), Netto-Hinweis (llms-Faktenblock, „Alle Preise netto … Umsatzsteuer“ auf /preise, Snapshot) sowie „Snapshot ist aktuell“ (übersprungen ohne Web-Repo).
- **Mutationsprobe:** Ein testweise auf „14 Tage“ geänderter TrialCta ließ den Testphasen-Fall mit `components/ui/TrialCta.tsx:14: „14 Tage“ (erwartet 10 Tage)` scheitern; die Änderung wurde danach zurückgesetzt.
- **Seiten:** Hero („Ab 24,96 € netto / Monat …“, „Voll-Lizenz inklusive Mobile-App“), Startseite (Description und FAQ), /preise (Description, Jahresrabatt-FAQ mit 359,40/59,90/16,67 % berechnet, Rechenbeispiel 1 Voll + 4 App berechnet, Zusatzkosten-FAQ mit Extra-Speicher und Start-Credits) und PricingTable (Namen, Testtage, Ersparnis, Extra-Speicher-Zeile) enthalten keine Preisliterale mehr. Ein site-weiter Grep findet in `app/`, `components/`, `lib/` (außer `site.ts`) und `content/` keine Lizenzpreise oder alten Lizenznamen.
- **Prüfungen:** `npm run sync:product:check` grün; die gesamte lokale Vitest-Suite läuft grün (147 Tests in 12 Dateien); `npm run typecheck` und `npm run lint` grün. E2E wurde nicht ausgeführt, weil Docker-E2E als schwerer Lauf über die Koordination in Plan 05-08 läuft. Die Selektoren in `browser-functional.pw.cjs` sind auf „Voll-Lizenz“/„App-Lizenz“ umgestellt, die Preiswerte (24,96/29,95/9,95) bleiben.

## Design-Kaskade /preise

- **frontend-design:** Das Skill-Tool steht Subagenten nicht zur Verfügung. Deshalb wurde die offizielle Leitlinie gelesen (`claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md`, nur gelesen, nichts übernommen). Die Vorgabe lautete: bestehende Preisseite, kein Redesign (D-03), nur ein kompakter Block im vorhandenen Stil. Umgesetzt wurde das nach 05-UI-SPEC („Werkbank-Präzision“, KeyFacts-Muster): flach, ohne Schatten, Verlauf oder Karten. Die Pakete stehen in einem Raster aus 1-px-Linien `ink-200` (`gap-px` auf `bg-ink-200`, `border-y`), die Beträge in `tabular-nums`. Es gibt keine Eyebrow, keine Pfeile, keine Animation und keine Nummerierung. Semantisch ist der Block eine `section` mit `aria-labelledby` und `h2`, die Paketliste ein `ul`, und der Netto-Hinweis steht direkt darunter.
- **ui-ux-pro-max:** `search.py "saas pricing credits add-on" --domain ux` lieferte keine Treffer. Ersatzweise brachte `"pricing table list" --domain ux` die Regel „Tabellen auf Mobil ohne Überlauf, Kartenlayout statt breiter Tabelle“; sie ist übernommen (2 × 2 unter 768 px, 4 Spalten ab 768 px). `"pricing" --domain landing` (Muster „Pricing Page + CTA“, Karten mit Schatten, farbige Tarife) wurde nicht übernommen: Die Marke ist gesperrt, und laut UI-SPEC tragen nur Geräterahmen Schatten.
- **21st.dev:** `21st_magic_component_inspiration` ist in dieser Agentenumgebung nicht verfügbar und wurde daher nicht aufgerufen. Builder- und Refiner-Werkzeuge wurden nicht verwendet.
- **Sichtprüfung:** Lokaler Next-Dev-Server mit Playwright-Screenshots des Blocks bei 390 und 1440 px: kein horizontaler Überlauf, 2 × 2 bzw. 4 Spalten, Hinweiszeile lesbar. Der Dev-Server wurde danach beendet.
- Plan 05-06 überträgt diesen Vermerk in DESIGN-V2.md (Plan 05-04).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Testname kollidierte mit dem -t-Filter**
- **Found during:** Task 1
- **Issue:** Fall 2 hieß zunächst „Credits, Extra-Speicher, Testphase …“ und wurde deshalb von `-t "…|Testphase|…"` mit ausgewählt; dadurch wäre die Task-1-Verifikation trotz korrekter Fälle 6–8 rot gewesen.
- **Fix:** Umbenannt in „Credits, Extra-Speicher, Testtage und Netto-Kennzeichen“.
- **Files modified:** craftos/tests/pricing-parity.test.ts
- **Commit:** 9d556a7

**2. [Rule 2 - Ergänzung] Weitere Ableitungen über die Literal-Liste hinaus**
- `zahlung.trial` in site.ts, die Testtage in Hero/PricingTable/Startseite/FAQ und die Ersparnisangaben („rund 17 %“) werden jetzt aus `site.trialDays` bzw. `annualSavingPercent` abgeleitet. Der Testphasen-Scan zählt diese Stellen als korrekte Template-Treffer.
- Der Paritätstest prüft zusätzlich `creditPakete.guthaben = amount + bonus`.
- Das Snapshot-Skript schreibt den Snapshot relativ zum Skriptordner (unabhängig vom Arbeitsverzeichnis) und meldet ein fehlendes Web-Repo mit deutscher Fehlermeldung.
- **Commits:** a48e72f, 5ceaf2c

**3. Lizenzrolle als Feld statt Freitext**
- Statt einer Beschreibung erhält jeder Tarif in `tarife` das Feld `produktlizenz` („Admin oder Büro“ bzw. „App“). llms.txt und der Schema-Offer-Name verwenden es („Voll-Lizenz (Admin oder Büro)“).

## Known Stubs

Keine.

## Hinweise für Folgepläne

- `app/vergleich/page.tsx:80` spricht noch allgemein von „zusätzlicher Speicher kann weitere Kosten verursachen“. Das widerspricht dem Produkt nicht, ist aber weniger konkret als /preise. Für Plan 05-06/05-08 (Erweiterung des Literal-Scans, Vergleichsseite) vorgemerkt.
- Plan 05-08 nimmt `app/fakten-ueber-craftos/page.tsx` und weitere Seiten in den Literal-Scan auf; die Dateiliste steht in Fall „Literale“.

## Requirement-Status

PROD-03 ist als erledigt markiert. 05-02 lieferte die Faktenseite, dieser Plan alle übrigen Preisstellen, llms.txt, das Schema und den automatischen Abgleich. Nach einem site-weiten Grep enthalten `app/`, `components/`, `content/` und `lib/` außer `site.ts` keine Preisliterale mehr. DESIGN-02 und SEO-02 bleiben unberührt.

## Self-Check: PASSED

- FOUND: craftos/scripts/sync-product-snapshot.mjs, craftos/docs/product-pricing-snapshot.json, craftos/tests/pricing-parity.test.ts
- FOUND: Commits 9d556a7, a48e72f, 5ceaf2c
