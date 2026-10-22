// Live- bzw. Lokalprüfung des ausgelieferten Stands per Node-fetch (curl/WebFetch werden in dieser
// Umgebung umgeleitet). Prüft Preise, Ankündigungsfreiheit, Styleguide-Schutz und JSON-LD (Phase 5)
// sowie Startseite, Mega-Menü und /funktionen nach docs/seo/keyword-map.json (Phase 6) und
// /app und alle Detailseiten (Keyword-Map, JSON-LD inkl. MobileApplication, Kennzeichnung,
// interne Belegpfade, llms.txt; Phase 7).
//   node scripts/live-check.mjs                                  # gegen https://craftos.eu
//   LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs  # gegen lokalen Produktionsserver
// Ausgabe je Prüfung „OK“ oder „FEHLER“; exitCode 1, sobald eine Prüfung fehlschlägt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findType, headTags, jsonLd, plain } from "./lib/seo-audit-core.mjs";

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

// ---------------------------------------------------------------------------------------------
// Phase 6: Startseite, Mega-Menü und /funktionen. Zielwerte stammen aus docs/seo/keyword-map.json,
// die Detail-Slugs aus /sitemap.xml (URLs /funktionen/<slug>).
// ---------------------------------------------------------------------------------------------
const keywordMap = JSON.parse(fs.readFileSync(path.join(root, "docs/seo/keyword-map.json"), "utf8"));
const kmEntries = Array.isArray(keywordMap) ? keywordMap : keywordMap.pages || keywordMap.entries || [];
const target = (route) => {
  const entry = kmEntries.find((e) => e.path === route);
  if (!entry) throw new Error(`keyword-map.json ohne Eintrag für ${route}`);
  return entry.target;
};

async function detailSlugs() {
  const r = await get("/sitemap.xml");
  if (r.status !== 200) throw new Error(`/sitemap.xml HTTP ${r.status}`);
  const slugs = [...r.text.matchAll(/<loc>[^<]*\/funktionen\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);
  if (slugs.length === 0) throw new Error("keine Detailseiten /funktionen/<slug> in der Sitemap");
  return [...new Set(slugs)];
}

// Phase 7: dieselbe Prüfung zusätzlich für /app und alle Detailseiten aus der Sitemap.
const detailPfade = await detailSlugs()
  .then((slugs) => slugs.map((s) => `/funktionen/${s}`))
  .catch((err) => {
    report(false, "Detailseiten aus /sitemap.xml lesen", err instanceof Error ? err.message : String(err));
    return [];
  });

for (const route of ["/", "/funktionen", "/app", ...detailPfade]) {
  await check(`${route} Title, H1 und Description nach Keyword-Map`, async () => {
    const r = await get(route);
    if (r.status !== 200) return `HTTP ${r.status}`;
    const t = target(route);
    const ist = headTags(r.text);
    const abw = [];
    if (ist.title !== t.title) abw.push(`Title „${ist.title}“`);
    if (ist.h1s.length !== 1) abw.push(`${ist.h1s.length} H1`);
    else if (ist.h1s[0] !== t.h1) abw.push(`H1 „${ist.h1s[0]}“`);
    if (ist.description !== t.description) abw.push(`Description „${ist.description}“`);
    return abw.length === 0 || abw.join("; ");
  });
}

const gruppenReihenfolge = ["angebot", "planung", "baustelle", "rechnung", "buchhaltung", "team"];

await check("/funktionen zeigt 30 Funktionen in 6 Gruppen mit BreadcrumbList und ItemList", async () => {
  const r = await get("/funktionen");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const anzahl = (r.text.match(/data-funktion="/g) || []).length;
  if (anzahl !== 30) return `${anzahl} statt 30 data-funktion`;
  const gruppen = [...r.text.matchAll(/data-gruppe="([^"]+)"/g)].map((m) => m[1]);
  if (gruppen.join(",") !== gruppenReihenfolge.join(",")) return `Gruppen ${gruppen.join(",")}`;
  const ld = jsonLd(r.text);
  if (findType(ld, "BreadcrumbList").length === 0) return "BreadcrumbList fehlt";
  const lists = findType(ld, "ItemList");
  if (lists.length === 0) return "ItemList fehlt";
  const slugs = await detailSlugs();
  const items = findType(lists, "ListItem").length;
  return items === slugs.length || `ItemList mit ${items} ListItems, Sitemap nennt ${slugs.length} Detailseiten`;
});

await check("Mega-Menü im HTML (Detaillinks, Gruppenlinks, kein role=menu)", async () => {
  const r = await get("/");
  if (r.status !== 200) return `HTTP ${r.status}`;
  if (!r.text.includes('aria-controls="navigation-funktionen"')) return 'aria-controls="navigation-funktionen" fehlt';
  if (r.text.includes('role="menu"')) return 'role="menu" gefunden';
  const slugs = await detailSlugs();
  const fehlt = [
    ...slugs.map((s) => `href="/funktionen/${s}"`),
    ...gruppenReihenfolge.map((g) => `href="/funktionen#${g}"`),
  ].filter((n) => !r.text.includes(n));
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

await check("Tracking-Attribute: Anmelden mit data-track=login, CTA auf app.craftos.eu ohne", async () => {
  const r = await get("/");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const links = [...r.text.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({ attrs: m[1], text: plain(m[2]) }));
  const anmelden = links.filter((l) => l.text === "Anmelden");
  if (anmelden.length === 0) return "kein Link „Anmelden“";
  if (anmelden.some((l) => !l.attrs.includes('data-track="login"'))) return "„Anmelden“ ohne data-track=\"login\"";
  const app = links.filter(
    (l) => /href="https:\/\/app\.craftos\.eu[^"]*"/.test(l.attrs) && !l.attrs.includes('data-track="login"'),
  );
  return app.length > 0 || "kein Link auf https://app.craftos.eu ohne data-track=\"login\"";
});

await check("Keine internen Belegpfade auf / und /funktionen", async () => {
  for (const route of ["/", "/funktionen"]) {
    const r = await get(route);
    if (r.status !== 200) return `${route} HTTP ${r.status}`;
    if (r.text.includes('data-evidence="web:src') || r.text.includes('data-evidence="mobile:')) {
      return `${route} enthält internen Belegpfad`;
    }
  }
  return true;
});

await check("FAQPage der Startseite mit genau 5 Fragen", async () => {
  const r = await get("/");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const faq = findType(jsonLd(r.text), "FAQPage");
  if (faq.length !== 1) return `${faq.length} FAQPage-Blöcke`;
  const fragen = findType(faq[0], "Question").length;
  return fragen === 5 || `${fragen} Question statt 5`;
});

// ---------------------------------------------------------------------------------------------
// Phase 7: Detailseiten und /app. Detailpfade aus /sitemap.xml, Sollmenge aus docs/seo/keyword-map.json.
// ---------------------------------------------------------------------------------------------
const kennzeichnung = "Vereinfachte Darstellung mit Beispieldaten";
const interneMuster = [
  'data-evidence="web:src',
  'data-evidence="mobile:',
  'data-source="tarife',
  'data-source="product-register',
  'data-source="site.',
];

await check("Alle bestehenden Detailseiten in der Sitemap", async () => {
  const soll = kmEntries
    .filter((e) => typeof e.path === "string" && /^\/funktionen\/[a-z0-9-]+$/.test(e.path) && e.status === "bestehend")
    .map((e) => e.path);
  if (soll.length === 0) return "keyword-map.json ohne bestehende Detailseiten";
  const ist = new Set(detailPfade);
  const fehlt = soll.filter((s) => !ist.has(s));
  const extra = detailPfade.filter((s) => !soll.includes(s));
  if (fehlt.length || extra.length) {
    return [fehlt.length && `fehlt in der Sitemap: ${fehlt.join(", ")}`, extra.length && `nicht in der Keyword-Map: ${extra.join(", ")}`]
      .filter(Boolean)
      .join("; ");
  }
  return true;
});

await check(`JSON-LD der Detailseiten (BreadcrumbList 3, FAQPage ≥ 3, WebPage #webpage, kein HowTo)`, async () => {
  if (detailPfade.length === 0) return "keine Detailseiten";
  const abw = [];
  for (const route of detailPfade) {
    const r = await get(route);
    if (r.status !== 200) {
      abw.push(`${route} HTTP ${r.status}`);
      continue;
    }
    const ld = jsonLd(r.text);
    const crumbs = findType(ld, "BreadcrumbList");
    const crumbItems = crumbs.length === 1 ? findType(crumbs[0], "ListItem").length : -1;
    if (crumbItems !== 3) abw.push(`${route} BreadcrumbList ${crumbs.length === 1 ? `${crumbItems} ListItems` : `${crumbs.length} Blöcke`}`);
    const faq = findType(ld, "FAQPage");
    const fragen = faq.length === 1 ? findType(faq[0], "Question").length : 0;
    if (faq.length !== 1 || fragen < 3) abw.push(`${route} FAQPage ${faq.length} Blöcke, ${fragen} Question`);
    const webpage = findType(ld, "WebPage").filter((w) => typeof w["@id"] === "string" && w["@id"].endsWith(`${route}#webpage`));
    if (webpage.length !== 1) abw.push(`${route} WebPage mit @id …${route}#webpage fehlt`);
    if (findType(ld, "HowTo").length > 0) abw.push(`${route} enthält HowTo`);
  }
  return abw.length === 0 || abw.join("; ");
});

await check("JSON-LD der App-Seite: MobileApplication ohne Bewertungen, FAQPage, BreadcrumbList 2", async () => {
  const r = await get("/app");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const ld = jsonLd(r.text);
  const apps = findType(ld, "MobileApplication");
  if (apps.length !== 1) return `${apps.length} MobileApplication-Blöcke`;
  if ("aggregateRating" in apps[0] || "review" in apps[0]) return "MobileApplication mit aggregateRating oder review";
  if (findType(ld, "AggregateRating").length > 0 || findType(ld, "Review").length > 0) return "Bewertungen im JSON-LD";
  if (findType(ld, "FAQPage").length !== 1) return "FAQPage fehlt";
  const crumbs = findType(ld, "BreadcrumbList");
  if (crumbs.length !== 1) return `${crumbs.length} BreadcrumbList-Blöcke`;
  const items = findType(crumbs[0], "ListItem").length;
  return items === 2 || `BreadcrumbList mit ${items} ListItems statt 2`;
});

await check("Keine internen Belegpfade oder Modulnamen auf /, /funktionen, /app und allen Detailseiten", async () => {
  const abw = [];
  for (const route of ["/", "/funktionen", "/app", ...detailPfade]) {
    const r = await get(route);
    if (r.status !== 200) {
      abw.push(`${route} HTTP ${r.status}`);
      continue;
    }
    const treffer = interneMuster.filter((m) => r.text.includes(m));
    if (treffer.length) abw.push(`${route}: ${treffer.join(", ")}`);
  }
  return abw.length === 0 || abw.join("; ");
});

await check(`Kennzeichnung der Darstellungen auf /app und allen Detailseiten („${kennzeichnung}“)`, async () => {
  const fehlt = [];
  for (const route of ["/app", ...detailPfade]) {
    const r = await get(route);
    if (r.status !== 200 || !r.text.includes(kennzeichnung)) fehlt.push(r.status === 200 ? route : `${route} HTTP ${r.status}`);
  }
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

await check("llms.txt nennt alle Detailseiten und /app", async () => {
  const r = await get("/llms.txt");
  if (r.status !== 200) return `HTTP ${r.status}`;
  if (detailPfade.length === 0) return "keine Detailseiten";
  const fehlt = [...detailPfade, "/app"].filter((pfad) => !r.text.includes(`${pfad})`));
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

console.log(fehler === 0 ? "Ergebnis: alle Prüfungen OK" : `Ergebnis: ${fehler} Prüfung(en) FEHLER`);
process.exitCode = fehler === 0 ? 0 : 1;
