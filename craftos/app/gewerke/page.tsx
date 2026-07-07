import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Layers } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CtaButton, SectionHeading } from '@/components/ui/primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { gewerke } from '@/lib/gewerke'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Handwerkersoftware nach Gewerk – Elektro, SHK, Maler & mehr',
  description:
    'CraftOS für Ihr Gewerk: Elektriker, SHK, Maler, Tischler, Dachdecker, GaLaBau u. v. m. Mit fertigen Leistungsvorlagen. 14 Tage kostenlos testen.',
  alternates: { canonical: `${site.url}/gewerke` },
}

export default function GewerkePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Gewerke', path: '/gewerke' },
        ])}
      />
      <PageHero
        eyebrow="Gewerke"
        title={
          <>
            Ihr Gewerk. <span className="text-primary-400">Ihre Software.</span>
          </>
        }
        intro="CraftOS ist für das Bau- und Ausbauhandwerk gemacht – und kennt die Abläufe Ihres Gewerks: vom Aufmaß über die Kolonnenplanung bis zur Schlussrechnung."
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gewerke.map((g) => (
              <Link
                key={g.slug}
                href={`/gewerke/${g.slug}`}
                className="card-hover group flex flex-col rounded-2xl border border-ink-200 bg-ink-100 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold text-ink-900">{g.name}</h2>
                  {g.hatVorlagen && (
                    <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-primary-500/10 px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-primary-400">
                      <Layers className="h-3 w-3" />
                      Vorlagen
                    </span>
                  )}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                  {g.painPoints[0].text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-400">
                  CraftOS für {g.kurz}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-ink-200 bg-ink-100 p-8 text-center">
            <SectionHeading
              title="Ihr Gewerk ist nicht dabei?"
              intro="CraftOS ist gewerkeoffen: Leistungen, Artikel und Vorlagen legen Sie in Minuten selbst an – oder Sie starten mit den Allround-Vorlagen."
              align="center"
            />
            <div className="mt-7">
              <CtaButton>14 Tage kostenlos testen</CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
