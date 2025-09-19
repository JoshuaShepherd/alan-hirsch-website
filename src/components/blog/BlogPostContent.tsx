'use client'

import { useMemo } from 'react'

// Custom MDX-style components for rich content rendering
const ContentComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-lg font-bold text-gray-900 mb-3 mt-4">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-700 bg-blue-50 py-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="mb-1">
      {children}
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }: any) => (
    <em className="italic">
      {children}
    </em>
  ),
  code: ({ children }: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
      {children}
    </pre>
  ),
  a: ({ href, children }: any) => (
    <a 
      href={href}
      className="text-blue-600 hover:text-blue-700 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-lg my-6 w-full shadow-md"
    />
  ),
  hr: () => (
    <hr className="my-8 border-gray-200" />
  )
}

interface BlogPostContentProps {
  content: string
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  const processedContent = useMemo(() => {
    // Simple markdown-to-HTML processing
    // In a real app, you'd use a proper markdown processor like react-markdown
    let processed = content

    // Headers
    processed = processed.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    processed = processed.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    processed = processed.replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold and italic
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Code
    processed = processed.replace(/`(.*?)`/g, '<code>$1</code>')

    // Links
    processed = processed.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')

    // Line breaks
    processed = processed.replace(/\n\n/g, '</p><p>')
    processed = processed.replace(/\n/g, '<br>')

    // Wrap in paragraphs
    processed = `<p>${processed}</p>`

    // Clean up empty paragraphs
    processed = processed.replace(/<p><\/p>/g, '')
    processed = processed.replace(/<p><h([1-6])>/g, '<h$1>')
    processed = processed.replace(/<\/h([1-6])><\/p>/g, '</h$1>')

    return processed
  }, [content])

  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
        style={{
          fontSize: '1.125rem',
          lineHeight: '1.7'
        }}
      />
      
      {/* Add custom styles */}
      <style jsx>{`
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
        }
        .blog-content h1:first-child {
          margin-top: 0;
        }
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }
        .blog-content p {
          color: #374151;
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .blog-content strong {
          font-weight: 600;
          color: #111827;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          color: #1f2937;
        }
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #1d4ed8;
        }
        .blog-content br {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  )
}

// Alternative: Simple text content renderer
export function SimpleContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  )
}