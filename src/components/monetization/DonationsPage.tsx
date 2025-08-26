'use client'

import { useState } from 'react'
import { Heart, Gift, Users, Target, CreditCard, DollarSign, Globe, BookOpen, Lightbulb, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface DonationOption {
  amount: number
  label: string
  description?: string
  popular?: boolean
}

interface DonationCause {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  raised: number
  goal: number
  supporters: number
}

interface DonationsPageProps {
  onDonate: (amount: number, frequency: 'once' | 'monthly', cause?: string) => void
  onProcessPayment: (paymentDetails: {
    amount: number
    frequency: 'once' | 'monthly'
    paymentMethod: string
    cause?: string
  }) => void
}

const DONATION_OPTIONS: DonationOption[] = [
  { amount: 10, label: '$10', description: 'Buy Alan a coffee' },
  { amount: 25, label: '$25', description: 'Fund research materials', popular: true },
  { amount: 50, label: '$50', description: 'Support content creation' },
  { amount: 100, label: '$100', description: 'Enable new partnerships' },
  { amount: 250, label: '$250', description: 'Sponsor a church planter' },
  { amount: 500, label: '$500', description: 'Fund a community event' }
]

const CAUSES: DonationCause[] = [
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Fund research, writing, and production of new books, articles, and video content that equips missional leaders worldwide.',
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    raised: 12500,
    goal: 25000,
    supporters: 127
  },
  {
    id: 'global-outreach',
    title: 'Global Missional Network',
    description: 'Support translation projects and partnerships that spread missional church principles to leaders in developing nations.',
    icon: <Globe className="h-8 w-8 text-green-500" />,
    raised: 8300,
    goal: 15000,
    supporters: 89
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    description: 'Provide scholarships and resources for emerging leaders who can\'t afford premium content but show great potential.',
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    raised: 5600,
    goal: 12000,
    supporters: 67
  },
  {
    id: 'community-building',
    title: 'Community Building',
    description: 'Enhance our platform and community features to better connect missional leaders and facilitate meaningful discussions.',
    icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
    raised: 3200,
    goal: 8000,
    supporters: 45
  }
]

export function DonationsPage({ onDonate, onProcessPayment }: DonationsPageProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(25)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selectedCause, setSelectedCause] = useState<string>('')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    anonymous: false,
    message: ''
  })
  const [step, setStep] = useState<'amount' | 'cause' | 'payment'>('amount')

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatProgress = (raised: number, goal: number) => {
    return Math.round((raised / goal) * 100)
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(0)
  }

  const handleProceedToPayment = () => {
    const amount = getCurrentAmount()
    if (amount && amount > 0) {
      onDonate(amount, frequency, selectedCause)
      setStep('payment')
    }
  }

  const renderAmountStep = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full">
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          Support the Mission
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Your generous support helps us create resources, build community, and equip leaders 
          for missional church renewal worldwide.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground mb-1">10,000+</div>
          <div className="text-sm">Leaders Equipped</div>
        </div>
        <div className="text-center p-6 border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground mb-1">25</div>
          <div className="text-sm">Countries Reached</div>
        </div>
        <div className="text-center p-6 border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground mb-1">500+</div>
          <div className="text-sm">Churches Planted</div>
        </div>
      </div>

      {/* Frequency Selection */}
      <div className="flex justify-center mb-6">
        <div className="bg-muted rounded-lg p-1 flex">
          <button
            onClick={() => setFrequency('once')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              frequency === 'once'
                ? 'bg-background text-foreground shadow-sm'
                : '-foreground hover:text-foreground'
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              frequency === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : '-foreground hover:text-foreground'
            }`}
          >
            Monthly
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">
              Max Impact
            </span>
          </button>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DONATION_OPTIONS.map((option) => (
            <button
              key={option.amount}
              onClick={() => handleAmountSelect(option.amount)}
              className={`p-4 border rounded-lg text-center transition-all hover:shadow-md ${
                selectedAmount === option.amount && !customAmount
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              } ${option.popular ? 'relative' : ''}`}
            >
              {option.popular && (
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="font-bold text-lg text-foreground mb-1">
                {option.label}
                {frequency === 'monthly' && <span className="text-sm">/mo</span>}
              </div>
              {option.description && (
                <div className="text-xs">{option.description}</div>
              )}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="max-w-xs mx-auto">
          <label className="block text-sm font-medium text-foreground mb-2">
            Or enter a custom amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
            <input
              type="number"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg font-medium"
              min="1"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={() => setStep('cause')}
          disabled={!getCurrentAmount() || getCurrentAmount() <= 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8"
        >
          Continue ({formatAmount(getCurrentAmount() || 0)}{frequency === 'monthly' ? '/month' : ''})
        </button>
      </div>
    </div>
  )

  const renderCauseStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Choose Your Impact Area
        </h2>
        <p className="-foreground">
          Select a specific cause or let us allocate your donation where it's needed most.
        </p>
      </div>

      {/* General Fund Option */}
      <div 
        onClick={() => setSelectedCause('')}
        className={`p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
          selectedCause === ''
            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">General Fund</h3>
            <p className="text-sm">
              Let us allocate your donation where it will have the greatest impact across all our initiatives.
            </p>
          </div>
          {selectedCause === '' && (
            <div className="w-4 h-4 bg-primary rounded-full" />
          )}
        </div>
      </div>

      {/* Specific Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CAUSES.map((cause) => (
          <div
            key={cause.id}
            onClick={() => setSelectedCause(cause.id)}
            className={`p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
              selectedCause === cause.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {cause.icon}
                <h3 className="font-semibold text-foreground">{cause.title}</h3>
              </div>
              {selectedCause === cause.id && (
                <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0" />
              )}
            </div>
            
            <p className="text-sm mb-4">{cause.description}</p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {formatAmount(cause.raised)} of {formatAmount(cause.goal)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(formatProgress(cause.raised, cause.goal), 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span>{formatProgress(cause.raised, cause.goal)}% funded</span>
                <span>{cause.supporters} supporters</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep('amount')}
          className="btn-outline"
        >
          Back
        </button>
        <button
          onClick={handleProceedToPayment}
          className="btn-primary px-8"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="max-w-md mx-auto space-y-6">
      {/* Summary */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Donation Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="-foreground">Amount:</span>
            <span className="font-medium">{formatAmount(getCurrentAmount())}</span>
          </div>
          <div className="flex justify-between">
            <span className="-foreground">Frequency:</span>
            <span className="font-medium capitalize">{frequency}</span>
          </div>
          {selectedCause && (
            <div className="flex justify-between">
              <span className="-foreground">Cause:</span>
              <span className="font-medium">
                {CAUSES.find(c => c.id === selectedCause)?.title || 'General Fund'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Donor Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <input
            type="text"
            value={donorInfo.name}
            onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={donorInfo.email}
            onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={donorInfo.anonymous}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, anonymous: e.target.checked }))}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Make this donation anonymous</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message (Optional)
          </label>
          <textarea
            value={donorInfo.message}
            onChange={(e) => setDonorInfo(prev => ({ ...prev, message: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Leave a message of encouragement..."
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Payment Method</h3>
        
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-5 w-5" />
            <span className="font-medium text-foreground">Credit / Debit Card</span>
          </div>
          
          {/* Stripe payment form would go here */}
          <div className="space-y-3">
            <div className="bg-muted/50 p-3 rounded text-center text-sm">
              🔒 Secure payment processing by Stripe
            </div>
          </div>
        </div>
      </div>

      {/* Complete Donation Button */}
      <button
        onClick={() => onProcessPayment({ 
          amount: getCurrentAmount(), 
          frequency, 
          paymentMethod: 'stripe',
          cause: selectedCause 
        })}
        disabled={!donorInfo.name || !donorInfo.email}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Heart className="h-4 w-4" />
        Complete Donation
      </button>

      {/* Back Button */}
      <button
        onClick={() => setStep('cause')}
        className="w-full btn-outline"
      >
        Back
      </button>

      <p className="text-xs text-center">
        Your donation is secure and encrypted. You'll receive a receipt via email.
      </p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {step === 'amount' && renderAmountStep()}
      {step === 'cause' && renderCauseStep()}
      {step === 'payment' && renderPaymentStep()}
    </div>
  )
}
