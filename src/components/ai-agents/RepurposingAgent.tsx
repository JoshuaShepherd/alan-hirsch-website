'use client'

import { useState } from 'react'
import { 
  RefreshCw, ArrowRight, Copy, Download, Share2, 
  FileText, Mail, MessageSquare, Video, Headphones,
  Twitter, Linkedin, Instagram, Youtube, Globe,
  Settings, Eye, Wand2, Scissors, Layers, Clock,
  CheckCircle, AlertCircle, Loader2, MoreVertical,
  Target, Users, Zap, TrendingUp, Save
} from 'lucide-react'

interface SourceContent {
  id: string
  title: string
  type: 'article' | 'video' | 'podcast' | 'sermon' | 'newsletter'
  content: string
  wordCount: number
  duration?: number
  publishDate: Date
  url?: string
  tags: string[]
  keyPoints: string[]
}

interface RepurposeTarget {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  platform: 'email' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'blog'
  maxLength?: number
  optimalLength?: number
  format: 'text' | 'thread' | 'video' | 'carousel' | 'story'
  requirements: string[]
  audience: string
}

interface RepurposeJob {
  id: string
  sourceId: string
  targetId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  output?: {
    content: string
    title?: string
    hashtags?: string[]
    callToAction?: string
    media?: string[]
  }
  createdAt: Date
  completedAt?: Date
  error?: string
}

interface RepurposingAgentProps {
  onRepurpose?: (sourceId: string, targetId: string) => void
  onSaveOutput?: (jobId: string, output: RepurposeJob['output']) => void
}

const StatusBadge = ({ status }: { status: RepurposeJob['status'] }) => {
  const styles = {
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  }

  const icons = {
    pending: Clock,
    processing: Loader2,
    completed: CheckCircle,
    failed: AlertCircle
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className={`h-3 w-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export function RepurposingAgent({ onRepurpose, onSaveOutput }: RepurposingAgentProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set())
  const [activeJobs, setActiveJobs] = useState<RepurposeJob[]>([])
  const [showJobHistory, setShowJobHistory] = useState(false)
  
  // Mock data - replace with actual API calls
  const [sourceContent] = useState<SourceContent[]>([
    {
      id: '1',
      title: 'Digital Discipleship in the Modern Church',
      type: 'article',
      content: 'The digital revolution has fundamentally transformed how we communicate, learn, and connect with one another. For the church, this transformation presents both unprecedented opportunities and significant challenges in the realm of discipleship...',
      wordCount: 2450,
      publishDate: new Date('2025-08-20'),
      url: 'https://alanhirsch.com/digital-discipleship',
      tags: ['discipleship', 'digital-transformation', 'church-leadership'],
      keyPoints: [
        'Digital tools as discipleship aids, not replacements',
        'Maintaining authentic relationships in digital spaces',
        'Practical implementation strategies for churches',
        'Measuring spiritual growth in digital contexts'
      ]
    },
    {
      id: '2',
      title: 'The Future of Missional Leadership',
      type: 'video',
      content: 'In this 45-minute presentation, we explore the evolving landscape of missional leadership and how leaders can adapt to serve effectively in changing cultural contexts...',
      wordCount: 0,
      duration: 2700, // 45 minutes in seconds
      publishDate: new Date('2025-08-15'),
      url: 'https://youtube.com/watch?v=example',
      tags: ['leadership', 'missional-church', 'cultural-transformation'],
      keyPoints: [
        'Adaptive leadership in changing contexts',
        'Cultural intelligence for mission',
        'Building resilient missional communities',
        'Leadership development strategies'
      ]
    },
    {
      id: '3',
      title: 'Church Planting Movement Principles',
      type: 'podcast',
      content: 'Join us for an in-depth conversation about the core principles that drive successful church planting movements around the world...',
      wordCount: 0,
      duration: 3600, // 60 minutes
      publishDate: new Date('2025-08-10'),
      tags: ['church-planting', 'movements', 'multiplication'],
      keyPoints: [
        'Movement principles vs. institutional thinking',
        'Multiplication strategies that work',
        'Creating sustainable systems',
        'Training indigenous leaders'
      ]
    }
  ])

  const [repurposeTargets] = useState<RepurposeTarget[]>([
    {
      id: 'email-newsletter',
      name: 'Email Newsletter',
      description: 'Convert to newsletter format with compelling subject line',
      icon: Mail,
      platform: 'email',
      maxLength: 2000,
      optimalLength: 800,
      format: 'text',
      requirements: [
        'Engaging subject line',
        'Personal introduction',
        'Clear call-to-action',
        'Mobile-friendly formatting'
      ],
      audience: 'Subscribers and ministry leaders'
    },
    {
      id: 'twitter-thread',
      name: 'Twitter Thread',
      description: 'Break into engaging Twitter thread with hooks',
      icon: Twitter,
      platform: 'twitter',
      maxLength: 280,
      format: 'thread',
      requirements: [
        'Hook in first tweet',
        'One main idea per tweet',
        'Thread-ending CTA',
        'Relevant hashtags'
      ],
      audience: 'General Twitter audience'
    },
    {
      id: 'linkedin-post',
      name: 'LinkedIn Article',
      description: 'Professional format for LinkedIn audience',
      icon: Linkedin,
      platform: 'linkedin',
      maxLength: 3000,
      optimalLength: 1500,
      format: 'text',
      requirements: [
        'Professional tone',
        'Industry insights',
        'Actionable takeaways',
        'Professional hashtags'
      ],
      audience: 'Christian leaders and professionals'
    },
    {
      id: 'instagram-carousel',
      name: 'Instagram Carousel',
      description: 'Visual slides with key points',
      icon: Instagram,
      platform: 'instagram',
      maxLength: 150,
      format: 'carousel',
      requirements: [
        '8-10 slides maximum',
        'Visual hierarchy',
        'Consistent branding',
        'Story-friendly format'
      ],
      audience: 'Visual content consumers'
    },
    {
      id: 'youtube-short',
      name: 'YouTube Short',
      description: 'Short-form video script under 60 seconds',
      icon: Youtube,
      platform: 'youtube',
      maxLength: 150,
      format: 'video',
      requirements: [
        'Hook in first 3 seconds',
        'Visual cues for editing',
        'Clear audio direction',
        'Strong ending'
      ],
      audience: 'Short-form video viewers'
    },
    {
      id: 'blog-summary',
      name: 'Blog Summary',
      description: 'Condensed blog post with key insights',
      icon: Globe,
      platform: 'blog',
      maxLength: 1000,
      optimalLength: 600,
      format: 'text',
      requirements: [
        'SEO-optimized title',
        'Clear structure',
        'Internal linking opportunities',
        'Meta description'
      ],
      audience: 'Website visitors and SEO'
    }
  ])

  const [completedJobs, setCompletedJobs] = useState<RepurposeJob[]>([
    {
      id: '1',
      sourceId: '1',
      targetId: 'twitter-thread',
      status: 'completed',
      progress: 100,
      output: {
        content: `🧵 Thread: Digital Discipleship in the Modern Church

1/ The digital revolution isn't just changing how we communicate—it's transforming discipleship itself. 

But here's what most churches get wrong... 👇

2/ They think digital tools should REPLACE traditional discipleship methods.

Wrong approach.

Digital tools should ENHANCE authentic relationships, not substitute them.

3/ The key insight: Digital discipleship is about using technology to deepen spiritual connections, not create shallow ones.

Think Zoom prayer groups that lead to coffee meetups.
Think Bible apps that spark real conversations.

4/ Three practical strategies that actually work:

→ Hybrid small groups (online + in-person)
→ Digital check-ins that create accountability
→ Virtual mentoring that breaks geographical barriers

5/ The challenge isn't the technology itself—it's maintaining the depth and authenticity of relationships in digital spaces.

The solution: Intentional design + clear boundaries.

6/ How to measure success in digital discipleship:

• Depth of relationships (not just frequency of contact)
• Spiritual growth indicators
• Movement from digital to physical connection
• Long-term life transformation

7/ The future of discipleship isn't fully digital or fully physical.

It's integrated.

Churches that master this integration will thrive in the next decade.

What's your experience with digital discipleship? Share below! 👇

#ChurchLeadership #DigitalDiscipleship #Missional`,
        hashtags: ['#ChurchLeadership', '#DigitalDiscipleship', '#Missional', '#ChurchTech'],
        callToAction: 'What\'s your experience with digital discipleship? Share below! 👇'
      },
      createdAt: new Date('2025-08-24T10:00:00'),
      completedAt: new Date('2025-08-24T10:02:30')
    }
  ])

  const handleStartRepurposing = async () => {
    if (!selectedSource || selectedTargets.size === 0) return

    const newJobs: RepurposeJob[] = Array.from(selectedTargets).map(targetId => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      sourceId: selectedSource,
      targetId,
      status: 'processing' as const,
      progress: 0,
      createdAt: new Date()
    }))

    setActiveJobs(prev => [...prev, ...newJobs])
    
    // Simulate AI processing
    newJobs.forEach(async (job) => {
      onRepurpose?.(selectedSource, job.targetId)
      
      // Mock progress updates
      for (let i = 10; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setActiveJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, progress: i } : j
        ))
      }

      // Mock completion
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockOutput = generateMockOutput(job.targetId)
      
      setActiveJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { 
              ...j, 
              status: 'completed' as const, 
              progress: 100,
              output: mockOutput,
              completedAt: new Date()
            } 
          : j
      ))
      
      setCompletedJobs(prev => [
        ...prev.filter(cj => cj.id !== job.id),
        {
          ...job,
          status: 'completed' as const,
          progress: 100,
          output: mockOutput,
          completedAt: new Date()
        }
      ])
    })

    setSelectedTargets(new Set())
  }

  const generateMockOutput = (targetId: string): RepurposeJob['output'] => {
    // Mock outputs for different targets - replace with actual AI generation
    const outputs = {
      'email-newsletter': {
        content: 'Subject: The Digital Discipleship Challenge Every Church Leader Faces\n\nDear Friend,\n\nI\'ve been wrestling with a question that keeps me up at night: How do we maintain the depth and authenticity of discipleship in an age of screens, notifications, and virtual connections?\n\nAfter working with churches across the globe, I\'ve discovered something surprising...\n\n[Full newsletter content with personal examples and actionable insights]',
        title: 'The Digital Discipleship Challenge Every Church Leader Faces',
        callToAction: 'What\'s been your experience with digital discipleship? Hit reply and let me know!'
      },
      'linkedin-post': {
        content: 'The digital transformation of discipleship is here—but most churches are approaching it backwards.\n\nAfter 20 years in ministry leadership, I\'ve seen churches make the same critical mistake: trying to replace authentic relationships with digital tools instead of enhancing them.\n\nHere\'s what I\'ve learned works:\n\n🔸 Hybrid approaches that blend online and offline connection\n🔸 Digital check-ins that create real accountability\n🔸 Virtual mentoring that breaks geographical barriers\n\nThe key insight: Technology should deepen spiritual connections, not create shallow substitutes.\n\nWhat\'s been your experience with digital ministry? I\'d love to hear your thoughts in the comments.\n\n#ChurchLeadership #DigitalMinistry #Discipleship #ChurchTech #MissionalLeadership',
        hashtags: ['#ChurchLeadership', '#DigitalMinistry', '#Discipleship', '#ChurchTech', '#MissionalLeadership'],
        callToAction: 'What\'s been your experience with digital ministry? I\'d love to hear your thoughts in the comments.'
      },
      'instagram-carousel': {
        content: 'Slide 1: Digital Discipleship: The New Reality\nSlide 2: The Problem: Replacing vs. Enhancing\nSlide 3: Key Insight: Technology + Authentic Relationships\n...',
        media: ['slide-1.png', 'slide-2.png', 'slide-3.png'],
        hashtags: ['#discipleship', '#churchtech', '#digital', '#faith']
      }
    }
    
    return outputs[targetId as keyof typeof outputs] || {
      content: 'Generated content based on source material...',
      callToAction: 'Engage with this content!'
    }
  }

  const toggleTarget = (targetId: string) => {
    setSelectedTargets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(targetId)) {
        newSet.delete(targetId)
      } else {
        newSet.add(targetId)
      }
      return newSet
    })
  }

  const getSourceById = (id: string) => sourceContent.find(s => s.id === id)
  const getTargetById = (id: string) => repurposeTargets.find(t => t.id === id)

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Repurposing Agent</h2>
          <p className="-foreground">Convert content across platforms and formats with AI optimization</p>
        </div>
        <button
          onClick={() => setShowJobHistory(!showJobHistory)}
          className="btn-outline flex items-center gap-2"
        >
          <Clock className="h-4 w-4" />
          {showJobHistory ? 'Hide' : 'Show'} History
        </button>
      </div>

      {/* Active Jobs */}
      {activeJobs.filter(job => job.status === 'processing').length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">Active Repurposing Jobs</h3>
          <div className="space-y-4">
            {activeJobs.filter(job => job.status === 'processing').map(job => {
              const source = getSourceById(job.sourceId)
              const target = getTargetById(job.targetId)
              
              return (
                <div key={job.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">{source?.title}</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                      <div className="flex items-center gap-2">
                        {target?.icon && <target.icon className="h-4 w-4" />}
                        <span className="text-sm font-medium">{target?.name}</span>
                      </div>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar progress={job.progress} />
                    <span className="text-xs">{job.progress}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Source Content</h3>
            <span className="text-sm">{sourceContent.length} items</span>
          </div>
          
          <div className="space-y-3">
            {sourceContent.map(source => (
              <div
                key={source.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSource === source.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => setSelectedSource(source.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={selectedSource === source.id}
                    onChange={() => setSelectedSource(source.id)}
                    className="text-primary"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium text-sm">{source.title}</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                      {source.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs mb-2">
                  {source.wordCount > 0 && (
                    <span>{source.wordCount.toLocaleString()} words</span>
                  )}
                  {source.duration && (
                    <span>{formatDuration(source.duration)}</span>
                  )}
                  <span>{source.publishDate.toLocaleDateString()}</span>
                </div>
                
                <p className="text-xs line-clamp-2 mb-3">
                  {source.content.substring(0, 150)}...
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {source.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                  {source.tags.length > 3 && (
                    <span className="text-xs">+{source.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Repurpose Targets</h3>
            <span className="text-sm">
              {selectedTargets.size} selected
            </span>
          </div>
          
          <div className="space-y-3">
            {repurposeTargets.map(target => {
              const Icon = target.icon
              return (
                <div
                  key={target.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTargets.has(target.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => toggleTarget(target.id)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedTargets.has(target.id)}
                      onChange={() => toggleTarget(target.id)}
                      className="text-primary mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{target.name}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                          {target.format}
                        </span>
                      </div>
                      
                      <p className="text-xs mb-3">
                        {target.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-xs">
                          <span>Audience: {target.audience}</span>
                          {target.maxLength && (
                            <span>Max: {target.maxLength} chars</span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {target.requirements.slice(0, 2).map(req => (
                            <span key={req} className="text-xs px-2 py-1 bg-muted rounded-full">
                              {req}
                            </span>
                          ))}
                          {target.requirements.length > 2 && (
                            <span className="text-xs">
                              +{target.requirements.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleStartRepurposing}
          disabled={!selectedSource || selectedTargets.size === 0}
          className="btn-primary btn-lg flex items-center gap-3"
        >
          <RefreshCw className="h-5 w-5" />
          Repurpose Content
          <span className="bg-primary-foreground/20 px-2 py-1 rounded-full text-xs">
            {selectedTargets.size} target{selectedTargets.size !== 1 ? 's' : ''}
          </span>
        </button>
      </div>

      {/* Completed Jobs */}
      {activeJobs.filter(job => job.status === 'completed').length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Completed Repurposing</h3>
          <div className="space-y-4">
            {activeJobs.filter(job => job.status === 'completed').map(job => {
              const source = getSourceById(job.sourceId)
              const target = getTargetById(job.targetId)
              
              return (
                <div key={job.id} className="bg-background border border-border rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="font-medium text-sm">{source?.title}</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                        <div className="flex items-center gap-2">
                          {target?.icon && <target.icon className="h-4 w-4 text-primary" />}
                          <span className="font-medium text-sm">{target?.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <StatusBadge status={job.status} />
                        <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs mt-2">
                      <span>Completed {job.completedAt?.toLocaleTimeString()}</span>
                      {job.output?.content && (
                        <span>{job.output.content.length} characters</span>
                      )}
                    </div>
                  </div>
                  
                  {job.output && (
                    <div className="p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">Generated Content</h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSaveOutput?.(job.id, job.output)}
                            className="btn-outline text-xs flex items-center gap-1"
                          >
                            <Save className="h-3 w-3" />
                            Save to CMS
                          </button>
                          <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-background border border-border rounded-lg p-4 mb-4">
                        <div className="prose prose-sm max-w-none text-foreground">
                          <pre className="whitespace-pre-wrap text-sm font-mono">
                            {job.output.content.substring(0, 500)}
                            {job.output.content.length > 500 && '...'}
                          </pre>
                        </div>
                      </div>
                      
                      {job.output.hashtags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.output.hashtags.map(hashtag => (
                            <span key={hashtag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {job.output.callToAction && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-sm text-green-800 dark:text-green-200">Call to Action</span>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {job.output.callToAction}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Job History */}
      {showJobHistory && completedJobs.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Recent History</h3>
          <div className="space-y-3">
            {completedJobs.slice(0, 5).map(job => {
              const source = getSourceById(job.sourceId)
              const target = getTargetById(job.targetId)
              
              return (
                <div key={job.id} className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        <span className="text-sm">{source?.title?.substring(0, 30)}...</span>
                      </div>
                      <ArrowRight className="h-3 w-3" />
                      <div className="flex items-center gap-2">
                        {target?.icon && <target.icon className="h-3 w-3" />}
                        <span className="text-sm">{target?.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        {job.completedAt?.toLocaleDateString()}
                      </span>
                      <StatusBadge status={job.status} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeJobs.length === 0 && completedJobs.length === 0 && (
        <div className="bg-background border border-border rounded-lg p-12 text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">Ready to Repurpose Content</p>
          <p className="-foreground mb-6">
            Select source content and target formats to create optimized content for different platforms
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>AI-optimized for each platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span>Instant generation</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Engagement-focused</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
