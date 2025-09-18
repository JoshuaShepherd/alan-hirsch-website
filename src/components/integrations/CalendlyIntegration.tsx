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
  User, 
  Video, 
  Phone, 
  MapPin, 
  Link2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

interface CalendlyEvent {
  uuid: string
  name: string
  slug: string
  duration: number
  description: string
  booking_url: string
  color: string
  internal_note?: string
  pooling_type: string
  type: 'StandardEventType' | 'GroupEventType'
  kind: 'solo' | 'group'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

interface CalendlyBooking {
  uuid: string
  event: {
    uuid: string
    name: string
    start_time: string
    end_time: string
  }
  invitee: {
    uuid: string
    name: string
    email: string
    timezone: string
    created_at: string
  }
  status: 'active' | 'canceled'
  questions_and_answers: Array<{
    question: string
    answer: string
  }>
  location?: {
    type: 'zoom' | 'teams' | 'phone' | 'in_person'
    location: string
  }
  payment?: {
    external_id: string
    provider: string
    amount: number
    currency: string
    terms: string
  }
}

const SAMPLE_EVENTS: CalendlyEvent[] = [
  {
    uuid: 'event-1',
    name: 'Leadership Consultation',
    slug: 'leadership-consultation',
    duration: 60,
    description: 'One-on-one strategic consultation for missional leaders and church planters.',
    booking_url: 'https://calendly.com/alanhirsch/leadership-consultation',
    color: '#2563eb',
    pooling_type: 'round_robin',
    type: 'StandardEventType',
    kind: 'solo',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    uuid: 'event-2',
    name: 'Workshop Planning Session',
    slug: 'workshop-planning',
    duration: 45,
    description: 'Planning session for custom workshops and training programs.',
    booking_url: 'https://calendly.com/alanhirsch/workshop-planning',
    color: '#16a34a',
    pooling_type: 'collective',
    type: 'StandardEventType',
    kind: 'solo',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    uuid: 'event-3',
    name: 'Speaking Engagement Discussion',
    slug: 'speaking-engagement',
    duration: 30,
    description: 'Initial discussion for conference speaking and keynote opportunities.',
    booking_url: 'https://calendly.com/alanhirsch/speaking-engagement',
    color: '#dc2626',
    pooling_type: 'round_robin',
    type: 'StandardEventType',
    kind: 'solo',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    uuid: 'event-4',
    name: 'Movement Leaders Cohort',
    slug: 'movement-leaders-cohort',
    duration: 90,
    description: 'Group coaching session for movement leaders worldwide.',
    booking_url: 'https://calendly.com/alanhirsch/movement-leaders-cohort',
    color: '#7c3aed',
    pooling_type: 'collective',
    type: 'GroupEventType',
    kind: 'group',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z'
  }
]

const SAMPLE_BOOKINGS: CalendlyBooking[] = [
  {
    uuid: 'booking-1',
    event: {
      uuid: 'event-1',
      name: 'Leadership Consultation',
      start_time: '2024-01-25T15:00:00Z',
      end_time: '2024-01-25T16:00:00Z'
    },
    invitee: {
      uuid: 'invitee-1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      timezone: 'America/New_York',
      created_at: '2024-01-20T10:00:00Z'
    },
    status: 'active',
    questions_and_answers: [
      {
        question: 'What specific leadership challenges are you facing?',
        answer: 'Struggling with team alignment and vision casting in our church plant.'
      },
      {
        question: 'How many people are in your leadership team?',
        answer: '5 core leaders plus 12 volunteers'
      }
    ],
    location: {
      type: 'zoom',
      location: 'https://zoom.us/j/123456789'
    }
  },
  {
    uuid: 'booking-2',
    event: {
      uuid: 'event-3',
      name: 'Speaking Engagement Discussion',
      start_time: '2024-01-26T14:00:00Z',
      end_time: '2024-01-26T14:30:00Z'
    },
    invitee: {
      uuid: 'invitee-2',
      name: 'Michael Chen',
      email: 'michael@conferenceorg.com',
      timezone: 'America/Los_Angeles',
      created_at: '2024-01-22T09:00:00Z'
    },
    status: 'active',
    questions_and_answers: [
      {
        question: 'What is the theme of your conference?',
        answer: 'Future of Church Leadership in Post-Christian Context'
      },
      {
        question: 'Expected audience size?',
        answer: '300-400 church leaders and pastors'
      }
    ],
    location: {
      type: 'phone',
      location: '+1-555-123-4567'
    },
    payment: {
      external_id: 'pay_1234567890',
      provider: 'stripe',
      amount: 150000,
      currency: 'usd',
      terms: 'Due upon booking confirmation'
    }
  }
]

export default function CalendlyIntegration() {
  const [events, setEvents] = useState<CalendlyEvent[]>(SAMPLE_EVENTS)
  const [bookings, setBookings] = useState<CalendlyBooking[]>(SAMPLE_BOOKINGS)
  const [isConnected, setIsConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendlyEvent | null>(null)

  const connectCalendly = async () => {
    setIsLoading(true)
    // Simulate API connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnected(true)
    setIsLoading(false)
  }

  const getUpcomingBookings = () => {
    const now = new Date()
    return bookings.filter(booking => 
      new Date(booking.event.start_time) > now && booking.status === 'active'
    ).sort((a, b) => 
      new Date(a.event.start_time).getTime() - new Date(b.event.start_time).getTime()
    )
  }

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

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Calendly Integration</span>
              </CardTitle>
              <CardDescription>
                Manage speaking engagements, consultations, and workshop bookings
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Disconnected
                </Badge>
              )}
              
              {!isConnected && (
                <Button 
                  onClick={connectCalendly}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Connect Calendly
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {isConnected && (
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="events">Event Types</TabsTrigger>
            <TabsTrigger value="embed">Embed Options</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {getUpcomingBookings().map((booking) => {
                const dateTime = formatDateTime(booking.event.start_time)
                
                return (
                  <Card key={booking.uuid}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{booking.event.name}</h3>
                          
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
                              <User className="h-4 w-4" />
                              <span>{booking.invitee.name}</span>
                            </div>
                          </div>

                          {booking.location && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              {booking.location.type === 'zoom' && <Video className="h-4 w-4" />}
                              {booking.location.type === 'phone' && <Phone className="h-4 w-4" />}
                              {booking.location.type === 'in_person' && <MapPin className="h-4 w-4" />}
                              <span className="capitalize">{booking.location.type}</span>
                            </div>
                          )}

                          {booking.questions_and_answers.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <p className="text-sm font-medium">Consultation Details:</p>
                              {booking.questions_and_answers.map((qa, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                  <p className="font-medium">{qa.question}</p>
                                  <p className="ml-2">{qa.answer}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {booking.payment && (
                            <Badge className="bg-green-100 text-green-800">
                              ${(booking.payment.amount / 100).toFixed(0)} Paid
                            </Badge>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in Calendly
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {getUpcomingBookings().length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Upcoming Bookings
                    </h3>
                    <p className="text-gray-600">
                      Your upcoming consultations and speaking engagements will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {events.map((event) => (
                <Card key={event.uuid} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          style={{ backgroundColor: event.color + '20', color: event.color }}
                        >
                          {event.duration}min
                        </Badge>
                        <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="capitalize">{event.kind} session</span>
                        <span>•</span>
                        <span className="capitalize">{event.pooling_type.replace('_', ' ')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => window.open(event.booking_url, '_blank')}
                        >
                          <Link2 className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Embed Calendly Widgets</CardTitle>
                <CardDescription>
                  Add booking widgets to your website pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Inline Widget</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Embed directly into page content for seamless booking experience
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm">
                        {`<div className="calendly-inline-widget" 
     data-url="https://calendly.com/alanhirsch/leadership-consultation" 
     style="min-width:320px;height:630px;"></div>`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Popup Widget</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Trigger booking popup from buttons or links
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm">
                        {`<a href="" onclick="Calendly.initPopupWidget({
  url: 'https://calendly.com/alanhirsch/leadership-consultation'
}); return false;">Schedule Consultation</a>`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Widget Customization</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Primary Color</label>
                        <input 
                          type="color" 
                          defaultValue="#2563eb" 
                          className="w-full h-10 rounded border"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Text Color</label>
                        <input 
                          type="color" 
                          defaultValue="#000000" 
                          className="w-full h-10 rounded border"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Preview</h3>
                  <div className="border rounded-lg h-96 bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Calendly widget preview</p>
                      <p className="text-sm text-gray-500">Widget would appear here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
