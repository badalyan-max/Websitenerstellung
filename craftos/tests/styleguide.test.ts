/**
 * Musterseite /styleguide (DESIGN-02, MEDIA-03, T-05-16/T-05-17): nicht indexiert, nirgends gelistet,
 * nur Live-Funktionen mit Belegen aus dem Produktregister, alle Zahlen aus Datenmodulen.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import StyleguidePage, { metadata } from "@/app/styleguide/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { funktionen } from "@/lib/funktionen";
import { buildLlmsTxt } from "@/lib/llms";
import { getProductRegister, mobileLocales } from "@/lib/product-register";
import { allScenes } from "@/lib/scenes";
import { site, startCredits, tarife } from "@/lib/site";
import * as content from "@/lib/styleguide-content";

const NBSP = " ";
const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
const tarif = (id: "voll" | "app") => {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`Tarif ${id} fehlt`);
  return entry;
};

/** Alle Werte unter einem Schlüssel im (verschachtelten) Inhaltsobjekt. */
function collect(value: unknown, key: string, out: unknown[] = []): unknown[] {
  if (Array.isArray(value)) value.forEach((v) => collect(v, key, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === key) out.push(v);
      collect(v, key, out);
    }
  }
  return out;
}

describe("styleguide: Indexierung", () => {
  it("metadata.robots ist noindex, nofollow", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("nicht in Sitemap und llms.txt, kein Disallow in robots.txt", async () => {
    const list = await sitemap();
    expect(list.some((entry) => entry.url.includes("/styleguide"))).toBe(false);
    expect(buildLlmsTxt()).not.toContain("/styleguide");
    const rules = robots().rules;
    const disallow = (Array.isArray(rules) ? rules : [rules]).flatMap((rule) =>
      rule.disallow === undefined ? [] : Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow],
    );
    expect(disallow.some((d) => d.includes("styleguide"))).toBe(false);
  });

  it("X-Robots-Tag-Header für /styleguide ist konfiguriert", async () => {
    const config = (await import("../next.config.js")).default as {
      headers: () => Promise<{ source: string; headers: { key: string; value: string }[] }[]>;
    };
    const entry = (await config.headers()).find((h) => h.source === "/styleguide");
    expect(entry?.headers).toContainEqual({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  });
});

describe("styleguide: Produktwahrheit", () => {
  it("Funktionskarten und Kacheln nennen nur Live-Funktionen (tier heute)", () => {
    const slugs = collect(content, "slug") as string[];
    expect(slugs.length).toBeGreaterThanOrEqual(3);
    for (const slug of slugs) {
      expect(funktionen.find((f) => f.slug === slug)?.tier, slug).toBe("heute");
    }
  });

  it("jeder Rahmenbeleg kommt im Produktregister vor", () => {
    const register = getProductRegister();
    const known = new Set(
      [...register.features.flatMap((f) => f.evidence), ...register.liveExtras.flatMap((e) => e.evidence)].map(
        (e) => `${e.repository}:${e.path}`,
      ),
    );
    const evidence = collect(content, "evidence") as string[];
    expect(evidence.length).toBeGreaterThanOrEqual(6);
    for (const e of evidence) {
      expect(e).toMatch(/^(web|mobile):\S+/);
      expect(known.has(e), `Beleg ${e} fehlt im Produktregister`).toBe(true);
    }
  });

  it("jeder volle Szenenbeleg in lib/scenes.ts (allScenes) kommt im Produktregister vor", () => {
    const register = getProductRegister();
    const known = new Set(
      [...register.features.flatMap((f) => f.evidence), ...register.liveExtras.flatMap((e) => e.evidence)].map(
        (e) => `${e.repository}:${e.path}`,
      ),
    );
    expect(allScenes.length).toBe(28);
    for (const scene of allScenes) {
      expect(scene.evidence, scene.screen).toMatch(/^(web|mobile):\S+$/);
      expect(known.has(scene.evidence), `Beleg ${scene.evidence} (${scene.screen}) fehlt im Produktregister`).toBe(true);
    }
  });

  it("Szenen nennen keine Bauphasen (Release-Begriff Arbeitsabschnitte, B3)", () => {
    const text = JSON.stringify(allScenes);
    expect(text).not.toContain("Bauphase");
  });

  it("jeder KeyFact-Wert entspricht dem formatierten Wert seiner Quelle", () => {
    // Kurzform-Schlüssel (07 D-13)
    const expected: Record<string, string> = {
      "site:trialDays": `${site.trialDays}${NBSP}Tage`,
      "site:tarif-voll-monat": euro(tarif("voll").monat),
      "site:tarif-app-monat": euro(tarif("app").monat),
      "register:mobileLocales": String(mobileLocales.length),
    };
    const { facts, note } = content.keyFactsContent;
    expect(facts.map((f) => f.source).sort()).toEqual(Object.keys(expected).sort());
    for (const fact of facts) expect(fact.value, fact.source).toBe(expected[fact.source]);
    expect(String(mobileLocales.length)).toBe("21");
    expect(note).toMatch(/^Preise netto zzgl\. USt\. Stand: \d{2}\.\d{2}\.\d{4}\.$/);
  });

  it("FAQ-Antworten nutzen Werte aus tarife/startCredits; keine Preisliterale im Quelltext", () => {
    const answers = content.faqContent.map((item) => item.a).join(" ");
    expect(answers).toContain(euro(tarif("app").monat));
    expect(answers).toContain(euro(tarif("app").jahr));
    expect(answers).toContain(`${startCredits}${NBSP}Credits`);
    expect(answers).toContain("einmalig");
    expect(answers).toContain(`${site.trialDays}${NBSP}Tage`);
    const source = fs.readFileSync(path.resolve(import.meta.dirname, "../lib/styleguide-content.ts"), "utf8");
    expect(source).not.toMatch(/29,95|9,95|299,50|99,50/);
    expect(source).not.toMatch(/\d\s*€/);
  });
});

describe("styleguide: Seite", () => {
  it("data-source nur in Kurzform, keine internen Modulnamen im HTML (07 D-13)", () => {
    const html = renderToString(createElement(StyleguidePage));
    const sources = [...html.matchAll(/data-source="([^"]*)"/g)].map((m) => m[1]);
    expect(sources.length).toBeGreaterThanOrEqual(4);
    for (const source of sources) expect(source).toMatch(/^(site|register):[A-Za-z0-9.-]+$/);
    expect(html).not.toContain('data-source="tarife');
    expect(html).not.toContain('data-source="product-register');
  });

  it("rendert alle Blöcke 0–13 in UI-SPEC-Reihenfolge ohne JSON-LD", () => {
    const html = renderToString(createElement(StyleguidePage));
    const blocks = [
      "Designbausteine v2",
      "Tokens",
      "SectionHeader",
      "BentoGrid",
      "StepFlow",
      "KeyFacts",
      "FeatureCard",
      "Geräterahmen",
      "ComparisonTable",
      "Badges",
      "FaqList",
      "MediaFigure",
      "Videoplayer",
      "CtaBand",
    ];
    const positions = blocks.map((b) => html.indexOf(`data-block="${b}"`));
    expect(positions.every((p) => p >= 0), JSON.stringify(Object.fromEntries(blocks.map((b, i) => [b, positions[i]])))).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    expect(html).toContain("Videoplayer: entfällt (Videos sind nicht Teil des Meilensteins).");
    expect(html).not.toContain("application/ld+json");
    expect(html).toContain('data-tab="Zeiten"');
  });
});
