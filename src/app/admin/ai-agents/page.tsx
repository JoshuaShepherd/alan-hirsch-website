'use client'

import { EnhancedAIAgentManagement } from '@/components/admin/EnhancedAIAgentManagement'

export default function AdminAIAgentsPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              AI Agent Management
            </h1>
            <p className="text-card-foreground/70">
              Configure and monitor your AI agents for APEST assessment and missional guidance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <EnhancedAIAgentManagement />
      </div>
    </div>
  )
}