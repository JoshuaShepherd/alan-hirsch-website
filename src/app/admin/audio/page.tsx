'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AudioUploadManager } from '@/components/AudioUploadManager'
import { PodcastLibrary } from '@/components/PodcastLibrary'
import { 
  Mic, 
  Upload, 
  Library, 
  BarChart3, 
  Settings,
  Headphones,
  Radio,
  Rss,
  Calendar,
  FileAudio,
  Users
} from 'lucide-react'

export default function AudioManagementPage() {
  const [activeTab, setActiveTab] = useState('library')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                Audio & Podcast Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Upload, manage, and distribute your podcast episodes and audio content
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                <Radio className="w-3 h-3 mr-1" />
                3 Active Shows
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <FileAudio className="w-3 h-3 mr-1" />
                12 Episodes
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Episodes</p>
                </div>
                <Mic className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                </div>
                <Radio className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">15.2K</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Listens</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Runtime</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">RSS Feeds</p>
                </div>
                <Rss className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Episode Library
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Episode
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6">
            <PodcastLibrary />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <AudioUploadManager />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Episode Performance
                  </CardTitle>
                  <CardDescription>
                    Top performing episodes by listen count
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Understanding the APEST Framework', listens: 3450, growth: '+12%' },
                      { title: 'Church Planting in Urban Australia', listens: 2890, growth: '+8%' },
                      { title: 'The Missional Imperative', listens: 2750, growth: '+15%' },
                      { title: 'Leadership in Post-Christendom', listens: 2340, growth: '+5%' },
                    ].map((episode, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{episode.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {episode.listens.toLocaleString()} listens
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {episode.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="w-5 h-5" />
                    Show Performance
                  </CardTitle>
                  <CardDescription>
                    Performance breakdown by podcast show
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { show: 'The Missional Leader Podcast', episodes: 8, listens: 12500, avgListens: 1563 },
                      { show: 'APEST Insights', episodes: 3, listens: 8200, avgListens: 2733 },
                      { show: 'Movement Stories', episodes: 1, listens: 2100, avgListens: 2100 },
                    ].map((show, i) => (
                      <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-2">{show.show}</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Episodes</p>
                            <p className="font-semibold">{show.episodes}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Total Listens</p>
                            <p className="font-semibold">{show.listens.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Avg per Episode</p>
                            <p className="font-semibold">{show.avgListens.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Publishing Calendar
                  </CardTitle>
                  <CardDescription>
                    Upcoming and recent episode releases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        date: '2024-03-22', 
                        title: 'Discipleship in the Digital Age', 
                        show: 'The Missional Leader Podcast',
                        status: 'scheduled',
                        type: 'Interview'
                      },
                      { 
                        date: '2024-03-20', 
                        title: 'Quick Insight: Prayer and Mission', 
                        show: 'APEST Insights',
                        status: 'draft',
                        type: 'Solo Reflection'
                      },
                      { 
                        date: '2024-03-18', 
                        title: 'Movement Stories: European Revival', 
                        show: 'Movement Stories',
                        status: 'recording',
                        type: 'Interview'
                      },
                      { 
                        date: '2024-03-15', 
                        title: 'Understanding the APEST Framework', 
                        show: 'The Missional Leader Podcast',
                        status: 'published',
                        type: 'Teaching'
                      },
                    ].map((episode, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">
                              {new Date(episode.date).getDate()}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {new Date(episode.date).toLocaleDateString('en-US', { month: 'short' })}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">{episode.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {episode.show} • {episode.type}
                            </p>
                          </div>
                        </div>
                        <Badge className={
                          episode.status === 'published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : episode.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : episode.status === 'recording'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }>
                          {episode.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Settings Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="w-5 h-5" />
                    Podcast Shows
                  </CardTitle>
                  <CardDescription>
                    Manage your podcast show configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'The Missional Leader Podcast', episodes: 8, active: true },
                      { name: 'APEST Insights', episodes: 3, active: true },
                      { name: 'Movement Stories', episodes: 1, active: true },
                    ].map((show, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium">{show.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {show.episodes} episodes
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={show.active ? 'default' : 'secondary'}>
                            {show.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      <Radio className="w-4 h-4 mr-2" />
                      Add New Show
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rss className="w-5 h-5" />
                    RSS Feeds
                  </CardTitle>
                  <CardDescription>
                    Manage podcast distribution RSS feeds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { show: 'The Missional Leader Podcast', url: 'https://feeds.alanhirsch.org/missional-leader', status: 'active' },
                      { show: 'APEST Insights', url: 'https://feeds.alanhirsch.org/apest-insights', status: 'active' },
                      { show: 'Movement Stories', url: 'https://feeds.alanhirsch.org/movement-stories', status: 'active' },
                    ].map((feed, i) => (
                      <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{feed.show}</h4>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {feed.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {feed.url}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Copy URL
                          </Button>
                          <Button size="sm" variant="outline">
                            Validate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}