import Link from 'next/link'
import { Share2, Facebook, Twitter, Linkedin, Mail, Tag, Calendar, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPostWithAuthor, CategoryWithCount, TagWithCount } from '@/lib/blog'

interface BlogPostSidebarProps {
  post: BlogPostWithAuthor
  categories?: CategoryWithCount[]
  tags?: TagWithCount[]
}

export function BlogPostSidebar({ post, categories = [], tags = [] }: BlogPostSidebarProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this article: ${post.title}`

  return (
    <aside className="space-y-6">
      {/* Post Meta Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Article Info</h3>
        
        <div className="space-y-3">
          {post.author?.full_name && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">By</span>
              <span className="font-medium text-gray-900">{post.author.full_name}</span>
            </div>
          )}
          
          {post.published_at && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Published</span>
              <span className="font-medium text-gray-900">{formatDate(post.published_at)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Share */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Article
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
          
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
          
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
            className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors text-sm"
              >
                <span className="text-gray-700">{category.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 8).map((tag) => (
              <Link
                key={tag.name}
                href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag.name}
                <span className="text-xs opacity-75">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4 opacity-90">
          Subscribe to get notified about new articles like this one.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded text-gray-900 text-sm"
          />
          <button className="w-full bg-white text-blue-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Table of Contents (if we had headings extracted) */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Link
            href="/blog"
            className="block text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to all articles
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </aside>
  )
}