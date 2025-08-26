'use client'

import { useState, useEffect } from 'react'
import { Crown, Lock, Check, Star, ArrowRight, Gift, Users } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  limitations?: string[]
  popular?: boolean
  badge?: string
}

interface UserSubscription {
  planId: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  currentPeriodEnd: string
  trialEnd?: string
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[]
  currentSubscription?: UserSubscription
  isLoggedIn: boolean
  onSelectPlan: (planId: string, interval: 'month' | 'year') => void
  onStartTrial?: (planId: string) => void
}

const PLAN_DATA: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Explorer',
    description: 'Perfect for getting started with Alan\'s teachings',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      'Access to selected free articles',
      'Monthly newsletter',
      'Basic community access',
      'Public discussion participation',
      'Mobile app access'
    ],
    limitations: [
      'Limited book access',
      'No premium content',
      'No direct support'
    ]
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Essential access to Alan\'s growing library',
    price: 14.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Explorer',
      'Full access to 3 complete books',
      'Weekly exclusive articles',
      'Member-only discussion forums',
      'Downloadable resources',
      'Email support',
      'Mobile offline reading'
    ],
    popular: true
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Complete access plus exclusive learning opportunities',
    price: 29.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Member',
      'Access to ALL books and content',
      'Exclusive video content library',
      'Monthly live Q&A sessions with Alan',
      'Advanced search and note-taking',
      'Priority support',
      'Early access to new releases',
      'Study guides and discussion materials'
    ],
    badge: 'Most Value'
  },
  {
    id: 'scholar-annual',
    name: 'Scholar Annual',
    description: 'Best value - save $120 per year',
    price: 239.99,
    currency: 'USD',
    interval: 'year',
    features: [
      'Everything in Scholar monthly',
      'Annual strategic planning resources',
      'Exclusive annual retreat discount',
      'Direct email access to Alan (quarterly)',
      'Advanced community features',
      'Tax-deductible donation receipt'
    ],
    badge: 'Best Value'
  }
]

export function SubscriptionPlans({
  plans = PLAN_DATA,
  currentSubscription,
  isLoggedIn,
  onSelectPlan,
  onStartTrial
}: SubscriptionPlansProps) {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month')
  const [isAnnual, setIsAnnual] = useState(false)

  const filteredPlans = plans.filter(plan => 
    plan.interval === selectedInterval || plan.id === 'free'
  )

  const formatPrice = (price: number, currency: string = 'USD') => {
    if (price === 0) return 'Free'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(price)
  }

  const calculateYearlySavings = (monthlyPrice: number) => {
    const yearlyEquivalent = monthlyPrice * 12
    const scholarAnnual = plans.find(p => p.id === 'scholar-annual')?.price || 0
    return yearlyEquivalent - scholarAnnual
  }

  const isCurrentPlan = (planId: string) => {
    return currentSubscription?.planId === planId && currentSubscription.status === 'active'
  }

  const renderPlanCard = (plan: SubscriptionPlan) => {
    const isCurrent = isCurrentPlan(plan.id)
    const isUpgrade = currentSubscription && !isCurrent
    const monthlyPlan = plans.find(p => p.name.includes('Scholar') && p.interval === 'month')
    const yearlySavings = plan.interval === 'year' && monthlyPlan 
      ? calculateYearlySavings(monthlyPlan.price)
      : 0

    return (
      <div
        key={plan.id}
        className={`relative border rounded-2xl p-6 transition-all hover:shadow-lg ${
          plan.popular 
            ? 'border-primary shadow-md ring-2 ring-primary/20' 
            : 'border-border hover:border-primary/50'
        } ${isCurrent ? 'bg-primary/5' : 'bg-background'}`}
      >
        {/* Badge */}
        {(plan.popular || plan.badge) && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className={`px-4 py-1 text-xs font-medium rounded-full ${
              plan.popular 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
            }`}>
              {plan.badge || 'Most Popular'}
            </span>
          </div>
        )}

        {/* Plan Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            {plan.id === 'free' && <Gift className="h-8 w-8 text-green-500" />}
            {plan.id === 'member' && <Users className="h-8 w-8 text-blue-500" />}
            {(plan.id === 'scholar' || plan.id === 'scholar-annual') && <Crown className="h-8 w-8 text-yellow-500" />}
          </div>
          
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {plan.name}
          </h3>
          <p className="-foreground text-sm mb-4">
            {plan.description}
          </p>
          
          <div className="mb-4">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-3xl font-bold text-foreground">
                {formatPrice(plan.price, plan.currency)}
              </span>
              {plan.price > 0 && (
                <span className="-foreground text-sm">
                  /{plan.interval}
                </span>
              )}
            </div>
            
            {yearlySavings > 0 && (
              <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">
                Save ${yearlySavings.toFixed(0)} per year
              </p>
            )}
            
            {currentSubscription?.trialEnd && plan.id === currentSubscription.planId && (
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                Trial ends {new Date(currentSubscription.trialEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
          
          {plan.limitations && plan.limitations.map((limitation, index) => (
            <div key={index} className="flex items-start gap-3 opacity-60">
              <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm line-through">{limitation}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          {isCurrent ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
                <Check className="h-4 w-4" />
                Current Plan
              </div>
              <Link
                href="/dashboard/billing"
                className="text-sm hover:text-foreground transition-colors"
              >
                Manage subscription
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => onSelectPlan(plan.id, plan.interval)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                    : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
                }`}
              >
                {!isLoggedIn 
                  ? 'Sign Up'
                  : isUpgrade 
                    ? `Upgrade to ${plan.name}` 
                    : plan.price === 0 
                      ? 'Get Started' 
                      : 'Choose Plan'
                }
              </button>
              
              {/* Free Trial for Premium Plans */}
              {plan.price > 0 && onStartTrial && !currentSubscription && (
                <button
                  onClick={() => onStartTrial(plan.id)}
                  className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Start 14-day free trial
                </button>
              )}
            </>
          )}
        </div>

        {/* Popular plan highlight */}
        {plan.popular && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
          Choose Your Learning Journey
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Join thousands of leaders exploring missional church renewal and leadership development
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-muted rounded-lg p-1 flex">
          <button
            onClick={() => {
              setSelectedInterval('month')
              setIsAnnual(false)
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedInterval === 'month'
                ? 'bg-background text-foreground shadow-sm'
                : '-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => {
              setSelectedInterval('year')
              setIsAnnual(true)
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedInterval === 'year'
                ? 'bg-background text-foreground shadow-sm'
                : '-foreground hover:text-foreground'
            }`}
          >
            Annual
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">
              Save 33%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredPlans.map(renderPlanCard)}
      </div>

      {/* Additional Info */}
      <div className="bg-muted/50 rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
          Questions about our plans?
        </h3>
        <p className="-foreground mb-6">
          We're here to help you find the right learning path for your ministry journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="btn-outline flex items-center gap-2"
          >
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/faq"
            className="btn-primary"
          >
            View FAQ
          </Link>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>1000+ satisfied members</span>
          </div>
        </div>
      </div>
    </div>
  )
}
