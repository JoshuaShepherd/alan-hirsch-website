import { BlogCard } from './BlogCard'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface BlogFeaturedProps {
  posts: BlogPostWithAuthor[]
}

export function BlogFeatured({ posts }: BlogFeaturedProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const [mainPost, ...otherPosts] = posts

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Articles</h2>
        <p className="text-gray-600">Don't miss these highlighted insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main featured post */}
        <div className="lg:col-span-2">
          <BlogCard post={mainPost} featured={true} />
        </div>

        {/* Side featured posts */}
        {otherPosts.length > 0 && (
          <div className="space-y-6">
            {otherPosts.slice(0, 2).map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                showExcerpt={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}