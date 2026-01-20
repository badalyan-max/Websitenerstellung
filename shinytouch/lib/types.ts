/**
 * TypeScript Type Definitions
 */

export interface City {
  slug: string
  name: string
  region: string
  priority: 1 | 2 | 3
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
