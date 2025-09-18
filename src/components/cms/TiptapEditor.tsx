'use client'

import { useState, useRef } from 'react'
import { 
  Bold, Italic, Underline, Strikethrough, Code, Quote, List, ListOrdered,
  Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight,
  Image as ImageIcon, Video, Link2, Table as TableIcon, Minus,
  Eye, Save, Settings, Crown, Upload, X, Plus, MoreVertical
} from 'lucide-react'

interface PaywallMarker {
  id: string
  position: number
  type: 'free_preview' | 'member_only' | 'premium_only'
  message?: string
}

interface EditorProps {
  content: string
  onChange: (content: string) => void
  onSave: () => void
  paywallMarkers: PaywallMarker[]
  onUpdatePaywallMarkers: (markers: PaywallMarker[]) => void
  readOnly?: boolean
}

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children, 
  title 
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-academic text-academic-foreground' 
        : 'text-foreground hover:bg-muted'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
)

export function TiptapEditor({ 
  content, 
  onChange, 
  onSave, 
  paywallMarkers, 
  onUpdatePaywallMarkers,
  readOnly = false 
}: EditorProps) {
  const [showPaywallDialog, setShowPaywallDialog] = useState(false)
  const [selectedPaywallType, setSelectedPaywallType] = useState<PaywallMarker['type']>('member_only')
  const [paywallMessage, setPaywallMessage] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const addPaywallMarker = () => {
    const selection = window.getSelection()
    const position = selection?.anchorOffset || 0
    const newMarker: PaywallMarker = {
      id: Date.now().toString(),
      position,
      type: selectedPaywallType,
      message: paywallMessage || undefined
    }
    
    onUpdatePaywallMarkers([...paywallMarkers, newMarker])
    setShowPaywallDialog(false)
    setPaywallMessage('')
  }

  const removePaywallMarker = (markerId: string) => {
    onUpdatePaywallMarkers(paywallMarkers.filter(m => m.id !== markerId))
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Top Toolbar */}
      {!readOnly && (
        <div className="border-b border-border bg-muted/30 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
              <MenuButton
                onClick={() => execCommand('bold')}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('italic')}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('underline')}
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('strikeThrough')}
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </MenuButton>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
              <MenuButton
                onClick={() => execCommand('formatBlock', 'h1')}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('formatBlock', 'h2')}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('formatBlock', 'h3')}
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </MenuButton>
            </div>

            {/* Lists & Alignment */}
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
              <MenuButton
                onClick={() => execCommand('insertUnorderedList')}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('insertOrderedList')}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('formatBlock', 'blockquote')}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </MenuButton>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
              <MenuButton
                onClick={() => execCommand('justifyLeft')}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('justifyCenter')}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('justifyRight')}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </MenuButton>
            </div>

            {/* Insert Elements */}
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
              <MenuButton onClick={addImage} title="Insert Image">
                <ImageIcon className="h-4 w-4" />
              </MenuButton>
              <MenuButton onClick={addLink} title="Insert Link">
                <Link2 className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => execCommand('insertHorizontalRule')}
                title="Horizontal Rule"
              >
                <Minus className="h-4 w-4" />
              </MenuButton>
            </div>

            {/* Paywall */}
            <MenuButton
              onClick={() => setShowPaywallDialog(true)}
              title="Add Paywall Marker"
            >
              <Crown className="h-4 w-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="prose prose-lg max-w-none p-6 focus:outline-none min-h-[400px] [&>*]:my-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:text-xl [&>h3]:font-medium [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
          style={{ 
            outline: 'none',
            minHeight: '400px'
          }}
        />

        {/* Paywall Markers Overlay */}
        {paywallMarkers.map((marker, index) => (
          <div
            key={marker.id}
            className="absolute right-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-2 text-xs z-10"
            style={{ top: `${100 + (index * 60)}px` }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200 capitalize">
                  {marker.type.replace('_', ' ')}
                </span>
              </div>
              {!readOnly && (
                <button
                  onClick={() => removePaywallMarker(marker.id)}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            {marker.message && (
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">{marker.message}</p>
            )}
          </div>
        ))}
      </div>

      {/* Paywall Dialog */}
      {showPaywallDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Add Paywall Marker
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Paywall Type
                </label>
                <select
                  value={selectedPaywallType}
                  onChange={(e) => setSelectedPaywallType(e.target.value as PaywallMarker['type'])}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="free_preview">Free Preview Ends</option>
                  <option value="member_only">Member Only Content</option>
                  <option value="premium_only">Premium Only Content</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Custom Message (Optional)
                </label>
                <input
                  type="text"
                  value={paywallMessage}
                  onChange={(e) => setPaywallMessage(e.target.value)}
                  placeholder="e.g., Upgrade to continue reading..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPaywallDialog(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={addPaywallMarker}
                className="btn-primary flex-1"
              >
                Add Marker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
