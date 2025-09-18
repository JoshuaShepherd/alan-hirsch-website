'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Lock, Users, Target, TrendingUp, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { donationAmounts, donationFrequencies, donationPurposes } from '@/lib/payment-data';
import { DonationAmount, DonationFrequency, DonationPurpose } from '@/types/payment';

const DonationSystem: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount>(donationAmounts[2]); // $100 default
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState<DonationFrequency['id']>('one-time');
  const [selectedPurpose, setSelectedPurpose] = useState<string>(donationPurposes[0].id);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getCurrentAmount = (): number => {
    if (selectedAmount.id === 'amount-custom') {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount.amount;
  };

  const getSelectedPurpose = (): DonationPurpose | undefined => {
    return donationPurposes.find(p => p.id === selectedPurpose);
  };

  const getSelectedFrequency = (): DonationFrequency | undefined => {
    return donationFrequencies.find(f => f.id === selectedFrequency);
  };

  const handleDonate = async () => {
    if (!donorEmail || getCurrentAmount() <= 0) {
      return;
    }

    setShowPaymentModal(true);
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual Stripe payment processing
      console.log('Processing donation:', {
        amount: getCurrentAmount(),
        frequency: selectedFrequency,
        purpose: selectedPurpose,
        donorName,
        donorEmail,
        message,
        dedicatedTo,
        anonymous
      });

      // Success - redirect or show thank you
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Donation failed:', error);
      setIsProcessing(false);
    }
  };

  const calculateImpact = (amount: number, frequency: DonationFrequency['id']): string => {
    const annualAmount = frequency === 'monthly' ? amount * 12 :
                        frequency === 'quarterly' ? amount * 4 :
                        frequency === 'annually' ? amount :
                        amount;

    if (annualAmount >= 5000) return 'Sponsor a full leadership training program';
    if (annualAmount >= 2500) return 'Support 5 emerging leaders for a year';
    if (annualAmount >= 1000) return 'Provide complete training materials for 10 leaders';
    if (annualAmount >= 500) return 'Fund translation of resources into one new language';
    if (annualAmount >= 100) return 'Support one leader\'s monthly training access';
    return 'Help provide essential resources to leaders in need';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-4xl font-display font-bold text-ink">
              Support the Mission
            </h1>
          </div>
          <p className="text-lg text-graphite max-w-2xl mx-auto">
            Your generosity empowers leaders worldwide to build movemental churches 
            that transform communities and advance God's kingdom.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Choose your donation amount and frequency to maximize your impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Donation Amount</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount.id}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-3 rounded-lg border text-center relative transition-all ${
                          selectedAmount.id === amount.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {amount.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-indigo-600 text-xs">
                            Popular
                          </Badge>
                        )}
                        <div className="font-semibold">{amount.label}</div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedAmount.id === 'amount-custom' && (
                    <div className="mt-3">
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="text-lg"
                        min="1"
                      />
                    </div>
                  )}
                </div>

                {/* Frequency Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Donation Frequency</Label>
                  <RadioGroup
                    value={selectedFrequency}
                    onValueChange={(value: string) => setSelectedFrequency(value as DonationFrequency['id'])}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {donationFrequencies.map((frequency) => (
                      <div key={frequency.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value={frequency.id} id={frequency.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={frequency.id} className="font-medium cursor-pointer">
                            {frequency.label}
                          </Label>
                          <p className="text-sm text-graphite mt-1">{frequency.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Purpose Selection */}
                <div>
                  <Label htmlFor="purpose" className="text-base font-semibold mb-3 block">
                    Donation Purpose
                  </Label>
                  <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {donationPurposes.map((purpose) => (
                        <SelectItem key={purpose.id} value={purpose.id}>
                          <div className="flex items-center gap-2">
                            <span>{purpose.icon}</span>
                            <span>{purpose.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {getSelectedPurpose() && (
                    <p className="text-sm text-graphite mt-2">
                      {getSelectedPurpose()?.description}
                    </p>
                  )}
                </div>

                {/* Donor Information */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="donorName">Name (Optional)</Label>
                    <Input
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donorEmail">Email Address *</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why you're supporting this mission..."
                    rows={3}
                  />
                </div>

                {/* Dedication */}
                <div>
                  <Label htmlFor="dedicatedTo">Dedicate this donation (Optional)</Label>
                  <Input
                    id="dedicatedTo"
                    value={dedicatedTo}
                    onChange={(e) => setDedicatedTo(e.target.value)}
                    placeholder="In memory of / In honor of..."
                  />
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={anonymous}
                    onCheckedChange={(checked: boolean) => setAnonymous(checked)}
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Make this donation anonymous
                  </Label>
                </div>

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  disabled={!donorEmail || getCurrentAmount() <= 0}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Donate ${getCurrentAmount().toFixed(2)} {selectedFrequency !== 'one-time' && `${selectedFrequency}`}
                </Button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-sm text-graphite">
                  <Lock className="h-4 w-4" />
                  <span>Secure payment processing via Stripe</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Your Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-indigo-600">
                    ${getCurrentAmount().toFixed(2)}
                  </div>
                  <div className="text-sm text-graphite">
                    {getSelectedFrequency()?.label} donation
                  </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-800">
                    <strong>This will help:</strong> {calculateImpact(getCurrentAmount(), selectedFrequency)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Funding Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {donationPurposes.filter(p => p.targetAmount).map((purpose) => (
                  <div key={purpose.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{purpose.icon} {purpose.title}</span>
                      <span className="text-xs text-graphite">
                        ${purpose.currentAmount?.toLocaleString()} / ${purpose.targetAmount?.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={((purpose.currentAmount || 0) / (purpose.targetAmount || 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Supporters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  Recent Supporters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">SM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah M.</p>
                      <p className="text-xs text-graphite">$100 monthly • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">John D.</p>
                      <p className="text-xs text-graphite">$250 one-time • 5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Anonymous</p>
                      <p className="text-xs text-graphite">$500 one-time • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment Processing Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    Processing Payment
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Thank You!
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {isProcessing ? (
                  'Securely processing your donation...'
                ) : (
                  'Your donation has been processed successfully. You will receive a confirmation email shortly.'
                )}
              </DialogDescription>
            </DialogHeader>
            
            {!isProcessing && (
              <div className="mt-6">
                <Button onClick={() => setShowPaymentModal(false)} className="w-full">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DonationSystem;
