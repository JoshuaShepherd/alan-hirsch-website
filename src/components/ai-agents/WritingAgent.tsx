'use client'

import { useState, useRef } from 'react'
import { 
  PenTool, Wand2, FileText, Eye, Download, Copy, 
  Settings, RefreshCw, Play, Pause, Save, Upload,
  BookOpen, Lightbulb, Target, Users, MessageCircle,
  ChevronRight, ChevronDown, MoreVertical, Trash2,
  Clock, CheckCircle, AlertTriangle, Loader2
} from 'lucide-react'

interface StylePreset {
  id: string
  name: string
  description: string
  tone: 'professional' | 'conversational' | 'academic' | 'inspirational' | 'pastoral'
  length: 'brief' | 'standard' | 'detailed' | 'comprehensive'
  audience: 'leaders' | 'pastors' | 'general' | 'scholars' | 'practitioners'
  examples: string[]
}

interface WritingProject {
  id: string
  title: string
  type: 'article' | 'sermon' | 'book_chapter' | 'newsletter' | 'social_post'
  status: 'outline' | 'drafting' | 'improving' | 'completed'
  currentStep: number
  totalSteps: number
  preset: StylePreset
  outline: string
  drafts: {
    id: string
    version: number
    content: string
    wordCount: number
    createdAt: Date
    improvements: string[]
  }[]
  targetAudience: string
  keyPoints: string[]
  references: string[]
  createdAt: Date
  lastModified: Date
}

interface WritingAgentProps {
  onSaveDraft?: (projectId: string, content: string) => void
  onCreateProject?: (project: Omit<WritingProject, 'id' | 'createdAt' | 'lastModified'>) => void
}

const StatusBadge = ({ status }: { status: WritingProject['status'] }) => {
  const styles = {
    outline: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    drafting: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    improving: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
  }

  const icons = {
    outline: BookOpen,
    drafting: PenTool,
    improving: Wand2,
    completed: CheckCircle
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100
  
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export function WritingAgent({ onSaveDraft, onCreateProject }: WritingAgentProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>('professional')
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    type: 'article' as WritingProject['type'],
    targetAudience: '',
    keyPoints: [''],
    references: ['']
  })
  
  // Mock data - replace with actual API calls
  const [stylePresets] = useState<StylePreset[]>([
    {
      id: 'professional',
      name: 'Professional Leadership',
      description: 'Clear, authoritative tone for business and organizational leadership',
      tone: 'professional',
      length: 'standard',
      audience: 'leaders',
      examples: [
        'Effective leadership requires...',
        'Organizations thrive when...',
        'Strategic implementation involves...'
      ]
    },
    {
      id: 'pastoral',
      name: 'Pastoral & Spiritual',
      description: 'Warm, encouraging tone for spiritual guidance and pastoral care',
      tone: 'pastoral',
      length: 'detailed',
      audience: 'pastors',
      examples: [
        'In times of uncertainty, we find...',
        'God\'s grace extends to every...',
        'The journey of faith includes...'
      ]
    },
    {
      id: 'conversational',
      name: 'Conversational',
      description: 'Accessible, engaging tone for general audiences',
      tone: 'conversational',
      length: 'standard',
      audience: 'general',
      examples: [
        'Have you ever wondered...',
        'Here\'s what I\'ve learned...',
        'Let me share a story...'
      ]
    },
    {
      id: 'academic',
      name: 'Academic & Theological',
      description: 'Scholarly, well-researched tone for theological discourse',
      tone: 'academic',
      length: 'comprehensive',
      audience: 'scholars',
      examples: [
        'Recent research indicates...',
        'The theological implications suggest...',
        'Contextual analysis reveals...'
      ]
    }
  ])

  const [projects, setProjects] = useState<WritingProject[]>([
    {
      id: '1',
      title: 'Digital Discipleship in the Modern Church',
      type: 'article',
      status: 'improving',
      currentStep: 3,
      totalSteps: 4,
      preset: stylePresets[0],
      outline: 'I. Introduction to Digital Transformation\nII. Traditional Discipleship vs Digital Methods\nIII. Practical Implementation Strategies\nIV. Measuring Success and Impact\nV. Future Considerations',
      drafts: [
        {
          id: '1-1',
          version: 1,
          content: 'The digital revolution has fundamentally transformed how we communicate, learn, and connect with one another. For the church, this transformation presents both unprecedented opportunities and significant challenges in the realm of discipleship...',
          wordCount: 2450,
          createdAt: new Date('2025-08-20'),
          improvements: ['Enhanced introduction', 'Added practical examples', 'Strengthened theological foundation']
        },
        {
          id: '1-2',
          version: 2,
          content: 'As our world becomes increasingly digital, the church faces a critical question: How do we maintain the depth and authenticity of discipleship in an age of screens, notifications, and virtual connections?...',
          wordCount: 2780,
          createdAt: new Date('2025-08-22'),
          improvements: ['More engaging opening', 'Better flow between sections', 'Added case studies']
        }
      ],
      targetAudience: 'Church leaders and pastors navigating digital transformation',
      keyPoints: [
        'Digital tools as discipleship aids, not replacements',
        'Maintaining authentic relationships in digital spaces',
        'Practical implementation strategies for churches',
        'Measuring spiritual growth in digital contexts'
      ],
      references: [
        'Digital Church by Craig Groeschel',
        'The Tech-Wise Family by Andy Crouch',
        'Discipleship in the Digital Age research study'
      ],
      createdAt: new Date('2025-08-15'),
      lastModified: new Date('2025-08-22')
    },
    {
      id: '2',
      title: 'Missional Leadership Principles',
      type: 'sermon',
      status: 'drafting',
      currentStep: 2,
      totalSteps: 4,
      preset: stylePresets[1],
      outline: 'I. The Call to Missional Leadership (Acts 1:8)\nII. Characteristics of Missional Leaders\nIII. Overcoming Barriers to Mission\nIV. Practical Steps for Churches\nV. Living as Sent People',
      drafts: [
        {
          id: '2-1',
          version: 1,
          content: 'Today we explore what it means to be missional leaders in our communities. Jesus didn\'t just give us a suggestion when He said "Go and make disciples" - He gave us our primary identity and purpose...',
          wordCount: 1850,
          createdAt: new Date('2025-08-24'),
          improvements: []
        }
      ],
      targetAudience: 'Congregation members seeking to live missionally',
      keyPoints: [
        'Identity as sent people',
        'Leadership in everyday contexts',
        'Practical mission opportunities',
        'Community transformation'
      ],
      references: [
        'Acts 1:8, Matthew 28:18-20',
        'The Missional Church by Darrell Guder',
        'Local church mission case studies'
      ],
      createdAt: new Date('2025-08-20'),
      lastModified: new Date('2025-08-24')
    }
  ])

  const handleGenerateOutline = async (project: WritingProject) => {
    setIsGenerating(true)
    // Mock AI generation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update project with generated outline
    setProjects(prev => prev.map(p => 
      p.id === project.id 
        ? { ...p, status: 'outline' as const, currentStep: 1 }
        : p
    ))
    setIsGenerating(false)
  }

  const handleGenerateDraft = async (project: WritingProject) => {
    setIsGenerating(true)
    // Mock AI generation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newDraft = {
      id: `${project.id}-${project.drafts.length + 1}`,
      version: project.drafts.length + 1,
      content: 'Generated draft content based on outline and style preset...',
      wordCount: Math.floor(Math.random() * 1000) + 1500,
      createdAt: new Date(),
      improvements: []
    }
    
    setProjects(prev => prev.map(p => 
      p.id === project.id 
        ? { 
            ...p, 
            status: 'drafting' as const, 
            currentStep: 2,
            drafts: [...p.drafts, newDraft]
          }
        : p
    ))
    setIsGenerating(false)
  }

  const handleImproveDraft = async (project: WritingProject) => {
    setIsGenerating(true)
    // Mock AI improvement - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const currentDraft = project.drafts[project.drafts.length - 1]
    const improvedDraft = {
      id: `${project.id}-${project.drafts.length + 1}`,
      version: project.drafts.length + 1,
      content: currentDraft.content + '\n\n[Improved with better transitions, enhanced examples, and stronger conclusion...]',
      wordCount: currentDraft.wordCount + Math.floor(Math.random() * 300) + 100,
      createdAt: new Date(),
      improvements: [
        'Enhanced readability and flow',
        'Added supporting examples',
        'Strengthened conclusion',
        'Improved theological accuracy'
      ]
    }
    
    setProjects(prev => prev.map(p => 
      p.id === project.id 
        ? { 
            ...p, 
            status: 'improving' as const, 
            currentStep: 3,
            drafts: [...p.drafts, improvedDraft]
          }
        : p
    ))
    setIsGenerating(false)
  }

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const handleCreateProject = () => {
    const newProject: WritingProject = {
      id: Date.now().toString(),
      title: newProjectForm.title,
      type: newProjectForm.type,
      status: 'outline',
      currentStep: 0,
      totalSteps: 4,
      preset: stylePresets.find(p => p.id === selectedPreset) || stylePresets[0],
      outline: '',
      drafts: [],
      targetAudience: newProjectForm.targetAudience,
      keyPoints: newProjectForm.keyPoints.filter(point => point.trim()),
      references: newProjectForm.references.filter(ref => ref.trim()),
      createdAt: new Date(),
      lastModified: new Date()
    }

    setProjects(prev => [newProject, ...prev])
    onCreateProject?.(newProject)
    setShowNewProjectModal(false)
    setNewProjectForm({
      title: '',
      type: 'article',
      targetAudience: '',
      keyPoints: [''],
      references: ['']
    })
  }

  const addKeyPoint = () => {
    setNewProjectForm(prev => ({
      ...prev,
      keyPoints: [...prev.keyPoints, '']
    }))
  }

  const addReference = () => {
    setNewProjectForm(prev => ({
      ...prev,
      references: [...prev.references, '']
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Writing Agent</h2>
          <p className="-foreground">AI-powered writing assistant for outline → draft → improve workflow</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PenTool className="h-4 w-4" />
          New Writing Project
        </button>
      </div>

      {/* Active Generation Status */}
      {isGenerating && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-200">AI is working on your content...</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">This may take a few moments</p>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-background border border-border rounded-lg overflow-hidden">
            {/* Project Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {expandedProjects.has(project.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <StatusBadge status={project.status} />
                    <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                      {project.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm">
                        Progress: Step {project.currentStep} of {project.totalSteps}
                      </span>
                      <div className="flex-1 max-w-xs">
                        <ProgressBar current={project.currentStep} total={project.totalSteps} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span>Style: {project.preset.name}</span>
                    <span>Target: {project.targetAudience}</span>
                    <span>{project.drafts.length} draft{project.drafts.length !== 1 ? 's' : ''}</span>
                    <span>Modified {project.lastModified.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {project.status === 'outline' && (
                    <button
                      onClick={() => handleGenerateOutline(project)}
                      disabled={isGenerating}
                      className="btn-primary text-sm flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Generate Outline
                    </button>
                  )}
                  
                  {project.status === 'outline' && project.outline && (
                    <button
                      onClick={() => handleGenerateDraft(project)}
                      disabled={isGenerating}
                      className="btn-primary text-sm flex items-center gap-2"
                    >
                      <PenTool className="h-4 w-4" />
                      Generate Draft
                    </button>
                  )}
                  
                  {(project.status === 'drafting' || project.status === 'improving') && (
                    <button
                      onClick={() => handleImproveDraft(project)}
                      disabled={isGenerating}
                      className="btn-primary text-sm flex items-center gap-2"
                    >
                      <Wand2 className="h-4 w-4" />
                      Improve Draft
                    </button>
                  )}
                  
                  <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedProjects.has(project.id) && (
              <div className="border-t border-border bg-muted/30">
                <div className="p-6 space-y-6">
                  {/* Project Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {project.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Target className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">References</h4>
                      <ul className="space-y-2">
                        {project.references.map((ref, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <BookOpen className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                            <span>{ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Outline */}
                  {project.outline && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Outline</h4>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                          {project.outline}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Drafts */}
                  {project.drafts.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Drafts</h4>
                      <div className="space-y-4">
                        {project.drafts.map((draft, index) => (
                          <div key={draft.id} className="bg-background border border-border rounded-lg">
                            <div className="flex items-center justify-between p-4 border-b border-border">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-sm">Version {draft.version}</span>
                                <span className="text-xs">
                                  {draft.wordCount.toLocaleString()} words
                                </span>
                                <span className="text-xs">
                                  {draft.createdAt.toLocaleDateString()}
                                </span>
                                {index === project.drafts.length - 1 && (
                                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                                    Latest
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onSaveDraft?.(project.id, draft.content)}
                                  className="btn-outline text-xs flex items-center gap-1"
                                >
                                  <Save className="h-3 w-3" />
                                  Save to CMS
                                </button>
                                <button className="p-1 hover:text-foreground hover:bg-muted rounded">
                                  <Copy className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-foreground hover:bg-muted rounded">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <div className="prose prose-sm max-w-none text-foreground">
                                <p className="mb-4">{draft.content.substring(0, 300)}...</p>
                              </div>
                              
                              {draft.improvements.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-border">
                                  <h5 className="text-sm font-medium text-foreground mb-2">Improvements Made:</h5>
                                  <ul className="space-y-1">
                                    {draft.improvements.map((improvement, i) => (
                                      <li key={i} className="flex items-center gap-2 text-xs">
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                        {improvement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="bg-background border border-border rounded-lg p-12 text-center">
            <PenTool className="h-12 w-12 mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">No writing projects yet</p>
            <p className="-foreground mb-6">
              Start your first AI-assisted writing project with our guided workflow
            </p>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <PenTool className="h-4 w-4" />
              Create Your First Project
            </button>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold">New Writing Project</h3>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.title}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Digital Discipleship Guide"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content Type
                  </label>
                  <select
                    value={newProjectForm.type}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, type: e.target.value as WritingProject['type'] }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="article">Article</option>
                    <option value="sermon">Sermon</option>
                    <option value="book_chapter">Book Chapter</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="social_post">Social Post</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Writing Style
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stylePresets.map(preset => (
                    <div
                      key={preset.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPreset === preset.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => setSelectedPreset(preset.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          checked={selectedPreset === preset.id}
                          onChange={() => setSelectedPreset(preset.id)}
                          className="text-primary"
                        />
                        <h4 className="font-medium text-sm">{preset.name}</h4>
                      </div>
                      <p className="text-xs mb-2">{preset.description}</p>
                      <div className="text-xs">
                        <span className="capitalize">{preset.tone}</span> • 
                        <span className="capitalize ml-1">{preset.length}</span> • 
                        <span className="capitalize ml-1">{preset.audience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={newProjectForm.targetAudience}
                  onChange={(e) => setNewProjectForm(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="e.g., Church leaders transitioning to digital ministry"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Key Points to Cover
                </label>
                <div className="space-y-2">
                  {newProjectForm.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...newProjectForm.keyPoints]
                          newPoints[index] = e.target.value
                          setNewProjectForm(prev => ({ ...prev, keyPoints: newPoints }))
                        }}
                        placeholder={`Key point ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {newProjectForm.keyPoints.length > 1 && (
                        <button
                          onClick={() => {
                            const newPoints = newProjectForm.keyPoints.filter((_, i) => i !== index)
                            setNewProjectForm(prev => ({ ...prev, keyPoints: newPoints }))
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addKeyPoint}
                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Add another key point
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  References & Sources
                </label>
                <div className="space-y-2">
                  {newProjectForm.references.map((ref, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ref}
                        onChange={(e) => {
                          const newRefs = [...newProjectForm.references]
                          newRefs[index] = e.target.value
                          setNewProjectForm(prev => ({ ...prev, references: newRefs }))
                        }}
                        placeholder={`Reference ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {newProjectForm.references.length > 1 && (
                        <button
                          onClick={() => {
                            const newRefs = newProjectForm.references.filter((_, i) => i !== index)
                            setNewProjectForm(prev => ({ ...prev, references: newRefs }))
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addReference}
                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    Add another reference
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="btn-primary flex-1"
                disabled={!newProjectForm.title}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
