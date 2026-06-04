import type { Metadata } from 'next'
import { LegalShell, LegalSection, DataBlock } from '@/components/legal/Legal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zur Verarbeitung personenbezogener Daten bei CraftOS gemäß DSGVO.',
  alternates: { canonical: `${site.url}/datenschutz` },
}

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung">
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten Ihre Daten
        ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG). In dieser
        Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der
        Datenverarbeitung im Rahmen unserer Website und unserer Software.
      </p>

      <LegalSection heading="Verantwortlicher">
        <DataBlock
          lines={['[Firmenname]', '[Straße und Hausnummer]', '[PLZ] [Ort]', `E-Mail: ${site.email}`]}
        />
      </LegalSection>

      <LegalSection heading="Hosting & Server-Standort">
        <p>
          Unsere Website und Anwendung werden bei Dienstleistern innerhalb der Europäischen Union
          gehostet. Personenbezogene Daten werden auf Servern in der EU gespeichert. Mit den
          eingesetzten Auftragsverarbeitern bestehen Verträge zur Auftragsverarbeitung (AVV)
          gemäß Art. 28 DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="Server-Logfiles">
        <p>
          Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser
          übermittelt (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp). Die
          Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f
          DSGVO) am sicheren und stabilen Betrieb der Website.
        </p>
      </LegalSection>

      <LegalSection heading="Kontaktaufnahme">
        <p>
          Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage
          gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="Nutzung der Software (CraftOS)">
        <p>
          Im Rahmen der Nutzung von CraftOS verarbeiten wir die von Ihnen eingegebenen Daten
          (z. B. Projekte, Kunden, Dokumente, Zeiten) als Auftragsverarbeiter im Auftrag des
          jeweiligen Betriebs. Details regelt der Auftragsverarbeitungsvertrag (AVV), den wir auf
          Anfrage bereitstellen.
        </p>
      </LegalSection>

      <LegalSection heading="Webanalyse">
        <p>
          Zur Verbesserung unseres Angebots setzen wir datenschutzfreundliche Reichweitenmessung
          ein. Sofern hierfür eine Einwilligung erforderlich ist, holen wir diese gemäß Art. 6
          Abs. 1 lit. a DSGVO ein.
        </p>
      </LegalSection>

      <LegalSection heading="Ihre Rechte">
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch. Zudem steht Ihnen ein
          Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Wenden Sie sich hierzu an{' '}
          <a href={`mailto:${site.email}`} className="font-semibold text-primary-600 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </LegalSection>

      <p className="text-sm text-ink-400">
        Hinweis: Diese Datenschutzerklärung ist eine Vorlage und vor der Veröffentlichung mit den
        konkreten Verarbeitungstätigkeiten und ggf. rechtlicher Beratung zu vervollständigen.
      </p>
    </LegalShell>
  )
}
