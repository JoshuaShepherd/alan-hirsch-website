'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Calculator, TrendingUp, DollarSign, Users, Globe, Mail } from 'lucide-react'

interface ROICalculatorProps {
  onCalculationChange?: (results: CalculationResults) => void
  initialTargetSubscribers?: number
  initialMonthlyPrice?: number
  initialEstimatedVisitors?: number
  title?: string
  description?: string
}

interface CalculationResults {
  targetSubscribers: number
  monthlyPrice: number
  estimatedVisitors: number
  selectedModel: 'trailguide' | 'agency' | 'diy'
  results: {
    trailguide: ModelResults
    agency: ModelResults
    diy: ModelResults
  }
}

interface ModelResults {
  visitorsNeeded: number
  emailListNeeded: number
  buildCost: number
  monthlyFees: number
  revenue: number
  netROI: number
  conversionRate: number
  emailConversionRate: number
}

// Conversion assumptions
const CONVERSION_RATES = {
  trailguide: {
    siteToSubscriber: 0.025, // 2.5%
    emailToSubscriber: 0.07, // 7%
    visitorToEmail: 0.09 // 9%
  },
  agency: {
    siteToSubscriber: 0.01, // 1%
    emailToSubscriber: 0.03, // 3%
    visitorToEmail: 0.03 // 3%
  },
  diy: {
    siteToSubscriber: 0.01, // 1%
    emailToSubscriber: 0.03, // 3%
    visitorToEmail: 0.03 // 3%
  }
}

const PRICING_MODELS = {
  trailguide: {
    buildCost: 1000,
    monthlyBase: 0,
    revenueShare: 0.10,
    name: 'TrailGuide',
    description: 'Our optimized publishing stack'
  },
  agency: {
    buildCost: 75000, // Average of $50k-$100k
    monthlyBase: 500, // Hosting and maintenance
    revenueShare: 0,
    name: 'Custom Agency',
    description: 'Traditional agency development'
  },
  diy: {
    buildCost: 0,
    monthlyBase: 350, // Average of $200-$500
    revenueShare: 0,
    name: 'DIY SaaS',
    description: 'Self-service platform'
  }
}

export function ROICalculatorTool({ 
  onCalculationChange,
  initialTargetSubscribers = 1000,
  initialMonthlyPrice = 10,
  initialEstimatedVisitors = 50000,
  title = 'Publishing ROI Calculator',
  description = 'See how different publishing models compare in reaching your subscriber goals. Adjust the parameters below to see real-time ROI calculations.'
}: ROICalculatorProps) {
  const [targetSubscribers, setTargetSubscribers] = useState([initialTargetSubscribers])
  const [monthlyPrice, setMonthlyPrice] = useState([initialMonthlyPrice])
  const [estimatedVisitors, setEstimatedVisitors] = useState([initialEstimatedVisitors])
  const [selectedModel, setSelectedModel] = useState<'trailguide' | 'agency' | 'diy'>('trailguide')

  const calculateResults = useCallback((): CalculationResults => {
    const target = targetSubscribers[0]
    const price = monthlyPrice[0]
    const visitors = estimatedVisitors[0]

    const calculateModelResults = (modelKey: keyof typeof CONVERSION_RATES): ModelResults => {
      const rates = CONVERSION_RATES[modelKey]
      const pricing = PRICING_MODELS[modelKey]
      
      // Calculate visitors needed based on conversion funnel
      const visitorsNeeded = Math.ceil(target / rates.siteToSubscriber)
      
      // Calculate email list size needed
      const emailListNeeded = Math.ceil(target / rates.emailToSubscriber)
      
      // Calculate costs
      const buildCost = pricing.buildCost
      const monthlyRevenue = target * price
      const monthlyFees = pricing.monthlyBase + (monthlyRevenue * pricing.revenueShare)
      const annualFees = monthlyFees * 12
      
      // Calculate ROI (annual)
      const revenue = monthlyRevenue * 12
      const netROI = revenue - buildCost - annualFees
      
      return {
        visitorsNeeded,
        emailListNeeded,
        buildCost,
        monthlyFees,
        revenue: monthlyRevenue,
        netROI,
        conversionRate: rates.siteToSubscriber * 100,
        emailConversionRate: rates.emailToSubscriber * 100
      }
    }

    const results = {
      trailguide: calculateModelResults('trailguide'),
      agency: calculateModelResults('agency'),
      diy: calculateModelResults('diy')
    }

    const calculationResults: CalculationResults = {
      targetSubscribers: target,
      monthlyPrice: price,
      estimatedVisitors: visitors,
      selectedModel,
      results
    }

    onCalculationChange?.(calculationResults)
    return calculationResults
  }, [targetSubscribers, monthlyPrice, estimatedVisitors, selectedModel, onCalculationChange])

  const results = calculateResults()

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)

  const formatNumber = (number: number) => 
    new Intl.NumberFormat('en-US').format(number)

  const getModelCard = (modelKey: keyof typeof results.results) => {
    const modelResults = results.results[modelKey]
    const modelInfo = PRICING_MODELS[modelKey]
    const isSelected = selectedModel === modelKey
    const visitorGap = modelResults.visitorsNeeded - estimatedVisitors[0]
    const canAchieveGoal = visitorGap <= 0

    return (
      <Card 
        key={modelKey}
        className={`cursor-pointer transition-all duration-200 ${
          isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={() => setSelectedModel(modelKey)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{modelInfo.name}</CardTitle>
            {canAchieveGoal ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                Achievable
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Need {formatNumber(Math.abs(visitorGap))} more visitors
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{modelInfo.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                Visitors Needed
              </div>
              <div className="text-lg font-semibold">
                {formatNumber(modelResults.visitorsNeeded)}
              </div>
              <div className="text-xs text-muted-foreground">
                {modelResults.conversionRate.toFixed(1)}% conversion
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                Email List Needed
              </div>
              <div className="text-lg font-semibold">
                {formatNumber(modelResults.emailListNeeded)}
              </div>
              <div className="text-xs text-muted-foreground">
                {modelResults.emailConversionRate.toFixed(1)}% conversion
              </div>
            </div>
          </div>

          {/* Progress Bar for Visitor Gap */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Current Traffic</span>
              <span>Needed Traffic</span>
            </div>
            <Progress 
              value={Math.min(100, (estimatedVisitors[0] / modelResults.visitorsNeeded) * 100)} 
              className="h-2"
            />
            <div className="text-xs text-center text-muted-foreground">
              {((estimatedVisitors[0] / modelResults.visitorsNeeded) * 100).toFixed(0)}% of needed traffic
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Build Cost</span>
              <span className="font-medium">{formatCurrency(modelResults.buildCost)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Fees</span>
              <span className="font-medium">{formatCurrency(modelResults.monthlyFees)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Revenue</span>
              <span className="font-medium text-green-600">{formatCurrency(modelResults.revenue)}</span>
            </div>
            
            <div className="flex justify-between text-base font-semibold border-t pt-2">
              <span>Annual Net ROI</span>
              <span className={modelResults.netROI > 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(modelResults.netROI)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Goals & Current Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Target Subscribers */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Target Paid Subscribers</Label>
              <div className="px-3">
                <Slider
                  value={targetSubscribers}
                  onValueChange={setTargetSubscribers}
                  min={100}
                  max={10000}
                  step={100}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>100</span>
                <span className="font-semibold text-foreground">
                  {formatNumber(targetSubscribers[0])} subscribers
                </span>
                <span>10,000</span>
              </div>
            </div>

            {/* Monthly Price */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Monthly Price per Subscriber</Label>
              <div className="px-3">
                <Slider
                  value={monthlyPrice}
                  onValueChange={setMonthlyPrice}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>$5</span>
                <span className="font-semibold text-foreground">
                  ${monthlyPrice[0]}/month
                </span>
                <span>$50</span>
              </div>
            </div>

            {/* Current Traffic */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Current Monthly Website Visitors</Label>
              <div className="px-3">
                <Slider
                  value={estimatedVisitors}
                  onValueChange={setEstimatedVisitors}
                  min={10000}
                  max={200000}
                  step={5000}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>10k</span>
                <span className="font-semibold text-foreground">
                  {formatNumber(estimatedVisitors[0])} visitors
                </span>
                <span>200k</span>
              </div>
            </div>
          </div>

          {/* Revenue Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium">Target Monthly Revenue</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(targetSubscribers[0] * monthlyPrice[0])}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Model Comparison</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Compare how each publishing approach affects your path to {formatNumber(targetSubscribers[0])} paid subscribers
        </p>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {getModelCard('trailguide')}
          {getModelCard('agency')}
          {getModelCard('diy')}
        </div>
      </div>

      {/* Narrative Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>The Story Behind the Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={selectedModel} onValueChange={(value) => setSelectedModel(value as 'trailguide' | 'agency' | 'diy')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trailguide">TrailGuide</TabsTrigger>
              <TabsTrigger value="agency">Agency</TabsTrigger>
              <TabsTrigger value="diy">DIY SaaS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trailguide" className="mt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">TrailGuide Advantage</h3>
                <p className="text-green-700 mb-3">
                  With our optimized publishing stack, you need only{' '}
                  <strong>{formatNumber(results.results.trailguide.visitorsNeeded)}</strong> monthly visitors 
                  instead of <strong>{formatNumber(results.results.agency.visitorsNeeded)}</strong> with traditional approaches.
                </p>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• 2.5x better site-to-subscriber conversion (2.5% vs 1%)</li>
                  <li>• 2.3x better email-to-subscriber conversion (7% vs 3%)</li>
                  <li>• 3x better visitor-to-email conversion (9% vs 3%)</li>
                  <li>• Only $1,000 upfront + 10% revenue share</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="agency" className="mt-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Agency Reality Check</h3>
                <p className="text-orange-700 mb-3">
                  Pay <strong>{formatCurrency(results.results.agency.buildCost)}</strong> upfront and still fight 
                  uphill with standard 1% conversion rates. You'll need{' '}
                  <strong>{formatNumber(results.results.agency.visitorsNeeded)}</strong> monthly visitors to hit your goal.
                </p>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>• High upfront investment with no conversion guarantees</li>
                  <li>• Standard conversion rates make growth expensive</li>
                  <li>• Ongoing maintenance costs without revenue sharing</li>
                  <li>• Long development cycles delay your launch</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="diy" className="mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">DIY SaaS Trade-offs</h3>
                <p className="text-blue-700 mb-3">
                  Cheap to start at <strong>{formatCurrency(results.results.diy.monthlyFees)}</strong>/month, 
                  but you'll need <strong>{formatNumber(results.results.diy.visitorsNeeded)}</strong> visitors 
                  monthly—that's 3x harder to succeed than TrailGuide.
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Low upfront costs but higher visitor requirements</li>
                  <li>• Standard 1% conversion rates limit growth potential</li>
                  <li>• Monthly SaaS fees add up without revenue sharing alignment</li>
                  <li>• DIY means slower optimization and iteration</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-bold mb-2">Ready to 3x Your Conversion Rates?</h3>
          <p className="text-muted-foreground mb-4">
            See why TrailGuide's optimized publishing stack helps you reach your goals with{' '}
            {Math.round((results.results.agency.visitorsNeeded / results.results.trailguide.visitorsNeeded) * 10) / 10}x 
            fewer visitors than traditional approaches.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calculator className="h-4 w-4" />
            <span>Results calculated in real-time based on proven conversion data</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
