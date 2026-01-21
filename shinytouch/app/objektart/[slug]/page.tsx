import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OBJEKTARTEN, getObjektartBySlug, getAllObjektartSlugs } from '@/lib/objektarten'
import { getServiceBySlug } from '@/lib/services'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'

interface ObjektartPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllObjektartSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ObjektartPageProps): Promise<Metadata> {
  const { slug } = await params
  const objektart = getObjektartBySlug(slug)

  if (!objektart) {
    return { title: 'Objektart nicht gefunden' }
  }

  const title = `${objektart.name}-Reinigung | ShinyTouch Gebäudereinigung`
  const description = `${objektart.description} Jetzt kostenloses Angebot anfordern!`

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
      canonical: `https://www.shinytouchgebaeudereinigung.de/objektart/${objektart.slug}`,
    },
  }
}

export default async function ObjektartPage({ params }: ObjektartPageProps) {
  const { slug } = await params
  const objektart = getObjektartBySlug(slug)

  if (!objektart) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Objektarten', url: '/objektarten' },
    { name: objektart.name, url: `/objektart/${objektart.slug}` },
  ]

  // Get related object types (same category, excluding current)
  const relatedObjektarten = OBJEKTARTEN
    .filter((o) => o.category === objektart.category && o.slug !== objektart.slug)
    .slice(0, 3)

  // Get service details for linked services
  const linkedServices = objektart.services
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean)

  return (
    <>
      {/* Schema Markup */}
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      {objektart.faqs && objektart.faqs.length > 0 && (
        <JsonLd data={generateFAQSchema(objektart.faqs)} />
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
                <Link href="/objektarten" className="hover:text-primary-600 transition-colors">Objektarten</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">{objektart.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Category Badge */}
              <span className="inline-flex items-center px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
                {objektart.categoryName}
              </span>

              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl text-white mb-6 shadow-xl shadow-primary-500/30 text-4xl">
                {objektart.icon}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
                {objektart.name}-Reinigung
              </h1>

              <p className="text-lg text-secondary-600 mb-8 leading-relaxed whitespace-pre-line">
                {objektart.longDescription}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30 Tage risikofrei</span>
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
                  <span>Kostenlose Beratung</span>
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

            {/* Challenges Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-8 border border-secondary-100">
                <h2 className="text-xl font-bold text-secondary-900 mb-6">Typische Herausforderungen</h2>

                <ul className="space-y-4">
                  {objektart.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-secondary-700">{challenge}</span>
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

      {/* Services Section */}
      {linkedServices.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Unsere Leistungen f&uuml;r {objektart.name}
              </h2>
              <p className="text-lg text-secondary-600">
                Diese Services bieten wir speziell f&uuml;r Ihre {objektart.name} an.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {linkedServices.map((service) => service && (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {objektart.benefits && objektart.benefits.length > 0 && (
        <section className="py-20 lg:py-28 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Warum ShinyTouch f&uuml;r Ihre {objektart.name}?
              </h2>
              <p className="text-lg text-secondary-600">
                Profitieren Sie von unserer Erfahrung und unserem Qualit&auml;tsanspruch.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {objektart.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-secondary-100 text-center hover:shadow-lg transition-shadow"
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
      {objektart.faqs && objektart.faqs.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                H&auml;ufige Fragen zur {objektart.name}-Reinigung
              </h2>
            </div>

            <div className="space-y-4">
              {objektart.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-secondary-50 rounded-2xl border border-secondary-100 overflow-hidden"
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

      {/* Related Objektarten */}
      {relatedObjektarten.length > 0 && (
        <section className="py-20 lg:py-28 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                Weitere Objektarten in {objektart.categoryName}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedObjektarten.map((related) => (
                <Link
                  key={related.slug}
                  href={`/objektart/${related.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {related.icon}
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">{related.shortDescription}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/objektarten"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
              >
                Alle Objektarten ansehen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Jetzt Angebot f&uuml;r Ihre {objektart.name} anfordern
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Erhalten Sie Ihr kostenloses und unverbindliches Angebot f&uuml;r die professionelle
            Reinigung Ihrer {objektart.name}. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
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
