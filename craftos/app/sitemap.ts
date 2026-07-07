import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { gewerke } from '@/lib/gewerke'
import { funktionen } from '@/lib/funktionen'

export default function sitemap(): MetadataRoute.Sitemap {
  const statisch = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/funktionen', priority: 0.9, freq: 'monthly' as const },
    { path: '/gewerke', priority: 0.9, freq: 'monthly' as const },
    { path: '/craft-ai', priority: 0.9, freq: 'monthly' as const },
    { path: '/app', priority: 0.8, freq: 'monthly' as const },
    { path: '/preise', priority: 0.9, freq: 'monthly' as const },
    { path: '/fakten-ueber-craftos', priority: 0.7, freq: 'monthly' as const },
    { path: '/support', priority: 0.5, freq: 'monthly' as const },
    { path: '/impressum', priority: 0.2, freq: 'yearly' as const },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly' as const },
    { path: '/agb', priority: 0.2, freq: 'yearly' as const },
  ]
  const gewerkeRoutes = gewerke.map((g) => ({
    path: `/gewerke/${g.slug}`,
    priority: 0.8,
    freq: 'monthly' as const,
  }))
  const funktionenRoutes = funktionen.map((f) => ({
    path: `/funktionen/${f.slug}`,
    priority: 0.8,
    freq: 'monthly' as const,
  }))

  const now = new Date()
  return [...statisch, ...gewerkeRoutes, ...funktionenRoutes].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
