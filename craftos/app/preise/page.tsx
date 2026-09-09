import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { PricingTable } from "@/components/preise/PricingTable";
import { Faq } from "@/components/ui/Faq";
import { TrialCta } from "@/components/ui/TrialCta";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
export const metadata = pageMetadata(
  "Preise: Voll-Lizenz inklusive Mobile-App",
  "CraftOS Voll-Lizenz 29,95 € netto/Monat inklusive Web-App und Handy-App. App-Lizenz 9,95 €. Jahresabo rund 17 % günstiger. 10 Tage testen.",
  "/preise",
);
const faqs = [
  {
    q: "Ist die Handy-App in der Voll-Lizenz dabei?",
    a: "Ja. Eine Voll-Lizenz enthält die Web-App und die Mobile-App für dieselbe Person. Sie brauchen dafür keine zusätzliche App-Lizenz.",
  },
  {
    q: "Wie berechnet sich der Jahresrabatt?",
    a: "Die Jahreslizenz kostet zehn Monatsraten. Bei der Voll-Lizenz sind das 299,50 € statt 359,40 € für zwölf einzelne Monate: 59,90 € Ersparnis oder 16,67 %, gerundet rund 17 %. Alle Beträge netto.",
  },
  {
    q: "Welche Funktionen kosten zusätzlich?",
    a: "Die freigegebenen Kernmodule wie Plantafel, Angebote, Rechnungen, Projekte und Lager gehören zur Voll-Lizenz. KI-Abfragen und KI-Belegscans verbrauchen Credits. Erweiterter Speicher kann zusätzlich kosten. Der konkrete Zugriff richtet sich nach Rolle und Berechtigungen.",
  },
  {
    q: "Welche Lizenz braucht mein Betrieb mindestens?",
    a: "Mindestens eine Voll-Lizenz für die Administration. Weitere Personen im Büro erhalten eigene Voll-Lizenzen; für Mitarbeitende auf der Baustelle können Sie App-Lizenzen ergänzen. Eine Lizenz ist personenbezogen.",
  },
  {
    q: "Ist das ein einmaliger Kauf?",
    a: "CraftOS wird als monatliches oder jährliches Abonnement angeboten. Beim Jahresabo zahlen Sie für ein Jahr im Voraus. Es handelt sich nicht um eine einmalige Dauerlizenz.",
  },
  {
    q: "Was passiert nach den 10 Testtagen?",
    a: "Sie testen ohne Zahlungsdaten und wählen ein kostenpflichtiges Abonnement aktiv in der App. Die verbindlichen Zahlungs- und Verlängerungsbedingungen sehen Sie vor dem Abschluss im Checkout.",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Preise"
        title={
          <>
            Ihr Betrieb wächst.
            <br />
            Ihre Software wächst mit.
          </>
        }
        intro="Ein klarer Preis pro Person. Alle Kernmodule, die Web-App und die Handy-App sind in der Volllizenz enthalten."
      />
      <section className="section-space">
        <div className="site-container">
          <PricingTable />
          <div className="soft-panel mt-10">
            <h2 className="text-2xl font-semibold">
              Ein Beispiel für einen Betrieb mit fünf Personen.
            </h2>
            <p className="mt-4">
              Eine Voll-Lizenz für den Inhaber und vier App-Lizenzen fürs Team:{" "}
              <strong>69,75 € netto im Monat</strong> oder{" "}
              <strong>697,50 € netto im Jahr (rund 17 % günstiger)</strong>. Die
              Handy-App des Inhabers ist bereits enthalten.
            </p>
            <p className="text-sm text-ink-600 mt-3">
              Bei jährlicher Abrechnung entspricht das 58,13 € netto pro Monat;
              Zahlung für das ganze Jahr. Zusätzlicher KI-Verbrauch und Speicher
              sind nicht im Beispiel enthalten.
            </p>
          </div>
          <Link className="text-link mt-8" href="/vergleich">
            Leistungsumfang und Anbieter sachlich vergleichen
          </Link>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container max-w-4xl">
          <h2 className="section-title mb-10">Preise ohne offene Fragen.</h2>
          <Faq items={faqs} />
        </div>
      </section>
      <JsonLd data={faqSchema(faqs)} />
      <TrialCta />
    </>
  );
}
