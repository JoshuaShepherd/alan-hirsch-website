'use client'

import { useState } from 'react'
import { Block } from '@/lib/lms/blocks/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react'

// Type guard functions for safe prop access
const getQuoteProps = (props: unknown) => props as { text?: string; cite?: string }
const getImageProps = (props: unknown) => props as { src?: string; alt?: string; caption?: string; width?: number; height?: number }
const getVideoProps = (props: unknown) => props as { provider?: string; src?: string; poster?: string }
const getCalloutProps = (props: unknown) => props as { variant?: string; title?: string }
const getDownloadProps = (props: unknown) => props as { href?: string; label?: string; size?: string; type?: string }
const getQuizMCQProps = (props: unknown) => props as { 
  options?: Array<{ id: string; text: string }>; 
  correctIds?: string[];
  stem?: { type: 'doc'; content?: unknown[] };
  shuffle?: boolean;
  points?: number;
  feedback?: { type: 'doc'; content?: unknown[] };
}
const getQuizTFProps = (props: unknown) => props as { statement?: string; correct?: boolean; feedback?: string }
const getCTAProps = (props: unknown) => props as { headline?: string; body?: string; buttonLabel?: string; buttonHref?: string }
const getROICalculatorProps = (props: unknown) => props as { 
  title?: string; 
  description?: string; 
  defaultTargetSubscribers?: number;
  defaultMonthlyPrice?: number;
  defaultEstimatedVisitors?: number;
}

interface BlockInspectorProps {
  block: Block
  onUpdateBlock: (blockId: string, updates: Partial<Block>) => void
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function BlockInspector({ 
  block, 
  onUpdateBlock, 
  onClose,
  isCollapsed = false,
  onToggleCollapse 
}: BlockInspectorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localProps, setLocalProps] = useState<any>(block.props || {})

  // Update block props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateProps = (newProps: any) => {
    setLocalProps(newProps)
    onUpdateBlock(block.id, { props: newProps })
  }

  // Handle prop changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...localProps, [key]: value }
    updateProps(newProps)
  }

  // Handle array prop changes (for quiz options)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleArrayPropChange = (key: string, index: number, value: any) => {
    const currentArray = localProps[key] || []
    const newArray = [...currentArray]
    newArray[index] = value
    handlePropChange(key, newArray)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addArrayItem = (key: string, defaultItem: any) => {
    const currentArray = localProps[key] || []
    const newArray = [...currentArray, defaultItem]
    handlePropChange(key, newArray)
  }

  const removeArrayItem = (key: string, index: number) => {
    const currentArray = localProps[key] || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArray = currentArray.filter((_: any, i: number) => i !== index)
    handlePropChange(key, newArray)
  }

  if (isCollapsed) {
    return (
      <div className="w-12 border-l border-border bg-muted/30 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const renderPropsEditor = () => {
    switch (block.type) {
      case 'textRich':
        return (
          <div className="space-y-4">
            <div>
              <Label>Content</Label>
              <Textarea
                value={typeof localProps.content === 'string' ? localProps.content : JSON.stringify(localProps.content)}
                onChange={(e) => handlePropChange('content', e.target.value)}
                placeholder="Enter your text content..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>
        )

      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="quote-text">Quote Text</Label>
              <Textarea
                id="quote-text"
                value={localProps.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                placeholder="Enter quote text..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="quote-cite">Citation (Optional)</Label>
              <Input
                id="quote-cite"
                value={localProps.cite || ''}
                onChange={(e) => handlePropChange('cite', e.target.value)}
                placeholder="Author, Source, etc."
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={localProps.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={localProps.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                placeholder="Describe the image"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption (Optional)</Label>
              <Input
                id="image-caption"
                value={localProps.caption || ''}
                onChange={(e) => handlePropChange('caption', e.target.value)}
                placeholder="Image caption"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-provider">Provider</Label>
              <Select
                value={localProps.provider || 'youtube'}
                onValueChange={(value) => handlePropChange('provider', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                  <SelectItem value="direct">Direct URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="video-src">Video URL</Label>
              <Input
                id="video-src"
                value={localProps.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                placeholder="Video URL or embed ID"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="video-poster">Poster Image (Optional)</Label>
              <Input
                id="video-poster"
                value={localProps.poster || ''}
                onChange={(e) => handlePropChange('poster', e.target.value)}
                placeholder="Thumbnail image URL"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'callout':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="callout-variant">Style</Label>
              <Select
                value={localProps.variant || 'note'}
                onValueChange={(value) => handlePropChange('variant', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="tip">Tip</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="callout-title">Title</Label>
              <Input
                id="callout-title"
                value={localProps.title || ''}
                onChange={(e) => handlePropChange('title', e.target.value)}
                placeholder="Callout title"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="callout-body">Content</Label>
              <Textarea
                id="callout-body"
                value={typeof localProps.body === 'string' ? localProps.body : JSON.stringify(localProps.body)}
                onChange={(e) => handlePropChange('body', e.target.value)}
                placeholder="Enter callout content..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>
        )

      case 'download':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="download-href">File URL</Label>
              <Input
                id="download-href"
                value={localProps.href || ''}
                onChange={(e) => handlePropChange('href', e.target.value)}
                placeholder="https://example.com/file.pdf"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="download-label">Button Label</Label>
              <Input
                id="download-label"
                value={localProps.label || ''}
                onChange={(e) => handlePropChange('label', e.target.value)}
                placeholder="Download File"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="download-size">File Size (Optional)</Label>
              <Input
                id="download-size"
                value={localProps.size || ''}
                onChange={(e) => handlePropChange('size', e.target.value)}
                placeholder="1.5 MB"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="download-type">File Type (Optional)</Label>
              <Input
                id="download-type"
                value={localProps.type || ''}
                onChange={(e) => handlePropChange('type', e.target.value)}
                placeholder="PDF"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'quizMCQ':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mcq-stem">Question</Label>
              <Textarea
                id="mcq-stem"
                value={typeof localProps.stem === 'string' ? localProps.stem : JSON.stringify(localProps.stem)}
                onChange={(e) => handlePropChange('stem', e.target.value)}
                placeholder="Enter your question..."
                className="mt-2"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('options', { 
                    id: Date.now().toString(), 
                    text: 'New option' 
                  })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(localProps.options || []).map((option: any, index: number) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Input
                      value={option.text}
                      onChange={(e) => handleArrayPropChange('options', index, {
                        ...option,
                        text: e.target.value
                      })}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Switch
                      checked={(localProps.correctIds || []).includes(option.id)}
                      onCheckedChange={(checked) => {
                        const currentCorrect = localProps.correctIds || []
                        const newCorrect = checked
                          ? [...currentCorrect, option.id]
                          : currentCorrect.filter((id: string) => id !== option.id)
                        handlePropChange('correctIds', newCorrect)
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem('options', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="shuffle"
                  checked={localProps.shuffle || false}
                  onCheckedChange={(checked) => handlePropChange('shuffle', checked)}
                />
                <Label htmlFor="shuffle">Shuffle options</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="points">Points:</Label>
                <Input
                  id="points"
                  type="number"
                  value={localProps.points || 1}
                  onChange={(e) => handlePropChange('points', parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
            </div>
          </div>
        )

      case 'quizTF':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tf-statement">Statement</Label>
              <Textarea
                id="tf-statement"
                value={localProps.statement || ''}
                onChange={(e) => handlePropChange('statement', e.target.value)}
                placeholder="Enter true/false statement..."
                className="mt-2"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="correct"
                  checked={localProps.correct || false}
                  onCheckedChange={(checked) => handlePropChange('correct', checked)}
                />
                <Label htmlFor="correct">Correct answer is True</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="points">Points:</Label>
                <Input
                  id="points"
                  type="number"
                  value={localProps.points || 1}
                  onChange={(e) => handlePropChange('points', parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
            </div>
          </div>
        )

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cta-headline">Headline</Label>
              <Input
                id="cta-headline"
                value={localProps.headline || ''}
                onChange={(e) => handlePropChange('headline', e.target.value)}
                placeholder="Compelling headline"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="cta-body">Description</Label>
              <Textarea
                id="cta-body"
                value={typeof localProps.body === 'string' ? localProps.body : JSON.stringify(localProps.body)}
                onChange={(e) => handlePropChange('body', e.target.value)}
                placeholder="Describe the action..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Button</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={localProps.button?.label || ''}
                  onChange={(e) => handlePropChange('button', {
                    ...localProps.button,
                    label: e.target.value
                  })}
                  placeholder="Button text"
                />
                <Select
                  value={localProps.button?.variant || 'primary'}
                  onValueChange={(value) => handlePropChange('button', {
                    ...localProps.button,
                    variant: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                value={localProps.button?.href || ''}
                onChange={(e) => handlePropChange('button', {
                  ...localProps.button,
                  href: e.target.value
                })}
                placeholder="Button URL"
              />
            </div>
          </div>
        )

      case 'roiCalculator':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="roi-title">Calculator Title</Label>
              <Input
                id="roi-title"
                value={localProps.title || ''}
                onChange={(e) => handlePropChange('title', e.target.value)}
                placeholder="Publishing ROI Calculator"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="roi-description">Description</Label>
              <Textarea
                id="roi-description"
                value={localProps.description || ''}
                onChange={(e) => handlePropChange('description', e.target.value)}
                placeholder="See how different publishing models compare..."
                className="mt-2 min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="roi-target">Default Target Subscribers</Label>
                <Input
                  id="roi-target"
                  type="number"
                  value={localProps.defaultTargetSubscribers || 1000}
                  onChange={(e) => handlePropChange('defaultTargetSubscribers', parseInt(e.target.value) || 1000)}
                  placeholder="1000"
                  className="mt-2"
                  min="100"
                  max="10000"
                />
              </div>
              
              <div>
                <Label htmlFor="roi-price">Default Monthly Price</Label>
                <Input
                  id="roi-price"
                  type="number"
                  value={localProps.defaultMonthlyPrice || 10}
                  onChange={(e) => handlePropChange('defaultMonthlyPrice', parseInt(e.target.value) || 10)}
                  placeholder="10"
                  className="mt-2"
                  min="5"
                  max="50"
                />
              </div>
              
              <div>
                <Label htmlFor="roi-visitors">Default Monthly Visitors</Label>
                <Input
                  id="roi-visitors"
                  type="number"
                  value={localProps.defaultEstimatedVisitors || 50000}
                  onChange={(e) => handlePropChange('defaultEstimatedVisitors', parseInt(e.target.value) || 50000)}
                  placeholder="50000"
                  className="mt-2"
                  min="10000"
                  max="200000"
                  step="5000"
                />
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No properties available for this block type.</p>
          </div>
        )
    }
  }

  return (
    <div className="w-80 border-l border-border bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="font-medium">Properties</span>
        </div>
        <div className="flex items-center gap-1">
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Block Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{block.type}</Badge>
          <span className="text-sm text-muted-foreground">#{block.id.slice(-8)}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Created: {block.createdAt ? new Date(block.createdAt).toLocaleString() : 'Unknown'}
        </div>
        {block.updatedAt && block.updatedAt !== block.createdAt && (
          <div className="text-xs text-muted-foreground">
            Updated: {new Date(block.updatedAt).toLocaleString()}
          </div>
        )}
      </div>

      {/* Properties Editor */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {renderPropsEditor()}
        </div>
      </div>
    </div>
  )
}
