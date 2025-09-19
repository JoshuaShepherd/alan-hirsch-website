'use client'

import { useState, useEffect } from 'react'
import { 
  ShoppingCart, Package, CreditCard, TrendingUp, Users, DollarSign,
  Plus, Search, Filter, Star, Download, Upload, Edit, Trash2,
  Eye, Settings, BarChart3, Calendar, CheckCircle, AlertCircle,
  Truck, RefreshCw, MapPin, Phone, Mail, Globe, Percent,
  Archive, Copy, Share, Lock, Unlock, ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Product {
  id: string
  name: string
  description: string
  type: 'book' | 'course' | 'bundle' | 'digital'
  price: number
  compareAtPrice?: number
  stock: number
  sku: string
  status: 'active' | 'draft' | 'archived'
  category: string
  tags: string[]
  images: string[]
  weight?: number
  dimensions?: { length: number; width: number; height: number }
  downloadUrl?: string
  createdAt: string
  updatedAt: string
  totalSales: number
  revenue: number
  rating: number
  reviewsCount: number
}

interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  shippingAddress: {
    name: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country: string
  }
  billingAddress?: {
    name: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  createdAt: string
  status: 'active' | 'blocked'
  tags: string[]
}

interface Discount {
  id: string
  code: string
  type: 'percentage' | 'fixed' | 'shipping'
  value: number
  minimumAmount?: number
  usageLimit?: number
  usageCount: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'disabled'
  applicableProducts?: string[]
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Forgotten Ways',
    description: 'Reactivating Apostolic Movements',
    type: 'book',
    price: 24.99,
    compareAtPrice: 29.99,
    stock: 156,
    sku: 'TFW-001',
    status: 'active',
    category: 'Books',
    tags: ['apostolic', 'movements', 'church-planting'],
    images: ['/images/books/tfw.jpg'],
    weight: 1.2,
    dimensions: { length: 9, width: 6, height: 1 },
    createdAt: '2024-01-15',
    updatedAt: '2024-09-01',
    totalSales: 1234,
    revenue: 30850,
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: '2',
    name: 'Foundations of Missional Leadership Course',
    description: 'Comprehensive online course on APEST and missional principles',
    type: 'course',
    price: 199.99,
    stock: 999,
    sku: 'FML-COURSE',
    status: 'active',
    category: 'Courses',
    tags: ['apest', 'leadership', 'online'],
    images: ['/images/courses/foundations.jpg'],
    downloadUrl: '/courses/foundations',
    createdAt: '2024-02-10',
    updatedAt: '2024-08-15',
    totalSales: 234,
    revenue: 46798,
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: '3',
    name: 'Complete Hirsch Collection',
    description: 'All books and select courses in one comprehensive bundle',
    type: 'bundle',
    price: 299.99,
    compareAtPrice: 450.00,
    stock: 50,
    sku: 'CHC-BUNDLE',
    status: 'active',
    category: 'Bundles',
    tags: ['bundle', 'complete', 'value'],
    images: ['/images/bundles/complete-collection.jpg'],
    createdAt: '2024-03-20',
    updatedAt: '2024-09-10',
    totalSales: 45,
    revenue: 13499,
    rating: 4.7,
    reviewsCount: 23
  }
]

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'AH-2025-001234',
    customerId: '1',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    status: 'processing',
    items: [
      { productId: '1', productName: 'The Forgotten Ways', quantity: 2, price: 24.99 },
      { productId: '2', productName: 'Foundations Course', quantity: 1, price: 199.99 }
    ],
    subtotal: 249.97,
    tax: 20.00,
    shipping: 9.99,
    discount: 25.00,
    total: 254.96,
    shippingAddress: {
      name: 'John Smith',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'US'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    trackingNumber: '1Z999AA1234567890',
    createdAt: '2025-09-18T10:30:00Z',
    updatedAt: '2025-09-19T09:15:00Z'
  },
  {
    id: '2',
    orderNumber: 'AH-2025-001235',
    customerId: '2',
    customerName: 'Maria Garcia',
    customerEmail: 'maria@example.com',
    status: 'shipped',
    items: [
      { productId: '3', productName: 'Complete Hirsch Collection', quantity: 1, price: 299.99 }
    ],
    subtotal: 299.99,
    tax: 24.00,
    shipping: 0.00,
    discount: 0.00,
    total: 323.99,
    shippingAddress: {
      name: 'Maria Garcia',
      address1: '456 Oak Ave',
      city: 'Springfield',
      state: 'TX',
      zip: '67890',
      country: 'US'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    trackingNumber: '1Z999BB1234567891',
    createdAt: '2025-09-17T14:20:00Z',
    updatedAt: '2025-09-18T16:45:00Z'
  }
]

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0123',
    totalOrders: 3,
    totalSpent: 634.85,
    averageOrderValue: 211.62,
    lastOrderDate: '2025-09-18',
    createdAt: '2024-06-15',
    status: 'active',
    tags: ['vip', 'repeat-customer']
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+1-555-0124',
    totalOrders: 1,
    totalSpent: 323.99,
    averageOrderValue: 323.99,
    lastOrderDate: '2025-09-17',
    createdAt: '2025-09-10',
    status: 'active',
    tags: ['new-customer']
  }
]

const MOCK_DISCOUNTS: Discount[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minimumAmount: 50,
    usageLimit: 100,
    usageCount: 23,
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    status: 'active'
  },
  {
    id: '2',
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    minimumAmount: 75,
    usageLimit: 500,
    usageCount: 156,
    startDate: '2025-08-15',
    endDate: '2025-10-31',
    status: 'active'
  }
]

export function ComprehensiveEcommerceSystem() {
  const [activeTab, setActiveTab] = useState('overview')
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS)
  const [discounts, setDiscounts] = useState<Discount[]>(MOCK_DISCOUNTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'paid': case 'delivered': return 'bg-green-100 text-green-800'
      case 'processing': case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': case 'refunded': case 'failed': return 'bg-red-100 text-red-800'
      case 'draft': case 'expired': case 'disabled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalRevenue = () => {
    return products.reduce((total, product) => total + product.revenue, 0)
  }

  const getTotalOrders = () => {
    return orders.length
  }

  const getAverageOrderValue = () => {
    if (orders.length === 0) return 0
    const total = orders.reduce((sum, order) => sum + order.total, 0)
    return total / orders.length
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">E-commerce Management</h2>
          <p className="text-muted-foreground">
            Manage products, orders, customers, and sales analytics
          </p>
        </div>
        <Button onClick={() => setShowCreateProduct(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">{formatPrice(getTotalRevenue())}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{getTotalOrders()}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+8.3%</span>
                    </div>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                    <p className="text-2xl font-bold">{formatPrice(getAverageOrderValue())}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+5.7%</span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                    <p className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600">+3</span>
                    </div>
                  </div>
                  <Package className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 5)
                    .map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.totalSales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(product.revenue)}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="course">Courses</SelectItem>
                  <SelectItem value="bundle">Bundles</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatPrice(product.price)}</p>
                        {product.compareAtPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.compareAtPrice)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={product.stock < 10 ? 'text-red-600' : ''}>
                        {product.type === 'digital' || product.type === 'course' ? '∞' : product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{product.totalSales}</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(product.revenue)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
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

        <TabsContent value="orders" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Orders Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item(s)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="h-4 w-4 mr-2" />
                            Update Shipping
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refund
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

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>Manage customer accounts and data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <div className="flex gap-1 mt-1">
                            {customer.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(customer.totalSpent)}</p>
                        <p className="text-sm text-muted-foreground">{customer.totalOrders} orders</p>
                        <p className="text-xs text-muted-foreground">
                          Avg: {formatPrice(customer.averageOrderValue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Key customer metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Customers</span>
                  <span className="font-medium">{customers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Repeat Customers</span>
                  <span className="font-medium">
                    {customers.filter(c => c.totalOrders > 1).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg Lifetime Value</span>
                  <span className="font-medium">
                    {formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>New This Month</span>
                  <span className="font-medium">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="discounts" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Discount Codes</h3>
              <p className="text-sm text-muted-foreground">Manage promotional codes and offers</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Discount
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell className="font-medium">{discount.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{discount.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {discount.type === 'percentage' ? `${discount.value}%` : 
                       discount.type === 'fixed' ? formatPrice(discount.value) : 'Free shipping'}
                    </TableCell>
                    <TableCell>
                      {discount.usageCount}/{discount.usageLimit || '∞'}
                    </TableCell>
                    <TableCell>{formatDate(discount.endDate)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(discount.status)}>
                        {discount.status}
                      </Badge>
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
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Revenue</span>
                    <span className="font-medium">{formatPrice(getTotalRevenue())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Growth</span>
                    <span className="font-medium text-green-600">+18.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cart Abandonment</span>
                    <span className="font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Best and worst performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.totalSales - a.totalSales)
                    .slice(0, 3)
                    .map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.totalSales} sales • {formatPrice(product.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>General store configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input defaultValue="Alan Hirsch Store" />
                </div>
                
                <div className="space-y-2">
                  <Label>Store Description</Label>
                  <Textarea 
                    defaultValue="Books, courses, and resources for missional church leaders"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Tax Calculation</Label>
                    <p className="text-sm text-muted-foreground">Automatically calculate taxes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment & Shipping</CardTitle>
                <CardDescription>Configure payment and shipping options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Stripe Integration</Label>
                    <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>PayPal Integration</Label>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Shipping Rate</Label>
                  <Input type="number" placeholder="9.99" />
                </div>
                
                <div className="space-y-2">
                  <Label>Free Shipping Threshold</Label>
                  <Input type="number" placeholder="75.00" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Product Modal */}
      <Dialog open={showCreateProduct} onOpenChange={setShowCreateProduct}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input placeholder="Enter product name" />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe your product" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="bundle">Bundle</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                    <SelectItem value="bundles">Bundles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label>Compare At Price ($)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input placeholder="Product SKU" />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateProduct(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateProduct(false)}>
                Add Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Shipping Address</h4>
                  <div className="text-sm">
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.address1}</p>
                    {selectedOrder.shippingAddress.address2 && (
                      <p>{selectedOrder.shippingAddress.address2}</p>
                    )}
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatPrice(item.price)}</TableCell>
                        <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedOrder.paymentStatus)}>
                        {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between">
                        <span>Tracking:</span>
                        <span>{selectedOrder.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatPrice(selectedOrder.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatPrice(selectedOrder.shipping)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-{formatPrice(selectedOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total:</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>
                <Button variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  Update Shipping
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Process Refund
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}