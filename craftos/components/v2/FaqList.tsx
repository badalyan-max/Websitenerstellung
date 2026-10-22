import { Plus } from "lucide-react";
import s from "./FaqList.module.css";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";

export interface FaqListProps {
  /** 3–8 Fragen; jede Frage endet mit „?“. */
  items: { q: string; a: string }[];
  /** 3 rendert jede Frage als h3 innerhalb von summary. */
  headingLevel?: 3;
  /**
   * Zentrale Seiten (08-UI-SPEC C3, D-09): ganze Antwort ≤ faq.answerCentral (300) Zeichen, weil das
   * Antwort-zuerst-Audit den ersten Absatz nach der Frage misst. Ohne `zentral` gilt weiter faq.answer (600).
   * Boolesch statt eines Zahlenwerts, der nicht ausgewertet würde (08-REVIEW IN-03).
   */
  zentral?: boolean;
}

function firstSentence(answer: string): string {
  return answer.split(/(?<=[.!?])\s+/)[0] ?? answer;
}

/**
 * FAQ v2 (UI-SPEC §10): natives details/summary ohne Client-JavaScript. Einzige Bewegung ist die
 * Drehung des Plus-Symbols beim Öffnen. FAQPage-JSON-LD bindet die jeweilige Seite ein.
 */
export function FaqList({ items, headingLevel, zentral = false }: FaqListProps) {
  const budget = TEXT_BUDGET.faq;
  assertCount("FaqList", items.length, TEXT_BUDGET.count.faq, "Fragen");
  for (const item of items) {
    if (!item.q.trim().endsWith("?")) {
      throw new Error(`FaqList: Frage ‚${item.q}‘ endet nicht mit „?“ – als direkte Frage formulieren.`);
    }
    assertTextBudget("faq.question", item.q, budget.question);
    assertTextBudget("faq.firstSentence", firstSentence(item.a), budget.firstSentence);
    assertTextBudget("faq.answer", item.a, budget.answer);
    if (zentral) assertTextBudget("faq.answerCentral", item.a, budget.answerCentral);
  }
  const Question = headingLevel === 3 ? "h3" : "span";

  return (
    <div className={s.list}>
      {items.map((item) => (
        <details key={item.q} className={s.item}>
          <summary className={s.summary}>
            <Question className={s.question}>{item.q}</Question>
            <span className={s.symbol} aria-hidden="true">
              <Plus className={s.plus} size={20} strokeWidth={2} />
            </span>
          </summary>
          <p className={s.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
