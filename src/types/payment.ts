// Types for Donation and Event Ticketing systems

export interface DonationAmount {
  id: string;
  amount: number;
  label: string;
  popular?: boolean;
}

export interface DonationFrequency {
  id: 'one-time' | 'monthly' | 'quarterly' | 'annually';
  label: string;
  description: string;
}

export interface Donation {
  id: string;
  amount: number;
  frequency: DonationFrequency['id'];
  donorEmail: string;
  donorName?: string;
  message?: string;
  anonymous: boolean;
  dedicatedTo?: string;
  purpose: DonationPurpose;
  paymentMethod: 'stripe' | 'paypal';
  stripePaymentIntentId?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  processedAt?: Date;
}

export interface DonationPurpose {
  id: string;
  title: string;
  description: string;
  targetAmount?: number;
  currentAmount?: number;
  icon?: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  type: 'workshop' | 'conference' | 'webinar' | 'masterclass' | 'retreat';
  format: 'in-person' | 'virtual' | 'hybrid';
  startDate: Date;
  endDate: Date;
  timezone: string;
  location?: EventLocation;
  virtualDetails?: VirtualEventDetails;
  instructor: string;
  instructorBio?: string;
  instructorImageUrl?: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency: string;
  maxAttendees?: number;
  currentAttendees: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: Date;
  featured: boolean;
  status: 'draft' | 'published' | 'sold-out' | 'cancelled' | 'completed';
  tags: string[];
  category: string;
  targetAudience: string[];
  prerequisites?: string[];
  learningOutcomes: string[];
  agenda: EventAgendaItem[];
  materials?: EventMaterial[];
  testimonials?: EventTestimonial[];
  faq?: EventFAQ[];
  ticketTypes?: EventTicketType[];
  refundPolicy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventLocation {
  venue: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VirtualEventDetails {
  platform: 'zoom' | 'teams' | 'custom';
  meetingId?: string;
  accessLink?: string;
  password?: string;
  recordingAvailable: boolean;
}

export interface EventAgendaItem {
  id: string;
  title: string;
  description?: string;
  startTime: string; // HH:mm format
  endTime: string;
  speaker?: string;
  type: 'session' | 'break' | 'networking' | 'meal' | 'keynote';
}

export interface EventMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link' | 'template';
  url?: string;
  fileSize?: number;
  availableAfter?: 'registration' | 'event-start' | 'event-end';
}

export interface EventTestimonial {
  id: string;
  attendeeName: string;
  role?: string;
  organization?: string;
  quote: string;
  rating?: number;
  eventId: string;
  avatarUrl?: string;
}

export interface EventFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  attendeeInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    organization?: string;
  };
  ticketInfo: Array<{
    ticketId: string;
    ticketType: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: 'card' | 'paypal';
  dietaryRestrictions?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  registrationDate: Date;
  checkInDate?: Date;
  stripePaymentIntentId?: string;
  attendeeQuestions?: RegistrationAnswer[];
}

export interface EventTicketType {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  maxQuantity?: number;
  maxPerPerson?: number;
  soldQuantity: number;
  availableUntil?: Date;
  benefits?: string[];
}

export interface RegistrationAnswer {
  questionId: string;
  question: string;
  answer: string;
  type: 'text' | 'select' | 'checkbox' | 'textarea';
}

export interface RegistrationQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

// Payment related types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  type: 'donation' | 'event-registration';
  referenceId: string; // donationId or registrationId
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethodId?: string;
  clientSecret?: string;
  createdAt: Date;
}
