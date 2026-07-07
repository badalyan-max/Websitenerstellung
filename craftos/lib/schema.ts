import { site, tarife } from './site'

// JSON-LD Schema-Generatoren (GEO/SEO – "Muttersprache der KI")

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/icons/icon-512x512.png`,
    description: site.description,
    email: site.email,
    sameAs: [] as string[],
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: site.description,
    url: site.url,
    inLanguage: 'de-DE',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: tarife[0].monat,
      highPrice: tarife[tarife.length - 1].monat,
      offerCount: tarife.length,
      offers: tarife.map((t) => ({
        '@type': 'Offer',
        name: `CraftOS ${t.name}`,
        price: t.monat,
        priceCurrency: 'EUR',
        category: 'Monatslizenz pro Nutzer',
      })),
    },
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

export function articleSchema(article: {
  title: string
  description: string
  slug: string
  date: string
  updated?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    inLanguage: 'de-DE',
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icons/icon-512x512.png` },
    },
    datePublished: article.date,
    dateModified: article.updated || article.date,
    ...(article.image ? { image: `${site.url}${article.image}` } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${article.slug}`,
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}
