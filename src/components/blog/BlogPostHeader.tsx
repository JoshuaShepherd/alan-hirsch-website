import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { formatDate, getReadingTime } from '@/lib/utils'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface BlogPostHeaderProps {
  post: BlogPostWithAuthor
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const readingTime = getReadingTime(post.content)

  return (
    <header className="mb-8">
      {/* Back to blog link */}
      <div className="mb-6">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      {/* Meta information */}
      <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b border-gray-200">
        {/* Author */}
        {post.author?.full_name && (
          <div className="flex items-center gap-3">
            {post.author.avatar_url && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>By</span>
              </div>
              <div className="font-medium text-gray-900">
                {post.author.full_name}
              </div>
            </div>
          </div>
        )}

        {/* Published date */}
        {post.published_at && (
          <div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Published</span>
            </div>
            <time className="font-medium text-gray-900">
              {formatDate(post.published_at)}
            </time>
          </div>
        )}

        {/* Reading time */}
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <Clock className="w-4 h-4" />
            <span>Reading time</span>
          </div>
          <div className="font-medium text-gray-900">
            {readingTime} min read
          </div>
        </div>

        {/* Share button */}
        <div className="ml-auto">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt || '',
                  url: window.location.href
                })
              } else {
                // Fallback to copy URL
                navigator.clipboard.writeText(window.location.href)
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </header>
  )
}