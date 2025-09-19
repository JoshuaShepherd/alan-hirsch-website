'use client'

import { useState, useEffect } from 'react'
import { 
  Settings, Palette, Shield, Database, Mail, 
  Globe, Key, Bell, Download, Upload, Save,
  RefreshCw, Eye, EyeOff, AlertTriangle, 
  CheckCircle, Copy, ExternalLink, Code,
  Server, Lock, Cloud, Monitor, Smartphone,
  FileText, HelpCircle, User, CreditCard
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface SiteSettings {
  general: {
    siteName: string
    tagline: string
    description: string
    adminEmail: string
    timezone: string
    language: string
    currency: string
  }
  theme: {
    primaryColor: string
    accentColor: string
    darkMode: boolean
    fontFamily: string
    layout: 'compact' | 'comfortable' | 'spacious'
    customCSS: string
  }
  security: {
    enableTwoFactor: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    enableCaptcha: boolean
    allowedDomains: string[]
    ipWhitelist: string[]
  }
  integrations: {
    googleAnalytics: string
    facebookPixel: string
    mailchimp: string
    stripe: string
    openai: string
    supabase: string
  }
  email: {
    provider: 'smtp' | 'sendgrid' | 'mailgun'
    fromEmail: string
    fromName: string
    replyTo: string
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    digestFrequency: 'daily' | 'weekly' | 'monthly'
    adminAlerts: boolean
    userAlerts: boolean
  }
  backup: {
    autoBackup: boolean
    backupFrequency: 'daily' | 'weekly' | 'monthly'
    retentionDays: number
    backupLocation: 'local' | 'cloud'
    lastBackup: string
  }
  performance: {
    cacheEnabled: boolean
    compressionEnabled: boolean
    cdnEnabled: boolean
    imageOptimization: boolean
    lazyLoading: boolean
    minifyAssets: boolean
  }
}

const DEFAULT_SETTINGS: SiteSettings = {
  general: {
    siteName: 'Alan Hirsch',
    tagline: 'Missional Church Renewal',
    description: 'Empowering leaders to transform communities through missional church principles',
    adminEmail: 'admin@alanhirsch.com',
    timezone: 'America/Los_Angeles',
    language: 'en',
    currency: 'USD'
  },
  theme: {
    primaryColor: '#1D4A38',
    accentColor: '#B2613E',
    darkMode: false,
    fontFamily: 'Inter',
    layout: 'comfortable',
    customCSS: ''
  },
  security: {
    enableTwoFactor: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableCaptcha: true,
    allowedDomains: ['alanhirsch.com'],
    ipWhitelist: []
  },
  integrations: {
    googleAnalytics: '',
    facebookPixel: '',
    mailchimp: '',
    stripe: '',
    openai: '',
    supabase: ''
  },
  email: {
    provider: 'smtp',
    fromEmail: 'noreply@alanhirsch.com',
    fromName: 'Alan Hirsch',
    replyTo: 'support@alanhirsch.com',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: ''
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    digestFrequency: 'weekly',
    adminAlerts: true,
    userAlerts: true
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    backupLocation: 'cloud',
    lastBackup: '2024-01-20T10:30:00Z'
  },
  performance: {
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: true,
    imageOptimization: true,
    lazyLoading: true,
    minifyAssets: true
  }
}

export function ComprehensiveSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackup = async () => {
    setLoading(true)
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSettings(prev => ({
        ...prev,
        backup: {
          ...prev.backup,
          lastBackup: new Date().toISOString()
        }
      }))
    } catch (error) {
      console.error('Backup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    setLoading(true)
    try {
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Test email sent successfully')
    } catch (error) {
      console.error('Email test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Site Settings</h2>
          <p className="text-muted-foreground">
            Configure your website settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Settings saved</span>
            </div>
          )}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Basic information about your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.general.tagline}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, tagline: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.general.description}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, description: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, adminEmail: e.target.value }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localization</CardTitle>
                <CardDescription>Regional and language settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, language: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.general.currency}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, currency: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Colors & Appearance</CardTitle>
                <CardDescription>Customize your site's visual appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.theme.primaryColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        theme: { ...prev.theme, primaryColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.theme.primaryColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        theme: { ...prev.theme, primaryColor: e.target.value }
                      }))}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.theme.accentColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        theme: { ...prev.theme, accentColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.theme.accentColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        theme: { ...prev.theme, accentColor: e.target.value }
                      }))}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={settings.theme.darkMode}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      theme: { ...prev.theme, darkMode: checked }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select
                    value={settings.theme.fontFamily}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      theme: { ...prev.theme, fontFamily: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Crimson Pro">Crimson Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="layout">Layout Density</Label>
                  <Select
                    value={settings.theme.layout}
                    onValueChange={(value: 'compact' | 'comfortable' | 'spacious') => setSettings(prev => ({
                      ...prev,
                      theme: { ...prev.theme, layout: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom CSS</CardTitle>
                <CardDescription>Add custom styling to your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS Code</Label>
                  <Textarea
                    id="customCSS"
                    value={settings.theme.customCSS}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      theme: { ...prev.theme, customCSS: e.target.value }
                    }))}
                    className="font-mono text-sm"
                    rows={15}
                    placeholder="/* Add your custom CSS here */"
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-muted-foreground">
                    Custom CSS will override default styles. Use with caution.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Security settings for user authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTwoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="enableTwoFactor"
                    checked={settings.security.enableTwoFactor}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, enableTwoFactor: checked }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                    <p className="text-sm text-muted-foreground">Protect against bots</p>
                  </div>
                  <Switch
                    id="enableCaptcha"
                    checked={settings.security.enableCaptcha}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, enableCaptcha: checked }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Domain and IP restrictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allowedDomains">Allowed Email Domains</Label>
                  <Textarea
                    id="allowedDomains"
                    value={settings.security.allowedDomains.join('\n')}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { 
                        ...prev.security, 
                        allowedDomains: e.target.value.split('\n').filter(d => d.trim()) 
                      }
                    }))}
                    placeholder="example.com\ncompany.org"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    One domain per line. Leave empty to allow all domains.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                  <Textarea
                    id="ipWhitelist"
                    value={settings.security.ipWhitelist.join('\n')}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { 
                        ...prev.security, 
                        ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) 
                      }
                    }))}
                    placeholder="192.168.1.1\n10.0.0.0/24"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    One IP or CIDR block per line. Leave empty to allow all IPs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Tracking</CardTitle>
                <CardDescription>Third-party analytics integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="googleAnalytics"
                      value={settings.integrations.googleAnalytics}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, googleAnalytics: e.target.value }
                      }))}
                      placeholder="G-XXXXXXXXXX"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(settings.integrations.googleAnalytics)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="facebookPixel"
                      value={settings.integrations.facebookPixel}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, facebookPixel: e.target.value }
                      }))}
                      placeholder="123456789012345"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(settings.integrations.facebookPixel)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services & APIs</CardTitle>
                <CardDescription>API keys for external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="openai"
                      type={showPasswords ? "text" : "password"}
                      value={settings.integrations.openai}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, openai: e.target.value }
                      }))}
                      placeholder="sk-..."
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripe">Stripe API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="stripe"
                      type={showPasswords ? "text" : "password"}
                      value={settings.integrations.stripe}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, stripe: e.target.value }
                      }))}
                      placeholder="sk_live_..."
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mailchimp">Mailchimp API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="mailchimp"
                      type={showPasswords ? "text" : "password"}
                      value={settings.integrations.mailchimp}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, mailchimp: e.target.value }
                      }))}
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Setup email sending preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Email Provider</Label>
                  <Select
                    value={settings.email.provider}
                    onValueChange={(value: 'smtp' | 'sendgrid' | 'mailgun') => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, provider: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, fromEmail: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, fromName: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply-To Email</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    value={settings.email.replyTo}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, replyTo: e.target.value }
                    }))}
                  />
                </div>
                
                <Button onClick={handleTestEmail} disabled={loading}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </CardContent>
            </Card>

            {settings.email.provider === 'smtp' && (
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Settings</CardTitle>
                  <CardDescription>Configure SMTP server details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.email.smtpHost}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpHost: e.target.value }
                      }))}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.email.smtpPort}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpPort: parseInt(e.target.value) }
                      }))}
                      placeholder="587"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input
                      id="smtpUser"
                      value={settings.email.smtpUser}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpUser: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpPassword: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailNotifications: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Text message alerts</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, smsNotifications: checked }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Frequency</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="digestFrequency">Digest Frequency</Label>
                    <Select
                      value={settings.notifications.digestFrequency}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, digestFrequency: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Alert Types</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="adminAlerts">Admin Alerts</Label>
                      <p className="text-sm text-muted-foreground">System and security alerts</p>
                    </div>
                    <Switch
                      id="adminAlerts"
                      checked={settings.notifications.adminAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, adminAlerts: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="userAlerts">User Activity Alerts</Label>
                      <p className="text-sm text-muted-foreground">New registrations, comments</p>
                    </div>
                    <Switch
                      id="userAlerts"
                      checked={settings.notifications.userAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, userAlerts: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Configuration</CardTitle>
                <CardDescription>Automated backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Enable scheduled backups</p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.backup.autoBackup}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, autoBackup: checked }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backup.backupFrequency}
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupFrequency: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">Retention Period (days)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    value={settings.backup.retentionDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, retentionDays: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupLocation">Backup Location</Label>
                  <Select
                    value={settings.backup.backupLocation}
                    onValueChange={(value: 'local' | 'cloud') => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupLocation: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
                <CardDescription>Current backup information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Last Backup</span>
                  <span className="font-medium">
                    {new Date(settings.backup.lastBackup).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button onClick={handleBackup} disabled={loading} className="w-full">
                    {loading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Database className="h-4 w-4 mr-2" />
                    )}
                    Create Backup Now
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Latest Backup
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization</CardTitle>
                <CardDescription>Settings to improve site speed and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cacheEnabled">Enable Caching</Label>
                    <p className="text-sm text-muted-foreground">Cache pages for faster loading</p>
                  </div>
                  <Switch
                    id="cacheEnabled"
                    checked={settings.performance.cacheEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, cacheEnabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compressionEnabled">Gzip Compression</Label>
                    <p className="text-sm text-muted-foreground">Compress assets for faster delivery</p>
                  </div>
                  <Switch
                    id="compressionEnabled"
                    checked={settings.performance.compressionEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, compressionEnabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cdnEnabled">CDN</Label>
                    <p className="text-sm text-muted-foreground">Use content delivery network</p>
                  </div>
                  <Switch
                    id="cdnEnabled"
                    checked={settings.performance.cdnEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, cdnEnabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="imageOptimization">Image Optimization</Label>
                    <p className="text-sm text-muted-foreground">Automatically optimize images</p>
                  </div>
                  <Switch
                    id="imageOptimization"
                    checked={settings.performance.imageOptimization}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, imageOptimization: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lazyLoading">Lazy Loading</Label>
                    <p className="text-sm text-muted-foreground">Load images as needed</p>
                  </div>
                  <Switch
                    id="lazyLoading"
                    checked={settings.performance.lazyLoading}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, lazyLoading: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="minifyAssets">Minify Assets</Label>
                    <p className="text-sm text-muted-foreground">Compress CSS and JavaScript</p>
                  </div>
                  <Switch
                    id="minifyAssets"
                    checked={settings.performance.minifyAssets}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, minifyAssets: checked }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Current site performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Page Speed Score</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">92/100</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">First Contentful Paint</span>
                    <span className="text-sm font-medium">1.2s</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time to Interactive</span>
                    <span className="text-sm font-medium">2.1s</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Largest Contentful Paint</span>
                    <span className="text-sm font-medium">1.8s</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cumulative Layout Shift</span>
                    <span className="text-sm font-medium">0.05</span>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  <Monitor className="h-4 w-4 mr-2" />
                  Run Performance Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}