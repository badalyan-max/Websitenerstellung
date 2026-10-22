import type { ReactNode } from "react";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { CTA_DETAIL, VERWANDT_KOPF } from "@/lib/funktionsdetails";
import type { Funktionsdetail } from "@/lib/funktionsdetails/types";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { FunktionsKopf } from "./FunktionsKopf";
import { PlattformRollen } from "./PlattformRollen";

type AbschnittId = "ablauf" | "rollen" | "kernpunkte" | "faq" | "verwandt";

/** Flächenrhythmus [05]: Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel; keine Amber-Fläche. */
const SURFACE = {
  white: "bg-white",
  warm: "bg-[#f7f3eb]",
} as const;

function Abschnitt({ id, surface, children }: { id: AbschnittId; surface: keyof typeof SURFACE; children: ReactNode }) {
  return (
    <section
      data-abschnitt={id}
      aria-labelledby={`${id}-titel`}
      className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}
    >
      <div className="site-container">{children}</div>
    </section>
  );
}

/**
 * Feste Vorlage der Funktionsdetailseiten (07-UI-SPEC „Vorlage Detailseite“; D-02, D-06, D-11, D-15, D-19):
 * (1) FunktionsKopf, (2) Ablauf mit StepFlow [+ FeatureSnippet auf 8 Seiten], (3) PlattformRollen,
 * (4) Kernpunkte im BentoGrid, (5) FAQ mit FAQPage aus demselben Array, (6) Passende Funktionen, (7) CtaBand.
 * Synchrone Server Component (renderToString-fähig); alle Daten kommen geprüft aus lib/funktionsdetails.
 * JSON-LD: BreadcrumbList (Start → Funktionen → Name, vom Brotkrumen-Baustein im Kopf), FAQPage und WebPage;
 * kein Schritt-Schema (D-11).
 */
export function FunktionsDetail({ detail }: { detail: Funktionsdetail }) {
  const { kopf, ablauf, rollen, kernpunkte, faq, verwandt, meta } = detail;

  return (
    <>
      <FunktionsKopf
        id="funktion-titel"
        eyebrow={kopf.eyebrow}
        h1={kopf.h1}
        keyword={kopf.kopfwort}
        lead={kopf.lead}
        secondary={kopf.secondary}
        visual={kopf.visual}
        crumbs={crumbsFor(meta.path)}
      />

      <Abschnitt id="ablauf" surface="white">
        <SectionHeader id="ablauf-titel" title={ablauf.title} lead={ablauf.lead} />
        <StepFlow steps={ablauf.steps} tone="light" label={ablauf.title} />
        {detail.snippet ? (
          <figure data-figure="snippet" className="mt-12 max-w-[640px]">
            <FeatureSnippet variant={detail.snippet} headingLevel={3} />
            <figcaption className="mt-2">
              <IllustrationLabel kind="vereinfacht" />
            </figcaption>
          </figure>
        ) : null}
      </Abschnitt>

      <Abschnitt id="rollen" surface="warm">
        <SectionHeader id="rollen-titel" title={rollen.title} lead={rollen.lead} />
        <PlattformRollen slug={detail.slug} panels={rollen.panels} />
      </Abschnitt>

      <Abschnitt id="kernpunkte" surface="white">
        <SectionHeader id="kernpunkte-titel" title={kernpunkte.title} lead={kernpunkte.lead} />
        <BentoGrid label={kernpunkte.title}>
          {kernpunkte.tiles.map((tile) => (
            <BentoTile
              key={tile.title}
              size={tile.size}
              surface={tile.grenze ? "white" : "warm"}
              title={tile.title}
              text={tile.text}
              href={tile.href}
              zusatz={tile.zusatz}
              visual={
                tile.visual.kind === "icon" ? (
                  <TileIcon icon={tile.visual.icon} />
                ) : (
                  <Frame visual={{ kind: "phone", scene: tile.visual.scene }} width={tile.visual.width} />
                )
              }
            />
          ))}
        </BentoGrid>
      </Abschnitt>

      <Abschnitt id="faq" surface="warm">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq-titel" title={faq.title} lead={faq.lead} />
          <FaqList items={faq.items} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(detail.faq.items)} />
      </Abschnitt>

      <Abschnitt id="verwandt" surface="white">
        <SectionHeader id="verwandt-titel" title={VERWANDT_KOPF.title} lead={VERWANDT_KOPF.lead} />
        <ul role="list" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {verwandt.map((v) => (
            <li key={v.slug} data-verwandt={v.slug} className="flex">
              <FeatureCard
                slug={v.slug}
                name={v.name}
                icon={v.icon}
                benefit={v.benefit}
                platforms={v.platforms}
                href={v.href}
                visual={<Frame visual={{ kind: v.rahmen, scene: v.scene }} width={160} karte />}
              />
            </li>
          ))}
        </ul>
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_DETAIL.title} text={CTA_DETAIL.text} secondary={CTA_DETAIL.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: meta.path, name: meta.title, description: meta.description })} />
    </>
  );
}
