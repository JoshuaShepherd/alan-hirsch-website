'use client'

import { useState, useEffect } from 'react'
import { Bookmark, BookOpen, Clock, Search, Filter, Trash2, ExternalLink, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface BookmarkItem {
  id: string
  type: 'book' | 'chapter' | 'article' | 'video'
  title: string
  description?: string
  url: string
  imageUrl?: string
  author?: string
  bookTitle?: string
  addedAt: string
  tags: string[]
}

interface ReadingHistoryItem {
  id: string
  type: 'book' | 'chapter' | 'article' | 'video'
  title: string
  description?: string
  url: string
  imageUrl?: string
  author?: string
  bookTitle?: string
  lastViewedAt: string
  progress?: number // percentage for books/chapters
  completed: boolean
  timeSpent?: number // minutes
}

interface BookmarksHistoryProps {
  bookmarks: BookmarkItem[]
  history: ReadingHistoryItem[]
  onRemoveBookmark: (bookmarkId: string) => void
  onClearHistory: () => void
  onRemoveHistoryItem: (historyId: string) => void
}

const CONTENT_TYPE_LABELS = {
  book: 'Book',
  chapter: 'Chapter',
  article: 'Article',
  video: 'Video'
}

const CONTENT_TYPE_ICONS = {
  book: BookOpen,
  chapter: BookOpen,
  article: BookOpen,
  video: BookOpen
}

export function BookmarksHistory({
  bookmarks,
  history,
  onRemoveBookmark,
  onClearHistory,
  onRemoveHistoryItem
}: BookmarksHistoryProps) {
  const [activeTab, setActiveTab] = useState('bookmarks')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from bookmarks
  const allTags = Array.from(new Set(bookmarks.flatMap(item => item.tags)))

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.author?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'all' || bookmark.type === selectedType
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => bookmark.tags.includes(tag))

    return matchesSearch && matchesType && matchesTags
  })

  // Filter history
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'all' || item.type === selectedType

    return matchesSearch && matchesType
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        return `${diffInMinutes}m ago`
      }
      return `${diffInHours}h ago`
    } else if (diffInDays === 1) {
      return 'Yesterday'
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const formatReadingTime = (minutes?: number) => {
    if (!minutes) return ''
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const renderBookmarkCard = (bookmark: BookmarkItem) => {
    const Icon = CONTENT_TYPE_ICONS[bookmark.type]
    
    return (
      <div key={bookmark.id} className="group border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
            {bookmark.imageUrl ? (
              <Image
                src={bookmark.imageUrl}
                alt={bookmark.title}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <Icon className="h-6 w-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <Link
                  href={bookmark.url}
                  className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {bookmark.title}
                </Link>
                {bookmark.author && (
                  <p className="text-sm">by {bookmark.author}</p>
                )}
                {bookmark.bookTitle && bookmark.type === 'chapter' && (
                  <p className="text-sm">from {bookmark.bookTitle}</p>
                )}
              </div>
              <button
                onClick={() => onRemoveBookmark(bookmark.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                title="Remove bookmark"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {bookmark.description && (
              <p className="text-sm mb-2 line-clamp-2">
                {bookmark.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-muted text-xs rounded-full">
                  {CONTENT_TYPE_LABELS[bookmark.type]}
                </span>
                {bookmark.tags.length > 0 && (
                  <div className="flex gap-1">
                    {bookmark.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {bookmark.tags.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-xs rounded-full">
                        +{bookmark.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs">
                {formatTimeAgo(bookmark.addedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderHistoryCard = (item: ReadingHistoryItem) => {
    const Icon = CONTENT_TYPE_ICONS[item.type]
    
    return (
      <div key={item.id} className="group border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <Icon className="h-6 w-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <Link
                  href={item.url}
                  className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {item.title}
                </Link>
                {item.author && (
                  <p className="text-sm">by {item.author}</p>
                )}
                {item.bookTitle && item.type === 'chapter' && (
                  <p className="text-sm">from {item.bookTitle}</p>
                )}
              </div>
              <button
                onClick={() => onRemoveHistoryItem(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                title="Remove from history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {item.description && (
              <p className="text-sm mb-2 line-clamp-2">
                {item.description}
              </p>
            )}

            {/* Progress bar for books/chapters */}
            {item.progress !== undefined && item.progress > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">Progress</span>
                  <span className="text-xs">{Math.round(item.progress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-muted text-xs rounded-full">
                  {CONTENT_TYPE_LABELS[item.type]}
                </span>
                {item.completed && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-full">
                    Completed
                  </span>
                )}
                {item.timeSpent && (
                  <span className="text-xs">
                    {formatReadingTime(item.timeSpent)} read
                  </span>
                )}
              </div>
              <p className="text-xs">
                {formatTimeAgo(item.lastViewedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">My Library</h1>
        <p className="-foreground mt-1">Your saved content and reading history</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'bookmarks', label: `Bookmarks (${bookmarks.length})`, icon: Bookmark },
            { id: 'history', label: `History (${history.length})`, icon: Clock },
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

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          <input
            type="text"
            placeholder="Search your content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Content Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="book">Books</option>
              <option value="chapter">Chapters</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
            </select>
          </div>

          {/* Tag Filter (only for bookmarks) */}
          {activeTab === 'bookmarks' && allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm">Tags:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border text-foreground hover:border-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Clear History Button (only for history tab) */}
          {activeTab === 'history' && history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="ml-auto btn-outline text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 text-sm flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map(renderBookmarkCard)
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No bookmarks yet
              </h3>
              <p className="-foreground mb-4">
                Start bookmarking articles, chapters, and resources you want to save for later.
              </p>
              <Link href="/books" className="btn-primary">
                Explore Content
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map(renderHistoryCard)
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No reading history
              </h3>
              <p className="-foreground mb-4">
                Your reading history will appear here as you explore content.
              </p>
              <Link href="/books" className="btn-primary">
                Start Reading
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
