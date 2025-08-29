'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Loader2, User, Bot, Lightbulb, Target, Clock } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  insights?: string[];
}

interface UserProfile {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
  primaryGift: string;
  secondaryGift: string;
  [key: string]: string | number;
}

interface ConversationSession {
  agentType: string;
  completed: boolean;
  lastActive: Date;
  insights: string[];
  duration: number;
}

interface APESTTextAgentProps {
  agent: {
    id: string;
    agentType: string;
    name: string;
    description: string;
    persona: string;
    color: string;
    icon: React.ReactNode;
    questions: string[];
    sendMessage: (message: string) => Promise<{
      response: string;
      insights?: {
        insights: string[];
        timestamp: string;
        agentType: string;
      };
      recommendations?: {
        recommendedAgent: string;
        reason: string;
      };
    }>;
  };
  userProfile: UserProfile;
  session: ConversationSession;
  onSessionUpdate: (session: ConversationSession) => void;
  onBack: () => void;
}

export function APESTTextAgent({ agent, userProfile, session, onSessionUpdate, onBack }: APESTTextAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'agent',
        content: `Hello! ${agent.persona} I'm here to help you explore your ${agent.id} calling. Based on your APEST assessment, I can see your ${agent.id} score is ${userProfile[agent.id]}%. Let's dive deep into what this means for you. 

${agent.questions[0]}`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [agent, userProfile, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const agentResponse = generateAgentResponse(input, agent, userProfile, messages);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: agentResponse.content,
        timestamp: new Date(),
        insights: agentResponse.insights
      };

      setMessages(prev => [...prev, agentMessage]);
      
      if (agentResponse.insights && agentResponse.insights.length > 0) {
        setInsights(prev => [...prev, ...agentResponse.insights]);
      }

      setIsLoading(false);

      // Update session
      const updatedSession = {
        agentType: agent.id,
        completed: messages.length + 2 >= 10, // Complete after ~10 exchanges
        lastActive: new Date(),
        insights: [...insights, ...(agentResponse.insights || [])],
        duration: (session?.duration || 0) + Math.random() * 120 + 60 // 1-3 minutes per exchange
      };

      onSessionUpdate(updatedSession);
    }, 1500 + Math.random() * 2000);
  };

  const generateAgentResponse = (userInput: string, agent: APESTTextAgentProps['agent'], profile: UserProfile, conversation: Message[]) => {
    // This is a sophisticated response generator based on the agent type and conversation context
    const responses = {
      apostolic: {
        responses: [
          "I sense a pioneering spirit in what you're sharing. The apostolic calling is about seeing what others can't see yet. What if this challenge you're facing is actually an invitation to break new ground?",
          "Your apostolic gifting thrives on untapped potential. I'm hearing you describe a situation that needs someone who can see beyond current limitations. What would it look like to approach this with fresh eyes?",
          "As someone with apostolic tendencies, you're wired to start things that don't exist yet. What's stirring in your spirit that wants to be birthed into existence?",
          "The apostolic heart sees systems and structures that need to be established. What foundation needs to be laid in this area of your life or ministry?"
        ],
        insights: [
          "You have a natural ability to see possibilities others miss",
          "Your role may be to pioneer new approaches in established systems",
          "Consider how you might plant seeds for future growth",
          "Look for opportunities to establish something lasting"
        ]
      },
      prophetic: {
        responses: [
          "There's a prophetic edge to what you're describing. The prophetic calling is about discerning what God's heart is in this situation. What do you sense the Father's heart is concerning this matter?",
          "Your prophetic sensitivity picks up on things others miss. I'm hearing you wrestle with something that goes deeper than surface issues. What truth is trying to emerge here?",
          "The prophetic voice often calls things back to God's original intent. Where do you see misalignment with God's design in what you're sharing?",
          "Your prophetic gifting helps others see clearly. What needs to be exposed to the light in this situation?"
        ],
        insights: [
          "You have a gift for discerning spiritual realities beneath the surface",
          "Your role may be to speak truth that others are avoiding",
          "Consider how you might call situations back to God's design",
          "Trust your spiritual intuition about what's really happening"
        ]
      },
      evangelistic: {
        responses: [
          "I love your heart for connection! The evangelistic gift is about building bridges between worlds. Who in your story needs someone to believe in them and connect them to hope?",
          "Your evangelistic nature sees potential in people others might write off. What you're describing sounds like an opportunity to be someone's bridge to a better future.",
          "The evangelistic calling is magnetic - you draw people toward life and hope. How might this situation be an opportunity to demonstrate the goodness of God?",
          "Your gift is meeting people where they are and helping them see what's possible. Who needs you to be their advocate right now?"
        ],
        insights: [
          "You naturally connect with people others find difficult to reach",
          "Your role may be to advocate for those who feel disconnected",
          "Look for opportunities to share hope through authentic relationship",
          "Consider how your story might resonate with others' struggles"
        ]
      },
      shepherding: {
        responses: [
          "Your shepherding heart is beautiful to witness. I can hear the care and concern in what you're sharing. The pastoral gift creates safety for growth - who needs your protective presence right now?",
          "There's such wisdom in how you're approaching this. The shepherding gift knows that people need both truth and grace. How might you create space for healing in this situation?",
          "Your pastoral sensitivity picks up on the heart behind the behavior. What you're describing sounds like someone who needs to know they belong. How might you help them feel truly seen?",
          "The shepherding calling is about creating environments where people can flourish. What would emotional and spiritual safety look like in this context?"
        ],
        insights: [
          "You have a natural ability to create emotional safety for others",
          "Your role may be to nurture growth in challenging circumstances",
          "Consider how you might help others feel genuinely valued and understood",
          "Look for ways to provide both protection and gentle challenge"
        ]
      },
      teaching: {
        responses: [
          "Your teaching heart is evident in how thoughtfully you process this. The teaching gift helps others understand what they're experiencing. What principles or truths might illuminate this situation?",
          "I appreciate the depth you bring to this question. The teaching calling connects understanding with transformation. What do you think others need to learn from your experience?",
          "Your gift for breaking down complex ideas is needed here. What you're describing has layers that others might benefit from understanding. How would you help someone else navigate this?",
          "The teaching gift sees patterns and principles that create lasting change. What framework or approach might help others who face similar challenges?"
        ],
        insights: [
          "You naturally see patterns and principles that others miss",
          "Your role may be to help others understand complex spiritual truths",
          "Consider how your experience could become wisdom for others",
          "Look for opportunities to equip others with practical understanding"
        ]
      }
    };

    const agentResponses = responses[agent.id as keyof typeof responses];
    const randomResponse = agentResponses.responses[Math.floor(Math.random() * agentResponses.responses.length)];
    const randomInsights = agentResponses.insights.slice(0, Math.floor(Math.random() * 2) + 1);

    return {
      content: randomResponse,
      insights: randomInsights
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agents
        </Button>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${agent.color} text-white`}>
            {agent.icon}
          </div>
          <div>
            <h2 className="text-2xl font-display">{agent.name}</h2>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      {insights.length > 0 && (
        <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800 dark:text-amber-200">Personal Insights</h3>
          </div>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <Target className="w-4 h-4 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-amber-300">{insight}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-full ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : `${agent.color} text-white`
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className={`p-2 rounded-full ${agent.color} text-white`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="inline-block p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Share your thoughts with ${agent.name}...`}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </Card>

      {/* Session Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-primary">{messages.filter(m => m.role === 'user').length}</p>
          <p className="text-sm text-muted-foreground">Your Messages</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">{insights.length}</p>
          <p className="text-sm text-muted-foreground">Insights Gained</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">{Math.round((session?.duration || 0) / 60)}m</p>
          <p className="text-sm text-muted-foreground">Time Invested</p>
        </div>
      </div>
    </div>
  );
}
