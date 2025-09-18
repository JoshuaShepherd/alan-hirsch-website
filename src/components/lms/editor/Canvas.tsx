'use client'

import { useState, useCallback, useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { 
  GripVertical, 
  Edit, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown,
  Plus,
  Eye,
  EyeOff 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Block } from '@/lib/lms/blocks/schemas'
import { BlockRenderer } from '@/components/lms/blocks/renderers'

interface CanvasProps {
  blocks: Block[]
  onBlocksChange: (blocks: Block[]) => void
  onSelectBlock: (blockId: string | null) => void
  selectedBlockId: string | null
  onAddBlock: (type: string, afterId?: string) => void
  isPreviewMode?: boolean
  onTogglePreviewMode?: () => void
  className?: string
}

export function Canvas({
  blocks,
  onBlocksChange,
  onSelectBlock,
  selectedBlockId,
  onAddBlock,
  isPreviewMode = false,
  onTogglePreviewMode,
  className = ''
}: CanvasProps) {
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null)
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null)
  const [isInserting, setIsInserting] = useState<string | null>(null)

  // Handle drag and drop reordering
  const handleDragEnd = useCallback((result: DropResult) => {
    setDraggedBlockId(null)
    
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) return

    const newBlocks = Array.from(blocks)
    const [reorderedBlock] = newBlocks.splice(sourceIndex, 1)
    newBlocks.splice(destinationIndex, 0, reorderedBlock)

    onBlocksChange(newBlocks)
  }, [blocks, onBlocksChange])

  // Handle block duplication
  const duplicateBlock = useCallback((blockId: string) => {
    const blockIndex = blocks.findIndex(b => b.id === blockId)
    if (blockIndex === -1) return

    const originalBlock = blocks[blockIndex]
    const duplicatedBlock: Block = {
      ...originalBlock,
      id: `${originalBlock.id}-copy-${Date.now()}`,
    }

    const newBlocks = [...blocks]
    newBlocks.splice(blockIndex + 1, 0, duplicatedBlock)
    onBlocksChange(newBlocks)
  }, [blocks, onBlocksChange])

  // Handle block deletion
  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId)
    onBlocksChange(newBlocks)
    if (selectedBlockId === blockId) {
      onSelectBlock(null)
    }
  }, [blocks, onBlocksChange, selectedBlockId, onSelectBlock])

  // Handle block selection
  const handleSelectBlock = useCallback((blockId: string) => {
    onSelectBlock(blockId === selectedBlockId ? null : blockId)
  }, [selectedBlockId, onSelectBlock])

  // Handle adding block after specific block
  const handleAddBlockAfter = useCallback((blockId: string, blockType: string) => {
    onAddBlock(blockType, blockId)
    setIsInserting(null)
  }, [onAddBlock])

  // Show add block interface
  const showAddBlock = (afterBlockId: string) => {
    setIsInserting(afterBlockId)
  }

  if (isPreviewMode) {
    return (
      <div className={`flex-1 bg-background ${className}`}>
        {/* Preview Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Lesson Preview</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onTogglePreviewMode}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Mode
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {blocks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No content to preview</p>
                <Button
                  variant="outline"
                  onClick={onTogglePreviewMode}
                  className="mt-4"
                >
                  Add Content
                </Button>
              </div>
            ) : (
              blocks.map((block) => (
                <div key={block.id} id={`preview-${block.id}`}>
                  <BlockRenderer block={block} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 bg-background ${className}`}>
      {/* Canvas Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Lesson Editor</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onTogglePreviewMode}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {blocks.length === 0 ? (
            // Empty State
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <div className="text-muted-foreground space-y-2">
                <p className="text-lg font-medium">Start building your lesson</p>
                <p className="text-sm">Select a block from the palette to get started</p>
              </div>
            </div>
          ) : (
            // Block List
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="blocks">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-4 ${
                      snapshot.isDraggingOver ? 'bg-muted/20 rounded-lg p-2' : ''
                    }`}
                  >
                    {blocks.map((block, index) => (
                      <div key={block.id}>
                        <Draggable draggableId={block.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`group relative ${
                                snapshot.isDragging ? 'opacity-50' : ''
                              }`}
                              onMouseEnter={() => setHoveredBlockId(block.id)}
                              onMouseLeave={() => setHoveredBlockId(null)}
                            >
                              {/* Block Container */}
                              <div
                                className={`relative border rounded-lg transition-all ${
                                  selectedBlockId === block.id
                                    ? 'border-primary bg-primary/5'
                                    : hoveredBlockId === block.id
                                    ? 'border-muted-foreground bg-muted/20'
                                    : 'border-border bg-background'
                                }`}
                                onClick={() => handleSelectBlock(block.id)}
                              >
                                {/* Block Controls */}
                                <div className={`absolute left-0 top-0 z-10 flex items-center gap-1 -translate-x-12 ${
                                  hoveredBlockId === block.id || selectedBlockId === block.id
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                } transition-opacity`}>
                                  {/* Drag Handle */}
                                  <div
                                    {...provided.dragHandleProps}
                                    className="p-1 rounded bg-background border border-border cursor-grab hover:bg-muted transition-colors"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                </div>

                                {/* Top Controls */}
                                <div className={`absolute right-2 top-2 z-10 flex items-center gap-1 ${
                                  hoveredBlockId === block.id || selectedBlockId === block.id
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                } transition-opacity`}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      duplicateBlock(block.id)
                                    }}
                                    className="h-8 w-8 p-0 hover:bg-background/80"
                                    title="Duplicate block"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteBlock(block.id)
                                    }}
                                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                    title="Delete block"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Block Content */}
                                <div className="p-4">
                                  <BlockRenderer block={block} />
                                </div>
                              </div>

                              {/* Add Block After */}
                              <div className={`mt-2 flex justify-center ${
                                hoveredBlockId === block.id || isInserting === block.id
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover:opacity-100'
                              } transition-opacity`}>
                                {isInserting === block.id ? (
                                  <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-2">
                                    <span className="text-xs text-muted-foreground">Quick add:</span>
                                    {['textRich', 'image', 'quote'].map(type => (
                                      <Button
                                        key={type}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAddBlockAfter(block.id, type)}
                                        className="h-6 px-2 text-xs"
                                      >
                                        {type === 'textRich' ? 'Text' : 
                                         type === 'image' ? 'Image' : 'Quote'}
                                      </Button>
                                    ))}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setIsInserting(null)}
                                      className="h-6 w-6 p-0"
                                    >
                                      ×
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => showAddBlock(block.id)}
                                    className="h-6 w-6 p-0 rounded-full border border-dashed border-border hover:border-primary hover:bg-primary/10"
                                    title="Add block after"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    ))}
                    {provided.placeholder}

                    {/* Add block at end */}
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => onAddBlock('textRich')}
                        className="flex items-center gap-2 border-dashed"
                      >
                        <Plus className="h-4 w-4" />
                        Add Block
                      </Button>
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  )
}
