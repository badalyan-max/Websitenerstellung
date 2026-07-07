import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { CtaButton, GhostButton, SectionHeading, TierBadge } from '@/components/ui/primitives'
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame'
import { AngebotDemo } from '@/components/demos/AngebotDemo'
import { PlantafelDemo } from '@/components/demos/PlantafelDemo'
import { ZeitenDemo } from '@/components/demos/ZeitenDemo'
import { KiChatDemo } from '@/components/demos/KiChatDemo'
import { LagerDemo } from '@/components/demos/LagerDemo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { funktionen, getFunktion } from '@/lib/funktionen'
import { site } from '@/lib/site'
import { funktionBilder } from '@/lib/images'
import { BildBanner } from '@/components/ui/BildBanner'

const DEMOS = {
  angebot: AngebotDemo,
  plantafel: PlantafelDemo,
  zeiterfassung: ZeitenDemo,
  kichat: KiChatDemo,
  lager: LagerDemo,
} as const

// Definierte Screenshot-Plätze je Modul (Slots aus lib/images.ts)
const SHOWCASE: Record<string, string[]> = {
  angebote: ['angebot-maske', 'angebot-aufmass'],
  rechnungen: ['rechnung-dokument', 'rechnung-mahnwesen'],
  buchhaltung: ['beleg-scan', 'datev-export'],
  plantafel: ['plantafel-woche', 'plantafel-app'],
  zeiterfassung: ['zeiterfassung-konto', 'zeiterfassung-app'],
  lager: ['lager-bestand', 'lager-scan'],
  baudokumentation: ['baudoku-akte', 'baudoku-bericht'],
  team: ['team-rollen'],
  nachkalkulation: ['nachkalkulation-dashboard'],
}

export function generateStaticParams() {
  return funktionen.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const f = getFunktion(slug)
  if (!f) return {}
  return {
    title: f.seoTitle,
    description: f.seoDescription,
    alternates: { canonical: `${site.url}/funktionen/${f.slug}` },
  }
}

export default async function FunktionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const f = getFunktion(slug)
  if (!f) notFound()

  const Demo = f.demo ? DEMOS[f.demo] : null
  const weitere = funktionen.filter((x) => x.slug !== f.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Funktionen', path: '/funktionen' },
          { name: f.name, path: `/funktionen/${f.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(f.faq)} />

      <PageHero eyebrow={f.name} title={f.heroTitle} intro={f.heroIntro} />

      {/* Details + Demo */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className={
              Demo ? 'grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]' : 'mx-auto max-w-3xl'
            }
          >
            <div>
              <ul className="space-y-6">
                {f.bullets.map((b) => (
                  <li key={b.titel} className="flex items-start gap-3.5">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-400">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-display text-lg font-semibold text-ink-900">
                          {b.titel}
                        </h2>
                        {b.tier && b.tier !== 'heute' && <TierBadge tier={b.tier} />}
                      </div>
                      <p className="mt-1.5 leading-relaxed text-ink-500">{b.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {Demo && (
              <div className="lg:sticky lg:top-24">
                <Demo />
                <p className="mt-3 px-1 text-center text-xs text-ink-400">
                  Interaktive Demo — so arbeitet das echte Modul.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Einblick ins Modul: definierte Screenshot-Plätze */}
      {SHOWCASE[f.slug] && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Einblick" title={`So sieht ${f.name} in CraftOS aus`} />
            <div
              className={
                SHOWCASE[f.slug].length > 1
                  ? 'mt-10 grid items-center gap-8 sm:grid-cols-[1.4fr_1fr]'
                  : 'mt-10 mx-auto max-w-2xl'
              }
            >
              {SHOWCASE[f.slug].map((slot) => (
                <ScreenshotFrame key={slot} slot={slot} />
              ))}
            </div>
            <p className="mt-8">
              <a
                href={site.ctaUrl}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300"
              >
                Kostenlos testen
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </p>
          </div>
        </section>
      )}

      {funktionBilder[f.slug] && <BildBanner bild={funktionBilder[f.slug]} className="mb-16" />}

      <div className="anriss mx-auto max-w-7xl" aria-hidden="true" />

      {/* Weitere Funktionen */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Mehr Werkzeug" title="Das greift direkt ineinander" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {weitere.map((w) => (
              <Link
                key={w.slug}
                href={`/funktionen/${w.slug}`}
                className="card-hover group rounded-2xl border border-ink-200 bg-ink-100 p-5"
              >
                <h3 className="font-display text-base font-semibold text-ink-900">{w.name}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{w.kurz}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-400">
                  Ansehen
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Einwandbehandlung direkt vor der Conversion */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Häufige Fragen" align="center" className="mb-10" />
          <Faq items={[...f.faq]} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {f.name} – jetzt selbst erleben
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
            14 Tage kostenlos, voller Funktionsumfang, keine Kreditkarte.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>Jetzt kostenlos testen</CtaButton>
            <GhostButton href="/funktionen">Alle Funktionen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
