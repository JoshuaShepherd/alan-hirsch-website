'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { VideoUploadManager } from '@/components/VideoUploadManager'
import { VideoLibrary } from '@/components/VideoLibrary'
import { 
  Video, 
  Upload, 
  Library, 
  BarChart3, 
  Settings,
  Plus
} from 'lucide-react'

export default function VideoManagementPage() {
  const [activeTab, setActiveTab] = useState('library')
  const [videos, setVideos] = useState<any[]>([])

  const handleVideoSave = (videoData: any) => {
    console.log('Video saved:', videoData)
    setVideos(prev => [...prev, videoData])
    setActiveTab('library') // Switch to library after upload
  }

  const handleVideoPublish = (videoData: any) => {
    console.log('Video published:', videoData)
    // Update video status in the list
  }

  const handleVideoEdit = (video: any) => {
    console.log('Edit video:', video)
    // Could open edit modal or navigate to edit page
  }

  const handleVideoDelete = (videoId: string) => {
    console.log('Delete video:', videoId)
    setVideos(prev => prev.filter((v: any) => v.id !== videoId))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <Video className="w-8 h-8" />
                  Video Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Upload, manage, and optimize your video content for maximum impact
                </p>
              </div>
              
              <Button 
                onClick={() => setActiveTab('upload')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Upload Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Video Library
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Video
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

          <TabsContent value="library" className="mt-6">
            <VideoLibrary
              videos={videos}
              onVideoEdit={handleVideoEdit}
              onVideoDelete={handleVideoDelete}
              onVideoPublish={handleVideoPublish}
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <VideoUploadManager
              onVideoSave={handleVideoSave}
              onVideoPublish={handleVideoPublish}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video Analytics Dashboard - Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Coming Soon</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Video Performance Metrics
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Audience Engagement Analytics
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Content Optimization Insights
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Revenue Attribution Tracking
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Video Performance</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Watch Time Analytics
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Click-through Rates
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    Conversion Tracking
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Social Sharing Metrics
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Content Insights</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                    Topic Performance Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                    Optimal Publishing Times
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Audience Retention Patterns
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Content Recommendation Engine
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Settings - Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Upload Settings</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Default video quality settings
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Auto-thumbnail generation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Automatic transcription services
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Video compression preferences
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Player Settings</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Custom player branding
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Autoplay preferences
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    Closed caption settings
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Quality selection options
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Distribution Settings</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                    YouTube integration
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                    Vimeo synchronization
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Social media auto-posting
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Email newsletter integration
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Storage & CDN</h3>
                <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                    Cloud storage preferences
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                    CDN configuration
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Bandwidth optimization
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                    Backup and archival policies
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}