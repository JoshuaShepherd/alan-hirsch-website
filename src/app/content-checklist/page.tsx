'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  Target,
  BarChart3,
  Clock,
  Filter,
  Search,
  Download,
  RefreshCw,
  Archive,
  Eye,
  EyeOff,
  Plus,
  Minus
} from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

// Define the structure of our checklist data
interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'P0' | 'P1' | 'P2';
  category: string;
  estimatedHours?: number;
}

interface ChecklistSection {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: ChecklistItem[];
  expanded: boolean;
}

const initialChecklistData: ChecklistSection[] = [
  {
    id: 'core-infrastructure',
    title: 'Core Website Infrastructure',
    emoji: '🏠',
    description: 'Essential pages and foundational systems',
    expanded: true,
    items: [
      {
        id: 'homepage',
        title: 'Homepage',
        description: 'Hero, value prop, content highlights, clear CTAs',
        completed: true, // ✅ Multiple implementations exist (page.tsx, page-original.tsx, etc.)
        priority: 'P0',
        category: 'Public-Facing Pages',
        estimatedHours: 16
      },
      {
        id: 'about-alan',
        title: 'About Alan',
        description: 'Story, mission, credibility markers, professional photos',
        completed: true, // ✅ About page exists with comprehensive content
        priority: 'P0',
        category: 'Public-Facing Pages',
        estimatedHours: 8
      },
      {
        id: 'speaking-consulting',
        title: 'Speaking/Consulting',
        description: 'Topics, testimonials, booking integration (Calendly)',
        completed: true, // ✅ src/app/speaking/ exists
        priority: 'P1',
        category: 'Public-Facing Pages',
        estimatedHours: 12
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'General inquiries, media kit, press resources',
        completed: true, // ✅ Contact page exists with comprehensive contact options
        priority: 'P1',
        category: 'Public-Facing Pages',
        estimatedHours: 6
      },
      {
        id: 'legal-pages',
        title: 'Legal Pages',
        description: 'Privacy policy, terms of service, cookie policy',
        completed: true, // ✅ All legal pages exist: privacy, terms, and cookies
        priority: 'P0',
        category: 'Public-Facing Pages',
        estimatedHours: 4
      },
      {
        id: 'ethics-statement',
        title: 'Ethics Statement',
        description: 'Human-first AI usage, transparency commitments',
        completed: true, // ✅ Ethics page exists with comprehensive AI ethics policy
        priority: 'P1',
        category: 'Public-Facing Pages',
        estimatedHours: 3
      },
      {
        id: 'blog-articles-index',
        title: 'Blog/Articles Index',
        description: 'Organized by categories, tags, search',
        completed: true, // ✅ Articles index with search and filtering functionality
        priority: 'P0',
        category: 'Content Publishing System',
        estimatedHours: 20
      },
      {
        id: 'individual-article-pages',
        title: 'Individual Article Pages',
        description: 'Full content, sharing, comments',
        completed: true, // ✅ Multiple individual article pages with rich content and navigation
        priority: 'P0',
        category: 'Content Publishing System',
        estimatedHours: 15
      },
      {
        id: 'content-management',
        title: 'Content Management',
        description: 'Easy publishing interface for Alan',
        completed: true, // ✅ Multiple CMS implementations found (src/components/cms/, block-based editor)
        priority: 'P1',
        category: 'Content Publishing System',
        estimatedHours: 25
      },
      {
        id: 'seo-optimization',
        title: 'SEO Optimization',
        description: 'Meta tags, structured data, sitemap',
        completed: true, // ✅ Confirmed in previous assessment
        priority: 'P0',
        category: 'Content Publishing System',
        estimatedHours: 8
      },
      {
        id: 'rss-feed',
        title: 'RSS Feed',
        description: 'For content syndication',
        completed: false, // ❌ Not mentioned in audit
        priority: 'P2',
        category: 'Content Publishing System',
        estimatedHours: 4
      }
    ]
  },
  {
    id: 'content-media-hub',
    title: 'Content & Media Hub',
    emoji: '📚',
    description: 'Written content, multimedia, and resource libraries',
    expanded: false,
    items: [
      {
        id: 'article-repository',
        title: 'Article Repository',
        description: 'Existing Alan Hirsch content migration',
        completed: false, // ❌ No centralized article system found
        priority: 'P0',
        category: 'Written Content',
        estimatedHours: 30
      },
      {
        id: 'book-integration',
        title: 'Book Integration',
        description: 'Links to published works, excerpts',
        completed: true, // ✅ Extensive book library in src/content/books/ with 15+ books
        priority: 'P1',
        category: 'Written Content',
        estimatedHours: 12
      },
      {
        id: 'white-papers-research',
        title: 'White Papers/Research',
        description: 'Downloadable resources',
        completed: true, // ✅ Research data found in public/data/ including Alan_Analysis.pdf
        priority: 'P1',
        category: 'Written Content',
        estimatedHours: 10
      },
      {
        id: 'newsletter-archive',
        title: 'Newsletter Archive',
        description: 'Searchable past issues',
        completed: true, // ✅ Newsletter system exists at src/app/newsletter/
        priority: 'P2',
        category: 'Written Content',
        estimatedHours: 8
      },
      {
        id: 'podcast-section',
        title: 'Podcast Section',
        description: 'Episode index, player, transcripts',
        completed: true, // ✅ Podcast system exists at src/app/podcast/
        priority: 'P1',
        category: 'Multimedia Content',
        estimatedHours: 18
      },
      {
        id: 'video-library',
        title: 'Video Library',
        description: 'Organized by topic, embedded players',
        completed: true, // ✅ VideoLibrary component created with search, filtering, and comprehensive video management
        priority: 'P2',
        category: 'Multimedia Content',
        estimatedHours: 15
      },
      {
        id: 'audio-player-integration',
        title: 'Audio Player Integration',
        description: 'For talks, sermons, interviews',
        completed: true, // ✅ UnifiedMediaPlayer supports both video and audio with advanced controls, chapters, speed adjustment
        priority: 'P2',
        category: 'Multimedia Content',
        estimatedHours: 12
      },
      {
        id: 'transcript-system',
        title: 'Transcript System',
        description: 'AI-generated, editable transcripts',
        completed: true, // ✅ TranscriptPanel component with interactive transcripts, search, time-sync navigation
        priority: 'P2',
        category: 'Multimedia Content',
        estimatedHours: 20
      }
    ]
  },
  {
    id: 'ecommerce-monetization',
    title: 'E-Commerce & Monetization',
    emoji: '💰',
    description: 'Payment processing and product catalog',
    expanded: false,
    items: [
      {
        id: 'stripe-integration',
        title: 'Stripe Integration',
        description: 'Secure payment processing',
        completed: true, // ✅ Billing system found at src/components/billing/
        priority: 'P0',
        category: 'Payment Processing',
        estimatedHours: 25
      },
      {
        id: 'subscription-management',
        title: 'Subscription Management',
        description: 'Recurring billing system',
        completed: true, // ✅ Subscription management in billing components
        priority: 'P0',
        category: 'Payment Processing',
        estimatedHours: 30
      },
      {
        id: 'donation-system',
        title: 'Donation System',
        description: 'One-time and recurring donations',
        completed: true, // ✅ DonationsPage.tsx with comprehensive donation functionality
        priority: 'P1',
        category: 'Payment Processing',
        estimatedHours: 15
      },
      {
        id: 'event-ticketing',
        title: 'Event Ticketing',
        description: 'Workshop and conference registrations',
        completed: true, // ✅ EventTicketing.tsx and EventRegistrationModal.tsx implemented
        priority: 'P1',
        category: 'Payment Processing',
        estimatedHours: 20
      },
      {
        id: 'digital-products',
        title: 'Digital Products',
        description: 'Courses, guides, templates',
        completed: true, // ✅ ProductCatalog.tsx with comprehensive digital product support
        priority: 'P0',
        category: 'Product Catalog',
        estimatedHours: 25
      },
      {
        id: 'physical-products',
        title: 'Physical Products',
        description: 'Books, merchandise',
        completed: true, // ✅ Physical product support in ProductCatalog.tsx
        priority: 'P1',
        category: 'Product Catalog',
        estimatedHours: 20
      },
      {
        id: 'coaching-consulting',
        title: 'Coaching/Consulting',
        description: 'Service booking and payment',
        completed: true, // ✅ ServiceBooking.tsx for coaching and consulting services
        priority: 'P1',
        category: 'Product Catalog',
        estimatedHours: 30
      },
      {
        id: 'workshop-events',
        title: 'Workshop/Events',
        description: 'Registration and payment system',
        completed: true, // ✅ Event registration and workshop system implemented
        priority: 'P1',
        category: 'Product Catalog',
        estimatedHours: 35
      }
    ]
  },
  {
    id: 'membership-auth',
    title: 'Membership & Authentication',
    emoji: '👥',
    description: 'User management and membership tiers',
    expanded: false,
    items: [
      {
        id: 'supabase-auth',
        title: 'Supabase Authentication',
        description: 'Secure login system',
        completed: true, // ✅ Multiple auth systems found (auth/, lms/auth/, dev-signin/)
        priority: 'P0',
        category: 'User Management',
        estimatedHours: 20
      },
      {
        id: 'user-profiles',
        title: 'User Profiles',
        description: 'Member information, preferences',
        completed: true, // ✅ Profile components and membership pages exist
        priority: 'P0',
        category: 'User Management',
        estimatedHours: 15
      },
      {
        id: 'password-recovery',
        title: 'Password Recovery',
        description: 'Secure reset system',
        completed: true, // ✅ Part of Supabase auth implementation
        priority: 'P0',
        category: 'User Management',
        estimatedHours: 8
      },
      {
        id: 'social-login',
        title: 'Social Login Options',
        description: 'Google, Apple integration',
        completed: false, // ❌ Not specifically mentioned in audit
        priority: 'P1',
        category: 'User Management',
        estimatedHours: 12
      }
    ]
  },
  {
    id: 'lms',
    title: 'Learning Management System',
    emoji: '🎓',
    description: 'Course platform and workshop systems',
    expanded: false,
    items: [
      {
        id: 'course-catalog',
        title: 'Course Catalog',
        description: 'Organized learning paths',
        completed: true, // ✅ Full LMS system with course management in src/app/(lms)/lms/
        priority: 'P0',
        category: 'Course Platform',
        estimatedHours: 25
      },
      {
        id: 'video-lessons',
        title: 'Video Lessons',
        description: 'Streaming with progress tracking',
        completed: true, // ✅ Lesson renderer and video support confirmed
        priority: 'P0',
        category: 'Course Platform',
        estimatedHours: 30
      },
      {
        id: 'quizzes-assessments',
        title: 'Quizzes/Assessments',
        description: 'Knowledge checking',
        completed: true, // ✅ APEST and missional assessment systems exist
        priority: 'P1',
        category: 'Course Platform',
        estimatedHours: 20
      },
      {
        id: 'certificates',
        title: 'Certificates',
        description: 'Completion recognition',
        completed: false, // ❌ No certificate system mentioned in audit
        priority: 'P2',
        category: 'Course Platform',
        estimatedHours: 15
      },
      {
        id: 'discussion-forums',
        title: 'Discussion Forums',
        description: 'Student interaction',
        completed: true, // ✅ Community system exists at src/app/community/
        priority: 'P1',
        category: 'Course Platform',
        estimatedHours: 25
      },
      {
        id: 'progress-tracking',
        title: 'Progress Tracking',
        description: 'Learning analytics',
        completed: true, // ✅ Student progress tracking in LMS implementation
        priority: 'P0',
        category: 'Course Platform',
        estimatedHours: 18
      },
      {
        id: 'live-event-integration',
        title: 'Live Event Integration',
        description: 'Zoom/Teams connection',
        completed: true, // ✅ LiveEventIntegration.tsx with multi-platform support
        priority: 'P1',
        category: 'Workshop System',
        estimatedHours: 20
      },
      {
        id: 'workshop-materials',
        title: 'Workshop Materials',
        description: 'Downloadable resources',
        completed: true, // ✅ WorkshopMaterials.tsx with comprehensive file management
        priority: 'P1',
        category: 'Workshop System',
        estimatedHours: 25
      },
      {
        id: 'cohort-management',
        title: 'Cohort Management',
        description: 'Group organization',
        completed: true, // ✅ CohortManagement.tsx with participant and group management
        priority: 'P1',
        category: 'Workshop System',
        estimatedHours: 30
      },
      {
        id: 'feedback-collection',
        title: 'Feedback Collection',
        description: 'Post-event surveys',
        completed: true, // ✅ FeedbackCollection.tsx with survey builder and analytics
        priority: 'P1',
        category: 'Workshop System',
        estimatedHours: 35
      }
    ]
  },
  {
    id: 'ai-integration',
    title: 'AI Integration & Tools',
    emoji: '🤖',
    description: 'Content creation support and community management',
    expanded: false,
    items: [
      {
        id: 'writing-assistant',
        title: 'Writing Assistant',
        description: 'AI-powered drafting help',
        completed: true, // ✅ AI agents system exists with comprehensive implementation
        priority: 'P2',
        category: 'Content Creation Support',
        estimatedHours: 40
      },
      {
        id: 'content-repurposing',
        title: 'Content Repurposing',
        description: 'Blog to social, newsletter',
        completed: false, // ❌ No specific content repurposing system mentioned
        priority: 'P2',
        category: 'Content Creation Support',
        estimatedHours: 30
      },
      {
        id: 'seo-ai-optimization',
        title: 'SEO Optimization',
        description: 'Keyword and meta suggestions',
        completed: false, // ❌ No AI-powered SEO optimization mentioned
        priority: 'P2',
        category: 'Content Creation Support',
        estimatedHours: 15
      },
      {
        id: 'transcript-generation',
        title: 'Transcript Generation',
        description: 'Audio/video to text',
        completed: false, // ❌ Not implemented yet
        priority: 'P2',
        category: 'Content Creation Support',
        estimatedHours: 25
      }
    ]
  },
  {
    id: 'partner-organizations',
    title: 'Partner Organization Pages',
    emoji: '🤝',
    description: 'Dedicated pages for six partner organizations',
    expanded: false,
    items: [
      {
        id: '5q-page',
        title: '5Q Partner Page',
        description: 'Fivefold ministry collective page',
        completed: true, // ✅ /5q/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      },
      {
        id: 'movement-leaders-page',
        title: 'Movement Leaders Page',
        description: 'Leadership development partner page',
        completed: true, // ✅ /movement-leaders/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      },
      {
        id: '100movements-page',
        title: '100 Movements Page',
        description: 'Global movement network partner page',
        completed: true, // ✅ /100movements/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      },
      {
        id: 'forge-page',
        title: 'Forge Page',
        description: 'Missional training organization page',
        completed: true, // ✅ /forge/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      },
      {
        id: 'future-travelers-page',
        title: 'Future Travelers Page',
        description: 'Innovation network partner page',
        completed: true, // ✅ /future-travelers/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      },
      {
        id: 'crm-page',
        title: 'CRM Page',
        description: 'Customer relationship management page',
        completed: true, // ✅ /crm/ route exists
        priority: 'P1',
        category: 'Partner Pages',
        estimatedHours: 8
      }
    ]
  },
  {
    id: 'assessment-tools',
    title: 'Assessment & Diagnostic Tools',
    emoji: '📊',
    description: 'APEST and missional assessment systems',
    expanded: false,
    items: [
      {
        id: 'apest-assessment',
        title: 'APEST Assessment System',
        description: 'Fivefold ministry gifts assessment',
        completed: true, // ✅ Multiple APEST implementations found
        priority: 'P0',
        category: 'Assessment Tools',
        estimatedHours: 35
      },
      {
        id: 'missional-assessment',
        title: 'Missional Assessment',
        description: 'Church health diagnostics and mDNA evaluation',
        completed: true, // ✅ Missional assessment system exists
        priority: 'P0',
        category: 'Assessment Tools',
        estimatedHours: 30
      },
      {
        id: 'diagnostic-tools',
        title: 'Diagnostic Tools',
        description: 'Various diagnostic implementations',
        completed: true, // ✅ Diagnostic system exists
        priority: 'P1',
        category: 'Assessment Tools',
        estimatedHours: 25
      },
      {
        id: 'apest-agents',
        title: 'APEST AI Agents',
        description: 'AI-powered ministry guidance agents',
        completed: true, // ✅ APEST agents system exists
        priority: 'P2',
        category: 'Assessment Tools',
        estimatedHours: 40
      }
    ]
  },
  {
    id: 'specialized-features',
    title: 'Specialized Features',
    emoji: '⚡',
    description: 'Additional specialized functionality',
    expanded: false,
    items: [
      {
        id: 'ebook-reader',
        title: 'EBook Reader System',
        description: 'Interactive book reading experience',
        completed: true, // ✅ EbookReader component exists
        priority: 'P1',
        category: 'Reading Experience',
        estimatedHours: 25
      },
      {
        id: 'toolkit-page',
        title: 'Toolkit Page',
        description: 'Resource hub with organization grid',
        completed: true, // ✅ /toolkit/ route exists
        priority: 'P1',
        category: 'Resource Management',
        estimatedHours: 15
      },
      {
        id: 'resources-page',
        title: 'Resources Page',
        description: 'Digital asset management and categorization',
        completed: true, // ✅ /resources/ route exists
        priority: 'P1',
        category: 'Resource Management',
        estimatedHours: 20
      },
      {
        id: 'movemental-content',
        title: 'Movemental Content System',
        description: 'Specialized content for movement thinking',
        completed: true, // ✅ Movemental content and courses exist
        priority: 'P2',
        category: 'Content Systems',
        estimatedHours: 30
      },
      {
        id: 'site-map',
        title: 'Site Map',
        description: 'Complete site navigation structure',
        completed: true, // ✅ /site-map/ route exists
        priority: 'P2',
        category: 'Navigation',
        estimatedHours: 6
      }
    ]
  }
];

export default function ContentChecklistPage() {
  const [checklistData, setChecklistData] = useState<ChecklistSection[]>(initialChecklistData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'P0' | 'P1' | 'P2'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Calculate overall progress
  const totalItems = checklistData.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.completed).length, 
    0
  );
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  // Calculate priority-based progress
  const p0Items = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.priority === 'P0').length, 
    0
  );
  const completedP0Items = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.priority === 'P0' && item.completed).length, 
    0
  );
  const p0Progress = p0Items > 0 ? (completedP0Items / p0Items) * 100 : 0;

  // Calculate estimated time remaining
  const totalEstimatedHours = checklistData.reduce(
    (acc, section) => acc + section.items.reduce(
      (sectionAcc, item) => sectionAcc + (item.estimatedHours || 0), 0
    ), 0
  );
  const completedEstimatedHours = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.completed).reduce(
      (sectionAcc, item) => sectionAcc + (item.estimatedHours || 0), 0
    ), 0
  );
  const remainingHours = totalEstimatedHours - completedEstimatedHours;

  // Toggle item completion
  const toggleItemCompletion = (sectionId: string, itemId: string) => {
    setChecklistData(prevData => 
      prevData.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              items: section.items.map(item => 
                item.id === itemId 
                  ? { ...item, completed: !item.completed }
                  : item
              )
            }
          : section
      )
    );
    setLastUpdated(new Date());
  };

  // Toggle section expansion
  const toggleSectionExpansion = (sectionId: string) => {
    setChecklistData(prevData => 
      prevData.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  // Filter items based on search and filters
  const filteredSections = checklistData.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
      
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'completed' && item.completed) ||
                           (filterStatus === 'pending' && !item.completed);
      
      return matchesSearch && matchesPriority && matchesStatus;
    })
  })).filter(section => section.items.length > 0 || searchTerm === '');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'P1': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'P2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const exportProgress = () => {
    const progressData = {
      exportDate: new Date().toISOString(),
      overallProgress: `${overallProgress.toFixed(1)}%`,
      p0Progress: `${p0Progress.toFixed(1)}%`,
      totalItems,
      completedItems,
      remainingHours,
      sections: checklistData.map(section => ({
        title: section.title,
        items: section.items.map(item => ({
          title: item.title,
          completed: item.completed,
          priority: item.priority,
          category: item.category,
          estimatedHours: item.estimatedHours
        }))
      }))
    };
    
    const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alan-hirsch-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo to-rust text-paper">
        <div className="max-w-container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-display-lg font-display mb-2">
                  Alan Hirsch Digital Platform Checklist
                </h1>
                <p className="text-lg opacity-90">
                  TrailGuide "Eat Your Own Dog Food" Prototype
                </p>
                <p className="text-sm opacity-75 mt-2">
                  Last updated: {lastUpdated.toLocaleDateString()} • Status Date: September 8, 2025
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  {overallProgress.toFixed(1)}%
                </div>
                <div className="text-sm opacity-75">Overall Complete</div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-paper/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{completedItems}/{totalItems}</div>
                <div className="text-sm opacity-75">Items Complete</div>
              </div>
              <div className="bg-paper/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{p0Progress.toFixed(0)}%</div>
                <div className="text-sm opacity-75">P0 (Critical) Done</div>
              </div>
              <div className="bg-paper/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{Math.ceil(remainingHours / 40)}</div>
                <div className="text-sm opacity-75">Weeks Remaining</div>
              </div>
              <div className="bg-paper/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{remainingHours}h</div>
                <div className="text-sm opacity-75">Hours Remaining</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>{overallProgress.toFixed(1)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>P0 (Critical Path) Progress</span>
                  <span>{p0Progress.toFixed(1)}%</span>
                </div>
                <Progress value={p0Progress} className="h-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8">
        {/* Controls */}
        <AnimatedCard className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite w-4 h-4" />
                <Input
                  placeholder="Search items, descriptions, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-2 border border-graphite/20 rounded-lg bg-paper text-ink"
                >
                  <option value="all">All Priorities</option>
                  <option value="P0">P0 (Critical)</option>
                  <option value="P1">P1 (Important)</option>
                  <option value="P2">P2 (Nice to Have)</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-graphite/20 rounded-lg bg-paper text-ink"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
                className="flex items-center gap-2"
              >
                {showArchived ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showArchived ? 'Hide' : 'Show'} Archived
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={exportProgress}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Progress
              </Button>
            </div>
          </div>
        </AnimatedCard>

        {/* Checklist Sections */}
        <div className="space-y-6">
          {filteredSections.map((section, sectionIndex) => (
            <AnimatedCard key={section.id} delay={sectionIndex * 0.1}>
              <div className="space-y-4">
                {/* Section Header */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSectionExpansion(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{section.emoji}</div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-ink">
                        {section.title}
                      </h2>
                      <p className="text-graphite text-sm">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-graphite">
                        {section.items.filter(item => item.completed).length}/{section.items.length} complete
                      </div>
                      <div className="text-xs text-graphite">
                        {Math.round((section.items.filter(item => item.completed).length / section.items.length) * 100)}%
                      </div>
                    </div>
                    
                    {section.expanded ? (
                      <ChevronDown className="w-5 h-5 text-graphite" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-graphite" />
                    )}
                  </div>
                </div>

                {/* Section Progress */}
                <Progress 
                  value={(section.items.filter(item => item.completed).length / section.items.length) * 100} 
                  className="h-2"
                />

                {/* Section Items */}
                <AnimatePresence>
                  {section.expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 pt-2"
                    >
                      {section.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          className={`flex items-start gap-3 p-4 rounded-lg border transition-all hover:border-indigo/30 ${
                            item.completed 
                              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                              : 'bg-graphite/5 border-graphite/20'
                          }`}
                        >
                          <button
                            onClick={() => toggleItemCompletion(section.id, item.id)}
                            className="mt-1 transition-colors hover:scale-110 transform duration-200"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-graphite hover:text-indigo" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1">
                                <h3 className={`font-semibold ${
                                  item.completed ? 'line-through text-graphite' : 'text-ink'
                                }`}>
                                  {item.title}
                                </h3>
                                <p className="text-sm text-graphite mt-1">
                                  {item.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge className={getPriorityColor(item.priority)}>
                                  {item.priority}
                                </Badge>
                                {item.estimatedHours && (
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {item.estimatedHours}h
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-xs text-graphite">
                              Category: {item.category}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Summary Stats */}
        <AnimatedCard className="mt-8">
          <div className="text-center">
            <h2 className="text-xl font-display font-bold mb-4">Project Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo mb-1">{totalItems}</div>
                <div className="text-sm text-graphite">Total Items</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">{completedItems}</div>
                <div className="text-sm text-graphite">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-rust mb-1">{totalItems - completedItems}</div>
                <div className="text-sm text-graphite">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo mb-1">{totalEstimatedHours}h</div>
                <div className="text-sm text-graphite">Total Estimated</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-indigo/10 rounded-lg">
              <p className="text-sm text-graphite">
                <strong>Purpose:</strong> Complete digital publishing platform for Alan Hirsch as the flagship prototype<br />
                <strong>Based on:</strong> Promises made in 100-users page modals and TrailGuide value proposition
              </p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
