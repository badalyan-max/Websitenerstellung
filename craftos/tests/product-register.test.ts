import { describe, it, expect } from "vitest";
import { getProductRegister } from "@/lib/product-register";
import { pageMetadata } from "@/lib/metadata";

describe("publication basis", () => {
  it("links every advertised platform to source evidence", () => {
    const register = getProductRegister();
    expect(register.features).toHaveLength(16);
    for (const feature of register.features) {
      for (const platform of feature.platforms)
        expect(
          feature.evidence.some((item) => item.repository === platform),
          feature.slug + ": " + platform,
        ).toBe(true);
    }
    expect(register.trialDays).toBe(10);
    expect(register.licenses.every((license) => license.mobileIncluded)).toBe(
      true,
    );
  });
  it("uses the individual article image for both sharing formats", () => {
    const result = pageMetadata(
      "Rechnung schreiben",
      "Eine Anleitung",
      "/blog/rechnung",
      "/blog/rechnung/opengraph-image",
    );
    const expected = "https://craftos.eu/blog/rechnung/opengraph-image";
    expect(result.openGraph).toMatchObject({ images: [{ url: expected }] });
    expect(result.twitter).toMatchObject({ images: [expected] });
  });
});
