import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string | undefined>
}

export function BlogPagination({ 
  currentPage, 
  totalPages, 
  baseUrl,
  searchParams = {} 
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    
    // Add existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value)
      }
    })
    
    // Add page param
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`
  }

  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }
    }

    return rangeWithDots
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center mt-12">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Link>
        ) : (
          <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-l-md cursor-not-allowed">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </span>
        )}

        {/* Page numbers */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"
              >
                ...
              </span>
            )
          }

          const page = pageNumber as number
          const isCurrentPage = page === currentPage

          return isCurrentPage ? (
            <span
              key={page}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              {page}
            </Link>
          )
        })}

        {/* Next button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-r-md cursor-not-allowed">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        )}
      </div>
    </nav>
  )
}

// Simple pagination component
export function SimplePagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}