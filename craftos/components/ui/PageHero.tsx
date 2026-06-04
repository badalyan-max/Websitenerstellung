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
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-blueprint-dark mask-fade absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/3 h-96 w-96 rounded-full opacity-30 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <div className="animate-fade-up flex justify-center">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-up delay-1 mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
          {intro}
        </p>
      </div>
    </section>
  )
}
