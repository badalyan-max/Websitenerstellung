import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { JsonLd } from '@/components/seo/json-ld'
import { generateFAQSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) | ShinyTouch Gebäudereinigung',
  description: 'Antworten auf häufige Fragen zur Gebäudereinigung: Kosten, Ablauf, Garantie und mehr. ✓ Transparente Preise ✓ 30-Tage-Garantie',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/faq',
  },
}

const faqCategories = [
  {
    name: 'Allgemein',
    icon: '❓',
    faqs: [
      {
        question: 'Was kostet eine professionelle Gebäudereinigung?',
        answer: 'Die Kosten für professionelle Gebäudereinigung liegen zwischen 15-35€ pro Stunde, abhängig von Objektgröße, Reinigungsintervall und Art der Reinigung. Für ein genaues Angebot erstellen wir Ihnen kostenlos ein individuelles Angebot nach einer Besichtigung oder anhand Ihrer Objektdaten.',
      },
      {
        question: 'In welchen Städten ist ShinyTouch tätig?',
        answer: 'ShinyTouch ist deutschlandweit in 32 Städten tätig, mit Hauptsitz in Bamberg. Zu unseren Standorten gehören unter anderem München, Nürnberg, Berlin, Hamburg, Frankfurt, Köln, Stuttgart und viele weitere. Auch wenn Ihre Stadt nicht aufgelistet ist, kontaktieren Sie uns – wir erweitern ständig unser Einzugsgebiet.',
      },
      {
        question: 'Wie kann ich ein Angebot anfordern?',
        answer: 'Sie können ein kostenloses Angebot über unser Kontaktformular, per E-Mail an info@shinytouchgebaeudereinigung.de oder telefonisch unter 0951 97433700 anfordern. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
      },
      {
        question: 'Bietet ShinyTouch auch Reinigung am Wochenende an?',
        answer: 'Ja, wir bieten flexible Reinigungszeiten an, einschließlich Wochenenden und außerhalb der Geschäftszeiten. So stören wir Ihren Betriebsablauf nicht. Samstags sind wir von 08:00 bis 16:00 Uhr erreichbar.',
      },
    ],
  },
  {
    name: 'Leistungen',
    icon: '🧹',
    faqs: [
      {
        question: 'Welche Reinigungsleistungen bietet ShinyTouch an?',
        answer: 'Wir bieten ein umfassendes Spektrum an Reinigungsleistungen: Büroreinigung, Glasreinigung, Grundreinigung, Unterhaltsreinigung, Baureinigung und Hochdruckreinigung. Jede Leistung kann individuell an Ihre Bedürfnisse angepasst werden.',
      },
      {
        question: 'Was ist der Unterschied zwischen Unterhaltsreinigung und Grundreinigung?',
        answer: 'Die Unterhaltsreinigung ist eine regelmäßige, wiederkehrende Reinigung zur Aufrechterhaltung der Sauberkeit (täglich, wöchentlich oder monatlich). Die Grundreinigung ist eine intensive Einmalreinigung, die auch hartnäckige Verschmutzungen und schwer zugängliche Stellen umfasst – ideal als Frühjahrsputz oder vor Einzug.',
      },
      {
        question: 'Reinigt ShinyTouch auch Privatwohnungen?',
        answer: 'Unser Fokus liegt auf Gewerbeimmobilien wie Büros, Praxen, Geschäfte und öffentliche Einrichtungen. Für größere Privatimmobilien oder regelmäßige Reinigung von Mehrfamilienhäusern können Sie uns jedoch gerne kontaktieren.',
      },
      {
        question: 'Welche Reinigungsmittel verwendet ShinyTouch?',
        answer: 'Wir setzen auf umweltfreundliche, biologisch abbaubare Reinigungsmittel, die dennoch effektiv gegen Schmutz und Keime wirken. Auf Wunsch können wir auch spezielle Mittel für Allergiker oder nach Ihren Vorgaben verwenden.',
      },
    ],
  },
  {
    name: 'Qualität & Garantie',
    icon: '🛡️',
    faqs: [
      {
        question: 'Was beinhaltet die 30-Tage-Zufriedenheitsgarantie?',
        answer: 'Unsere 30-Tage-Garantie bedeutet: Sind Sie innerhalb von 30 Tagen nicht zufrieden, kommen wir kostenlos zurück und bessern nach. Sind Sie dann immer noch nicht zufrieden, erhalten Sie Ihr Geld zurück – ohne Wenn und Aber. Das ist unser Versprechen.',
      },
      {
        question: 'Wie wird die Qualität der Reinigung sichergestellt?',
        answer: 'Wir setzen auf geschulte Mitarbeiter, regelmäßige Qualitätskontrollen und klare Checklisten für jeden Auftrag. Zusätzlich holen wir aktiv Feedback von unseren Kunden ein und reagieren sofort auf Verbesserungswünsche.',
      },
      {
        question: 'Sind die Mitarbeiter von ShinyTouch versichert?',
        answer: 'Ja, alle unsere Mitarbeiter sind vollständig versichert. Wir verfügen über eine Betriebshaftpflichtversicherung, die eventuelle Schäden während der Reinigung abdeckt. Sie gehen kein Risiko ein.',
      },
      {
        question: 'Was passiert, wenn ich mit der Reinigung nicht zufrieden bin?',
        answer: 'Kontaktieren Sie uns einfach – wir nehmen jede Reklamation ernst. In den meisten Fällen kommen wir innerhalb von 24-48 Stunden für eine kostenlose Nachbesserung. Ihre Zufriedenheit hat für uns oberste Priorität.',
      },
    ],
  },
  {
    name: 'Vertrag & Preise',
    icon: '📋',
    faqs: [
      {
        question: 'Gibt es eine Mindestvertragslaufzeit?',
        answer: 'Nein, wir bieten flexible Vereinbarungen ohne lange Bindung. Sie können monatlich kündigen. Für regelmäßige Reinigung bieten wir attraktive Konditionen, aber auch einmalige Aufträge sind willkommen.',
      },
      {
        question: 'Was bedeutet Festpreisgarantie?',
        answer: 'Mit unserer Festpreisgarantie wissen Sie vorab genau, was die Reinigung kostet. Der vereinbarte Preis gilt – keine versteckten Kosten, keine Überraschungen auf der Rechnung. Das Angebot ist verbindlich.',
      },
      {
        question: 'Wie erfolgt die Bezahlung?',
        answer: 'Wir stellen nach erbrachter Leistung eine Rechnung mit 14 Tagen Zahlungsziel. Für regelmäßige Aufträge bieten wir auch monatliche Sammelrechnungen an. Zahlung per Überweisung oder SEPA-Lastschrift möglich.',
      },
      {
        question: 'Gibt es Rabatte für regelmäßige Reinigung?',
        answer: 'Ja, bei regelmäßigen Reinigungsaufträgen (wöchentlich oder öfter) bieten wir attraktive Rabatte. Je häufiger und langfristiger die Zusammenarbeit, desto günstiger wird der Stundensatz. Fragen Sie nach unseren Paketpreisen.',
      },
    ],
  },
]

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs)

export default function FAQPage() {
  return (
    <>
      <JsonLd data={generateFAQSchema(allFaqs)} />

      {/* Hero Section */}
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
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">FAQ</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-6">
              Häufige Fragen
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
              Fragen &
              <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                Antworten
              </span>
            </h1>

            <p className="text-lg text-secondary-600 leading-relaxed">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Reinigungsleistungen,
              Preisen und Abläufen. Ihre Frage ist nicht dabei? Kontaktieren Sie uns!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, catIdx) => (
              <div key={catIdx}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-secondary-900">{category.name}</h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIdx) => (
                    <details
                      key={faqIdx}
                      className="group bg-secondary-50 rounded-2xl overflow-hidden hover:bg-secondary-100 transition-colors"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="font-semibold text-secondary-900 pr-4 text-left">
                          {faq.question}
                        </h3>
                        <svg
                          className="w-5 h-5 text-secondary-400 group-open:rotate-180 transition-transform flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-secondary-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 lg:py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-secondary-100 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
                Ihre Frage wurde nicht beantwortet?
              </h2>
              <p className="text-secondary-600">
                Wir helfen Ihnen gerne persönlich weiter
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                className="flex flex-col items-center p-6 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="font-semibold text-secondary-900">Anrufen</span>
                <span className="text-sm text-secondary-500">{COMPANY_DATA.contact.phoneDisplay}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_DATA.contact.email}`}
                className="flex flex-col items-center p-6 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-secondary-900">E-Mail</span>
                <span className="text-sm text-secondary-500">Schreiben Sie uns</span>
              </a>

              {/* Contact Form */}
              <Link
                href="/contact"
                className="flex flex-col items-center p-6 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="font-semibold text-secondary-900">Kontaktformular</span>
                <span className="text-sm text-secondary-500">Nachricht senden</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bereit für strahlende Sauberkeit?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Fordern Sie jetzt Ihr kostenloses und unverbindliches Angebot an.
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
          </div>
        </div>
      </section>
    </>
  )
}
