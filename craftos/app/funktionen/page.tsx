import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { funktionen, upcomingFeatures } from "@/lib/funktionen";
import { PageHero } from "@/components/ui/PageHero";
import { TrialCta } from "@/components/ui/TrialCta";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Alle Funktionen der Handwerkersoftware",
  "Angebote, Rechnungen, Plantafel, Aufmaß, Projekte und Lager: Entdecken Sie die Funktionen von CraftOS für Büro und Baustelle.",
  "/funktionen",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Das Produkt"
        title={
          <>
            Weniger suchen.
            <br />
            Mehr erledigen.
          </>
        }
        intro="CraftOS verbindet die Arbeitsschritte Ihres Betriebs: vom ersten Kundenkontakt über die Baustelle bis zur Abrechnung."
      />
      <section className="section-space">
        <div className="site-container">
          <div className="feature-grid">
            {funktionen.map((f) => (
              <Link
                key={f.slug}
                href={"/funktionen/" + f.slug}
                className="feature-link"
              >
                <f.icon size={28} strokeWidth={1.5} />
                <h2 className="text-2xl font-semibold mt-5 mb-3">{f.name}</h2>
                <p>{f.kurz}</p>
                <span className="text-xs text-ink-500 mt-5 block">
                  {f.platforms
                    .map((p) => (p === "web" ? "Web-App" : "Mobile-App"))
                    .join(" · ")}
                  {f.tier === "launch" ? " · In Prüfung" : ""}
                </span>
                <ArrowUpRight size={19} className="mt-5" />
              </Link>
            ))}
          </div>
          <div className="notice mt-12">
            <h2 className="text-2xl font-semibold">
              Voll-Lizenz heißt: Web-App und Handy-App.
            </h2>
            <p className="mt-3">
              Alle freigegebenen Kernmodule sind enthalten; Rollen bestimmen den
              Zugriff. KI-Verbrauch und zusätzlicher Speicher werden separat
              abgerechnet.
            </p>
            <Link href="/preise" className="text-link mt-4">
              Preise und Lizenzumfang ansehen
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container">
          <p className="eyebrow">Die nächsten Erweiterungen</p>
          <h2 className="section-title">Demnächst in CraftOS.</h2>
          <p className="section-intro">
            Diese Funktionen befinden sich in Vorbereitung; die Zeitangaben
            beschreiben den aktuellen Planungsstand.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {upcomingFeatures.map((f) => (
              <div className="border-t border-ink-300 pt-6" key={f.name}>
                <p className="text-xs text-primary-800 font-semibold">
                  {f.when}
                </p>
                <h3 className="text-2xl font-semibold mt-4">{f.name}</h3>
                <p className="text-ink-600 text-sm mt-3">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrialCta />
    </>
  );
}
