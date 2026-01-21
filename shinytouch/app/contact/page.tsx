import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { WizardEmbed } from '@/components/wizard/WizardEmbed'

export const metadata: Metadata = {
  title: 'Kontakt & Angebot | ShinyTouch Gebäudereinigung',
  description: 'Erstellen Sie Ihr individuelles Reinigungsangebot in wenigen Minuten. Oder kontaktieren Sie uns direkt: ☎ +49 951 97433700 ✉ info@shinytouchgebaeudereinigung.de',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Compact Hero Section */}
      <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Kontakt & Angebot</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Kostenlos & Unverbindlich
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-secondary-900 mb-4">
              Ihr Angebot in 2 Minuten
            </h1>

            <p className="text-lg text-secondary-600 leading-relaxed">
              Nutzen Sie unseren Konfigurator und erhalten Sie sofort ein individuelles Angebot -
              ganz ohne Wartezeit und unverbindlich.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Wizard Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <WizardEmbed className="mb-8" />

          {/* Trust indicators below wizard */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>SSL-verschlüsselt</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Keine versteckten Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Sofortige Antwort</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Collapsed version */}
      <section className="py-12 lg:py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">
              So funktioniert&apos;s
            </h2>
            <p className="text-secondary-600">
              In nur 3 Schritten zu Ihrem individuellen Reinigungsangebot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Objekt beschreiben',
                description: 'Geben Sie die Details zu Ihrem Objekt ein: Größe, Art und gewünschte Reinigungsleistungen.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Angebot erhalten',
                description: 'Unser System berechnet sofort ein transparentes Angebot basierend auf Ihren Angaben.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Termin vereinbaren',
                description: 'Gefällt Ihnen das Angebot? Dann vereinbaren wir einen Starttermin - ganz unkompliziert.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary-600">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-sm text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact Options */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Oder kontaktieren Sie uns direkt
            </h2>
            <p className="text-secondary-300 max-w-2xl mx-auto">
              Haben Sie Fragen oder möchten Sie lieber persönlich mit uns sprechen?
              Wir sind gerne für Sie da.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Anrufen</h3>
              <p className="text-xl font-bold text-primary-400 mb-1">
                {COMPANY_DATA.contact.phoneDisplay}
              </p>
              <p className="text-xs text-secondary-400">Mo-Fr 08:00-18:00, Sa 08:00-16:00</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_DATA.contact.email}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">E-Mail schreiben</h3>
              <p className="text-base text-primary-400 mb-1 break-all">
                {COMPANY_DATA.contact.email}
              </p>
              <p className="text-xs text-secondary-400">Antwort innerhalb von 24 Stunden</p>
            </a>

            {/* Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Standort</h3>
              <p className="text-sm text-secondary-300">
                {COMPANY_DATA.name}<br />
                {COMPANY_DATA.address.street}<br />
                {COMPANY_DATA.address.zip} {COMPANY_DATA.address.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 lg:p-10 border border-primary-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xl font-bold text-secondary-900">5.0/5</span>
                </div>

                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  Vertrauen Sie auf unsere Erfahrung
                </h3>

                <p className="text-secondary-600 mb-4 text-sm">
                  Seit Jahren betreuen wir Unternehmen in ganz Deutschland mit professioneller
                  Gebäudereinigung. Unsere Kunden schätzen unsere Zuverlässigkeit, Qualität und
                  den persönlichen Service.
                </p>

                <a
                  href={COMPANY_DATA.social.provenExpert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-sm"
                >
                  Alle Bewertungen auf ProvenExpert
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '30', label: 'Tage risikofrei testen' },
                  { value: '24h', label: 'Antwortzeit auf Anfragen' },
                  { value: '100%', label: 'Preistransparenz' },
                  { value: '600+', label: 'Orte bundesweit' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md">
                    <p className="text-2xl font-bold text-primary-600 mb-0.5">{stat.value}</p>
                    <p className="text-xs text-secondary-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
