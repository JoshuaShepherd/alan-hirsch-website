'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { TiptapLessonEditor } from '@/components/lms/editor/TiptapLessonEditor'
import { Block } from '@/lib/lms/blocks/schemas'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Eye, Settings } from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  content: Record<string, unknown>
  blocks: Block[]
  courseId: string
  lessonNumber: number
  isPublished: boolean
}

export default function LessonEditorPage() {
  const params = useParams()
  const router = useRouter()
  const { courseId, lessonId } = params as { courseId: string; lessonId: string }
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate loading lesson data
    const loadLesson = async () => {
      try {
        // In a real app, this would fetch from your API
        // For now, we'll use mock data
        const mockLesson: Lesson = {
          id: lessonId,
          title: `Lesson ${lessonId}`,
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Welcome to this lesson. Start editing to add your content.'
                  }
                ]
              }
            ]
          },
          blocks: [],
          courseId,
          lessonNumber: 1,
          isPublished: false
        }
        
        setLesson(mockLesson)
      } catch (error) {
        console.error('Error loading lesson:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLesson()
  }, [courseId, lessonId])

  const handleSave = async (content: Record<string, unknown>, blocks: Block[]) => {
    if (!lesson) return

    setIsSaving(true)
    try {
      // In a real app, this would save to your API
      console.log('Saving lesson:', { content, blocks })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLesson(prev => prev ? {
        ...prev,
        content,
        blocks
      } : null)
      
      // Show success message (you could use a toast here)
      console.log('Lesson saved successfully')
    } catch (error) {
      console.error('Error saving lesson:', error)
      // Show error message (you could use a toast here)
    } finally {
      setIsSaving(false)
    }
  }

  const handleBlocksChange = (blocks: Block[]) => {
    if (lesson) {
      setLesson({
        ...lesson,
        blocks
      })
    }
  }

  const handlePublish = async () => {
    if (!lesson) return

    try {
      // In a real app, this would publish the lesson
      console.log('Publishing lesson:', lesson.id)
      
      setLesson(prev => prev ? {
        ...prev,
        isPublished: true
      } : null)
    } catch (error) {
      console.error('Error publishing lesson:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lms-brand mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson editor...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-4">The lesson you're looking for doesn't exist.</p>
          <Link href={`/lms/courses/${courseId}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/lms/courses/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{lesson.title}</h1>
              <p className="text-sm text-muted-foreground">Course ID: {courseId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href={`/lms/learn/courses/${courseId}/lessons/${lessonId}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>
            
            <Button
              onClick={handlePublish}
              disabled={lesson.isPublished}
              variant={lesson.isPublished ? "secondary" : "default"}
              size="sm"
            >
              {lesson.isPublished ? 'Published' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="h-[calc(100vh-73px)]">
        <TiptapLessonEditor
          initialContent={lesson.content}
          blocks={lesson.blocks}
          onSave={handleSave}
          onBlocksChange={handleBlocksChange}
        />
      </div>

      {/* Save Indicator */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-lms-brand"></div>
            <span className="text-sm text-foreground">Saving...</span>
          </div>
        </div>
      )}
    </div>
  )
}
