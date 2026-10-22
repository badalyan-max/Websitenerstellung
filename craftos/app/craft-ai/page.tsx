import type { ReactNode } from "react";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { CTA_DETAIL } from "@/lib/funktionsdetails";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import {
  CRAFT_AI_PFAD,
  CRAFT_AI_SURFACES,
  craftAiFaq,
  craftAiGrenzen,
  craftAiKeyFacts,
  craftAiKopf,
  craftAiSections,
  craftAiSteps,
  type CraftAiSectionId,
} from "@/lib/seiten/craft-ai";

/**
 * Craft AI (08-UI-SPEC § 5.3; D-09, D-12): Kopf G1 ohne Visual, Ablauf mit gekennzeichnetem FeatureSnippet „ki“
 * unterhalb der Falz, Kosten aus site.ts, „Wer entscheidet bei Craft AI?“, FAQ und CtaBand. Inhalte aus lib/seiten/craft-ai.ts; Title, H1
 * und Description aus der Keyword-Map. JSON-LD: BreadcrumbList (Kopf), FAQPage aus der sichtbaren FAQ, WebPage.
 */
const z = zielwerte(CRAFT_AI_PFAD);

export const metadata = metaFor(CRAFT_AI_PFAD);

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({ id, children }: { id: Exclude<CraftAiSectionId, "kopf" | "cta">; children: ReactNode }) {
  const surface = CRAFT_AI_SURFACES[id];
  if (surface === "dark") throw new Error(`Craft-AI-Seite: Abschnitt ${id} darf nicht dunkel sein – CRAFT_AI_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function CraftAiPage() {
  const s = craftAiSections;
  return (
    <>
      <FunktionsKopf
        id="craft-ai-titel"
        eyebrow={craftAiKopf.eyebrow}
        h1={z.h1}
        keyword={craftAiKopf.kopfwort}
        lead={craftAiKopf.lead}
        secondary={craftAiKopf.secondary}
        crumbs={crumbsFor(CRAFT_AI_PFAD)}
      />

      <Abschnitt id="so-arbeitet-craft-ai">
        <SectionHeader
          id="so-arbeitet-craft-ai"
          title={s["so-arbeitet-craft-ai"].title}
          lead={s["so-arbeitet-craft-ai"].lead}
        />
        <StepFlow steps={craftAiSteps} tone="light" label={s["so-arbeitet-craft-ai"].title} />
        <figure data-figure="snippet" className="mt-12 max-w-[640px]">
          <FeatureSnippet variant="ki" headingLevel={3} />
          <figcaption className="mt-2">
            <IllustrationLabel kind="vereinfacht" />
          </figcaption>
        </figure>
      </Abschnitt>

      <Abschnitt id="kosten">
        <SectionHeader id="kosten" title={s.kosten.title} lead={s.kosten.lead} />
        <KeyFacts facts={craftAiKeyFacts.facts} note={craftAiKeyFacts.note} />
      </Abschnitt>

      <Abschnitt id="wer-entscheidet">
        <SectionHeader id="wer-entscheidet" title={s["wer-entscheidet"].title} lead={s["wer-entscheidet"].lead} />
        <BentoGrid label={s["wer-entscheidet"].title}>
          {craftAiGrenzen.map((k) => (
            <BentoTile key={k.title} size={k.size} surface="warm" title={k.title} text={k.text} visual={<TileIcon icon={k.icon} />} />
          ))}
        </BentoGrid>
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={craftAiFaq} headingLevel={3} zentral />
        </div>
        <JsonLd data={faqSchema(craftAiFaq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_DETAIL.title} text={CTA_DETAIL.text} secondary={CTA_DETAIL.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: CRAFT_AI_PFAD, name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
