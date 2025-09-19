'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, Users, Eye, Clock, DollarSign, BookOpen,
  MessageCircle, Download, Calendar, BarChart3, PieChart,
  Activity, Target, Star, ArrowUp, ArrowDown, Filter,
  RefreshCw, Share, Settings, AlertTriangle, CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AnalyticsData {
  overview: {
    totalVisitors: number
    totalPageViews: number
    averageSessionDuration: number
    bounceRate: number
    conversationRate: number
    revenue: number
    activeUsers: number
    newUsers: number
    returningUsers: number
  }
  traffic: {
    daily: Array<{ date: string; visitors: number; pageViews: number }>
    sources: Array<{ source: string; visitors: number; percentage: number }>
    topPages: Array<{ page: string; views: number; bounceRate: number }>
    countries: Array<{ country: string; visitors: number; percentage: number }>
  }
  content: {
    topArticles: Array<{ title: string; views: number; engagement: number; readTime: number }>
    topBooks: Array<{ title: string; readers: number; completion: number; rating: number }>
    blogPosts: Array<{ title: string; views: number; comments: number; shares: number }>
    searchQueries: Array<{ query: string; count: number; clickThrough: number }>
  }
  users: {
    demographics: Array<{ ageGroup: string; count: number; percentage: number }>
    engagement: Array<{ segment: string; sessions: number; duration: number }>
    retention: Array<{ period: string; rate: number }>
    subscriptions: Array<{ tier: string; count: number; revenue: number }>
  }
  ai: {
    conversations: number
    satisfaction: number
    topTopics: Array<{ topic: string; count: number; satisfaction: number }>
    agentPerformance: Array<{ agent: string; conversations: number; satisfaction: number }>
  }
}

const MOCK_DATA: AnalyticsData = {
  overview: {
    totalVisitors: 45672,
    totalPageViews: 125340,
    averageSessionDuration: 4.2,
    bounceRate: 32.5,
    conversationRate: 8.7,
    revenue: 23456,
    activeUsers: 1234,
    newUsers: 2345,
    returningUsers: 3456
  },
  traffic: {
    daily: [
      { date: '2024-01-14', visitors: 1234, pageViews: 3456 },
      { date: '2024-01-15', visitors: 1345, pageViews: 3567 },
      { date: '2024-01-16', visitors: 1456, pageViews: 3678 },
      { date: '2024-01-17', visitors: 1567, pageViews: 3789 },
      { date: '2024-01-18', visitors: 1678, pageViews: 3890 },
      { date: '2024-01-19', visitors: 1789, pageViews: 4001 },
      { date: '2024-01-20', visitors: 1890, pageViews: 4112 }
    ],
    sources: [
      { source: 'Direct', visitors: 15234, percentage: 33.4 },
      { source: 'Google Search', visitors: 12345, percentage: 27.1 },
      { source: 'Social Media', visitors: 8765, percentage: 19.2 },
      { source: 'Email', visitors: 5432, percentage: 11.9 },
      { source: 'Referral', visitors: 3896, percentage: 8.5 }
    ],
    topPages: [
      { page: '/', views: 23456, bounceRate: 28.5 },
      { page: '/books', views: 18765, bounceRate: 22.1 },
      { page: '/about', views: 15432, bounceRate: 35.7 },
      { page: '/articles', views: 12345, bounceRate: 31.2 },
      { page: '/5q', views: 9876, bounceRate: 26.8 }
    ],
    countries: [
      { country: 'United States', visitors: 18234, percentage: 39.9 },
      { country: 'United Kingdom', visitors: 6789, percentage: 14.9 },
      { country: 'Australia', visitors: 4567, percentage: 10.0 },
      { country: 'Canada', visitors: 3456, percentage: 7.6 },
      { country: 'South Africa', visitors: 2890, percentage: 6.3 }
    ]
  },
  content: {
    topArticles: [
      { title: 'Understanding APEST in Modern Context', views: 5678, engagement: 89.2, readTime: 8.5 },
      { title: 'The Forgotten Ways of Mission', views: 4567, engagement: 92.1, readTime: 12.3 },
      { title: 'Building Missional Communities', views: 3456, engagement: 85.7, readTime: 9.8 },
      { title: 'Church Multiplication Strategies', views: 2890, engagement: 88.4, readTime: 11.2 }
    ],
    topBooks: [
      { title: 'The Forgotten Ways', readers: 2345, completion: 87.3, rating: 4.8 },
      { title: '5Q', readers: 1890, completion: 92.1, rating: 4.9 },
      { title: 'The Permanent Revolution', readers: 1567, completion: 83.6, rating: 4.7 },
      { title: 'ReJesus', readers: 1234, completion: 89.2, rating: 4.6 }
    ],
    blogPosts: [
      { title: 'Leadership in Post-Christendom', views: 3456, comments: 45, shares: 123 },
      { title: 'Missional Church Principles', views: 2890, comments: 38, shares: 89 },
      { title: 'APEST Assessment Guide', views: 2345, comments: 52, shares: 156 }
    ],
    searchQueries: [
      { query: 'APEST assessment', count: 1234, clickThrough: 78.5 },
      { query: 'missional church', count: 987, clickThrough: 82.1 },
      { query: 'Alan Hirsch books', count: 765, clickThrough: 89.3 },
      { query: 'church planting', count: 654, clickThrough: 76.8 }
    ]
  },
  users: {
    demographics: [
      { ageGroup: '25-34', count: 12345, percentage: 27.0 },
      { ageGroup: '35-44', count: 15678, percentage: 34.3 },
      { ageGroup: '45-54', count: 9876, percentage: 21.6 },
      { ageGroup: '55-64', count: 5432, percentage: 11.9 },
      { ageGroup: '65+', count: 2341, percentage: 5.1 }
    ],
    engagement: [
      { segment: 'Highly Engaged', sessions: 15.6, duration: 12.3 },
      { segment: 'Regular Users', sessions: 8.4, duration: 6.7 },
      { segment: 'Occasional Visitors', sessions: 3.2, duration: 3.1 },
      { segment: 'New Users', sessions: 1.8, duration: 2.4 }
    ],
    retention: [
      { period: '1 Day', rate: 45.6 },
      { period: '7 Days', rate: 28.3 },
      { period: '30 Days', rate: 18.7 },
      { period: '90 Days', rate: 12.4 }
    ],
    subscriptions: [
      { tier: 'Free', count: 8765, revenue: 0 },
      { tier: 'Basic', count: 2345, revenue: 11725 },
      { tier: 'Premium', count: 1234, revenue: 18510 },
      { tier: 'Enterprise', count: 234, revenue: 23400 }
    ]
  },
  ai: {
    conversations: 5678,
    satisfaction: 4.6,
    topTopics: [
      { topic: 'APEST Assessment', count: 1234, satisfaction: 4.8 },
      { topic: 'Church Leadership', count: 987, satisfaction: 4.5 },
      { topic: 'Missional Strategy', count: 765, satisfaction: 4.7 },
      { topic: 'Team Building', count: 543, satisfaction: 4.4 }
    ],
    agentPerformance: [
      { agent: 'APEST Agent', conversations: 3456, satisfaction: 4.7 },
      { agent: 'Missional Agent', conversations: 2222, satisfaction: 4.5 }
    ]
  }
}

export function ComprehensiveAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(MOCK_DATA)
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const handleExport = () => {
    // Export logic would go here
    console.log('Exporting analytics data...')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">{formatNumber(data.overview.totalVisitors)}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{formatNumber(data.overview.totalPageViews)}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8.3%</span>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Session</p>
                <p className="text-2xl font-bold">{data.overview.averageSessionDuration}m</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+5.7%</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(data.overview.revenue)}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+15.2%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="ai">AI Agents</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.traffic.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600" style={{ 
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                        }} />
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatNumber(source.visitors)}</p>
                        <p className="text-sm text-muted-foreground">{source.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.traffic.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          Bounce rate: {page.bounceRate}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatNumber(page.views)}</p>
                        <p className="text-sm text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Visitors by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.traffic.countries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{country.country}</span>
                      <div className="text-right">
                        <p className="font-medium">{formatNumber(country.visitors)}</p>
                        <p className="text-sm text-muted-foreground">{country.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Activity</CardTitle>
                <CardDescription>Current active users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Active Users</span>
                    <span className="text-2xl font-bold text-green-600">
                      {data.overview.activeUsers}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">New Users</span>
                      <span className="text-sm font-medium">{data.overview.newUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Returning Users</span>
                      <span className="text-sm font-medium">{data.overview.returningUsers}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Top Articles</CardTitle>
                <CardDescription>Most engaging articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.content.topArticles.map((article, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <Badge variant="secondary">{formatNumber(article.views)} views</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Engagement: {article.engagement}%</span>
                        <span>Read time: {article.readTime}min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Book Performance</CardTitle>
                <CardDescription>Reading engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.content.topBooks.map((book, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{book.title}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{book.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatNumber(book.readers)} readers</span>
                        <span>{book.completion}% completion</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Search Analytics</CardTitle>
                <CardDescription>Top search queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.content.searchQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{query.query}</p>
                        <p className="text-xs text-muted-foreground">
                          CTR: {query.clickThrough}%
                        </p>
                      </div>
                      <span className="text-sm font-medium">{query.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blog Posts</CardTitle>
                <CardDescription>Latest blog performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.content.blogPosts.map((post, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatNumber(post.views)} views</span>
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{demo.ageGroup}</span>
                      <div className="text-right">
                        <p className="font-medium">{formatNumber(demo.count)}</p>
                        <p className="text-sm text-muted-foreground">{demo.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Levels */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Engagement by user segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.engagement.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{segment.segment}</span>
                        <Badge variant="outline">{segment.sessions} sessions</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avg duration: {segment.duration} minutes
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Retention Rates */}
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>Retention by time period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.retention.map((period, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{period.period}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${period.rate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{period.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
                <CardDescription>Subscription tier distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.subscriptions.map((sub, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{sub.tier}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(sub.revenue)} revenue
                        </p>
                      </div>
                      <span className="font-medium">{formatNumber(sub.count)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Overview */}
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Overview</CardTitle>
                <CardDescription>AI conversation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Conversations</span>
                    <span className="text-2xl font-bold">{formatNumber(data.ai.conversations)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">{data.ai.satisfaction}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
                <CardDescription>Most discussed topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.ai.topTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{topic.topic}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">{topic.satisfaction}</span>
                        </div>
                      </div>
                      <span className="font-medium">{topic.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Performance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Individual agent metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.ai.agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{agent.agent}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(agent.conversations)} conversations
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Satisfaction</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{agent.satisfaction}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Revenue</span>
                    <span className="text-2xl font-bold">{formatCurrency(data.overview.revenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-bold">{data.overview.conversationRate}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(18450)}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Last Month</p>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(15230)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
                <CardDescription>Revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Book Sales</span>
                    <span className="font-medium">{formatCurrency(12500)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subscriptions</span>
                    <span className="font-medium">{formatCurrency(8900)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Courses</span>
                    <span className="font-medium">{formatCurrency(6700)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consulting</span>
                    <span className="font-medium">{formatCurrency(4300)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Donations</span>
                    <span className="font-medium">{formatCurrency(2100)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}