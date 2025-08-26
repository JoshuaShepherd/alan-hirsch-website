import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors">
              Alan Hirsch
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/books" className="text-foreground hover:text-primary transition-colors font-medium">
              Books
            </Link>
            <Link href="/articles" className="text-foreground hover:text-primary transition-colors font-medium">
              Articles
            </Link>
            <Link href="/podcast" className="text-foreground hover:text-primary transition-colors font-medium">
              Podcast
            </Link>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors font-medium">
              Resources
            </Link>
            <Link href="/speaking" className="text-foreground hover:text-primary transition-colors font-medium">
              Speaking
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link 
              href="/newsletter" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors font-medium"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="text-foreground hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
