// Types for Product Catalog system

export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived' | 'out-of-stock';
  tags: string[];
  category: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DigitalProduct extends BaseProduct {
  type: 'digital';
  productType: 'course' | 'guide' | 'template' | 'ebook' | 'audio' | 'video';
  downloadUrl?: string;
  fileSize?: number;
  fileFormat?: string;
  access: 'immediate' | 'scheduled' | 'email-delivery';
  licensingTerms: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
  duration?: string; // For courses
  modules?: CourseModule[];
}

export interface PhysicalProduct extends BaseProduct {
  type: 'physical';
  productType: 'book' | 'merchandise' | 'materials';
  sku: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  inventory: number;
  shippingRequired: boolean;
  shippingWeight: number;
  isbn?: string; // For books
  publisher?: string;
  publicationDate?: Date;
  pages?: number;
}

export interface ServiceProduct extends BaseProduct {
  type: 'service';
  productType: 'coaching' | 'consulting' | 'speaking' | 'workshop';
  duration: number; // in minutes
  deliveryMethod: 'in-person' | 'virtual' | 'phone' | 'hybrid';
  maxParticipants?: number;
  preparationRequired: boolean;
  bookingType: 'calendly' | 'manual' | 'application';
  bookingUrl?: string;
  applicationQuestions?: ServiceQuestion[];
  cancellationPolicy: string;
  reschedulePolicy: string;
  includes?: string[]; // What's included in the service
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  lessons: CourseLesson[];
  order: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'quiz' | 'assignment';
  duration?: number;
  contentUrl?: string;
  transcript?: string;
  order: number;
}

export interface ServiceQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  review: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ProductBundle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  products: string[]; // Product IDs
  bundlePrice: number;
  savings: number;
  featured: boolean;
  validUntil?: Date;
  status: 'active' | 'inactive';
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
  customization?: Record<string, unknown>;
  addedAt: Date;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed';
  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productType: 'digital' | 'physical' | 'service';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  downloadUrl?: string;
  trackingNumber?: string;
  bookingInfo?: BookingInfo;
}

export interface BookingInfo {
  scheduledDate?: Date;
  duration: number;
  meetingUrl?: string;
  meetingId?: string;
  specialInstructions?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

export type Product = DigitalProduct | PhysicalProduct | ServiceProduct;
