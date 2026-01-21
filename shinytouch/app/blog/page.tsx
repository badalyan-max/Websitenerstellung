import { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { COMPANY_DATA } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Blog | Tipps & Ratgeber zur Gebäudereinigung',
  description: 'Expertenwissen rund um professionelle Gebäudereinigung: Tipps, Checklisten, Kostenratgeber und aktuelle Trends für saubere Arbeitsumgebungen.',
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de/blog',
  },
  openGraph: {
    title: 'Blog | ShinyTouch Gebäudereinigung',
    description: 'Expertenwissen rund um professionelle Gebäudereinigung',
    type: 'website',
  },
}

export default function BlogPage() {
  const allTags = getAllTags()
  const featuredPost = BLOG_POSTS[0]
  const otherPosts = BLOG_POSTS.slice(1)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-secondary-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-secondary-900 font-medium">Blog</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-secondary-900 mb-6">
              Tipps & Ratgeber zur{' '}
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                Gebäudereinigung
              </span>
            </h1>

            <p className="text-lg text-secondary-600 leading-relaxed">
              Expertenwissen aus der Praxis: Erfahren Sie alles über professionelle Reinigung,
              Kosten, Hygiene-Standards und nachhaltige Lösungen für Ihr Unternehmen.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-6 bg-white border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-secondary-500">Themen:</span>
            {allTags.map(tag => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-secondary-100 hover:bg-primary-100 text-sm text-secondary-700 hover:text-primary-700 rounded-full cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
                Aktueller Beitrag
              </h2>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.length > 0 && (
            <>
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
                Weitere Beiträge
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Professionelle Reinigung für Ihr Unternehmen?
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Lassen Sie sich von unseren Experten beraten und erhalten Sie ein
            individuelles Angebot – kostenlos und unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Angebot anfordern
            </Link>
            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY_DATA.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
