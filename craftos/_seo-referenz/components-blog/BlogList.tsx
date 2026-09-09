'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PILLARS, type Pillar } from '@/lib/blog'
import { BlogCard, type BlogCardData } from './BlogCard'

const TABS: { id: Pillar | 'alle'; label: string }[] = [
  { id: 'alle', label: 'Alle Artikel' },
  { id: 'software', label: PILLARS.software },
  { id: 'ratgeber', label: PILLARS.ratgeber },
  { id: 'vergleich', label: PILLARS.vergleich },
]

export function BlogList({ posts }: { posts: BlogCardData[] }) {
  const [active, setActive] = useState<Pillar | 'alle'>('alle')
  const visible = active === 'alle' ? posts : posts.filter((p) => p.pillar === active)

  return (
    <div>
      <div role="tablist" aria-label="Artikel nach Themensäule filtern" className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          const count = tab.id === 'alle' ? posts.length : posts.filter((p) => p.pillar === tab.id).length
          if (tab.id !== 'alle' && count === 0) return null
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
                isActive
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-ink-300 bg-white text-ink-700 hover:border-primary-400 hover:text-primary-700',
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'font-mono text-[11px]',
                  isActive ? 'text-primary-200' : 'text-ink-400',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">Noch keine Artikel in dieser Kategorie.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
