'use client'

import { AIAgentManagement } from '@/components/admin/AIAgentManagement'

export default function AdminAIAgentsPage() {
  const handleTrainAgent = (agentId: string, content: string) => {
    console.log('Training agent:', { agentId, content })
  }

  const handleUpdatePersonality = (agentId: string, traits: any) => {
    console.log('Updating agent personality:', { agentId, traits })
  }

  const handleExportLogs = (agentId: string) => {
    console.log('Exporting conversation logs for agent:', agentId)
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              AI Agent Management
            </h1>
            <p className="text-card-foreground/70">
              Monitor and manage your AI agents
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <AIAgentManagement
          onTrainAgent={handleTrainAgent}
          onUpdatePersonality={handleUpdatePersonality}
          onExportLogs={handleExportLogs}
        />
      </div>
    </div>
  )
}
