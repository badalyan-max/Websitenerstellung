'use client'

import { useState } from 'react'
import { ScanBarcode, AlertTriangle, ArrowDownToLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

// Bestandszeilen wie die echte BestandSection: Lager · Material · Menge
interface Zeile {
  lager: string
  material: string
  menge: number
  einheit: string
  min: number
}
const START: Zeile[] = [
  { lager: 'Hauptlager', material: 'NYM-J 3×1,5 (Ring 100 m)', menge: 6, einheit: 'Ring', min: 2 },
  { lager: 'Bus 1', material: 'Steckdose UP reinweiß', menge: 14, einheit: 'Stück', min: 10 },
]

export function LagerDemo({ className }: { className?: string }) {
  const [bestand, setBestand] = useState(START.map((r) => ({ ...r })))
  const [scanning, setScanning] = useState(false)

  const unterMin = bestand.filter((r) => r.menge < r.min).length

  const ausbuchen = () => {
    if (scanning) return
    setScanning(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTimeout(
      () => {
        setBestand((rows) =>
          rows.map((r, i) => (i === 1 ? { ...r, menge: Math.max(r.menge - 6, 0) } : r)),
        )
        setScanning(false)
      },
      reduced ? 50 : 900,
    )
  }

  return (
    <DemoFrame title="Lager · Bestand" badge="Materialwirtschaft" className={className}>
      {/* Kopf mit Mindestbestand-Warnung */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-400">
          Alle Lager
        </span>
        {unterMin > 0 && (
          <span className="inline-flex animate-fade-up items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 font-mono text-[0.62rem] font-medium text-destructive">
            <AlertTriangle className="h-3 w-3" />
            {unterMin} unter Mindestbestand
          </span>
        )}
      </div>

      {/* Bestandstabelle */}
      <div className="overflow-hidden rounded-lg border border-ink-200">
        <div className="grid grid-cols-[1fr_1.6fr_auto] gap-2 border-b border-ink-200 bg-ink-150 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-400">
          <span>Lager</span>
          <span>Material</span>
          <span className="text-right">Menge</span>
        </div>
        {bestand.map((r, i) => {
          const low = r.menge < r.min
          return (
            <div
              key={r.material}
              className={cn(
                'grid grid-cols-[1fr_1.6fr_auto] items-center gap-2 px-3 py-2.5',
                i > 0 && 'border-t border-ink-200',
              )}
            >
              <span className="truncate text-xs text-ink-500">{r.lager}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-ink-800">
                  {r.material}
                </span>
                {low && (
                  <span className="inline-flex items-center gap-1 font-mono text-[0.58rem] font-medium text-destructive">
                    <AlertTriangle className="h-2.5 w-2.5" /> Mindestbestand
                  </span>
                )}
              </span>
              <span
                className={cn(
                  'font-mono text-sm tabular-nums transition-colors',
                  low ? 'text-destructive' : 'text-ink-700',
                )}
              >
                {r.menge} {r.einheit}
              </span>
            </div>
          )
        })}
      </div>

      {/* Warenausgang-Aktion */}
      <button
        type="button"
        onClick={ausbuchen}
        disabled={scanning || bestand[1].menge < 6}
        className={cn(
          'mt-3 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-ink-200 bg-ink-150 px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-primary-500/50 disabled:cursor-default disabled:opacity-60',
        )}
      >
        {scanning ? (
          <>
            <ScanBarcode className="h-4 w-4 animate-ember text-primary-400" />
            Scanne Lieferschein …
          </>
        ) : (
          <>
            <ArrowDownToLine className="h-4 w-4 text-primary-400" />
            Warenausgang: 6 Steckdosen → Auftrag Müller
          </>
        )}
      </button>

      <p className="mt-3 text-xs text-ink-400">
        Jeder Ausgang ist <span className="text-ink-600">auftragsgebunden</span> — die
        Nachkalkulation aktualisiert sich in Echtzeit.
      </p>
    </DemoFrame>
  )
}
