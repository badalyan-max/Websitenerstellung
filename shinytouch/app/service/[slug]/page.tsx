import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, getServiceBySlug, getAllServiceSlugs } from '@/lib/services'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { SERVICE_ICONS } from '@/components/icons'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: 'Service nicht gefunden' }
  }

  const title = `${service.name} | ShinyTouch Gebäudereinigung`
  const description = `${service.description} ✓ 30-Tage-Zufriedenheitsgarantie ✓ Festpreise ✓ Kostenlose Beratung`

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
      canonical: `https://www.shinytouchgebaeudereinigung.de/service/${service.slug}`,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Leistungen', url: '/service' },
    { name: service.name, url: `/service/${service.slug}` },
  ]

  // Get related services (excluding current)
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      {/* Schema Markup */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      {service.faqs && service.faqs.length > 0 && (
        <JsonLd data={generateFAQSchema(service.faqs)} />
      )}

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
              <li>
                <Link href="/service" className="hover:text-primary-600 transition-colors">Leistungen</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">{service.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl text-white mb-6 shadow-xl shadow-primary-500/30">
                {(() => {
                  const IconComponent = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS]
                  return IconComponent ? <IconComponent className="w-10 h-10" /> : null
                })()}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
                {service.name}
              </h1>

              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                {service.longDescription || service.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
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
                  <span>Festpreisgarantie</span>
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
                  Angebot anfordern
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
                  Jetzt anrufen
                </a>
              </div>
            </div>

            {/* Features Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-8 border border-secondary-100">
                <h2 className="text-xl font-bold text-secondary-900 mb-6">Was wir bieten</h2>

                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Ihre Vorteile bei {service.name}
              </h2>
              <p className="text-lg text-secondary-600">
                Profitieren Sie von unserer langjährigen Erfahrung und unserem Qualitätsanspruch.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-secondary-50 rounded-2xl p-6 border border-secondary-100 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-secondary-900">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 lg:py-28 bg-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Häufige Fragen zu {service.name}
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
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
      )}

      {/* Related Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
              Weitere Leistungen
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((relatedService) => {
              const IconComponent = SERVICE_ICONS[relatedService.slug as keyof typeof SERVICE_ICONS]
              return (
                <Link
                  key={relatedService.slug}
                  href={`/service/${relatedService.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {relatedService.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">{relatedService.shortDescription}</p>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/service"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
            >
              Alle Leistungen ansehen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Jetzt {service.name} anfragen
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Erhalten Sie Ihr kostenloses und unverbindliches Angebot für {service.name}.
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
