import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import s from "./CtaBand.module.css";
import { TEXT_BUDGET, assertTextBudget } from "./budgets";

export interface CtaBandProps {
  /** ≤ 40 Zeichen */
  title: string;
  /** ≤ 80 Zeichen, ein Satz; wiederholt nicht das Button-Label. */
  text: string;
  /** Standard: "Preise ansehen" → /preise */
  secondary?: { label: string; href: string };
}

const defaultSecondary = { label: "Preise ansehen", href: "/preise" } as const;

/**
 * CTA-Band v2 (UI-SPEC §11): letzter Inhaltsabschnitt vor dem Footer, höchstens einmal je Seite.
 * Der Haupt-CTA zeigt auf site.ctaUrl, damit trial_click über classifyAppLink erfasst wird.
 */
export function CtaBand({ title, text, secondary = defaultSecondary }: CtaBandProps) {
  const budget = TEXT_BUDGET.ctaBand;
  // Eindeutige ID je Instanz, damit aria-labelledby auch bei Mehrfachverwendung auf den eigenen Titel zeigt (LO-04).
  const titleId = useId();
  const buttonLabel = `${site.trialDays} Tage kostenlos testen`;
  assertTextBudget("ctaBand.title", title, budget.title);
  assertTextBudget("ctaBand.text", text, budget.text);
  assertTextBudget("ctaBand.button", buttonLabel, budget.button);

  return (
    <section className={s.band} data-tone="dark" aria-labelledby={titleId}>
      <div className={`site-container ${s.inner}`}>
        <div className={s.copy}>
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>
          <p className={s.text}>{text}</p>
        </div>
        <div className={s.actions}>
          <a href={site.ctaUrl} className={`v2-btn-cta ${s.primary}`} data-track="trial">
            {buttonLabel}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={secondary.href} className={`text-link ${s.secondary}`}>
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
