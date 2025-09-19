import { Metadata } from 'next'
import { ComprehensiveAdvancedAdminTools } from '@/components/admin/ComprehensiveAdvancedAdminTools'

export const metadata: Metadata = {
  title: 'Advanced Admin Tools | Admin Dashboard',
  description: 'Comprehensive system administration tools for monitoring, security, backups, maintenance, and performance optimization',
  keywords: ['admin tools', 'system monitoring', 'security', 'backups', 'maintenance', 'performance', 'audit logs']
}

export default function AdvancedAdminToolsPage() {
  return <ComprehensiveAdvancedAdminTools />
}