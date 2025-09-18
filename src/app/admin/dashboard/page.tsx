'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart, FileText, Users, Settings, Bot, 
  TrendingUp, MessageCircle, Calendar, Globe,
  BookOpen, Mail, CreditCard, Clock, Award,
  Activity, AlertCircle, CheckCircle, Zap,
  Plus, Eye, Edit, RefreshCw, Download
} from 'lucide-react'

// Import existing components
import { AIAgentManagement } from '@/components/admin/AIAgentManagement'
import { AdminMemberManagement } from '@/components/admin/AdminMemberManagement'
import { AdminSettings } from '@/components/admin/AdminSettings'

interface DashboardStats {
  totalMembers: number
  activeSubscriptions: number
  monthlyRevenue: number
  contentViews: number
  aiConversations: number
  forumPosts: number
}

interface RecentActivity {
  id: string
  type: 'member' | 'content' | 'revenue' | 'ai' | 'community'
  text: string
  time: string
  icon: any
}

interface QuickAction {
  label: string
  href: string
  icon: any
  description: string
}

const SAMPLE_STATS: DashboardStats = {
  totalMembers: 3247,
  activeSubscriptions: 1892,
  monthlyRevenue: 28380,
  contentViews: 45892,
  aiConversations: 281,
  forumPosts: 156
}

const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: '1', type: 'member', text: 'New premium member: Sarah Mitchell joined', time: '5 min ago', icon: Users },
  { id: '2', type: 'content', text: 'Published new article: "APEST in Practice"', time: '2 hours ago', icon: FileText },
  { id: '3', type: 'ai', text: 'AI agent handled 47 conversations today', time: '3 hours ago', icon: Bot },
  { id: '4', type: 'revenue', text: 'New subscription: Premium Plan ($29/month)', time: '4 hours ago', icon: CreditCard },
  { id: '5', type: 'community', text: 'New discussion: "Church Planting Challenges"', time: '6 hours ago', icon: MessageCircle },
  { id: '6', type: 'content', text: 'Updated book chapter: The Forgotten Ways Ch. 3', time: '1 day ago', icon: BookOpen }
]

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Create Content',
    href: '/admin/content/new',
    icon: Plus,
    description: 'Write a new article, chapter, or newsletter'
  },
  {
    label: 'Send Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
    description: 'Create and send newsletter to members'
  },
  {
    label: 'View Analytics',
    href: '/admin/analytics',
    icon: BarChart,
    description: 'Review platform performance metrics'
  },
  {
    label: 'Manage Members',
    href: '/admin/members',
    icon: Users,
    description: 'View and manage community members'
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const getActivityIcon = (type: RecentActivity['type']) => {
    const iconClass = "h-4 w-4 text-primary"
    switch (type) {
      case 'member': return <Users className={iconClass} />
      case 'content': return <FileText className={iconClass} />
      case 'revenue': return <CreditCard className={iconClass} />
      case 'ai': return <Bot className={iconClass} />
      case 'community': return <MessageCircle className={iconClass} />
      default: return <Activity className={iconClass} />
    }
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
                Admin Dashboard
              </h1>
              <p className="text-card-foreground/70">
                Manage your platform and content
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/admin/content/new"
                className="btn-primary"
              >
                Create Content
              </Link>
              <Link href="/" className="btn-secondary">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-card-foreground/60 hover:text-card-foreground hover:border-card-foreground/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-card-foreground/60">Total Members</p>
                    <p className="text-2xl font-bold text-card-foreground">{SAMPLE_STATS.totalMembers.toLocaleString()}</p>
                    <p className="text-xs text-green-500">+12% from last month</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-card-foreground/60">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-card-foreground">{SAMPLE_STATS.activeSubscriptions.toLocaleString()}</p>
                    <p className="text-xs text-green-500">+8% from last month</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-card-foreground/60">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-card-foreground">${SAMPLE_STATS.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-500">+15% from last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-card-foreground/60">Content Views</p>
                    <p className="text-2xl font-bold text-card-foreground">{SAMPLE_STATS.contentViews.toLocaleString()}</p>
                    <p className="text-xs text-green-500">+23% from last month</p>
                  </div>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl font-bold text-card-foreground mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium text-card-foreground group-hover:text-primary">
                          {action.label}
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground/60">
                        {action.description}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity and System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm text-card-foreground">{activity.text}</p>
                        <p className="text-xs text-card-foreground/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  System Status
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'AI Agents', status: 'active', value: '2 active, 1 training' },
                    { label: 'Email Service', status: 'active', value: 'All systems operational' },
                    { label: 'Payment Processing', status: 'active', value: 'Stripe connected' },
                    { label: 'Content Delivery', status: 'active', value: 'Fast global delivery' },
                    { label: 'Database', status: 'active', value: '99.9% uptime' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-card-foreground">{item.label}</span>
                      </div>
                      <span className="text-xs text-card-foreground/60">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Content Management
              </h2>
              <Link href="/admin/content/new" className="btn-primary">
                New Content
              </Link>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Published Books', value: '15', icon: BookOpen },
                { label: 'Articles', value: '127', icon: FileText },
                { label: 'Chapters', value: '247', icon: BookOpen },
                { label: 'Draft Content', value: '23', icon: Edit }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-lg font-semibold text-card-foreground">{item.value}</p>
                        <p className="text-xs text-card-foreground/60">{item.label}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-card-foreground/70">Content management interface will be integrated here from existing CMS components...</p>
              <div className="mt-4 flex gap-3">
                <Link href="/admin/content/new" className="btn-primary">
                  Create New Content
                </Link>
                <Link href="/components" className="btn-outline">
                  View CMS Components
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <AdminMemberManagement />
        )}

        {activeTab === 'ai-agents' && (
          <AIAgentManagement />
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Analytics Dashboard
            </h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-card-foreground/70 mb-4">
                Analytics dashboard will be integrated here from existing AnalyticsAgent component...
              </p>
              <div className="flex gap-3">
                <Link href="/components" className="btn-primary">
                  View Analytics Components
                </Link>
                <button className="btn-outline flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <AdminSettings />
        )}
      </div>
    </div>
  )
}
