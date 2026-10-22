import { CraftOSMark } from "@/components/CraftOSLogo";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import type { Crumb } from "@/lib/breadcrumbs";

/**
 * Bestands-Seitenkopf (dunkel) bis zur Migration auf v2-Köpfe. Mit `crumbs` steht die Brotkrumen-Zeile
 * als erste Zeile im Kopf (08-UI-SPEC § 1, G6; Abstände „Kopf mit Brotkrumen“: oben 8/16/24, zur
 * Eyebrow 16/24/32). Ohne `crumbs` (nur /styleguide-Altfälle) bleibt der Kopf unverändert.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  crumbsSchema = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  /** Kette aus crumbsFor(pfad); jeder indexierte Aufrufer übergibt sie. */
  crumbs?: Crumb[];
  /** Standard true; false nur auf noindex-Musterseiten (kein JSON-LD). */
  crumbsSchema?: boolean;
}) {
  return (
    <section className="dark-section craft-page-hero">
      <div className="craft-watermark" aria-hidden="true">
        <CraftOSMark size={360} />
      </div>
      <div
        className={
          crumbs
            ? "site-container relative pt-2 pb-12 md:pt-4 md:pb-16 lg:pt-6"
            : "site-container relative py-12 md:py-16"
        }
      >
        {crumbs ? (
          <div className="mb-4 md:mb-6 lg:mb-8">
            <Breadcrumbs items={crumbs} tone="dark" schema={crumbsSchema} />
          </div>
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-semibold">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg">{intro}</p>
      </div>
    </section>
  );
}
