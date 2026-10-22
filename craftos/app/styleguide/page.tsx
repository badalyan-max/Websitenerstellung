import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { BadgeGroup, LicenseBadge, PlatformBadge, PlatformBadges } from "@/components/v2/Badges";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { DevicePair } from "@/components/v2/DevicePair";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { MediaFigure } from "@/components/v2/MediaFigure";
import { Frame, SceneContent } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { getFunktion } from "@/lib/funktionen";
import { pageMetadata } from "@/lib/metadata";
import {
  bentoContent,
  comparisonContent,
  ctaContent,
  faqContent,
  featureCardContent,
  frameContent,
  keyFactsContent,
  mediaContent,
  pageIntro,
  radii,
  sectionHeaderContent,
  spacingException,
  spacingScale,
  stepContent,
  tokenSwatches,
  typeSamples,
} from "@/lib/styleguide-content";

/**
 * Interne Musterseite der Designbausteine v2 (UI-SPEC Phase 5, Blöcke 0–13).
 * noindex/nofollow per Metadata und X-Robots-Tag (next.config.js); nicht in Sitemap, llms.txt,
 * Navigation oder robots.txt. Bewusst ohne JSON-LD: Die Schema-Pflicht der Projekt-CLAUDE.md gilt für
 * indexierbare Seiten (Begründung in craftos/docs/DESIGN-V2.md, Abschnitt „Kein JSON-LD auf /styleguide“).
 */
export const metadata: Metadata = {
  ...pageMetadata("Designbausteine v2", "Interne Musterseite der CraftOS-Website.", "/styleguide"),
  robots: { index: false, follow: false },
};

const displayFont: CSSProperties = { fontFamily: "var(--font-display, var(--font-clash, sans-serif))" };
/** Blockköpfe sind Label (General Sans, ohne Sperrung) – die globale h1–h4-Regel setzt sonst Clash Display. */
const labelFont: CSSProperties = { fontFamily: "var(--font-sans)", letterSpacing: 0 };

/** Kopfzeile je Block mit Komponentenname (Label 14/600, ink-500). */
function Block({
  name,
  label = name,
  surface = "white",
  children,
}: {
  name: string;
  label?: string;
  surface?: "white" | "warm";
  children: ReactNode;
}) {
  const id = `block-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section
      data-block={name}
      aria-labelledby={id}
      className={`py-12 md:py-16 ${surface === "warm" ? "bg-[#f7f3eb]" : "bg-white"}`}
    >
      <div className="site-container">
        <h2 id={id} className="mb-8 text-sm font-semibold leading-[1.4] text-ink-500" style={labelFont}>
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
}

function DarkPanel({ children }: { children: ReactNode }) {
  return (
    <div data-tone="dark" className="mt-8 rounded-[24px] bg-ink-950 p-6 md:p-8">
      {children}
    </div>
  );
}

function platformsOf(slug: string) {
  const funktion = getFunktion(slug);
  if (!funktion) throw new Error(`Styleguide: Funktion ${slug} fehlt in lib/funktionen.ts.`);
  return funktion.platforms;
}

export default function StyleguidePage() {
  return (
    <>
      {/* Block 0 */}
      <div data-block="Designbausteine v2">
        {/* Brotkrumen nur als Muster: noindex-Seite ohne JSON-LD (08-UI-SPEC § 1, schema={false}) */}
        <PageHero
          eyebrow={pageIntro.eyebrow}
          title={pageIntro.title}
          intro={pageIntro.intro}
          crumbs={[
            { name: "Start", path: "/" },
            { name: "Designbausteine", path: "/styleguide" },
          ]}
          crumbsSchema={false}
        />
      </div>

      {/* Block 1 */}
      <Block name="Tokens">
        <h3 className="mb-4 text-base font-semibold text-ink-900" style={labelFont}>Farben</h3>
        <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tokenSwatches.map((swatch) => (
            <li key={swatch.hex} className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="size-14 shrink-0 rounded-[16px] border border-ink-200"
                style={{ background: swatch.hex }}
              />
              <span className="text-sm leading-[1.4] text-ink-500">
                <strong className="block font-semibold text-ink-900">{swatch.name}</strong>
                <span className="block tabular-nums">{swatch.hex}</span>
                <span className="block">{swatch.role}</span>
              </span>
            </li>
          ))}
        </ul>

        <h3 className="mb-4 mt-12 text-base font-semibold text-ink-900" style={labelFont}>Schriftgrößen</h3>
        <dl className="grid gap-6">
          {typeSamples.map((sample) => (
            <div key={sample.role} className="grid gap-1 border-t border-ink-200 pt-4 md:grid-cols-[200px_1fr] md:gap-6">
              <dt className="text-sm leading-[1.4] text-ink-500">
                <strong className="block font-semibold text-ink-900">{sample.role}</strong>
                {sample.spec}
              </dt>
              <dd
                className="m-0 text-ink-900"
                style={
                  sample.role === "Display"
                    ? { ...displayFont, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em" }
                    : sample.role === "Heading"
                      ? { ...displayFont, fontSize: 20, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.025em" }
                      : sample.role === "Body"
                        ? { fontSize: 16, fontWeight: 400, lineHeight: 1.5 }
                        : { fontSize: 14, fontWeight: 600, lineHeight: 1.4 }
                }
              >
                {sample.sample}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mb-4 mt-12 text-base font-semibold text-ink-900" style={labelFont}>Abstände</h3>
        <ul role="list" className="grid gap-3">
          {spacingScale.map((px) => (
            <li key={px} className="flex items-center gap-4 text-sm tabular-nums text-ink-500">
              <span className="w-14 shrink-0">{px}&nbsp;px</span>
              <span aria-hidden="true" className="h-3 rounded-sm bg-ink-900" style={{ width: px }} />
            </li>
          ))}
          <li className="flex flex-wrap items-center gap-4 text-sm tabular-nums text-ink-500">
            <span className="w-14 shrink-0">{spacingException}&nbsp;px</span>
            <span
              aria-hidden="true"
              className="h-3 rounded-sm border-2 border-dashed border-primary-700"
              style={{ width: spacingException }}
            />
            <span className="font-semibold text-primary-700">Ausnahme: Abschnittsabstand ab 1024 px</span>
          </li>
        </ul>

        <h3 className="mb-4 mt-12 text-base font-semibold text-ink-900" style={labelFont}>Radien</h3>
        <ul role="list" className="flex flex-wrap gap-6">
          {radii.map((radius) => (
            <li key={radius.px} className="flex items-center gap-4 text-sm leading-[1.4] text-ink-500">
              <span
                aria-hidden="true"
                className="size-16 shrink-0 border border-line-warm bg-[#f7f3eb]"
                style={{ borderRadius: radius.px }}
              />
              <span>
                <strong className="block font-semibold tabular-nums text-ink-900">{radius.px}&nbsp;px</strong>
                {radius.use}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      {/* Block 2 */}
      <Block name="SectionHeader" surface="warm">
        <SectionHeader {...sectionHeaderContent} />
        <DarkPanel>
          <SectionHeader {...sectionHeaderContent} tone="dark" />
        </DarkPanel>
      </Block>

      {/* Block 3 */}
      <Block name="BentoGrid">
        <BentoGrid label="Kernfunktionen (Muster)">
          {bentoContent.map((tile) => {
            const dark = tile.surface === "dark";
            return (
              <BentoTile
                key={tile.title}
                size={tile.size}
                surface={tile.surface}
                title={tile.title}
                text={tile.text}
                visualPosition={tile.visualPosition}
                badges={<PlatformBadges platforms={platformsOf(tile.slug)} tone={dark ? "dark" : "light"} />}
                visual={
                  tile.visual.kind === "icon" ? (
                    <TileIcon icon={tile.visual.icon} />
                  ) : (
                    <Frame visual={tile.visual} width={160} tone={dark ? "dark" : "light"} />
                  )
                }
              />
            );
          })}
        </BentoGrid>
      </Block>

      {/* Block 4 */}
      <Block name="StepFlow" surface="warm">
        <StepFlow steps={stepContent} label="Arbeitsablauf in CraftOS (hell)" />
        <div className="mt-8">
          <StepFlow steps={stepContent} tone="amber" label="Arbeitsablauf in CraftOS (Amber)" />
        </div>
      </Block>

      {/* Block 5 */}
      <Block name="KeyFacts">
        <KeyFacts facts={keyFactsContent.facts} note={keyFactsContent.note} />
      </Block>

      {/* Block 6 */}
      <Block name="FeatureCard" surface="warm">
        <ul role="list" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {featureCardContent.map((card) => (
            <li key={card.slug} className="flex">
              <FeatureCard
                slug={card.slug}
                name={card.name}
                icon={card.icon}
                benefit={card.benefit}
                platforms={card.platforms}
                href={card.href}
                visual={<Frame visual={card.scene} width={160} />}
              />
            </li>
          ))}
        </ul>
      </Block>

      {/* Block 7 */}
      <Block name="Geräterahmen" label="Geräterahmen: BrowserFrame, PhoneFrame, DevicePair">
        <div className="max-w-[560px]">
          <Frame visual={{ kind: "browser", scene: frameContent.browser }} />
        </div>
        <ul role="list" className="mt-12 flex flex-wrap items-start gap-8">
          {frameContent.phones.map(({ width, scene }) => (
            <li key={width} className="grid gap-2">
              <span className="text-sm tabular-nums text-ink-500">{width}&nbsp;px</span>
              <Frame visual={{ kind: "phone", scene }} width={width} />
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-[760px]">
          <DevicePair
            browser={{
              title: frameContent.pair.browser.title,
              evidence: frameContent.pair.browser.screen,
              children: <SceneContent scene={frameContent.pair.browser} />,
            }}
            phone={{
              title: frameContent.pair.phone.title,
              evidence: frameContent.pair.phone.screen,
              activeTab: frameContent.pair.phone.activeTab,
              children: <SceneContent scene={frameContent.pair.phone} />,
            }}
            description={frameContent.pair.description}
          />
        </div>
      </Block>

      {/* Block 8 */}
      <Block name="ComparisonTable" surface="warm">
        <ComparisonTable
          caption={comparisonContent.caption}
          columns={comparisonContent.columns}
          rows={comparisonContent.rows}
          note={comparisonContent.note}
        />
      </Block>

      {/* Block 9 */}
      <Block name="Badges" label="Badges: PlatformBadge, LicenseBadge">
        <div className="grid gap-4">
          <BadgeGroup
            label="Plattformen"
            items={[<PlatformBadge key="web" platform="web" />, <PlatformBadge key="mobile" platform="mobile" />]}
          />
          <BadgeGroup
            label="Enthalten in"
            items={[<LicenseBadge key="voll" license="voll" />, <LicenseBadge key="app" license="app" />]}
          />
        </div>
        <DarkPanel>
          <div className="grid gap-4">
            <BadgeGroup
              label="Plattformen"
              tone="dark"
              items={[<PlatformBadge key="web" platform="web" />, <PlatformBadge key="mobile" platform="mobile" />]}
            />
            <BadgeGroup
              label="Enthalten in"
              tone="dark"
              items={[<LicenseBadge key="voll" license="voll" />, <LicenseBadge key="app" license="app" />]}
            />
          </div>
        </DarkPanel>
      </Block>

      {/* Block 10 */}
      <Block name="FaqList" surface="warm">
        <FaqList items={faqContent} headingLevel={3} />
      </Block>

      {/* Block 11 */}
      <Block name="MediaFigure" label="MediaFigure und IllustrationLabel">
        <div className="max-w-[720px]">
          <MediaFigure {...mediaContent} />
        </div>
      </Block>

      {/* Block 12 */}
      <Block name="Videoplayer" label="Hinweis" surface="warm">
        <p className="text-base leading-[1.5] text-ink-900">Videoplayer: entfällt (Videos sind nicht Teil des Meilensteins).</p>
      </Block>

      {/* Block 13 */}
      <div data-block="CtaBand">
        <div className="site-container pt-12 md:pt-16">
          <p className="mb-8 text-sm font-semibold leading-[1.4] text-ink-500" style={labelFont}>CtaBand</p>
        </div>
        <CtaBand title={ctaContent.title} text={ctaContent.text} />
      </div>
    </>
  );
}
