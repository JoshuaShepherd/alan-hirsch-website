import { Metadata } from 'next'
import { ComprehensiveContentManagement } from '@/components/admin/ComprehensiveContentManagement'

export const metadata: Metadata = {
  title: 'Content Management | Alan Hirsch',
  description: 'Manage blog posts, pages, media library, and content analytics',
}

export default function ContentManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <ComprehensiveContentManagement />
    </div>
  )
}