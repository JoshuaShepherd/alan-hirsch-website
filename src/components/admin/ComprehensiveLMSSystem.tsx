'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, Play, CheckCircle, Clock, Users, Award,
  Plus, Search, Filter, Star, Download, Upload,
  FileText, Video, Image, Mic, Settings, Eye,
  BarChart3, TrendingUp, Calendar, MessageSquare,
  Edit, Trash2, Copy, Share, Lock, Unlock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  duration: number
  lessonsCount: number
  studentsCount: number
  rating: number
  reviewsCount: number
  price: number
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  duration: number
  order: number
  content: string
  videoUrl?: string
  completed: boolean
  locked: boolean
}

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  enrolledCourses: string[]
  completedCourses: string[]
  totalProgress: number
  certificatesEarned: number
  joinedAt: string
  lastActive: string
}

interface Assessment {
  id: string
  courseId: string
  lessonId?: string
  title: string
  type: 'quiz' | 'assignment' | 'exam'
  questions: Array<{
    id: string
    type: 'multiple-choice' | 'true-false' | 'essay' | 'short-answer'
    question: string
    options?: string[]
    correctAnswer?: string | number
    points: number
  }>
  timeLimit?: number
  attempts: number
  passingScore: number
}

interface Certificate {
  id: string
  courseId: string
  studentId: string
  issuedAt: string
  templateId: string
  downloadUrl: string
}

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Foundations of Missional Leadership',
    description: 'Comprehensive introduction to missional church principles and APEST framework',
    instructor: 'Alan Hirsch',
    thumbnail: '/images/course-foundations.jpg',
    duration: 480, // minutes
    lessonsCount: 12,
    studentsCount: 234,
    rating: 4.8,
    reviewsCount: 45,
    price: 199,
    category: 'Leadership',
    difficulty: 'beginner',
    tags: ['apest', 'leadership', 'missional'],
    published: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-09-01'
  },
  {
    id: '2',
    title: 'Advanced Church Planting Strategies',
    description: 'Deep dive into multiplication movements and church planting methodologies',
    instructor: 'Sarah Johnson',
    thumbnail: '/images/course-planting.jpg',
    duration: 720,
    lessonsCount: 18,
    studentsCount: 156,
    rating: 4.9,
    reviewsCount: 32,
    price: 299,
    category: 'Church Planting',
    difficulty: 'advanced',
    tags: ['church-planting', 'multiplication', 'strategy'],
    published: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-08-15'
  },
  {
    id: '3',
    title: 'APEST Assessment & Implementation',
    description: 'Practical guide to discovering and developing five-fold ministry gifts',
    instructor: 'Michael Chen',
    thumbnail: '/images/course-apest.jpg',
    duration: 360,
    lessonsCount: 8,
    studentsCount: 89,
    rating: 4.7,
    reviewsCount: 28,
    price: 149,
    category: 'Assessment',
    difficulty: 'intermediate',
    tags: ['apest', 'assessment', 'gifts'],
    published: false,
    createdAt: '2024-03-20',
    updatedAt: '2024-09-10'
  }
]

const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    enrolledCourses: ['1', '2'],
    completedCourses: ['1'],
    totalProgress: 75,
    certificatesEarned: 1,
    joinedAt: '2024-01-20',
    lastActive: '2025-09-19'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    enrolledCourses: ['1', '2', '3'],
    completedCourses: [],
    totalProgress: 45,
    certificatesEarned: 0,
    joinedAt: '2024-02-15',
    lastActive: '2025-09-18'
  }
]

export function ComprehensiveLMSSystem() {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES)
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || course.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Learning Management System</h2>
          <p className="text-muted-foreground">
            Create, manage, and track online courses and student progress
          </p>
        </div>
        <Button onClick={() => setShowCreateCourse(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+8.3%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">78%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+5.7%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$12.4K</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+15.2%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="church-planting">Church Planting</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="theology">Theology</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedCourse(course)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDuration(course.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessonsCount} lessons
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.studentsCount} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {course.rating} ({course.reviewsCount})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <span className="font-semibold text-lg">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{course.category}</Badge>
                      {!course.published && (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Overview</CardTitle>
                <CardDescription>Active student statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Enrolled</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active This Month</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed Courses</span>
                    <span className="font-medium">456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Certificates Issued</span>
                    <span className="font-medium">234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>Newly enrolled students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.enrolledCourses.length} courses • {student.totalProgress}% avg progress
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Types</CardTitle>
                <CardDescription>Create and manage different assessment formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Quiz</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Edit className="h-6 w-6" />
                    <span>Assignment</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span>Timed Exam</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>Discussion</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average Score</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completion Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time to Complete</span>
                    <span className="font-medium">23 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Retake Rate</span>
                    <span className="font-medium">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Templates</CardTitle>
                <CardDescription>Design and customize certificate templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium mb-2">Standard Certificate</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Default template for course completion
                  </p>
                  <Button size="sm" variant="outline">
                    Customize
                  </Button>
                </div>
                
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Certificates</CardTitle>
                <CardDescription>Recently issued certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">Foundations of Missional Leadership</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Sept 19, 2025</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maria Garcia</p>
                      <p className="text-sm text-muted-foreground">APEST Assessment & Implementation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Sept 18, 2025</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Engagement and completion metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Course revenue and enrollment trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Revenue</span>
                    <span className="font-medium">$12,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Order Value</span>
                    <span className="font-medium">$215</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Growth</span>
                    <span className="font-medium text-green-600">+18.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Refund Rate</span>
                    <span className="font-medium">2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure LMS behavior and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-enroll new users</Label>
                    <p className="text-sm text-muted-foreground">Automatically enroll users in free courses</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Certificate auto-generation</Label>
                    <p className="text-sm text-muted-foreground">Generate certificates upon course completion</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Progress tracking</Label>
                    <p className="text-sm text-muted-foreground">Track detailed student progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default course duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure email and system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Course completion emails</Label>
                    <p className="text-sm text-muted-foreground">Send emails when students complete courses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Assignment reminders</Label>
                    <p className="text-sm text-muted-foreground">Remind students of pending assignments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Instructor notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify instructors of student activity</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Email template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Template</SelectItem>
                      <SelectItem value="modern">Modern Template</SelectItem>
                      <SelectItem value="classic">Classic Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Course Modal */}
      <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input placeholder="Enter course title" />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe your course" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="church-planting">Church Planting</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="theology">Theology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input type="number" placeholder="360" />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateCourse(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateCourse(false)}>
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Details Modal */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Course Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Instructor:</span>
                      <span>{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{formatDuration(selectedCourse.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lessons:</span>
                      <span>{selectedCourse.lessonsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span>{selectedCourse.studentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span>{selectedCourse.rating}/5 ({selectedCourse.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCourse.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}