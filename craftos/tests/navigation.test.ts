/**
 * Hauptnavigation (Phase 6, Plan 06-03, D-05, D-06, D-07, D-11, D-13, D-17):
 * Navigationsmodell, Zielprüfung gegen die Sitemap, server-gerendertes Mega-Menü und ActiveLink.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const pfad = vi.hoisted(() => ({ value: "/funktionen/zeiterfassung" }));
vi.mock("next/navigation", () => ({ usePathname: () => pfad.value }));

import sitemap from "@/app/sitemap";
import { ActiveLink } from "@/components/layout/ActiveLink";
import { LinkPanel, MegaMenu } from "@/components/layout/MegaMenu";
import { funktionen } from "@/lib/funktionen";
import { GRUPPEN_REIHENFOLGE, getFunktionsgruppen, menuFooterLinks } from "@/lib/funktionsgruppen";
import { checkNavigationTargets, getHauptnavigation } from "@/lib/navigation";

const gruppen = getFunktionsgruppen();
const decode = (html: string) =>
  html.replace(/<!-- -->/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

/** Alle `<a>` mit Ziel und Linktext in Dokumentreihenfolge. */
function links(html: string): { href: string; text: string; tag: string }[] {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: /href="([^"]*)"/.exec(m[1])?.[1] ?? "",
    text: decode(m[2].replace(/<[^>]+>/g, "")).trim(),
    tag: m[1],
  }));
}

async function sitemapPfade(): Promise<Set<string>> {
  return new Set((await sitemap()).map((e) => new URL(e.url).pathname));
}

describe("navigation: Hauptpunkte", () => {
  const nav = getHauptnavigation();

  it("liefert fünf Hauptpunkte in der Reihenfolge Funktionen, Gewerke, Preise, Wissen, Hilfe", () => {
    expect(nav.map((n) => [n.id, n.label, n.href])).toEqual([
      ["funktionen", "Funktionen", "/funktionen"],
      ["gewerke", "Gewerke", "/gewerke"],
      ["preise", "Preise", "/preise"],
      ["wissen", "Wissen", "/blog"],
      ["hilfe", "Hilfe", "/hilfe"],
    ]);
    expect(nav.map((n) => n.matchPrefixes)).toEqual([["/funktionen"], ["/gewerke"], ["/preise"], ["/blog", "/rechner"], ["/hilfe"]]);
  });

  it("Funktionen hat das Mega-Menü, Preise kein Panel, Gewerke 13 Links zweispaltig, Wissen beginnt mit Ratgeber", () => {
    const [funk, gewerke, preise, wissen, hilfe] = nav;
    expect(funk.panel).toEqual({ kind: "funktionen" });
    expect(preise.panel).toBeNull();
    if (gewerke.panel?.kind !== "links") throw new Error("Gewerke ohne Link-Panel");
    expect(gewerke.panel.links).toHaveLength(13);
    expect(gewerke.panel.links[0]).toEqual({ label: "Alle Gewerke", href: "/gewerke" });
    expect(gewerke.panel.columns).toBe(2);
    if (wissen.panel?.kind !== "links") throw new Error("Wissen ohne Link-Panel");
    expect(wissen.panel.links[0]).toEqual({ label: "Ratgeber", href: "/blog" });
    expect(wissen.panel.links.map((l) => l.href)).toEqual(["/blog", "/rechner", "/rechner/stundensatz", "/rechner/angebotskalkulation"]);
    if (hilfe.panel?.kind !== "links") throw new Error("Hilfe ohne Link-Panel");
    expect(hilfe.panel.links).toEqual([
      { label: "Hilfezentrum", href: "/hilfe" },
      { label: "Kontakt & Support", href: "/support" },
    ]);
  });
});

describe("navigation: Zielprüfung", () => {
  it("jedes Menüziel ist eine Route der Sitemap oder ein Gruppenanker auf /funktionen", async () => {
    const routes = await sitemapPfade();
    const hrefs = [
      ...getHauptnavigation().flatMap((n) => [n.href, ...(n.panel?.kind === "links" ? n.panel.links.map((l) => l.href) : [])]),
      ...gruppen.flatMap((g) => [g.anchorHref, ...g.details.map((d) => d.href)]),
      ...menuFooterLinks.map((l) => l.href),
    ];
    expect(hrefs.length).toBeGreaterThan(40);
    expect(checkNavigationTargets(hrefs, routes)).toEqual([]);
  });

  it("jedes Linkziel der Zusatzfunktionen (extras[].target.href) ist eine Route oder ein Hilfeartikel der Sitemap", async () => {
    const routes = await sitemapPfade();
    const extras = gruppen.flatMap((g) => g.extras.flatMap((x) => (x.target ? [x.target.href] : [])));
    // 06-REVIEW WR-04: Ziele werden auf /funktionen als Link gerendert; ein umbenannter Hilfeartikel muss hier auffallen.
    // Phase 7 (07-UI-SPEC Zusatzliste, D-21): 7 Ziele auf Funktions-Detailseiten, „21 Sprachen“ auf /app.
    expect(extras).toHaveLength(8);
    expect(extras.filter((href) => href.startsWith("/funktionen/")).length).toBe(7);
    expect(extras.filter((href) => href === "/app")).toHaveLength(1);
    for (const href of extras) expect(routes.has(href), href).toBe(true);
    expect(checkNavigationTargets(extras, routes)).toEqual([]);
  });

  it("meldet ein ungültiges Ziel mit dem UI-SPEC-Fehlertext", async () => {
    const routes = await sitemapPfade();
    expect(checkNavigationTargets(["/gibt-es-nicht"], routes)).toEqual([
      "Menü: Ziel /gibt-es-nicht ist keine Route der Sitemap – Ziel in lib/funktionsgruppen.ts korrigieren oder Link entfernen.",
    ]);
    expect(checkNavigationTargets(["/funktionen#unbekannt", "/preise#angebot"], routes)).toHaveLength(2);
  });
});

describe("navigation: MegaMenu (Server-Rendering)", () => {
  pfad.value = "/funktionen/zeiterfassung";
  const html = renderToString(createElement(MegaMenu, { groups: gruppen, footerLinks: menuFooterLinks }));
  const alle = links(html);

  it("hat kein Menü-Rollenmodell und keine Überschriften", () => {
    expect(html).not.toMatch(/role="menu|role="menuitem|role="menubar/);
    expect(html).not.toMatch(/<h[1-6]\b/);
  });

  it("verlinkt die sechs Gruppen in Reihenfolge auf /funktionen#<gruppe>", () => {
    const anker = alle.filter((l) => l.href.startsWith("/funktionen#")).map((l) => l.href);
    expect(anker).toEqual(GRUPPEN_REIHENFOLGE.map((id) => `/funktionen#${id}`));
    for (const g of gruppen) expect(alle.find((l) => l.href === g.anchorHref)?.text).toBe(g.label);
  });

  it("enthält jede der 22 Detailfunktionen genau einmal mit dem Funktionsnamen als Linktext", () => {
    expect(funktionen).toHaveLength(22);
    for (const f of funktionen) {
      const treffer = alle.filter((l) => l.href === `/funktionen/${f.slug}`);
      expect(treffer, f.slug).toHaveLength(1);
      expect(treffer[0].text).toBe(f.name);
    }
  });

  it("endet mit den fünf Fußleistenlinks in Reihenfolge", () => {
    expect(alle.slice(-5).map((l) => [l.text, l.href])).toEqual(menuFooterLinks.map((l) => [l.label, l.href]));
  });

  it("zeigt Gruppen-Icons dekorativ, Kurzbeschreibungen und verschachtelte Listen", () => {
    const icons = html.match(/<span[^>]*aria-hidden="true"[^>]*><svg/g) ?? [];
    expect(icons).toHaveLength(6);
    for (const g of gruppen) expect(decode(html)).toContain(g.description);
    expect(html).toMatch(/^<div[^>]*><ul[^>]*><li[^>]*>/);
    expect((html.match(/<ul\b/g) ?? []).length).toBe(1 + gruppen.length + 1);
    expect(html).not.toMatch(/<img\b/);
  });

  it("setzt prefetch-freie Links und markiert die aktuelle Detailseite", () => {
    const zeit = alle.find((l) => l.href === "/funktionen/zeiterfassung");
    expect(zeit?.tag).toContain('aria-current="page"');
    expect(alle.filter((l) => /aria-current="page"/.test(l.tag))).toHaveLength(1);
  });

  it("LinkPanel rendert eine Liste aus Links, zweispaltig markiert", () => {
    const panel = renderToString(
      createElement(LinkPanel, { links: [{ label: "Alle Gewerke", href: "/gewerke" }, { label: "Elektriker", href: "/gewerke/elektriker" }], columns: 2 }),
    );
    expect(panel).toMatch(/^<ul[^>]*data-columns="2"/);
    expect(links(panel).map((l) => l.href)).toEqual(["/gewerke", "/gewerke/elektriker"]);
  });
});

describe("navigation: ActiveLink", () => {
  const render = (href: string) => renderToString(createElement(ActiveLink, { href } as Parameters<typeof ActiveLink>[0], "Ziel"));

  it("setzt aria-current bei exakter Übereinstimmung, auch mit abschließendem Schrägstrich im Pfad", () => {
    pfad.value = "/funktionen/zeiterfassung";
    expect(render("/funktionen/zeiterfassung")).toContain('aria-current="page"');
    pfad.value = "/funktionen/zeiterfassung/";
    expect(render("/funktionen/zeiterfassung")).toContain('aria-current="page"');
  });

  it("markiert Ankerlinks und übergeordnete Seiten nie als aktuell", () => {
    pfad.value = "/funktionen/zeiterfassung";
    expect(render("/funktionen#baustelle")).not.toContain("aria-current");
    expect(render("/funktionen")).not.toContain("aria-current");
    pfad.value = "/funktionen";
    expect(render("/funktionen#baustelle")).not.toContain("aria-current");
  });
});
