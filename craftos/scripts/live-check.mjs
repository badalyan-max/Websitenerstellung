// Live- bzw. Lokalprüfung des ausgelieferten Stands per Node-fetch (curl/WebFetch werden in dieser
// Umgebung umgeleitet). Prüft Preise, Ankündigungsfreiheit, Styleguide-Schutz und JSON-LD.
//   node scripts/live-check.mjs                                  # gegen https://craftos.eu
//   LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs  # gegen lokalen Produktionsserver
// Ausgabe je Prüfung „OK“ oder „FEHLER“; exitCode 1, sobald eine Prüfung fehlschlägt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const origin = (process.env.LIVE_ORIGIN || "https://craftos.eu").replace(/\/$/, "");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = JSON.parse(fs.readFileSync(path.join(root, "docs/product-pricing-snapshot.json"), "utf8"));
const p = snapshot.pricing;
const euro = (v) => v.toFixed(2).replace(".", ",") + " €";

// Gleiches Muster wie tests/announcements.test.ts (content) und scripts/route-audit.mjs.
const announcement = /Geplant:|Demnächst in CraftOS|Telefon-Agent|MCP-Server|(September|Oktober|November) 2026 geplant/;

const cache = new Map();
async function get(route) {
  if (!cache.has(route)) {
    cache.set(
      route,
      (async () => {
        const res = await fetch(origin + route, { redirect: "follow", signal: AbortSignal.timeout(20000) });
        return { status: res.status, headers: res.headers, text: await res.text() };
      })(),
    );
  }
  return cache.get(route);
}

let fehler = 0;
function report(ok, name, detail = "") {
  if (!ok) fehler++;
  console.log(`${ok ? "OK    " : "FEHLER"} ${name}${detail ? ` – ${detail}` : ""}`);
}

async function check(name, fn) {
  try {
    const result = await fn();
    if (result === true) report(true, name);
    else report(false, name, typeof result === "string" ? result : "Bedingung nicht erfüllt");
  } catch (err) {
    report(false, name, err instanceof Error ? err.message : String(err));
  }
}

const missing = (text, needles) => needles.filter((n) => !text.includes(n));

console.log(`Live-Prüfung gegen ${origin}`);

await check("/llms.txt nennt Extra-Speicher, Start-Credits, einmalig und alle Paketpreise", async () => {
  const r = await get("/llms.txt");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const fehlt = missing(r.text, [
    euro(p.EXTRA_STORAGE_PRICE_MONTHLY),
    `${p.ADMIN_FREE_CREDITS} Credits`,
    "einmalig",
    ...snapshot.creditPackages.map((c) => euro(c.amount)),
  ]);
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

for (const route of ["/funktionen", "/craft-ai", "/vergleich", "/fakten-ueber-craftos"]) {
  await check(`${route} ohne Ankündigung`, async () => {
    const r = await get(route);
    if (r.status !== 200) return `HTTP ${r.status}`;
    const m = r.text.match(announcement);
    return !m || `Treffer „${m[0]}“`;
  });
}

await check("/preise nennt Extra-Speicher und Start-Credits", async () => {
  const r = await get("/preise");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const fehlt = missing(r.text, ["Extra-Speicher", String(p.ADMIN_FREE_CREDITS)]);
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

await check("/styleguide 200 mit meta robots noindex und X-Robots-Tag", async () => {
  const r = await get("/styleguide");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const meta = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(r.text);
  const header = (r.headers.get("x-robots-tag") || "").toLowerCase();
  if (!meta) return "meta robots noindex fehlt";
  if (!header.includes("noindex")) return `X-Robots-Tag fehlt oder ohne noindex („${header}“)`;
  return true;
});

await check("/sitemap.xml enthält /styleguide nicht", async () => {
  const r = await get("/sitemap.xml");
  if (r.status !== 200) return `HTTP ${r.status}`;
  if (!r.text.includes("<loc>")) return "keine URLs";
  return !r.text.includes("/styleguide") || "/styleguide in der Sitemap";
});

await check(`JSON-LD Startseite: Offer ${p.ADMIN_MONTHLY.toFixed(2)} ohne Umsatzsteuer`, async () => {
  const r = await get("/");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const blocks = [...r.text.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const ld = blocks.join("\n");
  const fehlt = missing(ld, [`"price":"${p.ADMIN_MONTHLY.toFixed(2)}"`, '"valueAddedTaxIncluded":false']);
  return fehlt.length === 0 || `fehlt im JSON-LD (${blocks.length} Blöcke): ${fehlt.join(", ")}`;
});

await check("/funktionen/kundenportal ohne „In Prüfung“", async () => {
  const r = await get("/funktionen/kundenportal");
  if (r.status !== 200) return `HTTP ${r.status}`;
  return !r.text.includes("In Prüfung") || "„In Prüfung“ gefunden";
});

console.log(fehler === 0 ? "Ergebnis: alle Prüfungen OK" : `Ergebnis: ${fehler} Prüfung(en) FEHLER`);
process.exitCode = fehler === 0 ? 0 : 1;
