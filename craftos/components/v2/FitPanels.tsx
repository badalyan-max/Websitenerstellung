import { Check } from "lucide-react";
import { TEXT_BUDGET, assertOneSentence, assertTextBudget } from "./budgets";
import s from "./FitPanels.module.css";

/** Beleg eines Passt-Punkts: Label (Anbieter und Seite) und https-URL der Herstellerseite. */
export interface FitQuelle {
  label: string;
  url: string;
}

/** Genau ein Satz ≤ 100 Zeichen; Wettbewerberpunkte brauchen eine Quelle (08-UI-SPEC § 3.5, U1). */
export interface FitPoint {
  text: string;
  quelle?: FitQuelle;
}

/** Titel ≤ 40 Zeichen, 2–4 Punkte. */
export interface FitPanel {
  title: string;
  points: FitPoint[];
}

export interface FitPanelsProps {
  /** aria-label der Liste, z. B. die Frage-H2 des Abschnitts. */
  label: string;
  /** [Wettbewerber, CraftOS] – der Wettbewerber steht links bzw. zuerst (Fairness, D-02). */
  panels: [FitPanel, FitPanel];
  /** Standard true: jeder Punkt des ersten Panels braucht eine Quelle; /gobd (Zuständigkeiten) setzt false. */
  quellenPflicht?: boolean;
}

const COUNT = TEXT_BUDGET.count.fitPoints;

/**
 * Zwei gleichrangige Passt-Panels (08-UI-SPEC G4, § 3.5; D-02, D-03): zwei identisch gestaltete
 * article in einer Liste, ohne Amber-, Grün- oder Rotmarkierung und ohne „Empfohlen“. Server Component
 * ohne Client-JavaScript; Budgets und Quellenpflicht werden beim Rendern geprüft.
 */
export function FitPanels({ label, panels, quellenPflicht = true }: FitPanelsProps) {
  panels.forEach((panel, index) => {
    assertTextBudget("fitPanel.title", panel.title, TEXT_BUDGET.fitPanel.title);
    const n = panel.points.length;
    if (n < COUNT.min || n > COUNT.max) {
      throw new Error(`FitPanels: Panel ${panel.title} hat ${n} Punkte – ${COUNT.min} bis ${COUNT.max} erforderlich.`);
    }
    for (const point of panel.points) {
      assertTextBudget("fitPanel.point", point.text, TEXT_BUDGET.fitPanel.point);
      assertOneSentence("FitPanels", panel.title, point.text);
      if (index === 0 && quellenPflicht && !point.quelle) {
        throw new Error(`FitPanels: Wettbewerberpunkt ‚${point.text}‘ ohne Quelle – im Datenmodul ergänzen.`);
      }
      if (point.quelle && !point.quelle.url.startsWith("https://")) {
        throw new Error(`FitPanels: Quelle ‚${point.quelle.label}‘ ohne https-Adresse – nur https://-Quellen verlinken.`);
      }
    }
  });

  return (
    <ul className={s.list} aria-label={label}>
      {panels.map((panel) => (
        <li key={panel.title} className={s.item}>
          <article className={s.panel}>
            <h3 className={s.title}>{panel.title}</h3>
            <ul className={s.points}>
              {panel.points.map((point) => (
                <li key={point.text} className={s.point}>
                  <Check className={s.icon} size={16} strokeWidth={2} aria-hidden="true" />
                  <span>
                    {point.text}
                    {point.quelle ? (
                      <>
                        {" "}
                        <a href={point.quelle.url} rel="nofollow" className={s.quelle}>
                          Quelle<span className="sr-only">{`: ${point.quelle.label}`}</span>
                        </a>
                      </>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  );
}
