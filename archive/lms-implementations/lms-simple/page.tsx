'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Users, 
  TrendingUp,
  Plus,
  Settings,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Mock data for development
const MOCK_COURSES = [
  {
    id: '1',
    title: 'The Forgotten Ways: Introduction',
    status: 'published',
    summary: 'Discover the original ways of the early church',
    price_cents: 14900,
    created_at: '2025-01-01'
  },
  {
    id: '2',
    title: '5Q Leadership Mastery',
    status: 'draft',
    summary: 'Master the five leadership intelligences',
    price_cents: 19900,
    created_at: '2025-01-15'
  }
]

const MOCK_STATS = {
  totalCourses: 3,
  publishedCourses: 1,
  totalStudents: 127,
  revenue: 4750
}

export default function SimpleDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">LMS Dashboard</h1>
              <p className="text-muted-foreground">Manage your courses and content</p>
            </div>
            <div className="flex gap-3">
              <Link href="/diagnostic" className="btn-outline">
                🔧 Diagnostics
              </Link>
              <Link href="/admin/test-users" className="btn-outline">
                👥 Admin Panel
              </Link>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.totalCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.publishedCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${MOCK_STATS.revenue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_COURSES.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                    <span className="text-sm font-medium">
                      ${(course.price_cents / 100).toFixed(0)}
                    </span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Message */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">🚧 Development Mode</h3>
          <p className="text-yellow-700 mb-4">
            This is a simplified dashboard for development testing. The full LMS functionality requires:
          </p>
          <ul className="text-sm text-yellow-700 space-y-1 mb-4">
            <li>• Test users with proper organizations</li>
            <li>• Sample course content</li>
            <li>• Working authentication system</li>
            <li>• Database connections</li>
          </ul>
          <div className="flex gap-3">
            <Link href="/diagnostic" className="btn-outline text-sm">
              Run Diagnostics
            </Link>
            <Link href="/admin/test-users" className="btn-primary text-sm">
              Setup Test Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
