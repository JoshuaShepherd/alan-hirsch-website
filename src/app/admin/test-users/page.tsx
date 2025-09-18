'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Trash2, RefreshCw, Eye, EyeOff } from 'lucide-react'

interface TestUser {
  id?: string
  email: string
  name: string
  role: string
  organization: string
  apest_primary?: string
  password?: string
  success?: boolean
  error?: string
  created_at?: string
  userId?: string
}

export default function TestUsersAdmin() {
  const [users, setUsers] = useState<TestUser[]>([])
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/test-users')
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTestUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/test-users', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (response.ok) {
        alert(`Created ${data.successfulUsers} users successfully!`)
        fetchUsers()
      } else {
        alert(`Failed to create users: ${data.error}`)
      }
    } catch (error) {
      console.error('Failed to create users:', error)
      alert('Failed to create test users')
    } finally {
      setLoading(false)
    }
  }

  const createSampleContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/sample-content', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (response.ok) {
        alert(`Created ${data.successfulItems} content items successfully!`)
      } else {
        alert(`Failed to create content: ${data.error}`)
      }
    } catch (error) {
      console.error('Failed to create content:', error)
      alert('Failed to create sample content')
    } finally {
      setLoading(false)
    }
  }

  const deleteTestUsers = async () => {
    if (!confirm('Are you sure you want to delete all test users?')) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/auth/test-users', {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (response.ok) {
        alert(`Deleted ${data.deletedCount} users successfully!`)
        fetchUsers()
      } else {
        alert(`Failed to delete users: ${data.error}`)
      }
    } catch (error) {
      console.error('Failed to delete users:', error)
      alert('Failed to delete test users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const testAccounts = [
    { email: 'test@alanhirsch.com', password: 'TestUser123!', role: 'Owner/Admin', access: 'Full platform access' },
    { email: 'facilitator@alanhirsch.com', password: 'Facilitator123!', role: 'Facilitator', access: 'Course management & cohorts' },
    { email: 'leader@alanhirsch.com', password: 'Leader123!', role: 'Leader', access: 'Content creation & groups' },
    { email: 'participant@alanhirsch.com', password: 'Participant123!', role: 'Participant', access: 'Learning content & courses' },
    { email: 'admin@alanhirsch.com', password: 'Admin123!', role: 'Global Admin', access: 'All administrative functions' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Test User Management
          </h1>
          <p className="text-foreground/70">
            Create and manage test accounts for development and testing
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="btn-outline flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={createSampleContent}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Sample Content
          </button>
          <button
            onClick={createTestUsers}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Test Users
          </button>
          {users.length > 0 && (
            <button
              onClick={deleteTestUsers}
              disabled={loading}
              className="btn-destructive flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </button>
          )}
        </div>
      </div>

      {/* Test Account Information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-blue-900 dark:text-blue-100">
            Available Test Accounts
          </h2>
          <button
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testAccounts.map((account, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">
                {account.email}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {showPasswords ? account.password : '••••••••••••'}
              </div>
              <div className="text-xs">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {account.role}
                </span>
                <br />
                <span className="text-gray-500 dark:text-gray-400">
                  {account.access}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Users */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="font-semibold">Current Test Users ({users.length})</h2>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-4" />
            <p className="text-foreground/70">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
            <p className="text-foreground/70 mb-4">No test users found</p>
            <button
              onClick={createTestUsers}
              className="btn-primary"
            >
              Create Test Users
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Organization</th>
                  <th className="text-left p-4 font-medium">APEST</th>
                  <th className="text-left p-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index} className="border-b border-border">
                    <td className="p-4 font-mono text-sm">{user.email}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'owner' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        user.role === 'facilitator' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        user.role === 'leader' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">{user.organization}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded text-xs font-medium">
                        {user.apest_primary}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-foreground/70">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">How to Use Test Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">1. Sign In Process</h4>
            <ul className="space-y-1 text-foreground/70">
              <li>• Go to <a href="/auth/login" className="text-primary hover:underline">/auth/login</a></li>
              <li>• Use any test account email and password</li>
              <li>• You'll be redirected to the LMS dashboard</li>
              <li>• Access level depends on user role</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Role Permissions</h4>
            <ul className="space-y-1 text-foreground/70">
              <li>• <strong>Owner:</strong> Full admin access, can create organizations</li>
              <li>• <strong>Facilitator:</strong> Course management, cohort facilitation</li>
              <li>• <strong>Leader:</strong> Content creation, group leadership</li>
              <li>• <strong>Participant:</strong> Learning content access only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
