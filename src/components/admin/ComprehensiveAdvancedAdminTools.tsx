'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, Database, Server, Activity, Clock, AlertTriangle,
  Settings, Monitor, Gauge, HardDrive, Cpu, MemoryStick,
  Download, Upload, FileSearch, Lock, Key, Eye,
  BarChart3, TrendingUp, TrendingDown, Zap, Target,
  RefreshCw, Archive, Trash2, Search, Filter, Calendar,
  User, Globe, Link, Mail, Bell, CheckCircle,
  AlertCircle, XCircle, Info, Wrench, Hammer
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface SystemMetric {
  id: string
  name: string
  value: number
  unit: string
  status: 'healthy' | 'warning' | 'critical'
  threshold: {
    warning: number
    critical: number
  }
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
}

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  resource: string
  details: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
}

interface BackupJob {
  id: string
  name: string
  type: 'full' | 'incremental' | 'differential'
  status: 'running' | 'completed' | 'failed' | 'scheduled'
  startTime: string
  endTime?: string
  duration?: number
  size?: number
  location: string
  nextRun?: string
  retention: number
  frequency: 'daily' | 'weekly' | 'monthly'
}

interface SecurityAlert {
  id: string
  type: 'login_failure' | 'suspicious_activity' | 'data_breach' | 'malware' | 'unauthorized_access'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  timestamp: string
  status: 'open' | 'investigating' | 'resolved' | 'false_positive'
  affectedResource?: string
  sourceIp?: string
  userId?: string
}

interface MaintenanceTask {
  id: string
  name: string
  type: 'cleanup' | 'optimization' | 'update' | 'backup' | 'security'
  status: 'pending' | 'running' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
  scheduledTime: string
  estimatedDuration: number
  actualDuration?: number
  assignedTo?: string
  dependencies: string[]
}

const MOCK_SYSTEM_METRICS: SystemMetric[] = [
  {
    id: '1',
    name: 'CPU Usage',
    value: 45.2,
    unit: '%',
    status: 'healthy',
    threshold: { warning: 70, critical: 90 },
    trend: 'stable',
    lastUpdated: '2025-09-22T10:30:00Z'
  },
  {
    id: '2',
    name: 'Memory Usage',
    value: 68.7,
    unit: '%',
    status: 'warning',
    threshold: { warning: 60, critical: 85 },
    trend: 'up',
    lastUpdated: '2025-09-22T10:30:00Z'
  },
  {
    id: '3',
    name: 'Disk Usage',
    value: 34.1,
    unit: '%',
    status: 'healthy',
    threshold: { warning: 80, critical: 95 },
    trend: 'stable',
    lastUpdated: '2025-09-22T10:30:00Z'
  },
  {
    id: '4',
    name: 'Database Connections',
    value: 23,
    unit: 'active',
    status: 'healthy',
    threshold: { warning: 80, critical: 100 },
    trend: 'down',
    lastUpdated: '2025-09-22T10:30:00Z'
  }
]

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-09-22T10:25:00Z',
    userId: 'admin1',
    userName: 'John Admin',
    action: 'User Login',
    resource: 'Admin Dashboard',
    details: 'Successful admin login',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2025-09-22T10:20:00Z',
    userId: 'user123',
    userName: 'Jane Smith',
    action: 'Resource Download',
    resource: 'forgotten-ways-guide.pdf',
    details: 'Downloaded premium resource',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0...',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2025-09-22T10:15:00Z',
    userId: 'unknown',
    userName: 'Unknown User',
    action: 'Failed Login',
    resource: 'Admin Panel',
    details: 'Multiple failed login attempts',
    ipAddress: '198.51.100.23',
    userAgent: 'Bot/1.0',
    status: 'failure'
  }
]

const MOCK_BACKUP_JOBS: BackupJob[] = [
  {
    id: '1',
    name: 'Daily Database Backup',
    type: 'incremental',
    status: 'completed',
    startTime: '2025-09-22T02:00:00Z',
    endTime: '2025-09-22T02:45:00Z',
    duration: 45,
    size: 2147483648, // 2GB
    location: '/backups/db/2025-09-22',
    nextRun: '2025-09-23T02:00:00Z',
    retention: 30,
    frequency: 'daily'
  },
  {
    id: '2',
    name: 'Weekly Full Backup',
    type: 'full',
    status: 'scheduled',
    startTime: '2025-09-23T01:00:00Z',
    location: '/backups/full/weekly',
    nextRun: '2025-09-29T01:00:00Z',
    retention: 90,
    frequency: 'weekly'
  },
  {
    id: '3',
    name: 'Media Files Backup',
    type: 'differential',
    status: 'running',
    startTime: '2025-09-22T10:00:00Z',
    location: '/backups/media',
    retention: 60,
    frequency: 'daily'
  }
]

const MOCK_SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: '1',
    type: 'suspicious_activity',
    severity: 'medium',
    title: 'Unusual Login Pattern Detected',
    description: 'Multiple login attempts from different geographic locations',
    timestamp: '2025-09-22T09:30:00Z',
    status: 'investigating',
    sourceIp: '198.51.100.23',
    userId: 'user456'
  },
  {
    id: '2',
    type: 'login_failure',
    severity: 'high',
    title: 'Brute Force Attack Attempt',
    description: 'Over 50 failed login attempts in 10 minutes',
    timestamp: '2025-09-22T08:15:00Z',
    status: 'resolved',
    sourceIp: '203.0.113.89'
  }
]

const MOCK_MAINTENANCE_TASKS: MaintenanceTask[] = [
  {
    id: '1',
    name: 'Database Index Optimization',
    type: 'optimization',
    status: 'pending',
    priority: 'medium',
    description: 'Rebuild database indexes for improved performance',
    scheduledTime: '2025-09-23T03:00:00Z',
    estimatedDuration: 60,
    dependencies: ['backup_completion']
  },
  {
    id: '2',
    name: 'Log File Cleanup',
    type: 'cleanup',
    status: 'completed',
    priority: 'low',
    description: 'Remove log files older than 90 days',
    scheduledTime: '2025-09-22T01:00:00Z',
    estimatedDuration: 15,
    actualDuration: 12,
    dependencies: []
  }
]

export function ComprehensiveAdvancedAdminTools() {
  const [activeTab, setActiveTab] = useState('overview')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>(MOCK_SYSTEM_METRICS)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS)
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>(MOCK_BACKUP_JOBS)
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(MOCK_SECURITY_ALERTS)
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(MOCK_MAINTENANCE_TASKS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'completed': case 'success': case 'resolved': return 'bg-green-100 text-green-800'
      case 'warning': case 'investigating': case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'critical': case 'failed': case 'failure': case 'open': return 'bg-red-100 text-red-800'
      case 'running': case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-red-500" />
      case 'down': return <TrendingDown className="h-3 w-3 text-green-500" />
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  const getMetricIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'cpu usage': return <Cpu className="h-5 w-5" />
      case 'memory usage': return <MemoryStick className="h-5 w-5" />
      case 'disk usage': return <HardDrive className="h-5 w-5" />
      case 'database connections': return <Database className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  const getHealthyMetrics = () => systemMetrics.filter(m => m.status === 'healthy').length
  const getWarningMetrics = () => systemMetrics.filter(m => m.status === 'warning').length
  const getCriticalMetrics = () => systemMetrics.filter(m => m.status === 'critical').length

  const getOpenAlerts = () => securityAlerts.filter(a => a.status === 'open').length
  const getActiveBackups = () => backupJobs.filter(b => b.status === 'running').length
  const getPendingTasks = () => maintenanceTasks.filter(t => t.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Admin Tools</h2>
          <p className="text-muted-foreground">
            System monitoring, maintenance, security, and optimization tools
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(getCriticalMetrics() > 0 || getOpenAlerts() > 0) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>System Attention Required</AlertTitle>
          <AlertDescription>
            {getCriticalMetrics() > 0 && `${getCriticalMetrics()} critical system metrics detected. `}
            {getOpenAlerts() > 0 && `${getOpenAlerts()} open security alerts require investigation.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold">{getHealthyMetrics()}/{systemMetrics.length}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getWarningMetrics() > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {getWarningMetrics() === 0 ? 'All systems healthy' : `${getWarningMetrics()} warnings`}
                  </span>
                </div>
              </div>
              <Monitor className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold">{getOpenAlerts()}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getOpenAlerts() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {getOpenAlerts() === 0 ? 'No open alerts' : 'Require attention'}
                  </span>
                </div>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Backups</p>
                <p className="text-2xl font-bold">{getActiveBackups()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-blue-600">
                    {backupJobs.filter(b => b.status === 'completed').length} completed today
                  </span>
                </div>
              </div>
              <Archive className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">{getPendingTasks()}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-yellow-600">
                    {maintenanceTasks.filter(t => t.priority === 'high').length} high priority
                  </span>
                </div>
              </div>
              <Wrench className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Metrics Overview</CardTitle>
                <CardDescription>Current system performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMetricIcon(metric.name)}
                        <div>
                          <p className="font-medium">{metric.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {metric.value}{metric.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest administrative actions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.userName} • {formatDate(log.timestamp)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Database className="h-6 w-6 mb-2" />
                  <span className="text-sm">Backup Now</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <RefreshCw className="h-6 w-6 mb-2" />
                  <span className="text-sm">System Restart</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Trash2 className="h-6 w-6 mb-2" />
                  <span className="text-sm">Clear Cache</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Gauge className="h-6 w-6 mb-2" />
                  <span className="text-sm">Performance Test</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(metric.name)}
                      <h3 className="font-semibold">{metric.name}</h3>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                    
                    <Progress 
                      value={metric.value} 
                      className={`h-2 ${
                        metric.status === 'critical' ? 'bg-red-100' :
                        metric.status === 'warning' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}
                    />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Warning: {metric.threshold.warning}{metric.unit}</span>
                      <span>Critical: {metric.threshold.critical}{metric.unit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(metric.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Security Dashboard</h3>
              <p className="text-sm text-muted-foreground">Monitor and respond to security events</p>
            </div>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Security Scan
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Active security incidents and threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(alert.timestamp)}</span>
                        {alert.sourceIp && <span>IP: {alert.sourceIp}</span>}
                        {alert.userId && <span>User: {alert.userId}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Summary</CardTitle>
                <CardDescription>Current security status overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Alerts</span>
                  <span className="font-medium">{securityAlerts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Open Alerts</span>
                  <span className="font-medium text-red-600">{getOpenAlerts()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Critical Severity</span>
                  <span className="font-medium">
                    {securityAlerts.filter(a => a.severity === 'critical').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Resolved Today</span>
                  <span className="font-medium text-green-600">
                    {securityAlerts.filter(a => a.status === 'resolved').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Backup Management</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage system backups</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Backup Job</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backupJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.name}</p>
                        <p className="text-sm text-muted-foreground">{job.frequency}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDate(job.startTime)}</p>
                        {job.duration && (
                          <p className="text-muted-foreground">{job.duration}m</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {job.size ? formatFileSize(job.size) : '-'}
                    </TableCell>
                    <TableCell>
                      {job.nextRun ? formatDate(job.nextRun) : '-'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Run Now
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

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Maintenance Tasks</h3>
              <p className="text-sm text-muted-foreground">Schedule and monitor system maintenance</p>
            </div>
            <Button>
              <Hammer className="h-4 w-4 mr-2" />
              Schedule Task
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {task.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{task.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(task.scheduledTime)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{task.estimatedDuration}m</p>
                        {task.actualDuration && (
                          <p className="text-muted-foreground">
                            Actual: {task.actualDuration}m
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Run Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Reschedule
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

        <TabsContent value="audit-logs" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs
                  .filter(log => 
                    (searchTerm === '' || 
                     log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     log.resource.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (statusFilter === 'all' || log.status === statusFilter)
                  )
                  .map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>{log.userName}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.resource}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}