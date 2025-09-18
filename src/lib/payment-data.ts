import { 
  DonationAmount, 
  DonationFrequency, 
  DonationPurpose, 
  Event, 
  EventTicketType,
  EventAgendaItem,
  EventMaterial,
  EventTestimonial,
  EventFAQ,
  RegistrationQuestion
} from '@/types/payment';

// Donation configuration
export const donationAmounts: DonationAmount[] = [
  { id: 'amount-25', amount: 25, label: '$25' },
  { id: 'amount-50', amount: 50, label: '$50' },
  { id: 'amount-100', amount: 100, label: '$100', popular: true },
  { id: 'amount-250', amount: 250, label: '$250' },
  { id: 'amount-500', amount: 500, label: '$500' },
  { id: 'custom', amount: 0, label: 'Custom Amount' }
];

export const donationFrequencies: DonationFrequency[] = [
  {
    id: 'one-time',
    label: 'One-time',
    description: 'Make a single donation'
  },
  {
    id: 'monthly',
    label: 'Monthly',
    description: 'Recurring monthly donation'
  },
  {
    id: 'quarterly',
    label: 'Quarterly',
    description: 'Recurring quarterly donation'
  },
  {
    id: 'annually',
    label: 'Annually',
    description: 'Recurring annual donation'
  }
];

export const donationPurposes: DonationPurpose[] = [
  {
    id: 'general-fund',
    title: 'General Fund',
    description: 'Support overall mission and operations',
    icon: '🎯'
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    description: 'Fund training programs and resources for emerging leaders',
    targetAmount: 50000,
    currentAmount: 32500,
    icon: '👥'
  },
  {
    id: 'church-planting',
    title: 'Church Planting',
    description: 'Support new church plants and missional communities',
    targetAmount: 100000,
    currentAmount: 67800,
    icon: '🌱'
  },
  {
    id: 'global-missions',
    title: 'Global Missions',
    description: 'Fund missional work in unreached regions',
    targetAmount: 75000,
    currentAmount: 45200,
    icon: '🌍'
  },
  {
    id: 'scholarship-fund',
    title: 'Scholarship Fund',
    description: 'Provide training scholarships for leaders in developing countries',
    targetAmount: 25000,
    currentAmount: 18900,
    icon: '🎓'
  },
  {
    id: 'research-publishing',
    title: 'Research & Publishing',
    description: 'Support research projects and book publications',
    targetAmount: 40000,
    currentAmount: 22100,
    icon: '📚'
  }
];

// Sample events data
export const sampleEvents: Event[] = [
  {
    id: 'apest-intensive-2024',
    title: 'APEST Leadership Intensive',
    subtitle: 'Developing Fivefold Leaders for Missional Impact',
    description: 'An immersive 3-day experience exploring the APEST framework for developing well-rounded leadership teams.',
    longDescription: 'This intensive workshop dives deep into the Apostolic, Prophetic, Evangelistic, Shepherding, and Teaching functions that create healthy, missional communities. You will learn practical tools for identifying, developing, and deploying APEST leaders in your context.',
    type: 'workshop',
    format: 'hybrid',
    startDate: new Date('2024-06-15T09:00:00'),
    endDate: new Date('2024-06-17T17:00:00'),
    timezone: 'PST',
    location: {
      venue: 'San Francisco Theological Seminary',
      address: '105 Seminary Rd',
      city: 'San Anselmo',
      state: 'CA',
      country: 'USA',
      postalCode: '94960',
      coordinates: { lat: 37.9735, lng: -122.5614 }
    },
    virtualDetails: {
      platform: 'zoom',
      recordingAvailable: true
    },
    instructor: 'Alan Hirsch',
    instructorBio: 'Alan Hirsch is a pioneering voice in the missional movement and founder of numerous organizations focused on church renewal and leadership development.',
    instructorImageUrl: '/images/alan-hirsch-portrait.jpg',
    imageUrl: '/images/events/apest-intensive.jpg',
    price: 497,
    originalPrice: 597,
    currency: 'USD',
    maxAttendees: 100,
    currentAttendees: 76,
    earlyBirdPrice: 397,
    earlyBirdDeadline: new Date('2024-05-01'),
    featured: true,
    status: 'published',
    tags: ['APEST', 'Leadership', 'Team Development', 'Missional'],
    category: 'Leadership Development',
    targetAudience: ['Church Leaders', 'Pastors', 'Team Leaders', 'Consultants'],
    prerequisites: ['Basic understanding of church leadership'],
    learningOutcomes: [
      'Master the APEST framework for team development',
      'Identify your primary and secondary APEST functions',
      'Create development plans for your leadership team',
      'Design systems for ongoing APEST assessment',
      'Implement missional leadership practices'
    ],
    agenda: [
      {
        id: 'day1-session1',
        title: 'Introduction to APEST',
        description: 'Biblical foundations and modern applications',
        startTime: '09:00',
        endTime: '10:30',
        speaker: 'Alan Hirsch',
        type: 'session'
      },
      {
        id: 'day1-break1',
        title: 'Morning Break',
        startTime: '10:30',
        endTime: '10:45',
        type: 'break'
      },
      {
        id: 'day1-session2',
        title: 'Apostolic Function',
        description: 'Understanding the pioneering and church-planting function',
        startTime: '10:45',
        endTime: '12:00',
        speaker: 'Alan Hirsch',
        type: 'session'
      }
    ],
    materials: [
      {
        id: 'apest-workbook',
        title: 'APEST Leadership Workbook',
        description: 'Comprehensive workbook with assessments and exercises',
        type: 'pdf',
        availableAfter: 'registration'
      },
      {
        id: 'session-recordings',
        title: 'Session Recordings',
        description: 'Access to all session recordings for 90 days',
        type: 'video',
        availableAfter: 'event-start'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-1',
        attendeeName: 'Sarah Johnson',
        role: 'Lead Pastor',
        organization: 'Grace Community Church',
        quote: 'The APEST intensive transformed how our leadership team operates. We now have clarity on our roles and complement each other beautifully.',
        rating: 5,
        eventId: 'apest-intensive-2024'
      }
    ],
    faq: [
      {
        id: 'faq-1',
        question: 'What is included in the intensive?',
        answer: 'All sessions, materials, meals, and accommodation for the residential portion.',
        category: 'logistics'
      }
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        name: 'Early Bird Registration',
        description: 'Full access to all sessions with early registration savings',
        price: 397,
        originalPrice: 497,
        maxPerPerson: 1,
        soldQuantity: 45,
        availableUntil: new Date('2024-03-01'),
        benefits: [
          'All workshop sessions',
          'Digital workbook and resources',
          'Networking lunches',
          'Recording access for 90 days',
          'Certificate of completion'
        ]
      },
      {
        id: 'standard',
        name: 'Standard Registration',
        description: 'Full access to all sessions',
        price: 497,
        maxPerPerson: 2,
        soldQuantity: 23,
        benefits: [
          'All workshop sessions',
          'Digital workbook and resources',
          'Networking lunches',
          'Recording access for 60 days',
          'Certificate of completion'
        ]
      },
      {
        id: 'vip',
        name: 'VIP Experience',
        description: 'Premium access with additional benefits',
        price: 697,
        maxPerPerson: 1,
        soldQuantity: 8,
        benefits: [
          'All workshop sessions',
          'Digital workbook and resources',
          'Networking lunches',
          'Recording access for 180 days',
          'Certificate of completion',
          'Private Q&A session with Alan',
          'Signed copy of latest book',
          'Priority seating'
        ]
      }
    ],
    refundPolicy: 'Full refund available up to 30 days before event. 50% refund up to 14 days before.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'missional-conference-2024',
    title: 'Global Missional Conference',
    subtitle: 'Renewing the Church for Mission',
    description: 'A comprehensive 2-day conference featuring leading voices in missional theology and practice.',
    longDescription: 'Join practitioners and theologians from around the world as we explore the cutting edge of missional church renewal. This conference will challenge your assumptions and equip you with practical tools for transformation.',
    type: 'conference',
    format: 'in-person',
    startDate: new Date('2024-09-20T09:00:00'),
    endDate: new Date('2024-09-21T17:00:00'),
    timezone: 'EST',
    location: {
      venue: 'New York Marriott Marquis',
      address: '1535 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10036',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    instructor: 'Alan Hirsch',
    instructorBio: 'Alan Hirsch is a pioneering voice in the missional movement.',
    imageUrl: '/images/events/missional-conference.jpg',
    price: 299,
    currency: 'USD',
    maxAttendees: 500,
    currentAttendees: 234,
    earlyBirdPrice: 249,
    earlyBirdDeadline: new Date('2024-08-01'),
    featured: true,
    status: 'published',
    tags: ['Missional', 'Conference', 'Theology', 'Practice'],
    category: 'Conference',
    targetAudience: ['Pastors', 'Church Leaders', 'Theologians', 'Students'],
    learningOutcomes: [
      'Understand contemporary missional theology',
      'Learn practical tools for church renewal',
      'Network with missional practitioners',
      'Develop a personal missional action plan'
    ],
    agenda: [
      {
        id: 'conf-day1-keynote',
        title: 'Opening Keynote: The Missional Imperative',
        startTime: '09:00',
        endTime: '10:00',
        speaker: 'Alan Hirsch',
        type: 'keynote'
      }
    ],
    materials: [],
    testimonials: [],
    faq: [],
    refundPolicy: 'Full refund available up to 14 days before event.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'movement-masterclass-2024',
    title: 'Movement Multiplication Masterclass',
    subtitle: 'From Church Growth to Movement Thinking',
    description: 'A focused masterclass on the principles and practices of movement multiplication.',
    longDescription: 'This intensive session explores the shift from church growth mentality to movement multiplication thinking. Learn the key principles that have driven successful movements throughout history.',
    type: 'masterclass',
    format: 'virtual',
    startDate: new Date('2024-04-10T10:00:00'),
    endDate: new Date('2024-04-10T16:00:00'),
    timezone: 'PST',
    virtualDetails: {
      platform: 'zoom',
      recordingAvailable: true
    },
    instructor: 'Alan Hirsch',
    instructorBio: 'Expert in movement dynamics and church multiplication.',
    imageUrl: '/images/events/movement-masterclass.jpg',
    price: 197,
    currency: 'USD',
    maxAttendees: 200,
    currentAttendees: 156,
    featured: false,
    status: 'published',
    tags: ['Movement', 'Multiplication', 'Strategy', 'Growth'],
    category: 'Strategy',
    targetAudience: ['Church Planters', 'Movement Leaders', 'Denominational Leaders'],
    learningOutcomes: [
      'Understand movement vs. institutional thinking',
      'Learn key movement multiplication principles',
      'Develop a movement mindset',
      'Create multiplication strategies'
    ],
    agenda: [
      {
        id: 'master-session1',
        title: 'Movement Principles',
        startTime: '10:00',
        endTime: '12:00',
        speaker: 'Alan Hirsch',
        type: 'session'
      }
    ],
    materials: [],
    testimonials: [],
    faq: [],
    refundPolicy: 'Full refund available up to 7 days before event.',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05')
  }
];

// Event registration questions by event ID
export const eventRegistrationQuestions: Record<string, RegistrationQuestion[]> = {
  'apest-intensive-2024': [
    {
      id: 'experience-level',
      question: 'What is your experience level with APEST?',
      type: 'select',
      required: true,
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    {
      id: 'current-role',
      question: 'What is your current ministry role?',
      type: 'text',
      required: true,
      placeholder: 'e.g., Lead Pastor, Church Planter, etc.'
    },
    {
      id: 'team-size',
      question: 'How many people are on your leadership team?',
      type: 'select',
      required: false,
      options: ['1-3', '4-7', '8-12', '13-20', '20+']
    },
    {
      id: 'implementation-goals',
      question: 'What are your main goals for implementing APEST in your context?',
      type: 'textarea',
      required: true,
      placeholder: 'Describe your hopes and expectations...'
    }
  ],
  'missional-conference-2024': [
    {
      id: 'church-context',
      question: 'Describe your church/organizational context',
      type: 'textarea',
      required: true,
      placeholder: 'Size, location, denominational background, etc.'
    },
    {
      id: 'missional-experience',
      question: 'How would you describe your experience with missional practices?',
      type: 'select',
      required: true,
      options: ['New to missional thinking', 'Some experience', 'Well-experienced', 'Deeply embedded']
    }
  ],
  'movement-masterclass-2024': [
    {
      id: 'multiplication-experience',
      question: 'Have you been involved in church multiplication efforts?',
      type: 'select',
      required: true,
      options: ['No experience', 'Some involvement', 'Led multiplication efforts', 'Movement catalyst']
    },
    {
      id: 'specific-challenges',
      question: 'What specific challenges are you facing in multiplication?',
      type: 'textarea',
      required: false,
      placeholder: 'Describe your current challenges...'
    }
  ]
};

// Utility functions
export const getEventsByCategory = (category: string): Event[] => {
  return sampleEvents.filter(event => event.category === category);
};

export const getEventsByFormat = (format: string): Event[] => {
  return sampleEvents.filter(event => event.format === format);
};

export const getFeaturedEvents = (): Event[] => {
  return sampleEvents.filter(event => event.featured);
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return sampleEvents.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.instructor.toLowerCase().includes(lowercaseQuery) ||
    event.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const calculateEventPrice = (event: Event): number => {
  const now = new Date();
  
  if (event.earlyBirdPrice && event.earlyBirdDeadline && now < event.earlyBirdDeadline) {
    return event.earlyBirdPrice;
  }
  
  return event.price;
};

export const getEventCategories = (): string[] => {
  const categories = sampleEvents.map(event => event.category);
  return [...new Set(categories)];
};

export const getEventFormats = (): string[] => {
  const formats = sampleEvents.map(event => event.format);
  return [...new Set(formats)];
};
