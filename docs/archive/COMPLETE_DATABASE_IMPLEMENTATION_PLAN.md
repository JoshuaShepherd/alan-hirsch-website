# Complete Database Implementation Plan: Content Platform Schema

## Executive Overview

This plan outlines the complete database schema design, implementation steps, and maintenance strategy for a multi-tenant content creation platform supporting all content types (written, video, audio, interactive, visual, community) with real-time collaboration, analytics, and AI-powered features.

## Phase 1: Foundation Schema (Week 1-2)

### Core Authentication & Multi-Tenancy

#### Step 1.1: Authentication Tables
```sql
-- Extend Supabase auth.users with additional profile data
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### Step 1.2: Tenant Management System
```sql
-- Core tenant configuration
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  domain TEXT UNIQUE,
  logo_url TEXT,
  brand_colors JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  plan_type TEXT DEFAULT 'basic' CHECK (plan_type IN ('basic', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'trial')),
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenant membership and roles
CREATE TABLE tenant_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'editor', 'author', 'member')),
  permissions JSONB DEFAULT '{}',
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'suspended')),
  
  UNIQUE(tenant_id, user_id)
);

-- RLS for tenant isolation
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_memberships ENABLE ROW LEVEL SECURITY;

-- Helper function to get current tenant
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
DECLARE
  tenant_id UUID;
BEGIN
  -- Get from JWT claim or session variable
  tenant_id := (current_setting('app.current_tenant_id', true))::UUID;
  
  -- Validate user has access to this tenant
  IF NOT EXISTS (
    SELECT 1 FROM tenant_memberships 
    WHERE tenant_id = tenant_id 
    AND user_id = auth.uid() 
    AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Access denied to tenant';
  END IF;
  
  RETURN tenant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Content Type Definitions

#### Step 1.3: Content Type Registry
```sql
-- Enumeration for all supported content types
CREATE TYPE content_type_enum AS ENUM (
  -- Written Content
  'blog_post',
  'article', 
  'newsletter',
  'book_chapter',
  'research_paper',
  'case_study',
  
  -- Video Content
  'video_lesson',
  'short_video',
  'webinar',
  'interview',
  'livestream',
  'video_series',
  
  -- Audio Content
  'podcast_episode',
  'audio_lesson',
  'conference_talk',
  'audiobook_chapter',
  'meditation',
  
  -- Interactive Content
  'course_module',
  'assessment',
  'quiz',
  'survey',
  'workshop',
  'certification',
  
  -- Visual Content
  'infographic',
  'presentation',
  'social_graphic',
  'gallery',
  'diagram',
  
  -- Community Content
  'forum_post',
  'discussion',
  'comment',
  'user_story',
  'testimonial'
);

-- Content status workflow
CREATE TYPE content_status_enum AS ENUM (
  'draft',
  'in_review',
  'scheduled',
  'published',
  'archived',
  'deleted'
);

-- Block type categories
CREATE TYPE block_category_enum AS ENUM (
  'text',
  'media',
  'interactive',
  'layout',
  'embed',
  'data'
);
```

## Phase 2: Content Schema (Week 3-4)

### Core Content Tables

#### Step 2.1: Universal Content Table
```sql
-- Main content table supporting all content types
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Content identification
  content_type content_type_enum NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  
  -- Content structure
  blocks JSONB DEFAULT '[]' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  
  -- Publishing workflow
  status content_status_enum DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  
  -- SEO and discovery
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT[],
  canonical_url TEXT,
  
  -- Access control
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted', 'members')),
  access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'premium', 'paid')),
  price_cents INTEGER DEFAULT 0,
  
  -- Versioning and collaboration
  version INTEGER DEFAULT 1,
  parent_version_id UUID REFERENCES content(id),
  lock_owner_id UUID REFERENCES auth.users(id),
  lock_expires_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_by UUID REFERENCES auth.users(id),
  
  -- Constraints
  UNIQUE(tenant_id, slug),
  CHECK (published_at IS NULL OR status = 'published'),
  CHECK (scheduled_for IS NULL OR status = 'scheduled')
);

-- Indexes for performance
CREATE INDEX idx_content_tenant_type ON content (tenant_id, content_type);
CREATE INDEX idx_content_status_published ON content (tenant_id, status, published_at DESC) 
  WHERE status = 'published';
CREATE INDEX idx_content_creator ON content (creator_id, created_at DESC);
CREATE INDEX idx_content_slug ON content (tenant_id, slug);
CREATE INDEX idx_content_scheduled ON content (scheduled_for) 
  WHERE status = 'scheduled';

-- Full-text search
CREATE INDEX idx_content_search ON content 
  USING gin(to_tsvector('english', title || ' ' || coalesce(excerpt, '') || ' ' || coalesce(seo_description, '')));

-- JSONB indexes for blocks and metadata
CREATE INDEX idx_content_blocks ON content USING gin(blocks);
CREATE INDEX idx_content_metadata ON content USING gin(metadata);

-- RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant content isolation" ON content
  USING (tenant_id = get_current_tenant_id());
```

#### Step 2.2: Block Type Registry
```sql
-- Define available block types and their schemas
CREATE TABLE block_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  category block_category_enum NOT NULL,
  
  -- JSON Schema for validation
  content_schema JSONB NOT NULL,
  settings_schema JSONB DEFAULT '{}',
  
  -- Rendering information
  component_name TEXT NOT NULL,
  icon TEXT,
  preview_template TEXT,
  
  -- Availability
  enabled BOOLEAN DEFAULT true,
  premium_only BOOLEAN DEFAULT false,
  
  -- Versioning
  version TEXT DEFAULT '1.0.0',
  deprecated BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-populate with standard block types
INSERT INTO block_types (name, display_name, description, category, content_schema, component_name, icon) VALUES
-- Text blocks
('paragraph', 'Paragraph', 'Rich text paragraph with formatting', 'text', 
 '{"type": "object", "properties": {"content": {"type": "string"}, "format": {"type": "object"}}}', 
 'ParagraphBlock', 'type'),
 
('heading', 'Heading', 'Section heading (H1-H6)', 'text',
 '{"type": "object", "properties": {"content": {"type": "string"}, "level": {"type": "integer", "minimum": 1, "maximum": 6}}}',
 'HeadingBlock', 'heading'),
 
('quote', 'Quote', 'Blockquote with attribution', 'text',
 '{"type": "object", "properties": {"content": {"type": "string"}, "attribution": {"type": "string"}}}',
 'QuoteBlock', 'quote'),

-- Media blocks  
('image', 'Image', 'Single image with caption', 'media',
 '{"type": "object", "properties": {"asset_id": {"type": "string"}, "alt": {"type": "string"}, "caption": {"type": "string"}}}',
 'ImageBlock', 'image'),
 
('video', 'Video', 'Video player with controls', 'media',
 '{"type": "object", "properties": {"asset_id": {"type": "string"}, "title": {"type": "string"}, "autoplay": {"type": "boolean"}}}',
 'VideoBlock', 'video'),
 
('audio', 'Audio', 'Audio player with transcript', 'media',
 '{"type": "object", "properties": {"asset_id": {"type": "string"}, "title": {"type": "string"}, "show_transcript": {"type": "boolean"}}}',
 'AudioBlock', 'volume-2'),

-- Interactive blocks
('quiz', 'Quiz', 'Interactive quiz with questions', 'interactive',
 '{"type": "object", "properties": {"questions": {"type": "array"}, "settings": {"type": "object"}}}',
 'QuizBlock', 'help-circle'),
 
('form', 'Form', 'Custom form with validation', 'interactive',
 '{"type": "object", "properties": {"fields": {"type": "array"}, "settings": {"type": "object"}}}',
 'FormBlock', 'clipboard'),

-- Layout blocks
('columns', 'Columns', 'Multi-column layout', 'layout',
 '{"type": "object", "properties": {"columns": {"type": "array"}, "gap": {"type": "string"}}}',
 'ColumnsBlock', 'columns'),
 
('spacer', 'Spacer', 'Vertical spacing', 'layout',
 '{"type": "object", "properties": {"height": {"type": "string"}}}',
 'SpacerBlock', 'minus'),

-- Embed blocks
('youtube', 'YouTube', 'YouTube video embed', 'embed',
 '{"type": "object", "properties": {"video_id": {"type": "string"}, "start_time": {"type": "integer"}}}',
 'YouTubeBlock', 'youtube'),
 
('tweet', 'Tweet', 'Twitter/X post embed', 'embed',
 '{"type": "object", "properties": {"tweet_id": {"type": "string"}}}',
 'TweetBlock', 'twitter');
```

## Phase 3: Asset Management (Week 5-6)

### Asset Storage and Processing

#### Step 3.1: Asset Management Tables
```sql
-- File upload and processing status
CREATE TYPE asset_status_enum AS ENUM (
  'uploading',
  'processing', 
  'ready',
  'failed',
  'deleted'
);

CREATE TYPE asset_type_enum AS ENUM (
  'image',
  'video', 
  'audio',
  'document',
  'archive',
  'other'
);

-- Central asset registry
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- File information
  original_filename TEXT NOT NULL,
  file_type asset_type_enum NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  
  -- Storage paths
  storage_bucket TEXT NOT NULL DEFAULT 'assets',
  storage_path TEXT NOT NULL,
  public_url TEXT,
  
  -- Processing status
  processing_status asset_status_enum DEFAULT 'uploading',
  processing_progress INTEGER DEFAULT 0 CHECK (processing_progress BETWEEN 0 AND 100),
  processing_error TEXT,
  
  -- Metadata extracted from file
  metadata JSONB DEFAULT '{}',
  
  -- Derived assets (thumbnails, transcodes, etc.)
  variants JSONB DEFAULT '{}',
  
  -- Usage tracking
  access_count BIGINT DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique storage paths
  UNIQUE(storage_bucket, storage_path)
);

-- Indexes
CREATE INDEX idx_assets_tenant ON assets (tenant_id, created_at DESC);
CREATE INDEX idx_assets_creator ON assets (creator_id, created_at DESC);
CREATE INDEX idx_assets_type ON assets (tenant_id, file_type, processing_status);
CREATE INDEX idx_assets_status ON assets (processing_status) WHERE processing_status != 'ready';

-- RLS
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant asset isolation" ON assets
  USING (tenant_id = get_current_tenant_id());

-- Asset processing queue for background jobs
CREATE TABLE asset_processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL, -- 'thumbnail', 'transcode', 'transcript', 'optimize'
  priority INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  
  -- Job configuration
  input_params JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_message TEXT,
  
  -- Timing
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Worker assignment
  worker_id TEXT,
  heartbeat_at TIMESTAMPTZ
);

CREATE INDEX idx_processing_jobs_queue ON asset_processing_jobs (priority DESC, created_at) 
  WHERE status = 'pending';
CREATE INDEX idx_processing_jobs_asset ON asset_processing_jobs (asset_id);
```

#### Step 3.2: Content-Asset Relationships
```sql
-- Track which assets are used in which content
CREATE TABLE content_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  block_id TEXT, -- Which block within the content uses this asset
  usage_type TEXT NOT NULL DEFAULT 'content', -- 'content', 'thumbnail', 'cover', 'attachment'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(content_id, asset_id, block_id, usage_type)
);

CREATE INDEX idx_content_assets_content ON content_assets (content_id);
CREATE INDEX idx_content_assets_asset ON content_assets (asset_id);
```

## Phase 4: Collections & Organization (Week 7-8)

### Content Organization System

#### Step 4.1: Collections and Series
```sql
-- Content collections (courses, series, books, etc.)
CREATE TABLE content_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Basic information
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL,
  
  -- Collection type and configuration
  collection_type TEXT NOT NULL CHECK (collection_type IN ('course', 'series', 'book', 'playlist', 'bundle')),
  settings JSONB DEFAULT '{}',
  
  -- Visual identity
  cover_asset_id UUID REFERENCES assets(id),
  brand_colors JSONB DEFAULT '{}',
  
  -- Access control
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted')),
  access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'premium', 'paid')),
  price_cents INTEGER DEFAULT 0,
  
  -- Sequencing
  is_sequential BOOLEAN DEFAULT false, -- Must complete in order
  completion_certificate BOOLEAN DEFAULT false,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, slug)
);

-- Collection membership (many-to-many)
CREATE TABLE content_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES content_collections(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  
  -- Ordering and organization
  sort_order INTEGER NOT NULL,
  section_name TEXT, -- Optional grouping within collection
  
  -- Item-specific settings
  is_required BOOLEAN DEFAULT true,
  unlock_delay_hours INTEGER DEFAULT 0, -- Drip content
  prerequisites TEXT[], -- Array of content IDs that must be completed first
  
  -- Metadata
  notes TEXT,
  estimated_duration_minutes INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(collection_id, content_id),
  UNIQUE(collection_id, sort_order)
);

-- RLS for collections
ALTER TABLE content_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant collection isolation" ON content_collections
  USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Collection items follow collection access" ON content_collection_items
  USING (
    EXISTS (
      SELECT 1 FROM content_collections cc 
      WHERE cc.id = collection_id 
      AND cc.tenant_id = get_current_tenant_id()
    )
  );
```

#### Step 4.2: Taxonomy System
```sql
-- Categories and tags
CREATE TABLE content_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  color TEXT,
  parent_id UUID REFERENCES content_categories(id),
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, slug)
);

CREATE TABLE content_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  color TEXT,
  usage_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, slug)
);

-- Content categorization
CREATE TABLE content_categorizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  category_id UUID REFERENCES content_categories(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES content_tags(id) ON DELETE CASCADE,
  
  CHECK ((category_id IS NULL) != (tag_id IS NULL)), -- Exactly one must be set
  UNIQUE(content_id, category_id),
  UNIQUE(content_id, tag_id)
);

-- Update tag usage counts
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.tag_id IS NOT NULL THEN
    UPDATE content_tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' AND OLD.tag_id IS NOT NULL THEN
    UPDATE content_tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tag_usage
  AFTER INSERT OR DELETE ON content_categorizations
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();
```

## Phase 5: User Engagement & Analytics (Week 9-10)

### Analytics and Tracking

#### Step 5.1: User Engagement Tracking
```sql
-- User interactions with content
CREATE TYPE engagement_event_enum AS ENUM (
  'view',
  'start_reading',
  'progress',
  'completion',
  'bookmark', 
  'share',
  'like',
  'comment',
  'download',
  'purchase'
);

CREATE TABLE content_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id), -- NULL for anonymous users
  session_id TEXT, -- For anonymous tracking
  
  -- Event details
  event_type engagement_event_enum NOT NULL,
  event_data JSONB DEFAULT '{}', -- Progress percentage, block ID, etc.
  
  -- Context
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Timing
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate events within short timeframe
  UNIQUE(content_id, user_id, session_id, event_type, date_trunc('minute', created_at))
);

-- Partitioning by month for performance
CREATE TABLE content_engagement_y2025m01 PARTITION OF content_engagement
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Add more partitions as needed...

-- Indexes for analytics queries
CREATE INDEX idx_engagement_content_time ON content_engagement (content_id, created_at DESC);
CREATE INDEX idx_engagement_user_time ON content_engagement (user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_engagement_events ON content_engagement (event_type, created_at DESC);

-- User progress tracking
CREATE TABLE user_content_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES content_collections(id) ON DELETE CASCADE,
  
  -- Progress tracking
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  completion_status TEXT DEFAULT 'not_started' CHECK (completion_status IN ('not_started', 'in_progress', 'completed', 'abandoned')),
  
  -- Timing
  started_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- Engagement metrics
  total_time_spent_seconds INTEGER DEFAULT 0,
  visit_count INTEGER DEFAULT 1,
  
  -- Block-level progress for detailed tracking
  block_progress JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, content_id)
);

-- Update progress function
CREATE OR REPLACE FUNCTION update_content_progress(
  p_user_id UUID,
  p_content_id UUID,
  p_progress_percentage INTEGER,
  p_time_spent_seconds INTEGER DEFAULT 0
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_content_progress (
    user_id, content_id, progress_percentage, total_time_spent_seconds, started_at
  ) VALUES (
    p_user_id, p_content_id, p_progress_percentage, p_time_spent_seconds, NOW()
  )
  ON CONFLICT (user_id, content_id) DO UPDATE SET
    progress_percentage = GREATEST(user_content_progress.progress_percentage, p_progress_percentage),
    total_time_spent_seconds = user_content_progress.total_time_spent_seconds + p_time_spent_seconds,
    last_accessed_at = NOW(),
    visit_count = user_content_progress.visit_count + 1,
    completed_at = CASE 
      WHEN p_progress_percentage >= 100 AND user_content_progress.completed_at IS NULL 
      THEN NOW() 
      ELSE user_content_progress.completed_at 
    END,
    completion_status = CASE
      WHEN p_progress_percentage >= 100 THEN 'completed'
      WHEN p_progress_percentage > 0 THEN 'in_progress'
      ELSE user_content_progress.completion_status
    END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
```

#### Step 5.2: Performance Analytics Views
```sql
-- Materialized view for content performance metrics
CREATE MATERIALIZED VIEW content_performance_summary AS
SELECT 
  c.id as content_id,
  c.tenant_id,
  c.title,
  c.content_type,
  c.created_at,
  c.published_at,
  
  -- View metrics
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'view') as total_views,
  COUNT(DISTINCT COALESCE(ce.user_id::text, ce.session_id)) FILTER (WHERE ce.event_type = 'view') as unique_views,
  
  -- Engagement metrics
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'like') as likes,
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'share') as shares,
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'bookmark') as bookmarks,
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'comment') as comments,
  
  -- Completion metrics
  COUNT(ce.id) FILTER (WHERE ce.event_type = 'completion') as completions,
  CASE 
    WHEN COUNT(ce.id) FILTER (WHERE ce.event_type = 'view') > 0 
    THEN ROUND(
      COUNT(ce.id) FILTER (WHERE ce.event_type = 'completion')::numeric / 
      COUNT(ce.id) FILTER (WHERE ce.event_type = 'view') * 100, 2
    )
    ELSE 0
  END as completion_rate,
  
  -- Progress metrics
  AVG(ucp.progress_percentage) as avg_progress,
  AVG(ucp.total_time_spent_seconds) as avg_time_spent,
  
  -- Recent activity
  MAX(ce.created_at) as last_activity,
  COUNT(ce.id) FILTER (WHERE ce.created_at > NOW() - INTERVAL '7 days') as views_last_7_days,
  COUNT(ce.id) FILTER (WHERE ce.created_at > NOW() - INTERVAL '30 days') as views_last_30_days

FROM content c
LEFT JOIN content_engagement ce ON c.id = ce.content_id
LEFT JOIN user_content_progress ucp ON c.id = ucp.content_id
WHERE c.status = 'published'
GROUP BY c.id, c.tenant_id, c.title, c.content_type, c.created_at, c.published_at;

-- Create unique index for concurrent refresh
CREATE UNIQUE INDEX ON content_performance_summary (content_id);

-- Function to refresh analytics
CREATE OR REPLACE FUNCTION refresh_content_analytics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY content_performance_summary;
END;
$$ LANGUAGE plpgsql;

-- Schedule analytics refresh (requires pg_cron extension)
-- SELECT cron.schedule('refresh-analytics', '0 */4 * * *', 'SELECT refresh_content_analytics();');
```

## Phase 6: Interactive Features (Week 11-12)

### Community and Collaboration

#### Step 6.1: Comments and Discussions
```sql
-- Nested comment system
CREATE TABLE content_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES content_comments(id) ON DELETE CASCADE,
  
  -- Author information
  author_id UUID NOT NULL REFERENCES auth.users(id),
  author_name TEXT NOT NULL, -- Cached for performance
  author_avatar_url TEXT,
  
  -- Comment content
  body TEXT NOT NULL,
  body_html TEXT, -- Rendered HTML version
  
  -- Moderation
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'pending', 'hidden', 'deleted')),
  moderated_by UUID REFERENCES auth.users(id),
  moderated_at TIMESTAMPTZ,
  moderation_reason TEXT,
  
  -- Engagement
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  
  -- Threading
  thread_level INTEGER DEFAULT 0,
  thread_path TEXT, -- Materialized path for efficient queries
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for comment queries
CREATE INDEX idx_comments_content ON content_comments (content_id, created_at DESC) WHERE status = 'published';
CREATE INDEX idx_comments_author ON content_comments (author_id, created_at DESC);
CREATE INDEX idx_comments_parent ON content_comments (parent_id, created_at) WHERE parent_id IS NOT NULL;
CREATE INDEX idx_comments_thread ON content_comments (thread_path) WHERE thread_path IS NOT NULL;

-- Update reply counts trigger
CREATE OR REPLACE FUNCTION update_comment_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_id IS NOT NULL THEN
    UPDATE content_comments 
    SET reply_count = reply_count + 1 
    WHERE id = NEW.parent_id;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_id IS NOT NULL THEN
    UPDATE content_comments 
    SET reply_count = reply_count - 1 
    WHERE id = OLD.parent_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reply_count
  AFTER INSERT OR DELETE ON content_comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_reply_count();

-- Comment likes
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES content_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(comment_id, user_id)
);

-- Update like counts trigger
CREATE OR REPLACE FUNCTION update_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE content_comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE content_comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_like_count
  AFTER INSERT OR DELETE ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_like_count();
```

#### Step 6.2: Real-Time Collaboration
```sql
-- Document editing sessions for real-time collaboration
CREATE TABLE editing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Session information
  cursor_position JSONB, -- Current cursor/selection position
  active_block_id TEXT, -- Which block is being edited
  
  -- Connection status
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  disconnected_at TIMESTAMPTZ,
  
  -- User display info (cached for performance)
  user_name TEXT NOT NULL,
  user_avatar_url TEXT,
  user_color TEXT, -- Assigned color for this session
  
  UNIQUE(content_id, user_id)
);

-- Auto-cleanup old sessions
CREATE OR REPLACE FUNCTION cleanup_old_editing_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM editing_sessions 
  WHERE last_seen_at < NOW() - INTERVAL '1 hour'
  OR disconnected_at IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Content change log for version history
CREATE TABLE content_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Change details
  change_type TEXT NOT NULL CHECK (change_type IN ('create', 'update', 'delete', 'publish', 'unpublish')),
  block_id TEXT, -- Specific block that changed
  old_value JSONB,
  new_value JSONB,
  
  -- Change summary
  summary TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_changes ON content_changes (content_id, created_at DESC);
```

## Phase 7: Advanced Features (Week 13-14)

### Search and Discovery

#### Step 7.1: Full-Text Search System
```sql
-- Enhanced search with ranking and filtering
CREATE OR REPLACE FUNCTION search_content(
  p_tenant_id UUID,
  p_query TEXT,
  p_content_types content_type_enum[] DEFAULT NULL,
  p_categories UUID[] DEFAULT NULL,
  p_tags UUID[] DEFAULT NULL,
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  content_id UUID,
  title TEXT,
  excerpt TEXT,
  content_type content_type_enum,
  published_at TIMESTAMPTZ,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.title,
    c.excerpt,
    c.content_type,
    c.published_at,
    ts_rank(
      to_tsvector('english', c.title || ' ' || coalesce(c.excerpt, '') || ' ' || coalesce(c.seo_description, '')),
      plainto_tsquery('english', p_query)
    ) as rank
  FROM content c
  LEFT JOIN content_categorizations cc ON c.id = cc.content_id
  WHERE 
    c.tenant_id = p_tenant_id
    AND c.status = 'published'
    AND (
      to_tsvector('english', c.title || ' ' || coalesce(c.excerpt, '') || ' ' || coalesce(c.seo_description, ''))
      @@ plainto_tsquery('english', p_query)
    )
    AND (p_content_types IS NULL OR c.content_type = ANY(p_content_types))
    AND (p_categories IS NULL OR cc.category_id = ANY(p_categories))
    AND (p_tags IS NULL OR cc.tag_id = ANY(p_tags))
  ORDER BY rank DESC, c.published_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Search suggestions based on popular queries
CREATE TABLE search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  result_count INTEGER,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_search_queries_popular ON search_queries (tenant_id, query, created_at DESC);
```

#### Step 7.2: Recommendation System
```sql
-- Content recommendations based on user behavior
CREATE TABLE content_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  
  -- Recommendation details
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('similar', 'popular', 'trending', 'personalized')),
  confidence_score REAL DEFAULT 0.5 CHECK (confidence_score BETWEEN 0 AND 1),
  reason TEXT,
  
  -- Tracking
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  shown_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  
  UNIQUE(user_id, content_id, recommendation_type)
);

-- Function to generate recommendations
CREATE OR REPLACE FUNCTION generate_recommendations(p_user_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  content_id UUID,
  title TEXT,
  content_type content_type_enum,
  confidence_score REAL,
  reason TEXT
) AS $$
BEGIN
  -- Simple collaborative filtering based on similar users' content consumption
  RETURN QUERY
  WITH user_content AS (
    SELECT DISTINCT ucp.content_id
    FROM user_content_progress ucp
    WHERE ucp.user_id = p_user_id
    AND ucp.progress_percentage > 50
  ),
  similar_users AS (
    SELECT ucp2.user_id, COUNT(*) as shared_content
    FROM user_content_progress ucp2
    JOIN user_content uc ON ucp2.content_id = uc.content_id
    WHERE ucp2.user_id != p_user_id
    AND ucp2.progress_percentage > 50
    GROUP BY ucp2.user_id
    HAVING COUNT(*) >= 2
    ORDER BY shared_content DESC
    LIMIT 50
  ),
  recommended_content AS (
    SELECT 
      ucp3.content_id,
      COUNT(*) as recommendation_strength
    FROM user_content_progress ucp3
    JOIN similar_users su ON ucp3.user_id = su.user_id
    LEFT JOIN user_content uc2 ON ucp3.content_id = uc2.content_id
    WHERE uc2.content_id IS NULL -- User hasn't consumed this content
    AND ucp3.progress_percentage > 75
    GROUP BY ucp3.content_id
    ORDER BY recommendation_strength DESC
    LIMIT p_limit
  )
  SELECT 
    c.id,
    c.title,
    c.content_type,
    LEAST(rc.recommendation_strength::REAL / 10, 1.0) as confidence_score,
    'Based on similar users' preferences' as reason
  FROM recommended_content rc
  JOIN content c ON rc.content_id = c.id
  WHERE c.status = 'published';
END;
$$ LANGUAGE plpgsql;
```

## Phase 8: Performance & Optimization (Week 15-16)

### Database Optimization

#### Step 8.1: Advanced Indexing Strategy
```sql
-- Composite indexes for common query patterns
CREATE INDEX CONCURRENTLY idx_content_tenant_status_type_published 
ON content (tenant_id, status, content_type, published_at DESC) 
WHERE status IN ('published', 'scheduled');

CREATE INDEX CONCURRENTLY idx_content_creator_type_status 
ON content (creator_id, content_type, status, created_at DESC);

-- Partial indexes for frequently filtered queries
CREATE INDEX CONCURRENTLY idx_content_premium 
ON content (tenant_id, access_level, published_at DESC) 
WHERE access_level IN ('premium', 'paid') AND status = 'published';

CREATE INDEX CONCURRENTLY idx_assets_processing 
ON assets (tenant_id, processing_status, created_at) 
WHERE processing_status IN ('uploading', 'processing');

-- Expression indexes for JSON queries
CREATE INDEX CONCURRENTLY idx_content_blocks_text 
ON content USING gin((blocks->>'text')) 
WHERE blocks IS NOT NULL;

CREATE INDEX CONCURRENTLY idx_assets_metadata_duration 
ON assets USING btree(((metadata->>'duration')::integer)) 
WHERE file_type = 'video' AND metadata ? 'duration';

-- Covering indexes to avoid table lookups
CREATE INDEX CONCURRENTLY idx_content_list_covering 
ON content (tenant_id, status, published_at DESC) 
INCLUDE (id, title, excerpt, content_type, creator_id);
```

#### Step 8.2: Partitioning Strategy
```sql
-- Partition analytics tables by time
CREATE TABLE content_engagement_template (LIKE content_engagement INCLUDING ALL);

-- Create monthly partitions for current and next year
DO $$
DECLARE
  start_date DATE;
  end_date DATE;
  table_name TEXT;
BEGIN
  FOR month_offset IN 0..23 LOOP -- 24 months
    start_date := date_trunc('month', NOW() + (month_offset || ' months')::interval);
    end_date := start_date + interval '1 month';
    table_name := 'content_engagement_' || to_char(start_date, 'YYYY') || 'm' || to_char(start_date, 'MM');
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF content_engagement FOR VALUES FROM (%L) TO (%L)',
      table_name, start_date, end_date);
  END LOOP;
END $$;

-- Auto-partition maintenance function
CREATE OR REPLACE FUNCTION maintain_partitions()
RETURNS void AS $$
DECLARE
  future_date DATE := date_trunc('month', NOW() + interval '2 months');
  old_date DATE := date_trunc('month', NOW() - interval '6 months');
  table_name TEXT;
BEGIN
  -- Create future partition
  table_name := 'content_engagement_' || to_char(future_date, 'YYYY') || 'm' || to_char(future_date, 'MM');
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF content_engagement FOR VALUES FROM (%L) TO (%L)',
    table_name, future_date, future_date + interval '1 month');
  
  -- Archive old partitions (optional)
  table_name := 'content_engagement_' || to_char(old_date, 'YYYY') || 'm' || to_char(old_date, 'MM');
  -- EXECUTE format('DROP TABLE IF EXISTS %I', table_name);
END;
$$ LANGUAGE plpgsql;

-- Schedule partition maintenance
-- SELECT cron.schedule('maintain-partitions', '0 0 1 * *', 'SELECT maintain_partitions();');
```

#### Step 8.3: Maintenance Procedures
```sql
-- Comprehensive maintenance function
CREATE OR REPLACE FUNCTION run_maintenance()
RETURNS void AS $$
BEGIN
  -- Update statistics
  ANALYZE;
  
  -- Refresh materialized views
  REFRESH MATERIALIZED VIEW CONCURRENTLY content_performance_summary;
  
  -- Clean up old sessions
  PERFORM cleanup_old_editing_sessions();
  
  -- Update tag usage counts
  UPDATE content_tags SET usage_count = (
    SELECT COUNT(*) FROM content_categorizations cc WHERE cc.tag_id = content_tags.id
  );
  
  -- Clean up orphaned assets
  DELETE FROM assets 
  WHERE id NOT IN (SELECT DISTINCT asset_id FROM content_assets WHERE asset_id IS NOT NULL)
  AND created_at < NOW() - INTERVAL '7 days'
  AND processing_status = 'failed';
  
  -- Vacuum analyze high-churn tables
  VACUUM ANALYZE content_engagement;
  VACUUM ANALYZE editing_sessions;
  VACUUM ANALYZE content_changes;
  
  RAISE NOTICE 'Maintenance completed at %', NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule maintenance
-- SELECT cron.schedule('daily-maintenance', '0 2 * * *', 'SELECT run_maintenance();');
```

## Implementation Timeline and Checklist

### Week 1-2: Foundation
- [ ] Set up Supabase project with proper configuration
- [ ] Implement authentication and user profiles
- [ ] Create tenant management system with RLS
- [ ] Define content type enumerations
- [ ] Set up basic content table with proper indexing

### Week 3-4: Core Content
- [ ] Implement block-based content structure
- [ ] Create block type registry and validation
- [ ] Set up content workflow (draft → review → published)
- [ ] Implement SEO and metadata management
- [ ] Add content versioning and collaboration locks

### Week 5-6: Asset Management
- [ ] Set up Supabase Storage buckets and policies
- [ ] Implement asset upload and processing queue
- [ ] Create asset-content relationship tracking
- [ ] Set up background processing for media files
- [ ] Implement asset optimization and variants

### Week 7-8: Organization
- [ ] Create collections and series management
- [ ] Implement taxonomy system (categories/tags)
- [ ] Set up content relationships and prerequisites
- [ ] Add drip content and unlock mechanisms
- [ ] Implement collection progress tracking

### Week 9-10: Analytics
- [ ] Set up engagement event tracking
- [ ] Implement user progress monitoring
- [ ] Create performance analytics views
- [ ] Set up real-time analytics updates
- [ ] Add analytics dashboard queries

### Week 11-12: Community Features
- [ ] Implement nested comment system
- [ ] Add real-time collaboration features
- [ ] Set up change tracking and version history
- [ ] Implement moderation tools
- [ ] Add user engagement features (likes, shares)

### Week 13-14: Advanced Features
- [ ] Implement full-text search with ranking
- [ ] Create recommendation system
- [ ] Add search analytics and suggestions
- [ ] Implement content discovery algorithms
- [ ] Set up personalization features

### Week 15-16: Optimization
- [ ] Add comprehensive indexing strategy
- [ ] Implement table partitioning for analytics
- [ ] Set up automated maintenance procedures
- [ ] Optimize query performance
- [ ] Add monitoring and alerting

### Ongoing Maintenance
- [ ] Regular database maintenance procedures
- [ ] Performance monitoring and optimization
- [ ] Backup and disaster recovery testing
- [ ] Security audit and updates
- [ ] Capacity planning and scaling

This comprehensive database plan provides the foundation for a powerful, scalable content creation platform that can handle all content types while maintaining performance, security, and data integrity across multiple tenants.