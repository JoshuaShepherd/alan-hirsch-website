import { BlogCard } from './BlogCard'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface RelatedPostsProps {
  posts: BlogPostWithAuthor[]
  title?: string
}

export function RelatedPosts({ posts, title = "Related Articles" }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">Continue reading with these related articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <BlogCard 
            key={post.id} 
            post={post}
            showExcerpt={false}
          />
        ))}
      </div>
    </section>
  )
}