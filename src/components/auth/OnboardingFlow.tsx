'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface OnboardingProps {
  onComplete: (preferences: OnboardingData) => void
}

export interface OnboardingData {
  interests: string[]
  role: string
  experience: string
  goals: string[]
  communications: {
    newsletter: boolean
    updates: boolean
    events: boolean
  }
}

const INTERESTS = [
  { id: 'missional-church', label: 'Missional Church', description: 'Church planting and renewal' },
  { id: 'leadership', label: 'Leadership Development', description: 'Growing as a leader' },
  { id: 'movements', label: 'Movement Building', description: 'Creating lasting change' },
  { id: 'discipleship', label: 'Discipleship', description: 'Making disciples' },
  { id: 'fresh-expressions', label: 'Fresh Expressions', description: 'New forms of church' },
  { id: 'apest', label: 'APEST/5Q', description: 'Five-fold ministry gifts' },
  { id: 'theology', label: 'Theology', description: 'Theological formation' },
  { id: 'culture', label: 'Culture & Context', description: 'Engaging contemporary culture' },
]

const ROLES = [
  { id: 'pastor', label: 'Pastor/Minister', description: 'Leading a congregation' },
  { id: 'church-planter', label: 'Church Planter', description: 'Starting new churches' },
  { id: 'missionary', label: 'Missionary', description: 'Cross-cultural ministry' },
  { id: 'leader', label: 'Ministry Leader', description: 'Leading a ministry area' },
  { id: 'student', label: 'Student', description: 'Studying theology/ministry' },
  { id: 'business', label: 'Business Leader', description: 'Marketplace ministry' },
  { id: 'nonprofit', label: 'Nonprofit Worker', description: 'Social impact work' },
  { id: 'other', label: 'Other', description: 'Different role' },
]

const EXPERIENCE_LEVELS = [
  { id: 'new', label: 'New to Ministry', description: 'Just getting started' },
  { id: 'emerging', label: 'Emerging Leader', description: '1-5 years experience' },
  { id: 'experienced', label: 'Experienced', description: '5-15 years experience' },
  { id: 'veteran', label: 'Veteran Leader', description: '15+ years experience' },
]

const GOALS = [
  { id: 'learn', label: 'Learn & Grow', description: 'Expand my knowledge and skills' },
  { id: 'network', label: 'Build Network', description: 'Connect with like-minded leaders' },
  { id: 'resources', label: 'Access Resources', description: 'Find practical tools and materials' },
  { id: 'movement', label: 'Start a Movement', description: 'Catalyze transformation in my context' },
  { id: 'church', label: 'Transform Church', description: 'Renew existing church culture' },
  { id: 'training', label: 'Get Training', description: 'Develop specific skills' },
]

export function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    interests: [],
    role: '',
    experience: '',
    goals: [],
    communications: {
      newsletter: true,
      updates: true,
      events: false
    }
  })

  const handleInterestToggle = (interestId: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleGoalToggle = (goalId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return data.interests.length > 0
      case 2: return data.role !== ''
      case 3: return data.experience !== ''
      case 4: return data.goals.length > 0
      default: return true
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                What interests you most?
              </h2>
              <p className="-foreground">
                Select the topics you'd like to explore (choose as many as you'd like)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    data.interests.includes(interest.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{interest.label}</h3>
                      <p className="text-sm">{interest.description}</p>
                    </div>
                    {data.interests.includes(interest.id) && (
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                What's your role?
              </h2>
              <p className="-foreground">
                This helps us personalize your experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setData(prev => ({ ...prev, role: role.id }))}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    data.role === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{role.label}</h3>
                      <p className="text-sm">{role.description}</p>
                    </div>
                    {data.role === role.id && (
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                What's your experience level?
              </h2>
              <p className="-foreground">
                Help us recommend content at the right level
              </p>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setData(prev => ({ ...prev, experience: level.id }))}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    data.experience === level.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{level.label}</h3>
                      <p className="text-sm">{level.description}</p>
                    </div>
                    {data.experience === level.id && (
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                What are your goals?
              </h2>
              <p className="-foreground">
                Select what you hope to accomplish (choose multiple)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    data.goals.includes(goal.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{goal.label}</h3>
                      <p className="text-sm">{goal.description}</p>
                    </div>
                    {data.goals.includes(goal.id) && (
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                Stay in touch?
              </h2>
              <p className="-foreground">
                Choose how you'd like to hear from us
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                <input
                  type="checkbox"
                  checked={data.communications.newsletter}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, newsletter: e.target.checked }
                  }))}
                  className="mt-1"
                />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Weekly Newsletter</h3>
                  <p className="text-sm">Get the latest articles, resources, and insights delivered to your inbox</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                <input
                  type="checkbox"
                  checked={data.communications.updates}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, updates: e.target.checked }
                  }))}
                  className="mt-1"
                />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Important Updates</h3>
                  <p className="text-sm">New book releases, course launches, and major announcements</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                <input
                  type="checkbox"
                  checked={data.communications.events}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, events: e.target.checked }
                  }))}
                  className="mt-1"
                />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Event Invitations</h3>
                  <p className="text-sm">Speaking engagements, workshops, and online events</p>
                </div>
              </label>
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm">
                You can change these preferences anytime in your account settings
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Step {step} of 5</span>
          <span className="text-sm">{Math.round((step / 5) * 100)}% complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => onComplete(data)}
            className="btn-primary"
          >
            Complete Setup
          </button>
        )}
      </div>
    </div>
  )
}
