import type { ReactNode } from "react";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { PlatformBadges } from "@/components/v2/Badges";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { getFunktion } from "@/lib/funktionen";
import {
  appsContent,
  bentoContent,
  comparisonContent,
  faqContent,
  homeMetadata,
  homeSections,
  keyFactsContent,
  stepContent,
  type HomeSectionId,
} from "@/lib/home-content";
import { pageMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

/**
 * Startseite (06-UI-SPEC „Seite 1: Startseite“; D-02, D-03, D-04, D-10, D-19): Hero und genau sieben
 * Abschnitte aus v2-Bausteinen, jeder mit höchstens einer H2. Texte und Werte aus lib/home-content.ts;
 * Organization/SoftwareApplication-JSON-LD kommen unverändert aus app/layout.tsx, hier nur FAQPage
 * für die sichtbaren Fragen.
 */
export const metadata = pageMetadata(homeMetadata.title, homeMetadata.description, "/");

const SURFACE = {
  white: "bg-white",
  warm: "bg-[#f7f3eb]",
  amber: "bg-[#f2af38]",
} as const;

function HomeSection({
  id,
  surface,
  className = "",
  children,
}: {
  id: Exclude<HomeSectionId, "abschluss">;
  surface: keyof typeof SURFACE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-home-section={id}
      aria-labelledby={`${id}-titel`}
      className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24 ${className}`}
    >
      <div className="site-container">{children}</div>
    </section>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link min-h-11 text-base text-ink-900">
      {children}
    </Link>
  );
}

function platformsOf(slug: string) {
  const funktion = getFunktion(slug);
  if (!funktion) throw new Error(`Startseite: Funktion ${slug} fehlt in lib/funktionen.ts.`);
  return funktion.platforms;
}

export default function Home() {
  const s = homeSections;
  return (
    <>
      <HomeHero />

      <HomeSection id="kennzahlen" surface="white">
        <SectionHeader id="kennzahlen-titel" title={s.kennzahlen.title} lead={s.kennzahlen.lead} align="center" />
        <KeyFacts facts={keyFactsContent.facts} note={keyFactsContent.note} />
      </HomeSection>

      {/* Einzige Amber-Fläche der Seite; Lead-Farbe und Bühnenabstand in app/globals.css. */}
      <HomeSection id="ablauf" surface="amber">
        <SectionHeader id="ablauf-titel" title={s.ablauf.title} lead={s.ablauf.lead} />
        <StepFlow steps={stepContent} tone="amber" label="Arbeitsablauf in CraftOS" />
      </HomeSection>

      <HomeSection id="kernfunktionen" surface="white">
        <SectionHeader id="kernfunktionen-titel" title={s.kernfunktionen.title} lead={s.kernfunktionen.lead} />
        <BentoGrid label="Kernfunktionen">
          {bentoContent.map((tile) => {
            const dark = tile.surface === "dark";
            return (
              <BentoTile
                key={tile.slug}
                size={tile.size}
                surface={tile.surface}
                title={tile.title}
                text={tile.text}
                href={tile.href}
                visualPosition={tile.visualPosition}
                badges={<PlatformBadges platforms={platformsOf(tile.slug)} tone={dark ? "dark" : "light"} />}
                visual={
                  tile.visual.kind === "icon" ? (
                    <TileIcon icon={tile.visual.icon} />
                  ) : tile.visual.kind === "browser" ? (
                    // Browserrahmen füllt die Kachelbreite, sonst schrumpft er auf seine Mindestbreite.
                    <div className="w-full">
                      <Frame visual={tile.visual} tone={dark ? "dark" : "light"} />
                    </div>
                  ) : (
                    <Frame visual={tile.visual} width={160} tone={dark ? "dark" : "light"} />
                  )
                }
              />
            );
          })}
        </BentoGrid>
        <p className="mt-8">
          <TextLink href={s.kernfunktionen.link.href}>{s.kernfunktionen.link.label}</TextLink>
        </p>
      </HomeSection>

      <HomeSection id="apps" surface="warm">
        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <SectionHeader id="apps-titel" title={s.apps.title} lead={s.apps.lead} />
          </div>
          <div className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Frame visual={{ kind: "phone", scene: appsContent.scene }} width={240} />
          </div>
          <div className="grid justify-items-start gap-4 lg:col-start-1 lg:row-start-2 lg:self-start">
            <StoreLinks />
            <TextLink href={s.apps.link.href}>{s.apps.link.label}</TextLink>
          </div>
        </div>
      </HomeSection>

      <HomeSection id="preise" surface="white">
        <SectionHeader id="preise-titel" title={s.preise.title} lead={s.preise.lead} />
        <ComparisonTable
          caption={comparisonContent.caption}
          columns={comparisonContent.columns}
          rows={comparisonContent.rows}
          note={comparisonContent.note}
        />
        <p className="mt-8">
          <TextLink href={s.preise.link.href}>{s.preise.link.label}</TextLink>
        </p>
      </HomeSection>

      <HomeSection id="faq" surface="warm">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq-titel" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={faqContent} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(faqContent)} />
      </HomeSection>

      <div data-home-section="abschluss">
        <CtaBand title={s.abschluss.title} text={s.abschluss.text} secondary={s.abschluss.secondary} />
      </div>
    </>
  );
}
