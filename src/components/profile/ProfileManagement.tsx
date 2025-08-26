'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react'
import Image from 'next/image'

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  website: string
  role: string
  organization: string
  avatar?: string
  interests: string[]
  communications: {
    newsletter: boolean
    updates: boolean
    events: boolean
    marketing: boolean
  }
}

interface ProfileManagementProps {
  initialData: ProfileData
  onSave: (data: ProfileData) => void
  onAvatarUpload: (file: File) => void
}

const INTEREST_OPTIONS = [
  'Missional Church',
  'Leadership Development',
  'Movement Building',
  'Discipleship',
  'Fresh Expressions',
  'APEST/5Q',
  'Theology',
  'Culture & Context',
  'Church Planting',
  'Innovation'
]

export function ProfileManagement({ initialData, onSave, onAvatarUpload }: ProfileManagementProps) {
  const [data, setData] = useState<ProfileData>(initialData)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string | string[] | boolean | ProfileData['communications']) => {
    setData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleInterestToggle = (interest: string) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest]
    
    handleInputChange('interests', newInterests)
  }

  const handleCommunicationToggle = (type: keyof ProfileData['communications']) => {
    const newComms = { ...data.communications, [type]: !data.communications[type] }
    handleInputChange('communications', newComms)
  }

  const handleSave = () => {
    onSave(data)
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleCancel = () => {
    setData(initialData)
    setIsEditing(false)
    setHasChanges(false)
  }

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {data.avatar ? (
              <Image
                src={data.avatar}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <User className="h-12 w-12" />
            )}
          </div>
          
          {isEditing && (
            <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/80">
              <Edit className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onAvatarUpload(file)
                }}
              />
            </label>
          )}
        </div>
        
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">{data.name}</h3>
          <p className="-foreground">{data.role}</p>
          <p className="text-sm">{data.organization}</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Optional"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.phone || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          {isEditing ? (
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="City, Country"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.location || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Role</label>
          {isEditing ? (
            <select
              value={data.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Pastor/Minister">Pastor/Minister</option>
              <option value="Church Planter">Church Planter</option>
              <option value="Missionary">Missionary</option>
              <option value="Ministry Leader">Ministry Leader</option>
              <option value="Student">Student</option>
              <option value="Business Leader">Business Leader</option>
              <option value="Nonprofit Worker">Nonprofit Worker</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.role}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
          {isEditing ? (
            <input
              type="text"
              value={data.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Church, organization, or company"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">{data.organization || 'Not provided'}</p>
          )}
        </div>
      </div>

      {/* Bio and Website */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          {isEditing ? (
            <textarea
              value={data.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell us about yourself and your ministry context..."
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg min-h-[100px]">{data.bio || 'No bio provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Website</label>
          {isEditing ? (
            <input
              type="url"
              value={data.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://your-website.com"
            />
          ) : (
            <p className="px-3 py-2 bg-muted rounded-lg">
              {data.website ? (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  {data.website}
                </a>
              ) : (
                'Not provided'
              )}
            </p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Interests</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTEREST_OPTIONS.map((interest) => (
            <label key={interest} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                disabled={!isEditing}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">{interest}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          Email Communications
        </h3>
        <p className="-foreground mb-6">
          Choose what you'd like to receive in your inbox
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start justify-between p-4 border border-border rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">Newsletter</h4>
            <p className="text-sm">
              Weekly digest of new articles, resources, and insights
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={data.communications.newsletter}
              onChange={() => handleCommunicationToggle('newsletter')}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-start justify-between p-4 border border-border rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">Product Updates</h4>
            <p className="text-sm">
              New book releases, course launches, and major announcements
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={data.communications.updates}
              onChange={() => handleCommunicationToggle('updates')}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-start justify-between p-4 border border-border rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">Event Invitations</h4>
            <p className="text-sm">
              Speaking engagements, workshops, and online events
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={data.communications.events}
              onChange={() => handleCommunicationToggle('events')}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-start justify-between p-4 border border-border rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">Marketing Communications</h4>
            <p className="text-sm">
              Special offers, promotions, and partner recommendations
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={data.communications.marketing}
              onChange={() => handleCommunicationToggle('marketing')}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm">
          <strong>Note:</strong> You'll always receive important account-related emails regardless of these settings, including billing notifications and security alerts.
        </p>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="-foreground mt-1">Manage your account information and preferences</p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn-outline flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground'
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
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'notifications' && renderNotificationsTab()}

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            You have unsaved changes. Don't forget to save!
          </p>
        </div>
      )}
    </div>
  )
}
