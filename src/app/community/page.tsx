import type { Metadata } from 'next'
import { ComprehensiveCommunityPlatform } from '@/components/admin/ComprehensiveCommunityPlatform'

export const metadata: Metadata = {
  title: 'Community - Alan Hirsch',
  description: 'Connect with fellow missional leaders through real-time chat, discussion forums, events, and member networking.',
  keywords: ['community', 'chat', 'forum', 'events', 'missional church', 'leadership', 'APEST', 'networking'],
}

export default function Community() {
  return <ComprehensiveCommunityPlatform />
}
