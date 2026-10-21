import { Children, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import s from "./BentoGrid.module.css";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";

export interface BentoGridProps {
  children: ReactNode;
  /** aria-label der Liste */
  label?: string;
}

export interface BentoTileProps {
  size: "sm" | "md" | "lg" | "wide";
  /** Standard "warm"; "dark" höchstens einmal je Raster. */
  surface?: "white" | "warm" | "dark";
  title: string;
  /** Ein Satz: sm/md ≤ 90, lg/wide ≤ 120 Zeichen. */
  text: string;
  /** Pflicht: Geräterahmen, TileIcon, Kennzahl, Bild oder Gewerk-Icon – reine Textkacheln sind unzulässig. */
  visual: ReactNode;
  /** "end" wirkt nur bei lg/wide ab 1024 px. */
  visualPosition?: "top" | "end";
  /** Ganze Kachel klickbar über gestreckten Link am Titel. */
  href?: string;
  /** PlatformBadge/LicenseBadge-Gruppe, nicht interaktiv. */
  badges?: ReactNode;
  /** id einer Zusatzfunktion (lib/funktionsgruppen.ts) → data-zusatz; Kennung für Tests (07-UI-SPEC Abschnitt 4). */
  zusatz?: string;
}

/** Kachel-Raster v2 (UI-SPEC §2): Hierarchie über Größe, Fläche und Radius statt Einheitskarten. */
export function BentoGrid({ children, label }: BentoGridProps) {
  const items = Children.toArray(children);
  assertCount("BentoGrid", items.length, TEXT_BUDGET.count.bento, "Kacheln");

  const tiles = items
    .filter((item) => isValidElement<BentoTileProps>(item) && item.type === BentoTile)
    .map((item) => (item as { props: BentoTileProps }).props);
  if (tiles.length === items.length && new Set(tiles.map((tile) => tile.size)).size < 2) {
    throw new Error("BentoGrid: mindestens zwei verschiedene Kachelgrößen erforderlich – size variieren.");
  }
  if (tiles.filter((tile) => tile.surface === "dark").length > 1) {
    throw new Error("BentoGrid: höchstens 1 dunkle Kachel je Raster erlaubt – surface anpassen.");
  }

  return (
    <ul role="list" aria-label={label} className={s.grid}>
      {items}
    </ul>
  );
}

export function BentoTile({
  size,
  surface = "warm",
  title,
  text,
  visual,
  visualPosition = "top",
  href,
  badges,
  zusatz,
}: BentoTileProps) {
  const large = size === "lg" || size === "wide";
  assertTextBudget("bentoTile.title", title, TEXT_BUDGET.bentoTile.title);
  if (large) assertTextBudget("bentoTile.textLarge", text, TEXT_BUDGET.bentoTile.textLarge);
  else assertTextBudget("bentoTile.textSmall", text, TEXT_BUDGET.bentoTile.textSmall);

  return (
    <li className={`${s.item} ${s[size]}`}>
      <article
        className={s.tile}
        data-size={size}
        data-surface={surface}
        data-visual={large && visualPosition === "end" ? "end" : "top"}
        data-linked={href ? "true" : undefined}
        data-zusatz={zusatz}
      >
        <div className={s.body}>
          <h3 className={s.title}>
            {href ? (
              <Link href={href} className={s.link}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className={s.text}>{text}</p>
          {badges ? <div className={s.badges}>{badges}</div> : null}
        </div>
        <div className={s.visual}>{visual}</div>
      </article>
    </li>
  );
}

/** Icon-Visual: Lucide 24 px im 48 × 48-px-Feld; Fläche passt sich der Kachelfläche an. */
export function TileIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={s.icon} aria-hidden="true">
      <Icon size={24} strokeWidth={1.75} />
    </span>
  );
}
