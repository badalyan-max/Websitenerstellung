import { cn } from '@/lib/utils'

interface CraftOSLogoProps {
  variant?: 'full' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'dark' | 'light' // dark = dunkler Text (auf hell), light = heller Text (auf dunkel)
  className?: string
}

/**
 * CraftOS Hexagon-Logo — 1:1 portiert aus der App
 * (craft-connect-buddy/src/components/CraftOSLogo.tsx)
 */
export function CraftOSLogo({
  variant = 'full',
  size = 'md',
  tone = 'dark',
  className,
}: CraftOSLogoProps) {
  const sizes = {
    sm: { icon: 30, title: 'text-base', sub: 'text-[10px]' },
    md: { icon: 38, title: 'text-lg', sub: 'text-[11px]' },
    lg: { icon: 48, title: 'text-2xl', sub: 'text-xs' },
  }
  const { icon, title, sub } = sizes[size]

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Äußere Hexagon-Struktur */}
        <path
          d="M20 4L7 11.5V28.5L20 36L33 28.5V11.5L20 4Z"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.25"
          fill="none"
        />
        {/* Innere Verbindungslinien */}
        <path
          d="M7 11.5L20 19M20 19L33 11.5M20 19V36"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Zentraler aktiver Node — Cyan */}
        <circle cx="20" cy="19" r="4" fill="#22d3ee" className="animate-node-pulse" />
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display font-extrabold tracking-tight',
              title,
              tone === 'light' ? 'text-white' : 'text-ink-900',
            )}
          >
            CraftOS
          </span>
          <span
            className={cn(
              'font-mono mt-0.5 tracking-widest uppercase',
              sub,
              tone === 'light' ? 'text-ink-300' : 'text-ink-500',
            )}
          >
            Handwerkersoftware
          </span>
        </div>
      )}
    </div>
  )
}
