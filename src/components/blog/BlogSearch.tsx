'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { blogService } from '@/lib/blog'
import { useDebounce } from '@/hooks/useDebounce'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { BlogPostWithAuthor } from '@/lib/blog'

interface BlogSearchProps {
  placeholder?: string
  className?: string
}

export function BlogSearch({ 
  placeholder = "Search articles...", 
  className = "" 
}: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPostWithAuthor[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      try {
        const searchResults = await blogService.searchPosts(debouncedQuery)
        setResults(searchResults)
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }

    handleSearch()
  }, [debouncedQuery])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              <div className="px-3 py-2 text-sm text-gray-500 border-b">
                Found {results.length} article{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <div className="flex items-start gap-3">
                    {post.featured_image_url && (
                      <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                        {post.title}
                      </h4>
                      {post.excerpt && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                          {post.excerpt}
                        </p>
                      )}
                      {post.published_at && (
                        <p className="text-xs text-gray-500">
                          {formatDate(post.published_at)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No articles found for "{query}"</p>
              <p className="text-sm mt-1">Try searching with different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

// Compact search component for sidebars
export function CompactBlogSearch() {
  return (
    <BlogSearch 
      placeholder="Search..." 
      className="w-full"
    />
  )
}

// Hero search component for main pages
export function HeroBlogSearch() {
  return (
    <div className="max-w-2xl mx-auto">
      <BlogSearch 
        placeholder="What would you like to learn about?" 
        className="w-full"
      />
    </div>
  )
}