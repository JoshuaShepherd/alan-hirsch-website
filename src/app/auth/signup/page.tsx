'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

const metadata: Metadata = {
  title: 'Sign Up - Alan Hirsch',
  description: 'Create your account to access exclusive content and join the missional movement.',
  keywords: ['signup', 'register', 'account', 'membership', 'missional church'],
}

export default function SignUp() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  
  const handleSubmit = async (data: {
    email: string
    password: string
    name?: string
    confirmPassword?: string
  }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to dashboard or home page
        window.location.href = '/lms/dashboard'
      } else {
        console.error('Sign up failed:', result.error)
        alert(result.error || 'Sign up failed')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      alert('An error occurred during sign up')
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Join the Movement
          </h1>
          <p className="text-foreground/70">
            Create your account to start your learning journey
          </p>
        </div>

        <AuthForm 
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleSubmit}
        />

        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/60">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
          
          <div className="text-xs text-foreground/50 space-y-2">
            <p>
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:no-underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:no-underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
