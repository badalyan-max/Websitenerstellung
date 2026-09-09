import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { funktionen } from "@/lib/funktionen";
import { gewerke } from "@/lib/gewerke";
import { getContentList } from "@/lib/content";
import { categories } from "@/lib/content-types";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = [
    ...(await getContentList("blog")),
    ...(await getContentList("hilfe")),
  ];
  const pages = [
    "",
    "/funktionen",
    "/gewerke",
    "/app",
    "/craft-ai",
    "/preise",
    "/gobd",
    "/vergleich",
    "/fakten-ueber-craftos",
    "/support",
    "/blog",
    "/hilfe",
    "/rechner",
    "/rechner/stundensatz",
    "/rechner/angebotskalkulation",
  ];
  return [
    ...pages.map((p) => ({ url: site.url + p, lastModified: "2026-09-09" })),
    ...["/agb", "/datenschutz", "/impressum"].map((p) => ({
      url: site.url + p,
    })),
    ...funktionen.map((f) => ({
      url: site.url + "/funktionen/" + f.slug,
      lastModified: f.checkedAt,
    })),
    ...gewerke.map((g) => ({
      url: site.url + "/gewerke/" + g.slug,
      lastModified: "2026-09-09",
    })),
    ...(["blog", "hilfe"] as const).flatMap((kind) =>
      Object.keys(categories[kind]).map((c) => ({
        url: site.url + "/" + kind + "/kategorie/" + c,
        lastModified: articles
          .filter((a) => a.kind === kind && a.category === c)
          .reduce(
            (latest, a) => (a.updatedAt > latest ? a.updatedAt : latest),
            "2026-09-09",
          ),
      })),
    ),
    ...articles.map((a) => ({
      url: site.url + "/" + a.kind + "/" + a.slug,
      lastModified: a.updatedAt,
    })),
  ];
}
