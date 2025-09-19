'use client'

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  Star, 
  Target, 
  MessageCircle, 
  Settings, 
  LogIn, 
  Home,
  User,
  Mail,
  Award,
  ShoppingCart,
  Search
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Alan Hirsch
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/books" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded px-2 py-1">
              Books
            </Link>
            <Link href="/missional-assessment" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded px-2 py-1">
              Assessment
            </Link>
            <Link href="/speaking" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded px-2 py-1">
              Speaking
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded px-2 py-1">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded px-2 py-1">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <div className="hidden lg:block">
              <Link 
                href="/auth/login" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="px-6 py-6">
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Quick Access</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Home className="w-4 h-4 text-blue-600" />
                      <span className="text-black dark:text-white text-sm font-medium">Home</span>
                    </Link>
                    <Link href="/about" onClick={closeMenu} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-black dark:text-white text-sm font-medium">About</span>
                    </Link>
                    <Link href="/contact" onClick={closeMenu} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-black dark:text-white text-sm font-medium">Contact</span>
                    </Link>
                    <Link href="/site-map" onClick={closeMenu} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span className="text-black dark:text-white text-sm font-medium">Site Map</span>
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Books & Content
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/books" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Complete Book Library</Link>
                      <Link href="/blog" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Blog</Link>
                      <Link href="/podcast" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Podcast</Link>
                      <Link href="/newsletter" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Newsletter</Link>
                      <Link href="/resources" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Resources Hub</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Assessment Tools
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/missional-assessment" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Missional Assessment</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-600" />
                      Partner Organizations
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/5q" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">5Q Collective</Link>
                      <Link href="/movement-leaders" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Movement Leaders</Link>
                      <Link href="/100movements" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">100 Movements</Link>
                      <Link href="/forge" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Forge Mission Training</Link>
                      <Link href="/future-travelers" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Future Travelers</Link>
                      <Link href="/crm" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Church Resource Ministries</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      Speaking & Events
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/speaking" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Speaking Topics</Link>
                      <Link href="/events" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Events Calendar</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Community
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/community" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Community Forums</Link>
                      <Link href="/dashboard" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Member Dashboard</Link>
                      <Link href="/membership" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Membership Plans</Link>
                      <Link href="/search" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Search Content</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      Learning Platform
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/lms" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">LMS Platform</Link>
                      <Link href="/lms/dashboard" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">LMS Dashboard</Link>
                      <Link href="/lms/movemental" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Movemental Program</Link>
                      <Link href="/lms/courses" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Course Catalog</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                      Products & Services
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/products" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Products</Link>
                      <Link href="/events" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Events</Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-blue-600" />
                      Authentication
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/auth/login" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Sign In</Link>
                      <Link href="/auth/signup" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2 text-sm">Create Account</Link>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                    <h3 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-600" />
                      Administrative
                    </h3>
                    <div className="space-y-1 ml-6">
                      <Link href="/admin/dashboard" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Admin Dashboard</Link>
                      <Link href="/admin/blog" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Blog Management</Link>
                      <Link href="/admin/content" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Content Creation</Link>
                      <Link href="/admin/analytics" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Analytics</Link>
                      <Link href="/admin/members" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Member Management</Link>
                      <Link href="/admin/ai-agents" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">AI Agents</Link>
                      <Link href="/admin/settings" onClick={closeMenu} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 text-sm">Settings</Link>
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Legal & Support</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <Link href="/privacy" onClick={closeMenu} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" onClick={closeMenu} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/ethics" onClick={closeMenu} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Ethics Statement</Link>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-2">Archive</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <Link href="/archive" className="hover:text-gray-700 dark:hover:text-gray-300">Browse archived content & experiments →</Link>
                    </div>
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
