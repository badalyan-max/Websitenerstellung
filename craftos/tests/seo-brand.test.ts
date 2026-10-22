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
    // D-25: sachliche Abgrenzung zu gleichnamigen Projekten, ohne Links auf diese Projekte.
    expect(org.disambiguatingDescription).toContain("nicht verbunden mit CraftOS-PC oder ComputerCraft");
  });
  it("links the organization only to verified official profiles (D-25, T-08-31)", () => {
    expect(organizationSchema().sameAs).toEqual([site.iosUrl, site.androidUrl]);
  });
  it("links the software to its store listings", () => {
    const app = softwareApplicationSchema();
    expect(app.alternateName).toBe("CraftOS Handwerkersoftware");
    expect(app.sameAs).toEqual(
      expect.arrayContaining([site.iosUrl, site.androidUrl]),
    );
  });
});
