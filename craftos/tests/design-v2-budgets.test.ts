/**
 * Textbudgets der Musterseite (UI-SPEC „Textbudgets“): Alle Textfelder in lib/styleguide-content.ts
 * liegen im TEXT_BUDGET bzw. im MINI_BUDGET der Geräterahmen. Wird in den Phasen 6–9 auf Seitendaten erweitert.
 */
import { describe, expect, it } from "vitest";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "@/components/v2/budgets";
import { MINI_BUDGET } from "@/components/v2/mini/limits";
import * as content from "@/lib/styleguide-content";

type Check = [field: string, value: string | undefined, max: number];

/** Sammelt Verstöße mit dem wörtlichen Fehlertext aus dem UI-SPEC. */
function violations(checks: Check[]): string[] {
  const out: string[] = [];
  for (const [field, value, max] of checks) {
    if (value === undefined) continue;
    try {
      assertTextBudget(field, value, max);
    } catch (error) {
      out.push((error as Error).message);
    }
  }
  return out;
}

function countViolation(component: string, n: number, range: { min: number; max: number }, unit: string): string[] {
  try {
    assertCount(component, n, range, unit);
    return [];
  } catch (error) {
    return [(error as Error).message];
  }
}

/** Alle Mini-UI-Szenen (Kacheln, Karten, Rahmen) einsammeln. */
function scenes(): content.FrameScene[] {
  const out: content.FrameScene[] = [];
  for (const tile of content.bentoContent) if (tile.visual.kind !== "icon") out.push(tile.visual.scene);
  for (const card of content.featureCardContent) out.push(card.scene.scene);
  const f = content.frameContent;
  out.push(f.browser, ...f.phones.map((p) => p.scene), f.pair.browser, f.pair.phone);
  return out;
}

describe("Textbudgets der Musterseite", () => {
  it("Fehlertext entspricht dem UI-SPEC", () => {
    expect(() => assertTextBudget("bentoTile.title", "x".repeat(41), 40)).toThrow(
      "Textbudget überschritten: bentoTile.title hat 41 von 40 Zeichen – Satz kürzen.",
    );
  });

  it("SectionHeader, BentoGrid, StepFlow und KeyFacts im Budget", () => {
    const b = TEXT_BUDGET;
    const h = content.sectionHeaderContent;
    const checks: Check[] = [
      ["sectionHeader.eyebrow", h.eyebrow, b.sectionHeader.eyebrow],
      ["sectionHeader.title", h.title, b.sectionHeader.title],
      ["sectionHeader.lead", h.lead, b.sectionHeader.lead],
      ...content.bentoContent.flatMap((t): Check[] => [
        ["bentoTile.title", t.title, b.bentoTile.title],
        [
          t.size === "lg" || t.size === "wide" ? "bentoTile.textLarge" : "bentoTile.textSmall",
          t.text,
          t.size === "lg" || t.size === "wide" ? b.bentoTile.textLarge : b.bentoTile.textSmall,
        ],
      ]),
      ...content.stepContent.flatMap((s): Check[] => [
        ["step.title", s.title, b.step.title],
        ["step.text", s.text, b.step.text],
      ]),
      ...content.keyFactsContent.facts.flatMap((f): Check[] => [
        ["keyFact.value", f.value, b.keyFact.value],
        ["keyFact.label", f.label, b.keyFact.label],
      ]),
    ];
    expect([
      ...violations(checks),
      ...countViolation("BentoGrid", content.bentoContent.length, b.count.bento, "Kacheln"),
      ...countViolation("StepFlow", content.stepContent.length, b.count.steps, "Schritte"),
      ...countViolation("KeyFacts", content.keyFactsContent.facts.length, b.count.keyFacts, "Fakten"),
    ]).toEqual([]);
  });

  it("FeatureCard, ComparisonTable, FAQ und CtaBand im Budget", () => {
    const b = TEXT_BUDGET;
    const t = content.comparisonContent;
    const checks: Check[] = [
      ...content.featureCardContent.flatMap((c): Check[] => [
        ["featureCard.title", c.name, b.featureCard.title],
        ["featureCard.benefit", c.benefit, b.featureCard.benefit],
      ]),
      ...t.rows.flatMap((r): Check[] => [
        ["comparison.rowLabel", r.label, b.comparison.rowLabel],
        ...Object.values(r.cells)
          .filter((c): c is string => typeof c === "string" && c !== "teilweise")
          .map((c): Check => ["comparison.cell", c, b.comparison.cell]),
      ]),
      ...content.faqContent.flatMap((f): Check[] => [
        ["faq.question", f.q, b.faq.question],
        ["faq.firstSentence", f.a.split(/(?<=[.!?])\s+/)[0], b.faq.firstSentence],
        ["faq.answer", f.a, b.faq.answer],
      ]),
      ["ctaBand.title", content.ctaContent.title, b.ctaBand.title],
      ["ctaBand.text", content.ctaContent.text, b.ctaBand.text],
      ["mediaFigure.caption", content.mediaContent.caption, 90],
    ];
    expect([
      ...violations(checks),
      ...countViolation("FaqList", content.faqContent.length, b.count.faq, "Fragen"),
      ...countViolation("ComparisonTable", t.columns.length, { min: 1, max: b.count.comparison.columns }, "Wertspalten"),
      ...countViolation("ComparisonTable", t.rows.length, { min: 1, max: b.count.comparison.rows }, "Zeilen"),
    ]).toEqual([]);
    expect(content.faqContent.every((f) => f.q.endsWith("?"))).toBe(true);
  });

  it("Mini-UI aller Geräterahmen im MINI_BUDGET (24 Zeichen, 5 Zeilen)", () => {
    const all = scenes();
    expect(all.length).toBeGreaterThanOrEqual(8);
    const checks: Check[] = all.flatMap((s): Check[] => [
      ["mini.row", s.title, MINI_BUDGET.row],
      ["frame.description", s.description, 140],
      ...(s.rows ?? []).flatMap((r): Check[] => [
        ["mini.row", r.primary, MINI_BUDGET.row],
        ["mini.row", r.secondary, MINI_BUDGET.row],
        ["mini.row", r.value, MINI_BUDGET.row],
      ]),
      ...(s.week ?? []).map((w): Check => ["mini.row", w.label, MINI_BUDGET.row]),
      ...(s.timer ? ([["mini.row", s.timer.label, MINI_BUDGET.row], ["mini.row", s.timer.value, MINI_BUDGET.row]] as Check[]) : []),
    ]);
    const tooMany = all
      .filter((s) => (s.rows?.length ?? 0) > MINI_BUDGET.rows || (s.week?.length ?? 0) > MINI_BUDGET.rows)
      .map((s) => `MiniList: höchstens ${MINI_BUDGET.rows} Zeilen erlaubt – ${s.title} kürzen.`);
    expect([...violations(checks), ...tooMany]).toEqual([]);
  });
});
