'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PenTool, 
  Video, 
  Mic, 
  Image, 
  BookOpen, 
  Plus,
  Search,
  Bell,
  User,
  FileText,
  Calendar,
  TrendingUp,
  HelpCircle,
  X,
  Play,
  Square,
  Upload,
  Presentation,
  Camera,
  Monitor,
  Scissors,
  Palette,
  BarChart3,
  Download,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Content type interfaces
interface ContentType {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  estimatedTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

interface DraftItem {
  id: string
  type: string
  title: string
  lastModified: string
  status: 'draft' | 'review' | 'scheduled'
}

// Content creation workflows
const ContentCreationModal = ({ 
  type, 
  isOpen, 
  onClose 
}: { 
  type: ContentType | null
  isOpen: boolean
  onClose: () => void 
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})

  if (!type) return null

  const renderWorkflow = () => {
    switch (type.id) {
      case 'blog':
        return <BlogWorkflow currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} setFormData={setFormData} />
      case 'video':
        return <VideoWorkflow currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} setFormData={setFormData} />
      case 'audio':
        return <AudioWorkflow currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} setFormData={setFormData} />
      case 'visual':
        return <VisualWorkflow currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} setFormData={setFormData} />
      case 'learning':
        return <LearningWorkflow currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} setFormData={setFormData} />
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
            Create {type.title}
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

// Blog/Text Workflow
const BlogWorkflow = ({ currentStep, setCurrentStep, formData, setFormData }: any) => {
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
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Assist
            </Button>
          </div>
          <div className="border rounded-lg p-4 min-h-[400px] bg-white">
            <Textarea 
              className="min-h-[350px] border-none resize-none focus:ring-0"
              placeholder="Start writing your article..."
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Card>
            <CardHeader>
              <CardTitle>{formData.title || 'Untitled Article'}</CardTitle>
              <CardDescription>{formData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {formData.content || 'No content yet...'}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Publish Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Publish Date</label>
              <Input type="datetime-local" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                  <SelectItem value="published">Publish Now</SelectItem>
                  <SelectItem value="scheduled">Schedule</SelectItem>
                </SelectContent>
              </Select>
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
              // Handle publish
              console.log('Publishing:', formData)
            }
          }}
        >
          {currentStep === steps.length - 1 ? 'Publish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Video Workflow
const VideoWorkflow = ({ currentStep, setCurrentStep, formData, setFormData }: any) => {
  const videoTypes = [
    { id: 'talking-head', name: 'Talking Head', icon: Camera, description: 'Record yourself speaking directly to camera' },
    { id: 'screencast', name: 'Screencast', icon: Monitor, description: 'Record your screen with narration' },
    { id: 'short-clip', name: 'Short Clip', icon: Scissors, description: 'Create bite-sized content' },
    { id: 'slide-based', name: 'Slide Presentation', icon: Presentation, description: 'Script-driven slide presentation' }
  ]

  return (
    <div className="space-y-6">
      {currentStep === 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choose Video Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {videoTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.videoType === type.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setFormData({...formData, videoType: type.id})}
              >
                <CardContent className="p-4 text-center">
                  <type.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 1 && formData.videoType === 'talking-head' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Record Talking Head Video</h3>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">Camera preview will appear here</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Start Recording
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
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === 0 && !formData.videoType}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Audio Workflow
const AudioWorkflow = ({ currentStep, setCurrentStep, formData, setFormData }: any) => {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Record Audio Content</h3>
        <div className="bg-gray-50 rounded-lg p-8">
          <Mic className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
          <p className="text-gray-600 mb-4">
            {isRecording ? 'Recording in progress...' : 'Click to start recording'}
          </p>
          <Button 
            size="lg"
            variant={isRecording ? "destructive" : "default"}
            onClick={() => setIsRecording(!isRecording)}
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
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Episode Title</label>
          <Input 
            placeholder="Enter episode title..."
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
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Previous
        </Button>
        <Button>
          Process & Publish
        </Button>
      </div>
    </div>
  )
}

// Visual Workflow
const VisualWorkflow = ({ currentStep, setCurrentStep, formData, setFormData }: any) => {
  const visualTypes = [
    { id: 'quote-card', name: 'Quote Card', description: 'Inspirational quote with branded design' },
    { id: 'stat-card', name: 'Statistic Card', description: 'Highlight important numbers and data' },
    { id: 'mini-deck', name: 'Mini Deck', description: '3-slide presentation deck' },
    { id: 'infographic', name: 'Infographic', description: 'Visual information display' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Create Visual Content</h3>
      <div className="grid grid-cols-2 gap-4">
        {visualTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              formData.visualType === type.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setFormData({...formData, visualType: type.id})}
          >
            <CardContent className="p-4">
              <Palette className="h-6 w-6 mb-2 text-purple-600" />
              <h4 className="font-medium">{type.name}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.visualType && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Main Text</label>
            <Textarea 
              placeholder="Enter your main text or quote..."
              value={formData.mainText || ''}
              onChange={(e) => setFormData({...formData, mainText: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="flex space-x-2">
              {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-gray-800'].map((color) => (
                <div 
                  key={color}
                  className={`w-8 h-8 rounded ${color} cursor-pointer border-2 ${
                    formData.backgroundColor === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, backgroundColor: color})}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Previous
        </Button>
        <Button disabled={!formData.visualType}>
          Generate Visual
        </Button>
      </div>
    </div>
  )
}

// Learning Module Workflow
const LearningWorkflow = ({ currentStep, setCurrentStep, formData, setFormData }: any) => {
  const moduleComponents = [
    { id: 'intro', name: 'Lesson Intro', icon: BookOpen, description: 'Introduction and objectives' },
    { id: 'video', name: 'Video Content', icon: Video, description: 'Instructional video' },
    { id: 'reflection', name: 'Reflection Questions', icon: HelpCircle, description: 'Thought-provoking questions' },
    { id: 'quiz', name: 'Knowledge Check', icon: BarChart3, description: 'Quiz or assessment' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Build Learning Module</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Module Title</label>
        <Input 
          placeholder="Enter module title..."
          value={formData.title || ''}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Add Components</h4>
        <div className="grid grid-cols-2 gap-3">
          {moduleComponents.map((component) => (
            <Card key={component.id} className="cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center space-x-3">
                <component.icon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">{component.name}</p>
                  <p className="text-xs text-gray-600">{component.description}</p>
                </div>
                <Plus className="h-4 w-4 ml-auto text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Previous
        </Button>
        <Button>
          Create Module
        </Button>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function ContentCreatorDashboard() {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState('create')

  const contentTypes: ContentType[] = [
    {
      id: 'blog',
      title: 'Blog Article',
      description: 'Write and publish thought leadership content',
      icon: PenTool,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      estimatedTime: '30-60 min',
      difficulty: 'Beginner'
    },
    {
      id: 'video',
      title: 'Video Content',
      description: 'Create engaging video content for your audience',
      icon: Video,
      color: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
      estimatedTime: '45-90 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'audio',
      title: 'Audio/Podcast',
      description: 'Record and publish audio content',
      icon: Mic,
      color: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      estimatedTime: '20-45 min',
      difficulty: 'Beginner'
    },
    {
      id: 'visual',
      title: 'Visual Graphics',
      description: 'Design social media graphics and visual content',
      icon: Image,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      estimatedTime: '15-30 min',
      difficulty: 'Beginner'
    },
    {
      id: 'learning',
      title: 'Learning Module',
      description: 'Build structured educational content',
      icon: BookOpen,
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600',
      estimatedTime: '60-120 min',
      difficulty: 'Advanced'
    }
  ]

  const recentDrafts: DraftItem[] = [
    { id: '1', type: 'blog', title: 'Leadership Principles for Church Planters', lastModified: '2 hours ago', status: 'draft' },
    { id: '2', type: 'video', title: 'Missional Mindset Introduction', lastModified: '1 day ago', status: 'review' },
    { id: '3', type: 'audio', title: 'Movement Thinking Podcast Episode 12', lastModified: '3 days ago', status: 'scheduled' }
  ]

  const openCreateModal = (type: ContentType) => {
    setSelectedType(type)
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setSelectedType(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Content Creation Center</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10 w-64" 
                  placeholder="Search content..." 
                />
              </div>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Avatar>
                <AvatarImage src="/images/alan-hirsch-portrait.jpg" />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 mr-8">
            <nav className="space-y-2">
              <Button 
                variant={activeTab === 'create' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('create')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
              <Button 
                variant={activeTab === 'drafts' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('drafts')}
              >
                <FileText className="h-4 w-4 mr-2" />
                My Drafts
              </Button>
              <Button 
                variant={activeTab === 'published' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('published')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                My Published
              </Button>
              <Button 
                variant={activeTab === 'analytics' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('analytics')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help (AI Agent)
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'create' && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    What would you like to create today?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Choose a content type below to get started with our streamlined creation workflow.
                  </p>
                  
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Start New Content
                  </Button>
                </div>

                {/* Content Type Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-gray-300"
                        onClick={() => openCreateModal(type)}
                      >
                        <CardHeader className="pb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4`}>
                            <type.icon className="h-6 w-6 text-white" />
                          </div>
                          <CardTitle className="text-lg">{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{type.estimatedTime}</span>
                            <Badge variant="secondary">{type.difficulty}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Continue Working</h3>
                  <div className="grid gap-4">
                    {recentDrafts.map((draft) => (
                      <Card key={draft.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              {contentTypes.find(t => t.id === draft.type)?.icon && (
                                React.createElement(contentTypes.find(t => t.id === draft.type)!.icon, {
                                  className: "h-5 w-5 text-gray-600"
                                })
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{draft.title}</h4>
                              <p className="text-sm text-gray-500">{draft.lastModified}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              draft.status === 'draft' ? 'default' :
                              draft.status === 'review' ? 'secondary' : 'outline'
                            }>
                              {draft.status}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'drafts' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Drafts</h2>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Your draft content will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'published' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Published Content</h2>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Your published content will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Content Analytics</h2>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Analytics dashboard coming soon</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Creation Modal */}
      <ContentCreationModal 
        type={selectedType}
        isOpen={showCreateModal}
        onClose={closeCreateModal}
      />
    </div>
  )
}
