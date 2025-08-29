'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, Users, Building, Heart, TrendingUp, AlertTriangle,
  Plus, Edit, Trash2, Eye, Search, Filter, Download
} from 'lucide-react';

export interface MissionContext {
  demographics: {
    population: number;
    averageAge: number;
    ethnicDiversity: string[];
    incomeLevel: 'low' | 'mixed' | 'high';
    educationLevel: 'low' | 'mixed' | 'high';
  };
  spiritual: {
    churchDensity: 'low' | 'medium' | 'high';
    dominantReligions: string[];
    spiritualOpenness: number; // 1-10 scale
    existingMinistries: string[];
  };
  social: {
    majorChallenges: string[];
    communityStrengths: string[];
    socialCohesion: number; // 1-10 scale
    volunteerCulture: number; // 1-10 scale
  };
  economic: {
    majorEmployers: string[];
    unemploymentRate: number;
    housingAffordability: 'low' | 'medium' | 'high';
    businessClimate: 'poor' | 'fair' | 'good' | 'excellent';
  };
}

interface MissionOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'spiritual' | 'social' | 'economic' | 'relational';
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'moderate' | 'challenging';
  timeline: 'immediate' | 'short-term' | 'long-term';
  resources: string[];
  potentialPartners: string[];
}

interface ContextualMissionMapProps {
  initialContext?: MissionContext;
  onContextUpdate: (context: MissionContext) => void;
}

export function ContextualMissionMap({ initialContext, onContextUpdate }: ContextualMissionMapProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'demographics' | 'spiritual' | 'social' | 'economic' | 'opportunities'>('overview');
  const [context, setContext] = useState<MissionContext>(initialContext || {
    demographics: {
      population: 0,
      averageAge: 0,
      ethnicDiversity: [],
      incomeLevel: 'mixed',
      educationLevel: 'mixed'
    },
    spiritual: {
      churchDensity: 'medium',
      dominantReligions: [],
      spiritualOpenness: 5,
      existingMinistries: []
    },
    social: {
      majorChallenges: [],
      communityStrengths: [],
      socialCohesion: 5,
      volunteerCulture: 5
    },
    economic: {
      majorEmployers: [],
      unemploymentRate: 0,
      housingAffordability: 'medium',
      businessClimate: 'fair'
    }
  });

  const [opportunities, setOpportunities] = useState<MissionOpportunity[]>([]);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<MissionOpportunity | null>(null);

  // Auto-generate opportunities based on context
  useEffect(() => {
    const generatedOpportunities = generateOpportunities(context);
    setOpportunities(prev => [...prev, ...generatedOpportunities.filter(op => 
      !prev.some(existing => existing.title === op.title)
    )]);
  }, [context]);

  const generateOpportunities = (ctx: MissionContext): MissionOpportunity[] => {
    const opportunities: MissionOpportunity[] = [];

    // Spiritual opportunities
    if (ctx.spiritual.churchDensity === 'low') {
      opportunities.push({
        id: `opp_${Date.now()}_1`,
        title: 'Plant New Church Community',
        description: 'Low church density indicates opportunity for new faith community',
        category: 'spiritual',
        priority: 'high',
        difficulty: 'challenging',
        timeline: 'long-term',
        resources: ['Core team', 'Meeting space', 'Ministry funding'],
        potentialPartners: ['Denominational partners', 'Local churches', 'Community organizations']
      });
    }

    if (ctx.spiritual.spiritualOpenness >= 7) {
      opportunities.push({
        id: `opp_${Date.now()}_2`,
        title: 'Community Spiritual Conversations',
        description: 'High spiritual openness suggests receptivity to faith discussions',
        category: 'spiritual',
        priority: 'medium',
        difficulty: 'moderate',
        timeline: 'short-term',
        resources: ['Trained facilitators', 'Discussion materials', 'Neutral venues'],
        potentialPartners: ['Coffee shops', 'Libraries', 'Community centers']
      });
    }

    // Social opportunities
    ctx.social.majorChallenges.forEach(challenge => {
      if (challenge.toLowerCase().includes('poverty') || challenge.toLowerCase().includes('housing')) {
        opportunities.push({
          id: `opp_${Date.now()}_${challenge}`,
          title: 'Address Housing Insecurity',
          description: `Respond to local ${challenge.toLowerCase()} through practical ministry`,
          category: 'social',
          priority: 'high',
          difficulty: 'challenging',
          timeline: 'long-term',
          resources: ['Volunteer network', 'Financial resources', 'Community partnerships'],
          potentialPartners: ['Housing authorities', 'Social services', 'Local nonprofits']
        });
      }
    });

    // Economic opportunities
    if (ctx.economic.unemploymentRate > 8) {
      opportunities.push({
        id: `opp_${Date.now()}_jobs`,
        title: 'Job Skills Training Ministry',
        description: 'High unemployment creates opportunity for vocational ministry',
        category: 'economic',
        priority: 'high',
        difficulty: 'moderate',
        timeline: 'short-term',
        resources: ['Skills trainers', 'Computer access', 'Industry connections'],
        potentialPartners: ['Workforce development', 'Local businesses', 'Trade schools']
      });
    }

    // Relational opportunities
    if (ctx.social.socialCohesion < 5) {
      opportunities.push({
        id: `opp_${Date.now()}_community`,
        title: 'Community Building Events',
        description: 'Low social cohesion suggests need for relationship-building initiatives',
        category: 'relational',
        priority: 'medium',
        difficulty: 'easy',
        timeline: 'immediate',
        resources: ['Event planning', 'Venue access', 'Volunteer coordinators'],
        potentialPartners: ['Neighborhood associations', 'Local schools', 'Community centers']
      });
    }

    return opportunities;
  };

  const updateContext = (section: keyof MissionContext, updates: Record<string, unknown>) => {
    const newContext = {
      ...context,
      [section]: { ...context[section], ...updates }
    };
    setContext(newContext);
    onContextUpdate(newContext);
  };

  const getContextCompleteness = () => {
    let completed = 0;
    let total = 0;

    // Demographics
    total += 5;
    if (context.demographics.population > 0) completed++;
    if (context.demographics.averageAge > 0) completed++;
    if (context.demographics.ethnicDiversity.length > 0) completed++;
    if (context.demographics.incomeLevel !== 'mixed') completed++;
    if (context.demographics.educationLevel !== 'mixed') completed++;

    // Spiritual
    total += 4;
    if (context.spiritual.dominantReligions.length > 0) completed++;
    if (context.spiritual.spiritualOpenness !== 5) completed++;
    if (context.spiritual.existingMinistries.length > 0) completed++;
    completed++; // churchDensity always has default

    // Social
    total += 4;
    if (context.social.majorChallenges.length > 0) completed++;
    if (context.social.communityStrengths.length > 0) completed++;
    if (context.social.socialCohesion !== 5) completed++;
    if (context.social.volunteerCulture !== 5) completed++;

    // Economic
    total += 4;
    if (context.economic.majorEmployers.length > 0) completed++;
    if (context.economic.unemploymentRate > 0) completed++;
    completed++; // housingAffordability has default
    completed++; // businessClimate has default

    return Math.round((completed / total) * 100);
  };

  const categoryIcons = {
    spiritual: <Heart className="w-4 h-4" />,
    social: <Users className="w-4 h-4" />,
    economic: <Building className="w-4 h-4" />,
    relational: <MapPin className="w-4 h-4" />
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Context Completeness */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display">Mission Context Profile</h3>
            <Badge variant="outline">{getContextCompleteness()}% Complete</Badge>
          </div>
          <Progress value={getContextCompleteness()} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Complete your mission context to unlock personalized opportunities and strategies.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Demographics', tab: 'demographics', icon: <Users className="w-5 h-5" /> },
              { label: 'Spiritual', tab: 'spiritual', icon: <Heart className="w-5 h-5" /> },
              { label: 'Social', tab: 'social', icon: <MapPin className="w-5 h-5" /> },
              { label: 'Economic', tab: 'economic', icon: <Building className="w-5 h-5" /> }
            ].map((section) => (
              <Button
                key={section.tab}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setActiveTab(section.tab as 'overview' | 'demographics' | 'spiritual' | 'social' | 'economic' | 'opportunities')}
              >
                {section.icon}
                <span className="text-sm">{section.label}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-forest mb-1">
              {context.demographics.population.toLocaleString() || '---'}
            </div>
            <div className="text-sm text-muted-foreground">Population</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-rust mb-1">
              {context.spiritual.spiritualOpenness}/10
            </div>
            <div className="text-sm text-muted-foreground">Spiritual Openness</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {opportunities.length}
            </div>
            <div className="text-sm text-muted-foreground">Opportunities</div>
          </Card>
        </div>

        {/* Top Opportunities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display">Top Mission Opportunities</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('opportunities')}
            >
              View All
            </Button>
          </div>
          
          {opportunities.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Complete your context profile to discover mission opportunities
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {opportunities.slice(0, 3).map((opportunity) => (
                <div key={opportunity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {categoryIcons[opportunity.category]}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{opportunity.title}</h4>
                      <Badge className={priorityColors[opportunity.priority]}>
                        {opportunity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (activeTab === 'opportunities') {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display">Mission Opportunities</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                onClick={() => setShowOpportunityForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Opportunity
              </Button>
            </div>
          </div>

          {opportunities.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">No Opportunities Yet</h4>
              <p className="text-muted-foreground mb-4">
                Complete your context profile or manually add opportunities to get started.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <Button variant="outline" onClick={() => setActiveTab('overview')}>
                  Complete Profile
                </Button>
                <Button onClick={() => setShowOpportunityForm(true)}>
                  Add First Opportunity
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {categoryIcons[opportunity.category]}
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-2">{opportunity.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={priorityColors[opportunity.priority]}>
                      {opportunity.priority} priority
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {opportunity.difficulty}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {opportunity.timeline}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Resources Needed:</div>
                      <div className="text-xs">
                        {opportunity.resources.slice(0, 2).join(', ')}
                        {opportunity.resources.length > 2 && ` +${opportunity.resources.length - 2} more`}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Back Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab('overview')}>
            Back to Overview
          </Button>
        </div>
      </div>
    );
  }

  // Context editing tabs (demographics, spiritual, social, economic)
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
            { id: 'demographics', label: 'Demographics', icon: <Users className="w-4 h-4" /> },
            { id: 'spiritual', label: 'Spiritual', icon: <Heart className="w-4 h-4" /> },
            { id: 'social', label: 'Social', icon: <MapPin className="w-4 h-4" /> },
            { id: 'economic', label: 'Economic', icon: <Building className="w-4 h-4" /> },
            { id: 'opportunities', label: 'Opportunities', icon: <TrendingUp className="w-4 h-4" /> }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as 'overview' | 'demographics' | 'spiritual' | 'social' | 'economic' | 'opportunities')}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Context Forms */}
      <Card className="p-6">
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Context Editor Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            The detailed context editing interface is being developed. For now, you can view your mission overview and opportunities.
          </p>
          <Button onClick={() => setActiveTab('overview')}>
            Return to Overview
          </Button>
        </div>
      </Card>
    </div>
  );
}
