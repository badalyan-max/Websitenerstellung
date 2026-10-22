import type { ReactNode } from "react";
import Link from "next/link";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import tabelleStil from "@/components/v2/ComparisonTable.module.css";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { germanDate } from "@/lib/format";
import { faqSchema, webPageSchema } from "@/lib/schema";
import {
  KLEINE_BETRIEBE_PFAD,
  KLEINE_BETRIEBE_SURFACES,
  kleineBetriebe,
  type KleineBetriebeSectionId,
} from "@/lib/seiten/kleine-betriebe";
import { metaFor, zielwerte } from "@/lib/seo-meta";

/**
 * Handwerkersoftware für kleine Betriebe (08-UI-SPEC § 6, § 3.2, § 8, C5; D-02, D-10; SEO-03, SEO-06, SEO-09
 * Prompt #1): Kopf mit Antwortsatz (#antwort), belegte Kriterien mit amtlicher Quellenliste, neutrale Anbietertabelle
 * (fünf Zeilen, ohne Hervorhebung) mit Pflichthinweis, Quellen und Disclaimer, Testablauf mit Ratgeber-Link, FAQ und
 * CtaBand. Alle Texte und Werte aus lib/seiten/kleine-betriebe.ts; Title, H1 und Description aus der Keyword-Map.
 * JSON-LD: BreadcrumbList (Baustein), FAQPage aus der sichtbaren FAQ und WebPage – je ein eigener Block.
 */
const z = zielwerte(KLEINE_BETRIEBE_PFAD);

export const metadata = metaFor(KLEINE_BETRIEBE_PFAD);

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

/** Abschnitt nach Anker-Konvention DESIGN-V2 § 17: data-abschnitt und aria-labelledby = id der H2. */
function Abschnitt({ id, children }: { id: KleineBetriebeSectionId; children: ReactNode }) {
  const surface = KLEINE_BETRIEBE_SURFACES[id];
  if (surface === "dark") throw new Error(`Seite kleine Betriebe: Abschnitt ${id} darf nicht dunkel sein – KLEINE_BETRIEBE_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export default function KleineBetriebePage() {
  const kb = kleineBetriebe;
  const s = kb.sections;
  const t = kb.anbieter.tabelle;
  return (
    <>
      <FunktionsKopf
        id="kleine-betriebe-titel"
        eyebrow={kb.kopf.eyebrow}
        h1={z.h1}
        keyword={kb.kopf.kopfwort}
        answer={kb.kopf.answer}
        stand={kb.kopf.stand}
        secondary={kb.kopf.secondary}
        crumbs={crumbsFor(KLEINE_BETRIEBE_PFAD)}
      />

      <Abschnitt id="kriterien">
        <SectionHeader id="kriterien" title={s.kriterien.title} lead={s.kriterien.lead} />
        <BentoGrid label={s.kriterien.title}>
          {kb.kriterien.kacheln.map((k) => (
            <BentoTile key={k.title} size={k.size} surface="warm" title={k.title} text={k.text} visual={<TileIcon icon={k.icon} />} />
          ))}
        </BentoGrid>
        <ol className={`${tabelleStil.sources} mt-6`} aria-label="Quellen zu den Kriterien">
          {kb.kriterien.quellen.map((q) => (
            <li key={q.url} className={tabelleStil.source}>
              {`${q.anbieter}: `}
              <a href={q.url} rel="nofollow" className={tabelleStil.sourceLink}>
                {q.label}
              </a>
              {`, abgerufen am ${germanDate(q.abgerufenAm)}`}
            </li>
          ))}
        </ol>
      </Abschnitt>

      <Abschnitt id="anbieter">
        <SectionHeader id="anbieter" title={s.anbieter.title} lead={s.anbieter.lead} />
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

      <Abschnitt id="testen">
        <SectionHeader id="testen" title={s.testen.title} lead={s.testen.lead} />
        <StepFlow steps={kb.schritte} tone="light" label={s.testen.title} />
        <p className="mt-8">
          <Link href={kb.ratgeber.href} className="text-link">
            {kb.ratgeber.label}
          </Link>
        </p>
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={kb.faq} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(kb.faq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={kb.cta.title} text={kb.cta.text} secondary={kb.cta.secondary} />
      </div>

      <JsonLd data={webPageSchema({ path: KLEINE_BETRIEBE_PFAD, name: z.titleOhneMarke, description: z.description })} />
    </>
  );
}
