import { LegalShell, LegalSection, DataBlock } from '@/components/legal/Legal'
import { crumbsFor } from '@/lib/breadcrumbs'
import { site } from '@/lib/site'
import { metaFor, zielwerte } from '@/lib/seo-meta'

// Metadaten und H1 aus der Keyword-Map (08-04, D-20). Rechtstext am 23.10.2026 auf Inhaberanweisung
// überarbeitet (Hosting bei Vercel mit DPF, Datenstandort der Software, Webanalyse und Speed Insights).
export const metadata = metaFor('/datenschutz')

export default function DatenschutzPage() {
  return (
    <LegalShell title={zielwerte('/datenschutz').h1} crumbs={crumbsFor('/datenschutz')}>
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten Ihre Daten
        ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG). In dieser
        Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der
        Datenverarbeitung im Rahmen unserer Website und unserer Software.
      </p>

      <LegalSection heading="Verantwortlicher">
        <DataBlock
          lines={[
            'Edgar Badalyan',
            'Paul-Keller-Ring 41',
            '96052 Bamberg',
            `E-Mail: ${site.email}`,
          ]}
        />
      </LegalSection>

      <LegalSection heading="Hosting & Server-Standort">
        <p>
          Diese Website wird von der Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
          USA, gehostet und über deren weltweites Servernetz ausgeliefert. Vercel ist nach dem
          EU-U.S. Data Privacy Framework zertifiziert; auf dieser Grundlage dürfen personenbezogene
          Daten in die USA übermittelt werden (Art. 45 DSGVO). Mit Vercel besteht ein Vertrag zur
          Auftragsverarbeitung gemäß Art. 28 DSGVO.
        </p>
        <p>
          Für die CraftOS-Software gilt: Die Datenbank liegt in Frankfurt am Main, Dateien
          speichern wir in europäischen Rechenzentren.
        </p>
      </LegalSection>

      <LegalSection heading="Server-Logfiles">
        <p>
          Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser
          übermittelt (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp). Diese
          Daten verarbeitet Vercel als Hoster in unserem Auftrag. Die Verarbeitung erfolgt auf
          Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) am sicheren und
          stabilen Betrieb der Website.
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
          jeweiligen Betriebs. Details regelt der Auftragsverarbeitungsvertrag (AVV) mit der Liste
          der Unterauftragnehmer unter{' '}
          <a href={`${site.appUrl}/avv`}>{`${site.appUrl.replace('https://', '')}/avv`}</a>. Für die
          Nutzung der Web-App und der Mobile-App gilt ergänzend die Datenschutzerklärung unter{' '}
          <a href={`${site.appUrl}/datenschutz`}>{`${site.appUrl.replace('https://', '')}/datenschutz`}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Webanalyse und Ladezeitmessung">
        <p>
          Um zu verstehen, wie unsere Website genutzt wird und wie schnell sie lädt, setzen wir
          Vercel Web Analytics und Vercel Speed Insights der Vercel Inc. (Anschrift siehe oben) ein.
        </p>
        <p>
          Beide Dienste setzen keine Cookies. Erfasst werden je Seitenaufruf die aufgerufene Seite
          ohne Suchparameter, die verweisende Website, Gerätetyp, Betriebssystem, Browser und der aus
          der IP-Adresse abgeleitete ungefähre Standort (Land, Region, Stadt). Eine Zuordnung zu
          einzelnen Personen oder IP-Adressen findet nicht statt: Vercel bildet aus der Anfrage einen
          Hashwert, der nach 24 Stunden verworfen wird. Speed Insights misst zusätzlich
          Ladezeit-Kennzahlen der Seite und die Verbindungsart.
        </p>
        <p>
          Außerdem zählen wir ohne weitere Angaben, ob Besucher auf einen Link zum Testen, auf
          „Anmelden“ oder auf einen App-Store-Link klicken, ob ein Rechner oder eine Beispieldemo
          benutzt wird und ob ein Besuch über einen KI-Dienst wie ChatGPT oder Perplexity kam.
          Eingaben in Rechnern werden nicht übertragen.
        </p>
        <p>
          Rechtsgrundlage ist unser berechtigtes Interesse an einer bedarfsgerechten und technisch
          funktionsfähigen Website (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung in die USA stützt
          sich auf das EU-U.S. Data Privacy Framework. Sie können der Verarbeitung jederzeit
          widersprechen; schreiben Sie uns dazu an{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Ihre Rechte">
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch. Zudem steht Ihnen ein
          Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Wenden Sie sich hierzu an{' '}
          <a href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalSection>

      <p>Stand: 23. Oktober 2026</p>
    </LegalShell>
  )
}
