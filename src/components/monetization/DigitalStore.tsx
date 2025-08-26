'use client'

import { useState } from 'react'
import { ShoppingCart, Star, Download, BookOpen, Video, Users, Gift, CreditCard, Check, ArrowRight, Clock, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface DigitalProduct {
  id: string
  type: 'ebook' | 'course' | 'workshop' | 'resource-pack' | 'video-series'
  title: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  currency: string
  image: string
  rating: number
  reviewCount: number
  features: string[]
  includes: string[]
  duration?: string // for courses/videos
  pages?: number // for ebooks
  format?: string[]
  author: string
  category: string
  tags: string[]
  bestseller?: boolean
  newRelease?: boolean
  featured?: boolean
  preorder?: boolean
  releaseDate?: string
}

interface CartItem {
  productId: string
  quantity: number
}

interface CheckoutInfo {
  email: string
  firstName: string
  lastName: string
  country: string
  paymentMethod: 'card' | 'paypal'
}

interface DigitalStoreProps {
  products: DigitalProduct[]
  cart: CartItem[]
  onAddToCart: (productId: string) => void
  onRemoveFromCart: (productId: string) => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onCheckout: (checkoutInfo: CheckoutInfo) => void
}

const SAMPLE_PRODUCTS: DigitalProduct[] = [
  {
    id: 'forgotten-ways-complete',
    type: 'ebook',
    title: 'The Forgotten Ways: Complete Digital Edition',
    description: 'The definitive guide to recovering missional church DNA with exclusive digital content.',
    longDescription: 'This comprehensive digital edition includes the complete text of The Forgotten Ways, plus exclusive bonus materials, study guides, and interactive elements designed for leaders and small groups.',
    price: 19.99,
    originalPrice: 29.99,
    currency: 'USD',
    image: '/images/products/forgotten-ways-digital.jpg',
    rating: 4.8,
    reviewCount: 324,
    features: [
      'Complete 300+ page digital book',
      'Interactive chapter summaries',
      'Discussion questions for each chapter',
      'Leader\'s guide included',
      'Mobile-optimized reading'
    ],
    includes: [
      'PDF download',
      'EPUB format',
      'Kindle format',
      '50-page study guide',
      'Leadership discussion prompts'
    ],
    pages: 320,
    format: ['PDF', 'EPUB', 'Kindle'],
    author: 'Alan Hirsch',
    category: 'Books',
    tags: ['missional', 'church', 'leadership'],
    bestseller: true
  },
  {
    id: 'apest-masterclass',
    type: 'course',
    title: 'APEST Leadership Masterclass',
    description: 'A comprehensive 8-week course on discovering and developing your APEST calling.',
    longDescription: 'Dive deep into the five-fold ministry gifts through video lessons, interactive exercises, personality assessments, and practical applications for your ministry context.',
    price: 197.00,
    currency: 'USD',
    image: '/images/products/apest-masterclass.jpg',
    rating: 4.9,
    reviewCount: 156,
    features: [
      '8 comprehensive video modules',
      'APEST personality assessment',
      'Interactive workbook',
      'Live Q&A sessions',
      'Lifetime access'
    ],
    includes: [
      '6 hours of video content',
      'APEST assessment tool',
      '100-page workbook',
      'Certificate of completion',
      'Private community access'
    ],
    duration: '6 hours',
    author: 'Alan Hirsch',
    category: 'Courses',
    tags: ['apest', 'leadership', 'gifts'],
    featured: true
  },
  {
    id: 'missional-toolkit',
    type: 'resource-pack',
    title: 'Missional Church Starter Toolkit',
    description: 'Everything you need to launch or revitalize a missional church community.',
    longDescription: 'A comprehensive collection of templates, guides, and resources developed from years of church planting and renewal experience.',
    price: 47.00,
    currency: 'USD',
    image: '/images/products/missional-toolkit.jpg',
    rating: 4.7,
    reviewCount: 89,
    features: [
      '25+ church planting templates',
      'Community assessment tools',
      'Vision casting materials',
      'Small group resources',
      'Evangelism training guides'
    ],
    includes: [
      'Church planting checklist',
      'Vision statement templates',
      'Community mapping tools',
      'Discipleship pathways',
      'Outreach planning guides'
    ],
    author: 'Alan Hirsch & Team',
    category: 'Resources',
    tags: ['church-planting', 'tools', 'templates']
  },
  {
    id: 'discipleship-intensive',
    type: 'workshop',
    title: 'Discipleship & Movement Building Workshop',
    description: 'A focused 2-day intensive on creating disciples who make disciples.',
    longDescription: 'Join Alan for an intensive workshop covering the principles and practices of multiplication-focused discipleship in the modern context.',
    price: 297.00,
    currency: 'USD',
    image: '/images/products/discipleship-workshop.jpg',
    rating: 4.9,
    reviewCount: 67,
    features: [
      '12 hours of live teaching',
      'Interactive breakout sessions',
      'Personal coaching time',
      'Networking opportunities',
      'Post-workshop support'
    ],
    includes: [
      'Live workshop access',
      'Recording of all sessions',
      'Workshop materials',
      '30-day follow-up support',
      'Implementation checklist'
    ],
    duration: '12 hours',
    author: 'Alan Hirsch',
    category: 'Workshops',
    tags: ['discipleship', 'multiplication', 'movement'],
    newRelease: true
  }
]

export function DigitalStore({
  products = SAMPLE_PRODUCTS,
  cart = [],
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout
}: DigitalStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showCart, setShowCart] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'payment'>('cart')
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    email: '',
    firstName: '',
    lastName: '',
    country: 'US',
    paymentMethod: 'card'
  })

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return BookOpen
      case 'course': return Users
      case 'workshop': return Video
      case 'resource-pack': return Gift
      case 'video-series': return Video
      default: return BookOpen
    }
  }

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'ebook': return 'E-Book'
      case 'course': return 'Online Course'
      case 'workshop': return 'Workshop'
      case 'resource-pack': return 'Resource Pack'
      case 'video-series': return 'Video Series'
      default: return 'Digital Product'
    }
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(price)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return (b.newRelease ? 1 : 0) - (a.newRelease ? 1 : 0)
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

  const renderProductCard = (product: DigitalProduct) => {
    const Icon = getProductTypeIcon(product.type)
    const isInCart = cart.some(item => item.productId === product.id)

    return (
      <div key={product.id} className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
        {/* Image & Badges */}
        <div className="relative aspect-[4/3] bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="h-12 w-12" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {product.bestseller && (
              <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                Bestseller
              </span>
            )}
            {product.newRelease && (
              <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                New
              </span>
            )}
            {product.featured && (
              <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-full">
                Featured
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => onAddToCart(product.id)}
              className={`p-2 rounded-full transition-all ${
                isInCart
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-foreground hover:bg-gray-100 opacity-0 group-hover:opacity-100'
              }`}
            >
              {isInCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              {getProductTypeLabel(product.type)}
            </span>
          </div>

          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <p className="text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-500 fill-current'
                      : '-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm">({product.reviewCount})</span>
          </div>

          {/* Features */}
          <div className="space-y-1 mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-foreground">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
              </div>
              {product.duration && (
                <p className="text-xs">{product.duration} content</p>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isInCart
                  ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Your cart is empty
          </h3>
          <p className="-foreground mb-4">
            Add some products to get started with your learning journey.
          </p>
          <button
            onClick={() => setShowCart(false)}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Shopping Cart ({getCartItemCount()} items)
        </h3>

        <div className="space-y-4">
          {cart.map(item => {
            const product = products.find(p => p.id === item.productId)
            if (!product) return null

            return (
              <div key={item.productId} className="flex gap-4 p-4 border border-border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <BookOpen className="h-6 w-6" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{product.title}</h4>
                  <p className="text-sm mb-2">
                    {getProductTypeLabel(product.type)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      {formatPrice(product.price * item.quantity, product.currency)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveFromCart(product.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart Summary */}
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-foreground">Total:</span>
            <span className="font-bold text-xl text-foreground">
              {formatPrice(getCartTotal())}
            </span>
          </div>
          
          <button
            onClick={() => setCheckoutStep('checkout')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  const renderCheckout = () => (
    <div className="max-w-md mx-auto space-y-6">
      <h3 className="font-display text-xl font-semibold text-foreground">
        Checkout Information
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              value={checkoutInfo.firstName}
              onChange={(e) => setCheckoutInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={checkoutInfo.lastName}
              onChange={(e) => setCheckoutInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={checkoutInfo.email}
            onChange={(e) => setCheckoutInfo(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Country
          </label>
          <select
            value={checkoutInfo.country}
            onChange={(e) => setCheckoutInfo(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-3">Order Summary</h4>
        {cart.map(item => {
          const product = products.find(p => p.id === item.productId)
          if (!product) return null
          
          return (
            <div key={item.productId} className="flex justify-between text-sm mb-2">
              <span className="text-foreground">{product.title} × {item.quantity}</span>
              <span className="font-medium">{formatPrice(product.price * item.quantity)}</span>
            </div>
          )
        })}
        <div className="border-t border-border pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setCheckoutStep('cart')}
          className="btn-outline flex-1"
        >
          Back to Cart
        </button>
        <button
          onClick={() => onCheckout(checkoutInfo)}
          disabled={!checkoutInfo.firstName || !checkoutInfo.lastName || !checkoutInfo.email}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Digital Store</h1>
          <p className="-foreground mt-1">
            Books, courses, and resources for missional leaders
          </p>
        </div>
        
        <button
          onClick={() => setShowCart(true)}
          className="btn-primary mt-4 md:mt-0 flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart ({getCartItemCount()})
        </button>
      </div>

      {/* Filters */}
      {!showCart && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      )}

      {/* Content */}
      {showCart ? (
        <div>
          {checkoutStep === 'cart' && renderCart()}
          {checkoutStep === 'checkout' && renderCheckout()}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(renderProductCard)}
        </div>
      )}

      {/* Cart Sidebar (when not showing full cart) */}
      {!showCart && getCartItemCount() > 0 && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">{getCartItemCount()} items</span>
            <span className="font-bold">{formatPrice(getCartTotal())}</span>
          </div>
        </div>
      )}
    </div>
  )
}
