'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Share2, 
  Copy, 
  ExternalLink, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Mail, 
  MessageCircle, 
  Instagram,
  Youtube,
  TrendingUp,
  BarChart3,
  Eye,
  MousePointer,
  Users,
  Calendar,
  Settings
} from 'lucide-react'

interface SocialShare {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'email' | 'whatsapp' | 'instagram' | ''
  url: string
  title: string
  description?: string
  image?: string
  hashtags?: string[]
  via?: string
}

interface ShareButton {
  id: string
  platform: string
  label: string
  icon: React.ComponentType<any>
  color: string
  hoverColor: string
  shareUrl: (share: SocialShare) => string
  enabled: boolean
}

interface ShareAnalytics {
  platform: string
  clicks: number
  shares: number
  engagement_rate: number
  top_content: Array<{
    title: string
    url: string
    shares: number
    clicks: number
  }>
}

const SHARE_BUTTONS: ShareButton[] = [
  {
    id: 'facebook',
    platform: 'Facebook',
    label: 'Share on Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    shareUrl: (share) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share.url)}&quote=${encodeURIComponent(share.title)}`,
    enabled: true
  },
  {
    id: 'twitter',
    platform: 'Twitter',
    label: 'Share on Twitter',
    icon: Twitter,
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
    shareUrl: (share) => {
      const text = share.hashtags ? 
        `${share.title} ${share.hashtags.map(tag => `#${tag}`).join(' ')}` : 
        share.title
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(share.url)}&text=${encodeURIComponent(text)}${share.via ? `&via=${share.via}` : ''}`
    },
    enabled: true
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    label: 'Share on LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    shareUrl: (share) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(share.url)}`,
    enabled: true
  },
  {
    id: 'email',
    platform: 'Email',
    label: 'Share via Email',
    icon: Mail,
    color: 'bg-gray-600',
    hoverColor: 'hover:bg-gray-700',
    shareUrl: (share) => `mailto:?subject=${encodeURIComponent(share.title)}&body=${encodeURIComponent(`${share.description || ''}\n\n${share.url}`)}`,
    enabled: true
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp',
    label: 'Share on WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    shareUrl: (share) => `https://wa.me/?text=${encodeURIComponent(`${share.title}\n${share.url}`)}`,
    enabled: true
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    label: 'Share on Instagram',
    icon: Instagram,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    shareUrl: (share) => share.url, // Instagram doesn't support direct URL sharing
    enabled: false
  }
]

const SAMPLE_ANALYTICS: ShareAnalytics[] = [
  {
    platform: 'Facebook',
    clicks: 1247,
    shares: 89,
    engagement_rate: 7.1,
    top_content: [
      {
        title: 'The Future of Missional Leadership',
        url: '/articles/future-missional-leadership',
        shares: 23,
        clicks: 456
      },
      {
        title: '5Q Framework Explained',
        url: '/articles/5q-framework-explained',
        shares: 18,
        clicks: 342
      }
    ]
  },
  {
    platform: 'Twitter',
    clicks: 2134,
    shares: 156,
    engagement_rate: 7.3,
    top_content: [
      {
        title: 'Church Planting in Post-Christian Context',
        url: '/articles/church-planting-post-christian',
        shares: 34,
        clicks: 567
      },
      {
        title: 'Leadership Development Workshop',
        url: '/workshops/leadership-development',
        shares: 28,
        clicks: 489
      }
    ]
  },
  {
    platform: 'LinkedIn',
    clicks: 987,
    shares: 67,
    engagement_rate: 6.8,
    top_content: [
      {
        title: 'Building Apostolic Organizations',
        url: '/articles/building-apostolic-organizations',
        shares: 19,
        clicks: 298
      },
      {
        title: 'Movement Multiplication Strategies',
        url: '/resources/movement-multiplication',
        shares: 15,
        clicks: 234
      }
    ]
  }
]

export default function SocialSharingIntegration() {
  const [shareData, setShareData] = useState<SocialShare>({
    platform: '',
    url: 'https://alanhirsch.com/articles/sample-article',
    title: 'The Future of Missional Leadership',
    description: 'Exploring new paradigms for church leadership in a rapidly changing world.',
    hashtags: ['MissionalLeadership', 'ChurchPlanting', '5Q'],
    via: 'alanhirsch'
  })
  
  const [analytics, setAnalytics] = useState<ShareAnalytics[]>(SAMPLE_ANALYTICS)
  const [shareButtons, setShareButtons] = useState<ShareButton[]>(SHARE_BUTTONS)
  const [customization, setCustomization] = useState({
    style: 'buttons', // 'buttons', 'icons', 'minimal'
    size: 'medium', // 'small', 'medium', 'large'
    alignment: 'left', // 'left', 'center', 'right'
    showLabels: true,
    showCounts: false,
    borderRadius: 'rounded', // 'none', 'rounded', 'full'
    animation: 'hover' // 'none', 'hover', 'pulse'
  })

  const handleShare = (button: ShareButton) => {
    const shareUrl = button.shareUrl(shareData)
    
    if (button.id === 'email') {
      window.location.href = shareUrl
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    
    // Track share event
    trackShareEvent(button.platform, shareData.url)
  }

  const trackShareEvent = (platform: string, url: string) => {
    // Simulate analytics tracking
    console.log(`Share tracked: ${platform} - ${url}`)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show success feedback
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const generateShareCode = (style: string) => {
    const baseClass = `social-share-${style}`
    const sizeClass = `share-${customization.size}`
    const alignmentClass = `share-${customization.alignment}`
    
    return `<div class="${baseClass} ${sizeClass} ${alignmentClass}">
  ${shareButtons.filter(btn => btn.enabled).map(btn => 
    `<button class="share-btn share-${btn.id}" onclick="shareContent('${btn.id}')">
    ${customization.showLabels ? btn.label : btn.platform}
  </button>`
  ).join('\n  ')}
</div>`
  }

  return (
    <div className="space-y-6">
      {/* Share Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Social Sharing Integration</span>
          </CardTitle>
          <CardDescription>
            Configure social sharing buttons and track engagement across platforms
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="buttons" className="space-y-6">
        <TabsList>
          <TabsTrigger value="buttons">Share Buttons</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="code">Embed Code</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-6">
          {/* Sample Content */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Content</CardTitle>
              <CardDescription>Configure the content to be shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">URL</label>
                  <Input
                    value={shareData.url}
                    onChange={(e) => setShareData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://alanhirsch.com/..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    value={shareData.title}
                    onChange={(e) => setShareData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article or content title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input
                    value={shareData.description}
                    onChange={(e) => setShareData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the content"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Hashtags (comma-separated)</label>
                  <Input
                    value={shareData.hashtags?.join(', ')}
                    onChange={(e) => setShareData(prev => ({ 
                      ...prev, 
                      hashtags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) 
                    }))}
                    placeholder="MissionalLeadership, ChurchPlanting, 5Q"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Twitter Via</label>
                  <Input
                    value={shareData.via}
                    onChange={(e) => setShareData(prev => ({ ...prev, via: e.target.value }))}
                    placeholder="alanhirsch"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Buttons Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Share Buttons Preview</CardTitle>
              <CardDescription>How the buttons will appear on your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {shareButtons.filter(btn => btn.enabled).map((button) => {
                    const Icon = button.icon
                    return (
                      <Button
                        key={button.id}
                        onClick={() => handleShare(button)}
                        className={`${button.color} ${button.hoverColor} text-white`}
                        size={customization.size === 'small' ? 'sm' : customization.size === 'large' ? 'lg' : 'default'}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {customization.showLabels ? button.label : button.platform}
                      </Button>
                    )
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(shareData.url)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Platform Configuration</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shareButtons.map((button) => (
                      <div key={button.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-2">
                          <button.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{button.platform}</span>
                        </div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={button.enabled}
                            onChange={(e) => {
                              setShareButtons(prev => 
                                prev.map(btn => 
                                  btn.id === button.id 
                                    ? { ...btn, enabled: e.target.checked }
                                    : btn
                                )
                              )
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">Enabled</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Customization</CardTitle>
              <CardDescription>Customize how share buttons appear on your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Button Style</label>
                    <Select 
                      value={customization.style} 
                      onValueChange={(value) => setCustomization(prev => ({ ...prev, style: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buttons">Full Buttons</SelectItem>
                        <SelectItem value="icons">Icons Only</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Size</label>
                    <Select 
                      value={customization.size} 
                      onValueChange={(value) => setCustomization(prev => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Alignment</label>
                    <Select 
                      value={customization.alignment} 
                      onValueChange={(value) => setCustomization(prev => ({ ...prev, alignment: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Labels</label>
                    <input
                      type="checkbox"
                      checked={customization.showLabels}
                      onChange={(e) => setCustomization(prev => ({ ...prev, showLabels: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Share Counts</label>
                    <input
                      type="checkbox"
                      checked={customization.showCounts}
                      onChange={(e) => setCustomization(prev => ({ ...prev, showCounts: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Border Radius</label>
                    <Select 
                      value={customization.borderRadius} 
                      onValueChange={(value) => setCustomization(prev => ({ ...prev, borderRadius: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="full">Fully Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Animation</label>
                    <Select 
                      value={customization.animation} 
                      onValueChange={(value) => setCustomization(prev => ({ ...prev, animation: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="hover">Hover Effects</SelectItem>
                        <SelectItem value="pulse">Pulse Animation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Live Preview</h4>
                <div className={`flex gap-2 ${
                  customization.alignment === 'center' ? 'justify-center' :
                  customization.alignment === 'right' ? 'justify-end' :
                  'justify-start'
                }`}>
                  {shareButtons.filter(btn => btn.enabled).slice(0, 3).map((button) => {
                    const Icon = button.icon
                    return (
                      <motion.button
                        key={button.id}
                        className={`${button.color} text-white px-3 py-2 text-sm ${
                          customization.borderRadius === 'full' ? 'rounded-full' :
                          customization.borderRadius === 'rounded' ? 'rounded' :
                          'rounded-none'
                        } ${
                          customization.size === 'small' ? 'px-2 py-1 text-xs' :
                          customization.size === 'large' ? 'px-4 py-3 text-base' :
                          'px-3 py-2 text-sm'
                        }`}
                        whileHover={customization.animation === 'hover' ? { scale: 1.05 } : {}}
                        animate={customization.animation === 'pulse' ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.2, repeat: customization.animation === 'pulse' ? Infinity : 0 }}
                      >
                        <Icon className="h-4 w-4 inline mr-1" />
                        {customization.showLabels && button.platform}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Shares</p>
                    <p className="text-2xl font-bold">
                      {analytics.reduce((sum, platform) => sum + platform.shares, 0)}
                    </p>
                  </div>
                  <Share2 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold">
                      {analytics.reduce((sum, platform) => sum + platform.clicks, 0)}
                    </p>
                  </div>
                  <MousePointer className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Engagement</p>
                    <p className="text-2xl font-bold">
                      {(analytics.reduce((sum, platform) => sum + platform.engagement_rate, 0) / analytics.length).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Shares and clicks by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.map((platform) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{platform.platform}</span>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{platform.shares} shares</span>
                          <span>{platform.clicks} clicks</span>
                          <span>{platform.engagement_rate}% engagement</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(platform.engagement_rate / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Shared Content</CardTitle>
                <CardDescription>Most popular content across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.flatMap(platform => 
                    platform.top_content.map(content => ({ 
                      ...content, 
                      platform: platform.platform 
                    }))
                  )
                  .sort((a, b) => b.shares - a.shares)
                  .slice(0, 5)
                  .map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{content.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{content.platform}</p>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-3 w-3" />
                          <span>{content.shares}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{content.clicks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>Copy this code to add share buttons to your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">HTML Code</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generateShareCode(customization.style))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{generateShareCode(customization.style)}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">CSS Styles</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{`.social-share-${customization.style} {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: ${customization.alignment};
}

.share-btn {
  padding: ${customization.size === 'small' ? '4px 8px' : customization.size === 'large' ? '12px 16px' : '8px 12px'};
  border: none;
  border-radius: ${customization.borderRadius === 'full' ? '50px' : customization.borderRadius === 'rounded' ? '4px' : '0'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  transform: ${customization.animation === 'hover' ? 'scale(1.05)' : 'none'};
}

.share-facebook { background-color: #1877f2; }
.share-twitter { background-color: #1da1f2; }
.share-linkedin { background-color: #0077b5; }
.share-email { background-color: #6b7280; }
.share-whatsapp { background-color: #25d366; }`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">JavaScript Functions</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>{`function shareContent(platform) {
  const url = window.location.href;
  const title = document.title;
  
  const shareUrls = {
    facebook: \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(url)}\`,
    twitter: \`https://twitter.com/intent/tweet?url=\${encodeURIComponent(url)}&text=\${encodeURIComponent(title)}\`,
    linkedin: \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`,
    email: \`mailto:?subject=\${encodeURIComponent(title)}&body=\${encodeURIComponent(url)}\`,
    whatsapp: \`https://wa.me/?text=\${encodeURIComponent(title + ' ' + url)}\`
  };
  
  if (platform === 'email') {
    window.location.href = shareUrls[platform];
  } else {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
  
  // Track share event
  gtag('event', 'share', {
    method: platform,
    content_type: 'article',
    item_id: url
  });
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
