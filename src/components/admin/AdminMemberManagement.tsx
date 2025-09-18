'use client'

import { useState } from 'react'
import { 
  Users, Search, Filter, Mail, Phone, CreditCard,
  Calendar, Award, TrendingUp, Download, UserPlus,
  UserMinus, UserCheck, AlertCircle, CheckCircle,
  Clock, Star, MessageSquare, Settings, MoreHorizontal,
  Eye, Edit, Trash2, Send, Archive, RefreshCw
} from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  joinDate: string
  subscription: {
    plan: 'free' | 'premium' | 'vip'
    status: 'active' | 'expired' | 'cancelled'
    renewsOn?: string
    amount?: number
  }
  engagement: {
    lastActive: string
    totalSessions: number
    contentViewed: number
    forumPosts: number
  }
  profile: {
    role?: string
    organization?: string
    location?: string
    avatar?: string
  }
  tags: string[]
  lifetime_value: number
}

interface MemberStats {
  total: number
  active: number
  premium: number
  churnRate: number
  avgLifetimeValue: number
  newThisMonth: number
}

interface AdminMemberManagementProps {
  onSendEmail?: (memberIds: string[], subject: string, content: string) => void
  onUpdateSubscription?: (memberId: string, plan: string) => void
  onExportMembers?: () => void
}

const SAMPLE_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    joinDate: '2024-01-15',
    subscription: {
      plan: 'premium',
      status: 'active',
      renewsOn: '2025-01-15',
      amount: 29
    },
    engagement: {
      lastActive: '2 hours ago',
      totalSessions: 47,
      contentViewed: 23,
      forumPosts: 8
    },
    profile: {
      role: 'Senior Pastor',
      organization: 'Grace Community Church',
      location: 'Austin, TX',
      avatar: '/avatars/sarah.jpg'
    },
    tags: ['high-engagement', 'pastor', 'apest-certified'],
    lifetime_value: 348
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    joinDate: '2024-03-22',
    subscription: {
      plan: 'vip',
      status: 'active',
      renewsOn: '2025-03-22',
      amount: 99
    },
    engagement: {
      lastActive: '1 day ago',
      totalSessions: 89,
      contentViewed: 45,
      forumPosts: 23
    },
    profile: {
      role: 'Church Planter',
      organization: 'Movement Network',
      location: 'Seattle, WA'
    },
    tags: ['church-planter', 'high-value', 'content-creator'],
    lifetime_value: 892
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    joinDate: '2024-07-08',
    subscription: {
      plan: 'free',
      status: 'active'
    },
    engagement: {
      lastActive: '1 week ago',
      totalSessions: 12,
      contentViewed: 8,
      forumPosts: 2
    },
    profile: {
      role: 'Seminary Student',
      organization: 'Fuller Seminary',
      location: 'Los Angeles, CA'
    },
    tags: ['seminary', 'new-member'],
    lifetime_value: 0
  }
]

const SAMPLE_STATS: MemberStats = {
  total: 3247,
  active: 1892,
  premium: 756,
  churnRate: 5.2,
  avgLifetimeValue: 284,
  newThisMonth: 127
}

export function AdminMemberManagement({ 
  onSendEmail, 
  onUpdateSubscription, 
  onExportMembers 
}: AdminMemberManagementProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'segments' | 'communications'>('overview')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'premium' | 'vip'>('all')

  const getPlanColor = (plan: Member['subscription']['plan']) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'vip': return 'bg-purple-100 text-purple-800'
    }
  }

  const getStatusColor = (status: Member['subscription']['status']) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'expired': return 'text-yellow-500'
      case 'cancelled': return 'text-red-500'
    }
  }

  const filteredMembers = SAMPLE_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = filterPlan === 'all' || member.subscription.plan === filterPlan
    return matchesSearch && matchesPlan
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Member Management</h2>
          <p className="text-muted-foreground mt-1">Manage your community members and subscriptions</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onExportMembers}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Members
          </button>
          <button className="btn-primary flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'members', label: 'All Members', icon: Users },
            { id: 'segments', label: 'Segments', icon: Filter },
            { id: 'communications', label: 'Communications', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-xl font-bold text-foreground">{SAMPLE_STATS.total.toLocaleString()}</p>
                </div>
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-xl font-bold text-foreground">{SAMPLE_STATS.active.toLocaleString()}</p>
                </div>
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Premium Members</p>
                  <p className="text-xl font-bold text-foreground">{SAMPLE_STATS.premium.toLocaleString()}</p>
                </div>
                <Award className="h-6 w-6 text-purple-500" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Churn Rate</p>
                  <p className="text-xl font-bold text-foreground">{SAMPLE_STATS.churnRate}%</p>
                </div>
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg LTV</p>
                  <p className="text-xl font-bold text-foreground">${SAMPLE_STATS.avgLifetimeValue}</p>
                </div>
                <CreditCard className="h-6 w-6 text-green-500" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <p className="text-xl font-bold text-foreground">{SAMPLE_STATS.newThisMonth}</p>
                </div>
                <UserPlus className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Signups</h3>
              <div className="space-y-3">
                {SAMPLE_MEMBERS.slice(0, 5).map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.joinDate}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPlanColor(member.subscription.plan)}`}>
                      {member.subscription.plan}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Top Engaged Members</h3>
              <div className="space-y-3">
                {SAMPLE_MEMBERS
                  .sort((a, b) => b.engagement.totalSessions - a.engagement.totalSessions)
                  .slice(0, 5)
                  .map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.engagement.totalSessions} sessions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{member.engagement.lastActive}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-border rounded-lg bg-background"
              />
            </div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedMembers.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">
                  {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-2">
                  <button className="btn-outline btn-sm flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Send Email
                  </button>
                  <button className="btn-outline btn-sm flex items-center gap-1">
                    <Archive className="h-3 w-3" />
                    Archive
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Members Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-border"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers(filteredMembers.map(m => m.id))
                          } else {
                            setSelectedMembers([])
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-4 font-medium">Member</th>
                    <th className="text-left p-4 font-medium">Plan</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Engagement</th>
                    <th className="text-left p-4 font-medium">LTV</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <input 
                          type="checkbox"
                          className="rounded border-border"
                          checked={selectedMembers.includes(member.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMembers([...selectedMembers, member.id])
                            } else {
                              setSelectedMembers(selectedMembers.filter(id => id !== member.id))
                            }
                          }}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            {member.profile.role && (
                              <p className="text-xs text-muted-foreground">{member.profile.role}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPlanColor(member.subscription.plan)}`}>
                          {member.subscription.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-sm ${getStatusColor(member.subscription.status)}`}>
                          {member.subscription.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p className="text-foreground">{member.engagement.totalSessions} sessions</p>
                          <p className="text-muted-foreground text-xs">{member.engagement.lastActive}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-foreground">
                          ${member.lifetime_value}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'High-Value Members', count: 89, criteria: 'LTV > $500', color: 'bg-green-500' },
              { name: 'At-Risk Members', count: 23, criteria: 'No activity in 30 days', color: 'bg-red-500' },
              { name: 'New Members', count: 127, criteria: 'Joined in last 30 days', color: 'bg-blue-500' },
              { name: 'Pastors', count: 456, criteria: 'Role: Senior Pastor', color: 'bg-purple-500' },
              { name: 'Church Planters', count: 234, criteria: 'Role: Church Planter', color: 'bg-orange-500' },
              { name: 'Seminary Students', count: 178, criteria: 'Role: Seminary Student', color: 'bg-cyan-500' }
            ].map(segment => (
              <div key={segment.name} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                  <h3 className="font-semibold text-foreground">{segment.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">{segment.count}</p>
                  <p className="text-sm text-muted-foreground">{segment.criteria}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <button className="btn-outline btn-sm w-full">View Members</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'communications' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Email Campaigns</h3>
            <div className="space-y-4">
              {[
                { subject: 'Welcome New Members - March 2025', sent: '2 days ago', opens: '67%', clicks: '23%' },
                { subject: 'New APEST Assessment Available', sent: '1 week ago', opens: '73%', clicks: '31%' },
                { subject: 'Monthly Newsletter - March', sent: '2 weeks ago', opens: '71%', clicks: '19%' }
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{campaign.subject}</p>
                    <p className="text-sm text-muted-foreground">Sent {campaign.sent}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{campaign.opens}</p>
                      <p className="text-muted-foreground">Opens</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{campaign.clicks}</p>
                      <p className="text-muted-foreground">Clicks</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <button className="btn-primary flex items-center gap-2">
                <Send className="h-4 w-4" />
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
