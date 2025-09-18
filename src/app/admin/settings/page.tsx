'use client'

import { AdminSettings } from '@/components/admin/AdminSettings'

export default function AdminSettingsPage() {
  const handleSaveSetting = (key: string, value: any) => {
    console.log('Saving setting:', { key, value })
  }

  const handleBulkSave = (settings: Record<string, any>) => {
    console.log('Saving bulk settings:', settings)
  }

  const handleBackupData = () => {
    console.log('Creating backup...')
  }

  const handleRestoreData = (file: File) => {
    console.log('Restoring from backup:', file.name)
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="bg-card border-b border-border">
        <div className="max-w-container mx-auto px-6 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-1">
              Platform Settings
            </h1>
            <p className="text-card-foreground/70">
              Configure your platform preferences and integrations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        <AdminSettings
          onSaveSetting={handleSaveSetting}
          onBulkSave={handleBulkSave}
          onBackupData={handleBackupData}
          onRestoreData={handleRestoreData}
        />
      </div>
    </div>
  )
}
