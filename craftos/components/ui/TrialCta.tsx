import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function TrialCta() {
  return (
    <section className="section-space dark-section">
      <div className="site-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="eyebrow">CraftOS kennenlernen</p>
          <h2 className="section-title">
            Machen Sie Platz
            <br />
            für Ihr Handwerk.
          </h2>
          <p className="mt-5">10 Tage kostenlos testen. Ohne Zahlungsdaten.</p>
        </div>
        <div>
          <a href={site.ctaUrl} className="btn-cta">
            Jetzt Ihren Betrieb anlegen <ArrowUpRight size={18} />
          </a>
          <p className="mt-4 text-sm">
            Die Voll-Lizenz enthält Web-App und Mobile-App.
          </p>
        </div>
      </div>
    </section>
  );
}
