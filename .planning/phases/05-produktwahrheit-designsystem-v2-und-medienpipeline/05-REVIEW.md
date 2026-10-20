---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
reviewed: 2026-10-20T23:03:37Z
depth: standard
diff_range: "git diff origin/main..main -- craftos ':!craftos/public' ':!craftos/docs'"
files_reviewed: 84
files_reviewed_list:
  - craftos/.gitignore
  - craftos/app/craft-ai/page.tsx
  - craftos/app/fakten-ueber-craftos/page.tsx
  - craftos/app/funktionen/[slug]/page.tsx
  - craftos/app/funktionen/page.tsx
  - craftos/app/gewerke/page.tsx
  - craftos/app/globals.css
  - craftos/app/page.tsx
  - craftos/app/preise/page.tsx
  - craftos/app/sitemap.ts
  - craftos/app/styleguide/page.tsx
  - craftos/app/vergleich/Comparison.module.css
  - craftos/app/vergleich/page.tsx
  - craftos/components/feature-snippet/ConnectedScene.tsx
  - craftos/components/feature-snippet/DeviceFrame.tsx
  - craftos/components/feature-snippet/FeatureSnippet.module.css
  - craftos/components/feature-snippet/SupplementalScene.module.css
  - craftos/components/feature-snippet/SupplementalScene.tsx
  - craftos/components/home/Hero.tsx
  - craftos/components/preise/PricingTable.tsx
  - craftos/components/ui/MobileAppGallery.tsx
  - craftos/components/v2/Badges.module.css
  - craftos/components/v2/Badges.tsx
  - craftos/components/v2/BentoGrid.module.css
  - craftos/components/v2/BentoGrid.tsx
  - craftos/components/v2/BrowserFrame.tsx
  - craftos/components/v2/ComparisonTable.module.css
  - craftos/components/v2/ComparisonTable.tsx
  - craftos/components/v2/CtaBand.module.css
  - craftos/components/v2/CtaBand.tsx
  - craftos/components/v2/DevicePair.tsx
  - craftos/components/v2/FaqList.module.css
  - craftos/components/v2/FaqList.tsx
  - craftos/components/v2/FeatureCard.module.css
  - craftos/components/v2/FeatureCard.tsx
  - craftos/components/v2/Frames.module.css
  - craftos/components/v2/IllustrationLabel.tsx
  - craftos/components/v2/KeyFacts.module.css
  - craftos/components/v2/KeyFacts.tsx
  - craftos/components/v2/MediaFigure.module.css
  - craftos/components/v2/MediaFigure.tsx
  - craftos/components/v2/PhoneFrame.tsx
  - craftos/components/v2/SectionHeader.module.css
  - craftos/components/v2/SectionHeader.tsx
  - craftos/components/v2/StepFlow.module.css
  - craftos/components/v2/StepFlow.tsx
  - craftos/components/v2/budgets.ts
  - craftos/components/v2/mini/MiniUi.module.css
  - craftos/components/v2/mini/MiniUi.tsx
  - craftos/components/v2/mini/limits.ts
  - craftos/content/hilfe/craft-ai-betriebsdaten-fragen.md
  - craftos/content/hilfe/ki-entwurf-pruefen-uebernehmen.md
  - craftos/lib/comparison.ts
  - craftos/lib/funktionen.ts
  - craftos/lib/keyword-map.ts
  - craftos/lib/llms.ts
  - craftos/lib/product-register.ts
  - craftos/lib/schema.ts
  - craftos/lib/site.ts
  - craftos/lib/styleguide-content.ts
  - craftos/next.config.js
  - craftos/package.json
  - craftos/scripts/check-no-secrets.mjs
  - craftos/scripts/keyword-research.mjs
  - craftos/scripts/lib/se-ranking-mcp.mjs
  - craftos/scripts/optimize-images.mjs
  - craftos/scripts/route-audit.mjs
  - craftos/scripts/se-ranking-sync.mjs
  - craftos/scripts/seo-report.mjs
  - craftos/scripts/sync-product-snapshot.mjs
  - craftos/tests/announcements.test.ts
  - craftos/tests/backlink-plan.test.ts
  - craftos/tests/design-v2-budgets.test.ts
  - craftos/tests/design-v2-components.test.ts
  - craftos/tests/design-v2-frames.test.ts
  - craftos/tests/e2e/browser-functional.pw.cjs
  - craftos/tests/e2e/design-v2.pw.cjs
  - craftos/tests/e2e/playwright.config.cjs
  - craftos/tests/keyword-map.test.ts
  - craftos/tests/keyword-seeds.test.ts
  - craftos/tests/media-budget.test.ts
  - craftos/tests/pricing-parity.test.ts
  - craftos/tests/product-register.test.ts
  - craftos/tests/styleguide.test.ts
findings:
  critical: 0
  high: 3
  medium: 6
  low: 13
  warning: 9
  info: 13
  total: 22
status: issues_found
---

# Phase 05: Code Review Report

**Reviewed:** 2026-10-20T23:03:37Z (lokal 21.10.2026)
**Depth:** standard (mit gezielten Querprüfungen: Web-App-Repo `origin/release` für Credit-Semantik, SE-Ranking-Berichte, `.gitignore`)
**Files Reviewed:** 84 (Diff-Bereich `origin/main..main`, ohne `craftos/public` und `craftos/docs`)
**Status:** issues_found

Schweregrad-Zuordnung zum GSD-Schema: critical = BLOCKER (`critical`), high und medium = WARNING (`warning`), low = INFO (`info`).

## Summary

Geprüft wurden die v2-Bausteine, die Musterseite `/styleguide`, die Preis-/Produktwahrheits-Änderungen auf bestehenden Seiten sowie die SE-Ranking- und Medien-Skripte.

**Was hält (geprüft, kein Befund):**
- `SE_RANKING_API_KEY` wird im MCP-Client nie ausgegeben; alle Fehlerpfade in `se-ranking-mcp.mjs` laufen über `redact()`, die Rohdateien in `docs/seo/reports/` enthalten weder Header noch Schlüssel (Stichprobe aller `raw-*`-Dateien und `kwmap/*.json` auf `api_key|authorization|x-api-key`: keine Treffer). `.env` ist in Repo-Root und `craftos/` gitignoriert.
- `/styleguide`: `robots: { index: false, follow: false }` plus `X-Robots-Tag: noindex, nofollow` (next.config.js), nicht in `sitemap.ts`, nicht in `robots.ts`, nicht in `buildLlmsTxt()`, nirgends verlinkt. E2E prüft alle vier Punkte.
- Geräterahmen sind `aria-hidden` + `inert` (React 19 boolesches `inert`), Beschreibung per sr-only-`figcaption`, Vergleichstabelle mit echter `<table>`, `caption`, `scope`, fokussierbarem Scrollbereich und sr-only „Ja/Nein“.
- `seo-report.mjs` hat einen sauberen Überschreibschutz (Vorabprüfung + `flag: "wx"`). `se-ranking-sync.mjs` löscht nichts (keine Delete-Tools aufgerufen).
- Preise auf `/`, `/preise`, Hero, Fakten, llms.txt und Schema kommen jetzt aus `lib/site.ts`, abgesichert durch `pricing-parity.test.ts` gegen den Snapshot.

**Hauptsorgen:** Die Abgleich-Skripte gegen das externe SE-Ranking-Projekt verlieren ihre Änderungsprotokolle (Überschreiben am selben Tag, kein Protokoll bei Abbruch) und können einen stillen Fehlschlag als „Tariflimit“ verbuchen, wodurch `--check` grün meldet. Dazu kommen fehlendes Backoff bei 5xx/Timeouts, eine unklare Credit-Einheit auf `/preise` und das ungekennzeichnete KI-Bild auf `/gewerke`.

## Narrative Findings (AI reviewer)

## Critical Issues

Keine.

## High

### HI-01: `se-ranking-sync.mjs` überschreibt das einzige Änderungsprotokoll des externen Projekts am selben Tag

**File:** `craftos/scripts/se-ranking-sync.mjs:118-122`, `:160`, `:251-257`
**Issue:** `writeJson()` schreibt mit `fs.writeFileSync` ohne Schutz. Die apply-Datei `<Datum>-projektabgleich-apply.json` ist der **einzige** Nachweis, welche Zielseiten im SE-Ranking-Projekt 13094375 umgebogen wurden (`zielseiteAngeglichen[].vorher`; aktuell 8 Einträge, z. B. „beste handwerkersoftware“ `/vergleich` → `/blog/handwerkersoftware-auswaehlen`). Ein zweiter `--apply`-Lauf am selben Tag (etwa nach einem Tarifwechsel) findet keine Abweichungen mehr, schreibt `zielseiteAngeglichen: []` und `hinzugefuegt: []` in dieselbe Datei. Damit sind die ursprünglichen Ziel-URLs aus dem Repo verschwunden und lassen sich nicht mehr zurückspielen. Dasselbe gilt für den `--check`-Bericht. Das widerspricht dem in `seo-report.mjs` umgesetzten Überschreibschutz und der Löschregel (D-15/D-07a).
**Fix:** Keine Datei überschreiben. Entweder Zeitstempel oder Laufnummer im Namen verwenden, oder mit `flag: "wx"` schreiben und bei `EEXIST` hochzählen:
```js
function writeJsonUnique(base, data) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  for (let n = 1; ; n++) {
    const file = path.join(REPORT_DIR, n === 1 ? `${base}.json` : `${base}-${n}.json`);
    try { fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", { flag: "wx" }); return file; }
    catch (e) { if (e.code !== "EEXIST") throw e; }
  }
}
```
`latestApplyFile()` muss dann nach Name **und** Laufnummer sortieren (bzw. nach `mtime`).

### HI-02: `--apply` bricht nach Teiländerungen ohne jedes Protokoll ab

**File:** `craftos/scripts/se-ranking-sync.mjs:186-199`, `:210-220`, `:276-278`
**Issue:** Jeder Fehler, den `isLimitError` nicht erkennt (Netzwerkfehler, `AbortSignal.timeout` nach 180 s, HTTP 5xx, JSON-RPC-Fehler), wird mit `throw err` durchgereicht und endet in `process.exit(1)`. Die bis dahin schon ausgeführten `PROJECT_updateKeyword`- und `PROJECT_addKeywords`-Aufrufe haben das externe Projekt aber bereits verändert, und die apply-Datei wird nie geschrieben (`writeJson` steht erst in Zeile 251). Bei einem Timeout auf `addKeywords` kann der Server das Paket sogar übernommen haben. Ergebnis: Das Projekt ist verändert, das Repo weiß nichts davon, und die `vorher`-URLs gehen verloren. Zusammen mit MD-01 (kein Retry bei 5xx) ist das im Normalbetrieb realistisch.
**Fix:** Fortschritt nach jeder Mutation persistieren oder im `finally` ein Teilprotokoll schreiben:
```js
let partial = { datum: today(), projekt: SITE_ID, abgebrochen: null, hinzugefuegt, zielseiteAngeglichen, limits };
try { /* Schritte 1–3 */ }
catch (err) { partial.abgebrochen = err.message; throw err; }
finally { writeJsonUnique(`${today()}-projektabgleich-apply`, partial); }
```
Bei Abbruch zusätzlich `readProject()` versuchen, damit der tatsächliche Stand protokolliert wird.

### HI-03: Stille Fehlschläge werden als „Projektlimit“ verbucht, `--check` meldet danach grün

**File:** `craftos/scripts/se-ranking-sync.mjs:36-38`, `:236-246`, `:136-139`, `:167`
**Issue:** Zwei Pfade führen zu einem falschen Grün:
1. Schritt 3 von `apply()` trägt **jeden** nach dem Lauf noch offenen Eintrag in `limits[]` ein, auch wenn der Server keinen Fehler gemeldet hat (`fehler: "nach --apply nicht im Projekt übernommen (Server meldete keinen Fehler)"`). `check()` nimmt alle Keywords aus `limits` der letzten apply-Datei aus `offenOhneLimit` heraus und gibt Exit 0 zurück. Ein stillschweigend verworfener Eintrag (z. B. falsches Argumentformat, Duplikat-Normalisierung im Server) erscheint also nie als Prüffehler, sondern als Tarifentscheidung des Inhabers.
2. `isLimitError` stuft jede Fehlermeldung, die `limit`, `exceed` oder `insufficient` enthält, oder eine beliebige 403 im Text als Kontingentfehler ein. Ein Validierungsfehler wie „parameter 'limit' must be …“ oder „keyword length exceeds …“ bricht daher still ab und landet ebenfalls in `limits`. Zusätzlich setzt `callTool` `status` aus der **ersten** dreistelligen Zahl zwischen 400 und 599 im Fehlertext (`se-ranking-mcp.mjs:164`), was bei Zahlen im Text falsch triggert.
**Fix:** Nur echte Kontingentfehler als Limit führen und den Rest als offenen Fehler belassen:
```js
const isLimitError = (err) =>
  err instanceof McpError && (err.status === 402 || err.status === 403 ||
    /\b(quota|keyword limit|limit (?:reached|exceeded)|not enough (?:units|keywords))\b/i.test(err.message));
// Schritt 3: stille Fehlschläge NICHT in limits, sondern in fehlgeschlagen[]
fehlgeschlagen.push({ keyword: kw, ..., grund: "nach --apply nicht übernommen" });
```
`check()` sollte nur Einträge mit `art`/`grund === "limit"` ausnehmen und Limits aus apply-Dateien, die älter als N Tage sind, nicht mehr berücksichtigen.

## Medium

### MD-01: MCP-Client ohne Backoff bei 5xx, Netzwerkfehler und Timeout; `Retry-After` wird ignoriert

**File:** `craftos/scripts/lib/se-ranking-mcp.mjs:84-99`
**Issue:** Wiederholt wird nur bei HTTP 429, mit festen 1/2/4 s und ohne Auswertung von `Retry-After`. Bei 5xx, `fetch failed` oder Timeout bricht der Client sofort ab. Die Projektvorgabe (CLAUDE.md, „50000 Server-Fehler → Exponential Backoff“) wird damit nicht erfüllt, und in Kombination mit HI-02 entstehen nicht protokollierte Teilläufe. Für **nicht idempotente** Aufrufe (`addKeywords`) ist ein blindes Wiederholen nach Timeout aber riskant.
**Fix:** Für lesende Tools (`list*`, `get*`, `DATA_*`) und für 502/503/504 bzw. JSON-RPC-Code 50000 exponentiell wiederholen (1, 2, 4, 8 s mit Jitter, `Retry-After` beachten). Für mutierende Tools nach einem Timeout nicht wiederholen, sondern den Projektstand neu lesen.

### MD-02: `keyword-research.mjs` gibt API-Fehlerkörper ungefiltert aus

**File:** `craftos/scripts/keyword-research.mjs:252-253`, `:287-288`, `:124-129`
**Issue:** Im Gegensatz zum MCP-Client wird der Fehlerkörper (`body.message`, `body.error` oder `JSON.stringify(body).slice(0,200)`) ohne `redact()` auf stderr ausgegeben. Echot die Data API bei 401/403 den übergebenen `Authorization: Token …`-Wert (manche APIs tun das mit „Invalid token xyz“), landet der Schlüssel im Terminal bzw. in einem umgeleiteten Log. Außerdem ist `fetch` nicht in `try/catch`, sodass Netzwerkfehler als unbehandelte Ausnahme mit Stacktrace enden.
**Fix:** Die `redact`-Funktion aus `scripts/lib/se-ranking-mcp.mjs` exportieren und hier verwenden: `console.error(\`FEHLER ${c.file}: HTTP ${status} ${redact(msg, apiKey)}\`)`. `fetch` in `try/catch` legen und eine redigierte Meldung werfen.

### MD-03: `PROJECT_updateKeyword` benennt Projekt-Keywords in Kleinschreibung um

**File:** `craftos/scripts/se-ranking-sync.mjs:35`, `:73-77`, `:187-192`
**Issue:** `readProject` normalisiert die Projekt-Keywords mit `normKw` (trim + `toLowerCase`), und `updateKeyword` sendet genau diesen normalisierten Wert als `keyword` zurück. Ein Keyword, das im Projekt als „CraftOS Handwerkersoftware“ angelegt ist, wird beim Angleichen der Zielseite zu „craftos handwerkersoftware“ umbenannt. Ob SE Ranking beim Umbenennen die Positionshistorie behält, ist ungeprüft. Ein Bericht-Abgleich mit der Ausgangsmessung vom 20.10. könnte dadurch abreißen. Das Angleichen überschreibt außerdem vom Inhaber gesetzte Ziel-URLs ohne Rückfrage oder Trockenlauf.
**Fix:** Den Originalnamen mitführen (`{ id, keyword: normKw(k.name), name: k.name, url }`) und nur `target_url` ändern. Wenn das Tool `keyword` als Pflichtfeld verlangt, `name` unverändert übergeben. Für die Zielseitenänderung einen expliziten Schalter vorsehen (`--apply --retarget`) oder vorher die Liste ausgeben und bestätigen lassen.

### MD-04: Unerwartete API-Antworten werden als „leeres Projekt“ gelesen (fail-open)

**File:** `craftos/scripts/se-ranking-sync.mjs:39-40`, `:73`, `:90`; `craftos/scripts/seo-report.mjs:47`, `:106`
**Issue:** `rows()` liefert bei jeder nicht erkannten Antwortform `[]`. Ändert SE Ranking das Antwortformat von `PROJECT_listKeywords` (z. B. `{ keywords: [...] }`) oder kommt eine Teilantwort, hält `apply()` alle 126 Soll-Keywords für fehlend und versucht, sie erneut anzulegen (Kontingentverbrauch, mögliche Duplikate). `check()` meldet dann 126 fehlende Einträge. Es gibt keine Paginierung (`listKeywords` aktuell 151 Treffer; `listPrompts` hart mit `limit: 100`). In `seo-report.mjs:106` wird bei leerer Engine-Liste `Number(undefined)` → `NaN` → `null` als `site_engine_id` gesendet.
**Fix:** Fail closed: `rows()` soll bei unbekannter Form werfen (`throw new Error("Antwortformat von PROJECT_listKeywords unbekannt")`). Vor `apply` zusätzlich prüfen, dass das Projekt nicht leer ist (`if (!ist.keywords.length) throw …`). Bei Listen-Tools `nextCursor`/`page` auswerten. In `seo-report` abbrechen, wenn `engines[0]?.site_engine_id` fehlt.

### MD-05: Credit-Einheit auf /preise, in llms.txt und auf der Musterseite missverständlich

**File:** `craftos/app/preise/page.tsx:48`, `:105-131`; `craftos/lib/llms.ts:38`; `craftos/lib/styleguide-content.ts:357-359`
**Issue:** Das Startguthaben wird als „einmalig 150 Credits“ ausgewiesen, die Pakete daneben als Euro-Guthaben („10,00 €“ … „Guthaben 120,00 €“). Laut Web-App `origin/release` (`src/lib/constants.ts`: „1 Credit = 0,01 €“, `FREE_AI_CREDIT: 1.50`) entsprechen 150 Credits **1,50 €**. Weil Seite, llms.txt und FAQ-JSON-LD keine Umrechnung nennen, liest man „150 Credits“ neben „10 € Paket“ leicht als Gegenwert von 150 €. Das ist eine Produktwahrheits-Lücke in Seite, KI-Zusammenfassung und strukturierten Daten. `pricing-parity.test.ts` prüft nur die Zahl 150, nicht die Einheit.
**Fix:** Einheit festhalten und anzeigen, z. B. in `lib/site.ts` `export const creditWertEuro = 0.01;` (im Snapshot aus `FREE_AI_CREDIT`/`ADMIN_FREE_CREDITS` ableiten und im Paritätstest prüfen). Text: „einmalig 150 Credits Startguthaben (entspricht 1,50 €)“ bzw. Pakete als „10 € = 1.000 Credits“.

### MD-06: /gewerke zeigt weiterhin ein KI-generiertes Foto ohne Kennzeichnung

**File:** `craftos/app/gewerke/page.tsx:55-62`
**Issue:** Diese Phase hat die Zeile angefasst (neuer Bildpfad `werkstatt-2026-1600.webp`). Laut `docs/MEDIA.md` handelt es sich um ein „neu generiertes“ Motiv. Die Musterseite kennzeichnet dasselbe Bild korrekt mit „Darstellung, KI-gestaltet“ (`styleguide-content.ts:364-376`), die indexierte Produktionsseite nicht. Das verletzt D-04/MEDIA-03 auf einer öffentlichen Seite. Der Punkt ist in `deferred-items.md` bewusst zurückgestellt (D-03), bleibt aber ein ausgelieferter Verstoß und darf nicht als erledigt gelten. Die Budget-E2E prüft `/gewerke`, aber nicht die Kennzeichnung.
**Fix:** Kleinste regelkonforme Änderung ohne Umgestaltung: `<MediaFigure src=… label="ki" … />` statt `<Image>` oder eine `figcaption` mit `<IllustrationLabel kind="ki" />`. Zusätzlich einen Test ergänzen, der jedes Bild aus der KI-Liste in `docs/MEDIA.md` nur mit Kennzeichnung zulässt.

## Low

### LO-01: Hart codierte „10 Testtage“ entgeht dem Testphasen-Paritätstest

**File:** `craftos/app/fakten-ueber-craftos/page.tsx:20`; `craftos/tests/pricing-parity.test.ts:107`
**Issue:** Die Meta-Description enthält das Literal „10 Testtage“, während der Rest der Seite `site.trialDays` nutzt. `tagesLiteral` erkennt nur „10 Tage/Tagen/tägig“, Komposita wie „Testtage“ fallen durch. Bei einer Änderung der Testphase bliebe die Description falsch.
**Fix:** `` `… Lizenzen, ${site.trialDays} Testtage, …` `` und im Regex `(?:Test)?[Tt]agen?` zulassen.

### LO-02: `UnitPriceSpecification` ohne Einheit und Abrechnungszeitraum

**File:** `craftos/lib/schema.ts:38-46`
**Issue:** Das Offer nennt `price: "29.95"` und eine `UnitPriceSpecification` ohne `referenceQuantity`/`unitText`/`billingDuration`. Für Suchmaschinen ist „pro Person und Monat“ damit nur aus dem Freitext erkennbar, und 29,95 € kann als Einmalpreis gelesen werden.
**Fix:** `referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" }`, `unitText: "pro Person und Monat"` ergänzen.

### LO-03: `h3` innerhalb von `summary` wird nicht überall als Überschrift erkannt

**File:** `craftos/components/v2/FaqList.tsx:37-38`
**Issue:** HTML erlaubt Überschriften in `summary`, aber `summary` wird als Button bzw. DisclosureTriangle mit präsentationalen Kindern ausgegeben. In mehreren Browser/Screenreader-Kombinationen (u. a. Safari/VoiceOver) geht die Überschriftensemantik verloren, sodass die Navigation über Überschriften die Fragen nicht findet.
**Fix:** Wenn Überschriftennavigation Pflicht ist: `<h3><button aria-expanded …>` (Client-Komponente) oder die Überschrift außerhalb von `summary` und `summary` nur als Bedienelement. Andernfalls die Einschränkung im UI-SPEC dokumentieren.

### LO-04: `CtaBand` verwendet eine feste ID

**File:** `craftos/components/v2/CtaBand.tsx:29`, `:32`
**Issue:** `id="cta-band-title"` ist konstant. Die Regel „höchstens einmal je Seite“ steht nur im Kommentar. Bei zweifacher Verwendung entstehen doppelte IDs, und `aria-labelledby` zeigt auf den falschen Titel.
**Fix:** `const id = useId();` verwenden (in Server-Komponenten verfügbar).

### LO-05: `data-evidence` veröffentlicht interne Quellpfade der Produkt-Repos

**File:** `craftos/components/v2/BrowserFrame.tsx:60`, `craftos/components/v2/PhoneFrame.tsx:90`, `craftos/components/v2/DevicePair.tsx:24`, `:29`
**Issue:** Pfade wie `web:src/pages/Plantafel.tsx` stehen im ausgelieferten HTML. Heute betrifft das nur `/styleguide` (noindex, aber öffentlich erreichbar). Sobald die Bausteine in den Phasen 6–9 auf indexierte Seiten kommen, steht die interne Repo-Struktur auf jeder Seite.
**Fix:** Das Attribut nur außerhalb der Produktion ausgeben (`process.env.NODE_ENV !== "production"` bzw. eigenes Flag). Belege prüft ohnehin der Vitest gegen `getProductRegister()`.

### LO-06: `seo-report.mjs` schreibt Rohdateien vor der Auswertung

**File:** `craftos/scripts/seo-report.mjs:140`, `:142-338`
**Issue:** Wirft die Auswertung (z. B. unerwartete Form von `baseLb.request_metadata` oder `positionenRaw`), liegen die sechs Rohdateien bereits vor. Der Überschreibschutz blockiert dann dieselbe Etappe, und ein erneuter Abruf verbraucht wieder Units. Schlägt `writeRaw` beim dritten von sechs Dateien fehl, bleibt ein Teilstand liegen.
**Fix:** Zuerst den Bericht im Speicher bauen, dann alle Dateien schreiben (Rohdateien und Bericht zusammen). Bei einem Fehler die Rohdaten unter `…-raw-<etappe>-fehlerlauf-*.json` sichern.

### LO-07: `optimize-images.mjs`: toter Budgetzweig und nicht deklarierte Abhängigkeit

**File:** `craftos/scripts/optimize-images.mjs:66-70`, `:11`, `:53`
**Issue:** `encodeWithinBudget` wirft bereits bei Überschreitung, sodass `over` nie Einträge hat. `sharp` steht nicht in `package.json` und wird nur transitiv über `next` gefunden (in Next 16 optional). Ausgaben werden kommentarlos überschrieben, was bei den deterministischen Zielnamen akzeptabel ist.
**Fix:** Den toten Zweig entfernen oder die Ausnahme dort sammeln. `sharp` als `devDependency` mit der dokumentierten Version eintragen.

### LO-08: Tests mit leerem Durchlauf bzw. abhängig von externem Repo-Stand

**File:** `craftos/tests/announcements.test.ts:70`; `craftos/tests/pricing-parity.test.ts:176-183`; `craftos/tests/backlink-plan.test.ts:42`
**Issue:** `if (!row) return;` lässt den Telefonempfang-Test grün werden, wenn die Zeile umbenannt wird. Der „Snapshot ist aktuell“-Test wird rot, sobald `origin/release` im Nachbar-Repo weiterläuft, auch ohne Änderung an der Website (nicht hermetisch). Das kann gewollt sein, sollte dann aber als eigener, ausdrücklich benannter Lauf geführt werden. Fehlt das Register, wird mit `[]` geprüft.
**Fix:** `expect(row).toBeDefined()`. Den Aktualitätstest hinter ein Env-Flag legen (`CRAFTOS_CHECK_RELEASE=1`) oder in `npm run sync:product:check` belassen. Fehlendes Register als Fehler behandeln.

### LO-09: `MiniWeek` ohne Grenzprüfung; Szenenbeschreibung passt nicht zu den Daten

**File:** `craftos/components/v2/mini/MiniUi.tsx:103-124`; `craftos/lib/styleguide-content.ts:90-97`
**Issue:** `day + span` wird nicht gegen 5 Tage geprüft (`day: 4, span: 3` erzeugt implizite Grid-Spalten und sprengt das Raster). Die Plantafel-Beschreibung (Screenreadersatz) nennt „drei Baustellen“, die Szene zeigt aber vier Kunden bzw. Baustellen (Bad Bergmann, Bäckerei Krause, Dach Schulte, Aufmaß Weber).
**Fix:** `if (entry.day + (entry.span ?? 1) > 5) throw new Error("MiniWeek: Einsatz ragt über Freitag hinaus")`. Die Beschreibung auf „vier Baustellen“ korrigieren oder einen Eintrag entfernen.

### LO-10: Geheimnis-Scan mit engem Standardumfang und hart codiertem Env-Pfad

**File:** `craftos/scripts/check-no-secrets.mjs:8`, `:21`; `craftos/scripts/lib/se-ranking-mcp.mjs:5`; `craftos/scripts/keyword-research.mjs:11`
**Issue:** Standardziele sind nur `docs/seo scripts lib tests`. `docs/` außerhalb von `seo`, `app/`, `components/`, `content/` und `../.planning/` werden nicht gescannt, obwohl Übergaben dort landen. Der Standardpfad `C:/Projekte/Websitenerstellung/.env` ist rechnerspezifisch (EdgarsPC/Edgar) und dreifach dupliziert.
**Fix:** Standard auf das ganze `craftos/` (ohne `node_modules`, `.next`, `public`) plus `../.planning` erweitern. Den Env-Pfad relativ ermitteln (`path.resolve(import.meta.dirname, "../../.env")`) und zentral in `scripts/lib` halten.

### LO-11: React-Keys aus Inhaltstexten; doppelte Ansage der Tabellenbeschriftung

**File:** `craftos/components/v2/ComparisonTable.tsx:64-66`, `:81`; `craftos/components/v2/FaqList.tsx:36`; `craftos/components/v2/StepFlow.tsx:41`
**Issue:** Zeilen, Fragen und Schritte werden über ihren Text verschlüsselt. Bei doppelten Labels kollidieren die Keys, ohne dass eine Prüfung greift. Der Scrollbereich trägt `aria-label={caption}`, und die Tabelle hat dieselbe `caption`, sodass Screenreader den Text zweimal ansagen.
**Fix:** In den vorhandenen Validierungsschleifen Duplikate werfen lassen. Den Bereich über `aria-labelledby` an die `caption`-ID binden statt den Text zu wiederholen.

### LO-12: `parseRpc` nimmt bei ID-Abweichung irgendeine Antwort

**File:** `craftos/scripts/lib/se-ranking-mcp.mjs:41`
**Issue:** Findet sich keine Nachricht mit passender `id`, wird die erste Nachricht mit `result` oder `error` zurückgegeben. Bei SSE-Streams mit mehreren Nachrichten (z. B. Server-Requests oder Progress) kann das die Antwort eines anderen Aufrufs sein.
**Fix:** Nur `c.id === id` akzeptieren, sonst `McpError("Antwort-ID passt nicht")`.

### LO-13: „server-only“ von `product-register.ts` ist nicht erzwungen

**File:** `craftos/lib/product-register.ts:5-10`, `:337-367`; `craftos/tests/announcements.test.ts:17-20`
**Issue:** Die Ausnahme im Ankündigungstest stützt sich darauf, dass die Datei server-only ist und `notLive` (Telefon-Agent, MCP-Server, KI-Agent) nie gerendert wird. Das steht nur im Kommentar. `styleguide-content.ts` importiert die Datei bereits. Ein Import aus einer Client-Komponente würde die Liste ins Browser-Bundle bringen, und kein Test würde anschlagen.
**Fix:** `import "server-only";` am Dateianfang (Paket `server-only`). Einen Test ergänzen, der sicherstellt, dass `notLive`-Namen in keiner Ausgabe von `renderToString` der Seiten vorkommen.

---

_Reviewed: 2026-10-20T23:03:37Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
