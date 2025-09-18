# The Complete Supabase Guide for Your Platform

**The End-All Be-All Guide to Using Supabase in Your Project According to Best Practices**

---

## **Your Supabase Architecture: The Complete Picture**

**Supabase is the backbone of your entire platform—it's your database, API, authentication system, file storage, real-time engine, and Edge Functions runtime all in one.** For your specific project, Supabase enables you to serve multiple organizations (5Q, Movement Leaders, 100 Movements, etc.) with completely isolated data, sophisticated learning management capabilities, AI-powered content creation, and real-time collaboration features.

This guide provides the definitive implementation strategy for leveraging Supabase across every aspect of your platform.

## **1. Database Architecture Strategy**

### **Schema Organization for Multi-Tenant Platform**

Your database should be organized into logical schemas that reflect your platform's functional areas:

```sql
-- Core database organization
CREATE SCHEMA IF NOT EXISTS lms;        -- Learning Management System
CREATE SCHEMA IF NOT EXISTS content;    -- Content Publishing & Management
CREATE SCHEMA IF NOT EXISTS community;  -- Discussion, Comments, Social Features
CREATE SCHEMA IF NOT EXISTS commerce;   -- Billing, Subscriptions, Payments
CREATE SCHEMA IF NOT EXISTS analytics;  -- User Behavior & Performance Data
CREATE SCHEMA IF NOT EXISTS integrations; -- External Service Connections

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA lms TO authenticated;
GRANT USAGE ON SCHEMA content TO authenticated;
GRANT USAGE ON SCHEMA community TO authenticated;
GRANT USAGE ON SCHEMA commerce TO authenticated;
GRANT USAGE ON SCHEMA analytics TO authenticated;

-- Service role for Edge Functions
GRANT ALL ON SCHEMA lms TO service_role;
GRANT ALL ON SCHEMA content TO service_role;
GRANT ALL ON SCHEMA community TO service_role;
GRANT ALL ON SCHEMA commerce TO service_role;
GRANT ALL ON SCHEMA analytics TO service_role;
```

### **Core Tables Implementation**

```sql
-- LMS Schema: Multi-tenant learning management
CREATE TABLE lms.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT UNIQUE,
  settings JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  subscription_tier TEXT DEFAULT 'basic',
  billing_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lms.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES lms.tenants(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  permissions JSONB DEFAULT '{}',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  UNIQUE(user_id, tenant_id)
);

CREATE TABLE lms.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES lms.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  content_blocks JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  level TEXT DEFAULT 'foundation',
  duration_weeks INTEGER,
  price_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  access_level TEXT DEFAULT 'member',
  featured_image TEXT,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- Content Schema: Block-based publishing system
CREATE TABLE content.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content_blocks JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  author_id UUID NOT NULL REFERENCES auth.users(id),
  tenant_id UUID REFERENCES lms.tenants(id),
  status TEXT DEFAULT 'draft',
  access_level TEXT DEFAULT 'public',
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  search_vector tsvector,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Schema: Social features
CREATE TABLE community.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_id UUID REFERENCES content.items(id),
  tenant_id UUID REFERENCES lms.tenants(id),
  author_id UUID NOT NULL REFERENCES auth.users(id),
  category TEXT,
  tags TEXT[],
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  reply_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commerce Schema: Revenue management
CREATE TABLE commerce.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  tenant_id UUID REFERENCES lms.tenants(id),
  stripe_subscription_id TEXT UNIQUE,
  tier TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Schema: Comprehensive tracking
CREATE TABLE analytics.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Row Level Security (RLS) Implementation**

```sql
-- Enable RLS on all tables
ALTER TABLE lms.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE content.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE community.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics.events ENABLE ROW LEVEL SECURITY;

-- Tenant isolation policies
CREATE POLICY "tenant_members_only" ON lms.courses FOR ALL
USING (
  tenant_id IN (
    SELECT m.tenant_id FROM lms.memberships m 
    WHERE m.user_id = auth.uid() AND m.status = 'active'
  )
);

CREATE POLICY "public_content_read" ON content.items FOR SELECT
USING (
  access_level = 'public' OR
  (access_level = 'member' AND auth.uid() IS NOT NULL) OR
  (access_level = 'premium' AND EXISTS (
    SELECT 1 FROM commerce.subscriptions s
    WHERE s.user_id = auth.uid() 
    AND s.tier IN ('premium', 'enterprise')
    AND s.status = 'active'
  ))
);

-- User data isolation
CREATE POLICY "own_data_only" ON commerce.subscriptions FOR ALL
USING (user_id = auth.uid());

CREATE POLICY "analytics_privacy" ON analytics.events FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM lms.memberships m
    WHERE m.user_id = auth.uid() 
    AND m.role IN ('admin', 'analytics')
  )
);
```

## **2. Authentication & User Management Strategy**

### **Extended User Profiles**

```sql
-- Extended user profiles in public schema
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  timezone TEXT DEFAULT 'UTC',
  preferences JSONB DEFAULT '{}',
  apest_profile JSONB DEFAULT '{}',
  learning_path JSONB DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on user creation
CREATE OR REPLACE FUNCTION create_user_profile() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();
```

### **Multi-Tenant User Context**

```typescript
// lib/auth/tenant-auth.ts
export class TenantAuthService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async signInWithTenant(email: string, password: string, tenantSlug?: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error || !data.user) return { data: null, error }

    // If tenant specified, verify membership
    if (tenantSlug) {
      const { data: membership } = await this.supabase
        .from('memberships')
        .select('*, tenant:tenants(*)')
        .eq('user_id', data.user.id)
        .eq('tenant.slug', tenantSlug)
        .eq('status', 'active')
        .single()

      if (!membership) {
        await this.supabase.auth.signOut()
        return { 
          data: null, 
          error: new Error('No access to this organization') 
        }
      }

      // Set tenant context
      await this.setCurrentTenant(membership.tenant_id)
    }

    return { data, error: null }
  }

  async setCurrentTenant(tenantId: string) {
    // Store in database for session persistence
    await this.supabase.rpc('set_current_tenant', { tenant_id: tenantId })
    
    // Store locally for immediate use
    localStorage.setItem('current_tenant_id', tenantId)
  }

  async getCurrentTenantMembership(userId: string) {
    const tenantId = localStorage.getItem('current_tenant_id')
    if (!tenantId) return null

    const { data } = await this.supabase
      .from('memberships')
      .select(`
        *,
        tenant:tenants(*)
      `)
      .eq('user_id', userId)
      .eq('tenant_id', tenantId)
      .eq('status', 'active')
      .single()

    return data
  }

  async getUserTenants(userId: string) {
    const { data } = await this.supabase
      .from('memberships')
      .select(`
        role,
        joined_at,
        tenant:tenants(
          id,
          name,
          slug,
          domain,
          branding
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('joined_at', { ascending: false })

    return data
  }
}
```

## **3. Content Management with Supabase**

### **Block-Based Content Storage**

```typescript
// services/content-service.ts
export class ContentService {
  private supabase: SupabaseClient

  constructor(tenantId?: string) {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    if (tenantId) {
      // Set tenant context for all subsequent queries
      this.supabase.rpc('set_current_tenant', { tenant_id: tenantId })
    }
  }

  async createContent(contentData: CreateContentInput): Promise<ContentItem> {
    // Validate block structure
    const validatedBlocks = await this.validateContentBlocks(contentData.content_blocks)
    
    // Generate SEO metadata
    const seoData = await this.generateSEOMetadata(contentData)
    
    // Create search vector
    const searchVector = this.generateSearchVector(contentData)

    const { data, error } = await this.supabase
      .from('content.items')
      .insert({
        ...contentData,
        content_blocks: validatedBlocks,
        seo_title: seoData.title,
        seo_description: seoData.description,
        search_vector: searchVector,
        slug: this.generateSlug(contentData.title)
      })
      .select()
      .single()

    if (error) throw new Error(`Content creation failed: ${error.message}`)
    return data
  }

  async updateContent(contentId: string, updates: Partial<ContentItem>): Promise<ContentItem> {
    // Update search vector if content changed
    if (updates.content_blocks || updates.title) {
      updates.search_vector = this.generateSearchVector(updates)
      updates.updated_at = new Date().toISOString()
    }

    const { data, error } = await this.supabase
      .from('content.items')
      .update(updates)
      .eq('id', contentId)
      .select()
      .single()

    if (error) throw new Error(`Content update failed: ${error.message}`)
    return data
  }

  async publishContent(contentId: string): Promise<ContentItem> {
    // Validate content is ready for publishing
    const validation = await this.validateForPublishing(contentId)
    if (!validation.valid) {
      throw new Error(`Content not ready: ${validation.errors.join(', ')}`)
    }

    const { data, error } = await this.supabase
      .from('content.items')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', contentId)
      .select()
      .single()

    if (error) throw new Error(`Publishing failed: ${error.message}`)

    // Trigger post-publish actions via Edge Function
    await this.supabase.functions.invoke('content-published', {
      body: { contentId, authorId: data.author_id }
    })

    return data
  }

  private async validateContentBlocks(blocks: ContentBlock[]): Promise<ContentBlock[]> {
    // Validate each block structure
    for (const block of blocks) {
      if (!this.isValidBlockType(block.type)) {
        throw new Error(`Invalid block type: ${block.type}`)
      }
      
      // Sanitize content
      block.content = await this.sanitizeBlockContent(block)
    }
    
    return blocks
  }

  private generateSearchVector(content: Partial<ContentItem>): string {
    const searchableContent = [
      content.title || '',
      content.excerpt || '',
      this.extractTextFromBlocks(content.content_blocks || [])
    ].join(' ')

    return `to_tsvector('english', '${searchableContent.replace(/'/g, "''")}')`
  }
}
```

### **Real-Time Collaboration**

```typescript
// hooks/use-collaborative-editing.ts
export function useCollaborativeEditing(contentId: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [contentLocks, setContentLocks] = useState<ContentLock[]>([])
  
  useEffect(() => {
    if (!contentId) return

    const channel = supabase
      .channel(`content-${contentId}`)
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const currentCollaborators = Object.values(presenceState)
          .flat()
          .map(p => p as Collaborator)
        setCollaborators(currentCollaborators)
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences)
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences)
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'content',
        table: 'items',
        filter: `id=eq.${contentId}`
      }, (payload) => {
        // Handle real-time content updates
        handleContentChange(payload)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track user presence
          await channel.track({
            user_id: user?.id,
            username: user?.email,
            cursor_position: null,
            last_seen: new Date().toISOString()
          })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [contentId])

  const updateCursorPosition = async (blockId: string, position: number) => {
    await channel.track({
      user_id: user?.id,
      username: user?.email,
      cursor_position: { blockId, position },
      last_seen: new Date().toISOString()
    })
  }

  const lockBlock = async (blockId: string) => {
    const { error } = await supabase
      .from('content.block_locks')
      .insert({
        content_id: contentId,
        block_id: blockId,
        user_id: user?.id,
        locked_at: new Date().toISOString()
      })
    
    if (error && error.code !== '23505') { // Ignore duplicate key errors
      console.error('Failed to lock block:', error)
    }
  }

  const unlockBlock = async (blockId: string) => {
    await supabase
      .from('content.block_locks')
      .delete()
      .eq('content_id', contentId)
      .eq('block_id', blockId)
      .eq('user_id', user?.id)
  }

  return {
    collaborators,
    contentLocks,
    updateCursorPosition,
    lockBlock,
    unlockBlock
  }
}
```

## **4. Storage and Media Management**

### **Comprehensive File Management**

```typescript
// services/media-service.ts
export class MediaService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async uploadFile(
    file: File, 
    options: {
      folder?: string
      tenantId?: string
      optimize?: boolean
      generateThumbnails?: boolean
    } = {}
  ): Promise<MediaFile> {
    const fileId = uuidv4()
    const fileExt = file.name.split('.').pop()
    const fileName = `${fileId}.${fileExt}`
    const folderPath = options.folder || 'uploads'
    const tenantPrefix = options.tenantId ? `${options.tenantId}/` : ''
    const filePath = `${tenantPrefix}${folderPath}/${fileName}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

    // Get public URL
    const { data: { publicUrl } } = this.supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    // Create media record
    const mediaData = {
      id: fileId,
      filename: file.name,
      file_path: filePath,
      public_url: publicUrl,
      file_size: file.size,
      mime_type: file.type,
      folder: options.folder,
      tenant_id: options.tenantId,
      uploaded_by: (await this.supabase.auth.getUser()).data.user?.id,
      metadata: {
        original_name: file.name,
        upload_timestamp: new Date().toISOString()
      }
    }

    const { data: media, error: mediaError } = await this.supabase
      .from('media.files')
      .insert(mediaData)
      .select()
      .single()

    if (mediaError) throw new Error(`Media record creation failed: ${mediaError.message}`)

    // Generate thumbnails for images
    if (options.generateThumbnails && file.type.startsWith('image/')) {
      await this.generateThumbnails(fileId, filePath)
    }

    // Optimize media if requested
    if (options.optimize) {
      await this.optimizeMedia(fileId)
    }

    return media
  }

  async generateThumbnails(mediaId: string, filePath: string) {
    // Trigger Edge Function for thumbnail generation
    const { error } = await this.supabase.functions.invoke('generate-thumbnails', {
      body: { mediaId, filePath }
    })
    
    if (error) console.error('Thumbnail generation failed:', error)
  }

  async optimizeMedia(mediaId: string) {
    // Trigger Edge Function for media optimization
    const { error } = await this.supabase.functions.invoke('optimize-media', {
      body: { mediaId }
    })
    
    if (error) console.error('Media optimization failed:', error)
  }

  async getMediaLibrary(
    tenantId?: string,
    folder?: string,
    page = 1,
    limit = 20
  ): Promise<{ media: MediaFile[], total: number }> {
    let query = this.supabase
      .from('media.files')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (tenantId) {
      query = query.eq('tenant_id', tenantId)
    }

    if (folder) {
      query = query.eq('folder', folder)
    }

    const { data: media, count, error } = await query

    if (error) throw new Error(`Media query failed: ${error.message}`)

    return { media: media || [], total: count || 0 }
  }

  async deleteMedia(mediaId: string): Promise<void> {
    // Get media record
    const { data: media, error: fetchError } = await this.supabase
      .from('media.files')
      .select('file_path')
      .eq('id', mediaId)
      .single()

    if (fetchError) throw new Error(`Media not found: ${fetchError.message}`)

    // Delete from storage
    const { error: storageError } = await this.supabase.storage
      .from('media')
      .remove([media.file_path])

    if (storageError) throw new Error(`Storage deletion failed: ${storageError.message}`)

    // Delete media record
    const { error: dbError } = await this.supabase
      .from('media.files')
      .delete()
      .eq('id', mediaId)

    if (dbError) throw new Error(`Database deletion failed: ${dbError.message}`)
  }
}
```

### **Image Optimization Edge Function**

```typescript
// supabase/functions/optimize-media/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface OptimizeMediaRequest {
  mediaId: string
}

serve(async (req) => {
  try {
    const { mediaId }: OptimizeMediaRequest = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get media file details
    const { data: media, error: mediaError } = await supabase
      .from('media.files')
      .select('*')
      .eq('id', mediaId)
      .single()

    if (mediaError) throw new Error(`Media not found: ${mediaError.message}`)

    // Download original file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('media')
      .download(media.file_path)

    if (downloadError) throw new Error(`Download failed: ${downloadError.message}`)

    // Process based on file type
    if (media.mime_type.startsWith('image/')) {
      await optimizeImage(supabase, media, fileData)
    } else if (media.mime_type.startsWith('video/')) {
      await optimizeVideo(supabase, media, fileData)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

async function optimizeImage(supabase: any, media: any, fileData: Blob) {
  // Convert to WebP format for better compression
  const optimizedPath = media.file_path.replace(/\.[^.]+$/, '.webp')
  
  // Use ImageMagick or similar for optimization
  // This is a simplified example - you'd use actual image processing
  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(optimizedPath, fileData, {
      cacheControl: '31536000',
      upsert: true
    })

  if (!uploadError) {
    // Update media record with optimized version
    await supabase
      .from('media.files')
      .update({
        optimized_path: optimizedPath,
        optimization_completed: true
      })
      .eq('id', media.id)
  }
}
```

## **5. Edge Functions for Advanced Features**

### **AI Content Enhancement Function**

```typescript
// supabase/functions/ai-content-enhance/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'https://esm.sh/openai@4'

interface EnhanceContentRequest {
  contentId: string
  enhancementType: 'seo' | 'readability' | 'engagement' | 'theological_accuracy'
}

serve(async (req) => {
  try {
    const { contentId, enhancementType }: EnhanceContentRequest = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY')!
    })

    // Get content
    const { data: content, error } = await supabase
      .from('content.items')
      .select('*')
      .eq('id', contentId)
      .single()

    if (error) throw new Error(`Content not found: ${error.message}`)

    // Generate enhancement based on type
    let enhancement
    switch (enhancementType) {
      case 'seo':
        enhancement = await enhanceForSEO(openai, content)
        break
      case 'readability':
        enhancement = await improveReadability(openai, content)
        break
      case 'engagement':
        enhancement = await increaseEngagement(openai, content)
        break
      case 'theological_accuracy':
        enhancement = await verifyTheologicalAccuracy(openai, content)
        break
      default:
        throw new Error(`Unknown enhancement type: ${enhancementType}`)
    }

    // Store enhancement suggestions
    const { error: suggestionError } = await supabase
      .from('content.ai_suggestions')
      .insert({
        content_id: contentId,
        enhancement_type: enhancementType,
        suggestions: enhancement,
        created_at: new Date().toISOString()
      })

    if (suggestionError) throw new Error(`Failed to store suggestions: ${suggestionError.message}`)

    return new Response(JSON.stringify(enhancement), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

async function enhanceForSEO(openai: OpenAI, content: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are an SEO expert specializing in theological and educational content. 
                 Analyze the content and provide specific SEO improvement suggestions while 
                 maintaining theological accuracy and educational value.`
      },
      {
        role: 'user',
        content: `Analyze this content for SEO optimization:
                 Title: ${content.title}
                 Content: ${JSON.stringify(content.content_blocks)}
                 
                 Provide suggestions for:
                 1. Title optimization
                 2. Meta description
                 3. Header structure
                 4. Keyword opportunities
                 5. Internal linking opportunities`
      }
    ],
    max_tokens: 1500
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}
```

### **Learning Analytics Edge Function**

```typescript
// supabase/functions/learning-analytics/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface AnalyticsRequest {
  tenantId?: string
  userId?: string
  timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'
  metrics: string[]
}

serve(async (req) => {
  try {
    const { tenantId, userId, timeframe, metrics }: AnalyticsRequest = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const analytics = {}

    for (const metric of metrics) {
      switch (metric) {
        case 'engagement':
          analytics[metric] = await calculateEngagementMetrics(supabase, { tenantId, userId, timeframe })
          break
        case 'progress':
          analytics[metric] = await calculateProgressMetrics(supabase, { tenantId, userId, timeframe })
          break
        case 'completion':
          analytics[metric] = await calculateCompletionMetrics(supabase, { tenantId, userId, timeframe })
          break
        case 'retention':
          analytics[metric] = await calculateRetentionMetrics(supabase, { tenantId, userId, timeframe })
          break
      }
    }

    return new Response(JSON.stringify(analytics), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

async function calculateEngagementMetrics(supabase: any, params: any) {
  const timeRange = getTimeRange(params.timeframe)
  
  let query = supabase
    .from('analytics.events')
    .select('event_type, event_data, recorded_at, user_id')
    .gte('recorded_at', timeRange.start)
    .lte('recorded_at', timeRange.end)

  if (params.tenantId) {
    // Filter by tenant through joins if needed
    query = query.eq('event_data->>tenant_id', params.tenantId)
  }

  if (params.userId) {
    query = query.eq('user_id', params.userId)
  }

  const { data: events, error } = await query

  if (error) throw new Error(`Failed to fetch events: ${error.message}`)

  // Calculate engagement metrics
  const metrics = {
    total_events: events.length,
    unique_users: new Set(events.map(e => e.user_id)).size,
    avg_session_length: calculateAverageSessionLength(events),
    top_content: getTopContent(events),
    engagement_by_day: groupEventsByDay(events)
  }

  return metrics
}

function getTimeRange(timeframe: string) {
  const now = new Date()
  const start = new Date()

  switch (timeframe) {
    case 'day':
      start.setDate(now.getDate() - 1)
      break
    case 'week':
      start.setDate(now.getDate() - 7)
      break
    case 'month':
      start.setMonth(now.getMonth() - 1)
      break
    case 'quarter':
      start.setMonth(now.getMonth() - 3)
      break
    case 'year':
      start.setFullYear(now.getFullYear() - 1)
      break
  }

  return {
    start: start.toISOString(),
    end: now.toISOString()
  }
}
```

## **6. Performance Optimization Strategies**

### **Database Optimization**

```sql
-- Essential indexes for performance
CREATE INDEX CONCURRENTLY idx_content_items_search ON content.items USING gin(search_vector);
CREATE INDEX CONCURRENTLY idx_content_items_tenant_status ON content.items(tenant_id, status, published_at);
CREATE INDEX CONCURRENTLY idx_memberships_user_tenant ON lms.memberships(user_id, tenant_id) WHERE status = 'active';
CREATE INDEX CONCURRENTLY idx_courses_tenant_published ON lms.courses(tenant_id, status, published_at);
CREATE INDEX CONCURRENTLY idx_analytics_events_user_time ON analytics.events(user_id, recorded_at);

-- Partial indexes for common queries
CREATE INDEX CONCURRENTLY idx_published_content ON content.items(published_at DESC) 
WHERE status = 'published';

CREATE INDEX CONCURRENTLY idx_active_subscriptions ON commerce.subscriptions(user_id, tenant_id) 
WHERE status = 'active';

-- Composite indexes for complex queries
CREATE INDEX CONCURRENTLY idx_course_progress ON lms.lesson_progress(user_id, course_id, completed_at);
```

### **Caching Strategy**

```typescript
// lib/cache/supabase-cache.ts
export class SupabaseCache {
  private redis: Redis
  private supabase: SupabaseClient

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL!)
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  async getCachedQuery<T>(
    key: string,
    queryFn: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    // Try cache first
    const cached = await this.redis.get(key)
    if (cached) {
      return JSON.parse(cached)
    }

    // Execute query
    const result = await queryFn()
    
    // Cache result
    await this.redis.setex(key, ttl, JSON.stringify(result))
    
    return result
  }

  async invalidatePattern(pattern: string) {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }

  // Cache frequently accessed data
  async getCourseWithCache(courseId: string, tenantId: string) {
    return this.getCachedQuery(
      `course:${tenantId}:${courseId}`,
      async () => {
        const { data } = await this.supabase
          .from('lms.courses')
          .select(`
            *,
            modules(
              *,
              lessons(*)
            )
          `)
          .eq('id', courseId)
          .eq('tenant_id', tenantId)
          .single()
        return data
      },
      600 // 10 minutes
    )
  }

  async getUserProgressWithCache(userId: string, courseId: string) {
    return this.getCachedQuery(
      `progress:${userId}:${courseId}`,
      async () => {
        const { data } = await this.supabase
          .from('lms.lesson_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('course_id', courseId)
        return data
      },
      60 // 1 minute (progress changes frequently)
    )
  }
}
```

## **7. Monitoring and Error Handling**

### **Comprehensive Error Tracking**

```typescript
// lib/error-tracking/supabase-errors.ts
export class SupabaseErrorTracker {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  async logError(error: Error, context: any) {
    try {
      await this.supabase
        .from('system.error_logs')
        .insert({
          error_message: error.message,
          error_stack: error.stack,
          context: JSON.stringify(context),
          user_id: context.userId || null,
          tenant_id: context.tenantId || null,
          url: context.url || null,
          user_agent: context.userAgent || null,
          occurred_at: new Date().toISOString()
        })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
  }

  async trackDatabasePerformance() {
    const { data: slowQueries } = await this.supabase
      .rpc('get_slow_queries')

    const { data: connectionStats } = await this.supabase
      .rpc('get_connection_stats')

    return {
      slowQueries,
      connectionStats,
      timestamp: new Date().toISOString()
    }
  }
}

// Database functions for monitoring
CREATE OR REPLACE FUNCTION get_slow_queries()
RETURNS TABLE(
  query text,
  calls bigint,
  total_time double precision,
  mean_time double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pg_stat_statements.query,
    pg_stat_statements.calls,
    pg_stat_statements.total_time,
    pg_stat_statements.mean_time
  FROM pg_stat_statements
  WHERE pg_stat_statements.mean_time > 100
  ORDER BY pg_stat_statements.mean_time DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## **8. Deployment and Production Configuration**

### **Environment Configuration**

```bash
# .env.production
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database Configuration
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Storage Configuration  
SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1

# External Services
OPENAI_API_KEY=your-openai-key
STRIPE_SECRET_KEY=your-stripe-key
SENDGRID_API_KEY=your-sendgrid-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
REDIS_URL=your-redis-url

# Security
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### **Production Deployment Checklist**

```typescript
// scripts/production-checklist.ts
export const productionChecklist = {
  database: [
    'Enable SSL connections',
    'Configure connection pooling (pgBouncer)',
    'Set up automated backups',
    'Enable Point-in-Time Recovery',
    'Configure database monitoring',
    'Set up read replicas if needed'
  ],
  
  security: [
    'Enable RLS on all tables',
    'Configure CORS properly',
    'Set up rate limiting',
    'Enable audit logging',
    'Configure secure headers',
    'Set up SSL certificates'
  ],
  
  performance: [
    'Enable Edge Functions caching',
    'Configure CDN for static assets',
    'Set up Redis for application caching',
    'Optimize database indexes',
    'Configure image optimization',
    'Enable gzip compression'
  ],
  
  monitoring: [
    'Set up error tracking (Sentry)',
    'Configure uptime monitoring',
    'Set up performance monitoring',
    'Configure database monitoring',
    'Set up log aggregation',
    'Configure alerting rules'
  ]
}
```

**Supabase provides the complete infrastructure foundation for your sophisticated theological education platform.** By leveraging its PostgreSQL database, real-time capabilities, authentication system, file storage, and Edge Functions, you can build a world-class learning management and content publishing system that scales to serve multiple organizations while maintaining security, performance, and developer productivity.

The key to success with Supabase is understanding how all these pieces work together—database schemas inform API generation, RLS policies provide security, Edge Functions handle complex business logic, and real-time features enable collaboration. When implemented correctly, Supabase becomes an invisible foundation that enables your platform to focus on delivering exceptional educational experiences for missional leaders.