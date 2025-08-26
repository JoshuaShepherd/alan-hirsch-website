'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Users, Send, Search, Filter, Pin, Heart, Reply, MoreVertical, Flag, Bookmark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface User {
  id: string
  name: string
  avatar?: string
  role: 'member' | 'moderator' | 'author'
  title?: string
}

interface Discussion {
  id: string
  title: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  category: string
  tags: string[]
  isPinned: boolean
  replyCount: number
  likeCount: number
  isLiked: boolean
  isBookmarked: boolean
  lastReply?: {
    author: User
    createdAt: string
  }
}

interface Reply {
  id: string
  content: string
  author: User
  createdAt: string
  likeCount: number
  isLiked: boolean
  parentId?: string
}

interface CommunityAreaProps {
  discussions: Discussion[]
  selectedDiscussion: Discussion | null
  replies: Reply[]
  currentUser: User
  onSelectDiscussion: (discussion: Discussion) => void
  onCreateDiscussion: (title: string, content: string, category: string, tags: string[]) => void
  onReplyToDiscussion: (discussionId: string, content: string, parentId?: string) => void
  onLikeDiscussion: (discussionId: string) => void
  onLikeReply: (replyId: string) => void
  onBookmarkDiscussion: (discussionId: string) => void
}

const CATEGORIES = [
  'All Discussions',
  'Missional Church',
  'Leadership',
  'APEST/5Q',
  'Book Discussion',
  'Fresh Expressions',
  'Church Planting',
  'Discipleship',
  'General'
]

const ROLE_COLORS = {
  member: '-foreground',
  moderator: 'text-blue-600 dark:text-blue-400',
  author: 'text-green-600 dark:text-green-400'
}

const ROLE_BADGES = {
  member: null,
  moderator: 'Moderator',
  author: 'Author'
}

export function CommunityArea({
  discussions,
  selectedDiscussion,
  replies,
  currentUser,
  onSelectDiscussion,
  onCreateDiscussion,
  onReplyToDiscussion,
  onLikeDiscussion,
  onLikeReply,
  onBookmarkDiscussion
}: CommunityAreaProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Discussions')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: [] as string[]
  })
  const [replyContent, setReplyContent] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const replyInputRef = useRef<HTMLTextAreaElement>(null)

  // Filter discussions
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'All Discussions' || discussion.category === selectedCategory
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  // Sort discussions (pinned first, then by most recent activity)
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const handleCreateDiscussion = () => {
    if (newDiscussion.title && newDiscussion.content) {
      onCreateDiscussion(
        newDiscussion.title,
        newDiscussion.content,
        newDiscussion.category,
        newDiscussion.tags
      )
      setNewDiscussion({ title: '', content: '', category: 'General', tags: [] })
      setShowNewDiscussion(false)
    }
  }

  const handleReply = () => {
    if (replyContent && selectedDiscussion) {
      onReplyToDiscussion(selectedDiscussion.id, replyContent, replyingTo || undefined)
      setReplyContent('')
      setReplyingTo(null)
    }
  }

  const handleReplyToReply = (replyId: string, authorName: string) => {
    setReplyingTo(replyId)
    setReplyContent(`@${authorName} `)
    replyInputRef.current?.focus()
  }

  const renderUserAvatar = (user: User, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10'
    }

    return (
      <div className={`${sizeClasses[size]} rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={size === 'lg' ? 40 : size === 'md' ? 32 : 24}
            height={size === 'lg' ? 40 : size === 'md' ? 32 : 24}
            className="object-cover"
          />
        ) : (
          <span className={`-foreground font-medium ${
            size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-xs'
          }`}>
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    )
  }

  const renderUserName = (user: User) => (
    <div className="flex items-center gap-2">
      <span className={`font-medium ${ROLE_COLORS[user.role]}`}>
        {user.name}
      </span>
      {ROLE_BADGES[user.role] && (
        <span className={`px-2 py-0.5 text-xs rounded-full ${
          user.role === 'moderator' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        }`}>
          {ROLE_BADGES[user.role]}
        </span>
      )}
    </div>
  )

  const renderDiscussionCard = (discussion: Discussion) => (
    <div
      key={discussion.id}
      onClick={() => onSelectDiscussion(discussion)}
      className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
        selectedDiscussion?.id === discussion.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {renderUserAvatar(discussion.author)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {discussion.isPinned && <Pin className="h-4 w-4 text-primary flex-shrink-0" />}
            <h4 className="font-medium text-foreground line-clamp-1">
              {discussion.title}
            </h4>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            {renderUserName(discussion.author)}
            {discussion.author.title && (
              <span className="text-xs">• {discussion.author.title}</span>
            )}
          </div>

          <p className="text-sm mb-2 line-clamp-2">
            {discussion.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-1 bg-muted rounded-full">
                {discussion.category}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {discussion.replyCount}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {discussion.likeCount}
              </span>
            </div>
            <div className="text-xs">
              {formatTimeAgo(discussion.updatedAt)}
            </div>
          </div>

          {discussion.tags.length > 0 && (
            <div className="flex gap-1 mt-2">
              {discussion.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderDiscussionView = () => {
    if (!selectedDiscussion) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Select a Discussion
            </h3>
            <p className="-foreground">
              Choose a discussion from the list to view the conversation.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Discussion Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              {selectedDiscussion.isPinned && <Pin className="h-5 w-5 text-primary" />}
              <h1 className="font-display text-2xl font-bold text-foreground">
                {selectedDiscussion.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onBookmarkDiscussion(selectedDiscussion.id)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedDiscussion.isBookmarked
                    ? 'bg-primary/10 text-primary'
                    : '-foreground hover:bg-muted'
                }`}
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            {renderUserAvatar(selectedDiscussion.author, 'lg')}
            <div>
              {renderUserName(selectedDiscussion.author)}
              {selectedDiscussion.author.title && (
                <p className="text-sm">{selectedDiscussion.author.title}</p>
              )}
              <p className="text-sm">
                {formatTimeAgo(selectedDiscussion.createdAt)}
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-foreground mb-4">
            {selectedDiscussion.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onLikeDiscussion(selectedDiscussion.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                  selectedDiscussion.isLiked
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : '-foreground hover:bg-muted'
                }`}
              >
                <Heart className={`h-4 w-4 ${selectedDiscussion.isLiked ? 'fill-current' : ''}`} />
                {selectedDiscussion.likeCount}
              </button>
              <span className="-foreground text-sm">
                {selectedDiscussion.replyCount} replies
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-muted text-sm rounded-full">
                {selectedDiscussion.category}
              </span>
              {selectedDiscussion.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {replies.map(reply => (
              <div key={reply.id} className="flex gap-3">
                {renderUserAvatar(reply.author)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderUserName(reply.author)}
                    <span className="text-xs">
                      {formatTimeAgo(reply.createdAt)}
                    </span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-foreground mb-3">
                    {reply.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onLikeReply(reply.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        reply.isLiked
                          ? 'text-red-600 dark:text-red-400'
                          : '-foreground hover:text-foreground'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                      {reply.likeCount}
                    </button>
                    <button
                      onClick={() => handleReplyToReply(reply.id, reply.author.name)}
                      className="text-xs hover:text-foreground transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Input */}
        <div className="border-t border-border p-6">
          {replyingTo && (
            <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded-lg">
              <span className="text-sm">
                Replying to a comment
              </span>
              <button
                onClick={() => {
                  setReplyingTo(null)
                  setReplyContent('')
                }}
                className="-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex gap-3">
            {renderUserAvatar(currentUser)}
            <div className="flex-1">
              <textarea
                ref={replyInputRef}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs">
                  Be respectful and constructive in your discussions.
                </span>
                <button
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Community Discussions</h1>
          <p className="-foreground mt-1">Connect, learn, and grow together</p>
        </div>
        <button
          onClick={() => setShowNewDiscussion(true)}
          className="btn-primary mt-4 md:mt-0"
        >
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Discussion List */}
        <div className="lg:col-span-1 border border-border rounded-lg overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Discussion List */}
          <div className="overflow-y-auto max-h-[500px]">
            {sortedDiscussions.length > 0 ? (
              sortedDiscussions.map(renderDiscussionCard)
            ) : (
              <div className="p-8 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-3" />
                <p className="-foreground">No discussions found</p>
              </div>
            )}
          </div>
        </div>

        {/* Discussion View */}
        <div className="lg:col-span-2 border border-border rounded-lg overflow-hidden bg-background">
          {renderDiscussionView()}
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Start a New Discussion
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={newDiscussion.category}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {CATEGORIES.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                <textarea
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Share your thoughts, questions, or insights..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewDiscussion(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDiscussion}
                  disabled={!newDiscussion.title || !newDiscussion.content}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
