import { describe, expect, it } from "vitest";
import { metaFor, ogBildFuer, ogTitel, zielwerte } from "@/lib/seo-meta";
import { zielwerte as zielwerteAusFunktionsdetails } from "@/lib/funktionsdetails";
import { pageMetadata } from "@/lib/metadata";

// lib/seo-meta.ts (08-01, D-06): Title/Description/Canonical aus docs/seo/keyword-map.json.
describe("metaFor und zielwerte", () => {
  it("metaFor('/app') entspricht pageMetadata mit dem Segmentbild der App-Seite (08-05), Versionsschlüssel und alt (LO-01)", () => {
    const z = zielwerte("/app");
    const meta = metaFor("/app");
    const bild = ogBildFuer("/app");
    expect(bild.pfad).toMatch(/^\/app\/opengraph-image\?v=[0-9a-z]+$/);
    expect(bild.alt).toBe(`Mobile-App: ${ogTitel("/app")}`);
    const bisher = pageMetadata(z.titleOhneMarke, z.description, "/app", bild.pfad, bild.alt);
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
    expect(og[0].url).toMatch(/\/app\/opengraph-image\?v=[0-9a-z]+$/);
    expect(meta.twitter?.images).toEqual([og[0].url]);
  });

  it("metaFor setzt standardmäßig das Segmentbild für og:image und twitter:image (08-05, Pitfall 8)", () => {
    for (const pfad of ["/preise", "/blog/handwerkerrechnung-schreiben", "/hilfe/kategorie/rechnungen", "/impressum"]) {
      const meta = metaFor(pfad);
      const og = meta.openGraph?.images as { url: string }[];
      expect(og[0].url, pfad).toBe("https://craftos.eu" + ogBildFuer(pfad).pfad);
      expect(og[0].url, pfad).toMatch(new RegExp(`^https://craftos\\.eu${pfad}/opengraph-image\\?v=[0-9a-z]+$`));
      expect(meta.twitter?.images, pfad).toEqual([og[0].url]);
    }
  });

  it("metaFor('/') behält das Root-Bild /opengraph-image (mit Versionsschlüssel)", () => {
    const meta = metaFor("/");
    const og = meta.openGraph?.images as { url: string }[];
    expect(og[0].url).toMatch(/^https:\/\/craftos\.eu\/opengraph-image\?v=[0-9a-z]+$/);
    expect(meta.twitter?.images).toEqual([og[0].url]);
  });

  it("/app und /funktionen/aufmass zeigen og:image und twitter:image auf ihr Segmentbild (08-05)", async () => {
    const app = await import("@/app/app/page");
    const appOg = app.metadata.openGraph?.images as { url: string }[];
    const appUrl = "https://craftos.eu" + ogBildFuer("/app").pfad;
    expect(appOg[0].url).toBe(appUrl);
    expect(app.metadata.twitter?.images).toEqual([appUrl]);
    const detail = await import("@/app/funktionen/[slug]/page");
    const meta = await detail.generateMetadata({ params: Promise.resolve({ slug: "aufmass" }) });
    const og = meta.openGraph?.images as { url: string }[];
    const aufmassUrl = "https://craftos.eu" + ogBildFuer("/funktionen/aufmass").pfad;
    expect(og[0].url).toBe(aufmassUrl);
    expect(meta.twitter?.images).toEqual([aufmassUrl]);
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

  // 10-05 (D-38): Der Title dieser Hilfeseite trägt seit der Map-Korrektur „ | CraftOS“, damit Title und H1
  // sich unterscheiden. Eine Hilfeseite ohne Markenzusatz gibt es in der Map seitdem nicht mehr.
  it("Hilfeseite mit Markenzusatz läuft über das Layout-Template, Title und H1 unterscheiden sich (10-05)", () => {
    const z = zielwerte("/hilfe/mitarbeiter-einladen-lizenz-zuweisen");
    expect(z.title.endsWith(" | CraftOS")).toBe(true);
    expect(z.titleOhneMarke).not.toBe(z.h1);
    const meta = metaFor("/hilfe/mitarbeiter-einladen-lizenz-zuweisen");
    expect(meta.title).toBe(z.titleOhneMarke);
    expect(meta.description).toBe(z.description);
    expect(String(meta.alternates?.canonical)).toMatch(/\/hilfe\/mitarbeiter-einladen-lizenz-zuweisen$/);
  });

  it("lib/funktionsdetails re-exportiert dieselbe Funktion", () => {
    expect(zielwerteAusFunktionsdetails).toBe(zielwerte);
    expect(zielwerte("/app").titleOhneMarke.endsWith(" | CraftOS")).toBe(false);
  });
});
