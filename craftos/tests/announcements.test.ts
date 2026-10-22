import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { buildLlmsTxt } from "@/lib/llms";
import { baueAlternative } from "@/lib/seiten/alternativen";
import { vergleich } from "@/lib/seiten/vergleich";
import { CRAFTOS_OHNE } from "@/lib/wettbewerber";

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
  // 08-10: lib/comparison.ts (Stand 09.09.2026) ist abgelöst. Gleiche Absicht auf den neuen Daten (T-08-30):
  // KI-Telefonie ist für CraftOS nicht live und wird nirgends als CraftOS-Leistung oder Ankündigung gezeigt.
  // Nach der Inhabervorgabe vom 22.10.2026 („Nur, was unterstützt wird“, geht UI-SPEC U9/U6 vor) erscheint
  // das Kriterium auch nicht als neutrale Nein-Zeile, sondern gar nicht; der Builder wirft bei CRAFTOS_OHNE.
  it("Vergleichsseiten führen KI-Telefonie nicht als CraftOS-Zeile und nicht als Ankündigung", () => {
    expect(CRAFTOS_OHNE).toContain("kiTelefon");
    const telefon = /Telefon/i;
    for (const slug of ["plancraft", "craftnote", "hero", "tooltime"] as const) {
      const inhalt = baueAlternative(slug);
      for (const r of inhalt.tabelle.rows) {
        expect(r.label, `${slug}: Zeile ${r.label}`).not.toMatch(telefon);
        expect(String(r.craftos), `${slug}: CraftOS-Zelle ${r.label}`).not.toMatch(telefon);
      }
      expect(JSON.stringify(inhalt.faq), slug).not.toMatch(CODE_PATTERN);
    }
    const t = vergleich.ueberblick.tabelle;
    expect(t.columns.map((c) => c.label).join(" ")).not.toMatch(telefon);
    for (const r of t.rows) expect(JSON.stringify(r.cells), r.label).not.toMatch(telefon);
    expect(JSON.stringify(vergleich.faq)).not.toMatch(CODE_PATTERN);
  });
  it("veraltete Vergleichsdaten lib/comparison.ts sind entfernt", () => {
    expect(fs.existsSync(path.join(ROOT, "lib/comparison.ts"))).toBe(false);
  });
});
