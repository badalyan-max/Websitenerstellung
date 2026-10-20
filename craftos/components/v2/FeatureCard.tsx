import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { funktionen, type ProductPlatform } from "@/lib/funktionen";
import { PlatformBadges } from "./Badges";
import { TEXT_BUDGET, assertTextBudget } from "./budgets";
import s from "./FeatureCard.module.css";

export interface FeatureCardProps {
  /** Nur Funktionen mit tier "heute" (Laufzeitprüfung gegen lib/funktionen.ts, D-02). */
  slug: string;
  /** Funktionsname, ≤ 32 Zeichen. */
  name: string;
  icon: LucideIcon;
  /** Genau ein Satz, ≤ 100 Zeichen. */
  benefit: string;
  /** Aus funktionen[].platforms – nur belegte Plattformen. */
  platforms: ProductPlatform[];
  /** Vereinfachte Szene im Geräterahmen; ohne visual → großes Icon im Sechseck-Umriss. */
  visual?: ReactNode;
  /** /funktionen/{slug} */
  href: string;
}

/**
 * Funktionskarte v2 (UI-SPEC §5): Bühne 4:3, Badges, Titel, ein Satz Nutzen, Textlink „Mehr zu {name}“.
 * Flach (kein Schatten); die ganze Karte ist über den gestreckten Textlink klickbar – ein Tabstopp je Karte.
 */
export function FeatureCard({ slug, name, icon: Icon, benefit, platforms, visual, href }: FeatureCardProps) {
  const funktion = funktionen.find((entry) => entry.slug === slug);
  if (funktion?.tier !== "heute") {
    throw new Error(`FeatureCard: ${slug} ist keine Live-Funktion – nur tier heute zulässig.`);
  }
  for (const platform of platforms) {
    if (!funktion.platforms.includes(platform)) {
      throw new Error(
        `FeatureCard: Plattform ${platform} ist für ${slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.`,
      );
    }
  }
  assertTextBudget("featureCard.title", name, TEXT_BUDGET.featureCard.title);
  assertTextBudget("featureCard.benefit", benefit, TEXT_BUDGET.featureCard.benefit);

  return (
    <article className={s.card}>
      <div className={s.stage} data-visual={visual ? "scene" : "icon"}>
        {visual ?? <HexIcon icon={Icon} />}
      </div>
      <div className={s.body}>
        {platforms.length > 0 ? <PlatformBadges platforms={platforms} /> : null}
        <h3 className={s.title}>{name}</h3>
        <p className={s.benefit}>{benefit}</p>
        <Link href={href} className={s.link}>
          {`Mehr zu ${name}`}
        </Link>
      </div>
    </article>
  );
}

/** Icon 48 px im Sechseck-Umriss mit Logo-Proportion (Spitze oben, wie das C-im-Hexagon). */
function HexIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={s.hex} aria-hidden="true">
      <svg className={s.hexShape} viewBox="0 0 88 100" focusable="false">
        <polygon points="44,2 86,26 86,74 44,98 2,74 2,26" />
      </svg>
      <Icon className={s.hexIcon} size={48} strokeWidth={1.5} />
    </span>
  );
}
