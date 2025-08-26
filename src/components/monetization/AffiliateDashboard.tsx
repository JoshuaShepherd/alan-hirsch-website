'use client'

import { useState } from 'react'
import { TrendingUp, Users, DollarSign, Link as LinkIcon, Copy, Eye, Share2, Download, Calendar, Award, Target, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface AffiliateStat {
  label: string
  value: string | number
  change?: string
  icon: React.ReactNode
}

interface AffiliateLink {
  id: string
  productName: string
  productType: 'subscription' | 'book' | 'course' | 'donation'
  commission: number
  clicks: number
  conversions: number
  earnings: number
  link: string
}

interface AffiliateCommission {
  id: string
  date: string
  productName: string
  type: 'sale' | 'subscription' | 'renewal'
  amount: number
  status: 'pending' | 'approved' | 'paid'
  referredUser?: string
}

interface AffiliateProgram {
  id: string
  name: string
  description: string
  commission: number
  cookieDuration: number
  minimumPayout: number
  paymentSchedule: string
  resources: string[]
}

interface AffiliateDashboardProps {
  stats: AffiliateStat[]
  links: AffiliateLink[]
  commissions: AffiliateCommission[]
  programs: AffiliateProgram[]
  onGenerateLink: (productId: string, campaignName?: string) => string
  onWithdrawEarnings: () => void
}

const SAMPLE_STATS: AffiliateStat[] = [
  {
    label: 'Total Earnings',
    value: '$1,247.50',
    change: '+12.5%',
    icon: <DollarSign className="h-5 w-5 text-green-500" />
  },
  {
    label: 'This Month',
    value: '$342.80',
    change: '+8.2%',
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />
  },
  {
    label: 'Total Clicks',
    value: '2,847',
    change: '+15.3%',
    icon: <Eye className="h-5 w-5 text-purple-500" />
  },
  {
    label: 'Conversions',
    value: '47',
    change: '+6.1%',
    icon: <Target className="h-5 w-5 text-orange-500" />
  }
]

const SAMPLE_LINKS: AffiliateLink[] = [
  {
    id: '1',
    productName: 'Premium Membership',
    productType: 'subscription',
    commission: 30,
    clicks: 156,
    conversions: 12,
    earnings: 214.80,
    link: 'https://alanhirsch.com/subscribe?ref=affiliate123'
  },
  {
    id: '2',
    productName: 'The Forgotten Ways (Digital)',
    productType: 'book',
    commission: 40,
    clicks: 89,
    conversions: 8,
    earnings: 63.92,
    link: 'https://alanhirsch.com/books/forgotten-ways?ref=affiliate123'
  },
  {
    id: '3',
    productName: 'APEST Masterclass',
    productType: 'course',
    commission: 25,
    clicks: 234,
    conversions: 6,
    earnings: 295.50,
    link: 'https://alanhirsch.com/courses/apest?ref=affiliate123'
  }
]

const SAMPLE_PROGRAMS: AffiliateProgram[] = [
  {
    id: 'subscriptions',
    name: 'Subscription Referrals',
    description: 'Earn recurring commissions for subscription referrals',
    commission: 30,
    cookieDuration: 60,
    minimumPayout: 50,
    paymentSchedule: 'Monthly',
    resources: [
      'Email templates',
      'Social media graphics',
      'Banner ads (various sizes)',
      'Product descriptions'
    ]
  },
  {
    id: 'digital-products',
    name: 'Digital Products',
    description: 'Promote books, courses, and resources',
    commission: 40,
    cookieDuration: 30,
    minimumPayout: 50,
    paymentSchedule: 'Monthly',
    resources: [
      'Book cover images',
      'Course preview videos',
      'Sample chapters',
      'Review quotes'
    ]
  },
  {
    id: 'donations',
    name: 'Donation Program',
    description: 'Special program for ministry partners',
    commission: 15,
    cookieDuration: 90,
    minimumPayout: 25,
    paymentSchedule: 'Quarterly',
    resources: [
      'Mission statements',
      'Impact reports',
      'Donor testimonials',
      'Ministry updates'
    ]
  }
]

export function AffiliateDashboard({
  stats = SAMPLE_STATS,
  links = SAMPLE_LINKS,
  commissions = [],
  programs = SAMPLE_PROGRAMS,
  onGenerateLink,
  onWithdrawEarnings
}: AffiliateDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [campaignName, setCampaignName] = useState<string>('')
  const [copiedLink, setCopiedLink] = useState<string>('')

  const totalEarnings = stats.find(s => s.label === 'Total Earnings')?.value
  const pendingEarnings = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0)

  const copyToClipboard = async (text: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(linkId)
      setTimeout(() => setCopiedLink(''), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const getConversionRate = (clicks: number, conversions: number) => {
    if (clicks === 0) return '0%'
    return `${((conversions / clicks) * 100).toFixed(1)}%`
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {stat.change && (
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Ready to withdraw?
            </h3>
            <p className="-foreground">
              You have ${pendingEarnings.toFixed(2)} in pending earnings ready for withdrawal.
            </p>
          </div>
          <button
            onClick={onWithdrawEarnings}
            disabled={pendingEarnings < 50}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* Top Performing Links */}
      <div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
          Top Performing Links
        </h3>
        <div className="space-y-4">
          {links.slice(0, 3).map((link) => (
            <div key={link.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{link.productName}</h4>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {link.commission}% commission
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <span className="-foreground">Clicks</span>
                  <p className="font-medium text-foreground">{link.clicks}</p>
                </div>
                <div>
                  <span className="-foreground">Conversions</span>
                  <p className="font-medium text-foreground">{link.conversions}</p>
                </div>
                <div>
                  <span className="-foreground">Rate</span>
                  <p className="font-medium text-foreground">
                    {getConversionRate(link.clicks, link.conversions)}
                  </p>
                </div>
                <div>
                  <span className="-foreground">Earnings</span>
                  <p className="font-medium text-foreground">${link.earnings.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(link.link, link.id)}
                  className="btn-outline text-sm flex items-center gap-2"
                >
                  {copiedLink === link.id ? (
                    <>Copied!</>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy Link
                    </>
                  )}
                </button>
                <button className="btn-outline text-sm flex items-center gap-2">
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLinksTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Affiliate Links
        </h3>
        <button className="btn-primary mt-4 md:mt-0">
          Generate New Link
        </button>
      </div>

      {/* Link Generator */}
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Quick Link Generator</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select Product/Program</option>
            <option value="premium">Premium Membership</option>
            <option value="scholar">Scholar Membership</option>
            <option value="forgotten-ways">The Forgotten Ways</option>
            <option value="apest-course">APEST Masterclass</option>
          </select>
          
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Campaign name (optional)"
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          
          <button
            onClick={() => selectedProgram && onGenerateLink(selectedProgram, campaignName)}
            disabled={!selectedProgram}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Link
          </button>
        </div>
      </div>

      {/* Existing Links */}
      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">{link.productName}</h4>
                <p className="text-sm capitalize">{link.productType}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {link.commission}% commission
                </span>
                <span className="px-2 py-1 bg-muted text-xs rounded-full">
                  {getConversionRate(link.clicks, link.conversions)} rate
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Eye className="h-4 w-4 mx-auto mb-1" />
                <p className="font-semibold text-foreground">{link.clicks}</p>
                <p className="text-xs">Clicks</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Target className="h-4 w-4 mx-auto mb-1" />
                <p className="font-semibold text-foreground">{link.conversions}</p>
                <p className="text-xs">Conversions</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-4 w-4 mx-auto mb-1" />
                <p className="font-semibold text-foreground">
                  {getConversionRate(link.clicks, link.conversions)}
                </p>
                <p className="text-xs">Rate</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <p className="font-semibold text-green-600 dark:text-green-400">
                  ${link.earnings.toFixed(2)}
                </p>
                <p className="text-xs">Earned</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-sm font-mono text-foreground break-all">{link.link}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(link.link, link.id)}
                className="btn-outline text-sm flex items-center gap-2"
              >
                {copiedLink === link.id ? (
                  <>Copied!</>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy Link
                  </>
                )}
              </button>
              <button className="btn-outline text-sm flex items-center gap-2">
                <Share2 className="h-3 w-3" />
                Share
              </button>
              <button className="btn-outline text-sm flex items-center gap-2">
                <Download className="h-3 w-3" />
                QR Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCommissionsTab = () => (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-semibold text-foreground">
        Commission History
      </h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-400">
              Total Paid
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            $1,247.50
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
              Pending
            </span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            $342.80
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-400">
              This Month
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            $89.20
          </p>
        </div>
      </div>

      {/* Commission Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Product</th>
                <th className="text-left p-4 font-medium text-foreground">Type</th>
                <th className="text-right p-4 font-medium text-foreground">Amount</th>
                <th className="text-center p-4 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissions.length > 0 ? (
                commissions.map((commission) => (
                  <tr key={commission.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4 text-sm text-foreground">
                      {new Date(commission.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-foreground">{commission.productName}</td>
                    <td className="p-4 text-sm capitalize">
                      {commission.type}
                    </td>
                    <td className="p-4 text-sm font-medium text-right text-foreground">
                      ${commission.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        commission.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : commission.status === 'approved'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {commission.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    No commissions yet. Start promoting to earn your first commission!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProgramsTab = () => (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-semibold text-foreground">
        Affiliate Programs
      </h3>

      <div className="space-y-6">
        {programs.map((program) => (
          <div key={program.id} className="border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {program.name}
                </h4>
                <p className="-foreground mb-3">{program.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{program.commission}%</span>
                <p className="text-sm">commission</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-4 w-4 mx-auto mb-1" />
                <p className="font-medium text-foreground">{program.cookieDuration} days</p>
                <p className="text-xs">Cookie Duration</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <DollarSign className="h-4 w-4 mx-auto mb-1" />
                <p className="font-medium text-foreground">${program.minimumPayout}</p>
                <p className="text-xs">Min. Payout</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-4 w-4 mx-auto mb-1" />
                <p className="font-medium text-foreground">{program.paymentSchedule}</p>
                <p className="text-xs">Payments</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-foreground mb-2">Marketing Resources:</h5>
              <div className="grid grid-cols-2 gap-2">
                {program.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <ChevronRight className="h-3 w-3 text-primary" />
                    {resource}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-primary text-sm">
                Get Started
              </button>
              <button className="btn-outline text-sm">
                View Resources
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 text-center">
        <Award className="h-8 w-8 text-primary mx-auto mb-3" />
        <h4 className="font-display text-lg font-semibold text-foreground mb-2">
          Ready to become an affiliate?
        </h4>
        <p className="-foreground mb-4">
          Join our affiliate program and start earning commissions by promoting resources
          that genuinely help missional leaders grow.
        </p>
        <button className="btn-primary">
          Apply Now
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Affiliate Dashboard</h1>
        <p className="-foreground mt-1">
          Track your performance and manage your affiliate links
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'links', label: 'My Links', icon: LinkIcon },
            { id: 'commissions', label: 'Commissions', icon: DollarSign },
            { id: 'programs', label: 'Programs', icon: Award },
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
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'links' && renderLinksTab()}
      {activeTab === 'commissions' && renderCommissionsTab()}
      {activeTab === 'programs' && renderProgramsTab()}
    </div>
  )
}
