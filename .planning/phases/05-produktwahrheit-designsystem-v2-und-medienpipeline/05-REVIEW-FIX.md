---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
fixed_at: 2026-10-21T01:45:00+02:00
review_path: .planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-REVIEW.md
iteration: 1
findings_in_scope: 22
fixed: 15
skipped: 7
status: partial
---

# Phase 05: Bericht zur Behebung der Review-Befunde

**Behoben am:** 21.10.2026
**Quelle:** `.planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-REVIEW.md`
**Durchlauf:** 1

**Zusammenfassung:**
- Befunde im Umfang: 22 (High und Medium vollständig, Low nur bei kleinem, risikoarmem und eindeutigem Fix)
- Behoben: 15 (alle 3 High, alle 6 Medium, 6 Low, davon LO-08 und LO-09 teilweise)
- Zurückgestellt: 7 Low (Begründung unten)

**Prüfungen (lokal, `craftos/`):** `npx vitest run` 21 Dateien und 248 Tests grün, 0 rot; `npm run typecheck` und `npm run lint` ohne Befund; ein `npm run build` erfolgreich (133 Seiten, `/preise`, `/gewerke` und `/fakten-ueber-craftos` statisch). Im Build geprüft: Auf `/gewerke` steht „Darstellung, KI-gestaltet“. `/preise` enthält im Fließtext, im FAQ und im FAQPage-JSON-LD „entspricht 1,50 €; 1 Credit = 0,01 €“. In `llms.txt` steht „150 Credits Startguthaben (entspricht 1,50 €; 1 Credit = 0,01 €)“. `node scripts/check-no-secrets.mjs docs/seo scripts` meldet „OK: Schlüssel in keiner Datei“.

**SE Ranking:** Es gab keine schreibenden Aufrufe. Alle neuen Pfade sind mit gemocktem `fetch` bzw. einem gemockten Client getestet. Lesend wurde zweimal auf das Projekt zugegriffen, jeweils mit `tools/list` (kostenlos) und einem `PROJECT_listKeywords`: einmal für Tool-Schemata und die MD-03-Folgeprüfung, einmal zur Prüfung des geänderten Clients mit strikter ID-Zuordnung.

## MD-03-Folgeprüfung: Hat der bisherige `--apply`-Lauf Schreibweisen verändert?

**Ergebnis: Nein, eine Veränderung ist nicht erkennbar. Zurückgeschrieben wurde nichts.**

- Bei der Live-Lesung (`PROJECT_listKeywords`, Projekt 13094375) wurden 151 Keywords gezählt. Alle sind kleingeschrieben, und kein Name hat führende oder abschließende Leerzeichen.
- Die 8 Keywords, deren Zielseite der Lauf vom 21.10. angeglichen hat (bautagebuch app, beste handwerkersoftware, baustellen app, gaeb software, mahnwesen software, plancraft alternative, craftnote alternative, hero software alternative), tragen dieselben IDs wie vor dem Lauf (22299151 … 22299229). Ihre Positionshistorie beginnt laut `2026-10-21-raw-ausgangsstand-positionen.json` am 20.10.2026. Die Historie ist damit erhalten.
- Die Quelle, aus der die Keywords angelegt wurden, schreibt sie bereits klein. Gemeint sind `docs/seo/data/2026-10-20-keywords-seeds.json` und die Keyword-Map: Alle 126 Hauptkeywords sind dort kleingeschrieben. Der damalige Lauf hat also kleingeschriebene Namen erneut als kleingeschriebene Namen gesendet.
- Ein ausdrücklicher Vorher-Abzug der Namen aus dem Projekt liegt nicht vor. Die Aussage stützt sich daher auf die unveränderten IDs, die erhaltene Historie und die kleingeschriebene Quelle.

## Behobene Befunde

### HI-01: `se-ranking-sync.mjs` überschreibt das einzige Änderungsprotokoll des externen Projekts am selben Tag

**Dateien:** `craftos/scripts/se-ranking-sync.mjs`, `craftos/scripts/lib/se-ranking-sync-core.mjs` (neu), `craftos/tests/se-ranking-sync.test.ts` (neu)
**Commit:** 445c7bb
**Umsetzung:** `writeJsonUnique()` schreibt mit `flag: "wx"`. Gibt es die Datei schon, wird hochgezählt: `<Datum>-projektabgleich[-apply].json`, dann `-2`, `-3` usw. `latestApplyFile()` sortiert nach Datum und danach numerisch nach Laufnummer. Die Abgleichslogik liegt jetzt in `scripts/lib/se-ranking-sync-core.mjs` ohne CLI-Seiteneffekte. Das CLI-Skript ist nur noch eine dünne Hülle. Tests: Zwei `--apply`-Läufe am selben Tag ergeben zwei Dateien, und die erste behält ihre vorher-URLs. Auch zwei `--check`-Läufe überschreiben nichts.

### HI-02: `--apply` bricht nach Teiländerungen ohne jedes Protokoll ab

**Dateien:** `craftos/scripts/lib/se-ranking-sync-core.mjs`, `craftos/tests/se-ranking-sync.test.ts`
**Commit:** 50e539f
**Umsetzung:** Das apply-Protokoll wird vor der ersten Mutation angelegt. Nach jeder Änderung wird es atomar fortgeschrieben (Temp-Datei und `rename`). Ein Fehler, der kein Limit ist, stoppt den Lauf. Danach wird der Projektstand neu gelesen, und das Protokoll erhält `status: "abgebrochen"`, `abgebrochen`, `fehlgeschlagen[]` und `verifikation`. Pakete, die an `PROJECT_addKeywords` gesendet wurden, stehen bis zur Bestätigung unter `unbestaetigt[]`. Hat der Server ein Paket trotz Timeout übernommen, erkennt das Neulesen es als `hinzugefuegt`. Ist der Stand nicht lesbar, wird `status: "unvollstaendig"` gesetzt. Der Exit-Code ist dann 1.

### HI-03: Stille Fehlschläge werden als „Projektlimit“ verbucht, `--check` meldet danach grün

**Dateien:** `craftos/scripts/lib/se-ranking-sync-core.mjs`, `craftos/scripts/lib/se-ranking-mcp.mjs`, `craftos/scripts/se-ranking-sync.mjs`, `craftos/tests/se-ranking-sync.test.ts`
**Commit:** 5bdece4
**Umsetzung:** `isLimitError` gilt nur bei HTTP 402 oder bei einem eindeutigen Kontingenttext (z. B. „keyword limit reached“, „exceeded the … limit“, „not enough units“). Ein nacktes 403 zählt nicht mehr als Limit, ebenso wenig Validierungsfehler wie „parameter 'limit' must be …“ oder „keyword length exceeds …“. Einträge, die nach `--apply` ohne Limit-Antwort offen bleiben, landen unter `fehlgeschlagen[]` (Exit 1) und nicht mehr unter `limits[]`. Echte Limits tragen `grund: "limit"`. `--check` nimmt nur solche Einträge aus und nur aus apply-Dateien, die höchstens 30 Tage alt sind (`LIMIT_MAX_AGE_DAYS`). Ältere Limits werden mit `limitsHinweis` gemeldet. Der MCP-Client liest den HTTP-Status eines Tool-Fehlers nur noch an eindeutigen Stellen (`errorStatus`: Statusfeld, „HTTP 403“, „status: 403“, „403 …“ am Textanfang), nicht mehr aus der ersten Zahl im Text.

### MD-01: MCP-Client ohne Backoff bei 5xx, Netzwerkfehler und Timeout; `Retry-After` wird ignoriert

**Dateien:** `craftos/scripts/lib/se-ranking-mcp.mjs`, `craftos/tests/se-ranking-mcp.test.ts` (neu)
**Commit:** 9e54cec
**Umsetzung:** Lesende und idempotente Tools werden bei diesen Fehlern wiederholt: 429, 500/502/503/504, JSON-RPC-Code 50000, Tool-Fehler mit 5xx, Netzwerkfehler und Timeout. Lesend sind `DATA_*`, `PROJECT_list*` und `PROJECT_get*`; idempotent ist laut Tool-Annotation außerdem `PROJECT_updateKeyword`. Die Wartezeiten sind 1, 2, 4 und 8 s plus bis zu 250 ms Jitter. `Retry-After` (Sekunden oder HTTP-Datum) hat Vorrang. Liegt der Wert über 60 s, bricht der Client ab, statt zu warten. Nicht idempotente Mutationen wie `PROJECT_addKeywords` werden nur bei 429 wiederholt. Sonst tragen sie `ambiguous: true` und den Hinweis „Ergebnis unklar … Projektstand neu lesen“, und `apply()` verifiziert den Stand (HI-02). Für Tests lassen sich `apiKey`, `fetch`, `sleep`, `random` und `pauseMs` injizieren.

### MD-02: `keyword-research.mjs` gibt API-Fehlerkörper ungefiltert aus

**Dateien:** `craftos/scripts/lib/se-ranking-mcp.mjs`, `craftos/scripts/keyword-research.mjs`, `craftos/tests/se-ranking-mcp.test.ts`
**Commit:** d6f3c7e
**Umsetzung:** `redact` wird exportiert. `keyword-research.mjs` gibt jeden Fehlerkörper über `errorText(body)` aus, das heißt erst bereinigen, dann kürzen, damit kein angeschnittener Schlüsselrest übrig bleibt. Das gilt auch für den Kontingentabruf. `fetch` liegt in `try/catch`. Netzwerkfehler und Timeouts werden bereinigt als Status 0 gemeldet und zählen als FEHLER, ein Stacktrace entsteht nicht.

### MD-03: `PROJECT_updateKeyword` benennt Projekt-Keywords in Kleinschreibung um

**Dateien:** `craftos/scripts/lib/se-ranking-sync-core.mjs`, `craftos/scripts/se-ranking-sync.mjs`, `craftos/tests/se-ranking-sync.test.ts`
**Commit:** 3b7c14f
**Umsetzung:** `readProject` führt neben dem normalisierten Vergleichswert auch den Originalnamen mit. `PROJECT_updateKeyword` erhält den Keyword-Text unverändert in Original-Schreibweise. Laut Tool-Schema ist er beim Ändern von `target_url` Pflicht, sonst antwortet der Server mit HTTP 400 „empty_field“. Zielseiten bestehender Projekt-Keywords werden nur noch mit `--apply --retarget` geändert. Ohne den Schalter stehen Abweichungen unter `zielseiteNichtAngeglichen[]` und gelten nicht als Fehlschlag. Nach dem Angleichen wird die Schreibweise je ID verglichen. Weicht sie ab, wird sie unter `schreibweiseGeaendert[]` mit Warnung geführt. Ergebnis der Folgeprüfung: siehe oben.

### MD-04: Unerwartete API-Antworten werden als „leeres Projekt“ gelesen (fail-open)

**Dateien:** `craftos/scripts/lib/se-ranking-mcp.mjs`, `craftos/scripts/lib/se-ranking-sync-core.mjs`, `craftos/scripts/seo-report.mjs`, `craftos/tests/se-ranking-sync.test.ts`
**Commit:** adbe29a
**Umsetzung:** `rowsOf(r, label)` akzeptiert ein Array, `{ data }` oder `{ items }`. Jede andere Antwortform führt zum Abbruch. `readProject` bricht ab, wenn das Projekt leer ist, wenn ein Eintrag keine gültige id oder keinen Namen hat und wenn IDs doppelt vorkommen. In allen Fällen passiert das, bevor `apply` irgendetwas ändert oder eine Datei schreibt. `PROJECT_listKeywords` hat laut Tool-Schema keine Paginierung (live 151 von 151 Einträgen). KI-Prompts werden per `limit`/`offset` vollständig gelesen statt bei 100 abgeschnitten. `seo-report.mjs` prüft alle Listenantworten, bevor es die Rohdateien schreibt, und bricht ohne gültige `site_engine_id` vor dem Positionsabruf ab. Die vorhandenen Rohdateien vom 21.10. bestehen die strikte Prüfung.

### MD-05: Credit-Einheit auf /preise, in llms.txt und auf der Musterseite missverständlich

**Dateien:** `craftos/scripts/sync-product-snapshot.mjs`, `craftos/docs/product-pricing-snapshot.json`, `craftos/lib/site.ts`, `craftos/app/preise/page.tsx`, `craftos/lib/llms.ts`, `craftos/lib/styleguide-content.ts`, `craftos/tests/pricing-parity.test.ts`
**Commit:** e1dbc9c
**Belege (Web-App `origin/release`, Commit 07cf0645, Tag v4.0.0-test.238):** In `src/lib/constants.ts` steht `FREE_AI_CREDIT: 1.50` mit dem Kommentar „= ADMIN_FREE_CREDITS Credits, 1 Credit = 0,01 €“ sowie `ADMIN_FREE_CREDITS: 150`. `src/hooks/useAiCredits.ts` nennt „1 Credit = €0.01 (1 Eurocent)“, `src/lib/ai/creditCostDisplay.ts` „1 Credit = 1 Cent“.
**Umsetzung:** `sync-product-snapshot.mjs` liest zusätzlich `FREE_AI_CREDIT` und leitet `creditValueEur = FREE_AI_CREDIT / ADMIN_FREE_CREDITS = 0,01` ab. Der Snapshot wurde lokal neu erzeugt (`npm run sync:product`, gleicher Commit). `site.ts` stellt `creditWertEuro` und `creditUmrechnung` bereit („entspricht 1,50 €; 1 Credit = 0,01 €“). Verwendet wird das an diesen Stellen:
- `/preise`: im Fließtext „… für Craft AI und KI-Belegscans (entspricht 1,50 €; 1 Credit = 0,01 €).“ und in der FAQ-Antwort, die zugleich die Quelle des FAQPage-JSON-LD ist
- `llms.txt`
- Musterseite
Der Paritätstest prüft die Einheit gegen den Snapshot und die Verwendung auf allen drei Wegen. Paketangaben in Credits wurden bewusst nicht ergänzt. Die Pakete stammen in der Web-App aus der Datenbanktabelle `credit_packages`, und deren Credit-Mengen sind im Repo nicht belegt.

### MD-06: /gewerke zeigt weiterhin ein KI-generiertes Foto ohne Kennzeichnung

**Dateien:** `craftos/app/gewerke/page.tsx`, `craftos/tests/media-ki-label.test.ts` (neu)
**Commit:** c412a47
**Umsetzung:** `werkstatt-2026-1600.webp` wird jetzt über den v2-Baustein `MediaFigure` mit `label="ki"` ausgegeben. Darunter steht sichtbar „Darstellung, KI-gestaltet“. Bild, Alt-Text, Maße und `sizes` bleiben gleich, die Ecken sind wie bisher auf 16 px gerundet. Ein neuer Test liest die in `docs/MEDIA.md` als „neu generiert“ geführten Motive (werkstatt-2026, team-baustelle-2026). Jede Datei in `app/`, `components/`, `lib/` und `content/`, die eines davon einbindet, muss eine KI-Kennzeichnung tragen. Vor dem Fix war der Test rot, danach ist er grün.

### LO-01: Hart codierte „10 Testtage“ entgeht dem Testphasen-Paritätstest

**Dateien:** `craftos/app/fakten-ueber-craftos/page.tsx`, `craftos/tests/pricing-parity.test.ts`
**Commit:** e2f2944
**Umsetzung:** Die Meta-Description nutzt jetzt `${site.trialDays} Testtage`. Beide Testphasen-Regexe erkennen außerdem Komposita wie „Testtage“.

### LO-02: `UnitPriceSpecification` ohne Einheit und Abrechnungszeitraum

**Dateien:** `craftos/lib/schema.ts`, `craftos/tests/pricing-parity.test.ts`
**Commit:** 8015e1a
**Umsetzung:** `referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" }` und `unitText: "pro Person und Monat"` sind ergänzt. Der Paritätstest prüft beides.

### LO-04: `CtaBand` verwendet eine feste ID

**Dateien:** `craftos/components/v2/CtaBand.tsx`, `craftos/tests/design-v2-components.test.ts`
**Commit:** 2f7968a
**Umsetzung:** Die Titel-ID entsteht je Instanz per `useId()`. Ein Test mit zwei Instanzen prüft, dass die IDs eindeutig sind und `aria-labelledby` jeweils auf den richtigen Titel zeigt.

### LO-08: Tests mit leerem Durchlauf bzw. abhängig von externem Repo-Stand (teilweise)

**Dateien:** `craftos/tests/announcements.test.ts`, `craftos/tests/backlink-plan.test.ts`
**Commit:** 82fee7e
**Umsetzung:** Der Telefonempfang-Test verlangt die Zeile jetzt per `expect(row).toBeDefined()`. Fehlt `backlink-register.json`, scheitert der Linkplan-Test, statt mit `[]` zu prüfen.
**Nicht umgesetzt:** Den Aktualitätstest des Snapshots hinter ein Env-Flag zu legen, ändert den bewusst lokalen Prüfablauf (Produktwahrheit gegen `origin/release`). Das ist eine Entscheidung für den Inhaber und keine eindeutige Korrektur.

### LO-09: `MiniWeek` ohne Grenzprüfung; Szenenbeschreibung passt nicht zu den Daten (teilweise)

**Dateien:** `craftos/components/v2/mini/MiniUi.tsx`, `craftos/tests/design-v2-frames.test.ts`
**Commit:** 7ef4f67
**Umsetzung:** Ist `day + span` größer als 5, wirft `MiniWeek` den Fehler „ragt über Freitag hinaus“. Der Test ist ergänzt.
**Nicht umgesetzt:** Die Beschreibung „drei Baustellen“ bleibt. Die Szene zeigt drei Baustellen (Bad Bergmann, Bäckerei Krause, Dach Schulte) und zusätzlich einen Aufmaßtermin (Aufmaß Weber). Die Aussage ist also vertretbar, und die Vorgabe lautet, Fließtext nicht umzuschreiben.

### LO-12: `parseRpc` nimmt bei ID-Abweichung irgendeine Antwort

**Dateien:** `craftos/scripts/lib/se-ranking-mcp.mjs`, `craftos/tests/se-ranking-mcp.test.ts`
**Commit:** 4b87432
**Umsetzung:** Übernommen wird nur noch die Nachricht mit der eigenen `id` und `result`/`error`. Fortschrittsmeldungen und Antworten mit fremder ID werden ignoriert. Passt keine Antwort, gibt es einen `McpError` „Keine Antwort mit passender ID“. Eine lesende Prüfung gegen den echten Server war erfolgreich: `tools/list` lieferte 236 Tools, `PROJECT_listKeywords` 151 Keywords.

## Zurückgestellte Befunde

### LO-03: `h3` innerhalb von `summary` wird nicht überall als Überschrift erkannt

**Datei:** `craftos/components/v2/FaqList.tsx:37-38`
**Grund:** Kein kleiner, eindeutiger Fix. Es gibt zwei Wege: einen Umbau zu `<h3><button aria-expanded>` als Client-Komponente oder eine Dokumentation im UI-SPEC. Beides ist eine Design- und A11y-Entscheidung, und die Darstellung müsste zusätzlich mit Screenreadern geprüft werden.
**Ursprünglicher Befund:** Die Überschriftensemantik geht in `summary` bei manchen Browser-Screenreader-Kombinationen verloren.

### LO-05: `data-evidence` veröffentlicht interne Quellpfade der Produkt-Repos

**Datei:** `craftos/components/v2/BrowserFrame.tsx:60`, `PhoneFrame.tsx:90`, `DevicePair.tsx:24`, `:29`
**Grund:** Nicht risikoarm. Die E2E-Prüfung `tests/e2e/design-v2.pw.cjs:76` sucht auf dem Produktionsbuild nach `figure[data-evidence]`. Würde das Attribut in der Produktion abgeschaltet, liefe die E2E-Belegprüfung ins Leere. Das muss zusammen mit der Prüfstrategie entschieden werden, spätestens bevor die Bausteine in Phase 6–9 auf indexierte Seiten kommen. Heute betrifft es nur `/styleguide` (noindex).

### LO-06: `seo-report.mjs` schreibt Rohdateien vor der Auswertung

**Datei:** `craftos/scripts/seo-report.mjs:140`, `:142-338`
**Grund:** Der Fix braucht einen Umbau des gesamten Ablaufs: den Bericht im Speicher bauen, alles gemeinsam schreiben und einen Fehlerlauf sichern. Das ist nicht klein. Abgemildert ist das Problem durch MD-04: Alle Listenantworten werden jetzt geprüft, bevor eine Rohdatei geschrieben wird.

### LO-07: `optimize-images.mjs`: toter Budgetzweig und nicht deklarierte Abhängigkeit

**Datei:** `craftos/scripts/optimize-images.mjs:66-70`, `:11`, `:53`
**Grund:** `sharp` als `devDependency` aufzunehmen ändert `package.json` und die Lockfile (Installation, Versionswahl). Das ist kein kleiner, risikoarmer Fix. Den toten Zweig allein zu entfernen, bringt keinen Nutzen. Beides sollte gemeinsam bei der nächsten Medienarbeit erledigt werden.

### LO-10: Geheimnis-Scan mit engem Standardumfang und hart codiertem Env-Pfad

**Datei:** `craftos/scripts/check-no-secrets.mjs:8`, `:21`; `scripts/lib/se-ranking-mcp.mjs:5`; `scripts/keyword-research.mjs:11`
**Grund:** Erweitert man den Standardumfang auf ganz `craftos/` und `../.planning`, verändert sich das Verhalten bestehender Abläufe, inklusive möglicher neuer Treffer und Laufzeit. Auch der Env-Pfad betrifft die Einrichtung auf beiden Arbeitsplätzen. Das ist keine eindeutige Kleinkorrektur. Der heutige Scan (`docs/seo scripts`) ist grün.

### LO-11: React-Keys aus Inhaltstexten; doppelte Ansage der Tabellenbeschriftung

**Datei:** `craftos/components/v2/ComparisonTable.tsx:64-66`, `:81`; `FaqList.tsx:36`; `StepFlow.tsx:41`
**Grund:** Hier sind drei Bausteine betroffen, und die A11y-Änderung (`aria-labelledby` an der `caption`-ID statt `aria-label`) sollte mit einem Screenreader geprüft werden. Deshalb ist das kein eindeutiger Kleinfix.

### LO-13: „server-only“ von `product-register.ts` ist nicht erzwungen

**Datei:** `craftos/lib/product-register.ts:1`
**Grund:** Der Kern des Befunds trifft nicht zu. `import "server-only";` steht seit Commit 147ec58 in Zeile 1, und das Paket `server-only` ist in `package.json` eingetragen. Ein Import aus einer Client-Komponente bricht also schon den Build. Der zusätzlich vorgeschlagene `renderToString`-Test aller Seiten auf `notLive`-Namen ist kein kleiner Fix und wurde zurückgestellt.

---

Hinweis: Die Fixes liegen als Einzelcommits direkt auf `main` (nicht gepusht). `.planning/config.json` (uncommittete Änderung) wurde nicht angefasst. `05-REVIEW.md` ist weiterhin unversioniert.

_Behoben: 21.10.2026_
_Fixer: Claude (gsd-code-fixer)_
_Durchlauf: 1_
