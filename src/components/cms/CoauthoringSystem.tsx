'use client'

import { useState } from 'react'
import { 
  Users, UserPlus, MessageCircle, Edit3, Eye, Clock, 
  CheckCircle, AlertCircle, Send, Reply, MoreVertical,
  FileText, Calendar, Bell, Settings, Filter, Search,
  ChevronDown, ChevronRight, User, Crown, Shield,
  ThumbsUp, ThumbsDown, Flag, Archive, Trash2, Pin, X
} from 'lucide-react'

interface Author {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'lead' | 'contributor' | 'reviewer' | 'editor'
  permissions: {
    canEdit: boolean
    canComment: boolean
    canApprove: boolean
    canPublish: boolean
    canInvite: boolean
  }
  lastActive: Date
  contributionStats: {
    articlesWritten: number
    commentsAdded: number
    changesApproved: number
  }
}

interface Comment {
  id: string
  authorId: string
  content: string
  timestamp: Date
  type: 'comment' | 'suggestion' | 'approval' | 'change_request'
  status: 'open' | 'resolved' | 'dismissed'
  targetElement?: string
  parentId?: string
  reactions: {
    likes: number
    dislikes: number
    userReaction?: 'like' | 'dislike'
  }
  replies: Comment[]
}

interface Change {
  id: string
  authorId: string
  timestamp: Date
  type: 'text_edit' | 'structure_change' | 'image_update' | 'metadata_change'
  description: string
  oldValue?: string
  newValue?: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
}

interface CollaborativeDocument {
  id: string
  title: string
  type: 'article' | 'series' | 'page'
  status: 'draft' | 'in_review' | 'approved' | 'published'
  authors: Author[]
  comments: Comment[]
  changes: Change[]
  currentVersion: number
  lastModified: Date
  lastModifiedBy: string
  wordCount: number
  approvalStatus: {
    required: number
    approved: number
    approvers: string[]
  }
}

interface CoauthoringSystemProps {
  documentId?: string
  onInviteAuthor?: (email: string, role: Author['role']) => void
  onUpdatePermissions?: (authorId: string, permissions: Author['permissions']) => void
  onApproveChange?: (changeId: string) => void
  onRejectChange?: (changeId: string) => void
}

const RoleBadge = ({ role }: { role: Author['role'] }) => {
  const styles = {
    lead: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    contributor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    reviewer: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    editor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
  }

  const icons = {
    lead: <Crown className="h-3 w-3" />,
    contributor: <Edit3 className="h-3 w-3" />,
    reviewer: <Eye className="h-3 w-3" />,
    editor: <Settings className="h-3 w-3" />
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}>
      {icons[role]}
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  )
}

const CommentTypeIcon = ({ type }: { type: Comment['type'] }) => {
  const icons = {
    comment: <MessageCircle className="h-4 w-4 text-blue-600" />,
    suggestion: <Edit3 className="h-4 w-4 text-green-600" />,
    approval: <CheckCircle className="h-4 w-4 text-green-600" />,
    change_request: <AlertCircle className="h-4 w-4 text-orange-600" />
  }

  return icons[type]
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    in_review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    published: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    dismissed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.draft}`}>
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
    </span>
  )
}

export function CoauthoringSystem({
  documentId = '1',
  onInviteAuthor,
  onUpdatePermissions,
  onApproveChange,
  onRejectChange
}: CoauthoringSystemProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'authors' | 'comments' | 'changes' | 'activity'>('overview')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<Author['role']>('contributor')
  const [commentFilter, setCommentFilter] = useState<'all' | Comment['status']>('all')
  const [changeFilter, setChangeFilter] = useState<'all' | Change['status']>('all')
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)

  // Mock data - replace with actual API calls
  const [document, setDocument] = useState<CollaborativeDocument>({
    id: documentId,
    title: 'Missional Leadership in the Digital Age',
    type: 'article',
    status: 'in_review',
    authors: [
      {
        id: '1',
        name: 'Alan Hirsch',
        email: 'alan@alanhirsch.com',
        avatar: '/images/authors/alan-hirsch.jpg',
        role: 'lead',
        permissions: {
          canEdit: true,
          canComment: true,
          canApprove: true,
          canPublish: true,
          canInvite: true
        },
        lastActive: new Date('2024-01-18T10:30:00'),
        contributionStats: {
          articlesWritten: 45,
          commentsAdded: 128,
          changesApproved: 89
        }
      },
      {
        id: '2',
        name: 'Dave Ferguson',
        email: 'dave@communityalliance.org',
        role: 'contributor',
        permissions: {
          canEdit: true,
          canComment: true,
          canApprove: false,
          canPublish: false,
          canInvite: false
        },
        lastActive: new Date('2024-01-18T14:20:00'),
        contributionStats: {
          articlesWritten: 12,
          commentsAdded: 34,
          changesApproved: 0
        }
      },
      {
        id: '3',
        name: 'Neil Cole',
        email: 'neil@cmaresources.org',
        role: 'reviewer',
        permissions: {
          canEdit: false,
          canComment: true,
          canApprove: true,
          canPublish: false,
          canInvite: false
        },
        lastActive: new Date('2024-01-17T16:45:00'),
        contributionStats: {
          articlesWritten: 8,
          commentsAdded: 67,
          changesApproved: 23
        }
      }
    ],
    comments: [
      {
        id: '1',
        authorId: '2',
        content: 'I think this section needs more practical examples. The theoretical framework is solid, but readers will benefit from concrete applications.',
        timestamp: new Date('2024-01-18T10:15:00'),
        type: 'suggestion',
        status: 'open',
        targetElement: 'paragraph-3',
        reactions: {
          likes: 2,
          dislikes: 0,
          userReaction: 'like'
        },
        replies: [
          {
            id: '1-1',
            authorId: '1',
            content: 'Great point, Dave. I\'ll add some case studies from recent church plants.',
            timestamp: new Date('2024-01-18T11:30:00'),
            type: 'comment',
            status: 'open',
            reactions: {
              likes: 1,
              dislikes: 0
            },
            replies: []
          }
        ]
      },
      {
        id: '2',
        authorId: '3',
        content: 'This article is ready for publication from my perspective. The theological foundation is sound and the practical applications are valuable.',
        timestamp: new Date('2024-01-18T14:45:00'),
        type: 'approval',
        status: 'open',
        reactions: {
          likes: 3,
          dislikes: 0
        },
        replies: []
      }
    ],
    changes: [
      {
        id: '1',
        authorId: '2',
        timestamp: new Date('2024-01-18T09:30:00'),
        type: 'text_edit',
        description: 'Updated introduction paragraph for better clarity',
        oldValue: 'In today\'s rapidly changing world...',
        newValue: 'As our world undergoes unprecedented digital transformation...',
        status: 'approved',
        approvedBy: '1'
      },
      {
        id: '2',
        authorId: '2',
        timestamp: new Date('2024-01-18T10:00:00'),
        type: 'structure_change',
        description: 'Added new subsection on digital discipleship',
        status: 'pending'
      },
      {
        id: '3',
        authorId: '1',
        timestamp: new Date('2024-01-18T11:45:00'),
        type: 'metadata_change',
        description: 'Updated SEO keywords and description',
        status: 'approved',
        approvedBy: '1'
      }
    ],
    currentVersion: 3,
    lastModified: new Date('2024-01-18T14:45:00'),
    lastModifiedBy: 'Neil Cole',
    wordCount: 2450,
    approvalStatus: {
      required: 2,
      approved: 1,
      approvers: ['3']
    }
  })

  const handleInviteAuthor = () => {
    if (!inviteEmail) return
    
    onInviteAuthor?.(inviteEmail, inviteRole)
    setInviteEmail('')
    setInviteRole('contributor')
    setShowInviteModal(false)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      authorId: '1', // Current user
      content: newComment,
      timestamp: new Date(),
      type: 'comment',
      status: 'open',
      reactions: {
        likes: 0,
        dislikes: 0
      },
      replies: [],
      parentId: replyTo || undefined
    }
    
    setDocument(prev => ({
      ...prev,
      comments: replyTo 
        ? prev.comments.map(c => 
            c.id === replyTo 
              ? { ...c, replies: [...c.replies, comment] }
              : c
          )
        : [...prev.comments, comment]
    }))
    
    setNewComment('')
    setReplyTo(null)
  }

  const handleReactToComment = (commentId: string, reaction: 'like' | 'dislike') => {
    setDocument(prev => ({
      ...prev,
      comments: prev.comments.map(comment => 
        comment.id === commentId
          ? {
              ...comment,
              reactions: {
                ...comment.reactions,
                [reaction === 'like' ? 'likes' : 'dislikes']: 
                  comment.reactions.userReaction === reaction 
                    ? comment.reactions[reaction === 'like' ? 'likes' : 'dislikes'] - 1
                    : comment.reactions[reaction === 'like' ? 'likes' : 'dislikes'] + 1,
                [reaction === 'like' ? 'dislikes' : 'likes']:
                  comment.reactions.userReaction === (reaction === 'like' ? 'dislike' : 'like')
                    ? comment.reactions[reaction === 'like' ? 'dislikes' : 'likes'] - 1
                    : comment.reactions[reaction === 'like' ? 'dislikes' : 'likes'],
                userReaction: comment.reactions.userReaction === reaction ? undefined : reaction
              }
            }
          : comment
      )
    }))
  }

  const filteredComments = document.comments.filter(comment => 
    commentFilter === 'all' || comment.status === commentFilter
  )

  const filteredChanges = document.changes.filter(change =>
    changeFilter === 'all' || change.status === changeFilter
  )

  const getAuthorById = (id: string) => document.authors.find(a => a.id === id)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return 'just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">{document.title}</h1>
              <StatusBadge status={document.status} />
            </div>
            
            <div className="flex items-center gap-4 text-sm mb-4">
              <span>Version {document.currentVersion}</span>
              <span>{document.wordCount.toLocaleString()} words</span>
              <span>Last modified {formatTimeAgo(document.lastModified)} by {document.lastModifiedBy}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Approval Progress:</span>
                <div className="flex items-center gap-1">
                  <div className="text-sm">
                    {document.approvalStatus.approved} of {document.approvalStatus.required} approved
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ 
                        width: `${(document.approvalStatus.approved / document.approvalStatus.required) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="btn-outline flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Invite Author
            </button>
            
            <button className="btn-primary flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'authors', label: 'Authors', icon: Users },
            { id: 'comments', label: 'Comments', icon: MessageCircle },
            { id: 'changes', label: 'Changes', icon: Edit3 },
            { id: 'activity', label: 'Activity', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'comments' && document.comments.filter(c => c.status === 'open').length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 ml-1">
                    {document.comments.filter(c => c.status === 'open').length}
                  </span>
                )}
                {tab.id === 'changes' && document.changes.filter(c => c.status === 'pending').length > 0 && (
                  <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                    {document.changes.filter(c => c.status === 'pending').length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[...document.comments, ...document.changes]
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .slice(0, 5)
                    .map((item) => {
                      const author = getAuthorById(item.authorId)
                      const isComment = 'content' in item
                      
                      return (
                        <div key={item.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            {author?.avatar ? (
                              <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{author?.name}</span>
                              <span className="text-xs">
                                {formatTimeAgo(item.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm">
                              {isComment 
                                ? `Added a ${(item as Comment).type}: ${(item as Comment).content.substring(0, 100)}...`
                                : `Made a ${(item as Change).type.replace('_', ' ')}: ${(item as Change).description}`
                              }
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              
              {/* Pending Actions */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  {document.changes.filter(c => c.status === 'pending').map(change => {
                    const author = getAuthorById(change.authorId)
                    return (
                      <div key={change.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium">{change.description}</p>
                            <p className="text-xs">by {author?.name} · {formatTimeAgo(change.timestamp)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onApproveChange?.(change.id)}
                            className="btn-sm bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onRejectChange?.(change.id)}
                            className="btn-sm btn-outline border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  
                  {document.changes.filter(c => c.status === 'pending').length === 0 && (
                    <div className="text-center py-4">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p>All changes have been reviewed</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Authors Quick View */}
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Authors</h3>
                  <span className="text-sm">{document.authors.length} collaborators</span>
                </div>
                <div className="space-y-3">
                  {document.authors.map(author => (
                    <div key={author.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        {author.avatar ? (
                          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{author.name}</p>
                        <div className="flex items-center gap-2">
                          <RoleBadge role={author.role} />
                          <span className="text-xs">
                            {formatTimeAgo(author.lastActive)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Document Stats */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Document Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Comments</span>
                    <span className="font-medium">{document.comments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Changes Made</span>
                    <span className="font-medium">{document.changes.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Version</span>
                    <span className="font-medium">{document.currentVersion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Word Count</span>
                    <span className="font-medium">{document.wordCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'authors' && (
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground text-lg">Document Authors</h3>
              <button
                onClick={() => setShowInviteModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Invite Author
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {document.authors.map(author => (
                <div key={author.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        {author.avatar ? (
                          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{author.name}</p>
                        <p className="text-sm">{author.email}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-muted rounded">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <RoleBadge role={author.role} />
                    <p className="text-xs">
                      Last active {formatTimeAgo(author.lastActive)}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="-foreground">Articles</span>
                      <span>{author.contributionStats.articlesWritten}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="-foreground">Comments</span>
                      <span>{author.contributionStats.commentsAdded}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="-foreground">Approvals</span>
                      <span>{author.contributionStats.changesApproved}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${author.permissions.canEdit ? 'text-green-600' : '-foreground'}`}>
                        <Edit3 className="h-3 w-3" />
                        Edit
                      </div>
                      <div className={`flex items-center gap-1 ${author.permissions.canApprove ? 'text-green-600' : '-foreground'}`}>
                        <CheckCircle className="h-3 w-3" />
                        Approve
                      </div>
                      <div className={`flex items-center gap-1 ${author.permissions.canComment ? 'text-green-600' : '-foreground'}`}>
                        <MessageCircle className="h-3 w-3" />
                        Comment
                      </div>
                      <div className={`flex items-center gap-1 ${author.permissions.canPublish ? 'text-green-600' : '-foreground'}`}>
                        <Send className="h-3 w-3" />
                        Publish
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground text-lg">Comments & Feedback</h3>
                <select
                  value={commentFilter}
                  onChange={(e) => setCommentFilter(e.target.value as typeof commentFilter)}
                  className="px-3 py-1 border border-border rounded-lg text-sm"
                >
                  <option value="all">All Comments</option>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              </div>
              
              <div className="text-sm">
                {document.comments.filter(c => c.status === 'open').length} open comments
              </div>
            </div>
            
            {/* Add Comment */}
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyTo ? "Write a reply..." : "Add a comment or suggestion..."}
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      {replyTo && (
                        <button
                          onClick={() => setReplyTo(null)}
                          className="text-xs hover:text-foreground"
                        >
                          Cancel reply
                        </button>
                      )}
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="btn-primary btn-sm"
                    >
                      {replyTo ? 'Reply' : 'Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.map(comment => {
                const author = getAuthorById(comment.authorId)
                
                return (
                  <div key={comment.id} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        {author?.avatar ? (
                          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{author?.name}</span>
                          <CommentTypeIcon type={comment.type} />
                          <StatusBadge status={comment.status} />
                          <span className="text-xs">
                            {formatTimeAgo(comment.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-foreground mb-3">{comment.content}</p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleReactToComment(comment.id, 'like')}
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                comment.reactions.userReaction === 'like' 
                                  ? 'text-green-600' 
                                  : '-foreground hover:text-green-600'
                              }`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              {comment.reactions.likes}
                            </button>
                            
                            <button
                              onClick={() => handleReactToComment(comment.id, 'dislike')}
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                comment.reactions.userReaction === 'dislike' 
                                  ? 'text-red-600' 
                                  : '-foreground hover:text-red-600'
                              }`}
                            >
                              <ThumbsDown className="h-3 w-3" />
                              {comment.reactions.dislikes}
                            </button>
                          </div>
                          
                          <button
                            onClick={() => setReplyTo(comment.id)}
                            className="text-xs hover:text-foreground flex items-center gap-1"
                          >
                            <Reply className="h-3 w-3" />
                            Reply
                          </button>
                          
                          {comment.status === 'open' && (
                            <button className="text-xs hover:text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Resolve
                            </button>
                          )}
                        </div>
                        
                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-muted space-y-3">
                            {comment.replies.map(reply => {
                              const replyAuthor = getAuthorById(reply.authorId)
                              
                              return (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                    {replyAuthor?.avatar ? (
                                      <img src={replyAuthor.avatar} alt={replyAuthor.name} className="w-6 h-6 rounded-full" />
                                    ) : (
                                      <User className="h-3 w-3" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-xs">{replyAuthor?.name}</span>
                                      <span className="text-xs">
                                        {formatTimeAgo(reply.timestamp)}
                                      </span>
                                    </div>
                                    
                                    <p className="text-xs text-foreground">{reply.content}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {filteredComments.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                  <p className="-foreground">No comments yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'changes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground text-lg">Document Changes</h3>
                <select
                  value={changeFilter}
                  onChange={(e) => setChangeFilter(e.target.value as typeof changeFilter)}
                  className="px-3 py-1 border border-border rounded-lg text-sm"
                >
                  <option value="all">All Changes</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="text-sm">
                {document.changes.filter(c => c.status === 'pending').length} pending approval
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredChanges.map(change => {
                const author = getAuthorById(change.authorId)
                const approver = change.approvedBy ? getAuthorById(change.approvedBy) : null
                
                return (
                  <div key={change.id} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{author?.name}</span>
                          <StatusBadge status={change.status} />
                          <span className="text-xs">
                            {formatTimeAgo(change.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-foreground mb-2">{change.description}</p>
                        
                        {change.oldValue && change.newValue && (
                          <div className="bg-muted/30 rounded-lg p-3 mb-3">
                            <div className="text-xs mb-2">Changes:</div>
                            <div className="space-y-2">
                              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-2 rounded text-xs">
                                - {change.oldValue}
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-2 rounded text-xs">
                                + {change.newValue}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {change.status === 'approved' && approver && (
                          <p className="text-xs">
                            Approved by {approver.name}
                          </p>
                        )}
                      </div>
                      
                      {change.status === 'pending' && (
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => onApproveChange?.(change.id)}
                            className="btn-sm bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onRejectChange?.(change.id)}
                            className="btn-sm btn-outline border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              
              {filteredChanges.length === 0 && (
                <div className="text-center py-12">
                  <Edit3 className="h-12 w-12 mx-auto mb-4" />
                  <p className="-foreground">No changes found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground text-lg mb-6">Activity Timeline</h3>
            
            <div className="space-y-6">
              {[...document.comments, ...document.changes]
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((item) => {
                  const author = getAuthorById(item.authorId)
                  const isComment = 'content' in item
                  
                  return (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        {author?.avatar ? (
                          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{author?.name}</span>
                          <span className="text-xs">
                            {item.timestamp.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3">
                          {isComment ? (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CommentTypeIcon type={(item as Comment).type} />
                                <span className="text-xs font-medium capitalize">
                                  {(item as Comment).type.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-sm">{(item as Comment).content}</p>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Edit3 className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-medium capitalize">
                                  {(item as Change).type.replace('_', ' ')}
                                </span>
                                <StatusBadge status={(item as Change).status} />
                              </div>
                              <p className="text-sm">{(item as Change).description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      {/* Invite Author Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">Invite Author</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Author['role'])}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="contributor">Contributor - Can edit and comment</option>
                  <option value="reviewer">Reviewer - Can comment and approve</option>
                  <option value="editor">Editor - Full editing permissions</option>
                  <option value="lead">Lead Author - Full control</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteAuthor}
                className="btn-primary flex-1"
                disabled={!inviteEmail}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
