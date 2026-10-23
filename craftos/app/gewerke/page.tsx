import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { GewerkIcon } from "@/components/ui/GewerkIcon";
import { CtaBand } from "@/components/v2/CtaBand";
import { LinkKarten } from "@/components/v2/LinkKarten";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { CTA_GEWERK, GEWERKE_KOPFWORT, GEWERKE_UEBERSICHT, gewerke } from "@/lib/gewerke";
import { metaFor, zielwerte } from "@/lib/seo-meta";

/**
 * Übersicht /gewerke v2 (09-UI-SPEC § 1b; D-09): FunktionsKopf ohne Visual mit Antwortsatz (#antwort) und Kopfwort
 * „Branchensoftware“, ein Abschnitt mit zwölf LinkKarten (Piktogramm, Name, Teaser) und das CTA-Band der Gewerke.
 * Kein Bild (das frühere KI-Motiv der Werkstatt entfällt hier, die Datei bleibt; Entscheidung A1), kein Vorlagen-Hinweis,
 * keine Pfeilglyphe. Schema: BreadcrumbList über den Kopf, keine FAQ.
 *
 * Bleibt synchron (`export default function Page()`): tests/content.test.ts und tests/breadcrumbs.test.ts rendern
 * die Seite ohne `await` (K-6). Title, Description und H1 aus der Keyword-Map (08-04, D-06, D-17).
 * Flächenrhythmus: Kopf dunkel → Gewerke Weiß (Karten Warm) → CTA dunkel.
 */
export const metadata = metaFor("/gewerke");

export default function Page() {
  const { answer, secondary, gewerke: abschnitt } = GEWERKE_UEBERSICHT;
  return (
    <>
      <FunktionsKopf
        id="gewerke-titel"
        eyebrow="Gewerke"
        h1={zielwerte("/gewerke").h1}
        keyword={GEWERKE_KOPFWORT}
        answer={answer}
        secondary={secondary}
        crumbs={crumbsFor("/gewerke")}
      />

      <section data-abschnitt="gewerke" aria-labelledby="gewerke" className="bg-white py-12 md:py-16 lg:py-24">
        <div className="site-container">
          <SectionHeader id="gewerke" title={abschnitt.title} lead={abschnitt.lead} />
          <LinkKarten
            label={abschnitt.title}
            surface="warm"
            columns={3}
            items={gewerke.map((g) => ({
              href: "/gewerke/" + g.slug,
              title: g.name,
              text: g.teaser,
              icon: <GewerkIcon slug={g.slug} className="h-12 w-12" />,
            }))}
          />
        </div>
      </section>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_GEWERK.title} text={CTA_GEWERK.text} secondary={CTA_GEWERK.secondary} />
      </div>
    </>
  );
}
