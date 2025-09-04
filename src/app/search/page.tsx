'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, BookOpen, Users, Video, FileText, Clock, Star } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isSearching, setIsSearching] = useState(false)

  const filters = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'community', label: 'Community', icon: Users }
  ]

  const searchResults = [
    {
      id: 1,
      type: 'book',
      title: 'The Forgotten Ways',
      subtitle: 'Chapter 3: The Apostolic Environment',
      description: 'Explores the essential DNA of the early church and how modern churches can recover these forgotten ways of being missional.',
      author: 'Alan Hirsch',
      readingTime: '45 min',
      rating: 4.8,
      url: '/books/tfol/chapter-03'
    },
    {
      id: 2,
      type: 'article',
      title: 'Understanding APEST in Modern Context',
      subtitle: 'Leadership Development',
      description: 'A deep dive into how the five-fold ministry gifts apply to contemporary church leadership structures and missional communities.',
      author: 'Alan Hirsch',
      readingTime: '12 min',
      rating: 4.6,
      url: '/articles/apest-modern-context'
    },
    {
      id: 3,
      type: 'video',
      title: 'Missional Church Principles',
      subtitle: 'Leadership Masterclass',
      description: 'Live session covering the foundational principles of missional church movement and practical implementation strategies.',
      author: 'Alan Hirsch',
      readingTime: '90 min',
      rating: 4.9,
      url: '/videos/missional-principles'
    },
    {
      id: 4,
      type: 'community',
      title: 'How do we practically implement APEST?',
      subtitle: 'Community Discussion',
      description: 'Active discussion thread with 23 responses about practical implementation of APEST framework in small church settings.',
      author: 'Sarah Mitchell',
      readingTime: '5 min read',
      rating: 4.3,
      url: '/community/apest-practical-implementation'
    },
    {
      id: 5,
      type: 'book',
      title: 'ReJesus',
      subtitle: 'Chapter 7: The Revolutionary Jesus',
      description: 'Challenges readers to rediscover the radical nature of Jesus and what it means for contemporary Christian living and mission.',
      author: 'Alan Hirsch & Michael Frost',
      readingTime: '38 min',
      rating: 4.7,
      url: '/books/rejesus/chapter-07'
    }
  ]

  const recentSearches = [
    'APEST framework',
    'missional church',
    'church planting',
    'discipleship models',
    'evangelism strategies'
  ]

  const popularSearches = [
    'forgotten ways',
    'apostolic ministry',
    'church DNA',
    'multiplication',
    'missional communities'
  ]

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
    }, 500)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return BookOpen
      case 'article':
        return FileText
      case 'video':
        return Video
      case 'community':
        return Users
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
      case 'article':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
      case 'video':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
      case 'community':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === activeFilter)

  return (
    <div className="bg-page min-h-screen">
      {/* Search Header */}
      <div className="bg-section border-b border-border">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Search Alan's Library
            </h1>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search books, articles, videos, and discussions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg text-foreground placeholder-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={() => handleSearch(query)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-2 px-4"
              >
                Search
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {filters.map((filter) => {
                const Icon = filter.icon
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-background text-foreground/70 hover:bg-muted border border-border'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-3">
            {query ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {isSearching ? 'Searching...' : `Results for "${query}"`}
                  </h2>
                  <span className="text-sm text-foreground/60">
                    {filteredResults.length} results
                  </span>
                </div>

                {isSearching ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg" />
                          <div className="flex-1">
                            <div className="h-4 bg-muted rounded mb-2 w-3/4" />
                            <div className="h-3 bg-muted rounded mb-3 w-1/2" />
                            <div className="h-3 bg-muted rounded mb-2 w-full" />
                            <div className="h-3 bg-muted rounded w-2/3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredResults.map((result) => {
                      const Icon = getTypeIcon(result.type)
                      return (
                        <Link
                          key={result.id}
                          href={result.url}
                          className="block bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-card-foreground mb-1 hover:text-primary">
                                    {result.title}
                                  </h3>
                                  <p className="text-sm text-card-foreground/70 mb-2">
                                    {result.subtitle}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-card-foreground/60">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  {result.rating}
                                </div>
                              </div>
                              
                              <p className="text-sm text-card-foreground/80 mb-3 line-clamp-2">
                                {result.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs text-card-foreground/60">
                                <span>{result.author}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {result.readingTime}
                                </div>
                                <span>•</span>
                                <span className={`px-2 py-0.5 rounded-full capitalize ${getTypeColor(result.type)}`}>
                                  {result.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Start Your Search
                </h2>
                <p className="text-foreground/70 mb-6">
                  Enter keywords to search through books, articles, videos, and community discussions
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="block w-full text-left px-3 py-2 text-sm text-card-foreground/70 hover:text-card-foreground hover:bg-muted rounded transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-muted text-card-foreground text-xs rounded-full hover:bg-muted/80 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Tips */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">
                Search Tips
              </h3>
              <ul className="text-sm text-card-foreground/70 space-y-2">
                <li>• Use quotes for exact phrases</li>
                <li>• Try different keywords</li>
                <li>• Use filters to narrow results</li>
                <li>• Search by author or book title</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
