import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { PlatformBadges, type PlatformBadgeProps } from "./Badges";
import { TEXT_BUDGET, assertCount, assertOneSentence, assertTextBudget } from "./budgets";
import s from "./FeatureList.module.css";

export interface FeatureListItem {
  /** Stabiler Schlüssel (Parität zum Produktregister), erscheint als data-funktion. */
  id: string;
  /** Anzeigename ≤ 32 Zeichen. */
  name: string;
  icon: LucideIcon;
  /** Genau ein Satz, ≤ 100 Zeichen. */
  benefit: string;
  /** Nur belegte Plattformen (aus dem Produktregister); leer → keine Badges. */
  platforms: PlatformBadgeProps["platform"][];
  /**
   * Optionales Ziel; ohne Ziel kein Link und kein Hinweis. label = Name der Zielseite.
   * kind "seite" (07-UI-SPEC F5) verweist auf eine eigene Seite wie /app und wird wie "funktion" angezeigt.
   */
  target?: { href: string; kind: "hilfe" | "funktion" | "seite"; label: string };
}

export interface FeatureListProps {
  /** 1–7 Einträge. */
  items: FeatureListItem[];
  /** Überschrift der Liste (h3), z. B. „Weitere Funktionen“. */
  title: string;
}

function hinweis(target: NonNullable<FeatureListItem["target"]>): string {
  // "funktion" und "seite" nennen beide die Zielseite (F5, D-21).
  return target.kind === "hilfe" ? "Anleitung in der Hilfe" : `Beschrieben unter ${target.label}`;
}

/**
 * Kompaktliste für Zusatzfunktionen ohne Detailseite (06-UI-SPEC E2, D-18). Flach: Liste mit
 * Trennlinien, keine Karten, kein Schatten. Bei Ziel ist der Name ein Link mit gestrecktem
 * Klickbereich (ein Tabstopp je Zeile), der Zielhinweis hängt per aria-describedby daran.
 * Server Component; Texte werden beim Rendern gegen die Budgets geprüft.
 */
export function FeatureList({ items, title }: FeatureListProps) {
  assertCount("FeatureList", items.length, TEXT_BUDGET.count.featureList, "Einträge");
  for (const item of items) {
    assertTextBudget("featureList.name", item.name, TEXT_BUDGET.featureList.name);
    assertTextBudget("featureList.benefit", item.benefit, TEXT_BUDGET.featureList.benefit);
    assertOneSentence("FeatureList", item.name, item.benefit);
  }

  return (
    <div className={s.root}>
      <h3 className={s.title}>{title}</h3>
      <ul role="list" className={s.list}>
        {items.map(({ id, name, icon: Icon, benefit, platforms, target }) => {
          const hintId = `funktion-${id}-ziel`;
          return (
            <li key={id} className={s.item} data-funktion={id} data-linked={target ? "true" : undefined}>
              <span className={s.iconField} aria-hidden="true">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" focusable="false" />
              </span>
              <div className={s.text}>
                <div className={s.head}>
                  {target ? (
                    <Link href={target.href} className={`${s.name} ${s.link}`} aria-describedby={hintId}>
                      {name}
                    </Link>
                  ) : (
                    <span className={s.name}>{name}</span>
                  )}
                  {platforms.length > 0 ? <PlatformBadges platforms={platforms} /> : null}
                </div>
                <p className={s.benefit}>{benefit}</p>
                {target ? (
                  <p id={hintId} className={s.hint}>
                    {hinweis(target)}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
