import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, Users, Crown, Gift, ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Membership & Pricing - Alan Hirsch',
  description: 'Choose your learning journey with our flexible membership plans designed for missional leaders worldwide.',
  keywords: ['membership', 'pricing', 'subscription', 'missional church', 'leadership development', 'APEST'],
}

export default function Membership() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg mb-6 text-foreground">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl mb-8 leading-relaxed text-foreground/80">
            Join thousands of leaders exploring missional church renewal and leadership development
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1 mb-12">
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-background text-foreground shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground flex items-center gap-2">
              Annual
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">
                Save 33%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Explorer Plan */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">Explorer</h3>
                <p className="text-card-foreground/70 text-sm mb-4">Perfect for getting started with Alan's teachings</p>
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-card-foreground">Free</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Access to selected free articles',
                  'Monthly newsletter',
                  'Basic community access',
                  'Public discussion participation',
                  'Mobile app access'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 px-4 rounded-lg font-medium bg-muted text-foreground hover:bg-muted/80 border border-border transition-all">
                Get Started Free
              </button>
            </div>

            {/* Member Plan */}
            <div className="bg-card border-2 border-primary rounded-2xl p-6 hover:shadow-lg transition-all relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 text-xs font-medium rounded-full">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">Member</h3>
                <p className="text-card-foreground/70 text-sm mb-4">Essential access to Alan's growing library</p>
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-card-foreground">$14.99</span>
                  <span className="text-card-foreground/70 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Explorer',
                  'Full access to 3 complete books',
                  'Weekly exclusive articles',
                  'Member-only discussion forums',
                  'Downloadable resources',
                  'Email support',
                  'Mobile offline reading'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 px-4 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all">
                Start Free Trial
              </button>
            </div>

            {/* Scholar Plan */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">Scholar</h3>
                <p className="text-card-foreground/70 text-sm mb-4">Complete access plus exclusive learning opportunities</p>
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-card-foreground">$29.99</span>
                  <span className="text-card-foreground/70 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Member',
                  'Access to ALL books and content',
                  'Exclusive video content library',
                  'Monthly live Q&A sessions with Alan',
                  'Advanced search and note-taking',
                  'Priority support',
                  'Early access to new releases',
                  'Study guides and discussion materials'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 px-4 rounded-lg font-medium bg-muted text-foreground hover:bg-muted/80 border border-border transition-all">
                Choose Scholar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="section-padding bg-section">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-center mb-12 text-foreground">
            Compare Plans & Features
          </h2>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-card-foreground">Feature</th>
                    <th className="text-center p-4 font-medium text-card-foreground">Explorer</th>
                    <th className="text-center p-4 font-medium text-card-foreground">Member</th>
                    <th className="text-center p-4 font-medium text-card-foreground">Scholar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Free Articles', true, true, true],
                    ['Newsletter', true, true, true],
                    ['Complete Books Access', false, '3 Books', 'All Books'],
                    ['Video Library', false, false, true],
                    ['Live Q&A Sessions', false, false, true],
                    ['Priority Support', false, false, true],
                    ['Study Guides', false, true, true],
                    ['Early Access', false, false, true]
                  ].map(([feature, explorer, member, scholar], index) => (
                    <tr key={index}>
                      <td className="p-4 text-card-foreground font-medium">{feature}</td>
                      <td className="p-4 text-center">
                        {typeof explorer === 'boolean' ? (
                          explorer ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : '—'
                        ) : explorer}
                      </td>
                      <td className="p-4 text-center">
                        {typeof member === 'boolean' ? (
                          member ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : '—'
                        ) : member}
                      </td>
                      <td className="p-4 text-center">
                        {typeof scholar === 'boolean' ? (
                          scholar ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : '—'
                        ) : scholar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-center mb-12 text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: 'Can I switch plans at any time?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all paid plans come with a 14-day free trial. You can cancel anytime during the trial period without being charged.'
              },
              {
                question: 'What happens if I cancel?',
                answer: 'You\'ll continue to have access to your current plan until the end of your billing period. After that, you\'ll be moved to the free Explorer plan.'
              },
              {
                question: 'Are there any setup fees?',
                answer: 'No setup fees, no hidden costs. The price you see is what you pay, and you can cancel anytime.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">
                  {faq.question}
                </h3>
                <p className="text-card-foreground/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-section">
        <div className="max-w-content mx-auto px-6 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-6 w-6 text-yellow-500 mb-2" />
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-6 w-6 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Instant access</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 text-purple-500 mb-2" />
              <span className="text-sm font-medium">8,900+ members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-foreground">
            Ready to start your learning journey?
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Join thousands of leaders who are already part of the movement
          </p>
          <Link 
            href="/auth/signup" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
