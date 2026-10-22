import { describe, expect, it } from "vitest";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { zielwerte as zielwerteAusFunktionsdetails } from "@/lib/funktionsdetails";
import { pageMetadata } from "@/lib/metadata";

// lib/seo-meta.ts (08-01, D-06): Title/Description/Canonical aus docs/seo/keyword-map.json.
describe("metaFor und zielwerte", () => {
  it("metaFor('/app') entspricht pageMetadata mit dem Segmentbild der App-Seite (08-05)", () => {
    const z = zielwerte("/app");
    const meta = metaFor("/app");
    const bisher = pageMetadata(z.titleOhneMarke, z.description, "/app", "/app/opengraph-image");
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

  it("metaFor setzt standardmäßig das Segmentbild für og:image und twitter:image (08-05, Pitfall 8)", () => {
    for (const pfad of ["/preise", "/blog/handwerkerrechnung-schreiben", "/hilfe/kategorie/rechnungen", "/impressum"]) {
      const meta = metaFor(pfad);
      const og = meta.openGraph?.images as { url: string }[];
      expect(og[0].url, pfad).toBe("https://craftos.eu" + pfad + "/opengraph-image");
      expect(meta.twitter?.images, pfad).toEqual([og[0].url]);
    }
  });

  it("metaFor('/') behält das Root-Bild /opengraph-image", () => {
    const meta = metaFor("/");
    const og = meta.openGraph?.images as { url: string }[];
    expect(og[0].url).toBe("https://craftos.eu/opengraph-image");
    expect(meta.twitter?.images).toEqual([og[0].url]);
  });

  it("/app und /funktionen/aufmass zeigen og:image und twitter:image auf ihr Segmentbild (08-05)", async () => {
    const app = await import("@/app/app/page");
    const appOg = app.metadata.openGraph?.images as { url: string }[];
    expect(appOg[0].url).toBe("https://craftos.eu/app/opengraph-image");
    expect(app.metadata.twitter?.images).toEqual(["https://craftos.eu/app/opengraph-image"]);
    const detail = await import("@/app/funktionen/[slug]/page");
    const meta = await detail.generateMetadata({ params: Promise.resolve({ slug: "aufmass" }) });
    const og = meta.openGraph?.images as { url: string }[];
    expect(og[0].url).toBe("https://craftos.eu/funktionen/aufmass/opengraph-image");
    expect(meta.twitter?.images).toEqual(["https://craftos.eu/funktionen/aufmass/opengraph-image"]);
  }, 30_000);

  it("zielwerte wirft für Pfade ohne Zielwerte mit dem bekannten Fehlertext", () => {
    expect(() => zielwerte("/unbekannt")).toThrow(
      "Keyword-Map: /unbekannt hat keine Zielwerte – target.title, target.h1 und target.description ergänzen.",
    );
  });

  it("Titel mit „ | CraftOS“ läuft über das Layout-Template (Title ohne Marke)", () => {
    const meta = metaFor("/hilfe/zeiteintrag-erfassen-korrigieren");
    expect(meta.title).toBe("Einen Zeiteintrag nachtragen oder korrigieren");
    expect(meta.openGraph?.title).toBe("Einen Zeiteintrag nachtragen oder korrigieren");
  });

  it("Titel ohne Markenzusatz rendert als title.absolute (08-04, Entwurfsregel Hilfe)", () => {
    const z = zielwerte("/hilfe/mitarbeiter-einladen-lizenz-zuweisen");
    expect(z.title.endsWith(" | CraftOS")).toBe(false);
    const meta = metaFor("/hilfe/mitarbeiter-einladen-lizenz-zuweisen");
    expect(meta.title).toEqual({ absolute: z.title });
    expect(meta.openGraph?.title).toBe(z.title);
    expect(meta.twitter?.title).toBe(z.title);
    expect(meta.description).toBe(z.description);
    expect(String(meta.alternates?.canonical)).toMatch(/\/hilfe\/mitarbeiter-einladen-lizenz-zuweisen$/);
  });

  it("lib/funktionsdetails re-exportiert dieselbe Funktion", () => {
    expect(zielwerteAusFunktionsdetails).toBe(zielwerte);
    expect(zielwerte("/app").titleOhneMarke.endsWith(" | CraftOS")).toBe(false);
  });
});
