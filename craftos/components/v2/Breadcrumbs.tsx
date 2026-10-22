import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { TEXT_BUDGET, assertTextBudget } from "@/components/v2/budgets";
import { assertCrumbCount, type Crumb } from "@/lib/breadcrumbs";
import { breadcrumbSchema } from "@/lib/schema";
import s from "./Breadcrumbs.module.css";

export interface BreadcrumbsProps {
  /** Kette aus crumbsFor(path) – dieselben items speisen Anzeige und BreadcrumbList. */
  items: Crumb[];
  /** "dark" auf dunklen Köpfen (#101014), "light" auf hellen Köpfen und Rechtsseiten. */
  tone: "dark" | "light";
  /** Standard true; nur /styleguide (noindex, kein JSON-LD) setzt false. */
  schema?: boolean;
}

/**
 * Sichtbare Brotkrumen v2 (08-UI-SPEC § 1, G6; D-07, D-22; C1, C10). Server Component ohne Client-JS:
 * Zwischenglieder als Link, letztes Glied als aria-current-Span, Trenner ChevronRight dekorativ.
 * Genau eine BreadcrumbList je Seite entsteht hier aus denselben items.
 */
export function Breadcrumbs({ items, tone, schema = true }: BreadcrumbsProps) {
  assertCrumbCount(items.length);
  for (const item of items.slice(1, -1)) {
    assertTextBudget("crumb.name", item.name, TEXT_BUDGET.crumb.name);
  }
  const letztes = items.length - 1;

  return (
    <>
      <nav aria-label="Brotkrumen" data-tone={tone} className={s.nav}>
        <ol className={s.list}>
          {items.map((item, i) =>
            i < letztes ? (
              <li key={item.path} className={s.item}>
                <Link href={item.path} className={i === 0 ? `${s.link} ${s.start}` : s.link}>
                  {item.name}
                </Link>
                <ChevronRight size={16} aria-hidden="true" className={s.separator} />
              </li>
            ) : (
              <li key={item.path} className={`${s.item} ${s.last}`}>
                <span aria-current="page" className={s.current}>
                  {item.name}
                </span>
              </li>
            ),
          )}
        </ol>
      </nav>
      {schema ? <JsonLd data={breadcrumbSchema(items)} /> : null}
    </>
  );
}
