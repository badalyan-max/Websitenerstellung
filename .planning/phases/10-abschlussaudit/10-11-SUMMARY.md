---
phase: 10-abschlussaudit
plan: 11
subsystem: seo-messung-nachweis-bericht
tags: [paket-e, seo-08, linkregister, uebergabe-2, etappennachweis, analytics, abschlussbericht]
requires:
  - 10-05 (Messstand, Units-Protokoll, KI-Tracker-Abgleich, Vorab-Audit)
  - docs/releases/PHASE-05-ROLLOUT.md bis PHASE-09-ROLLOUT.md
provides:
  - LINKPLAN § 7 „Übergabe 2“ mit 62 kopierfertigen Browser-Prompts
  - SEO-08-Messstand 23.10.2026 (Rohdatei)
  - ETAPPEN-NACHWEIS-V2.md (QA-05, Etappen 05–09) mit Pflichtspalten-Test
  - Analytics je Etappenfenster und Speed-Insights-Felddaten als Rohdateien
  - MEILENSTEIN-V2-ABSCHLUSS.md (Entwurf, Endwerte „Endwert 10-07“)
affects:
  - 10-07 (Rollout): Zeile 10, Endwerte im Abschlussbericht, Analytics-Nachträge
  - 10-12: Lighthouse- und A11y-Endwerte für den Bericht
tech-stack:
  added: []
  patterns:
    - "Markdown-Tabellen per Test auf Pflichtspalten und nicht leere Zellen prüfen (tests/etappen-nachweis.test.ts)"
    - "Übergabe-Abschnitte aus dem Register generieren, Prompts wortgleich (Test prüft Gleichheit)"
key-files:
  created:
    - craftos/docs/releases/ETAPPEN-NACHWEIS-V2.md
    - craftos/docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md
    - craftos/tests/etappen-nachweis.test.ts
    - craftos/docs/seo/data/2026-10-23-seo08-messstand-phase10.json
    - craftos/docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json
    - craftos/docs/seo/data/2026-10-23-vercel-speed-insights-phase10.json
  modified:
    - craftos/docs/seo/backlink-register.json
    - craftos/docs/seo/LINKPLAN.md
    - craftos/tests/backlink-plan.test.ts
decisions:
  - "omr.com im Linkregister auf live: Profil https://omr.com/de/reviews/product/craftos verlinkt auf https://craftos.eu (HTTP-Abruf 23.10.2026, rel=nofollow, veröffentlicht 22.10.2026); OMR-Nachfassen entfällt, Prompt prüft stattdessen die Profilangaben"
  - "SEO-08-Messwert zählt nur Domains, die SE Ranking ausweist: 0 neue seriöse verweisende Domains am 23.10.2026"
  - "Analytics je Etappe über die Vercel-CLI (vercel metrics vercel.analytics.event.count) statt Vercel-MCP; Stundenraster der API dokumentiert, Fenster 08/09 als Teilwerte"
  - "Abschlussbericht ohne Tarifempfehlung; Gemini/AI Mode (Promptlimit) als offene Tarifentscheidung bis 03.11.2026"
requirements-completed: []
metrics:
  duration: "ca. 30 Min."
  completed: 2026-10-23
  tasks: 3
  files: 9
---

# Phase 10 Plan 11: Linkregister, Etappennachweis und Abschlussbericht-Entwurf Summary

Das Linkregister führt OMR Reviews jetzt belegt als live, LINKPLAN § 7 übergibt dem Inhaber 62 kopierfertige Prompts in der vereinbarten Reihenfolge, der Etappennachweis 05–09 ist mit Analytics je 24-Stunden-Fenster und geprüfter `ai_visit`-Verdrahtung belegt, und der Abschlussbericht steht als Entwurf mit markierten Endwerten.

## Aufgaben

| Nr. | Aufgabe | Commit | Ergebnis |
|---|---|---|---|
| 1 | Linkregister, SEO-08-Messstand, Übergabe 2 (TDD) | 14ea405 (rot), caa4931 (grün) | `backlink-plan.test.ts` 14/14; Typcheck, Lint, check-no-secrets grün |
| 2 | Etappennachweis 05–09 mit Analytics-Kontrolle (TDD) | 5239214 (rot), ae2b1c3 (grün) | `etappen-nachweis.test.ts` 5/5; Pflichtbegriffe ok; Typcheck, Lint grün |
| 3 | Entwurf MEILENSTEIN-V2-ABSCHLUSS.md, Paketende | 3eb61d0 | 4 Testdateien, 61/61; Typcheck, Lint, check-no-secrets über `docs scripts` grün; Pflichtbegriffe ok, keine Tarifempfehlung |

## SEO-08-Stand (23.10.2026)

- SE Ranking (Rohsatz vom 23.10.2026, 08:39 UTC, kein neuer Abruf): 12 verweisende Domains, dieselben 12 Spam-Domains wie am 20.10.2026, davon 0 aus dem Linkregister. **Neue seriöse verweisende Domains: 0** (Ziel ≥ 15).
- Register: offen 61, angefragt 0, live 1, nicht möglich 3. omr.com ist live (Profil öffentlich seit 22.10.2026, Link nofollow), in SE Ranking noch nicht erfasst.
- Rohdatei: `craftos/docs/seo/data/2026-10-23-seo08-messstand-phase10.json`.
- Prompts gegen das aktuelle `llms.txt` (live, 23.10.2026, Stand der Angaben 2026-10-20) und das Impressum geprüft: Sie nennen selbst nur Name, Website, Kontakt und Kategorie und verweisen für Preise, Lizenzen, Testphase und Plattformen auf `llms.txt`; keine Korrektur nötig. Der Test prüft Preise, CraftOS-Testtage, Lizenznamen und Plattformen gegen `buildLlmsTxt()`.

## Analytics-Abfrage

- Quelle: Vercel-CLI 65.2.0, `vercel metrics vercel.analytics.event.count`, Team `craft-os`, Projekt `craftos`, Production; Abfragezeitpunkt 23.10.2026, 11:36:22 UTC; gezielte `ai_visit`-Abfrage 11:37:40 UTC; Seitenaufrufe nach Herkunft 11:38:52 UTC.
- 24-Stunden-Fenster ab Push (Stundenraster): 05 trial_click 2, 06: 1, 07: 4 (98 % verstrichen), 08: 1 (53 %, Teilwert), 09: 1 (19 %, Teilwert); `ai_visit` überall 0.
- Befund `ai_visit` = 0: Code-Pfad vorhanden (`components/Analytics.tsx`, `lib/tracking.ts` `detectAiSource`), `/_vercel/insights/script.js` live 200, Startseite mit 3 × `data-track="trial"`; unter 294 Seitenaufrufen kein KI-Referrer und kein `utm_source`. Die Auslösebedingung trat nicht ein.
- Speed-Insights-Felddaten des Orchestrators als Rohdatei mit Quelle und Stichprobe abgelegt (41 LCP-Messungen, 20.–23.10.2026).

## Lücken im Etappennachweis

- Etappe 05: Push-Zeit und Zeitpunkt von `gh workflow list --all` nicht dokumentiert in PHASE-05-ROLLOUT.md (Zelle so gekennzeichnet; Fenster ab Deployment-Erstellung).
- Etappen 05–09: Zählung `trial_click`/`ai_visit` stammt aus 10-11, die Nachweise belegten nur die Verdrahtung.
- Etappen 08 und 09: Analytics-Fenster bei der Abfrage noch nicht abgelaufen (Teilwerte).

## Übergaben an 10-06/10-07

1. **10-07, Zeile 10:** `ETAPPEN-NACHWEIS-V2.md` Zeile 10 aus `PHASE-10-ROLLOUT.md` mit allen elf Spalten nachtragen (Test erzwingt Vollständigkeit und Verweis auf `PHASE-10-ROLLOUT.md`).
2. **Analytics-Nachtrag (Orchestrator):** Endwerte der Fenster 08 (ab 23.10.2026 23:00 UTC) und 09 (ab 24.10.2026 07:00 UTC) sowie das 24-Stunden-Fenster Phase 10 mit derselben CLI-Abfrage (`docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json`). Die Fensteraufteilung je Etappe liegt für 05–07 vollständig vor (07 zu 98 %).
3. **10-07, Abschlussbericht:** alle Felder „Endwert 10-07“ in `MEILENSTEIN-V2-ABSCHLUSS.md` (Positionen je Seitengruppe, KI-Tracker je Engine, verweisende Domains und SEO-08, InLink-Rank, Recheck 485185 und Bestätigungsaudit, Anforderungs-Endstand, Units nach dem Rollout mit Kontoständen).
4. **10-07, QA-04:** Gate-Wert und Bewertung der Speed-Insights-Felddaten legt der Orchestrator fest; Platzhalter in § 7 des Berichts.
5. **10-12 → 10-07:** Lighthouse-Endwerte je Vorlage, Accessibility/Best Practices/SEO und die volle A11y-Matrix (DESIGN-05) in § 7 des Berichts.
6. **10-07, seo-report:** Ohne `--leaderboard` ausführen; der Abgleich „live“-Register gegen SE Ranking erfasst jetzt omr.com.

## Inhaberpunkte

1. Übergabe 2 abarbeiten (LINKPLAN § 7): ProvenExpert- und G2-Konto anlegen, die zwei Portal-Mails (softwareabc24.de, betriebssoftware-kompass.de) senden, kennstdueinen.de und SoftwareWorld, danach die übrigen 55 Einträge.
2. **OMR-Profil prüfen:** Das Profil nennt „Hosting in der EU“; diese Angabe steht weder in `llms.txt` noch auf craftos.eu. Preise im Profil (29,95 € bzw. 9,95 € netto) stimmen mit `llms.txt` überein. Korrektur oder Bestätigung über den Anbieterzugang bei OMR (Punkt 3 der Übergabe 2).
3. **SE Ranking, Tarifentscheidung bis 03.11.2026:** Gemini und AI Mode haben keine Prompts, weil das Testlimit von 20 Prompts erreicht ist (offen, keine Empfehlung im Bericht).
4. Aus 10-05 weiterhin offen: ODR-Link und kurzer Title `/impressum`, Löschfreigaben.

## Units

Plan 10-11: **0 Units**. Kein SE-Ranking-Abruf (laut Plan), kein `DATA_getAiSearchLeaderboard`; Kontostand deshalb nicht abgefragt. Phasensumme bisher 526 von höchstens 5.000 (Rest 4.474), Kontostand zuletzt 18.071 (23.10.2026, 11:05 UTC, 10-05).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Bestehender Test erwartete OMR „angefragt“**
- **Found during:** Aufgabe 1
- **Issue:** `führt den bekannten Portalstand vom 20.10.2026` hätte nach dem belegten Statuswechsel auf „live“ fehlgeschlagen.
- **Fix:** Test prüft für omr.com jetzt „live“ mit Profil-URL und Bezug auf die Anfrage vom 20.10.2026; die übrigen Einträge des Stands vom 20.10.2026 unverändert.
- **Commit:** 14ea405

**2. [Rule 1 - Bug] Faktenstichprobe zu weit gefasst**
- **Found during:** Aufgabe 1 (GREEN)
- **Issue:** Die eigene Stichprobe „\d+ Tage“ traf die ProvenExpert-Angabe „30 Tage Premium“, keine CraftOS-Testphase.
- **Fix:** Stichprobe auf CraftOS-Testphrasen begrenzt („… Tage kostenlos/testen/Test“).
- **Commit:** caa4931

### Weitere Abweichungen

- **OMR-Punkt in Übergabe 2:** Statt „Nachfassen“ steht an dritter Stelle „OMR Reviews – Profil prüfen“, weil das Profil seit 22.10.2026 live ist; Reihenfolge der sieben Portalpunkte unverändert.
- **Analytics über die Vercel-CLI statt Vercel-MCP:** Das MCP stand dieser Ausführung nicht zur Verfügung; die CLI-Metrik `vercel.analytics.event.count` lieferte die Fenster. Die API rundet auf volle Stunden; die Aggregation `unique` (Besucher) lehnte sie ab. Beides ist in der Rohdatei dokumentiert.
- **Zusätzliche Rohdatei Speed Insights:** auf Anweisung des Orchestrators (`docs/seo/data/2026-10-23-vercel-speed-insights-phase10.json`); p90 und Maximum ohne eigene Rohdatei, als Orchestrator-Angabe gekennzeichnet.
- **Keine schwere Prüfung:** Nur gezielte Vitest-Dateien, Typcheck und Lint, daher keine Sperre geholt. Beim Abschluss hielt 10-08 die Sperre (fremd, nicht angefasst).

## Known Stubs

Keine im Sinne fehlender Verdrahtung. Die Felder „Endwert 10-07“ in `MEILENSTEIN-V2-ABSCHLUSS.md` sind bewusste Platzhalter für Werte, die erst der Rollout 10-07 (bzw. 10-12) liefert (Übergaben 3 bis 5).

## Prozesse

Kein Server gestartet, kein schwerer Lauf. Port 3105 frei. Kein Prozess dieses Plans läuft noch.

## Self-Check: PASSED

Alle sechs neuen Dateien vorhanden; Commits 14ea405, caa4931, 5239214, ae2b1c3 und 3eb61d0 im Branch phase10-spur-e.
