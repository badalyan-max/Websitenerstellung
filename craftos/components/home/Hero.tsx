'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CtaButton, GhostButton, Eyebrow } from '@/components/ui/primitives'
import { heroWerkbank } from '@/lib/images'

/**
 * Hammer-Hero v2: Ein massiver Hammer schlägt von oben auf „Papierkram." —
 * das Wort bricht entlang eines Risses in zwei Teile, Amber-Glut leuchtet im
 * Spalt, Funken und Papierfetzen fliegen, die Headline erzittert.
 *
 * Ohne JS / reduced-motion: das Wort steht ganz bzw. gebrochen — beides lesbar.
 */

const WORD = 'Papierkram.'

// Bruchlinie in % der Wortbox — Basis für Clip-Pfade UND Glut-Linie
const CRACK = '0,58 11,50 21,63 33,46 44,60 55,45 65,62 77,48 87,60 100,52'
const CLIP_UPPER =
  'polygon(0% 0%, 100% 0%, 100% 52%, 87% 60%, 77% 48%, 65% 62%, 55% 45%, 44% 60%, 33% 46%, 21% 63%, 11% 50%, 0% 58%)'
const CLIP_LOWER =
  'polygon(0% 58%, 11% 50%, 21% 63%, 33% 46%, 44% 60%, 55% 45%, 65% 62%, 77% 48%, 87% 60%, 100% 52%, 100% 100%, 0% 100%)'

// Amber-Funken: fliegen vom Einschlagpunkt nach oben/außen (deterministisch)
const SPARKS = [
  { x: -78, y: -52, s: 5, d: 0 },
  { x: -44, y: -84, s: 3, d: 30 },
  { x: -18, y: -66, s: 6, d: 10 },
  { x: 14, y: -90, s: 4, d: 50 },
  { x: 42, y: -70, s: 3, d: 20 },
  { x: 74, y: -48, s: 5, d: 40 },
  { x: 96, y: -26, s: 3, d: 60 },
  { x: -96, y: -22, s: 4, d: 55 },
]

// Papierfetzen: flattern nach unten/außen
const SCRAPS = [
  { x: -70, y: 58, r: 210, d: 0 },
  { x: -34, y: 82, r: -160, d: 40 },
  { x: 6, y: 92, r: 120, d: 20 },
  { x: 44, y: 76, r: -220, d: 60 },
  { x: 82, y: 52, r: 170, d: 30 },
  { x: -100, y: 34, r: -120, d: 70 },
  { x: 108, y: 30, r: 140, d: 50 },
]

type Phase = 'ready' | 'strike' | 'impact' | 'settled'

export function Hero() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // QA-Hook: ?hero=ready|strike|impact|settled friert die Phase ein
    const pose = new URLSearchParams(window.location.search).get('hero') as Phase | null
    if (pose && ['ready', 'strike', 'impact', 'settled'].includes(pose)) {
      setPhase(pose)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('settled')
      return
    }
    const t1 = setTimeout(() => setPhase('strike'), 480)
    const t2 = setTimeout(() => setPhase('impact'), 650)
    const t3 = setTimeout(() => setPhase('settled'), 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const cracked = phase === 'impact' || phase === 'settled'
  const hammerDown = phase === 'strike' || phase === 'impact'

  return (
    <section className="relative overflow-hidden bg-ink-950 text-ink-900">
      {/* Werkstatt-Foto als Bühne (dekorativ) */}
      <Image
        src={heroWerkbank.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-ink-950"
        aria-hidden="true"
      />
      <div className="bg-werkbank mask-fade absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up flex justify-center">
            <Eyebrow tone="light">Handwerkersoftware · Made in Germany</Eyebrow>
          </div>

          {/* Headline mit Hammer-Moment */}
          <h1
            className={
              'mt-8 font-display font-bold leading-none tracking-tight text-ink-900' +
              (phase === 'impact' ? ' animate-impact-shake' : '')
            }
          >
            <span className="block text-2xl font-semibold text-ink-500 sm:text-4xl">
              Schluss mit
            </span>
            <span className="sr-only">{WORD}</span>

            <span
              className="relative mt-2 inline-block text-[2.65rem] min-[420px]:text-[3rem] sm:text-8xl lg:text-[7rem]"
              aria-hidden="true"
            >
              {/* Unsichtbarer Platzhalter hält die Layout-Größe */}
              <span className="invisible">{WORD}</span>

              {/* Glut im Riss — liegt HINTER den Bruchstücken, wird im Spalt sichtbar */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{
                  opacity: cracked ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                }}
              >
                <polyline
                  points={CRACK}
                  fill="none"
                  stroke="#f2af38"
                  strokeWidth="7"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  style={{ filter: 'blur(6px)', opacity: 0.55 }}
                />
                <polyline
                  points={CRACK}
                  fill="none"
                  stroke="#ffc438"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Oberes Bruchstück */}
              <span
                className="absolute inset-0 will-change-transform"
                style={{
                  clipPath: CLIP_UPPER,
                  transform: cracked ? 'translate(-3px, -5px) rotate(-0.9deg)' : 'none',
                  transition: 'transform 0.22s cubic-bezier(0.25, 1.2, 0.4, 1)',
                }}
              >
                {WORD}
              </span>

              {/* Unteres Bruchstück — sackt ab */}
              <span
                className="absolute inset-0 will-change-transform"
                style={{
                  clipPath: CLIP_LOWER,
                  transform: cracked ? 'translate(4px, 10px) rotate(1.2deg)' : 'none',
                  transition: 'transform 0.26s cubic-bezier(0.3, 1.3, 0.4, 1)',
                }}
              >
                {WORD}
              </span>

              {/* Einschlag-Blitz */}
              {mounted && phase !== 'settled' && (
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,244,214,0.95) 0%, rgba(242,175,56,0.5) 35%, transparent 70%)',
                    transform: cracked
                      ? 'translate(-50%, -50%) scale(1.9)'
                      : 'translate(-50%, -50%) scale(0.2)',
                    opacity: phase === 'impact' ? undefined : 0,
                    animation:
                      phase === 'impact' ? 'impact-flash 0.4s ease-out forwards' : 'none',
                    transition: 'transform 0.35s ease-out',
                  }}
                />
              )}

              {/* Funken + Papierfetzen */}
              {mounted && (
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2"
                  aria-hidden="true"
                >
                  {SPARKS.map((s, i) => (
                    <span
                      key={`sp-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: s.s,
                        height: s.s,
                        background: '#ffc438',
                        boxShadow: '0 0 10px 2px rgba(255,196,56,0.6)',
                        transform: cracked
                          ? `translate(${s.x * 1.5}px, ${s.y * 1.5}px) scale(0.15)`
                          : 'translate(0,0) scale(1)',
                        opacity: phase === 'impact' ? 1 : 0,
                        transition: `transform 0.75s cubic-bezier(0.15,0.8,0.3,1) ${s.d}ms, opacity ${
                          phase === 'impact' ? '0.05s ease 0ms' : `0.45s ease ${s.d + 200}ms`
                        }`,
                      }}
                    />
                  ))}
                  {SCRAPS.map((p, i) => (
                    <span
                      key={`sc-${i}`}
                      className="absolute"
                      style={{
                        width: 3,
                        height: 9,
                        borderRadius: 1,
                        background: 'rgba(244,244,245,0.75)',
                        transform: cracked
                          ? `translate(${p.x * 1.4}px, ${p.y * 1.4}px) rotate(${p.r}deg)`
                          : 'translate(0,0) rotate(0deg)',
                        opacity: phase === 'impact' ? 1 : 0,
                        transition: `transform 0.9s cubic-bezier(0.2,0.7,0.4,1) ${p.d}ms, opacity ${
                          phase === 'impact' ? '0.05s ease 0ms' : `0.5s ease ${p.d + 250}ms`
                        }`,
                      }}
                    />
                  ))}
                </span>
              )}

              {/* Der Hammer — Überkopf-Schwung (176°) um den Griff am oberen Stielende */}
              {mounted && (
                <svg
                  className="pointer-events-none absolute -top-[4.5rem] left-1/2 h-36 w-36 sm:-top-28 sm:h-56 sm:w-56"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transformOrigin: '86% 14%',
                    transform: hammerDown
                      ? 'translateX(-38%) rotate(4deg)'
                      : phase === 'settled'
                        ? 'translateX(-38%) rotate(-30deg)'
                        : 'translateX(-38%) rotate(-172deg)',
                    opacity: phase === 'settled' ? 0 : 1,
                    transition:
                      phase === 'strike' || phase === 'impact'
                        ? 'transform 0.17s cubic-bezier(0.55, 0, 1, 0.45)'
                        : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease',
                  }}
                >
                  <defs>
                    <linearGradient id="heroWood" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#a06a32" />
                      <stop offset="1" stopColor="#5c3c1e" />
                    </linearGradient>
                    <linearGradient id="heroSteel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#6b6b74" />
                      <stop offset="0.5" stopColor="#44444c" />
                      <stop offset="1" stopColor="#2b2b31" />
                    </linearGradient>
                  </defs>
                  {/* Stiel */}
                  <path
                    d="M170 30 L84 116"
                    stroke="url(#heroWood)"
                    strokeWidth="13"
                    strokeLinecap="round"
                  />
                  {/* Griffwicklung */}
                  <path
                    d="M158 42 L143 57"
                    stroke="#3d2814"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Kopf: massiver Stahlblock quer zum Stiel */}
                  <g transform="rotate(45 66 134)">
                    <rect x="20" y="116" width="92" height="36" rx="6" fill="url(#heroSteel)" />
                    {/* Schlagbahn (unten, trifft das Wort) */}
                    <rect x="14" y="112" width="14" height="44" rx="4" fill="#7c7c86" />
                    {/* Finne */}
                    <path d="M112 122 L136 128 Q140 134 136 140 L112 146 Z" fill="#38383f" />
                    {/* Amber-Kantenlicht auf der Schlagseite */}
                    <path
                      d="M16 154 L110 154"
                      stroke="#f2af38"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>
                </svg>
              )}
            </span>
          </h1>

          {/* CSS-Animation statt JS-State: bleibt auch ohne JavaScript sichtbar */}
          <p
            className="animate-fade-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl"
            style={{ animationDelay: '1.05s' }}
          >
            CraftOS ist das Betriebssystem für Handwerksbetriebe: Angebot, Rechnung,
            Plantafel, Zeiterfassung, Lager und KI — ein System statt sieben Insellösungen.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '1.2s' }}
          >
            <CtaButton className="w-full sm:w-auto">14 Tage kostenlos testen</CtaButton>
            <GhostButton href="/funktionen" className="w-full sm:w-auto">
              Funktionen entdecken
            </GhostButton>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ animationDelay: '1.35s' }}
          >
            {[
              'DSGVO-konform · Daten in Deutschland',
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
