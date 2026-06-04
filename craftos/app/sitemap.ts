import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/funktionen', priority: 0.9, freq: 'monthly' as const },
    { path: '/craft-ai', priority: 0.9, freq: 'monthly' as const },
    { path: '/app', priority: 0.8, freq: 'monthly' as const },
    { path: '/preise', priority: 0.9, freq: 'monthly' as const },
    { path: '/support', priority: 0.5, freq: 'monthly' as const },
    { path: '/impressum', priority: 0.2, freq: 'yearly' as const },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly' as const },
    { path: '/agb', priority: 0.2, freq: 'yearly' as const },
  ]
  const now = new Date()
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
