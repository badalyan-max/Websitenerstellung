import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { funktionen } from "@/lib/funktionen";
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
      <TrialCta />
    </>
  );
}
