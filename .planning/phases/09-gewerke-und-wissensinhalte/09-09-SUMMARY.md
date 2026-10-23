---
phase: 09-gewerke-und-wissensinhalte
plan: 09
subsystem: content-integration
tags: [integration, keyword-map, answer-pflicht, endmengen, querverweise, release-delta, abdeckung, kundenportal, leitlinie-l1, kassenbuch]

requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "Pakete a–g, Fundament 09-01/09-12/09-15, Verdrahtung 09-13/09-14, Craft-AI-Hotfix d778c31"
provides:
  - "Strenge Tests: K-3, UEBERGANG_PHASE9 und L1_UEBERGANG_PHASE9 entfernt, answer Pflicht, Endmengen 30/54, Prüfdatei-Test"
  - "Keyword-Map: 20 Phase-9-Einträge bestehend inkl. /hilfe/kassenbuch-fuehren (digitales kassenbuch 320/8), Korrekturen aus den Übergabelisten"
  - "Kundenportal-Aussagen nach Release a0e27c42 (Angebotsmail → Unterschriftsseite, Rechnungsmail mit PDF, ohne Termine/Nachrichten)"
  - "Produktdaten ohne Negativsätze (Inhabervorgabe L-1), Ausnahme GoBD-FAQ"
  - "33 Artikel mit Querverweisen auf die neuen Slugs, llms.txt mit Wissensseiten und Anleitungen"
  - "Produktbasis Web v4.0.0-test.246, liveExtras Kassenbuch und § 13b, 09-integration.md mit Abdeckungstabelle"
affects: [09-16, 09-10]

tech-stack:
  added: []
  patterns:
    - "Map-Bearbeitung per Scratchpad-Skript mit Regelprüfung vor dem Schreiben (Titel, Description, H1, Kopfwort, Überclaim, L-1, Eindeutigkeit, Kannibalisierung)"
    - "FAQ-Fragen so gewählt, dass die Antwort Unterstütztes nennt; Test: keine FAQ-Antwort beginnt mit „Nein“"
    - "llms.txt-Linktexte aus Map-Titeln (eine Quelle mit der Seite)"

key-files:
  created:
    - craftos/tests/content-pruefung.test.ts
    - craftos/docs/content-pruefung/09-integration.md
    - craftos/docs/seo/data/2026-10-23-keyword-metrics-kassenbuch-phase09.json
  modified:
    - craftos/lib/content.ts
    - craftos/app/sitemap.ts
    - craftos/app/globals.css
    - craftos/docs/seo/keyword-map.json
    - craftos/docs/seo/KEYWORD-MAP.md
    - craftos/docs/seo/keyword-seeds.json
    - craftos/lib/llms.ts
    - craftos/lib/funktionen.ts
    - craftos/lib/funktionsdetails/angebot.ts
    - craftos/lib/funktionsdetails/baustelle.ts
    - craftos/lib/funktionsdetails/buchhaltung.ts
    - craftos/lib/funktionsdetails/planung.ts
    - craftos/lib/funktionsdetails/rechnung.ts
    - craftos/lib/gewerke.ts
    - craftos/lib/app-content.ts
    - craftos/lib/product-register.ts
    - craftos/docs/PRODUCT-REGISTER.md
    - craftos/docs/product-pricing-snapshot.json
    - craftos/docs/product-source-snapshot.json
    - craftos/docs/content-pruefung/09-e2.md
    - "craftos/content/blog/*.md, craftos/content/hilfe/*.md (36 Artikel)"
    - "craftos/tests/: content, content-vorlage, keyword-map, content-produktwahrheit, funktionsdetails, design-v2-budgets, app-seite, llms"

key-decisions:
  - "Phase 9: Endmenge Hilfe 54 statt 53, weil /hilfe/kassenbuch-fuehren (D-32) mit Map-Eintrag veröffentlicht ist"
  - "Phase 9: Kassenbuch-Hauptkeyword „digitales kassenbuch“ (320/8) aus eigenem SE-Ranking-Abruf (0 Units); „kassenbuch“ 6.600/88 zu schwer"
  - "Phase 9: Kundenportal positiv nach Release a0e27c42 – Angebote über persönlichen Link der Angebotsmail, Rechnungen als PDF, keine Termine/Nachrichten"
  - "Phase 9: Negativsätze in Produktdaten positiv (Grenze-Kacheln, Nein-Antworten, Grenze-Sätze); einzige Ausnahme FAQ „Ist CraftOS GoBD-zertifiziert?“"
  - "Phase 9: Produktbasis nach Delta-Prüfung auf Web v4.0.0-test.246 (a0e27c42) gehoben; Preise, Credits, Testphase unverändert"
  - "Phase 9: liveExtras Kassenbuch und § 13b mit advertised: false – Zusatzkarte auf /funktionen erst nach Entscheidung in Phase 10"

requirements-completed: []

duration: ca. 85 min
completed: 2026-10-23
---

# Phase 9 Plan 09: Integration Summary

**Phase-9-Stand streng testbar: Übergänge K-3 und beide Übergangslisten entfernt, `answer` Pflicht, Endmengen 30/54, Prüfdatei-Test; Keyword-Map mit 20 veröffentlichten Phase-9-Einträgen inklusive Kassenbuch, Kundenportal und Produktdaten nach Release und Inhabervorgabe positiv, 33 Artikel querverlinkt, llms.txt erweitert, Produktbasis auf Web test.246 – volle Suite 1302/1302, SEO-Audit sitewide 0 Verstöße.**

## Performance

- **Duration:** ca. 85 min
- **Started:** 2026-10-23T03:15Z
- **Completed:** 2026-10-23T04:43Z
- **Tasks:** 2 von 2 plus Zusatzaufträge (rote Tests, Kassenbuch, Kundenportal, L-1, /preise-H2)
- **Files:** 3 neu, rund 60 geändert

## Accomplishments

- **Aufgabe 1 (RED `e3fdf77`, GREEN `0265f56`):** `tests/content-pruefung.test.ts` neu (jede der neun Prüfdateien nennt ihre Paketartikel genau einmal, b–g = 84 Artikel). `content.test.ts`: Endmengen 30/54, RSS 30, jeder Artikel-Eintrag `bestehend`, `answer` Pflicht (≤ 300), Listenobergrenzen über alle 84, `/blog` und `/hilfe` mit `lastModified` 2026-10-23, Prosa-Übergangsliste entfernt. `keyword-map.test.ts`: K-3 entfernt, Phase-9-Block auf `bestehend`, Kassenbuch- und Korrekturfälle. `content-produktwahrheit.test.ts`: Übergangsliste entfernt, Geltung um `lib/funktionen.ts`, alle `lib/funktionsdetails/*.ts`, `lib/app-content.ts`. `lib/content.ts`: fehlende `answer` wirft „Artikel {slug}: Antwort fehlt – Frontmatter answer mit ein bis zwei Sätzen (≤ 300 Zeichen) ergänzen.“ Map: 19 Pfade `bestehend`, Kassenbuch-Eintrag, neun Korrekturen; `pageCandidates` für sechs Ratgeber-Wissensseiten und Kassenbuch (behebt `keyword-seeds.test`).
- **Kundenportal (`6e6cec0`):** `/funktionen/kundenportal`, `lib/funktionen.ts`, Angebote-FAQ, zwei Gewerke-FAQ, drei Hilfeartikel, Map-Descriptions, Register-Belege und `PRODUCT-REGISTER.md` nach Release a0e27c42.
- **Inhabervorgabe L-1 (`ecf21f8`):** sechs Grenze-Kacheln, 14 FAQ-Antworten, neun Grenze-Sätze und die /app-Notiz positiv; neuer Test gegen „Nein“-Antworten und Negationen in Grenze-Texten.
- **Aufgabe 2 (`738fae1`, `11b0dc8`, `7b1ed70`, `cdb031a`, `c932891`):** Querverweise aus allen Übergabelisten, llms.txt mit neun Wissensseiten und elf Anleitungen, Kassenbuch-Kachel auf `/funktionen/buchhaltung`, Release-Delta und `sync:product`, liveExtras Kassenbuch/§ 13b, Zahlungsziel-Satz, /preise-H2, `09-integration.md`.

## Task Commits

1. `e3fdf77` test(09-09): Strenge der Integration RED
2. `0265f56` feat(09-09): Strenge wiederhergestellt – Phase 9 bestehend, answer Pflicht, Kassenbuch veröffentlicht, Map-Korrekturen
3. `6e6cec0` fix(09-09): Kundenportal-Aussagen nach Release
4. `ecf21f8` fix(09-09): Produktdaten nennen nur Unterstütztes
5. `738fae1` feat(09-09): Querverweise, llms.txt, Kassenbuch auf /funktionen/buchhaltung
6. `11b0dc8` chore(09-09): Produktbasis auf Web v4.0.0-test.246, Register mit Kassenbuch und § 13b
7. `7b1ed70` fix(09-09): Zahlungsziel-Satz ohne Testphasen-Lesart, /preise-H2
8. `cdb031a` fix(09-09): /preise-H2 nur ab 768 px ohne automatische Trennung
9. `c932891` docs(09-09): 09-integration.md, deferred-items

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| RED (Aufgabe 1) | `content.test` 5 rot / 31 grün, Map- und Prüfdatei-Test je 1 rot (erwartet) |
| Rote Tests auf main vorher | `keyword-seeds` 1, `pricing-parity` 2 (Testphase, Snapshot) – alle behoben |
| Volle Vitest-Suite unter Sperre | **1302 von 1302 grün** |
| `content.test.ts` unter Sperre | 36 von 36 |
| `content-pruefen.mjs --l1 --antwort` über alle Artikel | 84 Dateien, 0 Befunde, 0 Hinweise |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.246 (a0e27c42).“ |
| `npm run typecheck`, `npm run lint` | Exitcode 0 |
| `npm run build` (unter Sperre, zweimal) | Exitcode 0 |
| `seo-audit.mjs --report` sitewide (`MSYS_NO_PATHCONV=1`) | 156 von 156 URLs, alle 12 Regeln 0 Verstöße |
| `route-audit.mjs` (Port 3100) | 0 Fehler, 0 defekte Links (159 Links) |
| Sichtprüfung /preise-H2 Chromium/WebKit | 768/1024/1440: „Handwerkersoftware“ ungetrennt; 360: „Handwerkersoft-ware“ mit Trennstrich |
| Sichtprüfung /hilfe/kassenbuch-fuehren, /funktionen/kundenportal, /funktionen/buchhaltung (360, 768, 1024, 1440) | Status 200, 0 px Überlauf, Kassenbuch mit `#antwort` |
| Strenge-Probe (Plan) | „streng“; 0 Phase-9-Einträge ≠ `bestehend` |

Screenshots (nur Scratchpad): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/09-09/` (`*-preise-h2.png`, `*-hilfe-kassenbuch-fuehren.png`, `*-funktionen-kundenportal.png`, `*-funktionen-buchhaltung.png`).

## SE Ranking

Kontostand vorher 26.309 Units, nachher 26.309 Units (0 verbraucht, Budget 300). Ein Abruf `DATA_getKeywordsMetrics` (zehn Kassenbuch-Kandidaten, source=de); Rohdaten mit Herkunftskopf in `craftos/docs/seo/data/2026-10-23-keyword-metrics-kassenbuch-phase09.json`. Schlüssel nur aus `.env` gelesen, nicht ausgegeben.

## Snapshot-Anhebung

Delta Web `6686d05e` → `a0e27c42` (v4.0.0-test.246, 4 Commits): Angebotsstatus „Fertiggestellt“, Kassenbuch-Formatierung, Nebenbefunde Abnahme; `constants`, `subscription`, `featureFlags`, `ai`, Migrationen unverändert. `npm run sync:product`: Preise, Credits, Testphase identisch. `productBasis.web` und `product-source-snapshot.json` (43 Belegdatei-Hashes) gehoben; Mobile unverändert test.96. Keine Artikeländerung nötig.

## Decisions Made

Siehe `key-decisions`. Details, Belege und abgelehnte Übergaben in `craftos/docs/content-pruefung/09-integration.md`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Abnahmewert] Endmenge Hilfe 54 statt 53**
- Kassenbuch ist laut Auftrag veröffentlicht; Tests und Doku nennen 54, Paket f 11 Artikel.

**2. [Rule 3 – Prüfdatei-Format] 09-e2.md Pflichtquellen-Tabelle**
- Zwei Zeilen begannen mit `| hilfe/…`; als Code gesetzt wie in 09-b/09-c, damit „genau einmal“ prüfbar ist. Commit `0265f56`.

**3. [Rule 3 – blockierend] content-vorlage-Fixture**
- Der Test „ohne answer“ baute einen Artikel ohne `answer`; Fixture liefert jetzt `answer`, der Lead-Fallback wird als Komponentenvertrag mit nachträglich entfernter `answer` geprüft. Commit `e3fdf77`.

**4. [Rule 3] Phase-9-Block im Map-Test erst in GREEN umgestellt**
- „die zehn neuen Hilfe-Pfade sind geplant“ und `phase9` (geplant) mussten mit dem Statuswechsel auf `bestehend` und 20 Einträge umgestellt werden. Commit `0265f56`.

**5. [Rule 1 – Testphase] Ursache der roten pricing-parity-Prüfung**
- Das Testkontext-Muster `test` traf „Spätestens“. Satz umformuliert (§ 286 Abs. 3 BGB sinngleich); Test bewusst nicht geändert, Hinweis in deferred-items.

**6. [Rule 1 – Darstellung] /preise-H2 bei 360 px**
- Erste Fassung (`hyphens: manual` immer) brach das Wort bei 360 px ohne Strich um; Ausnahme auf ≥ 768 px begrenzt. Commit `cdb031a`.

**7. [Auftrag] Zusätzliche Tests geändert:** `funktionsdetails.test.ts` (Portal, Pflichtfragen, Kassenbuch-Anordnung `md·sm·sm·wide·wide`, neuer L-1-Test), `design-v2-budgets.test.ts` (Nutzensatz Kundenportal), `app-seite.test.ts` (Offline-Notiz), `llms.test.ts` (Wissen) – jeweils gleichgezogen, keine Prüfung gelockert.

**8. [Plan-Abweichung, Auftrag] STATE/ROADMAP:** Der Plan überlässt sie dem Orchestrator; laut Auftrag hier aktualisiert.

---

**Total deviations:** 6 Auto-Fixes, 2 Auftragsvermerke. **Impact:** keine Regel abgeschwächt; alle Übergänge entfernt.

## Deferred Issues

Siehe `deferred-items.md` (09-09): ProductDemo/`lib/demo/machine.ts` (Phase 10, unverändert), Portal-Szene, Zusatzkarten Kassenbuch/§ 13b, Lager-KI-Credit-Wert, Testkontext-Muster.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-09-27: Übergänge vollständig entfernt (Strenge-Probe „streng“). T-09-28: Release-Sprung nur nach dokumentiertem Delta und Faktenabgleich, `sync:product:check` grün. SE-Ranking-Schlüssel nie ausgegeben, Rohdatei ohne Schlüssel geprüft.

## Next Phase Readiness

- 09-16 trägt die Gate-Ergebnisse in die Abdeckungstabelle von `09-integration.md` ein.
- Sperre `.heavy-lock` freigegeben, Port 3100 frei, kein Server und kein Hintergrundprozess aktiv. Kein Push.

## Self-Check: PASSED

- FOUND: craftos/tests/content-pruefung.test.ts, craftos/docs/content-pruefung/09-integration.md, craftos/docs/seo/data/2026-10-23-keyword-metrics-kassenbuch-phase09.json
- FOUND: e3fdf77, 0265f56, 6e6cec0, ecf21f8, 738fae1, 11b0dc8, 7b1ed70, cdb031a, c932891
