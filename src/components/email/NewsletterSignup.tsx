'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Mail, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock,
  Sparkles,
  Gift
} from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'sidebar' | 'footer' | 'hero'
  showInterests?: boolean
  leadMagnet?: {
    title: string
    description: string
    value?: string
  }
  abTestVariant?: 'A' | 'B'
  className?: string
}

interface FormData {
  email: string
  firstName: string
  interests: string[]
  consent: boolean
}

const INTEREST_OPTIONS = [
  { id: 'leadership', label: 'Leadership Development', icon: TrendingUp },
  { id: 'church-planting', label: 'Church Planting', icon: Users },
  { id: 'missional-theology', label: 'Missional Theology', icon: Sparkles },
  { id: 'discipleship', label: 'Discipleship', icon: CheckCircle }
]

const AB_TEST_VARIANTS = {
  A: {
    headline: 'Join 10,000+ Movement Leaders',
    description: 'Get weekly insights on missional leadership, church planting, and organizational transformation.',
    buttonText: 'Get Weekly Insights',
    benefits: [
      'Weekly leadership insights',
      'Exclusive content & resources',
      'Community of practice',
      'Early access to new content'
    ]
  },
  B: {
    headline: 'Transform Your Leadership Journey',
    description: 'Discover practical strategies for leading missional transformation in your church and community.',
    buttonText: 'Start Transforming',
    benefits: [
      'Practical transformation strategies',
      'Proven leadership frameworks',
      'Real-world case studies',
      'Expert coaching insights'
    ]
  }
}

export default function NewsletterSignup({ 
  variant = 'inline',
  showInterests = false,
  leadMagnet,
  abTestVariant = 'A',
  className = ''
}: NewsletterSignupProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    interests: [],
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showDetailedForm, setShowDetailedForm] = useState(false)

  const testVariant = AB_TEST_VARIANTS[abTestVariant]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track A/B test conversion
    console.log('Newsletter signup:', {
      ...formData,
      abTestVariant,
      variant,
      timestamp: new Date().toISOString()
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-xl'
      case 'sidebar':
        return 'bg-gray-50 p-6 rounded-lg border'
      case 'footer':
        return 'bg-gray-900 text-white p-6 rounded-lg'
      default:
        return 'bg-white p-6 rounded-lg border'
    }
  }

  if (isSuccess) {
    return (
      <Card className={`${className} ${getVariantStyles()}`}>
        <CardContent className="text-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2">Welcome to the community!</h3>
          <p className="text-gray-600 mb-4">
            Thanks for subscribing! Check your email for a welcome message and your first insights.
          </p>
          
          {leadMagnet && (
            <Badge variant="secondary" className="mt-2">
              {leadMagnet.title} is on its way!
            </Badge>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className} ${getVariantStyles()}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {leadMagnet?.title || testVariant.headline}
        </CardTitle>
        <CardDescription className={variant === 'hero' ? 'text-blue-100' : ''}>
          {leadMagnet?.description || testVariant.description}
        </CardDescription>
        
        {leadMagnet?.value && (
          <Badge variant="secondary" className="w-fit mx-auto mt-2">
            <Gift className="h-4 w-4 mr-1" />
            {leadMagnet.value}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!showDetailedForm ? (
            // Simple form
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={variant === 'hero' ? 'bg-white text-blue-600 hover:bg-gray-100' : ''}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    testVariant.buttonText
                  )}
                </Button>
              </div>
              
              <button
                type="button"
                onClick={() => setShowDetailedForm(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Customize your interests
              </button>
            </div>
          ) : (
            // Detailed form
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              {showInterests && (
                <div>
                  <h4 className="font-medium mb-3">What interests you most?</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((interest) => {
                      const Icon = interest.icon
                      const isSelected = formData.interests.includes(interest.id)
                      
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-3 rounded-lg border text-sm transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="h-4 w-4 mx-auto mb-1" />
                          {interest.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, consent: checked as boolean }))
                  }
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive helpful content and updates. I can unsubscribe at any time.
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDetailedForm(false)}
                  className="flex-1"
                >
                  Back to Simple
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.consent}
                  className={`flex-1 ${variant === 'hero' ? 'bg-white text-blue-600 hover:bg-gray-100' : ''}`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      {testVariant.buttonText}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        {!showDetailedForm && !leadMagnet && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">You'll get:</h5>
            <ul className="text-sm space-y-1">
              {testVariant.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center mt-4">
          No spam, ever. Unsubscribe anytime with one click.
        </div>
      </CardContent>
    </Card>
  )
}

// A/B Testing Hook
export function useNewsletterABTest() {
  const [variant] = useState<'A' | 'B'>(() => 
    Math.random() < 0.5 ? 'A' : 'B'
  )

  // Track variant impression
  React.useEffect(() => {
    console.log('Newsletter A/B Test Impression:', { variant, timestamp: new Date().toISOString() })
  }, [variant])

  return { variant }
}

// Example usage components
export function NewsletterSignupDemo() {
  const { variant } = useNewsletterABTest()

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Newsletter Signup Variants</h2>
      
      <div className="grid gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Hero Variant (A/B Test: {variant})</h3>
          <NewsletterSignup 
            variant="hero" 
            abTestVariant={variant}
            showInterests={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Sidebar Variant</h3>
          <NewsletterSignup 
            variant="sidebar"
            leadMagnet={{
              title: 'Free Leadership Assessment',
              description: 'Discover your leadership strengths and growth areas',
              value: '$47 Value - Free'
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Inline Variant</h3>
          <NewsletterSignup 
            variant="inline"
            showInterests={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Footer Variant</h3>
          <NewsletterSignup variant="footer" />
        </div>
      </div>
    </div>
  )
}
