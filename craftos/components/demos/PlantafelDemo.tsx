'use client'

import { useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

// Wochenansicht wie die echte Plantafel: Zeilen = Mitarbeiter, Spalten = Tage
const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr'] as const
const CREW = [
  { name: 'M. Weber', dot: 'bg-blue-500' },
  { name: 'K. Yilmaz', dot: 'bg-green-500' },
] as const

export function PlantafelDemo({ className }: { className?: string }) {
  // Einsatz liegt anfangs "unplatziert" unter dem Board
  const [placed, setPlaced] = useState<{ row: number; col: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const cellFromPoint = (clientX: number, clientY: number) => {
    const el = boardRef.current
    if (!el) return null
    const cells = el.querySelectorAll<HTMLElement>('[data-cell]')
    for (const c of cells) {
      const r = c.getBoundingClientRect()
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
        const [row, col] = c.dataset.cell!.split('-').map(Number)
        return { row, col }
      }
    }
    return null
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setHover(cellFromPoint(e.clientX, e.clientY))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return
    const cell = cellFromPoint(e.clientX, e.clientY)
    if (cell) setPlaced(cell)
    setDragging(false)
    setHover(null)
  }

  const chip = (
    <div
      role="button"
      tabIndex={0}
      aria-label="Einsatz Baustelle Müller – per Ziehen auf einen Tag planen"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setPlaced(placed ? null : { row: 0, col: 2 })
        }
      }}
      className={cn(
        'cursor-grab touch-none select-none rounded-md border-l-[3px] border-l-primary-500 bg-primary-500/15 px-2.5 py-1.5 transition-shadow',
        dragging && 'cursor-grabbing shadow-[0_8px_24px_-6px_rgba(242,175,56,0.4)]',
      )}
    >
      <span className="block text-[0.78rem] font-semibold leading-tight text-ink-900">
        Baustelle Müller
      </span>
      <span className="flex items-center gap-1 font-mono text-[0.62rem] tabular-nums text-ink-500">
        07:00–16:00
        <MapPin className="h-2.5 w-2.5" />
      </span>
    </div>
  )

  return (
    <DemoFrame title="Plantafel · KW 28" badge="Wochenansicht" className={className}>
      <p className="mb-3 text-xs text-ink-400">
        Ziehen Sie den Einsatz auf einen Tag (oder Enter drücken):
      </p>

      <div ref={boardRef} className="overflow-hidden rounded-lg border border-ink-200">
        {/* Kopfzeile */}
        <div className="grid grid-cols-[5.5rem_repeat(5,1fr)] border-b border-ink-200 bg-ink-150">
          <div className="px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-400">
            Mitarbeiter
          </div>
          {TAGE.map((t) => (
            <div
              key={t}
              className="border-l border-ink-200 px-2 py-1.5 text-center font-mono text-[0.65rem] text-ink-500"
            >
              {t}
            </div>
          ))}
        </div>
        {/* Zeilen */}
        {CREW.map((m, row) => (
          <div
            key={m.name}
            className="grid min-h-[3.4rem] grid-cols-[5.5rem_repeat(5,1fr)] border-b border-ink-200 last:border-b-0"
          >
            <div className="flex items-center gap-1.5 px-2 py-2">
              <span className={cn('h-2 w-2 flex-shrink-0 rounded-full', m.dot)} />
              <span className="truncate text-xs font-medium text-ink-700">{m.name}</span>
            </div>
            {TAGE.map((_, col) => {
              const isHover = hover?.row === row && hover?.col === col
              const isPlaced = placed?.row === row && placed?.col === col
              return (
                <div
                  key={col}
                  data-cell={`${row}-${col}`}
                  className={cn(
                    'border-l border-ink-200 p-1 transition-colors',
                    isHover && 'bg-primary-500/20 ring-1 ring-inset ring-primary-500',
                  )}
                >
                  {isPlaced && chip}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Unplatzierter Einsatz */}
      {!placed ? (
        <div className="mt-3 flex items-center gap-3">
          <div className="w-40">{chip}</div>
          <span className="text-xs text-ink-400">← greifen &amp; ziehen</span>
        </div>
      ) : (
        <p className="mt-3 text-xs font-medium text-success">
          ✓ Eingeplant — {CREW[placed.row].name} bekommt sofort eine Push-Nachricht aufs Handy
        </p>
      )}
    </DemoFrame>
  )
}
