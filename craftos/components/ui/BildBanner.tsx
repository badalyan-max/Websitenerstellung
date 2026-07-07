import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Bild } from '@/lib/images'

/**
 * Breites Stimmungsbild im Werkbank-Rahmen: dünne Border, Amber-Anriss unten,
 * sanfter Verlauf in den Seitenhintergrund.
 */
export function BildBanner({
  bild,
  priority = false,
  className,
}: {
  bild: Bild
  priority?: boolean
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-7xl px-5 sm:px-8', className)}>
      <figure className="relative overflow-hidden rounded-2xl border border-ink-200">
        <Image
          src={bild.src}
          alt={bild.alt}
          width={bild.width}
          height={bild.height}
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="aspect-[16/7] w-full object-cover sm:aspect-[21/8]"
        />
        {/* Verlauf unten, damit das Bild im Dark-Layout aufsitzt */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent"
          aria-hidden="true"
        />
        <div className="anriss anriss-amber absolute inset-x-0 bottom-0" aria-hidden="true" />
      </figure>
    </div>
  )
}
