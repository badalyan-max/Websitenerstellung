// Barrierefreiheits-Audit (Phase 10, DESIGN-05; D-05 bis D-08, K-10): axe und Tastatur-Durchlauf gegen den laufenden
// lokalen Produktionsserver, Seiten aus dessen /sitemap.xml plus /styleguide und /gibt-es-nicht-a11y (Status 404 erwartet).
//   npm run build && next start -p 3101, dann:
//   node scripts/a11y-audit.mjs [--paths=/,/preise] [--widths=360,1440] [--engines=chromium,webkit] [--shard=k/n]
//                               [--concurrency=2] [--animation=an|aus]
//   node scripts/a11y-audit.mjs --merge
// Unter Git Bash vor --paths=/… immer MSYS_NO_PATHCONV=1 setzen. Herkunft über AUDIT_ORIGIN (Standard http://localhost:3101).
// Ohne --paths prüft Chromium alle Seiten, WebKit nur die Vorlagen (WEBKIT_VORLAGEN); ausdrückliche --paths gelten für
// beide Engines. --animation=an (Standard, nur Chromium) prüft Seiten mit FeatureSnippet zusätzlich ohne reduzierte
// Bewegung in drei data-phase-Zuständen (nur color-contrast). --concurrency=3 nur bei mehr als 3 GiB freiem RAM.
// Ergebnisse: Teillauf schreibt test-results/a11y/report-<k>-of-<n>.json (ohne --shard report-1-of-1.json) und endet
// mit Exit 0, auch wenn er Gate-Verstöße fand (Zahl steht in der Ausgabe). --merge liest alle Teilberichte, schreibt
// test-results/a11y/report.json und bewertet das Gesamtgate.
// Gezielte Läufe (--paths, --widths oder --engines) schreiben nach test-results/a11y/gezielt/ und zählen nie zum
// Gesamtgate (HI-01). --merge bricht mit Exit 3 ab, wenn die Teile nicht aus demselben Lauf stammen (Laufkennung
// AUDIT_LAUF oder .next/BUILD_ID, Herkunft, Optionen, höchstens 12 Stunden Abstand) oder Aufrufe bzw. Seiten von der
// Sollmenge abweichen.
// Exitcodes: 0 bestanden bzw. Teilbericht geschrieben, 1 Gate verletzt (nur --merge), 2 Optionsfehler,
// 3 technischer Abbruch (Server nicht erreichbar, Browserabsturz, Teilberichte unvollständig).
// Gate (D-06): .options() mit color-contrast-enhanced vor .withTags(AXE_TAGS); 0 serious/critical, 0 color-contrast,
// 0 target-size, 0 Großtext-Knoten mit 4.5:1; Tastatur nach 10-UI-SPEC § 9.1/§ 9.2.
// WebKit unter Windows fokussiert Links per Tab nicht (Plattformstandard wie Safari ohne „Tab hebt alle Objekte hervor“);
// dort zählen Links ohne tabindex daher nicht als Tab-Kandidaten – Fokus an Links prüft der Chromium-Lauf.
// Reine Bewertungsfunktionen: scripts/lib/a11y-audit-core.mjs (Vitest: tests/a11y-audit-core.test.ts).
import { chromium, webkit } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AXE_TAGS, FOKUS_STIL, bewerteAxe, erwarteterStatus, fokusSichtbar, matrix, mergeReports, parseOptionen, pruefeGesamtlauf, tastaturFehler, teil } from "./lib/a11y-audit-core.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ausgabe = path.join(root, "test-results/a11y");
const origin = (process.env.AUDIT_ORIGIN || "http://localhost:3101").replace(/\/+$/, "");
const GIB = 2 ** 30;
const TIMEOUT = 45_000;
const SNIPPET_LAEUFT = '[data-feature-illustration][data-running="true"]';
const ram = () => `${(os.freemem() / GIB).toFixed(2)} GiB frei`;

/** @param {string} text */
function abbruch(text) {
  console.error(`a11y-audit: ${text}`);
  process.exit(3);
}

const argv = process.argv.slice(2);
// Optionen ohne Sitemap-Bezug vor jedem Netzaufruf prüfen (Exit 2).
const vorab = parseOptionen(argv, { sitemapPfade: null });
if ("fehler" in vorab) {
  for (const f of vorab.fehler) console.error(`Fehler: ${f}`);
  process.exit(2);
}

/** Gezielter Lauf: ausdrückliche Auswahl von Pfaden, Breiten oder Engines (HI-01) – nie Teil des Gesamtgates. */
const gezielt = argv.some((a) => /^--(paths|widths|engines)(=|$)/.test(a));

if (vorab.merge) zusammenfuehren();
else await teillauf().catch((e) => abbruch(`technischer Abbruch: ${e instanceof Error ? e.message.split("\n")[0] : e}`));

function zusammenfuehren() {
  const dateien = fs.existsSync(ausgabe) ? fs.readdirSync(ausgabe).filter((d) => /^report-\d+-of-\d+\.json$/.test(d)) : [];
  if (!dateien.length) abbruch(`keine Teilberichte in ${path.relative(root, ausgabe)} – zuerst Teilläufe ausführen.`);
  const teile = dateien.sort().map((d) => JSON.parse(fs.readFileSync(path.join(ausgabe, d), "utf8")));
  // HI-01: nur Teile genau eines vollständigen Gesamtlaufs bewerten (gleiche Laufkennung, kein gezielter Lauf, Sollmenge).
  const laufFehler = pruefeGesamtlauf(teile);
  if (laufFehler.length) abbruch(`Teilberichte bilden keinen vollständigen Gesamtlauf – ${laufFehler.join(" ")}`);
  let bericht;
  try {
    bericht = mergeReports(teile);
  } catch (e) {
    abbruch(e instanceof Error ? e.message.replace(/^a11y-audit: /, "") : String(e));
    return;
  }
  const kopf = { erstellt: new Date().toISOString(), origin: teile[0].origin, teilberichte: dateien.sort(), laufzeitSek: teile.reduce((s, t) => s + (t.laufzeitSek ?? 0), 0) };
  fs.writeFileSync(path.join(ausgabe, "report.json"), JSON.stringify({ ...kopf, ...bericht }, null, 2));
  console.log(`A11y-Audit (Merge aus ${dateien.length} Teilbericht${dateien.length === 1 ? "" : "en"}): ${bericht.seiten} Seiten, ${bericht.aufrufe} Aufrufe, ${bericht.animationsAufrufe} Animationsprüfungen auf ${bericht.snippetSeiten} Snippet-Seiten`);
  const zeilen = /** @type {const} */ ([
    ["Gate-Verstöße (serious/critical, color-contrast, target-size)", bericht.gateVerstoesse],
    ["Großtext-Knoten < 4,5 : 1", bericht.grossText],
    ["Tastaturfehler", bericht.tastatur],
    ["Statusfehler", bericht.statusFehler],
  ]);
  for (const [name, liste] of zeilen) {
    console.log(`${liste.length === 0 ? "OK    " : "FEHLER"} ${name}: ${liste.length}`);
    for (const b of liste.slice(0, 15))
      console.log(`         ${b.engine} @${b.breite} ${b.pfad} [${b.regel}, ${b.zustand}] ${b.fehler ?? b.selektor ?? ""}${b.ist !== undefined ? ` (Status ${b.ist}, erwartet ${b.erwartet})` : ""}`);
  }
  console.log(`Unvollständige Kontrastprüfungen (nur Bericht, Sichtprüfung): ${bericht.unvollstaendigKontrast}`);
  console.log(`Ergebnis: Gate ${bericht.gate ? "verletzt" : "bestanden"} – Details in test-results/a11y/report.json`);
  process.exitCode = bericht.gate ? 1 : 0;
}

/**
 * Führt fn über alle Einträge mit höchstens n gleichzeitigen Aufrufen aus; Ergebnisse in Eingabereihenfolge.
 * @template T, R
 * @param {T[]} eintraege
 * @param {number} n
 * @param {(x: T) => Promise<R>} fn
 * @returns {Promise<R[]>}
 */
async function pool(eintraege, n, fn) {
  /** @type {R[]} */
  const out = new Array(eintraege.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, eintraege.length) }, async () => {
      while (i < eintraege.length) {
        const j = i++;
        out[j] = await fn(eintraege[j]);
      }
    }),
  );
  return out;
}

async function sitemapPfade() {
  try {
    const res = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) abbruch(`${origin}/sitemap.xml antwortet mit Status ${res.status}.`);
    const xml = await res.text();
    return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname))];
  } catch (e) {
    abbruch(`Server ${origin} nicht erreichbar (${e instanceof Error ? e.message : e}) – zuerst next start -p 3101.`);
    return [];
  }
}

/** Externe Anfragen abbrechen (Analytics, Speed Insights, Fremddomains), damit der Prüflauf lokal bleibt. */
async function nurLokal(context) {
  await context.route("**/*", (route) => (new URL(route.request().url()).origin === origin ? route.continue() : route.abort()));
}

/** Seite laden (ein Wiederholungsversuch), Schriften abwarten, einmal durchscrollen (Lazy-Inhalte), zurück nach oben. */
async function laden(page, pfad) {
  let response;
  try {
    response = await page.goto(origin + pfad, { waitUntil: "networkidle", timeout: TIMEOUT });
  } catch {
    response = await page.goto(origin + pfad, { waitUntil: "networkidle", timeout: TIMEOUT });
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    const frame = () => new Promise((r) => requestAnimationFrame(() => r(undefined)));
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await frame();
    }
    window.scrollTo(0, 0);
    await frame();
    await frame();
  });
  return response;
}

/**
 * Tab-Durchlauf von der Seitenspitze (D-07, 10-UI-SPEC § 9.1/§ 9.2): Kandidaten und Ruhezustand vor dem ersten Tab,
 * dann je Schritt aktives Element, Stil-Signatur, Sichtbarkeit und Verdeckung durch die Sticky-Kopfleiste.
 */
async function tastatur(page, engine, breite, pfad) {
  const init = await page.evaluate(
    ({ stil, ohneLinks }) => {
      const ids = new WeakMap();
      let naechste = 0;
      const idVon = (el) => {
        if (!ids.has(el)) ids.set(el, `e${naechste++}`);
        return ids.get(el);
      };
      const selektor = (el) => {
        let s = el.tagName.toLowerCase();
        if (el.id) s += `#${el.id}`;
        else if (el.classList.length) s += `.${[...el.classList].slice(0, 2).join(".")}`;
        const href = el.getAttribute("href");
        if (href) s += `[href="${href}"]`;
        const name = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
        return name ? `${s} „${name}“` : s;
      };
      const signatur = (el) => {
        const kette = [];
        let n = el;
        for (let i = 0; i < 5; i++, n = n?.parentElement ?? null)
          for (const pseudo of [null, "::before", "::after"]) {
            if (!n) {
              kette.push(null);
              continue;
            }
            const cs = getComputedStyle(n, pseudo);
            kette.push(Object.fromEntries(stil.map((k) => [k, cs[k]])));
          }
        return kette;
      };
      const auswahl = 'a[href], button, input, select, textarea, details > summary, [tabindex="0"]';
      const kandidaten = [...document.querySelectorAll(auswahl)].filter((el) => {
        if (el.closest('[inert], [aria-hidden="true"]')) return false;
        if (el.matches(":disabled, input[type=hidden], [tabindex='-1']")) return false;
        if (el.matches("details > summary") && el.parentElement.querySelector(":scope > summary") !== el) return false;
        if (ohneLinks && el.matches("a[href]:not([tabindex])")) return false;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return false;
        if (typeof el.checkVisibility === "function" && !el.checkVisibility({ visibilityProperty: true })) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });
      const gruppen = new WeakMap();
      const liste = [];
      const ruhe = {};
      for (const el of kandidaten) {
        const gruppe = el.matches("input[type=radio]") && el.name ? `radio:${el.form?.id ?? ""}:${el.name}` : idVon(el);
        gruppen.set(el, gruppe);
        ruhe[idVon(el)] = signatur(el);
        if (!liste.some((k) => k.id === gruppe)) liste.push({ id: gruppe, selektor: selektor(el) });
      }
      window.__a11yAudit = { idVon, selektor, signatur, gruppen };
      document.activeElement?.blur?.();
      window.scrollTo(0, 0);
      return { kandidaten: liste, ruhe };
    },
    { stil: FOKUS_STIL, ohneLinks: engine === "webkit" },
  );

  const grenze = init.kandidaten.length + 20;
  const gesehen = new Set();
  const fokussiert = new Set();
  /** @type {string[]} */
  const ohneIndikator = [];
  /** @type {string[]} */
  const unsichtbar = [];
  /** @type {string[]} */
  const verdeckt = [];
  let erstes = null;
  let schritte = 0;
  let falle = false;
  for (;;) {
    if (schritte >= grenze) {
      falle = true;
      break;
    }
    await page.keyboard.press("Tab");
    schritte++;
    const s = await page.evaluate(async () => {
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) return null;
      const a = window.__a11yAudit;
      // WebKit scrollt das fokussierte Element erst im nächsten Frame in den Sichtbereich (Diagnose 10-01):
      // außerhalb liegende Elemente bis zu zehn Frames nachmessen, bevor sie als unsichtbar gelten.
      const aussen = (r) => r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth;
      let r = el.getBoundingClientRect();
      for (let i = 0; i < 10 && aussen(r); i++) {
        await new Promise((fertig) => requestAnimationFrame(() => fertig(undefined)));
        r = el.getBoundingClientRect();
      }
      const cs = getComputedStyle(el);
      let weg = r.width < 2 || r.height < 2 || (cs.clip !== "auto" && cs.clip !== "") || cs.clipPath !== "none";
      if (aussen(r)) weg = true;
      for (let n = el; n; n = n.parentElement) if (getComputedStyle(n).opacity === "0") weg = true;
      let zu = false;
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (x >= 0 && y >= 0 && x < innerWidth && y < innerHeight) {
        for (let n = document.elementFromPoint(x, y); n; n = n.parentElement)
          if (n.tagName === "HEADER" && !n.contains(el) && ["sticky", "fixed"].includes(getComputedStyle(n).position)) zu = true;
      }
      return { id: a.idVon(el), gruppe: a.gruppen.get(el) ?? null, selektor: a.selektor(el), signatur: a.signatur(el), unsichtbar: weg, verdeckt: zu };
    });
    // Fokus zurück in die Browserleiste bzw. an den Dokumentanfang: Durchlauf geschlossen.
    if (!s) break;
    if (gesehen.has(s.id)) {
      if (s.id !== erstes) falle = true;
      break;
    }
    gesehen.add(s.id);
    erstes ??= s.id;
    if (s.gruppe) fokussiert.add(s.gruppe);
    const ruhe = init.ruhe[s.id];
    if (ruhe && !fokusSichtbar(ruhe, s.signatur)) ohneIndikator.push(s.selektor);
    if (s.unsichtbar) unsichtbar.push(s.selektor);
    if (s.verdeckt) verdeckt.push(s.selektor);
  }
  return {
    fehler: tastaturFehler({ pfad, breite, kandidaten: init.kandidaten, fokussiert: [...fokussiert], schritte, falle, ohneIndikator, unsichtbar, verdeckt }),
    detail: { kandidaten: init.kandidaten.length, fokussiert: fokussiert.size, schritte },
  };
}

/** Stabiler Zustand (reduzierte Bewegung): Status, axe mit Großtext, Tastatur. */
async function pruefeSeite(context, browserWeg, { engine, breite, pfad }) {
  const start = Date.now();
  const erwartet = erwarteterStatus(pfad);
  const page = await context.newPage();
  try {
    const response = await laden(page, pfad);
    const result = await new AxeBuilder({ page })
      .options({ rules: { "color-contrast-enhanced": { enabled: true } } })
      .withTags(AXE_TAGS)
      .analyze();
    const axe = bewerteAxe(result);
    const tab = await tastatur(page, engine, breite, pfad);
    const snippet = (await page.locator("[data-feature-illustration]").count()) > 0;
    return {
      engine,
      breite,
      pfad,
      status: response?.status() ?? null,
      erwartet,
      dauerMs: Date.now() - start,
      gate: axe.gate,
      grossText: axe.grossText,
      uebrige: axe.uebrige,
      unvollstaendigKontrast: axe.unvollstaendigKontrast,
      unvollstaendigStellen: axe.unvollstaendigStellen,
      tastatur: tab.fehler,
      tastaturDetail: tab.detail,
      snippet,
      animation: null,
    };
  } catch (e) {
    if (browserWeg()) throw e;
    const fehler = e instanceof Error ? e.message.split("\n")[0] : String(e);
    console.error(`  ${engine} @${breite} ${pfad}: ${fehler}`);
    return { engine, breite, pfad, status: null, erwartet, fehler, dauerMs: Date.now() - start, gate: [], grossText: [], uebrige: {}, unvollstaendigKontrast: 0, unvollstaendigStellen: [], tastatur: [], snippet: false, animation: null };
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Animationszustand (D-05/D-10, Pitfall 5): ohne reduzierte Bewegung, warten auf data-running="true", dann
 * color-contrast im laufenden Snippet in drei verschiedenen data-phase-Zuständen (Attributwechsel, keine festen Pausen).
 */
async function pruefeAnimation(context, browserWeg, pfad) {
  const page = await context.newPage();
  try {
    await laden(page, pfad);
    await page.evaluate(() => document.querySelector("[data-feature-illustration]")?.scrollIntoView({ block: "center" }));
    await page.locator(SNIPPET_LAEUFT).first().waitFor({ timeout: 15_000 });
    /** @type {number[]} */
    const phasen = [];
    const gate = [];
    for (let i = 0; i < 3; i++) {
      const phase = await page.locator(SNIPPET_LAEUFT).first().getAttribute("data-phase");
      // CSS-Übergänge des neuen Zustands abwarten (Bedingung statt Pause; Obergrenze 2 s).
      await page
        .waitForFunction(
          (sel) => {
            const el = document.querySelector(sel);
            return !el || el.getAnimations({ subtree: true }).every((a) => !(a instanceof CSSTransition) || a.playState !== "running");
          },
          SNIPPET_LAEUFT,
          { timeout: 2_000 },
        )
        .catch(() => {});
      const result = await new AxeBuilder({ page }).include(SNIPPET_LAEUFT).withRules(["color-contrast"]).analyze();
      for (const g of bewerteAxe(result).gate) gate.push({ ...g, phase: Number(phase) });
      phasen.push(Number(phase));
      if (i < 2)
        await page.waitForFunction(
          ({ sel, alt }) => {
            const el = document.querySelector(sel);
            return !!el && el.getAttribute("data-phase") !== alt;
          },
          { sel: SNIPPET_LAEUFT, alt: phase },
          { timeout: 10_000 },
        );
    }
    return { phasen, gate };
  } catch (e) {
    if (browserWeg()) throw e;
    return { phasen: [], gate: [], fehler: e instanceof Error ? e.message.split("\n")[0] : String(e) };
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Laufkennung für --merge (HI-01): AUDIT_LAUF, sonst die Build-ID des geprüften Produktionsbuilds (.next/BUILD_ID).
 * Alle Teilläufe eines Gesamtlaufs müssen dieselbe Kennung tragen.
 */
function laufKennung() {
  if (process.env.AUDIT_LAUF) return process.env.AUDIT_LAUF;
  try {
    return `build-${fs.readFileSync(path.join(root, ".next/BUILD_ID"), "utf8").trim()}`;
  } catch {
    return "build-unbekannt";
  }
}

async function teillauf() {
  const t0 = Date.now();
  const opts = parseOptionen(argv, { sitemapPfade: await sitemapPfade() });
  if ("fehler" in opts) {
    for (const f of opts.fehler) console.error(`Fehler: ${f}`);
    process.exit(2);
  }
  const shard = opts.shard ?? { k: 1, n: 1 };
  const gesamt = matrix({ pfade: opts.pfade ?? [], breiten: opts.breiten, engines: opts.engines, webkitPfade: opts.webkitPfade });
  const liste = teil(gesamt, shard.k, shard.n);
  let concurrency = opts.concurrency;
  if (concurrency > 2 && os.freemem() <= 3 * GIB) {
    console.log(`a11y-audit: --concurrency=3 nur bei mehr als 3 GiB freiem RAM (${ram()}) – laufe mit 2.`);
    concurrency = 2;
  }
  const ramStart = os.freemem() / GIB;
  console.log(`A11y-Audit Teil ${shard.k}/${shard.n}: ${liste.length} Aufrufe, Parallelität ${concurrency}, Animation ${opts.animation}, ${ram()}`);

  /** @type {any[]} */
  const aufrufe = [];
  for (const engine of opts.engines) {
    const eigene = liste.filter((x) => x.engine === engine);
    if (!eigene.length) continue;
    const browser = await (engine === "webkit" ? webkit : chromium).launch({ headless: true });
    let weg = false;
    browser.on("disconnected", () => {
      weg = true;
    });
    const browserWeg = () => weg;
    try {
      for (const breite of [...new Set(eigene.map((x) => x.breite))]) {
        const tb = Date.now();
        const context = await browser.newContext({ viewport: { width: breite, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
        await nurLokal(context);
        const ergebnisse = await pool(
          eigene.filter((x) => x.breite === breite),
          concurrency,
          (x) => pruefeSeite(context, browserWeg, x),
        );
        await context.close();
        if (engine === "chromium" && opts.animation === "an" && ergebnisse.some((r) => r.snippet)) {
          const bewegt = await browser.newContext({ viewport: { width: breite, height: 900 }, reducedMotion: "no-preference", deviceScaleFactor: 1 });
          await nurLokal(bewegt);
          await pool(
            ergebnisse.filter((r) => r.snippet),
            concurrency,
            async (r) => {
              r.animation = await pruefeAnimation(bewegt, browserWeg, r.pfad);
            },
          );
          await bewegt.close();
        }
        aufrufe.push(...ergebnisse);
        const gate = ergebnisse.reduce((s, r) => s + r.gate.length + r.grossText.length + r.tastatur.length + (r.animation?.gate.length ?? 0), 0);
        console.log(`  ${engine} @${breite}: ${ergebnisse.length} Seiten in ${((Date.now() - tb) / 1000).toFixed(1)} s, ${gate} Befunde, ${ram()}`);
      }
    } finally {
      await browser.close().catch(() => {});
    }
  }

  const laufzeitSek = Math.round((Date.now() - t0) / 100) / 10;
  const teilbericht = {
    erstellt: new Date().toISOString(),
    origin,
    shard: opts.shard ?? { k: 1, n: 1 },
    lauf: laufKennung(),
    gezielt,
    soll: { aufrufe: gesamt.length, seiten: new Set(gesamt.map((x) => x.pfad)).size },
    optionen: { breiten: opts.breiten, engines: opts.engines, concurrency, animation: opts.animation, pfade: opts.pfade?.length ?? 0 },
    ram: { startGiB: Math.round(ramStart * 100) / 100, endeGiB: Math.round((os.freemem() / GIB) * 100) / 100 },
    laufzeitSek,
    aufrufe,
  };
  // HI-01: gezielte Läufe schreiben in einen eigenen Unterordner, den --merge nicht liest.
  const zielOrdner = gezielt ? path.join(ausgabe, "gezielt") : ausgabe;
  fs.mkdirSync(zielOrdner, { recursive: true });
  const datei = gezielt ? `report-${teilbericht.erstellt.replace(/[:.]/g, "-")}-${shard.k}-of-${shard.n}.json` : `report-${shard.k}-of-${shard.n}.json`;
  fs.writeFileSync(path.join(zielOrdner, datei), JSON.stringify(teilbericht, null, 2));
  const anzeige = path.relative(root, path.join(zielOrdner, datei)).split(path.sep).join("/");
  const zahl = mergeReports([{ ...teilbericht, shard: { k: 1, n: 1 } }]);
  console.log(
    `Teil ${shard.k}/${shard.n} fertig in ${laufzeitSek} s: ${zahl.aufrufe} Aufrufe, Gate-Verstöße ${zahl.gateVerstoesse.length}, Großtext ${zahl.grossText.length}, Tastatur ${zahl.tastatur.length}, Status ${zahl.statusFehler.length}, Snippet-Seiten ${zahl.snippetSeiten} – ${anzeige} ${gezielt ? "(gezielter Lauf, kein Gesamtgate)" : "(Gesamtgate: --merge)"}`,
  );
}

