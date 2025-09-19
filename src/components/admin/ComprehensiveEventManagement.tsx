'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, Users, MapPin, Clock, Ticket, TrendingUp,
  Plus, Search, Filter, Star, Download, Upload, Edit, Trash2,
  Eye, Settings, Copy, Share, CheckCircle, AlertCircle,
  User, Globe, Link, Tag, FileText, Image, Video,
  DollarSign, BarChart3, Target, Zap, Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Event {
  id: string
  title: string
  description: string
  type: 'conference' | 'workshop' | 'webinar' | 'retreat' | 'training'
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  startDate: string
  endDate: string
  timezone: string
  venue: {
    type: 'physical' | 'virtual' | 'hybrid'
    name?: string
    address?: string
    city?: string
    state?: string
    country?: string
    virtualLink?: string
    capacity: number
  }
  pricing: {
    type: 'free' | 'paid' | 'tiered'
    basePrice?: number
    earlyBirdPrice?: number
    earlyBirdDeadline?: string
    tiers?: Array<{
      name: string
      price: number
      features: string[]
      capacity?: number
    }>
  }
  registration: {
    isOpen: boolean
    openDate?: string
    closeDate?: string
    requiresApproval: boolean
    maxAttendees?: number
    currentAttendees: number
  }
  speakers: Array<{
    id: string
    name: string
    title: string
    bio: string
    image?: string
    social?: {
      twitter?: string
      linkedin?: string
      website?: string
    }
  }>
  agenda: Array<{
    id: string
    title: string
    description: string
    startTime: string
    endTime: string
    speaker?: string
    type: 'presentation' | 'workshop' | 'break' | 'networking' | 'panel'
  }>
  tags: string[]
  createdAt: string
  updatedAt: string
  stats: {
    views: number
    registrations: number
    checkIns: number
    revenue: number
    satisfaction: number
  }
}

interface Attendee {
  id: string
  eventId: string
  userId: string
  name: string
  email: string
  phone?: string
  company?: string
  title?: string
  registrationDate: string
  status: 'registered' | 'confirmed' | 'cancelled' | 'attended' | 'no-show'
  ticketType: string
  paidAmount: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  checkInTime?: string
  customFields: Record<string, string>
  dietaryRestrictions?: string
  accommodationNeeds?: string
}

interface Speaker {
  id: string
  name: string
  title: string
  company?: string
  bio: string
  expertise: string[]
  image?: string
  social: {
    twitter?: string
    linkedin?: string
    website?: string
    email?: string
  }
  events: string[]
  rating: number
  speakingFee?: number
  travelRequired: boolean
  availability: Array<{
    startDate: string
    endDate: string
  }>
  createdAt: string
}

interface Venue {
  id: string
  name: string
  type: 'conference_center' | 'hotel' | 'university' | 'church' | 'virtual' | 'other'
  capacity: number
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  amenities: string[]
  pricing: {
    dailyRate?: number
    hourlyRate?: number
    deposit?: number
  }
  contact: {
    name: string
    email: string
    phone: string
  }
  images: string[]
  rating: number
  availability: Array<{
    startDate: string
    endDate: string
    available: boolean
  }>
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Missional Leadership Conference 2026',
    description: 'Three days of intensive training on APEST framework and church multiplication strategies',
    type: 'conference',
    status: 'published',
    startDate: '2026-03-15T09:00:00Z',
    endDate: '2026-03-17T17:00:00Z',
    timezone: 'America/Los_Angeles',
    venue: {
      type: 'physical',
      name: 'Grand Conference Center',
      address: '123 Conference Blvd',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      capacity: 500
    },
    pricing: {
      type: 'tiered',
      tiers: [
        { name: 'General Admission', price: 299, features: ['All sessions', 'Materials', 'Lunch'] },
        { name: 'VIP', price: 499, features: ['All sessions', 'Materials', 'All meals', 'Speaker meet & greet'] },
        { name: 'Premium', price: 799, features: ['All sessions', 'Materials', 'All meals', 'Private coaching session'] }
      ]
    },
    registration: {
      isOpen: true,
      openDate: '2025-09-01T00:00:00Z',
      closeDate: '2026-03-01T23:59:59Z',
      requiresApproval: false,
      maxAttendees: 500,
      currentAttendees: 234
    },
    speakers: [
      {
        id: '1',
        name: 'Alan Hirsch',
        title: 'Founder & Lead Vision Architect',
        bio: 'Alan Hirsch is a thought leader in the missional church movement...',
        image: '/images/speakers/alan-hirsch.jpg'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        title: 'Church Planting Expert',
        bio: 'Sarah has planted over 20 churches across North America...',
        image: '/images/speakers/sarah-johnson.jpg'
      }
    ],
    agenda: [
      {
        id: '1',
        title: 'Opening Keynote: The Future of Mission',
        description: 'Setting the stage for missional transformation',
        startTime: '2026-03-15T09:00:00Z',
        endTime: '2026-03-15T10:30:00Z',
        speaker: 'Alan Hirsch',
        type: 'presentation'
      },
      {
        id: '2',
        title: 'APEST Workshop: Discovering Your Gifts',
        description: 'Interactive workshop on five-fold ministry assessment',
        startTime: '2026-03-15T11:00:00Z',
        endTime: '2026-03-15T12:30:00Z',
        speaker: 'Sarah Johnson',
        type: 'workshop'
      }
    ],
    tags: ['missional', 'leadership', 'apest', 'conference'],
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-09-15T14:30:00Z',
    stats: {
      views: 2456,
      registrations: 234,
      checkIns: 0,
      revenue: 78650,
      satisfaction: 0
    }
  },
  {
    id: '2',
    title: 'Church Planting Intensive Workshop',
    description: 'Two-day intensive training on organic church multiplication',
    type: 'workshop',
    status: 'published',
    startDate: '2025-11-20T09:00:00Z',
    endDate: '2025-11-21T17:00:00Z',
    timezone: 'America/New_York',
    venue: {
      type: 'hybrid',
      name: 'Community Church',
      address: '456 Ministry Way',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      virtualLink: 'https://zoom.us/workshop-link',
      capacity: 100
    },
    pricing: {
      type: 'paid',
      basePrice: 199,
      earlyBirdPrice: 149,
      earlyBirdDeadline: '2025-10-20T23:59:59Z'
    },
    registration: {
      isOpen: true,
      maxAttendees: 100,
      currentAttendees: 67,
      requiresApproval: false
    },
    speakers: [
      {
        id: '2',
        name: 'Sarah Johnson',
        title: 'Church Planting Expert',
        bio: 'Sarah has planted over 20 churches across North America...'
      }
    ],
    agenda: [],
    tags: ['church-planting', 'workshop', 'multiplication'],
    createdAt: '2025-08-15T11:00:00Z',
    updatedAt: '2025-09-18T16:45:00Z',
    stats: {
      views: 856,
      registrations: 67,
      checkIns: 0,
      revenue: 12450,
      satisfaction: 0
    }
  }
]

const MOCK_ATTENDEES: Attendee[] = [
  {
    id: '1',
    eventId: '1',
    userId: 'user1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0123',
    company: 'Grace Community Church',
    title: 'Senior Pastor',
    registrationDate: '2025-09-10T14:30:00Z',
    status: 'registered',
    ticketType: 'VIP',
    paidAmount: 499,
    paymentStatus: 'paid',
    customFields: {
      church_size: '200-500',
      years_ministry: '10-15'
    },
    dietaryRestrictions: 'Vegetarian'
  },
  {
    id: '2',
    eventId: '1',
    userId: 'user2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    company: 'New Life Church',
    title: 'Ministry Leader',
    registrationDate: '2025-09-15T09:20:00Z',
    status: 'confirmed',
    ticketType: 'General Admission',
    paidAmount: 299,
    paymentStatus: 'paid',
    customFields: {
      church_size: '100-200',
      years_ministry: '5-10'
    }
  }
]

const MOCK_SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Alan Hirsch',
    title: 'Founder & Lead Vision Architect',
    company: 'Forge Mission Training Network',
    bio: 'Alan Hirsch is widely considered to be a thought leader in the missional church movement...',
    expertise: ['Missional Church', 'APEST', 'Leadership', 'Church Multiplication'],
    image: '/images/speakers/alan-hirsch.jpg',
    social: {
      twitter: '@alanhirsch',
      linkedin: 'alanhirsch',
      website: 'alanhirsch.org',
      email: 'alan@forge.org'
    },
    events: ['1'],
    rating: 4.9,
    speakingFee: 5000,
    travelRequired: true,
    availability: [
      { startDate: '2026-03-10', endDate: '2026-03-20' },
      { startDate: '2026-06-15', endDate: '2026-06-25' }
    ],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Church Planting Expert',
    bio: 'Sarah has planted over 20 churches across North America and trains church planters globally...',
    expertise: ['Church Planting', 'Multiplication', 'Leadership Development'],
    social: {
      twitter: '@sarahjohnson',
      linkedin: 'sarahjohnson',
      email: 'sarah@example.com'
    },
    events: ['1', '2'],
    rating: 4.8,
    speakingFee: 3000,
    travelRequired: true,
    availability: [
      { startDate: '2025-11-15', endDate: '2025-11-25' },
      { startDate: '2026-03-10', endDate: '2026-03-20' }
    ],
    createdAt: '2025-02-20T14:15:00Z'
  }
]

export function ComprehensiveEventManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS)
  const [attendees, setAttendees] = useState<Attendee[]>(MOCK_ATTENDEES)
  const [speakers, setSpeakers] = useState<Speaker[]>(MOCK_SPEAKERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': case 'confirmed': case 'paid': case 'attended': return 'bg-green-100 text-green-800'
      case 'draft': case 'registered': case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': case 'no-show': case 'refunded': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getVenueIcon = (type: string) => {
    switch (type) {
      case 'virtual': return <Globe className="h-4 w-4" />
      case 'hybrid': return <Zap className="h-4 w-4" />
      default: return <MapPin className="h-4 w-4" />
    }
  }

  const getTotalRevenue = () => {
    return events.reduce((sum, event) => sum + event.stats.revenue, 0)
  }

  const getTotalAttendees = () => {
    return events.reduce((sum, event) => sum + event.registration.currentAttendees, 0)
  }

  const getAverageCapacity = () => {
    const totalEvents = events.length
    if (totalEvents === 0) return 0
    const totalCapacity = events.reduce((sum, event) => sum + (event.registration.currentAttendees / event.venue.capacity), 0)
    return (totalCapacity / totalEvents) * 100
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Event Management</h2>
          <p className="text-muted-foreground">
            Plan, manage, and analyze conferences, workshops, and training events
          </p>
        </div>
        <Button onClick={() => setShowCreateEvent(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+2 this month</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold">{getTotalAttendees().toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+15.3% growth</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(getTotalRevenue())}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+22.8%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Capacity</p>
                <p className="text-2xl font-bold">{getAverageCapacity().toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">Well utilized</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for the next 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.filter(e => new Date(e.startDate) > new Date()).slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(event.startDate)}</span>
                          {getVenueIcon(event.venue.type)}
                          <span>{event.venue.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{event.registration.currentAttendees}/{event.venue.capacity} registered</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(event.stats.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Activity</CardTitle>
                <CardDescription>Recent registrations across all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendees.slice(0, 5).map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {events.find(e => e.id === attendee.eventId)?.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(attendee.paidAmount)}</p>
                        <Badge className={getStatusColor(attendee.status)}>
                          {attendee.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {event.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDate(event.startDate)}</p>
                        {event.startDate !== event.endDate && (
                          <p className="text-muted-foreground">to {formatDate(event.endDate)}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getVenueIcon(event.venue.type)}
                        <span className="text-sm">{event.venue.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{event.registration.currentAttendees}/{event.venue.capacity}</p>
                        <Progress 
                          value={(event.registration.currentAttendees / event.venue.capacity) * 100} 
                          className="w-16 h-1 mt-1" 
                        />
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(event.stats.revenue)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedEvent(event)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Manage Attendees
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="attendees" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendee Management</CardTitle>
                <CardDescription>Manage event registrations and check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attendee</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendees.map((attendee) => (
                      <TableRow key={attendee.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-muted-foreground">{attendee.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {events.find(e => e.id === attendee.eventId)?.title}
                        </TableCell>
                        <TableCell>{attendee.ticketType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(attendee.status)}>
                            {attendee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{formatCurrency(attendee.paidAmount)}</p>
                            <Badge className={getStatusColor(attendee.paymentStatus)}>
                              {attendee.paymentStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Check In
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ticket className="h-4 w-4 mr-2" />
                                Send Ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check-in Statistics</CardTitle>
                <CardDescription>Real-time attendance tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Registered</span>
                  <span className="font-medium">{attendees.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Checked In</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>No Shows</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attendance Rate</span>
                  <span className="font-medium">0%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="speakers" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Speaker Management</h3>
              <p className="text-sm text-muted-foreground">Manage speakers, their profiles, and availability</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Speaker
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <Card key={speaker.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground">{speaker.title}</p>
                      {speaker.company && (
                        <p className="text-sm text-muted-foreground">{speaker.company}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Check Availability
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{speaker.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Events:</span>
                      <span>{speaker.events.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Fee:</span>
                      <span>{speaker.speakingFee ? formatCurrency(speaker.speakingFee) : 'N/A'}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {speaker.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {speaker.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{speaker.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="venues" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Venue Management</h3>
              <p className="text-sm text-muted-foreground">Manage event venues and facilities</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Types</CardTitle>
                <CardDescription>Distribution of venue types used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Physical Venues</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Virtual Events</span>
                    </div>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>Hybrid Events</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Venue Utilization</CardTitle>
                <CardDescription>How efficiently venues are being used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average Capacity Used</span>
                    <span className="font-medium">{getAverageCapacity().toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Venue Capacity</span>
                    <span className="font-medium">600</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Current Bookings</span>
                    <span className="font-medium">{getTotalAttendees()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
                <CardDescription>Key metrics across all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Revenue</span>
                    <span className="font-medium">{formatCurrency(getTotalRevenue())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Revenue per Event</span>
                    <span className="font-medium">{formatCurrency(getTotalRevenue() / events.length)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Ticket Price</span>
                    <span className="font-medium">$324</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Registration Conversion</span>
                    <span className="font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Patterns in event attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Show-up Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Satisfaction</span>
                    <span className="font-medium">4.6/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Repeat Attendees</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Referral Rate</span>
                    <span className="font-medium">18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Event Modal */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input placeholder="Enter event title" />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe your event" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="retreat">Retreat</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Venue Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="datetime-local" />
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="datetime-local" />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateEvent(false)}>
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge variant="outline">{selectedEvent.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedEvent.status)}>
                        {selectedEvent.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Start:</span>
                      <span>{formatDate(selectedEvent.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End:</span>
                      <span>{formatDate(selectedEvent.endDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Registration & Revenue</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Registered:</span>
                      <span>{selectedEvent.registration.currentAttendees}/{selectedEvent.venue.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="font-medium">{formatCurrency(selectedEvent.stats.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span>{selectedEvent.stats.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Speakers</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.speakers.map((speaker) => (
                    <Badge key={speaker.id} variant="secondary">
                      {speaker.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Attendees
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}