# Phase 6: Startseite, Navigation und Funktionsübersicht – Research

**Researched:** 2026-10-21
**Domain:** Next.js 16 App Router (React 19, Tailwind 4) – Umbau Startseite, Hauptnavigation (Mega-Menü, Disclosure-Muster) und Funktionsübersicht mit den v2-Bausteinen aus Phase 5; Keyword-Map-Umsetzung (SEO-02) für `/` und `/funktionen`
**Confidence:** HIGH (Bestand vollständig am Code belegt; Muster aus WAI-APG und mitgelieferter Next-16-Doku verifiziert; einzelne Gestaltungsmaße sind Annahmen und im Assumptions Log markiert)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Gestaltung (DESIGN-01, DESIGN-02)
- **D-01:** Verbindlich ist der genehmigte Designvertrag aus Phase 5 (`.planning/phases/05-…/05-UI-SPEC.md`, Richtung „Werkbank-Präzision“, Tokens, Textbudgets, Amber-Liste, Fokusring, 96-px-Ausnahme) und die Bausteine aus `components/v2` (SectionHeader, KeyFacts, CtaBand, BentoGrid/BentoTile, StepFlow, FaqList, ComparisonTable, Badges, FeatureCard, IllustrationLabel, MediaFigure, BrowserFrame, PhoneFrame, DevicePair, MiniUi). Keine neue Bildsprache, keine neuen Farben/Schriften; fehlende Bausteine nur, wenn eine Seite sie zwingend braucht, und dann im selben Stil mit Budgetprüfung.
- **D-02:** Startseite: Above the fold bei 360–1440 px: H1 mit Hauptkeyword „Handwerkersoftware“ und klarer Aussage (Büro + Baustelle in einem System), ein Satz Einleitung, Produktdarstellung (DevicePair mit vereinfachter UI und Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“), Primär-CTA „10 Tage kostenlos testen“ (`data-track="trial"` bzw. bestehende trial_click-Erfassung) plus Sekundäraktion. Danach wenige, klar getrennte Abschnitte (Richtwert 6–8): Kennzahlen, Arbeitsablauf (StepFlow Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), Funktionsgruppen (BentoGrid), Web-App + Handy-App, Preis-Kurzfassung aus `site.ts`, FAQ (FaqList + FAQPage-Schema nur für sichtbare Fragen), CtaBand. Jeder Abschnitt: höchstens eine Überschrift, ein Einleitungssatz, sonst visuelle Elemente.
- **D-03:** Text kürzen ist ausdrücklich beauftragt. Längere Erklärtexte der Startseite werden nicht ersatzlos verworfen, sondern auf Detailseiten/FAQ verwiesen, wenn sie dort schon stehen; keine Seite und keine URL wird entfernt. Produktfakten ausschließlich aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts` und dem Preis-Snapshot; keine erfundenen Funktionen, Zahlen oder Kundenstimmen.
- **D-04:** Bestehende animierte Szenen (`components/feature-snippet`, `components/product-demo`) dürfen auf der Startseite höchstens einmal bleiben, wenn sie in Budget und Ruhe-Regel des UI-SPEC passen (prefers-reduced-motion, keine Layout-Shifts); sonst ersetzt die statische vereinfachte UI sie. Detailseiten behalten ihre Szenen (Phase 7 entscheidet dort).

#### Navigation (DESIGN-03)
- **D-05:** Menüpunkt „Funktionen“ als Mega-Menü nach Arbeitsablauf (sechs Gruppen wie FEAT-01), je Gruppe Icon (lucide, bereits Abhängigkeit) und Kurzbeschreibung, darunter die Live-Funktionen als direkte Links → jede Live-Funktion ist mit Menü öffnen + 1 Klick erreichbar (≤ 2 Klicks). „Vorschaubilder“ aus DESIGN-03 werden im Rahmen der Umfangsänderung durch Icons plus optional eine kleine vereinfachte UI-Vorschau je Gruppe erfüllt (keine Screenshots).
- **D-06:** Weitere Hauptpunkte bleiben inhaltlich (Gewerke, Preise, Wissen, Hilfe; „Warum CraftOS?“/Vergleich und Mobile-App erreichbar). Desktop: Disclosure-Muster (Button mit aria-expanded, kein ARIA-menu-Rolle-Missbrauch), Maus/Touch/Tastatur (Esc schließt, Fokus kehrt zurück, Tab-Reihenfolge logisch). Mobil: Vollflächen-Drawer mit Akkordeon, Scroll-Lock, ohne Layout-Shift. Bestehendes Verhalten aus `components/layout/Header.tsx` (Breakpoint-Reset, Scroll-Lock, sichtbare Gruppe) bleibt erhalten oder wird gleichwertig ersetzt; Login-Link mit `data-track="login"` und Testen-Link mit trial-Erfassung bleiben.
- **D-07:** Die Funktionsliste im Menü wird aus derselben Quelle wie die Übersicht erzeugt (Produktregister/funktionen.ts), damit Menü, Übersicht und Register nicht auseinanderlaufen; ein Test prüft Gleichstand und dass jedes Ziel als Route existiert.

#### Funktionsübersicht (FEAT-01)
- **D-08:** `/funktionen` zeigt alle Live-Funktionen aus dem Produktregister, gruppiert nach Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team, je Funktion FeatureCard mit visuellem Element (vereinfachte UI/Icon) und genau einem Satz Nutzen, Plattform-Badges (Web/App) nur wo belegt.
- **D-09:** Live-Funktionen ohne eigene Detailseite (z. B. Mahnwesen, Bankabgleich, Terminplanung, GAEB/DATANORM, Datenimport, Mängel – Seiten folgen in Phase 7) erscheinen trotzdem; sie verlinken bis Phase 7 auf die thematisch nächste bestehende Detailseite (mit Anker) oder erscheinen ohne Link. Keine toten Links, keine 404, keine Platzhalterseiten in Phase 6.
- **D-10:** Strukturierte Daten: `/funktionen` mit BreadcrumbList und ItemList der Funktionen; Startseite behält Organization/SoftwareApplication (Preis netto aus site.ts) und FAQPage nur für sichtbare FAQ.

#### SEO (SEO-02-Umsetzung)
- **D-11:** Title, H1 und Meta-Description von `/` und `/funktionen` folgen der Keyword-Map (`/` → „handwerkersoftware“, `/funktionen` → „software für handwerksbetriebe“), Längen innerhalb der Grenzen (Title ≤ 60 Zeichen, Description 120–158 Zeichen), Marke „CraftOS“ enthalten. Ankertexte im Menü nutzen die Funktionsnamen bzw. Hauptkeywords der Zielseiten, wo natürlich.
- **D-12:** Ein Test prüft für die Phase-6-Seiten, dass das Hauptkeyword in Title und H1 steht (Erweiterung des vorhandenen keyword-map-Tests).

#### Qualität, Rollout
- **D-13:** Server Components bleiben Standard; Client-JavaScript nur für das Menü. Ohne JavaScript bleibt die Navigation nutzbar (z. B. Links zu Übersichtsseiten, `<details>`-Fallback oder serverseitig gerenderte Links). CLS 0, LCP-Element ohne Lazy-Load, keine Animationen ohne reduced-motion-Schutz.
- **D-14:** Prüfungen lokal (vitest, typecheck, lint, build, Playwright-E2E inkl. axe, Breiten 360/390/768/1024/1440, Tastaturbedienung Menü, Zwei-Klick-Test für jede Live-Funktion), dann Ship-Gate, `gh workflow list --all`, Push auf main, Vercel READY, `scripts/live-check.mjs`, `npm run indexnow`, `node scripts/seo-report.mjs --etappe rollout-phase06`, Rollout-Nachweis wie Phase 5 (`docs/releases/PHASE-06-ROLLOUT.md`). Prozesse nur über eigene PID beenden.

### Claude's Discretion
- Genaue Abschnittsreihenfolge und Inhalte der Startseite innerhalb von D-02; Auswahl der Kennzahlen (nur belegte Werte: Preise, Testtage, Anzahl Live-Funktionen, Plattformen).
- Icon-Auswahl je Gruppe; Zuordnung grenzwertiger Funktionen zu Gruppen (z. B. Dashboard, Kundenportal, Craft AI) – begründet im Plan.
- Ob Footer-Links angepasst werden.

### Deferred Ideas (OUT OF SCOPE)
- Echte Kundenstimmen/Logos – erst wenn belegt vorhanden (keine Platzhalter).
- Neue Funktionsdetailseiten → Phase 7; Alternativen-Seiten → Phase 8; Ratgeber → Phase 9.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DESIGN-01 | Startseite ohne Scrollen verständlich (Aussage, Produktdarstellung, „10 Tage testen“); jeder Abschnitt ≤ 1 Überschrift, 1 Satz, visuelle Elemente | Ist-Analyse Startseite (§ Bestand), Above-the-fold-Rechnung je Viewport (§ Pattern 4), Abschnittsplan mit v2-Bausteinen (§ Pattern 2), Budgets/Tests (§ Validation) |
| DESIGN-02 (Umsetzung) | v2-Bausteine einheitlich nutzen | Bausteinverträge und Lücken (§ v2-Bausteine), Seitenrezepte UI-SPEC, nötige Erweiterungen (Hero-Budget, DevicePair-Kompaktlage, Kompaktliste für Zusatzfunktionen) |
| DESIGN-03 | Menü mit Funktionsgruppen, Kurzbeschreibungen, Icons/Vorschau; jede Funktion ≤ 2 Klicks, Desktop und Mobil | WAI-APG Disclosure-Navigation mit Top-Level-Links (§ Pattern 1), Server/Client-Schnitt (§ Pattern 3), No-JS-Fallback, Zwei-Klick-Definition und -Test (§ Validation) |
| FEAT-01 | Funktionsübersicht aller Live-Funktionen nach Arbeitsablauf gruppiert, je visuelles Element + 1 Satz Nutzen, stimmt mit Produktregister überein | Vollständige Funktionsliste (16 Detailseiten + 14 beworbene Zusatzfunktionen) mit Gruppenvorschlag und Zielen (§ Funktionszuordnung), Paritätstest (§ Validation) |
| SEO-02 (Umsetzung) | Title/H1/Description folgen der Keyword-Map | Ist/Soll-Tabelle mit Längen (§ SEO), Title-Template-Falle der Root-Seite (§ Pitfall 1), Testerweiterung D-12 |
</phase_requirements>

## Summary

Die Startseite (`craftos/app/page.tsx`, 307 Zeilen) besteht heute aus Hero plus acht Abschnitten mit zwei animierten `FeatureSnippet`-Szenen, einer GoBD-Box, einer Preistabelle, einem Ratgeber-Block und fünf langen FAQ-Antworten (rund 3–4 Tsd. Zeichen sichtbarer Fließtext). Die H1 lautet „Mehr Handwerk. Weniger Büro.“ und enthält das Hauptkeyword nicht; der Title „CraftOS – Handwerkersoftware für Büro & Baustelle“ weicht vom Keyword-Map-Ziel ab. `/funktionen` ist eine einfache Kachelliste aller 16 `funktionen` ohne Gruppierung, ohne die 14 beworbenen Zusatzfunktionen des Registers und mit Title „Alle Funktionen der Handwerkersoftware“ (kannibalisiert das Startseiten-Keyword). Der Header ist eine Client Component mit fünf Gruppen („Produkt“, „Gewerke“, „Preise“, „Wissen“, „Hilfe“), funktioniert ohne JavaScript weder mobil (Navigation ist `display:none`, der Schalter braucht JS) noch für Untermenüs (Panels sind serverseitig `hidden`).

Alle nötigen Bausteine existieren in `components/v2` mit Budgetprüfung beim Rendern. Es fehlen genau drei Dinge, die der Plan bauen muss: (1) ein Datenmodul für die sechs Arbeitsablauf-Gruppen, das `funktionen` und die beworbenen `liveExtras` des Registers zusammenführt und jedem Eintrag einen einzigen Nutzensatz (≤ 100 Zeichen) gibt – die vorhandenen `intro`-Texte sind 131–206 Zeichen lang und zweisätzig, also für `FeatureCard.benefit` unbrauchbar; (2) eine kompakte Darstellung für Zusatzfunktionen ohne eigene Detailseite, weil `FeatureCard` nur `funktionen`-Slugs akzeptiert und immer „Mehr zu {Name}“ verlinkt; (3) eine mobile Kompaktlage für den Hero-`DevicePair`, weil der Baustein unter 768 px Browser (≈ 203 px) und Phone (410 px) untereinander stapelt und damit bei 360 × 640 nicht mehr „ohne Scrollen“ sichtbar wäre.

Für die Navigation ist das WAI-APG-Muster „Disclosure Navigation Menu with Top-Level Links“ der passende Standard: Jeder Hauptpunkt ist ein echter Link auf die Übersichtsseite (funktioniert ohne JS und erfüllt „≤ 2 Klicks“ schon über `/funktionen`), daneben ein Disclosure-Button mit `aria-expanded`/`aria-controls`, kein `role="menu"`. Das Mega-Menü wird als Server Component gerendert und als Slot an eine kleine Client-Hülle übergeben, die nur Öffnen/Schließen, Escape, Außenklick, Scroll-Lock und Routenwechsel steuert – so landet das 25-KB-Datenmodul `funktionen.ts` nicht im Client-Bundle und das serverseitige Register (`server-only`) bleibt nutzbar.

**Primary recommendation:** Erst das gemeinsame Gruppen-Datenmodul plus Paritätstest bauen (Welle 0/1), dann parallel Startseite, `/funktionen` und Header darauf aufsetzen; alle hart kodierten Testerwartungen (Liste in § Bestand → „Mitzuziehende Stellen“) im selben Plan wie die jeweilige Änderung anpassen und neue E2E-Dateien in `testMatch` eintragen.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Gruppenmodell (6 Arbeitsablauf-Gruppen, Zuordnung, Nutzensatz, Ziel-URL) | Frontend Server (RSC, Build-Zeit) | – | Reine Daten aus `funktionen.ts` + `product-register.ts` (server-only); wird von Startseite, `/funktionen` und Header serverseitig gelesen |
| Startseite und `/funktionen` (Inhalt, Bausteine, JSON-LD) | Frontend Server (statisch vorgerendert) | CDN (Vercel) | Server Components ohne Client-JS (D-13); vollständiger Endzustand im HTML |
| Mega-Menü-Inhalt (Links, Icons, Kurzbeschreibungen) | Frontend Server (RSC im Root-Layout) | – | Als Slot an die Client-Hülle übergeben; Links stehen im HTML (No-JS, Crawler) |
| Menüzustand (öffnen/schließen, Esc, Außenklick, Scroll-Lock, Breakpoint-Reset, Routenwechsel) | Browser / Client | – | Einzige Client-Insel der Phase (D-13) |
| No-JS-Fallback der Navigation | Browser (CSS in `<noscript>`) | Frontend Server | Top-Level-Links sind echte `<a>`; `noscript`-Stil zeigt mobil die Navigation statisch |
| Tracking `trial_click`/`login_click` | Browser / Client (`components/Analytics.tsx`) | – | Dokumentweite Klick-Delegation; keine Änderung nötig, nur Linkziele/Attribute einhalten |
| Metadaten (Title/Description/Canonical) | Frontend Server (`metadata`-Export) | – | `pageMetadata()` in `lib/metadata.ts`; Title-Template aus `app/layout.tsx` |

## Project Constraints (from CLAUDE.md)

Projekt-CLAUDE.md (`C:/Projekte/Websitenerstellung/CLAUDE.md`) und globale Regeln, relevant für die Planung:

- **Frontend-Kaskade ist Pflicht** bei jeder UI-Arbeit: 1. `/frontend-design`, 2. `ui-ux-pro-max` (`py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --design-system -p "CraftOS"`), 3. `21st_magic_component_inspiration` nur zur Inspiration (nie builder/refiner), 4. Context7 (Ersatz: mitgelieferte Doku `craftos/node_modules/next/dist/docs`), 5. SEO-Check (Semantik, Schema, A11y). Phase 5 hat dokumentiert, dass Skill-/MCP-Werkzeuge teils nicht verfügbar waren; dann Nachweis wie `docs/DESIGN-V2.md` §7/§10/§11 führen (gelesen, nicht kopiert, nichts erfunden).
- **Neue Seite/SEO:** H1 = Hauptkeyword, H2 als Fragen mit 300-Zeichen-Antwort gilt für FAQ; Schema-Markup Pflicht (FAQPage, BreadcrumbList, Organization). DataForSEO wird in diesem Projekt durch die SE-Ranking-Keyword-Map ersetzt; **keine SE-Ranking-Aufrufe außer `seo-report.mjs --etappe rollout-phase06` im Rollout**.
- **TypeScript strict, keine `any`**, Semantic HTML (`nav`, `ul/li`, `section`, `article`), WCAG: Kontrast ≥ 4,5:1, Tastatur, Alt-Texte.
- **Performance:** LCP < 2,5 s, CLS < 0,1 (Projektziel hier strenger: CLS 0, D-13), `next/font` mit `display: swap` (vorhanden), kein Lazy-Load des LCP-Elements.
- **robots.txt:** KI-Crawler nicht blockieren (unverändert lassen).
- **Globale Regel 5 (Tests nur lokal):** Build, Lint, Typecheck, Vitest, Playwright laufen lokal; GitHub Actions sind kein Beleg; vor Push `gh workflow list --all` (Stand Phase 5: nur „Dependabot Updates“). Nie pushen, um zu testen.
- **Koordination:** Vor schweren Läufen `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status`. Für das Website-Repo gibt es weiterhin **kein Rezept** (Status 21.10.2026 10:54 UTC: nur `web-*`/`mobile-*`) → lokal, genau ein schwerer Prozess, Lücke im Rollout-Nachweis benennen.
- **Ship-Gate** ist letzter Schritt vor jedem Commit/Push; Standard-Review `/review`, nie Ultra-Review automatisch.
- **Keine Zugangsdaten** in Code/Doku/Logs (`check-no-secrets.mjs`).
- **Agent-Handoff:** gemeinsamen Skill `AgentShared/skills/agent-handoff` bei Projektarbeit nutzen (Executor-Thema, nicht Planer).

## Bestand (Ist-Analyse, am Code belegt)

### Startseite `craftos/app/page.tsx`
| Zeilen | Abschnitt | Befund |
|---|---|---|
| 25–29 | `metadata` | Title „CraftOS – Handwerkersoftware für Büro & Baustelle“ (49 Z.), Description 128 Z. – beide nicht Keyword-Map-Ziel |
| 30–51 | `faqs` (5 Fragen) | Antworten 230–380 Zeichen, mehrsätzig; Werte korrekt aus `tarife`/`site` abgeleitet |
| 55 | `<Hero />` (`components/home/Hero.tsx`) | H1 „Mehr Handwerk. Weniger Büro.“ (Z. 17–21, ohne Keyword), CTA `site.ctaUrl` ohne `data-track` (Z. 27–29) – wird trotzdem als `trial_click` gezählt (s. u.), Sekundär-Link `#produktdemo` (Z. 30–32), Store-Badges (Z. 41–43), Preiszeile (Z. 44–48), animierte `FeatureSnippet variant="dashboard"` (Z. 54, Client Component) |
| 56–108 | `home-flow` | 4 Schritte als Links (Angebote, Plantafel, `/app`, Rechnungen) |
| 109–155 | `home-collaboration` | Text + 3er-Liste + zweite animierte `FeatureSnippet variant="planung"` (Z. 150) |
| 157–196 | `home-features` | 6 `feature-link`-Kacheln aus `funktionen` + Link „Alle Funktionen“ (Z. 168) |
| 197–220 | `home-gobd` | GoBD-Box mit Link `/gobd` |
| 221–238 | `#preise` | Alte `PricingTable` + Link `/vergleich` |
| 239–288 | Ratgeber | 3 Links (Rechner, Hilfe) |
| 289–301 | FAQ | Altbaustein `components/ui/Faq` |
| 302–303 | `JsonLd(faqSchema)`, `TrialCta` | FAQPage aus derselben Liste (gut: nur sichtbare Fragen) |

Organization- und SoftwareApplication-JSON-LD kommen seitenweit aus `app/layout.tsx:122–125` (`lib/schema.ts:5–55`, Preis `voll.monat` netto, `valueAddedTaxIncluded: false`) – D-10 ist dort bereits erfüllt und bleibt unberührt.

### `/funktionen` `craftos/app/funktionen/page.tsx` (65 Zeilen)
- Metadaten Z. 7–11: Title „Alle Funktionen der Handwerkersoftware“ (+ Template = 48 Z.), Description 125 Z.
- `PageHero` (H1 „Weniger suchen. Mehr erledigen.“), Kachelliste aller 16 `funktionen` (Z. 29–45) mit `kurz` (= zweisätziges `intro`), Plattformtext; Hinweisbox Voll-Lizenz; `TrialCta`. Kein JSON-LD (keine BreadcrumbList/ItemList), keine Gruppierung, keine Zusatzfunktionen.

### Header `craftos/components/layout/Header.tsx` (183 Zeilen, `"use client"`)
- Gruppen Z. 12–26 (Produkt: Alle Funktionen, Web-App & Dashboard, Mobile-App, Craft AI, GoBD, Warum CraftOS?; Gewerke: Alle + 12 aus `lib/gewerke`; Preise als Link; Wissen 4 Links; Hilfe 2 Links). `site.nav` in `lib/site.ts:19–25` ist ungenutzt (Altlast).
- `mobileQuery = "(max-width: 1120px)"` Z. 27; `keepGroupVisible` Z. 44–61; Breakpoint-Reset Z. 64–73; Scroll-Lock über `documentElement.style.overflow` mit Scroll-Rückstellung Z. 75–88; Außenklick/Fokus-außerhalb/Escape mit Fokusrückgabe Z. 90–115; Hover-Öffnen nur `pointerType === "mouse"` Z. 136–149; Gruppenbutton `aria-expanded`/`aria-controls`, ArrowDown fokussiert ersten Link Z. 151–167; Panels `hidden` Z. 168–170; Aktionen: `StoreLinks compact`, „Anmelden“ mit `data-track="login"` Z. 176, „10 Tage testen“ → `site.ctaUrl` Z. 177.
- CSS `Header.module.css`: Desktop-Dropdown 278 px breit (Z. 15), Gewerke 570 px zweispaltig (Z. 19), Header 84/74 px hoch (Z. 2/29), mobiles Panel `.open` absolut unter dem Header mit `max-height: calc(100dvh - 75px)` (Z. 33), Fokusring 2 px `#f2af38` (Z. 14 – weicht vom UI-SPEC-Fokusring 3 px `#BB7609` ab), reduced-motion für Chevron (Z. 44).
- **No-JS-Lücke:** Unter 1120 px ist `.nav` `display:none` (Z. 32) und der Schalter braucht JS → ohne JS keine Navigation (nur Footer). Desktop: Untermenüs serverseitig `hidden`, Gruppenbuttons ohne `href` → „Produkt“ ohne JS nicht erreichbar.
- Semantik: `nav` mit `div`-Gruppen statt `ul/li` (APG empfiehlt verschachtelte Listen).

### Footer `craftos/components/layout/Footer.tsx`
Server Component, Spalten Z. 4–32 (Produkt: Funktionen, Mobile-App, Craft AI, Preise, Warum CraftOS?; Für Ihren Betrieb: Gewerke, GoBD, Fakten; Wissen & Hilfe). Für „≤ 2 Klicks“ nicht nötig; Empfehlung: unverändert lassen bis auf Label „Funktionen“ (bleibt) – Discretion.

### Analytics `craftos/components/Analytics.tsx` + `lib/tracking.ts`
Dokumentweiter Klick-Listener (Z. 42–58); `classifyAppLink` (`lib/tracking.ts:76–82`) wertet **jeden** Link auf Host `app.craftos.eu` als `trial_click`, außer `data-track="login"` → `login_click`. `data-track="trial"` ist optional (wird wie fehlend behandelt). Folge: Alle CTAs (Hero, Header, CtaBand `components/v2/CtaBand.tsx`, TrialCta) zählen automatisch, solange sie auf `site.ctaUrl` zeigen und **nicht** `data-track="login"` tragen. Tracking nur mit `NEXT_PUBLIC_ANALYTICS_ENABLED === "true"` (Z. 16).

### Mitzuziehende Stellen (harte Erwartungen an Startseite/Menü/Übersicht)
| Datei:Zeile | Erwartung | Aktion beim Umbau |
|---|---|---|
| `tests/seo-brand.test.ts:7–11` | Startseiten-Title exakt „CraftOS – Handwerkersoftware für Büro & Baustelle“ | auf Keyword-Map-Ziel umstellen (oder durch D-12-Test ersetzen) |
| `tests/pricing-parity.test.ts:101–121` | Literal-Scan liest `components/home/Hero.tsx`, `app/page.tsx` (und weitere) per `fs.readFileSync` | Wird `Hero.tsx` gelöscht/umbenannt, wirft der Test → Dateiliste anpassen; neue Startseiten-/Gruppen-Datenmodule ergänzen (keine Preisliterale!) |
| `tests/pricing-parity.test.ts` (Testphasen-Scan) | Jede Tagesangabe im Testkontext = `trialDays` | Neue Texte „10 Tage …“ nur über `${site.trialDays}` |
| `tests/announcements.test.ts:10–11` | Verbot von „Geplant:“, „Demnächst/demnächst“, „In Vorbereitung“, „Bald verfügbar“ … in `app/components/lib` | Zusatzfunktionen ohne Seite **nie** mit „Seite folgt“, „demnächst“ o. ä. markieren |
| `tests/e2e/function-illustrations.pw.cjs:501–529` | Startseite hat Hero-Szene `dashboard` und `.home-collaboration`-Szene `planung` | Entfällt mit statischem Hero → Test entfernen (Viewport-Pause ist durch Z. 260 ff. abgedeckt) |
| `tests/e2e/navigation.pw.cjs:26–156` (alle 6 Tests) | Button „Produkt“, Link „Alle Funktionen“, `#navigation-gewerke a` = 13, erster Link „Alle Gewerke“, „10 Tage testen“, Button „Menü öffnen/schließen“, Wissen → „Ratgeber“ | Auf „Funktionen“ umstellen; Gewerke-/Wissen-Erwartungen bleiben, wenn diese Gruppen unverändert bleiben |
| `tests/e2e/design-v2.pw.cjs:16` | `BUDGET_ROUTES` enthält `/` | bleibt; `/funktionen` ergänzen (Bildbudget + CLS 0) |
| `tests/e2e/design-v2.pw.cjs:76–83` | `figure[data-evidence]`-Format `^(web|mobile):\S+` | gilt künftig auch für Startseiten-Rahmen; siehe Open Question LO-05 |
| `tests/e2e/playwright.config.cjs:7` | `testMatch` ist eine **explizite Liste** | neue Spec-Dateien (z. B. `home.pw.cjs`, `funktionen.pw.cjs`) eintragen, sonst laufen sie nie |
| `scripts/live-check.mjs:65–72, 98–105` | `/funktionen` ohne Ankündigung; JSON-LD der Startseite enthält `"price":"29.95"` und `valueAddedTaxIncluded:false` | erfüllt durch Layout-Schema; ggf. Prüfungen für neue Titles/H1 ergänzen |
| `scripts/route-audit.mjs:13–46` | jede Sitemap-URL 200, Canonical, `<h1>`, keine Ankündigung; **alle internen `href` liefern 200** (Fragmente werden abgeschnitten, Anker selbst nicht geprüft) | neue Ankerziele separat testen |
| `app/sitemap.ts:8–17` | `pageUpdated` für `""` und `/funktionen` = 2026-10-20 | auf Rollout-Datum setzen |
| `lib/site.ts:10` | `demoUrl: "/#produktdemo"` (nirgends genutzt) | Anker `#produktdemo` entfällt → `demoUrl` entfernen oder Anker beibehalten |
| `app/globals.css:255–283, 417–425, 521–690` | `.feature-grid/.feature-link`, `.home-*`-Regeln | nach Umbau tot → entfernen (sonst fallow-Befund) |
| `tests/content.test.ts` | prüft nur `relatedFeatures` gegen `funktionen` | unberührt, solange Slugs bleiben |
| `tests/keyword-map.test.ts:143–153` | Zielwerte: Title ≤ 60 inkl. Keyword, Description 120–**155** | Für Seiten gilt damit 155 als harte Obergrenze (strenger als CONTEXT 158) |

## Funktionszuordnung (FEAT-01, D-07, D-09)

**Quelle:** `lib/funktionen.ts:69–630` (16 Detailseiten, alle `tier: "heute"`, `checkedAt 2026-10-20`) und `lib/product-register.ts` `liveExtras` (15 Einträge, davon 14 `advertised: true`; „Vorhersagen“ `advertised: false` darf nicht erscheinen). Zusammen **30 Live-Einträge**. [VERIFIED: Codebasis]

Vorschlag (Discretion, im Plan begründen). „Ziel“ = Linkziel in Phase 6; Hilfeartikel existieren unter `content/hilfe/*.md` und sind Sitemap-Routen.

| Gruppe (Icon-Vorschlag) | Funktion | Detailseite | Plattformen | Ziel bis Phase 7 |
|---|---|---|---|---|
| **Angebot** (`FileText`) | Angebote & Kalkulation | ja `/funktionen/angebote` | web, mobile | eigene Seite |
| | Aufmaß | ja `/funktionen/aufmass` | web, mobile | eigene Seite |
| | Kundenportal | ja `/funktionen/kundenportal` | web | eigene Seite |
| | GAEB-Import/-Export und DATANORM-Import | nein (Phase 7 `/funktionen/gaeb`) | web | `/hilfe/gaeb-importieren` (Titel „Ein GAEB-Leistungsverzeichnis in ein Angebot importieren“) oder `/funktionen/angebote` (Hinweis in `note`, `funktionen.ts:171`) |
| | Angebotsunterschrift online | nein | web | `/funktionen/kundenportal` oder `/funktionen/angebote` |
| | Besichtigung | nein | web, mobile | ohne Link (auf keiner Seite erwähnt) |
| | Kunden in der App | nein | mobile | ohne Link (`/app` erwähnt es nicht) |
| **Planung** (`CalendarDays`) | Plantafel & Einsatzplanung | ja | web, mobile | eigene Seite |
| | Projektverwaltung | ja | web, mobile | eigene Seite |
| | Arbeitsanweisungen | ja | web, mobile | eigene Seite |
| | Terminplanung mit Bauphasen | nein (Phase 7 `/funktionen/terminplanung`) | web | `/hilfe/projekt-phasen-anlegen` oder `/funktionen/plantafel` (Bullet „Mehr als einzelne Termine … Projektphasen“) |
| **Baustelle** (`HardHat`) | Zeiterfassung | ja | web, mobile | eigene Seite |
| | Baudokumentation | ja | web, mobile | eigene Seite |
| | Lager & Material | ja | web, mobile | eigene Seite |
| | Mängel | nein (Phase 7 `/funktionen/maengelmanagement`) | web, mobile | `/hilfe/mangel-erfassen-bearbeiten` oder `/funktionen/baudokumentation` (Bullet „Mängel bearbeiten“) |
| | Abnahme und Teilabnahme | nein | web, mobile | `/hilfe/abnahme-dokumentieren` |
| | Bautagesbericht | nein | mobile (+web Beleg) | `/hilfe/bautagesbericht-erstellen` oder `/funktionen/baudokumentation` |
| | Lager-Scan und Wareneingang | nein | web, mobile | `/hilfe/wareneingang-buchen` oder `/funktionen/lager` |
| **Rechnung** (`Receipt`) | Rechnungen | ja | web | eigene Seite |
| | E-Rechnung | ja | web | eigene Seite |
| | Mahnwesen | nein (Phase 7 `/funktionen/mahnwesen`) | web | ohne Link (auf keiner Seite erwähnt) |
| **Buchhaltung** (`Calculator`) | Buchhaltung & DATEV | ja | web | eigene Seite |
| | Eingangsrechnungen & Belegscan | ja | web, mobile | eigene Seite |
| | Nachkalkulation | ja | web | eigene Seite |
| | Dashboard (Grenzfall) | ja | web | eigene Seite – Begründung: Hauptkeyword „kennzahlen handwerksbetrieb“, Umsatz/offene Beträge; Alternative „Planung“ (nächste Aufgabe) |
| | Bankabgleich und Zahlungseingänge | nein (Phase 7 `/funktionen/bankabgleich`) | web | `/hilfe/zahlungen-erfassen` (erwähnt Bank) oder ohne Link |
| **Team** (`Users`) | Team & Rechte | ja | web, mobile | eigene Seite |
| | Projekt-Chat und Nachrichten | nein | mobile | `/funktionen/projektverwaltung` (Bullet „Gespräche im Kontext“) |
| | 21 Sprachen in der Mobile-App | nein | mobile | ohne Link (`/app` erwähnt es heute nicht) |
| | Datenübernahme | nein (Phase 7 `/funktionen/datenuebernahme`) | web | ohne Link |

**Grenzfälle außerhalb des Registers:**
- **Mobile-App** (`/app`) und **GoBD** (`/gobd`), **Warum CraftOS?** (`/vergleich`) sind Produkt-/Themenseiten, keine Registerfunktionen → im Mega-Menü als Fußleiste („Mobile-App · Craft AI · GoBD · Warum CraftOS?“), nicht in den sechs Gruppen. D-06 (Vergleich und Mobile-App erreichbar) ist damit erfüllt.
- **Craft AI** (`/craft-ai`) hat eine Seite, steht aber **weder in `funktionen` noch in `liveExtras`** des Registers. Im Web-Release existiert ein KI-Assistent (`src/components/ai-agent/AiAgentPanel.tsx` u. a., Begriff „KI-Assistent“ in `src/api/aiAgent.ts`), die Seite „KI-Agent“ ist dagegen „Bald verfügbar“ (`notLive`). [VERIFIED: git ls-tree/grep am Commit 535206b4] Die Gleichsetzung „Craft AI = KI-Assistent-Panel“ ist eine Annahme → Open Question 1.

**Anker:** Die Detailseiten `app/funktionen/[slug]/page.tsx` setzen **keine** `id`-Attribute (nur `/app#app-ansichten` existiert). Anker auf Detailseiten müssten erst eingeführt werden (Phase 7 baut diese Seiten ohnehin neu). Empfehlung: In Phase 6 keine Detailseiten-Anker; stattdessen Gruppenanker auf `/funktionen` selbst (`#angebot`, `#planung`, `#baustelle`, `#rechnung`, `#buchhaltung`, `#team` über `SectionHeader id`), dort steht jede Zusatzfunktion mit Nutzensatz. Hilfeartikel-Ziele haben eigene Seiten (kein Anker nötig).

**Zwei-Klick-Definition (für Plan und Test festschreiben):** Eine Funktion gilt als erreicht, wenn ihre Information (Name + Nutzensatz, bei Detailseite die Seite) sichtbar ist. Wege: (a) Desktop: „Funktionen“-Disclosure öffnen (1) → Funktionslink oder Gruppenkopf-Link `/funktionen#gruppe` (2); (b) Mobil: Menü öffnen (1) → Funktionslink (2) – dafür muss die Funktionsgruppe im Drawer **beim Öffnen bereits aufgeklappt** sein (sonst 3 Taps); (c) ohne JS / von jeder Seite: Top-Level-Link „Funktionen“ → `/funktionen` (1) → Karte (2).

## Standard Stack

Keine neuen Abhängigkeiten. Installiert und verifiziert (`node_modules/*/package.json`) [VERIFIED: lokale Installation]:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.3.4 | App Router, Metadata API, `next/link` | Bestand; Doku liegt unter `craftos/node_modules/next/dist/docs` |
| react / react-dom | 19.2.7 | Server Components, `useId`, Hooks in der Menü-Hülle | Bestand |
| tailwindcss | 4.3.0 | CSS-first Tokens in `app/globals.css`; v2 nutzt CSS Modules | Bestand |
| lucide-react | 0.475.0 | Gruppen-Icons (`FileText`, `CalendarDays`, `HardHat`, `Receipt`, `Calculator`, `Users`, `ChevronDown`, `Menu`, `X`) | Bestand, D-05 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @playwright/test | 1.63.0 | E2E (Chromium/WebKit, 1440 + 390-Touch) | Menü-, Above-the-fold-, Zwei-Klick-, No-JS-Tests |
| @axe-core/playwright | 4.13.0 | axe wcag2a/2aa/21aa | `/`, `/funktionen`, offenes Menü |
| vitest | 5.0.0 | Daten-, Budget-, Paritäts-, Metadaten-Tests; `renderToString` von Seiten (Muster `tests/styleguide.test.ts`) | Welle 0 |
| server-only | 0.0.1 | Schutz `lib/product-register.ts` | Header-Server-Teil darf Register importieren, Client-Hülle nie |

**Installation:** keine.

## Package Legitimacy Audit

Diese Phase installiert keine externen Pakete. **Packages removed due to [SLOP] verdict:** none. **Packages flagged as suspicious [SUS]:** none.

## Architecture Patterns

### System Architecture Diagram

```
Build/Request (statisch vorgerendert)
        │
        ▼
lib/funktionen.ts (16, + neuer Nutzensatz) ──┐
lib/product-register.ts liveExtras (14) ─────┼──► lib/funktionsgruppen.ts (server-only)
lib/site.ts (Preise, trialDays) ─────────────┘     6 Gruppen × Einträge {name, benefit, icon, platforms, href|null}
                                                     │
          ┌──────────────────────────────────────────┼─────────────────────────────┐
          ▼                                          ▼                             ▼
app/layout.tsx → Header (Server)            app/page.tsx (Server)        app/funktionen/page.tsx (Server)
  ├─ MegaMenuPanel (Server, Links+Icons)      Hero(DevicePair) → KeyFacts   SectionHeader(id=gruppe)
  └─► HeaderShell ("use client")               → StepFlow(amber, → #gruppe)  + FeatureCard-Raster (16)
        Zustand: offen/Gruppe, Esc,            → BentoGrid → Apps            + Kompaktliste Zusatzfunktionen (14)
        Außenklick, Scroll-Lock,               → Preis-Kurzfassung           + JSON-LD Breadcrumb + ItemList
        Breakpoint-Reset, usePathname-Close     → FaqList(+FAQPage) → CtaBand
          │                                          │                             │
          ▼                                          ▼                             ▼
Browser: Klick-Delegation Analytics (trial_click/login_click) ◄── alle Links auf app.craftos.eu
No-JS: <noscript>-CSS zeigt Navigation statisch; Top-Level-Links → Übersichtsseiten
```

### Recommended Project Structure
```
craftos/
├── lib/
│   ├── funktionen.ts            # + Feld benefit (genau 1 Satz, ≤ 100 Z.) je Definition
│   ├── product-register.ts      # liveExtras + slug/group/benefit/icon/href (oder Mapping in funktionsgruppen.ts)
│   ├── funktionsgruppen.ts      # NEU, server-only: 6 Gruppen, Reihenfolge, Zuordnung, Ziele
│   ├── home-content.ts          # NEU: alle Startseitentexte (budgetprüfbar wie styleguide-content.ts)
│   └── scenes.ts                # NEU: FrameScene-Daten aus styleguide-content.ts herausgelöst (wiederverwendbar)
├── components/
│   ├── layout/Header.tsx        # Server: baut Menümodell, rendert Panel, übergibt Slot
│   ├── layout/HeaderShell.tsx   # "use client": Zustand und Ereignisse (aus heutigem Header übernommen)
│   ├── layout/MegaMenu.tsx      # Server: 6 Gruppen, Icons, Kurzbeschreibungen, Links (ul/li)
│   └── v2/
│       ├── SceneContent.tsx     # aus app/styleguide/page.tsx:93–113 herausgelöst
│       ├── FeatureList.tsx      # NEU (nur falls nötig): Kompaktzeile für Zusatzfunktionen, Budget 40/100
│       └── DevicePair.tsx       # + optionale Lage "compact" für < 768 px (Hero)
├── app/page.tsx                 # neu aufgebaut
├── app/funktionen/page.tsx      # neu aufgebaut
└── tests/
    ├── funktionsgruppen.test.ts # NEU: Parität Register ↔ Gruppen ↔ Menü, Ziele existieren
    ├── home.test.ts             # NEU: Budgets, Abschnittszahl, H1/Title/Description
    └── e2e/home-navigation.pw.cjs # NEU: Above-the-fold, Menü-Tastatur/Touch, Zwei-Klick, No-JS
```

### Pattern 1: Disclosure-Navigation mit Top-Level-Links (WAI-APG)
**What:** Jeder Hauptpunkt = `<a href="/funktionen">Funktionen</a>` plus separater `<button aria-expanded aria-controls="nav-funktionen">` (Chevron, zugänglicher Name z. B. „Funktionen“-Untermenü). Verschachtelte `ul/li` im `nav`. Kein `role="menu"/"menubar"`.
**Keyboard:** Tab/Shift+Tab durch Links und Buttons; Enter/Space am Button toggelt; Escape schließt und setzt Fokus auf den Button; Pfeiltasten optional und nur ergänzend; Fokus verlässt die Navigation → Panel schließt. [CITED: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/] Die APG begründet den Verzicht auf `role="menu"`: Site-Navigation braucht das komplexe Menü-Tastaturmodell nicht. [CITED: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/]
**Hover:** Bestehendes Maus-Hover-Öffnen (`pointerType === "mouse"`) darf bleiben; dann muss das Panel per Esc schließbar, hoverbar und stabil sein (WCAG 1.4.13). [ASSUMED]
**Aktuelle Seite:** `aria-current="page"` am Link der aktuellen Route (APG-Empfehlung; `usePathname` in der Hülle oder serverseitig nicht möglich im Layout → in der Client-Hülle per Delegation setzen). [CITED: APG]
**Abweichung zum Bestand bewusst entscheiden:** Heute ist „Produkt“ nur Button. Mit Top-Level-Link + Button werden die Tests „Produkt-Button“ → „Funktionen-Button“ umgeschrieben; der Link ist zusätzlich (No-JS, 2-Klick-Weg c).

### Pattern 2: Startseite als Folge „SectionHeader + genau ein visueller Baustein“
**Abschnittsplan (7 nach dem Hero, innerhalb D-02 und UI-SPEC-Seitenrezept `05-UI-SPEC.md:585`):**
1. **Hero** (dunkel, Bestand `.home-hero`-Fläche): Eyebrow optional, H1 = Keyword-Map-Ziel „Handwerkersoftware, die Büro und Baustelle verbindet“ (52 Z.), ein Satz (≤ 140 Z.), `.v2-btn-cta` „10 Tage kostenlos testen“ → `site.ctaUrl` (+ optional `data-track="trial"`), Sekundäraktion „Alle Funktionen“ → `/funktionen` (Textlink), `DevicePair` (Plantafel-Browser + Einsätze-Phone, Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“, `tone="dark"`). Store-Badges und Preiszeile wandern in Abschnitt 5/6.
2. **KeyFacts** (zentrierter SectionHeader erlaubt): `${trialDays} Tage` „kostenlos testen“ (`site.trialDays`), Voll-Lizenz pro Monat (`tarife.voll.monat`), App-Lizenz pro Monat (`tarife.app.monat`), „21“ „Sprachen in der Mobile-App“ (`mobileLocales.length`); `note` „Preise netto zzgl. USt. Stand: …“ aus `productBasis.checkedAt`. Keine „Anzahl Funktionen“ (Zählweise 16/30 missverständlich).
3. **StepFlow `tone="amber"`** (einzige Amber-Fläche): 6 Schritte Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team, `href` = `/funktionen#<gruppe>`, Titel ≤ 28, Text ≤ 80.
4. **BentoGrid** (3–7 Kacheln, ≥ 2 Größen, max. 1 dunkel): Kernfunktionen mit Visual (lg dunkel: Plantafel-BrowserFrame; sm/md: TileIcon oder Mini-Phone), Kachel-`href` auf Detailseiten. Darf nicht direkt auf StepFlow folgen? → zulässig, da anderer Baustein („zwei aufeinanderfolgende Abschnitte nutzen nie denselben Baustein“).
5. **Web-App + Mobile-App**: SectionHeader + `PhoneFrame` oder `BrowserFrame` (nicht `DevicePair`, der steht im Hero) + `StoreLinks` + Link `/app`.
6. **Preis-Kurzfassung**: `ComparisonTable` Voll-Lizenz vs. App-Lizenz (Muster `lib/styleguide-content.ts` `comparisonContent`) + Link „Preise ansehen“ → `/preise`; Werte nur aus `tarife`.
7. **FaqList** (3–8 Fragen, Antwort erster Satz ≤ 300, gesamt ≤ 600) + `JsonLd(faqSchema(sameArray))`. GoBD- und Offline-Antworten kürzen; ausführliche Fassungen stehen auf `/gobd` bzw. `/hilfe/mobile-offline-synchronisierung` (D-03).
8. **CtaBand** (ersetzt `TrialCta` auf der Startseite; höchstens einmal je Seite).

Entfallen auf der Startseite (URLs bleiben): GoBD-Box (→ Menü-Fußleiste/Footer/FAQ), Ratgeber-Block (→ Menü „Wissen“), alte `PricingTable` (bleibt auf `/preise`), beide `FeatureSnippet`-Szenen (D-04: statische UI ersetzt sie; spart Client-JS und CLS-Risiko).

### Pattern 3: Server-gerendertes Mega-Menü als Slot einer Client-Hülle
**What:** `Header` wird Server Component; er liest `lib/funktionsgruppen.ts` (darf `server-only` importieren), rendert `<MegaMenu>` (Links via `next/link`, Icons als SVG) und übergibt es als Prop/Children an `HeaderShell` (`"use client"`). Next 16: „You can pass Server Components as a prop to a Client Component … Server Components are rendered on the server ahead of time, even when passed as props to Client Components.“ [CITED: craftos/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md, „Interleaving Server and Client Components“]
**Warum:** (1) `funktionen.ts` (25,6 KB inkl. aller Texte) und das Register gelangen nicht ins Client-Bundle; (2) Links stehen vollständig im HTML (Crawler, No-JS); (3) Client-JS bleibt auf die Hülle beschränkt (D-13).
**Folgen:** `onClick={closeNavigation}` an Server-Links ist unmöglich → in der Hülle per Delegation am `nav` schließen (`event.target.closest("a")`) **und** bei Routenwechsel (`usePathname`-Effekt), weil das Root-Layout bei Client-Navigation nicht neu mountet.

### Pattern 4: Above the fold – Rechnung je Viewport
Grundlagen: Header 74 px (≤ 1120 px) bzw. 84 px; Container 324 px bei 360 (`calc(100% - 36px)`, `globals.css:407`); globale H1 `line-height 1.12`, `hyphens: auto` (`globals.css:72–79, 446–451`); `.v2-btn-cta` min. 48 px; `DevicePair` stapelt < 768 px (`Frames.module.css:226–258`), Browser 16:10, Phone 194 × 410.

| Viewport | Verfügbar unter Header | Text + CTA (Schätzung) | Rest für Produkt | Ergebnis |
|---|---|---|---|---|
| 360 × 640 | 566 px | Abstand 24 + H1 3 Zeilen à ~35 (≈ 105) + 16 + Satz 3 Zeilen (≈ 72) + 24 + CTA 48 + 12 + Sekundärlink ~24 ≈ 325 | ≈ 240 px | Browserrahmen (324 × 203) passt **nur**, wenn das Phone nicht darunter gestapelt wird → Kompaktlage nötig |
| 390 × 844 | 770 px | ≈ 320 | ≈ 450 | Browser + kleines Phone passen |
| 768 × 1024 | 950 px | ≈ 330 (einspaltig) | ≈ 600 | DevicePair nebeneinander (≥ 768) passt |
| 1024 × 768 | 694 px | zweispaltig (`lg`), Text ≈ 380 | Pair rechts ≈ 460 breit, Höhe Browser 288 + Phone 410 (Versatz 24) ≈ 434 + Caption | passt knapp; Phone-Breite 160 erwägen |
| 1440 × 900 | 816 px | zweispaltig | ausreichend | passt |
[ASSUMED: Zeilenzahlen/Glyphbreiten von Clash Display geschätzt – per Playwright messen]

**Wichtig:** Bei 360 px und H1 ≥ 36 px passt „Handwerkersoftware,“ (19 Zeichen) nicht in 324 px → `hyphens: auto` trennt das Hauptkeyword. H1-Größe auf ca. `clamp(32px, 8.5vw, 64px)` setzen und im Test prüfen, dass das Wort ungetrennt bleibt (z. B. Breite eines `<span>` um das Keyword ≤ Containerbreite, `hyphens: manual` am Span). [ASSUMED]

### Anti-Patterns to Avoid
- **`role="menu"`/`menubar` für Site-Navigation** – erzwingt Pfeiltasten-Modell, das Nutzer nicht erwarten (APG).
- **Mega-Menü-Daten in der Client Component importieren** – bündelt `funktionen.ts`, und `product-register.ts` bricht den Build (`server-only`).
- **Panels clientseitig erst nach Hydration rendern** – Links fehlen ohne JS und für Crawler.
- **Panels serverseitig sichtbar, nach Hydration verstecken** – Layout-Sprung (CLS > 0).
- **Verschachteltes Akkordeon Funktionen → Gruppe → Link im Drawer** – 3 Taps, verletzt DESIGN-03.
- **`FeatureCard` für Zusatzfunktionen mit Link zur Elternseite** – Linktext „Mehr zu Mahnwesen“ führt auf eine Seite ohne Mahnwesen (irreführend; FeatureCard wirft außerdem für unbekannte Slugs).
- **Literale Preise/Testtage im JSX** – Paritäts- und Literal-Scans werden rot.
- **„Seite folgt“, „bald“, „demnächst“ bei Zusatzfunktionen** – `announcements.test.ts`, `route-audit`, `live-check` schlagen an.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Abschnittskopf, Kennzahlen, Ablauf, Raster, Karten, FAQ, CTA | eigene Section-/Card-Markup | `components/v2/*` | Budgets, Semantik, Fokus, Reduced Motion sind geprüft (`tests/design-v2-*.test.ts`) |
| Produktdarstellung | Screenshot, animierte Szene | `DevicePair`/`BrowserFrame`/`PhoneFrame` + Mini-UI | Kennzeichnung, Belege, `inert`/`aria-hidden`, feste Seitenverhältnisse (CLS 0) |
| FAQ-Schema | eigenes JSON | `faqSchema()` aus `lib/schema.ts` mit demselben Array wie `FaqList` | „nur sichtbare Fragen“ automatisch |
| Breadcrumb-Schema | eigenes JSON | `breadcrumbSchema()` (`lib/schema.ts:67–78`; Namen wie Detailseiten „Start“, „Funktionen“) | einheitlich |
| JSON-LD-Ausgabe | `dangerouslySetInnerHTML` direkt | `components/seo/JsonLd.tsx` (escapt `<`) | XSS-sicher |
| Tracking | `onClick`-Handler je CTA | bestehende Delegation in `Analytics.tsx` + `classifyAppLink` | zählt alle `app.craftos.eu`-Links |
| Metadaten | eigenes `<head>` | `pageMetadata()` (`lib/metadata.ts`) | Canonical, OG, Twitter konsistent |
| Textbudgets | eigene Längenprüfung | `TEXT_BUDGET`, `assertTextBudget`, `assertCount`, `charCount` (`components/v2/budgets.ts`) | UI-SPEC-Fehlertexte |
| Menülogik Breakpoint/Scroll-Lock/Escape | Neuschreiben | Logik aus `Header.tsx:38–115` in `HeaderShell` übernehmen | in 6 E2E-Fällen bewährt (Chromium/WebKit, Touch) |

**Key insight:** Fast alles Sichtbare existiert als geprüfter Baustein; das Risiko der Phase liegt in Datenparität (Register ↔ Menü ↔ Übersicht), Client-Grenzen und den vielen hart kodierten Testerwartungen – nicht in neuer Gestaltung.

## Common Pitfalls

### Pitfall 1: Title-Template gilt nicht für die Root-Seite
**What goes wrong:** `app/layout.tsx:63–66` setzt `template: "%s | CraftOS"`. Laut Next-16-Doku gilt das Template nur für **Kind**-Segmente; `app/page.tsx` liegt im selben Segment. [CITED: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md, „template“]
**How to avoid:** Startseite: vollständigen Title übergeben („Handwerkersoftware für Büro und Baustelle | CraftOS“, 51 Z.). `/funktionen`: nur „Software für Handwerksbetriebe: alle Funktionen“ übergeben → gerendert 57 Z. inkl. „| CraftOS“. Der D-12-Test vergleicht den **gerenderten** Title mit `keyword-map.json` `target.title` (für `/` = `metadata.title`, sonst `metadata.title + " | CraftOS"`).
**Warning signs:** `<title>` endet doppelt oder gar nicht auf „| CraftOS“.

### Pitfall 2: Neue E2E-Dateien laufen nicht
`playwright.config.cjs:7` listet Spec-Dateien explizit. Neue Datei ohne Eintrag = grüner Lauf ohne Prüfung. Zusätzlich: Projekte sind nur 1440 (Desktop) und 390-Touch; 360/768/1024 und Höhen (640/1024/768/900) per `page.setViewportSize` im Desktop-Projekt durchlaufen (Muster `design-v2.pw.cjs:58–63`). Der Config fehlt ein `webServer` → Server (`next start -p 3100`) muss vorher laufen.

### Pitfall 3: WebKit überspringt Links bei Tab
Muster aus `design-v2.pw.cjs:95,113–117`: in WebKit `Alt+Tab` verwenden bzw. Fokusfähigkeit per `.focus()` prüfen. Menü-Tastaturtest sonst in WebKit falsch rot.

### Pitfall 4: Menü bleibt nach Client-Navigation offen
Root-Layout mountet bei `next/link`-Navigation nicht neu; ohne `onClick` an Server-Links schließt nichts. Lösung: Delegation am `nav` + `useEffect` auf `usePathname()`; Scroll-Lock-Cleanup läuft dann mit.

### Pitfall 5: Scroll-Lock verschiebt Layout auf Desktop-Fenstern ≤ 1120 px
`overflow: hidden` am `html` entfernt die Scrollleiste (Windows) → Inhalt springt (Layout-Shift, D-06 „ohne Layout-Shift“). Gegenmittel: `scrollbar-gutter: stable` am `html` oder Lock nur bei `(pointer: coarse)`; im Test Breite von `main` vor/nach Öffnen vergleichen. [ASSUMED]

### Pitfall 6: Anker unter dem Sticky-Header
Gruppenanker `/funktionen#baustelle` landen unter dem 74/84-px-Header. `scroll-margin-top` (≥ 100 px) auf den SectionHeader-Ankern setzen; E2E: nach Ankerklick `getBoundingClientRect().top ≥ Headerhöhe`.

### Pitfall 7: Hauptkeyword wird getrennt oder kannibalisiert
`hyphens: auto` trennt „Handwerkersoftware“ bei 360 px (s. Pattern 4). Außerdem darf `/funktionen` nicht mehr „Handwerkersoftware“ als Titel-/H1-Kern tragen (heutiger Title „Alle Funktionen der Handwerkersoftware“ konkurriert mit `/`); Keyword-Map `/funktionen` = „software für handwerksbetriebe“.

### Pitfall 8: Budgets nur zur Renderzeit
Bausteine werfen beim Rendern (`assertTextBudget`); ein Fehler fällt erst beim Build/Seitenaufruf auf. Inhalte deshalb in `lib/home-content.ts` bzw. `lib/funktionsgruppen.ts` ablegen und in Vitest gegen `TEXT_BUDGET` prüfen (Muster `tests/design-v2-budgets.test.ts:52 ff.`), inklusive „genau ein Satz“ (Satzende-Zählung).

### Pitfall 9: `data-evidence` auf indexierter Seite (LO-05)
`BrowserFrame`/`PhoneFrame`/`DevicePair` schreiben interne Quellpfade (`web:src/pages/Plantafel.tsx`) ins HTML. Bisher nur `/styleguide` (noindex); ab Phase 6 auf `/`. Entscheidung vor Umsetzung nötig (Open Question 2).

### Pitfall 10: Zusatzfunktionen falsch zählen oder „Vorhersagen“ zeigen
`liveExtras` enthält 15 Einträge; nur `advertised: true` (14) erscheinen. Der Paritätstest muss gegen `advertised` filtern, sonst wird „Vorhersagen“ (Umfang ungeprüft) beworben.

### Pitfall 11: Prefetch-Burst beim Öffnen des Mega-Menüs
`next/link` prefetcht beim Eintritt in den Viewport (nur Produktion); versteckte Panels prefetchen nicht, ein geöffnetes Mega-Menü mit ~22 Links löst viele Prefetches aus. Für statische Routen ist das klein; bei Bedarf `prefetch={false}` an Panel-Links (deaktiviert auch Hover-Prefetch). [CITED: node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md, „prefetch“]

## Code Examples

### Disclosure-Button + Top-Level-Link (Hülle, gekürzt)
```tsx
// Muster: WAI-APG Disclosure Navigation with Top-Level Links; Logik aus Header.tsx:38–115 übernommen
"use client";
export function HeaderShell({ megaMenu, groups }: { megaMenu: React.ReactNode; groups: NavGroup[] }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => { setActive(null); setOpen(false); }, [pathname]); // Routenwechsel schließt
  return (
    <nav aria-label="Hauptnavigation" onClick={(e) => { if ((e.target as Element).closest("a")) close(); }}>
      <ul>
        <li>
          <Link href="/funktionen">Funktionen</Link>
          <button type="button" aria-expanded={active === "funktionen"} aria-controls="nav-funktionen"
            aria-label="Untermenü Funktionen" onClick={() => toggle("funktionen")}>
            <ChevronDown aria-hidden="true" size={15} />
          </button>
          <div id="nav-funktionen" hidden={active !== "funktionen"}>{megaMenu}</div>
        </li>
        {/* Gewerke, Preise, Wissen, Hilfe analog; Aktionen: Anmelden data-track="login", CTA → site.ctaUrl */}
      </ul>
    </nav>
  );
}
```

### No-JS-Fallback (Server, im Header)
```tsx
// Ohne JS: mobil Navigation statisch unter dem Header, Schalter ausblenden; Desktop: Top-Level-Links genügen.
<noscript>
  <style>{`@media (max-width:1120px){#hauptnavigation{display:block;position:static}
    [data-nav-toggle]{display:none}}`}</style>
</noscript>
```

### /funktionen JSON-LD
```tsx
// Quelle: lib/schema.ts:67–78 (breadcrumbSchema); ItemList nur für Einträge mit eigener URL.
// Google wertet ItemList-Karussells nur für Course/Movie/Recipe/Restaurant aus – hier rein semantisch.
<JsonLd data={breadcrumbSchema([{ name: "Start", path: "/" }, { name: "Funktionen", path: "/funktionen" }])} />
<JsonLd data={{
  "@context": "https://schema.org", "@type": "ItemList", name: "Funktionen von CraftOS",
  itemListElement: funktionen.map((f, i) => ({ "@type": "ListItem", position: i + 1,
    name: f.name, url: `${site.url}/funktionen/${f.slug}` })),
}} />
```
[CITED: https://developers.google.com/search/docs/appearance/structured-data/carousel – ListItem braucht `position` und `url`; Karussell nur für vier Inhaltstypen]

### Metadaten nach Keyword-Map
```ts
// app/page.tsx – Root-Segment: Template greift nicht, Marke selbst anhängen
export const metadata = pageMetadata(
  "Handwerkersoftware für Büro und Baustelle | CraftOS",
  `CraftOS ist die Handwerkersoftware für Angebote, Rechnungen, Plantafel, Zeiterfassung und Lager – Web-App und Mobile-App in einer Lizenz. ${site.trialDays} Tage testen.`,
  "/",
);
// app/funktionen/page.tsx – Template hängt " | CraftOS" an (gerendert 57 Zeichen)
export const metadata = pageMetadata(
  "Software für Handwerksbetriebe: alle Funktionen",
  "Angebote, Rechnungen, Plantafel, Zeiterfassung, Aufmaß, Lager und Baudokumentation: alle Funktionen der Software für Handwerksbetriebe im Überblick.",
  "/funktionen",
);
```

## SEO (SEO-02-Umsetzung)

| Pfad | Feld | Ist | Soll (`keyword-map.json` target) | Länge Soll |
|---|---|---|---|---|
| `/` | Title | „CraftOS – Handwerkersoftware für Büro & Baustelle“ (49) | „Handwerkersoftware für Büro und Baustelle \| CraftOS“ | 51 |
| `/` | H1 | „Mehr Handwerk. Weniger Büro.“ | „Handwerkersoftware, die Büro und Baustelle verbindet“ | 52 |
| `/` | Description | 128 Z. | „CraftOS ist die Handwerkersoftware für Angebote, … 10 Tage testen.“ | 153 |
| `/funktionen` | Title | „Alle Funktionen der Handwerkersoftware \| CraftOS“ (48) | „Software für Handwerksbetriebe: alle Funktionen \| CraftOS“ | 57 |
| `/funktionen` | H1 | „Weniger suchen. Mehr erledigen.“ | „Alle Funktionen der Software für Handwerksbetriebe“ | 50 |
| `/funktionen` | Description | 125 Z. | „Angebote, Rechnungen, Plantafel, Zeiterfassung, Aufmaß, Lager und Baudokumentation: …“ | 148 |
[VERIFIED: Längen per Node aus keyword-map.json gezählt]

- Nebenbegriffe: `/` „handwerker software“, „software für handwerker“; `/funktionen` „betriebssoftware handwerk“ – natürlich im Einleitungssatz/FAQ nutzbar, nicht als H1.
- Menü-Ankertexte: Funktionsnamen aus `funktionen.ts` (enthalten meist das Zielkeyword: „Plantafel & Einsatzplanung“, „Zeiterfassung“, „Nachkalkulation“, „Kundenportal“, „Aufmaß“). Titles/H1 der Detailseiten sind **Phase 7** (nicht ändern).
- Schema: Startseite = Layout-Organization + SoftwareApplication (unverändert) + FAQPage (sichtbare Fragen); `/funktionen` = BreadcrumbList + ItemList (16 URLs). FAQ-Rich-Results zeigt Google seit 2023 nur noch für ausgewählte Websites; FAQPage bleibt als Struktur für KI-Suchen sinnvoll. [ASSUMED]
- Nach Rollout: `sitemap.ts` `pageUpdated` für `""`/`/funktionen` aktualisieren, `npm run indexnow`; Keyword-Map selbst bleibt unverändert (sonst `se-ranking-sync.mjs --check`, 05-07-SUMMARY).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/image` `priority` | `loading="eager"` + `fetchPriority="high"` | Next 16 (in `MediaFigure` umgesetzt) | Hero hat ohnehin kein Bild (Code-UI) → LCP = Text |
| ARIA-`menubar` für Websitemenüs | Disclosure-Navigation | APG-Praxis | kein Pfeiltasten-Zwang |
| Client-Header mit allen Daten | RSC-Panel als Slot in Client-Hülle | App Router | weniger JS, No-JS-fähig |

**Deprecated/outdated:** `site.nav` (`lib/site.ts:19–25`) ungenutzt; `site.demoUrl` ungenutzt; Altbausteine `components/ui/Faq`, `TrialCta`, `components/home/Hero` nach Umbau auf Startseite/`/funktionen` nicht mehr nötig (TrialCta bleibt auf anderen Seiten bis Phase 7/8).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | „Craft AI“ entspricht dem KI-Assistent-Panel (`src/components/ai-agent/AiAgentPanel.tsx`) am Web-Release | Funktionszuordnung | Craft AI würde ohne Registerbeleg beworben (PROD-Regel D-03) |
| A2 | Zeilen-/Glyphschätzungen für Above-the-fold (Clash Display) | Pattern 4 | Hero passt bei 360 × 640 nicht → Test rot, Schriftgröße nachjustieren |
| A3 | H1 ca. `clamp(32px, 8.5vw, 64px)` hält „Handwerkersoftware“ bei 360 px ungetrennt | Pattern 4 / Pitfall 7 | Keyword wird getrennt; per Messung korrigieren |
| A4 | `scrollbar-gutter: stable` verhindert den Scroll-Lock-Sprung | Pitfall 5 | Restsprung in Desktopfenstern ≤ 1120 px |
| A5 | WCAG 1.4.13 verlangt bei Hover-Panels Esc-Schließen, Hoverbarkeit, Persistenz | Pattern 1 | gering (Bestand erfüllt es) |
| A6 | FAQ-Rich-Results seit 2023 eingeschränkt | SEO | keiner für Umsetzung (Schema bleibt) |
| A7 | Gruppenzuordnung Dashboard → Buchhaltung, Kundenportal → Angebot, Projekt-Chat → Team | Funktionszuordnung | Discretion; nur Begründungspflicht im Plan |

## Open Questions (RESOLVED)

1. **Craft AI im Register?** — RESOLVED durch D-15 (nur Menülink, keine Funktionskarte)
   - What we know: Seite `/craft-ai` und Hilfeartikel `craft-ai-betriebsdaten-fragen` sind live; Register führt Craft AI nicht; Web-Release hat KI-Assistent-Code, „KI-Agent“ ist `notLive`.
   - What's unclear: ob Craft AI als Registerfunktion belegt werden soll.
   - Recommendation: In Phase 6 Craft AI nur als bestehenden Link in der Menü-Fußleiste führen (wie heute), **nicht** als Live-Funktionskarte; optional Registereintrag mit geprüftem Beleg als eigener kleiner Task (Belegprüfung läuft über `tests/product-register.test.ts` „Belege existieren am Release-Commit“).
2. **LO-05 `data-evidence` auf indexierten Seiten** — RESOLVED durch D-16: Kurzform `web:<Bildschirm>` bzw. `app:<Bildschirm>` (nicht `mobile:`); die E2E-Regex in `design-v2.pw.cjs` wird entsprechend auf web/app umgestellt (Plan 06-02)
   - What we know: Attribut nennt interne Pfade; E2E `design-v2.pw.cjs:83` erwartet `^(web|mobile):\S+`.
   - Recommendation: Attribut auf `web:<Bildschirmname>`/`mobile:<Bildschirmname>` verkürzen (Regex bleibt gültig), voller Pfad bleibt nur in Daten und Vitest-Belegprüfung; Entscheidung im ersten Plan festhalten.
3. **Vorschaubild je Gruppe im Mega-Menü (D-05 „optional“)** — RESOLVED durch D-17 (nur Icons + Kurzbeschreibung)
   - Recommendation: nur Icons + Kurzbeschreibung; Mini-UI im Header würde auf jeder Seite HTML-Gewicht und weitere `inert`-Bereiche hinzufügen. Falls gewünscht, höchstens eine statische Vorschau im Desktop-Panel.
4. **Ziele der Zusatzfunktionen: Hilfeartikel oder Detailseite?** — RESOLVED durch D-18 (Zuordnungstabelle, sonst ohne Link)
   - Recommendation: Hilfeartikel, wo einer das Thema direkt behandelt (GAEB, Mängel, Abnahme, Bautagesbericht, Wareneingang, Bauphasen), sonst Detailseite mit passendem Bullet, sonst ohne Link (Mahnwesen, Besichtigung, Kunden in der App, 21 Sprachen, Datenübernahme). Ziele im Datenmodul pflegen, Test prüft Existenz in `sitemap()`.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build, Tests (`engines: 24.x`) | ✓ | v24.12.0 | – |
| npm | Skripte | ✓ | 11.6.2 | – |
| Playwright Chromium/WebKit | E2E | ✓ | chromium-1243, webkit-2359 im `ms-playwright`-Cache | – |
| Python 3.12 + ui-ux-pro-max | Design-Kaskade | ✓ | 3.12.10, `search.py` vorhanden | – |
| gh CLI | `gh workflow list --all` | ✓ | 2.65.0 | – |
| Vercel CLI | Deployment-Status | ✓ | 50.1.3 (kein Analytics-Befehl) | Vercel-Dashboard für Analytics |
| Web-Release-Repo | Registerbelege | ✓ | `C:/Projekte/craft-connect-buddy` @ 535206b4 | Test wird übersprungen |
| Koordinationsrezept Website | schwere Läufe ohne `--host` | ✗ | – | lokal, ein schwerer Prozess (wie Phase 5); Lücke benennen |
| Context7 MCP | Doku | unklar | – | `craftos/node_modules/next/dist/docs` (in dieser Recherche genutzt) |

**Missing dependencies with no fallback:** keine.
**Missing dependencies with fallback:** Koordinationsrezept (lokal ausführen).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 5.0.0 (node, Alias `@`), Playwright 1.63.0 + axe 4.13.0 |
| Config file | `craftos/vitest.config.ts`, `craftos/tests/e2e/playwright.config.cjs` |
| Quick run command | `cd craftos && npx vitest run tests/funktionsgruppen.test.ts tests/home.test.ts tests/keyword-map.test.ts` |
| Full suite command | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build && (next start -p 3100 &) && npm run test:e2e` (Server danach über eigene PID beenden) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DESIGN-01 | H1 enthält „Handwerkersoftware“, CTA „10 Tage kostenlos testen“ → `site.ctaUrl`, Pair-Figur oben sichtbar bei 360×640, 390×844, 768×1024, 1024×768, 1440×900 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs home-navigation.pw.cjs -g "Above the fold"` | ❌ Wave 0 |
| DESIGN-01 | 6–8 Abschnitte nach Hero, je ≤ 1 `h2`, Leads genau 1 Satz, alle Texte im Budget | unit (`renderToString(Home)`) | `npx vitest run tests/home.test.ts` | ❌ Wave 0 |
| DESIGN-01/D-13 | CLS 0, Bildbudget, keine laufenden Animationen bei reduced motion auf `/` und `/funktionen` | e2e | `design-v2.pw.cjs` (BUDGET_ROUTES + `/funktionen`) | ✅ erweitern |
| DESIGN-02 | Startseite/Übersicht nutzen v2-Bausteine (z. B. `data-tone`, `figure[data-figure="pair"]`, `ol` StepFlow, `dl` KeyFacts) | unit | `npx vitest run tests/home.test.ts` | ❌ Wave 0 |
| DESIGN-03 | Menümodell = Gruppenmodell = Register (16 + 14 advertised), jede `href` in `sitemap()` oder Anker auf `/funktionen` | unit | `npx vitest run tests/funktionsgruppen.test.ts` | ❌ Wave 0 |
| DESIGN-03 | Zwei-Klick: für jeden Eintrag auf `/funktionen` (`[data-funktion]`) existiert nach genau einer Aktivierung (Desktop „Funktionen“-Button / Mobil Menü-Schalter) ein sichtbarer Menülink bzw. Gruppenlink; jedes Ziel HTTP 200 | e2e | `… home-navigation.pw.cjs -g "Zwei Klicks"` | ❌ Wave 0 |
| DESIGN-03 | Tastatur: Tab erreicht Button, Enter öffnet (`aria-expanded=true`), Tab in erste Gruppe, Esc schließt + Fokus zurück; Außenklick schließt; Touch-Tap öffnet/schließt; Breakpoint-Reset, Scroll-Lock ohne Breitenänderung von `main` | e2e | `navigation.pw.cjs` (umgeschrieben) | ✅ anpassen |
| DESIGN-03 | Ohne JS (1440 und 390): Link „Funktionen“ sichtbar, `/funktionen` erreichbar, Menülinks im HTML | e2e (`javaScriptEnabled:false`) | `… -g "ohne JavaScript"` | ❌ Wave 0 |
| DESIGN-03 | axe ohne serious/critical bei geöffnetem Menü (Desktop + Mobil) und auf `/`, `/funktionen` in 5 Breiten | e2e | `… -g "axe"` | ❌ Wave 0 |
| FEAT-01 | `/funktionen` zeigt 30 Einträge in 6 Gruppen in fester Reihenfolge; je Eintrag Visual (`svg`/`figure`), genau ein Satz ≤ 100 Z., Badges ⊆ belegte Plattformen; Gruppenanker vorhanden | unit (`renderToString`) | `npx vitest run tests/funktionsgruppen.test.ts` | ❌ Wave 0 |
| FEAT-01/D-10 | JSON-LD `/funktionen`: BreadcrumbList (2 Ebenen) + ItemList (16 URLs = funktionen) | unit | dto. | ❌ Wave 0 |
| SEO-02/D-12 | gerenderter Title, H1, Description von `/` und `/funktionen` = `target`; Keyword in Title und H1 | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ erweitern |
| D-06 Tracking | Header-Login `data-track="login"`; alle CTAs zeigen auf `site.ctaUrl` ohne `login` | unit + e2e | `tests/tracking.test.ts` + DOM-Prüfung im E2E | ✅ / ❌ |
| Bestand | Literal-/Testphasen-/Ankündigungs-Scans grün mit neuen Dateien | unit | `npx vitest run tests/pricing-parity.test.ts tests/announcements.test.ts tests/seo-brand.test.ts` | ✅ anpassen |
| Rollout | Links/Status/H1/Canonical aller Sitemap-URLs; Live-Prüfungen | script | `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`; `LIVE_ORIGIN=… node scripts/live-check.mjs` | ✅ (ggf. Title/H1-Checks ergänzen) |

### Sampling Rate
- **Per task commit:** betroffene Vitest-Dateien (`tests/funktionsgruppen.test.ts`, `tests/home.test.ts`, `tests/keyword-map.test.ts`, `tests/design-v2-*.test.ts`) + `npm run typecheck`.
- **Per wave merge:** `npm test`, `npm run lint`, `npm run build`, E2E gegen `next start -p 3100` (ein schwerer Prozess, Koordinationsstatus vorher lesen).
- **Phase gate:** Volle Suite grün + `route-audit` + `live-check` lokal + `visual-audit` für `/,/funktionen` (Chromium/WebKit, 360–1440) vor `/gsd-verify-work`.

### Wave 0 Gaps
- [ ] `tests/funktionsgruppen.test.ts` – Parität, Ziele, Budgets, Reihenfolge, „Vorhersagen“ ausgeschlossen (DESIGN-03, FEAT-01)
- [ ] `tests/home.test.ts` – Abschnittszahl, Überschriften, Budgets, Werte aus Datenmodulen (DESIGN-01/02)
- [ ] `tests/keyword-map.test.ts` – neuer Fall „Phase-6-Seiten folgen den Zielwerten“ (D-12)
- [ ] `tests/e2e/home-navigation.pw.cjs` + Eintrag in `testMatch` – Above the fold, Zwei Klicks, Tastatur, Touch, No-JS, axe
- [ ] Anpassungen: `tests/seo-brand.test.ts`, `tests/pricing-parity.test.ts` (Dateiliste), `tests/e2e/navigation.pw.cjs`, `tests/e2e/function-illustrations.pw.cjs:501–529` (entfernen), `tests/e2e/design-v2.pw.cjs:16` (`/funktionen` ergänzen)

## Security Domain

Statische Marketingseite ohne Konten, Formulare oder Nutzereingaben (`security_enforcement` nicht abgeschaltet).

### Applicable ASVS Categories
| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Login nur als Link auf `app.craftos.eu` |
| V3 Session Management | no | – |
| V4 Access Control | no | – |
| V5 Input Validation / Output Encoding | yes (JSON-LD) | `components/seo/JsonLd.tsx` escapt `<`; Inhalte nur aus Datenmodulen |
| V6 Cryptography | no | – |
| V8 Data Protection | yes (gering) | keine internen Quellpfade im HTML (LO-05), keine Secrets (`check-no-secrets.mjs`), Analytics ohne Query (`stripQuery`) |
| V14 Configuration | yes | bestehende Header (`next.config.js`: nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy) unverändert |

### Known Threat Patterns for Next.js-Marketingseite
| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Script-Injection über JSON-LD | Tampering | `JsonLd` mit `<`-Escaping, keine Fremddaten |
| Offenlegung interner Repo-Pfade | Information Disclosure | `data-evidence` verkürzen (Open Question 2) |
| Irreführende Produktaussagen (Compliance/UWG) | Repudiation | Fakten nur aus Register/`site.ts`, Ankündigungs-Scans, „Vorhersagen“ ausgeschlossen |
| Externe Links mit `target=_blank` | Tampering | keine neuen `_blank`-Links; falls doch `rel="noopener"` |

## Sources

### Primary (HIGH confidence)
- Codebasis `C:/Projekte/Websitenerstellung/craftos` – `app/page.tsx`, `components/home/Hero.tsx`, `app/funktionen/page.tsx`, `app/funktionen/[slug]/page.tsx`, `components/layout/Header.tsx` + `.module.css`, `Footer.tsx`, `components/Analytics.tsx`, `lib/tracking.ts`, `lib/funktionen.ts`, `lib/product-register.ts`, `lib/site.ts`, `lib/schema.ts`, `lib/metadata.ts`, `lib/keyword-map.ts`, `docs/seo/keyword-map.json`, `components/v2/*`, `tests/**`, `scripts/route-audit.mjs`, `scripts/live-check.mjs`, `docs/releases/PHASE-05-ROLLOUT.md`, `docs/DESIGN-V2.md`
- Planung: `06-CONTEXT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `05-UI-SPEC.md`, `05-REVIEW-FIX.md`, `deferred-items.md`
- Next 16.3.4 Doku (mitgeliefert): `generate-metadata.md` (title.template), `link.md` (prefetch), `05-server-and-client-components.md` (Interleaving)
- Web-Release `craft-connect-buddy` @ `535206b4` (git ls-tree/grep, nur lesend)

### Secondary (MEDIUM confidence)
- WAI-APG Disclosure Navigation: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ und …/disclosure-navigation-hybrid/
- Google Search Central Carousel/ItemList: https://developers.google.com/search/docs/appearance/structured-data/carousel

### Tertiary (LOW confidence)
- Schriftmaß-Schätzungen Above the fold, WCAG-1.4.13-Details, FAQ-Rich-Result-Einschränkung (Assumptions Log)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH – keine neuen Pakete, Versionen lokal gelesen
- Architecture: HIGH – Muster aus APG und Next-16-Doku, Bestand am Code belegt
- Pitfalls: HIGH für Test-/Metadaten-Fallen (am Code belegt), MEDIUM für Maßschätzungen

**Research date:** 2026-10-21
**Valid until:** 2026-11-20 (stabiler Stack; Registerbasis bei neuem Release-Tag neu prüfen)
