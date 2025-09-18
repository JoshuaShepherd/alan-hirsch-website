'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save, Plus, Loader2, GripVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/lms/auth/ProtectedRoute'
import { useAuth } from '@/components/lms/auth/AuthProvider'
import { createCourse, createModule, createLesson, getTenantByUserId } from '@/lib/lms/actions'

interface CourseFormData {
  title: string
  slug: string
  summary: string
  priceCents: number
}

interface ModuleData {
  id: string
  title: string
  order: number
  lessons: LessonData[]
}

interface LessonData {
  id: string
  title: string
  slug: string
  order: number
  durationEstimate: number
}

interface TenantData {
  id: string
  name: string
  slug: string
}

export default function NewCoursePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    slug: '',
    summary: '',
    priceCents: 0
  })
  const [modules, setModules] = useState<ModuleData[]>([])
  const [tenant, setTenant] = useState<TenantData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'content'>('details')

  // Module/Lesson management states
  const [showAddModule, setShowAddModule] = useState(false)
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null)
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [newLessonTitle, setNewLessonTitle] = useState('')

  // Load tenant on mount
  useEffect(() => {
    const loadTenant = async () => {
      if (!user) return
      
      setIsLoading(true)
      try {
        const tenantData = await getTenantByUserId(user.id)
        setTenant(tenantData)
      } catch (err) {
        console.error('Failed to load tenant:', err)
        // If no tenant exists, redirect to setup
        router.push('/lms/setup')
      } finally {
        setIsLoading(false)
      }
    }

    loadTenant()
  }, [user, router])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, formData.slug])

  const handleSaveCourse = async () => {
    if (!tenant) return

    setIsSaving(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Course title is required')
      }
      if (!formData.slug.trim()) {
        throw new Error('Course slug is required')
      }

      // Create the course
      const course = await createCourse({
        tenantId: tenant.id,
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        priceCents: formData.priceCents
      })

      // Create modules and lessons
      for (const moduleData of modules) {
        const createdModule = await createModule({
          courseId: course.id,
          title: moduleData.title,
          order: moduleData.order
        })

        for (const lesson of moduleData.lessons) {
          await createLesson({
            moduleId: createdModule.id,
            title: lesson.title,
            slug: lesson.slug,
            order: lesson.order,
            durationEstimate: lesson.durationEstimate
          })
        }
      }

      router.push('/lms/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save course')
    } finally {
      setIsSaving(false)
    }
  }

  const addModule = () => {
    if (!newModuleTitle.trim()) return

    const newModuleData: ModuleData = {
      id: `temp-${Date.now()}`,
      title: newModuleTitle,
      order: modules.length + 1,
      lessons: []
    }

    setModules([...modules, newModuleData])
    setNewModuleTitle('')
    setShowAddModule(false)
  }

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId))
  }

  const addLesson = (moduleId: string) => {
    if (!newLessonTitle.trim()) return

    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return

    const newLesson: LessonData = {
      id: `temp-${Date.now()}`,
      title: newLessonTitle,
      slug: newLessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      order: modules[moduleIndex].lessons.length + 1,
      durationEstimate: 10
    }

    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push(newLesson)
    setModules(updatedModules)
    
    setNewLessonTitle('')
    setShowAddLesson(null)
  }

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return

    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(l => l.id !== lessonId)
    setModules(updatedModules)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!tenant) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/lms/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold">Create New Course</h1>
              </div>
              <Button onClick={handleSaveCourse} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save Course
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'details' | 'content')}>
            <TabsList className="mb-6">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="content">Modules & Lessons</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Introduction to Discipleship"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="introduction-to-discipleship"
                        pattern="^[a-z0-9-]+$"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Course Summary</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="A comprehensive introduction to biblical discipleship..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priceCents">Price (in cents)</Label>
                    <Input
                      id="priceCents"
                      type="number"
                      min="0"
                      value={formData.priceCents}
                      onChange={(e) => setFormData({ ...formData, priceCents: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter price in cents (e.g., 2999 for $29.99, 0 for free)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Course Structure</h2>
                  <Button onClick={() => setShowAddModule(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </div>

                {modules.map((module, moduleIndex) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-lg">{moduleIndex + 1}. {module.title}</CardTitle>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddLesson(module.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Lesson
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteModule(module.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {module.lessons.length === 0 ? (
                        <p className="text-muted-foreground italic">No lessons yet</p>
                      ) : (
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{lessonIndex + 1}. {lesson.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {lesson.durationEstimate} min • {lesson.slug}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteLesson(module.id, lesson.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {modules.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No modules yet. Add your first module to get started.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Add Module Dialog */}
          {showAddModule && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Add New Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="module-title">Module Title</Label>
                      <Input
                        id="module-title"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="Understanding Discipleship"
                        onKeyDown={(e) => e.key === 'Enter' && addModule()}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddModule(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addModule} disabled={!newModuleTitle.trim()}>
                        Add Module
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add Lesson Dialog */}
          {showAddLesson && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Add New Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-title">Lesson Title</Label>
                      <Input
                        id="lesson-title"
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                        placeholder="What is Discipleship?"
                        onKeyDown={(e) => e.key === 'Enter' && addLesson(showAddLesson)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddLesson(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => addLesson(showAddLesson)} disabled={!newLessonTitle.trim()}>
                        Add Lesson
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
