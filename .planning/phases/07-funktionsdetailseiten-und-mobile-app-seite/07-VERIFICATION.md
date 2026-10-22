---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
verified: 2026-10-22T12:25:00Z
status: human_needed
score: 3/3 Erfolgskriterien verifiziert (dazu 3/3 Anforderungen FEAT-02, FEAT-03, MEDIA-01)
overrides_applied: 0
human_verification:
  - test: "Sichtabnahme durch den Inhaber: 3–4 Detailseiten (z. B. /funktionen/gaeb, /funktionen/zeiterfassung, /funktionen/plantafel, /funktionen/kundenportal) und /app auf Smartphone (390 px) und Desktop (1440 px) auf craftos.eu durchsehen."
    expected: "Kopf mit H1, Kurznutzen, CTA und Visual sofort sichtbar; Abschnitte klar gegliedert (Ablauf, Plattformen/Rollen, Kacheln, FAQ, passende Funktionen, CTA); Gesamteindruck „strukturiert und schön, nicht nur Text“ (Inhaberauftrag 20.10.2026)."
    why_human: "Ästhetik und Lesbarkeit sind nicht per grep prüfbar; die Sichtprüfungen in 07-03/07-06/07-08 liefen agentengesteuert per Skript, eine Inhaberabnahme liegt nicht vor."
  - test: "/app: Kachelgruppen (Zeiten/Einsätze/Urlaub, Dokumentieren, Material/Belege/Kommunikation) ansehen; kleine Kacheln zeigen Icons statt Phone-Szenen."
    expected: "Der Inhaber akzeptiert die Mischung aus 8 Phone-Kacheln plus Phone im Kopf und Icon-Kacheln für kleine Kacheln (Navigation, Arbeitsschritte, Besichtigung, Fotos, Kunden, Chat) als „Phone-Darstellungen“ im Sinne von FEAT-03."
    why_human: "Roadmap-Kriterium 2 sagt „Kacheln mit Phone-Darstellungen“; die UI-SPEC lässt Icons für sm-Kacheln zu. Ob das dem Inhaberwunsch entspricht, ist eine Geschmacks-/Abnahmeentscheidung."
  - test: "Bing Webmaster Tools bzw. Google Search Console: Abruf/Indexierung der sechs neuen Detailseiten und /app in den nächsten Tagen prüfen; Vercel Analytics → Events frühestens 24 h nach 22.10.2026 14:06 MESZ (siehe PHASE-07-ROLLOUT.md Abschnitt Tracking)."
    expected: "Neue URLs werden abgerufen; trial_click/login_click/ai_visit erscheinen."
    why_human: "Die IndexNow-Meldung (HTTP 200, 131 URLs) ist nur im Rollout-Nachweis dokumentiert; ein erneuter Aufruf hätte Seiteneffekte. Externe Dienste mit Zeitverzug."
---

# Phase 7: Funktionsdetailseiten und Mobile-App-Seite – Verifikationsbericht

**Phasenziel:** Jede Live-Funktion hat eine kurze, einheitlich gegliederte Detailseite, und die Mobile-App-Seite zeigt den vollen App-Umfang.
**Verifiziert:** 2026-10-22 (nach Rollout, HEAD = origin/main = `cbc4a01`, Code-Stand live = `126f807`, danach nur Doku)
**Status:** human_needed
**Re-Verifikation:** Nein – Erstprüfung

## Zielerreichung

### Erfolgskriterien (ROADMAP Phase 7)

| # | Kriterium | Status | Beleg |
|---|-----------|--------|-------|
| 1 | Jede Live-Funktion hat eine Detailseite nach fester Vorlage (Visual, Kurznutzen, Ablauf, Plattformen, Rollen, FAQ); neue Funktionen seit 09.09.2026 eigene Seite oder Abschnitt | ✓ VERIFIED | `app/funktionen/[slug]/page.tsx` rendert für alle 22 Slugs aus `lib/funktionen.ts` `FunktionsDetail` mit fester Folge kopf → ablauf → rollen → kernpunkte → faq → verwandt → cta. `lib/scenes.ts` `kopfVisuals` hat 22 Einträge (browser/phone/pair). Builder `lib/funktionsdetails/index.ts` wirft bei fehlendem Inhaltsmodul, Lead ≠ 1 Satz, Schrittzahl, Plattformen ≠ `funktion.platforms`, unbelegten Rollen, FAQ-Anzahl/Fragezeichen, Kachelregeln. Test „alle 22 Detailseiten: feste Abschnittsfolge …“ (tests/funktionsdetails.test.ts:1086) rendert jede Route per `renderToString`. Neue Funktionen: 6 neue Seiten (gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement); die 8 übrigen Zusatzfunktionen stehen als `data-zusatz`-Kachel auf ihrer Zielseite (angebote, aufmass, projektverwaltung ×2, baudokumentation ×2, lager, team) bzw. „21 Sprachen“ → `/app` (Test tests/funktionsdetails.test.ts:1062, tests/funktionsgruppen.test.ts:356/396, Abgleich mit Register). Rollen gegen Web-Release `535206b` geprüft (Suite lief, nicht übersprungen). Live: `/funktionen/gaeb`, `/maengelmanagement`, `/zeiterfassung` liefern alle sieben `data-abschnitt` plus `data-visual`. |
| 2 | Mobile-App-Seite zeigt alle Live-Funktionen der App als gegliederte Kacheln mit Phone-Darstellungen | ✓ VERIFIED (Abnahme der Optik: human) | `app/app/page.tsx` + `lib/app-content.ts`: Kopf mit Phone (Einsätze) und Store-Links/QR, drei Kachelgruppen (zeit, dokumentieren, material) mit 15 Kacheln, davon 8 mit Phone-Szene (Zeiten, Urlaub, Mängel, Aufmaß, Bautagesbericht, Abnahme, Lager-Scan, Beleg), Kennzahlen (Sprachen aus `mobileLocales`, Offline mit Einschränkung, App-Preis aus Tarif), Offline-StepFlow, FAQ, CtaBand. Alle FEAT-03-Punkte abgedeckt (Zeiterfassung mit Standort, Einsätze mit Navigation, Aufmaß, Baudoku, Besichtigung, Bautagesbericht, Mängel, Abnahme mit Unterschrift, Arbeitsschritte, Urlaub, Lager-Scan, Belegscan, Chat, Offline, Sprachen); Test „FEAT-03: Kacheltitel decken alle Live-Funktionen der App ab“ (tests/app-seite.test.ts:116). Belegscan mit Lizenzhinweis (WR-01 behoben). Live: `/app` 200 mit allen acht Abschnitten; live-check „MobileApplication ohne Bewertungen, FAQPage, BreadcrumbList 2“ OK. |
| 3 | Alle neuen Seiten in Sitemap und `llms.txt`, über Menü und Übersicht verlinkt, nach Ship-Gate live mit IndexNow | ✓ VERIFIED | Eigene Live-Abfrage 22.10.2026: für `/app` und die 6 neuen Detailseiten je Status 200, in `sitemap.xml` (lastmod 2026-10-22), in `/llms.txt`, Link im Mega-Menü der Startseite und auf `/funktionen`. `node scripts/live-check.mjs`: „Ergebnis: alle Prüfungen OK“ (48 Prüfungen, u. a. „Alle bestehenden Detailseiten in der Sitemap“, „llms.txt nennt alle Detailseiten und /app“, „/funktionen zeigt 30 Funktionen in 6 Gruppen“, Title/H1/Description aller 22 Detailseiten und /app nach Keyword-Map). Ship-Gate, `gh workflow list --all`, Vercel READY und IndexNow („131 URLs gemeldet, HTTP 200“) dokumentiert in `craftos/docs/releases/PHASE-07-ROLLOUT.md`; IndexNow-Schlüsseldatei live 200. Die Meldung selbst ist nicht nebenwirkungsfrei wiederholbar (siehe menschliche Prüfung 3). |

**Score:** 3/3 Kriterien verifiziert

### Erforderliche Artefakte

| Artefakt | Erwartung | Status | Details |
|----------|-----------|--------|---------|
| `craftos/app/funktionen/[slug]/page.tsx` | dünne Route, Metadaten aus Keyword-Map | ✓ VERIFIED | `generateStaticParams` über alle Funktionen, `zielwerte()` für Title/Description |
| `craftos/components/funktionen/FunktionsDetail.tsx` | feste Vorlage, JSON-LD | ✓ VERIFIED | 7 Abschnitte, FAQPage aus sichtbaren Fragen, BreadcrumbList 3 Ebenen, WebPage, kein HowTo |
| `craftos/components/funktionen/FunktionsKopf.tsx`, `PlattformRollen.tsx` | Kopf mit Visual/CTA, Plattform-/Rollenpanels | ✓ VERIFIED | genutzt von Detailvorlage und `/app` |
| `craftos/lib/funktionsdetails/{angebot,planung,baustelle,rechnung,buchhaltung,team}.ts` + `index.ts` | 22 typisierte Inhaltsmodule, prüfender Builder | ✓ VERIFIED | `INHALTE` vereinigt alle sechs Gruppen; Builder mit Budget-, Rollen-, Plattform-, Kachel-, FAQ-, Wortregeln |
| `craftos/lib/scenes.ts` | Kopf-Visuals für 22 Funktionen, App-Szenen | ✓ VERIFIED | `kopfVisuals` 22 Einträge, `cardScenes` abgeleitet |
| `craftos/app/app/page.tsx`, `craftos/lib/app-content.ts` | Mobile-App-Seite aus v2-Bausteinen | ✓ VERIFIED | siehe Kriterium 2 |
| `craftos/lib/funktionsgruppen.ts` | 22 Details / 8 Zusatz / 30 gesamt | ✓ VERIFIED | live-check „30 Funktionen in 6 Gruppen“ |
| `craftos/scripts/live-check.mjs` | Phase-7-Prüfungen | ✓ VERIFIED | lief grün |
| `craftos/docs/releases/PHASE-07-ROLLOUT.md` | Rollout-Nachweis | ✓ VERIFIED | Commit, Vercel-Deployment, IndexNow, live-check, SE-Ranking-Abgleich, Messbericht |

### Key-Link-Prüfung

| Von | Nach | Über | Status |
|-----|------|------|--------|
| Route `/funktionen/[slug]` | `FunktionsDetail` | `getFunktionsdetail(slug)` | ✓ WIRED |
| `FunktionsDetail` | `lib/funktionsdetails` Inhalte + `kopfVisuals` | Builder → `detail.kopf.visual` → `KopfVisualRahmen` | ✓ WIRED |
| `lib/funktionsgruppen.ts` | Menü, `/funktionen`, Sitemap, `llms.txt` | gemeinsames Modell | ✓ WIRED (live bestätigt) |
| Zusatzfunktionen | Zielseiten-Kacheln | `target.href` ↔ `tile.zusatz` | ✓ WIRED (Test 1062) |
| `/app` | Keyword-Map, Register, Tarife | `zielwerte("/app")`, `mobileLocales`, `site` | ✓ WIRED |

### Datenfluss (Level 4)

| Artefakt | Daten | Quelle | Echte Daten | Status |
|----------|-------|--------|-------------|--------|
| Detailseiten | Inhalte, Visual, Meta | statische, typisierte Module + keyword-map.json, vom Builder geprüft | ja (SSG) | ✓ FLOWING |
| `/app` Kennzahlen | Sprachen, Offline, Preis | `product-register.ts` (`mobileLocales`, `mobileOffline`), Tarife aus `site.ts` | ja, keine Literale (Test 265) | ✓ FLOWING |

### Verhaltens-Stichproben

| Verhalten | Befehl | Ergebnis | Status |
|-----------|--------|----------|--------|
| Unit-/Rendertests inkl. Release-Belege | `cd craftos && npx vitest run` | 29 Dateien, 483 Tests bestanden, keine übersprungen | ✓ PASS |
| Live-Stand | `cd craftos && node scripts/live-check.mjs` | „Ergebnis: alle Prüfungen OK“ | ✓ PASS |
| Neue Seiten live verlinkt/gelistet | `curl` Sitemap, `/`, `/funktionen`, `/llms.txt` | alle 7 URLs überall vorhanden, 200 | ✓ PASS |
| Live-Struktur Detailseiten/`/app` | `curl` + grep `data-abschnitt` | feste Folge auf 3 Stichproben, `/app` 8 Abschnitte | ✓ PASS |
| Code-Stand = Live-Stand | `git rev-parse HEAD origin/main`; `git diff --stat 126f807 HEAD -- craftos` | identisch; nach Code-Push nur Doku/Berichte | ✓ PASS |

E2E (Playwright), Build und Browserprüfungen wurden auftragsgemäß nicht erneut ausgeführt; laut 07-REVIEW-FIX.md grün (funktionsdetails 23/0, home-navigation 40/0, design-v2 60/0).

### Probe-Ausführung

Keine `probe-*.sh` deklariert – übersprungen.

### Anforderungsabdeckung

| Anforderung | Beschreibung | Status | Beleg |
|-------------|--------------|--------|-------|
| FEAT-02 | Detailseite je Live-Funktion mit Visual, Kurznutzen, Ablauf, Plattformen, Rollen, FAQ; neue Seiten | ✓ SATISFIED | Kriterium 1 |
| FEAT-03 | Mobile-App-Seite mit allen App-Funktionen und Phone-Darstellungen | ✓ SATISFIED | Kriterium 2 |
| MEDIA-01 | Jede Live-Funktion hat ein visuelles Element | ✓ SATISFIED | 22 Kopf-Visuals; Zusatzfunktionen als Kachel mit Icon/Phone; `/app` 8 Phone-Szenen; Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“ live geprüft |
| DESIGN-02 | v2-Designsystem auf allen Seiten | In Progress (gewollt) | Teilumsetzung auf 22 Detailseiten und `/app`; Abschluss Phase 8 – keine Lücke |
| SEO-02 | Titel/H1/Description nach Keyword-Map | In Progress (gewollt) | für `/`, `/funktionen`, `/app` und 22 Detailseiten live geprüft; Rest Phase 8 – keine Lücke |

Keine verwaisten Anforderungen: REQUIREMENTS.md ordnet Phase 7 nur FEAT-02, FEAT-03, MEDIA-01 zu (alle „Complete“).

### Anti-Patterns

| Datei | Zeile | Muster | Schwere | Auswirkung |
|-------|-------|--------|---------|------------|
| 64 in Phase 7 geänderte Code-Dateien unter `craftos/` | – | TBD/FIXME/XXX, TODO/HACK/PLACEHOLDER, „coming soon“ | – | keine Treffer |

Offene Hinweise (keine Blocker, dokumentiert in `deferred-items.md` → Phase 10): Leerraum bis 122 px in md-Kacheln ohne Phone bei 1024 px; gedimmte Zwischenstände der FeatureSnippet-Animation (axe color-contrast nur während der Animation, dekorativ). Review: 0 kritisch, 7 Warnungen, 8 Hinweise; laut 07-REVIEW-FIX.md 11 Befunde im Umfang, 10 behoben, IN-02 ohne Codeänderung nachgemessen.

### Menschliche Prüfung erforderlich

1. **Sichtabnahme Detailseiten und /app** – Test: 3–4 Detailseiten und `/app` bei 390 und 1440 px durchsehen. Erwartet: klar gegliedert, „strukturiert und schön“. Warum menschlich: Ästhetik; bisher nur agentengesteuerte Sichtprüfung.
2. **Phone-Darstellungen auf /app** – Test: Kachelgruppen ansehen. Erwartet: Mischung aus 8 Phone-Kacheln und Icon-Kacheln ist akzeptiert. Warum menschlich: Auslegung „Kacheln mit Phone-Darstellungen“.
3. **Indexierung und Analytics** – Test: Search Console/Bing und Vercel-Analytics-Events nach 24 h. Erwartet: neue URLs abgerufen, Events vorhanden. Warum menschlich: externe Dienste, Zeitverzug; IndexNow nur dokumentiert.

### Zusammenfassung

Das Phasenziel ist im Code und live erreicht: 22 Detailseiten laufen über eine feste, vom Builder erzwungene Vorlage mit Visual, Kurznutzen, Ablauf, Plattformen/Rollen (gegen den Web-Release geprüft), Kacheln, FAQ und JSON-LD; die sechs neuen Seiten und `/app` sind in Sitemap, `llms.txt`, Menü und Übersicht und liefern live 200. Die acht übrigen neuen Funktionen haben Abschnitte (Kacheln) auf ihren Zielseiten. Es gibt keine Lücken; offen ist nur die menschliche Abnahme der Optik und die zeitverzögerte Kontrolle von Indexierung und Analytics.

---

_Verifiziert: 2026-10-22_
_Verifier: Claude (gsd-verifier)_
