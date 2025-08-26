'use client'

import { useState } from 'react'
import { 
  Rocket, Target, Users, Mail, Calendar,
  Clock, CheckCircle, AlertCircle, Play, Pause,
  Settings, Copy, Edit3, Trash2, Plus,
  ArrowRight, BarChart3, Send, Eye, Download,
  Zap, Star, Gift, Megaphone, TrendingUp,
  MessageCircle, Share2, Globe, DollarSign,
  FileText, Video, Headphones, BookOpen,
  UserPlus, Heart, Award, Bell, RefreshCw,
  ExternalLink, Filter, Search, MoreVertical,
  ChevronRight, ChevronDown, PlayCircle,
  PauseCircle, Timer, Lightbulb, Hash
} from 'lucide-react'

interface LaunchStep {
  id: string
  title: string
  description: string
  type: 'email' | 'social' | 'content' | 'ads' | 'partnership' | 'pr'
  status: 'pending' | 'scheduled' | 'sent' | 'completed' | 'failed'
  scheduledFor: Date
  audience: {
    segment: string
    size: number
  }
  metrics?: {
    sent?: number
    opened?: number
    clicked?: number
    converted?: number
  }
  content?: {
    subject?: string
    preview?: string
    cta?: string
  }
}

interface LaunchCampaign {
  id: string
  name: string
  product: string
  type: 'course' | 'book' | 'event' | 'program' | 'coaching'
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused'
  launchDate: Date
  duration: number // days
  goal: {
    metric: 'sales' | 'signups' | 'revenue' | 'attendees'
    target: number
    current: number
  }
  budget: number
  steps: LaunchStep[]
  createdAt: Date
}

interface LaunchTemplate {
  id: string
  name: string
  type: LaunchCampaign['type']
  description: string
  duration: number
  stepCount: number
  tags: string[]
  preview: LaunchStep[]
}

interface LaunchAgentProps {
  onCreateCampaign?: (template: LaunchTemplate) => void
  onScheduleStep?: (campaignId: string, stepId: string, date: Date) => void
  onSendStep?: (campaignId: string, stepId: string) => void
  onDuplicateCampaign?: (campaignId: string) => void
}

const StatusBadge = ({ status }: { status: LaunchStep['status'] | LaunchCampaign['status'] }) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    sent: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    paused: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
  }

  const icons = {
    draft: Edit3,
    pending: Clock,
    scheduled: Calendar,
    sent: Send,
    active: Play,
    completed: CheckCircle,
    failed: AlertCircle,
    paused: Pause
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const StepTypeIcon = ({ type }: { type: LaunchStep['type'] }) => {
  const icons = {
    email: Mail,
    social: Share2,
    content: FileText,
    ads: Target,
    partnership: Users,
    pr: Megaphone
  }

  const Icon = icons[type]
  return <Icon className="h-4 w-4" />
}

const ProductTypeIcon = ({ type }: { type: LaunchCampaign['type'] }) => {
  const icons = {
    course: PlayCircle,
    book: BookOpen,
    event: Calendar,
    program: Star,
    coaching: Users
  }

  const Icon = icons[type]
  return <Icon className="h-4 w-4" />
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
}

const calculateProgress = (goal: LaunchCampaign['goal']) => {
  return Math.min((goal.current / goal.target) * 100, 100)
}

export function LaunchAgent({ onCreateCampaign, onScheduleStep, onSendStep, onDuplicateCampaign }: LaunchAgentProps) {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'calendar' | 'analytics'>('campaigns')
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set())
  const [filterStatus, setFilterStatus] = useState<'all' | LaunchCampaign['status']>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with actual API calls
  const [campaigns, setCampaigns] = useState<LaunchCampaign[]>([
    {
      id: '1',
      name: 'The Future of Church Leadership Course Launch',
      product: 'Church Leadership Mastery',
      type: 'course',
      status: 'active',
      launchDate: new Date('2025-09-01'),
      duration: 14,
      goal: {
        metric: 'sales',
        target: 250,
        current: 187
      },
      budget: 5000,
      steps: [
        {
          id: 'step-1',
          title: 'Announcement Email to Subscribers',
          description: 'Initial announcement about the upcoming course to existing email list',
          type: 'email',
          status: 'completed',
          scheduledFor: new Date('2025-08-25T09:00:00'),
          audience: { segment: 'Email Subscribers', size: 8900 },
          metrics: { sent: 8900, opened: 3204, clicked: 892, converted: 47 },
          content: {
            subject: 'NEW: Church Leadership Course - Early Bird Special',
            preview: 'Get ready to transform your leadership approach...',
            cta: 'Reserve Your Spot'
          }
        },
        {
          id: 'step-2',
          title: 'Social Media Teaser Campaign',
          description: 'Multi-platform social campaign building anticipation',
          type: 'social',
          status: 'completed',
          scheduledFor: new Date('2025-08-26T12:00:00'),
          audience: { segment: 'Social Media Followers', size: 15200 },
          metrics: { sent: 15200, opened: 4560, clicked: 1230, converted: 89 }
        },
        {
          id: 'step-3',
          title: 'Partner Organization Outreach',
          description: 'Coordinate with 5Q, Movement Leaders, and other partners',
          type: 'partnership',
          status: 'sent',
          scheduledFor: new Date('2025-08-27T10:00:00'),
          audience: { segment: 'Partner Networks', size: 25000 },
          metrics: { sent: 25000, opened: 8750, clicked: 1875 }
        },
        {
          id: 'step-4',
          title: 'Content Marketing Push',
          description: 'Release free preview content and case studies',
          type: 'content',
          status: 'scheduled',
          scheduledFor: new Date('2025-08-29T08:00:00'),
          audience: { segment: 'Website Visitors', size: 12000 }
        },
        {
          id: 'step-5',
          title: 'Last Chance Email',
          description: 'Final push email 24 hours before enrollment closes',
          type: 'email',
          status: 'pending',
          scheduledFor: new Date('2025-08-31T09:00:00'),
          audience: { segment: 'Engaged Prospects', size: 2400 }
        }
      ],
      createdAt: new Date('2025-08-20')
    },
    {
      id: '2',
      name: 'Digital Ministry Leadership Summit',
      product: 'Virtual Leadership Summit 2025',
      type: 'event',
      status: 'scheduled',
      launchDate: new Date('2025-09-15'),
      duration: 21,
      goal: {
        metric: 'attendees',
        target: 500,
        current: 0
      },
      budget: 3000,
      steps: [
        {
          id: 'event-step-1',
          title: 'Save the Date Announcement',
          description: 'Initial announcement to build anticipation',
          type: 'email',
          status: 'pending',
          scheduledFor: new Date('2025-09-02T10:00:00'),
          audience: { segment: 'Email Subscribers', size: 8900 }
        }
      ],
      createdAt: new Date('2025-08-24')
    }
  ])

  const templates: LaunchTemplate[] = [
    {
      id: 'template-1',
      name: 'Course Launch Sequence',
      type: 'course',
      description: 'Complete 14-day course launch with pre-launch, launch, and follow-up phases',
      duration: 14,
      stepCount: 12,
      tags: ['email-heavy', 'content-marketing', 'partnerships'],
      preview: [
        {
          id: 'preview-1',
          title: 'Pre-launch Announcement',
          description: 'Build anticipation 7 days before launch',
          type: 'email',
          status: 'pending',
          scheduledFor: new Date(),
          audience: { segment: 'Email List', size: 0 }
        },
        {
          id: 'preview-2',
          title: 'Social Media Campaign',
          description: 'Multi-platform social strategy',
          type: 'social',
          status: 'pending',
          scheduledFor: new Date(),
          audience: { segment: 'Social Followers', size: 0 }
        }
      ]
    },
    {
      id: 'template-2',
      name: 'Book Launch Campaign',
      type: 'book',
      description: 'Comprehensive book launch with media outreach and content marketing',
      duration: 21,
      stepCount: 15,
      tags: ['pr-focused', 'content-heavy', 'media-outreach'],
      preview: [
        {
          id: 'book-preview-1',
          title: 'Media Kit Distribution',
          description: 'Send press materials to media contacts',
          type: 'pr',
          status: 'pending',
          scheduledFor: new Date(),
          audience: { segment: 'Media Contacts', size: 0 }
        }
      ]
    },
    {
      id: 'template-3',
      name: 'Event Promotion Sequence',
      type: 'event',
      description: 'Multi-phase event promotion with early bird and last-chance campaigns',
      duration: 30,
      stepCount: 18,
      tags: ['event-focused', 'early-bird', 'partnerships'],
      preview: [
        {
          id: 'event-preview-1',
          title: 'Early Bird Announcement',
          description: 'Launch early bird registration',
          type: 'email',
          status: 'pending',
          scheduledFor: new Date(),
          audience: { segment: 'Event Subscribers', size: 0 }
        }
      ]
    }
  ]

  const toggleCampaign = (campaignId: string) => {
    setExpandedCampaigns(prev => {
      const newSet = new Set(prev)
      if (newSet.has(campaignId)) {
        newSet.delete(campaignId)
      } else {
        newSet.add(campaignId)
      }
      return newSet
    })
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    const matchesSearch = !searchQuery || 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.product.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  const upcomingSteps = campaigns
    .flatMap(campaign => campaign.steps.map(step => ({ ...step, campaignName: campaign.name, campaignId: campaign.id })))
    .filter(step => step.status === 'scheduled' || step.status === 'pending')
    .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
    .slice(0, 10)

  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const totalSteps = campaigns.reduce((acc, c) => acc + c.steps.length, 0)
  const completedSteps = campaigns.reduce((acc, c) => acc + c.steps.filter(s => s.status === 'completed').length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Launch Agent</h2>
          <p className="-foreground">Create and manage product launch campaigns with automated sequences</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Campaigns</p>
              <p className="text-2xl font-bold text-foreground">{totalCampaigns}</p>
            </div>
            <Rocket className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Active Launches</p>
              <p className="text-2xl font-bold text-foreground">{activeCampaigns}</p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Steps Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedSteps}/{totalSteps}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-foreground">84%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'campaigns', label: 'Active Campaigns', icon: Rocket },
            { id: 'templates', label: 'Templates', icon: FileText },
            { id: 'calendar', label: 'Schedule', icon: Calendar },
            { id: 'analytics', label: 'Performance', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'campaigns' && activeCampaigns > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                    {activeCampaigns}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            {/* Campaigns List */}
            <div className="space-y-4">
              {filteredCampaigns.map(campaign => (
                <div key={campaign.id} className="bg-background border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => toggleCampaign(campaign.id)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            {expandedCampaigns.has(campaign.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          <ProductTypeIcon type={campaign.type} />
                          <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                          <StatusBadge status={campaign.status} />
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Launch: {formatDate(campaign.launchDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            {campaign.duration} days
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            Budget: {formatCurrency(campaign.budget)}
                          </span>
                          <span>{campaign.steps.length} steps</span>
                        </div>

                        {/* Goal Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              {campaign.goal.metric.charAt(0).toUpperCase() + campaign.goal.metric.slice(1)} Goal
                            </span>
                            <span className="text-sm">
                              {campaign.goal.current} / {campaign.goal.target}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${calculateProgress(campaign.goal)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>{Math.round(calculateProgress(campaign.goal))}% complete</span>
                            <span>{campaign.goal.target - campaign.goal.current} remaining</span>
                          </div>
                        </div>

                        {/* Step Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-lg font-bold text-green-600">
                              {campaign.steps.filter(s => s.status === 'completed').length}
                            </p>
                            <p className="text-xs">Completed</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-lg font-bold text-blue-600">
                              {campaign.steps.filter(s => s.status === 'scheduled').length}
                            </p>
                            <p className="text-xs">Scheduled</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-lg font-bold text-yellow-600">
                              {campaign.steps.filter(s => s.status === 'pending').length}
                            </p>
                            <p className="text-xs">Pending</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-lg font-bold text-red-600">
                              {campaign.steps.filter(s => s.status === 'failed').length}
                            </p>
                            <p className="text-xs">Failed</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button className="btn-outline text-sm flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {expandedCampaigns.has(campaign.id) && (
                    <div className="border-t border-border bg-muted/30 p-6">
                      <h4 className="font-semibold text-foreground mb-4">Launch Steps</h4>
                      <div className="space-y-3">
                        {campaign.steps.map(step => (
                          <div key={step.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <StepTypeIcon type={step.type} />
                                <StatusBadge status={step.status} />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-sm text-foreground">{step.title}</h5>
                                <p className="text-xs">{step.description}</p>
                                <div className="flex items-center gap-3 text-xs mt-1">
                                  <span>📅 {formatDate(step.scheduledFor)}</span>
                                  <span>👥 {step.audience.segment} ({step.audience.size.toLocaleString()})</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {step.metrics && (
                                <div className="text-right text-xs mr-4">
                                  {step.metrics.sent && <div>Sent: {step.metrics.sent.toLocaleString()}</div>}
                                  {step.metrics.opened && <div>Opened: {step.metrics.opened.toLocaleString()}</div>}
                                  {step.metrics.converted && <div>Converted: {step.metrics.converted}</div>}
                                </div>
                              )}
                              
                              {step.status === 'pending' && (
                                <button
                                  onClick={() => onSendStep?.(campaign.id, step.id)}
                                  className="btn-sm btn-primary"
                                >
                                  Send Now
                                </button>
                              )}
                              
                              <button className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors">
                                <Edit3 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredCampaigns.length === 0 && (
                <div className="bg-background border border-border rounded-lg p-12 text-center">
                  <Rocket className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No campaigns found</p>
                  <p className="-foreground mb-6">
                    Create your first launch campaign to start automating your product launches
                  </p>
                  <button className="btn-primary">Create Campaign</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Launch Templates</h3>
              <button className="btn-outline flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Template
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ProductTypeIcon type={template.type} />
                      <h4 className="font-semibold text-foreground">{template.name}</h4>
                    </div>
                    <span className="text-xs capitalize">{template.type}</span>
                  </div>
                  
                  <p className="text-sm mb-4">{template.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{template.duration}</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{template.stepCount}</div>
                      <div className="text-xs">Steps</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h5 className="text-xs font-medium text-foreground">Sample Steps:</h5>
                    {template.preview.map(step => (
                      <div key={step.id} className="flex items-center gap-2 text-xs">
                        <StepTypeIcon type={step.type} />
                        <span>{step.title}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => onCreateCampaign?.(template)}
                    className="w-full btn-primary"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Upcoming Steps</h3>
              <button className="btn-outline flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                View Full Calendar
              </button>
            </div>

            <div className="space-y-3">
              {upcomingSteps.map(step => (
                <div key={step.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <StepTypeIcon type={step.type} />
                        <StatusBadge status={step.status} />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-foreground">{step.title}</h4>
                        <div className="flex items-center gap-3 text-xs">
                          <span>📅 {formatDate(step.scheduledFor)}</span>
                          <span>🎯 {step.campaignName}</span>
                          <span>👥 {step.audience.size.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onScheduleStep?.(step.campaignId, step.id, new Date())}
                        className="btn-sm btn-outline"
                      >
                        Reschedule
                      </button>
                      {step.status === 'pending' && (
                        <button
                          onClick={() => onSendStep?.(step.campaignId, step.id)}
                          className="btn-sm btn-primary"
                        >
                          Send Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {upcomingSteps.length === 0 && (
                <div className="bg-background border border-border rounded-lg p-8 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-3" />
                  <p className="text-lg font-semibold mb-2">No upcoming steps</p>
                  <p className="-foreground">All scheduled steps have been completed or there are no active campaigns</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">74%</div>
                <div className="text-sm">Campaign Success Rate</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">3.2K</div>
                <div className="text-sm">Total Conversions</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">{formatCurrency(94500)}</div>
                <div className="text-sm">Revenue Generated</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">6.8%</div>
                <div className="text-sm">Avg. Conversion Rate</div>
              </div>
            </div>

            {/* Top Performing Campaigns */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Top Performing Campaigns</h3>
              <div className="space-y-3">
                {[
                  { name: 'Church Leadership Course Launch', conversions: 187, revenue: 24750, rate: 7.4 },
                  { name: 'Missional Thinking Workshop', conversions: 156, revenue: 19500, rate: 8.9 },
                  { name: 'Digital Ministry Summit', conversions: 342, revenue: 27300, rate: 6.8 }
                ].map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-foreground">{campaign.name}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span>{campaign.conversions} conversions</span>
                        <span>{formatCurrency(campaign.revenue)} revenue</span>
                        <span>{campaign.rate}% conversion rate</span>
                      </div>
                    </div>
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
