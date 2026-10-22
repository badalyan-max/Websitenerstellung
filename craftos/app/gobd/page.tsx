import Link from "next/link";
import {
  LockKeyhole,
  History,
  FileCheck2,
  Files,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { TrialCta } from "@/components/ui/TrialCta";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
// Title, Description und H1 aus der Keyword-Map (08-04, D-06, D-17); v2-Umbau folgt in einem späteren Phase-8-Plan.
export const metadata = metaFor("/gobd");
const points = [
  {
    icon: LockKeyhole,
    title: "Rechnungen verbindlich festschreiben",
    text: "Beim Fertigstellen vergibt CraftOS die endgültige Dokumentnummer und sperrt den Rechnungsinhalt. Positionen, Beträge, Kunde, Belegdatum und weitere inhaltliche Angaben können danach nicht einfach überschrieben oder entsperrt werden.",
    href: "/hilfe/rechnung-fertigstellen",
  },
  {
    icon: History,
    title: "Den Dokumentstand nachvollziehen",
    text: "Zum finalisierten Dokument wird ein Versionsstand gespeichert. Festschreibung und verantwortliche Person bleiben zugeordnet. Damit ist der Zusammenhang zwischen Bearbeitung und freigegebenem Stand nachvollziehbar.",
    href: "/funktionen/rechnungen",
  },
  {
    icon: Files,
    title: "Korrekturen mit Bezug zum Original",
    text: "Eine Stornorechnung erhält eine eigene Nummer und verweist auf die ursprüngliche Rechnung. Die ursprüngliche Rechnung bleibt erhalten; die Korrektur wird als eigener Vorgang sichtbar.",
    href: "/hilfe/rechnung-stornieren",
  },
  {
    icon: FileCheck2,
    title: "Eingangsbelege prüfen und sperren",
    text: "Sie kontrollieren ausgelesene Rechnungsdaten und die Zuordnung. Nach bestätigter Prüfung schützt eine Sperre die Belegangaben; relevante Änderungen und die Festschreibung werden protokolliert. Zahlungsinformationen können weiterhin nachgeführt werden.",
    href: "/hilfe/beleg-scannen-pruefen",
  },
  {
    icon: ShieldCheck,
    title: "Zugriffe und E-Rechnungsbezug schützen",
    text: "Berechtigungen begrenzen den Zugriff auf Finanzdaten und die Festschreibung. Ein einmal gespeicherter Verweis auf das archivierte E-Rechnungs-PDF lässt sich nicht durch einen anderen Verweis ersetzen.",
    href: "/funktionen/e-rechnung",
  },
  {
    icon: Files,
    title: "Die Übergabe vorbereiten",
    text: "Projektbezüge, Belege und Kontierung helfen bei der Zuordnung. Der DATEV-Export unterstützt die Übergabe an die Steuerberatung; Exportumfang und erforderliche Unterlagen stimmen Sie mit Ihrer Kanzlei ab.",
    href: "/hilfe/datev-export-erstellen",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        crumbs={crumbsFor("/gobd")}
        eyebrow="GoBD & Nachvollziehbarkeit"
        title={zielwerte("/gobd").h1}
        intro="CraftOS unterstützt Ihre GoBD-konformen Abläufe mit Festschreibung, geschützten Rechnungsinhalten, Dokumentversionen und einer nachvollziehbaren Belegprüfung."
      />
      <section className="section-space">
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {points.map((p) => (
              <article key={p.title} className="border-t border-ink-200 pt-7">
                <p.icon
                  size={30}
                  strokeWidth={1.4}
                  className="text-primary-800"
                />
                <h2 className="text-2xl font-semibold mt-5">{p.title}</h2>
                <p className="mt-4 text-ink-600">{p.text}</p>
                <Link href={p.href} className="text-link mt-5">
                  Ablauf ansehen <ArrowUpRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:items-center">
          <div className="min-w-0">
            <p className="eyebrow">Vom Entwurf zum festen Stand</p>
            <h2 className="section-title">
              Erst prüfen.
              <br />
              Dann fertigstellen.
            </h2>
            <p className="section-intro">
              Das kleine Beispiel zeigt den Unterschied: Ein Entwurf lässt sich
              bearbeiten. Nach dem Fertigstellen stehen Dokumentnummer und
              Rechnungsinhalt fest.
            </p>
            <Link href="/hilfe/rechnung-fertigstellen" className="text-link mt-6">
              Rechnung Schritt für Schritt fertigstellen <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="w-full min-w-0 max-w-[640px] justify-self-center">
            <FeatureSnippet variant="rechnung" />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold">
              Software und betriebliche Abläufe gehören zusammen.
            </h2>
            <p className="mt-5 text-ink-600">
              GoBD-Konformität betrifft das gesamte Verfahren im Betrieb. Die
              technischen Funktionen unterstützen dieses Verfahren; sie ersetzen
              weder Ihre Verfahrensdokumentation noch eine vollständige und
              zeitnahe Belegerfassung.
            </p>
            <p className="mt-4 text-ink-600">
              Organisieren Sie Zuständigkeiten, Kontrollen, die Aufbewahrung
              steuerlich relevanter Originaldaten und den erforderlichen
              Datenzugriff gemeinsam mit Ihrer Steuerberatung. Ein DATEV-Export
              allein ist kein Nachweis, dass sämtliche Prüfungs- und
              Aufbewahrungsanforderungen erfüllt sind.
            </p>
            <p className="mt-4 text-ink-600">
              CraftOS wird hier anhand konkreter Funktionen beschrieben; eine
              behördliche GoBD-Zertifizierung wird nicht behauptet.
            </p>
          </div>
          <div className="soft-panel">
            <h2 className="text-2xl font-semibold">Ein typischer Ablauf</h2>
            <ol className="list-decimal pl-5 space-y-4 mt-5">
              <li>Firmen- und Kundenangaben vollständig pflegen.</li>
              <li>Belege erfassen, Inhalte prüfen und korrekt zuordnen.</li>
              <li>Rechnungen nach Prüfung fertigstellen und festschreiben.</li>
              <li>
                Korrekturen über nachvollziehbare Stornovorgänge bearbeiten.
              </li>
              <li>
                Zahlungen nachführen, Unterlagen aufbewahren und die Übergabe
                abstimmen.
              </li>
            </ol>
          </div>
        </div>
        <div className="site-container mt-12 border-t border-ink-200 pt-7">
          <h2 className="text-xl font-semibold">Grundlage und Stand</h2>
          <p className="text-sm text-ink-600 mt-3">
            Funktionsstand geprüft am 9. September 2026. Die rechtliche
            Einordnung orientiert sich an den{" "}
            <a
              className="text-link"
              href="https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html"
            >
              GoBD im amtlichen AO-Handbuch
            </a>{" "}
            sowie dem{" "}
            <a
              className="text-link"
              href="https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html"
            >
              BMF-Änderungsschreiben vom 14. Juli 2025
            </a>
            .
          </p>
        </div>
      </section>
      <JsonLd
        data={faqSchema([
          {
            q: "Wie unterstützt CraftOS GoBD-konforme Abläufe?",
            a: "Durch Rechnungsfestschreibung, geschützte Inhalte, Dokumentversionen, nachvollziehbare Stornierungen sowie Prüfung, Sperre und Protokollierung von Eingangsbelegen. Die GoBD betreffen zugleich die betrieblichen Abläufe und die Aufbewahrung.",
          },
        ])}
      />
      <TrialCta />
    </>
  );
}
