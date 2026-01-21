import { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { COMPANY_DATA } from '@/lib/company'
import { SERVICES } from '@/lib/services'
import { CITIES, CITIES_COUNT, getCitiesByPriority } from '@/lib/cities'
import {
  SERVICE_ICONS,
  ShieldCheckIcon,
  CurrencyEuroIcon,
  EcoLeafIcon,
  BoltIcon,
  MapPinIcon
} from '@/components/icons'

export const metadata: Metadata = {
  title: 'ShinyTouch Gebäudereinigung Bamberg | Professionelle Reinigung',
  description: 'Professionelle Gebäudereinigung in Bamberg und ganz Deutschland. Büroreinigung, Glasreinigung, Grundreinigung mit 30-Tage-Zufriedenheitsgarantie. ✓ 5.0/5 Bewertungen',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de',
  },
}

export default function HomePage() {
  const topCities = getCitiesByPriority(1).slice(0, 8)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Unsere Leistungen
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              Was kostet professionelle Gebäudereinigung?
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Professionelle Gebäudereinigung kostet zwischen 15-35€/Stunde, abhängig von
              Objektgröße und Reinigungsintervall. Wir bieten individuelle Festpreisangebote.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/service/${service.slug}`}
                className="group relative bg-gradient-to-br from-white to-secondary-50 rounded-2xl p-6 lg:p-8 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/20">
                    {(() => {
                      const IconComponent = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS]
                      return IconComponent ? <IconComponent className="w-7 h-7" /> : null
                    })()}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary-600 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-secondary-700">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Mehr erfahren
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link
              href="/service"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-semibold rounded-xl transition-colors"
            >
              Alle Leistungen ansehen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 lg:py-28 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                Warum ShinyTouch?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Ihre Vorteile mit ShinyTouch Gebäudereinigung
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Mit über 500 zufriedenen Kunden und einer durchschnittlichen Bewertung
                von 5.0/5 Sternen sind wir Ihr zuverlässiger Partner für saubere Räume.
              </p>

              {/* Benefits List */}
              <div className="space-y-6">
                {[
                  {
                    Icon: ShieldCheckIcon,
                    title: '30-Tage-Zufriedenheitsgarantie',
                    description: 'Nicht zufrieden? Wir reinigen kostenlos nach oder Sie erhalten Ihr Geld zurück.'
                  },
                  {
                    Icon: CurrencyEuroIcon,
                    title: 'Transparente Festpreise',
                    description: 'Keine versteckten Kosten. Sie wissen vorher genau, was Sie zahlen.'
                  },
                  {
                    Icon: EcoLeafIcon,
                    title: 'Umweltfreundliche Reinigung',
                    description: 'Wir verwenden biologisch abbaubare Reinigungsmittel für ein gesundes Arbeitsumfeld.'
                  },
                  {
                    Icon: BoltIcon,
                    title: 'Flexible Terminplanung',
                    description: 'Reinigung auch außerhalb der Geschäftszeiten - ganz nach Ihren Wünschen.'
                  }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-primary-600 flex-shrink-0">
                      <benefit.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">{benefit.title}</h3>
                      <p className="text-secondary-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-8 lg:p-10 border border-secondary-100">
                {/* Rating */}
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-4xl font-bold text-secondary-900 mb-1">5.0/5</div>
                  <div className="text-secondary-500">5 von 5 Sternen</div>
                </div>

                {/* Divider */}
                <div className="border-t border-secondary-100 my-6" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">500+</div>
                    <div className="text-sm text-secondary-500">Zufriedene Kunden</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">{CITIES_COUNT}+</div>
                    <div className="text-sm text-secondary-500">Einsatzorte</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">3+</div>
                    <div className="text-sm text-secondary-500">Jahre Erfahrung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                    <div className="text-sm text-secondary-500">Weiterempfehlung</div>
                  </div>
                </div>

                {/* ProvenExpert Badge */}
                <div className="mt-8 pt-6 border-t border-secondary-100">
                  <a
                    href={COMPANY_DATA.social.provenExpert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                    </svg>
                    Bewertungen auf ProvenExpert ansehen
                  </a>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Unsere Einsatzorte
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              Gebäudereinigung in Ihrer Nähe
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Von unserem Hauptsitz in Bamberg aus betreuen wir Kunden in ganz Deutschland.
              Wir sind in über {CITIES_COUNT} Städten für Sie vor Ort.
            </p>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group relative bg-gradient-to-br from-white to-secondary-50 rounded-xl p-5 border border-secondary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative">
                  <MapPinIcon className="w-7 h-7 mx-auto mb-2 text-primary-500" />
                  <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-secondary-500 mt-1">{city.region}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Cities */}
          <div className="text-center">
            <Link
              href="/einsatzorte"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all"
            >
              Alle {CITIES.length} Einsatzorte ansehen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Bereit für makellose Sauberkeit?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Fordern Sie jetzt Ihr kostenloses Angebot an. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary-50 transition-all duration-300"
            >
              <span>Kostenloses Angebot anfordern</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{COMPANY_DATA.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Kostenlose Beratung</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>30-Tage-Garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Festpreisgarantie</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
