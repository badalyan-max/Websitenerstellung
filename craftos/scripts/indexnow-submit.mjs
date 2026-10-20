// Meldet alle Sitemap-URLs per IndexNow (Bing, Yandex u. a.). Nur nach einem erfolgreichen Deployment starten:
//   npm run indexnow
// Der Schlüssel ist öffentlich und muss unter https://craftos.eu/<key>.txt erreichbar sein.
const host = "craftos.eu";
const key = "6bc96611818999f9f85c88d94cc9efaf";
const keyLocation = `https://${host}/${key}.txt`;

const timeout = () => ({ signal: AbortSignal.timeout(15000) });

const keyFile = await fetch(keyLocation, timeout());
if (!keyFile.ok || (await keyFile.text()).trim() !== key) {
  console.error(`Schlüsseldatei ${keyLocation} fehlt oder stimmt nicht (HTTP ${keyFile.status}).`);
  process.exit(1);
}

const sitemapRes = await fetch(`https://${host}/sitemap.xml`, timeout());
if (!sitemapRes.ok) {
  console.error(`Sitemap nicht abrufbar (HTTP ${sitemapRes.status}).`);
  process.exit(1);
}
const sitemap = await sitemapRes.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (urlList.length === 0) {
  console.error("Sitemap enthält keine URLs.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
  ...timeout(),
});
console.log(`IndexNow: ${urlList.length} URLs gemeldet, HTTP ${res.status}`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
