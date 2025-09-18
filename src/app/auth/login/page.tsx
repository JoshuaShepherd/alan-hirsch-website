'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignIn() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  
  const handleSubmit = async (data: {
    email: string
    password: string
    name?: string
    confirmPassword?: string
  }) => {
    try {
      const response = await fetch('/api/auth/signin', {
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
        console.error('Sign in failed:', result.error)
        alert(result.error || 'Sign in failed')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('An error occurred during sign in')
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-foreground/70">
            Sign in to your account to continue learning
          </p>
        </div>

        <AuthForm 
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleSubmit}
        />

        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/60">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
          
          <div className="text-xs text-foreground/50">
            <Link 
              href="/auth/forgot-password" 
              className="underline hover:no-underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
