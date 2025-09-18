import { Suspense } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { BookOpen, Home, Settings, Users, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function LMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-lms-border bg-lms-surface">
          <SidebarHeader className="border-b border-lms-border p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-lms-brand" />
              <span className="font-semibold text-lms-text">LMS Builder</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <nav className="space-y-2">
              <Link href="/lms/dashboard">
                <Button variant="ghost" className="w-full justify-start text-lms-text hover:bg-lms-card">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              
              <Link href="/lms/courses/new">
                <Button variant="ghost" className="w-full justify-start text-lms-text hover:bg-lms-card">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Course
                </Button>
              </Link>
              
              <Link href="/lms/settings">
                <Button variant="ghost" className="w-full justify-start text-lms-text hover:bg-lms-card">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-lms-border p-4">
            <div className="text-xs text-lms-muted">
              v1.0.0 • Built with Next.js
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="border-b border-lms-border bg-lms-surface px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </header>
          
          <main className="flex-1 bg-background">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lms-brand"></div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
