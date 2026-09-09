import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { PricingTable } from "@/components/preise/PricingTable";
import { Faq } from "@/components/ui/Faq";
import { TrialCta } from "@/components/ui/TrialCta";
import { funktionen } from "@/lib/funktionen";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
export const metadata = pageMetadata(
  "Handwerkersoftware für Büro & Baustelle",
  "CraftOS verbindet Angebote, Rechnungen, Plantafel, Zeiten und Lager. Voll-Lizenz inklusive Mobile-App. 10 Tage kostenlos testen.",
  "/",
);
const faqs = [
  {
    q: "Ist die Handy-App in der Voll-Lizenz enthalten?",
    a: "Ja. Die Voll-Lizenz für 29,95 € netto pro Person und Monat umfasst die Web-App und die Mobile-App für dieselbe Person. Für Mitarbeitende auf der Baustelle gibt es ergänzende App-Lizenzen für 9,95 € netto monatlich.",
  },
  {
    q: "Wie lange kann ich CraftOS kostenlos testen?",
    a: "Sie können CraftOS 10 Tage ohne Zahlungsdaten testen. Ein kostenpflichtiges Abonnement wählen Sie aktiv in der App; den Zahlungsbeginn sehen Sie im Checkout.",
  },
  {
    q: "Kostet die Plantafel zusätzlich?",
    a: "Die Plantafel gehört zum Funktionsumfang der Voll-Lizenz. Auch Angebote, Rechnungen, Projekte, Lager und Nachkalkulation benötigen kein separates Modul-Abo. KI-Verbrauch und zusätzlicher Speicher werden gesondert abgerechnet.",
  },
  {
    q: "Wie unterstützt CraftOS die GoBD-Konformität?",
    a: "CraftOS unterstützt GoBD-gerechte Abläufe durch Festschreibung von Rechnungen, geschützte Beleginhalte, Dokumentversionen und nachvollziehbare Stornierungen. Eingangsbelege werden geprüft und gesperrt; Änderungen werden protokolliert. Dazu gehören weiterhin Ihre vollständige Belegerfassung, Verfahrensdokumentation und Aufbewahrungsorganisation.",
  },
  {
    q: "Kann ich auf der Baustelle ohne Internet arbeiten?",
    a: "Bereits geladene Daten und ausgewählte Texteingaben sowie Zeiteinträge können mobil offline nutzbar sein. Fotos, KI und noch nicht geladene Inhalte benötigen eine Verbindung. Prüfen Sie vor dem Einsatz und danach den Synchronisierungsstatus.",
  },
];
export default function Home() {
  return (
    <>
      <Hero />
      <section className="home-flow">
        <div className="site-container">
          <p className="eyebrow">Vom Auftrag bis zum Zahlungseingang</p>
          <h2 className="section-title">
            Ein Ablauf.
            <br />
            Alles bleibt zusammen.
          </h2>
          <div className="flow-grid grid md:grid-cols-4 gap-8 mt-12">
            {[
              [
                "01",
                "Sauber anbieten",
                "Aufmaß und Mengen erfassen. Material, Arbeit und Kosten kalkulieren.",
                "/funktionen/angebote",
              ],
              [
                "02",
                "Verlässlich planen",
                "Team und Ressourcen einteilen. Einsätze bei Änderungen verschieben.",
                "/funktionen/plantafel",
              ],
              [
                "03",
                "Vor Ort festhalten",
                "Zeiten, Fotos und Leistungen direkt dem Projekt zuordnen.",
                "/app",
              ],
              [
                "04",
                "Klar abrechnen",
                "Rechnung prüfen und festschreiben. Zahlungen und Kosten verfolgen.",
                "/funktionen/rechnungen",
              ],
            ].map(([n, t, p, h]) => (
              <Link
                href={h}
                key={n}
                className="flow-item border-t border-ink-200 pt-6 group"
              >
                <span className="flow-number font-display text-4xl text-ink-300">
                  {n}
                </span>
                <h3 className="text-xl font-semibold mt-5 group-hover:text-primary-800">
                  {t}
                </h3>
                <p className="text-sm text-ink-600 mt-3">{p}</p>
                <ArrowUpRight className="mt-5" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-100 section-space home-collaboration">
        <div className="site-container split-section">
          <div>
            <p className="eyebrow">Büro und Baustelle verbunden</p>
            <h2 className="section-title">
              Gute Arbeit kennt
              <br />
              keinen Schreibtisch.
            </h2>
            <p className="section-intro">
              Im Büro behalten Sie den Überblick. Draußen hat Ihr Team die
              Informationen für den nächsten Handgriff dabei.
            </p>
            <ul className="rule-list">
              <li>
                <Monitor />
                <span>
                  <strong>Web-App:</strong> Aufträge kalkulieren, Einsätze
                  planen und Zahlen prüfen.
                </span>
              </li>
              <li>
                <Smartphone />
                <span>
                  <strong>Mobile-App:</strong> Zeiten, Aufmaße und Leistungen
                  dort erfassen, wo sie entstehen.
                </span>
              </li>
              <li>
                <Check />
                <span>
                  <strong>Beides inklusive:</strong> Eine Voll-Lizenz enthält
                  auch die Handy-App für dieselbe Person.
                </span>
              </li>
            </ul>
            <Link href="/app" className="text-link">
              Die Mobile-App kennenlernen <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="min-w-0">
            <FeatureSnippet variant="planung" />
            <Link href="/app#app-ansichten" className="text-link mt-5">
              Echte App-Ansichten ansehen <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space home-features">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <p className="eyebrow">Ihr Werkzeug fürs Büro</p>
              <h2 className="section-title">
                Was Ihr Betrieb braucht.
                <br />
                In einem System.
              </h2>
            </div>
            <Link href="/funktionen" className="text-link">
              Alle Funktionen <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="feature-grid">
            {[
              "angebote",
              "rechnungen",
              "plantafel",
              "zeiterfassung",
              "lager",
              "buchhaltung",
            ].map((slug) => {
              const f = funktionen.find((x) => x.slug === slug)!;
              return (
                <Link
                  href={"/funktionen/" + slug}
                  key={slug}
                  className="feature-link"
                >
                  <f.icon size={26} strokeWidth={1.5} />
                  <h3>{f.name}</h3>
                  <p>{f.kurz}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="home-gobd">
        <div className="site-container">
          <div className="soft-panel grid gap-7 md:grid-cols-[auto_1fr_auto] items-center">
            <ShieldCheck
              size={44}
              strokeWidth={1.3}
              className="text-primary-800"
            />
            <div>
              <h2 className="text-3xl font-semibold">
                GoBD: nachvollziehbar statt nachträglich verändert.
              </h2>
              <p className="mt-4 max-w-3xl text-ink-600">
                Festgeschriebene Rechnungen, geschützte Beleginhalte,
                Dokumentversionen und protokollierte Änderungen unterstützen
                Ihre GoBD-konformen Abläufe.
              </p>
            </div>
            <Link href="/gobd" className="btn-secondary">
              Das deckt CraftOS ab <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100" id="preise">
        <div className="site-container">
          <p className="eyebrow">Ein klarer Preis pro Person</p>
          <h2 className="section-title">
            Alle Kernmodule.
            <br />
            Ohne Modul-Puzzle.
          </h2>
          <p className="section-intro mb-10">
            Angebote, Rechnungen, Plantafel und Lager sind in der Voll-Lizenz
            enthalten. Die Mobile-App ebenfalls.
          </p>
          <PricingTable />
          <Link href="/vergleich" className="text-link mt-8">
            CraftOS im sachlichen Vergleich <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container split-section">
          <div>
            <p className="eyebrow">Wissen, das Sie weiterbringt</p>
            <h2 className="section-title">
              Besser kalkulieren.
              <br />
              Sicherer entscheiden.
            </h2>
            <p className="section-intro">
              Praktische Ratgeber, konkrete Anleitungen und kostenlose Rechner
              helfen Ihnen beim nächsten Schritt.
            </p>
            <Link href="/blog" className="text-link mt-6">
              Alle Ratgeber ansehen <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="border-t border-ink-200">
            {[
              [
                "Stundensatz berechnen",
                "Wie viel muss eine verrechenbare Stunde einbringen?",
                "/rechner/stundensatz",
              ],
              [
                "Angebot und Marge prüfen",
                "Kosten, Gewinn und Aufschlag klar auseinanderhalten.",
                "/rechner/angebotskalkulation",
              ],
              [
                "Die erste Rechnung fertigstellen",
                "Vom Entwurf zur festgeschriebenen Rechnung.",
                "/hilfe/rechnung-fertigstellen",
              ],
            ].map(([t, p, h]) => (
              <Link
                href={h}
                key={h}
                className="block py-7 border-b border-ink-200"
              >
                <h3 className="text-2xl font-semibold flex justify-between gap-4">
                  {t}
                  <ArrowUpRight size={22} />
                </h3>
                <p className="mt-2 text-ink-600 text-sm">{p}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container grid lg:grid-cols-[.7fr_1fr] gap-12">
          <div>
            <p className="eyebrow">Gut zu wissen</p>
            <h2 className="section-title">
              Ihre Fragen.
              <br />
              Klare Antworten.
            </h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
      <JsonLd data={faqSchema(faqs)} />
      <TrialCta />
    </>
  );
}
