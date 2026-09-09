import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import {
  categories,
  type ContentKind,
  type ContentSummary,
  type ContentArticle,
} from "./content-types";
const root = path.join(process.cwd(), "content");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
function string(data: Record<string, unknown>, key: string) {
  if (typeof data[key] !== "string" || !data[key])
    throw new Error("Missing content field " + key);
  return data[key] as string;
}
function strings(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string"))
    throw new Error("Expected content string array");
  return value;
}
export function parseContent(
  raw: string,
  kind: ContentKind,
  slug: string,
): ContentSummary & { body: string } {
  const { data, content } = matter(raw);
  const publishedAt = string(data, "publishedAt"),
    updatedAt = string(data, "updatedAt");
  if (
    !datePattern.test(publishedAt) ||
    !datePattern.test(updatedAt) ||
    updatedAt < publishedAt
  )
    throw new Error("Invalid dates in " + slug);
  if (!Object.hasOwn(categories[kind], string(data, "category")))
    throw new Error("Unknown category in " + slug);
  if (typeof data.draft !== "boolean")
    throw new Error("draft must be explicit in " + slug);
  const sources = data.sources;
  if (
    !Array.isArray(sources) ||
    sources.some(
      (s) =>
        !s ||
        typeof s.label !== "string" ||
        typeof s.url !== "string" ||
        !/^https:\/\//.test(s.url) ||
        !datePattern.test(s.checkedAt),
    )
  )
    throw new Error("Invalid sources in " + slug);
  const platforms = data.platforms ? strings(data.platforms) : [];
  if (platforms.some((p) => p !== "web" && p !== "mobile"))
    throw new Error("Invalid platform");
  return {
    kind,
    slug,
    title: string(data, "title"),
    description: string(data, "description"),
    category: string(data, "category"),
    publishedAt,
    updatedAt,
    author: string(data, "author"),
    draft: data.draft,
    relatedFeatures: strings(data.relatedFeatures),
    relatedArticles: strings(data.relatedArticles),
    sources,
    platforms: platforms as ("web" | "mobile")[],
    readingMinutes: Math.max(
      1,
      Math.ceil(content.trim().split(/\s+/).length / 200),
    ),
    body: content,
  };
}
const readAll = cache(async (kind: ContentKind) => {
  const names = await fs
    .readdir(path.join(root, kind))
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
  return Promise.all(
    names
      .filter((n) => n.endsWith(".md"))
      .map(async (name) =>
        parseContent(
          await fs.readFile(path.join(root, kind, name), "utf8"),
          kind,
          name.slice(0, -3),
        ),
      ),
  );
});
export const getContentList = cache(
  async (kind: ContentKind): Promise<ContentSummary[]> => {
    const all = await readAll(kind);
    return all
      .filter((a) => !a.draft)
      .sort(
        (a, b) =>
          b.publishedAt.localeCompare(a.publishedAt) ||
          a.title.localeCompare(b.title, "de"),
      )
      .map((a) => {
        const summary = { ...a } as Partial<typeof a>;
        delete summary.body;
        return summary as ContentSummary;
      });
  },
);
export async function renderMarkdown(body: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(body);
  const html = String(result)
    .replace(
      /<table>/g,
      '<div class="table-scroll" role="region" aria-label="Tabelle – bei Bedarf horizontal scrollen" tabindex="0"><table>',
    )
    .replace(/<\/table>/g, "</table></div>");
  const toc = [
    ...html.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h[23]>/g),
  ].map((m) => ({
    level: Number(m[1]),
    id: m[2],
    title: m[3]
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"'),
  }));
  return { html, toc };
}
export const getContentArticle = cache(
  async (kind: ContentKind, slug: string): Promise<ContentArticle | null> => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    const all = await readAll(kind),
      article = all.find((a) => a.slug === slug && !a.draft);
    if (!article) return null;
    return { ...article, ...(await renderMarkdown(article.body)) };
  },
);
