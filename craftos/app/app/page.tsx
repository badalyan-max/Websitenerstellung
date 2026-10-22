import type { ReactNode } from "react";
import Link from "next/link";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import {
  APP_SURFACES,
  appFaq,
  appKeyFacts,
  appKopf,
  appSections,
  appTiles,
  offlineSteps,
  type AppSectionId,
  type AppTile,
} from "@/lib/app-content";
import { zielwerte } from "@/lib/funktionsdetails";
import { metaFor } from "@/lib/seo-meta";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, mobileApplicationSchema } from "@/lib/schema";

/**
 * Mobile-App-Seite (07-UI-SPEC „Mobile-App-Seite /app“; FEAT-03, MEDIA-01, D-09, D-10, D-11, D-23):
 * FunktionsKopf mit StoreLinks und QR-Codes, drei Kachelgruppen mit Phone-Darstellungen, Kennzahlen,
 * Offline-Ablauf, FAQ und CtaBand. Texte und Werte aus lib/app-content.ts; Title, H1 und Description aus
 * der Keyword-Map. JSON-LD: BreadcrumbList, FAQPage aus der sichtbaren FAQ und MobileApplication
 * (App-Lizenz netto, ohne Bewertungen); Organization/SoftwareApplication kommen aus app/layout.tsx.
 */
const z = zielwerte("/app");

// Metadaten aus der Keyword-Map; og:image und twitter:image = Segmentbild /app/opengraph-image (08-05).
export const metadata = metaFor("/app");

const SURFACE = {
  white: "bg-white",
  warm: "bg-[#f7f3eb]",
} as const;

function Abschnitt({ id, children }: { id: Exclude<AppSectionId, "kopf" | "cta">; children: ReactNode }) {
  const surface = APP_SURFACES[id];
  if (surface === "dark") throw new Error(`App-Seite: Abschnitt ${id} darf nicht dunkel sein – APP_SURFACES prüfen.`);
  return (
    <section data-abschnitt={id} aria-labelledby={`${id}-titel`} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

function Kacheln({ label, tiles }: { label: string; tiles: AppTile[] }) {
  return (
    <BentoGrid label={label}>
      {tiles.map((tile) => {
        const tone = tile.surface === "dark" ? "dark" : "light";
        return (
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
                <Frame visual={{ kind: "phone", scene: tile.visual.scene }} width={tile.visual.width} tone={tone} />
              )
            }
          />
        );
      })}
    </BentoGrid>
  );
}

export default function AppPage() {
  const s = appSections;
  return (
    <>
      <FunktionsKopf
        id="app-titel"
        eyebrow={appKopf.eyebrow}
        h1={z.h1}
        keyword={appKopf.kopfwort}
        lead={appKopf.lead}
        visual={appKopf.visual}
        stores
        crumbs={crumbsFor("/app")}
      />

      <Abschnitt id="zeit">
        <SectionHeader id="zeit-titel" title={s.zeit.title} lead={s.zeit.lead} />
        <Kacheln label={s.zeit.title} tiles={appTiles.zeit} />
      </Abschnitt>

      <Abschnitt id="kennzahlen">
        <SectionHeader id="kennzahlen-titel" title={s.kennzahlen.title} lead={s.kennzahlen.lead} align="center" />
        <KeyFacts facts={appKeyFacts.facts} note={appKeyFacts.note} />
      </Abschnitt>

      <Abschnitt id="dokumentieren">
        <SectionHeader id="dokumentieren-titel" title={s.dokumentieren.title} lead={s.dokumentieren.lead} />
        <Kacheln label={s.dokumentieren.title} tiles={appTiles.dokumentieren} />
      </Abschnitt>

      <Abschnitt id="offline">
        <SectionHeader id="offline-titel" title={s.offline.title} lead={s.offline.lead} />
        <StepFlow steps={offlineSteps} tone="light" label={s.offline.title} />
        <p className="mt-8">
          <Link href={s.offline.link.href} className="text-link min-h-11 text-base text-ink-900">
            {s.offline.link.label}
          </Link>
        </p>
      </Abschnitt>

      <Abschnitt id="material">
        <SectionHeader id="material-titel" title={s.material.title} lead={s.material.lead} />
        <Kacheln label={s.material.title} tiles={appTiles.material} />
      </Abschnitt>

      <Abschnitt id="faq">
        <div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
          <SectionHeader id="faq-titel" title={s.faq.title} lead={s.faq.lead} />
          <FaqList items={appFaq} headingLevel={3} answerMax={300} />
        </div>
        <JsonLd data={faqSchema(appFaq)} />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title={s.cta.title} text={s.cta.text} secondary={s.cta.secondary} />
      </div>

      <JsonLd data={mobileApplicationSchema()} />
    </>
  );
}
