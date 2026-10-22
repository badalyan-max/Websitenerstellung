---
phase: 09-gewerke-und-wissensinhalte
plan: 02
subsystem: gewerke
tags: [gewerke, paket-a, k-1, ablauf, stepflow, featuresnippet, faq, l-1]
requires: []
provides:
  - "K-1: ai-prompts.test.ts prüft luecken gegen die feste Liste WISSENSSEITEN_PHASE9 (vorgezogen mergebar)"
  - "lib/gewerke.ts: neues Datenmodell (kopfwort, answer, teaser, ablauf, funktionen, faq, artikel) mit Prüfungen beim Laden"
  - "Gewerke-Detailvorlage v2: Ablauf, Passende Funktionen, FAQ, CTA"
affects: [09-11, 09-13, 09-01]
tech-stack:
  added: []
  patterns: ["Prüfung beim Laden (pruefeGewerke) mit Fehlertexten aus 09-UI-SPEC § 5", "pruefeNurUnterstuetzt für Gewerke-Texte"]
key-files:
  created:
    - craftos/docs/content-pruefung/09-a.md
  modified:
    - craftos/tests/ai-prompts.test.ts
    - craftos/lib/gewerke.ts
    - craftos/app/gewerke/[slug]/page.tsx
    - craftos/app/gewerke/page.tsx
    - craftos/app/sitemap.ts
decisions:
  - "Die Zusage „vorbereitete Leistungsvorlagen“ entfällt vollständig (Detail, Übersicht, Daten); keine Ersatzformulierung zu Vorlagen."
  - "Belege gegen den Register-Stand auf main (Web 6686d05 test.245, Mobile 837aab4 test.96) statt a9319e5/6cac366 aus dem Plan."
  - "FaqList mit `zentral` (≤ 300) statt `answerMax={300}`, weil die Komponente nur `zentral` kennt."
  - "GaLaBau: Lager durch Mängelmanagement ersetzt, damit mindestens eine Phase-7-Seite verlinkt ist."
metrics:
  duration: "ca. 75 Min."
  completed: 2026-10-23
requirements-completed: []
---

# Phase 9 Plan 02: Gewerke Teil 1 (K-1, Daten, Detailvorlage v2) Summary

Zwölf Gewerke-Seiten zeigen jetzt einen belegten gewerktypischen Ablauf (StepFlow mit Funktionslinks, Beispielkachel und gekennzeichnetem FeatureSnippet), sechs passende Funktionskarten, drei gewerkspezifische FAQ plus eine gemeinsame App-Frage mit FAQPage aus demselben Array und das CTA-Band; die nicht belegte Zusage „vorbereitete Leistungsvorlagen“ ist überall entfernt.

## Startgate (W7)

Bestanden am 2026-10-22T23:21Z: 08-14-SUMMARY vorhanden, PHASE-08-ROLLOUT.md vorhanden, `craftos` im Haupt-Arbeitsbaum sauber, kein `wt-08`-Worktree, Port 3102 frei. Danach einmalig `npm ci --prefer-offline` unter der Sperre (rc 0).

## Commits

| Aufgabe | Commit | Betreff |
|---|---|---|
| 1 (K-1, vorgezogen mergebar) | `c99ad1d` | feat(09-02): K-1 Prompt-Lücken als feste Liste der Phase-9-Wissensseiten |
| 2 | `8856aaf` | feat(09-02): Gewerke-Daten mit Ablauf, Funktionen, FAQ und Artikeln, Vorlagen-Zusage entfernt |
| 3 | `cab0647` | feat(09-02): Gewerke-Detailvorlage v2 mit Ablauf, Funktionen, FAQ und CTA |

Der K-1-Commit ändert nur `craftos/tests/ai-prompts.test.ts`.

## Prüfergebnisse

- Aufgabe 1: `ai-prompts` + `keyword-map` 27/27 grün, Typecheck und Lint grün; `WISSENSSEITEN_PHASE9` 2 Treffer, alte Kopplung 0.
- Aufgabe 2: breadcrumbs, llms, navigation 35/35 grün; `content.test.ts` unter Sperre rc 0; Typecheck, Lint grün; Wort-/Artikelprobe „ok 36“ (alle 36 Artikelpfade existieren). Zählproben: `ablauf:` 12, `kopfwort:` 12, App-Frage 1, `heroTitle|heroIntro|hatVorlagen|Leistungsvorlagen` je 0 in allen drei Dateien. Negativfälle des Validators (3 Schritte, fremder Slug, ohne Phase-7, Wortliste, „Nein“-Antwort, Artikelpfad, zwei gemeinsame Fragen) werfen die § 5-Fehlertexte.
- Aufgabe 3: weitere Vitest-Dateien (ai-prompts, media-ki-label, seo-audit-core, navigation, keyword-map) 102/102 grün; unter Sperre `content.test.ts` rc 0, `npm run build` grün, `seo-audit --only=h1,map,breadcrumbs,faq-schema,og,title,description` für die zwölf Pfade: 0 Verstöße; Gewerke-E2E auf Port 3102: 8 bestanden, 4 planmäßig übersprungen (Touch-Projekte), 0 fehlgeschlagen. Port 3102 danach per netstat frei, Sperre freigegeben.
- Sichtprüfung (chromium, reduzierte Bewegung) für elektriker, allrounder, galabau in 360/768/1024/1440: kein horizontaler Überlauf (0 px), Abschnitte ablauf, funktionen, faq, cta; einziges `img` in `<main>` ist das Gewerke-Piktogramm. Screenshots nur im Scratchpad.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] seo-audit unter Git Bash**
- **Found during:** Aufgabe 3 (erster schwerer Lauf)
- **Issue:** Git Bash schrieb `--paths=/gewerke/...` zu `C:/Program Files/Git/gewerke/...` um; das Audit brach ohne Prüfung ab.
- **Fix:** Wiederholung ab dem Audit mit `MSYS_NO_PATHCONV=1` (Build war aktuell, keine Codeänderung dazwischen).

**2. [Rule 1 - Abweichung Bausteinvertrag] `answerMax={300}`**
- `FaqList` kennt kein `answerMax`, sondern `zentral` (≤ 300, 08-REVIEW IN-03); verwendet wird `zentral`.

**3. Zählproben `ablauf:`/`kopfwort:` = 12**
- Interface- und Abschnittsschlüssel stehen in Anführungszeichen, damit die Zählprobe nur die zwölf Datensätze trifft; die Wortliste nutzt Muster (`/leistungs[\s-]*vorlagen/i`, `/projekt[\s-]*phasen/i`), damit verbotene Wörter nicht wörtlich in `lib/gewerke.ts` stehen.

**4. Release-Basis**
- Belege gegen den Register-Stand auf main (Web `6686d05`, Mobile `837aab4`) statt der im Plan genannten `a9319e5`/`6cac366`, damit Register und Prüfdatei übereinstimmen.

**5. Inhaltliche Abweichungen vom Research-Vorschlag** (in 09-a.md „Durchsicht“ begründet): Tischler ohne Aufmaß-Schritt, GaLaBau mit Mängelmanagement statt Lager (Phase-7-Pflicht), SHK mit Aufmaß/Besichtigung statt Lager, Dachdecker ohne Gerüst-Aussage.

- `lib/trade-snippet-examples.ts` blieb unverändert (Beispiele passten bereits).
- `app/sitemap.ts`: nur die Gewerke-Detailzeile; `/gewerke` („2026-10-20“) bleibt laut Plan für 09-11, obwohl sich die Kartentexte geändert haben.
- Design-Kaskade: laut D-31 einmal für die Phase in 09-UI-SPEC erledigt; hier keine erneute Ausführung.

## Known Stubs

Keine. Bis 09-11 bleibt bewusst der Bestands-Kopf (`PageHero` mit `answer` als Intro, ohne `#antwort`); „Weiterlesen“ aus `g.artikel` ist noch nicht gerendert (Daten vorhanden, Umbau in 09-11).

## Übergabe

Siehe `craftos/docs/content-pruefung/09-a.md` „Übergabeliste“ (09-11: Kopf, Budgets auf TEXT_BUDGET, zentrale L-1-Liste, Weiterlesen, `/gewerke` v2, `tests/gewerke.test.ts`, Sitemap `/gewerke`; 09-13: neue Artikelziele; Hinweis an (f) zu negativen Notes in `lib/funktionen.ts`).

## Self-Check: PASSED

- Dateien vorhanden: `craftos/lib/gewerke.ts`, `craftos/app/gewerke/[slug]/page.tsx`, `craftos/docs/content-pruefung/09-a.md`.
- Commits vorhanden: `c99ad1d`, `8856aaf`, `cab0647`.
