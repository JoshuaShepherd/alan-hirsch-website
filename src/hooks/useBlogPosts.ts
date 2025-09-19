'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database.types'

// Initialize the Supabase client
const supabase = createClient()

type BlogPost = Database['public']['Tables']['blog_posts']['Row']
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export interface BlogPostWithTags extends BlogPost {
  tags?: Array<{
    id: string
    name: string
    slug: string
    description: string | null
    color: string | null
  }>
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load all blog posts
  const loadPosts = async (includeStatus?: string[]) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (includeStatus && includeStatus.length > 0) {
        query = query.in('status', includeStatus)
      }

      const { data, error } = await query

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error('Error loading posts:', err)
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  // Load posts on mount
  useEffect(() => {
    loadPosts()
  }, [])

  // Create new blog post
  const createPost = async (post: BlogPostInsert): Promise<BlogPost> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single()
      
      if (error) throw error
      
      // Refresh posts list
      await loadPosts()
      
      return data
    } catch (err) {
      console.error('Error creating post:', err)
      throw err
    }
  }

  // Update existing blog post
  const updatePost = async (id: string, updates: BlogPostUpdate): Promise<BlogPost> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      
      // Refresh posts list
      await loadPosts()
      
      return data
    } catch (err) {
      console.error('Error updating post:', err)
      throw err
    }
  }

  // Delete blog post
  const deletePost = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh posts list
      await loadPosts()
    } catch (err) {
      console.error('Error deleting post:', err)
      throw err
    }
  }

  // Publish a draft post
  const publishPost = async (id: string): Promise<BlogPost> => {
    return updatePost(id, { 
      status: 'published', 
      published_at: new Date().toISOString() 
    })
  }

  // Unpublish a post (set to draft)
  const unpublishPost = async (id: string): Promise<BlogPost> => {
    return updatePost(id, { 
      status: 'draft', 
      published_at: null 
    })
  }

  // Archive a post
  const archivePost = async (id: string): Promise<BlogPost> => {
    return updatePost(id, { status: 'archived' })
  }

  // Get a single post by ID
  const getPost = async (id: string): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (err) {
      console.error('Error fetching post:', err)
      return null
    }
  }

  // Get a single post by slug
  const getPostBySlug = async (slug: string): Promise<BlogPostWithTags | null> => {
    try {
      const { data, error } = await supabase.rpc('get_blog_post_with_tags', {
        post_slug: slug
      })
      
      if (error) throw error
      
      // Parse the JSON response
      const result = data as any
      return result?.post || null
    } catch (err) {
      console.error('Error fetching post by slug:', err)
      return null
    }
  }

  // Search blog posts
  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Error searching posts:', err)
      return []
    }
  }

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  // Check if slug is available
  const isSlugAvailable = async (slug: string, excludeId?: string): Promise<boolean> => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)

      if (excludeId) {
        query = query.neq('id', excludeId)
      }

      const { data, error } = await query

      if (error) throw error
      return (data || []).length === 0
    } catch (err) {
      console.error('Error checking slug availability:', err)
      return false
    }
  }

  // Get posts statistics
  const getPostStats = () => {
    const published = posts.filter(p => p.status === 'published').length
    const drafts = posts.filter(p => p.status === 'draft').length
    const archived = posts.filter(p => p.status === 'archived').length
    
    return {
      total: posts.length,
      published,
      drafts,
      archived
    }
  }

  return {
    // State
    posts,
    loading,
    error,
    
    // Actions
    loadPosts,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,
    archivePost,
    getPost,
    getPostBySlug,
    searchPosts,
    
    // Utilities
    generateSlug,
    isSlugAvailable,
    getPostStats
  }
}

// Hook for managing blog post tags
export function useBlogPostTags(postId?: string) {
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load tags for a specific post
  const loadPostTags = async (blogPostId: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('blog_post_tags')
        .select(`
          tag_id,
          content_tags (
            id,
            name,
            slug,
            description,
            color
          )
        `)
        .eq('blog_post_id', blogPostId)

      if (error) throw error
      setTags(data?.map(item => item.content_tags) || [])
    } catch (err) {
      console.error('Error loading post tags:', err)
      setError(err instanceof Error ? err.message : 'Failed to load tags')
    } finally {
      setLoading(false)
    }
  }

  // Add tag to post
  const addTagToPost = async (blogPostId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('blog_post_tags')
        .insert({ blog_post_id: blogPostId, tag_id: tagId })

      if (error) throw error
      await loadPostTags(blogPostId)
    } catch (err) {
      console.error('Error adding tag to post:', err)
      throw err
    }
  }

  // Remove tag from post
  const removeTagFromPost = async (blogPostId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('blog_post_id', blogPostId)
        .eq('tag_id', tagId)

      if (error) throw error
      await loadPostTags(blogPostId)
    } catch (err) {
      console.error('Error removing tag from post:', err)
      throw err
    }
  }

  // Load tags on mount if postId provided
  useEffect(() => {
    if (postId) {
      loadPostTags(postId)
    }
  }, [postId])

  return {
    tags,
    loading,
    error,
    loadPostTags,
    addTagToPost,
    removeTagFromPost
  }
}