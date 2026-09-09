import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { ProductDemo } from "@/components/product-demo/ProductDemo";
import { StoreLinks } from "@/components/ui/StoreLinks";
export function Hero() {
  return (
    <section className="dark-section home-hero pb-10 md:pb-12">
      <div className="site-container pt-10 md:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Die Handwerkersoftware für Ihren Betrieb</p>
            <h1 className="text-[clamp(42px,5.2vw,76px)] font-semibold leading-[1.02]">
              Mehr Handwerk.
              <br />
              <span className="text-primary-500">Weniger Büro.</span>
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="text-base md:text-lg max-w-xl">
              Vom ersten Aufmaß bis zur letzten Rechnung: CraftOS bringt
              Aufträge, Team und Zahlen zusammen. Im Büro und auf der Baustelle.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a className="btn-cta" href={site.ctaUrl}>
                10 Tage kostenlos testen <ArrowUpRight size={17} />
              </a>
              <a href="#produktdemo" className="btn-secondary">
                Produkt erleben <ArrowDown size={16} />
              </a>
            </div>
            <p className="mt-4 text-xs flex flex-wrap gap-x-5 gap-y-2">
              <span className="inline-flex gap-1.5 items-center">
                <Check size={14} />
                Ohne Zahlungsdaten
              </span>
              <span>Volllizenz inklusive Handy App</span>
            </p>
            <div className="mt-5">
              <StoreLinks />
            </div>
          </div>
        </div>
        <div id="produktdemo" className="mt-10 md:mt-12 scroll-mt-6">
          <ProductDemo initialScene="dashboard" />
        </div>
        <div className="mt-5 flex flex-wrap justify-between gap-3 text-xs text-zinc-400">
          <span>Interaktive Beispieldemo · Fiktiver Musterbetrieb</span>
          <span>
            Ab 24,96 € netto / Monat im Jahresabo (rund 17 % günstiger) · 299,50
            € jährlich
          </span>
        </div>
      </div>
    </section>
  );
}
