'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';

interface ConversationSession {
  agentType: string;
  completed: boolean;
  lastActive: Date;
  insights: string[];
  duration: number;
}

interface APESTProgressProps {
  sessions: Record<string, ConversationSession>;
  totalAgents: number;
}

export function APESTProgress({ sessions, totalAgents }: APESTProgressProps) {
  const completedSessions = Object.values(sessions).filter(s => s?.completed).length;
  const inProgressSessions = Object.values(sessions).filter(s => s?.lastActive && !s?.completed).length;
  const totalInsights = Object.values(sessions).reduce((acc: number, s: ConversationSession) => acc + (s?.insights?.length || 0), 0);
  const totalDuration = Object.values(sessions).reduce((acc: number, s: ConversationSession) => acc + (s?.duration || 0), 0);
  
  const progressPercentage = (completedSessions / totalAgents) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display">Your APEST Journey Progress</h3>
        <Badge variant={completedSessions === totalAgents ? "default" : "secondary"}>
          {completedSessions}/{totalAgents} Complete
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{completedSessions}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{inProgressSessions}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{totalInsights}</p>
            <p className="text-xs text-muted-foreground">Insights</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{Math.round(totalDuration / 60)}m</p>
            <p className="text-xs text-muted-foreground">Total Time</p>
          </div>
        </div>

        {/* Journey Milestone */}
        {completedSessions === totalAgents && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">Journey Complete!</h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              You've explored all five aspects of your APEST calling. Consider reviewing your insights and planning your next steps.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
