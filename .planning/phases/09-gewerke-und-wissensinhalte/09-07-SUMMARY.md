---
phase: 09-gewerke-und-wissensinhalte
plan: 07
subsystem: content-hilfe
tags: [inhalt, paket-f, neue-hilfeartikel, schritt-fuer-schritt, leitlinie-l1, kassenbuch]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: Inhaltsvertrag (answer, scene, Listenobergrenzen, prosaProbleme), Map-Einträge der zehn neuen Hilfe-Pfade; 09-15: eingefrorene Basis Web 6686d05 / Mobile 837aab4f, scripts/content-pruefen.mjs"
provides:
  - "Zehn neue Hilfeartikel mit Hilfe-Gliederung für die neuen Live-Funktionen seit 09.09.2026 (CONTENT-04, Teil Artikel)"
  - "Hilfeartikel Kassenbuch führen (D-32) als vollständiger Entwurf (draft: true) bis zum Map-Eintrag in 09-09"
  - "Prüfdatei docs/content-pruefung/09-f.md mit Belegpfaden, Release-Befunden, Verdrahtungstabelle für 09-14 und Übergabeliste"
affects: [09-14, 09-09, 09-16, 09-10]

tech-stack:
  added: []
  patterns:
    - "Release-Abläufe über git show am eingefrorenen Commit und Routing-Prüfung (App.tsx), nicht nur über Komponentenexistenz"
    - "Sichtprüfung eines Entwurfs über temporären, nicht committeten Map-Eintrag beim Paketende-Build"

key-files:
  created:
    - craftos/content/hilfe/kundenportal-kunden-einladen.md
    - craftos/content/hilfe/angebot-online-unterschreiben-lassen.md
    - craftos/content/hilfe/mahnwesen-einrichten.md
    - craftos/content/hilfe/bankumsaetze-abgleichen.md
    - craftos/content/hilfe/daten-importieren.md
    - craftos/content/hilfe/datanorm-katalog-importieren.md
    - craftos/content/hilfe/lager-scan-app.md
    - craftos/content/hilfe/besichtigung-durchfuehren.md
    - craftos/content/hilfe/projekt-chat-nachrichten.md
    - craftos/content/hilfe/app-sprache-einstellen.md
    - craftos/content/hilfe/kassenbuch-fuehren.md
    - craftos/docs/content-pruefung/09-f.md
  modified: []

key-decisions:
  - "Phase 9: Kundenportal-Artikel nennen nur am Release geroutete Inhalte (Startseite „Ihre Unterlagen“, Angebote und Rechnungen über den E-Mail-Link); Termine und Portal-Chat sind nicht geroutet"
  - "Phase 9: Hilfeartikel kassenbuch-fuehren liegt als draft: true vor; ein Map-Eintrag ohne Keyword-Daten würde keyword-map.test rot machen, 09-09 legt ihn mit Daten an und veröffentlicht"
  - "Phase 9: Lager-Foto-KI ohne Credit-Zahl, weil der Wert nicht in lib/site.ts steht (09-UI-SPEC § 5); Übergabe an 09-09"
  - "Phase 9: Szenen nur, wo die Szenen-Evidenz den Ablauf belegt (portal, mahnwesen, bank, import, lagerApp); keine Szene für Online-Unterschrift, DATANORM, Besichtigung, Chat, Sprache, Kassenbuch"

requirements-completed: []

duration: 95min
completed: 2026-10-23
---

# Phase 9 Plan 07: Neue Hilfeartikel (Paket f, Teil Artikel) Summary

**Zehn Schritt-für-Schritt-Anleitungen für Kundenportal, Online-Unterschrift, Mahnwesen, Bankabgleich, Datenübernahme, DATANORM, Lager-Scan, Besichtigung, Projekt-Chat und App-Sprache, dazu „Kassenbuch führen“ (D-32) als Entwurf – alle Bedienbegriffe am eingefrorenen Release belegt, L-1 positiv, Build und seo-audit über elf Pfade ohne Verstoß.**

## Performance

- **Duration:** ca. 95 min
- **Started:** 2026-10-23T00:14Z (Startgate, danach `npm ci` unter Sperre, wartete auf 09-17)
- **Completed:** 2026-10-23T01:50Z
- **Tasks:** 2 von 2 plus Zusatz D-32
- **Files:** 12 neu

## Startgate

`git merge --no-edit main` → bereits aktuell (`682d86b`); `09-basis.md` und `content-pruefen.mjs` auf HEAD; alle zehn Map-Einträge vorhanden (`geplant`, Phase 9, vollständige `target`); Eintrag für `/hilfe/kassenbuch-fuehren` fehlt (siehe Abweichung 1).

## Accomplishments

- **Aufgabe 1 (`c46b1ba`):** `kundenportal-kunden-einladen`, `angebot-online-unterschreiben-lassen`, `mahnwesen-einrichten`, `bankumsaetze-abgleichen`, `daten-importieren` mit `answer`, „Voraussetzungen“, „Schritt für Schritt …“, „Ergebnis prüfen“, „Häufige Probleme“ (H3-Fragen, Antwort ≤ 300). L-1 positiv: Portal-Rechnungen per Überweisung auf das Konto des Rechnungs-PDF, „Automatische Mahnungen gelten für normale Rechnungen“, Bankabgleich mit bestätigter Zuordnung und KI auf Anforderung, Import-KI kostenlos.
- **Aufgabe 2 (`561bd1d`):** `datanorm-katalog-importieren` (nur „DATANORM 4 und DATANORM 5“), `lager-scan-app`, `besichtigung-durchfuehren` (keine Aussage zur Videoauswertung), `projekt-chat-nachrichten`, `app-sprache-einstellen` (21 Sprachen aus `mobileLocales`, namentlich genannt). 09-f.md um Zeilen, Befunde, Verdrahtungstabelle und Übergabeliste ergänzt.
- **D-32 (`b16a100`):** `kassenbuch-fuehren` (Buchhaltung → „Kasse“: Kasse eröffnen, Buchung erfassen, Kassensturz, Export „DATEV“/„CSV“, Storno, Fehlermeldungen) als `draft: true`.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-f.md --zitate --l1 --antwort` (5 bzw. 11 Dateien) | 0 Befunde; 1 Hinweis „CSV“ (kurzer Begriff, Beleg `Kassenbuch.tsx` Z. 126) |
| `vitest run tests/content-produktwahrheit.test.ts tests/keyword-map.test.ts` (je Aufgabe) | 35 von 35 grün |
| `vitest run tests/content.test.ts` unter `.heavy-lock` (je Aufgabe) | 34 von 34 grün (erster Lauf Aufgabe 1 rot, siehe Abweichung 2) |
| `npm run typecheck`, `npm run lint` (je Aufgabe) | Exitcode 0 |
| Paketende unter Sperre: `npm run build` | Exitcode 0 |
| `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs --paths=<10 Pfade>,/hilfe/kassenbuch-fuehren` | 11 von 147 URLs, alle 12 Regeln 0 Verstöße |
| Akzeptanz-greps (`automatisch abgegl…`, `onlinezahlung…`, `videoauswertung…`, `DATANORM v5`) | je 0 |

## Task Commits

1. **Aufgabe 1:** `c46b1ba` feat(09-07): fünf Büro-Anleitungen – Kundenportal, Online-Unterschrift, Mahnwesen, Bankabgleich, Datenübernahme
2. **Aufgabe 2:** `561bd1d` feat(09-07): fünf Baustellen- und App-Anleitungen – DATANORM, Lager-Scan, Besichtigung, Projekt-Chat, App-Sprache
3. **Zusatz D-32:** `b16a100` feat(09-07): Hilfeartikel Kassenbuch führen als Entwurf (D-32)

## Decisions Made

- Release-Befund Kundenportal: `src/App.tsx` Z. 235–238 routet nur `/portal/quotes/:id` und `/portal/invoices/:id`, alles andere zeigt „Ihre Unterlagen“; die Navigation hat nur „Startseite“ (Release-Test K15). Artikel nennen deshalb weder „Meine Termine“ noch den Portal-Chat, obwohl 09-RESEARCH sie aufführt.
- Rollen je Ablauf aus dem Code statt pauschal: Mahn-Einstellungen nur Inhaber; Datenübernahme und DATANORM Admin oder Büro-Leitung (`importAccess.ts`); Bankumsätze und Kasse mit Finanzrechten (Lizenzfunktion `finanzen`).
- Szenen nur mit passender Evidenz (D-15).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 – blockierend, Auftrag D-32] Kassenbuch-Artikel ohne Map-Eintrag als Entwurf**
- **Found during:** Startgate / D-32
- **Issue:** Ohne Map-Eintrag wären `tests/content.test.ts` („jede Inhaltsdatei hat einen Map-Eintrag“) und der Build (`zielwerte` wirft) rot. Ein minimaler Eintrag mit `primary: null` macht aber `tests/keyword-map.test.ts` rot, weil der Test dafür `pageCandidates` und Rohdaten mit „keine Daten“ verlangt; Paket (f) darf keine SE-Ranking-Abrufe machen, und Rohdaten zu erfinden kommt nicht in Frage.
- **Fix:** Artikel vollständig mit `draft: true` (von Liste, Sitemap und Prüfungen ausgenommen, Frontmatter wird trotzdem validiert). Map-Eintrag mit vorgeprüften Zielwerten, Keyword-Abruf und Veröffentlichung in der Übergabeliste an 09-09. `keyword-map.json` nicht geändert.
- **Sichtprüfung:** Paketende-Build und seo-audit liefen mit temporärem Map-Eintrag und `draft: false` (nicht committet, danach zurückgesetzt): `/hilfe/kassenbuch-fuehren` 0 Verstöße.
- **Commit:** `b16a100`

**2. [Rule 1 – Bug] `relatedArticles` auf noch nicht vorhandene Datei**
- **Found during:** Aufgabe 1, `content.test.ts`
- **Issue:** `daten-importieren` verwies vor Aufgabe 2 auf `/hilfe/datanorm-katalog-importieren` (Test „feature links“ rot).
- **Fix:** In Aufgabe 1 vorübergehend `/hilfe/gaeb-importieren`, in Aufgabe 2 wieder auf den DATANORM-Artikel.
- **Commits:** `c46b1ba`, `561bd1d`

**3. [Rule 1 – Abweichung von 09-RESEARCH] Portalinhalte und Portal-Chat**
- Siehe Decisions; dokumentiert als Befund 1 und 3 in 09-f.md.

**4. [Regel 09-UI-SPEC § 5] Kein Credit-Wert für die Lager-Foto-KI**
- Der Wert „bis zu 2 Betriebscredits“ steht nur in der Mobile-Sprachdatei, nicht in `lib/site.ts`; Übergabe an 09-09.

---

**Total deviations:** 4 (1 blockierend gelöst, 1 Bug, 2 Inhaltsregeln). **Impact:** keine Regel abgeschwächt, keine geteilte Datei geändert.

## Geteilte Dateien

Keine geändert. `docs/seo/keyword-map.json` nur temporär für die Sichtprüfung angepasst und per `git checkout -- <datei>` zurückgesetzt; `lib/**`, Tests, Vorlagen unverändert. Verdrahtung (`lib/funktionsdetails/*.ts`, `tests/funktionsdetails.test.ts`, `lib/app-content.ts`) folgt in 09-14.

## Known Stubs

- `craftos/content/hilfe/kassenbuch-fuehren.md` Z. 9 `draft: true`: bewusst, bis 09-09 den Map-Eintrag mit Keyword-Daten anlegt (Übergabeliste 09-f.md). Inhalt vollständig.

## Threat Flags

Keine neue Angriffsfläche: reine Markdown-Inhalte ohne Roh-HTML (T-09-23), Zahlungs-, KI- und Credit-Aussagen nur aus Release-Dateien bzw. ohne Zahlenwert (T-09-21).

## Next Phase Readiness

- 09-14 (selber Worktree): Verdrahtungstabelle in 09-f.md.
- 09-09: Kassenbuch-Map-Eintrag (Zielwerte vorgeprüft), `draft: false`, `liveExtras` Kassenbuch, ggf. Credit-Wert Lager-KI in `site.ts`, Status der zehn Pfade auf „bestehend“.
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel); kein Merge, kein Push.

## Self-Check: PASSED

Alle 12 Dateien vorhanden; Commits c46b1ba, 561bd1d, b16a100 im Branch phase09-spur-f.
