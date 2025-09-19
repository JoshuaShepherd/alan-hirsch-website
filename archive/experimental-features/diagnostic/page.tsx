'use client'

import { useEffect, useState } from 'react'
import { User, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

interface TestResult {
  test: string
  status: 'pass' | 'fail' | 'pending'
  message: string
  details?: string
}

export default function DiagnosticPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    const tests: TestResult[] = []

    // Test 1: Check if test users exist
    try {
      const response = await fetch('/api/auth/test-users')
      const data = await response.json()
      
      if (response.ok && data.users?.length > 0) {
        tests.push({
          test: 'Test Users Exist',
          status: 'pass',
          message: `Found ${data.users.length} test users`,
          details: data.users.map((u: any) => `${u.email} (${u.role})`).join(', ')
        })
      } else {
        tests.push({
          test: 'Test Users Exist',
          status: 'fail',
          message: 'No test users found',
          details: 'Run: Create Test Users from admin panel'
        })
      }
    } catch (error) {
      tests.push({
        test: 'Test Users Exist',
        status: 'fail',
        message: 'Failed to check test users',
        details: `Error: ${error}`
      })
    }

    // Test 2: Check if sample content exists
    try {
      const response = await fetch('/api/admin/sample-content')
      const data = await response.json()
      
      if (response.ok && data.courses?.length > 0) {
        tests.push({
          test: 'Sample Content Exists',
          status: 'pass',
          message: `Found ${data.courses.length} sample courses`,
          details: data.courses.map((c: any) => c.title).join(', ')
        })
      } else {
        tests.push({
          test: 'Sample Content Exists',
          status: 'fail',
          message: 'No sample content found',
          details: 'Run: Create Sample Content from admin panel'
        })
      }
    } catch (error) {
      tests.push({
        test: 'Sample Content Exists',
        status: 'fail',
        message: 'Failed to check sample content',
        details: `Error: ${error}`
      })
    }

    // Test 3: Try signing in with test user
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@alanhirsch.com',
          password: 'TestUser123!'
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        tests.push({
          test: 'Authentication Works',
          status: 'pass',
          message: 'Successfully signed in test user',
          details: `User: ${data.user?.email} (${data.user?.role})`
        })
      } else {
        tests.push({
          test: 'Authentication Works',
          status: 'fail',
          message: 'Failed to sign in test user',
          details: data.error
        })
      }
    } catch (error) {
      tests.push({
        test: 'Authentication Works',
        status: 'fail',
        message: 'Authentication endpoint error',
        details: `Error: ${error}`
      })
    }

    setResults(tests)
    setLoading(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'fail':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'pending':
        return <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
    }
  }

  return (
    <div className="min-h-screen bg-page py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            🔧 System Diagnostics
          </h1>
          <p className="text-foreground/70">
            Checking what needs to be fixed to get the LMS working
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Running diagnostics...</p>
              </div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{result.test}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
                    {result.details && (
                      <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted p-2 rounded">
                        {result.details}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-card-foreground mb-4">🛠️ Quick Fixes</h2>
            <div className="space-y-3">
              <a 
                href="/admin/test-users" 
                className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted transition-colors"
              >
                <span>Create Test Users & Content</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href="/dev-signin" 
                className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted transition-colors"
              >
                <span>Development Sign In</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href="/lms/dashboard" 
                className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted transition-colors"
              >
                <span>Test LMS Dashboard</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-card-foreground mb-4">📋 Manual Steps</h2>
            <ol className="text-sm space-y-2 text-muted-foreground">
              <li><strong>1.</strong> Create test users from admin panel</li>
              <li><strong>2.</strong> Create sample content (courses)</li>
              <li><strong>3.</strong> Sign in using dev signin page</li>
              <li><strong>4.</strong> Test LMS dashboard functionality</li>
              <li><strong>5.</strong> Check browser console for errors</li>
            </ol>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={runDiagnostics}
            disabled={loading}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            Re-run Diagnostics
          </button>
        </div>
      </div>
    </div>
  )
}
