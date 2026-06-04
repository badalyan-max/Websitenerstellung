import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'
import { site } from '@/lib/site'
import { Eyebrow } from '@/components/ui/primitives'

const stats = [
  { value: '9', label: 'Dokumenttypen' },
  { value: '6', label: 'KI-Funktionen' },
  { value: '1', label: 'System statt 5 Tools' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Blueprint-Raster */}
      <div className="bg-blueprint-dark mask-fade absolute inset-0" aria-hidden="true" />
      {/* Indigo-Glow */}
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Cyan-Node-Akzent */}
      <div
        className="absolute right-[12%] top-1/3 h-72 w-72 rounded-full opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Linke Spalte */}
          <div>
            <div className="animate-fade-up">
              <Eyebrow tone="light">Handwerkersoftware · Made in Germany</Eyebrow>
            </div>

            <h1 className="animate-fade-up delay-1 mt-6 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
              Das Betriebssystem
              <br />
              für{' '}
              <span className="relative whitespace-nowrap text-node-400">
                Handwerks&shy;betriebe
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-node-400/60"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C75 3 225 3 298 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="animate-fade-up delay-2 mt-7 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl">
              Projekte, Kunden, Angebote &amp; Rechnungen, Zeiterfassung und Plantafel –
              alles in einem System. Mit Craft AI, die aus Fotos, PDFs und Sprache fertige
              Angebote macht.
            </p>

            <div className="animate-fade-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.ctaUrl}
                className="btn-cta inline-flex items-center justify-center gap-1.5 rounded-xl px-7 py-4 text-base font-semibold"
              >
                Kostenlos testen
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
              </a>
              <a
                href={site.demoUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-700 bg-ink-900/60 px-7 py-4 text-base font-semibold text-ink-100 backdrop-blur transition-colors hover:border-ink-500 hover:bg-ink-800"
              >
                Live-Demo ansehen
              </a>
            </div>

            <div className="animate-fade-up delay-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-400">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" /> DSGVO-konform, EU-Hosting
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-node-400" /> Keine Einrichtungsgebühr
              </span>
            </div>
          </div>

          {/* Rechte Spalte – "OS"-Panel */}
          <div className="animate-fade-up delay-3 relative">
            <OsPanel />
          </div>
        </div>

        {/* Statistik-Leiste */}
        <dl className="animate-fade-up delay-5 mt-20 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800/40">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-950/60 px-5 py-6 text-center sm:px-8">
              <dt className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-ink-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/** Stilisiertes Produkt-Panel im "Datenblatt"-Look */
function OsPanel() {
  const modules = [
    { name: 'Projekte', status: 'aktiv', accent: 'node' },
    { name: 'Angebot → Rechnung', status: 'live', accent: 'primary' },
    { name: 'Zeiterfassung', status: 'läuft', accent: 'node' },
    { name: 'Plantafel', status: 'geplant', accent: 'primary' },
  ]
  return (
    <div className="relative rounded-2xl border border-ink-700/80 bg-gradient-to-b from-ink-900 to-ink-950 p-2 shadow-2xl">
      {/* Fensterleiste */}
      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="ml-3 font-mono text-[11px] text-ink-500">app.craftos.eu</span>
      </div>

      <div className="rounded-xl border border-ink-800 bg-ink-950/80 p-5">
        <p className="spec-label text-node-400">// System-Übersicht</p>
        <div className="mt-4 space-y-2.5">
          {modules.map((m, i) => (
            <div
              key={m.name}
              className="flex items-center justify-between rounded-lg border border-ink-800 bg-ink-900/60 px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm font-medium text-ink-100">
                <span
                  className={
                    m.accent === 'node'
                      ? 'h-2 w-2 rotate-45 bg-node-400'
                      : 'h-2 w-2 rotate-45 bg-primary-400'
                  }
                />
                {m.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">
                {m.status}
              </span>
            </div>
          ))}
        </div>

        {/* KI-Zeile */}
        <div className="mt-4 rounded-lg border border-node-500/30 bg-node-500/10 px-4 py-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-node-300">
            <Sparkles className="h-4 w-4" /> Craft AI
          </p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-400">
            Foto erkannt → Aufmaß erstellt → Angebot generiert (6 Credits)
          </p>
        </div>
      </div>
    </div>
  )
}
