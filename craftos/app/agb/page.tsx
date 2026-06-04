import type { Metadata } from 'next'
import { LegalShell, LegalSection } from '@/components/legal/Legal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung der CraftOS Handwerkersoftware.',
  alternates: { canonical: `${site.url}/agb` },
}

export default function AgbPage() {
  return (
    <LegalShell title="Allgemeine Geschäftsbedingungen">
      <LegalSection heading="§ 1 Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Software
          „CraftOS" sowie aller damit verbundenen Leistungen, die [Firmenname] (nachfolgend
          „Anbieter") gegenüber Unternehmern im Sinne des § 14 BGB erbringt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Vertragsgegenstand">
        <p>
          Der Anbieter stellt dem Kunden CraftOS als webbasierte Software (Software-as-a-Service)
          sowie als mobile Anwendung zur Verfügung. Der Funktionsumfang richtet sich nach der
          gewählten Lizenz (App, Büro, Admin) und der jeweils gültigen Leistungsbeschreibung.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Vertragsschluss & Testphase">
        <p>
          Der Vertrag kommt mit der Bestätigung der Registrierung bzw. der Buchung einer Lizenz
          zustande. Eine kostenlose Test- bzw. Demo-Nutzung ist möglich und verpflichtet nicht zum
          Abschluss eines kostenpflichtigen Abonnements.
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Preise & Zahlungsbedingungen">
        <p>
          Es gelten die zum Zeitpunkt der Buchung ausgewiesenen Preise pro Nutzer und Monat bzw.
          Jahr. Die Abrechnung erfolgt wahlweise per SEPA-Lastschrift oder Kreditkarte. Alle Preise
          verstehen sich zzgl. der gesetzlichen Umsatzsteuer.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Laufzeit & Kündigung">
        <p>
          Monatliche Abonnements sind monatlich, jährliche Abonnements zum Ende der jeweiligen
          Laufzeit kündbar. Die Kündigung kann in Textform oder über die Kontoverwaltung erfolgen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 6 Verfügbarkeit">
        <p>
          Der Anbieter bemüht sich um eine hohe Verfügbarkeit des Dienstes. Wartungsarbeiten,
          höhere Gewalt oder vom Anbieter nicht zu vertretende Störungen können die Verfügbarkeit
          vorübergehend einschränken.
        </p>
      </LegalSection>

      <LegalSection heading="§ 7 Pflichten des Kunden">
        <p>
          Der Kunde ist für die Richtigkeit der eingegebenen Daten sowie für die sichere
          Verwahrung seiner Zugangsdaten verantwortlich. Eine missbräuchliche Nutzung ist
          untersagt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 8 Haftung">
        <p>
          Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei der
          Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung auf den
          vertragstypischen, vorhersehbaren Schaden begrenzt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 9 Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser
          AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </LegalSection>

      <p className="text-sm text-ink-400">
        Hinweis: Diese AGB sind eine Vorlage und sollten vor Veröffentlichung rechtlich geprüft und
        an die konkreten Leistungen angepasst werden. Bei Fragen: {site.email}
      </p>
    </LegalShell>
  )
}
