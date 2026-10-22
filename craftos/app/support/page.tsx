import Link from "next/link";
import { Mail, BookOpen, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { crumbsFor } from "@/lib/breadcrumbs";
import { site } from "@/lib/site";
import { metaFor, zielwerte } from "@/lib/seo-meta";
// Title, Description und H1 aus der Keyword-Map (08-04, D-06).
export const metadata = metaFor("/support");
export default function Page() {
  return (
    <>
      <PageHero
        crumbs={crumbsFor("/support")}
        eyebrow="Kontakt & Support"
        title={zielwerte("/support").h1}
        intro="Ob Einrichtung, Rechnung oder eine Frage zur Mobile-App: Beschreiben Sie uns kurz, wobei Sie Unterstützung benötigen."
      />
      <section className="section-space">
        <div className="site-container split-section items-start">
          <div>
            <Mail size={32} />
            <h2 className="text-3xl font-semibold mt-5">
              Direkt zum CraftOS Support.
            </h2>
            <a href={"mailto:" + site.email} className="text-link text-lg mt-5">
              {site.email}
              <ArrowUpRight size={18} />
            </a>
            <p className="text-ink-600 mt-6">
              Nennen Sie die betroffene Ansicht, Ihr Gerät und die Schritte, bei
              denen die Frage auftritt. Eine genaue Fehlermeldung hilft uns bei
              der Einordnung.
            </p>
            <p className="text-sm text-ink-500 mt-4">
              Bitte senden Sie keine Passwörter oder vollständigen
              Zahlungsdaten.
            </p>
          </div>
          <div className="soft-panel">
            <BookOpen size={32} />
            <h2 className="text-3xl font-semibold mt-5">
              Die Antwort ist vielleicht schon da.
            </h2>
            <p className="text-ink-600 mt-5">
              Im Hilfezentrum finden Sie Anleitungen zu Einrichtung, Angeboten,
              Rechnungen, Zeiten, Lager und Craft AI.
            </p>
            <Link href="/hilfe" className="btn-cta mt-6">
              Hilfezentrum öffnen <ArrowUpRight size={17} />
            </Link>
            <Link href="/blog" className="text-link block mt-6">
              Ratgeber für Ihren Betriebsalltag
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
