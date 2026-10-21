import { Monitor, Smartphone, UserRound } from "lucide-react";
import { BadgeGroup, LicenseBadge, PlatformBadge } from "@/components/v2/Badges";
import { funktionen, type ProductPlatform } from "@/lib/funktionen";
import type { PlattformPanel } from "@/lib/funktionsdetails/types";
import s from "./PlattformRollen.module.css";

export interface PlattformRollenProps {
  /** Funktions-Slug; die Panels werden gegen funktionen[].platforms geprüft. */
  slug: string;
  /** Ein Panel je belegter Plattform, Reihenfolge web, mobile (Inhalt geprüft im Builder). */
  panels: PlattformPanel[];
}

const PLATTFORM: Record<ProductPlatform, { heading: string; icon: typeof Monitor }> = {
  web: { heading: "Im Büro", icon: Monitor },
  mobile: { heading: "Auf der Baustelle", icon: Smartphone },
};

/**
 * Plattformen und Rollen (07-UI-SPEC F2, Abschnitt 3; D-02 (3), Abweichung B2): je belegter Plattform ein
 * flaches Panel mit Plattform-Badge, den Release-Rollen als Textliste, einem Satz und den Lizenz-Badges.
 * Server Component; Rollennamen und Budgets prüft lib/funktionsdetails, die Plattform prüft das Panel selbst.
 */
export function PlattformRollen({ slug, panels }: PlattformRollenProps) {
  const funktion = funktionen.find((entry) => entry.slug === slug);
  for (const panel of panels) {
    if (!funktion?.platforms.includes(panel.platform)) {
      throw new Error(
        `Plattform ${panel.platform} ist für ${slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.`,
      );
    }
  }

  return (
    <div className={s.raster} data-panels={panels.length}>
      {panels.map((panel) => {
        const { heading, icon: Icon } = PLATTFORM[panel.platform];
        return (
          <article key={panel.platform} className={s.panel} data-platform={panel.platform}>
            <div className={s.kopf}>
              <span className={s.icon} aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <PlatformBadge platform={panel.platform} />
            </div>
            <h3 className={s.titel}>{heading}</h3>
            {panel.rollen.length > 0 ? (
              <ul aria-label="Rollen" className={s.rollen}>
                {panel.rollen.map((rolle) => (
                  <li key={rolle.name} className={s.rolle} data-rolle={rolle.name}>
                    <UserRound className={s.rollenIcon} size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                      <span className={s.name}>{rolle.name}</span>
                      {rolle.zusatz ? <span className={s.zusatz}> {rolle.zusatz}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className={s.satz}>{panel.satz}</p>
            <div className={s.lizenzen}>
              <BadgeGroup
                label="Enthalten in"
                items={panel.lizenzen.map((lizenz) => (
                  <LicenseBadge key={lizenz} license={lizenz} />
                ))}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
