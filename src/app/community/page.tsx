import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Users, TrendingUp, Clock, Star, Pin, Heart, Reply, MoreHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Community - Alan Hirsch',
  description: 'Join discussions with fellow missional leaders around the world. Share insights, ask questions, and learn together.',
  keywords: ['community', 'discussion', 'forum', 'missional church', 'leadership', 'APEST'],
}

export default function Community() {
  const categories = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'Share thoughts and ideas about missional church',
      posts: 234,
      members: 1892,
      color: 'blue'
    },
    {
      id: 'apest',
      name: 'APEST Framework',
      description: 'Explore the five-fold ministry gifts',
      posts: 156,
      members: 1445,
      color: 'green'
    },
    {
      id: 'books',
      name: 'Book Discussions',
      description: 'Chapter-by-chapter discussions and insights',
      posts: 189,
      members: 1234,
      color: 'purple'
    },
    {
      id: 'practical',
      name: 'Practical Applications',
      description: 'Real-world implementation stories',
      posts: 98,
      members: 892,
      color: 'orange'
    }
  ]

  const recentPosts = [
    {
      id: 1,
      title: 'How do we practically implement APEST in small churches?',
      author: 'Sarah Mitchell',
      authorAvatar: 'SM',
      category: 'APEST Framework',
      replies: 12,
      likes: 8,
      time: '2 hours ago',
      pinned: true,
      excerpt: 'I\'ve been reading The Forgotten Ways and I\'m struggling to see how a church of 40 people can practically implement all five functions...'
    },
    {
      id: 2,
      title: 'Reflections on Chapter 4 of ReJesus',
      author: 'Michael Chen',
      authorAvatar: 'MC',
      category: 'Book Discussions',
      replies: 7,
      likes: 15,
      time: '4 hours ago',
      pinned: false,
      excerpt: 'The section on Jesus as the revolutionary really challenged my thinking about comfort zones in ministry...'
    },
    {
      id: 3,
      title: 'Success story: Our church plant journey',
      author: 'Emma Rodriguez',
      authorAvatar: 'ER',
      category: 'Practical Applications',
      replies: 23,
      likes: 34,
      time: '1 day ago',
      pinned: false,
      excerpt: 'After 18 months of applying missional principles, we\'ve seen incredible transformation in our community...'
    },
    {
      id: 4,
      title: 'Question about discipleship vs. evangelism',
      author: 'David Park',
      authorAvatar: 'DP',
      category: 'General Discussion',
      replies: 9,
      likes: 6,
      time: '2 days ago',
      pinned: false,
      excerpt: 'I\'m curious about Alan\'s perspective on the relationship between these two essential functions...'
    }
  ]

  const activeMembers = [
    { name: 'Sarah Mitchell', avatar: 'SM', posts: 45 },
    { name: 'Michael Chen', avatar: 'MC', posts: 38 },
    { name: 'Emma Rodriguez', avatar: 'ER', posts: 29 },
    { name: 'David Park', avatar: 'DP', posts: 22 }
  ]

  return (
    <div className="bg-page min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-section">
        <div className="max-w-content mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg mb-4 text-foreground">
            Community Discussions
          </h1>
          <p className="text-lg mb-8 text-foreground/80">
            Connect with fellow missional leaders from around the world. Share insights, 
            ask questions, and learn together.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>3,247 Members</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span>892 Discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Active Today</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Discussion Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/community/${category.id}`}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-card-foreground">{category.name}</h3>
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
                    </div>
                    <p className="text-sm text-card-foreground/70 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-card-foreground/60">
                      <span>{category.posts} posts</span>
                      <span>{category.members.toLocaleString()} members</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Recent Discussions
                </h2>
                <Link 
                  href="/community/new"
                  className="btn-primary text-sm"
                >
                  Start Discussion
                </Link>
              </div>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {post.authorAvatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {post.pinned && <Pin className="h-4 w-4 text-primary" />}
                            <h3 className="font-semibold text-card-foreground hover:text-primary cursor-pointer">
                              {post.title}
                            </h3>
                          </div>
                          <button className="text-card-foreground/40 hover:text-card-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-card-foreground/60 mb-3">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                        
                        <p className="text-sm text-card-foreground/80 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-card-foreground/60 hover:text-primary">
                            <Reply className="h-3 w-3" />
                            {post.replies} replies
                          </button>
                          <button className="flex items-center gap-1 text-xs text-card-foreground/60 hover:text-red-500">
                            <Heart className="h-3 w-3" />
                            {post.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link 
                  href="/community/all"
                  className="btn-secondary"
                >
                  View All Discussions
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Members */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                Active Members
              </h3>
              <div className="space-y-3">
                {activeMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-card-foreground">
                        {member.name}
                      </div>
                      <div className="text-xs text-card-foreground/60">
                        {member.posts} posts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground/70">Total Members</span>
                  <span className="font-semibold text-card-foreground">3,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground/70">Total Posts</span>
                  <span className="font-semibold text-card-foreground">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground/70">Active Today</span>
                  <span className="font-semibold text-card-foreground">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground/70">New This Week</span>
                  <span className="font-semibold text-card-foreground">23</span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                Community Guidelines
              </h3>
              <ul className="text-sm text-card-foreground/70 space-y-2">
                <li>• Be respectful and constructive</li>
                <li>• Stay on topic</li>
                <li>• No spam or self-promotion</li>
                <li>• Search before posting</li>
                <li>• Help others learn and grow</li>
              </ul>
              <Link 
                href="/community/guidelines"
                className="text-sm text-primary hover:text-primary/80 mt-3 inline-block"
              >
                Read full guidelines →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
