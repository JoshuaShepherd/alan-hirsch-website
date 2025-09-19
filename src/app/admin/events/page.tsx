import { Metadata } from 'next'
import { ComprehensiveEventManagement } from '@/components/admin/ComprehensiveEventManagement'

export const metadata: Metadata = {
  title: 'Event Management | Admin Dashboard',
  description: 'Comprehensive event planning and management system for conferences, workshops, and training events',
  keywords: ['event management', 'conferences', 'workshops', 'registration', 'speakers', 'venues', 'admin']
}

export default function EventManagementPage() {
  return <ComprehensiveEventManagement />
}