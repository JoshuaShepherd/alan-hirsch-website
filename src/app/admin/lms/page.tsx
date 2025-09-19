import { Metadata } from 'next'
import { ComprehensiveLMSSystem } from '@/components/admin/ComprehensiveLMSSystem'

export const metadata: Metadata = {
  title: 'LMS Management | Alan Hirsch',
  description: 'Manage learning management system - courses, students, and content',
}

export default function LMSPage() {
  return (
    <div className="container mx-auto py-8">
      <ComprehensiveLMSSystem />
    </div>
  )
}