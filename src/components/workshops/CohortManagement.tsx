'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  UserMinus,
  Search,
  Filter,
  Settings,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Trophy,
  Target,
  BookOpen,
  PlusCircle,
  Edit,
  MoreHorizontal,
  Calendar,
  Star,
  Award,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface CohortParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'participant' | 'facilitator' | 'host' | 'co-facilitator';
  status: 'registered' | 'confirmed' | 'attended' | 'completed' | 'dropped' | 'pending';
  joinedAt: Date;
  lastActive?: Date;
  progress: {
    materialsCompleted: number;
    totalMaterials: number;
    assignmentsCompleted: number;
    totalAssignments: number;
    attendanceRate: number; // percentage
    engagementScore: number; // 0-100
  };
  preferences: {
    timezone: string;
    notifications: boolean;
    communicationMethod: 'email' | 'sms' | 'both';
  };
  notes?: string;
  tags: string[];
  achievements: Achievement[];
  subgroup?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'participation' | 'completion' | 'engagement' | 'leadership';
}

export interface CohortGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  participants: string[]; // participant IDs
  facilitatorId?: string;
  maxSize?: number;
  type: 'breakout' | 'project' | 'study' | 'mentorship';
  createdAt: Date;
  isActive: boolean;
}

export interface CohortStats {
  totalParticipants: number;
  activeParticipants: number;
  completionRate: number;
  averageEngagement: number;
  attendanceRate: number;
  dropoutRate: number;
}

export interface CohortManagementProps {
  workshopId: string;
  participants: CohortParticipant[];
  groups: CohortGroup[];
  stats: CohortStats;
  onAddParticipant: (participant: Omit<CohortParticipant, 'id' | 'joinedAt' | 'progress' | 'achievements'>) => void;
  onRemoveParticipant: (participantId: string) => void;
  onUpdateParticipant: (participantId: string, updates: Partial<CohortParticipant>) => void;
  onCreateGroup: (group: Omit<CohortGroup, 'id' | 'createdAt'>) => void;
  onUpdateGroup: (groupId: string, updates: Partial<CohortGroup>) => void;
  onDeleteGroup: (groupId: string) => void;
  onAssignToGroup: (participantId: string, groupId: string) => void;
  onSendMessage: (participantIds: string[], message: string) => void;
  userRole: 'participant' | 'facilitator' | 'host';
}

export function CohortManagement({
  workshopId,
  participants,
  groups,
  stats,
  onAddParticipant,
  onRemoveParticipant,
  onUpdateParticipant,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  onAssignToGroup,
  onSendMessage,
  userRole
}: CohortManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  // Filter participants
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    const matchesRole = roleFilter === 'all' || participant.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleSelectParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSelectAll = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map(p => p.id));
    }
  };

  const getStatusColor = (status: CohortParticipant['status']) => {
    const colors = {
      registered: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      attended: 'bg-purple-100 text-purple-800',
      completed: 'bg-emerald-100 text-emerald-800',
      dropped: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: CohortParticipant['role']) => {
    switch (role) {
      case 'host':
        return <Star className="h-4 w-4" />;
      case 'facilitator':
      case 'co-facilitator':
        return <Award className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const canManage = userRole === 'host' || userRole === 'facilitator';

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cohort Management</h2>
          <p className="text-muted-foreground">
            Manage participants, groups, and engagement
          </p>
        </div>
        
        {canManage && (
          <div className="flex items-center space-x-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Participant</DialogTitle>
                </DialogHeader>
                <AddParticipantForm 
                  onSubmit={(participant) => {
                    onAddParticipant(participant);
                    setShowAddDialog(false);
                  }}
                  onCancel={() => setShowAddDialog(false)}
                />
              </DialogContent>
            </Dialog>
            
            <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                </DialogHeader>
                <CreateGroupForm 
                  participants={participants}
                  onSubmit={(group) => {
                    onCreateGroup(group);
                    setShowGroupDialog(false);
                  }}
                  onCancel={() => setShowGroupDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.totalParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.activeParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">{stats.averageEngagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Dropout</p>
                <p className="text-2xl font-bold">{stats.dropoutRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => (b.lastActive?.getTime() || 0) - (a.lastActive?.getTime() || 0))
                    .slice(0, 5)
                    .map(participant => (
                      <div key={participant.id} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {participant.lastActive ? 
                              `Active ${participant.lastActive.toLocaleDateString()}` :
                              'Never active'
                            }
                          </p>
                        </div>
                        <Badge className={getStatusColor(participant.status)}>
                          {participant.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['completed', 'attended', 'confirmed', 'registered', 'pending', 'dropped'].map(status => {
                    const count = participants.filter(p => p.status === status).length;
                    const percentage = participants.length > 0 ? (count / participants.length) * 100 : 0;
                    
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status}</span>
                          <span>{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          {/* Filters and Actions */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="attended">Attended</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="participant">Participant</SelectItem>
                  <SelectItem value="facilitator">Facilitator</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                </SelectContent>
              </Select>
              
              {canManage && selectedParticipants.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {selectedParticipants.length} selected
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMessageDialog(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Participants List */}
          <div className="space-y-4">
            {canManage && (
              <div className="flex items-center space-x-2 p-2 border rounded">
                <input
                  type="checkbox"
                  checked={selectedParticipants.length === filteredParticipants.length && filteredParticipants.length > 0}
                  onChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  Select all ({filteredParticipants.length})
                </span>
              </div>
            )}
            
            {filteredParticipants.map(participant => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                groups={groups}
                isSelected={selectedParticipants.includes(participant.id)}
                onSelect={() => handleSelectParticipant(participant.id)}
                onUpdate={(updates) => onUpdateParticipant(participant.id, updates)}
                onRemove={() => onRemoveParticipant(participant.id)}
                onAssignToGroup={(groupId) => onAssignToGroup(participant.id, groupId)}
                canManage={canManage}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                participants={participants.filter(p => group.participants.includes(p.id))}
                facilitator={participants.find(p => p.id === group.facilitatorId)}
                onUpdate={(updates) => onUpdateGroup(group.id, updates)}
                onDelete={() => onDeleteGroup(group.id)}
                canManage={canManage}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => b.progress.engagementScore - a.progress.engagementScore)
                    .slice(0, 10)
                    .map((participant, index) => (
                      <div key={participant.id} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{participant.name}</p>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={participant.progress.engagementScore} 
                              className="h-2 flex-1" 
                            />
                            <span className="text-xs text-muted-foreground">
                              {participant.progress.engagementScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Material Completion</span>
                      <span>
                        {participants.length > 0 
                          ? Math.round(participants.reduce((acc, p) => acc + (p.progress.materialsCompleted / p.progress.totalMaterials) * 100, 0) / participants.length)
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={participants.length > 0 
                        ? participants.reduce((acc, p) => acc + (p.progress.materialsCompleted / p.progress.totalMaterials) * 100, 0) / participants.length
                        : 0} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Assignment Completion</span>
                      <span>
                        {participants.length > 0 
                          ? Math.round(participants.reduce((acc, p) => acc + (p.progress.assignmentsCompleted / p.progress.totalAssignments) * 100, 0) / participants.length)
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={participants.length > 0 
                        ? participants.reduce((acc, p) => acc + (p.progress.assignmentsCompleted / p.progress.totalAssignments) * 100, 0) / participants.length
                        : 0} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Attendance Rate</span>
                      <span>
                        {participants.length > 0 
                          ? Math.round(participants.reduce((acc, p) => acc + p.progress.attendanceRate, 0) / participants.length)
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={participants.length > 0 
                        ? participants.reduce((acc, p) => acc + p.progress.attendanceRate, 0) / participants.length
                        : 0} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      {showMessageDialog && (
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to Selected Participants</DialogTitle>
            </DialogHeader>
            <MessageForm
              participantCount={selectedParticipants.length}
              onSubmit={(message) => {
                onSendMessage(selectedParticipants, message);
                setShowMessageDialog(false);
                setSelectedParticipants([]);
              }}
              onCancel={() => setShowMessageDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Individual Participant Card Component
function ParticipantCard({
  participant,
  groups,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  onAssignToGroup,
  canManage
}: {
  participant: CohortParticipant;
  groups: CohortGroup[];
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<CohortParticipant>) => void;
  onRemove: () => void;
  onAssignToGroup: (groupId: string) => void;
  canManage: boolean;
}) {
  const getStatusColor = (status: CohortParticipant['status']) => {
    const colors = {
      registered: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      attended: 'bg-purple-100 text-purple-800',
      completed: 'bg-emerald-100 text-emerald-800',
      dropped: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: CohortParticipant['role']) => {
    switch (role) {
      case 'host':
        return <Star className="h-4 w-4" />;
      case 'facilitator':
      case 'co-facilitator':
        return <Award className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {canManage && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
            />
          )}
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={participant.avatar} />
            <AvatarFallback>
              {participant.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium truncate">{participant.name}</h3>
              {getRoleIcon(participant.role)}
              <Badge className={getStatusColor(participant.status)}>
                {participant.status}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground truncate">{participant.email}</p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <span>Materials: {participant.progress.materialsCompleted}/{participant.progress.totalMaterials}</span>
              <span>Assignments: {participant.progress.assignmentsCompleted}/{participant.progress.totalAssignments}</span>
              <span>Engagement: {participant.progress.engagementScore}%</span>
            </div>
            
            <div className="mt-2">
              <Progress value={participant.progress.engagementScore} className="h-2" />
            </div>
          </div>
          
          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onUpdate({ status: 'confirmed' })}>
                  Mark as Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({ status: 'completed' })}>
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({ status: 'dropped' })}>
                  Mark as Dropped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onRemove} className="text-red-600">
                  Remove Participant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Group Card Component
function GroupCard({
  group,
  participants,
  facilitator,
  onUpdate,
  onDelete,
  canManage
}: {
  group: CohortGroup;
  participants: CohortParticipant[];
  facilitator?: CohortParticipant;
  onUpdate: (updates: Partial<CohortGroup>) => void;
  onDelete: () => void;
  canManage: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{group.name}</CardTitle>
          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit Group</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  Delete Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{group.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <span>Type: <Badge variant="outline" className="capitalize">{group.type}</Badge></span>
            <span>{participants.length}{group.maxSize ? `/${group.maxSize}` : ''} members</span>
          </div>
          
          {facilitator && (
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={facilitator.avatar} />
                <AvatarFallback className="text-xs">
                  {facilitator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">Facilitator: {facilitator.name}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            {participants.slice(0, 5).map(participant => (
              <Avatar key={participant.id} className="h-6 w-6">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback className="text-xs">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {participants.length > 5 && (
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                +{participants.length - 5}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Add Participant Form
function AddParticipantForm({
  onSubmit,
  onCancel
}: {
  onSubmit: (participant: Omit<CohortParticipant, 'id' | 'joinedAt' | 'progress' | 'achievements'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'participant' as CohortParticipant['role'],
    status: 'registered' as CohortParticipant['status'],
    preferences: {
      timezone: 'UTC',
      notifications: true,
      communicationMethod: 'email' as const
    },
    notes: '',
    tags: '',
    subgroup: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const participant = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    onSubmit(participant);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as CohortParticipant['role'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="participant">Participant</SelectItem>
              <SelectItem value="facilitator">Facilitator</SelectItem>
              <SelectItem value="co-facilitator">Co-Facilitator</SelectItem>
              <SelectItem value="host">Host</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as CohortParticipant['status'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registered">Registered</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="new-member, vip, returning"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Participant
        </Button>
      </div>
    </form>
  );
}

// Create Group Form
function CreateGroupForm({
  participants,
  onSubmit,
  onCancel
}: {
  participants: CohortParticipant[];
  onSubmit: (group: Omit<CohortGroup, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-100',
    participants: [] as string[],
    facilitatorId: '',
    maxSize: undefined as number | undefined,
    type: 'breakout' as CohortGroup['type'],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Group Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as CohortGroup['type'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakout">Breakout Room</SelectItem>
              <SelectItem value="project">Project Team</SelectItem>
              <SelectItem value="study">Study Group</SelectItem>
              <SelectItem value="mentorship">Mentorship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="maxSize">Max Size</Label>
          <Input
            id="maxSize"
            type="number"
            value={formData.maxSize || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, maxSize: e.target.value ? parseInt(e.target.value) : undefined }))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="facilitator">Facilitator</Label>
        <Select value={formData.facilitatorId} onValueChange={(value) => setFormData(prev => ({ ...prev, facilitatorId: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select facilitator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No facilitator</SelectItem>
            {participants
              .filter(p => p.role === 'facilitator' || p.role === 'host' || p.role === 'co-facilitator')
              .map(facilitator => (
                <SelectItem key={facilitator.id} value={facilitator.id}>
                  {facilitator.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Group
        </Button>
      </div>
    </form>
  );
}

// Message Form
function MessageForm({
  participantCount,
  onSubmit,
  onCancel
}: {
  participantCount: number;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Sending message to {participantCount} participant{participantCount !== 1 ? 's' : ''}
        </p>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          rows={4}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Send Message
        </Button>
      </div>
    </form>
  );
}
