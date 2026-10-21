# Phase 6: Startseite, Navigation und Funktionsübersicht – Context

**Gathered:** 2026-10-21
**Status:** Ready for planning
**Quelle der Entscheidungen:** Inhaberauftrag vom 20.10.2026 („viel strukturierter, viel schöner … nicht Rom neu erfinden … Man versteht da fast nichts, und es ist nur Text … wir brauchen einfach noch SEO“) und Freigabe vom 21.10.2026, alle restlichen Phasen ohne Rückfragen fertigzustellen („ja mach einfach bis du sie alle fertig hast“). Kein separates discuss-phase-Gespräch; offene Detailfragen entscheidet der Orchestrator nach diesen Leitplanken (Claude's Discretion).

<domain>
## Phase Boundary

Umbau von Startseite (`/`), Hauptnavigation (Header inkl. Mobilmenü, Footer-Linkstruktur soweit für zwei Klicks nötig) und Funktionsübersicht (`/funktionen`) mit den Designbausteinen aus Phase 5 (`craftos/components/v2/**`) und der Keyword-Map (`craftos/docs/seo/keyword-map.json`, `lib/keyword-map.ts`).

Nicht in dieser Phase: Funktionsdetailseiten und neue Funktionsseiten (`/funktionen/gaeb`, `/mahnwesen`, `/terminplanung`, `/bankabgleich`, `/datenuebernahme`, `/maengelmanagement`) und die Mobile-App-Seite → Phase 7. Alternativen-Seiten, Preise-/Vergleichsseiten-Umbau, technisches SEO-Audit → Phase 8. Wissens-/Hilfeinhalte → Phase 9.
</domain>

<decisions>
## Implementation Decisions

### Gestaltung (DESIGN-01, DESIGN-02)
- **D-01:** Verbindlich ist der genehmigte Designvertrag aus Phase 5 (`.planning/phases/05-…/05-UI-SPEC.md`, Richtung „Werkbank-Präzision“, Tokens, Textbudgets, Amber-Liste, Fokusring, 96-px-Ausnahme) und die Bausteine aus `components/v2` (SectionHeader, KeyFacts, CtaBand, BentoGrid/BentoTile, StepFlow, FaqList, ComparisonTable, Badges, FeatureCard, IllustrationLabel, MediaFigure, BrowserFrame, PhoneFrame, DevicePair, MiniUi). Keine neue Bildsprache, keine neuen Farben/Schriften; fehlende Bausteine nur, wenn eine Seite sie zwingend braucht, und dann im selben Stil mit Budgetprüfung.
- **D-02:** Startseite: Above the fold bei 360–1440 px: H1 mit Hauptkeyword „Handwerkersoftware“ und klarer Aussage (Büro + Baustelle in einem System), ein Satz Einleitung, Produktdarstellung (DevicePair mit vereinfachter UI und Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“), Primär-CTA „10 Tage kostenlos testen“ (`data-track="trial"` bzw. bestehende trial_click-Erfassung) plus Sekundäraktion. Danach wenige, klar getrennte Abschnitte (Richtwert 6–8): Kennzahlen, Arbeitsablauf (StepFlow Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), Funktionsgruppen (BentoGrid), Web-App + Handy-App, Preis-Kurzfassung aus `site.ts`, FAQ (FaqList + FAQPage-Schema nur für sichtbare Fragen), CtaBand. Jeder Abschnitt: höchstens eine Überschrift, ein Einleitungssatz, sonst visuelle Elemente.
- **D-03:** Text kürzen ist ausdrücklich beauftragt. Längere Erklärtexte der Startseite werden nicht ersatzlos verworfen, sondern auf Detailseiten/FAQ verwiesen, wenn sie dort schon stehen; keine Seite und keine URL wird entfernt. Produktfakten ausschließlich aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts` und dem Preis-Snapshot; keine erfundenen Funktionen, Zahlen oder Kundenstimmen.
- **D-04:** Bestehende animierte Szenen (`components/feature-snippet`, `components/product-demo`) dürfen auf der Startseite höchstens einmal bleiben, wenn sie in Budget und Ruhe-Regel des UI-SPEC passen (prefers-reduced-motion, keine Layout-Shifts); sonst ersetzt die statische vereinfachte UI sie. Detailseiten behalten ihre Szenen (Phase 7 entscheidet dort).

### Navigation (DESIGN-03)
- **D-05:** Menüpunkt „Funktionen“ als Mega-Menü nach Arbeitsablauf (sechs Gruppen wie FEAT-01), je Gruppe Icon (lucide, bereits Abhängigkeit) und Kurzbeschreibung, darunter die Live-Funktionen als direkte Links → jede Live-Funktion ist mit Menü öffnen + 1 Klick erreichbar (≤ 2 Klicks). „Vorschaubilder“ aus DESIGN-03 werden im Rahmen der Umfangsänderung durch Icons plus optional eine kleine vereinfachte UI-Vorschau je Gruppe erfüllt (keine Screenshots).
- **D-06:** Weitere Hauptpunkte bleiben inhaltlich (Gewerke, Preise, Wissen, Hilfe; „Warum CraftOS?“/Vergleich und Mobile-App erreichbar). Desktop: Disclosure-Muster (Button mit aria-expanded, kein ARIA-menu-Rolle-Missbrauch), Maus/Touch/Tastatur (Esc schließt, Fokus kehrt zurück, Tab-Reihenfolge logisch). Mobil: Vollflächen-Drawer mit Akkordeon, Scroll-Lock, ohne Layout-Shift. Bestehendes Verhalten aus `components/layout/Header.tsx` (Breakpoint-Reset, Scroll-Lock, sichtbare Gruppe) bleibt erhalten oder wird gleichwertig ersetzt; Login-Link mit `data-track="login"` und Testen-Link mit trial-Erfassung bleiben.
- **D-07:** Die Funktionsliste im Menü wird aus derselben Quelle wie die Übersicht erzeugt (Produktregister/funktionen.ts), damit Menü, Übersicht und Register nicht auseinanderlaufen; ein Test prüft Gleichstand und dass jedes Ziel als Route existiert.

### Funktionsübersicht (FEAT-01)
- **D-08:** `/funktionen` zeigt alle Live-Funktionen aus dem Produktregister, gruppiert nach Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team, je Funktion FeatureCard mit visuellem Element (vereinfachte UI/Icon) und genau einem Satz Nutzen, Plattform-Badges (Web/App) nur wo belegt.
- **D-09:** Live-Funktionen ohne eigene Detailseite (z. B. Mahnwesen, Bankabgleich, Terminplanung, GAEB/DATANORM, Datenimport, Mängel – Seiten folgen in Phase 7) erscheinen trotzdem; sie verlinken bis Phase 7 auf die thematisch nächste bestehende Detailseite (mit Anker) oder erscheinen ohne Link. Keine toten Links, keine 404, keine Platzhalterseiten in Phase 6.
- **D-10:** Strukturierte Daten: `/funktionen` mit BreadcrumbList und ItemList der Funktionen; Startseite behält Organization/SoftwareApplication (Preis netto aus site.ts) und FAQPage nur für sichtbare FAQ.

### SEO (SEO-02-Umsetzung)
- **D-11:** Title, H1 und Meta-Description von `/` und `/funktionen` folgen der Keyword-Map (`/` → „handwerkersoftware“, `/funktionen` → „software für handwerksbetriebe“), Längen innerhalb der Grenzen (Title ≤ 60 Zeichen, Description 120–158 Zeichen), Marke „CraftOS“ enthalten. Ankertexte im Menü nutzen die Funktionsnamen bzw. Hauptkeywords der Zielseiten, wo natürlich.
- **D-12:** Ein Test prüft für die Phase-6-Seiten, dass das Hauptkeyword in Title und H1 steht (Erweiterung des vorhandenen keyword-map-Tests).

### Qualität, Rollout
- **D-13:** Server Components bleiben Standard; Client-JavaScript nur für das Menü. Ohne JavaScript bleibt die Navigation nutzbar (z. B. Links zu Übersichtsseiten, `<details>`-Fallback oder serverseitig gerenderte Links). CLS 0, LCP-Element ohne Lazy-Load, keine Animationen ohne reduced-motion-Schutz.
- **D-14:** Prüfungen lokal (vitest, typecheck, lint, build, Playwright-E2E inkl. axe, Breiten 360/390/768/1024/1440, Tastaturbedienung Menü, Zwei-Klick-Test für jede Live-Funktion), dann Ship-Gate, `gh workflow list --all`, Push auf main, Vercel READY, `scripts/live-check.mjs`, `npm run indexnow`, `node scripts/seo-report.mjs --etappe rollout-phase06`, Rollout-Nachweis wie Phase 5 (`docs/releases/PHASE-06-ROLLOUT.md`). Prozesse nur über eigene PID beenden.

### Claude's Discretion
- Genaue Abschnittsreihenfolge und Inhalte der Startseite innerhalb von D-02; Auswahl der Kennzahlen (nur belegte Werte: Preise, Testtage, Anzahl Live-Funktionen, Plattformen).
- Icon-Auswahl je Gruppe; Zuordnung grenzwertiger Funktionen zu Gruppen (z. B. Dashboard, Kundenportal, Craft AI) – begründet im Plan.
- Ob Footer-Links angepasst werden.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design
- `.planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-UI-SPEC.md` — verbindlicher Designvertrag
- `craftos/docs/DESIGN-V2.md` — Kaskadennachweis und Baustein-Konventionen
- `craftos/app/styleguide/page.tsx`, `craftos/lib/styleguide-content.ts` — Referenzverwendung aller Bausteine
- `.planning/phases/05-…/05-04-SUMMARY.md`, `05-05-SUMMARY.md`, `05-06-SUMMARY.md` — Bausteinverträge, Abweichungen, offene Punkte

### Produkt und SEO
- `craftos/lib/product-register.ts`, `craftos/lib/funktionen.ts`, `craftos/lib/site.ts`, `craftos/docs/product-pricing-snapshot.json`
- `craftos/docs/seo/KEYWORD-MAP.md`, `craftos/docs/seo/keyword-map.json`, `craftos/lib/keyword-map.ts`
- `craftos/docs/seo/SE-RANKING-BEFUND-2026-10-20.md`

### Bestand
- `craftos/app/page.tsx`, `craftos/components/home/**`, `craftos/app/funktionen/page.tsx`, `craftos/components/layout/Header.tsx`, `Header.module.css`, `Footer.tsx`, `craftos/components/Analytics.tsx`
- `craftos/tests/e2e/*.pw.cjs`, `craftos/tests/e2e/playwright.config.cjs`, `craftos/scripts/route-audit.mjs`, `craftos/scripts/live-check.mjs`
- `craftos/docs/releases/PHASE-05-ROLLOUT.md` — Rollout-Muster
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- v2-Bausteine mit Budgetprüfung beim Rendern (`components/v2/budgets.ts`, `mini/limits.ts`).
- Header ist bereits Client Component mit Gruppen-Akkordeon, Breakpoint-Reset und Scroll-Lock (`mobileQuery` 1120 px).
- Analytics klassifiziert App-Links über `data-track` (`components/Analytics.tsx`).

### Integration Points
- Startseite importiert `Hero`, `FeatureSnippet`, `PricingTable`, `Faq`, `TrialCta`, `funktionen`, `faqSchema`, `site/tarife`.
- `/funktionen` ist bisher kurz (≈65 Zeilen) und nutzt `funktionen.ts`.
- Hart kodierte Erwartungen in Tests (`content.test.ts`, `seo-brand.test.ts`, `function-illustrations.pw.cjs`, `route-audit.mjs`) müssen beim Umbau mitgezogen werden.
</code_context>

<specifics>
## Specific Ideas
- Inhaber: „nicht Rom neu erfinden“ – bewährte SaaS-Muster (Hero mit Produktbild, Logo-/Kennzahlenleiste, Ablauf, Bento-Funktionen, Preis-Teaser, FAQ, Abschluss-CTA), aber im CraftOS-Stil.
- Die vereinfachte UI zeigt nur belegte Bildschirme/Statusnamen (siehe 05-05-SUMMARY).
</specifics>

<deferred>
## Deferred Ideas
- Echte Kundenstimmen/Logos – erst wenn belegt vorhanden (keine Platzhalter).
- Neue Funktionsdetailseiten → Phase 7; Alternativen-Seiten → Phase 8; Ratgeber → Phase 9.
</deferred>

---

*Phase: 06-startseite-navigation-und-funktionsübersicht*
*Context gathered: 2026-10-21*
