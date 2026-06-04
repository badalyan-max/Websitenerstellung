import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/lib/site'

/** Mono Spec-Label (Eyebrow) – Datenblatt-Optik */
export function Eyebrow({
  children,
  className,
  tone = 'primary',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'primary' | 'node' | 'light'
}) {
  const colors = {
    primary: 'text-primary-600',
    node: 'text-node-500',
    light: 'text-node-300',
  }
  return (
    <span className={cn('spec-label inline-flex items-center gap-2', colors[tone], className)}>
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-current" aria-hidden="true" />
      {children}
    </span>
  )
}

/** Abschnitts-Überschrift */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone === 'light' ? 'light' : 'primary'} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-[2.75rem]',
          tone === 'light' ? 'text-white' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            tone === 'light' ? 'text-ink-300' : 'text-ink-600',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

/** Hexagon-gerahmtes Icon – greift das Logo-Motiv auf */
export function HexIcon({
  icon: Icon,
  className,
  tone = 'primary',
}: {
  icon: LucideIcon
  className?: string
  tone?: 'primary' | 'node' | 'cta'
}) {
  const tones = {
    primary: 'text-primary-600 bg-primary-50 ring-primary-100',
    node: 'text-node-600 bg-node-300/15 ring-node-300/30',
    cta: 'text-cta bg-cta/10 ring-cta/20',
  }
  return (
    <span
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center ring-1',
        tones[tone],
        className,
      )}
      style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </span>
  )
}

/** Primärer CTA-Button (Link) */
export function CtaButton({
  href = site.ctaUrl,
  children = 'Kostenlos testen',
  className,
}: {
  href?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'btn-cta inline-flex items-center justify-center gap-1.5 rounded-xl px-6 py-3.5 text-base font-semibold',
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-4.5 w-4.5" strokeWidth={2.5} />
    </a>
  )
}

/** Sekundärer Button (Link) */
export function GhostButton({
  href,
  children,
  tone = 'dark',
  className,
}: {
  href: string
  children: React.ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-xl border px-6 py-3.5 text-base font-semibold transition-colors',
        tone === 'light'
          ? 'border-ink-700 text-ink-100 hover:bg-ink-800'
          : 'border-ink-300 text-ink-800 hover:border-ink-400 hover:bg-white',
        className,
      )}
    >
      {children}
    </a>
  )
}
