'use client'

import { useState } from 'react'
import { 
  BookOpen, Plus, Edit3, Trash2, Eye, Settings, Users,
  Calendar, Clock, BarChart3, TrendingUp, Search, Filter,
  ChevronRight, ChevronDown, GripVertical,
  Crown, Lock, Globe, Copy, ExternalLink, MoreVertical,
  FileText, Video, Headphones, Image as ImageIcon
} from 'lucide-react'

interface SeriesArticle {
  id: string
  title: string
  slug: string
  type: 'article' | 'video' | 'podcast' | 'image'
  status: 'draft' | 'published' | 'scheduled'
  publishDate?: Date
  scheduledDate?: Date
  wordCount?: number
  readingTime?: number
  views?: number
  engagement?: {
    likes: number
    shares: number
    comments: number
  }
  paywall?: 'none' | 'preview' | 'member' | 'premium'
}

interface ContentSeries {
  id: string
  title: string
  description: string
  slug: string
  status: 'draft' | 'active' | 'completed' | 'archived'
  visibility: 'public' | 'members' | 'premium'
  thumbnail?: string
  startDate?: Date
  endDate?: Date
  articles: SeriesArticle[]
  totalViews: number
  totalEngagement: number
  subscriberCount?: number
  tags: string[]
  author: string
  coAuthors?: string[]
}

interface SeriesManagerProps {
  onCreateSeries?: () => void
  onEditSeries?: (series: ContentSeries) => void
  onCreateArticle?: (seriesId: string) => void
  onEditArticle?: (seriesId: string, article: SeriesArticle) => void
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    archived: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    scheduled: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const VisibilityIcon = ({ visibility }: { visibility: ContentSeries['visibility'] }) => {
  const icons = {
    public: <Globe className="h-4 w-4 text-green-600" />,
    members: <Users className="h-4 w-4 text-blue-600" />,
    premium: <Crown className="h-4 w-4 text-purple-600" />
  }
  
  return (
    <div title={`${visibility} access`}>
      {icons[visibility]}
    </div>
  )
}

const ContentTypeIcon = ({ type }: { type: SeriesArticle['type'] }) => {
  const icons = {
    article: <FileText className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    podcast: <Headphones className="h-4 w-4" />,
    image: <ImageIcon className="h-4 w-4" />
  }
  
  return icons[type] || <FileText className="h-4 w-4" />
}

const PaywallIcon = ({ paywall }: { paywall: SeriesArticle['paywall'] }) => {
  if (paywall === 'none' || !paywall) return null
  
  const colors = {
    preview: 'text-yellow-600',
    member: 'text-blue-600',
    premium: 'text-purple-600'
  }
  
  return (
    <div title={`${paywall} paywall`}>
      <Crown className={`h-3 w-3 ${colors[paywall]}`} />
    </div>
  )
}

export function SeriesManager({
  onCreateSeries,
  onEditSeries,
  onCreateArticle,
  onEditArticle
}: SeriesManagerProps) {
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ContentSeries['status']>('all')
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | ContentSeries['visibility']>('all')
  
  // Mock data - replace with actual API calls
  const [series, setSeries] = useState<ContentSeries[]>([
    {
      id: '1',
      title: 'Missional Church Leadership Series',
      description: 'A comprehensive exploration of leadership principles for the missional church movement, covering theology, practice, and cultural transformation.',
      slug: 'missional-church-leadership',
      status: 'active',
      visibility: 'public',
      thumbnail: '/images/series/missional-leadership.jpg',
      startDate: new Date('2024-01-01'),
      articles: [
        {
          id: '1-1',
          title: 'Foundations of Missional Leadership',
          slug: 'foundations-of-missional-leadership',
          type: 'article',
          status: 'published',
          publishDate: new Date('2024-01-05'),
          wordCount: 2500,
          readingTime: 12,
          views: 1250,
          engagement: { likes: 45, shares: 18, comments: 23 },
          paywall: 'none'
        },
        {
          id: '1-2',
          title: 'Cultural Context and Leadership',
          slug: 'cultural-context-and-leadership',
          type: 'article',
          status: 'published',
          publishDate: new Date('2024-01-12'),
          wordCount: 2800,
          readingTime: 14,
          views: 980,
          engagement: { likes: 38, shares: 12, comments: 19 },
          paywall: 'preview'
        },
        {
          id: '1-3',
          title: 'Practical Leadership Strategies',
          slug: 'practical-leadership-strategies',
          type: 'article',
          status: 'scheduled',
          scheduledDate: new Date('2024-01-19'),
          wordCount: 3200,
          readingTime: 16,
          paywall: 'member'
        },
        {
          id: '1-4',
          title: 'Leadership in Digital Age',
          slug: 'leadership-in-digital-age',
          type: 'video',
          status: 'draft',
          wordCount: 0,
          paywall: 'premium'
        }
      ],
      totalViews: 2230,
      totalEngagement: 155,
      subscriberCount: 450,
      tags: ['leadership', 'missional', 'church'],
      author: 'Alan Hirsch',
      coAuthors: ['Dave Ferguson', 'Neil Cole']
    },
    {
      id: '2',
      title: 'Church Planting Movement',
      description: 'Essential insights and practical guidance for starting and scaling church planting movements in contemporary contexts.',
      slug: 'church-planting-movement',
      status: 'draft',
      visibility: 'members',
      startDate: new Date('2024-02-01'),
      articles: [
        {
          id: '2-1',
          title: 'Movement Principles',
          slug: 'movement-principles',
          type: 'article',
          status: 'draft',
          wordCount: 1800,
          readingTime: 9,
          paywall: 'member'
        },
        {
          id: '2-2',
          title: 'Multiplication Strategies',
          slug: 'multiplication-strategies',
          type: 'podcast',
          status: 'draft',
          paywall: 'member'
        }
      ],
      totalViews: 0,
      totalEngagement: 0,
      subscriberCount: 125,
      tags: ['church-planting', 'movement', 'multiplication'],
      author: 'Alan Hirsch'
    }
  ])

  const filteredSeries = series.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    const matchesVisibility = visibilityFilter === 'all' || s.visibility === visibilityFilter
    
    return matchesSearch && matchesStatus && matchesVisibility
  })

  const toggleSeries = (seriesId: string) => {
    setExpandedSeries(prev => {
      const newSet = new Set(prev)
      if (newSet.has(seriesId)) {
        newSet.delete(seriesId)
      } else {
        newSet.add(seriesId)
      }
      return newSet
    })
  }

  const handleDeleteSeries = (seriesId: string) => {
    if (confirm('Are you sure you want to delete this series? This action cannot be undone.')) {
      setSeries(prev => prev.filter(s => s.id !== seriesId))
    }
  }

  const handleDeleteArticle = (seriesId: string, articleId: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setSeries(prev => prev.map(s => 
        s.id === seriesId 
          ? { ...s, articles: s.articles.filter(a => a.id !== articleId) }
          : s
      ))
    }
  }

  const handleDuplicateSeries = (series: ContentSeries) => {
    const duplicated: ContentSeries = {
      ...series,
      id: Date.now().toString(),
      title: `Copy of ${series.title}`,
      slug: `copy-of-${series.slug}`,
      status: 'draft',
      totalViews: 0,
      totalEngagement: 0,
      subscriberCount: 0,
      articles: series.articles.map(article => ({
        ...article,
        id: `${Date.now()}-${article.id}`,
        status: 'draft' as const,
        views: 0,
        engagement: { likes: 0, shares: 0, comments: 0 }
      }))
    }
    
    setSeries(prev => [duplicated, ...prev])
  }

  const getSeriesStats = () => {
    const total = series.length
    const active = series.filter(s => s.status === 'active').length
    const completed = series.filter(s => s.status === 'completed').length
    const totalArticles = series.reduce((sum, s) => sum + s.articles.length, 0)
    
    return { total, active, completed, totalArticles }
  }

  const stats = getSeriesStats()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Series</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Active Series</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Articles</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalArticles}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onCreateSeries}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Series
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search series..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | ContentSeries['status'])}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value as 'all' | ContentSeries['visibility'])}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Access</option>
            <option value="public">Public</option>
            <option value="members">Members</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* Series List */}
      <div className="space-y-4">
        {filteredSeries.map(s => (
          <div key={s.id} className="bg-background border border-border rounded-lg overflow-hidden">
            {/* Series Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => toggleSeries(s.id)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {expandedSeries.has(s.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                    <StatusBadge status={s.status} />
                    <VisibilityIcon visibility={s.visibility} />
                  </div>
                  
                  <p className="-foreground mb-3 line-clamp-2">{s.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span>By {s.author}</span>
                    {s.coAuthors && s.coAuthors.length > 0 && (
                      <span>+ {s.coAuthors.length} co-author{s.coAuthors.length !== 1 ? 's' : ''}</span>
                    )}
                    <span>{s.articles.length} article{s.articles.length !== 1 ? 's' : ''}</span>
                    <span>{s.totalViews.toLocaleString()} total views</span>
                    {s.subscriberCount && (
                      <span>{s.subscriberCount} subscribers</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {s.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-muted text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onCreateArticle?.(s.id)}
                    className="btn-outline text-sm flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Article
                  </button>
                  
                  <button
                    onClick={() => handleDuplicateSeries(s)}
                    className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    title="Duplicate Series"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => onEditSeries?.(s)}
                    className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    title="Edit Series"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteSeries(s.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete Series"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Articles List */}
            {expandedSeries.has(s.id) && (
              <div className="border-t border-border bg-muted/30">
                <div className="p-4">
                  <div className="space-y-3">
                    {s.articles.map((article, index) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <GripVertical className="h-4 w-4 cursor-grab" />
                          </div>
                          
                          <ContentTypeIcon type={article.type} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">{article.title}</h4>
                              <StatusBadge status={article.status} />
                              <PaywallIcon paywall={article.paywall} />
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs mt-1">
                              {article.wordCount && (
                                <span>{article.wordCount.toLocaleString()} words</span>
                              )}
                              {article.readingTime && (
                                <span>{article.readingTime} min read</span>
                              )}
                              {article.views && (
                                <span>{article.views.toLocaleString()} views</span>
                              )}
                              {article.engagement && (
                                <span>
                                  {article.engagement.likes + article.engagement.shares + article.engagement.comments} interactions
                                </span>
                              )}
                              {article.publishDate && (
                                <span>Published {article.publishDate.toLocaleDateString()}</span>
                              )}
                              {article.scheduledDate && (
                                <span>Scheduled {article.scheduledDate.toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {article.status === 'published' && (
                            <button
                              className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                              title="View Published"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => onEditArticle?.(s.id, article)}
                            className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            title="Edit Article"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteArticle(s.id, article.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {s.articles.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="h-8 w-8 mx-auto mb-3" />
                        <p className="-foreground mb-3">No articles in this series yet</p>
                        <button
                          onClick={() => onCreateArticle?.(s.id)}
                          className="btn-outline text-sm flex items-center gap-2 mx-auto"
                        >
                          <Plus className="h-4 w-4" />
                          Add First Article
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredSeries.length === 0 && (
          <div className="bg-background border border-border rounded-lg p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">No series found</p>
            <p className="-foreground mb-6">
              Create your first content series to organize and manage related articles
            </p>
            <button
              onClick={onCreateSeries}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Create First Series
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
