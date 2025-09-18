'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  BookOpen, 
  Users, 
  Settings, 
  Loader2, 
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/lms/auth/ProtectedRoute'
import { useAuth } from '@/components/lms/auth/AuthProvider'
import { getTenantByUserId, getCoursesByTenantId } from '@/lib/lms/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TenantData {
  id: string
  name: string
  slug: string
  created_at?: string
}

interface CourseData {
  id: string
  title: string
  summary: string | null
  status: 'draft' | 'review' | 'published'
  slug: string
  price_cents: number | null
  featured_media: string | null
  created_at: string
  published_at: string | null
  _count?: {
    modules: number
    enrollments: number
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [tenant, setTenant] = useState<TenantData | null>(null)
  const [courses, setCourses] = useState<CourseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        // Load tenant data
        const tenantData = await getTenantByUserId(user.id)
        if (!tenantData) {
          router.push('/lms/setup')
          return
        }
        setTenant(tenantData)

        // Load courses for this tenant
        const coursesData = await getCoursesByTenantId(tenantData.id)
        // Ensure the data matches our CourseData interface
        const formattedCourses = (coursesData || []).map(course => ({
          ...course,
          featured_media: (course as any).featured_media || null,
          published_at: (course as any).published_at || null
        }))
        setCourses(formattedCourses as CourseData[])
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [user, router])

  const getStatusColor = (status: CourseData['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500'
      case 'review':
        return 'bg-yellow-500'
      case 'draft':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatPrice = (cents: number | null) => {
    if (!cents || cents === 0) return 'Free'
    return `$${(cents / 100).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">LMS Dashboard</h1>
                {tenant && (
                  <p className="text-muted-foreground">{tenant.name}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Link href="/lms/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {courses.filter(c => c.status === 'published').length} published
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Draft Courses</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courses.filter(c => c.status === 'draft').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Need completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courses.reduce((acc, course) => acc + (course._count?.enrollments || 0), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active learners
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${courses.reduce((acc, course) => {
                    const enrollments = course._count?.enrollments || 0
                    const price = course.price_cents || 0
                    return acc + (enrollments * price / 100)
                  }, 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total earned
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Courses Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <Link href="/lms/courses/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </Link>
              </div>

              {courses.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Get started by creating your first course
                      </p>
                      <Link href="/lms/courses/new">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Course
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{course.title}</h3>
                              <Badge 
                                variant="secondary" 
                                className={`${getStatusColor(course.status)} text-white`}
                              >
                                {course.status}
                              </Badge>
                            </div>
                            
                            {course.summary && (
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {course.summary}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Created {formatDate(course.created_at)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {formatPrice(course.price_cents)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {course._count?.enrollments || 0} enrolled
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {course._count?.modules || 0} modules
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {course.status === 'published' && (
                              <Link href={`/lms/learn/${course.slug}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                            )}
                            
                            <Link href={`/lms/courses/${course.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/lms/courses/${course.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Course Overview
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <TrendingUp className="h-4 w-4 mr-2" />
                                  Analytics
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/lms/courses/new" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Course
                    </Button>
                  </Link>
                  
                  <Link href="/lms/settings" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Organization Settings
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                    <Badge variant="secondary" className="ml-auto">Soon</Badge>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                </CardContent>
              </Card>

              {/* Getting Started */}
              {courses.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-medium">1. Create your first course</h4>
                      <p className="text-sm text-muted-foreground">
                        Start building your content with our course creator
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">2. Add modules and lessons</h4>
                      <p className="text-sm text-muted-foreground">
                        Structure your content into digestible sections
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">3. Publish and share</h4>
                      <p className="text-sm text-muted-foreground">
                        Make your course available to learners
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
