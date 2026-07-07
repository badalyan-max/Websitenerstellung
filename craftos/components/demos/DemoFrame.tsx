import { cn } from '@/lib/utils'

/**
 * App-Fenster-Rahmen für interaktive Demos — gestaltet wie die echte
 * CraftOS-Oberfläche (dunkle Card, dünner Border, Titelzeile).
 */
export function DemoFrame({
  title,
  badge,
  children,
  className,
}: {
  title: string
  badge?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink-200 bg-ink-150 px-4 py-2.5">
        <span className="font-display text-sm font-semibold text-ink-900">{title}</span>
        <span className="flex items-center gap-2">
          {badge && (
            <span className="rounded-full border border-ink-300/60 bg-ink-200/50 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-ink-500">
              {badge}
            </span>
          )}
          <span className="spec-label text-[0.6rem] text-primary-500">Live-Demo</span>
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}
