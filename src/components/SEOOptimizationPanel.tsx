'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Target, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Link
} from 'lucide-react'

interface SEOPanelProps {
  title: string
  content: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  slug?: string
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
  onFocusKeywordChange: (value: string) => void
  onSlugChange: (value: string) => void
}

interface SEOAnalysis {
  score: number
  checks: {
    titleLength: { passed: boolean; message: string }
    descriptionLength: { passed: boolean; message: string }
    keywordInTitle: { passed: boolean; message: string }
    keywordInDescription: { passed: boolean; message: string }
    keywordInContent: { passed: boolean; message: string }
    slugOptimized: { passed: boolean; message: string }
    readability: { passed: boolean; message: string }
  }
}

export function SEOOptimizationPanel({
  title,
  content,
  metaTitle = '',
  metaDescription = '',
  focusKeyword = '',
  slug = '',
  onMetaTitleChange,
  onMetaDescriptionChange,
  onFocusKeywordChange,
  onSlugChange
}: SEOPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate SEO analysis
  const analyzeSEO = (): SEOAnalysis => {
    const titleToCheck = metaTitle || title
    const contentText = content.replace(/<[^>]*>/g, '').toLowerCase()
    const keyword = focusKeyword.toLowerCase()

    const checks = {
      titleLength: {
        passed: titleToCheck.length >= 30 && titleToCheck.length <= 60,
        message: `Title length: ${titleToCheck.length} characters (30-60 recommended)`
      },
      descriptionLength: {
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
        message: `Description length: ${metaDescription.length} characters (120-160 recommended)`
      },
      keywordInTitle: {
        passed: !keyword || titleToCheck.toLowerCase().includes(keyword),
        message: keyword ? 
          (titleToCheck.toLowerCase().includes(keyword) ? 'Focus keyword found in title' : 'Focus keyword missing from title') :
          'Set a focus keyword to improve SEO'
      },
      keywordInDescription: {
        passed: !keyword || metaDescription.toLowerCase().includes(keyword),
        message: keyword ? 
          (metaDescription.toLowerCase().includes(keyword) ? 'Focus keyword found in description' : 'Focus keyword missing from description') :
          'Add focus keyword to description'
      },
      keywordInContent: {
        passed: !keyword || contentText.includes(keyword),
        message: keyword ? 
          (contentText.includes(keyword) ? 'Focus keyword found in content' : 'Focus keyword missing from content') :
          'Include focus keyword in content'
      },
      slugOptimized: {
        passed: slug.length > 0 && !slug.includes(' ') && slug.includes('-'),
        message: slug ? 'URL slug is optimized' : 'Create an SEO-friendly URL slug'
      },
      readability: {
        passed: contentText.length > 300,
        message: `Content length: ${contentText.length} characters (300+ recommended for SEO)`
      }
    }

    const passedChecks = Object.values(checks).filter(check => check.passed).length
    const totalChecks = Object.values(checks).length
    const score = Math.round((passedChecks / totalChecks) * 100)

    return { score, checks }
  }

  const seoAnalysis = analyzeSEO()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <AlertTriangle className="w-5 h-5 text-red-600" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <CardTitle className="text-lg">SEO Optimization</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getScoreIcon(seoAnalysis.score)}
            <span className={`font-semibold ${getScoreColor(seoAnalysis.score)}`}>
              {seoAnalysis.score}/100
            </span>
          </div>
        </div>
        <CardDescription>
          Optimize your content for search engines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SEO Score Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>SEO Score</span>
            <span className={getScoreColor(seoAnalysis.score)}>{seoAnalysis.score}/100</span>
          </div>
          <Progress 
            value={seoAnalysis.score} 
            className="h-2"
          />
        </div>

        {/* Focus Keyword */}
        <div className="space-y-2">
          <Label htmlFor="focus-keyword" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Focus Keyword
          </Label>
          <Input
            id="focus-keyword"
            value={focusKeyword}
            onChange={(e) => onFocusKeywordChange(e.target.value)}
            placeholder="Enter your target keyword"
          />
        </div>

        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="meta-title">
            Meta Title
            <span className="text-xs text-gray-500 ml-2">
              ({(metaTitle || title).length}/60)
            </span>
          </Label>
          <Input
            id="meta-title"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder={title || "Enter meta title"}
            maxLength={60}
          />
          <div className="text-xs text-gray-500">
            This title will appear in search results. If empty, the post title will be used.
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="meta-description">
            Meta Description
            <span className="text-xs text-gray-500 ml-2">
              ({metaDescription.length}/160)
            </span>
          </Label>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Write a compelling description for search results"
            maxLength={160}
            rows={3}
          />
        </div>

        {/* URL Slug */}
        <div className="space-y-2">
          <Label htmlFor="url-slug" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            URL Slug
          </Label>
          <Input
            id="url-slug"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="url-friendly-slug"
          />
          <div className="text-xs text-gray-500">
            alanhirsch.com/blog/{slug || 'your-slug-here'}
          </div>
        </div>

        {/* SEO Analysis */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            SEO Analysis
          </h4>
          <div className="space-y-2">
            {Object.entries(seoAnalysis.checks).map(([key, check]) => (
              <div key={key} className="flex items-start gap-2 text-sm">
                {check.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                )}
                <span className={check.passed ? 'text-green-700' : 'text-amber-700'}>
                  {check.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Tips */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4" />
            SEO Tips
          </h4>
          <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
            <li>• Use your focus keyword naturally throughout the content</li>
            <li>• Write compelling meta descriptions that encourage clicks</li>
            <li>• Include internal links to related content</li>
            <li>• Use header tags (H2, H3) to structure your content</li>
            <li>• Aim for 1000+ words for comprehensive coverage</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}