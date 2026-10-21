---
phase: 06-startseite-navigation-und-funktions-bersicht
plan: 03
subsystem: navigation
tags: [navigation, mega-menue, disclosure, barrierefreiheit, client-insel, tdd, vitest, playwright, axe]

# Dependency graph
requires:
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-01: getFunktionsgruppen(), menuFooterLinks, GRUPPEN_REIHENFOLGE (lib/funktionsgruppen.ts), TEXT_BUDGET.menuGroup.description"
  - phase: 06-startseite-navigation-und-funktions-bersicht
    provides: "06-02: Kaskade Phase 6 in docs/DESIGN-V2.md, v2-Klassen (.v2-btn-cta)"
provides:
  - "craftos/lib/navigation.ts (server-only): NavId, NavLink, NavItem, getHauptnavigation(), checkNavigationTargets()"
  - "craftos/components/layout/MegaMenu.tsx (+ .module.css): MegaMenu (6 Gruppen, 16 Funktionslinks, Fußleiste) und LinkPanel, Server Components"
  - "craftos/components/layout/ActiveLink.tsx: aria-current=page, prefetch=false, einziges Client-Blatt im Panel"
  - "craftos/components/layout/HeaderShell.tsx: einzige Client-Insel der Navigation (HeaderNavItem, HeaderShell)"
  - "craftos/components/layout/Header.tsx: Server-Header mit Slot-Panels und noscript-Fallback"
  - "craftos/tests/e2e/home-navigation.pw.cjs: Menü-, No-JS-, CLS- und axe-Prüfungen (Präfixe „Menü:“, „ohne JavaScript:“, „axe:“)"
  - "craftos/docs/DESIGN-V2.md §13: Kaskade Hauptnavigation"
affects: [06-04 Startseite (Above-the-fold- und Zwei-Klick-Tests in home-navigation.pw.cjs), 06-05 /funktionen (Gruppenanker), Phase 7 (neue Seiten im Menü über lib/navigation.ts)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component als Slot einer Client-Hülle: Menüdaten bleiben serverseitig, Client steuert nur Zustand"
    - "WAI-APG Disclosure Navigation with Top-Level Links: Link + Schalter „Untermenü {Hauptpunkt}“, kein role=menu"
    - "Routenwechsel-Reset per Vergleich mit dem letzten Pfad während des Renderns (statt setState im Effekt)"
    - "noscript-Stil als statische Konstante über data-Attribute (data-nav-toggle, data-nav-disclosure, data-site-header)"

key-files:
  created:
    - craftos/lib/navigation.ts
    - craftos/components/layout/MegaMenu.tsx
    - craftos/components/layout/MegaMenu.module.css
    - craftos/components/layout/ActiveLink.tsx
    - craftos/components/layout/HeaderShell.tsx
    - craftos/tests/navigation.test.ts
    - craftos/tests/e2e/home-navigation.pw.cjs
  modified:
    - craftos/components/layout/Header.tsx
    - craftos/components/layout/Header.module.css
    - craftos/app/globals.css
    - craftos/lib/site.ts
    - craftos/tests/pricing-parity.test.ts
    - craftos/tests/e2e/navigation.pw.cjs
    - craftos/tests/e2e/playwright.config.cjs
    - craftos/docs/DESIGN-V2.md

key-decisions:
  - "06-03: Nur das Mega-Menü „Funktionen“ ist breit und am Header zentriert; das Gewerke-Panel (570 px) hängt wie im Bestand an seinem Hauptpunkt, damit Hover beim Weg ins Panel im <li> bleibt (WCAG 1.4.13)"
  - "06-03: onBlur am Hauptpunkt schließt nur bei bekanntem Fokusziel außerhalb; Fokusverlust ohne Ziel (WebKit beim Linkklick) schließt nicht, Außenklicks schließen über pointerdown"
  - "06-03: Haupt- und Panel-Links tragen tabIndex 0 wie im Bestand, damit WebKit sie in die Tab-Reihenfolge aufnimmt"
  - "06-03: Logo nimmt seine Inhaltsbreite ein; zwischen 1121 und 1250 px Lücke der Hauptpunkte 12 px statt 16 px und CTA-Innenabstand 16 px (Windows-Scrollleiste)"

patterns-established:
  - "Menüziele werden im Vitest per checkNavigationTargets gegen sitemap() geprüft; gültig sind Sitemap-Pfade und /funktionen#<GruppenId>"
  - "E2E-Tests der Navigation filtern über Testnamen-Präfixe (Menü:/ohne JavaScript:/axe:)"

requirements-completed: []

# Metrics
duration: 25min
completed: 2026-10-21
---

# Phase 6 Plan 03: Hauptnavigation mit Mega-Menü, HeaderShell und Drawer Summary

**Server-Header mit server-gerendertem Mega-Menü „Funktionen“ (sechs Arbeitsablauf-Gruppen, 16 Funktionslinks, Fußleiste) als Slot der einzigen Client-Insel HeaderShell, Disclosure-Muster nach WAI-APG, mobilem Drawer mit vorgeöffneter Gruppe „Funktionen“, No-JS-Fallback und 234 grünen Browserfällen.**

## Performance

- **Duration:** ca. 25 min
- **Started:** 2026-10-21T12:36:00Z
- **Completed:** 2026-10-21T13:00:23Z
- **Tasks:** 3
- **Files modified:** 15 (7 neu, 8 geändert)

## Accomplishments

- `lib/navigation.ts` (server-only) liefert die fünf Hauptpunkte Funktionen, Gewerke, Preise, Wissen, Hilfe mit Präfixen für den aktuellen Bereich und prüft alle Menüziele gegen die Sitemap (UI-SPEC-Fehlertext).
- `MegaMenu` rendert serverseitig sechs Gruppen mit Icon (aria-hidden), Kurzbeschreibung (Budget geprüft), Gruppenlink auf `/funktionen#<gruppe>` und den Detailfunktionen als direkte Links; Fußleiste Alle Funktionen, Mobile-App, Craft AI, GoBD & Nachvollziehbarkeit, Warum CraftOS?; kein `role="menu"`, keine Überschriften, keine Vorschaubilder.
- `HeaderShell` übernimmt die Bestandslogik (Breakpoint-Reset, Scroll-Lock mit Rückstellung, Esc mit Fokusrückgabe, Außenklick, Fokus außerhalb, Hover nur per Maus, Klick nach Hover hält offen, Pfeil runter) und ergänzt Mehrfachöffnung im Drawer, Vorgeöffnung „Funktionen“, Schließen bei Linkklick (Delegation) und Routenwechsel.
- „Anmelden“ trägt `data-track="login"`, der CTA „{trialDays} Tage testen“ zeigt auf `site.ctaUrl` ohne Login-Markierung (E2E geprüft); `scrollbar-gutter: stable` verhindert den Sprung von `main` beim Scroll-Lock.
- Ohne JavaScript sind Hauptpunkte, Anmelden und CTA sichtbar (mobil statisch unter dem Header), alle 16 Funktionslinks stehen im HTML.
- Kein Datenmodul im Client-Bundle: `npm run build` grün trotz `server-only` in lib/navigation.ts und lib/funktionsgruppen.ts; Gruppenbeschreibungen und Zusatzfunktionsnamen kommen in `.next/static/chunks` nicht vor.

## Task Commits

1. **Task 1: Navigationsmodell, MegaMenu und ActiveLink (TDD)**
   - RED `5080b98` test(06-03): add failing tests for navigation model, MegaMenu and ActiveLink
   - GREEN `6b5514b` feat(06-03): add navigation model, server MegaMenu and ActiveLink
2. **Task 2: Server-Header, HeaderShell, Drawer, No-JS, Scroll-Lock** – `e30bfa7` feat(06-03): server header with HeaderShell client island, drawer and no-JS fallback
3. **Task 3: Browserprüfungen**
   - `915ce78` fix(06-03): keep panel open on WebKit link click, tabbable links, narrow header fit
   - `e91fe2a` test(06-03): browser checks for disclosure menu, drawer, no-JS, CLS and axe
   - `1967556` docs(06-03): record design cascade and visual check for main navigation

## Prüfergebnisse (lokal, 21.10.2026)

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run tests/navigation.test.ts tests/funktionsgruppen.test.ts` | 33 bestanden |
| `npx vitest run tests/navigation.test.ts tests/tracking.test.ts tests/announcements.test.ts tests/pricing-parity.test.ts` | 48 bestanden |
| `npm test` (volle Vitest-Suite) | 23 Dateien, 304 Tests bestanden |
| `npm run typecheck` / `npm run lint` | grün / „No issues found“ |
| `npm run build` | grün (letzter Lauf nach allen Änderungen) |
| `npm run test:e2e` gegen `next start -p 3100` (alle testMatch-Dateien inkl. navigation.pw.cjs und home-navigation.pw.cjs, Chromium und WebKit je 1440 und 390-touch) | **234 bestanden, 0 fehlgeschlagen, 34 übersprungen** (projektbedingte Skips), 4,0 min |
| Port 3100 nach dem Lauf | frei; Server über eigene PID beendet |

Koordinationsstatus vor den schweren Läufen gelesen (edgar bereit, edgarspc veraltet); für die Marketing-Website gibt es kein Rezept, daher lokal und je ein schwerer Prozess.

## Akzeptanzkriterien (grep)

- `head -1 craftos/lib/navigation.ts` = `import "server-only";`
- `use client`: MegaMenu 0, ActiveLink 1, Header 0, HeaderShell 1
- `role="menu|menuitem|menubar` in MegaMenu.tsx: 0
- verbotene Datenimporte in ActiveLink.tsx und HeaderShell.tsx: 0
- `color: #f2af38` in MegaMenu.module.css: 1 (nur Drawer-Icon), `text-decoration-color`: 0; `#f2af38` in Header.module.css: 0
- HeaderShell: `data-track="login"` 1, `site.trialDays` 1, „Untermenü“ 2, „navigation-“ 4; Header: `noscript` 1
- `scrollbar-gutter: stable` in globals.css: 1; `export const nav|demoUrl` in site.ts: 0; HeaderShell in pricing-parity: 1
- playwright.config: `home-navigation.pw.cjs` 1; Testnamen-Präfixe in home-navigation.pw.cjs: 5
- navigation.pw.cjs: „Untermenü Funktionen“ 3, `name: 'Produkt'` 0, `/funktionen#angebot` 1; keine Erwartung `aria-expanded="false"` für Funktionen nach dem Öffnen von Gewerke

## Decisions Made

Siehe `key-decisions` im Frontmatter. Zusätzlich: Der Routenwechsel-Reset vergleicht den Pfad mit dem zuletzt gesehenen während des Renderns (React-Muster „Zustand bei Prop-Änderung anpassen“), weil `eslint-plugin-react-hooks` 7 `setState` direkt im Effekt bemängelt.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] WebKit schloss das Panel beim Mausklick auf einen Panel-Link**
- **Found during:** Task 3 (home-navigation „Menü: Tastatur …“, webkit-1440)
- **Issue:** Nach Tastaturöffnung blurrt WebKit den fokussierten Schalter beim Mausdruck auf einen Link mit `relatedTarget = null`; das übernommene `onBlur` schloss das Panel vor dem Klick, die Navigation fand nicht statt.
- **Fix:** `onBlur` schließt nur noch bei bekanntem Fokusziel außerhalb des `<li>`; Außenklicks schließen weiter über `pointerdown`, Fokus außerhalb über `focusin`.
- **Files modified:** craftos/components/layout/HeaderShell.tsx
- **Commit:** 915ce78

**2. [Rule 1 - Bug] WebKit-Tab erreichte die Panel-Links nicht**
- **Found during:** Task 3 (navigation.pw.cjs Desktop-Test, webkit-1440)
- **Issue:** WebKit nimmt Links ohne `tabIndex` nicht in die Tab-Reihenfolge; der Bestand hatte `tabIndex={0}` an allen Navigationslinks.
- **Fix:** `tabIndex={0}` an Hauptpunkt-Links (HeaderShell) und in `ActiveLink` (Props-Vertrag unverändert).
- **Files modified:** craftos/components/layout/HeaderShell.tsx, craftos/components/layout/ActiveLink.tsx
- **Commit:** 915ce78

**3. [Rule 1 - Bug] Kopfzeile bei 1121 px: Logo-Schriftzug unter „Funktionen“, Store-Links umgebrochen**
- **Found during:** Task 3 (Sichtprüfung per Screenshot und Geometriemessung)
- **Issue:** Das Logo war auf 138/154 px fixiert, der Schriftzug ist breiter; durch die zusätzlichen Chevron-Schalter und die Windows-Scrollleiste brachen die Store-Links um (Headerhöhe 94 statt 85 px).
- **Fix:** `.logo { width: auto }`; zwischen 1121 und 1250 px Hauptpunkt- und Nav-Lücke 12 px, Aktionen 12 px, CTA-Innenabstand 16 px. Gemessen in Chromium und WebKit bei 1121/1180/1251/1440 px: Headerhöhe 85 px, 16 px Abstand Logo → „Funktionen“.
- **Files modified:** craftos/components/layout/Header.module.css
- **Commit:** 915ce78

**4. [Rule 3 - Blocking] Lint-Regel `react/no-children-prop` im Unit-Test**
- **Found during:** Task 1
- **Fix:** ActiveLink im Test mit typisierten Props und Kind als drittem `createElement`-Argument gerendert.
- **Commit:** 6b5514b

### Bewusste Anpassungen gegenüber dem Planwortlaut

- **`wide` nur für Funktionen** statt „Funktionen und Gewerke“: Ein am Header zentriertes Gewerke-Panel läge nicht unter seinem Hauptpunkt, der Hover-Weg ins Panel verließe das `<li>` (WCAG 1.4.13). Gewerke behält die Bestandsbreite 570 px am Hauptpunkt, wie es UI-SPEC Z. 400 für Gewerke/Wissen/Hilfe vorsieht. Dokumentiert als N1 in DESIGN-V2.md §13.
- **Animationsprüfung im CLS-Test auf den Header begrenzt:** Die alte Startseite enthält bis Plan 06-04 noch FeatureSnippet-Szenen mit einer `tab-size`-Transition, die WebKit als laufende Animation meldet; sie entfallen mit 06-04 (D-04). Geprüft wird `document.getAnimations()` gefiltert auf Elemente im `header`. Plan 06-04 kann den Filter nach dem Umbau der Startseite entfernen.
- **Layout-Shift nur in Chromium messbar:** WebKit unterstützt keine `layout-shift`-Einträge; der Test vermerkt das als Annotation und prüft dort nur die Animationen.

### Geänderte Bestandserwartungen (D-05/D-06/D-17)

In `tests/e2e/navigation.pw.cjs`: „Produkt“ entfällt, Schalter heißen „Untermenü {Hauptpunkt}“; Drawer öffnet mit aufgeklappter Gruppe „Funktionen“ ohne Tap; nach dem Öffnen von Gewerke bleibt Funktionen offen (vorher `false`/`toBeHidden`); erster Panel-Link ist „Angebot“ (`/funktionen#angebot`) statt „Alle Funktionen“; ergänzt: Klick auf den Schalter nach Hover hält das Panel offen.

### Sonstiges

- `lib/site.ts`: `nav` und `demoUrl` entfernt; einziger Importeur von `nav` ist der Referenzordner `craftos/_seo-referenz/` (von tsconfig, ESLint und Build ausgeschlossen, nicht ausgeliefert).

## Design-Kaskade

frontend-design gelesen (byte-identisch mit dem Phase-5-Stand), ui-ux-pro-max `--domain ux` ausgeführt, 21st.dev und Context7 nicht verfügbar (Ersatz: mitgelieferte Next-Doku). Nachweis in `craftos/docs/DESIGN-V2.md` §13. Sichtprüfung per Playwright-Screenshots (nicht eingecheckt) im Scratchpad: Mega-Menü 1440/1121, Gewerke- und Hilfe-Panel 1440, Drawer 390/768, ohne JavaScript 390/1440.

## Issues Encountered

Keine offenen; alle Befunde siehe Abweichungen.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche außerhalb des Threat-Modells: T-06-07 (Importverbot, server-only, Build grün), T-06-08 (NOSCRIPT_CSS statische Konstante), T-06-09 (Anmelden/CTA per E2E), T-06-10 (`prefetch={false}` in ActiveLink), T-06-11 (`checkNavigationTargets` gegen `sitemap()`) umgesetzt.

## Next Phase Readiness

Plan 06-04 kann die Startseite umbauen und `home-navigation.pw.cjs` um „Above the fold“ und „Zwei Klicks“ erweitern; nach dem Entfernen der FeatureSnippets kann der Header-Filter der Animationsprüfung entfallen. DESIGN-01, DESIGN-03 und FEAT-01 werden erst in 06-06 abgeschlossen; DESIGN-02 und SEO-02 bleiben „In Progress“.

## Self-Check: PASSED

Alle 15 Dateien vorhanden; Commits 5080b98, 6b5514b, e30bfa7, 915ce78, e91fe2a, 1967556 im Log.

---
*Phase: 06-startseite-navigation-und-funktions-bersicht*
*Completed: 2026-10-21*
