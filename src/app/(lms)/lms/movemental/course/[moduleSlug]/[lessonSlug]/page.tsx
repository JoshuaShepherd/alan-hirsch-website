'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
  FileText,
  MessageSquare,
  Bookmark,
  Share2,
  PlayCircle,
  PauseCircle
} from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/lms/auth/ProtectedRoute'
import { getMovementalCourseStructure } from '@/lib/lms/movemental-course-structure'

interface LessonContent {
  title: string
  duration: number
  type: string
  framework: string
  practice: string
  system: string
  hirschExcerpt: string
  reflection: string[]
  nextSteps: string[]
}

export default function MovementalLessonPage() {
  const params = useParams()
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState<'framework' | 'practice' | 'system'>('framework')

  const courseStructure = getMovementalCourseStructure()
  const moduleSlug = params.moduleSlug as string
  const lessonSlug = params.lessonSlug as string

  // Find current lesson
  const currentModule = courseStructure.modules.find(m => 
    m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(moduleSlug)
  )
  const currentLesson = currentModule?.lessons.find(l => l.slug === lessonSlug)

  // Mock lesson content - in real app, this would come from database
  const lessonContent: LessonContent = {
    title: currentLesson?.title || "The Great Forgetting: Why Movements Die",
    duration: currentLesson?.duration || 45,
    type: "Interactive Lesson",
    framework: `
      <h3>The Constantinian Shift: A Movement's Death</h3>
      <p>In 313 AD, Emperor Constantine's Edict of Milan transformed Christianity from a persecuted movement to the empire's favored religion. What seemed like victory was actually the beginning of the church's institutionalization.</p>
      
      <h4>From Movement to Institution</h4>
      <ul>
        <li><strong>Organic → Organized:</strong> Spontaneous networks became hierarchical structures</li>
        <li><strong>Missional → Maintenance:</strong> Outward focus turned inward to preservation</li>
        <li><strong>Multiplication → Addition:</strong> Exponential growth became linear growth</li>
        <li><strong>Edge → Center:</strong> Innovation moved from margins to establishment</li>
      </ul>

      <h4>The Great Forgetting</h4>
      <p>Over generations, the church forgot its movement DNA. We lost the apostolic genius that catalyzed the early church's explosive growth. Today's church operates from Christendom assumptions that limit movement potential.</p>
    `,
    practice: `
      <h3>Communitas Lab: Building Liminal Community</h3>
      <p>Experience the power of communitas through a structured challenge that creates shared experience and mutual vulnerability.</p>
      
      <h4>The Challenge Framework</h4>
      <ol>
        <li><strong>Form diverse teams</strong> (4-6 people, mix of roles/backgrounds)</li>
        <li><strong>Present the challenge:</strong> "Build a tower using only spaghetti, tape, and string that can hold a marshmallow"</li>
        <li><strong>Add constraints:</strong> 18 minutes, no talking for first 5 minutes</li>
        <li><strong>Debrief:</strong> How did constraints create connection? What emerged that couldn't be planned?</li>
      </ol>

      <h4>Communitas Indicators</h4>
      <p>Watch for these signs that communitas is forming:</p>
      <ul>
        <li>Hierarchies flatten as people focus on shared goal</li>
        <li>Creativity emerges from constraint and pressure</li>
        <li>Trust builds through mutual vulnerability</li>
        <li>Team identity forms around the challenge</li>
      </ul>
    `,
    system: `
      <h3>Movement OS Canvas: Diagnostic Tool</h3>
      <p>Use this framework to assess movement health in your context and identify gaps in apostolic genius.</p>

      <h4>The Six Elements Assessment</h4>
      <p>Rate each element 1-10 in your current context:</p>
      
      <div class="grid grid-cols-2 gap-4 my-4">
        <div class="border p-3 rounded">
          <h5><strong>Jesus is Lord</strong></h5>
          <p class="text-sm">Christocentric focus, Jesus as ultimate authority</p>
        </div>
        <div class="border p-3 rounded">
          <h5><strong>Disciple Making</strong></h5>
          <p class="text-sm">Reproductive discipleship, everyone equipped</p>
        </div>
        <div class="border p-3 rounded">
          <h5><strong>Missional-Incarnational</strong></h5>
          <p class="text-sm">Sent into culture, incarnating gospel</p>
        </div>
        <div class="border p-3 rounded">
          <h5><strong>APEST Culture</strong></h5>
          <p class="text-sm">All five gifts active and valued</p>
        </div>
        <div class="border p-3 rounded">
          <h5><strong>Organic Systems</strong></h5>
          <p class="text-sm">Life-based, adaptive, networked</p>
        </div>
        <div class="border p-3 rounded">
          <h5><strong>Communitas</strong></h5>
          <p class="text-sm">Shared mission creates deep community</p>
        </div>
      </div>

      <h4>Next Steps</h4>
      <ol>
        <li>Complete your Movement OS Canvas</li>
        <li>Identify your lowest-scoring element</li>
        <li>Design a 90-day experiment to strengthen it</li>
        <li>Share findings with your cohort</li>
      </ol>
    `,
    hirschExcerpt: "When we recover apostolic genius, we recover the full church. The full church has the capacity to be the full church that God intends it to be.",
    reflection: [
      "What Christendom assumptions do you see in your current ministry context?",
      "Where have you experienced true communitas? What made it powerful?",
      "Which element of mDNA is strongest in your context? Which is weakest?",
      "What would it look like to think like a movement in your setting?"
    ],
    nextSteps: [
      "Complete the Movement OS Canvas for your context",
      "Share one insight with your cohort in the discussion forum",
      "Identify one Christendom assumption you want to challenge",
      "Plan a communitas experience for your team"
    ]
  }

  const toggleComplete = () => {
    setIsCompleted(!isCompleted)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // Mock progress simulation
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 100)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/lms/movemental/course">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Course
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {lessonContent.title}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {currentModule?.title} • Lesson {(currentModule?.lessons.findIndex(l => l.slug === lessonSlug) ?? -1) + 1} of {currentModule?.lessons.length || 4}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{lessonContent.duration} min</span>
                </div>
                <Button
                  onClick={toggleComplete}
                  variant={isCompleted ? "default" : "outline"}
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isCompleted ? "Completed" : "Mark Complete"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Progress Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Lesson Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Alan Hirsch Quote */}
              <Card className="bg-gradient-to-r from-lime-500/10 to-orange-500/10 border-lime-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-2">Alan Hirsch</h3>
                      <blockquote className="text-lg italic text-foreground">
                        "{lessonContent.hirschExcerpt}"
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Sections */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Lesson Content</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={currentSection === 'framework' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentSection('framework')}
                      >
                        Framework
                      </Button>
                      <Button
                        variant={currentSection === 'practice' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentSection('practice')}
                      >
                        Practice
                      </Button>
                      <Button
                        variant={currentSection === 'system' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentSection('system')}
                      >
                        System
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none">
                    {currentSection === 'framework' && (
                      <div dangerouslySetInnerHTML={{ __html: lessonContent.framework }} />
                    )}
                    {currentSection === 'practice' && (
                      <div dangerouslySetInnerHTML={{ __html: lessonContent.practice }} />
                    )}
                    {currentSection === 'system' && (
                      <div dangerouslySetInnerHTML={{ __html: lessonContent.system }} />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reflection Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Reflection Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lessonContent.reflection.map((question, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Action Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lessonContent.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lesson Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lesson Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    onClick={togglePlayback}
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <PlayCircle className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? 'Pause' : 'Start'} Lesson
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmark
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </CardContent>
              </Card>

              {/* Lesson Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lesson Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{lessonContent.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge variant="secondary">{lessonContent.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{Math.round(progress)}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                  <Button className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Next Lesson
                  </Button>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Notes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Canvas Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
