'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { LessonRenderer } from '@/components/lms/lesson-renderer'
import { ArrowLeft, ArrowRight, CheckCircle, Menu } from 'lucide-react'
import Link from 'next/link'
import { createBlock, BLOCK_TYPES } from '@/lib/lms/blocks/schemas'

interface LessonPageProps {
  params: {
    courseSlug: string
    lessonSlug: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  
  // Mock data - in a real app, this would come from the database
  const lesson = {
    id: '1',
    title: 'What is Discipleship?',
    slug: 'what-is-discipleship',
    duration: 15,
    blocks: [
      createBlock(BLOCK_TYPES.TEXT_RICH, {
        content: { type: 'doc', content: [] }
      }),
      createBlock(BLOCK_TYPES.QUOTE, {
        text: 'A disciple is not above his teacher, but everyone when he is fully trained will be like his teacher.',
        cite: 'Luke 6:40'
      }),
      createBlock(BLOCK_TYPES.CALLOUT, {
        variant: 'insight',
        title: 'Key Insight',
        body: { type: 'doc', content: [] }
      }),
      createBlock(BLOCK_TYPES.QUIZ_MCQ, {
        stem: { type: 'doc', content: [] },
        options: [
          { id: 'a', text: 'Following Jesus from a distance' },
          { id: 'b', text: 'Learning from and imitating Jesus' },
          { id: 'c', text: 'Going to church regularly' },
          { id: 'd', text: 'Reading the Bible daily' }
        ],
        correctIds: ['b'],
        shuffle: false,
        points: 1
      })
    ]
  }
  
  const course = {
    title: 'Introduction to Discipleship',
    totalLessons: 12,
    currentLessonIndex: 0,
    modules: [
      {
        id: '1',
        title: 'Understanding Discipleship',
        lessons: [
          { id: '1', title: 'What is Discipleship?', slug: 'what-is-discipleship', completed: false },
          { id: '2', title: 'The Call to Follow', slug: 'the-call-to-follow', completed: false },
        ]
      },
      {
        id: '2',
        title: 'Growing in Faith',
        lessons: [
          { id: '3', title: 'Prayer and Scripture', slug: 'prayer-and-scripture', completed: false },
          { id: '4', title: 'Community and Fellowship', slug: 'community-and-fellowship', completed: false },
        ]
      }
    ]
  }
  
  const progress = ((course.currentLessonIndex + 1) / course.totalLessons) * 100
  
  const handleMarkComplete = () => {
    setLessonCompleted(true)
    // In a real app, this would call the updateLessonProgress action
  }
  
  const nextLesson = course.modules
    .flatMap(m => m.lessons)
    .find((_, index) => index === course.currentLessonIndex + 1)
  
  const prevLesson = course.modules
    .flatMap(m => m.lessons)
    .find((_, index) => index === course.currentLessonIndex - 1)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Link href={`/lms/learn/${params.courseSlug}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
            </Link>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Lesson {course.currentLessonIndex + 1} of {course.totalLessons}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!lessonCompleted ? (
              <Button onClick={handleMarkComplete} className="bg-lms-accent hover:bg-lms-accent/90">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            ) : (
              <div className="flex items-center space-x-2 text-lms-accent">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Course Navigation */}
        <aside className={`w-80 bg-lms-surface border-r border-lms-border transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-16 h-full z-40 overflow-y-auto`}>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="font-semibold text-lms-text mb-2">{course.title}</h2>
              <div className="text-sm text-lms-muted">
                {course.currentLessonIndex + 1} of {course.totalLessons} lessons
              </div>
            </div>
            
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <h3 className="text-sm font-medium text-lms-text">{module.title}</h3>
                  <div className="space-y-1">
                    {module.lessons.map((lessonItem) => (
                      <Link
                        key={lessonItem.id}
                        href={`/lms/learn/${params.courseSlug}/${lessonItem.slug}`}
                        className={`block p-2 rounded text-sm transition-colors ${
                          lessonItem.slug === params.lessonSlug
                            ? 'bg-lms-brand text-white'
                            : 'text-lms-muted hover:text-lms-text hover:bg-lms-card'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            lessonItem.completed ? 'bg-lms-accent' : 'bg-lms-border'
                          }`} />
                          <span className="flex-1">{lessonItem.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Lesson Content */}
        <main className="flex-1 md:ml-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Lesson Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">{lesson.title}</h1>
              <div className="text-muted-foreground">
                Estimated time: {lesson.duration} minutes
              </div>
            </div>

            {/* Lesson Blocks */}
            <LessonRenderer blocks={lesson.blocks} className="mb-12" />

            {/* Navigation */}
            <Separator className="my-8" />
            <div className="flex justify-between items-center">
              <div>
                {prevLesson && (
                  <Link href={`/lms/learn/${params.courseSlug}/${prevLesson.slug}`}>
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous: {prevLesson.title}
                    </Button>
                  </Link>
                )}
              </div>
              
              <div>
                {nextLesson && (
                  <Link href={`/lms/learn/${params.courseSlug}/${nextLesson.slug}`}>
                    <Button className="bg-lms-brand hover:bg-lms-brand/90">
                      Next: {nextLesson.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
