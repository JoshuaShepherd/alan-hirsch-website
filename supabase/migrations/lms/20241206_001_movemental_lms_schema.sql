-- Movemental LMS Database Schema
-- Advanced course system for movement theology implementation

BEGIN;

-- Organizations & Network Structure
CREATE TABLE IF NOT EXISTS lms.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    region TEXT,
    slug TEXT UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}',
    theme_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enhanced user profiles with APEST and movement focus
CREATE TABLE IF NOT EXISTS lms.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES lms.organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'facilitator', 'leader', 'participant', 'observer')) DEFAULT 'participant',
    apest_primary TEXT CHECK (apest_primary IN ('apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching')),
    bio TEXT,
    avatar_url TEXT,
    timezone TEXT DEFAULT 'UTC',
    preferences_json JSONB DEFAULT '{}',
    profile_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course structure for movement curriculum
CREATE TABLE IF NOT EXISTS lms.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    level TEXT CHECK (level IN ('foundation', 'intermediate', 'advanced', 'masterclass')) DEFAULT 'foundation',
    summary TEXT,
    description TEXT,
    outcomes_json JSONB DEFAULT '[]',
    duration_weeks INTEGER DEFAULT 12,
    status TEXT CHECK (status IN ('draft', 'review', 'published', 'archived')) DEFAULT 'draft',
    featured_image TEXT,
    price_cents INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules within courses (Framework → Practice → System)
CREATE TABLE IF NOT EXISTS lms.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES lms.courses(id) ON DELETE CASCADE,
    "order" INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    summary TEXT,
    learning_objectives TEXT[],
    framework_content TEXT, -- Core theological/theoretical framework
    practice_description TEXT, -- Hands-on practice component
    system_description TEXT, -- Systems implementation component
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, "order")
);

-- Lessons within modules
CREATE TABLE IF NOT EXISTS lms.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES lms.modules(id) ON DELETE CASCADE,
    "order" INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    media_refs JSONB DEFAULT '[]', -- Video, audio references
    reading_refs JSONB DEFAULT '[]', -- Reading assignments
    hirsch_excerpt_md TEXT, -- Alan Hirsch quote/excerpt
    status TEXT CHECK (status IN ('draft', 'review', 'published')) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(module_id, "order"),
    UNIQUE(module_id, slug)
);

-- Components within lessons (video, reflection, canvas, etc.)
CREATE TABLE IF NOT EXISTS lms.lesson_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lms.lessons(id) ON DELETE CASCADE,
    "order" INTEGER NOT NULL DEFAULT 1,
    type TEXT NOT NULL CHECK (type IN ('video', 'reading', 'reflection', 'activity', 'quiz', 'canvas', 'upload', 'discussion', 'assessment')),
    title TEXT,
    description TEXT,
    config_json JSONB DEFAULT '{}',
    content_json JSONB DEFAULT '{}',
    required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(lesson_id, "order")
);

-- Cohort management for cohort-based learning
CREATE TABLE IF NOT EXISTS lms.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES lms.organizations(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES lms.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    facilitator_id UUID REFERENCES auth.users(id),
    max_participants INTEGER DEFAULT 25,
    schedule_json JSONB DEFAULT '{}', -- Meeting schedule, timezone info
    status TEXT CHECK (status IN ('planning', 'active', 'completed', 'cancelled')) DEFAULT 'planning',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cohort enrollments
CREATE TABLE IF NOT EXISTS lms.cohort_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('facilitator', 'participant', 'observer')) DEFAULT 'participant',
    status TEXT CHECK (status IN ('enrolled', 'active', 'completed', 'dropped', 'cancelled')) DEFAULT 'enrolled',
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (cohort_id, user_id)
);

-- Cohort sessions (biweekly meetings, coaching sessions)
CREATE TABLE IF NOT EXISTS lms.cohort_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    session_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 90,
    type TEXT CHECK (type IN ('teaching', 'coaching', 'clinic', 'office_hours')) DEFAULT 'teaching',
    zoom_link TEXT,
    recording_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cohort_id, session_number)
);

-- Movement-specific: 90-day experiments
CREATE TABLE IF NOT EXISTS lms.experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    hypothesis TEXT NOT NULL,
    practice_type TEXT CHECK (practice_type IN ('LTG', 'DBS', 'Oikos', 'APEST', 'Contextualization', 'Communitas', 'Other')) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT CHECK (status IN ('planning', 'active', 'completed', 'cancelled')) DEFAULT 'planning',
    metrics_json JSONB DEFAULT '{}',
    results_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly check-ins for experiments
CREATE TABLE IF NOT EXISTS lms.experiment_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID NOT NULL REFERENCES lms.experiments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    progress_score INTEGER CHECK (progress_score >= 1 AND progress_score <= 10),
    blockers_text TEXT,
    learnings_text TEXT,
    next_steps TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(experiment_id, date)
);

-- APEST profiles and assessments
CREATE TABLE IF NOT EXISTS lms.apest_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    apostolic INTEGER CHECK (apostolic >= 1 AND apostolic <= 10) NOT NULL,
    prophetic INTEGER CHECK (prophetic >= 1 AND prophetic <= 10) NOT NULL,
    evangelistic INTEGER CHECK (evangelistic >= 1 AND evangelistic <= 10) NOT NULL,
    shepherding INTEGER CHECK (shepherding >= 1 AND shepherding <= 10) NOT NULL,
    teaching INTEGER CHECK (teaching >= 1 AND teaching <= 10) NOT NULL,
    assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team APEST matrix for cohorts
CREATE TABLE IF NOT EXISTS lms.team_apest_matrix (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    data_json JSONB NOT NULL, -- Aggregated team scores and heatmap data
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- mDNA assessments (organizational and individual)
CREATE TABLE IF NOT EXISTS lms.mdna_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES lms.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    assessment_type TEXT CHECK (assessment_type IN ('organizational', 'individual', 'team')) NOT NULL,
    jesus_lord INTEGER CHECK (jesus_lord >= 1 AND jesus_lord <= 10),
    disciple_making INTEGER CHECK (disciple_making >= 1 AND disciple_making <= 10),
    missional_incarnational INTEGER CHECK (missional_incarnational >= 1 AND missional_incarnational <= 10),
    apest_score INTEGER CHECK (apest_score >= 1 AND apest_score <= 10),
    organic_systems INTEGER CHECK (organic_systems >= 1 AND organic_systems <= 10),
    communitas INTEGER CHECK (communitas >= 1 AND communitas <= 10),
    assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    scores_json JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student submissions and assessments
CREATE TABLE IF NOT EXISTS lms.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_id UUID NOT NULL REFERENCES lms.lesson_components(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_json JSONB DEFAULT '{}',
    file_url TEXT,
    rubric_scores_json JSONB DEFAULT '{}',
    status TEXT CHECK (status IN ('draft', 'submitted', 'reviewed', 'approved')) DEFAULT 'draft',
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    feedback TEXT,
    grade INTEGER CHECK (grade >= 0 AND grade <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(component_id, user_id)
);

-- Progress tracking
CREATE TABLE IF NOT EXISTS lms.progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lms.lessons(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    time_spent INTEGER DEFAULT 0, -- minutes
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, lesson_id)
);

-- Discussion threads for case clinics
CREATE TABLE IF NOT EXISTS lms.discussion_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('general', 'case_clinic', 'q_and_a', 'experiment_sharing')) DEFAULT 'general',
    created_by UUID NOT NULL REFERENCES auth.users(id),
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion posts
CREATE TABLE IF NOT EXISTS lms.discussion_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES lms.discussion_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments_json JSONB DEFAULT '[]',
    reply_to UUID REFERENCES lms.discussion_posts(id),
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources and toolkits
CREATE TABLE IF NOT EXISTS lms.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES lms.modules(id) ON DELETE CASCADE,
    course_id UUID REFERENCES lms.courses(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('slide', 'guide', 'card', 'canvas_template', 'toolkit', 'video', 'document')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    preview_url TEXT,
    editable BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    tags TEXT[],
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Specific toolkits (APEST360, Movement OS, etc.)
CREATE TABLE IF NOT EXISTS lms.toolkits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    type TEXT CHECK (type IN ('APEST360', 'MovementOS', 'DiscipleMaking', 'GlocalGospel', 'ChangePlaybook')) NOT NULL,
    description TEXT,
    components_json JSONB DEFAULT '[]',
    instructions_md TEXT,
    usage_count INTEGER DEFAULT 0,
    version TEXT DEFAULT '1.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multiplication tracking (network growth)
CREATE TABLE IF NOT EXISTS lms.multiplication_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('group', 'leader', 'community', 'organization')) NOT NULL,
    title TEXT NOT NULL,
    parent_id UUID REFERENCES lms.multiplication_nodes(id),
    created_by UUID NOT NULL REFERENCES auth.users(id),
    metrics_json JSONB DEFAULT '{}',
    status TEXT CHECK (status IN ('planned', 'launched', 'growing', 'multiplying', 'inactive')) DEFAULT 'planned',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics snapshots for movemental scorecard
CREATE TABLE IF NOT EXISTS lms.analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID REFERENCES lms.cohorts(id) ON DELETE CASCADE,
    org_id UUID REFERENCES lms.organizations(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
    movemental_scorecard_json JSONB DEFAULT '{}',
    apest_balance_json JSONB DEFAULT '{}',
    practice_adoption_json JSONB DEFAULT '{}',
    multiplication_metrics_json JSONB DEFAULT '{}',
    engagement_metrics_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_org_id ON lms.user_profiles(org_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON lms.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON lms.courses(status);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON lms.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lms.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_cohorts_org_id ON lms.cohorts(org_id);
CREATE INDEX IF NOT EXISTS idx_cohorts_status ON lms.cohorts(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON lms.cohort_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_experiments_cohort_id ON lms.experiments(cohort_id);
CREATE INDEX IF NOT EXISTS idx_experiments_owner_id ON lms.experiments(owner_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON lms.progress_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_apest_profiles_user_id ON lms.apest_profiles(user_id);

COMMIT;
