import { COMPANY_DATA } from './company'
import type { City, Service, FAQ } from './types'

/**
 * Generates Organization Schema for the company
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${COMPANY_DATA.url}/#organization`,
    name: COMPANY_DATA.name,
    url: COMPANY_DATA.url,
    logo: `${COMPANY_DATA.url}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_DATA.contact.phone,
      contactType: 'customer service',
      email: COMPANY_DATA.contact.email,
      areaServed: 'DE',
      availableLanguage: 'German',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DATA.address.street,
      addressLocality: COMPANY_DATA.address.city,
      postalCode: COMPANY_DATA.address.zip,
      addressCountry: COMPANY_DATA.address.country,
    },
    sameAs: Object.values(COMPANY_DATA.social),
  }
}

/**
 * Generates LocalBusiness Schema for homepage and city pages
 */
export function generateLocalBusinessSchema(city?: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_DATA.url}/#localbusiness`,
    name: COMPANY_DATA.name,
    image: `${COMPANY_DATA.url}/images/logo.png`,
    url: COMPANY_DATA.url,
    telephone: COMPANY_DATA.contact.phone,
    email: COMPANY_DATA.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DATA.address.street,
      addressLocality: COMPANY_DATA.address.city,
      postalCode: COMPANY_DATA.address.zip,
      addressCountry: COMPANY_DATA.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_DATA.geo.lat,
      longitude: COMPANY_DATA.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_DATA.rating.value.toString(),
      reviewCount: COMPANY_DATA.rating.count.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: city
      ? {
          '@type': 'City',
          name: city.name,
        }
      : {
          '@type': 'Country',
          name: 'Germany',
        },
    sameAs: Object.values(COMPANY_DATA.social),
  }
}

/**
 * Generates Service Schema for service pages
 */
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${COMPANY_DATA.url}/#localbusiness`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    description: service.description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.features.map((feature) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  }
}

/**
 * Generates FAQPage Schema for FAQ pages
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generates BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${COMPANY_DATA.url}${item.url}`,
    })),
  }
}

/**
 * Generates Article Schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
      logo: {
        '@type': 'ImageObject',
        url: `${COMPANY_DATA.url}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY_DATA.url}/blog/${article.slug}`,
    },
  }
}
