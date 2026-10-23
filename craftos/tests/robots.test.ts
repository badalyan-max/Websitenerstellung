/**
 * robots.txt (10-05 Behebungsliste, GEO 1.1, Projekt-CLAUDE.md „KI-Crawler NICHT blockieren“): Die KI-Crawler
 * GPTBot, ClaudeBot, PerplexityBot und Google-Extended sind ausdrücklich mit `Allow: /` erlaubt; der Bestand
 * (OAI-SearchBot, `*` mit Disallow `/api/`, Sitemap und Host) bleibt.
 */
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { site } from "@/lib/site";

type Regel = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };

const regeln = (): Regel[] => {
  const r = robots().rules;
  return (Array.isArray(r) ? r : [r]) as Regel[];
};
const liste = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

describe("robots.txt: KI-Crawler ausdrücklich erlaubt", () => {
  it.each(["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "OAI-SearchBot"])("%s mit Allow: /", (bot) => {
    const regel = regeln().find((r) => liste(r.userAgent).includes(bot));
    expect(regel, bot).toBeDefined();
    expect(liste(regel?.allow)).toContain("/");
    expect(liste(regel?.disallow).filter((d) => d === "/")).toEqual([]);
  });

  it("Bestand: * mit Allow / und Disallow /api/, Sitemap und Host", () => {
    const stern = regeln().find((r) => liste(r.userAgent).includes("*"));
    expect(liste(stern?.allow)).toContain("/");
    expect(liste(stern?.disallow)).toEqual(["/api/"]);
    expect(robots().sitemap).toBe(site.url + "/sitemap.xml");
    expect(robots().host).toBe(site.url);
  });
});
