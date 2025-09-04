'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Settings, Users, FileText, BarChart, Calendar, Mail, Shield, Database, Globe, Zap } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const stats = [
    { label: 'Total Members', value: '3,247', change: '+12%', trend: 'up' },
    { label: 'Active Subscriptions', value: '1,892', change: '+8%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$28,380', change: '+15%', trend: 'up' },
    { label: 'Content Views', value: '45,892', change: '+23%', trend: 'up' }
  ]

  const recentActivity = [
    { type: 'member', text: 'New member joined: Sarah Mitchell', time: '5 min ago' },
    { type: 'content', text: 'Published new article: APEST in Practice', time: '2 hours ago' },
    { type: 'revenue', text: 'New subscription: Premium Plan', time: '4 hours ago' },
    { type: 'content', text: 'Updated book chapter: The Forgotten Ways Ch. 3', time: '1 day ago' }
  ]

  const quickActions = [
    { icon: FileText, label: 'New Article', href: '/admin/content/new' },
    { icon: Mail, label: 'Send Newsletter', href: '/admin/newsletter' },
    { icon: Users, label: 'Manage Members', href: '/admin/members' },
    { icon: BarChart, label: 'View Analytics', href: '/admin/analytics' }
  ]

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
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/70 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-card-foreground/60 mb-1">{stat.label}</p>
                      <p className="text-2xl font-display font-bold text-card-foreground">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={index}
                        href={action.href}
                        className="flex flex-col items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">{action.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'member' && <Users className="h-4 w-4 text-primary" />}
                        {activity.type === 'content' && <FileText className="h-4 w-4 text-primary" />}
                        {activity.type === 'revenue' && <Zap className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm text-card-foreground">{activity.text}</p>
                        <p className="text-xs text-card-foreground/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                System Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Website</p>
                    <p className="text-xs text-card-foreground/60">Operational</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">API</p>
                    <p className="text-xs text-card-foreground/60">Operational</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Database</p>
                    <p className="text-xs text-card-foreground/60">Operational</p>
                  </div>
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
                { label: 'Published Books', value: '15', icon: FileText },
                { label: 'Articles', value: '127', icon: FileText },
                { label: 'Podcast Episodes', value: '89', icon: Globe },
                { label: 'Video Content', value: '34', icon: Globe }
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
              <p className="text-card-foreground/70">Content management interface would go here...</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Platform Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Security Settings', desc: 'Manage authentication and access controls' },
                { icon: Database, title: 'Data Management', desc: 'Backup, export, and data retention settings' },
                { icon: Mail, title: 'Email Configuration', desc: 'SMTP settings and email templates' },
                { icon: Globe, title: 'SEO & Analytics', desc: 'Search optimization and tracking setup' },
                { icon: Users, title: 'Member Management', desc: 'Subscription plans and user roles' },
                { icon: Zap, title: 'Integration Settings', desc: 'API keys and third-party connections' }
              ].map((setting, index) => {
                const Icon = setting.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground mb-2">{setting.title}</h3>
                        <p className="text-sm text-card-foreground/70">{setting.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
