import { MetadataRoute } from 'next'
import { CITIES } from '@/lib/cities'
import { SERVICES } from '@/lib/services'

const BASE_URL = 'https://www.shinytouchgebaeudereinigung.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/standorte`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/karriere`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/service/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City pages - prioritize by city priority
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: city.priority === 1 ? 0.9 : city.priority === 2 ? 0.7 : 0.6,
  }))

  return [...mainPages, ...servicePages, ...cityPages]
}
