import type { ReactNode } from "react";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FitPanels } from "@/components/v2/FitPanels";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { CTA_DETAIL } from "@/lib/funktionsdetails";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import {
  GOBD_PFAD,
  GOBD_SURFACES,
  gobdFaq,
  gobdGrundlage,
  gobdKacheln,
  gobdKopf,
  gobdPanels,
  gobdSections,
  gobdSteps,
  type GobdSectionId,
} from "@/lib/seiten/gobd";

/**
 * GoBD (08-UI-SPEC § 5.4; D-09, D-12): Kopf G1 ohne Visual, sechs Funktionskacheln, Ablauf mit gekennzeichnetem
 * FeatureSnippet „rechnung“, Zuständigkeiten (FitPanels ohne Quellen), FAQ mit amtlichen Grundlagen und CtaBand.
 * Inhalte aus lib/seiten/gobd.ts. FAQPage-JSON-LD entsteht aus demselben Array wie die sichtbare FAQ (T-08-33).
 */
const z = zielwerte(GOBD_PFAD);

export const metadata = metaFor(GOBD_PFAD);

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({ id, children }: { id: Exclude<GobdSectionId, "kopf" | "cta">; children: ReactNode }) {
  const surface = GOBD_SURFACES[id];
  if (surface === "dark") throw new Error(`GoBD-Seite: Abschnitt ${id} darf nicht dunkel sein – GOBD_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function GobdPage() {
  const s = gobdSections;
  return (
    <>
      <FunktionsKopf
        id="gobd-titel"
        eyebrow={gobdKopf.eyebrow}
        h1={z.h1}
        keyword={gobdKopf.kopfwort}
        lead={gobdKopf.lead}
        secondary={gobdKopf.secondary}
        crumbs={crumbsFor(GOBD_PFAD)}
      />

      <Abschnitt id="funktionen">
        <SectionHeader id="funktionen" title={s.funktionen.title} lead={s.funktionen.lead} />
        <BentoGrid label={s.funktionen.title}>
          {gobdKacheln.map((k) => (
            <BentoTile
              key={k.title}
              size={k.size}
              surface="warm"
              title={k.title}
              text={k.text}
              href={k.href}
              visual={<TileIcon icon={k.icon} />}
            />
          ))}
        </BentoGrid>
      </Abschnitt>

      <Abschnitt id="ablauf">
        <SectionHeader id="ablauf" title={s.ablauf.title} lead={s.ablauf.lead} />
        <StepFlow steps={gobdSteps} tone="light" label={s.ablauf.title} />
        <figure data-figure="snippet" className="mt-12 max-w-[640px]">
          <FeatureSnippet variant="rechnung" headingLevel={3} />
          <figcaption className="mt-2">
            <IllustrationLabel kind="vereinfacht" />
          </figcaption>
        </figure>
      </Abschnitt>

      <Abschnitt id="zertifizierung">
        <SectionHeader id="zertifizierung" title={s.zertifizierung.title} lead={s.zertifizierung.lead} />
        <FitPanels label={s.zertifizierung.title} panels={gobdPanels} quellenPflicht={false} />
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <div className="min-w-0">
            <FaqList items={gobdFaq} headingLevel={3} answerMax={300} />
            <p data-grundlage="" className="mt-4 text-sm leading-[1.4] text-ink-500">
              {"Grundlage: "}
              <a href={gobdGrundlage.quellen[0].href} rel="nofollow" className="text-ink-900 underline underline-offset-4">
                {gobdGrundlage.quellen[0].label}
              </a>
              {" und "}
              <a href={gobdGrundlage.quellen[1].href} rel="nofollow" className="text-ink-900 underline underline-offset-4">
                {gobdGrundlage.quellen[1].label}
              </a>
              {`. ${gobdGrundlage.stand}`}
            </p>
          </div>
        </div>
        <JsonLd data={faqSchema(gobdFaq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_DETAIL.title} text={CTA_DETAIL.text} secondary={CTA_DETAIL.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: GOBD_PFAD, name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
