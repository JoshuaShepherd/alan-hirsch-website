-- RLS Policies for LMS Schema
-- This migration adds Row Level Security policies for multi-tenant access

-- Tenants policies
CREATE POLICY "Users can view tenants they are members of" ON lms.tenants
    FOR SELECT USING (
        owner = auth.uid() OR
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.tenants.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can insert tenants" ON lms.tenants
    FOR INSERT WITH CHECK (owner = auth.uid());

CREATE POLICY "Owners and admins can update tenants" ON lms.tenants
    FOR UPDATE USING (
        owner = auth.uid() OR
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.tenants.id AND user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Owners can delete tenants" ON lms.tenants
    FOR DELETE USING (owner = auth.uid());

-- Memberships policies
CREATE POLICY "Users can view memberships for their tenants" ON lms.memberships
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM lms.tenants
            WHERE id = tenant_id AND (owner = auth.uid() OR EXISTS (
                SELECT 1 FROM lms.memberships m2
                WHERE m2.tenant_id = tenant_id AND m2.user_id = auth.uid() AND m2.role IN ('admin', 'editor')
            ))
        )
    );

CREATE POLICY "Admins can manage memberships" ON lms.memberships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.tenants
            WHERE id = tenant_id AND (owner = auth.uid() OR EXISTS (
                SELECT 1 FROM lms.memberships m2
                WHERE m2.tenant_id = tenant_id AND m2.user_id = auth.uid() AND m2.role = 'admin'
            ))
        )
    );

-- Courses policies
CREATE POLICY "Users can view courses in their tenants" ON lms.courses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.courses.tenant_id AND user_id = auth.uid()
        ) OR
        -- Published courses are viewable by enrolled users
        (status = 'published' AND EXISTS (
            SELECT 1 FROM lms.enrollments
            WHERE course_id = lms.courses.id AND user_id = auth.uid() AND status = 'active'
        ))
    );

CREATE POLICY "Admins and editors can insert courses" ON lms.courses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.courses.tenant_id AND user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Admins and editors can update courses" ON lms.courses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.courses.tenant_id AND user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Admins can delete courses" ON lms.courses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.courses.tenant_id AND user_id = auth.uid() AND role = 'admin'
        )
    );

-- Modules policies
CREATE POLICY "Users can view modules for accessible courses" ON lms.modules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE c.id = lms.modules.course_id AND m.user_id = auth.uid()
        ) OR
        -- Published modules are viewable by enrolled users
        EXISTS (
            SELECT 1 FROM lms.courses c
            JOIN lms.enrollments e ON c.id = e.course_id
            WHERE c.id = lms.modules.course_id AND e.user_id = auth.uid() AND e.status = 'active'
        )
    );

CREATE POLICY "Admins and editors can manage modules" ON lms.modules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE c.id = lms.modules.course_id AND m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Lessons policies
CREATE POLICY "Users can view lessons for accessible modules" ON lms.lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.modules mod
            JOIN lms.courses c ON mod.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE mod.id = lms.lessons.module_id AND m.user_id = auth.uid()
        ) OR
        -- Published lessons are viewable by enrolled users
        EXISTS (
            SELECT 1 FROM lms.modules mod
            JOIN lms.courses c ON mod.course_id = c.id
            JOIN lms.enrollments e ON c.id = e.course_id
            WHERE mod.id = lms.lessons.module_id AND e.user_id = auth.uid() AND e.status = 'active'
        )
    );

CREATE POLICY "Admins and editors can manage lessons" ON lms.lessons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.modules mod
            JOIN lms.courses c ON mod.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE mod.id = lms.lessons.module_id AND m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON lms.enrollments
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own enrollments" ON lms.enrollments
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own enrollments" ON lms.enrollments
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all enrollments for their courses" ON lms.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.courses c
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE c.id = lms.enrollments.course_id AND m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Lesson progress policies
CREATE POLICY "Users can manage their own lesson progress" ON lms.lesson_progress
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can view lesson progress for their courses" ON lms.lesson_progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.lessons l
            JOIN lms.modules mod ON l.module_id = mod.id
            JOIN lms.courses c ON mod.course_id = c.id
            JOIN lms.memberships m ON c.tenant_id = m.tenant_id
            WHERE l.id = lms.lesson_progress.lesson_id AND m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Media policies
CREATE POLICY "Users can view media for their tenants" ON lms.media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.media.tenant_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins and editors can manage media" ON lms.media
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lms.memberships
            WHERE tenant_id = lms.media.tenant_id AND user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );
