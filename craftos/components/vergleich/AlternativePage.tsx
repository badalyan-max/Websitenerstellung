import type { ReactNode } from "react";
import Link from "next/link";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FitPanels } from "@/components/v2/FitPanels";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import type { AlternativeInhalt } from "@/lib/seiten/alternativen/types";

type AbschnittId = "vergleich" | "kosten" | "fuer-wen" | "umstieg" | "faq";

/** Flächenrhythmus (UI-SPEC § 3.1): Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel. */
const SURFACE = {
  white: "bg-white",
  warm: "bg-[#f7f3eb]",
} as const;

/** Abschnitt = section mit aria-labelledby auf die H2-id (Anker-Konvention DESIGN-V2 § 17, ohne „-titel“). */
function Abschnitt({ id, surface, children }: { id: AbschnittId; surface: keyof typeof SURFACE; children: ReactNode }) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/**
 * Vorlage der Alternativen-Seiten (08-UI-SPEC § 3.1, C8; D-01–D-04): Kopf mit Brotkrumen, H1 aus der Keyword-Map,
 * Antwort (#antwort) und Stand-Zeile → Vergleichstabelle mit Quellen und Disclaimer → Kosten (KeyFacts) →
 * Für wen (FitPanels, Wettbewerber zuerst) → Umstieg (StepFlow, Link zur Datenübernahme) → FAQ mit FAQPage → CtaBand.
 * Synchrone Server Component ohne Client-Insel (renderToString-fähig); alle Inhalte kommen geprüft aus
 * lib/seiten/alternativen (`baueAlternative`). JSON-LD: BreadcrumbList (Brotkrumen-Baustein im Kopf), FAQPage aus
 * demselben Array wie die sichtbaren Fragen, WebPage; keine Schema-Knoten für Wettbewerber, keine Logos.
 */
export function AlternativePage({ inhalt }: { inhalt: AlternativeInhalt }) {
  const { kopf, tabelle, kosten, fuerWen, umstieg, faq, cta, meta, wettbewerber } = inhalt;

  return (
    <>
      <FunktionsKopf
        id="alternative-titel"
        eyebrow="Vergleich"
        h1={kopf.h1}
        keyword={kopf.keyword}
        answer={kopf.answer}
        stand={kopf.stand}
        secondary={{ label: "Zur Vergleichstabelle", href: "#vergleich" }}
        crumbs={crumbsFor(inhalt.path)}
      />

      <Abschnitt id="vergleich" surface="white">
        <SectionHeader id="vergleich" title={tabelle.title} lead={tabelle.lead} />
        <ComparisonTable
          caption={tabelle.caption}
          rowHeader="Kriterium"
          columns={[
            { key: "craftos", label: "CraftOS", highlight: true },
            { key: "wettbewerber", label: wettbewerber.name },
          ]}
          rows={tabelle.rows.map((r) => ({ label: r.label, cells: { craftos: r.craftos, wettbewerber: r.wettbewerber } }))}
          note={tabelle.note}
          sources={tabelle.sources}
          disclaimer={tabelle.disclaimer}
        />
      </Abschnitt>

      <Abschnitt id="kosten" surface="warm">
        <SectionHeader id="kosten" title={kosten.title} lead={kosten.answer} />
        <KeyFacts facts={kosten.facts} note={kosten.note} />
      </Abschnitt>

      <Abschnitt id="fuer-wen" surface="white">
        <SectionHeader id="fuer-wen" title={fuerWen.title} lead={fuerWen.answer} />
        <FitPanels label={fuerWen.title} panels={fuerWen.panels} />
      </Abschnitt>

      <Abschnitt id="umstieg" surface="warm">
        <SectionHeader id="umstieg" title={umstieg.title} lead={umstieg.answer} />
        <StepFlow steps={umstieg.steps} tone="light" label={umstieg.title} />
        <p className="mt-8">
          <Link href="/funktionen/datenuebernahme" className="text-link">
            Mehr zur Datenübernahme
          </Link>
        </p>
      </Abschnitt>

      <Abschnitt id="faq" surface="white">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq" title={faq.title} lead={faq.lead} />
          <FaqList items={faq.items} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(faq.items)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={cta.title} text={cta.text} />
      </div>

      <JsonLd data={webPageSchema({ path: inhalt.path, name: meta.name, description: meta.description })} />
    </>
  );
}
