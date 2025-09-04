'use client'

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ChevronRight, BookOpen, Users, Star, Target, Search, MessageCircle, Calendar, Settings, LogIn, Sparkles, Home, User } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setShowMobileMenu(false);
      setActiveSection(null);
    };
    
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showMobileMenu && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
        setShowMobileMenu(false);
        setActiveSection(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const navigationSections = [
    {
      id: 'home',
      title: 'Home',
      icon: Home,
      items: [
        { label: 'Main Homepage', href: '/', icon: Home },
        { label: 'AI-Powered Homepage', href: '/ai-homepage', icon: Sparkles }
      ]
    },
    {
      id: 'content',
      title: 'Content Library',
      icon: BookOpen,
      items: [
        { label: 'Complete Books', href: '/books', icon: BookOpen },
        { label: 'Latest Articles', href: '/articles', icon: BookOpen },
        { label: 'Podcast Episodes', href: '/podcast', icon: MessageCircle },
        { label: 'Newsletter Archive', href: '/newsletter', icon: MessageCircle }
      ]
    },
    {
      id: 'tools',
      title: 'Assessment Tools',
      icon: Target,
      items: [
        { label: 'Missional Assessment', href: '/missional-assessment', icon: Target },
        { label: 'APEST Agents', href: '/apest-agents', icon: Users },
        { label: 'Leadership Toolkit', href: '/toolkit', icon: Star }
      ]
    },
    {
      id: 'community',
      title: 'Community & Learning',
      icon: Users,
      items: [
        { label: 'Discussion Forums', href: '/community', icon: MessageCircle },
        { label: 'Search Content', href: '/search', icon: Search },
        { label: 'AI Assistant', href: '/ai-homepage', icon: Sparkles },
        { label: 'Member Dashboard', href: '/dashboard', icon: User }
      ]
    },
    {
      id: 'partners',
      title: 'Partner Organizations',
      icon: Star,
      items: [
        { label: '5Q Collective', href: '/5q', icon: Star },
        { label: 'Movement Leaders', href: '/movement-leaders', icon: Users },
        { label: '100 Movements', href: '/100movements', icon: Target },
        { label: 'Forge Mission Training', href: '/forge', icon: Star },
        { label: 'Future Travelers', href: '/future-travelers', icon: MessageCircle },
        { label: 'Church Resource Ministries', href: '/crm', icon: BookOpen }
      ]
    },
    {
      id: 'speaking',
      title: 'Speaking & Events',
      icon: Calendar,
      items: [
        { label: 'Speaking Topics', href: '/speaking', icon: MessageCircle },
        { label: 'About Alan', href: '/about', icon: User },
        { label: 'Book a Session', href: '/contact', icon: Calendar }
      ]
    },
    {
      id: 'account',
      title: 'Your Account',
      icon: User,
      items: [
        { label: 'Sign In', href: '/auth/login', icon: LogIn },
        { label: 'Create Account', href: '/auth/signup', icon: User },
        { label: 'Membership Plans', href: '/membership', icon: Star },
        { label: 'Admin Panel', href: '/admin', icon: Settings }
      ]
    }
  ];

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
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="menu-toggle p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Full-Screen Navigation Menu */}
        {showMobileMenu && (
          <div className="mobile-menu fixed inset-0 top-[73px] bg-background/98 backdrop-blur-sm z-40 overflow-y-auto">
            <div className="max-w-container mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navigationSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <div key={section.id} className="bg-card border border-border rounded-lg overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-card-foreground">{section.title}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 text-card-foreground/60 transition-transform ${
                            isActive ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>

                      {/* Section Items */}
                      <div className={`transition-all duration-300 overflow-hidden ${
                        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-2">
                          {section.items.map((item, index) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                key={index}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-card-foreground hover:bg-muted/50 transition-colors"
                                onClick={() => {
                                  setShowMobileMenu(false);
                                  setActiveSection(null);
                                }}
                              >
                                <ItemIcon className="h-4 w-4 text-card-foreground/60" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Access Bar at Bottom */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-foreground/80 mb-4 text-center">
                  Quick Access
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { label: 'AI Assistant', href: '/ai-homepage', icon: Sparkles, color: 'bg-blue-500' },
                    { label: 'Books', href: '/books', icon: BookOpen, color: 'bg-green-500' },
                    { label: 'Community', href: '/community', icon: Users, color: 'bg-purple-500' },
                    { label: 'Assessment', href: '/missional-assessment', icon: Target, color: 'bg-orange-500' },
                    { label: 'Search', href: '/search', icon: Search, color: 'bg-red-500' },
                    { label: 'Pricing', href: '/membership', icon: Star, color: 'bg-yellow-500' }
                  ].map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-card border border-border hover:shadow-md transition-all text-center min-w-[80px]"
                        onClick={() => {
                          setShowMobileMenu(false);
                          setActiveSection(null);
                        }}
                      >
                        <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                          <ItemIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-card-foreground">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-6 text-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setActiveSection(null);
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}