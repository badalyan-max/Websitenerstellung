import type { ReactNode } from "react";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import {
  PREISE_SURFACES,
  appLizenzKacheln,
  lizenzTabelle,
  marktspanne,
  preiseFaq,
  preiseKopf,
  preiseSections,
  zusatzkostenFakten,
  type PreiseSectionId,
} from "@/lib/seiten/preise";
import { metaFor, zielwerte } from "@/lib/seo-meta";

/**
 * Preisseite answer-first auf v2-Bausteinen (08-UI-SPEC § 4; SEO-04, SEO-06, SEO-09, D-05, D-09, D-12, D-16):
 * Kopf mit Antwortsatz (#antwort), Preistabelle, App-Lizenz, Zusatzkosten, Marktspanne mit belegten
 * Wettbewerberpreisen, FAQ und CtaBand. Alle Texte und Werte aus lib/seiten/preise.ts; Title, H1 und
 * Description aus der Keyword-Map. JSON-LD: BreadcrumbList (Baustein), FAQPage aus der sichtbaren FAQ und WebPage;
 * Organization/SoftwareApplication kommen aus app/layout.tsx.
 */
const z = zielwerte("/preise");

export const metadata = metaFor("/preise");

const SURFACE = {
  white: "bg-white",
  warm: "bg-[#f7f3eb]",
} as const;

/** Abschnitt nach Anker-Konvention DESIGN-V2 § 17: data-abschnitt und aria-labelledby = id der H2. */
function Abschnitt({ id, children }: { id: PreiseSectionId; children: ReactNode }) {
  const surface = PREISE_SURFACES[id];
  if (surface === "dark") throw new Error(`Preisseite: Abschnitt ${id} darf nicht dunkel sein – PREISE_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function PreisePage() {
  const s = preiseSections;
  return (
    <>
      <FunktionsKopf
        id="preise-titel"
        eyebrow={preiseKopf.eyebrow}
        h1={z.h1}
        keyword={preiseKopf.kopfwort}
        answer={preiseKopf.answer}
        stand={preiseKopf.stand}
        secondary={preiseKopf.secondary}
        crumbs={crumbsFor("/preise")}
      />

      <Abschnitt id="lizenzen">
        <SectionHeader id="lizenzen" title={s.lizenzen.title} lead={s.lizenzen.lead} />
        <ComparisonTable {...lizenzTabelle} />
      </Abschnitt>

      <Abschnitt id="app-lizenz">
        <SectionHeader id="app-lizenz" title={s["app-lizenz"].title} lead={s["app-lizenz"].lead} />
        <BentoGrid label={s["app-lizenz"].title}>
          {appLizenzKacheln.map((tile) => (
            <BentoTile
              key={tile.title}
              size={tile.size}
              surface={tile.surface}
              title={tile.title}
              text={tile.text}
              href={tile.href}
              visual={
                tile.visual.kind === "icon" ? (
                  <TileIcon icon={tile.visual.icon} />
                ) : (
                  <Frame
                    visual={{ kind: "phone", scene: tile.visual.scene }}
                    width={tile.visual.width}
                    tone={tile.surface === "dark" ? "dark" : "light"}
                  />
                )
              }
            />
          ))}
        </BentoGrid>
      </Abschnitt>

      <Abschnitt id="zusatzkosten">
        <SectionHeader id="zusatzkosten" title={s.zusatzkosten.title} lead={s.zusatzkosten.lead} />
        <KeyFacts facts={zusatzkostenFakten.facts} note={zusatzkostenFakten.note} />
      </Abschnitt>

      <Abschnitt id="was-kostet-handwerkersoftware">
        <SectionHeader
          id="was-kostet-handwerkersoftware"
          title={s["was-kostet-handwerkersoftware"].title}
          lead={s["was-kostet-handwerkersoftware"].lead}
        />
        <ComparisonTable
          caption={marktspanne.caption}
          rowHeader={marktspanne.rowHeader}
          columns={marktspanne.columns}
          rows={marktspanne.rows}
          note={marktspanne.note}
          sources={marktspanne.sources}
          disclaimer={marktspanne.disclaimer}
        />
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={preiseFaq} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(preiseFaq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={s.cta.title} text={s.cta.text} secondary={s.cta.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: "/preise", name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
