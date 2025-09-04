'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignIn() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  
  const handleSubmit = (data: {
    email: string
    password: string
    name?: string
    confirmPassword?: string
  }) => {
    // Handle form submission here
    console.log('Form submitted:', data)
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
