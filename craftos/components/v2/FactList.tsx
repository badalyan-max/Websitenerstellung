import { TEXT_BUDGET, assertCount, assertTextBudget, sentenceCount } from "./budgets";
import s from "./FactList.module.css";

export interface FactListItem {
  /** Begriff ≤ 32 Zeichen. */
  term: string;
  /** Definition ≤ 200 Zeichen, höchstens zwei Sätze. */
  definition: string;
}

export interface FactListProps {
  /** 6–12 Einträge. */
  items: FactListItem[];
  /** Label-Zeile unter der Liste, z. B. Stand und Korrekturhinweis. */
  note?: string;
}

/**
 * Begriff-/Definitionsliste v2 (08-UI-SPEC G5, § 5.2): ein dl mit je einem div pro Paar, ab 768 px
 * Begriff und Definition nebeneinander. Server Component ohne Client-JavaScript; Budgets beim Rendern geprüft.
 */
export function FactList({ items, note }: FactListProps) {
  assertCount("FactList", items.length, TEXT_BUDGET.count.factList, "Einträge");
  for (const item of items) {
    assertTextBudget("factList.term", item.term, TEXT_BUDGET.factList.term);
    assertTextBudget("factList.definition", item.definition, TEXT_BUDGET.factList.definition);
    const saetze = sentenceCount(item.definition);
    if (saetze > 2) {
      throw new Error(`FactList: Definition für ${item.term} hat ${saetze} Sätze – höchstens zwei Sätze schreiben.`);
    }
  }

  return (
    <div className={s.root}>
      <dl className={s.list}>
        {items.map((item) => (
          <div key={item.term} className={s.item}>
            <dt className={s.term}>{item.term}</dt>
            <dd className={s.definition}>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className={s.note}>{note}</p> : null}
    </div>
  );
}
