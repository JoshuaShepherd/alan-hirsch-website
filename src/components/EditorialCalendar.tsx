'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Video,
  Mic,
  Image,
  Clock,
  Users,
  Target,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'blog' | 'video' | 'podcast' | 'social' | 'newsletter'
  status: 'idea' | 'planning' | 'writing' | 'review' | 'scheduled' | 'published'
  assignedTo: string
  dueDate: string
  publishDate?: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
  description: string
  estimatedTime: number // in hours
  completionPercentage: number
}

interface EditorialCalendarProps {
  onContentCreate?: (content: ContentItem) => void
  onContentEdit?: (content: ContentItem) => void
  onContentDelete?: (contentId: string) => void
}

// Mock data for demonstration
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'The Future of Church Leadership in Post-Christendom',
    type: 'blog',
    status: 'writing',
    assignedTo: 'Alan Hirsch',
    dueDate: '2024-03-25',
    publishDate: '2024-03-28',
    priority: 'high',
    tags: ['leadership', 'post-christendom', 'church'],
    description: 'Comprehensive analysis of leadership challenges and opportunities in secular contexts',
    estimatedTime: 8,
    completionPercentage: 65
  },
  {
    id: '2',
    title: 'APEST Framework Deep Dive - Video Series Episode 3',
    type: 'video',
    status: 'scheduled',
    assignedTo: 'Production Team',
    dueDate: '2024-03-22',
    publishDate: '2024-03-30',
    priority: 'medium',
    tags: ['APEST', 'video series', 'teaching'],
    description: 'Third episode focusing on the Teacher gift and its role in discipleship',
    estimatedTime: 12,
    completionPercentage: 100
  },
  {
    id: '3',
    title: 'Movement Stories: Revival in Eastern Europe',
    type: 'podcast',
    status: 'planning',
    assignedTo: 'Content Team',
    dueDate: '2024-03-27',
    publishDate: '2024-04-02',
    priority: 'medium',
    tags: ['movement stories', 'europe', 'revival'],
    description: 'Interview with church planting leaders about recent revival movements',
    estimatedTime: 6,
    completionPercentage: 20
  },
  {
    id: '4',
    title: 'Monthly Newsletter: March Missional Insights',
    type: 'newsletter',
    status: 'review',
    assignedTo: 'Editorial Team',
    dueDate: '2024-03-24',
    publishDate: '2024-03-26',
    priority: 'high',
    tags: ['newsletter', 'monthly', 'insights'],
    description: 'Monthly roundup of missional insights and partner organization updates',
    estimatedTime: 4,
    completionPercentage: 90
  },
  {
    id: '5',
    title: 'Social Media Campaign: 5Q Partnership Launch',
    type: 'social',
    status: 'idea',
    assignedTo: 'Marketing Team',
    dueDate: '2024-03-29',
    priority: 'low',
    tags: ['social media', '5Q', 'partnership'],
    description: 'Multi-platform campaign announcing enhanced partnership with 5Q Central',
    estimatedTime: 3,
    completionPercentage: 5
  }
]

const teamMembers = [
  'Alan Hirsch',
  'Production Team',
  'Content Team', 
  'Editorial Team',
  'Marketing Team'
]

export function EditorialCalendar({ 
  onContentCreate, 
  onContentEdit, 
  onContentDelete 
}: EditorialCalendarProps) {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month')
  const [filterType, setFilterType] = useState<'all' | 'blog' | 'video' | 'podcast' | 'social' | 'newsletter'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)

  // New content form state
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    title: '',
    type: 'blog',
    status: 'idea',
    assignedTo: '',
    dueDate: '',
    publishDate: '',
    priority: 'medium',
    tags: [],
    description: '',
    estimatedTime: 4,
    completionPercentage: 0
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'podcast': return <Mic className="w-4 h-4" />
      case 'social': return <Image className="w-4 h-4" />
      case 'newsletter': return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'video': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'podcast': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
      case 'newsletter': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'writing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'review': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredContent = content.filter(item => {
    const typeMatch = filterType === 'all' || item.type === filterType
    const statusMatch = filterStatus === 'all' || item.status === filterStatus
    return typeMatch && statusMatch
  })

  const getContentForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return filteredContent.filter(item => 
      item.dueDate === dateString || item.publishDate === dateString
    )
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const handleCreateContent = () => {
    if (newContent.title && newContent.assignedTo && newContent.dueDate) {
      const contentItem: ContentItem = {
        id: Date.now().toString(),
        title: newContent.title!,
        type: newContent.type as ContentItem['type'],
        status: newContent.status as ContentItem['status'],
        assignedTo: newContent.assignedTo!,
        dueDate: newContent.dueDate!,
        publishDate: newContent.publishDate,
        priority: newContent.priority as ContentItem['priority'],
        tags: newContent.tags || [],
        description: newContent.description || '',
        estimatedTime: newContent.estimatedTime || 4,
        completionPercentage: newContent.completionPercentage || 0
      }
      
      setContent([...content, contentItem])
      onContentCreate?.(contentItem)
      setShowCreateModal(false)
      setNewContent({
        title: '',
        type: 'blog',
        status: 'idea',
        assignedTo: '',
        dueDate: '',
        publishDate: '',
        priority: 'medium',
        tags: [],
        description: '',
        estimatedTime: 4,
        completionPercentage: 0
      })
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Editorial Calendar
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Plan and schedule content across all formats
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {content.filter(c => c.status === 'planning' || c.status === 'writing').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {content.filter(c => c.status === 'review').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {content.filter(c => c.status === 'scheduled').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {content.filter(c => c.status === 'published').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {content.filter(c => c.priority === 'high').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {new Set(content.map(c => c.assignedTo)).size}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blog">Blog Posts</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="podcast">Podcasts</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="idea">Ideas</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {viewMode === 'month' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-sm text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, index) => (
                <div 
                  key={index} 
                  className={`min-h-[120px] p-2 border border-gray-200 dark:border-gray-700 rounded ${
                    date ? 'bg-white dark:bg-gray-800' : ''
                  }`}
                >
                  {date && (
                    <>
                      <div className="font-medium text-sm mb-2">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getContentForDate(date).slice(0, 2).map(item => (
                          <div
                            key={item.id}
                            className={`text-xs p-1 rounded ${getTypeColor(item.type)} cursor-pointer`}
                            onClick={() => setEditingContent(item)}
                          >
                            <div className="flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              <span className="truncate">{item.title}</span>
                            </div>
                          </div>
                        ))}
                        {getContentForDate(date).length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{getContentForDate(date).length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle>Content Pipeline</CardTitle>
            <CardDescription>
              All content items sorted by due date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContent
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map(item => (
                <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(item.type)}>
                          {getTypeIcon(item.type)}
                          <span className="ml-1 capitalize">{item.type}</span>
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority} priority
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Assigned to: {item.assignedTo}</span>
                        <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        {item.publishDate && (
                          <span>Publish: {new Date(item.publishDate).toLocaleDateString()}</span>
                        )}
                        <span>{item.estimatedTime}h estimated</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.completionPercentage}%
                          </span>
                        </div>
                      </div>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingContent(item)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onContentDelete?.(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
              <CardDescription>
                Add a new content item to your editorial calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Content title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select 
                    value={newContent.type} 
                    onValueChange={(value: any) => setNewContent({ ...newContent, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newContent.description}
                  onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                  placeholder="Brief description of the content..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Assigned To</label>
                  <Select 
                    value={newContent.assignedTo} 
                    onValueChange={(value) => setNewContent({ ...newContent, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select person..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select 
                    value={newContent.priority} 
                    onValueChange={(value: any) => setNewContent({ ...newContent, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Estimated Hours</label>
                  <Input
                    type="number"
                    value={newContent.estimatedTime}
                    onChange={(e) => setNewContent({ ...newContent, estimatedTime: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Due Date</label>
                  <Input
                    type="date"
                    value={newContent.dueDate}
                    onChange={(e) => setNewContent({ ...newContent, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Publish Date (Optional)</label>
                  <Input
                    type="date"
                    value={newContent.publishDate}
                    onChange={(e) => setNewContent({ ...newContent, publishDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateContent}>
                  Create Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}