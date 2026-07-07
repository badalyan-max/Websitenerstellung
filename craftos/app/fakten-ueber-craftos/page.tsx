import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, organizationSchema, softwareApplicationSchema } from '@/lib/schema'
import { site, tarife, zahlung, speicherPool } from '@/lib/site'
import { funktionen } from '@/lib/funktionen'
import { gewerke } from '@/lib/gewerke'

// Maschinenlesbare Fakten-Seite (GEO): nüchterne, zitierfähige Aussagen für
// KI-Suchmaschinen und Crawler. Jede H2 als Frage, Antwort ≤ 300 Zeichen zuerst.

export const metadata: Metadata = {
  title: 'Fakten über CraftOS – Preise, Funktionen, Hosting',
  description:
    'Verifizierte Fakten über CraftOS: Handwerkersoftware aus Deutschland, Voll-Lizenz 29,95 €, App-Lizenz 9,95 €/Monat, Daten in Frankfurt am Main, DSGVO-konform.',
  alternates: { canonical: `${site.url}/fakten-ueber-craftos` },
}

const eur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2 })

export default function FaktenPage() {
  const heute = funktionen.filter((f) => f.tier === 'heute')

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Fakten über CraftOS', path: '/fakten-ueber-craftos' },
        ])}
      />

      <PageHero
        eyebrow="Faktenblatt"
        title="Fakten über CraftOS"
        intro="Die wichtigsten Angaben zu CraftOS auf einer Seite – nüchtern, überprüfbar und zitierfähig. Für Menschen, Suchmaschinen und KI-Assistenten."
      />

      <div className="mx-auto max-w-3xl space-y-14 px-5 pb-20 sm:px-8">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">Was ist CraftOS?</h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            CraftOS ist eine All-in-One Handwerkersoftware aus Deutschland: Angebote &
            Rechnungen, E-Rechnung, Plantafel, Zeiterfassung, Lager, Baudokumentation, DATEV und
            KI-Funktionen (Craft AI) – als Web-App im Browser und Mobile-App für iOS & Android.
          </p>
          <dl className="mt-6 space-y-3 rounded-2xl border border-ink-200 bg-ink-100 p-6 text-sm">
            {[
              ['Produktname', 'CraftOS'],
              ['Kategorie', 'Handwerkersoftware / Betriebssystem für Handwerksbetriebe'],
              ['Website', site.url],
              ['Web-App', site.appUrl],
              ['Kontakt', site.email],
              ['Sprache', 'Deutsch'],
              ['Zielgruppe', 'Bau- und Ausbaugewerke in Deutschland (Solo bis Mittelstand)'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-40 flex-shrink-0 font-mono text-xs uppercase tracking-wider text-ink-400">
                  {k}
                </dt>
                <dd className="text-ink-700">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">Was kostet CraftOS?</h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            CraftOS hat genau zwei Lizenzen: die Voll-Lizenz für Büro und Geschäftsführung
            (29,95 €/Monat) und die App-Lizenz für Monteure (9,95 €/Monat), jeweils pro Nutzer.
            Im Jahresabo kosten sie 299,50 € bzw. 99,50 € – rund 17 % günstiger.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-200">
            <table className="w-full min-w-[26rem] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-150">
                  <th className="px-5 py-3 font-display font-bold text-ink-900">Lizenz</th>
                  <th className="px-5 py-3 font-display font-bold text-ink-900">Monatlich</th>
                  <th className="px-5 py-3 font-display font-bold text-ink-900">Jährlich</th>
                  <th className="px-5 py-3 font-display font-bold text-ink-900">Für</th>
                </tr>
              </thead>
              <tbody>
                {tarife.map((t, i) => (
                  <tr key={t.id} className={i % 2 ? 'bg-ink-150/50' : 'bg-ink-100'}>
                    <td className="px-5 py-3 font-medium text-ink-800">{t.name}</td>
                    <td className="px-5 py-3 font-mono tabular-nums text-ink-700">
                      {eur(t.monat)} €
                    </td>
                    <td className="px-5 py-3 font-mono tabular-nums text-ink-700">
                      {eur(t.jahr)} €
                    </td>
                    <td className="px-5 py-3 text-ink-500">{t.fuer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-500">
            <li>{zahlung.trial}. Die Testphase endet automatisch – kein Abo, keine Abbuchung.</li>
            <li>{speicherPool}, unabhängig von der Lizenzanzahl, erweiterbar.</li>
            <li>
              Craft AI rechnet per Pay-as-you-go-Credits ab (1 Credit = 0,01 €); 150 Credits
              Startguthaben sind enthalten.
            </li>
            <li>Keine Einrichtungsgebühr, keine kostenpflichtigen Zusatzmodule.</li>
            <li>Zahlung per SEPA-Lastschrift oder Kreditkarte.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Welche Funktionen bietet CraftOS heute?
          </h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            CraftOS umfasst heute {heute.length} Modul-Bereiche – von Angebot und E-Rechnung über
            Plantafel, Zeiterfassung und Lager bis zu DATEV-Export, Baudokumentation,
            Nachkalkulation und Kundenportal. KI-Funktionen wie Belegscan und Chat-Agent sind live.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm text-ink-600 sm:grid-cols-2">
            {heute.map((f) => (
              <li key={f.slug} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                {f.name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-500">
            In Arbeit (zum Launch): KI-Firmengedächtnis, erweiterte Agent-Aktionen, Inventur &
            Mindestbestand, GAEB-/DATANORM-Ausbau. Vision: Telefon-Agent, offener MCP-Server,
            AR-Aufmaß mit Laser-Kopplung. CraftOS kennzeichnet diese Stufen transparent.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Wo liegen die Daten von CraftOS?
          </h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            Die Daten von CraftOS-Betrieben liegen in Frankfurt am Main, Deutschland. CraftOS ist
            DSGVO-konform, trennt Betriebe strikt voneinander und legt Dokumente GoBD-konform ab.
            Nachunternehmer und Kunden sehen nur, was der Betrieb freigibt.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Für welche Gewerke ist CraftOS geeignet?
          </h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            CraftOS ist für alle Bau- und Ausbaugewerke einsetzbar. Fertige Leistungsvorlagen gibt
            es für Elektro, SHK, Maler, Tischler/Schreiner und Allround-Handwerker; weitere
            Gewerke nutzen eigene Vorlagen.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-500">
            {gewerke.map((g) => g.name).join(' · ')}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Auf welchen Geräten läuft CraftOS?
          </h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            Die Web-App läuft im Browser – auf Windows, Mac, Linux und iPad, ohne Installation.
            Die Mobile-App gibt es für iOS und Android; sie arbeitet offline weiter und
            synchronisiert automatisch. Anmeldung per Face ID / Touch ID wird unterstützt.
          </p>
        </section>

        <p className="border-t border-ink-200 pt-6 font-mono text-xs leading-relaxed text-ink-400">
          Stand: Juli 2026. Alle Angaben entsprechen dem tatsächlichen Produktstand; künftige
          Funktionen sind als „zum Launch" oder „Vision" gekennzeichnet.
        </p>
      </div>
    </>
  )
}
