import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { funktionen } from "@/lib/funktionen";
import { GEWERKE_STAND, gewerke } from "@/lib/gewerke";
import { getContentList } from "@/lib/content";
import { categories } from "@/lib/content-types";
/** Letzte inhaltliche Änderung je Kernseite; Standard ist der Relaunch-Stand. */
const pageUpdated: Record<string, string> = {
  "": "2026-10-21",
  "/funktionen": "2026-10-22",
  "/craft-ai": "2026-10-23",
  "/vergleich": "2026-10-23",
  "/fakten-ueber-craftos": "2026-10-23",
  "/preise": "2026-10-23",
  "/app": "2026-10-22",
  "/gewerke": "2026-10-23",
  "/gobd": "2026-10-23",
  "/vergleich/plancraft-alternative": "2026-10-23",
  "/vergleich/craftnote-alternative": "2026-10-23",
  "/vergleich/hero-alternative": "2026-10-23",
  "/vergleich/tooltime-alternative": "2026-10-23",
  "/vergleich/handwerkersoftware-kleine-betriebe": "2026-10-23",
};
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
    "/vergleich/plancraft-alternative",
    "/vergleich/craftnote-alternative",
    "/vergleich/hero-alternative",
    "/vergleich/tooltime-alternative",
    "/vergleich/handwerkersoftware-kleine-betriebe",
    "/fakten-ueber-craftos",
    "/support",
    "/blog",
    "/hilfe",
    "/rechner",
    "/rechner/stundensatz",
    "/rechner/angebotskalkulation",
  ];
  return [
    ...pages.map((p) => ({
      url: site.url + p,
      lastModified: pageUpdated[p] ?? "2026-09-09",
    })),
    ...["/agb", "/datenschutz", "/impressum"].map((p) => ({
      url: site.url + p,
    })),
    ...funktionen.map((f) => ({
      url: site.url + "/funktionen/" + f.slug,
      lastModified: f.checkedAt,
    })),
    ...gewerke.map((g) => ({
      url: site.url + "/gewerke/" + g.slug,
      // Datum der letzten inhaltlichen Änderung der Gewerke-Daten (09-02, lib/gewerke.ts).
      lastModified: GEWERKE_STAND,
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
