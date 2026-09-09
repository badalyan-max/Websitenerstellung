import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { PILLARS, type Pillar } from '@/lib/blog'

export interface BlogCardData {
  slug: string
  title: string
  description: string
  date: string
  dateFormatted: string
  pillar: Pillar
  tags: string[]
  minutes: number
}

const pillarTone: Record<Pillar, string> = {
  software: 'text-primary-600 bg-primary-50 ring-primary-100',
  ratgeber: 'text-node-600 bg-node-300/15 ring-node-300/30',
  vergleich: 'text-cta bg-cta/10 ring-cta/20',
}

export function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <article className="card-hover group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`spec-label inline-flex items-center rounded-full px-2.5 py-1 ring-1 ${pillarTone[post.pillar]}`}
        >
          {PILLARS[post.pillar]}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-ink-400">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {post.minutes} Min.
        </span>
      </div>
      <h2 className="mt-4 font-display text-xl font-bold leading-snug text-ink-900">
        <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
          {/* Karte komplett klickbar */}
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-grow text-[15px] leading-relaxed text-ink-600">{post.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
        <time dateTime={post.date} className="font-mono text-xs text-ink-400">
          {post.dateFormatted}
        </time>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
          Lesen
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
        </span>
      </div>
    </article>
  )
}
