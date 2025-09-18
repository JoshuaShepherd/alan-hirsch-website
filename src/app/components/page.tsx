'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ComponentIcon,
  LayoutGridIcon,
  SettingsIcon,
  UsersIcon,
  BookOpenIcon,
  CreditCardIcon,
  MailIcon,
  VideoIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  PuzzleIcon,
  ShieldIcon,
  BrainIcon,
  StarIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  EyeIcon,
  XIcon,
  MaximizeIcon
} from 'lucide-react';

// Import components for preview
import { AccordionItem, PricingTier, TestimonialCard, FeatureGrid } from '@/components/ui/aceternity-components';
import { AnimatedCard, AnimatedButton, MetricCard } from '@/components/ui/animated-components';
import VortexDemo from '@/components/vortex-demo';
import NewsletterSignup from '@/components/email/NewsletterSignup';
import { PaywallComponent } from '@/components/monetization/PaywallComponent';
import { SubscriptionPlans } from '@/components/monetization/SubscriptionPlans';
import { MissionalHealthAssessment } from '@/components/missional/MissionalHealthAssessment';
import ResourceLibrary from '@/components/resource-library/ResourceLibrary';

// Component categories
type ComponentCategory = {
  icon: any;
  color: string;
  components: Array<{
    name: string;
    description: string;
    category: string;
    path: string;
    preview: () => React.ReactElement;
  }>;
};

type ComponentCategories = {
  [key: string]: ComponentCategory;
};

const componentCategories: ComponentCategories = {
  'UI Components': {
    icon: ComponentIcon,
    color: 'bg-blue-500',
    components: [
      {
        name: 'Aceternity Components',
        description: 'Interactive UI elements with smooth animations',
        category: 'ui',
        path: 'ui/aceternity-components',
        preview: () => (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Aceternity UI Components</h3>
              <p className="text-gray-600">Interactive elements with smooth animations and modern design</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Accordion Component</h4>
                <div className="space-y-2">
                  <AccordionItem title="What is missional leadership?" isOpen={true}>
                    Missional leadership is about leading from a posture of being sent by God into the world. It involves understanding your context, engaging with culture, and mobilizing others for mission.
                  </AccordionItem>
                  <AccordionItem title="How do I develop APEST gifts?">
                    The APEST gifts (Apostolic, Prophetic, Evangelistic, Shepherding, Teaching) can be developed through intentional practice, mentorship, and creating environments where these gifts can flourish.
                  </AccordionItem>
                  <AccordionItem title="What is the Forgotten Ways?">
                    The Forgotten Ways refers to the missional principles and practices that enabled the early Christian movement to spread rapidly across the Roman Empire.
                  </AccordionItem>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Pricing Component</h4>
                <PricingTier
                  name="Scholar Plan"
                  price="$49"
                  period="month"
                  description="Full access to all resources and exclusive content"
                  features={[
                    'Complete book library access',
                    'Weekly exclusive articles',
                    'Live Q&A sessions with Alan',
                    'Advanced missional tools',
                    'Community discussions',
                    'Downloadable resources'
                  ]}
                  ctaText="Start Learning"
                  isPopular={true}
                />
              </div>
            </div>
          </div>
        )
      },
      {
        name: 'Animated Components',
        description: 'Motion-based components with Framer Motion',
        category: 'ui',
        path: 'ui/animated-components',
        preview: () => (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Animated Components</h3>
              <p className="text-gray-600">Motion-based components with Framer Motion animations</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedCard delay={0}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Missional Resources</h3>
                  <p className="text-gray-600">Access to comprehensive missional leadership materials</p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Community Learning</h3>
                  <p className="text-gray-600">Connect with other leaders on the missional journey</p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={0.2}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BrainIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-600">Get personalized recommendations and guidance</p>
                </div>
              </AnimatedCard>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <MetricCard 
                title="Total Readers" 
                value="12,847" 
                change="+15.3%" 
                trend="up"
                icon="👥"
              />
              <MetricCard 
                title="Books Published" 
                value="15" 
                change="+2" 
                trend="up"
                icon="📚"
              />
              <MetricCard 
                title="Churches Impacted" 
                value="3,200+" 
                change="+8.7%" 
                trend="up"
                icon="⛪"
              />
            </div>
          </div>
        )
      },
      {
        name: 'Vortex Background',
        description: 'Particle-based animated background effect',
        category: 'ui',
        path: 'vortex-demo',
        preview: () => (
          <div className="w-full h-full min-h-[600px] bg-black rounded-lg overflow-hidden relative">
            <VortexDemo />
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <p className="text-white/70 text-lg">
                This particle vortex background creates an immersive, dynamic experience for hero sections and landing pages.
                The animation is GPU-accelerated and responsive to user interaction.
              </p>
            </div>
          </div>
        )
      }
    ]
  },
  'Authentication': {
    icon: ShieldIcon,
    color: 'bg-green-500',
    components: [
      {
        name: 'Auth Components',
        description: 'Login, signup, and user management',
        category: 'auth',
        path: 'auth',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Authentication System</h3>
            <p className="text-sm text-gray-600">Login, signup, password reset, and user profile management components.</p>
          </div>
        )
      }
    ]
  },
  'Learning Management': {
    icon: GraduationCapIcon,
    color: 'bg-purple-500',
    components: [
      {
        name: 'LMS Components',
        description: 'Course management and learning tools',
        category: 'lms',
        path: 'lms',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Learning Management System</h3>
            <p className="text-sm text-gray-600">Course creation, progress tracking, assignments, and student management.</p>
          </div>
        )
      },
      {
        name: 'Workshop Components',
        description: 'Live workshop and cohort management',
        category: 'workshops',
        path: 'workshops',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Workshop Management</h3>
            <p className="text-sm text-gray-600">Live events, cohort management, and feedback collection.</p>
          </div>
        )
      }
    ]
  },
  'AI Agents': {
    icon: BrainIcon,
    color: 'bg-cyan-500',
    components: [
      {
        name: 'AI Agents',
        description: 'Intelligent conversational agents',
        category: 'ai-agents',
        path: 'ai-agents',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">AI Agent System</h3>
            <p className="text-sm text-gray-600">Conversational AI agents for content recommendations and guidance.</p>
          </div>
        )
      },
      {
        name: 'APEST Agents',
        description: 'Specialized leadership assessment agents',
        category: 'apest-agents',
        path: 'apest-agents',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">APEST Leadership Agents</h3>
            <p className="text-sm text-gray-600">Specialized agents for Apostolic, Prophetic, Evangelistic, Shepherding, and Teaching assessments.</p>
          </div>
        )
      }
    ]
  },
  'Missional Tools': {
    icon: HeartHandshakeIcon,
    color: 'bg-red-500',
    components: [
      {
        name: 'Missional Assessment',
        description: 'Church health and mission assessment tools',
        category: 'missional',
        path: 'missional',
        preview: () => (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Missional Health Assessment</h3>
              <p className="text-gray-600">Interactive tools for evaluating church and leadership health</p>
            </div>
            <MissionalHealthAssessment onAssessmentComplete={(results) => {
              console.log('Assessment completed:', results);
            }} />
          </div>
        )
      }
    ]
  },
  'Resource Library': {
    icon: BookOpenIcon,
    color: 'bg-orange-500',
    components: [
      {
        name: 'Resource Library',
        description: 'Content discovery and resource management',
        category: 'resource-library',
        path: 'resource-library',
        preview: () => (
          <div className="w-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Resource Library</h3>
              <p className="text-gray-600">Comprehensive content discovery and resource management system</p>
            </div>
            <ResourceLibrary />
          </div>
        )
      }
    ]
  },
  'Email & Communication': {
    icon: MailIcon,
    color: 'bg-teal-500',
    components: [
      {
        name: 'Newsletter Signup',
        description: 'Email capture and newsletter management',
        category: 'email',
        path: 'email/NewsletterSignup',
        preview: () => (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Newsletter Signup Components</h3>
              <p className="text-gray-600">Capture leads with beautiful, conversion-optimized forms</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Hero Variant</h4>
                <NewsletterSignup variant="hero" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Sidebar Variant</h4>
                <NewsletterSignup variant="sidebar" />
              </div>
            </div>
          </div>
        )
      },
      {
        name: 'Email Components',
        description: 'Email templates and automation',
        category: 'email',
        path: 'email',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Email System</h3>
            <p className="text-sm text-gray-600">Newsletter templates, email sequences, and automation tools.</p>
          </div>
        )
      }
    ]
  },
  'Monetization': {
    icon: CreditCardIcon,
    color: 'bg-yellow-500',
    components: [
      {
        name: 'Subscription Plans',
        description: 'Pricing and subscription management',
        category: 'monetization',
        path: 'monetization/SubscriptionPlans',
        preview: () => (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Subscription Plans</h3>
              <p className="text-gray-600">Flexible pricing options for different user needs</p>
            </div>
            <SubscriptionPlans 
              plans={[
                {
                  id: 'free',
                  name: 'Free',
                  description: 'Get started with basic access',
                  price: 0,
                  currency: 'USD',
                  interval: 'month',
                  features: ['Access to select articles', 'Basic community features', 'Monthly newsletter'],
                  popular: false
                },
                {
                  id: 'member',
                  name: 'Member',
                  description: 'Perfect for growing leaders',
                  price: 14.99,
                  currency: 'USD',
                  interval: 'month',
                  features: ['Access to 3 complete books', 'Weekly exclusive articles', 'Member discussions', 'Downloadable resources'],
                  popular: true
                },
                {
                  id: 'scholar',
                  name: 'Scholar',
                  description: 'Full access to everything',
                  price: 49.99,
                  currency: 'USD',
                  interval: 'month',
                  features: ['Complete library access', 'Live Q&A sessions', 'Advanced tools', 'Priority support', 'Exclusive webinars'],
                  popular: false
                }
              ]} 
              isLoggedIn={false} 
              onSelectPlan={(planId) => console.log('Selected plan:', planId)} 
            />
          </div>
        )
      },
      {
        name: 'Paywall Component',
        description: 'Content access control and premium features',
        category: 'monetization',
        path: 'monetization/PaywallComponent',
        preview: () => (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Paywall Component</h3>
              <p className="text-gray-600">Control access to premium content with beautiful upgrade prompts</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Article Paywall</h4>
                <PaywallComponent
                  contentType="article"
                  contentTitle="Advanced Missional Leadership Strategies"
                  contentDescription="Deep dive into practical frameworks for leading missional transformation in your context."
                  authorName="Alan Hirsch"
                  estimatedReadTime={15}
                  requiredPlan="member"
                  previewContent="In this comprehensive guide, we explore the essential elements of missional leadership that every church leader needs to understand..."
                  onUpgrade={(planId) => console.log('Upgrade to:', planId)}
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Book Chapter Paywall</h4>
                <PaywallComponent
                  contentType="chapter"
                  contentTitle="The Forgotten Ways - Chapter 7"
                  contentDescription="Discover the six elements of mDNA that drive missional movements"
                  authorName="Alan Hirsch"
                  estimatedReadTime={25}
                  requiredPlan="scholar"
                  previewContent="The concept of missional DNA (mDNA) is crucial for understanding how missional movements spread and multiply..."
                  onUpgrade={(planId) => console.log('Upgrade to:', planId)}
                />
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  'Payment & Commerce': {
    icon: CreditCardIcon,
    color: 'bg-indigo-500',
    components: [
      {
        name: 'Payment Components',
        description: 'Event ticketing and product purchases',
        category: 'payment',
        path: 'payment',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Payment System</h3>
            <p className="text-sm text-gray-600">Event registration, product sales, and payment processing.</p>
          </div>
        )
      },
      {
        name: 'Product Components',
        description: 'Product catalog and e-commerce',
        category: 'products',
        path: 'products',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibent mb-2">Product Catalog</h3>
            <p className="text-sm text-gray-600">Product listings, shopping cart, and service booking.</p>
          </div>
        )
      }
    ]
  },
  'Community & Social': {
    icon: UsersIcon,
    color: 'bg-pink-500',
    components: [
      {
        name: 'Community Components',
        description: 'Social features and community management',
        category: 'community',
        path: 'community',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Community Platform</h3>
            <p className="text-sm text-gray-600">Discussion forums, member profiles, and social interactions.</p>
          </div>
        )
      }
    ]
  },
  'Multimedia': {
    icon: VideoIcon,
    color: 'bg-emerald-500',
    components: [
      {
        name: 'Multimedia Components',
        description: 'Video, audio, and media management',
        category: 'multimedia',
        path: 'multimedia',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Multimedia System</h3>
            <p className="text-sm text-gray-600">Video players, audio controls, and media library management.</p>
          </div>
        )
      }
    ]
  },
  'Dashboard & Admin': {
    icon: LayoutGridIcon,
    color: 'bg-slate-500',
    components: [
      {
        name: 'Dashboard Components',
        description: 'Analytics and admin interfaces',
        category: 'dashboard',
        path: 'dashboard',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Dashboard System</h3>
            <p className="text-sm text-gray-600">Analytics, user management, and administrative controls.</p>
          </div>
        )
      }
    ]
  },
  'Content Management': {
    icon: SettingsIcon,
    color: 'bg-gray-500',
    components: [
      {
        name: 'CMS Components',
        description: 'Content creation and management tools',
        category: 'cms',
        path: 'cms',
        preview: () => (
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Content Management</h3>
            <p className="text-sm text-gray-600">Rich text editors, content scheduling, and publication tools.</p>
          </div>
        )
      }
    ]
  }
};

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewComponent, setPreviewComponent] = useState<{
    name: string;
    description: string;
    path: string;
    preview: () => React.ReactElement;
  } | null>(null);

  const filteredCategories = Object.entries(componentCategories).filter(([categoryName, categoryData]) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return categoryName.toLowerCase().includes(searchLower) ||
           categoryData.components.some(comp => 
             comp.name.toLowerCase().includes(searchLower) ||
             comp.description.toLowerCase().includes(searchLower)
           );
  });

  const getComponentsCount = () => {
    return Object.values(componentCategories).reduce((total, category) => total + category.components.length, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ComponentIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Component Library</h1>
                <p className="text-sm text-gray-500">
                  {Object.keys(componentCategories).length} categories • {getComponentsCount()} components
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LayoutGridIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <FilterIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {filteredCategories.map(([categoryName, categoryData]) => {
                  const Icon = categoryData.icon;
                  const isSelected = selectedCategory === categoryName;
                  
                  return (
                    <button
                      key={categoryName}
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : categoryName);
                        setSelectedComponent(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-lg ${categoryData.color}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{categoryName}</div>
                          <div className="text-xs text-gray-500">
                            {categoryData.components.length} component{categoryData.components.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <ChevronDownIcon 
                        className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-180' : ''}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {!selectedCategory ? (
              // Overview
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Alan Hirsch Website Component Library
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    A comprehensive collection of reusable components built for the Alan Hirsch platform. 
                    From AI agents to learning management systems, explore all the building blocks that power the site.
                  </p>
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredCategories.map(([categoryName, categoryData]) => {
                    const Icon = categoryData.icon;
                    
                    return (
                      <motion.div
                        key={categoryName}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer transition-shadow hover:shadow-md"
                        onClick={() => setSelectedCategory(categoryName)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${categoryData.color}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{categoryName}</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {categoryData.components.length} component{categoryData.components.length !== 1 ? 's' : ''}
                            </p>
                            <div className="space-y-1">
                              {categoryData.components.slice(0, 3).map((component) => (
                                <div key={component.name} className="text-xs text-gray-500">
                                  • {component.name}
                                </div>
                              ))}
                              {categoryData.components.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  ... and {categoryData.components.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Category Detail
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      ← Back to all categories
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-lg ${componentCategories[selectedCategory].color}`}>
                      {(() => {
                        const Icon = componentCategories[selectedCategory].icon;
                        return <Icon className="h-6 w-6 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
                      <p className="text-gray-600">
                        {componentCategories[selectedCategory].components.length} component{componentCategories[selectedCategory].components.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {componentCategories[selectedCategory].components.map((component) => (
                      <div key={component.name} className="border border-gray-200 rounded-lg">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{component.name}</h3>
                              <p className="text-sm text-gray-600">{component.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Path: components/{component.path}
                              </p>
                            </div>
                            <button
                              onClick={() => setPreviewComponent(component)}
                              className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <MaximizeIcon className="h-4 w-4" />
                              <span>Full Preview</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-Page Preview Modal */}
      <AnimatePresence>
        {previewComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setPreviewComponent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 bg-white rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{previewComponent.name}</h2>
                  <p className="text-gray-600 mt-1">{previewComponent.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Path: components/{previewComponent.path}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewComponent(null)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <XIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6" style={{ height: 'calc(100vh - 140px)' }}>
                <div className="w-full h-full">
                  {previewComponent.preview()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
