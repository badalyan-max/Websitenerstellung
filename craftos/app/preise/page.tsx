import type { Metadata } from 'next'
import { CreditCard, Landmark, HardDrive, Coins } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { HexIcon, SectionHeading } from '@/components/ui/primitives'
import { PricingTable } from '@/components/preise/PricingTable'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site, creditPakete } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Preise – CraftOS Lizenzen ab 9,95 € pro Monat',
  description:
    'Transparente Preise für CraftOS: App 9,95 €, Büro 29,95 €, Admin 29,95 € pro Nutzer und Monat. Im Jahresabo ≈ 17 % sparen. 50-GB-Speicherpool, SEPA oder Kreditkarte.',
  alternates: { canonical: `${site.url}/preise` },
}

const details = [
  {
    icon: Landmark,
    title: 'SEPA-Lastschrift',
    desc: 'Empfohlen – nur 0,35 % Gebühr pro Abbuchung.',
  },
  {
    icon: CreditCard,
    title: 'Kreditkarte',
    desc: '1,5 % + 0,25 € pro Zahlung (Visa/Mastercard), sofort aktiv.',
  },
  {
    icon: HardDrive,
    title: '50-GB-Speicherpool',
    desc: 'Ein Pool für den ganzen Betrieb – unabhängig von der Lizenzanzahl, erweiterbar.',
  },
  {
    icon: Coins,
    title: 'KI-Credits (Pay-as-you-go)',
    desc: `150 Credits Startguthaben inklusive. Pakete ab ${creditPakete[0].preis} € – mit bis zu ${creditPakete[creditPakete.length - 1].bonus} % Bonus.`,
  },
]

const faqItems = [
  {
    q: 'Brauche ich für jeden Mitarbeiter eine Lizenz?',
    a: 'Ja, lizenziert wird pro Nutzer. Jeder Betrieb braucht genau eine Admin-Lizenz (29,95 €). Das Büro nutzt Büro-Lizenzen (29,95 €), Monteure die günstige App-Lizenz (9,95 €).',
  },
  {
    q: 'Was ist der Unterschied zwischen monatlich und jährlich?',
    a: 'Im Jahresabo zahlen Sie den Preis von etwa 10 Monaten – rund 17 % Ersparnis. Monatliche Abos sind jederzeit monatlich kündbar.',
  },
  {
    q: 'Wie viel Speicher ist enthalten?',
    a: 'Jeder Betrieb erhält einen gemeinsamen 50-GB-Speicherpool – unabhängig davon, wie viele Lizenzen Sie haben. Zusätzlicher Speicher ist in Blöcken zubuchbar.',
  },
  {
    q: 'Wie funktioniert die Abrechnung der KI-Credits?',
    a: 'Craft AI rechnet nach Verbrauch ab: 1 Credit = 1 Cent. Zum Start sind 150 Credits Guthaben inklusive. Danach kaufen Sie Pakete (10–100 €) mit bis zu 20 % Bonus – kein Abo-Zwang.',
  },
  {
    q: 'Fallen Einrichtungsgebühren an?',
    a: 'Nein. Keine Einrichtungsgebühr, keine Mindestlaufzeit im Monatsabo. Sie testen 14 Tage kostenlos mit vollem Funktionsumfang.',
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
        intro="Drei Rollen für drei Aufgaben im Betrieb. Keine versteckten Kosten, keine Einrichtungsgebühr, monatlich kündbar – und 14 Tage kostenlos testen."
      />

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <PricingTable />
        </div>
      </section>

      {/* Zahlung & Extras */}
      <section className="border-y border-ink-200 bg-ink-950/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHeading align="center" eyebrow="Abrechnung" title="Flexibel & transparent" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d) => (
              <div key={d.title} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <HexIcon icon={d.icon} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <SectionHeading align="center" eyebrow="FAQ" title="Fragen zu den Preisen" />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
          <p className="mt-10 text-center text-ink-500">
            Noch Fragen?{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-primary-400 hover:text-primary-300"
            >
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
