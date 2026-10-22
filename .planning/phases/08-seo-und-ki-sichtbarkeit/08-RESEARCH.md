# Phase 8: SEO und KI-Sichtbarkeit – Research

**Researched:** 2026-10-22
**Domain:** On-Page-SEO, strukturierte Daten und GEO für eine statische Next.js-16-Marketingsite (craftos.eu), vergleichende Werbung (UWG § 6), SE-Ranking-Daten
**Confidence:** HIGH für Code-Ist-Stand, Testlandschaft und Next-16-Muster; MEDIUM für Wettbewerberfakten (Momentaufnahmen, teils JavaScript-Umschalter); MEDIUM für Rechtsrahmen (Gesetzestext verifiziert, Rechtsprechung über Sekundärquellen)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Alternativen-Seiten (SEO-03)
- **D-01:** Grundlage sind die Entwürfe `craftos/docs/entwuerfe/{plancraft,craftnote,hero,tooltime}-alternative.md`; alle Wettbewerberangaben werden neu recherchiert und mit Quelle (URL) und Abrufdatum belegt (offizielle Herstellerseiten, Preisseiten, AGB/Impressum; Portale nur ergänzend). Unbelegte Angaben entfallen.
- **D-02:** Rechtlich zulässige vergleichende Werbung (UWG § 6): nur objektive, nachprüfbare, wesentliche Eigenschaften; keine Herabsetzung, keine Marken-Logos ohne Recht (Wortnennung ist zulässig), Stand-Datum sichtbar, Hinweis „Angaben ohne Gewähr, Stand <Datum>, Quelle“. Faire Darstellung inkl. Stärken des Wettbewerbers.
- **D-03:** Aufbau mit v2-Bausteinen: Kopf (H1 = Keyword „<Name> Alternative“ natürlich), Antwort zuerst (≤ 300 Zeichen), ComparisonTable (belegte Kriterien, Ja/Nein ohne Rot/Grün), „Für wen passt was“, Umstieg (Datenübernahme-Seite verlinken), FAQ (FAQPage), CtaBand; BreadcrumbList; verlinkt von `/vergleich` und Footer.
- **D-04:** Ein Datenmodul je Wettbewerber mit Pflichtfeldern `quelle`, `abgerufenAm`; Test verlangt Quelle+Datum für jede Wettbewerberangabe und ein Stand-Datum ≤ 60 Tage beim Build (Warnung) – kein Build-Abbruch durch Alter, aber sichtbarer Testhinweis.

#### Preise (SEO-04)
- **D-05:** `/preise` beginnt mit einem zitierfähigen Antwortsatz (Entwurf `preise-answer-first.md`, Werte aus `site.ts`/Snapshot) und der Preistabelle; v2-Bausteine; FAQ zu Kosten; Paritätstest bleibt maßgeblich.

#### Sitewide-Metadaten (SEO-05, SEO-02-Abschluss)
- **D-06:** Titel/Descriptions aller Seiten folgen der Keyword-Map (Entwurf `titel-descriptions.md` als Startpunkt, gegen aktuelle Keyword-Map abgleichen); Seiten ohne Suchvolumen-Keyword bekommen beschreibende, eindeutige Titel. Test über alle Sitemap-URLs (gerendert/gebaut): Titel ≤ 60, Description 120–155, genau eine H1, keine Duplikate (Titel und Description), Hauptkeyword im Titel, wo die Map eines hat.
- **D-07:** Sichtbare Breadcrumbs als Baustein (v2-Stil) auf allen Seiten außer Startseite, mit BreadcrumbList-Schema aus derselben Quelle.
- **D-08:** Individuelle OG-Grafik je Seite über Next `opengraph-image` je Routen-Segment (statisch generiert, Marke/Titel/Seitentyp, ≤ 300 KB, 1200×630); bestehende OG-Routen (Root, Blog, Hilfe) wiederverwenden und vereinheitlichen.

#### Antwort zuerst und KI-Sichtbarkeit (SEO-06, SEO-09-Teil)
- **D-09:** Zentrale Seiten (Startseite-FAQ, Preise, Vergleich, Alternativen, Funktionsübersicht, Fakten, App, Craft AI, GoBD): jede Frage-Überschrift (H2/H3 mit „?“) hat direkt darunter eine Antwort ≤ 300 Zeichen; Test.
- **D-10:** Für jeden der 16 AI-Tracker-Prompts eine Zielseite oder ein Abschnitt (Mapping-Datei `docs/seo/ai-prompts-targets.json` mit Prompt → URL#Anker), Test prüft Existenz und Antwort-zuerst. Neue Seite „Beste Handwerkersoftware für kleine Betriebe“ (Pfad laut Keyword-Map bzw. `/vergleich/handwerkersoftware-kleine-betriebe` falls nicht vorhanden) mit belegten Kriterien, ohne Selbstüberhöhung.
- **D-11:** Wissenslücken (KD < 20, Hilfe/Blog) werden im Mapping als „Phase 9“ geführt; SEO-09 wird erst in Phase 9 abgeschlossen (Traceability anpassen).

#### Gestaltung (DESIGN-02-Fortsetzung)
- **D-12:** `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` auf v2-Bausteine nach 05/06/07-UI-SPEC; Texte kürzen erlaubt (Inhaberauftrag), keine URL entfällt. DESIGN-02 wird in Phase 9 abgeschlossen (Gewerke/Wissen); Traceability anpassen.

#### SE Ranking
- **D-13:** SE Ranking gezielt nutzen (Test bis 03.11.2026, ~65.000 Units): SERP-/Keyword-Daten für Alternativen- und Kostenkeywords, Fragen (PAA-ähnlich) für FAQ, AI-Search-Daten für Prompt-Zielseiten; Abrufe drosseln, Rohdaten unter `docs/seo/data/` mit Datum, Schlüssel nie ausgeben. Nach Rollout `se-ranking-sync.mjs --check` und `seo-report.mjs --etappe rollout-phase08`.

#### Qualität, Rollout
- **D-14:** Wie Phase 7: strikt sequentielle Wellen, TDD für Datenmodule/Tests, schwere Läufe lokal einzeln (Port 3100, eigene PID), Code-Review-Gate durch Orchestrator vor dem Rollout-Plan, Ship-Gate, `gh workflow list --all` vor jedem Push, Vercel READY, `live-check.mjs` erweitern, IndexNow, Rollout-Nachweis `docs/releases/PHASE-08-ROLLOUT.md`.
- **D-15:** Anforderungsstatus: nur im Rollout-Plan markieren – SEO-03, SEO-04, SEO-05, SEO-06 und SEO-02 (Abschluss Keyword-Map-Metadaten sitewide); DESIGN-02 und SEO-09 bleiben „In Progress“ bis Phase 9. Alle anderen Pläne: `requirements-completed: []`.

### Claude's Discretion
- Reihenfolge und Zuschnitt der Pläne; Auswahl der Kriterien in Vergleichstabellen (nur belegte); Gestaltung der OG-Grafik innerhalb der Marke.

### Deferred Ideas (OUT OF SCOPE)
- Gewerke-Seiten und Wissenslücken → Phase 9.
- Datenschutz-Abschnitt Webanalyse → Inhaberfreigabe.
- Optik-Feinschliff (Icon-Kachel-Leerraum, Snippet-Dimmstufe), product-demo-Entscheidung → Phase 10.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-03 | Vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema, verlinkt von Vergleich und Footer | Abschnitte „Wettbewerberfakten vom 22.10.2026“ (Abgleich je Entwurf), „UWG § 6“, Pattern 1 (Datenmodul), Pitfalls 1–5 (Testphasen-Scan, Route-Audit, Zellbudget, Ankündigungssperre, Logos) |
| SEO-04 | Preisseite beginnt mit zitierfähigem Antwortsatz und Preistabelle aus dem Produktregister | Abschnitt „v2-Umbau /preise“, Pattern 4, Pitfall 6 (Literal-Test), Code-Beispiel „Antwortsatz aus site.ts“ |
| SEO-05 | Titel ≤ 60, Description 120–155, sichtbare Breadcrumbs mit Schema, individuelle OG-Grafik, genau eine H1, keine doppelten Titel – alle indexierten Seiten | Abschnitt „Sitewide-Metadaten-Ist (131 Seiten)“, „Breadcrumbs und OG“, Pattern 2/3, Pitfalls 7–10, Code-Beispiele OG/Breadcrumb/Post-Build-Audit |
| SEO-06 | Antwort ≤ 300 Zeichen unter jeder Frage-Überschrift zentraler Seiten; llms.txt, Sitemap, IndexNow je Release | Abschnitt „Antwort zuerst – Ist“, Pattern 5, Validation Architecture |
| SEO-09 (kommerzieller Teil) | Zitierfähige Zielseite/Abschnitt je getrackter KI-Frage | Abschnitt „AI-Tracker: 20 Einträge, 18 Prompttexte → Zielseiten“, SE-Ranking-Antwortanalyse, neue Seite „kleine Betriebe“ |
| SEO-02 (Abschluss) | Titel, H1 und Description aller Seiten folgen der Keyword-Map | „Sitewide-Metadaten-Ist“: 88 Seiten mit Zielwert, der noch nicht angewandt ist; Lösungsweg über `keyword-map.json` als einzige Quelle |
| DESIGN-02 (Fortsetzung) | v2-Bausteine auf `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` | Abschnitt „v2-Umbau: Ist-Analyse und hart kodierte Tests“ |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

Projekt-CLAUDE.md (`C:/Projekte/Websitenerstellung/CLAUDE.md`) und globale Regeln (`~/.claude/CLAUDE.md`). Projektregeln gehen vor, außer bei Tests/CI (globale Regel 5 gewinnt).

| Quelle | Direktive | Folge für die Planung |
|---|---|---|
| Projekt | Vor Framework-Code Context7 bzw. aktuelle Docs holen | In Phase 8 stehen die Next-16-Docs lokal unter `craftos/node_modules/next/dist/docs/`; Pläne verweisen darauf (siehe Sources) |
| Projekt | Jede UI-Arbeit: `/frontend-design` → `ui-ux-pro-max` → `/ui` (nur `21st_magic_component_inspiration`) → Context7 → SEO-Check; nie `21st_magic_component_builder/refiner` | Breadcrumb-Baustein, Alternativen-Vorlage, OG-Grafik und v2-Umbauten laufen über diese Kaskade (bzw. `pipeline-ui`) |
| Projekt | Jede Seite MUSS strukturierte Daten haben (JSON-LD); FAQPage für FAQ; BreadcrumbList | Neue Seiten: BreadcrumbList + FAQPage + WebPage; FAQ-Schema nur für sichtbare Fragen |
| Projekt | H2 als Frage, direkt danach faktische Antwort ≤ 300 Zeichen | Deckt sich mit D-09/SEO-06 |
| Projekt | TypeScript strict, keine `any`, Interfaces für Datenstrukturen | Wettbewerber-Datenmodule und Prompt-Mapping typisiert |
| Projekt | Semantic HTML, WCAG (Kontrast ≥ 4,5:1, Tastatur, Alt-Texte), next/font mit swap | Breadcrumb als `<nav aria-label>` + `<ol>`; `aria-current="page"` |
| Projekt | KI-Crawler nicht blockieren (robots.txt) | Bestand `app/robots.ts` bleibt; nicht ändern |
| Global 5 | Tests/Builds nur lokal; nie pushen zum Testen; keine Workflows anlegen; vor Push `gh workflow list --all` | Rollout-Plan übernimmt Phase-7-Muster (nur „Dependabot Updates“ aktiv) |
| Global | Ultra-Review nie automatisch; Standard `/review` bzw. GSD-Review | Code-Review-Gate über GSD-Phasenreview |
| Global | `ship-gate` immer vor Commit/Push | Rollout-Plan |
| Global | Koordinationsstatus vor schweren Läufen; höchstens ein schwerer Prozess je Host; für das Website-Repo fehlt ein Rezept | Status am 22.10.2026 12:36 UTC: edgar und edgarspc OFFLINE/VERALTET (Runner 1.9.9); schwere Läufe lokal nacheinander (Port 3100, eigene PID) |
| Global | Schlüssel nie ausgeben (SE Ranking, Sentry) | `check-no-secrets.mjs` nach jedem Rohdatenabruf |
| Global | Commit-Attribution „Co-Authored-By: Claude Opus 5.5 …“ | Für Commits der Ausführung |

## Summary

Phase 8 ist überwiegend Daten- und Template-Arbeit auf einer vorhandenen, sauberen Basis: Next 16.3.4 (App Router, statischer Export von 139 Routen), v2-Bausteine mit harten Textbudgets, `lib/schema.ts` mit `breadcrumbSchema`/`faqSchema`/`webPageSchema`, `keyword-map.json` mit Zielwerten für 113 Seiten. Die Ist-Analyse der vorhandenen Build-HTML-Dateien (Build vom 22.10.2026, 13:55, Code-Stand `126f807`) zeigt den Abstand zu SEO-05: Von 131 indexierten Seiten verletzen **87** mindestens eine der Regeln Titel ≤ 60 / Description 120–155 / genau eine H1; **41** Titel sind länger als 60 Zeichen, **64** Descriptions kürzer als 120; **0** Seiten zeigen sichtbare Breadcrumbs außer den zwei Rechnern; **61** Seiten nutzen die generische Root-OG-Grafik, drei Rechnerseiten haben gar kein `og:image`; nur 25 Seiten tragen exakt die Map-Zielwerte. Doppelte Titel oder Descriptions gibt es keine, aber zwei Kategorieseiten haben dieselbe H1 („Rechnungen“).

Die Wettbewerberangaben der Entwürfe sind preislich weitgehend aktuell (Stand 22.10.2026), aber an mehreren Stellen veraltet oder unvollständig: Craftnote nennt jetzt auf der Preisseite Laufzeit und eine dreimonatige Kündigungsfrist (der Hilfeartikel ist entbehrlich), ToolTime nennt auf der Startseite „E-Rechnung (XRechnung/ZUGFeRD)“ und führt „GAEB-Import & Export“, plancraft hat DATEV in allen Paketen, HERO unterstützt den XRechnung-Import ausdrücklich noch nicht. Die HERO-Preise stehen hinter einem JavaScript-Umschalter; welche Zahl zur monatlichen und welche zur jährlichen Zahlweise gehört, ist im statischen HTML nicht beschriftet – das braucht eine menschliche Sichtprüfung. Drei Entwürfe enthalten Sätze zum „angekündigten Telefon-Agent“; das verstößt gegen PROD-04 und würde `announcements.test.ts`, `route-audit.mjs` und `live-check.mjs` rot machen.

Mehrere bestehende Schutztests kollidieren unvermeidlich mit legitimen Wettbewerberangaben und müssen bewusst angepasst werden, bevor Inhalte entstehen: der Testphasen-Scan in `pricing-parity.test.ts` (jede Tagesangabe ≠ 10 im Testkontext schlägt fehl), das `oldTrial`-Muster `/14 Tage (kostenlos|testen)/` in `route-audit.mjs`, das Zellbudget der `ComparisonTable` (24 Zeichen) und die Provenienzprüfung der Keyword-Map (Zahlen müssen aus `docs/seo/data/kwmap/` mit Manifesteintrag stammen). Die SE-Ranking-Daten bestätigen die Ausrichtung: Markenpreis-Suchen („tooltime preise“ 140, „hero software preise“ 140, „craftnote preise“ 110, „was kostet plancraft“ 50) übertreffen die Alternativen-Suchen (10–30) deutlich; ChatGPT nennt CraftOS heute nur bei „günstige Handwerkersoftware mit App für Mitarbeiter“ und verwechselt „Was ist CraftOS?“ mit gleichnamigen Projekten.

**Primary recommendation:** Erst die Daten- und Prüfinfrastruktur (Wettbewerber-Module mit Quelle/Abrufdatum, Prompt-Mapping, Post-Build-SEO-Audit über `.next/server/app/**/*.html`, angepasste Schutztests), dann Breadcrumb- und OG-Baustein mit `generateStaticParams`, dann sitewide Metadaten aus `keyword-map.json` als einziger Quelle, dann die Seiten (Preise → Alternativen → Vergleich/kleine Betriebe → Fakten/Craft AI/GoBD), zuletzt Rollout nach Phase-7-Muster.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Wettbewerberfakten (Preise, Laufzeit, Quellen, Abrufdatum) | Daten-Module im Repo (`lib/…`, Build-Zeit) | – | Statisch, versioniert, testbar; keine Laufzeitabfrage fremder Seiten |
| Titel/Description/H1 je Seite | Frontend Server (SSG, `metadata`/`generateMetadata`) | `docs/seo/keyword-map.json` als Quelle | Next rendert Metadaten beim Build; Map ist die einzige Zielwertquelle |
| BreadcrumbList-Schema + sichtbare Breadcrumbs | Frontend Server (SSG, Server Component) | – | Eine Datenquelle je Seite erzeugt beides; kein Client-JS nötig |
| OG-Grafiken | Frontend Server (Metadata Route Handler, Build-Zeit prerendered) | CDN (Vercel Cache) | `opengraph-image.tsx` ist ein spezieller Route Handler, statisch bei `generateStaticParams` |
| Antwort-zuerst-Blöcke, FAQ | Frontend Server (SSG, statisches HTML) | – | Muss ohne JS im HTML stehen (KI-Crawler) |
| `llms.txt`, Sitemap | Frontend Server (Route Handler, statisch) | – | Aus denselben Datenmodulen generiert |
| IndexNow-Meldung | Release-Skript (lokal, nach Deployment) | Externer Dienst api.indexnow.org | Nur nach bestätigtem Live-Stand |
| SEO-Prüfung sitewide | Lokales Post-Build-Skript + Vitest | Live-Check gegen craftos.eu | Prüft echtes HTML statt Komponenten-Annahmen |
| SE-Ranking-Messung | Lokale Skripte über MCP (`scripts/lib/se-ranking-mcp.mjs`) | SE-Ranking-API | Schlüssel aus `.env`, nie ausgeben |

## Standard Stack

### Core (alles vorhanden, keine neue Abhängigkeit)

| Library | Version (installiert) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.3.4 (`package.json` `^16.1.4`) | App Router, Metadata API, `opengraph-image`, `next/og` `ImageResponse` | Bereits Basis; OG-Erzeugung eingebaut (Satori + resvg) [VERIFIED: craftos/node_modules/next/package.json] |
| react / react-dom | ^19.2.3 | Server Components | Bestand |
| vitest | ^5.0.0 | Unit-/Datentests (`tests/**/*.test.ts`) | Bestand, 483 Tests grün (Phase 7) |
| @playwright/test | 1.63.0 | E2E (Chromium/WebKit, 1440/390) | Bestand [VERIFIED: npx playwright --version] |
| @axe-core/playwright | ^4.13.0 | A11y in E2E | Bestand |
| gray-matter, unified/remark/rehype | Bestand | Blog/Hilfe-Frontmatter und HTML | Bestand |

### Supporting (vorhandene Projektbausteine, die Phase 8 nutzen muss)

| Baustein | Pfad | Wann |
|---|---|---|
| `pageMetadata(title, description, path, imagePath)` | `lib/metadata.ts` | Alle Seiten; `imagePath` je Segment setzen, sonst bleibt `twitter:image` generisch |
| `breadcrumbSchema`, `faqSchema`, `webPageSchema`, `itemListSchema` | `lib/schema.ts` | Schema je Seite |
| `JsonLd` | `components/seo/JsonLd.tsx` | Escaped `<` bereits |
| `articleOg(title, kind)` | `lib/og.tsx` | Basis für vereinheitlichte OG-Vorlage |
| v2: `SectionHeader`, `ComparisonTable`, `FaqList`, `CtaBand`, `KeyFacts`, `BentoGrid`, `StepFlow`, `FeatureCard`, `Badges` | `components/v2/*` | Seitenumbau; Budgets in `components/v2/budgets.ts` |
| `keyword-map.json` + `lib/keyword-map.ts` | `docs/seo/` | Zielwerte Titel/H1/Description |
| `se-ranking-mcp.mjs` (`createClient`, `callTool`, `rowsOf`) | `scripts/lib/` | SE-Ranking-Abrufe |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `opengraph-image.tsx` je Segment | Ein zentraler Route Handler `/og/[...path]` | Widerspricht D-08 (je Routen-Segment); Datei-Konvention setzt `og:image` automatisch und hat Vorrang vor Config-Metadaten |
| Post-Build-Audit über `.next/server/app/*.html` | Vitest rendert jede Seite per `renderToStaticMarkup` | Rendering async/dynamischer Seiten in Vitest ist aufwendig; Build-HTML enthält das echte `<title>`-Template („%s \| CraftOS“), Layout-H1-Verhalten und JSON-LD |
| Frontmatter-Titel je Artikel editieren | Metadaten aus `keyword-map.json` per Pfad lesen | Map ist schon die Zielwertquelle (D-06); vermeidet zweite Wahrheit; H1 bleibt Inhaltsentscheidung |

**Installation:** keine. Keine neuen npm-Pakete erforderlich.

**Version verification:** `next` 16.3.4 und Playwright 1.63.0 lokal geprüft am 22.10.2026; keine Registry-Abfrage nötig, da nichts installiert wird.

## Package Legitimacy Audit

Diese Phase installiert keine externen Pakete. `next/og` ist Teil von `next` (gebündelt unter `node_modules/next/dist/compiled/@vercel/og`).

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| – | – | – | – | – | – | Keine Installation |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

Hinweis Schriftdateien: Für Markenschriften in OG-Grafiken wären TTF/OTF/WOFF-Dateien nötig (siehe Pitfall 9). Das sind Assets, keine Pakete; Herkunft und Lizenz brauchen eine Inhaberprüfung (`checkpoint:human-verify`).

## Wettbewerberfakten vom 22.10.2026 (offizielle Quellen) und Abgleich mit den Entwürfen

Alle Abrufe am **22.10.2026** per WebFetch; Werte netto, sofern nicht anders vermerkt. „Entwurf“ = `craftos/docs/entwuerfe/*-alternative.md` (Stand 20.10.2026).

### plancraft

| Angabe | Wert 22.10.2026 | Quelle | Entwurf |
|---|---|---|---|
| Pakete (Monat / Jahr / 2 Jahre, je Monat) | Business 74,90 / 59,90 / 47,92 €; Pro 139,90 / 109,90 / 87,92 €; Premium 249,90 / 199,90 / 159,92 €; „zzgl. USt.“ | https://plancraft.com/de-de/preise [CITED] | aktuell |
| Enthaltene Bürozugänge | Business 1, Pro 2, Premium 3 | ebd. | aktuell |
| Zusatz Bürozugang (inkl. mobil) | +59,90 / +49,90 / +39,92 € | ebd. | aktuell |
| Zusatz Mobilzugang | +24,90 / +19,90 / +15,92 € | ebd. | aktuell |
| Plantafel | Premium inklusive; Business/Pro Zusatzmodul +49,90 / +39,90 / +31,92 € | ebd. | aktuell |
| GAEB, DATANORM, Nachkalkulation, kumulative Abschläge | ab Pro | ebd. | aktuell |
| DATEV-Export | in allen Paketen | ebd.; Rechnungsprogramm-Seite | **neu, fehlt im Entwurf** |
| E-Rechnung | alle Pakete; Format „XRechnungs-Format“ (ZUGFeRD nicht genannt) | https://plancraft.com/de-de/funktionen/handwerk-rechnungsprogramm [CITED] | aktuell |
| Eingangsrechnungs-Scans | Business keine, Pro bis 50/Monat, Premium unbegrenzt | Preisseite | aktuell |
| KI-Empfang | alle Pakete „inkl. 60 Credits pro Monat“; Tarif „Flexibel“ 79,90 €/Monat; „1 Credit = 1 Minute“ | Preisseite | aktuell (Credit-Staffel uneindeutig – nicht zitieren) |
| Testphase | „7 Tage lang kostenlos“, „ohne Kreditkarte und ohne automatische Verlängerung“ | https://plancraft.com/de-de/handwerkersoftware-kleinbetriebe [CITED] | aktuell |
| Nach dem Test | 0-€-Tarif mit eingeschränkten Funktionen; Fertigstellen von Dokumenten nur mit Bezahltarif | Preisseite (FAQ) | aktuell |
| Laufzeit/Kündigung | monatlich bis 1 Tag vor Ende des bezahlten Monats; Jahr bis 1 Tag vor Laufzeitende; „Bis einen Tag vor Mindestvertragslaufzeitende“ | Preisseite (FAQ) | aktuell |
| Zahlungsarten | „Kreditkarte und PayPal“ | Preisseite | neu (optional) |
| Plattformen | Handwerker-App „Egal ob Android oder iOS“; Cloud-Zugriff, Mac/iOS- und Windows-Seiten | Rechnungsprogramm-Seite, Kleinbetriebe-Seite | neu |
| **Zu streichen** | Absatz „Für CraftOS ist ein Telefon-Agent angekündigt …“ inkl. [PRÜFEN]-Vermerk | – | verstößt gegen PROD-04 |

### Craftnote

| Angabe | Wert 22.10.2026 | Quelle | Entwurf |
|---|---|---|---|
| Pakete (pro Nutzer/Monat, jährliche Abrechnung, zzgl. USt.) | Büro Plus 49,90 € („statt 69,90 €“), Büro 29,90 €, Baustelle 14,90 € | https://craftnote.de/preise/ [CITED] | aktuell |
| Mindestvoraussetzung | mindestens ein Büropaket | ebd. | aktuell |
| Laufzeit | ein Jahr, automatische Verlängerung um ein Jahr, Kündigung drei Monate vor Ende | ebd. | **veraltet**: Entwurf stützt sich auf Hilfeartikel (403); Kündigungsfrist fehlt |
| Testphase | 30 Tage, Funktionsumfang Büro Plus, keine Zahlungsmethode, endet automatisch, Daten bleiben | https://craftnote.de/ [CITED]; https://craftnote.de/buero-plus/ | aktuell |
| Angebote/Rechnungen, DATEV-Export, IDS-Connect, Datanorm | nur Büro Plus | Preisseite; Büro-Plus-Seite | DATEV fehlt im Entwurf |
| E-Rechnung | Büro Plus „E-Rechnungsfähig“, Formate nicht genannt | Büro-Plus-Seite | aktuell |
| Zeiterfassung | in allen drei Paketen; **Zeit-Modul** 49,90 €/Monat (Urlaubsanträge, Überstunden, Zeiterfassung ohne Projekt) | Preisseite | **neu, fehlt im Entwurf** |
| Plantafel | angeboten; in keiner Paketliste, kein Preis | Preisseite; Startseite („Engpässe, Terminkonflikte und freie Kapazitäten“) | aktuell |
| Fahrzeug-Modul (GPS) | 24,90 €/Tracker/Monat im 1. Jahr, jährlich | Preisseite | aktuell |
| PDF-Formular-Paket | ab 150,00 €; individuelle Formulare über Partner ab 30,00 €/PDF; Schulungen ab 150,00 € | Preisseite | teils neu |
| Plattformen | iOS ab 14.5, Android ab 8.0, Web-App (Edge, Chrome, Firefox) | Preisseite | **neu** |
| Zahlung | SEPA (nur DE/AT) oder Kreditkarte | Preisseite | neu (optional) |
| GAEB | auf geprüften Seiten nicht genannt | – | nicht verwenden |
| Quelle N2 (Hilfeartikel Kosten/Laufzeit) und N5 (Funktionen nach Paket) | nicht erneut geprüft (N2 lieferte am 20.10. HTTP 403) | – | **entfernen**, durch Preisseite ersetzen |

### HERO

| Angabe | Wert 22.10.2026 | Quelle | Entwurf |
|---|---|---|---|
| Pläne (ab, pro Monat, zzgl. MwSt.) | Select 69 € und 79 €; HERO OS 119 € und 135 €; HERO OS Plus 299 € und 345 €; je inkl. 1 Standard-Lizenz | https://hero-software.de/preise [CITED] | Zahlen aktuell |
| Zuordnung Zahlweise | Umschalter „Monatlich / Jährlich – über 10 % sparen“; im statischen HTML **nicht beschriftet**, welche Zahl zu welcher Zahlweise gehört | ebd. | Entwurf ordnet 69 = jährlich, 79 = monatlich zu – plausibel, aber **menschlich verifizieren** |
| Mögliches Einführungsangebot | Drittquelle nennt 59/109/289 € für die ersten 12 Monate bei Vorauszahlung | europeanpurpose.com, fuer-gruender.de (nicht offiziell) [ASSUMED] | nicht im Entwurf; vor Veröffentlichung im Browser prüfen |
| App-Lizenz | 22 € / 25 € pro Nutzer/Monat | Preisseite | aktuell |
| Weitere Standard-Lizenz | 69 € / 79 € für HERO OS und OS Plus; für Select nicht ausgewiesen | Preisseite | aktuell |
| Select-Zielgruppe | „Für Betriebe mit bis zu 5 Mitarbeitenden“ | Preisseite | aktuell |
| OS Plus | „benötigt zusätzlich einen kostenpflichtigen Implementierungsservice“ | Preisseite | aktuell |
| In allen Plänen | Web und mobil, Android-/iOS-App, Angebote/Rechnungen, Mahnwesen, Personalplanung, Zeiterfassung, Abwesenheiten/Urlaub, digitale Plantafel, Schnittstellen | Preisseite | aktuell |
| HERO OS / OS Plus | Lager, API-Zugang, HERO Voice (60 Min./Monat, danach 0,30 €/Min.), HERO Command, HERO Wallet; OS Plus: Copilot-Automationen | Preisseite | aktuell |
| Laufzeit | AGB 9.2: Grundlaufzeit 12 Monate, soweit in der Bestellung nichts anderes vereinbart; Kündigungsfrist 1 Monat; automatische Verlängerung; 9.3 Preisanpassung bei Verlängerung mit 4 Wochen Vorlauf | https://hero-software.de/rechtliches/agb [CITED] | aktuell; 9.3 neu |
| Netto | AGB 3.5 „zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer“ | AGB | aktuell |
| E-Rechnung | „sowohl mit ZUGFeRD als auch mit XRechnungen kompatibel“; Erstellen und Versenden; ZUGFeRD hochladen; **XRechnung-Import „zukünftig“** | https://hero-software.de/features/rechnungsprogramm-handwerker/e-rechnung [CITED] | **ungenau**: Entwurf sagt „Empfangen“ ohne Einschränkung |
| Testphase | 14 Tage kostenfrei | Preisseite; E-Rechnung-Seite | aktuell; Zusatz „ohne Zahlungs- oder Kreditkartendaten, keine Kündigung notwendig“ (Signup-Seite) heute nicht erneut geprüft |
| DATEV, GAEB | auf geprüften offiziellen Seiten nicht gefunden | – | nicht verwenden |

### ToolTime

| Angabe | Wert 22.10.2026 | Quelle | Entwurf |
|---|---|---|---|
| Pakete | Solo (1 MA) 89 € monatlich / 69 € Jahresabo 1. Jahr / ab Jahr 2 79 €; Team (bis 5) 169 / 145 / 149 €; Max (bis 10) 329 / 279 / 299 € | https://www.tooltime.app/preise [CITED] | aktuell |
| Fußnote | „Die ausgewiesenen Preise gelten ausschließlich für das erste Vertragsjahr des jährlichen Abonnements.“ | ebd. | aktuell |
| Preis je Lizenz | Team 34 € / 29 €; Max 33 € / 28 € | ebd. | Max neu |
| Weitere Mitarbeitende | Tabelle (29 €/35 €) und FAQ („29,90 €“) widersprechen sich | ebd. | **nicht verwenden** |
| Netto | Preisseite sagt nichts; Nutzungsbedingungen 4.1 „zzgl. gesetzlicher MwSt.“ | https://www.tooltime.app/rechtliches/nutzungsbedingungen [CITED] | aktuell |
| Laufzeit | „Mindestlaufzeit von 12 Monaten“ (alle Pakete); NB 9.1: automatische Verlängerung um die Mindestlaufzeit, Kündigungsfrist 30 Tage zum Laufzeitende, Textform | Preisseite; NB 9.1/9.4 | Frist neu |
| Testphase | „7-tägige Testversion“, „komplett unverbindlich“; Startseite „Keine Zahlungsinfos notwendig“ | Preisseite; https://www.tooltime.app/ [CITED] | aktuell |
| E-Rechnung | Startseite: „E-Rechnung (XRechnung/ZUGFeRD) inklusive“ | Startseite | **veraltet**: Entwurf sagt „Formate nicht genannt“ |
| DATEV | Erweiterung „DATEV Rechnungsdatenservice 1.0“ 19 €/Monat | Preisseite | aktuell |
| GAEB | „GAEB-Import & Export“ in der Funktionsliste (ohne Paketzuordnung) | Preisseite | **neu** |
| Datanorm & IDS, Mobile App | in allen drei Paketen | Preisseite | neu |
| ToolTime Assistant / Pay / Schulung / Lexware | 59 €/Monat inkl. 100 Min.; ab 1 % Transaktionsgebühr; 249 € einmalig (Solo/Team, Max inkl.); Lexware Office in Team/Max, Solo auf Anfrage | Preisseite | aktuell |
| Plantafel | eigene Produktseite; Drag & Drop, Tag/Woche, Abwesenheitswarnung, Sync zur App; offline Einsatzpläne in der App; keine Paketzuordnung | https://www.tooltime.app/digitale-plantafel [CITED] | aktuell |
| Plattformen | App „für iOS & Android“; „Desktop-Version und Smartphone-App“ | Startseite | neu |

### CraftOS-Seite (nur Repo-Quellen)

| Angabe | Wert | Quelle im Repo |
|---|---|---|
| Voll-Lizenz | 29,95 € netto/Monat oder 299,50 €/Jahr; Web-App + Mobile-App für dieselbe Person; Plantafel ohne Modulgebühr | `lib/site.ts` `tarife` [VERIFIED: Code] |
| App-Lizenz | 9,95 €/Monat oder 99,50 €/Jahr; Zeiten, Einsätze, Aufmaß, Fotos, Baudoku, Urlaub | `lib/site.ts` |
| Testphase, Zahlung | 10 Tage ohne Zahlungsdaten; SEPA oder Kreditkarte; Jahresabo rund 17 % günstiger | `lib/site.ts` `zahlung`, `site.trialDays` |
| Prüfdatum | `site.checkedAt = "2026-10-20"`; Snapshot `v4.0.0-test.239` (535206b4) | `lib/site.ts`, `docs/product-pricing-snapshot.json` – Entwürfe nennen veraltet „09.09.2026“ |
| E-Rechnung | XRechnung und ZUGFeRD; elektronische Eingangsrechnungen einlesen | `lib/funktionen.ts` (`e-rechnung`) |
| DATEV | DATEV-Export samt Belegbezug; keine ELSTER-Einreichung | `lib/funktionen.ts` (`buchhaltung`) |
| GAEB/DATANORM | GAEB X83 Import, X84 Export, DATANORM; GAEB 90/2000 nicht unterstützt | `lib/funktionen.ts` (`gaeb`) |
| Zeiterfassung | Timer mit Standortpunkten bei Start/Stopp, keine Bewegungsverläufe | `lib/funktionen.ts` (`zeiterfassung`) |
| Offline | „Keine vollständige Offline-Zusage“ | `lib/product-register.ts` (`mobileOffline`) |
| Plattformen | Web, iOS, Android; 21 App-Sprachen | `lib/schema.ts` (`operatingSystem`), `lib/product-register.ts` (`mobileLocales`) |
| Nicht live (nirgends erwähnen) | Telefon-Agent, MCP-Server, KI-Agent, Portal-Onlinezahlung u. a. | `lib/product-register.ts` (`notLive`) |
| Laufzeit | Monatsabo monatlich, Jahresabo zum Laufzeitende kündbar | **nur** `app/agb/page.tsx` § 5 – nicht in den drei erlaubten Quelldateien; Empfehlung: Konstante `vertrag` in `lib/site.ts` mit Kommentar „Quelle AGB § 5“ (Rechtstext bleibt unverändert) |

**Kriterien, die für alle vier Vergleiche belegt sind (Empfehlung für ComparisonTable):** Preis Bürozugang, Preis mobile Person, Mindestlaufzeit, Testphase, Mobile-App (iOS/Android), Plantafel enthalten, E-Rechnung, Zeiterfassung mobil. DATEV ist nur bei plancraft, Craftnote und ToolTime belegt, GAEB nur bei plancraft und ToolTime – diese Zeilen nur auf den jeweiligen Seiten.

## Rechtsrahmen: vergleichende Werbung (UWG § 6, § 5, Markenrecht)

- **Gesetzestext § 6 UWG** [VERIFIED: gesetze-im-internet.de/uwg_2004/__6.html]: Vergleichende Werbung ist jede Werbung, die einen Mitbewerber oder dessen Angebote erkennbar macht (Abs. 1). Unlauter ist sie (Abs. 2), wenn der Vergleich (1) nicht denselben Bedarf betrifft, (2) nicht objektiv auf wesentliche, relevante, nachprüfbare und typische Eigenschaften oder den Preis bezogen ist, (3) Verwechslungsgefahr schafft, (4) den Ruf eines Kennzeichens unlauter ausnutzt oder beeinträchtigt, (5) herabsetzt oder verunglimpft, (6) als Imitation darstellt.
- **Irreführung gilt zusätzlich** (§ 5 UWG): Angaben in vergleichender Werbung unterliegen dem Irreführungsverbot; ein Vergleich darf sich auf einzelne Gesichtspunkte beschränken, ist aber irreführend, wenn er den Eindruck erweckt, im Wesentlichen alle relevanten Eigenschaften seien berücksichtigt (BGH I ZR 141/07) [CITED: rewis.io, omsels.info]. Vergleichspreise brauchen eine valide, tatsächlich verlangte Tatsachengrundlage [CITED: omsels.info, it-recht-kanzlei.de].
- **Markennennung**: Die Nennung der Wettbewerbermarke ist zulässig, wenn die Werbung § 6 UWG einhält; der Markeninhaber kann sie dann nicht verbieten (BGH I ZR 167/13; BGH I ZR 169/04) [CITED: rewis.io, omsels.info]. Logos sind nicht nötig und werden laut D-02 nicht verwendet.
- **IHK-Merkblätter** fassen zusammen: zulässig bei Vergleichbarkeit, Objektivität und fehlender Irreführung [CITED: frankfurt-main.ihk.de, ihk.de/konstanz].

**Sichere Formulierungsmuster (für Texte und Test-Wortlisten):**

| Muster | Beispiel | Warum |
|---|---|---|
| Quelle + Stand an jeder Zahl | „HERO Select: ab 69 € netto pro Monat (Stand 22.10.2026, hero-software.de/preise)“ | Nachprüfbarkeit (Nr. 2), Aktualität |
| Wortlaut des Anbieters zitieren | Craftnote: „E-Rechnungsfähig“; HERO: XRechnung-Import „zukünftig“ | Keine eigene Interpretation |
| „ab“-Preise und Aktionspreise kennzeichnen | „Aktionspreis statt 69,90 € laut Craftnote“; „Preis im ersten Vertragsjahr“ | Irreführung vermeiden |
| Rechenbeispiele mit offengelegten Annahmen | „1 Bürozugang + 4 mobile Personen, Jahresabrechnung; nicht enthalten: …; Pakete unterscheiden sich im Funktionsumfang“ | BGH I ZR 141/07 (Vollständigkeitseindruck) |
| Neutral „nicht genannt“ statt „hat nicht“ | „Auf den geprüften Seiten nicht genannt“ – besser: Zeile weglassen | Nur belegte Kriterien (D-01) |
| Stärken des Wettbewerbers nennen | Abschnitt „Wann passt <Name> besser?“ | Fairness (D-02), keine Herabsetzung |
| Hinweisblock | „Angaben ohne Gewähr, Stand <Datum>, Quellen siehe unten. Alle Beträge netto. Die Nennung von <Marke> dient der Zuordnung; es besteht keine Kooperation.“ | D-02 |

**Zu vermeiden (Wortliste für einen Test):** „besser als“, „billiger als“ ohne Rechenweg, „die beste“, „Testsieger“, „veraltet“, „teuer“, „versteckte Kosten“, „Abzocke“, „im Gegensatz zu … fehlt“. Superlative über CraftOS selbst („die beste Handwerkersoftware“) sind unbelegt und auf der Seite „kleine Betriebe“ besonders heikel.

## SE-Ranking-Daten (Abruf 22.10.2026)

Rohdaten (ohne Header/Schlüssel), danach `node craftos/scripts/check-no-secrets.mjs craftos/docs/seo` → „OK: Schlüssel in keiner Datei“:

- `craftos/docs/seo/data/2026-10-22-keyword-metrics-phase08.json` (DATA_getKeywordsMetrics, 30 Keywords, DB de)
- `craftos/docs/seo/data/2026-10-22-keyword-questions-phase08.json` (DATA_getKeywordQuestions, 3 Seeds)
- `craftos/docs/seo/data/2026-10-22-serp-phase08.json` (DATA_getSerpResults, Google DE, desktop, standard, 3 Keywords)
- `craftos/docs/seo/data/2026-10-22-ai-tracker-prompts.json` (Projekt 13094375: Engines, Prompts, Rankings, Antworten)

**Unit-Stand (DATA_getSubscription):** vorher **34.811**, nachher **34.671** Units (Verbrauch 140, nur SERP; Keyword-Metriken, Fragen und Projekt-Tools ohne sichtbaren Abzug). Ablauf 03.11.2026 17:22:59. **Achtung:** D-13 nennt „~65.000 Units“ – tatsächlich verbleiben rund 34.700. 30 MCP-Aufrufe für den Tracker (0 Units).

### Keyword-Metriken (DE)

| Keyword | Volumen | KD | Bemerkung |
|---|---:|---:|---|
| plancraft erfahrungen | 210 | 8 | „Erfahrungen“ = Bewertungsabsicht; CraftOS kann keine fremden Erfahrungen liefern → nicht als Ziel |
| tooltime preise | 140 | 15 | Kandidat für H2 „Was kostet ToolTime?“ auf `/vergleich/tooltime-alternative` |
| hero software preise | 140 | 17 | dito HERO |
| craftnote preise | 110 | 12 | dito Craftnote |
| handwerkersoftware vergleich | 90 | 22 | bereits Hauptkeyword `/vergleich` |
| beste handwerkersoftware | 90 | 24 | bereits Hauptkeyword `/blog/handwerkersoftware-auswaehlen` |
| tooltime erfahrungen / hero software erfahrungen | 70 / 70 | 15 / 8 | nicht als Ziel |
| software für kleine handwerksbetriebe | 50 | 36 | bereits Hauptkeyword `/blog/handwerkersoftware-einzelunternehmen` |
| handwerkersoftware preise | 50 | 21 | Hauptkeyword `/preise` |
| was kostet plancraft (Fragen-Endpunkt) | 50 | 19 | H2 auf plancraft-Seite |
| plancraft alternative / craftnote alternative | 30 / 30 | 11 / 6 | Hauptkeywords laut Map |
| hero software alternative / hero alternative | 10 / 10 | 15 / 22 | Map: „hero software alternative“ |
| handwerkersoftware günstig / günstige handwerkersoftware | 20 / 20 | 25 / 39 | Nebenbegriffe `/preise` |
| keine Daten | – | – | tooltime alternative, handwerkersoftware kosten, was kostet eine handwerkersoftware, beste handwerkersoftware kleine betriebe, handwerkersoftware (für) kleine betriebe, alternative zu plancraft, plancraft preise, craftos, craftos software |

**Fragen-Endpunkt:** „handwerkersoftware“ und „hero software“ liefern 0 Fragen, „plancraft“ genau eine („was kostet plancraft“). PAA-Inhalte liefert der Standard-SERP nicht (SERP-Features nennen `people_also_ask`, Inhalt erst mit `result_type: advanced`, 10 Credits je Abfrage). FAQ-Fragen sollten daher aus den AI-Tracker-Antworten und den Preis-Suchbegriffen abgeleitet werden, nicht aus PAA.

### SERP Top 10 (Google DE, desktop, 22.10.2026)

| Keyword | Wer rankt | Inhaltstyp |
|---|---|---|
| plancraft alternative | capterra.com.de, craftboxx.de, hero-software.de/alternativen/plancraft, omr.com, plancraft.com/de-de/hero-vs-plancraft, krafthub.ai, krafteq.de, getapp.de, angebots-meister.de | Bewertungsportal-Listen und 1:1-Vergleichsseiten von Herstellern („X Alternative: Y im Vergleich“) – genau das Format von SEO-03 |
| handwerkersoftware preise | handwerk-digitalisieren.de, hero-software.de/preise, fuer-gruender.de, shop.weka.de, bosch-officeon.com/preise, qonto.com, shop.lexware.de, systemhaus.com, tooltime.app/preise, softwareguide24.de | Herstellerpreisseiten und Vergleichsartikel – stützt die answer-first-Preisseite |
| beste handwerkersoftware | handwerk-digitalisieren.de, fuer-gruender.de, handwerkersoftware-test.de, bosch-officeon.com (Blog), hero-software.de, systemhaus.com, handwerksblatt.de, qonto.com | Redaktionelle Test-/Listenartikel; Herstellerseite nur HERO-Startseite – eine Herstellerseite „beste … für kleine Betriebe“ wird eher über KI-Zitate als über Google-Ranking wirken |

### AI Result Tracker (Projekt 13094375): 20 Einträge, 18 Prompttexte

Engines: ChatGPT (16 Prompts), Perplexity (2), Google AI Overview (2), Gemini (0), AI Mode (0). Perplexity-Antworten: HTTP 404 (keine Daten). CONTEXT spricht von „16 Prompts“ – das sind die ChatGPT-Prompts; das Mapping sollte alle 20 Einträge (inkl. Engine) führen.

Antwortanalyse ChatGPT (22.10.2026): CraftOS wird nur bei **„günstige Handwerkersoftware mit App für Mitarbeiter“** genannt (Position 3, craftos.eu zitiert) und bei **„Was ist CraftOS?“** – dort vermischt mit CraftOS-PC/ComputerCraft (craftos.net, craftos-pc.cc, ftb.fandom.com). Meistzitierte Quellen: Herstellerseiten (hawepro.de, das-programm.io, plancraft.com, tooltime.app, hero-software.de), Vergleichsportale (fuer-gruender.de, handwerkersoftware-check.de, betriebssoftware-kompass.de, handwerker-kosmos.de), bei AIO zusätzlich youtube.com (4×). Für Kostenfragen werden hawepro.de, hero-software.de/preise und tooltime.app/preise zitiert – Seiten mit klarer Preistabelle.

## Sitewide-Metadaten-Ist (131 indexierte Seiten, Build 22.10.2026 13:55)

Methode: Node-Skript über `craftos/.next/server/app/**/*.html` (138 HTML-Dateien, davon 7 noindex) – kein Server, kein neuer Build. Skript und Ergebnis: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/p8/meta-audit.mjs` und `…/p8/meta-audit.json`.

| Gruppe | Seiten | Titel ≤ 60 | Desc 120–155 | H1 = 1 | BreadcrumbList-Schema | Sichtbare Breadcrumbs | Eigenes OG | Map-Zielwert vorhanden | Titel = Zielwert |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 1 | 1 | 1 | 1 | 0 | – | 0 | 1 | 1 |
| `/funktionen` + 22 Detailseiten | 23 | 23 | 23 | 23 | 23 | 0 | 0 | 23 | 23 |
| `/app` | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 1 |
| `/preise`, `/vergleich`, `/gobd`, `/craft-ai`, `/fakten-ueber-craftos` | 5 | 3 | 5 | 5 | 0 (`/vergleich` hat ein `@graph`-JSON-LD, siehe Pitfall 10) | 0 | 0 | 4 | 0 |
| `/gewerke` + 12 Gewerke | 13 | 12 | 12 | 13 | 12 | 0 | 0 | 13 | 0 |
| `/blog` + 6 Kategorien + 24 Artikel | 31 | 7 | 18 | 31 | 31 | 0 | 24 (Artikel) | 26 | 0 |
| `/hilfe` + 9 Kategorien + 40 Artikel | 50 | 38 | 3 | 50 | 50 | 0 | 40 (Artikel) | 42 | 0 |
| `/rechner` + 2 | 3 | 1 | 3 | 3 | 2 | **2** | 0 (**kein og:image**) | 3 | 0 |
| `/support`, `/agb`, `/datenschutz`, `/impressum` | 4 | 4 | 0 | 4 | 0 | 0 | 0 | 0 | – |

Kernzahlen: Titel > 60: **41** (24 Ratgeber, 13 Hilfe, `/craft-ai` 63, `/fakten-ueber-craftos` 69, `/gewerke/allrounder`, 2 Rechner); Description < 120: **64** (fast alle Hilfeartikel, alle 15 Kategorieseiten, Rechtsseiten, `/support`, `/hilfe`); Description > 155: 1 (`/gewerke/elektriker`, 177); Hauptkeyword (normalisiert) fehlt im Titel: **75** von 113 Seiten mit Keyword; Map-Zielwert vorhanden, aber nicht angewandt: **88**; Seiten ohne Hauptkeyword: **18** (`/agb`, `/datenschutz`, `/impressum`, `/support`, `/hilfe`, `/fakten-ueber-craftos`, 2 Kategorien, 10 Artikel – Liste in `meta-audit.json`). Doppelte Titel: **0**; doppelte Descriptions: **0**; doppelter H1-Text: `/blog/kategorie/rechnungen` und `/hilfe/kategorie/rechnungen` („Rechnungen“) – entspricht dem SE-Ranking-Befund „2 × doppelter H1“. H1 > 60 Zeichen: 24 (Ratgeber-H1 = Frontmatter-Titel).

**Woher die Werte kommen (wo zu ändern ist):**

| Seitentyp | Titel/Description | H1 |
|---|---|---|
| Kernseiten | `export const metadata = pageMetadata(…)` je `app/*/page.tsx` | im JSX (`PageHero`) |
| Gewerke | `lib/gewerke.ts` Felder `seoTitle`, `seoDescription` | `heroTitle` |
| Blog/Hilfe | Frontmatter `title`/`description` in `content/{blog,hilfe}/*.md` (`lib/content.ts`) | derselbe `title` |
| Kategorien | `app/{blog,hilfe}/kategorie/[category]/page.tsx` + `ContentIndex` | Kategoriename |
| Rechner | `export const metadata: Metadata = {…}` ohne `pageMetadata` (daher ohne og:image) | Rechner-H1 |

**Empfehlung:** Ein Helfer `metaFor(path)` liest `target.title`/`target.description` aus `keyword-map.json`; Seiten ohne Hauptkeyword erhalten Zielwerte in der Map (Feld `target` auch bei `primary: null` erlauben, `reason` bleibt). Für Blog/Hilfe ein optionales Frontmatter-Feld `seoTitle`/`seoDescription` vermeiden – die Map ist die Quelle. H1 von Ratgebern/Hilfe bleibt in Phase 8 der Artikeltitel, wenn der Titel nicht gekürzt werden muss; Ausnahmen (H1 > 60, doppelte H1) werden über die Map-H1 gelöst (siehe Open Question 2).

## Breadcrumbs und OG-Grafiken

**Breadcrumb-Ist:** BreadcrumbList-JSON-LD kommt aus `breadcrumbSchema()` in `FunktionsDetail`, `ArticlePage`, `ContentIndex`, `app/app`, `app/funktionen`, `app/gewerke/[slug]`; Rechner und `/vergleich` bauen es inline. Sichtbar sind Breadcrumbs nur in `components/calculators/CalculatorPage.tsx` (`<nav aria-label="Brotkrümelnavigation">`). **Konflikt:** `docs/DESIGN-V2.md` (Z. 267–272) und `06-UI-SPEC.md` (Z. 61) haben sichtbare Breadcrumbs ausdrücklich verworfen. D-07 hebt das auf; die Pläne müssen DESIGN-V2.md und einen Phase-8-UI-Vertrag (Breadcrumb-Baustein, Position unter dem Header, Stil) anpassen, sonst widersprechen sich Designvertrag und Code.

**OG-Ist:** Statisch erzeugt ist nur `/opengraph-image` (78 KB PNG, `.next/server/app/opengraph-image.body`). `app/blog/[slug]/opengraph-image.tsx` und `app/hilfe/[slug]/opengraph-image.tsx` sind **nicht** vorgerendert (fehlen im `prerender-manifest.json`), sie werden auf Vercel bei Abruf erzeugt. Ursache: Ein `opengraph-image` in einem dynamischen Segment erbt `generateStaticParams` der `page.tsx` nicht; der Metadata-Route-Loader re-exportiert aber benannte Exporte der Bilddatei (`createReExportsCode` in `next/dist/build/webpack/loaders/next-metadata-route-loader.js`, gefiltert werden nur `default`, `generateSitemaps`, `dynamicParams`) [VERIFIED: Next-16.3.4-Quelltext]. Also: `export { generateStaticParams } from "../page"` bzw. eigene Funktion in jeder dynamischen `opengraph-image.tsx`.

**Next-16-Regeln** [CITED: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md]: generierte Bilder sind standardmäßig statisch (Build-Zeit), solange keine Request-Time-APIs genutzt werden; `params` ist seit v16 ein Promise; Grenze 8 MB (Build bricht darüber ab); Schriften per `readFile(join(process.cwd(), …))` und `fonts: [...]` in `ImageResponse`. [CITED: …/04-functions/generate-metadata.md Z. 114]: Datei-basierte Metadaten haben Vorrang vor `metadata`/`generateMetadata` – das `og:image` einer Segmentdatei schlägt `pageMetadata(...).openGraph.images`. `twitter:image` wird dagegen aus `pageMetadata` übernommen: `/preise` zeigt heute `twitter:image = /opengraph-image`, Blogartikel zeigen ihr eigenes Bild, weil `generateMetadata` dort den Bildpfad übergibt.

**Segmente, die eine eigene `opengraph-image.tsx` brauchen (ca. 22 Dateien für ~140 Bilder):** Root (vorhanden), `funktionen`, `funktionen/[slug]`, `app`, `preise`, `vergleich`, `vergleich/<4 Alternativen + kleine Betriebe>` (oder `vergleich/[slug]` falls dynamisch), `gewerke`, `gewerke/[slug]`, `craft-ai`, `gobd`, `fakten-ueber-craftos`, `support`, `blog`, `blog/[slug]` (vorhanden), `blog/kategorie/[category]`, `hilfe`, `hilfe/[slug]` (vorhanden), `hilfe/kategorie/[category]`, `rechner`, `rechner/stundensatz`, `rechner/angebotskalkulation`, `agb`, `datenschutz`, `impressum` (Rechtsseiten: Entscheidung, ob individuelle Grafik nötig – SEO-05 sagt „alle Seiten“).

**Build-Zeit und Größe:** Root-Bild 78 KB; die Artikelvorlage (`lib/og.tsx`, ohne Raster/Verlauf) wird kleiner sein. Bei ~140 Bildern à 40–90 KB entstehen 6–12 MB Build-Ausgabe, jedes Bild deutlich unter 300 KB. Satori+resvg brauchen je Bild grob 50–300 ms → 10–40 s zusätzliche Build-Zeit (Phase-7-Build auf Vercel: 26 s) [ASSUMED – in Welle 0 messen]. Prüfung: `prerender-manifest.json` muss je Seite einen `…/opengraph-image`-Eintrag haben; Dateigröße aus `.next/server/app/**/opengraph-image*.body`.

**Schriften:** `public/fonts/` enthält nur WOFF2 (Clash Display 500/600/700, General Sans 400/500/600). Satori unterstützt TTF, OTF und WOFF, **nicht WOFF2** [CITED: github.com/vercel/satori README, Abschnitt Fonts – ASSUMED aus Trainingswissen, nicht in dieser Sitzung abgerufen]. Ohne eigene Schrift fällt `ImageResponse` auf das gebündelte `Geist-Regular.ttf` zurück (nur Gewicht 400; `fontWeight: 800` im Root-Bild wird nicht fett) [VERIFIED: node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf ist die einzige TTF]. Optionen: (a) TTF/WOFF-Dateien der Markenschriften aus offizieller Quelle unter `assets/og/` ablegen (nicht `public/`), Lizenz prüfen; (b) Geist Regular akzeptieren, Hierarchie über Größe/Farbe. Empfehlung: (a) mit `checkpoint:human-verify` für Herkunft/Lizenz, Fallback (b).

## Antwort zuerst – Ist auf zentralen Seiten

Gemessen im Build-HTML (Fragen = H2/H3 mit „?“ bzw. `<summary>` in `<details>`; Antwort = erstes `<p>` danach):

| Seite | Frage-Überschriften | Antworten > 300 | Befund |
|---|---|---|---|
| `/` | 5 FAQ (H3 in summary) | 0 (150–238) | erfüllt |
| `/preise` | 6 FAQ (alte `components/ui/Faq`, `<span>` statt H3) | 1 („Welche Funktionen kosten zusätzlich?“ 402) | Antwortsatz am Seitenanfang fehlt; FAQ auf `FaqList` umstellen |
| `/vergleich` | 1 H2 („Was passt zu Ihrer Art zu arbeiten?“, 196) | 0 | keine FAQ, kein Antwortsatz, H1 „Eine Entscheidung, die zum Betrieb passt.“ ohne Keyword |
| `/fakten-ueber-craftos` | 0 | – | keine Fragen, keine FAQ; Prompt „Was ist CraftOS?“ unbeantwortet |
| `/craft-ai` | 0 | – | keine FAQ |
| `/gobd` | 0 sichtbar | – | **FAQPage-JSON-LD mit einer Frage, die nicht sichtbar ist** (Verstoß gegen die Richtlinie „FAQ-Inhalt muss sichtbar sein“) |
| `/app` | 5 FAQ | 0 (161–272) | erfüllt |
| `/funktionen` | 0 | – | keine Frage-Überschriften – erfüllt per Definition |
| 22 Detailseiten | 86 FAQ | 0 | erfüllt |

**Wichtig:** `FaqList` begrenzt nur den **ersten Satz** auf 300 und die Gesamtantwort auf 600 Zeichen (`TEXT_BUDGET.faq`). D-09 verlangt „Antwort ≤ 300 Zeichen direkt darunter“. Empfehlung: Für zentrale Seiten eine strengere Prüfung im Post-Build-Audit (erstes Antwort-`<p>` ≤ 300) statt Budgetänderung am Baustein; optional `FaqList`-Prop `answerMax={300}`.

## AI-Tracker-Prompts → Zielseiten (Vorschlag für `docs/seo/ai-prompts-targets.json`)

| # | Engine | Prompt | Ziel | Status |
|---|---|---|---|---|
| 1 | ChatGPT, Perplexity | Welche Handwerkersoftware ist die beste für kleine Betriebe? | **neu** `/vergleich/handwerkersoftware-kleine-betriebe#antwort` | Phase 8 |
| 2 | ChatGPT | beste Handwerkersoftware 2026 | `/vergleich#antwort` (Hub mit Kriterien und Links zu allen Vergleichen) | Phase 8 |
| 3 | ChatGPT | Handwerkersoftware Vergleich | `/vergleich#antwort` | Phase 8 |
| 4 | ChatGPT | Alternative zu Plancraft | `/vergleich/plancraft-alternative#antwort` | Phase 8 |
| 5 | ChatGPT | günstige Handwerkersoftware mit App für Mitarbeiter | `/preise#app-lizenz` (FAQ „Was kostet die App-Lizenz für Mitarbeitende?“), Zweitziel `/app` | Phase 8 |
| 6 | ChatGPT | Was ist CraftOS? | `/fakten-ueber-craftos#was-ist-craftos` (Abgrenzung zu CraftOS-PC/ComputerCraft; vgl. `disambiguatingDescription` in `organizationSchema`) | Phase 8 |
| 7 | ChatGPT | Welche App eignet sich für die Zeiterfassung im Handwerk? | `/funktionen/zeiterfassung#faq` | bestehend (Phase 7), Antwort-zuerst prüfen |
| 8 | ChatGPT | Rechnungssoftware für Handwerker mit E-Rechnung (XRechnung, ZUGFeRD) | `/funktionen/e-rechnung#faq` | bestehend |
| 9 | ChatGPT, Perplexity | Alternative zu HERO Software | `/vergleich/hero-alternative#antwort` | Phase 8 |
| 10 | ChatGPT | Alternative zu ToolTime | `/vergleich/tooltime-alternative#antwort` | Phase 8 |
| 11 | ChatGPT | Welche Aufmaß-App ist gut für Handwerker? | `/funktionen/aufmass#faq` | bestehend |
| 12 | ChatGPT | Bautagebuch App für Handwerksbetriebe | `/funktionen/baudokumentation#faq` | bestehend |
| 13 | ChatGPT | Was kostet eine Handwerkersoftware pro Monat? | `/preise#was-kostet-handwerkersoftware` (Frage-H2 mit Marktspanne aus den vier Wettbewerber-Modulen + CraftOS, mit Stand) | Phase 8 |
| 14 | ChatGPT | Handwerkersoftware mit Plantafel und Einsatzplanung | `/funktionen/plantafel#faq` | bestehend |
| 15 | ChatGPT | Software für Elektrobetriebe | `/gewerke/elektriker` | **Phase 9** (Gewerke-Umbau); in Phase 8 nur Existenz prüfen |
| 16 | ChatGPT | Software für Malerbetriebe | `/gewerke/maler` | **Phase 9** |
| 17 | AI Overview | handwerkersoftware | `/` (Startseite-FAQ) | bestehend |
| 18 | AI Overview | handwerker app | `/app` | bestehend |
| + | (D-11) | KD-<20-Lücken (Leistungszeitraum, Regiebericht, Bedenkenanzeige, Mängelanzeige, Reverse Charge, Materialliste, GAEB-Formate, Bauablaufplan, Arbeitszeitnachweis) | geplante Pfade laut `keyword-map.json` | **Phase 9** |

**Pfad und Keyword der neuen Seite „kleine Betriebe“:** Die Keyword-Map hat keinen Pfad dafür. „beste handwerkersoftware“ (90/24) ist Hauptkeyword von `/blog/handwerkersoftware-auswaehlen`, „software für kleine handwerksbetriebe“ (50/36) von `/blog/handwerkersoftware-einzelunternehmen`; „beste handwerkersoftware für kleine betriebe“ steht in `export--candidates-1.json` mit `is_data_found: false`. Empfehlung: Pfad `/vergleich/handwerkersoftware-kleine-betriebe` (D-10-Fallback), Status `geplant`/Phase 8, `primary: null` mit `reason` „…ohne Daten (export--candidates-1.json)“ und `pageCandidates` = genau dieser Begriff – das erfüllt den bestehenden Test „primary null nur für Pfade ohne Daten“ ohne Kannibalisierung. Beide Ratgeber verlinken auf die neue Seite.

## v2-Umbau: Ist-Analyse und hart kodierte Tests

| Seite | Ist (Zeilen) | Alte Bausteine | Map-Ziel (Titel / H1) | Hart kodierte Abhängigkeiten |
|---|---|---|---|---|
| `/preise` | 158 | `PageHero`, `components/preise/PricingTable`, `components/ui/Faq`, `TrialCta` | „Handwerkersoftware Preise und Lizenzen \| CraftOS“ / „Preise der Handwerkersoftware CraftOS“ (heute „Ihr Betrieb wächst. Ihre Software wächst mit.“) | `pricing-parity.test.ts`: Datei `app/preise/page.tsx` muss `Craft AI und KI-Belegscans ({creditUmrechnung})`, `einmalig ${startCredits} Credits (${creditUmrechnung})` und `faqSchema(faqs)` enthalten; „Alle Preise netto“ + „Umsatzsteuer“ in `PricingTable.tsx`+`page.tsx`; Literal-Verbot für Preise in `app/preise/page.tsx`, `PricingTable.tsx`, `app/fakten-ueber-craftos/page.tsx`; `live-check.mjs` „/preise nennt Extra-Speicher und Start-Credits“; E2E `browser-functional.pw.cjs:156`, `design-v2.pw.cjs` BUDGET_ROUTES |
| `/vergleich` | 609 + 9,7 KB CSS | `PageHero`, eigenes CSS-Modul, `ProviderLogo` (Craftnote-PNG, plancraft-SVG), `lib/comparison.ts` | „Handwerkersoftware-Vergleich mit Quellen \| CraftOS“ / „Handwerkersoftware im Vergleich: CraftOS, Craftnote und plancraft“ | `announcements.test.ts` erwartet `featureComparisons`-Zeile „KI-Telefonempfang“ mit CraftOS „Nein“; `llms.test.ts` erwartet Link `/vergleich`; `media-budget` mit Ausnahme `craftnote.png`; `live-check` „/vergleich ohne Ankündigung“; Prüfdatum `comparisonCheckedAt = "2026-09-09"` (veraltet) |
| `/fakten-ueber-craftos` | 131 | `PageHero`, Listen | keine Map-Zielwerte (primary null) | Literal-Verbot (pricing-parity); `live-check` ohne Ankündigung |
| `/craft-ai` | 90 | `PageHero`, `FeatureSnippet variant="ki"`, `TrialCta` | „KI im Handwerk: Craft AI für Ihre Betriebsdaten \| CraftOS“ | E2E `function-illustrations.pw.cjs` prüft `['ki', '/craft-ai']`; `home-navigation.pw.cjs:466` Linkziel |
| `/gobd` | 189 | `PageHero`, `FeatureSnippet variant="rechnung"`, `TrialCta`, unsichtbares FAQ-Schema | „GoBD-konforme Software fürs Handwerk \| CraftOS“ | `home-navigation.pw.cjs:466`; Quellen-Links (AO-Handbuch, BMF 14.07.2025) erhalten |

Bausteine für den Umbau: `SectionHeader` (Titel ≤ 60, Lead ≤ 140), `KeyFacts` (3–4, Wert ≤ 10, Label ≤ 40), `ComparisonTable` (≤ 4 Wertspalten, ≤ 12 Zeilen, Zelle ≤ 24, Pflicht-`note`), `FaqList` (3–8, Frage ≤ 90, mit `headingLevel={3}`), `CtaBand` (Titel ≤ 40, Text ≤ 80), `BentoGrid`, `StepFlow` (3–6). Vorlagen: `FunktionsDetail.tsx` (Abschnitte mit `id`, Schema-Trio BreadcrumbList/FAQPage/WebPage) und `app/app/page.tsx`.

## Architecture Patterns

### System Architecture Diagram

```
Offizielle Wettbewerberseiten ──(manuelle Recherche, Datum)──▶ lib/wettbewerber/<name>.ts ─┐
SE Ranking (MCP, lokal) ──▶ docs/seo/data/*.json ──▶ docs/seo/keyword-map.json ───────────┤
Produkt-Release (origin/release) ──▶ lib/site.ts, product-register.ts, funktionen.ts ────┤
                                                                                         ▼
                                       Seiten (app/**/page.tsx, Server Components, SSG)
                                         │  metaFor(path) ─▶ <title>, description, canonical
                                         │  crumbs(path)  ─▶ <Breadcrumbs> + BreadcrumbList
                                         │  Antwortblock  ─▶ <p data-answer> ≤ 300
                                         │  FaqList       ─▶ <details> + FAQPage
                                         ▼
                 opengraph-image.tsx je Segment (+ generateStaticParams) ─▶ PNG 1200×630
                                         ▼
                              next build ─▶ .next/server/app/**/*.html + *.body
                                         │
          ┌──────────────────────────────┼─────────────────────────────┐
          ▼                              ▼                             ▼
 scripts/seo-audit.mjs (lokal)   Vitest (Daten, Mapping)     next start :3100 → E2E, route-audit, live-check
          │                                                            │
          └──────────── grün ──▶ ship-gate ──▶ git push ──▶ Vercel READY ──▶ live-check craftos.eu
                                                                        ──▶ IndexNow ──▶ se-ranking-sync --check, seo-report
```

### Recommended Project Structure

```
craftos/
├── lib/
│   ├── wettbewerber/           # NEU: ein Modul je Wettbewerber + types.ts + index.ts
│   │   ├── types.ts            # Fakt { wert, quelle: { url, label }, abgerufenAm }
│   │   ├── plancraft.ts | craftnote.ts | hero.ts | tooltime.ts
│   ├── breadcrumbs.ts          # NEU: Pfad → [{name, path}] (eine Quelle für UI und Schema)
│   ├── seo-meta.ts             # NEU: metaFor(path) aus keyword-map.json
│   ├── og.tsx                  # vereinheitlichte OG-Vorlage (Marke, Titel, Seitentyp)
│   └── comparison.ts           # wird auf lib/wettbewerber umgestellt oder abgelöst
├── components/v2/Breadcrumbs.tsx (+ .module.css)   # NEU
├── components/vergleich/AlternativePage.tsx         # NEU: Vorlage für 4 Alternativen
├── app/vergleich/<name>-alternative/page.tsx + opengraph-image.tsx
├── app/vergleich/handwerkersoftware-kleine-betriebe/page.tsx + opengraph-image.tsx
├── docs/seo/ai-prompts-targets.json                # NEU (D-10)
├── scripts/seo-audit.mjs                            # NEU: Post-Build-Prüfung über .next HTML
└── tests/{wettbewerber,ai-prompts,seo-meta,breadcrumbs}.test.ts  # NEU
```

Ob die Alternativen als vier statische Ordner oder als `app/vergleich/[slug]` mit `generateStaticParams` entstehen, ist Ermessenssache; vier statische Ordner sind einfacher für Map-Pfade, OG und `dynamicParams` (keine unbekannten Slugs).

### Pattern 1: Wettbewerber-Datenmodul mit Pflichtprovenienz (D-04)
**What:** Jede Angabe ist ein Objekt mit Wert, Quelle und Abrufdatum; Texte werden aus Daten zusammengesetzt.
**When to use:** Alle Wettbewerberzahlen und -aussagen auf Alternativen-, Vergleichs-, Preis- und „kleine Betriebe“-Seiten.
```typescript
// lib/wettbewerber/types.ts
export interface Quelle { label: string; url: string }
export interface Fakt<T> { wert: T; quelle: Quelle; abgerufenAm: string /* YYYY-MM-DD */; zitat?: string }
export interface Wettbewerber {
  slug: "plancraft" | "craftnote" | "hero" | "tooltime";
  name: string;                       // Schreibweise des Anbieters: "plancraft", "Craftnote", "HERO", "ToolTime"
  stand: string;                      // jüngstes abgerufenAm, sichtbar auf der Seite
  testphaseTage: Fakt<number>;        // Zahl, kein Satz mit „x Tage“ (siehe Pitfall 1)
  laufzeit: Fakt<string>;
  preise: Fakt<{ paket: string; centsMonat?: number; centsJahrJeMonat?: number; hinweis?: string }[]>;
  kriterien: Partial<Record<"mobileApp" | "plantafel" | "eRechnung" | "datev" | "gaeb" | "zeiterfassung", Fakt<string>>>;
  staerken: Fakt<string>[];           // „Wann passt <Name> besser?“
}
```
Test: jede `Fakt`-Instanz hat `quelle.url` mit `https://` und Hersteller-Domain, `abgerufenAm` ist ein gültiges Datum ≤ heute; Alter > 60 Tage → `console.warn` (Test bleibt grün, D-04).

### Pattern 2: Breadcrumbs aus einer Quelle (D-07)
**What:** `crumbs(path)` liefert die Kette; `Breadcrumbs` rendert sie sichtbar, `breadcrumbSchema(crumbs(path))` erzeugt das JSON-LD.
```tsx
// components/v2/Breadcrumbs.tsx (Server Component)
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Brotkrümelnavigation">
        <ol>
          {items.map((i, n) => (
            <li key={i.path}>
              {n < items.length - 1 ? <Link href={i.path}>{i.name}</Link> : <span aria-current="page">{i.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
```
Bestehende `breadcrumbSchema`-Aufrufe in `FunktionsDetail`, `ArticlePage`, `ContentIndex`, `app/app`, `app/funktionen`, `app/gewerke/[slug]` und die Inline-Varianten (Rechner, `/vergleich`) werden ersetzt, damit es je Seite genau eine BreadcrumbList gibt (Live-Check Phase 7 erwartet „BreadcrumbList 3“ auf Detailseiten bzw. „2“ auf `/app` – Zählung beibehalten).

### Pattern 3: Statische OG-Grafik in dynamischen Segmenten (D-08)
```tsx
// app/funktionen/[slug]/opengraph-image.tsx
// Quelle: node_modules/next/dist/docs/.../opengraph-image.md; Re-Export laut next-metadata-route-loader.js
import { funktionen } from "@/lib/funktionen";
import { pageOg, OG_SIZE } from "@/lib/og";
export const size = OG_SIZE;               // { width: 1200, height: 630 }
export const contentType = "image/png";
export const alt = "CraftOS Funktion";
export function generateStaticParams() {   // ohne diese Zeile wird das Bild erst bei Abruf erzeugt
  return funktionen.map((f) => ({ slug: f.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = funktionen.find((x) => x.slug === slug);
  return pageOg({ title: f?.name ?? "CraftOS", kind: "Funktion" });
}
```
Zusätzlich `pageMetadata(..., imagePath)` mit dem Segmentpfad aufrufen, damit `twitter:image` nicht auf die Root-Grafik zeigt.

### Pattern 4: Antwortsatz aus Daten (SEO-04, D-05)
```tsx
// app/preise/page.tsx – keine Preisliterale (pricing-parity „Literale“)
const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const antwort = `CraftOS kostet ${euro(voll.monat)} netto pro Person und Monat für die ${voll.name} mit Web-App und Mobile-App oder ${euro(voll.jahr)} im Jahresabo; die ${app.name} für Mitarbeitende auf der Baustelle kostet ${euro(app.monat)} im Monat oder ${euro(app.jahr)} im Jahr.`;
// <p data-answer id="antwort">{antwort}</p> direkt unter der H1, danach echte <table> mit <caption>
```

### Pattern 5: Post-Build-SEO-Audit über echtes HTML
```js
// scripts/seo-audit.mjs – liest .next/server/app/**/*.html, prüft gegen sitemap + keyword-map
// Regeln: <title> ≤ 60, description 120–155, genau 1 <h1>, keine Duplikate (Titel, Description, H1-Text),
// Hauptkeyword (normalisiert wie tests/keyword-map.test.ts) im Titel, BreadcrumbList (auch in @graph) und
// <nav aria-label="Brotkrümelnavigation"> außer auf "/", og:image ≠ Root-Bild, zugehörige .body-Datei ≤ 300 KB,
// zentrale Seiten: jede H2/H3/summary mit "?" → erstes folgendes <p> ≤ 300 Zeichen.
// Reine Prüffunktionen in scripts/lib/seo-audit-core.mjs, Vitest testet sie mit Fixtures.
```
Grundlage: das Analyse-Skript dieser Recherche (`…/scratchpad/p8/meta-audit.mjs`) funktioniert bereits gegen den vorhandenen Build.

### Anti-Patterns to Avoid
- **Wettbewerbertexte als freie Strings mit Zahlen:** bricht Testphasen-Scan und Preis-Literal-Test; Zahlen als Felder, Sätze per Template.
- **FAQPage-Schema ohne sichtbare Fragen** (heute `/gobd`): Schema immer aus demselben Array wie `FaqList`.
- **Zweite Metadatenquelle** (Frontmatter-SEO-Felder neben der Map): führt zu Drift; Map ist Quelle.
- **Logos der Wettbewerber** (heute `/vergleich`): D-02 – entfernen, Wortmarke genügt.
- **„beste“/„Testsieger“ über CraftOS** auf der Seite „kleine Betriebe“: unbelegter Superlativ.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG-PNG-Erzeugung | eigenes Canvas/Puppeteer-Rendering | `ImageResponse` aus `next/og` | gebündelt, statisch cachebar, Datei-Konvention setzt Meta-Tags |
| og:image/twitter-Tags | manuelle `<meta>` | Metadata API (`metadata`, `opengraph-image`) | Vorrang- und Merge-Regeln von Next |
| JSON-LD-Ausgabe | String-Konkatenation | `components/seo/JsonLd` + `lib/schema.ts` | escaped `<`, einheitliche `@id` |
| Keyword-Normalisierung | neue Regex | `norm()` aus `tests/keyword-map.test.ts` in ein Modul ziehen | identische Regeln wie die Map-Tests |
| SE-Ranking-Aufrufe | eigener fetch mit Header | `createClient()/callTool()` aus `scripts/lib/se-ranking-mcp.mjs` | Backoff, Redaktion des Schlüssels, Idempotenzregeln |
| Sitemap-/IndexNow | neues Skript | `app/sitemap.ts`, `npm run indexnow` | vorhanden, im Rollout erprobt |
| Textbudget-Prüfung | eigene Zählung | `charCount`, `assertTextBudget` aus `components/v2/budgets.ts` | Unicode-sicher, UI-SPEC-Fehlertexte |

**Key insight:** Fast alles Nötige existiert; das Risiko liegt in Kollisionen mit bestehenden Schutztests und in einer zweiten Datenquelle, nicht in fehlender Technik.

## Common Pitfalls

### Pitfall 1: Testphasen-Scan schlägt bei Wettbewerberangaben an
**What goes wrong:** `tests/pricing-parity.test.ts` („Testphase: alle Tagesangaben im Testkontext stimmen mit trialDays überein“) scannt `app/`, `components/`, `lib/`, `content/`; jede Zahl + „Tag(e)“ in einem Satz mit „test|kostenlos|ohne zahlungs“ muss 10 sein. „plancraft nennt 7 Tage“, „30 Testtage“, „14 Tage“ → rot.
**How to avoid:** Testtage der Wettbewerber nur als Zahl (`testphaseTage.wert`) und Text per Template (`${w.testphaseTage.wert} Tage`, wird vom Literal-Muster nicht erfasst) **oder** Ausnahme `lib/wettbewerber/` im Scan plus eigener Test, der dort nur Zahlenfelder zulässt. Entscheidung im ersten Plan treffen, bevor Texte entstehen.
**Warning signs:** `Testphase:`-Fehlermeldungen mit Pfaden unter `lib/wettbewerber` oder `app/vergleich`.

### Pitfall 2: Route-Audit wertet „14 Tage kostenlos“ als alte Testphase
**What goes wrong:** `scripts/route-audit.mjs` markiert jede Seite mit `/14 Tage (kostenlos|testen)/` als Fehler (`oldTrial`) → Exit 1 auf `/vergleich/hero-alternative`.
**How to avoid:** Formulierung „Testphase laut HERO: 14 Tage“ bzw. Tabellenzelle „14 Tage“; oder Muster auf CraftOS-Kontext einschränken (Pfad-Ausnahme `/vergleich/`). Gleiche Prüfung in Unit-Test spiegeln.

### Pitfall 3: Ankündigungssperre (PROD-04)
**What goes wrong:** Entwürfe plancraft, HERO und ToolTime enthalten „Telefon-Agent … angekündigt“ bzw. „MCP-Server angekündigt“. `announcements.test.ts`, `route-audit.mjs` und `live-check.mjs` sperren „Telefon-Agent“/„MCP-Server“.
**How to avoid:** Sätze ersatzlos streichen; Vergleichszeile „KI-Telefonempfang: CraftOS Nein“ (neutral, wie heute in `lib/comparison.ts`) ist zulässig.

### Pitfall 4: ComparisonTable-Zellbudget 24 Zeichen
**What goes wrong:** „74,90 € / 59,90 € / 47,92 €“ (27), „Aktionspreis statt 69,90 €“ (26) → Baustein wirft beim Rendern.
**How to avoid:** Tabellenzellen kurz („ab 47,92 €“, „Ja, ab Pro“, „12 Monate“); Details in Absatz/FAQ und Quellenliste; Preis je Zahlweise als eigene Zeile.

### Pitfall 5: Wettbewerberlogos ohne Rechtegrundlage
**What goes wrong:** `/vergleich` zeigt Craftnote-PNG und plancraft-SVG (`ProviderLogo`, `docs/COMPARISON-LOGOS.md` belegt nur die Herkunft, keine Lizenz). D-02 verbietet Logos ohne Recht.
**How to avoid:** Im v2-Umbau entfernen; `media-budget`-Ausnahme `craftnote.png` und die Dateien unter `public/images/brands/` nachziehen (Datei bleibt ggf. ungenutzt → entfernen, Test anpassen).

### Pitfall 6: Preisliteral-Verbot und Paritätstest auf `/preise`
**What goes wrong:** `pricing-parity.test.ts` verbietet Preisliterale (`29,95`, `9,90` …) in `app/preise/page.tsx`, `PricingTable.tsx`, `app/fakten-ueber-craftos/page.tsx` u. a. und erwartet bestimmte Template-Strings in `app/preise/page.tsx`. Ein Umbau, der FAQ-Texte in ein neues Modul verschiebt, bricht `expect(seite).toContain(...)`.
**How to avoid:** Werte nur aus `tarife`/`creditUmrechnung`; wenn Texte in `lib/preise-content.ts` wandern, Testdatei-Liste und Erwartungen im selben Commit anpassen. Achtung: Das Literal-Muster `9[,.]90` trifft auch „29,90“/„49,90“ (Craftnote) – Wettbewerberpreise nie in den gelisteten Dateien.

### Pitfall 7: Keyword-Map-Provenienz für neue Zahlen
**What goes wrong:** `keyword-map.test.ts` verlangt, dass Volumen/KD eines Hauptkeywords in einer Datei unter `docs/seo/data/` mit Manifesteintrag (`kwmap/manifest.json`) als Objekt mit Top-Level-`volume`/`difficulty` stehen. Die neuen Rohdaten vom 22.10.2026 haben das MCP-Format (`cells.volume`) und keinen Manifesteintrag.
**How to avoid:** Für neue Hauptkeywords nur Begriffe nutzen, die schon in `kwmap/export--*.json` stehen (z. B. „was kostet plancraft“ 50/19, „hero software preise“ 140/17, „craftnote preise“ 110/12 sind dort belegt), oder Neuabruf über `scripts/keyword-research.mjs` mit Manifest. Die Phase-8-JSONs sind Belege für Texte/FAQ, keine Map-Quellen.

### Pitfall 8: `twitter:image` und `og:image` laufen auseinander
**What goes wrong:** Segment-`opengraph-image` überschreibt nur `og:image`; `pageMetadata()` setzt `twitter.images` auf `/opengraph-image` (Root).
**How to avoid:** `imagePath` je Seite übergeben oder `twitter.images` weglassen und im Audit beide Tags vergleichen.

### Pitfall 9: WOFF2 in OG-Grafiken
**What goes wrong:** `readFile` der vorhandenen `.woff2` → Satori-Fehler bzw. Fallback; Build bricht oder rendert Geist Regular.
**How to avoid:** TTF/OTF/WOFF aus offizieller Quelle (Lizenz prüfen) unter `assets/og/`; sonst bewusst Geist Regular.

### Pitfall 10: BreadcrumbList in `@graph` oder doppelt
**What goes wrong:** `/vergleich` gibt JSON-LD als `@graph` aus; einfache Typzählung findet es nicht. Nach Einführung des Breadcrumb-Bausteins können Seiten zwei BreadcrumbLists haben (alt + neu).
**How to avoid:** Audit traversiert `@graph` (wie `findType` in `live-check.mjs`); alte Aufrufe im selben Plan entfernen; Test „genau eine BreadcrumbList je Seite“.

### Pitfall 11: Doppelter H1-Text der Kategorieseiten
**What goes wrong:** `/blog/kategorie/rechnungen` und `/hilfe/kategorie/rechnungen` haben beide H1 „Rechnungen“ (SE-Ranking-Audit „2 × doppelter H1“).
**How to avoid:** H1 mit Bereich („Ratgeber: Rechnungen“, „Hilfe: Rechnungen“); Audit prüft H1-Duplikate sitewide.

### Pitfall 12: Sitemap-`lastmod` und Map-Status im selben Commit
**What goes wrong:** `keyword-map.test.ts` verlangt: `geplant` ⇔ nicht in Sitemap; `bestehend` ⇔ in Sitemap. Neue Seiten ohne gleichzeitigen Statuswechsel → rot (Phase-7-Pitfall 2).
**How to avoid:** Seite, Sitemap-Eintrag, Map-Status, `pageUpdated`-Datum und `llms.txt`-Link in einem Commit; Test „Alternativen-Seiten Phase 8“ (`expect(e?.status).toBe("geplant")`) wird beim Livegang geändert.

### Pitfall 13: Veraltete Prüfdaten in Vergleich und Entwürfen
**What goes wrong:** `lib/comparison.ts` `comparisonCheckedAt = "2026-09-09"`; Entwürfe nennen CraftOS-Prüfdatum 09.09.2026, obwohl `site.checkedAt` 2026-10-20 ist.
**How to avoid:** Stand auf Seiten aus Daten (`site.checkedAt`, `wettbewerber.stand`) rendern, nie als Literal.

## Code Examples

### Antwort-zuerst-Prüfung (reine Funktion für Audit und Vitest)
```js
// scripts/lib/seo-audit-core.mjs
export function answerFirstViolations(html, max = 300) {
  const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const out = [];
  const re = /<(h2|h3|summary)[^>]*>([\s\S]*?)<\/\1>([\s\S]{0,4000})/g;
  for (const m of html.matchAll(re)) {
    const q = strip(m[2]);
    if (!q.includes("?")) continue;
    const p = m[3].match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const nextH = m[3].search(/<h[1-6][\s>]/);
    const ans = p && (nextH === -1 || m[3].indexOf(p[0]) < nextH) ? strip(p[1]) : "";
    if (!ans) out.push({ q, problem: "keine Antwort direkt darunter" });
    else if (ans.length > max) out.push({ q, problem: `Antwort ${ans.length} > ${max}` });
  }
  return out;
}
```

### Prompt-Mapping-Datei (D-10)
```json
[
  { "engine": "chatgpt", "promptLlmId": 1528441, "prompt": "Welche Handwerkersoftware ist die beste für kleine Betriebe?",
    "target": "/vergleich/handwerkersoftware-kleine-betriebe#antwort", "phase": 8 },
  { "engine": "chatgpt", "promptLlmId": 1535983, "prompt": "Software für Elektrobetriebe",
    "target": "/gewerke/elektriker", "phase": 9 }
]
```
Test: jedes `target` (ohne Anker) ist Sitemap-Pfad oder geplanter Phase-8-Pfad; für `phase: 8` existiert im Build-HTML ein Element mit der Anker-`id` und darunter eine Antwort ≤ 300 Zeichen. Prompt-IDs stammen aus `docs/seo/data/2026-10-22-ai-tracker-prompts.json`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params` synchron in `opengraph-image` | `params` ist ein Promise | Next v16.0.0 [CITED: opengraph-image.md Versionstabelle] | Bestehende Dateien nutzen bereits `await params` |
| `next/image` `priority` | `loading="eager"` + `fetchPriority` | Next 16 (Projektentscheid 05-05) | Für neue Bilder auf Vergleichsseiten beachten |
| Sichtbare Breadcrumbs verworfen (06-UI-SPEC) | Sichtbar auf allen Seiten außer Startseite (D-07) | Phase 8 | Designvertrag aktualisieren |
| TMG § 5 im Impressum | DDG § 5 | Mai 2024 | Nur Description-Vorschlag; Rechtstext nicht ohne Freigabe ändern |

**Deprecated/outdated im Bestand:** `components/ui/PageHero`, `components/ui/Faq`, `TrialCta`, `components/preise/PricingTable` auf den fünf Umbauseiten (durch v2 ersetzen); `lib/comparison.ts` mit Stand 09.09.2026.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | HERO: niedrigere Zahl (69/119/299) = jährliche, höhere (79/135/345) = monatliche Zahlweise | Wettbewerberfakten HERO | Falsche Preiszuordnung = irreführender Vergleich (§ 5 UWG); vor Veröffentlichung im Browser beide Umschalterstellungen prüfen |
| A2 | HERO bietet derzeit ggf. ein Einführungsangebot 59/109/289 € (Drittquelle) | Wettbewerberfakten HERO | Rechenbeispiel zu hoch; gleiche Browserprüfung |
| A3 | Satori unterstützt kein WOFF2 | Breadcrumbs und OG | Falls doch: Markenschriften ohne neue Dateien möglich |
| A4 | Build-Mehrzeit 10–40 s und 40–90 KB je OG-Bild | Breadcrumbs und OG | Längerer Build; in Welle 0 messen |
| A5 | Fontshare-Lizenz der Markenschriften erlaubt Einbettung als TTF in Server-Assets | Pitfall 9 | Lizenzverstoß; Inhaber prüft, sonst Geist |
| A6 | B2B-Nettopreise ohne PAngV-Bruttopflicht zulässig (Zielgruppe Betriebe) | Rechtsrahmen | Bestandspraxis der Seite; keine Änderung geplant |
| A7 | KI-Antworten zitieren eher Seiten mit klarer Preistabelle und Antwortsatz | AI-Tracker | Wirkung ungewiss; Messung über AI Tracker nach Rollout |

## Open Questions (RESOLVED)

1. **HERO-Zahlweise und Aktionspreis** — RESOLVED durch D-16
   - What we know: Preise 69/79, 119/135, 299/345 stehen auf der offiziellen Seite; Umschalter „Monatlich / Jährlich – über 10 % sparen“.
   - What's unclear: Zuordnung je Umschalterstellung, mögliches Einführungsangebot.
   - Recommendation: `checkpoint:human-verify` mit Screenshot beider Stellungen vor dem Livegang; bis dahin nur „ab 69 € bzw. ab 79 € netto pro Monat je nach Zahlweise“.

2. **H1 von Ratgebern, Hilfe und Gewerken in Phase 8?** — RESOLVED durch D-17
   - What we know: D-15 schließt SEO-02 („Titel, H1 und Description folgen der Map“) in Phase 8; Gewerke-Umbau und Inhaltsüberarbeitung sind Phase 9; 24 Ratgeber-H1 > 60 Zeichen, Gewerke-H1 sind Slogans („Vom Zählerschrank bis zur Wallbox“).
   - What's unclear: Ob H1-Änderungen an Blog/Hilfe/Gewerke in Phase 8 gehören.
   - Recommendation: Titel/Description sitewide in Phase 8; H1 nach Map auf allen Seiten setzen, deren H1-Quelle ein einzelnes Feld ist (Gewerke `heroTitle`, Frontmatter `title` nur wenn Map-H1 abweicht) – das ist eine Zeichenkettenänderung ohne Inhaltsumbau. Sonst SEO-02 erst in Phase 9 abschließen und D-15 anpassen.

3. **Tracker-Umfang „16 Prompts“ vs. 20 Einträge** — RESOLVED durch D-18
   - What we know: 16 ChatGPT + 2 Perplexity + 2 AI Overview; 18 unterschiedliche Texte.
   - Recommendation: Mapping mit allen 20 Einträgen (Engine-Feld), Test über alle.

4. **Gewerke-Links auf neue Detailseiten** — RESOLVED durch D-19
   - What we know: `PHASE-07-ROLLOUT.md` §15h nennt „Gewerke-Umbau in Phase 8 (Deferred)“, CONTEXT verschiebt Gewerke nach Phase 9.
   - Recommendation: Als Phase-9-Punkt führen; im Phase-8-Rollout-Nachweis den Widerspruch klarstellen.

5. **Rechtsseiten mit individueller OG-Grafik und Breadcrumbs?** — RESOLVED durch D-20
   - What we know: SEO-05 sagt „alle Seiten“; Rechtstexte nur mit Freigabe ändern.
   - Recommendation: Metadaten/OG/Breadcrumb sind kein Rechtstext – umsetzen; Seiteninhalt unverändert lassen. Impressum-Description „§ 5 DDG“ erst nach Inhaberbestätigung (Entwurfshinweis).

6. **Markenschriften in OG** — RESOLVED durch D-21
   - Recommendation: siehe Pitfall 9, Checkpoint.

7. **Unit-Budget** — RESOLVED durch D-24
   - What we know: 34.671 Units verbleiben (nicht ~65.000).
   - Recommendation: Phase 8 braucht keine weiteren großen Abrufe; Rollout-Messung (`seo-report.mjs`) verbraucht laut Phase 7 0 Units.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build, Tests, Skripte | ✓ | v24.12.0 (engines 24.x) | – |
| npm | Skripte | ✓ | 11.6.2 | – |
| Playwright | E2E | ✓ | 1.63.0 | – |
| Vercel CLI | Deployment-Status | ✓ | 50.1.3 | Vercel-MCP (stand in Phase 7 nicht zur Verfügung) |
| gh | `gh workflow list --all` | ✓ | 2.65.0 | – |
| SE Ranking MCP (Schlüssel in `.env`) | Rollout-Messung | ✓ | Test bis 03.11.2026, 34.671 Units | – |
| Koordination (edgar/edgarspc) | schwere Läufe auslagern | ✗ (beide OFFLINE/VERALTET, kein Website-Rezept) | Runner 1.9.9 | lokal nacheinander, ein schwerer Prozess |
| Vorhandener Build `.next` | Ist-Analyse | ✓ | 22.10.2026 13:55 (Code `126f807`) | – |
| Markenschriften TTF/WOFF | OG-Grafiken | ✗ | nur WOFF2 | Geist Regular (gebündelt) |

**Missing dependencies with no fallback:** keine.
**Missing dependencies with fallback:** Markenschriften (Geist), Koordinationsrunner (lokal).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^5.0.0 (Unit/Daten), Playwright 1.63.0 (E2E, Chromium/WebKit 1440/390) |
| Config file | `craftos/vitest.config.ts`; `craftos/tests/e2e/playwright.config.cjs` (testMatch-Liste – neue Spec dort eintragen) |
| Quick run command | `cd craftos && npx vitest run tests/<datei>.test.ts` |
| Full suite command | `cd craftos && npm test && npm run lint && npm run typecheck` |
| Build-gebundene Prüfung | `cd craftos && npm run build && node scripts/seo-audit.mjs` (neu) |
| Browser | `next start -p 3100` (eigene PID) → `npm run test:e2e`, `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`, `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-03 | Jede Wettbewerberangabe hat Quelle (https, Herstellerdomain) und Abrufdatum; Alter > 60 Tage = Warnung | unit | `npx vitest run tests/wettbewerber.test.ts` | ❌ Wave 0 |
| SEO-03 | Keine verbotenen Wörter (Herabsetzung/Superlative), keine Logos, kein „Telefon-Agent“ | unit | `npx vitest run tests/wettbewerber.test.ts tests/announcements.test.ts` | teils ✅ |
| SEO-03 | Alternativen-Seiten: H1, Antwort ≤ 300, ComparisonTable mit `note`, FAQPage = sichtbare FAQ, BreadcrumbList 3, Links von `/vergleich` und Footer | build + e2e | `node scripts/seo-audit.mjs`; `npx playwright test --config tests/e2e/playwright.config.cjs vergleich.pw.cjs` | ❌ Wave 0 |
| SEO-04 | `/preise` beginnt mit Antwortsatz (Werte aus `tarife`) und `<table>`; Parität | unit + build | `npx vitest run tests/pricing-parity.test.ts`; `node scripts/seo-audit.mjs` | ✅ (erweitern) |
| SEO-05 | Alle Sitemap-URLs: Titel ≤ 60, Desc 120–155, 1 H1, keine Duplikate (Titel, Desc, H1), Keyword im Titel, sichtbare Breadcrumbs + 1 BreadcrumbList (außer `/`), eigenes og:image ≤ 300 KB, twitter:image = og:image | build | `node scripts/seo-audit.mjs` | ❌ Wave 0 |
| SEO-05 | Map-Zielwerte vollständig für alle indexierten Pfade (auch ohne Hauptkeyword) | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ (erweitern) |
| SEO-05 | OG statisch: `prerender-manifest.json` enthält für jede Seite eine `opengraph-image`-Route | build | `node scripts/seo-audit.mjs` | ❌ Wave 0 |
| SEO-06 | Zentrale Seiten: Antwort ≤ 300 unter jeder Frage | build | `node scripts/seo-audit.mjs` | ❌ Wave 0 |
| SEO-06 | `llms.txt` nennt Alternativen, kleine Betriebe, Preise; Sitemap enthält neue Seiten; IndexNow im Rollout | unit + live | `npx vitest run tests/llms.test.ts`; `node scripts/live-check.mjs` | ✅ (erweitern) |
| SEO-09 | `ai-prompts-targets.json`: alle 20 Tracker-Einträge, Ziel existiert, Phase-8-Ziele mit Anker und Antwort ≤ 300 | unit + build | `npx vitest run tests/ai-prompts.test.ts` + `node scripts/seo-audit.mjs` | ❌ Wave 0 |
| DESIGN-02 | Umbauseiten nutzen v2-Bausteine, keine `PageHero`/`TrialCta`/`components/ui/Faq` mehr | unit | `npx vitest run tests/design-v2-budgets.test.ts` (Importprüfung ergänzen) | ✅ (erweitern) |
| DESIGN-02 | A11y/Overflow bei 360–1440 auf neuen Seiten | e2e + visuell | `npm run test:e2e`; `node scripts/visual-audit.mjs` | ✅ (Routen ergänzen) |

### Sampling Rate
- **Per task commit:** betroffene Vitest-Dateien (`npx vitest run tests/<datei>.test.ts`) + `npm run typecheck`.
- **Per wave merge:** `npm test && npm run lint && npm run typecheck`; ab Welle mit Seitenänderungen zusätzlich `npm run build && node scripts/seo-audit.mjs` (ein schwerer Prozess).
- **Phase gate:** Build, `seo-audit`, E2E gegen Port 3100, `route-audit`, `live-check` lokal, danach Rollout; Full suite green before `/gsd-verify-work`.

### Wave 0 Gaps
- [ ] `craftos/scripts/seo-audit.mjs` + `scripts/lib/seo-audit-core.mjs` – Post-Build-Prüfung (SEO-05/06/09)
- [ ] `craftos/tests/seo-audit-core.test.ts` – Fixtures für Titel/Desc/H1/Breadcrumb/@graph/Antwort-zuerst
- [ ] `craftos/tests/wettbewerber.test.ts` – Provenienz, Alter, Wortliste (SEO-03)
- [ ] `craftos/tests/ai-prompts.test.ts` + `docs/seo/ai-prompts-targets.json` (SEO-09)
- [ ] Anpassung `tests/pricing-parity.test.ts` (Testphasen-Scan für Wettbewerberdaten) und `scripts/route-audit.mjs` (`oldTrial`)
- [ ] `tests/e2e/vergleich.pw.cjs` (oder Erweiterung `browser-functional.pw.cjs`) + Eintrag in `playwright.config.cjs` `testMatch`
- [ ] Messung OG-Build-Zeit/-Größe nach erstem Segment (Annahme A4)

## Security Domain

Statische Marketingsite ohne Login, Formulare oder Nutzereingaben auf den betroffenen Seiten; `security_enforcement` ist in `.planning/config.json` nicht gesetzt (= aktiv).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | – |
| V3 Session Management | no | – |
| V4 Access Control | no | – |
| V5 Input Validation / Output Encoding | yes (gering) | JSON-LD über `JsonLd` (escaped `<`); Wettbewerbertexte sind Repo-Daten, keine Fremd-HTML-Übernahme; OG-Route-Parameter nur aus `generateStaticParams` |
| V6 Cryptography | no | – |
| V8 Data Protection / Secrets | yes | `SE_RANKING_API_KEY` nur aus `.env`; `check-no-secrets.mjs` nach jedem Rohdatenabruf und im Ship-Gate |
| V14 Configuration | yes | Keine neuen GitHub-Workflows; `gh workflow list --all` vor Push |

### Known Threat Patterns for Next.js-SSG + SEO-Daten

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Schlüssel in Rohdaten/Logs | Information Disclosure | `redact()` im MCP-Client, `check-no-secrets.mjs` |
| Script-Injection über JSON-LD-Strings (z. B. `</script>` in Zitaten) | Tampering | `JsonLd` ersetzt `<` durch `\u003c` |
| On-Demand-Rendering unbekannter Slugs in OG-Routen (Kosten) | Denial of Service | `generateStaticParams` + statische Ordner; `dynamicParams` am Seitensegment beachten (Loader re-exportiert `dynamicParams` aus der Bilddatei nicht) |
| Externe Links auf Wettbewerberseiten | Spoofing (gering) | Nur Herstellerdomains, `https`, im Test geprüft |
| Rechtsrisiko vergleichende Werbung | Repudiation/Legal | Quellen + Datum je Angabe, Wortliste, Inhaber-Checkpoint für HERO-Preise |

## Sources

### Primary (HIGH confidence)
- Repo-Code (gelesen am 22.10.2026): `craftos/lib/{site,schema,metadata,og,comparison,funktionen,product-register,llms,keyword-map}.ts`, `app/{sitemap,opengraph-image,layout}.tsx`, `app/{preise,vergleich,fakten-ueber-craftos,craft-ai,gobd,agb}/page.tsx`, `components/v2/*`, `components/layout/Footer.tsx`, `tests/{pricing-parity,keyword-map,announcements}.test.ts`, `scripts/{route-audit,live-check,indexnow-submit}.mjs`, `scripts/lib/se-ranking-mcp.mjs`
- Build-Ausgabe `craftos/.next/server/app/**/*.html`, `prerender-manifest.json` (22.10.2026 13:55)
- Next 16.3.4 lokale Docs: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`, `…/04-functions/generate-metadata.md`; Quelltext `next/dist/build/webpack/loaders/next-metadata-route-loader.js`
- § 6 UWG: https://www.gesetze-im-internet.de/uwg_2004/__6.html
- SE Ranking (MCP, 22.10.2026): Rohdaten unter `craftos/docs/seo/data/2026-10-22-*.json`

### Secondary (MEDIUM confidence – offizielle Herstellerseiten, Momentaufnahme 22.10.2026)
- https://plancraft.com/de-de/preise; https://plancraft.com/de-de/handwerkersoftware-kleinbetriebe; https://plancraft.com/de-de/funktionen/handwerk-rechnungsprogramm
- https://craftnote.de/preise/; https://craftnote.de/buero-plus/; https://craftnote.de/
- https://hero-software.de/preise; https://hero-software.de/rechtliches/agb; https://hero-software.de/features/rechnungsprogramm-handwerker/e-rechnung
- https://www.tooltime.app/preise; https://www.tooltime.app/rechtliches/nutzungsbedingungen; https://www.tooltime.app/digitale-plantafel; https://www.tooltime.app/
- IHK zur vergleichenden Werbung: https://www.frankfurt-main.ihk.de/recht/uebersicht-alle-rechtsthemen/wettbewerbsrecht/unlauterer-wettbewerb/vergleichende-werbung/uebersicht-vergleichende-werbung-5273890; https://www.ihk.de/konstanz/recht-und-steuern/handel-wettbewerb/werbung/vergleichende-werbung-1672112
- BGH I ZR 167/13 (02.04.2015): https://rewis.io/urteile/urteil/pla-02-04-2015-i-zr-16713/; BGH I ZR 141/07: https://rewis.io/urteile/urteil/7lc-18-11-2009-i-zr-14107/
- Omsels, Vergleichende Werbung/Preisgegenüberstellung: https://www.omsels.info/die-verbote-oder-was-darf-ich-nicht/5-uwg-irrefuehrende-werbung/13-einzelfaelle/lvergleichende-werbung; https://www.it-recht-kanzlei.de/vergleichspreise-werbung-konkurrenz.html

### Tertiary (LOW confidence – nur Hinweis, nicht zitieren)
- HERO-Einführungsangebot laut https://europeanpurpose.com/tool/hero-software und https://www.fuer-gruender.de/wissen/unternehmen-fuehren/buchhaltung/handwerker-software-vergleich/hero-test/
- Satori-Schriftformate (Trainingswissen, nicht abgerufen)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH – keine neuen Pakete, alles im Repo verifiziert
- Architecture: HIGH – Muster aus Phase 7 und Next-16-Quelltext belegt
- Wettbewerberfakten: MEDIUM – offizielle Seiten, aber JS-Umschalter (HERO) und Momentaufnahmen; DATEV/GAEB bei HERO nicht belegbar
- Rechtsrahmen: MEDIUM – Gesetzestext verifiziert, Rechtsprechung über Sekundärquellen; keine Rechtsberatung
- Pitfalls: HIGH – direkt aus Tests/Skripten abgeleitet

**Research date:** 2026-10-22
**Valid until:** Wettbewerberpreise 2026-11-21 (30 Tage; D-04 warnt ab 60 Tagen), Code-Ist bis zur ersten Phase-8-Änderung, SE-Ranking-Zugang bis 2026-11-03
