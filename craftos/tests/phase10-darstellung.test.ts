import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Darstellungstest Paket (c), Phase 10 (10-UI-SPEC § 11 „Gewichte und Farben“ und „Köpfe und Bausteine“, Typography,
 * Color; K-3). Dateiscan mit Trefferliste (Muster tests/announcements.test.ts): In den Paket-(c)-Dateien gibt es nur
 * die Gewichte 400 und 600 und keine Textfarben text-primary-600 (#D28A13, 2,84 : 1) und text-ink-400 (#777782,
 * 4,43 : 1); `crumbs={null}` gibt es nur auf der 404-Seite.
 *
 * K-3: components/CraftOSLogo.tsx liegt ausdrücklich NICHT im Geltungsbereich. Das Logo gehört Paket (b), das es im
 * eigenen Logo-Test prüft (SVG-Schriftzug bzw. Subset); 10-06 vereinigt den Geltungsbereich nach dem Merge.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const AUSGENOMMEN = new Set(["components/CraftOSLogo.tsx"]);
const ENDUNGEN = [".ts", ".tsx", ".css", ".mjs", ".js"];

/** Geltungsbereich laut 10-UI-SPEC § 11 (Verzeichnisse rekursiv, Einzeldateien bzw. Dateipräfixe). */
const VERZEICHNISSE = [
  "app/rechner",
  "app/support",
  "app/impressum",
  "app/datenschutz",
  "app/agb",
  "components/legal",
  "components/calculators",
] as const;
const EINZELDATEIEN = ["app/not-found.tsx"] as const;
const PRAEFIXE = ["components/content/ContentKopf."] as const;

const rel = (abs: string) => path.relative(ROOT, abs).split(path.sep).join("/");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const r = path.posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(r));
    else if (ENDUNGEN.includes(path.extname(e.name))) out.push(r);
  }
  return out;
}

function geltungsbereich(): string[] {
  const dateien = new Set<string>();
  for (const d of VERZEICHNISSE) for (const f of walk(d)) dateien.add(f);
  for (const f of EINZELDATEIEN) dateien.add(f);
  for (const p of PRAEFIXE) {
    const dir = path.posix.dirname(p);
    for (const e of fs.readdirSync(path.join(ROOT, dir))) {
      const r = path.posix.join(dir, e);
      if (r.startsWith(p)) dateien.add(r);
    }
  }
  return [...dateien].filter((f) => !AUSGENOMMEN.has(f)).sort();
}

const TAILWIND_GEWICHT: Record<string, string> = { medium: "500", bold: "700", extrabold: "800" };

/** Gewichte und Textfarben einer Quelle; Fehlertexte wörtlich aus 10-UI-SPEC § 10. */
function darstellungsProbleme(datei: string, src: string): string[] {
  const probleme: string[] = [];
  for (const m of src.matchAll(/font-weight:\s*(\d{3}|bold|bolder)\b/g)) {
    const w = m[1] === "bold" ? "700" : m[1];
    if (w !== "400" && w !== "600") probleme.push(`${datei}: font-weight ${w} gefunden – nur 400 und 600 verwenden.`);
  }
  for (const m of src.matchAll(/(?<![\w-])font-(medium|bold|extrabold)\b/g)) {
    probleme.push(`${datei}: font-weight ${TAILWIND_GEWICHT[m[1]]} gefunden – nur 400 und 600 verwenden.`);
  }
  if (/(?<![\w-])text-(primary-600|ink-400)\b/.test(src)) {
    probleme.push(`${datei}: text-primary-600/text-ink-400 als Textfarbe – #784B10 bzw. #62626E verwenden.`);
  }
  return probleme;
}

const CRUMBS_NULL_FEHLER = "ContentKopf: crumbs={null} ist nur auf der 404-Seite erlaubt – crumbsFor(pfad) verwenden.";

/** true, wenn die Quelle eine null-Kette an `crumbs` übergibt (direkt, als Objektfeld oder über eine null-Variable). */
function hatCrumbsNull(src: string): boolean {
  if (/crumbs=\{\s*null\s*\}|crumbs:\s*null\b/.test(src)) return true;
  for (const m of src.matchAll(/\b(?:const|let|var)\s+(\w+)\s*(?::[^=]+)?=\s*null\b/g)) {
    if (new RegExp(`crumbs=\\{\\s*${m[1]}\\s*\\}|crumbs:\\s*${m[1]}\\b`).test(src)) return true;
  }
  return false;
}

function crumbsNullTreffer(): string[] {
  const treffer: string[] = [];
  for (const dir of ["app", "components", "lib"]) {
    for (const f of walk(dir)) {
      if (!/\.(tsx?|mjs|js)$/.test(f)) continue;
      if (hatCrumbsNull(fs.readFileSync(path.join(ROOT, f), "utf8"))) treffer.push(f);
    }
  }
  return treffer.sort();
}

describe("Darstellung Paket (c): Gewichte und Farben (10-UI-SPEC § 11, K-3)", () => {
  it("Fixture: font-weight 700 und font-medium werden mit dem Fehlertext wörtlich gemeldet", () => {
    const fixture = [".titel { font-weight: 700; }", '<p className="font-medium text-primary-600">x</p>', ".ok { font-weight: 600; }"].join(
      "\n",
    );
    expect(darstellungsProbleme("fixture.tsx", fixture)).toEqual([
      "fixture.tsx: font-weight 700 gefunden – nur 400 und 600 verwenden.",
      "fixture.tsx: font-weight 500 gefunden – nur 400 und 600 verwenden.",
      "fixture.tsx: text-primary-600/text-ink-400 als Textfarbe – #784B10 bzw. #62626E verwenden.",
    ]);
    expect(darstellungsProbleme("f.css", ".a { font-weight: 800 } .b { font-weight: 500 }")).toEqual([
      "f.css: font-weight 800 gefunden – nur 400 und 600 verwenden.",
      "f.css: font-weight 500 gefunden – nur 400 und 600 verwenden.",
    ]);
    expect(darstellungsProbleme("f.tsx", '<span className="font-extrabold text-ink-400 font-bold">')).toHaveLength(3);
    expect(darstellungsProbleme("f.css", ".a { font-weight: 400 } .b { font-weight: 600 } .c { color: #62626e }")).toEqual([]);
  });

  it("Geltungsbereich: Rechner, Support, Rechtsseiten, 404, Legal und ContentKopf – ohne CraftOSLogo.tsx (K-3)", () => {
    const dateien = geltungsbereich();
    for (const pflicht of [
      "app/rechner/page.tsx",
      "app/rechner/stundensatz/page.tsx",
      "app/rechner/angebotskalkulation/page.tsx",
      "app/support/page.tsx",
      "app/impressum/page.tsx",
      "app/datenschutz/page.tsx",
      "app/agb/page.tsx",
      "app/not-found.tsx",
      "components/legal/Legal.tsx",
      "components/legal/Legal.module.css",
      "components/calculators/CalculatorPage.tsx",
      "components/calculators/Calculators.module.css",
      "components/calculators/HourlyRateCalculator.tsx",
      "components/calculators/OfferCalculator.tsx",
      "components/calculators/CalculatorFields.tsx",
      "components/content/ContentKopf.tsx",
      "components/content/ContentKopf.module.css",
    ]) {
      expect(dateien, pflicht).toContain(pflicht);
    }
    // K-3: Das Logo prüft Paket (b); die Datei existiert, liegt aber nicht im Geltungsbereich dieses Tests.
    expect(fs.existsSync(path.join(ROOT, "components/CraftOSLogo.tsx"))).toBe(true);
    expect(dateien).not.toContain("components/CraftOSLogo.tsx");
    expect(dateien.filter((d) => d.startsWith("components/content/") && !d.startsWith("components/content/ContentKopf."))).toEqual([]);
  });

  it("im Geltungsbereich nur 400 und 600, kein text-primary-600 und kein text-ink-400", () => {
    const probleme = geltungsbereich().flatMap((d) => darstellungsProbleme(d, fs.readFileSync(path.join(ROOT, d), "utf8")));
    expect(probleme).toEqual([]);
  });
});

describe("ContentKopf: crumbs={null} nur auf der 404-Seite (10-UI-SPEC K1, J1, § 11)", () => {
  it("Fixture: null-Ketten werden erkannt, crumbsFor nicht", () => {
    expect(hatCrumbsNull('<ContentKopf crumbs={null} eyebrow="x" />')).toBe(true);
    expect(hatCrumbsNull("const props = { crumbs: null, eyebrow: 'x' };")).toBe(true);
    expect(hatCrumbsNull("const ohne = null;\n<ContentKopf crumbs={ohne} />")).toBe(true);
    expect(hatCrumbsNull('<ContentKopf crumbs={crumbsFor("/rechner")} />')).toBe(false);
  });

  it("eine andere Datei mit crumbs={null} wird mit dem Fehlertext gemeldet; im Repo nur app/not-found.tsx", () => {
    const melde = (treffer: string[]) => {
      const fremd = treffer.filter((t) => t !== "app/not-found.tsx");
      if (fremd.length > 0) throw new Error(`${CRUMBS_NULL_FEHLER} (${fremd.join(", ")})`);
    };
    expect(() => melde(["app/not-found.tsx", "app/rechner/page.tsx"])).toThrow(CRUMBS_NULL_FEHLER);
    const treffer = crumbsNullTreffer();
    expect(() => melde(treffer)).not.toThrow();
    expect(treffer).toEqual(["app/not-found.tsx"]);
  });
});
