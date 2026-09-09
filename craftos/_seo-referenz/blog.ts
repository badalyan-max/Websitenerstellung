import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Blog-Content-Loader: liest content/blog/*.md, validiert Frontmatter strikt.
// Ein Verstoß wirft beim Build — `next build` ist das Sicherheitsnetz für
// maschinell erzeugte Artikel (seo-content-autopilot-Skill).

export const PILLARS = {
  software: 'Software-Wissen',
  ratgeber: 'Ratgeber',
  vergleich: 'Vergleiche',
} as const

export type Pillar = keyof typeof PILLARS

export interface FaqEntry {
  q: string
  a: string
}

export interface SourceEntry {
  url: string
  claim: string
  checked: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  pillar: Pillar
  tags: string[]
  keywords: string[]
  image?: string
  faq: FaqEntry[]
  relatedFeatures: string[]
  sources: SourceEntry[]
  draft: boolean
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function fail(slug: string, msg: string): never {
  throw new Error(`Blog-Frontmatter ungültig in "${slug}.md": ${msg}`)
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && ISO_DATE.test(value)) return value
  return undefined
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw)

  const title = data.title
  if (typeof title !== 'string' || !title.trim()) fail(slug, '"title" fehlt')
  if (title.length > 70) fail(slug, `"title" zu lang (${title.length} > 70 Zeichen)`)

  const description = data.description
  if (typeof description !== 'string' || !description.trim()) fail(slug, '"description" fehlt')
  if (description.length > 170) fail(slug, `"description" zu lang (${description.length} > 170 Zeichen)`)

  const date = toIsoDate(data.date)
  if (!date) fail(slug, '"date" fehlt oder ist kein ISO-Datum (YYYY-MM-DD)')
  const updated = toIsoDate(data.updated)

  const pillar = data.pillar
  if (pillar !== 'software' && pillar !== 'ratgeber' && pillar !== 'vergleich')
    fail(slug, `"pillar" muss software|ratgeber|vergleich sein (ist: ${String(pillar)})`)

  const tags: string[] = Array.isArray(data.tags) ? data.tags.map(String) : []
  const keywords: string[] = Array.isArray(data.keywords) ? data.keywords.map(String) : []
  if (keywords.length === 0) fail(slug, '"keywords" (Cluster) fehlt')

  const faq: FaqEntry[] = Array.isArray(data.faq)
    ? data.faq.map((f: { q?: unknown; a?: unknown }, i: number) => {
        if (typeof f?.q !== 'string' || typeof f?.a !== 'string')
          fail(slug, `faq[${i}] braucht "q" und "a"`)
        if (f.a.length > 320) fail(slug, `faq[${i}].a zu lang (${f.a.length} > 320 Zeichen)`)
        return { q: f.q, a: f.a }
      })
    : []

  const relatedFeatures: string[] = Array.isArray(data.relatedFeatures)
    ? data.relatedFeatures.map(String)
    : []
  for (const href of relatedFeatures) {
    if (!href.startsWith('/')) fail(slug, `relatedFeatures "${href}" muss interner Pfad sein`)
  }

  const sources: SourceEntry[] = Array.isArray(data.sources)
    ? data.sources.map((s: { url?: unknown; claim?: unknown; checked?: unknown }, i: number) => {
        if (typeof s?.url !== 'string' || typeof s?.claim !== 'string')
          fail(slug, `sources[${i}] braucht "url" und "claim"`)
        return { url: s.url, claim: s.claim, checked: String(s.checked ?? '') }
      })
    : []
  // UWG-Guardrail: Vergleichsartikel ohne belegte Quellen dürfen nicht bauen.
  if (pillar === 'vergleich' && sources.length === 0)
    fail(slug, 'pillar "vergleich" erfordert mindestens einen "sources"-Eintrag (UWG-Beleg)')

  if (!content.trim()) fail(slug, 'Artikel-Body ist leer')

  return {
    slug,
    title,
    description,
    date,
    updated,
    pillar,
    tags,
    keywords,
    image: typeof data.image === 'string' ? data.image : undefined,
    faq,
    relatedFeatures,
    sources,
    draft: data.draft === true,
    content,
  }
}

let cache: BlogPost[] | null = null

export function getAllPosts(): BlogPost[] {
  if (cache) return cache
  if (!fs.existsSync(BLOG_DIR)) return (cache = [])
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parsePost(f.replace(/\.md$/, ''), fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
  cache = posts
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getPostsByPillar(pillar: Pillar): BlogPost[] {
  return getAllPosts().filter((p) => p.pillar === pillar)
}

/** Verwandte Posts über Tag-Overlap (gleiche Säule zählt als halber Treffer). */
export function getRelatedPosts(post: BlogPost, n = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length + (p.pillar === post.pillar ? 0.5 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.post)
}

/** Posts, die auf eine Feature-Seite verweisen (für RelatedArticles-Boxen, Phase 2). */
export function getPostsForFeature(href: string, n = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.relatedFeatures.includes(href))
    .slice(0, n)
}

export function readingTime(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
