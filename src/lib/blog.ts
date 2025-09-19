import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

// Extended blog post type with author info (if available)
export type BlogPostWithAuthor = BlogPost & {
  author?: {
    id: string
    full_name: string | null
    avatar_url: string | null
  } | null
}

export interface BlogPostsResponse {
  posts: BlogPostWithAuthor[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface CategoryWithCount {
  name: string
  count: number
}

export interface TagWithCount {
  name: string
  count: number
}

export class BlogService {
  private supabase = createClient()

  // Get published posts with pagination
  async getPublishedPosts(options: {
    page?: number
    limit?: number
    category?: string
    tag?: string
    featured?: boolean
  } = {}): Promise<BlogPostsResponse> {
    const { page = 1, limit = 10, category, tag, featured } = options
    const offset = (page - 1) * limit

    let query = this.supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    // Add filters
    if (category) {
      // If we add category field to database later
      // query = query.eq('category', category)
    }

    if (tag) {
      // If we add tags array field to database later
      // query = query.contains('tags', [tag])
    }

    if (featured !== undefined) {
      // If we add is_featured field to database later
      // query = query.eq('is_featured', featured)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) throw error

    return {
      posts: (data || []) as BlogPostWithAuthor[],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string): Promise<BlogPostWithAuthor> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error

    // For now, we don't have profiles table, so we'll return without author info
    return data as BlogPostWithAuthor
  }

  // Search posts (basic text search for now)
  async searchPosts(query: string, limit = 10): Promise<BlogPostWithAuthor[]> {
    if (!query.trim()) return []

    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return (data || []) as BlogPostWithAuthor[]
  }

  // Get recent posts
  async getRecentPosts(limit = 5): Promise<BlogPostWithAuthor[]> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return (data || []) as BlogPostWithAuthor[]
  }

  // Get related posts (simplified - by same author for now)
  async getRelatedPosts(postId: string, authorId?: string | null, limit = 3): Promise<BlogPostWithAuthor[]> {
    let query = this.supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (authorId) {
      query = query.eq('author_id', authorId)
    }

    const { data, error } = await query

    if (error) throw error
    return (data || []) as BlogPostWithAuthor[]
  }

  // Get all unique categories (mock for now since we don't have category field yet)
  async getCategories(): Promise<CategoryWithCount[]> {
    // Placeholder implementation - would need category field in database
    return [
      { name: 'Leadership', count: 12 },
      { name: 'Church Planting', count: 8 },
      { name: 'Missional', count: 15 },
      { name: 'Theology', count: 6 }
    ]
  }

  // Get all unique tags (mock for now since we don't have tags field yet)
  async getTags(): Promise<TagWithCount[]> {
    // Placeholder implementation - would need tags field in database
    return [
      { name: 'leadership', count: 10 },
      { name: 'church-planting', count: 7 },
      { name: 'discipleship', count: 9 },
      { name: 'mission', count: 11 },
      { name: 'theology', count: 5 }
    ]
  }

  // Create a new blog post
  async createPost(post: Database['public']['Tables']['blog_posts']['Insert']): Promise<BlogPost> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Update a blog post
  async updatePost(id: string, updates: Database['public']['Tables']['blog_posts']['Update']): Promise<BlogPost> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle post status
  async togglePostStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<BlogPost> {
    const updates: Database['public']['Tables']['blog_posts']['Update'] = {
      status,
      updated_at: new Date().toISOString()
    }

    if (status === 'published') {
      updates.published_at = new Date().toISOString()
    }

    return this.updatePost(id, updates)
  }
}

export const blogService = new BlogService()