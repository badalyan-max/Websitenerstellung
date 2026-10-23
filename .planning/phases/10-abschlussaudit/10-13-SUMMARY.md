---
phase: 10-abschlussaudit
plan: 13
subsystem: produktwahrheit-credits
tags: [paket-d, credits, lagerfoto-ki, paritaetstest, produktwahrheit]
requirements-completed: []

requires:
  - phase: 10-abschlussaudit
    provides: "10-04 (Paket d, Teil 1): Kassenbuch und § 13b, Schutztests; Release-Basis Web bfe165e9, Mobile 837aab4f"
provides:
  - "lib/site.ts: lagerfotoCredits ([{ ab: null, max: 2 }, { ab: \"2027-01-01\", max: 3 }]), lagerfotoCreditsAm(datum), lagerfotoCreditsText mit Belegkommentar aiPricing.ts und Migration 20261009200000"
  - "tests/credit-paritaet.test.ts: Stufen, Stichtagsfunktion, Anzeige auf /craft-ai (gerendert und FAQPage) und im Hilfeartikel, Release-Suite gegen aiPricing.ts und die SQL-Migration am Release-Commit"
  - "/craft-ai: FAQ „Welche KI-Funktionen umfasst Craft AI?“ nennt den Verbrauch der Foto-Erkennung je Foto, Werte per Import aus lib/site.ts"
  - "Hilfeartikel lager-scan-app: ein beauftragter Satz zu den Credits je Foto (K-6)"
affects: [10-06, paket-d-merge]

tech-stack:
  added: []
  patterns:
    - "Datierte Produktwerte als Stufenliste mit Kalendertag (ab: null für den Ausgangswert), Abfrage über lagerfotoCreditsAm(datum)"
    - "Paritätstest liest Tarif und SQL-Stichtag am Release-Commit aus productBasis und verlangt 00:00 UTC als Stichtag"

key-files:
  created:
    - craftos/tests/credit-paritaet.test.ts
  modified:
    - craftos/lib/site.ts
    - craftos/lib/seiten/craft-ai.ts
    - craftos/content/hilfe/lager-scan-app.md

key-decisions:
  - "Anzeige auf /craft-ai in der bestehenden FAQ-Antwort zur Foto-Erkennung statt einer vierten FAQ-Frage: tests/kernseiten.test.ts legt die drei Fragen fest, die Antwort bleibt mit 261 Zeichen im Budget von 300"
  - "Text „bis zu 2 Credits, ab dem 1. Januar 2027 bis zu 3 Credits“ entsteht in lib/site.ts aus den Stufen (lagerfotoCreditsText); der Test formatiert das Datum unabhängig und vergleicht"
  - "Pflichtmodus mit CRAFTOS_REQUIRE_RELEASE=1, weil tests/release-repos.ts die Umgebungsvariable RELEASE_PFLICHT nicht auswertet"

duration: ca. 30 min
completed: 2026-10-23
---

# Phase 10 Plan 13: Lagerfoto-Credits mit Stichtag, Paritätstest und Anzeige – Summary

**Der Höchstpreis der Foto-Erkennung im Lager steht datiert in `lib/site.ts` (bis zu 2 Credits, ab dem 1. Januar 2027 bis zu 3 Credits), ist durch `tests/credit-paritaet.test.ts` gegen `aiPricing.ts` und die SQL-Migration am Web-Release-Commit abgesichert und erscheint auf `/craft-ai` und im Hilfeartikel `lager-scan-app`.**

## Release-Belege (lesend, Web `bfe165e90335e4224c8a3539c7a61b59edb34428` = productBasis.web = `origin/release`)

| Aussage | Beleg |
|---|---|
| Höchstpreis 2 Credits, ab 01.01.2027 3 Credits | `supabase/functions/_shared/aiPricing.ts` Z. 501–509, Eintrag `'analyze-inventory-photo'`, `label: 'Inventurfoto'`; Z. 506: `tariff: { kind: 'fixed', maxCredits: 2, steps: [{ from: '2027-01-01T00:00:00Z', maxCredits: 3 }] }`; Kommentar Z. 503–505 (Preisverdopplung der Flash-Modelle zum 01.01.2027) |
| Stichtag auch in SQL | `supabase/migrations/20261009200000_inventory_photo_dated_price.sql` Z. 2–4 und Z. 70: `v_max integer:=case when now()>=timestamptz ''2027-01-01 00:00:00+00'' then 3 else 2 end;` |
| Nicht verwechseln | `'analyze-goods-receipt'` ist `cost_plus` ohne festen Wert (aiPricing.ts Z. 439–442) |
| Aufruf in der Mobile-App (Mobile `837aab4f5c1d…` = productBasis.mobile) | `src/features/inventory/hooks/useAnalyzeInventoryPhoto.ts` Z. 18 (`supabase.functions.invoke('analyze-inventory-photo', …)`); Knopf „Foto mit KI erkennen“ in `src/features/inventory/screens/InventoryDraftScreen.tsx` Z. 161 |

**Live-Prüfung (für Kunden erreichbar):** Die Route `inventory/new/:draftId` steht in `src/AppRoot.tsx` Z. 146 ohne `RequireLicense`- oder Flag-Hülle. Im Mobile-Release kommt `isDeveloper` unter `src/` gar nicht vor, und unter `src/features/inventory` gibt es keine Flag-Bedingung. Der Knopf ist nur an `isOnline` und den Bearbeitungsstand gebunden (`disabled={!isOnline || frozen}`).

## Umsetzung

- **`lib/site.ts`:**
  - `lagerfotoCredits = [{ ab: null, max: 2 }, { ab: "2027-01-01", max: 3 }] as const`.
  - `lagerfotoCreditsAm(datum)` wertet den UTC-Kalendertag aus: 2 am 2026-12-31, 3 am 2027-01-01.
  - `lagerfotoCreditsText` ergibt „bis zu 2 Credits, ab dem 1. Januar 2027 bis zu 3 Credits“.
  - Der Belegkommentar nennt `web:supabase/functions/_shared/aiPricing.ts`, `'analyze-inventory-photo'` und die Migration `20261009200000`.
- **`/craft-ai` (`lib/seiten/craft-ai.ts`):**
  - Die FAQ-Antwort „Welche KI-Funktionen umfasst Craft AI?“ endet jetzt mit „Die Foto-Erkennung verbraucht je Foto ${lagerfotoCreditsText}.“ und hat 263 von 300 Zeichen.
  - Die Antwort erscheint dadurch auch im FAQPage-Schema.
  - Der Belegkommentar im Kopf ist ergänzt.
  - Im Quelltext stehen keine Credit-Literale.
- **Hilfeartikel `content/hilfe/lager-scan-app.md`:**
  - Genau ein Satz ist neu, direkt nach „Die App nennt den Verbrauch vor dem Start.“: „Je Foto fallen bis zu 2 Credits an, ab dem 1. Januar 2027 bis zu 3 Credits.“
  - Der Diff gegen `main` umfasst 1 Einfügung und 1 Löschung (dieselbe Zeile).
  - `updatedAt` stand schon auf dem Ausführungsdatum `2026-10-23` und blieb deshalb unverändert.
- **`tests/credit-paritaet.test.ts`, 10 Fälle in drei Gruppen:**
  - **Werte in `lib/site.ts`:** Stufen, Stichtagsfunktion, Text und Belegkommentar.
  - **Anzeige:** Import statt Literal in `craft-ai.ts`; gerenderte Seite und FAQPage-JSON-LD mit dem Text; der Satz im Hilfeartikel genau einmal mit „1. Januar 2027“.
  - **Release-Suite „Lagerfoto-Credits am Release-Commit“ über `releaseSuite`, `pruefeReleaseStand` und `releaseDatei`:** Tarif und Stufen aus `aiPricing.ts` müssen gleich `lagerfotoCredits` sein, der Stichtag muss auf 00:00 UTC liegen, und die SQL-Migration muss denselben Höchstwert datieren.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| RED `credit-paritaet.test.ts` | rot (Import `lagerfotoCredits` fehlt), Commit `63e6929` |
| GREEN: `credit-paritaet`, `nur-unterstuetzt`, `content-produktwahrheit`, `pricing-parity`, `kernseiten`, `design-v2-budgets` | 6 Dateien, **403/403 grün** |
| `npm run typecheck`, `npm run lint` | jeweils Exit 0 (ESLint ohne Befund) |
| `node scripts/content-pruefen.mjs --l1 --antwort content/hilfe/lager-scan-app.md` | 0 Befunde, 0 Hinweise |
| Akzeptanz-Greps | `aiPricing.ts` in `site.ts`: 1 · `lagerfotoCredits` in `craft-ai.ts`: 3 · „1. Januar 2027“ im Hilfeartikel: 1 |
| **Pflichtmodus unter Sperre** (`RELEASE_PFLICHT=1 CRAFTOS_REQUIRE_RELEASE=1`): `credit-paritaet` und `content.test.ts` | 2 Dateien, **51/51 grün**, kein Skip. Zusätzlich einzeln mit `--reporter=verbose`: 10/10 grün; alle drei Fälle der Release-Suite liefen, ihr Titel ohne „ÜBERSPRUNGEN“. |
| **Vollsuite unter Sperre** `--exclude tests/product-register.test.ts` | 45 Dateien, **1366 grün, 1 Zeitüberschreitung**: `content-produktwahrheit.test.ts` Z. 213 (ME-03 „Bauunternehmen nennt die Online-Unterschrift …“, 5000 ms beim ersten `await import("@/lib/gewerke")` unter Volllast). Sie ist bekannt, besteht auch auf `main` (Vergleichslauf in 10-04) und gehört zu 10-06. Hier wurde sie nicht behoben, die Datei ist einzeln grün (oben). |
| `tests/product-register.test.ts` getrennt | **rot bis Merge (b), K-1**: 1 rot, 10 grün, ausschließlich „expected … to have a length of 8 but got 10“ |
| `npm run build` unter Sperre | grün (Exit 0) |
| `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs --paths=/craft-ai,/hilfe/lager-scan-app` | **0 Verstöße**, Exit 0 |
| Sperre | geholt 11:41:36 UTC (nach Warten auf 10-08), freigegeben 11:43:09 UTC |
| Server/Prozesse | Es wurde kein Server gestartet, `seo-audit` liest `.next` ohne Server. Port 3104 ist frei, und aus `wt-10d` läuft kein Prozess mehr. |

## Commits

| Commit | Inhalt |
|---|---|
| `63e6929` | test(10-13): Paritätstest Lagerfoto-Credits gegen Release (RED, D-22) |
| `7a60fd8` | feat(10-13): Lagerfoto-Credits mit Stichtag und Paritätstest (D-22) |

Aufgabe 2 brauchte keine Korrektur, deshalb gibt es keinen `fix(10-13)`-Commit.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Planfehler] Pflichtmodus-Variable**
- **Found during:** Aufgabe 2
- **Issue:** Der Plan setzt `RELEASE_PFLICHT=1` als Umgebungsvariable. `tests/release-repos.ts` wertet aber nur `CI=true` oder `CRAFTOS_REQUIRE_RELEASE=1` aus; `RELEASE_PFLICHT` ist dort nur der Name der exportierten Konstante.
- **Fix:** Der Lauf setzte beide Variablen. Die Release-Suite lief ohne Skip, belegt durch den Verbose-Lauf. Am Helfer wurde nichts geändert.

**2. [Rule 3 - Blocking] Ort der Anzeige auf /craft-ai**
- **Issue:** `tests/kernseiten.test.ts` legt die drei FAQ-Fragen fest, und es gibt keine eigene Frage zur Foto-Erkennung.
- **Fix:** Der Satz steht in der bestehenden Antwort zur Foto-Erkennung, im Budget und ohne Verneinung. Der Plan erlaubt dafür ausdrücklich „FAQ-Antwort bzw. Abschnitt“.

### Sonstiges
- `updatedAt` des Hilfeartikels war schon `2026-10-23`, das Ausführungsdatum. Deshalb gibt es dort keine zweite Änderung.
- STATE.md, ROADMAP.md und `.planning/config.json` sind nicht angefasst; kein Merge, kein Push. Gelöscht wurde nichts.

## Übergabeliste

| Punkt | Besitzer | Inhalt |
|---|---|---|
| Sitemap-Änderungsdatum `/craft-ai` (K-15) | **10-06** (`app/sitemap.ts`) | Für `/craft-ai` als `lastModified` 2026-10-23 setzen (FAQ-Antwort ergänzt). `/hilfe/lager-scan-app` hat `updatedAt` 2026-10-23 bereits im Frontmatter. |
| live-check-Prüfpunkt „Lagerfoto-Credits“ | **10-06 / Rollout** | Auf `/craft-ai` (FAQ „Welche KI-Funktionen umfasst Craft AI?“ und FAQPage-JSON-LD) und auf `/hilfe/lager-scan-app` (Abschnitt „Neuen Lagerbestand erfassen“) stehen die Werte aus `lib/site.ts`: „bis zu 2 Credits“, „ab dem 1. Januar 2027 bis zu 3 Credits“. |
| Stichtag 01.01.2027 | **10-06 / Inhaber** (Erinnerung) | Die Website-Texte bleiben ab dem Stichtag richtig, weil beide Stufen genannt sind. Erst wenn das Web-Release weitere Stufen in `aiPricing.ts` aufnimmt, wird `credit-paritaet.test.ts` rot und verlangt die Nachführung in `lib/site.ts`. |
| Mobile-Anzeige des Verbrauchs | **Inhaber / CraftOS-Mobile** (außerhalb der Website) | Mobile-Release `837aab4f`, `src/shared/i18n/locales/de/common.json` Z. 415 (`inventory.aiCost`: „KI-Erkennung: bis zu 2 Betriebscredits. …“, ebenso Default in `InventoryDraftScreen.tsx` Z. 161 und alle 21 Sprachdateien): Der Text nennt fest 2. Ab dem 01.01.2027 reserviert das Web-Release laut `aiPricing.ts`/Migration bis zu 3 Credits. Die App-Anzeige sollte vor dem Stichtag nachgezogen werden. Die Website ist davon unberührt. |
| K-1 `product-register.test.ts` | **Paket (b)**, Merge vor (d) | Unverändert aus 10-04: rot („8 statt 10“) bis zum Merge von (b). |
| Zeitüberschreitung `content-produktwahrheit.test.ts` Z. 213 | **10-06** | Unverändert aus 10-04; trat unter Volllast erneut auf (1 von 1367). |

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. Lesende `git show`-Aufrufe auf Release-Repos liefen nur über den bestehenden Helfer (T-10-17), und der Diff des Hilfeartikels ist auf einen Satz begrenzt (T-10-36).

## Self-Check: PASSED

- Vorhanden: `craftos/tests/credit-paritaet.test.ts`, `craftos/lib/site.ts`, `craftos/lib/seiten/craft-ai.ts`, `craftos/content/hilfe/lager-scan-app.md`.
- Die Commits `63e6929` und `7a60fd8` stehen in `git log main..HEAD`.
- Der Arbeitsbaum war vor dem SUMMARY sauber.
