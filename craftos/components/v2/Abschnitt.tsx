import type { ReactNode } from "react";

/** Flächen der Inhaltsabschnitte (09-UI-SPEC Flächenrhythmus): Weiß und Warm. */
export const ABSCHNITT_FLAECHE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;
export type AbschnittFlaeche = keyof typeof ABSCHNITT_FLAECHE;

/**
 * Abschnitt der Gewerke-, Artikel- und Übersichtsvorlagen (09-REVIEW IN-01: vorher dreifach kopiert): section mit
 * `data-abschnitt`, benannt über die H2 mit derselben id (SectionHeader), Fläche und Innenabstand je Breite.
 */
export function Abschnitt<Id extends string>({
  id,
  surface,
  children,
}: {
  id: Id;
  surface: AbschnittFlaeche;
  children: ReactNode;
}) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${ABSCHNITT_FLAECHE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
