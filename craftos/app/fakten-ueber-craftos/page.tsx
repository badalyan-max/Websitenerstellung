import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { funktionen } from "@/lib/funktionen";
import { annualSavingPercent, site, tarife } from "@/lib/site";
const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
const saving = Math.round(annualSavingPercent);
function lizenz(id: (typeof tarife)[number]["id"]) {
  const tarif = tarife.find((t) => t.id === id);
  if (!tarif) throw new Error("Unbekannte Lizenz: " + id);
  return tarif;
}
const voll = lizenz("voll");
const app = lizenz("app");
export const metadata = pageMetadata(
  "Fakten über CraftOS: Funktionen, Lizenzen und Verfügbarkeit",
  `Überprüfbare Produktinformationen zu CraftOS: Web-App, Mobile-App, Lizenzen, ${site.trialDays} Testtage, GoBD-Unterstützung und klar benannte Grenzen.`,
  "/fakten-ueber-craftos",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Produktinformationen"
        title="CraftOS in klaren Fakten."
        intro="Eine Übersicht für Betriebe, Redaktionen und alle, die Funktionsumfang und Verfügbarkeit nachvollziehen möchten."
      />
      <section className="section-space">
        <div className="site-container max-w-5xl">
          <dl className="divide-y divide-ink-200 border-y border-ink-200">
            {[
              [
                "Produkt",
                "CraftOS ist eine deutschsprachige Software für die Organisation von Handwerksbetrieben.",
              ],
              [
                "Plattformen",
                "Web-App im Browser und Mobile-App. iOS im App Store und Android bei Google Play.",
              ],
              [
                voll.name,
                `${euro.format(voll.monat)} netto pro Person und Monat oder ${euro.format(voll.jahr)} netto pro Jahr (rund ${saving} % günstiger). Web-App und Mobile-App für dieselbe Person sind enthalten.`,
              ],
              [
                app.name,
                `${euro.format(app.monat)} netto pro Person und Monat oder ${euro.format(app.jahr)} netto pro Jahr (rund ${saving} % günstiger). Ergänzung für Mitarbeitende auf der Baustelle; der Betrieb benötigt mindestens eine ${voll.name}.`,
              ],
              [
                "Testphase",
                "10 Tage ohne Zahlungsdaten. Ein kostenpflichtiges Abo wird aktiv gewählt.",
              ],
              [
                "Module",
                "Die freigegebenen Kernmodule einschließlich Plantafel gehören zur Voll-Lizenz. Rollen und Rechte begrenzen den individuellen Zugriff. KI-Verbrauch und zusätzlicher Speicher können gesondert kosten.",
              ],
              [
                "GoBD-Unterstützung",
                "Rechnungsfestschreibung, geschützte Inhalte, Dokumentversionen, Storno-Bezüge und Belegprüfung mit Sperre und Protokollen unterstützen nachvollziehbare Abläufe. Die Organisation des betrieblichen Gesamtverfahrens bleibt erforderlich.",
              ],
              [
                "Offline-Nutzung",
                "Bereits geladene mobile Daten und ausgewählte Eingaben; keine vollständige Offline-Zusage für Fotos, KI oder neue Downloads.",
              ],
              [
                "GPS-Zeiterfassung",
                "Die Mobile-App speichert beim Starten und Stoppen des Timers jeweils einen Standortpunkt mit Genauigkeit. Die Web-App zeigt diese Orte am Zeiteintrag. Es werden keine Bewegungsverläufe aufgezeichnet.",
              ],
              [
                "Automatische Projektzuordnung",
                "Beim mobilen Timerstart wird das nächstgelegene zugängliche Projekt innerhalb des eingestellten Radius zugeordnet. Dafür braucht das Projekt gespeicherte Koordinaten. Eine ausdrückliche Projektwahl hat Vorrang; neue mobile Nachträge für Arbeit oder Fahrt erhalten eine änderbare Vorauswahl.",
              ],
              [
                "Einsatzkarte",
                "Die Web-App zeigt geplante Einsatzorte mit Tages- und Mitarbeiterfilter. Mobile Mitarbeiter öffnen den Zielort und die Navigation am Einsatz. Die Karte zeigt keine aktuellen Aufenthaltsorte des Teams.",
              ],
              [
                "Unterschriften mit Standort",
                "Mobile Unterschriften in Berichten, Abnahmen und unterstützten Kundendokumenten werden mit Ort und Zeitpunkt gespeichert und sind in App und Web nachvollziehbar. Die Bestätigung benötigt eine Standortfreigabe und eine ermittelbare Position.",
              ],
              [
                "KI",
                "Abfragen und unterstützte Entwürfe. Schreibende Übernahme nach Prüfung und Bestätigung, kein pauschales autonomes Verbuchen.",
              ],
            ].map(([k, v]) => (
              <div className="grid md:grid-cols-[200px_1fr] gap-3 py-6" key={k}>
                <dt className="font-semibold">{k}</dt>
                <dd className="text-ink-600 leading-7">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="text-3xl font-semibold mt-14 mb-7">
            Funktionsbereiche
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {funktionen.map((f) => (
              <Link
                href={"/funktionen/" + f.slug}
                key={f.slug}
                className="border-b border-ink-200 py-4 text-link"
              >
                {f.name}
              </Link>
            ))}
          </div>
          <p className="notice mt-10">
            Portal-Onlinezahlungen werden nicht als verfügbar angeboten.
            DATANORM-v5-Kompatibilität, automatische ELSTER-Übermittlung und
            vollständig autonome Buchhaltung werden nicht zugesagt.
          </p>
          <p className="text-sm text-ink-600 mt-8">
            Stand: 20. Oktober 2026.{" "}
            <Link className="text-link" href="/gobd">
              GoBD im Detail
            </Link>{" "}
            ·{" "}
            <Link className="text-link" href="/preise">
              Preisdetails
            </Link>{" "}
            ·{" "}
            <a href={"mailto:" + site.email} className="text-link">
              Korrektur melden
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
