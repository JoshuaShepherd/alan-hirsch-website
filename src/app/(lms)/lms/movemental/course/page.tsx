'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle,
  Play,
  ArrowRight,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  slug: string
  title: string
  duration: number
  difficulty: string
  description: string
  order: number
}

interface Module {
  slug: string
  title: string
  order: number
  lessons: Lesson[]
  totalDuration: number
  lessonCount: number
}

export default function MovementalCoursePage() {
  const [modules, setModules] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load course data from our content system
    const loadCourse = async () => {
      try {
        // This would normally come from an API, but we'll use mock data that matches our content
        const mockCourse = {
          modules: [
            {
              slug: 'module-01-movemental-paradigm',
              title: 'Movemental Paradigm: Waking the Church to Apostolic Genius',
              order: 1,
              lessonCount: 4,
              totalDuration: 170,
              lessons: [
                {
                  slug: 'lesson-01-the-great-forgetting',
                  title: 'The Great Forgetting: Why Movements Die',
                  duration: 45,
                  difficulty: 'intermediate',
                  description: 'Explore how the church moved from dynamic movement to static institution, and what we lost in the process.',
                  order: 1
                },
                {
                  slug: 'lesson-02-apostolic-genius-rediscovered',
                  title: 'Apostolic Genius Rediscovered',
                  duration: 40,
                  difficulty: 'intermediate',
                  description: 'Discover the mysterious quality that catalyzes phenomenal Jesus movements and how to recognize it today.',
                  order: 2
                },
                {
                  slug: 'lesson-03-mdna-six-elements',
                  title: 'mDNA: The Six Elements',
                  duration: 50,
                  difficulty: 'intermediate',
                  description: 'Explore the six irreducible minimums that form the genetic code of every authentic apostolic movement.',
                  order: 3
                },
                {
                  slug: 'lesson-04-institution-to-movement',
                  title: 'From Institution to Movement',
                  duration: 35,
                  difficulty: 'intermediate',
                  description: 'Learn to think like a movement again through fundamental recalibration of paradigms, structures, and practices.',
                  order: 4
                }
              ]
            },
            {
              slug: 'module-02-jesus-is-lord',
              title: 'Jesus is Lord: Allegiance and Organizing Principle',
              order: 2,
              lessonCount: 2,
              totalDuration: 85,
              lessons: [
                {
                  slug: 'lesson-01-jesus-as-organizing-principle',
                  title: 'Jesus as Organizing Principle',
                  duration: 40,
                  difficulty: 'intermediate',
                  description: 'Discover what it means to make Jesus the organizing principle of every aspect of life and community.',
                  order: 1
                },
                {
                  slug: 'lesson-02-living-under-lordship',
                  title: 'Living Under Lordship',
                  duration: 45,
                  difficulty: 'intermediate',
                  description: 'Discover practical ways to live under Jesus\' lordship in daily decisions, relationships, resources, and priorities.',
                  order: 2
                }
              ]
            },
            {
              slug: 'module-03-disciple-making',
              title: 'Disciple Making: Reproducing Followers',
              order: 3,
              lessonCount: 1,
              totalDuration: 45,
              lessons: [
                {
                  slug: 'lesson-01-disciple-making-foundations',
                  title: 'Disciple-Making Foundations',
                  duration: 45,
                  difficulty: 'intermediate',
                  description: 'Understand the biblical foundation and practical principles of making disciples who make disciples.',
                  order: 1
                }
              ]
            },
            {
              slug: 'module-04-missional-incarnational-impulse',
              title: 'Missional-Incarnational Impulse: Sent People',
              order: 4,
              lessonCount: 1,
              totalDuration: 50,
              lessons: [
                {
                  slug: 'lesson-01-sent-people-living-incarnationally',
                  title: 'Sent People Living Incarnationally',
                  duration: 50,
                  difficulty: 'intermediate',
                  description: 'Discover what it means to be sent people who live incarnationally among those they\'re called to reach.',
                  order: 1
                }
              ]
            }
          ]
        }
        
        setModules(mockCourse.modules)
      } catch (error) {
        console.error('Failed to load course:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Movemental Thinking Advanced</h1>
              <p className="text-lg text-muted-foreground">
                A comprehensive course on developing apostolic genius and building kingdom movements
              </p>
            </div>
            <Link href="/lms/movemental/dashboard" className="btn-outline">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modules.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {modules.reduce((sum, module) => sum + module.lessonCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(modules.reduce((sum, module) => sum + module.totalDuration, 0) / 60)}h {modules.reduce((sum, module) => sum + module.totalDuration, 0) % 60}m
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          {modules.map((module, moduleIndex) => (
            <Card key={module.slug} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {module.order}
                      </span>
                      {module.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {module.lessonCount} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {Math.floor(module.totalDuration / 60)}h {module.totalDuration % 60}m
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    Available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.slug} className="border-b border-border last:border-b-0">
                      <div className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                                {lesson.order}
                              </span>
                              <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {lesson.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration}m
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          <div className="ml-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary hover:text-primary-foreground hover:bg-primary"
                              asChild
                            >
                              <Link href={`/lms/movemental/course/${module.slug}/${lesson.slug}`}>
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ready to Begin Your Movemental Journey?</h3>
                <p className="text-muted-foreground mb-4">
                  Start with Module 1 to understand the paradigm shift from institution to movement.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/lms/movemental/course/module-01-movemental-paradigm/lesson-01-the-great-forgetting">
                  Start Course
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
