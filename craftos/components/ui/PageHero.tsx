import { Eyebrow } from '@/components/ui/primitives'

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: React.ReactNode
  intro: string
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-ink-900">
      <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
      {/* Warmes Werkstatt-Licht von oben */}
      <div
        className="absolute -top-40 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #f2af38 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <div className="animate-fade-up flex justify-center">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-up delay-1 mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          {intro}
        </p>
      </div>
      <div className="anriss anriss-amber relative" aria-hidden="true" />
    </section>
  )
}
