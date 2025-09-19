'use client'

import { useEffect, useState } from 'react'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const { posts, loading, error, loadPosts } = useBlogPosts()
  const [publishedPosts, setPublishedPosts] = useState<any[]>([])

  useEffect(() => {
    // Only load posts if we have a working Supabase client
    if (typeof window !== 'undefined') {
      loadPosts(['published']).catch(err => {
        console.error('Failed to load posts:', err)
      })
    }
  }, [])

  useEffect(() => {
    setPublishedPosts(posts.filter(post => post.status === 'published'))
  }, [posts])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Thoughts, insights, and reflections on missional church and leadership
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Posts */}
      {publishedPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-600">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {publishedPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.featured_image_url && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author_id}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}