import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/lib/site'

/** Mono Spec-Label (Eyebrow) – Anriss-Strich in Amber, Werkstatt-Datenblatt */
export function Eyebrow({
  children,
  className,
  tone = 'primary',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'primary' | 'node' | 'light' | 'muted'
}) {
  const colors = {
    primary: 'text-primary-500',
    node: 'text-primary-500',
    light: 'text-primary-400',
    muted: 'text-ink-400',
  }
  return (
    <span className={cn('spec-label inline-flex items-center gap-2.5', colors[tone], className)}>
      <span className="inline-block h-px w-6 bg-current" aria-hidden="true" />
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
        <Eyebrow tone="primary" className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.08] text-ink-900 sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-500">{intro}</p>}
    </div>
  )
}

/** Hexagon-gerahmtes Icon – greift das C-im-Hexagon-Logo auf */
export function HexIcon({
  icon: Icon,
  className,
  tone = 'primary',
}: {
  icon: LucideIcon
  className?: string
  tone?: 'primary' | 'node' | 'cta' | 'muted'
}) {
  const tones = {
    primary: 'text-primary-400 bg-primary-500/10',
    node: 'text-primary-400 bg-primary-500/10',
    cta: 'text-primary-400 bg-primary-500/15',
    muted: 'text-ink-500 bg-ink-200/40',
  }
  return (
    <span
      className={cn('inline-flex h-12 w-12 items-center justify-center', tones[tone], className)}
      style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </span>
  )
}

/** Primärer CTA-Button (Link) – Amber-Gradient, dunkler Text */
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

/** Sekundärer Button (Link) – dünner Border auf dunkler Fläche */
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
        'inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink-200 px-6 py-3.5 text-base font-semibold text-ink-800 transition-colors hover:border-primary-500/50 hover:text-ink-900',
        className,
      )}
    >
      {children}
    </a>
  )
}

/** Status-Badge für Feature-Tiers: heute / launch / vision */
export function TierBadge({ tier }: { tier: 'heute' | 'launch' | 'vision' }) {
  const map = {
    heute: { label: 'Schon heute', cls: 'bg-success/10 text-success border-success/25' },
    launch: { label: 'Kommt zum Launch', cls: 'bg-primary-500/10 text-primary-400 border-primary-500/25' },
    vision: { label: 'Vision', cls: 'bg-ink-200/40 text-ink-500 border-ink-300/50' },
  }
  const { label, cls } = map[tier]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider',
        cls,
      )}
    >
      {label}
    </span>
  )
}
