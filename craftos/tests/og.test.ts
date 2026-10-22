import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { OG_KINDS, OG_SIZE, ogAlt, ogTitleSize, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";
import { keywordMap } from "@/lib/keyword-map";

// OG-Vorlage pageOg (08-05, G7, UI-SPEC § 7, D-08, D-20, D-21, C6, C7).
describe("ogTitleSize – Titelstufen nach Zeichenzahl", () => {
  it("≤ 40 Zeichen → 72 px", () => {
    expect(ogTitleSize("a".repeat(1))).toBe(72);
    expect(ogTitleSize("a".repeat(40))).toBe(72);
  });
  it("41–60 Zeichen → 64 px", () => {
    expect(ogTitleSize("a".repeat(41))).toBe(64);
    expect(ogTitleSize("a".repeat(60))).toBe(64);
  });
  it("61–90 Zeichen → 52 px", () => {
    expect(ogTitleSize("a".repeat(61))).toBe(52);
    expect(ogTitleSize("a".repeat(90))).toBe(52);
  });
  it("> 90 Zeichen → Fehler mit Pfad und Zeichenzahl", () => {
    expect(() => ogTitleSize("a".repeat(91), "/blog/x")).toThrow(
      "OG: Titel für /blog/x hat 91 Zeichen – höchstens 90, Kurztitel in den Daten angeben.",
    );
    expect(() => ogTitleSize("a".repeat(120))).toThrow(/hat 120 Zeichen – höchstens 90/);
  });
});

describe("OG_SIZE, Seitentypen und alt", () => {
  it("OG_SIZE ist 1200 × 630", () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
  });
  it("OgKind enthält genau die 16 Seitentypen aus UI-SPEC § 7", () => {
    expect([...OG_KINDS]).toEqual([
      "Handwerkersoftware",
      "Funktion",
      "Funktionen",
      "Mobile-App",
      "Preise",
      "Vergleich",
      "Fakten",
      "Craft AI",
      "GoBD",
      "Gewerk",
      "Gewerke",
      "Ratgeber",
      "Hilfe",
      "Rechner",
      "Kontakt",
      "Rechtliches",
    ]);
  });
  it("alt = „{kind}: {title}“", () => {
    expect(ogAlt("Preise", "Preise der Handwerkersoftware CraftOS")).toBe(
      "Preise: Preise der Handwerkersoftware CraftOS",
    );
  });
});

describe("OG-Titel aus der Keyword-Map", () => {
  it("ogTitel nimmt die H1, sonst den Kurztitel target.ogTitle", () => {
    const preise = keywordMap.find((k) => k.path === "/preise")!;
    expect(ogTitel("/preise")).toBe(preise.target!.h1);
    const lang = keywordMap.find((k) => k.target?.ogTitle);
    expect(lang, "mindestens ein Eintrag mit Kurztitel").toBeTruthy();
    expect(ogTitel(lang!.path)).toBe(lang!.target!.ogTitle);
  });
  it("jede Seite mit Zielwerten hat einen OG-Titel mit höchstens 90 Zeichen", () => {
    const zuLang = keywordMap
      .filter((k) => k.target?.h1)
      .map((k) => ({ path: k.path, n: ogTitel(k.path).length }))
      .filter((x) => x.n > 90);
    expect(zuLang).toEqual([]);
  });
  it("Kurztitel nur dort, wo die H1 länger als 90 Zeichen ist", () => {
    for (const k of keywordMap.filter((e) => e.target?.ogTitle)) {
      expect(k.target!.h1!.length, k.path).toBeGreaterThan(90);
    }
  });
});

describe("pageOg – Vorlage", () => {
  it("liefert ein PNG (ImageResponse) mit Inhalt", async () => {
    const res = pageOg({ title: "Preise der Handwerkersoftware CraftOS", kind: "Preise" });
    expect(res.headers.get("content-type")).toBe("image/png");
    const bytes = (await res.arrayBuffer()).byteLength;
    expect(bytes).toBeGreaterThan(0);
  }, 60_000);
  it("wirft bei Titeln > 90 Zeichen schon beim Aufruf (Build-Fehler)", () => {
    expect(() => pageOg({ title: "a".repeat(91), kind: "Ratgeber", path: "/blog/x" })).toThrow(
      "OG: Titel für /blog/x hat 91 Zeichen",
    );
  });
  it("Quelltext ohne Verlauf, Fettschnitt, Versalien, Mittelpunkt und Pfeil (C7, D-21)", () => {
    const quelle = fs.readFileSync(path.join(process.cwd(), "lib/og.tsx"), "utf8");
    expect(quelle).not.toMatch(/linear-gradient/);
    expect(quelle).not.toMatch(/fontWeight:\s*["']?[5-9]00/);
    expect(quelle).not.toMatch(/uppercase/);
    expect(quelle).not.toContain("·");
    expect(quelle).not.toContain("→");
    expect(quelle).not.toMatch(/fonts:/);
    expect(quelle).not.toContain("articleOg");
  });
});

// LO-03 (08-REVIEW): Dynamische OG-Routen liefern bei unbekanntem Parameter 404 statt 500 (dynamicParams = false,
// nur die per generateStaticParams erzeugten Bilder existieren).
describe("dynamische OG-Routen ohne On-Demand-Rendering", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const dateien: string[] = [];
  const suche = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) suche(p);
      else if (e.name === "opengraph-image.tsx" && p.includes("[")) dateien.push(p);
    }
  };
  suche(path.join(root, "app"));

  it("alle sechs dynamischen Segmente setzen dynamicParams = false und erzeugen ihre Parameter statisch", () => {
    expect(dateien).toHaveLength(6);
    for (const d of dateien) {
      const q = fs.readFileSync(d, "utf8");
      expect(q, d).toMatch(/export const dynamicParams = false;/);
      expect(q, d).toMatch(/export (async )?function generateStaticParams/);
    }
  });
});

// LO-01 (08-REVIEW): og:image:alt = ogAlt(Seitentyp, OG-Titel) und ein Versionsschlüssel an der Bild-URL, damit
// Facebook, LinkedIn und Slack nach einer Titeländerung das neue Bild laden. Die alt-Exporte der OG-Dateien waren
// wirkungslos (metaFor setzt openGraph.images) und entfallen.
describe("OG-Metadaten aus metaFor (alt und Versionsschlüssel)", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const ogDateien: string[] = [];
  const suche = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) suche(p);
      else if (e.name === "opengraph-image.tsx") ogDateien.push(p);
    }
  };
  suche(path.join(root, "app"));
  const route = (datei: string) =>
    "/" +
    path
      .relative(path.join(root, "app"), path.dirname(datei))
      .split(path.sep)
      .filter(Boolean)
      .map((s) => (s.startsWith("[") ? "beispiel" : s))
      .join("/");

  it("ogArt kennt für jede OG-Datei denselben Seitentyp wie die Vorlage; keine toten alt-Exporte", async () => {
    const { ogArt } = await import("@/lib/seo-meta");
    expect(ogDateien.length).toBeGreaterThanOrEqual(29);
    for (const d of ogDateien) {
      const q = fs.readFileSync(d, "utf8");
      const kind = /kind: "([^"]+)"/.exec(q)?.[1];
      expect(ogArt(route(d).replace(/^\/\/?$/, "/") || "/"), d).toBe(kind);
      expect(q, d).not.toMatch(/export const alt/);
    }
  });

  it("metaFor: alt = „{Seitentyp}: {OG-Titel}“, URL mit ?v=, og:image und twitter:image gleich", async () => {
    const { metaFor, ogTitel, ogVersion } = await import("@/lib/seo-meta");
    for (const [pfad, kind] of [
      ["/preise", "Preise"],
      ["/vergleich/hero-alternative", "Vergleich"],
      ["/blog/handwerkerrechnung-schreiben", "Ratgeber"],
      ["/funktionen/aufmass", "Funktion"],
    ] as const) {
      const meta = metaFor(pfad);
      const og = (meta.openGraph?.images as { url: string; alt: string }[])[0];
      expect(og.alt, pfad).toBe(ogAlt(kind, ogTitel(pfad)));
      expect(og.url, pfad).toBe(`https://craftos.eu${pfad}/opengraph-image?v=${ogVersion(kind, ogTitel(pfad))}`);
      expect(meta.twitter?.images, pfad).toEqual([og.url]);
    }
    expect(ogVersion("Preise", "Titel A")).not.toBe(ogVersion("Preise", "Titel B"));
    expect(ogVersion("Preise", "Titel A")).toMatch(/^[0-9a-z]{4,8}$/);
  });
});
