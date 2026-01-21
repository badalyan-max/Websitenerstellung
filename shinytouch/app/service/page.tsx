import { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { COMPANY_DATA } from '@/lib/company'
import {
  SERVICE_ICONS,
  ShieldCheckIcon,
  CurrencyEuroIcon,
  EcoLeafIcon,
  ClockIcon
} from '@/components/icons'

export const metadata: Metadata = {
  title: 'Unsere Leistungen | ShinyTouch Gebäudereinigung',
  description: 'Professionelle Gebäudereinigung: Büroreinigung, Glasreinigung, Grundreinigung, Unterhaltsreinigung, Baureinigung und Hochdruckreinigung. ✓ 30 Tage risikofrei testen',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/service',
  },
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Leistungen</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-6">
              Unsere Leistungen
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
              Professionelle
              <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                Gebäudereinigung
              </span>
            </h1>

            <p className="text-lg text-secondary-600 leading-relaxed mb-8">
              Von der regelmäßigen Büroreinigung bis zur intensiven Grundreinigung –
              wir bieten Ihnen das komplette Spektrum professioneller Gebäudereinigung.
              30 Tage risikofrei & preisermäßigt testen – jederzeit kündbar.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>6 Servicebereiche</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Festpreisgarantie</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>30 Tage risikofrei</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const IconComponent = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS]
              return (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group relative bg-gradient-to-br from-white to-secondary-50 rounded-3xl p-8 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-500/20">
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h2>

                  {/* Description */}
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-secondary-700">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Details ansehen</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Warum ShinyTouch wählen?
            </h2>
            <p className="text-lg text-secondary-600">
              Über 500 zufriedene Kunden vertrauen uns ihre Gebäudereinigung an.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: ShieldCheckIcon,
                title: '30 Tage risikofrei',
                description: 'Testen Sie uns preisermäßigt. Jederzeit kündbar, kostenlose Nachreinigung.',
              },
              {
                Icon: CurrencyEuroIcon,
                title: 'Festpreise',
                description: 'Transparente Preise ohne versteckte Kosten.',
              },
              {
                Icon: EcoLeafIcon,
                title: 'Umweltfreundlich',
                description: 'Biologisch abbaubare Reinigungsmittel.',
              },
              {
                Icon: ClockIcon,
                title: 'Flexible Zeiten',
                description: 'Reinigung auch außerhalb der Geschäftszeiten.',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center border border-secondary-100 shadow-sm"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center">
                  <benefit.Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{benefit.title}</h3>
                <p className="text-secondary-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Welcher Service passt zu Ihnen?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Wir beraten Sie gerne kostenlos und unverbindlich.
            Gemeinsam finden wir die passende Reinigungslösung für Ihr Objekt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-2xl shadow-xl hover:bg-primary-50 transition-all"
            >
              Kostenlose Beratung anfordern
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY_DATA.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
