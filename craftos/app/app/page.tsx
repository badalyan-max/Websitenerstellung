import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Camera, Ruler, FolderKanban } from "lucide-react";
import { site } from "@/lib/site";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { MobileAppGallery } from "@/components/ui/MobileAppGallery";
import { pageMetadata } from "@/lib/metadata";
import { ProductDemo } from "@/components/product-demo/ProductDemo";
import { TrialCta } from "@/components/ui/TrialCta";
export const metadata = pageMetadata(
  "Mobile-App für Handwerker – in der Voll-Lizenz inklusive",
  "CraftOS auf der Baustelle: Zeiten, Projekte, Aufmaß und Berichte auf dem Handy. Die Voll-Lizenz enthält die Mobile-App für dieselbe Person.",
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
              Projekte dabei haben. Zeiten direkt erfassen. Leistungen
              festhalten, solange sie noch frisch im Kopf sind.
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
                "Zeiten mit Projektbezug",
                "Arbeit und Fahrt erfassen, Einträge prüfen und dem Projekt zuordnen.",
                "/hilfe/mobilen-timer-bedienen",
              ],
              [
                FolderKanban,
                "Projekte und Einsätze",
                "Freigegebene Projekte, Kundendaten und geplante Einsätze nachsehen.",
                "/hilfe/projekt-phasen-anlegen",
              ],
              [
                Ruler,
                "Aufmaß vor Ort",
                "Raum- und Messdaten beim Projekt festhalten und für Angebote verwenden.",
                "/hilfe/raumaufmass-angebot-uebernehmen",
              ],
              [
                Camera,
                "Leistungen dokumentieren",
                "Berichte, Fotos, Mängel und Abnahmen vor Ort bearbeiten.",
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
        <div className="site-container">
          <p className="eyebrow">Büro und Baustelle im selben Ablauf</p>
          <h2 className="section-title mb-10">Geplant. Erfasst. Zugeordnet.</h2>
          <ProductDemo initialScene="planung" />
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
                <span>Standortberechtigung für den mobilen Timer prüfen.</span>
              </li>
              <li>
                <Check />
                <span>
                  Fotos, KI und neue Downloads benötigen eine Verbindung.
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
