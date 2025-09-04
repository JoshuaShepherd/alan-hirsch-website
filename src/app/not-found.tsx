import Link from 'next/link'
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-display text-foreground/60">404</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Page Not Found
          </h1>
          <p className="text-foreground/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/search"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link 
              href="/books"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Books
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-foreground/60">
            Need help? <Link href="/contact" className="text-primary hover:text-primary/80">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
