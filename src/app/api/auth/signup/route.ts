import { NextRequest, NextResponse } from 'next/server'
import { lmsSupabase } from '@/lib/lms/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Sign up with Supabase
    const { data, error } = await lmsSupabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          name: name.trim(),
        }
      }
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 400 }
      )
    }

    // Create default user profile
    const { error: profileError } = await lmsSupabase
      .schema('lms')
      .from('user_profiles')
      .insert({
        user_id: data.user.id,
        role: 'participant',
        timezone: 'America/Los_Angeles',
        preferences_json: {
          notifications: true,
          theme: 'light',
          language: 'en'
        },
        profile_json: {
          interests: [],
          experience: 'beginner'
        }
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Continue anyway - profile can be created later
    }

    // Create response
    const response = NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: 'participant',
      },
      session: data.session ? {
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,
      } : null,
    })

    // Set cookies for session management if session exists
    if (data.session) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }

    return response

  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'An error occurred during sign up' },
      { status: 500 }
    )
  }
}
