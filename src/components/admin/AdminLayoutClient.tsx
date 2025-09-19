'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart, FileText, Users, Settings, Bot, 
  TrendingUp, Home, ArrowLeft, LogOut
} from 'lucide-react'
import { signOut } from '@/lib/auth-actions'
import { User } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'

interface AdminLayoutClientProps {
  children: React.ReactNode
  user: User
}

const ADMIN_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: BarChart },
  { id: 'content', label: 'Content', href: '/admin/content/new', icon: FileText },
  { id: 'members', label: 'Members', href: '/admin/members', icon: Users },
  { id: 'ai-agents', label: 'AI Agents', href: '/admin/ai-agents', icon: Bot },
  { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings }
]

export default function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 rounded px-2 py-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <Home className="h-4 w-4" />
                <span className="text-sm">Back to Site</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              
              <nav className="flex items-center space-x-6">
                {ADMIN_NAV_ITEMS.map(item => {
                  const Icon = item.icon
                  const isActive = pathname === item.href ||
                    (item.href === '/admin/blogs' && pathname.startsWith('/admin/blogs'))
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </span>
              
              <Link 
                href="/admin/content/new"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
              >
                Create Content
              </Link>
              
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
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