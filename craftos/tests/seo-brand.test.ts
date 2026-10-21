import { describe, it, expect } from "vitest";
import { metadata } from "@/app/page";
import { organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

describe("brand signals", () => {
  it("names the brand in the homepage title", () => {
    expect(metadata.title).toBe(
      "Handwerkersoftware für Büro und Baustelle | CraftOS",
    );
  });
  it("disambiguates the organization", () => {
    const org = organizationSchema();
    expect(org.alternateName).toEqual(["CraftOS Handwerkersoftware"]);
    expect(org.disambiguatingDescription).toContain("craftos.eu");
    expect(org.disambiguatingDescription).toContain("Anbieter");
  });
  it("links the software to its store listings", () => {
    const app = softwareApplicationSchema();
    expect(app.alternateName).toBe("CraftOS Handwerkersoftware");
    expect(app.sameAs).toEqual(
      expect.arrayContaining([site.iosUrl, site.androidUrl]),
    );
  });
});
