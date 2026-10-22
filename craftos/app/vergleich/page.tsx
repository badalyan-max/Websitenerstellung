import type { ReactNode } from "react";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { VERGLEICH_PFAD, VERGLEICH_SURFACES, vergleich, type VergleichSectionId } from "@/lib/seiten/vergleich";
import { metaFor, zielwerte } from "@/lib/seo-meta";

/**
 * Vergleichs-Hub auf v2-Bausteinen (08-UI-SPEC § 5.1, C5, C12; D-02, D-12; SEO-03, SEO-06, SEO-09): Kopf mit
 * Antwortsatz (#antwort), neutrale Marktübersicht der fünf Anbieter mit Quellen, Pflichthinweis und Disclaimer,
 * Einzelvergleiche zu den vier Alternativen-Seiten, Vorgehen als Frage-Abschnitt, FAQ und CtaBand.
 * Alle Texte und Werte aus lib/seiten/vergleich.ts; Title, H1 und Description aus der Keyword-Map.
 * JSON-LD: BreadcrumbList (Baustein), FAQPage aus der sichtbaren FAQ und WebPage – je ein eigener Block.
 * Keine Wettbewerberlogos (D-02).
 */
const z = zielwerte(VERGLEICH_PFAD);

export const metadata = metaFor(VERGLEICH_PFAD);

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

/** Abschnitt nach Anker-Konvention DESIGN-V2 § 17: data-abschnitt und aria-labelledby = id der H2. */
function Abschnitt({ id, children }: { id: VergleichSectionId; children: ReactNode }) {
  const surface = VERGLEICH_SURFACES[id];
  if (surface === "dark") throw new Error(`Vergleichsseite: Abschnitt ${id} darf nicht dunkel sein – VERGLEICH_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function VergleichPage() {
  const v = vergleich;
  const s = v.sections;
  const t = v.ueberblick.tabelle;
  return (
    <>
      <FunktionsKopf
        id="vergleich-titel"
        eyebrow={v.kopf.eyebrow}
        h1={z.h1}
        keyword={v.kopf.kopfwort}
        answer={v.kopf.answer}
        stand={v.kopf.stand}
        secondary={v.kopf.secondary}
        crumbs={crumbsFor(VERGLEICH_PFAD)}
      />

      <Abschnitt id="ueberblick">
        <SectionHeader id="ueberblick" title={s.ueberblick.title} lead={s.ueberblick.lead} />
        <ComparisonTable
          caption={t.caption}
          rowHeader={t.rowHeader}
          columns={t.columns}
          rows={t.rows}
          note={t.note}
          sources={t.sources}
          disclaimer={t.disclaimer}
        />
      </Abschnitt>

      <Abschnitt id="einzelvergleiche">
        <SectionHeader id="einzelvergleiche" title={s.einzelvergleiche.title} lead={s.einzelvergleiche.lead} />
        <BentoGrid label={s.einzelvergleiche.title}>
          {v.einzelvergleiche.kacheln.map((k) => (
            <BentoTile
              key={k.href}
              size={k.size}
              surface="white"
              title={k.title}
              text={k.text}
              href={k.href}
              visual={<TileIcon icon={k.icon} />}
            />
          ))}
        </BentoGrid>
      </Abschnitt>

      <Abschnitt id="so-vergleichen">
        <SectionHeader id="so-vergleichen" title={s["so-vergleichen"].title} lead={s["so-vergleichen"].lead} />
        <StepFlow steps={v.schritte} tone="light" label={s["so-vergleichen"].title} />
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={v.faq} headingLevel={3} zentral />
        </div>
        <JsonLd data={faqSchema(v.faq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={v.cta.title} text={v.cta.text} secondary={v.cta.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: VERGLEICH_PFAD, name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
