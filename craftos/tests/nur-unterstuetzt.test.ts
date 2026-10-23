/**
 * Leitlinien-Schutz „Nur, was unterstützt wird, nicht, was nicht unterstützt wird“ (Inhaber 22.10.2026;
 * 08-REVIEW ME-06). Ein zentraler Helfer in lib/nur-unterstuetzt.ts prüft alle Inhaltsmodule unter lib/seiten
 * (Kernseiten, Preise, Vergleich, kleine Betriebe, Alternativen) und das gerenderte HTML der zehn Phase-8-Seiten.
 * Seit D-43 (Inhaber 23.10.2026) ist auch die GoBD-Zertifizierungsantwort positiv; es gibt keine Ausnahme mehr.
 * Artikel und Gewerke folgen in Phase 9.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NEGATIVSATZ, nurUnterstuetztVerstoesse, pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";

const ROOT = path.resolve(import.meta.dirname, "..");

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
    it(`lib/seiten/${name}.ts nennt nur Unterstütztes (ohne Ausnahme, D-43)`, async () => {
      const mod = (await import(`@/lib/seiten/${name}`)) as Record<string, unknown>;
      expect(nurUnterstuetztVerstoesse(mod)).toEqual([]);
    }, 60_000); // Erster dynamischer Import unter Volllast dauert länger als 5 s (wie content-produktwahrheit).

  it("Alternativen-Seiten nennen nur Unterstütztes", async () => {
    const { baueAlternative } = await import("@/lib/seiten/alternativen");
    for (const slug of ["plancraft", "craftnote", "hero", "tooltime"] as const)
      expect(nurUnterstuetztVerstoesse(baueAlternative(slug)), slug).toEqual([]);
  });
});

/**
 * Hotfix 23.10.2026: Ein Chat bzw. KI-Assistent zu Betriebsdaten ist am Web-Release nur für Plattform-Entwickler
 * sichtbar (MainLayout.tsx: AiAgentPanel nur bei isDeveloper; Register notLive „KI-Agent“). Für Kunden live sind
 * KI-Funktionen auf Anforderung (Angebotschat, Belegscan, Diktieren in Berichten, Foto-Erkennung im Lager). Kein
 * Website-Text darf den Betriebsdaten-Chat als CraftOS-Funktion darstellen; der Slug des Hilfeartikels bleibt.
 */
describe("kein Betriebsdaten-Chat als Kundenfunktion (Hotfix 23.10.2026)", () => {
  const SLUG = /craft-ai-betriebsdaten-fragen/g;
  const CHAT_WORT = /frag|chat|abfrag|befrag|assistent|antwort/i;

  /** Fundstellen: KI-Assistent oder ein Satz, der Betriebsdaten mit Frage, Chat oder Antwort verbindet. */
  function betriebsdatenChat(text: string): string[] {
    const ohneSlug = text.replace(SLUG, "");
    const treffer = ohneSlug.match(/KI-Assistent\w*|Frag zu deinen Betriebsdaten/gi) ?? [];
    const saetze = ohneSlug.split(/(?<=[.!?:;])\s+|\n+/);
    return [...treffer, ...saetze.filter((s) => /betriebsdaten/i.test(s) && CHAT_WORT.test(s)).map((s) => s.trim())];
  }

  it("Helfer erkennt die bisherigen Formulierungen und lässt belegte KI-Funktionen durch", () => {
    for (const fall of [
      "Craft AI antwortet aus den Betriebsdaten, auf die Ihre Rolle Zugriff hat.",
      "Betriebsdaten per Text oder Sprache abfragen.",
      "KI Fragen stellen zu Betriebsdaten | CraftOS",
      "Öffnen Sie „KI-Assistent“ in der Seitenleiste.",
    ])
      expect(betriebsdatenChat(fall), fall).not.toEqual([]);
    expect(betriebsdatenChat("Im Angebotschat bereitet Craft AI einen Angebotsentwurf vor.")).toEqual([]);
    expect(betriebsdatenChat("Die Auswertung berücksichtigt die tatsächlich erfassten Betriebsdaten.")).toEqual([]);
    expect(betriebsdatenChat("[Anleitung](/hilfe/craft-ai-betriebsdaten-fragen)")).toEqual([]);
  });

  /** Quelltexte der Website: Inhalte, Komponenten, Routen, Markdown und die Keyword-Map. */
  function dateien(dir: string): string[] {
    return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => {
      const rel = path.posix.join(dir, e.name);
      if (e.isDirectory()) return dateien(rel);
      return /\.(ts|tsx|md|mdx)$/.test(e.name) ? [rel] : [];
    });
  }
  const QUELLEN = [...["app", "components", "lib", "content"].flatMap(dateien), "docs/seo/keyword-map.json"];

  it("umfasst Inhalte, Komponenten, Routen, Markdown und die Keyword-Map", () => {
    expect(QUELLEN).toContain("lib/seiten/craft-ai.ts");
    expect(QUELLEN).toContain("components/feature-snippet/SupplementalScene.tsx");
    expect(QUELLEN).toContain("content/hilfe/craft-ai-betriebsdaten-fragen.md");
  });

  for (const datei of QUELLEN)
    it(`${datei} stellt keinen Betriebsdaten-Chat dar`, () => {
      expect(betriebsdatenChat(fs.readFileSync(path.join(ROOT, datei), "utf8"))).toEqual([]);
    });

  it("llms.txt stellt keinen Betriebsdaten-Chat dar und verlinkt /craft-ai mit den belegten Funktionen", async () => {
    const { buildLlmsTxt } = await import("@/lib/llms");
    const text = buildLlmsTxt();
    expect(betriebsdatenChat(text)).toEqual([]);
    const zeile = text.split("\n").find((z) => z.includes("/craft-ai)"));
    expect(zeile).toBeDefined();
    for (const wort of ["Angebotschat", "Belegscan", "Diktat", "Foto-Erkennung"]) expect(zeile, wort).toContain(wort);
  });

  it("/craft-ai nennt die belegten KI-Funktionen und den Prüfgrundsatz", async () => {
    const mod = (await import("@/app/craft-ai/page")) as { default: () => React.ReactElement };
    const html = renderToString(createElement(mod.default));
    expect(betriebsdatenChat(html)).toEqual([]);
    for (const wort of ["Angebotschat", "Angebotsentwurf", "Belegscan", "Diktieren", "Foto-Erkennung", "Ins Angebot übernehmen"])
      expect(html, wort).toContain(wort);
    expect(html).toContain("Sie prüfen und bestätigen jede Übernahme.");
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
    it(`/${seite}: keine Negativsätze, keine Nein- oder Teilweise-Antwort (ohne Ausnahme, D-43)`, async () => {
      const mod = (await import(`@/app/${seite}/page`)) as { default: () => React.ReactElement };
      const html = renderToString(createElement(mod.default));
      const texte = [...bloecke(html), ...faqAntworten(html)];
      expect(texte.length).toBeGreaterThan(5);
      expect(texte.filter((t) => NEGATIVSATZ.test(t) || /^(Nein|Teilweise)\b/.test(t))).toEqual([]);
    });
});
