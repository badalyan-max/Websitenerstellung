'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { tarife, site } from '@/lib/site'
import { cn } from '@/lib/utils'

const matrix: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: 'Mobile-App (iOS & Android)', values: [true, true, true] },
  { label: 'Zeiterfassung', values: [true, true, true] },
  { label: 'Zugewiesene Projekte', values: [true, true, true] },
  { label: 'Web-App (Büro)', values: [false, true, true] },
  { label: 'Projekte & Kunden verwalten', values: [false, true, true] },
  { label: 'Angebote, Rechnungen & Dokumente', values: [false, true, true] },
  { label: 'Plantafel', values: [false, true, true] },
  { label: 'Team-, Rechte- & Nachunternehmer-Verwaltung', values: [false, false, true] },
  { label: 'Craft AI (150 Credits/Monat)', values: [false, false, true] },
  { label: 'DATEV-Export & Buchungsjournal', values: [false, false, true] },
  { label: 'Speicher', values: ['10 GB', '20 GB', '50 GB'] },
]

export function PricingTable() {
  const [jaehrlich, setJaehrlich] = useState(false)

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={cn('text-sm font-semibold', !jaehrlich ? 'text-ink-900' : 'text-ink-400')}>
          Monatlich
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={jaehrlich}
          onClick={() => setJaehrlich((v) => !v)}
          className={cn(
            'relative h-7 w-12 rounded-full transition-colors',
            jaehrlich ? 'bg-primary-600' : 'bg-ink-300',
          )}
        >
          <span
            className={cn(
              'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
              jaehrlich ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
        <span className={cn('text-sm font-semibold', jaehrlich ? 'text-ink-900' : 'text-ink-400')}>
          Jährlich
          <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-xs font-bold text-success">
            −17 % + Speicher
          </span>
        </span>
      </div>

      {/* Karten */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tarife.map((t) => {
          const preis = jaehrlich ? Math.round(t.jahr / 12) : t.monat
          const beliebt = t.id === 'buero'
          return (
            <div
              key={t.id}
              className={cn(
                'relative flex flex-col rounded-2xl bg-white p-8',
                beliebt ? 'border-2 border-primary-500 shadow-xl' : 'border border-ink-200',
              )}
            >
              {t.badge && (
                <span
                  className={cn(
                    'absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide',
                    beliebt ? 'bg-primary-600 text-white' : 'bg-ink-900 font-mono text-node-300',
                  )}
                >
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold text-ink-900">{t.name}</h3>
              <p className="mt-1 text-sm text-ink-500">{t.fuer}</p>
              <p className="mt-6 font-display text-5xl font-extrabold text-ink-900">
                {preis} €
                <span className="text-base font-medium text-ink-500"> /Monat</span>
              </p>
              <p className="mt-1.5 font-mono text-xs text-ink-400">
                {jaehrlich ? `${t.jahr} €/Jahr · pro Nutzer` : `pro Nutzer · monatlich kündbar`}
              </p>

              <a
                href={site.ctaUrl}
                className={cn(
                  'mt-7 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors',
                  beliebt
                    ? 'btn-cta'
                    : 'border border-ink-300 text-ink-800 hover:border-ink-400 hover:bg-ink-50',
                )}
              >
                Kostenlos testen
              </a>

              <ul className="mt-7 space-y-3 border-t border-ink-100 pt-7">
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-success" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Vergleichstabelle */}
      <div className="mt-16 overflow-hidden rounded-2xl border border-ink-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-5 py-4 font-display text-base font-bold text-ink-900">Funktion</th>
              {tarife.map((t) => (
                <th key={t.id} className="px-5 py-4 text-center font-display text-base font-bold text-ink-900">
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={row.label} className={i % 2 ? 'bg-ink-50/50' : 'bg-white'}>
                <td className="px-5 py-3.5 font-medium text-ink-700">{row.label}</td>
                {row.values.map((v, j) => (
                  <td key={j} className="px-5 py-3.5 text-center">
                    {typeof v === 'string' ? (
                      <span className="font-mono text-xs font-semibold text-ink-800">{v}</span>
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
    </div>
  )
}
