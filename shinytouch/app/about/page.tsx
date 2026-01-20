import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Über uns | ShinyTouch Gebäudereinigung',
  description: 'ShinyTouch Gebäudereinigung aus Bamberg - Ihr Partner für professionelle Reinigung. ✓ 5.0/5 Bewertung ✓ 500+ Kunden ✓ 30-Tage-Garantie',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/about',
  },
}

const values = [
  {
    icon: '🎯',
    title: 'Qualität',
    description: 'Wir setzen auf höchste Reinigungsstandards. Jeder Auftrag wird mit Sorgfalt und Präzision ausgeführt.',
  },
  {
    icon: '🤝',
    title: 'Zuverlässigkeit',
    description: 'Pünktlichkeit und Verlässlichkeit sind für uns selbstverständlich. Unsere Kunden können sich auf uns verlassen.',
  },
  {
    icon: '🌿',
    title: 'Nachhaltigkeit',
    description: 'Wir verwenden umweltfreundliche Reinigungsmittel und arbeiten ressourcenschonend.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Moderne Reinigungstechniken und kontinuierliche Weiterbildung unserer Mitarbeiter.',
  },
]

const milestones = [
  {
    year: '2020',
    title: 'Gründung',
    description: 'ShinyTouch wird in Bamberg gegründet mit der Vision, professionelle Gebäudereinigung neu zu definieren.',
  },
  {
    year: '2021',
    title: 'Expansion',
    description: 'Erweiterung des Einzugsgebiets auf ganz Oberfranken und erste Großkunden.',
  },
  {
    year: '2022',
    title: '100 Kunden',
    description: 'Meilenstein von 100 zufriedenen Stammkunden erreicht.',
  },
  {
    year: '2023',
    title: 'Deutschlandweit',
    description: 'Ausweitung des Serviceangebots auf 32 Städte in ganz Deutschland.',
  },
  {
    year: '2024',
    title: '500+ Kunden',
    description: 'Über 500 zufriedene Kunden vertrauen auf ShinyTouch.',
  },
]

const stats = [
  { value: '500+', label: 'Zufriedene Kunden' },
  { value: '5.0', label: 'Sterne Bewertung' },
  { value: '32', label: 'Standorte' },
  { value: '100%', label: 'Zufriedenheitsgarantie' },
]

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.shinytouchgebaeudereinigung.de/#organization",
    "name": COMPANY_DATA.name,
    "url": "https://www.shinytouchgebaeudereinigung.de",
    "logo": "https://www.shinytouchgebaeudereinigung.de/logo.png",
    "description": "Professionelle Gebäudereinigung in Bamberg und 32 weiteren Städten deutschlandweit.",
    "foundingDate": "2020",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bamberg",
        "addressCountry": "DE"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_DATA.address.street,
      "addressLocality": COMPANY_DATA.address.city,
      "postalCode": COMPANY_DATA.address.zip,
      "addressCountry": COMPANY_DATA.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_DATA.contact.phone,
      "contactType": "customer service",
      "availableLanguage": "German"
    },
    "sameAs": [
      COMPANY_DATA.social.provenExpert,
      COMPANY_DATA.social.linkedin
    ]
  }

  return (
    <>
      <JsonLd data={organizationSchema} />

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
              <li className="text-secondary-900 font-medium">Über uns</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-6">
                Über ShinyTouch
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
                Ihr Partner für
                <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  strahlende Sauberkeit
                </span>
              </h1>

              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                ShinyTouch Gebäudereinigung wurde 2020 in Bamberg gegründet mit einer klaren Mission:
                Professionelle Reinigung, die den Unterschied macht. Heute betreuen wir über 500
                zufriedene Kunden in 32 Städten deutschlandweit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  Kontakt aufnehmen
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-8 border border-secondary-100">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-4">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-secondary-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Unsere Mission
            </h2>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Wir glauben, dass ein sauberes Umfeld mehr ist als nur Ästhetik – es fördert
              Produktivität, Wohlbefinden und hinterlässt einen bleibenden Eindruck.
              Deshalb setzen wir auf höchste Qualitätsstandards, geschulte Mitarbeiter und
              umweltfreundliche Reinigungsmittel.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Unsere Werte
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Diese Grundsätze leiten uns bei jedem Auftrag
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-secondary-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Unsere Geschichte
            </h2>
            <p className="text-lg text-secondary-600">
              Von Bamberg in die ganze Republik
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 hidden sm:block" />

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex gap-6 items-start">
                  {/* Year Badge */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30">
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-secondary-50 rounded-2xl p-6 hover:bg-secondary-100 transition-colors">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{milestone.title}</h3>
                    <p className="text-secondary-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Unsere 30-Tage-Zufriedenheitsgarantie
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Nicht zufrieden? Wir kommen kostenlos zurück und bessern nach.
              Immer noch nicht zufrieden? Geld zurück – ohne Wenn und Aber.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Kostenlose Nachbesserung</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Geld-zurück-Garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Keine versteckten Kosten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Lernen Sie uns kennen
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Lassen Sie uns gemeinsam besprechen, wie wir Ihre Räumlichkeiten zum Strahlen bringen können.
            Kostenlose Beratung und unverbindliches Angebot.
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
