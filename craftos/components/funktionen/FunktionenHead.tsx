import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import type { Crumb } from "@/lib/breadcrumbs";
import s from "./FunktionenHead.module.css";

export interface FunktionenHeadGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Anker der Gruppe auf /funktionen, z. B. "/funktionen#angebot" */
  anchorHref: string;
}

const H1_START = "Alle Funktionen der Software für ";
const H1_KEYWORD = "Handwerksbetriebe";
const LEAD = "Von Angebot bis Team: alle Funktionen von CraftOS, geordnet nach den Arbeitsschritten Ihres Betriebs.";

/**
 * Seitenkopf v2 der Funktionsübersicht (06-UI-SPEC „Seite 3“, Bereiche 0 und 0a; D-11): dunkle Fläche
 * mit Amber-Unterkante, Brotkrumen als erste Zeile (08-UI-SPEC G6), Keyword-H1 (Keyword nie getrennt), ein Satz Einleitung und die
 * Sprungnavigation „Funktionsgruppen“ zu den sechs Gruppenankern. Server Component ohne Animation.
 */
export function FunktionenHead({ groups, crumbs }: { groups: FunktionenHeadGroup[]; crumbs: Crumb[] }) {
  assertTextBudget("pageHead.lead", LEAD, TEXT_BUDGET.pageHead.lead);
  const sentences = sentenceCount(LEAD);
  if (sentences !== 1) {
    throw new Error(`Seitenkopf: Lead hat ${sentences} Sätze – genau einen Satz schreiben.`);
  }

  return (
    <section className={s.head} aria-labelledby="funktionen-titel">
      <div className={`site-container ${s.inner}`}>
        <div className={s.crumbs}>
          <Breadcrumbs items={crumbs} tone="dark" />
        </div>
        <h1 id="funktionen-titel" className={s.title}>
          {H1_START}
          <span className={s.keyword} data-keyword="">
            {H1_KEYWORD}
          </span>
        </h1>
        <p className={s.lead}>{LEAD}</p>
        <nav aria-label="Funktionsgruppen" className={s.nav}>
          <ul role="list" className={s.list}>
            {groups.map(({ id, label, icon: Icon, anchorHref }) => (
              <li key={id}>
                <a href={`#${anchorHref.split("#")[1] ?? id}`} className={s.link}>
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" focusable="false" className={s.icon} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
