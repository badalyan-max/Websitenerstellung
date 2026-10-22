// Prompt-Mapping (08 D-10, D-11, D-18): jeder Eintrag des SE-Ranking-AI-Trackers hat ein festgelegtes,
// prüfbares Ziel (Seite#Anker). Die Existenz der Anker und die Antwort darunter prüft das Post-Build-Audit
// (node scripts/seo-audit.mjs --only=prompts); hier werden Datei, Rohdaten-Abgleich und Zielpfade geprüft.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { keywordMap } from "@/lib/keyword-map";
import mapping from "@/docs/seo/ai-prompts-targets.json";
import roh from "@/docs/seo/data/2026-10-22-ai-tracker-prompts.json";

const ROOT = path.resolve(import.meta.dirname, "..");
const toPath = (url: string) => new URL(url).pathname.replace(/\/$/, "") || "/";
const ohneAnker = (t: string) => t.split("#")[0];

type Eintrag = { engine: string; promptLlmId: number; prompt: string; target: string; phase: number };
type RohEngine = { engine: { base_name: string }; prompts?: { items?: { prompt_llm_id: string; prompt: string }[] } };
const prompts = mapping.prompts as Eintrag[];
const rohItems = (roh.engines as RohEngine[]).flatMap((e) =>
  (e.prompts?.items ?? []).map((i) => ({ engine: e.engine.base_name, id: Number(i.prompt_llm_id), prompt: i.prompt })),
);

describe("ai-prompts-targets.json", () => {
  it("führt alle 20 Tracker-Einträge: 16 ChatGPT, 2 Perplexity, 2 Google AI Overview (D-18)", () => {
    expect(prompts).toHaveLength(20);
    expect(rohItems).toHaveLength(20);
    const zahl = (engine: string) => prompts.filter((p) => p.engine === engine).length;
    expect(zahl("chatgpt")).toBe(16);
    expect(zahl("perplexity")).toBe(2);
    expect(zahl("google_ai_overview")).toBe(2);
    const schluessel = prompts.map((p) => `${p.engine}:${p.promptLlmId}`);
    expect(new Set(schluessel).size, "(engine, promptLlmId) eindeutig").toBe(20);
    for (const p of prompts) {
      expect(typeof p.target, p.prompt).toBe("string");
      expect([6, 7, 8, 9], p.prompt).toContain(p.phase);
    }
  });

  it("jede ID und jeder Prompttext stammt aus den Rohdaten (nicht geraten)", () => {
    expect(mapping.stand).toBe(roh.fetchedAt.slice(0, 10));
    expect(fs.existsSync(path.join(ROOT, mapping.quelle)), mapping.quelle).toBe(true);
    for (const p of prompts) {
      const treffer = rohItems.filter((r) => r.engine === p.engine && r.id === p.promptLlmId);
      expect(treffer, `${p.engine} ${p.promptLlmId}`).toHaveLength(1);
      expect(treffer[0].prompt, `${p.engine} ${p.promptLlmId}`).toBe(p.prompt);
    }
  });

  it("jedes Ziel ist ein Sitemap-Pfad oder ein geplanter Phase-8-Pfad der Keyword-Map", async () => {
    const sitemapPaths = new Set((await sitemap()).map((e) => toPath(e.url)));
    for (const p of prompts) {
      const pfad = ohneAnker(p.target);
      const eintrag = keywordMap.find((k) => k.path === pfad);
      const geplant8 = eintrag?.status === "geplant" && eintrag.phase === 8;
      expect(sitemapPaths.has(pfad) || geplant8, `${p.prompt} → ${p.target}`).toBe(true);
      if (geplant8) expect(p.phase, p.target).toBe(8);
    }
  });

  it("Phase-8-Ziele laut 08-UI-SPEC § 8, Bestandsziele mit vorhandener -titel-id, Gewerke in Phase 9", () => {
    const ziel = (engine: string, prompt: string) => prompts.find((p) => p.engine === engine && p.prompt === prompt);
    const phase8 = new Set(prompts.filter((p) => p.phase === 8).map((p) => p.target));
    expect([...phase8].sort()).toEqual(
      [
        "/fakten-ueber-craftos#was-ist-craftos",
        "/preise#app-lizenz",
        "/preise#was-kostet-handwerkersoftware",
        "/vergleich#antwort",
        "/vergleich/handwerkersoftware-kleine-betriebe#antwort",
        "/vergleich/hero-alternative#antwort",
        "/vergleich/plancraft-alternative#antwort",
        "/vergleich/tooltime-alternative#antwort",
      ].sort(),
    );
    expect(ziel("chatgpt", "Welche Handwerkersoftware ist die beste für kleine Betriebe?")?.target).toBe(
      "/vergleich/handwerkersoftware-kleine-betriebe#antwort",
    );
    expect(ziel("perplexity", "Welche Handwerkersoftware ist die beste für kleine Betriebe?")?.target).toBe(
      "/vergleich/handwerkersoftware-kleine-betriebe#antwort",
    );
    expect(ziel("chatgpt", "Was ist CraftOS?")?.target).toBe("/fakten-ueber-craftos#was-ist-craftos");
    expect(ziel("chatgpt", "Welche App eignet sich für die Zeiterfassung im Handwerk?")?.target).toBe(
      "/funktionen/zeiterfassung#faq-titel",
    );
    for (const p of prompts.filter((x) => x.phase < 8)) expect(p.target, p.prompt).toMatch(/#[a-z0-9-]+-titel$/);
    expect(ziel("chatgpt", "Software für Elektrobetriebe")).toMatchObject({ target: "/gewerke/elektriker", phase: 9 });
    expect(ziel("chatgpt", "Software für Malerbetriebe")).toMatchObject({ target: "/gewerke/maler", phase: 9 });
  });

  it("luecken enthält genau die geplanten Phase-9-Pfade der Keyword-Map (D-11)", () => {
    const soll = keywordMap.filter((k) => k.status === "geplant" && k.phase === 9).map((k) => k.path).sort();
    expect(soll.length).toBeGreaterThan(0);
    const luecken = mapping.luecken as { path: string; phase: number }[];
    expect(luecken.map((l) => l.path).sort()).toEqual(soll);
    for (const l of luecken) expect(l.phase, l.path).toBe(9);
  });
});

describe("Keyword-Map: neue Seite für kleine Betriebe (08-UI-SPEC § 8)", () => {
  it("ist als geplant (Phase 8) ohne Hauptkeyword mit Zielwerten geführt", () => {
    const e = keywordMap.find((k) => k.path === "/vergleich/handwerkersoftware-kleine-betriebe");
    expect(e).toBeDefined();
    expect(e).toMatchObject({ status: "geplant", phase: 8, primary: null, secondary: [], competitors: [] });
    expect(e!.reason).toContain("export--candidates-1.json");
    expect(e!.target).toEqual({
      title: "Handwerkersoftware für kleine Betriebe: Kriterien | CraftOS",
      h1: "Handwerkersoftware für kleine Betriebe im Vergleich",
      description:
        "Handwerkersoftware für kleine Betriebe: belegte Kriterien zu E-Rechnung, Laufzeit, Kosten pro Person und Mobile-App, fünf Anbieter mit Quellen und Stand.",
    });
  });
});
