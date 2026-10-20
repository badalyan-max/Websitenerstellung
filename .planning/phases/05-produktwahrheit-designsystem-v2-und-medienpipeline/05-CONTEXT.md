# Phase 5: Produktwahrheit, Keyword-Map und Designbausteine - Context

**Gathered:** 2026-10-20
**Status:** Ready for planning (Umfang am 20.10.2026 geändert)

<domain>
## Phase Boundary

**Umfang geändert am 20.10.2026 (Inhaber):** „Wir brauchen keine detailgetreuen Screenshots … einfach strukturierter und schöner, nicht Rom neu erfinden … plus SEO.“ Demo-Betrieb, Aufnahme-Pipeline und Videos entfallen.

Die Website stellt ausschließlich live verfügbare Funktionen mit korrekten Preisen dar (Produktregister auf `origin/release`). Für jede Seite steht ein datenbasiertes Hauptkeyword fest (SE Ranking Data API). Die Bausteine des Designsystems v2 für eine strukturierte, bildhafte Darstellung stehen auf einer nicht indexierten Musterseite bereit. Startseite, Menü und Funktionsseiten werden in dieser Phase NICHT neu gestaltet (Phasen 6/7); sichtbar korrigiert werden nur Produktfakten (z. B. „Demnächst“ mit vergangenen Terminen auf `/funktionen`).

</domain>

<decisions>
## Implementation Decisions

### Visuelle Elemente statt Screenshots (ersetzt frühere D-01..D-07)
- **D-01:** Kein Demo-Betrieb, keine Aufnahme-Pipeline, keine Bildschirmvideos. `CRAFTOS_DEMO_*` wird nicht benötigt.
- **D-02:** Visuelle Elemente sind vereinfachte, im Code gebaute UI-Darstellungen (Muster: `components/feature-snippet` mit DeviceFrame/Scenes), Icons, Ablaufdiagramme, Kennzahlen und vorhandene Fotos aus `public/images`. Sie zeigen nur Live-Funktionen und keine erfundenen Zahlen oder Bedienelemente.
- **D-03:** Bestehende Seitenstruktur und Inhalte bleiben die Basis („nicht Rom neu erfinden“): umgliedern, kürzen, visualisieren statt neu schreiben.
- **D-04:** Optional KI-generierte Szenenbilder (ChatGPT/Codex) nur für Hero/Teaser, sichtbar als „Darstellung“ gekennzeichnet; kein Muss.

### SEO-Daten
- **D-05:** Keyword-Quelle ist die SE Ranking Data API (`SE_RANKING_API_KEY` in `.env`, Header `Authorization: Token …`, Basis `https://api.seranking.com/v1`, JSON-Body bei POST, Ratenlimit beachten). Testzugang bis 03.11.2026 mit 100.000 Units – Keyword-Map vorher abschließen und Rohdaten lokal sichern. Der MCP-Server `se-ranking` ist eingetragen, braucht aber OAuth-Anmeldung des Inhabers per `/mcp`.
- **D-06:** Erstbefund 20.10.2026 (SE Ranking, DE): craftos.eu 1 Keyword in den Top 100, Traffic ≈ 0. Wettbewerber-Keywords: streit-software.de 38.873, hero-software.de 17.805, plancraft.com 4.607, craftnote.de 4.376, das-programm.io 3.400, openhandwerk.de 2.590, label-software.de 1.385. Größte erreichbare Begriffe (Volumen/KD): handwerkersoftware 1.300/55, bautagebuch app 590/7, aufmaß app 590/12, handwerker software 410/33, zeiterfassung handwerk 390/12, handwerker stundensatz 320/6, baustellen app 260/15, rechnungssoftware handwerker 210/18, shk software 210/7, digitale bauakte 170/7, auftragsverwaltung software 170/9, gaeb software 140/18, maler/trockenbau software 140/≤10. Wettbewerber-Marken (plancraft 9.900, hero software 5.400, tooltime 4.400, craftnote 3.100) sind Grundlage für Alternativen-Seiten. plancraft gewinnt viel Volumen über Hilfeartikel (Schlussrechnung, Leistungszeitraum, Regiebericht, Bautagesbericht, Aufmaß).
- **D-07:** Je Seite genau ein Hauptkeyword; Lücken mit Nachfrage und niedriger Schwierigkeit (KD < 20) werden als neue Seiten oder Abschnitte für Phasen 6–9 vorgemerkt.

### Aus Meilenstein-Entscheidungen übernommen
- **D-08:** Design „markant, Produkt im Fokus“: Marke (Amber `primary-*`, Clash Display, General Sans, CraftOS-Logo) bleibt; große Produktdarstellungen, Kachel-/Bento-Layouts, kurze Texte, dezente Bewegung, keine globale Scroll-Animation (vom Inhaber im Relaunch entfernt), Reduced Motion zeigt alles statisch.
- **D-09:** Interaktive Klick-Demo (`components/product-demo`) wird nicht eingesetzt, aber auch nicht gelöscht.
- **D-10:** Schrittweiser Rollout: Phase 5 endet mit Ship-Gate, Push, `npm run indexnow`, Live-Prüfung.

### Claude's Discretion
- Aufbau der vereinfachten UI-Darstellungen und Wiederverwendung der feature-snippet-Szenen.
- Format und Ort der Keyword-Map (z. B. `craftos/docs/seo/KEYWORD-MAP.md` plus Datenmodul) und des Rohdaten-Abzugs.
- Aufbau und Komponenten-API des Designsystems v2, Musterseite (z. B. `/styleguide` mit `noindex`, nicht in Sitemap).
- Umsetzung der Budget-Prüfung (Skript/Test) und des Preisabgleich-Tests gegen `src/lib/constants.ts` der Web-App.
- Formulierung und Platzierung der bereinigten Ankündigungen (Telefon-Agent, MCP-Server, Agent-Aktionen) ohne Datum.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Meilenstein und Anforderungen
- `.planning/PROJECT.md` — Meilenstein v2.0, Produktfakten, nicht-live Funktionen, Lizenznamen
- `.planning/REQUIREMENTS.md` — PROD-02..04, SEO-02, DESIGN-02, DESIGN-04, MEDIA-03, MEDIA-04
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
