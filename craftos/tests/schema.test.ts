/**
 * JSON-LD-Helfer aus lib/schema.ts (Phase 7, D-11): WebPage für Funktionsdetailseiten und
 * MobileApplication für /app. Werte nur aus site.ts und tarife; keine erfundenen Bewertungen.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { mobileApplicationSchema, softwareApplicationSchema, webPageSchema } from "@/lib/schema";
import { site, tarife } from "@/lib/site";

const appTarif = tarife.find((t) => t.id === "app")!;

describe("webPageSchema", () => {
  const schema = webPageSchema({ path: "/funktionen/angebote", name: "N", description: "D" });

  it("liefert WebPage mit eigener @id, URL, Sprache und Verweisen auf die globalen Knoten", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebPage");
    expect(schema["@id"]).toBe(site.url + "/funktionen/angebote#webpage");
    expect(schema.url).toBe(site.url + "/funktionen/angebote");
    expect(schema.name).toBe("N");
    expect(schema.description).toBe("D");
    expect(schema.inLanguage).toBe("de-DE");
    expect(schema.about).toEqual({ "@id": site.url + "/#software" });
    expect(schema.publisher).toEqual({ "@id": site.url + "/#organization" });
  });

  it("verweist nur auf Knoten, die das Layout wirklich ausgibt (kein #website ohne WebSite-Knoten)", () => {
    const layout = fs.readFileSync(path.resolve(import.meta.dirname, "../app/layout.tsx"), "utf8");
    const hatWebSite = /websiteSchema\(/.test(layout);
    expect("isPartOf" in schema).toBe(hatWebSite);
    expect(softwareApplicationSchema()["@id"]).toBe(schema.about["@id"]);
  });
});

describe("mobileApplicationSchema", () => {
  const schema = mobileApplicationSchema();
  const price = appTarif.monat.toFixed(2);

  it("beschreibt die Mobile-App mit eigener @id, Plattformen und Store-Links", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("MobileApplication");
    expect(schema["@id"]).toBe(site.url + "/app#mobile-app");
    expect(schema.name).toBe("CraftOS Mobile-App");
    expect(schema.operatingSystem).toBe("iOS, Android");
    expect(schema.applicationCategory).toBe("BusinessApplication");
    expect(schema.url).toBe(site.url + "/app");
    expect(schema.sameAs).toEqual([site.iosUrl, site.androidUrl]);
    expect(schema.installUrl).toEqual([site.iosUrl, site.androidUrl]);
    expect(schema["@id"]).not.toBe(softwareApplicationSchema()["@id"]);
  });

  it("Angebot = App-Lizenz netto pro Person und Monat aus tarife", () => {
    expect(schema.offers["@type"]).toBe("Offer");
    expect(schema.offers.price).toBe(price);
    expect(schema.offers.priceCurrency).toBe("EUR");
    const spec = schema.offers.priceSpecification;
    expect(spec["@type"]).toBe("UnitPriceSpecification");
    expect(spec.price).toBe(price);
    expect(spec.priceCurrency).toBe("EUR");
    expect(spec.valueAddedTaxIncluded).toBe(false);
    expect(spec.referenceQuantity).toEqual({ "@type": "QuantitativeValue", value: 1, unitCode: "MON" });
    expect(spec.unitText).toBe("pro Person und Monat");
  });

  it("enthält keine Bewertungen", () => {
    const json = JSON.stringify(schema);
    expect(json).not.toContain("aggregateRating");
    expect(json).not.toContain("review");
  });
});
