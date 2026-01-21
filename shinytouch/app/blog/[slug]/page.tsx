import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs, formatBlogDate, getRecentPosts } from '@/lib/blog'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/json-ld'
import { COMPANY_DATA } from '@/lib/company'
import { BlogCard } from '@/components/blog/BlogCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artikel nicht gefunden',
    }
  }

  return {
    title: `${post.title} | ShinyTouch Blog`,
    description: post.description,
    authors: [{ name: post.author || COMPANY_DATA.name }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author || COMPANY_DATA.name],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://www.shinytouchgebaeudereinigung.de/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const relatedPosts = getRecentPosts(4).filter(p => p.slug !== post.slug).slice(0, 3)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ]

  return (
    <>
      <JsonLd data={generateArticleSchema(post)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Article Header */}
      <article>
        <header className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-secondary-500 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
                </li>
                <li>/</li>
                <li className="text-secondary-900 font-medium truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-secondary-900 mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-secondary-500">
              <time dateTime={post.publishedAt} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatBlogDate(post.publishedAt)}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="text-sm">
                  (Aktualisiert: {formatBlogDate(post.updatedAt)})
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="py-12 lg:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg prose-secondary max-w-none
                prose-headings:text-secondary-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-secondary-600 prose-p:leading-relaxed
                prose-a:text-primary-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-secondary-900
                prose-ul:my-4 prose-li:text-secondary-600
                prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {/* CTA Box */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Professionelle Gebäudereinigung gesucht?
              </h3>
              <p className="text-secondary-600 mb-6">
                Wir beraten Sie gerne und erstellen ein individuelles Angebot für Ihr Unternehmen – kostenlos und unverbindlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
                >
                  Angebot anfordern
                </Link>
                <a
                  href={`tel:${COMPANY_DATA.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary-700 font-semibold rounded-xl border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Jetzt anrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 lg:py-16 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-8">
              Weitere Artikel
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/**
 * Simple markdown-like formatting for content
 */
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^\- \[ \] (.*$)/gim, '<li class="flex items-start gap-2"><span class="w-5 h-5 border border-secondary-300 rounded mt-1 flex-shrink-0"></span><span>$1</span></li>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Wrap consecutive list items in ul
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc pl-6 space-y-1">$&</ul>')
    // Paragraphs (lines not starting with tags)
    .split('\n\n')
    .map(block => {
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<li')) {
        return block
      }
      return block.trim() ? `<p>${block}</p>` : ''
    })
    .join('\n')
}
