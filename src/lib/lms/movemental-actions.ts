'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { lmsSupabase, hasEditAccess, hasAdminAccess } from './supabase'
import type { 
  Organization,
  Course,
  Module,
  Lesson,
  Cohort,
  Experiment,
  APESTProfile,
  mDNAAssessment
} from '@/types/movemental-lms'

// Enhanced validation schemas for movemental functionality
const OrganizationCreateSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  region: z.string().optional(),
  metadata: z.record(z.any()).default({})
})

const CourseCreateSchema = z.object({
  title: z.string().min(1, 'Course title is required'),
  slug: z.string().min(1, 'Course slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  level: z.enum(['foundation', 'intermediate', 'advanced', 'masterclass']).default('foundation'),
  summary: z.string().optional(),
  description: z.string().optional(),
  outcomes_json: z.array(z.string()).default([]),
  duration_weeks: z.number().min(1).default(12),
  price_cents: z.number().min(0).default(0),
  featured_image: z.string().optional()
})

const ModuleCreateSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().min(1, 'Module title is required'),
  order: z.number().min(1),
  summary: z.string().optional(),
  learning_objectives: z.array(z.string()).default([]),
  framework_content: z.string().optional(),
  practice_description: z.string().optional(),
  system_description: z.string().optional()
})

const LessonCreateSchema = z.object({
  module_id: z.string().uuid(),
  title: z.string().min(1, 'Lesson title is required'),
  slug: z.string().min(1, 'Lesson slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  order: z.number().min(1),
  duration_minutes: z.number().min(1).default(30),
  hirsch_excerpt_md: z.string().optional()
})

const CohortCreateSchema = z.object({
  org_id: z.string().uuid(),
  course_id: z.string().uuid(),
  title: z.string().min(1, 'Cohort title is required'),
  start_date: z.string(),
  end_date: z.string(),
  facilitator_id: z.string().uuid().optional(),
  max_participants: z.number().min(1).default(25),
  schedule_json: z.object({
    timezone: z.string().default('UTC'),
    meeting_day: z.string(),
    meeting_time: z.string(),
    frequency: z.enum(['weekly', 'biweekly', 'monthly']).default('biweekly'),
    duration_minutes: z.number().default(90)
  })
})

const ExperimentCreateSchema = z.object({
  cohort_id: z.string().uuid(),
  title: z.string().min(1, 'Experiment title is required'),
  hypothesis: z.string().min(1, 'Hypothesis is required'),
  practice_type: z.enum(['LTG', 'DBS', 'Oikos', 'APEST', 'Contextualization', 'Communitas', 'Other']),
  start_date: z.string(),
  end_date: z.string(),
  metrics_json: z.record(z.any()).default({})
})

const APESTProfileSchema = z.object({
  apostolic: z.number().min(1).max(10),
  prophetic: z.number().min(1).max(10),
  evangelistic: z.number().min(1).max(10),
  shepherding: z.number().min(1).max(10),
  teaching: z.number().min(1).max(10),
  notes: z.string().optional()
})

const mDNAAssessmentSchema = z.object({
  assessment_type: z.enum(['organizational', 'individual', 'team']),
  jesus_lord: z.number().min(1).max(10),
  disciple_making: z.number().min(1).max(10),
  missional_incarnational: z.number().min(1).max(10),
  apest_score: z.number().min(1).max(10),
  organic_systems: z.number().min(1).max(10),  
  communitas: z.number().min(1).max(10),
  notes: z.string().optional()
})

// Helper function to get current user - AUTH DISABLED FOR TESTING
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
export async function createOrganization(data: z.infer<typeof OrganizationCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = OrganizationCreateSchema.parse(data)

  const { data: org, error } = await lmsSupabase
    .schema('lms')
    .from('organizations')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create organization: ${error.message}`)
  }

  // Create owner profile
  await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .insert({
      user_id: user.id,
      org_id: org.id,
      role: 'owner',
      timezone: 'UTC',
      preferences_json: {},
      profile_json: {}
    })

  revalidatePath('/lms/dashboard')
  return org
}

export async function getOrganizationByUserId(userId: string) {
  const { data: profile } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select(`
      org_id,
      role,
      organizations!inner (
        id,
        name,
        slug,
        region,
        metadata,
        theme_json,
        created_at
      )
    `)
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (!profile) {
    // Development fallback: return mock organization
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock organization for movemental development')
      return {
        id: 'dev-org-1',
        name: 'Development Organization',
        slug: 'dev-org',
        region: 'Development',
        metadata: {},
        theme_json: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    
    throw new Error('No organization found for user')
  }

  return (profile as unknown as { organizations: Organization[] }).organizations
}

// Course Actions
export async function createCourse(data: z.infer<typeof CourseCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = CourseCreateSchema.parse(data)

  const { data: course, error } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .insert({
      ...validatedData,
      created_by: user.id
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create course: ${error.message}`)
  }

  revalidatePath('/lms/dashboard')
  revalidatePath('/lms/courses')
  return course
}

export async function getMovementalCourse() {
  // Use real content from file system
  const { getMovementalCourse: getCourse } = await import('@/lib/movemental-content')
  const course = getCourse()
  
  // Transform to match expected database format
  return {
    id: 'movemental-course-1',
    title: course.title,
    slug: course.slug,
    description: course.description,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    modules: course.modules.map(module => ({
      id: `module-${module.order}`,
      title: module.title,
      slug: module.slug,
      order: module.order,
      lessons: module.lessons.map(lesson => ({
        id: `lesson-${lesson.order}`,
        title: lesson.title,
        slug: lesson.lessonSlug,
        order: lesson.order,
        duration_minutes: lesson.duration,
        content: lesson.content,
        lesson_components: []
      }))
    }))
  }
}

// Module Actions
export async function createModule(data: z.infer<typeof ModuleCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = ModuleCreateSchema.parse(data)

  // Check course access
  const { data: course } = await lmsSupabase
    .schema('lms')
    .from('courses')
    .select('created_by')
    .eq('id', validatedData.course_id)
    .single()

  if (!course || course.created_by !== user.id) {
    throw new Error('Insufficient permissions to create module')
  }

  const { data: module, error } = await lmsSupabase
    .schema('lms')
    .from('modules')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create module: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${validatedData.course_id}`)
  return module
}

// Lesson Actions
export async function createLesson(data: z.infer<typeof LessonCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = LessonCreateSchema.parse(data)

  // Check module access
  const { data: module } = await lmsSupabase
    .schema('lms')
    .from('modules')
    .select(`
      id,
      courses!inner (created_by)
    `)
    .eq('id', validatedData.module_id)
    .single()

  if (!module || (module as unknown as { courses: { created_by: string } }).courses.created_by !== user.id) {
    throw new Error('Insufficient permissions to create lesson')
  }

  const { data: lesson, error } = await lmsSupabase
    .schema('lms')
    .from('lessons')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create lesson: ${error.message}`)
  }

  revalidatePath(`/lms/courses/${(module as unknown as { courses: { id: string } }).courses.id}`)
  return lesson
}

// Cohort Actions
export async function createCohort(data: z.infer<typeof CohortCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = CohortCreateSchema.parse(data)

  // Check organization access
  if (!(await hasAdminAccess(user.id, validatedData.org_id))) {
    throw new Error('Insufficient permissions to create cohort')
  }

  const { data: cohort, error } = await lmsSupabase
    .schema('lms')
    .from('cohorts')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create cohort: ${error.message}`)
  }

  // Enroll facilitator if specified
  if (validatedData.facilitator_id) {
    await lmsSupabase
      .schema('lms')
      .from('cohort_enrollments')
      .insert({
        cohort_id: cohort.id,
        user_id: validatedData.facilitator_id,
        role: 'facilitator',
        status: 'active'
      })
  }

  revalidatePath('/lms/cohorts')
  return cohort
}

export async function enrollInCohort(cohortId: string, userId?: string) {
  const user = await getCurrentUser()
  const targetUserId = userId || user.id

  const { data: enrollment, error } = await lmsSupabase
    .schema('lms')
    .from('cohort_enrollments')
    .insert({
      cohort_id: cohortId,
      user_id: targetUserId,
      role: 'participant',
      status: 'enrolled'
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to enroll in cohort: ${error.message}`)
  }

  revalidatePath(`/lms/cohorts/${cohortId}`)
  return enrollment
}

// Experiment Actions (Movement-Specific)
export async function createExperiment(data: z.infer<typeof ExperimentCreateSchema>) {
  const user = await getCurrentUser()
  const validatedData = ExperimentCreateSchema.parse(data)

  // Check cohort access
  const { data: enrollment } = await lmsSupabase
    .schema('lms')
    .from('cohort_enrollments')
    .select('role')
    .eq('cohort_id', validatedData.cohort_id)
    .eq('user_id', user.id)
    .single()

  if (!enrollment) {
    throw new Error('Must be enrolled in cohort to create experiments')
  }

  const { data: experiment, error } = await lmsSupabase
    .schema('lms')
    .from('experiments')
    .insert({
      ...validatedData,
      owner_id: user.id,
      status: 'planning'
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create experiment: ${error.message}`)
  }

  revalidatePath(`/lms/cohorts/${validatedData.cohort_id}`)
  return experiment
}

export async function addExperimentCheckin(experimentId: string, checkinData: {
  progress_score: number
  blockers_text?: string
  learnings_text?: string
  next_steps?: string
}) {
  const user = await getCurrentUser()

  // Check experiment ownership
  const { data: experiment } = await lmsSupabase
    .schema('lms')
    .from('experiments')
    .select('owner_id')
    .eq('id', experimentId)
    .single()

  if (!experiment || experiment.owner_id !== user.id) {
    throw new Error('Can only add check-ins to your own experiments')
  }

  const { data: checkin, error } = await lmsSupabase
    .schema('lms')
    .from('experiment_checkins')
    .insert({
      experiment_id: experimentId,
      date: new Date().toISOString().split('T')[0],
      ...checkinData
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to add check-in: ${error.message}`)
  }

  revalidatePath(`/lms/experiments/${experimentId}`)
  return checkin
}

// APEST Assessment Actions
export async function createAPESTProfile(data: z.infer<typeof APESTProfileSchema>) {
  const user = await getCurrentUser()
  const validatedData = APESTProfileSchema.parse(data)

  const { data: profile, error } = await lmsSupabase
    .schema('lms')
    .from('apest_profiles')
    .insert({
      user_id: user.id,
      ...validatedData,
      assessment_date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create APEST profile: ${error.message}`)
  }

  // Update user profile with primary APEST
  const scores = [
    { type: 'apostolic', score: validatedData.apostolic },
    { type: 'prophetic', score: validatedData.prophetic },
    { type: 'evangelistic', score: validatedData.evangelistic },
    { type: 'shepherding', score: validatedData.shepherding },
    { type: 'teaching', score: validatedData.teaching }
  ]
  
  const primary = scores.reduce((max, current) => 
    current.score > max.score ? current : max
  )

  await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .update({ apest_primary: primary.type as 'apostolic' | 'prophetic' | 'evangelistic' | 'shepherding' | 'teaching' })
    .eq('user_id', user.id)

  revalidatePath('/lms/profile')
  return profile
}

export async function getLatestAPESTProfile(userId?: string) {
  const user = await getCurrentUser()
  const targetUserId = userId || user.id

  const { data: profile, error } = await lmsSupabase
    .schema('lms')
    .from('apest_profiles')
    .select('*')
    .eq('user_id', targetUserId)
    .order('assessment_date', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch APEST profile: ${error.message}`)
  }

  return profile || null
}

// mDNA Assessment Actions
export async function createmDNAAssessment(
  data: z.infer<typeof mDNAAssessmentSchema>, 
  orgId?: string
) {
  const user = await getCurrentUser()
  const validatedData = mDNAAssessmentSchema.parse(data)

  const { data: assessment, error } = await lmsSupabase
    .schema('lms')
    .from('mdna_assessments')
    .insert({
      ...validatedData,
      org_id: orgId,
      user_id: validatedData.assessment_type === 'individual' ? user.id : undefined,
      assessment_date: new Date().toISOString().split('T')[0],
      scores_json: {
        overall_score: (
          validatedData.jesus_lord +
          validatedData.disciple_making +
          validatedData.missional_incarnational +
          validatedData.apest_score +
          validatedData.organic_systems +
          validatedData.communitas
        ) / 6
      }
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create mDNA assessment: ${error.message}`)
  }

  revalidatePath('/lms/assessments')
  return assessment
}

// Analytics Actions
export async function generateMovementalScorecard(cohortId: string) {
  const user = await getCurrentUser()

  // Check cohort access
  const { data: cohort } = await lmsSupabase
    .schema('lms')
    .from('cohorts')
    .select('org_id, facilitator_id')
    .eq('id', cohortId)
    .single()

  if (!cohort || (
    cohort.facilitator_id !== user.id && 
    !(await hasAdminAccess(user.id, cohort.org_id))
  )) {
    throw new Error('Insufficient permissions to view scorecard')
  }

  // Fetch cohort data for scorecard
  const { data: enrollments } = await lmsSupabase
    .schema('lms')
    .from('cohort_enrollments')
    .select(`
      user_id,
      user_profiles!inner (apest_primary),
      apest_profiles!inner (*),
      experiments!inner (*),
      mdna_assessments!inner (*)
    `)
    .eq('cohort_id', cohortId)
    .eq('status', 'active')

  // Calculate scorecard metrics
  const scorecard = {
    identity_shift_indicators: {
      movement_language_adoption: 75, // TODO: Calculate from discussions/submissions
      paradigm_shift_evidence: [],
      behavioral_changes: []
    },
    mdna_integration: {
      // Calculate from mDNA assessments
      overall_score: 0
    },
    practice_implementation: {
      ltg_adoption: 0,
      discovery_bible_usage: 0,
      oikos_mapping_completion: 0,
      apest_team_implementation: 0
    }
  }

  // Save snapshot
  await lmsSupabase
    .schema('lms')
    .from('analytics_snapshots')
    .insert({
      cohort_id: cohortId,
      snapshot_date: new Date().toISOString().split('T')[0],
      movemental_scorecard_json: scorecard,
      apest_balance_json: {},
      practice_adoption_json: {},
      multiplication_metrics_json: {},
      engagement_metrics_json: {}
    })

  return scorecard
}

// Utility function to seed the Movemental course
export async function seedMovementalCourse() {
  const user = await getCurrentUser()

  // Check if course already exists
  const existing = await getMovementalCourse()
  if (existing) {
    return existing
  }

  // Create the course
  const course = await createCourse({
    title: 'Movemental Thinking for Network Leaders (Advanced)',
    slug: 'movemental-thinking-advanced',
    level: 'advanced',
    summary: 'Transform from institutional manager to movement catalyst through Framework → Practice → System progression',
    description: 'A 16-week cohort-based journey that operationalizes Alan Hirsch\'s movement theology into practical, reproducible systems. Learn to implement mDNA, APEST, and organic systems at scale.',
    outcomes_json: [
      'Articulate church-as-movement over church-as-institution',
      'Internalize mDNA as apostolic genius of movements',
      'Master movemental framework from The Forgotten Ways, 5Q, and The Permanent Revolution',
      'Run reproducible disciple-making practices (LTGs, Discovery Bible, oikos mapping)',
      'Implement APEST-aligned leadership structures',
      'Produce contextual multiplication pathways',
      'Leave with peer-tested 90-day movemental experiment'
    ],
    duration_weeks: 16,
    price_cents: 149700 // $1,497
  })

  revalidatePath('/lms/courses')
  return course
}
