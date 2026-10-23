# Etappennachweis Meilenstein v2.0 – Etappen 05 bis 09

Stand: 23.10.2026 (Plan 10-11, Paket e). Zweck: Sammelnachweis für QA-05 („jede Etappe ist ausgerollt und nachgewiesen“, D-30). Zeile 10 trägt der Rollout-Plan 10-07 nach.

**Quellenregel:** Jede Zelle stammt ausschließlich aus dem Rollout-Nachweis der Etappe (`craftos/docs/releases/PHASE-05-ROLLOUT.md` bis `PHASE-09-ROLLOUT.md`, §§ 1–9) oder, nur in der Spalte „trial_click/ai_visit“, aus der Analytics-Abfrage dieses Plans (`docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json`). Fehlt eine Angabe im Nachweis, steht in der Zelle „nicht dokumentiert in PHASE-0x-ROLLOUT.md“; nichts ist rekonstruiert oder geschätzt. Zeiten in MESZ, wie in den Nachweisen.

## Etappentabelle

| Etappe | Code-Commit | Push-Zeit | Ship-Gate | gh workflow list --all | Vercel-Deployment | IndexNow | live-check | Etappenbericht | trial_click/ai_visit | Beleg |
|---|---|---|---|---|---|---|---|---|---|---|
| 05 | `0480e06` (`782d947..0480e06`, 50 Commits) | nicht dokumentiert in PHASE-05-ROLLOUT.md (Deployment erstellt 21.10.2026 01:43:47 MESZ) | grün: Vitest 249/249, Lint 0, Typcheck, Build, E2E 220 bestanden / 0 fehlgeschlagen / 28 übersprungen, route-audit Exit 0, check-no-secrets OK | nur „Dependabot Updates active“, kein `.github/workflows`, kein CI-Lauf (Zeitpunkt nicht dokumentiert in PHASE-05-ROLLOUT.md) | `dpl_3aQdr36jCqzeWzRVQABWnQFxbW49` READY (Build 28 s) | 125 URLs gemeldet, HTTP 200 | 10/10 OK | `docs/seo/reports/2026-10-21-messbericht-rollout-phase05.md` | 24-h-Fenster ab Deployment: trial_click 2, ai_visit 0 (Abfragezeitpunkt 23.10.2026 13:36 MESZ, Plan 10-11); im Nachweis nur Verdrahtung, Zählung als Inhaberaktion | PHASE-05-ROLLOUT.md § 1, § 2, § 3, § 4, § 5, § 6, § 7, § 8 |
| 06 | `33dea41` (`6587768..33dea41`, 55 Commits) | 21.10.2026 16:55:55 MESZ | grün: Vitest 330/330, Lint 0, Typcheck, Build, E2E 258 / 0 / 50, route-audit Exit 0, live-check lokal 17/17, check-no-secrets OK | vor dem Push nur „Dependabot Updates active“, kein `.github`, kein CI-Lauf | `dpl_GmDkQJyqGHfhYnHjutYXibqCyxFq` READY (Build 34 s, erstellt 17:10:17 MESZ; Start rund 14 Min. nach dem Push wegen GitHub-Webhook-Störung) | 125 URLs gemeldet, HTTP 200 | 17/17 OK | `docs/seo/reports/2026-10-21-messbericht-rollout-phase06.md` | 24-h-Fenster ab Push: trial_click 1, ai_visit 0 (Abfragezeitpunkt 23.10.2026 13:36 MESZ, Plan 10-11); im Nachweis nur Verdrahtung, Zählung als Inhaberaktion | PHASE-06-ROLLOUT.md § 1, § 2, § 3, § 4, § 5, § 6, § 7, § 8 |
| 07 | `126f807` (`3eb5736..126f807`) | 22.10.2026 14:05:33 MESZ | grün: Vitest 483/483, Lint 0, Typcheck, Build (139 statische Seiten), E2E 293 / 0 / 75, route-audit Exit 0, live-check lokal 46/46, check-no-secrets OK | 22.10.2026 14:05:25 MESZ: nur „Dependabot Updates active“, kein `.github`, kein CI-Lauf | `dpl_5xujdhv6bnYnxsHhzNpQUNHPdFyQ` READY (Build 26 s, erstellt 14:05:39 MESZ) | 131 URLs gemeldet, HTTP 200 | 46 Prüfungen, alle OK | `docs/seo/reports/2026-10-22-messbericht-rollout-phase07.md` | 24-h-Fenster ab Push (zu rund 98 % verstrichen): trial_click 4, ai_visit 0 (Abfragezeitpunkt 23.10.2026 13:36 MESZ, Plan 10-11) | PHASE-07-ROLLOUT.md § 1, § 2, § 3, § 4, § 5, § 6, § 8, § 9 |
| 08 | `f029bc6` (`f22ee78..f029bc6`) | 23.10.2026 01:10:42 MESZ | grün: Vitest 863/863, Lint 0, Typcheck, Build, E2E 424 Fälle: 333 / 0 / 91, route-audit Exit 0, live-check lokal 62/62, check-no-secrets OK | 23.10.2026 01:10:37 MESZ: nur „Dependabot Updates active“, kein `.github`, kein CI-Lauf | `dpl_2avyo678E2VrDE9GTFMc3WL9yTS6` READY (Build 50 s, erstellt 01:10:55 MESZ) | 136 URLs gemeldet, HTTP 200 | 62 Prüfungen, alle OK | `docs/seo/reports/2026-10-23-messbericht-rollout-phase08.md` | Teilfenster ab Push (zu rund 53 % verstrichen): trial_click 1, ai_visit 0 (Abfragezeitpunkt 23.10.2026 13:36 MESZ, Plan 10-11); Endwert als Nachtrag | PHASE-08-ROLLOUT.md § 1, § 2, § 3, § 4, § 5, § 6, § 8, § 9 |
| 09 | `25bad34` (`d778c31..25bad34`, Fast-Forward) | 23.10.2026 09:25:21 MESZ | grün: Vitest 1347/1347, Lint 0, Typcheck, Build, E2E 488 Fälle: 393 / 0 / 95, 0 flaky, route-audit Exit 0 (156 Routen, 0 defekte Links), live-check lokal 69/69, check-no-secrets OK | 23.10.2026 09:08:47 und 09:25:14 MESZ, beide gleich: nur „Dependabot Updates active“, kein `.github`, kein CI-Lauf | `dpl_HxdXfEzGz7jUw8rcdQFFj2Pvvu7F` READY (Build 21 s, erstellt 09:25:32 MESZ, Commit `25bad34`) | 156 URLs gemeldet, HTTP 200 (09:36:38 MESZ) | 69 Prüfungen, alle OK (09:35:16 MESZ) | `docs/seo/reports/2026-10-23-messbericht-rollout-phase09.md` | Teilfenster ab Push (zu rund 19 % verstrichen): trial_click 1, ai_visit 0 (Abfragezeitpunkt 23.10.2026 13:36 MESZ, Plan 10-11); Endwert als Nachtrag | PHASE-09-ROLLOUT.md § 1, § 2, § 3, § 4, § 5, § 6, § 8, § 9 |

Spalte „Ship-Gate“: E2E-Angaben als bestanden / fehlgeschlagen / übersprungen (übersprungen sind projektgebundene Skips laut Nachweis). „live-check“ ist der Lauf gegen https://craftos.eu nach dem Deployment (§ 6); der lokale Lauf vor dem Push steht in der Spalte „Ship-Gate“. Jede Etappe hatte genau einen Code-Push; Deployment-Status READY und die Aliase https://craftos.eu und https://www.craftos.eu stehen jeweils in § 4.

## Analytics-Kontrolle

**Abfrage:** Vercel Web Analytics Custom Events (`vercel.analytics.event.count`, Aggregation `count`, gruppiert nach `eventName`) über die Vercel-CLI 65.2.0, Team `craft-os`, Projekt `craftos`, Umgebung Production. Abfragezeitpunkt 23.10.2026, 11:36:22 UTC (13:36 MESZ). Rohdaten mit Abfrage, Fenstern und Ergebnissen: `docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json`.

**Fenster:** je Etappe 24 Stunden ab Push-Zeit aus § 4 des Nachweises (Etappe 05: ab Erstellung des Deployments, weil die Push-Zeit nicht dokumentiert ist). Die API liefert für solche Fenster Stundenwerte; gezählt sind die Stunden ab der vollen Stunde des Pushs. Die Fenster 07, 08 und 09 überlappen sich, die Zahlen sind deshalb nicht addierbar.

| Etappe | Fenster (UTC) | Stand bei der Abfrage | trial_click | login_click | store_click | ai_visit |
|---|---|---|---|---|---|---|
| 05 | 20.10. 23:00 – 21.10. 23:00 | vollständig | 2 | 2 | 1 | 0 |
| 06 | 21.10. 14:00 – 22.10. 14:00 | vollständig | 1 | 1 | 1 | 0 |
| 07 | 22.10. 12:00 – 23.10. 12:00 | rund 98 % | 4 | 2 | 1 | 0 |
| 08 | 22.10. 23:00 – 23.10. 23:00 | rund 53 % | 1 | 2 | 0 | 0 |
| 09 | 23.10. 07:00 – 24.10. 07:00 | rund 19 % | 1 | 2 | 0 | 0 |

**Sammelabfrage 15.–24.10.2026** (gleicher Abfragezeitpunkt): `registration_click` 11 (Altereignis vor der Aufteilung), `login_click` 7, `trial_click` 6, `store_click` 4, `calculator_use` 1, `ai_visit` 0. Die frühere Sammelabfrage über das Vercel-MCP (`docs/seo/data/2026-10-23-vercel-events-phase10.json`, abgerufen 23.10.2026) zählte `trial_click` 5 (3 Besucher) und `login_click` 6; die Differenz sind spätere Ereignisse. Eine gezielte Abfrage nur auf `eventName:ai_visit` für denselben Zeitraum (11:37:40 UTC) ergab 0.

**Befund `ai_visit` = 0 mit Verdrahtungsprüfung (23.10.2026, 11:38 UTC):**

- Code: `components/Analytics.tsx` sendet `track("ai_visit", { source })` einmal je Sitzung, wenn `detectAiSource` aus `lib/tracking.ts` am Referrer (chatgpt.com, chat.openai.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai) oder an `utm_source` eine KI-Quelle erkennt. `trial_click` und `login_click` entstehen über `classifyAppLink` bei Klicks auf app.craftos.eu.
- Live: https://craftos.eu/ antwortet mit HTTP 200 und enthält 3 Links mit `data-track="trial"` und 1 Link mit `data-track="login"`. https://craftos.eu/_vercel/insights/script.js antwortet mit HTTP 200 (`application/javascript`); die Komponente aus `@vercel/analytics/next` bindet das Skript clientseitig ein, deshalb steht es nicht im ausgelieferten HTML.
- Ereignisse kommen an: `trial_click`, `login_click`, `store_click` und `calculator_use` werden in Production gezählt.
- Ursache der Null: Von 294 Seitenaufrufen im Zeitraum kam keiner von einem KI-Referrer (Herkunft: ohne Referrer 245, google.com 36, l.instagram.com 5, l.facebook.com 2, vercel.com 2, bing.com, ecosia.org, facebook.com und google.de je 1), und keiner trug `utm_source`. Die Auslösebedingung trat also nicht ein; die Verdrahtung ist vorhanden und funktionsfähig. `ai_visit` = 0 ist ein Befund zur Reichweite in KI-Suchen, kein Messfehler.

## Lücken

| Etappe | Spalte | Eintrag | Ursache |
|---|---|---|---|
| 05 | Push-Zeit | nicht dokumentiert in PHASE-05-ROLLOUT.md | § 4 nennt nur den Push-Bereich `782d947..0480e06` und die Erstellungszeit des Deployments; das Analytics-Fenster beginnt deshalb bei der Deployment-Erstellung. |
| 05 | gh workflow list --all | Zeitpunkt nicht dokumentiert in PHASE-05-ROLLOUT.md | § 3 gibt die Ausgabe ohne Uhrzeit wieder; der Inhalt (nur Dependabot, kein CI) ist dokumentiert. |
| 05–09 | trial_click/ai_visit | Zahlen stammen aus Plan 10-11, nicht aus dem Nachweis | Die Nachweise § 7 bzw. § 8 belegen nur die Verdrahtung; die Zählung war jeweils eine Inhaberaktion, weil Vercel-CLI 50.1.3 und das Vercel-MCP in jenen Ausführungen keine Abfrage boten. |
| 08, 09 | trial_click/ai_visit | Teilfenster | Die 24-Stunden-Fenster waren bei der Abfrage noch nicht abgelaufen; Endwerte folgen als Nachtrag. |

## Nachtrag Etappe 10

Zeile 10 trägt 10-07 nach (Quelle `PHASE-10-ROLLOUT.md`). Das 24-Stunden-Fenster Phase 10 sowie die Endwerte der Fenster 08 und 09 folgen als Nachtrag des Orchestrators, mit derselben Abfrage wie in `docs/seo/data/2026-10-23-vercel-events-etappen-phase10.json`.
