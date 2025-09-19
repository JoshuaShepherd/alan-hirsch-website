'use client'

import { useState, useEffect } from 'react'
import { testConnection, generateDatabaseReport } from '@/utils/schema-inspector'
import { useAuth } from '@/hooks/useDatabase'

interface ConnectionStatus {
  connected: boolean
  user: string | null
  version: string | null
  error?: string
}

interface DatabaseReport {
  summary: {
    totalTables: number
    totalColumns: number
    totalForeignKeys: number
    totalRows: number
    connectionStatus: string
    databaseVersion: string | null
  }
  connectionInfo: ConnectionStatus
  generatedAt: string
}

export default function DatabaseTestComponent() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null)
  const [report, setReport] = useState<DatabaseReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user, signOut } = useAuth()

  const testDatabaseConnection = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('🧪 Testing database connection...')
      const status = await testConnection()
      setConnectionStatus(status)
      
      if (status.connected) {
        console.log('📊 Generating database report...')
        const dbReport = await generateDatabaseReport()
        setReport(dbReport)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Database test failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-test on component mount
    testDatabaseConnection()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Supabase Database Test</h1>
        <p className="text-gray-600">Testing connection and inspecting database status</p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Connection Status</h2>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={testDatabaseConnection}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </button>
          
          {connectionStatus && (
            <div className={`flex items-center gap-2 ${connectionStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-3 h-3 rounded-full ${connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'}`} />
              {connectionStatus.connected ? 'Connected' : 'Disconnected'}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {connectionStatus && (
          <div className="space-y-2 text-sm">
            <div><strong>User:</strong> {connectionStatus.user || 'None'}</div>
            <div><strong>Version:</strong> {connectionStatus.version || 'Unknown'}</div>
            {connectionStatus.error && (
              <div className="text-red-600"><strong>Error:</strong> {connectionStatus.error}</div>
            )}
          </div>
        )}
      </div>

      {/* Auth Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Authentication Status</h2>
        
        <div className="space-y-2 text-sm">
          <div><strong>Current User:</strong> {user?.email || 'Not authenticated'}</div>
          <div><strong>User ID:</strong> {user?.id || 'None'}</div>
          <div><strong>Auth Status:</strong> {user ? 'Authenticated' : 'Anonymous'}</div>
        </div>
        
        {user && (
          <button
            onClick={signOut}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Database Report */}
      {report && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Database Report</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{report.summary.totalTables}</div>
              <div className="text-sm text-gray-600">Tables</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{report.summary.totalColumns}</div>
              <div className="text-sm text-gray-600">Columns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{report.summary.totalForeignKeys}</div>
              <div className="text-sm text-gray-600">Relations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{report.summary.totalRows}</div>
              <div className="text-sm text-gray-600">Total Rows</div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div><strong>Status:</strong> {report.summary.connectionStatus}</div>
            <div><strong>Database Version:</strong> {report.summary.databaseVersion}</div>
            <div><strong>Generated:</strong> {new Date(report.generatedAt).toLocaleString()}</div>
          </div>

          {report.summary.totalTables === 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              <p><strong>Empty Database:</strong> No custom tables found. This is normal for a new Supabase project.</p>
              <p className="mt-2 text-sm">To get started:</p>
              <ul className="mt-1 text-sm list-disc list-inside">
                <li>Create tables using the Supabase Dashboard</li>
                <li>Run migrations with <code className="bg-blue-100 px-1 rounded">npm run db:migrate</code></li>
                <li>Generate types with <code className="bg-blue-100 px-1 rounded">npm run db:types</code></li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}