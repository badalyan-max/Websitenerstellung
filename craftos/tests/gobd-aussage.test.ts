/**
 * D-43 GoBD-Aussage (Inhaber 23.10.2026: „generell auch, dass wir GoBD-konform sind, voll“; 10-CONTEXT.md,
 * Nachtrag D-43). Die Website sagt durchgehend und positiv „CraftOS ist GoBD-konform“: auf /gobd, auf
 * /fakten-ueber-craftos, in der Startseiten-FAQ und in llms.txt. Die Zertifizierungsfrage wird positiv beantwortet
 * („Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: …“), ohne „Nein“ am Anfang
 * und ohne Behauptung, CraftOS sei zertifiziert, geprüft oder testiert. Die Altformulierungen „unterstützt
 * GoBD-konforme Abläufe“ und „… organisiert Ihr Betrieb“ kommen in lib/ und content/ nicht mehr vor.
 *
 * Belege (Release-Code craft-connect-buddy, origin/release): LockDocumentDialog.tsx und `is_locked`-Trigger
 * (Festschreibung, Löschsperre), useConfirmReview.ts (Sperre geprüfter Eingangsrechnungen), DATABASE.md
 * („immutable audit log“), Dokumentversionen, unverändert archiviertes E-Rechnungs-XML, DATEV-Export (EXTF und
 * Beleg-ZIP).
 */
import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { faqContent } from "@/lib/home-content";
import { keywordMap } from "@/lib/keyword-map";
import { buildLlmsTxt } from "@/lib/llms";
import { nurUnterstuetztVerstoesse } from "@/lib/nur-unterstuetzt";
import * as gobd from "@/lib/seiten/gobd";

const ROOT = path.resolve(import.meta.dirname, "..");
const KERN = "CraftOS ist GoBD-konform";
const FRAGE = "Ist CraftOS GoBD-zertifiziert?";

/** Sichtbarer Text und JSON-LD einer gerenderten Seite, Tags entfernt und Entitäten aufgelöst. */
async function seitenText(seite: string): Promise<string> {
  const mod = (await import(`@/app/${seite}/page`)) as { default: () => ReactElement };
  return renderToString(createElement(mod.default))
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ");
}

/** Quelltexte unter lib/ und content/ (Inhalte, Module, Markdown, Daten). */
function dateien(dir: string): string[] {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) return dateien(rel);
    return /\.(ts|tsx|md|mdx|json)$/.test(e.name) ? [rel] : [];
  });
}
const QUELLEN = ["lib", "content"].flatMap(dateien);

describe("Kernaussage „CraftOS ist GoBD-konform“ (D-43)", () => {
  it("/gobd", async () => {
    expect(await seitenText("gobd")).toContain(KERN);
  });

  it("/fakten-ueber-craftos", async () => {
    expect(await seitenText("fakten-ueber-craftos")).toContain(KERN);
  });

  it("Startseiten-FAQ", () => {
    const gobdFrage = faqContent.find((f) => f.q.includes("GoBD"));
    expect(gobdFrage).toBeDefined();
    expect(gobdFrage!.a).toContain(KERN);
  });

  it("llms.txt", () => {
    expect(buildLlmsTxt()).toContain(KERN);
  });
});

describe("Zertifizierungsfrage positiv beantwortet (D-43)", () => {
  const { title, lead } = gobd.gobdSections.zertifizierung;

  it("Frage bleibt, Antwort beginnt mit der amtlichen Einordnung und nennt die Belege", () => {
    expect(title).toBe(FRAGE);
    expect(lead.startsWith("Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: ")).toBe(true);
    expect(lead).not.toMatch(/^Nein/);
    for (const beleg of ["Festschreibung", "Löschsperre", "Eingangsrechnungen", "Änderungsprotokoll", "Dokumentversionen", "E-Rechnungs-XML", "DATEV-Export", "EXTF", "Beleg-ZIP"])
      expect(lead, beleg).toContain(beleg);
  });

  it("lib/seiten/gobd.ts nennt nur Unterstütztes, ohne erlaubt-Ausnahme", () => {
    expect(nurUnterstuetztVerstoesse(gobd)).toEqual([]);
    expect(fs.readFileSync(path.join(ROOT, "lib/seiten/gobd.ts"), "utf8")).not.toMatch(/erlaubt:/);
  });

  it("Helfer meldet Zertifizierungsbehauptungen und lässt die Frage durch", () => {
    for (const fall of [
      "CraftOS ist GoBD-zertifiziert.",
      "Die Software ist zertifiziert und erfüllt die GoBD.",
      "CraftOS ist GoBD-geprüft.",
      "Die Abläufe sind von einem Wirtschaftsprüfer testiert.",
    ])
      expect(nurUnterstuetztVerstoesse({ text: fall }), fall).not.toEqual([]);
    expect(nurUnterstuetztVerstoesse({ title: FRAGE, lead })).toEqual([]);
    expect(nurUnterstuetztVerstoesse({ text: "Geprüfte Eingangsrechnungen werden gesperrt." })).toEqual([]);
  });
});

describe("Altformulierungen entfernt (D-43)", () => {
  it("umfasst lib/ und content/", () => {
    expect(QUELLEN).toContain("lib/seiten/gobd.ts");
    expect(QUELLEN).toContain("content/hilfe/rechnung-fertigstellen.md");
  });

  for (const datei of QUELLEN)
    it(`${datei}: kein „unterstützt GoBD-konforme“, kein „organisiert Ihr Betrieb“, „zertifiziert“ nur in der Frage`, () => {
      const inhalt = fs.readFileSync(path.join(ROOT, datei), "utf8");
      expect(inhalt).not.toMatch(/unterstützt\s+GoBD-(konforme|gerechte)/i);
      expect(inhalt).not.toMatch(/organisiert\s+Ihr\s+Betrieb/i);
      expect(inhalt.split(FRAGE).join(" ")).not.toMatch(/zertifiziert/i);
    });

  it("/gobd: „zertifiziert“ steht nur in der Frage", async () => {
    expect((await seitenText("gobd")).split(FRAGE).join(" ")).not.toMatch(/zertifiziert/i);
  });

  it("Keyword-Map: /gobd und /fakten-ueber-craftos ohne „unterstützt“ bzw. „GoBD-Unterstützung“", () => {
    const ziel = (p: string) => keywordMap.find((k) => k.path === p)?.target;
    const g = ziel("/gobd");
    for (const wert of [g?.title, g?.h1, g?.description]) expect(wert ?? "").not.toMatch(/unterstützt/i);
    expect(ziel("/fakten-ueber-craftos")?.description ?? "").not.toMatch(/GoBD-Unterstützung/);
  });
});
