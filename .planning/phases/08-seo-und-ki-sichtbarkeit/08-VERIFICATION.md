---
phase: 08-seo-und-ki-sichtbarkeit
verified: 2026-10-23T01:30:00+02:00
status: human_needed
score: 5/5 Erfolgskriterien verifiziert (SC 5 im für Phase 8 festgelegten Umfang; KD-<20-Lücken laut Roadmap Phase 9)
overrides_applied: 0
deferred:
  - truth: "Jede Content-Lücke mit KD < 20 aus der Keyword-Map hat eine zitierfähige Zielseite oder einen Abschnitt (Abschluss SEO-09)"
    addressed_in: "Phase 9"
    evidence: "ROADMAP Phase 9, Erfolgskriterium 5: „Jede Content-Lücke mit KD < 20 aus der Keyword-Map hat eine zitierfähige Zielseite … (Abschluss SEO-09)“; Phase 8 SC 5 trägt den Vermerk „(KD-<20-Lücken → Phase 9, D-11)“. Live fehlen genau die 9 als „geplant“ geführten Keyword-Map-Pfade (3 Hilfe, 6 Blog)."
  - truth: "KI-Prompts „Software für Elektrobetriebe“ und „Software für Malerbetriebe“ mit Antwort-zuerst-Abschnitt"
    addressed_in: "Phase 9"
    evidence: "ROADMAP Phase 9, Erfolgskriterium 1 (Gewerke-Seiten-Umbau) und D-18; beide Prompts sind in ai-prompts-targets.json mit phase 9 auf /gewerke/elektriker bzw. /gewerke/maler gemappt. Beide Seiten sind live mit FAQPage- und BreadcrumbList-Schema, aber noch ohne Prompt-Anker."
  - truth: "DESIGN-02: v2-Bausteine auf allen Seiten einheitlich"
    addressed_in: "Phase 9"
    evidence: "ROADMAP Phase 9, Erfolgskriterium 6: „Gewerke-, Ratgeber- und Hilfeseiten nutzen die v2-Bausteine einheitlich (Abschluss DESIGN-02)“."
human_verification:
  - test: "Gesamteindruck der zehn Phase-8-Seiten sichten (/preise, /vergleich, vier Alternativen, /vergleich/handwerkersoftware-kleine-betriebe, /fakten-ueber-craftos, /craft-ai, /gobd) bei 360, 390 und 1440 px, live oder über die Screenshots aus 08-14"
    expected: "Ruhige, strukturierte v2-Gestaltung, gleichrangige Panels, Quellen und Stand-Angaben gut lesbar, Brotkrumen sichtbar und nicht abgeschnitten"
    why_human: "Ästhetisches Urteil (08-VALIDATION „Manual-Only“, DESIGN-02/SEO-03); visual-audit meldet nur technische Befunde"
  - test: "Inhaltliche Abnahme der sichtbaren Aussagen aus den Review-Fixes HI-01, HI-02, HI-03, ME-01 und ME-04 auf /preise, /vergleich/*-alternative und /fakten-ueber-craftos"
    expected: "Wortlaut zu CraftOS und Mitbewerbern ist fachlich richtig, fair und UWG-konform"
    why_human: "Fachliche und rechtliche Bewertung von Aussagen über Wettbewerber (08-REVIEW-FIX Hinweis 6)"
  - test: "Vercel Analytics → Projekt craftos → Events, Zeitraum „Last 24 hours“ (frühestens ab 24.10.2026, 01:11 MESZ)"
    expected: "trial_click und ai_visit erscheinen weiterhin in der Ereignisliste"
    why_human: "Nur mit Inhaberzugang zum Vercel-Dashboard prüfbar; Rollout-Regel der ROADMAP"
---

# Phase 8: SEO und KI-Sichtbarkeit – Verifikationsbericht

**Phasenziel:** Suchmaschinen und KI-Suchen finden auf craftos.eu zitierfähige Antworten zu Preisen, Alternativen und Funktionen, und jede Seite hat saubere Metadaten nach der Keyword-Map, Breadcrumbs und eine eigene OG-Grafik.
**Geprüft:** 23.10.2026, gegen den Code in `craftos/` (HEAD `0b84201`, ausgelieferter Code-Stand `f029bc6`) und unabhängig gegen https://craftos.eu
**Status:** human_needed
**Erneute Prüfung:** Nein, Erstprüfung

Methode: Die Behauptungen aus SUMMARY und PHASE-08-ROLLOUT.md wurden nicht übernommen, sondern mit eigenen Skripten im Sitzungs-Scratchpad (`verify08/live.mjs`, `content.mjs`, `more.mjs`) gegen alle 136 Sitemap-URLs der Live-Seite nachgeprüft. Zusätzlich lief das servlose `node scripts/seo-audit.mjs` gegen den vorhandenen Build vom Phasen-Gate und drei gezielte Vitest-Dateien. Es wurde kein Build, kein Server und kein E2E-Lauf gestartet; `.heavy-lock` blieb frei.

## Zielerreichung

### Beobachtbare Wahrheiten (ROADMAP-Erfolgskriterien)

| # | Wahrheit | Status | Nachweis |
|---|---|---|---|
| 1 | Vier Alternativen-Seiten (plancraft, Craftnote, HERO, ToolTime) mit belegten, datierten Wettbewerberangaben, FAQPage- und BreadcrumbList-Schema live und von Vergleich und Footer verlinkt | ✓ VERIFIED | Live: alle vier HTTP 200, je genau 1 FAQPage (4–5 Fragen) und 1 BreadcrumbList, je eine Vergleichstabelle, je 3 externe Herstellerquellen mit „abgerufen am 22.10.2026“, „Angaben ohne Gewähr, Stand 22.10.2026“, keine Wettbewerber-Logos. Links auf alle vier vorhanden in `/vergleich` und im `<footer>` der Startseite (Spalte „Vergleiche“). HERO-Preise live (Select 69/79 €, OS 119/135 €, OS Plus 299/345 €) stimmen mit beiden Belegbildern `docs/seo/belege/2026-10-22-hero-preise-{monatlich,jaehrlich}.png` überein (D-16, Variante A). `tests/wettbewerber.test.ts` grün. |
| 2 | Preisseite beginnt mit zitierfähigem Antwortsatz und Preistabelle, Werte gleich Produktregister | ✓ VERIFIED | Live `/preise`: in `<main>` folgen H1 → `#antwort` (220 Zeichen: „CraftOS kostet 29,95 € netto pro Person und Monat … 299,50 € im Jahresabo; … App-Lizenz … 9,95 € … 99,50 €“) → kurze Zwischenüberschrift → Lizenztabelle (29,95/9,95 € monatlich, 299,50/99,50 € jährlich). Werte identisch mit `docs/product-pricing-snapshot.json` (ADMIN 29.95/299.5, APP 9.95/99.5; Stand v4.0.0-test.245) und `lib/site.ts`. `tests/pricing-parity.test.ts` grün (der frühere rote Snapshot-Test aus 08-REVIEW-FIX ist nach `62f4478` behoben). |
| 3 | Jede Seite: eindeutiger Titel ≤ 60 mit Hauptkeyword, Description 120–155, genau eine H1, sichtbare Breadcrumbs mit Schema, individuelle OG-Grafik; automatischer Test findet keine doppelten Titel | ✓ VERIFIED | Live über alle 136 Sitemap-URLs: 0× Status ≠ 200, 0× Titel > 60, 0× Description außerhalb 120–155, 0× H1 ≠ 1, 0 doppelte Titel, 0 doppelte Descriptions, auf allen URLs außer `/` genau eine `nav[aria-label="Brotkrumen"]` und genau eine BreadcrumbList. Title, H1 und Description stimmen auf allen 136 URLs exakt mit `target` aus `docs/seo/keyword-map.json` überein; alle 117 Seiten mit Hauptkeyword tragen es im Titel. OG: 136 seitenbezogene `<pfad>/opengraph-image`-URLs, alle HTTP 200 `image/png`, ≤ 300 KB, 1200×630, **136 verschiedene Bild-Hashes** (wirklich individuelle Grafiken), `twitter:image` = `og:image` überall. Automatischer Duplikattest: Regel `duplikate` in `scripts/lib/seo-audit-core.mjs` und `tests/keyword-map.test.ts` („Titel, Descriptions und H1 sind sitewide eindeutig“), beide grün. |
| 4 | Zentrale Seiten: unter jeder Frage-Überschrift Antwort ≤ 300 Zeichen; `llms.txt`, Sitemap und IndexNow werden bei jedem Release aktualisiert | ✓ VERIFIED | Eigene Live-Prüfung der Frage-H2/H3 auf `/`, `/preise`, `/vergleich`, vier Alternativen, kleine Betriebe, `/fakten-ueber-craftos`, `/app`, `/craft-ai`, `/gobd`: 76 Frage-Überschriften, 0 ohne bzw. mit zu langer Antwort (`/funktionen` hat keine Frage-Überschriften). Sitemap (`app/sitemap.ts`) und `llms.txt` (`app/llms.txt/route.ts` aus `lib/llms.ts`) werden bei jedem Build erzeugt; live nennt `llms.txt` alle fünf neuen Vergleichsseiten, die Sitemap hat 13 `lastmod` 2026-10-23. IndexNow: `scripts/indexnow-submit.mjs` (`npm run indexnow`), Schlüsseldatei live erreichbar; der Schritt ist fester Bestandteil der Rollout-Regel (ROADMAP Z. 18) und in PHASE-05 bis PHASE-08-ROLLOUT dokumentiert. Die Meldung „136 URLs, HTTP 200“ selbst ist extern nicht nachprüfbar. |
| 5 | Jede getrackte KI-Frage hat eine zitierfähige Zielseite bzw. einen Abschnitt mit Antwort zuerst, Fakten und FAQPage (KD-<20-Lücken → Phase 9) | ✓ VERIFIED (Phase-8-Umfang) | `docs/seo/ai-prompts-targets.json`: 20 Tracker-Einträge (16 ChatGPT, 2 Perplexity, 2 AI Overview). Live geprüft: alle 18 Einträge der Phasen 6–8 haben ihren Anker auf der Zielseite, Antworttext darunter 64–271 Zeichen; alle Zielseiten tragen FAQPage-Schema. Die zwei Gewerke-Prompts (Elektro, Maler) sind nach D-18 Phase 9 zugeordnet; die Zielseiten existieren live mit FAQPage, aber noch ohne Anker → zurückgestellt. Die KD-<20-Wissenslücken (9 „geplant“-Pfade der Keyword-Map) sind ausdrücklich Phase 9 → zurückgestellt. Regel `prompts` im seo-audit: 0 Verstöße. |

**Ergebnis:** 5/5 Wahrheiten verifiziert (SC 5 im festgelegten Phase-8-Umfang).

### Zurückgestellte Punkte

| # | Punkt | Zuständig | Nachweis |
|---|---|---|---|
| 1 | Content-Lücken KD < 20 (Abschluss SEO-09) | Phase 9 | ROADMAP Phase 9 SC 5 |
| 2 | KI-Prompts Elektro- und Malerbetriebe mit Anker und Antwort zuerst | Phase 9 | ROADMAP Phase 9 SC 1, D-18, Mapping `phase: 9` |
| 3 | DESIGN-02 auf Gewerken, Ratgebern, Hilfe | Phase 9 | ROADMAP Phase 9 SC 6 |

### Erforderliche Artefakte

| Artefakt | Erwartung | Status | Details |
|---|---|---|---|
| `app/vergleich/{plancraft,craftnote,hero,tooltime}-alternative`, `handwerkersoftware-kleine-betriebe` | Neue Seiten | ✓ VERIFIED | Live 200, Inhalte und Schema wie oben |
| `lib/wettbewerber/*` | Datenmodule mit `quelle`, `abgerufenAm` | ✓ VERIFIED | Live gerendert mit Quellenliste und Datum; `wettbewerber.test.ts` grün |
| `components/v2/Breadcrumbs.tsx` | Sichtbarer Baustein mit einer Schemaquelle | ✓ VERIFIED | Live auf 135 URLs genau eine Navigation und ein Schema; kein `sr-only` |
| OG-Routen `opengraph-image` je Segment | Statisch, individuell | ✓ VERIFIED | 136 verschiedene PNGs live |
| `docs/seo/keyword-map.json`, `lib/keyword-map.ts`, `metaFor` | Metadatenquelle | ✓ VERIFIED | 136/136 exakte Übereinstimmung live |
| `docs/seo/ai-prompts-targets.json` | Prompt → URL#Anker | ✓ VERIFIED | 20 Einträge, 18 Anker live vorhanden |
| `scripts/seo-audit.mjs`, `scripts/lib/seo-audit-core.mjs` | Post-Build-Audit mit 12 Regeln | ✓ VERIFIED | Lauf gegen den Build: 136/136 URLs, 0 Verstöße |
| `scripts/live-check.mjs` | Phase-8-Prüfungen | ✓ VERIFIED (Code vorhanden; Ergebnis laut Rollout 62/62) | Eigene Live-Prüfung deckt dieselben Punkte unabhängig ab |
| `components/layout/Footer.tsx` | Spalte „Vergleiche“ | ✓ VERIFIED | Live im Footer mit allen vier Alternativen |
| `docs/releases/PHASE-08-ROLLOUT.md` | Rollout-Nachweis | ✓ VERIFIED | Vorhanden, Angaben stichprobenartig bestätigt |

### Wichtige Verbindungen

| Von | Nach | Über | Status | Details |
|---|---|---|---|---|
| `/vergleich` und Footer | vier Alternativen | `href` | ✓ WIRED | live in beiden vorhanden |
| `/preise` Tabelle | `lib/site.ts` / Snapshot | Import, Paritätstest | ✓ WIRED | Werte identisch, `pricing-parity.test.ts` grün |
| Keyword-Map | Title/H1/Description | `metaFor` | ✓ WIRED | 136/136 live exakt |
| Breadcrumbs-Baustein | BreadcrumbList-JSON-LD | gemeinsame Quelle | ✓ WIRED | Gliederzahl und Anzahl je Seite stimmig |
| Seiten-Segmente | `og:image`/`twitter:image` | `opengraph-image` + Metadaten | ✓ WIRED | Pfad entspricht der Seite, Bild abrufbar |
| Release | `llms.txt`, Sitemap | Build-Erzeugung | ✓ WIRED | neue Seiten live in beiden |
| Release | IndexNow | `npm run indexnow` (manueller Rollout-Schritt) | ✓ WIRED | Schlüsseldatei live; Ausführung nur laut Rollout belegt |

### Datenfluss (Ebene 4)

| Artefakt | Daten | Quelle | Echte Daten | Status |
|---|---|---|---|---|
| Preistabelle `/preise` | Lizenzpreise | `lib/site.ts` ← Produktsnapshot v4.0.0-test.245 | Ja | ✓ FLOWING |
| Alternativen-Tabellen | Wettbewerberfakten | `lib/wettbewerber/*` mit Quelle/Datum | Ja (HERO gegen Belegbild bestätigt) | ✓ FLOWING |
| Metadaten sitewide | Title/H1/Description | `docs/seo/keyword-map.json` | Ja | ✓ FLOWING |

### Verhaltensstichproben

| Verhalten | Befehl | Ergebnis | Status |
|---|---|---|---|
| Sitewide-Metadaten, Brotkrumen, OG live | `node verify08/live.mjs` (Scratchpad) | 136 URLs, alle Regeln 0 Verstöße | ✓ PASS |
| Inhalte, Links, Preise, Antworten live | `node verify08/content.mjs`, `more.mjs` | siehe Wahrheiten 1–4; 136 eindeutige OG-Bilder | ✓ PASS |
| Prompt-Anker live | Inline-Node-Abfrage über `ai-prompts-targets.json` | 18/18 Anker (Phasen 6–8) vorhanden, Antwort ≤ 300 | ✓ PASS |
| Post-Build-SEO-Audit | `node scripts/seo-audit.mjs` (vorhandener Build, ohne Server) | 136/136, 12 Regeln, 0 Verstöße | ✓ PASS |
| Gezielte Unit-Tests | `npx vitest run tests/keyword-map.test.ts tests/pricing-parity.test.ts tests/wettbewerber.test.ts` | 3 Dateien, 82/82 grün | ✓ PASS |

### Probe-Ausführung

Keine `scripts/*/tests/probe-*.sh` deklariert oder vorhanden. ÜBERSPRUNGEN.

### Anforderungsabdeckung

| Anforderung | Beschreibung (kurz) | Status | Nachweis |
|---|---|---|---|
| SEO-02 | Titel, H1 und Description folgen der Keyword-Map | ✓ SATISFIED | 136/136 URLs live exakt nach `target` |
| SEO-03 | Vier Alternativen-Seiten belegt, datiert, Schema, verlinkt | ✓ SATISFIED | Wahrheit 1 |
| SEO-04 | Preisseite mit Antwortsatz und Preistabelle | ✓ SATISFIED | Wahrheit 2 |
| SEO-05 | Titel/Description/H1/Breadcrumbs/OG, keine Duplikate | ✓ SATISFIED | Wahrheit 3 |
| SEO-06 | Antwort ≤ 300 unter Frage-Überschriften; llms.txt, Sitemap, IndexNow je Release | ✓ SATISFIED | Wahrheit 4 |
| SEO-09 (Teil) | Getrackte KI-Fragen und KD-<20-Lücken | ◐ TEILSTAND wie geplant | Kommerzielle Prompts (18/20) erledigt; Gewerke-Prompts und KD-<20-Lücken Phase 9; REQUIREMENTS.md führt korrekt „In Progress“ |
| DESIGN-02 (Teil) | v2-Bausteine einheitlich | ◐ TEILSTAND wie geplant | `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` und die fünf neuen Seiten auf v2 (FunktionsKopf mit `#antwort`, ComparisonTable, FaqList live sichtbar); Abschluss Phase 9; REQUIREMENTS.md führt korrekt „In Progress“ |

Keine verwaisten Anforderungen: REQUIREMENTS.md ordnet Phase 8 nur SEO-03 bis SEO-06 zu, dazu die Teilstände SEO-02, SEO-09 und DESIGN-02.

### Anti-Pattern-Befunde

Gescannt: 172 im Phasenumfang geänderte Dateien unter `craftos/` (`git diff f22ee78..0b84201`, ohne Bilder/JSON).

| Datei | Zeile | Muster | Schwere | Auswirkung |
|---|---|---|---|---|
| – | – | TBD/FIXME/XXX | – | keine gefunden |
| – | – | TODO/HACK/PLACEHOLDER/„coming soon“ in `.ts/.tsx/.mjs` | – | keine gefunden |
| `/preise` (H2 „Was kostet eine Handwerkersoftware pro Monat?“) | – | Silbentrennung im Kopfwort bei 1440 px | ℹ️ Info | rein optisch, im Rollout §13 für Phase 9/10 vermerkt |
| `lib/app-content.ts`, `lib/llms.ts` | – | „Teilweise“/„nur teilweise nutzbar“ | ℹ️ Info | außerhalb des Phase-8-Umfangs, Phase 9 (08-REVIEW-FIX Hinweis 2) |

Keine Blocker.

### Menschliche Prüfung erforderlich

#### 1. Gesamteindruck der Phase-8-Seiten

**Test:** Die zehn Phase-8-Seiten bei 360, 390 und 1440 px ansehen (live oder Screenshots aus 08-14).
**Erwartung:** Ruhige v2-Gestaltung, Quellen und Stand lesbar, Brotkrumen sichtbar und nicht abgeschnitten.
**Warum Mensch:** ästhetisches Urteil (08-VALIDATION „Manual-Only“).

#### 2. Wortlaut der Review-Fixes HI-01 bis HI-03, ME-01, ME-04

**Test:** Die geänderten Aussagen über CraftOS und Mitbewerber auf `/preise`, den Alternativen und `/fakten-ueber-craftos` lesen.
**Erwartung:** fachlich richtig, fair, UWG-konform.
**Warum Mensch:** fachliche und rechtliche Bewertung.

#### 3. Analytics nach 24 Stunden

**Test:** Vercel → craftos → Analytics → Events, „Last 24 hours“.
**Erwartung:** `trial_click` und `ai_visit` vorhanden.
**Warum Mensch:** nur mit Inhaberzugang prüfbar.

Die HERO-Preiszuordnung (08-VALIDATION „Manual-Only“) wurde in dieser Prüfung bereits gegen die Belegbilder abgeglichen und stimmt; sie entfällt als offene Inhaberaktion. Die 60-Tage-Neuprüfung der Wettbewerberangaben ist eine künftige Daueraufgabe (spätestens 21.12.2026) und keine Bedingung für dieses Phasenziel.

### Zusammenfassung

Das Phasenziel ist im Code und live erreicht. Unabhängig nachgeprüft wurden alle 136 Sitemap-URLs. Titel, Descriptions und H1 entsprechen exakt der Keyword-Map und sind eindeutig. Jede Seite außer der Startseite hat genau eine sichtbare Brotkrumennavigation mit passendem Schema, und jede Seite hat ein eigenes, inhaltlich verschiedenes OG-Bild. Die vier Alternativen-Seiten sind belegt, datiert und verlinkt; die HERO-Preise stimmen mit den Belegbildern überein. `/preise` beginnt mit Antwort und Tabelle, und die Werte entsprechen dem Produktregister. Unter allen Frage-Überschriften der zentralen Seiten steht eine Antwort mit höchstens 300 Zeichen. Alle kommerziellen KI-Prompts haben live Anker mit Antwort zuerst. Es wurden keine Lücken und keine Blocker gefunden. Offen sind nur die drei menschlichen Prüfungen oben sowie die planmäßig nach Phase 9 verschobenen Teile von SEO-09 und DESIGN-02.

---

_Geprüft: 23.10.2026_
_Prüfer: Claude (gsd-verifier)_
