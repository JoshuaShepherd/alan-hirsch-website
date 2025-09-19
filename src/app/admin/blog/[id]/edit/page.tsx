'use client'

import { BlogEditor } from '@/components/BlogEditor'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/blog"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="text-gray-600">Make changes to your blog post</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Editor */}
      <BlogEditor 
        postId={params.id}
        onSave={(postId, content) => {
          console.log('Post saved:', { postId, contentLength: content.length })
        }}
        onPublish={(postId) => {
          console.log('Post published:', postId)
        }}
        onDelete={(postId) => {
          console.log('Post deleted:', postId)
          // Redirect back to blog list
          window.location.href = '/admin/blog'
        }}
      />
    </div>
  )
}