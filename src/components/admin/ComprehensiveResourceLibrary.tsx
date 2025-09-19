'use client'

import { useState, useEffect } from 'react'
import { 
  FileText, FolderOpen, Download, Eye, Search, Filter, Star,
  Plus, Upload, Edit, Trash2, Link, Share, Lock, Unlock,
  Tag, Calendar, User, BarChart3, Settings, Copy, Archive,
  BookOpen, Video, Image, Music, File, ExternalLink,
  TrendingUp, Activity, Clock, Users, Target, Zap
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

interface Resource {
  id: string
  title: string
  description: string
  type: 'document' | 'video' | 'audio' | 'image' | 'ebook' | 'template' | 'worksheet' | 'presentation'
  category: {
    id: string
    name: string
    color: string
  }
  tags: string[]
  fileUrl: string
  fileName: string
  fileSize: number
  mimeType: string
  thumbnailUrl?: string
  visibility: 'public' | 'members' | 'premium' | 'private'
  accessLevel: 'free' | 'premium' | 'vip'
  downloadCount: number
  viewCount: number
  rating: number
  reviewCount: number
  author: {
    id: string
    name: string
    avatar?: string
  }
  featured: boolean
  createdAt: string
  updatedAt: string
  lastAccessedAt?: string
  metadata: {
    duration?: number
    pageCount?: number
    language?: string
    isbn?: string
    version?: string
  }
  analytics: {
    weeklyDownloads: number
    monthlyDownloads: number
    totalRevenue: number
    conversionRate: number
  }
}

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  parentId?: string
  resourceCount: number
  isPublic: boolean
  sortOrder: number
  createdAt: string
}

interface Collection {
  id: string
  name: string
  description: string
  resourceIds: string[]
  visibility: 'public' | 'private'
  author: {
    id: string
    name: string
  }
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface AccessLog {
  id: string
  resourceId: string
  userId: string
  userName: string
  action: 'view' | 'download' | 'share'
  timestamp: string
  ipAddress: string
  userAgent: string
  source: string
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Books & Ebooks',
    description: 'Digital books and publications',
    color: 'bg-blue-100 text-blue-800',
    icon: 'BookOpen',
    resourceCount: 45,
    isPublic: true,
    sortOrder: 1,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Training Materials',
    description: 'Workshops, courses, and training resources',
    color: 'bg-green-100 text-green-800',
    icon: 'User',
    resourceCount: 32,
    isPublic: true,
    sortOrder: 2,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Templates & Tools',
    description: 'Practical templates and ministry tools',
    color: 'bg-purple-100 text-purple-800',
    icon: 'Settings',
    resourceCount: 28,
    isPublic: true,
    sortOrder: 3,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Presentations',
    description: 'Slide decks and presentation materials',
    color: 'bg-orange-100 text-orange-800',
    icon: 'FileText',
    resourceCount: 19,
    isPublic: true,
    sortOrder: 4,
    createdAt: '2025-01-01T00:00:00Z'
  }
]

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'The Forgotten Ways - Complete Guide',
    description: 'Comprehensive guide to rediscovering apostolic movement principles',
    type: 'ebook',
    category: {
      id: '1',
      name: 'Books & Ebooks',
      color: 'bg-blue-100 text-blue-800'
    },
    tags: ['missional', 'movement', 'apostolic', 'church-planting'],
    fileUrl: '/resources/forgotten-ways-guide.pdf',
    fileName: 'forgotten-ways-complete-guide.pdf',
    fileSize: 15728640, // 15MB
    mimeType: 'application/pdf',
    thumbnailUrl: '/images/resources/forgotten-ways-thumb.jpg',
    visibility: 'members',
    accessLevel: 'premium',
    downloadCount: 2847,
    viewCount: 8932,
    rating: 4.8,
    reviewCount: 127,
    author: {
      id: 'alan',
      name: 'Alan Hirsch',
      avatar: '/images/alan-hirsch.jpg'
    },
    featured: true,
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-09-20T14:30:00Z',
    lastAccessedAt: '2025-09-22T09:15:00Z',
    metadata: {
      pageCount: 487,
      language: 'English',
      version: '2.1'
    },
    analytics: {
      weeklyDownloads: 89,
      monthlyDownloads: 342,
      totalRevenue: 8541,
      conversionRate: 0.32
    }
  },
  {
    id: '2',
    title: 'APEST Assessment Tool',
    description: 'Interactive assessment for discovering five-fold ministry gifts',
    type: 'template',
    category: {
      id: '3',
      name: 'Templates & Tools',
      color: 'bg-purple-100 text-purple-800'
    },
    tags: ['apest', 'assessment', 'gifts', 'ministry'],
    fileUrl: '/resources/apest-assessment.xlsx',
    fileName: 'apest-assessment-tool.xlsx',
    fileSize: 2048000, // 2MB
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    visibility: 'public',
    accessLevel: 'free',
    downloadCount: 5673,
    viewCount: 12456,
    rating: 4.6,
    reviewCount: 234,
    author: {
      id: 'alan',
      name: 'Alan Hirsch'
    },
    featured: false,
    createdAt: '2025-01-20T11:30:00Z',
    updatedAt: '2025-08-15T16:45:00Z',
    lastAccessedAt: '2025-09-22T11:22:00Z',
    metadata: {
      version: '3.0',
      language: 'English'
    },
    analytics: {
      weeklyDownloads: 156,
      monthlyDownloads: 623,
      totalRevenue: 0,
      conversionRate: 0.45
    }
  },
  {
    id: '3',
    title: 'Church Planting Presentation',
    description: 'Key principles for organic church multiplication',
    type: 'presentation',
    category: {
      id: '4',
      name: 'Presentations',
      color: 'bg-orange-100 text-orange-800'
    },
    tags: ['church-planting', 'multiplication', 'organic'],
    fileUrl: '/resources/church-planting-slides.pptx',
    fileName: 'church-planting-principles.pptx',
    fileSize: 8388608, // 8MB
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    visibility: 'members',
    accessLevel: 'free',
    downloadCount: 1234,
    viewCount: 3456,
    rating: 4.4,
    reviewCount: 78,
    author: {
      id: 'sarah',
      name: 'Sarah Johnson'
    },
    featured: false,
    createdAt: '2025-05-10T14:00:00Z',
    updatedAt: '2025-09-05T10:20:00Z',
    metadata: {
      version: '1.2',
      language: 'English'
    },
    analytics: {
      weeklyDownloads: 34,
      monthlyDownloads: 128,
      totalRevenue: 0,
      conversionRate: 0.36
    }
  }
]

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    name: 'Missional Leadership Essentials',
    description: 'Core resources for developing missional leaders',
    resourceIds: ['1', '2'],
    visibility: 'public',
    author: {
      id: 'alan',
      name: 'Alan Hirsch'
    },
    featured: true,
    createdAt: '2025-06-01T12:00:00Z',
    updatedAt: '2025-09-15T09:30:00Z'
  },
  {
    id: '2',
    name: 'Church Planting Toolkit',
    description: 'Everything you need to start and multiply churches',
    resourceIds: ['2', '3'],
    visibility: 'public',
    author: {
      id: 'sarah',
      name: 'Sarah Johnson'
    },
    featured: false,
    createdAt: '2025-07-20T15:45:00Z',
    updatedAt: '2025-09-10T11:15:00Z'
  }
]

const MOCK_ACCESS_LOGS: AccessLog[] = [
  {
    id: '1',
    resourceId: '1',
    userId: 'user123',
    userName: 'John Smith',
    action: 'download',
    timestamp: '2025-09-22T09:15:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    source: 'website'
  },
  {
    id: '2',
    resourceId: '2',
    userId: 'user456',
    userName: 'Maria Garcia',
    action: 'view',
    timestamp: '2025-09-22T08:30:00Z',
    ipAddress: '192.168.1.200',
    userAgent: 'Mozilla/5.0...',
    source: 'mobile_app'
  }
]

export function ComprehensiveResourceLibrary() {
  const [activeTab, setActiveTab] = useState('overview')
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES)
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES)
  const [collections, setCollections] = useState<Collection[]>(MOCK_COLLECTIONS)
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(MOCK_ACCESS_LOGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [accessFilter, setAccessFilter] = useState<string>('all')
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': case 'ebook': return <FileText className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'audio': return <Music className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'presentation': return <FileText className="h-4 w-4" />
      case 'template': case 'worksheet': return <File className="h-4 w-4" />
      default: return <File className="h-4 w-4" />
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'vip': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Unlock className="h-3 w-3" />
      case 'private': return <Lock className="h-3 w-3" />
      default: return <Users className="h-3 w-3" />
    }
  }

  const getTotalDownloads = () => {
    return resources.reduce((sum, resource) => sum + resource.downloadCount, 0)
  }

  const getTotalViews = () => {
    return resources.reduce((sum, resource) => sum + resource.viewCount, 0)
  }

  const getTotalRevenue = () => {
    return resources.reduce((sum, resource) => sum + resource.analytics.totalRevenue, 0)
  }

  const getAverageRating = () => {
    const totalRating = resources.reduce((sum, resource) => sum + resource.rating, 0)
    return resources.length > 0 ? totalRating / resources.length : 0
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || resource.category.id === categoryFilter
    const matchesType = typeFilter === 'all' || resource.type === typeFilter
    const matchesAccess = accessFilter === 'all' || resource.accessLevel === accessFilter
    return matchesSearch && matchesCategory && matchesType && matchesAccess
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resource Library</h2>
          <p className="text-muted-foreground">
            Organize, share, and track access to digital resources and content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderOpen className="h-4 w-4 mr-2" />
            Manage Categories
          </Button>
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Resource
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold">{resources.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+{resources.filter(r => r.featured).length} featured</span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold">{getTotalDownloads().toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+12.5% this month</span>
                </div>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{getTotalViews().toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+8.3% growth</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{getAverageRating().toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-xs text-green-600">Excellent</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Resources</CardTitle>
                <CardDescription>Top downloads in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources
                    .sort((a, b) => b.analytics.monthlyDownloads - a.analytics.monthlyDownloads)
                    .slice(0, 5)
                    .map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getFileIcon(resource.type)}
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge className={resource.category.color}>
                              {resource.category.name}
                            </Badge>
                            <span>{formatFileSize(resource.fileSize)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{resource.analytics.monthlyDownloads}</p>
                        <p className="text-sm text-muted-foreground">downloads</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest resource access and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {log.action === 'download' ? 
                          <Download className="h-4 w-4 text-green-600" /> :
                          <Eye className="h-4 w-4 text-blue-600" />
                        }
                        <div>
                          <p className="font-medium">{log.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {log.action} • {formatDate(log.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {resources.find(r => r.id === log.resourceId)?.title?.slice(0, 30)}...
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Categories Overview</CardTitle>
              <CardDescription>Resource distribution across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{category.resourceCount}</span>
                      <Badge className={category.color}>
                        {category.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="ebook">E-books</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="presentation">Presentations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={accessFilter} onValueChange={setAccessFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Access</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getFileIcon(resource.type)}
                      <Badge className={resource.category.color}>
                        {resource.category.name}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {getVisibilityIcon(resource.visibility)}
                      {resource.featured && <Star className="h-3 w-3 text-yellow-500" />}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{resource.viewCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{resource.author.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(resource.fileSize)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getAccessLevelColor(resource.accessLevel)}>
                        {resource.accessLevel}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedResource(resource)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Category Management</h3>
              <p className="text-sm text-muted-foreground">Organize resources into categories</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Category
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.resourceCount}</TableCell>
                    <TableCell>
                      <Badge className={category.isPublic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {category.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(category.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Resources
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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

        <TabsContent value="collections" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Resource Collections</h3>
              <p className="text-sm text-muted-foreground">Curated collections of related resources</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Collection
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {collection.featured && <Star className="h-4 w-4 text-yellow-500" />}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Resources:</span>
                      <span className="font-medium">{collection.resourceIds.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Author:</span>
                      <span>{collection.author.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Visibility:</span>
                      <Badge className={collection.visibility === 'public' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {collection.visibility}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Created:</span>
                      <span>{formatDate(collection.createdAt)}</span>
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
                <CardTitle>Download Analytics</CardTitle>
                <CardDescription>Resource download patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Downloads</span>
                    <span className="font-medium">{getTotalDownloads().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>This Month</span>
                    <span className="font-medium">
                      {resources.reduce((sum, r) => sum + r.analytics.monthlyDownloads, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>This Week</span>
                    <span className="font-medium">
                      {resources.reduce((sum, r) => sum + r.analytics.weeklyDownloads, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average per Resource</span>
                    <span className="font-medium">
                      {Math.round(getTotalDownloads() / resources.length).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Premium resource performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Revenue</span>
                    <span className="font-medium">${getTotalRevenue().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Premium Resources</span>
                    <span className="font-medium">
                      {resources.filter(r => r.accessLevel === 'premium').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Conversion</span>
                    <span className="font-medium">
                      {(resources.reduce((sum, r) => sum + r.analytics.conversionRate, 0) / resources.length * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Revenue per Download</span>
                    <span className="font-medium">
                      ${(getTotalRevenue() / getTotalDownloads()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access-logs" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Access Logs</h3>
              <p className="text-sm text-muted-foreground">Track resource access and downloads</p>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.userName}</TableCell>
                    <TableCell>
                      {resources.find(r => r.id === log.resourceId)?.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.action === 'download' ? 
                          <Download className="h-3 w-3 text-green-600" /> :
                          <Eye className="h-3 w-3 text-blue-600" />
                        }
                        <span>{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Resource Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Resource Title</Label>
              <Input placeholder="Enter resource title" />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe your resource" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Access Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>
            
            <div className="space-y-2">
              <Label>File Upload</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here, or click to browse
                </p>
                <Button variant="outline" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowUploadDialog(false)}>
                Upload Resource
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resource Details Modal */}
      {selectedResource && (
        <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Resource Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{selectedResource.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{formatFileSize(selectedResource.fileSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Access Level:</span>
                      <Badge className={getAccessLevelColor(selectedResource.accessLevel)}>
                        {selectedResource.accessLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{formatDate(selectedResource.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Analytics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Downloads:</span>
                      <span>{selectedResource.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span>{selectedResource.viewCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span>{selectedResource.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span>${selectedResource.analytics.totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedResource.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resource
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}