import { describe, it, expect } from "vitest";
import { buildLlmsTxt } from "@/lib/llms";
import { GET } from "@/app/llms.txt/route";
import { funktionen } from "@/lib/funktionen";
import { gewerke } from "@/lib/gewerke";
import { site } from "@/lib/site";

describe("llms.txt", () => {
  const text = buildLlmsTxt();
  it("states the brand and the core facts", () => {
    expect(text.startsWith("# CraftOS Handwerkersoftware")).toBe(true);
    for (const fact of ["29,95 €", "9,95 €", "10 Tage"])
      expect(text).toContain(fact);
    expect(text).toContain(site.url + "/preise");
    expect(text).toContain(site.url + "/vergleich");
  });
  it("links the published alternatives pages without competitor figures (08-08, SEO-06)", () => {
    const abschnitt = text.slice(text.indexOf("## Preise und Vergleich"), text.indexOf("## Rechner"));
    expect(abschnitt).toContain(`(${site.url}/vergleich/plancraft-alternative)`);
    expect(abschnitt).toContain(`(${site.url}/vergleich/craftnote-alternative)`);
    for (const zeile of abschnitt.split("\n").filter((z) => z.includes("-alternative)")))
      expect(zeile, zeile).not.toMatch(/\d+,\d{2}|\d+ Tage/);
  });
  it("keeps the facts above the first link section", () => {
    const firstH2 = text.indexOf("\n## ");
    expect(text.indexOf("29,95 €")).toBeLessThan(firstH2);
    expect(text).not.toContain("## Fakten");
  });
  it("lists available features but no announced ones", () => {
    for (const f of funktionen) {
      const url = `${site.url}/funktionen/${f.slug})`;
      if (f.tier === "heute") expect(text, f.slug).toContain(url);
      else expect(text, f.slug).not.toContain(url);
    }
  });
  it("links the mobile app page /app with the offline limitation (WR-04)", () => {
    const abschnitt = text.slice(text.indexOf("## Mobile-App"), text.indexOf("## Gewerke"));
    expect(text.indexOf("## Mobile-App")).toBeGreaterThan(-1);
    expect(abschnitt).toContain(`(${site.url}/app)`);
    expect(abschnitt).toContain("nur teilweise");
    expect(abschnitt).not.toMatch(/vollständig offline/i);
  });
  it("lists every trade page", () => {
    for (const g of gewerke)
      expect(text).toContain(`${site.url}/gewerke/${g.slug})`);
  });
  it("is served as plain text", async () => {
    const res = GET();
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(await res.text()).toBe(text);
  });
});
