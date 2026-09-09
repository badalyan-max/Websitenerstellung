import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const origin = process.env.AUDIT_ORIGIN || "http://localhost:3101";
const results = [];
const browser = await chromium.launch({ headless: true });
for (const route of process.env.AUDIT_ROUTES?.split(",") || [
  "/",
  "/app",
  "/preise",
  "/blog/handwerkerrechnung-schreiben",
  "/rechner/stundensatz",
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
    if (route === "/preise")
      await page
        .getByRole("button", { name: "Monatlich", exact: true })
        .click();
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
