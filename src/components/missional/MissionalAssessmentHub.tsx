'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, Users, Target, TrendingUp, Book, MessageCircle, 
  CheckCircle, AlertCircle, Lightbulb, ArrowRight, Star,
  Heart, Globe, Home, Compass, Calendar, ChevronRight
} from 'lucide-react';
import { MissionalHealthAssessment, type AssessmentResults } from './MissionalHealthAssessment';
import { ContextualMissionMap, type MissionContext } from './ContextualMissionMap';
import { MissionalActionPlanner } from './MissionalActionPlanner';
import { MissionalCommunity } from './MissionalCommunity';

export function MissionalAssessmentHub() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'context' | 'planning' | 'community'>('overview');
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [missionContext, setMissionContext] = useState<MissionContext | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  const overviewStats = {
    totalAssessments: 1247,
    avgMissionalScore: 68,
    communitiesTransformed: 89,
    activeCoaches: 34
  };

  const missionalDimensions = [
    {
      id: 'incarnational',
      name: 'Incarnational Living',
      description: 'Embodying the Gospel in everyday relationships and contexts',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-red-500',
      score: assessmentResults?.dimensions.incarnational || 0
    },
    {
      id: 'gospel',
      name: 'Gospel Centrality',
      description: 'Making the Gospel the center of all mission and ministry',
      icon: <Star className="w-5 h-5" />,
      color: 'bg-yellow-500',
      score: assessmentResults?.dimensions.gospel || 0
    },
    {
      id: 'discipleship',
      name: 'Disciple Making',
      description: 'Creating reproducible pathways for spiritual growth',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      score: assessmentResults?.dimensions.discipleship || 0
    },
    {
      id: 'apostolic',
      name: 'Apostolic Movement',
      description: 'Pioneering new expressions of church and mission',
      icon: <Compass className="w-5 h-5" />,
      color: 'bg-purple-500',
      score: assessmentResults?.dimensions.apostolic || 0
    },
    {
      id: 'community',
      name: 'Authentic Community',
      description: 'Building deep, transformational relationships',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-green-500',
      score: assessmentResults?.dimensions.community || 0
    },
    {
      id: 'contextual',
      name: 'Contextual Engagement',
      description: 'Understanding and engaging your specific mission field',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-indigo-500',
      score: assessmentResults?.dimensions.contextual || 0
    }
  ];

  const quickActions = [
    {
      title: 'Take Missional Assessment',
      description: 'Comprehensive evaluation of your missional maturity',
      icon: <Target className="w-6 h-6" />,
      action: () => setActiveTab('assessment'),
      color: 'bg-forest text-white',
      disabled: false
    },
    {
      title: 'Map Your Context',
      description: 'Understand your neighborhood and mission field',
      icon: <MapPin className="w-6 h-6" />,
      action: () => setActiveTab('context'),
      color: 'bg-rust text-white',
      disabled: false
    },
    {
      title: 'Create Action Plan',
      description: 'Develop practical next steps for transformation',
      icon: <Lightbulb className="w-6 h-6" />,
      action: () => setActiveTab('planning'),
      color: 'bg-slate-600 text-white',
      disabled: !hasCompletedAssessment
    },
    {
      title: 'Join Community',
      description: 'Connect with other missional practitioners',
      icon: <MessageCircle className="w-6 h-6" />,
      action: () => setActiveTab('community'),
      color: 'bg-emerald-600 text-white',
      disabled: false
    }
  ];

  const featuredResources = [
    {
      title: 'The Forgotten Ways',
      type: 'Book',
      description: 'Reactivating apostolic movements',
      link: '/books/the-forgotten-ways',
      relevance: 'Foundation for missional thinking'
    },
    {
      title: '5Q: Reactivating the Original Intelligence and Capacity of the Body of Christ',
      type: 'Book', 
      description: 'Understanding APEST for whole-church transformation',
      link: '/books/5q',
      relevance: 'Essential for leadership development'
    },
    {
      title: 'The Shaping of Things to Come',
      type: 'Book',
      description: 'Innovation and mission for the 21st-century church',
      link: '/books/shaping-of-things-to-come',
      relevance: 'Practical guide for church transformation'
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'overview' | 'assessment' | 'context' | 'planning' | 'community')} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="context">Context Map</TabsTrigger>
          <TabsTrigger value="planning">Action Plan</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-forest">{overviewStats.totalAssessments}</div>
              <div className="text-sm text-muted-foreground">Assessments Taken</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-rust">{overviewStats.avgMissionalScore}%</div>
              <div className="text-sm text-muted-foreground">Avg Missional Score</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600">{overviewStats.communitiesTransformed}</div>
              <div className="text-sm text-muted-foreground">Communities Transformed</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{overviewStats.activeCoaches}</div>
              <div className="text-sm text-muted-foreground">Active Coaches</div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-display mb-4">Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                  onClick={action.disabled ? undefined : action.action}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                      {action.disabled && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Complete Assessment First
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Progress */}
          {assessmentResults && (
            <Card className="p-6">
              <h2 className="text-xl font-display mb-4">Your Missional Profile</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Missional Score</span>
                  <span className="text-2xl font-bold text-forest">{assessmentResults.overallScore}%</span>
                </div>
                <Progress value={assessmentResults.overallScore} className="h-2" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {missionalDimensions.map((dimension) => (
                    <div key={dimension.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                      <div className={`p-2 rounded-lg ${dimension.color} text-white`}>
                        {dimension.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{dimension.name}</div>
                        <div className="text-lg font-bold text-forest">{dimension.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Featured Resources */}
          <Card className="p-6">
            <h2 className="text-xl font-display mb-4">Featured Resources</h2>
            <div className="space-y-4">
              {featuredResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Book className="w-5 h-5 text-forest" />
                    <div>
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{resource.relevance}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment">
          <MissionalHealthAssessment
            onAssessmentComplete={(results: AssessmentResults) => {
              setAssessmentResults(results);
              setHasCompletedAssessment(true);
            }}
          />
        </TabsContent>

        {/* Context Map Tab */}
        <TabsContent value="context">
          <ContextualMissionMap
            onContextUpdate={(context: MissionContext) => setMissionContext(context)}
            initialContext={missionContext || undefined}
          />
        </TabsContent>

        {/* Action Planning Tab */}
        <TabsContent value="planning">
          <MissionalActionPlanner
            assessmentResults={assessmentResults || undefined}
            missionContext={missionContext || undefined}
            onPlanUpdate={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (plan: any) => {
                // Handle plan updates (could save to local state or backend)
                console.log('Action plan updated:', plan);
              }
            }
          />
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community">
          <MissionalCommunity 
            onResourceAccess={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (resource: any) => {
                // Handle resource access
                console.log('Resource accessed:', resource);
              }
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
