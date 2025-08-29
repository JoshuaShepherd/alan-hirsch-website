'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Calendar, CheckCircle, Clock, Users, Star,
  Plus, Edit, Trash2, Play, Pause, RotateCcw, TrendingUp,
  AlertCircle, BookOpen, MessageCircle, Share
} from 'lucide-react';

interface AssessmentResults {
  overallScore: number;
  dimensions: {
    incarnational: number;
    gospel: number;
    discipleship: number;
    apostolic: number;
    community: number;
    contextual: number;
  };
  recommendations: string[];
  nextSteps: string[];
  strengths: string[];
  growthAreas: string[];
}

interface MissionContext {
  demographics: Record<string, unknown>;
  spiritual: Record<string, unknown>;
  social: Record<string, unknown>;
  economic: Record<string, unknown>;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'personal' | 'ministry' | 'community' | 'strategic';
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  targetDimension: 'incarnational' | 'gospel' | 'discipleship' | 'apostolic' | 'community' | 'contextual';
  estimatedTimeframe: string;
  requiredResources: string[];
  successMetrics: string[];
  collaborators: string[];
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  notes: string;
}

export interface ActionPlan {
  id: string;
  title: string;
  description: string;
  actions: ActionItem[];
  createdAt: Date;
  targetCompletionDate?: Date;
  overallProgress: number;
}

interface MissionalActionPlannerProps {
  assessmentResults?: AssessmentResults;
  missionContext?: MissionContext;
  onPlanUpdate: (plan: ActionPlan) => void;
}

export function MissionalActionPlanner({ 
  assessmentResults, 
  missionContext, 
  onPlanUpdate 
}: MissionalActionPlannerProps) {
  const [activeView, setActiveView] = useState<'overview' | 'create' | 'actions' | 'progress' | 'resources'>('overview');
  const [currentPlan, setCurrentPlan] = useState<ActionPlan | null>(null);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [showActionForm, setShowActionForm] = useState(false);
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Generate suggested action plan based on assessment
  useEffect(() => {
    if (assessmentResults && !currentPlan) {
      generateSuggestedPlan();
    }
  }, [assessmentResults]);

  const generateSuggestedPlan = () => {
    if (!assessmentResults) return;

    const suggestedActions: ActionItem[] = [];
    const lowestScores = Object.entries(assessmentResults.dimensions)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 3); // Focus on top 3 growth areas

    lowestScores.forEach(([dimension, score], index) => {
      const actions = getActionsForDimension(dimension as keyof AssessmentResults['dimensions'], score);
      suggestedActions.push(...actions.map((action, actionIndex) => ({
        id: `${dimension}_${index}_${actionIndex}`,
        title: action.title || 'Untitled Action',
        description: action.description || '',
        category: action.category || 'personal',
        priority: (index === 0 ? 'high' : index === 1 ? 'medium' : 'low') as 'low' | 'medium' | 'high',
        status: 'not-started' as const,
        targetDimension: (action.targetDimension || dimension) as 'incarnational' | 'gospel' | 'discipleship' | 'apostolic' | 'community' | 'contextual',
        estimatedTimeframe: action.estimatedTimeframe || '',
        requiredResources: action.requiredResources || [],
        successMetrics: action.successMetrics || [],
        collaborators: action.collaborators || [],
        createdAt: new Date(),
        notes: action.notes || ''
      })));
    });

    const newPlan: ActionPlan = {
      id: `plan_${Date.now()}`,
      title: 'Personalized Missional Growth Plan',
      description: 'Generated based on your assessment results to strengthen your missional effectiveness',
      actions: suggestedActions,
      createdAt: new Date(),
      targetCompletionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      overallProgress: 0
    };

    setCurrentPlan(newPlan);
    setActions(suggestedActions);
    onPlanUpdate(newPlan);
  };

  const getActionsForDimension = (dimension: keyof AssessmentResults['dimensions'], score: number) => {
    const baseActions: Record<string, Partial<ActionItem>[]> = {
      incarnational: [
        {
          title: 'Establish Weekly Neighboring Rhythm',
          description: 'Commit to intentionally connecting with neighbors once per week through casual conversations, shared activities, or practical help',
          category: 'personal',
          targetDimension: 'incarnational',
          estimatedTimeframe: '2-4 weeks to establish',
          requiredResources: ['Time commitment', 'Intentionality'],
          successMetrics: ['3+ meaningful neighbor conversations per month', 'Invited to or hosting 1+ neighborhood gathering'],
          collaborators: ['Family members', 'Close friends'],
          notes: 'Start with simple gestures like dog walking greetings or offering help with yard work'
        },
        {
          title: 'Join Local Community Activity',
          description: 'Regularly participate in a local club, volunteer organization, or community activity to build authentic relationships',
          category: 'community',
          targetDimension: 'incarnational',
          estimatedTimeframe: '1-2 months to integrate',
          requiredResources: ['Weekly time commitment', 'Transportation', 'Small fees if applicable'],
          successMetrics: ['Regular attendance at community activity', '5+ new acquaintances from activity', '1+ deeper friendship developing'],
          collaborators: ['Activity group members', 'Activity leaders'],
          notes: 'Choose activities aligned with your interests or skills for authentic engagement'
        }
      ],
      gospel: [
        {
          title: 'Develop Personal Gospel Story',
          description: 'Craft and practice sharing your faith story in 2-3 minute conversational format, focusing on life change',
          category: 'personal',
          targetDimension: 'gospel',
          estimatedTimeframe: '2-3 weeks',
          requiredResources: ['Reflection time', 'Practice opportunities', 'Feedback from mentor'],
          successMetrics: ['Can share story naturally in under 3 minutes', 'Shared story with 2+ people', 'Received positive feedback'],
          collaborators: ['Mentor or pastor', 'Trusted friends for practice'],
          notes: 'Focus on before/after transformation rather than theological terms'
        },
        {
          title: 'Gospel-Centered Community Service',
          description: 'Engage in regular community service that demonstrates and creates opportunities to discuss the Gospel',
          category: 'ministry',
          targetDimension: 'gospel',
          estimatedTimeframe: '1-3 months to establish',
          requiredResources: ['Volunteer time', 'Service skills', 'Team coordination'],
          successMetrics: ['Monthly service engagement', 'Gospel conversations during service', 'Service recipients express gratitude'],
          collaborators: ['Service team members', 'Community partners'],
          notes: 'Look for service that matches community needs and your passions'
        }
      ],
      discipleship: [
        {
          title: 'Initiate Discipleship Relationship',
          description: 'Begin intentionally discipling one person through regular meetings, prayer, and life-on-life mentoring',
          category: 'ministry',
          targetDimension: 'discipleship',
          estimatedTimeframe: '6+ months commitment',
          requiredResources: ['Weekly meeting time', 'Discipleship materials', 'Prayer commitment'],
          successMetrics: ['Weekly discipleship meetings', 'Disciple shows spiritual growth', 'Disciple begins discipling others'],
          collaborators: ['Disciple', 'Discipleship mentor/coach'],
          notes: 'Focus on reproducible practices rather than just knowledge transfer'
        },
        {
          title: 'Create Simple Discipleship Process',
          description: 'Develop a reproducible discipleship pathway that others can use to disciple new believers',
          category: 'strategic',
          targetDimension: 'discipleship',
          estimatedTimeframe: '1-2 months to create',
          requiredResources: ['Study time', 'Writing/design tools', 'Testing with disciples'],
          successMetrics: ['Completed discipleship guide', 'Tested with 2+ people', '1+ person using your process'],
          collaborators: ['Experienced disciplers', 'Potential disciples for testing'],
          notes: 'Keep it simple and focused on essential spiritual practices'
        }
      ],
      apostolic: [
        {
          title: 'Launch Ministry Experiment',
          description: 'Start a small, low-risk ministry initiative to address a specific community need or reach an unreached group',
          category: 'ministry',
          targetDimension: 'apostolic',
          estimatedTimeframe: '2-6 months',
          requiredResources: ['Startup funding', 'Team members', 'Leadership time'],
          successMetrics: ['Ministry launched successfully', 'People being served', 'Initial fruit or response'],
          collaborators: ['Ministry team', 'Community partners', 'Mentoring pastor'],
          notes: 'Start small and simple, focus on learning and adaptation'
        },
        {
          title: 'Study Unreached People Group',
          description: 'Research and build relationships with a specific demographic or cultural group in your area that lacks gospel witness',
          category: 'strategic',
          targetDimension: 'apostolic',
          estimatedTimeframe: '3-4 months research',
          requiredResources: ['Research time', 'Cultural learning', 'Relationship building'],
          successMetrics: ['Comprehensive group profile completed', '3+ relationships established', 'Ministry strategy developed'],
          collaborators: ['Cultural insiders', 'Missiologists', 'Church planting mentors'],
          notes: 'Focus on genuine relationships rather than just strategic analysis'
        }
      ],
      community: [
        {
          title: 'Organize Regular Community Meals',
          description: 'Host monthly meals that bring together believers and non-believers for authentic fellowship and relationship building',
          category: 'community',
          targetDimension: 'community',
          estimatedTimeframe: '2-3 months to establish',
          requiredResources: ['Hosting space', 'Meal costs', 'Planning time'],
          successMetrics: ['Monthly meals happening', 'Mix of believers and non-believers attending', 'Deeper relationships forming'],
          collaborators: ['Co-hosts', 'Regular attendees', 'Church community'],
          notes: 'Create relaxed, welcoming atmosphere where faith conversations can happen naturally'
        },
        {
          title: 'Facilitate Small Group Formation',
          description: 'Help launch and sustain small groups focused on spiritual growth, mutual support, and mission engagement',
          category: 'ministry',
          targetDimension: 'community',
          estimatedTimeframe: '3-6 months',
          requiredResources: ['Group materials', 'Leadership training', 'Meeting coordination'],
          successMetrics: ['2+ groups launched', 'Groups meeting regularly', 'Group multiplication occurring'],
          collaborators: ['Group leaders', 'Church staff', 'Group members'],
          notes: 'Focus on groups that are both inward-focused (growth) and outward-focused (mission)'
        }
      ],
      contextual: [
        {
          title: 'Conduct Community Listening Tour',
          description: 'Systematically interview community leaders, residents, and stakeholders to understand local needs and dynamics',
          category: 'strategic',
          targetDimension: 'contextual',
          estimatedTimeframe: '1-2 months',
          requiredResources: ['Interview time', 'Transportation', 'Note-taking system'],
          successMetrics: ['10+ interviews completed', 'Community needs assessment finished', 'Ministry strategy informed by findings'],
          collaborators: ['Community leaders', 'Residents', 'Fellow ministers'],
          notes: 'Ask good questions and listen more than you speak'
        },
        {
          title: 'Adapt Ministry Methods',
          description: 'Modify existing ministry approaches based on cultural context and community feedback',
          category: 'strategic',
          targetDimension: 'contextual',
          estimatedTimeframe: 'Ongoing adaptation',
          requiredResources: ['Flexibility', 'Feedback systems', 'Experimentation time'],
          successMetrics: ['Methods showing better engagement', 'Community feedback improving', 'More effective outcomes'],
          collaborators: ['Ministry team', 'Community feedback providers'],
          notes: 'Be willing to change methods while keeping the message constant'
        }
      ]
    };

    return baseActions[dimension] || [];
  };

  const updateActionStatus = (actionId: string, newStatus: ActionItem['status']) => {
    const updatedActions = actions.map(action => {
      if (action.id === actionId) {
        const updatedAction = {
          ...action,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date() : undefined
        };
        return updatedAction;
      }
      return action;
    });

    setActions(updatedActions);
    
    if (currentPlan) {
      const completedActions = updatedActions.filter(a => a.status === 'completed').length;
      const overallProgress = Math.round((completedActions / updatedActions.length) * 100);
      
      const updatedPlan = {
        ...currentPlan,
        actions: updatedActions,
        overallProgress
      };
      
      setCurrentPlan(updatedPlan);
      onPlanUpdate(updatedPlan);
    }
  };

  const addCustomAction = (actionData: Partial<ActionItem>) => {
    const newAction: ActionItem = {
      id: `custom_${Date.now()}`,
      title: actionData.title || 'New Action',
      description: actionData.description || '',
      category: actionData.category || 'personal',
      priority: actionData.priority || 'medium',
      status: 'not-started',
      targetDimension: actionData.targetDimension || 'incarnational',
      estimatedTimeframe: actionData.estimatedTimeframe || '',
      requiredResources: actionData.requiredResources || [],
      successMetrics: actionData.successMetrics || [],
      collaborators: actionData.collaborators || [],
      createdAt: new Date(),
      notes: actionData.notes || ''
    };

    const updatedActions = [...actions, newAction];
    setActions(updatedActions);
    
    if (currentPlan) {
      const updatedPlan = {
        ...currentPlan,
        actions: updatedActions
      };
      setCurrentPlan(updatedPlan);
      onPlanUpdate(updatedPlan);
    }
  };

  const getFilteredActions = () => {
    switch (filterStatus) {
      case 'active':
        return actions.filter(a => a.status === 'in-progress' || a.status === 'not-started');
      case 'completed':
        return actions.filter(a => a.status === 'completed');
      default:
        return actions;
    }
  };

  const statusIcons = {
    'not-started': <Clock className="w-4 h-4 text-gray-500" />,
    'in-progress': <Play className="w-4 h-4 text-blue-500" />,
    'completed': <CheckCircle className="w-4 h-4 text-green-500" />,
    'paused': <Pause className="w-4 h-4 text-yellow-500" />
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const categoryIcons = {
    personal: <Users className="w-4 h-4" />,
    ministry: <Star className="w-4 h-4" />,
    community: <Target className="w-4 h-4" />,
    strategic: <TrendingUp className="w-4 h-4" />
  };

  if (activeView === 'overview') {
    return (
      <div className="space-y-6">
        {/* Plan Overview */}
        <Card className="p-6">
          {currentPlan ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display">{currentPlan.title}</h3>
                <Badge variant="outline">
                  {currentPlan.overallProgress}% Complete
                </Badge>
              </div>
              <Progress value={currentPlan.overallProgress} className="h-2 mb-4" />
              <p className="text-muted-foreground mb-4">{currentPlan.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest mb-1">
                    {actions.filter(a => a.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {actions.filter(a => a.status === 'in-progress').length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-2xl font-bold text-muted-foreground mb-1 text-center">
                  <div>{actions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Actions</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Action Plan Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create a personalized action plan based on your assessment results.
              </p>
              <Button onClick={() => setActiveView('create')}>
                Create Action Plan
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        {currentPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => setActiveView('actions')}
            >
              <CheckCircle className="w-6 h-6" />
              <span>Manage Actions</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => setActiveView('progress')}
            >
              <TrendingUp className="w-6 h-6" />
              <span>View Progress</span>
            </Button>
          </div>
        )}

        {/* Recent Actions */}
        {actions.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-display mb-4">Recent Actions</h3>
            <div className="space-y-3">
              {actions.slice(0, 3).map((action) => (
                <div key={action.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {statusIcons[action.status]}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{action.title}</h4>
                      <Badge className={priorityColors[action.priority]}>
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const nextStatus = action.status === 'not-started' ? 'in-progress' :
                                       action.status === 'in-progress' ? 'completed' : 'not-started';
                      updateActionStatus(action.id, nextStatus);
                    }}
                  >
                    {action.status === 'completed' ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
            {actions.length > 3 && (
              <Button variant="ghost" className="w-full mt-3" onClick={() => setActiveView('actions')}>
                View All Actions
              </Button>
            )}
          </Card>
        )}
      </div>
    );
  }

  if (activeView === 'create') {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-display mb-4">Create Action Plan</h3>
          
          {assessmentResults ? (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Based on Your Assessment</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your overall missional maturity score is {assessmentResults.overallScore}%. 
                  Here are your top growth areas:
                </p>
                <div className="space-y-2">
                  {assessmentResults.growthAreas.slice(0, 3).map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={generateSuggestedPlan} className="w-full">
                Generate Personalized Action Plan
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">Assessment Required</h4>
              <p className="text-muted-foreground mb-4">
                Complete the Missional Health Assessment first to generate a personalized action plan.
              </p>
              <Button variant="outline">
                Take Assessment First
              </Button>
            </div>
          )}
        </Card>

        <Button variant="outline" onClick={() => setActiveView('overview')}>
          Back to Overview
        </Button>
      </div>
    );
  }

  // Actions view and other views would go here...
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-forest mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Action Planning Interface</h3>
          <p className="text-muted-foreground mb-4">
            The detailed action management interface is being developed. 
            Your personalized plan has been generated based on your assessment.
          </p>
          <Button onClick={() => setActiveView('overview')}>
            Return to Overview
          </Button>
        </div>
      </Card>
    </div>
  );
}
