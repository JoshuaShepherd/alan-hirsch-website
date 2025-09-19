'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EditorialCalendar } from '@/components/EditorialCalendar'
import { 
  Calendar,
  BarChart3,
  Users,
  Target,
  Clock,
  TrendingUp,
  FileText,
  Video,
  Mic,
  Image,
  AlertTriangle,
  CheckCircle,
  CalendarDays,
  Settings
} from 'lucide-react'

export default function EditorialPage() {
  const [activeTab, setActiveTab] = useState('calendar')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                Editorial Planning
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Plan, schedule, and track content creation across all formats
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                <Target className="w-3 h-3 mr-1" />
                12 This Month
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="w-3 h-3 mr-1" />
                3 Overdue
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+15% this month</span>
                  </div>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due This Week</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-yellow-600">2 high priority</span>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Published This Week</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">On schedule</span>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">All active</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Content Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of content types in production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Blog Posts', count: 12, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                  { type: 'Videos', count: 6, icon: Video, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
                  { type: 'Podcasts', count: 4, icon: Mic, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
                  { type: 'Social Media', count: 8, icon: Image, color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${item.bg}`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.count}</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}
                          style={{ width: `${(item.count / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Workload
              </CardTitle>
              <CardDescription>
                Current assignments by team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alan Hirsch', active: 5, completed: 12, workload: 85 },
                  { name: 'Production Team', active: 3, completed: 8, workload: 60 },
                  { name: 'Content Team', active: 4, completed: 6, workload: 70 },
                  { name: 'Editorial Team', active: 2, completed: 9, workload: 40 },
                  { name: 'Marketing Team', active: 1, completed: 4, workload: 25 },
                ].map((member, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {member.active} active, {member.completed} completed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            member.workload > 80 ? 'bg-red-500' : 
                            member.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${member.workload}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {member.workload}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Content Pipeline
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <EditorialCalendar />
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            {/* Content Pipeline View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['Planning', 'In Progress', 'Review & Publishing'].map((stage, stageIndex) => (
                <Card key={stage}>
                  <CardHeader>
                    <CardTitle className="text-lg">{stage}</CardTitle>
                    <CardDescription>
                      {stageIndex === 0 && 'Ideas and content planning'}
                      {stageIndex === 1 && 'Active content creation'}
                      {stageIndex === 2 && 'Final review and publication'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        stageIndex === 0 ? [
                          { title: 'Q2 Video Series Planning', type: 'video', priority: 'high', assignee: 'Production Team' },
                          { title: 'Social Media Campaign Ideas', type: 'social', priority: 'medium', assignee: 'Marketing Team' },
                          { title: 'Podcast Guest Outreach', type: 'podcast', priority: 'low', assignee: 'Content Team' },
                        ] : stageIndex === 1 ? [
                          { title: 'APEST Framework Deep Dive', type: 'blog', priority: 'high', assignee: 'Alan Hirsch' },
                          { title: 'Movement Stories Interview', type: 'podcast', priority: 'medium', assignee: 'Content Team' },
                          { title: 'Partner Spotlight Video', type: 'video', priority: 'medium', assignee: 'Production Team' },
                        ] : [
                          { title: 'Monthly Newsletter', type: 'newsletter', priority: 'high', assignee: 'Editorial Team' },
                          { title: 'Leadership Article', type: 'blog', priority: 'medium', assignee: 'Alan Hirsch' },
                          { title: 'Podcast Episode 12', type: 'podcast', priority: 'low', assignee: 'Content Team' },
                        ]
                      ][0].map((item, i) => (
                        <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={
                              item.type === 'blog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              item.type === 'video' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                              item.type === 'podcast' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              item.type === 'social' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            }>
                              {item.type}
                            </Badge>
                            <Badge className={
                              item.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }>
                              {item.priority}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Assigned to {item.assignee}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance Trends</CardTitle>
                  <CardDescription>
                    Publication frequency and engagement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Content performance chart would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Productivity</CardTitle>
                  <CardDescription>
                    Completion rates and deadline adherence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'On-time Delivery', value: 87, trend: '+5%' },
                      { metric: 'Content Quality Score', value: 92, trend: '+3%' },
                      { metric: 'Team Utilization', value: 76, trend: '-2%' },
                      { metric: 'Collaboration Score', value: 84, trend: '+8%' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{item.value}%</span>
                          <span className={`text-xs ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend}
                          </span>
                        </div>
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
                  <CardTitle>Workflow Settings</CardTitle>
                  <CardDescription>
                    Configure content creation workflows and approval processes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Require approval for publishing</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-assign based on content type</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Send deadline reminders</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SEO optimization required</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>
                    Manage team members and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Alan Hirsch', role: 'Content Creator', status: 'Active' },
                      { name: 'Production Team', role: 'Video Production', status: 'Active' },
                      { name: 'Content Team', role: 'Content Creation', status: 'Active' },
                      { name: 'Editorial Team', role: 'Editing & Review', status: 'Active' },
                      { name: 'Marketing Team', role: 'Social & Promotion', status: 'Active' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {member.status}
                        </Badge>
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