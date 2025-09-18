'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { lmsSupabase, hasEditAccess, hasAdminAccess } from './supabase'
import { BlocksArraySchema } from './blocks/schemas'
import type { 
  Organization,
  Course, 
  Module,
  Lesson,
  CohortEnrollment,
  Database
} from '@/types/movemental-lms'

// Type aliases for database operations
type OrganizationInsert = Database['lms']['Tables']['organizations']['Insert']
type CourseInsert = Database['lms']['Tables']['courses']['Insert']
type CourseUpdate = Database['lms']['Tables']['courses']['Update']
type ModuleInsert = Database['lms']['Tables']['modules']['Insert']
type ModuleUpdate = Database['lms']['Tables']['modules']['Update']
type LessonInsert = Database['lms']['Tables']['lessons']['Insert']
type LessonUpdate = Database['lms']['Tables']['lessons']['Update']
type EnrollmentInsert = Database['lms']['Tables']['cohort_enrollments']['Insert']

// Validation schemas for server actions
const TenantCreateSchema = z.object({
  name: z.string().min(1, 'Tenant name is required'),
  slug: z.string().min(1, 'Tenant slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
})

const CourseCreateSchema = z.object({
  tenantId: z.string().uuid(),
  title: z.string().min(1, 'Course title is required'),
  slug: z.string().min(1, 'Course slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  summary: z.string().optional(),
  priceCents: z.number().min(0).default(0),
})

const CourseUpdateSchema = CourseCreateSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['draft', 'review', 'published']).optional(),
})

const ModuleCreateSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1, 'Module title is required'),
  order: z.number().min(0),
})

const LessonCreateSchema = z.object({
  moduleId: z.string().uuid(),
  title: z.string().min(1, 'Lesson title is required'),
  slug: z.string().min(1, 'Lesson slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  order: z.number().min(0),
  durationEstimate: z.number().min(1).default(10),
})

const LessonUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  slug: z.string().optional(),
  order: z.number().optional(),
  durationEstimate: z.number().optional(),
  status: z.enum(['draft', 'review', 'published']).optional(),
  blocks: BlocksArraySchema.optional(),
  seoData: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
})

// Helper to get current user - AUTH DISABLED FOR TESTING
async function getCurrentUser() {
  // Return mock user for testing
  return {
    id: 'test-user-123',
    email: 'test@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    role: 'authenticated'
  }
}

// Organization Actions
export async function createTenant(data: z.infer<typeof TenantCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = TenantCreateSchema.parse(data)

  const orgData = {
    name: validatedData.name,
    slug: validatedData.slug,
    metadata: {},
    theme_json: {}
  }

  const { data: organization, error } = await lmsSupabase
    .schema('lms')
    .from('organizations')
    .insert(orgData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create organization: ${error.message}`)
  }

  // Create or update user profile for this organization
  await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .upsert({
      user_id: user.id,
      org_id: organization.id,
      role: 'owner',
      timezone: 'America/Los_Angeles',
      preferences_json: {},
      profile_json: {}
    })

  revalidatePath('/lms/dashboard')
  return organization
}

// Get tenant by user ID (first organization they're a member of)
export async function getTenantByUserId(userId: string) {
  // Development mode: return mock data if no profile found
  const { data: profile } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select(`
      org_id,
      organizations!inner (
        id,
        name,
        slug,
        metadata,
        theme_json,
        created_at,
        updated_at
      )
    `)
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (!profile) {
    console.error('No profile found for user:', userId)
    
    // Development fallback: return mock organization
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock organization for development')
      return {
        id: 'dev-org-1',
        name: 'Development Organization',
        slug: 'dev-org',
        metadata: {},
        theme_json: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    
    throw new Error('No organization found for user')
  }

  console.log('Profile found:', profile)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (profile as any).organizations
}

// Get courses by tenant ID
export async function getCoursesByTenantId(tenantId: string) {
  const user = await getCurrentUser()

  // Development mode: skip permission check for mock org
  if (tenantId === 'dev-org-1' && process.env.NODE_ENV === 'development') {
    console.log('Returning all courses for development')
    const { data: courses, error } = await lmsSupabase
      .schema('lms')
      .from('courses')
      .select(`
        id,
        title,
        summary,
        status,
        slug,
        price_cents,
        created_at,
        updated_at
      `)
      .limit(10)

    if (error) {
      console.error('Error fetching courses:', error)
      return []
    }

    return courses || []
  }

  // Check if user has access to tenant
  if (!(await hasEditAccess(user.id, tenantId))) {
    throw new Error('Insufficient permissions to view courses')
  }

  const { data: courses, error } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select(`
      id,
      title,
      summary,
      status,
      slug,
      price_cents,
      featured_media,
      created_at,
      published_at
    `)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`)
  }

  // Transform the data to include counts (TODO: implement actual counts)
  return courses?.map(course => ({
    ...course,
    _count: {
      modules: 0, // TODO: get actual module count
      enrollments: 0 // TODO: get actual enrollment count
    }
  })) || []
}

// Course Actions
export async function createCourse(data: z.infer<typeof CourseCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = CourseCreateSchema.parse(data)

  // Check if user has edit access to tenant
  if (!(await hasEditAccess(user.id, validatedData.tenantId))) {
    throw new Error('Insufficient permissions to create course')
  }

  const courseData: CourseInsert = {
    title: validatedData.title,
    slug: validatedData.slug,
    level: 'foundation', // Default level
    summary: validatedData.summary,
    outcomes_json: [],
    duration_weeks: 4, // Default duration
    status: 'draft',
    price_cents: validatedData.priceCents,
    created_by: user.id,
  }

  const { data: course, error } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .insert(courseData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create course: ${error.message}`)
  }

  revalidatePath('/lms/dashboard')
  return course
}

export async function updateCourse(data: z.infer<typeof CourseUpdateSchema>) {
  const user = await getCurrentUser()
  const validatedData = CourseUpdateSchema.parse(data)

  // Get course to check tenant access
  const { data: course } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select('tenant_id')
    .eq('id', validatedData.id)
    .single()

  if (!course || !(await hasEditAccess(user.id, course.tenant_id))) {
    throw new Error('Insufficient permissions to update course')
  }

  const updateData: CourseUpdate = {}
  if (validatedData.title) updateData.title = validatedData.title
  if (validatedData.slug) updateData.slug = validatedData.slug
  if (validatedData.summary !== undefined) updateData.summary = validatedData.summary
  if (validatedData.priceCents !== undefined) updateData.price_cents = validatedData.priceCents
  if (validatedData.status) updateData.status = validatedData.status

  const { data: updatedCourse, error } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .update(updateData)
    .eq('id', validatedData.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update course: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${validatedData.id}`)
  return updatedCourse
}

// Module Actions
export async function createModule(data: z.infer<typeof ModuleCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = ModuleCreateSchema.parse(data)

  // Check course access
  const { data: course } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select('tenant_id')
    .eq('id', validatedData.courseId)
    .single()

  if (!course || !(await hasEditAccess(user.id, course.tenant_id))) {
    throw new Error('Insufficient permissions to create module')
  }

  const moduleData: ModuleInsert = {
    course_id: validatedData.courseId,
    title: validatedData.title,
    order: validatedData.order,
    learning_objectives: [],
  }

  const { data: module, error } = await lmsSupabase
    .schema('lms')
    .from('modules')
    .insert(moduleData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create module: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${validatedData.courseId}`)
  return module
}

// Lesson Actions
export async function createLesson(data: z.infer<typeof LessonCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = LessonCreateSchema.parse(data)

  // Check module/course access
  const { data: moduleWithCourse } = await lmsSupabase
    .schema('lms')
    .from('modules')
    .select('course_id, courses(tenant_id)')
    .eq('id', validatedData.moduleId)
    .single()

  if (!moduleWithCourse?.courses || !(await hasEditAccess(user.id, (moduleWithCourse.courses as unknown as { tenant_id: string }).tenant_id))) {
    throw new Error('Insufficient permissions to create lesson')
  }

  const lessonData: LessonInsert = {
    module_id: validatedData.moduleId,
    title: validatedData.title,
    slug: validatedData.slug,
    order: validatedData.order,
    duration_minutes: validatedData.durationEstimate || 30,
    media_refs: [],
    reading_refs: [],
    status: 'draft',
  }

  const { data: lesson, error } = await lmsSupabase
    .schema('lms')
    .from('lessons')
    .insert(lessonData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create lesson: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${moduleWithCourse.course_id}`)
  return lesson
}

export async function updateLesson(data: z.infer<typeof LessonUpdateSchema>) {
  const user = await getCurrentUser()
  const validatedData = LessonUpdateSchema.parse(data)

  // Check lesson access
  const { data: lessonWithCourse } = await lmsSupabase
    .schema('lms')
    .from('lessons')
    .select('module_id, modules(course_id, courses(tenant_id))')
    .eq('id', validatedData.id)
    .single()

  const tenantId = (lessonWithCourse?.modules as unknown as { courses?: { tenant_id: string } })?.courses?.tenant_id
  if (!tenantId || !(await hasEditAccess(user.id, tenantId))) {
    throw new Error('Insufficient permissions to update lesson')
  }

  const updateData: LessonUpdate = {}
  if (validatedData.title) updateData.title = validatedData.title
  if (validatedData.slug) updateData.slug = validatedData.slug
  if (validatedData.order !== undefined) updateData.order = validatedData.order
  if (validatedData.durationEstimate) updateData.duration_minutes = validatedData.durationEstimate
  if (validatedData.status) updateData.status = validatedData.status

  const { data: updatedLesson, error } = await lmsSupabase
    .schema('lms')
    .from('lessons')
    .update(updateData)
    .eq('id', validatedData.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update lesson: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${(lessonWithCourse?.modules as unknown as { course_id: string })?.course_id}/modules/${lessonWithCourse?.module_id}/lessons/${validatedData.id}/edit`)
  return updatedLesson
}

// Enrollment Actions
export async function enrollInCourse(courseId: string) {
  const user = await getCurrentUser()

  // Check if course is published
  const { data: course } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select('status, price_cents')
    .eq('id', courseId)
    .single()

  if (!course || course.status !== 'published') {
    throw new Error('Course is not available for enrollment')
  }

  // For now, we'll create a direct course enrollment (would normally use cohorts)
  // In a real implementation, this would integrate with Stripe for paid courses
  // Since we don't have a direct course enrollment table, we'll skip this for now
  // and just return success
  
  const enrollment = {
    id: `direct-${courseId}-${user.id}`,
    course_id: courseId,
    user_id: user.id,
    status: 'active' as const,
    enrolled_at: new Date().toISOString()
  }

  // const { data: enrollment, error } = await lmsSupabase
  //   .schema('lms')
  //   .from('course_enrollments') // This table doesn't exist in our schema
  //   .insert(enrollmentData)
  //   .select()
  //   .single()

  const error = null // No error for mock enrollment

  if (error) {
    throw new Error(`Failed to enroll in course: ${error}`)
  }

  revalidatePath('/lms/dashboard')
  return enrollment
}

// Progress Actions
export async function updateLessonProgress(lessonId: string, status: 'not_started' | 'in_progress' | 'completed', scoreData?: Record<string, unknown>) {
  const user = await getCurrentUser()

  const { data: progress, error } = await lmsSupabase
    .schema('lms')
    .from('lesson_progress')
    .upsert({
      lesson_id: lessonId,
      user_id: user.id,
      status,
      score_json: scoreData || {},
      last_viewed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update lesson progress: ${error.message}`)
  }

  return progress
}

// Delete Actions
export async function deleteCourse(courseId: string) {
  const user = await getCurrentUser()

  // Check course access
  const { data: course } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select('tenant_id')
    .eq('id', courseId)
    .single()

  if (!course || !(await hasAdminAccess(user.id, course.tenant_id))) {
    throw new Error('Insufficient permissions to delete course')
  }

  const { error } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .delete()
    .eq('id', courseId)

  if (error) {
    throw new Error(`Failed to delete course: ${error.message}`)
  }

  revalidatePath('/lms/dashboard')
  redirect('/lms/dashboard')
}
