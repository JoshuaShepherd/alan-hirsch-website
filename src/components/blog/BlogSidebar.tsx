import Link from 'next/link'
import { Search, Tag, Folder, Clock } from 'lucide-react'
import type { CategoryWithCount, TagWithCount, BlogPostWithAuthor } from '@/lib/blog'

interface BlogSidebarProps {
  categories?: CategoryWithCount[]
  tags?: TagWithCount[]
  recentPosts?: BlogPostWithAuthor[]
  currentCategory?: string
  currentTag?: string
}

export function BlogSidebar({ 
  categories = [], 
  tags = [], 
  recentPosts = [],
  currentCategory,
  currentTag 
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Articles
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Articles
          </h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm mb-1">
                  {post.title}
                </h4>
                {post.published_at && (
                  <p className="text-xs text-gray-500">
                    {new Date(post.published_at).toLocaleDateString()}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className={`flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors ${
                  currentCategory === category.name ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-sm">{category.name}</span>
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
            {tags.slice(0, 10).map((tag) => (
              <Link
                key={tag.name}
                href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  currentTag === tag.name 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag.name}
                <span className="text-xs opacity-75">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4 opacity-90">
          Get the latest articles delivered to your inbox.
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
    </aside>
  )
}