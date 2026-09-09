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
