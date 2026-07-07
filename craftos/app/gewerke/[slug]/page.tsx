import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check, Layers } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { CtaButton, GhostButton, HexIcon, SectionHeading } from '@/components/ui/primitives'
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { gewerke, getGewerk } from '@/lib/gewerke'
import { getFunktion } from '@/lib/funktionen'
import { site } from '@/lib/site'
import { gewerkBilder, funktionScreenshot } from '@/lib/images'
import { BildBanner } from '@/components/ui/BildBanner'

export function generateStaticParams() {
  return gewerke.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const g = getGewerk(slug)
  if (!g) return {}
  return {
    title: g.seoTitle,
    description: g.seoDescription,
    alternates: { canonical: `${site.url}/gewerke/${g.slug}` },
  }
}

/** Amber-Textlink als Micro-CTA am Ende jedes Erklärblocks */
function MicroCta() {
  return (
    <a
      href={site.ctaUrl}
      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300"
    >
      Kostenlos testen
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2.5}
      />
    </a>
  )
}

export default async function GewerkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const g = getGewerk(slug)
  if (!g) notFound()

  const feats = g.funktionen
    .map((s) => getFunktion(s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
  const bild = gewerkBilder[g.slug]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Gewerke', path: '/gewerke' },
          { name: g.name, path: `/gewerke/${g.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(g.faq)} />

      <PageHero eyebrow={`CraftOS für ${g.kurz}`} title={g.heroTitle} intro={g.heroIntro} />

      {/* Kernnutzen als Haken-Liste direkt unterm Hero */}
      <div className="mx-auto -mt-6 max-w-7xl px-5 pb-10 sm:px-8">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2.5">
          {g.heroBullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-ink-600 sm:text-[15px]">
              <Check className="h-4.5 w-4.5 flex-shrink-0 text-primary-400" strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Gewerke-Foto mit schwebenden UI-Kärtchen */}
      {bild && (
        <div className="relative">
          <BildBanner bild={bild} priority />
          <div
            className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl sm:block"
            aria-hidden="true"
          >
            {g.heroKarten[0] && (
              <div className="absolute left-10 top-8 max-w-[240px] rounded-xl border border-ink-200/80 bg-ink-100/85 p-3.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:left-16 lg:top-12">
                <p className="text-sm font-semibold text-ink-900">{g.heroKarten[0].titel}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.65rem] text-ink-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  {g.heroKarten[0].sub}
                </p>
              </div>
            )}
            {g.heroKarten[1] && (
              <div className="absolute bottom-10 right-10 max-w-[240px] rounded-xl border border-ink-200/80 bg-ink-100/85 p-3.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:bottom-14 lg:right-16">
                <p className="text-sm font-semibold text-ink-900">{g.heroKarten[1].titel}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.65rem] text-ink-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {g.heroKarten[1].sub}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Erklärblöcke im Z-Pattern: Problem → Lösung + Screenshot-Platz */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {g.hatVorlagen && (
            <p className="mb-12 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              <Layers className="h-4 w-4" />
              Fertige Leistungsvorlagen für {g.kurz} sind enthalten
            </p>
          )}
          <div className="space-y-16 lg:space-y-24">
            {g.painPoints.map((p, i) => {
              const slot =
                funktionScreenshot[g.funktionen[i] ?? g.funktionen[0]] ?? 'angebot-maske'
              const reversed = i % 2 === 1
              return (
                <div
                  key={p.titel}
                  className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
                >
                  <div className={reversed ? 'lg:order-2' : undefined}>
                    <span className="spec-label text-[0.6rem] text-ink-400">
                      {String(i + 1).padStart(2, '0')} — Gelöst
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
                      {p.titel}
                    </h2>
                    <p className="mt-4 max-w-lg leading-relaxed text-ink-500">{p.text}</p>
                    <MicroCta />
                  </div>
                  <div className={reversed ? 'lg:order-1' : undefined}>
                    <ScreenshotFrame slot={slot} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="anriss mx-auto max-w-7xl" aria-hidden="true" />

      {/* Passende Funktionen */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Die passenden Werkzeuge"
            title={`Was ${g.kurz}-Betriebe in CraftOS am meisten nutzen`}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {feats.map((f) => (
              <Link
                key={f.slug}
                href={`/funktionen/${f.slug}`}
                className="card-hover group flex items-start gap-4 rounded-2xl border border-ink-200 bg-ink-100 p-5"
              >
                <HexIcon icon={f.icon} className="flex-shrink-0" />
                <span className="min-w-0">
                  <span className="font-display text-base font-semibold text-ink-900">
                    {f.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-500">{f.kurz}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-400">
                    Mehr erfahren
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Einwandbehandlung direkt vor der Conversion */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Häufige Fragen" align="center" className="mb-10" />
          <Faq items={[...g.faq]} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Bereit, {g.kurz} digital zu machen?
          </h2>
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {['14 Tage kostenlos', 'Keine Kreditkarte nötig', 'Endet automatisch – keine Abofalle'].map(
              (t) => (
                <li key={t} className="flex items-center gap-1.5 text-sm text-ink-500">
                  <Check className="h-4 w-4 text-primary-400" strokeWidth={2.5} />
                  {t}
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>Jetzt kostenlos testen</CtaButton>
            <GhostButton href="/preise">Preise ansehen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
