'use client'

import { useState } from 'react'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

const TEST_USERS = [
  {
    email: 'test@alanhirsch.com',
    password: 'TestUser123!',
    name: 'Alan Test User',
    role: 'Owner'
  },
  {
    email: 'facilitator@alanhirsch.com', 
    password: 'Facilitator123!',
    name: 'Sarah Facilitator',
    role: 'Facilitator'
  },
  {
    email: 'leader@alanhirsch.com',
    password: 'Leader123!', 
    name: 'John Leader',
    role: 'Leader'
  },
  {
    email: 'participant@alanhirsch.com',
    password: 'Participant123!',
    name: 'Maria Participant', 
    role: 'Participant'
  },
  {
    email: 'admin@alanhirsch.com',
    password: 'Admin123!',
    name: 'Admin User',
    role: 'Global Admin'
  }
]

export default function DevSignIn() {
  const [selectedUser, setSelectedUser] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQuickSignIn = async (userEmail: string) => {
    const user = TEST_USERS.find(u => u.email === userEmail)
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to dashboard
        window.location.href = '/lms/dashboard'
      } else {
        alert(`Sign in failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Development Sign In
          </h1>
          <p className="text-foreground/70">
            Quick access to test accounts for development
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Quick Sign In Options
            </h2>
            
            {TEST_USERS.map((user) => (
              <button
                key={user.email}
                onClick={() => handleQuickSignIn(user.email)}
                disabled={loading}
                className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-card-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.role}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-md font-medium text-card-foreground mb-3">
              Manual Sign In
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = formData.get('email') as string
              const password = formData.get('password') as string
              
              setLoading(true)
              try {
                const response = await fetch('/api/auth/signin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password }),
                })

                const result = await response.json()

                if (response.ok) {
                  window.location.href = '/lms/dashboard'
                } else {
                  alert(`Sign in failed: ${result.error}`)
                }
              } catch (error) {
                console.error('Sign in error:', error)
                alert('An error occurred during sign in')
              } finally {
                setLoading(false)
              }
            }} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-foreground/60">
            Need to create test users?{' '}
            <a 
              href="/admin/test-users" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Visit Admin Panel
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
