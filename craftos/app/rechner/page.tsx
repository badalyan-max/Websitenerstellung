import Link from "next/link";
import { Clock3, Calculator } from "lucide-react";
import {
  CalculatorNotiz,
  CalculatorPage,
} from "@/components/calculators/CalculatorPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Abschnitt } from "@/components/v2/Abschnitt";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { site } from "@/lib/site";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import styles from "@/components/calculators/Calculators.module.css";

// Title, Description, Canonical, Open Graph und Twitter aus der Keyword-Map (08-04, D-06); H1 aus zielwerte (D-17).
const z = zielwerte("/rechner");
const title = z.titleOhneMarke;
const description = z.description;

export const metadata = metaFor("/rechner");

/**
 * /rechner auf v2 (Phase 10, D-15; 10-UI-SPEC § 1.2, J7): Kopf Warm → Einstieg Weiß (Werkzeugkarten Warm) → CTA dunkel.
 * Die Einstiegsfrage steht vor den Karten, der erste Bestandsabsatz ist ihre Antwort, die Karten tragen H3
 * (mechanische Tag-Korrektur), der zweite Bestandsabsatz und die Notiz folgen darunter. Keine neuen Texte.
 */
export default function CalculatorsPage() {
  return (
    <CalculatorPage
      title={z.h1}
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
      <Abschnitt id="einstieg" surface="white">
        <SectionHeader
          id="einstieg"
          title="Welcher Rechner ist der richtige Einstieg?"
          lead="Beginnen Sie beim Stundensatz, wenn Sie Ihre internen Kosten je Stunde noch nicht kennen. Verwenden Sie diese Kosten anschließend im Angebotsrechner für einen konkreten Auftrag."
        />
        <div className={styles.toolGrid}>
          <article className={styles.toolCard}>
            <div className={styles.toolIcon}>
              <Clock3 size={24} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3>Stundensatzkalkulator</h3>
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
            <Link href="/rechner/stundensatz" className={styles.toolLink}>
              Stundensatz berechnen
            </Link>
          </article>
          <article className={styles.toolCard}>
            <div className={styles.toolIcon}>
              <Calculator size={24} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3>Angebots- und Margenrechner</h3>
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
              className={styles.toolLink}
            >
              Angebot kalkulieren
            </Link>
          </article>
        </div>
        <p className={styles.einstiegNotiz}>
          Beide Rechner arbeiten netto. Sie können die Umsatzsteuer zusätzlich
          anzeigen lassen und den verwendeten Satz selbst eintragen.
          Beispielwerte helfen beim Einstieg und lassen sich vollständig
          ersetzen.
        </p>
        <CalculatorNotiz />
      </Abschnitt>
    </CalculatorPage>
  );
}
