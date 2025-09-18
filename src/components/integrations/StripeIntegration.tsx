'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  TrendingUp, 
  ExternalLink, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  RefreshCw,
  Download,
  Filter,
  Eye,
  ShoppingCart,
  Wallet,
  Receipt,
  Globe,
  Calendar
} from 'lucide-react'

interface StripeProduct {
  id: string
  name: string
  description?: string
  type: 'service' | 'good'
  active: boolean
  default_price: {
    id: string
    unit_amount: number
    currency: string
    recurring?: {
      interval: 'month' | 'year'
      interval_count: number
    }
  }
  images: string[]
  metadata: Record<string, string>
  created: number
  updated: number
}

interface StripeCustomer {
  id: string
  email: string
  name?: string
  phone?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
  created: number
  balance: number
  currency: string
  delinquent: boolean
  invoice_prefix?: string
  default_source?: string
  subscriptions: StripeSubscription[]
  total_spent: number
}

interface StripeSubscription {
  id: string
  customer: string
  status: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing'
  current_period_start: number
  current_period_end: number
  plan: {
    id: string
    nickname?: string
    amount: number
    currency: string
    interval: 'month' | 'year'
    interval_count: number
  }
  quantity: number
  trial_start?: number
  trial_end?: number
  canceled_at?: number
  cancel_at_period_end: boolean
  metadata: Record<string, string>
}

interface StripePayment {
  id: string
  amount: number
  amount_received: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
  customer?: string
  description?: string
  receipt_email?: string
  payment_method_types: string[]
  created: number
  metadata: Record<string, string>
  invoice?: string
  subscription?: string
  application_fee_amount?: number
  transfer_destination?: string
}

interface StripeAnalytics {
  period: string
  total_revenue: number
  total_customers: number
  total_subscriptions: number
  new_customers: number
  churned_customers: number
  mrr: number // Monthly Recurring Revenue
  arr: number // Annual Recurring Revenue
  churn_rate: number
  ltv: number // Customer Lifetime Value
  payment_success_rate: number
  top_products: Array<{
    product_id: string
    name: string
    revenue: number
    sales_count: number
  }>
  revenue_by_country: Array<{
    country: string
    revenue: number
    customers: number
  }>
  subscription_metrics: {
    active: number
    trial: number
    past_due: number
    canceled: number
  }
}

const SAMPLE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_speaking_engagement',
    name: 'Speaking Engagement',
    description: 'Keynote speaking for conferences and events',
    type: 'service',
    active: true,
    default_price: {
      id: 'price_speaking_standard',
      unit_amount: 750000, // $7,500
      currency: 'usd'
    },
    images: [],
    metadata: {
      category: 'speaking',
      duration: '60-90 minutes',
      travel_included: 'domestic'
    },
    created: 1640995200,
    updated: 1640995200
  },
  {
    id: 'prod_book_signed',
    name: 'Signed Book Collection',
    description: 'Complete collection of Alan Hirsch\'s books with personal signatures',
    type: 'good',
    active: true,
    default_price: {
      id: 'price_book_collection',
      unit_amount: 29900, // $299
      currency: 'usd'
    },
    images: ['/images/books/collection.jpg'],
    metadata: {
      category: 'books',
      includes: 'all_titles',
      shipping: 'worldwide'
    },
    created: 1640995200,
    updated: 1640995200
  },
  {
    id: 'prod_coaching_monthly',
    name: 'Monthly Leadership Coaching',
    description: 'One-on-one leadership coaching sessions',
    type: 'service',
    active: true,
    default_price: {
      id: 'price_coaching_monthly',
      unit_amount: 50000, // $500
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1
      }
    },
    images: [],
    metadata: {
      category: 'coaching',
      duration: '1 hour',
      format: 'video_call'
    },
    created: 1640995200,
    updated: 1640995200
  },
  {
    id: 'prod_workshop_access',
    name: 'Annual Workshop Access',
    description: 'Full access to all online workshops for one year',
    type: 'service',
    active: true,
    default_price: {
      id: 'price_workshop_annual',
      unit_amount: 39900, // $399
      currency: 'usd',
      recurring: {
        interval: 'year',
        interval_count: 1
      }
    },
    images: [],
    metadata: {
      category: 'education',
      access_level: 'premium',
      includes: 'all_workshops'
    },
    created: 1640995200,
    updated: 1640995200
  }
]

const SAMPLE_CUSTOMERS: StripeCustomer[] = [
  {
    id: 'cus_church_leader_001',
    email: 'pastor.johnson@gracechurch.org',
    name: 'Michael Johnson',
    phone: '+1-555-0123',
    address: {
      line1: '123 Church Street',
      city: 'Austin',
      state: 'TX',
      postal_code: '78701',
      country: 'US'
    },
    created: 1640995200,
    balance: 0,
    currency: 'usd',
    delinquent: false,
    subscriptions: [
      {
        id: 'sub_coaching_001',
        customer: 'cus_church_leader_001',
        status: 'active',
        current_period_start: 1672531200,
        current_period_end: 1675209600,
        plan: {
          id: 'price_coaching_monthly',
          nickname: 'Monthly Coaching',
          amount: 50000,
          currency: 'usd',
          interval: 'month',
          interval_count: 1
        },
        quantity: 1,
        cancel_at_period_end: false,
        metadata: {
          started_date: '2023-01-01',
          referral_source: 'conference'
        }
      }
    ],
    total_spent: 150000 // $1,500
  },
  {
    id: 'cus_seminary_002',
    email: 'admissions@faithseminary.edu',
    name: 'Faith Seminary',
    created: 1641081600,
    balance: 0,
    currency: 'usd',
    delinquent: false,
    subscriptions: [
      {
        id: 'sub_workshop_002',
        customer: 'cus_seminary_002',
        status: 'active',
        current_period_start: 1672531200,
        current_period_end: 1704067200,
        plan: {
          id: 'price_workshop_annual',
          nickname: 'Annual Workshop Access',
          amount: 39900,
          currency: 'usd',
          interval: 'year',
          interval_count: 1
        },
        quantity: 1,
        cancel_at_period_end: false,
        metadata: {
          organization_type: 'educational',
          students_count: '250'
        }
      }
    ],
    total_spent: 79800 // $798
  }
]

const SAMPLE_PAYMENTS: StripePayment[] = [
  {
    id: 'pi_speaking_austin_001',
    amount: 750000,
    amount_received: 750000,
    currency: 'usd',
    status: 'succeeded',
    customer: 'cus_conference_org',
    description: 'Speaking engagement - Austin Conference 2024',
    receipt_email: 'events@austinconf.org',
    payment_method_types: ['card'],
    created: 1704067200,
    metadata: {
      event_date: '2024-03-15',
      location: 'Austin, TX',
      attendees: '500'
    }
  },
  {
    id: 'pi_coaching_jan_001',
    amount: 50000,
    amount_received: 50000,
    currency: 'usd',
    status: 'succeeded',
    customer: 'cus_church_leader_001',
    description: 'Monthly Leadership Coaching - January 2024',
    payment_method_types: ['card'],
    created: 1704153600,
    subscription: 'sub_coaching_001',
    metadata: {
      session_date: '2024-01-15',
      duration: '60_minutes'
    }
  },
  {
    id: 'pi_books_collection_001',
    amount: 29900,
    amount_received: 29900,
    currency: 'usd',
    status: 'succeeded',
    description: 'Signed Book Collection',
    receipt_email: 'reader@email.com',
    payment_method_types: ['card'],
    created: 1703980800,
    metadata: {
      shipping_method: 'express',
      gift_message: 'Happy New Year!'
    }
  }
]

const SAMPLE_ANALYTICS: StripeAnalytics = {
  period: '2024-01',
  total_revenue: 1249500, // $12,495
  total_customers: 247,
  total_subscriptions: 89,
  new_customers: 23,
  churned_customers: 3,
  mrr: 45670, // $456.70
  arr: 548040, // $5,480.40
  churn_rate: 3.4,
  ltv: 1850.50,
  payment_success_rate: 96.8,
  top_products: [
    {
      product_id: 'prod_speaking_engagement',
      name: 'Speaking Engagement',
      revenue: 675000,
      sales_count: 9
    },
    {
      product_id: 'prod_workshop_access',
      name: 'Annual Workshop Access',
      revenue: 279300,
      sales_count: 7
    },
    {
      product_id: 'prod_coaching_monthly',
      name: 'Monthly Leadership Coaching',
      revenue: 200000,
      sales_count: 4
    },
    {
      product_id: 'prod_book_signed',
      name: 'Signed Book Collection',
      revenue: 95200,
      sales_count: 32
    }
  ],
  revenue_by_country: [
    { country: 'United States', revenue: 924500, customers: 189 },
    { country: 'Canada', revenue: 156700, customers: 31 },
    { country: 'Australia', revenue: 89300, customers: 18 },
    { country: 'United Kingdom', revenue: 79000, customers: 9 }
  ],
  subscription_metrics: {
    active: 76,
    trial: 8,
    past_due: 3,
    canceled: 2
  }
}

export default function StripeIntegration() {
  const [products, setProducts] = useState<StripeProduct[]>(SAMPLE_PRODUCTS)
  const [customers, setCustomers] = useState<StripeCustomer[]>(SAMPLE_CUSTOMERS)
  const [payments, setPayments] = useState<StripePayment[]>(SAMPLE_PAYMENTS)
  const [analytics, setAnalytics] = useState<StripeAnalytics>(SAMPLE_ANALYTICS)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'processing':
      case 'trialing':
        return 'bg-blue-100 text-blue-800'
      case 'requires_action':
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      case 'canceled':
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Stripe Payment Processing</span>
          </CardTitle>
          <CardDescription>
            Comprehensive payment management for speaking, coaching, and product sales
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Revenue Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analytics.total_revenue)}</p>
                <p className="text-xs text-green-600">+12.5% vs last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analytics.mrr)}</p>
                <p className="text-xs text-blue-600">+8.3% vs last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold">{analytics.total_customers}</p>
                <p className="text-xs text-purple-600">+{analytics.new_customers} this month</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{analytics.payment_success_rate}%</p>
                <p className="text-xs text-orange-600">Payment success</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Products by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.top_products.map((product, index) => (
                    <div key={product.product_id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.sales_count} sales</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(product.revenue)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Country */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.revenue_by_country.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{country.country}</div>
                          <div className="text-sm text-gray-600">{country.customers} customers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(country.revenue)}</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(country.revenue / analytics.total_revenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subscription Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">{analytics.subscription_metrics.active}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{analytics.subscription_metrics.trial}</div>
                    <div className="text-sm text-gray-600">Trial</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">{analytics.subscription_metrics.past_due}</div>
                    <div className="text-sm text-gray-600">Past Due</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">{analytics.subscription_metrics.canceled}</div>
                    <div className="text-sm text-gray-600">Canceled</div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Churn Rate</span>
                    <span className="font-medium">{analytics.churn_rate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer LTV</span>
                    <span className="font-medium">${analytics.ltv.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Annual Recurring Revenue</span>
                    <span className="font-medium">{formatCurrency(analytics.arr)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create New Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Receipt className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Process Refund
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Products & Services</h3>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant={product.active ? 'default' : 'secondary'}>
                          {product.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          {product.type}
                        </Badge>
                      </div>
                      
                      {product.description && (
                        <p className="text-gray-600">{product.description}</p>
                      )}

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{formatCurrency(product.default_price.unit_amount, product.default_price.currency)}</span>
                          {product.default_price.recurring && (
                            <span>/ {product.default_price.recurring.interval}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(product.created)}</span>
                        </div>
                      </div>

                      {Object.keys(product.metadata).length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Product Details</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(product.metadata).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Product
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Management</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-blue-600">
                            {customer.name ? customer.name.charAt(0) : customer.email.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{customer.name || 'Anonymous'}</h3>
                          <p className="text-gray-600 text-sm">{customer.email}</p>
                        </div>
                        {customer.delinquent && (
                          <Badge variant="destructive">Delinquent</Badge>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Customer Since:</span>
                          <div className="font-medium">{formatDate(customer.created)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Spent:</span>
                          <div className="font-medium text-green-600">{formatCurrency(customer.total_spent)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Active Subscriptions:</span>
                          <div className="font-medium">{customer.subscriptions.filter(s => s.status === 'active').length}</div>
                        </div>
                      </div>

                      {customer.address && (
                        <div className="text-sm">
                          <span className="text-gray-600">Address:</span>
                          <div className="font-medium">
                            {customer.address.line1}
                            {customer.address.line2 && `, ${customer.address.line2}`}
                            <br />
                            {customer.address.city}, {customer.address.state} {customer.address.postal_code}
                            <br />
                            {customer.address.country}
                          </div>
                        </div>
                      )}

                      {customer.subscriptions.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Subscriptions</h4>
                          <div className="space-y-2">
                            {customer.subscriptions.map((subscription) => (
                              <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium">{subscription.plan.nickname || 'Subscription'}</div>
                                  <div className="text-sm text-gray-600">
                                    {formatCurrency(subscription.plan.amount)} / {subscription.plan.interval}
                                  </div>
                                </div>
                                <Badge className={getStatusColor(subscription.status)}>
                                  {subscription.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Receipt className="h-4 w-4 mr-2" />
                        Invoices
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Payments</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                          <div className="text-sm text-gray-600">
                            {payment.description || 'Payment'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(payment.created)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="capitalize">{payment.payment_method_types.join(', ')}</span>
                        </div>
                        {payment.customer && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{payment.customer}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Subscription Management</h3>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Create Subscription
            </Button>
          </div>

          <div className="grid gap-6">
            {customers.flatMap(customer => 
              customer.subscriptions.map(subscription => (
                <Card key={subscription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{subscription.plan.nickname || 'Subscription'}</h3>
                            <p className="text-gray-600 text-sm">Customer: {customer.name || customer.email}</p>
                          </div>
                          <Badge className={getStatusColor(subscription.status)}>
                            {subscription.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <div className="font-medium">
                              {formatCurrency(subscription.plan.amount)} / {subscription.plan.interval}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Current Period:</span>
                            <div className="font-medium">
                              {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Quantity:</span>
                            <div className="font-medium">{subscription.quantity}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Auto-renewal:</span>
                            <div className="font-medium">
                              {subscription.cancel_at_period_end ? 'Disabled' : 'Enabled'}
                            </div>
                          </div>
                        </div>

                        {subscription.trial_end && (
                          <div className="p-3 bg-blue-50 rounded text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-800">
                                Trial ends on {formatDate(subscription.trial_end)}
                              </span>
                            </div>
                          </div>
                        )}

                        {subscription.cancel_at_period_end && (
                          <div className="p-3 bg-yellow-50 rounded text-sm">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <span className="text-yellow-800">
                                Subscription will cancel at the end of current period
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Modify
                        </Button>
                        {!subscription.cancel_at_period_end ? (
                          <Button variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
