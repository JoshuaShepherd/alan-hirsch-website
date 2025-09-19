'use client'

import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      items.push({
        id,
        text,
        level
      })
    }

    setTocItems(items)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.getBoundingClientRect().top <= 100) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  if (tocItems.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={`bg-stone/30 rounded-lg p-4 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-graphite hover:text-ink transition-colors font-medium mb-3 w-full text-left"
      >
        <List className="w-4 h-4" />
        Table of Contents
      </button>
      
      {(isExpanded || tocItems.length <= 5) && (
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-ink ${
                activeId === item.id ? 'text-indigo font-medium' : 'text-graphite'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}