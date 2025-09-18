'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { lmsSupabase } from '@/lib/lms/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // AUTH DISABLED FOR TESTING - Always return mock authenticated user
  const [user] = useState<User | null>({
    id: 'test-user-123',
    email: 'test@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    role: 'authenticated'
  } as User)
  const [loading] = useState(false)

  const signIn = async (email: string, password: string) => {
    // Mock sign in - always succeeds
    console.log('Mock sign in:', email)
  }

  const signUp = async (email: string, password: string) => {
    // Mock sign up - always succeeds
    console.log('Mock sign up:', email)
  }

  const signOut = async () => {
    // Mock sign out - always succeeds
    console.log('Mock sign out')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
