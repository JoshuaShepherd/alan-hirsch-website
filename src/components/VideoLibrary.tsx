'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Video, 
  Play, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Clock,
  BarChart3,
  Globe,
  Archive,
  Share,
  Settings
} from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  views: number
  status: 'published' | 'draft' | 'scheduled' | 'archived'
  category: string
  series?: string
  tags: string[]
  uploadedAt: string
  publishedAt?: string
  fileSize: number
}

interface VideoLibraryProps {
  videos?: VideoItem[]
  onVideoEdit?: (video: VideoItem) => void
  onVideoDelete?: (videoId: string) => void
  onVideoPublish?: (videoId: string) => void
}

// Mock data for demonstration
const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Understanding APEST: The Five-Fold Ministry Framework',
    description: 'Deep dive into the biblical foundation of APEST and its practical application in modern church leadership.',
    thumbnail: '/images/video-thumbnails/apest-intro.jpg',
    duration: 1800, // 30 minutes
    views: 2450,
    status: 'published',
    category: 'Teaching Series',
    series: 'APEST Leadership',
    tags: ['APEST', 'leadership', 'ministry gifts'],
    uploadedAt: '2024-03-15T10:00:00Z',
    publishedAt: '2024-03-15T14:00:00Z',
    fileSize: 850000000 // 850MB
  },
  {
    id: '2',
    title: 'Quick Insight: The Missional Imperative',
    description: 'A 5-minute reflection on why every church must embrace its missional calling.',
    thumbnail: '/images/video-thumbnails/missional-insight.jpg',
    duration: 300, // 5 minutes
    views: 1250,
    status: 'published',
    category: 'Quick Insights',
    tags: ['missional', 'church renewal'],
    uploadedAt: '2024-03-12T09:00:00Z',
    publishedAt: '2024-03-12T12:00:00Z',
    fileSize: 120000000 // 120MB
  },
  {
    id: '3',
    title: 'Behind the Scenes: Writing The Forgotten Ways',
    description: 'Personal insights into the writing process and key discoveries that shaped this foundational work.',
    thumbnail: '/images/video-thumbnails/writing-process.jpg',
    duration: 1200, // 20 minutes
    views: 890,
    status: 'draft',
    category: 'Behind the Scenes',
    tags: ['writing', 'books', 'personal'],
    uploadedAt: '2024-03-10T16:00:00Z',
    fileSize: 650000000 // 650MB
  }
]

export function VideoLibrary({ 
  videos = mockVideos, 
  onVideoEdit, 
  onVideoDelete, 
  onVideoPublish 
}: VideoLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'title'>('newest')

  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || video.status === statusFilter
      const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        case 'oldest':
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        case 'views':
          return b.views - a.views
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'archived': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const categories = Array.from(new Set(videos.map(v => v.category)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Video Library</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your video content and analyze performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Video Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{videos.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {videos.filter(v => v.status === 'published').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(videos.reduce((sum, v) => sum + v.duration, 0) / 3600)}h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Runtime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
                  {/* Thumbnail placeholder */}
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <Button size="lg" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(video.uploadedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {video.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {video.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{video.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onVideoEdit?.(video)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onVideoDelete?.(video.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Video</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Views</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium">Size</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map(video => (
                    <tr key={video.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-1">{video.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(video.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(video.status)}>
                          {video.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{video.category}</td>
                      <td className="p-4 text-sm">{video.views.toLocaleString()}</td>
                      <td className="p-4 text-sm">{formatDuration(video.duration)}</td>
                      <td className="p-4 text-sm">{formatFileSize(video.fileSize)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onVideoEdit?.(video)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onVideoDelete?.(video.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">No videos found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'Upload your first video to get started'
            }
          </p>
        </div>
      )}
    </div>
  )
}