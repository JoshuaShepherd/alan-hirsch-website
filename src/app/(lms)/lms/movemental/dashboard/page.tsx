'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  DollarSign,
  Target,
  Zap,
  Network,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/lms/auth/ProtectedRoute'
import { useAuth } from '@/components/lms/auth/AuthProvider'
import { getOrganizationByUserId } from '@/lib/lms/movemental-actions'
import { seedCompleteMovementalCourse } from '@/lib/lms/movemental-course-seeder'
import { getMovementalCourseStructure } from '@/lib/lms/movemental-course-structure'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface OrganizationData {
  id: string
  name: string
  slug: string
  region?: string
  created_at?: string
}

interface MovementalMetrics {
  totalCohorts: number
  activeLearners: number
  experimentsRunning: number
  mDNAScore: number
  apestBalance: number
  practiceAdoption: number
  multiplicationNodes: number
}

export default function MovementalDashboard() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [organization, setOrganization] = useState<OrganizationData | null>(null)
  const [metrics, setMetrics] = useState<MovementalMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const courseStructure = getMovementalCourseStructure()

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        // AUTH DISABLED - Use mock organization data
        setOrganization({
          id: 'mock-org-123',
          name: 'Test Organization',
          slug: 'test-org',
          region: 'global',
          created_at: new Date().toISOString()
        })

        // Load mock movemental metrics for now
        setMetrics({
          totalCohorts: 3,
          activeLearners: 47,
          experimentsRunning: 23,
          mDNAScore: 7.2,
          apestBalance: 68,
          practiceAdoption: 82,
          multiplicationNodes: 12
        })

      } catch (err) {
        console.error('Failed to load dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [user, router])

  const handleSeedCourse = async () => {
    // SEEDING DISABLED FOR TESTING - Mock success
    setIsSeeding(true)
    console.log('Mock: Course seeding completed successfully')
    setTimeout(() => {
      setIsSeeding(false)
      // Show success without refresh
    }, 1000)
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading movemental dashboard...</p>
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Movemental Dashboard
                </h1>
                {organization && (
                  <p className="text-muted-foreground">
                    {organization.name} • {organization.region || 'Global Network'}
                  </p>
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
          {/* Hero Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-lime-500/10 to-orange-500/10 rounded-2xl p-8 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    From Institution to Movement
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Transform your network through movemental thinking. Operationalize mDNA, 
                    APEST, and organic systems at scale.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleSeedCourse} 
                      disabled={isSeeding}
                      className="bg-lime-500 hover:bg-lime-600 text-black"
                    >
                      {isSeeding ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Course...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Launch Movemental Course
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Course Preview
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white/50 border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-lime-600">10</div>
                      <div className="text-sm text-muted-foreground">Modules</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">40</div>
                      <div className="text-sm text-muted-foreground">Lessons</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">16</div>
                      <div className="text-sm text-muted-foreground">Weeks</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">Cohort</div>
                      <div className="text-sm text-muted-foreground">Based</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Movemental Scorecard */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-lime-500/10 to-lime-500/5 border-lime-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">mDNA Score</CardTitle>
                  <Zap className="h-4 w-4 text-lime-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-lime-700">
                    {metrics.mDNAScore}/10
                  </div>
                  <Progress value={metrics.mDNAScore * 10} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Movement DNA health
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">APEST Balance</CardTitle>
                  <Target className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">
                    {metrics.apestBalance}%
                  </div>
                  <Progress value={metrics.apestBalance} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Fivefold functionality
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Experiments</CardTitle>
                  <Activity className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-700">
                    {metrics.experimentsRunning}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    90-day learning cycles
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Multiplication</CardTitle>
                  <Network className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">
                    {metrics.multiplicationNodes}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Active nodes
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="course" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="course">Course Overview</TabsTrigger>
              <TabsTrigger value="cohorts">Active Cohorts</TabsTrigger>
              <TabsTrigger value="experiments">Experiments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="course" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Movemental Thinking Course Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {courseStructure.modules.map((module) => (
                      <Card key={module.order} className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">
                                Module {module.order}: {module.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {module.summary}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {module.lessonCount} lessons
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {module.lessons.map((lesson) => (
                              <div 
                                key={lesson.slug}
                                className="flex items-center justify-between p-2 rounded bg-background/50"
                              >
                                <span className="text-sm">{lesson.title}</span>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration}min
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cohorts" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Cohorts</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Launch New Cohort
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No active cohorts</h3>
                    <p className="mb-4">
                      Launch your first movemental cohort to begin transformation
                    </p>
                    <Button>Start Your First Cohort</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experiments" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>90-Day Experiments</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Launch Experiment
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No experiments running</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Practice Adoption
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Life Transformation Groups</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Discovery Bible Study</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Oikos Mapping</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Multiplication Tree
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Network className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Multiplication tree visualization</p>
                      <p className="text-xs">Coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
