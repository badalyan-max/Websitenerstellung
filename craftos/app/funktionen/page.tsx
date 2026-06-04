import type { Metadata } from 'next'
import {
  FolderKanban,
  Users,
  FileText,
  Clock,
  CalendarRange,
  HardHat,
  Package,
  Receipt,
  BarChart3,
  DoorOpen,
  Building2,
  FileSpreadsheet,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { HexIcon, CtaButton, Eyebrow } from '@/components/ui/primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Funktionen – Projekte, Dokumente, Zeiterfassung & mehr',
  description:
    'Alle Funktionen von CraftOS: Projektverwaltung, Kunden, 9 Dokumenttypen mit MwSt. & §13b, Zeiterfassung, Plantafel, Team & Nachunternehmer, DATEV-Export und Kundenportal.',
  alternates: { canonical: `${site.url}/funktionen` },
}

const groups = [
  {
    icon: FolderKanban,
    title: 'Projektverwaltung',
    points: [
      'Zentrale Projektübersicht mit Status, Suche & Filter',
      'Projektdetails: Timeline, Dokumente, Ausgaben, Nachrichten',
      'Individuelle Projektstatus: Anfrage → Angebot → Auftrag → Abgeschlossen',
      'Anlagen, Ausgaben-Tracking und interne Notizen je Projekt',
    ],
  },
  {
    icon: Users,
    title: 'Kundenverwaltung',
    points: [
      'Zentrale Kundendatenbank mit Adressen & Kontaktdaten',
      'Komplette Historie: Projekte, Dokumente, Interaktionen',
      'Schnellanlage direkt aus dem Projekt heraus',
      'Mehrere Projekte pro Kunde verknüpfen',
    ],
  },
  {
    icon: FileText,
    title: '9 Dokumenttypen',
    points: [
      'Angebot, Auftragsbestätigung & Rechnung',
      'Abschlag & Schlussrechnung (VOB-konform)',
      'Lieferschein, Gutschrift, Storno & Brief',
      'PDF-Export, MwSt., §13b Reverse-Charge & GiroCode-QR',
    ],
  },
  {
    icon: Clock,
    title: 'Zeiterfassung',
    points: [
      'Timer zum Starten/Stoppen in Echtzeit',
      'Manuelle Einträge mit Datum, Dauer & Beschreibung',
      'Projektbezogene Erfassung für korrekte Abrechnung',
      'Spracheingabe per Diktat – ideal für die Baustelle',
    ],
  },
  {
    icon: CalendarRange,
    title: 'Plantafel',
    points: [
      'Visuelle Einsatzplanung per Drag-and-drop',
      'Tages-, Wochen- und Monatsansicht',
      'Team & Nachunternehmer gemeinsam einplanen',
      'Konflikt-Erkennung bei Überschneidungen',
    ],
  },
  {
    icon: HardHat,
    title: 'Team & Nachunternehmer',
    points: [
      'Mitarbeiterprofile mit Rollen (Admin, Büro, App)',
      'Rollenbasierte Rechte & Lohngruppen',
      'Nachunternehmer-Register nach Gewerk',
      'Eigenes Portal für Nachunternehmer & Kunden',
    ],
  },
  {
    icon: Package,
    title: 'Leistungs- & Artikelkatalog',
    points: [
      'Standard-Leistungen mit Beschreibung & Preis',
      'Artikel, Material & Inventar zentral pflegen',
      'Schnellauswahl beim Erstellen von Dokumenten',
      'Aufschläge & Rabatte nach Gewerk',
    ],
  },
  {
    icon: Receipt,
    title: 'Buchhaltung & DATEV',
    points: [
      'DATEV-Export für die Steuerberatung',
      'Buchungsjournal aller Transaktionen',
      'Eingangsrechnungen von Lieferanten verwalten',
      'Bank- & Steuerdaten zentral hinterlegt',
    ],
  },
  {
    icon: BarChart3,
    title: 'Berichte & Analysen',
    points: [
      'Umsatztrends & Cashflow im Blick',
      'Auswertungen zu Projekten & Zeiten',
      'Prognosen zu Auslastung & Fertigstellung',
      'Anpassbares Dashboard mit Widgets',
    ],
  },
]

const more = [
  { icon: DoorOpen, title: 'Kundenportal', desc: 'Kunden sehen Angebote, Rechnungen & Termine, geben Angebote frei.' },
  { icon: Building2, title: 'Mehrere Standorte', desc: 'Filialen & Baustellen als Standorte, mit standortbezogenen Filtern.' },
  { icon: FileSpreadsheet, title: 'Briefpapier & Vorlagen', desc: 'Logo, Layout & Textbausteine für ein einheitliches Erscheinungsbild.' },
]

export default function FunktionenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Funktionen', path: '/funktionen' },
        ])}
      />
      <PageHero
        eyebrow="Funktionen"
        title="Ein System für den gesamten Betrieb"
        intro="Von der ersten Anfrage bis zur Schlussrechnung – CraftOS bildet den kompletten Arbeitsalltag im Handwerk ab. Hier ist alles im Überblick."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <article key={g.title} className="card-hover rounded-2xl border border-ink-200 bg-white p-7">
                <HexIcon icon={g.icon} />
                <h2 className="mt-5 font-display text-xl font-bold text-ink-900">{g.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-primary-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {more.map((m) => (
              <div key={m.title} className="rounded-2xl border border-ink-200 bg-ink-50 p-7">
                <HexIcon icon={m.icon} tone="node" />
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <Eyebrow tone="primary" className="justify-center">
            Bereit?
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Sehen Sie CraftOS in Aktion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">
            Testen Sie alle Funktionen kostenlos oder erkunden Sie die Live-Demo mit
            Beispieldaten.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaButton />
            <a
              href={site.demoUrl}
              className="inline-flex items-center justify-center rounded-xl border border-ink-300 px-6 py-3.5 text-base font-semibold text-ink-800 transition-colors hover:bg-white"
            >
              Live-Demo ansehen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
