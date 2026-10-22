import { describe, it, expect, vi } from "vitest";
import fs from "node:fs/promises";
import {
  getContentList,
  getContentArticle,
  parseContent,
  renderMarkdown,
} from "@/lib/content";
import { funktionen } from "@/lib/funktionen";
import { categories } from "@/lib/content-types";
import sitemap from "@/app/sitemap";
import { GET } from "@/app/feed.xml/route";
describe("published content", () => {
  it("contains exactly the complete editorial package", async () => {
    expect(await getContentList("blog")).toHaveLength(24);
    expect(await getContentList("hilfe")).toHaveLength(40);
  });
  it("has valid categories, source metadata and feature links", async () => {
    for (const kind of ["blog", "hilfe"] as const) {
      for (const a of await getContentList(kind)) {
        expect(categories[kind][a.category]).toBeTruthy();
        expect(a.draft).toBe(false);
        expect(a.updatedAt >= a.publishedAt).toBe(true);
        for (const f of a.relatedFeatures)
          expect(
            funktionen.some((x) => x.slug === f),
            a.slug + ":" + f,
          ).toBe(true);
        for (const url of a.relatedArticles) {
          const [, k, s] = url.split("/");
          if (k === "blog" || k === "hilfe")
            expect(await getContentArticle(k, s), url).not.toBeNull();
        }
      }
    }
  });
  it("uses published dates in sitemap and excludes unknown addresses", async () => {
    const list = await sitemap();
    expect(list.every((x) => !(x.lastModified instanceof Date))).toBe(true);
    expect(await getContentArticle("blog", "../../package")).toBeNull();
    expect(await getContentArticle("hilfe", "does-not-exist")).toBeNull();
  });
  it("renders a populated RSS feed without draft entries", async () => {
    const xml = await (await GET()).text();
    expect(xml.match(/<item>/g)).toHaveLength(24);
  });
  it("renders safe HTML and unique heading anchors", async () => {
    const rendered = await renderMarkdown(
      "## Beispiel\n\nText [gefährlich](javascript:alert%281%29)\n\n<script>alert(1)</script>\n\n## Beispiel",
    );
    expect(rendered.html).not.toContain("<script");
    expect(rendered.html).not.toContain('href="javascript:');
    expect(rendered.toc.map((h) => h.id)).toEqual(["beispiel", "beispiel-1"]);
  });
  it("requires explicit draft status and consistent metadata", () => {
    expect(() =>
      parseContent("---\ntitle: Test\n---\nText", "blog", "test"),
    ).toThrow();
  });
  it("keeps a valid draft out of detail pages, search lists, sitemap and feed", async () => {
    const draft = [
      "---",
      "title: Unveröffentlichter Entwurf",
      "description: Nur für die Redaktion",
      "category: rechnungen",
      'publishedAt: "2026-09-09"',
      'updatedAt: "2026-09-09"',
      "author: CraftOS",
      "draft: true",
      "relatedFeatures: []",
      "relatedArticles: []",
      "sources: []",
      "---",
      "## Entwurf",
      "Noch nicht veröffentlichen.",
    ].join("\n");
    const readDirectory = vi
      .spyOn(fs, "readdir")
      .mockImplementation(async () => ["entwurf.md"] as never);
    const readFile = vi.spyOn(fs, "readFile").mockResolvedValue(draft);
    try {
      expect(await getContentList("blog")).toEqual([]);
      expect(await getContentList("hilfe")).toEqual([]);
      expect(await getContentArticle("blog", "entwurf")).toBeNull();
      expect(
        (await sitemap()).some((entry) => entry.url.endsWith("/entwurf")),
      ).toBe(false);
      expect(await (await GET()).text()).not.toContain(
        "Unveröffentlichter Entwurf",
      );
    } finally {
      readDirectory.mockRestore();
      readFile.mockRestore();
    }
  });
});

/**
 * 08-04 (D-06, D-17): Ratgeber, Hilfe, Kategorien, Übersichten und Gewerke beziehen Title, Description und H1
 * ausschließlich aus docs/seo/keyword-map.json (metaFor/zielwerte).
 */
describe("Inhaltsrouten folgen der Keyword-Map (08-04)", () => {
  type Meta = { title?: unknown; description?: unknown; openGraph?: { type?: string; images?: unknown }; twitter?: { images?: unknown } };
  const gerenderterTitel = (m: Meta) =>
    typeof m.title === "string" ? `${m.title} | CraftOS` : (m.title as { absolute: string } | undefined)?.absolute;
  const decode = (s: string) =>
    s
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  const h1s = (html: string) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));

  it("Artikel: Title, Description und OG-Artikelfelder aus metaFor, H1 aus der Map", async () => {
    const { renderToString } = await import("react-dom/server");
    const { ArticlePage } = await import("@/components/content/ArticlePage");
    const { zielwerte } = await import("@/lib/seo-meta");
    const routen = {
      blog: await import("@/app/blog/[slug]/page"),
      hilfe: await import("@/app/hilfe/[slug]/page"),
    };
    for (const kind of ["blog", "hilfe"] as const) {
      for (const a of await getContentList(kind)) {
        const pfad = `/${kind}/${a.slug}`;
        const z = zielwerte(pfad);
        const meta = (await routen[kind].generateMetadata({ params: Promise.resolve({ slug: a.slug }) })) as Meta;
        expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(z.title);
        expect(meta.description, `${pfad}: Description`).toBe(z.description);
        expect(meta.openGraph?.type, `${pfad}: og:type`).toBe("article");
        expect(JSON.stringify(meta.openGraph?.images), `${pfad}: og:image`).toContain(`${pfad}/opengraph-image`);
        expect(JSON.stringify(meta.twitter?.images), `${pfad}: twitter:image`).toContain(`${pfad}/opengraph-image`);
        const html = renderToString(await ArticlePage({ article: (await getContentArticle(kind, a.slug))! }));
        expect(h1s(html), `${pfad}: genau eine H1 = Map`).toEqual([z.h1]);
      }
    }
  });

  it("Kategorien und Übersichten: Metadaten über metaFor, ContentIndex-H1 aus der Map", async () => {
    const { renderToString } = await import("react-dom/server");
    const { ContentIndex } = await import("@/components/content/ContentIndex");
    const { zielwerte } = await import("@/lib/seo-meta");
    const kat = {
      blog: await import("@/app/blog/kategorie/[category]/page"),
      hilfe: await import("@/app/hilfe/kategorie/[category]/page"),
    };
    const uebersicht = { blog: await import("@/app/blog/page"), hilfe: await import("@/app/hilfe/page") };
    for (const kind of ["blog", "hilfe"] as const) {
      const z = zielwerte(`/${kind}`);
      expect(gerenderterTitel(uebersicht[kind].metadata as Meta), `/${kind}: Title`).toBe(z.title);
      expect(uebersicht[kind].metadata.description, `/${kind}: Description`).toBe(z.description);
      expect(h1s(renderToString(await ContentIndex({ kind }))), `/${kind}: H1`).toEqual([z.h1]);
      for (const category of Object.keys(categories[kind])) {
        const pfad = `/${kind}/kategorie/${category}`;
        const zk = zielwerte(pfad);
        const meta = (await kat[kind].generateMetadata({ params: Promise.resolve({ category }) })) as Meta;
        expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(zk.title);
        expect(meta.description, `${pfad}: Description`).toBe(zk.description);
        expect(zk.h1.startsWith(kind === "blog" ? "Ratgeber: " : "Hilfe: "), pfad).toBe(true);
        expect(h1s(renderToString(await ContentIndex({ kind, category }))), `${pfad}: H1`).toEqual([zk.h1]);
      }
      expect(await kat[kind].generateMetadata({ params: Promise.resolve({ category: "gibt-es-nicht" }) })).toEqual({});
    }
  });

  it("Gewerke: Übersicht und Detailseiten aus der Map, keine eigenen SEO-Felder mehr", async () => {
    const { renderToString } = await import("react-dom/server");
    const { zielwerte } = await import("@/lib/seo-meta");
    const { gewerke } = await import("@/lib/gewerke");
    const uebersicht = await import("@/app/gewerke/page");
    const detail = await import("@/app/gewerke/[slug]/page");
    const z = zielwerte("/gewerke");
    expect(gerenderterTitel(uebersicht.metadata as Meta)).toBe(z.title);
    expect(uebersicht.metadata.description).toBe(z.description);
    expect(h1s(renderToString(uebersicht.default()))).toEqual([z.h1]);
    for (const g of gewerke) {
      const pfad = `/gewerke/${g.slug}`;
      const zg = zielwerte(pfad);
      expect(Object.hasOwn(g, "seoTitle") || Object.hasOwn(g, "seoDescription"), pfad).toBe(false);
      const meta = (await detail.generateMetadata({ params: Promise.resolve({ slug: g.slug }) })) as Meta;
      expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(zg.title);
      expect(meta.description, `${pfad}: Description`).toBe(zg.description);
      const html = renderToString(await detail.default({ params: Promise.resolve({ slug: g.slug }) }));
      expect(h1s(html), `${pfad}: H1`).toEqual([zg.h1]);
    }
  });
});
