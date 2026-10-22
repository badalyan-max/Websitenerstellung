import {
  CalculatorCta,
  CalculatorHelp,
  CalculatorPage,
} from "@/components/calculators/CalculatorPage";
import { OfferCalculator } from "@/components/calculators/OfferCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import styles from "@/components/calculators/Calculators.module.css";

// Title, Description, Canonical, Open Graph und Twitter aus der Keyword-Map (08-04, D-06); H1 aus zielwerte (D-17).
const z = zielwerte("/rechner/angebotskalkulation");
const description = z.description;
const url = `${site.url}/rechner/angebotskalkulation`;

export const metadata = metaFor("/rechner/angebotskalkulation");

export default function OfferCalculatorPage() {
  return (
    <CalculatorPage
      current="angebotskalkulation"
      title={z.h1}
      intro="Kalkulieren Sie einen Auftrag aus Material, Arbeitszeit und zusätzlichen Kosten. Oder prüfen Sie, welche Gewinnmarge Ihr vorhandener Preis ergibt."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "CraftOS Angebots- und Margenrechner",
              description,
              url,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              inLanguage: "de-DE",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            },
          ],
        }}
      />
      <noscript>
        <p className={styles.noScript}>
          Aktivieren Sie JavaScript, um mit Ihren eigenen Werten zu rechnen; die
          Formel und das Beispiel finden Sie weiter unten.
        </p>
      </noscript>
      <OfferCalculator />
      <CalculatorHelp title="Wie kalkuliere ich einen Angebotspreis?">
        <p>
          Addieren Sie Material, Arbeitsstunden mal internem Kostensatz und
          zusätzliche Auftragskosten. Teilen Sie diese Gesamtkosten durch 1
          minus Ihre Zielmarge. Das Ergebnis ist der Nettoangebotspreis für die
          von Ihnen erfassten Kosten.
        </p>
        <div className={styles.formulaBox}>
          <p>
            <strong>Auftragskosten</strong> = Material + Stunden × Kostensatz +
            Zusatzkosten
          </p>
          <p>
            <strong>Angebotspreis netto</strong> = Auftragskosten ÷ (1 − Marge ÷
            100)
          </p>
        </div>
        <p>
          Ein Beispiel: 500 € Material, 10 Stunden zu 60 € Kosten je Stunde und
          100 € Zusatzkosten ergeben 1.200 € Auftragskosten. Für eine Marge von
          20 % benötigen Sie einen Nettoangebotspreis von 1.500 €. Ihr
          kalkulierter Gewinn beträgt 300 €.
        </p>
      </CalculatorHelp>
      <CalculatorHelp title="Was unterscheidet Marge und Kostenaufschlag?">
        <p>
          Die Gewinnmarge setzt den Gewinn ins Verhältnis zum
          Nettoverkaufspreis. Der Kostenaufschlag setzt denselben Gewinn ins
          Verhältnis zu den Kosten. Deshalb entsprechen 20 % Marge einem
          Aufschlag von 25 %.
        </p>
        <div className={styles.comparison}>
          <div>
            <h3>Gewinnmarge</h3>
            <p>300 € Gewinn ÷ 1.500 € Preis</p>
            <strong>20 %</strong>
          </div>
          <div>
            <h3>Kostenaufschlag</h3>
            <p>300 € Gewinn ÷ 1.200 € Kosten</p>
            <strong>25 %</strong>
          </div>
        </div>
        <p className={styles.sourceNote}>
          Die{" "}
          <a href="https://www.ihk.de/darmstadt/produktmarken/beraten-und-informieren/festigung-wachstum/kaufmaennisches/kalkulation-3795552">
            Preiskalkulation der IHK Darmstadt
          </a>{" "}
          zeigt das Grundprinzip mit 100 € Selbstkosten plus 25 %
          Gewinnaufschlag und 125 € Verkaufspreis. Rechnerisch sind das 20 %
          Marge.
        </p>
      </CalculatorHelp>
      <CalculatorHelp title="Was muss ich bei meinen Eingaben beachten?">
        <div className={styles.faqList}>
          <details>
            <summary>Welchen Stundensatz trage ich ein?</summary>
            <p>
              Verwenden Sie Ihren internen Kostensatz einschließlich Personal-
              und anteiliger Betriebskosten, ohne Gewinn. Ein Verkaufssatz
              enthält bereits Gewinn; würden Sie ihn hier als Kosten einsetzen,
              wäre dieser Anteil doppelt kalkuliert.
            </p>
          </details>
          <details>
            <summary>
              Was passiert bei einem zu niedrigen Angebotspreis?
            </summary>
            <p>
              Im Modus „Vorhandenen Preis prüfen“ bleibt ein Verlust sichtbar.
              Bei 1.200 € erfassten Kosten und 1.000 € Nettoangebotspreis fehlen
              200 €; die Marge beträgt −20 %.
            </p>
          </details>
          <details>
            <summary>
              Wie werden Nachlässe und Umsatzsteuer berücksichtigt?
            </summary>
            <p>
              Tragen Sie bei einer Preisprüfung den Nettoangebotspreis nach
              vereinbarten Nachlässen ein. Die optionale Umsatzsteuer wird
              anschließend zum Nettopreis addiert und verändert die Gewinnmarge
              nicht. Der Umsatzsteuersatz wird nicht automatisch bestimmt.
            </p>
          </details>
          <details>
            <summary>Werden meine Zahlen gespeichert?</summary>
            <p>
              Die Berechnung läuft in Ihrem Browser. Ihre Eingaben werden nicht
              gespeichert oder an einen Berechnungsdienst gesendet. Ein bewusst
              aus dem Stundensatzrechner übernommener Kostensatz wird nur für
              die geöffnete Berechnung verwendet.
            </p>
          </details>
        </div>
      </CalculatorHelp>
      <CalculatorCta />
    </CalculatorPage>
  );
}
