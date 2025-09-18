'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Star,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Minus,
  Edit,
  Trash2,
  Send,
  Eye,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  FileText,
  PieChart,
  Target,
  Award,
  Lightbulb,
  Heart,
  Frown,
  Meh,
  Smile,
  Laugh
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

export interface FeedbackQuestion {
  id: string;
  type: 'rating' | 'text' | 'multiple-choice' | 'checkbox' | 'scale' | 'emoji';
  question: string;
  description?: string;
  required: boolean;
  options?: string[]; // For multiple-choice and checkbox
  scaleMin?: number; // For scale questions
  scaleMax?: number;
  scaleLabels?: string[]; // Labels for scale endpoints
  order: number;
  category: string;
}

export interface FeedbackResponse {
  id: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  surveyId: string;
  responses: Record<string, string | number | boolean | string[]>; // questionId -> response
  submittedAt: Date;
  completionTime: number; // in seconds
  isComplete: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface FeedbackSurvey {
  id: string;
  title: string;
  description?: string;
  workshopId: string;
  type: 'pre-event' | 'during-event' | 'post-event' | 'follow-up';
  status: 'draft' | 'active' | 'closed' | 'archived';
  questions: FeedbackQuestion[];
  settings: {
    anonymous: boolean;
    allowMultipleSubmissions: boolean;
    requireLogin: boolean;
    notifyOnSubmission: boolean;
    autoClose?: Date;
    reminderSchedule?: string[];
  };
  createdAt: Date;
  createdBy: string;
  responseCount: number;
  completionRate: number;
}

export interface FeedbackAnalytics {
  totalResponses: number;
  completionRate: number;
  averageCompletionTime: number;
  responseRate: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topKeywords: Array<{ word: string; count: number }>;
  satisfactionScore: number;
  recommendationScore: number; // NPS
}

export interface FeedbackCollectionProps {
  workshopId: string;
  surveys: FeedbackSurvey[];
  responses: FeedbackResponse[];
  analytics: FeedbackAnalytics;
  onCreateSurvey: (survey: Omit<FeedbackSurvey, 'id' | 'createdAt' | 'responseCount' | 'completionRate'>) => void;
  onUpdateSurvey: (surveyId: string, updates: Partial<FeedbackSurvey>) => void;
  onDeleteSurvey: (surveyId: string) => void;
  onSendSurvey: (surveyId: string, participantIds: string[]) => void;
  onExportResponses: (surveyId: string, format: 'csv' | 'pdf' | 'json') => void;
  userRole: 'participant' | 'facilitator' | 'host';
}

export function FeedbackCollection({
  workshopId,
  surveys,
  responses,
  analytics,
  onCreateSurvey,
  onUpdateSurvey,
  onDeleteSurvey,
  onSendSurvey,
  onExportResponses,
  userRole
}: FeedbackCollectionProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSurvey, setSelectedSurvey] = useState<FeedbackSurvey | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredSurveys = surveys.filter(survey => {
    const matchesStatus = filterStatus === 'all' || survey.status === filterStatus;
    const matchesType = filterType === 'all' || survey.type === filterType;
    return matchesStatus && matchesType;
  });

  const canManage = userRole === 'host' || userRole === 'facilitator';

  const getStatusColor = (status: FeedbackSurvey['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
      archived: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: FeedbackSurvey['type']) => {
    switch (type) {
      case 'pre-event':
        return <Clock className="h-4 w-4" />;
      case 'during-event':
        return <Users className="h-4 w-4" />;
      case 'post-event':
        return <CheckCircle className="h-4 w-4" />;
      case 'follow-up':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-5 w-5 text-green-600" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-yellow-600" />;
      case 'negative':
        return <Frown className="h-5 w-5 text-red-600" />;
      default:
        return <Meh className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feedback Collection</h2>
          <p className="text-muted-foreground">
            Gather insights and improve workshop experiences
          </p>
        </div>
        
        {canManage && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Survey
          </Button>
        )}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold">{analytics.totalResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{analytics.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time</p>
                <p className="text-2xl font-bold">{Math.round(analytics.averageCompletionTime / 60)}m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{analytics.satisfactionScore}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">NPS Score</p>
                <p className="text-2xl font-bold">{analytics.recommendationScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon('positive')}
                      <span>Positive</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={analytics.sentiment.positive} className="w-20 h-2" />
                      <span className="text-sm font-medium">{analytics.sentiment.positive}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon('neutral')}
                      <span>Neutral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={analytics.sentiment.neutral} className="w-20 h-2" />
                      <span className="text-sm font-medium">{analytics.sentiment.neutral}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon('negative')}
                      <span>Negative</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={analytics.sentiment.negative} className="w-20 h-2" />
                      <span className="text-sm font-medium">{analytics.sentiment.negative}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topKeywords.slice(0, 8).map((keyword, index) => (
                    <div key={keyword.word} className="flex items-center justify-between">
                      <span className="text-sm">{keyword.word}</span>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={(keyword.count / analytics.topKeywords[0]?.count) * 100} 
                          className="w-16 h-2" 
                        />
                        <span className="text-xs text-muted-foreground">{keyword.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Survey Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surveys
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .slice(0, 5)
                  .map(survey => (
                    <div key={survey.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(survey.type)}
                        <div>
                          <h4 className="font-medium">{survey.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {survey.responseCount} responses • {survey.completionRate}% completion
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(survey.status)}>
                        {survey.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveys" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pre-event">Pre-Event</SelectItem>
                <SelectItem value="during-event">During Event</SelectItem>
                <SelectItem value="post-event">Post-Event</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Surveys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map(survey => (
              <SurveyCard
                key={survey.id}
                survey={survey}
                onUpdate={(updates) => onUpdateSurvey(survey.id, updates)}
                onDelete={() => onDeleteSurvey(survey.id)}
                onPreview={() => {
                  setSelectedSurvey(survey);
                  setShowPreviewDialog(true);
                }}
                onExport={(format) => onExportResponses(survey.id, format)}
                canManage={canManage}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="responses" className="space-y-6">
          <ResponsesTable 
            responses={responses} 
            surveys={surveys}
            onExport={onExportResponses}
            canManage={canManage}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard 
            analytics={analytics}
            surveys={surveys}
            responses={responses}
          />
        </TabsContent>
      </Tabs>

      {/* Create Survey Dialog */}
      {showCreateDialog && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Survey</DialogTitle>
            </DialogHeader>
            <SurveyBuilder
              onSubmit={(survey) => {
                onCreateSurvey(survey);
                setShowCreateDialog(false);
              }}
              onCancel={() => setShowCreateDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Preview Dialog */}
      {showPreviewDialog && selectedSurvey && (
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Survey Preview: {selectedSurvey.title}</DialogTitle>
            </DialogHeader>
            <SurveyPreview survey={selectedSurvey} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Survey Card Component
function SurveyCard({
  survey,
  onUpdate,
  onDelete,
  onPreview,
  onExport,
  canManage
}: {
  survey: FeedbackSurvey;
  onUpdate: (updates: Partial<FeedbackSurvey>) => void;
  onDelete: () => void;
  onPreview: () => void;
  onExport: (format: 'csv' | 'pdf' | 'json') => void;
  canManage: boolean;
}) {
  const getStatusColor = (status: FeedbackSurvey['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
      archived: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: FeedbackSurvey['type']) => {
    switch (type) {
      case 'pre-event':
        return <Clock className="h-4 w-4" />;
      case 'during-event':
        return <Users className="h-4 w-4" />;
      case 'post-event':
        return <CheckCircle className="h-4 w-4" />;
      case 'follow-up':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getTypeIcon(survey.type)}
            <CardTitle className="text-lg">{survey.title}</CardTitle>
          </div>
          <Badge className={getStatusColor(survey.status)}>
            {survey.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {survey.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {survey.description}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Questions</p>
              <p className="font-medium">{survey.questions.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Responses</p>
              <p className="font-medium">{survey.responseCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Completion</p>
              <p className="font-medium">{survey.completionRate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium capitalize">{survey.type.replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            
            {canManage && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onExport('csv')}
                  disabled={survey.responseCount === 0}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                
                <Button variant="outline" size="sm" onClick={onDelete}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Survey Builder Component (simplified for demo)
function SurveyBuilder({
  onSubmit,
  onCancel
}: {
  onSubmit: (survey: Omit<FeedbackSurvey, 'id' | 'createdAt' | 'responseCount' | 'completionRate'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    workshopId: '',
    type: 'post-event' as FeedbackSurvey['type'],
    status: 'draft' as FeedbackSurvey['status'],
    questions: [] as FeedbackQuestion[],
    settings: {
      anonymous: false,
      allowMultipleSubmissions: false,
      requireLogin: true,
      notifyOnSubmission: true
    },
    createdBy: 'Current User'
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<FeedbackQuestion>>({
    type: 'rating',
    question: '',
    required: false,
    category: 'general'
  });

  const addQuestion = () => {
    if (currentQuestion.question) {
      const question: FeedbackQuestion = {
        id: `q_${Date.now()}`,
        type: currentQuestion.type || 'rating',
        question: currentQuestion.question,
        description: currentQuestion.description,
        required: currentQuestion.required || false,
        options: currentQuestion.options,
        scaleMin: currentQuestion.scaleMin,
        scaleMax: currentQuestion.scaleMax,
        scaleLabels: currentQuestion.scaleLabels,
        order: formData.questions.length,
        category: currentQuestion.category || 'general'
      };
      
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, question]
      }));
      
      setCurrentQuestion({
        type: 'rating',
        question: '',
        required: false,
        category: 'general'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Survey Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="type">Survey Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as FeedbackSurvey['type'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pre-event">Pre-Event</SelectItem>
              <SelectItem value="during-event">During Event</SelectItem>
              <SelectItem value="post-event">Post-Event</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      
      {/* Question Builder */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Add Question</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Question Type</Label>
            <Select 
              value={currentQuestion.type} 
              onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, type: value as FeedbackQuestion['type'] }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating (1-5 stars)</SelectItem>
                <SelectItem value="scale">Scale (1-10)</SelectItem>
                <SelectItem value="text">Text Response</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="emoji">Emoji Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Category</Label>
            <Select 
              value={currentQuestion.category} 
              onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="satisfaction">Satisfaction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label>Question Text *</Label>
          <Input
            value={currentQuestion.question || ''}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Enter your question..."
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="required"
            checked={currentQuestion.required}
            onCheckedChange={(checked) => setCurrentQuestion(prev => ({ ...prev, required: !!checked }))}
          />
          <Label htmlFor="required">Required</Label>
        </div>
        
        <Button type="button" onClick={addQuestion} disabled={!currentQuestion.question}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>
      
      {/* Questions List */}
      {formData.questions.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Questions ({formData.questions.length})</h3>
          {formData.questions.map((question, index) => (
            <div key={question.id} className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">{question.question}</p>
                <p className="text-sm text-muted-foreground">
                  {question.type} • {question.category} {question.required && '• Required'}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    questions: prev.questions.filter(q => q.id !== question.id)
                  }));
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={formData.questions.length === 0}>
          Create Survey
        </Button>
      </div>
    </form>
  );
}

// Survey Preview Component
function SurveyPreview({ survey }: { survey: FeedbackSurvey }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{survey.title}</h3>
        {survey.description && (
          <p className="text-muted-foreground mt-1">{survey.description}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {survey.questions.map((question, index) => (
          <div key={question.id} className="p-4 border rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-sm text-muted-foreground mt-1">{index + 1}.</span>
              <div className="flex-1">
                <p className="font-medium">
                  {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </p>
                {question.description && (
                  <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
                )}
                
                {/* Question Type Preview */}
                <div className="mt-3">
                  {question.type === 'rating' && (
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="h-5 w-5 text-gray-300" />
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'text' && (
                    <Textarea placeholder="Your response..." disabled />
                  )}
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <RadioGroup>
                      {question.options.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} disabled />
                          <Label>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {question.type === 'emoji' && (
                    <div className="flex space-x-2">
                      {[Frown, Meh, Smile, Laugh, Heart].map((Emoji, i) => (
                        <button key={i} disabled className="p-2 rounded">
                          <Emoji className="h-6 w-6 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button disabled>Submit Survey</Button>
      </div>
    </div>
  );
}

// Responses Table Component
function ResponsesTable({
  responses,
  surveys,
  onExport,
  canManage
}: {
  responses: FeedbackResponse[];
  surveys: FeedbackSurvey[];
  onExport: (surveyId: string, format: 'csv' | 'pdf' | 'json') => void;
  canManage: boolean;
}) {
  const [selectedSurvey, setSelectedSurvey] = useState<string>('all');
  
  const filteredResponses = selectedSurvey === 'all' 
    ? responses 
    : responses.filter(r => r.surveyId === selectedSurvey);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select survey" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Surveys</SelectItem>
            {surveys.map(survey => (
              <SelectItem key={survey.id} value={survey.id}>
                {survey.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {canManage && selectedSurvey !== 'all' && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onExport(selectedSurvey, 'csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => onExport(selectedSurvey, 'pdf')}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">Participant</th>
                  <th className="text-left p-4">Survey</th>
                  <th className="text-left p-4">Submitted</th>
                  <th className="text-left p-4">Completion</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.map(response => {
                  const survey = surveys.find(s => s.id === response.surveyId);
                  return (
                    <tr key={response.id} className="border-b">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{response.participantName}</p>
                          <p className="text-sm text-muted-foreground">{response.participantEmail}</p>
                        </div>
                      </td>
                      <td className="p-4">{survey?.title}</td>
                      <td className="p-4">{response.submittedAt.toLocaleDateString()}</td>
                      <td className="p-4">
                        <Badge variant={response.isComplete ? "default" : "secondary"}>
                          {response.isComplete ? 'Complete' : 'Partial'}
                        </Badge>
                      </td>
                      <td className="p-4">{Math.round(response.completionTime / 60)}m</td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Analytics Dashboard Component
function AnalyticsDashboard({
  analytics,
  surveys,
  responses
}: {
  analytics: FeedbackAnalytics;
  surveys: FeedbackSurvey[];
  responses: FeedbackResponse[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Response Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Response Rate</span>
              <div className="flex items-center space-x-2">
                <Progress value={analytics.responseRate} className="w-20 h-2" />
                <span className="text-sm font-medium">{analytics.responseRate}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Completion Rate</span>
              <div className="flex items-center space-x-2">
                <Progress value={analytics.completionRate} className="w-20 h-2" />
                <span className="text-sm font-medium">{analytics.completionRate}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Satisfaction Score</span>
              <div className="flex items-center space-x-2">
                <Progress value={(analytics.satisfactionScore / 5) * 100} className="w-20 h-2" />
                <span className="text-sm font-medium">{analytics.satisfactionScore}/5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Survey Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {surveys.slice(0, 5).map(survey => (
              <div key={survey.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{survey.title}</p>
                  <p className="text-xs text-muted-foreground">{survey.responseCount} responses</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={survey.completionRate} className="w-16 h-2" />
                  <span className="text-xs">{survey.completionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
