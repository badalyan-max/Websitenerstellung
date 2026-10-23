/**
 * Aufräumen nach Inhaberfreigabe D-42 (10-CONTEXT „Nachtrag Inhaber“, umgesetzt in 10-06): Ungenutzter Code ist
 * entfernt und bleibt entfernt. Ersetzt den Schutztest aus D-23 (tests/demo.test.ts, „keine Einbindung unter app/“),
 * der das Behalten der ProductDemo voraussetzte.
 *
 * - `components/ui/PageHero.tsx` und das nur von Altseiten genutzte `components/ui/TrialCta.tsx`
 * - `CalculatorCta` samt CSS `.ctaSection`/`.primaryLink`
 * - Altklassen in `app/globals.css` (Listen aus 10-03 und 10-10)
 * - nicht mehr geladene Schriftschnitte Clash 500/700 und General 500 (10-09: Logo als SVG)
 * - `components/product-demo/**` samt `lib/demo/**`
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(import.meta.dirname, "..");
const lies = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const gibt = (rel: string) => fs.existsSync(path.join(ROOT, rel));

/** Import- oder Re-Export-Zeile, die components/product-demo oder lib/demo lädt (Muster aus D-23). */
export const DEMO_IMPORT = /(?:\bfrom\s*|\bimport\s*\(?\s*)["'][^"']*(?:components\/product-demo|lib\/demo)(?:\/[^"']*)?["']/;

const ALTKLASSEN = ["section-space", "split-section", "soft-panel", "section-intro", "btn-cta", "btn-secondary", "eyebrow", "spec-label"];

function quelldateien(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...quelldateien(rel));
    else if (/\.(tsx?|mjs|cjs|js)$/.test(e.name)) out.push(rel);
  }
  return out;
}

describe("D-42: entfernter Code bleibt entfernt", () => {
  it("PageHero, TrialCta, ProductDemo und lib/demo gibt es nicht mehr", () => {
    for (const rel of ["components/ui/PageHero.tsx", "components/ui/TrialCta.tsx", "components/product-demo", "lib/demo"]) {
      expect(gibt(rel), rel).toBe(false);
    }
  });

  it("CalculatorCta und ihre CSS-Klassen sind entfernt", () => {
    expect(lies("components/calculators/CalculatorPage.tsx")).not.toMatch(/CalculatorCta|ctaSection|primaryLink/);
    expect(lies("components/calculators/Calculators.module.css")).not.toMatch(/\.ctaSection\b|\.primaryLink\b/);
  });

  it("globals.css definiert die Altklassen nicht mehr; die v2-Klassen bleiben", () => {
    const css = lies("app/globals.css");
    for (const klasse of ALTKLASSEN) expect(css, klasse).not.toMatch(new RegExp(`(?<![\\w-])\\.${klasse}(?![\\w-])`));
    expect(css).toMatch(/\.v2-eyebrow\s*\{/);
    expect(css).toMatch(/\.v2-btn-cta\s*\{/);
  });

  it("keine Datei unter app/, components/ oder lib/ nutzt eine Altklasse", () => {
    const treffer: string[] = [];
    for (const rel of ["app", "components", "lib"].flatMap(quelldateien)) {
      const src = lies(rel);
      for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
        const klassen = (m[1] ?? m[2]).split(/\s+/);
        for (const k of ALTKLASSEN) if (klassen.includes(k)) treffer.push(`${rel}: ${k}`);
      }
    }
    expect(treffer).toEqual([]);
  });

  it("nur die drei geladenen Schriftschnitte liegen in public/fonts", () => {
    const dateien = fs.readdirSync(path.join(ROOT, "public/fonts")).filter((f) => f.endsWith(".woff2")).sort();
    expect(dateien).toEqual(["clash-display-600.woff2", "general-sans-400.woff2", "general-sans-600.woff2"]);
  });

  it("das Importmuster erkennt statische, dynamische und Alias-Importe und nur diese", () => {
    for (const zeile of [
      'import { ProductDemo } from "@/components/product-demo/ProductDemo";',
      "import { demoReducer } from '../../lib/demo/machine';",
      'const Demo = dynamic(() => import("@/components/product-demo/ProductDemo"));',
      'export { ProductDemo } from "@/components/product-demo";',
      'import { daten } from "@/lib/demo";',
    ])
      expect(DEMO_IMPORT.test(zeile), zeile).toBe(true);
    for (const zeile of ['import { site } from "@/lib/site";', 'import { x } from "@/lib/demos";', "// components/product-demo entfernt"])
      expect(DEMO_IMPORT.test(zeile), zeile).toBe(false);
  });

  it("keine Quelldatei in app/, components/, lib/, scripts/ oder tests/ importiert die entfernte Demo", () => {
    const treffer: string[] = [];
    for (const rel of ["app", "components", "lib", "scripts", "tests"].flatMap(quelldateien)) {
      if (rel === "tests/aufraeumen-d42.test.ts") continue;
      lies(rel)
        .split(/\r?\n/)
        .forEach((zeile, i) => {
          if (DEMO_IMPORT.test(zeile)) treffer.push(`${rel}:${i + 1}`);
        });
    }
    expect(treffer).toEqual([]);
  });

  it("Impressum: kein Verweis auf die eingestellte OS-Plattform, die VSBG-Erklärung bleibt wörtlich", () => {
    const src = lies("app/impressum/page.tsx");
    expect(src).not.toMatch(/ec\.europa\.eu\/consumers\/odr|Online-Streitbeilegung/);
    expect(src.replace(/\s+/g, " ")).toContain(
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    );
  });
});
