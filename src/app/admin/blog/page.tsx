'use client'

import { useEffect, useState } from 'react'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Globe, 
  Archive, 
  Trash2, 
  Calendar,
  User,
  FileText
} from 'lucide-react'

export default function BlogPostsPage() {
  const { 
    posts, 
    loading, 
    error, 
    loadPosts, 
    publishPost, 
    unpublishPost, 
    archivePost, 
    deletePost,
    getPostStats 
  } = useBlogPosts()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = getPostStats()

  const handleQuickAction = async (action: string, postId: string) => {
    setIsActionLoading(postId)
    try {
      switch (action) {
        case 'publish':
          await publishPost(postId)
          break
        case 'unpublish':
          await unpublishPost(postId)
          break
        case 'archive':
          await archivePost(postId)
          break
        case 'delete':
          if (confirm('Are you sure you want to delete this post?')) {
            await deletePost(postId)
          }
          break
      }
    } catch (err) {
      console.error('Error performing action:', err)
      alert('Action failed. Please try again.')
    } finally {
      setIsActionLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-2">Manage your blog content and publications</p>
          </div>
          <Link 
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Archive className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
                <p className="text-sm text-gray-600">Archived</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-lg border shadow-sm">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {posts.length === 0 
                ? "Get started by creating your first blog post." 
                : "No posts match your current filters."
              }
            </p>
            {posts.length === 0 && (
              <Link 
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Create First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status || 'draft')}`}>
                        {post.status}
                      </span>
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author_id}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.published_at 
                          ? new Date(post.published_at).toLocaleDateString()
                          : `Created ${new Date(post.created_at || '').toLocaleDateString()}`
                        }
                      </div>
                      <div className="text-blue-600 font-medium">
                        /{post.slug}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {/* Quick Actions */}
                    {post.status === 'draft' && (
                      <button
                        onClick={() => handleQuickAction('publish', post.id)}
                        disabled={isActionLoading === post.id}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Publish"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    )}
                    
                    {post.status === 'published' && (
                      <button
                        onClick={() => handleQuickAction('unpublish', post.id)}
                        disabled={isActionLoading === post.id}
                        className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                        title="Unpublish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => handleQuickAction('archive', post.id)}
                      disabled={isActionLoading === post.id}
                      className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleQuickAction('delete', post.id)}
                      disabled={isActionLoading === post.id}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}