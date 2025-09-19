'use client'

import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code,
  Heading1,
  Heading2, 
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Type
} from 'lucide-react'

interface ToolbarProps {
  editor: Editor | null
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
  variant?: 'default' | 'primary' | 'secondary'
}

const ToolbarButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children, 
  title,
  variant = 'default'
}: ToolbarButtonProps) => {
  const baseClasses = "p-2 rounded-md transition-all duration-200 flex items-center justify-center relative group"
  const variantClasses = {
    default: `${isActive 
      ? 'bg-blue-500 text-white shadow-md' 
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
    }`,
    primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 shadow-md'
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
      {title && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {title}
        </span>
      )}
    </button>
  )
}

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
)

const ToolbarSection = ({ children, title }: { children: React.ReactNode, title?: string }) => (
  <div className="flex items-center gap-1" title={title}>
    {children}
  </div>
)

export function EditorToolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        <ToolbarSection title="Text Formatting">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
        </ToolbarSection>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarSection title="Headings">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            title="Paragraph"
          >
            <Type className="w-4 h-4" />
          </ToolbarButton>
        </ToolbarSection>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarSection title="Lists">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
        </ToolbarSection>

        <ToolbarDivider />

        {/* Block Elements */}
        <ToolbarSection title="Block Elements">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus className="w-4 h-4" />
          </ToolbarButton>
        </ToolbarSection>

        <ToolbarDivider />

        {/* History */}
        <ToolbarSection title="History">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </ToolbarSection>
      </div>
    </div>
  )
}