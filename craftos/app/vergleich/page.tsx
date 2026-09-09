import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Layers3,
  Route,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { TrialCta } from "@/components/ui/TrialCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { upcomingFeatures } from "@/lib/funktionen";
import {
  comparisonCheckedAt,
  comparisonCheckedLabel,
  comparisonSources,
  craftnotePlans,
  craftosComparisonPrices,
  featureComparisons,
  formatComparisonMoney as money,
  plancraftAddons,
  plancraftPlans,
  teamExamples,
  type ComparisonSourceId,
} from "@/lib/comparison";
import styles from "./Comparison.module.css";

const title = "CraftOS, Craftnote und plancraft im Vergleich";
const description =
  "Handwerkersoftware sachlich vergleichen: CraftOS, Craftnote und plancraft mit Preisen, Laufzeiten, Plantafel, Mobile-App und Quellen. Stand September 2026.";
export const metadata = pageMetadata(title, description, "/vergleich");

function SourceLink({ id, label }: { id: ComparisonSourceId; label?: string }) {
  const source = comparisonSources[id];
  return (
    <a className={styles.sourceLink} href={source.url}>
      {label ?? source.label}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}

const reasons = [
  {
    icon: Layers3,
    title: "Die Kernmodule gehören dazu.",
    text: "Angebote, Rechnungen, Projekte, Zeiterfassung, Lager und Plantafel gehören zur Voll-Lizenz. Für die Plantafel kommt keine separate Modulgebühr dazu.",
    href: "/funktionen",
    link: "Funktionen im Detail",
  },
  {
    icon: Smartphone,
    title: "Eine Person. Web und Handy.",
    text: "Ihre Voll-Lizenz enthält die Web-App und die Mobile-App für dieselbe Person. Das mobile Team ergänzen Sie mit eigenen App-Lizenzen; die Rechte passen Sie an die Aufgaben an.",
    href: "/app",
    link: "Büro und Baustelle verbinden",
  },
  {
    icon: Route,
    title: "Ein Auftrag als gemeinsame Grundlage.",
    text: "Kunde, Dokumente, Einsätze, Stunden und Material bleiben mit dem Projekt verbunden. Tatsächlich erfasste Zeiten, Materialbewegungen und Belege fließen in die Nachkalkulation ein.",
    href: "/funktionen/nachkalkulation",
    link: "Den Auftrag nachkalkulieren",
  },
  {
    icon: ShieldCheck,
    title: "Belege bleiben nachvollziehbar.",
    text: "Rechnungsnummern entstehen beim Fertigstellen; Korrekturen erfolgen über Folgebelege. Buchungsjournal, Belegbezug und Festschreibung unterstützen Ihre GoBD-Prozesse. Ordnungsgemäße Abläufe und fachliche Prüfung bleiben Aufgabe Ihres Betriebs.",
    href: "/funktionen/buchhaltung",
    link: "Buchhaltung und DATEV ansehen",
  },
  {
    icon: Users,
    title: "Ein Abo, passend zu Ihren Personen.",
    text: "Sie wählen Voll- oder App-Lizenzen pro Person. Das Jahresabo ist rund 17 % günstiger als zwölf Monatszahlungen. KI-Nutzung verbraucht Credits; zusätzlicher Speicher kann weitere Kosten verursachen.",
    href: "/preise",
    link: "Preise und Bedingungen ansehen",
  },
];

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Warum CraftOS?"
        title={
          <>
            Eine Entscheidung,
            <br />
            die zum Betrieb passt.
          </>
        }
        intro="Büro und Baustelle arbeiten an denselben Aufträgen. CraftOS verbindet sie in einem System mit klaren Preisen pro Person. Hier sehen Sie unsere Argumente und einen nachvollziehbaren Anbietervergleich."
      />

      <div className={styles.page}>
        <nav
          className={styles.sectionNav}
          aria-label="Auf dieser Vergleichsseite"
        >
          <div className={`site-container ${styles.navInner}`}>
            <a href="#warum">Für CraftOS spricht</a>
            <a href="#kosten">Kostenbeispiel</a>
            <a href="#tarife">Tarife</a>
            <a href="#funktionen">Funktionsvergleich</a>
            <a href="#quellen">Quellen & Stand</a>
          </div>
        </nav>

        <section
          className="section-space"
          id="warum"
          aria-labelledby="why-heading"
        >
          <div className="site-container">
            <p className="eyebrow">Im Arbeitsalltag zählt der Zusammenhang</p>
            <h2 className="section-title" id="why-heading">
              Ein System für den Auftrag.
              <br />
              Ein Preis pro Person.
            </h2>
            <div className={styles.reasonGrid}>
              {reasons.map(
                (
                  { icon: Icon, title: reasonTitle, text, href, link },
                  index,
                ) => (
                  <article className={styles.reason} key={reasonTitle}>
                    <div className={styles.reasonTop}>
                      <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                      <span aria-hidden="true">0{index + 1}</span>
                    </div>
                    <h3>{reasonTitle}</h3>
                    <p>{text}</p>
                    <Link className="text-link" href={href}>
                      {link}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                ),
              )}
              <aside
                className={styles.licenseNote}
                aria-label="CraftOS Lizenzpreise"
              >
                <span className={styles.smallLabel}>CraftOS · Jahresabo</span>
                <div className={styles.ownPrice}>
                  {money(craftosComparisonPrices.fullAnnualCents / 12)}
                  <span>netto / Person / Monat bei Jahresabrechnung</span>
                </div>
                <h3>Voll-Lizenz inklusive Mobile-App.</h3>
                <p>
                  {money(craftosComparisonPrices.fullAnnualCents)} jährlich
                  abgerechnet (rund 17 % günstiger). Zusätzliche App-Lizenz:{" "}
                  {money(craftosComparisonPrices.appAnnualCents / 12)} pro Monat
                  bei {money(craftosComparisonPrices.appAnnualCents)} jährlicher
                  Abrechnung. Alternativ Voll-Lizenz für{" "}
                  {money(craftosComparisonPrices.fullMonthlyCents)} im
                  Monatsabo.
                </p>
                <a className="btn-cta" href="#kosten">
                  Ein Team durchrechnen
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section
          className={`section-space ${styles.tinted}`}
          id="kosten"
          aria-labelledby="cost-heading"
        >
          <div className="site-container">
            <div className={styles.sectionHeader}>
              <div>
                <p className="eyebrow">Drei konkrete Zusammenstellungen</p>
                <h2 className="section-title" id="cost-heading">
                  Ein Bürozugang.
                  <br />
                  Vier Personen auf der Baustelle.
                </h2>
              </div>
              <p className={styles.date}>
                <CalendarDays size={16} aria-hidden="true" />
                Stand:{" "}
                <time dateTime={comparisonCheckedAt}>
                  {comparisonCheckedLabel}
                </time>
              </p>
            </div>
            <p className={styles.intro}>
              Ein Kostenbeispiel mit Jahresabrechnung für fünf Personen. Die
              Pakete unterscheiden sich im Leistungsumfang; die Zusammenstellung
              ist keine Aussage über vollständige Funktionsgleichheit.
            </p>
            <div className={styles.exampleGrid}>
              {teamExamples.map((example, index) => (
                <article
                  key={example.name}
                  className={`${styles.example} ${index === 0 ? styles.exampleOwn : ""}`}
                >
                  <p className={styles.smallLabel}>{example.name}</p>
                  <h3>{example.package}</h3>
                  <p className={styles.total}>
                    {money(example.annualCents / 12)}
                    <span>netto pro Monat · bei Jahresabrechnung</span>
                  </p>
                  <p className={styles.equivalent}>
                    {money(example.annualCents)} jährlich abgerechnet
                  </p>
                  <p className={styles.calculation}>{example.calculation}</p>
                  <p className={styles.exampleNote}>{example.note}</p>
                  {example.href.startsWith("/") ? (
                    <Link className="text-link" href={example.href}>
                      {example.sourceLabel}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ) : (
                    <a className="text-link" href={example.href}>
                      {example.sourceLabel}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
            <div className={`notice ${styles.exampleNotice}`}>
              <p>
                Die Monatsäquivalente sind der Jahresbetrag geteilt durch zwölf,
                keine monatliche Abbuchung. Alle Beträge netto, zuzüglich
                Umsatzsteuer. KI-Verbrauch, zusätzlicher Speicher, Schulungen,
                Zahlungsgebühren und GPS-Tracker sind nicht eingerechnet.
              </p>
              <p>
                Bei Craftnote ist die Plantafel dokumentiert; ein gesonderter
                Modulpreis ist nicht ausgewiesen. Die administrativen
                Planungsrechte hängen von der Rolle ab. Büro Plus wird am
                Prüfdatum mit einem Aktionspreis angeboten.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section-space"
          id="tarife"
          aria-labelledby="tariff-heading"
        >
          <div className="site-container">
            <p className="eyebrow">Die Grundlage hinter den Zahlen</p>
            <h2 className="section-title" id="tariff-heading">
              Laufzeit und Zugänge
              <br />
              machen den Preis.
            </h2>
            <p className={styles.intro}>
              Für den passenden Vergleich zählen auch zusätzliche Personen und
              Module. Alle folgenden Beträge sind netto; die Abrechnungsperiode
              steht jeweils dabei.
            </p>
            <article
              className={styles.tariffBlock}
              aria-labelledby="craftnote-heading"
            >
              <div className={styles.providerHeading}>
                <h3 id="craftnote-heading">Craftnote</h3>
                <SourceLink id="craftnotePrices" label="Preise beim Anbieter" />
              </div>
              <p className={styles.providerIntro}>
                Büro Plus verbindet Baustellenorganisation mit Angeboten,
                Rechnungen und Kalkulation. Büro- und Baustellenpakete lassen
                sich für die Aufgaben im Team kombinieren.{" "}
                <SourceLink id="craftnoteOffice" label="Büro Plus im Detail" />
              </p>
              <p className={styles.scrollHint} id="craftnote-scroll">
                Auf kleinen Bildschirmen kann die Tabelle horizontal gescrollt
                werden.
              </p>
              <div
                className={styles.tableScroll}
                role="region"
                aria-label="Craftnote Jahrespreise"
                aria-describedby="craftnote-scroll"
                tabIndex={0}
              >
                <table className={styles.priceTable}>
                  <caption>
                    Craftnote: jährliche Abrechnung, Preis pro Person
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Paket</th>
                      <th scope="col">Pro Monat, rechnerisch</th>
                      <th scope="col">Pro Jahr</th>
                      <th scope="col">Einordnung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {craftnotePlans.map((plan) => (
                      <tr key={plan.name}>
                        <th scope="row">{plan.name}</th>
                        <td>{money(plan.monthlyEquivalentCents)}</td>
                        <td>{money(plan.monthlyEquivalentCents * 12)}</td>
                        <td>{plan.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.providerNotes}>
                <p>
                  <strong>Büro Plus: Aktionspreis.</strong> Am Prüfdatum werden
                  49,90 € statt 69,90 € angezeigt; eine eindeutige Aktionsdauer
                  ist nicht genannt. Mindestens ein Büropaket ist erforderlich.
                  Der Hilfeartikel beschreibt eine automatische
                  Jahresverlängerung, sofern nicht fristgerecht gekündigt wird.{" "}
                  <SourceLink id="craftnoteTerms" label="Vertragsangaben" />
                </p>
                <p>
                  <strong>Zusatzmodul Fahrzeug:</strong> 24,90 € je Tracker und
                  Monat im ersten Jahr bei jährlicher Abrechnung. Für die
                  Plantafel wird auf der Preisseite kein eigener Modulpreis
                  ausgewiesen.{" "}
                  <SourceLink
                    id="craftnotePrices"
                    label="Zusatzmodule prüfen"
                  />
                </p>
              </div>
            </article>

            <article
              className={styles.tariffBlock}
              aria-labelledby="plancraft-heading"
            >
              <div className={styles.providerHeading}>
                <h3 id="plancraft-heading">plancraft</h3>
                <SourceLink id="plancraftPrices" label="Preise beim Anbieter" />
              </div>
              <p className={styles.providerIntro}>
                Business deckt Angebote, Rechnungen und Zeiten ab. Pro ergänzt
                etwa GAEB, DATANORM, Nachkalkulation und bis zu 50
                Eingangsrechnungsscans pro Monat. Premium enthält die Plantafel,
                unbegrenzte Scans und einen persönlichen Ansprechpartner.
              </p>
              <p className={styles.scrollHint} id="plancraft-scroll">
                Die Spalten zeigen Monats-Bezugsbeträge für unterschiedliche
                Vertragslaufzeiten; Tabelle horizontal scrollbar.
              </p>
              <div
                className={styles.tableScroll}
                role="region"
                aria-label="plancraft Preise nach Vertragslaufzeit"
                aria-describedby="plancraft-scroll"
                tabIndex={0}
              >
                <table className={styles.priceTable}>
                  <caption>
                    plancraft: Netto-Bezugsbetrag pro Monat, Vorauszahlung für
                    die gewählte Periode
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Paket / Zusatz</th>
                      <th scope="col">1 Monat</th>
                      <th scope="col">1 Jahr</th>
                      <th scope="col">2 Jahre</th>
                      <th scope="col">Enthalten / Berechnung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plancraftPlans.map((plan) => (
                      <tr key={plan.name}>
                        <th scope="row">{plan.name}</th>
                        <td>{money(plan.monthlyCents)}</td>
                        <td>{money(plan.annualMonthlyCents)}</td>
                        <td>{money(plan.biennialMonthlyCents)}</td>
                        <td>
                          {plan.officeUsers}{" "}
                          {plan.officeUsers === 1
                            ? "Bürozugang"
                            : "Bürozugänge"}
                          , jeweils inklusive mobiler Nutzung
                        </td>
                      </tr>
                    ))}
                    {plancraftAddons.map((addon) => (
                      <tr className={styles.addonRow} key={addon.name}>
                        <th scope="row">{addon.name}</th>
                        <td>{money(addon.monthlyCents)}</td>
                        <td>{money(addon.annualMonthlyCents)}</td>
                        <td>{money(addon.biennialMonthlyCents)}</td>
                        <td>{addon.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.providerNotes}>
                <p>
                  Die Zweijahrespreise sind an zwei Jahre Laufzeit gebunden.
                  Jahresbetrag = Spalte „1 Jahr“ × 12; Zweijahresbetrag = Spalte
                  „2 Jahre“ × 24. Beispiel Business: 718,80 € für ein Jahr oder
                  1.150,08 € für zwei Jahre. Es handelt sich jeweils um
                  Vorauszahlung.
                </p>
                <p>
                  <strong>KI-Telefonempfang bereits verfügbar:</strong> Der
                  kostenlose Tarif enthält 60 Credits pro Monat. Der Tarif
                  „Flexibel“ beginnt mit 160 Credits bei 79,90 € monatlich für
                  plancraft-Kunden oder 89,90 € ohne plancraft-Vertrag. Ein
                  Credit entspricht einer angefangenen Gesprächsminute.{" "}
                  <SourceLink
                    id="plancraftPhone"
                    label="KI-Tarife und Bedingungen"
                  />
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          className={`section-space ${styles.tinted}`}
          id="funktionen"
          aria-labelledby="comparison-heading"
        >
          <div className="site-container">
            <p className="eyebrow">Leistungen im Zusammenhang</p>
            <h2 className="section-title" id="comparison-heading">
              Was passt zu Ihrer
              <br />
              Art zu arbeiten?
            </h2>
            <p className={styles.intro}>
              Alle drei Anbieter verbinden Büro und Baustelle. Hier vergleichen
              wir ausgewählte, öffentlich belegte Leistungen und deren
              Paketzuordnung. Oberflächen, Tiefe und Berechtigungen
              unterscheiden sich.
            </p>
            <p className={styles.scrollHint} id="feature-scroll">
              Die Vergleichstabelle lässt sich horizontal scrollen; fokussieren
              Sie sie für die Bedienung mit Pfeiltasten.
            </p>
            <div
              className={styles.tableScroll}
              role="region"
              aria-label="Funktionsvergleich CraftOS, Craftnote und plancraft"
              aria-describedby="feature-scroll"
              tabIndex={0}
            >
              <table className={styles.featureTable}>
                <caption>
                  Ausgewählte Funktionen · Stand {comparisonCheckedLabel}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Leistung</th>
                    <th scope="col">CraftOS</th>
                    <th scope="col">Craftnote</th>
                    <th scope="col">plancraft</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparisons.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      {(["craftos", "craftnote", "plancraft"] as const).map(
                        (provider) => {
                          const cell = row[provider];
                          return (
                            <td key={provider}>
                              <strong>{cell.text}</strong>
                              {cell.detail && <p>{cell.detail}</p>}
                              {cell.source && (
                                <SourceLink
                                  id={cell.source}
                                  label="Anbieterquelle"
                                />
                              )}
                              {cell.href && (
                                <Link
                                  className={styles.sourceLink}
                                  href={cell.href}
                                >
                                  Details
                                  <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                              )}
                            </td>
                          );
                        },
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.tableFootnote}>
              „Hier nicht bewertet“ bedeutet, dass dieser Vergleich dazu keine
              belastbare Aussage trifft. Daraus lässt sich weder eine fehlende
              Funktion noch eine angekündigte Entwicklung ableiten.
            </p>
          </div>
        </section>

        <section
          className="section-space"
          id="ausblick"
          aria-labelledby="roadmap-heading"
        >
          <div className="site-container">
            <p className="eyebrow">Ausblick bei CraftOS</p>
            <h2 className="section-title" id="roadmap-heading">
              Diese Erweiterungen
              <br />
              sind angekündigt.
            </h2>
            <p className={styles.intro}>
              Diese Erweiterungen sind geplant und werden hier nicht als bereits
              nutzbare Funktionen dargestellt. Der heutige Leistungsumfang steht
              auf den jeweiligen Funktionsseiten.
            </p>
            <div className={styles.roadmapGrid}>
              {upcomingFeatures.map((feature) => (
                <article className={styles.roadmapItem} key={feature.name}>
                  <p className={styles.planned}>{feature.when}</p>
                  <h3>{feature.name}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`section-space ${styles.sourceSection}`}
          id="quellen"
          aria-labelledby="sources-heading"
        >
          <div className={`site-container ${styles.sourcesLayout}`}>
            <div>
              <p className="eyebrow">Nachvollziehbar vergleichen</p>
              <h2 id="sources-heading">
                Quellen, Stand
                <br />
                und Vergleichsrahmen.
              </h2>
              <p>
                Herausgeber dieser Seite ist CraftOS. Die Anbieterangaben wurden
                am{" "}
                <time dateTime={comparisonCheckedAt}>
                  {comparisonCheckedLabel}
                </time>{" "}
                geprüft. Maßgeblich für einen Abschluss sind das aktuelle
                Angebot und die Vertragsbedingungen des jeweiligen Anbieters.
              </p>
              <p>
                Der Vergleich bewertet ausgewählte Leistungen für
                Handwerksbetriebe. Er ist keine vollständige Produktbewertung
                und beruht bei anderen Anbietern auf öffentlichen Preis-,
                Produkt- und Hilfeseiten.
              </p>
              <Link className="text-link" href="/funktionen">
                CraftOS-Funktionen im Detail
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className={styles.sourceList}>
              {Object.entries(comparisonSources).map(([id, source]) => (
                <li key={id}>
                  <a href={source.url}>
                    {source.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${site.url}/vergleich#webpage`,
              url: `${site.url}/vergleich`,
              name: title,
              description,
              inLanguage: "de-DE",
              dateModified: comparisonCheckedAt,
              publisher: {
                "@type": "Organization",
                name: "CraftOS",
                url: site.url,
              },
              citation: Object.values(comparisonSources).map(
                (source) => source.url,
              ),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Startseite",
                  item: site.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Anbietervergleich",
                  item: `${site.url}/vergleich`,
                },
              ],
            },
          ],
        }}
      />
      <TrialCta />
    </>
  );
}
