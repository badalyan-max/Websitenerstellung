---
phase: 06-startseite-navigation-und-funktions-bersicht
verified: 2026-10-21T18:30:00Z
status: human_needed
score: 4/4 must-haves verified (automatisiert, visuelle Abnahme offen)
overrides_applied: 0
deferred:
  - truth: "Menü nutzt die Hauptkeywords der Detailseiten als Linktexte (SC4, Teil Menü)"
    addressed_in: "Phase 7 / Phase 8"
    evidence: "Phase 7 Requirements: 'dazu Umsetzung DESIGN-02, SEO-02 aus Phase 5'; REQUIREMENTS.md: SEO-02 'Phasen 6–8 (Titel/H1/Description)' In Progress. Menülinktexte sind Funktionsnamen (9 von 16 enthalten den Keyword-Wortstamm); Title/H1 der Detailseiten folgen in Phase 7."
human_verification:
  - test: "Startseite in 360, 390, 768, 1024 und 1440 px ohne Scrollen ansehen (Chrome und Safari/WebKit)"
    expected: "Klare Aussage (Keyword-H1 und ein Satz Einleitung), Produktdarstellung (Browser- und Phone-Rahmen) und Button '10 Tage testen' oberhalb der Falz; Abschnitte wirken visuell statt textlastig"
    why_human: "E2E-Test 'Above the fold' existiert und laut Rollout grün, wurde in dieser Verifikation nicht ausgeführt (keine E2E erlaubt); visuelle Qualität ist nicht per grep prüfbar"
  - test: "Mega-Menü 'Funktionen' auf Desktop mit Maus, Tastatur (Tab, Enter, Esc) und auf einem echten Smartphone per Touch bedienen"
    expected: "Sechs Gruppen mit Icon und Kurzbeschreibung; Esc schließt und gibt Fokus zurück; mobil öffnet der Drawer mit aufgeklappten Funktionen, jede Funktion in höchstens zwei Taps"
    why_human: "Echte Touch-Geräte und Bediengefühl sind nicht automatisiert abgedeckt"
  - test: "Vercel Web Analytics nach 24 Stunden prüfen (Inhaberaktion laut PHASE-06-ROLLOUT.md Abschnitt 7)"
    expected: "Ereignisse 'trial_click' (und 'ai_visit') erscheinen weiterhin in der Ereignisliste"
    why_human: "Analytics-Zählung war weder per CLI noch MCP abrufbar; Code-Verdrahtung ist verifiziert, die tatsächliche Erfassung nicht"
---

# Phase 6: Startseite, Navigation und Funktionsübersicht – Verifikationsbericht

**Phasenziel:** Besucher verstehen auf der Startseite sofort, was CraftOS ist, und finden über Menü und Funktionsübersicht jede Live-Funktion in höchstens zwei Klicks.
**Verifiziert:** 21.10.2026
**Status:** human_needed
**Re-Verifikation:** Nein, Erstprüfung

## Zielerreichung

### Erfolgskriterien (ROADMAP Phase 6)

| # | Kriterium | Status | Beleg |
|---|-----------|--------|-------|
| 1 | Startseite ohne Scrollen (360–1440 px): klare Aussage, Produktdarstellung, „10 Tage testen“; je Abschnitt höchstens eine Überschrift, ein Einleitungssatz, visuelle Elemente | VERIFIED (visuell offen) | `components/home/HomeHero.tsx`: Keyword-H1 mit `data-keyword`, Lead mit Laufzeitprüfung „genau ein Satz“ (`sentenceCount`) und Textbudget, CTA `site.ctaUrl` mit `data-track="trial"`, `DevicePair layout="compact"` (Browser + Phone). `app/page.tsx`: Hero und sieben `data-home-section`-Abschnitte, jeder mit genau einem `SectionHeader` (title + lead) und v2-Baustein (KeyFacts, StepFlow, BentoGrid mit Frames/Icons, Phone-Frame, ComparisonTable, FaqList, CtaBand). `tests/home.test.ts` 13/13 grün (u. a. höchstens eine H2 je Abschnitt per renderToString). E2E „Above the fold: … 360, 390, 768, 1024 und 1440 px“ vorhanden (`tests/e2e/home-navigation.pw.cjs:270`), hier nicht ausgeführt. |
| 2 | Menü mit Funktionsgruppen, Kurzbeschreibungen und Icons; Desktop und Mobil per Maus, Touch, Tastatur; jede Live-Funktion in höchstens zwei Klicks | VERIFIED (Touch-Gerät offen) | `components/layout/MegaMenu.tsx`: sechs Gruppen je mit lucide-Icon, Gruppenlink (`/funktionen#<gruppe>`), Kurzbeschreibung (Budget-geprüft) und 16 Detaillinks. `HeaderShell.tsx`: Disclosure-Muster (aria-expanded, kein role=menu), Esc-Behandlung mit Fokus-Rückgabe, Hover nur für Maus, Drawer ≤ 1120 px öffnet mit `setExpanded(["funktionen"])` (Z. 191) → Detailfunktion in 2 Taps; 14 Zusatzfunktionen über Gruppenlink in 2 Klicks. noscript-Fallback in `Header.tsx`. `tests/navigation.test.ts` 14/14 grün (Ziele gegen Sitemap). Live: „Mega-Menü im HTML (Detaillinks, Gruppenlinks, kein role=menu)“ OK. Vier E2E „Zwei Klicks:“-Tests vorhanden (Z. 368–421). „Vorschaubilder“ aus DESIGN-03 sind laut D-05/D-17 (Umfangsänderung 20.10.2026) durch Icons ersetzt; das Roadmap-Kriterium verlangt Icons. |
| 3 | Funktionsübersicht zeigt alle Live-Funktionen nach Arbeitsablauf gruppiert (Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team), je mit visuellem Element und einem Satz Nutzen, übereinstimmend mit dem Produktregister | VERIFIED | `lib/funktionsgruppen.ts`: `GRUPPEN_REIHENFOLGE` exakt angebot, planung, baustelle, rechnung, buchhaltung, team; Builder liest `liveExtras` mit `advertised: true` aus `getProductRegister()` und bricht bei fehlender Zuordnung, leerer Gruppe oder unbekanntem Slug ab. `app/funktionen/page.tsx` rendert ausschließlich daraus: 16 `FeatureCard` (Szene im Rahmen oder Hexagon-Icon als Fallback, `benefit`) und 14 `FeatureList`-Einträge (Icon + `benefit` mit `assertOneSentence`). `tests/funktionsgruppen.test.ts` 22/22 und `tests/funktionen-seite.test.ts` 9/9 grün. Live: „/funktionen zeigt 30 Funktionen in 6 Gruppen mit BreadcrumbList und ItemList“ OK. |
| 4 | Startseite, Menü und Übersicht nutzen die Hauptkeywords der Keyword-Map; live nach Ship-Gate mit IndexNow; `trial_click` wird weiter erfasst | VERIFIED (Analytics-Zählung offen) | `tests/keyword-map.test.ts` (PHASE6_SEITEN `/`, `/funktionen`) 10/10 grün; live: „/ Title, H1 und Description nach Keyword-Map“ und „/funktionen …“ OK. Rollout: Deployment `dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq` READY auf Commit `33dea41`, IndexNow 125 URLs HTTP 200 (`docs/releases/PHASE-06-ROLLOUT.md` §4–5). `trial_click`: `components/Analytics.tsx` (global in `app/layout.tsx`) → `classifyAppLink` in `lib/tracking.ts` liefert `trial_click` für alle Links auf app.craftos.eu ohne `data-track="login"`; Hero-, Header- und CtaBand-CTA zeigen auf `site.ctaUrl`. Live-Check Tracking-Attribute OK. Menülinktexte sind Funktionsnamen; Keyword-Ausrichtung der Detailseiten folgt in Phase 7/8 (siehe Deferred). |

**Score:** 4/4 Kriterien automatisiert belegt; drei menschliche Prüfpunkte offen.

### Deferred Items

| # | Punkt | Adressiert in | Beleg |
|---|-------|---------------|-------|
| 1 | Menülinktexte der 16 Detailfunktionen tragen nicht durchgängig das Hauptkeyword der Detailseite (9/16 enthalten den Wortstamm) | Phase 7/8 | SEO-02 „Phasen 6–8 (Titel/H1/Description)“, Phase 7 „dazu Umsetzung DESIGN-02, SEO-02“ |

### Erforderliche Artefakte

| Artefakt | Status | Details |
|----------|--------|---------|
| `craftos/lib/funktionsgruppen.ts` | VERIFIED | 464 Zeilen, server-only, genutzt von Header/MegaMenu, Startseite und `/funktionen` |
| `craftos/lib/navigation.ts` | VERIFIED | `getHauptnavigation`, `checkNavigationTargets`, im Header und Test verwendet |
| `craftos/components/layout/MegaMenu.tsx`, `HeaderShell.tsx`, `Header.tsx`, `ActiveLink.tsx` | VERIFIED | Server-Slot plus einzige Client-Insel, live im HTML |
| `craftos/components/home/HomeHero.tsx`, `craftos/lib/home-content.ts`, `craftos/app/page.tsx` | VERIFIED | Hero + 7 Abschnitte, FAQPage-JSON-LD (live genau 5 Fragen) |
| `craftos/app/funktionen/page.tsx`, `components/funktionen/FunktionenHead.tsx` | VERIFIED | 6 Gruppen, 30 Funktionen, BreadcrumbList + ItemList |
| `craftos/components/v2/FeatureList.tsx`, `SceneContent.tsx`, `evidence.ts`, `DevicePair.tsx` (compact), `lib/scenes.ts` | VERIFIED | in Startseite und Übersicht verwendet; Kurzform-Belege live geprüft („Keine internen Belegpfade“) |
| `craftos/scripts/live-check.mjs` | VERIFIED | 7 Phase-6-Prüfungen, in dieser Verifikation selbst ausgeführt |
| `craftos/docs/releases/PHASE-06-ROLLOUT.md` | VERIFIED | Commit, Deployment, IndexNow, offene Inhaberaktionen |

### Key Links

| Von | Nach | Über | Status |
|-----|------|------|--------|
| Produktregister `liveExtras` | `/funktionen`, Menü | `getFunktionsgruppen()` | WIRED |
| `lib/funktionen.ts` (16 Detailseiten) | Menü-Detaillinks, FeatureCards | `buildFunktionsgruppen` | WIRED |
| Menü-Gruppenlinks | `/funktionen#<gruppe>` | `anchorHref` ↔ `section aria-labelledby={group.id}` / SectionHeader `id` | WIRED |
| CTA-Links | `trial_click` | `Analytics.tsx` Klick-Listener → `classifyAppLink` | WIRED |
| `keyword-map.json` | Title/H1/Description `/`, `/funktionen` | `homeMetadata`/`pageMetadata`, Test PHASE6_SEITEN | WIRED |

### Verhaltensprüfungen (selbst ausgeführt)

| Verhalten | Befehl | Ergebnis | Status |
|-----------|--------|----------|--------|
| Unit-Tests gesamt | `cd craftos && npx vitest run` | 329/330; einziger Fehler `product-register.test.ts › Belege existieren am Release-Commit` mit 5-s-Zeitlimit (Git-Zugriff, parallel zum Live-Check) | PASS (s. u.) |
| Zeitlimit-Test isoliert | `npx vitest run tests/product-register.test.ts` | 6/6 grün | PASS |
| Phase-6-Testdateien | funktionsgruppen 22, navigation 14, home 13, funktionen-seite 9, keyword-map 10 | alle grün | PASS |
| Live-Stand craftos.eu | `cd craftos && node scripts/live-check.mjs` | 17/17 OK, Exit 0 | PASS |

### Anforderungen

| Anforderung | Beschreibung (kurz) | Status | Beleg |
|-------------|---------------------|--------|-------|
| DESIGN-01 | Startseite: ohne Scrollen Aussage, Produkt, „10 Tage testen“; Abschnitte visuell | SATISFIED (visuelle Abnahme offen) | Kriterium 1 |
| DESIGN-03 | Menü mit Gruppen, Kurzbeschreibungen, Vorschaubildern; ≤ 2 Klicks Desktop/Mobil | SATISFIED | Kriterium 2; Vorschaubilder → Icons per D-05/D-17 (Umfangsänderung, Roadmap-Kriterium nennt Icons) |
| FEAT-01 | Übersicht nach Arbeitsablauf gruppiert, visuelles Element + ein Satz Nutzen | SATISFIED | Kriterium 3 |
| DESIGN-02 | Designsystem v2 auf allen Seiten | Teilumsetzung (/, Menü, /funktionen), bleibt In Progress – keine Lücke | v2-Bausteine auf beiden Seiten verwendet |
| SEO-02 | Keyword-Map → Title/H1/Description | Teilumsetzung (/, /funktionen), bleibt In Progress – keine Lücke | live und Test grün |

Keine verwaisten Anforderungen: REQUIREMENTS.md ordnet Phase 6 genau DESIGN-01, DESIGN-03 und FEAT-01 zu.

### Anti-Pattern-Scan

| Datei | Befund | Schwere |
|-------|--------|---------|
| Phase-6-Dateien (lib, components/layout, home, funktionen, v2-Neuteile, app/page, app/funktionen, live-check) | keine TBD/FIXME/XXX/TODO/HACK | – |
| `tests/product-register.test.ts` | Git-basierter Test (Phase 5) überschreitet unter Last das 5-s-Standardzeitlimit | Info (kein Phase-6-Code, isoliert grün) |
| `06-REVIEW.md` IN-05, IN-07 | begründet zurückgestellt (data-source-Bezeichner, scrollbar-gutter) | Info |

### Menschliche Prüfung

1. **Above the fold sichtbar prüfen:** Startseite in 360/390/768/1024/1440 px öffnen. Erwartet: H1, Lead, „10 Tage testen“ und Gerätedarstellung ohne Scrollen sichtbar. Warum Mensch: E2E wurde hier nicht ausgeführt, die visuelle Qualität ist nicht maschinell prüfbar.
2. **Menü auf echtem Gerät:** Desktop mit Maus und Tastatur, Smartphone per Touch. Erwartet: Disclosure, Esc, Fokus-Rückgabe, Drawer mit aufgeklappten Funktionen, zwei Taps. Warum Mensch: Touch- und Bediengefühl.
3. **Analytics nach 24 h:** In Vercel Web Analytics prüfen, dass `trial_click` weiter erscheint. Warum Mensch: Die Zählung war für Agenten nicht abrufbar.

### Zusammenfassung

Das Phasenziel ist im Code und live erreicht. Startseite, Mega-Menü/Drawer und `/funktionen` sind substanziell umgesetzt, aus einer gemeinsamen, registergeprüften Datenquelle verdrahtet und durch eigene Unit-Tests sowie einen selbst ausgeführten Live-Check (17/17) belegt. Es gibt keine blockierenden Lücken. Offen sind nur die visuelle bzw. gerätebezogene Abnahme und die Analytics-Kontrolle durch den Inhaber. Die Keyword-Ausrichtung der Menülinktexte auf die Detailseiten-Keywords ist Teil von SEO-02 und wird in Phase 7/8 fortgeführt.

---

_Verifiziert: 21.10.2026_
_Verifier: Claude (gsd-verifier)_
