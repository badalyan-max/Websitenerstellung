import { Metadata } from 'next'
import Link from 'next/link'
import { OBJEKTARTEN, CATEGORY_NAMES, getAllCategories } from '@/lib/objektarten'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Objektarten | ShinyTouch Gebäudereinigung',
  description: 'Professionelle Gebäudereinigung für alle Objektarten: Treppenhäuser, Büros, Praxen, Hotels, Schulen und mehr. Finden Sie die passende Reinigungslösung für Ihr Objekt.',
  openGraph: {
    title: 'Objektarten | ShinyTouch Gebäudereinigung',
    description: 'Professionelle Gebäudereinigung für alle Objektarten. Finden Sie die passende Lösung für Ihr Objekt.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/objektarten',
  },
}

export default function ObjektartenPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Objektarten', url: '/objektarten' },
  ]

  const categories = getAllCategories()

  // Group objektarten by category
  const objektartenByCategory = categories.reduce((acc, category) => {
    acc[category] = OBJEKTARTEN.filter((obj) => obj.category === category)
    return acc
  }, {} as Record<string, typeof OBJEKTARTEN>)

  return (
    <>
      {/* Schema Markup */}
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

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
              <li className="text-secondary-900 font-medium">Objektarten</li>
            </ol>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
              Reinigung f&uuml;r alle Objektarten
            </h1>

            <p className="text-lg sm:text-xl text-secondary-600 mb-10 leading-relaxed">
              Von Treppenh&auml;usern &uuml;ber B&uuml;ros bis zu Hotels &ndash; wir bieten ma&szlig;geschneiderte
              Reinigungsl&ouml;sungen f&uuml;r jede Objektart. Finden Sie die passende L&ouml;sung f&uuml;r Ihr Geb&auml;ude.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">{OBJEKTARTEN.length}+</div>
                <div className="text-sm text-secondary-500">Objektarten</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">{categories.length}</div>
                <div className="text-sm text-secondary-500">Kategorien</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">5.0</div>
                <div className="text-sm text-secondary-500">Sterne Bewertung</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                {COMPANY_DATA.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                <span className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                  {objektartenByCategory[category][0]?.icon}
                </span>
                {CATEGORY_NAMES[category] || category}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {objektartenByCategory[category].map((objektart) => (
                  <Link
                    key={objektart.slug}
                    href={`/objektart/${objektart.slug}`}
                    className="group bg-white rounded-xl p-5 border border-secondary-100 hover:border-primary-200 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-xl group-hover:bg-primary-100 transition-colors flex-shrink-0">
                        {objektart.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                          {objektart.name}
                        </h3>
                        <p className="text-sm text-secondary-500 line-clamp-2 mt-1">
                          {objektart.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ihr Objekt nicht dabei?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Kein Problem! Wir reinigen auch Objektarten, die hier nicht aufgef&uuml;hrt sind.
            Kontaktieren Sie uns f&uuml;r ein individuelles Angebot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-2xl shadow-xl hover:bg-primary-50 transition-all"
            >
              Jetzt anfragen
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
