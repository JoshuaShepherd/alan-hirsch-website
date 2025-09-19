'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, Users, Calendar, Shield, Eye, 
  Search, Filter, MoreHorizontal, Flag, Heart,
  Reply, Send, Mic, Image, Paperclip, Video,
  UserPlus, Settings, Bell, Hash, Star,
  Pin, Edit, Trash2, Ban, Crown, Activity,
  Clock, MapPin, ExternalLink, Copy, Share
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface User {
  id: string
  name: string
  username: string
  avatar?: string
  role: 'admin' | 'moderator' | 'member'
  status: 'online' | 'away' | 'busy' | 'offline'
  joinedAt: string
  lastActive: string
  reputation: number
  badges: string[]
}

interface Message {
  id: string
  userId: string
  user: User
  content: string
  timestamp: string
  edited?: boolean
  reactions: Array<{ emoji: string; count: number; users: string[] }>
  replies: Message[]
  attachments?: Array<{ type: 'image' | 'file' | 'video'; url: string; name: string }>
  pinned?: boolean
}

interface Channel {
  id: string
  name: string
  description: string
  type: 'text' | 'voice' | 'announcement'
  private: boolean
  memberCount: number
  unreadCount: number
  lastMessage?: Message
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  timezone: string
  location?: string
  virtual: boolean
  meetingLink?: string
  organizer: User
  attendees: User[]
  capacity?: number
  tags: string[]
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: User
  category: string
  tags: string[]
  views: number
  replies: number
  likes: number
  createdAt: string
  lastReply?: string
  pinned: boolean
  locked: boolean
  solved: boolean
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alan Hirsch',
    username: 'alanhirsch',
    role: 'admin',
    status: 'online',
    joinedAt: '2020-01-01',
    lastActive: '2025-09-19T10:30:00Z',
    reputation: 9850,
    badges: ['founder', 'author', 'speaker']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    username: 'sarahj',
    role: 'moderator',
    status: 'online',
    joinedAt: '2023-03-15',
    lastActive: '2025-09-19T10:25:00Z',
    reputation: 2340,
    badges: ['moderator', 'helpful']
  },
  {
    id: '3',
    name: 'Michael Chen',
    username: 'mchen',
    role: 'member',
    status: 'away',
    joinedAt: '2024-01-20',
    lastActive: '2025-09-19T09:45:00Z',
    reputation: 890,
    badges: ['contributor']
  }
]

const MOCK_CHANNELS: Channel[] = [
  {
    id: '1',
    name: 'general',
    description: 'General discussion about missional church',
    type: 'text',
    private: false,
    memberCount: 234,
    unreadCount: 3
  },
  {
    id: '2',
    name: 'announcements',
    description: 'Official announcements and updates',
    type: 'announcement',
    private: false,
    memberCount: 234,
    unreadCount: 0
  },
  {
    id: '3',
    name: 'prayer-requests',
    description: 'Share prayer requests and support',
    type: 'text',
    private: false,
    memberCount: 156,
    unreadCount: 2
  }
]

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Missional Leadership Webinar',
    description: 'Exploring practical applications of APEST in modern church leadership',
    date: '2025-09-25',
    time: '19:00',
    timezone: 'PST',
    virtual: true,
    meetingLink: 'https://zoom.us/j/123456789',
    organizer: MOCK_USERS[0],
    attendees: MOCK_USERS.slice(0, 2),
    capacity: 100,
    tags: ['leadership', 'apest', 'webinar'],
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Church Planting Workshop',
    description: 'Hands-on workshop for aspiring church planters',
    date: '2025-10-05',
    time: '09:00',
    timezone: 'PST',
    location: 'Community Center, Los Angeles',
    virtual: false,
    organizer: MOCK_USERS[1],
    attendees: MOCK_USERS,
    capacity: 50,
    tags: ['church-planting', 'workshop', 'in-person'],
    status: 'upcoming'
  }
]

const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'How to implement APEST in a traditional church setting?',
    content: 'I\'m struggling to introduce APEST concepts to my traditional congregation...',
    author: MOCK_USERS[2],
    category: 'Leadership',
    tags: ['apest', 'traditional-church', 'change-management'],
    views: 234,
    replies: 12,
    likes: 8,
    createdAt: '2025-09-18T14:30:00Z',
    lastReply: '2025-09-19T09:15:00Z',
    pinned: false,
    locked: false,
    solved: false
  },
  {
    id: '2',
    title: 'Book Discussion: The Forgotten Ways - Chapter 3',
    content: 'Let\'s discuss the concept of "mDNA" and its implications...',
    author: MOCK_USERS[1],
    category: 'Book Discussion',
    tags: ['forgotten-ways', 'mdna', 'discussion'],
    views: 189,
    replies: 23,
    likes: 15,
    createdAt: '2025-09-17T10:00:00Z',
    lastReply: '2025-09-19T08:45:00Z',
    pinned: true,
    locked: false,
    solved: false
  }
]

export function ComprehensiveCommunityPlatform() {
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedChannel, setSelectedChannel] = useState(MOCK_CHANNELS[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: Date.now().toString(),
      userId: '1',
      user: MOCK_USERS[0],
      content: newMessage,
      timestamp: new Date().toISOString(),
      reactions: [],
      replies: []
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-3 w-3 text-yellow-600" />
      case 'moderator': return <Shield className="h-3 w-3 text-blue-600" />
      default: return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg">Community</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
            <TabsTrigger value="forums" className="text-xs">Forums</TabsTrigger>
            <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
            <TabsTrigger value="members" className="text-xs">Members</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4">
            <TabsContent value="chat" className="space-y-2 mt-0">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Channels
              </div>
              {MOCK_CHANNELS.map((channel) => (
                <div
                  key={channel.id}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent ${
                    selectedChannel.id === channel.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <Badge variant="default" className="ml-auto text-xs h-5 px-1">
                      {channel.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="forums" className="space-y-2 mt-0">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categories
              </div>
              <div className="space-y-1">
                <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="text-sm">Leadership</div>
                  <div className="text-xs text-muted-foreground">12 posts</div>
                </div>
                <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="text-sm">Book Discussions</div>
                  <div className="text-xs text-muted-foreground">8 posts</div>
                </div>
                <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="text-sm">Church Planting</div>
                  <div className="text-xs text-muted-foreground">15 posts</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-2 mt-0">
              <Button size="sm" className="w-full" onClick={() => setShowCreateEvent(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Upcoming
              </div>
              {MOCK_EVENTS.map((event) => (
                <div key={event.id} className="p-2 rounded-md border border-border">
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {event.virtual ? (
                      <Video className="h-3 w-3 text-blue-500" />
                    ) : (
                      <MapPin className="h-3 w-3 text-green-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {event.attendees.length} attending
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="members" className="space-y-2 mt-0">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8"
                />
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Online - {MOCK_USERS.filter(u => u.status === 'online').length}
              </div>
              {MOCK_USERS.filter(u => u.status === 'online').map((user) => (
                <div key={user.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium truncate">{user.name}</span>
                      {getRoleIcon(user.role)}
                    </div>
                    <div className="text-xs text-muted-foreground">@{user.username}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{selectedChannel.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedChannel.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4" />
                  {selectedChannel.memberCount}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Channel Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pin className="h-4 w-4 mr-2" />
                      Pinned Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Flag className="h-4 w-4 mr-2" />
                      Report Channel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="flex gap-3 group hover:bg-accent/50 p-2 rounded-md -mx-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-blue-600">
                        {message.user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{message.user.name}</span>
                        {getRoleIcon(message.user.role)}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.edited && (
                          <span className="text-xs text-muted-foreground">(edited)</span>
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                      {message.reactions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-xs"
                            >
                              {reaction.emoji} {reaction.count}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 flex items-start gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Reply className="h-3 w-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pin className="h-4 w-4 mr-2" />
                            Pin Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Text
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder={`Message #${selectedChannel.name}`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[40px] max-h-32 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'forums' && (
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Discussion Forums</h2>
                <p className="text-muted-foreground">Connect with the community through discussions</p>
              </div>
              <Button onClick={() => setShowCreatePost(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_FORUM_POSTS.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-blue-600">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {post.pinned && <Pin className="h-4 w-4 text-yellow-600" />}
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {post.solved && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Solved
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{post.author.name}</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.replies}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{post.category}</Badge>
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Community Events</h2>
                <p className="text-muted-foreground">Join upcoming events and activities</p>
              </div>
              <Button onClick={() => setShowCreateEvent(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_EVENTS.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {event.virtual ? (
                        <Video className="h-5 w-5 text-blue-500" />
                      ) : (
                        <MapPin className="h-5 w-5 text-green-500" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time} {event.timezone}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.virtual && event.meetingLink && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <a href={event.meetingLink} className="text-blue-600 hover:underline">
                            Join Meeting
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <div className="flex -space-x-2">
                        {event.attendees.slice(0, 3).map((attendee, index) => (
                          <div
                            key={attendee.id}
                            className="w-6 h-6 bg-blue-100 rounded-full border-2 border-background flex items-center justify-center"
                          >
                            <span className="text-xs font-medium text-blue-600">
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {event.attendees.length} attending
                        {event.capacity && ` / ${event.capacity} capacity`}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Event
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Community Members</h2>
                <p className="text-muted-foreground">Connect with fellow community members</p>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search members..." className="w-64" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="admins">Admins</SelectItem>
                    <SelectItem value="moderators">Moderators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_USERS.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-blue-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <h3 className="font-semibold truncate">{user.name}</h3>
                          {getRoleIcon(user.role)}
                        </div>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span>Reputation</span>
                        <span className="font-medium">{user.reputation.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Joined</span>
                        <span>{new Date(user.joinedAt).getFullYear()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status</span>
                        <Badge variant="outline" className="capitalize">
                          {user.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {user.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

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
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Virtual Event</Label>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Location / Meeting Link</Label>
              <Input placeholder="Enter location or meeting link" />
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

      {/* Create Post Modal */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Enter post title" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="books">Book Discussions</SelectItem>
                  <SelectItem value="church-planting">Church Planting</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea placeholder="Write your post content" rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreatePost(false)}>
                Create Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}