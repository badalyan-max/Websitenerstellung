import { notFound } from "next/navigation";
import { gewerke, getGewerk, CTA_GEWERK, GEWERK_ABSCHNITTE, type Gewerk } from "@/lib/gewerke";
import { tradeSnippetExamples } from "@/lib/trade-snippet-examples";
import { funktionsKarten as karten } from "@/lib/funktionskarten";
import { GewerkIcon } from "@/components/ui/GewerkIcon";
import { crumbsFor } from "@/lib/breadcrumbs";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { Abschnitt as AbschnittV2 } from "@/components/v2/Abschnitt";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { LinkKarten, type LinkKarte } from "@/components/v2/LinkKarten";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow, type Step } from "@/components/v2/StepFlow";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { getContentList } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, webPageSchema } from "@/lib/schema";

/**
 * Gewerke-Vorlage v2 (09-UI-SPEC § 1.1; D-05, D-06, D-08): Kopf als FunktionsKopf ohne Visual (H1 aus der Keyword-Map
 * mit Kopfwort-Span, Antwortsatz unter #antwort als Prompt-Ziel, Sekundärlink zum Ablauf), Ablauf mit StepFlow,
 * Beispielkachel und gekennzeichnetem FeatureSnippet (einziges animiertes Element), Passende Funktionen als
 * FeatureCard-Raster, FAQ mit FAQPage aus demselben Array, „Weiterlesen“ als LinkKarten auf bestehende Artikel aus
 * `g.artikel` (Titel und Beschreibung aus dem Frontmatter, Lesezeit) und CtaBand. Inhalte geprüft aus lib/gewerke.ts.
 * JSON-LD: BreadcrumbList (Kopf), FAQPage aus der sichtbaren FAQ, WebPage (wie /craft-ai).
 * Flächenrhythmus: Kopf dunkel → Ablauf Weiß → Funktionen Warm → FAQ Weiß → Weiterlesen Warm → CTA dunkel.
 */
type AbschnittId = "ablauf" | "funktionen" | "faq" | "weiterlesen";

/** Gemeinsamer Abschnitt (components/v2/Abschnitt.tsx, 09-REVIEW IN-01), auf die ids der Gewerke-Vorlage beschränkt. */
const Abschnitt = AbschnittV2<AbschnittId>;

/** Funktionskarten des Gewerks (lib/funktionskarten.ts) mit dem Fehlertext der Gewerke-Vorlage. */
function funktionsKarten(g: Gewerk) {
  return karten(
    g.funktionen,
    (slug) =>
      `Gewerk ${g.slug}: Funktion ${slug} hat keine Detailseite oder Karten-Szene – lib/funktionen.ts bzw. kopfVisuals in lib/scenes.ts prüfen.`,
  );
}

/**
 * Karten für „Weiterlesen“ (09-UI-SPEC § 1.1 Nr. 4): Label nach Bereich („Ratgeber“ für /blog, „Hilfe“ für /hilfe),
 * Titel und Text aus dem Frontmatter, Meta „{n} Min. Lesezeit“. Fehlt ein Ziel (oder ist es ein Entwurf), bricht der
 * Build mit dem Fehlertext aus 09-UI-SPEC § 5 ab.
 */
async function weiterlesenKarten(g: Gewerk): Promise<LinkKarte[]> {
  const artikel = [...(await getContentList("blog")), ...(await getContentList("hilfe"))];
  return g.artikel.map((pfad) => {
    const a = artikel.find((x) => `/${x.kind}/${x.slug}` === pfad);
    if (!a) throw new Error(`Gewerk ${g.slug}: Artikel ${pfad} fehlt – nur bestehende Artikel verlinken.`);
    return {
      href: pfad,
      label: a.kind === "blog" ? "Ratgeber" : "Hilfe",
      title: a.title,
      text: a.description,
      meta: `${a.readingMinutes} Min. Lesezeit`,
    };
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
  const { ablauf, funktionen, faq, weiterlesen } = GEWERK_ABSCHNITTE;
  const steps: Step[] = g.ablauf.map((s) => ({ title: s.title, text: s.text, href: "/funktionen/" + s.funktion }));
  const karten = funktionsKarten(g);
  const lesen = await weiterlesenKarten(g);
  const pfad = "/gewerke/" + slug;
  const z = zielwerte(pfad);

  return (
    <>
      <FunktionsKopf
        id="gewerk-titel"
        eyebrow="Gewerke"
        h1={z.h1}
        keyword={g.kopfwort}
        answer={g.answer}
        secondary={{ label: "So läuft ein Auftrag", href: "#ablauf" }}
        crumbs={crumbsFor(pfad)}
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

      <Abschnitt id="weiterlesen" surface="warm">
        <SectionHeader id="weiterlesen" title={weiterlesen.title} lead={weiterlesen.lead} />
        <LinkKarten items={lesen} label={weiterlesen.title} surface="white" columns={3} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_GEWERK.title} text={CTA_GEWERK.text} secondary={CTA_GEWERK.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: pfad, name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
