'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, Users, Send, TrendingUp, BarChart3, Target,
  Plus, Search, Filter, Star, Download, Upload, Edit, Trash2,
  Eye, Settings, Copy, Share, Clock, Calendar, Zap,
  CheckCircle, AlertCircle, User, Globe, Link, Tag,
  FileText, Image, Video, Percent, DollarSign, Activity
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  type: 'newsletter' | 'promotional' | 'announcement' | 'course' | 'event'
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused'
  template: string
  content: string
  audience: string[]
  scheduledFor?: string
  sentAt?: string
  createdAt: string
  updatedAt: string
  stats: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    unsubscribed: number
    bounced: number
  }
  openRate: number
  clickRate: number
  revenue?: number
}

interface Subscriber {
  id: string
  email: string
  firstName?: string
  lastName?: string
  status: 'active' | 'unsubscribed' | 'bounced' | 'pending'
  source: string
  subscribedAt: string
  lastEngaged?: string
  tags: string[]
  segments: string[]
  preferences: {
    newsletter: boolean
    promotions: boolean
    events: boolean
    courses: boolean
  }
  customFields: Record<string, string>
  lifetimeValue: number
  engagementScore: number
}

interface EmailTemplate {
  id: string
  name: string
  category: 'newsletter' | 'promotional' | 'transactional' | 'welcome' | 'course'
  description: string
  thumbnail: string
  content: string
  variables: string[]
  createdAt: string
  updatedAt: string
  usageCount: number
}

interface AutomationWorkflow {
  id: string
  name: string
  description: string
  trigger: {
    type: 'subscription' | 'purchase' | 'course_enrollment' | 'tag_added' | 'date_based'
    conditions: Record<string, any>
  }
  actions: Array<{
    id: string
    type: 'send_email' | 'add_tag' | 'remove_tag' | 'wait' | 'segment'
    delay?: number
    emailTemplate?: string
    tags?: string[]
    conditions?: Record<string, any>
  }>
  status: 'active' | 'paused' | 'draft'
  stats: {
    triggered: number
    completed: number
    active: number
  }
  createdAt: string
  updatedAt: string
}

interface LeadMagnet {
  id: string
  name: string
  title: string
  description: string
  type: 'ebook' | 'checklist' | 'video' | 'course' | 'template'
  downloadUrl: string
  landingPageUrl: string
  formFields: Array<{
    name: string
    type: 'text' | 'email' | 'select' | 'checkbox'
    required: boolean
    options?: string[]
  }>
  conversions: number
  views: number
  conversionRate: number
  createdAt: string
}

const MOCK_CAMPAIGNS: EmailCampaign[] = [
  {
    id: '1',
    name: 'September Newsletter',
    subject: 'New Insights on Missional Leadership',
    type: 'newsletter',
    status: 'sent',
    template: 'newsletter-template',
    content: 'Newsletter content here...',
    audience: ['all-subscribers'],
    sentAt: '2025-09-15T10:00:00Z',
    createdAt: '2025-09-10T14:30:00Z',
    updatedAt: '2025-09-15T10:00:00Z',
    stats: {
      sent: 2456,
      delivered: 2398,
      opened: 1079,
      clicked: 324,
      unsubscribed: 12,
      bounced: 58
    },
    openRate: 45.0,
    clickRate: 13.2,
    revenue: 2350
  },
  {
    id: '2',
    name: 'Course Launch Announcement',
    subject: 'New APEST Assessment Course Available',
    type: 'course',
    status: 'scheduled',
    template: 'promotional-template',
    content: 'Course announcement content...',
    audience: ['course-interested'],
    scheduledFor: '2025-09-25T09:00:00Z',
    createdAt: '2025-09-18T11:45:00Z',
    updatedAt: '2025-09-19T09:20:00Z',
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0
    },
    openRate: 0,
    clickRate: 0
  },
  {
    id: '3',
    name: 'Special Book Discount',
    subject: '25% Off All Books This Week Only',
    type: 'promotional',
    status: 'draft',
    template: 'promotional-template',
    content: 'Discount promotion content...',
    audience: ['book-buyers'],
    createdAt: '2025-09-19T08:15:00Z',
    updatedAt: '2025-09-19T08:15:00Z',
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0
    },
    openRate: 0,
    clickRate: 0
  }
]

const MOCK_SUBSCRIBERS: Subscriber[] = [
  {
    id: '1',
    email: 'john.smith@example.com',
    firstName: 'John',
    lastName: 'Smith',
    status: 'active',
    source: 'website-signup',
    subscribedAt: '2024-06-15T10:30:00Z',
    lastEngaged: '2025-09-15T14:20:00Z',
    tags: ['vip', 'course-buyer'],
    segments: ['high-engagement', 'leadership-focus'],
    preferences: {
      newsletter: true,
      promotions: true,
      events: true,
      courses: true
    },
    customFields: {
      church_size: '100-500',
      role: 'pastor'
    },
    lifetimeValue: 450.00,
    engagementScore: 85
  },
  {
    id: '2',
    email: 'maria.garcia@example.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    status: 'active',
    source: 'lead-magnet',
    subscribedAt: '2025-09-10T16:45:00Z',
    lastEngaged: '2025-09-18T09:10:00Z',
    tags: ['new-subscriber'],
    segments: ['new-users'],
    preferences: {
      newsletter: true,
      promotions: false,
      events: true,
      courses: true
    },
    customFields: {
      church_size: '50-100',
      role: 'ministry-leader'
    },
    lifetimeValue: 0.00,
    engagementScore: 65
  }
]

const MOCK_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Monthly Newsletter',
    category: 'newsletter',
    description: 'Clean, professional newsletter template',
    thumbnail: '/images/templates/newsletter.jpg',
    content: 'Template HTML content...',
    variables: ['subscriber_name', 'unsubscribe_link'],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-09-01T14:30:00Z',
    usageCount: 12
  },
  {
    id: '2',
    name: 'Course Promotion',
    category: 'promotional',
    description: 'Eye-catching promotional template for courses',
    thumbnail: '/images/templates/promotion.jpg',
    content: 'Promotional template HTML...',
    variables: ['subscriber_name', 'course_name', 'discount_code'],
    createdAt: '2025-02-10T15:20:00Z',
    updatedAt: '2025-08-15T11:45:00Z',
    usageCount: 8
  }
]

const MOCK_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: '1',
    name: 'Welcome Series',
    description: 'Onboard new subscribers with a 5-email series',
    trigger: {
      type: 'subscription',
      conditions: { source: 'any' }
    },
    actions: [
      { id: '1', type: 'send_email', emailTemplate: 'welcome-email' },
      { id: '2', type: 'wait', delay: 3 },
      { id: '3', type: 'send_email', emailTemplate: 'introduction-email' },
      { id: '4', type: 'wait', delay: 7 },
      { id: '5', type: 'send_email', emailTemplate: 'resource-email' }
    ],
    status: 'active',
    stats: {
      triggered: 156,
      completed: 124,
      active: 32
    },
    createdAt: '2025-01-20T09:15:00Z',
    updatedAt: '2025-09-01T16:30:00Z'
  },
  {
    id: '2',
    name: 'Course Completion Follow-up',
    description: 'Follow up with students who complete courses',
    trigger: {
      type: 'course_enrollment',
      conditions: { status: 'completed' }
    },
    actions: [
      { id: '1', type: 'wait', delay: 1 },
      { id: '2', type: 'send_email', emailTemplate: 'completion-congratulations' },
      { id: '3', type: 'add_tag', tags: ['course-graduate'] },
      { id: '4', type: 'wait', delay: 7 },
      { id: '5', type: 'send_email', emailTemplate: 'next-course-recommendation' }
    ],
    status: 'active',
    stats: {
      triggered: 45,
      completed: 38,
      active: 7
    },
    createdAt: '2025-03-15T11:20:00Z',
    updatedAt: '2025-09-10T14:15:00Z'
  }
]

const MOCK_LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: '1',
    name: 'APEST Assessment Guide',
    title: 'Discover Your Five-Fold Ministry Gifts',
    description: 'Complete guide to understanding and applying the APEST framework',
    type: 'ebook',
    downloadUrl: '/downloads/apest-guide.pdf',
    landingPageUrl: '/lead-magnets/apest-assessment',
    formFields: [
      { name: 'email', type: 'email', required: true },
      { name: 'firstName', type: 'text', required: true },
      { name: 'churchRole', type: 'select', required: false, options: ['Pastor', 'Ministry Leader', 'Church Member', 'Other'] }
    ],
    conversions: 234,
    views: 1876,
    conversionRate: 12.5,
    createdAt: '2025-06-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Church Planting Checklist',
    title: 'Essential Steps for Organic Church Planting',
    description: '50-point checklist for successful church multiplication',
    type: 'checklist',
    downloadUrl: '/downloads/church-planting-checklist.pdf',
    landingPageUrl: '/lead-magnets/church-planting-checklist',
    formFields: [
      { name: 'email', type: 'email', required: true },
      { name: 'firstName', type: 'text', required: true },
      { name: 'lastName', type: 'text', required: false }
    ],
    conversions: 156,
    views: 2340,
    conversionRate: 6.7,
    createdAt: '2025-07-15T14:30:00Z'
  }
]

export function ComprehensiveMarketingTools() {
  const [activeTab, setActiveTab] = useState('overview')
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(MOCK_CAMPAIGNS)
  const [subscribers, setSubscribers] = useState<Subscriber[]>(MOCK_SUBSCRIBERS)
  const [templates, setTemplates] = useState<EmailTemplate[]>(MOCK_TEMPLATES)
  const [automations, setAutomations] = useState<AutomationWorkflow[]>(MOCK_AUTOMATIONS)
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>(MOCK_LEAD_MAGNETS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': case 'active': case 'delivered': return 'bg-green-100 text-green-800'
      case 'sending': case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': case 'paused': case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'unsubscribed': case 'bounced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalSubscribers = () => {
    return subscribers.filter(s => s.status === 'active').length
  }

  const getEngagementRate = () => {
    const sentCampaigns = campaigns.filter(c => c.status === 'sent')
    if (sentCampaigns.length === 0) return 0
    
    const totalOpens = sentCampaigns.reduce((sum, c) => sum + c.stats.opened, 0)
    const totalSent = sentCampaigns.reduce((sum, c) => sum + c.stats.sent, 0)
    
    return totalSent > 0 ? (totalOpens / totalSent) * 100 : 0
  }

  const getTotalRevenue = () => {
    return campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0)
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (subscriber.firstName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (subscriber.lastName?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Marketing Tools</h2>
          <p className="text-muted-foreground">
            Email campaigns, lead generation, automation workflows, and subscriber management
          </p>
        </div>
        <Button onClick={() => setShowCreateCampaign(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="lead-magnets">Lead Magnets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Subscribers</p>
                    <p className="text-2xl font-bold">{getTotalSubscribers().toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+12.5% this month</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold">{getEngagementRate().toFixed(1)}%</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+3.2% vs last month</span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Revenue</p>
                    <p className="text-2xl font-bold">{formatCurrency(getTotalRevenue())}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+18.7% this month</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Automations</p>
                    <p className="text-2xl font-bold">{automations.filter(a => a.status === 'active').length}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-muted-foreground">Running workflows</span>
                    </div>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Latest email campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.slice(0, 5).map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        {campaign.status === 'sent' && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {campaign.openRate.toFixed(1)}% open rate
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Generation</CardTitle>
                <CardDescription>Top performing lead magnets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadMagnets.map((magnet) => (
                    <div key={magnet.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{magnet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {magnet.conversions} conversions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{magnet.conversionRate.toFixed(1)}%</p>
                        <p className="text-sm text-muted-foreground">
                          {magnet.views} views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="sending">Sending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campaigns Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {campaign.subject}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {campaign.stats.sent > 0 ? campaign.stats.sent.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell>
                      {campaign.stats.sent > 0 ? `${campaign.openRate.toFixed(1)}%` : '-'}
                    </TableCell>
                    <TableCell>
                      {campaign.stats.sent > 0 ? `${campaign.clickRate.toFixed(1)}%` : '-'}
                    </TableCell>
                    <TableCell>
                      {campaign.revenue ? formatCurrency(campaign.revenue) : '-'}
                    </TableCell>
                    <TableCell>
                      {campaign.sentAt 
                        ? formatDate(campaign.sentAt)
                        : campaign.scheduledFor 
                        ? formatDate(campaign.scheduledFor)
                        : formatDate(campaign.updatedAt)
                      }
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedCampaign(campaign)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {campaign.status === 'scheduled' && (
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send Now
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          {/* Subscriber Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>
          </div>

          {/* Subscribers Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subscriber</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>LTV</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {subscriber.firstName} {subscriber.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscriber.status)}>
                        {subscriber.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{subscriber.source}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={subscriber.engagementScore} className="w-16 h-2" />
                        <span className="text-sm">{subscriber.engagementScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(subscriber.lifetimeValue)}</TableCell>
                    <TableCell>{formatDate(subscriber.subscribedAt)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subscriber.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {subscriber.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{subscriber.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="h-4 w-4 mr-2" />
                            Manage Tags
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Email Templates</h3>
              <p className="text-sm text-muted-foreground">Create and manage reusable email templates</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Mail className="h-12 w-12 text-gray-400" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Category:</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Usage:</span>
                      <span>{template.usageCount} times</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Variables:</span>
                      <span>{template.variables.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Automation Workflows</h3>
              <p className="text-sm text-muted-foreground">Set up automated email sequences and triggers</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations.map((automation) => (
              <Card key={automation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{automation.name}</h3>
                      <p className="text-sm text-muted-foreground">{automation.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(automation.status)}>
                        {automation.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {automation.status === 'active' ? 'Pause' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Trigger:</span>
                      <Badge variant="outline">{automation.trigger.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Actions:</span>
                      <span>{automation.actions.length} steps</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{automation.stats.triggered}</p>
                        <p className="text-muted-foreground">Triggered</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{automation.stats.active}</p>
                        <p className="text-muted-foreground">Active</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{automation.stats.completed}</p>
                        <p className="text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lead-magnets" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Lead Magnets</h3>
              <p className="text-sm text-muted-foreground">Attract and convert visitors with valuable content offers</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Lead Magnet
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {leadMagnets.map((magnet) => (
              <Card key={magnet.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{magnet.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{magnet.description}</p>
                      <Badge variant="outline">{magnet.type}</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Landing Page
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{magnet.views}</p>
                        <p className="text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{magnet.conversions}</p>
                        <p className="text-muted-foreground">Conversions</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{magnet.conversionRate.toFixed(1)}%</p>
                        <p className="text-muted-foreground">Conv. Rate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Form Fields:</span>
                      <span>{magnet.formFields.length}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Link className="h-3 w-3 mr-1" />
                        View Page
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
                <CardDescription>Overall campaign metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average Open Rate</span>
                    <span className="font-medium">{getEngagementRate().toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Click Rate</span>
                    <span className="font-medium">8.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Unsubscribe Rate</span>
                    <span className="font-medium">0.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Revenue per Email</span>
                    <span className="font-medium">$1.23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
                <CardDescription>Subscriber growth and engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Monthly Growth Rate</span>
                    <span className="font-medium text-green-600">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Churn Rate</span>
                    <span className="font-medium">2.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Avg. Subscriber LTV</span>
                    <span className="font-medium">$156.78</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>List Health Score</span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Campaign Modal */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Email Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input placeholder="Enter campaign name" />
            </div>
            
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input placeholder="Enter email subject" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-subscribers">All Subscribers</SelectItem>
                  <SelectItem value="course-interested">Course Interested</SelectItem>
                  <SelectItem value="book-buyers">Book Buyers</SelectItem>
                  <SelectItem value="high-engagement">High Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateCampaign(false)}>
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedCampaign.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Campaign Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subject:</span>
                      <span className="font-medium">{selectedCampaign.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge variant="outline">{selectedCampaign.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedCampaign.status)}>
                        {selectedCampaign.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sent:</span>
                      <span className="font-medium">{selectedCampaign.stats.sent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivered:</span>
                      <span className="font-medium">{selectedCampaign.stats.delivered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Open Rate:</span>
                      <span className="font-medium">{selectedCampaign.openRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click Rate:</span>
                      <span className="font-medium">{selectedCampaign.clickRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedCampaign.revenue && (
                <div>
                  <h4 className="font-medium mb-3">Revenue</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedCampaign.revenue)}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Campaign
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}