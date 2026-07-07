'use client'

import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

// Positionen wie im echten Editor (Beschreibung · Menge · Einheit · EP · GP)
const POOL = [
  { id: 1, text: 'Steckdose UP inkl. Anschluss', menge: 8, einheit: 'Stück', ep: 38.5 },
  { id: 2, text: 'Leitung NYM-J 3×1,5 verlegen', menge: 45, einheit: 'm', ep: 4.2 },
  { id: 3, text: 'Kleinverteiler 2-reihig montieren', menge: 1, einheit: 'Stück', ep: 289.0 },
] as const

const eur = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'

export function AngebotDemo({ className }: { className?: string }) {
  const [added, setAdded] = useState<number[]>([])

  const netto = POOL.filter((p) => added.includes(p.id)).reduce((s, p) => s + p.menge * p.ep, 0)
  const mwst = netto * 0.19

  return (
    <DemoFrame title="Angebot AN-2026-0142" badge="Entwurf" className={className}>
      <p className="mb-3 text-xs text-ink-400">
        Tippen Sie Positionen an, um sie ins Angebot zu übernehmen:
      </p>

      {/* Positions-Pool (Leistungsvorlagen) */}
      <div className="flex flex-col gap-2">
        {POOL.map((p) => {
          const isAdded = added.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                setAdded((a) => (isAdded ? a.filter((x) => x !== p.id) : [...a, p.id]))
              }
              className={cn(
                'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all duration-200',
                isAdded
                  ? 'border-primary-500/50 bg-primary-500/10'
                  : 'border-ink-200 bg-ink-150 hover:border-ink-300',
              )}
              aria-pressed={isAdded}
            >
              <span
                className={cn(
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors',
                  isAdded
                    ? 'border-primary-500 bg-primary-500 text-[#1c1507]'
                    : 'border-ink-300 text-transparent',
                )}
              >
                {isAdded ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink-800">{p.text}</span>
                <span className="block font-mono text-[0.68rem] text-ink-400">
                  {p.menge.toLocaleString('de-DE')} {p.einheit} × {eur(p.ep)}
                </span>
              </span>
              <span className="font-mono text-sm tabular-nums text-ink-700">
                {eur(p.menge * p.ep)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Summenblock — Wortlaut wie im echten Editor */}
      <div className="mt-4 ml-auto max-w-[15rem] space-y-1.5 border-t border-ink-200 pt-3 text-sm">
        <div className="flex justify-between text-ink-500">
          <span>Zwischensumme (netto):</span>
          <span className="font-mono tabular-nums transition-all">{eur(netto)}</span>
        </div>
        <div className="flex justify-between text-ink-500">
          <span>MwSt. 19&nbsp;%:</span>
          <span className="font-mono tabular-nums">{eur(mwst)}</span>
        </div>
        <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-semibold text-ink-900">
          <span>Bruttobetrag:</span>
          <span className={cn('font-mono tabular-nums', netto > 0 && 'text-primary-400')}>
            {eur(netto + mwst)}
          </span>
        </div>
      </div>

      {added.length === POOL.length && (
        <p className="mt-3 text-right text-xs font-medium text-success">
          ✓ Angebot fertig — in der App jetzt: PDF, E-Mail oder Kundenportal
        </p>
      )}
    </DemoFrame>
  )
}
