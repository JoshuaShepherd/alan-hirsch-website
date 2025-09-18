-- Row Level Security Policies for Movemental LMS
-- Multi-tenant security with role-based access

BEGIN;

-- Enable RLS on all tables
ALTER TABLE lms.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.lesson_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.cohort_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.cohort_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.experiment_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.apest_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.team_apest_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.mdna_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.toolkits ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.multiplication_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.analytics_snapshots ENABLE ROW LEVEL SECURITY;

-- Helper function to check user organization membership and role
CREATE OR REPLACE FUNCTION lms.get_user_org_role(user_id UUID, org_id UUID)
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role 
        FROM lms.user_profiles 
        WHERE user_profiles.user_id = $1 AND user_profiles.org_id = $2
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has edit access (owner, facilitator, leader)
CREATE OR REPLACE FUNCTION lms.has_edit_access(user_id UUID, org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('owner', 'facilitator', 'leader')
        FROM lms.user_profiles 
        WHERE user_profiles.user_id = $1 AND user_profiles.org_id = $2
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has admin access (owner, facilitator)
CREATE OR REPLACE FUNCTION lms.has_admin_access(user_id UUID, org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('owner', 'facilitator')
        FROM lms.user_profiles 
        WHERE user_profiles.user_id = $1 AND user_profiles.org_id = $2
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Organizations: Owner can manage, members can read
CREATE POLICY "Organizations: Owners can manage" ON lms.organizations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.user_profiles 
            WHERE user_profiles.user_id = auth.uid() 
            AND user_profiles.org_id = organizations.id 
            AND user_profiles.role = 'owner'
        )
    );

CREATE POLICY "Organizations: Members can read" ON lms.organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.user_profiles 
            WHERE user_profiles.user_id = auth.uid() 
            AND user_profiles.org_id = organizations.id
        )
    );

-- User Profiles: Users can manage their own, admins can manage organization members
CREATE POLICY "User Profiles: Own profile" ON lms.user_profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User Profiles: Org admins can manage" ON lms.user_profiles
    FOR ALL USING (
        lms.has_admin_access(auth.uid(), org_id)
    );

CREATE POLICY "User Profiles: Org members can read" ON lms.user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.user_profiles up 
            WHERE up.user_id = auth.uid() 
            AND up.org_id = user_profiles.org_id
        )
    );

-- Courses: Created by org members, readable by enrolled users
CREATE POLICY "Courses: Creators and admins can manage" ON lms.courses
    FOR ALL USING (
        created_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM lms.user_profiles up
            WHERE up.user_id = auth.uid() 
            AND up.role IN ('owner', 'facilitator')
        )
    );

CREATE POLICY "Courses: Published courses readable by all" ON lms.courses
    FOR SELECT USING (status = 'published');

-- Modules: Inherit course permissions
CREATE POLICY "Modules: Course permissions apply" ON lms.modules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.courses c
            WHERE c.id = modules.course_id
            AND (
                c.created_by = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM lms.user_profiles up
                    WHERE up.user_id = auth.uid() 
                    AND up.role IN ('owner', 'facilitator')
                )
            )
        )
    );

CREATE POLICY "Modules: Published readable by enrolled" ON lms.modules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.courses c
            WHERE c.id = modules.course_id
            AND c.status = 'published'
        )
    );

-- Lessons: Inherit module permissions
CREATE POLICY "Lessons: Module permissions apply" ON lms.lessons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.modules m
            JOIN lms.courses c ON c.id = m.course_id
            WHERE m.id = lessons.module_id
            AND (
                c.created_by = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM lms.user_profiles up
                    WHERE up.user_id = auth.uid() 
                    AND up.role IN ('owner', 'facilitator')
                )
            )
        )
    );

CREATE POLICY "Lessons: Published readable by enrolled" ON lms.lessons
    FOR SELECT USING (
        status = 'published' AND
        EXISTS (
            SELECT 1 FROM lms.modules m
            JOIN lms.courses c ON c.id = m.course_id
            WHERE m.id = lessons.module_id
            AND c.status = 'published'
        )
    );

-- Lesson Components: Inherit lesson permissions
CREATE POLICY "Components: Lesson permissions apply" ON lms.lesson_components
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.lessons l
            JOIN lms.modules m ON m.id = l.module_id
            JOIN lms.courses c ON c.id = m.course_id
            WHERE l.id = lesson_components.lesson_id
            AND (
                c.created_by = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM lms.user_profiles up
                    WHERE up.user_id = auth.uid() 
                    AND up.role IN ('owner', 'facilitator')
                )
            )
        )
    );

-- Cohorts: Org-scoped with role-based access
CREATE POLICY "Cohorts: Org members can read" ON lms.cohorts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.user_profiles up
            WHERE up.user_id = auth.uid() 
            AND up.org_id = cohorts.org_id
        )
    );

CREATE POLICY "Cohorts: Admins can manage" ON lms.cohorts
    FOR ALL USING (
        lms.has_admin_access(auth.uid(), org_id)
    );

-- Cohort Enrollments: Users can see their own, facilitators can manage cohort
CREATE POLICY "Enrollments: Own enrollments" ON lms.cohort_enrollments
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Enrollments: Facilitators can manage" ON lms.cohort_enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.cohorts c
            WHERE c.id = cohort_enrollments.cohort_id
            AND (
                c.facilitator_id = auth.uid() OR
                lms.has_admin_access(auth.uid(), c.org_id)
            )
        )
    );

-- Experiments: Cohort members can read, owners can manage own
CREATE POLICY "Experiments: Own experiments" ON lms.experiments
    FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Experiments: Cohort members can read" ON lms.experiments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.cohort_enrollments ce
            WHERE ce.cohort_id = experiments.cohort_id
            AND ce.user_id = auth.uid()
        )
    );

CREATE POLICY "Experiments: Facilitators can manage" ON lms.experiments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.cohorts c
            WHERE c.id = experiments.cohort_id
            AND (
                c.facilitator_id = auth.uid() OR
                lms.has_admin_access(auth.uid(), c.org_id)
            )
        )
    );

-- Experiment Check-ins: Inherit experiment permissions
CREATE POLICY "Checkins: Experiment permissions apply" ON lms.experiment_checkins
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.experiments e
            WHERE e.id = experiment_checkins.experiment_id
            AND (
                e.owner_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM lms.cohorts c
                    WHERE c.id = e.cohort_id
                    AND (
                        c.facilitator_id = auth.uid() OR
                        lms.has_admin_access(auth.uid(), c.org_id)
                    )
                )
            )
        )
    );

-- APEST Profiles: Own profiles and team visibility
CREATE POLICY "APEST: Own profiles" ON lms.apest_profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "APEST: Team visibility" ON lms.apest_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.cohort_enrollments ce1
            JOIN lms.cohort_enrollments ce2 ON ce1.cohort_id = ce2.cohort_id
            WHERE ce1.user_id = auth.uid()
            AND ce2.user_id = apest_profiles.user_id
        )
    );

-- Submissions: Own submissions and instructor access
CREATE POLICY "Submissions: Own submissions" ON lms.submissions
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Submissions: Instructors can review" ON lms.submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.lesson_components lc
            JOIN lms.lessons l ON l.id = lc.lesson_id
            JOIN lms.modules m ON m.id = l.module_id
            JOIN lms.courses c ON c.id = m.course_id
            WHERE lc.id = submissions.component_id
            AND (
                c.created_by = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM lms.user_profiles up
                    WHERE up.user_id = auth.uid() 
                    AND up.role IN ('owner', 'facilitator')
                )
            )
        )
    );

-- Progress Tracking: Own progress
CREATE POLICY "Progress: Own progress" ON lms.progress_tracking
    FOR ALL USING (user_id = auth.uid());

-- Discussion Threads: Cohort members
CREATE POLICY "Discussions: Cohort members" ON lms.discussion_threads
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.cohort_enrollments ce
            WHERE ce.cohort_id = discussion_threads.cohort_id
            AND ce.user_id = auth.uid()
        )
    );

-- Discussion Posts: Cohort members
CREATE POLICY "Posts: Cohort members" ON lms.discussion_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.discussion_threads dt
            JOIN lms.cohort_enrollments ce ON ce.cohort_id = dt.cohort_id
            WHERE dt.id = discussion_posts.thread_id
            AND ce.user_id = auth.uid()
        )
    );

-- Resources: Public readable, creators can manage
CREATE POLICY "Resources: Public readable" ON lms.resources
    FOR SELECT USING (true);

CREATE POLICY "Resources: Creators can manage" ON lms.resources
    FOR ALL USING (
        created_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM lms.user_profiles up
            WHERE up.user_id = auth.uid() 
            AND up.role IN ('owner', 'facilitator')
        )
    );

-- Toolkits: Public readable
CREATE POLICY "Toolkits: Public readable" ON lms.toolkits
    FOR SELECT USING (true);

CREATE POLICY "Toolkits: Admins can manage" ON lms.toolkits
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.user_profiles up
            WHERE up.user_id = auth.uid() 
            AND up.role IN ('owner', 'facilitator')
        )
    );

-- Analytics: Org admins only
CREATE POLICY "Analytics: Org admins only" ON lms.analytics_snapshots
    FOR ALL USING (
        (org_id IS NOT NULL AND lms.has_admin_access(auth.uid(), org_id)) OR
        (cohort_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM lms.cohorts c
            WHERE c.id = analytics_snapshots.cohort_id
            AND lms.has_admin_access(auth.uid(), c.org_id)
        ))
    );

COMMIT;
