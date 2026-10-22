import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gewerke } from "@/lib/gewerke";
import { GewerkIcon } from "@/components/ui/GewerkIcon";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { TrialCta } from "@/components/ui/TrialCta";
import { MediaFigure } from "@/components/v2/MediaFigure";
import { metaFor, zielwerte } from "@/lib/seo-meta";
// Title, Description und H1 aus der Keyword-Map (08-04, D-06, D-17).
export const metadata = metaFor("/gewerke");
export default function Page() {
  return (
    <>
      <PageHero
        crumbs={crumbsFor("/gewerke")}
        eyebrow="Für Ihr Gewerk"
        title={zielwerte("/gewerke").h1}
        intro="Jedes Gewerk arbeitet anders. Gute Angebote, eine verlässliche Planung und nachvollziehbare Zahlen brauchen sie alle."
      />
      <section className="section-space">
        <div className="site-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {gewerke.map((g) => (
              <Link
                href={"/gewerke/" + g.slug}
                key={g.slug}
                className="border-t border-ink-200 py-8 group"
              >
                <GewerkIcon slug={g.slug} className="w-16 h-16" />
                <h2 className="text-2xl font-semibold mt-6 flex justify-between gap-4 group-hover:text-primary-800">
                  {g.name}
                  <ArrowUpRight size={20} className="shrink-0 mt-1" />
                </h2>
                <p className="text-sm text-ink-600 mt-4">{g.teaser}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container split-section">
          {/* KI-generiertes Motiv (docs/MEDIA.md) → sichtbare Kennzeichnung „Darstellung, KI-gestaltet“ (D-04, MEDIA-03). */}
          <MediaFigure
            src="/images/werkstatt-2026-1600.webp"
            alt="Tischlerin prüft ein Eichenbrett an einer Werkbank bei Tageslicht"
            width={1536}
            height={1024}
            sizes="(max-width:767px) 100vw, 50vw"
            label="ki"
          />
          <div>
            <p className="eyebrow">So individuell wie Ihr Betrieb</p>
            <h2 className="section-title">
              Ihre Erfahrung.
              <br />
              Eine gute Grundlage.
            </h2>
            <p className="section-intro">
              Hinterlegen Sie eigene Leistungen, Preise und Arbeitsabläufe.
              CraftOS hält die Informationen zusammen, die Sie für Ihre
              Entscheidungen brauchen.
            </p>
            <Link className="text-link mt-6" href="/funktionen/angebote">
              Angebote und Kalkulation entdecken
            </Link>
          </div>
        </div>
      </section>
      <TrialCta />
    </>
  );
}
