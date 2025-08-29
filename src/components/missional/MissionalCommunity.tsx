'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, MessageCircle, Calendar, Globe, Star, Heart,
  Plus, Search, Filter, UserPlus, Share, ExternalLink,
  BookOpen, Video, Headphones, FileText, Award, Target
} from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  role: 'seeker' | 'new-believer' | 'growing' | 'mature' | 'leader' | 'mentor';
  location: string;
  strengths: string[];
  growthAreas: string[];
  connections: string[];
  joinedAt: Date;
  lastActive: Date;
}

interface DiscussionTopic {
  id: string;
  title: string;
  category: 'theological' | 'practical' | 'personal' | 'contextual';
  description: string;
  participantCount: number;
  messageCount: number;
  lastActivity: Date;
  tags: string[];
  featured: boolean;
}

interface LearningResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'book' | 'course' | 'toolkit';
  author: string;
  description: string;
  category: 'incarnational' | 'gospel' | 'discipleship' | 'apostolic' | 'community' | 'contextual';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  url?: string;
}

interface MissionalCommunityProps {
  currentUser?: CommunityMember;
  onResourceAccess: (resource: LearningResource) => void;
}

export function MissionalCommunity({ currentUser, onResourceAccess }: MissionalCommunityProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'discussions' | 'members' | 'resources' | 'coaching'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for demonstration
  const discussions: DiscussionTopic[] = [
    {
      id: '1',
      title: 'Incarnational Living in Urban Contexts',
      category: 'practical',
      description: 'How do we authentically live incarnationally in densely populated urban areas?',
      participantCount: 23,
      messageCount: 156,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      tags: ['urban', 'incarnational', 'practical'],
      featured: true
    },
    {
      id: '2',
      title: 'Sharing the Gospel Without Being Pushy',
      category: 'practical',
      description: 'Strategies for natural, relational gospel conversations',
      participantCount: 41,
      messageCount: 298,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      tags: ['evangelism', 'gospel', 'relationships'],
      featured: true
    },
    {
      id: '3',
      title: 'Theological Foundations of Missional Church',
      category: 'theological',
      description: 'Deep dive into the biblical basis for missional ecclesiology',
      participantCount: 15,
      messageCount: 89,
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      tags: ['theology', 'church', 'biblical'],
      featured: false
    }
  ];

  const resources: LearningResource[] = [
    {
      id: '1',
      title: 'The Forgotten Ways: Reactivating Apostolic Movements',
      type: 'book',
      author: 'Alan Hirsch',
      description: 'Essential reading on apostolic movements and their characteristics',
      category: 'apostolic',
      difficulty: 'intermediate',
      estimatedTime: '8-12 hours',
      rating: 4.8,
      reviewCount: 234,
      tags: ['apostolic', 'movements', 'church-planting'],
      url: '/books/forgotten-ways'
    },
    {
      id: '2',
      title: 'Neighboring Fundamentals',
      type: 'course',
      author: 'Neighboring Movement',
      description: 'Practical course on building authentic relationships with neighbors',
      category: 'incarnational',
      difficulty: 'beginner',
      estimatedTime: '3-4 weeks',
      rating: 4.6,
      reviewCount: 89,
      tags: ['neighboring', 'incarnational', 'relationships']
    },
    {
      id: '3',
      title: 'APEST Assessment Tool',
      type: 'toolkit',
      author: 'Alan Hirsch & Team',
      description: 'Comprehensive tool for discovering and developing your APEST gifting',
      category: 'apostolic',
      difficulty: 'beginner',
      estimatedTime: '45-60 minutes',
      rating: 4.9,
      reviewCount: 567,
      tags: ['apest', 'gifts', 'assessment'],
      url: '/apest-agent'
    },
    {
      id: '4',
      title: 'Gospel Conversations in Everyday Life',
      type: 'video',
      author: 'Dave Ferguson',
      description: 'Video series on natural evangelism and gospel conversations',
      category: 'gospel',
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      rating: 4.7,
      reviewCount: 156,
      tags: ['evangelism', 'gospel', 'video-series']
    }
  ];

  const members: CommunityMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'leader',
      location: 'Seattle, WA',
      strengths: ['Community building', 'Cross-cultural ministry'],
      growthAreas: ['Public speaking', 'Theology'],
      connections: ['Michael Johnson', 'David Park'],
      joinedAt: new Date(2023, 6, 15),
      lastActive: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Michael Johnson',
      role: 'mentor',
      location: 'Austin, TX',
      strengths: ['Discipleship', 'Church planting'],
      growthAreas: ['Urban ministry', 'Youth engagement'],
      connections: ['Sarah Chen', 'Lisa Rodriguez'],
      joinedAt: new Date(2023, 4, 8),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      role: 'growing',
      location: 'Phoenix, AZ',
      strengths: ['Hospitality', 'Prayer ministry'],
      growthAreas: ['Leadership', 'Evangelism'],
      connections: ['Michael Johnson'],
      joinedAt: new Date(2024, 1, 22),
      lastActive: new Date(Date.now() - 15 * 60 * 1000)
    }
  ];

  const getRoleColor = (role: CommunityMember['role']) => {
    const colors = {
      seeker: 'bg-gray-100 text-gray-800',
      'new-believer': 'bg-green-100 text-green-800',
      growing: 'bg-blue-100 text-blue-800',
      mature: 'bg-purple-100 text-purple-800',
      leader: 'bg-orange-100 text-orange-800',
      mentor: 'bg-red-100 text-red-800'
    };
    return colors[role] || colors.growing;
  };

  const getResourceIcon = (type: LearningResource['type']) => {
    const icons = {
      article: <FileText className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />,
      podcast: <Headphones className="w-4 h-4" />,
      book: <BookOpen className="w-4 h-4" />,
      course: <Target className="w-4 h-4" />,
      toolkit: <Award className="w-4 h-4" />
    };
    return icons[type] || icons.article;
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           resource.category === selectedCategory ||
                           resource.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="p-6 bg-gradient-to-r from-forest to-forest/80 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-white/20 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-display">Missional Community</h2>
              <p className="text-white/80">Connect, learn, and grow with fellow missional practitioners</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">2,847</div>
              <div className="text-sm text-white/80">Active Members</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">156</div>
              <div className="text-sm text-white/80">Active Discussions</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">89</div>
              <div className="text-sm text-white/80">Learning Resources</div>
            </div>
          </div>
        </Card>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => setActiveTab('discussions')}
          >
            <MessageCircle className="w-6 h-6" />
            <span>Join Discussions</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => setActiveTab('resources')}
          >
            <BookOpen className="w-6 h-6" />
            <span>Learning Resources</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => setActiveTab('members')}
          >
            <Users className="w-6 h-6" />
            <span>Find Members</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => setActiveTab('coaching')}
          >
            <Heart className="w-6 h-6" />
            <span>Get Coaching</span>
          </Button>
        </div>

        {/* Featured Discussions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display">Featured Discussions</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('discussions')}>
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {discussions.filter(d => d.featured).map(discussion => (
              <div key={discussion.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{discussion.title}</h4>
                    <Badge variant="secondary" className="capitalize">
                      {discussion.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{discussion.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{discussion.participantCount} participants</span>
                    <span>{discussion.messageCount} messages</span>
                    <span>Active {Math.round((Date.now() - discussion.lastActivity.getTime()) / (1000 * 60))} min ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Resources */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display">Top Resources</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('resources')}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.slice(0, 4).map(resource => (
              <div key={resource.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                   onClick={() => onResourceAccess(resource)}>
                {getResourceIcon(resource.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <Badge variant="outline" className="text-xs capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{resource.author}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span className="text-xs">{resource.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({resource.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (activeTab === 'resources') {
    return (
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="all">All Categories</option>
                <option value="incarnational">Incarnational</option>
                <option value="gospel">Gospel</option>
                <option value="discipleship">Discipleship</option>
                <option value="apostolic">Apostolic</option>
                <option value="community">Community</option>
                <option value="contextual">Contextual</option>
                <option value="book">Books</option>
                <option value="video">Videos</option>
                <option value="course">Courses</option>
                <option value="toolkit">Toolkits</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onResourceAccess(resource)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getResourceIcon(resource.type)}
                  <Badge variant="outline" className="text-xs capitalize">
                    {resource.type}
                  </Badge>
                </div>
                {resource.url && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
              </div>
              
              <h3 className="font-medium mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">by {resource.author}</p>
              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <Badge className="text-xs capitalize" variant="secondary">
                  {resource.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{resource.estimatedTime}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({resource.reviewCount} reviews)</span>
              </div>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Resources Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filters.
            </p>
          </Card>
        )}

        {/* Navigation */}
        <Button variant="outline" onClick={() => setActiveTab('overview')}>
          Back to Overview
        </Button>
      </div>
    );
  }

  // Other tabs (discussions, members, coaching) would be implemented here
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-forest mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Community Feature Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            The {activeTab} interface is being developed to provide you with rich community interactions and resources.
          </p>
          <Button onClick={() => setActiveTab('overview')}>
            Return to Overview
          </Button>
        </div>
      </Card>
    </div>
  );
}
