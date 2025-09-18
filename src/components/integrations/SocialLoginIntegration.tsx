'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Shield, 
  User, 
  Mail, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Github,
  Chrome,
  Apple,
  Settings,
  Eye,
  EyeOff,
  ExternalLink,
  Lock,
  Unlock,
  Users,
  Activity
} from 'lucide-react'

interface SocialProvider {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  enabled: boolean
  connected: boolean
  clientId?: string
  clientSecret?: string
  scopes: string[]
  userCount: number
  conversionRate: number
}

interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  provider: string
  connectedAt: string
  lastLogin: string
  verified: boolean
  permissions: string[]
}

const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: Chrome,
    color: 'bg-red-500',
    enabled: true,
    connected: true,
    clientId: 'google-client-id-123',
    scopes: ['email', 'profile'],
    userCount: 1247,
    conversionRate: 12.3
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: User,
    color: 'bg-blue-600',
    enabled: true,
    connected: false,
    scopes: ['email', 'public_profile'],
    userCount: 0,
    conversionRate: 0
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: Apple,
    color: 'bg-gray-900',
    enabled: false,
    connected: false,
    scopes: ['name', 'email'],
    userCount: 0,
    conversionRate: 0
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    color: 'bg-gray-800',
    enabled: false,
    connected: false,
    scopes: ['user:email'],
    userCount: 0,
    conversionRate: 0
  }
]

const SAMPLE_USERS: AuthUser[] = [
  {
    id: 'user-1',
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    provider: 'google',
    connectedAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-24T14:22:00Z',
    verified: true,
    permissions: ['read', 'comment']
  },
  {
    id: 'user-2',
    email: 'michael.chen@example.com',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    provider: 'google',
    connectedAt: '2024-01-18T16:45:00Z',
    lastLogin: '2024-01-24T09:15:00Z',
    verified: true,
    permissions: ['read', 'comment', 'premium']
  },
  {
    id: 'user-3',
    email: 'emma.wilson@example.com',
    name: 'Emma Wilson',
    provider: 'google',
    connectedAt: '2024-01-20T11:20:00Z',
    lastLogin: '2024-01-23T18:30:00Z',
    verified: false,
    permissions: ['read']
  }
]

export default function SocialLoginIntegration() {
  const [providers, setProviders] = useState<SocialProvider[]>(SOCIAL_PROVIDERS)
  const [users, setUsers] = useState<AuthUser[]>(SAMPLE_USERS)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [settings, setSettings] = useState({
    autoVerifyEmail: true,
    requireEmailVerification: false,
    allowMultipleProviders: true,
    sessionTimeout: 30, // days
    enableTwoFactor: false,
    logSecurityEvents: true
  })

  const toggleProvider = async (providerId: string) => {
    setIsLoading(providerId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, connected: !provider.connected }
          : provider
      )
    )
    
    setIsLoading(null)
  }

  const toggleProviderEnabled = (providerId: string, enabled: boolean) => {
    setProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, enabled }
          : provider
      )
    )
  }

  const updateProviderConfig = (providerId: string, config: Partial<SocialProvider>) => {
    setProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, ...config }
          : provider
      )
    )
  }

  const toggleShowSecret = (providerId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getProviderStats = () => {
    const totalUsers = providers.reduce((sum, provider) => sum + provider.userCount, 0)
    const avgConversion = providers.filter(p => p.userCount > 0)
      .reduce((sum, provider) => sum + provider.conversionRate, 0) / 
      providers.filter(p => p.userCount > 0).length || 0
    
    return { totalUsers, avgConversion }
  }

  const stats = getProviderStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Social Login Integration</span>
          </CardTitle>
          <CardDescription>
            Configure OAuth providers for seamless user authentication
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Social Logins</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.avgConversion.toFixed(1)}%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Providers</p>
                <p className="text-2xl font-bold">
                  {providers.filter(p => p.enabled && p.connected).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">OAuth Providers</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="integration">Integration Code</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid gap-6">
            {providers.map((provider) => {
              const Icon = provider.icon
              
              return (
                <Card key={provider.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        
                        <div className="space-y-3 flex-1">
                          <div>
                            <h3 className="font-semibold text-lg">{provider.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {provider.connected ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-orange-600">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Not Connected
                                </Badge>
                              )}
                              
                              <Badge variant={provider.enabled ? 'default' : 'secondary'}>
                                {provider.enabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
                          </div>

                          {provider.userCount > 0 && (
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{provider.userCount.toLocaleString()} users</span>
                              <span>•</span>
                              <span>{provider.conversionRate}% conversion rate</span>
                            </div>
                          )}

                          <div className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium mb-1 block">Client ID</label>
                                <div className="relative">
                                  <Input
                                    type={showSecrets[provider.id] ? 'text' : 'password'}
                                    value={provider.clientId || ''}
                                    onChange={(e) => updateProviderConfig(provider.id, { clientId: e.target.value })}
                                    placeholder="Your client ID"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-8 w-8"
                                    onClick={() => toggleShowSecret(provider.id)}
                                  >
                                    {showSecrets[provider.id] ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-1 block">Client Secret</label>
                                <div className="relative">
                                  <Input
                                    type={showSecrets[provider.id] ? 'text' : 'password'}
                                    value={provider.clientSecret || ''}
                                    onChange={(e) => updateProviderConfig(provider.id, { clientSecret: e.target.value })}
                                    placeholder="Your client secret"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-8 w-8"
                                    onClick={() => toggleShowSecret(provider.id)}
                                  >
                                    {showSecrets[provider.id] ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-1 block">OAuth Scopes</label>
                              <div className="flex flex-wrap gap-2">
                                {provider.scopes.map((scope, index) => (
                                  <Badge key={index} variant="outline">
                                    {scope}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={provider.enabled}
                            onCheckedChange={(checked) => toggleProviderEnabled(provider.id, checked)}
                          />
                          <span className="text-sm">Enabled</span>
                        </div>
                        
                        <Button
                          onClick={() => toggleProvider(provider.id)}
                          disabled={isLoading === provider.id || !provider.enabled}
                          size="sm"
                          variant={provider.connected ? 'outline' : 'default'}
                        >
                          {isLoading === provider.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : provider.connected ? (
                            <Unlock className="h-4 w-4 mr-2" />
                          ) : (
                            <Lock className="h-4 w-4 mr-2" />
                          )}
                          {provider.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Developer Console
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Social Logins</CardTitle>
              <CardDescription>Users who signed up or logged in via social providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => {
                  const provider = providers.find(p => p.id === user.provider)
                  const ProviderIcon = provider?.icon || User
                  
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{user.name}</h4>
                            {user.verified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <ProviderIcon className="h-3 w-3" />
                              <span className="text-xs text-gray-500 capitalize">{user.provider}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              Last login: {formatDate(user.lastLogin)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security & Authentication Settings</CardTitle>
              <CardDescription>Configure security policies for social login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Auto-verify Email</label>
                      <p className="text-sm text-gray-600">Automatically verify emails from trusted providers</p>
                    </div>
                    <Switch
                      checked={settings.autoVerifyEmail}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, autoVerifyEmail: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Require Email Verification</label>
                      <p className="text-sm text-gray-600">Force users to verify email even with social login</p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, requireEmailVerification: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Allow Multiple Providers</label>
                      <p className="text-sm text-gray-600">Users can link multiple social accounts</p>
                    </div>
                    <Switch
                      checked={settings.allowMultipleProviders}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, allowMultipleProviders: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Enable Two-Factor Auth</label>
                      <p className="text-sm text-gray-600">Require 2FA for sensitive operations</p>
                    </div>
                    <Switch
                      checked={settings.enableTwoFactor}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, enableTwoFactor: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Log Security Events</label>
                      <p className="text-sm text-gray-600">Track login attempts and security events</p>
                    </div>
                    <Switch
                      checked={settings.logSecurityEvents}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, logSecurityEvents: checked }))
                      }
                    />
                  </div>

                  <div>
                    <label className="font-medium mb-2 block">Session Timeout (days)</label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => 
                        setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))
                      }
                      min="1"
                      max="365"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Code</CardTitle>
              <CardDescription>Add social login buttons to your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">React Component</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{`import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from './firebase'

export function SocialLoginButtons() {
  const [loading, setLoading] = useState('')

  const signInWithGoogle = async () => {
    setLoading('google')
    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign-in successful:', result.user)
    } catch (error) {
      console.error('Google sign-in error:', error)
    } finally {
      setLoading('')
    }
  }

  const signInWithFacebook = async () => {
    setLoading('facebook')
    try {
      const provider = new FacebookAuthProvider()
      provider.addScope('email')
      
      const result = await signInWithPopup(auth, provider)
      console.log('Facebook sign-in successful:', result.user)
    } catch (error) {
      console.error('Facebook sign-in error:', error)
    } finally {
      setLoading('')
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={signInWithGoogle}
        disabled={loading === 'google'}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {loading === 'google' ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        ) : (
          <>
            <GoogleIcon className="w-5 h-5 mr-3" />
            Continue with Google
          </>
        )}
      </button>

      <button
        onClick={signInWithFacebook}
        disabled={loading === 'facebook'}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
      >
        {loading === 'facebook' ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <>
            <FacebookIcon className="w-5 h-5 mr-3" />
            Continue with Facebook
          </>
        )}
      </button>
    </div>
  )
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-3">Environment Variables</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{`# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# OAuth Redirect URLs
OAUTH_REDIRECT_URL=https://yourdomain.com/auth/callback

# JWT Secret for session management
JWT_SECRET=your_jwt_secret_key

# Session configuration
SESSION_TIMEOUT=30d
REQUIRE_EMAIL_VERIFICATION=false
AUTO_VERIFY_SOCIAL_EMAIL=true`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-3">Next.js API Route</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{`// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email profile'
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Custom sign-in logic
      console.log('User signed in:', user.email, 'via', account.provider)
      return true
    },
    async session({ session, token }) {
      // Add custom session data
      session.provider = token.provider
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
})`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
