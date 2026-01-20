import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | ShinyTouch Gebäudereinigung',
  description: 'Datenschutzerklärung der ShinyTouch Gebäudereinigung e.K. - Informationen zum Umgang mit Ihren personenbezogenen Daten.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/datenschutz',
  },
}

export default function DatenschutzPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Datenschutz</li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-secondary-900 mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-lg text-secondary-600">
            Stand: Januar 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-secondary max-w-none">

            {/* Verantwortlicher */}
            <div className="bg-secondary-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4 mt-0">1. Verantwortlicher</h2>
              <address className="not-italic text-secondary-700 leading-relaxed">
                <strong>{COMPANY_DATA.name}</strong><br />
                {COMPANY_DATA.address.street}<br />
                {COMPANY_DATA.address.zip} {COMPANY_DATA.address.city}<br />
                <br />
                Telefon: {COMPANY_DATA.contact.phoneDisplay}<br />
                E-Mail: {COMPANY_DATA.contact.email}
              </address>
            </div>

            {/* Übersicht */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">2. Übersicht der Verarbeitungen</h2>
              <p className="text-secondary-700">
                Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
                Verarbeitung zusammen und verweist auf die betroffenen Personen.
              </p>
              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Arten der verarbeiteten Daten</h3>
              <ul className="list-disc list-inside text-secondary-700 space-y-1">
                <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
                <li>Inhaltsdaten (z.B. Eingaben in Onlineformularen)</li>
                <li>Nutzungsdaten (z.B. besuchte Webseiten, Zugriffszeiten)</li>
                <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
              </ul>
            </div>

            {/* Rechtsgrundlagen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">3. Maßgebliche Rechtsgrundlagen</h2>
              <p className="text-secondary-700 mb-4">
                Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir
                personenbezogene Daten verarbeiten:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>
                  <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong> – Die betroffene Person hat ihre
                  Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen
                  spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
                </li>
                <li>
                  <strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b DSGVO)</strong> –
                  Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene
                  Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich.
                </li>
                <li>
                  <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</strong> – Die Verarbeitung ist
                  zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich.
                </li>
              </ul>
            </div>

            {/* Sicherheitsmaßnahmen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">4. Sicherheitsmaßnahmen</h2>
              <p className="text-secondary-700">
                Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik,
                der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
                sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der
                Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen,
                um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
              </p>
              <p className="text-secondary-700 mt-4">
                Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
                Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten
                als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der
                Verfügbarkeit und ihrer Trennung. Die Website wird über HTTPS (SSL/TLS-Verschlüsselung) übertragen.
              </p>
            </div>

            {/* Kontaktaufnahme */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">5. Kontaktaufnahme</h2>
              <p className="text-secondary-700 mb-4">
                Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via soziale Medien)
                werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur Beantwortung der
                Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-1">
                <li><strong>Verarbeitete Datenarten:</strong> Kontaktdaten, Inhaltsdaten, Nutzungsdaten, Meta-/Kommunikationsdaten</li>
                <li><strong>Betroffene Personen:</strong> Kommunikationspartner</li>
                <li><strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation</li>
                <li><strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</li>
              </ul>
            </div>

            {/* Webhosting */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">6. Bereitstellung des Onlineangebotes und Webhosting</h2>
              <p className="text-secondary-700 mb-4">
                Um unser Onlineangebot sicher und effizient bereitstellen zu können, nehmen wir die Leistungen
                von einem oder mehreren Webhosting-Anbietern in Anspruch, von deren Servern (bzw. von ihnen
                verwalteten Servern) das Onlineangebot abgerufen werden kann.
              </p>
              <p className="text-secondary-700 mb-4">
                Zu diesen Zwecken können wir Infrastruktur- und Plattformdienstleistungen, Rechenkapazität,
                Speicherplatz und Datenbankdienste sowie Sicherheitsleistungen und technische
                Wartungsleistungen in Anspruch nehmen.
              </p>
              <p className="text-secondary-700">
                Zu den im Rahmen der Bereitstellung des Hostingangebotes verarbeiteten Daten können alle die
                Nutzer unseres Onlineangebotes betreffenden Angaben gehören, die im Rahmen der Nutzung und
                der Kommunikation anfallen. Hierzu gehören regelmäßig die IP-Adresse, die notwendig ist, um
                die Inhalte von Onlineangeboten an Browser ausliefern zu können, und alle innerhalb unseres
                Onlineangebotes oder von Webseiten getätigten Eingaben.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">7. Einsatz von Cookies</h2>
              <p className="text-secondary-700 mb-4">
                Unsere Website verwendet derzeit keine Cookies zu Marketing- oder Tracking-Zwecken.
                Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb der
                Website erforderlich sind.
              </p>
              <p className="text-secondary-700">
                Sollten wir in Zukunft Cookies einsetzen, werden wir Sie darüber informieren und Ihre
                Einwilligung einholen, soweit dies rechtlich erforderlich ist.
              </p>
            </div>

            {/* Rechte der Betroffenen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">8. Rechte der betroffenen Personen</h2>
              <p className="text-secondary-700 mb-4">
                Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>
                  <strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer
                  besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden
                  personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
                  Widerspruch einzulegen.
                </li>
                <li>
                  <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte
                  Einwilligungen jederzeit zu widerrufen.
                </li>
                <li>
                  <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu
                  verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten.
                </li>
                <li>
                  <strong>Berichtigungsrecht:</strong> Sie haben das Recht, die Vervollständigung der Sie
                  betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben das Recht,
                  zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ die
                  Einschränkung der Verarbeitung der Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten,
                  die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren
                  Format zu erhalten.
                </li>
                <li>
                  <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben das Recht, sich bei einer
                  Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie
                  betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
                </li>
              </ul>
            </div>

            {/* Änderungen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">9. Änderung und Aktualisierung der Datenschutzerklärung</h2>
              <p className="text-secondary-700">
                Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren.
                Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten
                Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen
                eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle
                Benachrichtigung erforderlich wird.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    </>
  )
}
