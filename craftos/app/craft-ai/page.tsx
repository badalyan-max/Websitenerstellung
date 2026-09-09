import Link from "next/link";
import { MessageSquare, FilePenLine, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { TrialCta } from "@/components/ui/TrialCta";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { upcomingFeatures } from "@/lib/funktionen";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Craft AI – Betriebsdaten abfragen und Entwürfe prüfen",
  "Craft AI hilft bei Fragen zu Betriebsdaten und bereitet Entwürfe vor. Sie prüfen und bestätigen die Übernahme. Weitere Agent-Aktionen folgen.",
  "/craft-ai",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Craft AI"
        title={
          <>
            Fragen Sie Ihren Betrieb.
            <br />
            Behalten Sie das letzte Wort.
          </>
        }
        intro="Craft AI hilft beim Finden von Informationen und bereitet Entwürfe vor. Sie prüfen den Inhalt und bestätigen, bevor ein unterstützter Schreibvorgang übernommen wird."
      />
      <section className="section-space">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:items-center">
            <div className="min-w-0 space-y-7">
              {[
                [
                  MessageSquare,
                  "Fragen stellen",
                  "Betriebsdaten per Text oder Sprache abfragen. Die verfügbaren Informationen richten sich nach Ihrem Zugriff.",
                ],
                [
                  FilePenLine,
                  "Entwürfe vorbereiten",
                  "Unterstützte Angebots-, Zeit-, Einsatz- oder Berichtsentwürfe als Ausgangspunkt erhalten.",
                ],
                [
                  CheckCircle2,
                  "Bewusst übernehmen",
                  "Inhalt und Zuordnung kontrollieren. Erst Ihre Bestätigung übernimmt den unterstützten Entwurf.",
                ],
              ].map(([Icon, t, p]) => {
                const I = Icon as typeof MessageSquare;
                return (
                  <div className="border-t border-ink-200 pt-5" key={t as string}>
                    <h2 className="flex items-start gap-3 text-xl font-semibold">
                      <I size={22} className="shrink-0 text-primary-800 mt-1" />
                      {t as string}
                    </h2>
                    <p className="text-ink-600 mt-3 leading-relaxed">{p as string}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-full min-w-0 max-w-[640px] justify-self-center">
              <FeatureSnippet variant="ki" />
            </div>
          </div>
          <div className="notice mt-12">
            <h2 className="text-2xl font-semibold">
              Ihre Prüfung bleibt Teil des Ablaufs.
            </h2>
            <p className="mt-3">
              KI-Ergebnisse können unvollständig oder falsch sein. Prüfen Sie
              insbesondere Mengen, Preise, Zeitangaben und Projektbezug. Craft
              AI wird nicht als autonom verbuchendes Buchhaltungssystem
              angeboten.
            </p>
            <p className="text-sm mt-3">
              KI-Nutzung verbraucht Credits; Beleg-OCR wird ebenfalls nach
              Verbrauch abgerechnet. Die strukturierte Verarbeitung einer
              E-Rechnung ist davon getrennt.
            </p>
            <Link
              href="/hilfe/ki-entwurf-pruefen-uebernehmen"
              className="text-link mt-4"
            >
              KI-Entwürfe prüfen und übernehmen
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container">
          <p className="eyebrow">In Vorbereitung</p>
          <h2 className="section-title">
            Mehr Unterstützung.
            <br />
            Schon demnächst.
          </h2>
          <div className="grid md:grid-cols-3 gap-9 mt-10">
            {upcomingFeatures.map((f) => (
              <div className="border-t border-ink-300 pt-6" key={f.name}>
                <p className="text-xs text-primary-800 font-semibold">
                  {f.when}
                </p>
                <h3 className="text-2xl font-semibold mt-4">{f.name}</h3>
                <p className="mt-4 text-ink-600">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-ink-500 mt-7">
            Angekündigte Erweiterungen sind noch nicht als verfügbar zugesagt;
            die Termine geben den aktuellen Planungsstand wieder.
          </p>
        </div>
      </section>
      <TrialCta />
    </>
  );
}
