'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Target, 
  Zap,
  Network,
  Activity,
  TrendingUp,
  ChevronRight,
  Play,
  Star,
  Award,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function LMSLandingPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'courses' | 'features'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-lime-100 text-lime-800">
                  Now Available
                </Badge>
                <Badge variant="outline">
                  Cohort-Based Learning
                </Badge>
              </div>
              <h1 className="text-display-xl font-display font-bold mb-6">
                Transform Networks Into 
                <span className="text-gradient bg-gradient-to-r from-lime-600 to-orange-600"> Movements</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Master movemental thinking through Alan Hirsch's advanced course system. 
                Operationalize mDNA, APEST, and organic multiplication in your context.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/lms/movemental/dashboard">
                  <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-black">
                    <Play className="h-5 w-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link href="/lms/movemental/course">
                  <Button variant="outline" size="lg">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Course Preview
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-lime-500/20 to-orange-500/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-white/70 backdrop-blur-sm border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-lime-600 mb-1">10</div>
                      <div className="text-sm text-muted-foreground">Core Modules</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/70 backdrop-blur-sm border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">40</div>
                      <div className="text-sm text-muted-foreground">Lessons</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/70 backdrop-blur-sm border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">16</div>
                      <div className="text-sm text-muted-foreground">Weeks</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/70 backdrop-blur-sm border-0">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">Cohort</div>
                      <div className="text-sm text-muted-foreground">Based</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center mt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm font-medium">Movement DNA Activation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b">
        <div className="max-w-container mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                selectedTab === 'overview' 
                  ? 'border-lime-500 text-lime-600' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Course Overview
            </button>
            <button
              onClick={() => setSelectedTab('courses')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                selectedTab === 'courses' 
                  ? 'border-lime-500 text-lime-600' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Available Courses
            </button>
            <button
              onClick={() => setSelectedTab('features')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                selectedTab === 'features' 
                  ? 'border-lime-500 text-lime-600' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Platform Features
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          {selectedTab === 'overview' && (
            <div className="space-y-12">
              {/* Movemental Course Spotlight */}
              <Card className="border-2 border-lime-200 bg-gradient-to-r from-lime-50 to-orange-50">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        Movemental Thinking for Network Leaders
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Advanced Course • 16 Weeks • Cohort-Based Learning
                      </p>
                    </div>
                    <Badge className="bg-lime-500 text-black">
                      Featured Course
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <p className="text-lg mb-6">
                        Transform your network from institutional thinking to movemental dynamics through 
                        Alan Hirsch's proven framework. This intensive course operationalizes the six 
                        elements of mDNA through practical application and peer coaching.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-lime-600" />
                          <span className="text-sm">90-Day Experiments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Cohort Coaching</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">APEST Assessments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">mDNA Implementation</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Link href="/lms/movemental/dashboard">
                          <Button className="bg-lime-500 hover:bg-lime-600 text-black">
                            <ChevronRight className="h-4 w-4 mr-2" />
                            Enter Course
                          </Button>
                        </Link>
                        <Link href="/lms/movemental/course">
                          <Button variant="outline">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">Course Structure</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Modules</span>
                          <span className="font-medium">10</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Lessons</span>
                          <span className="font-medium">40</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Duration</span>
                          <span className="font-medium">16 weeks</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Format</span>
                          <span className="font-medium">Cohort</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-lime-600" />
                    </div>
                    <CardTitle>mDNA Activation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Systematic implementation of the six elements of apostolic genius 
                      in your specific context.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle>Cohort Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Bi-weekly sessions with peers, coaching calls, and case clinic 
                      discussions for deep application.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>90-Day Experiments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Practical movement experiments with tracking, reflection, 
                      and iteration cycles.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'courses' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Available Courses</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive learning paths designed to transform leaders and organizations 
                  through movement principles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Movemental Course */}
                <Card className="border-lime-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">
                          Movemental Thinking for Network Leaders
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Advanced • 16 Weeks</p>
                      </div>
                      <Badge className="bg-lime-500 text-black">Available</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Master the paradigm shift from institutional to movemental thinking 
                      through practical application of mDNA principles.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>16 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Cohort</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>Advanced</span>
                      </div>
                    </div>
                    <Link href="/lms/movemental/dashboard">
                      <Button className="w-full">
                        Start Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Coming Soon Courses */}
                <Card className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">
                          APEST Mastery Workshop
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Intermediate • 8 Weeks</p>
                      </div>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deep dive into fivefold ministry gifts with practical tools for 
                      assessment, development, and team formation.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>8 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Workshop</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>Interactive</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      Notify Me
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'features' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Built specifically for movement leaders with tools that support 
                  transformation at scale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Activity className="h-8 w-8 text-lime-600 mb-4" />
                    <CardTitle>Movement Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Track mDNA health, APEST balance, and multiplication metrics 
                      across your network.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Target className="h-8 w-8 text-orange-600 mb-4" />
                    <CardTitle>Experiment Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Design, launch, and monitor 90-day movement experiments 
                      with built-in reflection cycles.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-purple-600 mb-4" />
                    <CardTitle>Cohort Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Facilitate peer learning with discussion forums, 
                      coaching calls, and case clinics.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
                    <CardTitle>Progress Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Visual progress indicators and personalized learning 
                      paths based on your context.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Award className="h-8 w-8 text-green-600 mb-4" />
                    <CardTitle>Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      APEST profiling, mDNA evaluation, and movement 
                      readiness assessments.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-indigo-600 mb-4" />
                    <CardTitle>Global Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Connect with movement practitioners worldwide 
                      through regional networks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-lime-50 to-orange-50">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Network?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the Movemental Thinking course and operationalize movement 
            principles in your context starting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lms/movemental/dashboard">
              <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-black">
                <Zap className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                <Users className="h-5 w-5 mr-2" />
                Contact for Group Rates
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
