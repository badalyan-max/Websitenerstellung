import { describe, expect, it } from "vitest";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { zielwerte as zielwerteAusFunktionsdetails } from "@/lib/funktionsdetails";
import { pageMetadata } from "@/lib/metadata";

// lib/seo-meta.ts (08-01, D-06): Title/Description/Canonical aus docs/seo/keyword-map.json.
describe("metaFor und zielwerte", () => {
  it("metaFor('/app') entspricht dem bisherigen pageMetadata-Aufruf der App-Seite", () => {
    const z = zielwerte("/app");
    const meta = metaFor("/app");
    const bisher = pageMetadata(z.titleOhneMarke, z.description, "/app");
    expect(meta.title).toEqual(bisher.title);
    expect(meta.description).toEqual(bisher.description);
    expect(meta.alternates).toEqual(bisher.alternates);
    expect(meta.openGraph).toEqual(bisher.openGraph);
    expect(meta.twitter).toEqual(bisher.twitter);
    expect(String(meta.alternates?.canonical)).toMatch(/\/app$/);
  });

  it("metaFor reicht einen eigenen Bildpfad an og:image und twitter:image weiter", () => {
    const meta = metaFor("/app", { imagePath: "/app/opengraph-image" });
    const og = meta.openGraph?.images as { url: string }[];
    expect(og[0].url).toMatch(/\/app\/opengraph-image$/);
    expect(meta.twitter?.images).toEqual([og[0].url]);
  });

  it("zielwerte wirft für Pfade ohne Zielwerte mit dem bekannten Fehlertext", () => {
    expect(() => zielwerte("/unbekannt")).toThrow(
      "Keyword-Map: /unbekannt hat keine Zielwerte – target.title, target.h1 und target.description ergänzen.",
    );
  });

  it("lib/funktionsdetails re-exportiert dieselbe Funktion", () => {
    expect(zielwerteAusFunktionsdetails).toBe(zielwerte);
    expect(zielwerte("/app").titleOhneMarke.endsWith(" | CraftOS")).toBe(false);
  });
});
