import { NextRequest, NextResponse } from 'next/server'
import { lmsSupabase } from '@/lib/lms/supabase'
import { createClient } from '@supabase/supabase-js'

// Admin client for user management (requires service role key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Test user data
const TEST_USERS = [
  {
    email: 'test@alanhirsch.com',
    password: 'TestUser123!',
    name: 'Alan Test User',
    role: 'owner' as const,
    orgName: 'Test Organization',
    apest_primary: 'apostolic' as const
  },
  {
    email: 'facilitator@alanhirsch.com', 
    password: 'Facilitator123!',
    name: 'Sarah Facilitator',
    role: 'facilitator' as const,
    orgName: 'Test Organization',
    apest_primary: 'shepherding' as const
  },
  {
    email: 'leader@alanhirsch.com',
    password: 'Leader123!', 
    name: 'John Leader',
    role: 'leader' as const,
    orgName: 'Test Organization',
    apest_primary: 'teaching' as const
  },
  {
    email: 'participant@alanhirsch.com',
    password: 'Participant123!',
    name: 'Maria Participant', 
    role: 'participant' as const,
    orgName: 'Test Organization',
    apest_primary: 'evangelistic' as const
  },
  {
    email: 'admin@alanhirsch.com',
    password: 'Admin123!',
    name: 'Admin User',
    role: 'owner' as const,
    orgName: 'Alan Hirsch Global',
    apest_primary: 'prophetic' as const
  }
]

export async function POST() {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Test users can only be created in development mode' },
        { status: 403 }
      )
    }

    // Check for service role key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Service role key not configured' },
        { status: 500 }
      )
    }

    const results = []

    for (const userData of TEST_USERS) {
      try {
        // Create user in Supabase Auth
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true,
          user_metadata: {
            name: userData.name,
            role: userData.role
          }
        })

        let userId: string
        if (authError) {
          // User might already exist, try to get existing user
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
          const existingUser = existingUsers.users.find(u => u.email === userData.email)
          
          if (existingUser) {
            console.log(`User ${userData.email} already exists, updating profile...`)
            userId = existingUser.id
          } else {
            results.push({
              email: userData.email,
              success: false,
              error: authError.message
            })
            continue
          }
        } else {
          userId = authUser.user?.id || ''
        }

        // const userId = authUser.user?.id
        if (!userId) {
          results.push({
            email: userData.email,
            success: false,
            error: 'Failed to get user ID'
          })
          continue
        }

        // Create or get organization
        let orgId: string
        const { data: existingOrg } = await lmsSupabase
          .schema('lms')
          .from('organizations')
          .select('id')
          .eq('name', userData.orgName)
          .single()

        if (existingOrg) {
          orgId = existingOrg.id
        } else {
          const { data: newOrg, error: orgError } = await lmsSupabase
            .schema('lms')
            .from('organizations')
            .insert({
              name: userData.orgName,
              slug: userData.orgName.toLowerCase().replace(/\s+/g, '-'),
              metadata: {},
              theme_json: {}
            })
            .select('id')
            .single()

          if (orgError || !newOrg) {
            results.push({
              email: userData.email,
              success: false,
              error: 'Failed to create organization'
            })
            continue
          }
          orgId = newOrg.id
        }

        // Create user profile
        const { error: profileError } = await lmsSupabase
          .schema('lms')
          .from('user_profiles')
          .upsert({
            user_id: userId,
            org_id: orgId,
            role: userData.role,
            apest_primary: userData.apest_primary,
            bio: `Test ${userData.role} user for development and testing`,
            timezone: 'America/Los_Angeles',
            preferences_json: {
              notifications: true,
              theme: 'light',
              language: 'en'
            },
            profile_json: {
              interests: ['Missional Church', 'Leadership Development', 'Movement Building'],
              experience: userData.role === 'participant' ? 'beginner' : 'intermediate'
            }
          })

        if (profileError) {
          results.push({
            email: userData.email,
            success: false,
            error: `Profile creation failed: ${profileError.message}`
          })
          continue
        }

        results.push({
          email: userData.email,
          name: userData.name,
          role: userData.role,
          organization: userData.orgName,
          success: true,
          userId: userId,
          password: userData.password // Include password for testing purposes
        })

      } catch (error) {
        results.push({
          email: userData.email,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      message: 'Test user creation completed',
      results,
      totalUsers: results.length,
      successfulUsers: results.filter(r => r.success).length,
      failedUsers: results.filter(r => !r.success).length
    })

  } catch (error) {
    console.error('Error creating test users:', error)
    return NextResponse.json(
      { error: 'Failed to create test users' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // List existing test users
    const { data: profiles } = await lmsSupabase
      .schema('lms')
      .from('user_profiles')
      .select(`
        user_id,
        role,
        apest_primary,
        bio,
        organizations(name)
      `)
      .ilike('bio', '%test%')

    const userIds = profiles?.map(p => p.user_id) || []
    
    if (userIds.length === 0) {
      return NextResponse.json({
        message: 'No test users found',
        users: []
      })
    }

    // Get auth user details
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()
    const testUsers = authUsers.users
      .filter(u => userIds.includes(u.id))
      .map(u => {
        const profile = profiles?.find(p => p.user_id === u.id)
        return {
          id: u.id,
          email: u.email,
          name: u.user_metadata?.name,
          role: profile?.role,
          organization: (profile?.organizations as any)?.name,
          apest_primary: profile?.apest_primary,
          created_at: u.created_at
        }
      })

    return NextResponse.json({
      message: 'Test users found',
      users: testUsers,
      count: testUsers.length
    })

  } catch (error) {
    console.error('Error fetching test users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test users' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    // Delete all test users (development only)
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Test users can only be deleted in development mode' },
        { status: 403 }
      )
    }

    // Get test user profiles
    const { data: profiles } = await lmsSupabase
      .schema('lms')
      .from('user_profiles')
      .select('user_id')
      .ilike('bio', '%test%')

    const userIds = profiles?.map(p => p.user_id) || []
    
    // Delete user profiles
    await lmsSupabase
      .schema('lms')
      .from('user_profiles')
      .delete()
      .in('user_id', userIds)

    // Delete auth users
    for (const userId of userIds) {
      await supabaseAdmin.auth.admin.deleteUser(userId)
    }

    return NextResponse.json({
      message: 'Test users deleted successfully',
      deletedCount: userIds.length
    })

  } catch (error) {
    console.error('Error deleting test users:', error)
    return NextResponse.json(
      { error: 'Failed to delete test users' },
      { status: 500 }
    )
  }
}
