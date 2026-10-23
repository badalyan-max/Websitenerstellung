---
phase: 10-abschlussaudit
plan: 05
subsystem: seo-messung-und-audit
tags: [paket-e, se-ranking, unit-budget, leaderboard-schalter, ki-tracker, audit-skill, vorab-audit]
requires:
  - docs/seo/reports/2026-10-23-messstand-phase10.md (D-38)
  - docs/seo/data/2026-10-23-audit-report-phase10.json, …-audit-issues-phase10.json (Audit 485185)
provides:
  - scripts/lib/seo-report-core.mjs (Aufrufplanung, Rohdateinamen, Kostenwarnung, KI-Tracker-Zeilen, Abruf mit injiziertem Client)
  - seo-report.mjs ohne Leaderboard als Standard (--leaderboard, --warte)
  - KI-Tracker-Abgleich und Units-Protokoll Paket e
  - craftos/audit-report.md und audit-report.html (Vorab-Audit, Behebungsliste nach Besitzer)
affects:
  - 10-02 (Paket b): LCP und Schrift-Preloads
  - 10-03 (Paket c): Kontrast und interne Links der Rechtsseiten
  - 10-06: 404-Metadaten, robots.ts
  - 10-07 (Rollout): seo-report ohne Leaderboard, Recheck 485185, Bestätigungsaudit
  - 10-11: Linkregister, Etappennachweis, Berichtsentwurf
tech-stack:
  added: []
  patterns:
    - "Reine Logik in scripts/lib/<name>-core.mjs, Netz nur über injizierten Client; Test mit gemocktem Client (calls/events)"
    - "Audit-HTML nur durch Ersetzen des JSON in der Skill-Vorlage erzeugt"
key-files:
  created:
    - craftos/scripts/lib/seo-report-core.mjs
    - craftos/tests/seo-report-core.test.ts
    - craftos/docs/seo/data/2026-10-23-ki-tracker-abgleich-phase10.json
    - craftos/docs/seo/data/2026-10-23-units-phase10-paket-e.json
    - craftos/audit-report.md
    - craftos/audit-report.html
  modified:
    - craftos/scripts/seo-report.mjs
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
decisions:
  - "seo-report.mjs ruft DATA_getAiSearchLeaderboard nur mit --leaderboard ab; ohne Schalter KI-Tracker-Statistik je Engine (0 Units) und letzter Leaderboard-Wert mit Datum aus der jüngsten Rohdatei"
  - "Gemini und AI Mode bleiben ohne Prompts: PROJECT_addPrompts lehnt mit 403 Promptlimit ab (20 Prompts belegt); nichts erzwungen, nichts gelöscht"
  - "Vorab-Audit QA-06: Rohwert 8, Wert der behebbaren Fehler 6, Inhaberpunkte 2 (ODR-Link, kurzer Title /impressum)"
  - "Title von /hilfe/mitarbeiter-einladen-lizenz-zuweisen mit Markenzusatz statt title.absolute; damit kein Eintrag mehr ohne Markenzusatz"
requirements-completed: []
metrics:
  duration: "ca. 35 Min."
  completed: 2026-10-23
  tasks: 3
  files: 9
---

# Phase 10 Plan 05: Kostenbremse Messbericht, KI-Tracker-Abgleich und Vorab-Audit Summary

`seo-report.mjs` kostet ohne Schalter nur noch die Backlink-Abrufe (Leaderboard nur mit `--leaderboard` und Warnung, Kontostand nach 60 s), der KI-Tracker ist ohne Units geprüft (Promptlimit verhindert Gemini/AI Mode), und das Vorab-Audit nach dem Repo-Skill liegt mit QA-06-Zählung (behebbar 6) und Behebungsliste nach Besitzer vor.

## Startgate

Bestanden: Messstand-Bericht und Audit-JSON vorhanden, `git status --porcelain craftos` leer, Port 3105 frei. `node_modules` im Worktree war bereits vollständig installiert (12:50 Uhr, nach `package-lock.json`), daher kein zusätzliches `npm ci`.

## Aufgaben

| Nr. | Aufgabe | Commit | Ergebnis |
|---|---|---|---|
| 1 | seo-report ohne Leaderboard als Standard (TDD) | c8e5992 (rot), fa0ab7b (grün) | 16 neue Tests; mit `se-ranking-sync.test.ts` 37/37 grün; Typcheck, Lint, `check-no-secrets` grün |
| 2 | KI-Tracker-Abgleich und Units-Protokoll | af8691c | Kontostand 18.071 vorher = nachher, 0 Units |
| 3 | Vorab-Audit, Map-Korrektur, Behebungsliste | 6c480d7 | `seo-audit` 0/156, `route-audit` 0 Fehler / 0 defekte Links, Keyword-Map-Test 26/26 |

## Units je Block

| Block | Inhalt | Kontostand vorher | Kontostand nachher | Verbrauch |
|---|---|---|---|---|
| A1 | Skriptumbau, Test mit Mock | – | – | 0 (kein Abruf) |
| A2-lesen | tools/list, Engines, Status, Prompts (Project API) | 18.071 (11:01:41 UTC) | 18.071 (11:03:25 UTC) | 0 |
| A2-abgleich | Status/Prompts vorher und nachher, 4 × `PROJECT_addPrompts` (abgelehnt), Perplexity-Rankings | 18.071 (11:03:25 UTC) | 18.071 (11:05:11 UTC, 82 s nach dem letzten Änderungsabruf) | 0 |
| A3 | Vorab-Audit nur mit vorhandenen Rohdaten und Live-Abrufen von craftos.eu | – | – | 0 (kein Abruf) |

Plan 10-05: **0 Units**. Phasensumme bisher 526 von höchstens 5.000 (Rest 4.474). Kein `DATA_getAiSearchLeaderboard`, kein Lauf mit `--leaderboard`, kein `seo-report.mjs`-Lauf, kein Audit, kein Recheck, kein Backlink-Abruf.

## KI-Tracker-Befund (D-39)

- ChatGPT (203632): 16 Prompts, 16 geprüft, letzte Prüfung 23.10.2026.
- Google AI Overview (204133): seit dem Messstand neu geprüft, 2 von 2, letzte Prüfung 23.10.2026.
- Perplexity (204127): 2 Prompts, Fortschritt 0 %, nie geprüft; `PROJECT_getPromptsRankings` seit 20.10. leer. Einstellung identisch mit ChatGPT (de/de, ohne Region, Gruppe 94132). Die Project API hat kein Werkzeug, eine Prüfung anzustoßen; Ursache liegt beim Testzugang, per API nicht behebbar.
- Gemini (204130) und AI Mode (204136): `PROJECT_addPrompts` mit den 16 ChatGPT-Prompts (identisch mit `ai-prompts-targets.json`) und danach mit den ersten 2 jeweils HTTP 403 „You’ve run out of prompt limits. Upgrade your subscription or buy additional limits to add more prompts.“ Das Projekt nutzt 20 Prompts. Nichts erzwungen, nichts gelöscht.

## Offene technische und On-Page-Fehler nach Definition (QA-06, Vorab)

| Nr. | Befund | Besitzer |
|---|---|---|
| T4 | Lighthouse Accessibility `/impressum` 96 (Kontrast 2,84 : 1) | Paket c (10-03) |
| T5 | Ebene 9: alle sechs Schriftschnitte sitewide vorgeladen, Clash 500 ungenutzt | Paket b (10-02) |
| T6 | Ebene 9: 404 erbt Root-Canonical `https://craftos.eu`, zwei robots-Metas („noindex“ und „index, follow“) | 10-06 |
| O1 | Gruppe 14: Labor-LCP 2.574–2.743 ms > 2.500 ms auf 6 von 6 Gate-Vorlagen | Paket b (10-02) |
| O2, O3 | Gruppe 7: `/impressum` nur 1 interner Link im Hauptteil, kein Link auf Funktionen/Preise | Paket c (10-03) bzw. 10-06 |
| I1, I2 | **Inhaberpunkt offen:** ODR-Link (301, Plattform 2025 eingestellt) und kurzer Title `/impressum` | Inhaber |

Null-Werte: SE-Ranking-Audit-Fehler 0 (485185), `seo-audit.mjs` 0 Verstöße auf 156/156, `route-audit.mjs` 156 Routen, 0 Fehler, 0 defekte Links (159 Links), 10/10 unbekannte Pfade 404, 6/6 OG-Bilder 200. Sitemap lokal = live = 156. **Rohwert 8, Wert der behebbaren Fehler 6.**

## Behebungsliste nach Besitzer (D-33)

| Befund | Datei | Besitzer | Regel | Soll |
|---|---|---|---|---|
| Title = H1 (`same_title_h1`) | `docs/seo/keyword-map.json`, `KEYWORD-MAP.md` § 6 | e – **erledigt** (6c480d7), live mit 10-07 | Title ≤ 60, ≠ H1, eindeutig | „Mitarbeiter einladen und Lizenz zuweisen \| CraftOS“ |
| LCP > 2,5 s | `app/layout.tsx`, `components/CraftOSLogo.tsx` | b (10-02) | D-11 | LCP < 2,5 s, Performance ≥ 95 je Vorlage |
| Ungenutzte Schrift-Preloads | `app/layout.tsx` | b (10-02) | Ebene 9 | nur genutzte Schnitte vorladen |
| Kontrast Rechtsseiten | `components/legal/Legal.tsx`, Rechtsseiten | c (10-03) | WCAG AA, Lighthouse A11y 100 | ≥ 4,5 : 1 |
| Interne Links `/impressum` | `app/impressum/page.tsx`, `Legal.tsx` | c (10-03) bzw. 10-06 | 80-Punkte-Liste Gr. 7 | ≥ 3 interne Links im `<main>` über Bausteine, Rechtstext unverändert |
| 404-Canonical und robots | `app/not-found.tsx`, `app/layout.tsx` | 10-06 | Ebene 9 | kein geerbter Canonical, nur „noindex“ |
| KI-Crawler ausdrücklich in robots.txt | `app/robots.ts` | 10-06 | GEO 1.1, Projekt-CLAUDE.md | GPTBot, ClaudeBot, PerplexityBot, Google-Extended je `Allow: /` (kein QA-06-Fehler) |
| ODR-Link, kurzer Title `/impressum` | `app/impressum/page.tsx`, Map-Eintrag `/impressum` | Inhaber | Rechtstext | Entscheidung, danach Umsetzung |

Waiver (in `audit-report.md`): 13 × Alt-Text Gewerk-Symbol und „JavaScript nicht komprimiert“ als Crawler artifact (mit `curl`-Beleg); nofollow-Links, Skill-Schwellen Title/Description und zwei Hub-Slugs als Owner decision mit Beleg.

## Inhaberpunkte

1. ODR-Link im Impressum entfernen oder belassen (EU-Plattform seit 20.07.2025 eingestellt, Link antwortet 301).
2. Kurzer Title „Impressum | CraftOS“ (SE-Ranking-Hinweis) belassen oder verlängern.
3. Löschfreigaben unter „Needs your approval to remove“: `components/ui/PageHero.tsx`, Altklassen in `globals.css`, `components/product-demo/**` mit `lib/demo/**`, Schriftdateien Clash 500/700 und General 500 (sofern nach Paket b ungenutzt).
4. Promptlimit des SE-Ranking-Testzugangs: Gemini und AI Mode lassen sich nur mit weiteren Prompt-Limits tracken.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Formatierung beim Umbau von seo-report.mjs**
- **Found during:** Aufgabe 1
- **Issue:** Die Arbeitskopie hat CRLF-Zeilenenden; eine Skriptersetzung griff dadurch nicht, `REFDOMAIN_LIMIT` blieb ungenutzt (Lint-Warnung).
- **Fix:** Option `refdomainLimit` an `fuehreAbrufeAus` übergeben; Lint danach 0 Befunde.
- **Commit:** fa0ab7b

### Weitere Abweichungen

- **Exitcode bei falschen Optionen:** `seo-report.mjs` endet bei ungültigen Argumenten jetzt mit Exit 2 statt 1 (Konvention aus 10-PATTERNS „Exit 2 = falsche Optionen“); der Überschreibschutz bleibt Exit 1.
- **`npm ci` nicht erneut ausgeführt:** `node_modules` war im Worktree bereits vollständig installiert.
- **Units-Protokoll nachgetragen:** Block A3 (ohne Abruf) wurde in Aufgabe 3 ergänzt (6c480d7).
- **Abgleich Gemini/AI Mode:** Die Angleichung war wegen des Promptlimits nicht möglich (laut Plan dokumentiert, nicht erzwungen).

## Known Stubs

Keine. `audit-report.html` setzt `proof: 0` je Seite, weil keine Proof-Inventur existiert; das steht im Bericht unter „What this audit did NOT measure“.

## Übergaben an spätere Pläne

- **10-02 (b):** LCP und Schrift-Preloads (Checkliste Punkte 2 und 3).
- **10-03 (c):** Kontrast und interne Links der Rechtsseiten (Punkte 4 und 5); `PageHero.tsx` wird nach der Support-Umstellung Löschkandidat.
- **10-06:** 404-Metadaten und `robots.ts` (Punkte 6 und 7).
- **10-07 (Rollout):** `node scripts/seo-report.mjs --etappe rollout-phase10` ohne `--leaderboard` (≈ 112 Units); Recheck von Audit 485185 (≈ 314 Units); Bestätigungsaudit wird in `audit-report.md` als neuer datierter Abschnitt angehängt und `audit-report.html` neu erzeugt.
- **10-11 (e):** Linkregister, Etappennachweis, Berichtsentwurf im selben Worktree; KI-Tracker-Basislinie aus `audit-report.md` und der Abgleichsdatei verwenden.

## Prozesse

Schwerer Lauf (Build, `seo-audit`, `next start` auf 3105, `route-audit`) einmal unter `.heavy-lock` von 11:16:33 bis 11:17:30 UTC; Server danach beendet, Port 3105 frei, Sperre freigegeben. Kein Prozess dieses Plans läuft noch.

## Self-Check: PASSED

Alle sechs neuen Dateien vorhanden; Commits c8e5992, fa0ab7b, af8691c und 6c480d7 im Branch phase10-spur-e.
