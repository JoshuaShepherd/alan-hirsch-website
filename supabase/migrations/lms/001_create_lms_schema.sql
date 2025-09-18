-- Create LMS schema and tables
-- This migration creates a completely separate LMS system without touching existing public schema

-- Create the lms schema
CREATE SCHEMA IF NOT EXISTS lms;

-- Enable RLS on the schema
ALTER SCHEMA lms OWNER TO postgres;

-- Create tenants table
CREATE TABLE lms.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE lms.tenants ENABLE ROW LEVEL SECURITY;

-- Create memberships table
CREATE TABLE lms.memberships (
    tenant_id UUID REFERENCES lms.tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (tenant_id, user_id)
);

-- Enable RLS
ALTER TABLE lms.memberships ENABLE ROW LEVEL SECURITY;

-- Create courses table
CREATE TABLE lms.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES lms.tenants(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    status TEXT CHECK (status IN ('draft', 'review', 'published')) DEFAULT 'draft',
    price_cents INTEGER DEFAULT 0,
    featured_media TEXT,
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE lms.courses ENABLE ROW LEVEL SECURITY;

-- Create modules table
CREATE TABLE lms.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES lms.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE lms.modules ENABLE ROW LEVEL SECURITY;

-- Create lessons table
CREATE TABLE lms.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES lms.modules(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    duration_estimate INTEGER DEFAULT 10,
    status TEXT CHECK (status IN ('draft', 'review', 'published')) DEFAULT 'draft',
    tiptap_doc JSONB DEFAULT '{}'::JSONB,
    blocks_json JSONB DEFAULT '[]'::JSONB,
    seo_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE lms.lessons ENABLE ROW LEVEL SECURITY;

-- Create enrollments table
CREATE TABLE lms.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES lms.courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('active', 'canceled', 'completed', 'refunded')) DEFAULT 'active',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_pct INTEGER DEFAULT 0,
    UNIQUE(course_id, user_id)
);

-- Enable RLS
ALTER TABLE lms.enrollments ENABLE ROW LEVEL SECURITY;

-- Create lesson_progress table
CREATE TABLE lms.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lms.lessons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'in_progress',
    last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
    score_json JSONB DEFAULT '{}'::JSONB,
    UNIQUE(lesson_id, user_id)
);

-- Enable RLS
ALTER TABLE lms.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Create media table
CREATE TABLE lms.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES lms.tenants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('image', 'video', 'audio', 'file')) NOT NULL,
    alt TEXT,
    meta_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE lms.media ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_tenants_owner ON lms.tenants(owner);
CREATE INDEX idx_tenants_slug ON lms.tenants(slug);
CREATE INDEX idx_memberships_user_id ON lms.memberships(user_id);
CREATE INDEX idx_courses_tenant_id ON lms.courses(tenant_id);
CREATE INDEX idx_courses_slug ON lms.courses(slug);
CREATE INDEX idx_courses_status ON lms.courses(status);
CREATE INDEX idx_modules_course_id ON lms.modules(course_id);
CREATE INDEX idx_modules_order ON lms.modules(course_id, "order");
CREATE INDEX idx_lessons_module_id ON lms.lessons(module_id);
CREATE INDEX idx_lessons_slug ON lms.lessons(slug);
CREATE INDEX idx_lessons_order ON lms.lessons(module_id, "order");
CREATE INDEX idx_lessons_status ON lms.lessons(status);
CREATE INDEX idx_enrollments_course_id ON lms.enrollments(course_id);
CREATE INDEX idx_enrollments_user_id ON lms.enrollments(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lms.lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_user_id ON lms.lesson_progress(user_id);
CREATE INDEX idx_media_tenant_id ON lms.media(tenant_id);

-- RLS Policies

-- Tenants: owner can read/write, members can read
CREATE POLICY "Tenant owners can manage their tenants" ON lms.tenants
    FOR ALL USING (owner = auth.uid());

CREATE POLICY "Tenant members can read tenants" ON lms.tenants
    FOR SELECT USING (
        id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid()
        )
    );

-- Memberships: tenant admins can manage, users can read own
CREATE POLICY "Tenant admins can manage memberships" ON lms.memberships
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can read their own memberships" ON lms.memberships
    FOR SELECT USING (user_id = auth.uid());

-- Courses: tenant members with admin/editor role can write, all members can read
CREATE POLICY "Tenant members can read courses" ON lms.courses
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Tenant admins/editors can manage courses" ON lms.courses
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

-- Modules: same as courses
CREATE POLICY "Tenant members can read modules" ON lms.modules
    FOR SELECT USING (
        course_id IN (
            SELECT c.id FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid()
        )
    );

CREATE POLICY "Tenant admins/editors can manage modules" ON lms.modules
    FOR ALL USING (
        course_id IN (
            SELECT c.id FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Lessons: same as modules
CREATE POLICY "Tenant members can read lessons" ON lms.lessons
    FOR SELECT USING (
        module_id IN (
            SELECT mo.id FROM lms.modules mo
            JOIN lms.courses c ON mo.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid()
        )
    );

CREATE POLICY "Tenant admins/editors can manage lessons" ON lms.lessons
    FOR ALL USING (
        module_id IN (
            SELECT mo.id FROM lms.modules mo
            JOIN lms.courses c ON mo.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Enrollments: users can read/write their own, tenant admins can read all
CREATE POLICY "Users can manage their own enrollments" ON lms.enrollments
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Tenant admins can read enrollments" ON lms.enrollments
    FOR SELECT USING (
        course_id IN (
            SELECT c.id FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role = 'admin'
        )
    );

-- Lesson Progress: users can manage their own, tenant admins can read
CREATE POLICY "Users can manage their own lesson progress" ON lms.lesson_progress
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Tenant admins can read lesson progress" ON lms.lesson_progress
    FOR SELECT USING (
        lesson_id IN (
            SELECT l.id FROM lms.lessons l
            JOIN lms.modules mo ON l.module_id = mo.id
            JOIN lms.courses c ON mo.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role = 'admin'
        )
    );

-- Media: tenant members can manage
CREATE POLICY "Tenant members can read media" ON lms.media
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Tenant admins/editors can manage media" ON lms.media
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM lms.memberships 
            WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION lms.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON lms.tenants FOR EACH ROW EXECUTE FUNCTION lms.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON lms.courses FOR EACH ROW EXECUTE FUNCTION lms.update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON lms.modules FOR EACH ROW EXECUTE FUNCTION lms.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lms.lessons FOR EACH ROW EXECUTE FUNCTION lms.update_updated_at_column();
