'use client'

import { useState } from 'react'
import { 
  Settings, Shield, Bell, Mail, Palette, Database,
  Globe, Key, CreditCard, Upload, Download, RefreshCw,
  Save, AlertCircle, CheckCircle, Info, Eye, EyeOff,
  Smartphone, Monitor, Cloud, Server, Lock, Users,
  BarChart3, MessageSquare, Search, Filter, Calendar,
  FileText, Image, Video, Headphones, Link, Code
} from 'lucide-react'

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: any
}

interface PlatformSetting {
  key: string
  label: string
  description?: string
  type: 'text' | 'email' | 'number' | 'boolean' | 'select' | 'textarea' | 'password'
  value: any
  options?: { label: string; value: string }[]
  category: string
}

interface AdminSettingsProps {
  onSaveSetting?: (key: string, value: any) => void
  onBulkSave?: (settings: Record<string, any>) => void
  onBackupData?: () => void
  onRestoreData?: (file: File) => void
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Basic platform configuration and branding',
    icon: Settings
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'User access and security settings',
    icon: Shield
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Email and push notification settings',
    icon: Bell
  },
  {
    id: 'content',
    title: 'Content',
    description: 'Content management and publishing settings',
    icon: FileText
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Third-party services and API configurations',
    icon: Link
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Developer and advanced platform settings',
    icon: Code
  }
]

const PLATFORM_SETTINGS: PlatformSetting[] = [
  // General Settings
  {
    key: 'site_title',
    label: 'Site Title',
    description: 'The main title of your platform',
    type: 'text',
    value: 'Alan Hirsch - Missional Leadership Platform',
    category: 'general'
  },
  {
    key: 'site_description',
    label: 'Site Description',
    description: 'Brief description for SEO and social sharing',
    type: 'textarea',
    value: 'A comprehensive platform for missional church renewal, featuring AI-powered learning, interactive content, and community-driven transformation.',
    category: 'general'
  },
  {
    key: 'contact_email',
    label: 'Contact Email',
    description: 'Primary contact email for the platform',
    type: 'email',
    value: 'hello@alanhirsch.org',
    category: 'general'
  },
  {
    key: 'maintenance_mode',
    label: 'Maintenance Mode',
    description: 'Put the site in maintenance mode for updates',
    type: 'boolean',
    value: false,
    category: 'general'
  },

  // Authentication Settings
  {
    key: 'allow_registration',
    label: 'Allow New Registrations',
    description: 'Allow new users to create accounts',
    type: 'boolean',
    value: true,
    category: 'authentication'
  },
  {
    key: 'require_email_verification',
    label: 'Require Email Verification',
    description: 'Users must verify email before accessing content',
    type: 'boolean',
    value: true,
    category: 'authentication'
  },
  {
    key: 'session_timeout',
    label: 'Session Timeout (hours)',
    description: 'How long before inactive users are logged out',
    type: 'number',
    value: 24,
    category: 'authentication'
  },
  {
    key: 'password_min_length',
    label: 'Minimum Password Length',
    type: 'number',
    value: 8,
    category: 'authentication'
  },

  // Notification Settings
  {
    key: 'email_notifications',
    label: 'Email Notifications Enabled',
    type: 'boolean',
    value: true,
    category: 'notifications'
  },
  {
    key: 'welcome_email',
    label: 'Send Welcome Email',
    description: 'Send welcome email to new members',
    type: 'boolean',
    value: true,
    category: 'notifications'
  },
  {
    key: 'newsletter_frequency',
    label: 'Newsletter Frequency',
    type: 'select',
    value: 'weekly',
    options: [
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'Disabled', value: 'disabled' }
    ],
    category: 'notifications'
  },

  // Content Settings
  {
    key: 'allow_comments',
    label: 'Allow Comments',
    description: 'Enable comments on articles and content',
    type: 'boolean',
    value: true,
    category: 'content'
  },
  {
    key: 'content_approval',
    label: 'Content Requires Approval',
    description: 'All content must be approved before publishing',
    type: 'boolean',
    value: false,
    category: 'content'
  },
  {
    key: 'max_upload_size',
    label: 'Max Upload Size (MB)',
    type: 'number',
    value: 10,
    category: 'content'
  },

  // Integration Settings
  {
    key: 'analytics_enabled',
    label: 'Analytics Enabled',
    type: 'boolean',
    value: true,
    category: 'integrations'
  },
  {
    key: 'stripe_publishable_key',
    label: 'Stripe Publishable Key',
    type: 'text',
    value: 'pk_test_...',
    category: 'integrations'
  },
  {
    key: 'stripe_secret_key',
    label: 'Stripe Secret Key',
    type: 'password',
    value: 'sk_test_...',
    category: 'integrations'
  },

  // Advanced Settings
  {
    key: 'debug_mode',
    label: 'Debug Mode',
    description: 'Enable detailed error logging',
    type: 'boolean',
    value: false,
    category: 'advanced'
  },
  {
    key: 'cache_enabled',
    label: 'Cache Enabled',
    description: 'Enable content caching for performance',
    type: 'boolean',
    value: true,
    category: 'advanced'
  },
  {
    key: 'api_rate_limit',
    label: 'API Rate Limit (per minute)',
    type: 'number',
    value: 100,
    category: 'advanced'
  }
]

export function AdminSettings({ 
  onSaveSetting, 
  onBulkSave, 
  onBackupData, 
  onRestoreData 
}: AdminSettingsProps) {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState<Record<string, any>>(
    Object.fromEntries(PLATFORM_SETTINGS.map(s => [s.key, s.value]))
  )
  const [hasChanges, setHasChanges] = useState(false)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    onBulkSave?.(settings)
    setHasChanges(false)
  }

  const renderSettingInput = (setting: PlatformSetting) => {
    const value = settings[setting.key]

    switch (setting.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={setting.type}
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            placeholder={setting.label}
          />
        )

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword[setting.key] ? 'text' : 'password'}
              value={value || ''}
              onChange={(e) => updateSetting(setting.key, e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background"
              placeholder={setting.label}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword[setting.key] ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        )

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            placeholder={setting.label}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background resize-vertical"
            placeholder={setting.label}
          />
        )

      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateSetting(setting.key, e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  const currentSettings = PLATFORM_SETTINGS.filter(s => s.category === activeSection)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Platform Settings</h2>
          <p className="text-muted-foreground mt-1">Configure your platform preferences and integrations</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBackupData}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Backup
          </button>
          {hasChanges && (
            <button 
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-800">You have unsaved changes</p>
            <p className="text-xs text-yellow-700">Make sure to save your changes before leaving this page.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          {SETTINGS_SECTIONS.map(section => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs opacity-80">{section.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-6">
              {SETTINGS_SECTIONS.find(s => s.id === activeSection)?.title} Settings
            </h3>

            <div className="space-y-6">
              {currentSettings.map(setting => (
                <div key={setting.key} className="space-y-2">
                  <label className="block">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{setting.label}</span>
                      {setting.description && (
                        <div className="group relative">
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          <div className="absolute left-0 top-6 bg-popover border border-border rounded-lg p-3 text-sm text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10 w-64 shadow-lg">
                            {setting.description}
                          </div>
                        </div>
                      )}
                    </div>
                    {renderSettingInput(setting)}
                  </label>
                </div>
              ))}
            </div>

            {/* Section-specific Actions */}
            {activeSection === 'general' && (
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">Site Maintenance</h4>
                <div className="flex gap-3">
                  <button className="btn-outline flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Clear Cache
                  </button>
                  <button className="btn-outline flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Optimize Database
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">Integration Status</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Stripe Payments', status: 'connected', color: 'text-green-500' },
                    { name: 'Email Service', status: 'connected', color: 'text-green-500' },
                    { name: 'Analytics', status: 'connected', color: 'text-green-500' },
                    { name: 'Cloud Storage', status: 'disconnected', color: 'text-red-500' }
                  ].map(integration => (
                    <div key={integration.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium text-foreground">{integration.name}</span>
                      <span className={`text-sm ${integration.color}`}>
                        {integration.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'advanced' && (
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">Developer Tools</h4>
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-2">API Keys</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Public API Key</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded">pk_live_...</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Webhook Endpoint</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded">/api/webhooks</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="btn-outline flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Generate New API Key
                    </button>
                    <button className="btn-outline flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      View API Docs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
