import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { formatBlogDate } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden border border-secondary-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 ${featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
        }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-48'
          }`}
      >
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              title={post.imageTitle || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
            {/* Overlay for better text readability if needed, but not on card */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'flex flex-col justify-center' : ''}`}>
        {/* Date */}
        <time
          dateTime={post.publishedAt}
          className="text-sm text-secondary-500 mb-2 block"
        >
          {formatBlogDate(post.publishedAt)}
        </time>

        {/* Title */}
        <h2
          className={`font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-3 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
        >
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        <p
          className={`text-secondary-600 mb-4 ${featured ? 'text-base' : 'text-sm line-clamp-2'
            }`}
        >
          {post.description}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          <span>Weiterlesen</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}
