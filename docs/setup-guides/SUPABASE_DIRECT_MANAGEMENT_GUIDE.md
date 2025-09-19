# Supabase Direct Database Management Guide (No Docker)

## Overview

This guide covers the complete workflow for managing your Supabase database directly using the CLI, uploading SQL schemas, and connecting to your database from Next.js using environment variables for seamless development.

## Part 1: Supabase CLI Setup and Configuration

### Step 1: Install Supabase CLI
```bash
# Install globally using npm (already done based on your install)
npm install -g supabase

# Verify installation
supabase --version
```

### Step 2: Login to Supabase
```bash
# Login with your Supabase account
supabase login

# This will open your browser for authentication
# Follow the prompts to authorize the CLI
```

### Step 3: Link to Your Remote Project
```bash
# Initialize supabase in your project directory
supabase init

# Link to your remote Supabase project
supabase link --project-ref nepvfebkqvuqbxthttao

# Your project ref can be found in your Supabase dashboard URL
# Example: https://supabase.com/dashboard/project/nepvfebkqvuqbxthttao
# The project ref would be: nepvfebkqvuqbxthttao
```

## Part 2: Environment Configuration

### Step 2.1: Create .env.local File
Create a `.env.local` file in your project root with the following structure:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nepvfebkqvuqbxthttao.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key

# Database Direct Connection (for CLI operations)
SUPABASE_DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.nepvfebkqvuqbxthttao.supabase.co:5432/postgres
SUPABASE_PROJECT_REF=nepvfebkqvuqbxthttao

# Optional: For local development
SUPABASE_LOCAL_DB_URL=postgresql://postgres:postgres@localhost:54322/postgres
```

### Step 2.2: Get Your Credentials
1. **Go to your Supabase Dashboard** → Settings → API
2. **Copy the following:**
   - Project URL (for `NEXT_PUBLIC_SUPABASE_URL`)
   - `anon public` key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `service_role secret` key (for `SUPABASE_SERVICE_ROLE_KEY`)

3. **Get Database Password:**
   - Go to Settings → Database
   - Copy the connection string or reset the database password
   - Extract the password for the connection URL

### Step 2.3: Secure Environment Variables
Add to your `.gitignore`:
```
.env.local
.env
.env*.local
```

## Part 3: Direct SQL Upload Methods

### Method 1: Using Supabase CLI (Recommended)

#### Step 3.1: Create Migration Files
```bash
# Create a new migration
supabase migration new create_content_platform_schema

# This creates a file in supabase/migrations/
# Example: supabase/migrations/20240101000000_create_content_platform_schema.sql
```

#### Step 3.2: Add Your SQL to Migration File
Edit the generated migration file and add your complete schema:

```sql
-- supabase/migrations/20240101000000_create_content_platform_schema.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Create custom types
CREATE TYPE content_type_enum AS ENUM (
  'blog_post', 'article', 'newsletter', 'book_chapter',
  'video_lesson', 'short_video', 'webinar', 'interview',
  'podcast_episode', 'audio_lesson', 'conference_talk',
  'course_module', 'assessment', 'quiz', 'workshop',
  'infographic', 'presentation', 'social_graphic',
  'forum_post', 'discussion', 'user_story'
);

-- Add all your tables from the implementation plan
-- (Copy the complete schema from COMPLETE_DATABASE_IMPLEMENTATION_PLAN.md)

-- User profiles extending auth.users
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

-- Continue with all tables...
```

#### Step 3.3: Apply Migrations
```bash
# Push migrations to remote database
supabase db push

# Or if you want to apply specific migration
supabase migration up
```

### Method 2: Direct SQL Upload via CLI

#### Step 3.4: Upload SQL File Directly
```bash
# Create a complete schema file
touch database_schema.sql

# Upload directly to your remote database
supabase db reset --linked

# Or execute specific SQL file
psql "$SUPABASE_DB_URL" -f database_schema.sql
```

### Method 3: Using Supabase SQL Editor
1. **Go to Supabase Dashboard** → SQL Editor
2. **Create new query**
3. **Paste your complete schema**
4. **Run the query**

## Part 4: Next.js Database Connection Setup

### Step 4.1: Install Required Dependencies
```bash
# Install Supabase client
npm install @supabase/supabase-js

# Install additional TypeScript types (optional)
npm install -D @types/pg
```

### Step 4.2: Create Supabase Client Configuration

#### Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for browser/client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (use carefully!)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Helper to get current tenant ID from context
export const getCurrentTenantId = (): string => {
  // This would come from your app's context/session
  // Implementation depends on your auth flow
  return 'your-tenant-id'
}
```

### Step 4.3: Generate TypeScript Types from Database

#### Method A: Using Supabase CLI (Recommended)
```bash
# Generate types from your remote database
supabase gen types typescript --linked > src/types/database.types.ts

# Or specify project ID directly
supabase gen types typescript --project-id nepvfebkqvuqbxthttao > src/types/database.types.ts
```

#### Method B: Auto-generate on Schema Changes
Create a script in `package.json`:
```json
{
  "scripts": {
    "generate-types": "supabase gen types typescript --linked > src/types/database.types.ts",
    "db:push": "supabase db push && npm run generate-types"
  }
}
```

### Step 4.4: Create Database Hook for React

#### Create `src/hooks/useDatabase.ts`:
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database.types'

type Content = Database['public']['Tables']['content']['Row']
type ContentInsert = Database['public']['Tables']['content']['Insert']
type ContentUpdate = Database['public']['Tables']['content']['Update']

export const useContent = (tenantId: string) => {
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch content
  const fetchContent = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('content')
        .select(`
          *,
          creator:creator_id(full_name, avatar_url),
          assets:content_assets(
            asset:assets(*)
          )
        `)
        .eq('tenant_id', tenantId)
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) throw error
      setContent(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Real-time subscription
  useEffect(() => {
    fetchContent()

    // Subscribe to changes
    const subscription = supabase
      .channel('content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'content',
        filter: `tenant_id=eq.${tenantId}`
      }, (payload) => {
        console.log('Content changed:', payload)
        fetchContent() // Refetch on changes
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [tenantId])

  // CRUD operations
  const createContent = async (newContent: ContentInsert) => {
    const { data, error } = await supabase
      .from('content')
      .insert([{ ...newContent, tenant_id: tenantId }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateContent = async (id: string, updates: ContentUpdate) => {
    const { data, error } = await supabase
      .from('content')
      .update(updates)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deleteContent = async (id: string) => {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) throw error
  }

  return {
    content,
    loading,
    error,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContent
  }
}
```

### Step 4.5: Schema Extraction and Inspection

#### Create `src/utils/schema-inspector.ts`:
```typescript
import { supabaseAdmin } from '@/lib/supabase'

export interface TableInfo {
  table_name: string
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
}

export interface ForeignKey {
  table_name: string
  column_name: string
  foreign_table_name: string
  foreign_column_name: string
}

// Get all table schemas
export const getTableSchemas = async (): Promise<TableInfo[]> => {
  const { data, error } = await supabaseAdmin
    .from('information_schema.columns')
    .select('table_name, column_name, data_type, is_nullable, column_default')
    .eq('table_schema', 'public')
    .order('table_name')
    .order('ordinal_position')

  if (error) throw error
  return data as TableInfo[]
}

// Get foreign key relationships
export const getForeignKeys = async (): Promise<ForeignKey[]> => {
  const { data, error } = await supabaseAdmin.rpc('get_foreign_keys')

  if (error) throw error
  return data as ForeignKey[]
}

// Get table row counts
export const getTableStats = async () => {
  const tables = ['content', 'assets', 'content_collections', 'tenants', 'user_profiles']
  const stats = {}

  for (const table of tables) {
    try {
      const { count } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact', head: true })
      
      stats[table] = count
    } catch (error) {
      stats[table] = 'Error'
    }
  }

  return stats
}
```

#### Create Helper Function for Foreign Keys:
```sql
-- Add this function to your database via SQL Editor
CREATE OR REPLACE FUNCTION get_foreign_keys()
RETURNS TABLE (
  table_name TEXT,
  column_name TEXT,
  foreign_table_name TEXT,
  foreign_column_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tc.table_name::TEXT,
    kcu.column_name::TEXT,
    ccu.table_name::TEXT AS foreign_table_name,
    ccu.column_name::TEXT AS foreign_column_name
  FROM information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public';
END;
$$ LANGUAGE plpgsql;
```

## Part 5: Development Workflow

### Step 5.1: Database Development Cycle
```bash
# 1. Make schema changes locally
supabase migration new add_new_feature

# 2. Edit the migration file with your SQL changes

# 3. Apply to remote database
supabase db push

# 4. Generate new TypeScript types
npm run generate-types

# 5. Update your React components with new types
```

### Step 5.2: Environment-Specific Workflows

#### Development Environment:
```bash
# Start local Supabase (optional)
supabase start

# Use local database URL in .env.local for testing
SUPABASE_DB_URL=postgresql://postgres:postgres@localhost:54322/postgres
```

#### Production Environment:
```bash
# Always use remote database
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.nepvfebkqvuqbxthttao.supabase.co:5432/postgres
```

### Step 5.3: Database Inspection Commands
```bash
# Connect to database via psql
psql "$SUPABASE_DB_URL"

# List all tables
\dt

# Describe a specific table
\d content

# Check current migrations
supabase migration list

# View migration status
supabase db status
```

## Part 6: Best Practices and Troubleshooting

### Security Best Practices
1. **Never commit `.env.local`** to version control
2. **Use service role key only for server-side operations**
3. **Implement Row Level Security (RLS)** for all tables
4. **Validate all inputs** before database operations

### Performance Optimization
1. **Generate types after schema changes** to maintain type safety
2. **Use indexes** for frequently queried columns
3. **Implement proper pagination** for large datasets
4. **Use real-time subscriptions sparingly** to avoid performance issues

### Common Issues and Solutions

#### Issue: "relation does not exist"
```bash
# Solution: Ensure migrations are applied
supabase db push
```

#### Issue: TypeScript errors after schema changes
```bash
# Solution: Regenerate types
npm run generate-types
```

#### Issue: RLS preventing data access
```sql
-- Solution: Check and update RLS policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

#### Issue: Connection timeout
```bash
# Solution: Check if database is accessible
pg_isready -h db.nepvfebkqvuqbxthttao.supabase.co -p 5432
```

### Useful CLI Commands Reference
```bash
# Database operations
supabase db reset --linked              # Reset remote database
supabase db diff                        # Show pending changes
supabase db lint                        # Lint migration files

# Migration operations
supabase migration list                 # List all migrations
supabase migration repair               # Mark failed migration as applied

# Type generation
supabase gen types typescript --linked  # Generate TypeScript types

# Project operations
supabase projects list                  # List all projects
supabase link --project-ref NEW_REF     # Switch to different project
```

This guide provides a complete workflow for managing your Supabase database directly without Docker, while maintaining type safety and efficient development practices in your Next.js application.