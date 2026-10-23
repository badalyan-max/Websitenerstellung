/**
 * Datenstandort und Cloud (Zusatzauftrag Spur 10-f, Inhaber 23.10.2026): Der Fakt liegt einmal in
 * lib/datenstandort.ts und erscheint wörtlich auf /preise (sichtbar und im FAQPage-JSON-LD), auf
 * /fakten-ueber-craftos (sichtbar und im FAQPage-JSON-LD) und in llms.txt. Belegt sind nur Frankfurt am Main
 * (Datenbank) und europäische Rechenzentren (Dateien); keine Deutschland- oder Ausschließlichkeitszusage.
 */
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TEXT_BUDGET, charCount } from "@/components/v2/budgets";
import { datenstandort } from "@/lib/datenstandort";
import { l1Treffer } from "@/lib/leitlinie";
import { buildLlmsTxt } from "@/lib/llms";
import { NEGATIVSATZ } from "@/lib/nur-unterstuetzt";
import { uwgTreffer } from "@/lib/wettbewerber";

const text = (html: string) =>
  html
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ");

function faqLd(html: string): [string, string][] {
  const knoten = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]) as Record<string, unknown>)
    .find((d) => d["@type"] === "FAQPage");
  if (!knoten) return [];
  return (knoten.mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map((q) => [q.name, q.acceptedAnswer.text]);
}

async function seite(modul: Promise<{ default: () => unknown }>): Promise<string> {
  const mod = await modul;
  return renderToString(createElement(mod.default as () => ReactElement));
}

/** Verbotene Zusagen zum Datenstandort (nicht belegt: R2-Jurisdiktion „default“). */
const UEBERZUSAGE = /Server in Deutschland|deutsche[nr]? Server|alle Daten in Deutschland|ausschließlich/i;
const STANDORT = /Frankfurt|Rechenzentr|Datenstandort|Server|Hosting|gehostet/i;

/** Sätze eines Textes, die den Datenstandort betreffen und eine Überzusage enthalten. */
function ueberzusagen(t: string): string[] {
  return t
    .split(/(?<=[.!?])\s+|\n/)
    .filter((satz) => STANDORT.test(satz) && UEBERZUSAGE.test(satz));
}

describe("zentrale Quelle lib/datenstandort.ts", () => {
  it("Kernsatz: Cloud, Datenbank in Frankfurt am Main, Dateien in europäischen Rechenzentren; positiv", () => {
    const { kern } = datenstandort;
    expect(kern).toContain("Cloud");
    expect(kern).toContain("Frankfurt am Main");
    expect(kern).toContain("europäischen Rechenzentren");
    expect(charCount(kern)).toBeLessThanOrEqual(TEXT_BUDGET.faq.answerCentral);
    expect(NEGATIVSATZ.test(kern)).toBe(false);
    expect(uwgTreffer(kern)).toBeUndefined();
    expect(l1Treffer(kern)).toEqual([]);
    for (const f of [datenstandort.faqPreise, datenstandort.faqFakten]) {
      expect(f.q.endsWith("?")).toBe(true);
      expect(charCount(f.q)).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(f.a).toBe(kern);
    }
  });

  it("weder „Server in Deutschland“ noch „ausschließlich“ im Zusammenhang mit dem Datenstandort", () => {
    expect(ueberzusagen(JSON.stringify(datenstandort))).toEqual([]);
    expect(datenstandort.kern).not.toMatch(UEBERZUSAGE);
    expect(ueberzusagen("Ihre Daten liegen ausschließlich auf Servern in Frankfurt.")).toHaveLength(1);
  });
});

describe("Zielorte beziehen den Fakt aus der zentralen Quelle", () => {
  it("/preise: FAQ „Wo liegen meine Daten?“ sichtbar und im FAQPage-JSON-LD, ohne Überzusage", async () => {
    const html = await seite(import("@/app/preise/page"));
    expect(text(html)).toContain(datenstandort.kern);
    expect(faqLd(html)).toContainEqual([datenstandort.faqPreise.q, datenstandort.kern]);
    expect(ueberzusagen(text(html))).toEqual([]);
  });

  it("/fakten-ueber-craftos: Faktenpunkt als FAQ, sichtbar und im FAQPage-JSON-LD, ohne Überzusage", async () => {
    const html = await seite(import("@/app/fakten-ueber-craftos/page"));
    expect(text(html)).toContain(datenstandort.kern);
    expect(faqLd(html)).toContainEqual([datenstandort.faqFakten.q, datenstandort.kern]);
    expect(ueberzusagen(text(html))).toEqual([]);
  });

  it("llms.txt nennt den Datenstandort als Faktenpunkt, ohne Überzusage", () => {
    const llms = buildLlmsTxt();
    expect(llms).toContain(`- Datenstandort: ${datenstandort.kern}`);
    expect(ueberzusagen(llms)).toEqual([]);
  });
});
