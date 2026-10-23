import {
  CalculatorHelp,
  CalculatorPage,
} from "@/components/calculators/CalculatorPage";
import { HourlyRateCalculator } from "@/components/calculators/HourlyRateCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/v2/FaqList";
import { site } from "@/lib/site";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import styles from "@/components/calculators/Calculators.module.css";

// Title, Description, Canonical, Open Graph und Twitter aus der Keyword-Map (08-04, D-06); H1 aus zielwerte (D-17).
const z = zielwerte("/rechner/stundensatz");
const description = z.description;
const url = `${site.url}/rechner/stundensatz`;

export const metadata = metaFor("/rechner/stundensatz");

export default function HourlyRatePage() {
  return (
    <CalculatorPage
      current="stundensatz"
      title={z.h1}
      werkzeug={
        <>
          <noscript>
            <p className={styles.noScript}>
              Aktivieren Sie JavaScript, um mit Ihren eigenen Werten zu rechnen; die
              Formel und das Beispiel finden Sie weiter unten.
            </p>
          </noscript>
          <HourlyRateCalculator />
        </>
      }
      intro="Berechnen Sie Ihren Stundensatz aus den Kosten Ihres Betriebs, Ihren verrechenbaren Stunden und der Gewinnmarge, die Sie erreichen möchten."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "CraftOS Stundensatzkalkulator",
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
      <CalculatorHelp
        id="berechnung"
        surface="warm"
        title="Wie wird der Stundensatz berechnet?"
      >
        <p>
          Ihr kostendeckender Stundensatz ergibt sich aus den jährlichen
          Personal-, Unternehmer- und Betriebskosten geteilt durch die
          verrechenbaren Jahresstunden. Für eine Zielmarge teilen Sie diesen
          Kostensatz durch 1 minus die Marge.
        </p>
        <div className={styles.formulaBox}>
          <p>
            <strong>Kostensatz</strong> = Jahreskosten ÷ verrechenbare
            Jahresstunden
          </p>
          <p>
            <strong>Stundenpreis netto</strong> = Kostensatz ÷ (1 − Marge ÷ 100)
          </p>
        </div>
        <p>
          Ein Beispiel: 144.000 € Jahreskosten und 2.400 verrechenbare Stunden
          ergeben 60,00 € Kosten je Stunde. Bei 20 % Gewinnmarge liegt der
          Stundenpreis bei 75,00 € netto. Die übrigen 15,00 € sind der
          kalkulierte Gewinn je Stunde.
        </p>
        <p className={styles.sourceNote}>
          Die Verteilung der Jahreskosten auf verrechenbare Stunden folgt dem
          Grundprinzip der{" "}
          <a href="https://www.hwk-cottbus.de/downloads/kalkulation-svs-7,1375.pdf">
            Stundensatzkalkulation der Handwerkskammer Cottbus
          </a>
          . Verwendet werden Ihre Eingaben, keine pauschalen Sozialabgabensätze
          aus dem älteren Rechenbeispiel der Kammer.
        </p>
      </CalculatorHelp>
      <CalculatorHelp
        id="kosten-und-stunden"
        surface="white"
        title="Welche Kosten und Stunden gehören hinein?"
        notiz
      >
        <FaqList
          items={[
            {
              q: "Warum darf ich meinen Lohn nicht doppelt eintragen?",
              a: "Die Personalkosten umfassen bereits sämtliche dort eingerechneten Gehälter und Arbeitgeberkosten. Ist Ihre eigene Vergütung darin enthalten, beträgt der zusätzliche Unternehmerlohn 0 €. Im Stundenpreis wird kein weiterer Stundenlohn auf diese Jahreskosten addiert.",
            },
            {
              q: "Was sind verrechenbare Stunden?",
              a: "Das sind die Stunden, die Ihr Betrieb Kunden tatsächlich berechnen kann. Nicht berechenbare Bürozeit, Urlaub und Krankheit gehören nicht dazu. Erfassen Sie die gesamte Kapazität Ihres Betriebs, einschließlich Ihrer eigenen verrechenbaren Arbeitszeit.",
            },
            {
              q: "Gehört das Material in meinen Stundensatz?",
              a: "Auftragsmaterial, das Sie separat kalkulieren, bleibt hier außen vor. Sonst würden Sie es im Stundensatz und im Angebot doppelt berücksichtigen. Dasselbe gilt für Kosten, die Sie bereits in einem gesonderten Maschinen- oder Leistungspreis decken.",
            },
            {
              q: "Ist die Gewinnmarge dasselbe wie ein Aufschlag?",
              a: "Die Marge bezieht sich auf den Nettoverkaufspreis, der Aufschlag auf die Kosten. Bei 60 € Kosten und 75 € Verkaufspreis sind 15 € Gewinn eine Marge von 20 %, aber ein Kostenaufschlag von 25 %.",
            },
          ]}
        />
      </CalculatorHelp>
    </CalculatorPage>
  );
}
