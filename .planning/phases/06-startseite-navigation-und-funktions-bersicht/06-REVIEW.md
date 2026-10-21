---
phase: 06-startseite-navigation-und-funktions-bersicht
reviewed: 2026-10-21T00:00:00Z
depth: deep
diff: "git diff origin/main..HEAD -- craftos ':!craftos/docs' ':!craftos/public'"
files_reviewed: 49
files_reviewed_list:
  - craftos/app/funktionen/page.tsx
  - craftos/app/globals.css
  - craftos/app/page.tsx
  - craftos/app/styleguide/page.tsx
  - craftos/components/funktionen/FunktionenHead.module.css
  - craftos/components/funktionen/FunktionenHead.tsx
  - craftos/components/home/Hero.tsx
  - craftos/components/home/HomeHero.module.css
  - craftos/components/home/HomeHero.tsx
  - craftos/components/layout/ActiveLink.tsx
  - craftos/components/layout/Header.module.css
  - craftos/components/layout/Header.tsx
  - craftos/components/layout/HeaderShell.tsx
  - craftos/components/layout/MegaMenu.module.css
  - craftos/components/layout/MegaMenu.tsx
  - craftos/components/v2/BentoGrid.module.css
  - craftos/components/v2/BrowserFrame.tsx
  - craftos/components/v2/DevicePair.tsx
  - craftos/components/v2/FeatureList.module.css
  - craftos/components/v2/FeatureList.tsx
  - craftos/components/v2/Frames.module.css
  - craftos/components/v2/PhoneFrame.tsx
  - craftos/components/v2/SceneContent.tsx
  - craftos/components/v2/budgets.ts
  - craftos/components/v2/evidence.ts
  - craftos/lib/format.ts
  - craftos/lib/funktionen.ts
  - craftos/lib/funktionsgruppen.ts
  - craftos/lib/home-content.ts
  - craftos/lib/navigation.ts
  - craftos/lib/scenes.ts
  - craftos/lib/schema.ts
  - craftos/lib/site.ts
  - craftos/lib/styleguide-content.ts
  - craftos/tests/design-v2-budgets.test.ts
  - craftos/tests/design-v2-components.test.ts
  - craftos/tests/design-v2-frames.test.ts
  - craftos/tests/e2e/design-v2.pw.cjs
  - craftos/tests/e2e/function-illustrations.pw.cjs
  - craftos/tests/e2e/home-navigation.pw.cjs
  - craftos/tests/e2e/navigation.pw.cjs
  - craftos/tests/e2e/playwright.config.cjs
  - craftos/tests/funktionen-seite.test.ts
  - craftos/tests/funktionsgruppen.test.ts
  - craftos/tests/home.test.ts
  - craftos/tests/keyword-map.test.ts
  - craftos/tests/navigation.test.ts
  - craftos/tests/pricing-parity.test.ts
  - craftos/tests/seo-brand.test.ts
findings:
  critical: 0
  warning: 4
  info: 10
  total: 14
severity_breakdown:
  critical: 0
  high: 0
  medium: 4
  low: 10
status: issues_found
---

# Phase 6: Code Review Report

**Reviewed:** 2026-10-21
**Depth:** deep (cross-file: Header → HeaderShell/MegaMenu/ActiveLink → lib/navigation, lib/funktionsgruppen → product-register/funktionen; home-content → scenes/styleguide-content/site; Tests gegen Sitemap)
**Files Reviewed:** 49
**Status:** issues_found

Schwere-Zuordnung: **critical/high** = Frontmatter `critical` (BLOCKER), **medium** = `warning`, **low** = `info`.

## Summary

Geprüft wurden alle 49 Quelldateien der Phase 6 (ohne `craftos/docs`, `craftos/public`) samt aufgerufener Module außerhalb des Diffs (`lib/product-register.ts`, `lib/site.ts`, `lib/metadata.ts`, `app/layout.tsx`, `components/v2/KeyFacts.tsx`, `StepFlow`, `CtaBand`, `SectionHeader`, `StoreLinks`, `next.config.js`, verbleibende E2E-Dateien).

Keine Befunde der Stufen critical oder high. Die geforderten Schwerpunkte halten im Kern:

- **Server/Client-Grenze:** `lib/funktionsgruppen.ts`, `lib/navigation.ts` und `lib/product-register.ts` tragen `import "server-only"`. Kein `"use client"`-Modul importiert Daten- oder Budgetmodule; Panels werden auf dem Server gerendert und als Slot (`panel: ReactNode`) an `HeaderShell` übergeben. Zusätzliche Client-Blätter sind nur `ActiveLink` (siehe L-10).
- **Hydration:** `window.matchMedia` wird nur in Handlern und Effekten gelesen. Der Routenwechsel-Reset nutzt das zulässige Render-Phasen-Muster mit `lastPath`. Initiale `aria-expanded`/`hidden`-Werte sind auf Server und Client identisch.
- **Disclosure (WAI-APG):** `aria-expanded` und `aria-controls` sind korrekt, Panels bleiben über `hidden` immer im DOM. Esc gibt den Fokus an Schalter bzw. Toggle zurück, `focusin`/`pointerdown` außerhalb schließen. Der Scroll-Lock wird beim Schließen und beim Breakpoint-Wechsel aufgeräumt. Die WebKit-Korrekturen (`tabIndex={0}`, `onBlur` nur mit bekanntem Ziel) sind vorhanden, und die No-JS-Regeln greifen über `[data-*]`/`#hauptnavigation`.
- **SEO:** Der Title von `/` ist vollständig ohne Template. Next.js wendet `title.template` nicht im eigenen Segment an, das wird in `seo-brand.test.ts` geprüft. Die H1 enthält „Handwerkersoftware“, `/funktionen` hat „Software für Handwerksbetriebe: alle Funktionen | CraftOS“. FAQPage entspricht `faqContent`, das genau so sichtbar gerendert wird. SoftwareApplication bleibt netto (`valueAddedTaxIncluded: false`). BreadcrumbList und ItemList verwenden absolute URLs, und die Anker `#<gruppe>` existieren als H2-IDs.
- **Tracking:** Die Anmelden-Links behalten `data-track="login"`. Der Hero-CTA hat `data-track="trial"`, Header-CTA und CtaBand zeigen auf `site.ctaUrl` und werden über `classifyAppLink` als `trial_click` gezählt.
- **Produktwahrheit:** „Vorhersagen“ (`advertised: false`) wird gefiltert, und jeder beworbene Registereintrag ohne Zuordnung bricht den Build ab. Preise kommen ausschließlich aus `tarife` über `euro()`, und die Testtage aus `site.trialDays`.
- **CSS:** Die entfernten Klassen `.home-*`, `.feature-grid`, `.feature-link` und `.flow-*` werden nirgends mehr verwendet; die einzige Fundstelle ist ein Kommentar in `StepFlow.module.css`. `site.nav` und `site.demoUrl` haben keine Verwender mehr. Animationen haben eine `prefers-reduced-motion`-Ausnahme.

Die Befunde betreffen eine Link-Erkennbarkeit, einen globalen Esc-Handler, verwaiste Demo-Tests/-Code, ungeprüfte Linkziele der Zusatzfunktionen sowie mehrere kleinere Robustheits- und Testqualitätsthemen.

## Narrative Findings (AI reviewer)

## Warnings (medium)

### WR-01 (medium): Verlinkte Zusatzfunktionen sind optisch nicht als Link erkennbar; der Fokusrahmen erscheint auch bei Mausklick

**File:** `craftos/components/v2/FeatureList.module.css:62-67, 31-34, 97-104` (Rendering: `craftos/components/v2/FeatureList.tsx:59-65`)
**Issue:** `.link` setzt `text-decoration-color: transparent` und hat dieselbe Farbe und dasselbe Gewicht wie der nicht verlinkte `.name`. Die Unterstreichung erscheint nur unter `@media (hover: hover)` beim Überfahren. Auf Touch-Geräten und für Tastaturnutzer sind verlinkte und nicht verlinkte Zeilen identisch. Unterscheidbar sind sie nur über die kleine Zusatzzeile „Anleitung in der Hilfe“ bzw. „Beschrieben unter …“, die selbst kein Link-Styling hat. Das verletzt WCAG 1.4.1 (Link nur durch Kontext erkennbar), und auf `/funktionen` wirken die gestreckten Klickflächen wie unerwartete Navigation. Außerdem ist `.item:focus-within` kein `:focus-visible`: In Chromium bekommt der Link beim Mausklick Fokus, sodass der 3-px-Amber-Rahmen auch für Mausnutzer aufblitzt.
**Fix:**
```css
.link { text-decoration-color: currentColor; } /* dauerhaft unterstrichen, 1 px */
@media (hover: hover) { .item[data-linked="true"]:hover .link { text-decoration-thickness: 2px; } }
.item:has(.link:focus-visible) { outline: 3px solid #bb7609; outline-offset: 4px; }
/* .item:focus-within entfernen */
```

### WR-02 (medium): Globaler Esc-Handler stiehlt den Fokus und ruft `preventDefault`, auch wenn der Fokus gar nicht im Header liegt

**File:** `craftos/components/layout/HeaderShell.tsx:114-123`
**Issue:** Solange ein Panel offen ist, auch nur per Maus-Hover, hängt `onEscape` am `document`. Er ruft bei jedem Esc `preventDefault()` auf und setzt den Fokus auf den Untermenü-Schalter, egal wo der Fokus gerade steht. Beispiel: Die Maus ruht über „Funktionen“ (Panel per Hover offen), während der Nutzer in einem Rechner-Eingabefeld (`/rechner/*`) oder in einem `<dialog>`/Overlay Esc drückt. Dann springt der Fokus in die Navigation, und das native Esc-Verhalten (Dialog-`cancel`, Eingabe leeren) wird unterdrückt. Nach WAI-APG gehört die Fokusrückgabe nur dazu, wenn der Fokus im Disclosure-Bereich liegt. Die Logik stammt aus dem Bestand, ist aber neu implementiert und wird durch Hover-Öffnung des großen Mega-Menüs häufiger ausgelöst.
**Fix:**
```ts
function onEscape(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  const inside = headerRef.current?.contains(document.activeElement) ?? false;
  close();
  if (!inside && !open) return;            // Hover-Panel schließen, Fokus nicht anfassen
  event.preventDefault();
  const button = open ? toggleRef.current : firstExpanded ? groupButtons.current[firstExpanded] : null;
  button?.focus({ preventScroll: true });
}
```

### WR-03 (medium): Startseiten-Demo entfernt, aber `ProductDemo` und zwei E2E-Dateien bleiben verwaist und sind nun falsch

**File:** `craftos/tests/e2e/demo-planning.pw.cjs:9-10, 76`; `craftos/tests/e2e/mobile-step-flow.pw.cjs:16-17`; `craftos/components/product-demo/ProductDemo.tsx` (≈ 98 KB) + `ProductDemo.module.css` (≈ 63 KB) + `PlanningBoard.*`; `craftos/tests/demo.test.ts:4`
**Issue:** Die Phase entfernt `components/home/Hero.tsx` und damit den einzigen Seiten-Verwender von `ProductDemo`. Kein `app/`- oder `components/`-Modul importiert `components/product-demo/*` noch; der Code lebt nur noch durch `tests/demo.test.ts` weiter, das tote Komponenten grün testet. `demo-planning.pw.cjs` und `mobile-step-flow.pw.cjs` öffnen weiter `/` und erwarten `[data-product-demo]`, das es dort nicht mehr gibt. Sie stehen nicht in `testMatch`, schlagen aber bei manueller Ausführung fehl und täuschen eine bestehende Abdeckung vor. Ebenso fehlen `.home-collaboration` und die Illustrationen auf `/`; der zugehörige Test wurde korrekt entfernt.
**Fix:** Die Dateien `components/product-demo/*`, `tests/demo.test.ts`, `tests/e2e/demo-planning.pw.cjs` und `tests/e2e/mobile-step-flow.pw.cjs` entfernen oder archivieren (`*.archive.cjs` wie die bestehenden Archive), oder die Demo bewusst auf `/styleguide` weiterführen und die Tests dorthin umstellen. Danach `fallow`/`knip` erneut laufen lassen.

### WR-04 (medium): Linkziele der Zusatzfunktionen werden nicht gegen die Sitemap geprüft

**File:** `craftos/lib/funktionsgruppen.ts:215-299` (`ZUSATZ[*].target.href`); `craftos/tests/navigation.test.ts:70-78`; `craftos/tests/funktionsgruppen.test.ts:105-132`
**Issue:** `checkNavigationTargets` prüft Hauptpunkte, Link-Panels, Gruppenanker, Detail-Hrefs und die Fußleiste, aber **nicht** `group.extras[].target.href`. Diese Ziele werden auf `/funktionen` als `<Link>` gerendert (`FeatureList.tsx:60`). Sechs davon zeigen auf Hilfeartikel (`/hilfe/gaeb-importieren`, `/hilfe/projekt-phasen-anlegen`, `/hilfe/mangel-erfassen-bearbeiten`, `/hilfe/abnahme-dokumentieren`, `/hilfe/bautagesbericht-erstellen`, `/hilfe/wareneingang-buchen`). `funktionsgruppen.test.ts` vergleicht sie nur mit fest eingetragenen Erwartungswerten. Wird ein Hilfeartikel umbenannt oder entfernt, bleiben beide Tests grün und `/funktionen` liefert einen 404-Link. Der Kommentar in `funktionsgruppen.ts:204` („Linkziel nur auf bestehende Routen der Sitemap“) wird damit nicht durchgesetzt. Aktuell existieren alle sechs Artikel unter `content/hilfe/`.
**Fix:** In `tests/navigation.test.ts:72-76` ergänzen:
```ts
...gruppen.flatMap((g) => g.extras.flatMap((x) => (x.target ? [x.target.href] : []))),
```

## Info (low)

### IN-01 (low): `onBlur` schließt bei `relatedTarget === null` nie, und Klicks auf nicht fokussierbare Header-Flächen schließen ebenfalls nicht

**File:** `craftos/components/layout/HeaderShell.tsx:204-211, 111-113`
**Issue:** Die WebKit-Korrektur (06-03) lässt das Panel offen, wenn der Fokus ohne Ziel verloren geht. Wird ein Panel per Tastatur geöffnet und der Fokus verlässt das Dokument (Adressleiste, Tab-Wechsel, Tab über das letzte Element hinaus in die Browser-UI), bleibt das Desktop-Panel offen und überdeckt den Inhalt bei der Rückkehr. Ein Klick auf eine nicht fokussierbare Fläche **im** Header, etwa einen leeren Bereich oder das Inner-Padding, schließt auch nicht, weil `onOutside` nur außerhalb von `headerRef` greift.
**Fix:** Bei `relatedTarget === null` in einem `requestAnimationFrame` prüfen, ob `document.activeElement` noch im `<li>` liegt bzw. `document.hasFocus()` gilt, und sonst schließen. Alternativ `pointerdown` innerhalb des Headers, aber außerhalb aller `<li>`, ebenfalls schließen lassen.

### IN-02 (low): Modifizierte Klicks (Strg/Cmd/Shift/Mittelklick über `auxclick`) schließen Drawer und Panel

**File:** `craftos/components/layout/HeaderShell.tsx:179-181`
**Issue:** `onClick` am `<nav>` schließt bei jedem Klick auf einen Link, auch bei „In neuem Tab öffnen“ per Strg/Cmd-Klick. Die Seite bleibt, das Menü ist zu, und der Nutzer muss es erneut öffnen, um weitere Links in Tabs zu öffnen.
**Fix:** `if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;` vor `closeNavigation()`.

### IN-03 (low): Vollflächiger Mobile-Drawer ist nicht modal

**File:** `craftos/components/layout/HeaderShell.tsx:174-182`; `craftos/components/layout/Header.module.css:60`
**Issue:** Der Drawer überdeckt die gesamte Seite (`position: fixed; inset`). `main` und `footer` bleiben jedoch für den virtuellen Cursor von VoiceOver und TalkBack erreichbar, weil sie weder `inert` noch `aria-hidden` sind. Wischgesten lesen dann unsichtbaren Seiteninhalt vor, ohne dass ein `focusin` den Drawer schließt. Das Verhalten ist aus dem Bestand übernommen, aber durch den nun deutlich längeren Drawer (Funktionen standardmäßig aufgeklappt) relevanter.
**Fix:** Solange `open && isMobile()` gilt, `document.querySelector("main")` und den Footer per `inert` sperren (im Scroll-Lock-Effekt setzen und im Cleanup entfernen).

### IN-04 (low): Builder erkennt doppelte Zuordnungen nicht

**File:** `craftos/lib/funktionsgruppen.ts:348-355, 392`
**Issue:** Steht ein Slug in zwei Gruppen von `DETAIL_ZUORDNUNG` oder existiert er doppelt in `lib/funktionen.ts`, wirft `buildFunktionsgruppen` nicht. Die Folgen wären doppelte Menüeinträge, doppelte `ListItem`s im ItemList-JSON-LD und doppelte React-Keys (`key={d.slug}`). Ebenso können zwei Registernamen über `REGISTER_IDS` auf dieselbe id zeigen und die Zusatzfunktion doppelt erscheinen lassen.
**Fix:** Vor dem Aufbau prüfen, dass `GRUPPEN_REIHENFOLGE.flatMap(id => DETAIL_ZUORDNUNG[id])` keine Duplikate enthält, dass `input.funktionen` eindeutige Slugs hat und dass die ids in `beworben` eindeutig sind. Dazu den Fehlertext analog zum UI-SPEC.

### IN-05 (low): Interne Quellbezeichner im öffentlichen HTML

**File:** `craftos/lib/home-content.ts:112-115` → `craftos/components/v2/KeyFacts.tsx:42`
**Issue:** `data-source="product-register: mobileLocales"`, `"tarife.voll.monat"` und `"site.trialDays"` landen als Attribut auf `/`. Für die Geräterahmen wurde mit T-06-04/D-16 eigens eine Kurzform eingeführt, um interne Pfade nicht zu veröffentlichen; bei KeyFacts geschieht das Gegenteil.
**Fix:** `source` nur für die Wurfprüfung nutzen und nicht rendern, oder eine neutrale Kurzform (`data-source="preis"`, `"sprachen"`) ausgeben.

### IN-06 (low): Header-CTA ohne `data-track="trial"`

**File:** `craftos/components/layout/HeaderShell.tsx:268-270`
**Issue:** Der Hero-CTA trägt `data-track="trial"`, der Header-CTA nicht. Die Zählung funktioniert nur, weil `classifyAppLink` jeden App-Link ohne `"login"` als `trial_click` wertet. Sollte jemals ein weiterer App-Link (z. B. Registrierung oder Passwort) ohne Attribut hinzukommen, wird er ebenfalls als Test gezählt. Die Uneinheitlichkeit erschwert zudem DOM-basierte Prüfungen.
**Fix:** `data-track="trial"` am Header-CTA ergänzen (und analog in `CtaBand`).

### IN-07 (low): `scrollbar-gutter: stable` wirkt global auf alle Seiten

**File:** `craftos/app/globals.css:65`
**Issue:** Die Regel wurde für den layoutstabilen Scroll-Lock eingeführt, gilt aber für jede Seite. Auf kurzen Seiten (404, Impressum-Varianten) reservieren Windows-Browser mit klassischen Scrollleisten eine leere Rinne in der Canvas-Farbe neben dem dunklen Header und Footer. Visuell geprüft wurden laut Summary nur `/`, `/funktionen` und der Styleguide.
**Fix:** Akzeptieren und dokumentieren, oder den Gutter nur während des Locks setzen (`root.style.scrollbarGutter = "stable"` im Effekt, Rückstellung im Cleanup). Zumindest `/impressum`, `/datenschutz` und die 404-Seite unter Windows sichten.

### IN-08 (low): Regex-Escape im Test ist wirkungslos

**File:** `craftos/tests/home.test.ts:182`
**Issue:** `site.ctaUrl.replace(/[.]/g, "\.")`: Im String-Literal ist `"\."` identisch mit `"."`, es wird also nichts maskiert, und `.` matcht weiter jedes Zeichen. Der Test bleibt grün, prüft aber ungenauer als beabsichtigt.
**Fix:** `"\\."` verwenden oder einen Escape-Helfer (`s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")`).

### IN-09 (low): Zeitbasierte Wartezeiten als Flake-Fix

**File:** `craftos/tests/e2e/function-illustrations.pw.cjs:249, 270`
**Issue:** `page.waitForTimeout(50)` soll abwarten, bis die Effekt-Bereinigung (`clearTimeout`) gelaufen ist. Auf langsamen Runnern (WebKit im Docker unter Last) reichen 50 ms nicht garantiert; der Flake wird nur unwahrscheinlicher.
**Fix:** Auf eine beobachtbare Bedingung warten, z. B. `await page.evaluate(() => new Promise(r => setTimeout(r, 0)))` innerhalb der eingefrorenen Uhr nach `requestAnimationFrame`. Besser wäre ein `data-timer="cleared"`-Attribut, das der Effekt im Cleanup setzt, mit `expect(...).toHaveAttribute`.

### IN-10 (low): „Einzige Client-Insel“ stimmt nicht; Budgetprüfungen sind mehrfach dupliziert

**File:** `craftos/components/layout/HeaderShell.tsx:12`; `craftos/components/layout/ActiveLink.tsx:1`; `craftos/components/layout/MegaMenu.tsx:25`; `craftos/lib/funktionsgruppen.ts:331, 373-375, 403`; `craftos/components/v2/FeatureList.tsx:39-44`
**Issue:** `ActiveLink` ist ebenfalls `"use client"` und wird für rund 45 Panel-Links auf **jeder** Seite instanziiert. Das ist funktional korrekt, widerspricht aber dem Kommentar und D-06 („einzige Client-Insel“) und vergrößert den RSC-Payload jeder Seite. Außerdem werden `menuGroup.description`, `featureList.*` und die Mengenprüfung doppelt geprüft, im Builder und erneut beim Rendern. Abweichende Budgets an einer Stelle würden auseinanderlaufen.
**Fix:** Den Kommentar korrigieren („einzige zustandsbehaftete Client-Insel; ActiveLink als zustandsloses Blatt“). Die Prüfungen an einer Stelle halten (Builder) und in den Komponenten nur `assertCount` behalten, wo Fremdaufrufer möglich sind.

---

_Reviewed: 2026-10-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_
