import Image from 'next/image'
import { cn } from '@/lib/utils'
import { screenshots, screenshotSlots } from '@/lib/images'

/**
 * Definierter Platz für einen echten App-Screenshot.
 * Rendert das Bild aus lib/images.ts (screenshots), sobald es eingetragen ist —
 * bis dahin einen Werkbank-Platzhalter mit Motiv-Label. Kein Layout-Bruch.
 *
 * Varianten (Inszenierung ohne Browser-Chrome):
 *  - fragment:   schwebendes UI-Kärtchen, dunkle Card mit Border + tiefem Schatten
 *  - tilt-stack: gefächerte Dokument-Mockups, leicht gedreht, mit Tiefe
 *  - phone:      Smartphone-Rahmen für App-Ansichten
 */
export function ScreenshotFrame({
  slot,
  className,
}: {
  /** Key aus screenshotSlots (lib/images.ts) */
  slot: string
  className?: string
}) {
  const def = screenshotSlots[slot]
  if (!def) return null
  const bild = screenshots[slot]

  if (def.variant === 'phone') {
    return (
      <figure
        className={cn(
          'mx-auto w-full max-w-[270px] rounded-[2rem] border border-ink-200 bg-ink-100 p-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]',
          className,
        )}
      >
        <div className="relative aspect-[9/18] overflow-hidden rounded-[1.55rem] border border-ink-200 bg-ink-50">
          {bild ? (
            <Image
              src={bild.src}
              alt={bild.alt}
              fill
              sizes="270px"
              className="object-cover object-top"
            />
          ) : (
            <Platzhalter label={def.label} />
          )}
        </div>
      </figure>
    )
  }

  if (def.variant === 'tilt-stack') {
    return (
      <figure className={cn('relative mx-auto w-full max-w-md px-6 py-8', className)}>
        {/* Gefächerte Blätter hinter dem Dokument */}
        <div
          className="absolute inset-x-10 inset-y-10 rotate-[3.5deg] rounded-lg border border-ink-200 bg-ink-150"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-8 inset-y-9 -rotate-[2deg] rounded-lg border border-ink-200 bg-ink-100"
          aria-hidden="true"
        />
        <div className="relative aspect-[3/4] -rotate-[0.8deg] overflow-hidden rounded-lg border border-ink-200 bg-ink-100 shadow-[0_32px_70px_-28px_rgba(0,0,0,0.8)]">
          {bild ? (
            <Image
              src={bild.src}
              alt={bild.alt}
              fill
              sizes="(max-width: 640px) 90vw, 420px"
              className="object-cover object-top"
            />
          ) : (
            <Platzhalter label={def.label} />
          )}
        </div>
      </figure>
    )
  }

  // fragment (Default): schwebendes UI-Kärtchen
  return (
    <figure
      className={cn(
        'relative w-full overflow-hidden rounded-xl border border-ink-200 bg-ink-100 shadow-[0_28px_70px_-28px_rgba(0,0,0,0.75)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10]">
        {bild ? (
          <Image
            src={bild.src}
            alt={bild.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 620px"
            className="object-cover object-top"
          />
        ) : (
          <Platzhalter label={def.label} />
        )}
      </div>
    </figure>
  )
}

/** Werkbank-Platzhalter: Anriss-Raster, Eckmarken, Motiv-Label */
function Platzhalter({ label }: { label: string }) {
  return (
    <div className="bg-werkbank absolute inset-0 flex items-center justify-center bg-ink-50">
      {/* Amber-Eckmarken wie Anriss-Winkel */}
      {(['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'] as const).map(
        (pos) => (
          <span key={pos} className={cn('absolute h-3.5 w-3.5', pos)} aria-hidden="true">
            <span
              className={cn(
                'absolute h-px w-full bg-primary-500/60',
                pos.includes('top') ? 'top-0' : 'bottom-0',
              )}
            />
            <span
              className={cn(
                'absolute h-full w-px bg-primary-500/60',
                pos.includes('left') ? 'left-0' : 'right-0',
              )}
            />
          </span>
        ),
      )}
      <div className="px-4 text-center">
        <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-primary-500/80">
          App-Screenshot
        </p>
        <p className="mt-1.5 font-display text-sm font-semibold text-ink-600">{label}</p>
      </div>
    </div>
  )
}
