import { Metadata } from 'next'
import { ComprehensiveResourceLibrary } from '@/components/admin/ComprehensiveResourceLibrary'

export const metadata: Metadata = {
  title: 'Resource Library | Admin Dashboard',
  description: 'Comprehensive resource management system for organizing, sharing, and tracking digital content and documents',
  keywords: ['resource library', 'document management', 'digital content', 'file sharing', 'downloads', 'admin']
}

export default function ResourceLibraryPage() {
  return <ComprehensiveResourceLibrary />
}