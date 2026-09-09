import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { getAllPosts, readingTime, formatDate } from '@/lib/blog'
import { BlogList } from '@/components/blog/BlogList'
import type { BlogCardData } from '@/components/blog/BlogCard'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog – Wissen für Handwerksbetriebe',
  description:
    'Praxiswissen für Handwerksbetriebe: Handwerkersoftware, Büro-Organisation, Angebote & Rechnungen, Zeiterfassung und ehrliche Software-Vergleiche.',
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: 'CraftOS Blog – Wissen für Handwerksbetriebe',
    description:
      'Praxiswissen für Handwerksbetriebe: Software, Büro-Organisation und ehrliche Vergleiche.',
    url: `${site.url}/blog`,
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts: BlogCardData[] = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    dateFormatted: formatDate(p.date),
    pillar: p.pillar,
    tags: p.tags,
    minutes: readingTime(p.content),
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHero
        eyebrow="Journal // Praxiswissen"
        title={
          <>
            Wissen für Betriebe, <span className="text-node-400">die vorne mitspielen</span>
          </>
        }
        intro="Handwerkersoftware, Büro-Organisation, Zeiterfassung und ehrliche Vergleiche – geschrieben für Chefs im Handwerk, nicht für Software-Nerds."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <BlogList posts={posts} />
      </section>
    </>
  )
}
