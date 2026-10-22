import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import { craftosTestphaseSaetze, ctaTestphaseFehler, istAlteTestphase } from "./lib/seo-audit-core.mjs";
// D-23: Testphase aus dem Preis-Snapshot (nicht hart kodiert). Auf /vergleich und darunter dürfen belegte
// Wettbewerberangaben „14 Tage“ nennen; dafür muss dort jeder CraftOS-CTA und jeder CraftOS-Satz zur Testphase
// genau trialDays nennen (08-REVIEW LO-06: craftosTestphaseSaetze).
const { trialDays } = JSON.parse(
  readFileSync(new URL("../docs/product-pricing-snapshot.json", import.meta.url), "utf8"),
);
const base = process.env.AUDIT_ORIGIN || "http://localhost:3101";
const xml = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) =>
  m[1].replace("https://craftos.eu", base),
);
const results = [],
  links = new Set(),
  assets = new Set();
for (const url of urls) {
  const r = await fetch(url);
  const body = await r.text();
  const canonical = body.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const title = body.match(/<title>([^<]+)<\/title>/)?.[1];
  const pfad = new URL(url).pathname.replace(/\/$/, "") || "/";
  const unterVergleich = pfad === "/vergleich" || pfad.startsWith("/vergleich/");
  for (const m of body.matchAll(/href="([^"]+)"/g)) {
    const h = m[1].replaceAll("&amp;", "&");
    if (
      h.startsWith("/") &&
      !h.startsWith("/_next") &&
      !h.includes("opengraph-image")
    )
      links.add(h.split("#")[0]);
  }
  for (const m of body.matchAll(/(?:src|srcSet)="([^"]+)"/g)) {
    if (m[1].startsWith("/") && !m[1].startsWith("/_next")) assets.add(m[1]);
  }
  results.push({
    url,
    status: r.status,
    canonical,
    title,
    hasH1: /<h1\b/.test(body),
    oldTrial: istAlteTestphase(pfad, body),
    ctaTrial: unterVergleich ? [...ctaTestphaseFehler(body, trialDays), ...craftosTestphaseSaetze(body, trialDays)] : [],
    // Gleiches Muster wie tests/announcements.test.ts (content) und live-check.mjs:
    // „Stand: Oktober 2026“ ist legitim, nur „… 2026 geplant“ ist eine Ankündigung.
    announcement:
      /Geplant:|Demnächst in CraftOS|Telefon-Agent|MCP-Server|(September|Oktober|November) 2026 geplant/.test(
        body,
      ),
  });
}
const badLinks = [];
for (const link of new Set([...links, ...assets])) {
  const r = await fetch(base + link);
  if (r.status !== 200) badLinks.push({ link, status: r.status });
}
const unknown = [];
for (const p of [
  "/does-not-exist",
  "/funktionen/unbekannt",
  "/gewerke/unbekannt",
  "/blog/unbekannt",
  "/hilfe/unbekannt",
  "/blog/kategorie/constructor",
  "/hilfe/kategorie/__proto__",
  // LO-03: unbekannte OG-Pfade dynamischer Segmente → 404 (dynamicParams = false), nicht 500.
  "/funktionen/unbekannt/opengraph-image",
  "/blog/unbekannt/opengraph-image",
  "/hilfe/kategorie/unbekannt/opengraph-image",
]) {
  const r = await fetch(base + p);
  unknown.push({ path: p, status: r.status });
}
const og = [];
for (const p of [
  "/opengraph-image",
  "/blog/handwerkerrechnung-schreiben/opengraph-image",
  "/hilfe/rechnung-fertigstellen/opengraph-image",
  // 08-05: Segmentbilder statischer und dynamischer Segmente
  "/preise/opengraph-image",
  "/funktionen/angebote/opengraph-image",
  "/hilfe/kategorie/rechnungen/opengraph-image",
]) {
  const r = await fetch(base + p);
  og.push({ path: p, status: r.status, type: r.headers.get("content-type") });
}
const out = {
  results,
  badLinks,
  unknown,
  og,
  linkCount: links.size,
  assetCount: assets.size,
};
await fs.mkdir("test-results", { recursive: true });
await fs.writeFile("test-results/routes.json", JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      routes: results.length,
      failures: results.filter(
        (x) =>
          x.status !== 200 ||
          !x.canonical ||
          !x.hasH1 ||
          x.oldTrial ||
          x.ctaTrial.length > 0 ||
          x.announcement,
      ),
      badLinks,
      unknown,
      og,
      linkCount: links.size,
      assetCount: assets.size,
    },
    null,
    2,
  ),
);

if(results.some(x=>x.status!==200||!x.canonical||!x.hasH1||x.oldTrial||x.ctaTrial.length>0||x.announcement)||badLinks.length||unknown.some(x=>x.status!==404)||og.some(x=>x.status!==200||!String(x.type).startsWith("image/png")))process.exitCode=1;
