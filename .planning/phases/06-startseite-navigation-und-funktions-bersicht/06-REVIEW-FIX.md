---
phase: 06-startseite-navigation-und-funktions-bersicht
fixed_at: 2026-10-21T00:00:00Z
review_path: .planning/phases/06-startseite-navigation-und-funktions-bersicht/06-REVIEW.md
iteration: 1
findings_in_scope: 14
fixed: 12
skipped: 2
status: partial
---

# Phase 6: Bericht zur Behebung der Review-Befunde

**Behoben am:** 2026-10-21
**Quelle:** `.planning/phases/06-startseite-navigation-und-funktions-bersicht/06-REVIEW.md`
**Iteration:** 1

**Zusammenfassung:**
- Befunde im Umfang: 14 (4 medium, 10 low)
- Behoben: 12 (alle 4 medium, 8 low; IN-10 nur der Kommentar)
- Zurückgestellt: 2 (IN-05, IN-07)
- Offen für Phase 7: Entscheidung über `components/product-demo/*` (WR-03)

## Prüfungen (lokal, Stand nach dem letzten Fix-Commit)

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run` | 330 bestanden, 0 fehlgeschlagen (25 Dateien) |
| `npm run typecheck` | ohne Fehler |
| `npm run lint` | ohne Befund |
| `npm run build` | erfolgreich. Der Build wurde zweimal ausgeführt, weil nach dem ersten E2E-Lauf noch eine Quelländerung nötig war (WR-02, Layout-Effekt). |
| E2E gegen `next start -p 3100` (`navigation`, `home-navigation`, `function-illustrations`, `design-v2`; je Chromium/WebKit, 1440 und 390-Touch) | 222 bestanden, 50 übersprungen (projektbedingte `test.skip`), 0 fehlgeschlagen |
| Stabilität der neuen Esc-Prüfung | `--repeat-each 5` in Chromium und WebKit 1440: 20 von 20 bestanden |

Der Server wurde jeweils über die eigene PID gestartet und beendet. Danach war Port 3100 frei.

## Behobene Befunde

### WR-01: Verlinkte Zusatzfunktionen nicht als Link erkennbar; Fokusrahmen auch bei Mausklick

**Dateien:** `craftos/components/v2/FeatureList.module.css`, `craftos/tests/design-v2-components.test.ts`
**Commit:** 1c9eb35
**Umsetzung:** Verlinkte Namen sind jetzt dauerhaft 1 px unterstrichen (`text-decoration-color: currentColor`, Offset 5 px wie beim Textlink aus [05]). Beim Überfahren wird der Unterstrich unter `hover: hover` auf 2 px verstärkt, mit 150 ms Übergang und Reduced-Motion-Ausnahme. Der Zeilenrahmen nutzt jetzt `.item:has(.link:focus-visible)` statt `:focus-within`, sodass Mausklicks keinen Amber-Rahmen mehr erzeugen. Der Vitest prüft den Dauer-Unterstrich, `:focus-visible` und das Fehlen von `:focus-within`.

### WR-02: Globaler Esc-Handler übernimmt Fokus und ruft `preventDefault` auch außerhalb des Headers

**Dateien:** `craftos/components/layout/HeaderShell.tsx`, `craftos/tests/e2e/navigation.pw.cjs`
**Commits:** 701e174, 14f4d76, 87b2de7
**Umsetzung:**
- Esc wirkt nur, wenn ein Panel oder der Drawer offen ist und zusätzlich eine dieser Bedingungen gilt: Der Fokus liegt im Header, das Panel wurde per Hover geöffnet, oder kein Element ist fokussiert (`body`). Der letzte Fall tritt in WebKit auf, weil Schalter bei Klick oder Tap dort keinen Fokus erhalten. Pointerdown außerhalb hätte das Panel in diesem Fall bereits geschlossen.
- In Eingabefelder, `select`, `textarea`, contenteditable und Dialoge (`dialog`, `role=dialog|alertdialog`, `aria-modal`) außerhalb des Headers greift der Handler nicht ein. Bereits behandelte Ereignisse (`defaultPrevented`) überspringt er.
- `preventDefault` wird nur aufgerufen, wenn tatsächlich geschlossen wird. Der Fokus geht nur dann an den Schalter oder Toggle zurück, wenn er vorher im Header lag oder nach einem Klick im Header auf `body` stand. Bei Hover-Öffnung mit Fokus im Seiteninhalt bleibt der Fokus unverändert.
- Die Listener (Esc, Außenklick, Fokus außerhalb) hängen jetzt per `useLayoutEffect` im selben Commit wie das sichtbare Panel. Mit dem passiven Effekt lief die Registrierung nach einer Hover-Öffnung erst in einer späteren Aufgabe, und ein schnelles Esc ging verloren. Das trat in WebKit unter Last im ersten E2E-Gesamtlauf einmal auf.
- Neuer E2E-Tastaturtest „Desktop Navigation: Escape greift nur bei Fokus im Header oder Hover-Panel ein …“ auf `/rechner/stundensatz` mit vier Fällen. (1) Fokus im Eingabefeld, Panel per Hover offen: Das Panel bleibt offen, der Fokus bleibt im Feld, kein `preventDefault`. (2) Fokus auf einem Inhaltselement, Panel per Hover offen: Das Panel schließt, der Fokus bleibt, `preventDefault` wird gesetzt. (3) Fokus im Panel: Das Panel schließt, und der Fokus geht an den Schalter. (4) Ohne offenes Panel bleibt Esc unangetastet.

**Hinweis:** Es handelt sich um eine Logikänderung. Status: behoben, menschliche Sichtprüfung des Verhaltens empfohlen.

### WR-03: Startseiten-Demo entfernt, `ProductDemo` und zwei E2E-Dateien verwaist

**Dateien:** `craftos/tests/e2e/demo-planning.pw.cjs`, `craftos/tests/e2e/mobile-step-flow.pw.cjs`
**Commit:** d7d0dc2
**Umsetzung:** Geprüft: Keine Route und keine Komponente unter `app/` bzw. `components/` außerhalb von `components/product-demo/` bindet die Demo noch ein. Nur `tests/demo.test.ts` und die Archiv-Specs referenzieren sie. Eine Umstellung auf eine andere Route ist daher nicht möglich. Beide Specs erhalten deshalb auf Dateiebene `test.skip(() => true, 'Demo derzeit auf keiner Seite eingebunden – Entscheidung in Phase 7')` mit erläuterndem Kommentar. In `testMatch` standen sie bereits nicht. Ein manueller Lauf meldet jetzt 11 übersprungene statt fehlschlagende Tests (geprüft mit einer temporären Konfiguration außerhalb des Repos). Nach der Inhaber-Regel wurden keine Dateien gelöscht.

**Offen für Phase 7:** Es ist zu entscheiden, ob `components/product-demo/*` (ProductDemo, PlanningBoard, CSS), `tests/demo.test.ts` sowie `demo-planning.pw.cjs` und `mobile-step-flow.pw.cjs` wieder auf einer Seite eingebunden werden (dann die Specs auf diese Route umstellen und den Skip entfernen) oder archiviert bzw. entfernt werden (nur mit Freigabe). Bis dahin testet `tests/demo.test.ts` die nicht eingebundene Komponente weiter grün.

### WR-04: Linkziele der Zusatzfunktionen nicht gegen die Sitemap geprüft

**Datei:** `craftos/tests/navigation.test.ts`
**Commit:** ccaa4cf
**Umsetzung:** Neuer Test in „navigation: Zielprüfung“. Jede `extras[].target.href` muss als Pfad in `sitemap()` vorkommen, mindestens sechs davon als Hilfeartikel `/hilfe/…`. Zusätzlich muss `checkNavigationTargets` leer bleiben. Ein umbenannter oder entfernter Hilfeartikel lässt den Test jetzt fehlschlagen. In `tests/funktionsgruppen.test.ts` gibt es bereits eine ähnliche Sitemap-Prüfung („jedes Ziel ist eine Route der Sitemap“). Die neue Prüfung macht die Zielprüfung der Navigation vollständig.

### IN-01: `onBlur` ohne `relatedTarget` schließt nie

**Datei:** `craftos/components/layout/HeaderShell.tsx`
**Commit:** bfdc6aa
**Umsetzung:** Ohne `relatedTarget` bleibt das Panel weiterhin offen. Das betrifft die WebKit-Korrektur für Linkklicks und Klicks auf nicht fokussierbare Flächen. Nach `setTimeout(0)` prüft der Handler zusätzlich `document.hasFocus()`. Hat das Dokument den Fokus verloren (Adressleiste, Tab-Wechsel), schließt das Desktop-Panel. Der zweite Vorschlag aus dem Review wurde bewusst nicht umgesetzt: Ein Klick auf eine leere Header-Fläche schließt weiterhin nicht. Status: behoben, menschliche Prüfung empfohlen.

### IN-02: Modifizierte Klicks schließen Drawer und Panel

**Datei:** `craftos/components/layout/HeaderShell.tsx`
**Commit:** 64e1d87
**Umsetzung:** Der Klick-Handler am `<nav>` kehrt bei Strg, Cmd, Shift oder Alt sowie bei `button !== 0` vorzeitig zurück. Das Menü bleibt dann offen, damit weitere Links in neuen Tabs geöffnet werden können. Ein Mittelklick löst ohnehin nur `auxclick` aus und schließt daher nicht.

### IN-03: Vollflächiger Mobile-Drawer nicht modal

**Dateien:** `craftos/components/layout/HeaderShell.tsx`, `craftos/tests/e2e/home-navigation.pw.cjs`
**Commit:** de1abfd
**Umsetzung:** Im Scroll-Lock-Effekt, der nur bei offenem Drawer im Mobile-Breakpoint aktiv ist, werden die Geschwister-Elemente `main` und `footer` des Headers auf `inert` gesetzt. Im Cleanup wird das wieder entfernt, auch beim Breakpoint-Wechsel und beim Routenwechsel. Andere Body-Kinder wie den Route-Announcer von Next.js fasst der Effekt bewusst nicht an. Der Drawer-E2E prüft `inert` bei offenem Drawer (true, true) und nach Esc (false, false). Alle betroffenen E2E-Specs sind grün.

### IN-04: Builder erkennt doppelte Zuordnungen nicht

**Dateien:** `craftos/lib/funktionsgruppen.ts`, `craftos/tests/funktionsgruppen.test.ts`
**Commit:** e931fd7
**Umsetzung:** `buildFunktionsgruppen` wirft jetzt in drei Fällen mit Fehlertexten im UI-SPEC-Stil: (a) ein Slug ist mehreren Gruppen in `DETAIL_ZUORDNUNG` zugeordnet, (b) ein Slug steht doppelt in `input.funktionen`, (c) zwei beworbene Registereinträge zeigen auf dieselbe Zusatzfunktion. Neue Vitests decken (b) und (c) ab. Fall (a) betrifft eine Modulkonstante und greift beim Build.

### IN-06: Header-CTA ohne `data-track="trial"`

**Dateien:** `craftos/components/layout/HeaderShell.tsx`, `craftos/components/v2/CtaBand.tsx`, `craftos/tests/design-v2-components.test.ts`, `craftos/tests/e2e/home-navigation.pw.cjs`
**Commit:** 9820ab6
**Umsetzung:** Header-CTA und CtaBand-CTA tragen jetzt `data-track="trial"` wie der Hero-CTA. Das ist mit der Analytics-Logik konsistent: `classifyAppLink` wertet weiterhin nur `"login"` gesondert und zählt alle anderen App-Links als `trial_click`. Vitest (CtaBand) und Drawer-E2E erwarten `trial` jetzt explizit.

### IN-08: Wirkungsloses Regex-Escape in `home.test.ts`

**Datei:** `craftos/tests/home.test.ts`
**Commit:** 40bfb0f
**Umsetzung:** `site.ctaUrl` wird mit einem vollständigen Escape-Ausdruck (`/[.*+?^${}()|[\]\\]/g` → `"\\$&"`) maskiert.

### IN-09: Zeitbasierte Wartezeiten als Flake-Fix

**Dateien:** `craftos/components/feature-snippet/FeatureSnippet.tsx`, `craftos/tests/e2e/function-illustrations.pw.cjs`
**Commit:** 86d3522
**Umsetzung:** Der Timer-Effekt der Illustration setzt am Wurzelelement `data-timer="armed-<phase>"` und in der Bereinigung `data-timer="cleared"`. Die beiden zitierten Stellen (Pause und außerhalb des Viewports) warten jetzt auf `data-timer="cleared"` statt auf feste 50 ms. Die Wartezeit in `advancePhase` und weitere Echtzeit-Wartezeiten in anderen Tests wurden nicht geändert, weil sie außerhalb des Befunds liegen.

### IN-10: „Einzige Client-Insel“ stimmt nicht (nur Kommentar)

**Datei:** `craftos/components/layout/HeaderShell.tsx`
**Commit:** 1a5133f
**Umsetzung:** Der Kommentar lautet jetzt „einzige zustandsbehaftete Client-Insel; ActiveLink als zustandsloses Client-Blatt“. Die Zusammenführung der doppelten Budgetprüfungen (Builder und Rendering) wurde nicht umgesetzt. Sie ist ein Refactoring über mehrere Dateien, das nicht klein und eindeutig ist.

## Zurückgestellte Befunde

### IN-05: Interne Quellbezeichner im öffentlichen HTML

**Datei:** `craftos/lib/home-content.ts:112-115` → `craftos/components/v2/KeyFacts.tsx:42`
**Grund:** Das Rendern von `source` als `data-source` ist in `05-UI-SPEC.md` (Abschnitt KeyFacts, Zeile 357) verbindlich festgelegt und wird in `tests/design-v2-components.test.ts` („rendert dl mit dt/dd, data-source je Wert …“) geprüft. Das Entfernen oder Kürzen ändert damit eine UI-SPEC-Festlegung aus Phase 5 und ist keine eindeutige, risikoarme Korrektur. Die Bezeichner (`site.trialDays`, `tarife.voll.monat`, `product-register: mobileLocales`) enthalten keine Geheimnisse oder Dateipfade. Empfehlung: In Phase 7 mit Inhaber oder UI-SPEC-Verantwortung entscheiden, ob analog zu D-16 eine Kurzform (z. B. `preis`, `sprachen`) eingeführt wird. Danach Spec und Test gemeinsam anpassen.
**Ursprünglicher Befund:** `data-source="product-register: mobileLocales"`, `"tarife.voll.monat"` und `"site.trialDays"` stehen als Attribut auf `/`.

### IN-07: `scrollbar-gutter: stable` wirkt global

**Datei:** `craftos/app/globals.css:65`
**Grund:** Laut Auftrag wird die Regel nur geändert, wenn sie nachweislich Nebenwirkungen hat. Ein solcher Nachweis liegt nicht vor: Die E2E-Läufe (inklusive Layout-, CLS- und Scroll-Lock-Prüfungen) sind grün. Die im Review vorgeschlagene Sichtung von `/impressum`, `/datenschutz` und der 404-Seite unter Windows mit klassischen Scrollleisten steht noch aus. Ergibt sie eine störende Rinne, sollte der Gutter nur während des Scroll-Locks gesetzt werden.
**Ursprünglicher Befund:** Auf kurzen Seiten reservieren Windows-Browser eine leere Rinne neben dunklem Header und Footer.

---

_Behoben: 2026-10-21_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
