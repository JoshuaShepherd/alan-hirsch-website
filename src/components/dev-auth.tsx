// Development-only auth bypass for testing
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface DevUser {
  id: string
  email: string
  name: string
  role: string
}

interface DevAuthContextType {
  user: DevUser | null
  signIn: (email: string) => void
  signOut: () => void
  isLoading: boolean
}

const DevAuthContext = createContext<DevAuthContextType | null>(null)

const DEV_USERS: DevUser[] = [
  {
    id: 'dev-user-1',
    email: 'test@alanhirsch.com',
    name: 'Alan Test User',
    role: 'owner'
  },
  {
    id: 'dev-user-2', 
    email: 'facilitator@alanhirsch.com',
    name: 'Sarah Facilitator',
    role: 'facilitator'
  }
]

export function DevAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DevUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dev-auth-user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = (email: string) => {
    const foundUser = DEV_USERS.find(u => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('dev-auth-user', JSON.stringify(foundUser))
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('dev-auth-user')
  }

  return (
    <DevAuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </DevAuthContext.Provider>
  )
}

export function useDevAuth() {
  const context = useContext(DevAuthContext)
  if (!context) {
    throw new Error('useDevAuth must be used within DevAuthProvider')
  }
  return context
}

// Development auth guard component
export function DevAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signIn } = useDevAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  }

  if (!user && process.env.NODE_ENV === 'development') {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="max-w-md w-full bg-card border border-border rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Development Sign In</h2>
          <p className="text-muted-foreground mb-6">
            Choose a development user to continue:
          </p>
          <div className="space-y-2">
            {DEV_USERS.map(devUser => (
              <button
                key={devUser.id}
                onClick={() => signIn(devUser.email)}
                className="w-full p-3 text-left border border-border rounded hover:bg-muted transition-colors"
              >
                <div className="font-medium">{devUser.name}</div>
                <div className="text-sm text-muted-foreground">{devUser.email} ({devUser.role})</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
