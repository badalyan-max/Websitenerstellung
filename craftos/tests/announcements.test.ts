import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { buildLlmsTxt } from "@/lib/llms";
import { featureComparisons } from "@/lib/comparison";

const ROOT = path.resolve(import.meta.dirname, "..");

// Quelltext (Seiten, Komponenten, Daten): keine Ankündigung nicht-live Funktionen.
const CODE_PATTERN =
  /Geplant:|Demnächst|demnächst|In Vorbereitung|Bald verfügbar|Telefon-Agent|MCP-Server|Agent-Aktionen/;
// Redaktionelle Inhalte: allgemeines „demnächst“ (z. B. Gesetzesfristen) ist
// keine Produktankündigung; datierte Produktankündigungen schon.
const CONTENT_PATTERN =
  /Geplant:|Telefon-Agent|MCP-Server|Agent-Aktionen|(September|Oktober|November) 2026 geplant/;

// Einzige begründete Ausnahme: lib/product-register.ts ist server-only, wird
// nicht gerendert und führt nicht-live Funktionen ausschließlich intern
// (notLive) zur Abgrenzung mit Belegen aus dem Release.
const EXCEPTIONS = new Set(["lib/product-register.ts"]);

function walk(dir: string, extensions: string[]): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, extensions));
    else if (extensions.includes(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function findHits(dirs: string[], extensions: string[], pattern: RegExp) {
  const hits: string[] = [];
  for (const dir of dirs)
    for (const file of walk(path.join(ROOT, dir), extensions)) {
      const rel = path.relative(ROOT, file).split(path.sep).join("/");
      if (EXCEPTIONS.has(rel)) continue;
      fs.readFileSync(file, "utf8")
        .split(/\r?\n/)
        .forEach((line, i) => {
          if (pattern.test(line)) hits.push(`${rel}:${i + 1}: ${line.trim()}`);
        });
    }
  return hits;
}

describe("keine Ankündigungen nicht-live Funktionen", () => {
  it("Seiten, Komponenten und Daten enthalten keine Ankündigung", () => {
    expect(
      findHits(["app", "components", "lib"], [".ts", ".tsx"], CODE_PATTERN),
    ).toEqual([]);
  });
  it("Ratgeber und Hilfeartikel enthalten keine datierte Ankündigung", () => {
    expect(findHits(["content"], [".md", ".mdx"], CONTENT_PATTERN)).toEqual(
      [],
    );
  });
  it("llms.txt nennt keine nicht-live Funktion", () => {
    const text = buildLlmsTxt();
    expect(text).not.toMatch(CODE_PATTERN);
    expect(text).not.toMatch(CONTENT_PATTERN);
  });
  it("Funktionsdaten exportieren keine Ankündigungsliste", async () => {
    const mod: Record<string, unknown> = await import("@/lib/funktionen");
    expect("upcomingFeatures" in mod).toBe(false);
    expect("vision" in mod).toBe(false);
  });
  it("Vergleich zeigt beim KI-Telefonempfang für CraftOS ein neutrales Nein", () => {
    const row = featureComparisons.find((r) => r.feature === "KI-Telefonempfang");
    if (!row) return;
    expect(row.craftos.text).toBe("Nein");
    expect(row.craftos.detail).toBeUndefined();
    expect(row.craftos.href).toBeUndefined();
  });
});
