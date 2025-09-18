'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Layout, 
  Type, 
  Image, 
  Link, 
  Palette, 
  Eye, 
  Code,
  Save, 
  Send,
  Plus,
  Trash2,
  Copy,
  Smartphone,
  Monitor,
  ChevronUp,
  ChevronDown,
  Sparkles
} from 'lucide-react'

interface EmailBlock {
  id: string
  type: 'text' | 'image' | 'button' | 'divider' | 'social' | 'spacer'
  content: any
  styles: any
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  preheader: string
  blocks: EmailBlock[]
  globalStyles: {
    backgroundColor: string
    fontFamily: string
    primaryColor: string
    secondaryColor: string
  }
}

const TEMPLATE_PRESETS: Record<string, Omit<EmailTemplate, 'id' | 'globalStyles'>> = {
  welcome: {
    name: 'Welcome Series Email',
    subject: 'Welcome to the Movement, {firstName}!',
    preheader: 'Your journey in missional leadership begins now...',
    blocks: [
      {
        id: '1',
        type: 'text' as const,
        content: { 
          text: 'Welcome to our community of missional leaders!',
          tag: 'h1'
        },
        styles: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }
      },
      {
        id: '2', 
        type: 'text' as const,
        content: { 
          text: 'Hi {firstName},\n\nI\'m thrilled you\'ve joined our community of leaders who are passionate about transformation. Over the next few days, I\'ll be sharing some of my most valuable insights on missional leadership.',
          tag: 'p'
        },
        styles: { fontSize: '16px', lineHeight: '1.6' }
      },
      {
        id: '3',
        type: 'button' as const,
        content: { 
          text: 'Get Your Welcome Gift',
          url: 'https://alanhirsch.com/welcome-gift'
        },
        styles: { backgroundColor: '#2563eb', color: 'white', padding: '12px 24px' }
      }
    ]
  },
  newsletter: {
    name: 'Weekly Newsletter',
    subject: 'This Week in Missional Leadership',
    preheader: 'Insights, resources, and community updates...',
    blocks: [
      {
        id: '1',
        type: 'text' as const,
        content: { text: 'This Week in Missional Leadership', tag: 'h1' },
        styles: { textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }
      },
      {
        id: '2',
        type: 'text' as const,
        content: { 
          text: 'This week I want to share some thoughts on the difference between managing and leading transformation...',
          tag: 'p'
        },
        styles: { fontSize: '16px', lineHeight: '1.6' }
      }
    ]
  },
  product: {
    name: 'Product Announcement',
    subject: 'New Resource: {productName}',
    preheader: 'Something special for our community...',
    blocks: [
      {
        id: '1',
        type: 'image' as const,
        content: { 
          src: '/images/products/new-resource.jpg',
          alt: 'New Resource',
          url: 'https://alanhirsch.com/products/new-resource'
        },
        styles: { width: '100%', textAlign: 'center' }
      },
      {
        id: '2',
        type: 'text' as const,
        content: { text: 'Introducing: The Leadership Transformation Toolkit', tag: 'h1' },
        styles: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }
      }
    ]
  }
}

export default function NewsletterTemplateEditor() {
  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate>({
    id: 'new',
    name: 'New Template',
    subject: '',
    preheader: '',
    blocks: [],
    globalStyles: {
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-body), "Source Sans 3", system-ui, sans-serif',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b'
    }
  })
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [showCode, setShowCode] = useState(false)

  const addBlock = (type: EmailBlock['type']) => {
    const newBlock: EmailBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    }
    
    setActiveTemplate(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }))
  }

  const deleteBlock = (blockId: string) => {
    setActiveTemplate(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }))
    setSelectedBlock(null)
  }

  const updateBlock = (blockId: string, updates: Partial<EmailBlock>) => {
    setActiveTemplate(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    }))
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    setActiveTemplate(prev => {
      const blocks = [...prev.blocks]
      const index = blocks.findIndex(block => block.id === blockId)
      
      if (direction === 'up' && index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]]
      } else if (direction === 'down' && index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]]
      }
      
      return { ...prev, blocks }
    })
  }

  const loadPreset = (presetKey: keyof typeof TEMPLATE_PRESETS) => {
    const preset = TEMPLATE_PRESETS[presetKey]
    setActiveTemplate(prev => ({
      ...prev,
      ...preset,
      globalStyles: prev.globalStyles
    }))
  }

  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${activeTemplate.subject}</title>
  <style>
    body { 
      font-family: ${activeTemplate.globalStyles.fontFamily}; 
      background-color: ${activeTemplate.globalStyles.backgroundColor};
      margin: 0; 
      padding: 20px; 
    }
    .email-container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 8px; 
      overflow: hidden; 
    }
  </style>
</head>
<body>
  <div class="email-container">
    ${activeTemplate.blocks.map(block => renderBlockHTML(block)).join('')}
  </div>
</body>
</html>
    `.trim()
  }

  const renderBlockHTML = (block: EmailBlock) => {
    switch (block.type) {
      case 'text':
        return `<${block.content.tag} style="${stylesToString(block.styles)}">${block.content.text}</${block.content.tag}>`
      case 'image':
        return `<img src="${block.content.src}" alt="${block.content.alt}" style="${stylesToString(block.styles)}" />`
      case 'button':
        return `<a href="${block.content.url}" style="${stylesToString(block.styles)}; display: inline-block; text-decoration: none; border-radius: 4px;">${block.content.text}</a>`
      case 'divider':
        return `<hr style="${stylesToString(block.styles)}" />`
      case 'spacer':
        return `<div style="height: ${block.content.height || '20px'};"></div>`
      default:
        return ''
    }
  }

  const stylesToString = (styles: any): string => {
    return Object.entries(styles)
      .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
      .join('; ')
  }

  const camelToKebab = (str: string): string => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-4">Email Template Builder</h2>
          
          <Tabs defaultValue="blocks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="blocks">Blocks</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Quick Start</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadPreset('welcome')}
                  >
                    Welcome
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadPreset('newsletter')}
                  >
                    Newsletter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadPreset('product')}
                  >
                    Product
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Add Blocks</h3>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => addBlock('text')}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => addBlock('image')}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => addBlock('button')}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Button
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => addBlock('divider')}
                  >
                    <Layout className="h-4 w-4 mr-2" />
                    Divider
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => addBlock('spacer')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Spacer
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Template Name</label>
                  <Input
                    value={activeTemplate.name}
                    onChange={(e) => setActiveTemplate(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subject Line</label>
                  <Input
                    value={activeTemplate.subject}
                    onChange={(e) => setActiveTemplate(prev => ({
                      ...prev,
                      subject: e.target.value
                    }))}
                    placeholder="Your subject line..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Preheader</label>
                  <Input
                    value={activeTemplate.preheader}
                    onChange={(e) => setActiveTemplate(prev => ({
                      ...prev,
                      preheader: e.target.value
                    }))}
                    placeholder="Preview text..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Primary Color</label>
                  <Input
                    type="color"
                    value={activeTemplate.globalStyles.primaryColor}
                    onChange={(e) => setActiveTemplate(prev => ({
                      ...prev,
                      globalStyles: { ...prev.globalStyles, primaryColor: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Block List */}
        <div className="p-4">
          <h3 className="font-medium mb-2">Template Blocks</h3>
          <div className="space-y-2">
            {activeTemplate.blocks.map((block, index) => (
              <div
                key={block.id}
                className={`p-2 border rounded cursor-pointer transition-colors ${
                  selectedBlock === block.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedBlock(block.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{block.type}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, 'up')
                      }}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, 'down')
                      }}
                      disabled={index === activeTemplate.blocks.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteBlock(block.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              <Code className="h-4 w-4 mr-2" />
              {showCode ? 'Visual' : 'Code'}
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
            <Button size="sm">
              <Send className="h-4 w-4 mr-2" />
              Send Test
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {showCode ? (
            <div className="max-w-4xl mx-auto">
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
                <code>{generateHTML()}</code>
              </pre>
            </div>
          ) : (
            <div className={`mx-auto bg-white shadow-lg ${
              previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
            }`}>
              <EmailPreview 
                template={activeTemplate}
                selectedBlock={selectedBlock}
                onBlockSelect={setSelectedBlock}
                onBlockUpdate={updateBlock}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Preview Component
function EmailPreview({ 
  template, 
  selectedBlock, 
  onBlockSelect, 
  onBlockUpdate 
}: {
  template: EmailTemplate
  selectedBlock: string | null
  onBlockSelect: (id: string) => void
  onBlockUpdate: (id: string, updates: Partial<EmailBlock>) => void
}) {
  return (
    <div className="p-8">
      <div className="mb-4 text-center text-gray-600">
        <div className="text-sm">Subject: {template.subject || 'Your subject line'}</div>
        <div className="text-xs">Preheader: {template.preheader || 'Preview text'}</div>
      </div>

      <div className="space-y-4">
        {template.blocks.map((block) => (
          <div
            key={block.id}
            className={`relative group ${
              selectedBlock === block.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onBlockSelect(block.id)}
          >
            <BlockRenderer block={block} onUpdate={onBlockUpdate} />
            
            {selectedBlock === block.id && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-bl">
                {block.type}
              </div>
            )}
          </div>
        ))}
        
        {template.blocks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Sparkles className="h-8 w-8 mx-auto mb-2" />
            <p>Start building your email by adding blocks from the sidebar</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Block Renderer Component
function BlockRenderer({ 
  block, 
  onUpdate 
}: { 
  block: EmailBlock
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  switch (block.type) {
    case 'text':
      return isEditing ? (
        <Textarea
          value={block.content.text}
          onChange={(e) => onUpdate(block.id, {
            content: { ...block.content, text: e.target.value }
          })}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="w-full"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={block.styles}
          className="cursor-text"
        >
          {block.content.tag === 'h1' ? (
            <h1>{block.content.text}</h1>
          ) : (
            <p>{block.content.text}</p>
          )}
        </div>
      )

    case 'image':
      return (
        <div style={block.styles} className="text-center">
          <img 
            src={block.content.src} 
            alt={block.content.alt}
            className="max-w-full h-auto"
          />
        </div>
      )

    case 'button':
      return (
        <div className="text-center">
          <a
            href={block.content.url}
            style={block.styles}
            className="inline-block text-decoration-none rounded"
          >
            {block.content.text}
          </a>
        </div>
      )

    case 'divider':
      return <hr style={block.styles} />

    case 'spacer':
      return <div style={{ height: block.content.height || '20px' }} />

    default:
      return null
  }
}

// Helper functions
function getDefaultContent(type: EmailBlock['type']) {
  switch (type) {
    case 'text':
      return { text: 'Your text here...', tag: 'p' }
    case 'image':
      return { src: '/images/placeholder.jpg', alt: 'Image', url: '' }
    case 'button':
      return { text: 'Click Here', url: 'https://example.com' }
    case 'divider':
      return {}
    case 'spacer':
      return { height: '20px' }
    default:
      return {}
  }
}

function getDefaultStyles(type: EmailBlock['type']) {
  switch (type) {
    case 'text':
      return { fontSize: '16px', lineHeight: '1.6', padding: '10px' }
    case 'image':
      return { width: '100%', textAlign: 'center' }
    case 'button':
      return { 
        backgroundColor: '#2563eb', 
        color: 'white', 
        padding: '12px 24px',
        borderRadius: '4px',
        textDecoration: 'none'
      }
    case 'divider':
      return { border: 'none', height: '1px', backgroundColor: '#e5e7eb', margin: '20px 0' }
    case 'spacer':
      return {}
    default:
      return {}
  }
}
