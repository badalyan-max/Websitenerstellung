/**
 * Leitlinien-Schutz „Nur, was unterstützt wird, nicht, was nicht unterstützt wird“ (Inhaber 22.10.2026;
 * 08-REVIEW ME-06). Ein zentraler Helfer in lib/nur-unterstuetzt.ts prüft alle Inhaltsmodule unter lib/seiten
 * (Kernseiten, Preise, Vergleich, kleine Betriebe, Alternativen) und das gerenderte HTML der zehn Phase-8-Seiten.
 * Einzige Ausnahme ist die GoBD-Zertifizierungsfrage auf /gobd (rechtlich geboten). Artikel und Gewerke folgen in
 * Phase 9.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NEGATIVSATZ, nurUnterstuetztVerstoesse, pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import { gobdSections } from "@/lib/seiten/gobd";

const ROOT = path.resolve(import.meta.dirname, "..");
const ERLAUBT = [gobdSections.zertifizierung.lead];

describe("Helfer nurUnterstuetztVerstoesse", () => {
  it("meldet Negativsätze, Nein-Antworten und verneinte CraftOS-Zellen", () => {
    const faelle: [string, unknown][] = [
      ["Satz „kann nicht“", { text: "CraftOS kann keine Fahrzeuge orten." }],
      ["Satz „nicht verfügbar“", { text: "Bei CraftOS ist das nicht verfügbar." }],
      ["Satz „zeigt … nicht“", { text: "Aktuelle Aufenthaltsorte des Teams zeigt die Karte nicht." }],
      ["Satz „nicht aufgezeichnet“", { text: "Bewegungsverläufe werden nicht aufgezeichnet." }],
      ["„Teilweise“", { text: "Teilweise: bereits geladene mobile Daten." }],
      ["„Grenzen“", { lead: "Angaben zu Lizenzen und Grenzen der Handwerkersoftware." }],
      ["Verbindungspflicht", { a: "Fotos und KI brauchen eine Verbindung." }],
      ["Nein-FAQ ohne Funktionsfrage", { faq: [{ q: "Ist CraftOS ein einmaliger Kauf?", a: "Nein. CraftOS ist ein Abo." }] }],
      ["Nein-Zelle in CraftOS-Tabelle", { rows: [{ label: "Web-App", cells: { voll: true, app: false } }] }],
      ["Strich in der CraftOS-Zeile", { rows: [{ label: "CraftOS", cells: { a: "–" } }, { label: "HERO", cells: { a: "Ja" } }] }],
      ["verneinte CraftOS-Zelle (Alternative)", { rows: [{ label: "KI-Telefon", craftos: "nicht verfügbar", wettbewerber: true }] }],
    ];
    for (const [name, inhalt] of faelle) expect(nurUnterstuetztVerstoesse(inhalt), name).not.toEqual([]);
  });

  it("lässt positive Texte, Wettbewerberzellen, Datenmodule und die erlaubte Ausnahme durch", () => {
    expect(nurUnterstuetztVerstoesse({ text: "Die Web-App zeigt geplante Einsatzorte mit Tages- und Mitarbeiterfilter." })).toEqual([]);
    expect(
      nurUnterstuetztVerstoesse({
        rows: [
          { label: "CraftOS", cells: { a: "1 Monat" } },
          { label: "HERO", cells: { a: "nicht angegeben" } },
        ],
      }),
    ).toEqual([]);
    expect(nurUnterstuetztVerstoesse({ rows: [{ label: "Lager", craftos: true, wettbewerber: false }] })).toEqual([]);
    expect(nurUnterstuetztVerstoesse({ wettbewerber: { staerken: ["CraftOS kann keine Fahrzeuge orten."] } })).toEqual([]);
    const ausnahme = { faq: [{ q: "Ist CraftOS GoBD-zertifiziert?", a: "Nein. Begründung." }] };
    expect(nurUnterstuetztVerstoesse(ausnahme)).not.toEqual([]);
    expect(nurUnterstuetztVerstoesse(ausnahme, { erlaubt: ["Nein. Begründung."] })).toEqual([]);
  });

  it("pruefeNurUnterstuetzt wirft mit Kontext und Kennzeichnung der Inhabervorgabe", () => {
    expect(() => pruefeNurUnterstuetzt({ a: "CraftOS bietet keinen KI-Empfang." }, { kontext: "Test" })).toThrow(
      /Test: .*Inhaber 22\.10\.2026/,
    );
    expect(NEGATIVSATZ.test("Nicht zu verwechseln: CraftOS-PC ist ein anderes Projekt.")).toBe(false);
  });
});

describe("alle Inhaltsmodule unter lib/seiten", () => {
  const dateien = fs
    .readdirSync(path.join(ROOT, "lib/seiten"))
    .filter((d) => d.endsWith(".ts"))
    .map((d) => d.replace(/\.ts$/, ""));

  it("umfasst die Kernseiten, Preise, Vergleich und kleine Betriebe", () => {
    expect(dateien.sort()).toEqual(["craft-ai", "fakten", "gobd", "kleine-betriebe", "preise", "vergleich"]);
  });

  for (const name of dateien)
    it(`lib/seiten/${name}.ts nennt nur Unterstütztes (Ausnahme GoBD-Zertifizierung)`, async () => {
      const mod = (await import(`@/lib/seiten/${name}`)) as Record<string, unknown>;
      expect(nurUnterstuetztVerstoesse(mod, { erlaubt: ERLAUBT })).toEqual([]);
    });

  it("Alternativen-Seiten nennen nur Unterstütztes", async () => {
    const { baueAlternative } = await import("@/lib/seiten/alternativen");
    for (const slug of ["plancraft", "craftnote", "hero", "tooltime"] as const)
      expect(nurUnterstuetztVerstoesse(baueAlternative(slug)), slug).toEqual([]);
  });
});

/** Text der Absätze, Definitionen und Listenpunkte einer gerenderten Seite. */
function bloecke(html: string): string[] {
  return [...html.matchAll(/<(p|dd|li)\b[^>]*>([\s\S]*?)<\/\1>/g)]
    .map((m) =>
      m[2]
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

/** Antworten des FAQPage-Blocks. */
function faqAntworten(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const walk = (v: unknown) => {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;
        if (o["@type"] === "Answer" && typeof o.text === "string") out.push(o.text);
        Object.values(o).forEach(walk);
      }
    };
    walk(JSON.parse(m[1]));
  }
  return out;
}

describe("gerendertes HTML der zehn Phase-8-Seiten", () => {
  const SEITEN = [
    "preise",
    "fakten-ueber-craftos",
    "craft-ai",
    "gobd",
    "vergleich",
    "vergleich/handwerkersoftware-kleine-betriebe",
    "vergleich/plancraft-alternative",
    "vergleich/craftnote-alternative",
    "vergleich/hero-alternative",
    "vergleich/tooltime-alternative",
  ];

  for (const seite of SEITEN)
    it(`/${seite}: keine Negativsätze, keine Nein- oder Teilweise-Antwort (Ausnahme GoBD-Zertifizierung)`, async () => {
      const mod = (await import(`@/app/${seite}/page`)) as { default: () => React.ReactElement };
      const html = renderToString(createElement(mod.default));
      const texte = [...bloecke(html), ...faqAntworten(html)].filter((t) => !ERLAUBT.includes(t));
      expect(texte.length).toBeGreaterThan(5);
      expect(texte.filter((t) => NEGATIVSATZ.test(t) || /^(Nein|Teilweise)\b/.test(t))).toEqual([]);
    });
});
