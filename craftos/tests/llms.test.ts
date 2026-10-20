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
