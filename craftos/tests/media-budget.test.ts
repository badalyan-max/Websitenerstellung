/**
 * Medienbudget (MEDIA-04, D-15): Jede tatsächlich ausgelieferte Bilddatei ist AVIF, WebP oder SVG
 * und höchstens 150 KB groß. Geprüft werden ausschließlich Dateien, die der Code referenziert –
 * literal oder über Verkettung/Template-Literal gebildete Pfade (per Verzeichnis aufgelöst).
 * Ungenutzte Großdateien bleiben bewusst in public/ und werden nicht geprüft (D-15).
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SOURCE_DIRS = ["app", "components", "lib", "content"];
const SOURCE_EXT = /\.(tsx?|jsx?|mjs|cjs|mdx?|css|json)$/i;
const LIMIT = 150 * 1024;

/** Begründete Ausnahmen vom Format (nicht vom Größenlimit). */
const EXCEPTIONS: Record<string, string> = {
  "icons/icon-192x192.png":
    "Favicon und Apple-Touch-Icon in app/layout.tsx: Browser und iOS verlangen PNG.",
  "icons/icon-512x512.png":
    "Organisationslogo im JSON-LD (lib/schema.ts): Google verlangt ein Rasterformat wie PNG.",
};

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

const rel = (base: string, file: string) => path.relative(base, file).replaceAll("\\", "/");

const sources = SOURCE_DIRS.flatMap((d) => walk(path.join(ROOT, d))).filter((f) => SOURCE_EXT.test(f));
const publicFiles = walk(PUBLIC).map((f) => rel(PUBLIC, f));

const LITERAL = /["'`(]\/((?:images|icons)\/[^"'`)\s${}]+?\.(?:png|jpe?g|webp|avif|gif|svg))(?=["'`)\s?#])/gi;
const CONCAT_PREFIX = /["']\/((?:images|icons)\/[^"'\s]*)["']\s*\+/g;
const TEMPLATE_PREFIX = /`\/((?:images|icons)\/[^`$\s]*)\$\{/g;

const literalRefs = new Set<string>();
const dynamicPrefixes = new Set<string>();
const sourcesByRef = new Map<string, string[]>();

for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(LITERAL)) {
    literalRefs.add(m[1]);
    sourcesByRef.set(m[1], [...(sourcesByRef.get(m[1]) ?? []), rel(ROOT, file)]);
  }
  for (const re of [CONCAT_PREFIX, TEMPLATE_PREFIX]) {
    for (const m of text.matchAll(re)) dynamicPrefixes.add(m[1]);
  }
}

const IMAGE_FILE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const dynamicFiles = new Set(
  publicFiles.filter((f) => IMAGE_FILE.test(f) && [...dynamicPrefixes].some((p) => f.startsWith(p))),
);
const checked = new Set([...literalRefs, ...dynamicFiles]);

describe("Medienbudget: ausgelieferte Bilder", () => {
  it("jede literal referenzierte Bilddatei existiert in public/", () => {
    expect(literalRefs.size).toBeGreaterThan(0);
    const missing = [...literalRefs].filter((r) => !fs.existsSync(path.join(PUBLIC, r)));
    expect(missing, `Fehlende Dateien: ${missing.map((m) => `${m} (${sourcesByRef.get(m)?.join(", ")})`).join("; ")}`).toEqual([]);
  });

  it("dynamisch gebildete Pfade werden per Verzeichnis aufgelöst (qr-*)", () => {
    expect([...dynamicPrefixes]).toEqual(expect.arrayContaining(["images/mobile/qr-"]));
    for (const expected of ["images/mobile/qr-android.svg", "images/mobile/qr-ios.svg"]) {
      expect(checked.has(expected), `${expected} fehlt in der geprüften Menge`).toBe(true);
    }
  });

  it("jede ausgelieferte Datei ist AVIF/WebP/SVG und höchstens 150 KB (Ausnahmen begründet)", () => {
    const violations: string[] = [];
    for (const ref of checked) {
      const full = path.join(PUBLIC, ref);
      if (!fs.existsSync(full)) continue;
      const size = fs.statSync(full).size;
      const allowedFormat = /\.(avif|webp|svg)$/i.test(ref) || ref in EXCEPTIONS;
      if (!allowedFormat) violations.push(`${ref}: Format nicht AVIF/WebP/SVG`);
      if (size > LIMIT) violations.push(`${ref}: ${Math.round(size / 1024)} KB > 150 KB`);
    }
    expect(violations).toEqual([]);
  });

  // 08-10 (D-02, C12): Wettbewerberlogos sind gelöscht, nicht nur unverlinkt (T-08-29).
  it("keine Wettbewerberlogos: Markenordner unter public/images fehlt und wird nirgends referenziert", () => {
    expect(fs.existsSync(path.join(PUBLIC, "images", "brands"))).toBe(false);
    const marke = (p: string) => p.split("/")[1] === "brands";
    expect([...dynamicPrefixes].filter(marke)).toEqual([]);
    expect([...literalRefs].filter(marke)).toEqual([]);
  });

  it("PNG-Ausnahmen der Browserprüfung (tests/e2e/design-v2.pw.cjs) entsprechen genau EXCEPTIONS", () => {
    const e2e = fs.readFileSync(path.join(ROOT, "tests/e2e/design-v2.pw.cjs"), "utf8");
    const m = /const PNG_EXCEPTIONS = \[([^\]]*)\]/.exec(e2e);
    expect(m, "PNG_EXCEPTIONS fehlt in design-v2.pw.cjs").toBeTruthy();
    const liste = [...m![1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
    expect(liste.sort()).toEqual(Object.keys(EXCEPTIONS).map((k) => `/${k}`).sort());
  });

  it("jede Ausnahme ist begründet und betrifft eine tatsächlich ausgelieferte Datei", () => {
    for (const [file, reason] of Object.entries(EXCEPTIONS)) {
      expect(reason.trim().length, `${file} ohne Begründung`).toBeGreaterThan(20);
      expect(checked.has(file), `${file} wird nicht ausgeliefert – Ausnahme entfernen`).toBe(true);
    }
  });

  it("die Mobile-Galerie referenziert keine Original-PNG mehr", () => {
    const gallery = fs.readFileSync(path.join(ROOT, "components/ui/MobileAppGallery.tsx"), "utf8");
    expect(gallery).not.toMatch(/-original\.png/);
    expect([...checked].filter((r) => r.startsWith("images/mobile/current/") && r.endsWith(".png"))).toEqual([]);
  });

  it("ungenutzte Großdateien bleiben in public/ und werden nicht geprüft (D-15)", () => {
    for (const unused of ["images/werkstatt-2026.webp", "images/mobile/current/zeiten-original.png", "icons/icon-1024x1024.png"]) {
      expect(fs.existsSync(path.join(PUBLIC, unused)), `${unused} wurde gelöscht`).toBe(true);
      expect(checked.has(unused), `${unused} ist referenziert, aber über Budget`).toBe(false);
    }
  });
});
