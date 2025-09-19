'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect, useCallback } from 'react'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { Save, Eye, Globe, Archive, Trash2, Plus, Tag, FileText, Target, Image as ImageIcon } from 'lucide-react'
import { EditorToolbar } from './EditorToolbar'
import { SEOOptimizationPanel } from './SEOOptimizationPanel'
import { ContentTemplates } from './ContentTemplates'
import { FeaturedImageUploader } from './FeaturedImageUploader'
import { InlineImageUploader } from './InlineImageUploader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'

interface BlogEditorProps {
  postId?: string
  initialContent?: string
  onSave?: (postId: string, content: string) => void
  onPublish?: (postId: string) => void
  onDelete?: (postId: string) => void
}

export function BlogEditor({ 
  postId, 
  initialContent = '', 
  onSave, 
  onPublish, 
  onDelete 
}: BlogEditorProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft')
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [currentPostId, setCurrentPostId] = useState<string | null>(postId || null)
  const [showInlineImageUploader, setShowInlineImageUploader] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // SEO fields
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  
  // UI state
  const [showTemplates, setShowTemplates] = useState(!initialContent && !postId)

  const { 
    createPost, 
    updatePost, 
    deletePost, 
    publishPost, 
    unpublishPost, 
    archivePost,
    getPost,
    generateSlug,
    isSlugAvailable 
  } = useBlogPosts()

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing content...',
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 text-gray-900 dark:text-gray-100 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300'
      }
    },
    onUpdate: ({ editor }) => {
      // Auto-save after 3 seconds of no typing
      const content = editor.getHTML()
      if (currentPostId && title) {
        debouncedAutoSave(content)
      }
    }
  })

  // Load existing post if postId is provided
  useEffect(() => {
    if (postId) {
      loadPost(postId)
    }
  }, [postId])

  // Get current user for image uploads
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    getUser()
  }, [])

  const loadPost = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const post = await getPost(id)
      if (post) {
        setTitle(post.title)
        setSlug(post.slug)
        setExcerpt(post.excerpt || '')
        setFeaturedImage(post.featured_image_url || '')
        setStatus(post.status as any)
        setPublishedAt(post.published_at)
        setCurrentPostId(post.id)
        
        if (editor) {
          editor.commands.setContent(post.content)
        }
      }
    } catch (err) {
      console.error('Error loading post:', err)
      setError('Failed to load post')
    } finally {
      setIsLoading(false)
    }
  }

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    debounce((content: string) => {
      if (currentPostId && title) {
        autoSave(content)
      }
    }, 3000),
    [currentPostId, title]
  )

  const autoSave = async (content: string) => {
    if (!currentPostId || !title) return
    
    try {
      await updatePost(currentPostId, {
        title,
        slug,
        content,
        excerpt,
        featured_image_url: featuredImage || null
      })
      setLastSaved(new Date())
    } catch (err) {
      console.error('Auto-save failed:', err)
    }
  }

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle)
    
    if (!slug && newTitle) {
      const newSlug = generateSlug(newTitle)
      const available = await isSlugAvailable(newSlug, currentPostId || undefined)
      if (available) {
        setSlug(newSlug)
      }
    }
  }

  const handleSlugChange = async (newSlug: string) => {
    const formattedSlug = generateSlug(newSlug)
    setSlug(formattedSlug)
  }

  const handleTemplateSelection = (template: any) => {
    if (editor) {
      editor.commands.setContent(template.structure)
      setTitle(template.name)
      setFocusKeyword(template.seoKeywords[0] || '')
      setMetaDescription(template.description)
      
      // Generate slug from template name
      const newSlug = generateSlug(template.name)
      setSlug(newSlug)
    }
    setShowTemplates(false)
  }

  const saveDraft = async () => {
    if (!title || !editor) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      const content = editor.getHTML()
      
      if (currentPostId) {
        // Update existing post
        await updatePost(currentPostId, {
          title,
          slug: slug || generateSlug(title),
          content,
          excerpt,
          featured_image_url: featuredImage || null,
          status: 'draft'
        })
      } else {
        // Create new post
        const newPost = await createPost({
          title,
          slug: slug || generateSlug(title),
          content,
          excerpt,
          featured_image_url: featuredImage || null,
          status: 'draft'
        })
        setCurrentPostId(newPost.id)
      }
      
      setStatus('draft')
      setLastSaved(new Date())
      onSave?.(currentPostId!, content)
    } catch (err) {
      console.error('Error saving draft:', err)
      setError('Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!currentPostId) {
      // Save as draft first if not saved
      await saveDraft()
      if (!currentPostId) return
    }
    
    setIsSaving(true)
    setError(null)
    
    try {
      if (status === 'published') {
        // Unpublish
        await unpublishPost(currentPostId)
        setStatus('draft')
        setPublishedAt(null)
      } else {
        // Publish
        const updatedPost = await publishPost(currentPostId)
        setStatus('published')
        setPublishedAt(updatedPost.published_at)
        onPublish?.(currentPostId)
      }
      
      setLastSaved(new Date())
    } catch (err) {
      console.error('Error publishing post:', err)
      setError('Failed to publish post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleArchive = async () => {
    if (!currentPostId) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      await archivePost(currentPostId)
      setStatus('archived')
      setLastSaved(new Date())
    } catch (err) {
      console.error('Error archiving post:', err)
      setError('Failed to archive post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!currentPostId) return
    
    const confirmDelete = confirm('Are you sure you want to delete this post? This action cannot be undone.')
    if (!confirmDelete) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      await deletePost(currentPostId)
      onDelete?.(currentPostId)
    } catch (err) {
      console.error('Error deleting post:', err)
      setError('Failed to delete post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageInsert = (markdown: string) => {
    if (editor) {
      const { from } = editor.state.selection
      editor.chain().focus().insertContentAt(from, markdown).run()
    }
    setShowInlineImageUploader(false)
  }

  const handleShowImageUploader = () => {
    setShowInlineImageUploader(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentPostId ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            {lastSaved && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!showTemplates && (
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Templates
              </button>
            )}
            
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'published' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : status === 'archived'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
            }`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Templates Section - Show when needed */}
      {showTemplates && (
        <div className="mb-6">
          <ContentTemplates onSelectTemplate={handleTemplateSelection} />
        </div>
      )}

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title */}
              <input
                type="text"
                placeholder="Enter your post title..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full text-3xl font-bold border-none outline-none p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />

              {/* Content Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Content</h3>
                </div>
                
                {/* Custom Toolbar with Image Upload */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex items-center space-x-2">
                  <EditorToolbar editor={editor} />
                  
                  {/* Image Upload Button */}
                  <div className="border-l border-gray-200 dark:border-gray-700 pl-3">
                    <button
                      type="button"
                      onClick={handleShowImageUploader}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Insert Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Image</span>
                    </button>
                  </div>
                </div>
                
                <EditorContent editor={editor} />
                
                {/* Character Count */}
                {editor && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center">
                      <span>
                        Characters: {editor.storage.characterCount.characters()}/10,000
                      </span>
                      <span>
                        Words: {editor.storage.characterCount.words()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={saveDraft}
                    disabled={isSaving || !title}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Draft'}
                  </button>
                  
                  <button
                    onClick={handlePublish}
                    disabled={isSaving || !title}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded disabled:opacity-50 transition-colors ${
                      status === 'published' 
                        ? 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700' 
                        : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    }`}
                  >
                    {status === 'published' ? <Eye className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    {isSaving ? 'Processing...' : status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>

                  {currentPostId && (
                    <>
                      <button
                        onClick={handleArchive}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                      >
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                      
                      <button
                        onClick={handleDelete}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SEOOptimizationPanel
            title={title}
            content={editor?.getHTML() || ''}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            focusKeyword={focusKeyword}
            slug={slug}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
            onFocusKeywordChange={setFocusKeyword}
            onSlugChange={handleSlugChange}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Post Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="post-slug"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    placeholder="Brief description of the post..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 h-24 text-sm resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image
                  </label>
                  {currentUser ? (
                    <FeaturedImageUploader
                      value={featuredImage}
                      onChange={(url) => setFeaturedImage(url || '')}
                      userId={currentUser.id}
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                      Please sign in to upload images
                    </div>
                  )}
                </div>
                
                {publishedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Published At
                    </label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(publishedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Settings Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Future Features</h3>
              <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Categories and Tags
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Social Media Preview
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Analytics Integration
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  AI Content Suggestions
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {/* Inline Image Uploader Modal */}
      {showInlineImageUploader && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <InlineImageUploader
            userId={currentUser.id}
            onImageInsert={handleImageInsert}
            onClose={() => setShowInlineImageUploader(false)}
          />
        </div>
      )}
    </div>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}