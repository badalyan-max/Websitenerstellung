# Phase 7: Funktionsdetailseiten und Mobile-App-Seite – Research

**Researched:** 21.10.2026
**Domain:** Next.js 16 App Router (Server Components), Designsystem v2 (`components/v2`), Produktwahrheit (Register ↔ Web-/Mobile-Release), SEO nach Keyword-Map
**Confidence:** HIGH (Bestand und Produktbelege im Code geprüft), MEDIUM bei Gestaltungsempfehlungen

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Vorlage Detailseite (FEAT-02, DESIGN-02)
- **D-01:** Verbindlich bleiben 05-UI-SPEC („Werkbank-Präzision“) und 06-UI-SPEC (Header, Bausteine, Kompaktliste, Textbudgets). Bausteine aus `components/v2` wiederverwenden; neue Bausteine nur, wenn die Vorlage sie zwingend braucht.
- **D-02:** Feste Abschnittsfolge jeder Detailseite: (1) Seitenkopf mit H1 = Hauptkeyword der Keyword-Map (natürlich formuliert), ein Satz Kurznutzen, CTA „10 Tage kostenlos testen“ + Sekundärlink, visuelles Element (vereinfachte UI im Browser- oder Phone-Rahmen bzw. Paar, Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“); (2) Ablauf in 3–5 Schritten (StepFlow); (3) Plattformen (Web/Mobile, nur belegt) und Rollen (wer nutzt es: nur belegte Rollen/Rechte aus dem Web-Release); (4) Kernpunkte als Kacheln/Liste (statt Fließtext), inkl. Abschnitte für zugeordnete Zusatzfunktionen; (5) FAQ (FaqList + FAQPage nur für sichtbare Fragen); (6) verwandte Funktionen (2–3 Links, gleiche/benachbarte Gruppe); (7) CtaBand. Jeder Abschnitt: höchstens eine H2, ein Satz Einleitung.
- **D-03:** Inhalte kommen aus einem typisierten Inhaltsmodul je Funktion (Daten statt JSX-Texte), geprüft per Budget-Test; Produktfakten nur aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, Snapshot und – bei Bedarf – lesend aus `C:/Projekte/craft-connect-buddy` und `C:/Projekte/CraftOS-Mobile` (`git show origin/release:<pfad>`). Keine erfundenen Funktionen, Zahlen, Rollen oder Kundenstimmen.
- **D-04:** Bestehende Detailtexte dürfen gekürzt und umstrukturiert werden (Inhaberauftrag); keine URL entfällt. Ausführliche Erklärungen, die wegfallen, nur dann, wenn sie in Hilfeartikeln oder FAQ abgedeckt sind; sonst als knapper Kernpunkt erhalten.

#### Visuelle Elemente (MEDIA-01)
- **D-05:** Jede Live-Funktion bekommt ein visuelles Element. Die 11 Funktionskarten, die in Phase 6 nur ein Icon zeigen, erhalten eine vereinfachte UI-Szene (`lib/scenes.ts`, MiniUi), sofern ein belegter Bildschirm existiert; sonst eine Ablaufgrafik/Icon-Grafik. Szenen zeigen nur belegte Bildschirme, Felder und Statusnamen (Kurzform-Beleg `web:`/`app:`).
- **D-06:** Animierte Szenen: Die bestehenden `FeatureSnippet`-Szenen dürfen auf Detailseiten höchstens als ein Element bleiben, wenn reduced motion, CLS 0 und Budgets eingehalten sind; Standard ist die statische v2-Szene. `components/product-demo` wird nicht wieder eingebunden; die Dateien bleiben (keine Löschung ohne Freigabe), ihre beiden geskippten Specs bleiben geskippt, Vermerk für Phase 10.

#### Neue Seiten und Zuordnung (FEAT-02)
- **D-07:** Neue Detailseiten (siehe Boundary) entstehen über dieselbe Vorlage; sie wandern in `lib/funktionsgruppen.ts` von den Zusatzfunktionen zu den Detailfunktionen (Menü, Übersicht, Sitemap, `llms.txt`, ItemList werden automatisch konsistent; Paritätstests anpassen). Zwei-Klick-Regel bleibt erfüllt.
- **D-08:** Keyword-Map: Status der neuen Seiten von „geplant“ auf „bestehend“; SE-Ranking-Projekt trackt diese Keywords bereits mit der geplanten Ziel-URL (kein Retarget nötig, nur `--check`).

#### Mobile-App-Seite (FEAT-03)
- **D-09:** `/app` zeigt alle Live-Funktionen der App (Liste FEAT-03, gegen `C:/Projekte/CraftOS-Mobile` origin/release und Register geprüft) als gegliederte Kacheln (BentoGrid/FeatureCard) mit Phone-Darstellungen (PhoneFrame + MiniUi), plus Store-Links (iOS/Android), Offline und 21 Sprachen als Kennzahlen, FAQ, CtaBand. H1/Title nach Keyword-Map-Eintrag für `/app`.

#### SEO (SEO-02-Fortsetzung)
- **D-10:** Title, H1, Description jeder Detailseite und von `/app` folgen der Keyword-Map (Title ≤ 60 Zeichen inkl. „| CraftOS“, Description 120–158 Zeichen). Menü- und Übersichts-Ankertexte dürfen den Wortstamm des Hauptkeywords aufnehmen, wo es natürlich ist (06-VERIFICATION: 9/16).
- **D-11:** Strukturierte Daten je Detailseite: BreadcrumbList (Start → Funktionen → Seite), FAQPage (nur sichtbare FAQ), WebPage; kein HowTo. `/app`: BreadcrumbList, FAQPage, SoftwareApplication (MobileApplication, Plattformen iOS/Android, Preis netto aus site.ts) wenn belegt.
- **D-12:** Neue Seiten in Sitemap, `llms.txt`, Menü, Übersicht; interne Links von verwandten Funktionen und passenden Hilfeartikeln/Gewerkeseiten (keine Massenverlinkung).

#### Offene Punkte aus Phase 6
- **D-13:** IN-05 `data-source`: Werte auf öffentlichen Seiten auf die Kurzform `register:<id>` bzw. `site:<feld>` kürzen und Test anpassen (keine internen Pfade/Namen im HTML), sofern 05-UI-SPEC-Prüfung nur das Vorhandensein verlangt.
- **D-14:** IN-07 `scrollbar-gutter`: Sichtprüfung `/impressum`, `/datenschutz`, 404 in Chromium/WebKit bei 1440 und 390; nur bei sichtbarer Nebenwirkung auf Header/Menü-Bereich begrenzen.

#### Qualität, Rollout
- **D-15:** Server Components, keine neue Client-Insel außer bestehender HeaderShell; CLS 0, reduced motion, LCP-Element ohne Lazy-Load, axe ohne serious/critical bei 360/390/768/1024/1440, Above-the-fold je Detailseite: H1, Kurznutzen und CTA ohne Scrollen bei 360×640.
- **D-16:** Ausführung strikt sequentiell (Wellen nacheinander), TDD für Datenmodule, schwere Läufe einzeln lokal (Port 3100 prüfen, eigene PID), Rollout wie Phase 6: lokale Gates, Code-Review-Gate durch Orchestrator, Ship-Gate, `gh workflow list --all` vor jedem Push, Push, Vercel READY, `live-check.mjs` erweitern, `npm run indexnow`, `node scripts/se-ranking-sync.mjs --check`, `node scripts/seo-report.mjs --etappe rollout-phase07`, `docs/releases/PHASE-07-ROLLOUT.md`.
- **D-17:** Anforderungsstatus: FEAT-02, FEAT-03, MEDIA-01 erst im Rollout-Plan als erledigt markieren; DESIGN-02 und SEO-02 bleiben „In Progress“ (Abschluss Phase 8). Pläne setzen `requirements-completed: []` außer im Rollout-Plan.

### Claude's Discretion
- Zuordnung der Zusatzfunktionen ohne eigene Seite zu Detailseiten; Auswahl der FAQ (Fragen aus SE-Ranking-Keyword-Fragen/Hilfeartikeln, nur belegte Antworten).
- Ob ein Datenmodul pro Funktion oder ein gemeinsames Modul; Szenenauswahl je Seite.

### Deferred Ideas (OUT OF SCOPE)
- Löschung von `components/product-demo` und der zwei geskippten Specs → Phase 10 mit Inhaberfreigabe.
- Echte Kundenstimmen/Logos – erst wenn belegt.
- Gewerke-Seiten-Umbau → Phase 8.

Phase Boundary (aus CONTEXT): alle 16 Detailseiten auf v2-Vorlage; neue Seiten `/funktionen/gaeb`, `/funktionen/mahnwesen`, `/funktionen/terminplanung`, `/funktionen/bankabgleich`, `/funktionen/datenuebernahme`, `/funktionen/maengelmanagement` (nur wenn live und beworben); `/app` mit allen App-Funktionen; übrige Zusatzfunktionen als Abschnitt auf passender Detailseite. Nicht in Phase 7: Alternativen-/Preis-/Vergleichsseiten, technisches SEO-Audit, Titel aller übrigen Seiten (Phase 8), Gewerke-Umbau (Phase 8), Ratgeber/Hilfe (Phase 9).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FEAT-02 | Jede Live-Funktion hat eine Detailseite mit visuellem Element, Kurznutzen, Ablauf in Schritten, Plattformen (Web/Mobile), Rollen und FAQ; neue Seiten für die seit 09.09.2026 hinzugekommenen Funktionen. | Ist-Analyse Detailseite (§ Bestand), alle 6 neuen Seiten am Release belegt (§ Neue Seiten), Rollenmodell (§ Rollen), Vorlage und Datenmodul (§ Architektur), Paritäts-/Testliste (§ Mitzuziehende Stellen) |
| FEAT-03 | Mobile-App-Seite zeigt alle Live-Funktionen der App (u. a. 15 genannte) mit Phone-Darstellungen. | Mobile-Matrix mit Screen-/Dateibeleg je Punkt (§ Mobile-App-Umfang), Tab-Namen, Statusnamen, /app-Aufbau (§ /app) |
| MEDIA-01 | Jede Live-Funktion hat ein visuelles Element. | Szenenkatalog für 22 Detailseiten und App-Kacheln mit Bildschirmnamen und Statusbelegen (§ Szenen), MiniStatus-Erweiterung (§ Pitfalls) |
| DESIGN-02 (Fortsetzung) | v2 einheitlich auf allen Seiten. | Detailseiten und /app ausschließlich aus `components/v2` plus ein neuer Seitenkopf (§ Architektur) |
| SEO-02 (Fortsetzung) | Title/H1/Description nach Keyword-Map. | Soll/Ist-Tabelle mit Längen und Keyword-Treffern; sechs H1-Zielwerte widersprechen der Phase-6-Testregel (§ SEO) |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

Projekt-CLAUDE.md (`C:/Projekte/Websitenerstellung/CLAUDE.md`) und globale CLAUDE.md, für die Planung verbindlich:

- **Design-Kaskade bei jeder Frontend-Arbeit:** 1. `/frontend-design` (Pflicht), 2. `ui-ux-pro-max` mit `py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "<branche> <keywords>" --design-system -p "CraftOS"`, 3. 21st.dev nur `21st_magic_component_inspiration` (nie builder/refiner), 4. Context7 bei API-Unsicherheit, 5. SEO-Check (Semantik, Schema, Barrierefreiheit). In Phase 5/6 standen Skill-Tool, 21st.dev und Context7 Subagenten nicht zur Verfügung; der Nachweis erfolgte in `craftos/docs/DESIGN-V2.md` §§ 12–15 (Leitlinie gelesen, ui-ux-pro-max ausgeführt, Nichtverfügbarkeit vermerkt). Phase 7 braucht einen Abschnitt „§ 16 Kaskade Funktionsdetailseiten und /app“.
- **Schema-Markup Pflicht** auf jeder Seite; FAQPage für FAQ; BreadcrumbList.
- **300-Zeichen-Regel:** Frage-Überschrift, direkt danach faktische Antwort ≤ 300 Zeichen (deckt sich mit `TEXT_BUDGET.faq.firstSentence = 300`).
- **TypeScript strict, keine `any`; semantisches HTML; WCAG (Kontrast ≥ 4,5:1, Alt-Texte, Tastatur).**
- **Performance:** `next/image` mit `sizes`, `next/font` mit `display: swap`, Lazy-Load nur unterhalb der Falz, keine unbenutzten Abhängigkeiten.
- **DataForSEO** ist im Projekt-CLAUDE.md genannt; tatsächlich nutzt das Projekt SE Ranking (Keyword-Map aus SE-Ranking-Rohdaten, `scripts/se-ranking-sync.mjs`, `seo-report.mjs`). In dieser Phase keine neuen SEO-API-Abrufe außer `se-ranking-sync --check` und dem Etappenbericht im Rollout.
- **Global Regel 5 (Tests nur lokal):** Build, Lint, Typcheck, Vitest, Playwright lokal; nie pushen, um zu testen; vor jedem Push `gh workflow list --all` prüfen; GitHub Actions sind kein Beleg.
- **Koordination:** vor schweren Läufen `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status`; für das Website-Repo gibt es kein Rezept (Lücke laut PHASE-06-ROLLOUT §2) → Läufe lokal nacheinander, ein schwerer Prozess.
- **ship-gate** ist immer der letzte Schritt vor Commit/Push; **nie Ultra-Review** automatisch.
- **Gemeinsame Arbeit Claude/Codex:** Übergabe gemäß `C:/Users/badal/Documents/AgentShared/skills/agent-handoff/SKILL.md` vor Abschluss.
- **Keine Zugangsdaten ausgeben** (SENTRY-/SE-Ranking-Schlüssel nur als Variablenname).

## Summary

Die heutige Detailseite `app/funktionen/[slug]/page.tsx` ist eine alte, textlastige Vorlage (PageHero, Fließtext-Bullets, nummerierte Textschritte, Zugriffs-Absatz, alte `Faq`, `TrialCta`) ohne einen einzigen v2-Baustein. Ihr Datenmodell (`lib/funktionen.ts`) erzeugt den SEO-Titel synthetisch („{Name} für Handwerksbetriebe“, Z. 687), nutzt den Intro-Text als Description (Z. 688) und baut genau zwei generische FAQ aus Schritten und Zugriffstext (Z. 683–686). Damit verfehlt jede Detailseite die Keyword-Map (Title, H1, Description), und keine Seite erfüllt die v2-Mengenregel `FaqList` (3–8 Fragen). Phase 7 ersetzt die Seite durch eine feste Vorlage aus `components/v2` (SectionHeader, StepFlow, Badges, BentoGrid/FeatureList, FaqList, CtaBand, Frame/DevicePair) plus einen neuen, HomeHero-ähnlichen Seitenkopf. Die Inhalte gehören in ein typisiertes, budgetgeprüftes Detailmodul; Title/H1/Description liest es aus `docs/seo/keyword-map.json`.

Alle sechs geplanten neuen Seiten sind am Web-Release `v4.0.0-test.239` (`535206b4`) live und belegt: GAEB (Import X83, Export X83/X84, DATANORM), Mahnwesen (drei Stufen, Fristen, Gebühren, Vorlagen, tägliche automatische E-Mail, Mahnverlauf), Terminplanung (Plantafel-Ansicht „Projektplan“, Projektreiter „Terminplanung“, `PhaseDependencyEditor`), Bankabgleich (CSV/camt.053/PDF-Import, Zuordnungsstatus, optionale KI-Vorschläge gegen Credits), Datenübernahme (Assistent „Daten importieren mit KI“, nur Admin oder Büro-Leitung) und Mängel (Web-Bauakte und Mobile mit Ort, Frist, Zuständig, Priorität, Vorher/Nachher-Fotos). Die Mobile-App `mobile-v1.0.0-test.93` (`5610a064`) belegt alle 15 FEAT-03-Punkte mit eigenen Screens. Beide Release-Refs entsprechen exakt `productBasis` im Register; ein `git fetch` wurde nicht ausgeführt, neuere Releases sind daher nicht ausgeschlossen.

Die größten Planungsrisiken sind nicht gestalterisch, sondern Paritäten. Erstens stehen 16 bzw. 14 bzw. 30 an rund 15 Stellen hart in Unit-, E2E- und Live-Prüfungen. Zweitens müssen die sechs Funktionen sauber aus `liveExtras` ins Feature-Modell wandern. Drittens enthalten 12 der 23 H1-Zielwerte der Keyword-Map das Hauptkeyword nicht in normierter Form; die Phase-6-Testregel „H1 enthält Hauptkeyword“ würde daran scheitern. Hinzu kommt der Zielwert „Bankabgleich: Zahlungen automatisch zuordnen“, der unbelegt ist. Viertens hängen rund 40 E2E-Fälle in `function-illustrations.pw.cjs` an `FeatureSnippet` auf acht Detailseiten.

**Primary recommendation:** Neue Detailvorlage als Server Component aus v2-Bausteinen, Inhalte in `lib/funktionsdetails/<gruppe>.ts` (typisiert, TDD-Budgettest), Zielwerte direkt aus `keyword-map.json`; die sechs Funktionen in `lib/funktionen.ts` + `evidence`-Maps überführen und aus `liveExtras` entfernen; `FeatureSnippet` nur auf den acht E2E-gebundenen Seiten als einziges animiertes Element im Ablauf-Abschnitt behalten; vor der Umsetzung die H1-Zielwerte in `keyword-map.json` und `KEYWORD-MAP.md` bereinigen.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Detailseiten `/funktionen/[slug]` (22) rendern | Frontend Server (SSG via `generateStaticParams`) | CDN / Static (Vercel) | Statische Server Components ohne Client-JS (D-15); Inhalte zur Build-Zeit aus Datenmodulen |
| Inhalte, Budgets, Satzregeln | Datenmodul (`lib/funktionsdetails/*`, server-only) | Vitest | Daten statt JSX (D-03); Verstöße werfen beim Aufbau wie `funktionsgruppen.ts` |
| Produktwahrheit (Plattformen, Belege, Rollen) | `lib/product-register.ts` | Produkt-Repos (`git show origin/release:`) nur lesend in Tests | Einzige Quelle für „live und beworben“; Release-Belege per `product-register.test.ts` |
| Title/H1/Description | `docs/seo/keyword-map.json` via `lib/keyword-map.ts` | `generateMetadata` | Eine Quelle, Test vergleicht gerendert ↔ Ziel |
| Strukturierte Daten | `lib/schema.ts` (+ `components/seo/JsonLd`) | Frontend Server | BreadcrumbList/FAQPage/WebPage je Seite, MobileApplication auf `/app` |
| Menü, Übersicht, ItemList, Sitemap, llms.txt | `lib/funktionsgruppen.ts`, `lib/funktionen.ts` | `app/sitemap.ts`, `lib/llms.ts` | Werden automatisch konsistent, sobald neue Slugs in `funktionen.ts` und `DETAIL_ZUORDNUNG` stehen (D-07) |
| Animierte Illustration (optional) | Browser / Client (`FeatureSnippet`, bestehend) | – | Einzige erlaubte Client-Anteile außer HeaderShell; nur unterhalb der Falz |
| Live-Nachweis | `scripts/live-check.mjs` | IndexNow, SE-Ranking-Check | Rollout-Gate (D-16) |

## Standard Stack

### Core (Bestand, keine Änderung)
| Library | Version (package.json) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^16.1.4 | App Router, SSG, `generateMetadata` mit `params: Promise` | Bestand; Detailseite nutzt das Muster bereits (Z. 15–25) [VERIFIED: craftos/package.json] |
| react / react-dom | ^19.2.3 | Server Components, `renderToString` in Vitest | Bestand [VERIFIED: craftos/package.json] |
| tailwindcss | ^4.1.18 | Utilities; v2-Bausteine nutzen CSS-Module | Bestand; Hinweis 06-04: Utilities in `@layer utilities` verlieren gegen CSS-Module [VERIFIED: 06-04-SUMMARY] |
| lucide-react | ^0.475.0 | Icons (Funktionen, Tabs) | Bestand [VERIFIED: craftos/package.json] |
| vitest | ^5.0.0 | Unit-/Paritäts-/Budgettests | Bestand, `tests/**/*.test.ts` [VERIFIED: vitest.config.ts] |
| @playwright/test | ^1.63.0 | E2E (Chromium/WebKit, 1440/390-touch) | Bestand, explizites `testMatch` [VERIFIED: tests/e2e/playwright.config.cjs] |
| @axe-core/playwright | ^4.13.0 | axe ohne serious/critical | Bestand [VERIFIED: craftos/package.json] |

### Supporting (Projektbausteine, wiederverwenden)
| Baustein | Datei | Einsatz in Phase 7 |
|---------|-------|-------------|
| `SectionHeader` | `components/v2/SectionHeader.tsx` | genau eine H2 + ein Satz je Abschnitt (title ≤ 60, lead ≤ 140) |
| `StepFlow` | `components/v2/StepFlow.tsx` | Ablauf 3–5 Schritte (Budget erlaubt 3–6; title ≤ 28, text ≤ 80) |
| `PlatformBadges`, `LicenseBadge`, `BadgeGroup` | `components/v2/Badges.tsx` | Plattformen und Lizenzen (Abschnitt 3) |
| `BentoGrid`/`BentoTile`, `FeatureList` | `components/v2/BentoGrid.tsx`, `FeatureList.tsx` | Kernpunkte und Zusatzfunktionsabschnitte (3–7 Kacheln, ≥ 2 Größen, ≤ 1 dunkle) |
| `FaqList` | `components/v2/FaqList.tsx` | 3–8 Fragen, Frage ≤ 90 mit „?“, erster Satz ≤ 300, Antwort ≤ 600 |
| `CtaBand` | `components/v2/CtaBand.tsx` | Abschluss (title ≤ 40, text ≤ 80) |
| `Frame`, `SceneContent`, `DevicePair compact` | `components/v2/SceneContent.tsx`, `DevicePair.tsx` | Seitenkopf-Visual |
| `PhoneFrame` + `MiniUi` | `components/v2/PhoneFrame.tsx`, `mini/MiniUi.tsx` | /app-Kacheln (Zeile ≤ 24 Zeichen, ≤ 5 Zeilen) |
| `KeyFacts` | `components/v2/KeyFacts.tsx` | /app-Kennzahlen (3–4 Fakten, Wert ≤ 10, Label ≤ 40, `source` Pflicht) |
| `StoreLinks` | `components/ui/StoreLinks.tsx` | /app Store-Links (Server Component) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Neuer `FunktionsKopf` | `FunktionenHead` (dunkler Kopf von /funktionen) | `FunktionenHead` hat keine CTA und kein Visual und ist auf die Gruppennavigation zugeschnitten → nicht passend für D-02 (1) |
| Neuer `FunktionsKopf` | `HomeHero` parametrisieren | `HomeHero` liest fest aus `lib/home-content.ts`; eine Parametrisierung verändert eine abgenommene Startseite → separater, gleich aufgebauter Baustein ist risikoärmer |
| `FeatureCard` für /app-Kacheln | `BentoTile` mit `PhoneFrame` | `FeatureCard` wirft für Slugs außerhalb `lib/funktionen.ts` (FeatureCard.tsx Z. 32–35); App-Funktionen wie Besichtigung oder Urlaub haben keinen Slug → `BentoTile` |

**Installation:** keine neuen Pakete.

## Package Legitimacy Audit

Diese Phase installiert keine externen Pakete (alle Bausteine und Werkzeuge sind im Bestand; `package.json` bleibt unverändert).

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| – | – | – | – | – | – | keine Installation |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

## Bestand: Ist-Analyse (Datei:Zeile)

### `app/funktionen/[slug]/page.tsx` (185 Zeilen)
| Zeilen | Inhalt heute | Befund für Phase 7 |
|---|---|---|
| 12–14 | `generateStaticParams` aus `funktionen` | bleibt; neue Slugs erscheinen automatisch |
| 15–25 | `generateMetadata` → `pageMetadata(f.seoTitle, f.seoDescription, …)` | auf Keyword-Map-Ziel umstellen (Title ohne „ \| CraftOS“, weil Layout-Template `%s \| CraftOS`, `app/layout.tsx` Z. 62–65) |
| 34–43 | `snippetVariant`: zeiterfassung→zeit, lager→lager, aufmass→aufmass, nachkalkulation→dashboard, sonst `f.demo` | heute zeigen 15 Seiten eine Animation, teils fachfremd (baudokumentation → `rechnung`, Z. 493 in funktionen.ts) |
| 46 | `PageHero` (eyebrow, title, intro) | ersetzen durch neuen Seitenkopf mit Keyword-H1, ein Satz, CTA, Visual |
| 49–59 | Plattformen als Text+Icon | → `PlatformBadges` |
| 68–76 | `bullets` als je eine **H2** pro Punkt + Fließtext | verletzt „höchstens eine H2 je Abschnitt“ → Kacheln/`FeatureList` mit H3 |
| 80 | `FeatureSnippet` (Client-Komponente, `"use client"`) | siehe D-06-Empfehlung |
| 86–117 | Abschnitt „So arbeiten Sie damit“: Schritte als `<ol>` Fließtext, Hilfelink mit Sonderfällen je Slug (Z. 95–103) | → `StepFlow` (title ≤ 28 / text ≤ 80); heutige Schritte sind teils > 80 Zeichen (zeiterfassung Schritt 1: 137 Zeichen, funktionen.ts Z. 411) |
| 118–153 | „Zugriff und Voraussetzungen“: `access`, `notes`, Lizenzsatz, GoBD-Link für 4 Slugs, alte `Faq` | → Abschnitt Plattformen/Rollen + Kernpunkt „Grenzen“; GoBD-Link als Kernpunkt-Link erhalten |
| 154–173 | „Passt dazu.“ – `related` (3) mit `r.kurz` (= langer Intro-Text) | → 2–3 verwandte Funktionen mit `benefit` |
| 174–181 | JSON-LD FAQPage (2 synthetische Fragen) + BreadcrumbList | FAQPage nur aus sichtbaren `FaqList`-Fragen; WebPage ergänzen (D-11) |
| 182 | `TrialCta` | → `CtaBand` |

### `lib/funktionen.ts` (700 Zeilen)
- Interface `Funktion` Z. 29–55; interne `Definition` Z. 56–71; 16 Definitionen Z. 72–672; Abbildung Z. 673–697.
- Synthetische Felder: `faq` = 2 Fragen aus `steps.join` und `access` (Z. 683–686), `seoTitle = name + " für Handwerksbetriebe"` (Z. 687), `seoDescription = intro` (Z. 688), `kurz = intro` (Z. 678; wird in `llms.txt` genutzt, `lib/llms.ts` Z. 48–50), `checkedAt: "2026-10-20"` für alle (Z. 696, fließt als `lastModified` in die Sitemap, `app/sitemap.ts` Z. 48–51).
- Textmengen: Intro 120–220 Zeichen, 3–6 Punkte je Funktion, 3 Schritte, eine Note (bis ~330 Zeichen). Die Notes enthalten wichtige Einschränkungen (z. B. GPS nur Start/Stopp, DATANORM v5 nicht zugesagt, Karte = geplante Orte), die nach D-04 als knapper Kernpunkt oder FAQ-Antwort erhalten bleiben müssen.
- `benefit` (≤ 100, ein Satz) ist wörtlich im Test `tests/design-v2-budgets.test.ts` (ab Z. 145) festgeschrieben.
- Wird importiert von: Detailseite, `lib/funktionsgruppen.ts`, `lib/product-register.ts` (features Z. 381–397), `lib/llms.ts`, `app/sitemap.ts`, `components/v2/FeatureCard.tsx` (tier-Prüfung), `tests/content.test.ts` (relatedFeatures), mehrere Tests.

### `components/feature-snippet/**`
- `FeatureSnippet.tsx` (124 Z., `"use client"`), Varianten: dashboard, angebot, planung, rechnung, beleg, zeit, lager, aufmass, ki. Weitere Nutzer: `/app` (zeit, Z. 148), `/craft-ai` (ki), `/gobd` (rechnung), `/gewerke/[slug]` (angebot/planung).
- `tests/e2e/function-illustrations.pw.cjs` (in `testMatch`): `features` Z. 4–9 bindet die Varianten an `/funktionen/dashboard`, `/angebote`, `/plantafel`, `/rechnungen`, `/eingangsrechnungen`, `/zeiterfassung`, `/lager`, `/aufmass` und `/craft-ai`; darauf bauen mehrere parametrisierte Tests (Z. 168, 200, 218, 443) und Einzeltests (Z. 241–476).

### `app/app/page.tsx` (210 Zeilen)
- Metadaten Z. 10–14: Title „Mobile-App für Handwerker – in der Voll-Lizenz inklusive“ (weicht von Keyword-Map ab), Description 140 Zeichen.
- Hero Z. 18–79: H1 „Ihr Büro passt in die Arbeitshose.“ (ohne Keyword), StoreLinks, QR-Codes (Desktop), `MobileAppGallery` (Z. 76, Client-Komponente mit KI-Mockup/Originalumschalter).
- 4 Textkacheln Z. 88–128 (Zeiten mit GPS, Einsatzort, Aufmaß, Unterschrift), `FeatureSnippet variant="zeit"` Z. 148, Offline-Abschnitt Z. 152–206 (wichtige belegte Grenzen: Karten, Routen, Fotos, KI, neue Downloads brauchen Verbindung), `TrialCta` Z. 207. Kein FAQ, kein seitenspezifisches JSON-LD.

### SEO-/Schema-Infrastruktur
- `lib/schema.ts`: `faqSchema`, `breadcrumbSchema`, `itemListSchema`, globale `organizationSchema`/`softwareApplicationSchema` (`@id …/#software`, im Layout `app/layout.tsx` Z. 123–124). **Kein `webPageSchema`** → neu (D-11).
- `lib/llms.ts` Z. 46–50: Funktionen-Liste aus `funktionen` (tier heute, `f.kurz`) → neue Seiten automatisch; `kurz` sollte für llms ein kurzer Satz werden.
- `app/sitemap.ts` Z. 8–17 `pageUpdated` (`/app` = 2026-10-20), Z. 48–51 Detailseiten mit `f.checkedAt`.

## Mitzuziehende Stellen (vollständige Liste hart kodierter Erwartungen)

| Datei:Zeile | Heute | Nach Phase 7 |
|---|---|---|
| `tests/funktionsgruppen.test.ts:222–230` | „16 Detailfunktionen“, `toHaveLength(16)` | 22 |
| `tests/funktionsgruppen.test.ts:281–289, 380` | „14 beworbene Zusatzfunktionen“, `toHaveLength(14)` | 8 |
| `tests/funktionsgruppen.test.ts` `ERWARTETE_GRUPPEN` / `ERWARTETE_ZUSATZ` | Gruppeninhalte | neue Zuordnung (siehe § Zuordnung) |
| `tests/funktionen-seite.test.ts:98–118` | 30 = 16 + 14 | 30 = 22 + 8 |
| `tests/funktionen-seite.test.ts:132–148` | ItemList 16 | 22 |
| `tests/funktionen-seite.test.ts:109` | Visual = `cardScenes[slug] ? scene : icon` | bleibt, aber `cardScenes` wächst |
| `tests/navigation.test.ts:116–117` | 16 Detailfunktionen | 22 |
| `tests/product-register.test.ts:29` | `features` 16 | 22 |
| `tests/design-v2-budgets.test.ts:145–197` | wörtliche Nutzensätze der 16 + `toHaveLength(16)` | 22 Sätze |
| `tests/design-v2-frames.test.ts:397–412` | `allScenes` = 6, `cardScenes` = 5 Slugs exakt | neue Szenenliste |
| `tests/keyword-map.test.ts:30–33, 186–209` | `PHASE6_SEITEN` (statisches `metadata`) | Phase-7-Fall für 22 dynamische Seiten + `/app` (siehe Code-Beispiel) |
| `tests/keyword-map.test.ts:138–151` | geplant ⇒ nicht in Sitemap; bestehend ⇒ in Sitemap | Status-Umstellung und Sitemap-Aufnahme **im selben Commit** |
| `tests/design-v2-components.test.ts:72–79` | `data-source="${fact.source}"` | Kurzform (D-13) |
| `tests/home.test.ts:68–80`, `tests/styleguide.test.ts:88–100` | KeyFacts-Quellen `site.trialDays`, `tarife.voll.monat`, `tarife.app.monat`, `product-register: mobileLocales` | Kurzform-Schlüssel (D-13) |
| `tests/content.test.ts:24` | `relatedFeatures` ⊆ Slugs | neue Slugs in Hilfe-Frontmatter erlaubt |
| `tests/e2e/home-navigation.pw.cjs:12–16` | `DETAIL_SLUGS` (16) | 22 |
| `tests/e2e/home-navigation.pw.cjs:101, 103, 414, 501` | 16 Detaillinks/„Mehr zu“ | 22 |
| `tests/e2e/home-navigation.pw.cjs:425` | `entryLinks` 16 + 7 | 22 + Anzahl Zusatzeinträge mit Ziel (Empfehlung: alle 8 → 30) |
| `tests/e2e/home-navigation.pw.cjs:347, 411, 499` | 30 `data-funktion` | bleibt 30 |
| `tests/e2e/function-illustrations.pw.cjs:4–9` | 8 Detailseiten + /craft-ai | nur ändern, falls FeatureSnippet von Detailseiten entfernt wird |
| `tests/e2e/design-v2.pw.cjs:16` | `BUDGET_ROUTES` enthält `/funktionen/angebote`, `/app` | um eine neue Detailseite (z. B. `/funktionen/mahnwesen`) ergänzen |
| `scripts/live-check.mjs:172` | Keyword-Map-Prüfung nur `/`, `/funktionen` | + `/app` + alle Detail-Slugs aus Sitemap |
| `scripts/live-check.mjs:189–193` | 30 `data-funktion`, ItemList = Sitemap-Detailslugs | bleibt (automatisch 22) |
| `scripts/live-check.mjs:231–240` | interne Belegpfade nur auf `/`, `/funktionen` | + Detailseiten, `/app`, `data-source` |
| `scripts/visual-audit.mjs:9, 11`, `scripts/performance-audit.mjs:8` | `/funktionen/angebote`, `/app` | Detailroute(n) ergänzen |
| `app/sitemap.ts:8–17, 48–51` | `/app` 2026-10-20, Detail `checkedAt` | Rollout-Datum |
| `docs/seo/keyword-map.json`, `docs/seo/KEYWORD-MAP.md` | 6 Seiten `geplant`, Phase 7 | `bestehend`; H1-Zielwerte bereinigen (§ SEO) |
| `content/hilfe/*.md`, `content/blog/*.md` Frontmatter `relatedFeatures` | nur 16 Slugs | neue Slugs ergänzen (§ Interne Links) |

## Neue Detailseiten: Live-Status und Belege (Web `535206b4`, Mobile `5610a064`)

Alle sechs sind im Register `liveExtras` mit `advertised: true` (product-register.ts Z. 190–301) und am Release vorhanden [VERIFIED: git show origin/release].

| Seite | Plattform | Zentrale Belege (Release) | Belegte Abläufe, Felder, Statusnamen | Zugriff (Web-Release) |
|---|---|---|---|---|
| `/funktionen/gaeb` | Web | `src/lib/gaeb/gaebParser.ts` (GAEB DA XML 3.3, X83/X84), `GAEBImportDialog.tsx`, `GAEBExportDialog.tsx`, `DatanormImportDialog.tsx`, `src/api/datanormCatalogs.ts`; Universalimport erkennt `.x8?/.d8?/.p8?` (`src/lib/import/universalImport.ts:24`) | Import X83 → „Positionsvorschau“ (Typen Position, Textposition, Alternativ, Bedarfsposition; „Alle auswählen“), Export „X83 — Leistungsverzeichnis / Ausschreibung“ bzw. „X83 — Original-Ausschreibung“ und „X84 — Angebotsabgabe“ (X84 nur mit vollständig importierter Original-X83; Preisbestätigung, „Bieteradresse prüfen“); Grenzen: „GAEB 90/2000 und weitere Austauschphasen werden hier noch nicht unterstützt“, Datei ≤ 5 MiB, UTF-8. DATANORM: „Katalogname (Lieferant)“, „Artikelvorschau“, „Fehlerhafte Zeilen anzeigen“ | Dokumente: Admin, Büro (`/dokumente` → feature `dokumente`) |
| `/funktionen/mahnwesen` | Web | `src/pages/settings/MahnwesenSettings.tsx`, `src/api/reminders.ts`, `src/components/invoices/ReminderHistory.tsx`, `supabase/functions/send-invoice-reminders/index.ts` | Stufen „Zahlungserinnerung“, „1. Mahnung“, „2. Mahnung“; „Mahn-Fristen“ in „Tage überfällig“, „Mahngebühr“, „Verzugszinssatz (jährlich)“, „Mahn-Vorlagen“ (Betreff/Text je Stufe, elf Platzhalter); „Automatische Mahnungen“: „Überfällige Rechnungen werden täglich nach den Fristen per E-Mail gemahnt – immer eine Stufe nach der anderen“; „Mahnverlauf“ je Rechnung. Grenze: „Gemahnt werden nur Rechnungen. Abschlags- und Schlussrechnungen mahnt die Automatik nicht.“ | Einstellungen: Admin, Büro (`/einstellungen/mahnwesen` → `einstellungen`); Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs (Kommentar Z. 332, Hinweis `mw-owner-only-hint`) |
| `/funktionen/terminplanung` | Web (+ Anzeige Mobile) | `src/components/plantafel/ProjectGanttView.tsx`, `GanttDependencyLayer.tsx`, `src/components/projects/PhaseDependencyEditor.tsx`, `src/api/projectPhases.ts`; Plantafel-Ansicht „Projektplan – Projekte über die Zeit“ (`PlantafelToolbar.tsx:58`), Projektreiter „Terminplanung“; Mobile: `src/features/projects/components/ProjectPhaseSummary.tsx`, `src/features/assignments/components/AssignmentPhaseLine.tsx` | UI-Begriff am Release ist **„Arbeitsabschnitte“** (Web 27 UI-Strings vs. 1 „Bauphase“; Commit `1f25f3d4f` „Arbeitsabschnitte außerhalb des Reiters benennen“ ist im Release). Status Mobile: Geplant, In Arbeit, Abgeschlossen, Verzögert; Warnung „Arbeitsabschnitt ragt über den Projektzeitraum hinaus“; Abhängigkeitspfeile, Versatz „+n AT“ | Plantafel/Projekte: Admin, Büro; App sieht Arbeitsabschnitte im Projekt und am Einsatz |
| `/funktionen/bankabgleich` | Web | `src/pages/Bankumsaetze.tsx`, `src/pages/Zahlungseingaenge.tsx`, `src/components/eingangsrechnungen/ExpensePaymentReconciliationPanel.tsx`, `src/lib/bankImport/{csv,camt}.ts`, `src/api/bankImportAssistant.ts` | „Bankdatei importieren“ (CSV oder camt.053 bis 2 MiB, PDF bis 10 MiB), Zuordnungsstatus „Noch nicht zugeordnet“, „Zugeordnet“, „Vollständig zugeordnet“, „Mögliche Dublette · bitte prüfen“, Leitsatz „Ein Umsatz, eine nachvollziehbare Zuordnung“; KI-Vorschläge nur nach ausdrücklicher Anforderung mit Creditverbrauch (`bankImportAssistant.ts:102`); Zahlungseingänge: „Zahlung an einer Rechnung erfassen“ | Finanzen: Admin; Büro nur mit Finanzfreigabe (Rolle Büro-Leitung) |
| `/funktionen/datenuebernahme` | Web | `src/pages/Datenimport.tsx` (Route `/daten-uebernehmen`), `src/components/import/*`, `src/lib/import/vendorCatalog.ts`, `vendorSources.json`, `importLimits.ts` | Titel „Daten importieren mit KI“ / „Daten übernehmen“ / „Kunden importieren“ / „Projekte importieren“ / „Stammdaten importieren“; Leitsatz „Dateien prüfen, Daten zuordnen und kontrolliert übernehmen.“; Formate CSV/TSV/TXT/XLSX (`readImportSources.ts:163–170`), Grenzen 10 MiB/Datei, 25.000 Zeilen; Exportanleitungen für 10 Anbieter (Craftnote, plancraft, HERO, BauSU, TAIFUN, TopKontor, HAPAK, STREIT, Labelwin, SCC-CONTROL); „Für die kostenlose Import-KI musst du keine Zahlungsdaten hinterlegen.“ | „Für den Datenimport brauchst du die Rolle Admin oder Büro-Leitung“ (Datenimport.tsx Z. 153) |
| `/funktionen/maengelmanagement` | Web + Mobile | Web `src/components/projects/bauakte/DefectsBoard.tsx`, `defectMeta.ts`, `src/api/defects.ts`; Mobile `DefectsScreen.tsx`, `DefectDetailScreen.tsx` | Felder (Mobile): Titel, Ort („z.B. Wohnzimmer, 2. OG“), Priorität (Niedrig/Mittel/Hoch/Kritisch), „Zu erledigen bis“, „Zuständig“ (Mitarbeiter oder Nachunternehmer), Fotos „Vorher“/„Nachher“, „Verlauf“, Erinnerung „Mangel fällig“, Liste „Überfällig“. Status Web: Offen, In Arbeit, Behoben, Geprüft; Mobile: Offen, In Bearbeitung, Behoben, Geprüft (Zusammenfassung „In Arbeit“). Abnahme zeigt „Offene Mängel: n“ | Projekte: Admin, Büro (Bauakte); App: Mitarbeitende mit Projektzugriff |

**Folgerung:** Alle sechs Seiten sind gerechtfertigt (live, beworben, eigener Keyword-Map-Eintrag). Für Terminplanung empfiehlt sich `platforms: ["web", "mobile"]` mit den zwei Mobile-Belegen oben; sonst bleibt `["web"]` wie im Register.

## Rollenmodell (Web-Release)

Belegt in `src/types/license.ts` und `src/lib/subscription/roles.ts` am Release [VERIFIED: git show origin/release]:

- **Lizenzstufen:** `admin` („Admin-Lizenz – Vollzugriff – Web, App, Team, Finanzen, Einstellungen“), `buero` („Büro-Lizenz – Web + App – Projekte, Kunden, Dokumente, Plantafel“), `app` („App-Lizenz – Nur App – Zeiterfassung, zugewiesene Projekte“). Auf der Website heißen Admin/Büro gemeinsam **Voll-Lizenz** (`lib/site.ts` tarife: `produktlizenz: "Admin oder Büro"`).
- **Fünf Rollen-Presets:** Admin; Büro-Leitung (alle Projekte, Finanzen sichtbar); Büro-Projektleitung (nur zugewiesene/eigene Projekte, keine globalen Finanzen); Mobil-Teamleitung (nur App, Zeiten anderer lesen/erfassen/korrigieren); Mobil-Teammitglied (nur App, eigene Zeiten, zugewiesene Projekte).
- **Zugriffsmatrix** `FEATURE_ACCESS`: `finanzen` nur Admin (Büro per `finanzen_sichtbar` = Büro-Leitung); `team_verwaltung` nur Admin; `projekte`, `kunden`, `dokumente`, `plantafel`, `lager`, `einstellungen` Admin + Büro; `zeiterfassung`, `mobile_app` alle drei; `preise_sehen` App aus.
- **Routen-Gates** (`src/App.tsx`): Eingangsrechnungen/Buchhaltung/Bankumsätze/Zahlungseingänge/Buchungsjournal → `finanzen`; `/steuerberater-export` → `angebote_rechnungen`; `/team` → `team_verwaltung`; `/einstellungen/mahnwesen` → `einstellungen`; `/daten-uebernehmen` ohne Routen-Gate, prüft im Inhalt (Admin oder Büro-Leitung). Controlling-Reiter im Projekt ist „finanz-gegated“ (`ProjectDetail.tsx` Z. 241–247).
- **Mobile:** `OrganizationRole` admin/manager/employee („Administrator/Manager/Mitarbeiter“), Navigation nach Lizenz: App-Lizenz → Tabs Einsätze, Zeiten, Projekte, Mehr; Büro/Admin → Home, Projekte, Kunden, Mehr (`src/shared/lib/navigation.ts`).

**Vorschlag Rollen je Funktion** (Abschnitt 3 der Vorlage; nur Lizenz- und Rollennamen aus dem Release):

| Funktion | Web (wer) | Mobile (wer) |
|---|---|---|
| dashboard | Admin, Büro (Zahlen nach Rechten) | – (Web-Seite; App-Dashboard existiert nur im Büro-Layout, nicht beworben) |
| projektverwaltung | Admin, Büro-Leitung (alle Projekte), Büro-Projektleitung (eigene/zugewiesene) | App-Lizenz: zugewiesene Projekte |
| angebote, rechnungen, e-rechnung, gaeb | Admin, Büro | Dokument unterschreiben je Rolle und Freigabe (nur angebote) |
| buchhaltung, eingangsrechnungen (Web), bankabgleich, nachkalkulation | Admin, Büro-Leitung (Finanzfreigabe) | Belegscan nur mit Finanzfreigabe (eingangsrechnungen) |
| mahnwesen | Admin, Büro; Fristen/Gebühren/Stufen nur Inhaber | – |
| plantafel, terminplanung | Admin, Büro | alle: eigene Einsätze bzw. Arbeitsabschnitte |
| zeiterfassung | Admin, Büro (Auswertung) | Mobil-Teammitglied (eigene), Mobil-Teamleitung (auch fremde) |
| lager | Admin, Büro | berechtigte Mitarbeitende (Scan, Bestand freigegebener Lager) |
| baudokumentation, maengelmanagement, aufmass, arbeitsanweisungen | Admin, Büro | Mitarbeitende mit Projektzugriff |
| team | Admin (Rollen und Sitze vergibt laut Rollentext nur der Inhaber) | Urlaub beantragen: alle |
| kundenportal | Admin, Büro laden ein; Kunde mit eigenem Login | – |
| datenuebernahme | Admin, Büro-Leitung | – |

## Mobile-App-Umfang (FEAT-03) mit Belegen

Alle Pfade unter `src/features/` bzw. `src/shared/` am Mobile-Release `5610a064` [VERIFIED: git ls-tree origin/release].

| FEAT-03-Punkt | Screen/Datei | Bildschirmname (de) | Tab (App-Lizenz) | Belegte Status/Felder | Live |
|---|---|---|---|---|---|
| Zeiterfassung mit Standort | `time-tracking/screens/TimeTrackingScreen.tsx`, `shared/hooks/useGeolocation.ts`, `shared/lib/geo/nearestProject.ts` | „Zeiterfassung“ (Tabs „Zeiten“, „Urlaub“) | Zeiten | „Starten“, „Stoppen“, „Heute erfasst“, „Erfasster Standort“ | ja |
| Einsätze mit Navigation | `assignments/screens/AssignmentsListScreen.tsx`, `DispatchDetailScreen.tsx`, `hooks/useDirections.ts` | „Einsätze“, Detail „Einsatz“ | Einsätze | Offen, Angenommen, In Arbeit, Erledigt, Abgesagt; „Projekt öffnen“ | ja |
| Aufmaß | `room-measurements/screens/RoomMeasurementsScreen.tsx` | „Aufmaß“ (Räume, „Abzüge von der Wandfläche“, „Freie Messzeilen“, Fotos) | Projekte | – | ja |
| Baudoku | `projects/screens/ProjectFilesScreen.tsx`, `construction-reports/*` | „Bautagesberichte“, Projektdateien | Projekte | – | ja |
| Besichtigung | `site-visit/screens/SiteVisitScreen.tsx` | „Besichtigung“ | Projekte | „Foto aufnehmen“, „Video aufnehmen“, „Sprachnotiz aufnehmen“, „Notiz“, „Fertig hochgeladen“ | ja |
| Bautagesbericht | `construction-reports/screens/DailyReportScreen.tsx`, `ConstructionReportsScreen.tsx` | „Bautagesberichte“ / „Bautagesbericht“ | Projekte | Entwurf, Unterschrieben, Abgeschlossen; Abschnitte Wetter, „Ausgeführte Arbeiten“, „Materialverbrauch“ | ja |
| Mängel | `defects/screens/DefectsScreen.tsx`, `DefectDetailScreen.tsx` | „Mängel“ | Projekte | Offen, In Bearbeitung, Behoben, Geprüft; Priorität; Frist | ja |
| Abnahme mit Unterschrift | `acceptance/screens/AcceptanceScreen.tsx`, `AcceptanceProtocolsScreen.tsx`, `AcceptanceProtocolDetailScreen.tsx`, `shared/components/SignaturePad.tsx` | „Abnahmeprotokolle“ / „Abnahmeprotokoll“ | Projekte | Abgenommen, Abgenommen mit Mängeln, Abgelehnt; „Teilabnahme“; „Auftraggeber unterschreibt“, „Auftragnehmer unterschreibt“ | ja |
| Arbeitsschritte | `work-steps/components/WorkStepsSection.tsx` | „Arbeitsschritte“ | Projekte | „erledigt“, „erledigt von {Name} am {Datum}“ | ja |
| Urlaub | `vacation/components/VacationTab.tsx` | „Meine Urlaubsanträge“ (Tab „Urlaub“ in Zeiterfassung) | Zeiten | Ausstehend, Genehmigt, Abgelehnt | ja |
| Lager-Scan | `inventory/screens/InventoryScanScreen.tsx`, `InventoryScreen.tsx` | Lager („Barcode scannen“, „Barcode und Foto“, Filter Werkzeuge/Material) | Mehr | „Zubuchen“, „Bestand nicht verfügbar“ | ja |
| Belegscan | `supplier-invoices/screens/ScanReceiptScreen.tsx` | „Beleg scannen“ | Mehr | – | ja |
| Chat | `chat/screens/ChatScreen.tsx`, `messages/screens/InboxScreen.tsx`, `DirectChatScreen.tsx` | „Projekt-Chat“, „Nachrichten“ | Projekte / Mehr | – | ja |
| Offline | `shared/hooks/useOfflineQueueSync.ts`, `useOfflineMutation.ts`, `shared/components/SyncStatusBadge.tsx`, `OfflineIndicator.tsx` | Statusanzeigen | – | „Offline“, „Offline · {n} ausstehend“, „Synchronisiere… {n} ausstehend“, „{n} nicht synchronisiert“ | ja, **mit Grenzen** (Register-Limitation „Keine vollständige Offline-Zusage“) |
| 21 Sprachen | `shared/i18n/locales/*` (21 Ordner) | – | – | `mobileLocales.length === 21` | ja |

Zusätzlich live, aber nicht in der FEAT-03-Liste: Kunden („Kunden“, Business-Tab bzw. Mehr-Fächer), Dokument unterschreiben (`documents/screens/DocumentSignScreen.tsx`), Projekte anlegen (`CreateProjectScreen.tsx`), Feedback. Kunden sind im Register als „Kunden in der App“ beworben und gehören auf `/app`.

**Phone-Tabs:** `PHONE_TABS` in `components/v2/PhoneFrame.tsx` Z. 13–18 bildet exakt das App-Lizenz-Layout ab (Einsätze, Zeiten, Projekte, Mehr). Für Szenen aus dem Mehr-Fächer (Lager, Beleg scannen, Nachrichten, Kunden) ist `activeTab: "Mehr"` korrekt; ein Business-Layout (Home/Kunden) ist im Rahmen nicht abbildbar und wird nicht gebraucht.

## Szenen (MEDIA-01): Bestand und Vorschlag

**Bestand (`lib/scenes.ts`):** 6 Szenen (`web:Plantafel`, `app:Zeiterfassung`, `app:Mängel`, `app:Aufmaß`, `web:Rechnungen`, `app:Einsätze`), `cardScenes` für 5 Slugs (Z. 137–143). `FeatureSnippet`-Szenen erfüllen D-06 nur unterhalb der Falz: Sie sind Client-Komponenten, haben laut 05-06 behobene CLS-Ursachen und eine reduced-motion-Prüfung (E2E Z. 322), sind aber nicht im v2-Rahmen gekennzeichnet und nicht für das LCP geeignet.

**Vorschlag je Detailseite** (Seitenkopf-Visual; Zeilen ≤ 24 Zeichen, ≤ 5 Zeilen; Beispieldaten fiktiv, Labels und Status aus dem Release):

| Seite | Rahmen | Bildschirm (Kurzform) | Voller Beleg | Zeilen/Status (Vorschlag) |
|---|---|---|---|---|
| dashboard | Browser | `web:Übersicht` | `web:src/pages/Dashboard.tsx` (PageHeader „Übersicht“, „Aktuelle Projekte“, „Fällig am“, „Budget“) | Projektzeilen mit „Fällig am“-Datum; Widget-Labels bei Umsetzung gegen Dashboard-Widgets prüfen |
| projektverwaltung | Phone | `app:Projekte` | `mobile:src/features/projects/screens/ProjectsScreen.tsx` | 3 Projekte, Status Geplant / In Arbeit / Abgeschlossen (projects.json) |
| angebote | Browser | `web:Angebot` | `web:src/pages/DocumentEditorPage.tsx` | 3 Positionen mit Betrag + MiniStatus „Entwurf“ |
| rechnungen | Browser | `web:Rechnungen` | Bestand `rechnungenScene` | Bestand |
| e-rechnung | Browser | `web:Rechnungen` oder `web:Dokument` | `web:src/pages/DocumentDetail.tsx`, `supabase/functions/generate-einvoice/index.ts` | Zeilen „XRechnung“, „ZUGFeRD“ – Formatbezeichnungen bei Umsetzung im Download-Dialog prüfen; sonst Ablaufgrafik |
| buchhaltung | Browser | `web:Buchhaltung` | `web:src/pages/SteuerberaterExport.tsx` | „Prüfung“, „Festschreiben“, „Übergabe“, „SKR03“, „CSV-Datei“ |
| eingangsrechnungen | Phone | `app:Beleg scannen` → Kurzform ohne Leerzeichen, z. B. `app:Belegscan` | `mobile:src/features/supplier-invoices/screens/ScanReceiptScreen.tsx` | Web-Status Offen / Teilbezahlt / Bezahlt / Ausgeglichen (`web:src/lib/receiptList.ts:372`) für ein Browser-Pendant |
| plantafel | Paar | `web:Plantafel` + `app:Einsätze` | Bestand | Bestand |
| zeiterfassung | Phone | `app:Zeiterfassung` | Bestand | Bestand |
| lager | Browser | `web:Lager` | `web:src/pages/Lager.tsx` (Reiter Bestand, Bewegungen, Inventur, Lagerorte, Material) | 3 Artikel mit Bestand |
| baudokumentation | Phone | `app:Bautagesberichte` | `mobile:src/features/construction-reports/screens/ConstructionReportsScreen.tsx` | 3 Berichte, Status Entwurf / Unterschrieben / Abgeschlossen |
| aufmass | Phone | `app:Aufmaß` | Bestand | Bestand |
| arbeitsanweisungen | Phone | `app:Arbeitsschritte` | `mobile:src/features/work-steps/components/WorkStepsSection.tsx` | 3 Schritte, „erledigt“ |
| team | Browser | `web:Mitarbeiter` | `web:src/pages/Mitarbeiter.tsx` | Namen + Rollen „Admin“, „Büro-Leitung“, „Mobil-Teamleitung“, „Mobil-Teammitglied“ (`roles.ts` Z. 90–95) |
| nachkalkulation | Browser | `web:Controlling` | `web:src/components/projects/ProjectControllingTab.tsx` | Gesamtkosten, Fortschritt, Überschuss, Plan/Ist – Labels bei Umsetzung prüfen |
| kundenportal | Browser | `web:Kundenportal` | `web:src/pages/portal/CustomerPortalHome.tsx` („Ihre Unterlagen“) | Angebot, Rechnung, Termin |
| gaeb | Browser | `web:GAEB-Export` | `web:src/components/DocumentEditor/GAEBExportDialog.tsx` | „X83 Ausschreibung“, „X84 Angebotsabgabe“ (gekürzte Labels), oder Positionsvorschau aus dem Import |
| mahnwesen | Browser | `web:Mahnwesen` | `web:src/pages/settings/MahnwesenSettings.tsx` | „Zahlungserinnerung“, „1. Mahnung“, „2. Mahnung“ mit Beispielfristen „7 Tage“ usw. |
| terminplanung | Browser | `web:Projektplan` | `web:src/components/plantafel/ProjectGanttView.tsx` | `MiniWeek`-Balken mit Arbeitsabschnitt-Namen (Beispieldaten) |
| bankabgleich | Browser | `web:Bankumsätze` | `web:src/pages/Bankumsaetze.tsx` | Umsätze mit Status „Zugeordnet“ / „Noch nicht zugeordnet“ |
| datenuebernahme | Browser | `web:Datenübernahme` | `web:src/pages/Datenimport.tsx` | „Kunden importieren“, „Projekte importieren“, „Stammdaten importieren“ |
| maengelmanagement | Phone | `app:Mängel` | Bestand `maengelScene` + Status | Offen / In Bearbeitung / Behoben |

**App-Kacheln `/app`** (PhoneFrame width 160/194): Zeiterfassung (Bestand), Einsätze (Bestand), Aufmaß (Bestand), Besichtigung (`app:Besichtigung`, Aufnahmearten), Bautagesberichte, Mängel (Bestand), Abnahmeprotokolle (`app:Abnahme`, Ergebnis „Abgenommen“, „Abgenommen mit Mängeln“, „Teilabnahme“), Arbeitsschritte, Urlaub (`app:Urlaub`, Ausstehend/Genehmigt), Lager-Scan (`app:Lager`, activeTab Mehr), Beleg scannen (activeTab Mehr), Nachrichten/Projekt-Chat, Kunden (activeTab Mehr). Offline und 21 Sprachen als `KeyFacts`, nicht als Phone.

**Kurzform-Regel:** `SCREEN_EVIDENCE = /^(web|app):[^\s/]+$/` (evidence.ts) verbietet Leerzeichen und „/“ → „Beleg scannen“ als `app:Belegscan`, „Bankumsätze“ ok, „GAEB-Export“ ok. Jeder neue volle Beleg muss im Register vorkommen (Muster `tests/styleguide.test.ts:73–86`) – den Test auf `allScenes` erweitern.

## Zuordnung der übrigen Zusatzfunktionen (Discretion, Empfehlung)

Nach der Überführung der sechs Seiten bleiben 8 beworbene Zusatzfunktionen in `liveExtras`:

| Zusatzfunktion (Register) | Gruppe (bleibt) | Abschnitt auf Detailseite | Begründung | FeatureList-Ziel (neu) |
|---|---|---|---|---|
| Angebotsunterschrift online | angebot | `/funktionen/angebote` | Register führt `QuoteSigning.tsx` bereits als Angebots-Beleg | `/funktionen/angebote` |
| Besichtigung | angebot | `/funktionen/aufmass` | Vor-Ort-Aufnahme vor dem Angebot (Fotos, Videos, Sprachnotizen je Raum) | `/funktionen/aufmass` |
| Kunden in der App | angebot | `/funktionen/projektverwaltung` (Auftragsverwaltung) + `/app` | Kundendaten gehören zum Auftrag | `/funktionen/projektverwaltung` |
| Abnahme und Teilabnahme | baustelle | `/funktionen/baudokumentation` (Querverweis von `maengelmanagement`) | Bautagebuch-Seite trägt bereits Unterschrift mit Ort/Zeit | Hilfe `abnahme-dokumentieren` bleibt oder Detailseite |
| Bautagesbericht | baustelle | `/funktionen/baudokumentation` | Keyword „bautagebuch app“ | Hilfe bleibt oder Detailseite |
| Lager-Scan und Wareneingang | baustelle | `/funktionen/lager` | Lager-Beleg `goodsReceipt.ts` | Hilfe `wareneingang-buchen` bleibt |
| Projekt-Chat und Nachrichten | team | `/funktionen/projektverwaltung` (+ Erwähnung `/funktionen/team`) | Projektchat im Auftrag | bestehend `/funktionen/projektverwaltung` |
| 21 Sprachen in der Mobile-App | team | `/funktionen/team` + KeyFact `/app` | Mitarbeiter-App | `/app` (Sitemap-Route, `kind` „funktion“ passt nicht → neuer kind „seite“ oder Ziel `/funktionen/team`) |

Gruppen danach: angebot (angebote, aufmass, kundenportal, **gaeb**) + 3 Extras; planung (plantafel, projektverwaltung, arbeitsanweisungen, **terminplanung**); baustelle (zeiterfassung, baudokumentation, lager, **maengelmanagement**) + 3 Extras; rechnung (rechnungen, e-rechnung, **mahnwesen**), keine Extras; buchhaltung (buchhaltung, eingangsrechnungen, nachkalkulation, dashboard, **bankabgleich**), keine Extras; team (team, **datenuebernahme**) + 2 Extras. `app/funktionen/page.tsx` Z. 70 rendert `FeatureList` nur bei `extras.length > 0` → leere Gruppen-Listen sind unkritisch. Mega-Menü wächst auf 22 Funktionslinks (max. 5 je Gruppe) → Höhe/Drawer im E2E prüfen.

## SEO: Soll/Ist und Konflikte

Ist: Jede Detailseite rendert heute Title „{Name} für Handwerksbetriebe | CraftOS“, H1 = Marketingsatz (`heroTitle`), Description = Intro. Soll (Keyword-Map, alle Längen geprüft; Titel inkl. Suffix ≤ 60, Description 135–155):

| Pfad | Hauptkeyword (Vol./KD) | Title (Länge) | H1 (Länge) | H1 enthält Keyword (normiert, wie Test) |
|---|---|---|---|---|
| /app | handwerker app (20/21) | Handwerker-App für die Baustelle (42) | Die Handwerker-App für Ihr Team auf der Baustelle (49) | ja |
| dashboard | kennzahlen handwerksbetrieb (10/26) | 52 | Die Kennzahlen Ihres Handwerksbetriebs auf einen Blick (54) | **nein** (Wortstamm ja) |
| projektverwaltung | auftragsverwaltung software (170/9) | 51 | Auftragsverwaltung: alle Informationen beim Projekt (51) | **nein** |
| angebote | angebotssoftware (210/8) | 56 | Angebotssoftware, die bis zur letzten Position passt (52) | ja |
| rechnungen | rechnungssoftware handwerker (210/18) | 57 | Rechnungssoftware: von der Arbeit zur prüfbaren Rechnung (56) | **nein** |
| e-rechnung | e-rechnung handwerk (50/17) | 52 | E-Rechnung im Handwerk mit XRechnung und ZUGFeRD (48) | **nein** (Wortstamm ja) |
| buchhaltung | buchhaltung handwerk (210/8) | 53 | Buchhaltung im Handwerk: sauber vorbereitet für die Steuerberatung (**66**) | **nein** (Wortstamm ja) |
| eingangsrechnungen | eingangsrechnungen digitalisieren (90/8) | 57 | 44 | ja |
| plantafel | plantafel software (90/24) | 51 | 42 | ja |
| zeiterfassung | zeiterfassung handwerk (390/12) | 54 | Zeiterfassung im Handwerk: die Zeit landet beim Projekt (55) | **nein** (Wortstamm ja) |
| lager | lagerverwaltung app (210/14) | 44 | Lagerverwaltung per App: wissen, was da ist (43) | **nein** (Wortstamm ja) |
| baudokumentation | bautagebuch app (590/7) | 50 | Bautagebuch-App: was auf der Baustelle passiert, bleibt im Projekt (**66**) | ja |
| aufmass | aufmaß app (590/12) | 55 | 39 | ja |
| arbeitsanweisungen | arbeitsanweisung erstellen (90/8) | 46 | Arbeitsanweisungen erstellen: … (59) | **nein** (Plural) |
| team | mitarbeiter app handwerk (10/24) | 51 | Team und Rechte: jeder Zugang passt zur Aufgabe (47) | **nein** |
| nachkalkulation | nachkalkulation handwerk (40/7) | 55 | Nachkalkulation: was hat der Auftrag wirklich gekostet? (55) | **nein** |
| kundenportal | kundenportal software (110/13) | 53 | Kundenportal: ein gemeinsamer Ort für Ihre Kunden (49) | **nein** |
| gaeb | gaeb software (140/18) | 49 | GAEB-Software für Ausschreibung und Angebot (43) | ja |
| mahnwesen | mahnwesen software (40/8) | 43 | Mahnwesen: offene Rechnungen konsequent nachfassen (50) | **nein** |
| terminplanung | bauzeitenplan software (140/12) | 46 | Terminplanung mit Bauphasen und Abhängigkeiten (46) | **nein** (Kopfwort fehlt) |
| bankabgleich | zahlungsabgleich (20/8) | 43 | Bankabgleich: Zahlungen **automatisch** zuordnen (44) | **nein** + **unbelegt** |
| datenuebernahme | datenimport (90/8) | 46 | Datenübernahme beim Umstieg auf CraftOS (39) | **nein** (Kopfwort fehlt) |
| maengelmanagement | mängelmanagement (140/8) | 47 | 50 | ja |

Quelle: Auswertung von `docs/seo/keyword-map.json` mit der Normierung aus `tests/keyword-map.test.ts:18–25` [VERIFIED: lokaler Node-Lauf].

**Konsequenzen für den Plan:**
1. Die Phase-6-Prüfung `norm(h1)` enthält `norm(primary.keyword)` (keyword-map.test.ts Z. 207) lässt sich nicht unverändert auf Phase 7 übertragen. Empfehlung: Für Detailseiten gilt „H1 === target.h1“ (strikt) plus „H1 enthält das Kopfwort des Hauptkeywords“ (erstes Wort, normiert; z. B. `rechnungssoftware`, `auftragsverwaltung`, `mahnwesen`). Danach scheitern nur noch **team** („mitarbeiter“), **terminplanung** („bauzeitenplan“), **bankabgleich** („zahlungsabgleich“) und **datenuebernahme** („datenimport“). Diese vier H1-Zielwerte vor der Umsetzung in `keyword-map.json` und `KEYWORD-MAP.md` umformulieren. Gleichzeitig „automatisch“ bei bankabgleich streichen und die zwei 66-Zeichen-H1 (buchhaltung, baudokumentation) auf ≤ 60 kürzen. Vorschläge: „Zahlungsabgleich: Bankumsätze nachvollziehbar zuordnen“, „Datenimport beim Umstieg auf CraftOS“, „Bauzeitenplan mit Arbeitsabschnitten und Abhängigkeiten“, „Mitarbeiter-App und Rechte: jeder Zugang passt“ [ASSUMED: Formulierungen, Prüfung durch Test].
2. Title und Description aller 23 Ziele bestehen den D-14-Test bereits (Z. 153–163). Die Testgrenze für Descriptions liegt bei **155**, nicht bei 158 wie in D-10 → 155 gilt.
3. Statuswechsel „geplant“ → „bestehend“ nur zusammen mit der Sitemap-Aufnahme (Test Z. 146–150). Für die zwei Einträge mit `reason` (datenuebernahme, maengelmanagement) existieren die Rohdateien und enthalten das Keyword (geprüft). Für gaeb, mahnwesen, terminplanung und bankabgleich steht das Hauptkeyword in `pageCandidates` → der Herkunftstest (Z. 125–136) bleibt grün.
4. Der Test „Bauphasen ist Hauptbegriff“ (Z. 178–184) betrifft `/hilfe/projekt-phasen-anlegen`, nicht die neue Terminplanungsseite. Im Produkt heißen die Einträge inzwischen „Arbeitsabschnitte“; der Seitentext verwendet deshalb den UI-Begriff, die Suchbegriffe bleiben Keywords.
5. Menü-Ankertexte: Funktionsnamen bleiben Linktexte. Wo es natürlich ist, darf der Name den Wortstamm aufnehmen (D-10), z. B. „Mängelmanagement“, „Mahnwesen“, „GAEB & DATANORM“. `featureCard.title` ≤ 32.

**Strukturierte Daten:**
- Detailseite: `BreadcrumbList` (Start → Funktionen → Name), `FAQPage` aus genau dem Array, das `FaqList` rendert, `WebPage` (neu in `lib/schema.ts`: `@id` `{url}#webpage`, `url`, `name` = Title, `description`, `inLanguage: "de-DE"`, `isPartOf` `{site.url}/#website` oder Organisation, `about` `{site.url}/#software`, `breadcrumb` als Verweis). Kein HowTo.
- `/app`: `BreadcrumbList` (Start → Mobile-App), `FAQPage`, `MobileApplication` mit eigener `@id` `{site.url}/app#mobile-app` (die globale `SoftwareApplication` `#software` bleibt im Layout), `operatingSystem: "iOS, Android"`, `applicationCategory: "BusinessApplication"`, `sameAs`/`installUrl` = Store-URLs, `offers` App-Lizenz 9,95 € netto/Monat mit `UnitPriceSpecification` wie im Bestand. Google zeigt dafür ohne `aggregateRating` oder `review` kein Rich Result [CITED: developers.google.com/search/docs/appearance/structured-data/software-app]. Bewertungen nicht erfinden; das Markup dient der Entitätsbeschreibung.
- FAQ-Rich-Results zeigt Google seit August 2023 regulär nur noch für bekannte Behörden- und Gesundheitsseiten. Das FAQPage-Markup bleibt trotzdem sinnvoll für KI-Suchen und schadet nicht [CITED: developers.google.com/search/docs/appearance/structured-data/faqpage; searchengineland.com].

**FAQ-Kandidaten** (3–4 je Seite; nur belegte Antworten; Quelle Rohdaten `docs/seo/data/kwmap/questions--*.json` und Hilfeartikel):
- baudokumentation: „Wer muss das Bautagebuch unterschreiben?“ / „Was gehört in ein Bautagebuch?“ → Antwort nur produktbezogen (Felder Wetter, ausgeführte Arbeiten, Material, Unterschrift mit Ort/Zeit), keine Rechtsberatung.
- aufmass: „Wie erstellt man ein Aufmaß?“ (questions--aufmass), „Werden Maße automatisch gemessen?“ (Note: keine Laseranbindung).
- mahnwesen: „Wann kommt die Mahnung nach der Zahlungserinnerung?“ (questions--mahnung, 20/Monat) → Fristen in „Tage überfällig“ selbst festlegen; „Werden Abschlagsrechnungen gemahnt?“ → nein, nur Rechnungen.
- e-rechnung: „Ist eine PDF-Rechnung eine E-Rechnung?“ (questions--e-rechnung) → Note: gewöhnliche PDF nein.
- maengelmanagement/baudokumentation: Abnahme-Fragen aus questions--abnahmeprotokoll („Was muss im Abnahmeprotokoll stehen?“) → Prüfpunkte, Ergebnis, Unterschriften.
- zeiterfassung: „Erfasst die App dauerhaft den Standort?“ → nein, Start/Stopp.
- gaeb: „Welche GAEB-Formate werden unterstützt?“ → X83-Import, X83/X84-Export, nicht GAEB 90/2000.
- bankabgleich: „Ist eine Bankverbindung nötig?“ → Dateiimport CSV/camt.053/PDF [VERIFIED]; eine Online-Bankanbindung ist am Release nicht belegt → nicht behaupten.
- datenuebernahme: „Aus welcher Software kann ich Daten übernehmen?“ → Anleitungen für 10 Anbieter, Dateien CSV/XLSX.
- /app: „Funktioniert die App offline?“ (Antwort mit Grenzen aus `mobile-offline-synchronisierung.md`), „Ist die App in der Voll-Lizenz enthalten?“, „In welchen Sprachen gibt es die App?“, „Kostet die App extra?“ (App-Lizenz 9,95 € netto für Mitarbeitende).

## Architecture Patterns

### System Architecture Diagram

```
Build (next build, SSG)
  │
  ├─ generateStaticParams ── lib/funktionen.ts (22 Slugs) ───────────────┐
  │                                                                      │
  ├─ generateMetadata(slug) ─ lib/keyword-map.ts → target{title,h1,desc} │
  │                                                                      ▼
  └─ Page(slug) ─► lib/funktionsdetails/index.ts  getFunktionsdetail(slug)
                      │   (server-only; wirft bei Budget-/Satz-/Belegverstoß)
                      │   ├─ Fakten: lib/funktionen.ts (Name, Icon, benefit, Plattformen)
                      │   ├─ Rollen/Plattform: lib/product-register.ts
                      │   ├─ Visual: lib/scenes.ts (FrameScene, Kurzform-Beleg)
                      │   └─ Zusatzabschnitte: REGISTER_IDS/liveExtras (8)
                      ▼
               FunktionsDetail (Server Component, sync, testbar mit renderToString)
                 (1) FunktionsKopf: H1(target.h1) · Lead · CTA site.ctaUrl · Frame/DevicePair
                 (2) SectionHeader + StepFlow (3–5)  [+ optional FeatureSnippet, 8 Seiten]
                 (3) SectionHeader + PlatformBadges + Rollenliste
                 (4) SectionHeader + BentoGrid/FeatureList (+ Zusatzfunktions-Abschnitte)
                 (5) SectionHeader + FaqList ──┐
                 (6) SectionHeader + verwandte Funktionen (2–3)
                 (7) CtaBand
                 JSON-LD: Breadcrumb · FAQPage(◄ gleiches Array) · WebPage
  │
  ▼
HTML auf Vercel ─► sitemap.xml / llms.txt / Mega-Menü / /funktionen (automatisch aus funktionen.ts + funktionsgruppen.ts)
  │
  ▼
Rollout: live-check.mjs (Keyword-Ziele, Kurzformen, 30 data-funktion, ItemList = Sitemap) → IndexNow → se-ranking-sync --check → seo-report
```

### Recommended Project Structure
```
craftos/
├── lib/funktionsdetails/
│   ├── types.ts            # FunktionsdetailInhalt, Schritt, Kernpunkt, Rolle, Faq
│   ├── angebot.ts          # angebote, aufmass, kundenportal, gaeb
│   ├── planung.ts          # plantafel, projektverwaltung, arbeitsanweisungen, terminplanung
│   ├── baustelle.ts        # zeiterfassung, baudokumentation, lager, maengelmanagement
│   ├── rechnung.ts         # rechnungen, e-rechnung, mahnwesen
│   ├── buchhaltung.ts      # buchhaltung, eingangsrechnungen, nachkalkulation, dashboard, bankabgleich
│   ├── team.ts             # team, datenuebernahme
│   └── index.ts            # server-only; getFunktionsdetail(slug), Prüfungen, Zielwerte aus keyword-map
├── lib/app-content.ts      # /app-Inhalte (Kacheln, KeyFacts, FAQ, CTA) – Muster lib/home-content.ts
├── components/funktionen/FunktionsKopf.tsx (+ .module.css)   # neuer Seitenkopf (Muster HomeHero)
├── components/funktionen/FunktionsDetail.tsx                 # sync Server Component (testbar)
├── app/funktionen/[slug]/page.tsx                            # dünn: params → FunktionsDetail
├── app/app/page.tsx                                          # v2-Neuaufbau
├── tests/funktionsdetails.test.ts                            # Budgets, Belege, Parität, FAQ↔Schema, Keyword-Ziele
└── tests/app-seite.test.ts                                   # /app Struktur, Schema, Kennzahlen
```
Ein Modul je Gruppe passt zur strikt sequentiellen Ausführung (D-16): ein Plan bzw. Task je Gruppe, jeweils mit RED/GREEN.

### Pattern 1: Datenmodul mit Aufbauprüfung (Muster `lib/funktionsgruppen.ts`)
**What:** Inhalte als Konstanten, ein Builder prüft beim Laden alle Budgets (`assertTextBudget`, `assertOneSentence`, `assertCount`) und Belegregeln und wirft die UI-SPEC-Fehlertexte; Test ruft den Builder mit Fremddaten.
**When to use:** für alle 22 Detailinhalte und `/app`.

### Pattern 2: Zielwerte aus der Keyword-Map lesen statt kopieren
**What:** `zielwerte(path)` liest `target` aus `keywordMap`; Metadata-Title = `target.title` ohne Suffix „ | CraftOS“. Eine Pflege an einer Stelle; der Test vergleicht das gerenderte Ergebnis mit dem Ziel.
**Warum anders als Phase 6:** Phase 6 hatte 2 Seiten mit Literalen (`lib/home-content.ts` Z. 44–48); bei 23 Seiten wäre das doppelte Pflege.

### Pattern 3: Sync-Kern für testbares Rendern
Die Route bleibt `async` (Next 16 `params: Promise`), rendert aber nur `<FunktionsDetail slug={slug} />`. Vitest rendert `FunktionsDetail` direkt mit `renderToString`; `renderToString` kann keine async-Komponente auflösen.

### Pattern 4: Zusatzfunktionen raus aus `liveExtras` (D-07)
Die sechs Einträge aus `liveExtras` (product-register.ts Z. 190–251, 290–301) entfernen, ihre Belege in `evidence`/`mobileEvidence` unter dem neuen Slug führen, Slugs in `lib/funktionen.ts` und `DETAIL_ZUORDNUNG` ergänzen, `REGISTER_IDS`/`ZUSATZ` um die sechs kürzen. So bleibt „ein Name, eine Quelle“, und die bestehenden Builder-Prüfungen (fehlender Slug, nicht zugeordneter Registereintrag) sichern die Parität automatisch.

### Anti-Patterns to Avoid
- **H2 je Kernpunkt** (Bestand Z. 70): verletzt „höchstens eine H2 je Abschnitt“ → H3 in Kachel/Liste.
- **FAQ synthetisch aus Schritten** (funktionen.ts Z. 683–686): verfehlt FaqList-Minimum 3 und liefert keine Suchfrage.
- **FeatureSnippet als Seitenkopf-Visual:** Client-JS im LCP-Bereich, keine v2-Kennzeichnung.
- **Status-Pills mit frei erfundenen Namen:** `MiniStatusName` ist bewusst auf Dokumentstatus begrenzt (MiniUi.tsx); jede Erweiterung braucht einen Release-Beleg.
- **`FeatureCard` für App-Funktionen ohne Slug:** wirft (FeatureCard.tsx Z. 32–35).
- **Detailtexte mit „automatisch“, „lückenlos“, „offline“ ohne Einschränkung:** Register-Limitations (product-register.ts Z. 400–408) gelten auch für FAQ und Kacheln.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Textbudgets/Satzprüfung | eigene Längenprüfungen je Seite | `components/v2/budgets.ts` (`assertTextBudget`, `assertOneSentence`, `assertCount`, `charCount`) | Unicode-sicher, einheitliche Fehlertexte |
| Geräterahmen | eigenes Phone-/Browser-Markup | `Frame`, `PhoneFrame`, `BrowserFrame`, `DevicePair` | Kennzeichnung, `aria-hidden`/`inert`, Kurzform-Prüfung |
| JSON-LD-Ausgabe | `dangerouslySetInnerHTML` direkt | `components/seo/JsonLd` | escapt `<` (06-05) |
| Belegprüfung gegen Release | neue Git-Logik | `tests/product-register.test.ts` (Belege am Release-Commit) | existiert, deckt `features` + `liveExtras` |
| Menü/Übersicht/Sitemap/llms für neue Seiten | Listen pflegen | `lib/funktionen.ts` + `DETAIL_ZUORDNUNG` | alles andere leitet sich ab |
| Live-Ziele | Listen im Skript | `live-check.mjs` liest `keyword-map.json` und Slugs aus `/sitemap.xml` (06-06) | keine Doppelpflege |
| Formatierung € / Datum | eigene Formatierer | `lib/format.ts` (`euro`, `germanDate`) | Paritätstest prüft Literale |

**Key insight:** Fast alle Folgeänderungen entstehen automatisch, wenn der Slug an genau zwei Stellen steht (`funktionen.ts`, `DETAIL_ZUORDNUNG`). Handarbeit braucht es nur bei den hart kodierten Testzahlen und bei den Inhalten.

## Common Pitfalls

### Pitfall 1: Keyword-Test mit dynamischen Seiten
**What goes wrong:** `PHASE6_SEITEN` erwartet `mod.metadata` und rendert `mod.default` synchron; Detailseiten haben `generateMetadata` und eine async `Page`.
**How to avoid:** Eigener Fall „Phase-7-Seiten“: `await generateMetadata({ params: Promise.resolve({ slug }) })`, Rendern über die sync `FunktionsDetail`. `/app` hat statisches `metadata` und passt ins bestehende Muster.
**Warning signs:** `renderToString` liefert `[object Promise]` oder wirft „async component“.

### Pitfall 2: Status-Umstellung ohne Sitemap (oder umgekehrt)
**What goes wrong:** `keyword-map.test.ts` Z. 146–150 schlägt fehl, solange „geplant“ in der Sitemap steht oder „bestehend“ fehlt.
**How to avoid:** Slug in `funktionen.ts` (→ Sitemap) und Statuswechsel im selben Task/Commit.

### Pitfall 3: `liveExtras` doppelt und Paritätsbruch
**What goes wrong:** Bleiben die sechs Einträge in `liveExtras`, erscheinen sie in der Übersicht doppelt (Detail + Zusatz), oder `REGISTER_IDS` wirft „keiner Gruppe zugeordnet“.
**How to avoid:** Pattern 4. Der Belegtest für Release-Pfade muss weiterhin alle Belege finden (`expect(all.length) > 80`).

### Pitfall 4: FeatureSnippet entfernen bricht ~40 E2E-Fälle
**What goes wrong:** `function-illustrations.pw.cjs` besucht acht Detailseiten und erwartet dort die Animation (Z. 4–9).
**How to avoid (Empfehlung zu D-06):** Auf genau diesen acht Seiten bleibt `FeatureSnippet` das eine erlaubte animierte Element und steht im Ablauf-Abschnitt (2) neben/unter `StepFlow`, also unterhalb der Falz und nicht als LCP. Auf allen anderen Seiten wird es entfernt (heute u. a. fachfremd auf baudokumentation). Damit bleiben Tests und Varianten erreichbar, und kein Code verwaist. Alternative: entfernen und Tests umhängen bzw. skippen. Dann verwaisen die Varianten dashboard, beleg, lager und aufmass (Dead Code, Löschung bräuchte Freigabe).
**Warning signs:** E2E „Funktionsillustration …“ rot; fallow meldet ungenutzte Exporte.

### Pitfall 5: StepFlow-Budget sprengt Bestandsschritte
**What goes wrong:** Schritte sind heute Fließtext bis 137 Zeichen; `step.text` ≤ 80, `step.title` ≤ 28.
**How to avoid:** Schritte neu als {title, text} schreiben; Details in FAQ/Hilfe (D-04).

### Pitfall 6: Phone-Szenen mit Statusnamen außerhalb `MiniStatusName`
**What goes wrong:** Mängel-, Bericht-, Urlaubs-, Bank- und Abnahmestatus fehlen im Typ; CSS-Farben (`data-status`) fehlen.
**How to avoid:** `MiniStatusName` um belegte Namen erweitern (je Name ein Kommentar mit Release-Beleg) und Tonklassen (neutral/erfolgreich/Warnung) im CSS ergänzen; Test, dass jeder Name in einer Release-Locale bzw. -Datei vorkommt. Längen ≤ 24 Zeichen („Noch nicht zugeordnet“ = 21, „Abgenommen mit Mängeln“ = 22).

### Pitfall 7: Mobile-Begriffe weichen vom Web ab
**What goes wrong:** Mängelstatus „In Bearbeitung“ (Mobile) vs. „In Arbeit“ (Web); „Bauphasen“ (Register/Keyword) vs. „Arbeitsabschnitte“ (UI Web und Mobile).
**How to avoid:** Szenen nutzen den Begriff der jeweiligen Plattform des Rahmens; Fließtext nutzt den UI-Begriff und nennt „Bauphasen“ nur als Suchbegriff/Synonym.

### Pitfall 8: Überclaims bei Offline, Automatik, Bankanbindung
**What goes wrong:** KeyFact „Offline“ ohne Einschränkung widerspricht der Limitation „Keine vollständige Offline-Zusage“; „automatisch zuordnen“ ist nicht belegt (KI-Vorschläge nur auf Anforderung und gegen Credits).
**How to avoid:** KeyFact z. B. Wert „Offline“, Label „Erfassen ohne Empfang, später senden“ plus `note` mit Grenze; Bankabgleich ohne „automatisch“; keine Online-Banking-Behauptung.

### Pitfall 9: Above-the-fold bei 360×640
**What goes wrong:** Lange H1 (bis 60 Zeichen, 28 px, 3 Zeilen) plus Lead und Visual schieben den CTA unter die Falz.
**How to avoid:** Kopf wie HomeHero (CTA vor dem Visual im DOM, Visual darunter), E2E-Messung je Detailseite in 360×640 analog `home-navigation.pw.cjs:270`; Lead ≤ 110–120 Zeichen.

### Pitfall 10: Mega-Menü mit 22 Links
**What goes wrong:** Höhe des Panels/Drawers, Zeilenumbrüche bei 1121–1250 px (06-03-Sonderfall).
**How to avoid:** Menü-E2E (Disclosure, axe, CLS) nach dem Umbau vollständig laufen lassen; Namen kurz halten.

## Code Examples

### Phase-7-Keyword-Test für dynamische Seiten
```typescript
// Muster nach tests/keyword-map.test.ts:186–209, angepasst für generateMetadata (Next 16: params ist ein Promise)
import { generateMetadata } from "@/app/funktionen/[slug]/page";
import { FunktionsDetail } from "@/components/funktionen/FunktionsDetail";

for (const f of funktionen) {
  const path = `/funktionen/${f.slug}`;
  const { target, primary } = keywordMap.find((k) => k.path === path)!;
  const meta = await generateMetadata({ params: Promise.resolve({ slug: f.slug }) });
  expect(`${String(meta.title)} | CraftOS`, path).toBe(target!.title);
  expect(meta.description, path).toBe(target!.description);
  const html = renderToString(createElement(FunktionsDetail, { slug: f.slug }));
  const h1 = plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)![1]);
  expect(h1, path).toBe(target!.h1);
  expect(norm(h1), path).toContain(norm(primary!.keyword.split(" ")[0])); // Kopfwort-Regel
}
```

### WebPage-Schema (neu in `lib/schema.ts`)
```typescript
// Muster der bestehenden Helfer (breadcrumbSchema/itemListSchema); @id-Verweise auf die globalen Knoten aus app/layout.tsx
export function webPageSchema(p: { path: string; name: string; description: string }) {
  const url = site.url + p.path;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: p.name,
    description: p.description,
    inLanguage: "de-DE",
    about: { "@id": site.url + "/#software" },
    publisher: { "@id": site.url + "/#organization" },
  };
}
```

### FAQ sichtbar = FAQ im Schema
```tsx
// Ein Array für beides (Muster app/page.tsx, 06-04)
<FaqList items={inhalt.faq} />
<JsonLd data={faqSchema(inhalt.faq)} />
```

## D-13: `data-source` – was die Spezifikation verlangt

- 05-UI-SPEC Z. 357: „`source` wird als `data-source` gerendert; Vitest prüft, dass jeder Wert aus dem genannten Modul stammt (z. B. Gleichheit mit formatiertem `tarife`-Wert).“ Die Ableitungsprüfung läuft heute ausschließlich auf den **Inhaltsmodulen** (`tests/home.test.ts:68–80`, `tests/styleguide.test.ts:88–100` schlüsseln über `fact.source`). Im HTML wird nur **Vorhandensein und Gleichheit des Attributs** geprüft (`tests/design-v2-components.test.ts:72–79`) [VERIFIED: Code].
- **Folgerung:** Die Bedingung aus D-13 ist erfüllt; die Kürzung ist zulässig. Umsetzung: Kurzform-Schlüssel direkt als `source` (z. B. `site:trialDays`, `site:tarif-voll-monat`, `site:tarif-app-monat`, `register:mobileLocales`), Laufzeitprüfung im `KeyFacts` analog `assertScreenEvidence` (`/^(site|register):[A-Za-z0-9.-]+$/`), Erwartungsschlüssel in `home.test.ts`/`styleguide.test.ts`/`design-v2-components.test.ts` umstellen, Vermerk in `docs/DESIGN-V2.md` (Abweichung zur 05-UI-SPEC-Beispielliste, inhaltlich gleich). Live-Check „Keine internen Belegpfade“ um `data-source="(tarife|product-register)` erweitern.
- Betroffen: `/` (`lib/home-content.ts:112–115`), `/styleguide` (`lib/styleguide-content.ts:170–173`), neu `/app`.

## D-14: `scrollbar-gutter`

- Regel: `app/globals.css:62–66` (`html { scrollbar-gutter: stable; }`), eingeführt in 06-03 für den Scroll-Lock des Drawers.
- **Prüfweg:** `visual-audit.mjs` (oder kleiner Playwright-Fall) für `/impressum`, `/datenschutz`, `/gibt-es-nicht` in Chromium/WebKit bei 1440 und 390: Screenshot plus Messung `innerWidth - document.documentElement.clientWidth`. Eine sichtbare Rinne entsteht nur bei klassischen (nicht überlagernden) Scrollleisten, also typischerweise im Desktop-Chromium unter Windows. 390-touch/WebKit nutzen Overlay-Scrollleisten, dort ist kein Effekt zu erwarten [ASSUMED].
- **Entscheidungsregel (D-14):** Rinne sichtbar neben dunklem Header/Footer → Gutter nur während des Scroll-Locks setzen (`HeaderShell`-Effekt setzt/entfernt `documentElement.style.scrollbarGutter`), CLS-Test des Menüs muss grün bleiben. Keine sichtbare Rinne → im Rollout-Bericht dokumentieren und schließen.

## /app: empfohlener Aufbau

1. Kopf (FunktionsKopf-Variante oder eigener `AppKopf`): H1 „Die Handwerker-App für Ihr Team auf der Baustelle“, ein Satz, CTA + `StoreLinks`, Phone-Paar (z. B. Einsätze + Zeiterfassung) statt `MobileAppGallery` (Client). QR-Codes nur ≥ 768 px wie im Bestand.
2. `KeyFacts`: 21 Sprachen (`register:mobileLocales`), 9,95 € App-Lizenz pro Monat (`site:…`), „inklusive“ Voll-Lizenz (Text) oder „2“ Plattformen iOS/Android, Offline mit Grenze; `note` Pflicht (netto, Stand).
3. Drei bis vier gegliederte `BentoGrid`-Abschnitte (je 3–7 Kacheln, ≥ 2 Größen): „Zeit und Einsätze“ (Zeiterfassung, Einsätze mit Navigation, Urlaub), „Vor Ort dokumentieren“ (Aufmaß, Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift), „Material und Belege“ (Lager-Scan, Belegscan, Arbeitsschritte), „Team und Kunden“ (Projekt-Chat/Nachrichten, Kunden, 21 Sprachen). Große Kacheln mit `PhoneFrame` (6–8 Phones), kleine mit `TileIcon`; Links auf passende Detailseiten.
4. Offline-Abschnitt kurz (Grenzen als Liste, Link Hilfeartikel).
5. `FaqList` (4–5) + FAQPage; `CtaBand`.
6. `FeatureSnippet variant="zeit"` entfällt hier (Variante bleibt über `/funktionen/zeiterfassung` erreichbar, wenn Pitfall-4-Empfehlung gilt); `MobileAppGallery` entfällt, Datei bleibt (Vermerk Phase 10, wie product-demo).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Detailseite mit PageHero + Fließtext | v2-Vorlage aus Datenmodul | Phase 6 für `/` und `/funktionen` | Phase 7 überträgt das Muster |
| Bauphasen (UI) | Arbeitsabschnitte (UI Web + Mobile) | Web-Commit `1f25f3d4f`, Mobile `5610a064` (19.10.2026) | Seitentexte und Szenen mit UI-Begriff |
| FAQ-Rich-Results für alle | nur Behörden/Gesundheit | Aug. 2023 | FAQPage für KI-Suche, nicht für SERP-Rich-Result |

**Deprecated/outdated:**
- `Funktion.seoTitle`/`seoDescription`/synthetische `faq` in `lib/funktionen.ts`: durch Keyword-Map und Detailmodul ersetzt; Felder entfernen oder aus Zielwerten ableiten (Nutzer: nur Detailseite).
- `heroTitle`/`heroIntro`/`bullets`/`notes`: nur Detailseite und Register (`summary`, `notes`) – beim Umbau Register-Abbildung anpassen.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Vorgeschlagene H1-Umformulierungen (team, terminplanung, bankabgleich, datenuebernahme, Kürzungen) | SEO | gering; Test zeigt Abweichung, Inhaber kann Formulierung ändern |
| A2 | Scrollbar-Rinne tritt nur bei klassischen Scrollleisten (Windows-Chromium-Desktop) auf | D-14 | Messung im Plan klärt es |
| A3 | Dashboard-Widget-Labels, Controlling-KPI-Labels und E-Rechnung-Formatlabels müssen bei Umsetzung exakt nachgelesen werden | Szenen | Szene mit falschem Label – Vitest-Belegtest fängt nur Pfade, nicht Labels |
| A4 | Origin/release beider Repos ist aktuell (kein fetch) | Neue Seiten | neuere Releases könnten Labels ändern; `npm run sync:product:check` im Gate |
| A5 | FeatureSnippet auf acht Seiten im Ablauf-Abschnitt erfüllt D-06 (reduced motion, CLS 0, Budgets) wie heute | Pitfall 4 | E2E `design-v2` Budget und `function-illustrations` prüfen es |

## Open Questions (RESOLVED)

1. **07-UI-SPEC vor der Planung?** — RESOLVED durch D-18 (schlankes 07-UI-SPEC vor der Planung)
   - What we know: Phase 6 hatte ein eigenes 06-UI-SPEC (78 KB); Phase 7 hat „UI hint: yes“, aber kein UI-SPEC.
   - What's unclear: ob der Orchestrator `/gsd-ui-phase 7` vorschaltet.
   - Recommendation: Ein erster Plan (Wave 0/1) legt den UI-Vertrag für `FunktionsKopf`, Abschnittsfolge, Kachelregeln, Szenenkatalog und /app fest (Abschnitt in `DESIGN-V2.md` § 16 inkl. Kaskadennachweis), bevor Inhalte geschrieben werden.
2. **FeatureSnippet auf Detailseiten (D-06)** — RESOLVED durch D-19
   - What we know: 8 Seiten sind an E2E gebunden; Entfernen verwaist 4 Varianten.
   - Recommendation: behalten als ein Element im Ablauf-Abschnitt dieser 8 Seiten, sonst entfernen (Pitfall 4).
3. **Terminplanung mit Mobile-Plattform?** — RESOLVED durch D-20
   - What we know: Mobile zeigt Arbeitsabschnitte read-only (2 Belege).
   - Recommendation: `["web","mobile"]` mit Belegen; Mobile-Teil nur „sehen“, nicht „planen“.
4. **Zusatzeintrag „21 Sprachen“ – Linkziel** — RESOLVED durch D-21 (/app)
   - What we know: `ZusatzZiel.kind` kennt nur „hilfe“ | „funktion“.
   - Recommendation: Ziel `/funktionen/team` (kind „funktion“) – kein Typwechsel nötig.
5. **H1-Testregel** — RESOLVED durch D-22
   - What we know: strikte Normalregel scheitert an 12 Zielwerten.
   - Recommendation: Kopfwort-Regel + 4 Zielwerte anpassen (siehe SEO); dokumentieren in `KEYWORD-MAP.md`.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build, Tests, Skripte | ✓ | v24.12.0 | – |
| npm | Skripte | ✓ | 11.6.2 | – |
| Web-Repo `C:/Projekte/craft-connect-buddy` (`origin/release`) | Belegtests, Register | ✓ | `535206b4` / v4.0.0-test.239 | Test wird übersprungen (`skipIf`) – dann manueller Belegnachweis |
| Mobile-Repo `C:/Projekte/CraftOS - Mobile/craftos-mobile` (`origin/release`) | Belegtests | ✓ (Pfad abweichend von CONTEXT `C:/Projekte/CraftOS-Mobile`, der nicht existiert) | `5610a064` / mobile-v1.0.0-test.93 | – |
| Playwright-Browser (Chromium, WebKit) | E2E | ✓ laut Phase-6-Läufen | 1.63 | – |
| Port 3100 | `next start -p 3100` | vor jedem Lauf prüfen | – | anderen Port setzen (`CRAFTOS_BASE_URL`, `AUDIT_ORIGIN`, `LIVE_ORIGIN`) |
| Koordinations-Rezept für Website-Repo | schwere Läufe auslagern | ✗ (Lücke) | – | lokal nacheinander (wie Phase 6) |
| SE-Ranking (MCP/API) | Rollout `--check`, `seo-report` | im Rollout | Test bis 03.11.2026 | – |

**Missing dependencies with no fallback:** keine.
**Missing dependencies with fallback:** Koordinationsrezept (lokal sequentiell).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^5 (Unit/Parität/Budget), Playwright ^1.63 + axe (E2E) |
| Config file | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` (explizites `testMatch`) |
| Quick run command | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/funktionsgruppen.test.ts tests/keyword-map.test.ts` |
| Full suite command | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build`, danach `npm run test:e2e` gegen eigenen `next start -p 3100` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FEAT-02 | 22 Detailseiten mit 7 Abschnitten in fester Folge, je ≤ 1 H2, Lead 1 Satz | unit (renderToString) | `npx vitest run tests/funktionsdetails.test.ts` | ❌ Wave 0 |
| FEAT-02 | Inhalte: Budgets, 3–5 Schritte, 3–8 FAQ, 2–3 verwandte (gleiche/benachbarte Gruppe), Rollen nur aus Rollenliste, Plattformen = funktionen.ts | unit | dito | ❌ Wave 0 |
| FEAT-02 | 6 neue Slugs: Gruppe, Menü, Übersicht, ItemList, Sitemap, llms.txt | unit | `npx vitest run tests/funktionsgruppen.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts tests/llms.test.ts` | ✅ (Zahlen anpassen) |
| FEAT-02 | Register: 22 features, 8 liveExtras, Belege am Release | unit + git | `npx vitest run tests/product-register.test.ts` | ✅ (anpassen) |
| FEAT-02 | Zwei Klicks, Menü mit 22 Links | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs -g "Zwei Klicks\|Menü:"` | ✅ (DETAIL_SLUGS/Zahlen anpassen) |
| FEAT-03 | /app: alle 15 FEAT-03-Punkte + Kunden als Kachel, Phone-Rahmen gekennzeichnet, Store-Links, KeyFacts, FAQ | unit | `npx vitest run tests/app-seite.test.ts` | ❌ Wave 0 |
| MEDIA-01 | Jede Detailfunktion und jede App-Kachel hat Visual (Szene oder Icon/Ablauf); jede Szene: Kurzform, voller Beleg im Register, Status ∈ MiniStatusName mit Beleg | unit | `npx vitest run tests/design-v2-frames.test.ts tests/funktionsdetails.test.ts` | ✅/❌ (erweitern) |
| SEO-02 | Title/H1/Description = Keyword-Map für 22 + /app; Kopfwort-Regel | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ (Phase-7-Fall neu) |
| SEO-02/D-11 | JSON-LD: Breadcrumb (3 Ebenen), FAQPage = sichtbare FAQ, WebPage; /app MobileApplication | unit | `npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts` | ❌ Wave 0 |
| D-13 | data-source nur Kurzform | unit + live | `npx vitest run tests/design-v2-components.test.ts tests/home.test.ts tests/styleguide.test.ts` | ✅ (anpassen) |
| D-14 | Gutter auf /impressum, /datenschutz, 404 | e2e/visual | `node scripts/visual-audit.mjs` bzw. neuer Playwright-Fall | ❌ (Messung) |
| D-15 | axe 5 Breiten, CLS 0, reduced motion, Above-the-fold 360×640 je Detailseite (Stichprobe + alle per Schleife) | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs -g "Detailseite:"` | ❌ Wave 0 (neue Datei, in `testMatch` aufnehmen) |
| D-16 | Live-Stand | live | `node scripts/live-check.mjs` | ✅ (erweitern) |

### Sampling Rate
- **Per task commit:** betroffene Vitest-Dateien + `npm run typecheck` + `npm run lint`.
- **Per wave merge:** `npm test` vollständig, `npm run build`.
- **Phase gate:** volle Suite + E2E (eigene PID, Port 3100) + `route-audit.mjs` + lokaler `live-check.mjs` grün vor `/gsd-verify-work`.

### Wave 0 Gaps
- [ ] `craftos/tests/funktionsdetails.test.ts` – Budgets, Struktur, Belege, Schema, Parität zur Gruppe (FEAT-02, MEDIA-01, SEO-02)
- [ ] `craftos/tests/app-seite.test.ts` – /app (FEAT-03)
- [ ] `craftos/tests/e2e/funktionsdetails.pw.cjs` – axe/CLS/reduced motion/Above-the-fold/Kurzform-Belege für alle 22 Detailseiten und /app; **in `testMatch` eintragen**, sonst läuft sie nicht
- [ ] Phase-7-Fall in `tests/keyword-map.test.ts`
- [ ] Erweiterung `tests/design-v2-frames.test.ts` (neue `allScenes`, `cardScenes`) und Szenen-Belegtest gegen Register

## Security Domain

Statische Marketing-Website ohne Formulare, Login oder Datenhaltung; `security_enforcement` nicht abgeschaltet.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | – (Anmelden-Link führt auf app.craftos.eu) |
| V3 Session Management | no | – |
| V4 Access Control | no | – |
| V5 Input Validation | gering | keine Nutzereingaben; JSON-LD über `JsonLd` (escapt `<`) |
| V6 Cryptography | no | – |
| V8 Data Protection / Informationspreisgabe | yes | keine internen Pfade im HTML (`data-evidence` Kurzform, `data-source` Kurzform D-13), `check-no-secrets.mjs`, keine Tokenwerte in Doku |
| V14 Configuration | yes | `server-only` für Datenmodule (kein Register/Keyword-Map im Client-Bundle; Build-Prüfung wie 06-03) |

### Known Threat Patterns for Next.js-SSG-Marketing

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Preisgabe interner Repo-Pfade/Modulnamen im HTML | Information Disclosure | Kurzformen, Live-Check-Regex |
| Script-Injection über JSON-LD-Inhalte | Tampering | `JsonLd`-Escaping; nur statische Daten |
| Falsche Produktaussagen (Wettbewerbs-/Verbraucherrecht) | Repudiation (Glaubwürdigkeit) | Belegpflicht über Register und Release-Test, Limitations als Kernpunkte |
| Großes Client-Bundle durch versehentlichen Import von `keyword-map.json` (138 KB) | DoS (Performance) | Import nur in Server-Modulen; Build-Chunk-Prüfung |

## Interne Links (D-12)

Frontmatter `relatedFeatures` ergänzen (rendert Links in `components/content/ArticlePage.tsx` Z. 101–110, `about`-Schema Z. 164):
- `content/hilfe/gaeb-importieren.md` → + `gaeb`
- `content/hilfe/mangel-erfassen-bearbeiten.md` → + `maengelmanagement`
- `content/hilfe/projekt-phasen-anlegen.md` → + `terminplanung`
- `content/hilfe/zahlungen-erfassen.md`, `content/blog/offene-posten-liquiditaet.md` → + `bankabgleich`
- `content/blog/zahlungserinnerung-mahnung-handwerk.md` → + `mahnwesen`
- `content/blog/handwerkersoftware-wechseln.md` → + `datenuebernahme`
- `content/hilfe/abnahme-dokumentieren.md` → + `maengelmanagement`
Gewerkeseiten: Phase 8 (Deferred). Verwandte Funktionen: je neue Seite 2–3 Links aus derselben/benachbarten Gruppe und mindestens ein Rücklink von einer bestehenden Detailseite (z. B. rechnungen → mahnwesen, angebote → gaeb, plantafel → terminplanung, buchhaltung → bankabgleich, baudokumentation → maengelmanagement, team → datenuebernahme).

## Rollout-Muster (aus PHASE-06-ROLLOUT.md)

Gate-Reihenfolge, die Phase 7 übernimmt: Koordinationsstatus lesen → `npm test` → `lint` → `typecheck` → `sync:product:check` → `check-no-secrets.mjs app components lib tests scripts docs ../.planning` → `build` → `test:e2e` (eigener `next start -p 3100`, PID notieren, danach beenden, Port frei prüfen) → `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` → `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` → `visual-audit.mjs` (nicht blockierend) → Code-Review-Gate (`07-REVIEW.md`, Fixes) → ship-gate über `git diff origin/main...HEAD` → `gh workflow list --all` → Push → Vercel READY abwarten (bei Webhook-Verzögerung nicht erneut pushen) → `live-check.mjs` gegen craftos.eu → `npm run indexnow` (erwartet 131 URLs: 125 + 6) → `node scripts/se-ranking-sync.mjs --check` → `node scripts/seo-report.mjs --etappe rollout-phase07` → `docs/releases/PHASE-07-ROLLOUT.md` → `requirements.mark-complete FEAT-02 FEAT-03 MEDIA-01` (nur im Rollout-Plan).

## Sources

### Primary (HIGH confidence)
- Website-Repo (lokal gelesen): `craftos/app/funktionen/[slug]/page.tsx`, `lib/funktionen.ts`, `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/scenes.ts`, `lib/schema.ts`, `lib/llms.ts`, `app/sitemap.ts`, `app/app/page.tsx`, `components/v2/**`, `scripts/live-check.mjs`, `tests/**`, `docs/seo/keyword-map.json`, `docs/seo/data/kwmap/*`
- Web-Release `craft-connect-buddy` `origin/release` = `535206b4` (v4.0.0-test.239): `src/types/license.ts`, `src/lib/subscription/roles.ts`, `src/App.tsx`, `src/pages/{Datenimport,Bankumsaetze,Zahlungseingaenge}.tsx`, `src/pages/settings/MahnwesenSettings.tsx`, GAEB-/DATANORM-Dialoge, Plantafel/Gantt, `defectMeta.ts`, `bankImportAssistant.ts`
- Mobile-Release `craftos-mobile` `origin/release` = `5610a064` (mobile-v1.0.0-test.93): `src/shared/lib/navigation.ts`, `src/types/index.ts`, Screens unter `src/features/**`, Locales `de/*.json`
- Planungsartefakte: 07-CONTEXT, 06-VERIFICATION, 06-0[1-6]-SUMMARY, 06-REVIEW/-FIX, 05-UI-SPEC Z. 357, 06-UI-SPEC, PHASE-06-ROLLOUT

### Secondary (MEDIUM confidence)
- [Google: Software App structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app) – Pflichtfelder (name, offers.price, aggregateRating oder review)
- [Google: FAQPage structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage), [Search Engine Land: Google reduces visibility of HowTo and FAQ rich results](https://searchengineland.com/?p=430452), [Search Engine Journal](https://www.searchenginejournal.com/google-downgrades-visibility-of-howto-and-faq-rich-results/)

### Tertiary (LOW confidence)
- Scrollbar-Verhalten je Browser/OS (A2)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH – Bestand, keine neuen Pakete
- Bestand/Paritäten: HIGH – Datei:Zeile geprüft
- Produktbelege neue Seiten und Mobile: HIGH – am Release-Commit gelesen (ohne fetch)
- Szenen-Labels: MEDIUM – Bildschirmnamen und Status belegt, einzelne Widget-/KPI-Labels bei Umsetzung nachlesen (A3)
- Gestaltung (/app-Gliederung, Kopf): MEDIUM – Empfehlung innerhalb 05/06-UI-SPEC
- Pitfalls: HIGH – aus Tests und Code abgeleitet

**Research date:** 21.10.2026
**Valid until:** 28.10.2026 (Produktreleases bewegen sich täglich; vor Ausführung `npm run sync:product:check`)
