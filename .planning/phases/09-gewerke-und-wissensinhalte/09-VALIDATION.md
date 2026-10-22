---
phase: 9
slug: gewerke-und-wissensinhalte
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-22
planned: 2026-10-22
---

# Phase 9 — Validierungsstrategie

> Validierungsvertrag dieser Phase für die Rückmeldung während der Ausführung. Quellen: 09-RESEARCH.md „Validation Architecture“, 09-UI-SPEC.md § 8 „Prüfkriterien für Tests und seo-audit“, 09-CONTEXT.md (D-04, D-24, D-26 bis D-30). Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions und andere Cloud-Runner sind kein Beleg, es wird nie zum Testen gepusht. Schwere Läufe nur einzeln unter der gemeinsamen Sperre (Abschnitt „Sperre für schwere Läufe“). Die Aufgaben-IDs in der Aufgabenmatrix entsprechen den PLAN-Dateien 09-01 bis 09-13 (Stand 22.10.2026); `wave_0_complete` setzt der Orchestrator, sobald die Wave-0-Dateien in den jeweils ersten Aufgaben entstanden sind.

---

## Testinfrastruktur

| Eigenschaft | Wert |
|-------------|------|
| **Framework** | Vitest ^5 im Node-Modus (`environment: 'node'`, Komponenten per `renderToString` aus `react-dom/server` geprüft, kein jsdom), Alias `@` und `server-only` → `tests/server-only.ts`; Playwright ^1.63 mit `@axe-core/playwright` (Regeln `wcag2a`, `wcag2aa`, `wcag21aa`), Chromium und WebKit; Post-Build-Audits `scripts/seo-audit.mjs` und `scripts/route-audit.mjs`; Paket-Prüfwerkzeug `scripts/content-pruefen.mjs` (`--zitate`, `--l1`, `--antwort`, `--ausnahmen`, aus 09-01) |
| **Konfiguration** | `craftos/vitest.config.ts` (`include: tests/**/*.test.ts`); `craftos/tests/e2e/playwright.config.cjs` mit **explizitem `testMatch`** (heute `browser-functional`, `function-illustrations`, `navigation`, `design-v2`, `home-navigation`, `funktionsdetails`, ab 08-13 zusätzlich `vergleich.pw.cjs`); Basis-URL über `CRAFTOS_BASE_URL` (Worktrees setzen ihren Port). Phase 9 legt keine neue E2E-Datei an; neue Fälle kommen in `design-v2.pw.cjs` (09-09) und bleiben in `function-illustrations.pw.cjs` (09-02). |
| **Schnelllauf (ohne Sperre)** | `cd craftos && npx vitest run <betroffene tests/*.test.ts> && npm run typecheck && npm run lint`; Inhaltspakete zusätzlich `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate --l1 --antwort <eigene Dateien>` |
| **Volllauf (unter Sperre)** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build && node scripts/seo-audit.mjs [--paths=<eigene Pfade> \| --only=…] && AUDIT_ORIGIN=http://localhost:<port> node scripts/route-audit.mjs`; für E2E Port prüfen, `node node_modules/next/dist/bin/next start -p <port> & SRV=$!` → `kill -0 $SRV` → `CRAFTOS_BASE_URL=http://localhost:<port> npx playwright test -c tests/e2e/playwright.config.cjs <datei> [-g …]` → `kill $SRV` und Port frei prüfen. Port 3100 im Haupt-Arbeitsbaum (09-09, 09-10), 3101–3108 in den Worktrees (siehe Aufgabenmatrix). |
| **Geschätzte Laufzeit** | Schnelllauf ca. 30–60 s; Paketende (Build + Audit `--paths`) ca. 6–10 min; Volllauf mit E2E ca. 15–25 min (Build mit OG-Bildern für 83 Artikel und 12 Gewerke) |

---

## Abtastrate

- **Nach jedem Aufgaben-Commit:** Schnelllauf mit den im `<verify>` der Aufgabe genannten Vitest-Dateien des Pakets, dazu `npm run lint` und `npm run typecheck` (ohne Sperre, D-28); Inhaltspakete zusätzlich das Prüfwerkzeug über die eigenen Dateien.
- **Am Paketende (einmal je Paket, D-28):** unter Sperre einmal `npm run build` und `node scripts/seo-audit.mjs --paths=<eigene Pfade>` mit 0 Verstößen; Inhaltspakete (09-03 bis 09-08) fahren keinen E2E-Lauf; Gewerke (09-02, 09-11) fahren zusätzlich `function-illustrations.pw.cjs -g Gewerke` auf Port 3102.
- **Nach jeder Welle (Orchestrator nach dem Merge auf `main`):** volle Vitest-Suite und Build unter Sperre; nach Welle 1 zusätzlich `function-illustrations.pw.cjs -g Gewerke` gegen Port 3100.
- **Integration 09-09 (Phasen-Gate, Welle 4):** volle Vitest-Suite, Build, `seo-audit.mjs` sitewide **0** Verstöße (ohne Optionen), `route-audit.mjs` **0 Fehler / 0 defekte Links**, E2E-Auswahl (`design-v2.pw.cjs` neue Fälle, `function-illustrations.pw.cjs`, `navigation.pw.cjs`, `browser-functional.pw.cjs`) mit Fällen in 360/390/768/1024/1280/1440.
- **Vor `/gsd-verify-work` und vor dem Rollout 09-10:** Volllauf grün, `npm run sync:product:check`, `node scripts/check-no-secrets.mjs`, Durchsicht laut Abschnitt „Manuelle Prüfungen“ abgeschlossen, Screenshots nur im Sitzungs-Scratchpad (nicht committet).
- **Maximale Rückmeldelatenz:** 60 s (Schnelllauf).

---

## Sperre für schwere Läufe (Parallelbetrieb, `.planning/EXECUTOR-RULES.md`, D-28)

- **Schwer und nur unter Sperre:** Build, `next start`, Playwright-E2E, volle Vitest-Suite (`npm test`), Audits nach dem Build, visual/performance-audit, `npm ci`.
- **Ohne Sperre erlaubt:** gezielte einzelne Vitest-Dateien, `npm run lint`, `npm run typecheck`, `scripts/content-pruefen.mjs`.
- **Vorher:** Koordinationsstatus lesen, `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status`. Für die Website gibt es kein Rezept, deshalb läuft alles lokal und einzeln.
- **Sperre holen (atomar):** `until mkdir C:/Projekte/Websitenerstellung/.heavy-lock 2>/dev/null; do sleep 20; done; echo "<plan> $(date -u +%FT%TZ)" > C:/Projekte/Websitenerstellung/.heavy-lock/owner`.
- **Sperre freigeben:** sofort nach dem Lauf mit `rm -rf C:/Projekte/Websitenerstellung/.heavy-lock`; nie länger halten als den Lauf, nie eine fremde Sperre löschen (älter als 90 min → dem Orchestrator melden).
- **Ports und Prozesse:** Haupt-Arbeitsbaum 3100, Worktrees den im Plan genannten Port (3101–3108). Vor dem Start prüfen, dass der Port frei ist (belegt → abbrechen und melden). `kill $SRV` beendet unter Umständen nur eine Hilfs-Shell; danach den Port prüfen und nur die eigene, per netstat, Startzeit und Kommandozeile bestätigte PID beenden. Nie per Name oder Image beenden, nichts im Hintergrund zurücklassen.
- **Worktrees:** einmalig `npm ci --prefer-offline` in `craftos/` unter Sperre, keine Junctions auf fremde `node_modules`; `.env` nur im Haupt-Arbeitsbaum und nur lesend.
- **E2E-Flakes:** zeitabhängige WebKit-Fälle, die einzeln bestehen, sind bekannte Flakes (08 `deferred-items.md`). Höchstens ein voller Lauf plus Einzelwiederholung der Fehlschläge; neue, nicht zeitabhängige Fehlschläge immer beheben.

---

## Anforderung → Testzuordnung

| Anf.-ID | Verhalten | Testart | Automatisierter Befehl | Datei vorhanden |
|---------|-----------|---------|------------------------|-----------------|
| FEAT-04 | 12 Gewerke: `ablauf` 4–5 Schritte (Titel ≤ 28, Text ≤ 80), jeder `ablauf[].funktion` ∈ `funktionen`; `funktionen` 4–6 mit ≥ 1 Phase-7-Slug; 3–4 FAQ (Frage ≤ 90 mit „?“, Antwort ≤ 300), höchstens 1 gemeinsame Frage über alle 12; `answer` ≤ 300, `teaser` ≤ 100; `heroTitle`, `heroIntro`, `hatVorlagen` existieren nicht; H1 === `zielwerte(pfad).h1`; `kopfwort` (bzw. „Branchensoftware“ für `/gewerke`) wörtlich im H1; „zwölf“ = `gewerke.length`; `artikel`-Ziele existieren | unit | `npx vitest run tests/gewerke.test.ts` | ❌ W0 (09-11 Aufgabe 1, nach Merge von F-A1; vorher Prüfungen beim Laden in `lib/gewerke.ts`, 09-02) |
| FEAT-04 | FeatureSnippet je Gewerk behält passende Projekte, 360–1440, reduzierte Bewegung statisch, CLS 0 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs function-illustrations.pw.cjs -g Gewerke` | ✅ (Fälle ab Z. 341; 09-02, 09-11) |
| FEAT-04 / SEO-09 | Prompt-Anker `/gewerke/elektriker#antwort`, `/gewerke/maler#antwort`: vorhanden, ≤ 300, enthält `kurz` („Elektro“, „Maler“), Einträge bleiben `phase: 9`; Prompt-Lücken als feste Liste der 9 Wissensseiten (K-1) | unit + build | `npx vitest run tests/ai-prompts.test.ts`; `node scripts/seo-audit.mjs --only=prompts` | ✅ anpassen (K-1: 09-02 Aufgabe 1; Anker: 09-11 Aufgabe 2; Regel K-2: 09-01 Aufgabe 2) |
| FEAT-04 / DESIGN-02 | Gewerke- und Übersichtsseiten ohne Rasterbild in `<main>`; einzige `img` sind `/icons/gewerke/*.svg` mit `alt=""`; `/gewerke` ohne `werkstatt-2026` | unit | `npx vitest run tests/media-ki-label.test.ts tests/gewerke.test.ts` | ✅ anpassen (09-11) |
| CONTENT-03 | Jede Inhaltsdatei hat einen Map-Eintrag, jeder „bestehend“-Eintrag eine Datei (Map-Bezug statt fester 24/40/24); RSS-Items = Ratgeberzahl; Endmengen 30 Ratgeber / 53 Hilfe ab Integration | unit | `npx vitest run tests/content.test.ts` | ✅ umstellen (09-01 Aufgabe 2; Endwerte 09-09 Aufgabe 1) |
| CONTENT-03 | Frontmatter: `answer` ≤ 300, 1–2 Sätze (ab Integration Pflicht, D-18); `faq` 3–8, Frage ≤ 90 mit „?“, Antwort ≤ 300; `scene` ∈ `sceneById`; `sources` https + `checkedAt`; kein `<img` und kein `ol[start]` in der Prosa; Schritt ≤ 160, 2–10 je Liste; Überschriften ≤ 80; reservierte ids frei; FAQ-Frage nicht zugleich Überschrift; Map-H1 ≤ 100 | unit | `npx vitest run tests/content.test.ts` | ❌ W0 Fälle ergänzen (09-01 Aufgabe 2; Übergangsliste bis 09-09) |
| CONTENT-03 | Produktwahrheit und Leitlinie L-1: Wortliste aus `lib/leitlinie-l1.json` (UI-SPEC § 5) und Altbegriffe aus RESEARCH in 0 Dateien; Geltung ab Welle 2 `content/blog`, `content/hilfe`, `lib/gewerke.ts`, ab Integration zusätzlich `lib/funktionen.ts`, `lib/funktionsdetails/*.ts`, `lib/app-content.ts` (`.ts` nur String-Literale, K-10); Ausnahmen abschließend (neutraler Fachteil `/blog/gaeb-formate`, GoBD-FAQ auf `/gobd`, rechtlich nötige Hinweise) | unit + script | `npx vitest run tests/content-produktwahrheit.test.ts`; `node scripts/content-pruefen.mjs --l1 <dateien>` | ❌ W0 (Wortliste 09-01 Aufgabe 1, Test 09-01 Aufgabe 2; streng 09-09 Aufgabe 1) |
| CONTENT-03 | Prüfdatei `docs/content-pruefung/09-<paket>.md` je Paket vorhanden und nennt jeden Paketartikel (geprüft gegen, Änderungen, Belegpfade, Übergabeliste) | unit | `npx vitest run tests/content-pruefung.test.ts` | ❌ W0 (09-09 Aufgabe 1) |
| CONTENT-03 / CONTENT-04 | Bedienbegriffe in „…“ stehen im eingefrorenen Release-Commit (Web/Mobile aus `09-basis.md`) | script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate <dateien>` | ❌ W0 (09-01 Aufgabe 3) |
| CONTENT-03 / SEO-09 | Antwort zuerst auf `/gewerke*`, `/blog/*`, `/hilfe/*` (Regel über `istZentral` hinaus ausgedehnt, `mitAntwortRegel`) | unit + build | `npx vitest run tests/seo-audit-core.test.ts`; `node scripts/seo-audit.mjs --only=antwort [--paths=…]` | ✅ umstellen (09-01 Aufgabe 2) |
| CONTENT-04 | 14 neue Live-Funktionen → je ≥ 1 Hilfeartikel; Sekundärlink „Anleitung in der Hilfe“ bei `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme`; Kachel-`href: "/hilfe/<slug>"` laut D-21 mit Korrekturtabelle; Ziel-Datei existiert | unit | `npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts` | ✅ Tabelle ab Z. 272 erweitern (09-07 Aufgabe 3) |
| CONTENT-04 | Neue Artikel: nummerierte Schritte nur mit Release-belegten Bedienbegriffen; Aufbau wie D-13; L-1 | unit + script + Durchsicht | `npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts`; Prüfwerkzeug; Prüfdatei `09-f.md` | ❌ W0 (über 09-01) |
| SEO-09 (Rest) | Map: 10 neue Einträge und 9 Phase-9-Einträge mit vollständigem `target`; Titel ≤ 60, Description 120–155; neue H1 ≤ 70, Gewerke-H1 und `/gewerke`-H1 ≤ 60, Artikel-H1 ≤ 100; Herkunft der neuen Hauptkeywords (K-4); Status „geplant“ → ab Integration „bestehend“ | unit | `npx vitest run tests/keyword-map.test.ts tests/keyword-seeds.test.ts` | ✅ erweitern (09-01 Aufgaben 1 und 3, Status 09-09) |
| SEO-09 (Rest) | 9 Wissensseiten (3 Hilfe, 6 Ratgeber): Antwort zuerst, Fakten mit Quelle und `checkedAt`, sichtbare FAQ = FAQPage, kein `HowTo`; Gewerke-Software und Schlussrechnung answer-first mit FAQ | unit + build | `npx vitest run tests/content.test.ts`; `node scripts/seo-audit.mjs --paths=<Wissensseiten>` | ✅ (über Fundament-Fälle; 09-03, 09-05, 09-08, 09-11) |
| SEO-09 / D-24 | Metadaten, Brotkrumen, OG, Schema: genau 1 H1 = Map, keine Duplikate, genau 1 `nav[aria-label="Brotkrumen"]` + 1 BreadcrumbList, FAQPage nur und genau mit sichtbarer FAQ, `Article`/`TechArticle` unverändert, eigenes `og:image` je Seite; Sitemap und llms.txt enthalten neue URLs | unit + build | `npx vitest run tests/breadcrumbs.test.ts tests/llms.test.ts tests/content-vorlage.test.ts`; `node scripts/seo-audit.mjs` | ✅ (Vorlagentest neu in 09-12) |
| SEO-09 / D-24 | Interne Links: Gewerke-„Weiterlesen“, Artikel-Querverweise, Kategorie-Karten | build | `AUDIT_ORIGIN=http://localhost:<port> node scripts/route-audit.mjs` (0/0) | ✅ (09-09 Aufgabe 3) |
| DESIGN-02 (Vorlagen) | Gewerke-Vorlage, `/gewerke`, Artikelvorlage v2, Übersichten und Kategorien nur aus v2-Bausteinen; `LinkKarten`, `ContentKopf` im Budget; Fehlertexte wörtlich aus UI-SPEC § 5 | unit | `npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/content-vorlage.test.ts tests/gewerke.test.ts` | ✅ erweitern (09-01 Aufgabe 1, 09-12, 09-11) |
| DESIGN-02 (Vorlagen) | Darstellung für `/gewerke`, `/gewerke/elektriker`, `/gewerke/allrounder`, `/blog`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen` in 360/390/768/1024/1280/1440: kein horizontaler Seitenscroll; H1 `scrollWidth ≤ clientWidth`; Kopfwort-Span ≤ Container; 360 × 640 Gewerke-CTA- bzw. Artikel-Antwort-Unterkante ≤ 640; `StepFlow` waagerecht ab 1024; Inhaltsverzeichnis `details` < 1024, sticky ≥ 1024; Schrittknoten 40 × 40 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs design-v2.pw.cjs` | ❌ W0 neue Fälle (09-09 Aufgabe 3) |
| DESIGN-02 (Vorlagen) | A11y (axe `wcag2a`/`wcag2aa`/`wcag21aa`, keine serious/critical), `emulateMedia({ reducedMotion: "reduce" })` ohne laufende Animation, CLS 0 per `PerformanceObserver`, in allen sechs Breiten | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs design-v2.pw.cjs` | ❌ W0 neue Fälle (09-09 Aufgabe 3) |
| Alle (D-04) | Produkt-Snapshot aktuell gegen die eingefrorene Basis | unit + script | `npx vitest run tests/pricing-parity.test.ts`; `npm run sync:product:check` | ✅ (grün ab 09-01 Aufgabe 3) |

---

## Aufgabenmatrix

Bedrohungs-IDs aus den `<threat_model>`-Abschnitten der Pläne. „Paketende“ = einmal unter Sperre Build + `seo-audit.mjs --paths=<eigene Pfade>` (D-28). Alle Befehle aus `craftos/`.

| Aufgaben-ID | Plan / Spur / Port | Welle | Anforderung | Bedrohungsbezug | Sicheres Verhalten | Testart | Automatisierter Befehl | Datei vorhanden | Status |
|-------------|--------------------|-------|-------------|-----------------|--------------------|---------|------------------------|-----------------|--------|
| 09-01-T1 | 01 Fundament / basis / 3101 | 1 | DESIGN-02, SEO-09 | T-09-04 | F-A1 als einzelner Commit, Budgets nur additiv | unit (TDD) | `npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts tests/keyword-map.test.ts tests/funktionskopf.test.ts tests/breadcrumbs.test.ts && npm run typecheck && npm run lint` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 09-01-T2 | 01 Fundament / basis / 3101 | 1 | CONTENT-03, SEO-09 | T-09-01, T-09-04 | Rehype hinter Sanitize; Übergangslisten eingefroren | unit (TDD) | `npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/seo-audit-core.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts && npm run typecheck && npm run lint` | ❌ W0 (in der Aufgabe) | ⬜ offen |
| 09-01-T3 | 01 Fundament / basis / 3101 | 1 | CONTENT-03, CONTENT-04, SEO-09 | T-09-02, T-09-03 | Produktbasis nur nach Faktenabgleich; keine SE-Ranking-Abrufe; K-1-Voraussetzung vor dem Map-Commit | unit + script + build | `npx vitest run tests/keyword-map.test.ts tests/keyword-seeds.test.ts tests/pricing-parity.test.ts tests/product-register.test.ts tests/ai-prompts.test.ts && npm run sync:product:check`; Sperre: `npm test`, Build, `seo-audit.mjs --report` | ✅ | ⬜ offen |
| 09-02-T1 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04 | – | K-1 als einzelner Commit ohne Lockerung | unit | `npx vitest run tests/ai-prompts.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-02-T2 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04 | T-09-05 | keine unbelegten Zusagen, `hatVorlagen` entfernt | unit + script | `npx vitest run tests/content.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts tests/navigation.test.ts && npm run typecheck && npm run lint` + Wort-/Artikelprobe per Node | ✅ | ⬜ offen |
| 09-02-T3 | 02 (a) Gewerke 1 / a / 3102 | 1 | FEAT-04, DESIGN-02 | T-09-06 | FAQPage aus dem sichtbaren Array | unit + build + e2e | Vitest wie T2; Sperre: Build, `seo-audit.mjs --only=h1,map,breadcrumbs,faq-schema,og,title,description --paths=<12 Gewerke>`, `function-illustrations.pw.cjs -g Gewerke` auf 3102 | ✅ | ⬜ offen |
| 09-11-T1 | 11 (a) Gewerke 2 / a / 3102 | 2 | FEAT-04, DESIGN-02 | T-09-07, T-09-08 | Kopf mit belegter Antwort; keine Rasterbilder in `<main>` | unit (TDD) | `npx vitest run tests/gewerke.test.ts tests/media-ki-label.test.ts tests/content.test.ts tests/breadcrumbs.test.ts tests/llms.test.ts tests/funktionskopf.test.ts && npm run typecheck && npm run lint` | ❌ W0 (`gewerke.test.ts` in der Aufgabe) | ⬜ offen |
| 09-11-T2 | 11 (a) Gewerke 2 / a / 3102 | 2 | FEAT-04, SEO-09 | T-09-07 | Prompt-Anker ≤ 300 mit Gewerk | unit + build + e2e | `npx vitest run tests/gewerke.test.ts tests/ai-prompts.test.ts tests/content.test.ts`; Sperre: Build, `seo-audit.mjs --paths=<13 Gewerke-Pfade>`, `--only=prompts`, Gewerke-E2E auf 3102 | ✅ | ⬜ offen |
| 09-12-T1 | 12 Artikelvorlage / basis / 3101 | 2 | DESIGN-02, CONTENT-03 | T-09-10, T-09-12 | HTML nur aus sanitisiertem Markdown; kein HowTo | unit (TDD) | `npx vitest run tests/content-vorlage.test.ts tests/content.test.ts tests/breadcrumbs.test.ts tests/schema.test.ts tests/design-v2-components.test.ts && npm run typecheck && npm run lint` | ❌ W0 (`content-vorlage.test.ts` in der Aufgabe) | ⬜ offen |
| 09-12-T2 | 12 Artikelvorlage / basis / 3101 | 2 | DESIGN-02 | T-09-11 | Suche funktionsgleich, keine Eingabe als HTML | unit (TDD) + build | `npx vitest run tests/content-vorlage.test.ts tests/content.test.ts tests/breadcrumbs.test.ts`; Sperre: Build, `seo-audit.mjs --only=… --paths=<6 Vorlagenpfade>`, Sichtprüfung auf 3101 | ✅ | ⬜ offen |
| 09-03-T1 | 03 (b) Ratgeber 1 / b / 3103 | 2 | CONTENT-03, SEO-09 | T-09-13, T-09-14 | Rechtsfakten mit https-Quelle und Datum, kein Rechtsrat | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-b.md --zitate --l1 --antwort <4 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts && npm run typecheck && npm run lint` | ✅ (aus 09-01) | ⬜ offen |
| 09-03-T2 | 03 (b) Ratgeber 1 / b / 3103 | 2 | CONTENT-03 | T-09-13 | Bedienbegriffe mit Release-Beleg | unit + script | wie 09-03-T1 mit den 4 Kalkulationsartikeln | ✅ | ⬜ offen |
| 09-03-T3 | 03 (b) Ratgeber 1 / b / 3103 | 2 | CONTENT-03 | T-09-13 | D-03-Links bleiben | unit + script + build | wie T1 über alle 12; Paketende (12 Pfade) | ✅ | ⬜ offen |
| 09-04-T1 | 04 (c) Ratgeber 2 / c / 3104 | 2 | CONTENT-03 | T-09-15, T-09-16 | Bankabgleich nie „automatisch“, KI auf Anforderung | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-c.md --zitate --l1 --antwort <4 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-04-T2 | 04 (c) Ratgeber 2 / c / 3104 | 2 | CONTENT-03 | T-09-15 | Release-Reiter wörtlich | unit + script | wie 09-04-T1 mit den 4 Projektartikeln | ✅ | ⬜ offen |
| 09-04-T3 | 04 (c) Ratgeber 2 / c / 3104 | 2 | CONTENT-03 | T-09-15 | Offline positiv und belegt | unit + script + build | wie T1 über alle 12; Paketende (12 Pfade) | ✅ | ⬜ offen |
| 09-05-T1 | 05 (d) Hilfe 1 / d / 3105 | 2 | CONTENT-03 | T-09-17, T-09-18 | Rollen und Schalter wörtlich aus dem Release | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-d.md --zitate --l1 --antwort <9 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-05-T2 | 05 (d) Hilfe 1 / d / 3105 | 2 | CONTENT-03 | T-09-17 | GAEB-Formate nur positiv | unit + script | wie 09-05-T1 mit den 5 Angebotsartikeln | ✅ | ⬜ offen |
| 09-05-T3 | 05 (d) Hilfe 1 / d / 3105 | 2 | CONTENT-03, SEO-09 | T-09-17 | Schlussrechnung answer-first mit FAQ | unit + script + build | wie T1 über alle 21; Paketende (21 Pfade) | ✅ | ⬜ offen |
| 09-06-T1 | 06 (e) Hilfe 2 / e / 3106 | 2 | CONTENT-03, CONTENT-04 | T-09-19, T-09-20 | Release-Delta eingearbeitet, Arbeitsabschnitte belegt | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-e.md --zitate --l1 --antwort <9 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-06-T2 | 06 (e) Hilfe 2 / e / 3106 | 2 | CONTENT-03 | T-09-19 | KI-/Credit-Aussagen nur aus Register | unit + script | wie 09-06-T1 mit 7 Lager-/Craft-AI-Artikeln | ✅ | ⬜ offen |
| 09-06-T3 | 06 (e) Hilfe 2 / e / 3106 | 2 | CONTENT-03, CONTENT-04 | T-09-19 | Teilabnahme je Plattform belegt | unit + script + build | wie T1 über alle 19; Paketende (19 Pfade) | ✅ | ⬜ offen |
| 09-07-T1 | 07 (f) neue Hilfe / f / 3107 | 2 | CONTENT-04 | T-09-21, T-09-23 | Portal per Überweisung, Bankabgleich nicht automatisch | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-f.md --zitate --l1 --antwort <5 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-07-T2 | 07 (f) neue Hilfe / f / 3107 | 2 | CONTENT-04 | T-09-21 | keine Videoauswertung, DATANORM positiv | unit + script | wie 09-07-T1 mit den 5 weiteren Dateien | ✅ | ⬜ offen |
| 09-07-T3 | 07 (f) neue Hilfe / f / 3107 | 2 | CONTENT-04 | T-09-22 | Links nur auf existierende Ziele, L-1 in lib-Daten | unit (TDD) + script + build | `node scripts/content-pruefen.mjs --l1 <8 lib-Dateien> && npx vitest run tests/funktionsdetails.test.ts tests/app-seite.test.ts tests/funktionen-seite.test.ts tests/funktionsgruppen.test.ts tests/content.test.ts tests/content-produktwahrheit.test.ts`; Paketende (21 Pfade) | ✅ erweitern | ⬜ offen |
| 09-08-T1 | 08 (g) Wissensseiten / g / 3108 | 2 | SEO-09 | T-09-24, T-09-25 | amtliche Quellen datiert, kein Rechtsrat | unit + script | `node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-g.md --zitate --l1 --antwort <3 Dateien> && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint` | ✅ | ⬜ offen |
| 09-08-T2 | 08 (g) Wissensseiten / g / 3108 | 2 | SEO-09 | T-09-26 | Mängelanzeige ohne Dokumentzusage; GAEB nur X83/X84 | unit + script | wie 09-08-T1 mit den 3 Ratgeberdateien | ✅ | ⬜ offen |
| 09-08-T3 | 08 (g) Wissensseiten / g / 3108 | 2 | SEO-09 | T-09-24 | Vorlagen als Tabelle, keine Downloads | unit + script + build | wie T1 über alle 9 (+ `tests/ai-prompts.test.ts`); Paketende (9 Pfade) | ✅ | ⬜ offen |
| 09-13-T1 | 13 (a) Gewerke 3 / a / 3102 | 3 | FEAT-04 | T-09-09 | Links nur auf existierende Ziele | unit (TDD) + build | `npx vitest run tests/gewerke.test.ts tests/content.test.ts && npm run typecheck && npm run lint`; Sperre: Build, `seo-audit.mjs --paths=<13 Gewerke-Pfade>` | ✅ | ⬜ offen |
| 09-09-T1 | 09 Integration / main / 3100 | 4 | CONTENT-03, CONTENT-04, SEO-09 | T-09-27 | Übergänge vollständig entfernt, `answer`-Pflicht | unit (TDD) | `npx vitest run tests/keyword-map.test.ts tests/content.test.ts tests/content-produktwahrheit.test.ts tests/content-pruefung.test.ts tests/ai-prompts.test.ts tests/gewerke.test.ts tests/funktionsdetails.test.ts && npm run typecheck && npm run lint` + Restmarker-Probe per Node | ❌ W0 (`content-pruefung.test.ts` in der Aufgabe) | ⬜ offen |
| 09-09-T2 | 09 Integration / main / 3100 | 4 | CONTENT-03, SEO-09 | T-09-28 | Release-Delta nur nach Faktenabgleich | unit + script | `node scripts/content-pruefen.mjs --l1 --antwort content/blog/*.md content/hilfe/*.md && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/content-pruefung.test.ts tests/llms.test.ts tests/pricing-parity.test.ts && npm run sync:product:check` | ✅ | ⬜ offen |
| 09-09-T3 | 09 Integration / main / 3100 | 4 | FEAT-04, DESIGN-02, SEO-09 | T-09-29, T-09-30 | sitewide 0 Verstöße, axe ohne serious/critical, CLS 0 | unit + build + e2e + Sichtprüfung | Sperre: `npm test`, Lint, Typcheck, `sync:product:check`, `check-no-secrets.mjs`, Build, `seo-audit.mjs` (sitewide 0), E2E `design-v2`, `function-illustrations`, `navigation`, `browser-functional` auf 3100, `route-audit.mjs` (0/0) | ❌ W0 (neue E2E-Fälle in der Aufgabe) | ⬜ offen |
| 09-10-T1 | 10 (h) Rollout / main / 3100 | 5 | FEAT-04, CONTENT-03, CONTENT-04, SEO-09 | T-09-33 | volle Suite vor dem Push | gate + e2e + script | Sperre: Volllauf wie 09-09-T3 + `npm run test:e2e` + `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | ✅ erweitern (`live-check.mjs`) | ⬜ offen |
| 09-10-T2 | 10 (h) Rollout / main / 3100 | 5 | FEAT-04, CONTENT-03, CONTENT-04, SEO-09 | T-09-31, T-09-32, T-09-34, T-09-35 | kein Cloud-CI, `gh workflow list --all` vor jedem Push, keine Geheimnisse, Units ≤ 4.000, ehrlicher Status | gate + script (live) | `node scripts/live-check.mjs` gegen https://craftos.eu, `node scripts/check-no-secrets.mjs docs/seo`, Nachweisprüfung PHASE-09-ROLLOUT.md per Node | ✅ | ⬜ offen |

*Status: ⬜ offen · ✅ grün · ❌ rot · ⚠️ wackelig*

Abtastkontinuität: Jede der 34 Aufgaben hat einen automatisierten Verify-Befehl; keine drei aufeinanderfolgenden Aufgaben ohne automatisierte Prüfung. Wave-0-Dateien entstehen jeweils in der Aufgabe, die sie prüft, per TDD (rot → grün). Inhaltspakete prüfen leichtgewichtig und nur am Paketende schwer (D-28). DESIGN-02 bleibt nach dem Rollout „In Progress“ (D-30).

**Synchronisationspunkte (Orchestrator):** (1) 09-02-T1 (K-1) und 09-01-T1 (F-A1) werden je als einzelner Commit vorgezogen nach main gemergt; 09-01-T3 prüft K-1 vor dem Map-Commit, 09-11 prüft F-A1 beim Start. (2) Welle 2 startet nach dem Merge von 09-01; 09-11 darf schon nach F-A1 starten. (3) 09-13 startet nach dem Merge von 09-07 und 09-08. (4) 09-09 nach allen Spuren; 09-10 nach dem Code-Review-Gate.

---

## Wave-0-Anforderungen (Lücken)

- [ ] `craftos/lib/leitlinie-l1.json` + `lib/leitlinie.ts` — Wortliste L-1, Altbegriffe, Ausnahmen (09-01-T1)
- [ ] `craftos/tests/content-produktwahrheit.test.ts` — Wortliste L-1 und Altbegriffe mit abschließenden Ausnahmen und eingefrorener Übergangsliste (09-01-T2; streng 09-09-T1)
- [ ] Map-Bezug und Frontmatter-Fälle (`answer`, `faq`, `scene`, Schritte, Überschriften, `<img`, `ol[start]`, reservierte ids) in `craftos/tests/content.test.ts` (09-01-T2)
- [ ] `craftos/scripts/content-pruefen.mjs` — Zitat-, L-1- und Antwortprüfung je Paket (09-01-T3)
- [ ] `craftos/tests/gewerke.test.ts` — Gewerke-Daten, Budgets, H1 = Map, `kopfwort`, verbotene Felder (09-11-T1, nach dem Merge von F-A1)
- [ ] `craftos/tests/content-vorlage.test.ts` — Artikelvorlage, Übersichten, Kategorien (09-12-T1)
- [ ] `craftos/tests/content-pruefung.test.ts` — Prüfdatei je Paket nennt jeden Paketartikel (09-09-T1)
- [ ] Neue E2E-Fälle Artikelvorlage, Übersichten, Kategorien und Gewerke in `craftos/tests/e2e/design-v2.pw.cjs` (Datei steht bereits in `testMatch`; 09-09-T3)
- [ ] Anpassungen im Bestand: `seo-audit-core.mjs` + `seo-audit-core.test.ts` (Antwort-zuerst-Ausweitung, K-2; 09-01-T2), `keyword-map.test.ts` (09-01-T1/T3, streng 09-09-T1), `design-v2-budgets.test.ts` (nur 09-01-T1), `ai-prompts.test.ts` (K-1 09-02-T1, Anker 09-11-T2) + `ai-prompts-targets.json` (09-11-T2), `media-ki-label.test.ts` (09-11-T1), `funktionsdetails.test.ts` (09-07-T3), `pricing-parity.test.ts` (Sync 09-01-T3), `live-check.mjs` (09-10-T1)

---

## Manuelle Prüfungen

| Verhalten | Anforderung | Warum manuell | Prüfanleitung |
|-----------|-------------|---------------|---------------|
| Gewerke-Ablauf fachlich passend je Gewerk | FEAT-04 | fachliche Zuordnung (RESEARCH A1, [ASSUMED]) | je Gewerk Schritte gegen die belegten Funktionen und den Gewerkalltag lesen; Ergebnis in `docs/content-pruefung/09-a.md` (09-02-T2, 09-11-T2) |
| Beispielkachel und FeatureSnippet erzählen denselben Auftrag | FEAT-04 | inhaltliche Stimmigkeit | je Gewerk `example` mit `tradeSnippetExamples` vergleichen |
| Erster Satz jeder Antwort beantwortet die Frage direkt (Wert, Name oder „Ja.“) | CONTENT-03, SEO-09 | Sprachurteil über Längenprüfung hinaus | Durchsicht je Paket bzw. Code-Review-Gate; Befund in `09-<paket>.md` |
| Schritte enthalten genau eine Handlung im Sie-Imperativ; Ergebnis steht unter „Ergebnis prüfen“ | CONTENT-03, CONTENT-04 | Satzbau nicht zuverlässig maschinell prüfbar | Stichprobe je Artikel im Paket, vollständig im Review-Gate |
| L-1-Umformulierungen sachlich richtig (über die Wortliste hinaus) | CONTENT-03, CONTENT-04 | Wortliste fängt nur Formulierungen, nicht Inhalte | jede Umformulierung gegen Register bzw. Release-Pfad prüfen |
| Bedienbegriffe in „…“ tragen einen Release-Beleg | CONTENT-03, CONTENT-04 | Beleg liegt in fremden Repos | Prüfwerkzeug `--zitate` plus Belegpfad je Begriff in `docs/content-pruefung/09-<paket>.md`; Zitat-Ausnahmen nur mit Begründung |
| Rechts- und Steuerfakten aktuell (Quelle neu abgerufen, BMF-FAQ bzw. Primärquelle) | SEO-09 (Rest), CONTENT-03 | fremde Seiten ändern sich | Quellen öffnen, Aussage und `checkedAt` vergleichen; [ASSUMED]-Paragraphen nur mit bestätigter Quelle (09-08) |
| Echte Silbentrennung in H1 (`ContentKopf`) und Prosa-H2 | DESIGN-02 | Wörterbuch je Browser ungeprüft | Stichprobe in Safari/WebKit und Chrome bei 360 und 390 |
| Gesamteindruck der drei Vorlagen (ruhig, strukturiert, weniger Text) | DESIGN-02 | ästhetisches Urteil | Screenshots 360/1440 (Chromium) und 390 (WebKit) aus dem Sitzungs-Scratchpad (09-11, 09-12, 09-09) sichten, Befunde an den Executor zurückgeben |
| Analytics und SE-Ranking nach dem Rollout | Rollout (D-29) | Daten erst nach Stunden bzw. mit Inhaberzugang | Anleitung in `craftos/docs/releases/PHASE-09-ROLLOUT.md` |

---

## Validierungsfreigabe

- [x] Alle Aufgaben haben einen `<automated>`-Verify oder Wave-0-Abhängigkeiten (34 Aufgaben in 13 Plänen)
- [x] Abtastkontinuität: keine drei aufeinanderfolgenden Aufgaben ohne automatisierten Verify
- [x] Wave 0 deckt alle fehlenden Referenzen ab
- [x] Keine Watch-Mode-Flags (`vitest run`, Playwright ohne `--ui`)
- [x] Rückmeldelatenz < 60 s
- [x] `nyquist_compliant: true` im Frontmatter gesetzt

**Freigabe:** geplant 2026-10-22 (Aufgaben-IDs und Bedrohungsbezüge aus den PLAN-Dateien 09-01 bis 09-13 übernommen)
