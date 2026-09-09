import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Clock, ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Faq } from '@/components/ui/Faq'
import { Eyebrow, CtaButton } from '@/components/ui/primitives'
import { BlogCard, type BlogCardData } from '@/components/blog/BlogCard'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  readingTime,
  formatDate,
  PILLARS,
} from '@/lib/blog'
import { renderMarkdown } from '@/lib/markdown'
import { site, nav } from '@/lib/site'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      ...(post.image ? { images: [{ url: `${site.url}${post.image}` }] } : {}),
    },
  }
}

const featureLabels: Record<string, string> = Object.fromEntries(
  nav.map((n) => [n.href, n.label]),
)

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await renderMarkdown(post.content)
  const related = getRelatedPosts(post).map(
    (p): BlogCardData => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      dateFormatted: formatDate(p.date),
      pillar: p.pillar,
      tags: p.tags,
      minutes: readingTime(p.content),
    }),
  )

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      {post.faq.length > 0 && <JsonLd data={faqSchema(post.faq)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Artikel-Kopf */}
      <header className="relative overflow-hidden bg-ink-950 text-white">
        <div className="bg-blueprint-dark mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-400 transition-colors hover:text-node-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Blog
          </Link>
          <div className="mt-6">
            <Eyebrow tone="light">{PILLARS[post.pillar]}</Eyebrow>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-ink-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && <span>Aktualisiert: {formatDate(post.updated)}</span>}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {readingTime(post.content)} Min. Lesezeit
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        {/* Anbieter-Disclosure bei Vergleichsartikeln (UWG) */}
        {post.pillar === 'vergleich' && (
          <p className="mb-8 rounded-xl border border-ink-200 bg-ink-100/60 px-5 py-4 text-sm leading-relaxed text-ink-600">
            Transparenz: CraftOS ist Anbieter dieser Website. Alle Angaben zu Drittanbietern
            wurden nach bestem Wissen recherchiert – Quellen und Stand finden Sie am Ende des
            Artikels.
          </p>
        )}

        <article
          className="prose prose-craftos max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* FAQ */}
        {post.faq.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-heading">
            <Eyebrow className="mb-4">FAQ // Häufige Fragen</Eyebrow>
            <h2 id="faq-heading" className="mb-6 font-display text-2xl font-extrabold text-ink-900">
              Häufige Fragen
            </h2>
            <Faq items={post.faq} />
          </section>
        )}

        {/* Quellen (UWG-Beleg bei Vergleichen) */}
        {post.sources.length > 0 && (
          <section className="mt-12" aria-labelledby="quellen-heading">
            <h2 id="quellen-heading" className="spec-label mb-3 text-ink-500">
              Quellen &amp; Stand
            </h2>
            <ul className="space-y-2 border-l-2 border-ink-200 pl-4 text-sm text-ink-600">
              {post.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700"
                  >
                    {s.claim}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  {s.checked && <span className="text-ink-400"> — Stand: {s.checked}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Passende Funktionen */}
        {post.relatedFeatures.length > 0 && (
          <section className="mt-12" aria-label="Passende CraftOS-Bereiche">
            <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
              <p className="spec-label text-primary-600">CraftOS // Passend zum Thema</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.relatedFeatures.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1 rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-400 hover:bg-primary-50"
                  >
                    {featureLabels[href] ?? href.replace('/', '')}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-ink-950 text-white" aria-label="CraftOS testen">
          <div className="bg-blueprint-dark relative px-7 py-10 sm:px-10">
            <p className="spec-label text-node-300">Weniger Papierkram // Mehr Baustelle</p>
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
              Büro-Chaos im Griff – mit CraftOS
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-300">
              Projekte, Angebote, Rechnungen, Zeiterfassung und Plantafel in einem System.
              Gebaut für deutsche Handwerksbetriebe.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>
        </section>
      </div>

      {/* Weiterlesen */}
      {related.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-100/50" aria-labelledby="weiterlesen-heading">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 id="weiterlesen-heading" className="font-display text-2xl font-extrabold text-ink-900">
              Weiterlesen
            </h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
