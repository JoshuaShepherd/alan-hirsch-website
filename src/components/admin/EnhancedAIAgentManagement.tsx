'use client'

import { useState, useEffect } from 'react'
import { 
  Bot, MessageCircle, TrendingUp, Users, Settings, 
  Brain, Target, Activity, Clock, Star, AlertCircle,
  Play, Pause, RefreshCw, Download, Upload, Edit3,
  BarChart3, FileText, CheckCircle, XCircle, Plus,
  Trash2, Eye, Save, X, Mic, MicOff
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface AgentConfiguration {
  id: string
  name: string
  description: string
  status: 'active' | 'training' | 'offline' | 'maintenance'
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo'
  temperature: number
  maxTokens: number
  systemPrompt: string
  knowledgeBase: {
    documents: number
    lastUpdated: string
    sources: string[]
  }
  voiceSettings: {
    enabled: boolean
    voice: string
    speed: number
    pitch: number
  }
  personalityTraits: {
    empathy: number
    expertise: number
    clarity: number
    patience: number
    enthusiasm: number
  }
  conversationSettings: {
    maxConversationLength: number
    contextWindow: number
    fallbackEnabled: boolean
    handoffToHuman: boolean
  }
  metrics: {
    conversationsToday: number
    totalConversations: number
    averageSatisfaction: number
    averageResponseTime: number
    uptime: number
  }
}

interface ConversationLog {
  id: string
  timestamp: string
  userId: string
  userEmail?: string
  agentId: string
  topic: string
  duration: number
  messageCount: number
  satisfaction?: number
  resolved: boolean
  transcript?: string
  feedback?: string
}

const DEFAULT_AGENTS: AgentConfiguration[] = [
  {
    id: 'apest-agent',
    name: 'APEST Assessment Agent',
    description: 'Specialized in helping users understand their fivefold ministry gifts',
    status: 'active',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: `You are an expert APEST (Apostolic, Prophetic, Evangelistic, Shepherding, Teaching) ministry coach based on Alan Hirsch's work. Your role is to help users understand their fivefold ministry gifts through thoughtful conversation and assessment. Be encouraging, insightful, and practical in your responses.`,
    knowledgeBase: {
      documents: 47,
      lastUpdated: '2024-01-15',
      sources: ['5Q Book', 'Permanent Revolution', 'APEST Assessment Guide']
    },
    voiceSettings: {
      enabled: true,
      voice: 'alloy',
      speed: 1.0,
      pitch: 1.0
    },
    personalityTraits: {
      empathy: 85,
      expertise: 90,
      clarity: 88,
      patience: 92,
      enthusiasm: 78
    },
    conversationSettings: {
      maxConversationLength: 30,
      contextWindow: 10,
      fallbackEnabled: true,
      handoffToHuman: true
    },
    metrics: {
      conversationsToday: 23,
      totalConversations: 1847,
      averageSatisfaction: 4.6,
      averageResponseTime: 1.2,
      uptime: 99.8
    }
  },
  {
    id: 'missional-agent',
    name: 'Missional Church Agent',
    description: 'Guides church leaders in missional transformation and movement thinking',
    status: 'active',
    model: 'gpt-4',
    temperature: 0.8,
    maxTokens: 2048,
    systemPrompt: `You are a missional church consultant based on Alan Hirsch's principles. Help church leaders understand and implement missional DNA in their communities. Focus on practical transformation strategies and movement multiplication.`,
    knowledgeBase: {
      documents: 63,
      lastUpdated: '2024-01-10',
      sources: ['The Forgotten Ways', 'Movement Leaders Content', 'Forge Training Materials']
    },
    voiceSettings: {
      enabled: true,
      voice: 'echo',
      speed: 0.9,
      pitch: 1.1
    },
    personalityTraits: {
      empathy: 80,
      expertise: 95,
      clarity: 85,
      patience: 88,
      enthusiasm: 92
    },
    conversationSettings: {
      maxConversationLength: 45,
      contextWindow: 15,
      fallbackEnabled: true,
      handoffToHuman: true
    },
    metrics: {
      conversationsToday: 31,
      totalConversations: 2156,
      averageSatisfaction: 4.7,
      averageResponseTime: 1.4,
      uptime: 99.5
    }
  }
]

export function EnhancedAIAgentManagement() {
  const [agents, setAgents] = useState<AgentConfiguration[]>(DEFAULT_AGENTS)
  const [selectedAgent, setSelectedAgent] = useState<AgentConfiguration | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [conversationLogs, setConversationLogs] = useState<ConversationLog[]>([])
  const [loading, setLoading] = useState(false)

  // Simulated conversation logs
  useEffect(() => {
    const mockLogs: ConversationLog[] = [
      {
        id: '1',
        timestamp: '2024-01-20T10:30:00Z',
        userId: 'user-123',
        userEmail: 'john@church.com',
        agentId: 'apest-agent',
        topic: 'Understanding Apostolic Gifts',
        duration: 12,
        messageCount: 8,
        satisfaction: 5,
        resolved: true,
        feedback: 'Very helpful in understanding my calling'
      },
      {
        id: '2',
        timestamp: '2024-01-20T11:15:00Z',
        userId: 'user-456',
        userEmail: 'sarah@ministry.org',
        agentId: 'missional-agent',
        topic: 'Church Transformation Strategy',
        duration: 25,
        messageCount: 15,
        satisfaction: 4,
        resolved: true,
        feedback: 'Good insights, would like more specific examples'
      }
    ]
    setConversationLogs(mockLogs)
  }, [])

  const handleSaveAgent = async (updatedAgent: AgentConfiguration) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setAgents(prev => prev.map(agent => 
        agent.id === updatedAgent.id ? updatedAgent : agent
      ))
      setSelectedAgent(updatedAgent)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save agent:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAgent = async (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return

    const newStatus = agent.status === 'active' ? 'offline' : 'active'
    const updatedAgent = { ...agent, status: newStatus as AgentConfiguration['status'] }
    await handleSaveAgent(updatedAgent)
  }

  const handleExportLogs = (agentId: string) => {
    const agentLogs = conversationLogs.filter(log => log.agentId === agentId)
    const csvContent = [
      'Timestamp,User,Topic,Duration,Satisfaction,Resolved',
      ...agentLogs.map(log => 
        `${log.timestamp},${log.userEmail || log.userId},${log.topic},${log.duration},${log.satisfaction || 'N/A'},${log.resolved}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agent-${agentId}-logs.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'training': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      case 'maintenance': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">{agents.filter(a => a.status === 'active').length}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversations Today</p>
                <p className="text-2xl font-bold">
                  {agents.reduce((sum, agent) => sum + agent.metrics.conversationsToday, 0)}
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Satisfaction</p>
                <p className="text-2xl font-bold">
                  {(agents.reduce((sum, agent) => sum + agent.metrics.averageSatisfaction, 0) / agents.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {(agents.reduce((sum, agent) => sum + agent.metrics.averageResponseTime, 0) / agents.length).toFixed(1)}s
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              AI Agents
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Agent
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAgent?.id === agent.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{agent.name}</h3>
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>{agent.metrics.conversationsToday} today</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleAgent(agent.id)
                      }}
                    >
                      {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAgent(agent)
                        setIsEditing(true)
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agent Details */}
        <Card className="lg:col-span-2">
          {selectedAgent ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedAgent.name}</CardTitle>
                    <CardDescription>{selectedAgent.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportLogs(selectedAgent.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Logs
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                  <TabsTrigger value="voice">Voice</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Performance Metrics</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Conversations Today:</span>
                          <span>{selectedAgent.metrics.conversationsToday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Conversations:</span>
                          <span>{selectedAgent.metrics.totalConversations.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Satisfaction Score:</span>
                          <span>{selectedAgent.metrics.averageSatisfaction}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Response Time:</span>
                          <span>{selectedAgent.metrics.averageResponseTime}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span>{selectedAgent.metrics.uptime}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Configuration</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Model:</span>
                          <span>{selectedAgent.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Temperature:</span>
                          <span>{selectedAgent.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Tokens:</span>
                          <span>{selectedAgent.maxTokens}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Voice Enabled:</span>
                          <span>{selectedAgent.voiceSettings.enabled ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Personality Traits</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedAgent.personalityTraits).map(([trait, value]) => (
                        <div key={trait} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{trait}:</span>
                            <span>{value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="conversations" className="space-y-4">
                  <div className="space-y-4">
                    {conversationLogs
                      .filter(log => log.agentId === selectedAgent.id)
                      .map((log) => (
                      <div key={log.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{log.userEmail || log.userId}</span>
                            <Badge variant="outline">{log.topic}</Badge>
                            {log.resolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Duration: </span>
                            {log.duration}min
                          </div>
                          <div>
                            <span className="text-muted-foreground">Messages: </span>
                            {log.messageCount}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Satisfaction: </span>
                            {log.satisfaction ? `${log.satisfaction}/5` : 'N/A'}
                          </div>
                          <div className="flex justify-end">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                        {log.feedback && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <span className="text-muted-foreground">Feedback: </span>
                            {log.feedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="knowledge" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Knowledge Base</h4>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Documents</span>
                        <span className="text-sm text-muted-foreground">{selectedAgent.knowledgeBase.documents} files</span>
                      </div>
                      <div className="space-y-2">
                        {selectedAgent.knowledgeBase.sources.map((source, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <span className="text-sm">{source}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">Active</Badge>
                              <Button size="sm" variant="ghost">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">System Prompt</h5>
                      <Textarea
                        value={selectedAgent.systemPrompt}
                        readOnly
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Voice Settings</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Voice Enabled</span>
                        <Switch checked={selectedAgent.voiceSettings.enabled} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Voice</label>
                        <Input value={selectedAgent.voiceSettings.voice} readOnly />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Speed: {selectedAgent.voiceSettings.speed}</label>
                        <Slider
                          value={[selectedAgent.voiceSettings.speed]}
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Voice Test</h5>
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <Mic className="h-4 w-4 mr-2" />
                          Test Voice
                        </Button>
                        <Button size="sm" variant="outline">
                          <MicOff className="h-4 w-4 mr-2" />
                          Stop
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          ) : (
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select an agent to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Configuration Modal */}
      {isEditing && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Configure {selectedAgent.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Configuration form would go here */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Agent Name</label>
                  <Input value={selectedAgent.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea value={selectedAgent.description} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Model</label>
                    <Input value={selectedAgent.model} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Temperature</label>
                    <Input type="number" value={selectedAgent.temperature} step="0.1" min="0" max="2" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveAgent(selectedAgent)} disabled={loading}>
                  {loading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}