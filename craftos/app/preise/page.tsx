import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { PricingTable } from "@/components/preise/PricingTable";
import { Faq } from "@/components/ui/Faq";
import { TrialCta } from "@/components/ui/TrialCta";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import {
  annualSavingPercent,
  creditPakete,
  extraSpeicher,
  creditUmrechnung,
  site,
  startCredits,
  tarife,
} from "@/lib/site";
const euroFormat = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
const euro = (value: number) => euroFormat.format(value);
const prozent = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(value);
const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const ersparnisRund = Math.round(annualSavingPercent);
// Rechenbeispiel: eine Voll-Lizenz für den Inhaber und vier App-Lizenzen fürs Team
const teamApps = 4;
const beispielMonat = voll.monat + teamApps * app.monat;
const beispielJahr = voll.jahr + teamApps * app.jahr;
const extraSpeicherText = `${extraSpeicher.gb} GB Extra-Speicher kosten ${euro(extraSpeicher.monat)} netto pro Monat oder ${euro(extraSpeicher.jahr)} netto pro Jahr`;
// Title, Description und H1 aus der Keyword-Map (08-04, D-06, D-17); v2-Umbau folgt in einem späteren Phase-8-Plan.
export const metadata = metaFor("/preise");
const faqs = [
  {
    q: "Ist die Handy-App in der Voll-Lizenz dabei?",
    a: "Ja. Eine Voll-Lizenz enthält die Web-App und die Mobile-App für dieselbe Person. Sie brauchen dafür keine zusätzliche App-Lizenz.",
  },
  {
    q: "Wie berechnet sich der Jahresrabatt?",
    a: `Die Jahreslizenz kostet zehn Monatsraten. Bei der ${voll.name} sind das ${euro(voll.jahr)} statt ${euro(voll.monat * 12)} für zwölf einzelne Monate: ${euro(voll.monat * 12 - voll.jahr)} Ersparnis oder ${prozent(annualSavingPercent)} %, gerundet rund ${ersparnisRund} %. Alle Beträge netto.`,
  },
  {
    q: "Welche Funktionen kosten zusätzlich?",
    a: `Die freigegebenen Kernmodule wie Plantafel, Angebote, Rechnungen, Projekte und Lager gehören zur Voll-Lizenz. KI-Abfragen und KI-Belegscans verbrauchen im Voraus gekaufte Credits; zum Start gibt es einmalig ${startCredits} Credits (${creditUmrechnung}). ${extraSpeicherText}. Der konkrete Zugriff richtet sich nach Rolle und Berechtigungen.`,
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
    q: `Was passiert nach den ${site.trialDays} Testtagen?`,
    a: "Sie testen ohne Zahlungsdaten und wählen ein kostenpflichtiges Abonnement aktiv in der App. Die verbindlichen Zahlungs- und Verlängerungsbedingungen sehen Sie vor dem Abschluss im Checkout.",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        crumbs={crumbsFor("/preise")}
        eyebrow="Preise"
        title={zielwerte("/preise").h1}
        intro="Ein klarer Preis pro Person. Alle Kernmodule, die Web-App und die Handy-App sind in der Voll-Lizenz enthalten."
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
              <strong>{euro(beispielMonat)} netto im Monat</strong> oder{" "}
              <strong>
                {euro(beispielJahr)} netto im Jahr (rund {ersparnisRund} %
                günstiger)
              </strong>
              . Die Handy-App des Inhabers ist bereits enthalten.
            </p>
            <p className="text-sm text-ink-600 mt-3">
              Bei jährlicher Abrechnung entspricht das {euro(beispielJahr / 12)}{" "}
              netto pro Monat; Zahlung für das ganze Jahr. KI-Credits und
              Extra-Speicher sind nicht im Beispiel enthalten.
            </p>
          </div>
          <section
            aria-labelledby="ki-credits"
            className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start"
          >
            <div>
              <h2 id="ki-credits" className="text-2xl font-semibold">
                KI-Credits: Startguthaben, danach im Voraus.
              </h2>
              <p className="mt-4">
                Zum Start erhält Ihr Betrieb einmalig {startCredits} Credits für
                Craft AI und KI-Belegscans ({creditUmrechnung}). Danach kaufen Sie Credit-Pakete im
                Voraus in der Web-App. Es gibt kein Monatskontingent und keine
                Nachabrechnung.
              </p>
            </div>
            <div>
              <ul
                aria-label="Credit-Pakete"
                className="grid grid-cols-2 gap-px border-y border-ink-200 bg-ink-200 md:grid-cols-4"
              >
                {creditPakete.map((paket) => (
                  <li
                    key={paket.preis}
                    className="flex flex-col gap-1 bg-white px-4 py-5"
                  >
                    <span className="text-3xl font-semibold tabular-nums">
                      {euro(paket.preis)}
                    </span>
                    <span className="text-sm text-ink-600">
                      {paket.bonus > 0 ? `+${paket.bonus} % Bonus` : "ohne Bonus"}
                    </span>
                    <span className="text-sm text-ink-600 tabular-nums">
                      Guthaben {euro(paket.guthaben)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-600">
                Paketpreise netto, zzgl. gesetzlicher Umsatzsteuer.{" "}
                {extraSpeicherText}.
              </p>
            </div>
          </section>
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
