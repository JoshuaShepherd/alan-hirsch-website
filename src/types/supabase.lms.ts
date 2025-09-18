// Generated TypeScript types for LMS schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  lms: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          owner: string
          theme_json: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          owner: string
          theme_json?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          owner?: string
          theme_json?: Json
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          tenant_id: string
          user_id: string
          role: 'admin' | 'editor' | 'viewer'
          created_at: string
        }
        Insert: {
          tenant_id: string
          user_id: string
          role?: 'admin' | 'editor' | 'viewer'
          created_at?: string
        }
        Update: {
          tenant_id?: string
          user_id?: string
          role?: 'admin' | 'editor' | 'viewer'
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          tenant_id: string
          slug: string
          title: string
          summary: string | null
          status: 'draft' | 'review' | 'published'
          price_cents: number
          featured_media: string | null
          created_by: string
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          slug: string
          title: string
          summary?: string | null
          status?: 'draft' | 'review' | 'published'
          price_cents?: number
          featured_media?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          tenant_id?: string
          slug?: string
          title?: string
          summary?: string | null
          status?: 'draft' | 'review' | 'published'
          price_cents?: number
          featured_media?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          slug: string
          title: string
          order: number
          duration_estimate: number
          status: 'draft' | 'review' | 'published'
          tiptap_doc: Json
          blocks_json: Json
          seo_json: Json
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          module_id: string
          slug: string
          title: string
          order: number
          duration_estimate?: number
          status?: 'draft' | 'review' | 'published'
          tiptap_doc?: Json
          blocks_json?: Json
          seo_json?: Json
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          module_id?: string
          slug?: string
          title?: string
          order?: number
          duration_estimate?: number
          status?: 'draft' | 'review' | 'published'
          tiptap_doc?: Json
          blocks_json?: Json
          seo_json?: Json
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      enrollments: {
        Row: {
          id: string
          course_id: string
          user_id: string
          status: 'active' | 'canceled' | 'completed' | 'refunded'
          started_at: string
          completed_at: string | null
          progress_pct: number
        }
        Insert: {
          id?: string
          course_id: string
          user_id: string
          status?: 'active' | 'canceled' | 'completed' | 'refunded'
          started_at?: string
          completed_at?: string | null
          progress_pct?: number
        }
        Update: {
          id?: string
          course_id?: string
          user_id?: string
          status?: 'active' | 'canceled' | 'completed' | 'refunded'
          started_at?: string
          completed_at?: string | null
          progress_pct?: number
        }
      }
      lesson_progress: {
        Row: {
          id: string
          lesson_id: string
          user_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          last_viewed_at: string
          score_json: Json
        }
        Insert: {
          id?: string
          lesson_id: string
          user_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          last_viewed_at?: string
          score_json?: Json
        }
        Update: {
          id?: string
          lesson_id?: string
          user_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          last_viewed_at?: string
          score_json?: Json
        }
      }
      media: {
        Row: {
          id: string
          tenant_id: string
          url: string
          type: 'image' | 'video' | 'audio' | 'file'
          alt: string | null
          meta_json: Json
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          url: string
          type: 'image' | 'video' | 'audio' | 'file'
          alt?: string | null
          meta_json?: Json
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          url?: string
          type?: 'image' | 'video' | 'audio' | 'file'
          alt?: string | null
          meta_json?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tenant = Database['lms']['Tables']['tenants']['Row']
export type TenantInsert = Database['lms']['Tables']['tenants']['Insert']
export type TenantUpdate = Database['lms']['Tables']['tenants']['Update']

export type Membership = Database['lms']['Tables']['memberships']['Row']
export type MembershipInsert = Database['lms']['Tables']['memberships']['Insert']
export type MembershipUpdate = Database['lms']['Tables']['memberships']['Update']

export type Course = Database['lms']['Tables']['courses']['Row']
export type CourseInsert = Database['lms']['Tables']['courses']['Insert']
export type CourseUpdate = Database['lms']['Tables']['courses']['Update']

export type Module = Database['lms']['Tables']['modules']['Row']
export type ModuleInsert = Database['lms']['Tables']['modules']['Insert']
export type ModuleUpdate = Database['lms']['Tables']['modules']['Update']

export type Lesson = Database['lms']['Tables']['lessons']['Row']
export type LessonInsert = Database['lms']['Tables']['lessons']['Insert']
export type LessonUpdate = Database['lms']['Tables']['lessons']['Update']

export type Enrollment = Database['lms']['Tables']['enrollments']['Row']
export type EnrollmentInsert = Database['lms']['Tables']['enrollments']['Insert']
export type EnrollmentUpdate = Database['lms']['Tables']['enrollments']['Update']

export type LessonProgress = Database['lms']['Tables']['lesson_progress']['Row']
export type LessonProgressInsert = Database['lms']['Tables']['lesson_progress']['Insert']
export type LessonProgressUpdate = Database['lms']['Tables']['lesson_progress']['Update']

export type Media = Database['lms']['Tables']['media']['Row']
export type MediaInsert = Database['lms']['Tables']['media']['Insert']
export type MediaUpdate = Database['lms']['Tables']['media']['Update']

// Extended types with relations
export type CourseWithModules = Course & {
  modules: (Module & {
    lessons: Lesson[]
  })[]
}

export type LessonWithModule = Lesson & {
  module: Module & {
    course: Course
  }
}

export type TenantWithMemberships = Tenant & {
  memberships: Membership[]
}
