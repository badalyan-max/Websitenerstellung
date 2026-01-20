import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Impressum | ShinyTouch Gebäudereinigung',
  description: 'Impressum und rechtliche Informationen der ShinyTouch Gebäudereinigung e.K. in Bamberg.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/impressum',
  },
}

export default function ImpressumPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Impressum</li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-secondary-900 mb-4">
            Impressum
          </h1>
          <p className="text-lg text-secondary-600">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-secondary max-w-none">

            {/* Anbieter */}
            <div className="bg-secondary-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4 mt-0">Anbieter</h2>
              <address className="not-italic text-secondary-700 leading-relaxed">
                <strong>{COMPANY_DATA.name}</strong><br />
                {COMPANY_DATA.address.street}<br />
                {COMPANY_DATA.address.zip} {COMPANY_DATA.address.city}<br />
                Deutschland
              </address>
            </div>

            {/* Kontakt */}
            <div className="bg-secondary-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4 mt-0">Kontakt</h2>
              <p className="text-secondary-700 mb-2">
                <strong>Telefon:</strong>{' '}
                <a href={`tel:${COMPANY_DATA.contact.phone}`} className="text-primary-600 hover:underline">
                  {COMPANY_DATA.contact.phoneDisplay}
                </a>
              </p>
              <p className="text-secondary-700 mb-0">
                <strong>E-Mail:</strong>{' '}
                <a href={`mailto:${COMPANY_DATA.contact.email}`} className="text-primary-600 hover:underline">
                  {COMPANY_DATA.contact.email}
                </a>
              </p>
            </div>

            {/* Geschäftsführung */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Vertreten durch</h2>
              <p className="text-secondary-700">
                Inhaber: [Name des Inhabers]
              </p>
            </div>

            {/* Registereintrag */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Registereintrag</h2>
              <p className="text-secondary-700">
                Eintragung im Handelsregister<br />
                Registergericht: Amtsgericht Bamberg<br />
                Registernummer: [HRA XXXXX]
              </p>
            </div>

            {/* Umsatzsteuer-ID */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-secondary-700">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                DE [XXXXXXXXX]
              </p>
            </div>

            {/* Berufsbezeichnung */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p className="text-secondary-700">
                Berufsbezeichnung: Gebäudereiniger<br />
                Zuständige Kammer: Handwerkskammer für Oberfranken<br />
                Verliehen in: Deutschland
              </p>
            </div>

            {/* Streitschlichtung */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Streitschlichtung</h2>
              <p className="text-secondary-700 mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-secondary-700">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftung für Inhalte */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Haftung für Inhalte</h2>
              <p className="text-secondary-700">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-secondary-700 mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            {/* Haftung für Links */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Haftung für Links</h2>
              <p className="text-secondary-700">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p className="text-secondary-700 mt-4">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Links umgehend entfernen.
              </p>
            </div>

            {/* Urheberrecht */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Urheberrecht</h2>
              <p className="text-secondary-700">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers.
              </p>
              <p className="text-secondary-700 mt-4">
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    </>
  )
}
