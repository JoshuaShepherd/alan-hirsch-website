'use client'

import { useState } from 'react'
import { 
  Bot, MessageCircle, TrendingUp, Users, Settings, 
  Brain, Target, Activity, Clock, Star, AlertCircle,
  Play, Pause, RefreshCw, Download, Upload, Edit3,
  BarChart3, FileText, CheckCircle, XCircle
} from 'lucide-react'

interface AgentMetrics {
  id: string
  name: string
  status: 'active' | 'training' | 'offline'
  conversationsToday: number
  satisfactionScore: number
  responseTime: number
  knowledgeBase: {
    documents: number
    lastUpdated: string
  }
  personalityTraits: {
    empathy: number
    expertise: number
    clarity: number
  }
}

interface ConversationLog {
  id: string
  timestamp: string
  userId: string
  userType: 'member' | 'visitor'
  topic: string
  duration: number
  satisfaction: number | null
  agentId: string
}

interface AIAgentManagementProps {
  onTrainAgent?: (agentId: string, content: string) => void
  onUpdatePersonality?: (agentId: string, traits: any) => void
  onExportLogs?: (agentId: string) => void
}

const SAMPLE_AGENTS: AgentMetrics[] = [
  {
    id: 'apest-agent',
    name: 'APEST Assessment Agent',
    status: 'active',
    conversationsToday: 47,
    satisfactionScore: 4.6,
    responseTime: 1.2,
    knowledgeBase: {
      documents: 245,
      lastUpdated: '2 hours ago'
    },
    personalityTraits: {
      empathy: 85,
      expertise: 92,
      clarity: 88
    }
  },
  {
    id: 'book-guide',
    name: 'Book Guide Agent',
    status: 'active',
    conversationsToday: 34,
    satisfactionScore: 4.8,
    responseTime: 0.9,
    knowledgeBase: {
      documents: 189,
      lastUpdated: '1 day ago'
    },
    personalityTraits: {
      empathy: 78,
      expertise: 95,
      clarity: 91
    }
  },
  {
    id: 'missional-coach',
    name: 'Missional Coach Agent',
    status: 'training',
    conversationsToday: 0,
    satisfactionScore: 4.3,
    responseTime: 1.8,
    knowledgeBase: {
      documents: 156,
      lastUpdated: '3 days ago'
    },
    personalityTraits: {
      empathy: 92,
      expertise: 87,
      clarity: 84
    }
  }
]

const SAMPLE_CONVERSATIONS: ConversationLog[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    userId: 'user-123',
    userType: 'member',
    topic: 'APEST Assessment Interpretation',
    duration: 8.5,
    satisfaction: 5,
    agentId: 'apest-agent'
  },
  {
    id: '2',
    timestamp: '3 hours ago',
    userId: 'user-456',
    userType: 'visitor',
    topic: 'Book Recommendation - Leadership',
    duration: 12.3,
    satisfaction: 4,
    agentId: 'book-guide'
  },
  {
    id: '3',
    timestamp: '4 hours ago',
    userId: 'user-789',
    userType: 'member',
    topic: 'Church Planting Guidance',
    duration: 15.7,
    satisfaction: 5,
    agentId: 'apest-agent'
  }
]

export function AIAgentManagement({ 
  onTrainAgent, 
  onUpdatePersonality, 
  onExportLogs 
}: AIAgentManagementProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'conversations' | 'training'>('overview')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const getStatusColor = (status: AgentMetrics['status']) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10'
      case 'training': return 'text-yellow-500 bg-yellow-500/10'
      case 'offline': return 'text-red-500 bg-red-500/10'
    }
  }

  const getStatusIcon = (status: AgentMetrics['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'training': return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'offline': return <XCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">AI Agents</h2>
          <p className="text-muted-foreground mt-1">Manage and monitor your AI agents</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Training Data
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Create Agent
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'agents', label: 'Agent Management', icon: Bot },
            { id: 'conversations', label: 'Conversations', icon: MessageCircle },
            { id: 'training', label: 'Training', icon: Brain }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Conversations</p>
                  <p className="text-2xl font-bold text-foreground">281</p>
                  <p className="text-xs text-green-500">+23% from yesterday</p>
                </div>
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                  <p className="text-2xl font-bold text-foreground">4.7</p>
                  <p className="text-xs text-green-500">+0.2 from last week</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-foreground">1.1s</p>
                  <p className="text-xs text-green-500">-0.3s improvement</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">1 in training</p>
                </div>
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Agent Status Overview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Agent Status</h3>
            <div className="space-y-4">
              {SAMPLE_AGENTS.map(agent => (
                <div key={agent.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getStatusColor(agent.status)}`}>
                      {getStatusIcon(agent.status)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{agent.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{agent.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-foreground">{agent.conversationsToday}</p>
                      <p className="text-muted-foreground">conversations</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">{agent.satisfactionScore}</p>
                      <p className="text-muted-foreground">satisfaction</p>
                    </div>
                    <button 
                      onClick={() => setSelectedAgent(agent.id)}
                      className="btn-outline btn-sm"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SAMPLE_AGENTS.map(agent => (
              <div key={agent.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{agent.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Conversations Today</p>
                      <p className="font-medium text-foreground">{agent.conversationsToday}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Satisfaction</p>
                      <p className="font-medium text-foreground">{agent.satisfactionScore}/5</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium text-foreground">{agent.responseTime}s</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Documents</p>
                      <p className="font-medium text-foreground">{agent.knowledgeBase.documents}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Personality Traits</p>
                    <div className="space-y-2">
                      {Object.entries(agent.personalityTraits).map(([trait, value]) => (
                        <div key={trait} className="flex items-center justify-between">
                          <span className="text-xs capitalize">{trait}</span>
                          <div className="flex-1 mx-2 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-xs">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button className="btn-outline btn-sm flex-1 flex items-center justify-center gap-1">
                      <Settings className="h-3 w-3" />
                      Configure
                    </button>
                    <button 
                      onClick={() => onTrainAgent?.(agent.id, '')}
                      className="btn-primary btn-sm flex-1 flex items-center justify-center gap-1"
                    >
                      <Brain className="h-3 w-3" />
                      Train
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'conversations' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Recent Conversations</h3>
                <button 
                  onClick={() => onExportLogs?.('')}
                  className="btn-outline btn-sm flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Logs
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium">Time</th>
                    <th className="text-left p-4 font-medium">User</th>
                    <th className="text-left p-4 font-medium">Topic</th>
                    <th className="text-left p-4 font-medium">Agent</th>
                    <th className="text-left p-4 font-medium">Duration</th>
                    <th className="text-left p-4 font-medium">Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_CONVERSATIONS.map(conversation => (
                    <tr key={conversation.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4 text-sm">{conversation.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            conversation.userType === 'member' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />
                          <span className="text-sm capitalize">{conversation.userType}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{conversation.topic}</td>
                      <td className="p-4 text-sm">
                        {SAMPLE_AGENTS.find(a => a.id === conversation.agentId)?.name}
                      </td>
                      <td className="p-4 text-sm">{conversation.duration}min</td>
                      <td className="p-4">
                        {conversation.satisfaction ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{conversation.satisfaction}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Knowledge Base Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Alan's Books</p>
                  <p className="text-sm text-muted-foreground">15 books, 247 chapters</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-500">Up to date</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Articles & Blog Posts</p>
                  <p className="text-sm text-muted-foreground">89 articles</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-yellow-500">3 pending</span>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">FAQ & Common Questions</p>
                  <p className="text-sm text-muted-foreground">156 Q&A pairs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-500">Up to date</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex gap-3">
                <button className="btn-outline flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Documents
                </button>
                <button className="btn-primary flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Retrain All Agents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
