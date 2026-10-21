---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
plan: 07
subsystem: mobile-app-seite
tags: [mobile-app, app-seite, keyfacts, offline, mobileapplication, phone-frames]
requires:
  - phase: 07-01
    provides: mobileApplicationSchema, TEXT_BUDGET.pageHead
  - phase: 07-03
    provides: Phone-Szenen der /app-Kacheln (urlaubScene, abnahmeScene, lagerAppScene, belegScene, maengelStatusScene, bautagesberichteScene)
  - phase: 07-04
    provides: FunktionsKopf mit stores-Variante, ERLAUBTE_ANORDNUNGEN, zielwerte()
  - phase: 07-06
    provides: alle 22 Detailseiten als Kachelziele, Keyword-Map-Testmuster
provides:
  - lib/app-content.ts (APP_SECTION_IDS, APP_SURFACES, appKopf, appSections, appTiles, appKeyFacts, offlineSteps, appFaq)
  - product-register.ts mobileOffline (4 Mobile-Belege, Limitation „Keine vollständige Offline-Zusage“)
  - app/app/page.tsx aus v2-Bausteinen mit BreadcrumbList-, FAQPage- und MobileApplication-JSON-LD
  - tests/app-seite.test.ts (Inhalte + gerendert, FEAT-03-Abdeckung)
  - Keyword-Map-Fall /app in der Liste der statischen Seiten
  - Phone-Rahmen ohne gekürzte Zeilen (Statuspille/Wert bricht um) und ungekürzte Titel bei 160 px
affects: [07-08, 07-09]
tech-stack:
  added: []
  patterns:
    - "Seiteninhalte als budgetgeprüftes Datenmodul (lib/app-content.ts) nach dem Muster lib/home-content.ts"
    - "In Phone-Rahmen bricht eine Statuspille bzw. ein Wert unter den Text, statt den Text mit Auslassungspunkten zu kürzen"
key-files:
  created:
    - craftos/lib/app-content.ts
    - craftos/tests/app-seite.test.ts
  modified:
    - craftos/lib/product-register.ts
    - craftos/app/app/page.tsx
    - craftos/tests/product-register.test.ts
    - craftos/tests/keyword-map.test.ts
    - craftos/components/v2/mini/MiniUi.module.css
    - craftos/components/v2/Frames.module.css
key-decisions:
  - "mobileOffline ist ein eigener Registereintrag mit 4 Mobile-Release-Pfaden; limitations verweist auf mobileOffline.limitation (eine Quelle für den Wortlaut)"
  - "Phone-Rahmen: Zeilen mit Statuspille oder Wert dürfen umbrechen (flex-wrap, rowText flex 1 0 auto); Browser-Rahmen bleiben unverändert, damit die Kartenzeilen auf /funktionen (07-04) stabil bleiben"
  - "160-px-Phone: Titel 12 px bei 8 px Innenabstand, damit Release-Titel wie „Meine Urlaubsanträge“ ungekürzt bleiben"
  - "Leerraum der lg-Kacheln mit Phone 194 (165–189 px bei 1024/1440) bleibt wie in 07-06 offen und geht an 07-08, weil eine Änderung vom genehmigten 07-UI-SPEC abweicht"
requirements-completed: []
duration: 32min
completed: 2026-10-21
---

# Phase 7 Plan 07: Mobile-App-Seite /app Summary

**`/app` ist jetzt aus v2-Bausteinen gebaut. Der Kopf enthält das Phone mit den Einsätzen, die StoreLinks und QR-Codes ab 1024 px. Darunter folgen drei Kachelgruppen mit 14 Live-Funktionen der App, davon 8 mit Phone-Darstellung. Danach kommen die Kennzahlen (21 Sprachen, Offline mit Einschränkung, App-Lizenz netto), ein Offline-Ablauf, die FAQ und ein CtaBand. JSON-LD: BreadcrumbList, FAQPage und MobileApplication ohne Bewertungen. Der Offline-Wert ist durch den neuen Registereintrag `mobileOffline` am Mobile-Release belegt. Die Sichtprüfung hat abgeschnittene Phone-Zeilen gefunden; sie sind an der Ursache im Baustein behoben.**

## Performance

- **Dauer:** ca. 32 min (Start 19:41 UTC, Ende 20:13 UTC)
- **Tasks:** 2/2, jeweils RED → GREEN
- **Dateien:** 2 neu, 6 geändert

## Ergebnisse

### Task 1: Inhaltsmodul, Registereintrag, Inhaltstests
- **`product-register.ts`:** `export const mobileOffline` mit dem Namen „Offline-Erfassung in der Mobile-App“, vier Mobile-Belegen (`useOfflineQueueSync.ts`, `useOfflineMutation.ts`, `SyncStatusBadge.tsx`, `OfflineIndicator.tsx`) und der Limitation „Keine vollständige Offline-Zusage“. Die Pfade wurden vorher am Release-Commit `5610a064` mit `git cat-file -e` geprüft. `limitations` nutzt jetzt `mobileOffline.limitation`.
- **`lib/app-content.ts`:** Das Modul folgt dem Muster von `home-content.ts` (Kopfkommentar mit Quellen, `tarif()`-Helfer). Inhalt:
  - Abschnittsfolge kopf → zeit → kennzahlen → dokumentieren → offline → material → faq → cta mit den Flächen dunkel, weiß, warm, weiß, warm, weiß, warm, dunkel.
  - Kopf, Abschnittsköpfe, 14 Kacheln, 3 Kennzahlen mit Hinweis, 4 Offline-Schritte, 5 FAQ und CtaBand, alle wörtlich nach 07-UI-SPEC.
  - Kachelanordnungen lg·sm·sm·md, lg·sm·sm·md·md·md und lg·sm·sm·md. Die lg-Kachel der ersten Gruppe ist dunkel.
  - Alle Werte kommen aus `tarife`, `mobileLocales`, `productBasis` und `euro`/`germanDate`. Kein Text musste gekürzt werden, alle Budgets sind eingehalten.
- **FAQ-Antworten** (die 07-UI-SPEC nennt nur die Fragen) bestehen nur aus belegten Aussagen:
  - Preise nach `site.ts`.
  - „mindestens eine Voll-Lizenz pro Betrieb“ wie in `/preise`, `lib/llms.ts` und `schema.ts`.
  - Offline-Grenzen nach dem Bestand von /app und `/hilfe/mobile-offline-synchronisierung`. Die Antwort beginnt mit „Teilweise:“.
  - Sprachen über `mobileLocales.length`, darunter nur Locale-Ordner, die am Release vorhanden sind.
  - Geräte iPhone, iPad und Android sowie die Anmeldung mit dem CraftOS-Konto nach dem Bestandstext von /app.
- **Tests:** `tests/app-seite.test.ts` → describe „Inhalte“ mit 13 Fällen:
  - Folge und Flächen, Budgets und Satzregel.
  - Anordnungen ∈ `ERLAUBTE_ANORDNUNGEN`, Phone-Breiten (lg 194, md 160).
  - FEAT-03-Abdeckung (13 Punkte plus „Kunden in der App“) und beworbene liveExtras.
  - Phone-Szenen: Kurzform, Registerbeleg und keine Szene doppelt.
  - Kachel-hrefs stehen in der Sitemap.
  - Kennzahlen, Offline-Schritte und FAQ.
  - Kein „vollständig offline“; Quelltext ohne „€“, „9,95“, „21 Sprachen“ und „10 Tage“.
  - `mobileOffline`.
  
  `product-register.test.ts` nimmt `mobileOffline.evidence` in den Release-Belegtest auf (lief, nicht übersprungen) und prüft den Eintrag.

### Task 2: Seite, JSON-LD, Keyword-Map, Browserlauf, Sichtprüfung
- **`app/app/page.tsx`** ist neu geschrieben:
  - `const z = zielwerte("/app")`, Metadaten mit `pageMetadata(z.titleOhneMarke, z.description, "/app")`.
  - `FunktionsKopf` mit `stores`, Abschnitts-Wrapper mit `data-abschnitt` und `aria-labelledby`.
  - BentoGrid-Mapping (Icon → TileIcon, Phone → Frame 160/194), KeyFacts mit `SectionHeader align="center"`.
  - `StepFlow tone="light"` mit dem Textlink „Offline-Nutzung vorbereiten“.
  - FAQ-Raster wie auf den Detailseiten, CtaBand im Wrapper `data-abschnitt="cta"`.
  - `JsonLd` für `faqSchema(appFaq)`, `breadcrumbSchema` (Start → Mobile-App) und `mobileApplicationSchema()`.
  - MobileAppGallery, FeatureSnippet und TrialCta werden nicht mehr importiert. Die Dateien bleiben bestehen; der Vermerk für Phase 10 steht in DESIGN-V2.md § 16.
- **Tests:** describe „gerendert“ mit 7 Fällen:
  - Metadaten, Abschnittsfolge und je Abschnitt höchstens eine H2.
  - Genau eine H1 mit dem Zielwert, Kopfwort-Span, StoreLinks und beide QR-Bilder im Kopf.
  - Jede der 9 Rahmen-figures trägt die Kennzeichnung; `data-evidence` und `data-source` nur in Kurzform.
  - JSON-LD: genau eine FAQPage mit den 5 sichtbaren Fragen, eine BreadcrumbList mit 2 Einträgen, eine MobileApplication mit Preis aus `tarife` und ohne `aggregateRating`/`review`; kein Organization- oder SoftwareApplication-Knoten.
  - Keine Altbausteine, kein Link auf `/craft-ai`, alle CTA mit `data-track="trial"`.
  
  In `keyword-map.test.ts` steht `/app` jetzt in der Liste der statischen Seiten (Title, H1, Description und Keyword-Regel).
- **Design-Kaskade:**
  - Die frontend-design-Leitlinie wurde nur gelesen.
  - `ui-ux-pro-max "mobile app landing page features phone mockup" --domain ux` lieferte nur allgemeine Treffer (Bildoptimierung, aktiver Navigationszustand, Eingabetastaturen), also keine neuen Erkenntnisse.
  - 21st.dev und Context7 standen nicht zur Verfügung.
  - DESIGN-V2.md § 16 deckt /app bereits ab (F1 /app-Variante, B6, B8, Vermerk zu MobileAppGallery). Ein Nachtrag war nicht nötig. Die Sichtkorrektur an den Phone-Zeilen ist eine Fehlerbehebung innerhalb der Mini-UI-Regeln und kein neuer Designentscheid.

## Prüfungen (lokal, nur dieser Rechner)

| Prüfung | Ergebnis |
|---|---|
| RED Task 1 / Task 2 | rot (Modul fehlt, 2 Register-Fälle) / rot (7 Render-Fälle, 1 Keyword-Fall) |
| `vitest app-seite + product-register + pricing-parity + announcements` (Task 1) | 36/36 grün, 0 übersprungen |
| `vitest app-seite + keyword-map + media-budget` (Task 2) | 38/38 grün |
| `npm test` (voll) | 29 Dateien, 466/466 grün |
| `npm run typecheck`, `npm run lint` | grün |
| `npm run build` | grün, 139 statische Seiten (zweimal, vor und nach der Sichtkorrektur) |
| `npm run test:e2e` gegen eigenen `next start -p 3100` | Lauf 1: 261 passed, 1 failed (WebKit-touch, /funktionen: Reduced-Motion-Übergänge unter Volllast nicht in 3 s abgeklungen; isoliert mit `--repeat-each 4` 16/16 grün). Lauf 2 nach dem Commit: **262 passed, 0 failed**, 54 skipped (Projekt-Skips) |
| `live-check.mjs` (lokal 3100) | 17 × OK, „alle Prüfungen OK“ |
| `visual-audit.mjs` für /app (5 Breiten × Chromium/WebKit) | 10 Seiten, 0 Statusfehler, 0 Überlauf, 0 JS-Fehler, 0 axe-Verstöße |
| Akzeptanz-Greps | `register:mobileOffline` 1; `export const mobileOffline` 1; `€/9,95/21 Sprachen/10 Tage/vollständig offline` 0; `Teilweise:` 3 (≥ 1); MobileAppGallery/FeatureSnippet/TrialCta in der Seite 0; Galerie-Datei vorhanden; `mobileApplicationSchema()` 1; `faqSchema(` 1; `"/app"` im Keyword-Test 1 |
| Port 3100 | vorher frei; der Server lief bei jedem Lauf mit eigener PID und wurde danach beendet; am Ende frei |

Koordination: Vor den schweren Läufen wurde der Status gelesen. edgar und edgarspc sind offline bzw. veraltet (Runner 1.9.9). Für die Website gibt es kein Rezept (Lücke: `website-unit`, `website-build`, `website-e2e`). Alle Läufe liefen deshalb lokal nacheinander, jeweils als einziger schwerer Prozess.

## Sichtprüfung

Screenshots (nicht committet, `git status` zeigt keine PNG):
- Ganzseitig, alle Breiten, Chromium und WebKit: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-07/shots/{chromium,webkit}-{360,390,768,1024,1440}-app.png`
- 360 × 640 ohne Scrollen: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-07/shots/{chromium,webkit}-360x640-falz-app.png`
- Abschnitte bei 360/1024/1440: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-07/shots/{chromium,webkit}-{360,1024,1440}-{kopf,zeit,kennzahlen,dokumentieren,offline,material,faq,cta}.png`
- visual-audit-Raster: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-07/raster/`
- Messbericht: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-07/sicht-report.json` (Skripte `sicht.mjs` und `lauf.sh` im selben Ordner)

Gemessen und gesichtet:
- **360 × 640:** H1, Lead und CTA sind in beiden Engines ohne Scrollen sichtbar. Das Kopfwort „Handwerker-App“ ist nie umbrochen und nie breiter als der Container.
- **QR-Codes:** bei 360, 390 und 768 nicht sichtbar, bei 1024 und 1440 beide sichtbar.
- **Phones:** 9 Rahmen, kein Gerät von seiner Kachel abgeschnitten, nach der Korrektur keine gekürzte Zeile und kein gekürzter Titel.
- **Kachelraster:** lückenlos bei 1, 2 und 4 Spalten (Zellmittelpunkte gegen Kachelflächen geprüft). Kein horizontaler Überlauf, keine JS-Fehler.

Befunde und Behebung:
1. **Gekürzte Zeilen in Phones mit 160 und 194 px.** Die Statuspille und der Wert sind nicht schrumpfbar, deshalb wurde der Text mit Auslassungspunkten gekürzt. Betroffen waren:
   - „Bäckerei Krause“ neben „Abgenommen mit Mängeln“, fast unsichtbar.
   - „Fliese gespru…“, „20.10.2…“, „27.–31.10.2…“ und „Rechnungsdatum“.
   
   Das galt in allen Breiten und beiden Engines. Dieselben Szenen erscheinen auch auf baudokumentation (Abnahme 194) und in den Phone-Karten auf /funktionen. Behebung in `MiniUi.module.css`, nur innerhalb von `[data-frame="phone"]`: Passt der Text nicht, bricht die Pille bzw. der Wert unter den Text. Zeilen, die passen, bleiben unverändert, und die Browser-Rahmen sind nicht betroffen. Danach gab es 0 Befunde.
2. **Gekürzte Titel im 160-px-Phone** („Meine Urlaubsant…“, „Abnahmeprotoko…“). Behebung in `Frames.module.css`: Bei 160 px hat der Titel 12 px Schrift und 8 px Innenabstand. Danach gab es 0 Befunde.
3. **Offen, nicht geändert:** Die lg-Kacheln mit Phone 194 (Zeiterfassung, Mängel, Lager-Scan) haben bei 1024 und 1440 zwischen 165 und 189 px Leerraum über dem Innenabstand. Das Phone sitzt mittig in einer Kachel, deren Höhe die zwei Rasterzeilen vorgeben. Es ist dieselbe Ursache wie der in 07-06 dokumentierte Befund bei lager und baudokumentation. Eine Änderung (Phone 240 bzw. 160 oder eine andere Anordnung) wäre eine Abweichung vom genehmigten 07-UI-SPEC. Vorschlag für 07-08: die Phone-Breite in lg-Kacheln auf /app und den Detailseiten gemeinsam festlegen.

## Task Commits

1. `bbde2e2` test(07-07): add failing content tests for /app and mobileOffline register entry
2. `07cb42d` feat(07-07): /app content module and mobileOffline register entry
3. `89ac274` test(07-07): add failing render, JSON-LD and keyword-map cases for /app
4. `a96b0de` feat(07-07): /app rebuilt from v2 blocks with phone tiles, key facts, offline flow, FAQ and JSON-LD

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] Gekürzte Zeilen in Phone-Rahmen**
- **Found during:** Task 2 (Sichtprüfung)
- **Issue:** Beispielnamen und Daten wurden neben langen Statuspillen fast vollständig ausgeblendet.
- **Fix:** In Phone-Rahmen darf die Zeile umbrechen; `rowText` hat `flex: 1 0 auto` und `max-width: 100%`, bei einem Icon `calc(100% - 32px)`.
- **Files modified:** craftos/components/v2/mini/MiniUi.module.css (außerhalb `files_modified`)
- **Commit:** a96b0de

**2. [Rule 1 – Bug] Gekürzte Release-Titel im 160-px-Phone**
- **Fix:** Bei `data-width="160"` hat der Titel 12 px Schrift und 8 px Innenabstand.
- **Files modified:** craftos/components/v2/Frames.module.css (außerhalb `files_modified`)
- **Commit:** a96b0de

**3. [Rule 1 – Testpräzision] Rahmenzahl im Render-Test**
- Die erste Fassung erwartete mindestens 10 Rahmen. Die 07-UI-SPEC nennt aber 8 Phone-Kacheln plus das Kopf-Phone, also 9. Der Test leitet die Zahl jetzt aus den Kacheln ab und erwartet genau 1 + 8. Commit a96b0de.

### Hinweise
- Keine weiteren fetches in den Produkt-Repos. Gelesen wurde nur mit `git cat-file -e` gegen den Register-Commit des Mobile-Repos.
- Der einmalige E2E-Fehlschlag in Lauf 1 betrifft /funktionen (WebKit, Reduced-Motion-Übergänge unter Last) und nicht /app. Isoliert war er 16/16 grün, im zweiten vollen Lauf 0 failed.

**Total deviations:** 3 Auto-Fixes (2 Sichtbefunde, 1 Testpräzision).

## TDD Gate Compliance

- Task 1: RED `bbde2e2` → GREEN `07cb42d`
- Task 2: RED `89ac274` → GREEN `a96b0de`

## Known Stubs

Keine. Alle Kacheln, Kennzahlen und FAQ-Antworten kommen aus belegten Datenquellen; jede Kachel verlinkt auf eine bestehende Seite (Sitemap-Test).

## Threat Flags

Keine neue Angriffsfläche.
- **T-07-21:** Offline als Kennzahl mit Einschränkung, Hinweis, Ablauf und FAQ „Teilweise:“. Registereintrag `mobileOffline` mit Limitation; Grep- und Testsperre gegen „vollständig offline“.
- **T-07-22:** MobileApplication ohne `aggregateRating`/`review` (Test).
- **T-07-23:** Preis nur aus `tarife` über `euro()`/`toFixed(2)`; Quelltexttest ohne Preisliterale; pricing-parity grün.
- **T-07-24:** `data-source` und `data-evidence` im gerenderten HTML nur in Kurzform (Test).
- **T-07-SC:** keine Pakete installiert.

## Self-Check: PASSED

- Dateien vorhanden: craftos/lib/app-content.ts, craftos/tests/app-seite.test.ts; Seite, Register und CSS geändert.
- Commits bbde2e2, 07cb42d, 89ac274 und a96b0de stehen im Log.
- Arbeitsbaum sauber bis auf `.planning/config.json` (bewusst nicht angefasst). Kein Server läuft, Port 3100 ist frei.
