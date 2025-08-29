'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Mic, User, Star, Shield, Book, Heart } from 'lucide-react';
import { APESTTextAgent } from './APESTTextAgent';
import { APESTVoiceAgent } from './APESTVoiceAgent';
import { APESTProgress } from './APESTProgress';

interface APESTProfile {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
  primaryGift: 'apostolic' | 'prophetic' | 'evangelistic' | 'shepherding' | 'teaching';
  secondaryGift: 'apostolic' | 'prophetic' | 'evangelistic' | 'shepherding' | 'teaching';
  [key: string]: string | number;
}

interface ConversationSession {
  agentType: string;
  completed: boolean;
  lastActive: Date;
  insights: string[];
  duration: number;
  messages?: Array<{
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
  }>;
  recommendations?: string[];
  completionPercentage?: number;
  isCompleted?: boolean;
}

export function APESTAgentHub() {
  const [activeMode, setActiveMode] = useState<'text' | 'voice'>('text');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<APESTProfile | null>(null);
  const [sessions, setSessions] = useState<Record<string, ConversationSession>>({});
  const [isAssessmentLoaded, setIsAssessmentLoaded] = useState(false);

  // Mock APEST profile - in production, this would come from 5QCentral.com
  useEffect(() => {
    // Simulate loading user's APEST assessment
    setTimeout(() => {
      setUserProfile({
        apostolic: 85,
        prophetic: 65,
        evangelistic: 45,
        shepherding: 75,
        teaching: 90,
        primaryGift: 'teaching',
        secondaryGift: 'apostolic'
      });
      setIsAssessmentLoaded(true);
    }, 1000);
  }, []);

  const apestAgents = [
    {
      id: 'apostolic',
      agentType: 'apostolic',
      name: 'The Apostolic Pathfinder',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Pioneer new territories, start movements, and break barriers',
      persona: 'I am a visionary leader who sees untapped potential and helps you pioneer new frontiers in ministry and life.',
      focus: 'Breaking barriers, starting new things, seeing the big picture',
      questions: [
        'What new territory is God calling you to pioneer?',
        'Where do you see untapped potential in your sphere?',
        'How can you start something that doesn\'t exist yet?'
      ],
      sendMessage: async (message: string) => {
        // Mock AI response for apostolic agent
        return {
          response: `As an apostolic pathfinder, I sense you're being called to pioneer something new. ${message} shows your pioneering spirit. Consider how you might start a movement or break new ground in your context.`,
          insights: {
            insights: ['You have a pioneering spirit', 'God is calling you to new territories'],
            timestamp: new Date().toISOString(),
            agentType: 'apostolic'
          }
        };
      }
    },
    {
      id: 'prophetic',
      agentType: 'prophetic',
      name: 'The Prophetic Voice',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-red-500',
      description: 'Discern truth, call out injustice, and speak God\'s heart',
      persona: 'I am a truth-teller who helps you discern what God is saying and courageously speak His heart to the world.',
      focus: 'Discernment, justice, truth-telling, spiritual insight',
      questions: [
        'What is God\'s heart for your community?',
        'Where do you see injustice that needs addressing?',
        'What truth is God calling you to proclaim?'
      ],
      sendMessage: async (message: string) => {
        return {
          response: `The prophetic voice within me discerns truth in your words. ${message} reveals your heart for justice. How might God be calling you to speak His heart boldly?`,
          insights: {
            insights: ['You have a prophetic sensitivity', 'Truth-telling is part of your calling'],
            timestamp: new Date().toISOString(),
            agentType: 'prophetic'
          }
        };
      }
    },
    {
      id: 'evangelistic',
      agentType: 'evangelistic',
      name: 'The Evangelistic Bridge',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Connect with outsiders and share the Gospel naturally',
      persona: 'I am a bridge-builder who helps you connect authentically with those far from God and share His love naturally.',
      focus: 'Relationship building, storytelling, cultural connection',
      questions: [
        'Who in your network is far from God but close to you?',
        'How can you build authentic relationships with outsiders?',
        'What\'s your unique story that connects with others?'
      ],
      sendMessage: async (message: string) => {
        return {
          response: `I see the bridge-builder in you! ${message} shows your heart for connecting with others. How can you build more authentic relationships with those who need to experience God's love?`,
          insights: {
            insights: ['You have natural relationship-building abilities', 'Your story connects with others'],
            timestamp: new Date().toISOString(),
            agentType: 'evangelistic'
          }
        };
      }
    },
    {
      id: 'shepherding',
      agentType: 'shepherding',
      name: 'The Shepherding Heart',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Care for people, create belonging, and foster growth',
      persona: 'I am a caring shepherd who helps you nurture others with wisdom, create belonging, and guide people toward wholeness.',
      focus: 'Pastoral care, community building, personal growth',
      questions: [
        'Who needs your care and attention right now?',
        'How can you create deeper belonging in your community?',
        'What does healthy spiritual growth look like?'
      ],
      sendMessage: async (message: string) => {
        return {
          response: `Your shepherding heart shines through. ${message} reveals your care for others. How might you nurture deeper belonging and guide others toward wholeness?`,
          insights: {
            insights: ['You have a natural caring heart', 'People feel safe with you'],
            timestamp: new Date().toISOString(),
            agentType: 'shepherding'
          }
        };
      }
    },
    {
      id: 'teaching',
      agentType: 'teaching',
      name: 'The Teaching Guide',
      icon: <Book className="w-6 h-6" />,
      color: 'bg-amber-500',
      description: 'Illuminate truth, develop understanding, and equip others',
      persona: 'I am a wise teacher who helps you understand deep truths and equip others with knowledge that transforms lives.',
      focus: 'Biblical understanding, skill development, knowledge transfer',
      questions: [
        'What truth needs deeper exploration in your context?',
        'How can you better equip others for ministry?',
        'What knowledge do you have that others need?'
      ],
      sendMessage: async (message: string) => {
        return {
          response: `Your teaching gift is evident. ${message} shows your desire to illuminate truth. How can you develop understanding and equip others with transformative knowledge?`,
          insights: {
            insights: ['You have wisdom to share', 'People learn well from you'],
            timestamp: new Date().toISOString(),
            agentType: 'teaching'
          }
        };
      }
    }
  ];

  const getAgentRecommendation = () => {
    if (!userProfile) return null;
    
    const incomplete = apestAgents.filter(agent => 
      !sessions[agent.id]?.completed
    );
    
    if (incomplete.length === 0) return null;
    
    // Recommend based on primary/secondary gifts first
    const primaryAgent = incomplete.find(agent => agent.id === userProfile.primaryGift);
    if (primaryAgent) {
      return {
        recommendedAgent: primaryAgent.id,
        reason: `Start with your primary gift of ${primaryAgent.name.replace('The ', '')} to build confidence`
      };
    }
    
    const secondaryAgent = incomplete.find(agent => agent.id === userProfile.secondaryGift);
    if (secondaryAgent) {
      return {
        recommendedAgent: secondaryAgent.id,
        reason: `Explore your secondary gift of ${secondaryAgent.name.replace('The ', '')} for balanced growth`
      };
    }
    
    return {
      recommendedAgent: incomplete[0].id,
      reason: `Begin with ${incomplete[0].name.replace('The ', '')} to start your APEST journey`
    };
  };

  const completedSessions = Object.values(sessions).filter(s => s.completed).length;
  const totalInsights = Object.values(sessions).reduce((acc, s) => acc + s.insights.length, 0);

  if (!isAssessmentLoaded) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-display mb-2">Loading Your APEST Profile</h2>
          <p className="text-muted-foreground">Connecting to your 5QCentral.com assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display mb-4">APEST AI Agent Conversations</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Engage in deep, personalized conversations with five AI agents, each embodying a different aspect of fivefold ministry. 
          Based on your APEST assessment from 5QCentral.com.
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display">Your APEST Profile</h3>
          <div className="flex gap-2">
            <Badge variant="default">Primary: {userProfile?.primaryGift}</Badge>
            <Badge variant="secondary">Secondary: {userProfile?.secondaryGift}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {userProfile && Object.entries(userProfile).slice(0, 5).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="h-2 bg-secondary rounded-full mb-2">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium capitalize">{key}</p>
              <p className="text-xs text-muted-foreground">{value}%</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Overview */}
      <APESTProgress sessions={sessions} totalAgents={apestAgents.length} />

      {/* Main Interface */}
      <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as 'text' | 'voice')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Text Conversations
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Voice Conversations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          {selectedAgent ? (
            <APESTTextAgent
              agent={apestAgents.find(a => a.id === selectedAgent)!}
              userProfile={userProfile!}
              session={sessions[selectedAgent]}
              onSessionUpdate={(session: ConversationSession) => {
                setSessions(prev => ({ ...prev, [selectedAgent]: session }));
              }}
              onBack={() => setSelectedAgent(null)}
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apestAgents.map((agent) => {
                const session = sessions[agent.id];
                const isRecommended = getAgentRecommendation()?.recommendedAgent === agent.id;
                
                return (
                  <Card 
                    key={agent.id} 
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      isRecommended ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full ${agent.color} text-white`}>
                        {agent.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        {isRecommended && (
                          <Badge variant="default" className="mt-1">Recommended</Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    
                    {session?.completed ? (
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Completed</Badge>
                        <span className="text-xs text-muted-foreground">
                          {session.insights.length} insights
                        </span>
                      </div>
                    ) : session?.lastActive ? (
                      <Badge variant="outline">In Progress</Badge>
                    ) : (
                      <Button className="w-full">Start Conversation</Button>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="voice">
          <APESTVoiceAgent
            agents={apestAgents}
            userProfile={userProfile!}
            sessions={sessions}
            onSessionUpdate={(agentId: string, session: ConversationSession) => {
              setSessions(prev => ({ ...prev, [agentId]: session }));
            }}
            recommendation={getAgentRecommendation()}
          />
        </TabsContent>
      </Tabs>

      {/* Summary Stats */}
      {completedSessions > 0 && (
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-display mb-4">Your APEST Journey</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{completedSessions}</p>
              <p className="text-sm text-muted-foreground">Conversations Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{totalInsights}</p>
              <p className="text-sm text-muted-foreground">Personal Insights</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{Math.round(completedSessions / 5 * 100)}%</p>
              <p className="text-sm text-muted-foreground">Journey Complete</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
