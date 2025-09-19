'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import { cn } from '@/lib/utils'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) {
    return <div className="text-red-500">No content provided</div>
  }
  
  // Clean the content if it's HTML-wrapped markdown
  let cleanContent = content
  
  // If content starts with HTML tags, try to extract the inner text
  if (content.trim().startsWith('<p>') && content.includes('#')) {
    // Remove HTML tags to get the markdown content
    cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .trim()
  }
  
  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
                ariaLabel: 'Link to this section'
              }
            }
          ]
        ]}
        components={{
                    // Custom heading components with proper styling
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-5 mt-8" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-6" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-5" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-3" {...props}>
              {children}
            </h6>
          ),
          // Paragraph styling
          p: ({ children, ...props }) => (
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6" {...props}>
              {children}
            </p>
          ),
                    // Link styling
          a: ({ children, href, ...props }) => (
            <a 
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors"
              {...props}
            >
              {children}
            </a>
          ),
          // List styling
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-lg leading-relaxed" {...props}>
              {children}
            </li>
          ),
          // Blockquote styling
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800 pl-6 pr-4 py-4 my-6 italic text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </blockquote>
          ),
                    // Code styling
          code: ({ children, className, ...props }: any) => {
            const isInline = !className?.includes('language-')
            return isInline ? (
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100" {...props}>
                {children}
              </code>
            ) : (
              <code className="block" {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6" {...props}>
              {children}
            </pre>
          ),
          // Table styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </td>
          ),
          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="border-0 h-px bg-gray-300 dark:bg-gray-600 my-8" {...props} />
          ),
          // Images
          img: ({ src, alt, ...props }) => (
            <img 
              src={src} 
              alt={alt}
              className="max-w-full h-auto rounded-lg my-6 shadow-sm"
              {...props}
            />
          )
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  )
}