import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Calculator } from "lucide-react";
import {
  CalculatorCta,
  CalculatorHelp,
  CalculatorPage,
} from "@/components/calculators/CalculatorPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import styles from "@/components/calculators/Calculators.module.css";

const title = "Kostenlose Rechner fürs Handwerk";
const description =
  "Stundensatz und Angebotspreis berechnen: Kosten, Gewinnmarge und Aufschlag nachvollziehbar kalkulieren. Kostenlos, ohne Anmeldung und ohne Speicherung.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/rechner` },
  openGraph: {
    title: `${title} | CraftOS`,
    description,
    url: `${site.url}/rechner`,
    type: "website",
    siteName: "CraftOS",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | CraftOS`,
    description,
  },
};

export default function CalculatorsPage() {
  return (
    <CalculatorPage
      title="Gute Angebote beginnen mit Ihren Zahlen."
      intro="Was muss Ihre Arbeitsstunde kosten? Was bleibt von einem Auftrag übrig? Rechnen Sie beides mit Ihren eigenen Werten durch."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: `${site.url}/rechner`,
          inLanguage: "de-DE",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Stundensatzkalkulator",
                url: `${site.url}/rechner/stundensatz`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Angebots- und Margenrechner",
                url: `${site.url}/rechner/angebotskalkulation`,
              },
            ],
          },
        }}
      />
      <div className={styles.toolGrid}>
        <article className={styles.toolCard}>
          <div className={styles.toolIcon}>
            <Clock3 size={28} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <h2>Stundensatzkalkulator</h2>
          <p>
            Verteilen Sie Ihre jährlichen Kosten auf die Stunden, die Sie
            tatsächlich berechnen können. Ergänzen Sie Ihre gewünschte
            Gewinnmarge.
          </p>
          <ul>
            <li>Kostendeckender Stundensatz</li>
            <li>Stundensatz bei Ihrer Zielmarge</li>
            <li>Rechenweg mit Ihren Zahlen</li>
          </ul>
          <Link href="/rechner/stundensatz" className={styles.primaryLink}>
            Stundensatz berechnen
          </Link>
        </article>
        <article className={styles.toolCard}>
          <div className={styles.toolIcon}>
            <Calculator size={28} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <h2>Angebots- und Margenrechner</h2>
          <p>
            Kalkulieren Sie Material, Arbeitszeit und zusätzliche Kosten.
            Ermitteln Sie einen Angebotspreis oder prüfen Sie die Marge eines
            bestehenden Preises.
          </p>
          <ul>
            <li>Angebotspreis aus Ihren Kosten</li>
            <li>Gewinn oder Verlust je Auftrag</li>
            <li>Marge und Kostenaufschlag im Vergleich</li>
          </ul>
          <Link
            href="/rechner/angebotskalkulation"
            className={styles.primaryLink}
          >
            Angebot kalkulieren
          </Link>
        </article>
      </div>
      <CalculatorHelp title="Welcher Rechner ist der richtige Einstieg?">
        <p>
          Beginnen Sie beim Stundensatz, wenn Sie Ihre internen Kosten je Stunde
          noch nicht kennen. Verwenden Sie diese Kosten anschließend im
          Angebotsrechner für einen konkreten Auftrag.
        </p>
        <p>
          Beide Rechner arbeiten netto. Sie können die Umsatzsteuer zusätzlich
          anzeigen lassen und den verwendeten Satz selbst eintragen.
          Beispielwerte helfen beim Einstieg und lassen sich vollständig
          ersetzen.
        </p>
      </CalculatorHelp>
      <CalculatorCta />
    </CalculatorPage>
  );
}
