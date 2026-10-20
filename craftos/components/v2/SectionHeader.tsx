import s from "./SectionHeader.module.css";
import { TEXT_BUDGET, assertTextBudget } from "./budgets";

export interface SectionHeaderProps {
  /** Nur Kategorie: Arbeitsablauf-Stufe, Gewerk, Seitenbereich – nie Dekoration. */
  eyebrow?: string;
  title: string;
  /** Genau ein Satz. */
  lead: string;
  /** "h1" nur für die Musterseite. */
  as?: "h1" | "h2";
  /** "center" nur über Kennzahlen-Leiste und CTA-Band. */
  align?: "start" | "center";
  tone?: "light" | "dark";
  id?: string;
}

/** Abschnittskopf v2: eine Überschrift und ein Satz (UI-SPEC §1). */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  align = "start",
  tone = "light",
  id,
}: SectionHeaderProps) {
  const budget = TEXT_BUDGET.sectionHeader;
  if (eyebrow !== undefined) assertTextBudget("sectionHeader.eyebrow", eyebrow, budget.eyebrow);
  assertTextBudget("sectionHeader.title", title, budget.title);
  assertTextBudget("sectionHeader.lead", lead, budget.lead);

  return (
    <header className={s.header} data-tone={tone} data-align={align}>
      {eyebrow ? <p className={`v2-eyebrow ${s.eyebrow}`}>{eyebrow}</p> : null}
      <Heading id={id} className={s.title}>
        {title}
      </Heading>
      <p className={s.lead}>{lead}</p>
    </header>
  );
}
