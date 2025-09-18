'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Megaphone, 
  Send, 
  Users, 
  Target,
  Calendar,
  Clock,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Globe,
  Mail,
  MessageSquare,
  Bell,
  Zap
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'product' | 'event' | 'urgent' | 'community'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'draft' | 'scheduled' | 'sent' | 'archived'
  channels: ('email' | 'sms' | 'push' | 'website' | 'social')[]
  targeting: {
    audience: 'all' | 'segments' | 'tags' | 'custom'
    segments?: string[]
    tags?: string[]
    customQuery?: string
  }
  scheduling: {
    sendNow: boolean
    scheduledDate?: string
    scheduledTime?: string
    timezone: string
  }
  statistics: {
    totalSent: number
    delivered: number
    opened: number
    clicked: number
    unsubscribed: number
  }
  createdAt: string
  createdBy: string
  sentAt?: string
}

const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'New Leadership Toolkit Available',
    content: 'We\'re excited to announce our new comprehensive Leadership Transformation Toolkit. This resource includes frameworks, assessments, and practical tools for missional leaders.',
    type: 'product',
    priority: 'high',
    status: 'sent',
    channels: ['email', 'website', 'social'],
    targeting: {
      audience: 'segments',
      segments: ['leadership-interested', 'premium-subscribers']
    },
    scheduling: {
      sendNow: false,
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00',
      timezone: 'America/New_York'
    },
    statistics: {
      totalSent: 5247,
      delivered: 5198,
      opened: 3519,
      clicked: 892,
      unsubscribed: 23
    },
    createdAt: '2024-01-14T10:30:00Z',
    createdBy: 'Alan Hirsch',
    sentAt: '2024-01-15T14:00:00Z'
  },
  {
    id: '2',
    title: 'Weekly Community Digest',
    content: 'This week in our community: New discussions on church planting, upcoming webinar on leadership development, and featured success stories from movement leaders worldwide.',
    type: 'community',
    priority: 'medium',
    status: 'scheduled',
    channels: ['email'],
    targeting: {
      audience: 'all'
    },
    scheduling: {
      sendNow: false,
      scheduledDate: '2024-01-22',
      scheduledTime: '08:00',
      timezone: 'America/New_York'
    },
    statistics: {
      totalSent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0
    },
    createdAt: '2024-01-20T15:45:00Z',
    createdBy: 'Community Team'
  },
  {
    id: '3',
    title: 'System Maintenance Notice',
    content: 'Scheduled maintenance will occur this Sunday from 2-4 AM EST. During this time, some features may be temporarily unavailable. We apologize for any inconvenience.',
    type: 'urgent',
    priority: 'urgent',
    status: 'draft',
    channels: ['email', 'push', 'website'],
    targeting: {
      audience: 'all'
    },
    scheduling: {
      sendNow: true,
      timezone: 'America/New_York'
    },
    statistics: {
      totalSent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0
    },
    createdAt: '2024-01-21T12:00:00Z',
    createdBy: 'Tech Team'
  }
]

const ANNOUNCEMENT_TYPES = [
  { value: 'general', label: 'General Update', icon: Megaphone, color: 'bg-blue-100 text-blue-800' },
  { value: 'product', label: 'Product News', icon: Zap, color: 'bg-green-100 text-green-800' },
  { value: 'event', label: 'Event Notice', icon: Calendar, color: 'bg-purple-100 text-purple-800' },
  { value: 'urgent', label: 'Urgent Alert', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
  { value: 'community', label: 'Community Update', icon: Users, color: 'bg-orange-100 text-orange-800' }
]

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
]

const CHANNELS = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'sms', label: 'SMS', icon: MessageSquare },
  { value: 'push', label: 'Push Notification', icon: Bell },
  { value: 'website', label: 'Website Banner', icon: Globe },
  { value: 'social', label: 'Social Media', icon: Users }
]

const AUDIENCE_SEGMENTS = [
  'all-subscribers',
  'premium-members',
  'leadership-interested',
  'church-planters',
  'movement-leaders',
  'new-subscribers',
  'engaged-users',
  'inactive-users'
]

const AUDIENCE_TAGS = [
  'workshop-attendee',
  'book-purchaser',
  'webinar-registered',
  'newsletter-subscriber',
  'community-member',
  'beta-tester',
  'ambassador',
  'partner-organization'
]

export default function AnnouncementSystem() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'preview'>('list')

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus
    const matchesType = filterType === 'all' || announcement.type === filterType
    const matchesSearch = searchQuery === '' || 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesType && matchesSearch
  })

  const createNewAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: '',
      content: '',
      type: 'general',
      priority: 'medium',
      status: 'draft',
      channels: ['email'],
      targeting: {
        audience: 'all'
      },
      scheduling: {
        sendNow: true,
        timezone: 'America/New_York'
      },
      statistics: {
        totalSent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      },
      createdAt: new Date().toISOString(),
      createdBy: 'Alan Hirsch'
    }
    
    setSelectedAnnouncement(newAnnouncement)
    setViewMode('create')
    setIsCreating(true)
  }

  const saveAnnouncement = (announcement: Announcement) => {
    if (isCreating) {
      setAnnouncements(prev => [...prev, announcement])
      setIsCreating(false)
    } else {
      setAnnouncements(prev => 
        prev.map(a => a.id === announcement.id ? announcement : a)
      )
    }
    setViewMode('list')
    setSelectedAnnouncement(null)
  }

  const sendAnnouncement = (announcementId: string) => {
    setAnnouncements(prev =>
      prev.map(announcement =>
        announcement.id === announcementId
          ? {
              ...announcement,
              status: 'sent',
              sentAt: new Date().toISOString(),
              statistics: {
                ...announcement.statistics,
                totalSent: 5000 + Math.floor(Math.random() * 2000),
                delivered: 4800 + Math.floor(Math.random() * 200)
              }
            }
          : announcement
      )
    )
  }

  const duplicateAnnouncement = (announcementId: string) => {
    const announcement = announcements.find(a => a.id === announcementId)
    if (!announcement) return

    const duplicate: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      title: `${announcement.title} (Copy)`,
      status: 'draft',
      statistics: {
        totalSent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      },
      createdAt: new Date().toISOString(),
      sentAt: undefined
    }

    setAnnouncements(prev => [...prev, duplicate])
  }

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId))
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Announcements</h1>
            <p className="text-gray-600">Create and manage community announcements</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {viewMode !== 'create' && (
              <>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
                <Button onClick={createNewAnnouncement}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'list' ? (
          <AnnouncementList
            announcements={filteredAnnouncements}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
            onEdit={(announcement) => {
              setSelectedAnnouncement(announcement)
              setViewMode('create')
              setIsCreating(false)
            }}
            onPreview={(announcement) => {
              setSelectedAnnouncement(announcement)
              setViewMode('preview')
            }}
            onSend={sendAnnouncement}
            onDuplicate={duplicateAnnouncement}
            onDelete={deleteAnnouncement}
          />
        ) : viewMode === 'create' ? (
          <AnnouncementEditor
            announcement={selectedAnnouncement}
            onSave={saveAnnouncement}
            onCancel={() => {
              setViewMode('list')
              setSelectedAnnouncement(null)
              setIsCreating(false)
            }}
          />
        ) : (
          <AnnouncementPreview
            announcement={selectedAnnouncement!}
            onBack={() => setViewMode('list')}
            onEdit={() => setViewMode('create')}
          />
        )}
      </div>
    </div>
  )
}

// Announcement List Component
function AnnouncementList({
  announcements,
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterType,
  onFilterTypeChange,
  onEdit,
  onPreview,
  onSend,
  onDuplicate,
  onDelete
}: {
  announcements: Announcement[]
  searchQuery: string
  onSearchChange: (query: string) => void
  filterStatus: string
  onFilterStatusChange: (status: string) => void
  filterType: string
  onFilterTypeChange: (type: string) => void
  onEdit: (announcement: Announcement) => void
  onPreview: (announcement: Announcement) => void
  onSend: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex h-full">
      {/* Sidebar Filters */}
      <div className="w-64 bg-gray-50 border-r p-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search announcements..."
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={filterStatus} onValueChange={onFilterStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select value={filterType} onValueChange={onFilterTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {ANNOUNCEMENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const announcementType = ANNOUNCEMENT_TYPES.find(t => t.value === announcement.type)
            const priority = PRIORITY_LEVELS.find(p => p.value === announcement.priority)
            
            return (
              <Card key={announcement.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={announcementType?.color}>
                          {announcementType?.label}
                        </Badge>
                        <Badge className={priority?.color}>
                          {priority?.label}
                        </Badge>
                        <Badge 
                          variant={
                            announcement.status === 'sent' ? 'default' :
                            announcement.status === 'scheduled' ? 'secondary' : 'outline'
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{announcement.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Created by {announcement.createdBy}</span>
                        <span>•</span>
                        <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{announcement.channels.length} channel{announcement.channels.length !== 1 ? 's' : ''}</span>
                        {announcement.statistics.totalSent > 0 && (
                          <>
                            <span>•</span>
                            <span>{announcement.statistics.totalSent.toLocaleString()} sent</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPreview(announcement)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(announcement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {announcement.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => onSend(announcement.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          
          {announcements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">Try adjusting your filters or create a new announcement</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Announcement Editor Component
function AnnouncementEditor({
  announcement,
  onSave,
  onCancel
}: {
  announcement: Announcement | null
  onSave: (announcement: Announcement) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Announcement>(
    announcement || {
      id: '',
      title: '',
      content: '',
      type: 'general',
      priority: 'medium',
      status: 'draft',
      channels: ['email'],
      targeting: { audience: 'all' },
      scheduling: { sendNow: true, timezone: 'America/New_York' },
      statistics: { totalSent: 0, delivered: 0, opened: 0, clicked: 0, unsubscribed: 0 },
      createdAt: new Date().toISOString(),
      createdBy: 'Alan Hirsch'
    }
  )

  const handleSave = () => {
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData)
    }
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {announcement ? 'Edit Announcement' : 'Create New Announcement'}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.title.trim() || !formData.content.trim()}>
                <Send className="h-4 w-4 mr-2" />
                {formData.scheduling.sendNow ? 'Send Now' : 'Schedule'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Announcement title..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Content</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Your announcement content..."
                      rows={8}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Targeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Audience</label>
                    <Select
                      value={formData.targeting.audience}
                      onValueChange={(value: any) => 
                        setFormData(prev => ({
                          ...prev,
                          targeting: { ...prev.targeting, audience: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers</SelectItem>
                        <SelectItem value="segments">Specific Segments</SelectItem>
                        <SelectItem value="tags">By Tags</SelectItem>
                        <SelectItem value="custom">Custom Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.targeting.audience === 'segments' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Segments</label>
                      <div className="space-y-2">
                        {AUDIENCE_SEGMENTS.map(segment => (
                          <div key={segment} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.targeting.segments?.includes(segment)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    targeting: {
                                      ...prev.targeting,
                                      segments: [...(prev.targeting.segments || []), segment]
                                    }
                                  }))
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    targeting: {
                                      ...prev.targeting,
                                      segments: prev.targeting.segments?.filter(s => s !== segment)
                                    }
                                  }))
                                }
                              }}
                            />
                            <label className="text-sm">{segment.replace('-', ' ')}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ANNOUNCEMENT_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITY_LEVELS.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {CHANNELS.map(channel => {
                      const Icon = channel.icon
                      return (
                        <div key={channel.value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.channels.includes(channel.value as any)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  channels: [...prev.channels, channel.value as any]
                                }))
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  channels: prev.channels.filter(c => c !== channel.value)
                                }))
                              }
                            }}
                          />
                          <Icon className="h-4 w-4" />
                          <label className="text-sm">{channel.label}</label>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.scheduling.sendNow}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          scheduling: { ...prev.scheduling, sendNow: checked }
                        }))
                      }
                    />
                    <label className="text-sm">Send immediately</label>
                  </div>

                  {!formData.scheduling.sendNow && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date</label>
                        <Input
                          type="date"
                          value={formData.scheduling.scheduledDate}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              scheduling: { ...prev.scheduling, scheduledDate: e.target.value }
                            }))
                          }
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Time</label>
                        <Input
                          type="time"
                          value={formData.scheduling.scheduledTime}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              scheduling: { ...prev.scheduling, scheduledTime: e.target.value }
                            }))
                          }
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Announcement Preview Component
function AnnouncementPreview({
  announcement,
  onBack,
  onEdit
}: {
  announcement: Announcement
  onBack: () => void
  onEdit: () => void
}) {
  const announcementType = ANNOUNCEMENT_TYPES.find(t => t.value === announcement.type)
  const priority = PRIORITY_LEVELS.find(p => p.value === announcement.priority)

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            ← Back to List
          </Button>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={announcementType?.color}>
                {announcementType?.label}
              </Badge>
              <Badge className={priority?.color}>
                {priority?.label}
              </Badge>
              <Badge variant="outline">
                {announcement.status}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold mb-6">{announcement.title}</h1>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg leading-relaxed">{announcement.content}</p>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-medium mb-2">Details</h3>
                  <p>Created by: {announcement.createdBy}</p>
                  <p>Created: {new Date(announcement.createdAt).toLocaleDateString()}</p>
                  {announcement.sentAt && (
                    <p>Sent: {new Date(announcement.sentAt).toLocaleDateString()}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Distribution</h3>
                  <p>Channels: {announcement.channels.join(', ')}</p>
                  <p>Audience: {announcement.targeting.audience}</p>
                  {announcement.statistics.totalSent > 0 && (
                    <p>Total sent: {announcement.statistics.totalSent.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>

            {announcement.statistics.totalSent > 0 && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Performance Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {announcement.statistics.delivered.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {announcement.statistics.opened.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {announcement.statistics.clicked.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Clicked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {((announcement.statistics.opened / announcement.statistics.delivered) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
