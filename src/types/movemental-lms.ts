// TypeScript types for Movemental LMS Schema
// Generated and enhanced for movement-specific functionality

export interface Organization {
  id: string
  name: string
  region?: string
  slug: string
  metadata: Record<string, unknown>
  theme_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  org_id?: string
  role: 'owner' | 'facilitator' | 'leader' | 'participant' | 'observer'
  apest_primary?: 'apostolic' | 'prophetic' | 'evangelistic' | 'shepherding' | 'teaching'
  bio?: string
  avatar_url?: string
  timezone: string
  preferences_json: Record<string, unknown>
  profile_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  level: 'foundation' | 'intermediate' | 'advanced' | 'masterclass'
  summary?: string
  description?: string
  outcomes_json: string[]
  duration_weeks: number
  status: 'draft' | 'review' | 'published' | 'archived'
  featured_image?: string
  price_cents: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Module {
  id: string
  course_id: string
  order: number
  title: string
  summary?: string
  learning_objectives: string[]
  framework_content?: string
  practice_description?: string
  system_description?: string
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  module_id: string
  order: number
  title: string
  slug: string
  duration_minutes: number
  media_refs: MediaReference[]
  reading_refs: ReadingReference[]
  hirsch_excerpt_md?: string
  status: 'draft' | 'review' | 'published'
  created_at: string
  updated_at: string
}

export interface MediaReference {
  type: 'video' | 'audio' | 'image'
  url: string
  title?: string
  duration?: number
  thumbnail?: string
}

export interface ReadingReference {
  title: string
  author?: string
  url?: string
  pages?: string
  summary?: string
}

export interface LessonComponent {
  id: string
  lesson_id: string
  order: number
  type: 'video' | 'reading' | 'reflection' | 'activity' | 'quiz' | 'canvas' | 'upload' | 'discussion' | 'assessment'
  title?: string
  description?: string
  config_json: Record<string, unknown>
  content_json: Record<string, unknown>
  required: boolean
  created_at: string
}

export interface Cohort {
  id: string
  org_id: string
  course_id: string
  title: string
  start_date: string
  end_date: string
  facilitator_id?: string
  max_participants: number
  schedule_json: CohortSchedule
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface CohortSchedule {
  timezone: string
  meeting_day: string
  meeting_time: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  duration_minutes: number
}

export interface CohortEnrollment {
  id: string
  cohort_id: string
  user_id: string
  role: 'facilitator' | 'participant' | 'observer'
  status: 'enrolled' | 'active' | 'completed' | 'dropped' | 'cancelled'
  enrolled_at: string
  completed_at?: string
}

export interface CohortSession {
  id: string
  cohort_id: string
  session_number: number
  title: string
  scheduled_at: string
  duration_minutes: number
  type: 'teaching' | 'coaching' | 'clinic' | 'office_hours'
  zoom_link?: string
  recording_url?: string
  notes?: string
  created_at: string
}

export interface Experiment {
  id: string
  cohort_id: string
  owner_id: string
  title: string
  hypothesis: string
  practice_type: 'LTG' | 'DBS' | 'Oikos' | 'APEST' | 'Contextualization' | 'Communitas' | 'Other'
  start_date: string
  end_date: string
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  metrics_json: ExperimentMetrics
  results_json: ExperimentResults
  created_at: string
  updated_at: string
}

export interface ExperimentMetrics {
  participants_target?: number
  sessions_planned?: number
  engagement_goal?: string
  success_indicators?: string[]
}

export interface ExperimentResults {
  participants_actual?: number
  sessions_completed?: number
  outcomes?: string[]
  lessons_learned?: string[]
  recommendations?: string[]
}

export interface ExperimentCheckin {
  id: string
  experiment_id: string
  date: string
  progress_score: number // 1-10
  blockers_text?: string
  learnings_text?: string
  next_steps?: string
  created_at: string
}

export interface APESTProfile {
  id: string
  user_id: string
  apostolic: number // 1-10
  prophetic: number // 1-10
  evangelistic: number // 1-10
  shepherding: number // 1-10
  teaching: number // 1-10
  assessment_date: string
  notes?: string
  created_at: string
}

export interface TeamAPESTMatrix {
  id: string
  cohort_id: string
  data_json: APESTMatrixData
  generated_at: string
}

export interface APESTMatrixData {
  team_averages: {
    apostolic: number
    prophetic: number
    evangelistic: number
    shepherding: number
    teaching: number
  }
  individual_scores: {
    user_id: string
    name: string
    scores: APESTProfile
  }[]
  gaps: string[]
  recommendations: string[]
}

export interface mDNAAssessment {
  id: string
  org_id?: string
  user_id?: string
  assessment_type: 'organizational' | 'individual' | 'team'
  jesus_lord: number // 1-10
  disciple_making: number // 1-10
  missional_incarnational: number // 1-10
  apest_score: number // 1-10
  organic_systems: number // 1-10
  communitas: number // 1-10
  assessment_date: string
  scores_json: Record<string, unknown>
  notes?: string
  created_at: string
}

export interface Submission {
  id: string
  component_id: string
  user_id: string
  content_json: Record<string, unknown>
  file_url?: string
  rubric_scores_json: RubricScores
  status: 'draft' | 'submitted' | 'reviewed' | 'approved'
  submitted_at?: string
  reviewed_at?: string
  feedback?: string
  grade?: number // 0-100
  created_at: string
  updated_at: string
}

export interface RubricScores {
  criteria: {
    name: string
    score: number
    max_score: number
    feedback?: string
  }[]
  total_score: number
  max_total: number
}

export interface ProgressTracking {
  user_id: string
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  time_spent: number // minutes
  last_accessed: string
  completed_at?: string
}

export interface DiscussionThread {
  id: string
  cohort_id: string
  title: string
  description?: string
  type: 'general' | 'case_clinic' | 'q_and_a' | 'experiment_sharing'
  created_by: string
  pinned: boolean
  created_at: string
  updated_at: string
}

export interface DiscussionPost {
  id: string
  thread_id: string
  user_id: string
  content: string
  attachments_json: Attachment[]
  reply_to?: string
  posted_at: string
  updated_at: string
}

export interface Attachment {
  type: 'file' | 'image' | 'link'
  url: string
  name: string
  size?: number
}

export interface Resource {
  id: string
  module_id?: string
  course_id?: string
  type: 'slide' | 'guide' | 'card' | 'canvas_template' | 'toolkit' | 'video' | 'document'
  title: string
  description?: string
  file_url?: string
  preview_url?: string
  editable: boolean
  download_count: number
  tags: string[]
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Toolkit {
  id: string
  name: string
  type: 'APEST360' | 'MovementOS' | 'DiscipleMaking' | 'GlocalGospel' | 'ChangePlaybook'
  description?: string
  components_json: ToolkitComponent[]
  instructions_md?: string
  usage_count: number
  version: string
  created_at: string
  updated_at: string
}

export interface ToolkitComponent {
  type: 'template' | 'guide' | 'assessment' | 'worksheet'
  name: string
  description: string
  file_url?: string
  content_json?: Record<string, unknown>
}

export interface MultiplicationNode {
  id: string
  cohort_id: string
  type: 'group' | 'leader' | 'community' | 'organization'
  title: string
  parent_id?: string
  created_by: string
  metrics_json: NodeMetrics
  status: 'planned' | 'launched' | 'growing' | 'multiplying' | 'inactive'
  created_at: string
  updated_at: string
}

export interface NodeMetrics {
  participants?: number
  leaders_developed?: number
  groups_multiplied?: number
  communities_planted?: number
  engagement_score?: number
}

export interface AnalyticsSnapshot {
  id: string
  cohort_id?: string
  org_id?: string
  snapshot_date: string
  movemental_scorecard_json: MovementalScorecard
  apest_balance_json: APESTBalance
  practice_adoption_json: PracticeAdoption
  multiplication_metrics_json: MultiplicationMetrics
  engagement_metrics_json: EngagementMetrics
  created_at: string
}

export interface MovementalScorecard {
  identity_shift_indicators: {
    movement_language_adoption: number // 0-100
    paradigm_shift_evidence: string[]
    behavioral_changes: string[]
  }
  mdna_integration: {
    jesus_lord_score: number
    disciple_making_score: number
    missional_incarnational_score: number
    apest_score: number
    organic_systems_score: number
    communitas_score: number
    overall_score: number
  }
  practice_implementation: {
    ltg_adoption: number
    discovery_bible_usage: number
    oikos_mapping_completion: number
    apest_team_implementation: number
  }
}

export interface APESTBalance {
  individual_profiles: APESTProfile[]
  team_average: {
    apostolic: number
    prophetic: number
    evangelistic: number
    shepherding: number
    teaching: number
  }
  balance_score: number // 0-100, higher = more balanced
  gaps: string[]
  strengths: string[]
}

export interface PracticeAdoption {
  ltg_groups_started: number
  discovery_bible_sessions: number
  oikos_maps_created: number
  communitas_experiences: number
  contextualization_experiments: number
  overall_adoption_rate: number // 0-100
}

export interface MultiplicationMetrics {
  groups_multiplied: number
  leaders_developed: number
  communities_planted: number
  network_depth: number
  network_breadth: number
  multiplication_rate: number
}

export interface EngagementMetrics {
  session_attendance_rate: number
  assignment_completion_rate: number
  discussion_participation: number
  experiment_completion_rate: number
  resource_usage: number
  overall_engagement_score: number
}

// Database operation types
export interface Database {
  lms: {
    Tables: {
      organizations: {
        Row: Organization
        Insert: Omit<Organization, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at'>>
      }
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>
      }
      modules: {
        Row: Module
        Insert: Omit<Module, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Module, 'id' | 'created_at' | 'updated_at'>>
      }
      lessons: {
        Row: Lesson
        Insert: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Lesson, 'id' | 'created_at' | 'updated_at'>>
      }
      lesson_components: {
        Row: LessonComponent
        Insert: Omit<LessonComponent, 'id' | 'created_at'>
        Update: Partial<Omit<LessonComponent, 'id' | 'created_at'>>
      }
      cohorts: {
        Row: Cohort
        Insert: Omit<Cohort, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Cohort, 'id' | 'created_at' | 'updated_at'>>
      }
      cohort_enrollments: {
        Row: CohortEnrollment
        Insert: Omit<CohortEnrollment, 'id' | 'enrolled_at'>
        Update: Partial<Omit<CohortEnrollment, 'id' | 'enrolled_at'>>
      }
      experiments: {
        Row: Experiment
        Insert: Omit<Experiment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Experiment, 'id' | 'created_at' | 'updated_at'>>
      }
      apest_profiles: {
        Row: APESTProfile
        Insert: Omit<APESTProfile, 'id' | 'created_at'>
        Update: Partial<Omit<APESTProfile, 'id' | 'created_at'>>
      }
      mdna_assessments: {
        Row: mDNAAssessment
        Insert: Omit<mDNAAssessment, 'id' | 'created_at'>
        Update: Partial<Omit<mDNAAssessment, 'id' | 'created_at'>>
      }
      // ... other tables
    }
  }
}
