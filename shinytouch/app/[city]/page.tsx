import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CITIES, getCityBySlug, getAllCitySlugs } from '@/lib/cities'
import { SERVICES } from '@/lib/services'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { MapPinIcon, SERVICE_ICONS } from '@/components/icons'

interface CityPageProps {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }))
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return { title: 'Stadt nicht gefunden' }
  }

  const title = `Gebäudereinigung ${city.name} | ShinyTouch`
  const description = `Professionelle Gebäudereinigung in ${city.name}, ${city.region}. Büroreinigung, Glasreinigung & mehr. ✓ 30-Tage-Garantie ✓ 5.0/5 Bewertungen ✓ Kostenlose Beratung`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'de_DE',
    },
    alternates: {
      canonical: `https://www.shinytouchgebaeudereinigung.de/${city.slug}`,
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Standorte', url: '/standorte' },
    { name: city.name, url: `/${city.slug}` },
  ]

  return (
    <>
      {/* Schema Markup */}
      <JsonLd data={generateLocalBusinessSchema(city)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        {/* Background Elements */}
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
              <li>
                <Link href="/standorte" className="hover:text-primary-600 transition-colors">Standorte</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">{city.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-100 shadow-sm mb-6">
                <MapPinIcon className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-secondary-900">{city.region}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
                <span className="block">Gebäudereinigung</span>
                <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  {city.name}
                </span>
              </h1>

              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                {city.intro || `Professionelle Gebäudereinigung in ${city.name} und Umgebung.
                Wir bieten Ihnen makellose Sauberkeit mit unserer 30-Tage-Zufriedenheitsgarantie.`}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kostenlose Beratung</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-Tage-Garantie</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5.0/5 Bewertung</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  Kostenloses Angebot
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <a
                  href={`tel:${COMPANY_DATA.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-700 text-lg font-semibold rounded-2xl border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {COMPANY_DATA.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Info Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-8 border border-secondary-100">
                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-secondary-900">5.0/5</div>
                    <div className="text-xs text-secondary-500">{COMPANY_DATA.rating.count} Bewertungen</div>
                  </div>
                </div>

                {/* Highlights */}
                {city.highlights && city.highlights.length > 0 ? (
                  <ul className="space-y-3 mb-6">
                    {city.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-secondary-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-secondary-700">Lokale Präsenz in {city.name}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-secondary-700">Schnelle Reaktionszeiten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-secondary-700">Festpreisgarantie</span>
                    </li>
                  </ul>
                )}

                {/* Contact Info */}
                <div className="pt-6 border-t border-secondary-100">
                  <div className="text-sm text-secondary-500 mb-2">Kontakt für {city.name}:</div>
                  <div className="font-semibold text-secondary-900">{COMPANY_DATA.contact.phoneDisplay}</div>
                  <div className="text-secondary-600">{COMPANY_DATA.contact.email}</div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Unsere Leistungen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Was kostet Gebäudereinigung in {city.name}?
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Professionelle Gebäudereinigung in {city.name} kostet zwischen 15-35€/Stunde,
              abhängig von Objektgröße und Reinigungsintervall. Wir erstellen Ihnen ein
              individuelles Festpreisangebot.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const IconComponent = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS]
              return (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name} {city.name}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4">{service.shortDescription}</p>
                  <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm">
                    Mehr erfahren
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">
              FAQ zur Gebäudereinigung in {city.name}
            </h2>
          </div>

          <div className="space-y-4">
            {(city.faqs && city.faqs.length > 0 ? city.faqs : [
              {
                question: `Bietet ShinyTouch Gebäudereinigung in ${city.name} an?`,
                answer: `Ja, wir bieten professionelle Gebäudereinigung in ${city.name} und Umgebung an. Unser Team vor Ort kennt die lokalen Gegebenheiten und steht Ihnen für alle Reinigungsaufgaben zur Verfügung.`
              },
              {
                question: `Wie schnell kann ein Termin in ${city.name} vereinbart werden?`,
                answer: `In der Regel können wir innerhalb von 24-48 Stunden einen ersten Beratungstermin anbieten. Die eigentliche Reinigung kann oft schon in der gleichen Woche beginnen.`
              },
              {
                question: `Welche Leistungen bieten Sie in ${city.name} an?`,
                answer: `Wir bieten das komplette Spektrum an Gebäudereinigung: Büroreinigung, Glasreinigung, Grundreinigung, Unterhaltsreinigung, Baureinigung und Hochdruckreinigung.`
              },
              {
                question: `Gibt es eine Zufriedenheitsgarantie für ${city.name}?`,
                answer: `Ja, unsere 30-Tage-Zufriedenheitsgarantie gilt auch für alle Kunden in ${city.name}. Sind Sie nicht zufrieden, reinigen wir kostenlos nach oder erstatten Ihnen das Geld.`
              }
            ]).map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-secondary-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-secondary-900 pr-4">{faq.question}</h3>
                  <svg
                    className="w-5 h-5 text-secondary-400 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-secondary-600">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Professionelle Gebäudereinigung in {city.name}
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Fordern Sie jetzt Ihr kostenloses Angebot für {city.name} an.
            Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-2xl shadow-xl hover:bg-primary-50 transition-all"
            >
              Kostenloses Angebot anfordern
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
