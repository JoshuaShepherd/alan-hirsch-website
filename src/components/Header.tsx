'use client'

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ChevronRight, BookOpen, Users, Star, Target, Search, MessageCircle, Calendar, Settings, LogIn, Sparkles, Home, User } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };



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

          {/* Right side - Theme toggle and Menu button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="menu-toggle p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Navigation Menu */}
        {isMenuOpen && (
          <div className="mobile-menu fixed inset-0 top-[73px] bg-background/98 backdrop-blur-sm z-40 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Home */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Home</h3>
                  <div className="space-y-2">
                    <Link href="/" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Main Homepage</Link>
                    <Link href="/ai-homepage" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">AI Homepage</Link>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Content</h3>
                  <div className="space-y-2">
                    <Link href="/books" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Books</Link>
                    <Link href="/articles" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Articles</Link>
                    <Link href="/podcast" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Podcast</Link>
                    <Link href="/newsletter" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Newsletter</Link>
                  </div>
                </div>

                {/* Tools & Assessments */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Tools & Assessment</h3>
                  <div className="space-y-2">
                    <Link href="/missional-assessment" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Missional Assessment</Link>
                    <Link href="/apest-agents" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">APEST Agents</Link>
                    <Link href="/toolkit" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Leadership Toolkit</Link>
                  </div>
                </div>

                {/* Community */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Community</h3>
                  <div className="space-y-2">
                    <Link href="/community" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Discussion Forums</Link>
                    <Link href="/search" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Search Content</Link>
                    <Link href="/dashboard" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Member Dashboard</Link>
                  </div>
                </div>

                {/* Partner Organizations */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Partners</h3>
                  <div className="space-y-2">
                    <Link href="/5q" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">5Q Collective</Link>
                    <Link href="/movement-leaders" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Movement Leaders</Link>
                    <Link href="/100movements" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">100 Movements</Link>
                    <Link href="/forge" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Forge</Link>
                    <Link href="/future-travelers" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Future Travelers</Link>
                    <Link href="/crm" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">CRM</Link>
                  </div>
                </div>

                {/* Speaking & About */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Speaking & About</h3>
                  <div className="space-y-2">
                    <Link href="/speaking" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Speaking</Link>
                    <Link href="/about" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">About Alan</Link>
                    <Link href="/contact" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Contact</Link>
                  </div>
                </div>

                {/* Account */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Account</h3>
                  <div className="space-y-2">
                    <Link href="/auth/login" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Sign In</Link>
                    <Link href="/auth/signup" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Sign Up</Link>
                    <Link href="/membership" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Membership</Link>
                    <Link href="/admin" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Admin</Link>
                  </div>
                </div>

                {/* Resources */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground">Resources</h3>
                  <div className="space-y-2">
                    <Link href="/resources" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">All Resources</Link>
                    <Link href="/site-map" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Site Map</Link>
                    <Link href="/privacy" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Terms</Link>
                    <Link href="/ethics" onClick={closeMenu} className="block text-foreground/80 hover:text-primary transition-colors">Ethics</Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}