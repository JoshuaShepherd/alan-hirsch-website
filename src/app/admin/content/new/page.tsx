'use client'

import { TiptapEditor } from '@/components/cms/TiptapEditor'
import { MediaLibrary } from '@/components/cms/MediaLibrary'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Image, Save, Eye, Calendar, 
  Settings, Tags, Globe, Lock, ArrowLeft,
  Video, Mic, PenTool, BookOpen, Plus,
  Play, Square, Upload, Presentation,
  Camera, Monitor, Scissors, Palette,
  BarChart3, Download, ChevronRight,
  Sparkles, HelpCircle, X
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ContentType {
  id: string
  label: string
  description: string
  icon: any
  color?: string
  gradient?: string
  estimatedTime?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  hasWorkflow?: boolean
}

const CONTENT_TYPES: ContentType[] = [
  {
    id: 'article',
    label: 'Article',
    description: 'Blog post or standalone article',
    icon: PenTool,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    estimatedTime: '30-60 min',
    difficulty: 'Beginner',
    hasWorkflow: true
  },
  {
    id: 'video',
    label: 'Video Content',
    description: 'Create engaging video content for your audience',
    icon: Video,
    color: 'text-red-600',
    gradient: 'from-red-500 to-red-600',
    estimatedTime: '45-90 min',
    difficulty: 'Intermediate',
    hasWorkflow: true
  },
  {
    id: 'audio',
    label: 'Audio/Podcast',
    description: 'Record and publish audio content',
    icon: Mic,
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    estimatedTime: '20-45 min',
    difficulty: 'Beginner',
    hasWorkflow: true
  },
  {
    id: 'visual',
    label: 'Visual Graphics',
    description: 'Design social media graphics and visual content',
    icon: Image,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    estimatedTime: '15-30 min',
    difficulty: 'Beginner',
    hasWorkflow: true
  },
  {
    id: 'learning',
    label: 'Learning Module',
    description: 'Build structured educational content',
    icon: BookOpen,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    estimatedTime: '60-120 min',
    difficulty: 'Advanced',
    hasWorkflow: true
  }
]

// Workflow Components
const ContentCreationWorkflow = ({ 
  type, 
  isOpen, 
  onClose,
  onComplete,
  showMediaLibrary,
  setShowMediaLibrary
}: { 
  type: ContentType | null
  isOpen: boolean
  onClose: () => void
  onComplete: (data: any) => void
  showMediaLibrary: boolean
  setShowMediaLibrary: (show: boolean) => void
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})

  if (!type) return null

  const renderWorkflow = () => {
    switch (type.id) {
      case 'article':
        return <BlogWorkflow 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={onComplete}
          showMediaLibrary={showMediaLibrary}
          setShowMediaLibrary={setShowMediaLibrary}
        />
      case 'video':
        return <VideoWorkflow 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={onComplete}
        />
      case 'audio':
        return <AudioWorkflow 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={onComplete}
        />
      case 'visual':
        return <VisualWorkflow 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={onComplete}
        />
      case 'learning':
        return <LearningWorkflow 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={onComplete}
        />
      default:
        return <div>Content type not implemented yet.</div>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <type.icon className={`h-6 w-6 ${type.color}`} />
            Create {type.label}
          </DialogTitle>
          <DialogDescription>
            {type.description}
          </DialogDescription>
        </DialogHeader>
        {renderWorkflow()}
      </DialogContent>
    </Dialog>
  )
}

// Blog/Article Workflow
const BlogWorkflow = ({ currentStep, setCurrentStep, formData, setFormData, onComplete, showMediaLibrary, setShowMediaLibrary }: any) => {
  const steps = ['Setup', 'Write', 'Preview', 'Publish']
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {currentStep === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Article Title</label>
            <Input 
              placeholder="Enter your article title..."
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="ministry">Ministry</SelectItem>
                <SelectItem value="church-planting">Church Planting</SelectItem>
                <SelectItem value="discipleship">Discipleship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Brief Description</label>
            <Textarea 
              placeholder="What's this article about?"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Write Your Article</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMediaLibrary(true)}
              >
                <Image className="h-4 w-4 mr-2" />
                Media
              </Button>
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assist
              </Button>
            </div>
          </div>
          <div className="border rounded-lg bg-white">
            <TiptapEditor 
              content={formData.content || ''}
              onChange={(content) => setFormData({...formData, content})}
              onSave={() => {}}
              paywallMarkers={[]}
              onUpdatePaywallMarkers={() => {}}
            />
          </div>
          
          {/* Add metadata fields */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input 
                placeholder="leadership, ministry, church (comma separated)"
                value={formData.tags || ''}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reading Time (minutes)</label>
              <Input 
                type="number"
                placeholder="5"
                value={formData.readingTime || ''}
                onChange={(e) => setFormData({...formData, readingTime: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview & SEO</h3>
          
          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">SEO & Metadata</CardTitle>
              <CardDescription>Optimize your article for search engines and social sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description (160 characters)</label>
                <Textarea 
                  placeholder="Brief description of your article for search results..."
                  value={formData.metaDescription || ''}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  maxLength={160}
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.metaDescription || '').length}/160 characters
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Upload featured image for article</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowMediaLibrary(true)}
                  >
                    Choose Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Article Preview</CardTitle>
                <Badge variant="secondary">{formData.category || 'Uncategorized'}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{formData.title || 'Untitled Article'}</h1>
                  <p className="text-gray-600 mb-4">{formData.description}</p>
                  
                  {(formData.tags || formData.readingTime) && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      {formData.readingTime && (
                        <span>📖 {formData.readingTime} min read</span>
                      )}
                      {formData.tags && (
                        <span>🏷️ {formData.tags}</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content || '<p class="text-gray-500">No content yet...</p>' 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Publish Settings</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Publication Status</label>
                <Select 
                  value={formData.status || 'draft'}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">💾 Save as Draft</SelectItem>
                    <SelectItem value="scheduled">📅 Schedule Publication</SelectItem>
                    <SelectItem value="published">🚀 Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Schedule Date & Time</label>
                  <Input 
                    type="datetime-local" 
                    value={formData.publishDate || ''}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select 
                  value={formData.visibility || 'public'}
                  onValueChange={(value) => setFormData({...formData, visibility: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">🌐 Public</SelectItem>
                    <SelectItem value="members">👥 Members Only</SelectItem>
                    <SelectItem value="premium">⭐ Premium Members</SelectItem>
                    <SelectItem value="private">🔒 Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Select 
                  value={formData.author || 'alan-hirsch'}
                  onValueChange={(value) => setFormData({...formData, author: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alan-hirsch">Alan Hirsch</SelectItem>
                    <SelectItem value="guest">Guest Author</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-4">Publication Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Title:</span>
                  <span className="font-medium text-right max-w-[150px] truncate">
                    {formData.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{formData.category || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Word Count:</span>
                  <span className="font-medium">
                    {formData.content ? formData.content.replace(/<[^>]*>/g, '').split(' ').length : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Reading Time:</span>
                  <span className="font-medium">{formData.readingTime || 'Auto'} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${
                    formData.status === 'published' ? 'text-green-600' : 
                    formData.status === 'scheduled' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {formData.status === 'published' ? '🚀 Ready to Publish' :
                     formData.status === 'scheduled' ? '📅 Scheduled' : '💾 Draft'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center space-x-2 text-sm text-blue-700">
                  <span>📈</span>
                  <span>SEO Score: {formData.metaDescription ? 'Good' : 'Needs Attention'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              onComplete(formData)
            }
          }}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Video Workflow
const VideoWorkflow = ({ currentStep, setCurrentStep, formData, setFormData, onComplete }: any) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)

  const videoTypes = [
    { id: 'talking-head', name: 'Talking Head', icon: Camera, description: 'Record yourself speaking directly to camera' },
    { id: 'screencast', name: 'Screencast', icon: Monitor, description: 'Record your screen with narration' },
    { id: 'short-clip', name: 'Short Clip', icon: Scissors, description: 'Create bite-sized content' },
    { id: 'slide-based', name: 'Slide Presentation', icon: Presentation, description: 'Script-driven slide presentation' }
  ]

  const steps = ['Type', 'Setup', 'Record/Create', 'Edit', 'Publish']

  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? 'text-red-600' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 0: Choose Video Type */}
      {currentStep === 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choose Video Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {videoTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.videoType === type.id ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setFormData({...formData, videoType: type.id})}
              >
                <CardContent className="p-4 text-center">
                  <type.icon className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Setup */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Video Setup</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <Input 
                placeholder="Enter video title..."
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe your video content..."
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input 
                placeholder="Enter tags separated by commas..."
                value={formData.tags || ''}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Record/Create Content */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {formData.videoType === 'talking-head' && 'Record Talking Head Video'}
            {formData.videoType === 'screencast' && 'Record Screen & Audio'}
            {formData.videoType === 'short-clip' && 'Create Short Clip'}
            {formData.videoType === 'slide-based' && 'Create Slide Presentation'}
          </h3>

          {/* Talking Head Recording */}
          {formData.videoType === 'talking-head' && (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="relative">
                <Camera className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                {isRecording && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-gray-600 mb-4">
                {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Camera preview will appear here'}
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" disabled={isRecording}>
                  <Settings className="h-4 w-4 mr-2" />
                  Camera Settings
                </Button>
                <Button 
                  variant={isRecording ? "destructive" : "default"}
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false)
                      setHasRecording(true)
                    } else {
                      setIsRecording(true)
                      setRecordingTime(0)
                    }
                  }}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              </div>
              {hasRecording && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">✓ Video recorded successfully ({formatTime(recordingTime)})</p>
                </div>
              )}
            </div>
          )}

          {/* Screencast Recording */}
          {formData.videoType === 'screencast' && (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Monitor className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
              <p className="text-gray-600 mb-4">
                {isRecording ? `Recording screen: ${formatTime(recordingTime)}` : 'Select screen area to record'}
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" disabled={isRecording}>
                  <Settings className="h-4 w-4 mr-2" />
                  Screen Options
                </Button>
                <Button 
                  variant={isRecording ? "destructive" : "default"}
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false)
                      setHasRecording(true)
                    } else {
                      setIsRecording(true)
                      setRecordingTime(0)
                    }
                  }}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Screen Recording
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Slide Presentation */}
          {formData.videoType === 'slide-based' && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Presentation Slides</h4>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((slide) => (
                    <div key={slide} className="aspect-video bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
                      <div className="text-center">
                        <Presentation className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Slide {slide}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Script for Current Slide</label>
                <Textarea 
                  placeholder="Write your narration script..."
                  value={formData.script || ''}
                  onChange={(e) => setFormData({...formData, script: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Short Clip Creator */}
          {formData.videoType === 'short-clip' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border rounded-lg p-6">
                <Scissors className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h4 className="text-center font-medium mb-4">Create Engaging Short Content</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Upload className="h-6 w-6 mb-2" />
                    Upload Video
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Camera className="h-6 w-6 mb-2" />
                    Record New
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hook Text (First 3 seconds)</label>
                <Input 
                  placeholder="Grab attention with your opening..."
                  value={formData.hook || ''}
                  onChange={(e) => setFormData({...formData, hook: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Edit */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Edit & Enhance</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button variant="outline" className="h-16 flex-col">
                <Scissors className="h-6 w-6 mb-2" />
                Trim & Cut
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Palette className="h-6 w-6 mb-2" />
                Add Text
              </Button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Video preview will appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Publish Settings */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Publish Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail</label>
              <div className="aspect-video bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
                <div className="text-center">
                  <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload thumbnail</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Publish Time</label>
                <Select defaultValue="now">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Publish Now</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              onComplete(formData)
            }
          }}
          disabled={currentStep === 0 && !formData.videoType}
        >
          {currentStep === steps.length - 1 ? 'Publish Video' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Audio Workflow
const AudioWorkflow = ({ currentStep, setCurrentStep, formData, setFormData, onComplete }: any) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  const audioTypes = [
    { id: 'podcast', name: 'Podcast Episode', icon: Mic, description: 'Long-form audio content with chapters' },
    { id: 'voice-note', name: 'Voice Note', icon: FileText, description: 'Quick voice memo or update' },
    { id: 'meditation', name: 'Meditation/Prayer', icon: Sparkles, description: 'Guided meditation or prayer' },
    { id: 'interview', name: 'Interview', icon: Settings, description: 'Multi-person conversation' }
  ]

  const steps = ['Type', 'Setup', 'Record', 'Edit', 'Publish']

  // Simulate recording timer and audio levels
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
        setAudioLevel(Math.random() * 100) // Simulate audio level
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? 'text-green-600' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 0: Choose Audio Type */}
      {currentStep === 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choose Audio Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {audioTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.audioType === type.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setFormData({...formData, audioType: type.id})}
              >
                <CardContent className="p-4 text-center">
                  <type.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Setup */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Audio Setup</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input 
                placeholder="Enter audio title..."
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe your audio content..."
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            {formData.audioType === 'podcast' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Episode Number</label>
                  <Input 
                    type="number"
                    placeholder="1"
                    value={formData.episodeNumber || ''}
                    onChange={(e) => setFormData({...formData, episodeNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Season</label>
                  <Input 
                    type="number"
                    placeholder="1"
                    value={formData.season || ''}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input 
                placeholder="Enter tags separated by commas..."
                value={formData.tags || ''}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Record Audio */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Record Audio</h3>
          <div className="bg-gray-100 rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Mic className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                {isRecording && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-lg font-medium">
                {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Ready to record'}
              </p>
            </div>

            {/* Audio Level Indicator */}
            {isRecording && (
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-8 rounded-full transition-all duration-150 ${
                        i < (audioLevel / 5) ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">Audio Level</p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button variant="outline" disabled={isRecording}>
                <Settings className="h-4 w-4 mr-2" />
                Audio Settings
              </Button>
              <Button 
                variant={isRecording ? "destructive" : "default"}
                onClick={() => {
                  if (isRecording) {
                    setIsRecording(false)
                    setHasRecording(true)
                  } else {
                    setIsRecording(true)
                    setRecordingTime(0)
                  }
                }}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
              <Button variant="outline" disabled={!hasRecording}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>

            {hasRecording && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-green-800 text-sm">✓ Audio recorded ({formatTime(recordingTime)})</p>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              onComplete(formData)
            }
          }}
          disabled={currentStep === 0 && !formData.audioType}
        >
          {currentStep === steps.length - 1 ? 'Publish Audio' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Visual Workflow  
const VisualWorkflow = ({ currentStep, setCurrentStep, formData, setFormData, onComplete }: any) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [previewGenerated, setPreviewGenerated] = useState(false)

  const visualTypes = [
    { id: 'quote-card', name: 'Quote Card', icon: FileText, description: 'Inspirational quote with branded design' },
    { id: 'stat-card', name: 'Statistic Card', icon: BarChart3, description: 'Highlight important numbers and data' },
    { id: 'mini-deck', name: 'Mini Deck', icon: Presentation, description: '3-slide presentation deck' },
    { id: 'infographic', name: 'Infographic', icon: Image, description: 'Visual information display' }
  ]

  const steps = ['Type', 'Content', 'Design', 'Export']

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? 'text-purple-600' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 0: Choose Visual Type */}
      {currentStep === 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choose Visual Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {visualTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.visualType === type.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setFormData({...formData, visualType: type.id})}
              >
                <CardContent className="p-4 text-center">
                  <type.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Add Content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add Content</h3>
          
          {formData.visualType === 'quote-card' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Quote Text</label>
                <Textarea 
                  placeholder="Enter your inspirational quote..."
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({...formData, quote: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input 
                  placeholder="Quote author..."
                  value={formData.author || ''}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>
            </>
          )}

          {formData.visualType === 'stat-card' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Statistic</label>
                  <Input 
                    placeholder="e.g., 87%"
                    value={formData.statistic || ''}
                    onChange={(e) => setFormData({...formData, statistic: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Context</label>
                  <Input 
                    placeholder="e.g., of people agree"
                    value={formData.context || ''}
                    onChange={(e) => setFormData({...formData, context: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Supporting Information</label>
                <Textarea 
                  placeholder="Additional context or source information..."
                  value={formData.supporting || ''}
                  onChange={(e) => setFormData({...formData, supporting: e.target.value})}
                  rows={2}
                />
              </div>
            </>
          )}

          {formData.visualType === 'mini-deck' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Deck Topic</label>
                <Input 
                  placeholder="What is this presentation about?"
                  value={formData.topic || ''}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((slide) => (
                  <div key={slide} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Slide {slide}</h4>
                    <Input 
                      placeholder={`Slide ${slide} title...`}
                      value={formData[`slide${slide}Title`] || ''}
                      onChange={(e) => setFormData({...formData, [`slide${slide}Title`]: e.target.value})}
                      className="mb-2"
                    />
                    <Textarea 
                      placeholder={`Slide ${slide} content...`}
                      value={formData[`slide${slide}Content`] || ''}
                      onChange={(e) => setFormData({...formData, [`slide${slide}Content`]: e.target.value})}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.visualType === 'infographic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Main Topic</label>
                <Input 
                  placeholder="What information are you presenting?"
                  value={formData.topic || ''}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Key Points (one per line)</label>
                <Textarea 
                  placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
                  value={formData.keyPoints || ''}
                  onChange={(e) => setFormData({...formData, keyPoints: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Design Customization */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customize Design</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color Scheme</label>
                <div className="grid grid-cols-4 gap-2">
                  {['purple', 'blue', 'green', 'red'].map((color) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-lg bg-${color}-500 hover:scale-105 transition-transform ${
                        formData.colorScheme === color ? 'ring-2 ring-gray-900' : ''
                      }`}
                      onClick={() => setFormData({...formData, colorScheme: color})}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Layout Style</label>
                <div className="space-y-2">
                  {['Centered', 'Left Aligned', 'Modern Card', 'Gradient Background'].map((style) => (
                    <label key={style} className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="layoutStyle"
                        value={style}
                        checked={formData.layoutStyle === style}
                        onChange={(e) => setFormData({...formData, layoutStyle: e.target.value})}
                      />
                      <span className="text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-4">Live Preview</h4>
              <div className="aspect-square bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <Palette className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Visual preview</p>
                  <p className="text-xs text-gray-500 mt-1">{formData.visualType}</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => setPreviewGenerated(true)}
              >
                Generate Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Export */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Export Visual</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <Select 
                  value={formData.format || 'png'}
                  onValueChange={(value) => setFormData({...formData, format: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG (High Quality)</SelectItem>
                    <SelectItem value="jpg">JPG (Web Optimized)</SelectItem>
                    <SelectItem value="pdf">PDF (Print Ready)</SelectItem>
                    <SelectItem value="svg">SVG (Vector)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Select 
                  value={formData.size || 'social-square'}
                  onValueChange={(value) => setFormData({...formData, size: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-square">Social Square (1080x1080)</SelectItem>
                    <SelectItem value="social-story">Story (1080x1920)</SelectItem>
                    <SelectItem value="social-post">Social Post (1200x630)</SelectItem>
                    <SelectItem value="presentation">Presentation (1920x1080)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium mb-4">Ready to Export</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content added</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Design customized</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Format selected</span>
                  <span className="text-green-600">✓</span>
                </div>
              </div>
              <Button className="w-full mt-4">
                <Download className="h-4 w-4 mr-2" />
                Export Visual
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              onComplete(formData)
            }
          }}
          disabled={currentStep === 0 && !formData.visualType}
        >
          {currentStep === steps.length - 1 ? 'Complete Visual' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Learning Module Workflow
const LearningWorkflow = ({ currentStep, setCurrentStep, formData, setFormData, onComplete }: any) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [currentComponent, setCurrentComponent] = useState<string | null>(null)

  const moduleComponents = [
    { id: 'intro', name: 'Lesson Intro', icon: BookOpen, description: 'Introduction and learning objectives' },
    { id: 'video', name: 'Video Content', icon: Video, description: 'Instructional video or presentation' },
    { id: 'reading', name: 'Reading Material', icon: FileText, description: 'Text-based content and resources' },
    { id: 'reflection', name: 'Reflection Questions', icon: HelpCircle, description: 'Thought-provoking questions' },
    { id: 'quiz', name: 'Knowledge Check', icon: BarChart3, description: 'Quiz or assessment' },
    { id: 'discussion', name: 'Discussion', icon: Settings, description: 'Community discussion prompts' }
  ]

  const steps = ['Setup', 'Components', 'Content', 'Review', 'Publish']

  const toggleComponent = (componentId: string) => {
    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(selectedComponents.filter(id => id !== componentId))
    } else {
      setSelectedComponents([...selectedComponents, componentId])
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 0: Module Setup */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Module Setup</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Module Title</label>
            <Input 
              placeholder="Enter module title..."
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Module Description</label>
            <Textarea 
              placeholder="Brief description of what students will learn..."
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Duration</label>
              <Select 
                value={formData.duration || ''}
                onValueChange={(value) => setFormData({...formData, duration: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15-min">15 minutes</SelectItem>
                  <SelectItem value="30-min">30 minutes</SelectItem>
                  <SelectItem value="45-min">45 minutes</SelectItem>
                  <SelectItem value="1-hour">1 hour</SelectItem>
                  <SelectItem value="90-min">90 minutes</SelectItem>
                  <SelectItem value="2-hours">2+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <Select 
                value={formData.difficulty || ''}
                onValueChange={(value) => setFormData({...formData, difficulty: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Learning Objectives</label>
            <Textarea 
              placeholder="What will students achieve? (one objective per line)"
              value={formData.objectives || ''}
              onChange={(e) => setFormData({...formData, objectives: e.target.value})}
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Step 1: Choose Components */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Choose Module Components</h3>
          <p className="text-gray-600 mb-4">Select the components you want to include in this learning module:</p>
          
          <div className="grid grid-cols-2 gap-4">
            {moduleComponents.map((component) => (
              <Card 
                key={component.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedComponents.includes(component.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => toggleComponent(component.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <component.icon className={`h-6 w-6 ${
                      selectedComponents.includes(component.id) ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{component.name}</p>
                      <p className="text-xs text-gray-600">{component.description}</p>
                    </div>
                    {selectedComponents.includes(component.id) && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedComponents.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Selected Components ({selectedComponents.length}):</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedComponents.map((componentId) => {
                  const component = moduleComponents.find(c => c.id === componentId)
                  return (
                    <span key={componentId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {component?.name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Add Content for Each Component */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Add Content to Components</h3>
          
          {selectedComponents.map((componentId) => {
            const component = moduleComponents.find(c => c.id === componentId)
            if (!component) return null

            return (
              <Card key={componentId} className="p-6">
                <div className="flex items-center mb-4">
                  <component.icon className="h-6 w-6 text-blue-600 mr-3" />
                  <h4 className="font-medium text-lg">{component.name}</h4>
                </div>

                {componentId === 'intro' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Welcome Message</label>
                      <Textarea 
                        placeholder="Welcome students to this module..."
                        value={formData.introWelcome || ''}
                        onChange={(e) => setFormData({...formData, introWelcome: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">What Students Will Learn</label>
                      <Textarea 
                        placeholder="Outline the key takeaways..."
                        value={formData.introTakeaways || ''}
                        onChange={(e) => setFormData({...formData, introTakeaways: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {componentId === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Video Title</label>
                      <Input 
                        placeholder="Video lesson title..."
                        value={formData.videoTitle || ''}
                        onChange={(e) => setFormData({...formData, videoTitle: e.target.value})}
                      />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-6 text-center">
                      <Video className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600 mb-4">Upload or record your instructional video</p>
                      <div className="flex justify-center space-x-3">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Record New
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {componentId === 'reading' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Reading Material</label>
                      <div className="border rounded-lg">
                        <TiptapEditor 
                          content={formData.readingContent || ''}
                          onChange={(content) => setFormData({...formData, readingContent: content})}
                          onSave={() => {}}
                          paywallMarkers={[]}
                          onUpdatePaywallMarkers={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {componentId === 'reflection' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Reflection Questions</label>
                      <Textarea 
                        placeholder="Add thought-provoking questions (one per line)..."
                        value={formData.reflectionQuestions || ''}
                        onChange={(e) => setFormData({...formData, reflectionQuestions: e.target.value})}
                        rows={5}
                      />
                    </div>
                  </div>
                )}

                {componentId === 'quiz' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Quiz Questions</label>
                      <div className="space-y-3">
                        {[1, 2, 3].map((qNum) => (
                          <div key={qNum} className="border rounded p-4">
                            <Input 
                              placeholder={`Question ${qNum}...`}
                              value={formData[`question${qNum}`] || ''}
                              onChange={(e) => setFormData({...formData, [`question${qNum}`]: e.target.value})}
                              className="mb-2"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input 
                                placeholder="Option A"
                                value={formData[`q${qNum}optionA`] || ''}
                                onChange={(e) => setFormData({...formData, [`q${qNum}optionA`]: e.target.value})}
                              />
                              <Input 
                                placeholder="Option B"
                                value={formData[`q${qNum}optionB`] || ''}
                                onChange={(e) => setFormData({...formData, [`q${qNum}optionB`]: e.target.value})}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {componentId === 'discussion' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Discussion Prompts</label>
                      <Textarea 
                        placeholder="Add discussion questions to encourage community interaction..."
                        value={formData.discussionPrompts || ''}
                        onChange={(e) => setFormData({...formData, discussionPrompts: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Step 3: Review Module */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Learning Module</h3>
          
          <Card className="p-6">
            <h4 className="font-medium text-lg mb-4">{formData.title}</h4>
            <p className="text-gray-600 mb-4">{formData.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="ml-2 font-medium">{formData.duration}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Level:</span>
                <span className="ml-2 font-medium">{formData.difficulty}</span>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-medium mb-2">Components Included:</h5>
              <div className="flex flex-wrap gap-2">
                {selectedComponents.map((componentId) => {
                  const component = moduleComponents.find(c => c.id === componentId)
                  return (
                    <span key={componentId} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {component?.name}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">✓ Module ready for publication</p>
              <p className="text-green-700 text-sm mt-1">All components have been configured successfully.</p>
            </div>
          </Card>
        </div>
      )}

      {/* Step 4: Publish Settings */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Publish Module</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select 
                  value={formData.visibility || 'public'}
                  onValueChange={(value) => setFormData({...formData, visibility: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="members">Members Only</SelectItem>
                    <SelectItem value="premium">Premium Members</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Course Category</label>
                <Select 
                  value={formData.category || ''}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="discipleship">Discipleship</SelectItem>
                    <SelectItem value="church-planting">Church Planting</SelectItem>
                    <SelectItem value="mission">Mission</SelectItem>
                    <SelectItem value="theology">Theology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Input 
                  placeholder="Enter tags separated by commas..."
                  value={formData.tags || ''}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-4">Module Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Components:</span>
                  <span className="font-medium">{selectedComponents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{formData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="font-medium">{formData.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              onComplete({...formData, selectedComponents})
            }
          }}
          disabled={currentStep === 1 && selectedComponents.length === 0}
        >
          {currentStep === steps.length - 1 ? 'Publish Module' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default function NewContentPage() {
  const [contentType, setContentType] = useState<string>('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [publishDate, setPublishDate] = useState('')
  const [status, setStatus] = useState<'draft' | 'scheduled' | 'published'>('draft')
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  
  // Workflow state
  const [showWorkflowModal, setShowWorkflowModal] = useState(false)
  const [selectedWorkflowType, setSelectedWorkflowType] = useState<ContentType | null>(null)

  const handleSave = () => {
    // Save logic here
    console.log('Saving content...', {
      contentType,
      title,
      content,
      excerpt,
      tags,
      publishDate,
      status
    })
  }

  const handlePublish = () => {
    setStatus('published')
    handleSave()
  }

  const openWorkflowModal = (type: ContentType) => {
    setSelectedWorkflowType(type)
    setShowWorkflowModal(true)
  }

  const closeWorkflowModal = () => {
    setShowWorkflowModal(false)
    setSelectedWorkflowType(null)
  }

  const handleWorkflowComplete = (workflowData: any) => {
    // Transfer workflow data to main form
    setTitle(workflowData.title || '')
    setContent(workflowData.content || workflowData.mainText || '')
    setExcerpt(workflowData.description || '')
    
    // Set the content type and close modal
    setContentType(selectedWorkflowType?.id || '')
    closeWorkflowModal()
  }

  if (!contentType) {
    return (
      <div className="min-h-screen bg-page">
        <div className="bg-card border-b border-border">
          <div className="max-w-container mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="btn-outline btn-sm">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold text-card-foreground">
                  Create New Content
                </h1>
                <p className="text-card-foreground/70">
                  Choose the type of content you want to create
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTENT_TYPES.map((type) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 h-full"
                    onClick={() => {
                      if (type.hasWorkflow) {
                        openWorkflowModal(type)
                      } else {
                        setContentType(type.id)
                      }
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg ${
                        type.gradient 
                          ? `bg-gradient-to-br ${type.gradient}` 
                          : 'bg-primary'
                      } flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {type.label}
                        {type.hasWorkflow && (
                          <Badge variant="secondary" className="text-xs">
                            Guided
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    {(type.estimatedTime || type.difficulty) && (
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          {type.estimatedTime && <span>{type.estimatedTime}</span>}
                          {type.difficulty && <Badge variant="outline">{type.difficulty}</Badge>}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Create Amazing Content?
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a content type above to get started with our streamlined creation workflows. 
                Each type includes guided steps, templates, and AI assistance.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Existing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setContentType('')}
                className="btn-outline btn-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Change Type
              </button>
              <div>
                <h1 className="font-display text-2xl font-bold text-card-foreground">
                  New {CONTENT_TYPES.find(t => t.id === contentType)?.label}
                </h1>
                <p className="text-card-foreground/70">
                  Create and publish your content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
              <button onClick={handleSave} className="btn-outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>
              <button onClick={handlePublish} className="btn-primary">
                <Globe className="h-4 w-4 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div className="bg-card border border-border rounded-lg p-6">
              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-muted-foreground"
              />
            </div>

            {/* Content Editor */}
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Quick Media Actions */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Quick Actions:</span>
                <Button variant="outline" size="sm" onClick={() => setShowMediaLibrary(true)}>
                  <Image className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-1" />
                  Embed Video
                </Button>
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4 mr-1" />
                  Add Audio
                </Button>
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Assist
                </Button>
              </div>
              
              <TiptapEditor
                content={content}
                onChange={setContent}
                onSave={handleSave}
                paywallMarkers={[]}
                onUpdatePaywallMarkers={() => {}}
              />
            </div>

            {/* Excerpt */}
            <div className="bg-card border border-border rounded-lg p-6">
              <label className="block mb-2 font-medium text-foreground">
                Excerpt
              </label>
              <textarea
                placeholder="Brief description or excerpt..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background resize-vertical"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Publish Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tags className="h-4 w-4" />
                Tags
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Add tags..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement
                      if (input.value.trim()) {
                        setTags([...tags, input.value.trim()])
                        input.value = ''
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => setTags(tags.filter((_, i) => i !== index))}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Media & Multimedia Tools */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Image className="h-4 w-4" />
                Media & Tools
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowMediaLibrary(true)}
                  className="w-full btn-outline text-left flex items-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  Browse Media Library
                </button>
                
                <button
                  onClick={() => {
                    const videoType = CONTENT_TYPES.find(t => t.id === 'video')
                    if (videoType) openWorkflowModal(videoType)
                  }}
                  className="w-full btn-outline text-left flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  Create Video Content
                </button>
                
                <button
                  onClick={() => {
                    const audioType = CONTENT_TYPES.find(t => t.id === 'audio')
                    if (audioType) openWorkflowModal(audioType)
                  }}
                  className="w-full btn-outline text-left flex items-center gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Record Audio
                </button>
                
                <button
                  onClick={() => {
                    const visualType = CONTENT_TYPES.find(t => t.id === 'visual')
                    if (visualType) openWorkflowModal(visualType)
                  }}
                  className="w-full btn-outline text-left flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  Design Graphics
                </button>
              </div>
            </div>

            {/* Content Analytics Preview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Content Insights
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Word count:</span>
                  <span className="font-medium">{content.length > 0 ? content.split(' ').length : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reading time:</span>
                  <span className="font-medium">
                    {Math.ceil((content.split(' ').length || 0) / 200)} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SEO Score:</span>
                  <Badge variant="outline" className="text-xs">
                    {title && content ? 'Good' : 'Needs work'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg w-full max-w-4xl h-3/4 overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Media Library</h2>
              <button
                onClick={() => setShowMediaLibrary(false)}
                className="btn-outline btn-sm"
              >
                Close
              </button>
            </div>
            <div className="p-4 h-full overflow-auto">
              <MediaLibrary onSelectFile={() => setShowMediaLibrary(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Content Creation Workflow Modal */}
      <ContentCreationWorkflow 
        type={selectedWorkflowType}
        isOpen={showWorkflowModal}
        onClose={closeWorkflowModal}
        onComplete={handleWorkflowComplete}
        showMediaLibrary={showMediaLibrary}
        setShowMediaLibrary={setShowMediaLibrary}
      />
    </div>
  )
}
