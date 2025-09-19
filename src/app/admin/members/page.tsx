'use client'

import { ComprehensiveMemberManagement } from '@/components/admin/ComprehensiveMemberManagement'

export default function AdminMembersPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              Member Management
            </h1>
            <p className="text-card-foreground/70">
              Comprehensive member management with roles, permissions, subscriptions, and analytics
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <ComprehensiveMemberManagement />
      </div>
    </div>
  )
}
