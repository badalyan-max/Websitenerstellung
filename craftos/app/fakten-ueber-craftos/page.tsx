import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FactList } from "@/components/v2/FactList";
import { FaqList } from "@/components/v2/FaqList";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { CTA_DETAIL } from "@/lib/funktionsdetails";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import {
  ABGRENZUNG,
  FAKTEN_PFAD,
  FAKTEN_SURFACES,
  faktenFaq,
  faktenKacheln,
  faktenKeyFacts,
  faktenKopf,
  faktenSections,
  faktenStand,
  produktfakten,
  type FaktenSectionId,
} from "@/lib/seiten/fakten";
import { site } from "@/lib/site";

/**
 * Entitätsseite „Was ist CraftOS?“ (08-UI-SPEC § 5.2; D-09, D-12, D-25, Prompt #6): Kopf G1 ohne Visual,
 * Antwort mit Kennzahlen und Abgrenzung, Faktenliste mit Stand, Funktionsgruppen, FAQ und CtaBand. Inhalte aus
 * lib/seiten/fakten.ts; Title, H1 und Description aus der Keyword-Map. JSON-LD: BreadcrumbList (Kopf), FAQPage aus
 * der sichtbaren FAQ und WebPage mit about → Organization (#organization).
 */
const z = zielwerte(FAKTEN_PFAD);

export const metadata = metaFor(FAKTEN_PFAD);

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({ id, children }: { id: Exclude<FaktenSectionId, "kopf" | "cta">; children: ReactNode }) {
  const surface = FAKTEN_SURFACES[id];
  if (surface === "dark") throw new Error(`Fakten-Seite: Abschnitt ${id} darf nicht dunkel sein – FAKTEN_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function FaktenPage() {
  const s = faktenSections;
  return (
    <>
      <FunktionsKopf
        id="fakten-titel"
        eyebrow={faktenKopf.eyebrow}
        h1={z.h1}
        keyword={faktenKopf.kopfwort}
        lead={faktenKopf.lead}
        secondary={faktenKopf.secondary}
        crumbs={crumbsFor(FAKTEN_PFAD)}
      />

      <Abschnitt id="was-ist-craftos">
        <SectionHeader id="was-ist-craftos" title={s["was-ist-craftos"].title} lead={s["was-ist-craftos"].lead} />
        <KeyFacts facts={faktenKeyFacts.facts} note={faktenKeyFacts.note} />
        <p data-abgrenzung="" className="mt-6 flex max-w-[60ch] items-start gap-2 text-base leading-normal text-ink-500">
          <Info size={16} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0" />
          <span>{ABGRENZUNG}</span>
        </p>
      </Abschnitt>

      <Abschnitt id="produktfakten">
        <SectionHeader id="produktfakten" title={s.produktfakten.title} lead={s.produktfakten.lead} />
        <FactList items={produktfakten} />
        <p data-stand="" className="mt-4 text-sm leading-[1.4] text-ink-500">
          {faktenStand.text}{" "}
          <a href={faktenStand.link.href} className="font-semibold text-ink-900 underline underline-offset-4">
            {faktenStand.link.label}
          </a>
        </p>
      </Abschnitt>

      <Abschnitt id="funktionen">
        <SectionHeader id="funktionen" title={s.funktionen.title} lead={s.funktionen.lead} />
        <BentoGrid label={s.funktionen.title}>
          {faktenKacheln.map((k) => (
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

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={faktenFaq} headingLevel={3} zentral />
        </div>
        <JsonLd data={faqSchema(faktenFaq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={CTA_DETAIL.title} text={CTA_DETAIL.text} secondary={CTA_DETAIL.secondary} />
      </div>

      <JsonLd
        data={webPageSchema({
          path: FAKTEN_PFAD,
          name: z.titleOhneMarke,
          description: z.description,
          about: { "@id": site.url + "/#organization" },
        })}
      />
    </>
  );
}
