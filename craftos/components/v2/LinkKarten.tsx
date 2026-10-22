import type { ReactNode } from "react";
import Link from "next/link";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";
import s from "./LinkKarten.module.css";

export interface LinkKarte {
  href: string;
  /** ≤ 100 (Artikeltitel bis 91, Gewerkname, Kategoriename). */
  title: string;
  /** ≤ 160, 1–2 Sätze (Artikel: description; Gewerk: teaser ≤ 100, 1 Satz). */
  text?: string;
  /** ≤ 24 (Kategorie bzw. „Ratgeber“/„Hilfe“). */
  label?: string;
  /** ≤ 32 („6 Min. Lesezeit“, „7 Anleitungen“). */
  meta?: string;
  /** Dekorativ: GewerkIcon 48 px oder Lucide 24 px im Icon-Feld (`iconFeld`). */
  icon?: ReactNode;
  /** Icon-Feld 48 × 48 auf primary-100 für Lucide-Icons; GewerkIcon steht ohne Feld. */
  iconFeld?: boolean;
}

export interface LinkKartenProps {
  /** 1–60 Einträge. */
  items: LinkKarte[];
  /** aria-label der Liste. */
  label: string;
  /** Kartenfläche – immer die Gegenfläche zum Abschnitt. */
  surface: "white" | "warm";
  /** Spalten ab 1024 px, Standard 3. */
  columns?: 2 | 3;
}

/**
 * Raster verlinkter Karten (09-UI-SPEC G9) für Artikel, Kategorien und Gewerke. Gleichrangige Ziele ohne
 * Bento-Hierarchie (Abweichung H3). Je Karte ein Tabstopp: der Titel-Link im h3 ist über ::after auf die
 * ganze Karte gestreckt; kein „Weiterlesen“-Text, keine Pfeilglyphe. Ohne Hooks, ohne Client-Direktive und
 * ohne Server-Import – die Client-Insel ContentSearch rendert dieselbe Komponente. Budgets beim Rendern geprüft.
 */
export function LinkKarten({ items, label, surface, columns = 3 }: LinkKartenProps) {
  assertCount("LinkKarten", items.length, TEXT_BUDGET.count.linkKarten, "Einträge");
  for (const item of items) {
    assertTextBudget("linkKarte.title", item.title, TEXT_BUDGET.linkKarte.title);
    if (item.label !== undefined) assertTextBudget("linkKarte.label", item.label, TEXT_BUDGET.linkKarte.label);
    if (item.text !== undefined) assertTextBudget("linkKarte.text", item.text, TEXT_BUDGET.linkKarte.text);
    if (item.meta !== undefined) assertTextBudget("linkKarte.meta", item.meta, TEXT_BUDGET.linkKarte.meta);
  }

  return (
    <ul role="list" aria-label={label} className={s.raster} data-columns={columns} data-surface={surface}>
      {items.map((item) => (
        <li key={item.href} className={s.eintrag}>
          <article className={s.karte}>
            {item.icon ? (
              <span className={item.iconFeld ? s.iconFeld : s.icon} aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            {item.label ? <p className={s.label}>{item.label}</p> : null}
            <h3 className={s.titel}>
              <Link href={item.href} className={s.link}>
                {item.title}
              </Link>
            </h3>
            {item.text ? <p className={s.text}>{item.text}</p> : null}
            {item.meta ? <p className={s.meta}>{item.meta}</p> : null}
          </article>
        </li>
      ))}
    </ul>
  );
}
