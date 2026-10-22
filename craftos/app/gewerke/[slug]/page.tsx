import { notFound } from "next/navigation";
import Link from "next/link";
import { gewerke, getGewerk } from "@/lib/gewerke";
import { tradeSnippetExamples } from "@/lib/trade-snippet-examples";
import { getFunktion } from "@/lib/funktionen";
import { GewerkIcon } from "@/components/ui/GewerkIcon";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { TrialCta } from "@/components/ui/TrialCta";
import { Faq } from "@/components/ui/Faq";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
export function generateStaticParams() {
  return gewerke.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    g = getGewerk(slug);
  // Title und Description aus der Keyword-Map (08-04, D-06): docs/seo/keyword-map.json ist die einzige Quelle.
  return g ? metaFor("/gewerke/" + slug) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    g = getGewerk(slug);
  if (!g) notFound();
  const example = tradeSnippetExamples[slug];
  if (!example) throw new Error(`Missing trade snippet example: ${slug}`);
  return (
    <>
      <PageHero
        crumbs={crumbsFor("/gewerke/" + slug)}
        eyebrow={"CraftOS für " + g.name}
        title={zielwerte("/gewerke/" + slug).h1}
        intro={g.answer}
      />
      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:items-center">
          <div className="min-w-0">
            <GewerkIcon slug={g.slug} className="w-20 h-20 mb-7" />
            <p className="eyebrow">Ein Beispiel aus Ihrem Alltag</p>
            <h2 className="section-title">{g.exampleTitle}</h2>
            <p className="section-intro">{g.example}</p>
          </div>
          <div className="w-full min-w-0 max-w-[640px] justify-self-center">
            <FeatureSnippet
              variant={example.variant}
              example={example}
            />
          </div>
        </div>
        <div className="site-container mt-12">
          <h2 className="text-2xl font-semibold">Diese Funktionen passen dazu.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-6">
            {g.funktionen.map((s) => {
              const f = getFunktion(s);
              return f ? (
                <Link
                  href={"/funktionen/" + s}
                  className="block py-6 border-t border-ink-200"
                  key={s}
                >
                  <h3 className="text-2xl font-semibold">{f.name}</h3>
                  <p className="text-sm text-ink-600 mt-3">{f.kurz}</p>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container max-w-4xl">
          <h2 className="section-title mb-9">Fragen aus Ihrem Gewerk.</h2>
          <Faq items={g.faq} />
        </div>
      </section>
      <JsonLd data={faqSchema(g.faq)} />
      <TrialCta />
    </>
  );
}
