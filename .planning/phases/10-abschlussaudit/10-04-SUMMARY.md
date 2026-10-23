---
phase: 10-abschlussaudit
plan: 04
subsystem: funktionen-daten
tags: [paket-d, zusatzfunktionen, kassenbuch, paragraph-13b, product-demo, schutztests]
requirements-completed: []

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "liveExtras „Kassenbuch“ und „Rechnung nach § 13b“ mit Belegen (09-09), Kassenbuch-Kachel auf /funktionen/buchhaltung, Release-Basis Web bfe165e9"
provides:
  - "Kassenbuch (Gruppe buchhaltung) und Rechnung nach § 13b (Gruppe rechnung) beworben: 10 Zusatzfunktionen, 32 Einträge auf /funktionen"
  - "Kacheln am Ziel: zusatz kassenbuch an der Kassenbuch-Kachel, neue wide-Kachel „Rechnung nach § 13b“ auf /funktionen/rechnungen (md·sm·sm·wide·wide·wide)"
  - "vereinigeInhalte(module): INHALTE wirft bei doppeltem Slug (D-24)"
  - "Schutztest: keine Datei unter app/ importiert components/product-demo oder lib/demo (D-23)"
affects: [10-06, 10-13, paket-b-merge]

tech-stack:
  added: []
  patterns:
    - "Abweichender Prüfstand je Detailseite über GEPRUEFT_AM in lib/funktionen.ts (speist lastModified der Sitemap, K-5)"
    - "Importscan mit Musterselbsttest (statische, dynamische und Alias-Importe), damit ein kaputtes Muster nicht still grün bleibt"

key-files:
  created: []
  modified:
    - craftos/lib/product-register.ts
    - craftos/lib/funktionsgruppen.ts
    - craftos/lib/funktionsdetails/rechnung.ts
    - craftos/lib/funktionsdetails/buchhaltung.ts
    - craftos/lib/funktionsdetails/index.ts
    - craftos/lib/funktionen.ts
    - craftos/docs/PRODUCT-REGISTER.md
    - craftos/tests/funktionsgruppen.test.ts
    - craftos/tests/funktionen-seite.test.ts
    - craftos/tests/navigation.test.ts
    - craftos/tests/funktionsdetails.test.ts
    - craftos/tests/demo.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs

key-decisions:
  - "Gruppenreihenfolge der Extras folgt GRUPPEN_REIHENFOLGE (angebot, baustelle, rechnung, buchhaltung, team); die Liste im Plan-behavior war vertauscht"
  - "ERLAUBTE_ANORDNUNGEN um md·sm·sm·wide·wide·wide ergänzt (10-UI-SPEC § 5 genehmigt, lückenlos ab 768 und 1024 px)"
  - "Menü bleibt unverändert; Menü-Präsenz der Zusatzfunktionen geht an 10-06 (D-40)"

duration: ca. 40 min
completed: 2026-10-23
---

# Phase 10 Plan 04: Kassenbuch und § 13b als Zusatzfunktionen, Schutztests ProductDemo und doppelte Slugs – Summary

**Kassenbuch und Rechnung nach § 13b sind als beworbene Zusatzfunktionen mit Lizenz im Nutzensatz auf `/funktionen` und als Kacheln am Ziel live geschaltet (10 Extras, 32 Einträge). `INHALTE` wirft bei doppeltem Slug, und ein Schutztest verhindert ProductDemo-Importe unter `app/`.**

## Startgate

- `craftos/docs/releases/PHASE-09-ROLLOUT.md` ist vorhanden, `git status --porcelain craftos` war leer, Port 3104 war frei: **erfüllt**.
- `node_modules` in `wt-10d/craftos` war bereits echt installiert, ohne Junction (`.package-lock.json` vorhanden). Ein `npm ci` war deshalb nicht nötig.
- Koordinationsstatus vor den schweren Läufen gelesen: Für die Website gibt es kein Rezept, die Läufe liefen deshalb lokal und einzeln unter `.heavy-lock`.

## Release-Belege (lesend, `git -C C:/Projekte/craft-connect-buddy show origin/release:<pfad>`, Web `bfe165e90`)

| Aussage | Beleg |
|---|---|
| Kassenbuch hinter Finanzfreigabe | `src/App.tsx` Z. 271: `<Route path="/buchhaltung/kasse" element={<LicenseProtectedRoute feature="finanzen"><Kassenbuch /></LicenseProtectedRoute>} />` |
| Admin oder Büro mit Schalter | `src/hooks/useLicense.ts` Z. 58 (Doku „Admin always; Büro only when the `finanzen_sichtbar` toggle is enabled; App never“), Z. 85 `canSeeFinance: isAdmin \|\| (isBuero && toggles.finanzen_sichtbar)` |
| „täglich … mit laufendem Bestand“ | `src/pages/Kassenbuch.tsx` Z. 45 und Z. 113: „Bargeld täglich erfassen – unveränderbar, mit laufendem Bestand.“ |
| Kassenbuch für Kunden erreichbar | `src/components/buchhaltung/AccountingNavigation.tsx` Z. 7 (Reiter „Kasse“ ohne isDeveloper- oder Flag-Bedingung) |
| § 13b am Kunden | `src/components/customers/CustomerDialog.tsx` Z. 449 „Bauleister nach § 13b“ (Schalter `is_reverse_charge`, ohne isDeveloper- oder Flag-Bedingung), Z. 459 |
| § 13b-Hinweistext | `src/lib/invoiceNoticeTexts.ts` Z. 31–46 („Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.“) |
| Rechnungen = Voll-Lizenz | `src/App.tsx` Z. 262: `/rechnungen` mit `LicenseProtectedRoute feature="dokumente"` |

**Live-Prüfung:** Keiner der beiden Pfade hängt an `isDeveloper` oder an einem Feature-Flag. `isDeveloper` sperrt im Release nur das KI-Agent-Panel (`MainLayout.tsx` Z. 127, `MobileHeader.tsx` Z. 34–74).

## Umsetzung

**Aufgabe 1 (D-21, K-5, K-13, K-14):**
- `product-register.ts`: `advertised: true` für „Kassenbuch“ und „Rechnung nach § 13b“. Die Kommentare verweisen nach K-13 auf `/funktionen` und auf die Menü-Präsenz in 10-06 (D-40).
- `funktionsgruppen.ts`:
  - `REGISTER_IDS` um `"Rechnung nach § 13b": "rechnung-13b"` und `Kassenbuch: "kassenbuch"` ergänzt.
  - `ZUSATZ`-Einträge in Gruppenreihenfolge nach `lager-scan` eingefügt, mit den Texten wörtlich aus 10-UI-SPEC § 5 (Icons `ReceiptText` und `Wallet`).
  - Modul- und Zuordnungskommentar korrigiert („Planung hat danach keine Zusatzfunktion“).
- Kacheln am Ziel:
  - Die Kassenbuch-Kachel trägt jetzt `zusatz: "kassenbuch"`; Text und `href` sind unverändert.
  - Auf `/funktionen/rechnungen` steht eine neue `wide`-Kachel „Rechnung nach § 13b“ zwischen „Zahlungen zuordnen“ und „Berichte abrechnen“, mit `href: "/hilfe/rechnung-fertigstellen"` und `zusatz: "rechnung-13b"`.
- `lib/funktionen.ts`: `checkedAt` von `rechnungen` und `buchhaltung` steht auf `2026-10-23` (über `GEPRUEFT_AM`), alle übrigen Slugs bleiben auf `2026-10-22`.
- `docs/PRODUCT-REGISTER.md`: Die Spalte „Beworben“ zeigt für beide Funktionen jetzt „ja (seit Phase 10, D-21)“; die historische Notiz in Z. 16 ist ergänzt.
- K-14: Die neuen Sätze enthalten keine Preis- oder Tageszahl, und „Voll-Lizenz“ ist mit Bindestrich geschrieben. `tests/pricing-parity.test.ts` ist grün und wurde nicht geändert.

**Aufgabe 2 (D-23, D-24):**
- `export function vereinigeInhalte(module)` ist neu, und `INHALTE = vereinigeInhalte([...])` nutzt sie. Bei einem doppelten Slug wirft sie mit dem Text „Funktionsdetail: Slug <slug> steht in mehreren Inhaltsmodulen – Eintrag in genau einem Modul unter lib/funktionsdetails/ belassen.“
- `tests/demo.test.ts` hat einen neuen `describe` „Produktdemo: keine Einbindung unter app/ (D-23)“:
  - Er scannt alle `.ts`- und `.tsx`-Dateien unter `app/` und meldet Treffer als `datei:zeile`; heute sind es 0.
  - Ein Selbsttest des Musters deckt statische, dynamische und Alias-Importe ab, dazu Negativfälle wie `@/lib/demos` und Kommentare.
- `components/product-demo/**` und `lib/demo/**` sind unverändert (`git diff main --stat` ist leer).

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| RED Aufgabe 1 (4 Testdateien) | 9 rot, 143 grün (erwartet) |
| GREEN Aufgabe 1 (verify-Dateien plus `app-seite`, `vergleich-seiten`) | 10 Dateien, **294/294 grün** |
| RED Aufgabe 2 | 2 rot (`vereinigeInhalte` fehlt); der Demo-Schutz war als Charakterisierungstest sofort grün |
| GREEN Aufgabe 2 (`funktionsdetails`, `demo`) | **138/138 grün** |
| `npm run typecheck`, `npm run lint` | jeweils Exit 0 |
| `MegaMenu.tsx`, `product-register.test.ts`, `pricing-parity.test.ts` gegenüber `main` | unverändert |
| Vollsuite `--exclude tests/product-register.test.ts` (zwei Läufe) | 44 Dateien, **1356 grün, 1 Zeitüberschreitung**: `content-produktwahrheit.test.ts` › ME-03 „Bauunternehmen nennt die Online-Unterschrift …“ (5000 ms beim ersten `await import("@/lib/gewerke")` unter Volllast). Die Datei ist einzeln **20/20 grün** (3 s). Der Vergleichslauf mit dem `main`-Stand aller 13 Dateien von 10-04 zeigt denselben Fehlschlag (1351 grün, 1 Zeitüberschreitung); er bestand also schon vorher und kommt nicht von 10-04 (siehe Übergabe). |
| `tests/product-register.test.ts` getrennt | **rot bis Merge (b), K-1**: 1 rot, 10 grün, ausschließlich „expected … to have a length of 8 but got 10“ (Z. 103). Log: `craftos/test-results/product-register-k1.log` |
| `npm run build` | grün |
| `seo-audit.mjs --paths=/funktionen,/funktionen/rechnungen,/funktionen/buchhaltung` | **0 Verstöße**, Exit 0 |
| E2E `home-navigation.pw.cjs` und `funktionsdetails.pw.cjs` gegen `next start -p 3104` | **63 bestanden, 0 fehlgeschlagen**, 45 übersprungen (projektbedingt), 4,4 min |
| Port 3104 nach dem Lauf | frei; kein Prozess aus `wt-10d` aktiv, Sperre jeweils sofort freigegeben |

Akzeptanz-Greps: `rechnung-13b` 2, `kassenbuch` 2, `zusatz: "rechnung-13b"` 1, `zusatz: "kassenbuch"` 1, „für Admin und Büro-Zugänge mit Finanzberechtigung“ 1, „mit Voll-Lizenz“ 1, `export function vereinigeInhalte` 1, „steht in mehreren Inhaltsmodulen“ 1, `product-demo` in `demo.test.ts` 8.

## Commits

| Commit | Inhalt |
|---|---|
| `4c57f9b` | test(10-04): Zähl- und Erwartungstests für Kassenbuch und § 13b (RED, D-21) |
| `af3c59f` | feat(10-04): Kassenbuch und § 13b als Zusatzfunktionen (D-21) |
| `a25fd76` | test(10-04): Schutztests ProductDemo unter app/ und doppelte Slugs in INHALTE (RED, D-23, D-24) |
| `77bb4ed` | test(10-04): Schutztests ProductDemo und doppelte Slugs (D-23, D-24) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Planfehler] Gruppenreihenfolge der Extras**
- **Found during:** Aufgabe 1 (RED)
- **Issue:** Das Plan-behavior nennt `["angebot", "rechnung", "buchhaltung", "baustelle", "team"]`, spricht aber zugleich von „in Gruppenreihenfolge“. `GRUPPEN_REIHENFOLGE` lautet `angebot, planung, baustelle, rechnung, buchhaltung, team`.
- **Fix:** Die Tests erwarten `["angebot", "baustelle", "rechnung", "buchhaltung", "team"]`.
- **Commit:** `4c57f9b`

**2. [Rule 3 - Blocking] Neue Anordnung nicht zulässig**
- **Found during:** Aufgabe 1 (GREEN)
- **Issue:** Der Builder wirft „Anordnung md·sm·sm·wide·wide·wide ist für rechnungen nicht zulässig“, weil `ERLAUBTE_ANORDNUNGEN` die von 10-UI-SPEC § 5 genehmigte Folge nicht enthält.
- **Fix:** Die Folge ist in `lib/funktionsdetails/index.ts` ergänzt (Paket-d-Besitz `lib/funktionsdetails/**`). Bei 2 Spalten ergibt sich md | sm sm | wide | wide | wide, bei 4 Spalten md+sm+sm, dann dreimal wide über die volle Breite, also ohne Lücke. `app-seite` und `vergleich-seiten` sind grün.
- **Commit:** `af3c59f`

**3. [Rule 1 - Vollständigkeit] Weitere Zählstellen**
- **Issue:** Außer den im Plan genannten Stellen zählten noch weitere fest 30 bzw. 8: `home-navigation.pw.cjs` Z. 448, 462, 569, 577 (alle auf `/funktionen`, nicht im Menü) und `funktionsgruppen.test.ts` („Ziele“ 8 → 10, „ignoriert nicht beworbene“ 8 → 10).
- **Fix:** Die Stellen sind nachgezogen. Der Test „leere Gruppe“ nimmt jetzt auch „Rechnung nach § 13b“ aus `liveExtras`, weil Rechnung sonst durch das Extra nicht leer wäre.
- **Commit:** `4c57f9b`

**4. [Rule 2] L-1-Prüfung der Nutzensätze**
- **Fix:** In `funktionsgruppen.test.ts` ist ein Test hinzugekommen: keine `l1Treffer` und kein „nur“ oder „nicht für“ in den Nutzensätzen der Zusatzfunktionen (behavior „ohne L-1-Treffer“, 10-UI-SPEC § 5).
- **Commit:** `4c57f9b`

### Sonstiges
- `npm ci` entfiel, weil `node_modules` bereits echt installiert war (siehe Startgate).
- Die Vollsuite ist nicht vollständig grün: Es gibt eine Zeitüberschreitung, die schon vorher bestand und nicht von 10-04 stammt (Vergleichslauf oben). Sie wurde nicht behoben, weil `tests/content-produktwahrheit.test.ts` nicht zum Dateibesitz von Paket (d) gehört (Scope-Regel). Die Übergabe steht unten.
- Im gemeinsamen Scratchpad-Wurzelordner lagen schon Dateien namens `replace.mjs`, `pr.json` und `fn.json`, vermutlich von parallelen Agenten. Sie wurden einmal von 10-04 überschrieben. Danach lief alles in `scratchpad/10-04/`.

## Inhaberfrage ProductDemo (D-23)

> **ProductDemo archivieren oder löschen?**
>
> Empfehlung: **löschen nach Freigabe.**
>
> Grund: Die Szene `ki` zeigt den nicht freigeschalteten KI-Agenten (D-23). Die Demo ist auf keiner Seite eingebunden; das sichert der neue Schutztest in `tests/demo.test.ts` ab.
>
> Folgen einer Löschung:
> - `components/product-demo/**`: 5 Dateien, davon `ProductDemo.tsx` mit 3.068 Zeilen. Mit CSS, `PlanningBoard` und README sind es zusammen 7.424 Zeilen.
> - `lib/demo/{machine,data}.ts` (835 Zeilen).
> - Die übersprungenen Specs `tests/e2e/demo-planning.pw.cjs` und `tests/e2e/mobile-step-flow.pw.cjs`.
> - `tests/demo.test.ts`: Die Demo-Fälle entfallen; der Schutz-`describe` gegen Importe unter `app/` bleibt sinnvoll oder wandert in eine eigene Datei.
> - `components/ui/MobileAppGallery.tsx`: Eine Suche in `app/`, `components/` und `lib/` findet nur die Datei selbst, sie ist also nicht eingebunden.
>
> Archivieren hieße: Code bleibt im Repo, ist durch den Schutztest gesperrt und wird weiter von Lint und Typecheck mitgetragen.

## Übergabeliste

| Punkt | Besitzer | Inhalt |
|---|---|---|
| Menü-Präsenz der Zusatzfunktionen | **10-06** (Spur a besitzt `MegaMenu.tsx`) | Kassenbuch und § 13b im Mega-Menü (D-21, D-40), mit Test; Menü-Zählstellen in `home-navigation.pw.cjs` nachziehen (10-04 hat nur die Seite `/funktionen` gezählt). |
| Sitemap-Änderungsdaten (K-15) | **10-06** (`app/sitemap.ts`) | `/funktionen` → 2026-10-23 (`pageUpdated`, zwei neue Zusatzkarten). `/funktionen/rechnungen` und `/funktionen/buchhaltung` erhalten 2026-10-23 bereits automatisch über `checkedAt` (K-5); bitte prüfen, dass `sitemap.ts` weiter `f.checkedAt` liest. |
| B10-Neumessung (K-8) | **10-06** | Sichtprüfung `/funktionen/rechnungen` bei 768, 1024 und 1440 px mit der sechsten Kachel (`md·sm·sm·wide·wide·wide`) auf dem zusammengeführten `BentoGrid.module.css` aus (c). |
| live-check-Prüfpunkte | **10-06 / Rollout** | Auf `/funktionen` stehen die Karten „Rechnung nach § 13b“ (Gruppe Rechnung) und „Kassenbuch“ (Gruppe Buchhaltung) unter „Weitere Funktionen“, jeweils mit Web-Badge und Ziel-Hinweis. Auf `/funktionen/rechnungen` steht die § 13b-Kachel mit Link auf `/hilfe/rechnung-fertigstellen`. 32 `data-funktion`-Einträge. |
| K-1 `product-register.test.ts` Z. 103 | **Paket (b)**, Merge vor (d) | Paritätszeile `toHaveLength(ZUSATZ_IDS.length)`. Bis dahin ist die Datei in `wt-10d` rot („8 statt 10“). |
| Zeitüberschreitung in der Vollsuite | **10-06** (Datei ohne D-33-Besitzer) | `tests/content-produktwahrheit.test.ts` Z. 213 (ME-03 „Bauunternehmen …“): Unter Volllast überschreitet der erste dynamische Import 5000 ms. Das trat schon vorher auf (Vergleichslauf mit dem `main`-Stand). Vorschlag wie 08-09 bei `content.test.ts`: Zeitlimit der Datei oder des Falls anheben (z. B. 60 s) oder `@/lib/gewerke` statisch importieren. |
| Inhaberfrage ProductDemo | **Inhaber** über den Orchestrator | siehe oben |

## Known Stubs

Keine.

## Self-Check: PASSED

- Alle 13 geänderten Dateien sind vorhanden; die Commits `4c57f9b`, `af3c59f`, `a25fd76` und `77bb4ed` sind in `git log main..HEAD` vorhanden.
- Der Arbeitsbaum war vor dem SUMMARY sauber. STATE.md, ROADMAP.md und `.planning/config.json` sind nicht angefasst; kein Merge, kein Push.
