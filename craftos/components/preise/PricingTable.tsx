'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { tarife, site, speicherPool } from '@/lib/site'
import { cn } from '@/lib/utils'

// Zwei Spalten: App-Lizenz · Voll-Lizenz. 'admin' = nur mit Admin-Rolle der Voll-Lizenz.
const matrix: { label: string; values: [boolean, boolean | 'admin'] }[] = [
  { label: 'Mobile-App (iOS & Android)', values: [true, true] },
  { label: 'Zeiterfassung (auch per Sprache)', values: [true, true] },
  { label: 'Zugewiesene Projekte & Einsätze', values: [true, true] },
  { label: 'Aufmaß, Berichte & Fotos vor Ort', values: [true, true] },
  { label: 'Web-App (Büro)', values: [false, true] },
  { label: 'Projekte & Kunden verwalten', values: [false, true] },
  { label: 'Angebote, Rechnungen & E-Rechnung', values: [false, true] },
  { label: 'Plantafel & Einsatzplanung', values: [false, true] },
  { label: 'Lager & Materialwirtschaft', values: [false, true] },
  { label: 'Team-, Rechte- & Nachunternehmer-Verwaltung', values: [false, 'admin'] },
  { label: 'Craft AI verwalten (Pay-as-you-go-Credits)', values: [false, 'admin'] },
  { label: 'DATEV-Export, Buchungsjournal & Steuer-Cockpit', values: [false, 'admin'] },
  { label: 'Abo-, Lizenz- & Speicherverwaltung', values: [false, 'admin'] },
]

const eur = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function PricingTable() {
  const [jaehrlich, setJaehrlich] = useState(true)

  return (
    <div>
      {/* Abrechnungs-Wahl: segmentierte Schalter statt Switch */}
      <div
        className="mx-auto flex w-fit rounded-xl border border-ink-200 bg-ink-100 p-1"
        role="group"
        aria-label="Abrechnungszeitraum"
      >
        {(
          [
            { key: true, label: 'Jährlich', hint: '−17 %' },
            { key: false, label: 'Monatlich', hint: null },
          ] as const
        ).map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={jaehrlich === o.key}
            onClick={() => setJaehrlich(o.key)}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200',
              jaehrlich === o.key
                ? 'bg-primary-500 text-[#1c1507] shadow-[0_2px_12px_-2px_rgba(242,175,56,0.5)]'
                : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {o.label}
            {o.hint && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 font-mono text-[0.62rem] font-bold',
                  jaehrlich === o.key ? 'bg-[#1c1507]/15 text-[#1c1507]' : 'bg-success/15 text-success',
                )}
              >
                {o.hint}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Zwei Lizenzmodelle */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {tarife.map((t) => {
          const preis = jaehrlich ? t.jahr / 12 : t.monat
          const voll = t.id === 'voll'
          return (
            <div
              key={t.id}
              className={cn(
                'relative flex flex-col rounded-2xl bg-ink-100 p-8',
                voll
                  ? 'border-2 border-primary-500 shadow-[0_20px_60px_-20px_rgba(242,175,56,0.25)]'
                  : 'border border-ink-200',
              )}
            >
              {t.badge && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1c1507]">
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-ink-900">{t.name}</h3>
              <p className="mt-1 text-sm text-ink-400">{t.fuer}</p>
              <p className="mt-6 flex items-baseline gap-2.5">
                {jaehrlich && (
                  <span className="font-mono text-lg tabular-nums text-ink-400 line-through decoration-ink-300">
                    {eur(t.monat)} €
                  </span>
                )}
                <span className="font-display text-5xl font-bold tabular-nums text-ink-900">
                  {eur(preis)} €
                </span>
                <span className="text-base font-medium text-ink-400">/Monat</span>
              </p>
              <p className="mt-1.5 font-mono text-xs text-ink-400">
                {jaehrlich
                  ? `${eur(t.jahr)} €/Jahr · pro Nutzer · 2 Monate geschenkt`
                  : 'pro Nutzer · monatlich kündbar'}
              </p>

              <a
                href={site.ctaUrl}
                className={cn(
                  'mt-7 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors',
                  voll
                    ? 'btn-cta'
                    : 'border border-ink-300 text-ink-800 hover:border-primary-500/50 hover:text-ink-900',
                )}
              >
                Kostenlos testen
              </a>

              <ul className="mt-7 space-y-3 border-t border-ink-200 pt-7">
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <Check
                      className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-success"
                      strokeWidth={2.5}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-ink-400">
        {speicherPool} — unabhängig von der Lizenzanzahl, jederzeit erweiterbar.
      </p>

      {/* Vergleichstabelle */}
      <div className="mt-16 overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-150">
              <th className="px-5 py-4 font-display text-base font-bold text-ink-900">Funktion</th>
              {tarife.map((t) => (
                <th
                  key={t.id}
                  className={cn(
                    'px-5 py-4 text-center font-display text-base font-bold text-ink-900',
                    t.id === 'voll' &&
                      'border-t-2 border-primary-500 bg-primary-500/[0.08] text-primary-300',
                  )}
                >
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={row.label} className={i % 2 ? 'bg-ink-150/50' : 'bg-ink-100'}>
                <td className="px-5 py-3.5 font-medium text-ink-600">{row.label}</td>
                {row.values.map((v, j) => (
                  <td
                    key={j}
                    className={cn('px-5 py-3.5 text-center', j === 1 && 'bg-primary-500/[0.06]')}
                  >
                    {v === 'admin' ? (
                      <span className="rounded bg-primary-500/12 px-1.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-primary-400">
                        Admin-Rolle
                      </span>
                    ) : v ? (
                      <Check className="mx-auto h-5 w-5 text-success" strokeWidth={2.5} />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-ink-300" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-xs leading-relaxed text-ink-400">
        Admin-Rolle: Jede Voll-Lizenz läuft als Büro- oder Admin-Rolle — Sie stellen es in der
        Lizenzverwaltung um. Mindestens eine Admin-Rolle pro Betrieb.
      </p>
    </div>
  )
}
