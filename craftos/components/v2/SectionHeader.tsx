import s from "./SectionHeader.module.css";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "./budgets";

export interface SectionHeaderProps {
  /** Nur Kategorie: Arbeitsablauf-Stufe, Gewerk, Seitenbereich – nie Dekoration. */
  eyebrow?: string;
  title: string;
  /**
   * Genau ein Satz ≤ 140. Endet title mit „?“, ist lead die Antwort (08-UI-SPEC G2, C2):
   * ≤ 300 Zeichen (answerLead), 1–2 Sätze, gerendert mit data-answer.
   */
  lead: string;
  /** "h1" nur für die Musterseite. */
  as?: "h1" | "h2";
  /** "center" nur über Kennzahlen-Leiste und CTA-Band. */
  align?: "start" | "center";
  tone?: "light" | "dark";
  /** Sitzt an der Überschrift (Anker-Konvention DESIGN-V2 § 17). */
  id?: string;
}

/**
 * Abschnittskopf v2: eine Überschrift und ein Satz (UI-SPEC §1). Phase 8 (G2): Frage-Titel tragen direkt
 * darunter die Antwort (≤ 300, 1–2 Sätze, data-answer), damit Antwort-zuerst technisch erzwungen ist.
 */
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
  const frage = title.trim().endsWith("?");
  const saetze = sentenceCount(lead);
  if (frage) {
    assertTextBudget("sectionHeader.answerLead", lead, budget.answerLead);
    if (saetze < 1 || saetze > 2) {
      throw new Error(`SectionHeader: Antwort-Lead hat ${saetze} Sätze – ein bis zwei Sätze schreiben.`);
    }
  } else {
    assertTextBudget("sectionHeader.lead", lead, budget.lead);
    if (saetze !== 1) {
      throw new Error(`SectionHeader: Lead hat ${saetze} Sätze – genau einen Satz schreiben.`);
    }
  }

  return (
    <header className={s.header} data-tone={tone} data-align={align}>
      {eyebrow ? <p className={`v2-eyebrow ${s.eyebrow}`}>{eyebrow}</p> : null}
      <Heading id={id} className={s.title}>
        {title}
      </Heading>
      <p className={s.lead} data-answer={frage ? "" : undefined}>
        {lead}
      </p>
    </header>
  );
}
