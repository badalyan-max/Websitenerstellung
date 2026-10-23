# Phase 9 – zurückgestellte Befunde

## 09-01 (Paketende, 23.10.2026)

| Befund | Ursache | Zuständig | Hinweis |
|---|---|---|---|
| `tests/announcements.test.ts` › „Seiten, Komponenten und Daten enthalten keine Ankündigung“ rot: `lib/gewerke.ts:569: "Bald verfügbar",` | Die lokale L-1-Wortliste `L1_WOERTER` in `lib/gewerke.ts` (09-02, Commit `8856aaf`, bereits auf `main` über `0c27ed7`) enthält den Eintrag „Bald verfügbar“; `CODE_PATTERN` der Ankündigungsprüfung trifft jede Zeile mit diesem Text in `app/`, `components/`, `lib/`. | Paket (a): 09-11 (laut Kommentar in `lib/gewerke.ts` „lokal bis 09-11 (dann zentrale Liste)“) | Auflösung: `lib/gewerke.ts` liest die Wörter aus `lib/leitlinie.ts` (`l1Woerter`/`l1Treffer`) statt einer eigenen Liste. Nicht in 09-01 behoben (Datei gehört (a), D-27). Auf `main` ebenso rot. |
| `seo-audit.mjs --report`: Regel `antwort` 21 Verstöße auf 15 Ratgebern (`/blog/*`), `/hilfe/*` 0, `/gewerke*` 0 | Erwartet: Die Antwortregel gilt seit 09-01 auch für `/blog/*`, `/hilfe/*`, `/gewerke*` (D-24); erste Absätze unter Frage-H2 sind 302–385 Zeichen lang. | Pakete (b) 09-03 und (c) 09-04; sitewide 0 im Phasen-Gate 09-16 | Arbeitsvorrat, keine Regelabschwächung. |

## 09-15 (Paketende, 23.10.2026)

| Befund | Ursache | Zuständig | Hinweis |
|---|---|---|---|
| `tests/announcements.test.ts` weiterhin rot (`lib/gewerke.ts:569: "Bald verfügbar",`), volle Suite 927 von 928 | wie 09-01 | Paket (a) 09-11 | unverändert; 09-15 fasst `lib/gewerke.ts` nicht an (D-27). |
| `content-pruefen.mjs --antwort` über alle 64 Artikel: 21 Befunde auf 15 Ratgebern, `/hilfe/*` 0 | wie 09-01 (gleiche Zahl wie `seo-audit.mjs`); längster Absatz 508 Zeichen (`blog/xrechnung-zugferd-pdf-unterschiede`, „Welche zeitliche Einordnung gilt im September 2026?“), nicht 385 | Pakete (b) 09-03 und (c) 09-04 | Arbeitsvorrat. |
| Kassenbuch und § 13b ohne Registereintrag (`liveExtras`) | neu live seit test.242; ein beworbener Eintrag ändert `/funktionen` (`lib/funktionsgruppen.ts`) | 09-09 (Integration) nach den Hilfeartikeln aus 09-07/09-14 und 09-17 | Übergabeliste in `docs/content-pruefung/09-basis.md`. |
