'use client'

import { useState } from 'react'
import { 
  Search,
  Book,
  Quote,
  Image,
  Video,
  MessageSquare,
  Download,
  HelpCircle,
  CheckSquare,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  X,
  Calculator
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Block, BlockSchema } from '@/lib/lms/blocks/schemas'

interface BlockPaletteProps {
  onAddBlock: (blockType: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

// Block categories and types
const BLOCK_CATEGORIES = [
  {
    name: 'Content',
    icon: Book,
    blocks: [
      {
        type: 'textRich',
        label: 'Rich Text',
        icon: Book,
        description: 'Add formatted text with headings, lists, and styling',
        keywords: ['text', 'paragraph', 'content', 'writing']
      },
      {
        type: 'quote',
        label: 'Quote',
        icon: Quote,
        description: 'Highlight important quotes or testimonials',
        keywords: ['quote', 'testimonial', 'citation', 'blockquote']
      },
      {
        type: 'callout',
        label: 'Callout',
        icon: MessageSquare,
        description: 'Highlight important information with different styles',
        keywords: ['callout', 'note', 'warning', 'info', 'alert']
      }
    ]
  },
  {
    name: 'Media',
    icon: Image,
    blocks: [
      {
        type: 'image',
        label: 'Image',
        icon: Image,
        description: 'Insert images with captions and alt text',
        keywords: ['image', 'photo', 'picture', 'visual']
      },
      {
        type: 'video',
        label: 'Video',
        icon: Video,
        description: 'Embed videos from various providers',
        keywords: ['video', 'youtube', 'vimeo', 'media', 'embed']
      }
    ]
  },
  {
    name: 'Interactive',
    icon: HelpCircle,
    blocks: [
      {
        type: 'quizMCQ',
        label: 'Multiple Choice',
        icon: HelpCircle,
        description: 'Create multiple choice questions',
        keywords: ['quiz', 'question', 'mcq', 'multiple', 'choice', 'assessment']
      },
      {
        type: 'quizTF',
        label: 'True/False',
        icon: CheckSquare,
        description: 'Add true or false questions',
        keywords: ['quiz', 'true', 'false', 'question', 'assessment']
      }
    ]
  },
  {
    name: 'Actions',
    icon: ExternalLink,
    blocks: [
      {
        type: 'download',
        label: 'Download',
        icon: Download,
        description: 'Add downloadable resources and files',
        keywords: ['download', 'file', 'resource', 'attachment']
      },
      {
        type: 'cta',
        label: 'Call to Action',
        icon: ExternalLink,
        description: 'Create compelling call-to-action buttons',
        keywords: ['cta', 'button', 'action', 'link', 'conversion']
      },
      {
        type: 'roiCalculator',
        label: 'ROI Calculator',
        icon: Calculator,
        description: 'Interactive publishing ROI comparison tool',
        keywords: ['roi', 'calculator', 'comparison', 'interactive', 'tool', 'publishing']
      }
    ]
  }
]

export function BlockPalette({ 
  onAddBlock, 
  isCollapsed = false, 
  onToggleCollapse,
  className = ''
}: BlockPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Content']) // Content category expanded by default
  )

  // Filter blocks based on search query
  const filteredCategories = BLOCK_CATEGORIES.map(category => ({
    ...category,
    blocks: category.blocks.filter(block => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        block.label.toLowerCase().includes(query) ||
        block.description.toLowerCase().includes(query) ||
        block.keywords.some(keyword => keyword.includes(query))
      )
    })
  })).filter(category => category.blocks.length > 0)

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const handleAddBlock = (blockType: string) => {
    onAddBlock(blockType)
  }

  if (isCollapsed) {
    return (
      <div className={`w-12 bg-background border-r border-border flex flex-col ${className}`}>
        <div className="p-3 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-6 w-6 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-2 space-y-2">
          {BLOCK_CATEGORIES.map(category => (
            <Button
              key={category.name}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title={category.name}
            >
              <category.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-80 bg-background border-r border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-foreground">Block Palette</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      {/* Block Categories */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No blocks found matching "{searchQuery}"
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredCategories.map(category => (
              <div key={category.name}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 text-left"
                >
                  {expandedCategories.has(category.name) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {category.blocks.length}
                  </span>
                </button>

                {/* Category Blocks */}
                {expandedCategories.has(category.name) && (
                  <div className="ml-4 space-y-1">
                    {category.blocks.map(block => (
                      <button
                        key={block.type}
                        onClick={() => handleAddBlock(block.type)}
                        className="w-full flex items-start gap-3 p-2 rounded-md hover:bg-muted/70 text-left transition-colors group"
                        title={`Add ${block.label}`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <block.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground group-hover:text-foreground">
                            {block.label}
                          </div>
                          <div className="text-xs text-muted-foreground group-hover:text-muted-foreground line-clamp-2">
                            {block.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Click any block to add it to your lesson
        </div>
      </div>
    </div>
  )
}
