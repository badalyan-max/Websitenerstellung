/**
 * Brotkrumen (Phase 8, Plan 08-02; 08-UI-SPEC § 1, G6; D-07, D-20, D-22; C1, C10):
 * crumbsFor ist die einzige Kettenquelle für sichtbare Brotkrumen und BreadcrumbList. Der Baustein
 * rendert nav/ol/li ohne Client-JavaScript und gibt aus denselben items genau eine BreadcrumbList aus.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { crumbsFor, type Crumb } from "@/lib/breadcrumbs";
import { getContentList } from "@/lib/content";
import { categories } from "@/lib/content-types";
import { funktionen } from "@/lib/funktionen";
import { gewerke } from "@/lib/gewerke";
import { site } from "@/lib/site";

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const count = (html: string, needle: string) => html.split(needle).length - 1;
const toPath = (url: string) => url.slice(site.url.length) || "/";

const titles = new Map(
  [...(await getContentList("blog")), ...(await getContentList("hilfe"))].map((a) => [`/${a.kind}/${a.slug}`, a.title]),
);
const sitemapPaths = (await sitemap()).map((e) => toPath(e.url)).filter((p) => p !== "/");

describe("crumbsFor – Ketten (UI-SPEC § 1)", () => {
  it("liefert für jede Sitemap-URL außer / 2–4 Glieder, erstes Glied Start, letztes Glied der Pfad", () => {
    expect(sitemapPaths.length).toBeGreaterThan(100);
    const problems: string[] = [];
    for (const path of sitemapPaths) {
      let items: Crumb[];
      try {
        items = crumbsFor(path, titles.get(path));
      } catch (error) {
        problems.push(`${path}: ${(error as Error).message}`);
        continue;
      }
      if (items.length < 2 || items.length > 4) problems.push(`${path}: ${items.length} Glieder`);
      if (items[0].name !== "Start" || items[0].path !== "/") problems.push(`${path}: erstes Glied nicht Start`);
      if (items.at(-1)!.path !== path) problems.push(`${path}: letztes Glied ${items.at(-1)!.path}`);
      for (const item of items.slice(1, -1)) {
        if (Array.from(item.name).length > 32) problems.push(`${path}: Zwischenglied ${item.name} > 32`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("statische Ketten laut Tabelle", () => {
    const names = (path: string) => crumbsFor(path).map((c) => c.name);
    expect(names("/funktionen")).toEqual(["Start", "Funktionen"]);
    expect(names("/app")).toEqual(["Start", "Mobile-App"]);
    expect(names("/preise")).toEqual(["Start", "Preise"]);
    expect(names("/vergleich")).toEqual(["Start", "Vergleich"]);
    expect(names("/vergleich/plancraft-alternative")).toEqual(["Start", "Vergleich", "plancraft-Alternative"]);
    expect(names("/vergleich/craftnote-alternative")).toEqual(["Start", "Vergleich", "Craftnote-Alternative"]);
    expect(names("/vergleich/hero-alternative")).toEqual(["Start", "Vergleich", "HERO-Alternative"]);
    expect(names("/vergleich/tooltime-alternative")).toEqual(["Start", "Vergleich", "ToolTime-Alternative"]);
    expect(names("/vergleich/handwerkersoftware-kleine-betriebe")).toEqual(["Start", "Vergleich", "Für kleine Betriebe"]);
    expect(names("/fakten-ueber-craftos")).toEqual(["Start", "Fakten zu CraftOS"]);
    expect(names("/craft-ai")).toEqual(["Start", "Craft AI"]);
    expect(names("/gobd")).toEqual(["Start", "GoBD"]);
    expect(names("/gewerke")).toEqual(["Start", "Gewerke"]);
    expect(names("/blog")).toEqual(["Start", "Ratgeber"]);
    expect(names("/hilfe")).toEqual(["Start", "Hilfe"]);
    expect(names("/rechner")).toEqual(["Start", "Rechner"]);
    expect(names("/rechner/stundensatz")).toEqual(["Start", "Rechner", "Stundensatz"]);
    expect(names("/rechner/angebotskalkulation")).toEqual(["Start", "Rechner", "Angebotskalkulation"]);
    expect(names("/support")).toEqual(["Start", "Kontakt"]);
    expect(names("/impressum")).toEqual(["Start", "Impressum"]);
    expect(names("/datenschutz")).toEqual(["Start", "Datenschutz"]);
    expect(names("/agb")).toEqual(["Start", "AGB"]);
  });

  it("dynamische Ketten mit Namen aus lib/funktionen, lib/gewerke und den Kategorien", () => {
    const aufmass = funktionen.find((f) => f.slug === "aufmass")!;
    expect(crumbsFor("/funktionen/aufmass")).toEqual([
      { name: "Start", path: "/" },
      { name: "Funktionen", path: "/funktionen" },
      { name: aufmass.name, path: "/funktionen/aufmass" },
    ]);
    const elektriker = gewerke.find((g) => g.slug === "elektriker")!;
    expect(crumbsFor("/gewerke/elektriker").map((c) => c.name)).toEqual(["Start", "Gewerke", elektriker.name]);
    expect(crumbsFor("/hilfe/kategorie/rechnungen")).toEqual([
      { name: "Start", path: "/" },
      { name: "Hilfe", path: "/hilfe" },
      { name: categories.hilfe.rechnungen, path: "/hilfe/kategorie/rechnungen" },
    ]);
    expect(crumbsFor("/blog/kategorie/kalkulation").map((c) => c.name)).toEqual(["Start", "Ratgeber", "Angebote & Kalkulation"]);
  });

  it("Artikel: Titel als current, Kategorie nicht in der Kette (3 Glieder)", () => {
    expect(crumbsFor("/blog/handwerkersoftware-auswaehlen", "Mein Titel")).toEqual([
      { name: "Start", path: "/" },
      { name: "Ratgeber", path: "/blog" },
      { name: "Mein Titel", path: "/blog/handwerkersoftware-auswaehlen" },
    ]);
    expect(() => crumbsFor("/blog/handwerkersoftware-auswaehlen")).toThrow(/Artikeltitel/);
  });

  it("unbekannte Pfade werfen den Fehlertext aus dem UI-SPEC", () => {
    expect(() => crumbsFor("/unbekannt")).toThrow(
      "Breadcrumbs: Pfad /unbekannt hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.",
    );
    expect(() => crumbsFor("/funktionen/gibt-es-nicht")).toThrow(
      "Breadcrumbs: Pfad /funktionen/gibt-es-nicht hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.",
    );
    expect(() => crumbsFor("/blog/kategorie/gibt-es-nicht")).toThrow(/hat keinen Eintrag/);
    expect(() => crumbsFor("/")).toThrow("Breadcrumbs: Pfad / hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.");
  });
});

const render = (props: Parameters<typeof Breadcrumbs>[0]) => renderToString(createElement(Breadcrumbs, props));
const ldBlocks = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

describe("Breadcrumbs – Baustein (UI-SPEC § 1)", () => {
  const items = crumbsFor("/vergleich/hero-alternative");
  const html = render({ items, tone: "dark" });

  it("nav mit aria-label Brotkrumen, data-tone und ol/li", () => {
    expect(count(html, 'aria-label="Brotkrumen"')).toBe(1);
    expect(html).toMatch(/<nav[^>]*aria-label="Brotkrumen"[^>]*data-tone="dark"|<nav[^>]*data-tone="dark"[^>]*aria-label="Brotkrumen"/);
    expect(count(html, "<ol")).toBe(1);
    expect(count(html, "<li")).toBe(3);
  });

  it("n−1 Links, genau ein aria-current, n−1 Trenner aria-hidden", () => {
    const nav = html.match(/<nav[\s\S]*?<\/nav>/)![0];
    const links = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    expect(links.map((l) => [l[1], text(l[2])])).toEqual([
      ["/", "Start"],
      ["/vergleich", "Vergleich"],
    ]);
    expect(count(nav, 'aria-current="page"')).toBe(1);
    expect(nav).toMatch(/<span[^>]*aria-current="page"[^>]*>HERO-Alternative<\/span>/);
    expect(count(nav, "<svg")).toBe(2);
    expect(count(nav, 'aria-hidden="true"')).toBe(2);
  });

  it("schema=true: genau eine BreadcrumbList aus denselben Gliedern", () => {
    const lists = ldBlocks(html).filter((b) => b["@type"] === "BreadcrumbList");
    expect(lists).toHaveLength(1);
    expect(lists[0].itemListElement.map((e: { name: string; item: string }) => [e.name, e.item])).toEqual(
      items.map((c) => [c.name, site.url + c.path]),
    );
  });

  it("schema=false: kein JSON-LD, tone light als data-tone", () => {
    const ohne = render({ items, tone: "light", schema: false });
    expect(ohne).not.toContain("application/ld+json");
    expect(ohne).toContain('data-tone="light"');
    expect(count(ohne, 'aria-label="Brotkrumen"')).toBe(1);
  });

  it("1 oder 5 Glieder werfen den Mengenfehler", () => {
    expect(() => render({ items: [{ name: "Start", path: "/" }], tone: "dark" })).toThrow(
      "Breadcrumbs: 1 Glieder – 2 bis 4 erlaubt.",
    );
    const fuenf = ["/", "/a", "/b", "/c", "/d"].map((p, i) => ({ name: `Glied ${i}`, path: p }));
    expect(() => render({ items: fuenf, tone: "dark" })).toThrow("Breadcrumbs: 5 Glieder – 2 bis 4 erlaubt.");
  });

  it("Zwischenglied über 32 Zeichen wirft den Budgetfehler; letztes Glied ohne Budget", () => {
    const lang = "x".repeat(33);
    expect(() =>
      render({
        items: [
          { name: "Start", path: "/" },
          { name: lang, path: "/x" },
          { name: "Ende", path: "/x/y" },
        ],
        tone: "light",
      }),
    ).toThrow("Textbudget überschritten: crumb.name hat 33 von 32 Zeichen – Satz kürzen.");
    expect(() =>
      render({
        items: [
          { name: "Start", path: "/" },
          { name: lang, path: "/x" },
        ],
        tone: "light",
      }),
    ).not.toThrow();
  });

  it("Seiten mit PageHero bzw. ContentIndex: genau eine nav und genau eine BreadcrumbList aus crumbsFor (08-02 Task 2)", async () => {
    const seiten: [string, () => Promise<string>][] = [
      ["/gewerke", async () => renderToString(createElement((await import("@/app/gewerke/page")).default))],
      [
        "/gewerke/elektriker",
        async () =>
          renderToString(await (await import("@/app/gewerke/[slug]/page")).default({ params: Promise.resolve({ slug: "elektriker" }) })),
      ],
      // 10-03 (K-2): /support ist async (Mengenangaben aus lib/content) und wird wie oben per await gerendert.
      ["/support", async () => renderToString(await (await import("@/app/support/page")).default())],
      ["/preise", async () => renderToString(createElement((await import("@/app/preise/page")).default))],
      ["/vergleich", async () => renderToString(createElement((await import("@/app/vergleich/page")).default))],
      ["/fakten-ueber-craftos", async () => renderToString(createElement((await import("@/app/fakten-ueber-craftos/page")).default))],
      ["/craft-ai", async () => renderToString(createElement((await import("@/app/craft-ai/page")).default))],
      ["/gobd", async () => renderToString(createElement((await import("@/app/gobd/page")).default))],
      [
        "/blog",
        async () => renderToString(await (await import("@/components/content/ContentIndex")).ContentIndex({ kind: "blog" })),
      ],
      [
        "/hilfe/kategorie/rechnungen",
        async () =>
          renderToString(
            await (await import("@/components/content/ContentIndex")).ContentIndex({ kind: "hilfe", category: "rechnungen" }),
          ),
      ],
    ];
    const problems: string[] = [];
    for (const [path, rendern] of seiten) {
      const seite = await rendern();
      const navs = count(seite, 'aria-label="Brotkrumen"');
      const lists = ldBlocks(seite).flatMap((b) => (Array.isArray(b["@graph"]) ? b["@graph"] : [b])).filter((b) => b["@type"] === "BreadcrumbList");
      if (navs !== 1) problems.push(`${path}: ${navs} nav`);
      if (lists.length !== 1) {
        problems.push(`${path}: ${lists.length} BreadcrumbList`);
        continue;
      }
      const erwartet = crumbsFor(path).map((c) => [c.name, site.url + c.path]);
      const ist = lists[0].itemListElement.map((e: { name: string; item: string }) => [e.name, e.item]);
      if (JSON.stringify(ist) !== JSON.stringify(erwartet)) problems.push(`${path}: Glieder ${JSON.stringify(ist)}`);
      const nav = seite.indexOf('aria-label="Brotkrumen"');
      if (nav > seite.indexOf("<h1")) problems.push(`${path}: Brotkrumen nach der H1`);
    }
    expect(problems).toEqual([]);
  });

  it("kein Client-JavaScript: Baustein ohne use client", async () => {
    const { readFileSync } = await import("node:fs");
    const source = readFileSync("components/v2/Breadcrumbs.tsx", "utf8");
    expect(source).not.toContain('"use client"');
    expect(source).toContain("breadcrumbSchema(items)");
  });
});
