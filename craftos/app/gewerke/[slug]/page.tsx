import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Layers } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { CtaButton, GhostButton, HexIcon, SectionHeading } from '@/components/ui/primitives'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { gewerke, getGewerk } from '@/lib/gewerke'
import { getFunktion } from '@/lib/funktionen'
import { site } from '@/lib/site'

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

      {/* Pain-Points → Lösungen */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {g.hatVorlagen && (
            <p className="mb-10 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              <Layers className="h-4 w-4" />
              Fertige Leistungsvorlagen für {g.kurz} sind enthalten
            </p>
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {g.painPoints.map((p) => (
              <div key={p.titel} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <h2 className="font-display text-lg font-semibold text-ink-900">{p.titel}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </div>
            ))}
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

      {/* FAQ */}
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
            {['14 Tage kostenlos', 'Keine Kreditkarte nötig', 'DSGVO-konform'].map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-ink-500">
                <Check className="h-4 w-4 text-primary-400" strokeWidth={2.5} />
                {t}
              </li>
            ))}
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
