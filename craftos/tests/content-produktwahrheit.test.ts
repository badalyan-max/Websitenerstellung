/**
 * Produktwahrheit und Leitlinie L-1 (Inhaber, 22.10.2026; 09-UI-SPEC § 5, 09-VALIDATION „Produktwahrheit und L-1“):
 * Die Website nennt nur, was unterstützt wird. Wortliste, Altbegriffe und Ausnahmen kommen ausschließlich aus
 * lib/leitlinie-l1.json (über lib/leitlinie.ts). Geltungsbereich ab Welle 2: content/blog, content/hilfe und die
 * String-Literale von lib/gewerke.ts; ab der Integration (09-09) zusätzlich lib/funktionen.ts,
 * lib/funktionsdetails/*.ts und lib/app-content.ts (umgesetzt in 09-09, ohne Übergangsliste). TypeScript-Dateien werden nur über ihre String-Literale
 * geprüft (scripts/lib/ts-literale.mjs, K-10/W6) – Belegkommentare bleiben unberührt.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { l1Treffer } from "@/lib/leitlinie";
import leitlinie from "@/lib/leitlinie-l1.json";
import { artikelAussagen, nurUnterstuetztVerstoesse } from "@/lib/nur-unterstuetzt";
import { stringLiterale } from "../scripts/lib/ts-literale.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const MD_ORDNER = ["content/blog", "content/hilfe"];
/** Seit 09-09 zusätzlich die Produktdaten der Funktionsseiten und der App-Seite (09-UI-SPEC § 5 „Geltungsbereich“). */
const TS_DATEIEN = [
  "lib/gewerke.ts",
  "lib/funktionen.ts",
  ...fs
    .readdirSync(path.join(ROOT, "lib/funktionsdetails"))
    .filter((n) => n.endsWith(".ts"))
    .sort()
    .map((n) => `lib/funktionsdetails/${n}`),
  "lib/app-content.ts",
];

/** Fehlertext aus 09-UI-SPEC § 5 (wörtlich). */
const fehlertext = (pfad: string, wort: string) =>
  `Text ${pfad} enthält ‚${wort}‘ – nur Unterstütztes nennen (Leitlinie L-1).`;

const GAEB = leitlinie.ausnahmen.find((a) => a.id === "gaeb-formate-fachteil")!;
const PFLICHT = leitlinie.ausnahmen.find((a) => a.id === "pflichthinweise")!;

/** Ausnahme 3: rechtlich nötige Hinweise in genau dieser Form aus dem Text nehmen. */
function ohnePflichthinweise(text: string): string {
  let out = text;
  for (const t of PFLICHT.texte ?? []) out = out.split(t).join(" ");
  return out;
}

/**
 * Ausnahme 1: neutraler Fachteil von /blog/gaeb-formate – H2-Abschnitte, deren Überschrift und Text „CraftOS“
 * nicht nennen, entfallen; Frontmatter, Einleitung und Abschnitte mit CraftOS-Bezug bleiben in der Prüfung.
 */
function ohneGaebFachteil(markdown: string): string {
  const teile = markdown.split(/^(?=## )/m);
  return teile.filter((teil, i) => i === 0 || !teil.startsWith("## ") || /CraftOS/.test(teil)).join("");
}

/**
 * Treffer einer Datei als „datei: wort“ (eindeutig je Wort). Seit 09-REVIEW ME-04 ohne Listenwort-Ausnahme: Die
 * einzige Wortliste ist lib/leitlinie-l1.json; ein Literal, das genau einem Leitlinienwort entspricht (z. B.
 * `label: "Onlinezahlung"`), ist sichtbarer Text und wird gemeldet.
 */
function trefferInDatei(rel: string, inhalt: string): { datei: string; wort: string }[] {
  let text = rel.endsWith(".ts") ? stringLiterale(inhalt).join("\n") : inhalt;
  if (rel === GAEB.datei) text = ohneGaebFachteil(text);
  return l1Treffer(ohnePflichthinweise(text)).map((wort) => ({ datei: rel, wort }));
}

function dateien(): string[] {
  const out: string[] = [];
  for (const ordner of MD_ORDNER)
    for (const name of fs.readdirSync(path.join(ROOT, ordner)).sort())
      if (name.endsWith(".md")) out.push(`${ordner}/${name}`);
  return [...out, ...TS_DATEIEN];
}

describe("Leitlinie L-1 in Ratgebern, Hilfe, Gewerke- und Produktdaten", () => {
  it("Geltungsbereich umfasst funktionen.ts, alle Funktionsdetails und app-content.ts (09-09)", () => {
    expect(TS_DATEIEN).toContain("lib/funktionen.ts");
    expect(TS_DATEIEN).toContain("lib/app-content.ts");
    expect(TS_DATEIEN.filter((d) => d.startsWith("lib/funktionsdetails/")).length).toBeGreaterThanOrEqual(5);
  });

  it("kein Treffer in content/, lib/gewerke.ts, lib/funktionen.ts, lib/funktionsdetails/*.ts und lib/app-content.ts", () => {
    const treffer: string[] = [];
    for (const rel of dateien()) {
      const inhalt = fs.readFileSync(path.join(ROOT, rel), "utf8");
      for (const t of trefferInDatei(rel, inhalt)) treffer.push(fehlertext(t.datei, t.wort));
    }
    expect(treffer).toEqual([]);
  });

  it("Ausnahmen sind abschließend: genau drei mit Begründung", () => {
    expect(leitlinie.ausnahmen.map((a) => a.id)).toEqual(["gaeb-formate-fachteil", "gobd-faq-zertifiziert", "pflichthinweise"]);
    for (const a of leitlinie.ausnahmen) expect(a.begruendung.length, a.id).toBeGreaterThan(20);
  });
});

/**
 * Satzprüfung der Artikel (09-REVIEW ME-04): Dieselbe Prüfung wie für die TS-Inhaltsmodule (`NEGATIVSATZ`,
 * Nein-Antworten) läuft über Antwort, Frontmatter-FAQ und die Prosa jedes Artikels. Die Prosa liefert
 * `artikelAussagen` (Fragen, zitierte Oberflächentexte und „grenzen Sie … ein“ sind keine Aussagen über CraftOS).
 * Ausnahme wie bei L-1: der neutrale Fachteil von /blog/gaeb-formate.
 */
function satzVerstoesse(rel: string, inhalt: string): string[] {
  const { data, content } = matter(inhalt);
  const prosa = artikelAussagen(rel === GAEB.datei ? ohneGaebFachteil(content) : content);
  return nurUnterstuetztVerstoesse({ answer: data.answer, faq: data.faq ?? [], prosa });
}

describe("Satzprüfung der Artikel (ME-04)", () => {
  it("keine Negativsätze und Nein-Antworten in Antwort, FAQ und Prosa der Ratgeber und Hilfeartikel", () => {
    const treffer: string[] = [];
    for (const rel of dateien().filter((d) => d.endsWith(".md")))
      for (const v of satzVerstoesse(rel, fs.readFileSync(path.join(ROOT, rel), "utf8"))) treffer.push(`${rel}: ${v}`);
    expect(treffer).toEqual([]);
  });

  it("meldet Negativsätze in Antwort, FAQ und Prosa", () => {
    const md = [
      "---",
      'answer: "CraftOS kann keine Fahrzeuge orten."',
      "faq:",
      '  - q: "Gibt es eine Kasse?"',
      '    a: "Nein, eine Kasse fehlt."',
      "---",
      "Die Ortung ist nicht möglich.",
    ].join("\n");
    expect(satzVerstoesse("content/hilfe/x.md", md)).toHaveLength(3);
  });

  it("Fragen, zitierte Meldungen und „grenzen Sie … ein“ sind keine Aussagen", () => {
    const md = [
      "### Warum wird ein Mangel nicht angezeigt?",
      "Die App zeigt „Stornierung nicht möglich“, wenn die Rechnung bezahlt ist.",
      "1. Grenzen Sie die Liste mit dem Filter ein.",
      "Warum ist das nicht möglich? Weil die Rechnung festgeschrieben ist.",
    ].join("\n");
    expect(nurUnterstuetztVerstoesse({ prosa: artikelAussagen(md) })).toEqual([]);
    expect(artikelAussagen(md)).toContain("Weil die Rechnung festgeschrieben ist.");
  });
});

describe("Prüfmechanik (Fixtures)", () => {
  it("Markdown: Treffer je Wort mit Fehlertext", () => {
    const t = trefferInDatei("content/hilfe/x.md", "Im Portal ist keine Onlinezahlung möglich. DATANORM v5 ist nicht zugesagt.");
    expect(t.map((x) => x.wort)).toEqual(["nicht zugesagt", "keine Onlinezahlung", "Onlinezahlung", "DATANORM v5"]);
    expect(fehlertext("content/hilfe/x.md", "Onlinezahlung")).toBe(
      "Text content/hilfe/x.md enthält ‚Onlinezahlung‘ – nur Unterstütztes nennen (Leitlinie L-1).",
    );
  });

  it("TypeScript: nur String-Literale, Kommentare bleiben unberührt", () => {
    const quelle = [
      "// Beleg: Portal ohne Onlinezahlung (PortalPaymentNotice.tsx)",
      "/* Altbegriff Neue Phase im Release */",
      'export const a = { text: "Rechnungen begleicht der Kunde per Überweisung." };',
      "export const b = `Vorlage ${a.text} ist Bald verfügbar.`;",
    ].join("\n");
    expect(trefferInDatei("lib/gewerke.ts", quelle).map((x) => x.wort)).toEqual(["Bald verfügbar"]);
  });

  it("TypeScript: ein Literal, das genau ein Leitlinienwort ist, zählt als sichtbarer Text (ME-04)", () => {
    const quelle = ['export const karte = { label: "Onlinezahlung" };', 'export const t = "DATANORM v5";'].join("\n");
    expect(trefferInDatei("lib/funktionsdetails/rechnung.ts", quelle).map((x) => x.wort)).toEqual([
      "Onlinezahlung",
      "DATANORM v5",
    ]);
  });

  it("gaeb-formate: neutraler Fachteil ausgenommen, CraftOS-Abschnitt und Einleitung geprüft", () => {
    const md = [
      "Einleitung.",
      "## Welche GAEB-Formate gibt es?",
      "GAEB 90 wird hier nicht unterstützt erklärt.",
      "## So unterstützt CraftOS",
      "CraftOS liest X83. DATANORM v5 bleibt.",
    ].join("\n");
    expect(trefferInDatei("content/blog/gaeb-formate.md", md).map((x) => x.wort)).toEqual(["DATANORM v5"]);
    expect(trefferInDatei("content/blog/anderer.md", md).map((x) => x.wort)).toEqual(["nicht unterstützt", "DATANORM v5"]);
    expect(trefferInDatei("content/blog/gaeb-formate.md", `Nicht unterstützt in der Einleitung.\n${md}`).length).toBe(2);
  });

  it("Pflichthinweis „Preise netto zzgl. USt.“ ist ausgenommen, Wörter daneben nicht", () => {
    expect(trefferInDatei("content/blog/x.md", "Preise netto zzgl. USt.")).toEqual([]);
    expect(trefferInDatei("content/blog/x.md", "Preise netto zzgl. USt. Bald verfügbar.").map((x) => x.wort)).toEqual([
      "Bald verfügbar",
    ]);
  });
});

describe("stringLiterale (scripts/lib/ts-literale.mjs, W6)", () => {
  it("liest einfache, doppelte und Template-Literale, keine Kommentare und keine Regex-Literale", () => {
    const quelle = [
      "// Kommentar mit \"Zitat\"",
      "const re = /\"nicht\"/g;",
      "const a = 'eins';",
      'const b = "zwei \\"drei\\"";',
      "const c = `vier ${a} fünf`;",
      "const d = `sechs`;",
    ].join("\n");
    expect(stringLiterale(quelle)).toEqual(["eins", 'zwei "drei"', "vier ", " fünf", "sechs"]);
  });

  it("verarbeitet lib/gewerke.ts ohne Fehler", () => {
    const quelle = fs.readFileSync(path.join(ROOT, "lib/gewerke.ts"), "utf8");
    expect(stringLiterale(quelle).length).toBeGreaterThan(50);
  });
});
