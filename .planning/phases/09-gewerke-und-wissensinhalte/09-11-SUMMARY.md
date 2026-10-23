---
phase: 09-gewerke-und-wissensinhalte
plan: 11
subsystem: gewerke
tags: [gewerke, paket-a, funktionskopf, linkkarten, gewerke-uebersicht, prompts, gewerke-test]
requires:
  - "09-02: Gewerke-Datenmodell und Detailvorlage Teil 1"
  - "09-01 F-A1: TEXT_BUDGET.gewerk/count.gewerk*, LinkKarten, lib/leitlinie.ts, gekürzte Gewerke-H1"
  - "09-01 K-2: mitAntwortRegel und Phase-9-Anker-Regel im SEO-Audit (vor dem Audit gemergt)"
provides:
  - "Gewerke-Detailseiten mit FunktionsKopf (Map-H1, Kopfwort-Span, #antwort, Sekundärlink #ablauf) und Abschnitt „Weiterlesen“"
  - "/gewerke v2 (synchron): FunktionsKopf mit Antwort, zwölf LinkKarten, CtaBand, ohne KI-Bild"
  - "tests/gewerke.test.ts als Gewerke-Vertrag (09-UI-SPEC § 8)"
  - "Prompt-Anker /gewerke/elektriker#antwort und /gewerke/maler#antwort (phase 9)"
affects: [09-13, 09-16]
tech-stack:
  added: []
  patterns:
    - "Übersichtstexte als Konstante im Datenmodul (GEWERKE_UEBERSICHT), damit Test und Seite dieselbe Quelle nutzen"
    - "Weiterlesen-Karten aus getContentList mit Fehlertext aus § 5 bei fehlendem Ziel"
key-files:
  created:
    - craftos/tests/gewerke.test.ts
  modified:
    - craftos/lib/gewerke.ts
    - craftos/app/gewerke/[slug]/page.tsx
    - craftos/app/gewerke/page.tsx
    - craftos/app/sitemap.ts
    - craftos/tests/media-ki-label.test.ts
    - craftos/docs/seo/ai-prompts-targets.json
    - craftos/tests/ai-prompts.test.ts
    - craftos/docs/content-pruefung/09-a.md
decisions:
  - "L-1 in lib/gewerke.ts über die zentrale Liste (l1Treffer); die Produktbegriffe Bauphase, Ressourcen, Vorlagen- und alter Phasenbegriff bleiben als lokale Muster, weil sie nicht in leitlinie-l1.json stehen."
  - "Positivfall im Medientest: lib/styleguide-content.ts bindet werkstatt-2026 gekennzeichnet ein (per Grep belegt)."
  - "Visuelle Durchsicht vor dem K-2-Merge auf einem eigenen Build; das Paketende lief nach dem Merge von 09-01 erneut vollständig."
metrics:
  duration: "ca. 75 Min."
  completed: 2026-10-23
requirements-completed: []
---

# Phase 9 Plan 11: Gewerke Teil 2 (Kopf, Übersicht, Weiterlesen, Prompt-Anker) Summary

Die zwölf Gewerke-Seiten beginnen jetzt mit dem dunklen FunktionsKopf (Map-H1 mit Kopfwort-Span, zitierfähige Antwort unter `#antwort`, CTA und Sekundärlink „So läuft ein Auftrag“) und enden vor dem CTA-Band mit „Weiterlesen“ auf zwei bis drei bestehende Artikel. `/gewerke` zeigt Kopf mit Antwort, zwölf LinkKarten mit Piktogramm und Teaser und das CTA-Band ohne KI-Bild. Den Vertrag hält `tests/gewerke.test.ts` fest; die Prompt-Ziele Elektro und Maler zeigen auf `#antwort`.

## Startprüfungen

- `git merge main` am Start: Fast-Forward auf `0c27ed7` (09-02, F-A1 `81f4456`/`fb241c3`, K-1).
- F-A1: `git cat-file -e HEAD:craftos/components/v2/LinkKarten.tsx` und `HEAD:craftos/lib/leitlinie-l1.json` bestanden.
- K-2 (W2): am Start und nach Aufgabe 1 nicht auf main (`mitAntwortRegel` 0, Anker-Regel 0). Daher wurden die Code- und Inhaltsteile von Aufgabe 2 fertiggestellt und vor dem Audit erneut geprüft. Beim zweiten Abgleich war 09-01 gemergt (`02945f8`); Merge in den Worktree als `ec03849`, danach `mitAntwortRegel` 2 und `e.phase >= 9 && !anker` 1. Ein CHECKPOINT war deshalb nicht nötig.

## Commits

| Aufgabe | Commit | Betreff |
|---|---|---|
| 1 (RED) | `6f40621` | test(09-11): Gewerke-Vertragstest und Medienfall ohne KI-Bild auf /gewerke (rot) |
| 1 (GREEN) | `19afd41` | feat(09-11): Gewerke-Kopf als FunktionsKopf, /gewerke v2 mit LinkKarten, Budgets aus F-A1 |
| 2 | `2e90ce7` | feat(09-11): Weiterlesen auf den Gewerke-Seiten, Prompt-Anker Elektro/Maler, Durchsicht 09-a |
| – | `ec03849` | Merge branch 'main' into phase09-spur-a (09-01 Fundament mit K-2) |

## Prüfergebnisse

- **RED:** 16 Fälle rot (Kopf, Übersicht, Übersichtstexte, Medienfall), 20 grün.
- **Aufgabe 1:** gewerke, media-ki-label, breadcrumbs, llms, funktionskopf: 87/87 grün; `content.test.ts` unter Sperre 10/10; Typecheck und Lint grün. Abnahme-Greps: FunktionsKopf 3, PageHero 0/0, werkstatt-2026 0, `export default async function` 0, LinkKarten 3, Bilddatei vorhanden (3 Varianten), Fehlertexte 3.
- **Aufgabe 2 vor dem Merge:** sechs Vitest-Dateien 106/106; `content.test.ts` unter Sperre 10/10; Typecheck, Lint grün.
- **Nach dem Merge von 09-01 (Paketende):** neun Vitest-Dateien (gewerke, ai-prompts, content-produktwahrheit, media-ki-label, breadcrumbs, llms, funktionskopf, keyword-map, seo-audit-core) 203/203; `content.test.ts` unter Sperre 34/34; Typecheck und Lint grün. Unter Sperre: `npm run build` grün; `seo-audit --paths=` 13 Gewerke-Pfade, alle Regeln inkl. antwort und prompts: 0 Verstöße; `--only=prompts` über 136 URLs: 0 Verstöße; Gewerke-E2E auf Port 3102: 8 bestanden, 4 planmäßig übersprungen, 0 fehlgeschlagen. Port 3102 danach per netstat frei, Sperre freigegeben.
- **Abnahme-Greps Aufgabe 2:** `gewerke/elektriker#antwort` 1, `gewerke/maler#antwort` 1, `weiterlesen` 7.
- **Darstellung (eigener Build vor dem Merge):** Messung über 13 Seiten in 360 Chromium, 390 WebKit und 1440 Chromium: kein Überlauf, H1 ohne Überlauf, Kopfwort-Span im Container, CTA-Unterkante bei 360 × 640 495–549 px, Abschnittsfolge wie § 1.1/§ 1b, in `<main>` nur Gewerke-Piktogramme mit `alt=""`. visual-audit (3 Pfade × 360/390/1440 × Chromium/WebKit): 18 Seiten, 0 Status-, Überlauf-, JS- und axe-Befunde. Screenshots selbst angesehen, ohne Befund.

Screenshots (nur Scratchpad, nicht committet):
`C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/09-11/` mit `chromium-360-gewerke*.png`, `webkit-390-gewerke*.png`, `chromium-1440-gewerke*.png` (je /gewerke, /gewerke/elektriker, /gewerke/allrounder).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Muster der Produktbegriffe ohne Leerraum-Klasse**
- **Found during:** Aufgabe 1 (Umstellung der Wortliste)
- **Issue:** In `lib/gewerke.ts` stand `/leistungs[s-]*vorlagen/i` bzw. `/projekt[s-]*phasen/i` statt `[\s-]`; „Leistungs vorlagen“ mit Leerzeichen wäre nicht erkannt worden.
- **Fix:** `[\s-]` in den Mustern der Produktbegriffe.
- **Commit:** `19afd41`

**2. [Rule 3 - Blocking] visual-audit unter Git Bash**
- Wie beim seo-audit schrieb Git Bash `AUDIT_ROUTES=/gewerke,…` zu einem Windows-Pfad um; Wiederholung mit `MSYS_NO_PATHCONV=1` (Build unverändert).

**3. Reihenfolge Sichtprüfung / Paketende**
- Die Sichtprüfung lief auf einem Build vor dem K-2-Merge, damit mögliche Darstellungskorrekturen noch in den Aufgaben-Commit konnten; das Paketende (Build, Audit, Prompts, E2E) lief nach dem Merge vollständig neu.

**4. Kommentar ohne Bildnamen**
- `app/gewerke/page.tsx` nennt das entfallene Motiv im Kommentar nur umschreibend, damit die Abnahmeprobe `grep -c "werkstatt-2026"` = 0 gilt.

- Design-Kaskade: laut D-31 einmal für die Phase in 09-UI-SPEC erledigt; hier keine erneute Ausführung.
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel), kein Merge nach main, kein Push.

## Known Stubs

Keine. „Weiterlesen“ verlinkt bewusst nur bestehende Artikel; die neuen Ziele aus Paket f/g ergänzt 09-13 (Übergabeliste in `craftos/docs/content-pruefung/09-a.md`).

## Threat Flags

Keine neue Angriffsfläche; die Seiten bleiben statisch, „Weiterlesen“ liest nur lokale Markdown-Dateien beim Build.

## Self-Check: PASSED

- Dateien vorhanden: `craftos/tests/gewerke.test.ts`, `craftos/app/gewerke/page.tsx`, `craftos/app/gewerke/[slug]/page.tsx`, `craftos/docs/content-pruefung/09-a.md`.
- Commits vorhanden: `6f40621`, `19afd41`, `2e90ce7`, `ec03849`.
