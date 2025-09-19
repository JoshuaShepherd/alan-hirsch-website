import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Clock, User, Calendar } from 'lucide-react'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPostWithAuthor
  featured?: boolean
  showExcerpt?: boolean
}

export function BlogCard({ post, featured = false, showExcerpt = true }: BlogCardProps) {
  const cardClass = featured 
    ? "group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    : "group cursor-pointer transition-all duration-300 hover:shadow-lg"

  return (
    <Link href={`/blog/${post.slug}`} className={cardClass}>
      <article className={`bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}>
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className={`relative overflow-hidden ${
            featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'
          }`}>
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className={`p-6 flex-1 flex flex-col ${featured ? 'md:w-1/2' : ''}`}>
          {/* Meta Info */}
          <div className="flex items-center text-sm text-gray-500 mb-3 flex-wrap gap-4">
            {post.author?.full_name && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author.full_name}</span>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time>{formatDate(post.published_at)}</time>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p className="text-gray-600 mb-4 flex-1 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Read More Link */}
          <div className="mt-auto">
            <span className="inline-flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
              Read more
              <svg 
                className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Skeleton loading component
export function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col animate-pulse ${
      featured ? 'md:flex-row' : ''
    }`}>
      {/* Image skeleton */}
      <div className={`bg-gray-200 ${
        featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'
      }`} />
      
      {/* Content skeleton */}
      <div className={`p-6 flex-1 flex flex-col ${featured ? 'md:w-1/2' : ''}`}>
        {/* Meta skeleton */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        
        {/* Title skeleton */}
        <div className={`space-y-2 mb-3 ${featured ? 'mb-4' : ''}`}>
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Read more skeleton */}
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
    </div>
  )
}