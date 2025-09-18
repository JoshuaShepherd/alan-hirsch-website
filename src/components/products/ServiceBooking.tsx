'use client';

import { useState } from 'react';
import { ServiceProduct } from '@/lib/products-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface ServiceBookingProps {
  service: ServiceProduct;
  isOpen: boolean;
  onClose: () => void;
  onBookingSubmit: (bookingData: BookingFormData) => void;
}

export interface BookingFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  position?: string;
  
  // Service Details
  preferredDate: string;
  preferredTime: string;
  alternativeDate?: string;
  alternativeTime?: string;
  deliveryMethod?: 'in-person' | 'virtual' | 'phone' | 'hybrid';
  participants?: number;
  
  // Requirements
  objectives: string;
  challenges: string;
  expectations: string;
  specialRequirements?: string;
  
  // Agreement
  agreedToTerms: boolean;
  agreedToCancellationPolicy: boolean;
  
  // Additional
  hearAboutUs?: string;
  budget?: string;
  timeline?: string;
}

export function ServiceBooking({ 
  service, 
  isOpen, 
  onClose, 
  onBookingSubmit 
}: ServiceBookingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    preferredDate: '',
    preferredTime: '',
    alternativeDate: '',
    alternativeTime: '',
    deliveryMethod: service.deliveryMethod,
    participants: 1,
    objectives: '',
    challenges: '',
    expectations: '',
    specialRequirements: '',
    agreedToTerms: false,
    agreedToCancellationPolicy: false,
    hearAboutUs: '',
    budget: '',
    timeline: ''
  });

  const totalSteps = service.bookingType === 'application' ? 4 : 3;

  const updateFormData = (field: keyof BookingFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onBookingSubmit(formData);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: service.currency,
    }).format(price);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                Let us know how to reach you
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => updateFormData('organization', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Service Details</h3>
              <p className="text-sm text-muted-foreground">
                When and how would you like the service delivered?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData('preferredDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Select 
                  value={formData.preferredTime} 
                  onValueChange={(value) => updateFormData('preferredTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alternativeDate">Alternative Date</Label>
                <Input
                  id="alternativeDate"
                  type="date"
                  value={formData.alternativeDate}
                  onChange={(e) => updateFormData('alternativeDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="alternativeTime">Alternative Time</Label>
                <Select 
                  value={formData.alternativeTime || ''} 
                  onValueChange={(value) => updateFormData('alternativeTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {service.deliveryMethod === 'hybrid' && (
              <div>
                <Label htmlFor="deliveryMethod">Preferred Delivery Method</Label>
                <Select 
                  value={formData.deliveryMethod || ''} 
                  onValueChange={(value) => updateFormData('deliveryMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {service.maxParticipants && service.maxParticipants > 1 && (
              <div>
                <Label htmlFor="participants">Number of Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  max={service.maxParticipants}
                  value={formData.participants}
                  onChange={(e) => updateFormData('participants', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum: {service.maxParticipants} participants
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Service Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Help us understand your needs and expectations
              </p>
            </div>
            
            <div>
              <Label htmlFor="objectives">What are your main objectives? *</Label>
              <Textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => updateFormData('objectives', e.target.value)}
                placeholder="Describe what you hope to achieve..."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="challenges">What challenges are you facing? *</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => updateFormData('challenges', e.target.value)}
                placeholder="Tell us about your current challenges..."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="expectations">What are your expectations for this service? *</Label>
              <Textarea
                id="expectations"
                value={formData.expectations}
                onChange={(e) => updateFormData('expectations', e.target.value)}
                placeholder="What outcomes do you expect?"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="specialRequirements">Special Requirements or Accommodations</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                placeholder="Any special needs we should know about?"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <p className="text-sm text-muted-foreground">
                Additional information for your application
              </p>
            </div>
            
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select 
                value={formData.budget || ''} 
                onValueChange={(value) => updateFormData('budget', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="over-50k">Over $50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timeline">Desired Timeline</Label>
              <Select 
                value={formData.timeline || ''} 
                onValueChange={(value) => updateFormData('timeline', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                  <SelectItem value="short">Short-term (1-2 months)</SelectItem>
                  <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                  <SelectItem value="long">Long-term (6+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
              <Select 
                value={formData.hearAboutUs || ''} 
                onValueChange={(value) => updateFormData('hearAboutUs', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="event">Conference/Event</SelectItem>
                  <SelectItem value="book">Book/Publication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Book: {service.title}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {/* Service Summary */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium">{service.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{service.deliveryMethod}</span>
                    </div>
                    {service.maxParticipants && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Up to {service.maxParticipants}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{formatPrice(service.price)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1 <= currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div 
                    className={`w-12 h-0.5 ${
                      i + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="min-h-96">
            {renderStepContent()}
          </div>

          {/* Terms and Agreements - Final Step */}
          {currentStep === totalSteps && (
            <div className="space-y-4 mt-6 pt-6 border-t">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => updateFormData('agreedToTerms', checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions of service
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="cancellation"
                  checked={formData.agreedToCancellationPolicy}
                  onCheckedChange={(checked) => updateFormData('agreedToCancellationPolicy', checked)}
                />
                <Label htmlFor="cancellation" className="text-sm">
                  I understand the cancellation policy: {service.cancellationPolicy}
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!formData.agreedToTerms || !formData.agreedToCancellationPolicy}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
