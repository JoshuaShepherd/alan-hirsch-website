import { Suspense } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Eye, 
  Users, 
  BookOpen, 
  Plus, 
  Edit,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

interface CourseManagementProps {
  params: {
    courseId: string
  }
}

async function CourseManagementContent({ courseId }: { courseId: string }) {
  // Mock data - in a real app, this would fetch from the database
  const course = {
    id: courseId,
    title: 'Introduction to Discipleship',
    slug: 'introduction-to-discipleship',
    summary: 'Learn the foundational principles of Christian discipleship and how to grow in your faith journey.',
    status: 'published',
    priceCents: 0,
    enrollments: 45,
    completionRate: 78,
    totalRevenue: 0,
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
            status: 'published',
            duration: 15,
          },
          {
            id: '2',
            title: 'The Call to Follow',
            slug: 'the-call-to-follow',
            status: 'published',
            duration: 20,
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
            status: 'draft',
            duration: 25,
          },
          {
            id: '4',
            title: 'Community and Fellowship',
            slug: 'community-and-fellowship',
            status: 'draft',
            duration: 20,
          },
        ],
      },
    ],
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const publishedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.status === 'published').length, 
    0
  )

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
            <Badge 
              variant={course.status === 'published' ? 'default' : 'secondary'}
              className={course.status === 'published' ? 'bg-lms-accent' : ''}
            >
              {course.status}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{course.summary}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link href={`/lms/learn/${course.slug}`}>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button className="bg-lms-brand hover:bg-lms-brand/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.enrollments}</div>
            <p className="text-xs text-muted-foreground">
              Active learners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Average completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedLessons}/{totalLessons}</div>
            <p className="text-xs text-muted-foreground">
              Published lessons
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
              ${(course.totalRevenue / 100).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Structure */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Structure</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-lms-brand/10 rounded-lg flex items-center justify-center text-lms-brand font-semibold text-sm">
                      {module.order}
                    </div>
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                  </div>
                </div>
                
                <div className="ml-11 space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:border-lms-brand/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-lms-border" />
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{lesson.duration} min</span>
                            <Badge 
                              variant={lesson.status === 'published' ? 'default' : 'secondary'}
                              className={`text-xs ${lesson.status === 'published' ? 'bg-lms-accent' : ''}`}
                            >
                              {lesson.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link href={`/lms/learn/${course.slug}/${lesson.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/lms/courses/${courseId}/modules/${module.id}/lessons/${lesson.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                
                {moduleIndex < course.modules.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={`/lms/courses/${courseId}/edit`}>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Course Settings
              </Button>
            </Link>
            
            <Link href={`/lms/courses/${courseId}/enrollments`}>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Enrollments
              </Button>
            </Link>
            
            <Link href={`/lms/courses/${courseId}/analytics`}>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



export default async function CourseManagementPage({ params }: CourseManagementProps) {
  const { courseId } = await params
  
  return (
    <Suspense fallback={
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    }>
      <CourseManagementContent courseId={courseId} />
    </Suspense>
  )
}
