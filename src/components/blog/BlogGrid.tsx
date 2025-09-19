import { BlogCard, BlogCardSkeleton } from './BlogCard'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface BlogGridProps {
  posts: BlogPostWithAuthor[]
  loading?: boolean
  featured?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function BlogGrid({ posts, loading = false, featured = false, columns = 3 }: BlogGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
  }

  if (loading) {
    return (
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} featured={featured && i === 0} />
        ))}
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
        <p className="text-gray-600">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {posts.map((post, index) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          featured={featured && index === 0}
        />
      ))}
    </div>
  )
}

// Blog list view (alternative to grid)
export function BlogList({ posts, loading = false }: { posts: BlogPostWithAuthor[], loading?: boolean }) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <BlogCardSkeleton key={i} featured={true} />
        ))}
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
        <p className="text-gray-600">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          featured={true}
        />
      ))}
    </div>
  )
}