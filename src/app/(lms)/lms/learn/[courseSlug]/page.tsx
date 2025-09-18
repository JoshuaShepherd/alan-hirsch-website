import { Suspense } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, Play, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface CourseOverviewProps {
  params: {
    courseSlug: string
  }
}

async function CourseOverviewContent({ courseSlug }: { courseSlug: string }) {
  // In a real implementation, this would fetch the course data based on the slug
  // For now, we'll use mock data
  const course = {
    id: '1',
    title: 'Introduction to Discipleship',
    summary: 'Learn the foundational principles of Christian discipleship and how to grow in your faith journey.',
    featuredMedia: '/images/course-placeholder.jpg',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    estimatedDuration: 180, // minutes
    modules: [
      {
        id: '1',
        title: 'Understanding Discipleship',
        order: 1,
        lessons: [
          {
            id: '1',
            title: 'What is Discipleship?',
            slug: 'what-is-discipleship',
            duration: 15,
            completed: false,
          },
          {
            id: '2',
            title: 'The Call to Follow',
            slug: 'the-call-to-follow',
            duration: 20,
            completed: false,
          },
        ],
      },
      {
        id: '2',
        title: 'Growing in Faith',
        order: 2,
        lessons: [
          {
            id: '3',
            title: 'Prayer and Scripture',
            slug: 'prayer-and-scripture',
            duration: 25,
            completed: false,
          },
          {
            id: '4',
            title: 'Community and Fellowship',
            slug: 'community-and-fellowship',
            duration: 20,
            completed: false,
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lms-brand to-lms-accent text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-lg opacity-90">{course.summary}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(course.estimatedDuration / 60)}h {course.estimatedDuration % 60}m total</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-80 bg-white/10 backdrop-blur rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="bg-white/20" />
                <div className="text-sm opacity-75">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </div>
              </div>
              
              <Button className="w-full bg-white text-lms-brand hover:bg-white/90" size="lg">
                <Play className="mr-2 h-4 w-4" />
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {course.modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-lms-brand/10 rounded-lg flex items-center justify-center text-lms-brand font-semibold text-sm">
                  {module.order}
                </div>
                <span>{module.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <Link 
                    key={lesson.id}
                    href={`/lms/learn/${courseSlug}/${lesson.slug}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-lms-brand/50 hover:bg-lms-brand/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border-2 border-lms-brand flex items-center justify-center">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-lms-accent fill-current" />
                          ) : (
                            <div className="w-2 h-2 bg-lms-brand rounded-full" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration} min</span>
                            {lesson.completed && (
                              <Badge variant="secondary" className="bg-lms-accent/10 text-lms-accent">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-lms-brand">
                        <Play className="h-5 w-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function CourseOverviewPage({ params }: CourseOverviewProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lms-brand"></div>
      </div>
    }>
      <CourseOverviewContent courseSlug={params.courseSlug} />
    </Suspense>
  )
}
