import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { buildLlmsTxt, LLMS_ANLEITUNGEN, LLMS_WISSENSSEITEN } from "@/lib/llms";
import { keywordMap } from "@/lib/keyword-map";
import { wettbewerber } from "@/lib/wettbewerber";
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
    // 08-09: HERO und ToolTime.
    expect(abschnitt).toContain(`(${site.url}/vergleich/hero-alternative)`);
    expect(abschnitt).toContain(`(${site.url}/vergleich/tooltime-alternative)`);
    expect(abschnitt.split("\n").filter((z) => z.includes("-alternative)"))).toHaveLength(4);
    // LO-04: Alternativen und Anbieterzahl aus der Anbieterliste (lib/wettbewerber), nicht fest geschrieben.
    for (const w of wettbewerber)
      expect(abschnitt).toContain(`- [${w.name}-Alternative](${site.url}/vergleich/${w.slug}-alternative): CraftOS und ${w.name} mit Quellen und Stand im Vergleich`);
    expect(fs.readFileSync(path.join(import.meta.dirname, "../lib/llms.ts"), "utf8")).not.toMatch(/fünf Anbieter|tooltime-alternative/);
    // 08-10: Hub-Label nennt den Vergleich aller fünf Anbieter, nicht mehr nur Craftnote und plancraft.
    expect(abschnitt).toContain(`- [Handwerkersoftware-Vergleich](${site.url}/vergleich)`);
    // 08-11: Seite für kleine Betriebe (Prompt #1), ohne Wettbewerberzahlen.
    const kleine = abschnitt.split("\n").filter((z) => z.includes(`(${site.url}/vergleich/handwerkersoftware-kleine-betriebe)`));
    expect(kleine).toHaveLength(1);
    expect(kleine[0]).toContain("[Handwerkersoftware für kleine Betriebe]");
    expect(kleine[0]).not.toMatch(/\d+,\d{2}|\d+ Tage/);
    expect(text).not.toContain("Vergleich mit Craftnote und plancraft");
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
  // 09-09 (SEO-09, CONTENT-04): neun Wissensseiten und elf Anleitungen mit Map-Titel, nur veröffentlichte Pfade.
  it("lists the knowledge pages and the new how-to articles under Wissen", () => {
    const abschnitt = text.slice(text.indexOf("## Wissen"));
    expect(LLMS_WISSENSSEITEN).toHaveLength(9);
    expect(LLMS_ANLEITUNGEN).toHaveLength(11);
    for (const p of [...LLMS_WISSENSSEITEN, ...LLMS_ANLEITUNGEN]) {
      const e = keywordMap.find((k) => k.path === p)!;
      expect(e.status, p).toBe("bestehend");
      expect(abschnitt, p).toContain(`- [${e.target!.title!.replace(/ \| CraftOS$/, "")}](${site.url}${p})`);
    }
    expect(abschnitt).toContain("### Wissensseiten");
    expect(abschnitt).toContain("### Anleitungen zu neuen Funktionen");
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
