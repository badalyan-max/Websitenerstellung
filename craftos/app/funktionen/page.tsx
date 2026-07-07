import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  CtaButton,
  GhostButton,
  HexIcon,
  SectionHeading,
  TierBadge,
} from '@/components/ui/primitives'
import { PlantafelDemo } from '@/components/demos/PlantafelDemo'
import { ZeitenDemo } from '@/components/demos/ZeitenDemo'
import { LagerDemo } from '@/components/demos/LagerDemo'
import { breadcrumbSchema } from '@/lib/schema'
import { funktionen, vision } from '@/lib/funktionen'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Funktionen – Alles, was ein Handwerksbetrieb braucht',
  description:
    'Angebote & Kalkulation, Rechnungen & E-Rechnung, Plantafel, Zeiterfassung, Lager, Baudokumentation, DATEV & Craft AI – der komplette Funktionsumfang von CraftOS.',
  alternates: { canonical: `${site.url}/funktionen` },
}

export default function FunktionenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Funktionen', path: '/funktionen' },
        ])}
      />
      <PageHero
        eyebrow="Funktionen"
        title={
          <>
            Ein Werkzeugkasten.
            <br />
            <span className="text-primary-400">Kein Werkzeug fehlt.</span>
          </>
        }
        intro="Vom Angebot bis zum DATEV-Export: Jedes Modul greift ins nächste. Hier ist der komplette Überblick – inklusive Live-Demos zum Ausprobieren."
      />

      {/* Funktions-Katalog */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {funktionen.map((f) => (
              <Link
                key={f.slug}
                href={`/funktionen/${f.slug}`}
                className="card-hover group flex flex-col rounded-2xl border border-ink-200 bg-ink-100 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <HexIcon icon={f.icon} />
                  <TierBadge tier={f.tier} />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{f.kurz}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-400">
                  Im Detail
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live-Demos */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-24">
        <div className="bg-werkbank absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="glow-amber absolute inset-x-0 top-0 h-64" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Anfassen erlaubt"
            title="Drei Werkzeuge, direkt hier ausprobieren"
            intro="So arbeitet CraftOS wirklich – ziehen, tippen, starten."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PlantafelDemo />
            <ZeitenDemo />
            <LagerDemo />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Roadmap"
            title="Woran wir gerade schmieden"
            intro="Ehrlich gelabelt: Das kommt als Nächstes – und das ist unsere Vision."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {vision.map((v) => (
              <div key={v.name} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-ink-800">{v.name}</h3>
                  <TierBadge tier="vision" />
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Überzeugen Sie sich selbst
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
            14 Tage voller Funktionsumfang – kostenlos und ohne Kreditkarte.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>Jetzt kostenlos testen</CtaButton>
            <GhostButton href="/preise">Preise ansehen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
