'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Users, 
  TrendingUp, 
  ExternalLink, 
  Settings, 
  Eye,
  Send,
  Calendar,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  Clock,
  MessageCircle,
  UserPlus,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Globe,
  Smartphone,
  Monitor,
  Play
} from 'lucide-react'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  from_email: string
  from_name: string
  status: 'draft' | 'sending' | 'sent' | 'paused' | 'canceled'
  type: 'regular' | 'automation' | 'rss' | 'transactional'
  audience: {
    list_id: string
    list_name: string
    recipient_count: number
  }
  content: {
    html: string
    text: string
    template_id?: string
  }
  settings: {
    authenticate: boolean
    auto_footer: boolean
    auto_tweet: boolean
    fb_comments: boolean
    folder_id?: string
    inline_css: boolean
    title?: string
    to_name?: string
    use_conversation: boolean
    google_analytics?: string
    clicktale?: string
  }
  send_time?: string
  created_at: string
  updated_at: string
  emails_sent: number
  abuse_reports: number
  unsubscribed: number
  hard_bounces: number
  soft_bounces: number
  syntax_errors: number
  forwards: number
  forwards_opens: number
  opens: number
  opens_total: number
  clicks: number
  clicks_total: number
  last_open?: string
  last_click?: string
}

interface EmailList {
  id: string
  web_id: number
  name: string
  contact: {
    company: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country: string
    phone?: string
  }
  permission_reminder: string
  use_archive_bar: boolean
  campaign_defaults: {
    from_name: string
    from_email: string
    subject: string
    language: string
  }
  notify_on_subscribe: string
  notify_on_unsubscribe: string
  date_created: string
  list_rating: number
  email_type_option: boolean
  subscribe_url_short: string
  subscribe_url_long: string
  beamer_address: string
  visibility: 'pub' | 'prv'
  double_optin: boolean
  has_welcome: boolean
  marketing_permissions: boolean
  modules: string[]
  stats: {
    member_count: number
    unsubscribe_count: number
    cleaned_count: number
    member_count_since_send: number
    unsubscribe_count_since_send: number
    cleaned_count_since_send: number
    campaign_count: number
    campaign_last_sent?: string
    merge_field_count: number
    avg_sub_rate: number
    avg_unsub_rate: number
    target_sub_rate: number
    open_rate: number
    click_rate: number
    last_sub_date?: string
    last_unsub_date?: string
  }
}

interface EmailSubscriber {
  id: string
  email_address: string
  unique_email_id: string
  contact_id: string
  full_name: string
  web_id: number
  email_type: 'html' | 'text'
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional'
  unsubscribe_reason?: string
  consents_to_one_to_one_messaging: boolean
  merge_fields: Record<string, any>
  interests: Record<string, boolean>
  stats: {
    avg_open_rate: number
    avg_click_rate: number
    ecommerce_data?: {
      total_revenue: number
      number_of_orders: number
      currency_code: string
    }
  }
  ip_signup?: string
  timestamp_signup?: string
  ip_opt?: string
  timestamp_opt?: string
  member_rating: number
  last_changed: string
  language: string
  vip: boolean
  email_client?: string
  location?: {
    latitude: number
    longitude: number
    gmtoff: number
    dstoff: number
    country_code: string
    timezone: string
    region: string
  }
  source?: string
  tags_count: number
  tags: Array<{
    id: number
    name: string
  }>
  list_id: string
}

interface EmailAnalytics {
  period: string
  total_campaigns: number
  total_subscribers: number
  new_subscribers: number
  unsubscribes: number
  avg_open_rate: number
  avg_click_rate: number
  total_revenue: number
  bounce_rate: number
  complaint_rate: number
  list_growth_rate: number
  engagement_score: number
  top_performing_campaigns: Array<{
    campaign_id: string
    name: string
    open_rate: number
    click_rate: number
    revenue: number
  }>
  subscriber_activity: Array<{
    date: string
    subscriptions: number
    unsubscriptions: number
    bounces: number
  }>
  geographic_data: Array<{
    country: string
    subscribers: number
    open_rate: number
    click_rate: number
  }>
  device_stats: {
    desktop: number
    mobile: number
    tablet: number
    other: number
  }
  client_stats: Array<{
    client: string
    opens: number
    percentage: number
  }>
}

const SAMPLE_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'camp_5q_leadership_001',
    name: '5Q Leadership Principles - January Newsletter',
    subject: 'Unlocking Your Church\'s Apostolic Potential',
    from_email: 'alan@alanhirsch.com',
    from_name: 'Alan Hirsch',
    status: 'sent',
    type: 'regular',
    audience: {
      list_id: 'list_church_leaders',
      list_name: 'Church Leaders & Pastors',
      recipient_count: 3247
    },
    content: {
      html: '<html>...</html>',
      text: 'Text version of the newsletter...',
      template_id: 'tmpl_newsletter_01'
    },
    settings: {
      authenticate: true,
      auto_footer: true,
      auto_tweet: false,
      fb_comments: false,
      inline_css: true,
      title: '5Q Leadership Newsletter',
      to_name: 'Church Leader',
      use_conversation: true,
      google_analytics: 'UA-123456-1'
    },
    send_time: '2024-01-15T10:00:00Z',
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-15T10:05:00Z',
    emails_sent: 3247,
    abuse_reports: 2,
    unsubscribed: 18,
    hard_bounces: 12,
    soft_bounces: 34,
    syntax_errors: 0,
    forwards: 89,
    forwards_opens: 156,
    opens: 1847,
    opens_total: 2156,
    clicks: 387,
    clicks_total: 523,
    last_open: '2024-01-20T15:45:00Z',
    last_click: '2024-01-19T12:30:00Z'
  },
  {
    id: 'camp_book_launch_002',
    name: 'New Book Launch: The Future of Faith',
    subject: '📚 My newest book is here - exclusive early access',
    from_email: 'alan@alanhirsch.com',
    from_name: 'Alan Hirsch',
    status: 'sending',
    type: 'regular',
    audience: {
      list_id: 'list_general_audience',
      list_name: 'General Newsletter Subscribers',
      recipient_count: 8934
    },
    content: {
      html: '<html>...</html>',
      text: 'Text version of book launch announcement...',
      template_id: 'tmpl_book_launch'
    },
    settings: {
      authenticate: true,
      auto_footer: true,
      auto_tweet: true,
      fb_comments: true,
      inline_css: true,
      title: 'Book Launch Announcement',
      to_name: 'Reader',
      use_conversation: true,
      google_analytics: 'UA-123456-1'
    },
    send_time: '2024-01-25T09:00:00Z',
    created_at: '2024-01-20T16:00:00Z',
    updated_at: '2024-01-25T09:15:00Z',
    emails_sent: 4567,
    abuse_reports: 0,
    unsubscribed: 12,
    hard_bounces: 23,
    soft_bounces: 67,
    syntax_errors: 0,
    forwards: 234,
    forwards_opens: 412,
    opens: 2834,
    opens_total: 3456,
    clicks: 891,
    clicks_total: 1203,
    last_open: '2024-01-25T18:22:00Z',
    last_click: '2024-01-25T17:45:00Z'
  }
]

const SAMPLE_LISTS: EmailList[] = [
  {
    id: 'list_church_leaders',
    web_id: 12345,
    name: 'Church Leaders & Pastors',
    contact: {
      company: 'Alan Hirsch Ministries',
      address1: '123 Ministry Lane',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
      country: 'US',
      phone: '+1-555-0123'
    },
    permission_reminder: 'You are receiving this because you signed up for leadership insights from Alan Hirsch.',
    use_archive_bar: true,
    campaign_defaults: {
      from_name: 'Alan Hirsch',
      from_email: 'alan@alanhirsch.com',
      subject: 'Leadership Insights from Alan',
      language: 'en'
    },
    notify_on_subscribe: 'admin@alanhirsch.com',
    notify_on_unsubscribe: 'admin@alanhirsch.com',
    date_created: '2020-03-15T10:00:00Z',
    list_rating: 4.8,
    email_type_option: true,
    subscribe_url_short: 'https://short.url/subscribe',
    subscribe_url_long: 'https://alanhirsch.us1.list-manage.com/subscribe?u=12345&id=67890',
    beamer_address: 'church-leaders-12345@inbound.mailchimp.com',
    visibility: 'prv',
    double_optin: true,
    has_welcome: true,
    marketing_permissions: true,
    modules: ['campaigns', 'automation', 'landing-pages', 'reports'],
    stats: {
      member_count: 3247,
      unsubscribe_count: 234,
      cleaned_count: 45,
      member_count_since_send: 89,
      unsubscribe_count_since_send: 12,
      cleaned_count_since_send: 3,
      campaign_count: 47,
      campaign_last_sent: '2024-01-15T10:00:00Z',
      merge_field_count: 8,
      avg_sub_rate: 12.3,
      avg_unsub_rate: 1.8,
      target_sub_rate: 15.0,
      open_rate: 24.8,
      click_rate: 5.2,
      last_sub_date: '2024-01-24T14:30:00Z',
      last_unsub_date: '2024-01-22T09:15:00Z'
    }
  },
  {
    id: 'list_general_audience',
    web_id: 12346,
    name: 'General Newsletter Subscribers',
    contact: {
      company: 'Alan Hirsch Ministries',
      address1: '123 Ministry Lane',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
      country: 'US'
    },
    permission_reminder: 'You subscribed to receive updates and insights from Alan Hirsch.',
    use_archive_bar: true,
    campaign_defaults: {
      from_name: 'Alan Hirsch',
      from_email: 'alan@alanhirsch.com',
      subject: 'Updates from Alan Hirsch',
      language: 'en'
    },
    notify_on_subscribe: 'admin@alanhirsch.com',
    notify_on_unsubscribe: 'admin@alanhirsch.com',
    date_created: '2019-08-10T15:30:00Z',
    list_rating: 4.6,
    email_type_option: true,
    subscribe_url_short: 'https://short.url/general',
    subscribe_url_long: 'https://alanhirsch.us1.list-manage.com/subscribe?u=12345&id=67891',
    beamer_address: 'general-audience-12346@inbound.mailchimp.com',
    visibility: 'pub',
    double_optin: true,
    has_welcome: true,
    marketing_permissions: true,
    modules: ['campaigns', 'automation', 'landing-pages', 'reports', 'social-post'],
    stats: {
      member_count: 8934,
      unsubscribe_count: 567,
      cleaned_count: 123,
      member_count_since_send: 234,
      unsubscribe_count_since_send: 28,
      cleaned_count_since_send: 8,
      campaign_count: 89,
      campaign_last_sent: '2024-01-20T12:00:00Z',
      merge_field_count: 12,
      avg_sub_rate: 18.7,
      avg_unsub_rate: 2.1,
      target_sub_rate: 20.0,
      open_rate: 28.3,
      click_rate: 6.8,
      last_sub_date: '2024-01-25T11:45:00Z',
      last_unsub_date: '2024-01-24T16:20:00Z'
    }
  }
]

const SAMPLE_ANALYTICS: EmailAnalytics = {
  period: '2024-01',
  total_campaigns: 12,
  total_subscribers: 12181,
  new_subscribers: 456,
  unsubscribes: 67,
  avg_open_rate: 26.4,
  avg_click_rate: 5.9,
  total_revenue: 45670,
  bounce_rate: 2.1,
  complaint_rate: 0.02,
  list_growth_rate: 3.2,
  engagement_score: 87.3,
  top_performing_campaigns: [
    {
      campaign_id: 'camp_book_launch_002',
      name: 'New Book Launch: The Future of Faith',
      open_rate: 34.7,
      click_rate: 8.9,
      revenue: 18950
    },
    {
      campaign_id: 'camp_5q_leadership_001',
      name: '5Q Leadership Principles - January Newsletter',
      open_rate: 28.1,
      click_rate: 6.2,
      revenue: 12340
    }
  ],
  subscriber_activity: [
    { date: '2024-01-01', subscriptions: 23, unsubscriptions: 5, bounces: 2 },
    { date: '2024-01-08', subscriptions: 34, unsubscriptions: 8, bounces: 3 },
    { date: '2024-01-15', subscriptions: 45, unsubscriptions: 12, bounces: 7 },
    { date: '2024-01-22', subscriptions: 67, unsubscriptions: 9, bounces: 4 }
  ],
  geographic_data: [
    { country: 'United States', subscribers: 7234, open_rate: 28.5, click_rate: 6.7 },
    { country: 'Canada', subscribers: 1456, open_rate: 31.2, click_rate: 7.1 },
    { country: 'Australia', subscribers: 987, open_rate: 25.8, click_rate: 5.4 },
    { country: 'United Kingdom', subscribers: 876, open_rate: 29.1, click_rate: 6.9 },
    { country: 'Germany', subscribers: 543, open_rate: 24.3, click_rate: 4.8 }
  ],
  device_stats: {
    desktop: 45.2,
    mobile: 41.8,
    tablet: 10.7,
    other: 2.3
  },
  client_stats: [
    { client: 'Gmail', opens: 4567, percentage: 42.3 },
    { client: 'Apple Mail', opens: 2345, percentage: 21.7 },
    { client: 'Outlook', opens: 1876, percentage: 17.4 },
    { client: 'Yahoo Mail', opens: 987, percentage: 9.1 },
    { client: 'Other', opens: 1025, percentage: 9.5 }
  ]
}

export default function EmailMarketingIntegration() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(SAMPLE_CAMPAIGNS)
  const [lists, setLists] = useState<EmailList[]>(SAMPLE_LISTS)
  const [analytics, setAnalytics] = useState<EmailAnalytics>(SAMPLE_ANALYTICS)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'sending':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalSubscribers = () => {
    return lists.reduce((sum, list) => sum + list.stats.member_count, 0)
  }

  const getOverallOpenRate = () => {
    if (campaigns.length === 0) return 0
    const totalOpens = campaigns.reduce((sum, campaign) => sum + campaign.opens, 0)
    const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.emails_sent, 0)
    return totalSent > 0 ? (totalOpens / totalSent) * 100 : 0
  }

  const getOverallClickRate = () => {
    if (campaigns.length === 0) return 0
    const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
    const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.emails_sent, 0)
    return totalSent > 0 ? (totalClicks / totalSent) * 100 : 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Marketing Platform</span>
          </CardTitle>
          <CardDescription>
            Mailchimp & ConvertKit integration for newsletter campaigns and subscriber management
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold">{getTotalSubscribers().toLocaleString()}</p>
                <p className="text-xs text-green-600">+{analytics.new_subscribers} this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold">{formatPercentage(getOverallOpenRate())}</p>
                <p className="text-xs text-blue-600">Industry avg: 21.3%</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">{formatPercentage(getOverallClickRate())}</p>
                <p className="text-xs text-purple-600">Industry avg: 2.6%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campaigns Sent</p>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'sent').length}</p>
                <p className="text-xs text-orange-600">This month</p>
              </div>
              <Send className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="lists">Lists</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Email Campaigns</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {campaigns.map((campaign) => {
              const openRate = campaign.emails_sent > 0 ? (campaign.opens / campaign.emails_sent) * 100 : 0
              const clickRate = campaign.emails_sent > 0 ? (campaign.clicks / campaign.emails_sent) * 100 : 0
              
              return (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <p className="text-gray-600">{campaign.subject}</p>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">
                            {campaign.type}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Recipients:</span>
                            <div className="font-medium">{campaign.audience.recipient_count.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Sent:</span>
                            <div className="font-medium">{campaign.emails_sent.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Opens:</span>
                            <div className="font-medium">{campaign.opens.toLocaleString()} ({formatPercentage(openRate)})</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Clicks:</span>
                            <div className="font-medium">{campaign.clicks.toLocaleString()} ({formatPercentage(clickRate)})</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {campaign.send_time ? `Sent: ${formatDate(campaign.send_time)}` : 
                               `Created: ${formatDate(campaign.created_at)}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{campaign.audience.list_name}</span>
                          </div>
                          {campaign.unsubscribed > 0 && (
                            <div className="flex items-center space-x-1">
                              <AlertCircle className="h-4 w-4" />
                              <span>{campaign.unsubscribed} unsubscribed</span>
                            </div>
                          )}
                        </div>

                        {/* Performance Indicators */}
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${Math.min(openRate / 30 * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm">Open Rate</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${Math.min(clickRate / 10 * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm">Click Rate</span>
                          </div>
                          {campaign.forwards > 0 && (
                            <div className="flex items-center space-x-1">
                              <RefreshCw className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">{campaign.forwards} forwards</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Send Now
                          </Button>
                        )}
                        {campaign.status === 'sent' && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Duplicate
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="lists" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Subscriber Lists</h3>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Create List
            </Button>
          </div>

          <div className="grid gap-6">
            {lists.map((list) => (
              <Card key={list.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{list.name}</h3>
                          <p className="text-gray-600 text-sm">{list.campaign_defaults.from_email}</p>
                        </div>
                        <Badge variant={list.visibility === 'pub' ? 'default' : 'secondary'}>
                          {list.visibility === 'pub' ? 'Public' : 'Private'}
                        </Badge>
                        {list.double_optin && (
                          <Badge variant="outline">Double Opt-in</Badge>
                        )}
                      </div>

                      <div className="grid md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Subscribers:</span>
                          <div className="font-medium text-lg">{list.stats.member_count.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Open Rate:</span>
                          <div className="font-medium text-lg text-green-600">{formatPercentage(list.stats.open_rate)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Click Rate:</span>
                          <div className="font-medium text-lg text-blue-600">{formatPercentage(list.stats.click_rate)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Growth Rate:</span>
                          <div className="font-medium text-lg text-purple-600">{formatPercentage(list.stats.avg_sub_rate)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Rating:</span>
                          <div className="font-medium text-lg text-yellow-600">{list.list_rating}/5.0</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Recent Activity</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">New subscribers (since last send):</span>
                              <span className="font-medium text-green-600">+{list.stats.member_count_since_send}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Unsubscribes (since last send):</span>
                              <span className="font-medium text-red-600">-{list.stats.unsubscribe_count_since_send}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Campaigns sent:</span>
                              <span className="font-medium">{list.stats.campaign_count}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">List Configuration</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Welcome email:</span>
                              <span className={`font-medium ${list.has_welcome ? 'text-green-600' : 'text-gray-400'}`}>
                                {list.has_welcome ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Marketing permissions:</span>
                              <span className={`font-medium ${list.marketing_permissions ? 'text-green-600' : 'text-gray-400'}`}>
                                {list.marketing_permissions ? 'Required' : 'Not required'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Archive bar:</span>
                              <span className={`font-medium ${list.use_archive_bar ? 'text-green-600' : 'text-gray-400'}`}>
                                {list.use_archive_bar ? 'Shown' : 'Hidden'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {formatDate(list.date_created)}</span>
                        </div>
                        {list.stats.last_sub_date && (
                          <div className="flex items-center space-x-1">
                            <UserPlus className="h-4 w-4" />
                            <span>Last subscription: {formatDate(list.stats.last_sub_date)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Subscribers
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send Campaign
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(list.subscribe_url_long, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Signup Form
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Performing Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.top_performing_campaigns.map((campaign, index) => (
                    <div key={campaign.campaign_id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-600">
                            {formatPercentage(campaign.open_rate)} opens • {formatPercentage(campaign.click_rate)} clicks
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${campaign.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Geographic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.geographic_data.map((geo) => (
                    <div key={geo.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{geo.country}</div>
                          <div className="text-sm text-gray-600">{geo.subscribers.toLocaleString()} subscribers</div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div>{formatPercentage(geo.open_rate)} opens</div>
                        <div>{formatPercentage(geo.click_rate)} clicks</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device & Client Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <Monitor className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-bold text-xl">{analytics.device_stats.desktop}%</div>
                    <div className="text-sm text-gray-600">Desktop</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <Smartphone className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-bold text-xl">{analytics.device_stats.mobile}%</div>
                    <div className="text-sm text-gray-600">Mobile</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <Monitor className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-bold text-xl">{analytics.device_stats.tablet}%</div>
                    <div className="text-sm text-gray-600">Tablet</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <Globe className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-bold text-xl">{analytics.device_stats.other}%</div>
                    <div className="text-sm text-gray-600">Other</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Client Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Client Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.client_stats.map((client) => (
                    <div key={client.client} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{client.client}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${client.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{formatPercentage(client.percentage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscriber Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subscriber Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded p-4">
                <div className="flex items-end justify-between h-full space-x-2">
                  {analytics.subscriber_activity.map((activity, index) => {
                    const maxValue = Math.max(...analytics.subscriber_activity.map(a => a.subscriptions))
                    return (
                      <div key={activity.date} className="flex-1 flex flex-col items-center space-y-1">
                        <div className="flex flex-col space-y-1 w-full">
                          <div 
                            className="bg-green-500 rounded-t"
                            style={{ height: `${(activity.subscriptions / maxValue) * 180}px`, minHeight: '2px' }}
                            title={`${activity.subscriptions} subscriptions`}
                          />
                          <div 
                            className="bg-red-500 rounded-b"
                            style={{ height: `${(activity.unsubscriptions / maxValue) * 180}px`, minHeight: '2px' }}
                            title={`${activity.unsubscriptions} unsubscriptions`}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{activity.date.split('-')[2]}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Subscriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Unsubscriptions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Email Automation</h3>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Welcome Series</CardTitle>
                <CardDescription>Automated onboarding for new subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trigger:</span>
                    <span className="font-medium">New subscriber</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emails in series:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion rate:</span>
                    <span className="font-medium text-green-600">84.7%</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Automation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Book Launch Follow-up</CardTitle>
                <CardDescription>Post-purchase engagement sequence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-blue-100 text-blue-800">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trigger:</span>
                    <span className="font-medium">Book purchase</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emails in series:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expected launch:</span>
                    <span className="font-medium">Feb 1, 2024</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview & Activate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Re-engagement Campaign</CardTitle>
                <CardDescription>Win back inactive subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trigger:</span>
                    <span className="font-medium">90 days inactive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emails in series:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recovery rate:</span>
                    <span className="font-medium text-orange-600">12.3%</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Resume Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Speaking Inquiry Follow-up</CardTitle>
                <CardDescription>Automated response to speaking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trigger:</span>
                    <span className="font-medium">Contact form</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response time:</span>
                    <span className="font-medium">Immediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Follow-ups:</span>
                    <span className="font-medium">2 emails</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    View Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
