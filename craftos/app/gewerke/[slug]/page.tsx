import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { gewerke, getGewerk, CTA_GEWERK, GEWERK_ABSCHNITTE, type Gewerk } from "@/lib/gewerke";
import { tradeSnippetExamples } from "@/lib/trade-snippet-examples";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { cardScenes } from "@/lib/scenes";
import { GewerkIcon } from "@/components/ui/GewerkIcon";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow, type Step } from "@/components/v2/StepFlow";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

/**
 * Gewerke-Vorlage v2, Teil 1 (09-UI-SPEC § 1.1 Nr. 1, 2, 3, 5; D-05, D-06): Ablauf mit StepFlow, Beispielkachel und
 * gekennzeichnetem FeatureSnippet (einziges animiertes Element), Passende Funktionen als FeatureCard-Raster, FAQ mit
 * FAQPage aus demselben Array und CtaBand. Kopf (FunktionsKopf mit Kopfwort und #antwort) und „Weiterlesen“ folgen in
 * 09-11; bis dahin bleibt der Bestands-Kopf mit dem Antwortsatz als Intro. Inhalte geprüft aus lib/gewerke.ts.
 * Flächenrhythmus: Kopf dunkel → Ablauf Weiß → Funktionen Warm → FAQ Weiß → CTA dunkel.
 */
type AbschnittId = "ablauf" | "funktionen" | "faq";

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({ id, surface, children }: { id: AbschnittId; surface: keyof typeof SURFACE; children: ReactNode }) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/** Funktionskarten aus den Funktionsgruppen (Name, Icon, Nutzen, Plattformen) mit Karten-Szene aus lib/scenes.ts. */
function funktionsKarten(g: Gewerk) {
  const details = getFunktionsgruppen().flatMap((gruppe) => gruppe.details);
  return g.funktionen.map((slug) => {
    const eintrag = details.find((d) => d.slug === slug);
    const karte = cardScenes[slug];
    if (!eintrag || !karte) {
      throw new Error(
        `Gewerk ${g.slug}: Funktion ${slug} hat keine Detailseite oder Karten-Szene – lib/funktionen.ts bzw. kopfVisuals in lib/scenes.ts prüfen.`,
      );
    }
    return { ...eintrag, karte };
  });
}

export function generateStaticParams() {
  return gewerke.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    g = getGewerk(slug);
  // Title und Description aus der Keyword-Map (08-04, D-06): docs/seo/keyword-map.json ist die einzige Quelle.
  return g ? metaFor("/gewerke/" + slug) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    g = getGewerk(slug);
  if (!g) notFound();
  const example = tradeSnippetExamples[slug];
  if (!example) throw new Error(`Missing trade snippet example: ${slug}`);
  const { ablauf, funktionen, faq } = GEWERK_ABSCHNITTE;
  const steps: Step[] = g.ablauf.map((s) => ({ title: s.title, text: s.text, href: "/funktionen/" + s.funktion }));
  const karten = funktionsKarten(g);

  return (
    <>
      <PageHero
        crumbs={crumbsFor("/gewerke/" + slug)}
        eyebrow={"CraftOS für " + g.name}
        title={zielwerte("/gewerke/" + slug).h1}
        intro={g.answer}
      />

      <Abschnitt id="ablauf" surface="white">
        <SectionHeader id="ablauf" title={ablauf.title} lead={ablauf.lead} />
        <StepFlow steps={steps} tone="light" label={ablauf.title} />
        <div className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,640px)] xl:items-center xl:gap-12">
          <article className="min-w-0 rounded-2xl border border-[#e7dcc9] bg-[#f7f3eb] p-4 md:p-6">
            <GewerkIcon slug={g.slug} className="h-12 w-12" />
            <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-[#17171c]">
              {`Beispiel: ${g.exampleTitle}`}
            </h3>
            <p className="mt-2 max-w-[45ch] text-base leading-normal text-[#62626e]">{g.example}</p>
          </article>
          <figure data-figure="snippet" className="w-full min-w-0 max-w-[640px]">
            <FeatureSnippet variant={example.variant} example={example} headingLevel={3} />
            <figcaption className="mt-2">
              <IllustrationLabel kind="vereinfacht" />
            </figcaption>
          </figure>
        </div>
      </Abschnitt>

      <Abschnitt id="funktionen" surface="warm">
        <SectionHeader id="funktionen" title={funktionen.title} lead={funktionen.lead} />
        <ul role="list" aria-label={funktionen.title} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {karten.map((k) => (
            <li key={k.slug} data-funktion={k.slug} className="flex">
              <FeatureCard
                slug={k.slug}
                name={k.name}
                icon={k.icon}
                benefit={k.benefit}
                platforms={k.platforms}
                href={k.href}
                visual={<Frame visual={{ kind: k.karte.kind, scene: k.karte.scene }} width={160} karte />}
              />
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt id="faq" surface="white">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={faq.title(g.name)} lead={faq.lead} />
          <FaqList items={g.faq} headingLevel={3} zentral />
        </div>
        <JsonLd data={faqSchema(g.faq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_GEWERK.title} text={CTA_GEWERK.text} secondary={CTA_GEWERK.secondary} />
      </div>
    </>
  );
}
