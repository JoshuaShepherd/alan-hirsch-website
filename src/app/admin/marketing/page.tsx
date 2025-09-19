import { Metadata } from 'next'
import { ComprehensiveMarketingTools } from '@/components/admin/ComprehensiveMarketingTools'

export const metadata: Metadata = {
  title: 'Marketing Tools | Alan Hirsch',
  description: 'Email campaigns, lead generation, automation workflows, and subscriber management',
}

export default function MarketingToolsPage() {
  return (
    <div className="container mx-auto py-8">
      <ComprehensiveMarketingTools />
    </div>
  )
}