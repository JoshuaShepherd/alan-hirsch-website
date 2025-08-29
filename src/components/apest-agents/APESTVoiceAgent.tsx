'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff, 
  Users, 
  Activity,
  Settings,
  Play,
  Pause
} from 'lucide-react';

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

interface APESTAgent {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface APESTVoiceAgentProps {
  agents: APESTAgent[];
  userProfile: UserProfile;
  sessions: Record<string, ConversationSession>;
  onSessionUpdate: (agentId: string, session: ConversationSession) => void;
  recommendation: {
    recommendedAgent: string;
    reason: string;
  } | null;
}

export function APESTVoiceAgent({ 
  agents, 
  userProfile, 
  sessions, 
  onSessionUpdate, 
  recommendation 
}: APESTVoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [transcript, setTranscript] = useState<{ speaker: string; text: string; timestamp: Date }[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isConnected) {
      timerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConnected]);

  // Simulate audio level for visual feedback
  useEffect(() => {
    if (isConnected && !isMuted) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isConnected, isMuted]);

  const handleConnect = async (agentId: string) => {
    setCurrentAgent(agentId);
    setIsConnected(true);
    setSessionDuration(0);
    
    // Initialize with welcome message
    const agent = agents.find(a => a.id === agentId);
    setTranscript([{
      speaker: agent?.name || 'Agent',
      text: `Hello! I'm your ${agent?.name}. Based on your APEST profile, I can see your ${agentId} score is ${userProfile[agentId]}%. Let's have a conversation about your calling. What's been on your heart lately?`,
      timestamp: new Date()
    }]);

    // Simulate voice synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Hello! I'm your ${agent?.name}. Let's talk about your ${agentId} calling.`
      );
      speechSynthesis.speak(utterance);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSessionDuration(0);
    
    if (currentAgent) {
      // Update session data
      const updatedSession = {
        agentType: currentAgent,
        completed: sessionDuration > 300, // 5+ minutes
        lastActive: new Date(),
        insights: generateSessionInsights(currentAgent, transcript),
        duration: sessionDuration
      };
      
      onSessionUpdate(currentAgent, updatedSession);
    }
    
    setCurrentAgent(null);
    setTranscript([]);
    
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOff(!isSpeakerOff);
    if (!isSpeakerOff && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const generateSessionInsights = (agentType: string, conversation: Array<{speaker: string; text: string; timestamp: Date}>) => {
    const insights = [
      `Had a ${Math.floor(sessionDuration / 60)} minute voice conversation`,
      `Explored ${agentType} calling in depth`,
      `Identified personal growth areas`,
      `Received personalized guidance`
    ];
    return insights;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentAgentData = currentAgent ? agents.find(a => a.id === currentAgent) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display">APEST Voice Conversations</h3>
            <p className="text-muted-foreground">
              Choose an agent for a natural voice conversation about your calling
            </p>
          </div>
          {isConnected && (
            <div className="flex items-center gap-3">
              <Badge variant="default" className="animate-pulse">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <span className="text-sm font-mono">{formatTime(sessionDuration)}</span>
            </div>
          )}
        </div>

        {isConnected && currentAgentData && (
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className={`p-3 rounded-full ${currentAgentData.color} text-white`}>
              {currentAgentData.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{currentAgentData.name}</h4>
              <p className="text-sm text-muted-foreground">{currentAgentData.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Audio Level Visualization */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-primary rounded-full transition-all duration-100 ${
                      audioLevel > (i * 20) ? 'h-6' : 'h-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {!isConnected ? (
        // Agent Selection
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const session = sessions[agent.id];
            const isRecommended = recommendation?.recommendedAgent === agent.id;
            
            return (
              <Card 
                key={agent.id} 
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isRecommended ? 'ring-2 ring-primary' : ''
                }`}
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
                
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    Your {agent.id} score: <strong>{userProfile[agent.id]}%</strong>
                  </div>
                  
                  {session?.completed ? (
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Completed</Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(session.duration / 60)}m conversation
                      </span>
                    </div>
                  ) : session?.lastActive ? (
                    <Badge variant="outline">Continue Conversation</Badge>
                  ) : null}
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleConnect(agent.id)}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Start Voice Chat
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        // Active Conversation Interface
        <div className="space-y-6">
          {/* Voice Controls */}
          <Card className="p-6">
            <div className="flex items-center justify-center gap-8">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                onClick={toggleMute}
                className="w-16 h-16 rounded-full"
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                onClick={handleDisconnect}
                className="w-20 h-20 rounded-full"
              >
                <PhoneOff className="w-8 h-8" />
              </Button>
              
              <Button
                variant={isSpeakerOff ? "destructive" : "outline"}
                size="lg"
                onClick={toggleSpeaker}
                className="w-16 h-16 rounded-full"
              >
                {isSpeakerOff ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isMuted ? "You are muted" : "Speak naturally - the agent is listening"}
              </p>
              {isTranscribing && (
                <Badge variant="secondary" className="mt-2">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" />
                  Transcribing...
                </Badge>
              )}
            </div>
          </Card>

          {/* Live Transcript */}
          {transcript.length > 0 && (
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Live Transcript
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {transcript.map((entry, index) => (
                  <div key={index} className="flex gap-3">
                    <Badge variant="outline" className="text-xs">
                      {entry.speaker}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{entry.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Session Stats */}
          <Card className="p-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{formatTime(sessionDuration)}</p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{transcript.filter(t => t.speaker === 'You').length}</p>
                <p className="text-sm text-muted-foreground">Your Turns</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(audioLevel)}%
                </p>
                <p className="text-sm text-muted-foreground">Audio Level</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {currentAgentData ? userProfile[currentAgentData.id] : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Your Score</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tips */}
      <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Voice Conversation Tips</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Speak naturally and take your time</li>
          <li>• The agent will respond based on your APEST profile</li>
          <li>• Ask questions about your specific calling and gifting</li>
          <li>• Sessions are automatically saved and can be resumed</li>
        </ul>
      </Card>
    </div>
  );
}
