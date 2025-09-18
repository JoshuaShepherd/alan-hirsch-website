'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart, FileText, Users, Settings, Bot, 
  TrendingUp, Home, ArrowLeft 
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const ADMIN_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: BarChart },
  { id: 'content', label: 'Content', href: '/admin/content/new', icon: FileText },
  { id: 'members', label: 'Members', href: '/admin/members', icon: Users },
  { id: 'ai-agents', label: 'AI Agents', href: '/admin/ai-agents', icon: Bot },
  { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-page">
      {/* Admin Navigation Bar */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <Home className="h-4 w-4" />
                <span className="text-sm">Back to Site</span>
              </Link>
              
              <div className="h-6 w-px bg-border" />
              
              <nav className="flex items-center space-x-6">
                {ADMIN_NAV_ITEMS.map(item => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || 
                    (item.id === 'dashboard' && pathname === '/admin') ||
                    (item.id === 'content' && pathname.startsWith('/admin/content'))
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/admin/content/new"
                className="btn-primary btn-sm"
              >
                Create Content
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  )
}
