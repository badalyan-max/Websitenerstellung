import type { CSSProperties } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import s from "./StepFlow.module.css";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";

export interface Step {
  title: string;
  text: string;
  /** Wird nur gezeigt, wenn alle Schritte ein Icon haben. */
  icon?: LucideIcon;
  href?: string;
}

export interface StepFlowProps {
  /** 3–6 Schritte */
  steps: Step[];
  /** "amber" höchstens einmal je Seite – einzige erlaubte Amber-Fläche. */
  tone?: "light" | "amber";
  label: string;
}

/**
 * Schrittfolge v2 (UI-SPEC §3) als Maßkette: Sechseck-Knoten aus der Logo-Geometrie,
 * verbunden durch eine Maßlinie mit Endstrichen. Horizontal ab 1024 px, darunter vertikal.
 */
export function StepFlow({ steps, tone = "light", label }: StepFlowProps) {
  assertCount("StepFlow", steps.length, TEXT_BUDGET.count.steps, "Schritte");
  for (const step of steps) {
    assertTextBudget("step.title", step.title, TEXT_BUDGET.step.title);
    assertTextBudget("step.text", step.text, TEXT_BUDGET.step.text);
  }
  const showIcons = steps.every((step) => step.icon);

  return (
    <div className={s.flow} data-tone={tone}>
      <ol className={s.list} aria-label={label} style={{ "--steps": steps.length } as CSSProperties}>
        {steps.map((step, index) => {
          const Icon = showIcons ? step.icon : undefined;
          return (
            <li key={step.title} className={s.step}>
              <span className={s.node} aria-hidden="true">
                {index + 1}
              </span>
              <div className={s.body}>
                <h3 className={s.title}>
                  {step.href ? (
                    <Link href={step.href} className={s.link}>
                      {step.title}
                    </Link>
                  ) : (
                    step.title
                  )}
                </h3>
                {Icon ? <Icon className={s.icon} size={20} strokeWidth={1.75} aria-hidden="true" /> : null}
                <p className={s.text}>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
