// Live- bzw. Lokalprüfung des ausgelieferten Stands per Node-fetch (curl/WebFetch werden in dieser
// Umgebung umgeleitet). Prüft Preise, Ankündigungsfreiheit, Styleguide-Schutz und JSON-LD (Phase 5)
// sowie Startseite, Mega-Menü und /funktionen nach docs/seo/keyword-map.json (Phase 6) und
// /app und alle Detailseiten (Keyword-Map, JSON-LD inkl. MobileApplication, Kennzeichnung,
// interne Belegpfade, llms.txt; Phase 7) sowie sitewide Keyword-Map, Brotkrumen, OG-Bilder, FAQPage,
// /preise, Prompt-Anker und llms.txt der Vergleichsseiten (Phase 8) sowie Gewerke-Antwort und -Ablauf,
// neue Anleitungen, Wissensseiten und deren Verlinkung (Phase 9).
//   node scripts/live-check.mjs                                  # gegen https://craftos.eu
//   LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs  # gegen lokalen Produktionsserver
// Ausgabe je Prüfung „OK“ oder „FEHLER“; exitCode 1, sobald eine Prüfung fehlschlägt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  OG_MAX_BYTES,
  anchorAnswer,
  breadcrumbNav,
  faqFragenSichtbar,
  findType,
  headTags,
  jsonLd,
  pfadVonUrl,
  plain,
  promptVerstoesse,
} from "./lib/seo-audit-core.mjs";

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

// Phase 8: Routenliste um /preise, /gobd, die vier Alternativen und „kleine Betriebe“ erweitert.
const PHASE8_ALTERNATIVEN = [
  "/vergleich/plancraft-alternative",
  "/vergleich/craftnote-alternative",
  "/vergleich/hero-alternative",
  "/vergleich/tooltime-alternative",
];
const KLEINE_BETRIEBE = "/vergleich/handwerkersoftware-kleine-betriebe";
const PHASE8_UMBAU = ["/preise", "/vergleich", "/fakten-ueber-craftos", "/craft-ai", "/gobd"];
const PHASE8_SEITEN = [...PHASE8_UMBAU, ...PHASE8_ALTERNATIVEN, KLEINE_BETRIEBE];

for (const route of [
  "/funktionen",
  "/craft-ai",
  "/vergleich",
  "/fakten-ueber-craftos",
  "/preise",
  "/gobd",
  ...PHASE8_ALTERNATIVEN,
  KLEINE_BETRIEBE,
]) {
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

// ---------------------------------------------------------------------------------------------
// Phase 8: sitewide Metadaten, Brotkrumen und OG-Bilder aller Sitemap-URLs, FAQPage, /preise,
// Prompt-Anker und llms.txt. Pfade aus /sitemap.xml, Zielwerte aus docs/seo/keyword-map.json,
// Prompt-Ziele aus docs/seo/ai-prompts-targets.json (keine fest kodierte Seitenzahl).
// ---------------------------------------------------------------------------------------------
const promptMapping = JSON.parse(fs.readFileSync(path.join(root, "docs/seo/ai-prompts-targets.json"), "utf8"));

const sitemapPfade = await get("/sitemap.xml")
  .then((r) => {
    if (r.status !== 200) throw new Error(`/sitemap.xml HTTP ${r.status}`);
    const pfade = [...new Set([...r.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pfadVonUrl(m[1].trim())))];
    if (pfade.length === 0 || pfade.includes(null)) throw new Error("keine oder ungültige <loc>-Einträge");
    return pfade;
  })
  .catch((err) => {
    report(false, "Sitemap-URLs lesen", err instanceof Error ? err.message : String(err));
    return [];
  });

/** Führt `fn(route, seite)` für jede Route aus und sammelt Abweichungen (HTTP-Fehler zählen mit). */
async function jedeSeite(routen, fn) {
  if (routen.length === 0) return "keine URLs";
  const abw = [];
  for (const route of routen) {
    const r = await get(route);
    if (r.status !== 200) {
      abw.push(`${route} HTTP ${r.status}`);
      continue;
    }
    const problem = await fn(route, r);
    if (problem) abw.push(`${route}: ${problem}`);
  }
  return abw.length === 0 || abw.join("; ");
}

await check(`Keyword-Map aller Sitemap-URLs (${sitemapPfade.length}): Title, einzige H1 und Description = target`, () =>
  jedeSeite(sitemapPfade, (route, r) => {
    const entry = kmEntries.find((e) => e.path === route);
    if (!entry) return "kein Eintrag in keyword-map.json";
    const t = entry.target;
    const ist = headTags(r.text);
    const abw = [];
    if (ist.title !== t.title) abw.push(`Title „${ist.title}“`);
    if (ist.h1s.length !== 1) abw.push(`${ist.h1s.length} H1`);
    else if (ist.h1s[0] !== t.h1) abw.push(`H1 „${ist.h1s[0]}“`);
    if (ist.description !== t.description) abw.push(`Description „${ist.description}“`);
    return abw.join(", ");
  }),
);

const crumbSoll = new Map([
  ...PHASE8_ALTERNATIVEN.map((p) => [p, 3]),
  [KLEINE_BETRIEBE, 3],
  ...PHASE8_UMBAU.map((p) => [p, 2]),
]);

await check("Brotkrumen und BreadcrumbList: genau eine Navigation und ein Schema je URL außer /", () =>
  jedeSeite(
    sitemapPfade.filter((p) => p !== "/"),
    (route, r) => {
      const nav = breadcrumbNav(r.text, route);
      if (nav.count !== 1) return `${nav.count} Brotkrumen-Navigationen`;
      const listen = findType(jsonLd(r.text), "BreadcrumbList");
      if (listen.length !== 1) return `${listen.length} BreadcrumbList-Blöcke`;
      const glieder = findType(listen[0], "ListItem").length;
      if (glieder !== nav.items.length) return `Schema ${glieder} Glieder, sichtbar ${nav.items.length}`;
      const soll = crumbSoll.get(route);
      if (soll !== undefined && glieder !== soll) return `${glieder} statt ${soll} Glieder`;
      return "";
    },
  ),
);

await check("OG je Seite: og:image = <url>/opengraph-image und twitter:image = og:image (außer /)", () =>
  jedeSeite(
    sitemapPfade.filter((p) => p !== "/"),
    (route, r) => {
      const { ogImage, twitterImage } = headTags(r.text);
      if (!ogImage) return "og:image fehlt";
      if (pfadVonUrl(ogImage) !== `${route}/opengraph-image`) return `og:image „${ogImage}“`;
      if (twitterImage !== ogImage) return `twitter:image „${twitterImage}“ ≠ og:image`;
      return "";
    },
  ),
);

await check(`OG je Seite: Stichprobe Alternative, Ratgeber, Rechtsseite → 200, image/png, ≤ ${OG_MAX_BYTES / 1024} KB`, async () => {
  const ratgeber = sitemapPfade.find((p) => p.startsWith("/blog/") && !p.startsWith("/blog/kategorie/"));
  const stichprobe = [PHASE8_ALTERNATIVEN[0], ratgeber, "/impressum"];
  if (stichprobe.includes(undefined)) return "kein Ratgeber in der Sitemap";
  const abw = [];
  for (const route of stichprobe) {
    const seite = await get(route);
    const ogImage = headTags(seite.text).ogImage;
    if (!ogImage) {
      abw.push(`${route}: og:image fehlt`);
      continue;
    }
    const u = new URL(ogImage, origin);
    const res = await fetch(origin + u.pathname + u.search, { signal: AbortSignal.timeout(20000) });
    const bytes = (await res.arrayBuffer()).byteLength;
    const typ = res.headers.get("content-type") || "";
    if (res.status !== 200 || !typ.startsWith("image/png") || bytes > OG_MAX_BYTES) {
      abw.push(`${u.pathname}: HTTP ${res.status}, ${typ}, ${Math.round(bytes / 1024)} KB`);
    }
  }
  return abw.length === 0 || abw.join("; ");
});

await check(`FAQPage = sichtbare Fragen auf den ${PHASE8_SEITEN.length} Phase-8-Seiten`, () =>
  jedeSeite(PHASE8_SEITEN, (route, r) => {
    const faq = findType(jsonLd(r.text), "FAQPage");
    if (faq.length !== 1) return `${faq.length} FAQPage-Blöcke`;
    const { fragen, fehlend } = faqFragenSichtbar(r.text);
    if (fragen.length === 0) return "FAQPage ohne Fragen";
    return fehlend.length ? `nicht sichtbar: ${fehlend.join(" | ")}` : "";
  }),
);

await check("Kein Product/Review/AggregateRating unter /vergleich", () =>
  jedeSeite(
    sitemapPfade.filter((p) => p === "/vergleich" || p.startsWith("/vergleich/")),
    (route, r) => {
      const ld = jsonLd(r.text);
      return ["Product", "Review", "AggregateRating"].filter((t) => findType(ld, t).length > 0).join(", ");
    },
  ),
);

await check("/preise beginnt mit Antwort und Tabelle (#antwort vor der ersten Tabelle, Voll- und App-Lizenz)", async () => {
  const r = await get("/preise");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const antwort = r.text.search(/\sid="antwort"/);
  const tabelle = r.text.search(/<table\b/i);
  if (antwort === -1) return "#antwort fehlt";
  if (tabelle === -1) return "keine Tabelle";
  if (antwort > tabelle) return "#antwort steht nach der ersten Tabelle";
  const text = plain(r.text);
  const fehlt = missing(text, [euro(p.ADMIN_MONTHLY), euro(p.APP_MONTHLY)]);
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

await check("Prompt-Anker live: jedes Ziel bis Phase 8 mit Anker und Antwort ≤ 300", async () => {
  const eintraege = (promptMapping.prompts ?? []).filter((e) => e.phase <= 8);
  if (eintraege.length === 0) return "ai-prompts-targets.json ohne Ziele bis Phase 8";
  const html = new Map();
  for (const e of eintraege) {
    const pfad = e.target.split("#")[0] || "/";
    if (!html.has(pfad)) {
      const r = await get(pfad);
      html.set(pfad, r.status === 200 ? r.text : null);
    }
  }
  // promptVerstoesse meldet fehlende Seiten, Ziele ohne #id, fehlende Anker und Antworten > 300 Zeichen
  // (Anker-Konvention DESIGN-V2.md § 17, gleiche Logik wie seo-audit --only=prompts).
  const verstoesse = promptVerstoesse(eintraege, (pfad) => html.get(pfad));
  return verstoesse.length === 0 || verstoesse.map((v) => v.problem).join("; ");
});

await check("llms.txt nennt die neuen Seiten (vier Alternativen und kleine Betriebe)", async () => {
  const r = await get("/llms.txt");
  if (r.status !== 200) return `HTTP ${r.status}`;
  const fehlt = [...PHASE8_ALTERNATIVEN, KLEINE_BETRIEBE].filter((pfad) => !r.text.includes(`${pfad})`));
  return fehlt.length === 0 || `fehlt: ${fehlt.join(", ")}`;
});

// ---------------------------------------------------------------------------------------------
// Phase 9: Gewerke (Antwort, Ablauf, FAQPage), neue Anleitungen und Wissensseiten, Verlinkung der
// Detailseiten. Gewerke-Pfade aus /sitemap.xml; Phase-9-Pfade aus docs/seo/keyword-map.json
// (`phase: 9`), getrennt nach den Abschnitten „### Wissensseiten“ und „### Anleitungen zu neuen
// Funktionen“ der ausgelieferten /llms.txt (gleiche Quelle wie die Website). Keine Seitenzahl fest kodiert.
// ---------------------------------------------------------------------------------------------
const PHASE9_MAP = kmEntries.filter((e) => e.phase === 9).map((e) => e.path);
const GEWERKE_PFADE = sitemapPfade.filter((p) => p === "/gewerke" || p.startsWith("/gewerke/"));

/** Pfade eines llms.txt-Abschnitts („### Titel“ bis zur nächsten Überschrift). */
function llmsAbschnitt(text, titel) {
  const start = text.indexOf(`### ${titel}`);
  if (start === -1) return [];
  const rest = text.slice(start + titel.length + 4);
  const ende = rest.search(/\n#{2,3} /);
  const teil = ende === -1 ? rest : rest.slice(0, ende);
  return [...teil.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => pfadVonUrl(m[1]));
}
const llms9 = await get("/llms.txt").then((r) => (r.status === 200 ? r.text : ""));
const WISSENSSEITEN = llmsAbschnitt(llms9, "Wissensseiten");
const ANLEITUNGEN = llmsAbschnitt(llms9, "Anleitungen zu neuen Funktionen");

/** Abschnitt `data-abschnitt="<id>"` bis zum nächsten Abschnitt. */
function abschnitt(html, id) {
  const i = html.indexOf(`data-abschnitt="${id}"`);
  if (i === -1) return null;
  const rest = html.slice(i + id.length + 17);
  const ende = rest.search(/data-abschnitt="/);
  return ende === -1 ? rest : rest.slice(0, ende);
}
const ohneHowTo = (html) => (findType(jsonLd(html), "HowTo").length === 0 ? "" : "HowTo im JSON-LD");
function faqGleichSichtbar(html) {
  const faq = findType(jsonLd(html), "FAQPage");
  if (faq.length !== 1) return `${faq.length} FAQPage-Blöcke`;
  const { fragen, fehlend } = faqFragenSichtbar(html);
  if (fragen.length === 0) return "FAQPage ohne Fragen";
  return fehlend.length ? `nicht sichtbar: ${fehlend.join(" | ")}` : "";
}
function antwortAnker(html) {
  const a = anchorAnswer(html, "antwort");
  return a.ok ? "" : a.problem;
}

await check(`Phase-9-Pfade der Keyword-Map (${PHASE9_MAP.length}) = Wissensseiten + Anleitungen in llms.txt, alle in der Sitemap`, () => {
  if (PHASE9_MAP.length === 0) return "keyword-map.json ohne phase 9";
  const llms = new Set([...WISSENSSEITEN, ...ANLEITUNGEN]);
  const abw = [];
  for (const pfad of PHASE9_MAP) {
    if (!llms.has(pfad)) abw.push(`${pfad} fehlt in llms.txt`);
    if (!sitemapPfade.includes(pfad)) abw.push(`${pfad} fehlt in der Sitemap`);
  }
  for (const pfad of llms) if (!PHASE9_MAP.includes(pfad)) abw.push(`${pfad} in llms.txt ohne phase 9`);
  return abw.length === 0 || abw.join("; ");
});

await check(`Phase-9-Seiten ohne Ankündigung (${GEWERKE_PFADE.length} Gewerke-URLs und ${PHASE9_MAP.length} Artikel)`, () =>
  jedeSeite([...GEWERKE_PFADE, ...PHASE9_MAP], (route, r) => {
    const m = r.text.match(announcement);
    return m ? `Treffer „${m[0]}“` : "";
  }),
);

await check(`Gewerke: Antwort und Ablauf (${GEWERKE_PFADE.length} URLs: #antwort ≤ 300; je Gewerk Ablauf mit Funktionslinks und FAQPage = sichtbare Fragen)`, () =>
  jedeSeite(GEWERKE_PFADE, (route, r) => {
    const abw = [antwortAnker(r.text)];
    if (route !== "/gewerke") {
      const ablauf = abschnitt(r.text, "ablauf");
      if (ablauf === null) abw.push('data-abschnitt="ablauf" fehlt');
      else {
        const links = [...ablauf.matchAll(/href="(\/funktionen\/[^"#?]+)"/g)].map((m) => m[1]);
        if (links.length === 0) abw.push("Ablauf ohne Links auf /funktionen/");
        const tot = links.filter((l) => !sitemapPfade.includes(l));
        if (tot.length) abw.push(`Ablauf-Links nicht in der Sitemap: ${tot.join(", ")}`);
      }
      abw.push(faqGleichSichtbar(r.text));
    }
    abw.push(ohneHowTo(r.text));
    return abw.filter(Boolean).join(", ");
  }),
);

await check(`Neue Anleitungen (${ANLEITUNGEN.length}): 200, H1 = Map, #antwort ≤ 300, Schrittliste, kein HowTo`, () =>
  jedeSeite(ANLEITUNGEN, (route, r) => {
    const abw = [antwortAnker(r.text)];
    const { h1s } = headTags(r.text);
    if (h1s.length !== 1 || h1s[0] !== target(route).h1) abw.push(`H1 „${h1s.join(" | ")}“`);
    const i = r.text.indexOf('class="article-prose"');
    const prosa = i === -1 ? "" : r.text.slice(i).split('data-abschnitt="')[0];
    if (!/<ol\b[^>]*>\s*<li\b/.test(prosa)) abw.push("keine Schrittliste im Artikeltext");
    abw.push(ohneHowTo(r.text));
    return abw.filter(Boolean).join(", ");
  }),
);

/** Führt der Artikel Quellen im Frontmatter? (`sources: []` ist bewusst möglich, z. B. Vorlagen ohne Rechtsfakten, 09-g.md) */
function hatQuellen(route) {
  const datei = path.join(root, "content", `${route.replace(/^\//, "")}.md`);
  if (!fs.existsSync(datei)) throw new Error(`${datei} fehlt`);
  const m = fs.readFileSync(datei, "utf8").match(/^sources:[ \t]*(.*)$/m);
  return Boolean(m) && m[1].trim() !== "[]";
}
const WISSEN_MIT_QUELLEN = WISSENSSEITEN.filter(hatQuellen);

await check(
  `Wissensseiten (${WISSENSSEITEN.length}): #antwort ≤ 300, FAQPage = sichtbare Fragen, Quellenliste (${WISSEN_MIT_QUELLEN.length} mit Quellen), kein HowTo`,
  () =>
    jedeSeite(WISSENSSEITEN, (route, r) => {
      const abw = [antwortAnker(r.text), faqGleichSichtbar(r.text), ohneHowTo(r.text)];
      const liste = /<ol aria-label="Quellen">\s*<li\b/.test(r.text);
      if (WISSEN_MIT_QUELLEN.includes(route) && !liste) abw.push("Quellenliste fehlt");
      if (!WISSEN_MIT_QUELLEN.includes(route) && liste) abw.push("Quellenliste ohne Quellen im Artikel");
      return abw.filter(Boolean).join(", ");
    }),
);

// Detailseite → zugehörige Anleitung (09-14; die Anleitung muss als Phase-9-Pfad in der Map stehen).
const DETAIL_ANLEITUNG = [
  ["/funktionen/kundenportal", "/hilfe/kundenportal-kunden-einladen"],
  ["/funktionen/mahnwesen", "/hilfe/mahnwesen-einrichten"],
  ["/funktionen/bankabgleich", "/hilfe/bankumsaetze-abgleichen"],
  ["/funktionen/datenuebernahme", "/hilfe/daten-importieren"],
];
await check(`Detailseiten verlinken Anleitungen (${DETAIL_ANLEITUNG.map(([d]) => d.split("/").pop()).join(", ")})`, () =>
  jedeSeite(
    DETAIL_ANLEITUNG.map(([d]) => d),
    (route, r) => {
      const ziel = DETAIL_ANLEITUNG.find(([d]) => d === route)[1];
      if (!PHASE9_MAP.includes(ziel)) return `${ziel} ist kein Phase-9-Pfad der Map`;
      return r.text.includes(`href="${ziel}"`) ? "" : `kein Link auf ${ziel}`;
    },
  ),
);

await check("Prompt-Anker live: jedes Phase-9-Ziel mit Anker und Antwort ≤ 300", async () => {
  const eintraege = (promptMapping.prompts ?? []).filter((e) => e.phase === 9);
  if (eintraege.length === 0) return "ai-prompts-targets.json ohne Phase-9-Ziele";
  const html = new Map();
  for (const e of eintraege) {
    const pfad = e.target.split("#")[0] || "/";
    if (!html.has(pfad)) {
      const r = await get(pfad);
      html.set(pfad, r.status === 200 ? r.text : null);
    }
  }
  const verstoesse = promptVerstoesse(eintraege, (pfad) => html.get(pfad));
  return verstoesse.length === 0 || verstoesse.map((v) => v.problem).join("; ");
});

console.log(fehler === 0 ? "Ergebnis: alle Prüfungen OK" : `Ergebnis: ${fehler} Prüfung(en) FEHLER`);
process.exitCode = fehler === 0 ? 0 : 1;
