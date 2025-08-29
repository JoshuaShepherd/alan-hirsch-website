'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, ArrowRight, ArrowLeft, Heart, Star, Users, 
  Compass, Home, Globe, Target, TrendingUp, AlertCircle
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  dimension: 'incarnational' | 'gospel' | 'discipleship' | 'apostolic' | 'community' | 'contextual';
  question: string;
  explanation: string;
  options: {
    text: string;
    value: number;
    description: string;
  }[];
}

export interface AssessmentResults {
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

interface MissionalHealthAssessmentProps {
  onAssessmentComplete: (results: AssessmentResults) => void;
}

const assessmentQuestions: AssessmentQuestion[] = [
  // Incarnational Living Questions
  {
    id: 'inc_1',
    dimension: 'incarnational',
    question: 'How often do you intentionally build relationships with people who don\'t yet follow Jesus?',
    explanation: 'Incarnational living means embodying Christ\'s presence in our everyday relationships and contexts.',
    options: [
      { text: 'Daily - it\'s a natural part of my life', value: 5, description: 'Consistently incarnational' },
      { text: 'Weekly - I make regular effort', value: 4, description: 'Intentionally engaging' },
      { text: 'Monthly - when opportunities arise', value: 3, description: 'Occasionally responsive' },
      { text: 'Rarely - mostly with church people', value: 2, description: 'Limited engagement' },
      { text: 'Never - I struggle with this', value: 1, description: 'Need significant growth' }
    ]
  },
  {
    id: 'inc_2',
    dimension: 'incarnational',
    question: 'How well do you understand and engage with your neighborhood culture?',
    explanation: 'True incarnational ministry requires deep understanding of local context and culture.',
    options: [
      { text: 'Very well - I\'m deeply connected', value: 5, description: 'Culturally embedded' },
      { text: 'Well - I actively learn and engage', value: 4, description: 'Growing in understanding' },
      { text: 'Somewhat - I observe but don\'t engage much', value: 3, description: 'Surface level' },
      { text: 'Poorly - I live separate from my community', value: 2, description: 'Disconnected' },
      { text: 'Not at all - I haven\'t considered this', value: 1, description: 'Need awareness' }
    ]
  },
  
  // Gospel Centrality Questions
  {
    id: 'gospel_1',
    dimension: 'gospel',
    question: 'How central is the Gospel message in your daily conversations and relationships?',
    explanation: 'Gospel centrality means the good news of Jesus shapes everything we do and say.',
    options: [
      { text: 'Always central - naturally flows from my life', value: 5, description: 'Gospel-saturated living' },
      { text: 'Often central - I look for opportunities', value: 4, description: 'Intentionally gospel-focused' },
      { text: 'Sometimes - when it feels appropriate', value: 3, description: 'Situationally aware' },
      { text: 'Rarely - I struggle to bring it up', value: 2, description: 'Gospel-shy' },
      { text: 'Never - I keep faith private', value: 1, description: 'Compartmentalized faith' }
    ]
  },
  {
    id: 'gospel_2',
    dimension: 'gospel',
    question: 'How does the Gospel shape your approach to social justice and community issues?',
    explanation: 'The Gospel calls us to holistic transformation - personal and social.',
    options: [
      { text: 'Completely - Gospel drives all my justice work', value: 5, description: 'Holistic gospel vision' },
      { text: 'Significantly - I connect faith and justice', value: 4, description: 'Integrated approach' },
      { text: 'Somewhat - I see some connections', value: 3, description: 'Growing understanding' },
      { text: 'Minimally - I separate faith and justice', value: 2, description: 'Compartmentalized' },
      { text: 'Not at all - I don\'t see the connection', value: 1, description: 'Need theological development' }
    ]
  },

  // Discipleship Questions
  {
    id: 'disc_1',
    dimension: 'discipleship',
    question: 'How intentionally are you making disciples who make other disciples?',
    explanation: 'Missional discipleship creates reproducible pathways for spiritual growth and multiplication.',
    options: [
      { text: 'Very intentionally - I have multiple generations', value: 5, description: 'Multiplying disciple-maker' },
      { text: 'Intentionally - I\'m actively discipling others', value: 4, description: 'Active disciple-maker' },
      { text: 'Somewhat - I mentor when asked', value: 3, description: 'Responsive mentor' },
      { text: 'Minimally - I focus on my own growth', value: 2, description: 'Self-focused' },
      { text: 'Not at all - I don\'t know how', value: 1, description: 'Need training' }
    ]
  },
  {
    id: 'disc_2',
    dimension: 'discipleship',
    question: 'How well do you equip others to discover and use their APEST gifts?',
    explanation: 'Effective discipleship helps people discover their unique calling and gifting.',
    options: [
      { text: 'Very well - I regularly help others discover gifts', value: 5, description: 'Gift-awakening leader' },
      { text: 'Well - I understand and share APEST principles', value: 4, description: 'APEST-informed' },
      { text: 'Somewhat - I\'m learning about APEST myself', value: 3, description: 'Growing understanding' },
      { text: 'Poorly - I don\'t really understand APEST', value: 2, description: 'Need education' },
      { text: 'Not at all - This is new to me', value: 1, description: 'Starting point' }
    ]
  },

  // Apostolic Movement Questions
  {
    id: 'apost_1',
    dimension: 'apostolic',
    question: 'How often do you pioneer new forms of ministry or mission?',
    explanation: 'Apostolic movement involves breaking new ground and establishing God\'s kingdom in new contexts.',
    options: [
      { text: 'Regularly - I\'m always starting new things', value: 5, description: 'Serial pioneer' },
      { text: 'Often - I look for new opportunities', value: 4, description: 'Initiative-taker' },
      { text: 'Sometimes - when I see clear needs', value: 3, description: 'Responsive starter' },
      { text: 'Rarely - I prefer established ministries', value: 2, description: 'Maintenance-minded' },
      { text: 'Never - I avoid new or risky ventures', value: 1, description: 'Risk-averse' }
    ]
  },
  {
    id: 'apost_2',
    dimension: 'apostolic',
    question: 'How effectively do you establish sustainable, reproducible ministries?',
    explanation: 'True apostolic ministry creates systems and structures that outlast the founder.',
    options: [
      { text: 'Very effectively - My ministries reproduce and multiply', value: 5, description: 'System-builder' },
      { text: 'Effectively - I build sustainable structures', value: 4, description: 'Structure-minded' },
      { text: 'Somewhat - I start things but struggle with sustainability', value: 3, description: 'Starter without systems' },
      { text: 'Poorly - My ministries depend on me', value: 2, description: 'Dependency-creator' },
      { text: 'Not effectively - Things fall apart when I leave', value: 1, description: 'Need systems thinking' }
    ]
  },

  // Community Questions
  {
    id: 'comm_1',
    dimension: 'community',
    question: 'How deeply do people in your community experience authentic, transformational relationships?',
    explanation: 'Authentic community goes beyond surface relationships to life-changing fellowship.',
    options: [
      { text: 'Very deeply - We share life at a profound level', value: 5, description: 'Deep community' },
      { text: 'Deeply - People are vulnerable and supportive', value: 4, description: 'Authentic relationships' },
      { text: 'Moderately - Some openness but mostly surface', value: 3, description: 'Growing transparency' },
      { text: 'Shallow - Polite but not vulnerable', value: 2, description: 'Surface community' },
      { text: 'Very shallow - People remain isolated', value: 1, description: 'Disconnected individuals' }
    ]
  },
  {
    id: 'comm_2',
    dimension: 'community',
    question: 'How well does your community practice radical hospitality to outsiders?',
    explanation: 'Missional communities are characterized by extravagant welcome and inclusion.',
    options: [
      { text: 'Exceptionally - Outsiders immediately feel welcomed', value: 5, description: 'Radically hospitable' },
      { text: 'Well - We actively welcome newcomers', value: 4, description: 'Intentionally welcoming' },
      { text: 'Adequately - We\'re friendly but not exceptional', value: 3, description: 'Politely welcoming' },
      { text: 'Poorly - Outsiders struggle to connect', value: 2, description: 'Insider-focused' },
      { text: 'Very poorly - We\'re closed to newcomers', value: 1, description: 'Exclusive community' }
    ]
  },

  // Contextual Engagement Questions
  {
    id: 'context_1',
    dimension: 'contextual',
    question: 'How well do you understand the specific challenges and opportunities in your mission field?',
    explanation: 'Effective mission requires deep understanding of local context, needs, and opportunities.',
    options: [
      { text: 'Very well - I\'ve done extensive research and engagement', value: 5, description: 'Context expert' },
      { text: 'Well - I understand the major issues and dynamics', value: 4, description: 'Contextually aware' },
      { text: 'Somewhat - I know some basics', value: 3, description: 'Surface understanding' },
      { text: 'Poorly - I make assumptions without research', value: 2, description: 'Assumption-based' },
      { text: 'Very poorly - I haven\'t considered local context', value: 1, description: 'Context-blind' }
    ]
  },
  {
    id: 'context_2',
    dimension: 'contextual',
    question: 'How effectively do you adapt your ministry methods to your specific context?',
    explanation: 'Contextual ministry requires flexible methods while maintaining unchanging message.',
    options: [
      { text: 'Very effectively - I constantly adapt and innovate', value: 5, description: 'Adaptive innovator' },
      { text: 'Effectively - I modify approaches based on feedback', value: 4, description: 'Responsive adaptor' },
      { text: 'Somewhat - I make some adjustments', value: 3, description: 'Limited flexibility' },
      { text: 'Poorly - I use the same methods everywhere', value: 2, description: 'One-size-fits-all' },
      { text: 'Very poorly - I never consider context', value: 1, description: 'Rigid approach' }
    ]
  }
];

export function MissionalHealthAssessment({ onAssessmentComplete }: MissionalHealthAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  const handleResponse = (value: number) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (isLastQuestion) {
      calculateResults(newResponses);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateResults = (responses: Record<string, number>) => {
    // Calculate dimension scores
    const dimensionScores = {
      incarnational: 0,
      gospel: 0,
      discipleship: 0,
      apostolic: 0,
      community: 0,
      contextual: 0
    };

    const dimensionCounts = {
      incarnational: 0,
      gospel: 0,
      discipleship: 0,
      apostolic: 0,
      community: 0,
      contextual: 0
    };

    // Sum scores by dimension
    Object.entries(responses).forEach(([questionId, score]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (question) {
        dimensionScores[question.dimension] += score;
        dimensionCounts[question.dimension] += 1;
      }
    });

    // Calculate percentages
    const finalScores = {
      incarnational: Math.round((dimensionScores.incarnational / (dimensionCounts.incarnational * 5)) * 100),
      gospel: Math.round((dimensionScores.gospel / (dimensionCounts.gospel * 5)) * 100),
      discipleship: Math.round((dimensionScores.discipleship / (dimensionCounts.discipleship * 5)) * 100),
      apostolic: Math.round((dimensionScores.apostolic / (dimensionCounts.apostolic * 5)) * 100),
      community: Math.round((dimensionScores.community / (dimensionCounts.community * 5)) * 100),
      contextual: Math.round((dimensionScores.contextual / (dimensionCounts.contextual * 5)) * 100)
    };

    const overallScore = Math.round(
      Object.values(finalScores).reduce((sum, score) => sum + score, 0) / 6
    );

    // Generate recommendations and insights
    const recommendations = generateRecommendations(finalScores);
    const nextSteps = generateNextSteps(finalScores);
    const strengths = identifyStrengths(finalScores);
    const growthAreas = identifyGrowthAreas(finalScores);

    const assessmentResults: AssessmentResults = {
      overallScore,
      dimensions: finalScores,
      recommendations,
      nextSteps,
      strengths,
      growthAreas
    };

    setResults(assessmentResults);
    setShowResults(true);
    onAssessmentComplete(assessmentResults);
  };

  const generateRecommendations = (scores: Record<string, number>) => {
    const recommendations = [];
    
    if (scores.incarnational < 60) {
      recommendations.push('Focus on building authentic relationships with non-Christians in your daily life');
    }
    if (scores.gospel < 60) {
      recommendations.push('Practice sharing the Gospel naturally in conversations and actions');
    }
    if (scores.discipleship < 60) {
      recommendations.push('Develop intentional discipleship relationships and multiplication strategies');
    }
    if (scores.apostolic < 60) {
      recommendations.push('Look for opportunities to pioneer new expressions of ministry');
    }
    if (scores.community < 60) {
      recommendations.push('Create deeper, more authentic community experiences');
    }
    if (scores.contextual < 60) {
      recommendations.push('Study your local context and adapt your ministry approaches accordingly');
    }

    return recommendations;
  };

  const generateNextSteps = (scores: Record<string, number>) => {
    const nextSteps = [];
    const sortedScores = Object.entries(scores).sort(([,a], [,b]) => (a as number) - (b as number));
    const lowestScore = sortedScores[0];
    
    switch (lowestScore[0]) {
      case 'incarnational':
        nextSteps.push('Start a weekly rhythm of intentional neighboring');
        nextSteps.push('Join a local community group or activity');
        break;
      case 'gospel':
        nextSteps.push('Practice telling your faith story in 2 minutes');
        nextSteps.push('Study how to connect the Gospel to everyday life');
        break;
      case 'discipleship':
        nextSteps.push('Find someone to disciple and someone to be discipled by');
        nextSteps.push('Create a simple discipleship process');
        break;
      case 'apostolic':
        nextSteps.push('Identify an unreached area or demographic');
        nextSteps.push('Start a new ministry initiative or experiment');
        break;
      case 'community':
        nextSteps.push('Organize regular meals or gatherings');
        nextSteps.push('Create space for deeper sharing and vulnerability');
        break;
      case 'contextual':
        nextSteps.push('Conduct a neighborhood or community assessment');
        nextSteps.push('Adapt one ministry method to better fit your context');
        break;
    }

    return nextSteps;
  };

  const identifyStrengths = (scores: Record<string, number>) => {
    return Object.entries(scores)
      .filter(([, score]) => (score as number) >= 70)
      .map(([dimension]) => {
        const dimensionNames = {
          incarnational: 'Incarnational Living',
          gospel: 'Gospel Centrality', 
          discipleship: 'Disciple Making',
          apostolic: 'Apostolic Movement',
          community: 'Authentic Community',
          contextual: 'Contextual Engagement'
        };
        return dimensionNames[dimension as keyof typeof dimensionNames];
      });
  };

  const identifyGrowthAreas = (scores: Record<string, number>) => {
    return Object.entries(scores)
      .filter(([, score]) => (score as number) < 60)
      .map(([dimension]) => {
        const dimensionNames = {
          incarnational: 'Incarnational Living',
          gospel: 'Gospel Centrality',
          discipleship: 'Disciple Making', 
          apostolic: 'Apostolic Movement',
          community: 'Authentic Community',
          contextual: 'Contextual Engagement'
        };
        return dimensionNames[dimension as keyof typeof dimensionNames];
      });
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const dimensionIcons = {
    incarnational: <Heart className="w-5 h-5" />,
    gospel: <Star className="w-5 h-5" />,
    discipleship: <Users className="w-5 h-5" />,
    apostolic: <Compass className="w-5 h-5" />,
    community: <Home className="w-5 h-5" />,
    contextual: <Globe className="w-5 h-5" />
  };

  if (showResults && results) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-forest text-white rounded-full">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-display mb-2">Assessment Complete!</h2>
          <p className="text-muted-foreground mb-4">Here's your comprehensive missional health profile</p>
          <div className="text-4xl font-bold text-forest mb-2">{results.overallScore}%</div>
          <div className="text-sm text-muted-foreground">Overall Missional Maturity</div>
        </Card>

        {/* Dimension Scores */}
        <Card className="p-6">
          <h3 className="text-xl font-display mb-4">Dimension Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(results.dimensions).map(([dimension, score]) => {
              const dimensionNames = {
                incarnational: 'Incarnational Living',
                gospel: 'Gospel Centrality',
                discipleship: 'Disciple Making',
                apostolic: 'Apostolic Movement',
                community: 'Authentic Community',
                contextual: 'Contextual Engagement'
              };
              
              return (
                <div key={dimension} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {dimensionIcons[dimension as keyof typeof dimensionIcons]}
                      <span className="font-medium">
                        {dimensionNames[dimension as keyof typeof dimensionNames]}
                      </span>
                    </div>
                    <span className="font-bold text-forest">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Strengths and Growth Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-display mb-3 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Your Strengths</span>
            </h3>
            {results.strengths.length > 0 ? (
              <div className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keep growing! Every journey starts with a single step.
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-display mb-3 flex items-center space-x-2">
              <Target className="w-5 h-5 text-amber-600" />
              <span>Growth Opportunities</span>
            </h3>
            {results.growthAreas.length > 0 ? (
              <div className="space-y-2">
                {results.growthAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Great job! You're demonstrating strength across all areas.
              </p>
            )}
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6">
          <h3 className="text-lg font-display mb-3">Personalized Recommendations</h3>
          <div className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-1 bg-forest text-white rounded">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h3 className="text-lg font-display mb-3">Your Next Steps</h3>
          <div className="space-y-3">
            {results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="p-1 bg-rust text-white rounded text-xs font-bold min-w-[20px] h-[20px] flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display">Missional Health Assessment</h2>
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="text-sm text-muted-foreground mt-2">
          {Math.round(progress)}% Complete
        </div>
      </Card>

      {/* Question Card */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            {dimensionIcons[currentQuestion.dimension]}
            <Badge variant="secondary" className="capitalize">
              {currentQuestion.dimension}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2">{currentQuestion.question}</h3>
          <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full p-4 h-auto text-left justify-start hover:bg-forest hover:text-white transition-all"
              onClick={() => handleResponse(option.value)}
            >
              <div>
                <div className="font-medium">{option.text}</div>
                <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            Select an answer to continue
          </div>
        </div>
      </Card>
    </div>
  );
}
