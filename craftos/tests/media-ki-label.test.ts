// KI-generierte Motive laut docs/MEDIA.md dürfen nur mit sichtbarer Kennzeichnung „Darstellung, KI-gestaltet“
// erscheinen (D-04, MEDIA-03): Jede Datei, die ein solches Motiv einbindet, muss label "ki" setzen
// (MediaFigure label="ki", mediaContent label: "ki" oder IllustrationLabel kind="ki").
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const media = fs.readFileSync(path.join(root, "docs/MEDIA.md"), "utf8");

// „`public/images/<name>.webp`: neu generiertes …“ → <name>
const kiMotive = [...media.matchAll(/`public\/images\/([\w-]+)\.(?:webp|avif|png|jpe?g)`:\s*neu generiert/g)].map((m) => m[1]);

function quellDateien(dir: string): string[] {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && /\.(tsx?|mdx?)$/.test(e.name))
    .map((e) => path.join(e.parentPath, e.name));
}

const kennzeichnung = /label=["{]?\s*"?ki"|label:\s*"ki"|kind="ki"/;

describe("KI-generierte Motive nur mit Kennzeichnung (MD-06)", () => {
  it("docs/MEDIA.md nennt die KI-generierten Motive", () => {
    expect(kiMotive).toEqual(expect.arrayContaining(["werkstatt-2026", "team-baustelle-2026"]));
  });

  it("jede Einbindung eines KI-Motivs trägt label ki", () => {
    const fundorte: string[] = [];
    const ohne: string[] = [];
    for (const file of ["app", "components", "lib", "content"].flatMap(quellDateien)) {
      const text = fs.readFileSync(file, "utf8");
      const rel = path.relative(root, file).replaceAll("\\", "/");
      for (const motiv of kiMotive) {
        if (!new RegExp(`/images/${motiv}[\\w-]*\\.`).test(text)) continue;
        fundorte.push(`${rel}: ${motiv}`);
        if (!kennzeichnung.test(text)) ohne.push(`${rel}: ${motiv}`);
      }
    }
    expect(fundorte).toContain("app/gewerke/page.tsx: werkstatt-2026");
    expect(ohne).toEqual([]);
  });
});
