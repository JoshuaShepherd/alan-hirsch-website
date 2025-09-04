'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Star, TrendingUp, Users, Video, Download, MessageCircle, Award, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const recentBooks = [
    {
      id: 'tfol',
      title: 'The Forgotten Ways',
      progress: 45,
      lastChapter: 'Chapter 3: The Apostolic Environment',
      timeLeft: '2 hours left'
    },
    {
      id: 'rejesus',
      title: 'ReJesus',
      progress: 78,
      lastChapter: 'Chapter 7: The Revolutionary Jesus',
      timeLeft: '1 hour left'
    }
  ]

  const recommendations = [
    {
      id: 'untamed',
      title: 'Untamed',
      description: 'Based on your interest in missional church',
      type: 'book'
    },
    {
      id: 'leadership-webinar',
      title: 'APEST Leadership Masterclass',
      description: 'Live session next Tuesday',
      type: 'video'
    }
  ]

  const achievements = [
    { icon: BookOpen, title: 'First Book Complete', earned: true },
    { icon: Clock, title: '10 Hours Reading', earned: true },
    { icon: Star, title: 'Community Contributor', earned: false },
    { icon: Award, title: 'Scholar Achievement', earned: false }
  ]

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
                Welcome back, Sarah
              </h1>
              <p className="text-card-foreground/70">
                Continue your missional journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-card-foreground">Member</div>
                <div className="text-xs text-card-foreground/60">Since March 2024</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                SJ
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-border">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'reading', label: 'My Reading' },
            { id: 'community', label: 'Community' },
            { id: 'achievements', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground/70 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Reading */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  Continue Reading
                </h2>
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-12 h-16 bg-primary/20 rounded flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">{book.title}</h3>
                        <p className="text-sm text-card-foreground/70 mb-2">{book.lastChapter}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-card-foreground/60">{book.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-card-foreground/40" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[
                    { type: 'reading', text: 'Completed Chapter 6 of The Forgotten Ways', time: '2 hours ago' },
                    { type: 'comment', text: 'Commented on discussion about APEST framework', time: '1 day ago' },
                    { type: 'download', text: 'Downloaded study guide for ReJesus', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'reading' && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-primary" />}
                        {activity.type === 'download' && <Download className="h-4 w-4 text-primary" />}
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Reading Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                  Your Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground/70">Books Started</span>
                    <span className="font-semibold text-card-foreground">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground/70">Books Completed</span>
                    <span className="font-semibold text-card-foreground">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground/70">Reading Time</span>
                    <span className="font-semibold text-card-foreground">24h 15m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground/70">Current Streak</span>
                    <span className="font-semibold text-card-foreground">7 days</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                  Recommended for You
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                          {rec.type === 'book' ? (
                            <BookOpen className="h-3 w-3 text-primary" />
                          ) : (
                            <Video className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-card-foreground">{rec.title}</h4>
                          <p className="text-xs text-card-foreground/60">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link 
                    href="/books" 
                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm text-card-foreground">Browse Books</span>
                  </Link>
                  <Link 
                    href="/community" 
                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm text-card-foreground">Join Discussion</span>
                  </Link>
                  <Link 
                    href="/resources" 
                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Download className="h-4 w-4 text-primary" />
                    <span className="text-sm text-card-foreground">Download Resources</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Your Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border transition-all ${
                    achievement.earned
                      ? 'bg-card border-primary/20 shadow-sm'
                      : 'bg-card border-border opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-foreground/40'
                    }`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-card-foreground/70">
                        {achievement.earned ? 'Earned' : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
