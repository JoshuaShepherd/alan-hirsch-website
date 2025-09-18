'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Gift, 
  Mail, 
  Download, 
  CheckCircle,
  Sparkles,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react'

interface EmailCapturePopupProps {
  isOpen: boolean
  onClose: () => void
  leadMagnet: {
    title: string
    description: string
    type: 'ebook' | 'guide' | 'template' | 'course' | 'toolkit'
    value: string
    imageUrl?: string
  }
  placement?: 'center' | 'bottom-right' | 'bottom-left'
  delay?: number
}

interface FormData {
  email: string
  firstName: string
  interests: string[]
}

const LEAD_MAGNETS = {
  'missional-leadership-guide': {
    title: 'The Missional Leader\'s Toolkit',
    description: 'Essential strategies for leading transformation in your church and community',
    type: 'guide' as const,
    value: '$47 Value - Free',
    imageUrl: '/images/lead-magnets/missional-toolkit.jpg'
  },
  'church-planting-blueprint': {
    title: 'Church Planting Blueprint',
    description: 'Step-by-step framework for planting thriving missional communities',
    type: 'template' as const,
    value: '$97 Value - Free',
    imageUrl: '/images/lead-magnets/planting-blueprint.jpg'
  },
  'apest-assessment': {
    title: 'APEST Ministry Assessment',
    description: 'Discover your fivefold ministry gifts and calling',
    type: 'course' as const,
    value: 'Premium Content',
    imageUrl: '/images/lead-magnets/apest-assessment.jpg'
  },
  'movement-thinking-ebook': {
    title: 'Movement Thinking eBook',
    description: 'Transform your mindset from institutional to movement-based leadership',
    type: 'ebook' as const,
    value: '$29 Value - Free',
    imageUrl: '/images/lead-magnets/movement-thinking.jpg'
  }
}

const INTEREST_CATEGORIES = [
  { id: 'leadership', label: 'Leadership Development', icon: TrendingUp },
  { id: 'church-planting', label: 'Church Planting', icon: Users },
  { id: 'missional-theology', label: 'Missional Theology', icon: Sparkles },
  { id: 'community-building', label: 'Community Building', icon: Users },
  { id: 'discipleship', label: 'Discipleship', icon: CheckCircle },
  { id: 'organizational-change', label: 'Organizational Change', icon: TrendingUp }
]

export default function EmailCapturePopup({ 
  isOpen, 
  onClose, 
  leadMagnet,
  placement = 'center',
  delay = 0 
}: EmailCapturePopupProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    interests: []
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (delay > 0 && !hasShown) {
      const timer = setTimeout(() => {
        setHasShown(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [delay, hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
    console.log('Submitting lead capture:', {
      ...formData,
      leadMagnet: leadMagnet.title,
      timestamp: new Date().toISOString()
    })

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

  const getPlacementClasses = () => {
    switch (placement) {
      case 'bottom-right':
        return 'bottom-4 right-4 max-w-sm'
      case 'bottom-left':
        return 'bottom-4 left-4 max-w-sm'
      default:
        return 'inset-0 flex items-center justify-center p-4'
    }
  }

  const getTypeIcon = () => {
    switch (leadMagnet.type) {
      case 'ebook':
        return Download
      case 'guide':
        return Gift
      case 'template':
        return CheckCircle
      case 'course':
        return Sparkles
      case 'toolkit':
        return Gift
      default:
        return Gift
    }
  }

  const TypeIcon = getTypeIcon()

  if (delay > 0 && !hasShown) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {placement === 'center' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />
          )}
          
          <div className={`absolute ${getPlacementClasses()}`}>
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: placement === 'center' ? 0.95 : 1,
                y: placement !== 'center' ? 100 : 0 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: placement === 'center' ? 0.95 : 1,
                y: placement !== 'center' ? 100 : 0 
              }}
              className="w-full max-w-md"
            >
              <Card className="relative shadow-2xl">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit}>
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <TypeIcon className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold">
                        {leadMagnet.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {leadMagnet.description}
                      </CardDescription>
                      
                      <Badge variant="secondary" className="w-fit mx-auto mt-2">
                        {leadMagnet.value}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <div>
                            <Input
                              type="text"
                              placeholder="First name"
                              value={formData.firstName}
                              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="email"
                              placeholder="Email address"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep(2)}
                              className="flex-1 mr-2"
                            >
                              Customize Interests
                            </Button>
                            <Button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="flex-1"
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
                                  <Download className="h-4 w-4 mr-2" />
                                  Get Free Access
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-3">What interests you most?</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {INTEREST_CATEGORIES.map((interest) => {
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
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep(1)}
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              disabled={isSubmitting}
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
                                  <Download className="h-4 w-4 mr-2" />
                                  Get Free Access
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 text-center">
                        No spam, ever. Unsubscribe anytime.
                      </div>
                    </CardContent>
                  </form>
                ) : (
                  <div className="p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2">Success!</h3>
                    <p className="text-gray-600 mb-4">
                      Check your email for your free {leadMagnet.type}. It should arrive within the next few minutes.
                    </p>
                    
                    <Button onClick={onClose} className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Close
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing popup triggers
export function useEmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMagnet, setActiveMagnet] = useState<keyof typeof LEAD_MAGNETS>('missional-leadership-guide')

  const showPopup = (magnetKey: keyof typeof LEAD_MAGNETS, delay = 0) => {
    setActiveMagnet(magnetKey)
    if (delay > 0) {
      setTimeout(() => setIsOpen(true), delay)
    } else {
      setIsOpen(true)
    }
  }

  const hidePopup = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    leadMagnet: LEAD_MAGNETS[activeMagnet],
    showPopup,
    hidePopup
  }
}

// Example usage components
export function EmailCaptureDemo() {
  const { isOpen, leadMagnet, showPopup, hidePopup } = useEmailCapturePopup()

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Email Capture Popup Demo</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => showPopup('missional-leadership-guide')}>
          Missional Leadership Guide
        </Button>
        <Button onClick={() => showPopup('church-planting-blueprint')}>
          Church Planting Blueprint
        </Button>
        <Button onClick={() => showPopup('apest-assessment')}>
          APEST Assessment
        </Button>
        <Button onClick={() => showPopup('movement-thinking-ebook')}>
          Movement Thinking eBook
        </Button>
      </div>

      <EmailCapturePopup
        isOpen={isOpen}
        onClose={hidePopup}
        leadMagnet={leadMagnet}
        placement="center"
      />
    </div>
  )
}
