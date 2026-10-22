import { FunktionenHead } from "@/components/funktionen/FunktionenHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/v2/CtaBand";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { FeatureList } from "@/components/v2/FeatureList";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { metaFor } from "@/lib/seo-meta";
import { cardScenes } from "@/lib/scenes";
import { crumbsFor } from "@/lib/breadcrumbs";
import { itemListSchema } from "@/lib/schema";

// Title, Description und Segmentbild aus der Keyword-Map (D-12; 08-05: twitter:image = og:image).
export const metadata = metaFor("/funktionen");

/**
 * Funktionsübersicht (06-UI-SPEC „Seite 3“; FEAT-01, D-07, D-08, D-09, D-10, D-18): einzige Datenquelle
 * ist getFunktionsgruppen() – sechs Gruppen mit Detailkarten (FeatureCard) und Zusatzfunktionen
 * (FeatureList) in einem Abschnitt je Gruppe (Abweichung A6). Server Component ohne Client-JS.
 */
export default function Page() {
  const groups = getFunktionsgruppen();
  const details = groups.flatMap((g) => g.details);

  return (
    <>
      <JsonLd data={itemListSchema("Funktionen von CraftOS", details.map((d) => ({ name: d.name, path: d.href })))} />
      <FunktionenHead groups={groups} crumbs={crumbsFor("/funktionen")} />
      {groups.map((group, index) => {
        const warm = index % 2 === 1;
        return (
          <section
            key={group.id}
            aria-labelledby={group.id}
            data-gruppe={group.id}
            className={`py-12 md:py-16 lg:py-24 ${warm ? "bg-[#f7f3eb]" : "bg-white"}`}
          >
            <div className="site-container">
              <SectionHeader eyebrow={group.label} title={group.heading} lead={group.lead} id={group.id} />
              {group.details.length > 0 ? (
                <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {group.details.map((d) => {
                    const scene = cardScenes[d.slug];
                    return (
                      <li key={d.slug} data-funktion={d.slug} className="flex">
                        <FeatureCard
                          slug={d.slug}
                          name={d.name}
                          icon={d.icon}
                          benefit={d.benefit}
                          platforms={d.platforms}
                          href={d.href}
                          visual={scene ? <Frame visual={scene} width={160} karte /> : undefined}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {group.extras.length > 0 ? (
                <div className="mt-8">
                  <FeatureList title="Weitere Funktionen" items={group.extras} />
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
      <CtaBand
        title="Alle Funktionen selbst ausprobieren"
        text="Ohne Zahlungsdaten – Sie entscheiden nach dem Test."
        secondary={{ label: "Preise ansehen", href: "/preise" }}
      />
    </>
  );
}
