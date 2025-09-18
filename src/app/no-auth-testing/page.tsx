'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Settings,
  Database,
  TestTube,
  Home,
  ExternalLink,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function NoAuthTestingPage() {
  const testPages = [
    {
      title: 'Main Homepage',
      url: '/',
      icon: Home,
      desc: 'Main site homepage'
    },
    {
      title: 'LMS Landing',
      url: '/lms',
      icon: BookOpen,
      desc: 'LMS main page'
    },
    {
      title: 'Movemental Dashboard',
      url: '/lms/movemental/dashboard',
      icon: Settings,
      desc: 'Full movemental dashboard'
    },
    {
      title: 'Simple LMS Dashboard',
      url: '/lms-simple',
      icon: TestTube,
      desc: 'Simplified test dashboard'
    },
    {
      title: 'Course Creation',
      url: '/lms/courses/new',
      icon: BookOpen,
      desc: 'Create new courses'
    },
    {
      title: 'Movemental Course',
      url: '/lms/movemental/course',
      icon: Users,
      desc: 'Movemental course page'
    },
    {
      title: 'Test Setup',
      url: '/test-setup',
      icon: TestTube,
      desc: 'One-click test setup'
    },
    {
      title: 'Admin Panel',
      url: '/admin/test-users',
      icon: Users,
      desc: 'User management'
    },
    {
      title: 'Diagnostics',
      url: '/diagnostic',
      icon: Database,
      desc: 'System health checks'
    }
  ]

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-foreground">🎉 Auth Disabled - Free Roaming Mode</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Authentication has been completely disabled. You can now access any page without barriers!
          </p>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ What's Been Disabled:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• ProtectedRoute components - Always allow access</li>
              <li>• AuthProvider - Returns mock authenticated user</li>
              <li>• Database auth checks - Bypassed with mock data</li>
              <li>• Organization requirements - Mock organization provided</li>
            </ul>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testPages.map((page, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <page.icon className="h-5 w-5 text-primary" />
                  {page.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{page.desc}</p>
                <Link 
                  href={page.url}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 group-hover:gap-3 transition-all"
                >
                  Visit Page
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">How to Test Everything:</h3>
                <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                  <li>Click any page above - no login required</li>
                  <li>All forms and functionality should work</li>
                  <li>Mock user data is automatically provided</li>
                  <li>Database errors are bypassed with fallbacks</li>
                  <li>Check browser console for any remaining errors</li>
                </ol>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Development Mode Active:</h3>
                <p className="text-sm text-yellow-700">
                  This is a temporary testing setup. All authentication and security is disabled. 
                  Do not deploy this configuration to production.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
