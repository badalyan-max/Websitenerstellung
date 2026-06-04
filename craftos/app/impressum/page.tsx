import type { Metadata } from 'next'
import { LegalShell, LegalSection, DataBlock } from '@/components/legal/Legal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von CraftOS gemäß § 5 TMG.',
  alternates: { canonical: `${site.url}/impressum` },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <p className="text-ink-500">Angaben gemäß § 5 TMG</p>

      <LegalSection heading="Anbieter">
        <DataBlock
          lines={['Edgar Badalyan', 'Paul-Keller-Ring 41', '96052 Bamberg', 'Deutschland']}
        />
        <p className="text-sm text-ink-500">Einzelunternehmer · CraftOS</p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <DataBlock
          lines={[
            'Telefon: +49 151 55631914',
            `E-Mail: ${site.email}`,
            `Website: ${site.url}`,
          ]}
        />
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <DataBlock lines={['Edgar Badalyan', 'Paul-Keller-Ring 41', '96052 Bamberg']} />
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </LegalSection>

      <LegalSection heading="Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-600 hover:underline"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
