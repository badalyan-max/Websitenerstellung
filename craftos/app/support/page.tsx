import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Clock } from 'lucide-react'
import { LegalShell, LegalSection } from '@/components/legal/Legal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Support & Hilfe',
  description:
    'Support und Kontakt zur CraftOS App – der Companion-App für Handwerk und Bau. E-Mail, Telefon und Antworten auf häufige Fragen.',
  alternates: { canonical: `${site.url}/support` },
  robots: { index: true, follow: true },
}

const faq = [
  {
    q: 'Wie melde ich mich an?',
    a: 'CraftOS ist die mobile Ergänzung zur CraftOS-Software für Handwerksbetriebe. Du meldest dich mit den Zugangsdaten deines Betriebs-Kontos an. Bei Fragen zum Zugang wende dich an deinen Betrieb oder an den Support.',
  },
  {
    q: 'Ich kann mich nicht einloggen.',
    a: 'Prüfe Internetverbindung und E-Mail/Passwort. Bei anhaltenden Problemen schreibe an support@craftos.eu.',
  },
  {
    q: 'Funktioniert die App offline?',
    a: 'Ja. Eingaben werden lokal gespeichert und automatisch synchronisiert, sobald wieder eine Verbindung besteht.',
  },
]

export default function SupportPage() {
  return (
    <LegalShell title="Support & Hilfe" eyebrow="Support">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
        Zurück zur Startseite
      </Link>

      <p>
        Hier findest du Hilfe und Kontakt zur CraftOS App – der Companion-App für Handwerk und
        Bau.
      </p>

      <LegalSection heading="Kontakt">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <Mail className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>
              E-Mail:{' '}
              <a
                href="mailto:support@craftos.eu"
                className="font-semibold text-primary-600 hover:underline"
              >
                support@craftos.eu
              </a>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>
              Telefon:{' '}
              <a href="tel:+4915155631914" className="font-semibold text-primary-600 hover:underline">
                +49 151 55631914
              </a>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Clock className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>Antwortzeit: in der Regel innerhalb von 1–2 Werktagen</span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Häufige Fragen">
        <div className="space-y-6">
          {faq.map((item) => (
            <div key={item.q}>
              <h3 className="font-display text-lg font-bold text-ink-900">{item.q}</h3>
              <p className="mt-2 text-ink-700">{item.a}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection heading="Rechtliches">
        <ul className="space-y-2">
          <li>
            <Link href="/datenschutz" className="font-semibold text-primary-600 hover:underline">
              Datenschutzerklärung
            </Link>
          </li>
          <li>
            <Link href="/impressum" className="font-semibold text-primary-600 hover:underline">
              Impressum
            </Link>
          </li>
        </ul>
      </LegalSection>
    </LegalShell>
  )
}
