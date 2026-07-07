'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Square, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

interface Eintrag {
  projekt: string
  zeitraum: string
  stunden: string
}

export function ZeitenDemo({ className }: { className?: string }) {
  const [running, setRunning] = useState(false)
  const [sek, setSek] = useState(0)
  const [eintraege, setEintraege] = useState<Eintrag[]>([
    { projekt: 'Baustelle Müller', zeitraum: '07:30–12:00', stunden: '4,5 h' },
  ])
  const [extraSek, setExtraSek] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => setSek((s) => s + 1), 1000)
    } else if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [running])

  const stop = () => {
    setRunning(false)
    if (sek > 0) {
      setEintraege((list) => [
        { projekt: 'Umbau Bäckerei Krause', zeitraum: 'gerade eben', stunden: `${Math.max(sek, 1)} Sek.` },
        ...list,
      ])
      setExtraSek((e) => e + Math.max(sek, 1))
      setSek(0)
    }
  }

  const mm = String(Math.floor(sek / 60)).padStart(2, '0')
  const ss = String(sek % 60).padStart(2, '0')

  // Gesamt = 4,5 h Basis-Eintrag + live erfasste Sekunden
  const gesamt =
    (4.5 + extraSek / 3600).toLocaleString('de-DE', { maximumFractionDigits: 2 }) + ' h'

  return (
    <DemoFrame title="Zeiterfassung" badge="Diese Woche" className={className}>
      {/* Schnellerfassung mit Timer */}
      <div className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-ink-150 p-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
            <Briefcase className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink-800">Umbau Bäckerei Krause</p>
            <p className="font-mono text-xs tabular-nums text-ink-400" aria-live="polite">
              {running || sek > 0 ? `${mm}:${ss}` : 'Bereit'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => (running ? stop() : setRunning(true))}
          className={cn(
            'flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200',
            running
              ? 'bg-destructive text-white'
              : 'btn-cta',
          )}
          aria-label={running ? 'Zeiterfassung stoppen' : 'Zeiterfassung starten'}
        >
          {running ? <Square className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </button>
      </div>

      {/* Einträge — Spalten wie in der App: Projekt · Zeitraum · Typ · Stunden */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-400">
            Heute
          </span>
          <span className="font-mono text-[0.62rem] tabular-nums text-ink-400">Gesamt: {gesamt}</span>
        </div>
        <ul className="divide-y divide-ink-200 overflow-hidden rounded-lg border border-ink-200">
          {eintraege.map((e, i) => (
            <li
              key={`${e.projekt}-${i}`}
              className={cn(
                'flex items-center justify-between gap-3 bg-ink-100 px-3 py-2.5',
                i === 0 && eintraege.length > 1 && 'animate-fade-up',
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-800">{e.projekt}</p>
                <p className="font-mono text-[0.65rem] tabular-nums text-ink-400">{e.zeitraum}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="rounded bg-primary-500/15 px-1.5 py-0.5 font-mono text-[0.6rem] font-medium text-primary-400">
                  Arbeit
                </span>
                <span className="font-mono text-sm tabular-nums text-ink-700">{e.stunden}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-ink-400">
        In der App: auch per <span className="text-ink-600">Spracheingabe</span> — „3 Stunden Baustelle Müller" genügt.
      </p>
    </DemoFrame>
  )
}
