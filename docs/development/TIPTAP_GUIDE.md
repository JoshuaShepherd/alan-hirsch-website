# Tiptap Editor Guide - From Basic to Advanced

## Current Implementation Analysis

### What You Have Now
Your current blog editor (`/admin/blog`) uses **Tiptap** with a minimal setup:

- **Editor**: Tiptap React editor with `StarterKit` extension only
- **Features**: Basic text editing (bold, italic, headings, lists, etc.) - **NO TOOLBAR**
- **Extensions**: Only `StarterKit` (basic formatting)
- **Styling**: Custom prose classes with dark mode support

### Why You Don't See Formatting Options
You're seeing a plain text area because **Tiptap doesn't include a toolbar by default**. The StarterKit provides keyboard shortcuts only:

```
Ctrl/Cmd + B = Bold
Ctrl/Cmd + I = Italic  
Ctrl/Cmd + Shift + X = Strikethrough
# at line start = Heading
* at line start = Bullet list
1. at line start = Numbered list
```

---

## What is Tiptap?

**Tiptap** is a modern, headless rich text editor built on top of ProseMirror. It's:

- **Headless**: No default UI - you build your own interface
- **Extensible**: Modular architecture with 100+ official extensions
- **Framework Agnostic**: Works with React, Vue, Vanilla JS
- **Collaborative**: Built-in collaboration support
- **Accessible**: Screen reader and keyboard navigation support

### Core Concepts

1. **Editor**: The main editor instance
2. **Extensions**: Modular features (bold, italic, tables, etc.)
3. **Commands**: Actions to modify content
4. **Schema**: Document structure definition
5. **Nodes & Marks**: Content types (paragraph, heading) vs formatting (bold, italic)

---

## Your Current Setup Deep Dive

### Current Extensions (StarterKit includes):

```typescript
// What StarterKit provides:
- Document (root node)
- Paragraph
- Text
- Heading (h1-h6)
- Bold, Italic, Strike
- Code, CodeBlock
- BulletList, OrderedList, ListItem
- Blockquote
- HorizontalRule
- HardBreak
- History (undo/redo)
- Dropcursor (drag & drop indicator)
- Gapcursor (cursor in empty areas)
```

### Missing UI Components:
- **Toolbar** (buttons for formatting)
- **Bubble Menu** (floating toolbar on selection)
- **Floating Menu** (appears on empty lines)
- **Character Counter**
- **Placeholder Text**

---

## Building a Rich Editor - Step by Step

### Level 1: Add a Basic Toolbar

```typescript
// Add these extensions to your existing setup:
import { Bold, Italic, Strike } from '@tiptap/extension-bold'
import { Heading } from '@tiptap/extension-heading'

// Create a toolbar component:
const EditorToolbar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="border-b p-2 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
      >
        H1
      </button>
    </div>
  )
}
```

### Level 2: Popular Extensions to Add

#### Content Extensions:
```bash
# Install additional extensions:
npm install @tiptap/extension-link
npm install @tiptap/extension-image  
npm install @tiptap/extension-table
npm install @tiptap/extension-youtube
npm install @tiptap/extension-code-block-lowlight
```

#### UI Extensions:
```bash
npm install @tiptap/extension-bubble-menu
npm install @tiptap/extension-floating-menu
npm install @tiptap/extension-character-count
npm install @tiptap/extension-placeholder
```

### Level 3: Advanced Editor Setup

```typescript
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

// Register languages for syntax highlighting
lowlight.registerLanguage('javascript', javascript)
lowlight.registerLanguage('css', css)

const AdvancedEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 rounded p-4 font-mono text-sm',
        },
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder: 'Start typing your amazing content...',
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div>
      {/* Bubble Menu - appears when text is selected */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleLink().run()}>
              Link
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* Floating Menu - appears on empty lines */}
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="floating-menu">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              Bullet List
            </button>
            <button
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            >
              Table
            </button>
          </div>
        </FloatingMenu>
      )}

      {/* Main Editor */}
      <EditorContent editor={editor} />
      
      {/* Character Count */}
      {editor && (
        <div className="character-count">
          {editor.storage.characterCount.characters()}/10000 characters
        </div>
      )}
    </div>
  )
}
```

---

## Essential Extensions Guide

### 🎨 **Formatting Extensions**

#### Text Formatting:
- `@tiptap/extension-text-style` - Custom text styling
- `@tiptap/extension-color` - Text colors
- `@tiptap/extension-highlight` - Text highlighting
- `@tiptap/extension-font-family` - Font family selection
- `@tiptap/extension-text-align` - Text alignment

#### Rich Content:
- `@tiptap/extension-link` - Clickable links
- `@tiptap/extension-image` - Images with resizing
- `@tiptap/extension-youtube` - YouTube embeds
- `@tiptap/extension-twitter` - Tweet embeds

### 📋 **Structure Extensions**

#### Lists & Tables:
- `@tiptap/extension-task-list` - Todo lists with checkboxes
- `@tiptap/extension-table` - Full table support
- `@tiptap/extension-list-keymap` - Better list navigation

#### Code & Math:
- `@tiptap/extension-code-block-lowlight` - Syntax highlighting
- `@tiptap/extension-mathematics` - LaTeX math equations

### 🎯 **UI/UX Extensions**

#### Interactive:
- `@tiptap/extension-bubble-menu` - Selection-based toolbar
- `@tiptap/extension-floating-menu` - Block insertion menu
- `@tiptap/extension-mention` - @mentions with autocomplete
- `@tiptap/extension-emoji` - Emoji picker

#### Utility:
- `@tiptap/extension-character-count` - Character/word counting
- `@tiptap/extension-placeholder` - Placeholder text
- `@tiptap/extension-focus` - Focus highlighting

### 🤝 **Collaboration Extensions**

- `@tiptap/extension-collaboration` - Real-time collaboration
- `@tiptap/extension-collaboration-cursor` - User cursors
- `@tiptap/extension-comment` - Comments & reviews

---

## Advanced Customization

### Creating Custom Extensions

```typescript
import { Node, mergeAttributes } from '@tiptap/core'

// Custom callout/alert box extension
const Callout = Node.create({
  name: 'callout',
  
  group: 'block',
  
  content: 'block+',
  
  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          return { 'data-type': attributes.type }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 
      class: 'callout',
      'data-type': 'callout' 
    }), 0]
  },

  addCommands() {
    return {
      insertCallout: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'This is a callout' }],
            },
          ],
        })
      },
    }
  },
})

// Usage:
const editor = useEditor({
  extensions: [StarterKit, Callout],
})

// Insert callout:
editor.commands.insertCallout({ type: 'warning' })
```

### Custom Commands

```typescript
// Add custom keyboard shortcuts
const editor = useEditor({
  extensions: [
    StarterKit,
  ],
  editorProps: {
    handleKeyDown: (view, event) => {
      // Custom Ctrl+Shift+L for custom link insertion
      if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        const url = prompt('Enter URL:')
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
        return true
      }
      return false
    },
  },
})
```

### Styling & Theming

```css
/* Custom editor styles */
.ProseMirror {
  /* Editor container */
  outline: none;
  padding: 1rem;
  min-height: 300px;
}

.ProseMirror h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.ProseMirror p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.ProseMirror blockquote {
  border-left: 4px solid #e5e7eb;
  margin-left: 0;
  padding-left: 1rem;
  font-style: italic;
}

.ProseMirror code {
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-family: 'Courier New', monospace;
}

/* Bubble menu styles */
.bubble-menu {
  display: flex;
  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}

.bubble-menu button {
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
}

.bubble-menu button:hover {
  background: #f3f4f6;
}

.bubble-menu button.is-active {
  background: #3b82f6;
  color: white;
}
```

---

## Quick Implementation for Your Project

### Immediate Improvements (30 minutes):

1. **Add Basic Toolbar**:
```typescript
// Update your BlogEditor.tsx:
const ToolbarButton = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
  >
    {children}
  </button>
)

// Add before EditorContent:
<div className="border-b p-3 flex gap-2 flex-wrap">
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleBold().run()}
    isActive={editor.isActive('bold')}
  >
    Bold
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleItalic().run()}
    isActive={editor.isActive('italic')}
  >
    Italic
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    isActive={editor.isActive('heading', { level: 1 })}
  >
    H1
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    isActive={editor.isActive('heading', { level: 2 })}
  >
    H2
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    isActive={editor.isActive('bulletList')}
  >
    • List
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    isActive={editor.isActive('orderedList')}
  >
    1. List
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    isActive={editor.isActive('blockquote')}
  >
    Quote
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().undo().run()}
    isActive={false}
  >
    Undo
  </ToolbarButton>
  <ToolbarButton
    onClick={() => editor.chain().focus().redo().run()}
    isActive={false}
  >
    Redo
  </ToolbarButton>
</div>
```

2. **Add Icons** (install lucide-react if not already):
```typescript
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo } from 'lucide-react'

// Replace text with icons in buttons:
<Bold className="w-4 h-4" />
<Italic className="w-4 h-4" />
// etc.
```

### Next Level (1-2 hours):

1. **Install and add Link extension**
2. **Add Image upload support** 
3. **Implement Bubble Menu**
4. **Add Character Count**

### Pro Level (1-2 days):

1. **Custom extensions** for your specific needs
2. **Collaborative editing** with WebSockets
3. **Advanced formatting** (tables, embeds, etc.)
4. **Custom slash commands** (type "/image" to insert image)

---

## Resources & Links

### Official Documentation:
- **Tiptap Docs**: https://tiptap.dev/
- **Extension Library**: https://tiptap.dev/extensions
- **Examples**: https://tiptap.dev/examples

### Community Resources:
- **Tiptap GitHub**: https://github.com/ueberdosis/tiptap
- **Extensions Marketplace**: Community-built extensions
- **Discord Community**: Active community support

### Inspiration:
- **Notion** - Built with ProseMirror (Tiptap's foundation)
- **Linear** - Clean editor interface
- **Craft** - Rich formatting options
- **Obsidian** - Plugin-based extensibility

---

## Conclusion

Your current Tiptap setup is minimal but functional. The StarterKit provides all basic editing features via keyboard shortcuts, but you need to build the UI (toolbar, menus) yourself. This is Tiptap's strength - complete control over the interface.

**Quick Win**: Add the basic toolbar from the implementation section above.
**Long Term**: Gradually add extensions based on your content creation needs.

Tiptap scales from simple to incredibly complex editors, making it perfect for growing platforms like yours! 🚀