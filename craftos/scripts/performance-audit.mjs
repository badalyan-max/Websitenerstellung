// Performance-Audit gegen einen lokalen Produktionsserver (`next build` + `next start`).
// Herkunft per AUDIT_ORIGIN (Standard http://localhost:3101; Worktree wt-10b: http://localhost:3102).
// Schwere Läufe: nur einzeln unter C:/Projekte/Websitenerstellung/.heavy-lock, nie neben Build oder E2E.
//
// Bestandsmodus (ohne Option): Playwright-Chromium 390 × 844, kalter Cache, 4× CPU, 150 ms Latenz,
// 1,6 Mbit/s; drei Läufe je Route; LCP, CLS (ohne reduzierte Bewegung, 07 IN-05 Teil 2) und synthetische
// Interaktionsdauern. Routen per AUDIT_ROUTES (Komma-Liste) oder die Liste unten (inkl. der acht
// Snippet-Detailseiten). Ergebnis: test-results/performance.json.
//
// Modus --lighthouse (10-CONTEXT D-11, D-12; 10-UI-SPEC § 11 K13):
//   MSYS_NO_PATHCONV=1 AUDIT_ORIGIN=http://localhost:3102 node scripts/performance-audit.mjs --lighthouse \
//     [--paths=/,/funktionen] [--runs=3] [--kategorien=accessibility,best-practices,seo] [--block=<name>]
//   Lighthouse 13.5.0 über die Node-API, mobile Standardvoreinstellung (simulierte Drosselung,
//   mobileSlow4G, 412 × 823), Kategorie Performance; je Lauf ein frischer Chrome aus Playwright
//   (chromium.executablePath()). Gewertet wird der Median je Kennzahl; ungültige Läufe (runtimeError,
//   fehlende FCP/TTI) werden gezählt und je URL bis zu zweimal nachgeholt. `--kategorien=` misst je URL
//   einen zusätzlichen Lauf für die genannten Kategorien. Standardpfade: GATE_ROUTEN + INFO_ROUTEN aus
//   scripts/lib/lighthouse-core.mjs.
//   Ergebnisse: test-results/lighthouse/<slug>-<lauf>.json (Rohdaten je Lauf), <slug>-kategorien.json,
//   test-results/lighthouse/summary.json bzw. summary-<name>.json mit --block=<name>.
//   Exitcodes: 0 Gate eingehalten, 1 Gate-Verstoß (Gate-URL Score < 95 oder LCP ≥ 2.500 ms; A11y-Gate-URL
//   Accessibility < 100), 2 Optionsfehler.
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import {
  hauptbefunde,
  kennzahlen,
  optionen,
  slug,
  zusammenfassung,
} from "./lib/lighthouse-core.mjs";

if (process.argv.includes("--lighthouse")) {
  await lighthouseModus();
} else {
  await bestandsmodus();
}

async function lighthouseModus() {
  const o = optionen(process.argv.slice(2));
  if (o.fehler.length > 0) {
    for (const f of o.fehler) console.error(f);
    process.exitCode = 2;
    return;
  }
  const herkunft = (process.env.AUDIT_ORIGIN || "http://localhost:3101").replace(/\/+$/, "");
  const [{ default: lighthouse }, chromeLauncher, { computeMedianRun, filterToValidRuns }] =
    await Promise.all([
      import("lighthouse"),
      import("chrome-launcher"),
      import("lighthouse/core/lib/median-run.js"),
    ]);
  const chromePath = chromium.executablePath();
  const dir = "test-results/lighthouse";
  await fs.mkdir(dir, { recursive: true });

  // Ein Lauf = ein frisch gestarteter Chrome; ohne dritte Konfiguration gilt die mobile Voreinstellung.
  async function lauf(url, onlyCategories) {
    const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ["--headless=new"] });
    try {
      const ergebnis = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories,
      });
      return ergebnis?.lhr ?? null;
    } finally {
      await chrome.kill();
    }
  }

  const ergebnisse = [];
  let umgebung = null;
  for (const pfad of o.paths) {
    const url = herkunft + pfad;
    const laeufe = [];
    const gueltigeLhrs = [];
    let ungueltig = 0;
    for (let versuch = 1; gueltigeLhrs.length < o.runs && versuch <= o.runs + 2; versuch++) {
      let lhr = null;
      let fehler = null;
      try {
        lhr = await lauf(url, ["performance"]);
      } catch (err) {
        fehler = err?.code || err?.message || String(err);
      }
      if (lhr) await fs.writeFile(`${dir}/${slug(pfad)}-${versuch}.json`, JSON.stringify(lhr));
      const k = lhr ? kennzahlen(lhr) : null;
      if (k && !k.runtimeError && filterToValidRuns([lhr]).length === 1) {
        gueltigeLhrs.push(lhr);
        laeufe.push(k);
        umgebung ??= {
          lighthouseVersion: lhr.lighthouseVersion,
          browser: lhr.environment?.hostUserAgent ?? null,
          benchmarkIndex: lhr.environment?.benchmarkIndex ?? null,
          chromePath,
        };
        console.log(`${pfad} Lauf ${versuch}: Score ${k.score}, LCP ${Math.round(k.lcp)} ms, CLS ${k.cls}`);
      } else {
        ungueltig++;
        console.warn(`${pfad} Lauf ${versuch} ungültig: ${k?.runtimeError || fehler || "FCP/TTI fehlen"}`);
      }
    }

    // Diagnoselauf: der Lauf nahe am Median von FCP und TTI liefert LCP-Element und Hauptbefunde.
    const diagnose = gueltigeLhrs.length > 0 ? computeMedianRun(gueltigeLhrs) : null;

    let kategorien;
    if (o.kategorien.length > 0) {
      kategorien = Object.fromEntries(o.kategorien.map((name) => [name, null]));
      for (let versuch = 1; versuch <= 3; versuch++) {
        let lhr = null;
        try {
          lhr = await lauf(url, o.kategorien);
        } catch (err) {
          console.warn(`${pfad} Kategorien Lauf ${versuch} fehlgeschlagen: ${err?.message || err}`);
        }
        if (lhr && !lhr.runtimeError) {
          await fs.writeFile(`${dir}/${slug(pfad)}-kategorien.json`, JSON.stringify(lhr));
          for (const name of o.kategorien) {
            const s = lhr.categories?.[name]?.score;
            kategorien[name] = typeof s === "number" ? Math.round(s * 100) : null;
          }
          break;
        }
        ungueltig++;
      }
    }

    ergebnisse.push({
      pfad,
      laeufe,
      ungueltig,
      ...(kategorien ? { kategorien } : {}),
      ...(diagnose
        ? { lcpElement: kennzahlen(diagnose).lcpElement, befunde: hauptbefunde(diagnose) }
        : {}),
    });
  }

  const summe = zusammenfassung(ergebnisse, { herkunft, laeufe: o.runs });
  const datei = o.block ? `${dir}/summary-${o.block}.json` : `${dir}/summary.json`;
  await fs.writeFile(
    datei,
    JSON.stringify({ erstellt: new Date().toISOString(), ...umgebung, ...summe }, null, 2),
  );
  for (const [pfad, u] of Object.entries(summe.urls)) {
    const urteil = u.gate ? (u.gate.bestanden ? "Gate bestanden" : `Gate verfehlt: ${u.gate.gruende.join("; ")}`) : "Bericht";
    console.log(
      `${pfad}: Score ${u.score}, LCP ${u.lcp == null ? "–" : Math.round(u.lcp)} ms, CLS ${u.cls}, TBT ${u.tbt == null ? "–" : Math.round(u.tbt)} ms, ` +
        `Läufe ${u.laeufe}, ungültig ${u.ungueltig}${Object.keys(u.kategorien).length ? `, ${JSON.stringify(u.kategorien)}` : ""} – ${urteil}`,
    );
  }
  console.log(`${summe.kennzeichnung} (${herkunft}) → ${datei}`);
  if (summe.gateVerletzt) process.exitCode = 1;
}

async function bestandsmodus() {
  const origin = process.env.AUDIT_ORIGIN || "http://localhost:3101";
  const results = [];
  const browser = await chromium.launch({ headless: true });
  for (const route of process.env.AUDIT_ROUTES?.split(",") || [
    "/",
    "/app",
    "/funktionen/mahnwesen",
    "/funktionen/terminplanung",
    "/preise",
    "/vergleich",
    "/vergleich/hero-alternative",
    "/vergleich/handwerkersoftware-kleine-betriebe",
    "/fakten-ueber-craftos",
    "/craft-ai",
    "/gobd",
    "/blog/handwerkerrechnung-schreiben",
    "/rechner/stundensatz",
    // Acht Snippet-Detailseiten (SNIPPET_SLUGS in tests/e2e/funktionsdetails.pw.cjs): CLS ohne
    // reduzierte Bewegung bei laufender Animation (07 IN-05 Teil 2, D-13).
    "/funktionen/dashboard",
    "/funktionen/angebote",
    "/funktionen/plantafel",
    "/funktionen/rechnungen",
    "/funktionen/eingangsrechnungen",
    "/funktionen/zeiterfassung",
    "/funktionen/lager",
    "/funktionen/aufmass",
  ]) {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        deviceScaleFactor: 1,
        hasTouch: true,
      });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 93750,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        window.__metrics = { lcp: 0, cls: 0, interactionDurations: [] };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) window.__metrics.lcp = e.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (!e.hadRecentInput) window.__metrics.cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (e.interactionId)
              window.__metrics.interactionDurations.push(e.duration);
        }).observe({ type: "event", buffered: true, durationThreshold: 16 });
      });
      await page.goto(origin + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1000);
      await page.getByRole("button", { name: "Menü öffnen" }).click();
      await page.getByRole("button", { name: "Menü schließen" }).click();
      if (route === "/rechner/stundensatz")
        await page
          .getByLabel("Personalkosten pro Jahr in Euro", { exact: true })
          .fill("62000");
      await page.waitForTimeout(300);
      results.push({
        route,
        run,
        ...(await page.evaluate(() => window.__metrics)),
      });
      console.log(route, run, results.at(-1));
      await context.close();
    }
  }
  await browser.close();
  await fs.mkdir("test-results", { recursive: true });
  await fs.writeFile(
    "test-results/performance.json",
    JSON.stringify(
      {
        environment:
          "Local production server; Chromium; 390x844; cold cache; 4x CPU; 150ms latency; 1.6Mbit/s download. Synthetic interaction durations, not field INP.",
        results,
      },
      null,
      2,
    ),
  );
}
