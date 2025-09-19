import { Metadata } from 'next'
import { ComprehensiveEcommerceSystem } from '@/components/admin/ComprehensiveEcommerceSystem'

export const metadata: Metadata = {
  title: 'E-commerce Management | Alan Hirsch',
  description: 'Manage products, orders, customers, and sales analytics',
}

export default function EcommercePage() {
  return (
    <div className="container mx-auto py-8">
      <ComprehensiveEcommerceSystem />
    </div>
  )
}