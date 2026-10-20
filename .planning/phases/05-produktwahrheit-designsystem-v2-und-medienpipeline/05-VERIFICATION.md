---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
verified: 2026-10-20T23:55:22Z
status: human_needed
score: 7/7 Erfolgskriterien verifiziert (Codeebene); 4 menschliche Prüfpunkte offen
overrides_applied: 0
deferred:
  - truth: "SEO-02: Titel, H1 und Description aller Seiten folgen der Keyword-Map"
    addressed_in: "Phase 6 (SC 4) und Phase 8 (SC 3)"
    evidence: "Phase 8 SC 3: „Jede Seite hat einen eindeutigen Titel ≤ 60 Zeichen mit ihrem Hauptkeyword …“; Phase 6 SC 4: „Startseite, Menü und Übersicht nutzen die Hauptkeywords aus der Keyword-Map“"
  - truth: "DESIGN-02: Designsystem v2 wird auf allen Seiten einheitlich genutzt"
    addressed_in: "Phasen 6–8"
    evidence: "Festgelegte Einordnung „Phase 5 Grundlage, Umsetzung Phasen 6–8“; Phase 6 (DESIGN-01/03, Startseite/Navigation), Phase 7 SC 1 (Detailseiten nach fester Vorlage mit visuellem Element)"
  - truth: "SEO-08: mindestens 15 neue seriöse verweisende Domains, sichtbar in SE Ranking"
    addressed_in: "Meilensteinende (Phase 10, SC 4 Abschlussbericht verweisende Domains)"
    evidence: "REQUIREMENTS SEO-08 „Ziel bis Meilensteinende“; Stand rollout-phase05: 12 Refdomains (alle Spam), Zuwachs 0"
human_verification:
  - test: "Musterseite https://craftos.eu/styleguide in Chromium und WebKit bei 1440 px und 390 px sichten (Screenshots unter craftos/test-results/visual/*-styleguide.png)"
    expected: "Alle v2-Bausteine wirken markengerecht (Amber, Clash Display, General Sans, Logo im Header), strukturiert und nicht generisch; Geräterahmen zeigen nur Live-Funktionen ohne erfundene Bedienelemente"
    why_human: "Ästhetik und Markenwirkung sind nicht per grep prüfbar"
  - test: "Betriebssystem auf „Bewegung reduzieren“ stellen und /styleguide sowie /funktionen aufrufen"
    expected: "Alle Inhalte sofort sichtbar, keine laufenden Animationen, keine Layout-Sprünge beim Laden"
    why_human: "E2E (design-v2.pw.cjs, CLS-Messung) durfte in dieser Prüfung nicht laufen; Code zeigt globale reduce-Regel und keine opacity-0-Startzustände"
  - test: "Inhaber bestätigt den Empfang von Übergabe 1 (craftos/docs/seo/LINKPLAN.md §4) und beginnt mit ProvenExpert/G2-Konto"
    expected: "Übergabe 1 ist beim Inhaber angekommen; Status im backlink-register.json wird nach Ausführung gepflegt"
    why_human: "„An den Inhaber übergeben“ ist nur als Dokument belegt, die Entgegennahme ist eine Inhaberhandlung"
  - test: "SE-Ranking-Projekt 13094375 im AI Result Tracker sichten: zehn themenfremde, automatisch erzeugte ChatGPT-Prompts (Gruppe 94132)"
    expected: "Inhaber entscheidet über Löschen/Ersetzen; bis dahin ist der ChatGPT-Share-of-Voice verzerrt"
    why_human: "Löschregel – nur nach Freigabe des Inhabers; Live-Projektstand ohne SE-Ranking-Netzaufruf nicht nachprüfbar"
---

# Phase 5: Produktwahrheit, Keyword-Map und Designbausteine – Verifikationsbericht

**Phasenziel:** Besucher sehen ausschließlich live verfügbare Funktionen mit korrekten Preisen, jede Seite hat ein datenbasiertes Hauptkeyword, und die Bausteine für die strukturierte Neugestaltung stehen bereit.
**Verifiziert:** 2026-10-20T23:55:22Z (UTC; lokal 21.10.2026)
**Status:** human_needed
**Re-Verifikation:** Nein – Erstprüfung

## Zielerreichung

### Beobachtbare Wahrheiten (ROADMAP Phase 5, Erfolgskriterien 1–7)

| # | Kriterium | Status | Beleg (selbst geprüft) |
|---|-----------|--------|------------------------|
| 1 | Produktregister mit Release-Tag, Commit, Belegpfad je beworbener Funktion; keine nicht-live Funktion auf Seiten/llms.txt/Schema; „Demnächst“ ohne vergangene Termine | ✓ VERIFIED | `craftos/lib/product-register.ts`: `productBasis` web `v4.0.0-test.239`/`535206b4…`, mobile `mobile-v1.0.0-test.93`/`5610a064…`; im Web- und Mobile-Repo per `git rev-parse origin/release` und `git tag --points-at` bestätigt. 16 Funktionen + liveExtras mit Pfaden; Vitest „Belege existieren am Release-Commit“ lief (nicht übersprungen) per `git cat-file` grün. `notLive` (Telefon-Agent, MCP-Server, KI-Agent, Videoanalyse Web, Subunternehmer-Einladungen, Portal-Onlinezahlung) nur server-only. Grep über app/components/lib/content nach „Demnächst/Telefon-Agent/MCP-Server/Agent-Aktionen/In Prüfung/Onlinezahlung/Videoanalyse/Subunternehmer“: nur abgrenzende Aussagen (Faktenseite „nicht als verfügbar angeboten“, Vergleich plancraft). `llms.ts` filtert `tier === "heute"`; Schema enthält nur Offer. `tests/announcements.test.ts` 5/5 grün. Live: `live-check.mjs` OK für /funktionen, /craft-ai, /vergleich, /fakten-ueber-craftos, /funktionen/kundenportal. |
| 2 | Preise, Lizenzarten, Netto, 10-Tage-Test, Credits überall identisch mit `src/lib/constants.ts`; Test schlägt bei Abweichung fehl | ✓ VERIFIED | `scripts/sync-product-snapshot.mjs` liest `constants.ts`, `subscription/pricing.ts`, `AGB.tsx` per `git show` am Release-Commit; `npm run sync:product:check` → „Snapshot ist aktuell: v4.0.0-test.239 (535206b4)“. `tests/pricing-parity.test.ts` 10/10 grün inkl. „Snapshot ist aktuell“ (lokales Repo vorhanden, nicht übersprungen). Eigener Grep über app/components/lib/content: keine CraftOS-Lizenzpreise außerhalb `lib/site.ts`; einzige Testtage-Literale („10 Tage“ in TrialCta/Header) stimmen und sind vom Testphasen-Scan erfasst. Live: JSON-LD 29.95 ohne USt, /llms.txt und /preise mit Extra-Speicher und Start-Credits (live-check OK). |
| 3 | Keyword-Map aus echten Tooldaten (Volumen DE, KD, Intent, Wettbewerber, Quelle je Zahl), genau ein Hauptkeyword je bestehender/geplanter Seite, Lücken genannt | ✓ VERIFIED | `docs/seo/keyword-map.json`: 144 Einträge (125 bestehend = Sitemap, 19 geplant), 126 mit Hauptkeyword, keine Doppelungen. Eigene Provenienzprüfung: alle 126 Volumen-/KD-Werte stimmen exakt mit der jeweils genannten Rohdatei unter `docs/seo/data/kwmap/` überein (126 ok, 0 Abweichung). 18 Einträge ohne Hauptkeyword: 3 Rechtsseiten (begründet), 15 Seiten mit `is_data_found:false` in der Exportdatei (stichprobenartig für „craftos“ bestätigt) – nicht geschätzt, wie das Kriterium verlangt. Intent bei 126/126; Wettbewerber bei 70/126 (nur wo einer der 8 erfassten Wettbewerber laut Rohdaten rankt, Methode §1 Regel 5). Lücken KD < 20 in `KEYWORD-MAP.md` §3. `tests/keyword-map.test.ts` 9/9 grün. |
| 4 | v2-Bausteine (Bento, Schrittfolge, Kennzahlen, Funktionskarte mit visuellem Element, Geräterahmen Desktop/Phone mit vereinfachter UI, Vergleichstabelle) mit Amber/Clash/General Sans/Logo auf nicht indexierter Musterseite; dezente Bewegung; reduzierte Bewegung statisch | ✓ VERIFIED (Optik → Mensch) | `components/v2/` enthält alle Bausteine + `mini/MiniUi`; `app/styleguide/page.tsx` rendert BentoGrid, StepFlow, KeyFacts, FeatureCard, BrowserFrame, PhoneFrame, DevicePair, ComparisonTable, MediaFigure. `robots: {index:false, follow:false}` + `X-Robots-Tag` in `next.config.js`; nicht in Sitemap/llms/Navigation; live bestätigt (200, noindex, Header, Sitemap ohne /styleguide). Bewegung in v2 nur `transition … 0.15s` (Hover unter `@media (hover:hover)`, FAQ-Drehung), keine Keyframes, keine opacity-0-Startzustände, keine Scroll-Animationsbibliothek; globale `prefers-reduced-motion`-Regel in `app/globals.css:433`. Schriften via `next/font/local` (Clash Display, General Sans), Amber `--color-primary-500 #f2af38`, Logo im Header. Tests design-v2-components/-frames/-budgets und styleguide grün; E2E `design-v2.pw.cjs` mit `reducedMotion: 'reduce'` vorhanden (nicht ausgeführt). |
| 5 | Budgetprüfung lehnt Bilder > 150 KB ab; feste Abmessungen ohne Layout-Shift; Stand nach Ship-Gate live mit IndexNow | ✓ VERIFIED (CLS → Mensch/E2E) | `tests/media-budget.test.ts` (LIMIT 150·1024, nur AVIF/WebP/SVG, begründete Ausnahmen) 6/6 grün; `MediaFigure` verlangt `width`/`height`/`sizes`. Live: `werkstatt-2026-1600.webp` 80.766 Bytes. `origin/main` == `HEAD` (12907ba), live-check gegen https://craftos.eu 10/10 OK (selbst ausgeführt). IndexNow nur dokumentarisch belegt (`PHASE-05-ROLLOUT.md` §5: 125 URLs, HTTP 200; `npm run indexnow` existiert). Ship-Gate in Rollout-Doku §2. |
| 6 | SE-Ranking-Projekt trackt alle Hauptkeywords mit Zielseite plus KI-Prompts; Messbericht vergleicht Positionen, KI-SoV, Refdomains mit Ausgangsstand 20.10.2026 | ✓ VERIFIED | `reports/2026-10-21-projektabgleich-apply.json`: Projekt 13094375, 98 hinzugefügt, 8 Zielseiten angeglichen, `limits` leer. Eigener Abgleich: alle 126 Hauptkeywords der Map stehen im Messbericht §4 mit Ziel-URL; keine Zeile „nicht getrackt (Projektlimit)“. `scripts/seo-report.mjs --etappe` erzeugt Berichte; `messbericht-rollout-phase05.md` vergleicht Positionen (§4), Share of Voice (§2) und verweisende Domains (§3) mit dem 20.10.2026. 5 KI-Engines und Prompts laut Befund/Bericht. Live-Projektstand nicht erneut abgefragt (keine Netzaufrufe erlaubt). |
| 7 | Priorisierte Linkliste mit Statusregister und kopierfertigen Browser-Prompts (Portale, Fachmedien, Verzeichnisse); erste Einträge (Bewertungs-/Vergleichsportale) an den Inhaber übergeben | ✓ VERIFIED (Entgegennahme → Mensch) | `docs/seo/backlink-register.json`: 65 Ziele (Fachmedium 25, Vergleichsportal 11, Verzeichnis 8, Presseportal 7, Kammer 6, Großhandel 5, Bewertungsportal 2, Video 1), Priorität 1/2/3 = 16/35/14, Status-Feld; 62 mit Browser-Prompt, die 3 ohne sind „nicht möglich“ (Softguide, trusted.de, Wikipedia). Prompts enthalten Kaufverbot, keine Kontoanlage, Quelle llms.txt. `LINKPLAN.md` §4 „Übergabe 1 an den Inhaber“ mit ProvenExpert, G2, OMR, kennstdueinen.de, SoftwareWorld und zwei E-Mails. `tests/backlink-plan.test.ts` 7/7 grün. |

**Score:** 7/7 Kriterien auf Codeebene verifiziert.

### Zurückgestellte Punkte (keine Phase-5-Lücken)

| # | Punkt | Adressiert in | Beleg |
|---|-------|---------------|-------|
| 1 | SEO-02: Titel/H1/Description folgen der Map | Phase 6 SC 4, Phase 8 SC 3 | Zielwerte stehen bereits in `keyword-map.json` (`target`) und `KEYWORD-MAP.md` §5 (D-14) |
| 2 | DESIGN-02: v2 auf allen Seiten | Phasen 6–8 | v2-Bausteine bisher nur auf /styleguide eingebunden (bewusst, CONTEXT „Startseite, Menü, Funktionsseiten NICHT in Phase 5“) |
| 3 | SEO-08: ≥ 15 neue seriöse Refdomains | Meilensteinende / Phase 10 SC 4 | Stand rollout-phase05: 12 Refdomains, Zuwachs 0 |

### Erforderliche Artefakte

| Artefakt | Status | Details |
|----------|--------|---------|
| `craftos/lib/product-register.ts` | ✓ VERIFIED | server-only, Basis origin/release, Evidenz geprüft |
| `craftos/scripts/sync-product-snapshot.mjs` + `docs/product-pricing-snapshot.json` | ✓ VERIFIED | Check grün gegen lokales origin/release |
| `craftos/tests/pricing-parity.test.ts`, `announcements.test.ts`, `product-register.test.ts` | ✓ VERIFIED | grün, nicht übersprungen |
| `craftos/docs/seo/keyword-map.json`, `lib/keyword-map.ts`, `KEYWORD-MAP.md`, Rohdaten `data/kwmap/` | ✓ VERIFIED | Provenienz 126/126 |
| `craftos/components/v2/*`, `app/styleguide/page.tsx`, `lib/styleguide-content.ts` | ✓ VERIFIED | auf Musterseite verdrahtet; außerhalb noch nicht genutzt (gewollt) |
| `craftos/tests/media-budget.test.ts`, `media-ki-label.test.ts`, `scripts/optimize-images.mjs` | ✓ VERIFIED | grün; /gewerke-KI-Motiv jetzt mit `label="ki"` (live „Darstellung, KI-gestaltet“) |
| `craftos/scripts/se-ranking-sync.mjs`, `seo-report.mjs`, `lib/se-ranking-mcp.mjs` | ✓ VERIFIED | Tests 21 + 15 grün; Berichte vorhanden |
| `craftos/docs/seo/backlink-register.json`, `LINKPLAN.md` | ✓ VERIFIED | s. Kriterium 7 |
| `craftos/scripts/live-check.mjs`, `docs/releases/PHASE-05-ROLLOUT.md` | ✓ VERIFIED | live-check selbst ausgeführt: 10/10 OK |

### Key-Link-Verifikation

| Von | Nach | Über | Status |
|-----|------|------|--------|
| `lib/site.ts` (tarife) | PricingTable, Hero, /preise, llms.txt, Schema | Import + Intl.NumberFormat | ✓ WIRED (Paritätstest + Literal-Grep) |
| Snapshot | Web-Repo `origin/release` | `git show <commit>:src/lib/constants.ts` | ✓ WIRED (sync:product:check) |
| Register `productBasis.web.commit` | Snapshot-Commit | Paritätsfall „gleicher Web-Commit“ | ✓ WIRED |
| `lib/funktionen.ts` | llms.txt / FeatureCard | Filter `tier === "heute"`, Plattformprüfung | ✓ WIRED |
| `keyword-map.json` | SE-Ranking-Projekt | `se-ranking-sync.mjs --apply` | ✓ WIRED (apply-Protokoll, limits leer) |
| `/styleguide` | Suchmaschinen-Ausschluss | Metadata + X-Robots-Tag + Sitemap | ✓ WIRED (live bestätigt) |

### Behavioral Spot-Checks

| Verhalten | Befehl | Ergebnis | Status |
|-----------|--------|----------|--------|
| Gesamte Vitest-Suite | `cd craftos && npx vitest run` | 21 Dateien, 249/249 bestanden, 0 übersprungen | ✓ PASS |
| Preis-Snapshot aktuell | `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.239 (535206b4)“ | ✓ PASS |
| Release-Refs | `git rev-parse origin/release` (Web/Mobile) + `git tag --points-at` | 535206b4 = v4.0.0-test.239; 5610a064 = mobile-v1.0.0-test.93 | ✓ PASS |
| Live-Stand | `node scripts/live-check.mjs` (GET gegen craftos.eu) | 10/10 OK | ✓ PASS |
| Keyword-Provenienz | eigenes Node-Skript Map ↔ Rohdatei | 126/126 identisch | ✓ PASS |
| Deploy-Stand | `git log origin/main..HEAD` | leer (alles gepusht) | ✓ PASS |
| E2E design-v2 / CLS | – | nicht ausgeführt (Vorgabe: keine E2E) | ? SKIP → Mensch |

### Probe-Ausführung

Keine `scripts/*/tests/probe-*.sh` deklariert oder vorhanden. Übersprungen.

### Anforderungsabdeckung

| Anforderung | Beschreibung (kurz) | Status | Beleg |
|-------------|---------------------|--------|-------|
| PROD-02 | Nur Live-Funktionen, Register mit Tag/Commit/Belegen | ✓ SATISFIED | Kriterium 1 |
| PROD-03 | Preise/Lizenzen/Netto/Test/Credits überall gleich | ✓ SATISFIED | Kriterium 2 |
| PROD-04 | Veraltete Ankündigungen entfernt | ✓ SATISFIED | Kriterium 1, announcements-Test |
| SEO-02 | Keyword-Map; Titel/H1/Description folgen ihr | ◐ Phase-5-Grundlage erfüllt, Umsetzung Phasen 6–8 (zurückgestellt) | Kriterium 3 |
| SEO-07 | SE-Ranking-Messung mit allen Hauptkeywords, Etappenvergleich | ✓ SATISFIED | Kriterium 6 |
| SEO-08 | Linkliste, Prompts, Register; ≥ 15 Refdomains bis Meilensteinende | ◐ Phase-5-Anteil erfüllt, Meilensteinziel offen (0/15) | Kriterium 7 |
| DESIGN-02 | v2 auf allen Seiten | ◐ Phase-5-Grundlage erfüllt, Umsetzung Phasen 6–8 | Kriterium 4 |
| DESIGN-04 | Dezente Bewegung, Reduced Motion statisch | ✓ SATISFIED (Sichtprüfung offen) | Kriterium 4 |
| MEDIA-03 | Nur Live-Funktionen, KI-Szenen gekennzeichnet | ✓ SATISFIED | FeatureCard-/Rahmen-Prüfung, media-ki-label-Test, /gewerke live gekennzeichnet |
| MEDIA-04 | ≤ 150 KB, kein Layout-Shift | ✓ SATISFIED (CLS per E2E nicht nachgeprüft) | Kriterium 5 |

Keine verwaisten Anforderungen. Hinweis (Info): Die Traceability in `REQUIREMENTS.md` ordnet DESIGN-02, SEO-02 und SEO-08 nur Phase 5 zu, obwohl die Umsetzung in späteren Phasen liegt; die Requirements-Zeilen der Phasen 6–10 nennen sie nicht. Empfehlung: Traceability-Spalte um die Folgephasen ergänzen, damit sie beim Meilenstein-Audit nicht verloren gehen.

### Anti-Patterns

| Datei | Zeile | Muster | Schwere | Wirkung |
|-------|-------|--------|---------|---------|
| 98 in Phase 5 geänderte Quelldateien unter `craftos/` | – | TBD/FIXME/XXX, TODO/HACK/PLACEHOLDER | – | keine Treffer |
| `docs/seo/keyword-map.json` | – | 56/126 Hauptkeywords ohne Wettbewerberangabe | ℹ️ Info | datengetrieben (keiner der 8 erfassten Wettbewerber rankt), dokumentiert in Methode §1 Regel 5 |
| `components/v2/*` (`data-evidence`) | – | interne Quellpfade im HTML (LO-05, zurückgestellt) | ℹ️ Info | kein Funktionsfehler |
| 05-REVIEW-FIX | – | 7 Low-Befunde zurückgestellt; alle High/Medium behoben | ℹ️ Info | – |

### Menschliche Prüfung erforderlich

1. **Musterseite sichten** – /styleguide in Chromium/WebKit bei 1440 und 390 px (Screenshots `C:/Projekte/Websitenerstellung/craftos/test-results/visual/*-styleguide.png`); erwartet markengerechte, nicht generische Bausteine. Grund: Ästhetik.
2. **Reduzierte Bewegung / Layout-Shift** – mit „Bewegung reduzieren“ /styleguide und /funktionen laden; alles sofort sichtbar, keine Sprünge. Grund: E2E/CLS durfte nicht laufen.
3. **Übergabe 1 bestätigen** – Inhaber nimmt LINKPLAN §4 entgegen (ProvenExpert-, G2-Konto, zwei E-Mails). Grund: Inhaberhandlung.
4. **KI-Tracker-Prompts** – zehn themenfremde ChatGPT-Prompts (Gruppe 94132) verzerren den SoV; Entscheidung des Inhabers (Löschregel). Grund: externe Freigabe.

Nicht kriterienrelevant, aber offen laut Rollout: Analytics-Zählung `trial_click`/`ai_visit` nach 24 Stunden im Vercel-Dashboard.

### Zusammenfassung

Alle sieben Erfolgskriterien von Phase 5 sind im Code und auf der Live-Seite belegt: Register und Preis-Snapshot zeigen auf das aktuelle `origin/release` beider Produkt-Repos, Paritäts- und Ankündigungstests sind grün und nicht übersprungen, die Keyword-Map ist zahlengenau aus den Rohdaten belegt, die v2-Bausteine stehen auf einer live nicht indexierten Musterseite, Medienbudget und KI-Kennzeichnung sind testgesichert, das SE-Ranking-Projekt trackt alle 126 Hauptkeywords, und Linkplan mit Register und Übergabe 1 liegt vor. Blocker oder Lücken gibt es nicht. DESIGN-02, SEO-02 und das Refdomain-Ziel von SEO-08 sind gemäß der festgelegten Einordnung in spätere Phasen bzw. das Meilensteinende zurückgestellt. Offen bleiben vier menschliche Prüfpunkte (Optik, reduzierte Bewegung/CLS, Übergabe-Entgegennahme, KI-Prompt-Entscheidung).

---

_Verifiziert: 2026-10-20T23:55:22Z_
_Prüfer: Claude (gsd-verifier)_
