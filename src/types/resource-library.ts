// Types for Resource Library system
export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  type: 'ebook' | 'guide' | 'checklist' | 'template' | 'assessment' | 'video' | 'audio';
  category: string;
  topics: string[];
  tags: string[];
  author: string;
  pages?: number;
  duration?: number; // in minutes for video/audio
  estimatedReadTime: number; // in minutes
  fileFormat: string; // 'pdf', 'docx', 'mp4', etc.
  fileSize: number; // in bytes
  downloadUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  gated: boolean; // requires email capture
  emailCaptureForm?: {
    title: string;
    description: string;
    fields: EmailCaptureField[];
    tags: string[]; // for email segmentation
  };
  downloadCount: number;
  rating: number;
  testimonials?: Testimonial[];
  testimonial?: Testimonial; // For displaying a single featured testimonial
  relatedResources: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailCaptureField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'checkbox';
  required: boolean;
  options?: string[]; // for select fields
  placeholder?: string;
}

export interface Toolkit {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  category: 'church-planting' | 'leadership' | 'discipleship' | 'evangelism' | 'community-building' | 'assessment';
  targetAudience: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // e.g., "2-3 hours", "1 week"
  contents: ToolkitItem[];
  prerequisites?: string[];
  learningOutcomes: string[];
  author: string;
  contributors?: string[];
  version: string;
  price: number;
  originalPrice?: number;
  currency: string;
  thumbnailUrl: string;
  downloadUrl?: string;
  isPremium: boolean;
  featured: boolean;
  downloadCount: number;
  rating: number;
  reviews: Review[];
  testimonials?: Testimonial[];
  relatedToolkits: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ToolkitItem {
  id: string;
  title: string;
  type: 'worksheet' | 'template' | 'checklist' | 'guide' | 'video' | 'audio' | 'assessment';
  description: string;
  fileUrl?: string;
  embedUrl?: string; // for videos
  duration?: number; // in minutes
  pages?: number;
  preview?: boolean; // can be previewed without purchase
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'church-planting' | 'vision-casting' | 'small-groups' | 'evangelism' | 'discipleship' | 'leadership' | 'assessment';
  subcategory?: string;
  type: 'document' | 'presentation' | 'spreadsheet' | 'form' | 'checklist';
  format: 'docx' | 'pdf' | 'pptx' | 'xlsx' | 'google-doc' | 'notion';
  useCase: string;
  instructions: string;
  customizationNotes: string[];
  downloadUrl: string;
  previewUrl?: string;
  thumbnailUrl: string;
  author: string;
  license: 'free' | 'attribution' | 'commercial' | 'premium';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedUseTime: string;
  featured: boolean;
  downloadCount: number;
  rating: number;
  testimonials?: Testimonial[];
  relatedTemplates: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingList {
  id: string;
  title: string;
  description: string;
  curator: string;
  category: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  estimatedReadingTime: string;
  books: ReadingListItem[];
  additionalResources?: AdditionalResource[];
  featured: boolean;
  public: boolean;
  followers: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingListItem {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  description: string;
  reasoning: string; // why this book is included
  priority: 'essential' | 'recommended' | 'supplementary';
  chapters?: string[]; // specific chapters if not whole book
  amazonUrl?: string;
  bookDepoistoryUrl?: string;
  freeUrl?: string; // if available for free
  coverUrl?: string;
  coverImageUrl?: string;
  estimatedReadingTime?: string;
  rating?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface AdditionalResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'website' | 'course';
  url: string;
  description: string;
  author?: string;
  duration?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  quote: string;
  rating?: number;
  featured: boolean;
  imageUrl?: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface EmailCapture {
  email: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  role?: string;
  interests: string[];
  source: string; // which lead magnet
  tags: string[];
  optInDate: Date;
}

export interface ResourceDownload {
  id: string;
  resourceId: string;
  resourceType: 'lead-magnet' | 'toolkit' | 'template';
  userId?: string;
  email: string;
  downloadedAt: Date;
  ipAddress: string;
  userAgent: string;
}

export interface ResourceLibraryStats {
  totalResources: number;
  totalDownloads: number;
  emailCaptures: number;
  popularResources: { id: string; title: string; downloads: number; }[];
  categoryStats: { category: string; count: number; downloads: number; }[];
}
