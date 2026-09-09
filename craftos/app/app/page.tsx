import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Camera, Ruler, FolderKanban } from "lucide-react";
import { site } from "@/lib/site";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { MobileAppGallery } from "@/components/ui/MobileAppGallery";
import { pageMetadata } from "@/lib/metadata";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { TrialCta } from "@/components/ui/TrialCta";
export const metadata = pageMetadata(
  "Mobile-App für Handwerker – in der Voll-Lizenz inklusive",
  "GPS-Zeiterfassung, Projektzuordnung, Einsatzkarte und Unterschriften unterwegs. Die Voll-Lizenz enthält die Mobile-App für dieselbe Person.",
  "/app",
);
export default function Page() {
  return (
    <>
      <section className="dark-section">
        <div className="site-container grid md:grid-cols-[1.1fr_.9fr] gap-12 items-center pt-12 pb-16 md:py-12">
          <div>
            <p className="eyebrow">Die CraftOS Mobile-App</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
              Ihr Büro passt
              <br />
              in die Arbeitshose.
            </h1>
            <p className="mt-6 text-lg max-w-xl">
              Arbeitszeiten mit Standort erfassen. Den nächsten Einsatz auf der
              Karte finden. Unterschriften direkt beim Auftrag festhalten.
            </p>
            <p className="mt-6 font-semibold flex items-center gap-2">
              <Check size={20} className="text-primary-500" />
              In jeder Voll-Lizenz enthalten.
            </p>
            <div className="mt-7">
              <StoreLinks />
            </div>
            <p className="mt-4 text-sm">
              Direkt zum passenden Store. Anschließend mit Ihrem CraftOS Konto
              anmelden.
            </p>
            <div className="hidden md:flex gap-5 mt-7">
              {(
                [
                  ["ios", "iPhone und iPad", site.iosUrl],
                  ["android", "Android", site.androidUrl],
                ] as const
              ).map(([platform, label, url]) => (
                <a
                  key={platform}
                  href={url}
                  className="text-center"
                  aria-label={label + ": Store öffnen oder QR-Code scannen"}
                >
                  <Image
                    src={"/images/mobile/qr-" + platform + ".svg"}
                    width={116}
                    height={116}
                    alt={
                      "QR-Code zum " +
                      (platform === "ios" ? "App Store" : "Google Play Store")
                    }
                    className="bg-white rounded-lg"
                  />
                  <span className="block text-xs text-zinc-300 mt-2">
                    {label}
                  </span>
                </a>
              ))}
            </div>
            <Link href="/preise" className="text-link text-sm mt-6">
              Welche Lizenz passt zu Ihrem Team?
            </Link>
          </div>
          <div id="app-ansichten" className="scroll-mt-24">
            <MobileAppGallery />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container">
          <p className="eyebrow">Am richtigen Ort erfasst</p>
          <h2 className="section-title">
            Der nächste Handgriff.
            <br />
            Die passende Information.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              [
                Clock,
                "Zeiten mit GPS",
                "Start- und Endort festhalten. Das passende Projekt wird beim Timerstart über die Nähe zum hinterlegten Projektort zugeordnet.",
                "/hilfe/mobilen-timer-bedienen",
              ],
              [
                FolderKanban,
                "Einsatzort auf der Karte",
                "Den geplanten Auftrag öffnen, Ziel und Adresse sehen und die Navigation zur Baustelle starten.",
                "/hilfe/plantafel-einsatz-planen",
              ],
              [
                Ruler,
                "Aufmaß vor Ort",
                "Raum- und Messdaten beim Projekt festhalten und für Angebote verwenden.",
                "/hilfe/raumaufmass-angebot-uebernehmen",
              ],
              [
                Camera,
                "Unterschrift mit Standort",
                "Berichte und Abnahmen unterschreiben lassen. Ort und Zeitpunkt bleiben beim Projekt nachvollziehbar.",
                "/funktionen/baudokumentation",
              ],
            ].map(([Icon, t, p, h]) => {
              const I = Icon as typeof Clock;
              return (
                <Link
                  href={h as string}
                  className="border-t border-ink-200 pt-6"
                  key={t as string}
                >
                  <I size={28} strokeWidth={1.4} />
                  <h3 className="text-2xl mt-5 font-semibold">{t as string}</h3>
                  <p className="text-sm text-ink-600 mt-3">{p as string}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:items-center">
          <div className="min-w-0">
            <p className="eyebrow">GPS und Projektzuordnung</p>
            <h2 className="section-title">
              Auf der Baustelle starten. Im Büro nachvollziehen.
            </h2>
            <p className="section-intro">
              Die App erkennt beim Timerstart ein passendes Projekt in Ihrer
              Nähe. Start- und Endort bleiben zusammen mit der Arbeitszeit
              gespeichert und sind im Büro am Eintrag sichtbar.
            </p>
            <Link href="/hilfe/mobilen-timer-bedienen" className="text-link mt-6">
              GPS und automatische Zuordnung einrichten
            </Link>
          </div>
          <div className="w-full min-w-0 max-w-[640px] justify-self-center">
            <FeatureSnippet variant="zeit" />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container split-section items-start">
          <div>
            <p className="eyebrow">Auch bei schwachem Empfang</p>
            <h2 className="section-title">
              Wissen, was
              <br />
              offline bereitliegt.
            </h2>
            <p className="section-intro">
              Bereits geladene Daten und ausgewählte Texteingaben können auf dem
              Gerät verfügbar bleiben. Der Synchronisierungsstatus zeigt, ob
              noch etwas übertragen werden muss.
            </p>
            <Link
              href="/hilfe/mobile-offline-synchronisierung"
              className="text-link mt-6"
            >
              Offline-Nutzung richtig vorbereiten
            </Link>
          </div>
          <div className="soft-panel">
            <h3 className="text-2xl font-semibold">
              Vor dem Baustelleneinsatz
            </h3>
            <ul className="rule-list mb-0">
              <li>
                <Check />
                <span>Relevante Projekte mit Verbindung öffnen und laden.</span>
              </li>
              <li>
                <Check />
                <span>Standortfreigabe für Timer und Unterschriften prüfen.</span>
              </li>
              <li>
                <Check />
                <span>
                  Karten, Routen, Fotos, KI und neue Downloads benötigen Verbindung.
                </span>
              </li>
              <li>
                <Check />
                <span>
                  Nach dem Einsatz offene Übertragungen kontrollieren.
                </span>
              </li>
            </ul>
            <p className="text-sm text-ink-600 mt-5">
              Welche Aktionen möglich sind, hängt von Rolle, geladenen Daten und
              Verbindung ab. Nicht alle Inhalte stehen vollständig offline
              bereit.
            </p>
          </div>
        </div>
      </section>
      <TrialCta />
    </>
  );
}
