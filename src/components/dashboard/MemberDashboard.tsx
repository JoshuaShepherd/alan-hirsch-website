'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Star, 
  Play, 
  Calendar,
  Award,
  Target,
  Users,
  MessageCircle
} from 'lucide-react'

interface DashboardProps {
  user: {
    name: string
    email: string
    memberSince: string
    subscription: {
      plan: string
      status: 'active' | 'cancelled' | 'past_due'
      renewsOn?: string
    }
    preferences: {
      interests: string[]
      role: string
      experience: string
    }
  }
}

const RECENT_CONTENT = [
  {
    id: '1',
    title: 'The Future of Missional Leadership',
    type: 'article',
    readTime: '8 min read',
    publishedAt: '2 days ago',
    category: 'Leadership',
    excerpt: 'Exploring how leadership must evolve to meet the challenges of post-Christendom ministry...',
    thumbnail: '/images/articles/future-leadership.jpg'
  },
  {
    id: '2',
    title: 'Building Movement DNA in Your Context',
    type: 'video',
    duration: '24 min',
    publishedAt: '1 week ago',
    category: 'Movement Building',
    excerpt: 'A practical workshop on implementing the mDNA framework in local contexts...',
    thumbnail: '/images/videos/movement-dna.jpg'
  },
  {
    id: '3',
    title: 'APEST Assessment Deep Dive',
    type: 'course',
    lessons: 6,
    publishedAt: '2 weeks ago',
    category: 'APEST',
    excerpt: 'Advanced training on interpreting and applying APEST assessment results...',
    thumbnail: '/images/courses/apest-deep-dive.jpg'
  }
]

const BOOKMARKED_CONTENT = [
  {
    id: '1',
    title: 'The Forgotten Ways - Chapter 3',
    type: 'book',
    bookmarkedAt: '3 days ago',
    progress: 45
  },
  {
    id: '2',
    title: 'Creating Apostolic Environments',
    type: 'article',
    bookmarkedAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Movement Leaders Collective Overview',
    type: 'video',
    bookmarkedAt: '2 weeks ago'
  }
]

const RECOMMENDED_CONTENT = [
  {
    id: '1',
    title: 'Discipleship in the Digital Age',
    type: 'article',
    reason: 'Based on your interest in Discipleship',
    readTime: '6 min read'
  },
  {
    id: '2',
    title: 'Leading Change in Established Churches',
    type: 'course',
    reason: 'Popular with other Pastors',
    lessons: 8
  },
  {
    id: '3',
    title: 'Fresh Expressions Workshop',
    type: 'event',
    reason: 'Matches your goals',
    date: 'March 15, 2025'
  }
]

export function MemberDashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getSubscriptionBadge = () => {
    const { plan, status } = user.subscription
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    
    if (status === 'active') {
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
          {plan} - Active
        </span>
      )
    } else if (status === 'past_due') {
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`}>
          {plan} - Payment Due
        </span>
      )
    } else {
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`}>
          {plan} - Cancelled
        </span>
      )
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Welcome back, {user.name}!
        </h2>
        <p className="-foreground mb-4">
          You've been a member since {new Date(user.memberSince).toLocaleDateString()}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {getSubscriptionBadge()}
          {user.subscription.renewsOn && (
            <span className="text-sm">
              Renews {new Date(user.subscription.renewsOn).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm">Articles Read</span>
          </div>
          <div className="text-2xl font-bold text-foreground">24</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="h-5 w-5 text-primary" />
            <span className="text-sm">Videos Watched</span>
          </div>
          <div className="text-2xl font-bold text-foreground">8</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm">Hours Learning</span>
          </div>
          <div className="text-2xl font-bold text-foreground">42</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm">Milestones</span>
          </div>
          <div className="text-2xl font-bold text-foreground">3</div>
        </div>
      </div>

      {/* Recent Content */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-xl font-semibold text-foreground">Latest Content</h3>
          <Link href="/content" className="text-academic hover-academic text-sm font-medium">
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECENT_CONTENT.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.publishedAt}</span>
                </div>
                
                <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h4>
                
                <p className="text-sm mb-3 line-clamp-2">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {'readTime' in item && <span>{item.readTime}</span>}
                    {'duration' in item && <span>{item.duration}</span>}
                    {'lessons' in item && <span>{item.lessons} lessons</span>}
                  </div>
                  
                  <button className="text-academic hover-academic text-sm font-medium">
                    {item.type === 'course' ? 'Start Course' : 
                     item.type === 'video' ? 'Watch Now' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBookmarks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-xl font-semibold text-foreground">Your Bookmarks</h3>
        <span className="text-sm">{BOOKMARKED_CONTENT.length} items saved</span>
      </div>

      <div className="space-y-4">
        {BOOKMARKED_CONTENT.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="text-xs">
                    Saved {item.bookmarkedAt}
                  </span>
                </div>
                
                <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                
                {'progress' in item && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs">{item.progress}% complete</span>
                  </div>
                )}
              </div>
              
              <button className="text-academic hover-academic text-sm font-medium ml-4">
                {item.type === 'book' ? 'Continue Reading' : 
                 item.type === 'video' ? 'Watch' : 'Read'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          Recommended for You
        </h3>
        <p className="-foreground">
          Based on your interests and goals
        </p>
      </div>

      <div className="space-y-4">
        {RECOMMENDED_CONTENT.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="text-xs">
                    {item.reason}
                  </span>
                </div>
                
                <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                
                <div className="flex items-center gap-1 text-xs">
                  {'readTime' in item && (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>{item.readTime}</span>
                    </>
                  )}
                  {'lessons' in item && (
                    <>
                      <BookOpen className="h-3 w-3" />
                      <span>{item.lessons} lessons</span>
                    </>
                  )}
                  {'date' in item && (
                    <>
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </>
                  )}
                </div>
              </div>
              
              <button className="btn-primary ml-4">
                {item.type === 'event' ? 'Register' : 
                 item.type === 'course' ? 'Enroll' : 'Read'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="-foreground mt-1">Your learning journey continues</p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link href="/profile" className="btn-outline">
            Edit Profile
          </Link>
          <Link href="/billing" className="btn-primary">
            Manage Subscription
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'bookmarks', label: 'Bookmarks', icon: Star },
            { id: 'recommendations', label: 'Recommendations', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'bookmarks' && renderBookmarks()}
      {activeTab === 'recommendations' && renderRecommendations()}
    </div>
  )
}
