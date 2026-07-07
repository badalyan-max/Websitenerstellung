'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Check, Coins, SendHorizonal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

// Vorschläge & Wortlaut 1:1 aus dem echten AiAgentPanel
const FRAGEN = [
  {
    q: 'Welche Rechnungen sind überfällig?',
    tools: ['Dokumente', 'Überblick'],
    a: 'Zwei Rechnungen sind überfällig: RE-2026-0131 (Fam. Schneider, 2.380 €, 12 Tage) und RE-2026-0126 (Bäckerei Krause, 940 €, 5 Tage). Soll ich Mahnungen als Entwurf vorbereiten?',
  },
  {
    q: 'Wie viele Projekte habe ich gerade?',
    tools: ['Projekte'],
    a: 'Sie haben 7 aktive Projekte. Am weitesten: „Umbau Bäckerei Krause" (82 %). Zwei Projekte warten auf Angebotsfreigabe durch den Kunden.',
  },
] as const

export function KiChatDemo({ className }: { className?: string }) {
  const [sel, setSel] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const raf = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (sel === null) return
    setTyped('')
    setDone(false)
    const full = FRAGEN[sel].a
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTyped(full)
      setDone(true)
      return
    }
    let i = 0
    raf.current = setInterval(() => {
      i += 3
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        if (raf.current) clearInterval(raf.current)
        setDone(true)
      }
    }, 24)
    return () => {
      if (raf.current) clearInterval(raf.current)
    }
  }, [sel])

  return (
    <DemoFrame title="KI-Assistent" badge="Craft AI" className={className}>
      {/* Header wie im echten Panel */}
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
          <Sparkles className="h-4 w-4" />
        </span>
        <p className="text-xs text-ink-400">
          Antworten aus Projekten, Kunden, Zeiten und Dokumenten
        </p>
      </div>

      {sel === null ? (
        <>
          <p className="mb-2 text-center font-display text-sm font-semibold text-ink-800">
            Was möchtest du wissen?
          </p>
          <div className="flex flex-col gap-2">
            {FRAGEN.map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setSel(i)}
                className="min-h-11 cursor-pointer rounded-xl border border-ink-200 bg-ink-150 px-3.5 py-2.5 text-left text-sm text-ink-700 transition-colors hover:border-primary-500/40 hover:text-ink-900"
              >
                {f.q}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {/* User-Bubble */}
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary-500 px-3 py-2 text-sm font-medium text-[#1c1507]">
            {FRAGEN[sel].q}
          </div>
          {/* Tool-Badges */}
          <div className="flex flex-wrap gap-1.5">
            {FRAGEN[sel].tools.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-[0.62rem] text-ink-500"
              >
                <Check className="h-3 w-3 text-primary-400" strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>
          {/* Assistant-Bubble */}
          <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-ink-200 bg-ink-150 px-3 py-2 text-sm leading-relaxed text-ink-700">
            {typed}
            {!done && <span className="animate-ember text-primary-400">▍</span>}
          </div>
          {done && (
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono text-[0.62rem] text-ink-400">
                <Coins className="h-3 w-3" /> 2 Credits
              </span>
              <button
                type="button"
                onClick={() => setSel(null)}
                className="cursor-pointer text-xs font-medium text-primary-400 hover:text-primary-300"
              >
                Andere Frage stellen →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Eingabezeile (dekorativ, wie die echte) */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 px-3 py-2">
        <span className="flex-1 truncate text-sm text-ink-300">Frag zu deinen Betriebsdaten …</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
          <SendHorizonal className="h-4 w-4" />
        </span>
      </div>
    </DemoFrame>
  )
}
