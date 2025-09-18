'use client'

import { AnalyticsAgent } from '@/components/ai-agents/AnalyticsAgent'

export default function AdminAnalyticsPage() {
  const handleExportReport = () => {
    console.log('Exporting analytics report...')
  }

  const handleSetupTracking = () => {
    console.log('Setting up tracking...')
  }

  const handleCreateAlert = () => {
    console.log('Creating alert...')
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              Analytics Dashboard
            </h1>
            <p className="text-card-foreground/70">
              Monitor platform performance and user engagement
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <AnalyticsAgent
          onExportReport={handleExportReport}
          onSetupTracking={handleSetupTracking}
          onCreateAlert={handleCreateAlert}
        />
      </div>
    </div>
  )
}
