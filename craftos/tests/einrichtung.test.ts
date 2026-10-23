/**
 * D-41 Einrichtungsservice (Inhaber 23.10.2026, Spur 10-f): Der Fakt „Einrichtung kostenlos, CraftOS übernimmt die
 * Daten und richtet das Konto ein“ liegt einmal in lib/einrichtung.ts und erscheint wörtlich auf /preise (sichtbar,
 * Tarif-Hinweis und FAQPage-JSON-LD), /fakten-ueber-craftos, in llms.txt, auf den Alternativen-Seiten, im
 * /vergleich-Hub, auf /vergleich/handwerkersoftware-kleine-betriebe, in der Datenimport-FAQ und im Hilfeartikel.
 * Quelle: Inhaberangabe (10-CONTEXT.md, Nachtrag D-41), kein Produktcode.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AlternativePage } from "@/components/vergleich/AlternativePage";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { einrichtung } from "@/lib/einrichtung";
import { getFunktionsdetail } from "@/lib/funktionsdetails";
import { l1Treffer } from "@/lib/leitlinie";
import { buildLlmsTxt } from "@/lib/llms";
import { NEGATIVSATZ } from "@/lib/nur-unterstuetzt";
import { baueAlternative } from "@/lib/seiten/alternativen";
import { uwgTreffer } from "@/lib/wettbewerber";

const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

/** Sichtbarer Text ohne Tags und mit aufgelösten Entitäten. */
const text = (html: string) =>
  html
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ");

const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]) as Record<string, unknown>,
  );

/** Frage-Antwort-Paare aus dem FAQPage-Knoten einer Seite. */
function faqLd(html: string): [string, string][] {
  const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
  if (!faq) return [];
  return (faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map((q) => [q.name, q.acceptedAnswer.text]);
}

async function seite(modul: Promise<{ default: () => unknown }>): Promise<string> {
  const mod = await modul;
  return renderToString(createElement(mod.default as () => ReactElement));
}

describe("zentrale Quelle lib/einrichtung.ts", () => {
  it("Kernsatz: kostenlos, Daten und Konto durch CraftOS, positiv, ohne messbares Versprechen", () => {
    const { kern, wechsel, importSatz, tarifHinweis } = einrichtung;
    expect(kern.startsWith("Die Einrichtung ist kostenlos:")).toBe(true);
    expect(kern).toContain("Exportdateien");
    expect(kern).toContain("richten Ihr Konto ein");
    expect(wechsel.startsWith("Die Einrichtung ist kostenlos:")).toBe(true);
    expect(importSatz).toContain("CraftOS-Team");
    expect(tarifHinweis).toContain("kostenlos");
    for (const satz of [kern, wechsel, importSatz, tarifHinweis]) {
      expect(satz, satz).not.toMatch(/rund um die Uhr|24\/7|innerhalb|Stunden|Minuten|Werktag|sofort|garantiert/i);
      expect(NEGATIVSATZ.test(satz), satz).toBe(false);
      expect(uwgTreffer(satz), satz).toBeUndefined();
      expect(l1Treffer(satz), satz).toEqual([]);
      expect(satz, satz).not.toMatch(/\b(du|dein|deine)\b/i);
    }
    expect(charCount(kern)).toBeLessThanOrEqual(TEXT_BUDGET.faq.answerCentral);
    expect(sentenceCount(kern)).toBe(2);
    for (const f of [einrichtung.faqPreise, einrichtung.faqFakten, einrichtung.faqWechsel]) {
      expect(f.q.endsWith("?")).toBe(true);
      expect(charCount(f.q)).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(f.a).toBe(kern);
    }
  });
});

describe("Zielorte beziehen den Fakt aus der zentralen Quelle", () => {
  it("/preise: FAQ „Was kostet die Einrichtung?“ sichtbar und im FAQPage-JSON-LD, Hinweis bei den Tarifen", async () => {
    const html = await seite(import("@/app/preise/page"));
    expect(einrichtung.faqPreise.q).toBe("Was kostet die Einrichtung?");
    expect(text(html)).toContain(einrichtung.faqPreise.q);
    expect(text(html)).toContain(einrichtung.kern);
    expect(faqLd(html)).toContainEqual([einrichtung.faqPreise.q, einrichtung.kern]);
    const tabelle = html.slice(html.indexOf('data-abschnitt="lizenzen"'), html.indexOf('data-abschnitt="app-lizenz"'));
    expect(text(tabelle)).toContain(einrichtung.tarifHinweis);
  });

  it("/fakten-ueber-craftos: Faktenpunkt als FAQ, sichtbar und im FAQPage-JSON-LD", async () => {
    const html = await seite(import("@/app/fakten-ueber-craftos/page"));
    expect(text(html)).toContain(einrichtung.kern);
    expect(faqLd(html)).toContainEqual([einrichtung.faqFakten.q, einrichtung.kern]);
  });

  it("llms.txt nennt die Einrichtung als Faktenpunkt", () => {
    expect(buildLlmsTxt()).toContain(`- Einrichtung: ${einrichtung.kern}`);
  });

  it("alle vier Alternativen-Seiten: Wechsel-Antwort ergänzt; plancraft-Wechsel-FAQ ergänzt", () => {
    for (const slug of ["plancraft", "craftnote", "hero", "tooltime"] as const) {
      const inhalt = baueAlternative(slug);
      expect(inhalt.umstieg.answer, slug).toContain(einrichtung.wechsel);
      const html = renderToString(createElement(AlternativePage, { inhalt }));
      expect(text(html), slug).toContain(einrichtung.wechsel);
    }
    const plancraft = baueAlternative("plancraft");
    const wechselFaq = plancraft.faq.items.find((f) => f.q === "Kann ich von plancraft zu CraftOS wechseln?")!;
    expect(wechselFaq.a.endsWith(einrichtung.wechsel)).toBe(true);
    const html = renderToString(createElement(AlternativePage, { inhalt: plancraft }));
    expect(faqLd(html)).toContainEqual([wechselFaq.q, wechselFaq.a]);
  });

  it("/vergleich und /vergleich/handwerkersoftware-kleine-betriebe: Wechsel-FAQ mit Kernsatz, auch im JSON-LD", async () => {
    for (const modul of [
      import("@/app/vergleich/page"),
      import("@/app/vergleich/handwerkersoftware-kleine-betriebe/page"),
    ]) {
      const html = await seite(modul);
      expect(text(html)).toContain(einrichtung.kern);
      expect(faqLd(html)).toContainEqual([einrichtung.faqWechsel.q, einrichtung.kern]);
    }
  });

  it("Datenimport-FAQ und Hilfeartikel: CraftOS-Team übernimmt den Import auf Wunsch, Selbst-Import bleibt beschrieben", () => {
    const detail = getFunktionsdetail("datenuebernahme");
    expect(detail).toBeDefined();
    const fragen = detail!.faq.items;
    const herkunft = fragen.find((f) => f.q === "Aus welcher Software kann ich Daten übernehmen?")!;
    expect(herkunft.a.endsWith(einrichtung.importSatz)).toBe(true);
    expect(fragen.find((f) => f.q === "Was kostet die Import-KI?")).toBeDefined();
    const artikel = read("content/hilfe/daten-importieren.md");
    expect(artikel).toContain(einrichtung.importSatz);
    expect(artikel).toContain("Kostenlos mit KI zuordnen");
  });
});
