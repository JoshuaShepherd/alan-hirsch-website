'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Users,
  Clock,
  Target,
  Search,
  Globe,
  Smartphone,
  Monitor,
  FileText,
  Video,
  Mic,
  Image,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  DollarSign,
  Activity,
  Download,
  RefreshCw,
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  PieChart,
  LineChart,
  BarChart,
  Loader2
} from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'

interface AnalyticsData {
  id: string
  title: string
  type: 'blog' | 'video' | 'podcast' | 'social' | 'newsletter' | 'webinar' | 'ebook'
  publishedAt: string
  lastUpdated?: string
  views: number
  uniqueViews: number
  engagement: number
  shares: number
  comments: number
  likes: number
  conversionRate: number
  timeOnPage: number // in seconds
  avgSessionDuration: number
  bounceRate: number
  exitRate: number
  pageLoadTime: number
  revenue?: number
  leads?: number
  downloads?: number
  signups?: number
  trafficSources: {
    organic: number
    social: number
    direct: number
    referral: number
    email: number
    paid: number
  }
  deviceBreakdown: {
    desktop: number
    mobile: number
    tablet: number
  }
  geoData: {
    country: string
    sessions: number
    conversionRate: number
  }[]
  socialBreakdown: {
    platform: string
    shares: number
    engagement: number
  }[]
  keywords: string[]
  tags: string[]
  authorId?: string
  status: 'published' | 'draft' | 'archived'
  isGrowthContent?: boolean
  competitorAnalysis?: {
    rank: number
    visibility: number
    trends: 'up' | 'down' | 'stable'
  }
}

interface DashboardMetrics {
  totalViews: number
  totalUniqueViews: number
  avgEngagement: number
  totalShares: number
  avgConversionRate: number
  totalRevenue: number
  totalLeads: number
  avgTimeOnPage: number
  avgBounceRate: number
  growthRate: {
    views: number
    engagement: number
    conversions: number
  }
  topPerformers: AnalyticsData[]
  underPerformers: AnalyticsData[]
  trendsData: {
    date: string
    views: number
    engagement: number
    conversions: number
  }[]
}

interface AnalyticsDashboardProps {
  data?: AnalyticsData[]
  loading?: boolean
  error?: string
  onRefresh?: () => void
  enableRealTime?: boolean
  customDateRange?: { start: string; end: string }
}

// Enhanced mock analytics data with comprehensive metrics
const mockAnalytics: AnalyticsData[] = [
  {
    id: '1',
    title: 'Understanding the APEST Framework',
    type: 'blog',
    publishedAt: '2024-03-15',
    lastUpdated: '2024-03-16',
    views: 12500,
    uniqueViews: 9800,
    engagement: 8.5,
    shares: 340,
    comments: 89,
    likes: 567,
    conversionRate: 12.4,
    timeOnPage: 285,
    avgSessionDuration: 420,
    bounceRate: 32,
    exitRate: 45,
    pageLoadTime: 1.8,
    revenue: 2400,
    leads: 67,
    downloads: 234,
    signups: 45,
    trafficSources: { organic: 45, social: 30, direct: 15, referral: 10, email: 8, paid: 12 },
    deviceBreakdown: { desktop: 55, mobile: 35, tablet: 10 },
    geoData: [
      { country: 'USA', sessions: 4500, conversionRate: 14.2 },
      { country: 'Canada', sessions: 2100, conversionRate: 11.8 },
      { country: 'UK', sessions: 1800, conversionRate: 9.5 }
    ],
    socialBreakdown: [
      { platform: 'Facebook', shares: 150, engagement: 12.5 },
      { platform: 'Twitter', shares: 120, engagement: 8.7 },
      { platform: 'LinkedIn', shares: 70, engagement: 18.9 }
    ],
    keywords: ['APEST', 'church leadership', 'ministry'],
    tags: ['leadership', 'framework', 'church'],
    authorId: 'alan-hirsch',
    status: 'published',
    isGrowthContent: true,
    competitorAnalysis: {
      rank: 3,
      visibility: 78,
      trends: 'up'
    }
  },
  {
    id: '2',
    title: 'APEST Deep Dive Video Series',
    type: 'video',
    publishedAt: '2024-03-12',
    lastUpdated: '2024-03-12',
    views: 8900,
    uniqueViews: 7200,
    engagement: 15.2,
    shares: 240,
    comments: 156,
    likes: 890,
    conversionRate: 18.7,
    timeOnPage: 420,
    avgSessionDuration: 650,
    bounceRate: 25,
    exitRate: 30,
    pageLoadTime: 2.1,
    revenue: 3200,
    leads: 89,
    downloads: 0,
    signups: 67,
    trafficSources: { organic: 35, social: 45, direct: 10, referral: 10, email: 12, paid: 8 },
    deviceBreakdown: { desktop: 40, mobile: 50, tablet: 10 },
    geoData: [
      { country: 'USA', sessions: 3200, conversionRate: 19.5 },
      { country: 'Australia', sessions: 1500, conversionRate: 16.2 },
      { country: 'UK', sessions: 1200, conversionRate: 14.8 }
    ],
    socialBreakdown: [
      { platform: 'YouTube', shares: 100, engagement: 22.1 },
      { platform: 'Facebook', shares: 80, engagement: 14.5 },
      { platform: 'Twitter', shares: 60, engagement: 11.2 }
    ],
    keywords: ['APEST video', 'leadership training', 'church development'],
    tags: ['video', 'leadership', 'training'],
    authorId: 'alan-hirsch',
    status: 'published',
    isGrowthContent: true,
    competitorAnalysis: {
      rank: 1,
      visibility: 92,
      trends: 'up'
    }
  },
  {
    id: '3',
    title: 'Movement Stories: European Revival',
    type: 'podcast',
    publishedAt: '2024-03-10',
    lastUpdated: '2024-03-10',
    views: 4200,
    uniqueViews: 3800,
    engagement: 22.8,
    shares: 120,
    comments: 67,
    likes: 340,
    conversionRate: 25.3,
    timeOnPage: 1800,
    avgSessionDuration: 2100,
    bounceRate: 15,
    exitRate: 20,
    pageLoadTime: 1.2,
    revenue: 1800,
    leads: 45,
    downloads: 1200,
    signups: 34,
    trafficSources: { organic: 50, social: 25, direct: 20, referral: 5, email: 15, paid: 5 },
    deviceBreakdown: { desktop: 35, mobile: 60, tablet: 5 },
    geoData: [
      { country: 'Germany', sessions: 800, conversionRate: 28.1 },
      { country: 'France', sessions: 600, conversionRate: 24.5 },
      { country: 'Netherlands', sessions: 500, conversionRate: 22.8 }
    ],
    socialBreakdown: [
      { platform: 'Spotify', shares: 60, engagement: 35.2 },
      { platform: 'Apple Podcasts', shares: 40, engagement: 28.9 },
      { platform: 'Twitter', shares: 20, engagement: 15.4 }
    ],
    keywords: ['European revival', 'movement stories', 'church growth'],
    tags: ['podcast', 'revival', 'europe'],
    authorId: 'alan-hirsch',
    status: 'published',
    isGrowthContent: true,
    competitorAnalysis: {
      rank: 2,
      visibility: 85,
      trends: 'stable'
    }
  },
  {
    id: '4',
    title: 'March Missional Insights Newsletter',
    type: 'newsletter',
    publishedAt: '2024-03-08',
    lastUpdated: '2024-03-08',
    views: 3400,
    uniqueViews: 3200,
    engagement: 45.6,
    shares: 89,
    comments: 23,
    likes: 156,
    conversionRate: 32.1,
    timeOnPage: 180,
    avgSessionDuration: 240,
    bounceRate: 20,
    exitRate: 25,
    pageLoadTime: 0.9,
    revenue: 1200,
    leads: 78,
    downloads: 45,
    signups: 89,
    trafficSources: { organic: 10, social: 15, direct: 70, referral: 5, email: 85, paid: 5 },
    deviceBreakdown: { desktop: 45, mobile: 45, tablet: 10 },
    geoData: [
      { country: 'USA', sessions: 1500, conversionRate: 34.2 },
      { country: 'Canada', sessions: 800, conversionRate: 30.5 },
      { country: 'UK', sessions: 600, conversionRate: 28.9 }
    ],
    socialBreakdown: [
      { platform: 'Email', shares: 50, engagement: 52.1 },
      { platform: 'LinkedIn', shares: 25, engagement: 38.7 },
      { platform: 'Twitter', shares: 14, engagement: 22.4 }
    ],
    keywords: ['missional insights', 'newsletter', 'church leadership'],
    tags: ['newsletter', 'insights', 'missional'],
    authorId: 'alan-hirsch',
    status: 'published',
    isGrowthContent: false,
    competitorAnalysis: {
      rank: 1,
      visibility: 95,
      trends: 'up'
    }
  }
]

// Memoized components for performance
const MetricCard = memo(({ title, value, subtitle, icon: Icon, trend, color = 'text-foreground', onClick }: {
  title: string
  value: string | number
  subtitle: string
  icon: any
  trend?: { value: number; label: string; direction: 'up' | 'down' | 'stable' }
  color?: string
  onClick?: () => void
}) => (
  <Card className={`hover:shadow-md transition-all cursor-pointer ${onClick ? 'hover:scale-105' : ''}`} onClick={onClick}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        {trend && (
          <div className={`flex items-center text-xs ${
            trend.direction === 'up' ? 'text-green-600' : 
            trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend.direction === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> :
             trend.direction === 'down' ? <TrendingDown className="h-3 w-3 mr-1" /> :
             <Minus className="h-3 w-3 mr-1" />}
            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}{Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
))

MetricCard.displayName = 'MetricCard'

const ContentRow = memo(({ item, onViewDetails, onBookmark }: {
  item: AnalyticsData
  onViewDetails: (id: string) => void
  onBookmark: (id: string) => void
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'podcast': return <Mic className="w-4 h-4" />
      case 'social': return <Image className="w-4 h-4" />
      case 'newsletter': return <FileText className="w-4 h-4" />
      case 'webinar': return <Users className="w-4 h-4" />
      case 'ebook': return <FileText className="w-4 h-4" />
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
      case 'webinar': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
      case 'ebook': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <Badge className={`${getTypeColor(item.type)} flex items-center gap-1`}>
          {getTypeIcon(item.type)}
          {item.type}
        </Badge>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{item.title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
            {item.isGrowthContent && (
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Growth Content
              </Badge>
            )}
            {item.competitorAnalysis && (
              <Badge variant="outline" className="text-xs">
                #{item.competitorAnalysis.rank} Rank
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <div className="font-medium">{formatNumber(item.views)}</div>
          <div className="text-muted-foreground">Views</div>
        </div>
        
        <div className="text-center">
          <div className="font-medium">{item.engagement.toFixed(1)}%</div>
          <div className="text-muted-foreground">Engagement</div>
        </div>
        
        <div className="text-center">
          <div className="font-medium">{item.conversionRate.toFixed(1)}%</div>
          <div className="text-muted-foreground">Conversion</div>
        </div>

        <div className="text-center">
          <div className="font-medium">{formatTime(item.timeOnPage)}</div>
          <div className="text-muted-foreground">Avg Time</div>
        </div>

        {item.revenue && (
          <div className="text-center">
            <div className="font-medium text-green-600">${formatNumber(item.revenue)}</div>
            <div className="text-muted-foreground">Revenue</div>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(item.id)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBookmark(item.id)}>
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Content
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
})

ContentRow.displayName = 'ContentRow'

export function AnalyticsDashboard({ 
  data = mockAnalytics, 
  loading = false, 
  error, 
  onRefresh,
  enableRealTime = false,
  customDateRange
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [contentFilter, setContentFilter] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState('views')
  const [sortBy, setSortBy] = useState('views')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState(['views', 'engagement', 'conversion', 'time'])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [realTimeEnabled, setRealTimeEnabled] = useState(enableRealTime)

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeEnabled) return

    const interval = setInterval(() => {
      if (onRefresh) {
        onRefresh()
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [realTimeEnabled, onRefresh])

  // Enhanced metrics calculations
  const dashboardMetrics = useMemo((): DashboardMetrics => {
    const totalViews = data.reduce((sum, item) => sum + item.views, 0)
    const totalUniqueViews = data.reduce((sum, item) => sum + (item.uniqueViews || item.views), 0)
    const avgEngagement = data.reduce((sum, item) => sum + item.engagement, 0) / data.length
    const totalShares = data.reduce((sum, item) => sum + item.shares, 0)
    const avgConversionRate = data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length
    const totalRevenue = data.reduce((sum, item) => sum + (item.revenue || 0), 0)
    const totalLeads = data.reduce((sum, item) => sum + (item.leads || 0), 0)
    const avgTimeOnPage = data.reduce((sum, item) => sum + item.timeOnPage, 0) / data.length
    const avgBounceRate = data.reduce((sum, item) => sum + item.bounceRate, 0) / data.length

    const topPerformers = [...data]
      .sort((a, b) => (b.conversionRate * b.views) - (a.conversionRate * a.views))
      .slice(0, 5)

    const underPerformers = [...data]
      .sort((a, b) => (a.conversionRate * a.views) - (b.conversionRate * b.views))
      .slice(0, 3)

    // Mock trends data
    const trendsData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      views: Math.floor(totalViews / 30 + Math.random() * 1000),
      engagement: avgEngagement + (Math.random() - 0.5) * 5,
      conversions: Math.floor(avgConversionRate + (Math.random() - 0.5) * 10)
    }))

    return {
      totalViews,
      totalUniqueViews,
      avgEngagement,
      totalShares,
      avgConversionRate,
      totalRevenue,
      totalLeads,
      avgTimeOnPage,
      avgBounceRate,
      growthRate: {
        views: 23.5,
        engagement: 8.2,
        conversions: 15.7
      },
      topPerformers,
      underPerformers,
      trendsData
    }
  }, [data])

  // Filtered and sorted data
  const processedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesType = contentFilter === 'all' || item.type === contentFilter
      return matchesSearch && matchesType
    })

    // Sort data
    filtered.sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'title':
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        case 'date':
          aValue = new Date(a.publishedAt).getTime()
          bValue = new Date(b.publishedAt).getTime()
          break
        case 'views':
          aValue = a.views
          bValue = b.views
          break
        case 'engagement':
          aValue = a.engagement
          bValue = b.engagement
          break
        case 'conversion':
          aValue = a.conversionRate
          bValue = b.conversionRate
          break
        case 'revenue':
          aValue = a.revenue || 0
          bValue = b.revenue || 0
          break
        default:
          aValue = a.views
          bValue = b.views
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    return filtered
  }, [data, searchTerm, contentFilter, sortBy, sortOrder])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      if (onRefresh) {
        await onRefresh()
      }
    } finally {
      setIsRefreshing(false)
    }
  }, [onRefresh])

  const handleViewDetails = useCallback((id: string) => {
    // Implementation for viewing detailed analytics
    console.log('View details for:', id)
  }, [])

  const handleBookmark = useCallback((id: string) => {
    setBookmarkedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          {error}
          {onRefresh && (
            <Button variant="outline" size="sm" className="ml-2" onClick={handleRefresh}>
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Content Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive performance insights across all content formats
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {realTimeEnabled && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-green-500" />
              Real-time
            </Badge>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* Export functionality */}}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MetricCard
          title="Total Views"
          value={formatNumber(dashboardMetrics.totalViews)}
          subtitle={`${formatNumber(dashboardMetrics.totalUniqueViews)} unique`}
          icon={Eye}
          trend={{ value: dashboardMetrics.growthRate.views, label: 'vs last period', direction: 'up' }}
          color="text-blue-500"
          onClick={() => setSelectedMetric('views')}
        />
        
        <MetricCard
          title="Avg Engagement"
          value={`${dashboardMetrics.avgEngagement.toFixed(1)}%`}
          subtitle="Across all content"
          icon={Heart}
          trend={{ value: dashboardMetrics.growthRate.engagement, label: 'improvement', direction: 'up' }}
          color="text-green-500"
          onClick={() => setSelectedMetric('engagement')}
        />
        
        <MetricCard
          title="Total Shares"
          value={formatNumber(dashboardMetrics.totalShares)}
          subtitle="Social amplification"
          icon={Share}
          trend={{ value: 15.7, label: 'increase', direction: 'up' }}
          color="text-purple-500"
          onClick={() => setSelectedMetric('shares')}
        />
        
        <MetricCard
          title="Conversion Rate"
          value={`${dashboardMetrics.avgConversionRate.toFixed(1)}%`}
          subtitle="Average across content"
          icon={Target}
          trend={{ value: dashboardMetrics.growthRate.conversions, label: 'vs target', direction: 'up' }}
          color="text-orange-500"
          onClick={() => setSelectedMetric('conversion')}
        />
        
        <MetricCard
          title="Revenue Generated"
          value={`$${formatNumber(dashboardMetrics.totalRevenue)}`}
          subtitle={`${dashboardMetrics.totalLeads} leads generated`}
          icon={DollarSign}
          trend={{ value: 18.7, label: 'growth', direction: 'up' }}
          color="text-emerald-500"
          onClick={() => setSelectedMetric('revenue')}
        />
      </div>

      {/* Performance Insights Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <TrendingUp className="w-5 h-5" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Video Content Leading</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {dashboardMetrics.topPerformers[0]?.conversionRate.toFixed(1)}% avg conversion rate
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Optimal Publishing</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tuesday/Wednesday peak identified</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Mobile-First Trend</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">48% of traffic now mobile</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
          <TabsTrigger value="growth">Growth Analytics</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>30-day performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  {/* Interactive chart would go here */}
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Interactive trend chart</p>
                    <p className="text-sm">Views, Engagement, Conversions over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Content Type Distribution
                </CardTitle>
                <CardDescription>Performance by content format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['blog', 'video', 'podcast', 'newsletter'].map((type) => {
                    const typeData = data.filter(item => item.type === type)
                    const typeViews = typeData.reduce((sum, item) => sum + item.views, 0)
                    const percentage = ((typeViews / dashboardMetrics.totalViews) * 100)
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            type === 'blog' ? 'bg-blue-500' :
                            type === 'video' ? 'bg-purple-500' :
                            type === 'podcast' ? 'bg-green-500' :
                            'bg-orange-500'
                          }`} />
                          <span className="capitalize font-medium">{type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={percentage} className="w-20" />
                          <span className="text-sm font-medium w-12">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Enhanced Content Management */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={contentFilter} onValueChange={setContentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blog">Blog Posts</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="podcast">Podcasts</SelectItem>
                  <SelectItem value="newsletter">Newsletters</SelectItem>
                  <SelectItem value="webinar">Webinars</SelectItem>
                  <SelectItem value="ebook">E-books</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="conversion">Conversion Rate</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="date">Date Published</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['views', 'engagement', 'conversion', 'time', 'revenue', 'shares'].map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col}
                    checked={selectedColumns.includes(col)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedColumns([...selectedColumns, col])
                      } else {
                        setSelectedColumns(selectedColumns.filter(c => c !== col))
                      }
                    }}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {processedData.length} of {data.length} content items
            </span>
            {bookmarkedItems.length > 0 && (
              <span>{bookmarkedItems.length} bookmarked</span>
            )}
          </div>

          {/* Enhanced Content List */}
          <div className="space-y-4">
            {processedData.map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                onViewDetails={handleViewDetails}
                onBookmark={handleBookmark}
              />
            ))}
            
            {processedData.length === 0 && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No content found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('')
                        setContentFilter('all')
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top performing regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data[0]?.geoData.map((geo, index) => (
                    <div key={geo.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="font-medium">{geo.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatNumber(geo.sessions)}</div>
                        <div className="text-xs text-muted-foreground">{geo.conversionRate.toFixed(1)}% conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data[0]?.deviceBreakdown || {}).map(([device, percentage]) => (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {device === 'desktop' ? <Monitor className="w-4 h-4" /> :
                         device === 'mobile' ? <Smartphone className="w-4 h-4" /> :
                         <Image className="w-4 h-4" />}
                        <span className="capitalize font-medium">{device}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={percentage} className="w-20" />
                        <span className="text-sm font-medium w-12">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>Highest converting content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.topPerformers.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Badge variant="outline" className="shrink-0">#{index + 1}</Badge>
                        <span className="truncate text-sm">{item.title}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {item.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-orange-500" />
                  Growth Opportunities
                </CardTitle>
                <CardDescription>Content needing optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.underPerformers.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="truncate text-sm">{item.title}</span>
                      </div>
                      <span className="text-sm font-medium text-orange-600">
                        {item.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Growth Metrics
                </CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Views Growth</span>
                    <span className="text-sm font-medium text-green-600">
                      +{dashboardMetrics.growthRate.views}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engagement Growth</span>
                    <span className="text-sm font-medium text-green-600">
                      +{dashboardMetrics.growthRate.engagement}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversion Growth</span>
                    <span className="text-sm font-medium text-green-600">
                      +{dashboardMetrics.growthRate.conversions}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue per Content</span>
                    <span className="text-sm font-medium">
                      ${(dashboardMetrics.totalRevenue / data.length).toFixed(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>How your content ranks against competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.filter(item => item.competitorAnalysis).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        #{item.competitorAnalysis!.rank}
                      </Badge>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.competitorAnalysis!.visibility}%</div>
                        <div className="text-xs text-muted-foreground">Visibility</div>
                      </div>
                      <Badge variant={
                        item.competitorAnalysis!.trends === 'up' ? 'default' :
                        item.competitorAnalysis!.trends === 'down' ? 'destructive' : 'secondary'
                      }>
                        {item.competitorAnalysis!.trends === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                         item.competitorAnalysis!.trends === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> :
                         <Minus className="w-3 h-3 mr-1" />}
                        {item.competitorAnalysis!.trends}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}