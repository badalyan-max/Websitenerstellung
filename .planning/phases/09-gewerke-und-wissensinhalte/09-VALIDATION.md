---
phase: 9
slug: gewerke-und-wissensinhalte
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-10-22
---

# Phase 9 — Validierungsstrategie

> Validierungsvertrag dieser Phase für die Rückmeldung während der Ausführung. Quellen: 09-RESEARCH.md „Validation Architecture“, 09-UI-SPEC.md § 8 „Prüfkriterien für Tests und seo-audit“, 09-CONTEXT.md (D-04, D-24, D-26 bis D-30). Alle Prüfungen laufen ausschließlich lokal (globale Regel 5); GitHub Actions und andere Cloud-Runner sind kein Beleg, es wird nie zum Testen gepusht. Schwere Läufe nur einzeln unter der gemeinsamen Sperre (Abschnitt „Sperre für schwere Läufe“). Die PLAN-Dateien existieren noch nicht; die Aufgaben-IDs in der Aufgabenmatrix sind Platzhalter je Plan nach dem Paketzuschnitt aus 09-CONTEXT und werden vom Planer konkretisiert. Danach setzt der Planer `status: planned` und `nyquist_compliant: true`.

---

## Testinfrastruktur

| Eigenschaft | Wert |
|-------------|------|
| **Framework** | Vitest ^5 im Node-Modus (`environment: 'node'`, Komponenten per `renderToString` aus `react-dom/server` geprüft, kein jsdom), Alias `@` und `server-only` → `tests/server-only.ts`; Playwright ^1.63 mit `@axe-core/playwright` (Regeln `wcag2a`, `wcag2aa`, `wcag21aa`), Chromium und WebKit; Post-Build-Audits `scripts/seo-audit.mjs` und `scripts/route-audit.mjs` |
| **Konfiguration** | `craftos/vitest.config.ts` (`include: tests/**/*.test.ts`); `craftos/tests/e2e/playwright.config.cjs` mit **explizitem `testMatch`** (heute `browser-functional`, `function-illustrations`, `navigation`, `design-v2`, `home-navigation`, `funktionsdetails`, ab 08-13 zusätzlich `vergleich.pw.cjs`). Phase 9 legt keine neue E2E-Datei an; neue Fälle kommen in `design-v2.pw.cjs` und `function-illustrations.pw.cjs`. Wer doch eine neue `.pw.cjs` anlegt, muss sie im selben Commit in `testMatch` eintragen, sonst läuft sie stumm nicht. |
| **Schnelllauf (ohne Sperre)** | `cd craftos && npx vitest run <betroffene tests/*.test.ts> && npm run typecheck && npm run lint` – Standardauswahl: `npx vitest run tests/content.test.ts tests/keyword-map.test.ts tests/seo-audit-core.test.ts` |
| **Volllauf (unter Sperre)** | `cd craftos && npm test && npm run lint && npm run typecheck && npm run build && node scripts/seo-audit.mjs [--paths=<eigene Pfade> \| --only=…] && AUDIT_ORIGIN=http://localhost:<port> node scripts/route-audit.mjs`; für E2E Port prüfen, `node node_modules/next/dist/bin/next start -p <port> & SRV=$!` → `kill -0 $SRV` → `npm run test:e2e` (bzw. gezielt `npx playwright test -c tests/e2e/playwright.config.cjs <datei> [-g …]`) → `kill $SRV` und Port frei prüfen. Port 3100 im Haupt-Arbeitsbaum, 3101–3108 in den Worktrees `C:/Projekte/wt-09<x>`. |
| **Geschätzte Laufzeit** | Schnelllauf ca. 30–60 s; Paketende (Build + Audit `--paths`) ca. 6–10 min; Volllauf mit E2E ca. 15–25 min (Build mit OG-Bildern für 83 neue bzw. überarbeitete Artikel und 12 Gewerke) |

---

## Abtastrate

- **Nach jedem Aufgaben-Commit:** Schnelllauf mit den im `<verify>` der Aufgabe genannten Vitest-Dateien des Pakets, dazu `npm run lint` und `npm run typecheck` (ohne Sperre, D-28).
- **Am Paketende (einmal je Paket, D-28):** unter Sperre einmal `npm run build` und `node scripts/seo-audit.mjs --paths=<eigene Pfade>` mit 0 Verstößen; Inhaltspakete (b)–(g) fahren keinen vollen E2E-Lauf.
- **Nach jeder Welle (Orchestrator nach dem Merge auf `main`):** volle Vitest-Suite und Build unter Sperre; nach Welle 1 zusätzlich `function-illustrations.pw.cjs -g Gewerke` gegen Port 3100.
- **Integration 09-09 (Phasen-Gate):** volle Vitest-Suite, Build, `seo-audit.mjs` sitewide **0** Verstöße (ohne Optionen), `route-audit.mjs` **0 Fehler / 0 defekte Links**, E2E-Auswahl (`design-v2.pw.cjs` neue Fälle, `function-illustrations.pw.cjs`, `navigation.pw.cjs`, `browser-functional.pw.cjs`) in 360/390/768/1024/1280/1440.
- **Vor `/gsd-verify-work` und vor dem Rollout 09-10:** Volllauf grün, `npm run sync:product:check`, `node scripts/check-no-secrets.mjs`, Durchsicht laut Abschnitt „Manuelle Prüfungen“ abgeschlossen, Screenshots nur im Sitzungs-Scratchpad (nicht committet).
- **Maximale Rückmeldelatenz:** 60 s (Schnelllauf).

---

## Sperre für schwere Läufe (Parallelbetrieb, `.planning/EXECUTOR-RULES.md`, D-28)

- **Schwer und nur unter Sperre:** Build, `next start`, Playwright-E2E, volle Vitest-Suite (`npm test`), Audits nach dem Build, visual/performance-audit, `npm ci`.
- **Ohne Sperre erlaubt:** gezielte einzelne Vitest-Dateien, `npm run lint`, `npm run typecheck`.
- **Vorher:** Koordinationsstatus lesen, `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status`. Für die Website gibt es kein Rezept, deshalb läuft alles lokal und einzeln.
- **Sperre holen (atomar):** `until mkdir C:/Projekte/Websitenerstellung/.heavy-lock 2>/dev/null; do sleep 20; done; echo "<plan> $(date -u +%FT%TZ)" > C:/Projekte/Websitenerstellung/.heavy-lock/owner`.
- **Sperre freigeben:** sofort nach dem Lauf mit `rm -rf C:/Projekte/Websitenerstellung/.heavy-lock`; nie länger halten als den Lauf, nie eine fremde Sperre löschen (älter als 90 min → dem Orchestrator melden).
- **Ports und Prozesse:** Haupt-Arbeitsbaum 3100, Worktrees den im Auftrag genannten Port (3101–3108). Vor dem Start prüfen, dass der Port frei ist (belegt → abbrechen und melden). `kill $SRV` beendet unter Umständen nur eine Hilfs-Shell; danach den Port prüfen und nur die eigene, per netstat, Startzeit und Kommandozeile bestätigte PID beenden. Nie per Name oder Image beenden, nichts im Hintergrund zurücklassen.
- **Worktrees:** einmalig `npm ci --prefer-offline` in `craftos/` unter Sperre, keine Junctions auf fremde `node_modules`; `.env` nur im Haupt-Arbeitsbaum und nur lesend.
- **E2E-Flakes:** zeitabhängige WebKit-Fälle, die einzeln bestehen, sind bekannte Flakes (08 `deferred-items.md`). Höchstens ein voller Lauf plus Einzelwiederholung der Fehlschläge; neue, nicht zeitabhängige Fehlschläge immer beheben.

---

## Anforderung → Testzuordnung

| Anf.-ID | Verhalten | Testart | Automatisierter Befehl | Datei vorhanden |
|---------|-----------|---------|------------------------|-----------------|
| FEAT-04 | 12 Gewerke: `ablauf` 4–5 Schritte (Titel ≤ 28, Text ≤ 80), jeder `ablauf[].funktion` ∈ `funktionen`; `funktionen` 4–6 mit ≥ 1 Phase-7-Slug; 3–4 FAQ (Frage ≤ 90 mit „?“, Antwort ≤ 300), höchstens 1 gemeinsame Frage über alle 12; `answer` ≤ 300, `teaser` ≤ 100; `heroTitle`, `heroIntro`, `hatVorlagen` existieren nicht; H1 === `zielwerte(pfad).h1`; `kopfwort` (bzw. „Branchensoftware“ für `/gewerke`) wörtlich im H1; „zwölf“ = `gewerke.length`; `artikel`-Ziele existieren | unit | `npx vitest run tests/gewerke.test.ts` | ❌ W0 (09-02, nach Merge von „09-01 Aufgabe 1“) |
| FEAT-04 | FeatureSnippet je Gewerk behält passende Projekte, 360–1440, reduzierte Bewegung statisch, CLS 0 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs function-illustrations.pw.cjs -g Gewerke` | ✅ (Fälle ab Z. 341, nur bei Szenenwechsel umstellen, D-06) |
| FEAT-04 / SEO-09 | Prompt-Anker `/gewerke/elektriker#antwort`, `/gewerke/maler#antwort`: vorhanden, ≤ 300, enthält `kurz` („Elektro“, „Maler“), Einträge bleiben `phase: 9` | unit + build | `npx vitest run tests/ai-prompts.test.ts`; `node scripts/seo-audit.mjs --only=prompts` | ✅ anpassen (Z. 86–87, 09-02) |
| FEAT-04 / DESIGN-02 | Gewerke- und Übersichtsseiten ohne Rasterbild in `<main>`; einzige `img` sind `/icons/gewerke/*.svg` mit `alt=""`; `/gewerke` ohne `werkstatt-2026` | unit | `npx vitest run tests/media-ki-label.test.ts` | ✅ anpassen (09-02) |
| CONTENT-03 | Jede Inhaltsdatei hat einen Map-Eintrag, jeder „bestehend“-Eintrag eine Datei (Map-Bezug statt fester 24/40/24); RSS-Items = Ratgeberzahl; Endmengen 30 Ratgeber / 53 Hilfe ab Integration | unit | `npx vitest run tests/content.test.ts` | ✅ umstellen (Z. 15/16/45, 09-01; Endwerte 09-09) |
| CONTENT-03 | Frontmatter: `answer` ≤ 300, 1–2 Sätze (ab Integration Pflicht, D-18); `faq` 3–8, Frage ≤ 90 mit „?“, Antwort ≤ 300; `scene` ∈ `sceneById`; `sources` https + `checkedAt`; kein `<img` und kein `ol[start]` in der Prosa; Schritt ≤ 160, 2–10 je Liste; Überschriften ≤ 80; reservierte ids frei; FAQ-Frage nicht zugleich Überschrift; Map-H1 ≤ 100 | unit | `npx vitest run tests/content.test.ts` | ❌ W0 Fälle ergänzen (09-01) |
| CONTENT-03 | Produktwahrheit und Leitlinie L-1: Wortliste aus UI-SPEC § 5 und Altbegriffe aus RESEARCH („Neue Phase“, „Asset hinzufügen“, „Ressourcen verwalten“, „Keine Koordinaten“, „Konflikt erkannt“, „Finanzen sichtbar“, „Teamleitung (Zeiten für andere)“, „.x84 und .d83“, „Admin-Lizenz“, „Büro-Lizenz“, „DATANORM v5“, „nicht unterstützt“, „verspricht keine“ …) in 0 Dateien; Geltung ab Welle 2 `content/blog`, `content/hilfe`, `lib/gewerke.ts`, ab Integration zusätzlich `lib/funktionen.ts`, `lib/funktionsdetails/*.ts`, `lib/app-content.ts`; Ausnahmen abschließend (neutraler Fachteil `/blog/gaeb-formate`, GoBD-FAQ auf `/gobd`, rechtlich nötige Hinweise) | unit | `npx vitest run tests/content-produktwahrheit.test.ts` | ❌ W0 (09-01) |
| CONTENT-03 | Prüfdatei `docs/content-pruefung/09-<paket>.md` je Paket vorhanden und nennt jeden Paketartikel (geprüft gegen, Änderungen, Belegpfade) | unit | `npx vitest run tests/content-pruefung.test.ts` | ❌ W0 (09-09) |
| CONTENT-03 / SEO-09 | Antwort zuerst auf `/gewerke*`, `/blog/*`, `/hilfe/*` (Regel über `istZentral` hinaus ausgedehnt) | unit + build | `npx vitest run tests/seo-audit-core.test.ts`; `node scripts/seo-audit.mjs --only=antwort [--paths=…]` | ✅ umstellen (Z. 361–366, 09-01) |
| CONTENT-04 | 14 neue Live-Funktionen → je ≥ 1 Hilfeartikel; Sekundärlink „Anleitung in der Hilfe“ bei `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme`; Kernpunkt-Kacheln mit `href: "/hilfe/<slug>"` laut D-21; Ziel-Datei existiert | unit | `npx vitest run tests/funktionsdetails.test.ts` | ✅ Tabelle ab Z. 272 erweitern (09-07) |
| CONTENT-04 | Neue Artikel: nummerierte Schritte nur mit Release-belegten Bedienbegriffen; Aufbau wie D-13; L-1 | unit + Durchsicht | `npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts`; Prüfdatei `09-f.md` | ❌ W0 (über 09-01) |
| SEO-09 (Rest) | Map: 10 neue Einträge und 9 Phase-9-Einträge mit vollständigem `target`; Titel ≤ 60, Description 120–155; neue H1 ≤ 70, Gewerke-H1 und `/gewerke`-H1 ≤ 60, Artikel-H1 ≤ 100; Status „geplant“ → ab Integration „bestehend“ | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ erweitern (09-01, Status 09-09) |
| SEO-09 (Rest) | 9 Wissensseiten (3 Hilfe, 6 Ratgeber): Antwort zuerst, Fakten mit Quelle und `checkedAt`, sichtbare FAQ = FAQPage, kein `HowTo`; Gewerke-Software und Schlussrechnung answer-first mit FAQ | unit + build | `npx vitest run tests/content.test.ts`; `node scripts/seo-audit.mjs --paths=<Wissensseiten>` | ✅ (über Fundament-Fälle) |
| SEO-09 / D-24 | Metadaten, Brotkrumen, OG, Schema: genau 1 H1 = Map, keine Duplikate, genau 1 `nav[aria-label="Brotkrumen"]` + 1 BreadcrumbList, FAQPage nur und genau mit sichtbarer FAQ, `Article`/`TechArticle` unverändert, eigenes `og:image` je Seite; Sitemap und llms.txt enthalten neue URLs | unit + build | `npx vitest run tests/breadcrumbs.test.ts tests/llms.test.ts`; `node scripts/seo-audit.mjs` | ✅ |
| SEO-09 / D-24 | Interne Links: Gewerke-„Weiterlesen“, Artikel-Querverweise, Kategorie-Karten | build | `AUDIT_ORIGIN=http://localhost:<port> node scripts/route-audit.mjs` (0/0) | ✅ |
| DESIGN-02 (Vorlagen) | Gewerke-Vorlage, `/gewerke`, Artikelvorlage v2, Übersichten und Kategorien nur aus v2-Bausteinen; `LinkKarten`, `ContentKopf`, 12 Gewerke-Seiten, `/gewerke`, `/blog`, `/hilfe` im Budget; Fehlertexte wörtlich aus UI-SPEC § 5 | unit | `npx vitest run tests/design-v2-budgets.test.ts tests/design-v2-components.test.ts` | ✅ erweitern (09-01, 09-02) |
| DESIGN-02 (Vorlagen) | Darstellung für `/gewerke`, `/gewerke/elektriker`, `/gewerke/allrounder`, `/blog`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen` in 360/390/768/1024/1280/1440: kein horizontaler Seitenscroll; H1 `scrollWidth ≤ clientWidth`; Kopfwort-Span ≤ Container; 360 × 640 Gewerke-CTA- bzw. Artikel-Antwort-Unterkante ≤ 640; `StepFlow` waagerecht ab 1024; Inhaltsverzeichnis `details` < 1024, sticky ≥ 1024; Schrittknoten 40 × 40 | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs design-v2.pw.cjs` | ❌ W0 neue Fälle (09-09) |
| DESIGN-02 (Vorlagen) | A11y (axe `wcag2a`/`wcag2aa`/`wcag21aa`, keine serious/critical), `emulateMedia({ reducedMotion: "reduce" })` ohne laufende Animation, CLS 0 per `PerformanceObserver`, in allen sechs Breiten | e2e | `npx playwright test -c tests/e2e/playwright.config.cjs design-v2.pw.cjs` | ❌ W0 neue Fälle (09-09) |
| Alle (D-04) | Produkt-Snapshot aktuell gegen die eingefrorene Basis | unit + script | `npx vitest run tests/pricing-parity.test.ts`; `npm run sync:product:check` | ✅ (rot bis zum Fundament-Sync) |

---

## Aufgabenmatrix (Platzhalter je Plan, vom Planer zu konkretisieren)

| Aufgaben-ID | Plan | Welle | Anforderung | Bedrohungsbezug | Sicheres Verhalten | Testart | Automatisierter Befehl | Datei vorhanden | Status |
|-------------|------|-------|-------------|-----------------|--------------------|---------|------------------------|-----------------|--------|
| 09-01-T* | 01 Fundament | 1 | CONTENT-03, SEO-09, DESIGN-02 | T-09-xx (Markdown-Injektion, Schlüsselleck) | `rehype-sanitize` vor `rehype-slug`, keine Roh-HTML-Blöcke; SE-Ranking-Rohdaten ohne Schlüssel; Produktbasis nur nach Faktenabgleich | unit (TDD) + build | `cd craftos && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts tests/keyword-map.test.ts tests/seo-audit-core.test.ts tests/design-v2-budgets.test.ts tests/pricing-parity.test.ts && npm run typecheck && npm run lint`; Paketende unter Sperre: Build + `node scripts/seo-audit.mjs --report` | ❌ W0 (im Plan) | ⬜ offen |
| 09-02-T* | 02 (a) Gewerke | 1–2 | FEAT-04, SEO-09, DESIGN-02 | T-09-xx | nur am Release belegte Funktionen, kein `hatVorlagen`, JSON-LD nur über `JsonLd` | unit (TDD) + build + e2e | `cd craftos && npx vitest run tests/gewerke.test.ts tests/ai-prompts.test.ts tests/media-ki-label.test.ts tests/design-v2-budgets.test.ts tests/keyword-map.test.ts && npm run typecheck && npm run lint`; Paketende unter Sperre: Build, `seo-audit.mjs --paths=/gewerke,/gewerke/…`, `function-illustrations.pw.cjs -g Gewerke` | ❌ W0 (`gewerke.test.ts` im Plan) | ⬜ offen |
| 09-03-T* | 03 (b) Ratgeber 1 | 2 | CONTENT-03, SEO-09 | T-09-xx | Rechtsfakten mit https-Quelle und Datum, kein Rechtsrat | unit + build | `cd craftos && npx vitest run tests/content.test.ts tests/content-produktwahrheit.test.ts && npm run typecheck && npm run lint`; Paketende unter Sperre: Build + `seo-audit.mjs --paths=<12 Ratgeber>` | ✅ (aus 09-01) | ⬜ offen |
| 09-04-T* | 04 (c) Ratgeber 2 | 2 | CONTENT-03 | T-09-xx | wie (b) | unit + build | wie 09-03 mit eigenen Pfaden | ✅ (aus 09-01) | ⬜ offen |
| 09-05-T* | 05 (d) Hilfe 1 | 2 | CONTENT-03, SEO-09 | T-09-xx | Bedienbegriffe mit Release-Beleg | unit + build | wie 09-03 mit 21 Hilfepfaden | ✅ (aus 09-01) | ⬜ offen |
| 09-06-T* | 06 (e) Hilfe 2 | 2 | CONTENT-03, CONTENT-04 | T-09-xx | Teilabnahme/Arbeitsabschnitte nur belegt | unit + build | wie 09-03 mit 19 Hilfepfaden | ✅ (aus 09-01) | ⬜ offen |
| 09-07-T* | 07 (f) neue Hilfeartikel | 2 | CONTENT-04 | T-09-xx | L-1-Umformulierungen, Links nur auf existierende Ziele | unit (TDD) + build | `cd craftos && npx vitest run tests/funktionsdetails.test.ts tests/content.test.ts tests/content-produktwahrheit.test.ts tests/app-seite.test.ts && npm run typecheck && npm run lint`; Paketende unter Sperre: Build + `seo-audit.mjs --paths=<10 neue Artikel>` | ✅ erweitern | ⬜ offen |
| 09-08-T* | 08 (g) Wissensseiten | 2 | SEO-09 | T-09-xx | amtliche Quellen datiert; „Mängelanzeige“ ohne Dokumentzusage | unit + build | wie 09-03 mit 9 Wissensseiten | ✅ (aus 09-01) | ⬜ offen |
| 09-09-T* | 09 Integration | 3 | alle | T-09-xx | `answer`-Pflicht, Map „bestehend“, Release-Delta nur als Delta | unit + build + e2e + Sichtprüfung | Volllauf unter Sperre: `npm test`, Build, `node scripts/seo-audit.mjs` (sitewide 0), `route-audit.mjs` (0/0), `npx vitest run tests/content-pruefung.test.ts`, `design-v2.pw.cjs` (neue Fälle), `function-illustrations.pw.cjs`, `navigation.pw.cjs`, `browser-functional.pw.cjs` | ❌ W0 (`content-pruefung.test.ts`, E2E-Fälle im Plan) | ⬜ offen |
| 09-10-T* | 10 (h) Rollout | 4 | FEAT-04, CONTENT-03, CONTENT-04, SEO-09 | T-09-xx | kein Cloud-CI, `gh workflow list --all` vor Push, keine Geheimnisse, ehrlicher Status | gate + script (live) | Volllauf, `npm run sync:product:check`, `node scripts/check-no-secrets.mjs`, danach `node scripts/live-check.mjs` gegen https://craftos.eu, `npm run indexnow`, `node scripts/se-ranking-sync.mjs --check`, `node scripts/seo-report.mjs --etappe rollout-phase09` | ✅ erweitern (`live-check.mjs`) | ⬜ offen |

*Status: ⬜ offen · ✅ grün · ❌ rot · ⚠️ wackelig*

Abtastkontinuität: Jede Aufgabe erhält einen automatisierten Verify-Befehl; keine drei aufeinanderfolgenden Aufgaben ohne automatisierte Prüfung. Wave-0-Dateien entstehen jeweils in der ersten Aufgabe ihres Plans per TDD (rot → grün). Inhaltspakete prüfen leichtgewichtig und nur am Paketende schwer (D-28). DESIGN-02 bleibt nach dem Rollout „In Progress“ (D-30).

---

## Wave-0-Anforderungen (Lücken)

- [ ] `craftos/tests/gewerke.test.ts` — Gewerke-Daten, Budgets, H1 = Map, `kopfwort`, verbotene Felder (09-02, entsteht erst nach dem Merge von „09-01 Aufgabe 1“)
- [ ] `craftos/tests/content-produktwahrheit.test.ts` — Wortliste L-1 und Altbegriffe mit abschließenden Ausnahmen (09-01)
- [ ] Map-Bezug und Frontmatter-Fälle (`answer`, `faq`, `scene`, Schritte, Überschriften, `<img`, `ol[start]`, reservierte ids) in `craftos/tests/content.test.ts` (09-01)
- [ ] `craftos/tests/content-pruefung.test.ts` — Prüfdatei je Paket nennt jeden Paketartikel (09-09)
- [ ] Neue E2E-Fälle Artikelvorlage, Übersichten, Kategorien und Gewerke in `craftos/tests/e2e/design-v2.pw.cjs` (Datei steht bereits in `testMatch`; 09-09)
- [ ] Anpassungen im Bestand: `seo-audit-core.mjs` + `seo-audit-core.test.ts` (Antwort-zuerst-Ausweitung, 09-01), `keyword-map.test.ts` (09-01/09-09), `design-v2-budgets.test.ts` (09-01/09-02), `ai-prompts.test.ts` + `ai-prompts-targets.json` (09-02), `media-ki-label.test.ts` (09-02), `funktionsdetails.test.ts` (09-07), `pricing-parity.test.ts` (Sync 09-01), `live-check.mjs` (09-10)

---

## Manuelle Prüfungen

| Verhalten | Anforderung | Warum manuell | Prüfanleitung |
|-----------|-------------|---------------|---------------|
| Gewerke-Ablauf fachlich passend je Gewerk | FEAT-04 | fachliche Zuordnung (RESEARCH A1, [ASSUMED]) | je Gewerk Schritte gegen die belegten Funktionen und den Gewerkalltag lesen; Ergebnis in `docs/content-pruefung/09-a.md` |
| Beispielkachel und FeatureSnippet erzählen denselben Auftrag | FEAT-04 | inhaltliche Stimmigkeit | je Gewerk `example` mit `tradeSnippetExamples` vergleichen |
| Erster Satz jeder Antwort beantwortet die Frage direkt (Wert, Name oder „Ja.“) | CONTENT-03, SEO-09 | Sprachurteil über Längenprüfung hinaus | Durchsicht je Paket bzw. Code-Review-Gate; Befund in `09-<paket>.md` |
| Schritte enthalten genau eine Handlung im Sie-Imperativ; Ergebnis steht unter „Ergebnis prüfen“ | CONTENT-03, CONTENT-04 | Satzbau nicht zuverlässig maschinell prüfbar | Stichprobe je Artikel im Paket, vollständig im Review-Gate |
| L-1-Umformulierungen sachlich richtig (über die Wortliste hinaus) | CONTENT-03, CONTENT-04 | Wortliste fängt nur Formulierungen, nicht Inhalte | jede Umformulierung gegen Register bzw. Release-Pfad prüfen |
| Bedienbegriffe in „…“ tragen einen Release-Beleg | CONTENT-03, CONTENT-04 | Beleg liegt in fremden Repos (`origin/release`) | Belegpfad je Begriff in `docs/content-pruefung/09-<paket>.md` nachsehen |
| Rechts- und Steuerfakten aktuell (Quelle neu abgerufen, BMF-FAQ bzw. Primärquelle) | SEO-09 (Rest), CONTENT-03 | fremde Seiten ändern sich | Quellen öffnen, Aussage und `checkedAt` vergleichen |
| Echte Silbentrennung in H1 (`ContentKopf`) und Prosa-H2 | DESIGN-02 | Wörterbuch je Browser ungeprüft | Stichprobe in Safari/WebKit und Chrome bei 360 und 390 |
| Gesamteindruck der drei Vorlagen (ruhig, strukturiert, weniger Text) | DESIGN-02 | ästhetisches Urteil | Screenshots 360/1440 (Chromium) und 390 (WebKit) aus dem Sitzungs-Scratchpad sichten, Befunde an den Executor zurückgeben |
| Analytics und SE-Ranking nach dem Rollout | Rollout (D-29) | Daten erst nach Stunden bzw. mit Inhaberzugang | Anleitung in `craftos/docs/releases/PHASE-09-ROLLOUT.md` |

---

## Validierungsfreigabe

- [ ] Alle Aufgaben haben einen `<automated>`-Verify oder Wave-0-Abhängigkeiten (offen bis zur Planerstellung)
- [ ] Abtastkontinuität: keine drei aufeinanderfolgenden Aufgaben ohne automatisierten Verify (offen bis zur Planerstellung)
- [x] Wave 0 deckt alle fehlenden Referenzen ab
- [x] Keine Watch-Mode-Flags (`vitest run`, Playwright ohne `--ui`)
- [x] Rückmeldelatenz < 60 s
- [ ] `nyquist_compliant: true` im Frontmatter gesetzt (nach Planprüfung)

**Freigabe:** ausstehend (Entwurf 2026-10-22; der Planer ersetzt die Platzhalter-Aufgaben-IDs und Bedrohungsbezüge durch die Werte aus den PLAN-Dateien)
