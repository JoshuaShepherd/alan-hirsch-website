'use client'

import { Share2, Link as LinkIcon, Twitter, Facebook } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonProps {
  title: string
  url: string
  className?: string
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url
  const shareText = `${title} by Alan Hirsch`

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: LinkIcon,
      action: () => {
        navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
        setIsOpen(false)
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)
        setIsOpen(false)
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
        setIsOpen(false)
      }
    }
  ]

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-stone hover:bg-stone/80 text-graphite hover:text-ink transition-colors rounded-lg"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-paper border border-stone rounded-lg shadow-lg z-20 min-w-[160px]">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full flex items-center gap-3 px-4 py-3 text-graphite hover:text-ink hover:bg-stone/30 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <option.icon className="w-4 h-4" />
                {option.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}