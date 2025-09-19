import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'
import { MarkdownContent } from '@/components/MarkdownContent'
import { ShareButton } from '@/components/ShareButton'
import { TableOfContents } from '@/components/TableOfContents'
import { BackToTop } from '@/components/BackToTop'
import type { Metadata } from 'next'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Alan Hirsch',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | Alan Hirsch`,
    description: post.excerpt || `Read ${post.title} by Alan Hirsch on missional church renewal and leadership development.`,
    keywords: ['Alan Hirsch', 'missional church', 'church renewal', 'leadership development', 'church planting'],
    authors: [{ name: 'Alan Hirsch' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} by Alan Hirsch`,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: ['Alan Hirsch'],
      images: post.featured_image_url ? [
        {
          url: post.featured_image_url,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} by Alan Hirsch`,
      images: post.featured_image_url ? [post.featured_image_url] : undefined
    }
  }
}

// Calculate reading time (rough estimate: 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Alan Hirsch',
      url: 'https://alanhirsch.org'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alan Hirsch',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alanhirsch.org/images/logo.png'
      }
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    image: post.featured_image_url ? [post.featured_image_url] : undefined,
    url: `https://alanhirsch.org/blog/${post.slug}`,
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://alanhirsch.org/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-paper">
      {/* Navigation Header */}
      <div className="border-b border-stone">
        <div className="max-w-container mx-auto px-6 py-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-graphite hover:text-ink transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <header className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="aspect-[16/9] overflow-hidden rounded-xl mb-8">
              <img 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Title */}
          <h1 className="text-display-lg font-display font-bold text-ink mb-6 leading-display">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-graphite mb-6 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Alan Hirsch</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at || undefined}>
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not published'}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="prose max-w-none mb-8">
              <p className="text-body-lg leading-body text-graphite font-medium">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Share Button */}
          <div className="flex items-center gap-4 pb-8 border-b border-stone">
            <ShareButton 
              title={post.title}
              url={`/blog/${post.slug}`}
            />
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="section-padding">
        <div className="max-w-content mx-auto px-6">
          {/* Table of Contents */}
          <TableOfContents 
            content={post.content}
            className="mb-8"
          />
          
          <article className="prose prose-lg max-w-none">
            <MarkdownContent 
              content={post.content}
            />
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="section-padding border-t border-stone bg-stone/20">
        <div className="max-w-content mx-auto px-6">
          <div className="text-center">
            <p className="text-graphite mb-4">
              Enjoyed this article? 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-paper hover:bg-indigo-dark transition-colors rounded-lg font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Read More Articles
              </Link>
              <Link 
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-3 border border-indigo text-indigo hover:bg-indigo hover:text-paper transition-colors rounded-lg font-medium"
              >
                Explore Alan's Books
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  )
}