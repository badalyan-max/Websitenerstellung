import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Karriere | Jobs bei ShinyTouch Gebäudereinigung',
  description: 'Werden Sie Teil des ShinyTouch Teams! Wir suchen engagierte Reinigungskräfte in Bamberg und deutschlandweit. Faire Bezahlung, flexible Arbeitszeiten.',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/karriere',
  },
}

const benefits = [
  {
    title: 'Faire Bezahlung',
    description: 'Überdurchschnittliche Vergütung plus Zuschläge für Wochenend- und Feiertagsarbeit.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Arbeitszeiten',
    description: 'Verschiedene Schichtmodelle - ideal für Studierende, Eltern oder als Nebenjob.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Weiterbildung',
    description: 'Regelmäßige Schulungen und Möglichkeit zur Weiterentwicklung im Unternehmen.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Gutes Arbeitsklima',
    description: 'Familiäres Team mit flachen Hierarchien und direkter Kommunikation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Moderne Ausstattung',
    description: 'Professionelle Reinigungsgeräte und hochwertige Arbeitsmaterialien.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Sichere Anstellung',
    description: 'Unbefristete Arbeitsverträge und langfristige Perspektive.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const openPositions = [
  {
    title: 'Reinigungskraft (m/w/d)',
    location: 'Bamberg & Umgebung',
    type: 'Vollzeit / Teilzeit / Minijob',
    description: 'Für die Unterhaltsreinigung in verschiedenen Objekten suchen wir zuverlässige Reinigungskräfte.',
    requirements: [
      'Zuverlässigkeit und Pünktlichkeit',
      'Sorgfältige Arbeitsweise',
      'Deutschkenntnisse von Vorteil',
      'Führerschein wünschenswert',
    ],
  },
  {
    title: 'Objektleiter/in (m/w/d)',
    location: 'Bamberg',
    type: 'Vollzeit',
    description: 'Zur Verstärkung unseres Teams suchen wir eine/n erfahrene/n Objektleiter/in.',
    requirements: [
      'Berufserfahrung in der Gebäudereinigung',
      'Führungserfahrung',
      'Organisationstalent',
      'Führerschein Klasse B',
    ],
  },
  {
    title: 'Glasreiniger/in (m/w/d)',
    location: 'Bamberg & Nürnberg',
    type: 'Vollzeit',
    description: 'Für unsere Glasreinigungseinsätze suchen wir qualifizierte Mitarbeiter.',
    requirements: [
      'Erfahrung in der Glasreinigung',
      'Höhentauglichkeit',
      'Teamfähigkeit',
      'Führerschein Klasse B',
    ],
  },
]

// Job Posting Schema
function generateJobPostingSchema(job: typeof openPositions[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    employmentType: job.type.includes('Vollzeit') ? 'FULL_TIME' : 'PART_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
      sameAs: 'https://www.shinytouchgebaeudereinigung.de',
      logo: 'https://www.shinytouchgebaeudereinigung.de/logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.split(' & ')[0],
        addressRegion: 'Bayern',
        addressCountry: 'DE',
      },
    },
  }
}

export default function KarrierePage() {
  return (
    <>
      {/* Schema for each job posting */}
      {openPositions.map((job, idx) => (
        <JsonLd key={idx} data={generateJobPostingSchema(job)} />
      ))}

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-primary-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium">Karriere</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6">
              Karriere bei ShinyTouch
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Werden Sie Teil unseres Teams
            </h1>

            <p className="text-xl text-primary-100 leading-relaxed mb-8">
              Sie suchen einen Job mit fairer Bezahlung und flexiblen Arbeitszeiten?
              Dann sind Sie bei uns genau richtig!
            </p>

            <a
              href="#offene-stellen"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
            >
              Offene Stellen ansehen
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Das bieten wir Ihnen
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Bei ShinyTouch sind Mitarbeiter nicht nur eine Nummer - wir schätzen jeden Einzelnen
              und bieten ein Arbeitsumfeld, in dem Sie sich wohlfühlen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group bg-secondary-50 rounded-2xl p-6 hover:bg-primary-50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm group-hover:shadow-md transition-shadow mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">{benefit.title}</h3>
                <p className="text-secondary-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="offene-stellen" className="py-16 lg:py-24 bg-secondary-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Offene Stellen
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Finden Sie die passende Position und bewerben Sie sich noch heute!
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((job, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-secondary-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${COMPANY_DATA.contact.email}?subject=Bewerbung: ${job.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all whitespace-nowrap"
                  >
                    Jetzt bewerben
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <p className="text-secondary-600 mb-4">{job.description}</p>

                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Anforderungen:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {job.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="flex items-center gap-2 text-secondary-600">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              So bewerben Sie sich
            </h2>
            <p className="text-secondary-600 mb-8">
              Ihre Bewerbung ist bei uns unkompliziert - keine umfangreichen Unterlagen nötig!
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  step: '1',
                  title: 'Stelle auswählen',
                  description: 'Wählen Sie eine passende Position aus unseren offenen Stellen.',
                },
                {
                  step: '2',
                  title: 'E-Mail senden',
                  description: 'Schreiben Sie uns eine kurze E-Mail mit Ihren Kontaktdaten.',
                },
                {
                  step: '3',
                  title: 'Gespräch führen',
                  description: 'Wir melden uns bei Ihnen für ein persönliches Kennenlernen.',
                },
              ].map((item) => (
                <div key={item.step} className="relative pt-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="bg-secondary-50 rounded-2xl p-6 pt-8">
                    <h3 className="font-bold text-secondary-900 mb-2">{item.title}</h3>
                    <p className="text-secondary-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                Keine passende Stelle dabei?
              </h3>
              <p className="text-secondary-600 mb-6">
                Senden Sie uns gerne eine Initiativbewerbung - wir freuen uns auf Sie!
              </p>
              <a
                href={`mailto:${COMPANY_DATA.contact.email}?subject=Initiativbewerbung`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Initiativbewerbung senden
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
