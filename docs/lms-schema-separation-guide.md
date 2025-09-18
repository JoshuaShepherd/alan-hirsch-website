# LMS Schema Separation: Complete Implementation Guide

**How to Practically Achieve Schema Separation for Your Learning Management System**

---

## **What Schema Separation Actually Means**

**Schema separation is the practice of organizing database tables into logical groups (schemas) that isolate different functional areas of your application.** Think of schemas as separate filing cabinets within the same office—each cabinet contains related documents, but they're clearly separated for organization, security, and maintenance purposes.

For your platform, schema separation enables you to:
- **Isolate LMS functionality** from general content management
- **Apply different security policies** to different areas of your app
- **Scale and maintain** different functional areas independently
- **Control access** granularly based on user roles and organizational membership

## **Your Platform's Schema Architecture**

### **Current Schema Design**

Based on your existing database structure, here's how schema separation works in practice:

```sql
-- Public schema (default)
-- Contains Supabase Auth tables and shared utilities
auth.users              -- Supabase managed authentication
public.profiles         -- Extended user profiles with APEST data

-- LMS Schema (Learning Management System)
lms.tenants             -- Organizations (5Q, Movement Leaders, etc.)
lms.memberships         -- User-organization relationships with roles
lms.courses             -- Course metadata and configuration
lms.modules             -- Course sections/chapters
lms.lessons             -- Individual learning units
lms.lesson_blocks       -- Content blocks within lessons
lms.enrollments         -- Student course registrations
lms.lesson_progress     -- Individual lesson completion tracking
lms.assessments         -- Quizzes, assignments, evaluations
lms.assessment_results  -- User assessment responses and scores

-- Content Schema (Publishing System)
content.items           -- Articles, videos, resources, blog posts
content.series          -- Content collections and themed sequences
content.publications    -- Multi-platform publishing tracking
content.collaborations  -- Real-time editing and review workflows
content.comments        -- User comments and discussions
content.analytics       -- Content performance metrics

-- Media Schema (File Management)
media.files             -- File uploads with metadata
media.folders           -- Hierarchical folder organization
media.thumbnails        -- Generated image thumbnails

-- Billing Schema (Revenue Management)
billing.subscriptions   -- User subscription records
billing.payments        -- Payment transactions
billing.invoices        -- Billing history and records
```

## **Practical Implementation Steps**

### **Step 1: Create Schema Structure**

```sql
-- Create schemas if they don't exist
CREATE SCHEMA IF NOT EXISTS lms;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS media;
CREATE SCHEMA IF NOT EXISTS billing;
CREATE SCHEMA IF NOT EXISTS analytics;

-- Grant usage permissions to authenticated users
GRANT USAGE ON SCHEMA lms TO authenticated;
GRANT USAGE ON SCHEMA content TO authenticated;
GRANT USAGE ON SCHEMA media TO authenticated;
GRANT USAGE ON SCHEMA billing TO authenticated;
GRANT USAGE ON SCHEMA analytics TO authenticated;

-- Grant usage to service role for Edge Functions
GRANT USAGE ON SCHEMA lms TO service_role;
GRANT USAGE ON SCHEMA content TO service_role;
GRANT USAGE ON SCHEMA media TO service_role;
GRANT USAGE ON SCHEMA billing TO service_role;
GRANT USAGE ON SCHEMA analytics TO service_role;
```

### **Step 2: Migrate Existing Tables to Schemas**

```sql
-- Move existing tables to appropriate schemas
ALTER TABLE courses SET SCHEMA lms;
ALTER TABLE modules SET SCHEMA lms;
ALTER TABLE lessons SET SCHEMA lms;
ALTER TABLE enrollments SET SCHEMA lms;
ALTER TABLE lesson_progress SET SCHEMA lms;

-- If you have content tables in public schema
ALTER TABLE content_items SET SCHEMA content;
ALTER TABLE content_series SET SCHEMA content;

-- Update any foreign key references to use schema-qualified names
ALTER TABLE lms.modules 
DROP CONSTRAINT IF EXISTS modules_course_id_fkey,
ADD CONSTRAINT modules_course_id_fkey 
  FOREIGN KEY (course_id) REFERENCES lms.courses(id);

ALTER TABLE lms.lessons
DROP CONSTRAINT IF EXISTS lessons_module_id_fkey,
ADD CONSTRAINT lessons_module_id_fkey 
  FOREIGN KEY (module_id) REFERENCES lms.modules(id);
```

### **Step 3: Implement Row Level Security (RLS) by Schema**

```sql
-- LMS Schema Security Policies
-- Enable RLS on all LMS tables
ALTER TABLE lms.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Tenant isolation for LMS
CREATE POLICY "Users can only access their organization's data"
ON lms.courses FOR ALL
USING (
  tenant_id IN (
    SELECT tenant_id FROM lms.memberships 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can only see their organization's modules"
ON lms.modules FOR ALL
USING (
  course_id IN (
    SELECT c.id FROM lms.courses c
    JOIN lms.memberships m ON c.tenant_id = m.tenant_id
    WHERE m.user_id = auth.uid()
  )
);

-- Content Schema Security Policies
ALTER TABLE content.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE content.comments ENABLE ROW LEVEL SECURITY;

-- Content visibility based on subscription tier
CREATE POLICY "Content access based on subscription"
ON content.items FOR SELECT
USING (
  CASE 
    WHEN metadata->>'access_level' = 'free' THEN true
    WHEN metadata->>'access_level' = 'premium' THEN (
      EXISTS (
        SELECT 1 FROM auth.users u
        JOIN public.profiles p ON u.id = p.user_id
        WHERE u.id = auth.uid() 
        AND p.subscription_tier IN ('premium', 'enterprise')
      )
    )
    ELSE false
  END
);

-- Authors can edit their own content
CREATE POLICY "Authors can edit own content"
ON content.items FOR UPDATE
USING (author_id = auth.uid());
```

### **Step 4: Create Schema-Specific Functions**

```sql
-- LMS Schema Functions
CREATE OR REPLACE FUNCTION lms.get_user_courses(p_user_id UUID)
RETURNS TABLE(course_id UUID, title TEXT, progress NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.title,
    COALESCE(
      (SELECT COUNT(*)::NUMERIC / (
        SELECT COUNT(*) FROM lms.lessons l2 
        JOIN lms.modules m2 ON l2.module_id = m2.id 
        WHERE m2.course_id = c.id
      ) * 100
      FROM lms.lesson_progress lp
      JOIN lms.lessons l ON lp.lesson_id = l.id
      JOIN lms.modules m ON l.module_id = m.id
      WHERE m.course_id = c.id AND lp.user_id = p_user_id AND lp.completed_at IS NOT NULL),
      0
    ) as progress
  FROM lms.courses c
  JOIN lms.enrollments e ON c.id = e.course_id
  WHERE e.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Content Schema Functions
CREATE OR REPLACE FUNCTION content.get_recommended_content(p_user_id UUID)
RETURNS TABLE(content_id UUID, title TEXT, relevance_score INT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ci.id,
    ci.title,
    (
      CASE WHEN ci.metadata->>'category' = ANY(
        SELECT jsonb_array_elements_text(p.learning_interests)
        FROM public.profiles p WHERE p.user_id = p_user_id
      ) THEN 3 ELSE 0 END +
      CASE WHEN ci.created_at > NOW() - INTERVAL '7 days' THEN 2 ELSE 0 END +
      CASE WHEN EXISTS(
        SELECT 1 FROM content.analytics ca 
        WHERE ca.content_id = ci.id AND ca.metric_type = 'high_engagement'
      ) THEN 1 ELSE 0 END
    ) as relevance_score
  FROM content.items ci
  WHERE ci.status = 'published'
  ORDER BY relevance_score DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## **TypeScript Integration with Schema Separation**

### **1. Generate Schema-Specific Types**

```bash
# Generate types for specific schemas
npx supabase gen types typescript --schema=lms > types/lms.ts
npx supabase gen types typescript --schema=content > types/content.ts
npx supabase gen types typescript --schema=media > types/media.ts
```

### **2. Create Schema-Specific Clients**

```typescript
// lib/supabase/lms-client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { LMSDatabase } from '@/types/lms'

export const lmsSupabase: SupabaseClient<LMSDatabase> = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'lms'
    }
  }
)

// lib/supabase/content-client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { ContentDatabase } from '@/types/content'

export const contentSupabase: SupabaseClient<ContentDatabase> = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'content'
    }
  }
)
```

### **3. Schema-Aware API Services**

```typescript
// services/lms-service.ts
import { lmsSupabase } from '@/lib/supabase/lms-client'

export class LMSService {
  async getCoursesByTenant(tenantId: string) {
    return await lmsSupabase
      .from('courses')  // Automatically uses lms.courses
      .select(`
        id,
        title,
        description,
        modules (
          id,
          title,
          order_index,
          lessons (
            id,
            title,
            duration
          )
        )
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
  }

  async enrollUserInCourse(userId: string, courseId: string) {
    return await lmsSupabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString()
      })
      .select()
      .single()
  }

  async updateLessonProgress(userId: string, lessonId: string, progress: number) {
    return await lmsSupabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        progress_percentage: progress,
        updated_at: new Date().toISOString(),
        ...(progress >= 100 && { completed_at: new Date().toISOString() })
      })
  }
}

// services/content-service.ts
import { contentSupabase } from '@/lib/supabase/content-client'

export class ContentService {
  async getPublishedContent(filters?: ContentFilters) {
    let query = contentSupabase
      .from('items')  // Automatically uses content.items
      .select('*')
      .eq('status', 'published')

    if (filters?.category) {
      query = query.eq('metadata->category', filters.category)
    }

    if (filters?.searchTerm) {
      query = query.textSearch('search_vector', filters.searchTerm)
    }

    return await query.order('published_at', { ascending: false })
  }

  async createContentSeries(seriesData: ContentSeriesInput) {
    return await contentSupabase
      .from('series')
      .insert(seriesData)
      .select()
      .single()
  }
}
```

## **Frontend Component Integration**

### **1. Schema-Aware React Hooks**

```typescript
// hooks/use-lms-data.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { LMSService } from '@/services/lms-service'

const lmsService = new LMSService()

export const useCoursesByTenant = (tenantId: string) => {
  return useQuery({
    queryKey: ['lms', 'courses', tenantId],
    queryFn: () => lmsService.getCoursesByTenant(tenantId),
    enabled: !!tenantId
  })
}

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, courseId }: { userId: string; courseId: string }) =>
      lmsService.enrollUserInCourse(userId, courseId),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries(['lms', 'courses', variables.courseId])
      queryClient.invalidateQueries(['lms', 'enrollments', variables.userId])
    }
  })
}

// hooks/use-content-data.ts
import { useQuery } from '@tanstack/react-query'
import { ContentService } from '@/services/content-service'

const contentService = new ContentService()

export const usePublishedContent = (filters?: ContentFilters) => {
  return useQuery({
    queryKey: ['content', 'published', filters],
    queryFn: () => contentService.getPublishedContent(filters)
  })
}
```

### **2. Schema-Specific Components**

```typescript
// components/lms/CourseProgress.tsx
import { useCourseProgress } from '@/hooks/use-lms-data'

interface CourseProgressProps {
  userId: string
  courseId: string
}

export function CourseProgress({ userId, courseId }: CourseProgressProps) {
  const { data: progress, isLoading } = useCourseProgress(userId, courseId)

  if (isLoading) return <div>Loading course progress...</div>

  return (
    <div className="course-progress">
      <h3>Course Progress</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress?.percentage || 0}%` }}
        />
      </div>
      <p>{progress?.completed_lessons || 0} of {progress?.total_lessons || 0} lessons completed</p>
    </div>
  )
}

// components/content/ContentDiscovery.tsx
import { usePublishedContent } from '@/hooks/use-content-data'

interface ContentDiscoveryProps {
  userInterests?: string[]
  subscriptionTier?: 'free' | 'premium' | 'enterprise'
}

export function ContentDiscovery({ userInterests, subscriptionTier }: ContentDiscoveryProps) {
  const { data: content, isLoading } = usePublishedContent({
    interests: userInterests,
    accessLevel: subscriptionTier
  })

  if (isLoading) return <div>Discovering content for you...</div>

  return (
    <div className="content-discovery">
      <h3>Recommended for You</h3>
      <div className="content-grid">
        {content?.map(item => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  )
}
```

## **Database Migration Strategy**

### **1. Safe Migration Process**

```sql
-- migration_001_create_schemas.sql
-- Create schemas first
CREATE SCHEMA IF NOT EXISTS lms;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS media;
CREATE SCHEMA IF NOT EXISTS billing;

-- Grant permissions
GRANT USAGE ON SCHEMA lms TO authenticated;
GRANT USAGE ON SCHEMA content TO authenticated;
GRANT USAGE ON SCHEMA media TO authenticated;
GRANT USAGE ON SCHEMA billing TO authenticated;

-- migration_002_move_lms_tables.sql
-- Move existing tables to LMS schema
BEGIN;

-- Create new tables in LMS schema
CREATE TABLE lms.courses (LIKE public.courses INCLUDING ALL);
CREATE TABLE lms.modules (LIKE public.modules INCLUDING ALL);
CREATE TABLE lms.lessons (LIKE public.lessons INCLUDING ALL);

-- Copy data
INSERT INTO lms.courses SELECT * FROM public.courses;
INSERT INTO lms.modules SELECT * FROM public.modules;
INSERT INTO lms.lessons SELECT * FROM public.lessons;

-- Update foreign key constraints
ALTER TABLE lms.modules 
DROP CONSTRAINT IF EXISTS modules_course_id_fkey,
ADD CONSTRAINT modules_course_id_fkey 
  FOREIGN KEY (course_id) REFERENCES lms.courses(id);

-- Enable RLS
ALTER TABLE lms.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.lessons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "course_tenant_isolation" ON lms.courses FOR ALL USING (
  tenant_id IN (
    SELECT tenant_id FROM lms.memberships 
    WHERE user_id = auth.uid()
  )
);

COMMIT;

-- migration_003_cleanup_old_tables.sql
-- After verifying data integrity
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
```

### **2. Application Code Migration**

```typescript
// Before: Direct table access
const { data } = await supabase
  .from('courses')  // Uses public.courses
  .select('*')

// After: Schema-aware access
const { data } = await lmsSupabase
  .from('courses')  // Uses lms.courses
  .select('*')

// Or with explicit schema
const { data } = await supabase
  .schema('lms')
  .from('courses')
  .select('*')
```

## **Monitoring and Maintenance**

### **1. Schema Performance Monitoring**

```sql
-- Monitor table sizes by schema
SELECT 
  schemaname,
  tablename,
  n_live_tup as row_count,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_stat_user_tables
ORDER BY schemaname, pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Monitor query performance by schema
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  CASE 
    WHEN query LIKE '%lms.%' THEN 'LMS'
    WHEN query LIKE '%content.%' THEN 'Content'
    WHEN query LIKE '%media.%' THEN 'Media'
    ELSE 'Other'
  END as schema_category
FROM pg_stat_statements
WHERE query LIKE '%FROM %'
ORDER BY mean_time DESC;
```

### **2. Schema-Specific Maintenance**

```sql
-- LMS-specific maintenance
CREATE OR REPLACE FUNCTION lms.cleanup_old_progress() RETURNS void AS $$
BEGIN
  -- Archive completed course data older than 2 years
  INSERT INTO lms.progress_archive 
  SELECT * FROM lms.lesson_progress 
  WHERE completed_at < NOW() - INTERVAL '2 years';
  
  DELETE FROM lms.lesson_progress 
  WHERE completed_at < NOW() - INTERVAL '2 years';
END;
$$ LANGUAGE plpgsql;

-- Content-specific maintenance
CREATE OR REPLACE FUNCTION content.update_search_vectors() RETURNS void AS $$
BEGIN
  -- Update search vectors for recently modified content
  UPDATE content.items 
  SET search_vector = to_tsvector('english', title || ' ' || coalesce(excerpt, '') || ' ' || content_blocks::text)
  WHERE updated_at > NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Schedule maintenance tasks
SELECT cron.schedule('lms-cleanup', '0 2 * * 0', 'SELECT lms.cleanup_old_progress()');
SELECT cron.schedule('content-search', '0 */4 * * *', 'SELECT content.update_search_vectors()');
```

## **Benefits of Schema Separation in Your Platform**

### **1. Security Isolation**
- LMS data is completely separated from public content
- Different access controls for different functional areas
- Easier compliance with privacy regulations
- Reduced risk of accidental data exposure

### **2. Development Team Organization**
- Frontend developers can focus on specific schemas
- Different teams can work on LMS vs. content features independently
- Clear boundaries reduce conflicts and confusion
- Easier onboarding for new developers

### **3. Performance Optimization**
- Schema-specific indexing strategies
- Targeted caching for different data types
- Independent scaling of different functional areas
- More efficient query planning

### **4. Maintenance and Evolution**
- Schema-specific migration strategies
- Independent backup and recovery procedures
- Easier to deprecate or refactor specific functional areas
- Clear audit trails for different types of data

**Schema separation is not just a technical nicety—it's a fundamental architectural decision that enables your platform to scale, maintain security, and evolve different functional areas independently.** By properly implementing schema separation, you create a solid foundation for long-term growth and maintainability.