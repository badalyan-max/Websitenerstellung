import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import seeds from "@/docs/seo/keyword-seeds.json";

const pageCandidates = seeds.pageCandidates as Record<string, string[]>;
const legal = new Set(["/agb", "/datenschutz", "/impressum"]);
const toPath = (url: string) => new URL(url).pathname.replace(/\/$/, "") || "/";

describe("Keyword-Seeds", () => {
  it("jeder Sitemap-Pfad hat pageCandidates (Rechtsseiten leer)", async () => {
    const paths = (await sitemap()).map((e) => toPath(e.url));
    expect(paths.length).toBeGreaterThanOrEqual(125);
    for (const p of paths) {
      const list = pageCandidates[p];
      expect(list, p).toBeDefined();
      if (legal.has(p)) expect(list, p).toHaveLength(0);
      else {
        expect(list.length, p).toBeGreaterThanOrEqual(1);
        expect(list.length, p).toBeLessThanOrEqual(3);
      }
      expect(new Set(list).size, p + " ohne Duplikate").toBe(list.length);
    }
  });

  it("pageCandidates enthalten keine leeren Strings und keine Großbuchstaben", () => {
    for (const [p, list] of Object.entries(pageCandidates)) {
      for (const k of list) {
        expect(k.trim(), p).not.toBe("");
        expect(k, p).toBe(k.toLowerCase());
        expect(k, p).toBe(k.trim());
      }
    }
  });

  it("pageCandidates enthält die vier Alternativen-Pfade", () => {
    for (const marke of ["plancraft", "craftnote", "hero", "tooltime"]) {
      const list = pageCandidates[`/vergleich/${marke}-alternative`];
      expect(list, marke).toBeDefined();
      expect(list.some((k) => k.includes("alternative")), marke).toBe(true);
    }
  });

  it("enthält die Seed-Gruppen inklusive Bauphasen und Arbeitsabschnitte (D-13)", () => {
    for (const key of ["related", "questions", "longtail", "competitorDomains", "comparisonDomains"] as const)
      expect(seeds[key].length, key).toBeGreaterThan(0);
    expect(seeds.related).toContain("bauphasen planen");
    expect(seeds.related).toContain("arbeitsabschnitte bau");
    expect(seeds.comparisonDomains).not.toContain("plancraft.com");
  });
});
