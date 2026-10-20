# Phase 5: Produktwahrheit, Designsystem v2 und Medienpipeline - Context

**Gathered:** 2026-10-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Die Website stellt ausschließlich live verfügbare Funktionen mit korrekten Preisen und Lizenzbegriffen dar (Produktregister auf `origin/release` beider App-Repos). Für alle folgenden Etappen stehen das Designsystem v2 (auf einer nicht indexierten Musterseite prüfbar) und eine reproduzierbare Aufnahme-Pipeline für echte Screenshots aus einem Demo-Betrieb bereit, inklusive Medienbudget-Prüfung. Startseite, Menü und Funktionsseiten werden in dieser Phase NICHT neu gestaltet (Phasen 6/7); bestehende Seiten dürfen nicht sichtbar regredieren.

</domain>

<decisions>
## Implementation Decisions

### Demo-Betrieb für Aufnahmen
- **D-01:** Neuer, eigener Demo-Betrieb in der Produktion (app.craftos.eu). Der Inhaber registriert ihn einmal selbst (SMS-Bestätigung mit seiner Nummer, Passwort). Der Plan muss diesen Inhaberschritt als ausdrückliche Vorbedingung mit Klickpfad bzw. Browser-Prompt enthalten.
- **D-02:** Logindaten nur lokal in `C:/Projekte/Websitenerstellung/.env` (gitignoriert), Variablennamen z. B. `CRAFTOS_DEMO_EMAIL`, `CRAFTOS_DEMO_PASSWORD`; nie in Code, Logs, Commits oder Chat.
- **D-03:** Claude befüllt den Betrieb mit realistischen, erfundenen Musterdaten (keine echten Personen, Firmen oder Adressen; fiktive Namen und Musteradressen). Befüllung über die normale App-Oberfläche bzw. Import-Funktion, nicht per direktem Datenbankzugriff.

### Musterdaten
- **D-04:** Allround-Betrieb (Arbeitstitel „Musterbau GmbH“ o. ä.) mit Projekten aus Elektro, Sanitär/SHK, Maler und Trockenbau, damit jede Funktionsseite ein passendes Motiv hat. Gewerke-Seiten (Phase 9) bekommen trotzdem gewerktypische Beispiele.

### Bildaufbereitung
- **D-05:** Echte Screenshots bleiben inhaltlich unverändert (kein Retuschieren von UI-Inhalten) und werden in Desktop-/Phone-Rahmen aus dem Designsystem gezeigt.
- **D-06:** Für Hero- und Teaser-Bilder sind zusätzlich KI-Szenen erlaubt (z. B. Laptop auf Werkbank, Handy auf Baustelle), erzeugt mit ChatGPT/Codex-Bildgenerierung; der echte Screenshot wird in die Szene eingesetzt, die UI selbst wird nicht von der KI generiert.
- **D-07:** Gestellte Szenen tragen einen kleinen sichtbaren Hinweis „Darstellung“; reine Screenshots im Rahmen brauchen keinen Hinweis.

### Aus Meilenstein-Entscheidungen übernommen
- **D-08:** Design „markant, Produkt im Fokus“: Marke (Amber `primary-*`, Clash Display, General Sans, CraftOS-Logo) bleibt; große Produktbilder, Kachel-/Bento-Layouts, kurze Texte, dezente Bewegung, keine globale Scroll-Animation (vom Inhaber im Relaunch entfernt), Reduced Motion zeigt alles statisch.
- **D-09:** Interaktive Klick-Demo (`components/product-demo`) wird nicht eingesetzt, aber auch nicht gelöscht.
- **D-10:** Schrittweiser Rollout: Phase 5 endet mit Ship-Gate, Push, `npm run indexnow`, Live-Prüfung.

### Claude's Discretion
- Technik der Aufnahme-Pipeline (Playwright für Web; Mobile-App als Web-Build `craftos-mobile.vercel.app` im Phone-Viewport oder Gerätescreenshots), Dateiformate, Ordnerstruktur, Namensschema.
- Aufbau und Komponenten-API des Designsystems v2, Musterseite (z. B. `/styleguide` mit `noindex`, nicht in Sitemap).
- Umsetzung der Budget-Prüfung (Skript/Test) und des Preisabgleich-Tests gegen `src/lib/constants.ts` der Web-App.
- Formulierung und Platzierung der bereinigten Ankündigungen (Telefon-Agent, MCP-Server, Agent-Aktionen) ohne Datum.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Meilenstein und Anforderungen
- `.planning/PROJECT.md` — Meilenstein v2.0, Produktfakten, nicht-live Funktionen, Lizenznamen
- `.planning/REQUIREMENTS.md` — PROD-02..04, DESIGN-02, DESIGN-04, MEDIA-01, MEDIA-03, MEDIA-04
- `.planning/ROADMAP.md` §Phase 5 — Erfolgskriterien

### Produktwahrheit (immer `git show origin/release:<pfad>`, lokale Branches sind veraltet)
- `C:/Projekte/craft-connect-buddy` `src/lib/constants.ts` (PRICING), `src/lib/subscription/pricing.ts` (Credits), `src/pages/AGB.tsx` (netto, Testphase), `src/lib/featureFlags.ts`, `src/lib/ai/availability.ts`, `src/components/layout/AppSidebar.tsx`, `src/App.tsx` (Routen), `docs/STATUS.md` (teils veraltet)
- `C:/Projekte/CraftOS - Mobile/craftos-mobile` `src/AppRoot.tsx`, `src/features/*`, `docs/deployment/RELEASE.md`, `docs/PUSH-NOTIFICATIONS.md`

### Website (craftos/)
- `craftos/lib/funktionen.ts`, `craftos/lib/product-register.ts`, `craftos/docs/PRODUCT-REGISTER.md`, `craftos/lib/site.ts`, `craftos/lib/llms.ts`, `craftos/lib/schema.ts`
- `craftos/app/globals.css` (Tokens `@theme`), `craftos/components/ui/*`, `craftos/components/feature-snippet/*`, `craftos/docs/SNIPPET-DESIGN.md`
- `craftos/docs/PERFORMANCE.md`, `craftos/docs/RELAUNCH-ABNAHME.md` (Reduced Motion, entfernte Scroll-Animation, KI-Mockup-Kennzeichnung), `craftos/docs/MEDIA.md`, `craftos/SCREENSHOT-PLAN.md`
- `craftos/scripts/route-audit.mjs`, `craftos/scripts/visual-audit.mjs`, `craftos/scripts/performance-audit.mjs`, `craftos/tests/*`

### Projektregeln
- `CLAUDE.md` (Repo-Root) — Design-Kaskade (frontend-design → ui-ux-pro-max → 21st.dev nur Inspiration → Context7), SEO-Regeln
- `AGENTS.md` (Repo-Root)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `public/images/screenshots/*.webp` (17, Juli 2026, veraltet) und `public/images/mobile/current/*` (3 Mobile-Aufnahmen mit Mockups, AVIF/WebP via `<picture>`): Muster für Format und Einbindung, Inhalte werden ersetzt.
- `components/ui/MobileAppGallery` (picture-Element, Original-Umschalter), `PageHero`, `TrialCta`, `Faq`, `GewerkIcon`, `StoreLinks`.
- `components/feature-snippet/*` (DeviceFrame 194×410, Reduced-Motion-Logik, Sichtbarkeits-Pause) als Vorlage für Rahmen und Bewegung.
- `lib/product-register.ts` (server-only, Commit-Hashes und Evidenzpfade je Funktion) und `tests/product-register.test.ts`.

### Established Patterns
- Tailwind 4 CSS-first, Tokens in `app/globals.css` `@theme`, CSS-Module für komplexe Komponenten.
- Inhalte aus Daten-Modulen in `lib/` (funktionen, gewerke, site, comparison); Seiten sind Templates.
- Tests: Vitest (`tests/*.test.ts`, node), Playwright e2e (`tests/e2e/*.pw.cjs`, Chromium/WebKit 1440 und 390-touch), Skripte für Routen-, visuelle und Performance-Audits.

### Integration Points
- Hart kodierte Erwartungen, die bei Produktregister-Änderungen angepasst werden müssen: `tests/product-register.test.ts` (16 Funktionen), `tests/content.test.ts` (24/40), `tests/llms.test.ts`, `tests/seo-brand.test.ts`, `tests/e2e/function-illustrations.pw.cjs`, `scripts/route-audit.mjs`.
- `site.tarife` / `lib/site.ts` speist PricingTable, llms.txt und Schema (`softwareApplicationSchema` Offer 29.95).

</code_context>

<specifics>
## Specific Ideas

- Inhaber: Seite ist „langweilig, nur Schrift, hässlich“; Ziel ist Blickfang durch das echte Produkt.
- Inhaber erlaubt ausdrücklich ChatGPT/Codex für Bildgenerierung und Bildbearbeitung, um „bessere Bilder“ aus den Screenshots zu machen (begrenzt durch D-05..D-07).
- Website-Begriff „Voll-Lizenz“ bleibt nach außen, entspricht im Produkt Admin oder Büro (je 29,95 €); Extra-Speicher 0,99 €/50 GB; Credits: 150 gratis, Pakete 10/25/50/100 € (+0/10/15/20 %).

</specifics>

<deferred>
## Deferred Ideas

- Interaktive Klick-Demo wieder einsetzen (Future Requirement).
- Registrieren-Reiter per Link in der Web-App (`?tab=register`) – App-Repo, außerhalb dieses Meilensteins.

</deferred>
