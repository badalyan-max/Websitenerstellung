import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * KI-Crawler ausdrücklich erlauben (10-05 Behebungsliste, GEO 1.1, Projekt-CLAUDE.md): GPTBot, ClaudeBot,
 * PerplexityBot und Google-Extended je mit `Allow: /`; OAI-SearchBot und `*` wie bisher (`/api/` gesperrt).
 */
const KI_CRAWLER = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
      ...KI_CRAWLER.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: site.url + "/sitemap.xml",
    host: site.url,
  };
}
