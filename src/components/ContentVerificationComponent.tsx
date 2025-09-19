'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface Book {
  id: string
  title: string
  slug: string
  author: string
  description: string | null
  total_chapters: number | null
  created_at: string | null
}

interface Chapter {
  id: string
  title: string
  slug: string
  chapter_number: number
  content: string
  reading_time: number | null
  difficulty: string | null
}

export default function ContentVerificationComponent() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load books from database
  useEffect(() => {
    loadBooks()
  }, [])

  // Load chapters when a book is selected
  useEffect(() => {
    if (selectedBook) {
      loadChapters(selectedBook.id)
    }
  }, [selectedBook])

  const loadBooks = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('books')
        .select('id, title, slug, author, description, total_chapters, created_at')
        .eq('status', 'published')
        .order('title')

      if (error) throw error

      setBooks(data || [])
      if (data && data.length > 0) {
        setSelectedBook(data[0])
      }
    } catch (err) {
      console.error('Error loading books:', err)
      setError(err instanceof Error ? err.message : 'Failed to load books')
    } finally {
      setIsLoading(false)
    }
  }

  const loadChapters = async (bookId: string) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('id, title, slug, chapter_number, content, reading_time, difficulty')
        .eq('book_id', bookId)
        .eq('status', 'published')
        .order('chapter_number')

      if (error) throw error

      setChapters(data || [])
      setSelectedChapter(null)
    } catch (err) {
      console.error('Error loading chapters:', err)
      setError(err instanceof Error ? err.message : 'Failed to load chapters')
    }
  }

  const truncateContent = (content: string, maxLength: number = 300) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">📚 Content Verification</h1>
        <p className="text-gray-600">
          Verifying that {books.length} books and their chapters have been successfully uploaded to Supabase
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Books List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">📖 Books ({books.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className={`w-full text-left p-3 rounded transition-colors ${
                  selectedBook?.id === book.id
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">{book.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {book.author} • {book.total_chapters || 0} chapters
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            📑 Chapters ({chapters.length})
            {selectedBook && (
              <div className="text-sm font-normal text-gray-600 mt-1">
                from "{selectedBook.title}"
              </div>
            )}
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={`w-full text-left p-3 rounded transition-colors ${
                  selectedChapter?.id === chapter.id
                    ? 'bg-green-100 border-green-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">
                  {chapter.chapter_number}. {chapter.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {chapter.reading_time}min • {chapter.difficulty}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Preview */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">📄 Content Preview</h2>
          {selectedChapter ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600">{selectedChapter.title}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Chapter {selectedChapter.chapter_number} • {selectedChapter.reading_time} min read
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {truncateContent(selectedChapter.content)}
                </div>
                {selectedChapter.content.length > 300 && (
                  <div className="mt-2 text-blue-500 text-sm">
                    Content truncated - {selectedChapter.content.length} total characters
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 text-center py-8">
              Select a chapter to preview its content
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">📊 Database Content Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{books.length}</div>
            <div className="text-sm text-gray-600">Books</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {books.reduce((sum, book) => sum + (book.total_chapters || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {selectedChapter ? selectedChapter.content.length : '---'}
            </div>
            <div className="text-sm text-gray-600">Content Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {chapters.reduce((sum, chapter) => sum + (chapter.reading_time || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Reading Time (min)</div>
          </div>
        </div>
      </div>
    </div>
  )
}