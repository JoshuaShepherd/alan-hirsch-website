'use client'

import { useState, useEffect } from 'react'
import { 
  FileText, Image, Video, Mic, Calendar, Search, Filter,
  Plus, Edit, Trash2, Eye, Settings, Copy, Share, Clock,
  Tag, Folder, Upload, Download, Star, BarChart3,
  Globe, Lock, Unlock, Archive, RefreshCw, Zap,
  CheckCircle, AlertCircle, Users, TrendingUp
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

interface ContentItem {
  id: string
  title: string
  slug: string
  type: 'post' | 'page' | 'article' | 'resource'
  status: 'published' | 'draft' | 'scheduled' | 'private'
  author: string
  category: string
  tags: string[]
  excerpt: string
  content: string
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  publishedAt?: string
  scheduledFor?: string
  createdAt: string
  updatedAt: string
  views: number
  comments: number
  shares: number
  readingTime: number
}

interface MediaItem {
  id: string
  filename: string
  originalName: string
  type: 'image' | 'video' | 'audio' | 'document'
  mimeType: string
  size: number
  dimensions?: { width: number; height: number }
  duration?: number
  url: string
  thumbnailUrl?: string
  altText?: string
  description?: string
  tags: string[]
  uploadedAt: string
  uploadedBy: string
  usageCount: number
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  postCount: number
  parent?: string
}

interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  status: 'approved' | 'pending' | 'spam' | 'rejected'
  createdAt: string
  replies: Comment[]
}

const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Understanding the Five-Fold Ministry in Modern Context',
    slug: 'understanding-five-fold-ministry-modern-context',
    type: 'post',
    status: 'published',
    author: 'Alan Hirsch',
    category: 'Leadership',
    tags: ['apest', 'ministry', 'leadership', 'church'],
    excerpt: 'Exploring how the APEST framework applies to contemporary church leadership and ministry development.',
    content: 'Full article content here...',
    featuredImage: '/images/blog/apest-ministry.jpg',
    seoTitle: 'Five-Fold Ministry Guide | APEST Framework | Alan Hirsch',
    seoDescription: 'Complete guide to understanding and implementing the five-fold ministry (APEST) in modern church context.',
    seoKeywords: ['apest', 'five-fold ministry', 'church leadership', 'ministry gifts'],
    publishedAt: '2025-09-15T10:00:00Z',
    createdAt: '2025-09-10T14:30:00Z',
    updatedAt: '2025-09-15T10:00:00Z',
    views: 1247,
    comments: 23,
    shares: 67,
    readingTime: 8
  },
  {
    id: '2',
    title: 'Organic Church Planting: A Movemental Approach',
    slug: 'organic-church-planting-movemental-approach',
    type: 'article',
    status: 'published',
    author: 'Sarah Johnson',
    category: 'Church Planting',
    tags: ['church-planting', 'movements', 'organic', 'multiplication'],
    excerpt: 'Discover the principles of organic church planting that lead to sustainable movements.',
    content: 'Full article content here...',
    featuredImage: '/images/blog/organic-church.jpg',
    publishedAt: '2025-09-12T15:30:00Z',
    createdAt: '2025-09-08T09:15:00Z',
    updatedAt: '2025-09-12T15:30:00Z',
    views: 892,
    comments: 15,
    shares: 34,
    readingTime: 12
  },
  {
    id: '3',
    title: 'Upcoming Missional Leadership Conference 2026',
    slug: 'missional-leadership-conference-2026',
    type: 'page',
    status: 'draft',
    author: 'Michael Chen',
    category: 'Events',
    tags: ['conference', 'leadership', 'events'],
    excerpt: 'Join us for three days of intensive training and networking with missional leaders worldwide.',
    content: 'Conference details and registration information...',
    scheduledFor: '2025-09-25T08:00:00Z',
    createdAt: '2025-09-18T11:45:00Z',
    updatedAt: '2025-09-19T09:20:00Z',
    views: 0,
    comments: 0,
    shares: 0,
    readingTime: 5
  }
]

const MOCK_MEDIA: MediaItem[] = [
  {
    id: '1',
    filename: 'apest-ministry-hero.jpg',
    originalName: 'APEST Ministry Hero Image.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 1024000,
    dimensions: { width: 1920, height: 1080 },
    url: '/images/blog/apest-ministry.jpg',
    thumbnailUrl: '/images/blog/apest-ministry-thumb.jpg',
    altText: 'Five-fold ministry diagram showing APEST framework',
    description: 'Infographic explaining the five-fold ministry gifts',
    tags: ['apest', 'ministry', 'infographic'],
    uploadedAt: '2025-09-10T10:15:00Z',
    uploadedBy: 'Alan Hirsch',
    usageCount: 3
  },
  {
    id: '2',
    filename: 'church-planting-video.mp4',
    originalName: 'Organic Church Planting Intro.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 15680000,
    dimensions: { width: 1280, height: 720 },
    duration: 180,
    url: '/media/videos/church-planting-intro.mp4',
    thumbnailUrl: '/media/videos/church-planting-thumb.jpg',
    description: 'Introduction to organic church planting principles',
    tags: ['church-planting', 'video', 'introduction'],
    uploadedAt: '2025-09-08T14:22:00Z',
    uploadedBy: 'Sarah Johnson',
    usageCount: 1
  }
]

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Leadership', slug: 'leadership', color: '#3b82f6', postCount: 24 },
  { id: '2', name: 'Church Planting', slug: 'church-planting', color: '#10b981', postCount: 18 },
  { id: '3', name: 'Theology', slug: 'theology', color: '#8b5cf6', postCount: 12 },
  { id: '4', name: 'Events', slug: 'events', color: '#f59e0b', postCount: 8 },
  { id: '5', name: 'Resources', slug: 'resources', color: '#ef4444', postCount: 15 }
]

export function ComprehensiveContentManagement() {
  const [activeTab, setActiveTab] = useState('content')
  const [content, setContent] = useState<ContentItem[]>(MOCK_CONTENT)
  const [media, setMedia] = useState<MediaItem[]>(MOCK_MEDIA)
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showCreateContent, setShowCreateContent] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': case 'approved': return 'bg-green-100 text-green-800'
      case 'draft': case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'private': case 'rejected': return 'bg-gray-100 text-gray-800'
      case 'spam': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="h-4 w-4" />
      case 'page': return <Globe className="h-4 w-4" />
      case 'article': return <FileText className="h-4 w-4" />
      case 'resource': return <Archive className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'audio': return <Mic className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground">
            Create and manage blog posts, pages, media, and content analytics
          </p>
        </div>
        <Button onClick={() => setShowCreateContent(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{content.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+3 this week</span>
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
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{content.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Media Files</p>
                <p className="text-2xl font-bold">{media.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+2 today</span>
                </div>
              </div>
              <Image className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
              <Folder className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="post">Posts</SelectItem>
                  <SelectItem value="page">Pages</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="resource">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Badge style={{ backgroundColor: categories.find(c => c.name === item.category)?.color + '20' }}>
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell>
                      {item.status === 'published' 
                        ? formatDate(item.publishedAt!) 
                        : formatDate(item.updatedAt)
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
                          <DropdownMenuItem onClick={() => setSelectedContent(item)}>
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
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
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

        <TabsContent value="media" className="space-y-4">
          {/* Media Upload and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  {item.type === 'image' ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Image className="h-12 w-12 text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1 line-clamp-1">{item.originalName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatFileSize(item.size)}
                    {item.dimensions && ` • ${item.dimensions.width}x${item.dimensions.height}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Used {item.usageCount} times
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
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
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Content Categories</h3>
              <p className="text-sm text-muted-foreground">Organize content with categories and tags</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
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
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Posts:</span>
                      <span className="font-medium">{category.postCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Slug:</span>
                      <span className="text-muted-foreground">{category.slug}</span>
                    </div>
                  </div>
                  
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-3">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Comment Overview</CardTitle>
                <CardDescription>Moderation and engagement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Comments</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pending Approval</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approved</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Spam Detected</span>
                    <span className="font-medium">6</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Latest user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">John Smith</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Great insights on the APEST framework. How do you recommend implementing this in smaller churches?"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      On: Understanding the Five-Fold Ministry
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Maria Garcia</span>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Thank you for this practical approach to church planting. The organic model makes so much sense."
                    </p>
                    <p className="text-xs text-muted-foreground">
                      On: Organic Church Planting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Most popular content and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{item.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{item.views} views</span>
                          <span>{item.comments} comments</span>
                          <span>{item.shares} shares</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your readers are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Direct Traffic</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Social Media</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Search Engines</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Referrals</span>
                    <span className="font-medium">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Overview</CardTitle>
                <CardDescription>Search engine optimization metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-generate meta descriptions</Label>
                    <p className="text-sm text-muted-foreground">Create SEO descriptions from content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>XML Sitemap generation</Label>
                    <p className="text-sm text-muted-foreground">Automatically update sitemap</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Open Graph tags</Label>
                    <p className="text-sm text-muted-foreground">Generate social media previews</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default SEO Title Template</Label>
                  <Input defaultValue="{{title}} | Alan Hirsch" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content SEO Health</CardTitle>
                <CardDescription>SEO optimization status of content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Optimized Content</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Missing meta descriptions</span>
                      <span className="text-red-600">3 posts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Missing alt text</span>
                      <span className="text-yellow-600">7 images</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Duplicate titles</span>
                      <span className="text-red-600">1 post</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Well optimized</span>
                      <span className="text-green-600">24 posts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Content Modal */}
      <Dialog open={showCreateContent} onOpenChange={setShowCreateContent}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Enter content title" />
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Blog Post</SelectItem>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea placeholder="Brief description of the content" rows={3} />
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateContent(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateContent(false)}>
                Create Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Preview Modal */}
      {selectedContent && (
        <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedContent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {selectedContent.author}</span>
                <span>•</span>
                <span>{formatDate(selectedContent.updatedAt)}</span>
                <span>•</span>
                <span>{selectedContent.readingTime} min read</span>
                <span>•</span>
                <span>{selectedContent.views} views</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedContent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground">{selectedContent.excerpt}</p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Content preview would appear here...</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Live
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}