# SEO/GEO Paket 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** craftos.eu für KI-Suchen und Marken-Suchen besser auffindbar machen und messbar machen, woher Besucher kommen und ob sie testen oder sich nur anmelden.

**Architecture:** Reine Funktionen in `lib/` (Erkennung KI-Herkunft, Link-Klassifizierung, llms.txt-Text) mit Vitest-Tests; die Client-Komponente `components/Analytics.tsx` ruft sie auf. `llms.txt` wird als statischer Route Handler aus `lib/site.ts`, `lib/funktionen.ts` und `lib/gewerke.ts` erzeugt, damit Preise und Seiten nie auseinanderlaufen. IndexNow über eine öffentliche Schlüsseldatei und ein manuell gestartetes Node-Skript.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Vitest, `@vercel/analytics` 1.6, `@vercel/speed-insights` 2.0.0.

**Spec:** Audit-Ergebnis und Freigabe des Inhabers im Chat vom 20.10.2026 („Paket 1“, „ja, los“).

## Global Constraints

- Keine Änderung an Fließtexten der Seiten (Copy-Regel des Audit-Skills); Titel, Meta, Schema dürfen geändert werden.
- Nichts löschen. Kein bestehendes Analytics-Ereignis außer `registration_click` ändern.
- Speed Insights nur kostenlose Stufe; keine Plus-Optionen; nur aktiv, wenn `NEXT_PUBLIC_ANALYTICS_ENABLED === "true"` (wie Web Analytics).
- Ereignisse ohne personenbezogene Daten: nur feste Werte (`source`), keine URLs, keine Query-Strings.
- Titel/Description-Kürzungen (Punkt 6) werden NICHT umgesetzt, nur als Variantenliste vorgelegt.
- Tests nur lokal (`npm test`, `npm run typecheck`, `npm run lint`, `npm run build`); kein Push zum Testen.

## Review Focus

- Referrer ist leer, ungültig oder von craftos.eu selbst → kein `ai_visit`.
- `utm_source` in Großschreibung oder mit Zusatz (`chatgpt.com`) → trotzdem erkannt.
- `sessionStorage` wirft (Privatmodus) → Seite funktioniert, Ereignis wird höchstens gesendet, nie ein Fehler.
- App-Link mit Pfad oder Query (`https://app.craftos.eu/auth?x`) → weiterhin als Test-Klick erkannt; fremde Domains, die mit `app.craftos.eu` beginnen (`https://app.craftos.eu.evil.com`), nicht.
- `llms.txt` enthält keine angekündigten, noch nicht verfügbaren Funktionen (`tier: "launch"`).

---

### Task 1: Marke im Startseiten-Titel und im Schema

**Files:**
- Modify: `app/page.tsx:18-22` (Titel-String)
- Modify: `lib/schema.ts` (organizationSchema, softwareApplicationSchema)
- Test: `tests/seo-brand.test.ts`

- [ ] **Step 1: Failing test** – `metadata.title` aus `@/app/page` ist `"CraftOS – Handwerkersoftware für Büro & Baustelle"`; `organizationSchema()` hat `alternateName` `["CraftOS Handwerkersoftware"]`, `sameAs` enthält `site.iosUrl` und `site.androidUrl`, `disambiguatingDescription` enthält `"craftos.eu"`; `softwareApplicationSchema()` hat `alternateName` `"CraftOS Handwerkersoftware"` und `sameAs` mit beiden Store-URLs.
- [ ] **Step 2:** `npx vitest run tests/seo-brand.test.ts` → FAIL.
- [ ] **Step 3:** Titel-String ändern (Root-`page.tsx` erbt das Template nicht, daher volle Zeichenkette). Schema-Felder ergänzen; `disambiguatingDescription`: `"CraftOS (craftos.eu) ist eine Handwerkersoftware für Handwerksbetriebe in Deutschland mit Web-App und Mobile-App."`
- [ ] **Step 4:** Test → PASS.

### Task 2: KI-Herkunft und Link-Klassifizierung

**Files:**
- Create: `lib/tracking.ts`
- Modify: `components/Analytics.tsx`, `components/layout/Header.tsx:176` (`data-track="login"`), `docs/ANALYTICS.md`
- Test: `tests/tracking.test.ts`

**Interfaces:**
- Produces: `type AiSource = "chatgpt" | "perplexity" | "copilot" | "gemini" | "claude"`; `detectAiSource(referrer: string, search: string): AiSource | null`; `classifyAppLink(href: string, track: string | null): "trial_click" | "login_click" | null`.

- [ ] **Step 1: Failing tests**
  - `detectAiSource("https://chatgpt.com/", "")` → `"chatgpt"`; `"https://chat.openai.com/c/1"` → `"chatgpt"`; `"https://www.perplexity.ai/search"` → `"perplexity"`; `"https://copilot.microsoft.com/"` → `"copilot"`; `"https://gemini.google.com/app"` → `"gemini"`; `"https://claude.ai/chat"` → `"claude"`.
  - `detectAiSource("", "?utm_source=ChatGPT.com")` → `"chatgpt"`; `("", "?utm_source=perplexity")` → `"perplexity"`.
  - `detectAiSource("https://www.google.com/", "")`, `("", "")`, `("kein-url", "")`, `("https://craftos.eu/preise", "")`, `("https://notchatgpt.com/", "")` → `null`.
  - `classifyAppLink("https://app.craftos.eu", null)` → `"trial_click"`; `("https://app.craftos.eu/auth?x=1", null)` → `"trial_click"`; `("https://app.craftos.eu", "login")` → `"login_click"`; `("https://app.craftos.eu.evil.com/", null)` → `null`; `("https://craftos.eu/preise", null)` → `null`.
- [ ] **Step 2:** `npx vitest run tests/tracking.test.ts` → FAIL.
- [ ] **Step 3:** `lib/tracking.ts` implementieren. Hosts per `new URL()` parsen (Fehler → `null`), Treffer bei `host === d || host.endsWith("." + d)`. `utm_source` via `URLSearchParams`, klein geschrieben, Teilstring-Abgleich (`chatgpt`/`openai`, `perplexity`, `copilot`, `gemini`, `claude`). App-Links: `new URL(href).host === "app.craftos.eu"`.
- [ ] **Step 4:** `Analytics.tsx`: Klick-Handler nutzt `classifyAppLink(link.href, link.getAttribute("data-track"))` statt `registration_click`. Zusätzliches `useEffect` (nur bei `enabled`, einmal pro Mount): `detectAiSource(document.referrer, location.search)`; bei Treffer und ohne `sessionStorage`-Eintrag `craftos_ai_visit` → `track("ai_visit", { source })`, Eintrag setzen; `sessionStorage`-Zugriffe in try/catch.
- [ ] **Step 5:** Header-Link „Anmelden“ bekommt `data-track="login"`. `docs/ANALYTICS.md`-Tabelle: `registration_click` ersetzen durch `trial_click`, `login_click`, neu `ai_visit` (nur `source`).
- [ ] **Step 6:** Test → PASS.

### Task 3: Speed Insights (kostenlos)

**Files:** Modify `package.json`/`package-lock.json` (`npm i @vercel/speed-insights@2.0.0`), `components/Analytics.tsx`.

- [ ] **Step 1:** Paket installieren.
- [ ] **Step 2:** In `Analytics` neben `<VercelAnalytics …/>` `<SpeedInsights />` aus `@vercel/speed-insights/next` rendern (Fragment); bleibt hinter `enabled`.
- [ ] **Step 3:** `npm run typecheck` → ohne Fehler.

### Task 4: llms.txt

**Files:**
- Create: `lib/llms.ts`, `app/llms.txt/route.ts`
- Test: `tests/llms.test.ts`

**Interfaces:**
- Produces: `buildLlmsTxt(): string`.

- [ ] **Step 1: Failing test** – Ergebnis beginnt mit `"# CraftOS Handwerkersoftware"`, enthält `"29,95 €"`, `"9,95 €"`, `"10 Tage"`, `site.url + "/preise"`, `site.url + "/vergleich"`, für jede `funktionen`-Seite mit `tier === "heute"` deren URL und für keine mit `tier === "launch"`, für jedes Gewerk die URL. `GET()` aus der Route liefert `content-type` mit `text/plain`.
- [ ] **Step 2:** `npx vitest run tests/llms.test.ts` → FAIL.
- [ ] **Step 3:** `buildLlmsTxt` nach llms.txt-Format: H1, `>`-Zusammenfassung, Abschnitt „Fakten“ (Preise aus `tarife`, Testphase, Plattformen, Kontakt), Abschnitte „Funktionen“, „Gewerke“, „Preise und Vergleich“, „Rechner“ als Markdown-Linklisten. Route: `export const dynamic = "force-static"`, `GET` liefert `new Response(buildLlmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } })`.
- [ ] **Step 4:** Test → PASS.

### Task 5: IndexNow

**Files:** Create `public/<key>.txt`, `scripts/indexnow-submit.mjs`; Modify `package.json` (Script `indexnow`).

- [ ] **Step 1:** 32-stelligen Hex-Schlüssel erzeugen; Datei `public/<key>.txt` mit genau diesem Schlüssel als Inhalt.
- [ ] **Step 2:** Skript: Sitemap von `https://craftos.eu/sitemap.xml` lesen, `POST https://api.indexnow.org/indexnow` mit `{ host: "craftos.eu", key, keyLocation: "https://craftos.eu/<key>.txt", urlList }`; Status ausgeben; Exit 1 bei Status ≥ 400. Nur manuell nach einem Deployment starten (`npm run indexnow`).
- [ ] **Step 3:** Nach dem Deployment: `https://craftos.eu/<key>.txt` liefert 200 und den Schlüssel, dann `npm run indexnow` → 200 oder 202.

### Task 6: Titel/Description-Variantenliste (keine Umsetzung)

- [ ] Aus dem Crawl alle Titel > 60 Zeichen und Descriptions < 70 / > 160 Zeichen mit je einer Variante als Tabelle in `docs/entwuerfe/titel-descriptions.md`.

### Abschluss

- [ ] `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` grün.
- [ ] Lokaler Review (superpowers:requesting-code-review), Findings beheben.
- [ ] `ship-gate`, dann Commit/Push nach Freigabe.
