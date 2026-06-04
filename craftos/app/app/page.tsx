import type { Metadata } from 'next'
import {
  Fingerprint,
  Camera,
  Bell,
  WifiOff,
  Clock,
  FolderKanban,
  Apple,
  Play,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { HexIcon, SectionHeading } from '@/components/ui/primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'CraftOS Mobile – die Handwerker-App für iOS & Android',
  description:
    'Die CraftOS-App bringt Projekte, Zeiterfassung und Dokumentation direkt auf die Baustelle. Mit Face ID, Kamera, Push-Benachrichtigungen und Offline-Fähigkeit – für iOS und Android.',
  alternates: { canonical: `${site.url}/app` },
}

const nativeFeatures = [
  { icon: Fingerprint, title: 'Face ID & Touch ID', desc: 'Sicherer, schneller Login per biometrischer Authentifizierung.' },
  { icon: Camera, title: 'Kamera-Integration', desc: 'Projektfotos in hoher Qualität direkt aufnehmen und zuordnen.' },
  { icon: Bell, title: 'Push-Benachrichtigungen', desc: 'Keine wichtige Aufgabe oder Nachricht mehr verpassen.' },
  { icon: WifiOff, title: 'Offline-fähig', desc: 'Auch ohne Empfang weiterarbeiten – Daten synchronisieren später.' },
  { icon: Clock, title: 'Zeiterfassung vor Ort', desc: 'Zeiten per Timer oder Sprache direkt auf der Baustelle erfassen.' },
  { icon: FolderKanban, title: 'Zugewiesene Projekte', desc: 'Monteure sehen genau ihre Aufträge, Aufgaben und Dokumente.' },
]

export default function AppPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'App', path: '/app' },
        ])}
      />
      <PageHero
        eyebrow="CraftOS Mobile"
        title="Das Büro in der Hosentasche"
        intro="Die App für iOS und Android verbindet Baustelle und Büro in Echtzeit. Erfassen Sie Zeiten, Fotos und Dokumente genau dort, wo die Arbeit passiert."
      />

      {/* App Showcase */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="flex justify-center gap-5">
              <Phone tilt="-rotate-3" screen="home" />
              <Phone tilt="rotate-3 translate-y-6" screen="time" />
            </div>
            <div>
              <SectionHeading
                eyebrow="Gebaut für die Baustelle"
                title="Eine App, die mit anpackt"
                intro="Dieselben Daten wie im Büro – nur mobil und auf das Wesentliche reduziert. Was der Monteur draußen erfasst, ist sofort im Büro sichtbar."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <StoreBadge store="apple" />
                <StoreBadge store="google" />
              </div>
              <p className="mt-4 font-mono text-xs text-ink-400">
                In Kürze in den Stores · com.craftconnectbuddy.app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Native Features */}
      <section className="border-t border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading
            align="center"
            eyebrow="Native Funktionen"
            title="Mehr als nur die Web-App im Kleinformat"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nativeFeatures.map((f) => (
              <article key={f.title} className="card-hover rounded-2xl border border-ink-200 bg-white p-7">
                <HexIcon icon={f.icon} />
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sicherheit */}
      <section className="bg-ink-950 text-white">
        <div className="bg-blueprint-dark mask-fade absolute" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <p className="spec-label justify-center text-node-400">Sicherheit &amp; Datenschutz</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Ihre Daten bleiben geschützt
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-300">
            Ende-zu-Ende-verschlüsselte Übertragung, Speicherung auf EU-Servern, DSGVO-konform
            und biometrische Authentifizierung für maximale Sicherheit – auch unterwegs.
          </p>
          <div className="mt-8">
            <a
              href={site.ctaUrl}
              className="btn-cta inline-flex items-center justify-center rounded-xl px-7 py-4 text-base font-semibold"
            >
              Jetzt kostenlos starten
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function StoreBadge({ store }: { store: 'apple' | 'google' }) {
  const isApple = store === 'apple'
  return (
    <span className="inline-flex items-center gap-3 rounded-xl bg-ink-900 px-5 py-3 text-white">
      {isApple ? <Apple className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
          {isApple ? 'Bald im' : 'Bald bei'}
        </span>
        <span className="text-sm font-bold">{isApple ? 'App Store' : 'Google Play'}</span>
      </span>
    </span>
  )
}

function Phone({ tilt, screen }: { tilt: string; screen: 'home' | 'time' }) {
  return (
    <div className={`relative w-full max-w-[210px] rounded-[2.2rem] border-[6px] border-ink-900 bg-ink-900 shadow-2xl transition-transform ${tilt}`}>
      <div className="overflow-hidden rounded-[1.7rem] bg-ink-950">
        <div className="bg-blueprint-dark p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-ink-500">09:41</span>
            <span className="h-1.5 w-9 rounded-full bg-ink-700" />
          </div>
          {screen === 'home' ? (
            <>
              <p className="spec-label mt-5 text-node-400">// Projekte</p>
              <div className="mt-3 space-y-2.5">
                {[['Bad Müller', 'läuft'], ['Dach Weber', 'offen'], ['Büro Schmitt', 'fertig']].map(
                  ([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-lg border border-ink-800 bg-ink-900/70 px-3 py-2.5">
                      <span className="text-xs font-medium text-ink-100">{a}</span>
                      <span className="font-mono text-[9px] text-node-400">{b}</span>
                    </div>
                  ),
                )}
              </div>
            </>
          ) : (
            <>
              <p className="spec-label mt-5 text-node-400">// Zeiterfassung</p>
              <div className="mt-4 rounded-xl border border-ink-800 bg-ink-900/70 p-4 text-center">
                <p className="font-mono text-3xl font-bold text-white">02:14</p>
                <p className="mt-1 text-[10px] text-ink-400">Bad Müller · Fliesen</p>
              </div>
              <div className="mt-4 rounded-lg bg-cta px-3 py-2.5 text-center text-xs font-bold text-white">
                Stopp &amp; Speichern
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
