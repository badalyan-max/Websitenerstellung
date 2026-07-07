import type { Metadata } from 'next'
import {
  Fingerprint,
  Camera,
  Bell,
  WifiOff,
  Clock,
  Ruler,
  ClipboardCheck,
  ScanLine,
  MapPin,
  PenLine,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  CtaButton,
  GhostButton,
  HexIcon,
  SectionHeading,
} from '@/components/ui/primitives'
import { ZeitenDemo } from '@/components/demos/ZeitenDemo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mobile-App – Die Baustelle in der Tasche (iOS & Android)',
  description:
    'Die CraftOS Mobile-App: Zeiterfassung, Bautagesberichte, Aufmaß, Mängel & Abnahme – offline-fähig, mit Face ID und Push. Für iOS und Android.',
  alternates: { canonical: `${site.url}/app` },
}

const nativeFeatures = [
  {
    icon: WifiOff,
    title: 'Offline-fähig',
    desc: 'Kein Netz im Keller? Egal. Die App arbeitet weiter und synchronisiert automatisch, sobald Verbindung besteht.',
  },
  {
    icon: Clock,
    title: 'Zeiterfassung',
    desc: 'Arbeits- und Fahrtzeiten buchen – auch per Spracheingabe. Jede Stunde landet am richtigen Projekt.',
  },
  {
    icon: Ruler,
    title: 'Aufmaß vor Ort',
    desc: 'Räume und Flächen mit Abzügen erfassen – die Maße fließen direkt ins Angebot.',
  },
  {
    icon: PenLine,
    title: 'Bautagesberichte',
    desc: 'Wetter, Leistung, Fotos und die Unterschrift des Kunden – rechtssicher mit GPS und Zeitstempel.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mängel & Abnahme',
    desc: 'Mängel fotografieren und verfolgen, Abnahmeprotokolle direkt am Gerät unterschreiben lassen.',
  },
  {
    icon: ScanLine,
    title: 'Belege scannen',
    desc: 'Tankquittung oder Materialrechnung abfotografieren – die KI liest sie aus und legt sie richtig ab.',
  },
  {
    icon: Camera,
    title: 'Baustellenfotos',
    desc: 'Fotos landen automatisch komprimiert in der richtigen Projektakte – nie wieder WhatsApp-Chaos.',
  },
  {
    icon: Fingerprint,
    title: 'Face ID / Touch ID',
    desc: 'Sicher angemeldet in einer Sekunde – ohne Passwort-Tipperei mit Arbeitshandschuhen.',
  },
  {
    icon: Bell,
    title: 'Push-Benachrichtigungen',
    desc: 'Neuer Einsatz, geänderte Planung, Urlaubsfreigabe – das Team weiß sofort Bescheid.',
  },
]

const faqItems = [
  {
    q: 'Für welche Geräte gibt es die CraftOS-App?',
    a: 'Die CraftOS-App gibt es für iOS (App Store) und Android (Google Play). Sie ist die Companion-App zur Web-App – Monteure brauchen nur die günstige App-Lizenz.',
  },
  {
    q: 'Funktioniert die App ohne Internet?',
    a: 'Ja. Zeiten, Berichte und Fotos werden offline erfasst und automatisch synchronisiert, sobald wieder Verbindung besteht.',
  },
  {
    q: 'Was sehen Monteure in der App?',
    a: 'Genau das, was sie brauchen: ihre zugewiesenen Einsätze und Projekte, Zeiterfassung, Urlaub, Berichte und Dokumente – keine Preise, keine Kalkulation (steuerbar über Rollen).',
  },
  {
    q: 'Kostet die App extra?',
    a: 'Die App ist Teil jeder Lizenz. Reine App-Nutzer (Monteure) zahlen nur 9,95 € pro Monat – die Voll-Lizenz enthält Web und App.',
  },
]

export default function AppPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Mobile-App', path: '/app' },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />

      <PageHero
        eyebrow="Mobile-App · iOS & Android"
        title={
          <>
            Die Baustelle hat jetzt
            <br />
            <span className="text-primary-400">ein Büro in der Tasche</span>
          </>
        }
        intro="Zeiten, Fotos, Berichte, Aufmaß, Mängel und Abnahmen – direkt vor Ort erfasst statt abends abgetippt. Offline-fähig, mit Face ID und Push."
      />

      {/* Demo + GPS-Hinweis */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Direkt ausprobieren"
                title="So schnell ist eine Stunde gebucht"
                intro="Starten Sie den Timer – genau so fühlt sich die Zeiterfassung in der App an. Auf der Baustelle geht es sogar schneller: per Spracheingabe."
              />
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-ink-200 bg-ink-100 p-5">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                <p className="text-sm leading-relaxed text-ink-500">
                  <span className="font-semibold text-ink-700">Mit GPS-Kontext:</span> Einsätze,
                  Fahrten und Berichte kennen ihren Ort – für lückenlose Dokumentation und
                  automatische Zuordnung.
                </p>
              </div>
            </div>
            <ZeitenDemo />
          </div>
        </div>
      </section>

      <div className="anriss mx-auto max-w-7xl" aria-hidden="true" />

      {/* Native Features */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Alles drin"
            title="Gebaut für Hände, die arbeiten"
            intro="Große Touch-Flächen, klare Wege, keine Schnörkel – die App ist für die Baustelle gemacht, nicht fürs Schreibtisch-Demo."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nativeFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <HexIcon icon={f.icon} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Fragen zur App" align="center" className="mb-10" />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Holen Sie die Baustelle ins System
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
            Web-App testen, Team einladen, App aus dem Store laden – in 10 Minuten läuft&apos;s.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>14 Tage kostenlos testen</CtaButton>
            <GhostButton href="/preise">Lizenzen ansehen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
