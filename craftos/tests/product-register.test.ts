import { describe, it, expect } from "vitest";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import {
  getProductRegister,
  productBasis,
  mobileLocales,
} from "@/lib/product-register";
import { pageMetadata } from "@/lib/metadata";

const WEB = process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy";
const MOBILE =
  process.env.CRAFTOS_MOBILE_REPO ||
  "C:/Projekte/CraftOS - Mobile/craftos-mobile";

describe("publication basis", () => {
  it("bezieht beide Produkte auf origin/release mit Tag und Commit", () => {
    const register = getProductRegister();
    for (const repo of [register.basis.web, register.basis.mobile]) {
      expect(repo.ref).toBe("origin/release");
      expect(repo.commit).toMatch(/^[0-9a-f]{40}$/);
    }
    expect(register.basis.web.tag.startsWith("v4.")).toBe(true);
    expect(register.basis.mobile.tag.startsWith("mobile-v")).toBe(true);
    expect(register.basis.checkedAt).toBe("2026-10-21");
  });
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
    const portal = register.features.find((f) => f.slug === "kundenportal");
    expect(portal?.availability).toBe("implemented");
    expect(register.trialDays).toBe(10);
    expect(register.licenses.every((license) => license.mobileIncluded)).toBe(
      true,
    );
  });
  it("führt Lager und Arbeitsanweisungen mit Mobile-Beleg", () => {
    const register = getProductRegister();
    for (const slug of ["lager", "arbeitsanweisungen"]) {
      const feature = register.features.find((f) => f.slug === slug);
      expect(feature?.platforms, slug).toContain("mobile");
      expect(
        feature?.evidence.some((e) => e.repository === "mobile"),
        slug,
      ).toBe(true);
    }
  });
  it("führt 21 App-Sprachen, Zusatzfunktionen und nicht-live Funktionen getrennt", () => {
    const register = getProductRegister();
    expect(mobileLocales).toHaveLength(21);
    expect("upcoming" in register).toBe(false);
    const names = register.notLive.map((n) => n.name);
    for (const name of [
      "Telefon-Agent",
      "MCP-Server",
      "KI-Agent",
      "Videoanalyse (Web)",
      "Subunternehmer-Portal-Einladungen",
      "Portal-Onlinezahlung",
    ])
      expect(names, name).toContain(name);
    for (const extra of register.liveExtras) {
      expect(extra.evidence.length, extra.name).toBeGreaterThan(0);
      for (const platform of extra.platforms)
        expect(
          extra.evidence.some((e) => e.repository === platform),
          extra.name + ": " + platform,
        ).toBe(true);
    }
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

describe.skipIf(!fs.existsSync(WEB) || !fs.existsSync(MOBILE))(
  "lokale Produkt-Repositories",
  () => {
    function exists(repository: "web" | "mobile", path: string): boolean {
      const repo = repository === "web" ? WEB : MOBILE;
      const commit =
        repository === "web" ? productBasis.web.commit : productBasis.mobile.commit;
      try {
        execFileSync("git", ["-C", repo, "cat-file", "-e", `${commit}:${path}`], {
          stdio: "ignore",
        });
        return true;
      } catch {
        return false;
      }
    }
    it("Belege existieren am Release-Commit", () => {
      const register = getProductRegister();
      const missing: string[] = [];
      const all = [
        ...register.features.flatMap((f) => f.evidence),
        ...register.liveExtras.flatMap((x) => x.evidence),
        ...mobileLocales.map((code) => ({
          repository: "mobile" as const,
          path: `src/shared/i18n/locales/${code}`,
        })),
      ];
      for (const item of all)
        if (!exists(item.repository, item.path))
          missing.push(item.repository + ":" + item.path);
      expect(missing).toEqual([]);
      expect(all.length).toBeGreaterThan(80);
    });
  },
);
