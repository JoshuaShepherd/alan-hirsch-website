import { LeadMagnet, Toolkit, Template, ReadingList, ResourceCategory } from '@/types/resource-library';

// Sample Lead Magnets
export const sampleLeadMagnets: LeadMagnet[] = [
  {
    id: 'apest-quickstart',
    title: 'APEST Quick Start Guide',
    description: 'Discover your unique ministry gifts and learn how to activate them in your context.',
    shortDescription: 'Activate your APEST calling with this practical 16-page guide.',
    type: 'guide',
    category: 'Leadership',
    topics: ['APEST', 'Ministry Gifts', 'Leadership'],
    tags: ['APEST', 'Leadership', 'Ministry Gifts', 'Quick Start'],
    author: 'Alan Hirsch',
    pages: 16,
    estimatedReadTime: 25,
    fileFormat: 'pdf',
    fileSize: 2048000, // 2MB
    downloadUrl: '/downloads/apest-quickstart-guide.pdf',
    thumbnailUrl: '/images/resources/apest-quickstart-thumb.jpg',
    featured: true,
    gated: true,
    emailCaptureForm: {
      title: 'Get Your Free APEST Quick Start Guide',
      description: 'Enter your details below to download this practical guide and join our community of missional leaders.',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Your first name' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
        { name: 'role', label: 'Your Role', type: 'select', required: false, options: ['Pastor', 'Church Leader', 'Missionary', 'Student', 'Other'] },
        { name: 'interests', label: 'I\'m interested in:', type: 'checkbox', required: false, options: ['APEST Training', 'Church Planting', 'Leadership Development', 'Missional Living'] }
      ],
      tags: ['apest', 'leadership', 'lead-magnet']
    },
    downloadCount: 2840,
    rating: 4.8,
    testimonials: [
      {
        id: 'test-1',
        name: 'Sarah Chen',
        role: 'Church Planter',
        organization: 'Grace Community',
        quote: 'This guide helped me understand my apostolic calling and gave me practical steps to activate it.',
        rating: 5,
        featured: true
      }
    ],
    testimonial: {
      id: 'test-1',
      name: 'Sarah Chen',
      role: 'Church Planter',
      organization: 'Grace Community',
      quote: 'This guide helped me understand my apostolic calling and gave me practical steps to activate it.',
      rating: 5,
      featured: true
    },
    relatedResources: ['5q-assessment', 'leadership-essentials'],
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: 'missional-church-checklist',
    title: 'Missional Church Health Checklist',
    description: 'A comprehensive assessment tool to evaluate your church\'s missional DNA and identify areas for growth.',
    shortDescription: '25-point checklist to assess your church\'s missional health.',
    type: 'checklist',
    category: 'Church Health',
    topics: ['Missional Church', 'Assessment', 'Church Health'],
    tags: ['Missional Church', 'Assessment', 'Church Health', 'Checklist'],
    author: 'Alan Hirsch',
    pages: 8,
    estimatedReadTime: 15,
    fileFormat: 'pdf',
    fileSize: 1024000, // 1MB
    downloadUrl: '/downloads/missional-church-checklist.pdf',
    thumbnailUrl: '/images/resources/missional-checklist-thumb.jpg',
    featured: true,
    gated: true,
    emailCaptureForm: {
      title: 'Download the Missional Church Health Checklist',
      description: 'Assess your church\'s missional DNA with this comprehensive 25-point evaluation tool.',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Your first name' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
        { name: 'churchName', label: 'Church Name', type: 'text', required: false, placeholder: 'Your church name' },
        { name: 'churchSize', label: 'Church Size', type: 'select', required: false, options: ['Under 50', '50-150', '150-500', '500+'] }
      ],
      tags: ['missional', 'church-health', 'assessment']
    },
    downloadCount: 1950,
    rating: 4.7,
    relatedResources: ['church-planting-toolkit', 'discipleship-pathway'],
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-11-15')
  },
  {
    id: 'movement-dna-framework',
    title: 'Movement DNA Framework',
    description: 'Understanding the six elements that create sustainable kingdom movements.',
    shortDescription: 'The essential framework for catalyzing reproducible movements.',
    type: 'ebook',
    category: 'Movement Building',
    topics: ['Movement DNA', 'Church Multiplication', 'Organic Growth'],
    tags: ['Movement DNA', 'Church Multiplication', 'Organic Growth', 'Framework'],
    author: 'Alan Hirsch',
    pages: 24,
    estimatedReadTime: 35,
    fileFormat: 'pdf',
    fileSize: 3072000, // 3MB
    downloadUrl: '/downloads/movement-dna-framework.pdf',
    thumbnailUrl: '/images/resources/movement-dna-thumb.jpg',
    featured: true,
    gated: true,
    emailCaptureForm: {
      title: 'Get the Movement DNA Framework',
      description: 'Learn the six essential elements that create sustainable kingdom movements.',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Your first name' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
        { name: 'context', label: 'Ministry Context', type: 'select', required: false, options: ['Church Planting', 'Established Church', 'Missions', 'Parachurch', 'Seminary'] }
      ],
      tags: ['movement', 'dna', 'multiplication']
    },
    downloadCount: 3240,
    rating: 4.9,
    testimonial: {
      id: 'test-2',
      name: 'David Rodriguez',
      role: 'Movement Catalyst',
      organization: 'Urban Impact Network',
      quote: 'This framework transformed how we think about sustainable multiplication in urban contexts.',
      rating: 5,
      featured: true
    },
    relatedResources: ['church-planting-toolkit', 'discipleship-intensive'],
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-10-30')
  }
];

// Sample Toolkits
export const sampleToolkits: Toolkit[] = [
  {
    id: 'church-planting-essentials',
    title: 'Church Planting Essentials Toolkit',
    subtitle: 'Everything You Need to Start Strong',
    description: 'A comprehensive toolkit for launching healthy, reproducible church communities.',
    longDescription: 'This complete toolkit provides everything needed to plant a healthy, missional church. Developed from 30+ years of experience, it includes practical templates, assessment tools, training materials, and step-by-step guides.',
    category: 'church-planting',
    targetAudience: ['Church Planters', 'Denominational Leaders', 'Mission Agencies', 'Seminary Students'],
    difficulty: 'intermediate',
    estimatedTime: '4-6 weeks to complete',
    contents: [
      {
        id: 'vision-template',
        title: 'Vision & Mission Statement Template',
        type: 'template',
        description: 'Structured template for crafting compelling vision and mission statements',
        fileUrl: '/toolkit/church-planting/vision-mission-template.docx',
        pages: 6,
        preview: true
      },
      {
        id: 'community-assessment',
        title: 'Community Demographics Assessment',
        type: 'worksheet',
        description: 'Comprehensive tool for understanding your target community',
        fileUrl: '/toolkit/church-planting/community-assessment.pdf',
        pages: 12,
        preview: false
      },
      {
        id: 'launch-checklist',
        title: '90-Day Launch Checklist',  
        type: 'checklist',
        description: 'Step-by-step checklist for the first 90 days',
        fileUrl: '/toolkit/church-planting/launch-checklist.pdf',
        pages: 8,
        preview: true
      },
      {
        id: 'funding-guide',
        title: 'Church Planting Funding Guide',
        type: 'guide',
        description: 'Strategies for raising support and managing finances',
        fileUrl: '/toolkit/church-planting/funding-guide.pdf',
        pages: 20,
        preview: false
      }
    ],
    prerequisites: ['Basic understanding of missional principles'],
    learningOutcomes: [
      'Develop a clear vision and mission for your church plant',
      'Conduct thorough community assessment',
      'Create sustainable funding strategy',
      'Build effective launch timeline'
    ],
    author: 'Alan Hirsch',
    contributors: ['Forge Network', '100Movements Team'],
    version: '2.1',
    price: 97.00,
    currency: 'USD',
    thumbnailUrl: '/images/toolkits/church-planting-essentials.jpg',
    downloadUrl: '/toolkits/church-planting-essentials.zip',
    isPremium: true,
    featured: true,
    downloadCount: 520,
    rating: 4.8,
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-123',
        userName: 'Marcus Johnson',
        rating: 5,
        title: 'Comprehensive and Practical',
        comment: 'This toolkit saved me months of preparation. Everything I needed in one place.',
        helpful: 12,
        verified: true,
        createdAt: new Date('2024-10-15')
      }
    ],
    relatedToolkits: ['discipleship-pathway', 'small-group-essentials'],
    tags: ['church-planting', 'startup', 'vision', 'community'],
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: 'discipleship-pathway',
    title: 'Discipleship Pathway Builder',
    subtitle: 'Create Reproducible Discipleship Systems',
    description: 'Design and implement discipleship pathways that create multiplying disciples.',
    longDescription: 'A systematic approach to building discipleship cultures that reproduce naturally. Includes assessment tools, curriculum frameworks, and multiplication strategies.',
    category: 'discipleship',
    targetAudience: ['Pastors', 'Discipleship Leaders', 'Small Group Leaders', 'Church Planters'],
    difficulty: 'intermediate',
    estimatedTime: '3-4 weeks to implement',
    contents: [
      {
        id: 'pathway-design',
        title: 'Discipleship Pathway Design Template',
        type: 'template',
        description: 'Framework for creating custom discipleship journeys',
        fileUrl: '/toolkit/discipleship/pathway-design.docx',
        pages: 10
      },
      {
        id: 'maturity-assessment',
        title: 'Spiritual Maturity Assessment',
        type: 'assessment',
        description: 'Tool for evaluating discipleship progress',
        fileUrl: '/toolkit/discipleship/maturity-assessment.pdf',
        pages: 8
      },
      {
        id: 'multiplication-guide',
        title: 'Disciple-Making Multiplication Guide',
        type: 'guide',
        description: 'Strategies for creating reproducing disciples',
        fileUrl: '/toolkit/discipleship/multiplication-guide.pdf',
        pages: 16
      }
    ],
    learningOutcomes: [
      'Design effective discipleship pathways',
      'Implement multiplication strategies',
      'Assess spiritual growth effectively',
      'Create sustainable discipleship culture'
    ],
    author: 'Alan Hirsch',
    version: '1.3',
    price: 67.00,
    currency: 'USD',
    thumbnailUrl: '/images/toolkits/discipleship-pathway.jpg',
    isPremium: true,
    featured: true,
    downloadCount: 380,
    rating: 4.7,
    reviews: [],
    relatedToolkits: ['church-planting-essentials', 'small-group-essentials'],
    tags: ['discipleship', 'multiplication', 'spiritual-growth'],
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-10-20')
  }
];

// Sample Templates
export const sampleTemplates: Template[] = [
  {
    id: 'vision-statement-template',
    title: 'Church Vision Statement Template',
    description: 'A structured template for crafting compelling, biblical vision statements that inspire action.',
    category: 'vision-casting',
    subcategory: 'Vision Development',
    type: 'document',
    format: 'docx',
    useCase: 'Creating or refining church vision statements',
    instructions: 'Follow the guided questions and examples to develop a clear, compelling vision statement for your church or ministry.',
    customizationNotes: [
      'Replace placeholder text with your specific context',
      'Customize scripture references for your denominational preferences',
      'Adapt language for your community culture'
    ],
    downloadUrl: '/templates/vision-statement-template.docx',
    previewUrl: '/templates/preview/vision-statement-preview.pdf',
    thumbnailUrl: '/images/templates/vision-statement-thumb.jpg',
    author: 'Alan Hirsch',
    license: 'free',
    tags: ['vision', 'mission', 'planning', 'leadership'],
    difficulty: 'beginner',
    estimatedUseTime: '2-3 hours',
    featured: true,
    downloadCount: 1250,
    rating: 4.6,
    relatedTemplates: ['mission-statement-template', 'strategic-plan-template'],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-10-15')
  },
  {
    id: 'small-group-curriculum-template',
    title: 'Small Group Curriculum Template',
    description: 'A flexible template for creating engaging small group study materials with discussion questions and activities.',
    category: 'small-groups',
    subcategory: 'Curriculum Development',
    type: 'document',
    format: 'docx',
    useCase: 'Developing small group study materials',
    instructions: 'Use this template to create 6-8 week small group curriculums. Includes sections for objectives, activities, discussion questions, and takeaways.',
    customizationNotes: [
      'Adapt content for your group\'s maturity level',
      'Include relevant local examples and illustrations',
      'Adjust time allocations based on your group dynamics'
    ],
    downloadUrl: '/templates/small-group-curriculum-template.docx',
    thumbnailUrl: '/images/templates/small-group-curriculum-thumb.jpg',
    author: 'Alan Hirsch',
    license: 'attribution',
    tags: ['small-groups', 'curriculum', 'discipleship', 'community'],
    difficulty: 'intermediate',
    estimatedUseTime: '4-6 hours per session',
    featured: false,
    downloadCount: 890,
    rating: 4.4,
    relatedTemplates: ['discipleship-pathway-template', 'bible-study-template'],
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-11-05')
  },
  {
    id: 'church-planting-assessment',
    title: 'Church Planting Readiness Assessment',
    description: 'Comprehensive self-assessment tool for evaluating readiness to plant a church.',
    category: 'church-planting',
    subcategory: 'Assessment Tools',
    type: 'form',
    format: 'pdf',
    useCase: 'Assessing church planting readiness',
    instructions: 'Complete all sections honestly. Use results to identify areas for development before launching.',
    customizationNotes: [
      'Adapt questions for your denominational context',
      'Include additional local considerations',
      'Adjust scoring criteria as needed'
    ],
    downloadUrl: '/templates/church-planting-assessment.pdf',
    thumbnailUrl: '/images/templates/church-planting-assessment-thumb.jpg',
    author: 'Alan Hirsch',
    license: 'free',
    tags: ['church-planting', 'assessment', 'readiness', 'evaluation'],
    difficulty: 'intermediate',
    estimatedUseTime: '1-2 hours',
    featured: true,
    downloadCount: 670,
    rating: 4.7,
    relatedTemplates: ['ministry-plan-template', 'funding-strategy-template'],
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-11-01')
  }
];

// Sample Reading Lists
export const sampleReadingLists: ReadingList[] = [
  {
    id: 'missional-foundations',
    title: 'Missional Church Foundations',
    description: 'Essential reading for understanding the theological and practical foundations of missional church.',
    curator: 'Alan Hirsch',
    category: 'Missional Church',
    topics: ['Missional Theology', 'Church History', 'Ecclesiology'],
    difficulty: 'intermediate',
    estimatedReadingTime: '6-8 months',
    books: [
      {
        id: 'book-1',
        title: 'The Forgotten Ways',
        author: 'Alan Hirsch',
        description: 'Foundational text on apostolic genius and missional DNA.',
        reasoning: 'Essential for understanding the core principles of missional movement.',
        priority: 'essential',
        amazonUrl: 'https://amazon.com/forgotten-ways',
        coverUrl: '/images/books/forgotten-ways.jpg',
        estimatedReadingTime: '3 weeks'
      },
      {
        id: 'book-2', 
        title: 'Missional Church',
        author: 'Darrell Guder',
        description: 'Theological foundation for missional ecclesiology.',
        reasoning: 'Provides the theological framework that underlies missional thinking.',
        priority: 'essential',
        amazonUrl: 'https://amazon.com/missional-church',
        estimatedReadingTime: '4 weeks'
      },
      {
        id: 'book-3',
        title: 'The Shaping of Things to Come',
        author: 'Michael Frost & Alan Hirsch',
        description: 'Reimagining church for the 21st century.',
        reasoning: 'Practical vision for what missional church looks like in practice.',
        priority: 'recommended',
        amazonUrl: 'https://amazon.com/shaping-things-to-come',
        estimatedReadingTime: '2 weeks'
      }
    ],
    additionalResources: [
      {
        id: 'missional-church-conversation',
        title: 'The Missional Church Conversation',
        type: 'video',
        url: 'https://vimeo.com/missional-conversation',
        description: 'Panel discussion with key missional thinkers',
        duration: 90
      }
    ],
    featured: true,
    public: true,
    followers: 1240,
    tags: ['missional', 'church', 'theology', 'foundations'],
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-10-20')
  },
  {
    id: 'leadership-development',
    title: 'Missional Leadership Development',
    description: 'Key resources for developing leaders who can navigate the challenges of post-Christendom ministry.',
    curator: 'Alan Hirsch',
    category: 'Leadership',
    topics: ['Leadership Development', 'APEST', 'Team Building'],
    difficulty: 'intermediate',
    estimatedReadingTime: '4-6 months',
    books: [
      {
        id: 'book-4',
        title: '5Q: Reactivating the Original Intelligence and Capacity of the Body of Christ',
        author: 'Alan Hirsch',
        description: 'Understanding and implementing the fivefold ministry.',
        reasoning: 'Essential for understanding how God has designed the church to function.',
        priority: 'essential',
        amazonUrl: 'https://amazon.com/5q-hirsch',
        estimatedReadingTime: '3 weeks'
      },
      {
        id: 'book-5',
        title: 'The Permanent Revolution',
        author: 'Alan Hirsch & Tim Catchim',
        description: 'Apostolic imagination and practice for the 21st century church.',
        reasoning: 'Deep dive into apostolic leadership and church planting movements.',
        priority: 'essential',
        amazonUrl: 'https://amazon.com/permanent-revolution',
        estimatedReadingTime: '4 weeks'
      }
    ],
    featured: true,
    public: true,
    followers: 890,
    tags: ['leadership', 'apest', 'development', 'ministry'],
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-11-10')
  },
  {
    id: 'church-planting-essential',
    title: 'Church Planting Essentials',
    description: 'Must-read books for anyone called to plant churches or start new ministry initiatives.',
    curator: 'Alan Hirsch',
    category: 'Church Planting',
    topics: ['Church Planting', 'Startup', 'Vision', 'Strategy'],
    difficulty: 'beginner',
    estimatedReadingTime: '3-4 months',
    books: [
      {
        id: 'book-6',
        title: 'Church Planter',
        author: 'Darrin Patrick',
        description: 'Practical guide to planting and leading a thriving church.',
        reasoning: 'Comprehensive overview of the church planting process.',
        priority: 'essential',
        amazonUrl: 'https://amazon.com/church-planter',
        estimatedReadingTime: '2 weeks'
      },
      {
        id: 'book-7',
        title: 'The Starfish and the Spider',
        author: 'Ori Brafman & Rod Beckstrom',
        description: 'Understanding decentralized organizations and movements.',
        reasoning: 'Key insights into how movements scale and reproduce.',
        priority: 'recommended',
        amazonUrl: 'https://amazon.com/starfish-spider',
        estimatedReadingTime: '1 week'
      }
    ],
    featured: false,
    public: true,
    followers: 560,
    tags: ['church-planting', 'startup', 'practical', 'beginner'],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-10-25')
  }
];

// Resource Categories
export const resourceCategories: ResourceCategory[] = [
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Resources for developing missional leaders',
    icon: '👥',
    color: '#1D4A38',
    count: 24
  },
  {
    id: 'church-planting',
    name: 'Church Planting',
    description: 'Tools and guides for starting new churches',
    icon: '🌱',
    color: '#B2613E', 
    count: 18
  },
  {
    id: 'discipleship',
    name: 'Discipleship',
    description: 'Resources for making and multiplying disciples',
    icon: '📖',
    color: '#4B83C2',
    count: 15
  },
  {
    id: 'movement-building',
    name: 'Movement Building',
    description: 'Frameworks for catalyzing kingdom movements',
    icon: '🚀',
    color: '#2D6B4A',
    count: 12
  },
  {
    id: 'assessment',
    name: 'Assessment Tools',
    description: 'Diagnostic tools for individuals and organizations',
    icon: '📊',
    color: '#D4764E',
    count: 9
  },
  {
    id: 'church-health',
    name: 'Church Health',
    description: 'Resources for healthy church development',
    icon: '💚',
    color: '#6B9BD4',
    count: 16
  }
];

// Utility functions
export function getResourcesByCategory<T extends { category: string }>(
  resources: T[], 
  category: string
): T[] {
  return resources.filter(resource => resource.category === category);
}

export function getFeaturedResources<T extends { featured: boolean }>(
  resources: T[]
): T[] {
  return resources.filter(resource => resource.featured);
}

export function searchResources<T extends { title: string; description: string; tags: string[] }>(
  resources: T[],
  query: string
): T[] {
  const lowercaseQuery = query.toLowerCase();
  return resources.filter(resource =>
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getResourcesByTag<T extends { tags: string[] }>(
  resources: T[],
  tag: string
): T[] {
  return resources.filter(resource => 
    resource.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getMostDownloaded<T extends { downloadCount: number }>(
  resources: T[],
  limit: number = 5
): T[] {
  return [...resources]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
}

export function getHighestRated<T extends { rating: number }>(
  resources: T[],
  limit: number = 5
): T[] {
  return [...resources]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
