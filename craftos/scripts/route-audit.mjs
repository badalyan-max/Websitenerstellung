import fs from "node:fs/promises";
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
    oldTrial: /14 Tage (kostenlos|testen)/i.test(body),
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
]) {
  const r = await fetch(base + p);
  unknown.push({ path: p, status: r.status });
}
const og = [];
for (const p of [
  "/opengraph-image",
  "/blog/handwerkerrechnung-schreiben/opengraph-image",
  "/hilfe/rechnung-fertigstellen/opengraph-image",
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
        (x) => x.status !== 200 || !x.canonical || !x.hasH1 || x.oldTrial,
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

if(results.some(x=>x.status!==200||!x.canonical||!x.hasH1||x.oldTrial)||badLinks.length||unknown.some(x=>x.status!==404)||og.some(x=>x.status!==200))process.exitCode=1;
