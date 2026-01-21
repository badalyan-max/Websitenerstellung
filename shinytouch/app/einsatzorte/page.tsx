import { Metadata } from 'next'
import Link from 'next/link'
import { CITIES, CITIES_COUNT, getCitiesByPriority, getCitiesGroupedByRegion } from '@/lib/cities'
import { COMPANY_DATA } from '@/lib/company'
import { MapPinIcon } from '@/components/icons'
import { CitySearch } from '@/components/search/CitySearch'
import { RegionAccordion } from './RegionAccordion'

export const metadata: Metadata = {
  title: `Einsatzorte | ShinyTouch Gebäudereinigung in ${CITIES_COUNT}+ Städten`,
  description: `ShinyTouch Gebäudereinigung ist in über ${CITIES_COUNT} Städten deutschlandweit für Sie da. Von Bamberg bis Berlin – professionelle Reinigung vor Ort. Finden Sie Ihren Standort.`,
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/einsatzorte',
  },
}

export default function EinsatzortePage() {
  const priority1Cities = getCitiesByPriority(1)
  const citiesByRegion = getCitiesGroupedByRegion()

  return (
    <>
      {/* Hero Section with Search */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Einsatzorte</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-6">
              Unsere Einsatzorte
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
              Gebäudereinigung in
              <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                {CITIES_COUNT}+ Städten
              </span>
            </h1>

            <p className="text-lg text-secondary-600 leading-relaxed mb-10">
              Von unserem Hauptsitz in Bamberg aus betreuen wir Kunden in ganz Deutschland. Finden
              Sie Ihren lokalen ShinyTouch Partner.
            </p>

            {/* Search Component */}
            <CitySearch cities={CITIES} placeholder="Stadt oder PLZ suchen..." />
          </div>
        </div>
      </section>

      {/* Main Cities */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
              Unsere Haupt-Einsatzorte
            </h2>
            <p className="text-secondary-600">
              In diesen Städten sind wir besonders stark vertreten
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {priority1Cities.slice(0, 12).map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group relative bg-gradient-to-br from-white to-primary-50 rounded-2xl p-6 border border-primary-100 hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <MapPinIcon className="w-8 h-8 mb-3 text-primary-500" />
                  <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-1">
                    {city.name}
                  </h3>
                  <p className="text-sm text-secondary-500">{city.region}</p>

                  <div className="mt-4 flex items-center gap-2 text-primary-600 font-medium text-sm">
                    <span>Mehr erfahren</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {city.slug === 'bamberg' && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                    Hauptsitz
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Cities by Region - Accordion */}
      <section className="py-16 lg:py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
              Alle Einsatzorte nach Bundesland
            </h2>
            <p className="text-secondary-600">
              Klicken Sie auf ein Bundesland, um alle Städte zu sehen
            </p>
          </div>

          <RegionAccordion citiesByRegion={citiesByRegion} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
                {CITIES_COUNT}+
              </div>
              <div className="text-sm text-secondary-600">Einsatzorte</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">16</div>
              <div className="text-sm text-secondary-600">Bundesländer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-sm text-secondary-600">Erreichbarkeit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-sm text-secondary-600">Deutschlandweit</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ihre Stadt ist nicht dabei?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Kein Problem! Wir erweitern ständig unser Einzugsgebiet. Kontaktieren Sie uns für eine
            individuelle Lösung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-2xl shadow-xl hover:bg-primary-50 transition-all"
            >
              Jetzt anfragen
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {COMPANY_DATA.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
