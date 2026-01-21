import { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | ShinyTouch Gebäudereinigung',
  description: 'Datenschutzerklärung der ShinyTouch Gebäudereinigung - Informationen zum Umgang mit Ihren personenbezogenen Daten.',
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
            Letzte Aktualisierung: Januar 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-secondary max-w-none">

            {/* 1. Datenschutz auf einen Blick */}
            <div className="bg-secondary-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4 mt-0">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="text-secondary-700 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
                Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-secondary-700 mb-2">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              </p>
              <p className="text-secondary-700 mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <p className="text-secondary-700 mb-2">
                <strong>Wie erfassen wir Ihre Daten?</strong>
              </p>
              <p className="text-secondary-700 mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch
                oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>

              <p className="text-secondary-700 mb-2">
                <strong>Wofür nutzen wir Ihre Daten?</strong>
              </p>
              <p className="text-secondary-700 mb-4">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="text-secondary-700 mb-2">
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
              </p>
              <p className="text-secondary-700">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </div>

            {/* 2. Hosting */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Externes Hosting</h3>
              <p className="text-secondary-700 mb-4">
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten,
                die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
                es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
                Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="text-secondary-700 mb-4">
                Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter
                (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p className="text-secondary-700 mb-4">
                Wir setzen folgenden Hoster ein:<br />
                <strong>GoDaddy</strong><br />
                2155 E GoDaddy Way, Tempe, AZ 85284 USA
              </p>
              <p className="text-secondary-700">
                Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über
                Auftragsverarbeitung mit unserem Hoster geschlossen.
              </p>
            </div>

            {/* 3. Allgemeine Hinweise */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Datenschutz</h3>
              <p className="text-secondary-700 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
                sowie dieser Datenschutzerklärung.
              </p>
              <p className="text-secondary-700 mb-4">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
                Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
                Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p className="text-secondary-700 mb-4">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                nicht möglich.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <address className="not-italic text-secondary-700 mb-4">
                <strong>{COMPANY_DATA.name}</strong><br />
                Edgar Badalyan<br />
                {COMPANY_DATA.address.street}<br />
                {COMPANY_DATA.address.zip} {COMPANY_DATA.address.city}<br /><br />
                Telefon: {COMPANY_DATA.contact.phoneDisplay}<br />
                E-Mail: {COMPANY_DATA.contact.email}
              </address>
              <p className="text-secondary-700 mb-4">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
                anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
                (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Speicherdauer</h3>
              <p className="text-secondary-700 mb-4">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung
                widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
                die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche
                Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Hinweis zur Datenweitergabe in die USA</h3>
              <p className="text-secondary-700 mb-4">
                Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA eingebunden.
                Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten an die US-Server der jeweiligen
                Unternehmen weitergegeben werden. Wir weisen darauf hin, dass die USA kein sicherer Drittstaat
                im Sinne des EU-Datenschutzrechts sind. US-Unternehmen sind dazu verpflichtet, personenbezogene
                Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich
                vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z.B. Geheimdienste)
                Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft
                speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-secondary-700 mb-4">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
                erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Widerspruchsrecht gegen die Datenerhebung (Art. 21 DSGVO)</h3>
              <p className="text-secondary-700 mb-4">
                Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie
                jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die
                Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf
                diese Bestimmungen gestütztes Profiling. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
                personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige
                Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen
                oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              </p>
              <p className="text-secondary-700 mb-4">
                Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das
                Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum
                Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
                Direktwerbung in Verbindung steht.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p className="text-secondary-700 mb-4">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
                unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Recht auf Datenübertragbarkeit</h3>
              <p className="text-secondary-700 mb-4">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
                an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
              <p className="text-secondary-700 mb-4">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
                wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine
                SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in
                Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
                die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Auskunft, Löschung und Berichtigung</h3>
              <p className="text-secondary-700 mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
                Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
                Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Recht auf Einschränkung der Verarbeitung</h3>
              <p className="text-secondary-700 mb-4">
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 mb-4">
                <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                    benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie
                    das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
                    statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
                <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                    Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt
                    der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung
                    zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen
                    Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.</li>
              </ul>
            </div>

            {/* 4. Datenerfassung */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Cookies</h3>
              <p className="text-secondary-700 mb-4">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten
                auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies
                werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
                gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>
              <p className="text-secondary-700 mb-4">
                Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte
                Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die
                Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
              </p>
              <p className="text-secondary-700 mb-4">
                Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder
                zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies) erforderlich
                sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere
                Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der
                Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.
              </p>
              <p className="text-secondary-700 mb-4">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Kontaktformular</h3>
              <p className="text-secondary-700 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
                ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-secondary-700 mb-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
                Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
                Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
                berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
                (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern
                diese abgefragt wurde.
              </p>
              <p className="text-secondary-700 mb-4">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
                entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche
                Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p className="text-secondary-700 mb-4">
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller
                daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
                Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-secondary-700 mb-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
                Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
                Maßnahmen erforderlich ist. Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben
                bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
                der Zweck für die Datenspeicherung entfällt.
              </p>
            </div>

            {/* 5. Soziale Medien */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">5. Soziale Medien</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Social-Media-Plugins mit Shariff</h3>
              <p className="text-secondary-700 mb-4">
                Auf dieser Website werden Plugins von sozialen Medien verwendet (z. B. Facebook, Twitter, Instagram).
                Um den Datenschutz auf dieser Website zu gewährleisten, verwenden wir diese Plugins nur zusammen
                mit der sogenannten „Shariff"-Lösung. Diese Anwendung verhindert, dass die auf dieser Website
                integrierten Plugins Daten schon beim ersten Betreten der Seite an den jeweiligen Anbieter übertragen.
              </p>
              <p className="text-secondary-700 mb-4">
                Erst wenn Sie das jeweilige Plugin durch Anklicken der zugehörigen Schaltfläche aktivieren, wird
                eine direkte Verbindung zum Server des Anbieters hergestellt (Einwilligung). Das Aktivieren des
                Plugins stellt eine Einwilligung im Sinne des Art. 6 Abs. 1 lit. a DSGVO dar. Diese Einwilligung
                können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Facebook Plugins</h3>
              <p className="text-secondary-700 mb-4">
                Auf dieser Website sind Plugins des sozialen Netzwerks Facebook integriert. Anbieter dieses
                Dienstes ist die Facebook Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland. Die erfassten
                Daten werden nach Aussage von Facebook jedoch auch in die USA und in andere Drittländer übertragen.
              </p>
              <p className="text-secondary-700 mb-4">
                Die Verwendung der Facebook Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit
                in den Sozialen Medien. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung
                von Facebook unter:{' '}
                <a href="https://de-de.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://de-de.facebook.com/privacy/explanation
                </a>
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Instagram Plugin</h3>
              <p className="text-secondary-700 mb-4">
                Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden
                angeboten durch die Facebook Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
              </p>
              <p className="text-secondary-700 mb-4">
                Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des
                Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann
                Instagram den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Weitere Informationen hierzu
                finden Sie in der Datenschutzerklärung von Instagram:{' '}
                <a href="https://instagram.com/about/legal/privacy/" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://instagram.com/about/legal/privacy/
                </a>
              </p>
            </div>

            {/* 6. Analyse-Tools */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">6. Analyse-Tools und Werbung</h2>
              <p className="text-secondary-700">
                Diese Website nutzt „Framer Analytics", um Besucherzugriffe statistisch auszuwerten.
              </p>
            </div>

            {/* 7. Newsletter */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">7. Newsletter</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Newsletterdaten</h3>
              <p className="text-secondary-700 mb-4">
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine
                E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der
                angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere
                Daten werden nicht bzw. nur auf freiwilliger Basis erhoben.
              </p>
              <p className="text-secondary-700 mb-4">
                Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf
                Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung
                der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit
                widerrufen, etwa über den „Austragen"-Link im Newsletter.
              </p>
              <p className="text-secondary-700">
                Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu
                Ihrer Austragung aus dem Newsletter gespeichert und nach der Abbestellung des Newsletters gelöscht.
              </p>
            </div>

            {/* 8. Plugins und Tools */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">8. Plugins und Tools</h2>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">YouTube mit erweitertem Datenschutz</h3>
              <p className="text-secondary-700 mb-4">
                Diese Website bindet Videos der YouTube ein. Betreiber der Seiten ist die Google Ireland Limited
                („Google"), Gordon House, Barrow Street, Dublin 4, Irland. Wir nutzen YouTube im erweiterten
                Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die
                Besucher auf dieser Website speichert, bevor diese sich das Video ansehen.
              </p>
              <p className="text-secondary-700 mb-4">
                Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter:{' '}
                <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://policies.google.com/privacy?hl=de
                </a>
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Vimeo ohne Tracking</h3>
              <p className="text-secondary-700 mb-4">
                Diese Website nutzt Plugins des Videoportals Vimeo. Anbieter ist die Vimeo Inc., 555 West 18th Street,
                New York, New York 10011, USA. Wir haben Vimeo so eingestellt, dass Vimeo Ihre Nutzeraktivitäten
                nicht nachverfolgen und keine Cookies setzen wird.
              </p>
              <p className="text-secondary-700 mb-4">
                Weitere Informationen finden Sie in der Datenschutzerklärung von Vimeo unter:{' '}
                <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://vimeo.com/privacy
                </a>
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Google Web Fonts (lokales Hosting)</h3>
              <p className="text-secondary-700 mb-4">
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von
                Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern
                von Google findet dabei nicht statt.
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Google Maps</h3>
              <p className="text-secondary-700 mb-4">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google"),
                Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es
                notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server
                von Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="text-secondary-700 mb-4">
                Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer
                Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte.
                Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p className="text-secondary-700 mb-4">
                Mehr Informationen finden Sie in der Datenschutzerklärung von Google:{' '}
                <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://policies.google.com/privacy?hl=de
                </a>
              </p>

              <h3 className="text-lg font-semibold text-secondary-900 mt-4 mb-2">Google reCAPTCHA</h3>
              <p className="text-secondary-700 mb-4">
                Wir nutzen „Google reCAPTCHA" auf dieser Website. Anbieter ist die Google Ireland Limited
                („Google"), Gordon House, Barrow Street, Dublin 4, Irland. Mit reCAPTCHA soll überprüft werden,
                ob die Dateneingabe auf dieser Website (z. B. in einem Kontaktformular) durch einen Menschen oder
                durch ein automatisiertes Programm erfolgt.
              </p>
              <p className="text-secondary-700 mb-4">
                Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale.
                Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website betritt. Zur Analyse
                wertet reCAPTCHA verschiedene Informationen aus (z. B. IP-Adresse, Verweildauer des
                Websitebesuchers auf der Website oder vom Nutzer getätigte Mausbewegungen).
              </p>
              <p className="text-secondary-700 mb-4">
                Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor missbräuchlicher
                automatisierter Ausspähung und vor SPAM zu schützen.
              </p>
              <p className="text-secondary-700">
                Weitere Informationen zu Google reCAPTCHA entnehmen Sie den Google-Datenschutzbestimmungen und
                den Google Nutzungsbedingungen unter:{' '}
                <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://policies.google.com/privacy?hl=de
                </a>{' '}und{' '}
                <a href="https://policies.google.com/terms?hl=de" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  https://policies.google.com/terms?hl=de
                </a>
              </p>
            </div>

            {/* Quelle */}
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <p className="text-sm text-secondary-500">
                Quelle: eRecht24
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
