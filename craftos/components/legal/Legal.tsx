export function LegalShell({
  title,
  updated,
  eyebrow = 'Rechtliches',
  children,
}: {
  title: string
  updated?: string
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-white">
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <p className="spec-label text-primary-600">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink-900">{title}</h1>
          {updated && <p className="mt-2 font-mono text-xs text-ink-400">Stand: {updated}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <div className="legal space-y-8 text-[15px] leading-relaxed text-ink-700">{children}</div>
      </div>
    </section>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-ink-900">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

/** Hervorgehobener Datenblock mit Platzhaltern, die der Betreiber ausfüllt */
export function DataBlock({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
      {lines.map((l, i) => (
        <p key={i} className={i === 0 ? 'font-semibold text-ink-900' : 'text-ink-600'}>
          {l}
        </p>
      ))}
    </div>
  )
}
