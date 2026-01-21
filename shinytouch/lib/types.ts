/**
 * TypeScript Type Definitions
 */

export interface City {
  slug: string
  name: string
  plz: string // Postleitzahl für Suche
  region: string // Bundesland
  priority: 1 | 2 | 3 | 4 | 5 | 6
  population?: number // Einwohnerzahl für Content-Variation
  intro?: string
  highlights?: string[]
  faqs?: FAQ[]
}

export interface Service {
  slug: string
  name: string
  shortName: string
  description: string
  shortDescription: string
  longDescription?: string
  icon: string
  features: string[]
  benefits?: string[]
  faqs?: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export type ObjectCategory =
  | 'wohnen'
  | 'buero'
  | 'handel'
  | 'gastronomie'
  | 'beherbergung'
  | 'gesundheit'
  | 'bildung'
  | 'sport'
  | 'oeffentlich'
  | 'sonstige'

export interface ObjectType {
  slug: string
  name: string
  category: ObjectCategory
  categoryName: string // Display name für Kategorie
  icon: string
  description: string // Kurze SEO-Beschreibung (~155 Zeichen)
  shortDescription: string // Sehr kurze Beschreibung für Cards
  longDescription: string // Ausführlicher SEO-Text (300+ Wörter)
  challenges: string[] // Spezifische Herausforderungen bei diesem Objekttyp
  services: string[] // Slugs der relevanten Services
  benefits: string[] // Vorteile von ShinyTouch für diesen Objekttyp
  faqs: FAQ[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt?: string
  author?: string
  tags?: string[]
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  content: string
  rating: number
  date?: string
  avatar?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface BreadcrumbItem {
  name: string
  url: string
}
