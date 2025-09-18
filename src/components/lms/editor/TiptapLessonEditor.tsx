'use client'

import { useState, useCallback, useEffect } from 'react'
import { Block } from '@/lib/lms/blocks/schemas'
import { BlockPalette } from './BlockPalette'
import { Canvas } from './Canvas'
import { BlockInspector } from './BlockInspector'
import { Button } from '@/components/ui/button'
import { Save, Loader2, Check, AlertCircle, Grid3X3, Sidebar, Monitor } from 'lucide-react'

// Fallback toast function since sonner might not be available
const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.error('Error:', message)
}

interface TiptapLessonEditorProps {
  initialContent?: Record<string, unknown>
  blocks: Block[]
  onSave: (content: Record<string, unknown>, blocks: Block[]) => void
  onBlocksChange: (blocks: Block[]) => void
  isReadOnly?: boolean
}

// Auto-save interval (5 seconds)
const AUTOSAVE_INTERVAL = 5000

export function TiptapLessonEditor({
  initialContent,
  blocks: initialBlocks = [],
  onSave,
  onBlocksChange,
  isReadOnly = false
}: TiptapLessonEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false)
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false)

  // Create a new block with default properties
  const createBlock = useCallback((type: string, afterId?: string): Block => {
    const baseBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add default props based on block type
    switch (type) {
      case 'textRich':
        return {
          ...baseBlock,
          props: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Start typing...' }]
                }
              ]
            }
          }
        } as Block

      case 'quote':
        return {
          ...baseBlock,
          props: {
            text: 'Enter your quote here...',
            cite: ''
          }
        } as Block

      case 'image':
        return {
          ...baseBlock,
          props: {
            src: '',
            alt: '',
            caption: ''
          }
        } as Block

      case 'video':
        return {
          ...baseBlock,
          props: {
            provider: 'youtube',
            src: '',
            poster: ''
          }
        } as Block

      case 'callout':
        return {
          ...baseBlock,
          props: {
            variant: 'note',
            title: 'Important Note',
            body: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Add your callout content here...' }]
                }
              ]
            }
          }
        } as Block

      case 'download':
        return {
          ...baseBlock,
          props: {
            href: '',
            label: 'Download Resource',
            size: '',
            type: ''
          }
        } as Block

      case 'quizMCQ':
        return {
          ...baseBlock,
          props: {
            stem: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'What is your question?' }]
                }
              ]
            },
            options: [
              { id: '1', text: 'Option A' },
              { id: '2', text: 'Option B' },
              { id: '3', text: 'Option C' },
              { id: '4', text: 'Option D' }
            ],
            correctIds: ['1'],
            shuffle: false,
            points: 1
          }
        } as Block

      case 'quizTF':
        return {
          ...baseBlock,
          props: {
            statement: 'True or false statement...',
            correct: true,
            points: 1
          }
        } as Block

      case 'cta':
        return {
          ...baseBlock,
          props: {
            headline: 'Take Action Now!',
            body: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Describe what users should do...' }]
                }
              ]
            },
            button: {
              label: 'Get Started',
              href: '',
              variant: 'primary'
            }
          }
        } as Block

      case 'roiCalculator':
        return {
          ...baseBlock,
          props: {
            title: 'Publishing ROI Calculator',
            description: 'See how different publishing models compare in reaching your subscriber goals',
            defaultTargetSubscribers: 1000,
            defaultMonthlyPrice: 10,
            defaultEstimatedVisitors: 50000
          }
        } as Block

      default:
        throw new Error(`Unknown block type: ${type}`)
    }
  }, [])

  // Handle adding new blocks
  const handleAddBlock = useCallback((type: string, afterId?: string) => {
    const newBlock = createBlock(type, afterId)
    
    if (afterId) {
      const afterIndex = blocks.findIndex(b => b.id === afterId)
      if (afterIndex !== -1) {
        const newBlocks = [...blocks] as Block[]
        newBlocks.splice(afterIndex + 1, 0, newBlock as Block)
        setBlocks(newBlocks)
        onBlocksChange(newBlocks)
      }
    } else {
      const newBlocks = [...blocks, newBlock as Block]
      setBlocks(newBlocks)
      onBlocksChange(newBlocks)
    }
    
    setSelectedBlockId(newBlock.id)
    setHasUnsavedChanges(true)
  }, [blocks, createBlock, onBlocksChange])

  // Handle blocks change
  const handleBlocksChange = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks)
    onBlocksChange(newBlocks)
    setHasUnsavedChanges(true)
  }, [onBlocksChange])

  // Handle block updates from inspector
  const handleUpdateBlock = useCallback((blockId: string, updates: Partial<Block>) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId 
        ? { ...block, ...updates, updatedAt: new Date().toISOString() }
        : block
    ) as Block[]
    setBlocks(newBlocks)
    onBlocksChange(newBlocks)
    setHasUnsavedChanges(true)
  }, [blocks, onBlocksChange])

  // Handle manual save
  const handleSave = useCallback(async () => {
    if (isSaving) return

    setIsSaving(true)
    try {
      await onSave(initialContent || {}, blocks)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      toast.success('Lesson saved successfully')
    } catch (error) {
      console.error('Save failed:', error)
      toast.error('Failed to save lesson')
    } finally {
      setIsSaving(false)
    }
  }, [onSave, initialContent, blocks, isSaving])

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges || isReadOnly) return

    const autoSaveTimer = setTimeout(async () => {
      try {
        await onSave(initialContent || {}, blocks)
        setLastSaved(new Date())
        setHasUnsavedChanges(false)
      } catch (error) {
        console.error('Auto-save failed:', error)
      }
    }, AUTOSAVE_INTERVAL)

    return () => clearTimeout(autoSaveTimer)
  }, [hasUnsavedChanges, blocks, onSave, initialContent, isReadOnly])

  // Get selected block
  const selectedBlock = blocks.find(block => block.id === selectedBlockId)

  // Mobile responsive layout
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isReadOnly) {
    return (
      <div className="h-full">
        <Canvas
          blocks={blocks}
          onBlocksChange={() => {}}
          onSelectBlock={() => {}}
          selectedBlockId={null}
          onAddBlock={() => {}}
          isPreviewMode={true}
        />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Bar */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-foreground">Lesson Editor</h1>
            
            {/* Layout Controls - Desktop Only */}
            {!isMobile && (
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={isPaletteCollapsed ? "ghost" : "secondary"}
                  size="sm"
                  onClick={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
                  className="h-7 px-2"
                >
                  <Sidebar className="h-4 w-4" />
                </Button>
                <Button
                  variant={isPreviewMode ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="h-7 px-2"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={isInspectorCollapsed ? "ghost" : "secondary"}
                  size="sm"
                  onClick={() => setIsInspectorCollapsed(!isInspectorCollapsed)}
                  className="h-7 px-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : hasUnsavedChanges ? (
                <>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Unsaved changes
                </>
              ) : lastSaved ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Saved {lastSaved.toLocaleTimeString()}
                </>
              ) : null}
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Tab-based interface */}
        {isMobile ? (
          <div className="flex-1 flex flex-col">
            {/* Mobile Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  !isPreviewMode 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  isPreviewMode 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Preview
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1">
              <Canvas
                blocks={blocks}
                onBlocksChange={handleBlocksChange}
                onSelectBlock={setSelectedBlockId}
                selectedBlockId={selectedBlockId}
                onAddBlock={handleAddBlock}
                isPreviewMode={isPreviewMode}
                onTogglePreviewMode={() => setIsPreviewMode(!isPreviewMode)}
              />
            </div>
          </div>
        ) : (
          /* Desktop: 3-pane layout */
          <>
            {/* Left Pane - Block Palette */}
            {!isPreviewMode && (
              <BlockPalette
                onAddBlock={handleAddBlock}
                isCollapsed={isPaletteCollapsed}
                onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
              />
            )}

            {/* Center Pane - Canvas */}
            <Canvas
              blocks={blocks}
              onBlocksChange={handleBlocksChange}
              onSelectBlock={setSelectedBlockId}
              selectedBlockId={selectedBlockId}
              onAddBlock={handleAddBlock}
              isPreviewMode={isPreviewMode}
              onTogglePreviewMode={() => setIsPreviewMode(!isPreviewMode)}
              className="flex-1"
            />

            {/* Right Pane - Block Inspector */}
            {!isPreviewMode && selectedBlock && (
              <BlockInspector
                block={selectedBlock}
                onUpdateBlock={handleUpdateBlock}
                onClose={() => setSelectedBlockId(null)}
                isCollapsed={isInspectorCollapsed}
                onToggleCollapse={() => setIsInspectorCollapsed(!isInspectorCollapsed)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
