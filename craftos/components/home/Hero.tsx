'use client'

import { useEffect, useState } from 'react'
import { CtaButton, GhostButton, Eyebrow } from '@/components/ui/primitives'

/**
 * Hammer-Hero: Ein Amber-Linework-Hammer schlägt auf das Wort „Papierkram" —
 * die Buchstaben zerspringen, Funken sprühen, der Claim erscheint.
 * prefers-reduced-motion: statische Version mit Amber-Bruchlinie.
 */

const WORD = 'Papierkram'

// Deterministische Streuung pro Buchstabe (kein Math.random → SSR-stabil)
const SCATTER = [
  { x: -38, y: 62, r: -42 },
  { x: -22, y: 88, r: 28 },
  { x: -10, y: 54, r: -18 },
  { x: 6, y: 96, r: 38 },
  { x: 14, y: 70, r: -30 },
  { x: 26, y: 104, r: 18 },
  { x: 34, y: 58, r: -44 },
  { x: 44, y: 92, r: 32 },
  { x: 54, y: 66, r: -22 },
  { x: 66, y: 100, r: 46 },
]

const SPARKS = [
  { x: -46, y: -34, s: 5, d: 0 },
  { x: 38, y: -48, s: 4, d: 40 },
  { x: -18, y: -56, s: 3, d: 20 },
  { x: 58, y: -18, s: 5, d: 60 },
  { x: -60, y: -10, s: 3, d: 80 },
  { x: 22, y: -30, s: 6, d: 10 },
  { x: -34, y: -46, s: 4, d: 50 },
  { x: 48, y: -40, s: 3, d: 30 },
]

export function Hero() {
  // 'idle' → Hammer holt aus · 'smash' → Einschlag · 'settled' → Ruhe
  const [phase, setPhase] = useState<'idle' | 'smash' | 'settled'>('idle')
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setPhase('settled')
      return
    }
    const t1 = setTimeout(() => setPhase('smash'), 650)
    const t2 = setTimeout(() => setPhase('settled'), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const smashed = phase === 'smash' || phase === 'settled'

  return (
    <section className="relative overflow-hidden bg-ink-950 text-ink-900">
      <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
      {/* Werkstatt-Licht */}
      <div
        className="absolute -top-44 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #f2af38 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up flex justify-center">
            <Eyebrow tone="light">Handwerkersoftware · Made in Germany</Eyebrow>
          </div>

          {/* Headline mit Hammer-Moment */}
          <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
            <span className="block">Schluss mit</span>
            <span className="sr-only">{WORD}</span>
            <span className="relative mt-1 inline-block" aria-hidden="true">
              {/* Das Wort — Buchstabe für Buchstabe */}
              {WORD.split('').map((ch, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block will-change-transform"
                  style={
                    smashed
                      ? {
                          transform: `translate(${SCATTER[i].x * 0.7}px, ${SCATTER[i].y * 0.38}px) rotate(${SCATTER[i].r}deg) scale(0.92)`,
                          opacity: 0.3,
                          transition: reduced
                            ? 'none'
                            : `transform 0.55s cubic-bezier(0.3, 0.9, 0.4, 1) ${i * 18}ms, opacity 0.5s ease ${i * 18}ms, filter 0.5s ease`,
                        }
                      : undefined
                  }
                >
                  {ch}
                </span>
              ))}

              {/* Amber-Bruchlinie über dem zerschlagenen Wort */}
              <svg
                className="pointer-events-none absolute left-0 top-1/2 w-full"
                viewBox="0 0 400 40"
                fill="none"
                aria-hidden="true"
                style={{
                  opacity: smashed ? 1 : 0,
                  transition: reduced ? 'none' : 'opacity 0.3s ease 0.15s',
                }}
              >
                <path
                  d="M0 22 L60 18 L95 26 L140 14 L180 24 L225 12 L265 25 L310 16 L355 23 L400 18"
                  stroke="#f2af38"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Funken beim Einschlag */}
              {!reduced && (
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2"
                  aria-hidden="true"
                >
                  {SPARKS.map((s, i) => (
                    <span
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: s.s,
                        height: s.s,
                        background: '#ffc438',
                        boxShadow: '0 0 8px 2px rgba(255,196,56,0.5)',
                        transform: smashed
                          ? `translate(${s.x * 1.6}px, ${s.y * 1.6}px) scale(0.2)`
                          : 'translate(0,0) scale(1)',
                        opacity: smashed ? 0 : phase === 'idle' ? 0 : 1,
                        transition: `transform 0.7s cubic-bezier(0.2,0.8,0.3,1) ${s.d}ms, opacity 0.65s ease ${s.d + 120}ms`,
                      }}
                    />
                  ))}
                </span>
              )}

              {/* Der Hammer (Amber-Linework), Drehpunkt am Stielende rechts oben */}
              {!reduced && phase !== 'settled' && (
                <svg
                  className="pointer-events-none absolute -right-8 -top-16 h-24 w-24 sm:-right-14 sm:-top-24 sm:h-36 sm:w-36"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transformOrigin: '88% 12%',
                    transform: phase === 'smash' ? 'rotate(52deg)' : 'rotate(-38deg)',
                    transition:
                      phase === 'smash'
                        ? 'transform 0.16s cubic-bezier(0.6, 0, 1, 0.4)'
                        : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  {/* Stiel */}
                  <path d="M84 16 L38 62" stroke="#f2af38" strokeWidth="5" strokeLinecap="round" />
                  {/* Kopf */}
                  <path
                    d="M22 46 L44 68 L36 76 Q30 82 24 76 L14 66 Q8 60 14 54 Z"
                    fill="#f2af38"
                    stroke="#ffc438"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </h1>

          {/* CSS-Animation statt JS-State: bleibt auch ohne JavaScript sichtbar */}
          <p
            className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl"
            style={{ animationDelay: '1.4s' }}
          >
            CraftOS ist das Betriebssystem für Handwerksbetriebe: Angebot, Rechnung,
            Plantafel, Zeiterfassung, Lager und KI — ein System statt sieben Insellösungen.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '1.55s' }}
          >
            <CtaButton className="w-full sm:w-auto">14 Tage kostenlos testen</CtaButton>
            <GhostButton href="/funktionen" className="w-full sm:w-auto">
              Funktionen entdecken
            </GhostButton>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ animationDelay: '1.7s' }}
          >
            {[
              'DSGVO-konform · EU-Hosting',
              'E-Rechnung (XRechnung)',
              'iOS & Android App',
              'DATEV-Export',
            ].map((t) => (
              <span key={t} className="spec-label text-[0.62rem] text-ink-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="anriss anriss-amber relative" aria-hidden="true" />
    </section>
  )
}
