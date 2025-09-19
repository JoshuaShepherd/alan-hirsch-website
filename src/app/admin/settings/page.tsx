'use client'

import { ComprehensiveSiteSettings } from '@/components/admin/ComprehensiveSiteSettings'

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              Site Settings
            </h1>
            <p className="text-card-foreground/70">
              Comprehensive site configuration with theme customization, security controls, integrations, and performance optimization
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <ComprehensiveSiteSettings />
      </div>
    </div>
  )
}
