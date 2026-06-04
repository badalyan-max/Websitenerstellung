import type { Metadata } from 'next'
import { CreditCard, Landmark, HardDrive, Coins } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { HexIcon, SectionHeading } from '@/components/ui/primitives'
import { PricingTable } from '@/components/preise/PricingTable'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Preise – CraftOS Lizenzen ab 14 € pro Monat',
  description:
    'Transparente Preise für CraftOS: App 14 €, Büro 32 €, Admin 44 € pro Nutzer und Monat. Im Jahresabo ~17 % sparen. SEPA oder Kreditkarte, monatlich kündbar.',
  alternates: { canonical: `${site.url}/preise` },
}

const details = [
  { icon: Landmark, title: 'SEPA-Lastschrift', desc: 'Empfohlen – nur 0,35 % Gebühr pro Abbuchung.' },
  { icon: CreditCard, title: 'Kreditkarte', desc: '1,5 % + 0,25 € pro Zahlung, sofort aktiv.' },
  { icon: HardDrive, title: 'Extra-Speicher', desc: '1,95 €/Monat je 50-GB-Block, jederzeit erweiterbar.' },
  { icon: Coins, title: 'AI-Credit-Pakete', desc: 'Ab 10 € mit Bonus – nur zahlen, was Sie nutzen.' },
]

const faqItems = [
  {
    q: 'Brauche ich für jeden Mitarbeiter eine Lizenz?',
    a: 'Ja, lizenziert wird pro Nutzer. Jeder Betrieb braucht mindestens eine Admin-Lizenz. Monteure erhalten meist die günstige App-Lizenz, das Büro die Büro-Lizenz.',
  },
  {
    q: 'Was ist der Unterschied zwischen monatlich und jährlich?',
    a: 'Im Jahresabo sparen Sie rund 17 % (etwa zwei Monate gratis) und erhalten zusätzlich 25 GB Speicher pro Lizenz. Monatliche Abos sind jederzeit kündbar.',
  },
  {
    q: 'Fallen Einrichtungsgebühren an?',
    a: 'Nein. Es gibt keine Einrichtungsgebühr. Sie können kostenlos testen und im Demo-Modus mit Beispieldaten starten.',
  },
  {
    q: 'Wie funktioniert die Abrechnung der KI-Credits?',
    a: 'Mit der Admin-Lizenz sind 150 Credits pro Monat inklusive (1 Credit = 1 Cent). Brauchen Sie mehr, kaufen Sie Credit-Pakete mit Bonus. Pro Mitarbeiter lässt sich ein Budget festlegen.',
  },
  {
    q: 'Kann ich jederzeit kündigen?',
    a: 'Ja. Monatliche Lizenzen sind monatlich kündbar, Jahreslizenzen zum Ende der Laufzeit. Ihre Daten können Sie jederzeit exportieren.',
  },
]

export default function PreisePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Preise', path: '/preise' },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />

      <PageHero
        eyebrow="Preise"
        title="Faire Lizenzen, pro Nutzer"
        intro="Drei Rollen für drei Aufgaben im Betrieb. Keine versteckten Kosten, keine Einrichtungsgebühr, monatlich kündbar."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <PricingTable />
        </div>
      </section>

      {/* Zahlung & Extras */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHeading align="center" eyebrow="Abrechnung" title="Flexibel & transparent" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d) => (
              <div key={d.title} className="rounded-2xl border border-ink-200 bg-white p-6">
                <HexIcon icon={d.icon} />
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <SectionHeading align="center" eyebrow="FAQ" title="Fragen zu den Preisen" />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
          <p className="mt-10 text-center text-ink-600">
            Noch Fragen?{' '}
            <a href={`mailto:${site.email}`} className="font-semibold text-primary-600 hover:text-primary-700">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
