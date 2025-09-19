'use client'

import { useState, useEffect } from 'react'
import { 
  Users, UserPlus, Search, Filter, MoreHorizontal, 
  Mail, Phone, Calendar, Crown, Shield, Eye,
  Download, Upload, Settings, Trash2, Edit,
  Ban, CheckCircle, XCircle, Clock, Star,
  CreditCard, Package, Activity, Globe,
  AlertTriangle, MessageSquare, FileText
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'moderator' | 'member' | 'guest'
  status: 'active' | 'inactive' | 'banned' | 'pending'
  subscription: 'free' | 'basic' | 'premium' | 'enterprise'
  joinedAt: string
  lastActive: string
  totalSessions: number
  totalSpent: number
  location: string
  verified: boolean
  posts: number
  comments: number
  likes: number
}

interface MembershipStats {
  total: number
  active: number
  inactive: number
  banned: number
  pending: number
  newThisMonth: number
  growth: number
  retention: number
  engagement: number
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'admin',
    status: 'active',
    subscription: 'enterprise',
    joinedAt: '2023-01-15',
    lastActive: '2024-01-20',
    totalSessions: 245,
    totalSpent: 2500,
    location: 'United States',
    verified: true,
    posts: 45,
    comments: 123,
    likes: 567
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    role: 'moderator',
    status: 'active',
    subscription: 'premium',
    joinedAt: '2023-03-22',
    lastActive: '2024-01-19',
    totalSessions: 189,
    totalSpent: 890,
    location: 'Canada',
    verified: true,
    posts: 23,
    comments: 89,
    likes: 234
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mike.brown@email.com',
    role: 'member',
    status: 'active',
    subscription: 'basic',
    joinedAt: '2023-06-10',
    lastActive: '2024-01-18',
    totalSessions: 67,
    totalSpent: 150,
    location: 'United Kingdom',
    verified: false,
    posts: 12,
    comments: 34,
    likes: 78
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    role: 'member',
    status: 'inactive',
    subscription: 'free',
    joinedAt: '2023-08-05',
    lastActive: '2023-12-15',
    totalSessions: 23,
    totalSpent: 0,
    location: 'Australia',
    verified: true,
    posts: 3,
    comments: 8,
    likes: 15
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@email.com',
    role: 'member',
    status: 'banned',
    subscription: 'free',
    joinedAt: '2023-09-12',
    lastActive: '2023-11-30',
    totalSessions: 45,
    totalSpent: 0,
    location: 'United States',
    verified: false,
    posts: 8,
    comments: 25,
    likes: 12
  }
]

const MOCK_STATS: MembershipStats = {
  total: 12456,
  active: 8934,
  inactive: 2345,
  banned: 234,
  pending: 943,
  newThisMonth: 456,
  growth: 12.5,
  retention: 78.3,
  engagement: 65.7
}

export function ComprehensiveMemberManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [stats, setStats] = useState<MembershipStats>(MOCK_STATS)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesSubscription = subscriptionFilter === 'all' || user.subscription === subscriptionFilter
    
    return matchesSearch && matchesRole && matchesStatus && matchesSubscription
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUsers)
    // Implement bulk actions
    setSelectedUsers([])
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-600" />
      case 'moderator': return <Shield className="h-4 w-4 text-blue-600" />
      default: return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      banned: 'destructive',
      pending: 'outline'
    } as const
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getSubscriptionBadge = (subscription: string) => {
    const colors = {
      free: 'bg-gray-100 text-gray-800',
      basic: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
      enterprise: 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <Badge className={colors[subscription as keyof typeof colors]}>
        {subscription}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{formatNumber(stats.total)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">+{stats.growth}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{formatNumber(stats.active)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {((stats.active / stats.total) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">{formatNumber(stats.newThisMonth)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600">Growing</span>
                </div>
              </div>
              <UserPlus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold">{stats.retention}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">30-day</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedUsers.length} member{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('ban')}>
                  <Ban className="h-4 w-4 mr-2" />
                  Ban
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedUsers([])}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} members
            </div>
          </div>

          {/* Members Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {user.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
                    <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedUser(user)
                            setShowUserModal(true)
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Configure user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Administrator</p>
                        <p className="text-sm text-muted-foreground">Full system access</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Moderator</p>
                        <p className="text-sm text-muted-foreground">Content moderation</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Member</p>
                        <p className="text-sm text-muted-foreground">Standard access</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
                <CardDescription>Detailed permission settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                    <div>Permission</div>
                    <div className="text-center">Admin</div>
                    <div className="text-center">Moderator</div>
                    <div className="text-center">Member</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 items-center py-2 border-t">
                    <div className="text-sm">Manage Users</div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                    <div className="text-center"><XCircle className="h-4 w-4 text-red-600 mx-auto" /></div>
                    <div className="text-center"><XCircle className="h-4 w-4 text-red-600 mx-auto" /></div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 items-center py-2 border-t">
                    <div className="text-sm">Moderate Content</div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                    <div className="text-center"><XCircle className="h-4 w-4 text-red-600 mx-auto" /></div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 items-center py-2 border-t">
                    <div className="text-sm">Create Posts</div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Free</span>
                    <span className="font-medium">8,765</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Basic</span>
                    <span className="font-medium">2,345</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Premium</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enterprise</span>
                    <span className="font-medium">234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Basic</span>
                    <span className="font-medium">$11,725</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Premium</span>
                    <span className="font-medium">$18,510</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enterprise</span>
                    <span className="font-medium">$23,400</span>
                  </div>
                  <div className="flex items-center justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>$53,635</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">4.2%</div>
                    <div className="text-sm text-muted-foreground">Monthly Churn Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cancellations</span>
                      <span>127</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Downgrades</span>
                      <span>45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Failed Payments</span>
                      <span>23</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User activity and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Daily Active Users</span>
                    <span className="font-medium">3,456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weekly Active Users</span>
                    <span className="font-medium">8,901</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Active Users</span>
                    <span className="font-medium">15,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Avg Session Duration</span>
                    <span className="font-medium">12m 34s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Members by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>United States</span>
                    <span className="font-medium">45.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>United Kingdom</span>
                    <span className="font-medium">18.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Canada</span>
                    <span className="font-medium">12.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Australia</span>
                    <span className="font-medium">8.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Other</span>
                    <span className="font-medium">14.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Details Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-blue-600">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getRoleIcon(selectedUser.role)}
                    <span className="capitalize text-sm">{selectedUser.role}</span>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subscription:</span>
                      <span className="capitalize">{selectedUser.subscription}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Joined:</span>
                      <span>{new Date(selectedUser.joinedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Active:</span>
                      <span>{new Date(selectedUser.lastActive).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{selectedUser.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Activity Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Sessions:</span>
                      <span>{selectedUser.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts:</span>
                      <span>{selectedUser.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comments:</span>
                      <span>{selectedUser.comments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Spent:</span>
                      <span>{formatCurrency(selectedUser.totalSpent)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Member
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Subscription
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}