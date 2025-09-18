'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  ExternalLink, 
  Play, 
  Pause, 
  Settings, 
  BarChart3,
  Eye,
  MousePointer,
  UserCheck,
  Video,
  Mic,
  Monitor,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Activity,
  MessageCircle
} from 'lucide-react'

interface ZoomWebinar {
  id: string
  uuid: string
  topic: string
  type: 5 | 6 | 9 // Webinar, Recurring webinar, Recurring webinar with fixed time
  status: 'waiting' | 'started' | 'ended'
  start_time: string
  duration: number
  timezone: string
  agenda?: string
  created_at: string
  host_id: string
  host_email: string
  registrants_count: number
  attendees_count: number
  max_attendees: number
  settings: {
    approval_type: 0 | 1 | 2 // Automatically approve, Manually approve, No registration required
    audio: 'both' | 'telephony' | 'voip'
    auto_recording: 'local' | 'cloud' | 'none'
    enforce_login: boolean
    enforce_login_domains?: string
    alternative_hosts?: string
    close_registration: boolean
    show_share_button: boolean
    allow_multiple_devices: boolean
    on_demand: boolean
    global_dial_in_countries: string[]
    contact_name?: string
    contact_email?: string
    registrants_email_notification: boolean
    post_webinar_survey: boolean
    meeting_authentication: boolean
    authentication_option?: string
    authentication_domains?: string
    practice_session: boolean
    hd_video: boolean
    hd_video_for_attendees: boolean
    send_1080p_video_to_attendees: boolean
    enable_breakout_room: boolean
    language_interpretation: boolean
    panelists_video: boolean
    question_and_answer: {
      enable: boolean
      allow_anonymous_questions: boolean
      allow_auto_reply: boolean
      answer_questions: 'all' | 'host' | 'panelist'
      attendees_can_upvote: boolean
      attendees_can_comment: boolean
    }
    poll: {
      enable: boolean
      type: 1 | 2 | 3 // Poll, Advanced poll, Quiz
    }
    survey_url?: string
    registrants_confirmation_email: boolean
  }
  join_url: string
  registration_url?: string
  password?: string
}

interface WebinarAnalytics {
  webinar_id: string
  topic: string
  actual_start_time: string
  actual_duration: number
  total_users: number
  unique_users: number
  registration_count: number
  attendee_stats: {
    total_attendees: number
    average_attention: number
    max_concurrent: number
    drop_off_rate: number
  }
  engagement_metrics: {
    questions: number
    polls_answered: number
    chat_messages: number
    hand_raises: number
  }
  geographic_data: Array<{
    country: string
    count: number
  }>
  device_stats: {
    desktop: number
    mobile: number
    tablet: number
  }
  attendance_timeline: Array<{
    timestamp: string
    attendee_count: number
  }>
}

const SAMPLE_WEBINARS: ZoomWebinar[] = [
  {
    id: '123456789',
    uuid: 'webinar-uuid-1',
    topic: 'The Future of Church Leadership: 5Q in Practice',
    type: 5,
    status: 'waiting',
    start_time: '2024-01-25T19:00:00Z',
    duration: 90,
    timezone: 'America/New_York',
    agenda: 'Join Alan Hirsch for an in-depth exploration of the 5Q framework and its practical application in modern church leadership contexts.',
    created_at: '2024-01-15T10:00:00Z',
    host_id: 'alan_hirsch_host',
    host_email: 'alan@alanhirsch.com',
    registrants_count: 847,
    attendees_count: 0,
    max_attendees: 1000,
    settings: {
      approval_type: 0,
      audio: 'both',
      auto_recording: 'cloud',
      enforce_login: false,
      close_registration: false,
      show_share_button: true,
      allow_multiple_devices: true,
      on_demand: true,
      global_dial_in_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      registrants_email_notification: true,
      post_webinar_survey: true,
      meeting_authentication: false,
      practice_session: true,
      hd_video: true,
      hd_video_for_attendees: true,
      send_1080p_video_to_attendees: true,
      enable_breakout_room: false,
      language_interpretation: false,
      panelists_video: true,
      question_and_answer: {
        enable: true,
        allow_anonymous_questions: true,
        allow_auto_reply: false,
        answer_questions: 'host',
        attendees_can_upvote: true,
        attendees_can_comment: false
      },
      poll: {
        enable: true,
        type: 2
      },
      survey_url: 'https://alanhirsch.com/webinar-feedback',
      registrants_confirmation_email: true
    },
    join_url: 'https://zoom.us/w/123456789',
    registration_url: 'https://zoom.us/webinar/register/WN_abc123def456',
    password: 'Church2024'
  },
  {
    id: '987654321',
    uuid: 'webinar-uuid-2',
    topic: 'Movement Multiplication: Lessons from Global Church Planting',
    type: 6,
    status: 'ended',
    start_time: '2024-01-18T20:00:00Z',
    duration: 75,
    timezone: 'America/Los_Angeles',
    agenda: 'Explore strategies and case studies from successful church planting movements around the world.',
    created_at: '2024-01-08T14:00:00Z',
    host_id: 'alan_hirsch_host',
    host_email: 'alan@alanhirsch.com',
    registrants_count: 623,
    attendees_count: 489,
    max_attendees: 500,
    settings: {
      approval_type: 1,
      audio: 'both',
      auto_recording: 'cloud',
      enforce_login: false,
      close_registration: true,
      show_share_button: true,
      allow_multiple_devices: true,
      on_demand: true,
      global_dial_in_countries: ['US', 'CA', 'GB', 'AU'],
      registrants_email_notification: true,
      post_webinar_survey: true,
      meeting_authentication: false,
      practice_session: false,
      hd_video: true,
      hd_video_for_attendees: false,
      send_1080p_video_to_attendees: false,
      enable_breakout_room: true,
      language_interpretation: true,
      panelists_video: true,
      question_and_answer: {
        enable: true,
        allow_anonymous_questions: false,
        allow_auto_reply: true,
        answer_questions: 'all',
        attendees_can_upvote: true,
        attendees_can_comment: true
      },
      poll: {
        enable: true,
        type: 3
      },
      registrants_confirmation_email: true
    },
    join_url: 'https://zoom.us/w/987654321',
    registration_url: 'https://zoom.us/webinar/register/WN_xyz789ghi012'
  }
]

const SAMPLE_ANALYTICS: WebinarAnalytics[] = [
  {
    webinar_id: '987654321',
    topic: 'Movement Multiplication: Lessons from Global Church Planting',
    actual_start_time: '2024-01-18T20:05:00Z',
    actual_duration: 78,
    total_users: 512,
    unique_users: 489,
    registration_count: 623,
    attendee_stats: {
      total_attendees: 489,
      average_attention: 87.3,
      max_concurrent: 467,
      drop_off_rate: 12.8
    },
    engagement_metrics: {
      questions: 47,
      polls_answered: 356,
      chat_messages: 189,
      hand_raises: 23
    },
    geographic_data: [
      { country: 'United States', count: 234 },
      { country: 'Canada', count: 89 },
      { country: 'United Kingdom', count: 67 },
      { country: 'Australia', count: 45 },
      { country: 'Germany', count: 34 },
      { country: 'Other', count: 20 }
    ],
    device_stats: {
      desktop: 387,
      mobile: 78,
      tablet: 24
    },
    attendance_timeline: [
      { timestamp: '20:05', attendee_count: 123 },
      { timestamp: '20:10', attendee_count: 289 },
      { timestamp: '20:15', attendee_count: 423 },
      { timestamp: '20:20', attendee_count: 467 },
      { timestamp: '20:25', attendee_count: 456 },
      { timestamp: '20:30', attendee_count: 445 },
      { timestamp: '20:35', attendee_count: 434 },
      { timestamp: '20:40', attendee_count: 421 },
      { timestamp: '20:45', attendee_count: 398 },
      { timestamp: '20:50', attendee_count: 376 },
      { timestamp: '20:55', attendee_count: 352 },
      { timestamp: '21:00', attendee_count: 298 }
    ]
  }
]

export default function WorkshopDeliveryIntegration() {
  const [webinars, setWebinars] = useState<ZoomWebinar[]>(SAMPLE_WEBINARS)
  const [analytics, setAnalytics] = useState<WebinarAnalytics[]>(SAMPLE_ANALYTICS)
  const [selectedWebinar, setSelectedWebinar] = useState<ZoomWebinar | null>(null)

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    }
  }

  const getWebinarStats = () => {
    const totalRegistrants = webinars.reduce((sum, webinar) => sum + webinar.registrants_count, 0)
    const totalAttendees = webinars.reduce((sum, webinar) => sum + webinar.attendees_count, 0)
    const avgAttendanceRate = webinars.length > 0 ? 
      (totalAttendees / totalRegistrants * 100) : 0
    
    return { totalRegistrants, totalAttendees, avgAttendanceRate }
  }

  const stats = getWebinarStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Workshop Delivery Platform</span>
          </CardTitle>
          <CardDescription>
            Zoom webinar integration for hosting workshops and online events
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrants</p>
                <p className="text-2xl font-bold">{stats.totalRegistrants.toLocaleString()}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold">{stats.totalAttendees.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold">{stats.avgAttendanceRate.toFixed(1)}%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Webinars</p>
                <p className="text-2xl font-bold">
                  {webinars.filter(w => w.status === 'waiting').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="webinars" className="space-y-6">
        <TabsList>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="webinars" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upcoming & Recent Webinars</h3>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Webinar
            </Button>
          </div>

          <div className="grid gap-6">
            {webinars.map((webinar) => {
              const dateTime = formatDateTime(webinar.start_time)
              const attendanceRate = webinar.registrants_count > 0 ? 
                (webinar.attendees_count / webinar.registrants_count * 100) : 0
              
              return (
                <Card key={webinar.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{webinar.topic}</h3>
                            <Badge 
                              variant={
                                webinar.status === 'started' ? 'default' :
                                webinar.status === 'waiting' ? 'secondary' : 'outline'
                              }
                              className={
                                webinar.status === 'started' ? 'bg-green-100 text-green-800' :
                                webinar.status === 'waiting' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {webinar.status}
                            </Badge>
                          </div>
                          
                          {webinar.agenda && (
                            <p className="text-gray-600 text-sm">{webinar.agenda}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{dateTime.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{webinar.duration} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <UserCheck className="h-4 w-4" />
                            <span>{webinar.registrants_count} registered</span>
                          </div>
                          {webinar.attendees_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{webinar.attendees_count} attended ({attendanceRate.toFixed(1)}%)</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Monitor className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">HD Video</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mic className="h-4 w-4 text-green-500" />
                            <span className="text-sm capitalize">{webinar.settings.audio} Audio</span>
                          </div>
                          {webinar.settings.auto_recording !== 'none' && (
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4 text-purple-500" />
                              <span className="text-sm capitalize">{webinar.settings.auto_recording} Recording</span>
                            </div>
                          )}
                          {webinar.settings.question_and_answer.enable && (
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">Q&A Enabled</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Webinar ID:</span>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{webinar.id}</code>
                          </div>
                          
                          {webinar.password && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Password:</span>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">{webinar.password}</code>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        {webinar.status === 'waiting' && (
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Start Webinar
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(webinar.join_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join URL
                        </Button>
                        
                        {webinar.registration_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(webinar.registration_url!, '_blank')}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Registration
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedWebinar(webinar)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    {webinar.status === 'waiting' && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Registration Progress</span>
                          <span>{webinar.registrants_count} / {webinar.max_attendees}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(webinar.registrants_count / webinar.max_attendees) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {analytics.map((data) => (
            <Card key={data.webinar_id}>
              <CardHeader>
                <CardTitle>{data.topic}</CardTitle>
                <CardDescription>
                  {formatDateTime(data.actual_start_time).date} • {data.actual_duration} minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{data.attendee_stats.total_attendees}</div>
                    <div className="text-sm text-gray-600">Total Attendees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">{data.attendee_stats.average_attention}%</div>
                    <div className="text-sm text-gray-600">Avg. Attention</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">{data.attendee_stats.max_concurrent}</div>
                    <div className="text-sm text-gray-600">Peak Attendance</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded">
                    <div className="text-2xl font-bold text-orange-600">{data.engagement_metrics.questions}</div>
                    <div className="text-sm text-gray-600">Questions Asked</div>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Engagement Overview</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Poll Responses</span>
                        <span className="font-medium">{data.engagement_metrics.polls_answered}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Chat Messages</span>
                        <span className="font-medium">{data.engagement_metrics.chat_messages}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hand Raises</span>
                        <span className="font-medium">{data.engagement_metrics.hand_raises}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Drop-off Rate</span>
                        <span className="font-medium">{data.attendee_stats.drop_off_rate}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Geographic Distribution</h4>
                    <div className="space-y-2">
                      {data.geographic_data.map((geo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{geo.country}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(geo.count / data.attendee_stats.total_attendees) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8">{geo.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Device Stats */}
                <div>
                  <h4 className="font-medium mb-3">Device Usage</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded">
                      <Monitor className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <div className="font-medium">{data.device_stats.desktop}</div>
                      <div className="text-xs text-gray-600">Desktop</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <Smartphone className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <div className="font-medium">{data.device_stats.mobile}</div>
                      <div className="text-xs text-gray-600">Mobile</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <Monitor className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <div className="font-medium">{data.device_stats.tablet}</div>
                      <div className="text-xs text-gray-600">Tablet</div>
                    </div>
                  </div>
                </div>

                {/* Attendance Timeline */}
                <div>
                  <h4 className="font-medium mb-3">Attendance Timeline</h4>
                  <div className="h-32 bg-gray-50 rounded p-4 flex items-end space-x-1">
                    {data.attendance_timeline.map((point, index) => (
                      <div 
                        key={index} 
                        className="bg-blue-500 rounded-t flex-1 min-w-0 transition-all duration-300"
                        style={{ 
                          height: `${(point.attendee_count / data.attendee_stats.max_concurrent) * 100}%`,
                          minHeight: '4px'
                        }}
                        title={`${point.timestamp}: ${point.attendee_count} attendees`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Start</span>
                    <span>End</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Webinar Settings</CardTitle>
              <CardDescription>Configure default settings for new webinars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Audio & Video</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HD Video for Host</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HD Video for Attendees</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1080p Video Quality</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto Recording</span>
                      <select className="text-sm border rounded px-2 py-1">
                        <option value="none">None</option>
                        <option value="local">Local</option>
                        <option value="cloud">Cloud</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Registration & Access</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-approve Registration</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require Login</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Practice Session</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">On-demand Access</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Interaction Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Q&A Session</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Polls & Surveys</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chat</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Breakout Rooms</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Registration Confirmation</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reminder Emails</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Follow-up Survey</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Recording Available</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button>Save Default Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
