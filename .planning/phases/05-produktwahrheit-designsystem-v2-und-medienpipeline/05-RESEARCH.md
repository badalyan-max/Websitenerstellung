# Phase 5: Produktwahrheit, Keyword-Map und Designbausteine – Research

**Recherchiert:** 2026-10-20
**Domäne:** Produktfakten-Abgleich (Next.js-Datenmodule gegen Produkt-Repos), SEO-Keyword-Daten (SE Ranking Data API), Designsystem-Bausteine (Next.js 16 App Router, Tailwind 4, CSS-Module), Medienbudget
**Gesamtvertrauen:** HOCH für Produktwahrheit und Codebasis (direkt gegen `origin/release` und Repo geprüft), HOCH für SE-Ranking-Parameter (Doku plus Probeaufrufe), MITTEL für Gestaltungsempfehlungen (Ermessensbereich)

<user_constraints>
## User Constraints (aus 05-CONTEXT.md, wörtlich)

### Locked Decisions

**Umfang geändert am 20.10.2026 (Inhaber):** „Wir brauchen keine detailgetreuen Screenshots … einfach strukturierter und schöner, nicht Rom neu erfinden … plus SEO.“ Demo-Betrieb, Aufnahme-Pipeline und Videos entfallen.

Die Website stellt ausschließlich live verfügbare Funktionen mit korrekten Preisen dar (Produktregister auf `origin/release`). Für jede Seite steht ein datenbasiertes Hauptkeyword fest (SE Ranking Data API). Die Bausteine des Designsystems v2 für eine strukturierte, bildhafte Darstellung stehen auf einer nicht indexierten Musterseite bereit. Startseite, Menü und Funktionsseiten werden in dieser Phase NICHT neu gestaltet (Phasen 6/7); sichtbar korrigiert werden nur Produktfakten (z. B. „Demnächst“ mit vergangenen Terminen auf `/funktionen`).

#### Visuelle Elemente statt Screenshots (ersetzt frühere D-01..D-07)
- **D-01:** Kein Demo-Betrieb, keine Aufnahme-Pipeline, keine Bildschirmvideos. `CRAFTOS_DEMO_*` wird nicht benötigt.
- **D-02:** Visuelle Elemente sind vereinfachte, im Code gebaute UI-Darstellungen (Muster: `components/feature-snippet` mit DeviceFrame/Scenes), Icons, Ablaufdiagramme, Kennzahlen und vorhandene Fotos aus `public/images`. Sie zeigen nur Live-Funktionen und keine erfundenen Zahlen oder Bedienelemente.
- **D-03:** Bestehende Seitenstruktur und Inhalte bleiben die Basis („nicht Rom neu erfinden“): umgliedern, kürzen, visualisieren statt neu schreiben.
- **D-04:** Optional KI-generierte Szenenbilder (ChatGPT/Codex) nur für Hero/Teaser, sichtbar als „Darstellung“ gekennzeichnet; kein Muss.

#### SEO-Daten
- **D-05:** Keyword-Quelle ist die SE Ranking Data API (`SE_RANKING_API_KEY` in `.env`, Header `Authorization: Token …`, Basis `https://api.seranking.com/v1`, JSON-Body bei POST, Ratenlimit beachten). Testzugang bis 03.11.2026 mit 100.000 Units – Keyword-Map vorher abschließen und Rohdaten lokal sichern. Der MCP-Server `se-ranking` ist eingetragen, braucht aber OAuth-Anmeldung des Inhabers per `/mcp`.
- **D-06:** Erstbefund 20.10.2026 (SE Ranking, DE): craftos.eu 1 Keyword in den Top 100, Traffic ≈ 0. Wettbewerber-Keywords: streit-software.de 38.873, hero-software.de 17.805, plancraft.com 4.607, craftnote.de 4.376, das-programm.io 3.400, openhandwerk.de 2.590, label-software.de 1.385. Größte erreichbare Begriffe (Volumen/KD): handwerkersoftware 1.300/55, bautagebuch app 590/7, aufmaß app 590/12, handwerker software 410/33, zeiterfassung handwerk 390/12, handwerker stundensatz 320/6, baustellen app 260/15, rechnungssoftware handwerker 210/18, shk software 210/7, digitale bauakte 170/7, auftragsverwaltung software 170/9, gaeb software 140/18, maler/trockenbau software 140/≤10. Wettbewerber-Marken (plancraft 9.900, hero software 5.400, tooltime 4.400, craftnote 3.100) sind Grundlage für Alternativen-Seiten. plancraft gewinnt viel Volumen über Hilfeartikel (Schlussrechnung, Leistungszeitraum, Regiebericht, Bautagesbericht, Aufmaß).
- **D-07:** Je Seite genau ein Hauptkeyword; Lücken mit Nachfrage und niedriger Schwierigkeit (KD < 20) werden als neue Seiten oder Abschnitte für Phasen 6–9 vorgemerkt.

#### Aus Meilenstein-Entscheidungen übernommen
- **D-08:** Design „markant, Produkt im Fokus“: Marke (Amber `primary-*`, Clash Display, General Sans, CraftOS-Logo) bleibt; große Produktdarstellungen, Kachel-/Bento-Layouts, kurze Texte, dezente Bewegung, keine globale Scroll-Animation (vom Inhaber im Relaunch entfernt), Reduced Motion zeigt alles statisch.
- **D-09:** Interaktive Klick-Demo (`components/product-demo`) wird nicht eingesetzt, aber auch nicht gelöscht.
- **D-10:** Schrittweiser Rollout: Phase 5 endet mit Ship-Gate, Push, `npm run indexnow`, Live-Prüfung.

### Claude's Discretion
- Aufbau der vereinfachten UI-Darstellungen und Wiederverwendung der feature-snippet-Szenen.
- Format und Ort der Keyword-Map (z. B. `craftos/docs/seo/KEYWORD-MAP.md` plus Datenmodul) und des Rohdaten-Abzugs.
- Aufbau und Komponenten-API des Designsystems v2, Musterseite (z. B. `/styleguide` mit `noindex`, nicht in Sitemap).
- Umsetzung der Budget-Prüfung (Skript/Test) und des Preisabgleich-Tests gegen `src/lib/constants.ts` der Web-App.
- Formulierung und Platzierung der bereinigten Ankündigungen (Telefon-Agent, MCP-Server, Agent-Aktionen) ohne Datum.

### Deferred Ideas (OUT OF SCOPE)
- Interaktive Klick-Demo wieder einsetzen (Future Requirement).
- Registrieren-Reiter per Link in der Web-App (`?tab=register`) – App-Repo, außerhalb dieses Meilensteins.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Beschreibung | Research-Grundlage |
|----|--------------|--------------------|
| PROD-02 | Nur Live-Funktionen; Register nennt Release-Tag, Commit, Belegpfade | Abschnitt „Produktwahrheit: Funktions-Delta“ (Release-Commits, 57 bestehende Belegpfade geprüft, neue Belege, nicht-live Liste) |
| PROD-03 | Preise, Lizenzarten, Netto, Testphase, Credits überall identisch mit `constants.ts` | Abschnitt „Preis-Wahrheitstabelle“, Muster „Preis-Snapshot plus Paritätstest“, Liste hart kodierter Preisstellen |
| PROD-04 | Veraltete Ankündigungen entfernt oder ohne Datum „in Entwicklung“ | Fundstellenliste aller 8 Stellen mit `upcomingFeatures`/Terminen; Beleg, dass Telefon-Agent, MCP und Agent-Aktionen nicht live sind |
| SEO-02 | Keyword-Map aus Tooldaten, je Seite genau ein Hauptkeyword | Abschnitt „Keyword-Map“: verifizierte SE-Ranking-Endpunkte/Parameter/Kosten, 125 Sitemap-URLs, Datenformat, Skript, Kannibalisierungstest |
| DESIGN-02 | Designsystem v2 (Tokens, Rahmen, Raster, Kennzahlen, Funktionskarte) | Abschnitt „Designbausteine v2“: Bestandsinventar, Wiederverwendung vs. Neubau, Musterseite mit `noindex` |
| DESIGN-04 | Dezente Bewegung, keine globale Scroll-Animation, Reduced Motion statisch | Bestehende Reduced-Motion-Regel `app/globals.css:370-381`, FeatureSnippet-Muster (`reduced` initial `true`), Prüfung per `emulateMedia` |
| MEDIA-03 | Darstellungen nur mit Live-Funktionen, keine erfundenen Bedienelemente/Zahlen, KI-Szenen gekennzeichnet | Gefundene Abweichungen (PhoneFrame-Tab „Zeit“ statt „Zeiten“, Galerie-Text „Aktuelle Appaufnahme“), Kennzeichnungsbaustein |
| MEDIA-04 | Bild ≤ 150 KB AVIF/WebP je Ansicht, kein Layout-Shift | Bildinventar (21 Dateien > 150 KB), sharp 0.35.4 bereits installiert, statischer Test plus Playwright-Messung |
</phase_requirements>

## Summary

Die Produktwahrheit lässt sich vollständig und reproduzierbar aus den Release-Zweigen ableiten: Web `origin/release` = `07cf0645517b81fa39c8644e3c9c84904f789bc4` (Tag `v4.0.0-test.238`, 20.10.2026 01:09), Mobile `origin/release` = `5610a06415361f5c5a01c90258352ed7f49b7bab` (Tag `mobile-v1.0.0-test.93`, 19.10.2026 23:24). Alle 57 Belegpfade des heutigen Registers (`craftos/lib/product-register.ts`) existieren in diesen Commits; das Register zeigt aber noch auf die Basis vom 09.09.2026 (`main 179cef55…` / `master 9e6260d…`). Die Preise der Website stimmen numerisch mit `src/lib/constants.ts` überein (29,95/299,50, 9,95/99,50, 24,96 und 8,29 als Jahres-Monatswerte). Es fehlen jedoch Extra-Speicher (0,99 €/50 GB), das einmalige Startguthaben von 150 Credits und die Credit-Pakete (in `site.ts` definiert, aber nirgends verwendet); außerdem sind Preise an fünf Stellen hart kodiert, und das Schema-Offer nutzt einen festen String. Telefon-Agent und MCP-Server haben im Web-Release keinen Code, der KI-Agent ist nur für Entwickler freigeschaltet („Bald verfügbar“). Die drei Ankündigungen mit vergangenen Terminen erscheinen an acht Stellen.

Für die Keyword-Map sind die SE-Ranking-Endpunkte durch Doku und fünf Probeaufrufe bestätigt (alle HTTP 200; Stand Kontingent: 98.400 von 100.000 Units). Kostenrelevant: `keywords/export` kostet 100 Units je Anfrage (bis 5.000 Keywords), `related`/`similar`/`questions` kosten 10 Units **je zurückgegebenem Keyword**, `longtail` 1 Unit je Keyword, alle `domain/*`-Endpunkte 100 Units je Anfrage. Filter heißen `filter[difficulty][to]` usw. (Klammernotation). Die Sitemap umfasst 125 URLs; die Map wird als typisiertes Modul plus Markdown-Doku plus datierter Rohdatenabzug angelegt, und ein Vitest prüft gegen `app/sitemap.ts`, dass jede URL genau einen Eintrag hat und kein Hauptkeyword doppelt vergeben ist.

Für das Designsystem v2 existieren tragfähige Grundlagen (Tokens in `app/globals.css` `@theme`, `PhoneFrame`/`WebFrame`/`DeviceBridge`, Vergleichstabellen-CSS, globale Reduced-Motion-Regel). Neu zu bauen sind statische, nicht animierte Bausteine in einem eigenen Ordner sowie eine Musterseite `/styleguide` mit `robots: { index: false }`, die nicht in `app/sitemap.ts` aufgenommen und nicht per `robots.txt` gesperrt wird. Medienbudget: `sharp@0.35.4` ist bereits transitiv über `next@16.3.4` installiert; 21 Dateien in `public/` überschreiten 150 KB, davon sind die meisten ungenutzt, aber zwei der per Umschalter ausgelieferten Originalaufnahmen (`dashboard-original.png` 165 KB, `zeiten-original.png` 204 KB) verletzen das Budget im Seitenaufruf.

**Primäre Empfehlung:** Drei parallel planbare Arbeitspakete (Produktwahrheit mit Preis-Snapshot und Paritätstest; Keyword-Map mit Skript, Rohdaten und Kannibalisierungstest; Designbausteine mit Musterseite und Medienbudget), danach ein gemeinsames Abschlusspaket (lokale Prüfungen, Ship-Gate, Push auf `main`, Vercel-Deployment abwarten, `npm run indexnow`, Live-Prüfung).

## Architectural Responsibility Map

| Fähigkeit | Primäre Ebene | Sekundäre Ebene | Begründung |
|-----------|---------------|-----------------|------------|
| Produktfakten (Funktionen, Preise, Ankündigungen) | Build-Zeit-Datenmodule (`craftos/lib/*.ts`) | Statisch gerenderte Seiten, `llms.txt`-Route, JSON-LD | Eine Quelle speist Seiten, `llms.txt` und Schema; keine Laufzeitabfrage der Produkt-Repos |
| Abgleich mit Produkt-Repos | Lokales Node-Skript (Entwicklerrechner) | Eingecheckter JSON-Snapshot | Produkt-Repos liegen nur lokal; Tests dürfen weder Netz noch CI brauchen |
| Keyword-Daten | Lokales Node-Skript gegen SE Ranking API | Eingecheckter Rohdatenabzug, typisiertes Modul | Schlüssel bleibt lokal; Build und Tests laufen ohne API |
| Keyword-Zuordnung je Seite | Datenmodul `lib/keyword-map.ts` | Vitest gegen `app/sitemap.ts` | Zuordnung ist redaktionell, Prüfung maschinell |
| Designbausteine v2 | React Server Components + CSS-Module | Client Component nur für optionale Bewegung | Statische Darstellung ohne JS bleibt bei Reduced Motion und ohne Hydration sichtbar |
| Musterseite | Next.js App Router Route `/styleguide` (statisch) | `metadata.robots` | Prüfbar im Browser, nicht indexiert, nicht in Sitemap |
| Bildauslieferung | CDN/Static (`public/`, Vercel) | `next/image`-Optimierer (`/_next/image`) | Direkte Dateien müssen selbst im Budget liegen; optimierte Bilder werden im Browser gemessen |
| Bildbudget-Prüfung | Vitest (Dateien) | Playwright (übertragene Bytes, CLS) | Datei- und Laufzeitsicht ergänzen sich |
| Indexierungsmeldung | Lokales Skript `scripts/indexnow-submit.mjs` nach Deployment | Vercel Git-Integration (Deployment bei Push auf `main`) | IndexNow liest die Live-Sitemap, darf erst nach erfolgreichem Deployment laufen |

## Project Constraints (aus CLAUDE.md und AGENTS.md)

- **Design-Kaskade für jede Frontend-Arbeit:** 1. `/frontend-design` (Pflicht, Hauptwerkzeug für Code), 2. `ui-ux-pro-max` Design-System (`py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --design-system -p "CraftOS"`), 3. 21st.dev **nur** `21st_magic_component_inspiration` (nie builder/refiner), 4. Context7 für Framework-Doku, 5. SEO-Check (semantisches HTML, Schema, Barrierefreiheit). Die Musterseite und alle Bausteine fallen darunter.
- **Plugins nicht umgehen oder kopieren;** Skills über offizielle Einstiegspunkte aufrufen.
- **Code-Standards:** TypeScript strict, keine `any`, Interfaces für Datenstrukturen, semantisches HTML, WCAG (Alt-Texte, Tastatur, Kontrast ≥ 4,5:1), Next.js Image mit `sizes`, `next/font`.
- **Schema-Markup ist Pflicht** auf indexierten Seiten; die Musterseite ist nicht indexiert und braucht keines.
- **KI-Crawler nicht blockieren** (robots.txt erlaubt GPTBot/Google-Extended/anthropic-ai; aktuell `app/robots.ts` mit `*` erlaubt).
- **Credentials nie committen oder ausgeben;** nur Variablennamen nennen (`SE_RANKING_API_KEY`).
- **Produktbehauptungen gegen die tatsächliche Implementierung prüfen** (AGENTS.md); fehlende Zugänge benennen statt Ergebnisse zu erfinden (DataForSEO-Zugang fehlt; Quelle ist SE Ranking).
- **Globale Regel 5 (schlägt Projektdoku):** Tests und Verifikation ausschließlich lokal; GitHub Actions sind kein Beleg; vor jedem Push `gh workflow list --all` prüfen. Das Repo hat aktuell kein `.github/workflows` (geprüft), ein Push auf `main` löst nur das Vercel-Deployment aus.
- **Globale Regel „Laptop zuerst“:** schwere Läufe (volle Testsuite, Build, E2E) gemäß Koordinationszentrale einreichen. Für das Website-Repo existiert kein passendes Rezept (die Rezepte `web-*`/`mobile-*` betreffen die Produkt-Repos) – diese Lücke im Plan benennen und lokal mit höchstens einem schweren Prozess prüfen.
- **`ship-gate`** ist immer der letzte Schritt vor Commit/Push; Ultra-Review nie automatisch.
- **Gemeinsame Übergabe:** `C:/Users/badal/Documents/AgentShared/skills/agent-handoff/SKILL.md` bei Beginn lesen, nach Entscheidungen Übergabe hinterlegen.
- **Next.js 16 / React 19 / Tailwind 4 bleiben** (PROJECT.md Constraints); öffentliche Marke CraftOS, Ansprache „Sie“; keine Portal-Onlinezahlungen, keine pauschalen Offline-Versprechen, keine unbelegte DATANORM-v5-Kompatibilität, kein automatisches Verbuchen durch KI bewerben.

## Standard Stack

### Core (alles bereits installiert – keine neuen Laufzeit-Abhängigkeiten nötig)

| Bibliothek | Version (installiert) | Zweck | Begründung |
|------------|----------------------|-------|------------|
| next | 16.3.4 [VERIFIED: craftos/node_modules] | App Router, Metadata-API, `next/image` | Bestehender Stack, `metadata.robots` für `noindex` |
| react / react-dom | 19.2.7 [VERIFIED: craftos/node_modules] | Komponenten | Bestand |
| tailwindcss + @tailwindcss/postcss | 4.3.0 [VERIFIED] | CSS-first Tokens via `@theme` | Bestand, Tokens in `app/globals.css` |
| lucide-react | 0.475.0 [VERIFIED] | Icons für Funktionskarten, Schritte | Bereits in `lib/funktionen.ts` je Funktion als `icon` hinterlegt |
| vitest | 5.0.0 [VERIFIED] | Unit-/Paritäts-/Map-Tests (`tests/**/*.test.ts`, node) | Bestand |
| @playwright/test | 1.63.0 [VERIFIED] | Browserprüfung 1440 und 390-touch, Chromium/WebKit | Bestand, Browser lokal unter `%LOCALAPPDATA%/ms-playwright` |
| @axe-core/playwright | ^4.13.0 [VERIFIED: package.json] | Barrierefreiheit der Musterseite | Bestand, in `scripts/visual-audit.mjs` genutzt |
| sharp | 0.35.4 (transitiv über next) [VERIFIED: `npm ls sharp`] | Einmalige Konvertierung JPG/PNG → AVIF/WebP, Bildmaße auslesen | Bereits vorhanden; keine Neuinstallation nötig |

### Nicht verwenden / nicht installieren
| Statt | Nicht | Grund |
|-------|-------|-------|
| sharp (transitiv) | `npm install sharp@latest` | Neueste Version 0.35.5 vom 27.09.2026 wird vom Legitimitäts-Check als „too-new“ markiert; die installierte 0.35.4 genügt |
| eigene Fetch-Skripte mit Node 24 `fetch` | axios, got, SDKs | Node 24.12 hat `fetch`, `AbortSignal.timeout` |
| Vitest-Parität gegen Snapshot | Laufzeitabruf aus GitHub/Supabase | Tests dürfen kein Netz brauchen; Regel 5 |
| `metadata.robots` | `robots.txt`-Disallow für `/styleguide` | Disallow verhindert, dass Crawler das `noindex` sehen |

**Installation:** Keine. Falls `sharp` als direkte Dev-Abhängigkeit deklariert werden soll, exakt die installierte Version festschreiben (`npm install -D sharp@0.35.4 --save-exact`) und dafür einen `checkpoint:human-verify` einplanen (siehe Audit).

## Package Legitimacy Audit

| Paket | Registry | Alter | Downloads | Quell-Repo | Verdict | Disposition |
|-------|----------|-------|-----------|------------|---------|-------------|
| sharp | npm | Projekt seit 2013, neueste Version 0.35.5 vom 27.09.2026 | 71,4 Mio./Woche | github.com/lovell/sharp | [SUS] (Grund: „too-new“ für die neueste Version; kein postinstall) | Nicht neu installieren; vorhandene 0.35.4 aus `next` nutzen. Nur bei expliziter Deklaration `checkpoint:human-verify` |

**Entfernte Pakete ([SLOP]):** keine
**Markierte Pakete ([SUS]):** `sharp` [WARNING: flagged as suspicious — verify before using.] – der Hinweis betrifft ausschließlich die sehr junge neueste Version; die bereits über `next@16.3.4` installierte 0.35.4 wird ohne Installation genutzt.

## Produktwahrheit: Funktions-Delta (PROD-02, PROD-04)

**Quellen:** Web `C:/Projekte/craft-connect-buddy` `origin/release` = `07cf0645517b81fa39c8644e3c9c84904f789bc4` (`v4.0.0-test.238`); Mobile `C:/Projekte/CraftOS - Mobile/craftos-mobile` `origin/release` = `5610a06415361f5c5a01c90258352ed7f49b7bab` (`mobile-v1.0.0-test.93`). Alle Pfade unten mit `git ls-tree`/`git show` an diesen Commits geprüft [VERIFIED: git]. „Live“ bedeutet: im Release-Code vorhanden, geroutet und nicht durch Feature-Flag oder „Bald verfügbar“ gesperrt.

### A. Die 16 Funktionen der Website (`craftos/lib/funktionen.ts`)

| Funktion (Slug) | Live Web / Mobile (Beleg @Commit) | Heute auf Website | Aktion |
|---|---|---|---|
| dashboard | Web `src/pages/Dashboard.tsx`; Mobile `src/features/dashboard/screens/DashboardScreen.tsx` | ja, `platforms: ["web"]` | behalten; Belege aktualisieren; Mobile optional ergänzen |
| projektverwaltung | Web `src/pages/Projekte.tsx`, `ProjectDetail.tsx`; Mobile `projects/screens/*` (inkl. `CreateProjectScreen`) | ja | behalten, Belege aktualisieren |
| angebote | Web `src/pages/DocumentEditorPage.tsx`, `src/pages/QuoteSigning.tsx`, `src/components/DocumentEditor/GAEBImportDialog.tsx`, `GAEBExportDialog.tsx`, `src/components/documents/DatanormImportDialog.tsx`; Mobile `documents/screens/DocumentSignScreen.tsx` | ja | behalten; Register um Angebotsunterschrift online, GAEB-Export ergänzen (Detailtexte Phase 7) |
| rechnungen | Web `src/pages/Rechnungen.tsx`, Mahnwesen `src/pages/settings/MahnwesenSettings.tsx`, `src/api/reminders.ts`, `supabase/functions/send-invoice-reminders` | ja | behalten; Mahnwesen als Teilfunktion ins Register |
| e-rechnung | Web `supabase/functions/generate-einvoice/index.ts` | ja | behalten |
| buchhaltung | Web `src/pages/Buchungsjournal.tsx`, `SteuerberaterExport.tsx`, `Bankumsaetze.tsx`, `Zahlungseingaenge.tsx`, `SteuerCockpit.tsx` | ja | behalten; Bankabgleich/Zahlungseingänge ins Register |
| eingangsrechnungen | Web `src/pages/Eingangsrechnungen.tsx`; Mobile `supplier-invoices/screens/ScanReceiptScreen.tsx` | ja | behalten |
| plantafel | Web `src/pages/Plantafel.tsx`, `Einsaetze.tsx`, Terminplanung `src/components/plantafel/ProjectGanttView.tsx`, `src/api/projectPhases.ts`; Mobile `assignments/screens/*` | ja | behalten; Terminplanung (Gantt/Abschnitte) ins Register; Begriff klären (siehe Offene Fragen) |
| zeiterfassung | Web `src/pages/Zeiten.tsx`; Mobile `time-tracking/screens/TimeTrackingScreen.tsx` | ja | behalten |
| lager | Web `src/pages/Lager.tsx`, Wareneingang `src/api/goodsReceipt.ts`; **Mobile neu** `inventory/screens/InventoryScanScreen.tsx`, `InventoryScreen.tsx` (Route `inventory/scan`, `AppRoot.tsx:144-148`) | ja, `platforms: ["web"]` | `platforms` um `mobile` ergänzen, Mobile-Beleg aufnehmen. `docs/SNIPPET-DESIGN.md:29` („native App besitzt keine Lagerbuchung“) ist überholt – nicht mehr als Wahrheit verwenden |
| baudokumentation | Mobile `construction-reports/screens/DailyReportScreen.tsx`, `defects/screens/DefectsScreen.tsx`, `acceptance/screens/AcceptanceScreen.tsx`, `AcceptanceProtocolsScreen.tsx`, **neu** `site-visit/screens/SiteVisitScreen.tsx`; Web `src/api/acceptance.ts`, `acceptanceScopes.ts` (Teilabnahme), `src/api/defects.ts`, `src/lib/besichtigung.ts` | ja | behalten; Besichtigung, Bautagesbericht, Mängel, Abnahme/Teilabnahme als Teilfunktionen ins Register |
| aufmass | Web `src/api/roomMeasurements.ts`; Mobile `room-measurements/screens/RoomMeasurementsScreen.tsx` | ja | behalten |
| arbeitsanweisungen | Web `src/api/workInstructions.ts`; **Mobile** `src/features/work-steps/components/WorkStepsSection.tsx` | ja, `platforms: ["web"]` | `platforms` um `mobile` prüfen/ergänzen (Arbeitsschritte in der App) |
| team | Web `src/pages/Mitarbeiter.tsx`; Mobile `vacation/components/VacationTab.tsx` | ja | behalten |
| nachkalkulation | Web `src/lib/calculationUtils.ts`, `ProjectDetail.tsx` | ja | behalten |
| kundenportal | Web `src/pages/portal/*` (8 Seiten), Einladung `src/components/customers/CustomerPortalInviteDialog.tsx`, `CustomerPortalAccessCard.tsx`, `src/api/customerPortalInvites.ts` – **ohne Feature-Flag**; Onlinezahlung aus: `src/components/portal/InvoicePayment.tsx:159` `PORTAL_ONLINE_PAYMENT_ENABLED = false` | ja, `upcoming: true` → `tier: "launch"`, „In Prüfung“ | **Inhaber bestätigen lassen** (Code spricht für live); bis dahin Status lassen, Onlinezahlung weiter ausschließen |

Alle 57 heute im Register genannten Belegpfade (36 Web, 21 Mobile) existieren an den beiden Release-Commits [VERIFIED: `git cat-file -e`]. Das `productBasis`-Objekt (`lib/product-register.ts:4-19`) muss auf `ref: "origin/release"`, Tag und Commit beider Repos und `checkedAt: "2026-10-20"` umgestellt werden; `checkedAt: "2026-09-09"` steht außerdem in `lib/funktionen.ts:661`, `lib/site.ts:17` und `app/sitemap.ts` (`lastModified`).

### B. Live, aber noch nicht auf der Website (für Register jetzt, für Seiten Phase 7)

| Funktion | Beleg @Release | Plattform |
|---|---|---|
| Mahnwesen | Web `src/pages/settings/MahnwesenSettings.tsx`, `src/api/reminders.ts`, `src/components/invoices/ReminderHistory.tsx` | Web |
| Bankabgleich / Zahlungseingänge | Web `src/pages/Bankumsaetze.tsx`, `src/pages/Zahlungseingaenge.tsx`, `src/components/eingangsrechnungen/ExpensePaymentReconciliationPanel.tsx` | Web |
| Terminplanung (Bauphasen/Arbeitsabschnitte, Gantt) | Web `src/components/plantafel/ProjectGanttView.tsx`, `GanttDependencyLayer.tsx`, `src/api/projectPhases.ts` | Web |
| Abnahme / Teilabnahme | Web `src/api/acceptanceScopes.ts`, `acceptanceProtocols.ts`; Mobile `acceptance/screens/*` | Web + Mobile |
| GAEB-Import/-Export, DATANORM-Import | Web `src/lib/gaeb/gaebParser.ts`, `GAEBExportDialog.tsx`, `src/api/datanormCatalogs.ts` | Web |
| Datenübernahme | Web `src/pages/Datenimport.tsx` (Route `/daten-uebernehmen`) | Web |
| Angebotsunterschrift (online) | Web `src/pages/QuoteSigning.tsx` (Route `/angebot-unterschreiben`), `src/api/quoteSigning.ts` | Web |
| Lager-Scan / Wareneingang | Mobile `inventory/screens/InventoryScanScreen.tsx`; Web `src/api/goodsReceipt.ts`, `src/hooks/useAnalyzeGoodsReceipt.ts` | Web + Mobile |
| Besichtigung | Mobile `site-visit/screens/SiteVisitScreen.tsx`; Web `src/lib/besichtigung.ts` | Web + Mobile |
| Bautagesbericht | Mobile `construction-reports/screens/DailyReportScreen.tsx` | Mobile (+ Web-Ansicht) |
| Mängel | Mobile `defects/screens/*`; Web `src/components/projects/bauakte/DefectsBoard.tsx` | Web + Mobile |
| Projekt-Chat und Nachrichten | Mobile `chat/screens/ChatScreen.tsx` (Route `projects/:id/chat`), `messages/screens/InboxScreen.tsx`, `DirectChatScreen.tsx` | Mobile |
| 21 Sprachen (Mobile) | Mobile `src/shared/i18n/locales/` mit 21 Ordnern: bg, bs, cs, de, el, en, es, fr, hr, hu, it, pl, pt, ro, ru, sk, sq, sr-cyrl, sr-latn, tr, uk | Mobile |
| Kunden in der App | Mobile `customers/screens/*` | Mobile |
| Vorhersagen | Web `src/pages/Vorhersagen.tsx` (Sidebar „Vorhersagen“, `AppSidebar.tsx:72`) | Web – vor Bewerbung Umfang prüfen |

### C. Nicht live – nirgends als verfügbar darstellen

| Funktion | Beleg @Web-Release |
|---|---|
| Telefon-Agent | Kein Code: Suche nach `telefon-agent|phone agent|voice agent` in `src` und `supabase/functions` findet nur Abrechnungs-/Sprachassistenz-Hilfen (`_shared/elevenLabsBilling.ts`, `voice-assistant-usage`), keine Telefonie [VERIFIED: git grep] |
| Offener MCP-Server | Kein MCP-Server-Code (Treffer nur in Tests/`embed-text`/`warehouse.ts`-Kommentaren) [VERIFIED: git grep] |
| KI-Agent / weitere Agent-Aktionen | `src/pages/KiAgent.tsx`: nur für Plattform-Entwickler, sonst „Bald verfügbar“; `AppSidebar.tsx:350-360` „KI-Agent – Bald verfügbar“ |
| Videoanalyse (Web) | `src/lib/ai/availability.ts`: `isAiFeatureAvailable('video') === false`, Label „Bald verfügbar“ |
| Subunternehmer-Portal-Einladungen | `src/lib/featureFlags.ts:15` `subcontractorPortalInvites: false` |
| Portal-Onlinezahlung | `src/components/portal/InvoicePayment.tsx:159` `PORTAL_ONLINE_PAYMENT_ENABLED = false` |

### D. Fundstellen der veralteten Ankündigungen (PROD-04)

| Datei:Zeile | Inhalt | Aktion |
|---|---|---|
| `craftos/lib/funktionen.ts:666-683` | `upcomingFeatures` mit `when: "Geplant: September / Anfang Oktober 2026"` bzw. „September 2026“ | `when` entfernen, Feld `status: "in Entwicklung"` ohne Datum; `vision`-Alias prüfen |
| `craftos/app/funktionen/page.tsx:63-84` | „Demnächst in CraftOS.“, Satz „die Zeitangaben beschreiben den aktuellen Planungsstand“, `{f.when}` | Überschrift z. B. „In Entwicklung“, Datumssatz streichen |
| `craftos/app/craft-ai/page.tsx:88-110` | „In Vorbereitung … Schon demnächst“, `{f.when}`, Satz „die Termine geben den aktuellen Planungsstand wieder“ | ohne Termine, ohne „demnächst“ |
| `craftos/app/fakten-ueber-craftos/page.tsx:~98-104` | `<strong>{f.name}</strong>: {f.when}.` | ohne `when` |
| `craftos/app/vergleich/page.tsx:~525-545` | Roadmap-Raster mit `feature.when` | ohne `when` |
| `craftos/lib/comparison.ts:261` | „Telefon-Agent geplant für September / Anfang Oktober 2026“ | Datum streichen („in Entwicklung, keine verfügbare Leistung“) |
| `craftos/content/hilfe/craft-ai-betriebsdaten-fragen.md:43` | „als ‚Demnächst‘ für September beziehungsweise Anfang Oktober 2026 geplant“ | Satz ohne Termin; `updatedAt` im Frontmatter anheben |
| `craftos/lib/product-register.ts:142-147` | `availability: "announced"`, Beleg „Termin- und Umfangsangabe … in dieser Sitzung“ | Beleg auf Release-Fundstellen aus Tabelle C umstellen, `availability: "in-development"` |

Empfehlung: Ein zentraler Typ `UpcomingFeature { name; text; status: "in-entwicklung" }` ohne Datumsfeld, damit kein Template mehr ein Datum rendern kann; zusätzlich ein Vitest, der in `app/**`, `lib/**`, `content/**` nach `Geplant:`/`(September|Oktober|November) 20\d\d` in Ankündigungskontext sucht.

## Preis-Wahrheitstabelle (PROD-03)

Quelle: `git show origin/release:src/lib/constants.ts` (Web `07cf0645`), `src/lib/subscription/pricing.ts`, `src/pages/AGB.tsx` [VERIFIED: git].

| Größe | Produkt (Datei:Zeile @07cf0645) | Website heute | Befund / Aktion |
|---|---|---|---|
| Admin/Büro monatlich | `PRICING.ADMIN_MONTHLY`/`BUERO_MONTHLY` = 29.95 (`constants.ts:36,39`) | `site.ts` `tarife[voll].monat` 29.95 | stimmt |
| Admin/Büro jährlich | `ADMIN_YEARLY`/`BUERO_YEARLY` = 299.50 (`:47,50`) | `jahr` 299.5 | stimmt |
| Jahres-Monatswert Voll | `PRICING_DERIVED.ADMIN_YEARLY_MONTHLY` = 299.50/12 = 24,958 → 24,96 | `PricingTable.tsx:94` berechnet; **`components/home/Hero.tsx:40-41` hart kodiert** „Ab 24,96 €“, „299,50 €“ | Wert stimmt, Hero aus `tarife` ableiten |
| App monatlich / jährlich | `APP_MONTHLY` 9.95, `APP_YEARLY` 99.50 (`:42,53`) | 9.95 / 99.5 | stimmt |
| Jahres-Monatswert App | 99.50/12 = 8,2917 → 8,29 | `PricingTable` berechnet | stimmt |
| Jahresrabatt | `YEARLY_DISCOUNT_PERCENT` 17; Jahr = Monat × 10 | „rund 17 %“, `annualSavingPercent` | stimmt |
| Extra-Speicher | `EXTRA_STORAGE_GB` 50, `EXTRA_STORAGE_PRICE_MONTHLY` 0.99, `EXTRA_STORAGE_PRICE_YEARLY` 9.90 (`constants.ts:93-99`) | **fehlt**; nur „erweiterter Speicher kann zusätzlich kosten“ (`PricingTable.tsx:146-150`, `app/preise/page.tsx:25,69`) | in `site.ts` aufnehmen, auf `/preise` und in `llms.txt` nennen |
| Speicher-Basis | `ORG_STORAGE_BASE_GB` 50 je Organisation (Pool) | `speicherPool` „50 GB Speicher-Pool pro Betrieb“ | stimmt; veraltete 20/10 GB je Lizenz nicht verwenden |
| Start-Credits | `ADMIN_FREE_CREDITS` 150, **einmalig**, 1 Credit = 0,01 € (`FREE_AI_CREDIT` 1.50, `constants.ts:60-72`) | **fehlt** | „150 Credits Startguthaben (einmalig)“ – nicht „monatlich“ |
| Credit-Pakete | `CREDIT_PACKAGES` 10/25/50/100 € mit 0/10/15/20 % Bonus (`pricing.ts:40-45`) | `site.ts:66-71` `creditPakete` korrekt, aber **nirgends verwendet** | auf `/preise` und in `llms.txt` ausgeben |
| Abrechnung KI | Nur Prepaid, kein Monatskontingent, keine Nachabrechnung (`pricing.ts:7-8`) | „nach Verbrauch über Credits abgerechnet“ | Formulierung „im Voraus gekaufte Credits“ angleichen |
| Netto | AGB § 5: „netto zzgl. der jeweils geltenden gesetzlichen Mehrwertsteuer“ (`AGB.tsx:66`); `VAT_RATE` 0.19 | `PricingTable.tsx:121`, `llms.ts:13` „netto“ | stimmt; Schema ergänzen (`priceSpecification.valueAddedTaxIncluded: false`) |
| Testphase | AGB § 4: „zehn Kalendertage … keine Zahlungsmethode erforderlich“ (`AGB.tsx:57`) | `site.trialDays` 10, `zahlung.trial` | stimmt |
| Mindestlizenz | Admin „Required, 1 per organization“ (`constants.ts:35`) | „mindestens eine Voll-Lizenz“ | stimmt |
| Lizenzname | Admin, Büro, App | `site.ts` „Voll-Lizenz“/„App-Lizenz“; `PricingTable.tsx:60` „Volllizenz“/„Mobile Lizenz“; `Hero.tsx:34` „Volllizenz inklusive Handy App“ | **uneinheitlich** – auf eine Schreibweise festlegen (Empfehlung „Voll-Lizenz (Admin oder Büro)“, „App-Lizenz“) |
| Schema-Offer | – | `lib/schema.ts:39` `price: "29.95"` als fester String | aus `tarife` ableiten |

**Weitere hart kodierte Preisstellen** (müssen abgeleitet oder vom Paritätstest abgedeckt werden): `app/page.tsx:26` (FAQ 29,95 €), `app/preise/page.tsx:11` (Description 29,95/9,95), `:21` (299,50/359,40/59,90/16,67 %), `:63-68` (Beispiel 69,75/697,50/58,13 – rechnerisch korrekt: 29,95 + 4 × 9,95 = 69,75; 299,50 + 4 × 99,50 = 697,50; /12 = 58,125), `app/fakten-ueber-craftos/page.tsx:33,37`, `components/home/Hero.tsx:40-41`.

## Keyword-Map (SEO-02)

### Verifizierte API-Fakten (SE Ranking Data API)

Doku [CITED: seranking.com/api/data/keyword-research/, seranking.com/api/data/domain-analysis/] und Probeaufrufe am 20.10.2026 [VERIFIED: 5 Aufrufe, alle HTTP 200].

| Endpunkt | Pflichtparameter | Wichtige Optionen | Kosten | Antwortfelder |
|---|---|---|---|---|
| `POST /v1/keywords/export?source=de` | Body `{"keywords":[…]}` (1–5.000) | `sort` (volume/cpc/difficulty/competition), `sort_order`, `history_from`/`history_to` | 100 Units je Anfrage | `is_data_found, keyword, volume, cpc, competition, difficulty, intents, history_trend` (keine `serp_features`) |
| `GET /v1/keywords/related` | `source, keyword` | `limit` (Std. 100), `offset`, `sort`, `sort_order`, `history_trend`, Filter | **10 Units je zurückgegebenem Keyword** | `total, keywords[{keyword, volume, cpc, difficulty, competition, serp_features, relevance, intents, history_trend}]` |
| `GET /v1/keywords/similar` | `source, keyword` | wie related | 10 Units je Keyword | wie related ohne `relevance` |
| `GET /v1/keywords/questions` | `source, keyword` | wie related | 10 Units je Keyword | wie similar |
| `GET /v1/keywords/longtail` | `source, keyword` | `limit`, `offset` | 1 Unit je Keyword | `total, keywords: string[]` (ohne Kennzahlen) |
| `GET /v1/domain/overview/db` | `source, domain` | `with_subdomains` | 100 Units | `organic{keywords_count, traffic_sum, top1_5…}` |
| `GET /v1/domain/keywords` | `source, domain` oder `url` | `type`, `limit` (max 1000), `page`, `order_field` (traffic/volume/position/difficulty…), `order_type`, `filter[volume][from]`, `filter[position][to]`, `filter[intents]` | 100 Units | `keyword, position, prev_pos, volume, cpc, competition, difficulty, url, traffic, traffic_percent, intents, serp_features, …` |
| `GET /v1/domain/competitors` | `source, domain` | `type` | 100 Units | `domain, common_keywords, total_keywords, missing_keywords, traffic_sum` |
| `GET /v1/domain/keywords/comparison` | `source, domain, compare` | `diff=1` (Lücke), `limit` (≤1000), `order_field`, Filter | 100 Units | `keyword, volume, difficulty, position, compare_position, compare_url, intents, …` |
| `GET /v1/account/subscription` | – | – | ohne Kosten beobachtet | `subscription_info{status, expiraton_date, units_limit, units_left}` |

- Filter immer in Klammernotation (`filter[difficulty][to]=20`), **nicht** `difficulty_to` [CITED].
- Intent-Codes: `I, N, T, C, L` [CITED]; Bedeutung I = informational, N = navigational, T = transactional, C = commercial; L vermutlich „local“ [ASSUMED].
- Probe-Ergebnisse: `related` für „bautagebuch app“ mit `filter[difficulty][to]=20`, `limit=2` liefert `total: 28` (u. a. „app bautagebuch“ 590/KD 7, „bautagebuch digital“ 210/KD 13); `longtail` für „handwerkersoftware“ liefert `total: 180` Strings; `questions` für „aufmaß app“ liefert 0 (kurze Produkt-Seeds liefern kaum Fragen – Fragen mit Themen-Seeds wie „aufmaß“, „bautagebuch“, „schlussrechnung“ abfragen); `domain/keywords` für craftos.eu: ein Keyword („craftview software gmbh“, Position 58) – bestätigt D-06.
- Kontingent beim ersten Probeaufruf: 98.400 von 100.000 Units, Ablauf `2026-11-03 17:22:59`. Der Wert änderte sich nach den Probeaufrufen nicht sofort (Abrechnung möglicherweise verzögert) – das Skript muss den Verbrauch selbst schätzen und vor großen Läufen `/account/subscription` abfragen.
- Ratenlimit: HTTP 429 bei schnellen Folgeaufrufen (CONTEXT); mit 1,6 s Pause liefen alle Probeaufrufe ohne 429.
- `.env` liegt im Repo-Root (`C:/Projekte/Websitenerstellung/.env`, gitignored über `.gitignore:7`), nicht in `craftos/`. Enthält nur `SE_RANKING_API_KEY`; DataForSEO-Zugangsdaten fehlen.

### Unit-Budget (Empfehlung, Obergrenze ≈ 30.000 Units)

| Schritt | Aufrufe | Kosten |
|---|---|---|
| `related` für ~25 Seed-Begriffe (je Seite/Cluster), `limit=50`, `filter[volume][from]=30` | 25 | ≤ 12.500 |
| `questions` für ~15 Themen-Seeds, `limit=30` | 15 | ≤ 4.500 |
| `longtail` für 10 Seeds, `limit=100` | 10 | ≤ 1.000 |
| `domain/keywords` für 7 Wettbewerber (D-06), `limit=1000`, `filter[volume][from]=30` | 7–14 | 700–1.400 |
| `domain/keywords/comparison` mit `diff=1` gegen craftos.eu | 7 | 700 |
| `keywords/export` aller Kandidaten (≤ 5.000 je Anfrage) | 1–3 | 100–300 |
| Reserve für Nachläufe | – | ~10.000 |

### Seiteninventar (Basis für „genau ein Hauptkeyword je Seite“)

`app/sitemap.ts` erzeugt **125 URLs** [VERIFIED: Codebasis]: 15 Kernseiten (`/`, `/funktionen`, `/gewerke`, `/app`, `/craft-ai`, `/preise`, `/gobd`, `/vergleich`, `/fakten-ueber-craftos`, `/support`, `/blog`, `/hilfe`, `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation`), 3 Rechtsseiten (`/agb`, `/datenschutz`, `/impressum`), 16 Funktionsseiten (`lib/funktionen.ts`), 12 Gewerke (`elektriker, shk, maler, fliesenleger, trockenbau, tischler-schreiner, dachdecker, zimmerer, galabau, metallbau, bauunternehmen, allrounder`), 15 Kategorieseiten (6 Blog, 9 Hilfe aus `lib/content-types.ts`), 24 Ratgeber und 40 Hilfeartikel (`content/blog`, `content/hilfe`).

Geplante Seiten (Status `geplant`, Phase-Zuordnung): vier Alternativen-Seiten `/vergleich/plancraft-alternative`, `/vergleich/craftnote-alternative`, `/vergleich/hero-alternative`, `/vergleich/tooltime-alternative` (Phase 8); neue Funktionsseiten bzw. Abschnitte für Tabelle B (Phase 7); Hilfeartikel-Lücken nach plancraft-Muster (Schlussrechnung, Leistungszeitraum, Regiebericht, Bautagesbericht, Aufmaß – Phase 9).

Vorläufige Zuordnung aus D-06 (nur zur Orientierung; Zahlen beim Lauf neu ziehen und mit Quelle versehen):

| Keyword (Vol./KD aus D-06) | Kandidatenseite | Hinweis |
|---|---|---|
| handwerkersoftware 1.300/55 | `/` | „handwerker software“ ist Schreibvariante – nicht zusätzlich als Hauptkeyword vergeben (Kannibalisierung) |
| bautagebuch app 590/7 | `/funktionen/baudokumentation` oder neue Seite (Phase 7) | Konflikt mit `/blog/digitale-bautagesberichte` und `/hilfe/bautagesbericht-erstellen` vermeiden: unterschiedliche Intents (T vs. I) wählen |
| aufmaß app 590/12 | `/funktionen/aufmass` | Ratgeber `aufmass-angebot-mengen-abzuege` bekommt informationales Keyword |
| zeiterfassung handwerk 390/12 | `/funktionen/zeiterfassung` | Ratgeber `projektbezogene-zeiterfassung` abgrenzen |
| handwerker stundensatz 320/6 | `/rechner/stundensatz` | Ratgeber `stundenverrechnungssatz-berechnen` abgrenzen |
| baustellen app 260/15 | `/app` | – |
| rechnungssoftware handwerker 210/18 | `/funktionen/rechnungen` | – |
| shk software 210/7, maler software 140, trockenbau software 140 | `/gewerke/shk`, `/gewerke/maler`, `/gewerke/trockenbau` | – |
| digitale bauakte 170/7 | `/funktionen/baudokumentation` oder `/blog/digitale-projektakte` | genau eine Seite wählen |
| auftragsverwaltung software 170/9 | `/funktionen/projektverwaltung` | – |
| gaeb software 140/18 | Lücke (neue Seite/Abschnitt Phase 7) | `/hilfe/gaeb-importieren` informational |
| plancraft 9.900, hero software 5.400, tooltime 4.400, craftnote 3.100 | Alternativen-Seiten (Phase 8) | Markenbegriffe als „<marke> alternative“ zuordnen |

### Empfohlenes Datenformat

```
craftos/
├── lib/keyword-map.ts            # typisierte Zuordnung je Pfad (Quelle für Tests, später Metadaten)
├── docs/seo/KEYWORD-MAP.md       # lesbare Tabelle, Methode, Lücken für Phasen 6–9
├── docs/seo/data/2026-10-2x/     # Rohantworten je Aufruf (ohne Schlüssel) + manifest.json
└── scripts/keyword-research.mjs  # reproduzierbarer Abruf mit Drosselung, Cache, Kostenschätzung
```

`docs/seo/data/` liegt außerhalb von `public/` und wird nicht ausgeliefert. Rohdaten der Wettbewerber-Abfragen können pro Domain einige Hundert KB groß sein; `limit` und `filter[volume][from]` begrenzen die Größe.

## Designbausteine v2 (DESIGN-02, DESIGN-04, MEDIA-03, MEDIA-04)

### Bestandsinventar

| Bestand | Ort | Nutzen für v2 |
|---|---|---|
| Tokens: `primary-50…900` (Amber, `primary-500 #f2af38`), `ink-50…950`, `success/warning/destructive`, `cta*`, `node-*`, `--font-display` (Clash), `--font-sans` (General Sans), `--font-mono` | `app/globals.css` erstes `@theme` (≈ Z. 1-40), zweites `@theme` überschreibt `ink-100 #f7f3eb`, `primary-50 #fff4d9` | Basis bleibt; v2 ergänzt nur Abstands-/Radius-/Schatten-Tokens (`--radius-tile`, `--shadow-tile`, `--space-section`) |
| Globale Klassen `.site-container .section-space .dark-section .eyebrow .section-title .section-intro .btn-cta .btn-secondary .text-link .feature-grid .feature-link .split-section .rule-list .soft-panel .notice .home-flow .home-features` | `app/globals.css:102-566` | Abschnittskopf, Buttons, Schrittfolge (`.home-flow`) als Vorlage |
| Reduced Motion global: `animation-duration/transition-duration: 0.01ms !important`, `scroll-behavior: auto` | `app/globals.css:370-381` | Grundschutz für DESIGN-04; Bausteine dürfen Inhalte nie per Animation ein-/ausblenden, die ohne Animation unsichtbar bleiben |
| `PhoneFrame` (194 × 410), `WebFrame`, `DeviceBridge` | `components/feature-snippet/DeviceFrame.tsx` + `.module.css` | Statische Geräterahmen ableiten; Tab-Leiste korrigieren (siehe unten) |
| `FeatureSnippet` (Client, `reduced` initial `true`, IntersectionObserver, Sichtbarkeits-Pause, Pause-Button) | `components/feature-snippet/FeatureSnippet.tsx` | Muster für optionale Bewegung: SSR zeigt Endzustand, Animation nur bei sichtbarem Element und ohne Reduced Motion |
| `IllustrationScene`, `ConnectedScene`, `SupplementalScene` | `components/feature-snippet/*` | Szenen-Inhalte (fiktive Beispieldaten) wiederverwendbar; Animationen in Phase 5 nicht ausbauen |
| `PageHero`, `TrialCta`, `Faq`, `StoreLinks`, `GewerkIcon`, `MobileAppGallery` | `components/ui/*` | `Faq` (details/summary) und `TrialCta` bleiben; `MobileAppGallery` zeigt `picture` mit AVIF/WebP |
| Vergleichstabellen `priceTable`, `featureTable` | `app/vergleich/page.tsx:296,369,464`, `app/vergleich/Comparison.module.css` | Vorlage für generische `ComparisonTable` |
| `PricingTable` | `components/preise/PricingTable.tsx` | bleibt; Preise kommen aus `tarife` |
| Keyframes nur in `ConnectedScene.module.css:77` (`scan`) und `FeatureSnippet.module.css:24` (`click`) | – | keine globale Scroll-Animation vorhanden (Relaunch-Entscheidung, `docs/RELAUNCH-ABNAHME.md:49`) |

### Benötigte Bausteine und Wiederverwendung

| Baustein | Wiederverwendung | Neu | Hinweis |
|---|---|---|---|
| Abschnittskopf `SectionHeader` (Eyebrow, H2, genau ein Einleitungssatz) | Klassen `.eyebrow/.section-title/.section-intro` | Komponente | Prop `intro: string`; DESIGN-01 (Phase 6) verlangt „ein Satz Einleitung“ |
| Kachel-/Bento-Raster `BentoGrid` + `BentoTile` (Größen `sm/md/lg/wide`, optionaler Bild-Slot) | – | Komponente + CSS-Modul mit CSS Grid | Mobile 1 Spalte, ab 768 px 2, ab 1024 px 4 Spalten; Kacheln als `<article>` mit Überschrift |
| Schrittfolge `StepFlow` | `.home-flow` | Komponente | Semantisch `<ol>`; horizontal ab 1024 px, sonst vertikal |
| Kennzahlen `KeyFacts` | – | Komponente | Werte **nur aus Datenmodulen** (`site.trialDays`, `tarife`, Sprachenzahl aus Register); jede Zahl mit Quelle → verhindert erfundene Zahlen (MEDIA-03) |
| Funktionskarte `FeatureCard` (Icon, Titel, ein Satz Nutzen, visuelles Element, Link) | `.feature-link`, `funktionen[].icon` | Komponente | Nur Funktionen mit `tier === "heute"` |
| Geräterahmen `BrowserFrame`/`PhoneFrame` statisch mit vereinfachter UI (`UiList`, `UiRow`, `UiBadge`, `UiStat`) | CSS aus `DeviceFrame.module.css` | statische Varianten ohne Cursor/Timeline | Feste `aspect-ratio`, damit kein Layout-Shift |
| Vergleichstabelle `ComparisonTable` | `Comparison.module.css` | generische Komponente | `<table>` mit `<caption>`, `scope`, Icons mit sr-Text |
| Kennzeichnung `IllustrationLabel` („Beispieldarstellung“ bzw. „Darstellung, KI-gestaltet“) | – | Komponente | MEDIA-03/D-04 |
| Bild `MediaFigure` (Wrapper um `next/image` mit Pflicht-`width/height/sizes/alt`) | `next/image` | Komponente | MEDIA-04 |
| Videoplayer | – | **nicht bauen** | DESIGN-02 nennt ihn, aber Videos sind Out of Scope (MEDIA-02, Inhaber 20.10.2026); auf der Musterseite als entfallen vermerken |

**Gefundene MEDIA-03-Abweichungen im Bestand:**
- `components/feature-snippet/DeviceFrame.tsx:10` Tab-Leiste „Einsätze, **Zeit**, Projekte, Mehr“; im Mobile-Release heißt der Tab „**Zeiten**“ (`src/shared/i18n/locales/de/common.json` `nav.time`), Reihenfolge für Mitarbeitende `assignments, time, projects, more` (`src/shared/lib/navigation.ts:61-63,50`) [VERIFIED: git].
- `components/ui/MobileAppGallery.tsx:79` „Aktuelle Appaufnahme im Handy-Mockup“: Aufnahmen stammen vom 09.09.2026 (Mobile `9e6260d`) und sind KI-gerahmt (`docs/MOBILE-MOCKUPS.md`). „Aktuelle“ ist nicht mehr zutreffend; Kennzeichnung sollte „Darstellung“ enthalten und das Aufnahmedatum nennen.

**ui-ux-pro-max** (in dieser Recherche ausgeführt, Query „saas construction trades software bento product-focused“): Empfiehlt Flat Design, Bento-Grid, Übergänge 150–200 ms, keine Emojis als Icons, sichtbare Fokuszustände, `prefers-reduced-motion`. **Nicht übernehmen:** Palette (#3B82F6/#F97316), Schriften (Rubik/Nunito Sans) und Muster „Horizontal Scroll Journey“ – widersprechen D-08 (Marke bleibt, keine globale Scroll-Animation). Der Plan muss den Lauf mit `--design-system -p "CraftOS"` im Rahmen der Kaskade wiederholen und diese Abweichungen dokumentieren.

### Musterseite `/styleguide`
- Route `craftos/app/styleguide/page.tsx` (Server Component), `metadata` = `pageMetadata(...)` plus `robots: { index: false, follow: false }` → rendert `<meta name="robots" content="noindex, nofollow">` [CITED: nextjs.org/docs/app/api-reference/functions/generate-metadata, Stand 19.08.2026].
- Nicht in `app/sitemap.ts` eintragen (die Liste ist manuell, Z. 12-28), nicht in `llms.ts`, nicht in Header/Footer verlinken.
- **Nicht** per `app/robots.ts` sperren: ein Disallow verhindert, dass Suchmaschinen das `noindex` lesen [ASSUMED: gängige Google-Empfehlung, nicht in dieser Sitzung geprüft].
- Optional zusätzlich Header `X-Robots-Tag: noindex` über `next.config.js` `headers()` für `source: "/styleguide"`.
- `scripts/route-audit.mjs` liest nur Sitemap-URLs; die Musterseite wird dort nicht erfasst. Eigene Prüfung ergänzen (HTTP 200, `noindex`-Meta vorhanden, nicht in `/sitemap.xml`).

### Medienbudget (MEDIA-04)

Bestand in `craftos/public` (61 Rasterdateien) [VERIFIED: Dateisystem]:
- **Im Seitenaufruf ausgeliefert und über Budget:** `images/mobile/current/zeiten-original.png` (204 KB) und `dashboard-original.png` (165 KB) über den „Original“-Umschalter in `MobileAppGallery.tsx:63`; `projekt-original.png` 138 KB liegt knapp darunter. `images/werkstatt-2026.webp` (168 KB) läuft über `next/image` (`app/gewerke/page.tsx`) und wird optimiert ausgeliefert – Laufzeitmessung nötig.
- **Im Budget:** `*-display.avif` 61–72 KB, `*-display.webp` 120–140 KB, `images/mobile/zeiten.webp` 56 KB, `projekte.webp` 61 KB.
- **Ungenutzt, aber öffentlich abrufbar und über Budget:** `hero-werkbank.jpg` 340 KB, `funktion-plantafel.jpg` 252 KB, `craft-ai-funken.jpg` 244 KB, `gewerk-tischler.jpg` 232 KB, `gewerk-elektriker.jpg` 228 KB, `funktion-lager.jpg` 224 KB, `gewerk-maler.jpg` 216 KB, `logo-mark.png` 212 KB, `gewerk-shk.jpg` 200 KB, `app-baustelle.jpg` 188 KB, `team-baustelle-2026.webp` 164 KB, `*-mockup.png` 1.027–1.196 KB, `*-mockup.webp` 735–873 KB; dazu `images/screenshots/` (17 Dateien, 1.032 KB gesamt, veraltet) und `images/mobile/store/` (1.220 KB). Keine Code-Referenz gefunden (`grep` über `app components lib content`).
- `icons/icon-1024x1024.png` 168 KB ist PWA-Icon – als Ausnahme führen.
- `next.config.js` setzt bereits `images.formats: ['image/avif','image/webp']`.

Empfehlung: Einmal-Skript `craftos/scripts/optimize-images.mjs` mit dem vorhandenen `sharp` erzeugt aus den Fotos, die D-02 nutzen will, AVIF (Qualität ~60) und WebP (Qualität ~75) in passender Breite (≤ 1600 px) ≤ 150 KB; Ausgangsdateien und Mockup-Master werden aus `public/` in einen nicht ausgelieferten Ordner (z. B. `craftos/media-src/`) verschoben; Originalaufnahmen für den Umschalter werden als WebP/AVIF ≤ 150 KB ausgeliefert.

## Architecture Patterns

### System-Architektur (Datenfluss)

```
 Produkt-Repos (lokal, origin/release)          SE Ranking API (HTTPS, Schlüssel aus .env)
   │  git show / git rev-parse                     │  fetch, 1,6 s Pause, 429-Backoff
   ▼                                               ▼
 scripts/sync-product-snapshot.mjs           scripts/keyword-research.mjs
   │  schreibt                                     │  schreibt Rohdaten + manifest
   ▼                                               ▼
 docs/product-pricing-snapshot.json          docs/seo/data/<datum>/*.json
 docs/product-source-snapshot.json                 │  redaktionelle Zuordnung
   │                                               ▼
   │                                         lib/keyword-map.ts ──► docs/seo/KEYWORD-MAP.md
   ▼                                               │
 lib/site.ts (tarife, credits, speicher) ◄─── Vitest: Parität Snapshot ↔ site.ts
 lib/funktionen.ts (tier, upcoming ohne Datum)     │
 lib/product-register.ts (Basis, Belege)           │  Vitest: jede Sitemap-URL genau 1 Eintrag,
   │                                               │  kein Keyword doppelt, Zahlen = Rohdaten
   ▼                                               ▼
 Seiten (SSG) · /llms.txt · JSON-LD · /sitemap.xml ◄── app/sitemap.ts
   │
   ▼
 components/v2/* ──► /styleguide (noindex, nicht in Sitemap)
   │
   ▼
 next build ─► lokale Prüfung (Vitest, Playwright 1440/390, route-audit, Budget) ─► ship-gate
   ─► git push main ─► Vercel Production Deploy ─► npm run indexnow ─► Live-Prüfung
```

### Empfohlene Struktur

```
craftos/
├── components/v2/            # SectionHeader, BentoGrid, StepFlow, KeyFacts, FeatureCard,
│                             # BrowserFrame, PhoneFrame (statisch), ComparisonTable,
│                             # IllustrationLabel, MediaFigure, jeweils *.module.css
├── app/styleguide/page.tsx   # Musterseite, noindex
├── lib/keyword-map.ts
├── lib/product-snapshot.ts   # Typen + Import des JSON-Snapshots
├── docs/product-pricing-snapshot.json
├── docs/seo/{KEYWORD-MAP.md,data/}
├── scripts/{sync-product-snapshot.mjs,keyword-research.mjs,optimize-images.mjs}
└── tests/{pricing-parity,product-register,keyword-map,announcements,media-budget,styleguide}.test.ts
    tests/e2e/design-v2.pw.cjs  # in playwright.config.cjs testMatch eintragen!
```

### Muster 1: Preis-Snapshot plus Paritätstest (ohne Netz, ohne CI)
**Was:** Ein lokales Skript liest die Produktwerte per `git show origin/release:<pfad>` und schreibt einen eingecheckten Snapshot mit Commit und Tag. Ein Vitest vergleicht `site.ts` (und abgeleitete Ausgaben wie `llms.txt` und Schema) mit dem Snapshot. Ein zweiter, optionaler Test prüft lokal, ob der Snapshot noch zum aktuellen `origin/release` passt, und wird übersprungen, wenn das Produkt-Repo fehlt.
**Wann:** Immer, wenn Website-Fakten aus einem anderen Repo stammen.

### Muster 2: Keyword-Map als typisiertes Modul mit Provenienz
**Was:** Jeder Eintrag nennt Pfad, Status (`bestehend`/`geplant`), Hauptkeyword mit Volumen, KD, Intent, Quelle (Endpunkt + Datei im Rohdatenordner) und Abrufdatum. Ausnahmen (Rechtsseiten, ggf. Kategorieseiten) sind explizit mit Begründung (`primary: null, reason`).
**Wann:** SEO-02; Phasen 6–8 lesen Titel/H1/Description-Vorgaben daraus.

### Muster 3: Statische Bausteine, Bewegung als Zusatz
**Was:** Server Components rendern den Endzustand. Bewegung nur als Hover-Übergang (150–200 ms) oder über eine kleine Client-Hülle nach dem `FeatureSnippet`-Muster (`reduced` initial `true`). Kein Inhalt hängt von einer Animation ab.
**Wann:** DESIGN-04, alle v2-Bausteine.

### Anti-Patterns
- **Preise als Literal in JSX** (`Hero.tsx:40`, `schema.ts:39`): driftet unbemerkt. Immer aus `tarife`/Snapshot ableiten.
- **Datumsfelder in Ankündigungen**: jedes Template rendert sie; Feld entfernen statt Text ändern.
- **Tests mit Netzwerkzugriff auf Produkt-Repos/GitHub**: verletzt Regel 5 und macht Tests instabil.
- **`robots.txt`-Disallow für noindex-Seiten**: Suchmaschinen sehen das `noindex` dann nicht.
- **Animation, die Inhalte initial verbirgt** (`opacity: 0` bis Observer feuert): ohne JS oder bei Reduced Motion bleiben Inhalte unsichtbar.
- **Schlüssel in Logs, Rohdaten oder Manifest**: Rohantworten enthalten keinen Schlüssel; Request-Header nie speichern.

## Don't Hand-Roll

| Problem | Nicht bauen | Stattdessen | Grund |
|---|---|---|---|
| Bildkonvertierung AVIF/WebP | eigene Encoder, Online-Konverter | `sharp` (0.35.4, vorhanden) | Qualität/Farbunterabtastung, Metadaten |
| Responsive Bildauslieferung | eigene `srcset`-Logik | `next/image` mit `sizes` bzw. bestehendes `picture`-Muster (`MobileAppGallery`) | Formatwahl, Lazy Loading, feste Maße |
| `noindex`-Meta | eigenes `<meta>` im Body | `metadata.robots` | Next.js rendert korrekt in `<head>` |
| Barrierefreiheitsprüfung | eigene Kontrastberechnung | `@axe-core/playwright` (vorhanden) | Regelabdeckung |
| Keyword-Kennzahlen | Schätzungen, LLM-Wissen | SE Ranking Rohdaten | SEO-02 verbietet Schätzungen |
| CLS-Messung | Pixelvergleich | `PerformanceObserver({type:"layout-shift"})` im Browser (Muster in `scripts/performance-audit.mjs`) | Standard-API |
| Akkordeon | eigenes JS | `details/summary` (`components/ui/Faq.tsx`) | Tastatur und Semantik eingebaut |

**Kernaussage:** Alle benötigten Werkzeuge sind im Repo vorhanden; die Phase baut Datenflüsse und Prüfungen, keine neue Infrastruktur.

## Common Pitfalls

### Pitfall 1: Lokale Branches statt `origin/release`
**Was schiefgeht:** `git show main:…` liefert veraltete Werte (Register zeigt noch `main 179cef55`).
**Vermeidung:** Skript nutzt ausschließlich `origin/release`, schreibt `git rev-parse origin/release` und `git describe --tags origin/release` in den Snapshot. Kein `git fetch` im Skript (Inhaberanweisung); der Plan nennt den verwendeten Commit.
**Warnsignal:** Snapshot-Commit ≠ `07cf0645…`/`5610a064…`.

### Pitfall 2: Hart kodierte Testerwartungen brechen
**Betroffen:** `tests/product-register.test.ts:8` (`toHaveLength(16)`, `trialDays 10`), `tests/content.test.ts:16-17,46` (24/40 Artikel, 24 RSS-Items), `tests/llms.test.ts:10-11` (Fakten „29,95 €“, „9,95 €“, „10 Tage“; Abschnitt „lists available features but no announced ones“ hängt an `tier`), `tests/seo-brand.test.ts:7-9` (exakter Startseitentitel), `tests/e2e/browser-functional.pw.cjs:161,170,171,177` (24,96/29,95/9,95 in PricingTable), `tests/e2e/navigation.pw.cjs:57` (13 Gewerke-Links), `tests/e2e/function-illustrations.pw.cjs:5-22` (Varianten-zu-Slug-Zuordnung, Gewerke-Slugs, Beispielwerte 816,00 €, „Mittwoch, 16.09.“), `scripts/route-audit.mjs` (iteriert Sitemap; prüft `oldTrial` „14 Tage“).
**Vermeidung:** Zahlen in Tests aus Datenmodulen ableiten, wo möglich; bewusste Änderungen (z. B. Kundenportal-Status) im selben Plan anpassen.

### Pitfall 3: Neue E2E-Datei wird nicht ausgeführt
**Was schiefgeht:** `tests/e2e/playwright.config.cjs:8` hat eine explizite `testMatch`-Liste; eine neue `design-v2.pw.cjs` läuft sonst nie.
**Vermeidung:** Datei in `testMatch` eintragen und Lauf in der Ausgabe nachweisen.

### Pitfall 4: API-Kosten durch `limit` unterschätzt
**Was schiefgeht:** `related` mit Standard-`limit=100` kostet bis zu 1.000 Units je Aufruf.
**Vermeidung:** `limit` immer explizit setzen, Filter (`filter[volume][from]`, `filter[difficulty][to]`) nutzen, Antworten cachen (Datei existiert → kein erneuter Aufruf), `plan`-Modus mit Kostenschätzung vor dem Lauf.

### Pitfall 5: Keyword-Kannibalisierung über Schreibvarianten
**Was schiefgeht:** „handwerkersoftware“ und „handwerker software“ landen auf zwei Seiten.
**Vermeidung:** Normalisierung im Test: Kleinschreibung, ß→ss, ä/ö/ü→ae/oe/ue, Leerzeichen und Bindestriche entfernen; Duplikate nach Normalisierung schlagen fehl.

### Pitfall 6: Kundenportal-Status ändert Sitemap, llms.txt und Tests gleichzeitig
**Was schiefgeht:** `tier` steuert `llms.ts:30-31`, `/funktionen` („In Prüfung“), `app/funktionen/[slug]/page.tsx:59` und `tests/llms.test.ts`.
**Vermeidung:** Statusänderung nur nach Inhaberbestätigung, dann alle abhängigen Stellen in einem Plan.

### Pitfall 7: Vercel-Deployment noch nicht fertig, IndexNow schon gemeldet
**Was schiefgeht:** `scripts/indexnow-submit.mjs` liest die Live-Sitemap; vor Abschluss meldet es den alten Stand.
**Vermeidung:** Nach Push auf `main` den Production-Deploy-Status (Vercel MCP `list_deployments`/CLI) auf `READY` prüfen, dann `npm run indexnow`.

### Pitfall 8: Umlaute und Encoding in Windows-Shell
**Was schiefgeht:** Keywords mit „ä/ß“ werden in Bash/PowerShell-Argumenten falsch kodiert.
**Vermeidung:** Seeds in einer UTF-8-JSON-Datei pflegen, im Skript `encodeURIComponent` verwenden (so in der Probe erfolgreich).

### Pitfall 9: `server-only` in Tests
`lib/product-register.ts` importiert `server-only`; `vitest.config.ts` mappt es auf `tests/server-only.ts`. Neue Server-Module ebenso importierbar halten.

## Code Examples

### Snapshot-Skript (Produktpreise, nur lokal)
```js
// craftos/scripts/sync-product-snapshot.mjs – liest origin/release, kein fetch, kein Netz
import { execFileSync } from "node:child_process";
import fs from "node:fs";
const WEB = process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy";
const git = (...a) => execFileSync("git", ["-C", WEB, ...a], { encoding: "utf8" }).trim();
const commit = git("rev-parse", "origin/release");
const tag = git("describe", "--tags", "origin/release");
const constants = git("show", `${commit}:src/lib/constants.ts`);
const pricing = git("show", `${commit}:src/lib/subscription/pricing.ts`);
const agb = git("show", `${commit}:src/pages/AGB.tsx`);
const num = (src, key) => {
  const m = src.match(new RegExp(`\\b${key}:\\s*([\\d.]+)`));
  if (!m) throw new Error(`Feld ${key} nicht gefunden`);
  return Number(m[1]);
};
const packages = [...pricing.matchAll(/\{\s*amount:\s*([\d.]+),\s*bonus:\s*([\d.]+),\s*bonusPercent:\s*(\d+)\s*\}/g)]
  .map(([, amount, bonus, pct]) => ({ amount: +amount, bonus: +bonus, bonusPercent: +pct }));
const trialWord = agb.match(/beträgt (\w+) Kalendertage/)?.[1];
const words = { zehn: 10, vierzehn: 14, sieben: 7 };
const snapshot = {
  source: { repo: "craft-connect-buddy", ref: "origin/release", tag, commit, readAt: new Date().toISOString() },
  pricing: Object.fromEntries(["ADMIN_MONTHLY","BUERO_MONTHLY","APP_MONTHLY","ADMIN_YEARLY","BUERO_YEARLY","APP_YEARLY",
    "YEARLY_DISCOUNT_PERCENT","ADMIN_FREE_CREDITS","ORG_STORAGE_BASE_GB","EXTRA_STORAGE_GB",
    "EXTRA_STORAGE_PRICE_MONTHLY","EXTRA_STORAGE_PRICE_YEARLY"].map((k) => [k, num(constants, k)])),
  // VAT_RATE steht als `export const VAT_RATE = 0.19;` (constants.ts:25), nicht als Objektfeld
  vatRate: Number(constants.match(/export const VAT_RATE = ([\d.]+)/)?.[1]),
  creditPackages: packages,
  trialDays: words[trialWord] ?? null,
  netPrices: /Alle Preise verstehen sich netto/.test(agb),
};
fs.writeFileSync("docs/product-pricing-snapshot.json", JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Snapshot ${tag} (${commit.slice(0, 8)}) geschrieben.`);
```

### Paritätstest
```ts
// craftos/tests/pricing-parity.test.ts
import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import snapshot from "@/docs/product-pricing-snapshot.json";
import { tarife, creditPakete, site } from "@/lib/site";
import { buildLlmsTxt } from "@/lib/llms";
import { softwareApplicationSchema } from "@/lib/schema";

const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const p = snapshot.pricing;

describe("Preise entsprechen origin/release der Web-App", () => {
  it("Lizenzen", () => {
    expect(voll.monat).toBe(p.ADMIN_MONTHLY);
    expect(p.BUERO_MONTHLY).toBe(p.ADMIN_MONTHLY); // „Voll-Lizenz“ = Admin oder Büro
    expect(voll.jahr).toBe(p.ADMIN_YEARLY);
    expect(app.monat).toBe(p.APP_MONTHLY);
    expect(app.jahr).toBe(p.APP_YEARLY);
  });
  it("Credits, Speicher, Testphase", () => {
    expect(creditPakete.map((c) => [c.preis, c.bonus])).toEqual(
      snapshot.creditPackages.map((c) => [c.amount, c.bonusPercent]));
    expect(site.trialDays).toBe(snapshot.trialDays);
    // neue Felder in site.ts, z. B. startCredits, extraSpeicher …
  });
  it("llms.txt und Schema leiten sich ab", () => {
    const txt = buildLlmsTxt();
    for (const v of [p.ADMIN_MONTHLY, p.APP_MONTHLY, p.EXTRA_STORAGE_PRICE_MONTHLY])
      expect(txt).toContain(v.toFixed(2).replace(".", ",") + " €");
    expect(softwareApplicationSchema().offers.price).toBe(p.ADMIN_MONTHLY.toFixed(2));
  });
});

const WEB = process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy";
describe.skipIf(!fs.existsSync(WEB))("Snapshot ist aktuell (nur lokal)", () => {
  it("Commit entspricht origin/release", () => {
    const head = execFileSync("git", ["-C", WEB, "rev-parse", "origin/release"], { encoding: "utf8" }).trim();
    expect(snapshot.source.commit).toBe(head);
  });
});
```
Hinweis: JSON-Import benötigt `resolveJsonModule` in `tsconfig.json` (prüfen) oder `fs.readFileSync` + `JSON.parse`.

### Keyword-Map-Typ und Test
```ts
// craftos/lib/keyword-map.ts
export type Intent = "I" | "N" | "T" | "C" | "L";
export interface KeywordMetric {
  keyword: string; volume: number; difficulty: number; intents: Intent[]; cpc?: number;
  source: { endpoint: string; file: string; fetchedAt: string }; // Datei unter docs/seo/data/
}
export interface KeywordAssignment {
  path: string;                      // "/funktionen/aufmass"
  status: "bestehend" | "geplant";
  phase?: 6 | 7 | 8 | 9;
  primary: KeywordMetric | null;
  reason?: string;                   // Pflicht, wenn primary null
  secondary: string[];
  competitors: { domain: string; position: number | null; url: string | null }[];
  target?: { title?: string; h1?: string; description?: string };
}
export const keywordMap: KeywordAssignment[] = [ /* … */ ];
```
```ts
// craftos/tests/keyword-map.test.ts
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import sitemap from "@/app/sitemap";
import { keywordMap } from "@/lib/keyword-map";
const norm = (k: string) => k.toLowerCase().replace(/ß/g, "ss").replace(/ä/g, "ae")
  .replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/[\s-]+/g, "");
describe("Keyword-Map", () => {
  it("jede Sitemap-URL hat genau einen Eintrag", async () => {
    const paths = (await sitemap()).map((e) => new URL(e.url).pathname.replace(/\/$/, "") || "/");
    for (const p of paths) expect(keywordMap.filter((k) => k.path === p), p).toHaveLength(1);
  });
  it("kein Hauptkeyword doppelt (inkl. Schreibvarianten)", () => {
    const seen = new Map<string, string>();
    for (const k of keywordMap) if (k.primary) {
      const n = norm(k.primary.keyword);
      expect(seen.get(n), `${k.path} ↔ ${seen.get(n)}`).toBeUndefined();
      seen.set(n, k.path);
    }
  });
  it("jede Zahl ist mit Rohdaten belegt", () => {
    for (const k of keywordMap) {
      if (!k.primary) { expect(k.reason, k.path).toBeTruthy(); continue; }
      const raw = JSON.stringify(JSON.parse(fs.readFileSync(k.primary.source.file, "utf8")));
      // Keyword samt Volumen und KD müssen im Rohdatensatz vorkommen (Quelle je Zahl)
      expect(raw, k.path).toContain(`"keyword":"${k.primary.keyword}"`);
      expect(raw, k.path).toMatch(new RegExp(`"keyword":"${k.primary.keyword}"[^}]*"volume":${k.primary.volume}\\b`));
    }
  });
});
```

### Musterseite mit noindex
```tsx
// craftos/app/styleguide/page.tsx
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = {
  ...pageMetadata("Designbausteine v2", "Interne Musterseite der CraftOS-Website.", "/styleguide"),
  robots: { index: false, follow: false },
};
export default function Page() { /* Bausteine mit Beispieldaten, IllustrationLabel */ }
```

### Budget-Prüfung (Datei-Ebene)
```ts
// craftos/tests/media-budget.test.ts
import { describe, it, expect } from "vitest";
import fs from "node:fs"; import path from "node:path";
const LIMIT = 150 * 1024;
const EXCEPT = [/^icons\//, /^opengraph/]; // explizite Ausnahmen begründen
const walk = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true })
  .flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
describe("Bilder in public/ halten das Budget", () => {
  for (const file of walk("public").filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))) {
    const rel = path.relative("public", file).replaceAll("\\", "/");
    if (EXCEPT.some((r) => r.test(rel))) continue;
    it(rel, () => {
      expect(/\.(avif|webp)$/i.test(rel), "Format AVIF/WebP").toBe(true);
      expect(fs.statSync(file).size, "≤ 150 KB").toBeLessThanOrEqual(LIMIT);
    });
  }
});
```
Laufzeitseite (Playwright, in `tests/e2e/design-v2.pw.cjs`): Für `/`, `/app`, `/gewerke`, `/preise`, `/styleguide` bei 1440 und 390 alle Antworten mit `request.resourceType() === "image"` sammeln, `content-length`/`body().length` ≤ 150 KB und `content-type` `image/avif|webp|svg+xml` prüfen; jedes `<img>` hat `width` und `height` (oder `aspect-ratio`); CLS über `PerformanceObserver` = 0 nach Laden und Scrollen; mit `page.emulateMedia({ reducedMotion: "reduce" })` sind alle Bausteine sichtbar (`opacity` 1, keine laufende Animation).

## State of the Art

| Alt | Aktuell | Wann | Auswirkung |
|---|---|---|---|
| Register-Basis `main 179cef55` / `master 9e6260d` (09.09.2026) | `origin/release` Web `07cf0645` (v4.0.0-test.238), Mobile `5610a064` (mobile-v1.0.0-test.93) | Meilenstein v2.0 | Basis und `checkedAt` umstellen |
| Speicher je Lizenz 50/20/10 GB, Jahresbonus 25 GB | Org-Pool 50 GB; Bonus entfallen (`@deprecated L-P1e`) | Web-Release | Keine Lizenz-Speicherstaffel bewerben |
| 150 Credits als Monatskontingent | 150 Credits einmaliges Startguthaben, danach nur Prepaid-Pakete | Audit c10, 09.10.2026 | „einmalig“ formulieren |
| „Bauphase“ | „Arbeitsabschnitt“ in Mobile (Commit „Arbeitsabschnitt statt Bauphase in allen Sprachen“, 19.10.2026); Web nutzt beide Begriffe (36 vs. 127 Dateien) | 19.10.2026 | Website-Begriff klären |
| Mobile ohne Lagerbuchung | Mobile Lager-Scan (`inventory/*`) | nach 09.09.2026 | `docs/SNIPPET-DESIGN.md:29` überholt |

**Veraltet:** `upcomingFeatures[].when`, `docs/SNIPPET-DESIGN.md` Lager-Aussage, Galerie-Text „Aktuelle Appaufnahme“, REQUIREMENTS-Text SEO-02 („aus DataForSEO-Daten“) – Quelle ist laut D-05 SE Ranking.

## Runtime State Inventory

Nicht anwendbar (keine Umbenennungs-/Migrationsphase). Einziger externer Zustand: Vercel-Production-Deployment (wird durch Push aktualisiert), IndexNow-Schlüsseldatei `public/6bc96611818999f9f85c88d94cc9efaf.txt` (öffentlich, unverändert), SE-Ranking-Kontingent (verbraucht sich, Ablauf 03.11.2026).

## Assumptions Log

| # | Annahme | Abschnitt | Risiko bei Irrtum |
|---|---|---|---|
| A1 | Kundenportal ist live (Einladungs-UI ohne Flag im Release) | Funktions-Delta A | Bewerbung einer nicht freigegebenen Funktion; daher Inhaberbestätigung |
| A2 | Rechtsseiten (3) und ggf. Kategorieseiten (15) dürfen `primary: null` mit Begründung haben | Keyword-Map | Erfolgskriterium „jede Seite“ wäre formal verfehlt |
| A3 | Einheitlicher Lizenzname „Voll-Lizenz“/„App-Lizenz“ ersetzt „Volllizenz“/„Mobile Lizenz“ in `PricingTable` | Preis-Wahrheitstabelle | Gestaltungsentscheidung des Inhabers überschrieben |
| A4 | Intent-Code L = local | Keyword-Map | Falsche Intent-Beschriftung |
| A5 | `robots.txt`-Disallow verhindert das Lesen von `noindex` (Google-Praxis) | Musterseite | Gering |
| A6 | Budget „≤ 150 KB je Ansicht“ gilt je ausgeliefertem Bild, nicht als Summe | Medienbudget | Summenbudget wäre deutlich strenger |
| A7 | Kosten je Endpunkt laut Doku; Kontingent-Anzeige aktualisiert verzögert | Keyword-Map | Budgetüberschreitung vor Testende |
| A8 | `origin/release` entspricht dem Produktionsstand beider Apps | Produktwahrheit | Falsche Live-Einstufung |
| A9 | Titel/H1/Description werden in Phase 5 nur als Zielwerte in der Map hinterlegt, Umsetzung in Phasen 6–8 | Keyword-Map | SEO-02-Text („Titel, H1 und Description folgen ihr“) wäre in Phase 5 nur teilweise erfüllt |

## Open Questions (RESOLVED)

1. **Kundenportal live?** Code: Einladung, Portal-Seiten ohne Flag, Onlinezahlung aus. Empfehlung: Inhaber fragen; bis dahin `tier: "launch"` belassen.
   **RESOLVED (D-11):** Kundenportal gilt als live (`tier: "heute"`), Onlinezahlung wird nicht beworben – umgesetzt in Plan 05-02 Task 1.
2. **„Bauphase“ oder „Arbeitsabschnitt“?** Mobile hat am 19.10.2026 umgestellt, Web uneinheitlich; Website nutzt „Phasen“ (z. B. `content/hilfe/projekt-phasen-anlegen.md`). Empfehlung: Inhaber entscheidet; Keyword-Daten zu beiden Begriffen abfragen.
   **RESOLVED (D-13):** „Bauphasen“ ist Hauptbegriff, „Arbeitsabschnitte“ Nebenbegriff (Mobile) – umgesetzt in Plan 05-01 (Seeds/Map) und Plan 05-02 (liveExtras-Name).
3. **Ankündigungen behalten oder streichen?** Empfehlung: Telefon-Agent und MCP-Server als „In Entwicklung“ ohne Datum; „Weitere Agent-Aktionen“ entweder ebenso oder streichen (Inhaber).
   **RESOLVED (D-12):** Vollständig streichen, keine Umformulierung, kein Abschnitt „Demnächst“ – umgesetzt in Plan 05-02 Task 2 (Test, Routen-Audit-Flag).
4. **Titel/H1 jetzt anpassen?** Empfehlung: Map enthält Zielwerte; Anwendung in Phasen 6–8 (SEO-05 in Phase 8), um Doppelarbeit beim Redesign zu vermeiden. REQUIREMENTS-Text SEO-02 auf SE Ranking korrigieren.
   **RESOLVED (D-14, D-05):** Zielwerte nur in der Keyword-Map (Plan 05-01), Anwendung in Phasen 6–8; SEO-02 gilt nach Phase 5 als „Phase 5 Grundlage, Umsetzung Phasen 6–8“.
5. **DESIGN-02 „Videoplayer“** steht im Requirement, Videos sind Out of Scope. Empfehlung: Requirement-Text anpassen, kein Baustein.
   **RESOLVED (D-01, neuer DESIGN-02-Text):** Kein Videoplayer-Baustein; die Musterseite vermerkt „Videoplayer: entfällt“ (Plan 05-06). DESIGN-02 gilt nach Phase 5 als „Phase 5 Grundlage, Umsetzung Phasen 6–8“.
6. **Ungenutzte Großdateien in `public/`** (Screenshots Juli, Store-Motive, Mockup-Master, JPG-Fotos): verschieben (nicht ausgeliefert) oder löschen? Empfehlung: in `craftos/media-src/` verschieben, Fotos für Phase 6+ konvertiert in `public/` behalten.
   **RESOLVED (D-15):** Ungenutzte Großdateien bleiben unverändert in `public/` (Löschregel); nur ausgelieferte Bilder werden konvertiert und geprüft – Plan 05-06 Task 1.
7. **„Vorhersagen“ bewerben?** Im Web-Sidebar sichtbar; Umfang/KI-Kosten nicht geprüft. Empfehlung: im Register als live führen, Bewerbung erst nach Prüfung in Phase 7.
   **RESOLVED (Plan 05-02):** Im Register unter liveExtras mit `advertised: false`; keine Bewerbung in Phase 5, Prüfung in Phase 7.

## Environment Availability

| Abhängigkeit | Benötigt für | Verfügbar | Version | Fallback |
|---|---|---|---|---|
| Node.js | Skripte, Build | ✓ | 24.12.0 (engines `24.x`) | – |
| npm | Skripte | ✓ | 11.6.2 | – |
| Git + Produkt-Repos | Snapshot, Belege | ✓ | `origin/release` beider Repos lokal vorhanden | – |
| Python 3.12 | ui-ux-pro-max | ✓ | 3.12.10 | – |
| ui-ux-pro-max Skript | Design-Kaskade | ✓ | `c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py` | – |
| Playwright-Browser | E2E 1440/390 | ✓ | chromium-1243, webkit-2359 u. a. | – |
| sharp | Bildkonvertierung | ✓ (transitiv) | 0.35.4 | – |
| SE Ranking API | Keyword-Map | ✓ | aktiv bis 03.11.2026, 98.400 Units | keiner – ohne Zugang bleibt SEO-02 offen |
| DataForSEO | – | ✗ (keine Zugangsdaten in `.env`) | – | SE Ranking (D-05) |
| MCP `se-ranking` | optional | ✗ (OAuth ausstehend) | – | Data API per Skript |
| Context7-MCP | Doku | in dieser Sitzung nicht als Werkzeug verfügbar | – | Next.js-Doku per WebFetch geprüft |
| Koordinationszentrale-Rezept für Website-Repo | schwere Läufe | ✗ | – | lokal, max. ein schwerer Prozess; Lücke melden |
| GitHub Actions | – | keine Workflows (`.github/` fehlt) | – | nicht benötigt (Regel 5) |

**Fehlend ohne Fallback:** keiner.
**Fehlend mit Fallback:** DataForSEO (→ SE Ranking), MCP `se-ranking` (→ Data API), Rezept der Zentrale (→ lokal).

## Validation Architecture

### Test-Framework
| Eigenschaft | Wert |
|---|---|
| Framework | Vitest 5.0.0 (node), Playwright 1.63.0 (Chromium/WebKit, Projekte `*-1440` und `*-390-touch`) |
| Konfiguration | `craftos/vitest.config.ts` (`tests/**/*.test.ts`, Alias `@` und `server-only`), `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch`, `baseURL` `http://localhost:3100`) |
| Schnelllauf | `cd craftos && npx vitest run tests/pricing-parity.test.ts tests/keyword-map.test.ts tests/announcements.test.ts tests/media-budget.test.ts tests/styleguide.test.ts` |
| Volle Suite | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build` |
| E2E | `npm run build && npx next start -p 3100` (separat), dann `npm run test:e2e` |
| Routen-Audit | Server auf 3101 (`npx next start -p 3101`), dann `node scripts/route-audit.mjs` |
| Visuelle Prüfung | `AUDIT_ROUTES=/styleguide,/funktionen,/preise node scripts/visual-audit.mjs` (Server 3101) |

### Requirements → Test-Map
| Req | Verhalten | Typ | Automatischer Befehl | Datei vorhanden? |
|---|---|---|---|---|
| PROD-02 | Register nennt Tag/Commit/Belegpfade; jede Plattform hat Beleg | unit | `npx vitest run tests/product-register.test.ts` | ✅ (anpassen: Basisfelder, Länge) |
| PROD-02 | Belegpfade existieren am Release-Commit (lokal, skip ohne Repo) | unit | `npx vitest run tests/product-register.test.ts -t "Belege"` | ❌ Wave 0 |
| PROD-02 | `llms.txt` listet nur `tier === "heute"` | unit | `npx vitest run tests/llms.test.ts` | ✅ |
| PROD-03 | `site.ts` = Snapshot; `llms.txt`/Schema abgeleitet; Snapshot = `origin/release` | unit | `npx vitest run tests/pricing-parity.test.ts` | ❌ Wave 0 |
| PROD-03 | Preisanzeige im Browser | e2e | `npm run test:e2e` (`browser-functional.pw.cjs:161-177`) | ✅ |
| PROD-04 | Keine Termine/„demnächst“ in Ankündigungen; Typ ohne Datumsfeld | unit | `npx vitest run tests/announcements.test.ts` | ❌ Wave 0 |
| PROD-04 | Gerenderte Seiten ohne „Geplant: … 2026“ | Routen-Audit | `node scripts/route-audit.mjs` (Check analog `oldTrial` ergänzen) | ✅ (erweitern) |
| SEO-02 | Jede Sitemap-URL genau 1 Eintrag, keine Duplikate, Zahlen belegt | unit | `npx vitest run tests/keyword-map.test.ts` | ❌ Wave 0 |
| SEO-02 | Rohdaten reproduzierbar | manuell + Skript | `node scripts/keyword-research.mjs plan` (ohne Kosten) | ❌ Wave 0 |
| DESIGN-02 | Musterseite `noindex`, nicht in Sitemap/llms | unit | `npx vitest run tests/styleguide.test.ts` | ❌ Wave 0 |
| DESIGN-02 | Bausteine rendern bei 1440/390, axe ohne ernsthafte Verstöße | e2e | `npm run test:e2e -- --grep styleguide` | ❌ Wave 0 (`design-v2.pw.cjs` + `testMatch`) |
| DESIGN-04 | Reduced Motion: alles sichtbar, keine laufende Animation; keine globale Scroll-Animation | e2e | `npm run test:e2e -- --grep "reduzierte Bewegung"` | ❌ Wave 0 |
| MEDIA-03 | Darstellungen gekennzeichnet; Tab-Beschriftung „Zeiten“; nur Live-Funktionen in `FeatureCard` | unit + e2e | `npx vitest run tests/styleguide.test.ts`, `npm run test:e2e` | ❌ Wave 0 |
| MEDIA-04 | Dateien in `public/` AVIF/WebP ≤ 150 KB (Ausnahmen begründet) | unit | `npx vitest run tests/media-budget.test.ts` | ❌ Wave 0 |
| MEDIA-04 | Ausgelieferte Bilder ≤ 150 KB, `width/height`, CLS 0 | e2e | `npm run test:e2e -- --grep Budget` | ❌ Wave 0 |

### Abtastrate
- **Je Task-Commit:** Schnelllauf der betroffenen Vitest-Dateien.
- **Je Wave-Merge:** `npm test`, `npm run lint`, `npm run typecheck`.
- **Phasen-Gate:** `npm run build`, E2E (Chromium und WebKit, 1440/390), Routen-Audit, visuelle Prüfung der Musterseite, alles grün vor `/gsd-verify-work` und Ship-Gate. Ausschließlich lokal; keine Cloud-Runner.

### Wave-0-Lücken
- [ ] `craftos/scripts/sync-product-snapshot.mjs` + `craftos/docs/product-pricing-snapshot.json` – PROD-03
- [ ] `craftos/tests/pricing-parity.test.ts` – PROD-03
- [ ] `craftos/tests/announcements.test.ts` – PROD-04
- [ ] Erweiterung `craftos/tests/product-register.test.ts` (Release-Basis, Belegpfad-Existenz lokal) – PROD-02
- [ ] `craftos/scripts/keyword-research.mjs`, `craftos/lib/keyword-map.ts`, `craftos/tests/keyword-map.test.ts` – SEO-02
- [ ] `craftos/tests/styleguide.test.ts`, `craftos/tests/media-budget.test.ts` – DESIGN-02, MEDIA-04
- [ ] `craftos/tests/e2e/design-v2.pw.cjs` **und** Eintrag in `playwright.config.cjs` `testMatch` – DESIGN-02/04, MEDIA-03/04
- [ ] Prüfung `resolveJsonModule` in `craftos/tsconfig.json` für JSON-Importe

## Rollout (Phasenende, D-10)

1. Alle lokalen Prüfungen grün (siehe Phasen-Gate); für schwere Läufe Rezeptlücke der Zentrale benennen.
2. `ship-gate`-Skill (Pflicht vor Commit/Push), Standard-Review `/review`, kein Ultra-Review.
3. `gh workflow list --all` prüfen (erwartet: keine Workflows); `git push origin main`.
4. Vercel baut `main` automatisch (`craftos/vercel.json`, Framework nextjs). Production-Deployment des Projekts `craftos` bis `READY` beobachten (Vercel MCP `list_deployments`/`get_deployment` oder `vercel ls`).
5. `cd craftos && npm run indexnow` (prüft Schlüsseldatei, liest Live-Sitemap, meldet alle URLs an `api.indexnow.org`).
6. Live-Prüfung per Node-`fetch` (curl/WebFetch werden in dieser Umgebung umgeleitet): `/llms.txt` enthält 0,99 €, 150 Credits, Pakete; `/funktionen`, `/craft-ai`, `/vergleich`, `/fakten-ueber-craftos` ohne „Geplant: … 2026“; `/preise` zeigt Speicher und Credits; `/styleguide` liefert 200 mit `noindex` und fehlt in `/sitemap.xml`; JSON-LD-Offer 29.95 mit `valueAddedTaxIncluded: false`.
7. Übergabe im gemeinsamen Agent-Handoff hinterlegen.

## Security Domain

### Anwendbare ASVS-Kategorien
| Kategorie | Gilt | Standard-Kontrolle |
|---|---|---|
| V2 Authentication | nein | – (statische Website) |
| V3 Session Management | nein | – |
| V4 Access Control | nein | – |
| V5 Input Validation | gering | Snapshot-Parser wirft bei fehlenden Feldern; API-Antworten vor Nutzung auf erwartete Felder prüfen |
| V6 Cryptography | nein | – |
| V8 Data Protection / Secrets | **ja** | `SE_RANKING_API_KEY` nur aus `.env` (gitignored), nie loggen, nie in Rohdaten/Manifest schreiben; `.env` im Repo-Root |
| V14 Configuration | ja | Musterseite `noindex`; keine Testseiten in Sitemap; Sicherheitsheader in `next.config.js` bleiben |

### Bekannte Bedrohungsmuster
| Muster | STRIDE | Gegenmaßnahme |
|---|---|---|
| API-Schlüssel in Commit, Log oder Rohdaten | Information Disclosure | Schlüssel nur im Header, Rohdaten ohne Request-Header speichern, `git diff --cached` vor Commit auf Schlüsselmuster prüfen |
| Lieferkette durch neue Pakete | Tampering | Keine neuen Pakete; `sharp` nur in installierter Version |
| Irreführende Produktaussagen (nicht-live Funktionen, falsche Preise) | Repudiation/Compliance | Paritätstest, Ankündigungstest, Register mit Belegen [rechtliche Einordnung ASSUMED] |
| Indexierung interner Seiten | Information Disclosure | `noindex`, nicht in Sitemap, nicht verlinkt |

## Sources

### Primär (HOCH)
- `git` an Web `07cf0645517b81fa39c8644e3c9c84904f789bc4` und Mobile `5610a06415361f5c5a01c90258352ed7f49b7bab`: `src/lib/constants.ts`, `src/lib/subscription/pricing.ts`, `src/pages/AGB.tsx`, `src/lib/featureFlags.ts`, `src/lib/ai/availability.ts`, `src/App.tsx`, `src/components/layout/AppSidebar.tsx`, `src/pages/KiAgent.tsx`, `src/components/portal/InvoicePayment.tsx`, Mobile `src/AppRoot.tsx`, `src/features/*`, `src/shared/lib/navigation.ts`, `src/shared/i18n/locales/*`
- Website-Codebasis `C:/Projekte/Websitenerstellung/craftos` (Commit `b2fa75d`): `lib/*`, `app/*`, `components/*`, `tests/*`, `scripts/*`, `docs/*`, `public/*`
- SE Ranking Probeaufrufe 20.10.2026 (`account/subscription`, `keywords/questions|longtail|related`, `domain/keywords`)
- `gsd-tools query package-legitimacy check --ecosystem npm sharp`, `npm view sharp`, `npm ls sharp`

### Sekundär (MITTEL)
- https://seranking.com/api/data/keyword-research/ – Endpunkte, Parameter, Kosten
- https://seranking.com/api/data/domain-analysis/ – Endpunkte, Parameter, Kosten
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata (lastUpdated 2026-08-19) – `robots`, Merging, `title.template`
- ui-ux-pro-max Design-System-Ausgabe (nur strukturelle Empfehlungen übernommen)

### Tertiär (NIEDRIG)
- Google-Praxis zu `noindex` vs. `robots.txt` (Trainingswissen, A5)

## Metadata

**Vertrauen:**
- Standard-Stack: HOCH – installierte Versionen geprüft, keine neuen Pakete
- Produktwahrheit/Preise: HOCH – direkt an Release-Commits geprüft; Kundenportal-Status MITTEL
- Keyword-API: HOCH – Doku plus erfolgreiche Probeaufrufe
- Architektur/Design: MITTEL – Ermessensbereich, auf Bestand aufgebaut
- Pitfalls: HOCH – aus konkreten Fundstellen abgeleitet

**Recherchedatum:** 2026-10-20
**Gültig bis:** 2026-10-27 für Produktfakten (Release-Zweige bewegen sich täglich; Snapshot vor Umsetzung erneuern), 2026-11-03 für SE-Ranking-Zugang, 30 Tage für Design- und Next.js-Aussagen
