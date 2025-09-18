'use client'

import { AdminMemberManagement } from '@/components/admin/AdminMemberManagement'

export default function AdminMembersPage() {
  const handleSendEmail = (memberIds: string[], subject: string, content: string) => {
    console.log('Sending email to members:', { memberIds, subject, content })
  }

  const handleUpdateSubscription = (memberId: string, plan: string) => {
    console.log('Updating subscription:', { memberId, plan })
  }

  const handleExportMembers = () => {
    console.log('Exporting member data...')
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              Member Management
            </h1>
            <p className="text-card-foreground/70">
              Manage your community members and subscriptions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <AdminMemberManagement
          onSendEmail={handleSendEmail}
          onUpdateSubscription={handleUpdateSubscription}
          onExportMembers={handleExportMembers}
        />
      </div>
    </div>
  )
}
