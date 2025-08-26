'use client'

import { useState } from 'react'
import { 
  Calendar, Clock, Send, Eye, Edit3, Trash2, Plus, 
  Filter, Search, ChevronLeft, ChevronRight, CheckCircle,
  AlertCircle, Circle, Pause, Play, MoreVertical, Copy,
  ExternalLink, Globe, Users, Lock, Crown, RefreshCw
} from 'lucide-react'

interface ScheduledContent {
  id: string
  title: string
  type: 'post' | 'article' | 'newsletter' | 'social'
  status: 'draft' | 'scheduled' | 'published' | 'failed' | 'paused'
  scheduledDate: Date
  publishDate?: Date
  author: string
  platforms: Platform[]
  tags: string[]
  excerpt?: string
  thumbnail?: string
  engagement?: {
    views: number
    likes: number
    shares: number
    comments: number
  }
}

interface Platform {
  id: string
  name: string
  icon: string
  status: 'pending' | 'published' | 'failed'
  publishedUrl?: string
  scheduledTime?: Date
}

interface ContentSchedulerProps {
  onEditContent?: (content: ScheduledContent) => void
  onDeleteContent?: (contentId: string) => void
  onCreateNew?: () => void
}

const StatusBadge = ({ status }: { status: ScheduledContent['status'] }) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    paused: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  }
  
  const icons = {
    draft: Circle,
    scheduled: Clock,
    published: CheckCircle,
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

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const getIconForPlatform = (name: string) => {
    switch (name.toLowerCase()) {
      case 'website':
        return <Globe className="h-4 w-4" />
      case 'newsletter':
        return <Send className="h-4 w-4" />
      case 'linkedin':
        return <Users className="h-4 w-4" />
      case 'twitter':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const statusColors = {
    pending: 'text-gray-400',
    published: 'text-green-500',
    failed: 'text-red-500'
  }

  return (
    <div className={`${statusColors[platform.status]} relative`} title={`${platform.name}: ${platform.status}`}>
      {getIconForPlatform(platform.name)}
      {platform.status === 'published' && platform.publishedUrl && (
        <a
          href={platform.publishedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -top-1 -right-1"
        >
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        </a>
      )}
    </div>
  )
}

export function ContentScheduler({
  onEditContent,
  onDeleteContent,
  onCreateNew
}: ContentSchedulerProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ScheduledContent['status'] | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ScheduledContent['type'] | 'all'>('all')

  // Mock data - replace with actual API calls
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([
    {
      id: '1',
      title: 'The Future of Church Leadership in Digital Age',
      type: 'article',
      status: 'scheduled',
      scheduledDate: new Date('2024-01-20T10:00:00'),
      author: 'Alan Hirsch',
      platforms: [
        { id: '1', name: 'Website', icon: 'globe', status: 'pending', scheduledTime: new Date('2024-01-20T10:00:00') },
        { id: '2', name: 'LinkedIn', icon: 'linkedin', status: 'pending', scheduledTime: new Date('2024-01-20T11:00:00') },
        { id: '3', name: 'Newsletter', icon: 'newsletter', status: 'pending', scheduledTime: new Date('2024-01-20T16:00:00') }
      ],
      tags: ['leadership', 'digital-transformation', 'church'],
      excerpt: 'Exploring how traditional church leadership must adapt to serve effectively in our increasingly digital world.',
      thumbnail: '/images/articles/digital-leadership.jpg'
    },
    {
      id: '2',
      title: 'Weekly Newsletter: Movement Updates',
      type: 'newsletter',
      status: 'published',
      scheduledDate: new Date('2024-01-15T08:00:00'),
      publishDate: new Date('2024-01-15T08:00:00'),
      author: 'Alan Hirsch',
      platforms: [
        { id: '4', name: 'Newsletter', icon: 'newsletter', status: 'published', publishedUrl: 'https://newsletter.alanhirsch.com/weekly-1' }
      ],
      tags: ['newsletter', 'updates'],
      excerpt: 'Weekly roundup of movement activities and upcoming events.',
      engagement: {
        views: 2500,
        likes: 85,
        shares: 23,
        comments: 12
      }
    },
    {
      id: '3',
      title: 'Podcast: Missional Church Renewal',
      type: 'post',
      status: 'failed',
      scheduledDate: new Date('2024-01-18T14:00:00'),
      author: 'Alan Hirsch',
      platforms: [
        { id: '5', name: 'Website', icon: 'globe', status: 'failed' },
        { id: '6', name: 'LinkedIn', icon: 'linkedin', status: 'failed' }
      ],
      tags: ['podcast', 'missional', 'church-renewal'],
      excerpt: 'Deep dive conversation about practical steps for missional church renewal.'
    }
  ])

  const filteredContent = scheduledContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter
    const matchesType = typeFilter === 'all' || content.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleRetry = (contentId: string) => {
    setScheduledContent(prev => prev.map(content => 
      content.id === contentId 
        ? { 
            ...content, 
            status: 'scheduled' as const,
            platforms: content.platforms.map(platform => ({ ...platform, status: 'pending' as const }))
          }
        : content
    ))
  }

  const handlePause = (contentId: string) => {
    setScheduledContent(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, status: 'paused' as const }
        : content
    ))
  }

  const handleResume = (contentId: string) => {
    setScheduledContent(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, status: 'scheduled' as const }
        : content
    ))
  }

  const handleDuplicate = (content: ScheduledContent) => {
    const duplicated: ScheduledContent = {
      ...content,
      id: Date.now().toString(),
      title: `Copy of ${content.title}`,
      status: 'draft',
      scheduledDate: new Date(),
      publishDate: undefined,
      engagement: undefined,
      platforms: content.platforms.map(p => ({ ...p, status: 'pending', publishedUrl: undefined }))
    }
    
    setScheduledContent(prev => [duplicated, ...prev])
  }

  const getUpcomingContent = () => {
    const now = new Date()
    return scheduledContent
      .filter(content => content.status === 'scheduled' && content.scheduledDate > now)
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
      .slice(0, 5)
  }

  const getContentStats = () => {
    const total = scheduledContent.length
    const scheduled = scheduledContent.filter(c => c.status === 'scheduled').length
    const published = scheduledContent.filter(c => c.status === 'published').length
    const failed = scheduledContent.filter(c => c.status === 'failed').length
    
    return { total, scheduled, published, failed }
  }

  const stats = getContentStats()
  const upcomingContent = getUpcomingContent()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Content</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">Upcoming Content</h3>
              <button
                onClick={onCreateNew}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Schedule New
              </button>
            </div>
            
            {upcomingContent.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p className="-foreground">No upcoming scheduled content</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingContent.map(content => (
                  <div key={content.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-xs">
                          {content.scheduledDate.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {content.scheduledDate.getDate()}
                        </div>
                        <div className="text-xs">
                          {content.scheduledDate.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-muted rounded">
                            {content.type}
                          </span>
                          <div className="flex items-center gap-1">
                            {content.platforms.map(platform => (
                              <PlatformIcon key={platform.id} platform={platform} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePause(content.id)}
                        className="p-2 hover:text-foreground rounded-md hover:bg-muted"
                        title="Pause"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEditContent?.(content)}
                        className="p-2 hover:text-foreground rounded-md hover:bg-muted"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Quick Schedule */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Quick Schedule</h3>
            <div className="space-y-3">
              <button
                onClick={onCreateNew}
                className="w-full text-left p-3 border border-dashed border-muted-foreground rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  <div>
                    <p className="font-medium text-sm">New Article</p>
                    <p className="text-xs">Schedule blog post</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={onCreateNew}
                className="w-full text-left p-3 border border-dashed border-muted-foreground rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5" />
                  <div>
                    <p className="font-medium text-sm">Newsletter</p>
                    <p className="text-xs">Schedule email</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={onCreateNew}
                className="w-full text-left p-3 border border-dashed border-muted-foreground rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <div>
                    <p className="font-medium text-sm">Social Post</p>
                    <p className="text-xs">Multi-platform</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-background border border-border rounded-lg">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-lg font-semibold">All Scheduled Content</h3>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ScheduledContent['status'] | 'all')}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="failed">Failed</option>
                <option value="paused">Paused</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as ScheduledContent['type'] | 'all')}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="post">Post</option>
                <option value="article">Article</option>
                <option value="newsletter">Newsletter</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {filteredContent.map(content => (
            <div key={content.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground truncate">{content.title}</h4>
                    <StatusBadge status={content.status} />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span>By {content.author}</span>
                    <span className="capitalize">{content.type}</span>
                    {content.status === 'scheduled' && (
                      <span>
                        Scheduled: {content.scheduledDate.toLocaleDateString()} at{' '}
                        {content.scheduledDate.toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </span>
                    )}
                    {content.publishDate && (
                      <span>Published: {content.publishDate.toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  {content.excerpt && (
                    <p className="text-sm mb-2 line-clamp-2">
                      {content.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Platforms:</span>
                      {content.platforms.map(platform => (
                        <PlatformIcon key={platform.id} platform={platform} />
                      ))}
                    </div>
                    
                    {content.engagement && (
                      <div className="flex items-center gap-3 text-xs">
                        <span>{content.engagement.views.toLocaleString()} views</span>
                        <span>{content.engagement.likes} likes</span>
                        <span>{content.engagement.shares} shares</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {content.status === 'failed' && (
                    <button
                      onClick={() => handleRetry(content.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                      title="Retry"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                  
                  {content.status === 'scheduled' && (
                    <button
                      onClick={() => handlePause(content.id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-colors"
                      title="Pause"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  )}
                  
                  {content.status === 'paused' && (
                    <button
                      onClick={() => handleResume(content.id)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
                      title="Resume"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDuplicate(content)}
                    className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => onEditContent?.(content)}
                    className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => onDeleteContent?.(content.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredContent.length === 0 && (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <p className="-foreground">No scheduled content found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
