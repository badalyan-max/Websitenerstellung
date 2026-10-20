---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 07
subsystem: seo
tags: [seo, se-ranking, mcp, backlinks, messung, linkplan]
requires:
  - phase: 05-01
    provides: "keyword-map.json (126 Hauptkeywords, 19 geplant mit phase), check-no-secrets.mjs, ENV_FILE-Muster"
provides:
  - "backlink-register.json: Statusregister mit 65 Linkzielen, Browser-Prompts und Portalstand 20.10.2026"
  - "LINKPLAN.md: Ziel ≥ 15 Refdomains, Regeln, Filterregel, Übergabe 1, Statuspflege, Messung"
  - "scripts/lib/se-ranking-mcp.mjs: wiederverwendbarer MCP-Client (JSON/SSE, Drosselung, Backoff)"
  - "scripts/se-ranking-sync.mjs: Projektabgleich mit persistierten limits[]"
  - "scripts/seo-report.mjs: Etappenbericht gegen den Ausgangsstand 20.10.2026"
  - "Projekt 13094375 trackt alle 126 Hauptkeywords der Keyword-Map mit Zielseite (limits leer)"
affects: [05-08, 06, 07, 08, 09, 10]
tech-stack:
  added: []
  patterns:
    - "MCP-Aufrufe ausschließlich über createClient() aus scripts/lib/se-ranking-mcp.mjs"
    - "Berichtsdateien je Datum und Etappe, Schreiben mit flag wx (kein Überschreiben)"
key-files:
  created:
    - craftos/tests/backlink-plan.test.ts
    - craftos/docs/seo/backlink-register.json
    - craftos/docs/seo/LINKPLAN.md
    - craftos/scripts/lib/se-ranking-mcp.mjs
    - craftos/scripts/se-ranking-sync.mjs
    - craftos/scripts/seo-report.mjs
    - craftos/docs/seo/reports/2026-10-21-projektabgleich.json
    - craftos/docs/seo/reports/2026-10-21-projektabgleich-apply.json
    - craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md
    - craftos/docs/seo/reports/2026-10-21-raw-ausgangsstand-*.json (6 Dateien)
  modified: []
key-decisions:
  - "05-07: Projekt 13094375 trackt alle 126 Hauptkeywords (107 bestehend, 19 geplant mit geplantem Pfad); limits[] leer, SEO-07 erledigt"
  - "05-07: Die beiden fertigen Portal-Mailtexte (softwareabc24.de, betriebssoftware-kompass.de) werden nicht neu formuliert; Register und LINKPLAN nennen Empfänger, Absender und Betreffvorschlag"
  - "05-07: SEO-08 bleibt in REQUIREMENTS offen, bis Plan 05-08 den Phasenstatus festlegt; ≥ 15 neue seriöse Refdomains ist Meilensteinziel"
  - "05-07: Messbericht zählt bestehende, geplante und Zusatz-Keywords getrennt; Basis für Positionen ist zusätzlich die Projekt-Erstmessung vom 20.10.2026"
requirements-completed: [SEO-07]
duration: 17min
completed: 2026-10-21
---

# Phase 5 Plan 07: SE Ranking für Messung und Verweisaufbau Summary

**Statusregister mit 65 Linkzielen und regelkonformen Browser-Prompts, MCP-Client mit Projektabgleich (alle 126 Hauptkeywords der Keyword-Map jetzt in Projekt 13094375, limits leer) und Etappen-Messbericht gegen den Ausgangsstand vom 20.10.2026**

## Performance

- **Dauer:** ca. 17 Minuten
- **Gestartet:** 2026-10-21 00:39 (lokal)
- **Abgeschlossen:** 2026-10-21 00:56 (lokal)
- **Tasks:** 3 von 3
- **Dateien:** 16 neu (davon 9 Berichts- und Rohdateien), 0 geändert

## Ergebnisse

- **Linkplan (SEO-08, Start):** `backlink-register.json` mit 65 Zielen. 16 haben Priorität 1, davon 13 Bewertungs- und Vergleichsportale. 35 haben Priorität 2 (Fachmedien, Kammern und Großhandel), 14 haben Priorität 3 (Verzeichnisse und Presseportale). 61 Einträge sind offen, einer ist angefragt (OMR), drei sind nicht möglich (trusted.de, Softguide, Wikipedia). Jeder bearbeitbare Eintrag hat einen kopierfertigen Browser-Prompt mit allen Pflichtsätzen.
- **Übergabe 1** in `LINKPLAN.md` §4: Prompts für ProvenExpert, G2 (Capterra/GetApp/Software Advice), OMR-Nachfassen, kennstdueinen.de und SoftwareWorld sowie die zwei E-Mails (Empfänger, Absender, Betreffvorschlag; Text liegt beim Browser-Agenten).
- **Projektabgleich (SEO-07):** Vorher waren 53 Projekt-Keywords angelegt, von denen 98 Soll-Keywords fehlten und 8 eine abweichende Zielseite hatten. Nach `--apply` sind es 151 Projekt-Keywords. Fehlend und abweichend sind jeweils 0, limits[] ist leer. Die 25 zusätzlichen Keywords bleiben erhalten (Löschregel), darunter „craftview software gmbh“.
- **Messbericht:** `reports/2026-10-21-messbericht-ausgangsstand.md`. Verweisende Domains: 12 (alle Spam), unverändert. Share of Voice CraftOS: 0,02 %, unverändert. Bestehende Seiten: 1 Keyword in den Top 100 (metallbau software, Platz 61), 0 in den Top 10. Die 98 neuen Keywords werden erst bei der nächsten täglichen Prüfung gemessen.

## Task-Commits

1. **Task 1 (RED):** `f5189eb` – test(05-07): Regeln und Portalstand für Linkplan-Register (rot)
2. **Task 1 (GREEN):** `1bb70f6` – feat(05-07): Linkplan mit Statusregister, Browser-Prompts und Übergabe 1
3. **Task 2:** `e0977be` – feat(05-07): SE-Ranking-MCP-Client und Projektabgleich mit der Keyword-Map
4. **Task 3:** `431240c` – feat(05-07): Messbericht-Skript und erster Bericht (Etappe ausgangsstand)

## Prüfergebnisse (lokal)

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run tests/backlink-plan.test.ts` | RED vorher 2/7 (5 rot); GREEN 7/7 grün (6 Registerfälle + 1 LINKPLAN-Fall) |
| `node -e "…backlink-register.json…length"` | 65 (≥ 40) |
| LINKPLAN enthält „Übergabe 1 an den Inhaber“, „Kaufe nichts“, „Disavow“, „15“ | ja |
| `node scripts/se-ranking-sync.mjs --list-tools PROJECT_` | 127 PROJECT-Tools; genutzt: listKeywords, addKeywords, updateKeyword, listCompetitors, listLlmEngines, listPrompts, getSearchEngines, getKeywordStats |
| `--check` vor dem Abgleich | exit 1 (fehlend 98, abweichend 8 – erwartet) |
| `--apply` | exit 0: hinzugefügt 98, Zielseite angeglichen 8, Limits 0 |
| abschließender `--check` und Plan-Verify-Kommando | exit 0: `soll 126 / 126 geplant 19 / 19 fehlend 0 abweichend 0 limits 0 offen ohne Limit 0`; limitsQuelle = `docs/seo/reports/2026-10-21-projektabgleich-apply.json` |
| `grep CRAFTOS_ENV_FILE` / `grep ../.env` / `grep X-Api-Key` in se-ranking-mcp.mjs | 2 / 0 / 1 |
| `grep -niE "delete\|remove" se-ranking-sync.mjs` | keine Treffer (kein Lösch-Tool) |
| Task-3-Verify (Inhalte des Berichts, check-no-secrets, Negativtest) | `ok`, `OK: Schlüssel in keiner Datei`, zweiter Aufruf mit `--etappe ausgangsstand` bricht vor jedem Netzaufruf mit exit 1 ab → Verify exit 0 |
| Argumentprüfung `seo-report.mjs` ohne/mit ungültiger Etappe | exit 1 mit Nutzungshinweis |
| `node scripts/check-no-secrets.mjs docs/seo scripts` | OK: Schlüssel in keiner Datei |
| ESLint auf allen neuen Skripten und dem Test | 0 Fehler, 0 Warnungen |

Das vollständige Ship-Gate (Build, Lint, Typcheck, gesamte Testsuite, /review) läuft laut Plan über den Gesamtdiff in Plan 05-08.

## SE Ranking: Kontingent, Aufrufe und Limits

- **Units:** `DATA_getSubscription` meldete vor dem ersten Aufruf dieses Plans 65.259 verbleibende von 100.000 Units, nach dem Messbericht ebenfalls 65.259. Project-API-Aufrufe (Keywords, Zielseiten, Prompts, Positionen) haben das Kontingent nachweislich nicht belastet. Für Leaderboard, Backlinks-Zusammenfassung und Refdomains meldete der Zähler ebenfalls keinen Abzug. Er wird möglicherweise verzögert aktualisiert, deshalb vor weiteren DATA-Abrufen erneut prüfen. Testzugang bis 03.11.2026.
- **Aufrufe:** Sondierung 8 lesende Aufrufe, `--check` 3 × 8, `--apply` 15 (8 Zielseiten, 5 Pakete à höchstens 20 Keywords, 2 Lesevorgänge), Messbericht 8. Alle Aufrufe mit mindestens 1,6 s Abstand; es trat kein 429 auf.
- **Limits:** keine. Kein HTTP 403 und kein Keyword-Limit, limits[] ist leer, und alle 126 Hauptkeywords (107 bestehend, 19 geplant mit geplantem Pfad) sind getrackt. **SEO-07 gilt damit als erledigt** und ist in REQUIREMENTS.md abgehakt.
- **Wettbewerber:** 5 (Plancraft, ToolTime, openHandwerk, Meisterwerk, HERO Software), wie im Befund §6.
- **AI Result Tracker:** 5 Engines (ChatGPT 203632, Perplexity 204127, Gemini 204130, AI Overview 204133, AI Mode 204136) und **20 statt 10 Prompts**. Zehn davon sind die im Befund genannten (ChatGPT 6, Perplexity 2, AI Overview 2). Die übrigen zehn sind themenfremde ChatGPT-Prompts, die SE Ranking offenbar beim Anlegen automatisch erzeugt hat (z. B. „DIY-Projekte für Modeaccessoires“, „Möbel für mein Wohnzimmer“; alle in Gruppe 94132). Wegen der Löschregel wurden sie nicht entfernt (siehe Inhaberaktionen).

## Entscheidungen

- **Register-Domains ohne „www.“:** Der Gap-Rohsatz führt viele Domains mit „www.“. Der Test vergleicht deshalb nach dem Entfernen des Präfixes und prüft zusätzlich die identische Wettbewerberliste.
- **Kosten nur bei Beleg:** „kostenlos“ steht nur dort, wo ein Beleg vorliegt (ProvenExpert FREE-Plan, softwareabc24.de laut Agent, YouTube, Wikipedia). trusted.de und Softguide stehen auf „nur bezahlt“, alle übrigen auf „unbekannt“. Die Prompts lassen die Kosten jeweils vor dem Eintrag prüfen.
- **Großhandel/Partner auf Priorität 2:** Der Plan nennt diese Kategorie in seiner Prioritätsregel nicht. Partnerseiten sind fachlich wertvoller als Verzeichnisse, deshalb Priorität 2.
- **Ergänzungen aus dem Gap-Rohsatz:** Neben den Domains aus dem Befund wurden themennahe Fachmedien, Kammern und Vergleichsseiten aufgenommen, z. B. elektro.net, haustec.de, bvbs.de und handwerker-expertencheck.de. Die Filterregel steht in LINKPLAN.md §2.
- **Zwei Vergleichsbasen für Positionen:** Der Befund nennt 1 Keyword in den Top 100 (Data API, Domain-Übersicht). Zusätzlich dient die Projekt-Erstmessung vom 20.10.2026 als quellengleiche Basis. Bestehende, geplante und Zusatz-Keywords werden getrennt gezählt.
- **Ablauf von `--apply`:** Zuerst werden die Zielseiten angeglichen (das verbraucht kein Keyword-Kontingent). Danach werden die fehlenden Keywords hinzugefügt, bestehende vor geplanten und geplante nach Phase aufsteigend. Zum Schluss liest das Skript das Projekt erneut, um Teilübernahmen zu erkennen.
- **Rohdateien erst nach vollständigem Abruf:** `seo-report.mjs` schreibt die Rohdateien erst, wenn alle Aufrufe erfolgreich waren, und mit `flag: "wx"`. So hinterlässt ein Fehlerlauf keine Teilstände, die den Überschreibschutz für die Etappe auslösen würden.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Bug] Antwortformat von PROJECT_listPrompts**
- **Gefunden bei:** Task 2, erster `--check` (0 KI-Prompts gelesen)
- **Problem:** Die Prompts stehen unter `items` statt `data`, der Text im Feld `prompt`.
- **Fix:** Der Zeilenleser unterstützt jetzt `items`; Prompt-Text und Gruppe werden übernommen.
- **Dateien:** craftos/scripts/se-ranking-sync.mjs
- **Commit:** e0977be

**2. [Orchestrator-Vorgabe] E-Mail-Entwürfe nicht neu formuliert**
- **Gefunden bei:** Task 1
- **Problem:** Der Plan verlangt kurze E-Mail-Entwürfe in `inhaberAktion`. Laut Vorgabe gibt es aber bereits fertige Mailtexte beim Browser-Agenten des Inhabers, die nicht neu erfunden werden sollen.
- **Fix:** `inhaberAktion` und LINKPLAN §4 nennen Empfänger, Absender support@craftos.eu und einen Betreffvorschlag (gekennzeichnet für den Fall, dass der vorliegende Text keinen Betreff nennt) und verweisen auf den vorliegenden Text. Der Test prüft die Empfängeradressen.
- **Commit:** 1bb70f6

**3. [Rule 1 – Ungenaue Beschriftung] Zusatz-Keywords im Messbericht**
- **Gefunden bei:** Task 3, Sichtprüfung des Berichts
- **Problem:** Die Zeile „Zusatz-Keywords (Marke, nicht in der Map)“ war ungenau, weil darunter auch Nicht-Marken-Begriffe wie „lagerverwaltung handwerk“ fallen.
- **Fix:** Die Beschriftung lautet jetzt „Zusatz-Keywords (nicht in der Map, u. a. Marke)“, im Skript und gleichlautend im bereits erzeugten Bericht. Werte und Rohdaten sind unverändert.
- **Commit:** 431240c

**4. [Ergänzung] Zusätzliche Testfälle**
- Der Test prüft zusätzlich die identische Wettbewerberliste beim DR-Abgleich, die Kontaktadresse support@craftos.eu in jedem Prompt und einen siebten Fall für LINKPLAN.md (Übergabe, Kaufverbot, Disavow, 15, Messaufruf).

Insgesamt: 2 automatische Korrekturen (Rule 1), 1 Vorgabe des Orchestrators und 1 Testergänzung. Auswirkung auf den Umfang: keine.

## Anforderungsstatus

- **SEO-07: erledigt.** limits[] ist im letzten Projektabgleich leer, alle 126 Hauptkeywords der Keyword-Map werden mit Zielseite getrackt, dazu 5 Wettbewerber und AI Result Tracker. Das Messbericht-Skript vergleicht je Etappe mit dem Ausgangsstand vom 20.10.2026. Plan 05-08 übernimmt „erledigt“ in den Rollout-Nachweis.
- **SEO-08: begonnen, in REQUIREMENTS.md bewusst nicht abgehakt.** Linkliste, Statusregister, Browser-Prompts und Übergabe 1 liegen vor. Die Anforderung umfasst aber das Meilensteinziel „mindestens 15 neue seriöse verweisende Domains, sichtbar in SE Ranking“, und der aktuelle Stand ist 0 neue Domains. Plan 05-08 legt den Phasenstatus fest; laut 05-08-PLAN gilt SEO-08 dort als Phase-5-Lieferung erledigt. Das Meilensteinziel wird ab Etappe `rollout-phase05` mit `seo-report.mjs` verfolgt.

## Offene Inhaberaktionen

1. **ProvenExpert:** Konto mit support@craftos.eu anlegen (FREE-Plan, keine Zahlungsdaten), danach den Prompt aus LINKPLAN §4 ausführen lassen.
2. **G2-Verkäuferportal (my.G2, https://www.g2.com/seller_login):** Konto anlegen; deckt Capterra, GetApp und Software Advice ab. Danach den Prompt ausführen lassen.
3. **E-Mail an info@softwareabc24.de** von support@craftos.eu mit dem beim Browser-Agenten vorliegenden Text senden.
4. **E-Mail an redaktion@betriebssoftware-kompass.de** von support@craftos.eu mit dem vorliegenden Text senden.
5. **OMR Reviews:** Rückmeldung abwarten und dabei die Kategorie „Handwerkersoftware“ nennen; ohne Antwort bis 03.11.2026 mit dem Prompt nachfassen.
6. **kennstdueinen.de und SoftwareWorld:** Prompts aus LINKPLAN §4 ausführen lassen.
7. **AI Result Tracker:** Entscheiden, ob die zehn automatisch erzeugten, themenfremden ChatGPT-Prompts (Gruppe 94132) ersetzt werden sollen. Sie verzerren die ChatGPT-Auswertung im Projekt. Der Agent hat sie wegen der Löschregel nicht entfernt.
8. **Statuspflege:** Rückmeldungen des Browser-Agenten in `backlink-register.json` eintragen (Status, Notiz mit Profil-URL, aktualisiert), danach `npx vitest run tests/backlink-plan.test.ts` ausführen.

## Bekannte Platzhalter

Keine. Die Betreffzeilen der beiden E-Mails sind ausdrücklich als „Vorschlag“ gekennzeichnet, weil der vorliegende Mailtext beim Browser-Agenten liegt. Positionen „noch nicht gemessen“ sind echte Messlücken neuer Keywords, keine Platzhalter.

## Threat Flags

Keine neue Angriffsfläche über das Bedrohungsmodell hinaus. T-05-20 (Schlüssel nur aus ENV_FILE, Entfernung aus Fehlertexten, check-no-secrets OK), T-05-21 (kein Lösch-Tool, nur Hinzufügen und Angleichen) und T-05-24 (1,6 s Abstand, Backoff) sind umgesetzt. T-05-22 und T-05-23 sichern die Tests 3 und 4 sowie die Faktenquelle llms.txt/Impressum ab.

## Next Phase Readiness

- Plan 05-08 ruft nach dem Rollout `node scripts/seo-report.mjs --etappe rollout-phase05` auf und übernimmt SEO-07 als erledigt.
- Nach Änderungen an der Keyword-Map in den Phasen 6–9 zuerst `node scripts/se-ranking-sync.mjs --check` und bei Abweichungen `--apply` ausführen.

## Self-Check: PASSED

- Dateien vorhanden: backlink-plan.test.ts, backlink-register.json, LINKPLAN.md, se-ranking-mcp.mjs, se-ranking-sync.mjs, seo-report.mjs, 2026-10-21-projektabgleich(.json/-apply.json), 2026-10-21-messbericht-ausgangsstand.md, 6 Rohdateien.
- Commits vorhanden: f5189eb, 1bb70f6, e0977be, 431240c.
