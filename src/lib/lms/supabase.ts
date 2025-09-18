import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/movemental-lms'

// Create a Supabase client specifically for LMS operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const lmsSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper function to get the current user's organization IDs
export async function getCurrentUserOrgIds(userId: string): Promise<string[]> {
  const { data: profiles } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select('org_id')
    .eq('user_id', userId)
  
  return profiles?.map(p => p.org_id).filter(Boolean) as string[] || []
}

// Helper function to check if user has edit access (owner/facilitator/leader)
export async function hasEditAccess(userId: string, orgId?: string): Promise<boolean> {
  if (!orgId) return false
  
  const { data: profile } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()
  
  return profile?.role ? ['owner', 'facilitator', 'leader'].includes(profile.role) : false
}

// Helper function to check if user has admin access (owner/facilitator)
export async function hasAdminAccess(userId: string, orgId?: string): Promise<boolean> {
  if (!orgId) return false
  
  const { data: profile } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()
  
  return profile?.role ? ['owner', 'facilitator'].includes(profile.role) : false
}

// Helper function to get user's role in organization
export async function getUserOrgRole(userId: string, orgId: string): Promise<string | null> {
  const { data: profile } = await lmsSupabase
    .schema('lms')
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()

  return profile?.role || null
}

export type { Database } from '@/types/supabase.lms'
