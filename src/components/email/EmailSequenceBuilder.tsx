'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { 
  Workflow, 
  Mail, 
  Clock, 
  Users, 
  Target,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit,
  Copy,
  Settings,
  ArrowRight,
  Calendar,
  Filter,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react'

interface EmailSequenceStep {
  id: string
  type: 'email' | 'delay' | 'condition' | 'action'
  templateId?: string
  templateName?: string
  subject?: string
  delayDays?: number
  delayHours?: number
  condition?: {
    type: 'opened' | 'clicked' | 'tag' | 'field'
    value: string
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than'
  }
  action?: {
    type: 'add_tag' | 'remove_tag' | 'move_list' | 'update_field'
    value: string
  }
  position: { x: number; y: number }
  connections: string[]
}

interface EmailSequence {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'paused' | 'archived'
  trigger: {
    type: 'signup' | 'tag_added' | 'purchase' | 'behavior' | 'date'
    value: string
  }
  steps: EmailSequenceStep[]
  statistics: {
    totalSubscribers: number
    activeSubscribers: number
    completedSequence: number
    averageOpenRate: number
    averageClickRate: number
    conversionRate: number
  }
  createdAt: string
  updatedAt: string
}

const SAMPLE_SEQUENCES: EmailSequence[] = [
  {
    id: '1',
    name: 'Welcome Series',
    description: 'Onboard new subscribers with our core content',
    status: 'active',
    trigger: { type: 'signup', value: 'newsletter' },
    steps: [
      {
        id: 'step1',
        type: 'email',
        templateId: 'welcome-1',
        templateName: 'Welcome & Introduction',
        subject: 'Welcome to the Movement!',
        position: { x: 100, y: 100 },
        connections: ['step2']
      },
      {
        id: 'step2',
        type: 'delay',
        delayDays: 2,
        position: { x: 300, y: 100 },
        connections: ['step3']
      },
      {
        id: 'step3',
        type: 'email',
        templateId: 'welcome-2',
        templateName: 'Your First Resource',
        subject: 'Here\'s your leadership toolkit',
        position: { x: 500, y: 100 },
        connections: ['step4']
      },
      {
        id: 'step4',
        type: 'condition',
        condition: { type: 'opened', value: 'step3', operator: 'equals' },
        position: { x: 700, y: 100 },
        connections: ['step5', 'step6']
      },
      {
        id: 'step5',
        type: 'email',
        templateId: 'engaged-followup',
        templateName: 'Deep Dive Content',
        subject: 'Ready to go deeper?',
        position: { x: 900, y: 50 },
        connections: []
      },
      {
        id: 'step6',
        type: 'email',
        templateId: 'reengage',
        templateName: 'Re-engagement',
        subject: 'Did you miss this?',
        position: { x: 900, y: 150 },
        connections: []
      }
    ],
    statistics: {
      totalSubscribers: 1247,
      activeSubscribers: 1089,
      completedSequence: 892,
      averageOpenRate: 68.5,
      averageClickRate: 12.3,
      conversionRate: 8.7
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Product Launch Sequence',
    description: 'Pre-launch excitement and conversion series',
    status: 'draft',
    trigger: { type: 'tag_added', value: 'launch-interest' },
    steps: [
      {
        id: 'step1',
        type: 'email',
        templateId: 'launch-announcement',
        templateName: 'Coming Soon Announcement',
        subject: 'Something big is coming...',
        position: { x: 100, y: 100 },
        connections: ['step2']
      },
      {
        id: 'step2',
        type: 'delay',
        delayDays: 3,
        position: { x: 300, y: 100 },
        connections: ['step3']
      },
      {
        id: 'step3',
        type: 'email',
        templateId: 'early-access',
        templateName: 'Early Access Offer',
        subject: 'Get early access (limited time)',
        position: { x: 500, y: 100 },
        connections: []
      }
    ],
    statistics: {
      totalSubscribers: 0,
      activeSubscribers: 0,
      completedSequence: 0,
      averageOpenRate: 0,
      averageClickRate: 0,
      conversionRate: 0
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
]

const TRIGGER_TYPES = [
  { value: 'signup', label: 'Newsletter Signup', icon: Users },
  { value: 'tag_added', label: 'Tag Added', icon: Target },
  { value: 'purchase', label: 'Purchase Made', icon: CheckCircle },
  { value: 'behavior', label: 'User Behavior', icon: Activity },
  { value: 'date', label: 'Specific Date', icon: Calendar }
]

const STEP_TYPES = [
  { value: 'email', label: 'Send Email', icon: Mail, color: 'bg-blue-500' },
  { value: 'delay', label: 'Wait/Delay', icon: Clock, color: 'bg-yellow-500' },
  { value: 'condition', label: 'If/Then Logic', icon: Filter, color: 'bg-purple-500' },
  { value: 'action', label: 'Update Contact', icon: Settings, color: 'bg-green-500' }
]

export default function EmailSequenceBuilder() {
  const [sequences, setSequences] = useState<EmailSequence[]>(SAMPLE_SEQUENCES)
  const [activeSequence, setActiveSequence] = useState<EmailSequence | null>(sequences[0])
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual')
  const canvasRef = useRef<HTMLDivElement>(null)

  const createNewSequence = () => {
    const newSequence: EmailSequence = {
      id: Date.now().toString(),
      name: 'New Sequence',
      description: 'Describe your email sequence...',
      status: 'draft',
      trigger: { type: 'signup', value: 'newsletter' },
      steps: [],
      statistics: {
        totalSubscribers: 0,
        activeSubscribers: 0,
        completedSequence: 0,
        averageOpenRate: 0,
        averageClickRate: 0,
        conversionRate: 0
      },
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    setSequences(prev => [...prev, newSequence])
    setActiveSequence(newSequence)
    setIsCreating(true)
  }

  const addStep = (type: EmailSequenceStep['type']) => {
    if (!activeSequence) return

    const newStep: EmailSequenceStep = {
      id: `step-${Date.now()}`,
      type,
      position: { 
        x: activeSequence.steps.length * 200 + 100, 
        y: 100 
      },
      connections: []
    }

    // Set default values based on type
    switch (type) {
      case 'email':
        newStep.templateName = 'New Email'
        newStep.subject = 'Your subject line'
        break
      case 'delay':
        newStep.delayDays = 1
        newStep.delayHours = 0
        break
      case 'condition':
        newStep.condition = { type: 'opened', value: '', operator: 'equals' }
        break
      case 'action':
        newStep.action = { type: 'add_tag', value: '' }
        break
    }

    setActiveSequence(prev => ({
      ...prev!,
      steps: [...prev!.steps, newStep]
    }))
  }

  const updateStep = (stepId: string, updates: Partial<EmailSequenceStep>) => {
    if (!activeSequence) return

    setActiveSequence(prev => ({
      ...prev!,
      steps: prev!.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }))
  }

  const deleteStep = (stepId: string) => {
    if (!activeSequence) return

    setActiveSequence(prev => ({
      ...prev!,
      steps: prev!.steps.filter(step => step.id !== stepId)
    }))
    setSelectedStep(null)
  }

  const duplicateSequence = (sequenceId: string) => {
    const sequence = sequences.find(s => s.id === sequenceId)
    if (!sequence) return

    const duplicate: EmailSequence = {
      ...sequence,
      id: Date.now().toString(),
      name: `${sequence.name} (Copy)`,
      status: 'draft',
      statistics: {
        totalSubscribers: 0,
        activeSubscribers: 0,
        completedSequence: 0,
        averageOpenRate: 0,
        averageClickRate: 0,
        conversionRate: 0
      },
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setSequences(prev => [...prev, duplicate])
  }

  const toggleSequenceStatus = (sequenceId: string) => {
    setSequences(prev => 
      prev.map(seq => 
        seq.id === sequenceId 
          ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
          : seq
      )
    )
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Email Sequences</h2>
            <Button size="sm" onClick={createNewSequence}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {sequences.map((sequence) => (
              <Card
                key={sequence.id}
                className={`cursor-pointer transition-colors ${
                  activeSequence?.id === sequence.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setActiveSequence(sequence)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={sequence.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {sequence.status}
                      </Badge>
                      <h3 className="font-medium text-sm">{sequence.name}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSequenceStatus(sequence.id)
                        }}
                      >
                        {sequence.status === 'active' ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateSequence(sequence.id)
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-1">{sequence.description}</p>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{sequence.steps.length} steps</span>
                    <span>{sequence.statistics.totalSubscribers} subscribers</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Step Tools */}
        {activeSequence && (
          <div className="p-4 flex-1">
            <h3 className="font-medium mb-3">Add Steps</h3>
            <div className="space-y-2">
              {STEP_TYPES.map((stepType) => {
                const Icon = stepType.icon
                return (
                  <Button
                    key={stepType.value}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addStep(stepType.value as EmailSequenceStep['type'])}
                  >
                    <div className={`w-3 h-3 rounded mr-2 ${stepType.color}`} />
                    <Icon className="h-4 w-4 mr-2" />
                    {stepType.label}
                  </Button>
                )
              })}
            </div>

            {/* Sequence Settings */}
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Sequence Settings</h3>
              
              <div>
                <label className="text-sm font-medium">Trigger</label>
                <Select
                  value={activeSequence.trigger.type}
                  onValueChange={(value) => 
                    setActiveSequence(prev => ({
                      ...prev!,
                      trigger: { ...prev!.trigger, type: value as any }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRIGGER_TYPES.map((trigger) => (
                      <SelectItem key={trigger.value} value={trigger.value}>
                        {trigger.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={activeSequence.status === 'active'}
                    onCheckedChange={(checked) => 
                      setActiveSequence(prev => ({
                        ...prev!,
                        status: checked ? 'active' : 'draft'
                      }))
                    }
                  />
                  <span className="text-sm">
                    {activeSequence.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {activeSequence ? (
          <>
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">{activeSequence.name}</h1>
                  <p className="text-gray-600 text-sm">{activeSequence.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'visual' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('visual')}
                  >
                    <Workflow className="h-4 w-4 mr-2" />
                    Visual
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistics
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            {viewMode === 'visual' ? (
              <SequenceCanvas 
                sequence={activeSequence}
                selectedStep={selectedStep}
                onStepSelect={setSelectedStep}
                onStepUpdate={updateStep}
                onStepDelete={deleteStep}
              />
            ) : (
              <SequenceStatistics sequence={activeSequence} />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Workflow className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Create Your First Email Sequence
              </h3>
              <p className="text-gray-600 mb-4">
                Build automated email workflows to nurture your subscribers
              </p>
              <Button onClick={createNewSequence}>
                <Plus className="h-4 w-4 mr-2" />
                Create Sequence
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Visual Canvas Component
function SequenceCanvas({ 
  sequence, 
  selectedStep, 
  onStepSelect, 
  onStepUpdate, 
  onStepDelete 
}: {
  sequence: EmailSequence
  selectedStep: string | null
  onStepSelect: (stepId: string) => void
  onStepUpdate: (stepId: string, updates: Partial<EmailSequenceStep>) => void
  onStepDelete: (stepId: string) => void
}) {
  return (
    <div className="flex-1 bg-gray-50 relative overflow-auto">
      <div className="absolute inset-0 min-w-max min-h-max p-8">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Connection Lines */}
          {sequence.steps.map((step) =>
            step.connections.map((connectionId) => {
              const targetStep = sequence.steps.find(s => s.id === connectionId)
              if (!targetStep) return null
              
              return (
                <line
                  key={`${step.id}-${connectionId}`}
                  x1={step.position.x + 120}
                  y1={step.position.y + 40}
                  x2={targetStep.position.x}
                  y2={targetStep.position.y + 40}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  markerEnd="url(#arrowhead)"
                />
              )
            })
          )}
          
          {/* Arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7" 
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#94a3b8"
              />
            </marker>
          </defs>
        </svg>

        {/* Step Nodes */}
        {sequence.steps.map((step) => (
          <StepNode
            key={step.id}
            step={step}
            isSelected={selectedStep === step.id}
            onSelect={() => onStepSelect(step.id)}
            onUpdate={(updates) => onStepUpdate(step.id, updates)}
            onDelete={() => onStepDelete(step.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Step Node Component
function StepNode({ 
  step, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete 
}: {
  step: EmailSequenceStep
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<EmailSequenceStep>) => void
  onDelete: () => void
}) {
  const stepType = STEP_TYPES.find(t => t.value === step.type)
  const Icon = stepType?.icon || Mail

  return (
    <div
      className={`absolute cursor-pointer ${
        isSelected ? 'z-10' : 'z-0'
      }`}
      style={{ 
        left: step.position.x, 
        top: step.position.y 
      }}
      onClick={onSelect}
    >
      <Card className={`w-60 ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${stepType?.color}`}>
                <Icon className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium capitalize">{step.type}</span>
            </div>
            
            {isSelected && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          <StepContent step={step} onUpdate={onUpdate} />
        </CardContent>
      </Card>
    </div>
  )
}

// Step Content Component
function StepContent({ 
  step, 
  onUpdate 
}: { 
  step: EmailSequenceStep
  onUpdate: (updates: Partial<EmailSequenceStep>) => void 
}) {
  switch (step.type) {
    case 'email':
      return (
        <div className="space-y-2">
          <Input
            value={step.templateName || ''}
            onChange={(e) => onUpdate({ templateName: e.target.value })}
            placeholder="Email name"
            className="text-sm"
          />
          <Input
            value={step.subject || ''}
            onChange={(e) => onUpdate({ subject: e.target.value })}
            placeholder="Subject line"
            className="text-sm"
          />
        </div>
      )

    case 'delay':
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm">Wait</span>
          <Input
            type="number"
            value={step.delayDays || 0}
            onChange={(e) => onUpdate({ delayDays: parseInt(e.target.value) })}
            className="w-16 text-sm"
            min="0"
          />
          <span className="text-sm">days</span>
          <Input
            type="number"
            value={step.delayHours || 0}
            onChange={(e) => onUpdate({ delayHours: parseInt(e.target.value) })}
            className="w-16 text-sm"
            min="0"
            max="23"
          />
          <span className="text-sm">hours</span>
        </div>
      )

    case 'condition':
      return (
        <div className="space-y-2">
          <Select
            value={step.condition?.type}
            onValueChange={(value) => onUpdate({
              condition: { ...step.condition!, type: value as any }
            })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opened">Email Opened</SelectItem>
              <SelectItem value="clicked">Link Clicked</SelectItem>
              <SelectItem value="tag">Has Tag</SelectItem>
              <SelectItem value="field">Field Value</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={step.condition?.value || ''}
            onChange={(e) => onUpdate({
              condition: { ...step.condition!, value: e.target.value }
            })}
            placeholder="Condition value"
            className="text-sm"
          />
        </div>
      )

    case 'action':
      return (
        <div className="space-y-2">
          <Select
            value={step.action?.type}
            onValueChange={(value) => onUpdate({
              action: { ...step.action!, type: value as any }
            })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add_tag">Add Tag</SelectItem>
              <SelectItem value="remove_tag">Remove Tag</SelectItem>
              <SelectItem value="move_list">Move to List</SelectItem>
              <SelectItem value="update_field">Update Field</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={step.action?.value || ''}
            onChange={(e) => onUpdate({
              action: { ...step.action!, value: e.target.value }
            })}
            placeholder="Action value"
            className="text-sm"
          />
        </div>
      )

    default:
      return null
  }
}

// Statistics Component
function SequenceStatistics({ sequence }: { sequence: EmailSequence }) {
  const stats = sequence.statistics

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">{stats.activeSubscribers.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{stats.completedSequence.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Open Rate</span>
                    <span className="font-medium">{stats.averageOpenRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${stats.averageOpenRate}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Click Rate</span>
                    <span className="font-medium">{stats.averageClickRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.averageClickRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sequence Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sequence.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {step.type === 'email' ? step.templateName || 'Email' : step.type}
                      </p>
                      {step.type === 'email' && step.subject && (
                        <p className="text-xs text-gray-500">{step.subject}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
