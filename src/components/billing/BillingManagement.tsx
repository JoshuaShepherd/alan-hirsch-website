'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Calendar, Download, AlertCircle, CheckCircle, Clock, X } from 'lucide-react'

interface Subscription {
  id: string
  plan: {
    name: string
    price: number
    currency: string
    interval: 'month' | 'year'
  }
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

interface PaymentMethod {
  id: string
  type: 'card'
  card: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
  isDefault: boolean
}

interface Invoice {
  id: string
  number: string
  status: 'paid' | 'pending' | 'failed'
  amount: number
  currency: string
  date: string
  downloadUrl: string
  description: string
}

interface BillingManagementProps {
  subscription: Subscription | null
  paymentMethods: PaymentMethod[]
  invoices: Invoice[]
  onUpdatePaymentMethod: (paymentMethodId: string) => void
  onCancelSubscription: () => void
  onResumeSubscription: () => void
  onUpdateSubscriptionPlan: (planId: string) => void
}

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic Access',
    price: 9.99,
    interval: 'month' as const,
    features: [
      'Access to all free content',
      'Monthly newsletter',
      'Basic community access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    price: 24.99,
    interval: 'month' as const,
    features: [
      'All Basic features',
      'Full access to paid books',
      'Exclusive video content',
      'Priority support',
      'Advanced community features'
    ]
  },
  {
    id: 'premium-annual',
    name: 'Premium Annual',
    price: 249.99,
    interval: 'year' as const,
    features: [
      'All Premium features',
      '2 months free',
      'Annual planning resources',
      'Direct access to Alan for Q&A sessions'
    ]
  }
]

export function BillingManagement({
  subscription,
  paymentMethods,
  invoices,
  onUpdatePaymentMethod,
  onCancelSubscription,
  onResumeSubscription,
  onUpdateSubscriptionPlan
}: BillingManagementProps) {
  const [activeTab, setActiveTab] = useState('subscription')
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'past_due':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
      case 'unpaid':
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
      case 'past_due':
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'cancelled':
      case 'unpaid':
      case 'failed':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
      default:
        return '-foreground bg-muted'
    }
  }

  const renderSubscriptionTab = () => (
    <div className="space-y-8">
      {/* Current Subscription */}
      {subscription ? (
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Current Subscription
              </h3>
              <div className="flex items-center gap-2">
                {getStatusIcon(subscription.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(subscription.status)}`}>
                  {subscription.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-2xl text-foreground">
                {formatAmount(subscription.plan.price)}
                <span className="text-sm font-normal">
                  /{subscription.plan.interval}
                </span>
              </p>
              <p className="text-sm">{subscription.plan.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium">Current Period</p>
              <p className="text-foreground">
                {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Next Billing Date</p>
              <p className="text-foreground">
                {subscription.cancelAtPeriodEnd ? 'Cancelled' : formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {subscription.cancelAtPeriodEnd ? (
              <button
                onClick={onResumeSubscription}
                className="btn-primary flex items-center gap-2"
              >
                Resume Subscription
              </button>
            ) : (
              <>
                <button
                  onClick={() => setSelectedPlan(subscription.plan.name)}
                  className="btn-outline flex items-center gap-2"
                >
                  Change Plan
                </button>
                <button
                  onClick={() => setShowCancelDialog(true)}
                  className="btn-outline text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  Cancel Subscription
                </button>
              </>
            )}
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Your subscription is set to cancel on {formatDate(subscription.currentPeriodEnd)}. 
                You'll continue to have access until then.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-border rounded-lg p-6 text-center">
          <p className="-foreground mb-4">You don't have an active subscription</p>
          <button
            onClick={() => setSelectedPlan('premium')}
            className="btn-primary"
          >
            Choose a Plan
          </button>
        </div>
      )}

      {/* Plan Comparison */}
      {(selectedPlan || !subscription) && (
        <div className="space-y-6">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Choose Your Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 ${
                  plan.id === selectedPlan
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="text-center mb-6">
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                    {plan.name}
                  </h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      {formatAmount(plan.price)}
                    </span>
                    <span className="-foreground">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onUpdateSubscriptionPlan(plan.id)}
                  className={`w-full ${
                    plan.id === selectedPlan ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {subscription?.plan.name === plan.name ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderPaymentMethodsTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Payment Methods
        </h3>
        <button className="btn-primary">Add Payment Method</button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8" />
                  <div>
                    <p className="font-medium text-foreground">
                      {method.card.brand.toUpperCase()} •••• {method.card.last4}
                    </p>
                    <p className="text-sm">
                      Expires {method.card.expMonth}/{method.card.expYear}
                      {method.isDefault && <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Default</span>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => onUpdatePaymentMethod(method.id)}
                      className="btn-outline text-sm"
                    >
                      Make Default
                    </button>
                  )}
                  <button className="btn-outline text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <CreditCard className="h-12 w-12 mx-auto mb-4" />
          <p className="-foreground mb-4">No payment methods on file</p>
          <button className="btn-primary">Add Your First Payment Method</button>
        </div>
      )}
    </div>
  )

  const renderInvoicesTab = () => (
    <div className="space-y-8">
      <h3 className="font-display text-xl font-semibold text-foreground">
        Billing History
      </h3>

      {invoices.length > 0 ? (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border border-border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">Invoice #{invoice.number}</p>
                    {getStatusIcon(invoice.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-sm">{invoice.description}</p>
                  <p className="text-sm">{formatDate(invoice.date)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-lg text-foreground">
                    {formatAmount(invoice.amount, invoice.currency)}
                  </p>
                  <button
                    onClick={() => window.open(invoice.downloadUrl, '_blank')}
                    className="btn-outline flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <p className="-foreground">No billing history available</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Billing & Subscription</h1>
        <p className="-foreground mt-1">Manage your subscription, payment methods, and billing history</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'subscription', label: 'Subscription', icon: CheckCircle },
            { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
            { id: 'invoices', label: 'Billing History', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'subscription' && renderSubscriptionTab()}
      {activeTab === 'payment-methods' && renderPaymentMethodsTab()}
      {activeTab === 'invoices' && renderInvoicesTab()}

      {/* Cancel Subscription Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Cancel Subscription
              </h3>
            </div>
            <p className="-foreground mb-6">
              Are you sure you want to cancel your subscription? You'll continue to have access 
              until the end of your current billing period.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="btn-outline flex-1"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  onCancelSubscription()
                  setShowCancelDialog(false)
                }}
                className="btn-outline text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 flex-1"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
