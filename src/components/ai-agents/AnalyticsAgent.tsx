'use client'

import { useState } from 'react'
import { 
  BarChart3, TrendingUp, Users, Eye, MousePointer,
  Calendar, Globe, Mail, Share2, BookOpen,
  ArrowUpRight, ArrowDownRight, Filter, Download,
  RefreshCw, Settings, ExternalLink, Target,
  Clock, Heart, MessageCircle, Star, Award,
  Zap, Activity, PieChart, LineChart, DollarSign,
  UserCheck, UserPlus, UserMinus, ThumbsUp,
  PlayCircle, FileText, Search, Bell, Bookmark,
  CheckCircle, AlertCircle
} from 'lucide-react'

interface MetricData {
  label: string
  value: number | string
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  period: 'vs last month' | 'vs last week' | 'vs last year'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface ContentPerformance {
  id: string
  title: string
  type: 'blog' | 'book' | 'video' | 'podcast' | 'email'
  publishedAt: Date
  views: number
  engagement: number
  conversions: number
  revenue: number
  trend: 'rising' | 'stable' | 'declining'
  tags: string[]
}

interface AudienceInsight {
  segment: string
  size: number
  growth: number
  engagementRate: number
  preferredContent: string[]
  demographics: {
    ageRange: string
    topLocations: string[]
    interests: string[]
  }
}

interface AnalyticsAgentProps {
  onExportReport?: (timeframe: string, metrics: string[]) => void
  onSetupTracking?: (platform: string) => void
  onCreateAlert?: (metric: string, threshold: number) => void
}

const MetricCard = ({ metric }: { metric: MetricData }) => {
  const Icon = metric.icon
  const isPositive = metric.changeType === 'increase'
  const isNegative = metric.changeType === 'decrease'

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${metric.color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
          <div className="text-sm">{metric.label}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-sm ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : '-foreground'
        }`}>
          {isPositive && <ArrowUpRight className="h-4 w-4" />}
          {isNegative && <ArrowDownRight className="h-4 w-4" />}
          <span>{isPositive || isNegative ? Math.abs(metric.change) : metric.change}%</span>
        </div>
        <span className="text-xs">{metric.period}</span>
      </div>
    </div>
  )
}

const TrendBadge = ({ trend }: { trend: ContentPerformance['trend'] }) => {
  const styles = {
    rising: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    stable: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    declining: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  }

  const icons = {
    rising: ArrowUpRight,
    stable: Activity,
    declining: ArrowDownRight
  }

  const Icon = icons[trend]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[trend]}`}>
      <Icon className="h-3 w-3" />
      {trend.charAt(0).toUpperCase() + trend.slice(1)}
    </span>
  )
}

const ContentTypeIcon = ({ type }: { type: ContentPerformance['type'] }) => {
  const icons = {
    blog: FileText,
    book: BookOpen,
    video: PlayCircle,
    podcast: PlayCircle,
    email: Mail
  }

  const Icon = icons[type]
  return <Icon className="h-4 w-4" />
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function AnalyticsAgent({ onExportReport, onSetupTracking, onCreateAlert }: AnalyticsAgentProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'audience' | 'revenue' | 'alerts'>('overview')
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'views' | 'engagement' | 'revenue' | 'date'>('views')
  const [filterType, setFilterType] = useState<'all' | ContentPerformance['type']>('all')

  // Mock data - replace with actual analytics API calls
  const metrics: MetricData[] = [
    {
      label: 'Website Visitors',
      value: '24.7K',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: Users,
      color: 'bg-blue-600'
    },
    {
      label: 'Content Views',
      value: '156K',
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Eye,
      color: 'bg-green-600'
    },
    {
      label: 'Engagement Rate',
      value: '6.8%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: Heart,
      color: 'bg-red-600'
    },
    {
      label: 'Email Subscribers',
      value: '8.9K',
      change: 15.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: Mail,
      color: 'bg-purple-600'
    },
    {
      label: 'Course Sales',
      value: formatCurrency(12450),
      change: -5.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: DollarSign,
      color: 'bg-orange-600'
    },
    {
      label: 'Book Downloads',
      value: '2.1K',
      change: 22.8,
      changeType: 'increase',
      period: 'vs last month',
      icon: BookOpen,
      color: 'bg-teal-600'
    }
  ]

  const contentPerformance: ContentPerformance[] = [
    {
      id: '1',
      title: 'The Future of Missional Leadership',
      type: 'blog',
      publishedAt: new Date('2025-08-20'),
      views: 8920,
      engagement: 7.2,
      conversions: 47,
      revenue: 2840,
      trend: 'rising',
      tags: ['leadership', 'missional', 'church']
    },
    {
      id: '2',
      title: 'Digital Discipleship Masterclass',
      type: 'video',
      publishedAt: new Date('2025-08-18'),
      views: 12500,
      engagement: 9.1,
      conversions: 89,
      revenue: 4450,
      trend: 'rising',
      tags: ['discipleship', 'digital', 'training']
    },
    {
      id: '3',
      title: 'Church Planting in Post-Christian Contexts',
      type: 'podcast',
      publishedAt: new Date('2025-08-15'),
      views: 5600,
      engagement: 8.7,
      conversions: 23,
      revenue: 1200,
      trend: 'stable',
      tags: ['church-planting', 'post-christian', 'context']
    },
    {
      id: '4',
      title: 'Weekly Leadership Insights #47',
      type: 'email',
      publishedAt: new Date('2025-08-22'),
      views: 8900,
      engagement: 6.3,
      conversions: 34,
      revenue: 890,
      trend: 'declining',
      tags: ['leadership', 'weekly', 'insights']
    },
    {
      id: '5',
      title: 'The Permanent Revolution - Chapter 3',
      type: 'book',
      publishedAt: new Date('2025-08-10'),
      views: 3200,
      engagement: 12.4,
      conversions: 156,
      revenue: 7800,
      trend: 'rising',
      tags: ['book', 'revolution', 'theology']
    }
  ]

  const audienceInsights: AudienceInsight[] = [
    {
      segment: 'Church Leaders',
      size: 3200,
      growth: 18.5,
      engagementRate: 8.9,
      preferredContent: ['Leadership Articles', 'Training Videos', 'Case Studies'],
      demographics: {
        ageRange: '35-55',
        topLocations: ['United States', 'Australia', 'United Kingdom'],
        interests: ['Church Leadership', 'Ministry Development', 'Organizational Health']
      }
    },
    {
      segment: 'Seminary Students',
      size: 1800,
      growth: 24.3,
      engagementRate: 11.2,
      preferredContent: ['Academic Articles', 'Book Excerpts', 'Theology Discussions'],
      demographics: {
        ageRange: '22-35',
        topLocations: ['United States', 'Canada', 'South Africa'],
        interests: ['Theology', 'Missional Studies', 'Church History']
      }
    },
    {
      segment: 'Church Planters',
      size: 2100,
      growth: 15.7,
      engagementRate: 9.6,
      preferredContent: ['Practical Guides', 'Success Stories', 'Resource Lists'],
      demographics: {
        ageRange: '28-45',
        topLocations: ['Australia', 'New Zealand', 'United Kingdom'],
        interests: ['Church Planting', 'Community Engagement', 'Cultural Analysis']
      }
    }
  ]

  const filteredContent = contentPerformance
    .filter(content => filterType === 'all' || content.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'views': return b.views - a.views
        case 'engagement': return b.engagement - a.engagement
        case 'revenue': return b.revenue - a.revenue
        case 'date': return b.publishedAt.getTime() - a.publishedAt.getTime()
        default: return 0
      }
    })

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Agent</h2>
          <p className="-foreground">Track performance, analyze audience, and optimize content strategy</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as typeof timeframe)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() => onExportReport?.(timeframe, selectedMetrics)}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'content', label: 'Content Performance', icon: FileText },
            { id: 'audience', label: 'Audience Insights', icon: Users },
            { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
            { id: 'alerts', label: 'Alerts & Goals', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Content */}
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Top Performing Content</h3>
                  <button className="text-sm text-primary hover:text-primary/80">View all</button>
                </div>
                <div className="space-y-3">
                  {contentPerformance.slice(0, 3).map(content => (
                    <div key={content.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ContentTypeIcon type={content.type} />
                        <div>
                          <p className="font-medium text-sm text-foreground">{content.title}</p>
                          <p className="text-xs">
                            {formatNumber(content.views)} views • {content.engagement}% engagement
                          </p>
                        </div>
                      </div>
                      <TrendBadge trend={content.trend} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Trends */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Growth Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-foreground">Audience Growth</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">+18.5%</span>
                      <div className="w-24 h-2 bg-muted rounded-full mt-1">
                        <div className="w-4/5 h-2 bg-blue-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-foreground">Engagement</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">+12.3%</span>
                      <div className="w-24 h-2 bg-muted rounded-full mt-1">
                        <div className="w-3/5 h-2 bg-red-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-foreground">Revenue</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">+24.7%</span>
                      <div className="w-24 h-2 bg-muted rounded-full mt-1">
                        <div className="w-full h-2 bg-green-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[
                  { icon: TrendingUp, text: 'Blog post "Digital Discipleship" gained 500+ views in 24h', time: '2 hours ago', color: 'text-green-600' },
                  { icon: UserPlus, text: '47 new email subscribers from lead magnet', time: '4 hours ago', color: 'text-blue-600' },
                  { icon: DollarSign, text: 'Course sales reached $2,840 this week', time: '6 hours ago', color: 'text-orange-600' },
                  { icon: Bell, text: 'Engagement rate exceeded 8% target', time: '1 day ago', color: 'text-purple-600' },
                  { icon: Star, text: 'New 5-star review on "The Permanent Revolution"', time: '2 days ago', color: 'text-yellow-600' }
                ].map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-muted/30 ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.text}</p>
                        <p className="text-xs">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content Filters */}
            <div className="flex items-center gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Content Types</option>
                <option value="blog">Blog Posts</option>
                <option value="video">Videos</option>
                <option value="podcast">Podcasts</option>
                <option value="email">Email Campaigns</option>
                <option value="book">Book Content</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="views">Sort by Views</option>
                <option value="engagement">Sort by Engagement</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>

            {/* Content Performance Table */}
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Content Performance</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium">Content</th>
                      <th className="text-left p-4 text-sm font-medium">Type</th>
                      <th className="text-right p-4 text-sm font-medium">Views</th>
                      <th className="text-right p-4 text-sm font-medium">Engagement</th>
                      <th className="text-right p-4 text-sm font-medium">Conversions</th>
                      <th className="text-right p-4 text-sm font-medium">Revenue</th>
                      <th className="text-left p-4 text-sm font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredContent.map(content => (
                      <tr key={content.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-sm text-foreground">{content.title}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {content.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs px-1.5 py-0.5 bg-muted rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <ContentTypeIcon type={content.type} />
                            <span className="text-sm capitalize">{content.type}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right text-sm text-foreground">{formatNumber(content.views)}</td>
                        <td className="p-4 text-right text-sm text-foreground">{content.engagement}%</td>
                        <td className="p-4 text-right text-sm text-foreground">{content.conversions}</td>
                        <td className="p-4 text-right text-sm text-foreground">{formatCurrency(content.revenue)}</td>
                        <td className="p-4">
                          <TrendBadge trend={content.trend} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audience' && (
          <div className="space-y-6">
            {/* Audience Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {audienceInsights.map((segment, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{segment.segment}</h3>
                    <span className="text-sm">{formatNumber(segment.size)} people</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Growth Rate</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                        <span className="text-sm font-medium text-green-600">+{segment.growth}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engagement</span>
                      <span className="text-sm font-medium text-foreground">{segment.engagementRate}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Age Range</span>
                      <span className="text-sm font-medium text-foreground">{segment.demographics.ageRange}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Preferred Content</h4>
                    <div className="flex flex-wrap gap-1">
                      {segment.preferredContent.map(content => (
                        <span key={content} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {content}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-foreground mb-2">Top Locations</h4>
                    <div className="text-xs">
                      {segment.demographics.topLocations.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Audience Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Geographic Distribution</h3>
                <div className="space-y-3">
                  {[
                    { country: 'United States', percentage: 42, visitors: 10500 },
                    { country: 'Australia', percentage: 28, visitors: 7200 },
                    { country: 'United Kingdom', percentage: 15, visitors: 3800 },
                    { country: 'Canada', percentage: 8, visitors: 2100 },
                    { country: 'South Africa', percentage: 7, visitors: 1800 }
                  ].map(location => (
                    <div key={location.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm text-foreground">{location.country}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm w-8 text-right">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Engagement Patterns</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Time on Site</span>
                      <span className="text-sm font-medium text-foreground">4m 32s</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-3/4 h-2 bg-blue-600 rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Pages per Session</span>
                      <span className="text-sm font-medium text-foreground">3.2</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-4/5 h-2 bg-green-600 rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Return Visitor Rate</span>
                      <span className="text-sm font-medium text-foreground">68%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-2/3 h-2 bg-purple-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{formatCurrency(18750)}</div>
                <div className="text-sm">Monthly Revenue</div>
                <div className="text-xs text-green-600 mt-1">↑ 24.5%</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(125)}</div>
                <div className="text-sm">Avg. Order Value</div>
                <div className="text-xs text-blue-600 mt-1">↑ 8.3%</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">4.2%</div>
                <div className="text-sm">Conversion Rate</div>
                <div className="text-xs text-red-600 mt-1">↓ 0.8%</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">150</div>
                <div className="text-sm">Active Customers</div>
                <div className="text-xs text-purple-600 mt-1">↑ 12.1%</div>
              </div>
            </div>

            {/* Revenue by Source */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Revenue by Source</h3>
                <div className="space-y-4">
                  {[
                    { source: 'Course Sales', amount: 12450, percentage: 66, color: 'bg-blue-600' },
                    { source: 'Book Sales', amount: 3800, percentage: 20, color: 'bg-green-600' },
                    { source: 'Speaking Fees', amount: 2100, percentage: 11, color: 'bg-orange-600' },
                    { source: 'Affiliates', amount: 400, percentage: 3, color: 'bg-purple-600' }
                  ].map(item => (
                    <div key={item.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${item.color}`} />
                        <span className="text-sm text-foreground">{item.source}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{formatCurrency(item.amount)}</div>
                        <div className="text-xs">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Customer Lifetime Value</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{formatCurrency(425)}</div>
                    <div className="text-sm">Average CLV</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">New Customers</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(285)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Returning Customers</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(680)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Premium Members</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(1250)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Create Alert */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Create Performance Alert</h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <select className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Select Metric</option>
                  <option>Website Visitors</option>
                  <option>Conversion Rate</option>
                  <option>Revenue</option>
                  <option>Engagement Rate</option>
                </select>
                
                <select className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Threshold Type</option>
                  <option>Above</option>
                  <option>Below</option>
                  <option>Percentage Change</option>
                </select>
                
                <input
                  type="number"
                  placeholder="Threshold Value"
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                
                <button className="btn-primary flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Create Alert
                </button>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Active Alerts</h3>
              <div className="space-y-3">
                {[
                  { id: 1, metric: 'Website Visitors', condition: 'Below 1,000/day', status: 'active', triggered: false },
                  { id: 2, metric: 'Conversion Rate', condition: 'Below 3%', status: 'active', triggered: true },
                  { id: 3, metric: 'Email Open Rate', condition: 'Below 25%', status: 'active', triggered: false },
                  { id: 4, metric: 'Course Revenue', condition: 'Above $15,000/month', status: 'paused', triggered: true }
                ].map(alert => (
                  <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    alert.triggered ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-border bg-muted/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        alert.triggered ? 'bg-red-100 dark:bg-red-900/30' : 'bg-muted'
                      }`}>
                        <Bell className={`h-4 w-4 ${
                          alert.triggered ? 'text-red-600' : '-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{alert.metric}</p>
                        <p className="text-xs">{alert.condition}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {alert.status}
                      </span>
                      {alert.triggered && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          Triggered
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals Tracking */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Monthly Goals</h3>
              <div className="space-y-4">
                {[
                  { goal: 'Website Visitors', target: 25000, current: 24700, unit: '' },
                  { goal: 'Email Subscribers', target: 10000, current: 8900, unit: '' },
                  { goal: 'Course Revenue', target: 15000, current: 12450, unit: '$' },
                  { goal: 'Content Pieces', target: 12, current: 8, unit: '' }
                ].map(goal => {
                  const percentage = Math.min((goal.current / goal.target) * 100, 100)
                  const isComplete = goal.current >= goal.target
                  
                  return (
                    <div key={goal.goal} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{goal.goal}</span>
                        <span className="text-sm">
                          {goal.unit}{goal.current.toLocaleString()} / {goal.unit}{goal.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            isComplete ? 'bg-green-600' : 'bg-primary'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{Math.round(percentage)}% complete</span>
                        {isComplete && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            Goal achieved!
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
