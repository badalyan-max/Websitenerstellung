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
