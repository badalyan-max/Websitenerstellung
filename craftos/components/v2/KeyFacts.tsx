import type { CSSProperties } from "react";
import s from "./KeyFacts.module.css";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";

export interface KeyFact {
  /** Aus einem Datenmodul abgeleitet, nie Literal im JSX. */
  value: string;
  label: string;
  /**
   * Pflicht, Kurzform-Schlüssel der Quelle (07 D-13), z. B. "site:tarif-app-monat", "site:trialDays",
   * "register:mobileLocales" oder für belegte Wettbewerberwerte "wettbewerber:plancraft-business-5p-jahr"
   * (08 D-04, Wert aus lib/wettbewerber/** mit Quelle und Abrufdatum). Erscheint als data-source im HTML;
   * keine internen Modul- oder Pfadnamen.
   */
  source: string;
}

/**
 * Öffentliche Kurzform der Quelle: site:<schlüssel> (site.ts, tarife), register:<schlüssel> (Produktregister)
 * oder wettbewerber:<schlüssel> (Wettbewerber-Datenmodul). CraftOS-Werte bleiben site:/register:.
 */
export const KEY_FACT_SOURCE = /^(site|register|wettbewerber):[A-Za-z0-9.-]+$/;

export interface KeyFactsProps {
  facts: KeyFact[];
  /** Pflicht: Netto-Hinweis bzw. Stand-Datum. */
  note: string;
  tone?: "light" | "dark";
}

/** Kennzahlen-Leiste v2: belegte Zahlen statt Werbesätzen (UI-SPEC §4). */
export function KeyFacts({ facts, note, tone = "light" }: KeyFactsProps) {
  assertCount("KeyFacts", facts.length, TEXT_BUDGET.count.keyFacts, "Fakten");
  for (const fact of facts) {
    if (!fact.source?.trim()) {
      throw new Error(
        `KeyFacts: Wert ‚${fact.value}‘ ohne Quelle – source aus site.ts, tarife oder Produktregister angeben.`,
      );
    }
    if (!KEY_FACT_SOURCE.test(fact.source)) {
      throw new Error(
        `KeyFacts: Quelle ‚${fact.source}‘ ist keine Kurzform site:…, register:… oder wettbewerber:… – Schlüssel angeben.`,
      );
    }
    assertTextBudget("keyFact.value", fact.value, TEXT_BUDGET.keyFact.value);
    assertTextBudget("keyFact.label", fact.label, TEXT_BUDGET.keyFact.label);
  }
  if (!note.trim()) {
    throw new Error("KeyFacts: note fehlt – Netto-Hinweis oder Stand-Datum angeben.");
  }

  return (
    <div className={s.root} data-tone={tone}>
      <dl className={s.list} style={{ "--facts": facts.length } as CSSProperties}>
        {facts.map((fact) => (
          <div key={fact.source + fact.label} className={s.fact}>
            <dt className={s.label}>{fact.label}</dt>
            <dd className={s.value} data-source={fact.source}>
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className={s.note}>{note}</p>
    </div>
  );
}
