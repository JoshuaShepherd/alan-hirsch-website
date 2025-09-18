'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Video, 
  Users, 
  Calendar, 
  Clock, 
  Settings, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Link2,
  Play,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  Phone
} from 'lucide-react'

interface ZoomMeeting {
  id: string
  uuid: string
  host_id: string
  topic: string
  type: 1 | 2 | 3 | 8 // Instant, Scheduled, Recurring with no fixed time, Recurring with fixed time
  status: 'waiting' | 'started' | 'ended'
  start_time: string
  duration: number
  timezone: string
  agenda?: string
  created_at: string
  start_url: string
  join_url: string
  password?: string
  h323_password?: string
  pstn_password?: string
  encrypted_password?: string
  settings: {
    host_video: boolean
    participant_video: boolean
    cn_meeting: boolean
    in_meeting: boolean
    join_before_host: boolean
    mute_upon_entry: boolean
    watermark: boolean
    use_pmi: boolean
    approval_type: 0 | 1 | 2 // Automatically approve, Manually approve, No registration required
    audio: 'both' | 'telephony' | 'voip'
    auto_recording: 'local' | 'cloud' | 'none'
    enforce_login: boolean
    enforce_login_domains?: string
    alternative_hosts?: string
    close_registration: boolean
    show_share_button: boolean
    allow_multiple_devices: boolean
    registrants_confirmation_email: boolean
    waiting_room: boolean
    request_permission_to_unmute_participants: boolean
    global_dial_in_countries: string[]
    global_dial_in_numbers: Array<{
      country: string
      country_name: string
      city: string
      number: string
      type: string
    }>
    contact_name?: string
    contact_email?: string
    registrants_email_notification: boolean
    meeting_authentication: boolean
    authentication_option?: string
    authentication_domains?: string
  }
  recurrence?: {
    type: 1 | 2 | 3 // Daily, Weekly, Monthly
    repeat_interval: number
    weekly_days?: string
    monthly_day?: number
    monthly_week?: number
    monthly_week_day?: number
    end_times?: number
    end_date_time?: string
  }
}

interface TeamsMeeting {
  id: string
  subject: string
  body?: {
    contentType: 'html' | 'text'
    content: string
  }
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  location?: {
    displayName?: string
    locationUri?: string
    uniqueId?: string
    uniqueIdType?: string
  }
  attendees: Array<{
    type: 'required' | 'optional' | 'resource'
    status: {
      response: 'none' | 'organizer' | 'tentativelyAccepted' | 'accepted' | 'declined' | 'notResponded'
      time: string
    }
    emailAddress: {
      name: string
      address: string
    }
  }>
  organizer: {
    emailAddress: {
      name: string
      address: string
    }
  }
  webLink: string
  onlineMeeting?: {
    joinUrl: string
    conferenceId: string
    tollNumber?: string
    tollFreeNumber?: string
    dialinUrl?: string
    quickDial?: string
  }
  isOnlineMeeting: boolean
  onlineMeetingProvider: 'teamsForBusiness' | 'skypeForBusiness' | 'skypeForConsumer'
  allowNewTimeProposals: boolean
  recurrence?: {
    pattern: {
      type: 'daily' | 'weekly' | 'absoluteMonthly' | 'relativeMonthly' | 'absoluteYearly' | 'relativeYearly'
      interval: number
      month?: number
      dayOfMonth?: number
      daysOfWeek?: string[]
      firstDayOfWeek?: string
      index?: string
    }
    range: {
      type: 'endDate' | 'noEnd' | 'numbered'
      startDate: string
      endDate?: string
      numberOfOccurrences?: number
      recurrenceTimeZone?: string
    }
  }
}

const SAMPLE_ZOOM_MEETINGS: ZoomMeeting[] = [
  {
    id: '123456789',
    uuid: 'zoom-uuid-1',
    host_id: 'alan_hirsch_host',
    topic: 'Leadership Transformation Workshop',
    type: 2,
    status: 'waiting',
    start_time: '2024-01-25T15:00:00Z',
    duration: 120,
    timezone: 'America/New_York',
    agenda: 'Deep dive into the 5Q framework and its application in modern church leadership contexts.',
    created_at: '2024-01-20T10:00:00Z',
    start_url: 'https://zoom.us/s/123456789?role=1',
    join_url: 'https://zoom.us/j/123456789',
    password: 'AlanH2024',
    settings: {
      host_video: true,
      participant_video: true,
      cn_meeting: false,
      in_meeting: true,
      join_before_host: false,
      mute_upon_entry: true,
      watermark: false,
      use_pmi: false,
      approval_type: 0,
      audio: 'both',
      auto_recording: 'cloud',
      enforce_login: false,
      close_registration: false,
      show_share_button: true,
      allow_multiple_devices: true,
      registrants_confirmation_email: true,
      waiting_room: true,
      request_permission_to_unmute_participants: true,
      global_dial_in_countries: ['US', 'CA', 'GB', 'AU'],
      global_dial_in_numbers: [
        {
          country: 'US',
          country_name: 'United States',
          city: 'New York',
          number: '+1 646 558 8656',
          type: 'toll'
        }
      ],
      registrants_email_notification: true,
      meeting_authentication: false
    }
  },
  {
    id: '987654321',
    uuid: 'zoom-uuid-2',
    host_id: 'alan_hirsch_host',
    topic: 'Movement Leaders Cohort - Monthly Check-in',
    type: 8,
    status: 'waiting',
    start_time: '2024-01-30T18:00:00Z',
    duration: 90,
    timezone: 'America/Los_Angeles',
    agenda: 'Monthly cohort session focusing on movement multiplication strategies and peer learning.',
    created_at: '2024-01-15T09:00:00Z',
    start_url: 'https://zoom.us/s/987654321?role=1',
    join_url: 'https://zoom.us/j/987654321',
    password: 'Cohort24',
    settings: {
      host_video: true,
      participant_video: true,
      cn_meeting: false,
      in_meeting: true,
      join_before_host: true,
      mute_upon_entry: false,
      watermark: true,
      use_pmi: true,
      approval_type: 1,
      audio: 'both',
      auto_recording: 'cloud',
      enforce_login: true,
      close_registration: false,
      show_share_button: true,
      allow_multiple_devices: true,
      registrants_confirmation_email: true,
      waiting_room: false,
      request_permission_to_unmute_participants: false,
      global_dial_in_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      global_dial_in_numbers: [
        {
          country: 'US',
          country_name: 'United States',
          city: 'Los Angeles',
          number: '+1 213 338 8477',
          type: 'toll'
        }
      ],
      registrants_email_notification: true,
      meeting_authentication: true,
      authentication_option: 'Sign in to Zoom'
    },
    recurrence: {
      type: 3,
      repeat_interval: 1,
      monthly_day: 30,
      end_times: 12
    }
  }
]

const SAMPLE_TEAMS_MEETINGS: TeamsMeeting[] = [
  {
    id: 'teams-meeting-1',
    subject: '5Q Assessment Strategy Session',
    body: {
      contentType: 'html',
      content: '<p>Strategic planning session for the new 5Q assessment platform rollout.</p>'
    },
    start: {
      dateTime: '2024-01-26T14:00:00',
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: '2024-01-26T15:30:00',
      timeZone: 'America/New_York'
    },
    attendees: [
      {
        type: 'required',
        status: {
          response: 'accepted',
          time: '2024-01-22T10:00:00Z'
        },
        emailAddress: {
          name: 'Team Lead',
          address: 'team@alanhirsch.com'
        }
      }
    ],
    organizer: {
      emailAddress: {
        name: 'Alan Hirsch',
        address: 'alan@alanhirsch.com'
      }
    },
    webLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123',
    onlineMeeting: {
      joinUrl: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123',
      conferenceId: '123456789',
      tollNumber: '+1-555-123-4567',
      dialinUrl: 'https://dialin.teams.microsoft.com/abc123'
    },
    isOnlineMeeting: true,
    onlineMeetingProvider: 'teamsForBusiness',
    allowNewTimeProposals: true
  }
]

export default function VideoConferencingIntegration() {
  const [platform, setPlatform] = useState<'zoom' | 'teams'>('zoom')
  const [isConnected, setIsConnected] = useState({ zoom: true, teams: false })
  const [isLoading, setIsLoading] = useState(false)
  const [zoomMeetings, setZoomMeetings] = useState<ZoomMeeting[]>(SAMPLE_ZOOM_MEETINGS)
  const [teamsMeetings, setTeamsMeetings] = useState<TeamsMeeting[]>(SAMPLE_TEAMS_MEETINGS)

  const connectPlatform = async (platformType: 'zoom' | 'teams') => {
    setIsLoading(true)
    // Simulate OAuth connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnected(prev => ({ ...prev, [platformType]: true }))
    setIsLoading(false)
  }

  const createInstantMeeting = async (platformType: 'zoom' | 'teams', topic: string) => {
    if (platformType === 'zoom') {
      const newMeeting: ZoomMeeting = {
        id: Date.now().toString(),
        uuid: `zoom-${Date.now()}`,
        host_id: 'alan_hirsch_host',
        topic,
        type: 1, // Instant meeting
        status: 'started',
        start_time: new Date().toISOString(),
        duration: 60,
        timezone: 'America/New_York',
        created_at: new Date().toISOString(),
        start_url: `https://zoom.us/s/${Date.now()}?role=1`,
        join_url: `https://zoom.us/j/${Date.now()}`,
        password: 'Instant24',
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'none',
          enforce_login: false,
          close_registration: false,
          show_share_button: true,
          allow_multiple_devices: true,
          registrants_confirmation_email: false,
          waiting_room: false,
          request_permission_to_unmute_participants: true,
          global_dial_in_countries: ['US'],
          global_dial_in_numbers: [],
          registrants_email_notification: false,
          meeting_authentication: false
        }
      }
      setZoomMeetings(prev => [newMeeting, ...prev])
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit'
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Platform Selection & Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Video Conferencing Integration</span>
          </CardTitle>
          <CardDescription>
            Manage workshop delivery through Zoom and Microsoft Teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Zoom */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Zoom</h3>
                  <p className="text-sm text-gray-600">Video conferencing platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isConnected.zoom ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <>
                    <Badge variant="outline" className="text-red-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Disconnected
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectPlatform('zoom')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Microsoft Teams</h3>
                  <p className="text-sm text-gray-600">Enterprise collaboration platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isConnected.teams ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <>
                    <Badge variant="outline" className="text-red-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Disconnected
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectPlatform('teams')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Management */}
      <Tabs value={platform} onValueChange={(value) => setPlatform(value as 'zoom' | 'teams')}>
        <TabsList>
          <TabsTrigger value="zoom" disabled={!isConnected.zoom}>
            Zoom Meetings
          </TabsTrigger>
          <TabsTrigger value="teams" disabled={!isConnected.teams}>
            Teams Meetings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zoom" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Zoom Meetings</h3>
            <Button onClick={() => createInstantMeeting('zoom', 'Instant Workshop Session')}>
              <Play className="h-4 w-4 mr-2" />
              Start Instant Meeting
            </Button>
          </div>

          <div className="grid gap-4">
            {zoomMeetings.map((meeting) => {
              const dateTime = formatDateTime(meeting.start_time)
              
              return (
                <Card key={meeting.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">{meeting.topic}</h4>
                          {meeting.agenda && (
                            <p className="text-gray-600 text-sm mt-1">{meeting.agenda}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                            <span>{meeting.duration} minutes</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={meeting.status === 'started' ? 'default' : 'secondary'}
                            className={
                              meeting.status === 'started' ? 'bg-green-100 text-green-800' :
                              meeting.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {meeting.status}
                          </Badge>
                          <Badge variant="outline">
                            {meeting.type === 1 ? 'Instant' : 
                             meeting.type === 2 ? 'Scheduled' :
                             meeting.type === 8 ? 'Recurring' : 'Meeting'}
                          </Badge>
                          {meeting.settings.auto_recording !== 'none' && (
                            <Badge variant="outline">Recording: {meeting.settings.auto_recording}</Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Meeting ID:</span>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{meeting.id}</code>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(meeting.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {meeting.password && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Password:</span>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">{meeting.password}</code>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(meeting.password!)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm"
                          onClick={() => window.open(meeting.start_url, '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start (Host)
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(meeting.join_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>

                    {/* Meeting Settings Summary */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          {meeting.settings.host_video ? (
                            <Camera className="h-4 w-4 text-green-600" />
                          ) : (
                            <CameraOff className="h-4 w-4 text-gray-400" />
                          )}
                          <span>Host Video</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {meeting.settings.participant_video ? (
                            <Camera className="h-4 w-4 text-green-600" />
                          ) : (
                            <CameraOff className="h-4 w-4 text-gray-400" />
                          )}
                          <span>Participant Video</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {meeting.settings.mute_upon_entry ? (
                            <MicOff className="h-4 w-4 text-orange-600" />
                          ) : (
                            <Mic className="h-4 w-4 text-green-600" />
                          )}
                          <span>Entry Audio</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {meeting.settings.waiting_room ? (
                            <Users className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Users className="h-4 w-4 text-gray-400" />
                          )}
                          <span>Waiting Room</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Microsoft Teams Meetings</h3>
            <Button onClick={() => createInstantMeeting('teams', 'Instant Teams Session')}>
              <Play className="h-4 w-4 mr-2" />
              Start Instant Meeting
            </Button>
          </div>

          <div className="grid gap-4">
            {teamsMeetings.map((meeting) => {
              const startTime = formatDateTime(meeting.start.dateTime)
              const endTime = formatDateTime(meeting.end.dateTime)
              
              return (
                <Card key={meeting.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">{meeting.subject}</h4>
                          {meeting.body && (
                            <div 
                              className="text-gray-600 text-sm mt-1"
                              dangerouslySetInnerHTML={{ __html: meeting.body.content }}
                            />
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{startTime.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{startTime.time} - {endTime.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{meeting.attendees.length} attendees</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge className="bg-purple-100 text-purple-800">
                            Teams Meeting
                          </Badge>
                          {meeting.onlineMeeting?.conferenceId && (
                            <Badge variant="outline">
                              Conference ID: {meeting.onlineMeeting.conferenceId}
                            </Badge>
                          )}
                        </div>

                        {meeting.onlineMeeting?.tollNumber && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">Dial-in: {meeting.onlineMeeting.tollNumber}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(meeting.onlineMeeting!.tollNumber!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm"
                          onClick={() => window.open(meeting.onlineMeeting?.joinUrl || meeting.webLink, '_blank')}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Teams
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(meeting.webLink, '_blank')}
                        >
                          <Link2 className="h-4 w-4 mr-2" />
                          Meeting Details
                        </Button>
                      </div>
                    </div>

                    {/* Attendees */}
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-2">Attendees</h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          <Users className="h-3 w-3 mr-1" />
                          {meeting.organizer.emailAddress.name} (Organizer)
                        </Badge>
                        {meeting.attendees.map((attendee, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className={
                              attendee.status.response === 'accepted' ? 'bg-green-50 text-green-700' :
                              attendee.status.response === 'tentativelyAccepted' ? 'bg-yellow-50 text-yellow-700' :
                              attendee.status.response === 'declined' ? 'bg-red-50 text-red-700' :
                              'bg-gray-50 text-gray-700'
                            }
                          >
                            {attendee.emailAddress.name} ({attendee.status.response})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
