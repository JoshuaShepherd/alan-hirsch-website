'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mic, 
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
  Settings,
  Rss,
  Users,
  FileText,
  Volume2
} from 'lucide-react'

interface PodcastEpisode {
  id: string
  title: string
  description: string
  episodeNumber?: number
  seasonNumber?: number
  show: string
  category: string
  guests: string[]
  tags: string[]
  duration: number
  listens: number
  status: 'published' | 'draft' | 'scheduled' | 'archived'
  uploadedAt: string
  publishedAt?: string
  fileSize: number
  showNotes: string
}

interface PodcastLibraryProps {
  episodes?: PodcastEpisode[]
  onEpisodeEdit?: (episode: PodcastEpisode) => void
  onEpisodeDelete?: (episodeId: string) => void
  onEpisodePublish?: (episodeId: string) => void
}

// Mock data for demonstration
const mockEpisodes: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Understanding the APEST Framework in Modern Church Leadership',
    description: 'A deep dive into how the five-fold ministry gifts can transform church leadership and multiply missional impact.',
    episodeNumber: 12,
    seasonNumber: 1,
    show: 'The Missional Leader Podcast',
    category: 'Teaching',
    guests: ['Dr. Sarah Johnson', 'Pastor Mike Chen'],
    tags: ['APEST', 'leadership', 'ministry gifts'],
    duration: 2700, // 45 minutes
    listens: 3450,
    status: 'published',
    uploadedAt: '2024-03-15T10:00:00Z',
    publishedAt: '2024-03-15T14:00:00Z',
    fileSize: 65000000, // 65MB
    showNotes: 'In this episode, we explore the biblical foundation of APEST and its practical application...'
  },
  {
    id: '2',
    title: 'Quick Insight: The Missional Imperative',
    description: 'A 15-minute reflection on why every church must embrace its missional calling in post-Christendom contexts.',
    episodeNumber: 5,
    seasonNumber: 1,
    show: 'APEST Insights',
    category: 'Solo Reflection',
    guests: [],
    tags: ['missional', 'church renewal', 'post-christendom'],
    duration: 900, // 15 minutes
    listens: 1850,
    status: 'published',
    uploadedAt: '2024-03-12T09:00:00Z',
    publishedAt: '2024-03-12T12:00:00Z',
    fileSize: 22000000, // 22MB
    showNotes: 'This insight explores the theological and practical foundations of missional engagement...'
  },
  {
    id: '3',
    title: 'Movement Stories: Church Planting in Urban Australia',
    description: 'An inspiring conversation about church multiplication in one of the most secular contexts in the world.',
    episodeNumber: 8,
    seasonNumber: 2,
    show: 'Movement Stories',
    category: 'Interview',
    guests: ['Rev. David Kim', 'Rachel Martinez'],
    tags: ['church planting', 'urban ministry', 'australia'],
    duration: 3600, // 60 minutes
    listens: 2100,
    status: 'draft',
    uploadedAt: '2024-03-10T16:00:00Z',
    fileSize: 85000000, // 85MB
    showNotes: 'David and Rachel share their journey of planting churches in Sydney and Melbourne...'
  }
]

export function PodcastLibrary({ 
  episodes = mockEpisodes, 
  onEpisodeEdit, 
  onEpisodeDelete, 
  onEpisodePublish 
}: PodcastLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilter, setShowFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'listens' | 'title'>('newest')

  const filteredEpisodes = episodes
    .filter(episode => {
      const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           episode.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           episode.guests.some(guest => guest.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           episode.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || episode.status === statusFilter
      const matchesShow = showFilter === 'all' || episode.show === showFilter
      return matchesSearch && matchesStatus && matchesShow
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        case 'oldest':
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        case 'listens':
          return b.listens - a.listens
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
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

  const shows = Array.from(new Set(episodes.map(e => e.show)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Podcast Library</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your podcast episodes and audio content
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
                  placeholder="Search episodes..."
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

            <Select value={showFilter} onValueChange={setShowFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Shows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shows</SelectItem>
                {shows.map(show => (
                  <SelectItem key={show} value={show}>{show}</SelectItem>
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
                <SelectItem value="listens">Most Listened</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Podcast Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{episodes.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Episodes</p>
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
                  {episodes.filter(e => e.status === 'published').length}
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
                  {episodes.reduce((sum, e) => sum + e.listens, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Listens</p>
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
                  {Math.round(episodes.reduce((sum, e) => sum + e.duration, 0) / 3600)}h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Runtime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Rss className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{shows.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Podcast Shows</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Episode Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map(episode => (
            <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative flex items-center justify-center">
                  {/* Audio Waveform Visual */}
                  <div className="flex items-center gap-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white/70 rounded-full"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <Button size="lg" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(episode.duration)}
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(episode.status)}>
                      {episode.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {episode.show}
                  </Badge>
                  {episode.seasonNumber && episode.episodeNumber && (
                    <Badge variant="outline" className="text-xs">
                      S{episode.seasonNumber}E{episode.episodeNumber}
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{episode.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {episode.description}
                </p>

                {episode.guests.length > 0 && (
                  <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>with {episode.guests.slice(0, 2).join(', ')}</span>
                    {episode.guests.length > 2 && <span>+{episode.guests.length - 2}</span>}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    {episode.listens.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(episode.uploadedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {episode.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {episode.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{episode.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEpisodeEdit?.(episode)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEpisodeDelete?.(episode.id)}
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
                    <th className="p-4 font-medium">Episode</th>
                    <th className="p-4 font-medium">Show</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Listens</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium">Size</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEpisodes.map(episode => (
                    <tr key={episode.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded flex items-center justify-center">
                            <Mic className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-1">{episode.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              {episode.seasonNumber && episode.episodeNumber && (
                                <span>S{episode.seasonNumber}E{episode.episodeNumber}</span>
                              )}
                              <span>{new Date(episode.uploadedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{episode.show}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(episode.status)}>
                          {episode.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{episode.listens.toLocaleString()}</td>
                      <td className="p-4 text-sm">{formatDuration(episode.duration)}</td>
                      <td className="p-4 text-sm">{formatFileSize(episode.fileSize)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEpisodeEdit?.(episode)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEpisodeDelete?.(episode.id)}
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

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-12">
          <Mic className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">No episodes found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery || statusFilter !== 'all' || showFilter !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'Upload your first podcast episode to get started'
            }
          </p>
        </div>
      )}
    </div>
  )
}