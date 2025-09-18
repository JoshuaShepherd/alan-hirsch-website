'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Video,
  CreditCard,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  Building
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Event, EventRegistration, EventTicketType } from '@/types/payment';
import { calculateEventPrice } from '@/lib/payment-data';

interface EventRegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (registration: Partial<EventRegistration>) => void;
}

type RegistrationStep = 'overview' | 'tickets' | 'attendee' | 'payment' | 'confirmation';

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('overview');
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [attendeeInfo, setAttendeeInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreeToTerms: false,
    subscribeToNewsletter: true
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!event) return null;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'virtual': return <Video className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      case 'hybrid': return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTotalTickets = (): number => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = (): number => {
    if (!event.ticketTypes) {
      return calculateEventPrice(event) * getTotalTickets();
    }
    
    return Object.entries(selectedTickets).reduce((total, [ticketId, count]) => {
      const ticket = event.ticketTypes?.find((t: EventTicketType) => t.id === ticketId);
      return total + (ticket?.price || 0) * count;
    }, 0);
  };

  const canProceedFromStep = (step: RegistrationStep): boolean => {
    switch (step) {
      case 'overview': return true;
      case 'tickets': return getTotalTickets() > 0;
      case 'attendee': 
        return attendeeInfo.firstName.trim() !== '' && 
               attendeeInfo.lastName.trim() !== '' && 
               attendeeInfo.email.trim() !== '' && 
               attendeeInfo.agreeToTerms;
      case 'payment': return true;
      default: return false;
    }
  };

  const handleTicketChange = (ticketId: string, count: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, count)
    }));
  };

  const handleNext = () => {
    const steps: RegistrationStep[] = ['overview', 'tickets', 'attendee', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: RegistrationStep[] = ['overview', 'tickets', 'attendee', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmitRegistration = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const registration: Partial<EventRegistration> = {
      eventId: event.id,
      attendeeInfo: {
        firstName: attendeeInfo.firstName,
        lastName: attendeeInfo.lastName,
        email: attendeeInfo.email,
        phone: attendeeInfo.phone,
        organization: attendeeInfo.organization
      },
      ticketInfo: Object.entries(selectedTickets)
        .filter(([_, count]) => count > 0)
        .map(([ticketId, count]) => {
          const ticket = event.ticketTypes?.find((t: EventTicketType) => t.id === ticketId);
          return {
            ticketId,
            ticketType: ticket?.name || 'General Admission',
            quantity: count,
            price: ticket?.price || calculateEventPrice(event)
          };
        }),
      totalAmount: getTotalPrice(),
      paymentMethod: paymentMethod,
      specialRequests: attendeeInfo.dietaryRestrictions || attendeeInfo.accessibilityNeeds ? 
        `Dietary: ${attendeeInfo.dietaryRestrictions}. Accessibility: ${attendeeInfo.accessibilityNeeds}` : 
        undefined,
      registrationDate: new Date(),
      status: 'confirmed' as const
    };

    onSubmit(registration);
    setCurrentStep('confirmation');
    setIsProcessing(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Event Image */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* Event Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-ink mb-2">{event.title}</h3>
                {event.subtitle && (
                  <p className="text-indigo-600 font-medium mb-2">{event.subtitle}</p>
                )}
                <p className="text-graphite">{event.description}</p>
              </div>

              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-sage-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>{formatDate(event.startDate)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {getFormatIcon(event.format)}
                  <span className="capitalize">{event.format}</span>
                </div>

                {event.format !== 'virtual' && event.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                    <span>{event.location.city}, {event.location.state || event.location.country}</span>
                  </div>
                )}
              </div>

              {/* Learning Outcomes */}
              {event.learningOutcomes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-ink mb-2">What You'll Learn:</h4>
                  <ul className="space-y-1">
                    {event.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-graphite">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructor Bio */}
              {event.instructorBio && (
                <div>
                  <h4 className="font-semibold text-ink mb-2">About {event.instructor}:</h4>
                  <p className="text-sm text-graphite">{event.instructorBio}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'tickets':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">Select Tickets</h3>
              <p className="text-graphite">Choose the number of tickets you need.</p>
            </div>

            <div className="space-y-4">
              {event.ticketTypes ? (
                event.ticketTypes.map((ticket: EventTicketType) => (
                  <div key={ticket.id} className="border border-sage-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-ink">{ticket.name}</h4>
                        <p className="text-sm text-graphite">{ticket.description}</p>
                        {ticket.benefits && ticket.benefits.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {ticket.benefits.map((benefit: string, index: number) => (
                              <li key={index} className="flex items-center gap-2 text-xs text-graphite">
                                <Check className="h-3 w-3 text-green-600" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-ink">${ticket.price}</div>
                        {ticket.originalPrice && ticket.originalPrice > ticket.price && (
                          <div className="text-sm text-graphite line-through">${ticket.originalPrice}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTicketChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                          disabled={(selectedTickets[ticket.id] || 0) === 0}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {selectedTickets[ticket.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTicketChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                          disabled={ticket.maxPerPerson ? (selectedTickets[ticket.id] || 0) >= ticket.maxPerPerson : false}
                        >
                          +
                        </Button>
                      </div>

                      {ticket.maxPerPerson && (
                        <span className="text-xs text-graphite">
                          Max {ticket.maxPerPerson} per person
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-sage-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-semibold text-ink">General Admission</h4>
                      <p className="text-sm text-graphite">Access to all sessions and materials</p>
                    </div>
                    <div className="text-xl font-bold text-ink">${calculateEventPrice(event)}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTicketChange('general', (selectedTickets['general'] || 0) - 1)}
                      disabled={(selectedTickets['general'] || 0) === 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {selectedTickets['general'] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTicketChange('general', (selectedTickets['general'] || 0) + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {getTotalTickets() > 0 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total: {getTotalTickets()} ticket(s)</span>
                  <span className="text-xl font-bold text-indigo-600">${getTotalPrice()}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'attendee':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">Attendee Information</h3>
              <p className="text-graphite">Please provide your details for registration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={attendeeInfo.firstName}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={attendeeInfo.lastName}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={attendeeInfo.email}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={attendeeInfo.phone}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="organization">Organization/Church</Label>
                <Input
                  id="organization"
                  value={attendeeInfo.organization}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="Your church or organization"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Textarea
                  id="dietaryRestrictions"
                  value={attendeeInfo.dietaryRestrictions}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                  placeholder="Please list any dietary restrictions or allergies"
                  rows={2}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="accessibilityNeeds">Accessibility Needs</Label>
                <Textarea
                  id="accessibilityNeeds"
                  value={attendeeInfo.accessibilityNeeds}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, accessibilityNeeds: e.target.value }))}
                  placeholder="Please describe any accessibility accommodations you need"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={attendeeInfo.emergencyContact}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  placeholder="Contact name"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={attendeeInfo.emergencyPhone}
                  onChange={(e) => setAttendeeInfo(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={attendeeInfo.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setAttendeeInfo(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the terms and conditions and understand the cancellation policy *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="subscribeToNewsletter"
                  checked={attendeeInfo.subscribeToNewsletter}
                  onCheckedChange={(checked) => 
                    setAttendeeInfo(prev => ({ ...prev, subscribeToNewsletter: checked as boolean }))
                  }
                />
                <Label htmlFor="subscribeToNewsletter" className="text-sm">
                  Subscribe to newsletter for updates and resources
                </Label>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">Payment Information</h3>
              <p className="text-graphite">Complete your registration with secure payment.</p>
            </div>

            {/* Order Summary */}
            <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
              <h4 className="font-semibold text-ink mb-2">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span>{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets:</span>
                  <span>{getTotalTickets()}</span>
                </div>
                <div className="border-t border-sage-300 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium">Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as 'card' | 'paypal')}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Mock Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Secure Payment</p>
                  <p>Your payment information is encrypted and secure. You will receive a confirmation email after successful registration.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink mb-2">Registration Confirmed!</h3>
              <p className="text-graphite">
                Thank you for registering for {event.title}. You will receive a confirmation email shortly with event details and access information.
              </p>
            </div>

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-ink mb-2">Registration Details</h4>
              <div className="space-y-2 text-sm text-graphite">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{attendeeInfo.firstName} {attendeeInfo.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{attendeeInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span>{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets:</span>
                  <span>{getTotalTickets()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
              <p className="text-xs text-graphite">
                Add this event to your calendar and watch for pre-event materials via email.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    const steps = ['overview', 'tickets', 'attendee', 'payment', 'confirmation'];
    const stepLabels = ['Overview', 'Tickets', 'Attendee', 'Payment', 'Confirmation'];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${index <= currentIndex 
                ? 'bg-indigo-600 text-white' 
                : 'bg-sage-200 text-graphite'
              }
            `}>
              {index < currentIndex ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-12 h-0.5 mx-2
                ${index < currentIndex ? 'bg-indigo-600' : 'bg-sage-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Event Registration</DialogTitle>
          <DialogDescription className="sr-only">
            Register for {event?.title}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep !== 'confirmation' && renderStepIndicator()}
          
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep !== 'confirmation' && (
            <div className="flex justify-between pt-6 border-t border-sage-200">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 'overview'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep === 'payment' ? (
                <Button
                  onClick={handleSubmitRegistration}
                  disabled={!canProceedFromStep(currentStep) || isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CreditCard className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceedFromStep(currentStep)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
