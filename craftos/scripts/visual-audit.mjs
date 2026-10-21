import { chromium, webkit } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const origin = process.env.AUDIT_ORIGIN || "http://localhost:3101";
const output = "test-results/visual";
await fs.mkdir(output, { recursive: true });
const routes = process.env.AUDIT_ROUTES?.split(",") || [
  "/",
  "/funktionen/angebote",
  "/funktionen/mahnwesen",
  "/funktionen/terminplanung",
  "/preise",
  "/app",
  "/gewerke",
  "/vergleich",
  "/blog/handwerkerrechnung-schreiben",
  "/hilfe/rechnung-fertigstellen",
  "/rechner/stundensatz",
  "/rechner/angebotskalkulation",
];
const results = [];
for (const [engine, type] of [
  ["chromium", chromium],
  ["webkit", webkit],
]) {
  const browser = await type.launch({ headless: true });
  for (const width of process.env.AUDIT_WIDTHS?.split(",").map(Number) || [
    360, 390, 768, 1024, 1440,
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      const onError = (e) => errors.push(e.message);
      page.on("pageerror", onError);
      const response = await page.goto(origin + route, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      for (
        let y = 0;
        y < (await page.locator("body").evaluate((el) => el.scrollHeight));
        y += 800
      ) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(25);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(80);
      const layout = await page.evaluate(() => ({
        viewport: innerWidth,
        width: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll("main *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return (
              r.width > 0 &&
              (r.right > innerWidth + 2 || r.left < -2) &&
              getComputedStyle(el).position !== "absolute"
            );
          })
          .slice(0, 8)
          .map((el) => ({
            tag: el.tagName,
            class: el.className,
            text: el.textContent?.slice(0, 60),
          })),
        images: [...document.images]
          .filter((i) => i.offsetWidth > 0 && (!i.complete || !i.naturalWidth))
          .map((i) => i.src),
      }));
      const accessibility =
        width === 390 || width === 1440
          ? (
              await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
                .analyze()
            ).violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            }))
          : [];
      const filename =
        engine +
        "-" +
        width +
        "-" +
        (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) +
        ".png";
      await page.screenshot({ path: output + "/" + filename, fullPage: true });
      results.push({
        engine,
        width,
        route,
        status: response?.status(),
        layout,
        errors,
        accessibility,
        screenshot: filename,
      });
      page.off("pageerror", onError);
      await page.close();
    }
    await context.close();
    console.log(engine, width, "done");
  }
  await browser.close();
}
await fs.writeFile(output + "/report.json", JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    {
      pages: results.length,
      statusErrors: results.filter((x) => x.status !== 200),
      overflow: results
        .filter((x) => x.layout.width > x.width + 2)
        .map((x) => ({
          engine: x.engine,
          width: x.width,
          route: x.route,
          layout: x.layout,
        })),
      jsErrors: results.filter((x) => x.errors.length),
      a11y: results
        .filter((x) => x.accessibility.length)
        .map((x) => ({
          engine: x.engine,
          width: x.width,
          route: x.route,
          issues: x.accessibility,
        })),
    },
    null,
    2,
  ),
);

if(results.some(x=>x.status!==200||x.layout.width>x.width+2||x.layout.images.length||x.errors.length||x.accessibility.length))process.exitCode=1;
