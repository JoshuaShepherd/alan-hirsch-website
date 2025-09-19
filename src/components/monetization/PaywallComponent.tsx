'use client'

import { useState } from 'react'
import { Lock, Crown, BookOpen, Video, Users, Clock, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface PaywallProps {
  contentType: 'book' | 'chapter' | 'article' | 'video' | 'course'
  contentTitle: string
  contentDescription?: string
  contentImage?: string
  authorName?: string
  estimatedReadTime?: number
  requiredPlan: 'member' | 'scholar'
  userPlan?: 'free' | 'member' | 'scholar' | null
  previewContent?: string
  onUpgrade: (planId: string) => void
  onStartTrial?: () => void
}

const PLAN_BENEFITS = {
  member: {
    name: 'Member',
    price: '$14.99/month',
    benefits: [
      'Access to 3 complete books',
      'Weekly exclusive articles',
      'Member-only discussions',
      'Downloadable resources',
      'Email support'
    ]
  },
  scholar: {
    name: 'Scholar',
    price: '$29.99/month',
    benefits: [
      'Access to ALL books and content',
      'Exclusive video library',
      'Live Q&A sessions with Alan',
      'Advanced features',
      'Priority support',
      'Early access to new releases'
    ]
  }
}

const CONTENT_TYPE_CONFIG = {
  book: {
    icon: BookOpen,
    label: 'Book',
    color: 'text-blue-500'
  },
  chapter: {
    icon: BookOpen,
    label: 'Chapter',
    color: 'text-blue-500'
  },
  article: {
    icon: BookOpen,
    label: 'Article',
    color: 'text-green-500'
  },
  video: {
    icon: Video,
    label: 'Video',
    color: 'text-red-500'
  },
  course: {
    icon: Users,
    label: 'Course',
    color: 'text-purple-500'
  }
}

export function PaywallComponent({
  contentType,
  contentTitle,
  contentDescription,
  contentImage,
  authorName = 'Alan Hirsch',
  estimatedReadTime,
  requiredPlan,
  userPlan,
  previewContent,
  onUpgrade,
  onStartTrial
}: PaywallProps) {
  const [showFullPreview, setShowFullPreview] = useState(false)
  const config = CONTENT_TYPE_CONFIG[contentType]
  const planInfo = PLAN_BENEFITS[requiredPlan]
  const Icon = config.icon

  const formatReadTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min read`
    const hours = Math.floor(minutes / 60)
    const remainingMins = minutes % 60
    return `${hours}h ${remainingMins}min read`
  }

  const getUpgradeMessage = () => {
    switch (requiredPlan) {
      case 'member':
        return 'Become a Member to unlock this content'
      case 'scholar':
        return 'Upgrade to Scholar for full access'
      default:
        return 'Premium content requires subscription'
    }
  }

  const getCurrentPlanMessage = () => {
    if (!userPlan || userPlan === 'free') {
      return 'You\'re currently on the free plan'
    }
    if (userPlan === 'member' && requiredPlan === 'scholar') {
      return 'This content requires Scholar access'
    }
    return ''
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Content Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon className={`h-6 w-6 ${config.color}`} />
          <span className="text-sm font-medium uppercase tracking-wide">
            {config.label}
          </span>
        </div>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          {contentTitle}
        </h1>
        
        {contentDescription && (
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            {contentDescription}
          </p>
        )}
        
        <div className="flex items-center justify-center gap-4 text-sm">
          <span>by {authorName}</span>
          {estimatedReadTime && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatReadTime(estimatedReadTime)}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Preview */}
      {(contentImage || previewContent) && (
        <div className="mb-8">
          {contentImage && (
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6">
              <Image
                src={contentImage}
                alt={contentTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Premium Content</span>
                </div>
              </div>
            </div>
          )}
          
          {previewContent && (
            <div className="relative">
              <div className={`prose prose-lg max-w-none text-foreground ${
                !showFullPreview ? 'line-clamp-6' : ''
              }`}>
                {previewContent.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {!showFullPreview && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />
              )}
              
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowFullPreview(!showFullPreview)}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {showFullPreview ? 'Show less' : 'Continue reading...'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paywall */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Crown className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {getUpgradeMessage()}
        </h2>
        
        {getCurrentPlanMessage() && (
          <p className="-foreground mb-6">{getCurrentPlanMessage()}</p>
        )}
        
        {/* Plan Benefits */}
        <div className="bg-background/50 rounded-xl p-6 mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h3 className="font-semibold text-foreground">{planInfo.name} Plan</h3>
            <span className="text-primary font-bold">{planInfo.price}</span>
          </div>
          
          <ul className="space-y-2">
            {planInfo.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onUpgrade(requiredPlan === 'member' ? 'member' : 'scholar')}
            className="btn-primary w-full max-w-xs mx-auto flex items-center justify-center gap-2"
          >
            <Crown className="h-4 w-4" />
            Upgrade Now
            <ArrowRight className="h-4 w-4" />
          </button>
          
          {onStartTrial && (
            <button
              onClick={onStartTrial}
              className="btn-outline w-full max-w-xs mx-auto"
            >
              Start Free Trial
            </button>
          )}
        </div>
        
        <p className="text-xs mt-4">
          Cancel anytime • 14-day money back guarantee
        </p>
      </div>

      {/* Social Proof */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
          ))}
          <span className="ml-2 text-sm">4.9/5 from 500+ reviews</span>
        </div>
        
        <blockquote className="text-foreground italic max-w-2xl mx-auto mb-4">
          "Alan's insights have transformed how I think about missional leadership. 
          The depth and practical wisdom in his content is unmatched."
        </blockquote>
        <cite className="text-sm">
          — Dr. Sarah Chen, Church Planter
        </cite>
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-muted/30 rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
          While you're here, explore these free resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/books" 
            className="p-4 bg-background rounded-lg hover:bg-muted/50 transition-colors text-center"
          >
            <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Free Chapters</h4>
            <p className="text-sm">Sample content from our books</p>
          </Link>
          
          <Link 
            href="/resources" 
            className="p-4 bg-background rounded-lg hover:bg-muted/50 transition-colors text-center"
          >
            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Movement Toolkit</h4>
            <p className="text-sm">Partner resources & tools</p>
          </Link>
          
          <Link 
            href="/community" 
            className="p-4 bg-background rounded-lg hover:bg-muted/50 transition-colors text-center"
          >
            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Community</h4>
            <p className="text-sm">Join the discussion</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
