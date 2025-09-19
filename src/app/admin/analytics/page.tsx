'use client'

import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3,
  TrendingUp,
  Target,
  Activity,
  Eye,
  Users,
  DollarSign
} from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                Content Analytics & Performance
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Comprehensive insights into content performance, audience engagement, and ROI
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23% Growth
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Target className="w-3 h-3 mr-1" />
                87% Goal Achievement
              </Badge>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">29.1K</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+23.5% vs last month</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">18.3%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8.2% improvement</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">789</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Shares</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+15.7% increase</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">22.1%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">-2.1% vs target</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">$24.5K</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">4.2x ROI</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <TrendingUp className="w-5 h-5" />
              Key Insights This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Video Content Performing Best</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">18.7% avg conversion rate</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Tuesday/Wednesday Peak</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Best publishing days identified</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Mobile Traffic Growing</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">42% of views now mobile</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
