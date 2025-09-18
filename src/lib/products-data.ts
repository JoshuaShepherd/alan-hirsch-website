import {
  DigitalProduct,
  PhysicalProduct,
  ServiceProduct,
  Product,
  ProductBundle,
  ProductReview
} from '@/types/products';

// Re-export types for components
export type { 
  DigitalProduct, 
  PhysicalProduct, 
  ServiceProduct, 
  Product, 
  ProductBundle, 
  ProductReview,
  CartItem 
} from '@/types/products';

// Digital Products - Courses, Guides, Templates
export const digitalProducts: DigitalProduct[] = [
  {
    id: 'course-apest-mastery',
    title: 'APEST Mastery Course',
    description: 'A comprehensive 8-week online course diving deep into the fivefold ministry framework. Learn to identify, develop, and deploy APEST gifts in your context through interactive lessons, assessments, and practical exercises.',
    shortDescription: 'Master the APEST framework through this comprehensive 8-week course',
    imageUrl: '/images/products/apest-mastery-course.jpg',
    price: 297,
    originalPrice: 397,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['APEST', 'Leadership', 'Course', 'Ministry'],
    category: 'Leadership Development',
    rating: 4.8,
    reviewCount: 127,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'digital',
    productType: 'course',
    access: 'immediate',
    licensingTerms: 'Personal use only. No redistribution permitted.',
    duration: '8 weeks',
    prerequisites: ['Basic understanding of church leadership'],
    learningOutcomes: [
      'Identify your primary and secondary APEST functions',
      'Develop other team members in their APEST callings',
      'Create systems for ongoing APEST assessment and development',
      'Build balanced, high-performing ministry teams',
      'Implement APEST-based organizational structures'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Introduction to APEST',
        description: 'Understanding the biblical foundation and practical application',
        duration: 90,
        lessons: [
          { id: 'les-1-1', title: 'The Biblical Foundation', type: 'video', duration: 25, order: 1 },
          { id: 'les-1-2', title: 'Modern Applications', type: 'video', duration: 30, order: 2 },
          { id: 'les-1-3', title: 'Assessment Activity', type: 'assignment', duration: 35, order: 3 }
        ],
        order: 1
      }
    ]
  },
  {
    id: 'guide-missional-transformation',
    title: 'Missional Transformation Guide',
    description: 'A practical 50-page guide for leading organizational change toward missional effectiveness.',
    shortDescription: 'Practical guide for leading missional transformation',
    imageUrl: '/images/products/missional-transformation-guide.jpg',
    price: 49,
    currency: 'USD',
    featured: false,
    status: 'published',
    tags: ['Transformation', 'Strategy', 'Guide'],
    category: 'Organizational Development',
    rating: 4.6,
    reviewCount: 89,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'digital',
    productType: 'guide',
    access: 'immediate',
    licensingTerms: 'Personal and organizational use permitted.',
    fileSize: 2.5,
    fileFormat: 'PDF'
  },
  {
    id: 'template-church-planting-toolkit',
    title: 'Church Planting Toolkit',
    description: 'Complete set of customizable templates for church planters including vision statements, strategic plans, and assessment tools.',
    shortDescription: 'Essential templates for church planting success',
    imageUrl: '/images/products/church-planting-toolkit.jpg',
    price: 97,
    originalPrice: 147,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Church Planting', 'Templates', 'Strategy'],
    category: 'Church Planting',
    rating: 4.7,
    reviewCount: 156,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'digital',
    productType: 'template',
    access: 'immediate',
    licensingTerms: 'Unlimited organizational use. Customization permitted.',
    fileSize: 15.2,
    fileFormat: 'ZIP (Word, PDF, Excel)'
  },
  {
    id: 'ebook-forgotten-ways-study',
    title: 'The Forgotten Ways Study Guide',
    description: 'Digital study guide companion to "The Forgotten Ways" book. Includes discussion questions, practical exercises, and implementation frameworks.',
    shortDescription: 'Study guide for The Forgotten Ways book',
    imageUrl: '/images/products/forgotten-ways-study-guide.jpg',
    price: 29,
    currency: 'USD',
    featured: false,
    status: 'published',
    tags: ['Study Guide', 'Forgotten Ways', 'Movement'],
    category: 'Books & Study Materials',
    rating: 4.5,
    reviewCount: 203,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'digital',
    productType: 'ebook',
    access: 'immediate',
    licensingTerms: 'Personal use only.',
    fileSize: 1.8,
    fileFormat: 'PDF, EPUB'
  }
];

// Physical Products - Books, Merchandise
export const physicalProducts: PhysicalProduct[] = [
  {
    id: 'book-forgotten-ways-hardcover',
    title: 'The Forgotten Ways (Hardcover)',
    description: 'The definitive hardcover edition of Alan Hirsch\'s groundbreaking work on apostolic movements.',
    shortDescription: 'Hardcover edition of the movement classic',
    imageUrl: '/images/books/forgotten-ways.jpg',
    price: 34.99,
    originalPrice: 39.99,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Book', 'Movement', 'Apostolic'],
    category: 'Books',
    rating: 4.9,
    reviewCount: 342,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'physical',
    productType: 'book',
    sku: 'BOOK-TFW-HC-001',
    weight: 1.2,
    dimensions: { length: 9, width: 6, height: 1.5 },
    inventory: 50,
    shippingRequired: true,
    shippingWeight: 1.4,
    isbn: '978-0-123456-78-9',
    publisher: 'Jossey-Bass',
    publicationDate: new Date('2020-01-01'),
    pages: 312
  },
  {
    id: 'book-5q-paperback',
    title: '5Q: Reactivating the Original Intelligence (Paperback)',
    description: 'Paperback edition of Alan\'s exploration of the fivefold ministry.',
    shortDescription: 'Paperback edition exploring fivefold ministry',
    imageUrl: '/images/books/5q.jpg',
    price: 19.99,
    currency: 'USD',
    featured: false,
    status: 'published',
    tags: ['Book', 'APEST', '5Q', 'Ministry'],
    category: 'Books',
    rating: 4.7,
    reviewCount: 298,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'physical',
    productType: 'book',
    sku: 'BOOK-5Q-PB-001',
    weight: 0.8,
    dimensions: { length: 8.5, width: 5.5, height: 1 },
    inventory: 75,
    shippingRequired: true,
    shippingWeight: 1.0,
    isbn: '978-0-987654-32-1',
    publisher: 'Baker Books',
    publicationDate: new Date('2021-03-15'),
    pages: 256
  },
  {
    id: 'merchandise-apest-assessment-cards',
    title: 'APEST Assessment Cards',
    description: 'Professional card deck for conducting APEST assessments with teams and individuals.',
    shortDescription: 'Professional APEST assessment card deck',
    imageUrl: '/images/products/apest-cards.jpg',
    price: 49.99,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Assessment', 'APEST', 'Cards', 'Tool'],
    category: 'Assessment Tools',
    rating: 4.8,
    reviewCount: 145,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'physical',
    productType: 'materials',
    sku: 'CARDS-APEST-001',
    weight: 0.5,
    dimensions: { length: 4, width: 3, height: 1.5 },
    inventory: 30,
    shippingRequired: true,
    shippingWeight: 0.7
  },
  {
    id: 'merchandise-missional-journal',
    title: 'Missional Leader Journal',
    description: 'Premium leather-bound journal designed specifically for missional leaders.',
    shortDescription: 'Premium leather journal for missional leaders',
    imageUrl: '/images/products/missional-journal.jpg',
    price: 39.99,
    currency: 'USD',
    featured: false,
    status: 'published',
    tags: ['Journal', 'Leadership', 'Reflection'],
    category: 'Leadership Tools',
    rating: 4.4,
    reviewCount: 67,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'physical',
    productType: 'materials',
    sku: 'JOURNAL-ML-001',
    weight: 0.8,
    dimensions: { length: 8.5, width: 5.5, height: 0.8 },
    inventory: 25,
    shippingRequired: true,
    shippingWeight: 1.0
  }
];

// Service Products - Coaching, Consulting, Speaking
export const serviceProducts: ServiceProduct[] = [
  {
    id: 'coaching-executive-leadership',
    title: 'Executive Leadership Coaching',
    description: 'One-on-one coaching for senior leaders navigating organizational transformation.',
    shortDescription: 'Personal coaching for executive leaders',
    imageUrl: '/images/services/executive-coaching.jpg',
    price: 500,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Coaching', 'Leadership', 'Executive', 'Transformation'],
    category: 'Leadership Coaching',
    rating: 4.9,
    reviewCount: 78,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'service',
    productType: 'coaching',
    duration: 90,
    deliveryMethod: 'virtual',
    preparationRequired: true,
    bookingType: 'calendly',
    bookingUrl: 'https://calendly.com/alan-hirsch/executive-coaching',
    cancellationPolicy: '48 hours notice required',
    reschedulePolicy: 'Up to 24 hours before session',
    includes: [
      '90-minute coaching session',
      'Pre-session assessment',
      'Follow-up action plan',
      'Email support between sessions'
    ]
  },
  {
    id: 'consulting-organizational-assessment',
    title: 'Organizational Assessment & Strategy',
    description: 'Comprehensive assessment of your organization\'s missional effectiveness with strategic recommendations.',
    shortDescription: 'Complete organizational assessment and strategy',
    imageUrl: '/images/services/organizational-consulting.jpg',
    price: 5000,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Consulting', 'Assessment', 'Strategy', 'Organization'],
    category: 'Organizational Consulting',
    rating: 4.8,
    reviewCount: 23,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'service',
    productType: 'consulting',
    duration: 480,
    deliveryMethod: 'hybrid',
    maxParticipants: 20,
    preparationRequired: true,
    bookingType: 'application',
    cancellationPolicy: '30 days notice required',
    reschedulePolicy: 'Subject to availability',
    includes: [
      'Comprehensive organizational assessment',
      'Strategic planning workshop',
      'Written recommendations report',
      '90-day implementation support',
      'Follow-up consultation sessions'
    ]
  },
  {
    id: 'speaking-keynote-general',
    title: 'Keynote Speaking',
    description: 'Inspiring keynote presentations on missional leadership, organizational transformation, and movement dynamics.',
    shortDescription: 'Keynote speaking for conferences and events',
    imageUrl: '/images/services/keynote-speaking.jpg',
    price: 7500,
    currency: 'USD',
    featured: true,
    status: 'published',
    tags: ['Speaking', 'Keynote', 'Conference', 'Leadership'],
    category: 'Speaking',
    rating: 4.9,
    reviewCount: 156,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'service',
    productType: 'speaking',
    duration: 60,
    deliveryMethod: 'in-person',
    maxParticipants: 1000,
    preparationRequired: true,
    bookingType: 'manual',
    cancellationPolicy: '60 days notice required',
    reschedulePolicy: 'Subject to schedule availability',
    includes: [
      '60-minute keynote presentation',
      'Pre-event consultation',
      'Customized content for your audience',
      'Q&A session',
      'Travel expenses covered'
    ]
  },
  {
    id: 'workshop-apest-intensive',
    title: 'APEST Team Workshop',
    description: 'Intensive workshop for leadership teams to understand and implement the APEST framework.',
    shortDescription: 'Intensive APEST workshop for leadership teams',
    imageUrl: '/images/services/apest-workshop.jpg',
    price: 3500,
    currency: 'USD',
    featured: false,
    status: 'published',
    tags: ['Workshop', 'APEST', 'Team', 'Training'],
    category: 'Workshops & Training',
    rating: 4.7,
    reviewCount: 89,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    type: 'service',
    productType: 'workshop',
    duration: 480,
    deliveryMethod: 'hybrid',
    maxParticipants: 25,
    preparationRequired: true,
    bookingType: 'manual',
    cancellationPolicy: '14 days notice required',
    reschedulePolicy: 'Subject to facilitator availability',
    includes: [
      'Full-day intensive workshop',
      'APEST assessments for all participants',
      'Team development action plan',
      'Workshop materials and resources',
      '30-day follow-up support'
    ]
  }
];

// Product Bundles
export const productBundles: ProductBundle[] = [
  {
    id: 'bundle-leadership-essentials',
    title: 'Leadership Essentials Bundle',  
    description: 'Complete leadership development package including APEST Course, Assessment Cards, and Transformation Guide.',
    imageUrl: '/images/bundles/leadership-essentials.jpg',
    products: ['course-apest-mastery', 'merchandise-apest-assessment-cards', 'guide-missional-transformation'],
    bundlePrice: 349,
    savings: 97,
    featured: true,
    status: 'active'
  },
  {
    id: 'bundle-church-planter-starter',
    title: 'Church Planter Starter Pack',
    description: 'Everything needed to start a new church including toolkit, study guide, and coaching session.',
    imageUrl: '/images/bundles/church-planter-starter.jpg', 
    products: ['template-church-planting-toolkit', 'ebook-forgotten-ways-study', 'coaching-executive-leadership'],
    bundlePrice: 599,
    savings: 127,
    featured: true,
    status: 'active'
  }
];

// Utility functions
export const getAllProducts = (): Product[] => {
  return [...digitalProducts, ...physicalProducts, ...serviceProducts];
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return getAllProducts().filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return getAllProducts().filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllProducts().filter(product =>
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByType = (type: 'digital' | 'physical' | 'service'): Product[] => {
  return getAllProducts().filter(product => product.type === type);
};

export const getBundleById = (id: string): ProductBundle | undefined => {
  return productBundles.find(bundle => bundle.id === id);
};

export const getBundleProducts = (bundleId: string): Product[] => {
  const bundle = getBundleById(bundleId);
  if (!bundle) return [];
  
  return bundle.products.map(productId => getProductById(productId)).filter(Boolean) as Product[];
};

export const calculateBundleSavings = (bundleId: string): number => {
  const bundle = getBundleById(bundleId);
  if (!bundle) return 0;
  
  const products = getBundleProducts(bundleId);
  const originalTotal = products.reduce((sum, product) => sum + product.price, 0);
  
  return originalTotal - bundle.bundlePrice;
};
